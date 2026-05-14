// Stakewiz Staking for SOL
// Validator pool and staking service

export const StakewizStaking = {
  name: "Stakewiz",
  type: "validator",
  website: "https://stakewiz.com/",
  description: "Validator pool and staking service for SOL",
  liquidStakingToken: "N/A (Validator staking)",
  minimumStake: "0.1 SOL",
  apy: "~6.3%",
  lockPeriod: "No lockup (delegation)",
  rewardsFrequency: "Per epoch",
  fees: "Validator fees",
  
  // API Information
  api: {
    baseUrl: "https://api.stakewiz.com",
    documentation: "https://docs.stakewiz.com/",
    endpoints: {
      validators: "/validators",
      staking: "/staking",
      rewards: "/rewards",
      analytics: "/analytics",
    },
  },

  // SDK Information
  sdk: {
    npm: "stakewiz-sdk",
    github: "https://github.com/stakewiz/sdk",
    documentation: "https://docs.stakewiz.com/",
  },

  // Social Media
  social: {
    twitter: "https://twitter.com/stakewiz",
    discord: "https://discord.gg/stakewiz",
    telegram: "https://t.me/stakewiz",
    reddit: "https://reddit.com/r/stakewiz",
  },

  // Features
  features: [
    "Validator pool service",
    "No lockup period",
    "Direct delegation",
    "Real-time rewards",
    "Transparent fees",
    "High uptime",
    "Community support",
  ],

  // Staking Requirements
  requirements: {
    kyc: false,
    accountVerification: false,
    minimumAge: 18,
    supportedRegions: "Global",
    technicalRequirements: [
      "Solana wallet",
      "0.1 SOL minimum",
      "Validator selection",
    ],
  },

  // Risk Factors
  risks: [
    "Validator performance risk",
    "Network participation risk",
    "Validator fees",
  ],

  // Integration Examples
  examples: {
    getValidators: `
// Get validators
const response = await fetch('https://api.stakewiz.com/validators');
const validators = await response.json();
console.log('Validators:', validators);
    `,
    
    getStakingInfo: `
// Get staking information
const response = await fetch('https://api.stakewiz.com/staking');
const staking = await response.json();
console.log('Staking info:', staking);
    `,
    
    getRewards: `
// Get rewards
const response = await fetch('https://api.stakewiz.com/rewards');
const rewards = await response.json();
console.log('Rewards:', rewards);
    `,
  },
};

// Helper function to get validators
export async function getValidators() {
  try {
    const response = await fetch('https://api.stakewiz.com/validators');
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Error fetching validators:', error);
  }
  return null;
}

// Helper function to get staking info
export async function getStakingInfo() {
  try {
    const response = await fetch('https://api.stakewiz.com/staking');
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Error fetching staking info:', error);
  }
  return null;
}

// Helper function to get rewards
export async function getRewards() {
  try {
    const response = await fetch('https://api.stakewiz.com/rewards');
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Error fetching rewards:', error);
  }
  return null;
}

// Helper function to get SOL staking rate
export async function getSOLStakingRate() {
  try {
    // Stakewiz typically offers around 6.3% APY
    return 6.3;
  } catch (error) {
    console.error('Error fetching SOL staking rate:', error);
  }
  return 0;
}

// Helper function to check if staking is available
export async function isStakingAvailable(): Promise<boolean> {
  try {
    const validators = await getValidators();
    return validators && validators.length > 0;
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

export default StakewizStaking;
