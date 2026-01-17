/**
 * Ethereum Classic (ETC) Manual Reward Distribution System
 * 
 * Server-side reward distribution for Ethereum Classic with:
 * - Native ETC transfers
 * - EVM-compatible (original Ethereum)
 * - Manual wallet-to-wallet transfers
 * - Game integration with score-based rewards
 * - Secure private key management
 * - "Code is Law" philosophy
 * 
 * Security: Keep private keys server-side only. Never expose to clients.
 */

import { ethers } from 'ethers';

export interface GameConfig {
  rewardThreshold: number;
  rewardAmount: string; // Amount in ETC (as string for precision)
  network: 'mainnet' | 'mordor';
}

export interface WalletConfig {
  privateKey: string; // Private key (0x prefixed)
  network: 'mainnet' | 'mordor';
}

export interface Player {
  address: string; // ETC address (0x...)
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
  address: string; // ERC-20 token contract address
  decimals: number;
  symbol: string;
}

/**
 * Ethereum Classic Rewarder for manual reward distribution
 */
export class EthereumClassicRewarder {
  private provider: ethers.JsonRpcProvider;
  private network: 'mainnet' | 'mordor';
  
  constructor(network: 'mainnet' | 'mordor' = 'mainnet') {
    this.network = network;
    
    // ETC RPC endpoints
    const rpcUrl = network === 'mainnet' 
      ? 'https://etc.rivet.link'
      : 'https://rpc.mordor.etccooperative.org';
    
    this.provider = new ethers.JsonRpcProvider(rpcUrl);
  }

  /**
   * Send ETC reward to address
   */
  async sendETCReward(
    toAddress: string,
    amountETC: string,
    privateKey: string
  ): Promise<TransactionResult> {
    try {
      // Validate address
      if (!ethers.isAddress(toAddress)) {
        throw new Error('Invalid ETC address');
      }

      // Create wallet from private key
      const wallet = new ethers.Wallet(privateKey, this.provider);
      
      // Parse amount to wei
      const amountWei = ethers.parseEther(amountETC);
      
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
      console.log(\`Transaction sent: \${txResponse.hash}\`);
      
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
      console.error('Error sending ETC reward:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  /**
   * Send ERC-20 token reward
   */
  async sendERC20Reward(
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
      
      // ERC-20 token ABI
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
      console.log(\`Token transfer sent: \${tx.hash}\`);
      
      // Wait for confirmation
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
   * Get ERC-20 token balance
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
 * Game Reward Manager for Ethereum Classic
 */
export class EthereumClassicGameRewardManager {
  private players: Map<string, Player> = new Map();
  private etcRewarder: EthereumClassicRewarder;
  private isInitialized: boolean = false;
  private tokenConfig?: TokenConfig;

  constructor(
    private gameConfig: GameConfig,
    private walletConfig: WalletConfig,
    tokenConfig?: TokenConfig
  ) {
    this.etcRewarder = new EthereumClassicRewarder(gameConfig.network);
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
    console.log('ETC Game Reward Manager initialized - Code is Law!');
  }

  /**
   * Start game for a player with their address
   */
  async startGame(address: string): Promise<Player> {
    if (!this.isInitialized) {
      throw new Error('Reward manager not initialized. Call initialize() first.');
    }

    if (!ethers.isAddress(address)) {
      throw new Error('Invalid ETC address');
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
        console.log(\`Reward sent to \${player.address}. Transaction: \${rewardResult.txHash}\`);
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
        // Send ERC-20 token
        return await this.etcRewarder.sendERC20Reward(
          toAddress,
          this.gameConfig.rewardAmount,
          this.walletConfig.privateKey,
          this.tokenConfig
        );
      } else {
        // Send native ETC
        return await this.etcRewarder.sendETCReward(
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

export default EthereumClassicRewarder;
