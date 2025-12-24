// Poolin - Dogecoin Mining Pool
// Multi-currency mining pool with Dogecoin support
// Merged mining with Litecoin

export const Poolin = {
  name: 'Poolin',
  ticker: 'DOGE',
  
  // Pool Information
  description: 'Poolin is a multi-currency mining pool supporting Dogecoin merged mining with Litecoin. Offers detailed APIs for pool and miner data.',
  type: 'FPPS / PPS+',
  location: 'China (Global Operations)',
  
  // Official Links
  website: 'https://www.poolin.com/',
  poolStats: 'https://www.poolin.com/pool/doge',
  apiDocs: 'https://www.poolin.com/apidocs',
  help: 'https://help.poolin.com/',
  
  // Social Media
  social: {
    twitter: 'https://twitter.com/officialpoolin',
    telegram: 'https://t.me/PoolinOfficial',
  },
  
  // API Endpoints
  api: {
    baseUrl: 'https://api.poolin.com',
    endpoints: {
      poolStats: '/api/public/v2/pool/stats/doge',
      userStats: '/api/public/v2/user/:username',
      workerStats: '/api/public/v2/worker/:username/:workername',
      earnings: '/api/public/v2/earnings/:username',
      payouts: '/api/public/v2/payouts/:username',
    },
    authMethod: 'API Key (header-based)',
    rateLimit: 'Standard rate limits apply',
  },
  
  // Pool Features
  features: {
    mergedMining: true,
    autoPayout: true,
    profitSwitching: false,
    multiCoinPayout: true,
    minPayout: '100 DOGE',
  },
  
  // TypeScript Integration Functions
  
  /**
   * Fetch pool statistics
   * @returns Pool statistics including hashrate and active miners
   */
  fetchPoolStats: async (): Promise<Record<string, unknown>> => {
    try {
      const response = await fetch('https://api.poolin.com/api/public/v2/pool/stats/doge');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching Poolin pool stats:', error);
      return {};
    }
  },
  
  /**
   * Fetch user statistics
   * @param username - Poolin username
   * @param apiKey - Optional API key for authenticated requests
   * @returns User statistics
   */
  fetchUserStats: async (username: string, apiKey?: string): Promise<Record<string, unknown>> => {
    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      if (apiKey) {
        headers['Authorization'] = `Bearer ${apiKey}`;
      }
      
      const response = await fetch(`https://api.poolin.com/api/public/v2/user/${username}`, {
        headers,
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching Poolin user stats:', error);
      return {};
    }
  },
  
  /**
   * Fetch worker statistics
   * @param username - Poolin username
   * @param workername - Worker name
   * @param apiKey - Optional API key for authenticated requests
   * @returns Worker statistics
   */
  fetchWorkerStats: async (username: string, workername: string, apiKey?: string): Promise<Record<string, unknown>> => {
    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      if (apiKey) {
        headers['Authorization'] = `Bearer ${apiKey}`;
      }
      
      const response = await fetch(`https://api.poolin.com/api/public/v2/worker/${username}/${workername}`, {
        headers,
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching Poolin worker stats:', error);
      return {};
    }
  },
};

