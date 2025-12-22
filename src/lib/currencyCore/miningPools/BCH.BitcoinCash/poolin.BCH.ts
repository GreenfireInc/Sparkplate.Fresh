// Mining Pool: Poolin
// Currency: Bitcoin Cash (BCH)
// Multi-currency mining pool including Bitcoin Cash

export interface PoolinStats {
  hashrate: string;
  workers: number;
  earnings: number;
  unpaid: number;
}

export const Poolin = {
  basicInfo: {
    name: "Poolin",
    url: "https://www.poolin.com/",
    bchUrl: "https://www.poolin.com/coin/bch",
    type: "Mining Pool",
    description: "Multi-currency mining pool including Bitcoin Cash with comprehensive mining services",
    coin: "BCH",
    algorithm: "SHA-256",
    foundedYear: 2017,
    location: "Global",
  },

  api: {
    baseUrl: "https://api.poolin.com",
    endpoints: {
      minerStats: "/api/miner/{address}",
      earnings: "/api/earnings/{address}",
      workers: "/api/workers/{address}",
      poolStats: "/api/pool/stats",
      hashrate: "/api/hashrate/{address}",
    },
    documentation: "https://help.poolin.me/hc/en-us/categories/360002093492-Poolin-Function-About-Mining",
    requiresAuth: true, // Most endpoints require authentication
    authType: "API Key",
  },

  documentation: {
    helpCenter: "https://help.poolin.me/hc/en-us",
    bchMiningGuide: "https://help.poolin.me/hc/en-us/articles/360032605051-BCH-Mining-Guide-with-Whatsminer-M3",
    apiDocs: "https://poolin.com/en/help/api",
    poolingFunction: "https://help.poolin.me/hc/en-us/categories/360002093492-Poolin-Function-About-Mining",
    minerSetup: "https://help.poolin.me/hc/en-us/sections/360003903431-Miner-Setup",
  },

  socialMedia: {
    twitter: "https://twitter.com/officialpoolin",
    telegram: "https://t.me/Poolin_official",
    facebook: "https://www.facebook.com/Poolin.official",
    medium: "https://medium.com/@Poolin",
    weibo: "https://weibo.com/poolin",
  },

  features: {
    paymentMethod: "PPS+, FPPS",
    minimumPayout: "0.01 BCH",
    poolFee: "2.5%",
    hasPublicApi: false,
    hasAccountApi: true,
    supportsMultiCoin: true,
    supportedCoins: ["BTC", "BCH", "BSV", "LTC", "ETH", "ZEC", "DASH", "DCR"],
    features: ["Merged Mining", "Smart Pool", "Hashrate Marketplace"],
  },

  /**
   * Fetch miner statistics
   * @param address - Miner address or username
   * @param apiKey - Poolin API key
   * @returns Miner statistics
   */
  fetchMinerStats: async (address: string, apiKey: string): Promise<PoolinStats | null> => {
    try {
      const response = await fetch(`https://api.poolin.com/api/miner/${address}`, {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return {
        hashrate: data.data?.hashrate || '0',
        workers: data.data?.workers || 0,
        earnings: data.data?.earnings || 0,
        unpaid: data.data?.unpaid || 0,
      };
    } catch (error) {
      console.error('Error fetching Poolin miner stats:', error);
      return null;
    }
  },

  /**
   * Fetch earnings history
   * @param address - Miner address or username
   * @param apiKey - Poolin API key
   * @returns Earnings history
   */
  fetchEarnings: async (address: string, apiKey: string): Promise<any[]> => {
    try {
      const response = await fetch(`https://api.poolin.com/api/earnings/${address}`, {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.data || [];
    } catch (error) {
      console.error('Error fetching Poolin earnings:', error);
      return [];
    }
  },

  /**
   * Fetch worker statistics
   * @param address - Miner address or username
   * @param apiKey - Poolin API key
   * @returns Array of worker statistics
   */
  fetchWorkers: async (address: string, apiKey: string): Promise<any[]> => {
    try {
      const response = await fetch(`https://api.poolin.com/api/workers/${address}`, {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.data || [];
    } catch (error) {
      console.error('Error fetching Poolin workers:', error);
      return [];
    }
  },

  /**
   * Fetch hashrate history
   * @param address - Miner address or username
   * @param apiKey - Poolin API key
   * @param period - Time period (e.g., '24h', '7d', '30d')
   * @returns Hashrate history data
   */
  fetchHashrateHistory: async (address: string, apiKey: string, period: string = '24h'): Promise<any[]> => {
    try {
      const response = await fetch(
        `https://api.poolin.com/api/hashrate/${address}?period=${period}`,
        {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Accept': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.data || [];
    } catch (error) {
      console.error('Error fetching Poolin hashrate history:', error);
      return [];
    }
  },

  /**
   * TypeScript integration example
   */
  integrationExample: `
import { Poolin } from '@/components/currencyCore/miningPools/BCH.BitcoinCash/Poolin';

// Setup API credentials
const apiKey = 'your_poolin_api_key';
const minerAddress = 'your_miner_address_or_username';

// Fetch miner statistics
const minerStats = await Poolin.fetchMinerStats(minerAddress, apiKey);
console.log('Miner Hashrate:', minerStats?.hashrate);
console.log('Active Workers:', minerStats?.workers);
console.log('Total Earnings:', minerStats?.earnings);
console.log('Unpaid Balance:', minerStats?.unpaid);

// Fetch earnings history
const earnings = await Poolin.fetchEarnings(minerAddress, apiKey);
console.log('Earnings History:');
earnings.forEach(earning => {
  console.log(\`Date: \${earning.date}, Amount: \${earning.amount} BCH\`);
});

// Fetch worker status
const workers = await Poolin.fetchWorkers(minerAddress, apiKey);
console.log('Worker Details:');
workers.forEach(worker => {
  console.log(\`Worker: \${worker.name}\`);
  console.log(\`  Hashrate: \${worker.hashrate}\`);
  console.log(\`  Status: \${worker.status}\`);
  console.log(\`  Last Active: \${worker.lastActive}\`);
});

// Fetch 24-hour hashrate history
const hashrateHistory = await Poolin.fetchHashrateHistory(minerAddress, apiKey, '24h');
console.log('24-Hour Hashrate History:', hashrateHistory);
  `,
};
