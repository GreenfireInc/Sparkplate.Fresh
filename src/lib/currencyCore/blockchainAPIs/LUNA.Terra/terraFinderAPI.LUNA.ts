/**
 * Terra Finder API (Official Terra LCD - Light Client Daemon)
 * 
 * Official Terra block explorer using Terra LCD endpoints
 * 
 * Features:
 * - Free access
 * - Direct blockchain queries via REST
 * - Account, transaction, and block data
 * - Staking and governance information
 * 
 * Documentation: https://docs.terra.money/
 * Website: https://finder.terra.money/
 */

import axios, { AxiosInstance } from 'axios';

// API Configuration
export interface TerraFinderConfig {
  lcdURL?: string;
  timeout?: number;
  retries?: number;
}

// Account Information
export interface TerraAccountInfo {
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
export interface TerraBalance {
  denom: string;
  amount: string;
}

// Transaction
export interface TerraTransaction {
  height: string;
  txhash: string;
  codespace?: string;
  code?: number;
  data?: string;
  raw_log: string;
  logs?: Array<{
    msg_index: number;
    log: string;
    events: Array<{
      type: string;
      attributes: Array<{
        key: string;
        value: string;
      }>;
    }>;
  }>;
  info: string;
  gas_wanted: string;
  gas_used: string;
  tx: {
    '@type': string;
    body: {
      messages: unknown[];
      memo: string;
      timeout_height: string;
      extension_options: unknown[];
      non_critical_extension_options: unknown[];
    };
    auth_info: {
      signer_infos: unknown[];
      fee: {
        amount: TerraBalance[];
        gas_limit: string;
        payer: string;
        granter: string;
      };
    };
    signatures: string[];
  };
  timestamp: string;
}

// Block
export interface TerraBlock {
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
        parts: {
          total: number;
          hash: string;
        };
      };
      last_commit_hash: string;
      data_hash: string;
      validators_hash: string;
      next_validators_hash: string;
      consensus_hash: string;
      app_hash: string;
      last_results_hash: string;
      evidence_hash: string;
      proposer_address: string;
    };
    data: {
      txs: string[];
    };
  };
}

// Delegation
export interface TerraDelegation {
  delegation: {
    delegator_address: string;
    validator_address: string;
    shares: string;
  };
  balance: TerraBalance;
}

// Validator
export interface TerraValidator {
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
    security_contact: string;
    details: string;
  };
  unbonding_height: string;
  unbonding_time: string;
  commission: {
    commission_rates: {
      rate: string;
      max_rate: string;
      max_change_rate: string;
    };
    update_time: string;
  };
  min_self_delegation: string;
}

export class TerraFinderAPI {
  private client: AxiosInstance;
  private config: Required<TerraFinderConfig>;

  constructor(config: TerraFinderConfig = {}) {
    this.config = {
      lcdURL: config.lcdURL || 'https://phoenix-lcd.terra.dev',
      timeout: config.timeout || 10000,
      retries: config.retries || 3,
    };

    this.client = axios.create({
      baseURL: this.config.lcdURL,
      timeout: this.config.timeout,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  /**
   * Get account information
   */
  async getAccountInfo(address: string): Promise<TerraAccountInfo> {
    const response = await this.client.get(`/cosmos/auth/v1beta1/accounts/${address}`);
    return response.data;
  }

  /**
   * Get all balances for an address
   */
  async getBalance(address: string): Promise<TerraBalance[]> {
    const response = await this.client.get(`/cosmos/bank/v1beta1/balances/${address}`);
    return response.data.balances || [];
  }

  /**
   * Get specific balance for an address and denom
   */
  async getBalanceByDenom(address: string, denom: string): Promise<TerraBalance> {
    const response = await this.client.get(`/cosmos/bank/v1beta1/balances/${address}/by_denom`, {
      params: { denom },
    });
    return response.data.balance;
  }

  /**
   * Get transaction by hash
   */
  async getTransaction(txHash: string): Promise<TerraTransaction> {
    const response = await this.client.get(`/cosmos/tx/v1beta1/txs/${txHash}`);
    return response.data.tx_response;
  }

  /**
   * Get transactions by events
   */
  async getTransactionHistory(
    address: string,
    limit: number = 50,
    offset: number = 0
  ): Promise<TerraTransaction[]> {
    const events = [`message.sender='${address}'`];
    const response = await this.client.get('/cosmos/tx/v1beta1/txs', {
      params: {
        events: events.join('&'),
        'pagination.limit': limit,
        'pagination.offset': offset,
        order_by: 'ORDER_BY_DESC',
      },
    });
    return response.data.tx_responses || [];
  }

  /**
   * Get latest block
   */
  async getLatestBlock(): Promise<TerraBlock> {
    const response = await this.client.get('/cosmos/base/tendermint/v1beta1/blocks/latest');
    return response.data;
  }

  /**
   * Get block by height
   */
  async getBlock(height: number): Promise<TerraBlock> {
    const response = await this.client.get(`/cosmos/base/tendermint/v1beta1/blocks/${height}`);
    return response.data;
  }

  /**
   * Get current block height
   */
  async getCurrentHeight(): Promise<number> {
    const block = await this.getLatestBlock();
    return parseInt(block.block.header.height);
  }

  /**
   * Get delegations for an address
   */
  async getDelegations(address: string): Promise<TerraDelegation[]> {
    const response = await this.client.get(`/cosmos/staking/v1beta1/delegations/${address}`);
    return response.data.delegation_responses || [];
  }

  /**
   * Get unbonding delegations for an address
   */
  async getUnbondingDelegations(address: string): Promise<unknown[]> {
    const response = await this.client.get(`/cosmos/staking/v1beta1/delegators/${address}/unbonding_delegations`);
    return response.data.unbonding_responses || [];
  }

  /**
   * Get staking rewards for an address
   */
  async getRewards(address: string): Promise<unknown> {
    const response = await this.client.get(`/cosmos/distribution/v1beta1/delegators/${address}/rewards`);
    return response.data;
  }

  /**
   * Get all validators
   */
  async getValidators(status: string = 'BOND_STATUS_BONDED'): Promise<TerraValidator[]> {
    const response = await this.client.get('/cosmos/staking/v1beta1/validators', {
      params: { status },
    });
    return response.data.validators || [];
  }

  /**
   * Get validator by address
   */
  async getValidator(validatorAddress: string): Promise<TerraValidator> {
    const response = await this.client.get(`/cosmos/staking/v1beta1/validators/${validatorAddress}`);
    return response.data.validator;
  }

  /**
   * Broadcast transaction
   */
  async broadcastTransaction(txBytes: string, mode: string = 'BROADCAST_MODE_SYNC'): Promise<{ txhash: string }> {
    const response = await this.client.post('/cosmos/tx/v1beta1/txs', {
      tx_bytes: txBytes,
      mode,
    });
    return response.data.tx_response;
  }

  /**
   * Get total supply
   */
  async getSupply(): Promise<TerraBalance[]> {
    const response = await this.client.get('/cosmos/bank/v1beta1/supply');
    return response.data.supply || [];
  }

  /**
   * Get node info
   */
  async getNodeInfo(): Promise<unknown> {
    const response = await this.client.get('/cosmos/base/tendermint/v1beta1/node_info');
    return response.data;
  }

  /**
   * Get syncing status
   */
  async getSyncingStatus(): Promise<boolean> {
    const response = await this.client.get('/cosmos/base/tendermint/v1beta1/syncing');
    return response.data.syncing;
  }
}

// Singleton instance
export const terraFinderAPI = new TerraFinderAPI();

