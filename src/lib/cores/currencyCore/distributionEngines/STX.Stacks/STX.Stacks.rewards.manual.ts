/**
 * Stacks (STX) Manual Reward System for Gaming
 * Server-managed rewards with BNS support
 */

import {
  makeSTXTokenTransfer,
  broadcastTransaction,
  AnchorMode,
  StacksNetwork,
  StacksTestnet,
  StacksMainnet,
} from '@stacks/transactions';
import { StacksTransaction } from '@stacks/transactions';

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
  txId?: string;
  error?: string;
}

export class AddressResolver {
  private network: 'mainnet' | 'testnet';

  constructor(network: 'mainnet' | 'testnet') {
    this.network = network;
  }

  async resolveAddress(input: string): Promise<string> {
    const value = input.trim();

    if (this.isValidAddress(value)) {
      return value;
    }

    if (value.includes('.btc') || value.includes('.id')) {
      return await this.resolveBNS(value);
    }

    throw new Error('Invalid Stacks address format');
  }

  private async resolveBNS(bnsName: string): Promise<string> {
    try {
      const apiUrl = this.network === 'mainnet'
        ? 'https://stacks-node-api.mainnet.stacks.co'
        : 'https://stacks-node-api.testnet.stacks.co';

      const response = await fetch(`${apiUrl}/v1/names/${bnsName}`);
      
      if (!response.ok) {
        throw new Error(`BNS resolution failed: ${response.statusText}`);
      }

      const data = await response.json();
      return data.address;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      throw new Error(`Failed to resolve BNS name "${bnsName}": ${errorMessage}`);
    }
  }

  isValidAddress(address: string): boolean {
    const mainnetRegex = /^SP[0-9A-Z]{38,41}$/;
    const testnetRegex = /^ST[0-9A-Z]{38,41}$/;
    
    return this.network === 'mainnet'
      ? mainnetRegex.test(address)
      : testnetRegex.test(address) || mainnetRegex.test(address);
  }
}

export class StacksService {
  private privateKey: string;
  private network: StacksNetwork;
  private networkType: 'mainnet' | 'testnet';

  constructor(config: WalletConfig) {
    this.privateKey = config.privateKey;
    this.networkType = config.network;
    this.network = config.network === 'mainnet'
      ? new StacksMainnet()
      : new StacksTestnet();
  }

  async sendTransaction(recipient: string, amountStx: string): Promise<string> {
    try {
      const amountMicroStx = BigInt(Math.floor(parseFloat(amountStx) * 1_000_000));

      const txOptions = {
        recipient,
        amount: amountMicroStx,
        senderKey: this.privateKey,
        network: this.network,
        anchorMode: AnchorMode.Any,
        memo: `Game reward: ${amountStx} STX`,
      };

      const transaction: StacksTransaction = await makeSTXTokenTransfer(txOptions);

      const broadcastResponse = await broadcastTransaction({
        transaction,
        network: this.network,
      });

      if ('error' in broadcastResponse) {
        throw new Error(broadcastResponse.error || 'Transaction broadcast failed');
      }

      const txId = broadcastResponse.txid;

      console.log(`✅ Sent ${amountStx} STX to ${recipient}`);
      console.log(`   Transaction: ${txId}`);

      return txId;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Stacks transaction failed: ${errorMessage}`);
    }
  }

  async getBalance(address: string): Promise<number> {
    try {
      const apiUrl = this.networkType === 'mainnet'
        ? 'https://stacks-node-api.mainnet.stacks.co'
        : 'https://stacks-node-api.testnet.stacks.co';

      const response = await fetch(`${apiUrl}/extended/v1/address/${address}/stx`);

      if (!response.ok) {
        throw new Error(`Failed to fetch balance: ${response.statusText}`);
      }

      const data = await response.json();
      const balanceMicroStx = parseInt(data.balance, 10);
      return balanceMicroStx / 1_000_000;
    } catch (error) {
      throw new Error(`Balance check failed: ${error}`);
    }
  }

  getNetworkType(): 'mainnet' | 'testnet' {
    return this.networkType;
  }
}

export class StacksRewarder {
  private addressResolver: AddressResolver;
  private stacksService: StacksService;
  private gameConfig: GameConfig;

  constructor(gameConfig: GameConfig, walletConfig: WalletConfig) {
    this.gameConfig = gameConfig;
    this.stacksService = new StacksService(walletConfig);
    this.addressResolver = new AddressResolver(walletConfig.network);
  }

  async sendReward(playerAddress: string): Promise<TransactionResult> {
    try {
      const resolvedAddress = await this.addressResolver.resolveAddress(playerAddress);

      const txId = await this.stacksService.sendTransaction(
        resolvedAddress,
        this.gameConfig.rewardAmount
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
  private rewarder: StacksRewarder;
  private gameConfig: GameConfig;

  constructor(gameConfig: GameConfig, walletConfig: WalletConfig) {
    this.gameConfig = gameConfig;
    this.rewarder = new StacksRewarder(gameConfig, walletConfig);
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

      const sessionId = `stx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      const player: Player = {
        walletAddress: resolvedAddress,
        score: 0,
        hasBeenRewarded: false,
        gameStartedAt: new Date(),
        sessionId,
      };

      this.players.set(resolvedAddress, player);
      console.log(`Stacks game started for: ${resolvedAddress}`);

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
