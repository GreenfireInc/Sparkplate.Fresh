// Mining Pool: F2Pool
// Currency: Bitcoin Cash (BCH)
// Long-established mining pool with BCH support

export interface F2PoolStats {
  hashRate: string;
  workers: number;
  blocks: number;
  income: string;
}

export interface F2PoolCoinStats {
  coin: string;
  hashrate: number;
  difficulty: number;
  blockReward: number;
  profitability: number;
}

export const F2Pool = {
  basicInfo: {
    name: "F2Pool",
    url: "https://www.f2pool.com/",
    type: "Mining Pool",
    description: "Long-established mining pool with BCH support, one of the oldest multi-coin pools",
    coin: "BCH",
    algorithm: "SHA-256",
    foundedYear: 2013,
    location: "Global",
  },

  api: {
    baseUrl: "https://api.f2pool.com",
    endpoints: {
      coinStats: "/bitcoin-cash",
      userStats: "/{coin}/{username}",
      earnings: "/{coin}/{username}/earnings",
      workers: "/{coin}/{username}/workers",
      hashrate: "/{coin}/{username}/hashrate",
    },
    documentation: "https://www.f2pool.com/api_doc?lang=en_US",
    requiresAuth: false, // Public endpoints available
    hasAccountApi: true,
  },

  documentation: {
    apiDocs: "https://www.f2pool.com/api_doc?lang=en_US",
    helpCenter: "https://f2pool.zendesk.com/hc/en-us",
    bchMiningGuide: "https://f2pool.zendesk.com/hc/en-us/articles/360020479391-Bitcoin-Cash-BCH-mining-guide",
    minerConfiguration: "https://f2pool.zendesk.com/hc/en-us/sections/360001707072-Miner-Configuration",
  },

  socialMedia: {
    twitter: "https://twitter.com/f2pool_official",
    telegram: "https://t.me/f2pool_official",
    facebook: "https://www.facebook.com/f2pool",
    youtube: "https://www.youtube.com/c/F2Pool",
    discord: "https://discord.gg/f2pool",
  },

  features: {
    paymentMethod: "PPS+, FPPS",
    minimumPayout: "0.005 BCH",
    poolFee: "2.5%",
    hasPublicApi: true,
    hasAccountApi: true,
    supportsMultiCoin: true,
    supportedCoins: ["BTC", "BCH", "LTC", "ETH", "ZEC", "DASH", "XMR", "ETC"],
  },

  /**
   * Fetch BCH coin statistics from F2Pool
   * @returns BCH network and pool statistics
   */
  fetchCoinStats: async (): Promise<F2PoolCoinStats | null> => {
    try {
      const response = await fetch(`https://api.f2pool.com/bitcoin-cash`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return {
        coin: 'BCH',
        hashrate: data.data?.hash_rate || 0,
        difficulty: data.data?.difficulty || 0,
        blockReward: data.data?.block_reward || 0,
        profitability: data.data?.profitability || 0,
      };
    } catch (error) {
      console.error('Error fetching F2Pool BCH coin stats:', error);
      return null;
    }
  },

  /**
   * Fetch user statistics by username
   * @param username - F2Pool username
   * @param coin - Coin symbol (default: bch)
   * @returns User mining statistics
   */
  fetchUserStats: async (username: string, coin: string = 'bch'): Promise<F2PoolStats | null> => {
    try {
      const response = await fetch(`https://api.f2pool.com/${coin}/${username}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return {
        hashRate: data.data?.hash_rate || '0',
        workers: data.data?.workers || 0,
        blocks: data.data?.blocks || 0,
        income: data.data?.income || '0',
      };
    } catch (error) {
      console.error('Error fetching F2Pool user stats:', error);
      return null;
    }
  },

  /**
   * Fetch user earnings
   * @param username - F2Pool username
   * @param coin - Coin symbol (default: bch)
   * @returns Earnings data
   */
  fetchUserEarnings: async (username: string, coin: string = 'bch'): Promise<any> => {
    try {
      const response = await fetch(`https://api.f2pool.com/${coin}/${username}/earnings`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error fetching F2Pool user earnings:', error);
      return null;
    }
  },

  /**
   * Fetch user workers status
   * @param username - F2Pool username
   * @param coin - Coin symbol (default: bch)
   * @returns Workers status
   */
  fetchUserWorkers: async (username: string, coin: string = 'bch'): Promise<any[]> => {
    try {
      const response = await fetch(`https://api.f2pool.com/${coin}/${username}/workers`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.data || [];
    } catch (error) {
      console.error('Error fetching F2Pool user workers:', error);
      return [];
    }
  },

  /**
   * TypeScript integration example
   */
  integrationExample: `
import { F2Pool } from '@/lib/cores/currencyCore/miningPools/BCH.BitcoinCash/F2Pool';

// Fetch BCH coin statistics (public endpoint)
const coinStats = await F2Pool.fetchCoinStats();
console.log('BCH Network Hashrate:', coinStats?.hashrate);
console.log('BCH Difficulty:', coinStats?.difficulty);
console.log('BCH Block Reward:', coinStats?.blockReward);

// Fetch user statistics (replace with your F2Pool username)
const username = 'your_f2pool_username';
const userStats = await F2Pool.fetchUserStats(username, 'bch');
console.log('Your Hash Rate:', userStats?.hashRate);
console.log('Your Workers:', userStats?.workers);
console.log('Your Income:', userStats?.income);

// Fetch user earnings history
const earnings = await F2Pool.fetchUserEarnings(username, 'bch');
console.log('Earnings History:', earnings);

// Fetch worker status
const workers = await F2Pool.fetchUserWorkers(username, 'bch');
console.log('Active Workers:', workers);
workers.forEach(worker => {
  console.log(\`Worker \${worker.name}: \${worker.hashrate} H/s\`);
});
  `,
};
