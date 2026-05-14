/**
 * Solana Beach API for Solana (SOL)
 * 
 * User-friendly block explorer with staking and validator information
 * 
 * Features:
 * - Free API access with rate limits
 * - Block explorer
 * - Staking information
 * - Validator statistics
 * - Epoch data
 * - Network analytics
 * - Account tracking
 * 
 * Documentation: https://solanabeach.io/api
 * Website: https://solanabeach.io/
 */

import axios, { AxiosInstance } from 'axios';

// API Configuration
export interface SolanaBeachConfig {
  baseURL?: string;
  apiKey?: string;
  timeout?: number;
  retries?: number;
}

// Account Information
export interface SolanaBeachAccount {
  address: string;
  lamports: number;
  owner: string;
  executable: boolean;
  rentEpoch: number;
  data?: unknown;
  type?: string;
}

// Transaction
export interface SolanaBeachTransaction {
  signature: string;
  slot: number;
  blockTime: number;
  fee: number;
  status: string;
  accounts: string[];
  instructions: unknown[];
  logs?: string[];
  error?: string;
}

// Validator Information
export interface SolanaBeachValidator {
  pubkey: string;
  name?: string;
  identity: string;
  voteAccount: string;
  activatedStake: number;
  commission: number;
  lastVote: number;
  rootSlot: number;
  credits: number;
  epochCredits: number;
  epochVoteAccount: boolean;
  version?: string;
  delinquent: boolean;
  dataCenter?: string;
  website?: string;
  iconUrl?: string;
}

// Epoch Information
export interface SolanaBeachEpoch {
  epoch: number;
  startSlot: number;
  endSlot: number;
  startTime: number;
  endTime?: number;
  slots: number;
  completedSlots: number;
  blocksProduced: number;
  transactionCount: number;
}

// Block Information
export interface SolanaBeachBlock {
  slot: number;
  blockhash: string;
  previousBlockhash: string;
  parentSlot: number;
  blockTime: number;
  blockHeight: number;
  transactionCount: number;
  leader: string;
  rewards?: unknown[];
}

// Staking Information
export interface SolanaBeachStakeAccount {
  address: string;
  staker: string;
  withdrawer: string;
  voter: string;
  activationEpoch: number;
  deactivationEpoch: number;
  balance: number;
  rentExemptReserve: number;
  stake: number;
}

// Network Statistics
export interface SolanaBeachNetworkStats {
  epoch: number;
  slot: number;
  blockHeight: number;
  transactionCount: number;
  tps: number;
  averageTps: number;
  validatorCount: number;
  activeStake: number;
  totalSupply: number;
  inflationRate: number;
}

export class SolanaBeachAPI {
  private client: AxiosInstance;
  private config: Required<Omit<SolanaBeachConfig, 'apiKey'>> & { apiKey?: string };

  constructor(config: SolanaBeachConfig = {}) {
    this.config = {
      baseURL: config.baseURL || 'https://api.solanabeach.io/v1',
      apiKey: config.apiKey,
      timeout: config.timeout || 30000,
      retries: config.retries || 3,
    };

    this.client = axios.create({
      baseURL: this.config.baseURL,
      timeout: this.config.timeout,
      headers: {
        'Content-Type': 'application/json',
        ...(this.config.apiKey && { 'Authorization': `Bearer ${this.config.apiKey}` }),
      },
    });
  }

  /**
   * Get account information
   */
  async getAccountInfo(address: string): Promise<SolanaBeachAccount> {
    const response = await this.client.get(`/account/${address}`);
    return response.data;
  }

  /**
   * Get account balance
   */
  async getBalance(address: string): Promise<number> {
    const accountInfo = await this.getAccountInfo(address);
    return accountInfo.lamports;
  }

  /**
   * Get transaction by signature
   */
  async getTransaction(signature: string): Promise<SolanaBeachTransaction> {
    const response = await this.client.get(`/transaction/${signature}`);
    return response.data;
  }

  /**
   * Get transaction history for an address
   */
  async getTransactionHistory(
    address: string,
    limit: number = 50,
    offset: number = 0
  ): Promise<SolanaBeachTransaction[]> {
    const response = await this.client.get(`/account/${address}/transactions`, {
      params: { limit, offset },
    });
    return response.data || [];
  }

