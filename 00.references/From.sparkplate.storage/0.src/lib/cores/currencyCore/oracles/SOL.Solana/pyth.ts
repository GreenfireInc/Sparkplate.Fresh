// Pyth Network - Native High-Frequency Oracle for Solana
// Real-time, sub-second price feeds with 400ms updates

export const pythOracle = {
  name: 'Pyth Network',
  blockchain: 'Solana (SOL)',
  type: 'High-Frequency Oracle',
  
  description: `Pyth Network is the leading oracle on Solana, providing high-fidelity, low-latency price feeds with updates as fast as 400 milliseconds. Built natively on Solana, Pyth aggregates data from 120+ first-party publishers including major exchanges, market makers, and financial institutions. With over 500 price feeds, Pyth powers the majority of DeFi protocols on Solana and is ideal for applications requiring sub-second SOL price updates.`,

  features: [
    'Native Solana integration',
    'Extremely fast price updates (400ms)',
    '120+ first-party data publishers',
    '500+ price feeds available',
    'Confidence intervals included',
    'Pull and push models',
    'Sub-second latency',
    'High-frequency trading ready',
  ],

  api: {
    website: 'https://pyth.network/',
    documentation: 'https://docs.pyth.network/',
    priceFeeds: 'https://pyth.network/price-feeds/',
    hermesEndpoint: 'https://hermes.pyth.network',
    jsSDK: 'https://docs.pyth.network/price-feeds/api-reference/javascript-sdk',
    solanaProgram: 'https://docs.pyth.network/price-feeds/solana-price-feeds',
  },

  sdk: {
    primaryPackage: '@pythnetwork/client',
    hermesClient: '@pythnetwork/hermes-client',
    solanaWeb3: '@solana/web3.js',
    installCommand: 'npm install @pythnetwork/client @solana/web3.js',
    supportedLanguages: ['TypeScript', 'JavaScript', 'Python', 'Rust', 'Solidity'],
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
    SOL_USD: '0xef0d8b6fda2ceba41da15d4095d1da392a0d2f8ed0c6c7bc0f4cfac8c280b56d',
  },

  useCases: [
    'Real-time SOL price tracking',
    'DeFi protocol integrations',
    'Trading platform price feeds',
    'Perpetuals and derivatives',
    'Lending protocols',
    'Portfolio valuation',
    'Arbitrage monitoring',
  ],

  integration: {
    example: `
import { Connection, PublicKey } from '@solana/web3.js';
import { PythHttpClient, getPythProgramKeyForCluster } from '@pythnetwork/client';
import axios from 'axios';

/**
 * Pyth Network Integration for Solana (SOL)
 * Native high-frequency oracle with sub-second updates
 */

const SOLANA_RPC = 'https://api.mainnet-beta.solana.com';
const PYTH_HERMES_ENDPOINT = 'https://hermes.pyth.network';
const SOL_USD_FEED_ID = '0xef0d8b6fda2ceba41da15d4095d1da392a0d2f8ed0c6c7bc0f4cfac8c280b56d';
const SOL_USD_PRICE_ACCOUNT = 'H6ARHf6YXhGYeQfUzQNGk6rDNnLBQKrenN712K4AQJEG'; // Pyth SOL/USD mainnet

/**
 * Get SOL price from Pyth using Hermes API (fastest method)
 */
async function getPythSOLPriceHermes() {
  try {
    const response = await axios.get(
      \`\${PYTH_HERMES_ENDPOINT}/v2/updates/price/latest\`,
      {
        params: {
          ids: [SOL_USD_FEED_ID],
        },
      }
    );

    const priceData = response.data.parsed[0].price;
    
    const price = parseFloat(priceData.price) * Math.pow(10, priceData.expo);
    const confidence = parseFloat(priceData.conf) * Math.pow(10, priceData.expo);
    const timestamp = new Date(priceData.publish_time * 1000);

    console.log(\`Pyth SOL/USD Price: $\${price.toFixed(4)}\`);
    console.log(\`Confidence: ±$\${confidence.toFixed(4)}\`);
    console.log(\`Updated: \${timestamp.toISOString()}\`);

    return {
      price,
      confidence,
      timestamp,
      feedId: SOL_USD_FEED_ID,
    };
  } catch (error) {
    console.error('Error fetching Pyth SOL price via Hermes:', error);
    throw error;
  }
}

/**
 * Get SOL price from Pyth on-chain (direct Solana integration)
 */
async function getPythSOLPriceOnChain() {
  try {
    const connection = new Connection(SOLANA_RPC);
    const pythPublicKey = new PublicKey(SOL_USD_PRICE_ACCOUNT);
    
    // Initialize Pyth client
    const pythClient = new PythHttpClient(
      connection,
      getPythProgramKeyForCluster('mainnet-beta')
    );

    // Fetch price data
    const priceData = await pythClient.getData();
    const solPrice = priceData.productPrice.get(SOL_USD_PRICE_ACCOUNT);

    if (!solPrice || !solPrice.price) {
      throw new Error('SOL price not available');
    }

    const price = solPrice.price;
    const confidence = solPrice.confidence || 0;
    
    console.log(\`Pyth On-Chain SOL/USD Price: $\${price.toFixed(4)}\`);
    console.log(\`Confidence: ±$\${confidence.toFixed(4)}\`);

    return {
      price,
      confidence,
      timestamp: new Date(),
      account: SOL_USD_PRICE_ACCOUNT,
    };
  } catch (error) {
    console.error('Error fetching Pyth on-chain SOL price:', error);
    throw error;
  }
}

/**
 * Get price with confidence check
 */
async function getSOLPriceWithConfidenceCheck(maxConfidencePercent: number = 0.5) {
  try {
    const data = await getPythSOLPriceHermes();
    
    const confidencePercent = (data.confidence / data.price) * 100;

    if (confidencePercent > maxConfidencePercent) {
      console.warn(
        \`Warning: Confidence interval (\${confidencePercent.toFixed(3)}%) exceeds threshold (\${maxConfidencePercent}%)\`
      );
    }

    return {
      ...data,
      confidencePercent,
      isConfident: confidencePercent <= maxConfidencePercent,
    };
  } catch (error) {
    console.error('Error checking SOL price confidence:', error);
    throw error;
  }
}

/**
 * Monitor SOL price changes in real-time
 */
async function monitorSOLPrice(
  callback: (price: number, timestamp: Date) => void,
  intervalMs: number = 1000
) {
  console.log('Starting SOL price monitoring (1-second intervals)...\\n');

  setInterval(async () => {
    try {
      const data = await getPythSOLPriceHermes();
      callback(data.price, data.timestamp);
    } catch (error) {
      console.error('Monitoring error:', error);
    }
  }, intervalMs);
}

/**
 * Get price statistics over time
 */
async function getSOLPriceStats(samples: number = 60, intervalMs: number = 1000) {
  const prices: number[] = [];

  console.log(\`Collecting \${samples} SOL price samples over \${(samples * intervalMs) / 1000} seconds...\`);

  for (let i = 0; i < samples; i++) {
    try {
      const data = await getPythSOLPriceHermes();
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

  console.log(\`\\nSOL Price Statistics (\${samples} samples):\`);
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
 * Get multiple Solana token prices
 */
async function getMultiplePrices(feedIds: string[]) {
  try {
    const response = await axios.get(
      \`\${PYTH_HERMES_ENDPOINT}/v2/updates/price/latest\`,
      {
        params: {
          ids: feedIds,
        },
      }
    );

    const prices = response.data.parsed.map((feed: any) => {
      const priceData = feed.price;
      return {
        feedId: feed.id,
        price: parseFloat(priceData.price) * Math.pow(10, priceData.expo),
        confidence: parseFloat(priceData.conf) * Math.pow(10, priceData.expo),
        timestamp: new Date(priceData.publish_time * 1000),
      };
    });

    console.log(\`\\nFetched \${prices.length} price feeds:\`);
    prices.forEach((p: any) => {
      console.log(\`  Feed \${p.feedId.substring(0, 10)}...: $\${p.price.toFixed(4)}\`);
    });

    return prices;
  } catch (error) {
    console.error('Error fetching multiple prices:', error);
    throw error;
  }
}

/**
 * Compare prices across different methods
 */
async function comparePriceSources() {
  try {
    console.log('Comparing Pyth price sources...\\n');
    
    const [hermesPrice, onChainPrice] = await Promise.all([
      getPythSOLPriceHermes().catch(e => ({ price: null, error: e.message })),
      getPythSOLPriceOnChain().catch(e => ({ price: null, error: e.message })),
    ]);

    console.log(\`\\nPrice Comparison:\`);
    console.log(\`  Hermes API: $\${hermesPrice.price?.toFixed(4) || 'N/A'}\`);
    console.log(\`  On-Chain: $\${onChainPrice.price?.toFixed(4) || 'N/A'}\`);
    
    if (hermesPrice.price && onChainPrice.price) {
      const diff = Math.abs(hermesPrice.price - onChainPrice.price);
      const diffPercent = (diff / hermesPrice.price) * 100;
      console.log(\`  Difference: $\${diff.toFixed(4)} (\${diffPercent.toFixed(3)}%)\`);
    }

    return { hermesPrice, onChainPrice };
  } catch (error) {
    console.error('Error comparing price sources:', error);
    throw error;
  }
}

/**
 * Stream SOL price updates (WebSocket-like behavior)
 */
async function streamSOLPrice(
  callback: (price: number, change: number) => void,
  intervalMs: number = 400
) {
  console.log('Streaming SOL price (400ms intervals)...\\n');

  let lastPrice: number | null = null;

  const interval = setInterval(async () => {
    try {
      const data = await getPythSOLPriceHermes();
      
      if (lastPrice !== null) {
        const change = ((data.price - lastPrice) / lastPrice) * 100;
        console.log(
          \`SOL: $\${data.price.toFixed(4)} (\${change >= 0 ? '+' : ''}\${change.toFixed(3)}%)\`
        );
        callback(data.price, change);
      } else {
        console.log(\`Initial SOL price: $\${data.price.toFixed(4)}\`);
      }
      
      lastPrice = data.price;
    } catch (error) {
      console.error('Stream error:', error);
    }
  }, intervalMs);

  // Return cleanup function
  return () => clearInterval(interval);
}

// Example usage
async function main() {
  console.log('Fetching SOL price from Pyth Network...\\n');

  // Get price via Hermes API (recommended)
  const solData = await getPythSOLPriceHermes();
  console.log(\`\\nSOL Price: $\${solData.price.toFixed(4)}\`);
  console.log(\`Confidence: ±$\${solData.confidence.toFixed(4)}\`);

  // Check confidence
  const withConfidence = await getSOLPriceWithConfidenceCheck();
  console.log(\`\\nConfidence check: \${withConfidence.isConfident ? '✅' : '⚠️'}\`);

  // Get short-term statistics
  const stats = await getSOLPriceStats(10, 1000);
  console.log(\`\\nShort-term volatility: \${stats.volatility.toFixed(3)}%\`);

  // Compare price sources
  await comparePriceSources();
}

export {
  getPythSOLPriceHermes,
  getPythSOLPriceOnChain,
  getSOLPriceWithConfidenceCheck,
  monitorSOLPrice,
  getSOLPriceStats,
  getMultiplePrices,
  comparePriceSources,
  streamSOLPrice,
  SOL_USD_FEED_ID,
  SOL_USD_PRICE_ACCOUNT,
};
    `.trim(),
  },

  notes: [
    'Native Solana integration (built on Solana)',
    'Fastest oracle with 400ms update frequency',
    '120+ first-party publishers',
    'Over 500 price feeds available',
    'Confidence intervals provide price certainty',
    'Both on-chain and off-chain access methods',
    'No API key required',
    'Powers majority of Solana DeFi',
  ],

  limitations: [
    'Requires internet connection or Solana RPC',
    'On-chain method requires gas (SOL)',
    'Confidence intervals need monitoring',
    'Limited to price data (no blockchain data)',
  ],

  alternatives: [
    'Switchboard (for customizable feeds)',
    'Jupiter (for DEX-aggregated prices)',
    'CoinGecko (for historical data)',
    'Helius (for comprehensive Solana data)',
  ],
};

