// Allnodes Staking Pool for Terra Classic (LUNC)
// Non-custodial staking service

export const AllnodesStaking = {
  name: "Allnodes",
  type: "Non-Custodial Staking",
  website: "https://www.allnodes.com/lunc/staking",
  description: "High-performance nodes, 18.56% APY, no hardware required",
  minimumStake: "1 LUNC",
  apy: "18.56%",
  lockPeriod: "21-day unbonding period",
  rewardsFrequency: "Per epoch",
  fees: "No fees",
  
  // API Information
  api: {
    baseUrl: "https://api.allnodes.com",
    documentation: "https://www.allnodes.com/api",
    endpoints: {
      staking: "/api/staking",
      stats: "/api/stats",
      rewards: "/api/rewards",
      validators: "/api/validators",
    },
  },

  // SDK Information
  sdk: {
    npm: "@allnodes/sdk",
    github: "https://github.com/allnodes/sdk",
    documentation: "https://www.allnodes.com/api",
  },

  // Social Media
  social: {
    twitter: "https://twitter.com/allnodes",
    discord: "https://discord.gg/allnodes",
    telegram: "https://t.me/allnodes",
    reddit: "https://reddit.com/r/allnodes",
  },

  // Features
  features: [
    "Non-custodial staking",
    "No hardware required",
    "High-performance nodes",
    "18.56% APY",
    "21-day unbonding period",
    "24/7 monitoring",
    "Terra Classic support",
  ],

  // Staking Requirements
  requirements: {
    kyc: false,
    accountVerification: false,
    minimumAge: 18,
    supportedRegions: "Global",
    technicalRequirements: [
      "1 LUNC minimum",
      "Allnodes account",
      "Validator selection",
    ],
  },

  // Risk Factors
  risks: [
    "Slashing risk (validator misbehavior)",
    "Validator downtime",
    "21-day unbonding period",
    "Third-party dependency",
  ],

  // Integration Examples
  examples: {
    stakeLUNC: `
// Stake LUNC through Allnodes
import { AllnodesSDK } from '@allnodes/sdk';

const allnodes = new AllnodesSDK({
  apiKey: 'YOUR_API_KEY',
  network: 'mainnet'
});

const stakeAmount = '1.0'; // 1 LUNC
const validatorAddress = 'terravaloper1...'; // Validator address
const tx = await allnodes.stakeLUNC(stakeAmount, validatorAddress);
await tx.wait();

console.log('Staking successful through Allnodes');
    `,
    
    getValidatorStats: `
// Get validator statistics
const stats = await allnodes.getValidatorStats(validatorAddress);
console.log('Validator stats:', stats);
    `,
    
    getStakingRewards: `
// Get staking rewards
const rewards = await allnodes.getStakingRewards(delegatorAddress);
console.log('Staking rewards:', rewards);
    `,
    
    getAPR: `
// Get current APR
const response = await fetch('https://api.allnodes.com/api/stats');
const data = await response.json();
console.log('Current APR:', data.apr);
    `,
  },
};

// Helper function to get current APR
export async function getAllnodesAPR() {
  try {
    const response = await fetch('https://api.allnodes.com/api/stats');
    if (response.ok) {
      const data = await response.json();
      return data.apr;
    }
  } catch (error) {
    console.error('Error fetching Allnodes APR:', error);
  }
  return 0;
}

// Helper function to get validator statistics
export async function getValidatorStats(validatorAddress: string) {
  try {
    const response = await fetch(`https://api.allnodes.com/api/validators/${validatorAddress}`);
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error('Error fetching validator stats:', error);
  }
  return null;
}

// Helper function to get staking rewards
export async function getStakingRewards(delegatorAddress: string) {
  try {
    const response = await fetch(`https://api.allnodes.com/api/rewards/${delegatorAddress}`);
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error('Error fetching staking rewards:', error);
  }
  return null;
}

// Helper function to get Allnodes statistics
export async function getAllnodesStats() {
  try {
    const response = await fetch('https://api.allnodes.com/api/stats');
    if (response.ok) {
      const data = await response.json();
      return {
        totalStaked: data.totalStaked,
        totalValidators: data.totalValidators,
        apr: data.apr,
      };
    }
  } catch (error) {
    console.error('Error fetching Allnodes stats:', error);
  }
  return null;
}

// Helper function to check if staking is available
export async function isStakingAvailable() {
  try {
    const stats = await getAllnodesStats();
    return stats && stats.totalStaked > 0;
  } catch (error) {
    console.error('Error checking staking availability:', error);
    return false;
  }
}

// Helper function to get LUNC price from Allnodes
export async function getLUNCPrice() {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=terra-luna-classic&vs_currencies=usd');
    if (response.ok) {
      const data = await response.json();
      return data['terra-luna-classic']?.usd || 0;
    }
  } catch (error) {
    console.error('Error fetching LUNC price:', error);
  }
  return 0;
}

export default AllnodesStaking;

