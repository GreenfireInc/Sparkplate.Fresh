// Everstake Professional Baker for XTZ
// Enterprise-grade baking service

export const EverstakeBaker = {
  name: "Everstake",
  type: "professional",
  website: "https://everstake.one/tezos",
  description: "Enterprise-grade baking service with high uptime and rewards",
  liquidStakingToken: "N/A (Professional baker)",
  minimumStake: "1 XTZ",
  apy: "~5-6%",
  lockPeriod: "No lockup (liquid delegation)",
  rewardsFrequency: "Per cycle (~2.5 days)",
  fees: "5-10%",
  
  // API Information
  api: {
    baseUrl: "https://api.everstake.one",
    documentation: "https://docs.everstake.one/",
    endpoints: {
      bakers: "/tezos/bakers",
      delegations: "/tezos/delegations",
      rewards: "/tezos/rewards",
    },
  },

  // SDK Information
  sdk: {
    npm: "everstake-sdk",
    github: "https://github.com/everstake/sdk",
    documentation: "https://docs.everstake.one/",
  },

  // Social Media
  social: {
    twitter: "https://twitter.com/everstake_pool",
    discord: "https://discord.gg/everstake",
    telegram: "https://t.me/everstake_pool",
    reddit: "https://reddit.com/r/everstake",
  },

  // Features
  features: [
    "Professional baking service",
    "High uptime guarantee",
    "Enterprise-grade infrastructure",
    "Competitive fees",
    "24/7 monitoring",
    "Regular payouts",
    "Governance participation",
  ],

  // Staking Requirements
  requirements: {
    kyc: false,
    accountVerification: false,
    minimumAge: 18,
    supportedRegions: "Global",
    technicalRequirements: [
      "Tezos wallet",
      "1 XTZ minimum",
      "Delegation to Everstake",
    ],
  },

  // Risk Factors
  risks: [
    "Baker slashing risk",
    "Baker downtime",
    "Network participation risk",
    "Fee changes",
  ],

  // Integration Examples
  examples: {
    getBakers: `
// Get Everstake bakers
const response = await fetch('https://api.everstake.one/tezos/bakers');
const bakers = await response.json();
console.log('Everstake bakers:', bakers);
    `,
    
    getDelegations: `
// Get delegations
const response = await fetch('https://api.everstake.one/tezos/delegations');
const delegations = await response.json();
console.log('Delegations:', delegations);
    `,
    
    getRewards: `
// Get rewards
const response = await fetch('https://api.everstake.one/tezos/rewards');
const rewards = await response.json();
console.log('Rewards:', rewards);
    `,
  },
};

// Helper function to get bakers
export async function getBakers() {
  try {
    const response = await fetch('https://api.everstake.one/tezos/bakers');
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
    const response = await fetch('https://api.everstake.one/tezos/delegations');
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Error fetching delegations:', error);
  }
  return null;
}

// Helper function to get rewards
export async function getRewards() {
  try {
    const response = await fetch('https://api.everstake.one/tezos/rewards');
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Error fetching rewards:', error);
  }
  return null;
}

// Helper function to get XTZ staking rate
export async function getXTZStakingRate() {
  try {
    // Everstake typically offers around 5-6% APY
    return 5.5;
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

export default EverstakeBaker;
