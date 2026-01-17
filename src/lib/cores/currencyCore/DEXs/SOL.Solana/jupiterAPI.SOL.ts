/**
 * Jupiter API for Solana Price Fetching
 * 
 * Uses Jupiter's price API to fetch SOL price data
 * Jupiter is the largest DEX aggregator on Solana
 * No API key required, public access available
 * 
 * @see https://dev.jup.ag/docs/api
 */

export interface JupiterPriceData {
  id: string;
  mintSymbol: string;
  vsToken: string;
  vsTokenSymbol: string;
  price: number;
  extraInfo?: {
    lastSwappedPrice?: {
      lastJupiterSellAt: number;
      lastJupiterSellPrice: string;
      lastJupiterBuyAt: number;
      lastJupiterBuyPrice: string;
    };
  };
}

export interface JupiterTokenInfo {
  address: string;
  symbol: string;
  name: string;
  decimals: number;
  logoURI?: string;
  tags?: string[];
}

export class JupiterAPI {
  // Jupiter API v4 endpoints - public access
  // Using v4 price API which doesn't require authentication
  private priceApiUrl = 'https://price.jup.ag/v4/price';
  private quoteApiUrl = 'https://quote-api.jup.ag/v4';

  // Alternative: Use a public Jupiter endpoint
  private publicPriceApiUrl = 'https://api.jup.ag/price/v2';

  // Native SOL wrapped address
  private SOL_MINT = 'So11111111111111111111111111111111111111112';

  // USDC address on Solana for price reference
  private USDC_MINT = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v';

