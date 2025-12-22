// Stakely Validator for Terra (LUNA)
// Validator delegation service

export const StakelyValidator = {
  name: "Stakely",
  type: "Validator",
  website: "https://stakely.io/en/validators/terra",
  description: "5% fee, staking calculator, 21-day unbonding, governance participation",
  minimumStake: "1 LUNA",
  apy: "Variable (based on network rewards)",
  lockPeriod: "21-day unbonding period",
  rewardsFrequency: "Per epoch",
  fees: "5% commission",
  
  // API Information
  api: {
    baseUrl: "https://api.stakely.io",
    documentation: "https://stakely.io/api",
    endpoints: {
      validators: "/api/validators",
      delegations: "/api/delegations",
      rewards: "/api/rewards",
      stats: "/api/stats",
    },
  },

  // SDK Information
  sdk: {
    npm: "@stakely/sdk",
    github: "https://github.com/stakely/sdk",
    documentation: "https://stakely.io/api",
  },

  // Social Media
  social: {
    twitter: "https://twitter.com/stakely_io",
    discord: "https://discord.gg/stakely",
    telegram: "https://t.me/stakely",
    reddit: "https://reddit.com/r/stakely",
  },

  // Features
  features: [
    "5% commission fee",
    "Staking calculator",
    "21-day unbonding period",
    "Governance participation",
    "Reliable operations",
    "No slashing history",
  ],

  // Staking Requirements
  requirements: {
    kyc: false,
    accountVerification: false,
    minimumAge: 18,
    supportedRegions: "Global",
    technicalRequirements: [
      "1 LUNA minimum",
      "Stakely validator selection",
      "Terra Station wallet",
    ],
  },

  // Risk Factors
  risks: [
    "Slashing risk (validator misbehavior)",
    "Validator downtime",
    "21-day unbonding period",
    "Commission changes",
  ],

  // Integration Examples
  examples: {
    getValidatorInfo: `
// Get Stakely validator information
import { StakelySDK } from '@stakely/sdk';

const stakely = new StakelySDK({
  network: 'mainnet',
  rpcUrl: 'https://phoenix-lcd.terra.dev'
});

const validatorAddress = 'terravaloper1...'; // Stakely validator address
const validator = await stakely.getValidator(validatorAddress);
console.log('Stakely validator:', validator);
    `,
    
    getDelegations: `
// Get delegations to Stakely validator
const delegations = await stakely.getDelegations(validatorAddress);
console.log('Delegations to Stakely:', delegations);
    `,
    
    getRewards: `
// Get staking rewards from Stakely
const rewards = await stakely.getRewards(delegatorAddress);
console.log('Staking rewards from Stakely:', rewards);
    `,
    
    getStakingCalculator: `
// Get staking calculator data
const calculator = await stakely.getStakingCalculator(amount, validatorAddress);
console.log('Staking calculator:', calculator);
    `,
  },
};

// Helper function to get Stakely validator information
export async function getStakelyValidator() {
  try {
    const response = await fetch('https://api.stakely.io/api/validators/terra');
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error('Error fetching Stakely validator:', error);
  }
  return null;
}

// Helper function to get delegations to Stakely
export async function getDelegations(validatorAddress: string) {
  try {
    const response = await fetch(`https://api.stakely.io/api/delegations/${validatorAddress}`);
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error('Error fetching delegations:', error);
  }
  return null;
}

// Helper function to get staking rewards
export async function getStakingRewards(delegatorAddress: string) {
  try {
    const response = await fetch(`https://api.stakely.io/api/rewards/${delegatorAddress}`);
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error('Error fetching staking rewards:', error);
  }
  return null;
}

// Helper function to get staking calculator data
export async function getStakingCalculator(amount: number, validatorAddress: string) {
  try {
    const response = await fetch(`https://api.stakely.io/api/calculator`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: amount,
        validator: validatorAddress
      })
    });
    
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error('Error fetching staking calculator:', error);
  }
  return null;
}

// Helper function to get Stakely statistics
export async function getStakelyStats() {
  try {
    const response = await fetch('https://api.stakely.io/api/stats');
    if (response.ok) {
      const data = await response.json();
      return {
        totalStaked: data.totalStaked,
        totalDelegators: data.totalDelegators,
        commission: data.commission,
        apr: data.apr,
      };
    }
  } catch (error) {
    console.error('Error fetching Stakely stats:', error);
  }
  return null;
}

// Helper function to check if staking is available
export async function isStakingAvailable() {
  try {
    const stats = await getStakelyStats();
    return stats && stats.totalStaked > 0;
  } catch (error) {
    console.error('Error checking staking availability:', error);
    return false;
  }
}

// Helper function to get LUNA price from Stakely
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

export default StakelyValidator;

