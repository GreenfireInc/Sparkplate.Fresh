// Edgevana Liquid Staking for SOL
// Enterprise staking for institutions

export const EdgevanaStaking = {
  name: "Edgevana Liquid Staking",
  type: "enterprise",
  website: "https://edgevana.com/",
  description: "Enterprise staking service for institutions with liquid staking capabilities",
  liquidStakingToken: "N/A (Enterprise service)",
  minimumStake: "1000 SOL",
  apy: "~6.5%",
  lockPeriod: "Variable",
  rewardsFrequency: "Per epoch",
  fees: "Enterprise fees",
  
  // API Information
  api: {
    baseUrl: "https://api.edgevana.com",
    documentation: "https://docs.edgevana.com/",
    endpoints: {
      enterprise: "/enterprise",
      staking: "/staking",
      rewards: "/rewards",
      analytics: "/analytics",
    },
  },

  // SDK Information
  sdk: {
    npm: "edgevana-sdk",
    github: "https://github.com/edgevana/sdk",
    documentation: "https://docs.edgevana.com/",
  },

  // Social Media
  social: {
    twitter: "https://twitter.com/edgevana",
    discord: "https://discord.gg/edgevana",
    telegram: "https://t.me/edgevana",
    reddit: "https://reddit.com/r/edgevana",
  },

  // Features
  features: [
    "Enterprise staking service",
    "Institutional focus",
    "High minimum stake",
    "Professional support",
    "Custom solutions",
    "Real-time analytics",
    "Compliance support",
  ],

  // Staking Requirements
  requirements: {
    kyc: true,
    accountVerification: true,
    minimumAge: 18,
    supportedRegions: "Global",
    technicalRequirements: [
      "Institutional account",
      "1000 SOL minimum",
      "KYC verification",
    ],
  },

  // Risk Factors
  risks: [
    "Enterprise fees",
    "KYC requirement",
    "High minimum stake",
    "Institutional risk",
  ],

  // Integration Examples
  examples: {
    getEnterpriseInfo: `
// Get enterprise information
const response = await fetch('https://api.edgevana.com/enterprise', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
  },
});
const enterprise = await response.json();
console.log('Enterprise info:', enterprise);
    `,
    
    getStakingInfo: `
// Get staking information
const response = await fetch('https://api.edgevana.com/staking', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
  },
});
const staking = await response.json();
console.log('Staking info:', staking);
    `,
    
    getAnalytics: `
// Get analytics
const response = await fetch('https://api.edgevana.com/analytics', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
  },
});
const analytics = await response.json();
console.log('Analytics:', analytics);
    `,
  },
};

// Helper function to get enterprise info
export async function getEnterpriseInfo() {
  try {
    // This would require API key authentication
    // For demonstration purposes, we'll return a mock response
    return {
      enterprise: {
        totalStaked: "50000",
        apy: "0.065",
        clients: 25,
      },
    };
  } catch (error) {
    console.error('Error fetching enterprise info:', error);
  }
  return null;
}

// Helper function to get staking info
export async function getStakingInfo() {
  try {
    // This would require API key authentication
    // For demonstration purposes, we'll return a mock response
    return {
      staking: {
        totalStaked: "50000",
        apy: "0.065",
        validators: 50,
      },
    };
  } catch (error) {
    console.error('Error fetching staking info:', error);
  }
  return null;
}

// Helper function to get SOL staking rate
export async function getSOLStakingRate() {
  try {
    // Edgevana typically offers around 6.5% APY
    return 6.5;
  } catch (error) {
    console.error('Error fetching SOL staking rate:', error);
  }
  return 0;
}

// Helper function to check if staking is available
export async function isStakingAvailable(): Promise<boolean> {
  try {
    const enterprise = await getEnterpriseInfo();
    return enterprise && enterprise.enterprise;
  } catch (error) {
    console.error('Error checking staking availability:', error);
    return false;
  }
}

// Helper function to get SOL price from CoinGecko
export async function getSOLPrice(): Promise<number> {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd');
    if (response.ok) {
      const data = await response.json();
      return data.solana?.usd || 0;
    }
  } catch (error) {
    console.error('Error fetching SOL price:', error);
  }
  return 0;
}

export default EdgevanaStaking;
