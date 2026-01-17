// Community Nodes Leasing for WAVES
// Direct node leasing

export const CommunityNodesLeasing = {
  name: "Community Nodes",
  type: "native",
  website: "https://dev.pywaves.org/generators/",
  description: "Lease directly to any of 100+ active generating nodes with community support",
  liquidStakingToken: "N/A (Native WAVES leasing)",
  minimumStake: "1 WAVES",
  apy: "~5-8%",
  lockPeriod: "1000 blocks (~1 hour)",
  rewardsFrequency: "Per block",
  fees: "Node fees only",
  
  // API Information
  api: {
    baseUrl: "https://nodes.wavesnodes.com",
    documentation: "https://docs.waves.tech/en/",
    endpoints: {
      nodes: "/addresses/data",
      leasing: "/leasing/active",
      rewards: "/addresses/balance",
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
    "Community-run nodes",
    "Direct leasing",
    "100+ active nodes",
    "Real-time rewards",
    "No slashing risk",
    "1000 block lockup",
    "Community support",
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
      "Node selection",
    ],
  },

  // Risk Factors
  risks: [
    "Node performance risk",
    "Community reliability",
    "User error",
    "Network fees",
  ],

  // Integration Examples
  examples: {
    getNodes: `
// Get available community nodes
const response = await fetch('https://nodes.wavesnodes.com/addresses/data');
const nodes = await response.json();
console.log('Community nodes:', nodes);
    `,
    
    getLeasingInfo: `
// Get leasing information
const response = await fetch('https://nodes.wavesnodes.com/leasing/active/YOUR_ADDRESS');
const leasing = await response.json();
console.log('Leasing info:', leasing);
    `,
    
    getRewards: `
// Get leasing rewards
const response = await fetch('https://nodes.wavesnodes.com/addresses/balance/YOUR_ADDRESS');
const balance = await response.json();
console.log('Balance:', balance);
    `,
  },
};

// Helper function to get community nodes
export async function getCommunityNodes() {
  try {
    const response = await fetch('https://nodes.wavesnodes.com/addresses/data');
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Error fetching community nodes:', error);
  }
  return null;
}

// Helper function to get leasing info
export async function getLeasingInfo(address: string) {
  try {
    const response = await fetch(`https://nodes.wavesnodes.com/leasing/active/${address}`);
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Error fetching leasing info:', error);
  }
  return null;
}

// Helper function to get rewards
export async function getRewards(address: string) {
  try {
    const response = await fetch(`https://nodes.wavesnodes.com/addresses/balance/${address}`);
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Error fetching rewards:', error);
  }
  return null;
}

// Helper function to check if leasing is available
export async function isLeasingAvailable(): Promise<boolean> {
  try {
    const nodes = await getCommunityNodes();
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

export default CommunityNodesLeasing;
