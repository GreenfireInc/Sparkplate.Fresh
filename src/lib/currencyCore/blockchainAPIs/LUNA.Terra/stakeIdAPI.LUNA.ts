/**
 * Stake.ID API for Terra 2.0 (LUNA)
 * 
 * Explorer for Terra network providing search and data access
 * 
 * Features:
 * - Free access
 * - Search addresses, blocks, transactions, validators
 * - Key statistics and metrics
 * - Network visualization
 * 
 * Website: https://terra.stake.id/
 */

import axios, { AxiosInstance } from 'axios';

// API Configuration
export interface StakeIdConfig {
  baseURL?: string;
  timeout?: number;
  retries?: number;
}

// Account Information
export interface StakeIdAccountInfo {
  address: string;
  account_number: string;
  sequence: string;
  balances: Array<{
    denom: string;
    amount: string;
  }>;
  delegations: Array<{
    validator_address: string;
    amount: string;
  }>;
  unbonding: Array<{
    validator_address: string;
    amount: string;
    completion_time: string;
  }>;
  rewards: Array<{
    validator_address: string;
    reward: Array<{
      denom: string;
      amount: string;
    }>;
  }>;
}

// Transaction
export interface StakeIdTransaction {
  hash: string;
  height: number;
  timestamp: string;
  code: number;
  gas_wanted: string;
  gas_used: string;
  fee: Array<{
    denom: string;
    amount: string;
  }>;
  memo: string;
  messages: Array<{
    type: string;
    value: unknown;
  }>;
  logs: unknown[];
}

// Block
export interface StakeIdBlock {
  height: number;
  hash: string;
  time: string;
  chain_id: string;
  proposer_address: string;
  num_txs: number;
  total_gas_used: string;
  total_gas_wanted: string;
}

// Validator
export interface StakeIdValidator {
  operator_address: string;
  consensus_address: string;
  jailed: boolean;
  status: number;
  tokens: string;
  delegator_shares: string;
  description: {
    moniker: string;
    identity: string;
    website: string;
    security_contact: string;
    details: string;
  };
  commission: {
    rate: string;
    max_rate: string;
    max_change_rate: string;
    update_time: string;
  };
  min_self_delegation: string;
  voting_power: string;
  rank: number;
}

// Statistics
export interface StakeIdStats {
  total_supply: string;
  bonded_tokens: string;
  not_bonded_tokens: string;
  bonded_ratio: string;
  inflation: string;
  community_pool: Array<{
    denom: string;
    amount: string;
  }>;
  staking_apr: string;
}

export class StakeIdAPI {
  private client: AxiosInstance;
  private config: Required<StakeIdConfig>;

  constructor(config: StakeIdConfig = {}) {
    this.config = {
      baseURL: config.baseURL || 'https://terra.stake.id/api',
      timeout: config.timeout || 10000,
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
  async getAccountInfo(address: string): Promise<StakeIdAccountInfo> {
    const response = await this.client.get(`/accounts/${address}`);
    return response.data;
  }

  /**
   * Get account balance
   */
  async getBalance(address: string): Promise<Array<{ denom: string; amount: string }>> {
    const response = await this.client.get(`/accounts/${address}/balances`);
    return response.data.balances || [];
  }

  /**
   * Get transaction by hash
   */
  async getTransaction(txHash: string): Promise<StakeIdTransaction> {
    const response = await this.client.get(`/transactions/${txHash}`);
    return response.data;
  }

  /**
   * Get transaction history for an address
   */
  async getTransactionHistory(
    address: string,
    limit: number = 50,
    offset: number = 0
  ): Promise<StakeIdTransaction[]> {
    const response = await this.client.get(`/accounts/${address}/transactions`, {
      params: { limit, offset },
    });
    return response.data.transactions || [];
  }

  /**
   * Get block by height
   */
  async getBlock(height: number): Promise<StakeIdBlock> {
    const response = await this.client.get(`/blocks/${height}`);
    return response.data;
  }

  /**
   * Get latest block
   */
  async getLatestBlock(): Promise<StakeIdBlock> {
    const response = await this.client.get('/blocks/latest');
    return response.data;
  }

  /**
   * Get current block height
   */
  async getCurrentHeight(): Promise<number> {
    const block = await this.getLatestBlock();
    return block.height;
  }

  /**
   * Get recent blocks
   */
  async getRecentBlocks(limit: number = 20): Promise<StakeIdBlock[]> {
    const response = await this.client.get('/blocks', {
      params: { limit },
    });
    return response.data.blocks || [];
  }

  /**
   * Get validators
   */
  async getValidators(status?: string): Promise<StakeIdValidator[]> {
    const response = await this.client.get('/validators', {
      params: status ? { status } : {},
    });
    return response.data.validators || [];
  }

  /**
   * Get validator by address
   */
  async getValidator(validatorAddress: string): Promise<StakeIdValidator> {
    const response = await this.client.get(`/validators/${validatorAddress}`);
    return response.data;
  }

  /**
   * Get delegations for an address
   */
  async getDelegations(address: string): Promise<unknown[]> {
    const response = await this.client.get(`/accounts/${address}/delegations`);
    return response.data.delegations || [];
  }

  /**
   * Get unbonding delegations for an address
   */
  async getUnbondingDelegations(address: string): Promise<unknown[]> {
    const response = await this.client.get(`/accounts/${address}/unbonding_delegations`);
    return response.data.unbonding_delegations || [];
  }

  /**
   * Get staking rewards for an address
   */
  async getRewards(address: string): Promise<unknown[]> {
    const response = await this.client.get(`/accounts/${address}/rewards`);
    return response.data.rewards || [];
  }

  /**
   * Get chain statistics
   */
  async getChainStats(): Promise<StakeIdStats> {
    const response = await this.client.get('/stats');
    return response.data;
  }

  /**
   * Search across the blockchain
   */
  async search(query: string): Promise<{
    type: 'account' | 'transaction' | 'block' | 'validator';
    result: unknown;
  }> {
    const response = await this.client.get('/search', {
      params: { q: query },
    });
    return response.data;
  }

  /**
   * Get network parameters
   */
  async getParams(): Promise<unknown> {
    const response = await this.client.get('/params');
    return response.data;
  }

  /**
   * Get proposals (governance)
   */
  async getProposals(status?: string): Promise<unknown[]> {
    const response = await this.client.get('/proposals', {
      params: status ? { status } : {},
    });
    return response.data.proposals || [];
  }

  /**
   * Get proposal by ID
   */
  async getProposal(proposalId: number): Promise<unknown> {
    const response = await this.client.get(`/proposals/${proposalId}`);
    return response.data;
  }
}

// Singleton instance
export const stakeIdAPI = new StakeIdAPI();

