// F2Pool - Dogecoin Mining Pool
// One of the largest and oldest mining pools globally
// Multi-currency support with Dogecoin merged mining

export const F2Pool = {
  name: 'F2Pool',
  ticker: 'DOGE',
  
  // Pool Information
  description: 'F2Pool (Discus Fish) is one of the oldest and largest multi-currency mining pools, established in 2013. Supports Dogecoin merged mining with Litecoin using Scrypt algorithm.',
  type: 'PPS / PPS+',
  location: 'China (Global Operations)',
  
  // Official Links
  website: 'https://www.f2pool.com/',
  poolStats: 'https://www.f2pool.com/coin/dogecoin',
  apiDocs: 'https://www.f2pool.com/api_doc?lang=en_US',
  help: 'https://www.f2pool.com/help.html',
  
  // Social Media
  social: {
    twitter: 'https://twitter.com/f2pool_official',
    telegram: 'https://t.me/f2pool_en',
  },
  
  // API Endpoints
  api: {
    baseUrl: 'https://api.f2pool.com',
    endpoints: {
      coinStats: '/dogecoin',
      userStats: '/dogecoin/:username',
      workerStats: '/dogecoin/:username/:workername',
      earnings: '/dogecoin/:username/earnings',
      payouts: '/dogecoin/:username/payouts',
    },
    authMethod: 'Username-based (no API key required for public stats)',
    rateLimit: 'Standard rate limits apply',
  },
  
  // Pool Features
  features: {
    mergedMining: true,
    autoPayout: true,
    profitSwitching: false,
    multiCoinPayout: false,
    minPayout: '100 DOGE',
  },
  
  // TypeScript Integration Functions
  
  /**
   * Fetch coin statistics for Dogecoin
   * @returns Dogecoin pool statistics
   */
  fetchCoinStats: async (): Promise<Record<string, unknown>> => {
    try {
      const response = await fetch('https://api.f2pool.com/dogecoin');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching F2Pool coin stats:', error);
      return {};
    }
  },
  
  /**
   * Fetch user statistics
   * @param username - F2Pool username
   * @returns User mining statistics
   */
  fetchUserStats: async (username: string): Promise<Record<string, unknown>> => {
    try {
      const response = await fetch(`https://api.f2pool.com/dogecoin/${username}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching F2Pool user stats:', error);
      return {};
    }
  },
  
  /**
   * Fetch worker statistics
   * @param username - F2Pool username
   * @param workername - Worker name
   * @returns Worker statistics
   */
  fetchWorkerStats: async (username: string, workername: string): Promise<Record<string, unknown>> => {
    try {
      const response = await fetch(`https://api.f2pool.com/dogecoin/${username}/${workername}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching F2Pool worker stats:', error);
      return {};
    }
  },
};

