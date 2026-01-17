/**
 * Solana (SOL) Manual Escrow System for Gaming
 * Server-managed escrow with encrypted secret key storage
 */

import {
  Connection,
  PublicKey,
  Keypair,
  SystemProgram,
  Transaction,
  sendAndConfirmTransaction,
  LAMPORTS_PER_SOL,
} from '@solana/web3.js';
import * as crypto from 'crypto';

export interface GameConfig {
  betAmount: number;
  player1Address: string;
  player2Address: string;
  hostEncryptionKey: string;
  network: 'mainnet' | 'devnet' | 'testnet';
}

export interface EscrowWallet {
  address: string;
  encryptedSecretKey: string;
}

export interface GameState {
  escrowWallet: EscrowWallet;
  player1Deposited: boolean;
  player2Deposited: boolean;
  gameStarted: boolean;
  winner: string | null;
  escrowBalance: number;
}

export class SolanaGameEscrow {
  private connection: Connection;
  private gameState: GameState;
  private config: GameConfig;
  private readonly ENCRYPTION_ALGORITHM = 'aes-256-gcm';

  constructor(config: GameConfig) {
    this.config = config;
    this.connection = new Connection(this.getRpcUrl(config.network), {
      commitment: 'confirmed',
    });

    this.gameState = {
      escrowWallet: { address: '', encryptedSecretKey: '' },
      player1Deposited: false,
      player2Deposited: false,
      gameStarted: false,
      winner: null,
      escrowBalance: 0,
    };
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

  static generateHostEncryptionKey(): string {
    return crypto.randomBytes(32).toString('hex');
  }

  private encrypt(data: string, key: string): { encrypted: string; iv: string; authTag: string } {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(this.ENCRYPTION_ALGORITHM, Buffer.from(key, 'hex'), iv);
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return { encrypted, iv: iv.toString('hex'), authTag: cipher.getAuthTag().toString('hex') };
  }

  private decrypt(encryptedData: string, key: string, iv: string, authTag: string): string {
    const decipher = crypto.createDecipheriv(
      this.ENCRYPTION_ALGORITHM,
      Buffer.from(key, 'hex'),
      Buffer.from(iv, 'hex')
    );
    decipher.setAuthTag(Buffer.from(authTag, 'hex'));
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }

  async createEscrowWallet(): Promise<EscrowWallet> {
    const keypair = Keypair.generate();
    const address = keypair.publicKey.toBase58();

    const secretKeyString = JSON.stringify(Array.from(keypair.secretKey));
    const encryptedData = this.encrypt(secretKeyString, this.config.hostEncryptionKey);
    const encryptedSecretKey = JSON.stringify(encryptedData);

    this.gameState.escrowWallet = {
      address,
      encryptedSecretKey,
    };

    console.log(`✅ Escrow wallet created: ${address}`);
    console.log(`💰 Players should deposit ${this.config.betAmount} SOL each`);

    return this.gameState.escrowWallet;
  }

  async checkPlayerDeposit(playerAddress: string): Promise<boolean> {
    const balance = await this.getWalletBalance(this.gameState.escrowWallet.address);
    this.gameState.escrowBalance = balance;

    const expectedAmount = this.config.betAmount;

    if (
      playerAddress.toLowerCase() === this.config.player1Address.toLowerCase() &&
      balance >= expectedAmount
    ) {
      this.gameState.player1Deposited = true;
      console.log(`✅ Player 1 deposit confirmed`);
      return true;
    }

    if (
      playerAddress.toLowerCase() === this.config.player2Address.toLowerCase() &&
      balance >= expectedAmount * 2
    ) {
      this.gameState.player2Deposited = true;
      console.log(`✅ Player 2 deposit confirmed`);
      return true;
    }

    return false;
  }

  async canStartGame(): Promise<boolean> {
    await this.checkPlayerDeposit(this.config.player1Address);
    await this.checkPlayerDeposit(this.config.player2Address);

    if (this.gameState.player1Deposited && this.gameState.player2Deposited) {
      this.gameState.gameStarted = true;
      console.log('🎮 Both players deposited! Game can start.');
      return true;
    }
    return false;
  }

  async distributePot(winnerAddress: string): Promise<string> {
    if (!this.gameState.gameStarted) {
      throw new Error('Game has not started yet');
    }

    if (!this.isValidAddress(winnerAddress)) {
      throw new Error('Invalid winner address');
    }

    const encryptedData = JSON.parse(this.gameState.escrowWallet.encryptedSecretKey);
    const secretKeyString = this.decrypt(
      encryptedData.encrypted,
      this.config.hostEncryptionKey,
      encryptedData.iv,
      encryptedData.authTag
    );

    const secretKeyArray = JSON.parse(secretKeyString);
    const keypair = Keypair.fromSecretKey(Uint8Array.from(secretKeyArray));

    const balance = await this.connection.getBalance(keypair.publicKey);

    if (balance === 0) {
      throw new Error('No balance in escrow wallet');
    }

    const feeEstimate = 5000;
    const sendAmount = balance - feeEstimate;

    if (sendAmount <= 0) {
      throw new Error('Insufficient balance after fees');
    }

    const winnerPubkey = new PublicKey(winnerAddress);

    const ix = SystemProgram.transfer({
      fromPubkey: keypair.publicKey,
      toPubkey: winnerPubkey,
      lamports: sendAmount,
    });

    const tx = new Transaction().add(ix);
    tx.feePayer = keypair.publicKey;

    const signature = await sendAndConfirmTransaction(this.connection, tx, [keypair], {
      commitment: 'confirmed',
    });

    this.gameState.winner = winnerAddress;
    console.log(`✅ Pot distributed to winner: ${winnerAddress}`);
    console.log(`   Transaction: ${signature}`);

    return signature;
  }

  private isValidAddress(address: string): boolean {
    try {
      new PublicKey(address);
      return true;
    } catch {
      return false;
    }
  }

  private async getWalletBalance(address: string): Promise<number> {
    try {
      const pubkey = new PublicKey(address);
      const balance = await this.connection.getBalance(pubkey);
      return balance / LAMPORTS_PER_SOL;
    } catch (error) {
      console.error('Failed to fetch balance:', error);
      return 0;
    }
  }

  getGameState(): GameState {
    return { ...this.gameState };
  }
}

export class SolanaGameServer {
  private escrow: SolanaGameEscrow;

  constructor(escrow: SolanaGameEscrow) {
    this.escrow = escrow;
  }

  async initializeGame(): Promise<string> {
    const wallet = await this.escrow.createEscrowWallet();
    return wallet.address;
  }

  async handleGameEnd(winnerAddress: string): Promise<void> {
    const signature = await this.escrow.distributePot(winnerAddress);
    console.log(`🎯 Game ended. Winner: ${winnerAddress}, TX: ${signature}`);
  }

  getGameState(): GameState {
    return this.escrow.getGameState();
  }
}

export default SolanaGameEscrow;
