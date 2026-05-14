/**
 * Terra (LUNA) Smart Contract Escrow System
 * CosmWasm-based on-chain escrow with server arbitration
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

export const ESCROW_CONTRACT_RUST = `
// CosmWasm Escrow Smart Contract for Terra Gaming
// Cargo.toml dependencies:
// cosmwasm-std = "1.3.1"
// serde = { version = "1.0", features = ["derive"] }
// thiserror = "1.0"

use cosmwasm_std::{
    entry_point, to_binary, Binary, Deps, DepsMut, Env, MessageInfo, Response,
    StdResult, StdError, Uint128, Coin, BankMsg, Addr,
};
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq)]
pub struct InstantiateMsg {
    pub player1: String,
    pub player2: String,
    pub server: String,
    pub bet_amount: Uint128,
    pub bet_denom: String,
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq)]
pub enum ExecuteMsg {
    Deposit {},
    StartGame {},
    DeclareWinner { winner: String, signature: String },
    Refund {},
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq)]
pub enum QueryMsg {
    GetGameState {},
    GetEscrowBalance {},
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq)]
pub struct GameState {
    pub player1: Addr,
    pub player2: Addr,
    pub server: Addr,
    pub bet_amount: Uint128,
    pub bet_denom: String,
    pub player1_deposited: bool,
    pub player2_deposited: bool,
    pub game_started: bool,
    pub game_ended: bool,
    pub winner: Option<Addr>,
    pub total_pot: Uint128,
}

#[entry_point]
pub fn instantiate(
    deps: DepsMut,
    _env: Env,
    _info: MessageInfo,
    msg: InstantiateMsg,
) -> StdResult<Response> {
    let state = GameState {
        player1: deps.api.addr_validate(&msg.player1)?,
        player2: deps.api.addr_validate(&msg.player2)?,
        server: deps.api.addr_validate(&msg.server)?,
        bet_amount: msg.bet_amount,
        bet_denom: msg.bet_denom,
        player1_deposited: false,
        player2_deposited: false,
        game_started: false,
        game_ended: false,
        winner: None,
        total_pot: Uint128::zero(),
    };
    
    Ok(Response::new().add_attribute("action", "instantiate"))
}

#[entry_point]
pub fn execute(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
    msg: ExecuteMsg,
) -> StdResult<Response> {
    match msg {
        ExecuteMsg::Deposit {} => execute_deposit(deps, env, info),
        ExecuteMsg::StartGame {} => execute_start_game(deps, info),
        ExecuteMsg::DeclareWinner { winner, signature } => {
            execute_declare_winner(deps, info, winner, signature)
        }
        ExecuteMsg::Refund {} => execute_refund(deps, env, info),
    }
}

fn execute_deposit(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
) -> StdResult<Response> {
    let mut state: GameState = load_state(deps.storage)?;
    
    if state.game_ended {
        return Err(StdError::generic_err("Game has ended"));
    }
    
    let deposit = info.funds.iter()
        .find(|coin| coin.denom == state.bet_denom)
        .ok_or_else(|| StdError::generic_err("Incorrect deposit denom"))?;
    
    if deposit.amount != state.bet_amount {
        return Err(StdError::generic_err("Incorrect bet amount"));
    }
    
    if info.sender == state.player1 {
        if state.player1_deposited {
            return Err(StdError::generic_err("Player 1 already deposited"));
        }
        state.player1_deposited = true;
    } else if info.sender == state.player2 {
        if state.player2_deposited {
            return Err(StdError::generic_err("Player 2 already deposited"));
        }
        state.player2_deposited = true;
    } else {
        return Err(StdError::generic_err("Not a player"));
    }
    
    state.total_pot += deposit.amount;
    
    if state.player1_deposited && state.player2_deposited && !state.game_started {
        state.game_started = true;
    }
    
    save_state(deps.storage, &state)?;
    
    Ok(Response::new()
        .add_attribute("action", "deposit")
        .add_attribute("player", info.sender)
        .add_attribute("game_started", state.game_started.to_string()))
}

fn execute_start_game(deps: DepsMut, info: MessageInfo) -> StdResult<Response> {
    let state: GameState = load_state(deps.storage)?;
    
    if info.sender != state.server {
        return Err(StdError::generic_err("Only server can start game"));
    }
    
    if !state.player1_deposited || !state.player2_deposited {
        return Err(StdError::generic_err("Not all players have deposited"));
    }
    
    Ok(Response::new().add_attribute("action", "start_game"))
}

fn execute_declare_winner(
    deps: DepsMut,
    info: MessageInfo,
    winner: String,
    signature: String,
) -> StdResult<Response> {
    let mut state: GameState = load_state(deps.storage)?;
    
    if info.sender != state.server {
        return Err(StdError::generic_err("Only server can declare winner"));
    }
    
    if !state.game_started || state.game_ended {
        return Err(StdError::generic_err("Invalid game state"));
    }
    
    let winner_addr = deps.api.addr_validate(&winner)?;
    
    if winner_addr != state.player1 && winner_addr != state.player2 {
        return Err(StdError::generic_err("Invalid winner"));
    }
    
    state.winner = Some(winner_addr.clone());
    state.game_ended = true;
    
    let payout_msg = BankMsg::Send {
        to_address: winner_addr.to_string(),
        amount: vec![Coin {
            denom: state.bet_denom.clone(),
            amount: state.total_pot,
        }],
    };
    
    save_state(deps.storage, &state)?;
    
    Ok(Response::new()
        .add_message(payout_msg)
        .add_attribute("action", "declare_winner")
        .add_attribute("winner", winner_addr))
}

fn execute_refund(deps: DepsMut, env: Env, info: MessageInfo) -> StdResult<Response> {
    let state: GameState = load_state(deps.storage)?;
    
    if state.game_started {
        return Err(StdError::generic_err("Game already started"));
    }
    
    Ok(Response::new().add_attribute("action", "refund"))
}
`;

export interface EscrowContractConfig {
  player1: string;
  player2: string;
  server: string;
  betAmount: string;
  betDenom: string;
  network: 'mainnet' | 'testnet';
}

export interface WinnerDeclaration {
  winner: 'player1' | 'player2';
  timestamp: number;
  signature: string;
}

export class TerraEscrowContract {
  private lcd: LCDClient;
  private wallet: Wallet;
  private chainID: string;
  private contractAddress?: string;

  constructor(mnemonic: string, network: 'mainnet' | 'testnet') {
    this.chainID = network === 'mainnet' ? 'phoenix-1' : 'pisco-1';
    const lcdUrl = network === 'mainnet'
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

  async deployContract(codeId: number, config: EscrowContractConfig): Promise<string> {
    try {
      const senderAddress = this.wallet.key.accAddress(this.chainID);
      const betAmountUluna = Math.floor(parseFloat(config.betAmount) * 1_000_000).toString();

      const instantiateMsg = {
        player1: config.player1,
        player2: config.player2,
        server: config.server,
        bet_amount: betAmountUluna,
        bet_denom: config.betDenom,
      };

      const instantiate = new MsgInstantiateContract(
        senderAddress,
        senderAddress,
        codeId,
        instantiateMsg,
        [],
        'Terra Escrow Game Contract'
      );

      const tx = await this.wallet.createAndSignTx({
        chainID: this.chainID,
        msgs: [instantiate],
      });

      const result = await this.lcd.tx.broadcast(tx, this.chainID);
      const txInfo = await this.lcd.tx.txInfo(result.txhash, this.chainID);

      const instantiateEvent = txInfo.logs[0].events.find((e) => e.type === 'instantiate');
      this.contractAddress = instantiateEvent?.attributes.find(
        (a) => a.key === '_contract_address'
      )?.value;

      console.log(`✅ Escrow contract deployed at: ${this.contractAddress}`);
      return this.contractAddress || '';
    } catch (error) {
      throw new Error(`Failed to deploy escrow contract: ${error}`);
    }
  }

  async deposit(playerMnemonic: string, betAmount: string): Promise<string> {
    if (!this.contractAddress) {
      throw new Error('Contract not deployed');
    }

    try {
      const playerKey = new MnemonicKey({ mnemonic: playerMnemonic });
      const playerWallet = this.lcd.wallet(playerKey);
      const playerAddress = playerWallet.key.accAddress(this.chainID);
      const betAmountUluna = Math.floor(parseFloat(betAmount) * 1_000_000).toString();

      const executeMsg = { deposit: {} };

      const execute = new MsgExecuteContract(
        playerAddress,
        this.contractAddress,
        executeMsg,
        [new Coin('uluna', betAmountUluna)]
      );

      const tx = await playerWallet.createAndSignTx({
        chainID: this.chainID,
        msgs: [execute],
      });

      const result = await this.lcd.tx.broadcast(tx, this.chainID);
      console.log(`✅ Deposited ${betAmount} LUNA to escrow`);
      console.log(`   Transaction: ${result.txhash}`);

      return result.txhash;
    } catch (error) {
      throw new Error(`Failed to deposit: ${error}`);
    }
  }

  signWinnerDeclaration(winner: 'player1' | 'player2', serverPrivateKey: string): WinnerDeclaration {
    const timestamp = Date.now();
    const message = `${winner}:${timestamp}`;
    const messageHash = crypto.createHash('sha256').update(message).digest();

    const sign = crypto.createSign('RSA-SHA256');
    sign.update(messageHash);
    const signature = sign.sign(serverPrivateKey, 'hex');

    return {
      winner,
      timestamp,
      signature,
    };
  }

  async declareWinner(
    winnerAddress: string,
    declaration: WinnerDeclaration
  ): Promise<string> {
    if (!this.contractAddress) {
      throw new Error('Contract not deployed');
    }

    try {
      const serverAddress = this.wallet.key.accAddress(this.chainID);

      const executeMsg = {
        declare_winner: {
          winner: winnerAddress,
          signature: declaration.signature,
        },
      };

      const execute = new MsgExecuteContract(
        serverAddress,
        this.contractAddress,
        executeMsg
      );

      const tx = await this.wallet.createAndSignTx({
        chainID: this.chainID,
        msgs: [execute],
      });

      const result = await this.lcd.tx.broadcast(tx, this.chainID);
      console.log(`✅ Winner declared: ${winnerAddress}`);
      console.log(`   Transaction: ${result.txhash}`);

      return result.txhash;
    } catch (error) {
      throw new Error(`Failed to declare winner: ${error}`);
    }
  }

  async queryGameState(): Promise<unknown> {
    if (!this.contractAddress) {
      throw new Error('Contract not deployed');
    }

    try {
      const queryMsg = { get_game_state: {} };
      const result = await this.lcd.wasm.contractQuery(this.contractAddress, queryMsg);
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

export class TerraEscrowContractClient {
  private contract: TerraEscrowContract;
  private config: EscrowContractConfig;

  constructor(serverMnemonic: string, config: EscrowContractConfig) {
    this.contract = new TerraEscrowContract(serverMnemonic, config.network);
    this.config = config;
  }

  async deployEscrowContract(codeId: number): Promise<string> {
    return await this.contract.deployContract(codeId, this.config);
  }

  async player1Deposit(player1Mnemonic: string): Promise<string> {
    return await this.contract.deposit(player1Mnemonic, this.config.betAmount);
  }

  async player2Deposit(player2Mnemonic: string): Promise<string> {
    return await this.contract.deposit(player2Mnemonic, this.config.betAmount);
  }

  signWinner(winner: 'player1' | 'player2', serverPrivateKey: string): WinnerDeclaration {
    return this.contract.signWinnerDeclaration(winner, serverPrivateKey);
  }

  async payoutToWinner(
    winnerAddress: string,
    declaration: WinnerDeclaration
  ): Promise<string> {
    return await this.contract.declareWinner(winnerAddress, declaration);
  }

  async getGameState(): Promise<unknown> {
    return await this.contract.queryGameState();
  }

  useExistingContract(contractAddress: string): void {
    this.contract.setContractAddress(contractAddress);
  }
}

export default TerraEscrowContractClient;
