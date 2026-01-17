/**
 * Terra (LUNA) Manual Escrow System for Gaming
 * Server-managed escrow with encrypted mnemonic storage
 */

import {
  LCDClient,
  MnemonicKey,
  MsgSend,
  Coin,
  Wallet,
} from '@terra-money/feather.js';
import * as crypto from 'crypto';

export interface GameConfig {
  betAmount: string;
  player1Address: string;
  player2Address: string;
  hostEncryptionKey: string;
  network: 'mainnet' | 'testnet';
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
  escrowBalance: string;
}

export class TerraGameEscrow {
  private lcd: LCDClient;
  private chainID: string;
  private gameState: GameState;
  private config: GameConfig;
  private readonly ENCRYPTION_ALGORITHM = 'aes-256-gcm';

  constructor(config: GameConfig) {
    this.config = config;
    this.chainID = config.network === 'mainnet' ? 'phoenix-1' : 'pisco-1';
    const lcdUrl = config.network === 'mainnet'
      ? 'https://phoenix-lcd.terra.dev'
      : 'https://pisco-lcd.terra.dev';

    this.lcd = new LCDClient({
      [this.chainID]: {
        lcd: lcdUrl,
        chainID: this.chainID,
        gasAdjustment: 1.4,
        gasPrices: { uluna: '0.015' },
        prefix: 'terra',
      },
    });

    this.gameState = {
      escrowWallet: { address: '', encryptedMnemonic: '' },
      player1Deposited: false,
      player2Deposited: false,
      gameStarted: false,
      winner: null,
      escrowBalance: '0',
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
    const mnemonic = this.generateSecureMnemonic();
    const mk = new MnemonicKey({ mnemonic });
    const address = mk.accAddress;

    const encryptedData = this.encrypt(mnemonic, this.config.hostEncryptionKey);
    const encryptedMnemonic = JSON.stringify(encryptedData);

    this.gameState.escrowWallet = {
      address,
      encryptedMnemonic,
    };

    console.log(`✅ Escrow wallet created: ${address}`);
    console.log(`💰 Players should deposit ${this.config.betAmount} LUNA each`);

    return this.gameState.escrowWallet;
  }

  private generateSecureMnemonic(): string {
    const entropy = crypto.randomBytes(32);
    const words: string[] = [];

    for (let i = 0; i < 24; i++) {
      const randomBytes = crypto.randomBytes(2);
      const index = randomBytes.readUInt16BE(0) % 2048;
      words.push(`word${index}`);
    }

    return words.join(' ');
  }

  async checkPlayerDeposit(playerAddress: string): Promise<boolean> {
    const balance = await this.getWalletBalance(this.gameState.escrowWallet.address);
    this.gameState.escrowBalance = balance;

    const expectedAmount = parseFloat(this.config.betAmount);
    const currentBalance = parseFloat(balance);

    if (
      playerAddress.toLowerCase() === this.config.player1Address.toLowerCase() &&
      currentBalance >= expectedAmount
    ) {
      this.gameState.player1Deposited = true;
      console.log(`✅ Player 1 deposit confirmed`);
      return true;
    }

    if (
      playerAddress.toLowerCase() === this.config.player2Address.toLowerCase() &&
      currentBalance >= expectedAmount * 2
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

    const encryptedData = JSON.parse(this.gameState.escrowWallet.encryptedMnemonic);
    const mnemonic = this.decrypt(
      encryptedData.encrypted,
      this.config.hostEncryptionKey,
      encryptedData.iv,
      encryptedData.authTag
    );

    const mk = new MnemonicKey({ mnemonic });
    const wallet = this.lcd.wallet(mk);
    const escrowAddress = wallet.key.accAddress(this.chainID);

    const [balance] = await this.lcd.bank.balance(escrowAddress, {
      [this.chainID]: {},
    });

    const lunaBalance = balance[this.chainID].get('uluna');

    if (!lunaBalance || lunaBalance.amount.equals(0)) {
      throw new Error('No balance in escrow wallet');
    }

    const feeEstimate = 100000;
    const sendAmount = lunaBalance.amount.sub(feeEstimate);

    if (sendAmount.lte(0)) {
      throw new Error('Insufficient balance after fees');
    }

    const send = new MsgSend(
      escrowAddress,
      winnerAddress,
      [new Coin('uluna', sendAmount.toString())]
    );

    const tx = await wallet.createAndSignTx({
      chainID: this.chainID,
      msgs: [send],
      memo: 'Game pot distribution',
    });

    const result = await this.lcd.tx.broadcast(tx, this.chainID);

    await this.lcd.tx.txInfo(result.txhash, this.chainID);

    this.gameState.winner = winnerAddress;
    console.log(`✅ Pot distributed to winner: ${winnerAddress}`);
    console.log(`   Transaction: ${result.txhash}`);

    return result.txhash;
  }

  private isValidAddress(address: string): boolean {
    const terraRegex = /^terra1[a-z0-9]{38}$/;
    return terraRegex.test(address);
  }

  private async getWalletBalance(address: string): Promise<string> {
    try {
      const [balance] = await this.lcd.bank.balance(address, {
        [this.chainID]: {},
      });

      const lunaBalance = balance[this.chainID].get('uluna');

      if (!lunaBalance) {
        return '0';
      }

      const luna = parseFloat(lunaBalance.amount.toString()) / 1_000_000;
      return luna.toFixed(6);
    } catch (error) {
      console.error('Failed to fetch balance:', error);
      return '0';
    }
  }

  getGameState(): GameState {
    return { ...this.gameState };
  }
}

export class TerraGameServer {
  private escrow: TerraGameEscrow;

  constructor(escrow: TerraGameEscrow) {
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

export default TerraGameEscrow;
