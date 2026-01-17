// Terra Classic Oracle Module - Native On-Chain Price Feeds
// Validator-based price consensus mechanism for Terra Classic blockchain

export const terraClassicOracleModule = {
  name: 'Terra Classic Oracle Module',
  blockchain: 'Terra Classic (LUNC)',
  type: 'Native On-Chain Oracle',
  
  description: `The Terra Classic Oracle Module is Terra Classic's native on-chain oracle system where validators periodically vote on exchange rates for LUNC and other assets using a commit-reveal voting scheme. The protocol updates on-chain prices based on the weighted median of validator votes, ensuring decentralized and consensus-driven price feeds. This oracle powered the original Terra ecosystem and continues to serve the Terra Classic community post-collapse.`,

  features: [
    'Native blockchain integration',
    'Validator consensus mechanism',
    'Commit-reveal voting scheme',
    'Weighted median aggregation',
    'On-chain price storage',
    'Slashing for incorrect votes',
    'Vote period: ~5 blocks',
    'Rewards for accurate voting',
  ],

  api: {
    documentation: 'https://classic-docs.terra.money/docs/develop/module-specifications/spec-oracle.html',
    lcdEndpoint: 'https://fcd.terra.money',
    terraClassicDocs: 'https://classic-docs.terra.money/',
    swaggerUI: 'https://terra-classic-lcd.publicnode.com/swagger/',
    publicNodeLCD: 'https://terra-classic-lcd.publicnode.com',
  },

  sdk: {
    primaryPackage: '@terra-money/terra.js',
    classicTerraJS: '@terra-money/terra.js (for columbus-5)',
    cosmosjsPackage: '@cosmjs/stargate',
    installCommand: 'npm install @terra-money/terra.js',
    supportedLanguages: ['TypeScript', 'JavaScript', 'Go', 'Python'],
  },

  socialMedia: {
    website: 'https://www.terraclassic.community/',
    twitter: 'https://twitter.com/TerraClassic',
    discord: 'https://discord.gg/terraclassic',
    telegram: 'https://t.me/terraclassic',
    github: 'https://github.com/classic-terra',
    reddit: 'https://www.reddit.com/r/terraluna/',
    forum: 'https://classic-agora.terra.money/',
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
    'Legacy Terra Classic DeFi protocols',
    'USTC stablecoin mechanisms (historical)',
    'Collateral valuation',
    'On-chain governance',
    'Validator operations',
    'Price-dependent smart contracts',
    'Community revival projects',
  ],

  integration: {
    example: `
import { LCDClient } from '@terra-money/terra.js';
import axios from 'axios';

/**
 * Terra Classic Oracle Module Integration
 * Native on-chain oracle with validator consensus for columbus-5
 */

const TERRA_CLASSIC_LCD = 'https://fcd.terra.money';
const CHAIN_ID = 'columbus-5';

// Initialize Terra Classic LCD client
const terra = new LCDClient({
  URL: TERRA_CLASSIC_LCD,
  chainID: CHAIN_ID,
});

/**
 * Get LUNC exchange rates from Terra Classic Oracle Module (LCD API)
 */
async function getTerraClassicOracleExchangeRates() {
  try {
    const response = await axios.get(
      \`\${TERRA_CLASSIC_LCD}/terra/oracle/v1beta1/denoms/exchange_rates\`
    );

    const rates = response.data.exchange_rates;

    console.log('Terra Classic Oracle Exchange Rates:');
    rates.forEach((rate: any) => {
      console.log(\`  \${rate.denom}: \${parseFloat(rate.amount).toFixed(6)}\`);
    });

    return rates.map((rate: any) => ({
      denom: rate.denom,
      rate: parseFloat(rate.amount),
    }));
  } catch (error) {
    console.error('Error fetching Terra Classic oracle exchange rates:', error);
    throw error;
  }
}

/**
 * Get specific LUNC/USD rate
 */
async function getLUNCExchangeRate(quoteDenom: string = 'uusd') {
  try {
    const rates = await getTerraClassicOracleExchangeRates();
    
    // LUNC might be listed as 'uluna' or 'ulunc' depending on the endpoint
    const luncRate = rates.find(r => 
      r.denom === quoteDenom || 
      r.denom === 'uluna' || 
      r.denom === 'ulunc'
    );

    if (!luncRate) {
      throw new Error(\`Exchange rate for \${quoteDenom} not found\`);
    }

    console.log(\`\\nLUNC/\${quoteDenom.toUpperCase()} Rate: \${luncRate.rate.toFixed(6)}\`);

    return {
      denom: quoteDenom,
      rate: luncRate.rate,
      price: luncRate.rate, // For USD compatibility
    };
  } catch (error) {
    console.error('Error fetching LUNC exchange rate:', error);
    throw error;
  }
}

/**
 * Query oracle parameters using Terra.js
 */
async function getOracleParameters() {
  try {
    const params = await terra.oracle.parameters();

    console.log('\\nTerra Classic Oracle Parameters:');
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
      \`\${TERRA_CLASSIC_LCD}/terra/oracle/v1beta1/denoms/actives\`
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
      \`\${TERRA_CLASSIC_LCD}/terra/oracle/v1beta1/validators/\${validatorAddress}/miss\`
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
      \`\${TERRA_CLASSIC_LCD}/terra/oracle/v1beta1/validators/\${validatorAddress}/feeder\`
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
 * Monitor LUNC exchange rate changes
 */
async function monitorLUNCRate(
  callback: (rate: number) => void,
  intervalMs: number = 30000
) {
  console.log('Starting Terra Classic Oracle LUNC rate monitoring...\\n');

  let lastRate: number | null = null;

  setInterval(async () => {
    try {
      const data = await getLUNCExchangeRate();
      
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
      getTerraClassicOracleExchangeRates(),
      getActiveDenoms(),
      getOracleParameters(),
    ]);

    console.log('\\n=== Terra Classic Oracle Status ===');
    console.log(\`Active Denoms: \${denoms.length}\`);
    console.log(\`Exchange Rates: \${rates.length}\`);
    console.log(\`Vote Period: \${params.vote_period} blocks (~5 blocks)\`);
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
    const oracleData = await getLUNCExchangeRate();
    
    const difference = Math.abs(oracleData.rate - externalPrice);
    const differencePercent = (difference / externalPrice) * 100;
    const isConsistent = differencePercent <= maxDifferencePercent;

    console.log(\`\\nRate Consistency Check:\`);
    console.log(\`  Terra Classic Oracle: $\${oracleData.rate.toFixed(6)}\`);
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

/**
 * Get USTC exchange rate (historical interest)
 */
async function getUSTCRate() {
  try {
    const rates = await getTerraClassicOracleExchangeRates();
    
    const ustcRate = rates.find(r => 
      r.denom === 'uusd' || 
      r.denom === 'ustc'
    );

    if (ustcRate) {
      console.log(\`\\nUSTC Rate: \${ustcRate.rate.toFixed(6)}\`);
      console.log('Note: USTC is the failed algorithmic stablecoin');
    }

    return ustcRate;
  } catch (error) {
    console.error('Error fetching USTC rate:', error);
    throw error;
  }
}

// Example usage
async function main() {
  console.log('Querying Terra Classic Oracle Module...\\n');

  // Get all exchange rates
  const rates = await getTerraClassicOracleExchangeRates();
  console.log(\`\\nFound \${rates.length} exchange rates\`);

  // Get LUNC rate
  const luncRate = await getLUNCExchangeRate();
  console.log(\`\\nLUNC Rate: $\${luncRate.rate.toFixed(6)}\`);

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

  // Check USTC (historical)
  await getUSTCRate();
}

export {
  getTerraClassicOracleExchangeRates,
  getLUNCExchangeRate,
  getOracleParameters,
  getActiveDenoms,
  getValidatorMissCounter,
  getFeederDelegation,
  monitorLUNCRate,
  getOracleStatus,
  validateRateConsistency,
  getOracleVotingStats,
  getUSTCRate,
  TERRA_CLASSIC_LCD,
};
    `.trim(),
  },

  notes: [
    'Most trusted source for on-chain LUNC pricing',
    'Validator consensus mechanism',
    'Commit-reveal voting prevents manipulation',
    'Slashing mechanism ensures accuracy',
    'Native integration with Terra Classic protocols',
    'Real-time on-chain updates',
    'No API key required',
    'Free access via LCD endpoints',
  ],

  limitations: [
    'Only available for Terra Classic blockchain data',
    'Update frequency tied to block time (~6 seconds)',
    'Requires Terra Classic LCD node access',
    'Limited to validator-supported assets',
    'No historical data storage',
    'Post-collapse ecosystem has reduced activity',
  ],

  alternatives: [
    'Pyth Network (for high-frequency)',
    'Band Protocol (for customizable feeds)',
    'DIA (for transparent methodologies)',
    'CoinGecko (for market data)',
    'Mintscan (for explorer data)',
  ],

  historicalContext: `
    Terra Classic (columbus-5) is the original Terra blockchain that suffered a
    catastrophic collapse in May 2022 when its algorithmic stablecoin UST lost
    its peg. The native oracle module continues to operate, providing price feeds
    for the community-driven revival effort. The chain experienced massive supply
    inflation post-collapse (from ~350M to 6.9T LUNC tokens).
  `,
};

