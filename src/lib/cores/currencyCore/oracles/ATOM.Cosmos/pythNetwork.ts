// Pyth Network Oracle - High-Fidelity Cross-Chain Oracle for Cosmos
// Type: Pull-Model Price Oracle
// Blockchain: Cosmos (ATOM)

export const pythNetworkOracleATOM = {
  name: "Pyth Network",
  blockchain: "Cosmos (ATOM)",
  type: "High-Fidelity Pull-Model Price Oracle",
  description: "High-frequency, low-latency price feeds from 90+ first-party publishers. Expanded to Cosmos via IBC and Wormhole, providing sub-second updates with pull oracle model ideal for sophisticated DeFi protocols.",
  
  url: "https://pyth.network/",
  cosmosDocs: "https://docs.pyth.network/documentation/pythnet-price-feeds/cosmos",
  docs: "https://docs.pyth.network/",
  
  api: {
    hermesEndpoint: "https://hermes.pyth.network",
    priceFeedIds: "https://pyth.network/developers/price-feed-ids/",
    documentation: "https://docs.pyth.network/documentation/pythnet-price-feeds/cosmos",
    supportedChains: ["Osmosis", "Injective", "Cronos", "Kava", "Evmos"],
  },
  
  sdk: {
    npm: "@pythnetwork/client",
    hermesClient: "@pythnetwork/hermes-client",
    installation: "npm install @pythnetwork/client @pythnetwork/hermes-client @cosmjs/stargate",
    documentation: "https://docs.pyth.network/",
    github: "https://github.com/pyth-network",
  },
  
  integration: {
    example: `
// Pyth Network Oracle Integration for Cosmos
import { HermesPriceServiceConnection } from '@pythnetwork/hermes-client';
import { PriceServiceConnection } from '@pythnetwork/client';
import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate';

const HERMES_ENDPOINT = 'https://hermes.pyth.network';

// Pyth price feed IDs (verify from Pyth documentation)
const PRICE_FEED_IDS = {
  ATOM_USD: 'b00b60f88b03a6a625a8d1c048c3f66653edf217439983d037e7222c4e612819',
  OSMO_USD: '5867f5683c757393a0670ef0f701490950fe93fdb006d181c8265a831ac0c5c6',
  INJ_USD: '7a5bc1d2b56ad029048cd63964b3ad2776eadf812edc1a43a31406cb54bff592',
};

class PythCosmosOracle {
  private connection: HermesPriceServiceConnection;

  constructor() {
    this.connection = new HermesPriceServiceConnection(HERMES_ENDPOINT, {
      priceFeedRequestConfig: {
        binary: true,
      },
    });
  }

  // Method 1: Get price from Pyth (off-chain via Hermes)
  async getPythPrice(priceFeedId: string): Promise<{
    price: number;
    confidence: number;
    exponent: number;
    publishTime: number;
  }> {
    try {
      const priceFeed = await this.connection.getPriceFeed(priceFeedId);

      if (priceFeed) {
        const priceData = priceFeed.getPriceUnchecked();
        const exponent = priceFeed.metadata.priceExponent;
        
        // Normalize price based on exponent
        const normalizedPrice = Number(priceData.price) * Math.pow(10, exponent);
        const normalizedConfidence = Number(priceData.conf) * Math.pow(10, exponent);

        return {
          price: normalizedPrice,
          confidence: normalizedConfidence,
          exponent,
          publishTime: priceData.publishTime
        };
      }

      throw new Error('Price feed not found');
    } catch (error) {
      console.error('Error fetching Pyth price:', error);
      throw error;
    }
  }

  // Method 2: Get multiple price feeds
  async getMultiplePythPrices(priceFeedIds: string[]): Promise<{
    [key: string]: {
      price: number;
      confidence: number;
      publishTime: number;
    }
  }> {
    const prices: any = {};

    for (const feedId of priceFeedIds) {
      try {
        const priceData = await this.getPythPrice(feedId);
        prices[feedId] = {
          price: priceData.price,
          confidence: priceData.confidence,
          publishTime: priceData.publishTime
        };
      } catch (error) {
        console.error(\`Error fetching price for \${feedId}:\`, error);
        prices[feedId] = null;
      }
    }

    return prices;
  }

  // Method 3: Get price with freshness check
  async getFreshPrice(
    priceFeedId: string,
    maxAgeSeconds: number = 60
  ): Promise<number | null> {
    try {
      const priceData = await this.getPythPrice(priceFeedId);
      const now = Math.floor(Date.now() / 1000);
      
      // Check if price is fresh
      if (now - priceData.publishTime < maxAgeSeconds) {
        return priceData.price;
      }
      
      console.warn(\`Price is stale: \${now - priceData.publishTime}s old\`);
      return null;
    } catch (error) {
      console.error('Error fetching fresh price:', error);
      return null;
    }
  }

  // Method 4: Get ATOM price specifically
  async getAtomPrice(): Promise<{
    price: number;
    confidence: number;
    confidenceInterval: { lower: number; upper: number };
    publishTime: Date;
  }> {
    try {
      const priceData = await this.getPythPrice(PRICE_FEED_IDS.ATOM_USD);
      
      return {
        price: priceData.price,
        confidence: priceData.confidence,
        confidenceInterval: {
          lower: priceData.price - priceData.confidence,
          upper: priceData.price + priceData.confidence
        },
        publishTime: new Date(priceData.publishTime * 1000)
      };
    } catch (error) {
      console.error('Error fetching ATOM price:', error);
      throw error;
    }
  }
}

// Method 5: On-chain integration via CosmWasm contract (Osmosis example)
class PythCosmWasmOracle {
  private client: CosmWasmClient;
  private pythContract: string;

  constructor(rpcEndpoint: string, pythContractAddress: string) {
    this.pythContract = pythContractAddress;
  }

  async connect(rpcEndpoint: string): Promise<void> {
    this.client = await CosmWasmClient.connect(rpcEndpoint);
  }

  // Query Pyth contract on-chain
  async getPriceFromContract(priceFeedId: string): Promise<any> {
    try {
      const queryMsg = {
        price_feed: {
          id: priceFeedId
        }
      };

      const result: any = await this.client.queryContractSmart(
        this.pythContract,
        queryMsg
      );

      // Normalize price based on exponent
      const normalizedPrice = result.price * Math.pow(10, result.exponent);

      return {
        price: normalizedPrice,
        confidence: result.confidence * Math.pow(10, result.exponent),
        exponent: result.exponent,
        publishTime: result.publish_time
      };
    } catch (error) {
      console.error('Error querying Pyth contract:', error);
      throw error;
    }
  }
}

// Usage examples
async function main() {
  const oracle = new PythCosmosOracle();
  
  // Get ATOM price
  const atomPrice = await oracle.getAtomPrice();
  console.log('ATOM Price:', atomPrice.price);
  console.log('Confidence Interval:', atomPrice.confidenceInterval);
  console.log('Publish Time:', atomPrice.publishTime);
  
  // Get multiple prices
  const prices = await oracle.getMultiplePythPrices([
    PRICE_FEED_IDS.ATOM_USD,
    PRICE_FEED_IDS.OSMO_USD,
  ]);
  console.log('Multiple Prices:', prices);
}

// main();
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/PythNetwork",
    discord: "https://discord.com/invite/pythnetwork",
    telegram: "https://t.me/PythNetwork",
    github: "https://github.com/pyth-network",
  },
  
  features: {
    pullModel: true,
    highFrequency: true,
    lowLatency: true,
    cryptographicProofs: true,
    subSecondUpdates: true,
    confidenceIntervals: true,
    firstPartyData: true,
    crossChain: true,
  },
  
  supportedData: [
    "500+ cryptocurrency prices",
    "Equities",
    "Commodities",
    "Foreign exchange rates",
    "Real-time financial market data",
  ],
  
  dataProviders: {
    count: "90+ first-party data publishers",
    sources: "Major trading firms and exchanges",
    updateFrequency: "Sub-second (typically 400ms)",
    dataQuality: "Professional-grade market data",
  },
  
  cosmosIntegration: {
    method: "Pull oracle model via Wormhole and IBC",
    supportedChains: ["Osmosis", "Injective", "Cronos", "Kava", "Evmos"],
    deployment: "CosmWasm contracts on supported chains",
    benefits: [
      "Sub-second price updates",
      "Cost-effective pull model",
      "Cryptographic proof verification",
      "High-fidelity data from first-party publishers",
      "Ideal for high-frequency trading",
    ],
    bestFor: [
      "High-frequency trading applications",
      "Perpetual futures and options",
      "Sophisticated DeFi protocols",
      "Algorithmic trading",
    ],
  },
  
  notes: [
    "Expanded to Cosmos ecosystem via IBC and Wormhole",
    "Pull-model oracle: consumers pull price when needed",
    "Sub-second updates (typically 400ms latency)",
    "90+ first-party data publishers",
    "Confidence intervals provided with each price",
    "Cryptographic proofs for verification",
    "Live on Osmosis, Injective, Cronos, Kava, Evmos",
    "Best for high-frequency and sophisticated DeFi",
    "500+ price feeds available",
    "On-chain verification ensures data integrity",
  ],
  
  useCases: [
    "High-frequency trading on Cosmos DEXs",
    "Perpetual futures and options protocols",
    "Algorithmic stablecoins",
    "Lending and borrowing platforms",
    "Cross-chain DeFi protocols",
    "Yield aggregators",
    "Risk management systems",
    "Automated market makers (AMMs)",
  ],
  
  priceFeedIds: {
    note: "Find specific price feed IDs at:",
    url: "https://pyth.network/developers/price-feed-ids/",
    examples: {
      ATOM_USD: "b00b60f88b03a6a625a8d1c048c3f66653edf217439983d037e7222c4e612819",
      OSMO_USD: "5867f5683c757393a0670ef0f701490950fe93fdb006d181c8265a831ac0c5c6",
      INJ_USD: "7a5bc1d2b56ad029048cd63964b3ad2776eadf812edc1a43a31406cb54bff592",
    },
  },
  
  resources: {
    priceFeedList: "https://pyth.network/developers/price-feed-ids/",
    cosmosIntegration: "https://docs.pyth.network/documentation/pythnet-price-feeds/cosmos",
    mainWebsite: "https://pyth.network/",
    documentation: "https://docs.pyth.network/",
    github: "https://github.com/pyth-network",
  },
};

