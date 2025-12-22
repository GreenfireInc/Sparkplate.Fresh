/**
 * CoinGecko API
 * 
 * The world's most comprehensive cryptocurrency data API
 * Provides comprehensive data including live prices, historical data, and market information
 * 
 * @see https://www.coingecko.com/
 */

export const coinGeckoAPI = {
  name: 'CoinGecko',
  description: 'The world\'s most comprehensive cryptocurrency data API',
  
  // API Configuration
  baseURL: 'https://api.coingecko.com/api/v3/',
  apiVersion: 'v3',
  
  // Endpoints
  endpoints: {
    // Ping
    ping: 'ping',
    
    // Simple Price
    simplePrice: 'simple/price',
    simpleSupportedVsCurrencies: 'simple/supported_vs_currencies',
    simpleTokenPrice: 'simple/token_price/{id}',
    
    // Coins
    coinsList: 'coins/list',
    coinsMarkets: 'coins/markets',
    coinData: 'coins/{id}',
    coinTickers: 'coins/{id}/tickers',
    coinHistory: 'coins/{id}/history',
    coinMarketChart: 'coins/{id}/market_chart',
    coinMarketChartRange: 'coins/{id}/market_chart/range',
    coinOHLC: 'coins/{id}/ohlc',
    
    // Exchanges
    exchanges: 'exchanges',
    exchangesList: 'exchanges/list',
    exchangeData: 'exchanges/{id}',
    exchangeTickers: 'exchanges/{id}/tickers',
    exchangeVolumeChart: 'exchanges/{id}/volume_chart',
    
    // Search
    search: 'search',
    searchTrending: 'search/trending',
    
    // Global
    global: 'global',
    globalDefi: 'global/decentralized_finance_defi',
  },
  
  // Authentication
  authentication: {
    required: false,
    type: 'API Key (optional for higher limits)',
    headerName: 'x-cg-demo-api-key',
    note: 'Free tier does not require API key',
  },
  
  // Rate Limits
  rateLimits: {
    free: {
      callsPerMinute: 30,
      callsPerMonth: 10000,
      note: 'No API key required',
    },
    demo: {
      callsPerMinute: 30,
      callsPerMonth: 10000,
      note: 'With API key',
    },
  },
  
  // NPM SDK
  npmPackages: {
    official: {
      name: 'coingecko-api-v3',
      url: 'https://www.npmjs.com/package/coingecko-api-v3',
      install: 'npm install coingecko-api-v3',
    },
    community: [
      {
        name: 'coingecko-api',
        url: 'https://www.npmjs.com/package/coingecko-api',
        install: 'npm install coingecko-api',
      },
      {
        name: '@coingecko/cryptoformat',
        url: 'https://www.npmjs.com/package/@coingecko/cryptoformat',
        install: 'npm install @coingecko/cryptoformat',
      },
    ],
  },
  
  // Subgraph
  subgraph: {
    available: false,
    note: 'CoinGecko does not provide a subgraph; uses REST API only',
  },
  
  // Documentation
  documentation: {
    main: 'https://docs.coingecko.com/',
    apiReference: 'https://docs.coingecko.com/v3.0.1/reference/introduction',
    quickstart: 'https://docs.coingecko.com/v3.0.1/reference/setting-up',
    pricing: 'https://www.coingecko.com/en/api/pricing',
  },
  
  // Social Media
  socialMedia: {
    website: 'https://www.coingecko.com/',
    twitter: 'https://twitter.com/coingecko',
    telegram: 'https://t.me/coingecko',
    discord: 'https://discord.com/invite/EhrkaCH',
    reddit: 'https://www.reddit.com/r/coingecko/',
    facebook: 'https://www.facebook.com/coingecko',
    linkedin: 'https://www.linkedin.com/company/coingecko/',
    github: 'https://github.com/coingecko',
    blog: 'https://www.coingecko.com/buzz',
  },
  
  // Features
  features: {
    realTimePrices: true,
    historicalData: true,
    marketData: true,
    exchangeData: true,
    trendingCoins: true,
    nftData: true,
    defiData: true,
    derivatives: true,
    multiCurrency: true,
    portfolioTracking: false,
  },
  
  // CORS Support
  cors: {
    enabled: true,
    note: 'Supports browser requests',
  },
  
  // Example Usage
  examples: {
    simplePriceCall: 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd',
    coinData: 'https://api.coingecko.com/api/v3/coins/bitcoin',
    marketChart: 'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=7',
  },
  
  // Notes
  notes: [
    'Most reliable free API with comprehensive data',
    'No API key required for basic usage',
    'Generous rate limits for free tier',
    'Covers 10,000+ cryptocurrencies',
    'Data from 700+ exchanges',
    'Supports 60+ fiat currencies',
  ],

  // Utility Functions
  utils: {
    /**
     * Build URL for coins/markets endpoint
     */
    buildMarketsURL: (params: {
      ids?: string[];
      vs_currency?: string;
      order?: string;
      per_page?: number;
      page?: number;
      sparkline?: boolean;
      price_change_percentage?: string;
    } = {}) => {
      const {
        ids = [],
        vs_currency = 'usd',
        order = 'market_cap_desc',
        per_page = 100,
        page = 1,
        sparkline = false,
        price_change_percentage = '24h'
      } = params;

      const queryParams = new URLSearchParams({
        vs_currency,
        order,
        per_page: per_page.toString(),
        page: page.toString(),
        sparkline: sparkline.toString(),
        price_change_percentage
      });

      if (ids.length > 0) {
        queryParams.set('ids', ids.join(','));
      }

      return `${coinGeckoAPI.baseURL}${coinGeckoAPI.endpoints.coinsMarkets}?${queryParams.toString()}`;
    },

    /**
     * Fetch market data for coins
     */
    fetchMarketData: async (params: {
      ids?: string[];
      vs_currency?: string;
      order?: string;
      per_page?: number;
      page?: number;
      sparkline?: boolean;
      price_change_percentage?: string;
      timeout?: number;
    } = {}): Promise<Array<{
      id: string;
      symbol: string;
      name: string;
      current_price: number;
      market_cap: number;
      price_change_percentage_24h: number;
    }>> => {
      const { timeout = 5000, ...urlParams } = params;
      const url = coinGeckoAPI.utils.buildMarketsURL(urlParams);

      try {
        const response = await fetch(url, {
          signal: AbortSignal.timeout(timeout)
        });

        if (!response.ok) {
          throw new Error(`CoinGecko API error: ${response.status} ${response.statusText}`);
        }

        return await response.json();
      } catch (error) {
        console.error('[CoinGecko] API fetch error:', error);
        throw new Error(`Failed to fetch CoinGecko data: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    },

    /**
     * Map CoinGecko response to standard format
     */
    mapToStandardFormat: (data: Array<{
      id: string;
      symbol: string;
      name: string;
      current_price?: number;
      market_cap?: number;
      price_change_percentage_24h?: number;
    }>): Array<{
      id: string;
      symbol: string;
      name: string;
      price: number;
      priceChange: number;
      marketCap: number;
    }> => {
      return data.map(coin => ({
        id: coin.id,
        symbol: coin.symbol?.toUpperCase() || '',
        name: coin.name || '',
        price: coin.current_price || 0,
        priceChange: coin.price_change_percentage_24h || 0,
        marketCap: coin.market_cap || 0
      }));
    }
  }
};

export default coinGeckoAPI;

