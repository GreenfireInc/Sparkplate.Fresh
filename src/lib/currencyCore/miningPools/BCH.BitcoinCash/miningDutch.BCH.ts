// Mining Pool: Mining-Dutch
// Currency: Bitcoin Cash (BCH)
// European mining pool with BCH support

export interface MiningDutchStats {
  poolHashrate: number;
  miners: number;
  workers: number;
  blocks24h: number;
}

export const MiningDutch = {
  basicInfo: {
    name: "Mining-Dutch",
    url: "https://www.mining-dutch.nl/",
    bchUrl: "https://www.mining-dutch.nl/pools/bitcoincash.php",
    type: "Mining Pool",
    description: "European mining pool with BCH support, known for multi-algorithm support",
    coin: "BCH",
    algorithm: "SHA-256",
    location: "Netherlands, Europe",
    foundedYear: 2016,
  },

  api: {
    baseUrl: "https://www.mining-dutch.nl/api",
    endpoints: {
      poolStats: "/status",
      userStats: "/walletEx?address={address}",
      blocks: "/blocks",
      currencies: "/currencies",
      poolInfo: "/public",
    },
    documentation: "https://www.mining-dutch.nl/api",
    requiresAuth: false, // Public API available
    authType: "None for public endpoints",
  },

  documentation: {
    website: "https://www.mining-dutch.nl/",
    gettingStarted: "https://www.mining-dutch.nl/index.php?page=gettingstarted",
    poolPage: "https://www.mining-dutch.nl/pools/bitcoincash.php",
    apiEndpoint: "https://www.mining-dutch.nl/api",
    faq: "https://www.mining-dutch.nl/index.php?page=faq",
  },

  socialMedia: {
    twitter: "https://twitter.com/MiningDutch",
    discord: "https://discord.gg/miningdutch",
    telegram: "https://t.me/miningdutch",
  },

  features: {
    paymentMethod: "PROP (Proportional)",
    minimumPayout: "Varies by coin (typically 0.01 BCH)",
    poolFee: "0.9-1%",
    hasPublicApi: true,
    hasMultiAlgo: true,
    supportsMultiCoin: true,
    supportedAlgorithms: ["SHA-256", "Scrypt", "X11", "Equihash", "and more"],
  },

  /**
   * Fetch pool status and statistics
   * @returns Pool statistics including hashrate and miners
   */
  fetchPoolStats: async (): Promise<MiningDutchStats | null> => {
    try {
      const response = await fetch(`https://www.mining-dutch.nl/api/status`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      
      // Find BCH pool data
      const bchPool = data.bitcoincash || data.BCH;
      
      if (!bchPool) {
        throw new Error('BCH pool data not found');
      }

      return {
        poolHashrate: bchPool.hashrate || 0,
        miners: bchPool.miners || 0,
        workers: bchPool.workers || 0,
        blocks24h: bchPool.blocks_24h || 0,
      };
    } catch (error) {
      console.error('Error fetching Mining-Dutch pool stats:', error);
      return null;
    }
  },

  /**
   * Fetch user/wallet statistics
   * @param address - BCH wallet address
   * @returns User mining statistics
   */
  fetchUserStats: async (address: string): Promise<any> => {
    try {
      const response = await fetch(
        `https://www.mining-dutch.nl/api/walletEx?address=${address}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching Mining-Dutch user stats:', error);
      return null;
    }
  },

  /**
   * Fetch recent blocks found by the pool
   * @returns Array of recent blocks
   */
  fetchRecentBlocks: async (): Promise<any[]> => {
    try {
      const response = await fetch(`https://www.mining-dutch.nl/api/blocks`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      
      // Filter for BCH blocks
      const bchBlocks = Object.values(data).filter((block: any) => 
        block.coin === 'BCH' || block.coin === 'bitcoincash'
      );
      
      return bchBlocks;
    } catch (error) {
      console.error('Error fetching Mining-Dutch recent blocks:', error);
      return [];
    }
  },

  /**
   * Fetch supported currencies information
   * @returns Currency information including BCH
   */
  fetchCurrencies: async (): Promise<any> => {
    try {
      const response = await fetch(`https://www.mining-dutch.nl/api/currencies`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching Mining-Dutch currencies:', error);
      return null;
    }
  },

  /**
   * Fetch public pool information
   * @returns Public pool information and statistics
   */
  fetchPublicInfo: async (): Promise<any> => {
    try {
      const response = await fetch(`https://www.mining-dutch.nl/api/public`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching Mining-Dutch public info:', error);
      return null;
    }
  },

  /**
   * TypeScript integration example
   */
  integrationExample: `
import { MiningDutch } from '@/lib/currencyCore/miningPools/BCH.BitcoinCash/MiningDutch';

// Fetch pool statistics (public endpoint)
const poolStats = await MiningDutch.fetchPoolStats();
console.log('Pool Hashrate:', poolStats?.poolHashrate);
console.log('Active Miners:', poolStats?.miners);
console.log('Active Workers:', poolStats?.workers);
console.log('Blocks Found (24h):', poolStats?.blocks24h);

// Fetch user/wallet statistics (replace with your BCH address)
const walletAddress = 'your_bch_wallet_address';
const userStats = await MiningDutch.fetchUserStats(walletAddress);
console.log('User Stats:', userStats);

if (userStats) {
  console.log('Balance:', userStats.balance);
  console.log('Unpaid:', userStats.unpaid);
  console.log('Paid:', userStats.paid);
}

// Fetch recent BCH blocks
const recentBlocks = await MiningDutch.fetchRecentBlocks();
console.log('Recent BCH Blocks:', recentBlocks.length);
recentBlocks.slice(0, 5).forEach(block => {
  console.log(\`Block #\${block.height}: \${block.hash?.substring(0, 16)}...\`);
  console.log(\`  Finder: \${block.finder}\`);
  console.log(\`  Amount: \${block.amount}\`);
});

// Fetch all supported currencies
const currencies = await MiningDutch.fetchCurrencies();
console.log('Supported Currencies:', Object.keys(currencies).length);

// Fetch public pool information
const publicInfo = await MiningDutch.fetchPublicInfo();
console.log('Pool Name:', publicInfo?.name);
console.log('Pool Version:', publicInfo?.version);
  `,
};
