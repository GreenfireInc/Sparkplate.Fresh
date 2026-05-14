/**
 * Mintscan API for Terra 2.0 (LUNA)
 * 
 * Official Cosmos ecosystem explorer by Cosmostation
 * 
 * Features:
 * - Free Tier: Up to 2 requests per second and 10,000 daily calls without API key
 * - Account balance and transaction history
 * - Staking information
 * - Validator data
 * 
 * Documentation: https://docs.cosmostation.io/apis
 * Website: https://www.mintscan.io/terra
 */

import axios, { AxiosInstance } from 'axios';

// API Configuration
export interface MintscanConfig {
  baseURL?: string;
  timeout?: number;
  retries?: number;
}

// Account Information
export interface MintscanAccountInfo {
  account: {
    address: string;
    coins: Array<{
      denom: string;
      amount: string;
    }>;
    public_key?: {
      '@type': string;
      key: string;
    };
    account_number: string;
    sequence: string;
  };
}

// Balance Information
export interface MintscanBalance {
  denom: string;
  amount: string;
  available: string;
  delegated: string;
  unbonding: string;
  rewards: string;
}

// Transaction
export interface MintscanTransaction {
  txhash: string;
  height: string;
  code?: number;
  timestamp: string;
  tx: {
    '@type': string;
    body: {
      messages: unknown[];
      memo: string;
    };
    auth_info: {
      fee: {
        amount: Array<{
          denom: string;
          amount: string;
        }>;
        gas_limit: string;
      };
    };
    signatures: string[];
  };
}

// Delegation
export interface MintscanDelegation {
  delegation: {
    delegator_address: string;
    validator_address: string;
    shares: string;
  };
  balance: {
    denom: string;
    amount: string;
  };
}

// Validator
export interface MintscanValidator {
  operator_address: string;
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
    details: string;
  };
  commission: {
    commission_rates: {
      rate: string;
      max_rate: string;
      max_change_rate: string;
    };
  };
}

// Reward
export interface MintscanReward {
  validator_address: string;
  reward: Array<{
    denom: string;
    amount: string;
  }>;
}

export class MintscanAPI {
  private client: AxiosInstance;
  private config: Required<MintscanConfig>;

  constructor(config: MintscanConfig = {}) {
    this.config = {
      baseURL: config.baseURL || 'https://api-terra.cosmostation.io',
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
  async getAccountInfo(address: string): Promise<MintscanAccountInfo> {
    const response = await this.client.get(`/v1/account/${address}`);
    return response.data;
  }

  /**
   * Get account balance
   */
  async getBalance(address: string): Promise<MintscanBalance[]> {
    const response = await this.client.get(`/v1/account/${address}/balance`);
    return response.data.balance || [];
  }

  /**
   * Get transaction by hash
   */
  async getTransaction(txHash: string): Promise<MintscanTransaction> {
    const response = await this.client.get(`/v1/tx/${txHash}`);
    return response.data;
  }

  /**
   * Get transaction history for an address
   */
  async getTransactionHistory(
    address: string,
    limit: number = 50,
    offset: number = 0
  ): Promise<MintscanTransaction[]> {
    const response = await this.client.get(`/v1/account/${address}/txs`, {
      params: { limit, offset },
    });
    return response.data.txs || [];
  }

  /**
   * Get delegations for an address
   */
  async getDelegations(address: string): Promise<MintscanDelegation[]> {
    const response = await this.client.get(`/v1/account/${address}/delegations`);
    return response.data.delegations || [];
  }

  /**
   * Get unbonding delegations for an address
   */
  async getUnbondingDelegations(address: string): Promise<unknown[]> {
    const response = await this.client.get(`/v1/account/${address}/unbonding_delegations`);
    return response.data.unbonding_delegations || [];
  }

  /**
   * Get staking rewards for an address
   */
  async getRewards(address: string): Promise<MintscanReward[]> {
    const response = await this.client.get(`/v1/account/${address}/rewards`);
    return response.data.rewards || [];
  }

  /**
   * Get all validators
   */
  async getValidators(status: string = 'BOND_STATUS_BONDED'): Promise<MintscanValidator[]> {
    const response = await this.client.get('/v1/staking/validators', {
      params: { status },
    });
    return response.data.validators || [];
  }

  /**
   * Get validator by address
   */
  async getValidator(validatorAddress: string): Promise<MintscanValidator> {
    const response = await this.client.get(`/v1/staking/validators/${validatorAddress}`);
    return response.data.validator;
  }

  /**
   * Get current block height
   */
  async getCurrentHeight(): Promise<number> {
    const response = await this.client.get('/v1/blocks/latest');
    return parseInt(response.data.block.header.height);
  }

  /**
   * Get block by height
   */
  async getBlock(height: number): Promise<unknown> {
    const response = await this.client.get(`/v1/blocks/${height}`);
    return response.data;
  }

  /**
   * Broadcast transaction
   */
  async broadcastTransaction(txBytes: string): Promise<{ txhash: string }> {
    const response = await this.client.post('/v1/txs', {
      tx_bytes: txBytes,
      mode: 'BROADCAST_MODE_SYNC',
    });
    return response.data;
  }

  /**
   * Get chain parameters
   */
  async getChainParams(): Promise<unknown> {
    const response = await this.client.get('/v1/params');
    return response.data;
  }

  /**
   * Get supply information
   */
  async getSupply(): Promise<unknown> {
    const response = await this.client.get('/v1/supply');
    return response.data;
  }
}

// Singleton instance
export const mintscanAPI = new MintscanAPI();

