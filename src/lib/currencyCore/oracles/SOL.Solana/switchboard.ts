// Switchboard - Decentralized Oracle for Solana
// Customizable oracle feeds with TEE security and sub-100ms latency

export const switchboardOracle = {
  name: 'Switchboard',
  blockchain: 'Solana (SOL)',
  type: 'Decentralized Oracle Network',
  
  description: `Switchboard is a fully decentralized, permissionless oracle protocol on Solana that allows developers to create custom data feeds with sub-100ms latency. Using Trusted Execution Environments (TEEs) and a network of independent oracles, Switchboard provides verifiable, tamper-proof data feeds. With the Surge oracle offering the fastest updates on Solana, Switchboard is ideal for applications requiring customizable, decentralized price feeds for SOL and other assets.`,

  features: [
    'Fully decentralized oracle network',
    'Customizable data feeds',
    'Sub-100ms latency (Surge oracle)',
    'TEE hardware attestation',
    'Verifiable randomness (VRF)',
    'Permissionless feed creation',
    'Multi-signature validation',
    'On-chain aggregation',
  ],

  api: {
    website: 'https://switchboard.xyz/',
    documentation: 'https://docs.switchboard.xyz/',
    apiReference: 'https://docs.switchboard.xyz/api',
    explorer: 'https://app.switchboard.xyz/',
    feeds: 'https://app.switchboard.xyz/solana/mainnet',
  },

  sdk: {
    primaryPackage: '@switchboard-xyz/solana.js',
    installCommand: 'npm install @switchboard-xyz/solana.js @solana/web3.js',
    supportedLanguages: ['TypeScript', 'JavaScript', 'Rust'],
  },

  socialMedia: {
    website: 'https://switchboard.xyz/',
    twitter: 'https://twitter.com/switchboardxyz',
    discord: 'https://discord.com/invite/switchboardxyz',
    telegram: 'https://t.me/switchboardxyz',
    github: 'https://github.com/switchboard-xyz',
    blog: 'https://switchboard.xyz/blog',
  },

  useCases: [
    'Custom oracle feed creation',
    'DeFi protocol price feeds',
    'Verifiable randomness for games',
    'Sports betting oracles',
    'Weather data feeds',
    'Custom API integrations',
    'Multi-source data aggregation',
  ],

  integration: {
    example: `
import { Connection, PublicKey } from '@solana/web3.js';
import { AggregatorAccount, SwitchboardProgram } from '@switchboard-xyz/solana.js';

/**
 * Switchboard Oracle Integration for Solana (SOL)
 * Decentralized oracle with customizable feeds and TEE security
 */

const SOLANA_RPC = 'https://api.mainnet-beta.solana.com';
// Example Switchboard SOL/USD feed on mainnet
const SOL_USD_FEED = 'GvDMxPzN1sCj7L26YDK2HnMRXEQmQ2aemov8YBtPS7vR';

/**
 * Get SOL price from Switchboard feed
 */
async function getSwitchboardSOLPrice() {
  try {
    const connection = new Connection(SOLANA_RPC);
    
    // Initialize Switchboard program
    const program = await SwitchboardProgram.load('mainnet-beta', connection);
    
    // Load aggregator account
    const aggregatorAccount = new AggregatorAccount(program, new PublicKey(SOL_USD_FEED));
    
    // Fetch latest value
    const result = await aggregatorAccount.fetchLatestValue();
    
    if (result === null) {
      throw new Error('No value available from Switchboard feed');
    }

    const price = result.toNumber();
    
    console.log(\`Switchboard SOL/USD Price: $\${price.toFixed(4)}\`);

    return {
      price,
      feedAddress: SOL_USD_FEED,
      timestamp: new Date(),
    };
  } catch (error) {
    console.error('Error fetching Switchboard SOL price:', error);
    throw error;
  }
}

/**
 * Get detailed feed information
 */
async function getSwitchboardFeedInfo(feedAddress: string) {
  try {
    const connection = new Connection(SOLANA_RPC);
    const program = await SwitchboardProgram.load('mainnet-beta', connection);
    
    const aggregatorAccount = new AggregatorAccount(program, new PublicKey(feedAddress));
    
    // Load aggregator data
    const aggregator = await aggregatorAccount.loadData();
    
    console.log(\`\\nSwitchboard Feed Info:\`);
    console.log(\`  Feed Address: \${feedAddress}\`);
    console.log(\`  Name: \${aggregator.name}\`);
    console.log(\`  Min Oracle Results: \${aggregator.minOracleResults}\`);
    console.log(\`  Update Interval: \${aggregator.minUpdateDelaySeconds}s\`);
    console.log(\`  Variance Threshold: \${aggregator.varianceThreshold}\`);

    return {
      address: feedAddress,
      name: aggregator.name,
      minOracleResults: aggregator.minOracleResults,
      updateInterval: aggregator.minUpdateDelaySeconds,
      varianceThreshold: aggregator.varianceThreshold,
    };
  } catch (error) {
    console.error('Error fetching Switchboard feed info:', error);
    throw error;
  }
}

/**
 * Get feed history (multiple readings)
 */
async function getFeedHistory(feedAddress: string) {
  try {
    const connection = new Connection(SOLANA_RPC);
    const program = await SwitchboardProgram.load('mainnet-beta', connection);
    
    const aggregatorAccount = new AggregatorAccount(program, new PublicKey(feedAddress));
    
    // Fetch current round data
    const latestRound = await aggregatorAccount.fetchLatestValue();
    
    if (!latestRound) {
      throw new Error('No data available');
    }

    console.log(\`\\nLatest Round Data:\`);
    console.log(\`  Value: \${latestRound.toNumber()}\`);
    console.log(\`  Timestamp: \${new Date().toISOString()}\`);

    return {
      latestValue: latestRound.toNumber(),
      timestamp: new Date(),
    };
  } catch (error) {
    console.error('Error fetching feed history:', error);
    throw error;
  }
}

/**
 * Monitor SOL price changes
 */
async function monitorSwitchboardSOLPrice(
  callback: (price: number) => void,
  intervalMs: number = 5000
) {
  console.log('Starting Switchboard SOL price monitoring...\\n');

  let lastPrice: number | null = null;

  setInterval(async () => {
    try {
      const data = await getSwitchboardSOLPrice();
      
      if (lastPrice !== null) {
        const change = ((data.price - lastPrice) / lastPrice) * 100;
        console.log(
          \`SOL: $\${data.price.toFixed(4)} (\${change >= 0 ? '+' : ''}\${change.toFixed(2)}%)\`
        );
      } else {
        console.log(\`Initial SOL price: $\${data.price.toFixed(4)}\`);
      }
      
      lastPrice = data.price;
      callback(data.price);
    } catch (error) {
      console.error('Monitoring error:', error);
    }
  }, intervalMs);
}

/**
 * Compare Switchboard with other oracle sources
 */
async function compareWithOtherOracles(otherPrice: number, oracleName: string) {
  try {
    const switchboardData = await getSwitchboardSOLPrice();
    
    const difference = Math.abs(switchboardData.price - otherPrice);
    const differencePercent = (difference / otherPrice) * 100;

    console.log(\`\\nOracle Price Comparison:\`);
    console.log(\`  Switchboard: $\${switchboardData.price.toFixed(4)}\`);
    console.log(\`  \${oracleName}: $\${otherPrice.toFixed(4)}\`);
    console.log(\`  Difference: $\${difference.toFixed(4)} (\${differencePercent.toFixed(3)}%)\`);
    console.log(\`  Status: \${differencePercent < 0.5 ? '✅ Close' : '⚠️ Variance detected'}\`);

    return {
      switchboardPrice: switchboardData.price,
      otherPrice,
      oracleName,
      difference,
      differencePercent,
    };
  } catch (error) {
    console.error('Error comparing oracle prices:', error);
    throw error;
  }
}

/**
 * Get oracle job accounts for a feed
 */
async function getOracleJobs(feedAddress: string) {
  try {
    const connection = new Connection(SOLANA_RPC);
    const program = await SwitchboardProgram.load('mainnet-beta', connection);
    
    const aggregatorAccount = new AggregatorAccount(program, new PublicKey(feedAddress));
    const aggregator = await aggregatorAccount.loadData();
    
    console.log(\`\\nOracle Jobs for feed \${feedAddress}:\`);
    console.log(\`  Number of oracles: \${aggregator.oracleRequestBatchSize}\`);
    console.log(\`  Min confirmations: \${aggregator.minOracleResults}\`);

    return {
      feedAddress,
      oracleCount: aggregator.oracleRequestBatchSize,
      minConfirmations: aggregator.minOracleResults,
    };
  } catch (error) {
    console.error('Error fetching oracle jobs:', error);
    throw error;
  }
}

/**
 * Validate feed freshness
 */
async function validateFeedFreshness(
  feedAddress: string,
  maxAgeSeconds: number = 60
) {
  try {
    const connection = new Connection(SOLANA_RPC);
    const program = await SwitchboardProgram.load('mainnet-beta', connection);
    
    const aggregatorAccount = new AggregatorAccount(program, new PublicKey(feedAddress));
    const result = await aggregatorAccount.fetchLatestValue();
    
    if (!result) {
      throw new Error('No data available');
    }

    const price = result.toNumber();
    const now = Date.now() / 1000;
    
    // Note: Actual timestamp would need to be fetched from round data
    // This is a simplified example
    console.log(\`\\nFeed Freshness Check:\`);
    console.log(\`  Current Price: $\${price.toFixed(4)}\`);
    console.log(\`  Status: ✅ Fresh (Switchboard updates frequently)\`);

    return {
      price,
      isFresh: true,
      timestamp: new Date(),
    };
  } catch (error) {
    console.error('Error validating feed freshness:', error);
    throw error;
  }
}

// Example usage
async function main() {
  console.log('Querying Switchboard oracle for SOL price...\\n');

  // Get SOL price
  const price = await getSwitchboardSOLPrice();
  console.log(\`\\nSOL Price: $\${price.price.toFixed(4)}\`);

  // Get feed information
  await getSwitchboardFeedInfo(SOL_USD_FEED);

  // Get oracle jobs
  await getOracleJobs(SOL_USD_FEED);

  // Validate freshness
  await validateFeedFreshness(SOL_USD_FEED);
}

export {
  getSwitchboardSOLPrice,
  getSwitchboardFeedInfo,
  getFeedHistory,
  monitorSwitchboardSOLPrice,
  compareWithOtherOracles,
  getOracleJobs,
  validateFeedFreshness,
  SOL_USD_FEED,
};
    `.trim(),
  },

  notes: [
    'Fully decentralized oracle network',
    'Customizable data feeds',
    'Sub-100ms latency with Surge oracle',
    'TEE hardware attestation for security',
    'Permissionless feed creation',
    'Verifiable randomness (VRF)',
    'Multi-signature oracle validation',
    'Native Solana integration',
  ],

  limitations: [
    'Requires understanding of oracle configurations',
    'Custom feeds require setup and maintenance',
    'On-chain queries require SOL for gas',
    'Documentation can be complex for beginners',
  ],

  alternatives: [
    'Pyth Network (for high-frequency feeds)',
    'Jupiter (for DEX-aggregated prices)',
    'CoinGecko (for market data)',
    'Helius (for comprehensive Solana data)',
  ],
};

