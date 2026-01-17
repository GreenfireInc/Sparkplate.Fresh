// Neutrino Staking for WAVES
// DeFi staking protocol

export const NeutrinoStaking = {
  name: "Neutrino Staking",
  type: "defi",
  website: "https://neutrino.at/",
  description: "Stake WAVES to mint USDN stablecoin and earn rewards through algorithmic stablecoin protocol",
  liquidStakingToken: "USDN",
  minimumStake: "1 WAVES",
  apy: "~8-12%",
  lockPeriod: "Variable",
  rewardsFrequency: "Per block",
  fees: "Protocol fees",
  
  // API Information
  api: {
    baseUrl: "https://api.neutrino.at",
    documentation: "https://docs.neutrino.at",
    endpoints: {
      staking: "/api/v1/staking",
      usdn: "/api/v1/usdn",
      rewards: "/api/v1/rewards",
    },
  },

  // SDK Information
  sdk: {
    npm: "neutrino-sdk",
    github: "https://github.com/neutrino/neutrino-sdk",
    documentation: "https://docs.neutrino.at",
  },

  // Social Media
  social: {
    twitter: "https://twitter.com/neutrino_at",
    discord: "https://discord.gg/neutrino",
    telegram: "https://t.me/neutrino_at",
    reddit: "https://reddit.com/r/neutrino",
  },

  // Features
  features: [
    "Algorithmic stablecoin protocol",
    "USDN token rewards",
    "Stablecoin minting",
    "Variable APY",
    "No slashing risk",
    "Community governance",
    "Cross-chain support",
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
    "Stablecoin depegging",
    "Protocol fees",
    "Market volatility",
  ],

  // Integration Examples
  examples: {
    getStakingInfo: `
// Get staking information
const response = await fetch('https://api.neutrino.at/api/v1/staking');
const staking = await response.json();
console.log('Staking info:', staking);
    `,
    
    getUSDNInfo: `
// Get USDN information
const response = await fetch('https://api.neutrino.at/api/v1/usdn');
const usdn = await response.json();
console.log('USDN info:', usdn);
    `,
    
    getRewards: `
// Get rewards information
const response = await fetch('https://api.neutrino.at/api/v1/rewards?address=YOUR_ADDRESS');
const rewards = await response.json();
console.log('Rewards:', rewards);
    `,
  },
};

// Helper function to get staking info
export async function getStakingInfo() {
  try {
    const response = await fetch('https://api.neutrino.at/api/v1/staking');
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Error fetching staking info:', error);
  }
  return null;
}

// Helper function to get USDN info
export async function getUSDNInfo() {
  try {
    const response = await fetch('https://api.neutrino.at/api/v1/usdn');
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Error fetching USDN info:', error);
  }
  return null;
}

// Helper function to get rewards
export async function getRewards(address: string) {
  try {
    const response = await fetch(`https://api.neutrino.at/api/v1/rewards?address=${address}`);
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
    const staking = await getStakingInfo();
    return staking && staking.available;
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

export default NeutrinoStaking;
