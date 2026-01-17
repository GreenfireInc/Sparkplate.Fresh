/**
 * Messari API
 * 
 * Crypto Research, Data, and Tools
 * Free API suite with real-time structured data
 * 
 * @see https://messari.io/
 */

export const messariAPI = {
  name: 'Messari',
  description: 'Institutional-grade crypto research and data platform',
  
  // API Configuration
  baseURL: 'https://data.messari.io/api/v1/',
  v2BaseURL: 'https://data.messari.io/api/v2/',
  apiVersion: 'v1',
  
  // Endpoints
  endpoints: {
    // Assets
    assets: '/assets',
    assetProfile: '/assets/{asset_key}/profile',
    assetMetrics: '/assets/{asset_key}/metrics',
    assetMarketData: '/assets/{asset_key}/metrics/market-data',
    
    // Markets
    markets: '/markets',
    marketTimeseries: '/markets/{market_key}/metrics/{metric_id}/time-series',
    
    // News
    news: '/news',
    newsAsset: '/news/{asset_key}',
    
    // Research (Pro)
    reports: '/research/reports',
    
    // Time Series
    timeseries: '/assets/{asset_key}/metrics/{metric_id}/time-series',
  },
  
  // Authentication
  authentication: {
    required: false,
    type: 'API Key (recommended for higher limits)',
    headerName: 'x-messari-api-key',
    note: 'Free tier available without API key, but rate limited',
    getApiKey: 'https://messari.io/api',
  },
  
  // Rate Limits
  rateLimits: {
    free: {
      requestsPerMinute: 20,
      requestsPerDay: 1000,
      note: 'No API key required',
      cost: 'Free',
    },
    basic: {
      requestsPerMinute: 30,
      requestsPerDay: 2000,
      cost: '$24.99/month',
    },
    pro: {
      requestsPerMinute: 'Custom',
      fullDataAccess: true,
      cost: 'Custom pricing',
    },
  },
  
  // NPM SDK
  npmPackages: {
    official: null,
    community: [
      {
        name: 'messari-api',
        url: 'https://www.npmjs.com/package/messari-api',
        install: 'npm install messari-api',
      },
      {
        name: 'messari',
        url: 'https://www.npmjs.com/package/messari',
        install: 'npm install messari',
      },
    ],
  },
  
  // Subgraph
  subgraph: {
    available: true,
    networks: [
      'Ethereum',
      'BSC',
      'Polygon',
      'Arbitrum',
      'Optimism',
      'Avalanche',
      'Fantom',
    ],
    url: 'https://subgraphs.messari.io/',
    documentation: 'https://docs.messari.io/messari/subgraphs',
    note: 'Messari provides extensive DeFi protocol subgraphs',
  },
  
  // Documentation
  documentation: {
    main: 'https://messari.io/api/docs',
    quickstart: 'https://messari.io/api/docs#getting-started',
    assets: 'https://messari.io/api/docs#tag/Assets',
    markets: 'https://messari.io/api/docs#tag/Markets',
    news: 'https://messari.io/api/docs#tag/News',
    subgraphs: 'https://docs.messari.io/messari/subgraphs',
  },
  
  // Social Media
  socialMedia: {
    website: 'https://messari.io/',
    twitter: 'https://twitter.com/messaricrypto',
    telegram: 'https://t.me/messaricrypto',
    discord: 'https://discord.com/invite/messari',
    youtube: 'https://www.youtube.com/c/MessariCrypto',
    linkedin: 'https://www.linkedin.com/company/messari/',
    github: 'https://github.com/messari',
    blog: 'https://messari.io/research',
  },
  
  // Features
  features: {
    realTimePrices: true,
    historicalData: true,
    assetProfiles: true,
    marketMetrics: true,
    onChainMetrics: true,
    newsData: true,
    researchReports: true,
    timeSeries: true,
    subgraphs: true,
    defiData: true,
  },
  
  // CORS Support
  cors: {
    enabled: true,
    note: 'CORS enabled for browser requests',
  },
  
  // Example Usage
  examples: {
    assets: 'https://data.messari.io/api/v1/assets',
    assetProfile: 'https://data.messari.io/api/v1/assets/bitcoin/profile',
    assetMetrics: 'https://data.messari.io/api/v1/assets/bitcoin/metrics',
    marketData: 'https://data.messari.io/api/v1/assets/bitcoin/metrics/market-data',
    news: 'https://data.messari.io/api/v1/news',
    timeSeries: 'https://data.messari.io/api/v1/assets/bitcoin/metrics/price/time-series',
  },
  
  // Data Coverage
  dataCoverage: {
    assets: '3,000+',
    markets: '500+',
    protocols: '100+',
    subgraphs: '50+',
    researchReports: '1,000+',
  },
  
  // Notes
  notes: [
    'Institutional-grade research and data',
    'Free tier with 1,000 calls per day',
    'Comprehensive asset profiles',
    'High-quality curated data',
    'DeFi protocol subgraphs available',
    'Regular research reports',
    'On-chain and off-chain metrics',
    'Strong focus on data quality and transparency',
  ],
};

export default messariAPI;

