// SubQuery - Indexing and GraphQL for Polkadot
// Type: Blockchain Indexer / Subgraph Service
// Blockchain: Polkadot (DOT) and Substrate chains

export const subqueryOracle = {
  name: "SubQuery",
  fullName: "SubQuery Network",
  blockchain: "Polkadot (DOT) and Substrate ecosystem",
  type: "Blockchain Indexer / GraphQL API",
  description: "Polkadot's equivalent to The Graph. Decentralized indexing solution that allows developers to query blockchain data via GraphQL APIs. Supports custom indexing for DEX trades, swaps, liquidity, and pricing data.",
  
  url: "https://subquery.network/",
  explorer: "https://explorer.subquery.network/",
  managedService: "https://managedservice.subquery.network/",
  docs: "https://academy.subquery.network/",
  
  api: {
    baseURL: "https://api.subquery.network/sq/",
    documentation: "https://academy.subquery.network/",
    explorerURL: "https://explorer.subquery.network/",
    rateLimit: "Free tier available, managed service for production",
  },
  
  sdk: {
    npm: "axios",
    graphqlClient: "graphql-request",
    installation: "npm install axios graphql-request graphql",
    documentation: "https://academy.subquery.network/",
    features: [
      "GraphQL queries for blockchain data",
      "Custom indexing for DEX data",
      "Historical trade and swap data",
      "Price and liquidity tracking",
      "Event and extrinsic indexing",
      "Multi-chain support",
      "Real-time data subscriptions",
    ],
  },
  
  integration: {
    example: `
// SubQuery Integration for Polkadot DEX Data
import axios from 'axios';
import { request, gql } from 'graphql-request';

// Example SubQuery endpoints (check actual DEX projects for real endpoints)
const SUBQUERY_ENDPOINTS = {
  hydration: 'https://api.subquery.network/sq/galacticcouncil/hydration',
  stellaswap: 'https://api.subquery.network/sq/stellaswap/stellaswap-squid',
  acala: 'https://api.subquery.network/sq/acala/acala-dex',
};

// Query HydraDX price history
async function queryHydrationPriceHistory(assetId: number, limit: number = 100) {
  const query = gql\`
    query {
      pools(
        first: \${limit}
        orderBy: BLOCK_HEIGHT_DESC
        filter: { assetId: { equalTo: \${assetId} } }
      ) {
        nodes {
          id
          assetId
          blockHeight
          timestamp
          price
          volume24h
          liquidity
        }
      }
    }
  \`;
  
  try {
    const data = await request(SUBQUERY_ENDPOINTS.hydration, query);
    return data.pools.nodes;
  } catch (error) {
    console.error('SubQuery error:', error);
    throw error;
  }
}

// Query DEX swap events
async function querySwaps(dex: string, pairAddress: string, limit: number = 50) {
  const endpoint = SUBQUERY_ENDPOINTS[dex as keyof typeof SUBQUERY_ENDPOINTS];
  
  const query = gql\`
    query {
      swaps(
        first: \${limit}
        orderBy: TIMESTAMP_DESC
        filter: { pairId: { equalTo: "\${pairAddress}" } }
      ) {
        nodes {
          id
          pairId
          sender
          amount0In
          amount1In
          amount0Out
          amount1Out
          timestamp
          transaction {
            hash
          }
        }
      }
    }
  \`;
  
  try {
    const data = await request(endpoint, query);
    return data.swaps.nodes;
  } catch (error) {
    console.error('Error querying swaps:', error);
    throw error;
  }
}

// Calculate TWAP from historical data
function calculateTWAP(priceData: any[], hours: number = 24) {
  const now = Date.now();
  const cutoff = now - (hours * 60 * 60 * 1000);
  
  const recentPrices = priceData.filter(p => 
    new Date(p.timestamp).getTime() > cutoff
  );
  
  if (recentPrices.length === 0) return null;
  
  const sum = recentPrices.reduce((acc, p) => acc + parseFloat(p.price), 0);
  return sum / recentPrices.length;
}

// Query current pool state
async function getPoolPrice(endpoint: string, poolId: string) {
  const query = gql\`
    query {
      pool(id: "\${poolId}") {
        id
        token0 {
          id
          symbol
          decimals
        }
        token1 {
          id
          symbol
          decimals
        }
        reserve0
        reserve1
        totalSupply
        volumeUSD
        txCount
      }
    }
  \`;
  
  try {
    const data = await request(endpoint, query);
    const pool = data.pool;
    
    // Calculate price from reserves
    const price = parseFloat(pool.reserve1) / parseFloat(pool.reserve0);
    
    return {
      pool: poolId,
      token0: pool.token0.symbol,
      token1: pool.token1.symbol,
      price,
      reserve0: pool.reserve0,
      reserve1: pool.reserve1,
      volumeUSD: pool.volumeUSD,
    };
  } catch (error) {
    console.error('Error fetching pool:', error);
    throw error;
  }
}

// Generic SubQuery query helper
async function querySubQuery(endpoint: string, query: string, variables: any = {}) {
  try {
    const data = await request(endpoint, query, variables);
    return data;
  } catch (error) {
    console.error('SubQuery query failed:', error);
    throw error;
  }
}

// Get token prices with pagination
async function getTokenPrices(endpoint: string, first: number = 10, offset: number = 0) {
  const query = gql\`
    query(\$first: Int!, \$offset: Int!) {
      tokens(
        first: \$first
        offset: \$offset
        orderBy: VOLUME_USD_DESC
      ) {
        nodes {
          id
          symbol
          name
          decimals
          derivedUSD
          volume24h
          volumeUSD
          liquidity
          priceUSD
        }
      }
    }
  \`;
  
  const data = await querySubQuery(endpoint, query, { first, offset });
  return data.tokens.nodes;
}

// Query liquidity pools
async function getLiquidityPools(endpoint: string, limit: number = 20) {
  const query = gql\`
    query {
      pools(
        first: \${limit}
        orderBy: LIQUIDITY_USD_DESC
      ) {
        nodes {
          id
          token0 {
            symbol
          }
          token1 {
            symbol
          }
          reserve0
          reserve1
          liquidityUSD
          volumeUSD
          txCount
        }
      }
    }
  \`;
  
  try {
    const data = await request(endpoint, query);
    return data.pools.nodes;
  } catch (error) {
    console.error('Error querying pools:', error);
    throw error;
  }
}

// Get account liquidity positions
async function getUserPositions(endpoint: string, userAddress: string) {
  const query = gql\`
    query {
      liquidityPositions(
        filter: { user: { equalTo: "\${userAddress}" } }
      ) {
        nodes {
          id
          user
          pair {
            token0 {
              symbol
            }
            token1 {
              symbol
            }
          }
          liquidityTokenBalance
        }
      }
    }
  \`;
  
  try {
    const data = await request(endpoint, query);
    return data.liquidityPositions.nodes;
  } catch (error) {
    console.error('Error querying user positions:', error);
    throw error;
  }
}

// Query extrinsics (Substrate-specific)
async function getExtrinsics(endpoint: string, limit: number = 10) {
  const query = gql\`
    query {
      extrinsics(
        first: \${limit}
        orderBy: BLOCK_NUMBER_DESC
      ) {
        nodes {
          id
          blockNumber
          extrinsicHash
          module
          call
          success
          timestamp
        }
      }
    }
  \`;
  
  try {
    const data = await request(endpoint, query);
    return data.extrinsics.nodes;
  } catch (error) {
    console.error('Error querying extrinsics:', error);
    throw error;
  }
}

// Usage example
async function main() {
  try {
    console.log('=== SubQuery Integration Examples ===\\n');
    
    // Query HydraDX price history
    console.log('Fetching HydraDX price history...');
    const priceHistory = await queryHydrationPriceHistory(5); // DOT asset ID
    console.log('Price history:', priceHistory.slice(0, 3));
    
    // Calculate TWAP
    const twap24h = calculateTWAP(priceHistory, 24);
    console.log('24h TWAP:', twap24h);
    
    // Get top token prices
    console.log('\\nFetching token prices...');
    const tokens = await getTokenPrices(SUBQUERY_ENDPOINTS.hydration, 5);
    console.log('Top 5 tokens:', tokens);
    
    // Get liquidity pools
    console.log('\\nFetching liquidity pools...');
    const pools = await getLiquidityPools(SUBQUERY_ENDPOINTS.hydration, 5);
    console.log('Top 5 pools:', pools);
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Export functions
export {
  queryHydrationPriceHistory,
  querySwaps,
  calculateTWAP,
  getPoolPrice,
  querySubQuery,
  getTokenPrices,
  getLiquidityPools,
  getUserPositions,
  getExtrinsics,
};

main().catch(console.error);
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/SubQueryNetwork",
    telegram: "https://t.me/subquerynetwork",
    discord: "https://discord.gg/subquery",
    medium: "https://subquery.medium.com/",
    github: "https://github.com/subquery",
  },
  
  features: {
    graphQL: true,
    customIndexing: true,
    historicalData: true,
    realTime: true,
    multiChain: true,
    dexData: true,
    eventIndexing: true,
  },
  
  supportedData: [
    "DEX trades and swaps",
    "Liquidity pool data",
    "Token prices and volumes",
    "Historical price data",
    "Extrinsics and events",
    "Account positions",
    "Transfer history",
    "Staking data",
  ],
  
  dexSupport: [
    "HydraDX/Hydration",
    "StellaSwap (Moonbeam)",
    "Acala Swap",
    "Zenlink",
    "ArthSwap (Astar)",
    "Beamswap (Moonbeam)",
  ],
  
  useCases: [
    "DEX price tracking",
    "Historical trade analysis",
    "Liquidity monitoring",
    "Portfolio tracking",
    "TWAP calculations",
    "DeFi analytics",
    "Custom blockchain indexing",
  ],
  
  notes: [
    "Polkadot's equivalent to The Graph",
    "GraphQL API for blockchain data",
    "Custom indexing for specific use cases",
    "Many DEXs provide SubQuery endpoints",
    "Free tier for development",
    "Managed service for production",
    "Multi-chain support across Substrate ecosystem",
    "Event and extrinsic indexing",
    "Real-time data subscriptions available",
    "Open-source indexer framework",
  ],
  
  resources: {
    website: "https://subquery.network/",
    docs: "https://academy.subquery.network/",
    explorer: "https://explorer.subquery.network/",
    managedService: "https://managedservice.subquery.network/",
    github: "https://github.com/subquery",
  },
  
  deployment: {
    selfHosted: "Open-source framework for self-hosting",
    managedService: "Hosted service with free and paid tiers",
    customIndexers: "Build custom indexers for specific data needs",
  },
};

