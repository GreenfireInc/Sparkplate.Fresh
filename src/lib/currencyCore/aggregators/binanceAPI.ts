/**
 * Binance API
 * 
 * Exchange for Trading Cryptocurrencies
 * World's largest cryptocurrency exchange by trading volume
 * 
 * @see https://www.binance.com/
 */

export const binanceAPI = {
  name: 'Binance',
  description: 'World\'s largest cryptocurrency exchange API',
  
  // API Configuration
  baseURL: 'https://api.binance.com/api/v3/',
  futuresURL: 'https://fapi.binance.com/',
  testnetURL: 'https://testnet.binance.vision/api/',
  apiVersion: 'v3',
  
  // Endpoints
  endpoints: {
    // Market Data
    ping: '/ping',
    time: '/time',
    exchangeInfo: '/exchangeInfo',
    depth: '/depth',
    trades: '/trades',
    historicalTrades: '/historicalTrades',
    aggTrades: '/aggTrades',
    klines: '/klines',
    avgPrice: '/avgPrice',
    ticker24hr: '/ticker/24hr',
    tickerPrice: '/ticker/price',
    tickerBookTicker: '/ticker/bookTicker',
    
    // Account (requires authentication)
    account: '/account',
    myTrades: '/myTrades',
    
    // Trading (requires authentication)
    order: '/order',
    orderTest: '/order/test',
    openOrders: '/openOrders',
    allOrders: '/allOrders',
    
    // User Data Stream
    listenKey: '/userDataStream',
  },
  
  // Authentication
  authentication: {
    required: false,
    type: 'API Key + HMAC SHA256 (for private endpoints)',
    headerName: 'X-MBX-APIKEY',
    note: 'Public endpoints do not require authentication',
    getApiKey: 'https://www.binance.com/en/my/settings/api-management',
  },
  
  // Rate Limits
  rateLimits: {
    public: {
      requestsPerMinute: 1200,
      weight: 'Weighted system (1-50 per request)',
      note: 'Public endpoints have no API key requirement',
    },
    private: {
      ordersPerSecond: 50,
      ordersPerDay: 160000,
      note: 'Requires API key',
    },
  },
  
  // NPM SDK
  npmPackages: {
    official: {
      name: '@binance/connector',
      url: 'https://www.npmjs.com/package/@binance/connector',
      install: 'npm install @binance/connector',
    },
    community: [
      {
        name: 'binance-api-node',
        url: 'https://www.npmjs.com/package/binance-api-node',
        install: 'npm install binance-api-node',
      },
      {
        name: 'node-binance-api',
        url: 'https://www.npmjs.com/package/node-binance-api',
        install: 'npm install node-binance-api',
      },
      {
        name: 'binance',
        url: 'https://www.npmjs.com/package/binance',
        install: 'npm install binance',
      },
    ],
  },
  
  // Subgraph
  subgraph: {
    available: false,
    note: 'Binance does not provide a subgraph; uses REST and WebSocket APIs',
  },
  
  // Documentation
  documentation: {
    main: 'https://binance-docs.github.io/apidocs/',
    spot: 'https://binance-docs.github.io/apidocs/spot/en/',
    futures: 'https://binance-docs.github.io/apidocs/futures/en/',
    websocket: 'https://binance-docs.github.io/apidocs/spot/en/#websocket-market-streams',
    developers: 'https://developers.binance.com/',
    apiManagement: 'https://www.binance.com/en/my/settings/api-management',
  },
  
  // Social Media
  socialMedia: {
    website: 'https://www.binance.com/',
    twitter: 'https://twitter.com/binance',
    telegram: 'https://t.me/binanceexchange',
    reddit: 'https://www.reddit.com/r/binance/',
    facebook: 'https://www.facebook.com/binance',
    instagram: 'https://www.instagram.com/binance/',
    youtube: 'https://www.youtube.com/c/BinanceOfficial',
    linkedin: 'https://www.linkedin.com/company/binance/',
    github: 'https://github.com/binance',
    blog: 'https://www.binance.com/en/blog',
  },
  
  // Features
  features: {
    realTimePrices: true,
    historicalData: true,
    orderBookData: true,
    tradesData: true,
    klineData: true,
    ticker24hr: true,
    trading: true,
    websocketSupport: true,
    testnetAvailable: true,
    futuresTrading: true,
    marginTrading: true,
  },
  
  // CORS Support
  cors: {
    enabled: true,
    note: 'CORS enabled for public endpoints',
  },
  
  // WebSocket
  websocket: {
    available: true,
    baseURL: 'wss://stream.binance.com:9443/ws',
    combinedURL: 'wss://stream.binance.com:9443/stream',
    endpoints: {
      aggTrade: '<symbol>@aggTrade',
      trade: '<symbol>@trade',
      kline: '<symbol>@kline_<interval>',
      miniTicker: '<symbol>@miniTicker',
      ticker: '<symbol>@ticker',
      bookTicker: '<symbol>@bookTicker',
      depth: '<symbol>@depth<levels>',
    },
    note: 'Real-time market data via WebSocket',
  },
  
  // Example Usage
  examples: {
    ping: 'https://api.binance.com/api/v3/ping',
    time: 'https://api.binance.com/api/v3/time',
    exchangeInfo: 'https://api.binance.com/api/v3/exchangeInfo',
    tickerPrice: 'https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT',
    ticker24hr: 'https://api.binance.com/api/v3/ticker/24hr?symbol=BTCUSDT',
    klines: 'https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1h&limit=24',
  },
  
  // Trading Pairs
  tradingPairs: {
    spot: '2,000+',
    futures: '300+',
    options: '50+',
  },
  
  // Notes
  notes: [
    'World\'s largest cryptocurrency exchange',
    'Free access to public endpoints',
    'No API key required for market data',
    'High rate limits',
    'WebSocket support for real-time data',
    'Testnet available for development',
    'Comprehensive documentation',
    'Multiple trading options (spot, futures, margin)',
  ],
};

export default binanceAPI;

