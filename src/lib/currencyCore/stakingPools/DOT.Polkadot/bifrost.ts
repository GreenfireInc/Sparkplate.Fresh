// Bifrost Liquid Staking Pool for Polkadot (DOT)
// Cross-chain liquid staking protocol with vDOT tokens

export const BifrostFinance = {
  name: "Bifrost",
  type: "Liquid Staking",
  website: "https://bifrost.finance/",
  description: "Cross-chain liquid staking protocol with vDOT tokens for enhanced liquidity",
  minimumStake: "1 DOT",
  apy: "Variable (based on network rewards)",
  lockPeriod: "Instant liquidity with vDOT",
  rewardsFrequency: "Continuous",
  fees: "No fees",
  
  // API Information
  api: {
    baseUrl: "https://api.bifrost.finance",
    documentation: "https://docs.bifrost.finance/",
    endpoints: {
      staking: "/api/liquid-staking/stake",
      unstaking: "/api/liquid-staking/unstake",
      rewards: "/api/liquid-staking/rewards",
      positions: "/api/liquid-staking/positions",
      crossChain: "/api/cross-chain/transfers",
      rates: "/api/liquid-staking/rates",
    },
  },

  // SDK Information
  sdk: {
    npm: "@bifrost-finance/sdk",
    github: "https://github.com/bifrost-finance/bifrost.js",
    documentation: "https://docs.bifrost.finance/",
  },

  // Social Media
  social: {
    twitter: "https://twitter.com/BifrostFinance",
    discord: "https://discord.gg/bifrost",
    telegram: "https://t.me/bifrost_finance",
    reddit: "https://reddit.com/r/BifrostFinance",
  },

  // Features
  features: [
    "Cross-chain liquid staking with vDOT",
    "Multi-chain compatibility",
    "Instant liquidity",
    "Cross-chain transfers",
    "Governance participation",
    "Auto-compounding rewards",
  ],

  // Liquid Staking Tokens
  liquidTokens: [
    {
      name: "vDOT",
      symbol: "vDOT",
      description: "Liquid DOT token representing staked DOT",
      exchangeRate: "Variable (increases over time)",
    },
  ],

  // Supported Chains
  supportedChains: [
    "Polkadot",
    "Kusama",
    "Ethereum",
    "BSC",
    "Avalanche",
    "Moonbeam",
    "Astar",
  ],

  // Cross-Chain Features
  crossChainFeatures: [
    "Transfer vDOT across chains",
    "Cross-chain staking",
    "Multi-chain governance",
    "Cross-chain DeFi integration",
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
    "Cross-chain bridge risk",
  ],

  // Integration Examples
  examples: {
    stakeDOT: `
// Stake DOT and receive vDOT
import { ApiPromise } from '@polkadot/api';
import { Keyring } from '@polkadot/keyring';

const api = await ApiPromise.create({ provider: 'wss://bifrost-rpc.liebi.com' });
const keyring = new Keyring({ type: 'sr25519' });

const stakeAmount = '1000000000000'; // 1 DOT in planck
const account = keyring.addFromUri('//Alice');

const tx = api.tx.vtokenMint.mint('DOT', stakeAmount);
await tx.signAndSend(account, (result) => {
  if (result.status.isInBlock) {
    console.log('Staking successful, vDOT tokens minted');
  }
});
    `,
    
    crossChainTransfer: `
// Transfer vDOT to another chain
const transferAmount = '500000000000'; // 0.5 vDOT
const destinationChain = 'Ethereum';
const tx = api.tx.xcmPallet.reserveTransferAssets(
  { V1: { parents: 0, interior: { X1: { Parachain: 2000 } } } },
  { V1: { parents: 0, interior: { X1: { AccountId32: { network: 'Any', id: account.address } } } } },
  { V1: [{ id: { Concrete: { parents: 0, interior: 'Here' } }, fun: { Fungible: transferAmount } }] },
  0
);
await tx.signAndSend(account, (result) => {
  if (result.status.isInBlock) {
    console.log('Cross-chain transfer successful');
  }
});
    `,
    
    getStakingRates: `
// Get current staking rates
const rates = await api.query.vtokenMint.exchangeRate('DOT');
console.log('vDOT exchange rate:', rates.toHuman());
    `,
    
    getVDOTBalance: `
// Get vDOT balance
const balance = await api.query.tokens.accounts(account.address, 'vDOT');
console.log('vDOT balance:', balance.toHuman());
    `,
  },
};

// Helper function to get current staking rates
export async function getBifrostStakingRates() {
  try {
    const response = await fetch('https://api.bifrost.finance/api/liquid-staking/rates');
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error('Error fetching Bifrost staking rates:', error);
  }
  return null;
}

// Helper function to get vDOT exchange rate
export async function getVDOTExchangeRate() {
  try {
    const response = await fetch('https://api.bifrost.finance/api/liquid-staking/exchange-rate');
    if (response.ok) {
      const data = await response.json();
      return data.exchangeRate;
    }
  } catch (error) {
    console.error('Error fetching vDOT exchange rate:', error);
  }
  return 0;
}

// Helper function to check if staking is available
export async function isStakingAvailable() {
  try {
    const rates = await getBifrostStakingRates();
    return rates && rates.enabled === true;
  } catch (error) {
    console.error('Error checking staking availability:', error);
    return false;
  }
}

// Helper function to get DOT price from Bifrost
export async function getDOTPrice() {
  try {
    const response = await fetch('https://api.bifrost.finance/api/prices');
    if (response.ok) {
      const data = await response.json();
      return data.DOT?.price || 0;
    }
  } catch (error) {
    console.error('Error fetching DOT price:', error);
  }
  return 0;
}

// Helper function to calculate vDOT amount from DOT
export async function calculateVDOTAmount(dotAmount: number) {
  try {
    const exchangeRate = await getVDOTExchangeRate();
    return dotAmount * exchangeRate;
  } catch (error) {
    console.error('Error calculating vDOT amount:', error);
    return 0;
  }
}

// Helper function to calculate DOT amount from vDOT
export async function calculateDOTAmount(vdotAmount: number) {
  try {
    const exchangeRate = await getVDOTExchangeRate();
    return vdotAmount / exchangeRate;
  } catch (error) {
    console.error('Error calculating DOT amount:', error);
    return 0;
  }
}

// Helper function to get supported chains
export async function getSupportedChains() {
  try {
    const response = await fetch('https://api.bifrost.finance/api/supported-chains');
    if (response.ok) {
      const data = await response.json();
      return data.chains;
    }
  } catch (error) {
    console.error('Error fetching supported chains:', error);
  }
  return [];
}

// Helper function to get cross-chain transfer status
export async function getCrossChainTransferStatus(transferId: string) {
  try {
    const response = await fetch(`https://api.bifrost.finance/api/cross-chain/transfers/${transferId}`);
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error('Error fetching transfer status:', error);
  }
  return null;
}

export default BifrostFinance;

