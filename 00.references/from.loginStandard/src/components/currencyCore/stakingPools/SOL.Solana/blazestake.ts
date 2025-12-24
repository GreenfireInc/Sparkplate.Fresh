// BlazeStake Liquid Staking for Solana (SOL)
// Performance-focused liquid staking

export const BlazeStakeStaking = {
  name: "BlazeStake",
  type: "Liquid Staking",
  website: "https://stake.solblaze.org/",
  description: "Performance-focused liquid staking, non-custodial, Solana Foundation endorsed",
  liquidStakingToken: "bSOL",
  minimumStake: "0.01 SOL",
  apy: "~6.2%",
  lockPeriod: "Instant unstaking available",
  rewardsFrequency: "Continuous compounding",
  fees: "0.3% instant unstake, 0.1% delayed unstake",
  
  // API Information
  api: {
    baseUrl: "https://api.blazestake.com",
    documentation: "https://docs.blazestake.com/",
    endpoints: {
      price: "/price",
      stats: "/stats",
      validators: "/validators",
      apr: "/apr",
    },
  },

  // SDK Information
  sdk: {
    npm: "@blazestake/blazestake-sdk",
    github: "https://github.com/blazestake/blazestake-sdk",
    documentation: "https://docs.blazestake.com/",
  },

  // Social Media
  social: {
    twitter: "https://twitter.com/solblaze_org",
    discord: "https://discord.gg/solblaze",
    telegram: "https://t.me/solblaze",
    reddit: "https://reddit.com/r/solblaze",
  },

  // Features
  features: [
    "Performance-focused",
    "Non-custodial",
    "Solana Foundation endorsed",
    "Instant unstaking",
    "Low fees",
    "High security",
    "Governance participation",
  ],

  // Staking Requirements
  requirements: {
    kyc: false,
    accountVerification: false,
    minimumAge: 18,
    supportedRegions: "Global",
    technicalRequirements: [
      "0.01 SOL minimum",
      "Solana wallet (Phantom, Solflare, etc.)",
      "BlazeStake dApp access",
    ],
  },

  // Risk Factors
  risks: [
    "Smart contract risk",
    "Validator slashing risk",
    "Liquidity risk (instant unstaking)",
    "Protocol risk",
  ],

  // Integration Examples
  examples: {
    getBSOLPrice: `
// Get bSOL price in SOL
import { Connection } from '@solana/web3.js';
import { BlazeStakeClient } from '@blazestake/blazestake-sdk';

const connection = new Connection('https://api.mainnet-beta.solana.com');
const blazestakeClient = new BlazeStakeClient(connection);

const bSOLPrice = await blazestakeClient.getBSOLPrice();
console.log('bSOL price in SOL:', bSOLPrice);
    `,
    
    getStats: `
// Get protocol statistics
const response = await fetch('https://api.blazestake.com/stats');
const stats = await response.json();
console.log('Protocol stats:', stats);
    `,
    
    getValidators: `
// Get validator list
const response = await fetch('https://api.blazestake.com/validators');
const validators = await response.json();
console.log('Validators:', validators);
    `,
    
    stakeSOL: `
// Stake SOL to get bSOL
const stakeInstruction = await blazestakeClient.createStakeInstruction(amountInLamports);
// Add to transaction and send
    `,
  },
};

// Helper function to get bSOL price
export async function getBSOLPrice(): Promise<number> {
  try {
    const response = await fetch('https://api.blazestake.com/price');
    if (response.ok) {
      const data = await response.json();
      return data.bSOLPrice || 0;
    }
  } catch (error) {
    console.error('Error fetching bSOL price:', error);
  }
  return 0;
}

// Helper function to get protocol stats
export async function getProtocolStats() {
  try {
    const response = await fetch('https://api.blazestake.com/stats');
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error('Error fetching protocol stats:', error);
  }
  return null;
}

// Helper function to get APR
export async function getAPR(): Promise<number> {
  try {
    const response = await fetch('https://api.blazestake.com/apr');
    if (response.ok) {
      const data = await response.json();
      return data.apr || 0;
    }
  } catch (error) {
    console.error('Error fetching APR:', error);
  }
  return 0;
}

// Helper function to get validators
export async function getValidators() {
  try {
    const response = await fetch('https://api.blazestake.com/validators');
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error('Error fetching validators:', error);
  }
  return null;
}

// Helper function to check if staking is available
export async function isStakingAvailable(): Promise<boolean> {
  try {
    const stats = await getProtocolStats();
    return stats && stats.totalStaked > 0;
  } catch (error) {
    console.error('Error checking staking availability:', error);
    return false;
  }
}

// Helper function to get SOL price from CoinGecko
export async function getSOLPrice(): Promise<number> {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd');
    if (response.ok) {
      const data = await response.json();
      return data.solana?.usd || 0;
    }
  } catch (error) {
    console.error('Error fetching SOL price:', error);
  }
  return 0;
}

export default BlazeStakeStaking;
