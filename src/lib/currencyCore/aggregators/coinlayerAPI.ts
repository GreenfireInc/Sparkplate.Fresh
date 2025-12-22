/**
 * Coinlayer API
 * 
 * Real-time cryptocurrency exchange rates JSON API
 * Supports 385+ cryptocurrencies and 25+ exchanges
 * 
 * @see https://coinlayer.com/
 */

export const coinlayerAPI = {
  name: 'Coinlayer',
  description: 'Real-time cryptocurrency exchange rates JSON API',
  
  // API Configuration
  baseURL: 'https://api.coinlayer.com/',
  httpsBaseURL: 'https://api.coinlayer.com/', // HTTPS available on paid plans
  apiVersion: 'v1',
  
  // Endpoints
  endpoints: {
    // Live Rates
    live: '/live',
    
    // Historical Rates
    historical: '/{YYYY-MM-DD}',
    
    // Convert
    convert: '/convert',
    
    // Timeframe
    timeframe: '/timeframe',
    
    // Change
    change: '/change',
    
    // List
    list: '/list',
  },
  
  // Authentication
  authentication: {
    required: true,
    type: 'API Key',
    parameterName: 'access_key',
    note: 'Free tier available with API key',
    getApiKey: 'https://coinlayer.com/product',
  },
  
  // Rate Limits
  rateLimits: {
    free: {
      requestsPerMonth: 100,
      historicalData: false,
      https: false,
      cost: 'Free',
    },
    basic: {
      requestsPerMonth: 5000,
      historicalData: true,
      https: false,
      cost: '$9.99/month',
    },
    professional: {
      requestsPerMonth: 50000,
      historicalData: true,
      https: true,
      cost: '$49.99/month',
    },
  },
  
  // NPM SDK
  npmPackages: {
    official: null,
    community: [
      {
        name: 'coinlayer',
        url: 'https://www.npmjs.com/package/coinlayer',
        install: 'npm install coinlayer',
      },
      {
        name: 'node-coinlayer',
        url: 'https://www.npmjs.com/package/node-coinlayer',
        install: 'npm install node-coinlayer',
      },
    ],
  },
  
  // Subgraph
  subgraph: {
    available: false,
    note: 'Coinlayer does not provide a subgraph; uses REST API only',
  },
  
  // Documentation
  documentation: {
    main: 'https://coinlayer.com/documentation',
    quickstart: 'https://coinlayer.com/quickstart',
    apiReference: 'https://coinlayer.com/documentation',
    errorCodes: 'https://coinlayer.com/documentation#error_codes',
    pricing: 'https://coinlayer.com/product',
  },
  
  // Social Media
  socialMedia: {
    website: 'https://coinlayer.com/',
    twitter: 'https://twitter.com/apilayer',
    facebook: 'https://www.facebook.com/apilayer',
    github: 'https://github.com/apilayer',
    blog: 'https://blog.apilayer.com/',
  },
  
  // Features
  features: {
    realTimePrices: true,
    historicalData: true, // Paid plans only
    currencyConversion: true,
    timeframeQueries: true, // Paid plans only
    changeQueries: true, // Paid plans only
    cryptoList: true,
    jsonFormat: true,
    https: false, // Free plan uses HTTP only
  },
  
  // CORS Support
  cors: {
    enabled: false,
    note: 'CORS not supported on free plan',
  },
  
  // Example Usage
  examples: {
    live: 'http://api.coinlayer.com/live?access_key=YOUR_ACCESS_KEY',
    liveTargets: 'http://api.coinlayer.com/live?access_key=YOUR_ACCESS_KEY&target=BTC,ETH',
    historical: 'http://api.coinlayer.com/2021-01-01?access_key=YOUR_ACCESS_KEY',
    convert: 'http://api.coinlayer.com/convert?access_key=YOUR_ACCESS_KEY&from=BTC&to=USD&amount=1',
  },
  
  // Supported Currencies
  supportedCurrencies: {
    cryptocurrencies: '385+',
    fiatCurrencies: '170+',
    exchanges: '25+',
  },
  
  // Notes
  notes: [
    'Free tier limited to 100 requests per month',
    'HTTP only on free tier (no HTTPS)',
    'Historical data not available on free tier',
    'Simple JSON format',
    'Powered by APILayer',
    'Covers 385+ cryptocurrencies',
    'Real-time exchange rates from 25+ exchanges',
  ],
};

export default coinlayerAPI;

