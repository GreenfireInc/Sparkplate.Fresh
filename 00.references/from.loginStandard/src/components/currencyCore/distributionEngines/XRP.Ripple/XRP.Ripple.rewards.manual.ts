/**
 * Ripple (XRP) Manual Reward System for Gaming
 * Server-managed rewards with xrpl.js
 */

import {
  Client,
  Wallet,
  xrpToDrops,
  dropsToXrp,
} from 'xrpl';

export interface GameConfig {
  rewardThreshold: number;
  rewardAmount: string;
  tickerSymbol: string;
  network: 'mainnet' | 'testnet' | 'devnet';
}

export interface WalletConfig {
  seed: string;
  network: 'mainnet' | 'testnet' | 'devnet';
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

    throw new Error('Invalid XRP address format');
  }

  isValidAddress(address: string): boolean {
    const rippleAddressRegex = /^r[1-9A-HJ-NP-Za-km-z]{24,34}$/;
    return rippleAddressRegex.test(address);
  }
}

export class RippleService {
  private wallet: Wallet;
  private client: Client;
  private network: 'mainnet' | 'testnet' | 'devnet';

  constructor(config: WalletConfig) {
    this.network = config.network;
    this.wallet = Wallet.fromSeed(config.seed);

    const serverUrl = this.getServerUrl(config.network);
    this.client = new Client(serverUrl);
  }

  private getServerUrl(network: 'mainnet' | 'testnet' | 'devnet'): string {
    switch (network) {
      case 'mainnet':
        return 'wss://xrplcluster.com';
      case 'testnet':
        return 'wss://s.altnet.rippletest.net:51233';
      case 'devnet':
        return 'wss://s.devnet.rippletest.net:51233';
    }
  }

  async connect(): Promise<void> {
    if (!this.client.isConnected()) {
      await this.client.connect();
      console.log(`✅ Connected to XRP ${this.network}`);
    }
  }

  async disconnect(): Promise<void> {
    if (this.client.isConnected()) {
      await this.client.disconnect();
      console.log(`✅ Disconnected from XRP ${this.network}`);
    }
  }

  async sendPayment(destination: string, amount: string, memo?: string): Promise<string> {
    try {
      await this.connect();

      const amountInDrops = xrpToDrops(amount);

      const payment: any = {
        TransactionType: 'Payment',
        Account: this.wallet.address,
        Amount: amountInDrops,
        Destination: destination,
      };

      if (memo) {
        payment.Memos = [
          {
            Memo: {
              MemoData: Buffer.from(memo, 'utf8').toString('hex').toUpperCase(),
            },
          },
        ];
      }

      const prepared = await this.client.autofill(payment);
      const signed = this.wallet.sign(prepared);
      const result = await this.client.submitAndWait(signed.tx_blob);

      if (result.result.meta && typeof result.result.meta === 'object' && 'TransactionResult' in result.result.meta) {
        const txResult = result.result.meta.TransactionResult;
        
        if (txResult !== 'tesSUCCESS') {
          throw new Error(`Transaction failed: ${txResult}`);
        }
      }

      console.log(`✅ Sent ${amount} XRP to ${destination}`);
      console.log(`   Transaction: ${result.result.hash}`);

      return result.result.hash;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`XRP transaction failed: ${errorMessage}`);
    }
  }

  async getBalance(address?: string): Promise<number> {
    try {
      await this.connect();

      const accountAddress = address || this.wallet.address;
      const response = await this.client.request({
        command: 'account_info',
        account: accountAddress,
        ledger_index: 'validated',
      });

      return parseFloat(dropsToXrp(response.result.account_data.Balance));
    } catch (error) {
      throw new Error(`Balance check failed: ${error}`);
    }
  }

  getAddress(): string {
    return this.wallet.address;
  }

  getNetworkType(): 'mainnet' | 'testnet' | 'devnet' {
    return this.network;
  }
}

export class RippleRewarder {
  private addressResolver: AddressResolver;
  private rippleService: RippleService;
  private gameConfig: GameConfig;

  constructor(gameConfig: GameConfig, walletConfig: WalletConfig) {
    this.gameConfig = gameConfig;
    this.rippleService = new RippleService(walletConfig);
    this.addressResolver = new AddressResolver();
  }

  async sendReward(playerAddress: string): Promise<TransactionResult> {
    try {
      const resolvedAddress = await this.addressResolver.resolveAddress(playerAddress);

      const amount = this.gameConfig.rewardAmount;
      const txHash = await this.rippleService.sendPayment(
        resolvedAddress,
        amount,
        'Game reward'
      );

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

  async cleanup(): Promise<void> {
    await this.rippleService.disconnect();
  }
}

export class GameRewardManager {
  private players: Map<string, Player> = new Map();
  private rewarder: RippleRewarder;
  private gameConfig: GameConfig;

  constructor(gameConfig: GameConfig, walletConfig: WalletConfig) {
    this.gameConfig = gameConfig;
    this.rewarder = new RippleRewarder(gameConfig, walletConfig);
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

      const sessionId = `xrp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      const player: Player = {
        walletAddress: resolvedAddress,
        score: 0,
        hasBeenRewarded: false,
        gameStartedAt: new Date(),
        sessionId,
      };

      this.players.set(resolvedAddress, player);
      console.log(`Ripple game started for: ${resolvedAddress}`);

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

  async cleanup(): Promise<void> {
    await this.rewarder.cleanup();
  }
}

export default GameRewardManager;
