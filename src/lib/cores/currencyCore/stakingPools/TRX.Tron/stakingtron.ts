// Staking-Tron.com Staking for TRX
// Platform dedicated to TRON staking with various SR options

export const StakingTronStaking = {
  name: "Staking-Tron.com",
  type: "platform",
  website: "https://staking-tron.com/",
  description: "Platform dedicated to TRON staking with various Super Representative options",
  liquidStakingToken: "N/A (Platform staking)",
  minimumStake: "1 TRX",
  apy: "~4-6%",
  lockPeriod: "No lockup (voting)",
  rewardsFrequency: "Per block",
  fees: "Platform fees",
  
  // API Information
  api: {
    baseUrl: "https://api.staking-tron.com",
    documentation: "https://docs.staking-tron.com/",
    endpoints: {
      srs: "/srs",
      staking: "/staking",
      rewards: "/rewards",
      analytics: "/analytics",
    },
  },

  // SDK Information
  sdk: {
    npm: "staking-tron-sdk",
    github: "https://github.com/staking-tron/sdk",
    documentation: "https://docs.staking-tron.com/",
  },

  // Social Media
  social: {
    twitter: "https://twitter.com/stakingtron",
    discord: "https://discord.gg/stakingtron",
    telegram: "https://t.me/stakingtron",
    reddit: "https://reddit.com/r/stakingtron",
  },

  // Features
  features: [
    "Dedicated TRON staking platform",
    "Multiple SR options",
    "User-friendly interface",
    "Real-time analytics",
    "Reward tracking",
    "SR comparison",
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
      "Platform account",
    ],
  },

  // Risk Factors
  risks: [
    "Platform risk",
    "SR performance risk",
    "Network participation risk",
    "Platform fees",
  ],

  // Integration Examples
  examples: {
    getSRs: `
// Get available SRs
const response = await fetch('https://api.staking-tron.com/srs');
const srs = await response.json();
console.log('SRs:', srs);
    `,
    
    getStakingInfo: `
// Get staking information
const response = await fetch('https://api.staking-tron.com/staking');
const staking = await response.json();
console.log('Staking info:', staking);
    `,
    
    getAnalytics: `
// Get analytics
const response = await fetch('https://api.staking-tron.com/analytics');
const analytics = await response.json();
console.log('Analytics:', analytics);
    `,
  },
};

// Helper function to get SRs
export async function getSRs() {
  try {
    const response = await fetch('https://api.staking-tron.com/srs');
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Error fetching SRs:', error);
  }
  return null;
}

// Helper function to get staking info
export async function getStakingInfo() {
  try {
    const response = await fetch('https://api.staking-tron.com/staking');
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Error fetching staking info:', error);
  }
  return null;
}

// Helper function to get analytics
export async function getAnalytics() {
  try {
    const response = await fetch('https://api.staking-tron.com/analytics');
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Error fetching analytics:', error);
  }
  return null;
}

// Helper function to get TRX staking rate
export async function getTRXStakingRate() {
  try {
    // Staking-Tron.com typically offers around 4-6% APY
    return 5.0;
  } catch (error) {
    console.error('Error fetching TRX staking rate:', error);
  }
  return 0;
}

// Helper function to check if staking is available
export async function isStakingAvailable(): Promise<boolean> {
  try {
    const srs = await getSRs();
    return srs && srs.length > 0;
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

export default StakingTronStaking;
