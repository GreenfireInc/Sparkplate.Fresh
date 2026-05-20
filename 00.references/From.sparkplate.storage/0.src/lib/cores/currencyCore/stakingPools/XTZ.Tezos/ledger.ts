// Ledger Live Staking for XTZ
// Hardware wallet with delegation services

export const LedgerLiveStaking = {
  name: "Ledger Live",
  type: "wallet",
  website: "https://www.ledger.com/ledger-live",
  description: "Hardware wallet with built-in delegation services for Tezos staking",
  liquidStakingToken: "N/A (Hardware wallet)",
  minimumStake: "1 XTZ",
  apy: "~6%",
  lockPeriod: "No lockup (liquid delegation)",
  rewardsFrequency: "Per cycle (~2.5 days)",
  fees: "Baker fees (typically 5-15%)",
  
  // API Information
  api: {
    baseUrl: "https://api.ledger.com",
    documentation: "https://docs.ledger.com/",
    endpoints: {
      staking: "/v1/tezos/staking",
      rewards: "/v1/tezos/rewards",
      bakers: "/v1/tezos/bakers",
    },
  },

  // SDK Information
  sdk: {
    npm: "ledger-sdk",
    github: "https://github.com/LedgerHQ/sdk",
    documentation: "https://docs.ledger.com/",
  },

  // Social Media
  social: {
    twitter: "https://twitter.com/Ledger",
    discord: "https://discord.gg/ledger",
    telegram: "https://t.me/ledger",
    reddit: "https://reddit.com/r/ledger",
  },

  // Features
  features: [
    "Hardware wallet security",
    "Built-in delegation",
    "User-friendly interface",
    "Baker selection",
    "Real-time rewards tracking",
    "Mobile app support",
    "DApp integration",
  ],

  // Staking Requirements
  requirements: {
    kyc: false,
    accountVerification: false,
    minimumAge: 18,
    supportedRegions: "Global",
    technicalRequirements: [
      "Ledger hardware wallet",
      "Ledger Live app",
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
const response = await fetch('https://api.ledger.com/v1/tezos/staking');
const staking = await response.json();
console.log('Staking info:', staking);
    `,
    
    getRewards: `
// Get rewards
const response = await fetch('https://api.ledger.com/v1/tezos/rewards');
const rewards = await response.json();
console.log('Rewards:', rewards);
    `,
    
    getBakers: `
// Get available bakers
const response = await fetch('https://api.ledger.com/v1/tezos/bakers');
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
        totalStaked: "10000",
        apy: "0.06",
        bakers: 10,
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
          amount: "1.5",
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
    // Ledger Live typically offers around 6% APY
    return 6.0;
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

export default LedgerLiveStaking;
