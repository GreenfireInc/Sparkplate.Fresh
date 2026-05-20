// SUN.io Staking for TRX
// DeFi staking and yield farming

export const SUNIOStaking = {
  name: "SUN.io Staking",
  type: "defi",
  website: "https://sun.io/",
  description: "Stake TRX and earn SUN tokens through liquidity mining and yield farming",
  liquidStakingToken: "SUN",
  minimumStake: "1 TRX",
  apy: "~10-15%",
  lockPeriod: "Variable",
  rewardsFrequency: "Per block",
  fees: "Protocol fees",
  
  // API Information
  api: {
    baseUrl: "https://api.sun.io",
    documentation: "https://docs.sun.io",
    endpoints: {
      pools: "/api/v1/pools",
      staking: "/api/v1/staking",
      rewards: "/api/v1/rewards",
    },
  },

  // SDK Information
  sdk: {
    npm: "sun-sdk",
    github: "https://github.com/sun-io/sun-sdk",
    documentation: "https://docs.sun.io",
  },

  // Social Media
  social: {
    twitter: "https://twitter.com/sun_io",
    discord: "https://discord.gg/sun",
    telegram: "https://t.me/sun_io",
    reddit: "https://reddit.com/r/sun_io",
  },

  // Features
  features: [
    "DeFi staking protocol",
    "SUN token rewards",
    "Liquidity mining",
    "Yield farming",
    "Variable APY",
    "No lockup period",
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
    "Impermanent loss",
    "Protocol fees",
    "Market volatility",
  ],

  // Integration Examples
  examples: {
    getPools: `
// Get staking pools
const response = await fetch('https://api.sun.io/api/v1/pools');
const pools = await response.json();
console.log('Pools:', pools);
    `,
    
    getStakingInfo: `
// Get staking information
const response = await fetch('https://api.sun.io/api/v1/staking?asset=TRX');
const staking = await response.json();
console.log('Staking info:', staking);
    `,
    
    getRewards: `
// Get rewards information
const response = await fetch('https://api.sun.io/api/v1/rewards?address=YOUR_ADDRESS');
const rewards = await response.json();
console.log('Rewards:', rewards);
    `,
  },
};

// Helper function to get pools
export async function getPools() {
  try {
    const response = await fetch('https://api.sun.io/api/v1/pools');
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Error fetching pools:', error);
  }
  return null;
}

// Helper function to get staking info
export async function getStakingInfo(asset: string = 'TRX') {
  try {
    const response = await fetch(`https://api.sun.io/api/v1/staking?asset=${asset}`);
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Error fetching staking info:', error);
  }
  return null;
}

// Helper function to get rewards
export async function getRewards(address: string) {
  try {
    const response = await fetch(`https://api.sun.io/api/v1/rewards?address=${address}`);
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
    const pools = await getPools();
    return pools && pools.length > 0;
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

export default SUNIOStaking;
