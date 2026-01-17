/**
 * Polkadot (DOT) Smart Contract Reward Distribution System
 * 
 * ink! smart contract rewards for Polkadot/Substrate with:
 * - ink! smart contract language (Rust-based)
 * - Contracts pallet integration
 * - Server-signed attestations for validation
 * - Trustless reward distribution
 * 
 * ink! is Polkadot's native smart contract language for WASM contracts
 */

import { ApiPromise, WsProvider, Keyring } from '@polkadot/api';
import { ContractPromise } from '@polkadot/api-contract';
import { cryptoWaitReady } from '@polkadot/util-crypto';

/**
 * ink! Smart Contract for reward distribution
 * File: reward_contract.rs
 */
export const REWARD_CONTRACT_INK = \`
#![cfg_attr(not(feature = "std"), no_std)]

use ink_lang as ink;

#[ink::contract]
mod game_reward {
    use ink_storage::{
        traits::SpreadAllocate,
        Mapping,
    };

    #[ink(storage)]
    #[derive(SpreadAllocate)]
    pub struct GameReward {
        server_account: AccountId,
        claimed: Mapping<AccountId, bool>,
        reward_amounts: Mapping<AccountId, Balance>,
    }

    #[ink(event)]
    pub struct RewardClaimed {
        #[ink(topic)]
        player: AccountId,
        amount: Balance,
    }

    impl GameReward {
        #[ink(constructor)]
        pub fn new(server_account: AccountId) -> Self {
            ink_lang::utils::initialize_contract(|contract: &mut Self| {
                contract.server_account = server_account;
            })
        }

        #[ink(message, payable)]
        pub fn fund(&mut self) {
            // Accept DOT to fund the contract
        }

        #[ink(message)]
        pub fn claim_reward(&mut self, amount: Balance, signature: [u8; 64]) -> Result<(), Error> {
            let caller = self.env().caller();
            
            // Check if already claimed
            if self.claimed.get(&caller).unwrap_or(false) {
                return Err(Error::AlreadyClaimed);
            }

            // Verify server signature (simplified - needs proper implementation)
            // In production, use proper signature verification
            
            // Check contract has enough balance
            let contract_balance = self.env().balance();
            if contract_balance < amount {
                return Err(Error::InsufficientFunds);
            }

            // Mark as claimed
            self.claimed.insert(&caller, &true);
            self.reward_amounts.insert(&caller, &amount);

            // Transfer reward to player
            if self.env().transfer(caller, amount).is_err() {
                return Err(Error::TransferFailed);
            }

            // Emit event
            self.env().emit_event(RewardClaimed {
                player: caller,
                amount,
            });

            Ok(())
        }

        #[ink(message)]
        pub fn has_claimed(&self, player: AccountId) -> bool {
            self.claimed.get(&player).unwrap_or(false)
        }

        #[ink(message)]
        pub fn get_reward_amount(&self, player: AccountId) -> Balance {
            self.reward_amounts.get(&player).unwrap_or(0)
        }
    }

    #[derive(Debug, PartialEq, Eq, scale::Encode, scale::Decode)]
    #[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
    pub enum Error {
        AlreadyClaimed,
        InsufficientFunds,
        TransferFailed,
        InvalidSignature,
    }
}
\`;

export interface RewardAttestation {
  playerAddress: string;
  amount: string; // in Planck
  signature: string;
}

/**
 * Backend service for signing reward attestations
 */
export class PolkadotRewardBackend {
  private api: ApiPromise | null = null;
  private serverPair: any; // KeyringPair
  private wsEndpoint: string;

  constructor(
    serverMnemonic: string,
    network: 'polkadot' | 'kusama' | 'westend' = 'polkadot'
  ) {
    switch (network) {
      case 'polkadot':
        this.wsEndpoint = 'wss://rpc.polkadot.io';
        break;
      case 'kusama':
        this.wsEndpoint = 'wss://kusama-rpc.polkadot.io';
        break;
      case 'westend':
        this.wsEndpoint = 'wss://westend-rpc.polkadot.io';
        break;
    }

    this.initializeKeyring(serverMnemonic);
  }

  private async initializeKeyring(mnemonic: string): Promise<void> {
    await cryptoWaitReady();
    const keyring = new Keyring({ type: 'sr25519' });
    this.serverPair = keyring.addFromMnemonic(mnemonic);
  }

  async initialize(): Promise<void> {
    const provider = new WsProvider(this.wsEndpoint);
    this.api = await ApiPromise.create({ provider });
  }

  async disconnect(): Promise<void> {
    if (this.api) {
      await this.api.disconnect();
    }
  }

  /**
   * Sign a reward attestation for a user
   */
  async signRewardAttestation(
    playerAddress: string,
    amountDOT: number
  ): Promise<RewardAttestation> {
    const amountPlanck = BigInt(Math.floor(amountDOT * 10_000_000_000));
    const message = \`reward:\${playerAddress}:\${amountPlanck}\`;
    
    // Sign message with server account
    const signature = this.serverPair.sign(message);

    return {
      playerAddress,
      amount: amountPlanck.toString(),
      signature: Buffer.from(signature).toString('hex'),
    };
  }

  getServerAddress(): string {
    return this.serverPair.address;
  }
}

/**
 * Frontend client for interacting with reward contract
 */
export class PolkadotRewardContractClient {
  private api: ApiPromise | null = null;
  private contract: ContractPromise | null = null;
  private wsEndpoint: string;

  constructor(
    private contractAddress: string,
    network: 'polkadot' | 'kusama' | 'westend' = 'polkadot'
  ) {
    switch (network) {
      case 'polkadot':
        this.wsEndpoint = 'wss://rpc.polkadot.io';
        break;
      case 'kusama':
        this.wsEndpoint = 'wss://kusama-rpc.polkadot.io';
        break;
      case 'westend':
        this.wsEndpoint = 'wss://westend-rpc.polkadot.io';
        break;
    }
  }

  /**
   * Initialize contract instance
   */
  async initializeContract(abi: any): Promise<void> {
    const provider = new WsProvider(this.wsEndpoint);
    this.api = await ApiPromise.create({ provider });
    this.contract = new ContractPromise(this.api, abi, this.contractAddress);
    console.log('Contract initialized at:', this.contractAddress);
  }

  async disconnect(): Promise<void> {
    if (this.api) {
      await this.api.disconnect();
    }
  }

  /**
   * Claim reward with backend attestation
   */
  async claimReward(
    attestation: RewardAttestation,
    playerMnemonic: string
  ): Promise<{ success: boolean; txHash?: string; error?: string }> {
    try {
      if (!this.contract || !this.api) {
        throw new Error('Contract not initialized');
      }

      await cryptoWaitReady();
      const keyring = new Keyring({ type: 'sr25519' });
      const player = keyring.addFromMnemonic(playerMnemonic);

      // Check if already claimed
      const { output } = await this.contract.query.hasClaimed(
        player.address,
        { value: 0, gasLimit: -1 },
        player.address
      );

      if (output?.toHuman()) {
        throw new Error('Reward already claimed');
      }

      // Call claim_reward method
      return new Promise((resolve) => {
        this.contract!.tx
          .claimReward(
            { value: 0, gasLimit: -1 },
            attestation.amount,
            Buffer.from(attestation.signature, 'hex')
          )
          .signAndSend(player, ({ status, txHash, dispatchError }) => {
            if (status.isFinalized) {
              if (dispatchError) {
                resolve({
                  success: false,
                  error: 'Transaction failed',
                  txHash: txHash.toString(),
                });
              } else {
                resolve({
                  success: true,
                  txHash: txHash.toString(),
                });
              }
            }
          })
          .catch((error: Error) => {
            resolve({
              success: false,
              error: error.message,
            });
          });
      });
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Check if player has claimed
   */
  async hasClaimedReward(playerAddress: string): Promise<boolean> {
    try {
      if (!this.contract) {
        throw new Error('Contract not initialized');
      }

      const { output } = await this.contract.query.hasClaimed(
        playerAddress,
        { value: 0, gasLimit: -1 },
        playerAddress
      );

      return output?.toHuman() as boolean;
    } catch (error) {
      console.error('Error checking claim status:', error);
      return false;
    }
  }
}

/**
 * Complete reward flow coordinator
 */
export class PolkadotSmartContractRewarder {
  private backend: PolkadotRewardBackend;
  private contractClient: PolkadotRewardContractClient;

  constructor(
    serverMnemonic: string,
    contractAddress: string,
    network: 'polkadot' | 'kusama' | 'westend' = 'polkadot'
  ) {
    this.backend = new PolkadotRewardBackend(serverMnemonic, network);
    this.contractClient = new PolkadotRewardContractClient(contractAddress, network);
  }

  /**
   * Initialize the rewarder
   */
  async initialize(contractAbi: any): Promise<void> {
    await this.backend.initialize();
    await this.contractClient.initializeContract(contractAbi);
  }

  /**
   * Cleanup
   */
  async shutdown(): Promise<void> {
    await this.backend.disconnect();
    await this.contractClient.disconnect();
  }

  /**
   * Complete reward flow: backend signs, user claims
   */
  async rewardUser(
    playerAddress: string,
    amountDOT: number,
    playerMnemonic: string
  ): Promise<{ txHash: string; attestation: RewardAttestation }> {
    // Backend validates and signs
    const attestation = await this.backend.signRewardAttestation(playerAddress, amountDOT);

    // User claims with attestation
    const result = await this.contractClient.claimReward(attestation, playerMnemonic);

    if (!result.success) {
      throw new Error(result.error || 'Failed to claim reward');
    }

    return {
      txHash: result.txHash!,
      attestation,
    };
  }

  /**
   * Get backend server address
   */
  getBackendAddress(): string {
    return this.backend.getServerAddress();
  }

  /**
   * Check if player has claimed
   */
  async hasPlayerClaimed(playerAddress: string): Promise<boolean> {
    return await this.contractClient.hasClaimedReward(playerAddress);
  }
}

export default PolkadotSmartContractRewarder;
