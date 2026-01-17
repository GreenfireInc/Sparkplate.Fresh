// Coinbase Staking for XTZ
// Exchange-based staking with automatic delegation

export const CoinbaseStaking = {
  name: "Coinbase Staking",
  type: "exchange",
  website: "https://www.coinbase.com/earn/staking/tezos",
  description: "Stake XTZ through Coinbase with automatic delegation to bakers",
  liquidStakingToken: "N/A (Exchange custody)",
  minimumStake: "1 XTZ",
  apy: "~5-6%",
  lockPeriod: "Flexible",
  rewardsFrequency: "Daily",
  fees: "Exchange fees",
  
  // API Information
  api: {
    baseUrl: "https://api.coinbase.com/v2",
    documentation: "https://docs.cloud.coinbase.com/",
    endpoints: {
      accounts: "/accounts",
      staking: "/staking",
      rewards: "/staking/rewards",
    },
  },

  // SDK Information
  sdk: {
    npm: "coinbase-pro",
    github: "https://github.com/coinbase/coinbase-pro-node",
    documentation: "https://docs.cloud.coinbase.com/",
  },

  // Social Media
  social: {
    twitter: "https://twitter.com/coinbase",
    discord: "https://discord.gg/coinbase",
    telegram: "https://t.me/coinbase",
    reddit: "https://reddit.com/r/coinbase",
  },

  // Features
  features: [
    "Exchange-based staking",
    "Automatic delegation",
    "Flexible terms",
    "Custodial service",
    "User-friendly interface",
    "Mobile app support",
    "24/7 support",
  ],

  // Staking Requirements
  requirements: {
    kyc: true,
    accountVerification: true,
    minimumAge: 18,
    supportedRegions: "Global",
    technicalRequirements: [
      "Coinbase account",
      "KYC verification",
      "XTZ balance",
    ],
  },

  // Risk Factors
  risks: [
    "Exchange custody risk",
    "KYC requirement",
    "Exchange fees",
    "Regional restrictions",
  ],

  // Integration Examples
  examples: {
    getAccounts: `
// Get accounts
const response = await fetch('https://api.coinbase.com/v2/accounts', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
  },
});
const accounts = await response.json();
console.log('Accounts:', accounts);
    `,
    
    getStaking: `
// Get staking information
const response = await fetch('https://api.coinbase.com/v2/staking', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
  },
});
const staking = await response.json();
console.log('Staking:', staking);
    `,
    
    getRewards: `
// Get staking rewards
const response = await fetch('https://api.coinbase.com/v2/staking/rewards', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
  },
});
const rewards = await response.json();
console.log('Rewards:', rewards);
    `,
  },
};

// Helper function to get accounts
export async function getAccounts() {
  try {
    // This would require API key authentication
    // For demonstration purposes, we'll return a mock response
    return {
      data: [
        {
          id: "xtz-account",
          name: "Tezos Account",
          primary: true,
          type: "wallet",
          currency: "XTZ",
          balance: {
            amount: "1000.00",
            currency: "XTZ",
          },
        },
      ],
    };
  } catch (error) {
    console.error('Error fetching accounts:', error);
  }
  return null;
}

// Helper function to get staking info
export async function getStaking() {
  try {
    // This would require API key authentication
    // For demonstration purposes, we'll return a mock response
    return {
      data: [
        {
          id: "xtz-staking",
          currency: "XTZ",
          balance: {
            amount: "100.00",
            currency: "XTZ",
          },
          apy: "0.055",
        },
      ],
    };
  } catch (error) {
    console.error('Error fetching staking info:', error);
  }
  return null;
}

// Helper function to get XTZ staking rate
export async function getXTZStakingRate() {
  try {
    const staking = await getStaking();
    if (staking && staking.data) {
      const xtzStaking = staking.data.find((item: any) => item.currency === 'XTZ');
      return xtzStaking ? parseFloat(xtzStaking.apy) * 100 : 0;
    }
  } catch (error) {
    console.error('Error fetching XTZ staking rate:', error);
  }
  return 0;
}

// Helper function to check if staking is available
export async function isStakingAvailable(): Promise<boolean> {
  try {
    const staking = await getStaking();
    return staking && staking.data && staking.data.length > 0;
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

export default CoinbaseStaking;
