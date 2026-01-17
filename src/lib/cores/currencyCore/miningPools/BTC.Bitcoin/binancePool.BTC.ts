// Binance Pool - Bitcoin Mining Pool
// Mining pool operated by Binance exchange
// Integrated with Binance ecosystem

export const BinancePool = {
  name: 'Binance Pool',
  ticker: 'BTC',
  
  // Pool Information
  description: 'Binance Pool is operated by Binance exchange, offering seamless integration with the Binance trading platform. Supports FPPS payout method with smart mining features.',
  type: 'FPPS',
  location: 'Global',
  
  // Official Links
  website: 'https://pool.binance.com/',
  poolStats: 'https://pool.binance.com/en/stats',
  apiDocs: 'https://binance-docs.github.io/apidocs/pool/en/',
  support: 'https://www.binance.com/en/support/faq/binance-pool-api',
  
  // API Endpoints
  api: {
    baseUrl: 'https://pool.binance.com',
    endpoints: {
      account: '/pool-api/v1/account',
      hashrate: '/pool-api/v1/hashrate',
      earnings: '/pool-api/v1/earnings',
      workers: '/pool-api/v1/workers',
      poolStats: '/pool-api/v1/pool/stats'
    }
  },
  
  // Social Media
  social: {
    twitter: 'https://twitter.com/BinancePool',
    telegram: 'https://t.me/BinancePool',
    facebook: 'https://www.facebook.com/BinancePool'
  },
  
  /**
   * Generate signature for Binance Pool API requests
   * @param queryString Query string
   * @param secretKey API secret key
   * @returns HMAC SHA256 signature
   */
  generateSignature: (queryString: string, secretKey: string): string => {
    const crypto = require('crypto');
    return crypto
      .createHmac('sha256', secretKey)
      .update(queryString)
      .digest('hex');
  },

  /**
   * Fetch pool statistics
   * @returns Pool stats including hashrate, miners
   */
  fetchPoolStats: async (): Promise<Record<string, unknown>> => {
    try {
      const response = await fetch(`https://pool.binance.com/pool-api/v1/public/pool/btc/stats`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.data || {};
    } catch (error) {
      console.error('Error fetching Binance Pool stats:', error);
      return {};
    }
  },

  /**
   * Fetch account hashrate
   * Requires API authentication
   * @param apiKey Binance Pool API key
   * @param secretKey Binance Pool secret key
   * @returns Account hashrate data
   */
  fetchAccountHashrate: async (apiKey: string, secretKey: string): Promise<Record<string, unknown>> => {
    try {
      const timestamp = Date.now();
      const queryString = `algo=sha256d&timestamp=${timestamp}`;
      const signature = BinancePool.generateSignature(queryString, secretKey);
      
      const response = await fetch(
        `https://pool.binance.com/pool-api/v1/hashrate?${queryString}&signature=${signature}`,
        {
          headers: {
            'X-MBX-APIKEY': apiKey
          }
        }
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.data || {};
    } catch (error) {
      console.error('Error fetching Binance Pool hashrate:', error);
      return {};
    }
  },

  /**
   * Fetch earnings data
   * Requires API authentication
   * @param apiKey Binance Pool API key
   * @param secretKey Binance Pool secret key
   * @returns Earnings data
   */
  fetchEarnings: async (apiKey: string, secretKey: string): Promise<Record<string, unknown>> => {
    try {
      const timestamp = Date.now();
      const queryString = `algo=sha256d&timestamp=${timestamp}`;
      const signature = BinancePool.generateSignature(queryString, secretKey);
      
      const response = await fetch(
        `https://pool.binance.com/pool-api/v1/earnings?${queryString}&signature=${signature}`,
        {
          headers: {
            'X-MBX-APIKEY': apiKey
          }
        }
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.data || {};
    } catch (error) {
      console.error('Error fetching Binance Pool earnings:', error);
      return {};
    }
  },

  /**
   * Fetch worker statistics
   * Requires API authentication
   * @param apiKey Binance Pool API key
   * @param secretKey Binance Pool secret key
   * @returns Worker stats
   */
  fetchWorkerStats: async (apiKey: string, secretKey: string): Promise<Record<string, unknown>> => {
    try {
      const timestamp = Date.now();
      const queryString = `algo=sha256d&timestamp=${timestamp}`;
      const signature = BinancePool.generateSignature(queryString, secretKey);
      
      const response = await fetch(
        `https://pool.binance.com/pool-api/v1/workers?${queryString}&signature=${signature}`,
        {
          headers: {
            'X-MBX-APIKEY': apiKey
          }
        }
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.data || {};
    } catch (error) {
      console.error('Error fetching Binance Pool worker stats:', error);
      return {};
    }
  },

  // Integration Notes
  notes: {
    authentication: 'Requires Binance account and API key with HMAC SHA256 signing',
    features: [
      'FPPS payout method',
      'Smart mining (auto-switching)',
      'Seamless Binance exchange integration',
      'Direct payout to Binance account',
      'Mobile app available',
      'Multi-algorithm support'
    ],
    minimumPayout: '0.0001 BTC (to Binance account)',
    fees: '1.5% for FPPS',
    hashratePower: 'Top 10 pool globally by hashrate'
  }
};
