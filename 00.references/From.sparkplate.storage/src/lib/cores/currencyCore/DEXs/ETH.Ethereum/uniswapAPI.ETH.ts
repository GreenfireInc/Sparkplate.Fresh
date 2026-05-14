/**
 * Uniswap V3 API for Ethereum Price Fetching
 * 
 * Uses The Graph's Uniswap V3 subgraph to fetch ETH price data
 * More reliable than Etherscan for price queries (no API key required)
 * 
 * @see https://docs.uniswap.org/api/subgraph/overview
 */

export interface UniswapPoolData {
  token0Price: string;
  token1Price: string;
  volumeUSD: string;
  txCount: string;
  totalValueLockedUSD: string;
  feeTier: string;
}

export interface UniswapTokenData {
  id: string;
  symbol: string;
  name: string;
  decimals: string;
  derivedETH: string;
  volumeUSD: string;
  totalValueLockedUSD: string;
  priceUSD: string;
  priceChange24h?: number;
}

export class UniswapAPI {
  // Using a working hosted service endpoint that doesn't redirect
  // This should avoid CORS issues while still providing Uniswap data
  private subgraphUrl = 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3';

  // Fallback to 1inch aggregator for price data if Graph fails
  private oneInchApiUrl = 'https://api.1inch.io/v5.0/1';

  // WETH address on Ethereum mainnet
  private WETH_ADDRESS = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'.toLowerCase();

  // USDC address for price reference
  private USDC_ADDRESS = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'.toLowerCase();

