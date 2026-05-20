/**
 * NOWNodes API for Ripple (XRP)
 * 
 * Full node access with free tier
 * 
 * Features:
 * - Free tier: 5,000 requests/day
 * - Full node access
 * - Transaction tracking
 * - Account queries
 * - JSON-RPC support
 * 
 * Documentation: https://nownodes.io/nodes/ripple-xrp
 * Website: https://nownodes.io/
 */

import axios, { AxiosInstance } from 'axios';

// API Configuration
export interface NOWNodesXRPConfig {
  apiKey: string;
  baseURL?: string;
  timeout?: number;
  retries?: number;
}

export class NOWNodesXRPAPI {
  private client: AxiosInstance;
  private config: Required<NOWNodesXRPConfig>;

  constructor(config: NOWNodesXRPConfig) {
    if (!config.apiKey) {
      throw new Error('NOWNodes API key is required');
    }

    this.config = {
      apiKey: config.apiKey,
      baseURL: config.baseURL || 'https://xrp.nownodes.io',
      timeout: config.timeout || 30000,
      retries: config.retries || 3,
    };

    this.client = axios.create({
      baseURL: this.config.baseURL,
      timeout: this.config.timeout,
      headers: {
        'Content-Type': 'application/json',
        'api-key': this.config.apiKey,
      },
    });
  }

  /**
   * Execute JSON-RPC method
   */
  private async rpc<T>(method: string, params: Record<string, unknown>[] = []): Promise<T> {
    const response = await this.client.post('', {
      method,
      params,
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
   * Get ledger info
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
}

// Factory function (API key required)
export const createNOWNodesXRPAPI = (apiKey: string) => {
  return new NOWNodesXRPAPI({ apiKey });
};
