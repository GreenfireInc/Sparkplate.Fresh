/**
 * TzStats API for Tezos (XTZ)
 * 
 * Analytics-focused Tezos Explorer by Blockwatch
 * 
 * Features:
 * - Free API access
 * - In-depth blockchain statistics
 * - Michelson decoding
 * - Full BigMap support
 * - Time-series and table APIs
 * - Advanced analytics
 * - Market data
 * 
 * Documentation: https://tzstats.com/docs/api
 * Website: https://tzstats.com/
 */

import axios, { AxiosInstance } from 'axios';

// API Configuration
export interface TzStatsConfig {
  baseURL?: string;
  timeout?: number;
  retries?: number;
}

// Account Info
export interface TzStatsAccount {
  address: string;
  address_type: string;
  pubkey?: string;
  counter: number;
  baker?: string;
  creator?: string;
  first_seen: number;
  last_seen: number;
  first_seen_time: string;
  last_seen_time: string;
  delegated_since: number;
  delegated_since_time: string;
  total_received: number;
  total_sent: number;
  total_burned: number;
  total_fees_paid: number;
  unclaimed_balance: number;
  spendable_balance: number;
  frozen_balance: number;
  is_funded: boolean;
  is_activated: boolean;
  is_delegated: boolean;
  is_revealed: boolean;
  is_baker: boolean;
  is_contract: boolean;
  n_ops: number;
  n_ops_failed: number;
  n_tx: number;
  n_delegation: number;
  n_origination: number;
  n_constants: number;
  token_gen_min: number;
  token_gen_max: number;
  metadata?: Record<string, unknown>;
}

// Operation
export interface TzStatsOperation {
  row_id: number;
  hash: string;
  type: string;
  block: string;
  time: string;
  height: number;
  cycle: number;
  counter: number;
  op_n: number;
  op_p: number;
  status: string;
  is_success: boolean;
  is_contract: boolean;
  gas_limit: number;
  gas_used: number;
  gas_price: number;
  storage_limit: number;
  storage_size: number;
  storage_paid: number;
  volume: number;
  fee: number;
  reward: number;
  deposit: number;
  burned: number;
  sender?: string;
  receiver?: string;
  creator?: string;
  baker?: string;
  data?: string;
  parameters?: unknown;
  storage?: unknown;
  big_map_diff?: unknown;
  errors?: unknown;
}

// Block
export interface TzStatsBlock {
  hash: string;
  predecessor: string;
  baker: string;
  height: number;
  cycle: number;
  is_cycle_snapshot: boolean;
  time: string;
  solvetime: number;
  version: number;
  round: number;
  nonce: string;
  voting_period_kind: string;
  n_endorsed_slots: number;
  n_ops: number;
  n_ops_failed: number;
  n_ops_contract: number;
  n_tx: number;
  n_activation: number;
  n_seed_nonce_revelations: number;
  n_double_baking_evidence: number;
  n_double_endorsement_evidence: number;
  n_endorsement: number;
  n_delegation: number;
  n_reveal: number;
  n_origination: number;
  n_proposal: number;
  n_ballot: number;
  volume: number;
  fee: number;
  reward: number;
  deposit: number;
  activated_supply: number;
  burned_supply: number;
  n_accounts: number;
  n_new_accounts: number;
  n_new_contracts: number;
  n_cleared_accounts: number;
  n_funded_accounts: number;
  gas_limit: number;
  gas_used: number;
  gas_price: number;
  storage_paid: number;
}

export class TzStatsAPI {
  private client: AxiosInstance;
  private config: Required<TzStatsConfig>;

