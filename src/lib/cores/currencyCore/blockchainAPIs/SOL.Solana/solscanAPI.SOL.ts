/**
 * Solscan API for Solana (SOL)
 * 
 * Comprehensive block explorer with real-time data tracking
 * 
 * Features:
 * - Free API access with rate limits
 * - Transaction monitoring
 * - Token tracking (SOL and SPL tokens)
 * - Account analytics
 * - Block explorer
 * - Market data
 * - DeFi analytics
 * 
 * Documentation: https://solscan.io/apis
 * Website: https://solscan.io/
 */

// API Configuration
export interface SolscanConfig {
  baseURL?: string;
  apiKey?: string;
  timeout?: number;
  retries?: number;
}

// Account Information
export interface SolscanAccountInfo {
  account: string;
  lamports: number;
  ownerProgram: string;
  type: string;
  rentEpoch: number;
  executable: boolean;
  data?: unknown;
}

// Transaction
export interface SolscanTransaction {
  signature: string;
  slot: number;
  blockTime: number;
  fee: number;
  status: string;
  lamport: number;
  signer: string[];
  logMessage?: string[];
  inputAccount?: Array<{
    account: string;
    signer: boolean;
    writable: boolean;
  }>;
  recentBlockhash: string;
  parsedInstruction?: unknown[];
}

// Token Information
export interface SolscanToken {
  address: string;
  decimals: number;
  name: string;
  symbol: string;
  icon?: string;
  website?: string;
  twitter?: string;
  coingeckoId?: string;
  holder: number;
  supply: string;
  marketCapRank?: number;
  priceUsdt?: number;
  volumeUsdt?: number;
  marketCapUsdt?: number;
}

// Token Account
export interface SolscanTokenAccount {
  tokenAddress: string;
  tokenAccount: string;
  tokenName: string;
  tokenIcon: string;
  tokenSymbol: string;
  tokenDecimals: number;
  tokenAmount: {
    amount: string;
    decimals: number;
    uiAmount: number;
    uiAmountString: string;
  };
  owner: string;
}

// Token Holder
export interface SolscanTokenHolder {
  address: string;
  amount: string;
  decimals: number;
  owner: string;
  rank: number;
}

// Block Information
export interface SolscanBlock {
  blockHeight: number;
  blockTime: number;
  blockhash: string;
  parentSlot: number;
  previousBlockhash: string;
  transactions: number;
  rewards?: unknown[];
}

// Market Data
export interface SolscanMarketData {
  priceUsdt: number;
  volumeUsdt: number;
  marketCapUsdt: number;
  priceChange24h: number;
  holder: number;
  supply: string;
}

export class SolscanAPI {
  private config: Required<Omit<SolscanConfig, 'apiKey'>> & { apiKey?: string };

  constructor(config: SolscanConfig = {}) {
    this.config = {
      baseURL: config.baseURL || 'https://public-api.solscan.io',
      apiKey: config.apiKey,
      timeout: config.timeout || 30000,
      retries: config.retries || 3,
    };
  }

  /**
   * Internal fetch helper with timeout
   */
  private async fetchWithTimeout(url: string, options: RequestInit = {}): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

    try {
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...options.headers,
      };

