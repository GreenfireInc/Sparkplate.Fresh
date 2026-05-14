// JPool Liquid Staking for Solana (SOL)
// MEV optimized and gamified staking

export const JPoolStaking = {
  name: "JPool",
  type: "Liquid Staking",
  website: "https://jpool.one/",
  description: "MEV optimized, gamified, JSOL token for DeFi",
  liquidStakingToken: "JSOL",
  minimumStake: "0.01 SOL",
  apy: "~10-15%",
  lockPeriod: "No lock-up period",
  rewardsFrequency: "Per epoch",
  fees: "5% of rewards per epoch",
  
  // API Information
  api: {
    baseUrl: "https://api.jpool.one",
    documentation: "https://docs.jpool.one/",
    endpoints: {
      price: "/price",
      stats: "/stats",
      validators: "/validators",
      apr: "/apr",
      rewards: "/rewards",
    },
  },

  // SDK Information
  sdk: {
    npm: "@jpool/jpool-sdk",
    github: "https://github.com/jpool/jpool-sdk",
    documentation: "https://docs.jpool.one/",
  },

  // Social Media
  social: {
    twitter: "https://twitter.com/jpool_one",
    discord: "https://discord.gg/jpool",
    telegram: "https://t.me/jpool_one",
    reddit: "https://reddit.com/r/jpool",
  },

  // Features
  features: [
    "MEV optimized",
    "Gamified staking",
    "JSOL token for DeFi",
    "High APY potential",
    "No lock-up period",
    "Flexible parameters",
    "Governance participation",
  ],

  // Staking Requirements
  requirements: {
    kyc: false,
    accountVerification: false,
    minimumAge: 18,
    supportedRegions: "Global",
    technicalRequirements: [
      "0.01 SOL minimum",
      "Solana wallet (Phantom, Solflare, etc.)",
      "JPool dApp access",
    ],
  },

  // Risk Factors
  risks: [
    "Smart contract risk",
    "Validator slashing risk",
    "MEV risk",
    "Protocol risk",
    "Higher volatility",
  ],

  // Integration Examples
  examples: {
    getJSOLPrice: `
// Get JSOL price in SOL
import { Connection } from '@solana/web3.js';
import { JPoolClient } from '@jpool/jpool-sdk';

const connection = new Connection('https://api.mainnet-beta.solana.com');
const jpoolClient = new JPoolClient(connection);

const jSOLPrice = await jpoolClient.getJSOLPrice();
console.log('JSOL price in SOL:', jSOLPrice);
    `,
    
    getStats: `
// Get protocol statistics
const response = await fetch('https://api.jpool.one/stats');
const stats = await response.json();
console.log('Protocol stats:', stats);
    `,
    
    getRewards: `
// Get rewards data
const response = await fetch('https://api.jpool.one/rewards');
const rewards = await response.json();
console.log('Rewards:', rewards);
    `,
    
    stakeSOL: `
// Stake SOL to get JSOL
const stakeInstruction = await jpoolClient.createStakeInstruction(amountInLamports);
// Add to transaction and send
    `,
  },
};

// Helper function to get JSOL price
export async function getJSOLPrice(): Promise<number> {
  try {
    const response = await fetch('https://api.jpool.one/price');
    if (response.ok) {
      const data = await response.json();
      return data.jSOLPrice || 0;
    }
  } catch (error) {
    console.error('Error fetching JSOL price:', error);
  }
  return 0;
}

// Helper function to get protocol stats
export async function getProtocolStats() {
  try {
    const response = await fetch('https://api.jpool.one/stats');
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error('Error fetching protocol stats:', error);
  }
  return null;
}

// Helper function to get APR
export async function getAPR(): Promise<number> {
  try {
    const response = await fetch('https://api.jpool.one/apr');
    if (response.ok) {
      const data = await response.json();
      return data.apr || 0;
    }
  } catch (error) {
    console.error('Error fetching APR:', error);
  }
  return 0;
}

// Helper function to get rewards
export async function getRewards() {
  try {
    const response = await fetch('https://api.jpool.one/rewards');
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error('Error fetching rewards:', error);
  }
  return null;
}

// Helper function to get validators
export async function getValidators() {
  try {
    const response = await fetch('https://api.jpool.one/validators');
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error('Error fetching validators:', error);
  }
  return null;
}

// Helper function to check if staking is available
export async function isStakingAvailable(): Promise<boolean> {
  try {
    const stats = await getProtocolStats();
    return stats && stats.totalStaked > 0;
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

export default JPoolStaking;
