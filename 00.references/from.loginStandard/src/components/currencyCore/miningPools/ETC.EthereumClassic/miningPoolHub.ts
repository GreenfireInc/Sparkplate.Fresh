// MiningPoolHub - Ethereum Classic Mining Pool
// Multi-algorithm pool with auto-switching
// Supports multiple payout options

export const MiningPoolHubEtc = {
  name: 'MiningPoolHub',
  ticker: 'ETC',
  
  // Pool Information
  description: 'MiningPoolHub is a multi-algorithm mining pool supporting Ethereum Classic with auto-switching capabilities and multiple payout options.',
  type: 'PPLNS',
  location: 'Global',
  
  // Official Links
  website: 'https://miningpoolhub.com/',
  etcPool: 'https://ethereumclassic.miningpoolhub.com/',
  apiDocs: 'https://miningpoolhub.com/index.php?page=api',
  
  // Social Media
  social: {
    twitter: 'https://twitter.com/MiningPoolHub',
  },
  
  // API Endpoints
  api: {
    baseUrl: 'https://ethereumclassic.miningpoolhub.com/index.php?page=api',
    endpoints: {
      poolStatus: '&action=getpoolstatus',
      userStatus: '&action=getuserallbalances&api_key=:apiKey',
      workerStatus: '&action=getuserworkers&api_key=:apiKey',
      poolHashrate: '&action=getpoolhashrate',
    },
    authMethod: 'API key required',
    rateLimit: 'Standard rate limits apply',
  },
  
  // Pool Features
  features: {
    minPayout: '0.01 ETC',
    fee: '0.9%',
    payoutFrequency: 'Manual or automatic (configurable)',
    servers: ['US', 'EU', 'ASIA'],
  },
  
  // Mining Configuration
  stratum: {
    host: 'us-east.ethereumclassic.miningpoolhub.com',
    port: 20555,
  },
  
  // TypeScript Integration Functions
  
  /**
   * Fetch pool status
   * @returns Pool status information
   */
  fetchPoolStatus: async (): Promise<Record<string, unknown>> => {
    try {
      const response = await fetch('https://ethereumclassic.miningpoolhub.com/index.php?page=api&action=getpoolstatus');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching MiningPoolHub pool status:', error);
      return {};
    }
  },
  
  /**
   * Fetch user balances (requires API key)
   * @param apiKey - MiningPoolHub API key
   * @returns User balances across all coins
   */
  fetchUserBalances: async (apiKey: string): Promise<Record<string, unknown>> => {
    try {
      const response = await fetch(`https://ethereumclassic.miningpoolhub.com/index.php?page=api&action=getuserallbalances&api_key=${apiKey}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching MiningPoolHub user balances:', error);
      return {};
    }
  },
  
  /**
   * Fetch worker status (requires API key)
   * @param apiKey - MiningPoolHub API key
   * @returns Worker status
   */
  fetchWorkerStatus: async (apiKey: string): Promise<Record<string, unknown>> => {
    try {
      const response = await fetch(`https://ethereumclassic.miningpoolhub.com/index.php?page=api&action=getuserworkers&api_key=${apiKey}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching MiningPoolHub worker status:', error);
      return {};
    }
  },
  
  /**
   * Fetch pool hashrate
   * @returns Pool hashrate
   */
  fetchPoolHashrate: async (): Promise<Record<string, unknown>> => {
    try {
      const response = await fetch('https://ethereumclassic.miningpoolhub.com/index.php?page=api&action=getpoolhashrate');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching MiningPoolHub pool hashrate:', error);
      return {};
    }
  },
};

