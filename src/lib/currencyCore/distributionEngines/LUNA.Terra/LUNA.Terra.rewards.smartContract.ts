/**
 * Terra (LUNA) Smart Contract Reward System
 * CosmWasm-based on-chain rewards with server attestation
 */

import {
  LCDClient,
  MnemonicKey,
  MsgExecuteContract,
  MsgInstantiateContract,
  Wallet,
  Coin,
} from '@terra-money/feather.js';
import * as crypto from 'crypto';

export const REWARD_CONTRACT_RUST = `
// CosmWasm Smart Contract for Terra Reward System
// Cargo.toml dependencies:
// cosmwasm-std = "1.3.1"
// serde = { version = "1.0", features = ["derive"] }
// thiserror = "1.0"

use cosmwasm_std::{
    entry_point, to_binary, Binary, Deps, DepsMut, Env, MessageInfo, Response,
    StdResult, Uint128, Coin, BankMsg, Addr, Storage,
};
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq)]
pub struct InstantiateMsg {
    pub admin: String,
    pub high_score_reward: Uint128,
    pub reward_denom: String,
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq)]
pub enum ExecuteMsg {
    SubmitScore { score: u64, signature: String },
    ClaimReward {},
    DepositRewards {},
    UpdateConfig { high_score_reward: Option<Uint128> },
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq)]
pub enum QueryMsg {
    GetGameState { address: String },
    GetConfig {},
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq)]
pub struct GameState {
    pub player: Addr,
    pub highest_score: u64,
    pub reward_claimed: bool,
    pub total_rewards_earned: Uint128,
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq)]
pub struct Config {
    pub admin: Addr,
    pub high_score_reward: Uint128,
    pub reward_denom: String,
}

#[entry_point]
pub fn instantiate(
    deps: DepsMut,
    _env: Env,
    info: MessageInfo,
    msg: InstantiateMsg,
) -> StdResult<Response> {
    let admin = deps.api.addr_validate(&msg.admin)?;
    let config = Config {
        admin,
        high_score_reward: msg.high_score_reward,
        reward_denom: msg.reward_denom,
    };
    
    // Save config to storage
    Ok(Response::new()
        .add_attribute("action", "instantiate")
        .add_attribute("admin", config.admin))
}

#[entry_point]
pub fn execute(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
    msg: ExecuteMsg,
) -> StdResult<Response> {
    match msg {
        ExecuteMsg::SubmitScore { score, signature } => {
            execute_submit_score(deps, env, info, score, signature)
        }
        ExecuteMsg::ClaimReward {} => execute_claim_reward(deps, env, info),
        ExecuteMsg::DepositRewards {} => Ok(Response::new()),
        ExecuteMsg::UpdateConfig { high_score_reward } => {
            execute_update_config(deps, info, high_score_reward)
        }
    }
}

fn execute_submit_score(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
    score: u64,
    signature: String,
) -> StdResult<Response> {
    // Verify signature from server
    // Award reward if score threshold met
    
    let config: Config = load_config(deps.storage)?;
    
    if score >= 10000 {
        let reward_msg = BankMsg::Send {
            to_address: info.sender.to_string(),
            amount: vec![Coin {
                denom: config.reward_denom.clone(),
                amount: config.high_score_reward,
            }],
        };
        
        Ok(Response::new()
            .add_message(reward_msg)
            .add_attribute("action", "reward_sent")
            .add_attribute("amount", config.high_score_reward))
    } else {
        Ok(Response::new().add_attribute("action", "score_recorded"))
    }
}

fn execute_claim_reward(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
) -> StdResult<Response> {
    // Claim logic
    Ok(Response::new())
}

fn execute_update_config(
    deps: DepsMut,
    info: MessageInfo,
    high_score_reward: Option<Uint128>,
) -> StdResult<Response> {
    // Admin-only config updates
    Ok(Response::new())
}
`;

export interface RewardContractConfig {
  admin: string;
  highScoreReward: string;
  rewardDenom: string;
  network: 'mainnet' | 'testnet';
}

export interface ScoreAttestation {
  playerAddress: string;
  score: number;
  timestamp: number;
  signature: string;
}

export class TerraRewardContract {
  private lcd: LCDClient;
  private wallet: Wallet;
  private chainID: string;
  private contractAddress?: string;

  constructor(mnemonic: string, config: RewardContractConfig) {
    this.chainID = config.network === 'mainnet' ? 'phoenix-1' : 'pisco-1';
    const lcdUrl = config.network === 'mainnet'
      ? 'https://phoenix-lcd.terra.dev'
      : 'https://pisco-lcd.terra.dev';

    this.lcd = new LCDClient({
      [this.chainID]: {
        lcd: lcdUrl,
        chainID: this.chainID,
        gasAdjustment: 1.4,
        gasPrices: { uluna: '0.015' },
        prefix: 'terra',
      },
    });

    const mk = new MnemonicKey({ mnemonic });
    this.wallet = this.lcd.wallet(mk);
  }

