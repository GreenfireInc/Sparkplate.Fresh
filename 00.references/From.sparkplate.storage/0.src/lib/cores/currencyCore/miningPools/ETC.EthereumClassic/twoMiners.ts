// 2Miners - Ethereum Classic Mining Pool
// Popular ETC mining pool with comprehensive API
// PPLNS payout system with low fees

export const TwoMinersPool = {
  name: '2Miners',
  ticker: 'ETC',
  
  // Pool Information
  description: '2Miners is a popular Ethereum Classic mining pool with low fees, comprehensive API, and reliable payouts. Features PPLNS payout system.',
  type: 'PPLNS',
  location: 'Global',
  
  // Official Links
  website: 'https://2miners.com/',
  etcPool: 'https://etc.2miners.com/',
  apiDocs: 'https://2miners.com/api/',
  
  // Social Media
  social: {
    twitter: 'https://twitter.com/2miners_com',
    telegram: 'https://t.me/pool2miners',
    discord: 'https://discord.gg/2miners',
  },
  
  // API Endpoints
  api: {
    baseUrl: 'https://etc.2miners.com/api',
    endpoints: {
      poolStats: '/stats',
      addressStats: '/accounts/:address',
      payments: '/payments/:address',
      blocks: '/blocks',
      miners: '/miners',
      currentStats: '/currentStats',
    },
    authMethod: 'Public API (no authentication)',
    rateLimit: 'Standard rate limits apply',
  },
  
  // Pool Features
  features: {
    minPayout: '0.1 ETC',
    fee: '1%',
    payoutFrequency: 'Every 2 hours (if minimum reached)',
    servers: ['EU', 'US', 'ASIA'],
  },
  
  // Mining Configuration
  stratum: {
    host: 'etc.2miners.com',
    ports: [1010, 1020],
    ssl: true,
    sslPort: 1030,
  },
  
  // TypeScript Integration Functions
  
  /**
   * Fetch pool statistics
   * @returns Pool statistics including hashrate, miners, and network info
   */
  fetchPoolStats: async (): Promise<Record<string, unknown>> => {
    try {
      const response = await fetch('https://etc.2miners.com/api/stats');
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
   * @param address - Ethereum Classic wallet address
   * @returns Address statistics including hashrate and balance
   */
  fetchAddressStats: async (address: string): Promise<Record<string, unknown>> => {
    try {
      const response = await fetch(`https://etc.2miners.com/api/accounts/${address}`);
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
   * @param address - Ethereum Classic wallet address
   * @returns Payment history
   */
  fetchPayments: async (address: string): Promise<Record<string, unknown>> => {
    try {
      const response = await fetch(`https://etc.2miners.com/api/payments/${address}`);
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
      const response = await fetch('https://etc.2miners.com/api/blocks');
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

