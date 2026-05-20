// Multipool - Dogecoin Mining Pool
// Multi-coin mining pool supporting Scrypt algorithm
// Auto-switching for maximum profitability

export const MultipoolUs = {
  name: 'Multipool',
  ticker: 'DOGE',
  
  // Pool Information
  description: 'Multipool is a multi-coin mining pool supporting multiple Scrypt coins including Dogecoin. Features automatic switching to the most profitable coins.',
  type: 'Multi-Coin / Auto-Switching',
  location: 'United States',
  
  // Official Links
  website: 'https://www.multipool.us/',
  poolStats: 'https://www.multipool.us/stats.php',
  
  // Social Media
  social: {
    twitter: 'https://twitter.com/multipoolus',
  },
  
  // API Endpoints
  api: {
    baseUrl: 'https://www.multipool.us/api',
    endpoints: {
      poolStats: '/stats',
      userStats: '/user/:address',
      workerStats: '/worker/:address/:worker',
    },
    authMethod: 'Address-based (no authentication)',
    rateLimit: 'Standard rate limits apply',
    note: 'Limited API documentation available',
  },
  
  // Pool Features
  features: {
    mergedMining: false,
    autoPayout: true,
    profitSwitching: true,
    multiCoinPayout: false,
    minPayout: '100 DOGE',
  },
  
  // Mining Configuration
  stratum: {
    scrypt: {
      host: 'stratum+tcp://scrypt.multipool.us',
      port: 3352,
    },
  },
  
  // TypeScript Integration Functions
  
  /**
   * Fetch pool statistics
   * @returns Pool statistics
   */
  fetchPoolStats: async (): Promise<Record<string, unknown>> => {
    try {
      const response = await fetch('https://www.multipool.us/api/stats');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching Multipool stats:', error);
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
      const response = await fetch(`https://www.multipool.us/api/user/${address}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching Multipool user stats:', error);
      return {};
    }
  },
  
  /**
   * Fetch worker statistics
   * @param address - Dogecoin wallet address
   * @param worker - Worker name
   * @returns Worker statistics
   */
  fetchWorkerStats: async (address: string, worker: string): Promise<Record<string, unknown>> => {
    try {
      const response = await fetch(`https://www.multipool.us/api/worker/${address}/${worker}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching Multipool worker stats:', error);
      return {};
    }
  },
};

