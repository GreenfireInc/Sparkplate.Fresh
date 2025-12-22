// SpicySwap DeFi Staking for XTZ
// Community-driven DEX with innovative tokenomics

export const SpicySwapStaking = {
  name: "SpicySwap",
  type: "defi",
  website: "https://spicyswap.xyz/",
  description: "Community-driven DEX with innovative tokenomics and NFT features",
  liquidStakingToken: "N/A (LP tokens)",
  minimumStake: "1 XTZ",
  apy: "~5-12%",
  lockPeriod: "Variable",
  rewardsFrequency: "Per block",
  fees: "Trading fees + protocol fees",
  
  // API Information
  api: {
    baseUrl: "https://spicyb.sda.pro",
    documentation: "https://docs.spicyswap.xyz/",
    endpoints: {
      pools: "/pools",
      staking: "/staking",
      rewards: "/rewards",
      analytics: "/analytics",
    },
  },

  // SDK Information
  sdk: {
    npm: "spicyswap-sdk",
    github: "https://github.com/spicyswap/sdk",
    documentation: "https://docs.spicyswap.xyz/",
  },

  // Social Media
  social: {
    twitter: "https://twitter.com/spicyswap",
    discord: "https://discord.gg/spicyswap",
    telegram: "https://t.me/spicyswap",
    reddit: "https://reddit.com/r/spicyswap",
  },

  // Features
  features: [
    "Community-driven DEX",
    "Innovative tokenomics",
    "NFT features",
    "Liquidity provision",
    "Farming rewards",
    "Simple interface",
    "New token launches",
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
      "LP token provision",
    ],
  },

  // Risk Factors
  risks: [
    "Impermanent loss",
    "Smart contract risk",
    "Liquidity risk",
    "Market volatility",
  ],

  // Integration Examples
  examples: {
    getPools: `
// Get all pools
const response = await fetch('https://spicyb.sda.pro/pools');
const pools = await response.json();
console.log('Pools:', pools);
    `,
    
    getStakingInfo: `
// Get staking information
const response = await fetch('https://spicyb.sda.pro/staking');
const staking = await response.json();
console.log('Staking info:', staking);
    `,
    
    getRewards: `
// Get rewards
const response = await fetch('https://spicyb.sda.pro/rewards');
const rewards = await response.json();
console.log('Rewards:', rewards);
    `,
  },
};

// Helper function to get pools
export async function getPools() {
  try {
    const response = await fetch('https://spicyb.sda.pro/pools');
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
    const response = await fetch('https://spicyb.sda.pro/staking');
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
    const response = await fetch('https://spicyb.sda.pro/rewards');
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
    // SpicySwap typically offers around 5-12% APY depending on pool
    return 8.0;
  } catch (error) {
    console.error('Error fetching XTZ staking rate:', error);
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

export default SpicySwapStaking;
