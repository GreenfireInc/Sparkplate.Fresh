// Mining Pool: BTC.com
// Currency: Bitcoin Cash (BCH)
// Large mining pool with BCH mining services

export interface BTCcomPoolStats {
  poolHashrate: number;
  miners: number;
  shares: number;
  earnings: number;
}

export interface BTCcomBlockInfo {
  height: number;
  hash: string;
  timestamp: number;
  reward: number;
  difficulty: number;
}

export const BTCcom = {
  basicInfo: {
    name: "BTC.com",
    url: "https://pool.btc.com/",
    bchUrl: "https://bch.btc.com/",
    type: "Mining Pool",
    description: "Large mining pool with BCH mining services and detailed statistics",
    coin: "BCH",
    algorithm: "SHA-256",
    operator: "BTC.com",
    foundedYear: 2016,
  },

  api: {
    baseUrl: "https://bch.btc.com/api",
    statsUrl: "https://bch.btc.com/stats/api",
    endpoints: {
      poolStats: "/pool/stats",
      blocks: "/blocks",
      addressStats: "/address/{address}",
      minerStats: "/miner/{address}",
      earnings: "/earnings/{address}",
      workers: "/workers/{address}",
    },
    documentation: "https://bch.btc.com/stats/api",
    requiresAuth: false, // Public API available
    hasAccountApi: true,
  },

  documentation: {
    statsApi: "https://bch.btc.com/stats/api",
    poolDashboard: "https://bch.btc.com/",
    helpCenter: "https://help.pool.btc.com/",
    miningGuide: "https://help.pool.btc.com/hc/en-us/articles/360001751071",
    github: "https://github.com/btccom",
    btcpoolRepo: "https://github.com/btccom/bccpool",
  },

  socialMedia: {
    twitter: "https://twitter.com/btccom_official",
    telegram: "https://t.me/btccom",
    facebook: "https://www.facebook.com/btc.com.pool",
    medium: "https://medium.com/@btccom",
    weibo: "https://weibo.com/btccom",
  },

  features: {
    paymentMethod: "FPPS, PPS, PPLNS",
    minimumPayout: "0.001 BCH",
    poolFee: "1.5-4% (varies by payment method)",
    hasPublicApi: true,
    hasStatsApi: true,
    hasHistoricalData: true,
    supportsMultiCoin: true,
    supportedCoins: ["BTC", "BCH", "ETH", "LTC"],
  },

  /**
   * Fetch pool statistics
   * @returns Pool-wide statistics
   */
  fetchPoolStats: async (): Promise<BTCcomPoolStats | null> => {
    try {
      const response = await fetch(`https://bch.btc.com/api/pool/stats`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return {
        poolHashrate: data.data?.pool_hashrate || 0,
        miners: data.data?.miners || 0,
        shares: data.data?.shares || 0,
        earnings: data.data?.earnings || 0,
      };
    } catch (error) {
      console.error('Error fetching BTC.com pool stats:', error);
      return null;
    }
  },

  /**
   * Fetch recent blocks found by the pool
   * @param limit - Number of blocks to fetch (default: 50)
   * @returns Array of recent blocks
   */
  fetchRecentBlocks: async (limit: number = 50): Promise<BTCcomBlockInfo[]> => {
    try {
      const response = await fetch(`https://bch.btc.com/api/blocks?limit=${limit}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return (data.data || []).map((block: any) => ({
        height: block.height || 0,
        hash: block.hash || '',
        timestamp: block.timestamp || 0,
        reward: block.reward || 0,
        difficulty: block.difficulty || 0,
      }));
    } catch (error) {
      console.error('Error fetching BTC.com recent blocks:', error);
      return [];
    }
  },

  /**
   * Fetch address statistics
   * @param address - BCH wallet address
   * @returns Address statistics
   */
  fetchAddressStats: async (address: string): Promise<any> => {
    try {
      const response = await fetch(`https://bch.btc.com/api/address/${address}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error fetching BTC.com address stats:', error);
      return null;
    }
  },

  /**
   * Fetch miner statistics
   * @param address - BCH miner address
   * @returns Miner statistics including hashrate and earnings
   */
  fetchMinerStats: async (address: string): Promise<any> => {
    try {
      const response = await fetch(`https://bch.btc.com/api/miner/${address}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error fetching BTC.com miner stats:', error);
      return null;
    }
  },

  /**
   * Fetch worker statistics
   * @param address - BCH miner address
   * @returns Array of worker statistics
   */
  fetchWorkers: async (address: string): Promise<any[]> => {
    try {
      const response = await fetch(`https://bch.btc.com/api/workers/${address}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.data || [];
    } catch (error) {
      console.error('Error fetching BTC.com workers:', error);
      return [];
    }
  },

  /**
   * TypeScript integration example
   */
  integrationExample: `
import { BTCcom } from '@/lib/currencyCore/miningPools/BCH.BitcoinCash/BTCcom';

// Fetch pool statistics (public endpoint)
const poolStats = await BTCcom.fetchPoolStats();
console.log('Pool Hashrate:', poolStats?.poolHashrate);
console.log('Active Miners:', poolStats?.miners);

// Fetch recent blocks
const recentBlocks = await BTCcom.fetchRecentBlocks(10);
console.log('Recent 10 Blocks:');
recentBlocks.forEach(block => {
  console.log(\`Block #\${block.height}: \${block.hash.substring(0, 16)}...\`);
  console.log(\`  Reward: \${block.reward} BCH\`);
  console.log(\`  Timestamp: \${new Date(block.timestamp * 1000).toISOString()}\`);
});

// Fetch miner statistics (replace with your miner address)
const minerAddress = 'your_bch_miner_address';
const minerStats = await BTCcom.fetchMinerStats(minerAddress);
console.log('Miner Hashrate:', minerStats?.hashrate);
console.log('Miner Earnings:', minerStats?.earnings);

// Fetch worker status
const workers = await BTCcom.fetchWorkers(minerAddress);
console.log('Active Workers:', workers.length);
workers.forEach(worker => {
  console.log(\`Worker \${worker.name}: \${worker.hashrate} H/s, Status: \${worker.status}\`);
});
  `,
};
