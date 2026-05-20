// APENFT Marketplace Staking for TRX
// NFT platform staking

export const APENFTStaking = {
  name: "APENFT Marketplace Staking",
  type: "nft_platform",
  website: "https://apenft.io/",
  description: "Stake TRX to participate in APENFT ecosystem and earn rewards",
  liquidStakingToken: "N/A (Platform rewards)",
  minimumStake: "Variable",
  apy: "~6-10%",
  lockPeriod: "Variable",
  rewardsFrequency: "Regular payouts",
  fees: "Platform fees",
  
  // API Information
  api: {
    baseUrl: "https://api.apenft.io",
    documentation: "https://docs.apenft.io",
    endpoints: {
      staking: "/api/v1/staking",
      rewards: "/api/v1/rewards",
      nfts: "/api/v1/nfts",
    },
  },

  // SDK Information
  sdk: {
    npm: "apenft-sdk",
    github: "https://github.com/apenft/apenft-sdk",
    documentation: "https://docs.apenft.io",
  },

  // Social Media
  social: {
    twitter: "https://twitter.com/apenft",
    discord: "https://discord.gg/apenft",
    telegram: "https://t.me/apenft",
    reddit: "https://reddit.com/r/apenft",
  },

  // Features
  features: [
    "NFT platform staking",
    "TRX staking rewards",
    "NFT marketplace access",
    "Community participation",
    "Variable APY",
    "Platform integration",
    "Digital art ecosystem",
  ],

  // Staking Requirements
  requirements: {
    kyc: false,
    accountVerification: false,
    minimumAge: 18,
    supportedRegions: "Global",
    technicalRequirements: [
      "TRX wallet",
      "Platform account",
      "TronLink connection",
    ],
  },

  // Risk Factors
  risks: [
    "Platform risk",
    "NFT market volatility",
    "Platform fees",
    "Regulatory changes",
  ],

  // Integration Examples
  examples: {
    getStakingInfo: `
// Get staking information
const response = await fetch('https://api.apenft.io/api/v1/staking');
const staking = await response.json();
console.log('Staking info:', staking);
    `,
    
    getRewards: `
// Get rewards information
const response = await fetch('https://api.apenft.io/api/v1/rewards?address=YOUR_ADDRESS');
const rewards = await response.json();
console.log('Rewards:', rewards);
    `,
    
    getNFTs: `
// Get available NFTs
const response = await fetch('https://api.apenft.io/api/v1/nfts');
const nfts = await response.json();
console.log('NFTs:', nfts);
    `,
  },
};

// Helper function to get staking info
export async function getStakingInfo() {
  try {
    const response = await fetch('https://api.apenft.io/api/v1/staking');
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
    const response = await fetch(`https://api.apenft.io/api/v1/rewards?address=${address}`);
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Error fetching rewards:', error);
  }
  return null;
}

// Helper function to get NFTs
export async function getNFTs() {
  try {
    const response = await fetch('https://api.apenft.io/api/v1/nfts');
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Error fetching NFTs:', error);
  }
  return null;
}

// Helper function to check if staking is available
export async function isStakingAvailable(): Promise<boolean> {
  try {
    const staking = await getStakingInfo();
    return staking && staking.available;
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

export default APENFTStaking;
