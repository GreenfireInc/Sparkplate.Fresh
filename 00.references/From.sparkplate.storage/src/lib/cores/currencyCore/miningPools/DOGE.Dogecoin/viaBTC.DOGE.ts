// ViaBTC - Dogecoin Mining Pool
// Multi-currency mining pool with significant DOGE hashrate
// Supports merged mining with Litecoin

export const ViaBTCPool = {
  name: 'ViaBTC',
  ticker: 'DOGE',
  
  // Pool Information
  description: 'ViaBTC is a comprehensive multi-currency mining pool with significant Dogecoin hashrate. Supports merged mining with Litecoin on the Scrypt algorithm.',
  type: 'PPS+ / FPPS',
  location: 'China (Global Operations)',
  
  // Official Links
  website: 'https://www.viabtc.com/',
  poolStats: 'https://www.viabtc.com/pool/state',
  apiDocs: 'https://www.viabtc.com/api/',
  openApiDocs: 'https://www.viabtc.com/openapi/',
  github: 'https://github.com/viabtc',
  
  // Social Media
  social: {
    twitter: 'https://twitter.com/ViaBTC',
    telegram: 'https://t.me/viabtc_en',
  },
  
  // API Endpoints
  api: {
    baseUrl: 'https://www.viabtc.com/api/v1',
    publicBaseUrl: 'https://api.viabtc.net',
    endpoints: {
      poolStats: '/pool/stats?coin=DOGE',
      userStats: '/account/stats',
      workerStats: '/worker/stats',
      earnings: '/account/earnings',
      payouts: '/account/payouts',
    },
    authMethod: 'API Key + Signature (HMAC-SHA256)',
    rateLimit: 'Standard rate limits apply',
  },
  
  // Pool Features
  features: {
    mergedMining: true,
    autoPayout: true,
    profitSwitching: false,
    multiCoinPayout: true,
    minPayout: '100 DOGE',
  },
  
  // TypeScript Integration Functions
  
  /**
   * Fetch pool statistics (public endpoint)
   * @returns Pool statistics including hashrate and miners
   */
  fetchPoolStats: async (): Promise<Record<string, unknown>> => {
    try {
      const response = await fetch('https://api.viabtc.net/pool/stats?coin=DOGE');
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
   * Fetch user statistics (requires authentication)
   * @param apiKey - ViaBTC API key
   * @param accessId - ViaBTC access ID
   * @param signature - HMAC-SHA256 signature
   * @returns User statistics
   */
  fetchUserStats: async (apiKey: string, accessId: string, signature: string): Promise<Record<string, unknown>> => {
    try {
      const response = await fetch('https://www.viabtc.com/api/v1/account/stats', {
        headers: {
          'Content-Type': 'application/json',
          'X-Via-Key': apiKey,
          'X-Via-Access-Id': accessId,
          'X-Via-Signature': signature,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching ViaBTC user stats:', error);
      return {};
    }
  },
  
  /**
   * Generate HMAC-SHA256 signature for API authentication
   * @param secret - API secret
   * @param message - Message to sign
   * @returns HMAC-SHA256 signature
   */
  generateSignature: async (secret: string, message: string): Promise<string> => {
    const crypto = await import('crypto');
    const hmac = crypto.createHmac('sha256', secret);
    hmac.update(message);
    return hmac.digest('hex');
  },
};

