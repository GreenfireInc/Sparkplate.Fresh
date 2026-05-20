// Band Protocol - Native Oracle for Terra Cosmos SDK
// Decentralized oracle with direct Terra integration via CosmWasm

export const bandOracle = {
  name: 'Band Protocol',
  blockchain: 'Terra (LUNA)',
  type: 'Decentralized Oracle Network',
  
  description: `Band Protocol is the most widely used oracle on Terra, providing reliable and customizable price feeds through its decentralized network of validators. Built specifically for Cosmos SDK chains, Band offers native integration with Terra through CosmWasm smart contracts, making it ideal for DeFi protocols, DEXs, and lending platforms requiring trusted LUNA price data.`,

  features: [
    'Native Cosmos SDK integration',
    'CosmWasm smart contract support',
    'Decentralized validator network',
    'Customizable data feeds',
    'Real-time LUNA price aggregation',
    'Multi-source data validation',
    'On-chain price verification',
    'Terra-native architecture',
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

  terraIntegration: {
    oracleScriptID: 37, // LUNA/USD oracle script on BandChain
    bandchainRPC: 'https://lasr.bandchain.org/api',
    terraContractExample: 'terra1...', // Band reference contract on Terra
  },

  useCases: [
    'DeFi protocol price feeds',
    'DEX price oracles',
    'Lending platform collateral pricing',
    'Stablecoin mechanisms',
    'Options and derivatives',
    'Insurance protocols',
    'Yield farming calculators',
  ],

  integration: {
    example: `
import { LCDClient } from '@terra-money/terra.js';
import axios from 'axios';

/**
 * Band Protocol Integration for Terra (LUNA)
 * Native Cosmos SDK oracle with CosmWasm support
 */

const TERRA_LCD = 'https://phoenix-lcd.terra.dev';
const BAND_API = 'https://lasr.bandchain.org/api';
const BAND_GRAPHQL = 'https://lasr-graphql.bandchain.org/v1/graphql';

// Initialize Terra LCD client
const terra = new LCDClient({
  URL: TERRA_LCD,
  chainID: 'phoenix-1',
});

/**
 * Get LUNA price from Band Protocol REST API
 */
async function getBandLUNAPrice() {
  try {
    const response = await axios.get(
      \`\${BAND_API}/oracle/v1/request_prices\`,
      {
        params: {
          symbols: 'LUNA',
          min_count: 10,
          ask_count: 16,
        },
      }
    );

    const lunaPrice = response.data.price_results.find(
      (result: any) => result.symbol === 'LUNA'
    );

    if (!lunaPrice) {
      throw new Error('LUNA price not found in Band Protocol response');
    }

    const price = parseFloat(lunaPrice.px) / 1e9; // Band uses 9 decimals
    const timestamp = new Date(lunaPrice.resolve_time);

    console.log(\`Band LUNA/USD Price: $\${price.toFixed(4)}\`);
    console.log(\`Request ID: \${lunaPrice.request_id}\`);
    console.log(\`Resolve Time: \${timestamp.toISOString()}\`);

    return {
      price,
      requestId: lunaPrice.request_id,
      timestamp,
      minCount: lunaPrice.min_count,
      askCount: lunaPrice.ask_count,
    };
  } catch (error) {
    console.error('Error fetching Band LUNA price:', error);
    throw error;
  }
}

/**
 * Query Band Protocol data via GraphQL
 */
async function getBandLUNAViaGraphQL() {
  try {
    const query = \`
      query GetLUNAPrice {
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

    const response = await axios.post(BAND_GRAPHQL, {
      query,
    });

    const request = response.data.data.request[0];
    
    // Parse the result (Band encodes price as hex)
    const resultHex = request.result;
    const price = parseInt(resultHex, 16) / 1e9;

    console.log(\`Band LUNA/USD (GraphQL): $\${price.toFixed(4)}\`);
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
 * Query Band oracle contract on Terra (if deployed)
 */
async function queryBandContractOnTerra(contractAddress: string) {
  try {
    const result = await terra.wasm.contractQuery(contractAddress, {
      get_reference_data: {
        base_symbol: 'LUNA',
        quote_symbol: 'USD',
      },
    });

    const rate = result.rate / 1e9; // Band uses 9 decimals
    const lastUpdated = new Date(result.last_updated_base * 1000);

    console.log(\`Band Contract LUNA/USD: $\${rate.toFixed(4)}\`);
    console.log(\`Last Updated: \${lastUpdated.toISOString()}\`);

    return {
      rate,
      lastUpdatedBase: result.last_updated_base,
      lastUpdatedQuote: result.last_updated_quote,
      timestamp: lastUpdated,
    };
  } catch (error) {
    console.error('Error querying Band contract on Terra:', error);
    throw error;
  }
}

/**
 * Get multiple price pairs from Band
 */
async function getMultiplePrices(symbols: string[]) {
  try {
    const response = await axios.get(
      \`\${BAND_API}/oracle/v1/request_prices\`,
      {
        params: {
          symbols: symbols.join(','),
          min_count: 10,
          ask_count: 16,
        },
      }
    );

    const prices = response.data.price_results.map((result: any) => ({
      symbol: result.symbol,
      price: parseFloat(result.px) / 1e9,
      requestId: result.request_id,
      timestamp: new Date(result.resolve_time),
    }));

    console.log('\\nBand Protocol Prices:');
    prices.forEach((p: any) => {
      console.log(\`  \${p.symbol}/USD: $\${p.price.toFixed(4)}\`);
    });

    return prices;
  } catch (error) {
    console.error('Error fetching multiple prices from Band:', error);
    throw error;
  }
}

/**
 * Monitor LUNA price updates
 */
async function monitorBandLUNAPrice(
  callback: (price: number, requestId: number) => void,
  intervalMs: number = 10000
) {
  console.log('Starting Band Protocol LUNA price monitoring...\\n');

  let lastRequestId = 0;

  setInterval(async () => {
    try {
      const data = await getBandLUNAPrice();
      
      if (data.requestId !== lastRequestId) {
        console.log(\`New price update: $\${data.price.toFixed(4)}\`);
        lastRequestId = data.requestId;
        callback(data.price, data.requestId);
      }
    } catch (error) {
      console.error('Monitoring error:', error);
    }
  }, intervalMs);
}

/**
 * Get Band oracle request statistics
 */
async function getBandOracleStats() {
  try {
    const query = \`
      query GetOracleStats {
        request_aggregate(
          where: {oracle_script_id: {_eq: 37}},
          distinct_on: id
        ) {
          aggregate {
            count
          }
        }
      }
    \`;

    const response = await axios.post(BAND_GRAPHQL, { query });
    
    const totalRequests = response.data.data.request_aggregate.aggregate.count;

    console.log(\`Total LUNA oracle requests: \${totalRequests}\`);

    return {
      totalRequests,
      oracleScriptId: 37,
    };
  } catch (error) {
    console.error('Error fetching Band oracle stats:', error);
    throw error;
  }
}

/**
 * Validate price freshness
 */
async function validatePriceFreshness(maxAgeMinutes: number = 5) {
  try {
    const data = await getBandLUNAPrice();
    
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
  console.log('Fetching LUNA price from Band Protocol...\\n');

  // REST API method
  const restData = await getBandLUNAPrice();
  console.log(\`\\nREST API Price: $\${restData.price.toFixed(4)}\`);

  // GraphQL method
  const graphqlData = await getBandLUNAViaGraphQL();
  console.log(\`GraphQL Price: $\${graphqlData.price.toFixed(4)}\`);

  // Multiple prices
  const multiplePrices = await getMultiplePrices(['LUNA', 'BTC', 'ETH']);
  console.log(\`\\nFetched \${multiplePrices.length} prices\`);

  // Freshness check
  await validatePriceFreshness(5);

  // Stats
  await getBandOracleStats();
}

export {
  getBandLUNAPrice,
  getBandLUNAViaGraphQL,
  queryBandContractOnTerra,
  getMultiplePrices,
  monitorBandLUNAPrice,
  getBandOracleStats,
  validatePriceFreshness,
  BAND_API,
  BAND_GRAPHQL,
};
    `.trim(),
  },

  notes: [
    'Most widely used oracle on Terra',
    'Native Cosmos SDK integration',
    'CosmWasm smart contract support',
    'Decentralized validator network',
    'Customizable data feeds',
    'GraphQL and REST API support',
    'On-chain price verification',
    'Multi-source data aggregation',
  ],

  limitations: [
    'Slightly slower updates than Pyth (minutes vs seconds)',
    'Requires understanding of Band oracle scripts',
    'GraphQL queries can be complex',
    'Contract deployment requires gas fees',
  ],

  alternatives: [
    'Pyth Network (for high-frequency updates)',
    'Terra Oracle Module (native on-chain)',
    'DIA (for open-source feeds)',
    'CoinGecko (for market data)',
  ],
};

