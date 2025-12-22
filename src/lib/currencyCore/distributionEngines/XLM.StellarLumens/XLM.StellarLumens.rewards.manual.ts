/**
 * Stellar Lumens (XLM) Manual Reward System for Gaming
 * Server-managed rewards with Stellar SDK
 */

import {
  Server,
  Keypair,
  TransactionBuilder,
  Networks,
  Operation,
  Asset,
  Memo,
} from 'stellar-sdk';

export interface GameConfig {
  rewardThreshold: number;
  rewardAmount: string;
  tickerSymbol: string;
  network: 'public' | 'testnet';
  assetCode?: string;
  assetIssuer?: string;
}

export interface WalletConfig {
  secretKey: string;
  network: 'public' | 'testnet';
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
  private server: Server;

  constructor(network: 'public' | 'testnet') {
    const horizonUrl = network === 'public'
      ? 'https://horizon.stellar.org'
      : 'https://horizon-testnet.stellar.org';
    this.server = new Server(horizonUrl);
  }

  async resolveAddress(input: string): Promise<string> {
    const value = input.trim();

    if (this.isValidAddress(value)) {
      return value;
    }

    if (value.includes('*')) {
      return await this.resolveFederatedAddress(value);
    }

    throw new Error('Invalid Stellar address format');
  }

  private async resolveFederatedAddress(federatedAddress: string): Promise<string> {
    try {
      const account = await this.server.federationServer()
        .resolveAddress(federatedAddress);
      
      if (!account.account_id) {
        throw new Error('Federation server did not return an account ID');
      }

      return account.account_id;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      throw new Error(`Failed to resolve federated address "${federatedAddress}": ${errorMessage}`);
    }
  }

  isValidAddress(address: string): boolean {
    try {
      Keypair.fromPublicKey(address);
      return true;
    } catch {
      return false;
    }
  }
}

export class StellarService {
  private secretKey: string;
  private server: Server;
  private networkPassphrase: string;
  private network: 'public' | 'testnet';

  constructor(config: WalletConfig) {
    this.secretKey = config.secretKey;
    this.network = config.network;
    
    const horizonUrl = config.network === 'public'
      ? 'https://horizon.stellar.org'
      : 'https://horizon-testnet.stellar.org';
    
    this.server = new Server(horizonUrl);
    this.networkPassphrase = config.network === 'public'
      ? Networks.PUBLIC
      : Networks.TESTNET;
  }

  async sendPayment(
    destination: string,
    amount: string,
    assetCode?: string,
    assetIssuer?: string,
    memo?: string
  ): Promise<string> {
    try {
      const sourceKeypair = Keypair.fromSecret(this.secretKey);
      const sourceAccount = await this.server.loadAccount(sourceKeypair.publicKey());

      const asset = assetCode && assetIssuer
        ? new Asset(assetCode, assetIssuer)
        : Asset.native();

      const baseFee = await this.server.fetchBaseFee();

      let transaction = new TransactionBuilder(sourceAccount, {
        fee: baseFee.toString(),
        networkPassphrase: this.networkPassphrase,
      })
        .addOperation(
          Operation.payment({
            destination,
            asset,
            amount,
          })
        )
        .setTimeout(30);

      if (memo) {
        transaction = transaction.addMemo(Memo.text(memo));
      }

      const builtTransaction = transaction.build();
      builtTransaction.sign(sourceKeypair);

      const result = await this.server.submitTransaction(builtTransaction);

      console.log(`✅ Sent ${amount} ${assetCode || 'XLM'} to ${destination}`);
      console.log(`   Transaction: ${result.hash}`);

      return result.hash;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Stellar transaction failed: ${errorMessage}`);
    }
  }

  async getBalance(address: string, assetCode?: string, assetIssuer?: string): Promise<number> {
    try {
      const account = await this.server.loadAccount(address);

      if (!assetCode) {
        const nativeBalance = account.balances.find(
          (balance) => balance.asset_type === 'native'
        );
        return nativeBalance ? parseFloat(nativeBalance.balance) : 0;
      }

      const assetBalance = account.balances.find(
        (balance) =>
          balance.asset_type !== 'native' &&
          'asset_code' in balance &&
          balance.asset_code === assetCode &&
          'asset_issuer' in balance &&
          balance.asset_issuer === assetIssuer
      );

      return assetBalance ? parseFloat(assetBalance.balance) : 0;
    } catch (error) {
      throw new Error(`Balance check failed: ${error}`);
    }
  }

  getNetworkType(): 'public' | 'testnet' {
    return this.network;
  }

  getPublicKey(): string {
    const keypair = Keypair.fromSecret(this.secretKey);
    return keypair.publicKey();
  }
}

export class StellarRewarder {
  private addressResolver: AddressResolver;
  private stellarService: StellarService;
  private gameConfig: GameConfig;

  constructor(gameConfig: GameConfig, walletConfig: WalletConfig) {
    this.gameConfig = gameConfig;
    this.stellarService = new StellarService(walletConfig);
    this.addressResolver = new AddressResolver(walletConfig.network);
  }

  async sendReward(playerAddress: string): Promise<TransactionResult> {
    try {
      const resolvedAddress = await this.addressResolver.resolveAddress(playerAddress);

      const amount = this.gameConfig.rewardAmount;
      const txHash = await this.stellarService.sendPayment(
        resolvedAddress,
        amount,
        this.gameConfig.assetCode,
        this.gameConfig.assetIssuer,
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
}

export class GameRewardManager {
  private players: Map<string, Player> = new Map();
  private rewarder: StellarRewarder;
  private gameConfig: GameConfig;

  constructor(gameConfig: GameConfig, walletConfig: WalletConfig) {
    this.gameConfig = gameConfig;
    this.rewarder = new StellarRewarder(gameConfig, walletConfig);
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

      const sessionId = `xlm_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      const player: Player = {
        walletAddress: resolvedAddress,
        score: 0,
        hasBeenRewarded: false,
        gameStartedAt: new Date(),
        sessionId,
      };

      this.players.set(resolvedAddress, player);
      console.log(`Stellar game started for: ${resolvedAddress}`);

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
