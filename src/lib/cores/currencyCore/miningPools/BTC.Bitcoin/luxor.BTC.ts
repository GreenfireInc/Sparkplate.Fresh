// Luxor - Bitcoin Mining Pool
// North American mining pool with advanced features
// Institutional-grade mining infrastructure

export const LuxorPool = {
  name: 'Luxor',
  ticker: 'BTC',
  
  // Pool Information
  description: 'Luxor is a North American mining pool offering institutional-grade infrastructure and advanced features. Known for transparent operations and professional services.',
  type: 'FPPS',
  location: 'United States',
  
  // Official Links
  website: 'https://luxor.tech/',
  poolStats: 'https://luxor.tech/stats',
  apiDocs: 'https://docs.luxor.tech/public-api/',
  miningPage: 'https://luxor.tech/mining',
  hashrateIndex: 'https://hashrateindex.com/',
  
  // API Endpoints
  api: {
    baseUrl: 'https://api.luxor.tech',
    publicBaseUrl: 'https://api.luxor.tech/public',
    endpoints: {
      stratumStats: '/stratum/stats',
      miningStats: '/mining/stats',
      hashrate: '/hashrate',
      btcHashprice: '/public/btc/hashprice',
      poolStats: '/pool/stats'
    }
  },
  
  // Social Media
  social: {
    twitter: 'https://twitter.com/LuxorTechHQ',
    linkedin: 'https://www.linkedin.com/company/luxor-technology/',
    telegram: 'https://t.me/LuxorTech',
    medium: 'https://medium.com/luxor'
  },
  
  /**
   * Fetch BTC hashprice (public endpoint)
   * Hashprice represents USD/TH/s/day
   * @returns Current BTC hashprice data
   */
  fetchBTCHashprice: async (): Promise<Record<string, unknown>> => {
    try {
      const response = await fetch(`https://api.luxor.tech/public/btc/hashprice`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching Luxor BTC hashprice:', error);
      return {};
    }
  },

  /**
   * Fetch stratum statistics
   * Requires API authentication
   * @param apiKey Luxor API key
   * @returns Stratum connection stats
   */
  fetchStratumStats: async (apiKey: string): Promise<Record<string, unknown>> => {
    try {
      const response = await fetch(
        `https://api.luxor.tech/stratum/stats`,
        {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching Luxor stratum stats:', error);
      return {};
    }
  },

  /**
   * Fetch mining statistics
   * Requires API authentication
   * @param apiKey Luxor API key
   * @returns Mining stats including hashrate, earnings
   */
  fetchMiningStats: async (apiKey: string): Promise<Record<string, unknown>> => {
    try {
      const response = await fetch(
        `https://api.luxor.tech/mining/stats`,
        {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching Luxor mining stats:', error);
      return {};
    }
  },

  /**
   * Fetch hashrate data
   * Requires API authentication
   * @param apiKey Luxor API key
   * @returns Hashrate statistics
   */
  fetchHashrate: async (apiKey: string): Promise<Record<string, unknown>> => {
    try {
      const response = await fetch(
        `https://api.luxor.tech/hashrate`,
        {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching Luxor hashrate:', error);
      return {};
    }
  },

  /**
   * Fetch pool statistics
   * Requires API authentication
   * @param apiKey Luxor API key
   * @returns Pool-wide statistics
   */
  fetchPoolStats: async (apiKey: string): Promise<Record<string, unknown>> => {
    try {
      const response = await fetch(
        `https://api.luxor.tech/pool/stats`,
        {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching Luxor pool stats:', error);
      return {};
    }
  },

  // Integration Notes
  notes: {
    authentication: 'Requires API key with Bearer token authentication',
    features: [
      'FPPS payout method',
      'Institutional-grade infrastructure',
      'Hashrate Index data provider',
      'Advanced analytics and monitoring',
      'Professional mining services',
      'North American presence',
      'API integration for workspace management'
    ],
    minimumPayout: 'Contact pool for details',
    fees: 'Competitive institutional fees',
    hashratePower: 'Growing North American pool',
    specialNotes: 'Provider of Hashrate Index - Bitcoin mining economics data'
  }
};
