// DAIC Capital Validator for Terra (LUNA)
// Community validator with high APY

export const DAICCapitalValidator = {
  name: "DAIC Capital",
  type: "Validator",
  website: "https://daic.capital/",
  description: "Up to 28.29% APY, community validator, 21-day unbonding",
  minimumStake: "1 LUNA",
  apy: "Up to 28.29%",
  lockPeriod: "21-day unbonding period",
  rewardsFrequency: "Per epoch",
  fees: "Variable commission",
  
  // API Information
  api: {
    baseUrl: "https://api.daic.capital",
    documentation: "https://daic.capital/api",
    endpoints: {
      validators: "/api/validators",
      delegations: "/api/delegations",
      rewards: "/api/rewards",
      stats: "/api/stats",
    },
  },

  // SDK Information
  sdk: {
    npm: "@daic-capital/sdk",
    github: "https://github.com/daic-capital/sdk",
    documentation: "https://daic.capital/api",
  },

  // Social Media
  social: {
    twitter: "https://twitter.com/daiccapital",
    discord: "https://discord.gg/daiccapital",
    telegram: "https://t.me/daiccapital",
    reddit: "https://reddit.com/r/daiccapital",
  },

  // Features
  features: [
    "Up to 28.29% APY",
    "Community validator",
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
      "DAIC Capital validator selection",
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
// Get DAIC Capital validator information
import { DAICSDK } from '@daic-capital/sdk';

const daic = new DAICSDK({
  network: 'mainnet',
  rpcUrl: 'https://phoenix-lcd.terra.dev'
});

const validatorAddress = 'terravaloper1...'; // DAIC Capital validator address
const validator = await daic.getValidator(validatorAddress);
console.log('DAIC Capital validator:', validator);
    `,
    
    getDelegations: `
// Get delegations to DAIC Capital validator
const delegations = await daic.getDelegations(validatorAddress);
console.log('Delegations to DAIC Capital:', delegations);
    `,
    
    getRewards: `
// Get staking rewards from DAIC Capital
const rewards = await daic.getRewards(delegatorAddress);
console.log('Staking rewards from DAIC Capital:', rewards);
    `,
    
    getAPR: `
// Get current APR
const response = await fetch('https://api.daic.capital/api/stats');
const data = await response.json();
console.log('Current APR:', data.apr);
    `,
  },
};

// Helper function to get DAIC Capital validator information
export async function getDAICValidator() {
  try {
    const response = await fetch('https://api.daic.capital/api/validators/terra');
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error('Error fetching DAIC Capital validator:', error);
  }
  return null;
}

// Helper function to get delegations to DAIC Capital
export async function getDelegations(validatorAddress: string) {
  try {
    const response = await fetch(`https://api.daic.capital/api/delegations/${validatorAddress}`);
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
    const response = await fetch(`https://api.daic.capital/api/rewards/${delegatorAddress}`);
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error('Error fetching staking rewards:', error);
  }
  return null;
}

// Helper function to get DAIC Capital statistics
export async function getDAICStats() {
  try {
    const response = await fetch('https://api.daic.capital/api/stats');
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
    console.error('Error fetching DAIC Capital stats:', error);
  }
  return null;
}

// Helper function to check if staking is available
export async function isStakingAvailable() {
  try {
    const stats = await getDAICStats();
    return stats && stats.totalStaked > 0;
  } catch (error) {
    console.error('Error checking staking availability:', error);
    return false;
  }
}

// Helper function to get LUNA price from DAIC Capital
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

export default DAICCapitalValidator;

