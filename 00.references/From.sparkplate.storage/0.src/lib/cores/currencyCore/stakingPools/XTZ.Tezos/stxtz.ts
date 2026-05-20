// StXTZ (Etherlink) Liquid Staking for XTZ
// DeFi integrations with liquid staking token

export const StXTZLiquidStaking = {
  name: "StXTZ (Etherlink)",
  type: "liquid",
  website: "https://stacy.fi/",
  description: "DeFi integrations with liquid staking token on Etherlink",
  liquidStakingToken: "StXTZ",
  minimumStake: "1 XTZ",
  apy: "~6-9%",
  lockPeriod: "Variable",
  rewardsFrequency: "Per block",
  fees: "Protocol fees",
  
  // API Information
  api: {
    baseUrl: "https://api.stacy.fi",
    documentation: "https://docs.stacy.fi/",
    endpoints: {
      liquid: "/v1/liquid-staking",
      stxtz: "/v1/stxtz",
      rewards: "/v1/rewards",
    },
  },

  // SDK Information
  sdk: {
    npm: "stacy-sdk",
    github: "https://github.com/stacy/sdk",
    documentation: "https://docs.stacy.fi/",
  },

  // Social Media
  social: {
    twitter: "https://twitter.com/stacy_fi",
    discord: "https://discord.gg/stacy",
    telegram: "https://t.me/stacy",
    reddit: "https://reddit.com/r/stacy",
  },

  // Features
  features: [
    "Liquid staking token (StXTZ)",
    "DeFi integrations",
    "Etherlink compatibility",
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
      "Tezos wallet",
      "1 XTZ minimum",
      "Etherlink network access",
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
    getLiquidStakingInfo: `
// Get liquid staking information
const response = await fetch('https://api.stacy.fi/v1/liquid-staking');
const liquid = await response.json();
console.log('Liquid staking info:', liquid);
    `,
    
    getStXTZInfo: `
// Get StXTZ information
const response = await fetch('https://api.stacy.fi/v1/stxtz');
const stxtz = await response.json();
console.log('StXTZ info:', stxtz);
    `,
    
    getRewards: `
// Get rewards
const response = await fetch('https://api.stacy.fi/v1/rewards');
const rewards = await response.json();
console.log('Rewards:', rewards);
    `,
  },
};

// Helper function to get liquid staking info
export async function getLiquidStakingInfo() {
  try {
    const response = await fetch('https://api.stacy.fi/v1/liquid-staking');
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Error fetching liquid staking info:', error);
  }
  return null;
}

// Helper function to get StXTZ info
export async function getStXTZInfo() {
  try {
    const response = await fetch('https://api.stacy.fi/v1/stxtz');
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Error fetching StXTZ info:', error);
  }
  return null;
}

// Helper function to get rewards
export async function getRewards() {
  try {
    const response = await fetch('https://api.stacy.fi/v1/rewards');
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Error fetching rewards:', error);
  }
  return null;
}

// Helper function to check if staking is available
export async function isStakingAvailable(): Promise<boolean> {
  try {
    const liquidInfo = await getLiquidStakingInfo();
    return liquidInfo && liquidInfo.available;
  } catch (error) {
    console.error('Error checking staking availability:', error);
    return false;
  }
}

// Helper function to get XTZ staking rate
export async function getXTZStakingRate() {
  try {
    // StXTZ typically offers around 6-9% APY
    return 7.5;
  } catch (error) {
    console.error('Error fetching XTZ staking rate:', error);
  }
  return 0;
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

export default StXTZLiquidStaking;
