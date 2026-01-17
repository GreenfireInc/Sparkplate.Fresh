// Marinade Finance Liquid Staking for Solana (SOL)
// Largest liquid staking protocol on Solana

export const MarinadeStaking = {
  name: "Marinade Finance",
  type: "Liquid Staking",
  website: "https://marinade.finance/",
  description: "Largest liquid staking protocol on Solana, auto-compounding, DeFi integrations",
  liquidStakingToken: "mSOL",
  minimumStake: "0.01 SOL",
  apy: "~7-8%",
  lockPeriod: "Instant unstaking available",
  rewardsFrequency: "Continuous compounding",
  fees: "6% of rewards",
  
  // API Information
  api: {
    baseUrl: "https://api.marinade.finance",
    documentation: "https://docs.marinade.finance/developers/sdk/",
    endpoints: {
      price: "/msol/price_sol",
      apr: "/apr",
      stats: "/stats",
      validators: "/validators",
    },
  },

  // SDK Information
  sdk: {
    npm: "@marinade.finance/marinade-ts-sdk",
    github: "https://github.com/marinade-finance/marinade-ts-sdk",
    documentation: "https://docs.marinade.finance/developers/sdk/",
  },

  // Social Media
  social: {
    twitter: "https://twitter.com/MarinadeFinance",
    discord: "https://discord.gg/mGqja5urdN",
    telegram: "https://t.me/marinade_finance",
    reddit: "https://reddit.com/r/MarinadeFinance",
  },

  // Features
  features: [
    "Largest liquid staking protocol",
    "Auto-compounding rewards",
    "Instant unstaking option",
    "DeFi integrations",
    "100+ validators",
    "No lock-up period",
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
      "Marinade Finance dApp access",
    ],
  },

  // Risk Factors
  risks: [
    "Smart contract risk",
    "Validator slashing risk",
    "Liquidity risk (instant unstaking)",
    "Protocol risk",
  ],

  // Integration Examples
  examples: {
    getMSOLPrice: `
// Get mSOL price in SOL
import { Marinade, MarinadeConfig } from '@marinade.finance/marinade-ts-sdk';
import { Connection } from '@solana/web3.js';

const connection = new Connection('https://api.mainnet-beta.solana.com');
const config = new MarinadeConfig({ connection });
const marinade = new Marinade(config);

const msolPrice = await marinade.getMSolPrice();
console.log('mSOL price in SOL:', msolPrice);
    `,
    
    getAPR: `
// Get current APR
const response = await fetch('https://api.marinade.finance/apr');
const apr = await response.json();
console.log('Current APR:', apr);
    `,
    
    getStats: `
// Get protocol statistics
const response = await fetch('https://api.marinade.finance/stats');
const stats = await response.json();
console.log('Protocol stats:', stats);
    `,
    
    stakeSOL: `
// Stake SOL to get mSOL
const stakeInstruction = await marinade.deposit(amountInLamports);
// Add to transaction and send
    `,
  },
};

// Helper function to get mSOL price
export async function getMSOLPrice(): Promise<number> {
  try {
    const response = await fetch('https://api.marinade.finance/msol/price_sol');
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error('Error fetching mSOL price:', error);
  }
  return 0;
}

// Helper function to get APR
export async function getAPR(): Promise<number> {
  try {
    const response = await fetch('https://api.marinade.finance/apr');
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error('Error fetching APR:', error);
  }
  return 0;
}

// Helper function to get protocol stats
export async function getProtocolStats() {
  try {
    const response = await fetch('https://api.marinade.finance/stats');
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error('Error fetching protocol stats:', error);
  }
  return null;
}

// Helper function to get validator list
export async function getValidators() {
  try {
    const response = await fetch('https://api.marinade.finance/validators');
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

export default MarinadeStaking;
