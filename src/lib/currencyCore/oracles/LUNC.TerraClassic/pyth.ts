// Pyth Network - High-Frequency Oracle for Terra Classic
// Real-time, low-latency price feeds with sub-second updates

export const pythOracle = {
  name: 'Pyth Network',
  blockchain: 'Terra Classic (LUNC)',
  type: 'High-Frequency Oracle',
  
  description: `Pyth Network provides high-fidelity, low-latency price feeds for Terra Classic (LUNC) with updates as fast as 400 milliseconds. With data from 70+ publishers including major exchanges and market makers, Pyth is ideal for applications requiring sub-second LUNC price updates, despite the reduced trading activity post-collapse. Useful for tracking LUNC's volatile price movements in the community revival effort.`,

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
    LUNC_USD: '0x34e3c1b0236d0e4c848fd4577ad6f6e49f8e77d0', // Note: May vary, check Pyth docs
  },

  useCases: [
    'Real-time LUNC price tracking',
    'Volatility monitoring post-collapse',
    'Trading platform price feeds',
    'Portfolio valuation',
    'Price alerts and notifications',
    'Market analysis tools',
    'Community revival metrics',
  ],

  integration: {
    example: `
import axios from 'axios';

/**
 * Pyth Network Integration for Terra Classic (LUNC)
 * High-frequency price feeds with confidence intervals
 */

const PYTH_HERMES_ENDPOINT = 'https://hermes.pyth.network';
// Note: Verify LUNC feed ID from Pyth Network documentation
const LUNC_USD_FEED_ID = '0x34e3c1b0236d0e4c848fd4577ad6f6e49f8e77d0';

/**
 * Get latest LUNC price from Pyth
 */
async function getPythLUNCPrice() {
  try {
    const response = await axios.get(
      \`\${PYTH_HERMES_ENDPOINT}/v2/updates/price/latest\`,
      {
        params: {
          ids: [LUNC_USD_FEED_ID],
        },
      }
    );

    const priceData = response.data.parsed[0].price;
    
    const price = parseFloat(priceData.price) * Math.pow(10, priceData.expo);
    const confidence = parseFloat(priceData.conf) * Math.pow(10, priceData.expo);
    const timestamp = new Date(priceData.publish_time * 1000);

    console.log(\`Pyth LUNC/USD Price: $\${price.toFixed(8)}\`);
    console.log(\`Confidence: ±$\${confidence.toFixed(8)}\`);
    console.log(\`Updated: \${timestamp.toISOString()}\`);

    return {
      price,
      confidence,
      timestamp,
      feedId: LUNC_USD_FEED_ID,
    };
  } catch (error) {
    console.error('Error fetching Pyth LUNC price:', error);
    throw error;
  }
}

/**
 * Get price with confidence check
 */
async function getLUNCPriceWithConfidenceCheck(maxConfidencePercent: number = 1) {
  try {
    const data = await getPythLUNCPrice();
    
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
    console.error('Error checking LUNC price confidence:', error);
    throw error;
  }
}

/**
 * Monitor LUNC price changes
 */
async function monitorLUNCPrice(
  callback: (price: number, timestamp: Date) => void,
  intervalMs: number = 5000
) {
  console.log('Starting LUNC price monitoring...\\n');

  setInterval(async () => {
    try {
      const data = await getPythLUNCPrice();
      callback(data.price, data.timestamp);
    } catch (error) {
      console.error('Monitoring error:', error);
    }
  }, intervalMs);
}

/**
 * Get price statistics over time
 */
async function getLUNCPriceStats(samples: number = 10, intervalMs: number = 1000) {
  const prices: number[] = [];

  console.log(\`Collecting \${samples} LUNC price samples...\`);

  for (let i = 0; i < samples; i++) {
    try {
      const data = await getPythLUNCPrice();
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

  console.log(\`\\nLUNC Price Statistics (\${samples} samples):\`);
  console.log(\`  Average: $\${avgPrice.toFixed(8)}\`);
  console.log(\`  High: $\${maxPrice.toFixed(8)}\`);
  console.log(\`  Low: $\${minPrice.toFixed(8)}\`);
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
    const pythData = await getPythLUNCPrice();
    
    const difference = Math.abs(pythData.price - otherSourcePrice);
    const differencePercent = (difference / otherSourcePrice) * 100;

    console.log(\`\\nPrice Comparison:\`);
    console.log(\`  Pyth Price: $\${pythData.price.toFixed(8)}\`);
    console.log(\`  Other Source: $\${otherSourcePrice.toFixed(8)}\`);
    console.log(\`  Difference: $\${difference.toFixed(8)} (\${differencePercent.toFixed(2)}%)\`);

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

/**
 * Track LUNC volatility (useful post-collapse)
 */
async function trackVolatility(duration: number = 60000, checkInterval: number = 5000) {
  console.log(\`Tracking LUNC volatility for \${duration / 1000} seconds...\\n\`);
  
  const prices: Array<{ price: number; timestamp: Date }> = [];
  const startTime = Date.now();

  const interval = setInterval(async () => {
    try {
      const data = await getPythLUNCPrice();
      prices.push({ price: data.price, timestamp: data.timestamp });
      
      const elapsed = Date.now() - startTime;
      if (elapsed >= duration) {
        clearInterval(interval);
        
        const priceValues = prices.map(p => p.price);
        const avgPrice = priceValues.reduce((a, b) => a + b, 0) / priceValues.length;
        const maxPrice = Math.max(...priceValues);
        const minPrice = Math.min(...priceValues);
        const volatility = ((maxPrice - minPrice) / avgPrice) * 100;
        
        console.log(\`\\nVolatility Report:\`);
        console.log(\`  Duration: \${duration / 1000}s\`);
        console.log(\`  Samples: \${prices.length}\`);
        console.log(\`  Average: $\${avgPrice.toFixed(8)}\`);
        console.log(\`  Range: $\${minPrice.toFixed(8)} - $\${maxPrice.toFixed(8)}\`);
        console.log(\`  Volatility: \${volatility.toFixed(2)}%\`);
        
        return {
          duration,
          samples: prices.length,
          avgPrice,
          minPrice,
          maxPrice,
          volatility,
          prices,
        };
      }
    } catch (error) {
      console.error('Error tracking volatility:', error);
    }
  }, checkInterval);
}

// Example usage
async function main() {
  console.log('Fetching LUNC price from Pyth Network...\\n');

  const luncData = await getPythLUNCPrice();
  console.log(\`\\nLUNC Price: $\${luncData.price.toFixed(8)}\`);
  console.log(\`Confidence: ±$\${luncData.confidence.toFixed(8)}\`);

  const withConfidence = await getLUNCPriceWithConfidenceCheck();
  console.log(\`\\nConfidence check: \${withConfidence.isConfident ? '✅' : '⚠️'}\`);

  const stats = await getLUNCPriceStats(5, 2000);
  console.log(\`\\nVolatility: \${stats.volatility.toFixed(2)}%\`);
}

export {
  getPythLUNCPrice,
  getLUNCPriceWithConfidenceCheck,
  monitorLUNCPrice,
  getLUNCPriceStats,
  comparePrices,
  trackVolatility,
  LUNC_USD_FEED_ID,
};
    `.trim(),
  },

  notes: [
    'Fastest oracle with 400ms update frequency',
    '70+ data publishers including major exchanges',
    'Confidence intervals provide price certainty',
    'No API key required',
    'Ideal for real-time LUNC price tracking',
    'Useful for volatility monitoring post-collapse',
    'Pull-based model available',
    'WebSocket streaming available',
  ],

  limitations: [
    'Requires internet connection',
    'Confidence intervals need monitoring',
    'Limited to price data (no blockchain data)',
    'LUNC feed availability may vary',
    'Reduced liquidity post-collapse may affect accuracy',
  ],

  alternatives: [
    'Terra Classic Oracle Module (native on-chain)',
    'DIA (for open-source feeds)',
    'CoinGecko (for historical data)',
    'Band Protocol (for customizable feeds)',
  ],

  historicalNote: `
    Terra Classic (LUNC) experienced extreme volatility during and after the May 2022
    collapse. The token lost over 99.99% of its value when the UST stablecoin de-pegged.
    Pyth's high-frequency feeds are particularly useful for tracking LUNC's continued
    volatility in the community-driven revival effort.
  `,
};

