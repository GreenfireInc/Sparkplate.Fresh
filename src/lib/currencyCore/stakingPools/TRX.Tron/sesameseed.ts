// Sesameseed Super Representative for TRX
// Community-driven Super Representative

export const SesameseedSR = {
  name: "Sesameseed",
  type: "super_representative",
  website: "https://www.sesameseed.org/",
  description: "Community-driven Super Representative with additional rewards and governance",
  liquidStakingToken: "N/A (Native voting)",
  minimumStake: "1 TRX",
  apy: "~5-6%",
  lockPeriod: "No lockup (voting)",
  rewardsFrequency: "Per block",
  fees: "No fees",
  
  // API Information
  api: {
    baseUrl: "https://api.sesameseed.org",
    documentation: "https://api.sesameseed.org/",
    endpoints: {
      sr: "/sr",
      votes: "/votes",
      rewards: "/rewards",
      community: "/community",
    },
  },

  // SDK Information
  sdk: {
    npm: "sesameseed-sdk",
    github: "https://github.com/sesameseed/sdk",
    documentation: "https://api.sesameseed.org/",
  },

  // Social Media
  social: {
    twitter: "https://twitter.com/sesameseed",
    discord: "https://discord.gg/sesameseed",
    telegram: "https://t.me/sesameseed",
    reddit: "https://reddit.com/r/sesameseed",
  },

  // Features
  features: [
    "Community-driven SR",
    "Additional rewards",
    "Governance participation",
    "No voting fees",
    "Regular rewards",
    "High uptime",
    "Community support",
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
const response = await fetch('https://api.sesameseed.org/sr');
const sr = await response.json();
console.log('SR info:', sr);
    `,
    
    getVotes: `
// Get votes for SR
const response = await fetch('https://api.sesameseed.org/votes');
const votes = await response.json();
console.log('Votes:', votes);
    `,
    
    getCommunityStats: `
// Get community statistics
const response = await fetch('https://api.sesameseed.org/community');
const community = await response.json();
console.log('Community stats:', community);
    `,
  },
};

// Helper function to get SR info
export async function getSRInfo() {
  try {
    const response = await fetch('https://api.sesameseed.org/sr');
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
    const response = await fetch('https://api.sesameseed.org/votes');
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Error fetching votes:', error);
  }
  return null;
}

// Helper function to get community stats
export async function getCommunityStats() {
  try {
    const response = await fetch('https://api.sesameseed.org/community');
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Error fetching community stats:', error);
  }
  return null;
}

// Helper function to get TRX staking rate
export async function getTRXStakingRate() {
  try {
    // Sesameseed typically offers around 5-6% APY
    return 5.5;
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

export default SesameseedSR;
