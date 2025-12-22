/**
 * Ethereum (ETH) Manual Escrow System for Gaming
 * Server-managed escrow with EIP-1559 support
 */

import { ethers } from 'ethers';
import * as crypto from 'crypto';

export interface GameConfig {
  betAmount: string;
  player1Address: string;
  player2Address: string;
  hostEncryptionKey: string;
  network: 'mainnet' | 'sepolia' | 'goerli';
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
  escrowBalance: string;
}

export class EthereumGameEscrow {
  private provider: ethers.JsonRpcProvider;
  private gameState: GameState;
  private config: GameConfig;
  private readonly ENCRYPTION_ALGORITHM = 'aes-256-gcm';

  constructor(config: GameConfig) {
    this.config = config;
    const rpcUrl = config.network === 'mainnet' 
      ? 'https://eth.llamarpc.com'
      : config.network === 'sepolia'
      ? 'https://rpc.sepolia.org'
      : 'https://rpc.ankr.com/eth_goerli';
    
    this.provider = new ethers.JsonRpcProvider(rpcUrl);
    
    this.gameState = {
      escrowWallet: { address: '', encryptedPrivateKey: '' },
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
    const wallet = ethers.Wallet.createRandom();
    
    const encryptedData = this.encrypt(wallet.privateKey, this.config.hostEncryptionKey);
    const encryptedPrivateKey = JSON.stringify(encryptedData);
    
    this.gameState.escrowWallet = {
      address: wallet.address,
      encryptedPrivateKey,
    };

    console.log(\`✅ Escrow wallet created: \${wallet.address}\`);
    console.log(\`💰 Players should deposit \${this.config.betAmount} ETH each\`);
    return this.gameState.escrowWallet;
  }

  async checkPlayerDeposit(playerAddress: string): Promise<boolean> {
    const balanceWei = await this.provider.getBalance(this.gameState.escrowWallet.address);
    const currentBalance = ethers.formatEther(balanceWei);
    this.gameState.escrowBalance = currentBalance;

    const expectedAmount = parseFloat(this.config.betAmount);
    const currentBalanceNum = parseFloat(currentBalance);
    
    if (playerAddress.toLowerCase() === this.config.player1Address.toLowerCase() && currentBalanceNum >= expectedAmount) {
      this.gameState.player1Deposited = true;
      console.log(\`✅ Player 1 deposit confirmed\`);
      return true;
    }
    
    if (playerAddress.toLowerCase() === this.config.player2Address.toLowerCase() && currentBalanceNum >= expectedAmount * 2) {
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

    if (!ethers.isAddress(winnerAddress)) {
      throw new Error('Invalid winner address');
    }

    const encryptedData = JSON.parse(this.gameState.escrowWallet.encryptedPrivateKey);
    const privateKey = this.decrypt(
      encryptedData.encrypted,
      this.config.hostEncryptionKey,
      encryptedData.iv,
      encryptedData.authTag
    );

    const wallet = new ethers.Wallet(privateKey, this.provider);
    
    const balanceWei = await this.provider.getBalance(wallet.address);
    
    if (balanceWei === 0n) {
      throw new Error('No balance in escrow wallet');
    }

    const feeData = await this.provider.getFeeData();
    const gasLimit = 21000n;
    const maxFeePerGas = feeData.maxFeePerGas || ethers.parseUnits('50', 'gwei');
    const gasCost = maxFeePerGas * gasLimit;
    
    const sendAmount = balanceWei - gasCost;
    
    if (sendAmount <= 0n) {
      throw new Error('Insufficient balance after gas fees');
    }

    const tx = {
      to: winnerAddress,
      value: sendAmount,
      gasLimit: gasLimit,
      maxFeePerGas: maxFeePerGas,
      maxPriorityFeePerGas: feeData.maxPriorityFeePerGas || ethers.parseUnits('2', 'gwei'),
    };
    
    const txResponse = await wallet.sendTransaction(tx);
    const receipt = await txResponse.wait();
    
    if (!receipt) {
      throw new Error('Transaction receipt is null');
    }

    this.gameState.winner = winnerAddress;
    console.log(\`✅ Pot distributed to winner: \${winnerAddress}\`);
    console.log(\`   Transaction: \${receipt.hash}\`);

    return receipt.hash;
  }

  getGameState(): GameState {
    return { ...this.gameState };
  }
}

export class EthereumGameServer {
  private escrow: EthereumGameEscrow;

  constructor(escrow: EthereumGameEscrow) {
    this.escrow = escrow;
  }

  async initializeGame(): Promise<string> {
    const wallet = await this.escrow.createEscrowWallet();
    return wallet.address;
  }

  async handleGameEnd(winnerAddress: string): Promise<void> {
    const txHash = await this.escrow.distributePot(winnerAddress);
    console.log(\`🎯 Game ended. Winner: \${winnerAddress}, TX: \${txHash}\`);
  }

  getGameState(): GameState {
    return this.escrow.getGameState();
  }
}

export default EthereumGameEscrow;
