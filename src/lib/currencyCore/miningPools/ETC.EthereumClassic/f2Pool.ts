// F2Pool - Ethereum Classic Mining Pool
// Large multi-currency mining pool
// PPS payout system

export const F2PoolEtc = {
  name: 'F2Pool',
  ticker: 'ETC',
  
  // Pool Information
  description: 'F2Pool is one of the largest and oldest multi-currency mining pools, supporting Ethereum Classic with PPS payout method.',
  type: 'PPS',
  location: 'China (Global Operations)',
  
  // Official Links
  website: 'https://www.f2pool.com/',
  etcPool: 'https://www.f2pool.com/coin/etc',
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
      coinStats: '/etc',
      userStats: '/etc/:username',
      workerStats: '/etc/:username/workers',
    },
    authMethod: 'API key required for user-specific data',
    rateLimit: 'Standard rate limits apply',
  },
  
  // Pool Features
  features: {
    minPayout: '0.1 ETC',
    fee: '2.5%',
    payoutFrequency: 'Daily (if minimum reached)',
    servers: ['Global'],
  },
  
  // Mining Configuration
  stratum: {
    host: 'etc.f2pool.com',
    port: 8118,
  },
  
  // TypeScript Integration Functions
  
  /**
   * Fetch ETC coin statistics
   * @returns Coin statistics including difficulty and network hashrate
   */
  fetchCoinStats: async (): Promise<Record<string, unknown>> => {
    try {
      const response = await fetch('https://api.f2pool.com/etc');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching F2Pool ETC coin stats:', error);
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
      
      const response = await fetch(`https://api.f2pool.com/etc/${username}`, { headers });
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
      
      const response = await fetch(`https://api.f2pool.com/etc/${username}/workers`, { headers });
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

