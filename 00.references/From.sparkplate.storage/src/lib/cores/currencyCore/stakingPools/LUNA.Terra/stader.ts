// Stader Labs Liquid Staking Pool for Terra (LUNA)
// Multi-chain liquid staking protocol with LunaX

export const StaderLabsStaking = {
  name: "Stader Labs",
  type: "Liquid Staking",
  website: "https://www.staderlabs.com/",
  description: "Multi-chain liquid staking protocol with LunaX",
  minimumStake: "1 LUNA",
  apy: "Variable (based on network rewards)",
  lockPeriod: "Instant liquidity with LunaX",
  rewardsFrequency: "Continuous",
  fees: "No fees",
  
  // API Information
  api: {
    baseUrl: "https://api.staderlabs.com",
    documentation: "https://docs.staderlabs.com/",
    endpoints: {
      staking: "/api/staking",
      stats: "/api/stats",
      rewards: "/api/rewards",
      exchangeRate: "/api/exchange-rate",
    },
  },

  // SDK Information
  sdk: {
    npm: "@stader-labs/sdk",
    github: "https://github.com/stader-labs/sdk",
    documentation: "https://docs.staderlabs.com/",
  },

  // Social Media
  social: {
    twitter: "https://twitter.com/staderlabs",
    discord: "https://discord.gg/staderlabs",
    telegram: "https://t.me/staderlabs",
    reddit: "https://reddit.com/r/staderlabs",
  },

  // Features
  features: [
    "Multi-chain liquid staking",
    "LunaX tokens",
    "Instant liquidity",
    "DeFi integration",
    "Governance participation",
    "Auto-compounding rewards",
  ],

  // Liquid Staking Tokens
  liquidTokens: [
    {
      name: "LunaX",
      symbol: "LunaX",
      description: "Stader Labs liquid LUNA token",
      exchangeRate: "Variable (increases over time)",
    },
  ],

  // Contract Addresses
  contracts: {
    LunaX: "0x...", // Replace with actual contract address
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
// Stake LUNA and receive LunaX
import { StaderSDK } from '@stader-labs/sdk';

const stader = new StaderSDK({
  network: 'mainnet',
  rpcUrl: 'https://phoenix-lcd.terra.dev'
});

const stakeAmount = '1.0'; // 1 LUNA
const tx = await stader.stakeLUNA(stakeAmount);
await tx.wait();

console.log('Staking successful, LunaX tokens received');
    `,
    
    getExchangeRate: `
// Get LunaX exchange rate
const exchangeRate = await stader.getLunaXExchangeRate();
console.log('LunaX per LUNA:', exchangeRate);
    `,
    
    getAPR: `
// Get current APR
const response = await fetch('https://api.staderlabs.com/api/stats');
const data = await response.json();
console.log('Current APR:', data.apr);
    `,
    
    getStats: `
// Get Stader statistics
const response = await fetch('https://api.staderlabs.com/api/stats');
const stats = await response.json();
console.log('Total staked LUNA:', stats.totalStaked);
console.log('Total LunaX supply:', stats.lunaXSupply);
    `,
  },
};

// Helper function to get current APR
export async function getStaderAPR() {
  try {
    const response = await fetch('https://api.staderlabs.com/api/stats');
    if (response.ok) {
      const data = await response.json();
      return data.apr;
    }
  } catch (error) {
    console.error('Error fetching Stader APR:', error);
  }
  return 0;
}

// Helper function to get LunaX exchange rate
export async function getLunaXExchangeRate() {
  try {
    const response = await fetch('https://api.staderlabs.com/api/exchange-rate');
    if (response.ok) {
      const data = await response.json();
      return data.exchangeRate;
    }
  } catch (error) {
    console.error('Error fetching LunaX exchange rate:', error);
  }
  return 0;
}

// Helper function to get Stader statistics
export async function getStaderStats() {
  try {
    const response = await fetch('https://api.staderlabs.com/api/stats');
    if (response.ok) {
      const data = await response.json();
      return {
        totalStaked: data.totalStaked,
        lunaXSupply: data.lunaXSupply,
        exchangeRate: data.exchangeRate,
        apr: data.apr,
      };
    }
  } catch (error) {
    console.error('Error fetching Stader stats:', error);
  }
  return null;
}

// Helper function to check if staking is available
export async function isStakingAvailable() {
  try {
    const stats = await getStaderStats();
    return stats && stats.totalStaked > 0;
  } catch (error) {
    console.error('Error checking staking availability:', error);
    return false;
  }
}

// Helper function to get LUNA price from Stader
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

// Helper function to calculate LunaX amount from LUNA
export async function calculateLunaXAmount(lunaAmount: number) {
  try {
    const exchangeRate = await getLunaXExchangeRate();
    return lunaAmount * exchangeRate;
  } catch (error) {
    console.error('Error calculating LunaX amount:', error);
    return 0;
  }
}

// Helper function to calculate LUNA amount from LunaX
export async function calculateLUNAAmount(lunaXAmount: number) {
  try {
    const exchangeRate = await getLunaXExchangeRate();
    return lunaXAmount / exchangeRate;
  } catch (error) {
    console.error('Error calculating LUNA amount:', error);
    return 0;
  }
}

export default StaderLabsStaking;

