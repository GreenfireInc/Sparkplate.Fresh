/**
 * Waves (WAVES) Smart Contract-based Reward System
 * On-chain rewards using Ride smart contracts
 */

/**
 * WAVES SMART CONTRACT (Ride Language)
 * Deploy this contract to the Waves network (Mainnet/Testnet/Stagenet)
 * 
 * File: GameRewardContract.ride
 */

/*
{-# STDLIB_VERSION 6 #-}
{-# CONTENT_TYPE DAPP #-}
{-# SCRIPT_TYPE ACCOUNT #-}

# Game Reward Smart Contract
# Allows players to register, play games, and claim rewards for high scores

let VERSION = "1.0.0"

# Configuration keys
let KEY_OWNER = "owner"
let KEY_GAME_ACTIVE = "game_active"
let KEY_REWARD_AMOUNT = "reward_amount"
let KEY_HIGH_SCORE_THRESHOLD = "high_score_threshold"
let KEY_MIN_CLAIM_INTERVAL = "min_claim_interval"
let KEY_CONTRACT_BALANCE = "contract_balance"

# Player data keys structure: "player_<address>_<key>"
func playerKey(playerAddress: String, key: String) = {
    "player_" + playerAddress + "_" + key
}

# Player data keys
let PLAYER_REGISTERED = "registered"
let PLAYER_HIGH_SCORE = "high_score"
let PLAYER_LAST_CLAIM = "last_claim"
let PLAYER_TOTAL_REWARDS = "total_rewards"

# Error codes
let ERR_ONLY_OWNER = "Only owner can perform this action"
let ERR_GAME_INACTIVE = "Game is currently inactive"
let ERR_NOT_REGISTERED = "Player not registered"
let ERR_SCORE_TOO_LOW = "Score does not meet high score threshold"
let ERR_CLAIM_TOO_SOON = "Too soon to claim another reward"
let ERR_INSUFFICIENT_FUNDS = "Insufficient contract balance"
let ERR_INVALID_AMOUNT = "Invalid amount"
let ERR_ALREADY_REGISTERED = "Player already registered"

@Callable(i)
func init() = {
    if (i.caller != this) then throw(ERR_ONLY_OWNER) else
    [
        StringEntry(KEY_OWNER, i.caller.toString()),
        BooleanEntry(KEY_GAME_ACTIVE, true),
        IntegerEntry(KEY_REWARD_AMOUNT, 100000000), # 1 WAVES in wavelets
        IntegerEntry(KEY_HIGH_SCORE_THRESHOLD, 10000),
        IntegerEntry(KEY_MIN_CLAIM_INTERVAL, 3600000), # 1 hour in milliseconds
        IntegerEntry(KEY_CONTRACT_BALANCE, 0)
    ]
}

@Callable(i)
func registerPlayer() = {
    let playerAddr = i.caller.toString()
    let isRegistered = getBooleanValue(this, playerKey(playerAddr, PLAYER_REGISTERED))
    
    if (isRegistered) then throw(ERR_ALREADY_REGISTERED) else
    [
        BooleanEntry(playerKey(playerAddr, PLAYER_REGISTERED), true),
        IntegerEntry(playerKey(playerAddr, PLAYER_HIGH_SCORE), 0),
        IntegerEntry(playerKey(playerAddr, PLAYER_LAST_CLAIM), 0),
        IntegerEntry(playerKey(playerAddr, PLAYER_TOTAL_REWARDS), 0)
    ]
}

@Callable(i)
func updateScore(newScore: Int) = {
    let gameActive = getBooleanValue(this, KEY_GAME_ACTIVE)
    let playerAddr = i.caller.toString()
    let isRegistered = getBooleanValue(this, playerKey(playerAddr, PLAYER_REGISTERED))
    
    if (!gameActive) then throw(ERR_GAME_INACTIVE)
    else if (!isRegistered) then throw(ERR_NOT_REGISTERED)
    else
        let currentScore = getIntegerValue(this, playerKey(playerAddr, PLAYER_HIGH_SCORE))
        let updatedScore = if (newScore > currentScore) then newScore else currentScore
        
        [
            IntegerEntry(playerKey(playerAddr, PLAYER_HIGH_SCORE), updatedScore)
        ]
}

@Callable(i)
func claimReward() = {
    let gameActive = getBooleanValue(this, KEY_GAME_ACTIVE)
    let playerAddr = i.caller.toString()
    let isRegistered = getBooleanValue(this, playerKey(playerAddr, PLAYER_REGISTERED))
    
    if (!gameActive) then throw(ERR_GAME_INACTIVE)
    else if (!isRegistered) then throw(ERR_NOT_REGISTERED)
    else
        let playerScore = getIntegerValue(this, playerKey(playerAddr, PLAYER_HIGH_SCORE))
        let threshold = getIntegerValue(this, KEY_HIGH_SCORE_THRESHOLD)
        let rewardAmount = getIntegerValue(this, KEY_REWARD_AMOUNT)
        let lastClaim = getIntegerValue(this, playerKey(playerAddr, PLAYER_LAST_CLAIM))
        let minInterval = getIntegerValue(this, KEY_MIN_CLAIM_INTERVAL)
        let currentTime = lastBlock.timestamp
        
        if (playerScore < threshold) then throw(ERR_SCORE_TOO_LOW)
        else if (currentTime - lastClaim < minInterval) then throw(ERR_CLAIM_TOO_SOON)
        else if (wavesBalance(this).regular < rewardAmount) then throw(ERR_INSUFFICIENT_FUNDS)
        else
            let totalRewards = getIntegerValue(this, playerKey(playerAddr, PLAYER_TOTAL_REWARDS))
            
            [
                IntegerEntry(playerKey(playerAddr, PLAYER_LAST_CLAIM), currentTime),
                IntegerEntry(playerKey(playerAddr, PLAYER_TOTAL_REWARDS), totalRewards + rewardAmount),
                ScriptTransfer(i.caller, rewardAmount, unit)
            ]
}

@Callable(i)
func setRewardAmount(newAmount: Int) = {
    let owner = getStringValue(this, KEY_OWNER)
    
    if (i.caller.toString() != owner) then throw(ERR_ONLY_OWNER)
    else if (newAmount <= 0) then throw(ERR_INVALID_AMOUNT)
    else
        [
            IntegerEntry(KEY_REWARD_AMOUNT, newAmount)
        ]
}

@Callable(i)
func setHighScoreThreshold(newThreshold: Int) = {
    let owner = getStringValue(this, KEY_OWNER)
    
    if (i.caller.toString() != owner) then throw(ERR_ONLY_OWNER)
    else if (newThreshold <= 0) then throw(ERR_INVALID_AMOUNT)
    else
        [
            IntegerEntry(KEY_HIGH_SCORE_THRESHOLD, newThreshold)
        ]
}

@Callable(i)
func setGameActive(active: Boolean) = {
    let owner = getStringValue(this, KEY_OWNER)
    
    if (i.caller.toString() != owner) then throw(ERR_ONLY_OWNER)
    else
        [
            BooleanEntry(KEY_GAME_ACTIVE, active)
        ]
}

@Callable(i)
func fundContract() = {
    if (i.payments.size() != 1) then throw("Exactly one payment required")
    else
        let payment = i.payments[0]
        if (payment.assetId != unit) then throw("Only WAVES payments accepted")
        else
            let currentBalance = getIntegerValue(this, KEY_CONTRACT_BALANCE)
            [
                IntegerEntry(KEY_CONTRACT_BALANCE, currentBalance + payment.amount)
            ]
}

@Callable(i)
func withdrawFunds(amount: Int) = {
    let owner = getStringValue(this, KEY_OWNER)
    
    if (i.caller.toString() != owner) then throw(ERR_ONLY_OWNER)
    else if (amount <= 0) then throw(ERR_INVALID_AMOUNT)
    else if (wavesBalance(this).regular < amount) then throw(ERR_INSUFFICIENT_FUNDS)
    else
        [
            ScriptTransfer(i.caller, amount, unit)
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

export interface PlayerData {
  registered: boolean;
  highScore: number;
  lastClaim: number;
  totalRewards: number;
}

export class WavesSmartContractRewarder {
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

  async registerPlayer(playerPrivateKey: string): Promise<string> {
    const params: IInvokeScriptParams = {
      dApp: this.contractAddress,
      call: {
        function: 'registerPlayer',
        args: [],
      },
      fee: 500000,
      chainId: this.chainId,
    };

    const signedTx = invokeScript(params, playerPrivateKey);
    const result = await broadcast(signedTx, this.nodeUrl);

    console.log(`✅ Player registered`);
    console.log(`   Transaction: ${result.id}`);

    return result.id;
  }

  async updateScore(playerPrivateKey: string, newScore: number): Promise<string> {
    const params: IInvokeScriptParams = {
      dApp: this.contractAddress,
      call: {
        function: 'updateScore',
        args: [{ type: 'integer', value: newScore }],
      },
      fee: 500000,
      chainId: this.chainId,
    };

    const signedTx = invokeScript(params, playerPrivateKey);
    const result = await broadcast(signedTx, this.nodeUrl);

    console.log(`✅ Score updated to ${newScore}`);
    console.log(`   Transaction: ${result.id}`);

    return result.id;
  }

  async claimReward(playerPrivateKey: string): Promise<string> {
    const params: IInvokeScriptParams = {
      dApp: this.contractAddress,
      call: {
        function: 'claimReward',
        args: [],
      },
      fee: 500000,
      chainId: this.chainId,
    };

    const signedTx = invokeScript(params, playerPrivateKey);
    const result = await broadcast(signedTx, this.nodeUrl);

    console.log(`✅ Reward claimed!`);
    console.log(`   Transaction: ${result.id}`);

    return result.id;
  }

  async setRewardAmount(ownerPrivateKey: string, newAmount: number): Promise<string> {
    const amountInWavelets = Math.floor(newAmount * 1e8);

    const params: IInvokeScriptParams = {
      dApp: this.contractAddress,
      call: {
        function: 'setRewardAmount',
        args: [{ type: 'integer', value: amountInWavelets }],
      },
      fee: 500000,
      chainId: this.chainId,
    };

    const signedTx = invokeScript(params, ownerPrivateKey);
    const result = await broadcast(signedTx, this.nodeUrl);

    console.log(`✅ Reward amount updated to ${newAmount} WAVES`);
    console.log(`   Transaction: ${result.id}`);

    return result.id;
  }

  async setHighScoreThreshold(ownerPrivateKey: string, newThreshold: number): Promise<string> {
    const params: IInvokeScriptParams = {
      dApp: this.contractAddress,
      call: {
        function: 'setHighScoreThreshold',
        args: [{ type: 'integer', value: newThreshold }],
      },
      fee: 500000,
      chainId: this.chainId,
    };

    const signedTx = invokeScript(params, ownerPrivateKey);
    const result = await broadcast(signedTx, this.nodeUrl);

    console.log(`✅ High score threshold updated to ${newThreshold}`);
    console.log(`   Transaction: ${result.id}`);

    return result.id;
  }

  async setGameActive(ownerPrivateKey: string, active: boolean): Promise<string> {
    const params: IInvokeScriptParams = {
      dApp: this.contractAddress,
      call: {
        function: 'setGameActive',
        args: [{ type: 'boolean', value: active }],
      },
      fee: 500000,
      chainId: this.chainId,
    };

    const signedTx = invokeScript(params, ownerPrivateKey);
    const result = await broadcast(signedTx, this.nodeUrl);

    console.log(`✅ Game ${active ? 'activated' : 'deactivated'}`);
    console.log(`   Transaction: ${result.id}`);

    return result.id;
  }

  async fundContract(privateKey: string, amount: number): Promise<string> {
    const amountInWavelets = Math.floor(amount * 1e8);

    const params: IInvokeScriptParams = {
      dApp: this.contractAddress,
      call: {
        function: 'fundContract',
        args: [],
      },
      payment: [{ amount: amountInWavelets, assetId: null }],
      fee: 500000,
      chainId: this.chainId,
    };

    const signedTx = invokeScript(params, privateKey);
    const result = await broadcast(signedTx, this.nodeUrl);

    console.log(`✅ Contract funded with ${amount} WAVES`);
    console.log(`   Transaction: ${result.id}`);

    return result.id;
  }

  async withdrawFunds(ownerPrivateKey: string, amount: number): Promise<string> {
    const amountInWavelets = Math.floor(amount * 1e8);

    const params: IInvokeScriptParams = {
      dApp: this.contractAddress,
      call: {
        function: 'withdrawFunds',
        args: [{ type: 'integer', value: amountInWavelets }],
      },
      fee: 500000,
      chainId: this.chainId,
    };

    const signedTx = invokeScript(params, ownerPrivateKey);
    const result = await broadcast(signedTx, this.nodeUrl);

    console.log(`✅ Withdrawn ${amount} WAVES from contract`);
    console.log(`   Transaction: ${result.id}`);

    return result.id;
  }

  async getPlayerData(playerAddress: string): Promise<PlayerData> {
    const endpoint = `${this.nodeUrl}/addresses/data/${this.contractAddress}`;
    const response = await axios.get(endpoint);

    const data = response.data;
    const playerPrefix = `player_${playerAddress}_`;

    const registered = data.find((item: any) => item.key === `${playerPrefix}registered`)?.value || false;
    const highScore = data.find((item: any) => item.key === `${playerPrefix}high_score`)?.value || 0;
    const lastClaim = data.find((item: any) => item.key === `${playerPrefix}last_claim`)?.value || 0;
    const totalRewards = data.find((item: any) => item.key === `${playerPrefix}total_rewards`)?.value || 0;

    return {
      registered,
      highScore,
      lastClaim,
      totalRewards: totalRewards / 1e8,
    };
  }

  async getRewardAmount(): Promise<number> {
    const endpoint = `${this.nodeUrl}/addresses/data/${this.contractAddress}/reward_amount`;
    const response = await axios.get(endpoint);
    return response.data.value / 1e8;
  }

  async getHighScoreThreshold(): Promise<number> {
    const endpoint = `${this.nodeUrl}/addresses/data/${this.contractAddress}/high_score_threshold`;
    const response = await axios.get(endpoint);
    return response.data.value;
  }

  async isGameActive(): Promise<boolean> {
    const endpoint = `${this.nodeUrl}/addresses/data/${this.contractAddress}/game_active`;
    const response = await axios.get(endpoint);
    return response.data.value;
  }
}

export default WavesSmartContractRewarder;
