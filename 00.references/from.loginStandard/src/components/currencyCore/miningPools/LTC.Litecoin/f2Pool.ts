// F2Pool - Litecoin Mining Pool
// Large multi-currency mining pool
// Merged mining with Dogecoin

export const F2PoolLtc = {
  name: 'F2Pool',
  ticker: 'LTC',
  
  // Pool Information
  description: 'F2Pool (Discus Fish) is one of the largest multi-currency mining pools, supporting Litecoin with merged mining for Dogecoin. Offers PPS payout method.',
  type: 'PPS',
  location: 'China (Global Operations)',
  
  // Official Links
  website: 'https://www.f2pool.com/',
  ltcPool: 'https://www.f2pool.com/coin/litecoin',
  apiDocs: 'https://www.f2pool.com/api_doc?lang=en_US',
  help: 'https://www.f2pool.com/help.html#/api',
  
  // Social Media
  social: {
    twitter: 'https://twitter.com/f2pool_official',
    telegram: 'https://t.me/f2pool',
  },
  
  // API Endpoints
  api: {
    baseUrl: 'https://api.f2pool.com',
    endpoints: {
      coinStats: '/ltc',
      userStats: '/ltc/:username',
      workerStats: '/ltc/:username/workers',
    },
    authMethod: 'API key required for user-specific data',
    rateLimit: 'Standard rate limits apply',
  },
  
  // Pool Features
  features: {
    minPayout: '0.001 LTC',
    fee: '2.5%',
    payoutFrequency: 'Daily (if minimum reached)',
    mergedMining: 'Dogecoin (DOGE)',
    servers: ['Global'],
  },
  
  // Mining Configuration
  stratum: {
    host: 'ltc.f2pool.com',
    port: 8888,
  },
  
  // TypeScript Integration Functions
  
  /**
   * Fetch LTC coin statistics
   * @returns Coin statistics including difficulty and network hashrate
   */
  fetchCoinStats: async (): Promise<Record<string, unknown>> => {
    try {
      const response = await fetch('https://api.f2pool.com/ltc');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching F2Pool LTC coin stats:', error);
      return {};
    }
  },
  
  /**
   * Fetch user statistics (requires authentication)
   * @param username - F2Pool username
   * @param apiKey - F2Pool API key
   * @returns User statistics
   */
  fetchUserStats: async (username: string, apiKey?: string): Promise<Record<string, unknown>> => {
    try {
      const headers: Record<string, string> = {};
      if (apiKey) {
        headers['Authorization'] = `Bearer ${apiKey}`;
      }
      
      const response = await fetch(`https://api.f2pool.com/ltc/${username}`, { headers });
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
   * Fetch worker statistics (requires authentication)
   * @param username - F2Pool username
   * @param apiKey - F2Pool API key
   * @returns Worker statistics
   */
  fetchWorkerStats: async (username: string, apiKey?: string): Promise<Record<string, unknown>> => {
    try {
      const headers: Record<string, string> = {};
      if (apiKey) {
        headers['Authorization'] = `Bearer ${apiKey}`;
      }
      
      const response = await fetch(`https://api.f2pool.com/ltc/${username}/workers`, { headers });
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

