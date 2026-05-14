// Aqua Rewards for XLM
// Liquidity rewards protocol

export const AquaRewards = {
  name: "Aqua Rewards",
  type: "defi",
  website: "https://aqua.network/",
  description: "Earn AQUA tokens by providing liquidity to Stellar DEX and participating in governance",
  liquidStakingToken: "AQUA",
  minimumStake: "10 XLM",
  apy: "~3-8%",
  lockPeriod: "Variable",
  rewardsFrequency: "Per block",
  fees: "Protocol fees",
  
  // API Information
  api: {
    baseUrl: "https://api.aqua.network",
    documentation: "https://docs.aqua.network",
    endpoints: {
      rewards: "/api/v1/rewards",
      liquidity: "/api/v1/liquidity",
      governance: "/api/v1/governance",
    },
  },

  // SDK Information
  sdk: {
    npm: "aqua-sdk",
    github: "https://github.com/aqua-network/aqua-sdk",
    documentation: "https://docs.aqua.network",
  },

  // Social Media
  social: {
    twitter: "https://twitter.com/aqua_network",
    discord: "https://discord.gg/aqua",
    telegram: "https://t.me/aqua_network",
    reddit: "https://reddit.com/r/aqua",
  },

  // Features
  features: [
    "Liquidity rewards protocol",
    "AQUA token rewards",
    "Governance participation",
    "Variable APY",
    "No lockup period",
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
      "XLM wallet",
      "10 XLM minimum",
      "Stellar network access",
    ],
  },

  // Risk Factors
  risks: [
    "Smart contract risk",
    "Liquidity risk",
    "Protocol fees",
    "Market volatility",
  ],

  // Integration Examples
  examples: {
    getRewards: `
// Get rewards information
const response = await fetch('https://api.aqua.network/api/v1/rewards');
const rewards = await response.json();
console.log('Rewards:', rewards);
    `,
    
    getLiquidity: `
// Get liquidity information
const response = await fetch('https://api.aqua.network/api/v1/liquidity');
const liquidity = await response.json();
console.log('Liquidity:', liquidity);
    `,
    
    getGovernance: `
// Get governance information
const response = await fetch('https://api.aqua.network/api/v1/governance');
const governance = await response.json();
console.log('Governance:', governance);
    `,
  },
};

// Helper function to get rewards
export async function getRewards() {
  try {
    const response = await fetch('https://api.aqua.network/api/v1/rewards');
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Error fetching rewards:', error);
  }
  return null;
}

// Helper function to get liquidity info
export async function getLiquidityInfo() {
  try {
    const response = await fetch('https://api.aqua.network/api/v1/liquidity');
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Error fetching liquidity info:', error);
  }
  return null;
}

// Helper function to get governance info
export async function getGovernanceInfo() {
  try {
    const response = await fetch('https://api.aqua.network/api/v1/governance');
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Error fetching governance info:', error);
  }
  return null;
}

// Helper function to check if earning is available
export async function isEarningAvailable(): Promise<boolean> {
  try {
    const rewards = await getRewards();
    return rewards && rewards.available;
  } catch (error) {
    console.error('Error checking earning availability:', error);
    return false;
  }
}

// Helper function to get XLM price from CoinGecko
export async function getXLMPrice(): Promise<number> {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=stellar&vs_currencies=usd');
    if (response.ok) {
      const data = await response.json();
      return data.stellar?.usd || 0;
    }
  } catch (error) {
    console.error('Error fetching XLM price:', error);
  }
  return 0;
}

export default AquaRewards;
