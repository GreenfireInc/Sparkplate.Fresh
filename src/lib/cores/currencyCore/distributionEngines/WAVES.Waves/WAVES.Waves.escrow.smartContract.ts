/**
 * Waves (WAVES) Smart Contract-based Escrow System
 * On-chain escrow for multiplayer games using Ride
 */

/**
 * WAVES SMART CONTRACT (Ride Language)
 * Deploy this contract to the Waves network (Mainnet/Testnet/Stagenet)
 * 
 * File: GameEscrowContract.ride
 */

/*
{-# STDLIB_VERSION 6 #-}
{-# CONTENT_TYPE DAPP #-}
{-# SCRIPT_TYPE ACCOUNT #-}

# Multiplayer Game Escrow Contract

let KEY_OWNER = "owner"
let KEY_BUY_IN_AMOUNT = "buy_in_amount"
let KEY_REQUIRED_PLAYERS = "required_players"
let KEY_GAME_ACTIVE = "game_active"
let KEY_WINNER = "winner"
let KEY_PLAYER_COUNT = "player_count"
let KEY_TOTAL_POT = "total_pot"

# Player data keys: "player_<address>_<key>"
func playerKey(playerAddress: String, key: String) = {
    "player_" + playerAddress + "_" + key
}

let PLAYER_JOINED = "joined"
let PLAYER_DEPOSITED = "deposited"
let PLAYER_DEPOSIT_AMOUNT = "deposit_amount"

# Error messages
let ERR_ONLY_OWNER = "Only owner can perform this action"
let ERR_ALREADY_JOINED = "Player already joined"
let ERR_GAME_FULL = "Game is full"
let ERR_INSUFFICIENT_PAYMENT = "Insufficient payment amount"
let ERR_GAME_ACTIVE = "Game already started"
let ERR_GAME_NOT_ACTIVE = "Game not started yet"
let ERR_NOT_ENOUGH_PLAYERS = "Not enough players"
let ERR_PLAYER_NOT_FOUND = "Player not found"
let ERR_GAME_ALREADY_ENDED = "Game already ended"

@Callable(i)
func init(buyInAmount: Int, requiredPlayers: Int) = {
    if (i.caller != this) then throw(ERR_ONLY_OWNER) else
    [
        StringEntry(KEY_OWNER, i.caller.toString()),
        IntegerEntry(KEY_BUY_IN_AMOUNT, buyInAmount),
        IntegerEntry(KEY_REQUIRED_PLAYERS, requiredPlayers),
        BooleanEntry(KEY_GAME_ACTIVE, false),
        IntegerEntry(KEY_PLAYER_COUNT, 0),
        IntegerEntry(KEY_TOTAL_POT, 0)
    ]
}

@Callable(i)
func joinGame() = {
    let gameActive = getBooleanValue(this, KEY_GAME_ACTIVE)
    let playerCount = getIntegerValue(this, KEY_PLAYER_COUNT)
    let requiredPlayers = getIntegerValue(this, KEY_REQUIRED_PLAYERS)
    let buyInAmount = getIntegerValue(this, KEY_BUY_IN_AMOUNT)
    let playerAddr = i.caller.toString()
    let isJoined = getBooleanValue(this, playerKey(playerAddr, PLAYER_JOINED))
    
    if (gameActive) then throw(ERR_GAME_ACTIVE)
    else if (isJoined) then throw(ERR_ALREADY_JOINED)
    else if (playerCount >= requiredPlayers) then throw(ERR_GAME_FULL)
    else if (i.payments.size() != 1) then throw("Exactly one payment required")
    else
        let payment = i.payments[0]
        if (payment.assetId != unit) then throw("Only WAVES payments accepted")
        else if (payment.amount < buyInAmount) then throw(ERR_INSUFFICIENT_PAYMENT)
        else
            let newPlayerCount = playerCount + 1
            let newTotalPot = getIntegerValue(this, KEY_TOTAL_POT) + payment.amount
            let shouldStart = newPlayerCount == requiredPlayers
            
            [
                BooleanEntry(playerKey(playerAddr, PLAYER_JOINED), true),
                BooleanEntry(playerKey(playerAddr, PLAYER_DEPOSITED), true),
                IntegerEntry(playerKey(playerAddr, PLAYER_DEPOSIT_AMOUNT), payment.amount),
                IntegerEntry(KEY_PLAYER_COUNT, newPlayerCount),
                IntegerEntry(KEY_TOTAL_POT, newTotalPot),
                BooleanEntry(KEY_GAME_ACTIVE, shouldStart)
            ]
}

@Callable(i)
func declareWinner(winnerAddress: String) = {
    let owner = getStringValue(this, KEY_OWNER)
    let gameActive = getBooleanValue(this, KEY_GAME_ACTIVE)
    let currentWinner = getStringValue(this, KEY_WINNER)
    let isPlayerJoined = getBooleanValue(this, playerKey(winnerAddress, PLAYER_JOINED))
    
    if (i.caller.toString() != owner) then throw(ERR_ONLY_OWNER)
    else if (!gameActive) then throw(ERR_GAME_NOT_ACTIVE)
    else if (currentWinner != "") then throw(ERR_GAME_ALREADY_ENDED)
    else if (!isPlayerJoined) then throw(ERR_PLAYER_NOT_FOUND)
    else
        let totalPot = getIntegerValue(this, KEY_TOTAL_POT)
        let winnerAddr = addressFromString(winnerAddress)
        
        match winnerAddr {
            case addr: Address =>
                [
                    StringEntry(KEY_WINNER, winnerAddress),
                    BooleanEntry(KEY_GAME_ACTIVE, false),
                    ScriptTransfer(addr, totalPot, unit)
                ]
            case _ => throw("Invalid winner address")
        }
}

@Callable(i)
func getGameState() = {
    let buyInAmount = getIntegerValue(this, KEY_BUY_IN_AMOUNT)
    let requiredPlayers = getIntegerValue(this, KEY_REQUIRED_PLAYERS)
    let playerCount = getIntegerValue(this, KEY_PLAYER_COUNT)
    let gameActive = getBooleanValue(this, KEY_GAME_ACTIVE)
    let totalPot = getIntegerValue(this, KEY_TOTAL_POT)
    let winner = getStringValue(this, KEY_WINNER)
    
    (
        [
            IntegerEntry("query_buy_in_amount", buyInAmount),
            IntegerEntry("query_required_players", requiredPlayers),
            IntegerEntry("query_player_count", playerCount),
            BooleanEntry("query_game_active", gameActive),
            IntegerEntry("query_total_pot", totalPot),
            StringEntry("query_winner", winner)
        ],
        unit
    )
}

@Callable(i)
func resetGame() = {
    let owner = getStringValue(this, KEY_OWNER)
    
    if (i.caller.toString() != owner) then throw(ERR_ONLY_OWNER)
    else
        [
            BooleanEntry(KEY_GAME_ACTIVE, false),
            IntegerEntry(KEY_PLAYER_COUNT, 0),
            IntegerEntry(KEY_TOTAL_POT, 0),
            StringEntry(KEY_WINNER, "")
        ]
}

@Verifier(tx)
func verify() = {
    sigVerify(tx.bodyBytes, tx.proofs[0], tx.senderPublicKey)
}
*/

