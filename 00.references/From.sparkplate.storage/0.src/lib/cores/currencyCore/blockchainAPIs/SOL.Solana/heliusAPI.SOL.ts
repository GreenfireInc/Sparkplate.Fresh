/**
 * Helius API for Solana (SOL)
 * 
 * Enterprise-grade Solana APIs trusted by leading wallets and DeFi apps
 * 
 * Features:
 * - Token metadata and balances
 * - NFT APIs (metadata, sales, holders)
 * - Transaction history with enriched data
 * - WebSocket support for real-time updates
 * - DAS (Digital Asset Standard) API
 * - Enhanced RPC methods
 * - Transaction parsing
 * 
 * Documentation: https://docs.helius.dev/
 * Website: https://www.helius.dev/
 */

import axios, { AxiosInstance } from 'axios';

// API Configuration
export interface HeliusConfig {
  apiKey: string;
  baseURL?: string;
  rpcURL?: string;
  timeout?: number;
  retries?: number;
  network?: 'mainnet-beta' | 'devnet';
}

// Token Metadata
export interface HeliusTokenMetadata {
  mint: string;
  name: string;
  symbol: string;
  decimals: number;
  logoURI?: string;
  tags?: string[];
  extensions?: Record<string, unknown>;
}

// Token Balance
export interface HeliusTokenBalance {
  mint: string;
  amount: string;
  decimals: number;
  uiAmount: number;
  tokenAccount: string;
  metadata?: HeliusTokenMetadata;
}

// NFT Metadata
export interface HeliusNFTMetadata {
  mint: string;
  name: string;
  symbol: string;
  uri: string;
  sellerFeeBasisPoints: number;
  creators?: Array<{
    address: string;
    verified: boolean;
    share: number;
  }>;
  collection?: {
    name: string;
    family: string;
    key: string;
    verified: boolean;
  };
  attributes?: Array<{
    trait_type: string;
    value: string | number;
  }>;
  properties?: {
    files?: Array<{
      uri: string;
      type: string;
    }>;
    category?: string;
  };
}

// Enhanced Transaction
export interface HeliusEnhancedTransaction {
  signature: string;
  slot: number;
  timestamp: number;
  fee: number;
  feePayer: string;
  nativeTransfers?: Array<{
    fromUserAccount: string;
    toUserAccount: string;
    amount: number;
  }>;
  tokenTransfers?: Array<{
    fromUserAccount: string;
    toUserAccount: string;
    fromTokenAccount: string;
    toTokenAccount: string;
    tokenAmount: number;
    mint: string;
  }>;
  accountData?: Array<{
    account: string;
    nativeBalanceChange: number;
    tokenBalanceChanges?: Array<{
      mint: string;
      rawTokenAmount: {
        tokenAmount: string;
        decimals: number;
      };
      userAccount: string;
    }>;
  }>;
  type: string;
  source: string;
  description: string;
  events?: unknown;
}

// Asset Information (DAS API)
export interface HeliusAsset {
  id: string;
  content?: {
    metadata?: {
      name: string;
      symbol: string;
      description?: string;
    };
    files?: Array<{
      uri: string;
      cdn_uri?: string;
      mime?: string;
    }>;
    links?: {
      external_url?: string;
      image?: string;
    };
  };
  authorities?: Array<{
    address: string;
    scopes: string[];
  }>;
  compression?: {
    eligible: boolean;
    compressed: boolean;
    data_hash: string;
    creator_hash: string;
    asset_hash: string;
    tree: string;
    seq: number;
    leaf_id: number;
  };
  grouping?: Array<{
    group_key: string;
    group_value: string;
  }>;
  royalty?: {
    royalty_model: string;
    target: string | null;
    percent: number;
    basis_points: number;
    primary_sale_happened: boolean;
    locked: boolean;
  };
  creators?: Array<{
    address: string;
    share: number;
    verified: boolean;
  }>;
  ownership?: {
    frozen: boolean;
    delegated: boolean;
    delegate: string | null;
    ownership_model: string;
    owner: string;
  };
  supply?: {
    print_max_supply: number;
    print_current_supply: number;
    edition_nonce: number | null;
  };
  mutable: boolean;
  burnt: boolean;
}

export class HeliusAPI {
  private client: AxiosInstance;
  private rpcClient: AxiosInstance;
  private config: Required<HeliusConfig>;

  constructor(config: HeliusConfig) {
    if (!config.apiKey) {
      throw new Error('Helius API key is required');
    }

    this.config = {
      apiKey: config.apiKey,
      baseURL: config.baseURL || 'https://api.helius.xyz/v0',
      rpcURL: config.rpcURL || `https://${config.network || 'mainnet-beta'}.helius-rpc.com`,
      timeout: config.timeout || 30000,
      retries: config.retries || 3,
      network: config.network || 'mainnet-beta',
    };

    this.client = axios.create({
      baseURL: this.config.baseURL,
      timeout: this.config.timeout,
      headers: {
        'Content-Type': 'application/json',
      },
      params: {
        'api-key': this.config.apiKey,
      },
    });

    this.rpcClient = axios.create({
      baseURL: this.config.rpcURL,
      timeout: this.config.timeout,
      headers: {
        'Content-Type': 'application/json',
      },
      params: {
        'api-key': this.config.apiKey,
      },
    });
  }