  /**
   * Query The Graph subgraph with proper error handling
   */
  private async query<T>(query: string): Promise<T> {
    try {
      const response = await fetch(this.subgraphUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        throw new Error(`Uniswap subgraph error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();

      if (result.errors) {
        throw new Error(`GraphQL error: ${result.errors[0]?.message || 'Unknown error'}`);
      }

      return result.data;
    } catch (error) {
      console.error('[Uniswap] Query error:', error);
      throw new Error(`Failed to query Uniswap subgraph: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get ETH price from 1inch aggregator as fallback
   */
  private async getETHPriceFrom1inch(): Promise<{ priceUSD: number; volumeUSD: number; tvl: number }> {
    try {
      // Get ETH/USDC quote from 1inch
      const response = await fetch(`${this.oneInchApiUrl}/quote?fromTokenAddress=${this.WETH_ADDRESS}&toTokenAddress=${this.USDC_ADDRESS}&amount=1000000000000000000`, {
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`1inch API error: ${response.status}`);
      }

      const data = await response.json();

      // 1inch returns amount in smallest units, convert to USD
      const ethToUsdc = parseInt(data.toTokenAmount) / 1e6; // USDC has 6 decimals

      return {
        priceUSD: ethToUsdc,
        volumeUSD: 0, // 1inch doesn't provide volume
        tvl: 0, // 1inch doesn't provide TVL
      };
    } catch (error) {
      console.error('[1inch] Fallback price fetch error:', error);
      throw error;
    }
  }

  /**
   * Get ETH price in USD from Uniswap V3 or fallback sources
   * Uses The Graph first, then 1inch as fallback
   */
  async getETHPrice(): Promise<{
    priceUSD: number;
    volumeUSD: number;
    tvl: number;
  }> {
    try {
      console.log('🔍 [Uniswap] Fetching ETH price from V3 subgraph...');

      // Try The Graph first
      try {
        const query = `
          {
            bundle(id: "1") {
              ethPriceUSD
            }
            token(id: "${this.WETH_ADDRESS}") {
              symbol
              derivedETH
              totalValueLockedUSD
              volumeUSD
            }
          }
        `;

        const data = await this.query<{
          bundle: {
            ethPriceUSD: string;
          };
          token: {
            symbol: string;
            derivedETH: string;
            totalValueLockedUSD: string;
            volumeUSD: string;
          };
        }>(query);

        if (data.bundle && data.token) {
          const priceUSD = parseFloat(data.bundle.ethPriceUSD);
          const volumeUSD = parseFloat(data.token.volumeUSD);
          const tvl = parseFloat(data.token.totalValueLockedUSD);

          console.log(`✅ [Uniswap] ETH Price: $${priceUSD.toFixed(2)} USD (TVL: $${(tvl / 1e9).toFixed(2)}B)`);

          return {
            priceUSD,
            volumeUSD,
            tvl,
          };
        }
      } catch (graphError) {
        console.warn('[Uniswap] The Graph failed, trying 1inch fallback:', graphError);
      }

      // Fallback to 1inch
      console.log('🔄 [Uniswap] Falling back to 1inch aggregator...');
      const fallbackData = await this.getETHPriceFrom1inch();
      console.log(`✅ [Uniswap] ETH Price from 1inch: $${fallbackData.priceUSD.toFixed(2)} USD`);

      return fallbackData;

    } catch (error) {
      console.error('[Uniswap] ETH price fetch error:', error);
      throw new Error(`Failed to fetch ETH price from Uniswap: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get ETH price with 24h change calculation
   * Fetches historical data from 24h ago to calculate price change
   */
  async getETHPriceWithChange(): Promise<{
    price: number;
    priceChange: number;
    volumeUSD: number;
    tvl: number;
  }> {
    try {
      // Get current price
      const current = await this.getETHPrice();
      
      // Calculate timestamp for 24h ago
      const now = Math.floor(Date.now() / 1000);
      const yesterday = now - 24 * 60 * 60;

      // Query for historical price data
      const query = `
        {
          bundle(id: "1") {
            ethPriceUSD
          }
          tokenDayDatas(
            first: 2
            orderBy: date
            orderDirection: desc
            where: { token: "${this.WETH_ADDRESS}" }
          ) {
            date
            priceUSD
            volumeUSD
          }
        }
      `;

      const data = await this.query<{
        bundle: {
          ethPriceUSD: string;
        };
        tokenDayDatas: Array<{
          date: number;
          priceUSD: string;
          volumeUSD: string;
        }>;
      }>(query);

      let priceChange = 0;

      // Calculate price change if we have historical data
      if (data.tokenDayDatas && data.tokenDayDatas.length >= 2) {
        const todayData = data.tokenDayDatas[0];
        const yesterdayData = data.tokenDayDatas[1];
        
        const todayPrice = parseFloat(todayData.priceUSD);
        const yesterdayPrice = parseFloat(yesterdayData.priceUSD);

        if (yesterdayPrice > 0 && todayPrice > 0) {
          priceChange = ((todayPrice - yesterdayPrice) / yesterdayPrice) * 100;
        }
      }

      return {
        price: current.priceUSD,
        priceChange,
        volumeUSD: current.volumeUSD,
        tvl: current.tvl,
      };
    } catch (error) {
      console.error('[Uniswap] ETH price with change fetch error:', error);
      
      // If historical data fails, try to return current price with 0 change
      try {
        const current = await this.getETHPrice();
        return {
          price: current.priceUSD,
          priceChange: 0,
          volumeUSD: current.volumeUSD,
          tvl: current.tvl,
        };
      } catch (innerError) {
        throw new Error(`Failed to fetch ETH price with change: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }
  }

  /**
   * Get pool information for a specific trading pair
   */
  async getPoolData(poolAddress: string): Promise<UniswapPoolData> {
    try {
      console.log(`🔍 [Uniswap] Fetching pool data for: ${poolAddress}`);

      const query = `
        {
          pool(id: "${poolAddress.toLowerCase()}") {
            token0Price
            token1Price
            volumeUSD
            txCount
            totalValueLockedUSD
            feeTier
          }
        }
      `;

      const data = await this.query<{
        pool: UniswapPoolData;
      }>(query);

      if (!data.pool) {
        throw new Error('Pool not found');
      }

      console.log(`✅ [Uniswap] Pool data retrieved`);

      return data.pool;
    } catch (error) {
      console.error('[Uniswap] Pool data fetch error:', error);
      throw new Error(`Failed to fetch pool data: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get the top ETH trading pools
   */
  async getTopPools(limit: number = 5): Promise<Array<{
    id: string;
    token0Symbol: string;
    token1Symbol: string;
    volumeUSD: string;
    tvlUSD: string;
  }>> {
    try {
      console.log(`🔍 [Uniswap] Fetching top ${limit} pools...`);

      const query = `
        {
          pools(
            first: ${limit}
            orderBy: totalValueLockedUSD
            orderDirection: desc
            where: { 
              token0: "${this.WETH_ADDRESS}"
            }
          ) {
            id
            token0 {
              symbol
            }
            token1 {
              symbol
            }
            volumeUSD
            totalValueLockedUSD
          }
        }
      `;

      const data = await this.query<{
        pools: Array<{
          id: string;
          token0: { symbol: string };
          token1: { symbol: string };
          volumeUSD: string;
          totalValueLockedUSD: string;
        }>;
      }>(query);

      const pools = data.pools.map(pool => ({
        id: pool.id,
        token0Symbol: pool.token0.symbol,
        token1Symbol: pool.token1.symbol,
        volumeUSD: pool.volumeUSD,
        tvlUSD: pool.totalValueLockedUSD,
      }));

      console.log(`✅ [Uniswap] Retrieved ${pools.length} top pools`);

      return pools;
    } catch (error) {
      console.error('[Uniswap] Top pools fetch error:', error);
      throw new Error(`Failed to fetch top pools: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

// Singleton instance
export const uniswapAPI = new UniswapAPI();

// Factory function for custom configuration
export const createUniswapAPI = () => {
  return new UniswapAPI();
};

