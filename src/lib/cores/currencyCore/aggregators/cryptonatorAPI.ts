/**
 * Cryptonator API
 * 
 * Exchange rates API for cryptocurrencies
 * Free public API for cryptocurrency exchange rates
 * 
 * @see https://www.cryptonator.com/
 */

export const cryptonatorAPI = {
  name: 'Cryptonator',
  description: 'Free cryptocurrency exchange rates API',
  
  // API Configuration
  baseURL: 'https://api.cryptonator.com/api/',
  apiVersion: 'v1',
  
  // Endpoints
  endpoints: {
    // Ticker
    ticker: '/ticker/{base}-{target}',
    
    // Full
    full: '/full/{base}-{target}',
    
    // Currencies
    currencies: '/currencies',
  },
  
  // Authentication
  authentication: {
    required: false,
    type: 'None',
    note: 'Completely free, no API key required',
  },
  
  // Rate Limits
  rateLimits: {
    free: {
      requestsPerSecond: 'No strict limit',
      note: 'Subject to fair use policy',
      cost: 'Free',
    },
  },
  
  // NPM SDK
  npmPackages: {
    official: null,
    community: [
      {
        name: 'cryptonator',
        url: 'https://www.npmjs.com/package/cryptonator',
        install: 'npm install cryptonator',
      },
      {
        name: 'cryptonator-api',
        url: 'https://www.npmjs.com/package/cryptonator-api',
        install: 'npm install cryptonator-api',
      },
      {
        name: 'node-cryptonator',
        url: 'https://www.npmjs.com/package/node-cryptonator',
        install: 'npm install node-cryptonator',
      },
    ],
  },
  
  // Subgraph
  subgraph: {
    available: false,
    note: 'Cryptonator does not provide a subgraph; uses REST API only',
  },
  
  // Documentation
  documentation: {
    main: 'https://www.cryptonator.com/api',
    apiReference: 'https://www.cryptonator.com/api',
  },
  
  // Social Media
  socialMedia: {
    website: 'https://www.cryptonator.com/',
    twitter: 'https://twitter.com/cryptonatorcom',
    facebook: 'https://www.facebook.com/cryptonator',
  },
  
  // Features
  features: {
    realTimePrices: true,
    historicalData: false,
    marketData: true,
    exchangeRates: true,
    simpleTicker: true,
    fullTicker: true,
    currenciesList: true,
  },
  
  // CORS Support
  cors: {
    enabled: true,
    note: 'CORS enabled for browser requests',
  },
  
  // Example Usage
  examples: {
    ticker: 'https://api.cryptonator.com/api/ticker/btc-usd',
    full: 'https://api.cryptonator.com/api/full/btc-usd',
    currencies: 'https://api.cryptonator.com/api/currencies',
    multiPair: 'https://api.cryptonator.com/api/ticker/eth-eur',
  },
  
  // Response Format
  responseFormat: {
    ticker: {
      success: 'boolean',
      timestamp: 'unix timestamp',
      ticker: {
        base: 'string',
        target: 'string',
        price: 'string',
        volume: 'string',
        change: 'string',
      },
    },
  },
  
  // Supported Pairs
  supportedPairs: {
    cryptocurrencies: '300+',
    fiatCurrencies: '20+',
    totalPairs: 'Thousands',
  },
  
  // Notes
  notes: [
    'Completely free with no API key required',
    'Simple and straightforward API',
    'Real-time exchange rates',
    'CORS enabled',
    'JSON response format',
    'Covers 300+ cryptocurrencies',
    'No registration required',
    'Fair use policy applies',
  ],
};

export default cryptonatorAPI;

