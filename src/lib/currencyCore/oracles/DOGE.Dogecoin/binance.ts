// Binance API - Exchange Data for Dogecoin
// Type: Centralized Exchange API
// Blockchain: Multi-chain (Dogecoin support)

export const binanceOracle = {
  name: "Binance",
  blockchain: "Multi-chain",
  type: "Centralized Exchange API",
  description: "Major cryptocurrency exchange API providing real-time DOGE trading data, order book depth, and market information. High-frequency data updates.",
  
  url: "https://www.binance.com/",
  dogecoinTradingPair: "https://www.binance.com/en/trade/DOGE_USDT",
  docs: "https://binance-docs.github.io/apidocs/",
  
  api: {
    baseURL: "https://api.binance.com/api/v3",
    priceEndpoint: "https://api.binance.com/api/v3/ticker/price?symbol=DOGEUSDT",
    documentation: "https://binance-docs.github.io/apidocs/spot/en/",
    websocketAPI: "wss://stream.binance.com:9443/ws/dogeusdt@trade",
    rateLimit: "1200 requests per minute (weight-based)",
  },
  
  sdk: {
    npm: "axios",
    officialSDK: "binance-api-node",
    installation: "npm install axios binance-api-node",
    documentation: "https://binance-docs.github.io/apidocs/spot/en/",
    features: [
      "Real-time DOGE price feeds",
      "Order book depth data",
      "Trade history",
      "24h ticker statistics",
      "Kline/candlestick data",
      "WebSocket streaming",
    ],
  },
  
  integration: {
    example: `
// Binance API Integration Example for Dogecoin
import axios from 'axios';

const BINANCE_API_BASE = 'https://api.binance.com/api/v3';

// Get DOGE price
async function getDOGEPrice() {
  try {
    const response = await axios.get(
      \`\${BINANCE_API_BASE}/ticker/price?symbol=DOGEUSDT\`
    );
    
    const price = parseFloat(response.data.price);
    console.log('DOGE/USDT Price:', price);
    
    return price;
  } catch (error) {
    console.error('Error fetching DOGE price from Binance:', error);
    throw error;
  }
}

// Get 24h ticker statistics
async function get24hTicker() {
  try {
    const response = await axios.get(
      \`\${BINANCE_API_BASE}/ticker/24hr?symbol=DOGEUSDT\`
    );
    
    const data = response.data;
    console.log('24h Ticker:', {
      symbol: data.symbol,
      priceChange: data.priceChange,
      priceChangePercent: data.priceChangePercent,
      lastPrice: data.lastPrice,
      volume: data.volume,
      quoteVolume: data.quoteVolume,
      highPrice: data.highPrice,
      lowPrice: data.lowPrice,
      openPrice: data.openPrice,
    });
    
    return data;
  } catch (error) {
    console.error('Error fetching 24h ticker:', error);
    throw error;
  }
}

// Get order book depth
async function getOrderBook(limit: number = 100) {
  try {
    const response = await axios.get(
      \`\${BINANCE_API_BASE}/depth?symbol=DOGEUSDT&limit=\${limit}\`
    );
    
    const { bids, asks } = response.data;
    console.log('Order Book:', {
      topBid: bids[0],
      topAsk: asks[0],
      bidDepth: bids.length,
      askDepth: asks.length,
    });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching order book:', error);
    throw error;
  }
}

// Get recent trades
async function getRecentTrades(limit: number = 100) {
  try {
    const response = await axios.get(
      \`\${BINANCE_API_BASE}/trades?symbol=DOGEUSDT&limit=\${limit}\`
    );
    
    const trades = response.data.map((trade: any) => ({
      id: trade.id,
      price: parseFloat(trade.price),
      quantity: parseFloat(trade.qty),
      time: new Date(trade.time).toISOString(),
      isBuyerMaker: trade.isBuyerMaker,
    }));
    
    console.log('Recent Trades:', trades.slice(0, 5));
    return trades;
  } catch (error) {
    console.error('Error fetching recent trades:', error);
    throw error;
  }
}

// Get kline/candlestick data
async function getKlineData(interval: string = '1h', limit: number = 100) {
  try {
    const response = await axios.get(
      \`\${BINANCE_API_BASE}/klines?symbol=DOGEUSDT&interval=\${interval}&limit=\${limit}\`
    );
    
    const klines = response.data.map((kline: any[]) => ({
      openTime: new Date(kline[0]).toISOString(),
      open: parseFloat(kline[1]),
      high: parseFloat(kline[2]),
      low: parseFloat(kline[3]),
      close: parseFloat(kline[4]),
      volume: parseFloat(kline[5]),
      closeTime: new Date(kline[6]).toISOString(),
      quoteVolume: parseFloat(kline[7]),
      trades: kline[8],
    }));
    
    console.log(\`Kline Data (\${interval}):\`, klines.slice(0, 5));
    return klines;
  } catch (error) {
    console.error('Error fetching kline data:', error);
    throw error;
  }
}

// Get average price
async function getAveragePrice() {
  try {
    const response = await axios.get(
      \`\${BINANCE_API_BASE}/avgPrice?symbol=DOGEUSDT\`
    );
    
    const avgPrice = parseFloat(response.data.price);
    console.log('5-min Average Price:', avgPrice);
    
    return avgPrice;
  } catch (error) {
    console.error('Error fetching average price:', error);
    throw error;
  }
}

// WebSocket streaming (conceptual)
function streamDOGEPrice() {
  const ws = new WebSocket('wss://stream.binance.com:9443/ws/dogeusdt@trade');
  
  ws.onmessage = (event) => {
    const trade = JSON.parse(event.data);
    console.log('Real-time Trade:', {
      price: trade.p,
      quantity: trade.q,
      time: new Date(trade.T).toISOString(),
    });
  };
  
  ws.onerror = (error) => {
    console.error('WebSocket error:', error);
  };
  
  return ws;
}

// Usage
getDOGEPrice().then(price => console.log('Current Price:', price));
get24hTicker().then(ticker => console.log('24h Stats:', ticker));
getOrderBook(20).then(book => console.log('Order Book:', book));
getKlineData('1h', 24).then(klines => console.log('Hourly Klines:', klines));
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/binance",
    telegram: "https://t.me/binance_announcements",
    discord: "https://discord.gg/binance",
    reddit: "https://www.reddit.com/r/binance/",
    linkedin: "https://www.linkedin.com/company/binance/",
    facebook: "https://www.facebook.com/binance",
    instagram: "https://www.instagram.com/binance/",
  },
  
  features: {
    realTime: true,
    highFrequency: true,
    orderBook: true,
    tradeHistory: true,
    candlestickData: true,
    websocketStreaming: true,
    freeAccess: true,
  },
  
  supportedData: [
    "Real-time DOGE/USDT price",
    "24h price change and statistics",
    "Order book depth (bids/asks)",
    "Recent trades",
    "Kline/candlestick data (1m to 1M intervals)",
    "Trading volume",
    "Average price",
  ],
  
  tradingPairs: [
    "DOGEUSDT",
    "DOGEBUSD",
    "DOGEBTC",
    "DOGEETH",
    "DOGEEUR",
  ],
  
  dataAggregation: {
    source: "Binance Exchange",
    updateFrequency: "Real-time (sub-second via WebSocket)",
    methodology: "Direct exchange data",
  },
  
  notes: [
    "Largest cryptocurrency exchange by volume",
    "High-frequency real-time data",
    "No API key required for public endpoints",
    "Rate limit: 1200 requests/minute (weight-based)",
    "WebSocket streaming for real-time updates",
    "Multiple DOGE trading pairs available",
    "Kline intervals: 1m, 3m, 5m, 15m, 30m, 1h, 2h, 4h, 6h, 8h, 12h, 1d, 3d, 1w, 1M",
    "Order book depth up to 5000 levels",
    "Historical data available",
    "Widely used for trading automation and bots",
  ],
  
  useCases: [
    "Trading bots and automation",
    "Real-time price tracking",
    "Market making and arbitrage",
    "Technical analysis and charting",
    "Order book analysis",
    "Volume analysis",
  ],
  
  apiEndpoints: {
    price: "/ticker/price?symbol=DOGEUSDT",
    ticker24h: "/ticker/24hr?symbol=DOGEUSDT",
    orderBook: "/depth?symbol=DOGEUSDT&limit={limit}",
    recentTrades: "/trades?symbol=DOGEUSDT&limit={limit}",
    klines: "/klines?symbol=DOGEUSDT&interval={interval}&limit={limit}",
    avgPrice: "/avgPrice?symbol=DOGEUSDT",
  },
  
  websocketStreams: {
    trade: "wss://stream.binance.com:9443/ws/dogeusdt@trade",
    kline: "wss://stream.binance.com:9443/ws/dogeusdt@kline_{interval}",
    ticker: "wss://stream.binance.com:9443/ws/dogeusdt@ticker",
    depth: "wss://stream.binance.com:9443/ws/dogeusdt@depth",
  },
};

