/**
 * Polkadot (DOT) Smart Contract Escrow System
 * ink! smart contract-based escrow for multiplayer gaming
 */

import { ApiPromise, WsProvider, Keyring } from '@polkadot/api';
import { ContractPromise } from '@polkadot/api-contract';
import { cryptoWaitReady } from '@polkadot/util-crypto';

/**
 * ink! Escrow Contract
 */
export const ESCROW_CONTRACT_INK = \`
#![cfg_attr(not(feature = "std"), no_std)]

use ink_lang as ink;

#[ink::contract]
mod game_escrow {
    use ink_storage::{traits::SpreadAllocate, Mapping};

    #[ink(storage)]
    #[derive(SpreadAllocate)]
    pub struct GameEscrow {
        player1: AccountId,
        player2: AccountId,
        server: AccountId,
        bet_amount: Balance,
        total_pot: Balance,
        player1_deposited: bool,
        player2_deposited: bool,
        game_started: bool,
        game_ended: bool,
    }

    #[ink(event)]
    pub struct PlayerDeposited {
        #[ink(topic)]
        player: AccountId,
        amount: Balance,
    }

    #[ink(event)]
    pub struct GameStarted { pot: Balance }

    #[ink(event)]
    pub struct WinnerPaid {
        #[ink(topic)]
        winner: AccountId,
        amount: Balance,
    }

    impl GameEscrow {
        #[ink(constructor)]
        pub fn new(
            player1: AccountId,
            player2: AccountId,
            server: AccountId,
            bet_amount: Balance,
        ) -> Self {
            ink_lang::utils::initialize_contract(|contract: &mut Self| {
                contract.player1 = player1;
                contract.player2 = player2;
                contract.server = server;
                contract.bet_amount = bet_amount;
                contract.total_pot = 0;
                contract.player1_deposited = false;
                contract.player2_deposited = false;
                contract.game_started = false;
                contract.game_ended = false;
            })
        }

        #[ink(message, payable)]
        pub fn deposit(&mut self) -> Result<(), Error> {
            let caller = self.env().caller();
            let amount = self.env().transferred_value();

            if self.game_ended {
                return Err(Error::GameEnded);
            }

            if amount != self.bet_amount {
                return Err(Error::IncorrectAmount);
            }

            if caller == self.player1 {
                if self.player1_deposited {
                    return Err(Error::AlreadyDeposited);
                }
                self.player1_deposited = true;
            } else if caller == self.player2 {
                if self.player2_deposited {
                    return Err(Error::AlreadyDeposited);
                }
                self.player2_deposited = true;
            } else {
                return Err(Error::NotAPlayer);
            }

            self.total_pot += amount;
            self.env().emit_event(PlayerDeposited { player: caller, amount });

            if self.player1_deposited && self.player2_deposited && !self.game_started {
                self.game_started = true;
                self.env().emit_event(GameStarted { pot: self.total_pot });
            }

            Ok(())
        }

        #[ink(message)]
        pub fn payout_winner(&mut self, winner: AccountId, signature: [u8; 64]) -> Result<(), Error> {
            if !self.game_started || self.game_ended {
                return Err(Error::InvalidState);
            }

            if winner != self.player1 && winner != self.player2 {
                return Err(Error::InvalidWinner);
            }

            // Verify server signature (simplified)
            // Production: implement proper signature verification

            self.game_ended = true;
            let payout = self.total_pot;
            self.total_pot = 0;

            if self.env().transfer(winner, payout).is_err() {
                return Err(Error::TransferFailed);
            }

            self.env().emit_event(WinnerPaid { winner, amount: payout });
            Ok(())
        }

        #[ink(message)]
        pub fn get_game_state(&self) -> (bool, bool, bool, bool, Balance) {
            (
                self.player1_deposited,
                self.player2_deposited,
                self.game_started,
                self.game_ended,
                self.total_pot,
            )
        }
    }

    #[derive(Debug, PartialEq, Eq, scale::Encode, scale::Decode)]
    #[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
    pub enum Error {
        GameEnded,
        IncorrectAmount,
        AlreadyDeposited,
        NotAPlayer,
        InvalidState,
        InvalidWinner,
        TransferFailed,
        InvalidSignature,
    }
}
\`;

export class PolkadotEscrowContractClient {
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

  async initialize(abi: any): Promise<void> {
    const provider = new WsProvider(this.wsEndpoint);
    this.api = await ApiPromise.create({ provider });
    this.contract = new ContractPromise(this.api, abi, this.contractAddress);
    console.log('Escrow contract initialized at:', this.contractAddress);
  }

  async disconnect(): Promise<void> {
    if (this.api) {
      await this.api.disconnect();
    }
  }

  async depositToEscrow(playerMnemonic: string, betAmountDOT: number): Promise<string> {
    if (!this.contract || !this.api) {
      throw new Error('Contract not initialized');
    }
    
    await cryptoWaitReady();
    const keyring = new Keyring({ type: 'sr25519' });
    const player = keyring.addFromMnemonic(playerMnemonic);
    
    const betAmountPlanck = BigInt(Math.floor(betAmountDOT * 10_000_000_000));
    
    return new Promise((resolve, reject) => {
      this.contract!.tx
        .deposit({ value: betAmountPlanck, gasLimit: -1 })
        .signAndSend(player, ({ status, txHash, dispatchError }) => {
          if (status.isFinalized) {
            if (dispatchError) {
              reject(new Error('Transaction failed'));
            } else {
              console.log(\`Deposit transaction finalized: \${txHash.toString()}\`);
              resolve(txHash.toString());
            }
          }
        })
        .catch(reject);
    });
  }

  async payoutWinner(
    serverMnemonic: string,
    winnerAddress: string
  ): Promise<string> {
    if (!this.contract || !this.api) {
      throw new Error('Contract not initialized');
    }
    
    await cryptoWaitReady();
    const keyring = new Keyring({ type: 'sr25519' });
    const server = keyring.addFromMnemonic(serverMnemonic);
    
    // Create signature
    const message = \`winner:\${winnerAddress}\`;
    const signature = server.sign(message);
    
    return new Promise((resolve, reject) => {
      this.contract!.tx
        .payoutWinner({ value: 0, gasLimit: -1 }, winnerAddress, Array.from(signature))
        .signAndSend(server, ({ status, txHash, dispatchError }) => {
          if (status.isFinalized) {
            if (dispatchError) {
              reject(new Error('Transaction failed'));
            } else {
              console.log(\`Payout transaction finalized: \${txHash.toString()}\`);
              resolve(txHash.toString());
            }
          }
        })
        .catch(reject);
    });
  }

  async getGameState(): Promise<{
    player1Deposited: boolean;
    player2Deposited: boolean;
    gameStarted: boolean;
    gameEnded: boolean;
    totalPot: string;
  }> {
    if (!this.contract) {
      throw new Error('Contract not initialized');
    }

    const { output } = await this.contract.query.getGameState(
      this.contractAddress,
      { value: 0, gasLimit: -1 }
    );

    const state = output?.toHuman() as any;
    
    return {
      player1Deposited: state[0],
      player2Deposited: state[1],
      gameStarted: state[2],
      gameEnded: state[3],
      totalPot: state[4],
    };
  }
}

export default PolkadotEscrowContractClient;
