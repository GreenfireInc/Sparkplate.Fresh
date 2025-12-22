// Band Protocol Oracle - Cross-Chain Decentralized Oracle for BNB Chain
// Type: Cross-Chain Push Oracle
// Blockchain: BNB Chain (BNB)

export const bnbBandProtocolOracle = {
  name: "Band Protocol",
  blockchain: "BNB Chain (BNB)",
  type: "Cross-Chain Decentralized Oracle",
  description: "Band Protocol is a cross-chain decentralized oracle platform well-integrated with BNB Chain via IBC. Built on Cosmos SDK, it provides secure, customizable price feeds and custom data oracles with 175+ crypto pairs, 40 FX pairs, and VRF randomness.",
  
  url: "https://bandprotocol.com/",
  docs: "https://docs.bandchain.org/",
  
  api: {
    documentation: "https://docs.bandchain.org/",
    standardDataset: "https://data.bandprotocol.com/",
    bnbIntegration: "https://docs.bandchain.org/standard-dataset/using-band-standard-dataset/evm-smart-contract",
    supportedBlockchains: "https://docs.bandchain.org/band-standard-dataset/supported-blockchains.html",
  },
  
  sdk: {
    npm: "@bandprotocol/bandchain.js",
    installation: "npm install @bandprotocol/bandchain.js",
    github: "https://github.com/bandprotocol/bandchain.js",
    documentation: "https://docs.bandchain.org/",
  },
  
  integration: {
    example: `
// Band Protocol Oracle Integration for BNB Chain
import { Client } from '@bandprotocol/bandchain.js';
import { ethers } from 'ethers';

// Band Standard Reference ABI for BNB Chain
const BAND_REFERENCE_ABI = [
  'function getReferenceData(string memory _base, string memory _quote) public view returns (uint256 rate, uint256 lastUpdatedBase, uint256 lastUpdatedQuote)',
  'function getRefere

nceDataBulk(string[] memory _bases, string[] memory _quotes) public view returns (uint256[] memory rates, uint256[] memory lastUpdatedBases, uint256[] memory lastUpdatedQuotes)'
];

class BandProtocolBNBOracle {
  private provider: ethers.providers.Provider;
  private bandClient: Client;
  
  // Band Standard Reference contract on BNB Chain
  private readonly BAND_REFERENCE_ADDRESS = '0xDA7a001b254CD22e46d3eAB04d937489c93174C3'; // BNB Mainnet

  constructor(rpcUrl: string = 'https://bsc-dataseed.binance.org/') {
    this.provider = new ethers.providers.JsonRpcProvider(rpcUrl);
    this.bandClient = new Client('https://laozi-testnet6.bandchain.org/grpc-web');
  }

  // Method 1: Get reference data on-chain (BNB Chain)
  async getReferenceData(base: string, quote: string = 'USD'): Promise<{
    rate: number;
    lastUpdatedBase: Date;
    lastUpdatedQuote: Date;
  }> {
    try {
      const contract = new ethers.Contract(
        this.BAND_REFERENCE_ADDRESS,
        BAND_REFERENCE_ABI,
        this.provider
      );

      const result = await contract.getReferenceData(base, quote);
      
      return {
        rate: parseFloat(ethers.utils.formatUnits(result.rate, 18)),
        lastUpdatedBase: new Date(result.lastUpdatedBase.toNumber() * 1000),
        lastUpdatedQuote: new Date(result.lastUpdatedQuote.toNumber() * 1000)
      };
    } catch (error) {
      console.error(\`Error fetching Band reference data for \${base}/\${quote}:\`, error);
      throw error;
    }
  }

  // Method 2: Get bulk reference data
  async getReferenceDataBulk(
    bases: string[],
    quotes: string[]
  ): Promise<Array<{ base: string; quote: string; rate: number }>> {
    try {
      if (bases.length !== quotes.length) {
        throw new Error('Bases and quotes arrays must have same length');
      }

      const contract = new ethers.Contract(
        this.BAND_REFERENCE_ADDRESS,
        BAND_REFERENCE_ABI,
        this.provider
      );

      const result = await contract.getReferenceDataBulk(bases, quotes);
      
      return bases.map((base, index) => ({
        base,
        quote: quotes[index],
        rate: parseFloat(ethers.utils.formatUnits(result.rates[index], 18))
      }));
    } catch (error) {
      console.error('Error fetching bulk reference data:', error);
      throw error;
    }
  }

  // Method 3: Get token price via BandChain client
  async getTokenPrice(symbol: string, quote: string = 'USD'): Promise<{
    rate: number;
    lastUpdated: Date;
  }> {
    try {
      const pair = \`\${symbol}/\${quote}\`;
      const result = await this.bandClient.getReferenceData([pair]);
      
      if (!result[pair] || !result[pair].rate) {
        throw new Error(\`No price data available for \${pair}\`);
      }

      return {
        rate: result[pair].rate,
        lastUpdated: new Date(result[pair].lastUpdated * 1000)
      };
    } catch (error) {
      console.error(\`Error fetching token price for \${symbol}:\`, error);
      throw error;
    }
  }

  // Method 4: Get multiple token prices
  async getMultiplePrices(symbols: string[], quote: string = 'USD'): Promise<{
    [key: string]: number;
  }> {
    const prices: { [key: string]: number } = {};

    for (const symbol of symbols) {
      try {
        const priceData = await this.getReferenceData(symbol, quote);
        prices[\`\${symbol}/\${quote}\`] = priceData.rate;
      } catch (error) {
        console.error(\`Error fetching price for \${symbol}:\`, error);
        prices[\`\${symbol}/\${quote}\`] = 0;
      }
    }

    return prices;
  }

  // Method 5: Get detailed price information
  async getDetailedPriceData(base: string, quote: string = 'USD'): Promise<{
    pair: string;
    rate: number;
    baseLastUpdated: Date;
    quoteLastUpdated: Date;
    staleness: number;
  }> {
    try {
      const data = await this.getReferenceData(base, quote);
      const now = Date.now();
      const baseAge = now - data.lastUpdatedBase.getTime();
      const quoteAge = now - data.lastUpdatedQuote.getTime();
      const staleness = Math.max(baseAge, quoteAge) / 1000; // in seconds

      return {
        pair: \`\${base}/\${quote}\`,
        rate: data.rate,
        baseLastUpdated: data.lastUpdatedBase,
        quoteLastUpdated: data.lastUpdatedQuote,
        staleness
      };
    } catch (error) {
      console.error('Error fetching detailed price data:', error);
      throw error;
    }
  }
}

// Usage examples
async function main() {
  const oracle = new BandProtocolBNBOracle();

  // Get BNB/USD price
  const bnbPrice = await oracle.getReferenceData('BNB', 'USD');
  console.log(\`BNB/USD Rate: \${bnbPrice.rate}\`);
  console.log(\`Last Updated: \${bnbPrice.lastUpdatedBase.toISOString()}\`);

  // Get multiple prices
  const prices = await oracle.getMultiplePrices(['BNB', 'BTC', 'ETH'], 'USD');
  console.log('Multiple Prices:', prices);

  // Get bulk data
  const bulkData = await oracle.getReferenceDataBulk(
    ['BNB', 'BTC', 'ETH'],
    ['USD', 'USD', 'USD']
  );
  console.log('Bulk Data:', bulkData);

  // Get detailed price data
  const detailed = await oracle.getDetailedPriceData('BNB', 'USD');
  console.log('Detailed Data:', detailed);
  console.log(\`Staleness: \${detailed.staleness} seconds\`);
}

// main();
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/BandProtocol",
    telegram: "https://t.me/bandprotocol",
    discord: "https://discord.com/invite/3t4bsY7",
    github: "https://github.com/bandprotocol",
  },
  
  features: {
    crossChain: true,
    ibcIntegration: true,
    cosmosSDK: true,
    customOracles: true,
    priceFeeds: true,
    vrfRandomness: true,
    decentralized: true,
    scalable: true,
  },
  
  supportedData: [
    "175+ cryptocurrency price pairs",
    "40 forex pairs",
    "Commodity prices",
    "VRF randomness",
    "Custom data requests",
    "Sports data",
    "Weather data",
  ],
  
  bnbChainIntegration: {
    status: "Fully integrated via IBC",
    method: "On-chain reference contracts + IBC relayers",
    referenceContract: "0xDA7a001b254CD22e46d3eAB04d937489c93174C3",
    benefits: [
      "Cross-chain compatibility via IBC",
      "Cosmos-based architecture for scalability",
      "100+ validators securing data",
      "Custom data request capability",
      "175+ crypto pairs supported",
      "Transparent and auditable",
      "Low-cost data feeds",
      "Community-driven governance",
    ],
    bestFor: [
      "Cross-chain applications",
      "Custom data requirements",
      "Applications needing transparent sourcing",
      "Multi-blockchain dApps",
      "DeFi protocols with exotic pairs",
    ],
  },
  
  notes: [
    "Built on Cosmos SDK with IBC support",
    "Fully integrated with BNB Chain",
    "100+ validators securing oracle network",
    "175+ crypto pairs + 40 FX pairs",
    "Custom oracle script capability",
    "VRF randomness available",
    "Reference contract deployed on BNB Chain",
    "Community-driven and transparent",
    "Lower cost than some alternatives",
    "Good for cross-chain applications",
  ],
  
  useCases: [
    "Cross-chain DeFi protocols",
    "Exotic pair price feeds",
    "Custom data oracles",
    "Multi-blockchain applications",
    "Prediction markets",
    "Gaming with VRF",
    "Forex trading platforms",
    "Commodity-backed tokens",
  ],
  
  technicalDetails: {
    consensus: "BandChain validators",
    updateFrequency: "Based on deviation threshold",
    decentralization: "100+ independent validators",
    dataAggregation: "Median of validator responses",
    crossChain: "IBC relayers",
    sdkLanguages: ["TypeScript", "JavaScript", "Python", "Go"],
  },
  
  resources: {
    mainWebsite: "https://bandprotocol.com/",
    documentation: "https://docs.bandchain.org/",
    standardDataset: "https://data.bandprotocol.com/",
    github: "https://github.com/bandprotocol",
    blog: "https://blog.bandprotocol.com/",
    explorer: "https://cosmoscan.io/",
  },
};

