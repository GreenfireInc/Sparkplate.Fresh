/**
 * CryptoCompare API
 * 
 * The ultimate API solution for cryptocurrency market data
 * Comprehensive free APIs for cryptocurrency market data
 * 
 * @see https://www.cryptocompare.com/
 */

export const cryptoCompareAPI = {
  name: 'CryptoCompare',
  description: 'The ultimate API solution for comprehensive cryptocurrency market data',
  
  // API Configuration
  baseURL: 'https://min-api.cryptocompare.com/data/',
  apiVersion: 'v1',
  
  // Endpoints
  endpoints: {
    // Price
    price: '/price',
    priceMulti: '/pricemulti',
    priceMultiFull: '/pricemultifull',
    generateAvg: '/generateAvg',
    dayAvg: '/dayAvg',
    priceHistorical: '/pricehistorical',
    
    // OHLCV
    histoMinute: '/v2/histominute',
    histoHour: '/v2/histohour',
    histoDay: '/v2/histoday',
    
    // Top Lists
    topTotalVolume: '/top/totalvolfull',
    topTotalMktCap: '/top/mktcapfull',
    topPairs: '/top/pairs',
    topExchanges: '/top/exchanges',
    topExchangesFull: '/top/exchanges/full',
    
    // Exchanges
    allExchanges: '/all/exchanges',
    
    // Coins
    allCoins: '/all/coinlist',
    
    // Social
    socialStats: '/social/coin/latest',
    socialStatsHistoHour: '/social/coin/histo/hour',
    socialStatsHistoDay: '/social/coin/histo/day',
    
    // News
    newsFeeds: '/news/feeds',
    newsCategories: '/news/categories',
    newsArticles: '/v2/news/',
    
    // Blockchain
    blockchainLatest: '/blockchain/latest',
    blockchainHistoDay: '/blockchain/histo/day',
    
    // Mining
    miningContracts: '/mining/contracts',
    miningEquipment: '/mining/equipment',
  },
  
  // Authentication
  authentication: {
    required: true,
    type: 'API Key',
    headerName: 'authorization',
    headerPrefix: 'Apikey ',
    note: 'Free tier available with API key',
    getApiKey: 'https://min-api.cryptocompare.com/pricing',
  },
  
  // Rate Limits
  rateLimits: {
    free: {
      callsPerSecond: 15,
      callsPerMinute: 100,
      callsPerHour: 1000,
      callsPerMonth: 100000,
      cost: 'Free',
    },
    hobbyist: {
      callsPerSecond: 30,
      callsPerMinute: 300,
      callsPerHour: 3000,
      callsPerMonth: 1000000,
      cost: '$29.99/month',
    },
  },
  
  // NPM SDK
  npmPackages: {
    official: null,
    community: [
      {
        name: 'cryptocompare',
        url: 'https://www.npmjs.com/package/cryptocompare',
        install: 'npm install cryptocompare',
      },
      {
        name: 'cryptocompare-api',
        url: 'https://www.npmjs.com/package/cryptocompare-api',
        install: 'npm install cryptocompare-api',
      },
      {
        name: 'crypto-compare',
        url: 'https://www.npmjs.com/package/crypto-compare',
        install: 'npm install crypto-compare',
      },
    ],
  },
  
  // Subgraph
  subgraph: {
    available: false,
    note: 'CryptoCompare does not provide a subgraph; uses REST API only',
  },
  
  // Documentation
  documentation: {
    main: 'https://min-api.cryptocompare.com/documentation',
    pricing: 'https://min-api.cryptocompare.com/pricing',
    apiReference: 'https://min-api.cryptocompare.com/documentation',
    quickstart: 'https://min-api.cryptocompare.com/documentation?key=Other&cat=allCoinsWithContentEndpoint',
  },
  
  // Social Media
  socialMedia: {
    website: 'https://www.cryptocompare.com/',
    twitter: 'https://twitter.com/cryptocompare',
    telegram: 'https://t.me/CryptoCompare',
    facebook: 'https://www.facebook.com/CryptoCompare',
    linkedin: 'https://www.linkedin.com/company/cryptocompare.com/',
    youtube: 'https://www.youtube.com/channel/UCJfTCfvDCf7vXEjI_kUpS0w',
    blog: 'https://www.cryptocompare.com/media/',
  },
  
  // Features
  features: {
    realTimePrices: true,
    historicalData: true,
    ohlcvData: true,
    marketData: true,
    exchangeData: true,
    socialStats: true,
    newsData: true,
    blockchainData: true,
    miningData: true,
    topLists: true,
    websocketSupport: true,
  },
  
  // CORS Support
  cors: {
    enabled: true,
    note: 'Supports browser requests with API key',
  },
  
  // Example Usage
  examples: {
    price: 'https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD,EUR',
    priceMulti: 'https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH&tsyms=USD,EUR',
    histoDay: 'https://min-api.cryptocompare.com/data/v2/histoday?fsym=BTC&tsym=USD&limit=30',
    topVolume: 'https://min-api.cryptocompare.com/data/top/totalvolfull?tsym=USD&limit=10',
  },
  
  // WebSocket
  websocket: {
    available: true,
    url: 'wss://streamer.cryptocompare.com/v2',
    note: 'Real-time streaming data available',
  },
  
  // Notes
  notes: [
    'Widely used API with comprehensive data',
    'Free tier with 100,000 calls per month',
    'Real-time and historical data',
    'Social media integration',
    'News aggregation',
    'WebSocket support for streaming data',
    'Covers 8,000+ cryptocurrencies',
  ],
};

export default cryptoCompareAPI;

