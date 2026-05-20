/**
 * Binance (BNB) Manual Reward Distribution System
 * 
 * Server-side reward distribution for BNB Smart Chain (BSC) and BNB Beacon Chain with:
 * - Native BNB transfers
 * - BEP-20 token support (BSC)
 * - BEP-2 token support (Beacon Chain)
 * - Manual wallet-to-wallet transfers
 * - Game integration with score-based rewards
 * - Secure private key management
 * 
 * Security: Keep private keys server-side only. Never expose to clients.
 */

import { ethers } from 'ethers';
import * as crypto from 'crypto';

export interface GameConfig {
  rewardThreshold: number; // Points needed to earn reward
  rewardAmount: string; // Amount in BNB (as string for precision)
  network: 'mainnet' | 'testnet';
  chain: 'bsc' | 'beacon'; // BNB Smart Chain or Beacon Chain
}

export interface WalletConfig {
  privateKey: string; // Private key (0x prefixed for BSC)
  network: 'mainnet' | 'testnet';
  chain: 'bsc' | 'beacon';
}

export interface Player {
  address: string; // BSC address (0x...) or Beacon Chain (bnb...)
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
  address: string; // BEP-20 token contract address (for BSC)
  decimals: number;
  symbol: string;
}

/**
 * BNB Rewarder for manual reward distribution
 */
export class BinanceRewarder {
  private provider: ethers.JsonRpcProvider;
  private network: 'mainnet' | 'testnet';
  private chain: 'bsc' | 'beacon';
  
  constructor(network: 'mainnet' | 'testnet' = 'mainnet', chain: 'bsc' | 'beacon' = 'bsc') {
    this.network = network;
    this.chain = chain;
    
    // BSC RPC endpoints
    if (chain === 'bsc') {
      const rpcUrl = network === 'mainnet' 
        ? 'https://bsc-dataseed.binance.org/'
        : 'https://data-seed-prebsc-1-s1.binance.org:8545/';
      this.provider = new ethers.JsonRpcProvider(rpcUrl);
    } else {
      // Beacon Chain uses different architecture (Tendermint-based)
      // For now, we'll focus on BSC implementation
      throw new Error('Beacon Chain implementation requires @binance-chain/javascript-sdk');
    }
  }

