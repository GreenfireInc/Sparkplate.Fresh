// Band Protocol Oracle - Native Cosmos SDK Oracle
// Type: Decentralized Cross-Chain Oracle
// Blockchain: Cosmos (ATOM)

export const bandProtocolOracleATOM = {
  name: "Band Protocol",
  blockchain: "Cosmos (ATOM)",
  type: "Native Cosmos SDK Decentralized Oracle",
  description: "Leading decentralized oracle solution built on Cosmos SDK, providing secure, reliable, and customizable price feeds and real-world data. Fully integrated with Cosmos IBC (Inter-Blockchain Communication) for cross-chain data feeds across the entire Cosmos ecosystem.",
  
  url: "https://bandprotocol.com/",
  bandChainUrl: "https://www.bandchain.org/",
  docs: "https://docs.bandchain.org/",
  
  api: {
    grpcMainnet: "https://laozi-mainnet3.bandchain.org/grpc-web",
    grpcTestnet: "https://laozi-testnet4.bandchain.org/grpc-web",
    restApi: "https://api.bandchain.org",
    standardDataset: "https://data.bandprotocol.com/",
    documentation: "https://docs.bandchain.org/",
    standardDatasetScriptId: 1, // Oracle Script ID for price feeds
  },
  
  sdk: {
    npm: "@bandprotocol/bandchain.js",
    installation: "npm install @bandprotocol/bandchain.js @cosmjs/stargate @cosmjs/proto-signing",
    documentation: "https://docs.bandchain.org/",
    github: "https://github.com/bandprotocol/bandchain.js",
    cosmosIntegration: "@cosmjs/stargate",
  },
  
  integration: {
    example: `
// Band Protocol Oracle Integration for Cosmos
import { Client, Wallet, Obi, Message } from '@bandprotocol/bandchain.js';
import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';
import { coins } from '@cosmjs/stargate';
import axios from 'axios';

const BAND_GRPC_MAINNET = 'https://laozi-mainnet3.bandchain.org/grpc-web';
const BAND_GRPC_TESTNET = 'https://laozi-testnet4.bandchain.org/grpc-web';
const BAND_REST_API = 'https://api.bandchain.org';

class BandProtocolOracle {
  private client: Client;
  private endpoint: string;

  constructor(endpoint: string = BAND_GRPC_MAINNET) {
    this.endpoint = endpoint;
    this.client = new Client(endpoint);
  }

  // Method 1: Get reference data (price feeds)
  async getReferenceData(
    symbols: string[],
    minCount: number = 4,
    askCount: number = 4
  ): Promise<any> {
    try {
      const oracleScriptId = 1; // Standard price reference script
      
      const result = await this.client.getReferenceData(
        symbols,
        minCount,
        askCount,
        oracleScriptId
      );

      return result;
    } catch (error) {
      console.error('Error fetching Band Protocol data:', error);
      throw error;
    }
  }

  // Method 2: Get specific token price
  async getTokenPrice(base: string, quote: string = 'USD'): Promise<number> {
    try {
      const pair = \`\${base}/\${quote}\`;
      const result = await this.getReferenceData([pair]);
      
      if (!result[pair] || !result[pair].rate) {
        throw new Error(\`No price data available for \${pair}\`);
      }

      return result[pair].rate;
    } catch (error) {
      console.error('Error fetching token price:', error);
      throw error;
    }
  }

  // Method 3: Get multiple prices
  async getMultiplePrices(pairs: string[]): Promise<{[key: string]: number}> {
    try {
      const result = await this.getReferenceData(pairs);
      const prices: {[key: string]: number} = {};

      pairs.forEach(pair => {
        if (result[pair] && result[pair].rate) {
          prices[pair] = result[pair].rate;
        } else {
          prices[pair] = 0;
        }
      });

      return prices;
    } catch (error) {
      console.error('Error fetching multiple prices:', error);
      throw error;
    }
  }

  // Method 4: Get detailed price information
  async getDetailedPriceData(pair: string): Promise<{
    rate: number;
    lastUpdated: Date;
    confidence: number;
    multiplier: number;
  }> {
    try {
      const result = await this.getReferenceData([pair]);
      
      if (!result[pair]) {
        throw new Error(\`No data available for \${pair}\`);
      }

      const data = result[pair];
      
      return {
        rate: data.rate,
        lastUpdated: new Date(data.lastUpdated * 1000),
        confidence: data.confidence,
        multiplier: data.multiplier
      };
    } catch (error) {
      console.error('Error fetching detailed price data:', error);
      throw error;
    }
  }

  // Method 5: Get price via REST API (alternative method)
  async getPriceViaREST(symbol: string): Promise<number> {
    try {
      const response = await axios.get(
        \`\${BAND_REST_API}/oracle/request_prices?symbols=\${symbol}\`
      );
      return response.data[symbol].price;
    } catch (error) {
      console.error('Error fetching price via REST:', error);
      throw error;
    }
  }

  // Method 6: Request custom oracle data
  async requestCustomData(
    oracleScriptId: number,
    calldata: Uint8Array,
    askCount: number = 16,
    minCount: number = 10,
    clientId: string = 'cosmos_oracle'
  ): Promise<any> {
    try {
      // This requires a wallet for signing
      // Simplified example - actual implementation needs wallet setup
      console.log('Requesting custom oracle data...');
      console.log('Oracle Script ID:', oracleScriptId);
      console.log('Ask Count:', askCount);
      console.log('Min Count:', minCount);
      
      // In production, you would:
      // 1. Create and sign a request transaction
      // 2. Broadcast to BandChain
      // 3. Wait for oracle response
      // 4. Parse and return result
      
      return {
        status: 'success',
        message: 'Custom oracle request would be submitted here'
      };
    } catch (error) {
      console.error('Error requesting custom oracle data:', error);
      throw error;
    }
  }
}

// Usage examples
async function main() {
  const oracle = new BandProtocolOracle();
  
  // Get ATOM price
  const atomPrice = await oracle.getTokenPrice('ATOM', 'USD');
  console.log('ATOM/USD Price:', atomPrice);
  
  // Get multiple prices
  const pairs = ['ATOM/USD', 'OSMO/USD', 'INJ/USD'];
  const multiplePrices = await oracle.getMultiplePrices(pairs);
  console.log('Multiple Prices:', multiplePrices);
  
  // Get detailed data
  const detailedAtom = await oracle.getDetailedPriceData('ATOM/USD');
  console.log('Detailed ATOM Data:', {
    price: detailedAtom.rate,
    confidence: detailedAtom.confidence,
    lastUpdated: detailedAtom.lastUpdated.toISOString()
  });
}

// main();
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/BandProtocol",
    telegram: "https://t.me/bandprotocol",
    discord: "https://discord.com/invite/3t4bsY7",
    github: "https://github.com/bandprotocol",
    medium: "https://medium.com/bandprotocol",
  },
  
  features: {
    nativeCosmos: true,
    ibcIntegrated: true,
    decentralized: true,
    customizable: true,
    crossChain: true,
    validatorNetwork: true,
    dataAggregation: true,
    realTime: true,
  },
  
  supportedData: [
    "Cryptocurrency prices (ATOM, OSMO, all major assets)",
    "Foreign exchange rates",
    "Commodity prices",
    "Stock market data",
    "Sports data",
    "Weather data",
    "Custom oracle scripts",
    "Real-world API data",
  ],
  
  dataAggregation: {
    validators: "100+ validators worldwide",
    updateFrequency: "Real-time to minutes (configurable)",
    dataQuality: "Multi-source aggregation with outlier detection",
    consensus: "Weighted median from validator responses",
    customization: "Configurable ask_count and min_count parameters",
  },
  
  cosmosIntegration: {
    method: "Native Cosmos SDK chain with IBC support",
    chainId: {
      mainnet: "band-laozi-mainnet2",
      testnet: "band-laozi-testnet6",
    },
    ibc: "Fully integrated Inter-Blockchain Communication",
    benefits: [
      "Built on Cosmos SDK for native integration",
      "IBC-enabled for cross-chain data feeds",
      "Optimized for Cosmos ecosystem",
      "Direct integration with all Cosmos chains",
      "No bridge dependencies",
    ],
    bestFor: [
      "Cosmos ecosystem DeFi protocols",
      "Cross-chain applications via IBC",
      "Interchain lending and borrowing",
      "Cross-chain stablecoins",
      "Multi-chain governance",
    ],
  },
  
  notes: [
    "Native Cosmos SDK oracle solution",
    "Mainnet launched in 2020",
    "100+ validators worldwide",
    "Fully integrated with IBC for cross-chain data",
    "Standard Dataset Oracle Script ID: 1",
    "Customizable oracle scripts for specialized use cases",
    "Real-time and historical data access",
    "Multi-source aggregation with outlier detection",
    "Weighted median consensus mechanism",
    "Enterprise-grade oracle solutions available",
  ],
  
  useCases: [
    "Interchain DeFi (lending, borrowing, trading)",
    "IBC cross-chain transfers with price data",
    "Cross-chain stablecoins",
    "Interchain governance",
    "Cross-chain insurance protocols",
    "Gaming and NFT applications",
    "Prediction markets",
    "Supply chain tracking",
  ],
  
  chainConfigs: {
    cosmosHub: {
      rpc: "https://rpc.cosmos.network",
      rest: "https://api.cosmos.network",
      chainId: "cosmoshub-4",
      prefix: "cosmos",
    },
    osmosis: {
      rpc: "https://rpc.osmosis.zone",
      rest: "https://api.osmosis.zone",
      chainId: "osmosis-1",
      prefix: "osmo",
    },
    bandChain: {
      rpc: "https://rpc-laozi-testnet6.bandchain.org",
      rest: "https://api-laozi-testnet6.bandchain.org",
      chainId: "band-laozi-testnet6",
      prefix: "band",
    },
  },
  
  oracleScriptIds: {
    cryptoPrice: 1,
    forexPrice: 2,
    customData: 100, // Custom oracle scripts start at 100+
  },
  
  resources: {
    mainWebsite: "https://bandprotocol.com/",
    bandChain: "https://www.bandchain.org/",
    documentation: "https://docs.bandchain.org/",
    standardDataset: "https://data.bandprotocol.com/",
    github: "https://github.com/bandprotocol",
    cosmosIntegrationGuide: "https://blog.cosmos.network/guide-to-building-defi-using-band-protocol-oracle-and-cosmos-ibc-fa5348832f84",
    ibcIntegration: "https://blog.cosmos.network/defi-oracle-band-protocol-boosts-interoperability-within-the-cosmos-ecosystem-e65f655fafd5",
  },
  
  pricing: {
    tier: "Freemium model",
    publicApi: "Free with rate limits",
    enterpriseApi: "Custom pricing for high-volume usage",
    customOracles: "Custom pricing for dedicated oracle scripts",
  },
};

