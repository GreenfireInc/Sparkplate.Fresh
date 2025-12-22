/**
 * Dogecoin (DOGE) Manual Escrow System for Gaming
 * Server-managed escrow for peer-to-peer gaming
 * Much escrow! Very secure! Wow! 🐕
 */

import * as bitcoin from 'bitcoinjs-lib';
import * as ecc from 'tiny-secp256k1';
import { ECPairFactory } from 'ecpair';
import * as crypto from 'crypto';

const ECPair = ECPairFactory(ecc);

// Dogecoin network parameters
const dogecoinNetwork: bitcoin.Network = {
  messagePrefix: '\x19Dogecoin Signed Message:\n',
  bech32: 'doge',
  bip32: { public: 0x02facafd, private: 0x02fac398 },
  pubKeyHash: 0x1e,
  scriptHash: 0x16,
  wif: 0x9e,
};

export interface GameConfig {
  betAmountDOGE: number; // Amount in DOGE
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
  escrowBalanceKoinus: number;
}

export interface UTXO {
  txid: string;
  vout: number;
  value: number;
  scriptPubKey: string;
}

export class DogecoinGameEscrow {
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
    this.network = config.network === 'mainnet' ? dogecoinNetwork : {
      ...dogecoinNetwork,
      pubKeyHash: 0x71,
      scriptHash: 0xc4,
      wif: 0xf1,
    };
    this.utxoProvider = utxoProvider;
    this.broadcastProvider = broadcastProvider;
    
    this.gameState = {
      escrowWallet: { address: '', encryptedWIF: '' },
      player1Deposited: false,
      player2Deposited: false,
      gameStarted: false,
      winner: null,
      escrowBalanceKoinus: 0,
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
    // Generate new key pair - Much random! Very crypto!
    const keyPair = ECPair.makeRandom({ network: this.network });
    const wif = keyPair.toWIF();
    
    // Create P2PKH address (standard Dogecoin address)
    const { address } = bitcoin.payments.p2pkh({
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

    console.log(`🐕 Escrow wallet created: ${address}`);
    console.log(`💰 Players should deposit ${this.config.betAmountDOGE} DOGE each. Much bet! Wow!`);
    return this.gameState.escrowWallet;
  }

  async checkPlayerDeposit(playerAddress: string): Promise<boolean> {
    if (!this.utxoProvider) {
      console.warn('🐕 UTXO provider not configured. Cannot check deposits. Much sad!');
      return false;
    }

    const utxos = await this.utxoProvider(this.gameState.escrowWallet.address);
    const currentBalanceKoinus = utxos.reduce((sum, utxo) => sum + utxo.value, 0);
    this.gameState.escrowBalanceKoinus = currentBalanceKoinus;

    const expectedAmountKoinus = Math.floor(this.config.betAmountDOGE * 100000000);
    
    if (playerAddress === this.config.player1Address && currentBalanceKoinus >= expectedAmountKoinus) {
      this.gameState.player1Deposited = true;
      console.log(`✅ Player 1 deposit confirmed. Much deposit! Wow!`);
      return true;
    }
    
    if (playerAddress === this.config.player2Address && currentBalanceKoinus >= expectedAmountKoinus * 2) {
      this.gameState.player2Deposited = true;
      console.log(`✅ Player 2 deposit confirmed. Very crypto! Wow!`);
      return true;
    }
    
    return false;
  }

  async canStartGame(): Promise<boolean> {
    await this.checkPlayerDeposit(this.config.player1Address);
    await this.checkPlayerDeposit(this.config.player2Address);
    
    if (this.gameState.player1Deposited && this.gameState.player2Deposited) {
      this.gameState.gameStarted = true;
      console.log('🎮 Both players deposited! Game can start. Much play! Very compete! Wow!');
      return true;
    }
    return false;
  }

  async distributePot(winnerAddress: string): Promise<string> {
    if (!this.gameState.gameStarted) {
      throw new Error('Game has not started yet. Much premature! 😢');
    }

    if (!this.utxoProvider || !this.broadcastProvider) {
      throw new Error('UTXO and broadcast providers required for distribution');
    }

    // Validate winner address
    try {
      bitcoin.address.toOutputScript(winnerAddress, this.network);
    } catch {
      throw new Error('Invalid winner address. Much error!');
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
      throw new Error('No UTXOs available. Much empty! 😢');
    }

    // Build transaction
    const psbt = new bitcoin.Psbt({ network: this.network });

    // Add all UTXOs as inputs
    let totalInput = 0;
    for (const utxo of utxos) {
      psbt.addInput({
        hash: utxo.txid,
        index: utxo.vout,
        nonWitnessUtxo: Buffer.from(utxo.scriptPubKey, 'hex'),
      });
      totalInput += utxo.value;
    }

    // Calculate fee (Dogecoin typically 1 DOGE)
    const fee = 100000000; // 1 DOGE
    const sendAmount = totalInput - fee;

    if (sendAmount <= 0) {
      throw new Error('Insufficient balance after fees. Much poor! 😢');
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
    console.log(`🐕 Much pot distributed to winner: ${winnerAddress}`);
    console.log(`   Transaction: ${txid}. Very win! Wow!`);

    return txid;
  }

  getGameState(): GameState {
    return { ...this.gameState };
  }
}

export class DogecoinGameServer {
  private escrow: DogecoinGameEscrow;

  constructor(escrow: DogecoinGameEscrow) {
    this.escrow = escrow;
  }

  async initializeGame(): Promise<string> {
    const wallet = await this.escrow.createEscrowWallet();
    console.log('🐕 Game initialized! Much server! Wow!');
    return wallet.address;
  }

  async handleGameEnd(winnerAddress: string): Promise<void> {
    const txid = await this.escrow.distributePot(winnerAddress);
    console.log(`🎯 Game ended. Winner: ${winnerAddress}, TX: ${txid}. Much victory! Wow!`);
  }

  getGameState(): GameState {
    return this.escrow.getGameState();
  }
}

export default DogecoinGameEscrow;
