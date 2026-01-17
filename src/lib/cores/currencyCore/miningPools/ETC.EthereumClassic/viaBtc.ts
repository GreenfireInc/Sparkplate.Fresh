// ViaBTC - Ethereum Classic Mining Pool
// Multi-currency mining pool with ETC support
// PPS+ and PPLNS payout options

export const ViaBtcEtc = {
  name: 'ViaBTC',
  ticker: 'ETC',
  
  // Pool Information
  description: 'ViaBTC is a comprehensive multi-currency mining pool supporting Ethereum Classic with PPS+ and PPLNS payout options.',
  type: 'PPS+ / PPLNS',
  location: 'China (Global Operations)',
  
  // Official Links
  website: 'https://www.viabtc.com/',
  etcPool: 'https://www.viabtc.com/pool/etc',
  apiDocs: 'https://www.viabtc.com/api/',
  help: 'https://support.viabtc.com/',
  
  // Social Media
  social: {
    twitter: 'https://twitter.com/ViaBTC',
    telegram: 'https://t.me/viabtc_eng',
  },
  
  // API Endpoints
  api: {
    baseUrl: 'https://www.viabtc.com/api/v1',
    endpoints: {
      poolStats: '/pool/stats',
      minerStats: '/pool/miner',
      recentBlocks: '/pool/blocks',
    },
    authMethod: 'API key required for user-specific data',
    rateLimit: 'Standard rate limits apply',
  },
  
  // Pool Features
  features: {
    minPayout: '0.1 ETC',
    fee: '2% (PPS+), 1% (PPLNS)',
    payoutFrequency: 'Daily (if minimum reached)',
    servers: ['Global'],
  },
  
  // Mining Configuration
  stratum: {
    host: 'etc.viabtc.com',
    port: 3333,
  },
  
  // TypeScript Integration Functions
  
  /**
   * Fetch pool statistics
   * @returns Pool statistics
   */
  fetchPoolStats: async (): Promise<Record<string, unknown>> => {
    try {
      const response = await fetch('https://www.viabtc.com/api/v1/pool/stats?coin=ETC');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching ViaBTC pool stats:', error);
      return {};
    }
  },
  
  /**
   * Fetch miner statistics (requires authentication)
   * @param apiKey - ViaBTC API key
   * @returns Miner statistics
   */
  fetchMinerStats: async (apiKey: string): Promise<Record<string, unknown>> => {
    try {
      const headers = {
        'Authorization': `Bearer ${apiKey}`,
      };
      
      const response = await fetch('https://www.viabtc.com/api/v1/pool/miner?coin=ETC', { headers });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching ViaBTC miner stats:', error);
      return {};
    }
  },
  
  /**
   * Fetch recent blocks
   * @returns Recent blocks found by the pool
   */
  fetchRecentBlocks: async (): Promise<Record<string, unknown>> => {
    try {
      const response = await fetch('https://www.viabtc.com/api/v1/pool/blocks?coin=ETC');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching ViaBTC recent blocks:', error);
      return {};
    }
  },
};

