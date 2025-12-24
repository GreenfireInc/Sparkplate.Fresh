// Prism Protocol Liquid Staking Pool for Terra (LUNA)
// Refracted liquid staking splitting yield and principal (pLUNA/yLUNA)

export const PrismProtocolStaking = {
  name: "Prism Protocol",
  type: "Liquid Staking",
  website: "https://prismprotocol.app/",
  description: "Refracted liquid staking splitting yield and principal (pLUNA/yLUNA)",
  minimumStake: "1 LUNA",
  apy: "Variable (based on network rewards)",
  lockPeriod: "Instant liquidity with pLUNA/yLUNA",
  rewardsFrequency: "Continuous",
  fees: "No fees",
  
  // API Information
  api: {
    baseUrl: "https://api.prismprotocol.app",
    documentation: "https://docs.prismprotocol.app/",
    endpoints: {
      staking: "/api/staking",
      stats: "/api/stats",
      rewards: "/api/rewards",
      exchangeRate: "/api/exchange-rate",
    },
  },

  // SDK Information
  sdk: {
    npm: "@prism-protocol/sdk",
    github: "https://github.com/prism-protocol/sdk",
    documentation: "https://docs.prismprotocol.app/",
  },

  // Social Media
  social: {
    twitter: "https://twitter.com/prismprotocol",
    discord: "https://discord.gg/prismprotocol",
    telegram: "https://t.me/prismprotocol",
    reddit: "https://reddit.com/r/prismprotocol",
  },

  // Features
  features: [
    "Refracted liquid staking",
    "Split yield and principal",
    "pLUNA for principal",
    "yLUNA for yield",
    "DeFi integration",
    "Governance participation",
  ],

  // Liquid Staking Tokens
  liquidTokens: [
    {
      name: "pLUNA",
      symbol: "pLUNA",
      description: "Principal LUNA token representing staked principal",
      exchangeRate: "1:1 with LUNA",
    },
    {
      name: "yLUNA",
      symbol: "yLUNA",
      description: "Yield LUNA token representing staking rewards",
      exchangeRate: "Variable (increases over time)",
    },
  ],

  // Contract Addresses
  contracts: {
    pLUNA: "0x...", // Replace with actual contract address
    yLUNA: "0x...", // Replace with actual contract address
    stakingContract: "0x...", // Replace with actual contract address
  },

  // Staking Requirements
  requirements: {
    kyc: false,
    accountVerification: false,
    minimumAge: 18,
    supportedRegions: "Global",
  },

  // Risk Factors
  risks: [
    "Smart contract risk",
    "Liquidity risk",
    "Slashing risk",
    "Technology risk",
  ],

  // Integration Examples
  examples: {
    stakeLUNA: `
// Stake LUNA and receive pLUNA/yLUNA
import { PrismSDK } from '@prism-protocol/sdk';

const prism = new PrismSDK({
  network: 'mainnet',
  rpcUrl: 'https://phoenix-lcd.terra.dev'
});

const stakeAmount = '1.0'; // 1 LUNA
const tx = await prism.stakeLUNA(stakeAmount);
await tx.wait();

console.log('Staking successful, pLUNA/yLUNA tokens received');
    `,
    
    getExchangeRate: `
// Get yLUNA exchange rate
const exchangeRate = await prism.getYLUNAExchangeRate();
console.log('yLUNA per LUNA:', exchangeRate);
    `,
    
    getAPR: `
// Get current APR
const response = await fetch('https://api.prismprotocol.app/api/stats');
const data = await response.json();
console.log('Current APR:', data.apr);
    `,
    
    getStats: `
// Get Prism statistics
const response = await fetch('https://api.prismprotocol.app/api/stats');
const stats = await response.json();
console.log('Total staked LUNA:', stats.totalStaked);
console.log('Total pLUNA supply:', stats.pLUNASupply);
console.log('Total yLUNA supply:', stats.yLUNASupply);
    `,
  },
};

// Helper function to get current APR
export async function getPrismAPR() {
  try {
    const response = await fetch('https://api.prismprotocol.app/api/stats');
    if (response.ok) {
      const data = await response.json();
      return data.apr;
    }
  } catch (error) {
    console.error('Error fetching Prism APR:', error);
  }
  return 0;
}

// Helper function to get yLUNA exchange rate
export async function getYLUNAExchangeRate() {
  try {
    const response = await fetch('https://api.prismprotocol.app/api/exchange-rate');
    if (response.ok) {
      const data = await response.json();
      return data.exchangeRate;
    }
  } catch (error) {
    console.error('Error fetching yLUNA exchange rate:', error);
  }
  return 0;
}

// Helper function to get Prism statistics
export async function getPrismStats() {
  try {
    const response = await fetch('https://api.prismprotocol.app/api/stats');
    if (response.ok) {
      const data = await response.json();
      return {
        totalStaked: data.totalStaked,
        pLUNASupply: data.pLUNASupply,
        yLUNASupply: data.yLUNASupply,
        exchangeRate: data.exchangeRate,
        apr: data.apr,
      };
    }
  } catch (error) {
    console.error('Error fetching Prism stats:', error);
  }
  return null;
}

// Helper function to check if staking is available
export async function isStakingAvailable() {
  try {
    const stats = await getPrismStats();
    return stats && stats.totalStaked > 0;
  } catch (error) {
    console.error('Error checking staking availability:', error);
    return false;
  }
}

// Helper function to get LUNA price from Prism
export async function getLUNAPrice() {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=terra-luna-2&vs_currencies=usd');
    if (response.ok) {
      const data = await response.json();
      return data['terra-luna-2']?.usd || 0;
    }
  } catch (error) {
    console.error('Error fetching LUNA price:', error);
  }
  return 0;
}

// Helper function to calculate yLUNA amount from LUNA
export async function calculateYLUNAAmount(lunaAmount: number) {
  try {
    const exchangeRate = await getYLUNAExchangeRate();
    return lunaAmount * exchangeRate;
  } catch (error) {
    console.error('Error calculating yLUNA amount:', error);
    return 0;
  }
}

// Helper function to calculate LUNA amount from yLUNA
export async function calculateLUNAAmount(ylunaAmount: number) {
  try {
    const exchangeRate = await getYLUNAExchangeRate();
    return ylunaAmount / exchangeRate;
  } catch (error) {
    console.error('Error calculating LUNA amount:', error);
    return 0;
  }
}

export default PrismProtocolStaking;

