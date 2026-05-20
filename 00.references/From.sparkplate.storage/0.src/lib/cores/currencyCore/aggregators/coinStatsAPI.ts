/**
 * CoinStats API
 * 
 * Crypto Portfolio Tracker and Market Data
 * Free public API for cryptocurrency prices and market data
 * 
 * @see https://coinstats.app/
 */

export const coinStatsAPI = {
  name: 'CoinStats',
  description: 'Crypto portfolio tracker with free public API',
  
  // API Configuration
  baseURL: 'https://api.coinstats.app/public/v1/',
  proBaseURL: 'https://openapiv1.coinstats.app/',
  apiVersion: 'v1',
  
  // Endpoints
  endpoints: {
    // Coins
    coins: '/coins',
    coinData: '/coins/{coin_id}',
    coinChart: '/charts',
    
    // Fiats
    fiats: '/fiats',
    
    // News
    news: '/news',
    newsType: '/news/type/{type}',
    newsCoin: '/news/coin/{coin_id}',
  },
  
  // Authentication
  authentication: {
    required: false,
    type: 'API Key (optional for Pro features)',
    headerName: 'X-API-KEY',
    note: 'Free tier does not require API key',
    getApiKey: 'https://coinstats.app/api',
  },
  
  // Rate Limits
  rateLimits: {
    free: {
      requestsPerMonth: 'Unlimited',
      note: 'Public endpoints available without API key',
      cost: 'Free',
    },
    pro: {
      requestsPerMonth: 'Higher limits',
      additionalFeatures: true,
      cost: 'Custom pricing',
    },
  },
  
  // NPM SDK
  npmPackages: {
    official: null,
    community: [
      {
        name: 'coinstats-api',
        url: 'https://www.npmjs.com/package/coinstats-api',
        install: 'npm install coinstats-api',
      },
      {
        name: 'node-coinstats',
        url: 'https://www.npmjs.com/package/node-coinstats',
        install: 'npm install node-coinstats',
      },
    ],
  },
  
  // Subgraph
  subgraph: {
    available: false,
    note: 'CoinStats does not provide a subgraph; uses REST API only',
  },
  
  // Documentation
  documentation: {
    main: 'https://documenter.getpostman.com/view/5734027/RzZ6Hzr3',
    postman: 'https://documenter.getpostman.com/view/5734027/RzZ6Hzr3',
    apiAccess: 'https://coinstats.app/api',
  },
  
  // Social Media
  socialMedia: {
    website: 'https://coinstats.app/',
    twitter: 'https://twitter.com/coinstats',
    telegram: 'https://t.me/coinstats',
    discord: 'https://discord.com/invite/coinstats',
    instagram: 'https://www.instagram.com/coinstats/',
    facebook: 'https://www.facebook.com/coinstats.app',
    reddit: 'https://www.reddit.com/r/CoinStats/',
    youtube: 'https://www.youtube.com/c/CoinStats',
    medium: 'https://medium.com/coinstats',
  },
  
  // Features
  features: {
    realTimePrices: true,
    historicalData: true,
    charts: true,
    marketData: true,
    newsData: true,
    portfolioTracking: true,
    fiatCurrencies: true,
    multiExchange: true,
  },
  
  // CORS Support
  cors: {
    enabled: true,
    note: 'CORS enabled for browser requests',
  },
  
  // Example Usage
  examples: {
    coins: 'https://api.coinstats.app/public/v1/coins',
    coinsLimited: 'https://api.coinstats.app/public/v1/coins?skip=0&limit=10&currency=USD',
    coinData: 'https://api.coinstats.app/public/v1/coins/bitcoin',
    chart: 'https://api.coinstats.app/public/v1/charts?period=24h&coinId=bitcoin',
    fiats: 'https://api.coinstats.app/public/v1/fiats',
    news: 'https://api.coinstats.app/public/v1/news',
    newsCoin: 'https://api.coinstats.app/public/v1/news/coin/bitcoin',
  },
  
  // Query Parameters
  queryParameters: {
    coins: {
      skip: 'number - Starting position',
      limit: 'number - Number of results',
      currency: 'string - Fiat currency (USD, EUR, etc.)',
    },
    charts: {
      period: 'string - 24h, 1w, 1m, 3m, 6m, 1y, all',
      coinId: 'string - Coin identifier',
    },
    news: {
      skip: 'number - Starting position',
      limit: 'number - Number of results',
    },
  },
  
  // Data Coverage
  dataCoverage: {
    cryptocurrencies: '10,000+',
    exchanges: '300+',
    fiatCurrencies: '150+',
    newsArticles: 'Updated daily',
  },
  
  // Notes
  notes: [
    'Free public API with no API key required',
    'Unlimited requests on free tier',
    'Real-time price data',
    'Portfolio tracking features',
    'Comprehensive news aggregation',
    'Clean and simple API design',
    'CORS enabled',
    'Covers 10,000+ cryptocurrencies',
    'Mobile apps available (iOS/Android)',
  ],
};

export default coinStatsAPI;

