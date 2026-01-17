/**
 * Cosmos (ATOM) Manual Escrow System for Gaming
 * Server-managed escrow for peer-to-peer gaming with WebRTC/Colyseus integration
 */

import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';
import { SigningStargateClient, StargateClient, coin } from '@cosmjs/stargate';
import { Bip39, Random } from '@cosmjs/crypto';
import * as crypto from 'crypto';

export interface GameConfig {
  betAmount: string;
  denom: string;
  player1Address: string;
  player2Address: string;
  hostEncryptionKey: string;
  rpcEndpoint: string;
}

export interface EscrowWallet {
  address: string;
  encryptedMnemonic: string;
  encryptedPrivateKey: string;
}

export interface GameState {
  escrowWallet: EscrowWallet;
  player1Deposited: boolean;
  player2Deposited: boolean;
  gameStarted: boolean;
  winner: string | null;
  escrowBalance: string;
}

export class CosmosGameEscrow {
  private client: StargateClient | null = null;
  private gameState: GameState;
  private config: GameConfig;
  private readonly ENCRYPTION_ALGORITHM = 'aes-256-gcm';
  private readonly GAS_PRICE = '0.025uatom';

  constructor(config: GameConfig) {
    this.config = config;
    this.gameState = {
      escrowWallet: { address: '', encryptedMnemonic: '', encryptedPrivateKey: '' },
      player1Deposited: false,
      player2Deposited: false,
      gameStarted: false,
      winner: null,
      escrowBalance: '0'
    };
  }

  static generateHostEncryptionKey(): string {
    const machineId = crypto.randomBytes(32).toString('hex');
    return crypto.createHash('sha256').update(machineId).digest('hex');
  }

  private encrypt(data: string, key: string): { encrypted: string; iv: string; authTag: string } {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(this.ENCRYPTION_ALGORITHM, Buffer.from(key, 'hex'), iv);
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    const authTag = cipher.getAuthTag();
    return { encrypted, iv: iv.toString('hex'), authTag: authTag.toString('hex') };
  }

  async initialize(): Promise<void> {
    this.client = await StargateClient.connect(this.config.rpcEndpoint);
  }

  async createEscrowWallet(): Promise<EscrowWallet> {
    const mnemonic = Bip39.encode(Random.getBytes(16)).toString();
    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, { prefix: 'cosmos' });
    const [account] = await wallet.getAccounts();
    
    const encryptedMnemonicData = this.encrypt(mnemonic, this.config.hostEncryptionKey);
    const encryptedMnemonic = JSON.stringify(encryptedMnemonicData);
    
    this.gameState.escrowWallet = {
      address: account.address,
      encryptedMnemonic,
      encryptedPrivateKey: encryptedMnemonic
    };

    return this.gameState.escrowWallet;
  }

  async checkPlayerDeposit(playerAddress: string): Promise<boolean> {
    if (!this.client) throw new Error('Client not initialized');
    const balance = await this.client.getBalance(this.gameState.escrowWallet.address, this.config.denom);
    const expectedAmount = parseInt(this.config.betAmount);
    
    if (playerAddress === this.config.player1Address && parseInt(balance.amount) >= expectedAmount) {
      this.gameState.player1Deposited = true;
      return true;
    }
    if (playerAddress === this.config.player2Address && parseInt(balance.amount) >= expectedAmount * 2) {
      this.gameState.player2Deposited = true;
      return true;
    }
    return false;
  }

  async canStartGame(): Promise<boolean> {
    await this.checkPlayerDeposit(this.config.player1Address);
    await this.checkPlayerDeposit(this.config.player2Address);
    if (this.gameState.player1Deposited && this.gameState.player2Deposited) {
      this.gameState.gameStarted = true;
      return true;
    }
    return false;
  }

  getGameState(): GameState {
    return { ...this.gameState };
  }
}

export class CosmosGameServer {
  private escrow: CosmosGameEscrow;
  constructor(escrow: CosmosGameEscrow) {
    this.escrow = escrow;
  }

  async initializeGame(): Promise<string> {
    await this.escrow.initialize();
    const escrowWallet = await this.escrow.createEscrowWallet();
    return escrowWallet.address;
  }

  getGameState(): GameState {
    return this.escrow.getGameState();
  }
}

export default CosmosGameEscrow;
