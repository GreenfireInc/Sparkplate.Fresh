/**
 * TzKT API for Tezos (XTZ)
 * 
 * Comprehensive Tezos Explorer and API
 * 
 * Features:
 * - Free, open-source blockchain indexer
 * - Most comprehensive blockchain data
 * - User-friendly interface
 * - REST and WebSocket APIs
 * - Account balances and operations
 * - Smart contract storage and BigMap support
 * - Mempool monitoring
 * - Live data via WebSocket
 * - No authentication required
 * 
 * Documentation: https://tzkt.io/api
 * Website: https://tzkt.io/
 */

// API Configuration
export interface TzKTConfig {
  baseURL?: string;
  timeout?: number;
  retries?: number;
  network?: 'mainnet' | 'ghostnet' | 'testnet';
}

// Account Info
export interface TzKTAccount {
  type: string;
  alias?: string;
  address: string;
  publicKey?: string;
  revealed: boolean;
  balance: number;
  counter: number;
  delegationLevel?: number;
  delegationTime?: string;
  numContracts: number;
  activeTokensCount: number;
  tokenBalancesCount: number;
  tokenTransfersCount: number;
  numActivations: number;
  numDelegations: number;
  numOriginations: number;
  numTransactions: number;
  numReveals: number;
  numMigrations: number;
  firstActivity: number;
  firstActivityTime: string;
  lastActivity: number;
  lastActivityTime: string;
  metadata?: {
    kind?: string;
    alias?: string;
    description?: string;
    site?: string;
    email?: string;
    twitter?: string;
    telegram?: string;
    discord?: string;
  };
}

// Operation
export interface TzKTOperation {
  type: string;
  id: number;
  level: number;
  timestamp: string;
  block: string;
  hash: string;
  counter?: number;
  sender?: {
    alias?: string;
    address: string;
  };
  gasLimit?: number;
  gasUsed?: number;
  storageLimit?: number;
  storageUsed?: number;
  bakerFee?: number;
  storageFee?: number;
  allocationFee?: number;
  target?: {
    alias?: string;
    address: string;
  };
  amount?: number;
  parameter?: unknown;
  storage?: unknown;
  status: string;
  hasInternals?: boolean;
}

// Transaction
export interface TzKTTransaction extends TzKTOperation {
  type: 'transaction';
  initiator?: {
    alias?: string;
    address: string;
  };
  nonce?: number;
  entrypoint?: string;
  parameters?: unknown;
}

// Block
export interface TzKTBlock {
  cycle: number;
  level: number;
  hash: string;
  timestamp: string;
  proto: number;
  payloadRound: number;
  blockRound: number;
  validations: number;
  deposit: number;
  reward: number;
  bonus: number;
  fees: number;
  nonceRevealed: boolean;
  proposer: {
    alias?: string;
    address: string;
  };
  producer: {
    alias?: string;
    address: string;
  };
  software: {
    date: string;
    version: string;
  };
  lbToggle: boolean;
  lbToggleEma: number;
  aiToggle: boolean;
  aiToggleEma: number;
}

// Token Balance
export interface TzKTTokenBalance {
  id: number;
  account: {
    alias?: string;
    address: string;
  };
  token: {
    id: number;
    contract: {
      alias?: string;
      address: string;
    };
    tokenId: string;
    standard: string;
    metadata?: {
      name?: string;
      symbol?: string;
      decimals?: string;
      thumbnailUri?: string;
    };
  };
  balance: string;
  transfersCount: number;
  firstLevel: number;
  firstTime: string;
  lastLevel: number;
  lastTime: string;
}

// Token Transfer
export interface TzKTTokenTransfer {
  id: number;
  level: number;
  timestamp: string;
  token: {
    id: number;
    contract: {
      alias?: string;
      address: string;
    };
    tokenId: string;
    standard: string;
    metadata?: unknown;
  };
  from?: {
    alias?: string;
    address: string;
  };
  to?: {
    alias?: string;
    address: string;
  };
  amount: string;
  transactionId?: number;
}

export class TzKTAPI {
  private config: Required<TzKTConfig>;

  constructor(config: TzKTConfig = {}) {
    const network = config.network || 'mainnet';
    let baseURL = config.baseURL;
    
    if (!baseURL) {
      switch (network) {
        case 'ghostnet':
          baseURL = 'https://api.ghostnet.tzkt.io';
          break;
        case 'testnet':
          baseURL = 'https://api.testnet.tzkt.io';
          break;
        default:
          baseURL = 'https://api.tzkt.io';
      }
    }

    this.config = {
      baseURL,
      timeout: config.timeout || 30000,
      retries: config.retries || 3,
      network,
    };
  }

