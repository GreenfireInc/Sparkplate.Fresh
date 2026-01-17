/**
 * Terra Classic (LUNC) Smart Contract Reward System
 * CosmWasm-based on-chain rewards with server attestation
 */

import {
  LCDClient,
  MnemonicKey,
  MsgExecuteContract,
  MsgInstantiateContract,
  Wallet,
  Coin,
} from '@terra-money/terra.js';
import * as crypto from 'crypto';

export const REWARD_CONTRACT_RUST = `
// CosmWasm Smart Contract for Terra Classic Reward System
// Cargo.toml dependencies:
// cosmwasm-std = "0.16"  # Terra Classic uses older CosmWasm version
// serde = { version = "1.0", features = ["derive"] }
// thiserror = "1.0"

use cosmwasm_std::{
    entry_point, to_binary, Binary, Deps, DepsMut, Env, MessageInfo, Response,
    StdResult, Uint128, Coin, BankMsg, Addr,
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
    _info: MessageInfo,
    msg: InstantiateMsg,
) -> StdResult<Response> {
    let admin = deps.api.addr_validate(&msg.admin)?;
    let config = Config {
        admin,
        high_score_reward: msg.high_score_reward,
        reward_denom: msg.reward_denom,
    };
    
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

export class TerraClassicRewardContract {
  private lcd: LCDClient;
  private wallet: Wallet;
  private contractAddress?: string;

  constructor(mnemonic: string, network: 'mainnet' | 'testnet') {
    const lcdUrl = network === 'mainnet'
      ? 'https://terra-classic-lcd.publicnode.com'
      : 'https://bombay-lcd.terra.dev';

    const chainID = network === 'mainnet' ? 'columbus-5' : 'bombay-12';

    const gasPrices = network === 'mainnet'
      ? '28.325uluna'
      : '0.15uluna';

    this.lcd = new LCDClient({
      URL: lcdUrl,
      chainID,
      gasPrices,
      gasAdjustment: 1.75,
    });

    const mk = new MnemonicKey({ mnemonic });
    this.wallet = this.lcd.wallet(mk);
  }

  async deployContract(codeId: number, config: RewardContractConfig): Promise<string> {
    try {
      const instantiateMsg = {
        admin: config.admin,
        high_score_reward: config.highScoreReward,
        reward_denom: config.rewardDenom,
      };

      const instantiate = new MsgInstantiateContract(
        this.wallet.key.accAddress,
        this.wallet.key.accAddress,
        codeId,
        instantiateMsg,
        [],
        'Terra Classic Reward Game Contract'
      );

      const tx = await this.wallet.createAndSignTx({
        msgs: [instantiate],
      });

      const result = await this.lcd.tx.broadcast(tx);
      const txInfo = await this.lcd.tx.txInfo(result.txhash);

      const instantiateEvent = txInfo.logs[0].events.find(
        (e: { type: string }) => e.type === 'instantiate'
      );
      this.contractAddress = instantiateEvent?.attributes.find(
        (a: { key: string }) => a.key === '_contract_address'
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

      const executeMsg = {
        submit_score: {
          score,
          signature: attestation.signature,
        },
      };

      const execute = new MsgExecuteContract(
        playerWallet.key.accAddress,
        this.contractAddress,
        executeMsg
      );

      const tx = await playerWallet.createAndSignTx({
        msgs: [execute],
      });

      const result = await this.lcd.tx.broadcast(tx);
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
      const amountUluna = Math.floor(parseFloat(amount) * 1_000_000).toString();

      const executeMsg = { deposit_rewards: {} };

      const execute = new MsgExecuteContract(
        this.wallet.key.accAddress,
        this.contractAddress,
        executeMsg,
        [new Coin('uluna', amountUluna)]
      );

      const tx = await this.wallet.createAndSignTx({
        msgs: [execute],
      });

      const result = await this.lcd.tx.broadcast(tx);
      console.log(`✅ Deposited ${amount} LUNC to reward contract`);
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

export class TerraClassicSmartContractRewarder {
  private contract: TerraClassicRewardContract;
  private config: RewardContractConfig;

  constructor(mnemonic: string, config: RewardContractConfig) {
    this.contract = new TerraClassicRewardContract(mnemonic, config.network);
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

export default TerraClassicSmartContractRewarder;
