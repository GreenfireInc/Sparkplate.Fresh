/**
 * Bitcoin Cash (BCH) Manual Reward Distribution System
 * 
 * Server-side reward distribution for Bitcoin Cash with:
 * - CashAddress and legacy address support
 * - Manual wallet-to-wallet transfers
 * - Game integration with score-based rewards
 * - Secure private key management
 * 
 * Security: Keep private keys server-side only. Never expose to clients.
 */

import * as bch from '@psf/bch-js';
import * as crypto from 'crypto';

export interface GameConfig {
  rewardThreshold: number; // Points needed to earn reward
  rewardAmount: number; // Amount in BCH
  network: 'mainnet' | 'testnet';
}

export interface WalletConfig {
  privateKeyWIF: string; // Private key in WIF format
  network: 'mainnet' | 'testnet';
}

export interface Player {
  publicAddress: string; // CashAddress or legacy format
  cashAddress?: string; // Standardized CashAddress
  currentScore: number;
  hasBeenRewarded: boolean;
}

export interface TransactionResult {
  success: boolean;
  txid?: string;
  error?: string;
  rawTx?: string;
}

/**
 * Bitcoin Cash Rewarder for manual reward distribution
 */
export class BitcoinCashRewarder {
  private bchjs: typeof bch;
  private network: 'mainnet' | 'testnet';
  
  constructor(network: 'mainnet' | 'testnet' = 'mainnet') {
    this.network = network;
    this.bchjs = new bch({
      restURL: network === 'mainnet' 
        ? 'https://bchn.fullstack.cash/v5/'
        : 'https://testnet3.fullstack.cash/v5/'
    });
  }

