// Ultra Stellar (yXLM) for XLM
// DeFi platform with yield token

export const UltraStellarEarning = {
  name: "Ultra Stellar (yXLM)",
  type: "defi",
  website: "https://ultrastellar.com/",
  description: "Earn 5% APY on XLM through Ultra Stellar's yield token (yXLM) with 1:1 XLM backing",
  liquidStakingToken: "yXLM",
  minimumStake: "1 XLM",
  apy: "~5%",
  lockPeriod: "Variable",
  rewardsFrequency: "Per block",
  fees: "Protocol fees",
  
  // API Information
  api: {
    baseUrl: "https://api.ultrastellar.com",
    documentation: "https://docs.ultrastellar.com",
    endpoints: {
      yield: "/api/v1/yield",
      yxlm: "/api/v1/yxlm",
      rates: "/api/v1/rates",
    },
  },

  // SDK Information
  sdk: {
    npm: "ultrastellar-sdk",
    github: "https://github.com/ultrastellar/ultrastellar-sdk",
    documentation: "https://docs.ultrastellar.com",
  },

  // Social Media
  social: {
    twitter: "https://twitter.com/ultrastellar",
    discord: "https://discord.gg/ultrastellar",
    telegram: "https://t.me/ultrastellar",
    reddit: "https://reddit.com/r/ultrastellar",
  },

  // Features
  features: [
    "DeFi yield platform",
    "yXLM yield token",
    "1:1 XLM backing",
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
      "1 XLM minimum",
      "Stellar network access",
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
    getYieldInfo: `
// Get yield information
const response = await fetch('https://api.ultrastellar.com/api/v1/yield');
const yield = await response.json();
console.log('Yield info:', yield);
    `,
    
    getYXLMInfo: `
// Get yXLM information
const response = await fetch('https://api.ultrastellar.com/api/v1/yxlm');
const yxlm = await response.json();
console.log('yXLM info:', yxlm);
    `,
    
    getRates: `
// Get current rates
const response = await fetch('https://api.ultrastellar.com/api/v1/rates');
const rates = await response.json();
console.log('Rates:', rates);
    `,
  },
};

// Helper function to get yield info
export async function getYieldInfo() {
  try {
    const response = await fetch('https://api.ultrastellar.com/api/v1/yield');
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Error fetching yield info:', error);
  }
  return null;
}

// Helper function to get yXLM info
export async function getYXLMInfo() {
  try {
    const response = await fetch('https://api.ultrastellar.com/api/v1/yxlm');
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Error fetching yXLM info:', error);
  }
  return null;
}

// Helper function to get rates
export async function getRates() {
  try {
    const response = await fetch('https://api.ultrastellar.com/api/v1/rates');
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
    const yieldInfo = await getYieldInfo();
    return yieldInfo && yieldInfo.available;
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

export default UltraStellarEarning;
