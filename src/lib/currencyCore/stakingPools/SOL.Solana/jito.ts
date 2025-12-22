// Jito Network Liquid Staking for Solana (SOL)
// MEV rewards and liquid staking

export const JitoStaking = {
  name: "Jito Network",
  type: "Liquid Staking",
  website: "https://www.jito.network/",
  description: "Liquid staking with MEV rewards, DeFi composable",
  liquidStakingToken: "JitoSOL",
  minimumStake: "0.01 SOL",
  apy: "~6.9-7.5%",
  lockPeriod: "No lock-up period",
  rewardsFrequency: "Continuous compounding",
  fees: "4% MEV fee, 0.1% withdrawal fee",
  
  // API Information
  api: {
    baseUrl: "https://api.jito.network",
    documentation: "https://docs.jito.network/",
    endpoints: {
      stats: "/api/v1/stake-pool/stats",
      validators: "/api/v1/validators",
      mev: "/api/v1/mev",
      price: "/api/v1/price",
    },
  },

  // SDK Information
  sdk: {
    npm: "@jito-labs/jito-ts-sdk",
    github: "https://github.com/jito-labs/jito-ts-sdk",
    documentation: "https://docs.jito.network/",
  },

  // Social Media
  social: {
    twitter: "https://twitter.com/jito_sol",
    discord: "https://discord.gg/jito",
    telegram: "https://t.me/jito_sol",
    reddit: "https://reddit.com/r/jito",
  },

  // Features
  features: [
    "MEV rewards included",
    "No lock-up period",
    "DeFi composable",
    "Low fees",
    "High performance",
    "Validator diversity",
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
      "Jito dApp access",
    ],
  },

  // Risk Factors
  risks: [
    "Smart contract risk",
    "Validator slashing risk",
    "MEV risk",
    "Protocol risk",
  ],

  // Integration Examples
  examples: {
    getJitoSOLPrice: `
// Get JitoSOL price in SOL
import { Connection } from '@solana/web3.js';
import { JitoClient } from '@jito-labs/jito-ts-sdk';

const connection = new Connection('https://api.mainnet-beta.solana.com');
const jitoClient = new JitoClient(connection);

const jitoSOLPrice = await jitoClient.getJitoSOLPrice();
console.log('JitoSOL price in SOL:', jitoSOLPrice);
    `,
    
    getStats: `
// Get protocol statistics
const response = await fetch('https://api.jito.network/api/v1/stake-pool/stats');
const stats = await response.json();
console.log('Protocol stats:', stats);
    `,
    
    getMEVRewards: `
// Get MEV rewards data
const response = await fetch('https://api.jito.network/api/v1/mev');
const mevData = await response.json();
console.log('MEV rewards:', mevData);
    `,
    
    stakeSOL: `
// Stake SOL to get JitoSOL
const stakeInstruction = await jitoClient.createStakeInstruction(amountInLamports);
// Add to transaction and send
    `,
  },
};

// Helper function to get JitoSOL price
export async function getJitoSOLPrice(): Promise<number> {
  try {
    const response = await fetch('https://api.jito.network/api/v1/price');
    if (response.ok) {
      const data = await response.json();
      return data.jitoSOLPrice || 0;
    }
  } catch (error) {
    console.error('Error fetching JitoSOL price:', error);
  }
  return 0;
}

// Helper function to get protocol stats
export async function getProtocolStats() {
  try {
    const response = await fetch('https://api.jito.network/api/v1/stake-pool/stats');
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error('Error fetching protocol stats:', error);
  }
  return null;
}

// Helper function to get MEV rewards
export async function getMEVRewards() {
  try {
    const response = await fetch('https://api.jito.network/api/v1/mev');
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error('Error fetching MEV rewards:', error);
  }
  return null;
}

// Helper function to get validators
export async function getValidators() {
  try {
    const response = await fetch('https://api.jito.network/api/v1/validators');
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

export default JitoStaking;
