// Socean Liquid Staking for Solana (SOL)
// SDK available liquid staking protocol

export const SoceanStaking = {
  name: "Socean",
  type: "Liquid Staking",
  website: "https://socean.fi/",
  description: "SDK available liquid staking protocol with scnSOL token",
  liquidStakingToken: "scnSOL",
  minimumStake: "0.01 SOL",
  apy: "~6-7%",
  lockPeriod: "No lock-up period",
  rewardsFrequency: "Continuous compounding",
  fees: "Variable commission",
  
  // API Information
  api: {
    baseUrl: "https://api.socean.fi",
    documentation: "https://docs.socean.fi/",
    endpoints: {
      price: "/en/v1/pools",
      stats: "/en/v1/stats",
      validators: "/en/v1/validators",
      apr: "/en/v1/apr",
    },
  },

  // SDK Information
  sdk: {
    npm: "@socean/solana-stake-pool-sdk",
    github: "https://github.com/igneous-labs/stake-pool-sdk",
    documentation: "https://docs.socean.fi/",
  },

  // Social Media
  social: {
    twitter: "https://twitter.com/socean_fi",
    discord: "https://discord.gg/socean",
    telegram: "https://t.me/socean_fi",
    reddit: "https://reddit.com/r/socean",
  },

  // Features
  features: [
    "SDK available",
    "No lock-up period",
    "Continuous compounding",
    "Validator diversity",
    "Governance participation",
    "DeFi integrations",
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
      "Socean dApp access",
    ],
  },

  // Risk Factors
  risks: [
    "Smart contract risk",
    "Validator slashing risk",
    "Protocol risk",
    "Commission changes",
  ],

  // Integration Examples
  examples: {
    getScnSOLPrice: `
// Get scnSOL price in SOL
import { Connection } from '@solana/web3.js';
import { SoceanClient } from '@socean/solana-stake-pool-sdk';

const connection = new Connection('https://api.mainnet-beta.solana.com');
const soceanClient = new SoceanClient(connection);

const scnSOLPrice = await soceanClient.getScnSOLPrice();
console.log('scnSOL price in SOL:', scnSOLPrice);
    `,
    
    getStats: `
// Get protocol statistics
const response = await fetch('https://api.socean.fi/en/v1/stats');
const stats = await response.json();
console.log('Protocol stats:', stats);
    `,
    
    getPools: `
// Get pool information
const response = await fetch('https://api.socean.fi/en/v1/pools');
const pools = await response.json();
console.log('Pools:', pools);
    `,
    
    stakeSOL: `
// Stake SOL to get scnSOL
const stakeInstruction = await soceanClient.createStakeInstruction(amountInLamports);
// Add to transaction and send
    `,
  },
};

// Helper function to get scnSOL price
export async function getScnSOLPrice(): Promise<number> {
  try {
    const response = await fetch('https://api.socean.fi/en/v1/pools');
    if (response.ok) {
      const data = await response.json();
      return data.scnSOLPrice || 0;
    }
  } catch (error) {
    console.error('Error fetching scnSOL price:', error);
  }
  return 0;
}

// Helper function to get protocol stats
export async function getProtocolStats() {
  try {
    const response = await fetch('https://api.socean.fi/en/v1/stats');
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
    const response = await fetch('https://api.socean.fi/en/v1/apr');
    if (response.ok) {
      const data = await response.json();
      return data.apr || 0;
    }
  } catch (error) {
    console.error('Error fetching APR:', error);
  }
  return 0;
}

// Helper function to get pools
export async function getPools() {
  try {
    const response = await fetch('https://api.socean.fi/en/v1/pools');
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error('Error fetching pools:', error);
  }
  return null;
}

// Helper function to get validators
export async function getValidators() {
  try {
    const response = await fetch('https://api.socean.fi/en/v1/validators');
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

export default SoceanStaking;
