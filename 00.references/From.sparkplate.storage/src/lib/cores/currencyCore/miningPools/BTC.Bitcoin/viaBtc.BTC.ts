// ViaBTC - Bitcoin Mining Pool
// Multi-currency mining pool with significant BTC hashrate
// Supports PPS+ and FPPS payout methods

export const ViaBTCPool = {
  name: 'ViaBTC',
  ticker: 'BTC',
  
  // Pool Information
  description: 'ViaBTC is a comprehensive mining pool supporting multiple cryptocurrencies with significant Bitcoin hashrate. Offers PPS+ and FPPS payout methods.',
  type: 'PPS+ / FPPS',
  location: 'China (Global Operations)',
  
  // Official Links
  website: 'https://www.viabtc.com/',
  poolStats: 'https://www.viabtc.com/pool/state',
  apiDocs: 'https://www.viabtc.com/api/',
  openApiDocs: 'https://www.viabtc.com/openapi/',
  github: 'https://github.com/viabtc/viabtc_mining_server',
  
  // API Endpoints
  api: {
    baseUrl: 'https://viabtc.com/api/v1',
    publicBaseUrl: 'https://api.viabtc.net',
    endpoints: {
      poolStats: '/btc/pool_stats',
      account: '/btc/account/:address',
      blocks: '/btc/blocks',
      workers: '/btc/workers/:address'
    }
  },
  
  // Social Media
  social: {
    twitter: 'https://twitter.com/ViaBTC',
    telegram: 'https://t.me/viabtc_en',
    medium: 'https://medium.com/@ViaBTC',
    facebook: 'https://www.facebook.com/viabtc'
  },
  
  /**
   * Fetch pool statistics
   * @returns Pool stats including hashrate, miners, blocks
   */
  fetchPoolStats: async (): Promise<Record<string, unknown>> => {
    try {
      const response = await fetch(`https://viabtc.com/api/v1/btc/pool_stats`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.data || {};
    } catch (error) {
      console.error('Error fetching ViaBTC pool stats:', error);
      return {};
    }
  },

  /**
   * Fetch miner/account statistics
   * @param address Wallet address or username
   * @param apiKey Optional API key for authenticated requests
   * @returns Miner stats including hashrate, earnings
   */
  fetchMinerStats: async (address: string, apiKey?: string): Promise<Record<string, unknown>> => {
    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json'
      };
      if (apiKey) {
        headers['Authorization'] = `Bearer ${apiKey}`;
      }
      
      const response = await fetch(
        `https://viabtc.com/api/v1/btc/account/${address}`,
        { headers }
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.data || {};
    } catch (error) {
      console.error('Error fetching ViaBTC miner stats:', error);
      return {};
    }
  },

  /**
   * Fetch recent blocks found by the pool
   * @returns Array of recent blocks
   */
  fetchBlockStats: async (): Promise<Array<Record<string, unknown>>> => {
    try {
      const response = await fetch(`https://viabtc.com/api/v1/btc/blocks`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.data || [];
    } catch (error) {
      console.error('Error fetching ViaBTC block stats:', error);
      return [];
    }
  },

  /**
   * Fetch worker statistics
   * @param address Wallet address or username
   * @param apiKey Optional API key
   * @returns Worker stats
   */
  fetchWorkerStats: async (address: string, apiKey?: string): Promise<Record<string, unknown>> => {
    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json'
      };
      if (apiKey) {
        headers['Authorization'] = `Bearer ${apiKey}`;
      }
      
      const response = await fetch(
        `https://viabtc.com/api/v1/btc/workers/${address}`,
        { headers }
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.data || {};
    } catch (error) {
      console.error('Error fetching ViaBTC worker stats:', error);
      return {};
    }
  },

  // Integration Notes
  notes: {
    authentication: 'Public API for pool stats, API key optional for user data',
    features: [
      'PPS+ and FPPS payout methods',
      'Multi-currency mining support',
      'REST and WebSocket APIs',
      'Open-source mining server software',
      'Global server locations',
      'Mobile app available'
    ],
    minimumPayout: '0.001 BTC',
    fees: '2% for PPS+, 1.5% for FPPS',
    hashratePower: 'Top 5 pool globally by hashrate'
  }
};