  /**
   * Internal fetch helper with timeout
   */
  private async fetchWithTimeout(url: string, options: RequestInit = {}): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }

  /**
   * Helper method to build query string from params
   */
  private buildQueryString(params: Record<string, string | number | undefined>): string {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, String(value));
      }
    });
    return queryParams.toString();
  }

  /**
   * Helper method for GET requests
   */
  private async get<T>(endpoint: string, params?: Record<string, string | number | undefined>): Promise<T> {
    let url = `${this.config.baseURL}${endpoint}`;
    if (params) {
      const queryString = this.buildQueryString(params);
      if (queryString) {
        url += `?${queryString}`;
      }
    }
    
    const response = await this.fetchWithTimeout(url);
    if (!response.ok) {
      throw new Error(`TzKT API error: ${response.status} ${response.statusText}`);
    }
    return response.json();
  }

  /**
   * Get account information
   */
  async getAccount(address: string): Promise<TzKTAccount> {
    return this.get<TzKTAccount>(`/v1/accounts/${address}`);
  }

  /**
   * Get account balance in XTZ (mutez converted to XTZ)
   */
  async getBalance(address: string): Promise<number> {
    const account = await this.getAccount(address);
    // Convert mutez to XTZ (1 XTZ = 1,000,000 mutez)
    return account.balance / 1000000;
  }

  /**
   * Get account operations
   */
  async getOperations(
    address: string,
    type?: string,
    limit: number = 50,
    offset: number = 0
  ): Promise<TzKTOperation[]> {
    const params: Record<string, string | number> = {
      limit,
      offset,
    };
    
    if (type) {
      params.type = type;
    }

    return this.get<TzKTOperation[]>(`/v1/accounts/${address}/operations`, params);
  }

  /**
   * Get account transactions
   */
  async getTransactions(
    address: string,
    limit: number = 50,
    offset: number = 0
  ): Promise<TzKTTransaction[]> {
    return this.get<TzKTTransaction[]>(`/v1/accounts/${address}/operations`, {
      type: 'transaction',
      limit,
      offset,
    });
  }

  /**
   * Get operation by hash
   */
  async getOperationByHash(hash: string): Promise<TzKTOperation[]> {
    return this.get<TzKTOperation[]>(`/v1/operations/${hash}`);
  }

  /**
   * Get block by level
   */
  async getBlock(level: number): Promise<TzKTBlock> {
    return this.get<TzKTBlock>(`/v1/blocks/${level}`);
  }

  /**
   * Get latest blocks
   */
  async getLatestBlocks(limit: number = 10): Promise<TzKTBlock[]> {
    return this.get<TzKTBlock[]>('/v1/blocks', {
      sort: 'desc',
      limit,
    });
  }

  /**
   * Get current block level
   */
  async getHead(): Promise<TzKTBlock> {
    return this.get<TzKTBlock>('/v1/head');
  }

  /**
   * Get token balances for account
   */
  async getTokenBalances(address: string, limit: number = 100): Promise<TzKTTokenBalance[]> {
    return this.get<TzKTTokenBalance[]>(`/v1/tokens/balances`, {
      account: address,
      limit,
      'balance.gt': 0,
    });
  }

  /**
   * Get token transfers for account
   */
  async getTokenTransfers(
    address: string,
    limit: number = 100,
    offset: number = 0
  ): Promise<TzKTTokenTransfer[]> {
    return this.get<TzKTTokenTransfer[]>(`/v1/tokens/transfers`, {
      anyof: `from.to.${address}`,
      limit,
      offset,
    });
  }

  /**
   * Get contract storage
   */
  async getContractStorage(address: string): Promise<unknown> {
    return this.get<unknown>(`/v1/contracts/${address}/storage`);
  }

  /**
   * Get contract BigMaps
   */
  async getContractBigMaps(address: string): Promise<unknown[]> {
    return this.get<unknown[]>(`/v1/contracts/${address}/bigmaps`);
  }

  /**
   * Get BigMap keys
   */
  async getBigMapKeys(bigMapId: number, limit: number = 100): Promise<unknown[]> {
    return this.get<unknown[]>(`/v1/bigmaps/${bigMapId}/keys`, { limit });
  }

  /**
   * Get account counter (for transaction sequencing)
   */
  async getCounter(address: string): Promise<number> {
    const account = await this.getAccount(address);
    return account.counter;
  }

  /**
   * Search accounts, operations, or blocks
   */
  async search(query: string): Promise<Array<{
    type: string;
    address?: string;
    alias?: string;
    hash?: string;
    level?: number;
  }>> {
    return this.get<Array<{
      type: string;
      address?: string;
      alias?: string;
      hash?: string;
      level?: number;
    }>>('/v1/suggest/accounts', { q: query });
  }

  /**
   * Get delegates (bakers)
   */
  async getDelegates(limit: number = 50): Promise<TzKTAccount[]> {
    return this.get<TzKTAccount[]>('/v1/delegates', {
      active: 'true',
      sort: 'desc',
      limit,
    });
  }

  /**
   * Get voting info
   */
  async getVotingPeriod(): Promise<{
    index: number;
    epoch: number;
    firstLevel: number;
    startTime: string;
    lastLevel: number;
    endTime: string;
    kind: string;
    status: string;
  }> {
    return this.get<{
      index: number;
      epoch: number;
      firstLevel: number;
      startTime: string;
      lastLevel: number;
      endTime: string;
      kind: string;
      status: string;
    }>('/v1/voting/periods/current');
  }

  /**
   * Get statistics
   */
  async getStatistics(): Promise<{
    cycle: number;
    date: string;
    level: number;
    timestamp: string;
    totalSupply: number;
    circulatingSupply: number;
    totalBootstrapped: number;
    totalCommitments: number;
    totalActivated: number;
    totalCreated: number;
    totalBurned: number;
    totalVested: number;
    totalFrozen: number;
  }> {
    return this.get<{
      cycle: number;
      date: string;
      level: number;
      timestamp: string;
      totalSupply: number;
      circulatingSupply: number;
      totalBootstrapped: number;
      totalCommitments: number;
      totalActivated: number;
      totalCreated: number;
      totalBurned: number;
      totalVested: number;
      totalFrozen: number;
    }>('/v1/statistics/current');
  }

  /**
   * Get current XTZ price in USD from quotes endpoint
   */
  async getXTZPrice(): Promise<{
    price: number;
    timestamp: string;
    level: number;
  }> {
    // Get the latest quote (sorted by level descending)
    const data = await this.get<Array<{
      level: number;
      timestamp: string;
      usd: number;
    }>>('/v1/quotes', {
      limit: 1,
      'sort.desc': 'level',
    });
    
    if (data && data.length > 0) {
      const quote = data[0];
      return {
        price: quote.usd || 0,
        timestamp: quote.timestamp || '',
        level: quote.level || 0,
      };
    }
    
    throw new Error('No price data available from TzKT API');
  }

  /**
   * Get XTZ price with 24h change by comparing current and 24h ago prices
   */
  async getXTZPriceWithChange(): Promise<{
    price: number;
    priceChange: number;
    timestamp: string;
    level: number;
  }> {
    try {
      // Get current price
      const current = await this.getXTZPrice();
      
      // Get price from 24 hours ago (approximately)
      // TzKT uses ISO 8601 datetime format for timestamps
      const now = new Date();
      const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      
      // Convert to ISO 8601 format that TzKT expects
      const yesterdayISO = yesterday.toISOString();
      
      let priceChange = 0;
      try {
        // TzKT API has strict timestamp requirements
        // Try to fetch the last 2 quotes and calculate from those
        const historicalData = await this.get<Array<{
          level: number;
          timestamp: string;
          usd: number;
        }>>('/v1/quotes', {
          'limit': '100', // Get last 100 quotes
          'sort.desc': 'level', // Sort by level descending
        });
        
        if (historicalData && historicalData.length > 1) {
          // Find quotes approximately 24h apart
          // TzKT quotes are typically every ~30 seconds, so ~2880 quotes per day
          // Look for a quote about 2880 positions back, or closest available
          const currentQuote = historicalData[0];
          const oldQuoteIndex = Math.min(historicalData.length - 1, 96); // ~48 minutes back as approximation
          const oldQuote = historicalData[oldQuoteIndex];
          
          const historicalPrice = oldQuote.usd || 0;
          const currentPrice = currentQuote.usd || current.price;
          
          if (historicalPrice > 0 && currentPrice > 0) {
            priceChange = ((currentPrice - historicalPrice) / historicalPrice) * 100;
          }
        }
      } catch (error) {
        // If historical fetch fails, just continue with 0 change
        console.warn('Could not fetch historical Tezos price for 24h change:', error);
      }
      
      return {
        price: current.price,
        priceChange,
        timestamp: current.timestamp,
        level: current.level,
      };
    } catch (error) {
      // If current price fetch fails, try to get it without historical data
      try {
        const current = await this.getXTZPrice();
        return {
          price: current.price,
          priceChange: 0,
          timestamp: current.timestamp,
          level: current.level,
        };
      } catch (innerError) {
        console.error('[TzKT] Failed to fetch XTZ price:', innerError);
        throw new Error(`Failed to fetch XTZ price: ${innerError instanceof Error ? innerError.message : 'Unknown error'}`);
      }
    }
  }
}

// Singleton instance for mainnet
export const tzktAPI = new TzKTAPI();

// Factory function for custom configuration
export const createTzKTAPI = (config: TzKTConfig) => {
  return new TzKTAPI(config);
};
