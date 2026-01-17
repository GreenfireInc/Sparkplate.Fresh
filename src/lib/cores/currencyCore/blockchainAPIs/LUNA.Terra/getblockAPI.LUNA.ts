/**
 * GetBlock API for Terra 2.0 (LUNA)
 * 
 * Instant access to Terra 2.0 RPC nodes
 * 
 * Features:
 * - Free Tier: 50,000 compute units per month and 5 requests per second
 * - RPC and REST endpoints
 * - Block, transaction, and account data
 * - Requires API key
 * 
 * Documentation: https://getblock.io/docs/
 * Website: https://getblock.io/nodes/luna/
 */

import axios, { AxiosInstance } from 'axios';

// API Configuration
export interface GetBlockLunaConfig {
  apiKey: string;
  network?: 'mainnet' | 'testnet';
  timeout?: number;
  retries?: number;
}

// RPC Request
export interface RPCRequest {
  jsonrpc: string;
  id: string | number;
  method: string;
  params: unknown[];
}

// RPC Response
export interface RPCResponse<T = unknown> {
  jsonrpc: string;
  id: string | number;
  result?: T;
  error?: {
    code: number;
    message: string;
    data?: unknown;
  };
}

// Block Information
export interface LunaBlock {
  block_id: {
    hash: string;
    parts: {
      total: number;
      hash: string;
    };
  };
  block: {
    header: {
      version: {
        block: string;
        app: string;
      };
      chain_id: string;
      height: string;
      time: string;
      last_block_id: {
        hash: string;
      };
      validators_hash: string;
      proposer_address: string;
    };
    data: {
      txs: string[];
    };
  };
}

// Account Information
export interface LunaAccountInfo {
  account: {
    '@type': string;
    address: string;
    pub_key?: {
      '@type': string;
      key: string;
    };
    account_number: string;
    sequence: string;
  };
}

// Transaction
export interface LunaTransaction {
  hash: string;
  height: string;
  index: number;
  tx_result: {
    code: number;
    data: string;
    log: string;
    info: string;
    gas_wanted: string;
    gas_used: string;
    events: Array<{
      type: string;
      attributes: Array<{
        key: string;
        value: string;
        index: boolean;
      }>;
    }>;
    codespace: string;
  };
  tx: string;
}

export class GetBlockLunaAPI {
  private rpcClient: AxiosInstance;
  private restClient: AxiosInstance;
  private config: Required<Omit<GetBlockLunaConfig, 'apiKey'>> & { apiKey: string };

