// Band Protocol - Native Oracle for Terra Classic Cosmos SDK
// Decentralized oracle with direct Terra Classic integration via CosmWasm

export const bandOracle = {
  name: 'Band Protocol',
  blockchain: 'Terra Classic (LUNC)',
  type: 'Decentralized Oracle Network',
  
  description: `Band Protocol provides reliable and customizable price feeds for Terra Classic (LUNC) through its decentralized network of validators. Built for Cosmos SDK chains, Band offers integration with Terra Classic through CosmWasm smart contracts. Despite the Terra Classic collapse, Band continues to provide LUNC price data, making it suitable for community DeFi projects and recovery efforts on the columbus-5 chain.`,

  features: [
    'Native Cosmos SDK integration',
    'CosmWasm smart contract support',
    'Decentralized validator network',
    'Customizable data feeds',
    'Real-time LUNC price aggregation',
    'Multi-source data validation',
    'On-chain price verification',
    'Terra Classic compatible',
  ],

  api: {
    website: 'https://bandprotocol.com/',
    documentation: 'https://docs.bandchain.org/',
    apiReference: 'https://docs.bandchain.org/develop/api-reference',
    lasr: 'https://lasr.bandprotocol.com/',
    priceFeeds: 'https://data.bandprotocol.com/',
    graphQLEndpoint: 'https://lasr-graphql.bandchain.org/v1/graphql',
  },

  sdk: {
    primaryPackage: '@bandprotocol/bandchain.js',
    terrajsIntegration: '@terra-money/terra.js',
    installCommand: 'npm install @bandprotocol/bandchain.js @terra-money/terra.js',
    supportedLanguages: ['TypeScript', 'JavaScript', 'Python', 'Go', 'Rust'],
  },

  socialMedia: {
    website: 'https://bandprotocol.com/',
    twitter: 'https://twitter.com/BandProtocol',
    discord: 'https://discord.com/invite/3t4bsY7',
    telegram: 'https://t.me/bandprotocol',
    github: 'https://github.com/bandprotocol',
    medium: 'https://medium.com/bandprotocol',
    reddit: 'https://www.reddit.com/r/bandprotocol/',
  },

  terraClassicIntegration: {
    oracleScriptID: 37, // LUNC/USD oracle script on BandChain
    bandchainRPC: 'https://lasr.bandchain.org/api',
    terraClassicContractExample: 'terra1...', // Band reference contract (if available)
  },

  useCases: [
    'Community DeFi protocol price feeds',
    'DEX price oracles',
    'Revival project integrations',
    'Stablecoin mechanisms (historical)',
    'Community governance',
    'Price-dependent smart contracts',
    'Historical data tracking',
  ],

  integration: {
    example: `
import { LCDClient } from '@terra-money/terra.js';
import axios from 'axios';

/**
 * Band Protocol Integration for Terra Classic (LUNC)
 * Native Cosmos SDK oracle with CosmWasm support for columbus-5
 */

const TERRA_CLASSIC_LCD = 'https://fcd.terra.money';
const BAND_API = 'https://lasr.bandprotocol.org/api';
const BAND_GRAPHQL = 'https://lasr-graphql.bandchain.org/v1/graphql';

// Initialize Terra Classic LCD client
const terra = new LCDClient({
  URL: TERRA_CLASSIC_LCD,
  chainID: 'columbus-5',
});

/**
 * Get LUNC price from Band Protocol REST API
 */
async function getBandLUNCPrice() {
  try {
    const response = await axios.get(
      \`\${BAND_API}/oracle/v1/request_prices\`,
      {
        params: {
          symbols: 'LUNC',
          min_count: 10,
          ask_count: 16,
        },
      }
    );

    const luncPrice = response.data.price_results.find(
      (result: any) => result.symbol === 'LUNC'
    );

    if (!luncPrice) {
      throw new Error('LUNC price not found in Band Protocol response');
    }

    const price = parseFloat(luncPrice.px) / 1e9; // Band uses 9 decimals
    const timestamp = new Date(luncPrice.resolve_time);

    console.log(\`Band LUNC/USD Price: $\${price.toFixed(8)}\`);
    console.log(\`Request ID: \${luncPrice.request_id}\`);
    console.log(\`Resolve Time: \${timestamp.toISOString()}\`);

    return {
      price,
      requestId: luncPrice.request_id,
      timestamp,
      minCount: luncPrice.min_count,
      askCount: luncPrice.ask_count,
    };
  } catch (error) {
    console.error('Error fetching Band LUNC price:', error);
    throw error;
  }
}

/**
 * Query Band Protocol data via GraphQL
 */
async function getBandLUNCViaGraphQL() {
  try {
    const query = \`
      query GetLUNCPrice {
        request(
          where: {
            oracle_script_id: {_eq: 37},
            transaction: {block: {timestamp: {_gte: "\${new Date(Date.now() - 3600000).toISOString()}"}}}
          },
          order_by: {id: desc},
          limit: 1
        ) {
          id
          request_time
          resolve_time
          result
          transaction {
            block {
              height
              timestamp
            }
          }
        }
      }
    \`;

    const response = await axios.post(BAND_GRAPHQL, { query });

    const request = response.data.data.request[0];
    
    // Parse the result (Band encodes price as hex)
    const resultHex = request.result;
    const price = parseInt(resultHex, 16) / 1e9;

    console.log(\`Band LUNC/USD (GraphQL): $\${price.toFixed(8)}\`);
    console.log(\`Block Height: \${request.transaction.block.height}\`);
    console.log(\`Timestamp: \${request.resolve_time}\`);

    return {
      price,
      requestId: request.id,
      blockHeight: request.transaction.block.height,
      timestamp: new Date(request.resolve_time),
    };
  } catch (error) {
    console.error('Error querying Band GraphQL:', error);
    throw error;
  }
}

/**
 * Monitor LUNC price changes
 */
async function monitorBandLUNCPrice(
  callback: (price: number, requestId: number) => void,
  intervalMs: number = 10000
) {
  console.log('Starting Band Protocol LUNC price monitoring...\\n');

  let lastRequestId = 0;

  setInterval(async () => {
    try {
      const data = await getBandLUNCPrice();
      
      if (data.requestId !== lastRequestId) {
        console.log(\`New price update: $\${data.price.toFixed(8)}\`);
        lastRequestId = data.requestId;
        callback(data.price, data.requestId);
      }
    } catch (error) {
      console.error('Monitoring error:', error);
    }
  }, intervalMs);
}

/**
 * Validate price freshness
 */
async function validatePriceFreshness(maxAgeMinutes: number = 5) {
  try {
    const data = await getBandLUNCPrice();
    
    const ageMinutes = (Date.now() - data.timestamp.getTime()) / (1000 * 60);
    const isFresh = ageMinutes <= maxAgeMinutes;

    console.log(\`\\nPrice Freshness Check:\`);
    console.log(\`  Age: \${ageMinutes.toFixed(2)} minutes\`);
    console.log(\`  Status: \${isFresh ? '✅ Fresh' : '⚠️ Stale'}\`);

    return {
      price: data.price,
      ageMinutes,
      isFresh,
      timestamp: data.timestamp,
    };
  } catch (error) {
    console.error('Error validating price freshness:', error);
    throw error;
  }
}

// Example usage
async function main() {
  console.log('Fetching LUNC price from Band Protocol...\\n');

  // REST API method
  const restData = await getBandLUNCPrice();
  console.log(\`\\nREST API Price: $\${restData.price.toFixed(8)}\`);

  // Freshness check
  await validatePriceFreshness(5);
}

export {
  getBandLUNCPrice,
  getBandLUNCViaGraphQL,
  monitorBandLUNCPrice,
  validatePriceFreshness,
  BAND_API,
  BAND_GRAPHQL,
};
    `.trim(),
  },

  notes: [
    'Cosmos SDK native integration',
    'CosmWasm smart contract support',
    'Decentralized validator network',
    'Customizable data feeds',
    'GraphQL and REST API support',
    'On-chain price verification',
    'Multi-source data aggregation',
    'Continues supporting LUNC post-collapse',
  ],

  limitations: [
    'Slightly slower updates than Pyth (minutes vs seconds)',
    'Requires understanding of Band oracle scripts',
    'GraphQL queries can be complex',
    'Limited LUNC liquidity may affect accuracy',
  ],

  alternatives: [
    'Pyth Network (for high-frequency updates)',
    'Terra Classic Oracle Module (native on-chain)',
    'DIA (for open-source feeds)',
    'CoinGecko (for market data)',
  ],
};