  /**
   * Get block information
   */
  async getBlock(slot: number): Promise<SolanaBeachBlock> {
    const response = await this.client.get(`/block/${slot}`);
    return response.data;
  }

  /**
   * Get latest blocks
   */
  async getLatestBlocks(limit: number = 10): Promise<SolanaBeachBlock[]> {
    const response = await this.client.get('/latest-blocks', {
      params: { limit },
    });
    return response.data || [];
  }

  /**
   * Get validator information
   */
  async getValidator(pubkey: string): Promise<SolanaBeachValidator> {
    const response = await this.client.get(`/validator/${pubkey}`);
    return response.data;
  }

  /**
   * Get all validators
   */
  async getValidators(limit: number = 100, offset: number = 0): Promise<SolanaBeachValidator[]> {
    const response = await this.client.get('/validators', {
      params: { limit, offset },
    });
    return response.data || [];
  }

  /**
   * Get validator by vote account
   */
  async getValidatorByVoteAccount(voteAccount: string): Promise<SolanaBeachValidator> {
    const response = await this.client.get(`/validator/vote/${voteAccount}`);
    return response.data;
  }

  /**
   * Get epoch information
   */
  async getEpoch(epoch?: number): Promise<SolanaBeachEpoch> {
    const url = epoch !== undefined ? `/epoch/${epoch}` : '/epoch/latest';
    const response = await this.client.get(url);
    return response.data;
  }

  /**
   * Get current epoch
   */
  async getCurrentEpoch(): Promise<SolanaBeachEpoch> {
    return this.getEpoch();
  }

  /**
   * Get epoch validators
   */
  async getEpochValidators(epoch?: number): Promise<SolanaBeachValidator[]> {
    const epochNum = epoch !== undefined ? epoch : (await this.getCurrentEpoch()).epoch;
    const response = await this.client.get(`/epoch/${epochNum}/validators`);
    return response.data || [];
  }

  /**
   * Get stake accounts for an address
   */
  async getStakeAccounts(address: string): Promise<SolanaBeachStakeAccount[]> {
    const response = await this.client.get(`/account/${address}/stake-accounts`);
    return response.data || [];
  }

  /**
   * Get stake account information
   */
  async getStakeAccount(address: string): Promise<SolanaBeachStakeAccount> {
    const response = await this.client.get(`/stake-account/${address}`);
    return response.data;
  }

  /**
   * Get delegations for a validator
   */
  async getValidatorDelegations(
    validatorPubkey: string,
    limit: number = 100,
    offset: number = 0
  ): Promise<unknown[]> {
    const response = await this.client.get(`/validator/${validatorPubkey}/delegations`, {
      params: { limit, offset },
    });
    return response.data || [];
  }

  /**
   * Get network statistics
   */
  async getNetworkStats(): Promise<SolanaBeachNetworkStats> {
    const response = await this.client.get('/network/stats');
    return response.data;
  }

  /**
   * Get inflation information
   */
  async getInflation(): Promise<unknown> {
    const response = await this.client.get('/network/inflation');
    return response.data;
  }

  /**
   * Get supply information
   */
  async getSupply(): Promise<{
    total: number;
    circulating: number;
    nonCirculating: number;
  }> {
    const response = await this.client.get('/network/supply');
    return response.data;
  }

  /**
   * Get TPS (transactions per second) history
   */
  async getTpsHistory(hours: number = 24): Promise<Array<{
    timestamp: number;
    tps: number;
  }>> {
    const response = await this.client.get('/network/tps', {
      params: { hours },
    });
    return response.data || [];
  }

  /**
   * Search for accounts, transactions, or blocks
   */
  async search(query: string): Promise<{
    type: 'account' | 'transaction' | 'block';
    data: unknown;
  }> {
    const response = await this.client.get('/search', {
      params: { q: query },
    });
    return response.data;
  }
}

// Singleton instance
export const solanaBeachAPI = new SolanaBeachAPI();

// Factory function for custom configuration
export const createSolanaBeachAPI = (apiKey?: string) => {
  return new SolanaBeachAPI({ apiKey });
};

