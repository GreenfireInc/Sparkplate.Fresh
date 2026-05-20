// RedStone Oracle - Modular Oracle Network with Arweave Storage
// Type: Modular Price Oracle with Permanent Storage
// Blockchain: Arweave (AR) - Data stored on Arweave, feeds available on multiple chains

export const redstoneOracleAR = {
  name: "RedStone",
  blockchain: "Arweave (AR)",
  type: "Modular Oracle Network with Permanent Storage",
  description: "Fast-growing modular oracle network that stores all verified data permanently on Arweave for consistency and transparency. Provides high-frequency price feeds for 1000+ assets across multiple blockchains, with all historical data verifiable on the Permaweb.",
  
  url: "https://redstone.finance/",
  arweaveDocs: "https://docs.redstone.finance/docs/smart-contract-devs/oracle-data-feeds/arweave",
  docs: "https://docs.redstone.finance/",
  
  api: {
    baseURL: "https://api.redstone.finance",
    priceEndpoint: "https://api.redstone.finance/prices",
    historicalEndpoint: "https://api.redstone.finance/prices",
    arweaveStorage: "https://redstone.arweave.dev",
    documentation: "https://api.docs.redstone.finance/",
    rateLimit: "Public API with rate limits, premium tiers available",
  },
  
  sdk: {
    npm: "redstone-api",
    installation: "npm install redstone-api",
    smartweaveNpm: "redstone-smartweave",
    smartweaveInstallation: "npm install redstone-smartweave",
    warpNpm: "warp-contracts",
    warpInstallation: "npm install warp-contracts",
    documentation: "https://docs.redstone.finance/",
    github: "https://github.com/redstone-finance/redstone-api",
  },
  
  integration: {
    example: `
// RedStone Oracle Integration for Arweave
import redstone from 'redstone-api';

// Method 1: Get current AR price
async function getArweavePrice() {
  try {
    const price = await redstone.getPrice('AR');
    
    console.log('AR Price (USD):', price.value);
    console.log('Timestamp:', price.timestamp);
    console.log('Arweave TX ID:', price.permawebTx);
    console.log('Provider:', price.provider);
    
    return {
      price: price.value,
      timestamp: price.timestamp,
      arweaveTxId: price.permawebTx,
      provider: price.provider,
    };
  } catch (error) {
    console.error('Error fetching AR price from RedStone:', error);
    throw error;
  }
}

// Method 2: Get multiple asset prices
async function getMultiplePrices() {
  try {
    const prices = await redstone.getPrice(['BTC', 'ETH', 'AR', 'SOL']);
    
    prices.forEach(price => {
      console.log(\`\${price.symbol}: $\${price.value}\`);
      console.log(\`  Stored on Arweave: \${price.permawebTx}\`);
    });
    
    return prices;
  } catch (error) {
    console.error('Error fetching multiple prices:', error);
    throw error;
  }
}

// Method 3: Get historical price
async function getHistoricalPrice(date: string) {
  try {
    const historicalPrice = await redstone.getHistoricalPrice('AR', {
      date: date, // ISO 8601 format: "2021-03-30T12:35:09"
    });
    
    console.log('Historical AR Price:', historicalPrice.value);
    console.log('Date:', historicalPrice.timestamp);
    console.log('Arweave TX:', historicalPrice.permawebTx);
    
    return historicalPrice;
  } catch (error) {
    console.error('Error fetching historical price:', error);
    throw error;
  }
}

// Method 4: Get price with provider verification
async function getVerifiedPrice() {
  try {
    // Configure to bypass cache and fetch directly from Arweave
    const api = new redstone.Api({ useCache: false });
    const price = await api.getPrice('AR');
    
    // Verify the data came from Arweave storage
    console.log('Price fetched directly from Arweave:', price.permawebTx);
    console.log('Verifiable on Permaweb:', \`https://arweave.net/\${price.permawebTx}\`);
    
    return price;
  } catch (error) {
    console.error('Error fetching verified price:', error);
    throw error;
  }
}

// Method 5: Get price range
async function getPriceRange(startDate: string, endDate: string) {
  try {
    const prices = await redstone.getPriceRange('AR', {
      startDate: startDate,
      endDate: endDate,
    });
    
    console.log(\`Price range: \${prices.length} data points\`);
    prices.forEach(price => {
      console.log(\`\${price.timestamp}: $\${price.value}\`);
    });
    
    return prices;
  } catch (error) {
    console.error('Error fetching price range:', error);
    throw error;
  }
}

// Method 6: Verify provider signatures (for trusted data)
async function verifyProviderSignature(priceData: any) {
  try {
    // RedStone supports signature verification
    const isValid = await redstone.verifySignature(priceData);
    
    if (isValid) {
      console.log('✅ Provider signature verified');
      return true;
    } else {
      console.warn('⚠️ Provider signature verification failed');
      return false;
    }
  } catch (error) {
    console.error('Error verifying signature:', error);
    throw error;
  }
}

// Usage examples
getArweavePrice().then(console.log);
getMultiplePrices().then(console.log);
getHistoricalPrice('2021-11-05T00:00:00').then(console.log);
`
  },
  
  features: {
    permanentStorage: true,
    arweaveIntegration: true,
    multiAsset: true,
    historicalData: true,
    signatureVerification: true,
    highFrequency: true,
    crossChain: true,
    pullModel: true,
    pushModel: false,
  },
  
  supportedAssets: [
    'AR', 'BTC', 'ETH', 'SOL', 'AVAX', 'MATIC', 'BNB', 'ADA', 'DOT', 'LINK',
    'UNI', 'AAVE', 'ATOM', 'ALGO', 'XRP', 'DOGE', 'SHIB', 'LTC', 'BCH', 'ETC',
    // Plus 1000+ more assets
  ],
  
  arweaveStorage: {
    description: "All RedStone price feed data is permanently stored on Arweave",
    verification: "Data can be verified by checking the permawebTx in each price response",
    gateway: "https://redstone.arweave.dev",
    benefits: [
      "Immutable historical record",
      "Cost-effective long-term storage",
      "Verifiable data provenance",
      "Transparent provider performance tracking"
    ],
  },
  
  smartContractIntegration: {
    smartweave: {
      description: "RedStone can be integrated with SmartWeave contracts on Arweave",
      package: "redstone-smartweave",
      documentation: "https://docs.redstone.finance/docs/smart-contract-devs/oracle-data-feeds/arweave",
    },
    warp: {
      description: "Warp Contracts integration for Arweave smart contracts",
      package: "warp-contracts",
      documentation: "https://docs.redstone.finance/docs/smart-contract-devs/oracle-data-feeds/arweave",
    },
  },
  
  providers: {
    description: "Multiple data providers with collateral backing",
    verification: "Provider signatures can be verified for trusted data",
    transparency: "Provider performance tracked on Arweave",
  },
  
  useCases: [
    "DeFi price feeds for Arweave-based applications",
    "Historical price data analysis with permanent storage",
    "Cross-chain oracle data with Arweave as source of truth",
    "Verifiable price feeds for lending protocols",
    "NFT pricing and valuation",
    "Token swap price discovery",
  ],
  
  notes: [
    "RedStone stores all data permanently on Arweave for verifiability",
    "Data can be fetched directly from Arweave storage (bypass cache)",
    "Supports 1000+ assets with high-frequency updates",
    "Provider signatures can be verified for trusted data",
    "Historical data is permanently accessible on the Permaweb",
    "Integration available for SmartWeave and Warp Contracts",
    "Cross-chain compatible while using Arweave as storage layer",
    "Free tier available with rate limits, premium tiers for higher throughput",
  ],
};
