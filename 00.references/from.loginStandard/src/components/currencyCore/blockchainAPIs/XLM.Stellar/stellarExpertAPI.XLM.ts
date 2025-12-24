/**
 * StellarExpert Open API for Stellar (XLM)
 * 
 * Comprehensive block explorer and analytics platform
 * 
 * Features:
 * - Free public access without authentication
 * - CORS enabled for browser use
 * - Detailed account statistics
 * - Asset analytics and ratings
 * - Price history and market data
 * - Network metrics
 * - No rate limits specified
 * 
 * Documentation: https://stellar.expert/openapi.html
 * Website: https://stellar.expert/explorer/public
 */

import axios, { AxiosInstance } from 'axios';

// API Configuration
export interface StellarExpertConfig {
  baseURL?: string;
  timeout?: number;
  retries?: number;
  network?: 'public' | 'testnet';
}

// Account Data
export interface StellarExpertAccount {
  address: string;
  sequence: string;
  balances: Array<{
    asset: string;
    balance: string;
    limit?: string;
  }>;
  flags: number;
  trustlines: number;
  offers: number;
  signers: number;
  data: number;
  created: number;
  deleted?: number;
}

// Asset Info
export interface StellarExpertAsset {
  asset: string;
  domain?: string;
  tomlInfo?: {
    name?: string;
    desc?: string;
    image?: string;
  };
  rating: {
    age: number;
    trades: number;
    payments: number;
    trustlines: number;
    volume7d: number;
    interop: number;
    liquidity: number;
    average: number;
  };
  supply: string;
  accounts: number;
  trustlines: number;
  payments: number;
  price?: {
    USD?: number;
  };
}

// Transaction
export interface StellarExpertTransaction {
  id: string;
  hash: string;
  ledger: number;
  created: number;
  source: string;
  fee: number;
  operations: number;
  memo?: {
    type: string;
    value?: string;
  };
  successful: boolean;
}

// Operation
export interface StellarExpertOperation {
  id: string;
  type: number;
  type_name: string;
  tx: string;
  source: string;
  created: number;
  // Payment-specific
  from?: string;
  to?: string;
  amount?: string;
  asset?: string;
}

// Market Stats
export interface StellarExpertMarketStats {
  price: number;
  change24h: number;
  volume24h: number;
  high24h: number;
  low24h: number;
  trades24h: number;
}

// Network Stats
export interface StellarExpertNetworkStats {
  ledger: number;
  time: number;
  accounts: number;
  operations: number;
  transactions: number;
  payments: number;
  trades: number;
  assets: number;
  liquidity_pools: number;
}

export class StellarExpertAPI {
  private client: AxiosInstance;
  private config: Required<StellarExpertConfig>;

  constructor(config: StellarExpertConfig = {}) {
    const network = config.network || 'public';
    const baseURL = config.baseURL || `https://api.stellar.expert/explorer/${network}`;

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
        'Accept': 'application/json',
      },
    });
  }

  /**
   * Get account information
   */
  async getAccount(address: string): Promise<StellarExpertAccount> {
    const response = await this.client.get(`/account/${address}`);
    return response.data;
  }

  /**
   * Get account balance
   */
  async getBalance(address: string): Promise<string> {
    const account = await this.getAccount(address);
    const xlmBalance = account.balances.find(b => b.asset === 'XLM');
    return xlmBalance?.balance || '0';
  }

  /**
   * Get account history (operations)
   */
  async getAccountHistory(
    address: string,
    limit: number = 50,
    order: 'asc' | 'desc' = 'desc'
  ): Promise<{ _embedded: { records: StellarExpertOperation[] } }> {
    const response = await this.client.get(`/account/${address}/history/${order}`, {
      params: { limit },
    });
    return response.data;
  }

  /**
   * Get asset information
   */
  async getAsset(assetCode: string, assetIssuer: string): Promise<StellarExpertAsset> {
    const assetId = `${assetCode}-${assetIssuer}`;
    const response = await this.client.get(`/asset/${assetId}`);
    return response.data;
  }

  /**
   * Get all assets
   */
  async getAllAssets(
    limit: number = 50,
    sort: 'rating' | 'volume' | 'supply' = 'rating'
  ): Promise<{ _embedded: { records: StellarExpertAsset[] } }> {
    const response = await this.client.get('/asset', {
      params: { limit, sort },
    });
    return response.data;
  }

  /**
   * Get asset market data
   */
  async getAssetMarket(assetCode: string, assetIssuer: string): Promise<StellarExpertMarketStats> {
    const assetId = `${assetCode}-${assetIssuer}`;
    const response = await this.client.get(`/asset/${assetId}/market`);
    return response.data;
  }

  /**
   * Get asset price history
   */
  async getAssetPriceHistory(
    assetCode: string,
    assetIssuer: string,
    period: '1h' | '24h' | '7d' | '30d' = '24h'
  ): Promise<Array<[number, number]>> {
    const assetId = `${assetCode}-${assetIssuer}`;
    const response = await this.client.get(`/asset/${assetId}/price-history/${period}`);
    return response.data;
  }

  /**
   * Get transaction by hash
   */
  async getTransaction(hash: string): Promise<StellarExpertTransaction> {
    const response = await this.client.get(`/tx/${hash}`);
    return response.data;
  }

  /**
   * Get operation by ID
   */
  async getOperation(operationId: string): Promise<StellarExpertOperation> {
    const response = await this.client.get(`/op/${operationId}`);
    return response.data;
  }

  /**
   * Get network statistics
   */
  async getNetworkStats(): Promise<StellarExpertNetworkStats> {
    const response = await this.client.get('/ledger');
    return response.data;
  }

  /**
   * Search for accounts, assets, or transactions
   */
  async search(query: string): Promise<{
    accounts?: string[];
    assets?: string[];
    transactions?: string[];
  }> {
    const response = await this.client.get('/search', {
      params: { search: query },
    });
    return response.data;
  }

  /**
   * Get top accounts by balance
   */
  async getTopAccounts(limit: number = 50): Promise<Array<{
    address: string;
    balance: string;
  }>> {
    const response = await this.client.get('/directory/top', {
      params: { limit },
    });
    return response.data._embedded.records;
  }

  /**
   * Get liquidity pool information
   */
  async getLiquidityPool(poolId: string): Promise<unknown> {
    const response = await this.client.get(`/liquidity-pool/${poolId}`);
    return response.data;
  }

  /**
   * Get all liquidity pools
   */
  async getAllLiquidityPools(limit: number = 50): Promise<{ _embedded: { records: unknown[] } }> {
    const response = await this.client.get('/liquidity-pool', {
      params: { limit },
    });
    return response.data;
  }
}

// Singleton instance for mainnet (public)
export const stellarExpertAPI = new StellarExpertAPI();

// Factory function for custom configuration
export const createStellarExpertAPI = (config: StellarExpertConfig) => {
  return new StellarExpertAPI(config);
};
