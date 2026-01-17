// DIA - Open-Source Oracle with Transparent Methodologies
// Multi-source price aggregation with full transparency

export const diaOracle = {
  name: 'DIA (Decentralized Information Asset)',
  blockchain: 'Terra (LUNA)',
  type: 'Open-Source Oracle Platform',
  
  description: `DIA provides fully transparent, open-source price feeds for Terra (LUNA) with data sourced from 80+ centralized and decentralized exchanges. All methodologies, data sources, and pricing algorithms are publicly available, making DIA ideal for protocols requiring auditability and customization. DIA offers both free public APIs and customizable enterprise feeds for Terra applications.`,

  features: [
    'Open-source and transparent',
    '80+ exchange data sources',
    'Customizable price feeds',
    'Free API endpoints',
    'Historical price data',
    'CEX and DEX aggregation',
    'Real-time price updates',
    'Auditable methodologies',
  ],

  api: {
    website: 'https://www.diadata.org/',
    documentation: 'https://docs.diadata.org/',
    apiReference: 'https://docs.diadata.org/documentation/api-1',
    terraPrice: 'https://api.diadata.org/v1/assetQuotation/Terra/0x0000000000000000000000000000000000000000',
    priceApp: 'https://www.diadata.org/app/price/asset/Terra/0x0000000000000000000000000000000000000000/',
    github: 'https://github.com/diadata-org',
  },

  sdk: {
    primaryPackage: 'REST API (no SDK required)',
    installCommand: 'npm install axios',
    supportedLanguages: ['Any (REST API)', 'TypeScript', 'JavaScript', 'Python', 'Go'],
  },

  socialMedia: {
    website: 'https://www.diadata.org/',
    twitter: 'https://twitter.com/DIAdata_org',
    discord: 'https://discord.gg/zFcKpcy',
    telegram: 'https://t.me/DIAdata_org',
    github: 'https://github.com/diadata-org',
    medium: 'https://medium.com/dia-insights',
    reddit: 'https://www.reddit.com/r/DIAdata/',
  },

  endpoints: {
    assetQuotation: 'https://api.diadata.org/v1/assetQuotation/Terra/0x0000000000000000000000000000000000000000',
    historicalPrices: 'https://api.diadata.org/v1/chartPoints/Terra/0x0000000000000000000000000000000000000000',
    supply: 'https://api.diadata.org/v1/supply/LUNA',
  },

  useCases: [
    'Transparent price feeds',
    'Auditable data sources',
    'Custom feed requirements',
    'Historical price analysis',
    'Multi-source price validation',
    'DeFi protocol integrations',
    'Research and analytics',
  ],

  integration: {
    example: `
import axios from 'axios';

/**
 * DIA Oracle Integration for Terra (LUNA)
 * Open-source, transparent price feeds with multi-exchange aggregation
 */

const DIA_API_BASE = 'https://api.diadata.org/v1';
const TERRA_ADDRESS = '0x0000000000000000000000000000000000000000';

/**
 * Get current LUNA price from DIA
 */
async function getDIALUNAPrice() {
  try {
    const response = await axios.get(
      \`\${DIA_API_BASE}/assetQuotation/Terra/\${TERRA_ADDRESS}\`
    );

    const { Price, Time, Source } = response.data;
    const price = parseFloat(Price);
    const timestamp = new Date(Time);

    console.log(\`DIA LUNA/USD Price: $\${price.toFixed(4)}\`);
    console.log(\`Source: \${Source}\`);
    console.log(\`Timestamp: \${timestamp.toISOString()}\`);

    return {
      price,
      source: Source,
      timestamp,
      symbol: 'LUNA',
    };
  } catch (error) {
    console.error('Error fetching DIA LUNA price:', error);
    throw error;
  }
}

/**
 * Get LUNA price by symbol (alternative endpoint)
 */
async function getLUNAPriceBySymbol() {
  try {
    const response = await axios.get(
      \`\${DIA_API_BASE}/quotation/LUNA\`
    );

    const { Price, Time, Source } = response.data;
    const price = parseFloat(Price);
    const timestamp = new Date(Time);

    console.log(\`DIA LUNA Price: $\${price.toFixed(4)}\`);
    console.log(\`Data Source: \${Source}\`);

    return {
      price,
      source: Source,
      timestamp,
    };
  } catch (error) {
    console.error('Error fetching LUNA price by symbol:', error);
    throw error;
  }
}

/**
 * Get historical LUNA prices
 */
async function getLUNAHistoricalPrices(
  startTime: Date,
  endTime: Date,
  interval: string = '1h'
) {
  try {
    const response = await axios.get(
      \`\${DIA_API_BASE}/chartPoints/Terra/\${TERRA_ADDRESS}\`,
      {
        params: {
          starttime: Math.floor(startTime.getTime() / 1000),
          endtime: Math.floor(endTime.getTime() / 1000),
          interval,
        },
      }
    );

    const dataPoints = response.data;

    console.log(\`Retrieved \${dataPoints.length} historical data points\`);
    
    if (dataPoints.length > 0) {
      const latest = dataPoints[dataPoints.length - 1];
      console.log(\`Latest: $\${parseFloat(latest.Price).toFixed(4)} at \${new Date(latest.Time).toISOString()}\`);
    }

    return dataPoints.map((point: any) => ({
      price: parseFloat(point.Price),
      timestamp: new Date(point.Time),
    }));
  } catch (error) {
    console.error('Error fetching LUNA historical prices:', error);
    throw error;
  }
}

/**
 * Get LUNA supply data
 */
async function getLUNASupply() {
  try {
    const response = await axios.get(\`\${DIA_API_BASE}/supply/LUNA\`);

    const { CirculatingSupply, Source, Time } = response.data;
    const supply = parseFloat(CirculatingSupply);
    const timestamp = new Date(Time);

    console.log(\`LUNA Circulating Supply: \${supply.toLocaleString()}\`);
    console.log(\`Source: \${Source}\`);
    console.log(\`Updated: \${timestamp.toISOString()}\`);

    return {
      circulatingSupply: supply,
      source: Source,
      timestamp,
    };
  } catch (error) {
    console.error('Error fetching LUNA supply:', error);
    throw error;
  }
}

/**
 * Calculate LUNA market cap
 */
async function getLUNAMarketCap() {
  try {
    const [priceData, supplyData] = await Promise.all([
      getDIALUNAPrice(),
      getLUNASupply(),
    ]);

    const marketCap = priceData.price * supplyData.circulatingSupply;

    console.log(\`\\nLUNA Market Cap: $\${marketCap.toLocaleString()}\`);
    console.log(\`  Price: $\${priceData.price.toFixed(4)}\`);
    console.log(\`  Supply: \${supplyData.circulatingSupply.toLocaleString()} LUNA\`);

    return {
      marketCap,
      price: priceData.price,
      circulatingSupply: supplyData.circulatingSupply,
      timestamp: priceData.timestamp,
    };
  } catch (error) {
    console.error('Error calculating LUNA market cap:', error);
    throw error;
  }
}

/**
 * Get price statistics over a time period
 */
async function getLUNAPriceStats(days: number = 7) {
  try {
    const endTime = new Date();
    const startTime = new Date(endTime.getTime() - days * 24 * 60 * 60 * 1000);

    const historicalData = await getLUNAHistoricalPrices(
      startTime,
      endTime,
      '1h'
    );

    if (historicalData.length === 0) {
      throw new Error('No historical data available');
    }

    const prices = historicalData.map(d => d.price);
    const avgPrice = prices.reduce((a, b) => a + b, 0) / prices.length;
    const maxPrice = Math.max(...prices);
    const minPrice = Math.min(...prices);
    const volatility = ((maxPrice - minPrice) / avgPrice) * 100;
    
    const firstPrice = prices[0];
    const lastPrice = prices[prices.length - 1];
    const priceChange = lastPrice - firstPrice;
    const priceChangePercent = (priceChange / firstPrice) * 100;

    console.log(\`\\nLUNA \${days}-Day Price Statistics:\`);
    console.log(\`  Average: $\${avgPrice.toFixed(4)}\`);
    console.log(\`  High: $\${maxPrice.toFixed(4)}\`);
    console.log(\`  Low: $\${minPrice.toFixed(4)}\`);
    console.log(\`  Volatility: \${volatility.toFixed(2)}%\`);
    console.log(\`  Change: \${priceChange >= 0 ? '+' : ''}\${priceChange.toFixed(4)} (\${priceChangePercent.toFixed(2)}%)\`);

    return {
      days,
      avgPrice,
      maxPrice,
      minPrice,
      volatility,
      priceChange,
      priceChangePercent,
      dataPoints: historicalData.length,
    };
  } catch (error) {
    console.error('Error calculating LUNA price stats:', error);
    throw error;
  }
}

/**
 * Monitor LUNA price changes
 */
async function monitorLUNAPrice(
  callback: (price: number, change: number) => void,
  intervalMs: number = 30000
) {
  console.log('Starting DIA LUNA price monitoring...\\n');

  let lastPrice: number | null = null;

  setInterval(async () => {
    try {
      const data = await getDIALUNAPrice();
      
      if (lastPrice !== null) {
        const change = ((data.price - lastPrice) / lastPrice) * 100;
        console.log(
          \`Price: $\${data.price.toFixed(4)} (\${change >= 0 ? '+' : ''}\${change.toFixed(2)}%)\`
        );
        callback(data.price, change);
      } else {
        console.log(\`Initial price: $\${data.price.toFixed(4)}\`);
      }
      
      lastPrice = data.price;
    } catch (error) {
      console.error('Monitoring error:', error);
    }
  }, intervalMs);
}

/**
 * Compare DIA price with other sources
 */
async function comparePriceSource(otherSourcePrice: number, otherSourceName: string) {
  try {
    const diaData = await getDIALUNAPrice();
    
    const difference = Math.abs(diaData.price - otherSourcePrice);
    const differencePercent = (difference / otherSourcePrice) * 100;

    console.log(\`\\nPrice Comparison:\`);
    console.log(\`  DIA: $\${diaData.price.toFixed(4)}\`);
    console.log(\`  \${otherSourceName}: $\${otherSourcePrice.toFixed(4)}\`);
    console.log(\`  Difference: $\${difference.toFixed(4)} (\${differencePercent.toFixed(2)}%)\`);
    console.log(\`  Status: \${differencePercent < 1 ? '✅ Close' : '⚠️ Significant variance'}\`);

    return {
      diaPrice: diaData.price,
      otherSourcePrice,
      otherSourceName,
      difference,
      differencePercent,
    };
  } catch (error) {
    console.error('Error comparing price sources:', error);
    throw error;
  }
}

// Example usage
async function main() {
  console.log('Fetching LUNA data from DIA Oracle...\\n');

  // Current price
  const priceData = await getDIALUNAPrice();
  console.log(\`\\nCurrent LUNA Price: $\${priceData.price.toFixed(4)}\`);

  // Supply and market cap
  const marketCapData = await getLUNAMarketCap();
  console.log(\`Market Cap: $\${(marketCapData.marketCap / 1e9).toFixed(2)}B\`);

  // 7-day statistics
  const stats = await getLUNAPriceStats(7);
  console.log(\`\\n7-Day Volatility: \${stats.volatility.toFixed(2)}%\`);

  // Historical data
  const endTime = new Date();
  const startTime = new Date(endTime.getTime() - 24 * 60 * 60 * 1000);
  const historical = await getLUNAHistoricalPrices(startTime, endTime, '1h');
  console.log(\`\\nHistorical data points: \${historical.length}\`);
}

export {
  getDIALUNAPrice,
  getLUNAPriceBySymbol,
  getLUNAHistoricalPrices,
  getLUNASupply,
  getLUNAMarketCap,
  getLUNAPriceStats,
  monitorLUNAPrice,
  comparePriceSource,
  DIA_API_BASE,
};
    `.trim(),
  },

  notes: [
    'Fully open-source and transparent',
    'All methodologies publicly available',
    'Multi-exchange price aggregation (80+ sources)',
    'Free API with no authentication',
    'Historical price data available',
    'Supply and market cap endpoints',
    'Customizable feeds for enterprise',
    'CEX and DEX data sources',
  ],

  limitations: [
    'Slower update frequency (typically 2-5 minutes)',
    'Less real-time than Pyth or Band',
    'Limited to price and supply data',
    'No confidence intervals',
  ],

  alternatives: [
    'Pyth Network (for real-time feeds)',
    'Band Protocol (for Terra-native)',
    'Terra Oracle Module (for on-chain)',
    'CoinGecko (for market data)',
  ],
};

