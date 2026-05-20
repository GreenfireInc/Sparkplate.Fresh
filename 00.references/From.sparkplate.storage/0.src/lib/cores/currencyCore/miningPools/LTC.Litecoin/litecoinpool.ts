// Litecoinpool.org - Litecoin Mining Pool
// Oldest and most trusted Litecoin mining pool
// Merged mining with Dogecoin (LTC + DOGE)

export const LitecoinpoolOrg = {
  name: 'Litecoinpool.org',
  ticker: 'LTC',
  
  // Pool Information
  description: 'Litecoinpool.org is the oldest and most trusted Litecoin mining pool. Features merged mining with Dogecoin, PPS payout system, and secure TLS connections.',
  type: 'PPS (Pay Per Share)',
  location: 'Global',
  
  // Official Links
  website: 'https://www.litecoinpool.org/',
  apiDocs: 'https://www.litecoinpool.org/help/api',
  help: 'https://www.litecoinpool.org/help',
  
  // Social Media
  social: {
    reddit: 'https://www.reddit.com/r/litecoin/',
    twitter: 'https://twitter.com/LitecoinProject',
  },
  
  // API Endpoints
  api: {
    baseUrl: 'https://www.litecoinpool.org/api',
    endpoints: {
      userStats: '?api_key=:apiKey',
    },
    authMethod: 'API key required (from account settings)',
    rateLimit: 'Standard rate limits apply',
  },
  
  // Pool Features
  features: {
    minPayout: '0.01 LTC',
    fee: '0% (donations accepted)',
    payoutFrequency: 'Automatic when minimum reached',
    mergedMining: 'Dogecoin (DOGE)',
    servers: ['Global'],
  },
  
  // Mining Configuration
  stratum: {
    host: 'stratum+tcp://litecoinpool.org',
    ports: [3333, 3334],
    tls: true,
    tlsPort: 443,
  },
  
  // TypeScript Integration Functions
  
  /**
   * Fetch user statistics (requires API key)
   * @param apiKey - Litecoinpool.org API key from account settings
   * @returns User statistics including hashrate, workers, balance
   */
  fetchUserStats: async (apiKey: string): Promise<Record<string, unknown>> => {
    try {
      const response = await fetch(`https://www.litecoinpool.org/api?api_key=${apiKey}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching Litecoinpool.org user stats:', error);
      return {};
    }
  },
};

