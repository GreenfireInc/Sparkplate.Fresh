// The Graph - Decentralized Indexing Protocol for Ethereum
// Query blockchain data using GraphQL subgraphs

export const thegraphOracle = {
  name: 'The Graph',
  blockchain: 'Ethereum (ETH)',
  type: 'Indexing Protocol / Subgraph Oracle',
  
  description: `The Graph is a decentralized indexing protocol that allows developers to query Ethereum blockchain data using GraphQL. It provides subgraphs for major DEXs like Uniswap, SushiSwap, Balancer, and Curve, enabling efficient queries for historical data, swap events, liquidity metrics, and token prices without direct blockchain queries.`,

  features: [
    'GraphQL-based blockchain data queries',
    'Decentralized indexing network',
    'Subgraphs for major DEXs and protocols',
    'Historical data access',
    'Real-time and indexed data',
    'Custom subgraph deployment',
    'Multi-chain support',
    'Efficient data aggregation',
  ],

  api: {
    website: 'https://thegraph.com/',
    documentation: 'https://thegraph.com/docs/',
    explorer: 'https://thegraph.com/explorer',
    hostedService: 'https://thegraph.com/hosted-service',
    studioDocs: 'https://thegraph.com/docs/en/studio/',
    queryingDocs: 'https://thegraph.com/docs/en/querying/querying-the-graph/',
  },

  sdk: {
    primaryPackage: 'graphql-request',
    secondaryPackage: '@apollo/client',
    installCommand: 'npm install graphql-request graphql',
    supportedLanguages: ['TypeScript', 'JavaScript', 'Python', 'Go'],
  },

  socialMedia: {
    website: 'https://thegraph.com/',
    twitter: 'https://twitter.com/graphprotocol',
    discord: 'https://discord.gg/graphprotocol',
    telegram: 'https://t.me/GraphProtocol',
    github: 'https://github.com/graphprotocol',
    blog: 'https://thegraph.com/blog/',
  },

  subgraphs: {
    uniswapV2: 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2',
    uniswapV3: 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3',
    sushiswap: 'https://api.thegraph.com/subgraphs/name/sushiswap/exchange',
    balancerV2: 'https://api.thegraph.com/subgraphs/name/balancer-labs/balancer-v2',
    curve: 'https://api.thegraph.com/subgraphs/name/convex-community/curve-stablecoin',
  },

  useCases: [
    'DEX historical price queries',
    'Token swap event tracking',
    'Liquidity pool analytics',
    'Trading volume analysis',
    'User transaction history',
    'Token holder tracking',
    'Protocol analytics dashboards',
  ],

  integration: {
    example: `
import { request, gql } from 'graphql-request';

/**
 * The Graph Integration for Ethereum
 * Query DEX data using GraphQL subgraphs
 */

// Subgraph endpoints
const SUBGRAPHS = {
  uniswapV3: 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3',
  uniswapV2: 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2',
  sushiswap: 'https://api.thegraph.com/subgraphs/name/sushiswap/exchange',
  balancer: 'https://api.thegraph.com/subgraphs/name/balancer-labs/balancer-v2',
};

/**
 * Get token price from Uniswap V3
 */
async function getUniswapV3TokenPrice(tokenAddress: string) {
  const query = gql\`
    query GetTokenPrice($tokenId: String!) {
      token(id: $tokenId) {
        id
        name
        symbol
        derivedETH
        volumeUSD
        totalValueLockedUSD
      }
    }
  \`;

  try {
    const data = await request(SUBGRAPHS.uniswapV3, query, {
      tokenId: tokenAddress.toLowerCase(),
    });

    console.log(\`Token: \${data.token.symbol}\`);
    console.log(\`Price (ETH): \${data.token.derivedETH}\`);
    console.log(\`TVL: $\${parseFloat(data.token.totalValueLockedUSD).toLocaleString()}\`);

    return data.token;
  } catch (error) {
    console.error('Error fetching token price:', error);
    throw error;
  }
}

/**
 * Get top Uniswap V3 pools by liquidity
 */
async function getTopPools(limit: number = 10) {
  const query = gql\`
    query GetTopPools($limit: Int!) {
      pools(
        first: $limit
        orderBy: totalValueLockedUSD
        orderDirection: desc
      ) {
        id
        token0 {
          symbol
          name
        }
        token1 {
          symbol
          name
        }
        totalValueLockedUSD
        volumeUSD
        feeTier
      }
    }
  \`;

  try {
    const data = await request(SUBGRAPHS.uniswapV3, query, { limit });

    console.log(\`Top \${limit} Uniswap V3 pools:\`);
    data.pools.forEach((pool: any, index: number) => {
      console.log(\`\${index + 1}. \${pool.token0.symbol}/\${pool.token1.symbol}\`);
      console.log(\`   TVL: $\${parseFloat(pool.totalValueLockedUSD).toLocaleString()}\`);
      console.log(\`   Volume: $\${parseFloat(pool.volumeUSD).toLocaleString()}\`);
    });

    return data.pools;
  } catch (error) {
    console.error('Error fetching top pools:', error);
    throw error;
  }
}

/**
 * Get swap events for a token pair
 */
async function getSwapEvents(
  poolAddress: string,
  limit: number = 100
) {
  const query = gql\`
    query GetSwaps($poolId: String!, $limit: Int!) {
      swaps(
        first: $limit
        orderBy: timestamp
        orderDirection: desc
        where: { pool: $poolId }
      ) {
        id
        timestamp
        amount0
        amount1
        amountUSD
        sender
        recipient
      }
    }
  \`;

  try {
    const data = await request(SUBGRAPHS.uniswapV3, query, {
      poolId: poolAddress.toLowerCase(),
      limit,
    });

    console.log(\`Recent \${limit} swaps for pool \${poolAddress}:\`);
    data.swaps.forEach((swap: any) => {
      const date = new Date(parseInt(swap.timestamp) * 1000);
      console.log(\`\${date.toLocaleString()}: $\${swap.amountUSD}\`);
    });

    return data.swaps;
  } catch (error) {
    console.error('Error fetching swap events:', error);
    throw error;
  }
}

/**
 * Get SushiSwap pair data
 */
async function getSushiSwapPair(token0: string, token1: string) {
  const query = gql\`
    query GetPair($token0: String!, $token1: String!) {
      pairs(
        where: {
          token0: $token0
          token1: $token1
        }
      ) {
        id
        token0Price
        token1Price
        reserve0
        reserve1
        reserveUSD
        volumeUSD
      }
    }
  \`;

  try {
    const data = await request(SUBGRAPHS.sushiswap, query, {
      token0: token0.toLowerCase(),
      token1: token1.toLowerCase(),
    });

    if (data.pairs.length === 0) {
      throw new Error('Pair not found');
    }

    const pair = data.pairs[0];
    console.log('SushiSwap Pair Data:');
    console.log(\`  Token0 Price: \${pair.token0Price}\`);
    console.log(\`  Token1 Price: \${pair.token1Price}\`);
    console.log(\`  Reserve USD: $\${parseFloat(pair.reserveUSD).toLocaleString()}\`);

    return pair;
  } catch (error) {
    console.error('Error fetching SushiSwap pair:', error);
    throw error;
  }
}

/**
 * Get Balancer pool data
 */
async function getBalancerPool(poolId: string) {
  const query = gql\`
    query GetPool($poolId: String!) {
      pool(id: $poolId) {
        id
        name
        totalShares
        totalLiquidity
        tokens {
          address
          symbol
          balance
          weight
        }
        swaps(first: 10, orderBy: timestamp, orderDirection: desc) {
          timestamp
          tokenIn
          tokenOut
          tokenAmountIn
          tokenAmountOut
        }
      }
    }
  \`;

  try {
    const data = await request(SUBGRAPHS.balancer, query, {
      poolId: poolId.toLowerCase(),
    });

    console.log('Balancer Pool:', data.pool.name);
    console.log(\`Total Liquidity: $\${parseFloat(data.pool.totalLiquidity).toLocaleString()}\`);
    
    data.pool.tokens.forEach((token: any) => {
      console.log(\`  \${token.symbol}: \${token.balance} (weight: \${token.weight})\`);
    });

    return data.pool;
  } catch (error) {
    console.error('Error fetching Balancer pool:', error);
    throw error;
  }
}

/**
 * Get historical price data
 */
async function getHistoricalPrices(
  tokenAddress: string,
  days: number = 7
) {
  const query = gql\`
    query GetHistoricalPrices($tokenId: String!) {
      tokenDayDatas(
        first: 365
        orderBy: date
        orderDirection: desc
        where: { token: $tokenId }
      ) {
        date
        priceUSD
        volume
        volumeUSD
        totalValueLockedUSD
      }
    }
  \`;

  try {
    const data = await request(SUBGRAPHS.uniswapV3, query, {
      tokenId: tokenAddress.toLowerCase(),
    });

    const recentData = data.tokenDayDatas.slice(0, days);

    console.log(\`Historical prices for last \${days} days:\`);
    recentData.forEach((day: any) => {
      const date = new Date(day.date * 1000);
      console.log(\`\${date.toLocaleDateString()}: $\${day.priceUSD}\`);
    });

    return recentData;
  } catch (error) {
    console.error('Error fetching historical prices:', error);
    throw error;
  }
}

// Example usage
async function main() {
  console.log('Querying The Graph subgraphs for Ethereum data...');

  // USDC address
  const USDC = '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48';

  const tokenData = await getUniswapV3TokenPrice(USDC);
  console.log('USDC data:', tokenData);

  const topPools = await getTopPools(5);
  console.log(\`Retrieved \${topPools.length} top pools\`);

  const historical = await getHistoricalPrices(USDC, 7);
  console.log(\`Retrieved \${historical.length} days of historical data\`);
}

export {
  getUniswapV3TokenPrice,
  getTopPools,
  getSwapEvents,
  getSushiSwapPair,
  getBalancerPool,
  getHistoricalPrices,
  SUBGRAPHS,
};
    `.trim(),
  },

  notes: [
    'Decentralized indexing protocol for blockchain data',
    'GraphQL provides flexible and efficient queries',
    'Subgraphs available for all major DEXs',
    'Historical data access without direct blockchain queries',
    'No API key required for public subgraphs',
    'Custom subgraph deployment available',
    'Query caching improves performance',
    'Community-maintained subgraphs for many protocols',
  ],

  limitations: [
    'Slight delay vs real-time on-chain data (typically 1-5 blocks)',
    'Hosted service may have rate limits',
    'Some subgraphs may be outdated or unmaintained',
    'Query complexity limits on hosted service',
  ],

  alternatives: [
    'Covalent API',
    'Moralis API',
    'Alchemy Enhanced APIs',
    'Direct RPC queries with ethers.js',
  ],
};

