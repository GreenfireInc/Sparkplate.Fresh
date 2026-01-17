// TRONScan Super Representative for TRX
// TRONScan's Super Representative node

export const TronScanSR = {
  name: "TRONScan",
  type: "super_representative",
  website: "https://tronscan.org/",
  description: "TRONScan's Super Representative node for TRX voting and rewards",
  liquidStakingToken: "N/A (Native voting)",
  minimumStake: "1 TRX",
  apy: "~4-5%",
  lockPeriod: "No lockup (voting)",
  rewardsFrequency: "Per block",
  fees: "No fees",
  
  // API Information
  api: {
    baseUrl: "https://tronscan.io/api",
    documentation: "https://tronscan.io/api",
    endpoints: {
      sr: "/sr",
      votes: "/votes",
      rewards: "/rewards",
    },
  },

  // SDK Information
  sdk: {
    npm: "tronscan-sdk",
    github: "https://github.com/tronscan/sdk",
    documentation: "https://tronscan.io/api",
  },

  // Social Media
  social: {
    twitter: "https://twitter.com/tronscan",
    discord: "https://discord.gg/tronscan",
    telegram: "https://t.me/tronscan",
    reddit: "https://reddit.com/r/tronscan",
  },

  // Features
  features: [
    "Super Representative node",
    "Official block explorer",
    "No voting fees",
    "Regular rewards",
    "High uptime",
    "Community support",
    "Block explorer integration",
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
      "Voting capability",
    ],
  },

  // Risk Factors
  risks: [
    "SR performance risk",
    "Network participation risk",
    "Voting power changes",
  ],

  // Integration Examples
  examples: {
    getSRInfo: `
// Get SR information
const response = await fetch('https://tronscan.io/api/sr');
const sr = await response.json();
console.log('SR info:', sr);
    `,
    
    getVotes: `
// Get votes for SR
const response = await fetch('https://tronscan.io/api/votes');
const votes = await response.json();
console.log('Votes:', votes);
    `,
    
    getRewards: `
// Get rewards
const response = await fetch('https://tronscan.io/api/rewards');
const rewards = await response.json();
console.log('Rewards:', rewards);
    `,
  },
};

// Helper function to get SR info
export async function getSRInfo() {
  try {
    const response = await fetch('https://tronscan.io/api/sr');
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Error fetching SR info:', error);
  }
  return null;
}

// Helper function to get votes
export async function getVotes() {
  try {
    const response = await fetch('https://tronscan.io/api/votes');
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Error fetching votes:', error);
  }
  return null;
}

// Helper function to get rewards
export async function getRewards() {
  try {
    const response = await fetch('https://tronscan.io/api/rewards');
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
    // TRONScan SR typically offers around 4-5% APY
    return 4.5;
  } catch (error) {
    console.error('Error fetching TRX staking rate:', error);
  }
  return 0;
}

// Helper function to check if staking is available
export async function isStakingAvailable(): Promise<boolean> {
  try {
    const srInfo = await getSRInfo();
    return srInfo && srInfo.active;
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

export default TronScanSR;
