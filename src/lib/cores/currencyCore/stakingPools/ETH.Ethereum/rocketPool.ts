// Rocket Pool Liquid Staking Pool for Ethereum (ETH)
// Decentralized liquid staking protocol with rETH tokens

export const RocketPoolStaking = {
  name: "Rocket Pool",
  type: "Decentralized Liquid Staking",
  website: "https://rocketpool.net/",
  description: "Decentralized liquid staking protocol with rETH tokens",
  minimumStake: "0.01 ETH",
  apy: "Variable (currently ~3-4%)",
  lockPeriod: "Instant liquidity with rETH",
  rewardsFrequency: "Continuous",
  fees: "15% node operator commission",
  
  // API Information
  api: {
    baseUrl: "https://api.rocketpool.net/api",
    documentation: "https://docs.rocketpool.net/",
    endpoints: {
      staking: "/staking",
      stats: "/stats",
      validators: "/validators",
      rewards: "/rewards",
      exchangeRate: "/exchange-rate",
    },
  },

  // SDK Information
  sdk: {
    npm: "@rocketpool/rocketpool",
    github: "https://github.com/rocket-pool/rocketpool-js",
    documentation: "https://docs.rocketpool.net/",
  },

  // Social Media
  social: {
    twitter: "https://twitter.com/Rocket_Pool",
    discord: "https://discord.gg/rocketpool",
    telegram: "https://t.me/rocketpool",
    reddit: "https://reddit.com/r/rocketpool",
  },

  // Features
  features: [
    "Decentralized liquid staking with rETH tokens",
    "No minimum stake requirement",
    "Instant liquidity",
    "Decentralized node operators",
    "Governance participation",
    "Auto-compounding rewards",
  ],

  // Liquid Staking Tokens
  liquidTokens: [
    {
      name: "rETH",
      symbol: "rETH",
      description: "Rocket Pool liquid ETH token representing staked ETH",
      exchangeRate: "Variable (increases over time)",
    },
  ],

  // Contract Addresses
  contracts: {
    rETH: "0xae78736Cd615f374D3085123B210c3c7d1C4C860",
    depositPool: "0xDD5954105088FdCe4e0618BF483E1e6123e4bBA0",
    nodeDeposit: "0x1cc9cf958a8b4c3c2c5c2c5c2c5c2c5c2c5c2c5c",
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
    "Node operator risk",
  ],

  // Integration Examples
  examples: {
    stakeETH: `
// Stake ETH and receive rETH
import { ethers } from 'ethers';
import { RocketPool } from '@rocketpool/rocketpool';

const provider = new ethers.providers.JsonRpcProvider('https://eth-mainnet.g.alchemy.com/v2/YOUR_KEY');
const signer = new ethers.Wallet('YOUR_PRIVATE_KEY', provider);

const rocketPool = new RocketPool(provider, signer);

const stakeAmount = ethers.utils.parseEther('1.0'); // 1 ETH
const tx = await rocketPool.deposit(stakeAmount);
await tx.wait();

console.log('Staking successful, rETH tokens received');
    `,
    
    getExchangeRate: `
// Get rETH exchange rate
const exchangeRate = await rocketPool.getExchangeRate();
console.log('rETH per ETH:', ethers.utils.formatEther(exchangeRate));
    `,
    
    getAPR: `
// Get current APR
const response = await fetch('https://api.rocketpool.net/api/stats');
const data = await response.json();
console.log('Current APR:', data.apr);
    `,
    
    getStats: `
// Get Rocket Pool statistics
const response = await fetch('https://api.rocketpool.net/api/stats');
const stats = await response.json();
console.log('Total staked ETH:', stats.totalStaked);
console.log('Total node operators:', stats.totalNodeOperators);
    `,
  },
};

// Helper function to get current APR
export async function getRocketPoolAPR() {
  try {
    const response = await fetch('https://api.rocketpool.net/api/stats');
    if (response.ok) {
      const data = await response.json();
      return data.apr;
    }
  } catch (error) {
    console.error('Error fetching Rocket Pool APR:', error);
  }
  return 0;
}

// Helper function to get rETH exchange rate
export async function getRETHExchangeRate() {
  try {
    const response = await fetch('https://api.rocketpool.net/api/exchange-rate');
    if (response.ok) {
      const data = await response.json();
      return data.exchangeRate;
    }
  } catch (error) {
    console.error('Error fetching rETH exchange rate:', error);
  }
  return 0;
}

// Helper function to get Rocket Pool statistics
export async function getRocketPoolStats() {
  try {
    const response = await fetch('https://api.rocketpool.net/api/stats');
    if (response.ok) {
      const data = await response.json();
      return {
        totalStaked: data.totalStaked,
        totalNodeOperators: data.totalNodeOperators,
        exchangeRate: data.exchangeRate,
        apr: data.apr,
      };
    }
  } catch (error) {
    console.error('Error fetching Rocket Pool stats:', error);
  }
  return null;
}

// Helper function to check if staking is available
export async function isStakingAvailable() {
  try {
    const stats = await getRocketPoolStats();
    return stats && stats.totalStaked > 0;
  } catch (error) {
    console.error('Error checking staking availability:', error);
    return false;
  }
}

// Helper function to get ETH price from Rocket Pool
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

// Helper function to calculate rETH amount from ETH
export async function calculateRETHAmount(ethAmount: number) {
  try {
    const exchangeRate = await getRETHExchangeRate();
    return ethAmount * exchangeRate;
  } catch (error) {
    console.error('Error calculating rETH amount:', error);
    return 0;
  }
}

// Helper function to calculate ETH amount from rETH
export async function calculateETHAmount(rethAmount: number) {
  try {
    const exchangeRate = await getRETHExchangeRate();
    return rethAmount / exchangeRate;
  } catch (error) {
    console.error('Error calculating ETH amount:', error);
    return 0;
  }
}

// Helper function to get node operator performance
export async function getNodeOperatorPerformance() {
  try {
    const response = await fetch('https://api.rocketpool.net/api/validators');
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error('Error fetching node operator performance:', error);
  }
  return null;
}

export default RocketPoolStaking;

