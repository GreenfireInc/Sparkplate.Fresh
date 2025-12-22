// CoinGecko API - Ethereum Classic Price and Market Data
// Comprehensive cryptocurrency market data API with excellent ETC coverage

export const coingeckoOracle = {
  name: 'CoinGecko',
  blockchain: 'Ethereum Classic (ETC)',
  type: 'Market Data API',
  
  description: `CoinGecko provides comprehensive cryptocurrency market data including real-time prices, historical data, market capitalization, trading volume, and exchange information for Ethereum Classic. It aggregates data from hundreds of exchanges and is one of the most reliable sources for ETC pricing information.`,

  features: [
    'Real-time ETC price data across multiple currencies',
    'Historical price data (daily, hourly, minute-level)',
    'Market cap and trading volume statistics',
    '24-hour price change percentages',
    'Exchange listing information',
    'OHLCV (Open, High, Low, Close, Volume) data',
    'Circulating supply and max supply data',
    'Free API with generous rate limits',
  ],

  api: {
    baseUrl: 'https://api.coingecko.com/api/v3',
    documentation: 'https://www.coingecko.com/en/api/documentation',
    coinId: 'ethereum-classic',
    rateLimit: '10-50 calls/minute (free tier)',
    apiKeyRequired: false,
  },

  sdk: {
    primaryPackage: 'axios',
    installCommand: 'npm install axios',
    supportedLanguages: ['TypeScript', 'JavaScript', 'Python', 'Ruby', 'Go'],
  },

  socialMedia: {
    website: 'https://www.coingecko.com/',
    twitter: 'https://twitter.com/coingecko',
    telegram: 'https://t.me/coingecko',
    discord: 'https://discord.gg/coingecko',
    facebook: 'https://www.facebook.com/coingecko',
    reddit: 'https://www.reddit.com/r/coingecko/',
  },

  useCases: [
    'Real-time ETC price display in wallets',
    'Portfolio tracking and valuation',
    'Historical price charts and analytics',
    'Market data for trading applications',
    'Price alerts and notifications',
    'Exchange comparison and arbitrage',
    'Market research and analysis',
  ],

  integration: {
    example: `
import axios from 'axios';

/**
 * CoinGecko API Integration for Ethereum Classic
 */

const COINGECKO_API = {
  baseUrl: 'https://api.coingecko.com/api/v3',
  coinId: 'ethereum-classic',
};

/**
 * Get current ETC price in multiple currencies
 */
async function getETCPrice(currencies: string[] = ['usd', 'btc', 'eth']): Promise<any> {
  try {
    const response = await axios.get(
      \`\${COINGECKO_API.baseUrl}/simple/price\`,
      {
        params: {
          ids: COINGECKO_API.coinId,
          vs_currencies: currencies.join(','),
          include_24hr_change: true,
          include_market_cap: true,
          include_24hr_vol: true,
        },
      }
    );
    
    const data = response.data['ethereum-classic'];
    
    console.log('ETC Price (USD):', data.usd);
    console.log('24h Change:', data.usd_24h_change?.toFixed(2) + '%');
    console.log('Market Cap:', data.usd_market_cap?.toLocaleString());
    console.log('24h Volume:', data.usd_24h_vol?.toLocaleString());
    
    return data;
  } catch (error) {
    console.error('Error fetching ETC price from CoinGecko:', error);
    throw error;
  }
}

/**
 * Get comprehensive market data for ETC
 */
async function getETCMarketData() {
  try {
    const response = await axios.get(
      \`\${COINGECKO_API.baseUrl}/coins/\${COINGECKO_API.coinId}\`,
      {
        params: {
          localization: false,
          tickers: false,
          community_data: false,
          developer_data: false,
        },
      }
    );
    
    const marketData = response.data.market_data;
    
    return {
      currentPrice: marketData.current_price,
      marketCap: marketData.market_cap,
      totalVolume: marketData.total_volume,
      priceChange24h: marketData.price_change_percentage_24h,
      priceChange7d: marketData.price_change_percentage_7d,
      priceChange30d: marketData.price_change_percentage_30d,
      circulatingSupply: marketData.circulating_supply,
      totalSupply: marketData.total_supply,
      maxSupply: marketData.max_supply,
      ath: marketData.ath,
      athDate: marketData.ath_date,
      atl: marketData.atl,
      atlDate: marketData.atl_date,
    };
  } catch (error) {
    console.error('Error fetching ETC market data:', error);
    throw error;
  }
}

/**
 * Get historical price data for ETC
 */
async function getETCHistoricalPrice(days: number = 7, interval?: 'daily') {
  try {
    const response = await axios.get(
      \`\${COINGECKO_API.baseUrl}/coins/\${COINGECKO_API.coinId}/market_chart\`,
      {
        params: {
          vs_currency: 'usd',
          days,
          interval,
        },
      }
    );
    
    const prices = response.data.prices.map(([timestamp, price]: [number, number]) => ({
      timestamp: new Date(timestamp),
      price,
    }));
    
    const volumes = response.data.total_volumes.map(([timestamp, volume]: [number, number]) => ({
      timestamp: new Date(timestamp),
      volume,
    }));
    
    const marketCaps = response.data.market_caps.map(([timestamp, marketCap]: [number, number]) => ({
      timestamp: new Date(timestamp),
      marketCap,
    }));
    
    return { prices, volumes, marketCaps };
  } catch (error) {
    console.error('Error fetching historical price data:', error);
    throw error;
  }
}

/**
 * Get OHLC (Open, High, Low, Close) data
 */
async function getETCOHLC(days: number = 7) {
  try {
    const response = await axios.get(
      \`\${COINGECKO_API.baseUrl}/coins/\${COINGECKO_API.coinId}/ohlc\`,
      {
        params: {
          vs_currency: 'usd',
          days,
        },
      }
    );
    
    const ohlcData = response.data.map(([timestamp, open, high, low, close]: number[]) => ({
      timestamp: new Date(timestamp),
      open,
      high,
      low,
      close,
    }));
    
    console.log(\`OHLC data for last \${days} days:`, ohlcData.length, 'entries');
    return ohlcData;
  } catch (error) {
    console.error('Error fetching OHLC data:', error);
    throw error;
  }
}

