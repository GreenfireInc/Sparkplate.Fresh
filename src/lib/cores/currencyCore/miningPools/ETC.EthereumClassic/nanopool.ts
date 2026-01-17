// Nanopool - Ethereum Classic Mining Pool
// Established multi-currency mining pool
// Anonymous mining with extensive API

export const NanopoolEtc = {
  name: 'Nanopool',
  ticker: 'ETC',
  
  // Pool Information
  description: 'Nanopool is an established multi-currency mining pool supporting Ethereum Classic. Features anonymous mining, extensive API, and reliable payouts.',
  type: 'PPLNS',
  location: 'Global',
  
  // Official Links
  website: 'https://nanopool.org/',
  etcPool: 'https://etc.nanopool.org/',
  apiDocs: 'https://etc.nanopool.org/api',
  help: 'https://nanopool.org/help',
  
  // Social Media
  social: {
    twitter: 'https://twitter.com/nanopool_org',
    telegram: 'https://t.me/nanopoolorg',
  },
  
  // API Endpoints
  api: {
    baseUrl: 'https://api-etc.nanopool.org/v1/etc',
    endpoints: {
      balance: '/balance/:address',
      userStats: '/user/:address',
      workers: '/workers/:address',
      averageHashrate: '/averageHashrate/:address',
      poolHashrate: '/pool/hashrate',
      poolStats: '/pool/stats',
      networkHashrate: '/network/hashrate',
      approximatedEarnings: '/approximated_earnings/:hashrate',
    },
    authMethod: 'Public API (no authentication)',
    rateLimit: 'Standard rate limits apply',
  },
  
  // Pool Features
  features: {
    minPayout: '0.1 ETC',
    fee: '1%',
    payoutFrequency: 'Every 2-6 hours (if minimum reached)',
    servers: ['EU', 'US', 'ASIA'],
  },
  
  // Mining Configuration
  stratum: {
    eu1: 'etc-eu1.nanopool.org:19999',
    eu2: 'etc-eu2.nanopool.org:19999',
    us1: 'etc-us-east1.nanopool.org:19999',
    us2: 'etc-us-west1.nanopool.org:19999',
    asia: 'etc-asia1.nanopool.org:19999',
  },
  
  // TypeScript Integration Functions
  
  /**
   * Fetch miner balance
   * @param address - Ethereum Classic wallet address
   * @returns Miner balance
   */
  fetchBalance: async (address: string): Promise<Record<string, unknown>> => {
    try {
      const response = await fetch(`https://api-etc.nanopool.org/v1/etc/balance/${address}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching Nanopool balance:', error);
      return {};
    }
  },
  
  /**
   * Fetch user statistics
   * @param address - Ethereum Classic wallet address
   * @returns User statistics including hashrate and workers
   */
  fetchUserStats: async (address: string): Promise<Record<string, unknown>> => {
    try {
      const response = await fetch(`https://api-etc.nanopool.org/v1/etc/user/${address}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching Nanopool user stats:', error);
      return {};
    }
  },
  
  /**
   * Fetch worker statistics
   * @param address - Ethereum Classic wallet address
   * @returns Worker statistics
   */
  fetchWorkers: async (address: string): Promise<Record<string, unknown>> => {
    try {
      const response = await fetch(`https://api-etc.nanopool.org/v1/etc/workers/${address}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching Nanopool workers:', error);
      return {};
    }
  },
  
  /**
   * Fetch average hashrate
   * @param address - Ethereum Classic wallet address
   * @returns Average hashrate over different time periods
   */
  fetchAverageHashrate: async (address: string): Promise<Record<string, unknown>> => {
    try {
      const response = await fetch(`https://api-etc.nanopool.org/v1/etc/averageHashrate/${address}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching Nanopool average hashrate:', error);
      return {};
    }
  },
  
  /**
   * Fetch pool statistics
   * @returns Pool statistics
   */
  fetchPoolStats: async (): Promise<Record<string, unknown>> => {
    try {
      const response = await fetch('https://api-etc.nanopool.org/v1/etc/pool/stats');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching Nanopool pool stats:', error);
      return {};
    }
  },
  
  /**
   * Fetch approximated earnings
   * @param hashrate - Hashrate in H/s
   * @returns Approximated earnings
   */
  fetchApproximatedEarnings: async (hashrate: number): Promise<Record<string, unknown>> => {
    try {
      const response = await fetch(`https://api-etc.nanopool.org/v1/etc/approximated_earnings/${hashrate}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching Nanopool approximated earnings:', error);
      return {};
    }
  },
};

