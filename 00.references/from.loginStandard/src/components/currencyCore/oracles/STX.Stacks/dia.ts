// DIA - Customizable Decentralized Oracle for Stacks
// Transparent price feeds from 90+ markets supporting 3,000+ tokens

export const diaOracle = {
  name: 'DIA',
  blockchain: 'Stacks (STX)',
  type: 'Decentralized Information Asset Oracle',
  
  description: `DIA (Decentralized Information Asset) provides customizable, transparent, and decentralized price feeds for the Stacks blockchain. With data aggregated from over 90 markets and supporting 3,000+ tokens across 35+ blockchains, DIA offers verifiable, free-of-charge real-time oracles for STX and Stacks-native assets. The oracle enables lending protocols, margin trading, stablecoin pegging, and comprehensive DeFi functionalities on Bitcoin's Layer 2.`,

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
    stacksGuide: 'https://nexus.diadata.org/how-to-guides/fetch-price-data/chain-specific-guide/stacks',
    restAPI: 'https://api.diadata.org/v1',
    graphqlAPI: 'https://api.diadata.org/graphql',
    priceApp: 'https://www.diadata.org/app/price/',
  },

  sdk: {
    primaryPackage: 'axios (REST API)',
    alternativePackage: 'graphql-request (GraphQL)',
    installCommand: 'npm install axios',
    supportedLanguages: ['Any (REST API)', 'TypeScript', 'JavaScript', 'Python', 'Clarity'],
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
    'Real-time STX price feeds',
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
 * DIA Oracle Integration for Stacks (STX)
 * Customizable and transparent price feeds
 */

const DIA_API = 'https://api.diadata.org/v1';
const STX_ADDRESS = '0x0000000000000000000000000000000000000000';

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
 * Get STX price from DIA
 */
async function getDIASTXPrice(): Promise<DIAPrice> {
  try {
    const response = await axios.get(
      \`\${DIA_API}/assetQuotation/Stacks/\${STX_ADDRESS}\`
    );

    const data = response.data;

    console.log(\`DIA STX Price: $\${data.price.toFixed(4)}\`);
    console.log(\`  Previous Day: $\${data.priceYesterday.toFixed(4)}\`);
    console.log(\`  24h Change: \${(((data.price - data.priceYesterday) / data.priceYesterday) * 100).toFixed(2)}%\`);
    console.log(\`  Volume 24h: $\${data.volumeYesterdayUSD.toLocaleString()}\`);
    console.log(\`  Updated: \${data.time}\`);

    return data;
  } catch (error) {
    console.error('Error fetching DIA STX price:', error);
    throw error;
  }
}

/**
 * Get price by symbol (alternative method)
 */
async function getSTXPriceBySymbol(): Promise<DIAPrice> {
  try {
    const response = await axios.get(\`\${DIA_API}/quotation/STX\`);
    const data = response.data;

    console.log(\`DIA STX Price: $\${data.price.toFixed(4)}\`);

    return data;
  } catch (error) {
    console.error('Error fetching STX price by symbol:', error);
    throw error;
  }
}

/**
 * Get OHLC (candlestick) data
 */
async function getSTXOHLCData(
  startTime: number,
  endTime: number,
  interval: string = '1h'
): Promise<any[]> {
  try {
    const response = await axios.get(
      \`\${DIA_API}/ohlc/Stacks/\${STX_ADDRESS}\`,
      {
        params: {
          startTime,
          endTime,
          interval,
        },
      }
    );

    const ohlcData = response.data;

    console.log(\`\\nSTX OHLC Data (\${ohlcData.length} candles):\`);
    
    if (ohlcData.length > 0) {
      const latest = ohlcData[ohlcData.length - 1];
      console.log(\`Latest Candle:\`);
      console.log(\`  Time: \${latest.time}\`);
      console.log(\`  Open: $\${latest.open.toFixed(4)}\`);
      console.log(\`  High: $\${latest.high.toFixed(4)}\`);
      console.log(\`  Low: $\${latest.low.toFixed(4)}\`);
      console.log(\`  Close: $\${latest.close.toFixed(4)}\`);
      console.log(\`  Volume: \${latest.volume.toLocaleString()}\`);
    }

    return ohlcData;
  } catch (error) {
    console.error('Error fetching OHLC data:', error);
    throw error;
  }
}

/**
 * Get supply data for STX
 */
async function getSTXSupplyData(): Promise<any> {
  try {
    const response = await axios.get(
      \`\${DIA_API}/supply/Stacks/\${STX_ADDRESS}\`
    );

    const supplyData = response.data;

    console.log(\`\\nSTX Supply Data:\`);
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
        symbol: 'STX',
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
    console.log(\`  \${symbol}: $\${price.toFixed(4)}\`);
  });

  return prices;
}

/**
 * Monitor STX price changes
 */
async function monitorDIASTXPrice(
  callback: (price: number, change: number) => void,
  intervalMs: number = 60000
) {
  console.log('Starting DIA STX price monitoring...\\n');

  let lastPrice: number | null = null;

  setInterval(async () => {
    try {
      const data = await getDIASTXPrice();
      
      if (lastPrice !== null) {
        const change = ((data.price - lastPrice) / lastPrice) * 100;
        console.log(
          \`STX: $\${data.price.toFixed(4)} (\${change >= 0 ? '+' : ''}\${change.toFixed(2)}%)\`
        );
        callback(data.price, change);
      } else {
        console.log(\`Initial STX price: $\${data.price.toFixed(4)}\`);
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
  console.log(\`  Min: $\${min.toFixed(4)}\`);
  console.log(\`  Max: $\${max.toFixed(4)}\`);
  console.log(\`  Average: $\${avg.toFixed(4)}\`);
  console.log(\`  Median: $\${median.toFixed(4)}\`);
  console.log(\`  Volatility: $\${volatility.toFixed(4)}\`);

  return { min, max, avg, median, volatility };
}

// Example usage
async function main() {
  console.log('Fetching STX data from DIA oracle...\\n');

  // Get current price
  const price = await getDIASTXPrice();
  console.log(\`\\nCurrent Price: $\${price.price.toFixed(4)}\`);

  // Get OHLC data for last 24 hours
  const now = Math.floor(Date.now() / 1000);
  const yesterday = now - 86400;
  await getSTXOHLCData(yesterday, now, '1h');

  // Get supply data
  await getSTXSupplyData();

  // Get multiple prices
  const assets = [
    { blockchain: 'Bitcoin', address: STX_ADDRESS, symbol: 'BTC' },
    { blockchain: 'Ethereum', address: STX_ADDRESS, symbol: 'ETH' },
    { blockchain: 'Stacks', address: STX_ADDRESS, symbol: 'STX' },
  ];
  await getMultiplePrices(assets);
}

export {
  getDIASTXPrice,
  getSTXPriceBySymbol,
  getSTXOHLCData,
  getSTXSupplyData,
  getHistoricalPrices,
  getMultiplePrices,
  monitorDIASTXPrice,
  calculatePriceStats,
  DIA_API,
  STX_ADDRESS,
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
    'Pyth Network (for high-frequency feeds)',
    'ALEX (for DEX-based pricing)',
    'CoinGecko (for market data)',
    'Hiro API (for blockchain data)',
  ],
};

