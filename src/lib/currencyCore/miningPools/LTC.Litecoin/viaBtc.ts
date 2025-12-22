// ViaBTC - Litecoin Mining Pool
// Multi-currency mining pool with LTC support
// FPPS and PPLNS payout options

export const ViaBtcLtc = {
  name: 'ViaBTC',
  ticker: 'LTC',
  
  // Pool Information
  description: 'ViaBTC is a comprehensive multi-currency mining pool supporting Litecoin with FPPS and PPLNS payout options. Global multi-asset mining pool.',
  type: 'FPPS / PPLNS',
  location: 'China (Global Operations)',
  
  // Official Links
  website: 'https://www.viabtc.com/',
  ltcPool: 'https://www.viabtc.com/pool/ltc',
  apiDocs: 'https://viabtc.github.io/api_en/',
  openApiDocs: 'https://www.viabtc.com/openapi/',
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
      poolStats: '/ltc/pool_stats',
      minerStats: '/ltc/account/:address',
      blockStats: '/ltc/blocks',
    },
    authMethod: 'API key required for user-specific data',
    rateLimit: 'Standard rate limits apply',
  },
  
  // Pool Features
  features: {
    minPayout: '0.01 LTC',
    fee: '2% (FPPS), 1% (PPLNS)',
    payoutFrequency: 'Daily (if minimum reached)',
    mergedMining: 'Dogecoin (DOGE)',
    servers: ['Global'],
  },
  
  // Mining Configuration
  stratum: {
    host: 'ltc.viabtc.com',
    port: 3333,
  },
  
  // TypeScript Integration Functions
  
  /**
   * Fetch pool statistics
   * @returns Pool statistics
   */
  fetchPoolStats: async (): Promise<Record<string, unknown>> => {
    try {
      const response = await fetch('https://www.viabtc.com/api/v1/ltc/pool_stats');
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
      
      const response = await fetch('https://www.viabtc.com/api/v1/ltc/account', { headers });
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
  fetchBlockStats: async (): Promise<Record<string, unknown>> => {
    try {
      const response = await fetch('https://www.viabtc.com/api/v1/ltc/blocks');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching ViaBTC block stats:', error);
      return {};
    }
  },
};

