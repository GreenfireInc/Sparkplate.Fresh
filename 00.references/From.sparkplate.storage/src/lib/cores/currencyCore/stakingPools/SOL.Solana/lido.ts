// Lido Finance Liquid Staking for Solana (SOL)
// Multi-chain liquid staking including Solana

export const LidoStaking = {
  name: "Lido Finance",
  type: "Liquid Staking",
  website: "https://lido.fi/solana",
  description: "Multi-chain liquid staking including Solana, diversified validators, DeFi integrations",
  liquidStakingToken: "stSOL",
  minimumStake: "0.01 SOL",
  apy: "~5-7%",
  lockPeriod: "No lock-up period",
  rewardsFrequency: "Continuous compounding",
  fees: "10% of rewards",
  
  // API Information
  api: {
    baseUrl: "https://solana.lido.fi/api",
    documentation: "https://docs.lido.fi/",
    endpoints: {
      stats: "/stats",
      validators: "/validators",
      price: "/price",
      apr: "/apr",
    },
  },

  // SDK Information
  sdk: {
    npm: "@lidofinance/lido-solana-sdk",
    github: "https://github.com/lidofinance/lido-solana-sdk",
    documentation: "https://docs.lido.fi/",
  },

  // Social Media
  social: {
    twitter: "https://twitter.com/lidofinance",
    discord: "https://discord.gg/lido",
    telegram: "https://t.me/lidofinance",
    reddit: "https://reddit.com/r/lidofinance",
  },

  // Features
  features: [
    "Multi-chain liquid staking",
    "Diversified validators",
    "DeFi integrations",
    "No lock-up period",
    "Governance participation",
    "Battle-tested protocol",
    "High security",
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
      "Lido dApp access",
    ],
  },

  // Risk Factors
  risks: [
    "Smart contract risk",
    "Validator slashing risk",
    "Protocol risk",
    "Multi-chain complexity",
  ],

  // Integration Examples
  examples: {
    getStSOLPrice: `
// Get stSOL price in SOL
import { Connection } from '@solana/web3.js';
import { LidoClient } from '@lidofinance/lido-solana-sdk';

const connection = new Connection('https://api.mainnet-beta.solana.com');
const lidoClient = new LidoClient(connection);

const stSOLPrice = await lidoClient.getStSOLPrice();
console.log('stSOL price in SOL:', stSOLPrice);
    `,
    
    getStats: `
// Get protocol statistics
const response = await fetch('https://solana.lido.fi/api/stats');
const stats = await response.json();
console.log('Protocol stats:', stats);
    `,
    
    getValidators: `
// Get validator list
const response = await fetch('https://solana.lido.fi/api/validators');
const validators = await response.json();
console.log('Validators:', validators);
    `,
    
    stakeSOL: `
// Stake SOL to get stSOL
const stakeInstruction = await lidoClient.createStakeInstruction(amountInLamports);
// Add to transaction and send
    `,
  },
};

// Helper function to get stSOL price
export async function getStSOLPrice(): Promise<number> {
  try {
    const response = await fetch('https://solana.lido.fi/api/price');
    if (response.ok) {
      const data = await response.json();
      return data.stSOLPrice || 0;
    }
  } catch (error) {
    console.error('Error fetching stSOL price:', error);
  }
  return 0;
}

// Helper function to get protocol stats
export async function getProtocolStats() {
  try {
    const response = await fetch('https://solana.lido.fi/api/stats');
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
    const response = await fetch('https://solana.lido.fi/api/apr');
    if (response.ok) {
      const data = await response.json();
      return data.apr || 0;
    }
  } catch (error) {
    console.error('Error fetching APR:', error);
  }
  return 0;
}

// Helper function to get validators
export async function getValidators() {
  try {
    const response = await fetch('https://solana.lido.fi/api/validators');
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

export default LidoStaking;
