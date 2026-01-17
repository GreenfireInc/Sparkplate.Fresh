/**
 * Tron (TRX) Manual Reward System for Gaming
 * Server-managed rewards with TRC20 token support
 */

import TronWeb from 'tronweb';

export interface GameConfig {
  rewardThreshold: number;
  rewardAmount: string;
  tickerSymbol: string;
  network: 'mainnet' | 'shasta' | 'nile';
  rewardType: 'TRX' | 'TRC20';
  tokenContract?: string;
}

export interface WalletConfig {
  privateKey: string;
  network: 'mainnet' | 'shasta' | 'nile';
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
  private tronWeb: TronWeb;

  constructor(tronWeb: TronWeb) {
    this.tronWeb = tronWeb;
  }

  async resolveAddress(input: string): Promise<string> {
    const value = input.trim();

    if (this.tronWeb.isAddress(value)) {
      return value;
    }

    if (value.startsWith('@')) {
      throw new Error('Human-readable address resolution not implemented');
    }

    throw new Error('Invalid Tron address format');
  }

  isValidAddress(address: string): boolean {
    return this.tronWeb.isAddress(address);
  }
}

export class TronService {
  private tronWeb: TronWeb;
  private privateKey: string;
  private network: 'mainnet' | 'shasta' | 'nile';

  constructor(config: WalletConfig) {
    this.privateKey = config.privateKey;
    this.network = config.network;

    const fullHost = this.getFullHost(config.network);

    this.tronWeb = new TronWeb({
      fullHost,
      privateKey: config.privateKey,
    });
  }

  private getFullHost(network: 'mainnet' | 'shasta' | 'nile'): string {
    switch (network) {
      case 'mainnet':
        return 'https://api.trongrid.io';
      case 'shasta':
        return 'https://api.shasta.trongrid.io';
      case 'nile':
        return 'https://nile.trongrid.io';
    }
  }

  async sendTrx(recipient: string, amountTrx: number): Promise<string> {
    try {
      const amountSun = this.tronWeb.toSun(amountTrx);
      
      const tx = await this.tronWeb.transactionBuilder.sendTrx(
        recipient,
        amountSun
      );

      const signedTx = await this.tronWeb.trx.sign(tx, this.privateKey);
      const result = await this.tronWeb.trx.sendRawTransaction(signedTx);

      if (!result.result) {
        throw new Error(result.message || 'Transaction failed');
      }

      console.log(`✅ Sent ${amountTrx} TRX to ${recipient}`);
      console.log(`   Transaction: ${result.txid}`);

      return result.txid;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`TRX transaction failed: ${errorMessage}`);
    }
  }

  async sendTrc20(
    tokenContract: string,
    recipient: string,
    amount: number
  ): Promise<string> {
    try {
      const contract = await this.tronWeb.contract().at(tokenContract);
      const decimals = await contract.decimals().call();
      const amountAdjusted = amount * Math.pow(10, Number(decimals));

      const tx = await contract.transfer(recipient, amountAdjusted).send({
        feeLimit: 100_000_000,
      });

      console.log(`✅ Sent ${amount} tokens to ${recipient}`);
      console.log(`   Transaction: ${tx}`);

      return tx;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`TRC20 transaction failed: ${errorMessage}`);
    }
  }

  async getBalance(address?: string): Promise<number> {
    try {
      const accountAddress = address || this.tronWeb.defaultAddress.base58;
      const balance = await this.tronWeb.trx.getBalance(accountAddress);
      return this.tronWeb.fromSun(balance);
    } catch (error) {
      throw new Error(`Balance check failed: ${error}`);
    }
  }

  getTronWeb(): TronWeb {
    return this.tronWeb;
  }

  getRewardAddress(): string {
    return this.tronWeb.address.fromPrivateKey(this.privateKey);
  }
}

export class TronRewarder {
  private addressResolver: AddressResolver;
  private tronService: TronService;
  private gameConfig: GameConfig;

  constructor(gameConfig: GameConfig, walletConfig: WalletConfig) {
    this.gameConfig = gameConfig;
    this.tronService = new TronService(walletConfig);
    this.addressResolver = new AddressResolver(this.tronService.getTronWeb());
  }

  async sendReward(playerAddress: string): Promise<TransactionResult> {
    try {
      const resolvedAddress = await this.addressResolver.resolveAddress(playerAddress);

      let txId: string;

      if (this.gameConfig.rewardType === 'TRX') {
        const balance = await this.tronService.getBalance();
        const amount = parseFloat(this.gameConfig.rewardAmount);

        if (balance < amount) {
          throw new Error(
            `Insufficient TRX balance. Required: ${amount}, Available: ${balance.toFixed(6)}`
          );
        }

        txId = await this.tronService.sendTrx(resolvedAddress, amount);
      } else {
        if (!this.gameConfig.tokenContract) {
          throw new Error('Token contract address required for TRC20 transfers');
        }

        const amount = parseFloat(this.gameConfig.rewardAmount);
        txId = await this.tronService.sendTrc20(
          this.gameConfig.tokenContract,
          resolvedAddress,
          amount
        );
      }

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
  private rewarder: TronRewarder;
  private gameConfig: GameConfig;

  constructor(gameConfig: GameConfig, walletConfig: WalletConfig) {
    this.gameConfig = gameConfig;
    this.rewarder = new TronRewarder(gameConfig, walletConfig);
  }

  async startGame(walletInput: string): Promise<{ success: boolean; address?: string; sessionId?: string; error?: string }> {
    try {
      const tronService = new TronService({
        privateKey: '0'.repeat(64),
        network: this.gameConfig.network,
      });
      const addressResolver = new AddressResolver(tronService.getTronWeb());
      const resolvedAddress = await addressResolver.resolveAddress(walletInput);

      if (this.players.has(resolvedAddress)) {
        return {
          success: false,
          error: 'Game already started for this address',
        };
      }

      const sessionId = `trx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      const player: Player = {
        walletAddress: resolvedAddress,
        score: 0,
        hasBeenRewarded: false,
        gameStartedAt: new Date(),
        sessionId,
      };

      this.players.set(resolvedAddress, player);
      console.log(`Tron game started for: ${resolvedAddress}`);

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
      const tronService = new TronService({
        privateKey: '0'.repeat(64),
        network: this.gameConfig.network,
      });
      const addressResolver = new AddressResolver(tronService.getTronWeb());
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
