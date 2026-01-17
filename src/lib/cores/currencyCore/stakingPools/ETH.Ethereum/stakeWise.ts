// StakeWise Liquid Staking Pool for Ethereum (ETH)
// Liquid staking with sETH2 tokens

export const StakeWiseStaking = {
  name: "StakeWise",
  type: "Liquid Staking",
  website: "https://stakewise.io/",
  description: "Liquid staking with sETH2 tokens for enhanced DeFi",
  minimumStake: "0.001 ETH",
  apy: "Variable (based on network rewards)",
  lockPeriod: "Instant liquidity with sETH2",
  rewardsFrequency: "Continuous",
  fees: "No fees",
  
  // API Information
  api: {
    baseUrl: "https://api.stakewise.io",
    documentation: "https://docs.stakewise.io/",
    endpoints: {
      staking: "/api/staking",
      stats: "/api/stats",
      rewards: "/api/rewards",
      exchangeRate: "/api/exchange-rate",
    },
  },

  // SDK Information
  sdk: {
    npm: "@stakewise/v3-sdk",
    github: "https://github.com/stakewise/v3-sdk",
    documentation: "https://docs.stakewise.io/",
  },

  // Social Media
  social: {
    twitter: "https://twitter.com/stakewise_io",
    discord: "https://discord.gg/stakewise",
    telegram: "https://t.me/stakewise",
    reddit: "https://reddit.com/r/stakewise",
  },

  // Features
  features: [
    "Liquid staking with sETH2 tokens",
    "Instant liquidity",
    "DeFi integration",
    "Governance participation",
    "Auto-compounding rewards",
    "Transparent operations",
  ],

  // Liquid Staking Tokens
  liquidTokens: [
    {
      name: "sETH2",
      symbol: "sETH2",
      description: "StakeWise liquid ETH token representing staked ETH",
      exchangeRate: "Variable (increases over time)",
    },
  ],

  // Contract Addresses
  contracts: {
    sETH2: "0xFe2e637202056d8B631eE5e7f6dd45D2A7f155a0",
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
// Stake ETH and receive sETH2
import { ethers } from 'ethers';
import StakewiseSDK from '@stakewise/v3-sdk';

const provider = new ethers.providers.JsonRpcProvider('https://eth-mainnet.g.alchemy.com/v2/YOUR_KEY');
const signer = new ethers.Wallet('YOUR_PRIVATE_KEY', provider);

const sdk = new StakewiseSDK({ network: 'mainnet' });

const stakeAmount = ethers.utils.parseEther('1.0'); // 1 ETH
const tx = await sdk.stakeETH(stakeAmount);
await tx.wait();

console.log('Staking successful, sETH2 tokens received');
    `,
    
    getExchangeRate: `
// Get sETH2 exchange rate
const exchangeRate = await sdk.getExchangeRate();
console.log('sETH2 per ETH:', ethers.utils.formatEther(exchangeRate));
    `,
    
    getAPR: `
// Get current APR
const response = await fetch('https://api.stakewise.io/api/stats');
const data = await response.json();
console.log('Current APR:', data.apr);
    `,
    
    getStats: `
// Get StakeWise statistics
const response = await fetch('https://api.stakewise.io/api/stats');
const stats = await response.json();
console.log('Total staked ETH:', stats.totalStaked);
console.log('Total validators:', stats.totalValidators);
    `,
  },
};

// Helper function to get current APR
export async function getStakeWiseAPR() {
  try {
    const response = await fetch('https://api.stakewise.io/api/stats');
    if (response.ok) {
      const data = await response.json();
      return data.apr;
    }
  } catch (error) {
    console.error('Error fetching StakeWise APR:', error);
  }
  return 0;
}

// Helper function to get sETH2 exchange rate
export async function getSETH2ExchangeRate() {
  try {
    const response = await fetch('https://api.stakewise.io/api/exchange-rate');
    if (response.ok) {
      const data = await response.json();
      return data.exchangeRate;
    }
  } catch (error) {
    console.error('Error fetching sETH2 exchange rate:', error);
  }
  return 0;
}

// Helper function to get StakeWise statistics
export async function getStakeWiseStats() {
  try {
    const response = await fetch('https://api.stakewise.io/api/stats');
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
    console.error('Error fetching StakeWise stats:', error);
  }
  return null;
}

// Helper function to check if staking is available
export async function isStakingAvailable() {
  try {
    const stats = await getStakeWiseStats();
    return stats && stats.totalStaked > 0;
  } catch (error) {
    console.error('Error checking staking availability:', error);
  }
  return false;
}

// Helper function to get ETH price from StakeWise
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

// Helper function to calculate sETH2 amount from ETH
export async function calculateSETH2Amount(ethAmount: number) {
  try {
    const exchangeRate = await getSETH2ExchangeRate();
    return ethAmount * exchangeRate;
  } catch (error) {
    console.error('Error calculating sETH2 amount:', error);
    return 0;
  }
}

// Helper function to calculate ETH amount from sETH2
export async function calculateETHAmount(seth2Amount: number) {
  try {
    const exchangeRate = await getSETH2ExchangeRate();
    return seth2Amount / exchangeRate;
  } catch (error) {
    console.error('Error calculating ETH amount:', error);
    return 0;
  }
}

export default StakeWiseStaking;

