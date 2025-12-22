/**
 * Dogecoin (DOGE) Manual Reward Distribution System
 * 
 * Server-side reward distribution for Dogecoin with:
 * - Native DOGE transfers
 * - UTXO management (Bitcoin-derived)
 * - Dogecoin address format support
 * - Manual wallet-to-wallet transfers
 * - Game integration with score-based rewards
 * - Secure private key management
 * - Much wow, very crypto 🐕
 * 
 * Security: Keep private keys server-side only. Never expose to clients.
 */

import * as bitcoin from 'bitcoinjs-lib';
import * as ecc from 'tiny-secp256k1';
import { ECPairFactory } from 'ecpair';
import * as crypto from 'crypto';

const ECPair = ECPairFactory(ecc);

// Dogecoin network parameters
export const dogecoinNetwork: bitcoin.Network = {
  messagePrefix: '\x19Dogecoin Signed Message:\n',
  bech32: 'doge', // Note: Dogecoin doesn't widely use Bech32 yet
  bip32: {
    public: 0x02facafd,
    private: 0x02fac398,
  },
  pubKeyHash: 0x1e, // 30 - Dogecoin addresses start with 'D'
  scriptHash: 0x16, // 22 - P2SH addresses start with '9' or 'A'
  wif: 0x9e, // 158 - Private key WIF starts with '6' or 'Q'
};

export interface GameConfig {
  rewardThreshold: number; // Points needed to earn reward
  rewardAmountDOGE: number; // Amount in DOGE
  network: 'mainnet' | 'testnet';
}

export interface WalletConfig {
  privateKeyWIF: string; // Private key in WIF format
  network: 'mainnet' | 'testnet';
}

export interface Player {
  address: string; // Dogecoin address (starts with D)
  currentScore: number;
  hasBeenRewarded: boolean;
}

export interface TransactionResult {
  success: boolean;
  txid?: string;
  error?: string;
  rawTx?: string;
}

export interface UTXO {
  txid: string;
  vout: number;
  value: number; // satoshis (koinus for DOGE)
  scriptPubKey: string;
}

/**
 * Dogecoin Rewarder for manual reward distribution
 */
export class DogecoinRewarder {
  private network: bitcoin.Network;
  
  constructor(network: 'mainnet' | 'testnet' = 'mainnet') {
    // Dogecoin testnet has different parameters
    if (network === 'testnet') {
      this.network = {
        ...dogecoinNetwork,
        pubKeyHash: 0x71, // 113 - testnet addresses start with 'n'
        scriptHash: 0xc4, // 196
        wif: 0xf1, // 241
      };
    } else {
      this.network = dogecoinNetwork;
    }
  }

