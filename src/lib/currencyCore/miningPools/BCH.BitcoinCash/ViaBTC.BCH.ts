// Mining Pool: ViaBTC
// Currency: Bitcoin Cash (BCH)
// One of the largest BCH mining pools with consistent hashrate

export interface PoolStats {
  hashRate: string;
  miners: number;
  blocks24h: number;
  estimate: string;
}

export interface MinerStats {
  address: string;
  hashrate: number;
  shares: number;
  earnings: number;
}

export const ViaBTCPool = {
  basicInfo: {
    name: "ViaBTC",
    url: "https://www.viabtc.com/",
    type: "Mining Pool",
    description: "One of the largest BCH mining pools with consistent hashrate",
    coin: "BCH",
    algorithm: "SHA-256",
    foundedYear: 2016,
  },

  api: {
    baseUrl: "https://viabtc.com/api/v1",
    endpoints: {
      poolStats: "/bch/pool_stats",
      minerAccount: "/bch/account/{walletAddress}",
      blockStats: "/bch/blocks",
      earnings: "/bch/earnings/{walletAddress}",
    },
    documentation: "https://viabtc.com/api/",
    requiresAuth: true,
    authType: "API Key",
  },

  documentation: {
    apiDocs: "https://viabtc.com/api/",
    publicApi: "https://viabtc.github.io/api_en/#public-rest-api",
    websocketApi: "https://viabtc.github.io/api_en/#websocket-api",
    helpCenter: "https://support.viabtc.com/hc/en-us",
    apiKeySetup: "https://support.viabtc.com/hc/en-us/articles/7207443487887-What-is-API-and-How-to-Set-Up",
  },

  socialMedia: {
    twitter: "https://twitter.com/ViaBTC",
    telegram: "https://t.me/viabtc_english",
    facebook: "https://www.facebook.com/ViaBTC",
    medium: "https://medium.com/@ViaBTC",
    reddit: "https://www.reddit.com/r/viabtc/",
  },

  features: {
    paymentMethod: "PPS+, PPLNS, SOLO",
    minimumPayout: "0.001 BCH",
    poolFee: "1-4% (varies by payment method)",
    hasPublicApi: true,
    hasWebsocketApi: true,
    supportsMultiCoin: true,
  },

  /**
   * Fetch pool statistics
   * @returns Pool statistics including hashrate and miner count
   */
  fetchPoolStats: async (): Promise<PoolStats | null> => {
    try {
      const response = await fetch(`https://viabtc.com/api/v1/bch/pool_stats`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return {
        hashRate: data.data.hash_rate,
        miners: data.data.miners,
        blocks24h: data.data.blocks_24h,
        estimate: data.data.estimate,
      };
    } catch (error) {
      console.error('Error fetching ViaBTC pool stats:', error);
      return null;
    }
  },

  /**
   * Fetch miner statistics by wallet address
   * @param walletAddress - BCH wallet address
   * @param apiKey - Optional API key for authenticated requests
   * @returns Miner statistics
   */
  fetchMinerStats: async (walletAddress: string, apiKey?: string): Promise<MinerStats | null> => {
    try {
      const headers: Record<string, string> = {
        'Accept': 'application/json',
      };
      if (apiKey) {
        headers['Authorization'] = `Bearer ${apiKey}`;
      }

      const response = await fetch(
        `https://viabtc.com/api/v1/bch/account/${walletAddress}`,
        { headers }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return {
        address: walletAddress,
        hashrate: data.data.hashrate || 0,
        shares: data.data.shares || 0,
        earnings: data.data.earnings || 0,
      };
    } catch (error) {
      console.error('Error fetching ViaBTC miner stats:', error);
      return null;
    }
  },

  /**
   * Fetch recent blocks found by the pool
   * @returns Array of recent blocks
   */
  fetchBlockStats: async (): Promise<Array<Record<string, unknown>>> => {
    try {
      const response = await fetch(`https://viabtc.com/api/v1/bch/blocks`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.data || [];
    } catch (error) {
      console.error('Error fetching ViaBTC block stats:', error);
      return [];
    }
  },

  /**
   * TypeScript integration example
   */
  integrationExample: `
import { ViaBTCPool } from '@/lib/currencyCore/miningPools/BCH.BitcoinCash/ViaBTC';

// Fetch pool statistics
const poolStats = await ViaBTCPool.fetchPoolStats();
console.log('Pool Hash Rate:', poolStats?.hashRate);
console.log('Active Miners:', poolStats?.miners);

// Fetch miner statistics (requires API key for detailed info)
const minerStats = await ViaBTCPool.fetchMinerStats('your_bch_address', 'your_api_key');
console.log('Your Hashrate:', minerStats?.hashrate);
console.log('Your Earnings:', minerStats?.earnings);

// Fetch recent blocks
const blocks = await ViaBTCPool.fetchBlockStats();
console.log('Recent Blocks:', blocks.slice(0, 5));
  `,
};
