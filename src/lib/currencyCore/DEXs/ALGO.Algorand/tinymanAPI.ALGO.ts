/**
 * Tinyman Analytics API for Algorand (ALGO) Price Data
 * 
 * Tinyman is the leading DEX on Algorand with an analytics API
 * 
 * Features:
 * - Free access with no API key required
 * - Real-time price data from DEX liquidity pools
 * - Asset analytics and market data
 * 
 * Website: https://tinyman.org/
 * Docs: https://docs.tinyman.org/
 * API: https://mainnet.analytics.tinyman.org/api/v1/
 */

// API Configuration
export interface TinymanConfig {
  baseURL?: string;
  timeout?: number;
}

// Asset Price Response
export interface TinymanAssetPrice {
  asset_id: string | number;
  name: string;
  unit_name: string;
  price_in_usd: number;
  price_change_24h: number;
  volume_24h_usd: number;
  liquidity_in_usd: number;
  last_updated: string;
}

// Pool Info Response
export interface TinymanPoolInfo {
  address: string;
  version: string;
  asset_1: {
    id: string;
    name: string;
    unit_name: string;
    decimals: number;
    is_verified: boolean;
  };
  asset_2: {
    id: string;
    name: string;
    unit_name: string;
    decimals: number;
    is_verified: boolean;
  };
  current_asset_1_reserves: string;
  current_asset_2_reserves: string;
  current_asset_1_reserves_in_usd: string;
  current_asset_2_reserves_in_usd: string;
  liquidity_in_usd: string;
  last_day_volume_in_usd: string;
  is_verified: boolean;
}

export class TinymanAPI {
  private config: Required<TinymanConfig>;

  constructor(config: TinymanConfig = {}) {
    this.config = {
      baseURL: config.baseURL || 'https://mainnet.analytics.tinyman.org/api/v1',
      timeout: config.timeout || 10000,
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
      throw new Error(`Tinyman API error: ${response.status} ${response.statusText}`);
    }
    return response.json();
  }

  /**
   * Get ALGO price from Tinyman's most liquid ALGO/USDC pool
   * ALGO asset ID: "0" (native coin - note it's a string in the API)
   * USDC asset ID: "31566704"
   */
  async getALGOPrice(): Promise<{
    priceUSD: number;
    liquidityUSD: number;
    volume24hUSD: number;
  }> {
    try {
      console.log('🔍 [Tinyman] Fetching ALGO price...');
      
      // Fetch pools data - looking for ALGO pools
      // Note: asset IDs are strings in the API
      const pools = await this.get<{ results: TinymanPoolInfo[] }>('/pools/', {
        limit: 20, // Get more pools to find ALGO
      });
      
      // Find ALGO pools (ALGO has id "0")
      // Filter for verified pools with ALGO as either asset
      const algoPools = pools.results.filter(
        (pool) => pool.is_verified && (pool.asset_1.id === "0" || pool.asset_2.id === "0")
      );
      
      if (algoPools.length === 0) {
        throw new Error('No verified ALGO pool found');
      }
      
      // Sort by liquidity to get the most liquid pool for best price accuracy
      const algoPool = algoPools.sort((a, b) => 
        parseFloat(b.liquidity_in_usd) - parseFloat(a.liquidity_in_usd)
      )[0];
      
      // Calculate ALGO price from pool reserves
      // If ALGO is asset_2, price = reserves_in_usd / (reserves / 10^decimals)
      const isAlgoAsset2 = algoPool.asset_2.id === "0";
      
      const algoReserves = isAlgoAsset2
        ? parseFloat(algoPool.current_asset_2_reserves) / Math.pow(10, algoPool.asset_2.decimals)
        : parseFloat(algoPool.current_asset_1_reserves) / Math.pow(10, algoPool.asset_1.decimals);
      
      const algoReservesUSD = isAlgoAsset2
        ? parseFloat(algoPool.current_asset_2_reserves_in_usd)
        : parseFloat(algoPool.current_asset_1_reserves_in_usd);
      
      const algoPrice = algoReservesUSD / algoReserves;
      
      const liquidityUSD = parseFloat(algoPool.liquidity_in_usd);
      const volume24hUSD = parseFloat(algoPool.last_day_volume_in_usd);
      
      console.log(`✅ [Tinyman] ALGO Price: $${algoPrice.toFixed(4)} USD (Liquidity: $${liquidityUSD.toLocaleString()})`);
      
      return {
        priceUSD: algoPrice,
        liquidityUSD,
        volume24hUSD,
      };
    } catch (error) {
      console.error('[Tinyman] ALGO price fetch error:', error);
      throw new Error(`Failed to fetch ALGO price: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get ALGO price with 24h change
   * Note: Tinyman's pool API doesn't directly provide 24h change
   * We return priceChange as 0 for now, with fallback to CoinGecko
   */
  async getALGOPriceWithChange(): Promise<{
    price: number;
    priceChange: number;
    liquidityUSD: number;
    volume24hUSD: number;
  }> {
    try {
      const priceData = await this.getALGOPrice();
      
      return {
        price: priceData.priceUSD,
        priceChange: 0, // Tinyman pool API doesn't provide 24h change directly
        liquidityUSD: priceData.liquidityUSD,
        volume24hUSD: priceData.volume24hUSD,
      };
    } catch (error) {
      console.error('[Tinyman] ALGO price with change fetch error:', error);
      throw new Error(`Failed to fetch ALGO price with change: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get pool information for a specific pool address
   */
  async getPoolInfo(poolAddress: string): Promise<TinymanPoolInfo> {
    try {
      console.log(`🔍 [Tinyman] Fetching pool info for: ${poolAddress}`);
      
      const data = await this.get<TinymanPoolInfo>(`/pools/${poolAddress}/`);
      
      console.log(`✅ [Tinyman] Pool info retrieved`);
      
      return data;
    } catch (error) {
      console.error('[Tinyman] Pool info fetch error:', error);
      throw new Error(`Failed to fetch pool info: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Search for pools by asset IDs
   * Note: Asset IDs should be strings (e.g., "0" for ALGO, "31566704" for USDC)
   */
  async searchPools(params: {
    asset_1_id?: string;
    asset_2_id?: string;
    limit?: number;
  }): Promise<TinymanPoolInfo[]> {
    try {
      console.log('🔍 [Tinyman] Searching pools...');
      
      const data = await this.get<{ results: TinymanPoolInfo[] }>('/pools/', params);
      
      console.log(`✅ [Tinyman] Found ${data.results.length} pools`);
      
      return data.results;
    } catch (error) {
      console.error('[Tinyman] Pool search error:', error);
      throw new Error(`Failed to search pools: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

// Singleton instance
export const tinymanAPI = new TinymanAPI();

// Factory function for custom configuration
export const createTinymanAPI = (config?: TinymanConfig) => {
  return new TinymanAPI(config);
};

