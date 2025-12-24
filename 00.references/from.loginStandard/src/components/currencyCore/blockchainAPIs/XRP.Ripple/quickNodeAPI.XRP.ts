/**
 * QuickNode API for Ripple (XRP)
 * 
 * Reliable XRP Ledger RPC endpoints
 * 
 * Features:
 * - Free tier available
 * - Fast RPC nodes
 * - Web3 application support
 * - High performance
 * - Global infrastructure
 * 
 * Documentation: https://www.quicknode.com/docs/xrpl
 * Website: https://www.quicknode.com/chains/xrpl
 */

import axios, { AxiosInstance } from 'axios';

// API Configuration
export interface QuickNodeXRPConfig {
  apiKey: string;
  baseURL?: string;
  timeout?: number;
  retries?: number;
}

export class QuickNodeXRPAPI {
  private client: AxiosInstance;
  private config: Required<QuickNodeXRPConfig>;

  constructor(config: QuickNodeXRPConfig) {
    if (!config.apiKey) {
      throw new Error('QuickNode API key is required');
    }

    this.config = {
      apiKey: config.apiKey,
      baseURL: config.baseURL || `https://example.xrpl.quiknode.pro/${config.apiKey}/`,
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
   * Execute JSON-RPC method
   */
  private async rpc<T>(method: string, params: Record<string, unknown>[] = []): Promise<T> {
    const response = await this.client.post('', {
      jsonrpc: '2.0',
      method,
      params,
      id: 1,
    });

    if (response.data.result?.error) {
      throw new Error(`XRP Error: ${response.data.result.error_message || response.data.result.error}`);
    }

    return response.data.result;
  }

  /**
   * Get account information
   */
  async getAccountInfo(account: string): Promise<unknown> {
    return this.rpc('account_info', [{
      account,
      ledger_index: 'validated',
    }]);
  }

  /**
   * Get account balance
   */
  async getBalance(account: string): Promise<string> {
    const info = await this.getAccountInfo(account) as { account_data: { Balance: string } };
    const drops = parseInt(info.account_data.Balance);
    return (drops / 1000000).toString();
  }

  /**
   * Get account transactions
   */
  async getTransactions(account: string, limit: number = 50): Promise<unknown> {
    return this.rpc('account_tx', [{
      account,
      ledger_index_min: -1,
      ledger_index_max: -1,
      limit,
    }]);
  }

  /**
   * Get transaction
   */
  async getTransaction(hash: string): Promise<unknown> {
    return this.rpc('tx', [{
      transaction: hash,
    }]);
  }

  /**
   * Submit transaction
   */
  async submitTransaction(txBlob: string): Promise<unknown> {
    return this.rpc('submit', [{
      tx_blob: txBlob,
    }]);
  }

  /**
   * Get ledger
   */
  async getLedger(ledgerIndex: number | 'validated' = 'validated'): Promise<unknown> {
    return this.rpc('ledger', [{
      ledger_index: ledgerIndex,
      transactions: false,
    }]);
  }

  /**
   * Get server info
   */
  async getServerInfo(): Promise<unknown> {
    return this.rpc('server_info');
  }

  /**
   * Get fee
   */
  async getFee(): Promise<unknown> {
    return this.rpc('fee');
  }

  /**
   * Get account lines (trust lines)
   */
  async getAccountLines(account: string): Promise<unknown> {
    return this.rpc('account_lines', [{
      account,
      ledger_index: 'validated',
    }]);
  }

  /**
   * Get account offers
   */
  async getAccountOffers(account: string): Promise<unknown> {
    return this.rpc('account_offers', [{
      account,
      ledger_index: 'validated',
    }]);
  }
}

// Factory function (API key required)
export const createQuickNodeXRPAPI = (apiKey: string) => {
  return new QuickNodeXRPAPI({ apiKey });
};
