// CoinGecko API - Market Data for Dogecoin
// Type: Price API / Market Data
// Blockchain: Multi-chain (Dogecoin support)

export const coingeckoOracle = {
  name: "CoinGecko",
  blockchain: "Multi-chain",
  type: "Price API / Market Data",
  description: "Provides pricing and market data including DOGE from DEXs and CEXs. Highly reliable market data aggregator with comprehensive cryptocurrency information.",
  
  url: "https://www.coingecko.com/",
  dogecoinPage: "https://www.coingecko.com/en/coins/dogecoin",
  docs: "https://docs.coingecko.com/",
  
  api: {
    baseURL: "https://api.coingecko.com/api/v3",
    priceEndpoint: "https://api.coingecko.com/api/v3/simple/price?ids=dogecoin&vs_currencies=usd",
    dogecoinId: "dogecoin",
    documentation: "https://docs.coingecko.com/reference/introduction",
    dexAPI: "https://www.coingecko.com/en/api/dex",
    rateLimit: "10-50 calls/minute (free tier), no key required for basic endpoints",
  },
  
  sdk: {
    npm: "axios",
    installation: "npm install axios",
    documentation: "https://docs.coingecko.com/",
    features: [
      "Real-time DOGE price feeds",
      "Historical price data",
      "Market cap and volume data",
      "DEX and CEX aggregation",
      "Multi-currency conversion",
      "24h/7d/30d price changes",
    ],
  },
  
  integration: {
    example: `
// CoinGecko API Integration Example for Dogecoin
import axios from 'axios';

const COINGECKO_API_BASE = 'https://api.coingecko.com/api/v3';

// Get DOGE price
async function getDogecoinPrice() {
  try {
    const response = await axios.get(
      \`\${COINGECKO_API_BASE}/simple/price?ids=dogecoin&vs_currencies=usd,eur,btc,eth\`
    );
    
    const priceData = response.data.dogecoin;
    console.log('DOGE Price (USD):', priceData.usd);
    console.log('DOGE Price (EUR):', priceData.eur);
    console.log('DOGE Price (BTC):', priceData.btc);
    console.log('DOGE Price (ETH):', priceData.eth);
    
    return priceData;
  } catch (error) {
    console.error('Error fetching Dogecoin price:', error);
    throw error;
  }
}

// Get detailed market data
async function getDogecoinMarketData() {
  try {
    const response = await axios.get(
      \`\${COINGECKO_API_BASE}/coins/dogecoin\`
    );
    
    const data = response.data;
    console.log('DOGE Market Data:', {
      price: data.market_data.current_price.usd,
      marketCap: data.market_data.market_cap.usd,
      volume24h: data.market_data.total_volume.usd,
      priceChange24h: data.market_data.price_change_percentage_24h,
      priceChange7d: data.market_data.price_change_percentage_7d,
      priceChange30d: data.market_data.price_change_percentage_30d,
      ath: data.market_data.ath.usd,
      atl: data.market_data.atl.usd,
    });
    
    return data.market_data;
  } catch (error) {
    console.error('Error fetching Dogecoin market data:', error);
    throw error;
  }
}

// Get historical price data
async function getHistoricalPrice(days: number = 7) {
  try {
    const response = await axios.get(
      \`\${COINGECKO_API_BASE}/coins/dogecoin/market_chart?vs_currency=usd&days=\${days}\`
    );
    
    const prices = response.data.prices.map(([timestamp, price]: [number, number]) => ({
      timestamp: new Date(timestamp).toISOString(),
      price
    }));
    
    console.log(\`Historical DOGE Prices (Last \${days} days):\`, prices);
    return prices;
  } catch (error) {
    console.error('Error fetching historical price:', error);
    throw error;
  }
}

// Get historical price at specific date
async function getHistoricalPriceAtDate(date: string) {
  try {
    // Date format: dd-mm-yyyy
    const response = await axios.get(
      \`\${COINGECKO_API_BASE}/coins/dogecoin/history?date=\${date}\`
    );
    
    const price = response.data.market_data.current_price.usd;
    console.log(\`DOGE Price on \${date}: $\${price}\`);
    
    return price;
  } catch (error) {
    console.error('Error fetching historical price:', error);
    throw error;
  }
}

// Get OHLC data
async function getOHLCData(days: number = 7) {
  try {
    const response = await axios.get(
      \`\${COINGECKO_API_BASE}/coins/dogecoin/ohlc?vs_currency=usd&days=\${days}\`
    );
    
    const ohlcData = response.data.map(([timestamp, open, high, low, close]: number[]) => ({
      timestamp: new Date(timestamp).toISOString(),
      open,
      high,
      low,
      close
    }));
    
    console.log('DOGE OHLC Data:', ohlcData);
    return ohlcData;
  } catch (error) {
    console.error('Error fetching OHLC data:', error);
    throw error;
  }
}

// Get market chart with volume
async function getMarketChartWithVolume(days: number = 7) {
  try {
    const response = await axios.get(
      \`\${COINGECKO_API_BASE}/coins/dogecoin/market_chart?vs_currency=usd&days=\${days}\`
    );
    
    const { prices, market_caps, total_volumes } = response.data;
    
    const chartData = prices.map(([timestamp, price]: [number, number], index: number) => ({
      timestamp: new Date(timestamp).toISOString(),
      price,
      marketCap: market_caps[index][1],
      volume: total_volumes[index][1]
    }));
    
    console.log('DOGE Market Chart:', chartData);
    return chartData;
  } catch (error) {
    console.error('Error fetching market chart:', error);
    throw error;
  }
}

// Usage
getDogecoinPrice().then(data => console.log('DOGE Price:', data));
getDogecoinMarketData().then(data => console.log('Market Data:', data));
getHistoricalPrice(30).then(prices => console.log('30-day prices:', prices));
getHistoricalPriceAtDate('15-10-2025').then(price => console.log('Historical price:', price));
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/coingecko",
    telegram: "https://t.me/coingecko",
    discord: "https://discord.gg/coingecko",
    reddit: "https://www.reddit.com/r/coingecko/",
    linkedin: "https://www.linkedin.com/company/coingecko/",
    instagram: "https://www.instagram.com/coingecko/",
  },
  
  features: {
    multiCurrency: true,
    historicalData: true,
    realTime: true,
    marketData: true,
    dexData: true,
    cexData: true,
    freeAccess: true,
    noKeyRequired: true,
  },
  
  supportedData: [
    "DOGE price in 50+ fiat and crypto currencies",
    "Market capitalization",
    "24h trading volume",
    "Price change percentages (24h, 7d, 14d, 30d, 1y)",
    "All-time high/low",
    "Historical OHLC data",
    "Supply information",
    "DEX and CEX trading data",
  ],
  
  dataAggregation: {
    exchanges: "500+ CEXs and DEXs",
    updateFrequency: "Real-time (every few minutes)",
    methodology: "Volume-weighted aggregation",
  },
  
  notes: [
    "No API key required for basic endpoints",
    "Most reliable source for DOGE price data",
    "Aggregates from 500+ exchanges",
    "Free tier: 10-50 calls/minute",
    "Pro tier available for higher limits",
    "Comprehensive historical data available",
    "OHLC candlestick data support",
    "Multi-currency conversion support",
    "DEX and CEX data aggregation",
    "Widely used by wallets, exchanges, and analytics platforms",
  ],
  
  useCases: [
    "Real-time price feeds for wallets",
    "Trading bots and automation",
    "Market analytics and charting",
    "Portfolio tracking",
    "Historical data analysis",
    "Price alerts and notifications",
  ],
  
  apiEndpoints: {
    simplePrice: "/simple/price?ids=dogecoin&vs_currencies=usd",
    coinData: "/coins/dogecoin",
    marketChart: "/coins/dogecoin/market_chart?vs_currency=usd&days={days}",
    historicalData: "/coins/dogecoin/history?date={dd-mm-yyyy}",
    ohlc: "/coins/dogecoin/ohlc?vs_currency=usd&days={days}",
    tickers: "/coins/dogecoin/tickers",
  },
};