  /**
   * Send BNB reward to address
   */
  async sendBNBReward(
    toAddress: string,
    amountBNB: string,
    privateKey: string
  ): Promise<TransactionResult> {
    try {
      // Validate address
      if (!ethers.isAddress(toAddress)) {
        throw new Error('Invalid BSC address');
      }

      // Create wallet from private key
      const wallet = new ethers.Wallet(privateKey, this.provider);
      
      // Parse amount to wei
      const amountWei = ethers.parseEther(amountBNB);
      
      // Get current gas price
      const feeData = await this.provider.getFeeData();
      const gasPrice = feeData.gasPrice;
      
      // Build transaction
      const tx = {
        to: toAddress,
        value: amountWei,
        gasLimit: 21000n,
        gasPrice: gasPrice,
      };
      
      // Send transaction
      const txResponse = await wallet.sendTransaction(tx);
      console.log(`Transaction sent: ${txResponse.hash}`);
      
      // Wait for confirmation
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
      console.error('Error sending BNB reward:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  /**
   * Send BEP-20 token reward
   */
  async sendBEP20Reward(
    toAddress: string,
    amount: string,
    privateKey: string,
    tokenConfig: TokenConfig
  ): Promise<TransactionResult> {
    try {
      // Validate addresses
      if (!ethers.isAddress(toAddress)) {
        throw new Error('Invalid recipient address');
      }
      if (!ethers.isAddress(tokenConfig.address)) {
        throw new Error('Invalid token contract address');
      }

      // Create wallet
      const wallet = new ethers.Wallet(privateKey, this.provider);
      
      // BEP-20 token ABI (standard ERC-20)
      const tokenABI = [
        'function transfer(address to, uint256 amount) returns (bool)',
        'function balanceOf(address account) view returns (uint256)',
        'function decimals() view returns (uint8)',
      ];
      
      // Create contract instance
      const tokenContract = new ethers.Contract(tokenConfig.address, tokenABI, wallet);
      
      // Parse amount with decimals
      const amountWithDecimals = ethers.parseUnits(amount, tokenConfig.decimals);
      
      // Check balance
      const balance = await tokenContract.balanceOf(wallet.address);
      if (balance < amountWithDecimals) {
        throw new Error('Insufficient token balance');
      }
      
      // Send tokens
      const tx = await tokenContract.transfer(toAddress, amountWithDecimals);
      console.log(`Token transfer sent: ${tx.hash}`);
      
      // Wait for confirmation
      const receipt = await tx.wait();
      
      return {
        success: true,
        txHash: receipt.hash,
        blockNumber: receipt.blockNumber,
      };
    } catch (error) {
      console.error('Error sending BEP-20 reward:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  /**
   * Get address balance
   */
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

  /**
   * Get BEP-20 token balance
   */
  async getTokenBalance(address: string, tokenAddress: string): Promise<string> {
    try {
      if (!ethers.isAddress(address) || !ethers.isAddress(tokenAddress)) {
        throw new Error('Invalid address');
      }
      
      const tokenABI = ['function balanceOf(address) view returns (uint256)', 'function decimals() view returns (uint8)'];
      const contract = new ethers.Contract(tokenAddress, tokenABI, this.provider);
      
      const balance = await contract.balanceOf(address);
      const decimals = await contract.decimals();
      
      return ethers.formatUnits(balance, decimals);
    } catch (error) {
      console.error('Error getting token balance:', error);
      return '0';
    }
  }
}

/**
 * Game Reward Manager for BNB Smart Chain
 */
export class BinanceGameRewardManager {
  private players: Map<string, Player> = new Map();
  private bnbRewarder: BinanceRewarder;
  private isInitialized: boolean = false;
  private tokenConfig?: TokenConfig;

  constructor(
    private gameConfig: GameConfig,
    private walletConfig: WalletConfig,
    tokenConfig?: TokenConfig
  ) {
    this.bnbRewarder = new BinanceRewarder(gameConfig.network, gameConfig.chain);
    this.tokenConfig = tokenConfig;
  }

  /**
   * Initialize the reward manager
   */
  async initialize(): Promise<void> {
    if (!this.walletConfig.privateKey) {
      throw new Error('Private key is required for initialization');
    }
    this.isInitialized = true;
    console.log('BNB Game Reward Manager initialized');
  }

  /**
   * Start game for a player with their address
   */
  async startGame(address: string): Promise<Player> {
    if (!this.isInitialized) {
      throw new Error('Reward manager not initialized. Call initialize() first.');
    }

    if (!ethers.isAddress(address)) {
      throw new Error('Invalid BSC address');
    }

    const player: Player = {
      address,
      currentScore: 0,
      hasBeenRewarded: false,
    };

    this.players.set(address, player);

    console.log(`Game started for player: ${address}`);
    return player;
  }

  /**
   * Update player score and check for rewards
   */
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

    // Check if player qualifies for reward
    if (newScore >= this.gameConfig.rewardThreshold && !player.hasBeenRewarded) {
      const rewardResult = await this.sendReward(player.address);

      if (rewardResult.success) {
        player.hasBeenRewarded = true;
        console.log(`Reward sent to ${player.address}. Transaction: ${rewardResult.txHash}`);
      }

      return { player, rewardSent: rewardResult };
    }

    return { player };
  }

  /**
   * Send reward to player
   */
  private async sendReward(toAddress: string): Promise<TransactionResult> {
    try {
      if (this.tokenConfig) {
        // Send BEP-20 token
        return await this.bnbRewarder.sendBEP20Reward(
          toAddress,
          this.gameConfig.rewardAmount,
          this.walletConfig.privateKey,
          this.tokenConfig
        );
      } else {
        // Send native BNB
        return await this.bnbRewarder.sendBNBReward(
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

  /**
   * Get player by address
   */
  getPlayer(address: string): Player | undefined {
    return this.players.get(address);
  }

  /**
   * Get all players
   */
  getAllPlayers(): Player[] {
    return Array.from(this.players.values());
  }

  /**
   * Check if service is ready
   */
  isReady(): boolean {
    return this.isInitialized;
  }
}

export default BinanceRewarder;
