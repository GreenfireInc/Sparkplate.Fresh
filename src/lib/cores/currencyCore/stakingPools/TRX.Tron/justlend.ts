// JustLend DAO Staking for TRX
// DeFi lending protocol with staking

export const JustLendDAOStaking = {
  name: "JustLend DAO",
  type: "defi",
  website: "https://justlend.org/",
  description: "Supply TRX to lending pools and earn interest through DeFi protocol",
  liquidStakingToken: "jTRX",
  minimumStake: "1 TRX",
  apy: "~8-12%",
  lockPeriod: "Variable",
  rewardsFrequency: "Per block",
  fees: "Protocol fees",
  
  // API Information
  api: {
    baseUrl: "https://api.justlend.org",
    documentation: "https://docs.justlend.org",
    endpoints: {
      markets: "/api/v1/markets",
      supply: "/api/v1/supply",
      rewards: "/api/v1/rewards",
    },
  },

  // SDK Information
  sdk: {
    npm: "justlend-sdk",
    github: "https://github.com/justlend/justlend-sdk",
    documentation: "https://docs.justlend.org",
  },

  // Social Media
  social: {
    twitter: "https://twitter.com/justlend",
    discord: "https://discord.gg/justlend",
    telegram: "https://t.me/justlend",
    reddit: "https://reddit.com/r/justlend",
  },

  // Features
  features: [
    "DeFi lending protocol",
    "Supply TRX for interest",
    "jTRX token rewards",
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
      "TRX wallet",
      "1 TRX minimum",
      "TronLink connection",
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
const response = await fetch('https://api.justlend.org/api/v1/markets');
const markets = await response.json();
console.log('Markets:', markets);
    `,
    
    getSupplyInfo: `
// Get supply information
const response = await fetch('https://api.justlend.org/api/v1/supply?asset=TRX');
const supply = await response.json();
console.log('Supply info:', supply);
    `,
    
    getRewards: `
// Get rewards information
const response = await fetch('https://api.justlend.org/api/v1/rewards?address=YOUR_ADDRESS');
const rewards = await response.json();
console.log('Rewards:', rewards);
    `,
  },
};

// Helper function to get markets
export async function getMarkets() {
  try {
    const response = await fetch('https://api.justlend.org/api/v1/markets');
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Error fetching markets:', error);
  }
  return null;
}

// Helper function to get supply info
export async function getSupplyInfo(asset: string = 'TRX') {
  try {
    const response = await fetch(`https://api.justlend.org/api/v1/supply?asset=${asset}`);
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
    const response = await fetch(`https://api.justlend.org/api/v1/rewards?address=${address}`);
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

// Helper function to get TRX price from CoinGecko
export async function getTRXPrice(): Promise<number> {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=tron&vs_currencies=usd');
    if (response.ok) {
      const data = await response.json();
      return data.tron?.usd || 0;
    }
  } catch (error) {
    console.error('Error fetching TRX price:', error);
  }
  return 0;
}

export default JustLendDAOStaking;
