// Plenty DeFi Staking for XTZ
// Multi-feature DeFi platform with DEX, lending, and yield optimization

export const PlentyDeFiStaking = {
  name: "Plenty DeFi",
  type: "defi",
  website: "https://www.plentydefi.com/",
  description: "Comprehensive DeFi platform with DEX, lending, and yield optimization",
  liquidStakingToken: "N/A (LP tokens)",
  minimumStake: "1 XTZ",
  apy: "~8-20%",
  lockPeriod: "Variable",
  rewardsFrequency: "Per block",
  fees: "Trading fees + protocol fees",
  
  // API Information
  api: {
    baseUrl: "https://api.plentydefi.com",
    documentation: "https://docs.plentydefi.com/",
    endpoints: {
      pools: "/pools",
      staking: "/staking",
      rewards: "/rewards",
      analytics: "/analytics",
    },
  },

  // SDK Information
  sdk: {
    npm: "plenty-sdk",
    github: "https://github.com/plenty-defi/sdk",
    documentation: "https://docs.plentydefi.com/",
  },

  // Social Media
  social: {
    twitter: "https://twitter.com/plentydefi",
    discord: "https://discord.gg/plenty",
    telegram: "https://t.me/plentydefi",
    reddit: "https://reddit.com/r/plenty",
  },

  // Features
  features: [
    "Multi-feature DeFi platform",
    "DEX functionality",
    "Lending protocols",
    "Yield optimization",
    "Liquidity provision",
    "Farming rewards",
    "Governance participation",
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
const response = await fetch('https://api.plentydefi.com/pools');
const pools = await response.json();
console.log('Pools:', pools);
    `,
    
    getStakingInfo: `
// Get staking information
const response = await fetch('https://api.plentydefi.com/staking');
const staking = await response.json();
console.log('Staking info:', staking);
    `,
    
    getRewards: `
// Get rewards
const response = await fetch('https://api.plentydefi.com/rewards');
const rewards = await response.json();
console.log('Rewards:', rewards);
    `,
  },
};

// Helper function to get pools
export async function getPools() {
  try {
    const response = await fetch('https://api.plentydefi.com/pools');
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
    const response = await fetch('https://api.plentydefi.com/staking');
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
    const response = await fetch('https://api.plentydefi.com/rewards');
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
    // Plenty DeFi typically offers around 8-20% APY depending on pool
    return 15.0;
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

export default PlentyDeFiStaking;
