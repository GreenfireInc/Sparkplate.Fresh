// F2Pool - Bitcoin Mining Pool
// One of the oldest and largest Bitcoin mining pools
// Multi-currency support with global presence

export const F2Pool = {
  name: 'F2Pool',
  ticker: 'BTC',
  
  // Pool Information
  description: 'F2Pool (Discus Fish) is one of the oldest and largest multi-currency mining pools, established in 2013. Offers PPS+ payout method.',
  type: 'PPS+',
  location: 'China (Global Operations)',
  
  // Official Links
  website: 'https://www.f2pool.com/',
  poolStats: 'https://www.f2pool.com/mining-pool-statistics',
  apiDocs: 'https://www.f2pool.com/developer/api?lang=en_US',
  help: 'https://www.f2pool.com/help.html#/api',
  
  // API Endpoints
  api: {
    baseUrl: 'https://api.f2pool.com',
    endpoints: {
      coinStats: '/bitcoin',
      userStats: '/bitcoin/:username',
      workerStats: '/bitcoin/:username/:workerName',
      earnings: '/bitcoin/:username/earnings'
    }
  },
  
  // Social Media
  social: {
    twitter: 'https://twitter.com/f2pool_official',
    telegram: 'https://t.me/f2pool_en',
    medium: 'https://medium.com/@f2pool',
    wechat: 'f2pool_official'
  },
  
  /**
   * Fetch coin statistics for Bitcoin
   * @returns BTC pool stats including hashrate, workers, blocks
   */
  fetchCoinStats: async (): Promise<Record<string, unknown>> => {
    try {
      const response = await fetch(`https://api.f2pool.com/bitcoin`);
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
   * @param username F2Pool username
   * @param apiKey Optional API key for detailed stats
   * @returns User stats including hashrate, earnings
   */
  fetchUserStats: async (username: string, apiKey?: string): Promise<Record<string, unknown>> => {
    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json'
      };
      if (apiKey) {
        headers['Authorization'] = `Bearer ${apiKey}`;
      }
      
      const response = await fetch(
        `https://api.f2pool.com/bitcoin/${username}`,
        { headers }
      );
      
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
   * @param username F2Pool username
   * @param workerName Worker name
   * @param apiKey Optional API key
   * @returns Worker stats
   */
  fetchWorkerStats: async (
    username: string,
    workerName: string,
    apiKey?: string
  ): Promise<Record<string, unknown>> => {
    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json'
      };
      if (apiKey) {
        headers['Authorization'] = `Bearer ${apiKey}`;
      }
      
      const response = await fetch(
        `https://api.f2pool.com/bitcoin/${username}/${workerName}`,
        { headers }
      );
      
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

  /**
   * Fetch earnings data
   * @param username F2Pool username
   * @param apiKey Optional API key
   * @returns Earnings history
   */
  fetchEarnings: async (username: string, apiKey?: string): Promise<Record<string, unknown>> => {
    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json'
      };
      if (apiKey) {
        headers['Authorization'] = `Bearer ${apiKey}`;
      }
      
      const response = await fetch(
        `https://api.f2pool.com/bitcoin/${username}/earnings`,
        { headers }
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching F2Pool earnings:', error);
      return {};
    }
  },

  // Integration Notes
  notes: {
    authentication: 'Public API for basic stats, API key optional for detailed data',
    features: [
      'PPS+ payout method',
      'One of the oldest pools (since 2013)',
      'Multi-currency support (40+ coins)',
      'Comprehensive API documentation',
      'Global server locations'
    ],
    minimumPayout: '0.001 BTC',
    fees: '2.5% for PPS+',
    hashratePower: 'Top 5 pool globally by hashrate'
  }
};
