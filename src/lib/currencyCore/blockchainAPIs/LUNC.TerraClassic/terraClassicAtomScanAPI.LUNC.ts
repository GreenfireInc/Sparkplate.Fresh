/**
 * ATOMScan API for Terra Classic (LUNC)
 * 
 * Dedicated Terra Classic blockchain explorer
 * 
 * Features:
 * - Free access with rate limits
 * - Terra Classic (LUNC) specific tracking
 * - Account and transaction data
 * - Historical data for original Terra chain
 * 
 * Website: https://atomscan.com/terra
 */

import axios, { AxiosInstance } from 'axios';

// API Configuration
export interface TerraClassicAtomScanConfig {
  baseURL?: string;
  timeout?: number;
  retries?: number;
}

// Account Information
export interface TerraClassicAccountInfo {
  address: string;
  balance: {
    denom: string;
    amount: string;
  }[];
  delegations: {
    validator_address: string;
    shares: string;
    balance: string;
  }[];
  unbonding: unknown[];
  rewards: {
    validator_address: string;
    reward: {
      denom: string;
      amount: string;
    }[];
  }[];
}

// Transaction
export interface TerraClassicTransaction {
  hash: string;
  height: number;
  timestamp: string;
  code: number;
  gas_wanted: number;
  gas_used: number;
  tx: {
    body: {
      messages: unknown[];
      memo: string;
    };
    auth_info: {
      fee: {
        amount: {
          denom: string;
          amount: string;
        }[];
        gas_limit: string;
      };
    };
  };
  logs: unknown[];
}

// Block
export interface TerraClassicBlock {
  height: number;
  hash: string;
  time: string;
  chain_id: string;
  proposer: string;
  tx_count: number;
}

// Validator
export interface TerraClassicValidator {
  operator_address: string;
  consensus_pubkey: string;
  jailed: boolean;
  status: string;
  tokens: string;
  delegator_shares: string;
  description: {
    moniker: string;
    identity: string;
    website: string;
    details: string;
  };
  commission: {
    rate: string;
    max_rate: string;
    max_change_rate: string;
  };
  voting_power: string;
}

export class TerraClassicAtomScanAPI {
  private client: AxiosInstance;
  private config: Required<TerraClassicAtomScanConfig>;

  constructor(config: TerraClassicAtomScanConfig = {}) {
    this.config = {
      baseURL: config.baseURL || 'https://atomscan.com/terra/api',
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
  async getAccountInfo(address: string): Promise<TerraClassicAccountInfo> {
    const response = await this.client.get(`/account/${address}`);
    return response.data;
  }

  /**
   * Get account balance
   */
  async getBalance(address: string): Promise<Array<{ denom: string; amount: string }>> {
    const response = await this.client.get(`/account/${address}/balance`);
    return response.data.balance || [];
  }

  /**
   * Get transaction by hash
   */
  async getTransaction(txHash: string): Promise<TerraClassicTransaction> {
    const response = await this.client.get(`/transaction/${txHash}`);
    return response.data;
  }

  /**
   * Get transaction history for an address
   */
  async getTransactionHistory(
    address: string,
    limit: number = 50,
    offset: number = 0
  ): Promise<TerraClassicTransaction[]> {
    const response = await this.client.get(`/account/${address}/transactions`, {
      params: { limit, offset },
    });
    return response.data.transactions || [];
  }

  /**
   * Get block by height
   */
  async getBlock(height: number): Promise<TerraClassicBlock> {
    const response = await this.client.get(`/block/${height}`);
    return response.data;
  }

  /**
   * Get latest blocks
   */
  async getLatestBlocks(limit: number = 20): Promise<TerraClassicBlock[]> {
    const response = await this.client.get('/blocks/latest', {
      params: { limit },
    });
    return response.data.blocks || [];
  }

  /**
   * Get current block height
   */
  async getCurrentHeight(): Promise<number> {
    const blocks = await this.getLatestBlocks(1);
    return blocks[0]?.height || 0;
  }

  /**
   * Get validators
   */
  async getValidators(status: string = 'active'): Promise<TerraClassicValidator[]> {
    const response = await this.client.get('/validators', {
      params: { status },
    });
    return response.data.validators || [];
  }

  /**
   * Get validator by address
   */
  async getValidator(validatorAddress: string): Promise<TerraClassicValidator> {
    const response = await this.client.get(`/validator/${validatorAddress}`);
    return response.data;
  }

  /**
   * Get delegations for an address
   */
  async getDelegations(address: string): Promise<unknown[]> {
    const response = await this.client.get(`/account/${address}/delegations`);
    return response.data.delegations || [];
  }

  /**
   * Get unbonding delegations for an address
   */
  async getUnbondingDelegations(address: string): Promise<unknown[]> {
    const response = await this.client.get(`/account/${address}/unbonding`);
    return response.data.unbonding || [];
  }

  /**
   * Get staking rewards for an address
   */
  async getRewards(address: string): Promise<unknown[]> {
    const response = await this.client.get(`/account/${address}/rewards`);
    return response.data.rewards || [];
  }

  /**
   * Get LUNC price information
   */
  async getPrice(): Promise<{
    price: number;
    market_cap: number;
    volume_24h: number;
    change_24h: number;
  }> {
    const response = await this.client.get('/price');
    return response.data;
  }

  /**
   * Get Terra Classic chain statistics
   */
  async getChainStats(): Promise<{
    total_supply: string;
    bonded_tokens: string;
    inflation: string;
    community_pool: string;
    burn_amount: string;
  }> {
    const response = await this.client.get('/stats');
    return response.data;
  }

  /**
   * Search transactions
   */
  async searchTransactions(query: string, limit: number = 50): Promise<TerraClassicTransaction[]> {
    const response = await this.client.get('/search/transactions', {
      params: { q: query, limit },
    });
    return response.data.transactions || [];
  }
}

// Singleton instance
export const terraClassicAtomScanAPI = new TerraClassicAtomScanAPI();

