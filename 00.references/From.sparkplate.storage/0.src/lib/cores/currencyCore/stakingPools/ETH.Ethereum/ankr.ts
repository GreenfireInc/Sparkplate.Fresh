// Ankr Liquid Staking Pool for Ethereum (ETH)
// Liquid staking with aETH tokens

export const AnkrStaking = {
  name: "Ankr",
  type: "Liquid Staking",
  website: "https://www.ankr.com/staking/",
  description: "Liquid staking with aETH tokens for enhanced DeFi",
  minimumStake: "0.001 ETH",
  apy: "Variable (based on network rewards)",
  lockPeriod: "Instant liquidity with aETH",
  rewardsFrequency: "Continuous",
  fees: "No fees",
  
  // API Information
  api: {
    baseUrl: "https://api.ankr.com",
    documentation: "https://docs.ankr.com/",
    endpoints: {
      staking: "/api/staking",
      stats: "/api/stats",
      rewards: "/api/rewards",
      exchangeRate: "/api/exchange-rate",
    },
  },

  // SDK Information
  sdk: {
    npm: "@ankr.com/sdk",
    github: "https://github.com/Ankr-network/ankr.js",
    documentation: "https://docs.ankr.com/",
  },

  // Social Media
  social: {
    twitter: "https://twitter.com/ankr",
    discord: "https://discord.gg/ankr",
    telegram: "https://t.me/ankrnetwork",
    reddit: "https://reddit.com/r/ankr",
  },

  // Features
  features: [
    "Liquid staking with aETH tokens",
    "Instant liquidity",
    "DeFi integration",
    "Cross-chain compatibility",
    "Governance participation",
    "Auto-compounding rewards",
  ],

  // Liquid Staking Tokens
  liquidTokens: [
    {
      name: "aETH",
      symbol: "aETH",
      description: "Ankr liquid ETH token representing staked ETH",
      exchangeRate: "Variable (increases over time)",
    },
    {
      name: "aETHc",
      symbol: "aETHc",
      description: "Ankr liquid ETH token with enhanced rewards",
      exchangeRate: "Variable (increases over time)",
    },
  ],

  // Contract Addresses
  contracts: {
    aETH: "0xE95A203B1a91a908F9B9CE46459d101078c2c3cb",
    aETHc: "0xE95A203B1a91a908F9B9CE46459d101078c2c3cb",
    stakingContract: "0x00000000219ab540356cBB839Cbe05303d7705Fa",
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
    stakeETH: `
// Stake ETH and receive aETH
import { ethers } from 'ethers';
import { AnkrSDK } from '@ankr.com/sdk';

const provider = new ethers.providers.JsonRpcProvider('https://eth-mainnet.g.alchemy.com/v2/YOUR_KEY');
const signer = new ethers.Wallet('YOUR_PRIVATE_KEY', provider);

const ankr = new AnkrSDK(provider, signer);

const stakeAmount = ethers.utils.parseEther('1.0'); // 1 ETH
const tx = await ankr.stakeETH(stakeAmount);
await tx.wait();

console.log('Staking successful, aETH tokens received');
    `,
    
    getExchangeRate: `
// Get aETH exchange rate
const exchangeRate = await ankr.getAETHExchangeRate();
console.log('aETH per ETH:', ethers.utils.formatEther(exchangeRate));
    `,
    
    getAPR: `
// Get current APR
const response = await fetch('https://api.ankr.com/api/stats');
const data = await response.json();
console.log('Current APR:', data.apr);
    `,
    
    getStats: `
// Get Ankr statistics
const response = await fetch('https://api.ankr.com/api/stats');
const stats = await response.json();
console.log('Total staked ETH:', stats.totalStaked);
console.log('Total validators:', stats.totalValidators);
    `,
  },
};

// Helper function to get current APR
export async function getAnkrAPR() {
  try {
    const response = await fetch('https://api.ankr.com/api/stats');
    if (response.ok) {
      const data = await response.json();
      return data.apr;
    }
  } catch (error) {
    console.error('Error fetching Ankr APR:', error);
  }
  return 0;
}

// Helper function to get aETH exchange rate
export async function getAETHExchangeRate() {
  try {
    const response = await fetch('https://api.ankr.com/api/exchange-rate');
    if (response.ok) {
      const data = await response.json();
      return data.exchangeRate;
    }
  } catch (error) {
    console.error('Error fetching aETH exchange rate:', error);
  }
  return 0;
}

// Helper function to get Ankr statistics
export async function getAnkrStats() {
  try {
    const response = await fetch('https://api.ankr.com/api/stats');
    if (response.ok) {
      const data = await response.json();
      return {
        totalStaked: data.totalStaked,
        totalValidators: data.totalValidators,
        exchangeRate: data.exchangeRate,
        apr: data.apr,
      };
    }
  } catch (error) {
    console.error('Error fetching Ankr stats:', error);
  }
  return null;
}

// Helper function to check if staking is available
export async function isStakingAvailable() {
  try {
    const stats = await getAnkrStats();
    return stats && stats.totalStaked > 0;
  } catch (error) {
    console.error('Error checking staking availability:', error);
    return false;
  }
}

// Helper function to get ETH price from Ankr
export async function getETHPrice() {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
    if (response.ok) {
      const data = await response.json();
      return data.ethereum?.usd || 0;
    }
  } catch (error) {
    console.error('Error fetching ETH price:', error);
  }
  return 0;
}

// Helper function to calculate aETH amount from ETH
export async function calculateAETHAmount(ethAmount: number) {
  try {
    const exchangeRate = await getAETHExchangeRate();
    return ethAmount * exchangeRate;
  } catch (error) {
    console.error('Error calculating aETH amount:', error);
    return 0;
  }
}

// Helper function to calculate ETH amount from aETH
export async function calculateETHAmount(aethAmount: number) {
  try {
    const exchangeRate = await getAETHExchangeRate();
    return aethAmount / exchangeRate;
  } catch (error) {
    console.error('Error calculating ETH amount:', error);
    return 0;
  }
}

export default AnkrStaking;

