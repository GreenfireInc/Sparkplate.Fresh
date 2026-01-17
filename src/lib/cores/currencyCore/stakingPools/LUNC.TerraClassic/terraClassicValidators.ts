// Terra Classic Validators for LUNC
// Native staking through Terra Station Classic with community validators

export const TerraClassicValidators = {
  name: "Terra Classic Validators",
  type: "Native Staking",
  website: "https://station.terra.money/classic",
  description: "Delegate to Terra Classic validators through Terra Station Classic",
  minimumStake: "1 LUNC",
  apy: "Variable (based on validator performance and commission)",
  lockPeriod: "21-day unbonding period",
  rewardsFrequency: "Per epoch",
  fees: "Validator commission (typically 5-20%)",
  
  // API Information
  api: {
    baseUrl: "https://columbus-lcd.terra.dev",
    documentation: "https://classic-docs.terra.money/",
    endpoints: {
      validators: "/cosmos/staking/v1beta1/validators",
      delegations: "/cosmos/staking/v1beta1/delegations/{delegator_addr}",
      rewards: "/cosmos/distribution/v1beta1/delegators/{delegator_addr}/rewards",
      pool: "/cosmos/staking/v1beta1/pool",
      oracle: "/terra/oracle/v1beta1/denoms/exchange_rates",
    },
  },

  // SDK Information
  sdk: {
    npm: "@terra-money/terra.js",
    github: "https://github.com/terra-money/terra.js",
    documentation: "https://terra-money.github.io/terra.js/",
  },

  // Social Media
  social: {
    twitter: "https://twitter.com/TerraClassic",
    discord: "https://discord.gg/terraclassic",
    telegram: "https://t.me/terraclassic",
    reddit: "https://reddit.com/r/terraluna",
  },

  // Features
  features: [
    "Direct delegation to validators",
    "Full control over staking",
    "Governance participation",
    "No third-party risk",
    "21-day unbonding period",
    "Validator selection flexibility",
    "Community-driven validators",
  ],

  // Staking Requirements
  requirements: {
    kyc: false,
    accountVerification: false,
    minimumAge: 18,
    supportedRegions: "Global",
    technicalRequirements: [
      "Terra Station Classic wallet",
      "1 LUNC minimum",
      "Validator selection",
    ],
  },

  // Risk Factors
  risks: [
    "Slashing risk (validator misbehavior)",
    "Validator downtime",
    "21-day unbonding period",
    "Validator commission changes",
    "Network instability post-collapse",
  ],

  // Integration Examples
  examples: {
    getValidators: `
// Get all validators
import { LCDClient } from '@terra-money/terra.js';

const terra = new LCDClient({
  URL: 'https://columbus-lcd.terra.dev',
  chainID: 'columbus-5',
});

async function getValidators() {
  const validators = await terra.staking.validators();
  console.log('Total validators:', validators.length);
  return validators;
}

getValidators();
    `,
    
    getDelegations: `
// Get delegations for an address
async function getDelegations(delegatorAddress: string) {
  const delegations = await terra.staking.delegations(delegatorAddress);
  console.log('Delegations:', delegations);
  return delegations;
}

getDelegations('terra1...');
    `,
    
    getRewards: `
// Get staking rewards
async function getRewards(delegatorAddress: string) {
  const rewards = await terra.distribution.rewards(delegatorAddress);
  console.log('Staking rewards:', rewards);
  return rewards;
}

getRewards('terra1...');
    `,
    
    getStakingPool: `
// Get staking pool information
async function getStakingPool() {
  const pool = await terra.staking.pool();
  console.log('Staking pool:', pool);
  return pool;
}

getStakingPool();
    `,
  },
};

// Helper function to get all validators
export async function getValidators() {
  try {
    const response = await fetch('https://columbus-lcd.terra.dev/cosmos/staking/v1beta1/validators');
    if (response.ok) {
      const data = await response.json();
      return data.validators;
    }
  } catch (error) {
    console.error('Error fetching validators:', error);
  }
  return [];
}

// Helper function to get validator details
export async function getValidatorDetails(validatorAddress: string) {
  try {
    const response = await fetch(`https://columbus-lcd.terra.dev/cosmos/staking/v1beta1/validators/${validatorAddress}`);
    if (response.ok) {
      const data = await response.json();
      return data.validator;
    }
  } catch (error) {
    console.error('Error fetching validator details:', error);
  }
  return null;
}

// Helper function to get delegations for an address
export async function getDelegations(delegatorAddress: string) {
  try {
    const response = await fetch(`https://columbus-lcd.terra.dev/cosmos/staking/v1beta1/delegations/${delegatorAddress}`);
    if (response.ok) {
      const data = await response.json();
      return data.delegation_responses;
    }
  } catch (error) {
    console.error('Error fetching delegations:', error);
  }
  return [];
}

// Helper function to get staking rewards
export async function getStakingRewards(delegatorAddress: string) {
  try {
    const response = await fetch(`https://columbus-lcd.terra.dev/cosmos/distribution/v1beta1/delegators/${delegatorAddress}/rewards`);
    if (response.ok) {
      const data = await response.json();
      return data.rewards;
    }
  } catch (error) {
    console.error('Error fetching staking rewards:', error);
  }
  return [];
}

// Helper function to get staking pool information
export async function getStakingPool() {
  try {
    const response = await fetch('https://columbus-lcd.terra.dev/cosmos/staking/v1beta1/pool');
    if (response.ok) {
      const data = await response.json();
      return data.pool;
    }
  } catch (error) {
    console.error('Error fetching staking pool:', error);
  }
  return null;
}

// Helper function to get LUNC price from Terra Classic oracle
export async function getLUNCPrice() {
  try {
    const response = await fetch('https://columbus-lcd.terra.dev/terra/oracle/v1beta1/denoms/exchange_rates');
    if (response.ok) {
      const data = await response.json();
      const luncRate = data.exchange_rates.find((rate: any) => rate.denom === 'uluna');
      return luncRate ? parseFloat(luncRate.exchange_rate) : 0;
    }
  } catch (error) {
    console.error('Error fetching LUNC price:', error);
  }
  return 0;
}

// Helper function to calculate staking APR
export async function calculateStakingAPR() {
  try {
    const pool = await getStakingPool();
    if (pool) {
      const bondedTokens = parseFloat(pool.bonded_tokens);
      const totalSupply = parseFloat(pool.bonded_tokens) + parseFloat(pool.not_bonded_tokens);
      const stakingRatio = bondedTokens / totalSupply;
      
      // Simplified APR calculation (in practice, use more sophisticated formulas)
      const baseAPR = 0.05; // 5% base APR for Terra Classic
      const apr = baseAPR * stakingRatio;
      return apr;
    }
  } catch (error) {
    console.error('Error calculating staking APR:', error);
  }
  return 0;
}

// Helper function to get validator performance
export async function getValidatorPerformance(validatorAddress: string) {
  try {
    const validator = await getValidatorDetails(validatorAddress);
    if (validator) {
      return {
        moniker: validator.description.moniker,
        commission: parseFloat(validator.commission.commission_rates.rate),
        status: validator.status,
        tokens: parseFloat(validator.tokens),
        delegator_shares: parseFloat(validator.delegator_shares),
      };
    }
  } catch (error) {
    console.error('Error fetching validator performance:', error);
  }
  return null;
}

export default TerraClassicValidators;

