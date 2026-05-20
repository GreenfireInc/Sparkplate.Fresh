// External Price APIs - Multi-Source Aggregated Price Feeds for Bitcoin Cash
// Type: Aggregated Multi-Source Price Oracle
// Blockchain: Bitcoin Cash (BCH)

export const bchExternalApisOracle = {
  name: "External Price APIs (Aggregated)",
  blockchain: "Bitcoin Cash (BCH)",
  type: "Multi-Source Aggregated Price Feeds",
  description: "Aggregates BCH price data from multiple reliable external APIs including CoinGecko, Kraken, Binance, and Coinbase. Uses median calculation for reliability and reduces manipulation risk through multi-source validation.",
  
  sources: [
    {
      name: "CoinGecko",
      url: "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin-cash&vs_currencies=usd",
      docs: "https://www.coingecko.com/en/api",
    },
    {
      name: "Kraken",
      url: "https://api.kraken.com/0/public/Ticker?pair=BCHUSD",
      docs: "https://docs.kraken.com/rest/",
    },
    {
      name: "Binance",
      url: "https://api.binance.com/api/v3/ticker/price?symbol=BCHUSDT",
      docs: "https://binance-docs.github.io/apidocs/spot/en/",
    },
    {
      name: "Coinbase",
      url: "https://api.coinbase.com/v2/exchange-rates?currency=BCH",
      docs: "https://docs.cloud.coinbase.com/exchange/reference",
    },
  ],
  
  sdk: {
    npm: "axios",
    installation: "npm install axios",
    documentation: "Individual API documentation links above",
  },
  
  integration: {
    example: `
// External APIs Integration for Bitcoin Cash - Multi-Source Aggregation
import axios from 'axios';

interface PriceSource {
  name: string;
  url: string;
  parser: (data: any) => number;
}

class BCHExternalPriceOracle {
  private priceSources: PriceSource[] = [
    {
      name: 'CoinGecko',
      url: 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin-cash&vs_currencies=usd,eur,btc',
      parser: (data: any) => data['bitcoin-cash'].usd
    },
    {
      name: 'Kraken',
      url: 'https://api.kraken.com/0/public/Ticker?pair=BCHUSD',
      parser: (data: any) => parseFloat(data.result.BCHUSD.c[0])
    },
    {
      name: 'Binance',
      url: 'https://api.binance.com/api/v3/ticker/price?symbol=BCHUSDT',
      parser: (data: any) => parseFloat(data.price)
    },
    {
      name: 'Coinbase',
      url: 'https://api.coinbase.com/v2/exchange-rates?currency=BCH',
      parser: (data: any) => parseFloat(data.data.rates.USD)
    }
  ];

  // Method 1: Get price from single source
  async getPriceFromSource(source: PriceSource): Promise<number | null> {
    try {
      const response = await axios.get(source.url, { timeout: 5000 });
      const price = source.parser(response.data);
      console.log(\`\${source.name}: $\${price.toFixed(2)}\`);
      return price;
    } catch (error) {
      console.warn(\`Failed to fetch from \${source.name}:\`, error.message);
      return null;
    }
  }

  // Method 2: Get aggregated price from all sources
  async getAggregatedBCHPrice(): Promise<{
    median: number;
    mean: number;
    min: number;
    max: number;
    sources: { [key: string]: number };
    successfulSources: number;
    timestamp: Date;
  }> {
    const promises = this.priceSources.map(source => 
      this.getPriceFromSource(source).then(price => ({
        name: source.name,
        price
      }))
    );

    const results = await Promise.all(promises);
    const validResults = results.filter(r => r.price !== null);

    if (validResults.length === 0) {
      throw new Error('All price sources failed');
    }

    const prices = validResults.map(r => r.price!);
    const sources: { [key: string]: number } = {};
    validResults.forEach(r => {
      sources[r.name] = r.price!;
    });

    // Calculate statistics
    const sortedPrices = [...prices].sort((a, b) => a - b);
    const median = this.calculateMedian(sortedPrices);
    const mean = prices.reduce((sum, p) => sum + p, 0) / prices.length;
    const min = Math.min(...prices);
    const max = Math.max(...prices);

    return {
      median,
      mean,
      min,
      max,
      sources,
      successfulSources: validResults.length,
      timestamp: new Date()
    };
  }

  // Method 3: Calculate median price
  private calculateMedian(sortedPrices: number[]): number {
    const mid = Math.floor(sortedPrices.length / 2);
    if (sortedPrices.length % 2 === 0) {
      return (sortedPrices[mid - 1] + sortedPrices[mid]) / 2;
    }
    return sortedPrices[mid];
  }

  // Method 4: Get price with confidence interval
  async getBCHPriceWithConfidence(): Promise<{
    price: number;
    confidence: number;
    spread: number;
    sources: number;
  }> {
    const data = await this.getAggregatedBCHPrice();
    const spread = ((data.max - data.min) / data.median) * 100;
    
    // Calculate confidence based on spread and number of sources
    const spreadConfidence = Math.max(0, 100 - spread * 2);
    const sourceConfidence = (data.successfulSources / this.priceSources.length) * 100;
    const confidence = (spreadConfidence + sourceConfidence) / 2;

    return {
      price: data.median,
      confidence: Math.round(confidence),
      spread: parseFloat(spread.toFixed(2)),
      sources: data.successfulSources
    };
  }

  // Method 5: Get multi-currency prices
  async getBCHMultiCurrency(): Promise<{
    usd: number;
    eur: number;
    btc: number;
    timestamp: Date;
  }> {
    try {
      // CoinGecko supports multiple currencies in one call
      const response = await axios.get(
        'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin-cash&vs_currencies=usd,eur,btc'
      );

      const data = response.data['bitcoin-cash'];
      return {
        usd: data.usd,
        eur: data.eur,
        btc: data.btc,
        timestamp: new Date()
      };
    } catch (error) {
      console.error('Error fetching multi-currency prices:', error);
      throw error;
    }
  }

  // Method 6: Get historical price (CoinGecko)
  async getBCHHistoricalPrice(date: string): Promise<number | null> {
    try {
      // Format: DD-MM-YYYY
      const response = await axios.get(
        \`https://api.coingecko.com/api/v3/coins/bitcoin-cash/history?date=\${date}\`
      );

      return response.data.market_data.current_price.usd;
    } catch (error) {
      console.error('Error fetching historical price:', error);
      return null;
    }
  }
}

// Advanced price monitoring and validation
class BCHPriceValidator {
  private oracle: BCHExternalPriceOracle;
  private priceHistory: number[] = [];
  private maxHistorySize: number;

  constructor(maxHistorySize: number = 100) {
    this.oracle = new BCHExternalPriceOracle();
    this.maxHistorySize = maxHistorySize;
  }

  // Validate price against recent history
  async validatePrice(): Promise<{
    currentPrice: number;
    isValid: boolean;
    deviationPercent: number;
    reason: string;
  }> {
    const data = await this.oracle.getAggregatedBCHPrice();
    const currentPrice = data.median;

    // Add to history
    this.priceHistory.push(currentPrice);
    if (this.priceHistory.length > this.maxHistorySize) {
      this.priceHistory.shift();
    }

    // Validate against recent average
    if (this.priceHistory.length < 5) {
      return {
        currentPrice,
        isValid: true,
        deviationPercent: 0,
        reason: 'Insufficient history for validation'
      };
    }

    const recentAverage = this.priceHistory
      .slice(-10)
      .reduce((sum, p) => sum + p, 0) / Math.min(10, this.priceHistory.length);

    const deviationPercent = Math.abs((currentPrice - recentAverage) / recentAverage) * 100;

    // Flag if deviation is more than 10%
    const isValid = deviationPercent < 10;

    return {
      currentPrice,
      isValid,
      deviationPercent: parseFloat(deviationPercent.toFixed(2)),
      reason: isValid 
        ? 'Price within normal range' 
        : 'Significant price deviation detected'
    };
  }

  clearHistory(): void {
    this.priceHistory = [];
  }
}

// Price monitoring with alerts
class BCHPriceMonitor {
  private oracle: BCHExternalPriceOracle;
  private interval: NodeJS.Timeout | null = null;

  constructor() {
    this.oracle = new BCHExternalPriceOracle();
  }

  startMonitoring(
    intervalMs: number = 60000,
    callback: (data: any) => void
  ): void {
    console.log(\`Starting BCH price monitoring (interval: \${intervalMs}ms)\`);

    this.interval = setInterval(async () => {
      try {
        const data = await this.oracle.getAggregatedBCHPrice();
        callback(data);
      } catch (error) {
        console.error('Monitoring error:', error);
      }
    }, intervalMs);
  }

  stopMonitoring(): void {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
      console.log('Stopped monitoring');
    }
  }
}

// Usage examples
async function main() {
  const oracle = new BCHExternalPriceOracle();

  // Get aggregated price from all sources
  const aggregated = await oracle.getAggregatedBCHPrice();
  console.log('Aggregated BCH Price:', aggregated);
  console.log(\`Median: $\${aggregated.median.toFixed(2)}\`);
  console.log(\`Mean: $\${aggregated.mean.toFixed(2)}\`);
  console.log(\`Range: $\${aggregated.min.toFixed(2)} - $\${aggregated.max.toFixed(2)}\`);

  // Get price with confidence
  const confidence = await oracle.getBCHPriceWithConfidence();
  console.log(\`\\nPrice: $\${confidence.price.toFixed(2)}\`);
  console.log(\`Confidence: \${confidence.confidence}%\`);
  console.log(\`Spread: \${confidence.spread}%\`);

  // Get multi-currency prices
  const multiCurrency = await oracle.getBCHMultiCurrency();
  console.log('\\nMulti-Currency Prices:', multiCurrency);

  // Validate price
  const validator = new BCHPriceValidator();
  const validation = await validator.validatePrice();
  console.log('\\nPrice Validation:', validation);

  // Monitor price
  const monitor = new BCHPriceMonitor();
  monitor.startMonitoring(30000, (data) => {
    console.log(\`\\n[\${data.timestamp.toISOString()}]\`);
    console.log(\`BCH: $\${data.median.toFixed(2)}\`);
    console.log(\`Sources: \${data.successfulSources}/4\`);
  });

  // Stop after 5 minutes
  setTimeout(() => monitor.stopMonitoring(), 300000);
}

// main();
    `,
  },
  
  features: {
    multiSourceAggregation: true,
    medianCalculation: true,
    outlierDetection: true,
    confidenceInterval: true,
    failoverSupport: true,
    realTimeData: true,
    noSinglePointFailure: true,
  },
  
  supportedData: [
    "BCH/USD real-time prices",
    "BCH/EUR prices",
    "BCH/BTC prices",
    "Aggregated median prices",
    "Price confidence intervals",
    "Multi-source validation",
    "Historical prices (via CoinGecko)",
  ],
  
  apiResources: {
    coinGecko: {
      name: "CoinGecko",
      url: "https://www.coingecko.com/en/api",
      docs: "https://www.coingecko.com/en/api/documentation",
      rateLimit: "50 calls/minute (free tier)",
    },
    kraken: {
      name: "Kraken",
      url: "https://docs.kraken.com/rest/",
      docs: "https://docs.kraken.com/rest/",
      rateLimit: "15-20 calls/second",
    },
    binance: {
      name: "Binance",
      url: "https://binance-docs.github.io/apidocs/spot/en/",
      docs: "https://binance-docs.github.io/apidocs/spot/en/",
      rateLimit: "1200 requests/minute",
    },
    coinbase: {
      name: "Coinbase",
      url: "https://docs.cloud.coinbase.com/exchange/reference",
      docs: "https://docs.cloud.coinbase.com/exchange/reference",
      rateLimit: "10 requests/second (public endpoints)",
    },
  },
  
  bchIntegration: {
    method: "Multi-source REST API aggregation",
    validation: "Median calculation with outlier detection",
    benefits: [
      "No single point of failure",
      "Reduces manipulation risk",
      "Automatic failover between sources",
      "Confidence interval calculation",
      "Price validation against history",
      "Free access to all sources",
      "High reliability through redundancy",
    ],
    bestFor: [
      "Production applications requiring reliability",
      "DeFi protocols needing validated prices",
      "Trading applications",
      "Portfolio management",
      "Price alert systems",
      "Risk management tools",
    ],
  },
  
  notes: [
    "Aggregates from 4 major price sources",
    "Uses median calculation for reliability",
    "Automatic failover if sources fail",
    "Confidence interval based on spread and source count",
    "Price validation against historical data",
    "All sources are free to use",
    "Recommended for production use",
    "Most reliable approach for BCH given limited native oracles",
  ],
  
  useCases: [
    "Production DeFi applications",
    "Reliable trading bots",
    "Portfolio tracking with validation",
    "Price alert systems",
    "Risk management platforms",
    "Market analysis tools",
    "Arbitrage detection",
    "Price aggregation services",
  ],
  
  technicalDetails: {
    sources: 4,
    aggregationMethod: "Median of valid sources",
    validation: "Outlier detection + historical comparison",
    failover: "Automatic if sources fail",
    timeout: "5 seconds per source",
    parallelRequests: true,
    caching: "Recommended for production",
  },
  
  advantages: [
    "No single point of failure",
    "Free access to all APIs",
    "High reliability",
    "Automatic failover",
    "Price validation",
    "Confidence scoring",
    "Multi-currency support",
    "Historical data access",
  ],
  
  implementation: {
    reliability: "Very High (multi-source)",
    latency: "Low (parallel requests)",
    cost: "Free",
    maintenance: "Low",
    scalability: "High",
  },
};

