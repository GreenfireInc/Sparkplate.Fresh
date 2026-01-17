/**
 * Ethereum (ETH) Manual Reward Distribution System
 * 
 * Server-side reward distribution for Ethereum with:
 * - Native ETH transfers
 * - ERC-20 token support
 * - Proof-of-Stake consensus
 * - Manual wallet-to-wallet transfers
 * - Game integration with score-based rewards
 * - Secure private key management
 */

import { ethers } from 'ethers';

export interface GameConfig {
  rewardThreshold: number;
  rewardAmount: string;
  network: 'mainnet' | 'sepolia' | 'goerli';
}

export interface WalletConfig {
  privateKey: string;
  network: 'mainnet' | 'sepolia' | 'goerli';
}

export interface Player {
  address: string;
  currentScore: number;
  hasBeenRewarded: boolean;
}

export interface TransactionResult {
  success: boolean;
  txHash?: string;
  error?: string;
  blockNumber?: number;
}

export interface TokenConfig {
  address: string;
  decimals: number;
  symbol: string;
}

export class EthereumRewarder {
  private provider: ethers.JsonRpcProvider;
  private network: 'mainnet' | 'sepolia' | 'goerli';
  
  constructor(network: 'mainnet' | 'sepolia' | 'goerli' = 'mainnet') {
    this.network = network;
    
    const rpcUrl = network === 'mainnet' 
      ? 'https://eth.llamarpc.com'
      : network === 'sepolia'
      ? 'https://rpc.sepolia.org'
      : 'https://rpc.ankr.com/eth_goerli';
    
    this.provider = new ethers.JsonRpcProvider(rpcUrl);
  }

  async sendETHReward(
    toAddress: string,
    amountETH: string,
    privateKey: string
  ): Promise<TransactionResult> {
    try {
      if (!ethers.isAddress(toAddress)) {
        throw new Error('Invalid ETH address');
      }

      const wallet = new ethers.Wallet(privateKey, this.provider);
      const amountWei = ethers.parseEther(amountETH);
      const feeData = await this.provider.getFeeData();
      
      const tx = {
        to: toAddress,
        value: amountWei,
        gasLimit: 21000n,
        maxFeePerGas: feeData.maxFeePerGas,
        maxPriorityFeePerGas: feeData.maxPriorityFeePerGas,
      };
      
      const txResponse = await wallet.sendTransaction(tx);
      const receipt = await txResponse.wait();
      
      if (!receipt) {
        throw new Error('Transaction receipt is null');
      }
      
      return {
        success: true,
        txHash: receipt.hash,
        blockNumber: receipt.blockNumber,
      };
    } catch (error) {
      console.error('Error sending ETH reward:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  async sendERC20Reward(
    toAddress: string,
    amount: string,
    privateKey: string,
    tokenConfig: TokenConfig
  ): Promise<TransactionResult> {
    try {
      if (!ethers.isAddress(toAddress)) {
        throw new Error('Invalid recipient address');
      }
      if (!ethers.isAddress(tokenConfig.address)) {
        throw new Error('Invalid token contract address');
      }

      const wallet = new ethers.Wallet(privateKey, this.provider);
      const tokenABI = [
        'function transfer(address to, uint256 amount) returns (bool)',
        'function balanceOf(address account) view returns (uint256)',
      ];
      
      const tokenContract = new ethers.Contract(tokenConfig.address, tokenABI, wallet);
      const amountWithDecimals = ethers.parseUnits(amount, tokenConfig.decimals);
      
      const balance = await tokenContract.balanceOf(wallet.address);
      if (balance < amountWithDecimals) {
        throw new Error('Insufficient token balance');
      }
      
      const tx = await tokenContract.transfer(toAddress, amountWithDecimals);
      const receipt = await tx.wait();
      
      return {
        success: true,
        txHash: receipt.hash,
        blockNumber: receipt.blockNumber,
      };
    } catch (error) {
      console.error('Error sending ERC-20 reward:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  async getBalance(address: string): Promise<string> {
    try {
      if (!ethers.isAddress(address)) {
        throw new Error('Invalid address');
      }
      const balanceWei = await this.provider.getBalance(address);
      return ethers.formatEther(balanceWei);
    } catch (error) {
      console.error('Error getting balance:', error);
      return '0';
    }
  }
}

export class EthereumGameRewardManager {
  private players: Map<string, Player> = new Map();
  private ethRewarder: EthereumRewarder;
  private isInitialized: boolean = false;
  private tokenConfig?: TokenConfig;

  constructor(
    private gameConfig: GameConfig,
    private walletConfig: WalletConfig,
    tokenConfig?: TokenConfig
  ) {
    this.ethRewarder = new EthereumRewarder(gameConfig.network);
    this.tokenConfig = tokenConfig;
  }

  async initialize(): Promise<void> {
    if (!this.walletConfig.privateKey) {
      throw new Error('Private key is required for initialization');
    }
    this.isInitialized = true;
    console.log('Ethereum Game Reward Manager initialized');
  }

  async startGame(address: string): Promise<Player> {
    if (!this.isInitialized) {
      throw new Error('Reward manager not initialized. Call initialize() first.');
    }

    if (!ethers.isAddress(address)) {
      throw new Error('Invalid Ethereum address');
    }

    const player: Player = {
      address,
      currentScore: 0,
      hasBeenRewarded: false,
    };

    this.players.set(address, player);
    console.log(\`Game started for player: \${address}\`);
    return player;
  }

  async updateScore(
    address: string,
    newScore: number
  ): Promise<{ player: Player; rewardSent?: TransactionResult }> {
    if (!this.isInitialized) {
      throw new Error('Reward manager not initialized. Call initialize() first.');
    }

    const player = this.players.get(address);

    if (!player) {
      throw new Error('Player not found. Please start game first.');
    }

    player.currentScore = newScore;

    if (newScore >= this.gameConfig.rewardThreshold && !player.hasBeenRewarded) {
      const rewardResult = await this.sendReward(player.address);

      if (rewardResult.success) {
        player.hasBeenRewarded = true;
        console.log(\`Reward sent to \${player.address}. Transaction: \${rewardResult.txHash}\`);
      }

      return { player, rewardSent: rewardResult };
    }

    return { player };
  }

  private async sendReward(toAddress: string): Promise<TransactionResult> {
    try {
      if (this.tokenConfig) {
        return await this.ethRewarder.sendERC20Reward(
          toAddress,
          this.gameConfig.rewardAmount,
          this.walletConfig.privateKey,
          this.tokenConfig
        );
      } else {
        return await this.ethRewarder.sendETHReward(
          toAddress,
          this.gameConfig.rewardAmount,
          this.walletConfig.privateKey
        );
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  getPlayer(address: string): Player | undefined {
    return this.players.get(address);
  }

  getAllPlayers(): Player[] {
    return Array.from(this.players.values());
  }

  isReady(): boolean {
    return this.isInitialized;
  }
}

export default EthereumRewarder;
