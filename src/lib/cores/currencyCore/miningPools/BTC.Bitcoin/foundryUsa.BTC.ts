// Foundry USA - Bitcoin Mining Pool
// One of the largest Bitcoin mining pools by hashrate
// North America-based, enterprise-oriented pool

export const FoundryUSAPool = {
  name: 'Foundry USA',
  ticker: 'BTC',
  
  // Pool Information
  description: 'Foundry USA is one of the largest Bitcoin mining pools globally, operated by Foundry Digital. Enterprise-oriented with institutional-grade infrastructure.',
  type: 'FPPS (Full Pay Per Share)',
  location: 'United States',
  
  // Official Links
  website: 'https://foundrydigital.com/',
  poolStats: 'https://foundrydigital.com/pool',
  apiDocs: 'https://foundrydigital.com/api-docs',
  
  // API Endpoints
  api: {
    baseUrl: 'https://api.foundrydigital.com',
    endpoints: {
      poolStats: '/v1/pool/stats',
      minerStats: '/v1/miner/:address',
      blocks: '/v1/blocks',
      hashrate: '/v1/hashrate'
    }
  },
  
  // Social Media
  social: {
    twitter: 'https://twitter.com/FoundryServices',
    linkedin: 'https://www.linkedin.com/company/foundry-digital-llc/',
    blog: 'https://foundrydigital.com/blog'
  },
  
  // Pool Statistics Functions
  /**
   * Fetch pool statistics from Foundry USA
   * Note: API access may require authentication
   * @returns Pool stats including hashrate, miners, blocks
   */
  fetchPoolStats: async (): Promise<Record<string, unknown>> => {
    try {
      const response = await fetch(`https://api.foundrydigital.com/v1/pool/stats`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching Foundry USA pool stats:', error);
      return {};
    }
  },

  /**
   * Fetch miner-specific statistics
   * @param address Miner wallet address
   * @param apiKey API key for authentication
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
        `https://api.foundrydigital.com/v1/miner/${address}`,
        { headers }
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching Foundry USA miner stats:', error);
      return {};
    }
  },

  /**
   * Fetch recent blocks mined by Foundry USA
   * @returns Array of recent blocks
   */
  fetchRecentBlocks: async (): Promise<Array<Record<string, unknown>>> => {
    try {
      const response = await fetch(`https://api.foundrydigital.com/v1/blocks`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.blocks || [];
    } catch (error) {
      console.error('Error fetching Foundry USA blocks:', error);
      return [];
    }
  },

  // Integration Notes
  notes: {
    authentication: 'API access may require registration and API key',
    features: [
      'Enterprise-grade infrastructure',
      'FPPS payout method',
      'Institutional custody options',
      'Advanced monitoring and analytics',
      'North American presence'
    ],
    minimumPayout: 'Contact pool for details',
    fees: 'Competitive pool fees',
    hashratePower: 'One of the top 3 pools globally by hashrate'
  }
};