  constructor(config: TzStatsConfig = {}) {
    this.config = {
      baseURL: config.baseURL || 'https://api.tzstats.com',
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
   * Get account information
   */
  async getAccount(address: string): Promise<TzStatsAccount> {
    const response = await this.client.get(`/explorer/account/${address}`);
    return response.data;
  }

  /**
   * Get account balance in XTZ
   */
  async getBalance(address: string): Promise<number> {
    const account = await this.getAccount(address);
    // Balance is already in XTZ (tez)
    return account.spendable_balance / 1000000;
  }

  /**
   * Get account operations
   */
  async getOperations(address: string, limit: number = 50): Promise<TzStatsOperation[]> {
    const response = await this.client.get(`/explorer/account/${address}/operations`, {
      params: { limit },
    });
    return response.data;
  }

  /**
   * Get operation by hash
   */
  async getOperation(hash: string): Promise<TzStatsOperation[]> {
    const response = await this.client.get(`/explorer/op/${hash}`);
    return response.data;
  }

  /**
   * Get block by height
   */
  async getBlock(height: number): Promise<TzStatsBlock> {
    const response = await this.client.get(`/explorer/block/${height}`);
    return response.data;
  }

  /**
   * Get block by hash
   */
  async getBlockByHash(hash: string): Promise<TzStatsBlock> {
    const response = await this.client.get(`/explorer/block/${hash}`);
    return response.data;
  }

  /**
   * Get current head block
   */
  async getHead(): Promise<TzStatsBlock> {
    const response = await this.client.get('/explorer/block/head');
    return response.data;
  }

  /**
   * Get contract info
   */
  async getContract(address: string): Promise<TzStatsAccount> {
    const response = await this.client.get(`/explorer/contract/${address}`);
    return response.data;
  }

  /**
   * Get contract calls
   */
  async getContractCalls(address: string, limit: number = 50): Promise<TzStatsOperation[]> {
    const response = await this.client.get(`/explorer/contract/${address}/calls`, {
      params: { limit },
    });
    return response.data;
  }

  /**
   * Get contract storage
   */
  async getContractStorage(address: string): Promise<unknown> {
    const response = await this.client.get(`/explorer/contract/${address}/storage`);
    return response.data;
  }

  /**
   * Get market data
   */
  async getMarketData(): Promise<{
    pair: string;
    base: string;
    quote: string;
    exchange: string;
    open: number;
    high: number;
    low: number;
    last: number;
    change: number;
    vwap: number;
    n_trades: number;
    volume_base: number;
    volume_quote: number;
    timestamp: string;
  }[]> {
    const response = await this.client.get('/markets/tickers');
    return response.data;
  }

  /**
   * Get supply info
   */
  async getSupply(): Promise<{
    row_id: number;
    height: number;
    cycle: number;
    time: string;
    total: number;
    activated: number;
    unclaimed: number;
    circulating: number;
    liquid: number;
    delegated: number;
    staking: number;
    shielded: number;
    active_delegated: number;
    active_staking: number;
    inactive_delegated: number;
    inactive_staking: number;
    minted: number;
    minted_baking: number;
    minted_endorsing: number;
    minted_seeding: number;
    minted_airdrop: number;
    burned: number;
    burned_double_baking: number;
    burned_double_endorse: number;
    burned_origination: number;
    burned_implicit: number;
    burned_seed_miss: number;
    burned_absent: number;
    burned_rollup: number;
    frozen: number;
    frozen_deposits: number;
    frozen_rewards: number;
    frozen_fees: number;
    frozen_bonds: number;
  }> {
    const response = await this.client.get('/explorer/supply');
    return response.data;
  }

  /**
   * Get statistics
   */
  async getStatistics(): Promise<{
    total_accounts: number;
    total_implicit: number;
    total_managed: number;
    total_contracts: number;
    total_rollups: number;
    funded_accounts: number;
    total_ops: number;
    total_ops_failed: number;
    total_contract_ops: number;
    total_activations: number;
    total_seed_nonce_revelations: number;
    total_endorsements: number;
    total_preendorsements: number;
    total_double_baking: number;
    total_double_endorsing: number;
    total_double_preendorsing: number;
    total_delegations: number;
    total_reveals: number;
    total_originations: number;
    total_transactions: number;
    total_proposals: number;
    total_ballots: number;
    total_storage_bytes: number;
    total_paid_bytes: number;
    total_used_bytes: number;
  }> {
    const response = await this.client.get('/explorer/status');
    return response.data;
  }

  /**
   * Search
   */
  async search(query: string): Promise<{
    type: string;
    value: string;
  }[]> {
    const response = await this.client.get('/explorer/search', {
      params: { q: query },
    });
    return response.data;
  }
}

// Singleton instance
export const tzstatsAPI = new TzStatsAPI();

// Factory function for custom configuration
export const createTzStatsAPI = (config: TzStatsConfig) => {
  return new TzStatsAPI(config);
};
