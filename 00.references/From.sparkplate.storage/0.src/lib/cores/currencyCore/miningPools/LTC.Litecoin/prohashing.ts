// Prohashing - Litecoin Mining Pool
// U.S.-based multipool with multiple payout options
// PPS payout system

export const ProhashingLtc = {
  name: 'Prohashing',
  ticker: 'LTC',
  
  // Pool Information
  description: 'Prohashing is a U.S.-based multi-algorithm mining pool supporting Scrypt (Litecoin). Offers payouts in any currency including BTC, LTC, and USD.',
  type: 'PPS',
  location: 'United States',
  
  // Official Links
  website: 'https://prohashing.com/',
  ltcPool: 'https://prohashing.com/coin/Litecoin',
  apiDocs: 'https://prohashing.com/help/prohashing-api-developing',
  help: 'https://prohashing.com/help.html#Public_APIs',
  
  // Social Media
  social: {
    twitter: 'https://twitter.com/prohashing',
  },
  
  // API Endpoints
  api: {
    baseUrl: 'https://prohashing.com/api',
    endpoints: {
      accountStats: '/account_stats?api_key=:apiKey',
      coinStats: '/coin_stats?api_key=:apiKey&coin=litecoin',
      workerStats: '/worker_stats?api_key=:apiKey',
    },
    authMethod: 'API key required',
    rateLimit: 'Standard rate limits apply',
  },
  
  // Pool Features
  features: {
    minPayout: 'Varies by payout currency',
    fee: '4.99%',
    payoutFrequency: 'Daily (configurable)',
    payoutOptions: 'BTC, LTC, USD, and many others',
    servers: ['US', 'EU'],
  },
  
  // Mining Configuration
  stratum: {
    host: 'prohashing.com',
    port: 3333,
  },
  
  // TypeScript Integration Functions
  
  /**
   * Fetch account statistics (requires API key)
   * @param apiKey - Prohashing API key
   * @returns Account statistics
   */
  fetchAccountStats: async (apiKey: string): Promise<Record<string, unknown>> => {
    try {
      const response = await fetch(`https://prohashing.com/api/account_stats?api_key=${apiKey}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching Prohashing account stats:', error);
      return {};
    }
  },
  
  /**
   * Fetch Litecoin-specific statistics (requires API key)
   * @param apiKey - Prohashing API key
   * @returns Litecoin coin statistics
   */
  fetchCoinStats: async (apiKey: string): Promise<Record<string, unknown>> => {
    try {
      const response = await fetch(`https://prohashing.com/api/coin_stats?api_key=${apiKey}&coin=litecoin`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching Prohashing LTC coin stats:', error);
      return {};
    }
  },
  
  /**
   * Fetch worker statistics (requires API key)
   * @param apiKey - Prohashing API key
   * @returns Worker statistics
   */
  fetchWorkerStats: async (apiKey: string): Promise<Record<string, unknown>> => {
    try {
      const response = await fetch(`https://prohashing.com/api/worker_stats?api_key=${apiKey}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching Prohashing worker stats:', error);
      return {};
    }
  },
};

