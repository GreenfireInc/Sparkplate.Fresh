/**
 * Bitcoin (BTC) Manual Reward Distribution System
 * 
 * Server-side reward distribution for Bitcoin with:
 * - Native BTC transfers
 * - UTXO management
 * - Multiple address format support (P2PKH, P2SH, P2WPKH, Bech32)
 * - Manual wallet-to-wallet transfers
 * - Game integration with score-based rewards
 * - Secure private key management
 * 
 * Security: Keep private keys server-side only. Never expose to clients.
 */

import * as bitcoin from 'bitcoinjs-lib';
import * as ecc from 'tiny-secp256k1';
import { ECPairFactory } from 'ecpair';
import * as crypto from 'crypto';

// Initialize ECPair with tiny-secp256k1
const ECPair = ECPairFactory(ecc);

export interface GameConfig {
  rewardThreshold: number; // Points needed to earn reward
  rewardAmountBTC: number; // Amount in BTC
  network: 'mainnet' | 'testnet';
}

export interface WalletConfig {
  privateKeyWIF: string; // Private key in WIF format
  network: 'mainnet' | 'testnet';
}

export interface Player {
  address: string; // Bitcoin address (any format)
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
  value: number; // satoshis
  scriptPubKey: string;
}

/**
 * Bitcoin Rewarder for manual reward distribution
 */
export class BitcoinRewarder {
  private network: bitcoin.Network;
  
  constructor(network: 'mainnet' | 'testnet' = 'mainnet') {
    this.network = network === 'mainnet' ? bitcoin.networks.bitcoin : bitcoin.networks.testnet;
  }

  /**
   * Validate Bitcoin address
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
   * Send BTC reward to address
   * Note: This requires a UTXO provider (blockchain API) to fetch UTXOs
   */
  async sendBTCReward(
    toAddress: string,
    amountBTC: number,
    fromWIF: string,
    utxos: UTXO[],
    feeRate: number = 10 // satoshis per byte
  ): Promise<TransactionResult> {
    try {
      // Validate destination address
      if (!this.validateAddress(toAddress)) {
        throw new Error('Invalid Bitcoin address');
      }

      // Create key pair from WIF
      const keyPair = ECPair.fromWIF(fromWIF, this.network);
      
      // Calculate amounts in satoshis
      const satoshisToSend = Math.floor(amountBTC * 100000000);
      
      // Build transaction
      const psbt = new bitcoin.Psbt({ network: this.network });
      
      // Add inputs
      let totalInput = 0;
      for (const utxo of utxos) {
        psbt.addInput({
          hash: utxo.txid,
          index: utxo.vout,
          witnessUtxo: {
            script: Buffer.from(utxo.scriptPubKey, 'hex'),
            value: utxo.value,
          },
        });
        totalInput += utxo.value;
      }
      
      // Estimate fee (rough estimate)
      const estimatedSize = utxos.length * 148 + 2 * 34 + 10;
      const fee = estimatedSize * feeRate;
      
      // Calculate change
      const change = totalInput - satoshisToSend - fee;
      
      if (change < 0) {
        throw new Error('Insufficient funds');
      }
      
      // Add outputs
      psbt.addOutput({
        address: toAddress,
        value: satoshisToSend,
      });
      
      // Add change output if significant (avoid dust)
      if (change > 546) {
        const changeAddress = bitcoin.payments.p2wpkh({
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
      
      // Note: Broadcasting requires a blockchain API
      console.log('Transaction built. Broadcast with blockchain API.');
      
      return {
        success: true,
        txid,
        rawTx,
      };
    } catch (error) {
      console.error('Error sending BTC reward:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  /**
   * Create a new Bitcoin wallet
   */
  createWallet(): { address: string; privateKey: string; wif: string } {
    const keyPair = ECPair.makeRandom({ network: this.network });
    const { address } = bitcoin.payments.p2wpkh({
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
    const { address } = bitcoin.payments.p2wpkh({
      pubkey: keyPair.publicKey,
      network: this.network,
    });
    return address!;
  }
}

/**
 * Game Reward Manager for Bitcoin
 * Note: Requires integration with blockchain API for UTXO fetching and broadcasting
 */
export class BitcoinGameRewardManager {
  private players: Map<string, Player> = new Map();
  private btcRewarder: BitcoinRewarder;
  private isInitialized: boolean = false;
  private utxoProvider?: (address: string) => Promise<UTXO[]>;
  private broadcastProvider?: (rawTx: string) => Promise<string>;

  constructor(
    private gameConfig: GameConfig,
    private walletConfig: WalletConfig,
    utxoProvider?: (address: string) => Promise<UTXO[]>,
    broadcastProvider?: (rawTx: string) => Promise<string>
  ) {
    this.btcRewarder = new BitcoinRewarder(gameConfig.network);
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
      console.warn('UTXO and broadcast providers not configured. Transactions will not be sent.');
    }
    
    this.isInitialized = true;
    console.log('Bitcoin Game Reward Manager initialized');
  }

  /**
   * Start game for a player with their address
   */
  async startGame(address: string): Promise<Player> {
    if (!this.isInitialized) {
      throw new Error('Reward manager not initialized. Call initialize() first.');
    }

    if (!this.btcRewarder.validateAddress(address)) {
      throw new Error('Invalid Bitcoin address');
    }

    const player: Player = {
      address,
      currentScore: 0,
      hasBeenRewarded: false,
    };

    this.players.set(address, player);

    console.log(`Game started for player: ${address}`);
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
        console.log(`Reward sent to ${player.address}. Transaction: ${rewardResult.txid}`);
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
      const senderAddress = this.btcRewarder.getAddressFromWIF(this.walletConfig.privateKeyWIF);
      
      // Fetch UTXOs
      const utxos = await this.utxoProvider(senderAddress);
      
      if (utxos.length === 0) {
        return {
          success: false,
          error: 'No UTXOs available',
        };
      }

      // Build transaction
      const result = await this.btcRewarder.sendBTCReward(
        toAddress,
        this.gameConfig.rewardAmountBTC,
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

export default BitcoinRewarder;
