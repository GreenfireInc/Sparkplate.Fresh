// Chainlink - Official Oracle Solution for Tron
// Industry-standard decentralized oracle network providing secure price feeds

export const chainlinkOracle = {
  name: 'Chainlink',
  blockchain: 'Tron (TRX)',
  type: 'Decentralized Oracle Network',
  
  description: `Chainlink is the official oracle solution for the Tron blockchain as of October 31, 2024, replacing WINkLink to secure over $5.5 billion in DeFi TVL. As the industry-standard decentralized oracle network, Chainlink provides tamper-proof, high-quality price feeds for TRX, BTC, ETH, USDT, and other major assets on Tron. With proven reliability across multiple blockchains and wide adoption by Tron DeFi protocols like JustLend, JustStable, and USDD, Chainlink delivers enterprise-grade data infrastructure for Tron's growing DeFi ecosystem.`,

  features: [
    'Official oracle for Tron (since Oct 2024)',
    'Tamper-proof price feeds',
    'High-quality data from multiple sources',
    'Wide asset pair coverage',
    'Proven cross-chain reliability',
    'Decentralized node network',
    'Regular heartbeat updates',
    'Deviation threshold protection',
  ],

  api: {
    website: 'https://chain.link/',
    documentation: 'https://docs.chain.link/data-feeds/tron',
    priceFeeds: 'https://docs.chain.link/data-feeds/price-feeds/addresses',
    dataExplorer: 'https://data.chain.link/',
    tronIntegration: 'https://trondao.medium.com/integrating-chainlink-oracles-with-tron-a-practical-guide-3a4ece864a0a',
    github: 'https://github.com/smartcontractkit/chainlink',
  },

  sdk: {
    primaryPackage: '@chainlink/contracts',
    tronWeb: 'tronweb',
    installCommand: 'npm install @chainlink/contracts tronweb',
    supportedLanguages: ['Solidity', 'TypeScript', 'JavaScript'],
  },

  socialMedia: {
    website: 'https://chain.link/',
    twitter: 'https://twitter.com/chainlink',
    discord: 'https://discord.com/invite/chainlink',
    telegram: 'https://t.me/chainlinkofficial',
    reddit: 'https://www.reddit.com/r/Chainlink/',
    github: 'https://github.com/smartcontractkit',
  },

  priceFeeds: {
    mainnet: {
      'BTC/USD': 'TYZxQSHAhxGgUWzxYEZAohvWtyN6YXYgDB',
      'ETH/USD': 'TRVvV3oJhC5iKZ5H4DFz4EB8KfJRPG4kWB',
      'TRX/USD': 'TQHr7fMpzWGjKR8Xu9wCJSyVT6sJYTwKnU',
      'USDT/USD': 'TF6wpHjEzZJ4fR6BjEscXmzVKbPNgQVsKe',
      'USDC/USD': 'TUCyeXHwEK66xK5MWMwQR5R7GrR1ZpscBG',
    },
    nile: {
      'BTC/USD': 'TGXqS5vVcRjfq4hkeJJKGJvGqVN9WF2nN6',
      'ETH/USD': 'TRc1fYFQcCfxQRSjxWU7hyhZ4jgGAB2kfB',
    },
  },

  useCases: [
    'DeFi protocol price feeds',
    'Lending and borrowing platforms',
    'Stablecoin peg maintenance',
    'Liquidation engines',
    'Derivatives settlement',
    'Portfolio valuation',
    'Trading bots',
    'Risk management systems',
  ],

  integration: {
    example: `
import TronWeb from 'tronweb';

/**
 * Chainlink Oracle Integration for Tron (TRX)
 * Official oracle solution for Tron blockchain
 */

// Initialize TronWeb
const tronWeb = new TronWeb({
  fullHost: 'https://api.trongrid.io', // Mainnet
  // For testnet: 'https://nile.trongrid.io'
});

// Chainlink price feed addresses on Tron mainnet
const PRICE_FEEDS = {
  'BTC/USD': 'TYZxQSHAhxGgUWzxYEZAohvWtyN6YXYgDB',
  'ETH/USD': 'TRVvV3oJhC5iKZ5H4DFz4EB8KfJRPG4kWB',
  'TRX/USD': 'TQHr7fMpzWGjKR8Xu9wCJSyVT6sJYTwKnU',
  'USDT/USD': 'TF6wpHjEzZJ4fR6BjEscXmzVKbPNgQVsKe',
  'USDC/USD': 'TUCyeXHwEK66xK5MWMwQR5R7GrR1ZpscBG',
};

// AggregatorV3Interface ABI
const AGGREGATOR_V3_ABI = [
  {
    "inputs": [],
    "name": "decimals",
    "outputs": [{"name": "", "type": "uint8"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "description",
    "outputs": [{"name": "", "type": "string"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "latestRoundData",
    "outputs": [
      {"name": "roundId", "type": "uint80"},
      {"name": "answer", "type": "int256"},
      {"name": "startedAt", "type": "uint256"},
      {"name": "updatedAt", "type": "uint256"},
      {"name": "answeredInRound", "type": "uint80"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "version",
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  }
];

interface PriceData {
  price: number;
  rawPrice: string;
  decimals: number;
  description: string;
  updatedAt: Date;
  roundId: string;
}

/**
 * Get TRX price from Chainlink oracle
 */
async function getChainlinkTRXPrice(): Promise<PriceData> {
  try {
    const feedAddress = PRICE_FEEDS['TRX/USD'];
    const contract = await tronWeb.contract(AGGREGATOR_V3_ABI, feedAddress);

    // Get latest round data
    const roundData = await contract.latestRoundData().call();
    const decimals = await contract.decimals().call();
    const description = await contract.description().call();

    const rawPrice = roundData.answer.toString();
    const decimalsNum = parseInt(decimals.toString());
    const price = parseFloat(rawPrice) / Math.pow(10, decimalsNum);
    const updatedAt = new Date(parseInt(roundData.updatedAt.toString()) * 1000);

    console.log(\`Chainlink TRX/USD Price: $\${price.toFixed(6)}\`);
    console.log(\`  Decimals: \${decimalsNum}\`);
    console.log(\`  Updated: \${updatedAt.toISOString()}\`);
    console.log(\`  Round ID: \${roundData.roundId.toString()}\`);

    return {
      price,
      rawPrice,
      decimals: decimalsNum,
      description,
      updatedAt,
      roundId: roundData.roundId.toString(),
    };
  } catch (error) {
    console.error('Error fetching Chainlink TRX price:', error);
    throw error;
  }
}

/**
 * Get price for any supported pair
 */
async function getChainlinkPrice(pair: string): Promise<PriceData> {
  try {
    const feedAddress = PRICE_FEEDS[pair as keyof typeof PRICE_FEEDS];
    if (!feedAddress) {
      throw new Error(\`Unsupported price feed: \${pair}\`);
    }

    const contract = await tronWeb.contract(AGGREGATOR_V3_ABI, feedAddress);

    const [roundData, decimals, description] = await Promise.all([
      contract.latestRoundData().call(),
      contract.decimals().call(),
      contract.description().call()
    ]);

    const rawPrice = roundData.answer.toString();
    const decimalsNum = parseInt(decimals.toString());
    const price = parseFloat(rawPrice) / Math.pow(10, decimalsNum);
    const updatedAt = new Date(parseInt(roundData.updatedAt.toString()) * 1000);

    console.log(\`Chainlink \${pair} Price: $\${price.toFixed(decimalsNum)}\`);

    return {
      price,
      rawPrice,
      decimals: decimalsNum,
      description,
      updatedAt,
      roundId: roundData.roundId.toString(),
    };
  } catch (error) {
    console.error(\`Error fetching Chainlink \${pair} price:\`, error);
    throw error;
  }
}

/**
 * Get multiple prices at once
 */
async function getMultiplePrices(pairs: string[]): Promise<{ [pair: string]: PriceData | null }> {
  const results: { [pair: string]: PriceData | null } = {};

  await Promise.all(
    pairs.map(async (pair) => {
      try {
        results[pair] = await getChainlinkPrice(pair);
      } catch (error) {
        console.error(\`Error fetching \${pair}:\`, error);
        results[pair] = null;
      }
    })
  );

  console.log('\\nChainlink Multi-Asset Prices:');
  Object.entries(results).forEach(([pair, data]) => {
    if (data) {
      console.log(\`  \${pair}: $\${data.price.toFixed(data.decimals)}\`);
    } else {
      console.log(\`  \${pair}: N/A\`);
    }
  });

  return results;
}

/**
 * Check if price data is stale
 */
function isPriceStale(priceData: PriceData, maxAgeSeconds: number = 3600): boolean {
  const ageSeconds = (Date.now() - priceData.updatedAt.getTime()) / 1000;
  return ageSeconds > maxAgeSeconds;
}

/**
 * Monitor TRX price changes
 */
async function monitorChainlinkTRXPrice(
  callback: (price: number, change: number) => void,
  intervalMs: number = 15000
) {
  console.log('Starting Chainlink TRX price monitoring...\\n');

  let lastPrice: number | null = null;

  setInterval(async () => {
    try {
      const data = await getChainlinkTRXPrice();
      
      // Check staleness
      if (isPriceStale(data, 3600)) {
        console.warn(\`⚠️  Price data is stale (age: \${Math.floor((Date.now() - data.updatedAt.getTime()) / 1000)}s)\`);
      }
      
      if (lastPrice !== null) {
        const change = ((data.price - lastPrice) / lastPrice) * 100;
        console.log(
          \`TRX: $\${data.price.toFixed(6)} (\${change >= 0 ? '+' : ''}\${change.toFixed(2)}%)\`
        );
        callback(data.price, change);
      } else {
        console.log(\`Initial TRX price: $\${data.price.toFixed(6)}\`);
      }
      
      lastPrice = data.price;
    } catch (error) {
      console.error('Monitoring error:', error);
    }
  }, intervalMs);
}

/**
 * Validate price feed health
 */
async function validatePriceFeedHealth(pair: string): Promise<{
  isHealthy: boolean;
  age: number;
  price: number;
  issues: string[];
}> {
  try {
    const priceData = await getChainlinkPrice(pair);
    const age = (Date.now() - priceData.updatedAt.getTime()) / 1000;
    const issues: string[] = [];

    if (priceData.price <= 0) {
      issues.push('Invalid price (zero or negative)');
    }

    if (age > 3600) {
      issues.push(\`Stale data (age: \${Math.floor(age)}s)\`);
    }

    const isHealthy = issues.length === 0;

    console.log(\`\\nPrice Feed Health Check for \${pair}:\`);
    console.log(\`  Status: \${isHealthy ? '✅ Healthy' : '⚠️  Issues Detected'}\`);
    console.log(\`  Price: $\${priceData.price.toFixed(priceData.decimals)}\`);
    console.log(\`  Age: \${Math.floor(age)}s\`);
    if (issues.length > 0) {
      console.log(\`  Issues: \${issues.join(', ')}\`);
    }

    return {
      isHealthy,
      age,
      price: priceData.price,
      issues,
    };
  } catch (error) {
    console.error(\`Error validating \${pair}:\`, error);
    return {
      isHealthy: false,
      age: 0,
      price: 0,
      issues: ['Failed to fetch price data'],
    };
  }
}

/**
 * Get historical round data
 */
async function getHistoricalPrice(pair: string, roundId: number): Promise<PriceData | null> {
  try {
    const feedAddress = PRICE_FEEDS[pair as keyof typeof PRICE_FEEDS];
    if (!feedAddress) {
      throw new Error(\`Unsupported price feed: \${pair}\`);
    }

    const contract = await tronWeb.contract(AGGREGATOR_V3_ABI, feedAddress);
    
    const getRoundDataABI = [{
      "inputs": [{"name": "_roundId", "type": "uint80"}],
      "name": "getRoundData",
      "outputs": [
        {"name": "roundId", "type": "uint80"},
        {"name": "answer", "type": "int256"},
        {"name": "startedAt", "type": "uint256"},
        {"name": "updatedAt", "type": "uint256"},
        {"name": "answeredInRound", "type": "uint80"}
      ],
      "stateMutability": "view",
      "type": "function"
    }];

    const fullContract = await tronWeb.contract([...AGGREGATOR_V3_ABI, ...getRoundDataABI], feedAddress);
    const roundData = await fullContract.getRoundData(roundId).call();
    const decimals = await contract.decimals().call();
    const description = await contract.description().call();

    const rawPrice = roundData.answer.toString();
    const decimalsNum = parseInt(decimals.toString());
    const price = parseFloat(rawPrice) / Math.pow(10, decimalsNum);
    const updatedAt = new Date(parseInt(roundData.updatedAt.toString()) * 1000);

    console.log(\`\\nHistorical Price for \${pair} (Round \${roundId}):\`);
    console.log(\`  Price: $\${price.toFixed(decimalsNum)}\`);
    console.log(\`  Updated: \${updatedAt.toISOString()}\`);

    return {
      price,
      rawPrice,
      decimals: decimalsNum,
      description,
      updatedAt,
      roundId: roundData.roundId.toString(),
    };
  } catch (error) {
    console.error(\`Error fetching historical price for \${pair}:\`, error);
    return null;
  }
}

// Example usage
async function main() {
  console.log('Querying Chainlink oracle for TRX price...\\n');

  // Get TRX price
  const trxPrice = await getChainlinkTRXPrice();
  console.log(\`\\nTRX Price: $\${trxPrice.price.toFixed(6)}\`);

  // Get multiple prices
  await getMultiplePrices(['TRX/USD', 'BTC/USD', 'ETH/USD']);

  // Validate feed health
  await validatePriceFeedHealth('TRX/USD');
}

export {
  getChainlinkTRXPrice,
  getChainlinkPrice,
  getMultiplePrices,
  isPriceStale,
  monitorChainlinkTRXPrice,
  validatePriceFeedHealth,
  getHistoricalPrice,
  PRICE_FEEDS,
  AGGREGATOR_V3_ABI,
};
    `.trim(),
  },

  notes: [
    'Official oracle for Tron (since Oct 31, 2024)',
    'Replaced WINkLink as primary oracle solution',
    'Secures $5.5B+ TVL on Tron',
    'Powers major Tron DeFi protocols',
    'Industry-standard reliability',
    'Free to use (gas costs only)',
    'Regular heartbeat updates',
    'Deviation threshold protection',
  ],

  limitations: [
    'Requires TRX for gas fees',
    'Price updates depend on heartbeat/deviation',
    'Limited to supported pairs',
    'On-chain queries require TronWeb',
  ],

  alternatives: [
    'DIA (for customizable feeds)',
    'SunSwap (for DEX-based pricing)',
    'CoinGecko (for market data)',
    'TronGrid (for blockchain data)',
  ],
};