  /**
   * Fetch data from Jupiter API with timeout
   */
  private async fetchWithTimeout(url: string, timeout: number = 5000): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        signal: controller.signal,
        headers: {
          'Accept': 'application/json',
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
   * Get SOL price in USD from Jupiter
   * Uses Jupiter's price aggregation across all Solana DEXs
   */
  async getSOLPrice(): Promise<{
    priceUSD: number;
    vsToken: string;
    lastUpdated: number;
  }> {
    try {
      console.log('🔍 [Jupiter] Fetching SOL price from aggregator...');

      // Try v4 API first (public)
      try {
        const url = `${this.priceApiUrl}?ids=${this.SOL_MINT}`;
        const response = await this.fetchWithTimeout(url);

        if (response.ok) {
          const data = await response.json();

          if (data.data && data.data[this.SOL_MINT]) {
            const priceData: JupiterPriceData = data.data[this.SOL_MINT];
            const priceUSD = priceData.price;

            console.log(`✅ [Jupiter] SOL Price: $${priceUSD.toFixed(2)} USD (v4 API)`);

            return {
              priceUSD,
              vsToken: priceData.vsTokenSymbol,
              lastUpdated: data.timeTaken || Date.now(),
            };
          }
        }
      } catch (v4Error) {
        console.warn('[Jupiter] v4 API failed, trying fallback:', v4Error);
      }

      // Fallback to alternative endpoint
      try {
        const url = `${this.publicPriceApiUrl}?ids=${this.SOL_MINT}`;
        const response = await this.fetchWithTimeout(url);

        if (!response.ok) {
          throw new Error(`Jupiter API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        if (!data.data || !data.data[this.SOL_MINT]) {
          throw new Error('Invalid response from Jupiter API');
        }

        const priceData: JupiterPriceData = data.data[this.SOL_MINT];
        const priceUSD = priceData.price;

        console.log(`✅ [Jupiter] SOL Price: $${priceUSD.toFixed(2)} USD (fallback API)`);

        return {
          priceUSD,
          vsToken: priceData.vsTokenSymbol,
          lastUpdated: data.timeTaken || Date.now(),
        };
      } catch (fallbackError) {
        console.warn('[Jupiter] Fallback API also failed:', fallbackError);
        throw fallbackError;
      }

    } catch (error) {
      console.error('[Jupiter] SOL price fetch error:', error);
      throw new Error(`Failed to fetch SOL price from Jupiter: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get SOL price with 24h change calculation
   * Jupiter doesn't provide historical data directly, so we'll need to calculate it differently
   */
  async getSOLPriceWithChange(): Promise<{
    price: number;
    priceChange: number;
    vsToken: string;
  }> {
    try {
      // Get current price
      const current = await this.getSOLPrice();
      
      // Jupiter doesn't provide 24h historical data in the price endpoint
      // We'll need to use the quote endpoint or cache mechanism for accurate 24h change
      // For now, we return 0 for price change (similar to what was done with Etherscan initially)
      // The calling code will fall back to CoinGecko which does provide 24h change
      
      return {
        price: current.priceUSD,
        priceChange: 0, // Jupiter price API doesn't provide 24h change
        vsToken: current.vsToken,
      };
    } catch (error) {
      console.error('[Jupiter] SOL price with change fetch error:', error);
      throw new Error(`Failed to fetch SOL price with change: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get quote for swapping tokens
   * Useful for more detailed price information with slippage
   */
  async getQuote(
    inputMint: string,
    outputMint: string,
    amount: number,
    slippageBps: number = 50
  ): Promise<{
    inputAmount: number;
    outputAmount: number;
    priceImpactPct: number;
    routePlan: unknown[];
  }> {
    try {
      console.log(`🔍 [Jupiter] Getting quote for swap...`);

      const url = `${this.quoteApiUrl}/quote?inputMint=${inputMint}&outputMint=${outputMint}&amount=${amount}&slippageBps=${slippageBps}`;

      const response = await this.fetchWithTimeout(url);

      if (!response.ok) {
        throw new Error(`Jupiter quote API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      console.log(`✅ [Jupiter] Quote retrieved`);

      return {
        inputAmount: parseInt(data.inAmount),
        outputAmount: parseInt(data.outAmount),
        priceImpactPct: parseFloat(data.priceImpactPct || '0'),
        routePlan: data.routePlan || [],
      };
    } catch (error) {
      console.error('[Jupiter] Quote fetch error:', error);
      throw new Error(`Failed to get Jupiter quote: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get multiple token prices in one call
   */
  async getMultiplePrices(tokenMints: string[]): Promise<Record<string, JupiterPriceData>> {
    try {
      console.log(`🔍 [Jupiter] Fetching prices for ${tokenMints.length} tokens...`);

      const ids = tokenMints.join(',');
      const url = `${this.priceApiUrl}?ids=${ids}`;

      const response = await this.fetchWithTimeout(url);

      if (!response.ok) {
        throw new Error(`Jupiter API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      if (!data.data) {
        throw new Error('Invalid response from Jupiter API');
      }

      console.log(`✅ [Jupiter] Retrieved prices for ${Object.keys(data.data).length} tokens`);

      return data.data;
    } catch (error) {
      console.error('[Jupiter] Multiple prices fetch error:', error);
      throw new Error(`Failed to fetch multiple prices: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get SOL to USDC rate for reference
   */
  async getSOLtoUSDCRate(): Promise<{
    rate: number;
    outputAmount: number;
  }> {
    try {
      // Quote 1 SOL (1e9 lamports) to USDC
      const amount = 1_000_000_000; // 1 SOL in lamports
      
      const quote = await this.getQuote(
        this.SOL_MINT,
        this.USDC_MINT,
        amount
      );

      // USDC has 6 decimals
      const rate = quote.outputAmount / 1_000_000;

      return {
        rate,
        outputAmount: quote.outputAmount,
      };
    } catch (error) {
      console.error('[Jupiter] SOL/USDC rate fetch error:', error);
      throw new Error(`Failed to get SOL/USDC rate: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

// Singleton instance
export const jupiterAPI = new JupiterAPI();

// Factory function for custom configuration
export const createJupiterAPI = () => {
  return new JupiterAPI();
};

