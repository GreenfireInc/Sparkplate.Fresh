/**
 * Polkadot (DOT) Manual Reward Distribution System
 * 
 * Server-side reward distribution for Polkadot with:
 * - Native DOT transfers
 * - Substrate-based transaction building
 * - SS58 address format support
 * - Manual wallet-to-wallet transfers
 * - Game integration with score-based rewards
 * - Secure private key management
 * 
 * Security: Keep private keys server-side only. Never expose to clients.
 */

import { ApiPromise, WsProvider, Keyring } from '@polkadot/api';
import { KeyringPair } from '@polkadot/keyring/types';
import { cryptoWaitReady } from '@polkadot/util-crypto';
import * as crypto from 'crypto';

export interface GameConfig {
  rewardThreshold: number; // Points needed to earn reward
  rewardAmountDOT: number; // Amount in DOT
  network: 'polkadot' | 'kusama' | 'westend';
}

export interface WalletConfig {
  mnemonic: string; // 12/24-word mnemonic phrase
  network: 'polkadot' | 'kusama' | 'westend';
}

export interface Player {
  address: string; // SS58 address
  currentScore: number;
  hasBeenRewarded: boolean;
}

export interface TransactionResult {
  success: boolean;
  txHash?: string;
  error?: string;
  blockHash?: string;
}

/**
 * Polkadot Rewarder for manual reward distribution
 */
export class PolkadotRewarder {
  private api: ApiPromise | null = null;
  private network: 'polkadot' | 'kusama' | 'westend';
  private wsEndpoint: string;
  
  constructor(network: 'polkadot' | 'kusama' | 'westend' = 'polkadot') {
    this.network = network;
    
    // Set WebSocket endpoint based on network
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

  /**
   * Initialize API connection
   */
  async initialize(): Promise<void> {
    await cryptoWaitReady();
    const provider = new WsProvider(this.wsEndpoint);
    this.api = await ApiPromise.create({ provider });
    console.log(`Connected to ${this.network} network`);
  }

  /**
   * Disconnect API
   */
  async disconnect(): Promise<void> {
    if (this.api) {
      await this.api.disconnect();
    }
  }

  /**
   * Validate Polkadot address
   */
  validateAddress(address: string): boolean {
    try {
      const keyring = new Keyring({ type: 'sr25519' });
      keyring.encodeAddress(keyring.decodeAddress(address));
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Send DOT reward to address
   */
  async sendDOTReward(
    toAddress: string,
    amountDOT: number,
    senderMnemonic: string
  ): Promise<TransactionResult> {
    try {
      if (!this.api) {
        throw new Error('API not initialized. Call initialize() first.');
      }

      // Validate destination address
      if (!this.validateAddress(toAddress)) {
        throw new Error('Invalid Polkadot address');
      }

      // Create sender account from mnemonic
      await cryptoWaitReady();
      const keyring = new Keyring({ type: 'sr25519' });
      const sender = keyring.addFromMnemonic(senderMnemonic);
      
      // Convert amount to Planck (1 DOT = 10^10 Planck)
      const amountPlanck = BigInt(Math.floor(amountDOT * 10_000_000_000));
      
      // Create transfer transaction
      const transfer = this.api.tx.balances.transfer(toAddress, amountPlanck);
      
      // Sign and send transaction
      return new Promise((resolve) => {
        transfer.signAndSend(sender, ({ status, txHash, dispatchError }) => {
          if (status.isInBlock) {
            console.log(`Transaction included in block: ${status.asInBlock.toString()}`);
          }
          
          if (status.isFinalized) {
            if (dispatchError) {
              let errorMessage = 'Transaction failed';
              
              if (dispatchError.isModule) {
                const decoded = this.api!.registry.findMetaError(dispatchError.asModule);
                errorMessage = `${decoded.section}.${decoded.name}: ${decoded.docs}`;
              }
              
              resolve({
                success: false,
                error: errorMessage,
                txHash: txHash.toString(),
              });
            } else {
              resolve({
                success: true,
                txHash: txHash.toString(),
                blockHash: status.asFinalized.toString(),
              });
            }
          }
        }).catch((error) => {
          resolve({
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error occurred',
          });
        });
      });
    } catch (error) {
      console.error('Error sending DOT reward:', error);
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
      if (!this.api) {
        throw new Error('API not initialized');
      }
      
      const { data: balance } = await this.api.query.system.account(address);
      return Number(balance.free) / 10_000_000_000; // Convert to DOT
    } catch (error) {
      console.error('Error getting balance:', error);
      return 0;
    }
  }

  /**
   * Create a new Polkadot wallet
   */
  async createWallet(): Promise<{ address: string; mnemonic: string }> {
    await cryptoWaitReady();
    const keyring = new Keyring({ type: 'sr25519' });
    const { phrase, address } = await keyring.createFromUri(undefined, { name: 'Generated Account' }, 'sr25519');
    
    return {
      address,
      mnemonic: phrase,
    };
  }

  /**
   * Get address from mnemonic
   */
  async getAddressFromMnemonic(mnemonic: string): Promise<string> {
    await cryptoWaitReady();
    const keyring = new Keyring({ type: 'sr25519' });
    const pair = keyring.addFromMnemonic(mnemonic);
    return pair.address;
  }
}

/**
 * Game Reward Manager for Polkadot
 */
export class PolkadotGameRewardManager {
  private players: Map<string, Player> = new Map();
  private dotRewarder: PolkadotRewarder;
  private isInitialized: boolean = false;

  constructor(
    private gameConfig: GameConfig,
    private walletConfig: WalletConfig
  ) {
    this.dotRewarder = new PolkadotRewarder(gameConfig.network);
  }

  /**
   * Initialize the reward manager
   */
  async initialize(): Promise<void> {
    if (!this.walletConfig.mnemonic) {
      throw new Error('Mnemonic is required for initialization');
    }
    
    await this.dotRewarder.initialize();
    this.isInitialized = true;
    console.log('Polkadot Game Reward Manager initialized');
  }

  /**
   * Cleanup on shutdown
   */
  async shutdown(): Promise<void> {
    await this.dotRewarder.disconnect();
  }

  /**
   * Start game for a player with their address
   */
  async startGame(address: string): Promise<Player> {
    if (!this.isInitialized) {
      throw new Error('Reward manager not initialized. Call initialize() first.');
    }

    if (!this.dotRewarder.validateAddress(address)) {
      throw new Error('Invalid Polkadot address');
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
        console.log(`Reward sent to ${player.address}. Transaction: ${rewardResult.txHash}`);
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
      return await this.dotRewarder.sendDOTReward(
        toAddress,
        this.gameConfig.rewardAmountDOT,
        this.walletConfig.mnemonic
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

export default PolkadotRewarder;
