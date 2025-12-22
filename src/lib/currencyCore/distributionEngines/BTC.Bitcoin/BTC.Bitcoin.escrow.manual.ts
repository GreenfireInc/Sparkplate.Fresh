/**
 * Bitcoin (BTC) Manual Escrow System for Gaming
 * Server-managed escrow for peer-to-peer gaming with UTXO management
 */

import * as bitcoin from 'bitcoinjs-lib';
import * as ecc from 'tiny-secp256k1';
import { ECPairFactory } from 'ecpair';
import * as crypto from 'crypto';

const ECPair = ECPairFactory(ecc);

export interface GameConfig {
  betAmountBTC: number; // Amount in BTC
  player1Address: string;
  player2Address: string;
  hostEncryptionKey: string;
  network: 'mainnet' | 'testnet';
}

export interface EscrowWallet {
  address: string;
  encryptedWIF: string;
}

export interface GameState {
  escrowWallet: EscrowWallet;
  player1Deposited: boolean;
  player2Deposited: boolean;
  gameStarted: boolean;
  winner: string | null;
  escrowBalanceSats: number;
}

export interface UTXO {
  txid: string;
  vout: number;
  value: number;
  scriptPubKey: string;
}

export class BitcoinGameEscrow {
  private network: bitcoin.Network;
  private gameState: GameState;
  private config: GameConfig;
  private readonly ENCRYPTION_ALGORITHM = 'aes-256-gcm';
  private utxoProvider?: (address: string) => Promise<UTXO[]>;
  private broadcastProvider?: (rawTx: string) => Promise<string>;

  constructor(
    config: GameConfig,
    utxoProvider?: (address: string) => Promise<UTXO[]>,
    broadcastProvider?: (rawTx: string) => Promise<string>
  ) {
    this.config = config;
    this.network = config.network === 'mainnet' ? bitcoin.networks.bitcoin : bitcoin.networks.testnet;
    this.utxoProvider = utxoProvider;
    this.broadcastProvider = broadcastProvider;
    
    this.gameState = {
      escrowWallet: { address: '', encryptedWIF: '' },
      player1Deposited: false,
      player2Deposited: false,
      gameStarted: false,
      winner: null,
      escrowBalanceSats: 0,
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

  async createEscrowWallet(): Promise<EscrowWallet> {
    // Generate new key pair
    const keyPair = ECPair.makeRandom({ network: this.network });
    const wif = keyPair.toWIF();
    
    // Create SegWit address (P2WPKH)
    const { address } = bitcoin.payments.p2wpkh({
      pubkey: keyPair.publicKey,
      network: this.network,
    });
    
    // Encrypt WIF
    const encryptedData = this.encrypt(wif, this.config.hostEncryptionKey);
    const encryptedWIF = JSON.stringify(encryptedData);
    
    this.gameState.escrowWallet = {
      address: address!,
      encryptedWIF,
    };

    console.log(`✅ Escrow wallet created: ${address}`);
    console.log(`💰 Players should deposit ${this.config.betAmountBTC} BTC each`);
    return this.gameState.escrowWallet;
  }

  async checkPlayerDeposit(playerAddress: string): Promise<boolean> {
    if (!this.utxoProvider) {
      console.warn('UTXO provider not configured. Cannot check deposits.');
      return false;
    }

    const utxos = await this.utxoProvider(this.gameState.escrowWallet.address);
    const currentBalanceSats = utxos.reduce((sum, utxo) => sum + utxo.value, 0);
    this.gameState.escrowBalanceSats = currentBalanceSats;

    const expectedAmountSats = Math.floor(this.config.betAmountBTC * 100000000);
    
    if (playerAddress === this.config.player1Address && currentBalanceSats >= expectedAmountSats) {
      this.gameState.player1Deposited = true;
      console.log(`✅ Player 1 deposit confirmed`);
      return true;
    }
    
    if (playerAddress === this.config.player2Address && currentBalanceSats >= expectedAmountSats * 2) {
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

    if (!this.utxoProvider || !this.broadcastProvider) {
      throw new Error('UTXO and broadcast providers required for distribution');
    }

    // Validate winner address
    try {
      bitcoin.address.toOutputScript(winnerAddress, this.network);
    } catch {
      throw new Error('Invalid winner address');
    }

    // Decrypt WIF
    const encryptedData = JSON.parse(this.gameState.escrowWallet.encryptedWIF);
    const wif = this.decrypt(
      encryptedData.encrypted,
      this.config.hostEncryptionKey,
      encryptedData.iv,
      encryptedData.authTag
    );

    // Create key pair from WIF
    const keyPair = ECPair.fromWIF(wif, this.network);
    
    // Fetch UTXOs
    const utxos = await this.utxoProvider(this.gameState.escrowWallet.address);
    
    if (utxos.length === 0) {
      throw new Error('No UTXOs available');
    }

    // Build transaction
    const psbt = new bitcoin.Psbt({ network: this.network });

    // Add all UTXOs as inputs
    let totalInput = 0;
    for (const utxo of utxos) {
      psbt.addInput({
        hash: utxo.txid,
        index: utxo.vout,
        witnessUtxo: {
          script: Buffer.from(utxo.scriptPubKey, 'hex'),
          value: utxo.value,
        },
      });
      totalInput += utxo.value;
    }

    // Calculate fee (estimate: 10 sat/vB)
    const estimatedSize = utxos.length * 68 + 31 + 10;
    const fee = estimatedSize * 10;
    const sendAmount = totalInput - fee;

    if (sendAmount <= 546) {
      throw new Error('Insufficient balance after fees');
    }

    // Add output to winner
    psbt.addOutput({
      address: winnerAddress,
      value: sendAmount,
    });

    // Sign all inputs
    for (let i = 0; i < utxos.length; i++) {
      psbt.signInput(i, keyPair);
    }

    // Finalize and extract
    psbt.finalizeAllInputs();
    const tx = psbt.extractTransaction();
    const txid = tx.getId();
    const rawTx = tx.toHex();

    // Broadcast transaction
    await this.broadcastProvider(rawTx);

    this.gameState.winner = winnerAddress;
    console.log(`✅ Pot distributed to winner: ${winnerAddress}`);
    console.log(`   Transaction: ${txid}`);

    return txid;
  }

  getGameState(): GameState {
    return { ...this.gameState };
  }
}

export class BitcoinGameServer {
  private escrow: BitcoinGameEscrow;

  constructor(escrow: BitcoinGameEscrow) {
    this.escrow = escrow;
  }

  async initializeGame(): Promise<string> {
    const wallet = await this.escrow.createEscrowWallet();
    return wallet.address;
  }

  async handleGameEnd(winnerAddress: string): Promise<void> {
    const txid = await this.escrow.distributePot(winnerAddress);
    console.log(`🎯 Game ended. Winner: ${winnerAddress}, TX: ${txid}`);
  }

  getGameState(): GameState {
    return this.escrow.getGameState();
  }
}

export default BitcoinGameEscrow;
