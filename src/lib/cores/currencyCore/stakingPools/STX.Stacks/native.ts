// Native Stacking for Stacks (STX)
// Direct delegation to validators

export const NativeStaking = {
  name: "Native Stacking",
  type: "Native Stacking",
  website: "https://stacks.co/stacking",
  description: "Direct delegation to validators for maximum decentralization",
  liquidStakingToken: "N/A (Native STX)",
  minimumStake: "100,000 STX",
  apy: "~10%",
  lockPeriod: "Variable (cycle dependent)",
  rewardsFrequency: "Per cycle",
  fees: "Validator fees only",
  
  // API Information
  api: {
    baseUrl: "https://api.stacks.co",
    documentation: "https://docs.stacks.co",
    endpoints: {
      stacking: "/v2/stacking",
      rewards: "/v2/stacking/rewards",
      balance: "/v2/accounts",
    },
  },

  // SDK Information
  sdk: {
    npm: "@stacks/stacking",
    github: "https://github.com/stacks-network/stacks.js",
    documentation: "https://docs.stacks.co",
  },

  // Social Media
  social: {
    twitter: "https://twitter.com/stacks",
    discord: "https://discord.gg/stacks",
    telegram: "https://t.me/stacks",
    reddit: "https://reddit.com/r/stacks",
  },

  // Features
  features: [
    "Direct delegation",
    "Maximum decentralization",
    "No middleman",
    "Validator selection",
    "Cycle-based rewards",
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
      "STX wallet",
      "100,000 STX minimum",
      "Validator selection",
    ],
  },

  // Risk Factors
  risks: [
    "Validator slashing risk",
    "Technical complexity",
    "Minimum stake requirement",
    "Cycle timing",
  ],

  // Integration Examples
  examples: {
    getStackingInfo: `
// Get stacking information
const response = await fetch('https://api.stacks.co/v2/stacking');
const data = await response.json();
console.log('Stacking info:', data);
    `,
    
    getRewards: `
// Get stacking rewards
const response = await fetch('https://api.stacks.co/v2/stacking/rewards');
const rewards = await response.json();
console.log('Rewards:', rewards);
    `,
    
    getBalance: `
// Get account balance
const response = await fetch('https://api.stacks.co/v2/accounts/YOUR_ADDRESS');
const balance = await response.json();
console.log('Balance:', balance);
    `,
  },
};

// Helper function to get stacking info
export async function getStackingInfo() {
  try {
    const response = await fetch('https://api.stacks.co/v2/stacking');
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Error fetching stacking info:', error);
  }
  return null;
}

// Helper function to get rewards
export async function getRewards() {
  try {
    const response = await fetch('https://api.stacks.co/v2/stacking/rewards');
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
    const response = await fetch(`https://api.stacks.co/v2/accounts/${address}`);
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Error fetching balance:', error);
  }
  return null;
}

// Helper function to check if stacking is available
export async function isStackingAvailable(): Promise<boolean> {
  try {
    const info = await getStackingInfo();
    return info && info.isStacking;
  } catch (error) {
    console.error('Error checking stacking availability:', error);
    return false;
  }
}

// Helper function to get STX price from CoinGecko
export async function getSTXPrice(): Promise<number> {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=blockstack&vs_currencies=usd');
    if (response.ok) {
      const data = await response.json();
      return data.blockstack?.usd || 0;
    }
  } catch (error) {
    console.error('Error fetching STX price:', error);
  }
  return 0;
}

export default NativeStaking;
