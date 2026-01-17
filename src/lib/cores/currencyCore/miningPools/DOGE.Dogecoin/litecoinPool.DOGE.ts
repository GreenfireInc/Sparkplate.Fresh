// LitecoinPool.org - Dogecoin Merged Mining Pool
// One of the largest merged mining pools for Litecoin and Dogecoin
// Long-running pool with extensive JSON API

export const LitecoinPool = {
  name: 'LitecoinPool.org',
  ticker: 'DOGE',
  altTicker: 'LTC',
  
  // Pool Information
  description: 'LitecoinPool.org is one of the largest and most established merged mining pools. Miners receive both Litecoin (LTC) and Dogecoin (DOGE) rewards simultaneously through Scrypt merged mining.',
  type: 'PPS / Merged Mining',
  location: 'Global',
  
  // Official Links
  website: 'https://www.litecoinpool.org/',
  poolStats: 'https://www.litecoinpool.org/pools',
  apiDocs: 'https://www.litecoinpool.org/api',
  help: 'https://www.litecoinpool.org/help',
  
  // Social Media
  social: {
    reddit: 'https://www.reddit.com/r/litecoinpool/',
  },
  
  // API Endpoints
  api: {
    baseUrl: 'https://www.litecoinpool.org/api',
    endpoints: {
      userStats: '/user',
      workerStats: '/workers',
      poolStats: '/pool',
      earnings: '/user_balance',
      payouts: '/user_transactions',
    },
    authMethod: 'API Key (query parameter)',
    rateLimit: 'Standard rate limits apply',
  },
  
  // Pool Features
  features: {
    mergedMining: true,
    autoPayout: true,
    profitSwitching: false,
    multiCoinPayout: true,
    minPayout: '0.001 LTC / 100 DOGE',
    note: 'Miners receive both LTC and DOGE rewards',
  },
  
  // TypeScript Integration Functions
  
  /**
   * Fetch user statistics
   * @param apiKey - LitecoinPool API key
   * @returns User statistics including hashrate and balances for both LTC and DOGE
   */
  fetchUserStats: async (apiKey: string): Promise<Record<string, unknown>> => {
    try {
      const response = await fetch(`https://www.litecoinpool.org/api?api_key=${apiKey}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching LitecoinPool user stats:', error);
      return {};
    }
  },
  
  /**
   * Fetch worker statistics
   * @param apiKey - LitecoinPool API key
   * @returns Worker statistics
   */
  fetchWorkerStats: async (apiKey: string): Promise<Record<string, unknown>> => {
    try {
      const response = await fetch(`https://www.litecoinpool.org/api?api_key=${apiKey}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      // Extract worker data from response
      return data.workers || {};
    } catch (error) {
      console.error('Error fetching LitecoinPool worker stats:', error);
      return {};
    }
  },
  
  /**
   * Fetch pool statistics (public)
   * @returns Pool statistics
   */
  fetchPoolStats: async (): Promise<Record<string, unknown>> => {
    try {
      const response = await fetch('https://www.litecoinpool.org/api/pool');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching LitecoinPool pool stats:', error);
      return {};
    }
  },
};

