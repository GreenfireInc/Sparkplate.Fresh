// Parallel Finance Liquid Staking Pool for Polkadot (DOT)
// Liquid staking and lending protocol with sDOT tokens

export const ParallelFinance = {
  name: "Parallel Finance",
  type: "Liquid Staking",
  website: "https://parallel.fi/",
  description: "Liquid staking and lending protocol with sDOT tokens for enhanced DeFi",
  minimumStake: "1 DOT",
  apy: "Variable (based on network rewards + lending yields)",
  lockPeriod: "Instant liquidity with sDOT",
  rewardsFrequency: "Continuous",
  fees: "No fees",
  
  // API Information
  api: {
    baseUrl: "https://api.parallel.fi",
    documentation: "https://docs.parallel.fi/",
    endpoints: {
      staking: "/api/liquid-staking/stake",
      unstaking: "/api/liquid-staking/unstake",
      rewards: "/api/liquid-staking/rewards",
      positions: "/api/liquid-staking/positions",
      lending: "/api/lending/rates",
      borrowing: "/api/lending/borrow",
    },
  },

  // SDK Information
  sdk: {
    npm: "@parallel-finance/sdk",
    github: "https://github.com/parallel-finance/parallel.js",
    documentation: "https://docs.parallel.fi/",
  },

  // Social Media
  social: {
    twitter: "https://twitter.com/ParallelFi",
    discord: "https://discord.gg/parallel",
    telegram: "https://t.me/parallelfi",
    reddit: "https://reddit.com/r/ParallelFinance",
  },

  // Features
  features: [
    "Liquid staking with sDOT tokens",
    "Lending and borrowing",
    "Yield farming",
    "Cross-chain compatibility",
    "Governance participation",
    "Auto-compounding rewards",
  ],

  // Liquid Staking Tokens
  liquidTokens: [
    {
      name: "sDOT",
      symbol: "sDOT",
      description: "Liquid DOT token representing staked DOT",
      exchangeRate: "Variable (increases over time)",
    },
  ],

  // DeFi Features
  defiFeatures: [
    "Lending sDOT for additional yield",
    "Borrowing against sDOT collateral",
    "Liquidity provision",
    "Yield farming strategies",
    "Cross-chain transfers",
    "Governance voting",
  ],

  // Staking Requirements
  requirements: {
    kyc: false,
    accountVerification: false,
    minimumAge: 18,
    supportedRegions: "Global",
  },

  // Risk Factors
  risks: [
    "Smart contract risk",
    "Liquidity risk",
    "Slashing risk",
    "Technology risk",
    "Lending protocol risk",
  ],

  // Integration Examples
  examples: {
    stakeDOT: `
// Stake DOT and receive sDOT
import { ApiPromise } from '@polkadot/api';
import { Keyring } from '@polkadot/keyring';

const api = await ApiPromise.create({ provider: 'wss://parallel-rpc-0.parallel.fi' });
const keyring = new Keyring({ type: 'sr25519' });

const stakeAmount = '1000000000000'; // 1 DOT in planck
const account = keyring.addFromUri('//Alice');

const tx = api.tx.parallelLiquidStaking.stake(stakeAmount);
await tx.signAndSend(account, (result) => {
  if (result.status.isInBlock) {
    console.log('Staking successful, sDOT tokens minted');
  }
});
    `,
    
    lendSDOT: `
// Lend sDOT for additional yield
const lendAmount = '500000000000'; // 0.5 sDOT
const tx = api.tx.parallelLending.supply('sDOT', lendAmount);
await tx.signAndSend(account, (result) => {
  if (result.status.isInBlock) {
    console.log('Lending successful');
  }
});
    `,
    
    borrowAgainstSDOT: `
// Borrow against sDOT collateral
const borrowAmount = '100000000000'; // Amount to borrow
const tx = api.tx.parallelLending.borrow('USDT', borrowAmount);
await tx.signAndSend(account, (result) => {
  if (result.status.isInBlock) {
    console.log('Borrowing successful');
  }
});
    `,
    
    getStakingRates: `
// Get current staking rates
const rates = await api.query.parallelLiquidStaking.stakingRate();
console.log('Staking rate:', rates.toHuman());
    `,
    
    getLendingRates: `
// Get lending rates
const lendingRates = await api.query.parallelLending.supplyRate('sDOT');
console.log('sDOT lending rate:', lendingRates.toHuman());
    `,
  },
};

// Helper function to get current staking rates
export async function getParallelStakingRates() {
  try {
    const response = await fetch('https://api.parallel.fi/api/liquid-staking/rates');
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error('Error fetching Parallel staking rates:', error);
  }
  return null;
}

// Helper function to get lending rates
export async function getParallelLendingRates() {
  try {
    const response = await fetch('https://api.parallel.fi/api/lending/rates');
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error('Error fetching Parallel lending rates:', error);
  }
  return null;
}

// Helper function to get sDOT exchange rate
export async function getSDOTExchangeRate() {
  try {
    const response = await fetch('https://api.parallel.fi/api/liquid-staking/exchange-rate');
    if (response.ok) {
      const data = await response.json();
      return data.exchangeRate;
    }
  } catch (error) {
    console.error('Error fetching sDOT exchange rate:', error);
  }
  return 0;
}

// Helper function to check if staking is available
export async function isStakingAvailable() {
  try {
    const rates = await getParallelStakingRates();
    return rates && rates.enabled === true;
  } catch (error) {
    console.error('Error checking staking availability:', error);
    return false;
  }
}

// Helper function to get DOT price from Parallel
export async function getDOTPrice() {
  try {
    const response = await fetch('https://api.parallel.fi/api/prices');
    if (response.ok) {
      const data = await response.json();
      return data.DOT?.price || 0;
    }
  } catch (error) {
    console.error('Error fetching DOT price:', error);
  }
  return 0;
}

// Helper function to calculate sDOT amount from DOT
export async function calculateSDOTAmount(dotAmount: number) {
  try {
    const exchangeRate = await getSDOTExchangeRate();
    return dotAmount * exchangeRate;
  } catch (error) {
    console.error('Error calculating sDOT amount:', error);
    return 0;
  }
}

// Helper function to calculate DOT amount from sDOT
export async function calculateDOTAmount(sdotAmount: number) {
  try {
    const exchangeRate = await getSDOTExchangeRate();
    return sdotAmount / exchangeRate;
  } catch (error) {
    console.error('Error calculating DOT amount:', error);
    return 0;
  }
}

// Helper function to get total APY (staking + lending)
export async function getTotalAPY() {
  try {
    const stakingRates = await getParallelStakingRates();
    const lendingRates = await getParallelLendingRates();
    
    if (stakingRates && lendingRates) {
      const stakingAPY = stakingRates.apy || 0;
      const lendingAPY = lendingRates.sDOT?.apy || 0;
      return stakingAPY + lendingAPY;
    }
  } catch (error) {
    console.error('Error calculating total APY:', error);
  }
  return 0;
}

export default ParallelFinance;

