// Flexpool - Ethereum Classic Mining Pool
// Modern mining pool with efficient infrastructure
// PPLNS and solo mining support

export const FlexpoolEtc = {
  name: 'Flexpool',
  ticker: 'ETC',
  
  // Pool Information
  description: 'Flexpool is a modern, efficient mining pool supporting Ethereum Classic with PPLNS and solo mining options. Features comprehensive API and real-time monitoring.',
  type: 'PPLNS / SOLO',
  location: 'Global',
  
  // Official Links
  website: 'https://flexpool.io/',
  etcPool: 'https://flexpool.io/coin/etc',
  apiDocs: 'https://docs.flexpool.io/',
  
  // Social Media
  social: {
    twitter: 'https://twitter.com/flexpool_io',
    telegram: 'https://t.me/flexpool',
    discord: 'https://discord.gg/flexpool',
  },
  
  // API Endpoints
  api: {
    baseUrl: 'https://etc.flexpool.io/api/v1',
    endpoints: {
      poolStats: '/pool/stats',
      minerStats: '/miner/:address/stats',
      minerWorkers: '/miner/:address/workers',
      minerHistory: '/miner/:address/history',
      poolBlocks: '/pool/blocks',
    },
    authMethod: 'Public API (no authentication)',
    rateLimit: 'Standard rate limits apply',
  },
  
  // Pool Features
  features: {
    minPayout: '0.05 ETC',
    fee: '0.5% (PPLNS), 3% (SOLO)',
    payoutFrequency: 'Every 2 hours (if minimum reached)',
    servers: ['EU', 'US', 'ASIA'],
  },
  
  // Mining Configuration
  stratum: {
    eu: 'eu-etc.flexpool.io:4444',
    us: 'us-etc.flexpool.io:4444',
    asia: 'asia-etc.flexpool.io:4444',
    br: 'br-etc.flexpool.io:4444',
  },
  
  // TypeScript Integration Functions
  
  /**
   * Fetch pool statistics
   * @returns Pool statistics including hashrate and miners
   */
  fetchPoolStats: async (): Promise<Record<string, unknown>> => {
    try {
      const response = await fetch('https://etc.flexpool.io/api/v1/pool/stats');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching Flexpool pool stats:', error);
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
      const response = await fetch(`https://etc.flexpool.io/api/v1/miner/${address}/stats`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching Flexpool miner stats:', error);
      return {};
    }
  },
  
  /**
   * Fetch miner workers
   * @param address - Ethereum Classic wallet address
   * @returns Worker statistics
   */
  fetchMinerWorkers: async (address: string): Promise<Record<string, unknown>> => {
    try {
      const response = await fetch(`https://etc.flexpool.io/api/v1/miner/${address}/workers`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching Flexpool miner workers:', error);
      return {};
    }
  },
  
  /**
   * Fetch miner history
   * @param address - Ethereum Classic wallet address
   * @param from - Start timestamp
   * @param to - End timestamp
   * @returns Miner history data
   */
  fetchMinerHistory: async (address: string, from?: number, to?: number): Promise<Record<string, unknown>> => {
    try {
      let url = `https://etc.flexpool.io/api/v1/miner/${address}/history`;
      const params = new URLSearchParams();
      if (from) params.append('from', from.toString());
      if (to) params.append('to', to.toString());
      if (params.toString()) url += `?${params.toString()}`;
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching Flexpool miner history:', error);
      return {};
    }
  },
  
  /**
   * Fetch pool blocks
   * @param page - Page number
   * @returns Recent blocks found by the pool
   */
  fetchPoolBlocks: async (page: number = 0): Promise<Record<string, unknown>> => {
    try {
      const response = await fetch(`https://etc.flexpool.io/api/v1/pool/blocks?page=${page}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching Flexpool pool blocks:', error);
      return {};
    }
  },
};

