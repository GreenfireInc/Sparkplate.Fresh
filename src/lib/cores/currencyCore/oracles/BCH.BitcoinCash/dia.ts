// DIA Oracle - Multi-Source Community-Driven Oracle for Bitcoin Cash
// Type: Aggregated Price Feed Oracle
// Blockchain: Bitcoin Cash (BCH)

import axios from 'axios';

export const bchDiaOracle = {
  name: "DIA Oracle",
  blockchain: "Bitcoin Cash (BCH)",
  type: "Multi-Source Community-Driven Price Oracle",
  description: "DIA (Decentralized Information Asset) provides transparent and auditable price feeds for BCH, aggregating data from over 85 on-chain and off-chain exchanges using MAIR (Market Aggregated Index Rate) methodology. Suitable for DeFi and smart contract applications.",
  
  url: "https://www.diadata.org/",
  docs: "https://docs.diadata.org/",
  
  api: {
    baseURL: "https://api.diadata.org/v1",
    bchPrice: "https://api.diadata.org/v1/assetQuotation/BitcoinCash/0x0000000000000000000000000000000000000000",
    bchQuote: "https://api.diadata.org/v1/quote/BCH",
    documentation: "https://docs.diadata.org/",
    explorer: "https://www.diadata.org/app/price/asset/BitcoinCash/0x0000000000000000000000000000000000000000/",
  },
  
  sdk: {
    npm: "axios",
    installation: "npm install axios",
    documentation: "https://docs.diadata.org/",
  },
  
  integration: {
    example: `
// DIA Oracle Integration for Bitcoin Cash
import axios from 'axios';

const DIA_API_BASE = 'https://api.diadata.org/v1';

class DIABitcoinCashOracle {
  private baseURL: string;

  constructor(baseURL: string = DIA_API_BASE) {
    this.baseURL = baseURL;
  }

  // Method 1: Get BCH price using assetQuotation endpoint
  async getBCHPriceQuotation(): Promise<{
    price: number;
    supply: number;
    timestamp: Date;
    source: string;
  }> {
    try {
      const response = await axios.get(
        \`\${this.baseURL}/assetQuotation/BitcoinCash/0x0000000000000000000000000000000000000000\`
      );

      const data = response.data;
      return {
        price: parseFloat(data.Price),
        supply: parseFloat(data.Supply || '0'),
        timestamp: new Date(data.Time),
        source: data.Source || 'DIA'
      };
    } catch (error) {
      console.error('Error fetching BCH price from DIA (quotation):', error);
      throw error;
    }
  }

  // Method 2: Get BCH price using quote endpoint
  async getBCHPriceQuote(): Promise<{
    price: number;
    timestamp: Date;
    symbol: string;
  }> {
    try {
      const response = await axios.get(\`\${this.baseURL}/quote/BCH\`);

      const data = response.data;
      return {
        price: parseFloat(data.Price),
        timestamp: new Date(data.Time),
        symbol: data.Symbol
      };
    } catch (error) {
      console.error('Error fetching BCH price from DIA (quote):', error);
      throw error;
    }
  }

  // Method 3: Get detailed BCH market data
  async getBCHDetailedData(): Promise<{
    price: number;
    priceUSD: number;
    supply: number;
    volume24h: number;
    marketCap: number;
    timestamp: Date;
    exchanges: number;
  }> {
    try {
      const quotation = await this.getBCHPriceQuotation();
      
      // DIA provides detailed metrics in their API
      return {
        price: quotation.price,
        priceUSD: quotation.price,
        supply: quotation.supply,
        volume24h: 0, // Calculate from exchange data if available
        marketCap: quotation.price * quotation.supply,
        timestamp: quotation.timestamp,
        exchanges: 85 // DIA aggregates from 85+ exchanges
      };
    } catch (error) {
      console.error('Error fetching detailed BCH data:', error);
      throw error;
    }
  }

  // Method 4: Compare both endpoints for validation
  async getValidatedBCHPrice(): Promise<{
    quotationPrice: number;
    quotePrice: number;
    average: number;
    difference: number;
    timestamp: Date;
  }> {
    try {
      const [quotation, quote] = await Promise.all([
        this.getBCHPriceQuotation(),
        this.getBCHPriceQuote()
      ]);

      const average = (quotation.price + quote.price) / 2;
      const difference = Math.abs(quotation.price - quote.price);

      return {
        quotationPrice: quotation.price,
        quotePrice: quote.price,
        average,
        difference,
        timestamp: quotation.timestamp
      };
    } catch (error) {
      console.error('Error validating BCH price:', error);
      throw error;
    }
  }

  // Method 5: Get BCH price with retry mechanism
  async getBCHPriceWithRetry(maxRetries: number = 3): Promise<number> {
    let lastError: any;

    for (let i = 0; i < maxRetries; i++) {
      try {
        const data = await this.getBCHPriceQuotation();
        return data.price;
      } catch (error) {
        lastError = error;
        console.warn(\`Retry \${i + 1}/\${maxRetries} failed\`);
        
        if (i < maxRetries - 1) {
          await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
        }
      }
    }

    throw new Error(\`Failed to fetch BCH price after \${maxRetries} retries: \${lastError}\`);
  }

  // Method 6: Get historical BCH prices (if supported)
  async getBCHHistoricalPrices(
    startTimestamp: number,
    endTimestamp: number
  ): Promise<Array<{timestamp: number; price: number}>> {
    // Note: Historical data may require specific DIA API endpoints or subscription
    console.log('Historical data request:', { startTimestamp, endTimestamp });
    
    // Placeholder for historical data implementation
    return [];
  }
}

// Advanced price monitoring class
class DIABCHPriceMonitor {
  private oracle: DIABitcoinCashOracle;
  private interval: NodeJS.Timeout | null = null;

  constructor() {
    this.oracle = new DIABitcoinCashOracle();
  }

  // Start monitoring BCH price
  startMonitoring(
    intervalMs: number = 60000,
    callback: (price: number, timestamp: Date) => void
  ): void {
    console.log(\`Starting BCH price monitoring (interval: \${intervalMs}ms)\`);

    this.interval = setInterval(async () => {
      try {
        const data = await this.oracle.getBCHPriceQuotation();
        callback(data.price, data.timestamp);
      } catch (error) {
        console.error('Error in price monitoring:', error);
      }
    }, intervalMs);
  }

  // Stop monitoring
  stopMonitoring(): void {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
      console.log('Stopped BCH price monitoring');
    }
  }
}

// Usage examples
async function main() {
  const oracle = new DIABitcoinCashOracle();

  // Get BCH price (quotation)
  const quotation = await oracle.getBCHPriceQuotation();
  console.log('BCH Price (Quotation):', quotation);

  // Get BCH price (quote)
  const quote = await oracle.getBCHPriceQuote();
  console.log('BCH Price (Quote):', quote);

  // Get validated price from both endpoints
  const validated = await oracle.getValidatedBCHPrice();
  console.log('Validated BCH Price:', validated);

  // Get detailed market data
  const detailed = await oracle.getBCHDetailedData();
  console.log('Detailed BCH Data:', detailed);

  // Monitor BCH price
  const monitor = new DIABCHPriceMonitor();
  monitor.startMonitoring(30000, (price, timestamp) => {
    console.log(\`[\${timestamp.toISOString()}] BCH: $\${price.toFixed(2)}\`);
  });

  // Stop after 5 minutes
  setTimeout(() => monitor.stopMonitoring(), 300000);
}

// main();
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/DIAdata_org",
    telegram: "https://t.me/DIAdata_org",
    discord: "https://discord.com/invite/dia-data",
    github: "https://github.com/diadata-org",
  },
  
  features: {
    realTimeFeeds: true,
    customizableFeeds: true,
    transparentData: true,
    multiSourceAggregation: true,
    exchangeCount: 85,
    maiMethodology: true,
    defiIntegration: true,
    crossChain: true,
  },
  
  supportedData: [
    "BCH/USD price feeds",
    "BCH supply data",
    "Volume data",
    "Market cap calculations",
    "Exchange-aggregated prices",
    "Historical data (with subscription)",
    "Custom asset feeds",
  ],
  
  bchIntegration: {
    method: "REST API for off-chain queries",
    methodology: "MAIR (Market Aggregated Index Rate)",
    dataSources: "85+ on-chain and off-chain exchanges",
    updateFrequency: "Real-time",
    benefits: [
      "Multi-source aggregation reduces manipulation risk",
      "Transparent data sourcing",
      "Auditable price calculations",
      "Suitable for DeFi protocols",
      "Cross-chain compatibility",
      "Customizable feeds for specific needs",
      "Free access to public API",
    ],
    bestFor: [
      "DeFi applications requiring transparent pricing",
      "Lending and borrowing protocols",
      "Derivatives and synthetic assets",
      "Portfolio management tools",
      "Price aggregation services",
      "Risk management systems",
    ],
  },
  
  notes: [
    "Aggregates data from 85+ exchanges",
    "Uses MAIR methodology for transparent price aggregation",
    "Community-driven with auditable sourcing",
    "BCH support active since ~2020",
    "Free public API access",
    "Custom feeds available for production use",
    "Multiple endpoints for validation",
    "Suitable for institutional-grade applications",
  ],
  
  useCases: [
    "DeFi price feeds for BCH",
    "Lending protocol collateral pricing",
    "Derivatives and options pricing",
    "Portfolio tracking applications",
    "Market data aggregation",
    "Risk assessment tools",
    "Trading bot price sources",
    "Research and analytics platforms",
  ],
  
  technicalDetails: {
    methodology: "MAIR (Market Aggregated Index Rate)",
    exchanges: "85+ on-chain and off-chain sources",
    updateFrequency: "Real-time updates",
    dataValidation: "Multi-source aggregation with outlier detection",
    apiAccess: "Free public API, premium for custom feeds",
    endpoints: {
      assetQuotation: "/v1/assetQuotation/BitcoinCash/0x0000000000000000000000000000000000000000",
      quote: "/v1/quote/BCH",
    },
  },
  
  resources: {
    mainWebsite: "https://www.diadata.org/",
    documentation: "https://docs.diadata.org/",
    bchPriceExplorer: "https://www.diadata.org/app/price/asset/BitcoinCash/0x0000000000000000000000000000000000000000/",
    apiDocs: "https://docs.diadata.org/",
    github: "https://github.com/diadata-org",
  },
};

