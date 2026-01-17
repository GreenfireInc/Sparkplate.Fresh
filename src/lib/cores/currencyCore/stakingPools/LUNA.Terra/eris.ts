// Eris Protocol Liquid Staking Pool for Terra (LUNA)
// Amplified liquid staking with auto-compounding rewards (ampLUNA)

export const ErisProtocolStaking = {
  name: "Eris Protocol",
  type: "Liquid Staking",
  website: "https://www.erisprotocol.com/",
  description: "Amplified liquid staking with auto-compounding rewards (ampLUNA)",
  minimumStake: "1 LUNA",
  apy: "Variable (based on network rewards)",
  lockPeriod: "Instant liquidity with ampLUNA",
  rewardsFrequency: "Continuous",
  fees: "No fees",
  
  // API Information
  api: {
    baseUrl: "https://api.erisprotocol.com",
    documentation: "https://docs.erisprotocol.com/",
    endpoints: {
      staking: "/api/staking",
      stats: "/api/stats",
      rewards: "/api/rewards",
      exchangeRate: "/api/exchange-rate",
    },
  },

  // SDK Information
  sdk: {
    npm: "@eris-protocol/sdk",
    github: "https://github.com/eris-protocol/sdk",
    documentation: "https://docs.erisprotocol.com/",
  },

  // Social Media
  social: {
    twitter: "https://twitter.com/erisprotocol",
    discord: "https://discord.gg/erisprotocol",
    telegram: "https://t.me/erisprotocol",
    reddit: "https://reddit.com/r/erisprotocol",
  },

  // Features
  features: [
    "Amplified liquid staking",
    "ampLUNA tokens",
    "Auto-compounding rewards",
    "Instant liquidity",
    "DeFi integration",
    "Governance participation",
  ],

  // Liquid Staking Tokens
  liquidTokens: [
    {
      name: "ampLUNA",
      symbol: "ampLUNA",
      description: "Eris Protocol amplified liquid LUNA token",
      exchangeRate: "Variable (increases over time)",
    },
  ],

  // Contract Addresses
  contracts: {
    ampLUNA: "0x...", // Replace with actual contract address
    stakingContract: "0x...", // Replace with actual contract address
  },

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
  ],

  // Integration Examples
  examples: {
    stakeLUNA: `
// Stake LUNA and receive ampLUNA
import { ErisSDK } from '@eris-protocol/sdk';

const eris = new ErisSDK({
  network: 'mainnet',
  rpcUrl: 'https://phoenix-lcd.terra.dev'
});

const stakeAmount = '1.0'; // 1 LUNA
const tx = await eris.stakeLUNA(stakeAmount);
await tx.wait();

console.log('Staking successful, ampLUNA tokens received');
    `,
    
    getExchangeRate: `
// Get ampLUNA exchange rate
const exchangeRate = await eris.getAmpLUNAExchangeRate();
console.log('ampLUNA per LUNA:', exchangeRate);
    `,
    
    getAPR: `
// Get current APR
const response = await fetch('https://api.erisprotocol.com/api/stats');
const data = await response.json();
console.log('Current APR:', data.apr);
    `,
    
    getStats: `
// Get Eris statistics
const response = await fetch('https://api.erisprotocol.com/api/stats');
const stats = await response.json();
console.log('Total staked LUNA:', stats.totalStaked);
console.log('Total ampLUNA supply:', stats.ampLUNASupply);
    `,
  },
};

// Helper function to get current APR
export async function getErisAPR() {
  try {
    const response = await fetch('https://api.erisprotocol.com/api/stats');
    if (response.ok) {
      const data = await response.json();
      return data.apr;
    }
  } catch (error) {
    console.error('Error fetching Eris APR:', error);
  }
  return 0;
}

// Helper function to get ampLUNA exchange rate
export async function getAmpLUNAExchangeRate() {
  try {
    const response = await fetch('https://api.erisprotocol.com/api/exchange-rate');
    if (response.ok) {
      const data = await response.json();
      return data.exchangeRate;
    }
  } catch (error) {
    console.error('Error fetching ampLUNA exchange rate:', error);
  }
  return 0;
}

// Helper function to get Eris statistics
export async function getErisStats() {
  try {
    const response = await fetch('https://api.erisprotocol.com/api/stats');
    if (response.ok) {
      const data = await response.json();
      return {
        totalStaked: data.totalStaked,
        ampLUNASupply: data.ampLUNASupply,
        exchangeRate: data.exchangeRate,
        apr: data.apr,
      };
    }
  } catch (error) {
    console.error('Error fetching Eris stats:', error);
  }
  return null;
}

// Helper function to check if staking is available
export async function isStakingAvailable() {
  try {
    const stats = await getErisStats();
    return stats && stats.totalStaked > 0;
  } catch (error) {
    console.error('Error checking staking availability:', error);
    return false;
  }
}

// Helper function to get LUNA price from Eris
export async function getLUNAPrice() {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=terra-luna-2&vs_currencies=usd');
    if (response.ok) {
      const data = await response.json();
      return data['terra-luna-2']?.usd || 0;
    }
  } catch (error) {
    console.error('Error fetching LUNA price:', error);
  }
  return 0;
}

// Helper function to calculate ampLUNA amount from LUNA
export async function calculateAmpLUNAAmount(lunaAmount: number) {
  try {
    const exchangeRate = await getAmpLUNAExchangeRate();
    return lunaAmount * exchangeRate;
  } catch (error) {
    console.error('Error calculating ampLUNA amount:', error);
    return 0;
  }
}

// Helper function to calculate LUNA amount from ampLUNA
export async function calculateLUNAAmount(ampLunaAmount: number) {
  try {
    const exchangeRate = await getAmpLUNAExchangeRate();
    return ampLunaAmount / exchangeRate;
  } catch (error) {
    console.error('Error calculating LUNA amount:', error);
    return 0;
  }
}

export default ErisProtocolStaking;

