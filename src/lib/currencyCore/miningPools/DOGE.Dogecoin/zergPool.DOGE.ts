// ZergPool - Dogecoin Mining Pool
// Multi-algorithm mining pool supporting Dogecoin
// Global mining pool with competitive fees

export const ZergPool = {
  name: 'ZergPool',
  ticker: 'DOGE',
  
  // Pool Information
  description: 'ZergPool is a multi-algorithm mining pool supporting Dogecoin and other cryptocurrencies. Known for competitive fees and reliable payouts.',
  type: 'PPS / PPLNS',
  location: 'Global',
  
  // Official Links
  website: 'https://zergpool.com/',
  poolStats: 'https://zergpool.com/stats',
  apiDocs: 'https://zergpool.com/api',
  help: 'https://zergpool.com/help',
  
  // API Endpoints
  api: {
    baseUrl: 'https://api.zergpool.com',
    endpoints: {
      poolStats: '/pool/stats',
      userStats: '/user/:address',
      workers: '/workers/:address',
      earnings: '/earnings/:address'
    }
  },
  
  // Social Media
  social: {
    twitter: 'https://twitter.com/ZergPool',
    telegram: 'https://t.me/ZergPool',
    discord: 'https://discord.gg/ZergPool'
  },
  
  /**
   * Fetch pool statistics for Dogecoin
   * @returns Pool stats including hashrate, workers, blocks
   */
  fetchPoolStats: async (): Promise<Record<string, unknown>> => {
    try {
      const response = await fetch(`https://api.zergpool.com/pool/stats`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching ZergPool stats:', error);
      return {};
    }
  },

  /**
   * Fetch user statistics
   * @param address Dogecoin wallet address
   * @returns User stats including hashrate, earnings
   */
  fetchUserStats: async (address: string): Promise<Record<string, unknown>> => {
    try {
      const response = await fetch(`https://api.zergpool.com/user/${address}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching ZergPool user stats:', error);
      return {};
    }
  },

  /**
   * Fetch worker statistics
   * @param address Dogecoin wallet address
   * @returns Worker stats
   */
  fetchWorkerStats: async (address: string): Promise<Record<string, unknown>> => {
    try {
      const response = await fetch(`https://api.zergpool.com/workers/${address}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching ZergPool worker stats:', error);
      return {};
    }
  },

  /**
   * Fetch earnings data
   * @param address Dogecoin wallet address
   * @returns Earnings history
   */
  fetchEarnings: async (address: string): Promise<Record<string, unknown>> => {
    try {
      const response = await fetch(`https://api.zergpool.com/earnings/${address}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching ZergPool earnings:', error);
      return {};
    }
  },

  // Integration Notes
  notes: {
    authentication: 'Public API available',
    features: [
      'PPS and PPLNS payout methods',
      'Multi-algorithm support',
      'Competitive pool fees',
      'Reliable payouts',
      'Global server locations'
    ],
    minimumPayout: 'Varies by algorithm',
    fees: '0.5% for PPS, 0% for PPLNS',
    hashratePower: 'Growing multi-algorithm pool'
  }
};