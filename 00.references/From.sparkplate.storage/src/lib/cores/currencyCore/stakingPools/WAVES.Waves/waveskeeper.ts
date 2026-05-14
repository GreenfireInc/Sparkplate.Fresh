// Waves Keeper Leasing for WAVES
// Wallet-based leasing

export const WavesKeeperLeasing = {
  name: "Waves Keeper Leasing",
  type: "wallet",
  website: "https://wavesplatform.com/products-keeper",
  description: "Lease to nodes directly from Waves Keeper wallet with full control",
  liquidStakingToken: "N/A (Native WAVES leasing)",
  minimumStake: "1 WAVES",
  apy: "~5-8%",
  lockPeriod: "1000 blocks (~1 hour)",
  rewardsFrequency: "Per block",
  fees: "Network fees only",
  
  // API Information
  api: {
    baseUrl: "https://nodes.wavesnodes.com",
    documentation: "https://docs.waves.tech/en/",
    endpoints: {
      leasing: "/leasing/active",
      nodes: "/addresses/data",
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
    "Wallet-based leasing",
    "Full control over funds",
    "Direct node selection",
    "Real-time rewards",
    "No slashing risk",
    "1000 block lockup",
    "Non-custodial",
  ],

  // Staking Requirements
  requirements: {
    kyc: false,
    accountVerification: false,
    minimumAge: 18,
    supportedRegions: "Global",
    technicalRequirements: [
      "Waves Keeper wallet",
      "1 WAVES minimum",
      "Node selection",
    ],
  },

  // Risk Factors
  risks: [
    "Node performance risk",
    "Wallet security",
    "User error",
    "Network fees",
  ],

  // Integration Examples
  examples: {
    getLeasingInfo: `
// Get leasing information
const response = await fetch('https://nodes.wavesnodes.com/leasing/active/YOUR_ADDRESS');
const data = await response.json();
console.log('Leasing info:', data);
    `,
    
    getNodes: `
// Get available nodes
const response = await fetch('https://nodes.wavesnodes.com/addresses/data');
const nodes = await response.json();
console.log('Nodes:', nodes);
    `,
    
    getBalance: `
// Get wallet balance
const response = await fetch('https://nodes.wavesnodes.com/addresses/balance/YOUR_ADDRESS');
const balance = await response.json();
console.log('Balance:', balance);
    `,
  },
};

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

// Helper function to get available nodes
export async function getNodes() {
  try {
    const response = await fetch('https://nodes.wavesnodes.com/addresses/data');
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Error fetching nodes:', error);
  }
  return null;
}

// Helper function to get balance
export async function getBalance(address: string) {
  try {
    const response = await fetch(`https://nodes.wavesnodes.com/addresses/balance/${address}`);
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Error fetching balance:', error);
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

export default WavesKeeperLeasing;