/**
 * TYPESCRIPT CLIENT CODE
 */

import { invokeScript, broadcast, IInvokeScriptParams } from '@waves/waves-transactions';
import axios from 'axios';

export interface ContractConfig {
  contractAddress: string;
  network: 'mainnet' | 'testnet' | 'stagenet';
  chainId: 'W' | 'T' | 'S';
}

export interface GameState {
  buyInAmount: number;
  requiredPlayers: number;
  playerCount: number;
  gameActive: boolean;
  totalPot: number;
  winner: string;
}

export interface PlayerInfo {
  joined: boolean;
  deposited: boolean;
  depositAmount: number;
}

export class WavesEscrowContractClient {
  private contractAddress: string;
  private nodeUrl: string;
  private chainId: 'W' | 'T' | 'S';
  private network: 'mainnet' | 'testnet' | 'stagenet';

  constructor(config: ContractConfig) {
    this.contractAddress = config.contractAddress;
    this.network = config.network;
    this.chainId = config.chainId;
    
    this.nodeUrl = this.getNodeUrl(config.network);
  }

  private getNodeUrl(network: 'mainnet' | 'testnet' | 'stagenet'): string {
    switch (network) {
      case 'mainnet':
        return 'https://nodes.wavesnodes.com';
      case 'testnet':
        return 'https://nodes-testnet.wavesnodes.com';
      case 'stagenet':
        return 'https://nodes-stagenet.wavesnodes.com';
    }
  }

