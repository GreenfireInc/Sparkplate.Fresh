/**
 * Litecoin (LTC) Manual Escrow System for Gaming
 * Server-managed escrow with encrypted key storage
 */

import * as bitcoin from 'bitcoinjs-lib';
import * as crypto from 'crypto';
import axios from 'axios';

export interface GameConfig {
  betAmount: number;
  player1Address: string;
  player2Address: string;
  hostEncryptionKey: string;
  network: 'mainnet' | 'testnet';
}

export interface EscrowWallet {
  address: string;
  encryptedPrivateKey: string;
}

export interface GameState {
  escrowWallet: EscrowWallet;
  player1Deposited: boolean;
  player2Deposited: boolean;
  gameStarted: boolean;
  winner: string | null;
  escrowBalance: number;
}

export interface UTXO {
  txid: string;
  vout: number;
  value: number;
  confirmations: number;
}

export class LitecoinGameEscrow {
  private network: bitcoin.Network;
  private gameState: GameState;
  private config: GameConfig;
  private readonly ENCRYPTION_ALGORITHM = 'aes-256-gcm';

  constructor(config: GameConfig) {
    this.config = config;
    this.network = this.getLitecoinNetwork(config.network);
    
    this.gameState = {
      escrowWallet: { address: '', encryptedPrivateKey: '' },
      player1Deposited: false,
      player2Deposited: false,
      gameStarted: false,
      winner: null,
      escrowBalance: 0,
    };
  }

  private getLitecoinNetwork(networkType: 'mainnet' | 'testnet'): bitcoin.Network {
    return networkType === 'mainnet'
      ? {
          messagePrefix: '\x19Litecoin Signed Message:\n',
          bech32: 'ltc',
          bip32: {
            public: 0x019da462,
            private: 0x019d9cfe,
          },
          pubKeyHash: 0x30,
          scriptHash: 0x32,
          wif: 0xb0,
        }
      : bitcoin.networks.testnet;
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
    const keyPair = bitcoin.ECPair.makeRandom({ network: this.network });
    const { address } = bitcoin.payments.p2pkh({
      pubkey: keyPair.publicKey,
      network: this.network,
    });

    if (!address) {
      throw new Error('Failed to create escrow wallet address');
    }

    const privateKeyWIF = keyPair.toWIF();
    const encryptedData = this.encrypt(privateKeyWIF, this.config.hostEncryptionKey);
    const encryptedPrivateKey = JSON.stringify(encryptedData);

    this.gameState.escrowWallet = {
      address,
      encryptedPrivateKey,
    };

    console.log(`✅ Escrow wallet created: ${address}`);
    console.log(`💰 Players should deposit ${this.config.betAmount} LTC each`);

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

    const encryptedData = JSON.parse(this.gameState.escrowWallet.encryptedPrivateKey);
    const privateKeyWIF = this.decrypt(
      encryptedData.encrypted,
      this.config.hostEncryptionKey,
      encryptedData.iv,
      encryptedData.authTag
    );

    const keyPair = bitcoin.ECPair.fromWIF(privateKeyWIF, this.network);
    const { address: escrowAddress } = bitcoin.payments.p2pkh({
      pubkey: keyPair.publicKey,
      network: this.network,
    });

    if (!escrowAddress) {
      throw new Error('Failed to derive escrow address');
    }

    const utxos = await this.getUTXOs(escrowAddress);

    if (utxos.length === 0) {
      throw new Error('No UTXOs available in escrow wallet');
    }

    const psbt = new bitcoin.Psbt({ network: this.network });

    let totalInput = 0;
    for (const utxo of utxos) {
      const tx = await this.getRawTransaction(utxo.txid);
      psbt.addInput({
        hash: utxo.txid,
        index: utxo.vout,
        nonWitnessUtxo: Buffer.from(tx, 'hex'),
      });
      totalInput += utxo.value;
    }

    const fee = 10000;
    const sendAmount = totalInput - fee;

    if (sendAmount <= 0) {
      throw new Error('Insufficient balance after fees');
    }

    psbt.addOutput({
      address: winnerAddress,
      value: sendAmount,
    });

    psbt.signAllInputs(keyPair);
    psbt.finalizeAllInputs();

    const txHex = psbt.extractTransaction().toHex();
    const txHash = await this.broadcastTransaction(txHex);

    this.gameState.winner = winnerAddress;
    console.log(`✅ Pot distributed to winner: ${winnerAddress}`);
    console.log(`   Transaction: ${txHash}`);

    return txHash;
  }

  private isValidAddress(address: string): boolean {
    const ltcMainnetRegex = /^[LM3][a-km-zA-HJ-NP-Z1-9]{26,33}$/;
    const ltcTestnetRegex = /^[mn2t][a-km-zA-HJ-NP-Z1-9]{26,33}$/;
    
    return this.config.network === 'mainnet'
      ? ltcMainnetRegex.test(address)
      : ltcTestnetRegex.test(address);
  }

  private async getWalletBalance(address: string): Promise<number> {
    try {
      const response = await axios.get(
        `https://api.blockchair.com/litecoin/dashboards/address/${address}`
      );
      const balanceSatoshis = response.data.data[address].address.balance;
      return balanceSatoshis / 1e8;
    } catch (error) {
      console.error('Failed to fetch balance:', error);
      return 0;
    }
  }

  private async getUTXOs(address: string): Promise<UTXO[]> {
    try {
      const response = await axios.get(
        `https://api.blockchair.com/litecoin/dashboards/address/${address}`
      );

      const utxos: UTXO[] = [];
      const outputs = response.data.data[address].utxo || [];

      for (const output of outputs) {
        utxos.push({
          txid: output.transaction_hash,
          vout: output.index,
          value: output.value,
          confirmations: output.confirmations || 0,
        });
      }

      return utxos;
    } catch (error) {
      console.error('Failed to fetch UTXOs:', error);
      return [];
    }
  }

  private async getRawTransaction(txid: string): Promise<string> {
    try {
      const response = await axios.get(
        `https://api.blockchair.com/litecoin/raw/transaction/${txid}`
      );
      return response.data.data[txid].raw_transaction;
    } catch (error) {
      throw new Error(`Failed to fetch raw transaction: ${txid}`);
    }
  }

  private async broadcastTransaction(txHex: string): Promise<string> {
    try {
      const response = await axios.post(
        'https://api.blockchair.com/litecoin/push/transaction',
        { data: txHex }
      );
      return response.data.data.transaction_hash;
    } catch (error) {
      throw new Error(`Failed to broadcast transaction: ${error}`);
    }
  }

  getGameState(): GameState {
    return { ...this.gameState };
  }
}

export class GameServer {
  private escrow: LitecoinGameEscrow;

  constructor(escrow: LitecoinGameEscrow) {
    this.escrow = escrow;
  }

  async initializeGame(): Promise<string> {
    const wallet = await this.escrow.createEscrowWallet();
    return wallet.address;
  }

  async handleGameEnd(winnerAddress: string): Promise<void> {
    const txHash = await this.escrow.distributePot(winnerAddress);
    console.log(`🎯 Game ended. Winner: ${winnerAddress}, TX: ${txHash}`);
  }

  getGameState(): GameState {
    return this.escrow.getGameState();
  }
}

export default LitecoinGameEscrow;
