// DIA Oracle - Decentralized Information Asset for Litecoin
// Transparent, open-source oracle with customizable feeds

export const diaOracle = {
  name: 'DIA (Decentralized Information Asset)',
  blockchain: 'Litecoin (LTC)',
  type: 'Open-Source Oracle',
  
  description: `DIA is an open-source oracle platform providing transparent and customizable price feeds for Litecoin. With verifiable data sourcing and transparent calculation methodologies, DIA offers historical data access, multi-exchange aggregation, and customizable oracle feeds for applications requiring verifiable LTC price data.`,

  features: [
    'Open-source and transparent',
    'Customizable oracle feeds',
    'Verifiable data sourcing',
    'Multi-exchange aggregation',
    'Historical data access',
    'No API key required',
    'REST API access',
    'Transparent methodologies',
  ],

  api: {
    website: 'https://www.diadata.org/',
    documentation: 'https://docs.diadata.org/',
    apiEndpoint: 'https://api.diadata.org/v1',
    ltcPriceFeed: 'https://api.diadata.org/v1/quotation/LTC',
    explorer: 'https://www.diadata.org/app/price/',
  },

  sdk: {
    primaryPackage: 'axios (REST API)',
    installCommand: 'npm install axios',
    supportedLanguages: ['TypeScript', 'JavaScript', 'Python', 'Go'],
  },

  socialMedia: {
    website: 'https://www.diadata.org/',
    twitter: 'https://twitter.com/DIAdata_org',
    telegram: 'https://t.me/DIAdata_org',
    discord: 'https://discord.gg/diaoracle',
    github: 'https://github.com/diadata-org',
    medium: 'https://medium.com/dia-insights',
  },

  useCases: [
    'Transparent LTC price feeds',
    'Historical price analysis',
    'Multi-exchange price comparison',
    'Verifiable data provenance',
    'Market research and analytics',
    'Price trend analysis',
    'Trading strategy development',
  ],

  integration: {
    example: `
import axios from 'axios';

/**
 * DIA Oracle Integration for Litecoin
 * Open-source oracle with transparent data
 */

const DIA_API = {
  baseUrl: 'https://api.diadata.org/v1',
  quotation: '/quotation',
  supply: '/supply',
  chart: '/chartPoints',
};

/**
 * Get LTC price from DIA
 */
async function getDIALTCPrice(): Promise<number> {
  try {
    const response = await axios.get(\`\${DIA_API.baseUrl}\${DIA_API.quotation}/LTC\`);

    const data = response.data;

    console.log(\`DIA LTC Price: $\${data.Price}\`);
    console.log(\`Symbol: \${data.Symbol}\`);
    console.log(\`Source: \${data.Source}\`);
    console.log(\`Timestamp: \${new Date(data.Time)}\`);

    return data.Price;
  } catch (error) {
    console.error('Error fetching DIA LTC price:', error);
    throw error;
  }
}

/**
 * Get detailed LTC quotation with metadata
 */
async function getDetailedLTCQuotation() {
  try {
    const response = await axios.get(\`\${DIA_API.baseUrl}\${DIA_API.quotation}/LTC\`);

    const data = response.data;

    const change24h = data.PriceYesterday 
      ? ((data.Price - data.PriceYesterday) / data.PriceYesterday) * 100
      : 0;

    return {
      symbol: data.Symbol,
      name: data.Name,
      price: data.Price,
      priceYesterday: data.PriceYesterday,
      volumeYesterdayUSD: data.VolumeYesterdayUSD,
      source: data.Source,
      timestamp: new Date(data.Time),
      change24h,
    };
  } catch (error) {
    console.error('Error fetching detailed quotation:', error);
    throw error;
  }
}

/**
 * Get LTC supply information
 */
async function getLTCSupplyInfo() {
  try {
    const response = await axios.get(\`\${DIA_API.baseUrl}\${DIA_API.supply}/LTC\`);

    const data = response.data;

    console.log(\`LTC Supply Info:\`);
    console.log(\`  Circulating Supply: \${data.CirculatingSupply?.toLocaleString()}\`);
    console.log(\`  Total Supply: \${data.Supply?.toLocaleString()}\`);
    console.log(\`  Max Supply: 84,000,000 LTC\`);
    console.log(\`  Source: \${data.Source}\`);

    return {
      symbol: data.Symbol,
      circulatingSupply: data.CirculatingSupply,
      totalSupply: data.Supply,
      maxSupply: 84000000,
      source: data.Source,
      timestamp: new Date(data.Time),
    };
  } catch (error) {
    console.error('Error fetching supply info:', error);
    throw error;
  }
}

/**
 * Get historical LTC price data
 */
async function getHistoricalLTCPrices(
  exchange: string = 'MAIR',
  startTime: number,
  endTime: number
) {
  try {
    const response = await axios.get(
      \`\${DIA_API.baseUrl}\${DIA_API.chart}/\${exchange}/LTC\`,
      {
        params: {
          startTime,
          endTime,
        },
      }
    );

    const data = response.data;

    console.log(\`Historical data points: \${data.length}\`);
    
    if (data.length > 0) {
      console.log(\`First point: \${new Date(data[0].Time)}, Price: $\${data[0].Price}\`);
      console.log(\`Last point: \${new Date(data[data.length - 1].Time)}, Price: $\${data[data.length - 1].Price}\`);
    }

    return data.map((point: any) => ({
      timestamp: new Date(point.Time),
      price: point.Price,
    }));
  } catch (error) {
    console.error('Error fetching historical prices:', error);
    throw error;
  }
}

/**
 * Get LTC price with 24h change
 */
async function getLTCPriceWithChange() {
  try {
    const data = await getDetailedLTCQuotation();

    const change24h = data.change24h;
    const trend = change24h > 0 ? '📈' : change24h < 0 ? '📉' : '➡️';

    console.log(\`\\nLTC Price: $\${data.price.toFixed(2)} \${trend}\`);
    console.log(\`24h Change: \${change24h.toFixed(2)}%\`);
    console.log(\`24h Volume: $\${data.volumeYesterdayUSD.toLocaleString()}\`);

    return {
      symbol: data.symbol,
      price: data.price,
      change24h,
      volume24h: data.volumeYesterdayUSD,
      trend,
    };
  } catch (error) {
    console.error('Error fetching price with change:', error);
    throw error;
  }
}

/**
 * Monitor LTC price
 */
async function monitorLTCPrice(
  callback: (price: number, change24h: number) => void,
  intervalMs: number = 60000
) {
  setInterval(async () => {
    try {
      const data = await getDetailedLTCQuotation();
      callback(data.price, data.change24h);
    } catch (error) {
      console.error('Monitoring error:', error);
    }
  }, intervalMs);
}

/**
 * Calculate price statistics from historical data
 */
async function getLTCPriceStatistics(days: number = 7) {
  try {
    const endTime = Math.floor(Date.now() / 1000);
    const startTime = endTime - days * 24 * 60 * 60;

    const chartData = await getHistoricalLTCPrices('MAIR', startTime, endTime);

    const prices = chartData.map((point: any) => point.price);
    const avgPrice = prices.reduce((a: number, b: number) => a + b, 0) / prices.length;
    const maxPrice = Math.max(...prices);
    const minPrice = Math.min(...prices);
    const volatility = ((maxPrice - minPrice) / avgPrice) * 100;

    console.log(\`\\nLTC Price Statistics (\${days} days):\`);
    console.log(\`  Average: $\${avgPrice.toFixed(2)}\`);
    console.log(\`  High: $\${maxPrice.toFixed(2)}\`);
    console.log(\`  Low: $\${minPrice.toFixed(2)}\`);
    console.log(\`  Volatility: \${volatility.toFixed(2)}%\`);

    return {
      period: days,
      avgPrice,
      maxPrice,
      minPrice,
      volatility,
      dataPoints: prices.length,
    };
  } catch (error) {
    console.error('Error calculating statistics:', error);
    throw error;
  }
}

/**
 * Get market cap information
 */
async function getLTCMarketCap() {
  try {
    const [priceData, supplyData] = await Promise.all([
      getDIALTCPrice(),
      getLTCSupplyInfo(),
    ]);

    const marketCap = priceData * supplyData.circulatingSupply;
    const maxMarketCap = priceData * supplyData.maxSupply;

    console.log(\`\\nLTC Market Information:\`);
    console.log(\`  Price: $\${priceData.toFixed(2)}\`);
    console.log(\`  Market Cap: $\${marketCap.toLocaleString()}\`);
    console.log(\`  Fully Diluted Market Cap: $\${maxMarketCap.toLocaleString()}\`);
    console.log(\`  Circulating Supply: \${supplyData.circulatingSupply.toLocaleString()} LTC\`);
    console.log(\`  Max Supply: 84,000,000 LTC\`);

    return {
      price: priceData,
      marketCap,
      maxMarketCap,
      circulatingSupply: supplyData.circulatingSupply,
      maxSupply: supplyData.maxSupply,
    };
  } catch (error) {
    console.error('Error fetching market cap:', error);
    throw error;
  }
}

// Example usage
async function main() {
  console.log('Fetching LTC price from DIA Oracle...\\n');

  const ltcPrice = await getDIALTCPrice();
  console.log(\`\\nLTC Price: $\${ltcPrice.toFixed(2)}\`);

  const ltcDetails = await getDetailedLTCQuotation();
  console.log('\\nLTC Details:', ltcDetails);

  const supplyInfo = await getLTCSupplyInfo();
  console.log('\\nLTC Supply:', supplyInfo);

  const priceWithChange = await getLTCPriceWithChange();
  console.log('\\nLTC with 24h change:', priceWithChange);

  const marketCap = await getLTCMarketCap();
  console.log('\\nLTC Market Cap:', marketCap);
}

export {
  getDIALTCPrice,
  getDetailedLTCQuotation,
  getLTCSupplyInfo,
  getHistoricalLTCPrices,
  getLTCPriceWithChange,
  monitorLTCPrice,
  getLTCPriceStatistics,
  getLTCMarketCap,
};
    `.trim(),
  },

  notes: [
    'Open-source with transparent methodologies',
    'No API key required',
    'Historical data available',
    'Multi-exchange aggregation',
    'Verifiable data provenance',
    'Supply information included',
    'Market cap calculations',
    'REST API access',
  ],

  limitations: [
    'Update frequency varies (typically minutes)',
    'Limited to price and supply data',
    'No real-time blockchain data',
    'Smaller data provider network than Chainlink',
  ],

  alternatives: [
    'Pyth (for faster updates)',
    'RedStone (for modular feeds)',
    'CoinGecko (for comprehensive market data)',
    'Chainlink (via wrapped LTC)',
  ],
};

