// RedStone Oracle - Modular and Lightweight Oracle for Ethereum
// Pull-based oracle optimized for L2s and gas efficiency

export const redstoneOracle = {
  name: 'RedStone',
  blockchain: 'Ethereum (ETH)',
  type: 'Modular Oracle',
  
  description: `RedStone is a modular, lightweight oracle solution optimized for Layer 2 networks and gas efficiency. Using a pull-based data model, RedStone minimizes on-chain overhead while providing flexible data providers and TypeScript-first development. It's designed for L2 optimization and modern DeFi applications requiring cost-effective oracle solutions.`,

  features: [
    'Modular architecture',
    'Pull-based data model for gas efficiency',
    'Optimized for Layer 2 networks',
    'Flexible data providers',
    'TypeScript-first SDK',
    'Light client approach',
    'Multi-chain support',
    'Customizable data feeds',
  ],

  api: {
    website: 'https://redstone.finance/',
    documentation: 'https://docs.redstone.finance/',
    apiEndpoint: 'https://api.redstone.finance/prices',
    priceFeeds: 'https://app.redstone.finance/#/app/prices',
    comparison: 'https://blog.redstone.finance/2025/01/16/blockchain-oracles-comparison-chainlink-vs-pyth-vs-redstone-2025/',
  },

  sdk: {
    primaryPackage: 'redstone-sdk',
    alternativePackage: '@redstone-finance/sdk',
    installCommand: 'npm install redstone-sdk',
    supportedLanguages: ['TypeScript', 'JavaScript', 'Solidity'],
  },

  socialMedia: {
    website: 'https://redstone.finance/',
    twitter: 'https://twitter.com/redstone_defi',
    discord: 'https://discord.gg/redstone',
    telegram: 'https://t.me/redstonefinance',
    github: 'https://github.com/redstone-finance',
    medium: 'https://medium.com/redstone-finance',
  },

  useCases: [
    'Layer 2 DeFi applications',
    'Gas-optimized price feeds',
    'Multi-chain protocols',
    'Custom data requirements',
    'NFT floor price tracking',
    'Real-world asset pricing',
    'Yield farming protocols',
  ],

  integration: {
    example: `
import axios from 'axios';

/**
 * RedStone Oracle Integration for Ethereum
 * Modular oracle with pull-based data model
 */

const REDSTONE_API = {
  baseUrl: 'https://api.redstone.finance',
  pricesEndpoint: '/prices',
};

/**
 * Get price from RedStone API
 */
async function getRedStonePrice(symbol: string): Promise<number> {
  try {
    const response = await axios.get(
      \`\${REDSTONE_API.baseUrl}\${REDSTONE_API.pricesEndpoint}\`
    );

    const prices = response.data;
    const tokenData = prices.find((p: any) => p.symbol === symbol);

    if (!tokenData) {
      throw new Error(\`Price data not found for \${symbol}\`);
    }

    console.log(\`RedStone \${symbol} Price: $\${tokenData.value}\`);
    console.log(\`Provider: \${tokenData.provider}\`);
    console.log(\`Timestamp: \${new Date(tokenData.timestamp)}\`);

    return tokenData.value;
  } catch (error) {
    console.error('Error fetching RedStone price:', error);
    throw error;
  }
}

/**
 * Get multiple prices at once
 */
async function getMultiplePrices(symbols: string[]) {
  try {
    const response = await axios.get(
      \`\${REDSTONE_API.baseUrl}\${REDSTONE_API.pricesEndpoint}\`
    );

    const prices = response.data;
    const result: Record<string, number> = {};

    symbols.forEach((symbol) => {
      const tokenData = prices.find((p: any) => p.symbol === symbol);
      if (tokenData) {
        result[symbol] = tokenData.value;
      }
    });

    console.log('Multiple prices from RedStone:', result);
    return result;
  } catch (error) {
    console.error('Error fetching multiple prices:', error);
    throw error;
  }
}

/**
 * Get price with metadata
 */
async function getPriceWithMetadata(symbol: string) {
  try {
    const response = await axios.get(
      \`\${REDSTONE_API.baseUrl}\${REDSTONE_API.pricesEndpoint}\`
    );

    const prices = response.data;
    const tokenData = prices.find((p: any) => p.symbol === symbol);

    if (!tokenData) {
      throw new Error(\`Price data not found for \${symbol}\`);
    }

    return {
      symbol: tokenData.symbol,
      price: tokenData.value,
      provider: tokenData.provider,
      timestamp: new Date(tokenData.timestamp),
      source: tokenData.source,
      permawebTx: tokenData.permawebTx,
      version: tokenData.version,
    };
  } catch (error) {
    console.error('Error fetching price metadata:', error);
    throw error;
  }
}

/**
 * Monitor price changes
 */
async function monitorPrice(
  symbol: string,
  callback: (price: number, timestamp: Date) => void,
  intervalMs: number = 60000
) {
  setInterval(async () => {
    try {
      const data = await getPriceWithMetadata(symbol);
      callback(data.price, data.timestamp);
    } catch (error) {
      console.error('Monitoring error:', error);
    }
  }, intervalMs);
}

/**
 * Compare RedStone with other oracle prices
 */
async function comparePrices(
  symbol: string,
  otherOraclePrices: Record<string, number>
) {
  try {
    const redstonePrice = await getRedStonePrice(symbol);

    console.log(\`\\nPrice comparison for \${symbol}:\`);
    console.log(\`RedStone: $\${redstonePrice.toFixed(2)}\`);

    Object.entries(otherOraclePrices).forEach(([oracle, price]) => {
      const difference = Math.abs(redstonePrice - price);
      const differencePercent = (difference / price) * 100;

      console.log(\`\${oracle}: $\${price.toFixed(2)}\`);
      console.log(\`  Difference: $\${difference.toFixed(2)} (\${differencePercent.toFixed(2)}%)\`);
    });

    return {
      redstonePrice,
      comparisons: Object.entries(otherOraclePrices).map(([oracle, price]) => ({
        oracle,
        price,
        difference: Math.abs(redstonePrice - price),
        differencePercent: (Math.abs(redstonePrice - price) / price) * 100,
      })),
    };
  } catch (error) {
    console.error('Error comparing prices:', error);
    throw error;
  }
}

/**
 * Get historical prices (if available)
 */
async function getHistoricalPrices(
  symbol: string,
  fromTimestamp: number,
  toTimestamp: number
) {
  try {
    // Note: This is a placeholder - check RedStone docs for actual historical API
    const response = await axios.get(
      \`\${REDSTONE_API.baseUrl}/historical\`,
      {
        params: {
          symbol,
          from: fromTimestamp,
          to: toTimestamp,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error fetching historical prices:', error);
    throw error;
  }
}

/**
 * Get all available tokens
 */
async function getAllAvailableTokens() {
  try {
    const response = await axios.get(
      \`\${REDSTONE_API.baseUrl}\${REDSTONE_API.pricesEndpoint}\`
    );

    const prices = response.data;
    const tokens = prices.map((p: any) => ({
      symbol: p.symbol,
      provider: p.provider,
    }));

    console.log(\`RedStone supports \${tokens.length} tokens\`);
    return tokens;
  } catch (error) {
    console.error('Error fetching available tokens:', error);
    throw error;
  }
}

/**
 * Get price with confidence check
 */
async function getPriceWithConfidence(
  symbol: string,
  maxAgeSeconds: number = 300
) {
  try {
    const data = await getPriceWithMetadata(symbol);
    
    const ageSeconds = (Date.now() - data.timestamp.getTime()) / 1000;
    const isRecent = ageSeconds <= maxAgeSeconds;

    if (!isRecent) {
      console.warn(
        \`Warning: Price data is \${ageSeconds.toFixed(0)}s old (threshold: \${maxAgeSeconds}s)\`
      );
    }

    return {
      ...data,
      ageSeconds,
      isRecent,
    };
  } catch (error) {
    console.error('Error checking price confidence:', error);
    throw error;
  }
}

// Example usage
async function main() {
  console.log('Fetching ETH price from RedStone...');

  const ethPrice = await getRedStonePrice('ETH');
  console.log(\`ETH Price: $\${ethPrice.toFixed(2)}\`);

  const multiplePrices = await getMultiplePrices(['ETH', 'BTC', 'USDC']);
  console.log('Multiple prices:', multiplePrices);

  const ethMetadata = await getPriceWithMetadata('ETH');
  console.log('ETH metadata:', ethMetadata);

  const availableTokens = await getAllAvailableTokens();
  console.log(\`Available tokens: \${availableTokens.length}\`);
}

export {
  getRedStonePrice,
  getMultiplePrices,
  getPriceWithMetadata,
  monitorPrice,
  comparePrices,
  getHistoricalPrices,
  getAllAvailableTokens,
  getPriceWithConfidence,
};
    `.trim(),
  },

  notes: [
    'Modular architecture for flexibility',
    'Pull-based model reduces gas costs',
    'Optimized for Layer 2 networks',
    'TypeScript-first development',
    'No API key required for basic usage',
    'Lightweight and efficient',
    'Customizable data providers',
    'Cross-chain compatibility',
  ],

  limitations: [
    'Smaller validator network than Chainlink',
    'Less historical data available',
    'Pull-based model requires client integration',
    'Newer protocol with less battle-testing',
  ],

  alternatives: [
    'Chainlink (for established networks)',
    'Pyth (for high-frequency data)',
    'Band Protocol',
  ],
};

