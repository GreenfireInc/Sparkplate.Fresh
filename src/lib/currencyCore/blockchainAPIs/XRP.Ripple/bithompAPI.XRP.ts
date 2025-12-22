/**
 * Bithomp API for Ripple (XRP)
 * 
 * Fast and trusted XRP Ledger Explorer
 * 
 * Features:
 * - Free API access
 * - Account scanning
 * - Transaction tracking
 * - Token (IOU) information
 * - NFT support
 * - Username resolution
 * - Fast performance
 * 
 * Documentation: https://docs.bithomp.com/
 * Website: https://bithomp.com/
 */

import axios, { AxiosInstance } from 'axios';

// API Configuration
export interface BithompConfig {
  baseURL?: string;
  apiKey?: string;
  timeout?: number;
  retries?: number;
}

// Account Data
export interface BithompAccount {
  address: string;
  username?: string;
  service?: string;
  balance: number;
  inception: number;
  domain?: string;
  flags: number;
}

// Transaction
export interface BithompTransaction {
  hash: string;
  ledger: number;
  date: number;
  type: string;
  address: string;
  counterparty?: string;
  amount?: {
    value: string;
    currency: string;
    issuer?: string;
  };
  fee: string;
}

export class BithompAPI {
  private client: AxiosInstance;
  private config: Required<Omit<BithompConfig, 'apiKey'>> & { apiKey?: string };

  constructor(config: BithompConfig = {}) {
    this.config = {
      baseURL: config.baseURL || 'https://bithomp.com/api/v2',
      apiKey: config.apiKey,
      timeout: config.timeout || 30000,
      retries: config.retries || 3,
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
  async getAccount(address: string): Promise<BithompAccount> {
    const response = await this.client.get(`/address/${address}`);
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
   * Get account transactions
   */
  async getTransactions(address: string, limit: number = 50): Promise<{
    address: string;
    transactions: BithompTransaction[];
  }> {
    const response = await this.client.get(`/address/${address}/transactions`, {
      params: { limit },
    });
    return response.data;
  }

  /**
   * Get transaction by hash
   */
  async getTransaction(hash: string): Promise<BithompTransaction> {
    const response = await this.client.get(`/transaction/${hash}`);
    return response.data;
  }

  /**
   * Resolve username to address
   */
  async resolveUsername(username: string): Promise<{ address: string; username: string; service: string }> {
    const response = await this.client.get(`/username/${username}`);
    return response.data;
  }

  /**
   * Get address by username
   */
  async getAddressByUsername(username: string): Promise<string> {
    const result = await this.resolveUsername(username);
    return result.address;
  }

  /**
   * Get account NFTs
   */
  async getNFTs(address: string): Promise<Array<{
    nft_id: string;
    uri?: string;
    flags: number;
    issuer: string;
    transfer_fee: number;
    nft_serial: number;
    nft_taxon: number;
  }>> {
    const response = await this.client.get(`/address/${address}/nfts`);
    return response.data;
  }

  /**
   * Get account tokens
   */
  async getTokens(address: string): Promise<Array<{
    currency: string;
    issuer: string;
    value: string;
    counterparty?: string;
  }>> {
    const response = await this.client.get(`/address/${address}/tokens`);
    return response.data;
  }

  /**
   * Get account payment history
   */
  async getPayments(address: string, limit: number = 50): Promise<{
    payments: BithompTransaction[];
  }> {
    const response = await this.client.get(`/address/${address}/payments`, {
      params: { limit },
    });
    return response.data;
  }
}

// Singleton instance (free tier)
export const bithompAPI = new BithompAPI();

// Factory function
export const createBithompAPI = (apiKey?: string) => {
  return new BithompAPI({ apiKey });
};
