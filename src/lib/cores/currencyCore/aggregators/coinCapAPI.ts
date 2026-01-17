/**
 * CoinCap API
 * 
 * Real-time pricing and market activity API for cryptocurrencies
 * Free access to real-time data for over 1,000 cryptocurrencies from thousands of markets
 * 
 * @see https://coincap.io/
 */

export const coinCapAPI = {
  name: 'CoinCap',
  description: 'Real-time pricing and market activity for over 1,000 cryptocurrencies',
  
  // API Configuration
  // Note: CoinCap API v2 is the current stable version
  // DNS resolution issues have been reported - fallback to CoinGecko if unavailable
  baseURL: 'https://api.coincap.io/v2',
  apiVersion: 'v2',
  
  // Endpoints
  endpoints: {
    // Assets
    assets: 'assets',
    assetData: 'assets/{id}',
    assetHistory: 'assets/{id}/history',
    assetMarkets: 'assets/{id}/markets',
    
    // Rates
    rates: 'rates',
    rateData: 'rates/{id}',
    
    // Exchanges
    exchanges: 'exchanges',
    exchangeData: 'exchanges/{id}',
    
    // Markets
    markets: 'markets',
    
    // Candles
    candles: 'candles',
  },
  
  // Authentication
  authentication: {
    required: false,
    type: 'API Key (optional for higher limits)',
    headerName: 'Authorization',
    headerPrefix: 'Bearer ',
    note: 'Free tier does not require API key',
    getApiKey: 'https://pro.coincap.io/',
  },
  
  // Rate Limits
  rateLimits: {
    free: {
      requestsPerSecond: 'No strict limit',
      note: 'Subject to rate limiting during high traffic',
    },
    pro: {
      requestsPerSecond: 'Higher limits',
      websocketConnections: 'Unlimited',
      historicalData: 'Full access',
      cost: 'Starting at $10/month',
    },
  },
  
  // NPM SDK
  npmPackages: {
    official: null,
    community: [
      {
        name: 'coincap',
        url: 'https://www.npmjs.com/package/coincap',
        install: 'npm install coincap',
      },
      {
        name: 'coincap-api',
        url: 'https://www.npmjs.com/package/coincap-api',
        install: 'npm install coincap-api',
      },
      {
        name: '@types/coincap',
        url: 'https://www.npmjs.com/package/@types/coincap',
        install: 'npm install @types/coincap',
      },
    ],
  },
  
  // Subgraph
  subgraph: {
    available: false,
    note: 'CoinCap does not provide a subgraph; uses REST API and WebSocket',
  },
  
  // Documentation
  documentation: {
    main: 'https://docs.coincap.io/',
    apiReference: 'https://pro.coincap.io/api-docs/',
    quickstart: 'https://coincapapi.mintlify.app/quickstart',
    pricing: 'https://pro.coincap.io/',
  },
  
  // Social Media
  socialMedia: {
    website: 'https://coincap.io/',
    twitter: 'https://twitter.com/CoinCap_io',
    github: 'https://github.com/CoinCapDev',
    blog: 'https://blog.coincap.io/',
  },
  
  // Features
  features: {
    realTimePrices: true,
    historicalData: true,
    marketData: true,
    exchangeData: true,
    ratesData: true,
    candleData: true,
    websocketSupport: true,
    portfolioTracking: false,
  },
  
  // CORS Support
  cors: {
    enabled: true,
    note: 'Full CORS support for browser requests',
  },
  
  // WebSocket
  websocket: {
    available: true,
    url: 'wss://ws.coincap.io',
    endpoints: {
      prices: 'wss://ws.coincap.io/prices?assets=bitcoin,ethereum',
      trades: 'wss://ws.coincap.io/trades/{exchange}',
    },
    note: 'Real-time price updates via WebSocket',
  },
  
  // Example Usage
  examples: {
    assets: 'https://api.coincap.io/v2/assets',
    assetData: 'https://api.coincap.io/v2/assets/bitcoin',
    assetHistory: 'https://api.coincap.io/v2/assets/bitcoin/history?interval=d1',
    markets: 'https://api.coincap.io/v2/markets?exchangeId=binance',
    rates: 'https://api.coincap.io/v2/rates',
  },
  
  // Notes
  notes: [
    'Simple and easy to use API',
    'Free access without API key',
    'Real-time WebSocket support',
    'Clean and modern interface',
    'Covers 1,000+ cryptocurrencies',
    'Data aggregated from multiple exchanges',
    'No registration required for basic usage',
  ],

  // Utility Functions
  utils: {
    /**
     * Build URL for assets endpoint
     */
    buildAssetsURL: (params: {
      search?: string;
      ids?: string;
      limit?: number;
      offset?: number;
    } = {}) => {
      const {
        search,
        ids,
        limit = 100,
        offset = 0
      } = params;

      const queryParams = new URLSearchParams({
        limit: limit.toString(),
        offset: offset.toString()
      });

      if (search) {
        queryParams.set('search', search);
      }

      if (ids) {
        queryParams.set('ids', ids);
      }

      return `${coinCapAPI.baseURL}/${coinCapAPI.endpoints.assets}?${queryParams.toString()}`;
    },

    /**
     * Fetch assets data
     */
    fetchAssetsData: async (params: {
      search?: string;
      ids?: string;
      limit?: number;
      offset?: number;
      timeout?: number;
    } = {}): Promise<{
      data: Array<{
        id: string;
        rank: string;
        symbol: string;
        name: string;
        priceUsd: string;
        changePercent24Hr: string;
        marketCapUsd: string;
      }>;
    }> => {
      const { timeout = 5000, ...urlParams } = params;
      const url = coinCapAPI.utils.buildAssetsURL(urlParams);

      try {
        const response = await fetch(url, {
          signal: AbortSignal.timeout(timeout)
        });

        if (!response.ok) {
          throw new Error(`CoinCap API error: ${response.status} ${response.statusText}`);
        }

        return await response.json();
      } catch (error) {
        console.error('[CoinCap] API fetch error:', error);
        throw new Error(`Failed to fetch CoinCap data: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    },

    /**
     * Map CoinCap response to standard format
     */
    mapToStandardFormat: (data: Array<{
      id: string;
      rank?: string;
      symbol: string;
      name: string;
      priceUsd?: string;
      changePercent24Hr?: string;
      marketCapUsd?: string;
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
        price: parseFloat(coin.priceUsd || '0'),
        priceChange: parseFloat(coin.changePercent24Hr || '0'),
        marketCap: parseFloat(coin.marketCapUsd || '0')
      }));
    },

    /**
     * Convert CoinGecko IDs to CoinCap symbols for fallback
     */
    mapCoinGeckoIdsToCoinCapSymbols: (coinGeckoIds: string[]): string[] => {
      const idMapping: { [key: string]: string } = {
        'bitcoin': 'bitcoin',
        'ethereum': 'ethereum',
        'ripple': 'xrp',
        'bitcoin-cash': 'bitcoin-cash',
        'litecoin': 'litecoin',
        'cardano': 'cardano',
        'polkadot': 'polkadot',
        'dogecoin': 'dogecoin',
        'solana': 'solana',
        'avalanche-2': 'avalanche',
        'chainlink': 'chainlink',
        'stellar': 'stellar',
        'tezos': 'tezos',
        'cosmos': 'cosmos',
        'algorand': 'algorand',
        'uniswap': 'uniswap',
        'aave': 'aave',
        'maker': 'maker',
        'matic-network': 'polygon',
        'ethereum-classic': 'ethereum-classic',
        'shiba-inu': 'shiba-inu',
        'near': 'near-protocol',
        'internet-computer': 'internet-computer',
        'the-graph': 'the-graph',
        'zcash': 'zcash',
        'eos': 'eos'
      };

      return coinGeckoIds.map(id => idMapping[id] || id).filter(Boolean);
    }
  }
};

export default coinCapAPI;

