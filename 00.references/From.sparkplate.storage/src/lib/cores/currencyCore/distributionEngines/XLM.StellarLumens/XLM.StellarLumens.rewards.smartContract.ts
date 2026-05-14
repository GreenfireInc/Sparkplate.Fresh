/**
 * Stellar Lumens (XLM) Smart Contract-based Reward System
 * On-chain rewards using Soroban smart contracts
 */

/**
 * STELLAR SMART CONTRACT (Soroban - Rust/WASM)
 * Deploy this contract to the Stellar network (Public/Testnet)
 * 
 * File: game_reward_contract.rs
 */

/*
#![no_std]

use soroban_sdk::{
    contract, contractimpl, contracttype, Address, Env, Symbol, Vec,
};

#[contracttype]
pub enum DataKey {
    Owner,
    RewardAmount,
    ScoreThreshold,
    ContractActive,
    PlayerScore(Address),
    PlayerRewarded(Address),
    PlayerRegistered(Address),
}

#[contract]
pub struct GameRewardContract;

#[contractimpl]
impl GameRewardContract {
    /// Initialize the contract
    pub fn initialize(
        env: Env,
        owner: Address,
        reward_amount: i128,
        score_threshold: i32,
    ) -> Result<(), Symbol> {
        if env.storage().instance().has(&DataKey::Owner) {
            return Err(Symbol::new(&env, "already_initialized"));
        }

        env.storage().instance().set(&DataKey::Owner, &owner);
        env.storage().instance().set(&DataKey::RewardAmount, &reward_amount);
        env.storage().instance().set(&DataKey::ScoreThreshold, &score_threshold);
        env.storage().instance().set(&DataKey::ContractActive, &true);

        Ok(())
    }

    /// Register a player
    pub fn register_player(env: Env, player: Address) -> Result<(), Symbol> {
        let registered_key = DataKey::PlayerRegistered(player.clone());
        
        if env.storage().instance().has(&registered_key) {
            return Err(Symbol::new(&env, "already_registered"));
        }

        env.storage().instance().set(&registered_key, &true);
        env.storage().instance().set(&DataKey::PlayerScore(player.clone()), &0i32);
        env.storage().instance().set(&DataKey::PlayerRewarded(player), &false);

        Ok(())
    }

    /// Update player score
    pub fn update_score(env: Env, player: Address, new_score: i32) -> Result<(), Symbol> {
        let registered_key = DataKey::PlayerRegistered(player.clone());
        
        if !env.storage().instance().has(&registered_key) {
            return Err(Symbol::new(&env, "not_registered"));
        }

        let active: bool = env.storage().instance().get(&DataKey::ContractActive).unwrap();
        if !active {
            return Err(Symbol::new(&env, "contract_inactive"));
        }

        let score_key = DataKey::PlayerScore(player.clone());
        let current_score: i32 = env.storage().instance().get(&score_key).unwrap_or(0);

        if new_score > current_score {
            env.storage().instance().set(&score_key, &new_score);
        }

        Ok(())
    }

    /// Claim reward if threshold is met
    pub fn claim_reward(env: Env, player: Address) -> Result<(), Symbol> {
        let registered_key = DataKey::PlayerRegistered(player.clone());
        
        if !env.storage().instance().has(&registered_key) {
            return Err(Symbol::new(&env, "not_registered"));
        }

        let rewarded_key = DataKey::PlayerRewarded(player.clone());
        let already_rewarded: bool = env.storage().instance().get(&rewarded_key).unwrap_or(false);
        
        if already_rewarded {
            return Err(Symbol::new(&env, "already_rewarded"));
        }

        let score_key = DataKey::PlayerScore(player.clone());
        let score: i32 = env.storage().instance().get(&score_key).unwrap_or(0);
        let threshold: i32 = env.storage().instance().get(&DataKey::ScoreThreshold).unwrap();

        if score < threshold {
            return Err(Symbol::new(&env, "score_too_low"));
        }

        let reward_amount: i128 = env.storage().instance().get(&DataKey::RewardAmount).unwrap();

        // Transfer XLM to player
        env.token().transfer(&env.current_contract_address(), &player, &reward_amount);

        env.storage().instance().set(&rewarded_key, &true);

        Ok(())
    }

    /// Get player score
    pub fn get_score(env: Env, player: Address) -> i32 {
        let score_key = DataKey::PlayerScore(player);
        env.storage().instance().get(&score_key).unwrap_or(0)
    }

    /// Check if player is registered
    pub fn is_registered(env: Env, player: Address) -> bool {
        let registered_key = DataKey::PlayerRegistered(player);
        env.storage().instance().get(&registered_key).unwrap_or(false)
    }

    /// Check if player has been rewarded
    pub fn is_rewarded(env: Env, player: Address) -> bool {
        let rewarded_key = DataKey::PlayerRewarded(player);
        env.storage().instance().get(&rewarded_key).unwrap_or(false)
    }

    /// Owner: Set reward amount
    pub fn set_reward_amount(env: Env, caller: Address, new_amount: i128) -> Result<(), Symbol> {
        let owner: Address = env.storage().instance().get(&DataKey::Owner).unwrap();
        
        if caller != owner {
            return Err(Symbol::new(&env, "not_owner"));
        }

        env.storage().instance().set(&DataKey::RewardAmount, &new_amount);
        Ok(())
    }

    /// Owner: Set score threshold
    pub fn set_score_threshold(env: Env, caller: Address, new_threshold: i32) -> Result<(), Symbol> {
        let owner: Address = env.storage().instance().get(&DataKey::Owner).unwrap();
        
        if caller != owner {
            return Err(Symbol::new(&env, "not_owner"));
        }

        env.storage().instance().set(&DataKey::ScoreThreshold, &new_threshold);
        Ok(())
    }

    /// Owner: Set contract active status
    pub fn set_active(env: Env, caller: Address, active: bool) -> Result<(), Symbol> {
        let owner: Address = env.storage().instance().get(&DataKey::Owner).unwrap();
        
        if caller != owner {
            return Err(Symbol::new(&env, "not_owner"));
        }

        env.storage().instance().set(&DataKey::ContractActive, &active);
        Ok(())
    }
}
*/

