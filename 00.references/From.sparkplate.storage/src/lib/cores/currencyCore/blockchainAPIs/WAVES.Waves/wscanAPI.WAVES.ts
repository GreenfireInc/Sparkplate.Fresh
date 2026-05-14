/**
 * WScan API for Waves (WAVES)
 * 
 * Explorer with tokens, NFTs, and portfolio tracking
 * 
 * Features:
 * - Latest tokens and NFTs
 * - Transaction search
 * - Portfolio overviews
 * - Powerful filters
 * - CSV export capabilities
 * - Free access with rate limits
 * 
 * Website: https://wscan.io/
 */

import axios, { AxiosInstance } from 'axios';

// API Configuration
export interface WScanConfig {
  baseURL?: string;
  apiKey?: string;
  timeout?: number;
  retries?: number;
}

// Account Data
export interface WScanAccount {
  address: string;
  balance: number;
  assets: Array<{
    assetId: string;
    balance: number;
    name: string;
    decimals: number;
  }>;
}

// Transaction Data
export interface WScanTransaction {
  id: string;
  type: number;
  sender: string;
  recipient?: string;
  amount: number;
  fee: number;
  timestamp: number;
  height: number;
}

export class WScanAPI {
  private client: AxiosInstance;
  private config: Required<Omit<WScanConfig, 'apiKey'>> & { apiKey?: string };

  constructor(config: WScanConfig = {}) {
    this.config = {
      baseURL: config.baseURL || 'https://api.wscan.io',
      apiKey: config.apiKey,
      timeout: config.timeout || 30000,
      retries: config.retries || 3,
    };

    this.client = axios.create({
      baseURL: this.config.baseURL,
      timeout: this.config.timeout,
      headers: {
        'Content-Type': 'application/json',
        ...(this.config.apiKey && { 'Authorization': `Bearer ${this.config.apiKey}` }),
      },
    });
  }

  /**
   * Get account information
   */
  async getAccount(address: string): Promise<WScanAccount> {
    const response = await this.client.get(`/account/${address}`);
    return response.data;
  }

  /**
   * Get account balance
   */
  async getBalance(address: string): Promise<number> {
    const account = await this.getAccount(address);
    return account.balance;
  }

  /**
   * Get transaction history
   */
  async getTransactionHistory(
    address: string,
    limit: number = 50
  ): Promise<WScanTransaction[]> {
    const response = await this.client.get(`/transactions/${address}`, {
      params: { limit },
    });
    return response.data;
  }

  /**
   * Get transaction by ID
   */
  async getTransaction(txId: string): Promise<WScanTransaction> {
    const response = await this.client.get(`/transaction/${txId}`);
    return response.data;
  }

  /**
   * Get latest tokens
   */
  async getLatestTokens(limit: number = 50): Promise<unknown[]> {
    const response = await this.client.get('/tokens/latest', {
      params: { limit },
    });
    return response.data;
  }

  /**
   * Get latest NFTs
   */
  async getLatestNFTs(limit: number = 50): Promise<unknown[]> {
    const response = await this.client.get('/nfts/latest', {
      params: { limit },
    });
    return response.data;
  }

  /**
   * Get NFTs owned by address
   */
  async getNFTsByOwner(address: string): Promise<unknown[]> {
    const response = await this.client.get(`/nfts/owner/${address}`);
    return response.data;
  }

  /**
   * Search transactions
   */
  async searchTransactions(query: string, limit: number = 50): Promise<unknown[]> {
    const response = await this.client.get('/search/transactions', {
      params: { q: query, limit },
    });
    return response.data;
  }
}

// Singleton instance
export const wscanAPI = new WScanAPI();

// Factory function
export const createWScanAPI = (apiKey?: string) => {
  return new WScanAPI({ apiKey });
};
