// Cogent Liquid Staking for SOL
// Cogent Finance liquid staking protocol

export const CogentStaking = {
  name: "Cogent Finance",
  type: "liquid",
  website: "https://cogent.finance/",
  description: "Liquid staking protocol for SOL with cogentSOL token",
  liquidStakingToken: "cogentSOL",
  minimumStake: "0.1 SOL",
  apy: "~6-8%",
  lockPeriod: "No lockup (liquid)",
  rewardsFrequency: "Per epoch",
  fees: "Protocol fees",
  
  // API Information
  api: {
    baseUrl: "https://api.cogent.finance",
    documentation: "https://docs.cogent.finance/",
    endpoints: {
      pools: "/pools",
      staking: "/staking",
      rewards: "/rewards",
      analytics: "/analytics",
    },
  },

  // SDK Information
  sdk: {
    npm: "cogent-sdk",
    github: "https://github.com/cogent/sdk",
    documentation: "https://docs.cogent.finance/",
  },

  // Social Media
  social: {
    twitter: "https://twitter.com/cogentfinance",
    discord: "https://discord.gg/cogent",
    telegram: "https://t.me/cogent",
    reddit: "https://reddit.com/r/cogent",
  },

  // Features
  features: [
    "Liquid staking token (cogentSOL)",
    "No lockup period",
    "DeFi integrations",
    "Validator selection",
    "Real-time rewards",
    "Transparent fees",
    "Community governance",
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
      "cogentSOL token",
    ],
  },

  // Risk Factors
  risks: [
    "Smart contract risk",
    "Protocol fees",
    "Market volatility",
    "Liquidity risk",
  ],

  // Integration Examples
  examples: {
    getPools: `
// Get all pools
const response = await fetch('https://api.cogent.finance/pools');
const pools = await response.json();
console.log('Pools:', pools);
    `,
    
    getStakingInfo: `
// Get staking information
const response = await fetch('https://api.cogent.finance/staking');
const staking = await response.json();
console.log('Staking info:', staking);
    `,
    
    getRewards: `
// Get rewards
const response = await fetch('https://api.cogent.finance/rewards');
const rewards = await response.json();
console.log('Rewards:', rewards);
    `,
  },
};

// Helper function to get pools
export async function getPools() {
  try {
    const response = await fetch('https://api.cogent.finance/pools');
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Error fetching pools:', error);
  }
  return null;
}

// Helper function to get staking info
export async function getStakingInfo() {
  try {
    const response = await fetch('https://api.cogent.finance/staking');
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
    const response = await fetch('https://api.cogent.finance/rewards');
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
    // Cogent typically offers around 6-8% APY
    return 7.0;
  } catch (error) {
    console.error('Error fetching SOL staking rate:', error);
  }
  return 0;
}

// Helper function to check if staking is available
export async function isStakingAvailable(): Promise<boolean> {
  try {
    const pools = await getPools();
    return pools && pools.length > 0;
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

export default CogentStaking;
