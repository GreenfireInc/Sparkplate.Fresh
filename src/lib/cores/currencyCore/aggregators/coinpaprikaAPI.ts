/**
 * Coinpaprika API
 * 
 * Free & frequently updated market data from the world of crypto
 * Provides extensive cryptocurrency data for free
 * 
 * @see https://coinpaprika.com/
 */

export const coinpaprikaAPI = {
  name: 'Coinpaprika',
  description: 'Free & frequently updated market data from the world of crypto',
  
  // API Configuration
  baseURL: 'https://api.coinpaprika.com/v1/',
  apiVersion: 'v1',
  
  // Endpoints
  endpoints: {
    // Global
    global: '/global',
    
    // Coins
    coinsList: '/coins',
    coinData: '/coins/{coin_id}',
    coinTwitter: '/coins/{coin_id}/twitter',
    coinEvents: '/coins/{coin_id}/events',
    coinExchanges: '/coins/{coin_id}/exchanges',
    coinMarkets: '/coins/{coin_id}/markets',
    coinOHLC: '/coins/{coin_id}/ohlcv/latest',
    coinOHLCHistorical: '/coins/{coin_id}/ohlcv/historical',
    coinOHLCToday: '/coins/{coin_id}/ohlcv/today',
    
    // People
    peopleById: '/people/{person_id}',
    
    // Tags
    tags: '/tags',
    tagData: '/tags/{tag_id}',
    
    // Tickers
    tickers: '/tickers',
    tickerData: '/tickers/{coin_id}',
    tickersHistorical: '/tickers/{coin_id}/historical',
    
    // Exchanges
    exchanges: '/exchanges',
    exchangeData: '/exchanges/{exchange_id}',
    exchangeMarkets: '/exchanges/{exchange_id}/markets',
    
    // Search
    search: '/search',
    
    // Price Converter
    priceConverter: '/price-converter',
  },
  
  // Authentication
  authentication: {
    required: false,
    type: 'API Key (optional for higher limits)',
    note: 'Free tier does not require API key. Pro tier requires API key for higher limits.',
    getApiKey: 'https://coinpaprika.com/api',
  },
  
  // Rate Limits
  rateLimits: {
    free: {
      requestsPerMonth: 'Unlimited',
      callsPerSecond: 10,
      note: 'No API key required',
    },
    pro: {
      requestsPerMonth: 'Unlimited',
      callsPerSecond: 25,
      note: 'Requires API key',
    },
  },
  
  // NPM SDK
  npmPackages: {
    official: {
      name: '@coinpaprika/api-nodejs-client',
      url: 'https://www.npmjs.com/package/@coinpaprika/api-nodejs-client',
      install: 'npm install @coinpaprika/api-nodejs-client',
    },
    community: [
      {
        name: 'coinpaprika-js',
        url: 'https://www.npmjs.com/package/coinpaprika-js',
        install: 'npm install coinpaprika-js',
      },
      {
        name: 'coinpaprika-api-client',
        url: 'https://www.npmjs.com/package/coinpaprika-api-client',
        install: 'npm install coinpaprika-api-client',
      },
    ],
  },
  
  // Subgraph
  subgraph: {
    available: false,
    note: 'Coinpaprika does not provide a subgraph; uses REST API only',
  },
  
  // Documentation
  documentation: {
    main: 'https://api.coinpaprika.com/',
    apiReference: 'https://api.coinpaprika.com/',
    standards: 'https://api.coinpaprika.com/#section/Standards-and-conventions',
    errors: 'https://api.coinpaprika.com/#section/Standards-and-conventions/Errors',
    pagination: 'https://api.coinpaprika.com/#section/Standards-and-conventions/Pagination',
  },
  
  // Social Media
  socialMedia: {
    website: 'https://coinpaprika.com/',
    twitter: 'https://twitter.com/coinpaprika',
    telegram: 'https://t.me/coinpaprika',
    facebook: 'https://www.facebook.com/coinpaprika/',
    reddit: 'https://www.reddit.com/r/Coinpaprika/',
    medium: 'https://medium.com/@coinpaprika',
    github: 'https://github.com/coinpaprika',
    linkedin: 'https://www.linkedin.com/company/coinpaprika/',
  },
  
  // Features
  features: {
    realTimePrices: true,
    historicalData: true,
    marketData: true,
    exchangeData: true,
    ohlcvData: true,
    socialMediaData: true,
    eventsData: true,
    peopleProfiles: true,
    tags: true,
    search: true,
    priceConverter: true,
  },
  
  // CORS Support
  cors: {
    enabled: true,
    note: 'Full CORS support for browser requests',
  },
  
  // Example Usage
  examples: {
    tickers: 'https://api.coinpaprika.com/v1/tickers',
    coinData: 'https://api.coinpaprika.com/v1/coins/btc-bitcoin',
    tickerData: 'https://api.coinpaprika.com/v1/tickers/btc-bitcoin',
    global: 'https://api.coinpaprika.com/v1/global',
  },
  
  // Notes
  notes: [
    'Completely free API with no registration required',
    'Unlimited requests per month',
    'Real-time market data',
    'Covers 7,000+ cryptocurrencies',
    'Data from 400+ exchanges',
    'High-quality data with frequent updates',
    'Full CORS support',
  ],
};

export default coinpaprikaAPI;

