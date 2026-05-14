/**
 * Coindar API
 * 
 * Cryptocurrency Calendar and Events API
 * Free API for crypto event and calendar data
 * 
 * @see https://coindar.org/
 */

export const coindarAPI = {
  name: 'Coindar',
  description: 'Cryptocurrency calendar and events API',
  
  // API Configuration
  baseURL: 'https://coindar.org/api/v2/',
  apiVersion: 'v2',
  
  // Endpoints
  endpoints: {
    // Coins
    coins: '/coins',
    
    // Events
    events: '/events',
    
    // Tags
    tags: '/tags',
    
    // Widgets
    widgetEvents: 'https://coindar.org/api/widget_events',
  },
  
  // Authentication
  authentication: {
    required: true,
    type: 'Access Token',
    parameterName: 'access_token',
    note: 'Free tier available with access token',
    getApiKey: 'https://coindar.org/api',
  },
  
  // Rate Limits
  rateLimits: {
    free: {
      requestsPerDay: 'Limited',
      note: 'Free access to event data with registration',
      cost: 'Free',
    },
  },
  
  // NPM SDK
  npmPackages: {
    official: null,
    community: [
      {
        name: 'coindar',
        url: 'https://www.npmjs.com/package/coindar',
        install: 'npm install coindar',
      },
      {
        name: 'coindar-api',
        url: 'https://www.npmjs.com/package/coindar-api',
        install: 'npm install coindar-api',
      },
    ],
  },
  
  // Subgraph
  subgraph: {
    available: false,
    note: 'Coindar does not provide a subgraph; uses REST API only',
  },
  
  // Documentation
  documentation: {
    main: 'https://coindar.org/api',
    apiReference: 'https://coindar.org/api',
    widget: 'https://coindar.org/en/widgets',
  },
  
  // Social Media
  socialMedia: {
    website: 'https://coindar.org/',
    twitter: 'https://twitter.com/CoindarApp',
    telegram: 'https://t.me/coindar',
    facebook: 'https://www.facebook.com/coindarapp',
    instagram: 'https://www.instagram.com/coindar_app/',
    reddit: 'https://www.reddit.com/r/coindar/',
  },
  
  // Features
  features: {
    eventsCalendar: true,
    coinData: true,
    tagsFilter: true,
    widgetSupport: true,
    upcomingEvents: true,
    historicalEvents: true,
    eventNotifications: true,
  },
  
  // Event Types
  eventTypes: [
    'Release',
    'Update',
    'Fork',
    'Conference',
    'Partnership',
    'Airdrop',
    'Listing',
    'Burn',
    'Swap',
    'Halving',
    'Mainnet Launch',
    'Testnet Launch',
  ],
  
  // CORS Support
  cors: {
    enabled: true,
    note: 'CORS enabled for widget and API requests',
  },
  
  // Example Usage
  examples: {
    coins: 'https://coindar.org/api/v2/coins?access_token=YOUR_TOKEN',
    events: 'https://coindar.org/api/v2/events?access_token=YOUR_TOKEN',
    tags: 'https://coindar.org/api/v2/tags?access_token=YOUR_TOKEN',
    widgetEvents: 'https://coindar.org/api/widget_events?date_from=2025-01-01&date_to=2025-12-31',
  },
  
  // Query Parameters
  queryParameters: {
    events: {
      page: 'number - Page number',
      page_size: 'number - Results per page',
      filter_date_start: 'string - Start date (YYYY-MM-DD)',
      filter_date_end: 'string - End date (YYYY-MM-DD)',
      filter_coins: 'string - Comma-separated coin IDs',
      filter_tags: 'string - Comma-separated tag IDs',
      sort_by: 'string - date_event, votes',
      order_by: 'string - -1 (desc), 1 (asc)',
    },
  },
  
  // Widget Support
  widget: {
    available: true,
    types: ['events', 'countdown', 'calendar'],
    customizable: true,
    embeddable: true,
  },
  
  // Data Coverage
  dataCoverage: {
    cryptocurrencies: '5,000+',
    events: 'Thousands',
    categories: '20+',
  },
  
  // Notes
  notes: [
    'Specialized in cryptocurrency events',
    'Free API access with registration',
    'Comprehensive event calendar',
    'Multiple event types supported',
    'Widget support for embedding',
    'Community-driven event verification',
    'Filter by date, coin, and tags',
    'CORS enabled',
    'Covers 5,000+ cryptocurrencies',
  ],
};

export default coindarAPI;

