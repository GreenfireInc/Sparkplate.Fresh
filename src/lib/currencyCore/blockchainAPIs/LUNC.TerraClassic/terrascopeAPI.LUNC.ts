/**
 * Terrasco.pe (Chainscope) API for Terra Classic (LUNC)
 * 
 * Terra Classic focused blockchain explorer
 * 
 * Features:
 * - Free access with rate limits
 * - Terra Classic specific data
 * - Account, transaction, and block information
 * - Historical data and analytics
 * 
 * Website: https://terrasco.pe/
 */

import axios, { AxiosInstance } from 'axios';

// API Configuration
export interface TerrascopeConfig {
  baseURL?: string;
  timeout?: number;
  retries?: number;
}

// Account Information
export interface TerrascopeAccountInfo {
  address: string;
  account_number: string;
  sequence: string;
  balances: Array<{
    denom: string;
    amount: string;
    available: string;
  }>;
  vesting: {
    original_vesting: Array<{
      denom: string;
      amount: string;
    }>;
    delegated_free: Array<{
      denom: string;
      amount: string;
    }>;
    delegated_vesting: Array<{
      denom: string;
      amount: string;
    }>;
    end_time: string;
  };
}

// Transaction
export interface TerrascopeTransaction {
  txhash: string;
  height: number;
  timestamp: string;
  code: number;
  codespace?: string;
  gas_wanted: string;
  gas_used: string;
  fee: Array<{
    denom: string;
    amount: string;
  }>;
  memo: string;
  messages: Array<{
    '@type': string;
    [key: string]: unknown;
  }>;
  events: Array<{
    type: string;
    attributes: Array<{
      key: string;
      value: string;
    }>;
  }>;
  logs: unknown[];
}

// Block
export interface TerrascopeBlock {
  height: number;
  hash: string;
  time: string;
  chain_id: string;
  proposer: {
    operator_address: string;
    moniker: string;
  };
  txs: number;
  signatures: number;
  total_gas_used: string;
  total_gas_wanted: string;
}

// Validator
export interface TerrascopeValidator {
  operator_address: string;
  consensus_address: string;
  consensus_pubkey: {
    '@type': string;
    key: string;
  };
  jailed: boolean;
  status: string;
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
    commission_rates: {
      rate: string;
      max_rate: string;
      max_change_rate: string;
    };
    update_time: string;
  };
  min_self_delegation: string;
  voting_power: string;
  voting_power_percentage: number;
  rank: number;
  uptime: number;
  missed_blocks: number;
}

// Delegation
export interface TerrascopeDelegation {
  delegator_address: string;
  validator_address: string;
  validator_moniker: string;
  shares: string;
  balance: {
    denom: string;
    amount: string;
  };
}

// Statistics
export interface TerrascopeStats {
  chain_id: string;
  block_height: number;
  block_time: number;
  total_txs: number;
  bonded_tokens: string;
  not_bonded_tokens: string;
  total_supply: string;
  bonded_ratio: number;
  inflation: string;
  community_pool: Array<{
    denom: string;
    amount: string;
  }>;
  tax_rate: string;
}

export class TerrascopeAPI {
  private client: AxiosInstance;
  private config: Required<TerrascopeConfig>;

  constructor(config: TerrascopeConfig = {}) {
    this.config = {
      baseURL: config.baseURL || 'https://terrasco.pe/api',
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
  async getAccountInfo(address: string): Promise<TerrascopeAccountInfo> {
    const response = await this.client.get(`/account/${address}`);
    return response.data;
  }

  /**
   * Get account balance
   */
  async getBalance(address: string): Promise<Array<{ denom: string; amount: string }>> {
    const response = await this.client.get(`/account/${address}/balance`);
    return response.data.balances || [];
  }

  /**
   * Get transaction by hash
   */
  async getTransaction(txHash: string): Promise<TerrascopeTransaction> {
    const response = await this.client.get(`/tx/${txHash}`);
    return response.data;
  }

  /**
   * Get transaction history for an address
   */
  async getTransactionHistory(
    address: string,
    limit: number = 50,
    offset: number = 0
  ): Promise<TerrascopeTransaction[]> {
    const response = await this.client.get(`/account/${address}/txs`, {
      params: { limit, offset },
    });
    return response.data.txs || [];
  }

  /**
   * Get block by height
   */
  async getBlock(height: number): Promise<TerrascopeBlock> {
    const response = await this.client.get(`/block/${height}`);
    return response.data;
  }

  /**
   * Get latest block
   */
  async getLatestBlock(): Promise<TerrascopeBlock> {
    const response = await this.client.get('/block/latest');
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
  async getRecentBlocks(limit: number = 20): Promise<TerrascopeBlock[]> {
    const response = await this.client.get('/blocks', {
      params: { limit },
    });
    return response.data.blocks || [];
  }

  /**
   * Get validators
   */
  async getValidators(status?: string): Promise<TerrascopeValidator[]> {
    const response = await this.client.get('/validators', {
      params: status ? { status } : {},
    });
    return response.data.validators || [];
  }

  /**
   * Get validator by address
   */
  async getValidator(validatorAddress: string): Promise<TerrascopeValidator> {
    const response = await this.client.get(`/validator/${validatorAddress}`);
    return response.data;
  }

  /**
   * Get validator delegators
   */
  async getValidatorDelegators(validatorAddress: string, limit: number = 100): Promise<unknown[]> {
    const response = await this.client.get(`/validator/${validatorAddress}/delegators`, {
      params: { limit },
    });
    return response.data.delegators || [];
  }

  /**
   * Get delegations for an address
   */
  async getDelegations(address: string): Promise<TerrascopeDelegation[]> {
    const response = await this.client.get(`/account/${address}/delegations`);
    return response.data.delegations || [];
  }

  /**
   * Get unbonding delegations for an address
   */
  async getUnbondingDelegations(address: string): Promise<unknown[]> {
    const response = await this.client.get(`/account/${address}/unbonding_delegations`);
    return response.data.unbonding_delegations || [];
  }

  /**
   * Get redelegations for an address
   */
  async getRedelegations(address: string): Promise<unknown[]> {
    const response = await this.client.get(`/account/${address}/redelegations`);
    return response.data.redelegations || [];
  }

  /**
   * Get staking rewards for an address
   */
  async getRewards(address: string): Promise<unknown> {
    const response = await this.client.get(`/account/${address}/rewards`);
    return response.data;
  }

  /**
   * Get chain statistics
   */
  async getChainStats(): Promise<TerrascopeStats> {
    const response = await this.client.get('/stats');
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
    const response = await this.client.get(`/proposal/${proposalId}`);
    return response.data;
  }

  /**
   * Get proposal votes
   */
  async getProposalVotes(proposalId: number, limit: number = 100): Promise<unknown[]> {
    const response = await this.client.get(`/proposal/${proposalId}/votes`, {
      params: { limit },
    });
    return response.data.votes || [];
  }

  /**
   * Get proposal deposits
   */
  async getProposalDeposits(proposalId: number): Promise<unknown[]> {
    const response = await this.client.get(`/proposal/${proposalId}/deposits`);
    return response.data.deposits || [];
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
   * Get historical data for charts
   */
  async getHistoricalData(metric: string, days: number = 30): Promise<Array<{
    timestamp: number;
    value: number;
  }>> {
    const response = await this.client.get('/historical', {
      params: { metric, days },
    });
    return response.data.data || [];
  }
}

// Singleton instance
export const terrascopeAPI = new TerrascopeAPI();

