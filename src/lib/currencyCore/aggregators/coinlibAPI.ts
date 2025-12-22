/**
 * Coinlib API
 * 
 * Simple API for fetching coin prices and global market data
 * Crypto Currency Prices and Market Data
 * 
 * @see https://coinlib.io/
 */

export const coinlibAPI = {
  name: 'Coinlib',
  description: 'Simple API for cryptocurrency prices and global market data',
  
  // API Configuration
  baseURL: 'https://coinlib.io/api/v1/',
  apiVersion: 'v1',
  
  // Endpoints
  endpoints: {
    // Global Data
    global: '/global',
    
    // Coin List
    coinlist: '/coinlist',
    
    // Coin Data
    coin: '/coin',
    
    // History
    history: '/history',
  },
  
  // Authentication
  authentication: {
    required: true,
    type: 'API Key',
    parameterName: 'key',
    note: 'Free tier available with API key',
    getApiKey: 'https://coinlib.io/apidocs',
  },
  
  // Rate Limits
  rateLimits: {
    free: {
      requestsPerMonth: 15000,
      requestsPerMinute: 10,
      cost: 'Free',
    },
    starter: {
      requestsPerMonth: 60000,
      requestsPerMinute: 40,
      cost: '$9.99/month',
    },
    professional: {
      requestsPerMonth: 180000,
      requestsPerMinute: 120,
      cost: '$24.99/month',
    },
    enterprise: {
      requestsPerMonth: 'Unlimited',
      requestsPerMinute: 'Unlimited',
      cost: '$99.99/month',
    },
  },
  
  // NPM SDK
  npmPackages: {
    official: null,
    community: [
      {
        name: 'coinlib',
        url: 'https://www.npmjs.com/package/coinlib',
        install: 'npm install coinlib',
      },
      {
        name: 'coinlib-api',
        url: 'https://www.npmjs.com/package/coinlib-api',
        install: 'npm install coinlib-api',
      },
    ],
  },
  
  // Subgraph
  subgraph: {
    available: false,
    note: 'Coinlib does not provide a subgraph; uses REST API only',
  },
  
  // Documentation
  documentation: {
    main: 'https://coinlib.io/apidocs',
    apiReference: 'https://coinlib.io/apidocs',
    pricing: 'https://coinlib.io/apidocs#pricing',
  },
  
  // Social Media
  socialMedia: {
    website: 'https://coinlib.io/',
    twitter: 'https://twitter.com/coinlibio',
    facebook: 'https://www.facebook.com/coinlib.io',
  },
  
  // Features
  features: {
    realTimePrices: true,
    historicalData: true,
    globalStats: true,
    coinList: true,
    coinDetails: true,
    priceHistory: true,
    simpleAPI: true,
  },
  
  // CORS Support
  cors: {
    enabled: true,
    note: 'CORS enabled for browser requests',
  },
  
  // Example Usage
  examples: {
    global: 'https://coinlib.io/api/v1/global?key=YOUR_API_KEY',
    coinlist: 'https://coinlib.io/api/v1/coinlist?key=YOUR_API_KEY',
    coin: 'https://coinlib.io/api/v1/coin?key=YOUR_API_KEY&symbol=BTC',
    coinById: 'https://coinlib.io/api/v1/coin?key=YOUR_API_KEY&id=859',
    history: 'https://coinlib.io/api/v1/history?key=YOUR_API_KEY&symbol=BTC&period=7d',
  },
  
  // Query Parameters
  queryParameters: {
    coin: {
      symbol: 'string - Coin symbol (e.g., BTC)',
      id: 'number - Coin ID',
      pref: 'string - Preferred currency (USD, EUR, etc.)',
    },
    history: {
      symbol: 'string - Coin symbol',
      id: 'number - Coin ID',
      period: 'string - Time period (1d, 7d, 30d, 1y, all)',
      pref: 'string - Preferred currency',
    },
    coinlist: {
      pref: 'string - Preferred currency',
      page: 'number - Page number',
      order: 'string - rank_asc, rank_desc, volume_desc',
    },
  },
  
  // Response Format
  responseFormat: {
    global: {
      coins: 'number',
      active_markets: 'number',
      total_mcap: 'number',
      total_volume: 'number',
    },
    coin: {
      symbol: 'string',
      name: 'string',
      price: 'number',
      market_cap: 'number',
      volume: 'number',
      change: 'number',
    },
  },
  
  // Data Coverage
  dataCoverage: {
    cryptocurrencies: '9,000+',
    exchanges: '300+',
    fiatCurrencies: '150+',
  },
  
  // Notes
  notes: [
    'Simple and straightforward API',
    'Free tier with 15,000 requests per month',
    'Real-time price data',
    'Historical data available',
    'Global market statistics',
    'CORS enabled',
    'Multiple fiat currency support',
    'Covers 9,000+ cryptocurrencies',
    'Easy to integrate',
  ],
};

export default coinlibAPI;

