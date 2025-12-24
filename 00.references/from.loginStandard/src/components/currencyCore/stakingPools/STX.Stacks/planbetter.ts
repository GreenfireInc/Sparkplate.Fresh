// PlanBetter (formerly Friedger Pool) Stacking for Stacks (STX)
// Non-custodial pool service

export const PlanBetterStaking = {
  name: "PlanBetter",
  type: "Stacking Pool",
  website: "https://planbetter.org/",
  description: "Non-custodial pool service for STX stacking, community-run delegation service",
  liquidStakingToken: "N/A (Direct delegation)",
  minimumStake: "100 STX",
  apy: "~10%",
  lockPeriod: "2-3 days unstaking period",
  rewardsFrequency: "Per stacking cycle (~2 weeks)",
  fees: "Variable pool fee",
  
  // API Information
  api: {
    baseUrl: "https://api.planbetter.org",
    documentation: "https://pool.planbetter.org/",
    endpoints: {
      stats: "/stats",
      members: "/members",
      rewards: "/rewards",
      cycle: "/cycle",
    },
  },

  // SDK Information
  sdk: {
    npm: "@stacks/transactions",
    github: "https://github.com/stacks-network/stacks.js",
    documentation: "https://stacks.js.org/",
  },

  // Social Media
  social: {
    twitter: "https://twitter.com/planbetter_org",
    discord: "https://discord.gg/planbetter",
    telegram: "https://t.me/planbetter",
    reddit: "https://reddit.com/r/planbetter",
  },

  // Features
  features: [
    "Non-custodial delegation",
    "Community-run service",
    "No lock-up period",
    "Direct STX control",
    "Transparent fees",
    "Regular payouts",
    "Easy delegation process",
  ],

  // Staking Requirements
  requirements: {
    kyc: false,
    accountVerification: false,
    minimumAge: 18,
    supportedRegions: "Global",
    technicalRequirements: [
      "100 STX minimum",
      "Stacks wallet (Hiro, Xverse, etc.)",
      "PlanBetter dApp access",
    ],
  },

  // Risk Factors
  risks: [
    "Pool operator risk",
    "2-3 day unstaking period",
    "Pool fee changes",
    "Stacking cycle timing",
  ],

  // Integration Examples
  examples: {
    getPoolStats: `
// Get pool statistics
const response = await fetch('https://api.planbetter.org/stats');
const stats = await response.json();
console.log('Pool stats:', stats);
    `,
    
    getMembers: `
// Get pool members
const response = await fetch('https://api.planbetter.org/members');
const members = await response.json();
console.log('Pool members:', members);
    `,
    
    getRewards: `
// Get rewards history
const response = await fetch('https://api.planbetter.org/rewards');
const rewards = await response.json();
console.log('Rewards history:', rewards);
    `,
    
    delegateSTX: `
// Delegate STX to PlanBetter pool
import { makeContractCall } from '@stacks/transactions';

const delegateInstruction = await makeContractCall({
  contractAddress: 'SP...', // PlanBetter pool address
  contractName: 'pool',
  functionName: 'delegate-stx',
  functionArgs: [uintCV(amountInMicroSTX)],
  senderKey: privateKey,
  network: network,
});
    `,
  },
};

// Helper function to get pool stats
export async function getPoolStats() {
  try {
    const response = await fetch('https://api.planbetter.org/stats');
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error('Error fetching pool stats:', error);
  }
  return null;
}

// Helper function to get pool members
export async function getPoolMembers() {
  try {
    const response = await fetch('https://api.planbetter.org/members');
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error('Error fetching pool members:', error);
  }
  return null;
}

// Helper function to get rewards history
export async function getRewardsHistory() {
  try {
    const response = await fetch('https://api.planbetter.org/rewards');
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error('Error fetching rewards history:', error);
  }
  return null;
}

// Helper function to get current cycle info
export async function getCurrentCycle() {
  try {
    const response = await fetch('https://api.planbetter.org/cycle');
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error('Error fetching current cycle:', error);
  }
  return null;
}

// Helper function to check if stacking is available
export async function isStackingAvailable(): Promise<boolean> {
  try {
    const stats = await getPoolStats();
    return stats && stats.total_stacked > 0;
  } catch (error) {
    console.error('Error checking stacking availability:', error);
    return false;
  }
}

// Helper function to get STX price from CoinGecko
export async function getSTXPrice(): Promise<number> {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=blockstack&vs_currencies=usd');
    if (response.ok) {
      const data = await response.json();
      return data.blockstack?.usd || 0;
    }
  } catch (error) {
    console.error('Error fetching STX price:', error);
  }
  return 0;
}

export default PlanBetterStaking;
