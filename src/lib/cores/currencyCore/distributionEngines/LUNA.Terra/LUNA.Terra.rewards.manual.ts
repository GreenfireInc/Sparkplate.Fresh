/**
 * Terra (LUNA) Manual Reward System for Gaming
 * Server-managed rewards with Terra 2.0 (Phoenix) support
 */

import {
  LCDClient,
  MnemonicKey,
  MsgSend,
  Coin,
  Wallet,
} from '@terra-money/feather.js';

export interface GameConfig {
  rewardThreshold: number;
  rewardAmount: string;
  tickerSymbol: string;
  network: 'mainnet' | 'testnet';
}

export interface WalletConfig {
  mnemonic: string;
  chainID: string;
  lcdUrl: string;
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
  gasUsed?: number;
}

export class AddressResolver {
  async resolveAddress(input: string, network: 'mainnet' | 'testnet'): Promise<string> {
    if (this.isValidTerraAddress(input)) {
      return input;
    }

    // TNS (Terra Name Service) resolution would go here
    if (input.endsWith('.ust')) {
      throw new Error('TNS resolution not implemented - integrate TNS contract');
    }

    throw new Error('Invalid Terra address format');
  }

  private isValidTerraAddress(address: string): boolean {
    const terraRegex = /^terra1[a-z0-9]{38}$/;
    return terraRegex.test(address);
  }
}

export class TerraService {
  private mnemonic: string;
  private chainID: string;
  private lcdUrl: string;
  private lcd: LCDClient;
  private wallet: Wallet;
  private network: 'mainnet' | 'testnet';

  constructor(config: WalletConfig) {
    this.mnemonic = config.mnemonic;
    this.chainID = config.chainID;
    this.lcdUrl = config.lcdUrl;
    this.network = config.network;

    const gasAdjustment = 1.4;
    const gasPrices = this.network === 'mainnet'
      ? { uluna: '0.015' }
      : { uluna: '0.015' };

    this.lcd = new LCDClient({
      [this.chainID]: {
        lcd: this.lcdUrl,
        chainID: this.chainID,
        gasAdjustment,
        gasPrices,
        prefix: 'terra',
      },
    });

    const mk = new MnemonicKey({ mnemonic: this.mnemonic });
    this.wallet = this.lcd.wallet(mk);
  }

  async sendTransaction(toAddress: string, amount: string): Promise<string> {
    try {
      const fromAddress = this.wallet.key.accAddress(this.chainID);

      const amountUluna = Math.floor(parseFloat(amount) * 1_000_000).toString();

      const send = new MsgSend(
        fromAddress,
        toAddress,
        [new Coin('uluna', amountUluna)]
      );

      const tx = await this.wallet.createAndSignTx({
        chainID: this.chainID,
        msgs: [send],
        memo: `Game reward: ${amount} LUNA`,
      });

      const result = await this.lcd.tx.broadcast(tx, this.chainID);

      await this.lcd.tx.txInfo(result.txhash, this.chainID);

      console.log(`✅ Sent ${amount} LUNA to ${toAddress}`);
      console.log(`   Transaction: ${result.txhash}`);

      return result.txhash;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Terra transaction failed: ${errorMessage}`);
    }
  }

  async getBalance(): Promise<string> {
    try {
      const address = this.wallet.key.accAddress(this.chainID);
      const [balance] = await this.lcd.bank.balance(address, {
        [this.chainID]: {},
      });

      const lunaBalance = balance[this.chainID].get('uluna');

      if (!lunaBalance) {
        return '0';
      }

      const luna = parseFloat(lunaBalance.amount.toString()) / 1_000_000;
      return luna.toFixed(6);
    } catch (error) {
      throw new Error(`Balance check failed: ${error}`);
    }
  }

  async estimateFee(toAddress: string, amount: string): Promise<number> {
    try {
      const fromAddress = this.wallet.key.accAddress(this.chainID);
      const amountUluna = Math.floor(parseFloat(amount) * 1_000_000).toString();

      const send = new MsgSend(
        fromAddress,
        toAddress,
        [new Coin('uluna', amountUluna)]
      );

      const tx = await this.wallet.createTx({
        chainID: this.chainID,
        msgs: [send],
      });

      const feeAmount = tx.auth_info.fee.amount.get('uluna');
      if (!feeAmount) return 0.01;

      return parseFloat(feeAmount.amount.toString()) / 1_000_000;
    } catch (error) {
      console.error('Error estimating fee:', error);
      return 0.01;
    }
  }

  getRewardWalletAddress(): string {
    return this.wallet.key.accAddress(this.chainID);
  }
}

export class TerraRewarder {
  private addressResolver: AddressResolver;
  private terraService: TerraService;
  private network: 'mainnet' | 'testnet';

  constructor(walletConfig: WalletConfig) {
    this.addressResolver = new AddressResolver();
    this.terraService = new TerraService(walletConfig);
    this.network = walletConfig.network;
  }

  async sendReward(playerAddress: string, amount: string): Promise<TransactionResult> {
    try {
      const resolvedAddress = await this.addressResolver.resolveAddress(playerAddress, this.network);
      const balance = await this.terraService.getBalance();

      const estimatedFee = await this.terraService.estimateFee(resolvedAddress, amount);
      const totalRequired = parseFloat(amount) + estimatedFee;

      if (parseFloat(balance) < totalRequired) {
        throw new Error(
          `Insufficient LUNA balance. Required: ${totalRequired.toFixed(6)}, Available: ${balance}`
        );
      }

      const txHash = await this.terraService.sendTransaction(resolvedAddress, amount);

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
  private rewarder: TerraRewarder;
  private gameConfig: GameConfig;

  constructor(gameConfig: GameConfig, walletConfig: WalletConfig) {
    this.gameConfig = gameConfig;
    this.rewarder = new TerraRewarder(walletConfig);
  }

  async startGame(walletInput: string): Promise<{ success: boolean; address?: string; sessionId?: string; error?: string }> {
    try {
      const addressResolver = new AddressResolver();
      const resolvedAddress = await addressResolver.resolveAddress(walletInput, this.gameConfig.network);

      if (this.players.has(resolvedAddress)) {
        return {
          success: false,
          error: 'Game already started for this address',
        };
      }

      const sessionId = `terra_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      const player: Player = {
        walletAddress: resolvedAddress,
        score: 0,
        hasBeenRewarded: false,
        gameStartedAt: new Date(),
        sessionId,
      };

      this.players.set(resolvedAddress, player);
      console.log(`Terra game started for: ${resolvedAddress}`);

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
      const resolvedAddress = await addressResolver.resolveAddress(walletInput, this.gameConfig.network);
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
        const result = await this.rewarder.sendReward(
          player.walletAddress,
          this.gameConfig.rewardAmount
        );

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
