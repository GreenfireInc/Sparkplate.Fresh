/**
 * Blockchair API for Tron (TRX)
 * 
 * Fast and reliable blockchain explorer
 * 
 * Features:
 * - Free tier available
 * - Fast blockchain search
 * - Block and transaction data
 * - Address analytics
 * - Balance queries
 * - Statistics
 * 
 * Documentation: https://blockchair.com/api/docs
 * Website: https://blockchair.com/tron
 */

import axios, { AxiosInstance } from 'axios';

// API Configuration
export interface BlockchairTronConfig {
  baseURL?: string;
  apiKey?: string;
  timeout?: number;
  retries?: number;
}

// Address Data
export interface BlockchairAddress {
  address: {
    address: string;
    balance: number;
    balance_usd: number;
    received: number;
    received_usd: number;
    spent: number;
    spent_usd: number;
    transaction_count: number;
    first_seen_receiving: string;
    last_seen_receiving: string;
    first_seen_spending?: string;
    last_seen_spending?: string;
  };
  transactions: string[];
}

// Block Data
export interface BlockchairBlock {
  id: number;
  hash: string;
  time: string;
  transaction_count: number;
  witness: string;
  size: number;
}

// Transaction Data
export interface BlockchairTransaction {
  transaction_id: string;
  block_id: number;
  time: string;
  sender: string;
  recipient: string;
  value: number;
  value_usd: number;
  fee: number;
  type: string;
}

export class BlockchairTronAPI {
  private client: AxiosInstance;
  private config: Required<Omit<BlockchairTronConfig, 'apiKey'>> & { apiKey?: string };

  constructor(config: BlockchairTronConfig = {}) {
    this.config = {
      baseURL: config.baseURL || 'https://api.blockchair.com/tron',
      apiKey: config.apiKey,
      timeout: config.timeout || 30000,
      retries: config.retries || 3,
    };

    this.client = axios.create({
      baseURL: this.config.baseURL,
      timeout: this.config.timeout,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  /**
   * Get address information
   */
  async getAddress(address: string): Promise<BlockchairAddress> {
    const response = await this.client.get(`/dashboards/address/${address}`, {
      params: this.config.apiKey ? { key: this.config.apiKey } : {},
    });
    return response.data.data[address];
  }

  /**
   * Get address balance
   */
  async getBalance(address: string): Promise<number> {
    const addressData = await this.getAddress(address);
    return addressData.address.balance;
  }

  /**
   * Get block by height
   */
  async getBlock(height: number): Promise<BlockchairBlock> {
    const response = await this.client.get(`/dashboards/block/${height}`, {
      params: this.config.apiKey ? { key: this.config.apiKey } : {},
    });
    return response.data.data[height].block;
  }

  /**
   * Get transaction by hash
   */
  async getTransaction(hash: string): Promise<BlockchairTransaction> {
    const response = await this.client.get(`/dashboards/transaction/${hash}`, {
      params: this.config.apiKey ? { key: this.config.apiKey } : {},
    });
    return response.data.data[hash].transaction;
  }

  /**
   * Get blockchain stats
   */
  async getStats(): Promise<{
    blocks: number;
    transactions: number;
    circulation: number;
    market_price_usd: number;
    market_cap_usd: number;
    nodes: number;
  }> {
    const response = await this.client.get('/stats', {
      params: this.config.apiKey ? { key: this.config.apiKey } : {},
    });
    return response.data.data;
  }
}

// Singleton instance
export const blockchairTronAPI = new BlockchairTronAPI();

// Factory function
export const createBlockchairTronAPI = (apiKey?: string) => {
  return new BlockchairTronAPI({ apiKey });
};
