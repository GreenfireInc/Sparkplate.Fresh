// DEX Screener API - Ethereum Classic DEX Data
// Real-time DEX trading data and price charts for ETC DEXs

export const dexscreenerOracle = {
  name: 'DEX Screener',
  blockchain: 'Ethereum Classic (ETC)',
  type: 'DEX Aggregator & Analytics',
  
  description: `DEX Screener provides real-time price charts, trading history, and analytics for decentralized exchanges on Ethereum Classic. It tracks trading pairs from HebeSwap, ETCswap, and other ETC DEXs, offering comprehensive DEX market data including liquidity, volume, and price movements.`,

  features: [
    'Real-time DEX price charts for ETC pairs',
    'Trading history and volume analytics',
    'Liquidity tracking across ETC DEXs',
    'Token pair information',
    'Price change alerts',
    'Multi-DEX aggregation (HebeSwap, ETCswap)',
    'Token search and discovery',
    'Free API access',
  ],

  api: {
    baseUrl: 'https://api.dexscreener.com/latest/dex',
    explorerUrl: 'https://dexscreener.com/ethereumclassic',
    documentation: 'https://docs.dexscreener.com/api/reference',
    chainId: 'ethereumclassic',
    rateLimit: 'Fair usage policy (no strict limits)',
  },

  sdk: {
    primaryPackage: 'axios (REST API)',
    alternativePackage: 'dexscreener-sdk (community package)',
    installCommand: 'npm install axios',
    supportedLanguages: ['TypeScript', 'JavaScript'],
  },

  socialMedia: {
    website: 'https://dexscreener.com/',
    twitter: 'https://twitter.com/dexscreener',
    telegram: 'https://t.me/dexscreener',
    discord: 'https://discord.gg/dexscreener',
  },

  useCases: [
    'DEX price tracking for ETC tokens',
    'Liquidity monitoring for trading pairs',
    'Volume analytics for DEX pairs',
    'Token discovery on ETC DEXs',
    'Price alerts and notifications',
    'DEX trading analytics',
    'Market research for ETC DeFi',
  ],

  integration: {
    example: `
import axios from 'axios';

/**
 * DEX Screener API Integration for Ethereum Classic
 */

const DEXSCREENER_API = {
  baseUrl: 'https://api.dexscreener.com/latest/dex',
  chainId: 'ethereumclassic',
};

/**
 * Get all ETC DEX pairs
 */
async function getETCPairs(limit: number = 10) {
  try {
    const response = await axios.get(
      \`\${DEXSCREENER_API.baseUrl}/pairs/\${DEXSCREENER_API.chainId}\`
    );
    
    const pairs = response.data.pairs?.slice(0, limit) || [];
    
    console.log(\`Found \${pairs.length} ETC DEX pairs\`);
    
    pairs.forEach((pair: any) => {
      console.log(\`\${pair.baseToken.symbol}/\${pair.quoteToken.symbol}\`);
      console.log(\`  Price: $\${pair.priceUsd}\`);
      console.log(\`  Volume 24h: $\${pair.volume.h24?.toLocaleString()}\`);
      console.log(\`  Liquidity: $\${pair.liquidity?.usd?.toLocaleString()}\`);
      console.log(\`  DEX: \${pair.dexId}\`);
      console.log('');
    });
    
    return pairs;
  } catch (error) {
    console.error('Error fetching ETC pairs:', error);
    throw error;
  }
}

/**
 * Search for specific token pairs on ETC
 */
async function searchToken(query: string) {
  try {
    const response = await axios.get(
      \`\${DEXSCREENER_API.baseUrl}/search\`,
      {
        params: { q: query },
      }
    );
    
    // Filter for Ethereum Classic pairs
    const etcPairs = response.data.pairs?.filter(
      (pair: any) => pair.chainId === DEXSCREENER_API.chainId
    ) || [];
    
    console.log(\`Found \${etcPairs.length} ETC pairs matching "\${query}"\`);
    return etcPairs;
  } catch (error) {
    console.error('Error searching token:', error);
    throw error;
  }
}

/**
 * Get specific pair by address
 */
async function getPairByAddress(pairAddress: string) {
  try {
    const response = await axios.get(
      \`\${DEXSCREENER_API.baseUrl}/pairs/\${DEXSCREENER_API.chainId}/\${pairAddress}\`
    );
    
    const pair = response.data.pair;
    
    if (pair) {
      console.log('Pair Information:');
      console.log(\`  Pair: \${pair.baseToken.symbol}/\${pair.quoteToken.symbol}\`);
      console.log(\`  Address: \${pair.pairAddress}\`);
      console.log(\`  DEX: \${pair.dexId}\`);
      console.log(\`  Price USD: $\${pair.priceUsd}\`);
      console.log(\`  Price Native: \${pair.priceNative} ETC\`);
      console.log(\`  Liquidity: $\${pair.liquidity?.usd?.toLocaleString()}\`);
      console.log(\`  Volume 24h: $\${pair.volume?.h24?.toLocaleString()}\`);
      console.log(\`  Price Change 24h: \${pair.priceChange?.h24}%\`);
      console.log(\`  Transactions 24h: \${pair.txns?.h24?.buys + pair.txns?.h24?.sells}\`);
    }
    
    return pair;
  } catch (error) {
    console.error('Error fetching pair:', error);
    throw error;
  }
}

/**
 * Get token information with price
 */
async function getTokenPrice(tokenAddress: string) {
  try {
    const response = await axios.get(
      \`\${DEXSCREENER_API.baseUrl}/tokens/\${tokenAddress}\`
    );
    
    const etcPairs = response.data.pairs?.filter(
      (pair: any) => pair.chainId === DEXSCREENER_API.chainId
    ) || [];
    
    if (etcPairs.length === 0) {
      throw new Error('No ETC pairs found for this token');
    }
    
    return {
      token: tokenAddress,
      pairs: etcPairs.map((pair: any) => ({
        pairAddress: pair.pairAddress,
        baseToken: pair.baseToken,
        quoteToken: pair.quoteToken,
        priceUsd: pair.priceUsd,
        priceNative: pair.priceNative,
        volume24h: pair.volume?.h24,
        liquidity: pair.liquidity?.usd,
        dex: pair.dexId,
        priceChange24h: pair.priceChange?.h24,
      })),
    };
  } catch (error) {
    console.error('Error fetching token price:', error);
    throw error;
  }
}

/**
 * Monitor price changes for a specific pair
 */
async function monitorPairPrice(
  pairAddress: string,
  callback: (price: number, change24h: number) => void,
  intervalMs: number = 60000
) {
  setInterval(async () => {
    try {
      const pair = await getPairByAddress(pairAddress);
      if (pair) {
        callback(parseFloat(pair.priceUsd), pair.priceChange?.h24 || 0);
      }
    } catch (error) {
      console.error('Error monitoring pair price:', error);
    }
  }, intervalMs);
}

/**
 * Get top ETC DEX pairs by volume
 */
async function getTopPairsByVolume(limit: number = 10) {
  try {
    const pairs = await getETCPairs(50); // Fetch more to sort
    
    const sortedByVolume = pairs
      .filter((pair: any) => pair.volume?.h24)
      .sort((a: any, b: any) => b.volume.h24 - a.volume.h24)
      .slice(0, limit);
    
    console.log(\`Top \${limit} ETC pairs by volume:\`);
    sortedByVolume.forEach((pair: any, index: number) => {
      console.log(\`\${index + 1}. \${pair.baseToken.symbol}/\${pair.quoteToken.symbol}\`);
      console.log(\`   Volume: $\${pair.volume.h24.toLocaleString()}\`);
    });
    
    return sortedByVolume;
  } catch (error) {
    console.error('Error fetching top pairs:', error);
    throw error;
  }
}

// Example usage
async function main() {
  console.log('Fetching ETC DEX data from DEX Screener...');
  
  const pairs = await getETCPairs(5);
  console.log(\`Retrieved \${pairs.length} pairs\`);
  
  const topPairs = await getTopPairsByVolume(5);
  console.log(\`Top pairs by volume: \${topPairs.length}\`);
  
  // Search for WETC pairs
  const wetcPairs = await searchToken('WETC');
  console.log(\`WETC pairs found: \${wetcPairs.length}\`);
}

export {
  getETCPairs,
  searchToken,
  getPairByAddress,
  getTokenPrice,
  monitorPairPrice,
  getTopPairsByVolume,
};
    `.trim(),
  },

  notes: [
    'Aggregates data from multiple ETC DEXs (HebeSwap, ETCswap)',
    'Real-time price and liquidity tracking',
    'No API key required',
    'Fair usage policy with no strict rate limits',
    'Excellent for DEX trading analytics',
    'Provides comprehensive DEX pair information',
    'Regular updates and accurate data',
    'Community-supported API',
  ],

  limitations: [
    'Only tracks DEX data (no CEX data)',
    'Limited to tokens with DEX liquidity on ETC',
    'No historical data beyond 24 hours',
    'Smaller DEXs may have delayed updates',
  ],

  alternatives: [
    'DeFiLlama (for TVL data)',
    'CoinGecko (for CEX + DEX)',
  ],
};

