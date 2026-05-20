/**
 * Coinbase API
 * 
 * Bitcoin, Bitcoin Cash, Litecoin and Ethereum Prices
 * Leading cryptocurrency exchange platform
 * 
 * @see https://www.coinbase.com/
 */

export const coinbaseAPI = {
  name: 'Coinbase',
  description: 'Leading cryptocurrency exchange platform API',
  
  // API Configuration
  baseURL: 'https://api.coinbase.com/v2/',
  proBaseURL: 'https://api.exchange.coinbase.com/',
  cloudBaseURL: 'https://api.cloud.coinbase.com/',
  apiVersion: 'v2',
  
  // Endpoints
  endpoints: {
    // Data API (v2)
    currencies: '/currencies',
    exchangeRates: '/exchange-rates',
    prices: '/prices/{currency_pair}/spot',
    pricesBuy: '/prices/{currency_pair}/buy',
    pricesSell: '/prices/{currency_pair}/sell',
    time: '/time',
    
    // Users (requires authentication)
    user: '/user',
    accounts: '/accounts',
    account: '/accounts/{account_id}',
    
    // Transactions (requires authentication)
    transactions: '/accounts/{account_id}/transactions',
    transaction: '/accounts/{account_id}/transactions/{transaction_id}',
    
    // Coinbase Pro (Advanced Trade)
    proProducts: '/products',
    proProductBook: '/products/{product_id}/book',
    proProductTicker: '/products/{product_id}/ticker',
    proProductTrades: '/products/{product_id}/trades',
    proProductCandles: '/products/{product_id}/candles',
    proProductStats: '/products/{product_id}/stats',
  },
  
  // Authentication
  authentication: {
    required: false,
    type: 'OAuth2 or API Key (for private endpoints)',
    note: 'Public endpoints do not require authentication',
    getApiKey: 'https://www.coinbase.com/settings/api',
    oauth: 'https://docs.cloud.coinbase.com/sign-in-with-coinbase/docs/api-users',
  },
  
  // Rate Limits
  rateLimits: {
    public: {
      requestsPerHour: 10000,
      note: 'Public endpoints',
    },
    private: {
      requestsPerHour: 10000,
      note: 'Requires API key',
    },
    pro: {
      requestsPerSecond: 10,
      note: 'Coinbase Pro/Advanced Trade API',
    },
  },
  
  // NPM SDK
  npmPackages: {
    official: {
      name: 'coinbase',
      url: 'https://www.npmjs.com/package/coinbase',
      install: 'npm install coinbase',
    },
    community: [
      {
        name: 'coinbase-pro',
        url: 'https://www.npmjs.com/package/coinbase-pro',
        install: 'npm install coinbase-pro',
      },
      {
        name: '@coinbase/coinbase-sdk',
        url: 'https://www.npmjs.com/package/@coinbase/coinbase-sdk',
        install: 'npm install @coinbase/coinbase-sdk',
      },
      {
        name: 'coinbase-api',
        url: 'https://www.npmjs.com/package/coinbase-api',
        install: 'npm install coinbase-api',
      },
    ],
  },
  
  // Subgraph
  subgraph: {
    available: false,
    note: 'Coinbase does not provide a subgraph; uses REST and WebSocket APIs',
  },
  
  // Documentation
  documentation: {
    main: 'https://docs.cloud.coinbase.com/',
    api: 'https://docs.cloud.coinbase.com/sign-in-with-coinbase/docs/api-users',
    advancedTrade: 'https://docs.cloud.coinbase.com/advanced-trade-api/docs/',
    pro: 'https://docs.cloud.coinbase.com/exchange/docs/',
    webhooks: 'https://docs.cloud.coinbase.com/sign-in-with-coinbase/docs/api-webhooks',
    commerce: 'https://docs.cloud.coinbase.com/commerce/docs/',
  },
  
  // Social Media
  socialMedia: {
    website: 'https://www.coinbase.com/',
    twitter: 'https://twitter.com/coinbase',
    facebook: 'https://www.facebook.com/Coinbase',
    instagram: 'https://www.instagram.com/coinbase/',
    reddit: 'https://www.reddit.com/r/CoinBase/',
    linkedin: 'https://www.linkedin.com/company/coinbase/',
    youtube: 'https://www.youtube.com/c/CoinbaseOfficial',
    blog: 'https://blog.coinbase.com/',
    github: 'https://github.com/coinbase',
  },
  
  // Features
  features: {
    realTimePrices: true,
    historicalData: true,
    exchangeRates: true,
    spotPrices: true,
    buyPrices: true,
    sellPrices: true,
    trading: true,
    walletManagement: true,
    oauth2Support: true,
    webhooks: true,
    websocketSupport: true,
    commerceAPI: true,
  },
  
  // CORS Support
  cors: {
    enabled: true,
    note: 'CORS enabled for public endpoints',
  },
  
  // WebSocket
  websocket: {
    available: true,
    url: 'wss://ws-feed.exchange.coinbase.com',
    channels: ['ticker', 'level2', 'matches', 'full', 'user'],
    note: 'Real-time market data via WebSocket (Coinbase Pro)',
  },
  
  // Example Usage
  examples: {
    currencies: 'https://api.coinbase.com/v2/currencies',
    exchangeRates: 'https://api.coinbase.com/v2/exchange-rates?currency=USD',
    spotPrice: 'https://api.coinbase.com/v2/prices/BTC-USD/spot',
    buyPrice: 'https://api.coinbase.com/v2/prices/BTC-USD/buy',
    sellPrice: 'https://api.coinbase.com/v2/prices/BTC-USD/sell',
    proProducts: 'https://api.exchange.coinbase.com/products',
    proTicker: 'https://api.exchange.coinbase.com/products/BTC-USD/ticker',
  },
  
  // Supported Assets
  supportedAssets: {
    cryptocurrencies: '200+',
    fiatCurrencies: '100+',
    tradingPairs: '400+',
  },
  
  // Notes
  notes: [
    'One of the largest and most trusted exchanges',
    'Free tier available for public data',
    'Regulated and compliant',
    'Separate APIs for retail and pro trading',
    'OAuth2 support for user authentication',
    'Webhook notifications available',
    'Comprehensive SDKs and libraries',
    'Commerce API for merchant integration',
  ],
};

export default coinbaseAPI;

