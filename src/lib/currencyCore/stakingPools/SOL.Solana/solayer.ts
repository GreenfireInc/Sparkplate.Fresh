// Solayer Liquid Staking for SOL
// Solayer L2 staking with oracle price feeds

export const SolayerStaking = {
  name: "Solayer",
  type: "liquid",
  website: "https://solayer.org/",
  description: "L2 staking protocol with oracle price feeds and sSOL token",
  liquidStakingToken: "sSOL",
  minimumStake: "0.1 SOL",
  apy: "~6-7%",
  lockPeriod: "No lockup (liquid)",
  rewardsFrequency: "Per epoch",
  fees: "Protocol fees",
  
  // API Information
  api: {
    baseUrl: "https://api.solayer.org",
    documentation: "https://docs.solayer.org/",
    endpoints: {
      pools: "/pools",
      staking: "/staking",
      rewards: "/rewards",
      oracle: "/oracle",
    },
  },

  // SDK Information
  sdk: {
    npm: "solayer-sdk",
    github: "https://github.com/solayer/sdk",
    documentation: "https://docs.solayer.org/",
  },

  // Social Media
  social: {
    twitter: "https://twitter.com/solayer",
    discord: "https://discord.gg/solayer",
    telegram: "https://t.me/solayer",
    reddit: "https://reddit.com/r/solayer",
  },

  // Features
  features: [
    "L2 staking protocol",
    "Oracle price feeds",
    "Liquid staking token (sSOL)",
    "No lockup period",
    "DeFi integrations",
    "Real-time rewards",
    "Transparent fees",
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
      "sSOL token",
    ],
  },

  // Risk Factors
  risks: [
    "Smart contract risk",
    "Protocol fees",
    "Market volatility",
    "Liquidity risk",
    "L2 risk",
  ],

  // Integration Examples
  examples: {
    getPools: `
// Get all pools
const response = await fetch('https://api.solayer.org/pools');
const pools = await response.json();
console.log('Pools:', pools);
    `,
    
    getStakingInfo: `
// Get staking information
const response = await fetch('https://api.solayer.org/staking');
const staking = await response.json();
console.log('Staking info:', staking);
    `,
    
    getOracleData: `
// Get oracle data
const response = await fetch('https://api.solayer.org/oracle');
const oracle = await response.json();
console.log('Oracle data:', oracle);
    `,
  },
};

// Helper function to get pools
export async function getPools() {
  try {
    const response = await fetch('https://api.solayer.org/pools');
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
    const response = await fetch('https://api.solayer.org/staking');
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Error fetching staking info:', error);
  }
  return null;
}

// Helper function to get oracle data
export async function getOracleData() {
  try {
    const response = await fetch('https://api.solayer.org/oracle');
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Error fetching oracle data:', error);
  }
  return null;
}

// Helper function to get SOL staking rate
export async function getSOLStakingRate() {
  try {
    // Solayer typically offers around 6-7% APY
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

export default SolayerStaking;
