// Guarda Wallet Staking for XTZ
// Non-custodial wallet with staking capabilities

export const GuardaWalletStaking = {
  name: "Guarda Wallet",
  type: "wallet",
  website: "https://guarda.com/staking/tezos-staking/",
  description: "Non-custodial wallet with built-in Tezos staking capabilities",
  liquidStakingToken: "N/A (Non-custodial)",
  minimumStake: "1 XTZ",
  apy: "~5-6%",
  lockPeriod: "No lockup (liquid delegation)",
  rewardsFrequency: "Per cycle (~2.5 days)",
  fees: "Baker fees (typically 5-15%)",
  
  // API Information
  api: {
    baseUrl: "https://api.guarda.com",
    documentation: "https://docs.guarda.com/",
    endpoints: {
      staking: "/v1/tezos/staking",
      rewards: "/v1/tezos/rewards",
      bakers: "/v1/tezos/bakers",
    },
  },

  // SDK Information
  sdk: {
    npm: "guarda-sdk",
    github: "https://github.com/guarda/sdk",
    documentation: "https://docs.guarda.com/",
  },

  // Social Media
  social: {
    twitter: "https://twitter.com/guarda_wallet",
    discord: "https://discord.gg/guarda",
    telegram: "https://t.me/guarda",
    reddit: "https://reddit.com/r/guarda",
  },

  // Features
  features: [
    "Non-custodial wallet",
    "Built-in staking",
    "User-controlled keys",
    "Baker selection",
    "Real-time rewards tracking",
    "Mobile app support",
    "Multi-platform support",
  ],

  // Staking Requirements
  requirements: {
    kyc: false,
    accountVerification: false,
    minimumAge: 18,
    supportedRegions: "Global",
    technicalRequirements: [
      "Guarda wallet",
      "1 XTZ minimum",
      "Baker selection",
    ],
  },

  // Risk Factors
  risks: [
    "Baker slashing risk",
    "Baker downtime",
    "Network participation risk",
    "Baker fee changes",
  ],

  // Integration Examples
  examples: {
    getStakingInfo: `
// Get staking information
const response = await fetch('https://api.guarda.com/v1/tezos/staking');
const staking = await response.json();
console.log('Staking info:', staking);
    `,
    
    getRewards: `
// Get rewards
const response = await fetch('https://api.guarda.com/v1/tezos/rewards');
const rewards = await response.json();
console.log('Rewards:', rewards);
    `,
    
    getBakers: `
// Get available bakers
const response = await fetch('https://api.guarda.com/v1/tezos/bakers');
const bakers = await response.json();
console.log('Bakers:', bakers);
    `,
  },
};

// Helper function to get staking info
export async function getStakingInfo() {
  try {
    // This would require API key authentication
    // For demonstration purposes, we'll return a mock response
    return {
      staking: {
        totalStaked: "5000",
        apy: "0.055",
        bakers: 8,
      },
    };
  } catch (error) {
    console.error('Error fetching staking info:', error);
  }
  return null;
}

// Helper function to get rewards
export async function getRewards() {
  try {
    // This would require API key authentication
    // For demonstration purposes, we'll return a mock response
    return {
      rewards: [
        {
          cycle: 500,
          amount: "1.2",
          status: "paid",
        },
      ],
    };
  } catch (error) {
    console.error('Error fetching rewards:', error);
  }
  return null;
}

// Helper function to get XTZ staking rate
export async function getXTZStakingRate() {
  try {
    // Guarda Wallet typically offers around 5-6% APY
    return 5.5;
  } catch (error) {
    console.error('Error fetching XTZ staking rate:', error);
  }
  return 0;
}

// Helper function to check if staking is available
export async function isStakingAvailable(): Promise<boolean> {
  try {
    const staking = await getStakingInfo();
    return staking && staking.staking;
  } catch (error) {
    console.error('Error checking staking availability:', error);
    return false;
  }
}

// Helper function to get XTZ price from CoinGecko
export async function getXTZPrice(): Promise<number> {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=tezos&vs_currencies=usd');
    if (response.ok) {
      const data = await response.json();
      return data.tezos?.usd || 0;
    }
  } catch (error) {
    console.error('Error fetching XTZ price:', error);
  }
  return 0;
}

export default GuardaWalletStaking;
