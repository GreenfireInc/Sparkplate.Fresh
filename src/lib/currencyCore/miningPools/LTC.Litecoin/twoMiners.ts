// 2Miners - Litecoin Mining Pool
// Transparent and beginner-friendly platform
// SOLO and PPLNS mining options

export const TwoMinersLtc = {
  name: '2Miners',
  ticker: 'LTC',
  
  // Pool Information
  description: '2Miners is a transparent and beginner-friendly mining pool supporting Litecoin with SOLO and PPLNS payout options.',
  type: 'SOLO / PPLNS',
  location: 'Global',
  
  // Official Links
  website: 'https://2miners.com/',
  ltcPool: 'https://ltc.2miners.com/',
  apiDocs: 'https://2miners.com/api/',
  
  // Social Media
  social: {
    twitter: 'https://twitter.com/2miners_com',
    telegram: 'https://t.me/pool2miners',
    discord: 'https://discord.gg/2miners',
  },
  
  // API Endpoints
  api: {
    baseUrl: 'https://ltc.2miners.com/api',
    endpoints: {
      poolStats: '/stats',
      minerStats: '/stats/:address',
      payments: '/payments/:address',
      blocks: '/blocks',
      currentStats: '/currentStats',
    },
    authMethod: 'Public API (no authentication)',
    rateLimit: 'Standard rate limits apply',
  },
  
  // Pool Features
  features: {
    minPayout: '0.05 LTC',
    fee: '1%',
    payoutFrequency: 'Every 2 hours (if minimum reached)',
    servers: ['EU', 'US', 'ASIA'],
  },
  
  // Mining Configuration
  stratum: {
    host: 'ltc.2miners.com',
    ports: [6060, 6061],
  },
  
  // TypeScript Integration Functions
  
  /**
   * Fetch pool statistics
   * @returns Pool statistics including hashrate and miners
   */
  fetchPoolStats: async (): Promise<Record<string, unknown>> => {
    try {
      const response = await fetch('https://ltc.2miners.com/api/stats');
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
   * Fetch miner statistics
   * @param address - Litecoin wallet address
   * @returns Miner statistics including hashrate and balance
   */
  fetchMinerStats: async (address: string): Promise<Record<string, unknown>> => {
    try {
      const response = await fetch(`https://ltc.2miners.com/api/stats/${address}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching 2Miners miner stats:', error);
      return {};
    }
  },
  
  /**
   * Fetch payment history
   * @param address - Litecoin wallet address
   * @returns Payment history
   */
  fetchPayments: async (address: string): Promise<Record<string, unknown>> => {
    try {
      const response = await fetch(`https://ltc.2miners.com/api/payments/${address}`);
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
      const response = await fetch('https://ltc.2miners.com/api/blocks');
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