/**
 * TYPESCRIPT CLIENT CODE
 */

import {
  Server,
  Contract,
  SorobanRpc,
  TransactionBuilder,
  Keypair,
  Networks,
  Operation,
  xdr,
} from 'stellar-sdk';

export interface ContractConfig {
  contractId: string;
  network: 'public' | 'testnet';
}

export interface PlayerData {
  score: number;
  registered: boolean;
  rewarded: boolean;
}

export class StellarSmartContractRewarder {
  private contractId: string;
  private server: Server;
  private rpcServer: SorobanRpc.Server;
  private networkPassphrase: string;
  private network: 'public' | 'testnet';

  constructor(config: ContractConfig) {
    this.contractId = config.contractId;
    this.network = config.network;

    const horizonUrl = config.network === 'public'
      ? 'https://horizon.stellar.org'
      : 'https://horizon-testnet.stellar.org';

    const rpcUrl = config.network === 'public'
      ? 'https://soroban-rpc.stellar.org'
      : 'https://soroban-testnet.stellar.org';

    this.server = new Server(horizonUrl);
    this.rpcServer = new SorobanRpc.Server(rpcUrl);
    this.networkPassphrase = config.network === 'public'
      ? Networks.PUBLIC
      : Networks.TESTNET;
  }

  async registerPlayer(playerSecretKey: string): Promise<string> {
    const playerKeypair = Keypair.fromSecret(playerSecretKey);
    const sourceAccount = await this.server.loadAccount(playerKeypair.publicKey());

    const contract = new Contract(this.contractId);

    const transaction = new TransactionBuilder(sourceAccount, {
      fee: '100',
      networkPassphrase: this.networkPassphrase,
    })
      .addOperation(
        contract.call('register_player', xdr.ScVal.scvAddress(playerKeypair.publicKey()))
      )
      .setTimeout(30)
      .build();

    transaction.sign(playerKeypair);

    const response = await this.server.submitTransaction(transaction);

    console.log(`✅ Player registered`);
    console.log(`   Transaction: ${response.hash}`);

    return response.hash;
  }

  async updateScore(playerSecretKey: string, newScore: number): Promise<string> {
    const playerKeypair = Keypair.fromSecret(playerSecretKey);
    const sourceAccount = await this.server.loadAccount(playerKeypair.publicKey());

    const contract = new Contract(this.contractId);

    const transaction = new TransactionBuilder(sourceAccount, {
      fee: '100',
      networkPassphrase: this.networkPassphrase,
    })
      .addOperation(
        contract.call(
          'update_score',
          xdr.ScVal.scvAddress(playerKeypair.publicKey()),
          xdr.ScVal.scvI32(newScore)
        )
      )
      .setTimeout(30)
      .build();

    transaction.sign(playerKeypair);

    const response = await this.server.submitTransaction(transaction);

    console.log(`✅ Score updated to ${newScore}`);
    console.log(`   Transaction: ${response.hash}`);

    return response.hash;
  }

