// 2Miners - Dogecoin Mining Pool
// Multi-coin mining pool with DOGE support
// Comprehensive API and modern interface

export const TwoMinersPool = {
  name: '2Miners',
  ticker: 'DOGE',
  
  // Pool Information
  description: '2Miners is a modern multi-coin mining pool with Dogecoin support. Features comprehensive API access and user-friendly interface.',
  type: 'PPLNS',
  location: 'Global',
  
  // Official Links
  website: 'https://2miners.com/',
  dogePool: 'https://doge.2miners.com/',
  apiDocs: 'https://2miners.com/api/',
  
  // Social Media
  social: {
    twitter: 'https://twitter.com/2miners_com',
    telegram: 'https://t.me/pool2miners',
    discord: 'https://discord.gg/2miners',
  },
  
  // API Endpoints
  api: {
    baseUrl: 'https://doge.2miners.com/api',
    endpoints: {
      poolStats: '/stats',
      addressStats: '/accounts/:address',
      payments: '/payments/:address',
      blocks: '/blocks',
      miners: '/miners',
    },
    authMethod: 'Public API (no authentication)',
    rateLimit: 'Standard rate limits apply',
  },
  
  // Pool Features
  features: {
    mergedMining: false,
    autoPayout: true,
    profitSwitching: false,
    multiCoinPayout: false,
    minPayout: '100 DOGE',
  },
  
  // Mining Configuration
  stratum: {
    host: 'doge.2miners.com',
    ports: [3032, 3033],
    ssl: true,
  },
  
  // TypeScript Integration Functions
  
  /**
   * Fetch pool statistics
   * @returns Pool statistics including hashrate, miners, and network info
   */
  fetchPoolStats: async (): Promise<Record<string, unknown>> => {
    try {
      const response = await fetch('https://doge.2miners.com/api/stats');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching 2Miners pool stats:', error);
      return {};
    }
  },
  
  /**
   * Fetch address statistics
   * @param address - Dogecoin wallet address
   * @returns Address statistics including hashrate and balance
   */
  fetchAddressStats: async (address: string): Promise<Record<string, unknown>> => {
    try {
      const response = await fetch(`https://doge.2miners.com/api/accounts/${address}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching 2Miners address stats:', error);
      return {};
    }
  },
  
  /**
   * Fetch payment history
   * @param address - Dogecoin wallet address
   * @returns Payment history
   */
  fetchPayments: async (address: string): Promise<Record<string, unknown>> => {
    try {
      const response = await fetch(`https://doge.2miners.com/api/payments/${address}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching 2Miners payments:', error);
      return {};
    }
  },
  
  /**
   * Fetch recent blocks
   * @returns Recent blocks found by the pool
   */
  fetchBlocks: async (): Promise<Record<string, unknown>> => {
    try {
      const response = await fetch('https://doge.2miners.com/api/blocks');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching 2Miners blocks:', error);
      return {};
    }
  },
};