      if (this.config.apiKey) {
        headers['token'] = this.config.apiKey;
      }

      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers,
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
      throw new Error(`Solscan API error: ${response.status} ${response.statusText}`);
    }
    return response.json();
  }

  /**
   * Get account information
   */
  async getAccountInfo(address: string): Promise<SolscanAccountInfo> {
    return this.get<SolscanAccountInfo>(`/account/${address}`);
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
  async getTransaction(signature: string): Promise<SolscanTransaction> {
    return this.get<SolscanTransaction>(`/transaction/${signature}`);
  }

  /**
   * Get transaction history for an address
   */
  async getTransactionHistory(
    address: string,
    limit: number = 50,
    offset: number = 0
  ): Promise<SolscanTransaction[]> {
    const data = await this.get<SolscanTransaction[]>(`/account/transactions`, {
      account: address,
      limit,
      offset,
    });
    return data || [];
  }

  /**
   * Get SOL transfers for an address
   */
  async getSolTransfers(
    address: string,
    limit: number = 50,
    offset: number = 0
  ): Promise<unknown[]> {
    const data = await this.get<unknown[]>(`/account/solTransfers`, {
      account: address,
      limit,
      offset,
    });
    return data || [];
  }

  /**
   * Get SPL token transfers for an address
   */
  async getTokenTransfers(
    address: string,
    limit: number = 50,
    offset: number = 0
  ): Promise<unknown[]> {
    const data = await this.get<unknown[]>(`/account/splTransfers`, {
      account: address,
      limit,
      offset,
    });
    return data || [];
  }

  /**
   * Get token accounts owned by address
   */
  async getTokenAccounts(address: string): Promise<SolscanTokenAccount[]> {
    const data = await this.get<SolscanTokenAccount[]>(`/account/tokens`, {
      account: address,
    });
    return data || [];
  }

  /**
   * Get token information
   */
  async getTokenInfo(tokenAddress: string): Promise<SolscanToken> {
    return this.get<SolscanToken>(`/token/meta`, { tokenAddress });
  }

  /**
   * Get token holders
   */
  async getTokenHolders(
    tokenAddress: string,
    limit: number = 100,
    offset: number = 0
  ): Promise<SolscanTokenHolder[]> {
    const data = await this.get<SolscanTokenHolder[]>(`/token/holders`, {
      tokenAddress,
      limit,
      offset,
    });
    return data || [];
  }

  /**
   * Get token list
   */
  async getTokenList(
    sortBy: 'market_cap' | 'holder' | 'volume' = 'market_cap',
    limit: number = 100,
    offset: number = 0
  ): Promise<SolscanToken[]> {
    const data = await this.get<SolscanToken[]>('/token/list', {
      sortBy,
      limit,
      offset,
    });
    return data || [];
  }

  /**
   * Get block information
   */
  async getBlock(block: number): Promise<SolscanBlock> {
    return this.get<SolscanBlock>(`/block/${block}`);
  }

  /**
   * Get latest blocks
   */
  async getLatestBlocks(limit: number = 10): Promise<SolscanBlock[]> {
    const data = await this.get<SolscanBlock[]>('/block/last', { limit });
    return data || [];
  }

  /**
   * Get transactions in a block
   */
  async getBlockTransactions(
    block: number,
    limit: number = 25,
    offset: number = 0
  ): Promise<SolscanTransaction[]> {
    const data = await this.get<SolscanTransaction[]>(`/block/transactions`, {
      block,
      limit,
      offset,
    });
    return data || [];
  }

  /**
   * Get market data for a token
   */
  async getMarketData(tokenAddress: string): Promise<SolscanMarketData> {
    return this.get<SolscanMarketData>(`/market/token/${tokenAddress}`);
  }

  /**
   * Get chain information
   */
  async getChainInfo(): Promise<unknown> {
    return this.get<unknown>('/chaininfo');
  }

  /**
   * Get NFT news/activities
   */
  async getNFTActivities(
    limit: number = 50,
    offset: number = 0
  ): Promise<unknown[]> {
    const data = await this.get<unknown[]>('/nft/activities', { limit, offset });
    return data || [];
  }

  /**
   * Get NFT collections
   */
  async getNFTCollections(
    sortBy: 'volume' | 'marketCap' = 'volume',
    limit: number = 100,
    offset: number = 0
  ): Promise<unknown[]> {
    const data = await this.get<unknown[]>('/nft/collections', {
      sortBy,
      limit,
      offset,
    });
    return data || [];
  }

  /**
   * Get NFT collection items
   */
  async getNFTCollectionItems(
    collection: string,
    limit: number = 100,
    offset: number = 0
  ): Promise<unknown[]> {
    const data = await this.get<unknown[]>('/nft/collection/items', {
      collection,
      limit,
      offset,
    });
    return data || [];
  }

  /**
   * Get current SOL price from market data
   * Uses Solana's native token wrapped address
   */
  async getSOLPrice(): Promise<{
    priceUSD: number;
    volumeUSD: number;
    marketCapUSD: number;
    priceChange24h: number;
  }> {
    try {
      console.log('🔍 [Solscan] Fetching SOL price...');
      
      // Solscan uses wrapped SOL (So11111111111111111111111111111111111111112) for market data
      // This is the standard wrapped SOL token address on Solana
      const SOL_TOKEN_ADDRESS = 'So11111111111111111111111111111111111111112';
      
      const data = await this.get<SolscanMarketData>(`/market/token/${SOL_TOKEN_ADDRESS}`);
      
      console.log(`✅ [Solscan] SOL Price: $${data.priceUsdt.toFixed(2)} USD (24h: ${data.priceChange24h.toFixed(2)}%)`);
      
      return {
        priceUSD: data.priceUsdt,
        volumeUSD: data.volumeUsdt,
        marketCapUSD: data.marketCapUsdt,
        priceChange24h: data.priceChange24h,
      };
    } catch (error) {
      console.error('[Solscan] SOL price fetch error:', error);
      throw new Error(`Failed to fetch SOL price: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get SOL price with 24h change
   * Solscan provides 24h change directly in the API response
   */
  async getSOLPriceWithChange(): Promise<{
    price: number;
    priceChange: number;
    volumeUSD: number;
    marketCapUSD: number;
  }> {
    try {
      const priceData = await this.getSOLPrice();
      
      return {
        price: priceData.priceUSD,
        priceChange: priceData.priceChange24h,
        volumeUSD: priceData.volumeUSD,
        marketCapUSD: priceData.marketCapUSD,
      };
    } catch (error) {
      console.error('[Solscan] SOL price with change fetch error:', error);
      throw new Error(`Failed to fetch SOL price with change: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

// Singleton instance
export const solscanAPI = new SolscanAPI();

// Factory function for custom configuration
export const createSolscanAPI = (apiKey?: string) => {
  return new SolscanAPI({ apiKey });
};

