// Native Polkadot Staking Pool
// Direct staking through Polkadot relay chain

export const NativePolkadotStaking = {
  name: "Polkadot Validators",
  type: "Native Staking",
  website: "https://polkadot.js.org/apps/#/staking",
  description: "Nominate up to 16 validators directly on Polkadot relay chain",
  minimumStake: "1 DOT (for nomination pools) or 250 DOT (direct nomination)",
  apy: "Variable (based on network rewards)",
  lockPeriod: "28 days unbonding period",
  rewardsFrequency: "Per era (6 hours)",
  fees: "Validator commission (0-100%)",
  
  // API Information
  api: {
    baseUrl: "https://polkadot.js.org/apps",
    documentation: "https://polkadot.js.org/docs/",
    endpoints: {
      validators: "/api/query/staking/validators",
      nominators: "/api/query/staking/nominators",
      eras: "/api/query/staking/currentEra",
      rewards: "/api/query/staking/erasRewardPoints",
      pools: "/api/query/nominationPools/pools",
    },
  },

  // SDK Information
  sdk: {
    npm: "@polkadot/api",
    github: "https://github.com/polkadot-js/api",
    documentation: "https://polkadot.js.org/docs/api/",
  },

  // Social Media
  social: {
    twitter: "https://twitter.com/Polkadot",
    discord: "https://discord.gg/polkadot",
    telegram: "https://t.me/polkadot",
    reddit: "https://reddit.com/r/polkadot",
  },

  // Features
  features: [
    "Direct validator nomination",
    "Nomination pools (1 DOT minimum)",
    "Governance participation",
    "Transparent validator selection",
    "Decentralized staking",
    "No third-party risk",
  ],

  // Staking Methods
  stakingMethods: [
    {
      name: "Direct Nomination",
      minimumStake: "250 DOT",
      description: "Directly nominate up to 16 validators",
      unbondingPeriod: "28 days",
    },
    {
      name: "Nomination Pools",
      minimumStake: "1 DOT",
      description: "Join a nomination pool for smaller stakes",
      unbondingPeriod: "28 days",
    },
  ],

  // Validator Information
  validatorInfo: {
    totalValidators: "1000+",
    activeValidators: "297",
    minimumCommission: "0%",
    maximumCommission: "100%",
    averageCommission: "5-10%",
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
    "Slashing risk (validator misbehavior)",
    "Validator downtime",
    "Commission changes",
    "Unbonding period (28 days)",
  ],

  // Integration Examples
  examples: {
    getValidators: `
// Get active validators
import { ApiPromise, WsProvider } from '@polkadot/api';

const wsProvider = new WsProvider('wss://rpc.polkadot.io');
const api = await ApiPromise.create({ provider: wsProvider });

const validators = await api.query.session.validators();
console.log('Active validators:', validators.toHuman());
    `,
    
    getValidatorInfo: `
// Get validator information
const validatorInfo = await api.query.staking.validators(validatorAddress);
console.log('Validator info:', validatorInfo.toHuman());
    `,
    
    getStakingRewards: `
// Get staking rewards for current era
const currentEra = await api.query.staking.currentEra();
const rewards = await api.query.staking.erasRewardPoints(currentEra);
console.log('Era rewards:', rewards.toHuman());
    `,
    
    getNominationPools: `
// Get nomination pools
const pools = await api.query.nominationPools.pools.entries();
pools.forEach(([key, pool]) => {
  console.log('Pool ID:', key.args[0].toString());
  console.log('Pool info:', pool.toHuman());
});
    `,
    
    getStakingStats: `
// Get staking statistics
const totalIssuance = await api.query.balances.totalIssuance();
const activeEra = await api.query.staking.activeEra();
const stakingLedger = await api.query.staking.ledger(accountAddress);

console.log('Total issuance:', totalIssuance.toHuman());
console.log('Active era:', activeEra.toHuman());
console.log('Staking ledger:', stakingLedger.toHuman());
    `,
  },
};

// Helper function to get current era
export async function getCurrentEra() {
  try {
    const response = await fetch('https://polkadot.api.subscan.io/api/scan/metadata');
    if (response.ok) {
      const data = await response.json();
      return data.data?.currentEra || 0;
    }
  } catch (error) {
    console.error('Error fetching current era:', error);
  }
  return 0;
}

// Helper function to get validator count
export async function getValidatorCount() {
  try {
    const response = await fetch('https://polkadot.api.subscan.io/api/scan/staking/validators');
    if (response.ok) {
      const data = await response.json();
      return data.data?.count || 0;
    }
  } catch (error) {
    console.error('Error fetching validator count:', error);
  }
  return 0;
}

// Helper function to get staking statistics
export async function getStakingStats() {
  try {
    const response = await fetch('https://polkadot.api.subscan.io/api/scan/staking/overview');
    if (response.ok) {
      const data = await response.json();
      return {
        totalStaked: data.data?.totalStaked || 0,
        totalValidators: data.data?.totalValidators || 0,
        totalNominators: data.data?.totalNominators || 0,
        stakingRatio: data.data?.stakingRatio || 0,
      };
    }
  } catch (error) {
    console.error('Error fetching staking stats:', error);
  }
  return null;
}

// Helper function to get nomination pools
export async function getNominationPools() {
  try {
    const response = await fetch('https://polkadot.api.subscan.io/api/scan/nomination_pool/list');
    if (response.ok) {
      const data = await response.json();
      return data.data?.list || [];
    }
  } catch (error) {
    console.error('Error fetching nomination pools:', error);
  }
  return [];
}

// Helper function to get validator performance
export async function getValidatorPerformance(validatorAddress: string) {
  try {
    const response = await fetch(`https://polkadot.api.subscan.io/api/scan/staking/validator/${validatorAddress}`);
    if (response.ok) {
      const data = await response.json();
      return data.data;
    }
  } catch (error) {
    console.error('Error fetching validator performance:', error);
  }
  return null;
}

// Helper function to get staking rewards history
export async function getStakingRewardsHistory(accountAddress: string, page = 0) {
  try {
    const response = await fetch(`https://polkadot.api.subscan.io/api/scan/account/reward_slash?address=${accountAddress}&page=${page}`);
    if (response.ok) {
      const data = await response.json();
      return data.data?.list || [];
    }
  } catch (error) {
    console.error('Error fetching staking rewards history:', error);
  }
  return [];
}

// Helper function to get DOT price from Subscan
export async function getDOTPrice() {
  try {
    const response = await fetch('https://polkadot.api.subscan.io/api/scan/token');
    if (response.ok) {
      const data = await response.json();
      return data.data?.price || 0;
    }
  } catch (error) {
    console.error('Error fetching DOT price:', error);
  }
  return 0;
}

// Helper function to calculate staking APY
export async function calculateStakingAPY() {
  try {
    const stats = await getStakingStats();
    if (stats) {
      // This is a simplified calculation
      // Real APY calculation would require historical data
      const baseRewardRate = 0.1; // 10% base reward rate
      const stakingRatio = stats.stakingRatio || 0.5;
      return baseRewardRate / stakingRatio;
    }
  } catch (error) {
    console.error('Error calculating staking APY:', error);
  }
  return 0;
}

export default NativePolkadotStaking;

