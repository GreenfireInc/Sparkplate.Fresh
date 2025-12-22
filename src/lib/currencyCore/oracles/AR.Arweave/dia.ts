// DIA Oracle - Multi-Source Price Oracle for Arweave
// Type: Transparent Multi-Source Price Oracle
// Blockchain: Arweave (AR) - Can integrate with Arweave-based applications

export const diaOracleAR = {
  name: "DIA Oracle",
  blockchain: "Arweave (AR)",
  type: "Transparent Multi-Source Price Oracle",
  description: "Decentralized Information Asset oracle providing real-time, customizable price feeds for AR and 20,000+ assets. Aggregates data from 85+ on-chain and off-chain exchanges with transparent sourcing and verification methodology. Can be integrated with Arweave-based applications.",
  
  url: "https://www.diadata.org/",
  arweaveApi: "https://www.diadata.org/app/price/asset/Arweave/0x0000000000000000000000000000000000000000/",
  docs: "https://docs.diadata.org/",
  
  api: {
    baseURL: "https://api.diadata.org/v1",
    assetQuotation: "https://api.diadata.org/v1/assetQuotation/Arweave/0x0000000000000000000000000000000000000000",
    graphqlEndpoint: "https://api.diadata.org/graphql",
    documentation: "https://docs.diadata.org/",
    rateLimit: "Public API with rate limits",
  },
  
  sdk: {
    npm: "axios",
    installation: "npm install axios",
    graphqlNpm: "@apollo/client graphql",
    graphqlInstallation: "npm install @apollo/client graphql",
    documentation: "https://docs.diadata.org/",
    github: "https://github.com/diadata-org",
  },
  
  integration: {
    example: `
// DIA Oracle Integration for Arweave
import axios from 'axios';

const DIA_API_BASE = 'https://api.diadata.org/v1';

class DiaArweaveOracle {
  private apiBase: string;

  constructor(apiBase: string = DIA_API_BASE) {
    this.apiBase = apiBase;
  }

  // Method 1: Get AR price from DIA REST API
  async getArweavePrice(): Promise<{
    price: number;
    symbol: string;
    name: string;
    timestamp: Date;
    volume24hUSD: number;
    source: string;
  }> {
    try {
      const response = await axios.get(
        \`\${this.apiBase}/assetQuotation/Arweave/0x0000000000000000000000000000000000000000\`
      );

      const data = response.data;
      console.log('AR Price:', data.Price);
      console.log('Symbol:', data.Symbol);
      console.log('Name:', data.Name);
      console.log('Time:', new Date(data.Time).toISOString());
      console.log('Volume (24h USD):', data.VolumeYesterdayUSD);
      console.log('Source:', data.Source);

      return {
        price: data.Price,
        symbol: data.Symbol,
        name: data.Name,
        timestamp: new Date(data.Time),
        volume24hUSD: data.VolumeYesterdayUSD || 0,
        source: data.Source || 'DIA',
      };
    } catch (error) {
      console.error('Error fetching AR price from DIA:', error);
      throw error;
    }
  }

  // Method 2: Get price for any asset
  async getAssetPrice(
    blockchain: string,
    address: string = '0x0000000000000000000000000000000000000000'
  ): Promise<{
    price: number;
    symbol: string;
    name: string;
    timestamp: Date;
    volume24hUSD: number;
  }> {
    try {
      const response = await axios.get(
        \`\${this.apiBase}/assetQuotation/\${blockchain}/\${address}\`
      );

      const data = response.data;
      
      return {
        price: data.Price,
        symbol: data.Symbol,
        name: data.Name,
        timestamp: new Date(data.Time),
        volume24hUSD: data.VolumeYesterdayUSD || 0,
      };
    } catch (error) {
      console.error(\`Error fetching price for \${blockchain}:\`, error);
      throw error;
    }
  }

  // Method 3: Get multiple asset prices
  async getMultiplePrices(assets: Array<{ blockchain: string; address?: string }>): Promise<Array<{
    blockchain: string;
    price: number;
    symbol: string;
    timestamp: Date;
  }>> {
    try {
      const pricePromises = assets.map(asset =>
        this.getAssetPrice(asset.blockchain, asset.address)
          .then(price => ({
            blockchain: asset.blockchain,
            price: price.price,
            symbol: price.symbol,
            timestamp: price.timestamp,
          }))
          .catch(error => {
            console.error(\`Error fetching \${asset.blockchain} price:\`, error);
            return null;
          })
      );

      const prices = await Promise.all(pricePromises);
      return prices.filter(price => price !== null) as Array<{
        blockchain: string;
        price: number;
        symbol: string;
        timestamp: Date;
      }>;
    } catch (error) {
      console.error('Error fetching multiple prices:', error);
      throw error;
    }
  }

  // Method 4: Get historical price data
  async getHistoricalPrice(
    blockchain: string,
    startTime: string,
    endTime: string,
    address: string = '0x0000000000000000000000000000000000000000'
  ): Promise<Array<{
    price: number;
    timestamp: Date;
    volume: number;
  }>> {
    try {
      const response = await axios.get(
        \`\${this.apiBase}/assetQuotation/\${blockchain}/\${address}\`,
        {
          params: {
            starttime: startTime,
            endtime: endTime,
          }
        }
      );

      const data = response.data;
      
      if (Array.isArray(data)) {
        return data.map(item => ({
          price: item.Price,
          timestamp: new Date(item.Time),
          volume: item.Volume || 0,
        }));
      }
      
      return [{
        price: data.Price,
        timestamp: new Date(data.Time),
        volume: data.Volume || 0,
      }];
    } catch (error) {
      console.error('Error fetching historical price:', error);
      throw error;
    }
  }

  // Method 5: Get price with exchange breakdown
  async getPriceWithSources(
    blockchain: string,
    address: string = '0x0000000000000000000000000000000000000000'
  ): Promise<{
    price: number;
    sources: Array<{
      exchange: string;
      price: number;
      volume: number;
      weight: number;
    }>;
    aggregatedPrice: number;
    timestamp: Date;
  }> {
    try {
      const response = await axios.get(
        \`\${this.apiBase}/assetQuotation/\${blockchain}/\${address}\`
      );

      const data = response.data;
      
      // DIA aggregates from multiple sources
      // The response includes source information
      return {
        price: data.Price,
        sources: data.Sources || [],
        aggregatedPrice: data.Price,
        timestamp: new Date(data.Time),
      };
    } catch (error) {
      console.error('Error fetching price with sources:', error);
      throw error;
    }
  }

  // Method 6: Get exchange list for an asset
  async getExchangeList(
    blockchain: string,
    address: string = '0x0000000000000000000000000000000000000000'
  ): Promise<Array<{
    exchange: string;
    pair: string;
    price: number;
    volume24h: number;
  }>> {
    try {
      const response = await axios.get(
        \`\${this.apiBase}/exchanges/\${blockchain}/\${address}\`
      );

      return response.data.map((exchange: any) => ({
        exchange: exchange.Exchange,
        pair: exchange.Pair,
        price: exchange.Price,
        volume24h: exchange.Volume24h || 0,
      }));
    } catch (error) {
      console.error('Error fetching exchange list:', error);
      throw error;
    }
  }
}

// Usage examples
const diaOracle = new DiaArweaveOracle();

// Get AR price
diaOracle.getArweavePrice().then(price => {
  console.log('AR Price:', price.price);
  console.log('Volume 24h:', price.volume24hUSD);
});

// Get multiple asset prices
diaOracle.getMultiplePrices([
  { blockchain: 'Arweave' },
  { blockchain: 'Ethereum', address: '0x...' },
  { blockchain: 'Bitcoin' },
]).then(prices => {
  prices.forEach(price => {
    console.log(\`\${price.blockchain} (\${price.symbol}): $\${price.price}\`);
  });
});

// Get historical data
diaOracle.getHistoricalPrice(
  'Arweave',
  '2021-11-01T00:00:00',
  '2021-11-05T23:59:59'
).then(historical => {
  console.log('Historical prices:', historical.length, 'data points');
});
`
  },
  
  features: {
    multiSource: true,
    transparent: true,
    historicalData: true,
    exchangeBreakdown: true,
    customFeeds: true,
    graphql: true,
    restApi: true,
    arweaveSupport: true,
  },
  
  dataSources: {
    exchanges: "85+ on-chain and off-chain exchanges",
    assets: "20,000+ assets supported",
    transparency: "Transparent sourcing methodology",
    verification: "Multi-source aggregation with verification",
  },
  
  arweaveIntegration: {
    description: "DIA can provide price feeds for Arweave (AR) token",
    apiEndpoint: "https://api.diadata.org/v1/assetQuotation/Arweave/0x0000000000000000000000000000000000000000",
    webInterface: "https://www.diadata.org/app/price/asset/Arweave/0x0000000000000000000000000000000000000000/",
    smartContract: "Can be integrated with SmartWeave contracts on Arweave",
  },
  
  useCases: [
    "AR token price feeds for Arweave applications",
    "Multi-asset price aggregation",
    "Historical price analysis",
    "Exchange-specific price data",
    "Custom oracle feeds for DeFi protocols",
    "Transparent price sourcing for compliance",
  ],
  
  advantages: {
    transparency: "Transparent multi-source aggregation methodology",
    coverage: "20,000+ assets from 85+ exchanges",
    historical: "Comprehensive historical data",
    customization: "Custom oracle feeds available",
    restAndGraphql: "Both REST and GraphQL APIs available",
  },
  
  notes: [
    "DIA provides price feeds for Arweave (AR) token",
    "Aggregates data from 85+ on-chain and off-chain exchanges",
    "Transparent sourcing methodology for verification",
    "Supports 20,000+ assets across multiple blockchains",
    "Can be integrated with Arweave-based SmartWeave contracts",
    "Both REST and GraphQL APIs available",
    "Historical data available for analysis",
    "Exchange-specific breakdown available for transparency",
    "Public API with rate limits",
    "Custom oracle feeds can be requested for specific use cases",
  ],
};
