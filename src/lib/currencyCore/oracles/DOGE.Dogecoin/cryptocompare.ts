// CryptoCompare API - Crypto Data for Dogecoin
// Type: Price API / Market Data
// Blockchain: Multi-chain (Dogecoin support)

export const cryptocompareOracle = {
  name: "CryptoCompare",
  blockchain: "Multi-chain",
  type: "Price API / Market Data",
  description: "Comprehensive cryptocurrency data API providing DOGE price feeds, historical data, and market information from multiple exchanges.",
  
  url: "https://www.cryptocompare.com/",
  dogecoinPage: "https://www.cryptocompare.com/coins/doge/",
  docs: "https://min-api.cryptocompare.com/documentation",
  
  api: {
    baseURL: "https://min-api.cryptocompare.com/data",
    priceEndpoint: "https://min-api.cryptocompare.com/data/price?fsym=DOGE&tsyms=USD",
    documentation: "https://min-api.cryptocompare.com/documentation",
    rateLimit: "Free tier available, rate limits based on plan",
  },
  
  sdk: {
    npm: "axios",
    installation: "npm install axios",
    documentation: "https://min-api.cryptocompare.com/documentation",
    features: [
      "Real-time DOGE price feeds",
      "Historical OHLCV data",
      "Multi-exchange aggregation",
      "Trading signals",
      "Social stats",
      "News aggregation",
    ],
  },
  
  integration: {
    example: `
// CryptoCompare API Integration Example for Dogecoin
import axios from 'axios';

const CRYPTOCOMPARE_BASE = 'https://min-api.cryptocompare.com/data';
const API_KEY = 'YOUR_API_KEY'; // Optional but recommended

// Get DOGE price
async function getDOGEPrice(toCurrencies: string[] = ['USD', 'EUR', 'BTC', 'ETH']) {
  try {
    const tsyms = toCurrencies.join(',');
    const response = await axios.get(
      \`\${CRYPTOCOMPARE_BASE}/price?fsym=DOGE&tsyms=\${tsyms}\`,
      { headers: { authorization: \`Apikey \${API_KEY}\` } }
    );
    
    console.log('DOGE Price:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching DOGE price:', error);
    throw error;
  }
}

// Get multiple prices with additional info
async function getDOGEPriceFull(toCurrencies: string[] = ['USD', 'EUR']) {
  try {
    const tsyms = toCurrencies.join(',');
    const response = await axios.get(
      \`\${CRYPTOCOMPARE_BASE}/pricemultifull?fsyms=DOGE&tsyms=\${tsyms}\`,
      { headers: { authorization: \`Apikey \${API_KEY}\` } }
    );
    
    const dogeData = response.data.RAW.DOGE;
    console.log('DOGE Full Price Data:', dogeData);
    
    return dogeData;
  } catch (error) {
    console.error('Error fetching full price data:', error);
    throw error;
  }
}

// Get historical daily data
async function getHistoricalDaily(days: number = 30, toCurrency: string = 'USD') {
  try {
    const response = await axios.get(
      \`\${CRYPTOCOMPARE_BASE}/v2/histoday?fsym=DOGE&tsym=\${toCurrency}&limit=\${days}\`,
      { headers: { authorization: \`Apikey \${API_KEY}\` } }
    );
    
    const data = response.data.Data.Data.map((day: any) => ({
      time: new Date(day.time * 1000).toISOString(),
      open: day.open,
      high: day.high,
      low: day.low,
      close: day.close,
      volumeFrom: day.volumefrom,
      volumeTo: day.volumeto,
    }));
    
    console.log(\`Historical Daily Data (\${days} days):\`, data);
    return data;
  } catch (error) {
    console.error('Error fetching historical daily data:', error);
    throw error;
  }
}

// Get historical hourly data
async function getHistoricalHourly(hours: number = 24, toCurrency: string = 'USD') {
  try {
    const response = await axios.get(
      \`\${CRYPTOCOMPARE_BASE}/v2/histohour?fsym=DOGE&tsym=\${toCurrency}&limit=\${hours}\`,
      { headers: { authorization: \`Apikey \${API_KEY}\` } }
    );
    
    const data = response.data.Data.Data.map((hour: any) => ({
      time: new Date(hour.time * 1000).toISOString(),
      open: hour.open,
      high: hour.high,
      low: hour.low,
      close: hour.close,
      volumeFrom: hour.volumefrom,
      volumeTo: hour.volumeto,
    }));
    
    console.log(\`Historical Hourly Data (\${hours} hours):\`, data);
    return data;
  } catch (error) {
    console.error('Error fetching historical hourly data:', error);
    throw error;
  }
}

// Get historical minute data
async function getHistoricalMinute(minutes: number = 60, toCurrency: string = 'USD') {
  try {
    const response = await axios.get(
      \`\${CRYPTOCOMPARE_BASE}/v2/histominute?fsym=DOGE&tsym=\${toCurrency}&limit=\${minutes}\`,
      { headers: { authorization: \`Apikey \${API_KEY}\` } }
    );
    
    const data = response.data.Data.Data.map((minute: any) => ({
      time: new Date(minute.time * 1000).toISOString(),
      open: minute.open,
      high: minute.high,
      low: minute.low,
      close: minute.close,
      volumeFrom: minute.volumefrom,
      volumeTo: minute.volumeto,
    }));
    
    console.log(\`Historical Minute Data (\${minutes} minutes):\`, data);
    return data;
  } catch (error) {
    console.error('Error fetching historical minute data:', error);
    throw error;
  }
}

// Get top exchanges by volume
async function getTopExchanges(toCurrency: string = 'USD', limit: number = 10) {
  try {
    const response = await axios.get(
      \`\${CRYPTOCOMPARE_BASE}/top/exchanges?fsym=DOGE&tsym=\${toCurrency}&limit=\${limit}\`,
      { headers: { authorization: \`Apikey \${API_KEY}\` } }
    );
    
    console.log('Top Exchanges:', response.data.Data);
    return response.data.Data;
  } catch (error) {
    console.error('Error fetching top exchanges:', error);
    throw error;
  }
}

// Get social stats
async function getSocialStats() {
  try {
    const response = await axios.get(
      \`\${CRYPTOCOMPARE_BASE}/social/coin/latest?coinId=4432\`, // 4432 is DOGE's ID
      { headers: { authorization: \`Apikey \${API_KEY}\` } }
    );
    
    console.log('Social Stats:', response.data.Data);
    return response.data.Data;
  } catch (error) {
    console.error('Error fetching social stats:', error);
    throw error;
  }
}

// Get news
async function getNews(limit: number = 10) {
  try {
    const response = await axios.get(
      \`\${CRYPTOCOMPARE_BASE}/v2/news/?categories=DOGE&limit=\${limit}\`,
      { headers: { authorization: \`Apikey \${API_KEY}\` } }
    );
    
    console.log('Latest News:', response.data.Data);
    return response.data.Data;
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
}

// Usage
getDOGEPrice(['USD', 'EUR', 'BTC']).then(price => console.log('Price:', price));
getDOGEPriceFull(['USD']).then(data => console.log('Full Data:', data));
getHistoricalDaily(30, 'USD').then(data => console.log('30-day history:', data));
getHistoricalHourly(24, 'USD').then(data => console.log('24-hour history:', data));
getTopExchanges('USD', 10).then(exchanges => console.log('Top exchanges:', exchanges));
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/cryptocompare",
    telegram: "https://t.me/CryptoCompare",
    linkedin: "https://www.linkedin.com/company/cryptocompare/",
    facebook: "https://www.facebook.com/CryptoCompare",
  },
  
  features: {
    realTime: true,
    historicalData: true,
    ohlcvData: true,
    socialStats: true,
    newsAggregation: true,
    multiExchange: true,
    tradingSignals: true,
  },
  
  supportedData: [
    "Real-time DOGE prices",
    "Historical OHLCV data (minute, hour, day)",
    "Multi-exchange aggregation",
    "Trading volume",
    "Market cap",
    "Social statistics",
    "News aggregation",
    "Top exchanges by volume",
    "Trading pairs",
  ],
  
  dataAggregation: {
    exchanges: "200+ exchanges",
    updateFrequency: "Real-time",
    methodology: "Volume-weighted average",
  },
  
  notes: [
    "API key recommended but not required for basic endpoints",
    "Free tier available with rate limits",
    "Historical data: minute, hourly, daily",
    "Social stats and news aggregation",
    "Multi-exchange support",
    "OHLCV candlestick data",
    "Trading signals available",
    "Widely used in crypto analytics",
    "Rate limits vary by subscription tier",
    "WebSocket API available for streaming data",
  ],
  
  useCases: [
    "Price tracking and monitoring",
    "Historical data analysis",
    "Trading bots and automation",
    "Portfolio management",
    "Market research",
    "Social sentiment analysis",
    "News tracking",
  ],
  
  apiEndpoints: {
    price: "/price?fsym=DOGE&tsyms={currencies}",
    priceFull: "/pricemultifull?fsyms=DOGE&tsyms={currencies}",
    histoday: "/v2/histoday?fsym=DOGE&tsym={currency}&limit={days}",
    histohour: "/v2/histohour?fsym=DOGE&tsym={currency}&limit={hours}",
    histominute: "/v2/histominute?fsym=DOGE&tsym={currency}&limit={minutes}",
    topExchanges: "/top/exchanges?fsym=DOGE&tsym={currency}&limit={limit}",
    socialStats: "/social/coin/latest?coinId=4432",
    news: "/v2/news/?categories=DOGE&limit={limit}",
  },
};

