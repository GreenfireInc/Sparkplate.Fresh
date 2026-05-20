// Terra Oracle Module - Native On-Chain Price Feeds
// Validator-based price consensus mechanism for Terra blockchain

export const terraOracleModule = {
  name: 'Terra Oracle Module',
  blockchain: 'Terra (LUNA)',
  type: 'Native On-Chain Oracle',
  
  description: `The Terra Oracle Module is Terra's native on-chain oracle system where validators periodically vote on exchange rates for LUNA and other assets. The protocol updates on-chain prices based on the weighted median of validator votes, ensuring decentralized and consensus-driven price feeds. This is the most trusted source for LUNA pricing within Terra's ecosystem, used by native protocols and dApps.`,

  features: [
    'Native blockchain integration',
    'Validator consensus mechanism',
    'Weighted median aggregation',
    'On-chain price storage',
    'Real-time validator voting',
    'Slashing for incorrect votes',
    'Multi-asset support',
    'Cosmos SDK native',
  ],

  api: {
    documentation: 'https://classic-docs.terra.money/docs/develop/module-specifications/spec-oracle.html',
    lcdEndpoint: 'https://phoenix-lcd.terra.dev',
    terraDocsNew: 'https://docs.terra.money/',
    terraDocsClassic: 'https://classic-docs.terra.money/',
    swaggerUI: 'https://phoenix-lcd.terra.dev/swagger/',
  },

  sdk: {
    primaryPackage: '@terra-money/terra.js',
    featherPackage: '@terra-money/feather.js',
    cosmosjsPackage: '@cosmjs/stargate',
    installCommand: 'npm install @terra-money/terra.js',
    supportedLanguages: ['TypeScript', 'JavaScript', 'Go', 'Python'],
  },

  socialMedia: {
    website: 'https://www.terra.money/',
    twitter: 'https://twitter.com/terra_money',
    discord: 'https://discord.gg/terra-money',
    telegram: 'https://t.me/terramoneydot',
    github: 'https://github.com/terra-money',
    reddit: 'https://www.reddit.com/r/terraluna/',
    forum: 'https://agora.terra.money/',
  },

  oracleEndpoints: {
    exchangeRates: '/terra/oracle/v1beta1/denoms/exchange_rates',
    activeDenoms: '/terra/oracle/v1beta1/denoms/actives',
    feederDelegation: '/terra/oracle/v1beta1/validators/{validator}/feeder',
    missCounter: '/terra/oracle/v1beta1/validators/{validator}/miss',
    aggregatePrevote: '/terra/oracle/v1beta1/validators/{validator}/aggregate_prevote',
    aggregateVote: '/terra/oracle/v1beta1/validators/{validator}/aggregate_vote',
    params: '/terra/oracle/v1beta1/params',
  },

  useCases: [
    'Native Terra DeFi protocols',
    'Stablecoin minting mechanisms',
    'Collateral valuation',
    'On-chain governance',
    'Validator operations',
    'Price-dependent smart contracts',
    'Terra Station integrations',
  ],

  integration: {
    example: `
import { LCDClient } from '@terra-money/terra.js';
import axios from 'axios';

/**
 * Terra Oracle Module Integration
 * Native on-chain oracle with validator consensus
 */

const TERRA_LCD = 'https://phoenix-lcd.terra.dev';
const CHAIN_ID = 'phoenix-1';

// Initialize Terra LCD client
const terra = new LCDClient({
  URL: TERRA_LCD,
  chainID: CHAIN_ID,
});

/**
 * Get LUNA exchange rates from Terra Oracle Module (LCD API)
 */
async function getTerraOracleExchangeRates() {
  try {
    const response = await axios.get(
      \`\${TERRA_LCD}/terra/oracle/v1beta1/denoms/exchange_rates\`
    );

    const rates = response.data.exchange_rates;

    console.log('Terra Oracle Exchange Rates:');
    rates.forEach((rate: any) => {
      console.log(\`  \${rate.denom}: \${parseFloat(rate.amount).toFixed(6)}\`);
    });

    return rates.map((rate: any) => ({
      denom: rate.denom,
      rate: parseFloat(rate.amount),
    }));
  } catch (error) {
    console.error('Error fetching Terra oracle exchange rates:', error);
    throw error;
  }
}

/**
 * Get specific LUNA/USD rate
 */
async function getLUNAExchangeRate(quoteDenom: string = 'uusd') {
  try {
    const rates = await getTerraOracleExchangeRates();
    
    const lunaRate = rates.find(r => r.denom === quoteDenom);

    if (!lunaRate) {
      throw new Error(\`Exchange rate for \${quoteDenom} not found\`);
    }

    console.log(\`\\nLUNA/\${quoteDenom.toUpperCase()} Rate: \${lunaRate.rate.toFixed(6)}\`);

    return {
      denom: quoteDenom,
      rate: lunaRate.rate,
      price: lunaRate.rate, // For USD compatibility
    };
  } catch (error) {
    console.error('Error fetching LUNA exchange rate:', error);
    throw error;
  }
}

/**
 * Query oracle parameters using Terra.js
 */
async function getOracleParameters() {
  try {
    const params = await terra.oracle.parameters();

    console.log('\\nTerra Oracle Parameters:');
    console.log(\`  Vote Period: \${params.vote_period}\`);
    console.log(\`  Vote Threshold: \${params.vote_threshold}\`);
    console.log(\`  Reward Band: \${params.reward_band}\`);
    console.log(\`  Slash Fraction: \${params.slash_fraction}\`);
    console.log(\`  Slash Window: \${params.slash_window}\`);
    console.log(\`  Min Valid Per Window: \${params.min_valid_per_window}\`);

    return params;
  } catch (error) {
    console.error('Error fetching oracle parameters:', error);
    throw error;
  }
}

/**
 * Get active denoms (asset pairs) in the oracle
 */
async function getActiveDenoms() {
  try {
    const response = await axios.get(
      \`\${TERRA_LCD}/terra/oracle/v1beta1/denoms/actives\`
    );

    const denoms = response.data.actives;

    console.log(\`\\nActive Oracle Denoms (\${denoms.length}):\`);
    denoms.forEach((denom: string) => {
      console.log(\`  - \${denom}\`);
    });

    return denoms;
  } catch (error) {
    console.error('Error fetching active denoms:', error);
    throw error;
  }
}

/**
 * Get validator's oracle vote miss counter
 */
async function getValidatorMissCounter(validatorAddress: string) {
  try {
    const response = await axios.get(
      \`\${TERRA_LCD}/terra/oracle/v1beta1/validators/\${validatorAddress}/miss\`
    );

    const missCounter = response.data.miss_counter;

    console.log(\`\\nValidator \${validatorAddress}:\`);
    console.log(\`  Miss Counter: \${missCounter}\`);

    return {
      validator: validatorAddress,
      missCounter: parseInt(missCounter),
    };
  } catch (error) {
    console.error('Error fetching validator miss counter:', error);
    throw error;
  }
}

/**
 * Get validator's feeder delegation
 */
async function getFeederDelegation(validatorAddress: string) {
  try {
    const response = await axios.get(
      \`\${TERRA_LCD}/terra/oracle/v1beta1/validators/\${validatorAddress}/feeder\`
    );

    const feederAddr = response.data.feeder_addr;

    console.log(\`\\nValidator \${validatorAddress}:\`);
    console.log(\`  Feeder Address: \${feederAddr}\`);

    return {
      validator: validatorAddress,
      feederAddr,
    };
  } catch (error) {
    console.error('Error fetching feeder delegation:', error);
    throw error;
  }
}

/**
 * Monitor LUNA exchange rate changes
 */
async function monitorLUNARate(
  callback: (rate: number) => void,
  intervalMs: number = 30000
) {
  console.log('Starting Terra Oracle LUNA rate monitoring...\\n');

  let lastRate: number | null = null;

  setInterval(async () => {
    try {
      const data = await getLUNAExchangeRate();
      
      if (lastRate !== null) {
        const change = ((data.rate - lastRate) / lastRate) * 100;
        console.log(
          \`Rate: \${data.rate.toFixed(6)} (\${change >= 0 ? '+' : ''}\${change.toFixed(2)}%)\`
        );
      } else {
        console.log(\`Initial rate: \${data.rate.toFixed(6)}\`);
      }
      
      lastRate = data.rate;
      callback(data.rate);
    } catch (error) {
      console.error('Monitoring error:', error);
    }
  }, intervalMs);
}

/**
 * Get comprehensive oracle status
 */
async function getOracleStatus() {
  try {
    const [rates, denoms, params] = await Promise.all([
      getTerraOracleExchangeRates(),
      getActiveDenoms(),
      getOracleParameters(),
    ]);

    console.log('\\n=== Terra Oracle Status ===');
    console.log(\`Active Denoms: \${denoms.length}\`);
    console.log(\`Exchange Rates: \${rates.length}\`);
    console.log(\`Vote Period: \${params.vote_period} blocks\`);
    console.log(\`Vote Threshold: \${params.vote_threshold}\`);

    return {
      rates,
      activeDenoms: denoms,
      parameters: params,
      timestamp: new Date(),
    };
  } catch (error) {
    console.error('Error fetching oracle status:', error);
    throw error;
  }
}

/**
 * Validate rate consistency
 */
async function validateRateConsistency(
  externalPrice: number,
  maxDifferencePercent: number = 5
) {
  try {
    const oracleData = await getLUNAExchangeRate();
    
    const difference = Math.abs(oracleData.rate - externalPrice);
    const differencePercent = (difference / externalPrice) * 100;
    const isConsistent = differencePercent <= maxDifferencePercent;

    console.log(\`\\nRate Consistency Check:\`);
    console.log(\`  Terra Oracle: $\${oracleData.rate.toFixed(6)}\`);
    console.log(\`  External Source: $\${externalPrice.toFixed(6)}\`);
    console.log(\`  Difference: \${differencePercent.toFixed(2)}%\`);
    console.log(\`  Status: \${isConsistent ? '✅ Consistent' : '⚠️ Divergent'}\`);

    return {
      oracleRate: oracleData.rate,
      externalPrice,
      difference,
      differencePercent,
      isConsistent,
    };
  } catch (error) {
    console.error('Error validating rate consistency:', error);
    throw error;
  }
}

/**
 * Get oracle voting statistics
 */
async function getOracleVotingStats() {
  try {
    const params = await getOracleParameters();
    
    const votePeriodMinutes = (parseInt(params.vote_period) * 6) / 60; // ~6 sec per block
    const slashWindowBlocks = parseInt(params.slash_window);
    const minValidPerWindow = parseFloat(params.min_valid_per_window);

    console.log('\\n=== Oracle Voting Statistics ===');
    console.log(\`Vote Period: ~\${votePeriodMinutes.toFixed(1)} minutes\`);
    console.log(\`Slash Window: \${slashWindowBlocks} blocks\`);
    console.log(\`Min Valid Per Window: \${(minValidPerWindow * 100).toFixed(0)}%\`);
    console.log(\`Reward Band: \${params.reward_band}\`);
    console.log(\`Slash Fraction: \${params.slash_fraction}\`);

    return {
      votePeriodMinutes,
      slashWindowBlocks,
      minValidPerWindow,
      rewardBand: params.reward_band,
      slashFraction: params.slash_fraction,
    };
  } catch (error) {
    console.error('Error fetching voting stats:', error);
    throw error;
  }
}

// Example usage
async function main() {
  console.log('Querying Terra Oracle Module...\\n');

  // Get all exchange rates
  const rates = await getTerraOracleExchangeRates();
  console.log(\`\\nFound \${rates.length} exchange rates\`);

  // Get LUNA rate
  const lunaRate = await getLUNAExchangeRate();
  console.log(\`\\nLUNA Rate: $\${lunaRate.rate.toFixed(6)}\`);

  // Get active denoms
  const denoms = await getActiveDenoms();
  console.log(\`\\nActive denoms: \${denoms.length}\`);

  // Get oracle parameters
  const params = await getOracleParameters();
  console.log(\`\\nVote period: \${params.vote_period} blocks\`);

  // Get voting statistics
  await getOracleVotingStats();

  // Get full status
  await getOracleStatus();
}

export {
  getTerraOracleExchangeRates,
  getLUNAExchangeRate,
  getOracleParameters,
  getActiveDenoms,
  getValidatorMissCounter,
  getFeederDelegation,
  monitorLUNARate,
  getOracleStatus,
  validateRateConsistency,
  getOracleVotingStats,
  TERRA_LCD,
};
    `.trim(),
  },

  notes: [
    'Most trusted source for on-chain LUNA pricing',
    'Validator consensus mechanism',
    'Weighted median aggregation prevents manipulation',
    'Slashing mechanism ensures accuracy',
    'Native integration with Terra protocols',
    'Real-time on-chain updates',
    'No API key required',
    'Free access via LCD endpoints',
  ],

  limitations: [
    'Only available for Terra blockchain data',
    'Update frequency tied to block time (~6 seconds)',
    'Requires Terra LCD node access',
    'Limited to validator-supported assets',
    'No historical data storage',
  ],

  alternatives: [
    'Pyth Network (for high-frequency)',
    'Band Protocol (for customizable feeds)',
    'DIA (for transparent methodologies)',
    'Mintscan (for explorer data)',
  ],
};

