// Prohashing - Dogecoin Mining Pool
// Multi-algorithm mining pool with comprehensive API
// Supports profit-switching and multi-coin payouts

import crypto from 'crypto';

export const ProhashingPool = {
  name: 'Prohashing',
  ticker: 'DOGE',
  
  // Pool Information
  description: 'Prohashing is a multi-algorithm mining pool supporting Dogecoin and many other cryptocurrencies. Features include profit-switching, multi-coin payouts, and comprehensive API access.',
  type: 'Multi-Algo / PPS',
  location: 'United States',
  
  // Official Links
  website: 'https://prohashing.com/',
  poolStats: 'https://prohashing.com/explorer/Dogecoin',
  apiDocs: 'https://prohashing.com/help/api',
  userGuide: 'https://prohashing.com/help/prohashing-api-developing',
  
  // Social Media
  social: {
    twitter: 'https://twitter.com/prohashing',
    reddit: 'https://www.reddit.com/r/prohashing/',
  },
  
  // API Endpoints
  api: {
    baseUrl: 'https://prohashing.com/api',
    endpoints: {
      accountStats: '/account_stats',
      coinStats: '/coin_stats',
      workerStats: '/worker_stats',
      earnings: '/earnings',
      blocks: '/blocks',
    },
    authMethod: 'API Key (query parameter)',
    rateLimit: 'Standard rate limits apply',
  },
  
  // Pool Features
  features: {
    mergedMining: true,
    autoPayout: true,
    profitSwitching: true,
    multiCoinPayout: true,
    minPayout: '1 DOGE',
  },
  
  // TypeScript Integration Functions
  
  /**
   * Fetch account statistics
   * @param apiKey - Your Prohashing API key
   * @returns Account statistics including balance and hashrate
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
   * Fetch coin-specific statistics
   * @param apiKey - Your Prohashing API key
   * @param coin - Coin symbol (default: 'dogecoin')
   * @returns Coin statistics
   */
  fetchCoinStats: async (apiKey: string, coin: string = 'dogecoin'): Promise<Record<string, unknown>> => {
    try {
      const response = await fetch(`https://prohashing.com/api/coin_stats?api_key=${apiKey}&coin=${coin}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching Prohashing coin stats:', error);
      return {};
    }
  },
  
  /**
   * Fetch worker statistics
   * @param apiKey - Your Prohashing API key
   * @returns Worker statistics including individual worker hashrates
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

