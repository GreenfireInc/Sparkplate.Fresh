/**
 * Terra Classic (LUNC) Manual Reward System for Gaming
 * Server-managed rewards with Columbus-5 support
 */

import {
  LCDClient,
  MnemonicKey,
  MsgSend,
  Coin,
  Wallet,
} from '@terra-money/terra.js';

export interface GameConfig {
  rewardThreshold: number;
  rewardAmount: string;
  tickerSymbol: string;
  network: 'mainnet' | 'testnet';
}

export interface WalletConfig {
  mnemonic: string;
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
  async resolveAddress(input: string): Promise<string> {
    if (this.isValidTerraAddress(input)) {
      return input;
    }

    throw new Error('Invalid Terra Classic address format');
  }

  private isValidTerraAddress(address: string): boolean {
    const terraRegex = /^terra1[a-z0-9]{38}$/;
    return terraRegex.test(address);
  }
}

export class TerraClassicService {
  private mnemonic: string;
  private lcd: LCDClient;
  private wallet: Wallet;
  private network: 'mainnet' | 'testnet';

  constructor(config: WalletConfig) {
    this.mnemonic = config.mnemonic;
    this.network = config.network;

    const lcdUrl = this.network === 'mainnet'
      ? 'https://terra-classic-lcd.publicnode.com'
      : 'https://bombay-lcd.terra.dev';

    const chainID = this.network === 'mainnet' ? 'columbus-5' : 'bombay-12';

    // Terra Classic uses higher gas prices
    const gasPrices = this.network === 'mainnet'
      ? '28.325uluna'
      : '0.15uluna';

    this.lcd = new LCDClient({
      URL: lcdUrl,
      chainID,
      gasPrices,
      gasAdjustment: 1.75,
    });

    const mk = new MnemonicKey({ mnemonic: this.mnemonic });
    this.wallet = this.lcd.wallet(mk);
  }

  async sendTransaction(toAddress: string, amount: string): Promise<string> {
    try {
      const amountUluna = Math.floor(parseFloat(amount) * 1_000_000).toString();

      const send = new MsgSend(
        this.wallet.key.accAddress,
        toAddress,
        [new Coin('uluna', amountUluna)]
      );

      const tx = await this.wallet.createAndSignTx({
        msgs: [send],
        memo: `Game reward: ${amount} LUNC`,
      });

      const result = await this.lcd.tx.broadcast(tx);

      await this.lcd.tx.txInfo(result.txhash);

      console.log(`✅ Sent ${amount} LUNC to ${toAddress}`);
      console.log(`   Transaction: ${result.txhash}`);

      return result.txhash;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Terra Classic transaction failed: ${errorMessage}`);
    }
  }

  async getBalance(): Promise<string> {
    try {
      const address = this.wallet.key.accAddress;
      const [coins] = await this.lcd.bank.balance(address);

      const lunaBalance = coins.get('uluna');

      if (!lunaBalance) {
        return '0';
      }

      const lunc = parseFloat(lunaBalance.amount.toString()) / 1_000_000;
      return lunc.toFixed(6);
    } catch (error) {
      throw new Error(`Balance check failed: ${error}`);
    }
  }

  async estimateFee(toAddress: string, amount: string): Promise<number> {
    try {
      const amountUluna = Math.floor(parseFloat(amount) * 1_000_000).toString();

      const send = new MsgSend(
        this.wallet.key.accAddress,
        toAddress,
        [new Coin('uluna', amountUluna)]
      );

      const accountInfo = await this.lcd.auth.accountInfo(this.wallet.key.accAddress);
      
      const tx = await this.wallet.createTx({
        msgs: [send],
      });

      const feeAmount = tx.auth_info.fee.amount.get('uluna');
      if (!feeAmount) return 0.1;

      return parseFloat(feeAmount.amount.toString()) / 1_000_000;
    } catch (error) {
      console.error('Error estimating fee:', error);
      return 0.1;
    }
  }

  getRewardWalletAddress(): string {
    return this.wallet.key.accAddress;
  }
}

export class TerraClassicRewarder {
  private addressResolver: AddressResolver;
  private terraClassicService: TerraClassicService;

  constructor(walletConfig: WalletConfig) {
    this.addressResolver = new AddressResolver();
    this.terraClassicService = new TerraClassicService(walletConfig);
  }

  async sendReward(playerAddress: string, amount: string): Promise<TransactionResult> {
    try {
      const resolvedAddress = await this.addressResolver.resolveAddress(playerAddress);
      const balance = await this.terraClassicService.getBalance();

      const estimatedFee = await this.terraClassicService.estimateFee(resolvedAddress, amount);
      const totalRequired = parseFloat(amount) + estimatedFee;

      if (parseFloat(balance) < totalRequired) {
        throw new Error(
          `Insufficient LUNC balance. Required: ${totalRequired.toFixed(6)}, Available: ${balance}`
        );
      }

      const txHash = await this.terraClassicService.sendTransaction(resolvedAddress, amount);

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
  private rewarder: TerraClassicRewarder;
  private gameConfig: GameConfig;

  constructor(gameConfig: GameConfig, walletConfig: WalletConfig) {
    this.gameConfig = gameConfig;
    this.rewarder = new TerraClassicRewarder(walletConfig);
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

      const sessionId = `lunc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      const player: Player = {
        walletAddress: resolvedAddress,
        score: 0,
        hasBeenRewarded: false,
        gameStartedAt: new Date(),
        sessionId,
      };

      this.players.set(resolvedAddress, player);
      console.log(`Terra Classic game started for: ${resolvedAddress}`);

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
