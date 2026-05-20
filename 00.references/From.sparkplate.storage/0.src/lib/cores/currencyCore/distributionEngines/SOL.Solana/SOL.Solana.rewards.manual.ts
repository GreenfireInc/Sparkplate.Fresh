/**
 * Solana (SOL) Manual Reward System for Gaming
 * Server-managed rewards with SPL token support
 */

import {
  Connection,
  PublicKey,
  Keypair,
  SystemProgram,
  Transaction,
  sendAndConfirmTransaction,
  LAMPORTS_PER_SOL,
  TransactionSignature,
} from '@solana/web3.js';
import { resolve as resolveSnsName } from '@bonfida/spl-name-service';
import {
  getOrCreateAssociatedTokenAccount,
  createTransferCheckedInstruction,
} from '@solana/spl-token';

export interface GameConfig {
  rewardThreshold: number;
  rewardAmount: string;
  tickerSymbol: string;
  network: 'mainnet' | 'devnet' | 'testnet';
  currencyType: 'SOL' | 'SPL';
  mintAddress?: string;
  decimals?: number;
}

export interface WalletConfig {
  secretKey: Uint8Array;
  network: 'mainnet' | 'devnet' | 'testnet';
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
  signature?: string;
  error?: string;
}

export class AddressResolver {
  private connection: Connection;

  constructor(connection: Connection) {
    this.connection = connection;
  }

  async resolveAddress(input: string): Promise<string> {
    const value = input.trim();

    try {
      const pubkey = new PublicKey(value);
      return pubkey.toBase58();
    } catch (err) {
      // Not a raw pubkey, try SNS resolution
    }

    try {
      const normalized = value.endsWith('.sol') ? value.replace(/\.sol$/i, '') : value;
      const ownerPubkey = await resolveSnsName(this.connection, normalized);
      
      if (!ownerPubkey) {
        throw new Error('SNS resolution returned null');
      }
      
      return ownerPubkey.toBase58();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      throw new Error(`Failed to resolve address "${input}": ${errorMessage}`);
    }
  }

  isValidAddress(address: string): boolean {
    try {
      new PublicKey(address);
      return true;
    } catch {
      return false;
    }
  }
}

export class SolanaService {
  private connection: Connection;
  private payer: Keypair;
  private network: 'mainnet' | 'devnet' | 'testnet';

  constructor(config: WalletConfig) {
    this.network = config.network;
    this.connection = new Connection(this.getRpcUrl(config.network), {
      commitment: 'confirmed',
    });
    this.payer = Keypair.fromSecretKey(config.secretKey);
  }

  private getRpcUrl(network: 'mainnet' | 'devnet' | 'testnet'): string {
    switch (network) {
      case 'mainnet':
        return 'https://api.mainnet-beta.solana.com';
      case 'devnet':
        return 'https://api.devnet.solana.com';
      case 'testnet':
        return 'https://api.testnet.solana.com';
    }
  }

  async sendSolReward(recipient: PublicKey, amountSol: number): Promise<string> {
    if (amountSol <= 0) {
      throw new Error('amountSol must be > 0');
    }

    const lamports = Math.floor(amountSol * LAMPORTS_PER_SOL);

    const ix = SystemProgram.transfer({
      fromPubkey: this.payer.publicKey,
      toPubkey: recipient,
      lamports,
    });

    const tx = new Transaction().add(ix);
    tx.feePayer = this.payer.publicKey;

    const signature = await sendAndConfirmTransaction(this.connection, tx, [this.payer], {
      commitment: 'confirmed',
    });

    return signature;
  }

  async sendSplTokenReward(
    recipient: PublicKey,
    mintAddress: string,
    amount: number,
    decimals: number
  ): Promise<string> {
    const mintPubkey = new PublicKey(mintAddress);

    const recipientAta = await getOrCreateAssociatedTokenAccount(
      this.connection,
      this.payer,
      mintPubkey,
      recipient,
      true
    );

    const sourceAta = await getOrCreateAssociatedTokenAccount(
      this.connection,
      this.payer,
      mintPubkey,
      this.payer.publicKey
    );

    const amountInSmallest = Math.round(amount * Math.pow(10, decimals));

    const ix = createTransferCheckedInstruction(
      sourceAta.address,
      mintPubkey,
      recipientAta.address,
      this.payer.publicKey,
      BigInt(amountInSmallest),
      decimals,
      []
    );

    const tx = new Transaction().add(ix);
    tx.feePayer = this.payer.publicKey;

    const signature = await sendAndConfirmTransaction(this.connection, tx, [this.payer], {
      commitment: 'confirmed',
    });

    return signature;
  }

