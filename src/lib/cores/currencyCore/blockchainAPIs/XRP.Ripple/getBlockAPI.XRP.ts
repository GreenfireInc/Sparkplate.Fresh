/**
 * GetBlock API for Ripple (XRP)
 * 
 * RPC node provider for XRP Ledger
 * 
 * Features:
 * - Free tier with API key
 * - Instant XRP RPC node access
 * - Transaction retrieval
 * - Account queries
 * - High availability
 * 
 * Documentation: https://getblock.io/docs/xrp/
 * Website: https://getblock.io/nodes/xrp/
 */

import axios, { AxiosInstance } from 'axios';

// API Configuration
export interface GetBlockXRPConfig {
  apiKey: string;
  baseURL?: string;
  timeout?: number;
  retries?: number;
  network?: 'mainnet' | 'testnet';
}

export class GetBlockXRPAPI {
  private client: AxiosInstance;
  private config: Required<GetBlockXRPConfig>;

  constructor(config: GetBlockXRPConfig) {
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
}

// Factory function (API key required)
export const createGetBlockXRPAPI = (apiKey: string, network?: 'mainnet' | 'testnet') => {
  return new GetBlockXRPAPI({ apiKey, network });
};
