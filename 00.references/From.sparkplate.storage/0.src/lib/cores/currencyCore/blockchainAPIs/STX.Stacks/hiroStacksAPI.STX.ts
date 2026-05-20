/**
 * Hiro Stacks Blockchain API for Stacks (STX)
 * 
 * Comprehensive REST API for Stacks blockchain data
 * 
 * Features:
 * - Free access with rate limits
 * - High-performance REST interface
 * - Transaction queries and filtering
 * - Smart contract interaction
 * - Block and microblock data
 * - Account information
 * - Token metadata
 * - Mempool tracking
 * 
 * Documentation: https://docs.hiro.so/stacks-blockchain-api
 * Website: https://www.hiro.so/stacks-api
 */

import axios, { AxiosInstance } from 'axios';

// API Configuration
export interface HiroStacksConfig {
  baseURL?: string;
  apiKey?: string;
  timeout?: number;
  retries?: number;
  network?: 'mainnet' | 'testnet';
}

// Account Information
export interface HiroAccountInfo {
  balance: string;
  locked: string;
  unlock_height: number;
  nonce: number;
  balance_proof: string;
  nonce_proof: string;
}

// Transaction
export interface HiroTransaction {
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
  tx_status: 'success' | 'abort_by_response' | 'abort_by_post_condition';
  tx_result: {
    hex: string;
    repr: string;
  };
  tx_type: 'token_transfer' | 'smart_contract' | 'contract_call' | 'poison_microblock' | 'coinbase';
  token_transfer?: {
    recipient_address: string;
    amount: string;
    memo: string;
  };
  smart_contract?: {
    contract_id: string;
    source_code: string;
  };
  contract_call?: {
    contract_id: string;
    function_name: string;
    function_signature: string;
    function_args?: unknown[];
  };
  events: unknown[];
}

// Block Information
export interface HiroBlock {
  canonical: boolean;
  height: number;
  hash: string;
  parent_block_hash: string;
  burn_block_time: number;
  burn_block_time_iso: string;
  burn_block_hash: string;
  burn_block_height: number;
  miner_txid: string;
  parent_microblock_hash: string;
  parent_microblock_sequence: number;
  txs: string[];
  microblocks_accepted: string[];
  microblocks_streamed: string[];
  execution_cost_read_count: number;
  execution_cost_read_length: number;
  execution_cost_runtime: number;
  execution_cost_write_count: number;
  execution_cost_write_length: number;
}

// Contract Information
export interface HiroContract {
  tx_id: string;
  canonical: boolean;
  contract_id: string;
  block_height: number;
  source_code: string;
  abi: string;
}

// Token Metadata
export interface HiroTokenMetadata {
  token_uri: string;
  name: string;
  description: string;
  image_uri: string;
  image_thumbnail_uri: string;
  image_canonical_uri: string;
  contract_id: string;
  symbol: string;
  decimals: number;
  total_supply: string;
  tx_id: string;
  sender_address: string;
}

// Mempool Transaction
export interface HiroMempoolTx {
  tx_id: string;
  nonce: number;
  fee_rate: string;
  sender_address: string;
  sponsored: boolean;
  post_condition_mode: string;
  tx_status: 'pending';
  receipt_time: number;
  receipt_time_iso: string;
  tx_type: string;
}

export class HiroStacksAPI {
  private client: AxiosInstance;
  private config: Required<Omit<HiroStacksConfig, 'apiKey'>> & { apiKey?: string };

  constructor(config: HiroStacksConfig = {}) {
    const network = config.network || 'mainnet';
    const baseURL = config.baseURL || 
      (network === 'mainnet' 
        ? 'https://api.hiro.so' 
        : 'https://api.testnet.hiro.so');

    this.config = {
      baseURL,
      apiKey: config.apiKey,
      timeout: config.timeout || 30000,
      retries: config.retries || 3,
      network,
    };

    this.client = axios.create({
      baseURL: this.config.baseURL,
      timeout: this.config.timeout,
      headers: {
        'Content-Type': 'application/json',
        ...(this.config.apiKey && { 'x-api-key': this.config.apiKey }),
      },
    });
  }