/**
 * Get exchange tickers for ETC
 */
async function getETCTickers() {
  try {
    const response = await axios.get(
      \`\${COINGECKO_API.baseUrl}/coins/\${COINGECKO_API.coinId}/tickers\`,
      {
        params: {
          include_exchange_logo: true,
        },
      }
    );
    
    const tickers = response.data.tickers.map((ticker: any) => ({
      exchange: ticker.market.name,
      pair: ticker.base + '/' + ticker.target,
      price: ticker.last,
      volume: ticker.volume,
      trustScore: ticker.trust_score,
      tradeUrl: ticker.trade_url,
    }));
    
    console.log(\`Found \${tickers.length} trading pairs for ETC\`);
    return tickers;
  } catch (error) {
    console.error('Error fetching tickers:', error);
    throw error;
  }
}

/**
 * Monitor price changes
 */
async function monitorETCPrice(
  callback: (price: number, change24h: number) => void,
  intervalMs: number = 60000
) {
  setInterval(async () => {
    try {
      const priceData = await getETCPrice(['usd']);
      callback(priceData.usd, priceData.usd_24h_change);
    } catch (error) {
      console.error('Error in price monitoring:', error);
    }
  }, intervalMs);
}

// Example usage
async function main() {
  console.log('Fetching ETC data from CoinGecko...');
  
  const price = await getETCPrice(['usd', 'btc', 'eth']);
  console.log('Current prices:', price);
  
  const marketData = await getETCMarketData();
  console.log('Market data:', {
    price: marketData.currentPrice.usd,
    marketCap: marketData.marketCap.usd,
    change24h: marketData.priceChange24h,
  });
  
  const historical = await getETCHistoricalPrice(7);
  console.log(\`Historical data points: \${historical.prices.length}\`);
  
  const ohlc = await getETCOHLC(7);
  console.log(\`OHLC data points: \${ohlc.length}\`);
}

export {
  getETCPrice,
  getETCMarketData,
  getETCHistoricalPrice,
  getETCOHLC,
  getETCTickers,
  monitorETCPrice,
};
    `.trim(),
  },

  notes: [
    'Most reliable free API for ETC price data',
    'Aggregates data from hundreds of exchanges',
    'No API key required for basic usage',
    'Generous rate limits (10-50 calls/minute)',
    'Comprehensive historical data available',
    'Regular updates and maintenance',
    'Excellent documentation and community support',
    'Used by thousands of cryptocurrency applications',
  ],

  limitations: [
    'Rate limits on free tier (can be exceeded with paid plans)',
    'No blockchain data (price and market data only)',
    'API may have occasional downtime during high traffic',
  ],

  alternatives: [
    'CryptoCompare',
    'CoinMarketCap',
    'Binance API',
  ],
};

