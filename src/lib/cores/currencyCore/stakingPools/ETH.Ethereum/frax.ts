// Frax Ether Liquid Staking Pool for Ethereum (ETH)
// Dual-token liquid staking with frxETH and sfrxETH

export const FraxEtherStaking = {
  name: "Frax Ether",
  type: "Liquid Staking",
  website: "https://frax.finance/",
  description: "Dual-token liquid staking with frxETH and sfrxETH",
  minimumStake: "0.001 ETH",
  apy: "Variable (based on network rewards)",
  lockPeriod: "Instant liquidity with frxETH/sfrxETH",
  rewardsFrequency: "Continuous",
  fees: "No fees",
  
  // API Information
  api: {
    baseUrl: "https://api.frax.finance",
    documentation: "https://docs.frax.finance/",
    endpoints: {
      staking: "/api/staking",
      stats: "/api/stats",
      rewards: "/api/rewards",
      exchangeRate: "/api/exchange-rate",
    },
  },

  // SDK Information
  sdk: {
    npm: "@frax-finance/sdk",
    github: "https://github.com/FraxFinance/frax-sdk",
    documentation: "https://docs.frax.finance/",
  },

  // Social Media
  social: {
    twitter: "https://twitter.com/fraxfinance",
    discord: "https://discord.gg/fraxfinance",
    telegram: "https://t.me/fraxfinance",
    reddit: "https://reddit.com/r/fraxfinance",
  },

  // Features
  features: [
    "Dual-token liquid staking system",
    "frxETH for instant liquidity",
    "sfrxETH for enhanced rewards",
    "DeFi integration",
    "Governance participation",
    "Auto-compounding rewards",
  ],

  // Liquid Staking Tokens
  liquidTokens: [
    {
      name: "frxETH",
      symbol: "frxETH",
      description: "Frax Ether token representing staked ETH",
      exchangeRate: "1:1 with ETH",
    },
    {
      name: "sfrxETH",
      symbol: "sfrxETH",
      description: "Staked frxETH for enhanced rewards",
      exchangeRate: "Variable (increases over time)",
    },
  ],

  // Contract Addresses
  contracts: {
    frxETH: "0x5E8422345238F34275888049021821E8E08CAa1f",
    sfrxETH: "0xac3E018457B222d93114458476f3E3416Abbe38F",
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
// Stake ETH and receive frxETH
import { ethers } from 'ethers';
import { FraxSDK } from '@frax-finance/sdk';

const provider = new ethers.providers.JsonRpcProvider('https://eth-mainnet.g.alchemy.com/v2/YOUR_KEY');
const signer = new ethers.Wallet('YOUR_PRIVATE_KEY', provider);

const frax = new FraxSDK(provider, signer);

const stakeAmount = ethers.utils.parseEther('1.0'); // 1 ETH
const tx = await frax.stakeETH(stakeAmount);
await tx.wait();

console.log('Staking successful, frxETH tokens received');
    `,
    
    stakeFrxETH: `
// Stake frxETH and receive sfrxETH
const frxETHAmount = ethers.utils.parseEther('1.0'); // 1 frxETH
const tx = await frax.stakeFrxETH(frxETHAmount);
await tx.wait();

console.log('Staking successful, sfrxETH tokens received');
    `,
    
    getExchangeRate: `
// Get sfrxETH exchange rate
const exchangeRate = await frax.getSfrxETHExchangeRate();
console.log('sfrxETH per frxETH:', ethers.utils.formatEther(exchangeRate));
    `,
    
    getAPR: `
// Get current APR
const response = await fetch('https://api.frax.finance/api/stats');
const data = await response.json();
console.log('Current APR:', data.apr);
    `,
  },
};

// Helper function to get current APR
export async function getFraxAPR() {
  try {
    const response = await fetch('https://api.frax.finance/api/stats');
    if (response.ok) {
      const data = await response.json();
      return data.apr;
    }
  } catch (error) {
    console.error('Error fetching Frax APR:', error);
  }
  return 0;
}

// Helper function to get sfrxETH exchange rate
export async function getSfrxETHExchangeRate() {
  try {
    const response = await fetch('https://api.frax.finance/api/exchange-rate');
    if (response.ok) {
      const data = await response.json();
      return data.exchangeRate;
    }
  } catch (error) {
    console.error('Error fetching sfrxETH exchange rate:', error);
  }
  return 0;
}

// Helper function to get Frax statistics
export async function getFraxStats() {
  try {
    const response = await fetch('https://api.frax.finance/api/stats');
    if (response.ok) {
      const data = await response.json();
      return {
        totalStaked: data.totalStaked,
        frxETHSupply: data.frxETHSupply,
        sfrxETHSupply: data.sfrxETHSupply,
        exchangeRate: data.exchangeRate,
        apr: data.apr,
      };
    }
  } catch (error) {
    console.error('Error fetching Frax stats:', error);
  }
  return null;
}

// Helper function to check if staking is available
export async function isStakingAvailable() {
  try {
    const stats = await getFraxStats();
    return stats && stats.totalStaked > 0;
  } catch (error) {
    console.error('Error checking staking availability:', error);
    return false;
  }
}

// Helper function to get ETH price from Frax
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

// Helper function to calculate sfrxETH amount from frxETH
export async function calculateSfrxETHAmount(frxethAmount: number) {
  try {
    const exchangeRate = await getSfrxETHExchangeRate();
    return frxethAmount * exchangeRate;
  } catch (error) {
    console.error('Error calculating sfrxETH amount:', error);
    return 0;
  }
}

// Helper function to calculate frxETH amount from sfrxETH
export async function calculateFrxETHAmount(sfrxethAmount: number) {
  try {
    const exchangeRate = await getSfrxETHExchangeRate();
    return sfrxethAmount / exchangeRate;
  } catch (error) {
    console.error('Error calculating frxETH amount:', error);
    return 0;
  }
}

export default FraxEtherStaking;

