// Kiln Enterprise Staking for XTZ
// Enterprise-grade staking platform

export const KilnStaking = {
  name: "Kiln",
  type: "enterprise",
  website: "https://www.kiln.fi/protocols/tezos",
  description: "Enterprise-grade staking platform offering automated validators and reward management",
  liquidStakingToken: "N/A (Enterprise custody)",
  minimumStake: "1000 XTZ",
  apy: "~5-7%",
  lockPeriod: "Flexible",
  rewardsFrequency: "Regular",
  fees: "Platform fees",
  
  // API Information
  api: {
    baseUrl: "https://api.kiln.fi",
    documentation: "https://docs.kiln.fi/",
    endpoints: {
      staking: "/v1/tezos/staking",
      rewards: "/v1/tezos/rewards",
      validators: "/v1/tezos/validators",
    },
  },

  // SDK Information
  sdk: {
    npm: "kiln-sdk",
    github: "https://github.com/kilnfi/sdk",
    documentation: "https://docs.kiln.fi/",
  },

  // Social Media
  social: {
    twitter: "https://twitter.com/kiln_finance",
    discord: "https://discord.gg/kiln",
    telegram: "https://t.me/kiln",
    reddit: "https://reddit.com/r/kiln",
  },

  // Features
  features: [
    "Enterprise-grade platform",
    "Automated validators",
    "Reward management",
    "Institutional focus",
    "High security",
    "Professional support",
    "Custom solutions",
  ],

  // Staking Requirements
  requirements: {
    kyc: true,
    accountVerification: true,
    minimumAge: 18,
    supportedRegions: "Global",
    technicalRequirements: [
      "Kiln account",
      "KYC verification",
      "1000 XTZ minimum",
    ],
  },

  // Risk Factors
  risks: [
    "Platform custody risk",
    "KYC requirement",
    "High minimum stake",
    "Platform fees",
  ],

  // Integration Examples
  examples: {
    getStakingInfo: `
// Get staking information
const response = await fetch('https://api.kiln.fi/v1/tezos/staking', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
  },
});
const staking = await response.json();
console.log('Staking info:', staking);
    `,
    
    getRewards: `
// Get rewards
const response = await fetch('https://api.kiln.fi/v1/tezos/rewards', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
  },
});
const rewards = await response.json();
console.log('Rewards:', rewards);
    `,
    
    getValidators: `
// Get validators
const response = await fetch('https://api.kiln.fi/v1/tezos/validators');
const validators = await response.json();
console.log('Validators:', validators);
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
        totalStaked: "1000000",
        apy: "0.06",
        validators: 5,
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
          period: "2024-01",
          amount: "50.00",
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
    // Kiln typically offers around 5-7% APY
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

export default KilnStaking;
