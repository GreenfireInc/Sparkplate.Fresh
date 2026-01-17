/**
 * GetBlock API for Stellar (XLM)
 * 
 * RPC node provider for Stellar blockchain
 * 
 * Features:
 * - Instant access to Stellar RPC nodes
 * - Free tier with API key
 * - Block and transaction data
 * - High availability
 * - Reliable infrastructure
 * 
 * Documentation: https://getblock.io/docs/stellar/
 * Website: https://getblock.io/nodes/xlm/
 */

import axios, { AxiosInstance } from 'axios';

// API Configuration
export interface GetBlockStellarConfig {
  apiKey: string;
  baseURL?: string;
  timeout?: number;
  retries?: number;
  network?: 'mainnet' | 'testnet';
}

// Account Info
export interface GetBlockAccount {
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
export interface GetBlockTransaction {
  id: string;
  hash: string;
  ledger: number;
  created_at: string;
  source_account: string;
  fee_charged: string;
  successful: boolean;
}

export class GetBlockStellarAPI {
  private client: AxiosInstance;
  private config: Required<GetBlockStellarConfig>;

  constructor(config: GetBlockStellarConfig) {
    if (!config.apiKey) {
      throw new Error('GetBlock API key is required');
    }

    const network = config.network || 'mainnet';
    const baseURL = config.baseURL || 
      (network === 'mainnet'
        ? `https://go.getblock.io/${config.apiKey}/`
        : `https://go.getblock.io/${config.apiKey}/testnet/`);

    this.config = {
      apiKey: config.apiKey,
      baseURL,
      timeout: config.timeout || 30000,
      retries: config.retries || 3,
      network,
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
  async getAccount(accountId: string): Promise<GetBlockAccount> {
    const response = await this.client.get(`accounts/${accountId}`);
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
    _embedded: { records: GetBlockTransaction[] };
  }> {
    const response = await this.client.get(`accounts/${accountId}/transactions`, {
      params: { limit },
    });
    return response.data;
  }

  /**
   * Get transaction by hash
   */
  async getTransaction(hash: string): Promise<GetBlockTransaction> {
    const response = await this.client.get(`transactions/${hash}`);
    return response.data;
  }

  /**
   * Submit transaction
   */
  async submitTransaction(txEnvelope: string): Promise<GetBlockTransaction> {
    const response = await this.client.post('transactions',
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
   * Get ledger by sequence
   */
  async getLedger(sequence: number): Promise<unknown> {
    const response = await this.client.get(`ledgers/${sequence}`);
    return response.data;
  }

  /**
   * Get operations for account
   */
  async getOperations(accountId: string, limit: number = 50): Promise<{
    _embedded: { records: unknown[] };
  }> {
    const response = await this.client.get(`accounts/${accountId}/operations`, {
      params: { limit },
    });
    return response.data;
  }
}

// Factory function (API key required)
export const createGetBlockStellarAPI = (apiKey: string, network?: 'mainnet' | 'testnet') => {
  return new GetBlockStellarAPI({ apiKey, network });
};
