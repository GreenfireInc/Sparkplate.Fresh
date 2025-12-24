/**
 * Horizon API for Stellar (XLM)
 * 
 * Official API for the Stellar network
 * 
 * Features:
 * - Free public access via SDF
 * - Complete blockchain data access
 * - Transaction submission
 * - Account operations
 * - Asset tracking
 * - Payment streams
 * - No authentication required
 * 
 * Documentation: https://developers.stellar.org/docs/data/apis/horizon
 * Website: https://horizon.stellar.org/
 */

import axios, { AxiosInstance } from 'axios';

// API Configuration
export interface HorizonConfig {
  baseURL?: string;
  timeout?: number;
  retries?: number;
  network?: 'mainnet' | 'testnet';
}

// Account Information
export interface HorizonAccount {
  id: string;
  account_id: string;
  sequence: string;
  subentry_count: number;
  balances: Array<{
    balance: string;
    limit?: string;
    buying_liabilities: string;
    selling_liabilities: string;
    asset_type: string;
    asset_code?: string;
    asset_issuer?: string;
  }>;
  signers: Array<{
    key: string;
    weight: number;
    type: string;
  }>;
  data: Record<string, string>;
  flags: {
    auth_required: boolean;
    auth_revocable: boolean;
    auth_immutable: boolean;
    auth_clawback_enabled: boolean;
  };
  thresholds: {
    low_threshold: number;
    med_threshold: number;
    high_threshold: number;
  };
}

// Transaction
export interface HorizonTransaction {
  id: string;
  paging_token: string;
  successful: boolean;
  hash: string;
  ledger: number;
  created_at: string;
  source_account: string;
  source_account_sequence: string;
  fee_account: string;
  fee_charged: string;
  max_fee: string;
  operation_count: number;
  envelope_xdr: string;
  result_xdr: string;
  result_meta_xdr: string;
  memo_type: string;
  memo?: string;
  signatures: string[];
}

// Operation
export interface HorizonOperation {
  id: string;
  paging_token: string;
  transaction_successful: boolean;
  source_account: string;
  type: string;
  type_i: number;
  created_at: string;
  transaction_hash: string;
  // Payment-specific fields
  from?: string;
  to?: string;
  amount?: string;
  asset_type?: string;
  asset_code?: string;
  asset_issuer?: string;
}

// Ledger
export interface HorizonLedger {
  id: string;
  paging_token: string;
  hash: string;
  prev_hash: string;
  sequence: number;
  successful_transaction_count: number;
  failed_transaction_count: number;
  operation_count: number;
  tx_set_operation_count: number;
  closed_at: string;
  total_coins: string;
  fee_pool: string;
  base_fee_in_stroops: number;
  base_reserve_in_stroops: number;
  max_tx_set_size: number;
  protocol_version: number;
  header_xdr: string;
}

// Asset
export interface HorizonAsset {
  asset_type: string;
  asset_code: string;
  asset_issuer: string;
  paging_token: string;
  num_accounts: number;
  num_claimable_balances: number;
  num_liquidity_pools: number;
  amount: string;
  accounts: {
    authorized: number;
    authorized_to_maintain_liabilities: number;
    unauthorized: number;
  };
  claimable_balances_amount: string;
  liquidity_pools_amount: string;
  balances: {
    authorized: string;
    authorized_to_maintain_liabilities: string;
    unauthorized: string;
  };
  flags: {
    auth_required: boolean;
    auth_revocable: boolean;
    auth_immutable: boolean;
    auth_clawback_enabled: boolean;
  };
}

export class HorizonAPI {
  private client: AxiosInstance;
  private config: Required<HorizonConfig>;