  /**
   * Get token balances for an address
   */
  async getTokenBalances(address: string): Promise<HeliusTokenBalance[]> {
    const response = await this.client.get('/addresses', {
      params: {
        'api-key': this.config.apiKey,
        address,
      },
    });
    return response.data.tokens || [];
  }

  /**
   * Get token metadata
   */
  async getTokenMetadata(mints: string[]): Promise<HeliusTokenMetadata[]> {
    const response = await this.client.post('/token-metadata', {
      mintAccounts: mints,
    });
    return response.data || [];
  }

  /**
   * Get NFTs owned by address
   */
  async getNFTsByOwner(address: string): Promise<HeliusNFTMetadata[]> {
    const response = await this.client.get(`/addresses/${address}/nfts`);
    return response.data || [];
  }

  /**
   * Get NFT metadata
   */
  async getNFTMetadata(mints: string[]): Promise<HeliusNFTMetadata[]> {
    const response = await this.client.post('/nft-metadata', {
      mintAccounts: mints,
    });
    return response.data || [];
  }

  /**
   * Get enhanced transaction history
   */
  async getEnhancedTransactions(address: string): Promise<HeliusEnhancedTransaction[]> {
    const response = await this.client.get(`/addresses/${address}/transactions`);
    return response.data || [];
  }

  /**
   * Parse transaction
   */
  async parseTransaction(transactions: string[]): Promise<HeliusEnhancedTransaction[]> {
    const response = await this.client.post('/transactions', {
      transactions,
    });
    return response.data || [];
  }

  /**
   * Get asset (DAS API)
   */
  async getAsset(assetId: string): Promise<HeliusAsset> {
    const response = await this.rpcClient.post('', {
      jsonrpc: '2.0',
      id: 'helius-asset',
      method: 'getAsset',
      params: {
        id: assetId,
      },
    });
    return response.data.result;
  }

  /**
   * Get assets by owner (DAS API)
   */
  async getAssetsByOwner(
    owner: string,
    page: number = 1,
    limit: number = 1000
  ): Promise<{
    total: number;
    limit: number;
    page: number;
    items: HeliusAsset[];
  }> {
    const response = await this.rpcClient.post('', {
      jsonrpc: '2.0',
      id: 'helius-assets',
      method: 'getAssetsByOwner',
      params: {
        ownerAddress: owner,
        page,
        limit,
      },
    });
    return response.data.result;
  }

  /**
   * Get assets by group (collection)
   */
  async getAssetsByGroup(
    groupKey: string,
    groupValue: string,
    page: number = 1,
    limit: number = 1000
  ): Promise<{
    total: number;
    limit: number;
    page: number;
    items: HeliusAsset[];
  }> {
    const response = await this.rpcClient.post('', {
      jsonrpc: '2.0',
      id: 'helius-group-assets',
      addressed: 'getAssetsByGroup',
      params: {
        groupKey,
        groupValue,
        page,
        limit,
      },
    });
    return response.data.result;
  }

  /**
   * Get assets by creator
   */
  async getAssetsByCreator(
    creator: string,
    onlyVerified: boolean = false,
    page: number = 1,
    limit: number = 1000
  ): Promise<{
    total: number;
    limit: number;
    page: number;
    items: HeliusAsset[];
  }> {
    const response = await this.rpcClient.post('', {
      jsonrpc: '2.0',
      id: 'helius-creator-assets',
      method: 'getAssetsByCreator',
      params: {
        creatorAddress: creator,
        onlyVerified,
        page,
        limit,
      },
    });
    return response.data.result;
  }

  /**
   * Search assets
   */
  async searchAssets(
    query: {
      name?: string;
      symbol?: string;
      owner?: string;
      creator?: string;
      mint?: string;
      compressed?: boolean;
    },
    page: number = 1,
    limit: number = 1000
  ): Promise<{
    total: number;
    limit: number;
    page: number;
    items: HeliusAsset[];
  }> {
    const response = await this.rpcClient.post('', {
      jsonrpc: '2.0',
      id: 'helius-search',
      method: 'searchAssets',
      params: {
        ...query,
        page,
        limit,
      },
    });
    return response.data.result;
  }

  /**
   * Get NFT events (sales, listings, etc.)
   */
  async getNFTEvents(
    accounts: string[],
    types?: string[]
  ): Promise<Array<{
    type: string;
    source: string;
    amount: number;
    fee: number;
    timestamp: number;
    signature: string;
    nfts: Array<{
      mint: string;
      tokenStandard: string;
    }>;
    seller?: string;
    buyer?: string;
  }>> {
    const response = await this.client.post('/nft-events', {
      accounts,
      types,
    });
    return response.data || [];
  }

  /**
   * Get webhook events
   */
  async getWebhook(webhookId: string): Promise<unknown> {
    const response = await this.client.get(`/webhooks/${webhookId}`);
    return response.data;
  }

  /**
   * Create webhook
   */
  async createWebhook(config: {
    webhookURL: string;
    transactionTypes: string[];
    accountAddresses: string[];
    webhookType: string;
  }): Promise<unknown> {
    const response = await this.client.post('/webhooks', config);
    return response.data;
  }
}

// Factory function (API key required)
export const createHeliusAPI = (apiKey: string, network?: 'mainnet-beta' | 'devnet') => {
  return new HeliusAPI({ apiKey, network });
};

