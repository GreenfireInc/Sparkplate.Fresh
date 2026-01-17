// Waves.Exchange Leasing for WAVES
// Native leasing through official exchange

export const WavesExchangeLeasing = {
  name: "Waves.Exchange Leasing",
  type: "native",
  website: "https://waves.exchange/leasing",
  description: "Lease WAVES to nodes directly through Waves.Exchange with custodial service",
  liquidStakingToken: "N/A (Native WAVES leasing)",
  minimumStake: "1 WAVES",
  apy: "~5-8%",
  lockPeriod: "1000 blocks (~1 hour)",
  rewardsFrequency: "Per block",
  fees: "Exchange fees",
  
  // API Information
  api: {
    baseUrl: "https://api.waves.exchange",
    documentation: "https://docs.waves.exchange/en/",
    endpoints: {
      leasing: "/api/v1/leasing",
      nodes: "/api/v1/nodes",
      rewards: "/api/v1/rewards",
    },
  },

  // SDK Information
  sdk: {
    npm: "@waves/waves-api",
    github: "https://github.com/wavesplatform/waves-api",
    documentation: "https://docs.waves.tech/en/",
  },

  // Social Media
  social: {
    twitter: "https://twitter.com/wavesprotocol",
    discord: "https://discord.gg/waves",
    telegram: "https://t.me/wavesnews",
    reddit: "https://reddit.com/r/Wavesplatform",
  },

  // Features
  features: [
    "Official exchange leasing",
    "Custodial service",
    "User-friendly interface",
    "Real-time rewards",
    "No slashing risk",
    "1000 block lockup",
    "Mobile app support",
  ],

  // Staking Requirements
  requirements: {
    kyc: true,
    accountVerification: true,
    minimumAge: 18,
    supportedRegions: "Global",
    technicalRequirements: [
      "Waves.Exchange account",
      "KYC verification",
      "WAVES balance",
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
    getLeasingInfo: `
// Get leasing information
const response = await fetch('https://api.waves.exchange/api/v1/leasing', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
  },
});
const data = await response.json();
console.log('Leasing info:', data);
    `,
    
    getNodes: `
// Get available nodes
const response = await fetch('https://api.waves.exchange/api/v1/nodes');
const nodes = await response.json();
console.log('Nodes:', nodes);
    `,
    
    getRewards: `
// Get leasing rewards
const response = await fetch('https://api.waves.exchange/api/v1/rewards', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
  },
});
const rewards = await response.json();
console.log('Rewards:', rewards);
    `,
  },
};

// Helper function to get leasing info
export async function getLeasingInfo() {
  try {
    // This would require API key authentication
    // For demonstration purposes, we'll return a mock response
    return {
      isLeasing: false,
      leasedAmount: 0,
      rewards: 0,
      apy: 0.06,
    };
  } catch (error) {
    console.error('Error fetching leasing info:', error);
  }
  return null;
}

// Helper function to get available nodes
export async function getNodes() {
  try {
    const response = await fetch('https://api.waves.exchange/api/v1/nodes');
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Error fetching nodes:', error);
  }
  return null;
}

// Helper function to get rewards
export async function getRewards() {
  try {
    // This would require API key authentication
    // For demonstration purposes, we'll return a mock response
    return {
      totalRewards: 0,
      pendingRewards: 0,
      lastPayout: null,
    };
  } catch (error) {
    console.error('Error fetching rewards:', error);
  }
  return null;
}

// Helper function to check if leasing is available
export async function isLeasingAvailable(): Promise<boolean> {
  try {
    const nodes = await getNodes();
    return nodes && nodes.length > 0;
  } catch (error) {
    console.error('Error checking leasing availability:', error);
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

export default WavesExchangeLeasing;
