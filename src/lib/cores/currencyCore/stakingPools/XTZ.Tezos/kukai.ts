// Kukai Delegation for XTZ
// Web wallet with built-in baker delegation

export const KukaiDelegation = {
  name: "Kukai Delegation",
  type: "wallet",
  website: "https://kukai.app/",
  description: "Web wallet with built-in baker delegation and user-friendly interface",
  liquidStakingToken: "N/A (Wallet delegation)",
  minimumStake: "1 XTZ",
  apy: "~6%",
  lockPeriod: "No lockup (liquid delegation)",
  rewardsFrequency: "Per cycle (~2.5 days)",
  fees: "Baker fees (typically 5-15%)",
  
  // API Information
  api: {
    baseUrl: "https://api.kukai.app",
    documentation: "https://docs.kukai.app/",
    endpoints: {
      bakers: "/bakers",
      delegations: "/delegations",
      rewards: "/rewards",
    },
  },

  // SDK Information
  sdk: {
    npm: "@kukai/wallet-sdk",
    github: "https://github.com/kukai-wallet/kukai-wallet",
    documentation: "https://docs.kukai.app/",
  },

  // Social Media
  social: {
    twitter: "https://twitter.com/kukaiwallet",
    discord: "https://discord.gg/kukai",
    telegram: "https://t.me/kukai",
    reddit: "https://reddit.com/r/kukai",
  },

  // Features
  features: [
    "Web wallet delegation",
    "Built-in baker selection",
    "User-friendly interface",
    "Real-time rewards tracking",
    "Mobile app support",
    "Social login support",
    "DApp integration",
  ],

  // Staking Requirements
  requirements: {
    kyc: false,
    accountVerification: false,
    minimumAge: 18,
    supportedRegions: "Global",
    technicalRequirements: [
      "Kukai wallet",
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
    getBakers: `
// Get available bakers
const response = await fetch('https://api.kukai.app/bakers');
const bakers = await response.json();
console.log('Available bakers:', bakers);
    `,
    
    getDelegations: `
// Get user delegations
const response = await fetch('https://api.kukai.app/delegations', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
  },
});
const delegations = await response.json();
console.log('Delegations:', delegations);
    `,
    
    getRewards: `
// Get rewards
const response = await fetch('https://api.kukai.app/rewards', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
  },
});
const rewards = await response.json();
console.log('Rewards:', rewards);
    `,
  },
};

// Helper function to get bakers
export async function getBakers() {
  try {
    const response = await fetch('https://api.kukai.app/bakers');
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Error fetching bakers:', error);
  }
  return null;
}

// Helper function to get delegations
export async function getDelegations() {
  try {
    // This would require API key authentication
    // For demonstration purposes, we'll return a mock response
    return {
      delegations: [
        {
          baker: "tz1...",
          amount: "100.00",
          status: "active",
        },
      ],
    };
  } catch (error) {
    console.error('Error fetching delegations:', error);
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
    // Kukai delegation typically offers around 6% APY
    return 6.0;
  } catch (error) {
    console.error('Error fetching XTZ staking rate:', error);
  }
  return 0;
}

// Helper function to check if staking is available
export async function isStakingAvailable(): Promise<boolean> {
  try {
    const bakers = await getBakers();
    return bakers && bakers.length > 0;
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

export default KukaiDelegation;
