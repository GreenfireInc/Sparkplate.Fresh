// mXRP (Midas) Liquid Staking for XRP
// First XRP liquid staking token

export const MXRPLiquidStaking = {
  name: "mXRP (Midas)",
  type: "liquid",
  website: "https://midas.xyz/",
  description: "Earn 6-8% APY on XRP through Midas' liquid staking token (mXRP) with DeFi integrations",
  liquidStakingToken: "mXRP",
  minimumStake: "1 XRP",
  apy: "~6-8%",
  lockPeriod: "Variable",
  rewardsFrequency: "Per block",
  fees: "Protocol fees",
  
  // API Information
  api: {
    baseUrl: "https://api.midas.xyz",
    documentation: "https://docs.midas.xyz",
    endpoints: {
      liquid: "/api/v1/liquid-staking",
      mxrp: "/api/v1/mxrp",
      rates: "/api/v1/rates",
    },
  },

  // SDK Information
  sdk: {
    npm: "midas-sdk",
    github: "https://github.com/midas-xyz/midas-sdk",
    documentation: "https://docs.midas.xyz",
  },

  // Social Media
  social: {
    twitter: "https://twitter.com/midas_xyz",
    discord: "https://discord.gg/midas",
    telegram: "https://t.me/midas_xyz",
    reddit: "https://reddit.com/r/midas",
  },

  // Features
  features: [
    "First XRP liquid staking token",
    "mXRP yield token",
    "DeFi integrations",
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
      "XRP wallet",
      "1 XRP minimum",
      "XRPL network access",
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
const response = await fetch('https://api.midas.xyz/api/v1/liquid-staking');
const liquid = await response.json();
console.log('Liquid staking info:', liquid);
    `,
    
    getMXRPInfo: `
// Get mXRP information
const response = await fetch('https://api.midas.xyz/api/v1/mxrp');
const mxrp = await response.json();
console.log('mXRP info:', mxrp);
    `,
    
    getRates: `
// Get current rates
const response = await fetch('https://api.midas.xyz/api/v1/rates');
const rates = await response.json();
console.log('Rates:', rates);
    `,
  },
};

// Helper function to get liquid staking info
export async function getLiquidStakingInfo() {
  try {
    const response = await fetch('https://api.midas.xyz/api/v1/liquid-staking');
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Error fetching liquid staking info:', error);
  }
  return null;
}

// Helper function to get mXRP info
export async function getMXRPInfo() {
  try {
    const response = await fetch('https://api.midas.xyz/api/v1/mxrp');
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Error fetching mXRP info:', error);
  }
  return null;
}

// Helper function to get rates
export async function getRates() {
  try {
    const response = await fetch('https://api.midas.xyz/api/v1/rates');
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Error fetching rates:', error);
  }
  return null;
}

// Helper function to check if earning is available
export async function isEarningAvailable(): Promise<boolean> {
  try {
    const liquidInfo = await getLiquidStakingInfo();
    return liquidInfo && liquidInfo.available;
  } catch (error) {
    console.error('Error checking earning availability:', error);
    return false;
  }
}

// Helper function to get XRP price from CoinGecko
export async function getXRPPrice(): Promise<number> {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ripple&vs_currencies=usd');
    if (response.ok) {
      const data = await response.json();
      return data.ripple?.usd || 0;
    }
  } catch (error) {
    console.error('Error fetching XRP price:', error);
  }
  return 0;
}

export default MXRPLiquidStaking;
