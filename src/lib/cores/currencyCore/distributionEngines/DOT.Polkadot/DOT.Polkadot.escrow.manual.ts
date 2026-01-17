/**
 * Polkadot (DOT) Manual Escrow System for Gaming
 * Server-managed escrow for peer-to-peer gaming on Polkadot/Substrate
 */

import { ApiPromise, WsProvider, Keyring } from '@polkadot/api';
import { KeyringPair } from '@polkadot/keyring/types';
import { cryptoWaitReady } from '@polkadot/util-crypto';
import * as crypto from 'crypto';

export interface GameConfig {
  betAmountDOT: number;
  player1Address: string;
  player2Address: string;
  hostEncryptionKey: string;
  network: 'polkadot' | 'kusama' | 'westend';
}

export interface EscrowWallet {
  address: string;
  encryptedMnemonic: string;
}

export interface GameState {
  escrowWallet: EscrowWallet;
  player1Deposited: boolean;
  player2Deposited: boolean;
  gameStarted: boolean;
  winner: string | null;
  escrowBalanceDOT: number;
}

export class PolkadotGameEscrow {
  private api: ApiPromise | null = null;
  private gameState: GameState;
  private config: GameConfig;
  private readonly ENCRYPTION_ALGORITHM = 'aes-256-gcm';
  private wsEndpoint: string;

  constructor(config: GameConfig) {
    this.config = config;
    
    switch (config.network) {
      case 'polkadot':
        this.wsEndpoint = 'wss://rpc.polkadot.io';
        break;
      case 'kusama':
        this.wsEndpoint = 'wss://kusama-rpc.polkadot.io';
        break;
      case 'westend':
        this.wsEndpoint = 'wss://westend-rpc.polkadot.io';
        break;
    }
    
    this.gameState = {
      escrowWallet: { address: '', encryptedMnemonic: '' },
      player1Deposited: false,
      player2Deposited: false,
      gameStarted: false,
      winner: null,
      escrowBalanceDOT: 0,
    };
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

  async initialize(): Promise<void> {
    await cryptoWaitReady();
    const provider = new WsProvider(this.wsEndpoint);
    this.api = await ApiPromise.create({ provider });
  }

  async disconnect(): Promise<void> {
    if (this.api) {
      await this.api.disconnect();
    }
  }

  async createEscrowWallet(): Promise<EscrowWallet> {
    await cryptoWaitReady();
    const keyring = new Keyring({ type: 'sr25519' });
    const { phrase, address } = await keyring.createFromUri(undefined, {}, 'sr25519');
    
    const encryptedData = this.encrypt(phrase, this.config.hostEncryptionKey);
    const encryptedMnemonic = JSON.stringify(encryptedData);
    
    this.gameState.escrowWallet = {
      address,
      encryptedMnemonic,
    };

    console.log(\`✅ Escrow wallet created: \${address}\`);
    console.log(\`💰 Players should deposit \${this.config.betAmountDOT} DOT each\`);
    return this.gameState.escrowWallet;
  }

  async checkPlayerDeposit(playerAddress: string): Promise<boolean> {
    if (!this.api) {
      throw new Error('API not initialized');
    }

    const { data: balance } = await this.api.query.system.account(this.gameState.escrowWallet.address);
    const currentBalanceDOT = Number(balance.free) / 10_000_000_000;
    this.gameState.escrowBalanceDOT = currentBalanceDOT;

    const expectedAmount = this.config.betAmountDOT;
    
    if (playerAddress === this.config.player1Address && currentBalanceDOT >= expectedAmount) {
      this.gameState.player1Deposited = true;
      console.log(\`✅ Player 1 deposit confirmed\`);
      return true;
    }
    
    if (playerAddress === this.config.player2Address && currentBalanceDOT >= expectedAmount * 2) {
      this.gameState.player2Deposited = true;
      console.log(\`✅ Player 2 deposit confirmed\`);
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

    if (!this.api) {
      throw new Error('API not initialized');
    }

    const encryptedData = JSON.parse(this.gameState.escrowWallet.encryptedMnemonic);
    const mnemonic = this.decrypt(
      encryptedData.encrypted,
      this.config.hostEncryptionKey,
      encryptedData.iv,
      encryptedData.authTag
    );

    await cryptoWaitReady();
    const keyring = new Keyring({ type: 'sr25519' });
    const escrow = keyring.addFromMnemonic(mnemonic);
    
    const { data: balance } = await this.api.query.system.account(escrow.address);
    const availableBalance = BigInt(balance.free.toString());
    
    const existentialDeposit = BigInt(this.api.consts.balances.existentialDeposit.toString());
    const fee = BigInt(1_000_000_000); // 0.1 DOT fee estimate
    const sendAmount = availableBalance - existentialDeposit - fee;

    if (sendAmount <= 0n) {
      throw new Error('Insufficient balance after fees');
    }

    return new Promise((resolve, reject) => {
      this.api!.tx.balances
        .transfer(winnerAddress, sendAmount)
        .signAndSend(escrow, ({ status, txHash, dispatchError }) => {
          if (status.isFinalized) {
            if (dispatchError) {
              reject(new Error('Transaction failed'));
            } else {
              this.gameState.winner = winnerAddress;
              console.log(\`✅ Pot distributed to winner: \${winnerAddress}\`);
              console.log(\`   Transaction: \${txHash.toString()}\`);
              resolve(txHash.toString());
            }
          }
        })
        .catch(reject);
    });
  }

  getGameState(): GameState {
    return { ...this.gameState };
  }
}

export class PolkadotGameServer {
  private escrow: PolkadotGameEscrow;

  constructor(escrow: PolkadotGameEscrow) {
    this.escrow = escrow;
  }

  async initializeGame(): Promise<string> {
    await this.escrow.initialize();
    const wallet = await this.escrow.createEscrowWallet();
    return wallet.address;
  }

  async handleGameEnd(winnerAddress: string): Promise<void> {
    const txHash = await this.escrow.distributePot(winnerAddress);
    console.log(\`🎯 Game ended. Winner: \${winnerAddress}, TX: \${txHash}\`);
  }

  async shutdown(): Promise<void> {
    await this.escrow.disconnect();
  }

  getGameState(): GameState {
    return this.escrow.getGameState();
  }
}

export default PolkadotGameEscrow;