  /**
   * Get account balance and nonce
   */
  async getAccountInfo(principal: string): Promise<HiroAccountInfo> {
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
  async getTransaction(txId: string): Promise<HiroTransaction> {
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
  ): Promise<{ results: HiroTransaction[]; total: number; limit: number; offset: number }> {
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
  ): Promise<{ results: HiroMempoolTx[]; total: number; limit: number; offset: number }> {
    const response = await this.client.get(`/extended/v1/address/${principal}/mempool`, {
      params: { limit, offset },
    });
    return response.data;
  }

  /**
   * Get block by height or hash
   */
  async getBlock(heightOrHash: number | string): Promise<HiroBlock> {
    const response = await this.client.get(`/extended/v1/block/${heightOrHash}`);
    return response.data;
  }

  /**
   * Get recent blocks
   */
  async getRecentBlocks(
    limit: number = 20,
    offset: number = 0
  ): Promise<{ results: HiroBlock[]; total: number; limit: number; offset: number }> {
    const response = await this.client.get('/extended/v1/block', {
      params: { limit, offset },
    });
    return response.data;
  }

  /**
   * Get contract by ID
   */
  async getContract(contractId: string): Promise<HiroContract> {
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
   * Get account transactions with STX transfers
   */
  async getSTXTransfers(
    principal: string,
    limit: number = 50,
    offset: number = 0
  ): Promise<{ results: unknown[]; total: number; limit: number; offset: number }> {
    const response = await this.client.get(`/extended/v1/address/${principal}/stx`, {
      params: { limit, offset },
    });
    return response.data;
  }

  /**
   * Get fungible token holdings
   */
  async getFungibleTokens(principal: string): Promise<{ results: unknown[] }> {
    const response = await this.client.get(`/extended/v1/address/${principal}/assets`);
    return response.data.fungible_tokens;
  }

  /**
   * Get non-fungible token holdings
   */
  async getNonFungibleTokens(principal: string): Promise<{ results: unknown[] }> {
    const response = await this.client.get(`/extended/v1/address/${principal}/assets`);
    return response.data.non_fungible_tokens;
  }

  /**
   * Get token metadata
   */
  async getTokenMetadata(contractId: string): Promise<HiroTokenMetadata> {
    const response = await this.client.get(`/extended/v1/tokens/${contractId}/ft/metadata`);
    return response.data;
  }

  /**
   * Get NFT metadata
   */
  async getNFTMetadata(contractId: string, tokenId: string): Promise<unknown> {
    const response = await this.client.get(`/extended/v1/tokens/${contractId}/nft/metadata`, {
      params: { token_id: tokenId },
    });
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
    genesis_chainstate_hash: string;
    unanchored_tip: string;
    unanchored_seq: number;
    exit_at_block_height: number | null;
  }> {
    const response = await this.client.get('/v2/info');
    return response.data;
  }

  /**
   * Get current burn block height
   */
  async getBurnBlockHeight(): Promise<number> {
    const info = await this.getNetworkInfo();
    return info.burn_block_height;
  }

  /**
   * Get current Stacks block height
   */
  async getBlockHeight(): Promise<number> {
    const info = await this.getNetworkInfo();
    return info.stacks_tip_height;
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
  async getFeeEstimate(transaction: unknown): Promise<{ estimated_cost: unknown; estimated_cost_scalar: number; cost_scalar_change_by_byte: number }> {
    const response = await this.client.post('/v2/fees/transaction', transaction);
    return response.data;
  }

  /**
   * Search by hash, address, or block
   */
  async search(query: string): Promise<{
    found: boolean;
    result: {
      entity_type: 'block_hash' | 'tx_id' | 'contract_address' | 'standard_address' | 'mempool_tx_id';
      entity_id: string;
      block_data?: HiroBlock;
      tx_data?: HiroTransaction;
      metadata?: unknown;
    };
  }> {
    const response = await this.client.get(`/extended/v1/search/${query}`);
    return response.data;
  }
}

// Singleton instance for mainnet
export const hiroStacksAPI = new HiroStacksAPI();

// Factory function for custom configuration
export const createHiroStacksAPI = (config: HiroStacksConfig) => {
  return new HiroStacksAPI(config);
};

