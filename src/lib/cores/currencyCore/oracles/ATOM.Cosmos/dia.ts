// DIA Oracle - Community-Driven Multi-Source Oracle for Cosmos
// Type: Transparent Multi-Source Price Oracle
// Blockchain: Cosmos (ATOM)

export const diaOracleATOM = {
  name: "DIA Oracle",
  blockchain: "Cosmos (ATOM)",
  type: "Community-Driven Multi-Source Price Oracle",
  description: "Decentralized Information Asset oracle providing real-time, customizable price feeds for ATOM and 20,000+ assets. Aggregates data from 85+ on-chain and off-chain exchanges with transparent sourcing and verification methodology.",
  
  url: "https://www.diadata.org/",
  cosmosApi: "https://www.diadata.org/app/price/asset/Cosmos/0x0000000000000000000000000000000000000000/",
  docs: "https://docs.diadata.org/",
  
  api: {
    baseURL: "https://api.diadata.org/v1",
    assetQuotation: "https://api.diadata.org/v1/assetQuotation/Cosmos/0x0000000000000000000000000000000000000000",
    documentation: "https://docs.diadata.org/",
    rateLimit: "Public API with rate limits",
  },
  
  sdk: {
    npm: "axios",
    cosmosIntegration: "@cosmjs/stargate",
    installation: "npm install axios @cosmjs/stargate",
    documentation: "https://docs.diadata.org/",
    github: "https://github.com/diadata-org",
  },
  
  integration: {
    example: `
// DIA Oracle Integration for Cosmos
import axios from 'axios';
import { StargateClient } from '@cosmjs/stargate';

const DIA_API_BASE = 'https://api.diadata.org/v1';

class DiaCosmosOracle {
  private apiBase: string;

  constructor(apiBase: string = DIA_API_BASE) {
    this.apiBase = apiBase;
  }

  // Method 1: Get ATOM price from DIA REST API
  async getAtomPrice(): Promise<{
    price: number;
    symbol: string;
    name: string;
    timestamp: Date;
    volumeYesterdayUSD: number;
  }> {
    try {
      const response = await axios.get(
        \`\${this.apiBase}/assetQuotation/Cosmos/0x0000000000000000000000000000000000000000\`
      );

      const data = response.data;
      console.log('ATOM Price:', data.Price);
      console.log('Symbol:', data.Symbol);
      console.log('Name:', data.Name);
      console.log('Time:', new Date(data.Time).toISOString());
      console.log('Volume (24h USD):', data.VolumeYesterdayUSD);

      return {
        price: data.Price,
        symbol: data.Symbol,
        name: data.Name,
        timestamp: new Date(data.Time),
        volumeYesterdayUSD: data.VolumeYesterdayUSD || 0,
      };
    } catch (error) {
      console.error('Error fetching ATOM price from DIA:', error);
      throw error;
    }
  }

  // Method 2: Get price for any Cosmos ecosystem asset
  async getAssetPrice(
    blockchain: string,
    assetAddress: string
  ): Promise<{
    price: number;
    symbol: string;
    name: string;
    timestamp: Date;
  }> {
    try {
      const response = await axios.get(
        \`\${this.apiBase}/assetQuotation/\${blockchain}/\${assetAddress}\`
      );

      const data = response.data;
      return {
        price: data.Price,
        symbol: data.Symbol,
        name: data.Name,
        timestamp: new Date(data.Time),
      };
    } catch (error) {
      console.error(\`Error fetching price for \${blockchain}/\${assetAddress}:\`, error);
      throw error;
    }
  }

  // Method 3: Get multiple asset prices
  async getMultiplePrices(
    assets: Array<{ blockchain: string; address: string }>
  ): Promise<any[]> {
    try {
      const prices = await Promise.all(
        assets.map(asset => this.getAssetPrice(asset.blockchain, asset.address))
      );

      return prices;
    } catch (error) {
      console.error('Error fetching multiple DIA prices:', error);
      throw error;
    }
  }

  // Method 4: Get supply information
  async getSupplyInfo(assetAddress: string): Promise<any> {
    try {
      const response = await axios.get(
        \`\${this.apiBase}/supply/\${assetAddress}\`
      );

      const data = response.data;
      console.log('Supply Info:', data);
      return data;
    } catch (error) {
      console.error('Error fetching supply info:', error);
      throw error;
    }
  }

  // Method 5: Get chart/historical data
  async getChartPoints(
    symbol: string,
    startTime: Date,
    endTime: Date
  ): Promise<any[]> {
    try {
      const response = await axios.get(
        \`\${this.apiBase}/chartPoints/\${symbol}\`,
        {
          params: {
            startTime: startTime.toISOString(),
            endTime: endTime.toISOString(),
          },
        }
      );

      console.log('Historical Price Data:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching historical price data:', error);
      throw error;
    }
  }

  // Method 6: Get exchange information
  async getExchanges(): Promise<any[]> {
    try {
      const response = await axios.get(\`\${this.apiBase}/exchanges\`);
      return response.data;
    } catch (error) {
      console.error('Error fetching exchanges:', error);
      throw error;
    }
  }

  // Method 7: Get trading pairs
  async getPairs(exchange: string): Promise<any[]> {
    try {
      const response = await axios.get(
        \`\${this.apiBase}/pairs?exchange=\${exchange}\`
      );
      return response.data;
    } catch (error) {
      console.error(\`Error fetching pairs for \${exchange}:\`, error);
      throw error;
    }
  }
}

// Usage examples
async function main() {
  const oracle = new DiaCosmosOracle();

  // Get ATOM price
  const atomPrice = await oracle.getAtomPrice();
  console.log('ATOM Price Data:', atomPrice);

  // Get multiple Cosmos ecosystem prices
  const prices = await oracle.getMultiplePrices([
    { blockchain: 'Cosmos', address: '0x0000000000000000000000000000000000000000' }, // ATOM
    // Add more assets as needed
  ]);
  console.log('Multiple Prices:', prices);

  // Get exchanges
  const exchanges = await oracle.getExchanges();
  console.log(\`Total Exchanges: \${exchanges.length}\`);
}

// main();
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/DIAdata_org",
    telegram: "https://t.me/DIAdata_org",
    discord: "https://discord.com/invite/dia-data",
    github: "https://github.com/diadata-org",
    medium: "https://medium.com/dia-insights",
  },
  
  features: {
    communityDriven: true,
    transparent: true,
    multiSource: true,
    customizable: true,
    audited: true,
    crossChain: true,
    volumeData: true,
    supplyData: true,
  },
  
  supportedData: [
    "20,000+ cryptocurrency prices",
    "ATOM and all Cosmos ecosystem tokens",
    "Volume data (24h, yesterday)",
    "Supply information",
    "Historical price data",
    "Exchange data",
    "Trading pair information",
  ],
  
  dataAggregation: {
    sources: "85+ on-chain and off-chain exchanges",
    method: "Multi-source aggregation with outlier detection",
    transparency: "Fully transparent data sourcing",
    methodology: "VWAPIR (Volume-Weighted Average Price with Interquartile Range)",
    quality: "Audited market data",
  },
  
  cosmosIntegration: {
    method: "REST API for off-chain queries",
    accessPattern: "HTTP API calls",
    benefits: [
      "20,000+ assets supported",
      "Transparent multi-source aggregation",
      "Community-driven and audited",
      "Volume and supply data available",
      "Historical data access",
      "Customizable feeds",
      "85+ exchange integrations",
    ],
    bestFor: [
      "DeFi protocols requiring transparent sourcing",
      "Applications needing volume data",
      "Multi-asset price tracking",
      "Institutional-grade data needs",
      "Custom data requirements",
    ],
  },
  
  notes: [
    "Community-driven oracle with transparent sourcing",
    "Aggregates data from 85+ exchanges",
    "Supports 20,000+ assets including ATOM",
    "VWAPIR methodology for accurate pricing",
    "REST API for easy off-chain access",
    "Provides volume and supply data",
    "Historical price data available",
    "Active integration on Cosmos",
    "Customizable oracle feeds",
    "Fully audited data sources",
  ],
  
  useCases: [
    "DeFi protocols (AMMs, lending, derivatives)",
    "Portfolio tracking and analytics",
    "Price discovery for new assets",
    "Market research and analysis",
    "Cross-chain price comparison",
    "Volume and supply monitoring",
    "Institutional data needs",
    "Custom oracle deployments",
  ],
  
  apiEndpoints: {
    assetQuotation: "/v1/assetQuotation/{blockchain}/{address}",
    supply: "/v1/supply/{address}",
    chartPoints: "/v1/chartPoints/{symbol}",
    exchanges: "/v1/exchanges",
    pairs: "/v1/pairs",
  },
  
  resources: {
    mainWebsite: "https://www.diadata.org/",
    cosmosOracle: "https://www.diadata.org/app/price/asset/Cosmos/0x0000000000000000000000000000000000000000/",
    documentation: "https://docs.diadata.org/",
    github: "https://github.com/diadata-org",
    medium: "https://medium.com/dia-insights",
  },
  
  pricing: {
    tier: "Freemium model",
    publicApi: "Free with rate limits",
    customFeeds: "Custom pricing for dedicated feeds",
    enterprise: "Enterprise solutions available",
  },
};

