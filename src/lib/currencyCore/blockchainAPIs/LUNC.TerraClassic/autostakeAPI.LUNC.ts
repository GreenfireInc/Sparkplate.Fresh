/**
 * Autostake API for Terra Classic (LUNC)
 * 
 * Free developer access tier for Terra Classic
 * 
 * Features:
 * - Free access for development
 * - RPC, gRPC, and LCD endpoints
 * - High availability
 * - No API key required for basic access
 * 
 * Documentation: https://docs.autostake.com/
 * Website: https://autostake.com/
 */

import axios, { AxiosInstance } from 'axios';

// API Configuration
export interface AutostakeConfig {
  rpcURL?: string;
  lcdURL?: string;
  timeout?: number;
  retries?: number;
}

// RPC Request
export interface AutostakeRPCRequest {
  jsonrpc: string;
  id: string | number;
  method: string;
  params: unknown[];
}

// RPC Response
export interface AutostakeRPCResponse<T = unknown> {
  jsonrpc: string;
  id: string | number;
  result?: T;
  error?: {
    code: number;
    message: string;
    data?: unknown;
  };
}

// Account Information
export interface AutostakeAccountInfo {
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
export interface AutostakeBalance {
  denom: string;
  amount: string;
}

// Transaction
export interface AutostakeTransaction {
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

// Block
export interface AutostakeBlock {
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

export class AutostakeAPI {
  private rpcClient: AxiosInstance;
  private lcdClient: AxiosInstance;
  private config: Required<AutostakeConfig>;

