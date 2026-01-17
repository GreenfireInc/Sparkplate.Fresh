/**
 * Tezos (XTZ) Manual Reward System for Gaming
 * Server-managed rewards with Taquito
 */

import { TezosToolkit } from '@taquito/taquito';
import { InMemorySigner } from '@taquito/signer';

export interface GameConfig {
  rewardThreshold: number;
  rewardAmount: string;
  tickerSymbol: string;
  network: 'mainnet' | 'testnet';
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
  txHash?: string;
  error?: string;
}

export class AddressResolver {
  async resolveAddress(input: string): Promise<string> {
    const value = input.trim();

    if (this.isValidAddress(value)) {
      return value;
    }

    throw new Error('Invalid Tezos address format');
  }

  isValidAddress(address: string): boolean {
    const tezosAddressRegex = /^(tz1|tz2|tz3|KT1)[1-9A-HJ-NP-Za-km-z]{33}$/;
    return tezosAddressRegex.test(address);
  }
}

export class TezosService {
  private tezos: TezosToolkit;
  private privateKey: string;
  private network: 'mainnet' | 'testnet';

  constructor(config: WalletConfig) {
    this.privateKey = config.privateKey;
    this.network = config.network;

    const rpcUrl = this.getRpcUrl(config.network);
    this.tezos = new TezosToolkit(rpcUrl);
    
    this.tezos.setProvider({
      signer: new InMemorySigner(config.privateKey),
    });
  }

  private getRpcUrl(network: 'mainnet' | 'testnet'): string {
    switch (network) {
      case 'mainnet':
        return 'https://mainnet.api.tez.ie';
      case 'testnet':
        return 'https://ghostnet.ecadinfra.com';
    }
  }

  async sendPayment(destination: string, amount: number): Promise<string> {
    try {
      const operation = await this.tezos.contract.transfer({
        to: destination,
        amount: amount,
      });

      await operation.confirmation();

      console.log(`✅ Sent ${amount} XTZ to ${destination}`);
      console.log(`   Transaction: ${operation.hash}`);

      return operation.hash;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Tezos transaction failed: ${errorMessage}`);
    }
  }

  async getBalance(address?: string): Promise<number> {
    try {
      const accountAddress = address || await this.tezos.signer.publicKeyHash();
      const balance = await this.tezos.tz.getBalance(accountAddress);
      
      return balance.toNumber() / 1000000;
    } catch (error) {
      throw new Error(`Balance check failed: ${error}`);
    }
  }

  async getAddress(): Promise<string> {
    return await this.tezos.signer.publicKeyHash();
  }

  getNetworkType(): 'mainnet' | 'testnet' {
    return this.network;
  }
}

export class TezosRewarder {
  private addressResolver: AddressResolver;
  private tezosService: TezosService;
  private gameConfig: GameConfig;

  constructor(gameConfig: GameConfig, walletConfig: WalletConfig) {
    this.gameConfig = gameConfig;
    this.tezosService = new TezosService(walletConfig);
    this.addressResolver = new AddressResolver();
  }

  async sendReward(playerAddress: string): Promise<TransactionResult> {
    try {
      const resolvedAddress = await this.addressResolver.resolveAddress(playerAddress);

      const amount = parseFloat(this.gameConfig.rewardAmount);
      const txHash = await this.tezosService.sendPayment(resolvedAddress, amount);

      return {
        success: true,
        txHash,
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
  private rewarder: TezosRewarder;
  private gameConfig: GameConfig;

  constructor(gameConfig: GameConfig, walletConfig: WalletConfig) {
    this.gameConfig = gameConfig;
    this.rewarder = new TezosRewarder(gameConfig, walletConfig);
  }

  async startGame(walletInput: string): Promise<{ success: boolean; address?: string; sessionId?: string; error?: string }> {
    try {
      const addressResolver = new AddressResolver();
      const resolvedAddress = await addressResolver.resolveAddress(walletInput);

      if (this.players.has(resolvedAddress)) {
        return {
          success: false,
          error: 'Game already started for this address',
        };
      }

      const sessionId = `xtz_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      const player: Player = {
        walletAddress: resolvedAddress,
        score: 0,
        hasBeenRewarded: false,
        gameStartedAt: new Date(),
        sessionId,
      };

      this.players.set(resolvedAddress, player);
      console.log(`Tezos game started for: ${resolvedAddress}`);

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
  ): Promise<{ success: boolean; rewardSent?: boolean; txHash?: string; error?: string }> {
    try {
      const addressResolver = new AddressResolver();
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
            txHash: result.txHash,
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
