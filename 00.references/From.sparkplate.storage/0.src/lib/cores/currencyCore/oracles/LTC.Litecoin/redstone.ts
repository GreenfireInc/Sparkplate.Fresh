// RedStone Oracle - Modular Oracle for Litecoin
// Pull-based oracle with gas-efficient data delivery

export const redstoneOracle = {
  name: 'RedStone',
  blockchain: 'Litecoin (LTC)',
  type: 'Modular Oracle',
  
  description: `RedStone is a modular oracle solution providing LTC price feeds through a pull-based data model. Optimized for efficiency and flexibility, RedStone offers customizable data delivery with TypeScript-first development support. Ideal for applications requiring cost-effective LTC price data with modular architecture.`,

  features: [
    'Modular architecture',
    'Pull-based data model',
    'Flexible data providers',
    'TypeScript-first SDK',
    'Cost-effective pricing',
    'Multi-chain support',
    'Customizable feeds',
    'No API key required',
  ],

  api: {
    website: 'https://redstone.finance/',
    documentation: 'https://docs.redstone.finance/',
    apiEndpoint: 'https://api.redstone.finance/prices',
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
    'LTC price tracking',
    'Multi-asset portfolios',
    'Trading applications',
    'Price alerts',
    'Market analysis',
    'Exchange rate monitoring',
    'Cost-effective price feeds',
  ],

  integration: {
    example: `
import axios from 'axios';

/**
 * RedStone Oracle Integration for Litecoin
 * Modular oracle with pull-based data model
 */

const REDSTONE_API = {
  baseUrl: 'https://api.redstone.finance',
  pricesEndpoint: '/prices',
};

/**
 * Get LTC price from RedStone
 */
async function getRedStoneLTCPrice(): Promise<number> {
  try {
    const response = await axios.get(
      \`\${REDSTONE_API.baseUrl}\${REDSTONE_API.pricesEndpoint}\`,
      {
        params: {
          symbol: 'LTC',
          provider: 'redstone',
          limit: 1,
        },
      }
    );

    const ltcData = response.data.find((item: any) => item.symbol === 'LTC');

    if (!ltcData) {
      throw new Error('LTC price data not found');
    }

    console.log(\`RedStone LTC Price: $\${ltcData.value}\`);
    console.log(\`Provider: \${ltcData.provider}\`);
    console.log(\`Timestamp: \${new Date(ltcData.timestamp)}\`);

    return ltcData.value;
  } catch (error) {
    console.error('Error fetching RedStone LTC price:', error);
    throw error;
  }
}

/**
 * Get LTC price with metadata
 */
async function getLTCPriceWithMetadata() {
  try {
    const response = await axios.get(
      \`\${REDSTONE_API.baseUrl}\${REDSTONE_API.pricesEndpoint}\`,
      {
        params: {
          symbol: 'LTC',
        },
      }
    );

    const ltcData = response.data.find((item: any) => item.symbol === 'LTC');

    if (!ltcData) {
      throw new Error('LTC price data not found');
    }

    return {
      symbol: ltcData.symbol,
      price: ltcData.value,
      provider: ltcData.provider,
      timestamp: new Date(ltcData.timestamp),
      source: ltcData.source || 'Multiple exchanges',
    };
  } catch (error) {
    console.error('Error fetching LTC metadata:', error);
    throw error;
  }
}

/**
 * Get multiple cryptocurrency prices
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
 * Monitor LTC price
 */
async function monitorLTCPrice(
  callback: (price: number, timestamp: Date) => void,
  intervalMs: number = 60000
) {
  console.log('Starting LTC price monitoring via RedStone...');

  setInterval(async () => {
    try {
      const data = await getLTCPriceWithMetadata();
      callback(data.price, data.timestamp);
    } catch (error) {
      console.error('Monitoring error:', error);
    }
  }, intervalMs);
}

/**
 * Compare RedStone with other oracle prices
 */
async function comparePrices(otherOraclePrices: Record<string, number>) {
  try {
    const redstonePrice = await getRedStoneLTCPrice();

    console.log(\`\\nLTC Price Comparison:\`);
    console.log(\`RedStone: $\${redstonePrice.toFixed(2)}\`);

    const comparisons = Object.entries(otherOraclePrices).map(([oracle, price]) => {
      const difference = Math.abs(redstonePrice - price);
      const differencePercent = (difference / price) * 100;

      console.log(\`\${oracle}: $\${price.toFixed(2)}\`);
      console.log(\`  Difference: $\${difference.toFixed(2)} (\${differencePercent.toFixed(2)}%)\`);

      return {
        oracle,
        price,
        difference,
        differencePercent,
      };
    });

    return {
      redstonePrice,
      comparisons,
    };
  } catch (error) {
    console.error('Error comparing prices:', error);
    throw error;
  }
}

/**
 * Get price with staleness check
 */
async function getLTCPriceWithStaleCheck(maxAgeSeconds: number = 300) {
  try {
    const data = await getLTCPriceWithMetadata();
    
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
    console.error('Error checking price staleness:', error);
    throw error;
  }
}

/**
 * Get all available tokens from RedStone
 */
async function getAllAvailableTokens() {
  try {
    const response = await axios.get(
      \`\${REDSTONE_API.baseUrl}\${REDSTONE_API.pricesEndpoint}\`
    );

    const tokens = response.data.map((p: any) => ({
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
 * Get LTC price trend
 */
async function getLTCPriceTrend(samples: number = 5, intervalMs: number = 60000) {
  const prices: Array<{ price: number; timestamp: Date }> = [];

  console.log(\`Collecting \${samples} LTC price samples...\`);

  for (let i = 0; i < samples; i++) {
    try {
      const data = await getLTCPriceWithMetadata();
      prices.push({ price: data.price, timestamp: data.timestamp });
      
      if (i < samples - 1) {
        await new Promise(resolve => setTimeout(resolve, intervalMs));
      }
    } catch (error) {
      console.error(\`Error collecting sample \${i + 1}:\`, error);
    }
  }

  const firstPrice = prices[0].price;
  const lastPrice = prices[prices.length - 1].price;
  const priceChange = ((lastPrice - firstPrice) / firstPrice) * 100;

  const trend = priceChange > 0 ? 'Upward' : priceChange < 0 ? 'Downward' : 'Stable';

  console.log(\`\\nLTC Price Trend:\`);
  console.log(\`  First Price: $\${firstPrice.toFixed(2)}\`);
  console.log(\`  Last Price: $\${lastPrice.toFixed(2)}\`);
  console.log(\`  Change: \${priceChange.toFixed(2)}% (\${trend})\`);

  return {
    samples,
    firstPrice,
    lastPrice,
    priceChange,
    trend,
    prices,
  };
}

// Example usage
async function main() {
  console.log('Fetching LTC price from RedStone...\\n');

  const ltcPrice = await getRedStoneLTCPrice();
  console.log(\`\\nLTC Price: $\${ltcPrice.toFixed(2)}\`);

  const multiplePrices = await getMultiplePrices(['LTC', 'BTC', 'ETH']);
  console.log('\\nMultiple prices:', multiplePrices);

  const ltcMetadata = await getLTCPriceWithMetadata();
  console.log('\\nLTC metadata:', ltcMetadata);

  const availableTokens = await getAllAvailableTokens();
  console.log(\`\\nAvailable tokens: \${availableTokens.length}\`);
}

export {
  getRedStoneLTCPrice,
  getLTCPriceWithMetadata,
  getMultiplePrices,
  monitorLTCPrice,
  comparePrices,
  getLTCPriceWithStaleCheck,
  getAllAvailableTokens,
  getLTCPriceTrend,
};
    `.trim(),
  },

  notes: [
    'Modular architecture for flexibility',
    'Pull-based model for efficiency',
    'No API key required',
    'TypeScript-first development',
    'Cost-effective pricing',
    'Multi-chain support',
    'Customizable feeds',
    'Simple REST API',
  ],

  limitations: [
    'Limited to price data',
    'No blockchain explorer features',
    'Update frequency varies',
    'Smaller validator network than Chainlink',
  ],

  alternatives: [
    'Pyth (for faster updates)',
    'DIA (for open-source transparency)',
    'CoinGecko (for comprehensive data)',
    'Chainlink (for established networks)',
  ],
};

