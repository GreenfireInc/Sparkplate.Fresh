/**
 * NOWNodes API for Stellar (XLM)
 * 
 * Full node access with free tier
 * 
 * Features:
 * - Free tier: 5,000 requests/day
 * - 99.95% uptime
 * - Real-time blockchain data
 * - Transaction and block details
 * - Full node access
 * 
 * Documentation: https://nownodes.io/nodes/stellar-xlm
 * Website: https://nownodes.io/
 */

import axios, { AxiosInstance } from 'axios';

// API Configuration
export interface NOWNodesStellarConfig {
  apiKey: string;
  baseURL?: string;
  timeout?: number;
  retries?: number;
}

// Account Response
export interface NOWNodesAccount {
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

// Transaction Response
export interface NOWNodesTransaction {
  id: string;
  hash: string;
  ledger: number;
  created_at: string;
  source_account: string;
  fee_charged: string;
  successful: boolean;
}

export class NOWNodesStellarAPI {
  private client: AxiosInstance;
  private config: Required<NOWNodesStellarConfig>;

  constructor(config: NOWNodesStellarConfig) {
    if (!config.apiKey) {
      throw new Error('NOWNodes API key is required');
    }

    this.config = {
      apiKey: config.apiKey,
      baseURL: config.baseURL || 'https://xlm.nownodes.io',
      timeout: config.timeout || 30000,
      retries: config.retries || 3,
    };

    this.client = axios.create({
      baseURL: this.config.baseURL,
      timeout: this.config.timeout,
      headers: {
        'api-key': this.config.apiKey,
        'Content-Type': 'application/json',
      },
    });
  }

  /**
   * Get account information
   */
  async getAccount(accountId: string): Promise<NOWNodesAccount> {
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
    _embedded: { records: NOWNodesTransaction[] };
  }> {
    const response = await this.client.get(`/accounts/${accountId}/transactions`, {
      params: { limit },
    });
    return response.data;
  }

  /**
   * Get transaction by hash
   */
  async getTransaction(hash: string): Promise<NOWNodesTransaction> {
    const response = await this.client.get(`/transactions/${hash}`);
    return response.data;
  }

  /**
   * Submit transaction
   */
  async submitTransaction(txEnvelope: string): Promise<NOWNodesTransaction> {
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
}

// Factory function (API key required)
export const createNOWNodesStellarAPI = (apiKey: string) => {
  return new NOWNodesStellarAPI({ apiKey });
};
