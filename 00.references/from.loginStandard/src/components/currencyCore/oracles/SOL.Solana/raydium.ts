// Raydium - Leading Automated Market Maker (AMM) on Solana
// Real-time liquidity pools and SOL price discovery

export const raydiumOracle = {
  name: 'Raydium',
  blockchain: 'Solana (SOL)',
  type: 'Automated Market Maker (AMM) & DEX',
  
  description: `Raydium is the leading automated market maker (AMM) and decentralized exchange on Solana, providing lightning-fast swaps, concentrated liquidity pools, and efficient price discovery for SOL and SPL tokens. By integrating with OpenBook's central limit order book, Raydium offers deep liquidity and competitive pricing. With its API and SDK, Raydium enables real-time SOL price tracking based on actual on-chain liquidity pools and trading activity.`,

  features: [
    'Automated market maker (AMM)',
    'Concentrated liquidity pools',
    'OpenBook order book integration',
    'Lightning-fast swaps (<1s)',
    'Permissionless pool creation',
    'Yield farming',
    'Real-time price discovery',
    'Low fees (<0.5%)',
  ],

  api: {
    website: 'https://raydium.io/',
    app: 'https://raydium.io/swap/',
    documentation: 'https://docs.raydium.io/',
    apiEndpoint: 'https://api.raydium.io/v2',
    sdk: 'https://github.com/raydium-io/raydium-sdk',
    analytics: 'https://raydium.io/pools/',
  },

  sdk: {
    primaryPackage: '@raydium-io/raydium-sdk',
    solanaWeb3: '@solana/web3.js',
    installCommand: 'npm install @raydium-io/raydium-sdk @solana/web3.js @solana/spl-token',
    supportedLanguages: ['TypeScript', 'JavaScript'],
  },

  socialMedia: {
    website: 'https://raydium.io/',
    twitter: 'https://twitter.com/RaydiumProtocol',
    discord: 'https://discord.com/invite/raydium',
    telegram: 'https://t.me/raydiumprotocol',
    github: 'https://github.com/raydium-io',
    medium: 'https://raydiumprotocol.medium.com/',
  },

  tokenAddresses: {
    SOL: 'So11111111111111111111111111111111111111112', // Wrapped SOL
    USDC: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
    USDT: 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB',
    RAY: '4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R',
  },

  useCases: [
    'Real-time SOL price from AMM pools',
    'Liquidity pool analytics',
    'Slippage estimation',
    'Trade execution',
    'Pool APY tracking',
    'Volume analytics',
    'Price impact analysis',
  ],

  integration: {
    example: `
import axios from 'axios';
import { Connection, PublicKey } from '@solana/web3.js';

/**
 * Raydium AMM Integration for Solana (SOL)
 * Leading DEX for SOL price discovery and liquidity
 */

const RAYDIUM_API = 'https://api.raydium.io/v2';
const SOLANA_RPC = 'https://api.mainnet-beta.solana.com';

const TOKEN_ADDRESSES = {
  SOL: 'So11111111111111111111111111111111111111112',
  USDC: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
  USDT: 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB',
};

/**
 * Get SOL price from Raydium pools
 */
async function getRaydiumSOLPrice() {
  try {
    // Get all pools
    const response = await axios.get(\`\${RAYDIUM_API}/main/pairs\`);
    
    // Find SOL/USDC pools
    const solUsdcPools = response.data.filter((pool: any) => 
      (pool.name.includes('SOL') && pool.name.includes('USDC')) ||
      (pool.baseMint === TOKEN_ADDRESSES.SOL && pool.quoteMint === TOKEN_ADDRESSES.USDC)
    );

    if (solUsdcPools.length === 0) {
      throw new Error('No SOL/USDC pools found');
    }

    // Get the pool with highest liquidity
    const mainPool = solUsdcPools.reduce((prev: any, current: any) => 
      (current.liquidity > prev.liquidity) ? current : prev
    );

    const price = parseFloat(mainPool.price);

    console.log(\`Raydium SOL/USDC Price: $\${price.toFixed(4)}\`);
    console.log(\`Pool: \${mainPool.name}\`);
    console.log(\`Liquidity: $\${(mainPool.liquidity / 1e6).toFixed(2)}M\`);
    console.log(\`24h Volume: $\${(mainPool.volume24h / 1e6).toFixed(2)}M\`);

    return {
      price,
      poolName: mainPool.name,
      liquidity: mainPool.liquidity,
      volume24h: mainPool.volume24h,
      poolAddress: mainPool.ammId,
    };
  } catch (error) {
    console.error('Error fetching Raydium SOL price:', error);
    throw error;
  }
}

/**
 * Get all SOL trading pairs on Raydium
 */
async function getSOLTradingPairs() {
  try {
    const response = await axios.get(\`\${RAYDIUM_API}/main/pairs\`);
    
    const solPairs = response.data.filter((pool: any) => 
      pool.name.includes('SOL') || 
      pool.baseMint === TOKEN_ADDRESSES.SOL ||
      pool.quoteMint === TOKEN_ADDRESSES.SOL
    );

    console.log(\`\\nFound \${solPairs.length} SOL trading pairs on Raydium:\`);
    
    solPairs.slice(0, 10).forEach((pair: any, index: number) => {
      console.log(\`\${index + 1}. \${pair.name}\`);
      console.log(\`   Price: $\${parseFloat(pair.price).toFixed(6)}\`);
      console.log(\`   Liquidity: $\${(pair.liquidity / 1e6).toFixed(2)}M\`);
      console.log(\`   24h Volume: $\${(pair.volume24h / 1e6).toFixed(2)}M\`);
    });

    return solPairs.map((pair: any) => ({
      name: pair.name,
      price: parseFloat(pair.price),
      liquidity: pair.liquidity,
      volume24h: pair.volume24h,
      ammId: pair.ammId,
    }));
  } catch (error) {
    console.error('Error fetching SOL trading pairs:', error);
    throw error;
  }
}

/**
 * Get specific pool information
 */
async function getPoolInfo(poolId: string) {
  try {
    const response = await axios.get(\`\${RAYDIUM_API}/main/pairs\`);
    
    const pool = response.data.find((p: any) => p.ammId === poolId);

    if (!pool) {
      throw new Error(\`Pool \${poolId} not found\`);
    }

    console.log(\`\\nPool Info for \${poolId}:\`);
    console.log(\`  Name: \${pool.name}\`);
    console.log(\`  Price: $\${parseFloat(pool.price).toFixed(6)}\`);
    console.log(\`  Liquidity: $\${(pool.liquidity / 1e6).toFixed(2)}M\`);
    console.log(\`  Volume 24h: $\${(pool.volume24h / 1e6).toFixed(2)}M\`);
    console.log(\`  Volume 7d: $\${(pool.volume7d / 1e6).toFixed(2)}M\`);
    console.log(\`  APY: \${pool.apy ? pool.apy.toFixed(2) + '%' : 'N/A'}\`);

    return {
      name: pool.name,
      price: parseFloat(pool.price),
      liquidity: pool.liquidity,
      volume24h: pool.volume24h,
      volume7d: pool.volume7d,
      apy: pool.apy,
      ammId: pool.ammId,
    };
  } catch (error) {
    console.error('Error fetching pool info:', error);
    throw error;
  }
}

/**
 * Calculate liquidity-weighted SOL price
 */
async function getLiquidityWeightedSOLPrice() {
  try {
    const response = await axios.get(\`\${RAYDIUM_API}/main/pairs\`);
    
    const solUsdcPools = response.data.filter((pool: any) => 
      (pool.name.includes('SOL') && pool.name.includes('USDC')) ||
      (pool.baseMint === TOKEN_ADDRESSES.SOL && pool.quoteMint === TOKEN_ADDRESSES.USDC)
    );

    if (solUsdcPools.length === 0) {
      throw new Error('No SOL/USDC pools found');
    }

    // Calculate liquidity-weighted average price
    const totalLiquidity = solUsdcPools.reduce(
      (sum: number, pool: any) => sum + pool.liquidity, 
      0
    );

    const weightedPrice = solUsdcPools.reduce(
      (sum: number, pool: any) => {
        const weight = pool.liquidity / totalLiquidity;
        return sum + (parseFloat(pool.price) * weight);
      },
      0
    );

    console.log(\`\\nLiquidity-Weighted SOL Price: $\${weightedPrice.toFixed(4)}\`);
    console.log(\`Based on \${solUsdcPools.length} pools\`);
    console.log(\`Total Liquidity: $\${(totalLiquidity / 1e6).toFixed(2)}M\`);

    return {
      weightedPrice,
      poolCount: solUsdcPools.length,
      totalLiquidity,
    };
  } catch (error) {
    console.error('Error calculating liquidity-weighted price:', error);
    throw error;
  }
}

/**
 * Get top liquidity pools on Raydium
 */
async function getTopLiquidityPools(limit: number = 10) {
  try {
    const response = await axios.get(\`\${RAYDIUM_API}/main/pairs\`);
    
    const sortedPools = response.data
      .sort((a: any, b: any) => b.liquidity - a.liquidity)
      .slice(0, limit);

    console.log(\`\\nTop \${limit} Liquidity Pools on Raydium:\`);
    sortedPools.forEach((pool: any, index: number) => {
      console.log(\`\${index + 1}. \${pool.name}\`);
      console.log(\`   Liquidity: $\${(pool.liquidity / 1e6).toFixed(2)}M\`);
      console.log(\`   24h Volume: $\${(pool.volume24h / 1e6).toFixed(2)}M\`);
      console.log(\`   APY: \${pool.apy ? pool.apy.toFixed(2) + '%' : 'N/A'}\`);
    });

    return sortedPools;
  } catch (error) {
    console.error('Error fetching top liquidity pools:', error);
    throw error;
  }
}

/**
 * Monitor SOL price changes on Raydium
 */
async function monitorRaydiumSOLPrice(
  callback: (price: number, change: number) => void,
  intervalMs: number = 5000
) {
  console.log('Starting Raydium SOL price monitoring...\\n');

  let lastPrice: number | null = null;

  setInterval(async () => {
    try {
      const data = await getRaydiumSOLPrice();
      
      if (lastPrice !== null) {
        const change = ((data.price - lastPrice) / lastPrice) * 100;
        console.log(
          \`SOL: $\${data.price.toFixed(4)} (\${change >= 0 ? '+' : ''}\${change.toFixed(2)}%) | Liquidity: $\${(data.liquidity / 1e6).toFixed(2)}M\`
        );
        callback(data.price, change);
      } else {
        console.log(\`Initial SOL price: $\${data.price.toFixed(4)}\`);
      }
      
      lastPrice = data.price;
    } catch (error) {
      console.error('Monitoring error:', error);
    }
  }, intervalMs);
}

/**
 * Compare Raydium price with other sources
 */
async function compareWithOracle(oraclePrice: number, oracleName: string) {
  try {
    const raydiumData = await getRaydiumSOLPrice();
    
    const difference = Math.abs(raydiumData.price - oraclePrice);
    const differencePercent = (difference / oraclePrice) * 100;

    console.log(\`\\nPrice Comparison:\`);
    console.log(\`  Raydium (AMM): $\${raydiumData.price.toFixed(4)}\`);
    console.log(\`  \${oracleName}: $\${oraclePrice.toFixed(4)}\`);
    console.log(\`  Difference: $\${difference.toFixed(4)} (\${differencePercent.toFixed(3)}%)\`);
    console.log(\`  Liquidity: $\${(raydiumData.liquidity / 1e6).toFixed(2)}M\`);
    console.log(\`  Status: \${differencePercent < 0.5 ? '✅ Close' : '⚠️ Variance detected'}\`);

    return {
      raydiumPrice: raydiumData.price,
      oraclePrice,
      oracleName,
      difference,
      differencePercent,
      liquidity: raydiumData.liquidity,
    };
  } catch (error) {
    console.error('Error comparing prices:', error);
    throw error;
  }
}

// Example usage
async function main() {
  console.log('Querying Raydium AMM for SOL data...\\n');

  // Get SOL price
  const price = await getRaydiumSOLPrice();
  console.log(\`\\nSOL Price: $\${price.price.toFixed(4)}\`);

  // Get liquidity-weighted price
  await getLiquidityWeightedSOLPrice();

  // Get top pools
  await getTopLiquidityPools(5);

  // Get SOL trading pairs
  await getSOLTradingPairs();
}

export {
  getRaydiumSOLPrice,
  getSOLTradingPairs,
  getPoolInfo,
  getLiquidityWeightedSOLPrice,
  getTopLiquidityPools,
  monitorRaydiumSOLPrice,
  compareWithOracle,
  RAYDIUM_API,
  TOKEN_ADDRESSES,
};
    `.trim(),
  },

  notes: [
    'Leading AMM on Solana',
    'Integrated with OpenBook order book',
    'Deep liquidity pools',
    'Lightning-fast swaps (<1s)',
    'Concentrated liquidity support',
    'Free API access',
    'Real-time price discovery',
    'Ideal for DEX-based pricing',
  ],

  limitations: [
    'Price depends on pool liquidity',
    'Can have slippage on large trades',
    'Limited to Solana ecosystem',
    'API may be rate limited',
  ],

  alternatives: [
    'Jupiter (for aggregated pricing)',
    'Orca (for concentrated liquidity)',
    'Pyth Network (for oracle feeds)',
    'CoinGecko (for market data)',
  ],
};

