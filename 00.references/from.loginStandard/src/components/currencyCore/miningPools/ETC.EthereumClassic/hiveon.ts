// Hiveon - Ethereum Classic Mining Pool
// 0% fee mining pool
// Integrated with Hive OS

export const HiveonEtc = {
  name: 'Hiveon',
  ticker: 'ETC',
  
  // Pool Information
  description: 'Hiveon is a 0% fee mining pool for Ethereum Classic, integrated with Hive OS for seamless mining management. Features PPS+ payout system.',
  type: 'PPS+',
  location: 'Global',
  
  // Official Links
  website: 'https://hiveon.com/',
  etcPool: 'https://hiveon.com/pool/',
  apiDocs: 'https://hiveon.net/api-docs',
  
  // Social Media
  social: {
    twitter: 'https://twitter.com/hiveonofficial',
    telegram: 'https://t.me/hiveoncommunity',
    discord: 'https://discord.gg/hiveon',
  },
  
  // API Endpoints
  api: {
    baseUrl: 'https://api.hiveon.net/api/v1',
    endpoints: {
      poolStats: '/stats/etc',
      minerStats: '/miner/:address/stats',
      workers: '/miner/:address/workers',
    },
    authMethod: 'Public API (no authentication)',
    rateLimit: 'Standard rate limits apply',
  },
  
  // Pool Features
  features: {
    minPayout: '0.1 ETC',
    fee: '0%',
    payoutFrequency: 'Every 24 hours (if minimum reached)',
    servers: ['EU', 'US', 'ASIA'],
  },
  
  // Mining Configuration
  stratum: {
    eu: 'eu-etc.hiveon.net:4444',
    us: 'us-etc.hiveon.net:4444',
    asia: 'asia-etc.hiveon.net:4444',
  },
  
  // TypeScript Integration Functions
  
  /**
   * Fetch pool statistics
   * @returns Pool statistics
   */
  fetchPoolStats: async (): Promise<Record<string, unknown>> => {
    try {
      const response = await fetch('https://api.hiveon.net/api/v1/stats/etc');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching Hiveon pool stats:', error);
      return {};
    }
  },
  
  /**
   * Fetch miner statistics
   * @param address - Ethereum Classic wallet address
   * @returns Miner statistics
   */
  fetchMinerStats: async (address: string): Promise<Record<string, unknown>> => {
    try {
      const response = await fetch(`https://api.hiveon.net/api/v1/miner/${address}/stats`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching Hiveon miner stats:', error);
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
      const response = await fetch(`https://api.hiveon.net/api/v1/miner/${address}/workers`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching Hiveon workers:', error);
      return {};
    }
  },
};

