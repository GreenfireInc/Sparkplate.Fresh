/**
 * NOWNodes API for Terra Classic (LUNC)
 * 
 * Instantaneous access to Terra Classic nodes and block explorers
 * 
 * Features:
 * - Requires API key (free tier available)
 * - Full node RPC and REST access for Terra Classic
 * - Block, transaction, and account data
 * - Staking and governance queries
 * 
 * Documentation: https://nownodes.io/documentation
 * Website: https://nownodes.io/nodes/terra-classic-lunc
 */

import axios, { AxiosInstance } from 'axios';

// API Configuration
export interface TerraClassicNOWNodesConfig {
  apiKey: string;
  timeout?: number;
  retries?: number;
}

// RPC Request
export interface TerraClassicNOWNodesRPCRequest {
  jsonrpc: string;
  id: string | number;
  method: string;
  params: unknown[];
}

// RPC Response
export interface TerraClassicNOWNodesRPCResponse<T = unknown> {
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
export interface TerraClassicNOWNodesBlock {
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
export interface TerraClassicNOWNodesTransaction {
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
export interface TerraClassicNOWNodesAccountInfo {
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
export interface TerraClassicBalance {
  denom: string;
  amount: string;
}

export class TerraClassicNOWNodesAPI {
  private rpcClient: AxiosInstance;
  private restClient: AxiosInstance;
  private config: Required<Omit<TerraClassicNOWNodesConfig, 'apiKey'>> & { apiKey: string };

  constructor(config: TerraClassicNOWNodesConfig) {
    this.config = {
      apiKey: config.apiKey,
      timeout: config.timeout || 10000,
      retries: config.retries || 3,
    };

    this.rpcClient = axios.create({
      baseURL: 'https://terra-classic.nownodes.io',
      timeout: this.config.timeout,
      headers: {
        'Content-Type': 'application/json',
        'api-key': this.config.apiKey,
      },
    });

    this.restClient = axios.create({
      baseURL: 'https://terra-classic-rest.nownodes.io',
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
    const request: TerraClassicNOWNodesRPCRequest = {
      jsonrpc: '2.0',
      id: Date.now(),
      method,
      params,
    };

    const response = await this.rpcClient.post<TerraClassicNOWNodesRPCResponse<T>>('', request);

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
  async getBlock(height?: number): Promise<TerraClassicNOWNodesBlock> {
    const params = height ? [height.toString()] : [];
    return this.rpcCall<TerraClassicNOWNodesBlock>('block', params);
  }

  /**
   * Get latest block
   */
  async getLatestBlock(): Promise<TerraClassicNOWNodesBlock> {
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
  async getTransaction(txHash: string): Promise<TerraClassicNOWNodesTransaction> {
    return this.rpcCall<TerraClassicNOWNodesTransaction>('tx', [txHash, 'false']);
  }

  /**
   * Search transactions
   */
  async searchTransactions(query: string, page: number = 1, perPage: number = 30): Promise<{
    txs: TerraClassicNOWNodesTransaction[];
    total_count: string;
  }> {
    return this.rpcCall('tx_search', [query, 'false', page.toString(), perPage.toString(), 'desc']);
  }

  /**
   * Get transaction history for an address
   */
  async getTransactionHistory(address: string, limit: number = 50): Promise<TerraClassicNOWNodesTransaction[]> {
    const query = `message.sender='${address}'`;
    const result = await this.searchTransactions(query, 1, limit);
    return result.txs || [];
  }

  /**
   * Get account info via REST
   */
  async getAccountInfo(address: string): Promise<TerraClassicNOWNodesAccountInfo> {
    const response = await this.restClient.get(`/cosmos/auth/v1beta1/accounts/${address}`);
    return response.data;
  }

  /**
   * Get balance via REST
   */
  async getBalance(address: string): Promise<TerraClassicBalance[]> {
    const response = await this.restClient.get(`/cosmos/bank/v1beta1/balances/${address}`);
    return response.data.balances || [];
  }

  /**
   * Get balance for specific denom
   */
  async getBalanceByDenom(address: string, denom: string): Promise<TerraClassicBalance> {
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
  async getSupply(): Promise<TerraClassicBalance[]> {
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

  /**
   * Get Terra Classic specific treasury data
   */
  async getTreasuryParams(): Promise<unknown> {
    const response = await this.restClient.get('/terra/treasury/v1beta1/parameters');
    return response.data;
  }

  /**
   * Get tax rate
   */
  async getTaxRate(): Promise<unknown> {
    const response = await this.restClient.get('/terra/treasury/v1beta1/tax_rate');
    return response.data;
  }

  /**
   * Get tax cap for denom
   */
  async getTaxCap(denom: string): Promise<unknown> {
    const response = await this.restClient.get(`/terra/treasury/v1beta1/tax_caps/${denom}`);
    return response.data;
  }
}

// Note: Requires API key, so no default singleton instance
export const createTerraClassicNOWNodesAPI = (apiKey: string) => {
  return new TerraClassicNOWNodesAPI({ apiKey });
};

