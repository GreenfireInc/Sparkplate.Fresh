/**
 * Waves (WAVES) Manual Reward System for Gaming
 * Server-managed rewards with Waves SDK
 */

import { transfer, broadcast, ITransferParams } from '@waves/waves-transactions';
import axios from 'axios';

export interface GameConfig {
  rewardThreshold: number;
  rewardAmount: string;
  tickerSymbol: string;
  network: 'mainnet' | 'testnet';
  assetId?: string;
}

export interface WalletConfig {
  privateKey: string;
  network: 'mainnet' | 'testnet';
}

export interface Player {
  walletAddress: string;
  score: number;
  hasBeenRewarded: boolean;
  gameStartedAt: Date;
  sessionId: string;
}

export interface TransactionResult {
  success: boolean;
  txId?: string;
  error?: string;
}

export class AddressResolver {
  private nodeUrl: string;

  constructor(network: 'mainnet' | 'testnet') {
    this.nodeUrl = network === 'mainnet'
      ? 'https://nodes.wavesnodes.com'
      : 'https://nodes-testnet.wavesnodes.com';
  }

  async resolveAddress(input: string): Promise<string> {
    const value = input.trim();

    if (this.isValidAddress(value)) {
      return value;
    }

    if (value.startsWith('alias:')) {
      return await this.resolveAlias(value);
    }

    throw new Error('Invalid Waves address format');
  }

  private async resolveAlias(alias: string): Promise<string> {
    try {
      const aliasWithoutPrefix = alias.replace('alias:', '').split(':')[1] || alias.replace('alias:', '');
      const response = await axios.get(`${this.nodeUrl}/alias/by-alias/${aliasWithoutPrefix}`);
      
      return response.data.address;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      throw new Error(`Failed to resolve alias "${alias}": ${errorMessage}`);
    }
  }

  isValidAddress(address: string): boolean {
    const mainnetRegex = /^3[PQ][0-9A-Za-z]{33}$/;
    const testnetRegex = /^3[MN][0-9A-Za-z]{33}$/;
    
    return mainnetRegex.test(address) || testnetRegex.test(address);
  }
}

export class WavesService {
  private privateKey: string;
  private nodeUrl: string;
  private chainId: 'W' | 'T';
  private network: 'mainnet' | 'testnet';

  constructor(config: WalletConfig) {
    this.privateKey = config.privateKey;
    this.network = config.network;
    this.chainId = config.network === 'mainnet' ? 'W' : 'T';
    this.nodeUrl = config.network === 'mainnet'
      ? 'https://nodes.wavesnodes.com'
      : 'https://nodes-testnet.wavesnodes.com';
  }

  async sendWaves(recipient: string, amount: number, assetId?: string): Promise<string> {
    try {
      const amountInSmallestUnit = Math.floor(amount * 1e8);

      const params: ITransferParams = {
        recipient,
        amount: amountInSmallestUnit,
        assetId: assetId || null,
        fee: 100000,
        chainId: this.chainId,
      };

      const signedTx = transfer(params, this.privateKey);
      const result = await broadcast(signedTx, this.nodeUrl);

      console.log(`✅ Sent ${amount} ${assetId ? 'tokens' : 'WAVES'} to ${recipient}`);
      console.log(`   Transaction: ${result.id}`);

      return result.id;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Waves transaction failed: ${errorMessage}`);
    }
  }

  async getBalance(address: string, assetId?: string): Promise<number> {
    try {
      const endpoint = assetId
        ? `${this.nodeUrl}/assets/balance/${address}/${assetId}`
        : `${this.nodeUrl}/addresses/balance/${address}`;

      const response = await axios.get(endpoint);

      const balance = assetId
        ? response.data.balance
        : response.data.balance;

      return balance / 1e8;
    } catch (error) {
      throw new Error(`Balance check failed: ${error}`);
    }
  }

  getNetworkType(): 'mainnet' | 'testnet' {
    return this.network;
  }
}

export class WavesRewarder {
  private addressResolver: AddressResolver;
  private wavesService: WavesService;
  private gameConfig: GameConfig;

  constructor(gameConfig: GameConfig, walletConfig: WalletConfig) {
    this.gameConfig = gameConfig;
    this.wavesService = new WavesService(walletConfig);
    this.addressResolver = new AddressResolver(walletConfig.network);
  }

  async sendReward(playerAddress: string): Promise<TransactionResult> {
    try {
      const resolvedAddress = await this.addressResolver.resolveAddress(playerAddress);

      const amount = parseFloat(this.gameConfig.rewardAmount);
      const balance = await this.wavesService.getBalance(
        resolvedAddress,
        this.gameConfig.assetId
      );

      const txId = await this.wavesService.sendWaves(
        resolvedAddress,
        amount,
        this.gameConfig.assetId
      );

      return {
        success: true,
        txId,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
}

export class GameRewardManager {
  private players: Map<string, Player> = new Map();
  private rewarder: WavesRewarder;
  private gameConfig: GameConfig;

  constructor(gameConfig: GameConfig, walletConfig: WalletConfig) {
    this.gameConfig = gameConfig;
    this.rewarder = new WavesRewarder(gameConfig, walletConfig);
  }

  async startGame(walletInput: string): Promise<{ success: boolean; address?: string; sessionId?: string; error?: string }> {
    try {
      const addressResolver = new AddressResolver(this.gameConfig.network);
      const resolvedAddress = await addressResolver.resolveAddress(walletInput);

      if (this.players.has(resolvedAddress)) {
        return {
          success: false,
          error: 'Game already started for this address',
        };
      }

      const sessionId = `waves_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      const player: Player = {
        walletAddress: resolvedAddress,
        score: 0,
        hasBeenRewarded: false,
        gameStartedAt: new Date(),
        sessionId,
      };

      this.players.set(resolvedAddress, player);
      console.log(`Waves game started for: ${resolvedAddress}`);

      return {
        success: true,
        address: resolvedAddress,
        sessionId,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  async updateScore(
    walletInput: string,
    newScore: number
  ): Promise<{ success: boolean; rewardSent?: boolean; txId?: string; error?: string }> {
    try {
      const addressResolver = new AddressResolver(this.gameConfig.network);
      const resolvedAddress = await addressResolver.resolveAddress(walletInput);
      const player = this.players.get(resolvedAddress);

      if (!player) {
        return {
          success: false,
          error: 'Player not found. Start game first.',
        };
      }

      player.score = newScore;
      console.log(`Score updated for ${resolvedAddress}: ${newScore}`);

      if (newScore >= this.gameConfig.rewardThreshold && !player.hasBeenRewarded) {
        const result = await this.rewarder.sendReward(player.walletAddress);

        if (result.success) {
          player.hasBeenRewarded = true;
          return {
            success: true,
            rewardSent: true,
            txId: result.txId,
          };
        } else {
          return {
            success: false,
            error: result.error,
          };
        }
      }

      return {
        success: true,
        rewardSent: false,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  getPlayer(walletAddress: string): Player | undefined {
    return this.players.get(walletAddress);
  }

  getAllPlayers(): Player[] {
    return Array.from(this.players.values());
  }
}

export default GameRewardManager;
