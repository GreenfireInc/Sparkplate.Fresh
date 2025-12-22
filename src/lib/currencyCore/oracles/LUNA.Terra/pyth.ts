// Pyth Network - High-Frequency Oracle for Terra
// Real-time, low-latency price feeds with sub-second updates

export const pythOracle = {
  name: 'Pyth Network',
  blockchain: 'Terra (LUNA)',
  type: 'High-Frequency Oracle',
  
  description: `Pyth Network provides high-fidelity, low-latency price feeds for Terra (LUNA) with updates as fast as 400 milliseconds. With data from 70+ publishers including major exchanges and market makers, Pyth is ideal for applications requiring sub-second LUNA price updates, derivatives trading, and real-time portfolio valuation on Terra's Cosmos SDK-based blockchain.`,

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
    LUNA_USD: '0x09b7c7072c57f0e19c5dd1df8e81d96b4c08c58a7c9414e89f422aebcd8a2590',
  },

  useCases: [
    'Real-time LUNA price tracking',
    'DeFi protocol integrations on Terra',
    'Trading platform price feeds',
    'Portfolio valuation',
    'Price alerts and notifications',
    'Market analysis tools',
    'Arbitrage monitoring',
  ],

  integration: {
    example: `
import axios from 'axios';

/**
 * Pyth Network Integration for Terra (LUNA)
 * High-frequency price feeds with confidence intervals
 */

const PYTH_HERMES_ENDPOINT = 'https://hermes.pyth.network';
const LUNA_USD_FEED_ID = '0x09b7c7072c57f0e19c5dd1df8e81d96b4c08c58a7c9414e89f422aebcd8a2590';

/**
 * Get latest LUNA price from Pyth
 */
async function getPythLUNAPrice() {
  try {
    const response = await axios.get(
      \`\${PYTH_HERMES_ENDPOINT}/v2/updates/price/latest\`,
      {
        params: {
          ids: [LUNA_USD_FEED_ID],
        },
      }
    );

    const priceData = response.data.parsed[0].price;
    
    const price = parseFloat(priceData.price) * Math.pow(10, priceData.expo);
    const confidence = parseFloat(priceData.conf) * Math.pow(10, priceData.expo);
    const timestamp = new Date(priceData.publish_time * 1000);

    console.log(\`Pyth LUNA/USD Price: $\${price.toFixed(4)}\`);
    console.log(\`Confidence: ±$\${confidence.toFixed(4)}\`);
    console.log(\`Updated: \${timestamp.toISOString()}\`);

    return {
      price,
      confidence,
      timestamp,
      feedId: LUNA_USD_FEED_ID,
    };
  } catch (error) {
    console.error('Error fetching Pyth LUNA price:', error);
    throw error;
  }
}

/**
 * Get price with confidence check
 */
async function getLUNAPriceWithConfidenceCheck(maxConfidencePercent: number = 1) {
  try {
    const data = await getPythLUNAPrice();
    
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
    console.error('Error checking LUNA price confidence:', error);
    throw error;
  }
}

/**
 * Monitor LUNA price changes
 */
async function monitorLUNAPrice(
  callback: (price: number, timestamp: Date) => void,
  intervalMs: number = 5000
) {
  console.log('Starting LUNA price monitoring...');

  setInterval(async () => {
    try {
      const data = await getPythLUNAPrice();
      callback(data.price, data.timestamp);
    } catch (error) {
      console.error('Monitoring error:', error);
    }
  }, intervalMs);
}

/**
 * Get price statistics over time
 */
async function getLUNAPriceStats(samples: number = 10, intervalMs: number = 1000) {
  const prices: number[] = [];

  console.log(\`Collecting \${samples} LUNA price samples...\`);

  for (let i = 0; i < samples; i++) {
    try {
      const data = await getPythLUNAPrice();
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

  console.log(\`\\nLUNA Price Statistics (\${samples} samples):\`);
  console.log(\`  Average: $\${avgPrice.toFixed(4)}\`);
  console.log(\`  High: $\${maxPrice.toFixed(4)}\`);
  console.log(\`  Low: $\${minPrice.toFixed(4)}\`);
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
    const pythData = await getPythLUNAPrice();
    
    const difference = Math.abs(pythData.price - otherSourcePrice);
    const differencePercent = (difference / otherSourcePrice) * 100;

    console.log(\`\\nPrice Comparison:\`);
    console.log(\`  Pyth Price: $\${pythData.price.toFixed(4)}\`);
    console.log(\`  Other Source: $\${otherSourcePrice.toFixed(4)}\`);
    console.log(\`  Difference: $\${difference.toFixed(4)} (\${differencePercent.toFixed(2)}%)\`);

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
  console.log('Fetching LUNA price from Pyth Network...\\n');

  const lunaData = await getPythLUNAPrice();
  console.log(\`\\nLUNA Price: $\${lunaData.price.toFixed(4)}\`);
  console.log(\`Confidence: ±$\${lunaData.confidence.toFixed(4)}\`);

  const withConfidence = await getLUNAPriceWithConfidenceCheck();
  console.log(\`\\nConfidence check: \${withConfidence.isConfident ? '✅' : '⚠️'}\`);

  const stats = await getLUNAPriceStats(5, 2000);
  console.log(\`\\nVolatility: \${stats.volatility.toFixed(2)}%\`);
}

export {
  getPythLUNAPrice,
  getLUNAPriceWithConfidenceCheck,
  monitorLUNAPrice,
  getLUNAPriceStats,
  comparePrices,
  LUNA_USD_FEED_ID,
};
    `.trim(),
  },

  notes: [
    'Fastest oracle with 400ms update frequency',
    '70+ data publishers including major exchanges',
    'Confidence intervals provide price certainty',
    'No API key required',
    'Ideal for real-time LUNA price tracking',
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
    'Band Protocol (Terra native oracle)',
    'DIA (for open-source feeds)',
    'Terra Oracle Module (native on-chain)',
    'CoinGecko (for historical data)',
  ],
};

