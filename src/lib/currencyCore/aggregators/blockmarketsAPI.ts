/**
 * Blockmarkets API
 * 
 * Institutional-grade cryptocurrency market data
 * Free cryptocurrency API with unlimited monthly requests
 * 
 * @see https://blockmarkets.io/
 */

export const blockmarketsAPI = {
  name: 'Blockmarkets',
  description: 'Institutional-grade cryptocurrency market data API',
  
  // API Configuration
  baseURL: 'https://api.blockmarkets.io/v1/',
  apiVersion: 'v1',
  
  // Endpoints
  endpoints: {
    // Market Data
    markets: '/markets',
    ticker: '/ticker',
    orderbook: '/orderbook',
    trades: '/trades',
    
    // Historical Data
    ohlcv: '/ohlcv',
    
    // Exchange Data
    exchanges: '/exchanges',
    
    // Benchmarks
    benchmarks: '/benchmarks',
  },
  
  // Authentication
  authentication: {
    required: true,
    type: 'API Key',
    headerName: 'x-api-key',
    note: 'Free tier available with unlimited requests (as claimed)',
    getApiKey: 'https://blockmarkets.io/api',
  },
  
  // Rate Limits
  rateLimits: {
    free: {
      requestsPerMonth: 'Unlimited (as advertised)',
      note: 'Real-time and historical data included',
      cost: 'Free',
    },
  },
  
  // NPM SDK
  npmPackages: {
    official: null,
    community: [
      {
        name: 'blockmarkets',
        url: 'https://www.npmjs.com/package/blockmarkets',
        install: 'npm install blockmarkets',
      },
    ],
  },
  
  // Subgraph
  subgraph: {
    available: false,
    note: 'Blockmarkets does not provide a subgraph; uses REST API only',
  },
  
  // Documentation
  documentation: {
    main: 'https://blockmarkets.io/api-documentation',
    apiReference: 'https://blockmarkets.io/api-documentation',
    pricing: 'https://blockmarkets.io/pricing',
  },
  
  // Social Media
  socialMedia: {
    website: 'https://blockmarkets.io/',
    twitter: 'https://twitter.com/blockmarkets_co',
    linkedin: 'https://www.linkedin.com/company/blockmarkets/',
    medium: 'https://medium.com/@blockmarkets',
  },
  
  // Features
  features: {
    realTimePrices: true,
    historicalData: true,
    ohlcvData: true,
    orderBookData: true,
    tradesData: true,
    exchangeData: true,
    benchmarks: true,
    institutionalGrade: true,
  },
  
  // CORS Support
  cors: {
    enabled: true,
    note: 'CORS enabled for browser requests',
  },
  
  // Example Usage
  examples: {
    markets: 'https://api.blockmarkets.io/v1/markets',
    ticker: 'https://api.blockmarkets.io/v1/ticker',
    orderbook: 'https://api.blockmarkets.io/v1/orderbook?market=BTC-USD',
    trades: 'https://api.blockmarkets.io/v1/trades?market=BTC-USD',
    ohlcv: 'https://api.blockmarkets.io/v1/ohlcv?market=BTC-USD&interval=1h',
  },
  
  // Data Quality
  dataQuality: {
    institutionalGrade: true,
    normalized: true,
    cleaned: true,
    validated: true,
  },
  
  // Data Coverage
  dataCoverage: {
    exchanges: '100+',
    tradingPairs: 'Thousands',
    dataPoints: 'Real-time and historical',
  },
  
  // Notes
  notes: [
    'Institutional-grade data quality',
    'Free tier with unlimited requests (as advertised)',
    'Real-time and historical data',
    'Normalized and standardized data',
    'OHLCV data available',
    'Order book depth',
    'Trade history',
    'Benchmark indices',
    'CORS enabled',
  ],
};

export default blockmarketsAPI;

