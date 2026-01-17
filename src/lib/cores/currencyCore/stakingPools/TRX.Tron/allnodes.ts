// Allnodes TRON Staking for TRX
// Infrastructure provider with TRON staking API

export const AllnodesStaking = {
  name: "Allnodes",
  type: "infrastructure",
  website: "https://allnodes.com/",
  description: "Infrastructure provider with TRON staking API for delegating and undelegating tokens",
  liquidStakingToken: "N/A (Infrastructure service)",
  minimumStake: "1 TRX",
  apy: "~4-5%",
  lockPeriod: "No lockup (voting)",
  rewardsFrequency: "Per block",
  fees: "Service fees",
  
  // API Information
  api: {
    baseUrl: "https://api.allnodes.com",
    documentation: "https://docs.allnodes.com/",
    endpoints: {
      tron: "/v1/tron",
      staking: "/v1/tron/staking",
      rewards: "/v1/tron/rewards",
    },
  },

  // SDK Information
  sdk: {
    npm: "allnodes-sdk",
    github: "https://github.com/allnodes/sdk",
    documentation: "https://docs.allnodes.com/",
  },

  // Social Media
  social: {
    twitter: "https://twitter.com/allnodes",
    discord: "https://discord.gg/allnodes",
    telegram: "https://t.me/allnodes",
    reddit: "https://reddit.com/r/allnodes",
  },

  // Features
  features: [
    "Infrastructure provider",
    "TRON staking API",
    "Delegation services",
    "Professional infrastructure",
    "High uptime",
    "API integration",
    "Multi-blockchain support",
  ],

  // Staking Requirements
  requirements: {
    kyc: false,
    accountVerification: false,
    minimumAge: 18,
    supportedRegions: "Global",
    technicalRequirements: [
      "Tron wallet",
      "1 TRX minimum",
      "API access",
    ],
  },

  // Risk Factors
  risks: [
    "Service risk",
    "API dependency",
    "Infrastructure risk",
    "Service fees",
  ],

  // Integration Examples
  examples: {
    getTronInfo: `
// Get TRON information
const response = await fetch('https://api.allnodes.com/v1/tron');
const tron = await response.json();
console.log('TRON info:', tron);
    `,
    
    getStakingInfo: `
// Get staking information
const response = await fetch('https://api.allnodes.com/v1/tron/staking');
const staking = await response.json();
console.log('Staking info:', staking);
    `,
    
    getRewards: `
// Get rewards
const response = await fetch('https://api.allnodes.com/v1/tron/rewards');
const rewards = await response.json();
console.log('Rewards:', rewards);
    `,
  },
};

// Helper function to get TRON info
export async function getTronInfo() {
  try {
    const response = await fetch('https://api.allnodes.com/v1/tron');
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Error fetching TRON info:', error);
  }
  return null;
}

// Helper function to get staking info
export async function getStakingInfo() {
  try {
    const response = await fetch('https://api.allnodes.com/v1/tron/staking');
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Error fetching staking info:', error);
  }
  return null;
}

// Helper function to get rewards
export async function getRewards() {
  try {
    const response = await fetch('https://api.allnodes.com/v1/tron/rewards');
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Error fetching rewards:', error);
  }
  return null;
}

// Helper function to get TRX staking rate
export async function getTRXStakingRate() {
  try {
    // Allnodes typically offers around 4-5% APY
    return 4.5;
  } catch (error) {
    console.error('Error fetching TRX staking rate:', error);
  }
  return 0;
}

// Helper function to check if staking is available
export async function isStakingAvailable(): Promise<boolean> {
  try {
    const tronInfo = await getTronInfo();
    return tronInfo && tronInfo.available;
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

export default AllnodesStaking;
