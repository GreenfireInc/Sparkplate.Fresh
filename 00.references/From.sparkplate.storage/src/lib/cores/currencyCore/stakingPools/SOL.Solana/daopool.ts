// DAOPool Liquid Staking for SOL
// DAOPool liquid staking protocol

export const DAOPoolStaking = {
  name: "DAOPool",
  type: "liquid",
  website: "https://daopool.com/",
  description: "Liquid staking protocol for SOL with daoSOL token",
  liquidStakingToken: "daoSOL",
  minimumStake: "0.1 SOL",
  apy: "~6-8%",
  lockPeriod: "No lockup (liquid)",
  rewardsFrequency: "Per epoch",
  fees: "Protocol fees",
  
  // API Information
  api: {
    baseUrl: "https://api.daopool.com",
    documentation: "https://docs.daopool.com/",
    endpoints: {
      pools: "/pools",
      staking: "/staking",
      rewards: "/rewards",
      analytics: "/analytics",
    },
  },

  // SDK Information
  sdk: {
    npm: "daopool-sdk",
    github: "https://github.com/daopool/sdk",
    documentation: "https://docs.daopool.com/",
  },

  // Social Media
  social: {
    twitter: "https://twitter.com/daopool",
    discord: "https://discord.gg/daopool",
    telegram: "https://t.me/daopool",
    reddit: "https://reddit.com/r/daopool",
  },

  // Features
  features: [
    "Liquid staking token (daoSOL)",
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
      "daoSOL token",
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
const response = await fetch('https://api.daopool.com/pools');
const pools = await response.json();
console.log('Pools:', pools);
    `,
    
    getStakingInfo: `
// Get staking information
const response = await fetch('https://api.daopool.com/staking');
const staking = await response.json();
console.log('Staking info:', staking);
    `,
    
    getRewards: `
// Get rewards
const response = await fetch('https://api.daopool.com/rewards');
const rewards = await response.json();
console.log('Rewards:', rewards);
    `,
  },
};

// Helper function to get pools
export async function getPools() {
  try {
    const response = await fetch('https://api.daopool.com/pools');
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
    const response = await fetch('https://api.daopool.com/staking');
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
    const response = await fetch('https://api.daopool.com/rewards');
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
    // DAOPool typically offers around 6-8% APY
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

export default DAOPoolStaking;
