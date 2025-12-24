/**
 * Kraken API
 * 
 * Cryptocurrency Trading Platform and Exchange
 * One of the oldest and most trusted cryptocurrency exchanges
 * 
 * @see https://www.kraken.com/
 */

export const krakenAPI = {
  name: 'Kraken',
  description: 'Trusted cryptocurrency exchange with comprehensive API',
  
  // API Configuration
  baseURL: 'https://api.kraken.com/0/',
  futuresBaseURL: 'https://futures.kraken.com/',
  apiVersion: '0',
  
  // Endpoints
  endpoints: {
    // Public Market Data
    serverTime: '/public/Time',
    systemStatus: '/public/SystemStatus',
    assets: '/public/Assets',
    assetPairs: '/public/AssetPairs',
    ticker: '/public/Ticker',
    ohlc: '/public/OHLC',
    depth: '/public/Depth',
    trades: '/public/Trades',
    spread: '/public/Spread',
    
    // Private User Data (requires authentication)
    balance: '/private/Balance',
    tradeBalance: '/private/TradeBalance',
    openOrders: '/private/OpenOrders',
    closedOrders: '/private/ClosedOrders',
    queryOrders: '/private/QueryOrders',
    tradesHistory: '/private/TradesHistory',
    queryTrades: '/private/QueryTrades',
    openPositions: '/private/OpenPositions',
    ledgers: '/private/Ledgers',
    queryLedgers: '/private/QueryLedgers',
    tradeVolume: '/private/TradeVolume',
    
    // Private Trading (requires authentication)
    addOrder: '/private/AddOrder',
    cancelOrder: '/private/CancelOrder',
    cancelAllOrders: '/private/CancelAll',
  },
  
  // Authentication
  authentication: {
    required: false,
    type: 'API Key + HMAC-SHA512 (for private endpoints)',
    headerName: 'API-Key',
    note: 'Public endpoints do not require authentication',
    getApiKey: 'https://www.kraken.com/u/security/api',
  },
  
  // Rate Limits
  rateLimits: {
    public: {
      requestsPerSecond: 'Variable (counter-based system)',
      note: 'Public endpoints have generous limits',
    },
    private: {
      requestsPerSecond: 'Variable (counter-based system)',
      maxCounter: 20,
      note: 'Each call has a cost that decreases the counter',
    },
  },
  
  // NPM SDK
  npmPackages: {
    official: null,
    community: [
      {
        name: 'kraken-api',
        url: 'https://www.npmjs.com/package/kraken-api',
        install: 'npm install kraken-api',
      },
      {
        name: 'node-kraken-api',
        url: 'https://www.npmjs.com/package/node-kraken-api',
        install: 'npm install node-kraken-api',
      },
      {
        name: 'kraken-exchange-api',
        url: 'https://www.npmjs.com/package/kraken-exchange-api',
        install: 'npm install kraken-exchange-api',
      },
    ],
  },
  
  // Subgraph
  subgraph: {
    available: false,
    note: 'Kraken does not provide a subgraph; uses REST and WebSocket APIs',
  },
  
  // Documentation
  documentation: {
    main: 'https://docs.kraken.com/rest/',
    websocket: 'https://docs.kraken.com/websockets/',
    apiReference: 'https://docs.kraken.com/rest/',
    general: 'https://support.kraken.com/hc/en-us/sections/360012894412-API',
    authentication: 'https://docs.kraken.com/rest/#section/Authentication',
    rateLimits: 'https://docs.kraken.com/rest/#section/Rate-Limits',
  },
  
  // Social Media
  socialMedia: {
    website: 'https://www.kraken.com/',
    twitter: 'https://twitter.com/krakenfx',
    telegram: 'https://t.me/kraken_exchange_official',
    reddit: 'https://www.reddit.com/r/Kraken/',
    facebook: 'https://www.facebook.com/KrakenFX',
    instagram: 'https://www.instagram.com/kraken_fx/',
    youtube: 'https://www.youtube.com/c/KrakenBitcoinExchange',
    linkedin: 'https://www.linkedin.com/company/krakenfx/',
    blog: 'https://blog.kraken.com/',
    github: 'https://github.com/krakenexchange',
  },
  
  // Features
  features: {
    realTimePrices: true,
    historicalData: true,
    ohlcData: true,
    orderBookData: true,
    tradesData: true,
    spreadData: true,
    trading: true,
    marginTrading: true,
    futuresTrading: true,
    staking: true,
    websocketSupport: true,
  },
  
  // CORS Support
  cors: {
    enabled: false,
    note: 'CORS not enabled; use proxy for browser requests',
  },
  
  // WebSocket
  websocket: {
    available: true,
    publicURL: 'wss://ws.kraken.com/',
    privateURL: 'wss://ws-auth.kraken.com/',
    channels: [
      'ticker',
      'ohlc',
      'trade',
      'spread',
      'book',
      'ownTrades',
      'openOrders',
    ],
    note: 'Real-time market data via WebSocket',
  },
  
  // Example Usage
  examples: {
    serverTime: 'https://api.kraken.com/0/public/Time',
    systemStatus: 'https://api.kraken.com/0/public/SystemStatus',
    assets: 'https://api.kraken.com/0/public/Assets',
    assetPairs: 'https://api.kraken.com/0/public/AssetPairs',
    ticker: 'https://api.kraken.com/0/public/Ticker?pair=XXBTZUSD',
    ohlc: 'https://api.kraken.com/0/public/OHLC?pair=XXBTZUSD&interval=60',
    depth: 'https://api.kraken.com/0/public/Depth?pair=XXBTZUSD',
  },
  
  // Supported Assets
  supportedAssets: {
    cryptocurrencies: '200+',
    fiatCurrencies: '7',
    tradingPairs: '400+',
    stakingAssets: '15+',
  },
  
  // Notes
  notes: [
    'One of the oldest and most trusted exchanges (founded 2011)',
    'Free public API endpoints',
    'Regulated and compliant',
    'Low fees and high liquidity',
    'Advanced trading features',
    'WebSocket support for real-time data',
    'Comprehensive documentation',
    'Strong security track record',
  ],
};

export default krakenAPI;

