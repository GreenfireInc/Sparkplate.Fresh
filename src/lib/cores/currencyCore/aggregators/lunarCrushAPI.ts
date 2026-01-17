/**
 * LunarCrush API
 * 
 * Social Listening for Crypto
 * Free tier with social metrics and market data
 * 
 * @see https://lunarcrush.com/
 */

export const lunarCrushAPI = {
  name: 'LunarCrush',
  description: 'Social listening and analytics for cryptocurrency markets',
  
  // API Configuration
  baseURL: 'https://api.lunarcrush.com/v2',
  apiVersion: 'v2',
  
  // Endpoints
  endpoints: {
    // Assets
    assets: '/assets',
    assetDetails: '/assets/{symbol}',
    
    // Market
    market: '/market',
    
    // Global
    global: '/global',
    
    // Feeds
    feeds: '/feeds',
    
    // Influencers
    influencers: '/influencers',
    
    // Insights (Pro)
    insights: '/insights',
    
    // Topic (Pro)
    topic: '/topic',
  },
  
  // Authentication
  authentication: {
    required: true,
    type: 'API Key',
    parameterName: 'key',
    note: 'Free tier available with API key',
    getApiKey: 'https://lunarcrush.com/developers/api',
  },
  
  // Rate Limits
  rateLimits: {
    free: {
      requestsPerDay: 50,
      cost: 'Free',
      note: 'Limited to basic endpoints',
    },
    launch: {
      requestsPerDay: 550,
      cost: '$99/month',
    },
    mission: {
      requestsPerDay: 3000,
      cost: '$299/month',
    },
    explorer: {
      requestsPerDay: 16000,
      cost: '$999/month',
    },
  },
  
  // NPM SDK
  npmPackages: {
    official: null,
    community: [
      {
        name: 'lunarcrush',
        url: 'https://www.npmjs.com/package/lunarcrush',
        install: 'npm install lunarcrush',
      },
      {
        name: 'lunarcrush-api',
        url: 'https://www.npmjs.com/package/lunarcrush-api',
        install: 'npm install lunarcrush-api',
      },
    ],
  },
  
  // Subgraph
  subgraph: {
    available: false,
    note: 'LunarCrush does not provide a subgraph; uses REST API only',
  },
  
  // Documentation
  documentation: {
    main: 'https://lunarcrush.com/developers/docs',
    api: 'https://lunarcrush.com/developers/api',
    quickstart: 'https://lunarcrush.com/developers/docs',
    pricing: 'https://lunarcrush.com/pricing',
  },
  
  // Social Media
  socialMedia: {
    website: 'https://lunarcrush.com/',
    twitter: 'https://twitter.com/LunarCrush',
    telegram: 'https://t.me/lunarcrush',
    discord: 'https://discord.com/invite/lunarcrush',
    youtube: 'https://www.youtube.com/c/LunarCRUSH',
    facebook: 'https://www.facebook.com/LunarCRUSH',
    instagram: 'https://www.instagram.com/lunarcrush/',
    reddit: 'https://www.reddit.com/r/LunarCrush/',
    linkedin: 'https://www.linkedin.com/company/lunarcrush/',
  },
  
  // Features
  features: {
    realTimePrices: true,
    historicalData: true,
    socialMetrics: true,
    sentimentAnalysis: true,
    influencerData: true,
    socialFeeds: true,
    galaxyScore: true,
    altRank: true,
    trendingCoins: true,
    marketData: true,
  },
  
  // Social Metrics
  socialMetrics: {
    galaxyScore: 'Proprietary scoring system (0-100)',
    altRank: 'Alternative Rank based on social activity',
    socialVolume: 'Total social media mentions',
    socialEngagement: 'Likes, comments, shares',
    socialContributors: 'Unique social contributors',
    socialDominance: 'Share of total social volume',
    sentimentScore: 'Positive/negative sentiment',
  },
  
  // CORS Support
  cors: {
    enabled: true,
    note: 'CORS enabled for browser requests',
  },
  
  // Example Usage
  examples: {
    assets: 'https://api.lunarcrush.com/v2?data=assets&key=YOUR_API_KEY',
    assetDetails: 'https://api.lunarcrush.com/v2?data=assets&symbol=BTC&key=YOUR_API_KEY',
    market: 'https://api.lunarcrush.com/v2?data=market&key=YOUR_API_KEY',
    global: 'https://api.lunarcrush.com/v2?data=global&key=YOUR_API_KEY',
    feeds: 'https://api.lunarcrush.com/v2?data=feeds&symbol=BTC&key=YOUR_API_KEY',
  },
  
  // Data Sources
  dataSources: {
    socialPlatforms: [
      'Twitter',
      'Reddit',
      'Medium',
      'YouTube',
      'Telegram',
      'BitcoinTalk',
      'GitHub',
    ],
    priceData: 'Multiple exchanges',
  },
  
  // Data Coverage
  dataCoverage: {
    cryptocurrencies: '3,000+',
    socialPosts: 'Millions daily',
    influencers: '10,000+',
  },
  
  // Notes
  notes: [
    'Unique focus on social metrics',
    'Free tier with 50 requests per day',
    'Proprietary Galaxy Score and AltRank',
    'Sentiment analysis',
    'Influencer tracking',
    'Covers multiple social platforms',
    'Real-time social data',
    'Trending coins based on social activity',
    'CORS enabled',
  ],
};

export default lunarCrushAPI;

