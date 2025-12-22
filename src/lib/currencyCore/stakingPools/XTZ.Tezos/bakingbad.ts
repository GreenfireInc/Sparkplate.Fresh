// Baking Bad Staking for XTZ
// Community resource for baker performance tracking

export const BakingBadStaking = {
  name: "Baking Bad",
  type: "community",
  website: "https://baking-bad.org/",
  description: "Community resource that tracks baker performance, including payout accuracy, fee changes, and voting activity",
  liquidStakingToken: "N/A (Community resource)",
  minimumStake: "1 XTZ",
  apy: "~5-7%",
  lockPeriod: "No lockup (liquid delegation)",
  rewardsFrequency: "Per cycle (~2.5 days)",
  fees: "5-15%",
  
  // API Information
  api: {
    baseUrl: "https://api.baking-bad.org/v2",
    documentation: "https://baking-bad.org/docs",
    endpoints: {
      bakers: "/bakers",
      baker: "/bakers/{address}",
      performance: "/bakers/{address}/performance",
      delegations: "/bakers/{address}/delegations",
    },
  },

  // SDK Information
  sdk: {
    npm: "baking-bad-sdk",
    github: "https://github.com/baking-bad/sdk",
    documentation: "https://baking-bad.org/docs",
  },

  // Social Media
  social: {
    twitter: "https://twitter.com/baking_bad",
    discord: "https://discord.gg/bakingbad",
    telegram: "https://t.me/bakingbad",
    reddit: "https://reddit.com/r/bakingbad",
  },

  // Features
  features: [
    "Baker performance tracking",
    "Payout accuracy monitoring",
    "Fee change tracking",
    "Voting activity analysis",
    "Community resource",
    "Transparent data",
    "Baker rankings",
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
    "Fee changes",
  ],

  // Integration Examples
  examples: {
    getBakers: `
// Get all bakers
const response = await fetch('https://api.baking-bad.org/v2/bakers');
const bakers = await response.json();
console.log('Bakers:', bakers);
    `,
    
    getBakerDetails: `
// Get baker details
const bakerAddress = 'tz1...';
const response = await fetch(\`https://api.baking-bad.org/v2/bakers/\${bakerAddress}\`);
const baker = await response.json();
console.log('Baker details:', baker);
    `,
    
    getBakerPerformance: `
// Get baker performance
const bakerAddress = 'tz1...';
const response = await fetch(\`https://api.baking-bad.org/v2/bakers/\${bakerAddress}/performance\`);
const performance = await response.json();
console.log('Performance:', performance);
    `,
  },
};

// Helper function to get bakers
export async function getBakers() {
  try {
    const response = await fetch('https://api.baking-bad.org/v2/bakers');
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Error fetching bakers:', error);
  }
  return null;
}

// Helper function to get baker details
export async function getBakerDetails(bakerAddress: string) {
  try {
    const response = await fetch(`https://api.baking-bad.org/v2/bakers/${bakerAddress}`);
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Error fetching baker details:', error);
  }
  return null;
}

// Helper function to get baker performance
export async function getBakerPerformance(bakerAddress: string) {
  try {
    const response = await fetch(`https://api.baking-bad.org/v2/bakers/${bakerAddress}/performance`);
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Error fetching baker performance:', error);
  }
  return null;
}

// Helper function to get XTZ staking rate
export async function getXTZStakingRate() {
  try {
    // Baking Bad typically tracks bakers with 5-7% APY
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

export default BakingBadStaking;
