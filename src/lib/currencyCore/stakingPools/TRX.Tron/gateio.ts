// Gate.io Staking for TRX
// Exchange-based staking

export const GateIOStaking = {
  name: "Gate.io Staking",
  type: "exchange",
  website: "https://www.gate.io/earn",
  description: "Stake TRX through Gate.io exchange with flexible and locked options",
  liquidStakingToken: "N/A (Exchange custody)",
  minimumStake: "1 TRX",
  apy: "~3-5%",
  lockPeriod: "Flexible or locked",
  rewardsFrequency: "Daily",
  fees: "Exchange fees",
  
  // API Information
  api: {
    baseUrl: "https://api.gateio.ws",
    documentation: "https://www.gate.io/docs/developers/apiv4/",
    endpoints: {
      staking: "/api/v4/earn/staking",
      rewards: "/api/v4/earn/rewards",
      account: "/api/v4/spot/accounts",
    },
  },

  // SDK Information
  sdk: {
    npm: "gateio-sdk",
    github: "https://github.com/gateio/gateapi-node",
    documentation: "https://www.gate.io/docs/developers/apiv4/",
  },

  // Social Media
  social: {
    twitter: "https://twitter.com/gate_io",
    discord: "https://discord.gg/gateio",
    telegram: "https://t.me/gate_io",
    reddit: "https://reddit.com/r/gateio",
  },

  // Features
  features: [
    "Exchange-based staking",
    "Flexible and locked options",
    "Competitive rates",
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
      "Gate.io account",
      "KYC verification",
      "TRX balance",
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
    getStakingInfo: `
// Get staking information
const response = await fetch('https://api.gateio.ws/api/v4/earn/staking', {
  headers: {
    'KEY': 'YOUR_API_KEY',
    'SIGN': 'YOUR_SIGNATURE',
  },
});
const staking = await response.json();
console.log('Staking info:', staking);
    `,
    
    getRewards: `
// Get rewards
const response = await fetch('https://api.gateio.ws/api/v4/earn/rewards', {
  headers: {
    'KEY': 'YOUR_API_KEY',
    'SIGN': 'YOUR_SIGNATURE',
  },
});
const rewards = await response.json();
console.log('Rewards:', rewards);
    `,
    
    getAccount: `
// Get account info
const response = await fetch('https://api.gateio.ws/api/v4/spot/accounts', {
  headers: {
    'KEY': 'YOUR_API_KEY',
    'SIGN': 'YOUR_SIGNATURE',
  },
});
const account = await response.json();
console.log('Account:', account);
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
        totalStaked: "30000",
        apy: "0.04",
        products: 2,
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
          amount: "15.00",
          status: "paid",
        },
      ],
    };
  } catch (error) {
    console.error('Error fetching rewards:', error);
  }
  return null;
}

// Helper function to get TRX staking rate
export async function getTRXStakingRate() {
  try {
    // Gate.io typically offers around 3-5% APY
    return 4.0;
  } catch (error) {
    console.error('Error fetching TRX staking rate:', error);
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

export default GateIOStaking;
