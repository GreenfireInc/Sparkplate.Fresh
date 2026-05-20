// Poolin - Litecoin Mining Pool
// Large multi-currency mining pool
// Multiple payout modes

export const PoolinLtc = {
  name: 'Poolin',
  ticker: 'LTC',
  
  // Pool Information
  description: 'Poolin is a large multi-currency mining pool supporting Litecoin with multiple payout modes and comprehensive mining tools.',
  type: 'PPS+ / FPPS / PPLNS',
  location: 'China (Global Operations)',
  
  // Official Links
  website: 'https://www.poolin.com/',
  ltcPool: 'https://www.poolin.com/pool/ltc',
  apiDocs: 'https://poolin.com/en/help/api',
  help: 'https://help.poolin.me/',
  
  // Social Media
  social: {
    twitter: 'https://twitter.com/officialpoolin',
    telegram: 'https://t.me/poolin_official',
  },
  
  // API Endpoints
  api: {
    baseUrl: 'https://api.poolin.com',
    endpoints: {
      poolStats: '/api/public/v2/pool/stats',
      minerStats: '/api/public/v2/miner/stats',
      workerStats: '/api/public/v2/miner/workers',
    },
    authMethod: 'API key required for user-specific data',
    rateLimit: 'Standard rate limits apply',
  },
  
  // Pool Features
  features: {
    minPayout: '0.01 LTC',
    fee: '2.5% (varies by mode)',
    payoutFrequency: 'Daily (if minimum reached)',
    mergedMining: 'Dogecoin (DOGE)',
    servers: ['Global'],
  },
  
  // Mining Configuration
  stratum: {
    host: 'ltc.ss.poolin.com',
    port: 443,
  },
  
  // TypeScript Integration Functions
  
  /**
   * Fetch pool statistics
   * @returns Pool statistics
   */
  fetchPoolStats: async (): Promise<Record<string, unknown>> => {
    try {
      const response = await fetch('https://api.poolin.com/api/public/v2/pool/stats?coin=ltc');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching Poolin pool stats:', error);
      return {};
    }
  },
  
  /**
   * Fetch miner statistics (requires authentication)
   * @param apiKey - Poolin API key
   * @returns Miner statistics
   */
  fetchMinerStats: async (apiKey: string): Promise<Record<string, unknown>> => {
    try {
      const headers = {
        'Authorization': `Bearer ${apiKey}`,
      };
      
      const response = await fetch('https://api.poolin.com/api/public/v2/miner/stats?coin=ltc', { headers });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching Poolin miner stats:', error);
      return {};
    }
  },
  
  /**
   * Fetch worker statistics (requires authentication)
   * @param apiKey - Poolin API key
   * @returns Worker statistics
   */
  fetchWorkerStats: async (apiKey: string): Promise<Record<string, unknown>> => {
    try {
      const headers = {
        'Authorization': `Bearer ${apiKey}`,
      };
      
      const response = await fetch('https://api.poolin.com/api/public/v2/miner/workers?coin=ltc', { headers });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching Poolin worker stats:', error);
      return {};
    }
  },
};

