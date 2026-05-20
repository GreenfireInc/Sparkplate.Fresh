/**
 * Tatum API for Stellar (XLM)
 * 
 * Powerful APIs and RPCs for Stellar blockchain
 * 
 * Features:
 * - Mainnet and testnet endpoints
 * - Blockchain data retrieval
 * - Transaction operations
 * - Payment processing
 * - Account management
 * - Free tier available
 * 
 * Documentation: https://tatum.io/chain/stellar
 * Website: https://tatum.io/
 */

import axios, { AxiosInstance } from 'axios';

// API Configuration
export interface TatumStellarConfig {
  apiKey: string;
  baseURL?: string;
  timeout?: number;
  retries?: number;
  network?: 'mainnet' | 'testnet';
}

// Account Info
export interface TatumAccount {
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
export interface TatumTransaction {
  id: string;
  hash: string;
  ledger: number;
  created_at: string;
  source_account: string;
  fee_charged: string;
  successful: boolean;
  operation_count: number;
}

// Transaction Result
export interface TatumTransactionResult {
  txId: string;
  successful: boolean;
}

export class TatumStellarAPI {
  private client: AxiosInstance;
  private config: Required<TatumStellarConfig>;

  constructor(config: TatumStellarConfig) {
    if (!config.apiKey) {
      throw new Error('Tatum API key is required');
    }

    this.config = {
      apiKey: config.apiKey,
      baseURL: config.baseURL || 'https://api.tatum.io/v3',
      timeout: config.timeout || 30000,
      retries: config.retries || 3,
      network: config.network || 'mainnet',
    };

    this.client = axios.create({
      baseURL: this.config.baseURL,
      timeout: this.config.timeout,
      headers: {
        'x-api-key': this.config.apiKey,
        'Content-Type': 'application/json',
      },
    });
  }

  /**
   * Get account information
   */
  async getAccount(accountId: string): Promise<TatumAccount> {
    const response = await this.client.get(`/xlm/account/${accountId}`);
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
  async getTransactions(accountId: string, limit: number = 50): Promise<TatumTransaction[]> {
    const response = await this.client.get(`/xlm/account/${accountId}/transactions`, {
      params: { limit },
    });
    return response.data._embedded?.records || [];
  }

  /**
   * Get transaction by hash
   */
  async getTransaction(hash: string): Promise<TatumTransaction> {
    const response = await this.client.get(`/xlm/transaction/${hash}`);
    return response.data;
  }

  /**
   * Broadcast transaction
   */
  async broadcastTransaction(txData: string): Promise<TatumTransactionResult> {
    const response = await this.client.post('/xlm/broadcast', {
      txData,
    });
    return response.data;
  }

  /**
   * Get current blockchain info
   */
  async getBlockchainInfo(): Promise<{
    current_ledger: number;
    current_ledger_hash: string;
  }> {
    const response = await this.client.get('/xlm/info');
    return response.data;
  }

  /**
   * Get ledger by sequence
   */
  async getLedger(sequence: number): Promise<unknown> {
    const response = await this.client.get(`/xlm/ledger/${sequence}`);
    return response.data;
  }

  /**
   * Get fee stats
   */
  async getFeeStats(): Promise<{
    last_ledger: string;
    last_ledger_base_fee: string;
    ledger_capacity_usage: string;
    min_accepted_fee: string;
    mode_accepted_fee: string;
    p10_accepted_fee: string;
    p20_accepted_fee: string;
    p30_accepted_fee: string;
    p40_accepted_fee: string;
    p50_accepted_fee: string;
    p60_accepted_fee: string;
    p70_accepted_fee: string;
    p80_accepted_fee: string;
    p90_accepted_fee: string;
    p95_accepted_fee: string;
    p99_accepted_fee: string;
  }> {
    const response = await this.client.get('/xlm/fee');
    return response.data;
  }
}

// Factory function (API key required)
export const createTatumStellarAPI = (apiKey: string, network?: 'mainnet' | 'testnet') => {
  return new TatumStellarAPI({ apiKey, network });
};
