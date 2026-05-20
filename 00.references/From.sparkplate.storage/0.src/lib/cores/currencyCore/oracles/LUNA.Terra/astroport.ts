// Astroport - Leading DEX on Terra with GraphQL API
// AMM-based decentralized exchange for LUNA price discovery

export const astroportOracle = {
  name: 'Astroport',
  blockchain: 'Terra (LUNA)',
  type: 'Decentralized Exchange (DEX) & Price Oracle',
  
  description: `Astroport is the largest and most liquid decentralized exchange on Terra, offering multiple pool types (XYK, Stableswap, PCL) for optimized trading. As a fork of Uniswap built for Cosmos, Astroport provides real-time LUNA price discovery through its liquidity pools. The platform offers both REST API and GraphQL endpoints for querying pool data, token prices, trading volumes, and liquidity statistics.`,

  features: [
    'Largest DEX on Terra',
    'Multiple AMM pool types',
    'Real-time price discovery',
    'Deep LUNA liquidity',
    'GraphQL API access',
    'REST API endpoints',
    'LP token support',
    'Cross-chain swaps (via IBC)',
  ],

  api: {
    website: 'https://astroport.fi/',
    documentation: 'https://docs.astroport.fi/',
    graphqlEndpoint: 'https://api.astroport.fi/graphql',
    restAPI: 'https://api.astroport.fi/api/v1',
    app: 'https://app.astroport.fi/',
    analytics: 'https://analytics.astroport.fi/',
  },

  sdk: {
    primaryPackage: '@astroport/astroport-js',
    graphqlClient: '@apollo/client',
    terrajsIntegration: '@terra-money/terra.js',
    installCommand: 'npm install @apollo/client graphql',
    supportedLanguages: ['TypeScript', 'JavaScript', 'GraphQL'],
  },

  socialMedia: {
    website: 'https://astroport.fi/',
    twitter: 'https://twitter.com/astroport_fi',
    discord: 'https://discord.com/invite/astroport',
    telegram: 'https://t.me/astroport_fi',
    github: 'https://github.com/astroport-fi',
    medium: 'https://medium.com/astroport',
  },

  poolTypes: {
    XYK: 'Constant Product (x*y=k) - General purpose',
    Stableswap: 'Low slippage for correlated assets',
    PCL: 'Passive Concentrated Liquidity - Optimal capital efficiency',
  },

  useCases: [
    'Real-time LUNA price discovery',
    'DEX price oracles',
    'Trading volume tracking',
    'Liquidity pool analytics',
    'Arbitrage monitoring',
    'Portfolio valuation',
    'Market depth analysis',
  ],

  integration: {
    example: `
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { LCDClient } from '@terra-money/terra.js';
import axios from 'axios';

/**
 * Astroport DEX Integration for Terra (LUNA)
 * Leading AMM protocol with GraphQL and smart contract access
 */

const ASTROPORT_GRAPHQL = 'https://api.astroport.fi/graphql';
const ASTROPORT_REST = 'https://api.astroport.fi/api/v1';
const TERRA_LCD = 'https://phoenix-lcd.terra.dev';

// Initialize Apollo Client for GraphQL
const apolloClient = new ApolloClient({
  uri: ASTROPORT_GRAPHQL,
  cache: new InMemoryCache(),
});

// Initialize Terra LCD client
const terra = new LCDClient({
  URL: TERRA_LCD,
  chainID: 'phoenix-1',
});

/**
 * Get LUNA price from Astroport pools via GraphQL
 */
async function getAstroportLUNAPrice() {
  try {
    const query = gql\`
      query GetLUNAPrice {
        pools(
          where: {
            assets: { contains: "uluna" }
          }
          orderBy: totalLiquidityUSD
          orderDirection: desc
          first: 5
        ) {
          id
          pairAddress
          assets
          totalLiquidityUSD
          volume24h
          token0 {
            symbol
            address
          }
          token1 {
            symbol
            address
          }
          token0Price
          token1Price
        }
      }
    \`;

    const { data } = await apolloClient.query({ query });
    const pools = data.pools;

    console.log(\`Found \${pools.length} LUNA pools on Astroport\`);
    
    // Find LUNA/USDC or LUNA/USDT pool for best price
    const mainPool = pools.find(
      (p: any) => 
        (p.token0.symbol === 'LUNA' && p.token1.symbol === 'USDC') ||
        (p.token1.symbol === 'LUNA' && p.token0.symbol === 'USDC')
    );

    if (!mainPool) {
      throw new Error('LUNA/USDC pool not found');
    }

    const lunaPrice = mainPool.token0.symbol === 'LUNA' 
      ? parseFloat(mainPool.token0Price)
      : parseFloat(mainPool.token1Price);

    console.log(\`\\nAstroport LUNA/USD Price: $\${lunaPrice.toFixed(4)}\`);
    console.log(\`Pool Liquidity: $\${parseFloat(mainPool.totalLiquidityUSD).toLocaleString()}\`);
    console.log(\`24h Volume: $\${parseFloat(mainPool.volume24h).toLocaleString()}\`);

    return {
      price: lunaPrice,
      pool: mainPool.pairAddress,
      liquidity: parseFloat(mainPool.totalLiquidityUSD),
      volume24h: parseFloat(mainPool.volume24h),
    };
  } catch (error) {
    console.error('Error fetching Astroport LUNA price:', error);
    throw error;
  }
}

/**
 * Get pool information via REST API
 */
async function getPoolInfo(poolAddress: string) {
  try {
    const response = await axios.get(
      \`\${ASTROPORT_REST}/pools/\${poolAddress}\`
    );

    const pool = response.data;

    console.log(\`\\nPool: \${pool.pairAddress}\`);
    console.log(\`Assets: \${pool.assets.join(' / ')}\`);
    console.log(\`Type: \${pool.poolType}\`);
    console.log(\`Liquidity: $\${parseFloat(pool.totalLiquidityUSD).toLocaleString()}\`);
    console.log(\`Volume 24h: $\${parseFloat(pool.volume24h).toLocaleString()}\`);
    console.log(\`APR: \${parseFloat(pool.apr).toFixed(2)}%\`);

    return {
      pairAddress: pool.pairAddress,
      assets: pool.assets,
      poolType: pool.poolType,
      totalLiquidityUSD: parseFloat(pool.totalLiquidityUSD),
      volume24h: parseFloat(pool.volume24h),
      apr: parseFloat(pool.apr),
    };
  } catch (error) {
    console.error('Error fetching pool info:', error);
    throw error;
  }
}

/**
 * Query pool directly via smart contract
 */
async function queryPoolContract(poolAddress: string) {
  try {
    const poolInfo = await terra.wasm.contractQuery(poolAddress, {
      pool: {},
    });

    console.log(\`\\nPool Contract: \${poolAddress}\`);
    console.log('Reserves:', poolInfo.assets);

    return {
      assets: poolInfo.assets,
      totalShare: poolInfo.total_share,
    };
  } catch (error) {
    console.error('Error querying pool contract:', error);
    throw error;
  }
}

/**
 * Get all LUNA trading pairs
 */
async function getLUNATradingPairs() {
  try {
    const query = gql\`
      query GetLUNAPairs {
        pools(
          where: {
            assets: { contains: "uluna" }
          }
          orderBy: volume24h
          orderDirection: desc
          first: 20
        ) {
          id
          pairAddress
          assets
          token0 { symbol }
          token1 { symbol }
          totalLiquidityUSD
          volume24h
          apr
        }
      }
    \`;

    const { data } = await apolloClient.query({ query });
    const pools = data.pools;

    console.log(\`\\nLUNA Trading Pairs on Astroport (\${pools.length}):\`);
    
    pools.forEach((pool: any, index: number) => {
      const pair = \`\${pool.token0.symbol}/\${pool.token1.symbol}\`;
      console.log(\`\${index + 1}. \${pair}\`);
      console.log(\`   Liquidity: $\${parseFloat(pool.totalLiquidityUSD).toLocaleString()}\`);
      console.log(\`   Volume 24h: $\${parseFloat(pool.volume24h).toLocaleString()}\`);
      console.log(\`   APR: \${parseFloat(pool.apr).toFixed(2)}%\`);
    });

    return pools.map((pool: any) => ({
      pair: \`\${pool.token0.symbol}/\${pool.token1.symbol}\`,
      pairAddress: pool.pairAddress,
      liquidity: parseFloat(pool.totalLiquidityUSD),
      volume24h: parseFloat(pool.volume24h),
      apr: parseFloat(pool.apr),
    }));
  } catch (error) {
    console.error('Error fetching LUNA trading pairs:', error);
    throw error;
  }
}

/**
 * Get Astroport platform statistics
 */
async function getAstroportStats() {
  try {
    const query = gql\`
      query GetPlatformStats {
        factory(id: "1") {
          totalLiquidityUSD
          totalVolumeUSD
          totalFeesUSD
          poolCount
        }
      }
    \`;

    const { data } = await apolloClient.query({ query });
    const factory = data.factory;

    console.log('\\n=== Astroport Platform Statistics ===');
    console.log(\`Total Liquidity: $\${parseFloat(factory.totalLiquidityUSD / 1e6).toFixed(2)}M\`);
    console.log(\`Total Volume: $\${parseFloat(factory.totalVolumeUSD / 1e9).toFixed(2)}B\`);
    console.log(\`Total Fees: $\${parseFloat(factory.totalFeesUSD / 1e6).toFixed(2)}M\`);
    console.log(\`Pool Count: \${factory.poolCount}\`);

    return {
      totalLiquidityUSD: parseFloat(factory.totalLiquidityUSD),
      totalVolumeUSD: parseFloat(factory.totalVolumeUSD),
      totalFeesUSD: parseFloat(factory.totalFeesUSD),
      poolCount: factory.poolCount,
    };
  } catch (error) {
    console.error('Error fetching Astroport stats:', error);
    throw error;
  }
}

/**
 * Monitor LUNA price on Astroport
 */
async function monitorAstroportLUNAPrice(
  callback: (price: number, liquidity: number) => void,
  intervalMs: number = 30000
) {
  console.log('Starting Astroport LUNA price monitoring...\\n');

  let lastPrice: number | null = null;

  setInterval(async () => {
    try {
      const data = await getAstroportLUNAPrice();
      
      if (lastPrice !== null) {
        const change = ((data.price - lastPrice) / lastPrice) * 100;
        console.log(
          \`Price: $\${data.price.toFixed(4)} (\${change >= 0 ? '+' : ''}\${change.toFixed(2)}%) | ` +
          \`Liquidity: $\${(data.liquidity / 1e6).toFixed(2)}M\`
        );
      } else {
        console.log(\`Initial price: $\${data.price.toFixed(4)}\`);
      }
      
      lastPrice = data.price;
      callback(data.price, data.liquidity);
    } catch (error) {
      console.error('Monitoring error:', error);
    }
  }, intervalMs);
}

/**
 * Get swap route for token trade
 */
async function getSwapRoute(
  tokenIn: string,
  tokenOut: string,
  amountIn: string
) {
  try {
    const response = await axios.get(\`\${ASTROPORT_REST}/swap/route\`, {
      params: {
        tokenIn,
        tokenOut,
        amountIn,
      },
    });

    const route = response.data;

    console.log(\`\\nSwap Route: \${tokenIn} → \${tokenOut}\`);
    console.log(\`Amount In: \${amountIn}\`);
    console.log(\`Expected Out: \${route.amountOut}\`);
    console.log(\`Price Impact: \${parseFloat(route.priceImpact).toFixed(4)}%\`);
    console.log(\`Route: \${route.pools.join(' → ')}\`);

    return {
      amountOut: route.amountOut,
      priceImpact: parseFloat(route.priceImpact),
      pools: route.pools,
    };
  } catch (error) {
    console.error('Error getting swap route:', error);
    throw error;
  }
}

/**
 * Calculate liquidity pool APR
 */
async function calculatePoolAPR(poolAddress: string) {
  try {
    const poolInfo = await getPoolInfo(poolAddress);
    
    const feeAPR = (poolInfo.volume24h * 365 * 0.003) / poolInfo.totalLiquidityUSD * 100;
    const totalAPR = poolInfo.apr;

    console.log(\`\\nPool APR Analysis:\`);
    console.log(\`  Fee APR: \${feeAPR.toFixed(2)}%\`);
    console.log(\`  Incentive APR: \${(totalAPR - feeAPR).toFixed(2)}%\`);
    console.log(\`  Total APR: \${totalAPR.toFixed(2)}%\`);

    return {
      feeAPR,
      incentiveAPR: totalAPR - feeAPR,
      totalAPR,
    };
  } catch (error) {
    console.error('Error calculating pool APR:', error);
    throw error;
  }
}

// Example usage
async function main() {
  console.log('Querying Astroport DEX for LUNA data...\\n');

  // Get LUNA price
  const price = await getAstroportLUNAPrice();
  console.log(\`\\nLUNA Price: $\${price.price.toFixed(4)}\`);

  // Get all LUNA pairs
  const pairs = await getLUNATradingPairs();
  console.log(\`\\nFound \${pairs.length} LUNA trading pairs\`);

  // Get platform stats
  await getAstroportStats();

  // Get specific pool info
  if (price.pool) {
    await getPoolInfo(price.pool);
  }
}

export {
  getAstroportLUNAPrice,
  getPoolInfo,
  queryPoolContract,
  getLUNATradingPairs,
  getAstroportStats,
  monitorAstroportLUNAPrice,
  getSwapRoute,
  calculatePoolAPR,
  apolloClient,
  ASTROPORT_GRAPHQL,
};
    `.trim(),
  },

  notes: [
    'Largest DEX on Terra with deepest liquidity',
    'Multiple AMM types (XYK, Stableswap, PCL)',
    'GraphQL API for advanced queries',
    'Real-time price discovery',
    'Smart contract integration via Terra.js',
    'Cross-chain support via IBC',
    'LP token and yield farming support',
    'No API key required',
  ],

  limitations: [
    'Price depends on pool liquidity',
    'Can have slippage on large trades',
    'GraphQL schema may change',
    'Limited to Terra ecosystem',
  ],

  alternatives: [
    'White Whale (multi-chain liquidity)',
    'Phoenix Protocol (alternative Terra DEX)',
    'TerraSwap (legacy Terra DEX)',
    'Band Protocol (oracle aggregation)',
  ],
};

