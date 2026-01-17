// AikaPool - Dogecoin Mining Pool
// Dedicated Dogecoin mining pool
// Multi-coin support with DOGE focus

export const AikaPool = {
  name: 'AikaPool',
  ticker: 'DOGE',
  
  // Pool Information
  description: 'AikaPool is a multi-coin mining pool with dedicated Dogecoin support. Provides Stratum endpoints and public pool statistics.',
  type: 'PPLNS / PPS',
  location: 'Global',
  
  // Official Links
  website: 'https://aikapool.com/',
  dogePool: 'https://aikapool.com/doge/',
  poolStats: 'https://aikapool.com/doge/index.php?page=statistics&action=pool',
  help: 'https://aikapool.com/doge/index.php?page=gettingstarted',
  
  // Social Media
  social: {
    twitter: 'https://twitter.com/aikapool',
  },
  
  // API Endpoints
  api: {
    baseUrl: 'https://aikapool.com/doge/api',
    endpoints: {
      poolStats: '/pool/stats',
      userStats: '/user/:address',
      blocks: '/blocks',
      payments: '/payments',
    },
    authMethod: 'Address-based (no authentication for public stats)',
    rateLimit: 'Standard rate limits apply',
    note: 'Limited public API - primarily web interface',
  },
  
  // Pool Features
  features: {
    mergedMining: false,
    autoPayout: true,
    profitSwitching: false,
    multiCoinPayout: false,
    minPayout: '50 DOGE',
  },
  
  // Mining Configuration
  stratum: {
    host: 'stratum+tcp://aikapool.com',
    port: 7915,
    difficulty: 'Variable',
  },
  
  // TypeScript Integration Functions
  
  /**
   * Fetch pool statistics
   * @returns Pool statistics including hashrate and miners
   */
  fetchPoolStats: async (): Promise<Record<string, unknown>> => {
    try {
      // Note: AikaPool may have limited API access
      // This is a generic implementation that may need adjustment
      const response = await fetch('https://aikapool.com/doge/api/pool/stats');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching AikaPool stats:', error);
      return {};
    }
  },
  
  /**
   * Fetch user statistics
   * @param address - Dogecoin wallet address
   * @returns User statistics
   */
  fetchUserStats: async (address: string): Promise<Record<string, unknown>> => {
    try {
      const response = await fetch(`https://aikapool.com/doge/api/user/${address}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching AikaPool user stats:', error);
      return {};
    }
  },
};

