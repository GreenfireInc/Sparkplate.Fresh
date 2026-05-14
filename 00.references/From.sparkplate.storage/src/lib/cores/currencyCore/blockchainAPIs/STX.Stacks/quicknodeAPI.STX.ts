/**
 * QuickNode API for Stacks (STX)
 * 
 * Fast RPC nodes and comprehensive Web3 APIs
 * 
 * Features:
 * - Free tier with registration
 * - Fast RPC node access
 * - High-performance infrastructure
 * - Custom endpoints
 * - WebSocket support
 * - Archive data access
 * - Multi-network support
 * 
 * Documentation: https://www.quicknode.com/docs/stacks
 * Website: https://www.quicknode.com/chains/stx
 */

import axios, { AxiosInstance } from 'axios';

// API Configuration
export interface QuickNodeStacksConfig {
  apiKey: string;
  endpoint?: string;
  timeout?: number;
  retries?: number;
}

// RPC Request
export interface StacksRPCRequest {
  jsonrpc: string;
  id: number | string;
  method: string;
  params?: unknown[];
}

// RPC Response
export interface StacksRPCResponse<T = unknown> {
  jsonrpc: string;
  id: number | string;
  result?: T;
  error?: {
    code: number;
    message: string;
    data?: unknown;
  };
}

// Account Information
export interface QuickNodeAccountInfo {
  balance: string;
  locked: string;
  unlock_height: number;
  nonce: number;
}

// Transaction
export interface QuickNodeTransaction {
  tx_id: string;
  tx_type: string;
  nonce: number;
  fee_rate: string;
  sender_address: string;
  sponsored: boolean;
  post_condition_mode: string;
  block_hash: string;
  block_height: number;
  burn_block_time: number;
  canonical: boolean;
  tx_status: string;
  tx_result: {
    hex: string;
    repr: string;
  };
}

// Block Information
export interface QuickNodeBlock {
  canonical: boolean;
  height: number;
  hash: string;
  parent_block_hash: string;
  burn_block_time: number;
  burn_block_hash: string;
  burn_block_height: number;
  miner_txid: string;
  txs: string[];
}

export class QuickNodeStacksAPI {
  private client: AxiosInstance;
  private rpcClient: AxiosInstance;
  private config: Required<QuickNodeStacksConfig>;
  private requestId: number = 1;

  constructor(config: QuickNodeStacksConfig) {
    if (!config.apiKey) {
      throw new Error('QuickNode API key is required');
    }

    this.config = {
      apiKey: config.apiKey,
      endpoint: config.endpoint || `https://YOUR-ENDPOINT.stacks-mainnet.quiknode.pro/${config.apiKey}/`,
      timeout: config.timeout || 30000,
      retries: config.retries || 3,
    };

    // REST API client
    this.client = axios.create({
      baseURL: this.config.endpoint,
      timeout: this.config.timeout,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // RPC client
    this.rpcClient = axios.create({
      baseURL: this.config.endpoint,
      timeout: this.config.timeout,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  /**
   * Make RPC call
   */
  private async rpcCall<T>(method: string, params: unknown[] = []): Promise<T> {
    const request: StacksRPCRequest = {
      jsonrpc: '2.0',
      id: this.requestId++,
      method,
      params,
    };

    const response = await this.rpcClient.post<StacksRPCResponse<T>>('', request);

    if (response.data.error) {
      throw new Error(`RPC Error: ${response.data.error.message}`);
    }

    return response.data.result as T;
  }

  /**
   * Get account balance and info
   */
  async getAccountInfo(principal: string): Promise<QuickNodeAccountInfo> {
    const response = await this.client.get(`/extended/v1/address/${principal}/balances`);
    return response.data;
  }

  /**
   * Get account STX balance
   */
  async getBalance(principal: string): Promise<string> {
    const accountInfo = await this.getAccountInfo(principal);
    return accountInfo.balance;
  }

  /**
   * Get transaction by ID
   */
  async getTransaction(txId: string): Promise<QuickNodeTransaction> {
    const response = await this.client.get(`/extended/v1/tx/${txId}`);
    return response.data;
  }

  /**
   * Get transaction history for an address
   */
  async getTransactionHistory(
    principal: string,
    limit: number = 50,
    offset: number = 0
  ): Promise<{ results: QuickNodeTransaction[]; total: number }> {
    const response = await this.client.get(`/extended/v1/address/${principal}/transactions`, {
      params: { limit, offset },
    });
    return response.data;
  }

  /**
   * Get block by height or hash
   */
  async getBlock(heightOrHash: number | string): Promise<QuickNodeBlock> {
    const response = await this.client.get(`/extended/v1/block/${heightOrHash}`);
    return response.data;
  }

  /**
   * Get network info
   */
  async getNetworkInfo(): Promise<unknown> {
    const response = await this.client.get('/v2/info');
    return response.data;
  }

  /**
   * Get current block height
   */
  async getBlockHeight(): Promise<number> {
    const info: any = await this.getNetworkInfo();
    return info.stacks_tip_height;
  }

  /**
   * Call read-only contract function
   */
  async callReadOnlyFunction(
    contractAddress: string,
    contractName: string,
    functionName: string,
    functionArgs: string[],
    sender?: string
  ): Promise<{ okay: boolean; result: string }> {
    const response = await this.client.post(
      `/v2/contracts/call-read/${contractAddress}/${contractName}/${functionName}`,
      {
        sender: sender || contractAddress,
        arguments: functionArgs,
      }
    );
    return response.data;
  }

  /**
   * Broadcast transaction
   */
  async broadcastTransaction(txHex: string): Promise<string> {
    const response = await this.client.post('/v2/transactions', txHex, {
      headers: {
        'Content-Type': 'application/octet-stream',
      },
    });
    return response.data;
  }

  /**
   * Get mempool transactions
   */
  async getMempoolTransactions(limit: number = 50): Promise<{ results: unknown[] }> {
    const response = await this.client.get('/extended/v1/tx/mempool', {
      params: { limit },
    });
    return response.data;
  }

  /**
   * Get contract by ID
   */
  async getContract(contractId: string): Promise<unknown> {
    const response = await this.client.get(`/extended/v1/contract/${contractId}`);
    return response.data;
  }

  /**
   * Get contract source code
   */
  async getContractSource(contractId: string): Promise<{ source: string; publish_height: number }> {
    const response = await this.client.get(`/v2/contracts/source/${contractId}`);
    return response.data;
  }

  /**
   * Get STX supply information
   */
  async getSTXSupply(): Promise<unknown> {
    const response = await this.client.get('/extended/v1/stx_supply');
    return response.data;
  }

  /**
   * Get fee estimates
   */
  async getFeeEstimate(transaction: unknown): Promise<unknown> {
    const response = await this.client.post('/v2/fees/transaction', transaction);
    return response.data;
  }

  /**
   * Search blockchain
   */
  async search(query: string): Promise<unknown> {
    const response = await this.client.get(`/extended/v1/search/${query}`);
    return response.data;
  }
}

// Factory function (API key required)
export const createQuickNodeStacksAPI = (apiKey: string, endpoint?: string) => {
  return new QuickNodeStacksAPI({ apiKey, endpoint });
};