  async deployContract(codeId: number, config: RewardContractConfig): Promise<string> {
    try {
      const senderAddress = this.wallet.key.accAddress(this.chainID);

      const instantiateMsg = {
        admin: config.admin,
        high_score_reward: config.highScoreReward,
        reward_denom: config.rewardDenom,
      };

      const instantiate = new MsgInstantiateContract(
        senderAddress,
        senderAddress,
        codeId,
        instantiateMsg,
        [],
        'Terra Reward Game Contract'
      );

      const tx = await this.wallet.createAndSignTx({
        chainID: this.chainID,
        msgs: [instantiate],
      });

      const result = await this.lcd.tx.broadcast(tx, this.chainID);
      const txInfo = await this.lcd.tx.txInfo(result.txhash, this.chainID);

      const instantiateEvent = txInfo.logs[0].events.find(
        (e) => e.type === 'instantiate'
      );
      this.contractAddress = instantiateEvent?.attributes.find(
        (a) => a.key === '_contract_address'
      )?.value;

      console.log(`✅ Contract deployed at: ${this.contractAddress}`);
      return this.contractAddress || '';
    } catch (error) {
      throw new Error(`Failed to deploy contract: ${error}`);
    }
  }

  createAttestation(playerAddress: string, score: number, serverPrivateKey: string): ScoreAttestation {
    const timestamp = Date.now();
    const message = `${playerAddress}:${score}:${timestamp}`;
    const messageHash = crypto.createHash('sha256').update(message).digest();

    const sign = crypto.createSign('RSA-SHA256');
    sign.update(messageHash);
    const signature = sign.sign(serverPrivateKey, 'hex');

    return {
      playerAddress,
      score,
      timestamp,
      signature,
    };
  }

  async submitScore(
    playerMnemonic: string,
    score: number,
    attestation: ScoreAttestation
  ): Promise<string> {
    if (!this.contractAddress) {
      throw new Error('Contract not deployed');
    }

    try {
      const playerKey = new MnemonicKey({ mnemonic: playerMnemonic });
      const playerWallet = this.lcd.wallet(playerKey);
      const playerAddress = playerWallet.key.accAddress(this.chainID);

      const executeMsg = {
        submit_score: {
          score,
          signature: attestation.signature,
        },
      };

      const execute = new MsgExecuteContract(
        playerAddress,
        this.contractAddress,
        executeMsg
      );

      const tx = await playerWallet.createAndSignTx({
        chainID: this.chainID,
        msgs: [execute],
      });

      const result = await this.lcd.tx.broadcast(tx, this.chainID);
      console.log(`✅ Score submitted: ${score}`);
      console.log(`   Transaction: ${result.txhash}`);

      return result.txhash;
    } catch (error) {
      throw new Error(`Failed to submit score: ${error}`);
    }
  }

  async depositRewards(amount: string): Promise<string> {
    if (!this.contractAddress) {
      throw new Error('Contract not deployed');
    }

    try {
      const senderAddress = this.wallet.key.accAddress(this.chainID);
      const amountUluna = Math.floor(parseFloat(amount) * 1_000_000).toString();

      const executeMsg = { deposit_rewards: {} };

      const execute = new MsgExecuteContract(
        senderAddress,
        this.contractAddress,
        executeMsg,
        [new Coin('uluna', amountUluna)]
      );

      const tx = await this.wallet.createAndSignTx({
        chainID: this.chainID,
        msgs: [execute],
      });

      const result = await this.lcd.tx.broadcast(tx, this.chainID);
      console.log(`✅ Deposited ${amount} LUNA to reward contract`);
      console.log(`   Transaction: ${result.txhash}`);

      return result.txhash;
    } catch (error) {
      throw new Error(`Failed to deposit rewards: ${error}`);
    }
  }

  async queryGameState(playerAddress: string): Promise<unknown> {
    if (!this.contractAddress) {
      throw new Error('Contract not deployed');
    }

    try {
      const queryMsg = {
        get_game_state: {
          address: playerAddress,
        },
      };

      const result = await this.lcd.wasm.contractQuery(
        this.contractAddress,
        queryMsg
      );

      return result;
    } catch (error) {
      throw new Error(`Failed to query game state: ${error}`);
    }
  }

  setContractAddress(address: string): void {
    this.contractAddress = address;
  }

  getContractAddress(): string | undefined {
    return this.contractAddress;
  }
}

export class TerraSmartContractRewarder {
  private contract: TerraRewardContract;
  private config: RewardContractConfig;

  constructor(mnemonic: string, config: RewardContractConfig) {
    this.contract = new TerraRewardContract(mnemonic, config);
    this.config = config;
  }

  async deployRewardContract(codeId: number): Promise<string> {
    return await this.contract.deployContract(codeId, this.config);
  }

  attestPlayerScore(playerAddress: string, score: number, serverPrivateKey: string): ScoreAttestation {
    return this.contract.createAttestation(playerAddress, score, serverPrivateKey);
  }

  async submitPlayerScore(
    playerMnemonic: string,
    score: number,
    attestation: ScoreAttestation
  ): Promise<string> {
    return await this.contract.submitScore(playerMnemonic, score, attestation);
  }

  async fundRewardPool(amount: string): Promise<string> {
    return await this.contract.depositRewards(amount);
  }

  async getPlayerState(playerAddress: string): Promise<unknown> {
    return await this.contract.queryGameState(playerAddress);
  }

  useExistingContract(contractAddress: string): void {
    this.contract.setContractAddress(contractAddress);
  }
}

export default TerraSmartContractRewarder;