  /**
   * Validate Dogecoin address
   */
  validateAddress(address: string): boolean {
    try {
      bitcoin.address.toOutputScript(address, this.network);
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Send DOGE reward to address
   * Note: Requires UTXO provider (blockchain API) to fetch UTXOs
   */
  async sendDOGEReward(
    toAddress: string,
    amountDOGE: number,
    fromWIF: string,
    utxos: UTXO[],
    feeRate: number = 1 // DOGE has very low fees, typically 1 DOGE
  ): Promise<TransactionResult> {
    try {
      // Validate destination address
      if (!this.validateAddress(toAddress)) {
        throw new Error('Invalid Dogecoin address');
      }

      // Create key pair from WIF
      const keyPair = ECPair.fromWIF(fromWIF, this.network);
      
      // Calculate amounts in koinus (1 DOGE = 100,000,000 koinus)
      const koinusToSend = Math.floor(amountDOGE * 100000000);
      
      // Build transaction
      const psbt = new bitcoin.Psbt({ network: this.network });
      
      // Add inputs
      let totalInput = 0;
      for (const utxo of utxos) {
        psbt.addInput({
          hash: utxo.txid,
          index: utxo.vout,
          nonWitnessUtxo: Buffer.from(utxo.scriptPubKey, 'hex'),
        });
        totalInput += utxo.value;
      }
      
      // Calculate fee (Dogecoin typically uses fixed fee of 1 DOGE)
      const fee = Math.floor(feeRate * 100000000);
      
      // Calculate change
      const change = totalInput - koinusToSend - fee;
      
      if (change < 0) {
        throw new Error('Insufficient funds');
      }
      
      // Add outputs
      psbt.addOutput({
        address: toAddress,
        value: koinusToSend,
      });
      
      // Add change output if significant (avoid dust - 0.01 DOGE minimum)
      if (change > 1000000) {
        const changeAddress = bitcoin.payments.p2pkh({
          pubkey: keyPair.publicKey,
          network: this.network,
        }).address!;
        
        psbt.addOutput({
          address: changeAddress,
          value: change,
        });
      }
      
      // Sign all inputs
      for (let i = 0; i < utxos.length; i++) {
        psbt.signInput(i, keyPair);
      }
      
      // Finalize and extract transaction
      psbt.finalizeAllInputs();
      const tx = psbt.extractTransaction();
      const rawTx = tx.toHex();
      const txid = tx.getId();
      
      console.log('🐕 Much transaction! Very send! Wow!');
      console.log('Transaction built. Broadcast with blockchain API.');
      
      return {
        success: true,
        txid,
        rawTx,
      };
    } catch (error) {
      console.error('Error sending DOGE reward:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  /**
   * Create a new Dogecoin wallet
   */
  createWallet(): { address: string; privateKey: string; wif: string } {
    const keyPair = ECPair.makeRandom({ network: this.network });
    const { address } = bitcoin.payments.p2pkh({
      pubkey: keyPair.publicKey,
      network: this.network,
    });
    
    return {
      address: address!,
      privateKey: keyPair.privateKey!.toString('hex'),
      wif: keyPair.toWIF(),
    };
  }

  /**
   * Get address from WIF
   */
  getAddressFromWIF(wif: string): string {
    const keyPair = ECPair.fromWIF(wif, this.network);
    const { address } = bitcoin.payments.p2pkh({
      pubkey: keyPair.publicKey,
      network: this.network,
    });
    return address!;
  }
}

/**
 * Game Reward Manager for Dogecoin
 * Much reward! Very game! Wow!
 */
export class DogecoinGameRewardManager {
  private players: Map<string, Player> = new Map();
  private dogeRewarder: DogecoinRewarder;
  private isInitialized: boolean = false;
  private utxoProvider?: (address: string) => Promise<UTXO[]>;
  private broadcastProvider?: (rawTx: string) => Promise<string>;

  constructor(
    private gameConfig: GameConfig,
    private walletConfig: WalletConfig,
    utxoProvider?: (address: string) => Promise<UTXO[]>,
    broadcastProvider?: (rawTx: string) => Promise<string>
  ) {
    this.dogeRewarder = new DogecoinRewarder(gameConfig.network);
    this.utxoProvider = utxoProvider;
    this.broadcastProvider = broadcastProvider;
  }

  /**
   * Initialize the reward manager
   */
  async initialize(): Promise<void> {
    if (!this.walletConfig.privateKeyWIF) {
      throw new Error('Private key WIF is required for initialization');
    }
    
    if (!this.utxoProvider || !this.broadcastProvider) {
      console.warn('🐕 Much warning! UTXO and broadcast providers not configured.');
    }
    
    this.isInitialized = true;
    console.log('🐕 Dogecoin Game Reward Manager initialized! Much wow!');
  }

  /**
   * Start game for a player with their address
   */
  async startGame(address: string): Promise<Player> {
    if (!this.isInitialized) {
      throw new Error('Reward manager not initialized. Call initialize() first.');
    }

    if (!this.dogeRewarder.validateAddress(address)) {
      throw new Error('Invalid Dogecoin address. Much sad! 😢');
    }

    const player: Player = {
      address,
      currentScore: 0,
      hasBeenRewarded: false,
    };

    this.players.set(address, player);

    console.log(`🐕 Game started for player: ${address}. Much play!`);
    return player;
  }

  /**
   * Update player score and check for rewards
   */
  async updateScore(
    address: string,
    newScore: number
  ): Promise<{ player: Player; rewardSent?: TransactionResult }> {
    if (!this.isInitialized) {
      throw new Error('Reward manager not initialized. Call initialize() first.');
    }

    const player = this.players.get(address);

    if (!player) {
      throw new Error('Player not found. Please start game first.');
    }

    player.currentScore = newScore;

    // Check if player qualifies for reward
    if (newScore >= this.gameConfig.rewardThreshold && !player.hasBeenRewarded) {
      const rewardResult = await this.sendReward(player.address);

      if (rewardResult.success) {
        player.hasBeenRewarded = true;
        console.log(`🐕 Much reward sent to ${player.address}! Transaction: ${rewardResult.txid}. Wow!`);
      }

      return { player, rewardSent: rewardResult };
    }

    return { player };
  }

  /**
   * Send reward to player
   */
  private async sendReward(toAddress: string): Promise<TransactionResult> {
    try {
      if (!this.utxoProvider || !this.broadcastProvider) {
        return {
          success: false,
          error: 'UTXO and broadcast providers not configured',
        };
      }

      // Get sender address
      const senderAddress = this.dogeRewarder.getAddressFromWIF(this.walletConfig.privateKeyWIF);
      
      // Fetch UTXOs
      const utxos = await this.utxoProvider(senderAddress);
      
      if (utxos.length === 0) {
        return {
          success: false,
          error: 'No UTXOs available. Much empty! 😢',
        };
      }

      // Build transaction
      const result = await this.dogeRewarder.sendDOGEReward(
        toAddress,
        this.gameConfig.rewardAmountDOGE,
        this.walletConfig.privateKeyWIF,
        utxos
      );

      // Broadcast if successful
      if (result.success && result.rawTx) {
        const txid = await this.broadcastProvider(result.rawTx);
        return {
          success: true,
          txid,
          rawTx: result.rawTx,
        };
      }

      return result;
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
  getPlayer(address: string): Player | undefined {
    return this.players.get(address);
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

export default DogecoinRewarder;