  async joinGame(playerPrivateKey: string, buyInAmountWaves: number): Promise<string> {
    const buyInAmountWavelets = Math.floor(buyInAmountWaves * 1e8);

    const params: IInvokeScriptParams = {
      dApp: this.contractAddress,
      call: {
        function: 'joinGame',
        args: [],
      },
      payment: [{ amount: buyInAmountWavelets, assetId: null }],
      fee: 500000,
      chainId: this.chainId,
    };

    const signedTx = invokeScript(params, playerPrivateKey);
    const result = await broadcast(signedTx, this.nodeUrl);

    console.log(`✅ Player joined game`);
    console.log(`   Transaction: ${result.id}`);

    return result.id;
  }

  async declareWinner(ownerPrivateKey: string, winnerAddress: string): Promise<string> {
    const params: IInvokeScriptParams = {
      dApp: this.contractAddress,
      call: {
        function: 'declareWinner',
        args: [{ type: 'string', value: winnerAddress }],
      },
      fee: 500000,
      chainId: this.chainId,
    };

    const signedTx = invokeScript(params, ownerPrivateKey);
    const result = await broadcast(signedTx, this.nodeUrl);

    console.log(`🏆 Winner declared: ${winnerAddress}`);
    console.log(`   Transaction: ${result.id}`);

    return result.id;
  }

  async resetGame(ownerPrivateKey: string): Promise<string> {
    const params: IInvokeScriptParams = {
      dApp: this.contractAddress,
      call: {
        function: 'resetGame',
        args: [],
      },
      fee: 500000,
      chainId: this.chainId,
    };

    const signedTx = invokeScript(params, ownerPrivateKey);
    const result = await broadcast(signedTx, this.nodeUrl);

    console.log(`✅ Game reset`);
    console.log(`   Transaction: ${result.id}`);

    return result.id;
  }

  async getGameState(): Promise<GameState> {
    const endpoint = `${this.nodeUrl}/addresses/data/${this.contractAddress}`;
    const response = await axios.get(endpoint);

    const data = response.data;

    const buyInAmount = data.find((item: any) => item.key === 'buy_in_amount')?.value || 0;
    const requiredPlayers = data.find((item: any) => item.key === 'required_players')?.value || 0;
    const playerCount = data.find((item: any) => item.key === 'player_count')?.value || 0;
    const gameActive = data.find((item: any) => item.key === 'game_active')?.value || false;
    const totalPot = data.find((item: any) => item.key === 'total_pot')?.value || 0;
    const winner = data.find((item: any) => item.key === 'winner')?.value || '';

    return {
      buyInAmount: buyInAmount / 1e8,
      requiredPlayers,
      playerCount,
      gameActive,
      totalPot: totalPot / 1e8,
      winner,
    };
  }

  async getPlayerInfo(playerAddress: string): Promise<PlayerInfo> {
    const endpoint = `${this.nodeUrl}/addresses/data/${this.contractAddress}`;
    const response = await axios.get(endpoint);

    const data = response.data;
    const playerPrefix = `player_${playerAddress}_`;

    const joined = data.find((item: any) => item.key === `${playerPrefix}joined`)?.value || false;
    const deposited = data.find((item: any) => item.key === `${playerPrefix}deposited`)?.value || false;
    const depositAmount = data.find((item: any) => item.key === `${playerPrefix}deposit_amount`)?.value || 0;

    return {
      joined,
      deposited,
      depositAmount: depositAmount / 1e8,
    };
  }

  async getContractBalance(): Promise<number> {
    const endpoint = `${this.nodeUrl}/addresses/balance/${this.contractAddress}`;
    const response = await axios.get(endpoint);
    return response.data.balance / 1e8;
  }

  async getBuyInAmount(): Promise<number> {
    const state = await this.getGameState();
    return state.buyInAmount;
  }

  async getRequiredPlayers(): Promise<number> {
    const state = await this.getGameState();
    return state.requiredPlayers;
  }

  async isGameActive(): Promise<boolean> {
    const state = await this.getGameState();
    return state.gameActive;
  }

  async getWinner(): Promise<string | null> {
    const state = await this.getGameState();
    return state.winner || null;
  }
}

export default WavesEscrowContractClient;