  constructor(config: GetBlockLunaConfig) {
    this.config = {
      apiKey: config.apiKey,
      network: config.network || 'mainnet',
      timeout: config.timeout || 10000,
      retries: config.retries || 3,
    };

    const rpcBaseURL = this.config.network === 'mainnet'
      ? `https://go.getblock.io/${this.config.apiKey}/`
      : `https://go.getblock.io/${this.config.apiKey}/testnet/`;

    const restBaseURL = this.config.network === 'mainnet'
      ? `https://go.getblock.io/${this.config.apiKey}/rest/`
      : `https://go.getblock.io/${this.config.apiKey}/testnet/rest/`;

    this.rpcClient = axios.create({
      baseURL: rpcBaseURL,
      timeout: this.config.timeout,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.restClient = axios.create({
      baseURL: restBaseURL,
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
    const request: RPCRequest = {
      jsonrpc: '2.0',
      id: Date.now(),
      method,
      params,
    };

    const response = await this.rpcClient.post<RPCResponse<T>>('', request);

    if (response.data.error) {
      throw new Error(`RPC Error: ${response.data.error.message}`);
    }

    return response.data.result as T;
  }

  /**
   * Get node status
   */
  async getStatus(): Promise<unknown> {
    return this.rpcCall('status', []);
  }

  /**
   * Get blockchain info
   */
  async getBlockchainInfo(minHeight: number, maxHeight: number): Promise<unknown> {
    return this.rpcCall('blockchain', [minHeight.toString(), maxHeight.toString()]);
  }

  /**
   * Get block by height
   */
  async getBlock(height?: number): Promise<LunaBlock> {
    const params = height ? [height.toString()] : [];
    return this.rpcCall<LunaBlock>('block', params);
  }

  /**
   * Get latest block
   */
  async getLatestBlock(): Promise<LunaBlock> {
    return this.getBlock();
  }

  /**
   * Get current block height
   */
  async getCurrentHeight(): Promise<number> {
    const block = await this.getLatestBlock();
    return parseInt(block.block.header.height);
  }

  /**
   * Get block results
   */
  async getBlockResults(height: number): Promise<unknown> {
    return this.rpcCall('block_results', [height.toString()]);
  }

  /**
   * Get transaction by hash
   */
  async getTransaction(txHash: string): Promise<LunaTransaction> {
    return this.rpcCall<LunaTransaction>('tx', [txHash, 'false']);
  }

  /**
   * Search transactions
   */
  async searchTransactions(query: string, page: number = 1, perPage: number = 30): Promise<{
    txs: LunaTransaction[];
    total_count: string;
  }> {
    return this.rpcCall('tx_search', [query, 'false', page.toString(), perPage.toString(), 'desc']);
  }

  /**
   * Get transaction history for an address
   */
  async getTransactionHistory(address: string, limit: number = 50): Promise<LunaTransaction[]> {
    const query = `message.sender='${address}'`;
    const result = await this.searchTransactions(query, 1, limit);
    return result.txs || [];
  }

  /**
   * Get account info via REST
   */
  async getAccountInfo(address: string): Promise<LunaAccountInfo> {
    const response = await this.restClient.get(`/cosmos/auth/v1beta1/accounts/${address}`);
    return response.data;
  }

  /**
   * Get balance via REST
   */
  async getBalance(address: string): Promise<Array<{ denom: string; amount: string }>> {
    const response = await this.restClient.get(`/cosmos/bank/v1beta1/balances/${address}`);
    return response.data.balances || [];
  }

  /**
   * Get delegations via REST
   */
  async getDelegations(address: string): Promise<unknown[]> {
    const response = await this.restClient.get(`/cosmos/staking/v1beta1/delegations/${address}`);
    return response.data.delegation_responses || [];
  }

  /**
   * Get validators via REST
   */
  async getValidators(status: string = 'BOND_STATUS_BONDED'): Promise<unknown[]> {
    const response = await this.restClient.get('/cosmos/staking/v1beta1/validators', {
      params: { status },
    });
    return response.data.validators || [];
  }

  /**
   * Broadcast transaction
   */
  async broadcastTransaction(txBytes: string): Promise<unknown> {
    return this.rpcCall('broadcast_tx_sync', [txBytes]);
  }

  /**
   * Broadcast transaction and wait for commit
   */
  async broadcastTransactionCommit(txBytes: string): Promise<unknown> {
    return this.rpcCall('broadcast_tx_commit', [txBytes]);
  }

  /**
   * Get network info
   */
  async getNetworkInfo(): Promise<unknown> {
    return this.rpcCall('net_info', []);
  }

  /**
   * Get consensus state
   */
  async getConsensusState(): Promise<unknown> {
    return this.rpcCall('consensus_state', []);
  }

  /**
   * Get validators for a height
   */
  async getValidatorsAtHeight(height?: number): Promise<unknown> {
    const params = height ? [height.toString()] : [];
    return this.rpcCall('validators', params);
  }

  /**
   * ABCI query
   */
  async abciQuery(path: string, data: string = '', height: number = 0, prove: boolean = false): Promise<unknown> {
    return this.rpcCall('abci_query', [path, data, height.toString(), prove.toString()]);
  }
}

// Note: Requires API key, so no default singleton instance
export const createGetBlockLunaAPI = (apiKey: string, network?: 'mainnet' | 'testnet') => {
  return new GetBlockLunaAPI({ apiKey, network });
};

