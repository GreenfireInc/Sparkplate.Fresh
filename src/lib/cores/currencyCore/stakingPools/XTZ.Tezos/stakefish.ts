// Stake.fish Staking for XTZ
// Multi-cryptocurrency staking service

export const StakeFishStaking = {
  name: "Stake.fish",
  type: "professional",
  website: "https://stake.fish/tezos/",
  description: "Professional staking service for various cryptocurrencies, including Tezos",
  liquidStakingToken: "N/A (Professional baker)",
  minimumStake: "1 XTZ",
  apy: "~5-6%",
  lockPeriod: "No lockup (liquid delegation)",
  rewardsFrequency: "Per cycle (~2.5 days)",
  fees: "5-10%",
  
  // API Information
  api: {
    baseUrl: "https://api.stake.fish",
    documentation: "https://docs.stake.fish/",
    endpoints: {
      staking: "/v1/tezos/staking",
      rewards: "/v1/tezos/rewards",
      validators: "/v1/tezos/validators",
    },
  },

  // SDK Information
  sdk: {
    npm: "stakefish-sdk",
    github: "https://github.com/stakefish/sdk",
    documentation: "https://docs.stake.fish/",
  },

  // Social Media
  social: {
    twitter: "https://twitter.com/stakefish",
    discord: "https://discord.gg/stakefish",
    telegram: "https://t.me/stakefish",
    reddit: "https://reddit.com/r/stakefish",
  },

  // Features
  features: [
    "Multi-cryptocurrency staking",
    "Professional infrastructure",
    "Competitive fees",
    "24/7 monitoring",
    "Regular payouts",
    "Governance participation",
    "Established reputation",
  ],

  // Staking Requirements
  requirements: {
    kyc: false,
    accountVerification: false,
    minimumAge: 18,
    supportedRegions: "Global",
    technicalRequirements: [
      "Tezos wallet",
      "1 XTZ minimum",
      "Delegation to Stake.fish",
    ],
  },

  // Risk Factors
  risks: [
    "Baker slashing risk",
    "Baker downtime",
    "Network participation risk",
    "Fee changes",
  ],

  // Integration Examples
  examples: {
    getStakingInfo: `
// Get staking information
const response = await fetch('https://api.stake.fish/v1/tezos/staking');
const staking = await response.json();
console.log('Staking info:', staking);
    `,
    
    getRewards: `
// Get rewards
const response = await fetch('https://api.stake.fish/v1/tezos/rewards');
const rewards = await response.json();
console.log('Rewards:', rewards);
    `,
    
    getValidators: `
// Get validators
const response = await fetch('https://api.stake.fish/v1/tezos/validators');
const validators = await response.json();
console.log('Validators:', validators);
    `,
  },
};

// Helper function to get staking info
export async function getStakingInfo() {
  try {
    const response = await fetch('https://api.stake.fish/v1/tezos/staking');
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
    const response = await fetch('https://api.stake.fish/v1/tezos/rewards');
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Error fetching rewards:', error);
  }
  return null;
}

// Helper function to get XTZ staking rate
export async function getXTZStakingRate() {
  try {
    // Stake.fish typically offers around 5-6% APY
    return 5.5;
  } catch (error) {
    console.error('Error fetching XTZ staking rate:', error);
  }
  return 0;
}

// Helper function to check if staking is available
export async function isStakingAvailable(): Promise<boolean> {
  try {
    const staking = await getStakingInfo();
    return staking && staking.available;
  } catch (error) {
    console.error('Error checking staking availability:', error);
    return false;
  }
}

// Helper function to get XTZ price from CoinGecko
export async function getXTZPrice(): Promise<number> {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=tezos&vs_currencies=usd');
    if (response.ok) {
      const data = await response.json();
      return data.tezos?.usd || 0;
    }
  } catch (error) {
    console.error('Error fetching XTZ price:', error);
  }
  return 0;
}

export default StakeFishStaking;
