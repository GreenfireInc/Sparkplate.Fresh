// General.cash Oracle - Simple Price Feed API for Bitcoin Cash
// Type: Quick Cryptocurrency Price Integration
// Blockchain: Bitcoin Cash (BCH)

export const generalCashOracle = {
  name: "General.cash Oracle",
  blockchain: "Bitcoin Cash (BCH)",
  type: "Simple Price Feed API",
  description: "General.cash provides a simple REST API for cryptocurrency prices, including BCH. Part of the General Protocols ecosystem, it offers quick and easy price data integration for applications requiring basic price feeds.",
  
  url: "https://general.cash/",
  docs: "https://general.cash/",
  
  api: {
    baseURL: "https://api.general.cash",
    priceEndpoint: "/price",
    pricesEndpoint: "/prices",
    marketEndpoint: "/market",
    documentation: "Available through General.cash platform",
  },
  
  sdk: {
    npm: "axios",
    installation: "npm install axios",
    documentation: "REST API documentation on General.cash",
  },
  
  integration: {
    example: `
// General.cash Oracle Integration for Bitcoin Cash
import axios from 'axios';

const GENERAL_CASH_API = 'https://api.general.cash';

class GeneralCashOracle {
  private baseURL: string;

  constructor(baseURL: string = GENERAL_CASH_API) {
    this.baseURL = baseURL;
  }

  // Method 1: Get single cryptocurrency price
  async getCryptoPrice(symbol: string, currency: string = 'USD'): Promise<number> {
    try {
      const response = await axios.get(\`\${this.baseURL}/price\`, {
        params: { symbol, currency }
      });

      return parseFloat(response.data.price);
    } catch (error) {
      console.error('Error fetching price from General.cash:', error);
      throw error;
    }
  }

  // Method 2: Get BCH price specifically
  async getBCHPrice(currency: string = 'USD'): Promise<{
    price: number;
    currency: string;
    timestamp: Date;
  }> {
    try {
      const price = await this.getCryptoPrice('BCH', currency);
      
      return {
        price,
        currency,
        timestamp: new Date()
      };
    } catch (error) {
      console.error('Error fetching BCH price:', error);
      throw error;
    }
  }

  // Method 3: Get multiple crypto prices
  async getCryptoPrices(symbols: string[]): Promise<{[key: string]: number}> {
    try {
      const response = await axios.get(\`\${this.baseURL}/prices\`, {
        params: { symbols: symbols.join(',') }
      });

      return response.data.prices;
    } catch (error) {
      console.error('Error fetching multiple prices:', error);
      throw error;
    }
  }

  // Method 4: Get market data including volume and changes
  async getMarketData(symbol: string): Promise<{
    price: number;
    volume: number;
    change24h: number;
    marketCap: number;
  }> {
    try {
      const response = await axios.get(\`\${this.baseURL}/market/\${symbol}\`);

      return {
        price: parseFloat(response.data.price),
        volume: parseFloat(response.data.volume),
        change24h: parseFloat(response.data.change24h),
        marketCap: parseFloat(response.data.marketCap)
      };
    } catch (error) {
      console.error('Error fetching market data:', error);
      throw error;
    }
  }

  // Method 5: Get BCH price in multiple currencies
  async getBCHMultiCurrency(): Promise<{
    usd: number;
    eur: number;
    btc: number;
    timestamp: Date;
  }> {
    try {
      const [usd, eur, btc] = await Promise.all([
        this.getCryptoPrice('BCH', 'USD'),
        this.getCryptoPrice('BCH', 'EUR'),
        this.getCryptoPrice('BCH', 'BTC')
      ]);

      return {
        usd,
        eur,
        btc,
        timestamp: new Date()
      };
    } catch (error) {
      console.error('Error fetching multi-currency BCH prices:', error);
      throw error;
    }
  }

  // Method 6: Compare BCH with other cryptocurrencies
  async compareCryptos(symbols: string[]): Promise<{
    [key: string]: {
      price: number;
      relativeToBCH: number;
    }
  }> {
    try {
      const bchPrice = await this.getCryptoPrice('BCH', 'USD');
      const prices = await this.getCryptoPrices(symbols);

      const comparison: any = {};
      
      for (const [symbol, price] of Object.entries(prices)) {
        comparison[symbol] = {
          price,
          relativeToBCH: price / bchPrice
        };
      }

      return comparison;
    } catch (error) {
      console.error('Error comparing cryptocurrencies:', error);
      throw error;
    }
  }
}

// Simple price caching wrapper
class CachedGeneralCashOracle {
  private oracle: GeneralCashOracle;
  private cache: Map<string, { price: number; timestamp: number }>;
  private cacheDuration: number;

  constructor(cacheDurationMs: number = 60000) {
    this.oracle = new GeneralCashOracle();
    this.cache = new Map();
    this.cacheDuration = cacheDurationMs;
  }

  async getBCHPrice(): Promise<number> {
    const cacheKey = 'BCH_USD';
    const cached = this.cache.get(cacheKey);

    if (cached && Date.now() - cached.timestamp < this.cacheDuration) {
      console.log('Returning cached BCH price');
      return cached.price;
    }

    const data = await this.oracle.getBCHPrice();
    this.cache.set(cacheKey, {
      price: data.price,
      timestamp: Date.now()
    });

    return data.price;
  }

  clearCache(): void {
    this.cache.clear();
  }
}

// Usage examples
async function main() {
  const oracle = new GeneralCashOracle();

  // Get BCH price in USD
  const bchUSD = await oracle.getBCHPrice('USD');
  console.log('BCH Price (USD):', bchUSD);

  // Get BCH in multiple currencies
  const multiCurrency = await oracle.getBCHMultiCurrency();
  console.log('BCH Multi-Currency:', multiCurrency);

  // Get multiple crypto prices
  const prices = await oracle.getCryptoPrices(['BCH', 'BTC', 'ETH']);
  console.log('Multiple Prices:', prices);

  // Get market data
  const marketData = await oracle.getMarketData('BCH');
  console.log('BCH Market Data:', marketData);

  // Compare with other cryptocurrencies
  const comparison = await oracle.compareCryptos(['BTC', 'ETH', 'LTC']);
  console.log('Crypto Comparison:', comparison);

  // Using cached oracle
  const cachedOracle = new CachedGeneralCashOracle(30000);
  const cachedPrice = await cachedOracle.getBCHPrice();
  console.log('Cached BCH Price:', cachedPrice);
}

// main();
    `,
  },
  
  socialMedia: {
    website: "https://general.cash/",
    generalProtocols: "https://generalprotocols.com/",
    twitter: "https://twitter.com/generalprotocol",
  },
  
  features: {
    simpleAPI: true,
    restInterface: true,
    multiCurrency: true,
    realTimeData: true,
    easyIntegration: true,
    noAuthRequired: true,
    lowLatency: true,
  },
  
  supportedData: [
    "BCH/USD price",
    "BCH/EUR price",
    "BCH/BTC price",
    "Multi-currency support",
    "Volume data",
    "24h price changes",
    "Market cap data",
  ],
  
  bchIntegration: {
    method: "Simple REST API",
    authentication: "Not required for basic endpoints",
    benefits: [
      "Extremely simple integration",
      "No authentication needed",
      "Quick response times",
      "Multi-currency support",
      "Part of General Protocols ecosystem",
      "Suitable for prototypes and MVPs",
      "Low barrier to entry",
    ],
    bestFor: [
      "Quick prototypes",
      "Simple price displays",
      "Basic trading applications",
      "Portfolio tracking",
      "Price alerts",
      "Educational projects",
    ],
  },
  
  notes: [
    "Part of General Protocols ecosystem",
    "Simple REST API for cryptocurrency prices",
    "No authentication required for basic use",
    "Quick and easy integration",
    "Suitable for simple applications",
    "Multi-currency support",
    "Related to AnyHedge and other BCH DeFi protocols",
  ],
  
  useCases: [
    "Simple price displays on websites",
    "Basic trading bots",
    "Portfolio tracking applications",
    "Price alert systems",
    "Educational cryptocurrency projects",
    "Proof-of-concept applications",
    "Quick price lookups",
  ],
  
  technicalDetails: {
    protocol: "REST API over HTTPS",
    responseFormat: "JSON",
    rateLimit: "Reasonable limits for free tier",
    authentication: "Not required for basic endpoints",
    caching: "Recommended for production use",
  },
  
  resources: {
    mainWebsite: "https://general.cash/",
    generalProtocols: "https://generalprotocols.com/",
    documentation: "Available through platform",
  },
  
  limitations: [
    "May have rate limits on free tier",
    "Less comprehensive than specialized oracles",
    "Limited historical data",
    "No advanced features like VRF or complex queries",
    "Best suited for simple use cases",
  ],
  
  advantages: [
    "No setup required",
    "Free to use",
    "Very simple API",
    "Fast response times",
    "Good for getting started",
    "Part of trusted BCH ecosystem",
  ],
};