  async claimReward(playerSecretKey: string): Promise<string> {
    const playerKeypair = Keypair.fromSecret(playerSecretKey);
    const sourceAccount = await this.server.loadAccount(playerKeypair.publicKey());

    const contract = new Contract(this.contractId);

    const transaction = new TransactionBuilder(sourceAccount, {
      fee: '100',
      networkPassphrase: this.networkPassphrase,
    })
      .addOperation(
        contract.call('claim_reward', xdr.ScVal.scvAddress(playerKeypair.publicKey()))
      )
      .setTimeout(30)
      .build();

    transaction.sign(playerKeypair);

    const response = await this.server.submitTransaction(transaction);

    console.log(`✅ Reward claimed!`);
    console.log(`   Transaction: ${response.hash}`);

    return response.hash;
  }

  async getPlayerScore(playerAddress: string): Promise<number> {
    const contract = new Contract(this.contractId);

    // This is a placeholder - actual implementation would use Soroban RPC
    // to call the get_score function
    console.log(`Querying score for ${playerAddress}`);
    
    return 0; // Placeholder
  }

  async isPlayerRegistered(playerAddress: string): Promise<boolean> {
    const contract = new Contract(this.contractId);

    // This is a placeholder - actual implementation would use Soroban RPC
    // to call the is_registered function
    console.log(`Checking registration for ${playerAddress}`);
    
    return false; // Placeholder
  }

  async isPlayerRewarded(playerAddress: string): Promise<boolean> {
    const contract = new Contract(this.contractId);

    // This is a placeholder - actual implementation would use Soroban RPC
    // to call the is_rewarded function
    console.log(`Checking reward status for ${playerAddress}`);
    
    return false; // Placeholder
  }

  async setRewardAmount(ownerSecretKey: string, newAmount: string): Promise<string> {
    const ownerKeypair = Keypair.fromSecret(ownerSecretKey);
    const sourceAccount = await this.server.loadAccount(ownerKeypair.publicKey());

    const contract = new Contract(this.contractId);
    const amountStroops = Math.floor(parseFloat(newAmount) * 10000000);

    const transaction = new TransactionBuilder(sourceAccount, {
      fee: '100',
      networkPassphrase: this.networkPassphrase,
    })
      .addOperation(
        contract.call(
          'set_reward_amount',
          xdr.ScVal.scvAddress(ownerKeypair.publicKey()),
          xdr.ScVal.scvI128(BigInt(amountStroops))
        )
      )
      .setTimeout(30)
      .build();

    transaction.sign(ownerKeypair);

    const response = await this.server.submitTransaction(transaction);

    console.log(`✅ Reward amount updated to ${newAmount} XLM`);
    console.log(`   Transaction: ${response.hash}`);

    return response.hash;
  }

  async setScoreThreshold(ownerSecretKey: string, newThreshold: number): Promise<string> {
    const ownerKeypair = Keypair.fromSecret(ownerSecretKey);
    const sourceAccount = await this.server.loadAccount(ownerKeypair.publicKey());

    const contract = new Contract(this.contractId);

    const transaction = new TransactionBuilder(sourceAccount, {
      fee: '100',
      networkPassphrase: this.networkPassphrase,
    })
      .addOperation(
        contract.call(
          'set_score_threshold',
          xdr.ScVal.scvAddress(ownerKeypair.publicKey()),
          xdr.ScVal.scvI32(newThreshold)
        )
      )
      .setTimeout(30)
      .build();

    transaction.sign(ownerKeypair);

    const response = await this.server.submitTransaction(transaction);

    console.log(`✅ Score threshold updated to ${newThreshold}`);
    console.log(`   Transaction: ${response.hash}`);

    return response.hash;
  }

  async setContractActive(ownerSecretKey: string, active: boolean): Promise<string> {
    const ownerKeypair = Keypair.fromSecret(ownerSecretKey);
    const sourceAccount = await this.server.loadAccount(ownerKeypair.publicKey());

    const contract = new Contract(this.contractId);

    const transaction = new TransactionBuilder(sourceAccount, {
      fee: '100',
      networkPassphrase: this.networkPassphrase,
    })
      .addOperation(
        contract.call(
          'set_active',
          xdr.ScVal.scvAddress(ownerKeypair.publicKey()),
          xdr.ScVal.scvBool(active)
        )
      )
      .setTimeout(30)
      .build();

    transaction.sign(ownerKeypair);

    const response = await this.server.submitTransaction(transaction);

    console.log(`✅ Contract ${active ? 'activated' : 'deactivated'}`);
    console.log(`   Transaction: ${response.hash}`);

    return response.hash;
  }
}

export default StellarSmartContractRewarder;
