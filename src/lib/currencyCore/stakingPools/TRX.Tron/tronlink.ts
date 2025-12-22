// TronLink Wallet Staking for TRX
// Wallet-based staking

export const TronLinkStaking = {
  name: "TronLink Wallet Staking",
  type: "wallet",
  website: "https://www.tronlink.org/",
  description: "Vote for SRs directly through TronLink wallet interface",
  liquidStakingToken: "N/A (Native TRX voting)",
  minimumStake: "1 TRX",
  apy: "~5-8%",
  lockPeriod: "Variable (cycle dependent)",
  rewardsFrequency: "Per block",
  fees: "SR fees only",
  
  // API Information
  api: {
    baseUrl: "https://api.tronlink.org",
    documentation: "https://docs.tronlink.org",
    endpoints: {
      voting: "/api/v1/voting",
      rewards: "/api/v1/rewards",
      balance: "/api/v1/balance",
    },
  },

  // SDK Information
  sdk: {
    npm: "tronlink-sdk",
    github: "https://github.com/tronlink/tronlink-sdk",
    documentation: "https://docs.tronlink.org",
  },

  // Social Media
  social: {
    twitter: "https://twitter.com/tronlink",
    discord: "https://discord.gg/tronlink",
    telegram: "https://t.me/tronlink",
    reddit: "https://reddit.com/r/tronlink",
  },

  // Features
  features: [
    "Wallet-based staking",
    "Direct SR voting",
    "User-friendly interface",
    "Mobile app support",
    "Real-time rewards",
    "No lockup period",
    "Community participation",
  ],

  // Staking Requirements
  requirements: {
    kyc: false,
    accountVerification: false,
    minimumAge: 18,
    supportedRegions: "Global",
    technicalRequirements: [
      "TronLink wallet",
      "1 TRX minimum",
      "SR selection",
    ],
  },

  // Risk Factors
  risks: [
    "SR performance risk",
    "Wallet security",
    "User error",
    "Network fees",
  ],

  // Integration Examples
  examples: {
    getVotingInfo: `
// Get voting information
const response = await fetch('https://api.tronlink.org/api/v1/voting?address=YOUR_ADDRESS');
const voting = await response.json();
console.log('Voting info:', voting);
    `,
    
    getRewards: `
// Get rewards information
const response = await fetch('https://api.tronlink.org/api/v1/rewards?address=YOUR_ADDRESS');
const rewards = await response.json();
console.log('Rewards:', rewards);
    `,
    
    getBalance: `
// Get wallet balance
const response = await fetch('https://api.tronlink.org/api/v1/balance?address=YOUR_ADDRESS');
const balance = await response.json();
console.log('Balance:', balance);
    `,
  },
};

// Helper function to get voting info
export async function getVotingInfo(address: string) {
  try {
    const response = await fetch(`https://api.tronlink.org/api/v1/voting?address=${address}`);
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Error fetching voting info:', error);
  }
  return null;
}

// Helper function to get rewards
export async function getRewards(address: string) {
  try {
    const response = await fetch(`https://api.tronlink.org/api/v1/rewards?address=${address}`);
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Error fetching rewards:', error);
  }
  return null;
}

// Helper function to get balance
export async function getBalance(address: string) {
  try {
    const response = await fetch(`https://api.tronlink.org/api/v1/balance?address=${address}`);
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Error fetching balance:', error);
  }
  return null;
}

// Helper function to check if staking is available
export async function isStakingAvailable(): Promise<boolean> {
  try {
    // This would check if the user has sufficient balance and is eligible
    return true;
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

export default TronLinkStaking;
