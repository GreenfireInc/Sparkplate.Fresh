// Uniswap - Leading DEX with Comprehensive SDK and Subgraph
// Real-time DEX pricing data and liquidity analytics

export const uniswapOracle = {
  name: 'Uniswap',
  blockchain: 'Ethereum (ETH)',
  type: 'DEX Oracle & SDK',
  
  description: `Uniswap is the largest and most popular decentralized exchange on Ethereum, providing comprehensive pricing data through its V2 and V3 SDKs and subgraphs. With over $4 billion in TVL and the highest trading volume, Uniswap offers concentrated liquidity (V3), extensive token pair coverage, and robust developer tools for price feeds and swap routing.`,

  features: [
    'Largest DEX on Ethereum ($4B+ TVL)',
    'Concentrated liquidity (V3)',
    'Comprehensive TypeScript SDK',
    'GraphQL subgraphs for historical data',
    'Smart order routing',
    'TWAP (Time-Weighted Average Price) oracles',
    'Thousands of trading pairs',
    'Cross-chain deployment',
  ],

  api: {
    website: 'https://uniswap.org/',
    documentation: 'https://docs.uniswap.org/',
    sdkDocs: 'https://docs.uniswap.org/sdk/v3/overview',
    subgraphDocs: 'https://docs.uniswap.org/api/subgraph/overview',
    v2Subgraph: 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2',
    v3Subgraph: 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3',
  },

  sdk: {
    coreSDK: '@uniswap/sdk-core',
    v2SDK: '@uniswap/v2-sdk',
    v3SDK: '@uniswap/v3-sdk',
    smartRouter: '@uniswap/smart-order-router',
    installCommand: 'npm install @uniswap/sdk-core @uniswap/v3-sdk ethers',
    supportedLanguages: ['TypeScript', 'JavaScript'],
  },

  socialMedia: {
    website: 'https://uniswap.org/',
    twitter: 'https://twitter.com/Uniswap',
    discord: 'https://discord.gg/uniswap',
    github: 'https://github.com/Uniswap',
    blog: 'https://blog.uniswap.org/',
    reddit: 'https://www.reddit.com/r/Uniswap/',
  },

  useCases: [
    'Real-time token price discovery',
    'DEX liquidity pool analytics',
    'Swap routing and execution',
    'TWAP oracle for on-chain contracts',
    'Trading volume tracking',
    'Impermanent loss calculation',
    'Arbitrage monitoring',
  ],

  integration: {
    example: `
import { Token, CurrencyAmount, TradeType } from '@uniswap/sdk-core';
import { Pool, Route, Trade } from '@uniswap/v3-sdk';
import { AlphaRouter } from '@uniswap/smart-order-router';
import { ethers } from 'ethers';
import { request, gql } from 'graphql-request';

/**
 * Uniswap Integration for Ethereum
 * Get pricing data using SDK and subgraphs
 */

// Uniswap V3 Subgraph
const UNISWAP_V3_SUBGRAPH = 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3';

// Common token addresses
const TOKENS = {
  WETH: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  USDC: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  USDT: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
  DAI: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
};

/**
 * Get token price using Uniswap V3 SDK
 */
async function getUniswapPrice(
  tokenInAddress: string,
  tokenOutAddress: string,
  provider: ethers.Provider
) {
  try {
    const router = new AlphaRouter({
      chainId: 1,
      provider,
    });

    const tokenIn = new Token(1, tokenInAddress, 18);
    const tokenOut = new Token(1, tokenOutAddress, 18);

    const route = await router.route(
      CurrencyAmount.fromRawAmount(tokenIn, ethers.parseEther('1').toString()),
      tokenOut,
      TradeType.EXACT_INPUT,
      {
        recipient: ethers.ZeroAddress,
        slippageTolerance: 50, // 0.5%
        deadline: Math.floor(Date.now() / 1000 + 1800),
      }
    );

    if (!route) {
      throw new Error('No route found');
    }

    const price = parseFloat(route.quote.toFixed());
    console.log(\`Uniswap Price: \${price}\`);

    return {
      price,
      route: route.route,
      gasEstimate: route.estimatedGasUsed.toString(),
    };
  } catch (error) {
    console.error('Error getting Uniswap price:', error);
    throw error;
  }
}

/**
 * Get token price from Uniswap V3 subgraph
 */
async function getTokenPriceFromSubgraph(tokenAddress: string) {
  const query = gql\`
    query GetTokenPrice($tokenId: String!) {
      token(id: $tokenId) {
        id
        name
        symbol
        derivedETH
        volumeUSD
        totalValueLockedUSD
        feesUSD
      }
    }
  \`;

  try {
    const data = await request(UNISWAP_V3_SUBGRAPH, query, {
      tokenId: tokenAddress.toLowerCase(),
    });

    const token = data.token;

    console.log(\`Token: \${token.symbol}\`);
    console.log(\`Price (ETH): \${token.derivedETH}\`);
    console.log(\`TVL: $\${parseFloat(token.totalValueLockedUSD).toLocaleString()}\`);
    console.log(\`24h Volume: $\${parseFloat(token.volumeUSD).toLocaleString()}\`);

    return {
      symbol: token.symbol,
      name: token.name,
      priceETH: parseFloat(token.derivedETH),
      volumeUSD: parseFloat(token.volumeUSD),
      tvlUSD: parseFloat(token.totalValueLockedUSD),
      feesUSD: parseFloat(token.feesUSD),
    };
  } catch (error) {
    console.error('Error fetching from subgraph:', error);
    throw error;
  }
}

/**
 * Get pool data for a specific pair
 */
async function getPoolData(poolAddress: string) {
  const query = gql\`
    query GetPool($poolId: String!) {
      pool(id: $poolId) {
        id
        token0 {
          symbol
          name
        }
        token1 {
          symbol
          name
        }
        feeTier
        liquidity
        sqrtPrice
        token0Price
        token1Price
        volumeUSD
        totalValueLockedUSD
      }
    }
  \`;

  try {
    const data = await request(UNISWAP_V3_SUBGRAPH, query, {
      poolId: poolAddress.toLowerCase(),
    });

    const pool = data.pool;

    console.log(\`Pool: \${pool.token0.symbol}/\${pool.token1.symbol}\`);
    console.log(\`Token0 Price: \${pool.token0Price}\`);
    console.log(\`Token1 Price: \${pool.token1Price}\`);
    console.log(\`Fee Tier: \${pool.feeTier / 10000}%\`);
    console.log(\`TVL: $\${parseFloat(pool.totalValueLockedUSD).toLocaleString()}\`);

    return {
      token0: pool.token0,
      token1: pool.token1,
      token0Price: parseFloat(pool.token0Price),
      token1Price: parseFloat(pool.token1Price),
      feeTier: pool.feeTier,
      liquidity: pool.liquidity,
      volumeUSD: parseFloat(pool.volumeUSD),
      tvlUSD: parseFloat(pool.totalValueLockedUSD),
    };
  } catch (error) {
    console.error('Error fetching pool data:', error);
    throw error;
  }
}

/**
 * Get top pools by TVL
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
        }
        token1 {
          symbol
        }
        feeTier
        totalValueLockedUSD
        volumeUSD
      }
    }
  \`;

  try {
    const data = await request(UNISWAP_V3_SUBGRAPH, query, { limit });

    console.log(\`Top \${limit} Uniswap V3 pools by TVL:\`);
    data.pools.forEach((pool: any, index: number) => {
      console.log(
        \`\${index + 1}. \${pool.token0.symbol}/\${pool.token1.symbol} (\${pool.feeTier / 10000}%)\`
      );
      console.log(\`   TVL: $\${parseFloat(pool.totalValueLockedUSD).toLocaleString()}\`);
    });

    return data.pools;
  } catch (error) {
    console.error('Error fetching top pools:', error);
    throw error;
  }
}

/**
 * Get recent swaps for a pool
 */
async function getRecentSwaps(poolAddress: string, limit: number = 10) {
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
        sqrtPriceX96
        sender
      }
    }
  \`;

  try {
    const data = await request(UNISWAP_V3_SUBGRAPH, query, {
      poolId: poolAddress.toLowerCase(),
      limit,
    });

    console.log(\`Recent \${limit} swaps:\`);
    data.swaps.forEach((swap: any) => {
      const date = new Date(parseInt(swap.timestamp) * 1000);
      console.log(\`\${date.toLocaleString()}: $\${swap.amountUSD}\`);
    });

    return data.swaps;
  } catch (error) {
    console.error('Error fetching swaps:', error);
    throw error;
  }
}

/**
 * Calculate TWAP (Time-Weighted Average Price)
 */
async function calculateTWAP(
  poolAddress: string,
  hours: number = 1
) {
  const query = gql\`
    query GetPoolHourData($poolId: String!) {
      poolHourDatas(
        first: 168
        orderBy: periodStartUnix
        orderDirection: desc
        where: { pool: $poolId }
      ) {
        periodStartUnix
        token0Price
        token1Price
      }
    }
  \`;

  try {
    const data = await request(UNISWAP_V3_SUBGRAPH, query, {
      poolId: poolAddress.toLowerCase(),
    });

    const recentData = data.poolHourDatas.slice(0, hours);
    
    const avgToken0Price =
      recentData.reduce((sum: number, hour: any) => sum + parseFloat(hour.token0Price), 0) /
      recentData.length;
    
    const avgToken1Price =
      recentData.reduce((sum: number, hour: any) => sum + parseFloat(hour.token1Price), 0) /
      recentData.length;

    console.log(\`TWAP (\${hours}h):\`);
    console.log(\`  Token0 Price: \${avgToken0Price}\`);
    console.log(\`  Token1 Price: \${avgToken1Price}\`);

    return {
      hours,
      token0TWAP: avgToken0Price,
      token1TWAP: avgToken1Price,
      dataPoints: recentData.length,
    };
  } catch (error) {
    console.error('Error calculating TWAP:', error);
    throw error;
  }
}

// Example usage
async function main() {
  const provider = new ethers.JsonRpcProvider(
    'https://eth-mainnet.alchemyapi.io/v2/YOUR_API_KEY'
  );

  console.log('Fetching Uniswap data...');

  const usdcData = await getTokenPriceFromSubgraph(TOKENS.USDC);
  console.log('USDC data:', usdcData);

  const topPools = await getTopPools(5);
  console.log(\`Retrieved \${topPools.length} top pools\`);
}

export {
  getUniswapPrice,
  getTokenPriceFromSubgraph,
  getPoolData,
  getTopPools,
  getRecentSwaps,
  calculateTWAP,
  TOKENS,
};
    `.trim(),
  },

  notes: [
    'Largest DEX on Ethereum with $4B+ TVL',
    'Most liquid trading pairs',
    'Comprehensive TypeScript SDK',
    'V3 concentrated liquidity reduces slippage',
    'TWAP oracles for on-chain smart contracts',
    'Extensive documentation and community support',
    'Smart order routing optimizes execution',
    'GraphQL subgraphs for efficient queries',
  ],

  limitations: [
    'SDK complexity for beginners',
    'Gas costs for on-chain swaps',
    'Subgraph data has slight delay',
    'Some pools may have low liquidity',
  ],

  alternatives: [
    'SushiSwap',
    'Curve Finance (for stablecoins)',
    '1inch (DEX aggregator)',
    'Balancer',
  ],
};

