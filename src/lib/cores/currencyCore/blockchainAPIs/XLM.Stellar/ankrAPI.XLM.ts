/**
 * Ankr API for Stellar (XLM)
 * 
 * Stellar RPC for dApps and crypto projects
 * 
 * Features:
 * - Free tier available
 * - Reliable web3 data
 * - Blockchain interaction
 * - RPC endpoints
 * - High-performance infrastructure
 * 
 * Documentation: https://www.ankr.com/docs/rpc-service/chains/chains-list/#stellar
 * Website: https://www.ankr.com/rpc/stellar/
 */

import axios, { AxiosInstance } from 'axios';

// API Configuration
export interface AnkrStellarConfig {
  apiKey?: string;
  baseURL?: string;
  timeout?: number;
  retries?: number;
}

// Account Info
export interface AnkrAccount {
  id: string;
  account_id: string;
  sequence: string;
  balances: Array<{
    balance: string;
    asset_type: string;
    asset_code?: string;
    asset_issuer?: string;
  }>;
}

// Transaction
export interface AnkrTransaction {
  id: string;
  hash: string;
  ledger: number;
  created_at: string;
  source_account: string;
  fee_charged: string;
  successful: boolean;
}

export class AnkrStellarAPI {
  private client: AxiosInstance;
  private config: Required<Omit<AnkrStellarConfig, 'apiKey'>> & { apiKey?: string };

  constructor(config: AnkrStellarConfig = {}) {
    // Ankr offers free public endpoints
    const baseURL = config.baseURL || 
      (config.apiKey 
        ? `https://rpc.ankr.com/stellar/${config.apiKey}`
        : 'https://rpc.ankr.com/stellar');

    this.config = {
      apiKey: config.apiKey,
      baseURL,
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
   * Get account information
   */
  async getAccount(accountId: string): Promise<AnkrAccount> {
    const response = await this.client.get(`/accounts/${accountId}`);
    return response.data;
  }

  /**
   * Get account balance
   */
  async getBalance(accountId: string): Promise<string> {
    const account = await this.getAccount(accountId);
    const nativeBalance = account.balances.find(b => b.asset_type === 'native');
    return nativeBalance?.balance || '0';
  }

  /**
   * Get account transactions
   */
  async getTransactions(accountId: string, limit: number = 50): Promise<{
    _embedded: { records: AnkrTransaction[] };
  }> {
    const response = await this.client.get(`/accounts/${accountId}/transactions`, {
      params: { limit },
    });
    return response.data;
  }

  /**
   * Get transaction by hash
   */
  async getTransaction(hash: string): Promise<AnkrTransaction> {
    const response = await this.client.get(`/transactions/${hash}`);
    return response.data;
  }

  /**
   * Submit transaction
   */
  async submitTransaction(txEnvelope: string): Promise<AnkrTransaction> {
    const response = await this.client.post('/transactions',
      `tx=${encodeURIComponent(txEnvelope)}`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    return response.data;
  }

  /**
   * Get operations for account
   */
  async getOperations(accountId: string, limit: number = 50): Promise<{
    _embedded: { records: unknown[] };
  }> {
    const response = await this.client.get(`/accounts/${accountId}/operations`, {
      params: { limit },
    });
    return response.data;
  }

  /**
   * Get payments for account
   */
  async getPayments(accountId: string, limit: number = 50): Promise<{
    _embedded: { records: unknown[] };
  }> {
    const response = await this.client.get(`/accounts/${accountId}/payments`, {
      params: { limit },
    });
    return response.data;
  }

  /**
   * Get ledger by sequence
   */
  async getLedger(sequence: number): Promise<unknown> {
    const response = await this.client.get(`/ledgers/${sequence}`);
    return response.data;
  }
}

// Singleton instance (free tier)
export const ankrStellarAPI = new AnkrStellarAPI();

// Factory function
export const createAnkrStellarAPI = (apiKey?: string) => {
  return new AnkrStellarAPI({ apiKey });
};
