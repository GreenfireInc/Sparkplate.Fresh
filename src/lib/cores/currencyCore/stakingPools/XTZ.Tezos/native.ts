// Native Tezos Baking (Delegation)
// Direct delegation to bakers on Tezos network

export const NativeTezosBaking = {
  name: "Native Baking (Delegation)",
  type: "native",
  website: "https://tezos.com/learn/bake",
  description: "Delegate XTZ to public bakers and earn ~6% APY rewards through Tezos liquid proof-of-stake",
  liquidStakingToken: "N/A (Native delegation)",
  minimumStake: "1 XTZ",
  apy: "~6%",
  lockPeriod: "No lockup (liquid delegation)",
  rewardsFrequency: "Per cycle (~2.5 days)",
  fees: "Baker fees (typically 5-15%)",
  
  // API Information
  api: {
    baseUrl: "https://api.tzkt.io",
    documentation: "https://api.tzkt.io/",
    endpoints: {
      bakers: "/v1/bakers",
      delegations: "/v1/accounts/{address}/delegations",
      rewards: "/v1/rewards/{address}/{cycle}",
      cycles: "/v1/cycles",
    },
  },

  // SDK Information
  sdk: {
    npm: "@taquito/taquito",
    github: "https://github.com/ecadlabs/taquito",
    documentation: "https://tezostaquito.io/",
  },

  // Social Media
  social: {
    twitter: "https://twitter.com/tezos",
    discord: "https://discord.gg/tezos",
    telegram: "https://t.me/tezos",
    reddit: "https://reddit.com/r/tezos",
  },

  // Features
  features: [
    "Liquid proof-of-stake",
    "No token lockup",
    "Flexible delegation",
    "Cycle-based rewards",
    "Baker selection freedom",
    "Governance participation",
    "Self-amending protocol",
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
// Get list of bakers
const response = await fetch('https://api.tzkt.io/v1/bakers?active=true&limit=50');
const bakers = await response.json();
console.log('Active bakers:', bakers);
    `,
    
    getDelegations: `
// Get delegations for an address
const address = 'tz1...';
const response = await fetch(\`https://api.tzkt.io/v1/accounts/\${address}/delegations\`);
const delegations = await response.json();
console.log('Delegations:', delegations);
    `,
    
    getRewards: `
// Get rewards for a cycle
const address = 'tz1...';
const cycle = 500;
const response = await fetch(\`https://api.tzkt.io/v1/rewards/\${address}/\${cycle}\`);
const rewards = await response.json();
console.log('Rewards:', rewards);
    `,
  },
};

// Helper function to get bakers
export async function getBakers() {
  try {
    const response = await fetch('https://api.tzkt.io/v1/bakers?active=true&limit=50');
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Error fetching bakers:', error);
  }
  return null;
}

// Helper function to get delegations for an address
export async function getDelegations(address: string) {
  try {
    const response = await fetch(`https://api.tzkt.io/v1/accounts/${address}/delegations`);
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Error fetching delegations:', error);
  }
  return null;
}

// Helper function to get rewards for a cycle
export async function getRewards(address: string, cycle: number) {
  try {
    const response = await fetch(`https://api.tzkt.io/v1/rewards/${address}/${cycle}`);
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Error fetching rewards:', error);
  }
  return null;
}

// Helper function to get current cycle
export async function getCurrentCycle() {
  try {
    const response = await fetch('https://api.tzkt.io/v1/cycles');
    if (response.ok) {
      const cycles = await response.json();
      return cycles[0]?.cycle || 0;
    }
  } catch (error) {
    console.error('Error fetching current cycle:', error);
  }
  return 0;
}

// Helper function to check if delegation is available
export async function isDelegationAvailable(): Promise<boolean> {
  try {
    const bakers = await getBakers();
    return bakers && bakers.length > 0;
  } catch (error) {
    console.error('Error checking delegation availability:', error);
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

export default NativeTezosBaking;
