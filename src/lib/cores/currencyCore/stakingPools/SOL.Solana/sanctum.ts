// Sanctum Liquid Staking for SOL
// Phantom wallet integrated liquid staking

export const SanctumStaking = {
  name: "Sanctum",
  type: "liquid",
  website: "https://sanctum.so/",
  description: "Phantom wallet integrated liquid staking with small variable fees",
  liquidStakingToken: "N/A (Integrated staking)",
  minimumStake: "0.1 SOL",
  apy: "~6-7%",
  lockPeriod: "No lockup (liquid)",
  rewardsFrequency: "Per epoch",
  fees: "Small variable fees",
  
  // API Information
  api: {
    baseUrl: "https://api.sanctum.so",
    documentation: "https://docs.sanctum.so/",
    endpoints: {
      pools: "/pools",
      staking: "/staking",
      rewards: "/rewards",
      phantom: "/phantom",
    },
  },

  // SDK Information
  sdk: {
    npm: "sanctum-sdk",
    github: "https://github.com/sanctum/sdk",
    documentation: "https://docs.sanctum.so/",
  },

  // Social Media
  social: {
    twitter: "https://twitter.com/sanctum",
    discord: "https://discord.gg/sanctum",
    telegram: "https://t.me/sanctum",
    reddit: "https://reddit.com/r/sanctum",
  },

  // Features
  features: [
    "Phantom wallet integration",
    "Liquid staking",
    "Small variable fees",
    "No lockup period",
    "DeFi integrations",
    "Real-time rewards",
    "User-friendly interface",
  ],

  // Staking Requirements
  requirements: {
    kyc: false,
    accountVerification: false,
    minimumAge: 18,
    supportedRegions: "Global",
    technicalRequirements: [
      "Phantom wallet",
      "0.1 SOL minimum",
      "Sanctum integration",
    ],
  },

  // Risk Factors
  risks: [
    "Smart contract risk",
    "Variable fees",
    "Market volatility",
    "Liquidity risk",
  ],

  // Integration Examples
  examples: {
    getPools: `
// Get all pools
const response = await fetch('https://api.sanctum.so/pools');
const pools = await response.json();
console.log('Pools:', pools);
    `,
    
    getStakingInfo: `
// Get staking information
const response = await fetch('https://api.sanctum.so/staking');
const staking = await response.json();
console.log('Staking info:', staking);
    `,
    
    getPhantomIntegration: `
// Get Phantom integration info
const response = await fetch('https://api.sanctum.so/phantom');
const phantom = await response.json();
console.log('Phantom integration:', phantom);
    `,
  },
};

// Helper function to get pools
export async function getPools() {
  try {
    const response = await fetch('https://api.sanctum.so/pools');
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
    const response = await fetch('https://api.sanctum.so/staking');
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Error fetching staking info:', error);
  }
  return null;
}

// Helper function to get Phantom integration info
export async function getPhantomIntegration() {
  try {
    const response = await fetch('https://api.sanctum.so/phantom');
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Error fetching Phantom integration:', error);
  }
  return null;
}

// Helper function to get SOL staking rate
export async function getSOLStakingRate() {
  try {
    // Sanctum typically offers around 6-7% APY
    return 6.5;
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

export default SanctumStaking;
