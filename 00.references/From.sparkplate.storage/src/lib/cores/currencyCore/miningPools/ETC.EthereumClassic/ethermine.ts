// Ethermine - Ethereum Classic Mining Pool
// One of the largest ETC mining pools
// PPLNS payout system with professional infrastructure

export const EtherminePool = {
  name: 'Ethermine',
  ticker: 'ETC',
  
  // Pool Information
  description: 'Ethermine is one of the largest and most established Ethereum Classic mining pools. Features professional infrastructure, comprehensive API, and reliable payouts.',
  type: 'PPLNS',
  location: 'Global',
  
  // Official Links
  website: 'https://ethermine.org/',
  etcPool: 'https://etc.ethermine.org/',
  apiDocs: 'https://etc.ethermine.org/api',
  
  // Social Media
  social: {
    twitter: 'https://twitter.com/ethermine_org',
    reddit: 'https://www.reddit.com/r/EtherMining/',
  },
  
  // API Endpoints
  api: {
    baseUrl: 'https://etc.ethermine.org/api',
    endpoints: {
      poolStats: '/poolStats',
      minerStats: '/miner/:address/currentStats',
      minerHistory: '/miner/:address/history',
      minerPayouts: '/miner/:address/payouts',
      minerSettings: '/miner/:address/settings',
      minerDashboard: '/miner/:address/dashboard',
      workers: '/miner/:address/workers',
      rounds: '/miner/:address/rounds',
    },
    authMethod: 'Public API (no authentication)',
    rateLimit: 'Standard rate limits apply',
  },
  
  // Pool Features
  features: {
    minPayout: '0.1 ETC',
    fee: '1%',
    payoutFrequency: 'Every 6 hours (if minimum reached)',
    servers: ['EU', 'US', 'ASIA'],
  },
  
  // Mining Configuration
  stratum: {
    eu: {
      host: 'eu1-etc.ethermine.org',
      port: 4444,
    },
    us: {
      host: 'us1-etc.ethermine.org',
      port: 4444,
    },
    asia: {
      host: 'asia1-etc.ethermine.org',
      port: 4444,
    },
  },
  
  // TypeScript Integration Functions
  
  /**
   * Fetch pool statistics
   * @returns Pool statistics including hashrate and active miners
   */
  fetchPoolStats: async (): Promise<Record<string, unknown>> => {
    try {
      const response = await fetch('https://etc.ethermine.org/api/poolStats');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching Ethermine pool stats:', error);
      return {};
    }
  },
  
  /**
   * Fetch miner statistics
   * @param address - Ethereum Classic wallet address
   * @returns Miner statistics including hashrate and workers
   */
  fetchMinerStats: async (address: string): Promise<Record<string, unknown>> => {
    try {
      const response = await fetch(`https://etc.ethermine.org/api/miner/${address}/currentStats`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching Ethermine miner stats:', error);
      return {};
    }
  },
  
  /**
   * Fetch miner dashboard
   * @param address - Ethereum Classic wallet address
   * @returns Comprehensive miner dashboard data
   */
  fetchMinerDashboard: async (address: string): Promise<Record<string, unknown>> => {
    try {
      const response = await fetch(`https://etc.ethermine.org/api/miner/${address}/dashboard`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching Ethermine miner dashboard:', error);
      return {};
    }
  },
  
  /**
   * Fetch miner payouts
   * @param address - Ethereum Classic wallet address
   * @returns Payment history
   */
  fetchMinerPayouts: async (address: string): Promise<Record<string, unknown>> => {
    try {
      const response = await fetch(`https://etc.ethermine.org/api/miner/${address}/payouts`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching Ethermine payouts:', error);
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
      const response = await fetch(`https://etc.ethermine.org/api/miner/${address}/workers`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching Ethermine workers:', error);
      return {};
    }
  },
};