  async getBalance(): Promise<number> {
    try {
      const balance = await this.connection.getBalance(this.payer.publicKey);
      return balance / LAMPORTS_PER_SOL;
    } catch (error) {
      throw new Error(`Balance check failed: ${error}`);
    }
  }

  getConnection(): Connection {
    return this.connection;
  }

  getPayerAddress(): string {
    return this.payer.publicKey.toBase58();
  }
}

export class SolanaRewarder {
  private addressResolver: AddressResolver;
  private solanaService: SolanaService;
  private gameConfig: GameConfig;

  constructor(gameConfig: GameConfig, walletConfig: WalletConfig) {
    this.solanaService = new SolanaService(walletConfig);
    this.addressResolver = new AddressResolver(this.solanaService.getConnection());
    this.gameConfig = gameConfig;
  }

  async sendReward(playerAddress: string): Promise<TransactionResult> {
    try {
      const resolvedAddress = await this.addressResolver.resolveAddress(playerAddress);
      const recipientPubkey = new PublicKey(resolvedAddress);

      let signature: string;

      if (this.gameConfig.currencyType === 'SOL') {
        const balance = await this.solanaService.getBalance();
        const amount = parseFloat(this.gameConfig.rewardAmount);

        if (balance < amount) {
          throw new Error(
            `Insufficient SOL balance. Required: ${amount}, Available: ${balance.toFixed(6)}`
          );
        }

        signature = await this.solanaService.sendSolReward(recipientPubkey, amount);
        console.log(`✅ Sent ${amount} SOL to ${resolvedAddress}`);
      } else {
        if (!this.gameConfig.mintAddress || this.gameConfig.decimals === undefined) {
          throw new Error('mintAddress and decimals required for SPL transfers');
        }

        const amount = parseFloat(this.gameConfig.rewardAmount);
        signature = await this.solanaService.sendSplTokenReward(
          recipientPubkey,
          this.gameConfig.mintAddress,
          amount,
          this.gameConfig.decimals
        );
        console.log(`✅ Sent ${amount} ${this.gameConfig.tickerSymbol} to ${resolvedAddress}`);
      }

      console.log(`   Transaction: ${signature}`);

      return {
        success: true,
        signature,
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
  private rewarder: SolanaRewarder;
  private gameConfig: GameConfig;

  constructor(gameConfig: GameConfig, walletConfig: WalletConfig) {
    this.gameConfig = gameConfig;
    this.rewarder = new SolanaRewarder(gameConfig, walletConfig);
  }

  async startGame(walletInput: string): Promise<{ success: boolean; address?: string; sessionId?: string; error?: string }> {
    try {
      const solanaService = new SolanaService({
        secretKey: new Uint8Array(64),
        network: this.gameConfig.network,
      });
      const addressResolver = new AddressResolver(solanaService.getConnection());
      const resolvedAddress = await addressResolver.resolveAddress(walletInput);

      if (this.players.has(resolvedAddress)) {
        return {
          success: false,
          error: 'Game already started for this address',
        };
      }

      const sessionId = `sol_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      const player: Player = {
        walletAddress: resolvedAddress,
        score: 0,
        hasBeenRewarded: false,
        gameStartedAt: new Date(),
        sessionId,
      };

      this.players.set(resolvedAddress, player);
      console.log(`Solana game started for: ${resolvedAddress}`);

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
  ): Promise<{ success: boolean; rewardSent?: boolean; signature?: string; error?: string }> {
    try {
      const solanaService = new SolanaService({
        secretKey: new Uint8Array(64),
        network: this.gameConfig.network,
      });
      const addressResolver = new AddressResolver(solanaService.getConnection());
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
            signature: result.signature,
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
