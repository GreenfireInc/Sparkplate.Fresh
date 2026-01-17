// Orion Money Staking Pool for Terra Classic (LUNC)
// Legacy DeFi protocol with staking features

export const OrionMoneyStaking = {
  name: "Orion Money (Legacy)",
  type: "DeFi Staking",
  website: "https://orion.money/",
  description: "Legacy DeFi protocol with staking features",
  minimumStake: "1 LUNC",
  apy: "Variable (based on protocol rewards)",
  lockPeriod: "Variable (based on protocol)",
  rewardsFrequency: "Per epoch",
  fees: "Protocol fees",
  
  // API Information
  api: {
    baseUrl: "https://api.orion.money",
    documentation: "https://docs.orion.money/",
    endpoints: {
      staking: "/api/staking",
      rewards: "/api/rewards",
      stats: "/api/stats",
      pools: "/api/pools",
    },
  },

  // SDK Information
  sdk: {
    npm: "@orion-money/sdk",
    github: "https://github.com/orion-money/sdk",
    documentation: "https://docs.orion.money/",
  },

  // Social Media
  social: {
    twitter: "https://twitter.com/orion_money",
    discord: "https://discord.gg/orionmoney",
    telegram: "https://t.me/orionmoney",
    reddit: "https://reddit.com/r/orionmoney",
  },

  // Features
  features: [
    "DeFi staking protocol",
    "Cross-chain staking",
    "Yield farming",
    "Governance participation",
    "Legacy protocol support",
    "Community-driven",
  ],

  // Staking Requirements
  requirements: {
    kyc: false,
    accountVerification: false,
    minimumAge: 18,
    supportedRegions: "Global",
    technicalRequirements: [
      "1 LUNC minimum",
      "Orion Money wallet",
      "Protocol understanding",
    ],
  },

  // Risk Factors
  risks: [
    "Smart contract risk",
    "Protocol risk",
    "Liquidity risk",
    "Technology risk",
    "Legacy protocol risk",
  ],

  // Integration Examples
  examples: {
    getStakingPools: `
// Get available staking pools
import { OrionSDK } from '@orion-money/sdk';

const orion = new OrionSDK({
  network: 'mainnet',
  rpcUrl: 'https://columbus-lcd.terra.dev'
});

async function getStakingPools() {
  const pools = await orion.getStakingPools();
  const luncPools = pools.filter(pool => pool.asset === 'LUNC');
  console.log('LUNC staking pools:', luncPools);
  return luncPools;
}

getStakingPools();
    `,
    
    stakeLUNC: `
// Stake LUNC
const stakeData = {
  asset: 'LUNC',
  amount: '100', // Amount in LUNC
  poolId: 'lunc-pool-1'
};

orion.stake(stakeData)
  .then(result => {
    console.log('Staking successful:', result);
  })
  .catch(err => console.error('Staking failed:', err));
    `,
    
    unstakeLUNC: `
// Unstake LUNC
const unstakeData = {
  asset: 'LUNC',
  amount: '100', // Amount to unstake
  poolId: 'lunc-pool-1'
};

orion.unstake(unstakeData)
  .then(result => {
    console.log('Unstaking successful:', result);
  })
  .catch(err => console.error('Unstaking failed:', err));
    `,
    
    getRewards: `
// Get staking rewards
orion.getRewards('terra1...')
  .then(rewards => {
    console.log('Staking rewards:', rewards);
  })
  .catch(err => console.error('Error:', err));
    `,
  },
};

// Helper function to get current staking pools
export async function getOrionStakingPools() {
  try {
    const response = await fetch('https://api.orion.money/api/pools');
    if (response.ok) {
      const data = await response.json();
      return data.filter(pool => pool.asset === 'LUNC');
    }
  } catch (error) {
    console.error('Error fetching Orion staking pools:', error);
  }
  return [];
}

// Helper function to get staking rates
export async function getOrionStakingRates() {
  try {
    const pools = await getOrionStakingPools();
    return pools.map(pool => ({
      poolId: pool.poolId,
      asset: pool.asset,
      apy: pool.apy,
      totalStaked: pool.totalStaked,
      minStake: pool.minStake,
    }));
  } catch (error) {
    console.error('Error fetching Orion staking rates:', error);
  }
  return [];
}

// Helper function to check if staking is available
export async function isStakingAvailable() {
  try {
    const pools = await getOrionStakingPools();
    return pools.length > 0;
  } catch (error) {
    console.error('Error checking staking availability:', error);
    return false;
  }
}

// Helper function to get LUNC price from Orion
export async function getLUNCPrice() {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=terra-luna-classic&vs_currencies=usd');
    if (response.ok) {
      const data = await response.json();
      return data['terra-luna-classic']?.usd || 0;
    }
  } catch (error) {
    console.error('Error fetching LUNC price:', error);
  }
  return 0;
}

export default OrionMoneyStaking;