  constructor(config: AutostakeConfig = {}) {
    this.config = {
      rpcURL: config.rpcURL || 'https://terraclassic-mainnet-rpc.autostake.com:443',
      lcdURL: config.lcdURL || 'https://terraclassic-mainnet-lcd.autostake.com:443',
      timeout: config.timeout || 10000,
      retries: config.retries || 3,
    };

    this.rpcClient = axios.create({
      baseURL: this.config.rpcURL,
      timeout: this.config.timeout,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.lcdClient = axios.create({
      baseURL: this.config.lcdURL,
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
    const request: AutostakeRPCRequest = {
      jsonrpc: '2.0',
      id: Date.now(),
      method,
      params,
    };

    const response = await this.rpcClient.post<AutostakeRPCResponse<T>>('', request);

    if (response.data.error) {
      throw new Error(`RPC Error: ${response.data.error.message}`);
    }

    return response.data.result as T;
  }

  /**
   * Get node status via RPC
   */
  async getStatus(): Promise<unknown> {
    return this.rpcCall('status', []);
  }

  /**
   * Get block by height via RPC
   */
  async getBlock(height?: number): Promise<AutostakeBlock> {
    const params = height ? [height.toString()] : [];
    return this.rpcCall<AutostakeBlock>('block', params);
  }

  /**
   * Get latest block via RPC
   */
  async getLatestBlock(): Promise<AutostakeBlock> {
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
   * Get transaction by hash via RPC
   */
  async getTransaction(txHash: string): Promise<AutostakeTransaction> {
    return this.rpcCall<AutostakeTransaction>('tx', [txHash, 'false']);
  }

  /**
   * Search transactions via RPC
   */
  async searchTransactions(query: string, page: number = 1, perPage: number = 30): Promise<{
    txs: AutostakeTransaction[];
    total_count: string;
  }> {
    return this.rpcCall('tx_search', [query, 'false', page.toString(), perPage.toString(), 'desc']);
  }

  /**
   * Get transaction history for an address via RPC
   */
  async getTransactionHistory(address: string, limit: number = 50): Promise<AutostakeTransaction[]> {
    const query = `message.sender='${address}'`;
    const result = await this.searchTransactions(query, 1, limit);
    return result.txs || [];
  }

  /**
   * Get account info via LCD
   */
  async getAccountInfo(address: string): Promise<AutostakeAccountInfo> {
    const response = await this.lcdClient.get(`/cosmos/auth/v1beta1/accounts/${address}`);
    return response.data;
  }

  /**
   * Get balance via LCD
   */
  async getBalance(address: string): Promise<AutostakeBalance[]> {
    const response = await this.lcdClient.get(`/cosmos/bank/v1beta1/balances/${address}`);
    return response.data.balances || [];
  }

  /**
   * Get balance for specific denom via LCD
   */
  async getBalanceByDenom(address: string, denom: string): Promise<AutostakeBalance> {
    const response = await this.lcdClient.get(`/cosmos/bank/v1beta1/balances/${address}/by_denom`, {
      params: { denom },
    });
    return response.data.balance;
  }

  /**
   * Get delegations via LCD
   */
  async getDelegations(address: string): Promise<unknown[]> {
    const response = await this.lcdClient.get(`/cosmos/staking/v1beta1/delegations/${address}`);
    return response.data.delegation_responses || [];
  }

  /**
   * Get unbonding delegations via LCD
   */
  async getUnbondingDelegations(address: string): Promise<unknown[]> {
    const response = await this.lcdClient.get(`/cosmos/staking/v1beta1/delegators/${address}/unbonding_delegations`);
    return response.data.unbonding_responses || [];
  }

  /**
   * Get staking rewards via LCD
   */
  async getRewards(address: string): Promise<unknown> {
    const response = await this.lcdClient.get(`/cosmos/distribution/v1beta1/delegators/${address}/rewards`);
    return response.data;
  }

  /**
   * Get validators via LCD
   */
  async getValidators(status: string = 'BOND_STATUS_BONDED'): Promise<unknown[]> {
    const response = await this.lcdClient.get('/cosmos/staking/v1beta1/validators', {
      params: { status },
    });
    return response.data.validators || [];
  }

  /**
   * Get validator by address via LCD
   */
  async getValidator(validatorAddress: string): Promise<unknown> {
    const response = await this.lcdClient.get(`/cosmos/staking/v1beta1/validators/${validatorAddress}`);
    return response.data.validator;
  }

  /**
   * Broadcast transaction via LCD
   */
  async broadcastTransaction(txBytes: string, mode: string = 'BROADCAST_MODE_SYNC'): Promise<{ txhash: string }> {
    const response = await this.lcdClient.post('/cosmos/tx/v1beta1/txs', {
      tx_bytes: txBytes,
      mode,
    });
    return response.data.tx_response;
  }

  /**
   * Get blockchain info via RPC
   */
  async getBlockchainInfo(minHeight: number, maxHeight: number): Promise<unknown> {
    return this.rpcCall('blockchain', [minHeight.toString(), maxHeight.toString()]);
  }

  /**
   * Get network info via RPC
   */
  async getNetworkInfo(): Promise<unknown> {
    return this.rpcCall('net_info', []);
  }

  /**
   * Get validators at height via RPC
   */
  async getValidatorsAtHeight(height?: number): Promise<unknown> {
    const params = height ? [height.toString()] : [];
    return this.rpcCall('validators', params);
  }

  /**
   * Get total supply via LCD
   */
  async getSupply(): Promise<AutostakeBalance[]> {
    const response = await this.lcdClient.get('/cosmos/bank/v1beta1/supply');
    return response.data.supply || [];
  }

  /**
   * Get node info via LCD
   */
  async getNodeInfo(): Promise<unknown> {
    const response = await this.lcdClient.get('/cosmos/base/tendermint/v1beta1/node_info');
    return response.data;
  }

  /**
   * Get tax rate via LCD (Terra Classic specific)
   */
  async getTaxRate(): Promise<unknown> {
    const response = await this.lcdClient.get('/terra/treasury/v1beta1/tax_rate');
    return response.data;
  }

  /**
   * Get tax cap via LCD (Terra Classic specific)
   */
  async getTaxCap(denom: string): Promise<unknown> {
    const response = await this.lcdClient.get(`/terra/treasury/v1beta1/tax_caps/${denom}`);
    return response.data;
  }
}

// Singleton instance
export const autostakeAPI = new AutostakeAPI();

