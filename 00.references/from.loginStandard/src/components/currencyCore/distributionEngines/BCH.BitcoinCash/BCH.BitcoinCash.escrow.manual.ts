/**
 * Bitcoin Cash (BCH) Manual Escrow System for Gaming
 * Server-managed escrow for peer-to-peer gaming with WebRTC/Colyseus
 */

import * as bch from '@psf/bch-js';
import * as crypto from 'crypto';

export interface GameConfig {
  betAmount: number; // Amount in BCH
  player1Address: string;
  player2Address: string;
  hostEncryptionKey: string;
  network: 'mainnet' | 'testnet';
}

export interface EscrowWallet {
  address: string;
  cashAddress: string;
  encryptedWIF: string;
}

export interface GameState {
  escrowWallet: EscrowWallet;
  player1Deposited: boolean;
  player2Deposited: boolean;
  gameStarted: boolean;
  winner: string | null;
  escrowBalance: number;
}

export class BitcoinCashGameEscrow {
  private bchjs: typeof bch;
  private gameState: GameState;
  private config: GameConfig;
  private readonly ENCRYPTION_ALGORITHM = 'aes-256-gcm';

  constructor(config: GameConfig) {
    this.config = config;
    this.bchjs = new bch({
      restURL: config.network === 'mainnet' 
        ? 'https://bchn.fullstack.cash/v5/'
        : 'https://testnet3.fullstack.cash/v5/'
    });
    
    this.gameState = {
      escrowWallet: { address: '', cashAddress: '', encryptedWIF: '' },
      player1Deposited: false,
      player2Deposited: false,
      gameStarted: false,
      winner: null,
      escrowBalance: 0,
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
    const ecPair = this.bchjs.ECPair.makeRandom();
    const wif = this.bchjs.ECPair.toWIF(ecPair);
    const cashAddress = this.bchjs.ECPair.toCashAddress(ecPair);
    
    // Encrypt WIF
    const encryptedData = this.encrypt(wif, this.config.hostEncryptionKey);
    const encryptedWIF = JSON.stringify(encryptedData);
    
    this.gameState.escrowWallet = {
      address: this.bchjs.Address.toLegacyAddress(cashAddress),
      cashAddress,
      encryptedWIF,
    };

    console.log(`✅ Escrow wallet created: ${cashAddress}`);
    console.log(`💰 Players should deposit ${this.config.betAmount} BCH each`);
    return this.gameState.escrowWallet;
  }

  async checkPlayerDeposit(playerAddress: string): Promise<boolean> {
    const balance = await this.bchjs.Electrumx.balance(this.gameState.escrowWallet.cashAddress);
    const currentBalance = balance.balance.confirmed / 100000000;
    this.gameState.escrowBalance = currentBalance;

    const expectedAmount = this.config.betAmount;
    
    if (playerAddress === this.config.player1Address && currentBalance >= expectedAmount) {
      this.gameState.player1Deposited = true;
      console.log(`✅ Player 1 deposit confirmed`);
      return true;
    }
    
    if (playerAddress === this.config.player2Address && currentBalance >= expectedAmount * 2) {
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

    // Decrypt WIF
    const encryptedData = JSON.parse(this.gameState.escrowWallet.encryptedWIF);
    const wif = this.decrypt(
      encryptedData.encrypted,
      this.config.hostEncryptionKey,
      encryptedData.iv,
      encryptedData.authTag
    );

    // Send entire balance to winner
    const ecPair = this.bchjs.ECPair.fromWIF(wif);
    const fromAddress = this.bchjs.ECPair.toCashAddress(ecPair);
    
    // Get UTXOs
    const utxos = await this.bchjs.Electrumx.utxo(fromAddress);
    if (!utxos.utxos || utxos.utxos.length === 0) {
      throw new Error('No UTXOs available');
    }

    // Build transaction
    const transactionBuilder = new this.bchjs.TransactionBuilder(
      this.config.network === 'testnet' ? 'testnet' : undefined
    );

    let totalInput = 0;
    for (const utxo of utxos.utxos) {
      transactionBuilder.addInput(utxo.tx_hash, utxo.tx_pos);
      totalInput += utxo.value;
    }

    const fee = 250;
    const sendAmount = totalInput - fee;
    
    transactionBuilder.addOutput(winnerAddress, sendAmount);

    // Sign
    utxos.utxos.forEach((utxo, index) => {
      transactionBuilder.sign(
        index,
        ecPair,
        undefined,
        transactionBuilder.hashTypes.SIGHASH_ALL,
        utxo.value
      );
    });

    const tx = transactionBuilder.build();
    const txid = await this.bchjs.RawTransactions.sendRawTransaction(tx.toHex());

    this.gameState.winner = winnerAddress;
    console.log(`✅ Pot distributed to winner: ${winnerAddress}`);
    console.log(`   Transaction: ${txid}`);

    return txid;
  }

  getGameState(): GameState {
    return { ...this.gameState };
  }
}

export class BitcoinCashGameServer {
  private escrow: BitcoinCashGameEscrow;

  constructor(escrow: BitcoinCashGameEscrow) {
    this.escrow = escrow;
  }

  async initializeGame(): Promise<string> {
    const wallet = await this.escrow.createEscrowWallet();
    return wallet.cashAddress;
  }

  async handleGameEnd(winnerAddress: string): Promise<void> {
    const txid = await this.escrow.distributePot(winnerAddress);
    console.log(`🎯 Game ended. Winner: ${winnerAddress}, TX: ${txid}`);
  }

  getGameState(): GameState {
    return this.escrow.getGameState();
  }
}

export default BitcoinCashGameEscrow;
