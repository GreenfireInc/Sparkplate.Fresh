// Pyth Network - High-Frequency Oracle for Litecoin
// Real-time, low-latency price feeds with sub-second updates

export const pythOracle = {
  name: 'Pyth Network',
  blockchain: 'Litecoin (LTC)',
  type: 'High-Frequency Oracle',
  
  description: `Pyth Network provides high-fidelity, low-latency price feeds for Litecoin with updates as fast as 400 milliseconds. With data from 70+ publishers including major exchanges and market makers, Pyth is ideal for applications requiring sub-second LTC price updates, derivatives trading, and real-time portfolio valuation.`,

  features: [
    'Extremely fast price updates (400ms)',
    '70+ data publishers (major exchanges)',
    'Confidence intervals included',
    'Pull-based model for efficiency',
    'Multi-chain support',
    'Sub-second latency',
    'High-frequency trading ready',
    'Real-time price streams',
  ],

  api: {
    website: 'https://pyth.network/',
    documentation: 'https://docs.pyth.network/',
    priceFeeds: 'https://pyth.network/price-feeds/',
    hermesEndpoint: 'https://hermes.pyth.network',
    jsSDK: 'https://docs.pyth.network/price-feeds/api-reference/javascript-sdk',
  },

  sdk: {
    primaryPackage: '@pythnetwork/pyth-sdk-js',
    installCommand: 'npm install @pythnetwork/pyth-sdk-js',
    supportedLanguages: ['TypeScript', 'JavaScript', 'Python', 'Rust'],
  },

  socialMedia: {
    website: 'https://pyth.network/',
    twitter: 'https://twitter.com/PythNetwork',
    discord: 'https://discord.gg/PythNetwork',
    telegram: 'https://t.me/Pyth_Network',
    github: 'https://github.com/pyth-network',
    medium: 'https://pythnetwork.medium.com/',
  },

  priceFeedIds: {
    LTC_USD: '0x6e3f3fa8253588df9326580180233eb791e03b443a3ba7a1d892e73874e19a54',
  },

  useCases: [
    'Real-time LTC price tracking',
    'Trading platform integrations',
    'Portfolio valuation',
    'Price alerts and notifications',
    'Market analysis tools',
    'Arbitrage monitoring',
    'Exchange rate comparisons',
  ],

  integration: {
    example: `
import axios from 'axios';

/**
 * Pyth Network Integration for Litecoin
 * High-frequency price feeds with confidence intervals
 */

const PYTH_HERMES_ENDPOINT = 'https://hermes.pyth.network';
const LTC_USD_FEED_ID = '0x6e3f3fa8253588df9326580180233eb791e03b443a3ba7a1d892e73874e19a54';

/**
 * Get latest LTC price from Pyth
 */
async function getPythLTCPrice() {
  try {
    const response = await axios.get(
      \`\${PYTH_HERMES_ENDPOINT}/v2/updates/price/latest\`,
      {
        params: {
          ids: [LTC_USD_FEED_ID],
        },
      }
    );

    const priceData = response.data.parsed[0].price;
    
    const price = parseFloat(priceData.price) * Math.pow(10, priceData.expo);
    const confidence = parseFloat(priceData.conf) * Math.pow(10, priceData.expo);
    const timestamp = new Date(priceData.publish_time * 1000);

    console.log(\`Pyth LTC/USD Price: $\${price.toFixed(2)}\`);
    console.log(\`Confidence: ±$\${confidence.toFixed(2)}\`);
    console.log(\`Updated: \${timestamp.toISOString()}\`);

    return {
      price,
      confidence,
      timestamp,
      feedId: LTC_USD_FEED_ID,
    };
  } catch (error) {
    console.error('Error fetching Pyth LTC price:', error);
    throw error;
  }
}

/**
 * Get price with confidence check
 */
async function getLTCPriceWithConfidenceCheck(maxConfidencePercent: number = 1) {
  try {
    const data = await getPythLTCPrice();
    
    const confidencePercent = (data.confidence / data.price) * 100;

    if (confidencePercent > maxConfidencePercent) {
      console.warn(
        \`Warning: Confidence interval (\${confidencePercent.toFixed(2)}%) exceeds threshold (\${maxConfidencePercent}%)\`
      );
    }

    return {
      ...data,
      confidencePercent,
      isConfident: confidencePercent <= maxConfidencePercent,
    };
  } catch (error) {
    console.error('Error checking LTC price confidence:', error);
    throw error;
  }
}

/**
 * Monitor LTC price changes
 */
async function monitorLTCPrice(
  callback: (price: number, timestamp: Date) => void,
  intervalMs: number = 5000
) {
  console.log('Starting LTC price monitoring...');

  setInterval(async () => {
    try {
      const data = await getPythLTCPrice();
      callback(data.price, data.timestamp);
    } catch (error) {
      console.error('Monitoring error:', error);
    }
  }, intervalMs);
}

/**
 * Get price statistics over time
 */
async function getLTCPriceStats(samples: number = 10, intervalMs: number = 1000) {
  const prices: number[] = [];

  console.log(\`Collecting \${samples} LTC price samples...\`);

  for (let i = 0; i < samples; i++) {
    try {
      const data = await getPythLTCPrice();
      prices.push(data.price);
      
      if (i < samples - 1) {
        await new Promise(resolve => setTimeout(resolve, intervalMs));
      }
    } catch (error) {
      console.error(\`Error collecting sample \${i + 1}:\`, error);
    }
  }

  const avgPrice = prices.reduce((a, b) => a + b, 0) / prices.length;
  const maxPrice = Math.max(...prices);
  const minPrice = Math.min(...prices);
  const volatility = ((maxPrice - minPrice) / avgPrice) * 100;

  console.log(\`\\nLTC Price Statistics (\${samples} samples):\`);
  console.log(\`  Average: $\${avgPrice.toFixed(2)}\`);
  console.log(\`  High: $\${maxPrice.toFixed(2)}\`);
  console.log(\`  Low: $\${minPrice.toFixed(2)}\`);
  console.log(\`  Volatility: \${volatility.toFixed(2)}%\`);

  return {
    samples,
    avgPrice,
    maxPrice,
    minPrice,
    volatility,
  };
}

/**
 * Compare with other price sources
 */
async function comparePrices(otherSourcePrice: number) {
  try {
    const pythData = await getPythLTCPrice();
    
    const difference = Math.abs(pythData.price - otherSourcePrice);
    const differencePercent = (difference / otherSourcePrice) * 100;

    console.log(\`\\nPrice Comparison:\`);
    console.log(\`  Pyth Price: $\${pythData.price.toFixed(2)}\`);
    console.log(\`  Other Source: $\${otherSourcePrice.toFixed(2)}\`);
    console.log(\`  Difference: $\${difference.toFixed(2)} (\${differencePercent.toFixed(2)}%)\`);

    return {
      pythPrice: pythData.price,
      otherSourcePrice,
      difference,
      differencePercent,
    };
  } catch (error) {
    console.error('Error comparing prices:', error);
    throw error;
  }
}

// Example usage
async function main() {
  console.log('Fetching LTC price from Pyth Network...\\n');

  const ltcData = await getPythLTCPrice();
  console.log(\`\\nLTC Price: $\${ltcData.price.toFixed(2)}\`);
  console.log(\`Confidence: ±$\${ltcData.confidence.toFixed(2)}\`);

  const withConfidence = await getLTCPriceWithConfidenceCheck();
  console.log(\`\\nConfidence check: \${withConfidence.isConfident ? '✅' : '⚠️'}\`);

  const stats = await getLTCPriceStats(5, 2000);
  console.log(\`\\nVolatility: \${stats.volatility.toFixed(2)}%\`);
}

export {
  getPythLTCPrice,
  getLTCPriceWithConfidenceCheck,
  monitorLTCPrice,
  getLTCPriceStats,
  comparePrices,
  LTC_USD_FEED_ID,
};
    `.trim(),
  },

  notes: [
    'Fastest oracle with 400ms update frequency',
    '70+ data publishers including major exchanges',
    'Confidence intervals provide price certainty',
    'No API key required',
    'Ideal for real-time LTC price tracking',
    'Pull-based model available',
    'Cross-chain support',
    'WebSocket streaming available',
  ],

  limitations: [
    'Requires internet connection',
    'Confidence intervals need monitoring',
    'Limited to price data (no blockchain data)',
    'Less historical data than traditional APIs',
  ],

  alternatives: [
    'CoinGecko (for historical data)',
    'DIA (for open-source feeds)',
    'RedStone (for modular feeds)',
    'Chainlink (via wrapped LTC)',
  ],
};

