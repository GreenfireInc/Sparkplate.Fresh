// DIA Oracle - Decentralized Information Asset Oracle
// Transparent, customizable oracle with open-source data

export const diaOracle = {
  name: 'DIA (Decentralized Information Asset)',
  blockchain: 'Ethereum (ETH)',
  type: 'Open-Source Oracle',
  
  description: `DIA is an open-source oracle platform providing transparent and customizable market price feeds for Ethereum and other blockchains. With verifiable and decentralized data sourcing, DIA offers transparent price calculation methodologies, historical data access, and customizable oracle feeds for DeFi applications requiring verifiable data provenance.`,

  features: [
    'Open-source and transparent',
    'Customizable oracle feeds',
    'Verifiable data sourcing',
    'Multi-exchange aggregation',
    'Historical data access',
    'NFT floor price feeds',
    'Real-world asset data',
    'Cross-chain deployment',
  ],

  api: {
    website: 'https://www.diadata.org/',
    documentation: 'https://docs.diadata.org/',
    apiEndpoint: 'https://api.diadata.org/v1',
    ethereumAPI: 'https://www.diadata.org/ethereum-api-oracle/',
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
    'DeFi price feeds with data transparency',
    'Custom oracle requirements',
    'NFT floor price tracking',
    'Real-world asset pricing',
    'Historical data analysis',
    'Multi-exchange price aggregation',
    'Verifiable data provenance',
  ],

  integration: {
    example: `
import axios from 'axios';

/**
 * DIA Oracle Integration for Ethereum
 * Open-source oracle with transparent data
 */

const DIA_API = {
  baseUrl: 'https://api.diadata.org/v1',
  quotation: '/quotation',
  supply: '/supply',
  chart: '/chartPoints',
};

/**
 * Get token price from DIA
 */
async function getDIAPrice(symbol: string): Promise<number> {
  try {
    const response = await axios.get(
      \`\${DIA_API.baseUrl}\${DIA_API.quotation}/\${symbol}\`
    );

    const data = response.data;

    console.log(\`DIA \${symbol} Price: $\${data.Price}\`);
    console.log(\`Symbol: \${data.Symbol}\`);
    console.log(\`Source: \${data.Source}\`);
    console.log(\`Timestamp: \${new Date(data.Time)}\`);

    return data.Price;
  } catch (error) {
    console.error('Error fetching DIA price:', error);
    throw error;
  }
}

/**
 * Get detailed quotation with metadata
 */
async function getDetailedQuotation(symbol: string) {
  try {
    const response = await axios.get(
      \`\${DIA_API.baseUrl}\${DIA_API.quotation}/\${symbol}\`
    );

    const data = response.data;

    return {
      symbol: data.Symbol,
      name: data.Name,
      price: data.Price,
      priceYesterday: data.PriceYesterday,
      volumeYesterdayUSD: data.VolumeYesterdayUSD,
      source: data.Source,
      timestamp: new Date(data.Time),
      change24h: ((data.Price - data.PriceYesterday) / data.PriceYesterday) * 100,
    };
  } catch (error) {
    console.error('Error fetching detailed quotation:', error);
    throw error;
  }
}

/**
 * Get supply information
 */
async function getSupplyInfo(symbol: string) {
  try {
    const response = await axios.get(
      \`\${DIA_API.baseUrl}\${DIA_API.supply}/\${symbol}\`
    );

    const data = response.data;

    console.log(\`Supply Info for \${symbol}:\`);
    console.log(\`  Circulating Supply: \${data.CirculatingSupply?.toLocaleString()}\`);
    console.log(\`  Total Supply: \${data.Supply?.toLocaleString()}\`);
    console.log(\`  Source: \${data.Source}\`);

    return {
      symbol: data.Symbol,
      circulatingSupply: data.CirculatingSupply,
      totalSupply: data.Supply,
      source: data.Source,
      timestamp: new Date(data.Time),
    };
  } catch (error) {
    console.error('Error fetching supply info:', error);
    throw error;
  }
}

/**
 * Get historical chart data
 */
async function getChartData(
  symbol: string,
  exchange: string = 'MAIR',
  startTime: number,
  endTime: number
) {
  try {
    const response = await axios.get(
      \`\${DIA_API.baseUrl}\${DIA_API.chart}/\${exchange}/\${symbol}\`,
      {
        params: {
          startTime,
          endTime,
        },
      }
    );

    const data = response.data;

    console.log(\`Chart data points: \${data.length}\`);
    
    if (data.length > 0) {
      console.log(\`First point: \${new Date(data[0].Time)}, Price: $\${data[0].Price}\`);
      console.log(\`Last point: \${new Date(data[data.length - 1].Time)}, Price: $\${data[data.length - 1].Price}\`);
    }

    return data.map((point: any) => ({
      timestamp: new Date(point.Time),
      price: point.Price,
    }));
  } catch (error) {
    console.error('Error fetching chart data:', error);
    throw error;
  }
}

/**
 * Get multiple token prices
 */
async function getMultiplePrices(symbols: string[]) {
  try {
    const prices = await Promise.all(
      symbols.map(async (symbol) => {
        try {
          const price = await getDIAPrice(symbol);
          return { symbol, price };
        } catch (error) {
          return { symbol, error: error.message };
        }
      })
    );

    return prices;
  } catch (error) {
    console.error('Error fetching multiple prices:', error);
    throw error;
  }
}

/**
 * Monitor price changes
 */
async function monitorPrice(
  symbol: string,
  callback: (price: number, change24h: number) => void,
  intervalMs: number = 60000
) {
  setInterval(async () => {
    try {
      const data = await getDetailedQuotation(symbol);
      callback(data.price, data.change24h);
    } catch (error) {
      console.error('Monitoring error:', error);
    }
  }, intervalMs);
}

/**
 * Get price with 24h change
 */
async function getPriceWithChange(symbol: string) {
  try {
    const data = await getDetailedQuotation(symbol);

    const change24h = data.change24h;
    const trend = change24h > 0 ? '📈' : change24h < 0 ? '📉' : '➡️';

    console.log(\`\\n\${symbol} Price: $\${data.price.toFixed(2)} \${trend}\`);
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
 * Calculate price statistics from historical data
 */
async function getPriceStatistics(
  symbol: string,
  days: number = 7
) {
  try {
    const endTime = Math.floor(Date.now() / 1000);
    const startTime = endTime - days * 24 * 60 * 60;

    const chartData = await getChartData(symbol, 'MAIR', startTime, endTime);

    const prices = chartData.map((point: any) => point.price);
    const avgPrice = prices.reduce((a: number, b: number) => a + b, 0) / prices.length;
    const maxPrice = Math.max(...prices);
    const minPrice = Math.min(...prices);
    const volatility = ((maxPrice - minPrice) / avgPrice) * 100;

    console.log(\`\\nPrice Statistics (\${days} days):\`);
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

// Example usage
async function main() {
  console.log('Fetching ETH price from DIA Oracle...');

  const ethPrice = await getDIAPrice('ETH');
  console.log(\`ETH Price: $\${ethPrice.toFixed(2)}\`);

  const ethDetails = await getDetailedQuotation('ETH');
  console.log('ETH Details:', ethDetails);

  const supplyInfo = await getSupplyInfo('ETH');
  console.log('ETH Supply:', supplyInfo);

  const multiplePrices = await getMultiplePrices(['ETH', 'BTC', 'USDC']);
  console.log('Multiple prices:', multiplePrices);

  const priceWithChange = await getPriceWithChange('ETH');
  console.log('ETH with 24h change:', priceWithChange);
}

export {
  getDIAPrice,
  getDetailedQuotation,
  getSupplyInfo,
  getChartData,
  getMultiplePrices,
  monitorPrice,
  getPriceWithChange,
  getPriceStatistics,
};
    `.trim(),
  },

  notes: [
    'Open-source with transparent methodologies',
    'Customizable oracle feeds',
    'Verifiable data provenance',
    'Multi-exchange aggregation',
    'Historical data access',
    'No API key required',
    'NFT floor price support',
    'Real-world asset data',
  ],

  limitations: [
    'Smaller data provider network',
    'Less documentation than Chainlink',
    'May have coverage gaps for niche tokens',
    'Update frequency varies by asset',
  ],

  alternatives: [
    'Chainlink',
    'Band Protocol',
    'RedStone',
    'API3',
  ],
};

