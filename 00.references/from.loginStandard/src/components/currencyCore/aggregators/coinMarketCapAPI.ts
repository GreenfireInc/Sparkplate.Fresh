/**
 * CoinMarketCap API
 * 
 * Enterprise-grade cryptocurrency API for all crypto data use cases
 * Live price streaming, whitepaper search, charts snapshot and more
 * 
 * @see https://coinmarketcap.com/
 */

export const coinMarketCapAPI = {
  name: 'CoinMarketCap',
  description: 'Enterprise-grade cryptocurrency API for cryptocurrencies prices and market data',
  
  // API Configuration
  baseURL: 'https://pro-api.coinmarketcap.com/v1/',
  sandboxURL: 'https://sandbox-api.coinmarketcap.com/v1/',
  apiVersion: 'v1',
  
  // Endpoints
  endpoints: {
    // Cryptocurrency
    cryptoMap: '/cryptocurrency/map',
    cryptoInfo: '/cryptocurrency/info',
    cryptoListingsLatest: '/cryptocurrency/listings/latest',
    cryptoListingsHistorical: '/cryptocurrency/listings/historical',
    cryptoQuotesLatest: '/cryptocurrency/quotes/latest',
    cryptoQuotesHistorical: '/cryptocurrency/quotes/historical',
    cryptoMarketPairsLatest: '/cryptocurrency/market-pairs/latest',
    cryptoOHLCVLatest: '/cryptocurrency/ohlcv/latest',
    cryptoOHLCVHistorical: '/cryptocurrency/ohlcv/historical',
    cryptoPricePerformanceStats: '/cryptocurrency/price-performance-stats/latest',
    cryptoCategories: '/cryptocurrency/categories',
    cryptoCategory: '/cryptocurrency/category',
    cryptoAirdrop: '/cryptocurrency/airdrop',
    cryptoTrending: '/cryptocurrency/trending/latest',
    
    // Exchange
    exchangeMap: '/exchange/map',
    exchangeInfo: '/exchange/info',
    exchangeListingsLatest: '/exchange/listings/latest',
    exchangeQuotesLatest: '/exchange/quotes/latest',
    exchangeMarketPairsLatest: '/exchange/market-pairs/latest',
    
    // Global Metrics
    globalMetricsLatest: '/global-metrics/quotes/latest',
    globalMetricsHistorical: '/global-metrics/quotes/historical',
    
    // Tools
    priceConversion: '/tools/price-conversion',
    
    // Blockchain
    blockchainStatisticsLatest: '/blockchain/statistics/latest',
    
    // Fiat
    fiatMap: '/fiat/map',
    
    // Partners
    partnersFCASListingsLatest: '/partners/flipside-crypto/fcas/listings/latest',
    partnersFCASQuotesLatest: '/partners/flipside-crypto/fcas/quotes/latest',
  },
  
  // Authentication
  authentication: {
    required: true,
    type: 'API Key',
    headerName: 'X-CMC_PRO_API_KEY',
    note: 'Required for all requests',
    getApiKey: 'https://pro.coinmarketcap.com/signup',
  },
  
  // Rate Limits
  rateLimits: {
    basic: {
      callsPerMonth: 10000,
      callsPerMinute: 30,
      cost: 'Free',
    },
    hobbyist: {
      callsPerMonth: 30000,
      callsPerMinute: 60,
      cost: '$29/month',
    },
    startup: {
      callsPerMonth: 120000,
      callsPerMinute: 60,
      cost: '$79/month',
    },
  },
  
  // NPM SDK
  npmPackages: {
    official: null,
    community: [
      {
        name: 'coinmarketcap-api',
        url: 'https://www.npmjs.com/package/coinmarketcap-api',
        install: 'npm install coinmarketcap-api',
      },
      {
        name: 'coinmarketcap-wrapper',
        url: 'https://www.npmjs.com/package/coinmarketcap-wrapper',
        install: 'npm install coinmarketcap-wrapper',
      },
      {
        name: 'node-coinmarketcap',
        url: 'https://www.npmjs.com/package/node-coinmarketcap',
        install: 'npm install node-coinmarketcap',
      },
    ],
  },
  
  // Subgraph
  subgraph: {
    available: false,
    note: 'CoinMarketCap does not provide a subgraph; uses REST API only',
  },
  
  // Documentation
  documentation: {
    main: 'https://coinmarketcap.com/api/documentation/v1/',
    quickstart: 'https://coinmarketcap.com/api/documentation/v1/#section/Quick-Start-Guide',
    authentication: 'https://coinmarketcap.com/api/documentation/v1/#section/Authentication',
    standards: 'https://coinmarketcap.com/api/documentation/v1/#section/Standards-and-Conventions',
    pricing: 'https://coinmarketcap.com/api/pricing/',
    support: 'https://coinmarketcap.com/api/support/',
  },
  
  // Social Media
  socialMedia: {
    website: 'https://coinmarketcap.com/',
    twitter: 'https://twitter.com/CoinMarketCap',
    telegram: 'https://t.me/CoinMarketCapOfficial',
    facebook: 'https://www.facebook.com/CoinMarketCap',
    reddit: 'https://www.reddit.com/r/CoinMarketCap/',
    linkedin: 'https://www.linkedin.com/company/coinmarketcap/',
    instagram: 'https://www.instagram.com/coinmarketcap/',
    youtube: 'https://www.youtube.com/c/CoinMarketCap',
    blog: 'https://coinmarketcap.com/blog/',
    discord: 'https://discord.com/invite/coinmarketcap',
  },
  
  // Features
  features: {
    realTimePrices: true,
    historicalData: true,
    marketData: true,
    exchangeData: true,
    globalMetrics: true,
    nftData: true,
    defiData: true,
    priceConversion: true,
    fcasRatings: true,
    whitepaperSearch: true,
    portfolioTracking: false,
  },
  
  // CORS Support
  cors: {
    enabled: true,
    note: 'Supports browser requests with API key',
  },
  
  // Example Usage
  examples: {
    listingsLatest: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=100',
    quotesLatest: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=BTC,ETH',
    priceConversion: 'https://pro-api.coinmarketcap.com/v1/tools/price-conversion?amount=1&symbol=BTC&convert=USD',
  },
  
  // Notes
  notes: [
    'Requires API key for all requests',
    'Free tier provides 10,000 calls per month',
    'Most widely recognized crypto data source',
    'Covers 9,000+ cryptocurrencies',
    'Data from 380+ exchanges',
    'Sandbox environment available for testing',
  ],
};

export default coinMarketCapAPI;

