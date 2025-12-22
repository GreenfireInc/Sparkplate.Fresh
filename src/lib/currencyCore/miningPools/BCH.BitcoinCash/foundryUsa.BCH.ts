// Mining Pool: Foundry USA
// Currency: Bitcoin Cash (BCH)
// Largest North American mining pool

export interface FoundryPoolStats {
  groupHashrate: number;
  miners: number;
  revenue: number;
  blocks: number;
}

export const FoundryUSA = {
  basicInfo: {
    name: "Foundry USA",
    url: "https://foundrydigital.com/",
    poolUrl: "https://foundryusapool.com/",
    type: "Mining Pool",
    description: "Largest North American mining pool supporting BTC and BCH, institutional-grade mining services",
    coin: "BCH",
    algorithm: "SHA-256",
    operator: "Foundry Digital LLC",
    foundedYear: 2019,
    location: "United States",
  },

  api: {
    baseUrl: "https://api.foundryusapool.com",
    endpoints: {
      groupStats: "/account/group",
      minerStats: "/account/miner",
      poolStats: "/pool/stats",
      revenue: "/account/revenue",
      blocks: "/pool/blocks",
    },
    documentation: "https://api.foundryusapool.com/docs",
    knowledgeBase: "https://foundryusapool.com/knowledge-base",
    requiresAuth: true,
    authType: "API Key (Bearer Token)",
  },

  documentation: {
    apiDocs: "https://api.foundryusapool.com/docs",
    knowledgeBase: "https://foundryusapool.com/knowledge-base",
    website: "https://foundrydigital.com/",
    poolDashboard: "https://foundryusapool.com/",
    supportEmail: "support@foundrydigital.com",
  },

  socialMedia: {
    twitter: "https://twitter.com/FoundryServices",
    linkedin: "https://www.linkedin.com/company/foundry-digital-llc/",
  },

  features: {
    paymentMethod: "FPPS (Full Pay Per Share)",
    minimumPayout: "Custom (Enterprise)",
    poolFee: "Custom pricing for enterprise clients",
    hasPublicApi: false,
    hasEnterpriseApi: true,
    institutionalGrade: true,
    supportsMultiCoin: true,
    supportedCoins: ["BTC", "BCH"],
    features: ["Custom payouts", "Advanced analytics", "Dedicated support"],
  },

  /**
   * Fetch group statistics
   * @param apiKey - Foundry USA API key
   * @returns Group statistics including hashrate and miners
   */
  fetchGroupStats: async (apiKey: string): Promise<FoundryPoolStats | null> => {
    try {
      const response = await fetch(`https://api.foundryusapool.com/account/group`, {
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
        groupHashrate: data.data?.group_hashrate || 0,
        miners: data.data?.total_miners || 0,
        revenue: data.data?.revenue || 0,
        blocks: data.data?.blocks || 0,
      };
    } catch (error) {
      console.error('Error fetching Foundry USA group stats:', error);
      return null;
    }
  },

  /**
   * Fetch miner statistics
   * @param apiKey - Foundry USA API key
   * @param minerAddress - Miner address or identifier
   * @returns Miner statistics
   */
  fetchMinerStats: async (apiKey: string, minerAddress: string): Promise<any> => {
    try {
      const response = await fetch(
        `https://api.foundryusapool.com/account/miner?address=${minerAddress}`,
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
      return data.data;
    } catch (error) {
      console.error('Error fetching Foundry USA miner stats:', error);
      return null;
    }
  },

  /**
   * Fetch revenue data
   * @param apiKey - Foundry USA API key
   * @param startDate - Start date for revenue query
   * @param endDate - End date for revenue query
   * @returns Revenue data
   */
  fetchRevenue: async (apiKey: string, startDate?: string, endDate?: string): Promise<any[]> => {
    try {
      let url = `https://api.foundryusapool.com/account/revenue`;
      const params = new URLSearchParams();
      
      if (startDate) params.append('start', startDate);
      if (endDate) params.append('end', endDate);
      
      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const response = await fetch(url, {
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
      console.error('Error fetching Foundry USA revenue:', error);
      return [];
    }
  },

  /**
   * Fetch pool statistics
   * @param apiKey - Foundry USA API key
   * @returns Pool-wide statistics
   */
  fetchPoolStats: async (apiKey: string): Promise<any> => {
    try {
      const response = await fetch(`https://api.foundryusapool.com/pool/stats`, {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error fetching Foundry USA pool stats:', error);
      return null;
    }
  },

  /**
   * TypeScript integration example
   */
  integrationExample: `
import { FoundryUSA } from '@/components/currencyCore/miningPools/BCH.BitcoinCash/FoundryUSA';

// Setup API credentials (enterprise-level)
const apiKey = 'your_foundry_usa_api_key';

// Fetch group statistics
const groupStats = await FoundryUSA.fetchGroupStats(apiKey);
console.log('Group Statistics:');
console.log('  Total Hashrate:', groupStats?.groupHashrate);
console.log('  Total Miners:', groupStats?.miners);
console.log('  Total Revenue:', groupStats?.revenue);
console.log('  Blocks Found:', groupStats?.blocks);

// Fetch specific miner statistics
const minerAddress = 'your_miner_address';
const minerStats = await FoundryUSA.fetchMinerStats(apiKey, minerAddress);
console.log('Miner Statistics:', minerStats);

// Fetch revenue for the last 30 days
const endDate = new Date().toISOString().split('T')[0];
const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
  .toISOString()
  .split('T')[0];

const revenue = await FoundryUSA.fetchRevenue(apiKey, startDate, endDate);
console.log('Revenue (Last 30 Days):');
revenue.forEach(entry => {
  console.log(\`  \${entry.date}: \${entry.amount} BCH\`);
});

// Fetch pool statistics
const poolStats = await FoundryUSA.fetchPoolStats(apiKey);
console.log('Pool Statistics:', poolStats);
console.log('  Pool Hashrate:', poolStats?.poolHashrate);
console.log('  Total Blocks:', poolStats?.totalBlocks);
  `,
};
