// ViresFinance Staking for WAVES
// DeFi lending protocol with staking

export const ViresFinanceStaking = {
  name: "ViresFinance Staking",
  type: "defi",
  website: "https://vires.finance/",
  description: "Supply WAVES to lending pools and earn interest through DeFi lending protocol",
  liquidStakingToken: "vWAVES",
  minimumStake: "1 WAVES",
  apy: "~8-15%",
  lockPeriod: "Variable",
  rewardsFrequency: "Per block",
  fees: "Protocol fees",
  
  // API Information
  api: {
    baseUrl: "https://api.vires.finance",
    documentation: "https://docs.vires.finance",
    endpoints: {
      markets: "/api/v1/markets",
      supply: "/api/v1/supply",
      rewards: "/api/v1/rewards",
    },
  },

  // SDK Information
  sdk: {
    npm: "vires-sdk",
    github: "https://github.com/vires/vires-sdk",
    documentation: "https://docs.vires.finance",
  },

  // Social Media
  social: {
    twitter: "https://twitter.com/vires_finance",
    discord: "https://discord.gg/vires",
    telegram: "https://t.me/vires_finance",
    reddit: "https://reddit.com/r/vires",
  },

  // Features
  features: [
    "DeFi lending protocol",
    "Supply WAVES for interest",
    "vWAVES token rewards",
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
      "WAVES wallet",
      "1 WAVES minimum",
      "Waves Keeper connection",
    ],
  },

  // Risk Factors
  risks: [
    "Smart contract risk",
    "Liquidation risk",
    "Protocol fees",
    "Market volatility",
  ],

  // Integration Examples
  examples: {
    getMarkets: `
// Get lending markets
const response = await fetch('https://api.vires.finance/api/v1/markets');
const markets = await response.json();
console.log('Markets:', markets);
    `,
    
    getSupplyInfo: `
// Get supply information
const response = await fetch('https://api.vires.finance/api/v1/supply?asset=WAVES');
const supply = await response.json();
console.log('Supply info:', supply);
    `,
    
    getRewards: `
// Get rewards information
const response = await fetch('https://api.vires.finance/api/v1/rewards?address=YOUR_ADDRESS');
const rewards = await response.json();
console.log('Rewards:', rewards);
    `,
  },
};

// Helper function to get markets
export async function getMarkets() {
  try {
    const response = await fetch('https://api.vires.finance/api/v1/markets');
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Error fetching markets:', error);
  }
  return null;
}

// Helper function to get supply info
export async function getSupplyInfo(asset: string = 'WAVES') {
  try {
    const response = await fetch(`https://api.vires.finance/api/v1/supply?asset=${asset}`);
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Error fetching supply info:', error);
  }
  return null;
}

// Helper function to get rewards
export async function getRewards(address: string) {
  try {
    const response = await fetch(`https://api.vires.finance/api/v1/rewards?address=${address}`);
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
    const markets = await getMarkets();
    return markets && markets.length > 0;
  } catch (error) {
    console.error('Error checking staking availability:', error);
    return false;
  }
}

// Helper function to get WAVES price from CoinGecko
export async function getWAVESPrice(): Promise<number> {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=waves&vs_currencies=usd');
    if (response.ok) {
      const data = await response.json();
      return data.waves?.usd || 0;
    }
  } catch (error) {
    console.error('Error fetching WAVES price:', error);
  }
  return 0;
}

export default ViresFinanceStaking;
