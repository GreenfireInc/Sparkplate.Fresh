/**
 * SolanaFM API for Solana (SOL)
 * 
 * Next-generation block explorer with real-time insights
 * 
 * Features:
 * - Free Tier: 10 RPS (requests per second), 1 GB bandwidth
 * - Real-time transaction insights
 * - Network statistics
 * - Wallet tracking
 * - Token analytics
 * - Program data
 * - Endpoint-specific rate caps
 * 
 * Documentation: https://docs.solana.fm/
 * Website: https://solana.fm/
 */

import axios, { AxiosInstance } from 'axios';

// API Configuration
export interface SolanaFMConfig {
  baseURL?: string;
  apiKey?: string;
  timeout?: number;
  retries?: number;
  network?: 'mainnet' | 'devnet' | 'testnet';
}

// Account Information
export interface SolanaFMAccountInfo {
  address: string;
  lamports: number;
  owner: string;
  executable: boolean;
  rentEpoch: number;
  data?: {
    parsed?: unknown;
    program?: string;
    space?: number;
  };
}

// Transaction
export interface SolanaFMTransaction {
  signature: string;
  slot: number;
  blockTime: number;
  fee: number;
  status: 'success' | 'failed';
  confirmationStatus: 'processed' | 'confirmed' | 'finalized';
  accounts: string[];
  instructions: Array<{
    programId: string;
    accounts: string[];
    data: string;
  }>;
  logs?: string[];
  err?: unknown;
}

// Token Information
export interface SolanaFMToken {
  mint: string;
  name: string;
  symbol: string;
  decimals: number;
  supply: string;
  holder_count: number;
  price?: {
    usd: number;
    change_24h: number;
  };
  metadata?: {
    image?: string;
    description?: string;
    creator?: string;
  };
}

// Token Balance
export interface SolanaFMTokenBalance {
  mint: string;
  owner: string;
  amount: string;
  decimals: number;
  uiAmount: number;
}

// Block Information
export interface SolanaFMBlock {
  slot: number;
  blockhash: string;
  previousBlockhash: string;
  parentSlot: number;
  blockTime: number;
  blockHeight: number;
  transactions: number;
  rewards?: Array<{
    pubkey: string;
    lamports: number;
    rewardType: string;
  }>;
}

// Network Statistics
export interface SolanaFMNetworkStats {
  slot: number;
  epoch: number;
  blockHeight: number;
  absoluteSlot: number;
  transactionCount: number;
  tps: number;
  avgBlockTime: number;
  validators: number;
}

export class SolanaFMAPI {
  private client: AxiosInstance;
  private config: Required<Omit<SolanaFMConfig, 'apiKey'>> & { apiKey?: string };

  constructor(config: SolanaFMConfig = {}) {
    this.config = {
      baseURL: config.baseURL || 'https://api.solana.fm/v1',
      apiKey: config.apiKey,
      timeout: config.timeout || 30000,
      retries: config.retries || 3,
      network: config.network || 'mainnet',
    };

    this.client = axios.create({
      baseURL: this.config.baseURL,
      timeout: this.config.timeout,
      headers: {
        'Content-Type': 'application/json',
        ...(this.config.apiKey && { 'x-api-key': this.config.apiKey }),
      },
    });
  }

  /**
   * Get account information
   */
  async getAccountInfo(address: string): Promise<SolanaFMAccountInfo> {
    const response = await this.client.get(`/accounts/${address}`, {
      params: { network: this.config.network },
    });
    return response.data;
  }

  /**
   * Get account balance
   */
  async getBalance(address: string): Promise<number> {
    const accountInfo = await this.getAccountInfo(address);
    return accountInfo.lamports;
  }

  /**
   * Get transaction by signature
   */
  async getTransaction(signature: string): Promise<SolanaFMTransaction> {
    const response = await this.client.get(`/transactions/${signature}`, {
      params: { network: this.config.network },
    });
    return response.data;
  }

  /**
   * Get transaction history for an address
   */
  async getTransactionHistory(
    address: string,
    limit: number = 50,
    before?: string
  ): Promise<SolanaFMTransaction[]> {
    const response = await this.client.get(`/accounts/${address}/transactions`, {
      params: {
        network: this.config.network,
        limit,
        before,
      },
    });
    return response.data.transactions || [];
  }

  /**
   * Get token information
   */
  async getTokenInfo(mint: string): Promise<SolanaFMToken> {
    const response = await this.client.get(`/tokens/${mint}`, {
      params: { network: this.config.network },
    });
    return response.data;
  }

  /**
   * Get token balances for an address
   */
  async getTokenBalances(address: string): Promise<SolanaFMTokenBalance[]> {
    const response = await this.client.get(`/accounts/${address}/tokens`, {
      params: { network: this.config.network },
    });
    return response.data.tokens || [];
  }

  /**
   * Get token holders
   */
  async getTokenHolders(mint: string, limit: number = 100): Promise<unknown[]> {
    const response = await this.client.get(`/tokens/${mint}/holders`, {
      params: {
        network: this.config.network,
        limit,
      },
    });
    return response.data.holders || [];
  }

  /**
   * Get block information
   */
  async getBlock(slot: number): Promise<SolanaFMBlock> {
    const response = await this.client.get(`/blocks/${slot}`, {
      params: { network: this.config.network },
    });
    return response.data;
  }

  /**
   * Get latest block
   */
  async getLatestBlock(): Promise<SolanaFMBlock> {
    const response = await this.client.get('/blocks/latest', {
      params: { network: this.config.network },
    });
    return response.data;
  }

  /**
   * Get network statistics
   */
  async getNetworkStats(): Promise<SolanaFMNetworkStats> {
    const response = await this.client.get('/network/stats', {
      params: { network: this.config.network },
    });
    return response.data;
  }

  /**
   * Search transactions
   */
  async searchTransactions(query: string, limit: number = 50): Promise<SolanaFMTransaction[]> {
    const response = await this.client.get('/search/transactions', {
      params: {
        network: this.config.network,
        q: query,
        limit,
      },
    });
    return response.data.transactions || [];
  }

  /**
   * Get program accounts
   */
  async getProgramAccounts(programId: string, limit: number = 100): Promise<unknown[]> {
    const response = await this.client.get(`/programs/${programId}/accounts`, {
      params: {
        network: this.config.network,
        limit,
      },
    });
    return response.data.accounts || [];
  }

  /**
   * Get NFT metadata
   */
  async getNFTMetadata(mint: string): Promise<unknown> {
    const response = await this.client.get(`/nfts/${mint}`, {
      params: { network: this.config.network },
    });
    return response.data;
  }

  /**
   * Get NFTs owned by address
   */
  async getNFTsByOwner(address: string, limit: number = 100): Promise<unknown[]> {
    const response = await this.client.get(`/accounts/${address}/nfts`, {
      params: {
        network: this.config.network,
        limit,
      },
    });
    return response.data.nfts || [];
  }
}

// Singleton instance for mainnet
export const solanaFMAPI = new SolanaFMAPI();

// Factory function for custom configuration
export const createSolanaFMAPI = (config: SolanaFMConfig) => {
  return new SolanaFMAPI(config);
};

