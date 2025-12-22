// Braiins Pool (Slush Pool) - Bitcoin Mining Pool
// The first Bitcoin mining pool, established in 2010
// Known for transparency and open-source software

export const BraiinsPool = {
  name: 'Braiins Pool',
  altName: 'Slush Pool',
  ticker: 'BTC',
  
  // Pool Information
  description: 'Braiins Pool (formerly Slush Pool) is the first Bitcoin mining pool, established in 2010. Known for transparency, innovation, and open-source mining software (Braiins OS).',
  type: 'FPPS / PPLNS',
  location: 'Czech Republic (Global Operations)',
  
  // Official Links
  website: 'https://braiins.com/pool',
  legacyWebsite: 'https://slushpool.com/',
  poolStats: 'https://braiins.com/pool/stats',
  apiDocs: 'https://docs.braiins.com/pool/#api',
  helpCenter: 'https://braiins.com/support',
  braiinsOsDocs: 'https://docs.braiins.com/os/',
  
  // API Endpoints
  api: {
    baseUrl: 'https://slushpool.com/api',
    statsBaseUrl: 'https://slushpool.com/stats/json/btc/',
    endpoints: {
      accountStats: '/v2/accounts/stats/',
      hashrateHistory: '/v2/accounts/hashrate_history/',
      workerDetails: '/v2/accounts/workers/:workerName/',
      poolStats: '/stats/json/btc/',
      earnings: '/v2/accounts/earnings/'
    }
  },
  
  // Social Media
  social: {
    twitter: 'https://twitter.com/slush_pool',
    telegram: 'https://t.me/BraiinsPool',
    medium: 'https://medium.com/braiins',
    linkedin: 'https://www.linkedin.com/company/braiins'
  },
  
  /**
   * Fetch public pool statistics (no auth required)
   * @returns Pool stats including hashrate, blocks, luck
   */
  fetchPoolStats: async (): Promise<Record<string, unknown>> => {
    try {
      const response = await fetch(`https://slushpool.com/stats/json/btc/`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching Braiins Pool stats:', error);
      return {};
    }
  },

  /**
   * Fetch account statistics
   * Requires API token authentication
   * @param apiToken API token from pool settings
   * @returns Account stats including hashrate, earnings
   */
  fetchAccountStats: async (apiToken: string): Promise<Record<string, unknown>> => {
    try {
      const response = await fetch(
        `https://slushpool.com/api/v2/accounts/stats/`,
        {
          headers: {
            'SlushPool-Token': apiToken
          }
        }
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching Braiins Pool account stats:', error);
      return {};
    }
  },

  /**
   * Fetch hashrate history
   * Requires API token authentication
   * @param apiToken API token from pool settings
   * @returns Historical hashrate data
   */
  fetchHashrateHistory: async (apiToken: string): Promise<Record<string, unknown>> => {
    try {
      const response = await fetch(
        `https://slushpool.com/api/v2/accounts/hashrate_history/`,
        {
          headers: {
            'SlushPool-Token': apiToken
          }
        }
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching Braiins Pool hashrate history:', error);
      return {};
    }
  },

  /**
   * Fetch worker details
   * Requires API token authentication
   * @param apiToken API token from pool settings
   * @param workerName Name of the worker
   * @returns Worker details and stats
   */
  fetchWorkerDetails: async (apiToken: string, workerName: string): Promise<Record<string, unknown>> => {
    try {
      const response = await fetch(
        `https://slushpool.com/api/v2/accounts/workers/${workerName}/`,
        {
          headers: {
            'SlushPool-Token': apiToken
          }
        }
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching Braiins Pool worker details:', error);
      return {};
    }
  },

  /**
   * Fetch earnings data
   * Requires API token authentication
   * @param apiToken API token from pool settings
   * @returns Earnings history
   */
  fetchEarnings: async (apiToken: string): Promise<Record<string, unknown>> => {
    try {
      const response = await fetch(
        `https://slushpool.com/api/v2/accounts/earnings/`,
        {
          headers: {
            'SlushPool-Token': apiToken
          }
        }
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching Braiins Pool earnings:', error);
      return {};
    }
  },

  // Integration Notes
  notes: {
    authentication: 'Public API for pool stats, API token required for account data',
    features: [
      'First Bitcoin mining pool (since 2010)',
      'FPPS and PPLNS payout methods',
      'Braiins OS - open-source mining firmware',
      'Transparent operations',
      'Advanced monitoring dashboard',
      'Industry pioneer and innovator'
    ],
    minimumPayout: '0.001 BTC',
    fees: '2% for FPPS',
    hashratePower: 'Historical significance, steady hashrate contribution',
    specialNotes: 'Creator of Stratum V2 mining protocol'
  }
};
