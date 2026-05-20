// Youves DeFi Staking for XTZ
// Synthetic assets platform with DEX

export const YouvesStaking = {
  name: "Youves",
  type: "defi",
  website: "https://youves.com/",
  description: "Decentralized platform for synthetic assets and stablecoins with DEX",
  liquidStakingToken: "N/A (LP tokens)",
  minimumStake: "1 XTZ",
  apy: "~10-25%",
  lockPeriod: "Variable",
  rewardsFrequency: "Per block",
  fees: "Trading fees + protocol fees",
  
  // API Information
  api: {
    baseUrl: "https://api.youves.com",
    documentation: "https://docs.youves.com/",
    endpoints: {
      pools: "/pools",
      staking: "/staking",
      rewards: "/rewards",
      synthetic: "/synthetic",
    },
  },

  // SDK Information
  sdk: {
    npm: "youves-sdk",
    github: "https://github.com/youves/sdk",
    documentation: "https://docs.youves.com/",
  },

  // Social Media
  social: {
    twitter: "https://twitter.com/youves_com",
    discord: "https://discord.gg/youves",
    telegram: "https://t.me/youves",
    reddit: "https://reddit.com/r/youves",
  },

  // Features
  features: [
    "Synthetic assets platform",
    "Stablecoin creation",
    "DEX functionality",
    "Farming rewards",
    "Governance participation",
    "Advanced DeFi strategies",
    "Liquidity provision",
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
    "Synthetic asset risk",
  ],

  // Integration Examples
  examples: {
    getPools: `
// Get all pools
const response = await fetch('https://api.youves.com/pools');
const pools = await response.json();
console.log('Pools:', pools);
    `,
    
    getStakingInfo: `
// Get staking information
const response = await fetch('https://api.youves.com/staking');
const staking = await response.json();
console.log('Staking info:', staking);
    `,
    
    getSyntheticAssets: `
// Get synthetic assets
const response = await fetch('https://api.youves.com/synthetic');
const synthetic = await response.json();
console.log('Synthetic assets:', synthetic);
    `,
  },
};

// Helper function to get pools
export async function getPools() {
  try {
    const response = await fetch('https://api.youves.com/pools');
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
    const response = await fetch('https://api.youves.com/staking');
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Error fetching staking info:', error);
  }
  return null;
}

// Helper function to get synthetic assets
export async function getSyntheticAssets() {
  try {
    const response = await fetch('https://api.youves.com/synthetic');
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Error fetching synthetic assets:', error);
  }
  return null;
}

// Helper function to get XTZ staking rate
export async function getXTZStakingRate() {
  try {
    // Youves typically offers around 10-25% APY depending on pool
    return 18.0;
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

export default YouvesStaking;