  constructor(config: HorizonConfig = {}) {
    const network = config.network || 'mainnet';
    const baseURL = config.baseURL || 
      (network === 'mainnet' 
        ? 'https://horizon.stellar.org'
        : 'https://horizon-testnet.stellar.org');

    this.config = {
      baseURL,
      timeout: config.timeout || 30000,
      retries: config.retries || 3,
      network,
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
  async getAccount(accountId: string): Promise<HorizonAccount> {
    const response = await this.client.get(`/accounts/${accountId}`);
    return response.data;
  }

  /**
   * Get account balance
   */
  async getBalance(accountId: string): Promise<string> {
    const account = await this.getAccount(accountId);
    const nativeBalance = account.balances.find(b => b.asset_type === 'native');
    return nativeBalance?.balance || '0';
  }

  /**
   * Get all balances for an account
   */
  async getAllBalances(accountId: string): Promise<HorizonAccount['balances']> {
    const account = await this.getAccount(accountId);
    return account.balances;
  }

  /**
   * Get account operations (transaction history)
   */
  async getOperations(
    accountId: string,
    limit: number = 50,
    order: 'asc' | 'desc' = 'desc'
  ): Promise<{ _embedded: { records: HorizonOperation[] } }> {
    const response = await this.client.get(`/accounts/${accountId}/operations`, {
      params: { limit, order },
    });
    return response.data;
  }

  /**
   * Get account payments
   */
  async getPayments(
    accountId: string,
    limit: number = 50,
    order: 'asc' | 'desc' = 'desc'
  ): Promise<{ _embedded: { records: HorizonOperation[] } }> {
    const response = await this.client.get(`/accounts/${accountId}/payments`, {
      params: { limit, order },
    });
    return response.data;
  }

  /**
   * Get account transactions
   */
  async getTransactions(
    accountId: string,
    limit: number = 50,
    order: 'asc' | 'desc' = 'desc'
  ): Promise<{ _embedded: { records: HorizonTransaction[] } }> {
    const response = await this.client.get(`/accounts/${accountId}/transactions`, {
      params: { limit, order },
    });
    return response.data;
  }

  /**
   * Get transaction by hash
   */
  async getTransaction(hash: string): Promise<HorizonTransaction> {
    const response = await this.client.get(`/transactions/${hash}`);
    return response.data;
  }

  /**
   * Get ledger by sequence
   */
  async getLedger(sequence: number): Promise<HorizonLedger> {
    const response = await this.client.get(`/ledgers/${sequence}`);
    return response.data;
  }

  /**
   * Get latest ledgers
   */
  async getLatestLedgers(
    limit: number = 10,
    order: 'asc' | 'desc' = 'desc'
  ): Promise<{ _embedded: { records: HorizonLedger[] } }> {
    const response = await this.client.get('/ledgers', {
      params: { limit, order },
    });
    return response.data;
  }

  /**
   * Get asset information
   */
  async getAsset(assetCode: string, assetIssuer: string): Promise<HorizonAsset> {
    const response = await this.client.get('/assets', {
      params: {
        asset_code: assetCode,
        asset_issuer: assetIssuer,
      },
    });
    return response.data._embedded.records[0];
  }

  /**
   * Get all assets
   */
  async getAllAssets(
    limit: number = 50,
    order: 'asc' | 'desc' = 'desc'
  ): Promise<{ _embedded: { records: HorizonAsset[] } }> {
    const response = await this.client.get('/assets', {
      params: { limit, order },
    });
    return response.data;
  }

  /**
   * Submit transaction
   */
  async submitTransaction(txEnvelope: string): Promise<HorizonTransaction> {
    const response = await this.client.post('/transactions', 
      `tx=${encodeURIComponent(txEnvelope)}`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    return response.data;
  }

  /**
   * Get operation by ID
   */
  async getOperation(operationId: string): Promise<HorizonOperation> {
    const response = await this.client.get(`/operations/${operationId}`);
    return response.data;
  }

  /**
   * Get order book
   */
  async getOrderBook(
    selling: { asset_code?: string; asset_issuer?: string },
    buying: { asset_code?: string; asset_issuer?: string },
    limit: number = 20
  ): Promise<unknown> {
    const params: Record<string, string | number> = { limit };
    
    if (selling.asset_code && selling.asset_issuer) {
      params.selling_asset_type = 'credit_alphanum4';
      params.selling_asset_code = selling.asset_code;
      params.selling_asset_issuer = selling.asset_issuer;
    } else {
      params.selling_asset_type = 'native';
    }
    
    if (buying.asset_code && buying.asset_issuer) {
      params.buying_asset_type = 'credit_alphanum4';
      params.buying_asset_code = buying.asset_code;
      params.buying_asset_issuer = buying.asset_issuer;
    } else {
      params.buying_asset_type = 'native';
    }

    const response = await this.client.get('/order_book', { params });
    return response.data;
  }

  /**
   * Get network info
   */
  async getNetworkInfo(): Promise<{
    horizon_version: string;
    core_version: string;
    history_latest_ledger: number;
    history_elder_ledger: number;
    core_latest_ledger: number;
    network_passphrase: string;
    current_protocol_version: number;
    core_supported_protocol_version: number;
  }> {
    const response = await this.client.get('/');
    return response.data;
  }
}

// Singleton instance for mainnet
export const horizonAPI = new HorizonAPI();

// Factory function for custom configuration
export const createHorizonAPI = (config: HorizonConfig) => {
  return new HorizonAPI(config);
};
