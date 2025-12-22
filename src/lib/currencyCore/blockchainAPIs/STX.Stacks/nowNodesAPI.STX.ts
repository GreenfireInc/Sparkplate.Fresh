/**
 * NOWNodes API for Stacks (STX)
 * 
 * Full node access and block explorers via API key
 * 
 * Features:
 * - Free tier (5000 requests/month)
 * - Full node access
 * - Multiple network support
 * - High availability
 * - REST and RPC endpoints
 * - Real-time data
 * 
 * Documentation: https://nownodes.io/documentation
 * Website: https://nownodes.io/nodes/stacks-stx
 */

import axios, { AxiosInstance } from 'axios';

// API Configuration
export interface NOWNodesStacksConfig {
  apiKey: string;
  baseURL?: string;
  timeout?: number;
  retries?: number;
}

// Account Information
export interface NOWNodesAccountInfo {
  balance: string;
  locked: string;
  unlock_height: number;
  nonce: number;
  balance_proof: string;
  nonce_proof: string;
}

// Transaction
export interface NOWNodesTransaction {
  tx_id: string;
  nonce: number;
  fee_rate: string;
  sender_address: string;
  sponsored: boolean;
  post_condition_mode: string;
  post_conditions: unknown[];
  anchor_mode: string;
  block_hash: string;
  block_height: number;
  burn_block_time: number;
  burn_block_time_iso: string;
  canonical: boolean;
  tx_index: number;
  tx_status: string;
  tx_result: {
    hex: string;
    repr: string;
  };
  tx_type: string;
  events: unknown[];
}

// Block Information
export interface NOWNodesBlock {
  canonical: boolean;
  height: number;
  hash: string;
  parent_block_hash: string;
  burn_block_time: number;
  burn_block_time_iso: string;
  burn_block_hash: string;
  burn_block_height: number;
  miner_txid: string;
  txs: string[];
  microblocks_accepted: string[];
  microblocks_streamed: string[];
}

// Contract Information
export interface NOWNodesContract {
  tx_id: string;
  canonical: boolean;
  contract_id: string;
  block_height: number;
  source_code: string;
  abi: string;
}

export class NOWNodesStacksAPI {
  private client: AxiosInstance;
  private config: Required<NOWNodesStacksConfig>;

  constructor(config: NOWNodesStacksConfig) {
    if (!config.apiKey) {
      throw new Error('NOWNodes API key is required');
    }

    this.config = {
      apiKey: config.apiKey,
      baseURL: config.baseURL || 'https://stx.nownodes.io',
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
   * Get account balance and info
   */
  async getAccountInfo(principal: string): Promise<NOWNodesAccountInfo> {
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
  async getTransaction(txId: string): Promise<NOWNodesTransaction> {
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
  ): Promise<{ results: NOWNodesTransaction[]; total: number; limit: number; offset: number }> {
    const response = await this.client.get(`/extended/v1/address/${principal}/transactions`, {
      params: { limit, offset },
    });
    return response.data;
  }

  /**
   * Get mempool transactions for an address
   */
  async getMempoolTransactions(
    principal: string,
    limit: number = 50,
    offset: number = 0
  ): Promise<{ results: unknown[]; total: number }> {
    const response = await this.client.get(`/extended/v1/address/${principal}/mempool`, {
      params: { limit, offset },
    });
    return response.data;
  }

  /**
   * Get block by height or hash
   */
  async getBlock(heightOrHash: number | string): Promise<NOWNodesBlock> {
    const response = await this.client.get(`/extended/v1/block/${heightOrHash}`);
    return response.data;
  }

  /**
   * Get recent blocks
   */
  async getRecentBlocks(
    limit: number = 20,
    offset: number = 0
  ): Promise<{ results: NOWNodesBlock[]; total: number }> {
    const response = await this.client.get('/extended/v1/block', {
      params: { limit, offset },
    });
    return response.data;
  }

  /**
   * Get contract by ID
   */
  async getContract(contractId: string): Promise<NOWNodesContract> {
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
   * Get STX transfers for an address
   */
  async getSTXTransfers(
    principal: string,
    limit: number = 50,
    offset: number = 0
  ): Promise<{ results: unknown[]; total: number }> {
    const response = await this.client.get(`/extended/v1/address/${principal}/stx`, {
      params: { limit, offset },
    });
    return response.data;
  }

  /**
   * Get fungible token holdings
   */
  async getFungibleTokens(principal: string): Promise<{ fungible_tokens: unknown[] }> {
    const response = await this.client.get(`/extended/v1/address/${principal}/assets`);
    return response.data;
  }

  /**
   * Get non-fungible token holdings
   */
  async getNonFungibleTokens(principal: string): Promise<{ non_fungible_tokens: unknown[] }> {
    const response = await this.client.get(`/extended/v1/address/${principal}/assets`);
    return response.data;
  }

  /**
   * Get network info
   */
  async getNetworkInfo(): Promise<{
    peer_version: number;
    pox_consensus: string;
    burn_block_height: number;
    stable_pox_consensus: string;
    stable_burn_block_height: number;
    server_version: string;
    network_id: number;
    parent_network_id: number;
    stacks_tip_height: number;
    stacks_tip: string;
    stacks_tip_consensus_hash: string;
    unanchored_tip: string;
    unanchored_seq: number;
    exit_at_block_height: number | null;
  }> {
    const response = await this.client.get('/v2/info');
    return response.data;
  }

  /**
   * Get current block height
   */
  async getBlockHeight(): Promise<number> {
    const info = await this.getNetworkInfo();
    return info.stacks_tip_height;
  }

  /**
   * Get current burn block height
   */
  async getBurnBlockHeight(): Promise<number> {
    const info = await this.getNetworkInfo();
    return info.burn_block_height;
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
   * Get fee estimation
   */
  async getFeeEstimate(transaction: unknown): Promise<unknown> {
    const response = await this.client.post('/v2/fees/transaction', transaction);
    return response.data;
  }

  /**
   * Get mempool statistics
   */
  async getMempoolStats(): Promise<unknown> {
    const response = await this.client.get('/extended/v1/tx/mempool/stats');
    return response.data;
  }

  /**
   * Get STX supply information
   */
  async getSTXSupply(): Promise<{
    unlocked_percent: string;
    total_stx: string;
    unlocked_stx: string;
    block_height: number;
  }> {
    const response = await this.client.get('/extended/v1/stx_supply');
    return response.data;
  }

  /**
   * Search by hash, address, or block
   */
  async search(query: string): Promise<{
    found: boolean;
    result: {
      entity_type: string;
      entity_id: string;
      block_data?: NOWNodesBlock;
      tx_data?: NOWNodesTransaction;
      metadata?: unknown;
    };
  }> {
    const response = await this.client.get(`/extended/v1/search/${query}`);
    return response.data;
  }
}

// Factory function (API key required)
export const createNOWNodesStacksAPI = (apiKey: string) => {
  return new NOWNodesStacksAPI({ apiKey });
};

