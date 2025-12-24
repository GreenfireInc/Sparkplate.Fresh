// DIA - Customizable Decentralized Oracle for Tron
// Transparent price feeds from 90+ markets supporting 3,000+ tokens

export const diaOracle = {
  name: 'DIA',
  blockchain: 'Tron (TRX)',
  type: 'Decentralized Information Asset Oracle',
  
  description: `DIA (Decentralized Information Asset) provides customizable, transparent, and decentralized price feeds for the Tron blockchain. With data aggregated from over 90 markets and supporting 3,000+ tokens across 35+ blockchains, DIA offers verifiable, free-of-charge real-time oracles for TRX and Tron-native assets. The oracle enables lending protocols, margin trading, stablecoin pegging, and comprehensive DeFi functionalities with transparent methodologies and customizable data feeds.`,

  features: [
    'Customizable price oracles',
    '90+ data source markets',
    '3,000+ supported tokens',
    'Transparent methodology',
    'Free API access',
    'REST and GraphQL APIs',
    'OHLC candlestick data',
    'Historical price data',
  ],

  api: {
    website: 'https://www.diadata.org/',
    documentation: 'https://docs.diadata.org/',
    tronPriceApp: 'https://www.diadata.org/app/price/asset/Tron/0x0000000000000000000000000000000000000000/',
    restAPI: 'https://api.diadata.org/v1',
    graphqlAPI: 'https://api.diadata.org/graphql',
  },

  sdk: {
    primaryPackage: 'axios (REST API)',
    alternativePackage: 'graphql-request (GraphQL)',
    installCommand: 'npm install axios',
    supportedLanguages: ['Any (REST API)', 'TypeScript', 'JavaScript', 'Python'],
  },

  socialMedia: {
    website: 'https://www.diadata.org/',
    twitter: 'https://twitter.com/DIAdata_org',
    discord: 'https://discord.com/invite/diaoracles',
    telegram: 'https://t.me/DIAdata_org',
    github: 'https://github.com/diadata-org',
    medium: 'https://medium.com/dia-insights',
  },

  useCases: [
    'Real-time TRX price feeds',
    'Customizable oracle solutions',
    'Lending and borrowing rates',
    'Stablecoin price pegging',
    'Historical price analysis',
    'Supply data tracking',
    'Market analytics',
    'DeFi protocol integration',
  ],

  integration: {
    example: `
import axios from 'axios';

/**
 * DIA Oracle Integration for Tron (TRX)
 * Customizable and transparent price feeds
 */

const DIA_API = 'https://api.diadata.org/v1';
const TRX_ADDRESS = '0x0000000000000000000000000000000000000000';

interface DIAPrice {
  symbol: string;
  name: string;
  address: string;
  blockchain: string;
  price: number;
  priceYesterday: number;
  volumeYesterdayUSD: number;
  time: string;
  source: string;
}

/**
 * Get TRX price from DIA
 */
async function getDIATRXPrice(): Promise<DIAPrice> {
  try {
    const response = await axios.get(
      \`\${DIA_API}/assetQuotation/Tron/\${TRX_ADDRESS}\`
    );

    const data = response.data;

    console.log(\`DIA TRX Price: $\${data.price.toFixed(6)}\`);
    console.log(\`  Previous Day: $\${data.priceYesterday.toFixed(6)}\`);
    console.log(\`  24h Change: \${(((data.price - data.priceYesterday) / data.priceYesterday) * 100).toFixed(2)}%\`);
    console.log(\`  Volume 24h: $\${data.volumeYesterdayUSD.toLocaleString()}\`);
    console.log(\`  Updated: \${data.time}\`);

    return data;
  } catch (error) {
    console.error('Error fetching DIA TRX price:', error);
    throw error;
  }
}

/**
 * Get price by symbol (alternative method)
 */
async function getTRXPriceBySymbol(): Promise<DIAPrice> {
  try {
    const response = await axios.get(\`\${DIA_API}/quotation/TRX\`);
    const data = response.data;

    console.log(\`DIA TRX Price: $\${data.price.toFixed(6)}\`);

    return data;
  } catch (error) {
    console.error('Error fetching TRX price by symbol:', error);
    throw error;
  }
}

/**
 * Get OHLC (candlestick) data
 */
async function getTRXOHLCData(
  startTime: number,
  endTime: number,
  interval: string = '1h'
): Promise<any[]> {
  try {
    const response = await axios.get(
      \`\${DIA_API}/ohlc/Tron/\${TRX_ADDRESS}\`,
      {
        params: {
          startTime,
          endTime,
          interval,
        },
      }
    );

    const ohlcData = response.data;

    console.log(\`\\nTRX OHLC Data (\${ohlcData.length} candles):\`);
    
    if (ohlcData.length > 0) {
      const latest = ohlcData[ohlcData.length - 1];
      console.log(\`Latest Candle:\`);
      console.log(\`  Time: \${latest.time}\`);
      console.log(\`  Open: $\${latest.open.toFixed(6)}\`);
      console.log(\`  High: $\${latest.high.toFixed(6)}\`);
      console.log(\`  Low: $\${latest.low.toFixed(6)}\`);
      console.log(\`  Close: $\${latest.close.toFixed(6)}\`);
      console.log(\`  Volume: \${latest.volume.toLocaleString()}\`);
    }

    return ohlcData;
  } catch (error) {
    console.error('Error fetching OHLC data:', error);
    throw error;
  }
}

/**
 * Get supply data for TRX
 */
async function getTRXSupplyData(): Promise<any> {
  try {
    const response = await axios.get(
      \`\${DIA_API}/supply/Tron/\${TRX_ADDRESS}\`
    );

    const supplyData = response.data;

    console.log(\`\\nTRX Supply Data:\`);
    console.log(\`  Circulating Supply: \${supplyData.circulatingSupply?.toLocaleString() || 'N/A'}\`);
    console.log(\`  Total Supply: \${supplyData.supply?.toLocaleString() || 'N/A'}\`);

    return supplyData;
  } catch (error) {
    console.error('Error fetching supply data:', error);
    throw error;
  }
}

/**
 * Get historical prices using GraphQL
 */
async function getHistoricalPrices(
  startTime: Date,
  endTime: Date = new Date()
): Promise<any[]> {
  try {
    const query = \`
      query GetHistoricalPrices($symbol: String!, $startTime: DateTime!, $endTime: DateTime!) {
        allQuotations(
          condition: { symbol: $symbol }
          filter: {
            time: { greaterThan: $startTime, lessThan: $endTime }
          }
          orderBy: TIME_ASC
        ) {
          nodes {
            symbol
            price
            time
            source
          }
        }
      }
    \`;

    const response = await axios.post(\`\${DIA_API.replace('/v1', '')}/graphql\`, {
      query,
      variables: {
        symbol: 'TRX',
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
      },
    });

    if (response.data.errors) {
      throw new Error(JSON.stringify(response.data.errors));
    }

    const prices = response.data.data.allQuotations?.nodes || [];

    console.log(\`\\nHistorical Prices: \${prices.length} data points\`);

    return prices;
  } catch (error) {
    console.error('Error fetching historical prices:', error);
    return [];
  }
}

/**
 * Get multiple asset prices
 */
async function getMultiplePrices(
  assets: Array<{ blockchain: string; address: string; symbol: string }>
): Promise<{ [symbol: string]: number }> {
  const prices: { [symbol: string]: number } = {};

  await Promise.all(
    assets.map(async (asset) => {
      try {
        const response = await axios.get(
          \`\${DIA_API}/assetQuotation/\${asset.blockchain}/\${asset.address}\`
        );
        prices[asset.symbol] = response.data.price;
      } catch (error) {
        console.error(\`Error fetching \${asset.symbol}:\`, error);
        prices[asset.symbol] = 0;
      }
    })
  );

  console.log('\\nDIA Multi-Asset Prices:');
  Object.entries(prices).forEach(([symbol, price]) => {
    console.log(\`  \${symbol}: $\${price.toFixed(6)}\`);
  });

  return prices;
}

/**
 * Monitor TRX price changes
 */
async function monitorDIATRXPrice(
  callback: (price: number, change: number) => void,
  intervalMs: number = 60000
) {
  console.log('Starting DIA TRX price monitoring...\\n');

  let lastPrice: number | null = null;

  setInterval(async () => {
    try {
      const data = await getDIATRXPrice();
      
      if (lastPrice !== null) {
        const change = ((data.price - lastPrice) / lastPrice) * 100;
        console.log(
          \`TRX: $\${data.price.toFixed(6)} (\${change >= 0 ? '+' : ''}\${change.toFixed(2)}%)\`
        );
        callback(data.price, change);
      } else {
        console.log(\`Initial TRX price: $\${data.price.toFixed(6)}\`);
      }
      
      lastPrice = data.price;
    } catch (error) {
      console.error('Monitoring error:', error);
    }
  }, intervalMs);
}

/**
 * Calculate price statistics
 */
function calculatePriceStats(prices: number[]): {
  min: number;
  max: number;
  avg: number;
  median: number;
  volatility: number;
} {
  if (prices.length === 0) {
    return { min: 0, max: 0, avg: 0, median: 0, volatility: 0 };
  }

  const sorted = [...prices].sort((a, b) => a - b);
  const min = sorted[0];
  const max = sorted[sorted.length - 1];
  const avg = prices.reduce((sum, p) => sum + p, 0) / prices.length;
  const median = sorted[Math.floor(sorted.length / 2)];
  
  // Calculate standard deviation (volatility)
  const variance = prices.reduce((sum, p) => sum + Math.pow(p - avg, 2), 0) / prices.length;
  const volatility = Math.sqrt(variance);

  console.log(\`\\nPrice Statistics:\`);
  console.log(\`  Min: $\${min.toFixed(6)}\`);
  console.log(\`  Max: $\${max.toFixed(6)}\`);
  console.log(\`  Average: $\${avg.toFixed(6)}\`);
  console.log(\`  Median: $\${median.toFixed(6)}\`);
  console.log(\`  Volatility: $\${volatility.toFixed(6)}\`);

  return { min, max, avg, median, volatility };
}

// Example usage
async function main() {
  console.log('Fetching TRX data from DIA oracle...\\n');

  // Get current price
  const price = await getDIATRXPrice();
  console.log(\`\\nCurrent Price: $\${price.price.toFixed(6)}\`);

  // Get OHLC data for last 24 hours
  const now = Math.floor(Date.now() / 1000);
  const yesterday = now - 86400;
  await getTRXOHLCData(yesterday, now, '1h');

  // Get supply data
  await getTRXSupplyData();

  // Get multiple prices
  const assets = [
    { blockchain: 'Bitcoin', address: TRX_ADDRESS, symbol: 'BTC' },
    { blockchain: 'Ethereum', address: TRX_ADDRESS, symbol: 'ETH' },
    { blockchain: 'Tron', address: TRX_ADDRESS, symbol: 'TRX' },
  ];
  await getMultiplePrices(assets);
}

export {
  getDIATRXPrice,
  getTRXPriceBySymbol,
  getTRXOHLCData,
  getTRXSupplyData,
  getHistoricalPrices,
  getMultiplePrices,
  monitorDIATRXPrice,
  calculatePriceStats,
  DIA_API,
  TRX_ADDRESS,
};
    `.trim(),
  },

  notes: [
    'Transparent and customizable oracle',
    'Free API access (REST + GraphQL)',
    'Data from 90+ markets',
    '3,000+ tokens supported',
    'OHLC and historical data',
    'Supply tracking available',
    'No API key required',
    'Ideal for custom oracle needs',
  ],

  limitations: [
    'Update frequency may vary by asset',
    'Rate limits on free tier',
    'Some endpoints may have delays',
    'GraphQL requires more complex queries',
  ],

  alternatives: [
    'Chainlink (for official oracle feeds)',
    'SunSwap (for DEX-based pricing)',
    'CoinGecko (for market data)',
    'TronGrid (for blockchain data)',
  ],
};

