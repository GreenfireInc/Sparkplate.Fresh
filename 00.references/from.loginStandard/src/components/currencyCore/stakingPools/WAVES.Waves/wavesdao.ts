// WavesDAO Governance Staking for WAVES
// Governance staking protocol

export const WavesDAOStaking = {
  name: "WavesDAO",
  type: "governance",
  website: "https://waves.exchange/governance",
  description: "Stake WAVES in governance to participate in protocol decisions and earn rewards",
  liquidStakingToken: "N/A (Governance tokens)",
  minimumStake: "1 WAVES",
  apy: "~6-10%",
  lockPeriod: "Variable",
  rewardsFrequency: "Per proposal",
  fees: "Governance fees",
  
  // API Information
  api: {
    baseUrl: "https://api.waves.exchange",
    documentation: "https://docs.waves.exchange/en/",
    endpoints: {
      governance: "/api/v1/governance",
      proposals: "/api/v1/proposals",
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
    "Governance participation",
    "Protocol decision voting",
    "Community governance",
    "Variable APY",
    "No slashing risk",
    "Transparent fees",
    "Democratic participation",
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
      "Governance participation",
    ],
  },

  // Risk Factors
  risks: [
    "Governance risk",
    "Protocol changes",
    "Community decisions",
    "Voting participation",
  ],

  // Integration Examples
  examples: {
    getGovernanceInfo: `
// Get governance information
const response = await fetch('https://api.waves.exchange/api/v1/governance');
const governance = await response.json();
console.log('Governance info:', governance);
    `,
    
    getProposals: `
// Get active proposals
const response = await fetch('https://api.waves.exchange/api/v1/proposals');
const proposals = await response.json();
console.log('Proposals:', proposals);
    `,
    
    getRewards: `
// Get governance rewards
const response = await fetch('https://api.waves.exchange/api/v1/rewards?address=YOUR_ADDRESS');
const rewards = await response.json();
console.log('Rewards:', rewards);
    `,
  },
};

// Helper function to get governance info
export async function getGovernanceInfo() {
  try {
    const response = await fetch('https://api.waves.exchange/api/v1/governance');
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Error fetching governance info:', error);
  }
  return null;
}

// Helper function to get proposals
export async function getProposals() {
  try {
    const response = await fetch('https://api.waves.exchange/api/v1/proposals');
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Error fetching proposals:', error);
  }
  return null;
}

// Helper function to get rewards
export async function getRewards(address: string) {
  try {
    const response = await fetch(`https://api.waves.exchange/api/v1/rewards?address=${address}`);
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Error fetching rewards:', error);
  }
  return null;
}

// Helper function to check if governance staking is available
export async function isGovernanceStakingAvailable(): Promise<boolean> {
  try {
    const governance = await getGovernanceInfo();
    return governance && governance.available;
  } catch (error) {
    console.error('Error checking governance staking availability:', error);
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

export default WavesDAOStaking;
