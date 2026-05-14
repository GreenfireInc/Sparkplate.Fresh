// Stacking DAO Liquid Stacking for Stacks (STX)
// 0% fee liquid staking protocol

export const StackingDAOStaking = {
  name: "Stacking DAO",
  type: "Liquid Stacking",
  website: "https://stackingdao.com/",
  description: "0% fee liquid staking protocol with stSTX token",
  liquidStakingToken: "stSTX",
  minimumStake: "1 STX",
  apy: "~10%",
  lockPeriod: "No lock-up period",
  rewardsFrequency: "Continuous compounding",
  fees: "0% fee",
  
  // API Information
  api: {
    baseUrl: "https://api.stackingdao.com",
    documentation: "https://docs.stackingdao.com/",
    endpoints: {
      price: "/price",
      stats: "/stats",
      rewards: "/rewards",
      cycle: "/cycle",
    },
  },

  // SDK Information
  sdk: {
    npm: "@stacks/transactions",
    github: "https://github.com/stackingdao",
    documentation: "https://docs.stackingdao.com/",
  },

  // Social Media
  social: {
    twitter: "https://twitter.com/stackingdao",
    discord: "https://discord.gg/stackingdao",
    telegram: "https://t.me/stackingdao",
    reddit: "https://reddit.com/r/stackingdao",
  },

  // Features
  features: [
    "0% fee liquid staking",
    "stSTX token",
    "No lock-up period",
    "Continuous compounding",
    "DeFi integrations",
    "Governance participation",
    "High security",
  ],

  // Staking Requirements
  requirements: {
    kyc: false,
    accountVerification: false,
    minimumAge: 18,
    supportedRegions: "Global",
    technicalRequirements: [
      "1 STX minimum",
      "Stacks wallet (Hiro, Xverse, etc.)",
      "Stacking DAO dApp access",
    ],
  },

  // Risk Factors
  risks: [
    "Smart contract risk",
    "Liquidity risk",
    "Protocol risk",
    "Token price risk",
  ],

  // Integration Examples
  examples: {
    getStSTXPrice: `
// Get stSTX price in STX
const response = await fetch('https://api.stackingdao.com/price');
const data = await response.json();
console.log('stSTX price:', data.price);
    `,
    
    getStats: `
// Get protocol statistics
const response = await fetch('https://api.stackingdao.com/stats');
const stats = await response.json();
console.log('Protocol stats:', stats);
    `,
    
    getRewards: `
// Get rewards data
const response = await fetch('https://api.stackingdao.com/rewards');
const rewards = await response.json();
console.log('Rewards:', rewards);
    `,
    
    stakeSTX: `
// Stake STX to get stSTX
const stakeInstruction = await makeContractCall({
  contractAddress: 'SP...', // Stacking DAO contract address
  contractName: 'stacking-dao',
  functionName: 'stake',
  functionArgs: [uintCV(amountInMicroSTX)],
  senderKey: privateKey,
  network: network,
});
    `,
  },
};

// Helper function to get stSTX price
export async function getStSTXPrice(): Promise<number> {
  try {
    const response = await fetch('https://api.stackingdao.com/price');
    if (response.ok) {
      const data = await response.json();
      return data.price || 0;
    }
  } catch (error) {
    console.error('Error fetching stSTX price:', error);
  }
  return 0;
}

// Helper function to get protocol stats
export async function getProtocolStats() {
  try {
    const response = await fetch('https://api.stackingdao.com/stats');
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error('Error fetching protocol stats:', error);
  }
  return null;
}

// Helper function to get rewards
export async function getRewards() {
  try {
    const response = await fetch('https://api.stackingdao.com/rewards');
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error('Error fetching rewards:', error);
  }
  return null;
}

// Helper function to get current cycle
export async function getCurrentCycle() {
  try {
    const response = await fetch('https://api.stackingdao.com/cycle');
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
    const stats = await getProtocolStats();
    return stats && stats.total_staked > 0;
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

export default StackingDAOStaking;