  /**
   * Resolve and validate Bitcoin Cash address
   */
  async resolveAddress(input: string): Promise<string> {
    try {
      // Try to detect address format
      const isLegacy = this.bchjs.Address.isLegacyAddress(input);
      const isCashAddr = this.bchjs.Address.isCashAddress(input);
      
      if (isCashAddr) {
        return input;
      } else if (isLegacy) {
        // Convert legacy to CashAddress
        return this.bchjs.Address.toCashAddress(input);
      } else {
        throw new Error('Invalid Bitcoin Cash address format');
      }
    } catch (error) {
      throw new Error(`Failed to resolve address: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Send BCH reward to address
   */
  async sendReward(
    toAddress: string,
    amountBCH: number,
    fromWIF: string
  ): Promise<TransactionResult> {
    try {
      // Validate and convert addresses
      const toCashAddr = await this.resolveAddress(toAddress);
      
      // Create key pair from WIF
      const ecPair = this.bchjs.ECPair.fromWIF(fromWIF);
      const fromCashAddr = this.bchjs.ECPair.toCashAddress(ecPair);
      
      // Get UTXOs
      const utxos = await this.bchjs.Electrumx.utxo(fromCashAddr);
      if (!utxos.utxos || utxos.utxos.length === 0) {
        throw new Error('No UTXOs available');
      }
      
      // Build transaction
      const transactionBuilder = new this.bchjs.TransactionBuilder(
        this.network === 'testnet' ? 'testnet' : undefined
      );
      
      // Add inputs
      let totalInput = 0;
      for (const utxo of utxos.utxos) {
        transactionBuilder.addInput(utxo.tx_hash, utxo.tx_pos);
        totalInput += utxo.value;
      }
      
      // Calculate amounts (in satoshis)
      const satoshisToSend = Math.floor(amountBCH * 100000000);
      const fee = 250; // Basic fee estimate
      const change = totalInput - satoshisToSend - fee;
      
      if (change < 0) {
        throw new Error('Insufficient funds');
      }
      
      // Add outputs
      transactionBuilder.addOutput(toCashAddr, satoshisToSend);
      if (change > 546) { // Dust limit
        transactionBuilder.addOutput(fromCashAddr, change);
      }
      
      // Sign inputs
      let redeemScript;
      utxos.utxos.forEach((utxo, index) => {
        transactionBuilder.sign(
          index,
          ecPair,
          redeemScript,
          transactionBuilder.hashTypes.SIGHASH_ALL,
          utxo.value
        );
      });
      
      // Build and broadcast
      const tx = transactionBuilder.build();
      const hex = tx.toHex();
      const txid = await this.bchjs.RawTransactions.sendRawTransaction(hex);
      
      return {
        success: true,
        txid,
        rawTx: hex,
      };
    } catch (error) {
      console.error('Error sending BCH reward:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  /**
   * Get address balance
   */
  async getBalance(address: string): Promise<number> {
    try {
      const cashAddr = await this.resolveAddress(address);
      const balance = await this.bchjs.Electrumx.balance(cashAddr);
      return balance.balance.confirmed / 100000000; // Convert to BCH
    } catch (error) {
      console.error('Error getting balance:', error);
      return 0;
    }
  }
}

/**
 * Game Reward Manager for Bitcoin Cash
 */
export class BitcoinCashGameRewardManager {
  private players: Map<string, Player> = new Map();
  private bchRewarder: BitcoinCashRewarder;
  private isInitialized: boolean = false;

  constructor(
    private gameConfig: GameConfig,
    private walletConfig: WalletConfig
  ) {
    this.bchRewarder = new BitcoinCashRewarder(gameConfig.network);
  }

  /**
   * Initialize the reward manager
   */
  async initialize(): Promise<void> {
    if (!this.walletConfig.privateKeyWIF) {
      throw new Error('Private key WIF is required for initialization');
    }
    this.isInitialized = true;
    console.log('Bitcoin Cash Game Reward Manager initialized');
  }

  /**
   * Start game for a player with their address
   */
  async startGame(addressInput: string): Promise<Player> {
    if (!this.isInitialized) {
      throw new Error('Reward manager not initialized. Call initialize() first.');
    }

    try {
      const cashAddress = await this.bchRewarder.resolveAddress(addressInput);

      const player: Player = {
        publicAddress: addressInput,
        cashAddress,
        currentScore: 0,
        hasBeenRewarded: false,
      };

      this.players.set(cashAddress, player);

      console.log(`Game started for player: ${cashAddress}`);
      return player;
    } catch (error) {
      throw new Error(
        `Failed to start game: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Update player score and check for rewards
   */
  async updateScore(
    addressInput: string,
    newScore: number
  ): Promise<{ player: Player; rewardSent?: TransactionResult }> {
    if (!this.isInitialized) {
      throw new Error('Reward manager not initialized. Call initialize() first.');
    }

    try {
      const cashAddress = await this.bchRewarder.resolveAddress(addressInput);
      const player = this.players.get(cashAddress);

      if (!player) {
        throw new Error('Player not found. Please start game first.');
      }

      player.currentScore = newScore;

      // Check if player qualifies for reward
      if (newScore >= this.gameConfig.rewardThreshold && !player.hasBeenRewarded) {
        const rewardResult = await this.sendReward(player.cashAddress!);

        if (rewardResult.success) {
          player.hasBeenRewarded = true;
          console.log(
            `Reward sent to ${player.cashAddress}. Transaction: ${rewardResult.txid}`
          );
        }

        return { player, rewardSent: rewardResult };
      }

      return { player };
    } catch (error) {
      throw new Error(
        `Failed to update score: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Send reward to player
   */
  private async sendReward(toAddress: string): Promise<TransactionResult> {
    try {
      return await this.bchRewarder.sendReward(
        toAddress,
        this.gameConfig.rewardAmount,
        this.walletConfig.privateKeyWIF
      );
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  /**
   * Get player by address
   */
  async getPlayer(addressInput: string): Promise<Player | undefined> {
    const cashAddress = await this.bchRewarder.resolveAddress(addressInput);
    return this.players.get(cashAddress);
  }

  /**
   * Get all players
   */
  getAllPlayers(): Player[] {
    return Array.from(this.players.values());
  }

  /**
   * Check if service is ready
   */
  isReady(): boolean {
    return this.isInitialized;
  }
}

export default BitcoinCashRewarder;
