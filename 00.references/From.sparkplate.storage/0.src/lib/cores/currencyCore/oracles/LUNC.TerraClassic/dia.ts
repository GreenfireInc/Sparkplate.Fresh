// DIA - Open-Source Oracle with Transparent Methodologies
// Multi-source price aggregation with full transparency for LUNC

export const diaOracle = {
  name: 'DIA (Decentralized Information Asset)',
  blockchain: 'Terra Classic (LUNC)',
  type: 'Open-Source Oracle Platform',
  
  description: `DIA provides fully transparent, open-source price feeds for Terra Classic (LUNC) with data sourced from 80+ centralized and decentralized exchanges. All methodologies, data sources, and pricing algorithms are publicly available, making DIA ideal for community projects requiring auditability. DIA continues to support LUNC post-collapse, offering historical data for the May 2022 event and ongoing price tracking for the revival effort.`,

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
    luncPrice: 'https://api.diadata.org/v1/assetQuotation/TerraClassic/0x0000000000000000000000000000000000000000',
    priceApp: 'https://www.diadata.org/app/price/asset/TerraClassic/0x0000000000000000000000000000000000000000/',
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
    assetQuotation: 'https://api.diadata.org/v1/assetQuotation/TerraClassic/0x0000000000000000000000000000000000000000',
    historicalPrices: 'https://api.diadata.org/v1/chartPoints/TerraClassic/0x0000000000000000000000000000000000000000',
    supply: 'https://api.diadata.org/v1/supply/LUNC',
  },

  useCases: [
    'Transparent price feeds',
    'Auditable data sources',
    'Historical collapse analysis',
    'Community recovery tracking',
    'Multi-source price validation',
    'Research and analytics',
    'Supply monitoring',
  ],

  integration: {
    example: `
import axios from 'axios';

/**
 * DIA Oracle Integration for Terra Classic (LUNC)
 * Open-source, transparent price feeds with multi-exchange aggregation
 */

const DIA_API_BASE = 'https://api.diadata.org/v1';
const TERRA_CLASSIC_ADDRESS = '0x0000000000000000000000000000000000000000';

/**
 * Get current LUNC price from DIA
 */
async function getDIALUNCPrice() {
  try {
    const response = await axios.get(
      \`\${DIA_API_BASE}/assetQuotation/TerraClassic/\${TERRA_CLASSIC_ADDRESS}\`
    );

    const { Price, Time, Source } = response.data;
    const price = parseFloat(Price);
    const timestamp = new Date(Time);

    console.log(\`DIA LUNC/USD Price: $\${price.toFixed(8)}\`);
    console.log(\`Source: \${Source}\`);
    console.log(\`Timestamp: \${timestamp.toISOString()}\`);

    return {
      price,
      source: Source,
      timestamp,
      symbol: 'LUNC',
    };
  } catch (error) {
    console.error('Error fetching DIA LUNC price:', error);
    throw error;
  }
}

/**
 * Get LUNC price by symbol (alternative endpoint)
 */
async function getLUNCPriceBySymbol() {
  try {
    const response = await axios.get(\`\${DIA_API_BASE}/quotation/LUNC\`);

    const { Price, Time, Source } = response.data;
    const price = parseFloat(Price);
    const timestamp = new Date(Time);

    console.log(\`DIA LUNC Price: $\${price.toFixed(8)}\`);
    console.log(\`Data Source: \${Source}\`);

    return {
      price,
      source: Source,
      timestamp,
    };
  } catch (error) {
    console.error('Error fetching LUNC price by symbol:', error);
    throw error;
  }
}

/**
 * Get historical LUNC prices (including collapse period)
 */
async function getLUNCHistoricalPrices(
  startTime: Date,
  endTime: Date,
  interval: string = '1h'
) {
  try {
    const response = await axios.get(
      \`\${DIA_API_BASE}/chartPoints/TerraClassic/\${TERRA_CLASSIC_ADDRESS}\`,
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
      console.log(\`Latest: $\${parseFloat(latest.Price).toFixed(8)} at \${new Date(latest.Time).toISOString()}\`);
    }

    return dataPoints.map((point: any) => ({
      price: parseFloat(point.Price),
      timestamp: new Date(point.Time),
    }));
  } catch (error) {
    console.error('Error fetching LUNC historical prices:', error);
    throw error;
  }
}

/**
 * Get LUNC supply data (track post-collapse inflation)
 */
async function getLUNCSupply() {
  try {
    const response = await axios.get(\`\${DIA_API_BASE}/supply/LUNC\`);

    const { CirculatingSupply, Source, Time } = response.data;
    const supply = parseFloat(CirculatingSupply);
    const timestamp = new Date(Time);

    console.log(\`LUNC Circulating Supply: \${(supply / 1e12).toFixed(2)}T\`);
    console.log(\`Source: \${Source}\`);
    console.log(\`Updated: \${timestamp.toISOString()}\`);

    return {
      circulatingSupply: supply,
      circulatingSupplyTrillions: supply / 1e12,
      source: Source,
      timestamp,
    };
  } catch (error) {
    console.error('Error fetching LUNC supply:', error);
    throw error;
  }
}

/**
 * Calculate LUNC market cap
 */
async function getLUNCMarketCap() {
  try {
    const [priceData, supplyData] = await Promise.all([
      getDIALUNCPrice(),
      getLUNCSupply(),
    ]);

    const marketCap = priceData.price * supplyData.circulatingSupply;

    console.log(\`\\nLUNC Market Cap: $\${(marketCap / 1e9).toFixed(2)}B\`);
    console.log(\`  Price: $\${priceData.price.toFixed(8)}\`);
    console.log(\`  Supply: \${supplyData.circulatingSupplyTrillions.toFixed(2)}T LUNC\`);

    return {
      marketCap,
      price: priceData.price,
      circulatingSupply: supplyData.circulatingSupply,
      timestamp: priceData.timestamp,
    };
  } catch (error) {
    console.error('Error calculating LUNC market cap:', error);
    throw error;
  }
}

/**
 * Track May 2022 collapse (historical analysis)
 */
async function analyzeCollapsePeriod() {
  try {
    // May 2022 collapse period
    const startDate = new Date('2022-05-05');
    const endDate = new Date('2022-05-15');

    const historicalData = await getLUNCHistoricalPrices(startDate, endDate, '1h');

    if (historicalData.length === 0) {
      console.log('No historical data available for collapse period');
      return null;
    }

    const prices = historicalData.map(d => d.price);
    const startPrice = prices[0];
    const endPrice = prices[prices.length - 1];
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const priceDropPercent = ((startPrice - endPrice) / startPrice) * 100;

    console.log(\`\\nMay 2022 Collapse Analysis:\`);
    console.log(\`  Start Price: $\${startPrice.toFixed(4)}\`);
    console.log(\`  End Price: $\${endPrice.toFixed(8)}\`);
    console.log(\`  Low: $\${minPrice.toFixed(8)}\`);
    console.log(\`  High: $\${maxPrice.toFixed(4)}\`);
    console.log(\`  Drop: \${priceDropPercent.toFixed(2)}%\`);

    return {
      startPrice,
      endPrice,
      minPrice,
      maxPrice,
      priceDropPercent,
      dataPoints: historicalData.length,
    };
  } catch (error) {
    console.error('Error analyzing collapse period:', error);
    throw error;
  }
}

/**
 * Monitor LUNC price changes
 */
async function monitorLUNCPrice(
  callback: (price: number, change: number) => void,
  intervalMs: number = 30000
) {
  console.log('Starting DIA LUNC price monitoring...\\n');

  let lastPrice: number | null = null;

  setInterval(async () => {
    try {
      const data = await getDIALUNCPrice();
      
      if (lastPrice !== null) {
        const change = ((data.price - lastPrice) / lastPrice) * 100;
        console.log(
          \`Price: $\${data.price.toFixed(8)} (\${change >= 0 ? '+' : ''}\${change.toFixed(2)}%)\`
        );
        callback(data.price, change);
      } else {
        console.log(\`Initial price: $\${data.price.toFixed(8)}\`);
      }
      
      lastPrice = data.price;
    } catch (error) {
      console.error('Monitoring error:', error);
    }
  }, intervalMs);
}

// Example usage
async function main() {
  console.log('Fetching LUNC data from DIA Oracle...\\n');

  // Current price
  const priceData = await getDIALUNCPrice();
  console.log(\`\\nCurrent LUNC Price: $\${priceData.price.toFixed(8)}\`);

  // Supply and market cap
  const marketCapData = await getLUNCMarketCap();
  console.log(\`Market Cap: $\${(marketCapData.marketCap / 1e9).toFixed(2)}B\`);

  // Historical collapse analysis
  await analyzeCollapsePeriod();
}

export {
  getDIALUNCPrice,
  getLUNCPriceBySymbol,
  getLUNCHistoricalPrices,
  getLUNCSupply,
  getLUNCMarketCap,
  analyzeCollapsePeriod,
  monitorLUNCPrice,
  DIA_API_BASE,
};
    `.trim(),
  },

  notes: [
    'Fully open-source and transparent',
    'All methodologies publicly available',
    'Multi-exchange price aggregation (80+ sources)',
    'Free API with no authentication',
    'Historical data includes May 2022 collapse',
    'Supply and market cap endpoints',
    'Customizable feeds for enterprise',
    'Useful for post-collapse analysis',
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
    'Terra Classic Oracle Module (for on-chain)',
    'CoinGecko (for market data)',
  ],

  historicalSignificance: `
    DIA's transparent and historical data makes it particularly valuable for analyzing
    the May 2022 Terra Classic collapse. Researchers and community members can access
    price data from before, during, and after the UST de-peg event that caused LUNC
    to lose over 99.99% of its value and its supply to inflate from ~350M to 6.9T tokens.
  `,
};

