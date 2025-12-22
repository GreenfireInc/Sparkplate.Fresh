// Lido Liquid Staking Pool for Ethereum (ETH)
// Largest liquid staking protocol with stETH tokens

export const LidoStaking = {
  name: "Lido",
  type: "Liquid Staking",
  website: "https://lido.fi/",
  description: "Largest liquid staking protocol with stETH tokens (32+ ETH not required)",
  minimumStake: "0.001 ETH",
  apy: "Variable (currently ~3-4%)",
  lockPeriod: "Instant liquidity with stETH",
  rewardsFrequency: "Continuous",
  fees: "10% protocol fee",
  
  // API Information
  api: {
    baseUrl: "https://stake.lido.fi/api",
    documentation: "https://docs.lido.fi/",
    endpoints: {
      staking: "/steth-apr",
      stats: "/stats",
      validators: "/validators",
      rewards: "/rewards",
      exchangeRate: "/steth-apr",
    },
  },

  // SDK Information
  sdk: {
    npm: "@lido-sdk/contracts",
    github: "https://github.com/lidofinance/lido-sdk",
    documentation: "https://docs.lido.fi/",
  },

  // Social Media
  social: {
    twitter: "https://twitter.com/lidofinance",
    discord: "https://discord.gg/lido",
    telegram: "https://t.me/lidofinance",
    reddit: "https://reddit.com/r/lidofinance",
  },

  // Features
  features: [
    "Liquid staking with stETH tokens",
    "No minimum stake requirement",
    "Instant liquidity",
    "DeFi integration",
    "Governance participation",
    "Auto-compounding rewards",
  ],

  // Liquid Staking Tokens
  liquidTokens: [
    {
      name: "stETH",
      symbol: "stETH",
      description: "Liquid ETH token representing staked ETH",
      exchangeRate: "Variable (increases over time)",
    },
    {
      name: "wstETH",
      symbol: "wstETH",
      description: "Wrapped stETH for better DeFi integration",
      exchangeRate: "1:1 with stETH",
    },
  ],

  // Contract Addresses
  contracts: {
    stETH: "0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84",
    wstETH: "0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0",
    depositContract: "0x00000000219ab540356cBB839Cbe05303d7705Fa",
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
    "Centralization risk",
  ],

  // Integration Examples
  examples: {
    stakeETH: `
// Stake ETH and receive stETH
import { ethers } from 'ethers';
import { Lido } from '@lido-sdk/contracts';

const provider = new ethers.providers.JsonRpcProvider('https://eth-mainnet.g.alchemy.com/v2/YOUR_KEY');
const signer = new ethers.Wallet('YOUR_PRIVATE_KEY', provider);

const lido = new Lido('0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84', signer);

const stakeAmount = ethers.utils.parseEther('1.0'); // 1 ETH
const tx = await lido.submit(stakeAmount);
await tx.wait();

console.log('Staking successful, stETH tokens received');
    `,
    
    getExchangeRate: `
// Get stETH exchange rate
const totalPooledEther = await lido.getTotalPooledEther();
const totalShares = await lido.getTotalShares();
const exchangeRate = totalPooledEther.div(totalShares);

console.log('stETH per ETH:', ethers.utils.formatEther(exchangeRate));
    `,
    
    getAPR: `
// Get current APR
const response = await fetch('https://stake.lido.fi/api/steth-apr');
const data = await response.json();
console.log('Current APR:', data.apr);
    `,
    
    getStats: `
// Get Lido statistics
const response = await fetch('https://stake.lido.fi/api/stats');
const stats = await response.json();
console.log('Total staked ETH:', stats.totalStaked);
console.log('Total validators:', stats.totalValidators);
    `,
  },
};

// Helper function to get current APR
export async function getLidoAPR() {
  try {
    const response = await fetch('https://stake.lido.fi/api/steth-apr');
    if (response.ok) {
      const data = await response.json();
      return data.apr;
    }
  } catch (error) {
    console.error('Error fetching Lido APR:', error);
  }
  return 0;
}

// Helper function to get stETH exchange rate
export async function getStETHExchangeRate() {
  try {
    const response = await fetch('https://stake.lido.fi/api/stats');
    if (response.ok) {
      const data = await response.json();
      return data.stethPerToken;
    }
  } catch (error) {
    console.error('Error fetching stETH exchange rate:', error);
  }
  return 0;
}

// Helper function to get Lido statistics
export async function getLidoStats() {
  try {
    const response = await fetch('https://stake.lido.fi/api/stats');
    if (response.ok) {
      const data = await response.json();
      return {
        totalStaked: data.totalStaked,
        totalValidators: data.totalValidators,
        stethPerToken: data.stethPerToken,
        apr: data.apr,
      };
    }
  } catch (error) {
    console.error('Error fetching Lido stats:', error);
  }
  return null;
}

// Helper function to check if staking is available
export async function isStakingAvailable() {
  try {
    const stats = await getLidoStats();
    return stats && stats.totalStaked > 0;
  } catch (error) {
    console.error('Error checking staking availability:', error);
    return false;
  }
}

// Helper function to get ETH price from Lido
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

// Helper function to calculate stETH amount from ETH
export async function calculateStETHAmount(ethAmount: number) {
  try {
    const exchangeRate = await getStETHExchangeRate();
    return ethAmount * exchangeRate;
  } catch (error) {
    console.error('Error calculating stETH amount:', error);
    return 0;
  }
}

// Helper function to calculate ETH amount from stETH
export async function calculateETHAmount(stethAmount: number) {
  try {
    const exchangeRate = await getStETHExchangeRate();
    return stethAmount / exchangeRate;
  } catch (error) {
    console.error('Error calculating ETH amount:', error);
    return 0;
  }
}

// Helper function to get validator performance
export async function getValidatorPerformance() {
  try {
    const response = await fetch('https://stake.lido.fi/api/validators');
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error('Error fetching validator performance:', error);
  }
  return null;
}

export default LidoStaking;

