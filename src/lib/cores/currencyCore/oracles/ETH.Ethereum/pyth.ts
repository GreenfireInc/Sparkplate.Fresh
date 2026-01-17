// Pyth Network - High-Frequency Oracle for Ethereum
// Real-time, low-latency price feeds with 400ms update frequency

export const pythOracle = {
  name: 'Pyth Network',
  blockchain: 'Ethereum (ETH)',
  type: 'High-Frequency Oracle',
  
  description: `Pyth Network provides high-fidelity, low-latency price feeds for Ethereum with updates as fast as 400 milliseconds. With data from 70+ publishers including major exchanges and market makers, Pyth is designed for derivatives, perpetual futures trading, and applications requiring sub-second price updates.`,

  features: [
    'Extremely fast price updates (400ms)',
    '70+ data publishers (major exchanges and market makers)',
    'Confidence intervals included with every price',
    'Pull-based model for gas efficiency',
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
    evmIntegration: 'https://docs.pyth.network/price-feeds/contract-integration/evm',
    jsSDK: 'https://docs.pyth.network/price-feeds/api-reference/javascript-sdk',
  },

  sdk: {
    primaryPackage: '@pythnetwork/pyth-sdk-js',
    solidityPackage: '@pythnetwork/pyth-sdk-solidity',
    installCommand: 'npm install @pythnetwork/pyth-sdk-js',
    supportedLanguages: ['TypeScript', 'JavaScript', 'Solidity', 'Python', 'Rust'],
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
    ETH_USD: '0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874508563450',
    BTC_USD: '0xe62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43',
    USDC_USD: '0xeaa020c61cc479712813461ce153894a96a6c00b21ed0cfc2798d1f9a9e9c94a',
    SOL_USD: '0xfe142235330e3b6c1e46a8dd6db67d5d48506f22d0cea14c88a3c1a36e09e937',
    USDT_USD: '0x2b89b9dc8fdf9f34709a5b106b472f0f39bb6ca9ce04b0fd7f2e971688e2e53b',
  },

  useCases: [
    'Derivatives and perpetual futures trading',
    'High-frequency trading applications',
    'Real-time portfolio valuation',
    'Options pricing',
    'Liquidation systems requiring fast updates',
    'Arbitrage monitoring',
    'Market making algorithms',
  ],

  integration: {
    example: `
import { PythHttpClient } from '@pythnetwork/client';

/**
 * Pyth Network Integration for Ethereum
 * High-frequency price feeds with confidence intervals
 */

// Pyth Price Feed IDs (Ethereum Mainnet)
const PYTH_FEEDS = {
  ETH_USD: '0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874508563450',
  BTC_USD: '0xe62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43',
  USDC_USD: '0xeaa020c61cc479712813461ce153894a96a6c00b21ed0cfc2798d1f9a9e9c94a',
  SOL_USD: '0xfe142235330e3b6c1e46a8dd6db67d5d48506f22d0cea14c88a3c1a36e09e937',
};

/**
 * Initialize Pyth client
 */
function getPythClient(): PythHttpClient {
  return new PythHttpClient({
    endpoint: 'https://hermes.pyth.network',
  });
}

/**
 * Get latest price from Pyth
 */
async function getPythPrice(feedId: string) {
  try {
    const client = getPythClient();
    
    const priceFeeds = await client.getLatestPriceFeeds([feedId]);
    
    if (!priceFeeds || priceFeeds.length === 0) {
      throw new Error('No price feed data available');
    }

    const feed = priceFeeds[0];
    const priceData = feed.getPriceUnchecked();

    const price = Number(priceData.price) * Math.pow(10, priceData.expo);
    const confidence = Number(priceData.conf) * Math.pow(10, priceData.expo);
    const timestamp = new Date(priceData.publishTime * 1000);

    console.log(\`Pyth Price: $\${price}\`);
    console.log(\`Confidence: ±$\${confidence}\`);
    console.log(\`Updated: \${timestamp}\`);

    return {
      price,
      confidence,
      timestamp,
      feedId,
    };
  } catch (error) {
    console.error('Error fetching Pyth price:', error);
    throw error;
  }
}

/**
 * Get multiple prices at once
 */
async function getMultiplePrices(feedIds: string[]) {
  try {
    const client = getPythClient();
    const priceFeeds = await client.getLatestPriceFeeds(feedIds);

    return priceFeeds.map((feed) => {
      const priceData = feed.getPriceUnchecked();
      const price = Number(priceData.price) * Math.pow(10, priceData.expo);
      const confidence = Number(priceData.conf) * Math.pow(10, priceData.expo);

      return {
        feedId: feed.id,
        price,
        confidence,
        timestamp: new Date(priceData.publishTime * 1000),
      };
    });
  } catch (error) {
    console.error('Error fetching multiple prices:', error);
    throw error;
  }
}

/**
 * Stream real-time prices (WebSocket)
 */
async function streamPrices(
  feedIds: string[],
  callback: (data: any) => void
) {
  const client = getPythClient();

  // Subscribe to price updates
  const connection = await client.subscribeToStreams(feedIds);

  connection.on('data', (update) => {
    const priceData = update.getPriceUnchecked();
    const price = Number(priceData.price) * Math.pow(10, priceData.expo);
    const confidence = Number(priceData.conf) * Math.pow(10, priceData.expo);

    callback({
      feedId: update.id,
      price,
      confidence,
      timestamp: new Date(priceData.publishTime * 1000),
    });
  });

  return connection;
}

/**
 * Get price with confidence check
 */
async function getPriceWithConfidenceCheck(
  feedId: string,
  maxConfidencePercent: number = 1
) {
  try {
    const data = await getPythPrice(feedId);
    
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
    console.error('Error checking price confidence:', error);
    throw error;
  }
}

/**
 * Compare Pyth vs Chainlink prices
 */
async function comparePrices(feedId: string, chainlinkPrice: number) {
  try {
    const pythData = await getPythPrice(feedId);
    
    const difference = Math.abs(pythData.price - chainlinkPrice);
    const differencePercent = (difference / chainlinkPrice) * 100;

    console.log(\`Pyth Price: $\${pythData.price.toFixed(2)}\`);
    console.log(\`Chainlink Price: $\${chainlinkPrice.toFixed(2)}\`);
    console.log(\`Difference: $\${difference.toFixed(2)} (\${differencePercent.toFixed(2)}%)\`);

    return {
      pythPrice: pythData.price,
      chainlinkPrice,
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
  console.log('Fetching ETH price from Pyth Network...');

  const ethData = await getPythPrice(PYTH_FEEDS.ETH_USD);
  console.log(\`ETH Price: $\${ethData.price.toFixed(2)}\`);
  console.log(\`Confidence: ±$\${ethData.confidence.toFixed(2)}\`);

  const multiplePrices = await getMultiplePrices([
    PYTH_FEEDS.ETH_USD,
    PYTH_FEEDS.BTC_USD,
    PYTH_FEEDS.SOL_USD,
  ]);
  console.log('Multiple prices:', multiplePrices);

  // Stream real-time prices
  await streamPrices([PYTH_FEEDS.ETH_USD], (data) => {
    console.log('Real-time update:', data);
  });
}

export {
  getPythPrice,
  getMultiplePrices,
  streamPrices,
  getPriceWithConfidenceCheck,
  comparePrices,
  PYTH_FEEDS,
};
    `.trim(),
  },

  notes: [
    'Fastest oracle with 400ms update frequency',
    '70+ data publishers including major exchanges',
    'Confidence intervals provide price certainty metrics',
    'Pull-based model reduces gas costs',
    'Ideal for high-frequency trading and derivatives',
    'Real-time WebSocket streaming available',
    'Cross-chain support (Ethereum, Solana, etc.)',
    'No API key required for Hermes endpoint',
  ],

  limitations: [
    'Requires integration setup for on-chain usage',
    'Pull-based model means you pay gas to update on-chain',
    'Confidence intervals need monitoring',
    'Less historical data compared to Chainlink',
  ],

  alternatives: [
    'Chainlink (for standard push-based feeds)',
    'RedStone (for L2 optimization)',
    'Band Protocol',
  ],
};

