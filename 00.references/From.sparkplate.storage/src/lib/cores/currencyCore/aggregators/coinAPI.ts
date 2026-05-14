/**
 * CoinAPI
 * 
 * All Currency Exchanges integrate under a single API
 * One-stop solution market data provider for cryptocurrency markets
 * 
 * @see https://www.coinapi.io/
 */

export const coinAPI = {
  name: 'CoinAPI',
  description: 'Unified real-time and historical cryptocurrency market data API',
  
  // API Configuration
  baseURL: 'https://rest.coinapi.io/v1/',
  apiVersion: 'v1',
  
  // Endpoints
  endpoints: {
    // Metadata
    exchanges: '/exchanges',
    exchangeIcons: '/exchanges/icons/{icon_size}',
    assets: '/assets',
    assetIcons: '/assets/icons/{icon_size}',
    symbols: '/symbols',
    
    // Exchange Rates
    exchangeRateCurrent: '/exchangerate/{asset_id_base}/{asset_id_quote}',
    exchangeRateHistory: '/exchangerate/{asset_id_base}/{asset_id_quote}/history',
    exchangeRateAll: '/exchangerate/{asset_id_base}',
    
    // OHLCV
    ohlcvLatest: '/ohlcv/{symbol_id}/latest',
    ohlcvHistorical: '/ohlcv/{symbol_id}/history',
    ohlcvPeriods: '/ohlcv/periods',
    
    // Trades
    tradesLatest: '/trades/{symbol_id}/latest',
    tradesHistorical: '/trades/{symbol_id}/history',
    tradesCurrentAll: '/trades/latest',
    
    // Quotes
    quotesLatest: '/quotes/{symbol_id}/latest',
    quotesHistorical: '/quotes/{symbol_id}/history',
    quotesCurrentAll: '/quotes/latest',
    
    // Orderbooks
    orderbooksLatest: '/orderbooks/{symbol_id}/latest',
    orderbooksHistorical: '/orderbooks/{symbol_id}/history',
    orderbooksCurrentAll: '/orderbooks/latest',
    
    // Order Book L3
    orderbookL3Latest: '/orderbooks3/{symbol_id}/latest',
    orderbookL3Historical: '/orderbooks3/{symbol_id}/history',
  },
  
  // Authentication
  authentication: {
    required: true,
    type: 'API Key',
    headerName: 'X-CoinAPI-Key',
    note: 'Free tier available with API key',
    getApiKey: 'https://www.coinapi.io/pricing',
  },
  
  // Rate Limits
  rateLimits: {
    free: {
      requestsPerDay: 100,
      cost: 'Free',
      note: 'Limited to 100 requests per day',
    },
    startup: {
      requestsPerDay: 10000,
      cost: '$79/month',
    },
    streamer: {
      requestsPerDay: 100000,
      cost: '$299/month',
    },
    professional: {
      requestsPerDay: 1000000,
      cost: '$999/month',
    },
  },
  
  // NPM SDK
  npmPackages: {
    official: {
      name: 'coinapi-sdk',
      url: 'https://www.npmjs.com/package/coinapi-sdk',
      install: 'npm install coinapi-sdk',
    },
    community: [
      {
        name: '@coinapi/rest',
        url: 'https://www.npmjs.com/package/@coinapi/rest',
        install: 'npm install @coinapi/rest',
      },
      {
        name: 'coinapi-io',
        url: 'https://www.npmjs.com/package/coinapi-io',
        install: 'npm install coinapi-io',
      },
    ],
  },
  
  // Subgraph
  subgraph: {
    available: false,
    note: 'CoinAPI does not provide a subgraph; uses REST and WebSocket APIs',
  },
  
  // Documentation
  documentation: {
    main: 'https://docs.coinapi.io/',
    restAPI: 'https://docs.coinapi.io/market-data/rest-api',
    websocket: 'https://docs.coinapi.io/market-data/websocket-api',
    quickstart: 'https://docs.coinapi.io/market-data/rest-api/getting-started',
    pricing: 'https://www.coinapi.io/pricing',
    support: 'https://support.coinapi.io/',
  },
  
  // Social Media
  socialMedia: {
    website: 'https://www.coinapi.io/',
    twitter: 'https://twitter.com/CoinAPI_io',
    linkedin: 'https://www.linkedin.com/company/coinapi/',
    github: 'https://github.com/coinapi',
    youtube: 'https://www.youtube.com/channel/UCENzOhBfVZz9B5L7gLTmPrQ',
  },
  
  // Features
  features: {
    realTimePrices: true,
    historicalData: true,
    ohlcvData: true,
    tradesData: true,
    quotesData: true,
    orderBookData: true,
    exchangeRates: true,
    metadata: true,
    icons: true,
    websocketSupport: true,
    fixProtocol: true,
  },
  
  // CORS Support
  cors: {
    enabled: true,
    note: 'CORS enabled for browser requests',
  },
  
  // WebSocket
  websocket: {
    available: true,
    url: 'wss://ws.coinapi.io/v1/',
    note: 'Real-time streaming data via WebSocket',
  },
  
  // FIX Protocol
  fix: {
    available: true,
    note: 'FIX 4.4 protocol support for institutional clients',
  },
  
  // Example Usage
  examples: {
    exchanges: 'https://rest.coinapi.io/v1/exchanges',
    assets: 'https://rest.coinapi.io/v1/assets',
    symbols: 'https://rest.coinapi.io/v1/symbols',
    exchangeRate: 'https://rest.coinapi.io/v1/exchangerate/BTC/USD',
    ohlcvLatest: 'https://rest.coinapi.io/v1/ohlcv/BITSTAMP_SPOT_BTC_USD/latest',
  },
  
  // Coverage
  coverage: {
    exchanges: '350+',
    cryptocurrencies: '20,000+',
    tradingPairs: '100,000+',
    dataPoints: 'Billions',
  },
  
  // Notes
  notes: [
    'Institutional-grade market data',
    'Free tier with 100 requests per day',
    'Unified API for all exchanges',
    'Real-time and historical data',
    'WebSocket and FIX protocol support',
    'Covers 350+ exchanges',
    'High reliability and uptime',
    'Extensive documentation',
  ],
};

export default coinAPI;

