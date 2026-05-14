// Binance Oracle - Native High-Performance Oracle for BNB Chain
// Type: Native Push Oracle
// Blockchain: BNB Chain (BNB)

export const bnbBinanceOracle = {
  name: "Binance Oracle",
  blockchain: "BNB Chain (BNB)",
  type: "Native High-Performance Push Oracle",
  description: "Binance Oracle is a native, high-performance oracle solution designed specifically for BNB Chain. It leverages Binance's infrastructure for speed and reliability, providing real-time price feeds optimized for BNB Chain's 3-second block time with MPC security.",
  
  url: "https://oracle.binance.com/",
  docs: "https://oracle.binance.com/docs/",
  
  api: {
    gettingStarted: "https://oracle.binance.com/docs/getting-started/",
    priceFeeds: "https://oracle.binance.com/docs/price-feeds/",
    integration: "https://oracle.binance.com/docs/integration/",
    starterRepo: "https://github.com/bnb-chain/binance-oracle-starter",
  },
  
  sdk: {
    npm: "ethers",
    installation: "npm install ethers",
    starterRepo: "https://github.com/bnb-chain/binance-oracle-starter",
    documentation: "https://oracle.binance.com/docs/",
  },
  
  integration: {
    example: `
// Binance Oracle Integration for BNB Chain
import { ethers } from 'ethers';

// Simplified Binance Oracle ABI
const BINANCE_ORACLE_ABI = [
  'function getLatestPrice(string calldata symbol) external view returns (uint256 price, uint256 timestamp)',
  'function getPriceData(string calldata symbol) external view returns (uint256 price, uint256 decimals, uint256 timestamp)',
  'function getSupportedSymbols() external view returns (string[] memory)'
];

class BinanceOracleIntegration {
  private provider: ethers.providers.Provider;
  private oracleAddress: string;

  // Binance Oracle contract address (verify from official docs)
  private readonly ORACLE_ADDRESS = '0x...'; // Replace with actual address

  constructor(rpcUrl: string = 'https://bsc-dataseed.binance.org/') {
    this.provider = new ethers.providers.JsonRpcProvider(rpcUrl);
    this.oracleAddress = this.ORACLE_ADDRESS;
  }

  // Method 1: Get latest price for a symbol
  async getLatestPrice(symbol: string): Promise<{
    price: number;
    timestamp: number;
  }> {
    try {
      const contract = new ethers.Contract(
        this.oracleAddress,
        BINANCE_ORACLE_ABI,
        this.provider
      );

      const [price, timestamp] = await contract.getLatestPrice(symbol);
      
      return {
        price: parseFloat(ethers.utils.formatUnits(price, 8)), // Usually 8 decimals
        timestamp: timestamp.toNumber()
      };
    } catch (error) {
      console.error(\`Error fetching price for \${symbol}:\`, error);
      throw error;
    }
  }

  // Method 2: Get detailed price data
  async getPriceData(symbol: string): Promise<{
    price: number;
    decimals: number;
    timestamp: Date;
  }> {
    try {
      const contract = new ethers.Contract(
        this.oracleAddress,
        BINANCE_ORACLE_ABI,
        this.provider
      );

      const [price, decimals, timestamp] = await contract.getPriceData(symbol);
      
      return {
        price: parseFloat(ethers.utils.formatUnits(price, decimals)),
        decimals: decimals.toNumber(),
        timestamp: new Date(timestamp.toNumber() * 1000)
      };
    } catch (error) {
      console.error(\`Error fetching price data for \${symbol}:\`, error);
      throw error;
    }
  }

  // Method 3: Get multiple prices
  async getMultiplePrices(symbols: string[]): Promise<{
    [key: string]: number;
  }> {
    const prices: { [key: string]: number } = {};

    for (const symbol of symbols) {
      try {
        const priceData = await this.getLatestPrice(symbol);
        prices[symbol] = priceData.price;
      } catch (error) {
        console.error(\`Error fetching price for \${symbol}:\`, error);
        prices[symbol] = 0;
      }
    }

    return prices;
  }

  // Method 4: Get supported symbols
  async getSupportedSymbols(): Promise<string[]> {
    try {
      const contract = new ethers.Contract(
        this.oracleAddress,
        BINANCE_ORACLE_ABI,
        this.provider
      );

      return await contract.getSupportedSymbols();
    } catch (error) {
      console.error('Error fetching supported symbols:', error);
      throw error;
    }
  }

  // Method 5: Check price freshness
  async isPriceFresh(symbol: string, maxAgeSeconds: number = 60): Promise<boolean> {
    try {
      const priceData = await this.getLatestPrice(symbol);
      const now = Math.floor(Date.now() / 1000);
      return (now - priceData.timestamp) < maxAgeSeconds;
    } catch (error) {
      console.error('Error checking price freshness:', error);
      return false;
    }
  }
}

// Usage examples
async function main() {
  const oracle = new BinanceOracleIntegration();

  // Get BNB/USD price
  const bnbPrice = await oracle.getLatestPrice('BNBUSD');
  console.log(\`BNB/USD Price: $\${bnbPrice.price}\`);
  console.log(\`Timestamp: \${new Date(bnbPrice.timestamp * 1000).toISOString()}\`);

  // Get multiple prices
  const prices = await oracle.getMultiplePrices(['BNBUSD', 'BTCUSD', 'ETHUSD']);
  console.log('Multiple Prices:', prices);

  // Get supported symbols
  const symbols = await oracle.getSupportedSymbols();
  console.log('Supported Symbols:', symbols);

  // Check if price is fresh
  const isFresh = await oracle.isPriceFresh('BNBUSD', 60);
  console.log('Price is fresh (< 1 min):', isFresh);
}

// main();
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/BinanceChain",
    telegram: "https://t.me/BinanceDEXchange",
    github: "https://github.com/bnb-chain",
    blog: "https://www.binance.com/en/blog/",
  },
  
  features: {
    nativeBNBChain: true,
    highPerformance: true,
    lowLatency: true,
    binanceInfrastructure: true,
    mpcSecurity: true,
    whitelabledProviders: true,
    pushOracle: true,
    vrfPlanned: true,
  },
  
  supportedData: [
    "40+ cryptocurrency price feeds",
    "BNB, BTC, ETH, and major altcoins",
    "Real-time price updates",
    "VRF randomness (planned)",
    "Custom data feeds on request",
  ],
  
  bnbChainIntegration: {
    status: "Active since 2022",
    method: "On-chain smart contracts optimized for BNB Chain",
    updateTriggers: ["Deviation threshold", "Heartbeat interval"],
    benefits: [
      "Native to BNB Chain for optimal performance",
      "Leverages Binance's trading infrastructure",
      "Extremely low latency (~3 seconds)",
      "MPC (Multi-Party Computation) security",
      "Optimized for BNB Chain's 3-second block time",
      "Whitelabeled data providers for reliability",
      "Lower gas costs than external oracles",
      "Beta testnet integrations available",
    ],
    bestFor: [
      "High-frequency trading applications",
      "Low-latency DeFi protocols",
      "Applications requiring sub-second updates",
      "BNB Chain-native dApps",
      "Trading bots and arbitrage",
    ],
  },
  
  notes: [
    "Native oracle solution by Binance",
    "Launched in 2022 for BNB Chain ecosystem",
    "Optimized for speed and reliability",
    "Uses MPC for enhanced security",
    "Push model with deviation/heartbeat triggers",
    "40+ crypto price feeds available",
    "VRF randomness in development",
    "Beta testnet integrations ongoing",
    "Complements Chainlink for specialized use cases",
    "Official starter repo available on GitHub",
  ],
  
  useCases: [
    "High-frequency DeFi trading",
    "Arbitrage bots",
    "Low-latency price feeds",
    "Native BNB Chain applications",
    "Real-time derivatives pricing",
    "Automated market makers",
    "Liquidation systems",
  ],
  
  technicalDetails: {
    updateFrequency: "Sub-second to 3-second (based on deviation/heartbeat)",
    securityModel: "MPC + whitelabeled providers",
    optimization: "Native BNB Chain integration",
    decimals: "Typically 8 decimals",
    gasEfficiency: "Optimized for BNB Chain",
  },
  
  resources: {
    mainWebsite: "https://oracle.binance.com/",
    documentation: "https://oracle.binance.com/docs/",
    gettingStarted: "https://oracle.binance.com/docs/getting-started/",
    starterRepo: "https://github.com/bnb-chain/binance-oracle-starter",
    bnbChainDocs: "https://docs.bnbchain.org/",
  },
};

