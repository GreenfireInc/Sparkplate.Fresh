/**
 * CoinLore API
 * 
 * Cryptocurrency Data API
 * Completely free, no API key or registration required
 * 
 * @see https://www.coinlore.com/
 */

export const coinLoreAPI = {
  name: 'CoinLore',
  description: 'Free cryptocurrency data API with no registration required',
  
  // API Configuration
  baseURL: 'https://api.coinlore.net/api/',
  apiVersion: 'v1',
  
  // Endpoints
  endpoints: {
    // Global Data
    global: '/global/',
    
    // Tickers
    tickers: '/tickers/',
    tickersStart: '/tickers/?start={start}&limit={limit}',
    tickerById: '/ticker/?id={id}',
    
    // Coin Markets
    coinMarkets: '/coin/markets/?id={id}',
    
    // Exchanges
    exchanges: '/exchanges/',
    exchangeById: '/exchange/?id={id}',
    
    // Social Stats
    socialStats: '/coin/social_stats/?id={id}',
  },
  
  // Authentication
  authentication: {
    required: false,
    type: 'None',
    note: 'Completely free, no API key or registration required',
  },
  
  // Rate Limits
  rateLimits: {
    free: {
      requestsPerSecond: 'No strict limit',
      note: 'Subject to fair use policy',
      cost: 'Free',
    },
  },
  
  // NPM SDK
  npmPackages: {
    official: null,
    community: [
      {
        name: 'coinlore',
        url: 'https://www.npmjs.com/package/coinlore',
        install: 'npm install coinlore',
      },
      {
        name: 'coinlore-api',
        url: 'https://www.npmjs.com/package/coinlore-api',
        install: 'npm install coinlore-api',
      },
      {
        name: 'node-coinlore',
        url: 'https://www.npmjs.com/package/node-coinlore',
        install: 'npm install node-coinlore',
      },
    ],
  },
  
  // Subgraph
  subgraph: {
    available: false,
    note: 'CoinLore does not provide a subgraph; uses REST API only',
  },
  
  // Documentation
  documentation: {
    main: 'https://www.coinlore.com/cryptocurrency-data-api',
    apiReference: 'https://www.coinlore.com/cryptocurrency-data-api',
  },
  
  // Social Media
  socialMedia: {
    website: 'https://www.coinlore.com/',
    twitter: 'https://twitter.com/CoinLore',
    facebook: 'https://www.facebook.com/CoinLore/',
  },
  
  // Features
  features: {
    realTimePrices: true,
    historicalData: false,
    globalStats: true,
    tickerData: true,
    marketData: true,
    exchangeData: true,
    socialStats: true,
    pagination: true,
  },
  
  // CORS Support
  cors: {
    enabled: true,
    note: 'Full CORS support for browser requests',
  },
  
  // Example Usage
  examples: {
    global: 'https://api.coinlore.net/api/global/',
    tickers: 'https://api.coinlore.net/api/tickers/',
    tickersPaginated: 'https://api.coinlore.net/api/tickers/?start=0&limit=100',
    tickerById: 'https://api.coinlore.net/api/ticker/?id=90',
    coinMarkets: 'https://api.coinlore.net/api/coin/markets/?id=90',
    exchanges: 'https://api.coinlore.net/api/exchanges/',
    socialStats: 'https://api.coinlore.net/api/coin/social_stats/?id=80',
  },
  
  // Response Format
  responseFormat: {
    global: {
      coins_count: 'number',
      active_markets: 'number',
      total_mcap: 'number',
      total_volume: 'number',
      btc_d: 'string (percentage)',
      eth_d: 'string (percentage)',
      mcap_change: 'string',
    },
    ticker: {
      id: 'string',
      symbol: 'string',
      name: 'string',
      nameid: 'string',
      rank: 'number',
      price_usd: 'string',
      percent_change_24h: 'string',
      percent_change_1h: 'string',
      percent_change_7d: 'string',
      market_cap_usd: 'string',
      volume24: 'number',
      volume24_native: 'number',
      csupply: 'string',
      price_btc: 'string',
      tsupply: 'string',
      msupply: 'string',
    },
  },
  
  // Data Coverage
  dataCoverage: {
    cryptocurrencies: '8,000+',
    exchanges: '200+',
    markets: 'Thousands',
  },
  
  // Notes
  notes: [
    'Completely free with no API key required',
    'No registration needed',
    'Simple and straightforward API',
    'Full CORS support',
    'Clean JSON responses',
    'Covers 8,000+ cryptocurrencies',
    'Global market statistics',
    'Social media statistics',
    'Fair use policy applies',
  ],
};

export default coinLoreAPI;

