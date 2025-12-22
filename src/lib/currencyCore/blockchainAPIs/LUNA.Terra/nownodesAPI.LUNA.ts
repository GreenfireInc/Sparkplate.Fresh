/**
 * NOWNodes API for Terra 2.0 (LUNA)
 * 
 * Full node access for Terra blockchain
 * 
 * Features:
 * - Requires API key (free tier available)
 * - Full node RPC and REST access
 * - Block, transaction, and account data
 * - Staking and governance queries
 * 
 * Documentation: https://nownodes.io/documentation
 * Website: https://nownodes.io/terra-luna
 */

import axios, { AxiosInstance } from 'axios';

// API Configuration
export interface NOWNodesLunaConfig {
  apiKey: string;
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

// Block
export interface NOWNodesBlock {
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

// Transaction
export interface NOWNodesTransaction {
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

// Account Info
export interface NOWNodesAccountInfo {
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

// Balance
export interface NOWNodesBalance {
  denom: string;
  amount: string;
}

export class NOWNodesLunaAPI {
  private rpcClient: AxiosInstance;
  private restClient: AxiosInstance;
  private config: Required<Omit<NOWNodesLunaConfig, 'apiKey'>> & { apiKey: string };

  constructor(config: NOWNodesLunaConfig) {
    this.config = {
      apiKey: config.apiKey,
      timeout: config.timeout || 10000,
      retries: config.retries || 3,
    };

    this.rpcClient = axios.create({
      baseURL: 'https://luna.nownodes.io',
      timeout: this.config.timeout,
      headers: {
        'Content-Type': 'application/json',
        'api-key': this.config.apiKey,
      },
    });

    this.restClient = axios.create({
      baseURL: 'https://luna-rest.nownodes.io',
      timeout: this.config.timeout,
      headers: {
        'Content-Type': 'application/json',
        'api-key': this.config.apiKey,
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
   * Get block by height
   */
  async getBlock(height?: number): Promise<NOWNodesBlock> {
    const params = height ? [height.toString()] : [];
    return this.rpcCall<NOWNodesBlock>('block', params);
  }

  /**
   * Get latest block
   */
  async getLatestBlock(): Promise<NOWNodesBlock> {
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
   * Get transaction by hash
   */
  async getTransaction(txHash: string): Promise<NOWNodesTransaction> {
    return this.rpcCall<NOWNodesTransaction>('tx', [txHash, 'false']);
  }

  /**
   * Search transactions
   */
  async searchTransactions(query: string, page: number = 1, perPage: number = 30): Promise<{
    txs: NOWNodesTransaction[];
    total_count: string;
  }> {
    return this.rpcCall('tx_search', [query, 'false', page.toString(), perPage.toString(), 'desc']);
  }

  /**
   * Get transaction history for an address
   */
  async getTransactionHistory(address: string, limit: number = 50): Promise<NOWNodesTransaction[]> {
    const query = `message.sender='${address}'`;
    const result = await this.searchTransactions(query, 1, limit);
    return result.txs || [];
  }

  /**
   * Get account info via REST
   */
  async getAccountInfo(address: string): Promise<NOWNodesAccountInfo> {
    const response = await this.restClient.get(`/cosmos/auth/v1beta1/accounts/${address}`);
    return response.data;
  }

  /**
   * Get balance via REST
   */
  async getBalance(address: string): Promise<NOWNodesBalance[]> {
    const response = await this.restClient.get(`/cosmos/bank/v1beta1/balances/${address}`);
    return response.data.balances || [];
  }

  /**
   * Get balance for specific denom
   */
  async getBalanceByDenom(address: string, denom: string): Promise<NOWNodesBalance> {
    const response = await this.restClient.get(`/cosmos/bank/v1beta1/balances/${address}/by_denom`, {
      params: { denom },
    });
    return response.data.balance;
  }

  /**
   * Get delegations via REST
   */
  async getDelegations(address: string): Promise<unknown[]> {
    const response = await this.restClient.get(`/cosmos/staking/v1beta1/delegations/${address}`);
    return response.data.delegation_responses || [];
  }

  /**
   * Get unbonding delegations
   */
  async getUnbondingDelegations(address: string): Promise<unknown[]> {
    const response = await this.restClient.get(`/cosmos/staking/v1beta1/delegators/${address}/unbonding_delegations`);
    return response.data.unbonding_responses || [];
  }

  /**
   * Get staking rewards
   */
  async getRewards(address: string): Promise<unknown> {
    const response = await this.restClient.get(`/cosmos/distribution/v1beta1/delegators/${address}/rewards`);
    return response.data;
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
   * Get validator by address
   */
  async getValidator(validatorAddress: string): Promise<unknown> {
    const response = await this.restClient.get(`/cosmos/staking/v1beta1/validators/${validatorAddress}`);
    return response.data.validator;
  }

  /**
   * Broadcast transaction via RPC
   */
  async broadcastTransaction(txBytes: string): Promise<unknown> {
    return this.rpcCall('broadcast_tx_sync', [txBytes]);
  }

  /**
   * Broadcast transaction via REST
   */
  async broadcastTransactionREST(txBytes: string, mode: string = 'BROADCAST_MODE_SYNC'): Promise<{ txhash: string }> {
    const response = await this.restClient.post('/cosmos/tx/v1beta1/txs', {
      tx_bytes: txBytes,
      mode,
    });
    return response.data.tx_response;
  }

  /**
   * Get blockchain info
   */
  async getBlockchainInfo(minHeight: number, maxHeight: number): Promise<unknown> {
    return this.rpcCall('blockchain', [minHeight.toString(), maxHeight.toString()]);
  }

  /**
   * Get network info
   */
  async getNetworkInfo(): Promise<unknown> {
    return this.rpcCall('net_info', []);
  }

  /**
   * Get validators at height
   */
  async getValidatorsAtHeight(height?: number): Promise<unknown> {
    const params = height ? [height.toString()] : [];
    return this.rpcCall('validators', params);
  }

  /**
   * Get total supply
   */
  async getSupply(): Promise<NOWNodesBalance[]> {
    const response = await this.restClient.get('/cosmos/bank/v1beta1/supply');
    return response.data.supply || [];
  }

  /**
   * Get node info
   */
  async getNodeInfo(): Promise<unknown> {
    const response = await this.restClient.get('/cosmos/base/tendermint/v1beta1/node_info');
    return response.data;
  }
}

// Note: Requires API key, so no default singleton instance
export const createNOWNodesLunaAPI = (apiKey: string) => {
  return new NOWNodesLunaAPI({ apiKey });
};

