// CoinGecko API - Comprehensive Cryptocurrency Market Data
// Free API for LTC price, market data, and analytics

export const coingeckoOracle = {
  name: 'CoinGecko',
  blockchain: 'Litecoin (LTC)',
  type: 'Market Data API',
  
  description: `CoinGecko provides comprehensive cryptocurrency market data for Litecoin through a free REST API. With no API key required for basic usage, CoinGecko offers real-time prices, historical data, market cap, trading volume, exchange listings, and extensive market analytics for LTC across hundreds of exchanges.`,

  features: [
    'No API key required (free tier)',
    'Real-time LTC price data',
    'Historical price data',
    'Market cap and volume',
    'Exchange listings',
    '24h/7d/30d price changes',
    'All-time high/low tracking',
    'Community stats and developer data',
  ],

  api: {
    website: 'https://www.coingecko.com/',
    documentation: 'https://docs.coingecko.com/v3.0.1/reference/introduction',
    apiEndpoint: 'https://api.coingecko.com/api/v3',
    ltcPage: 'https://www.coingecko.com/en/coins/litecoin',
    pricingPlans: 'https://www.coingecko.com/en/api/pricing',
  },

  sdk: {
    primaryPackage: 'axios (REST API)',
    alternativePackage: 'coingecko-api',
    installCommand: 'npm install axios',
    supportedLanguages: ['TypeScript', 'JavaScript', 'Python', 'Ruby', 'Go'],
  },

  socialMedia: {
    website: 'https://www.coingecko.com/',
    twitter: 'https://twitter.com/coingecko',
    telegram: 'https://t.me/coingecko',
    discord: 'https://discord.gg/EhrkaCH',
    reddit: 'https://www.reddit.com/r/coingecko/',
  },

  useCases: [
    'Real-time LTC price tracking',
    'Portfolio valuation',
    'Market analysis and research',
    'Historical price charts',
    'Exchange comparison',
    'Trading volume analysis',
    'Market cap tracking',
    'Price alerts and notifications',
  ],

  integration: {
    example: `
import axios from 'axios';

/**
 * CoinGecko API Integration for Litecoin
 * Comprehensive market data access
 */

const COINGECKO_API = {
  baseUrl: 'https://api.coingecko.com/api/v3',
  simplePrice: '/simple/price',
  coins: '/coins',
  markets: '/coins/markets',
  history: '/coins/{id}/history',
  marketChart: '/coins/{id}/market_chart',
};

const LITECOIN_ID = 'litecoin';

/**
 * Get current LTC price
 */
async function getLTCPrice(vsCurrencies: string[] = ['usd']) {
  try {
    const response = await axios.get(\`\${COINGECKO_API.baseUrl}\${COINGECKO_API.simplePrice}\`, {
      params: {
        ids: LITECOIN_ID,
        vs_currencies: vsCurrencies.join(','),
        include_24hr_change: true,
        include_24hr_vol: true,
        include_market_cap: true,
      },
    });

    const data = response.data[LITECOIN_ID];

    console.log('LTC Price Data:');
    vsCurrencies.forEach((currency) => {
      console.log(\`  \${currency.toUpperCase()}: \${data[currency]}\`);
      console.log(\`  24h Change: \${data[\`\${currency}_24h_change\`]?.toFixed(2)}%\`);
      console.log(\`  Market Cap: \${data[\`\${currency}_market_cap\`]?.toLocaleString()}\`);
    });

    return data;
  } catch (error) {
    console.error('Error fetching LTC price:', error);
    throw error;
  }
}

/**
 * Get detailed LTC market data
 */
async function getDetailedMarketData() {
  try {
    const response = await axios.get(\`\${COINGECKO_API.baseUrl}\${COINGECKO_API.coins}/\${LITECOIN_ID}\`, {
      params: {
        localization: false,
        tickers: false,
        market_data: true,
        community_data: true,
        developer_data: true,
      },
    });

    const data = response.data;

    console.log('Detailed LTC Data:');
    console.log(\`  Current Price: $\${data.market_data.current_price.usd}\`);
    console.log(\`  Market Cap: $\${data.market_data.market_cap.usd.toLocaleString()}\`);
    console.log(\`  24h Volume: $\${data.market_data.total_volume.usd.toLocaleString()}\`);
    console.log(\`  All-Time High: $\${data.market_data.ath.usd}\`);
    console.log(\`  All-Time Low: $\${data.market_data.atl.usd}\`);
    console.log(\`  Circulating Supply: \${data.market_data.circulating_supply.toLocaleString()} LTC\`);

    return {
      id: data.id,
      symbol: data.symbol,
      name: data.name,
      currentPrice: data.market_data.current_price.usd,
      marketCap: data.market_data.market_cap.usd,
      volume24h: data.market_data.total_volume.usd,
      priceChange24h: data.market_data.price_change_percentage_24h,
      priceChange7d: data.market_data.price_change_percentage_7d,
      priceChange30d: data.market_data.price_change_percentage_30d,
      ath: data.market_data.ath.usd,
      athDate: new Date(data.market_data.ath_date.usd),
      atl: data.market_data.atl.usd,
      atlDate: new Date(data.market_data.atl_date.usd),
      circulatingSupply: data.market_data.circulating_supply,
      totalSupply: data.market_data.total_supply,
      maxSupply: data.market_data.max_supply,
    };
  } catch (error) {
    console.error('Error fetching detailed market data:', error);
    throw error;
  }
}

/**
 * Get historical LTC price data
 */
async function getHistoricalData(days: number = 30) {
  try {
    const response = await axios.get(
      \`\${COINGECKO_API.baseUrl}/coins/\${LITECOIN_ID}/market_chart\`,
      {
        params: {
          vs_currency: 'usd',
          days,
          interval: days > 90 ? 'daily' : 'hourly',
        },
      }
    );

    const data = response.data;

    console.log(\`Historical data for last \${days} days:\`);
    console.log(\`  Price points: \${data.prices.length}\`);
    console.log(\`  First price: $\${data.prices[0][1].toFixed(2)}\`);
    console.log(\`  Last price: $\${data.prices[data.prices.length - 1][1].toFixed(2)}\`);

    return {
      prices: data.prices.map((p: any) => ({
        timestamp: new Date(p[0]),
        price: p[1],
      })),
      marketCaps: data.market_caps.map((m: any) => ({
        timestamp: new Date(m[0]),
        marketCap: m[1],
      })),
      volumes: data.total_volumes.map((v: any) => ({
        timestamp: new Date(v[0]),
        volume: v[1],
      })),
    };
  } catch (error) {
    console.error('Error fetching historical data:', error);
    throw error;
  }
}

/**
 * Get LTC market data across exchanges
 */
async function getExchangeMarketData() {
  try {
    const response = await axios.get(\`\${COINGECKO_API.baseUrl}\${COINGECKO_API.coins}/\${LITECOIN_ID}\`, {
      params: {
        tickers: true,
        localization: false,
      },
    });

    const tickers = response.data.tickers;

    console.log(\`LTC trading on \${tickers.length} markets:\`);

    const top10 = tickers.slice(0, 10);
    top10.forEach((ticker: any, index: number) => {
      console.log(\`\${index + 1}. \${ticker.market.name} - \${ticker.base}/\${ticker.target}\`);
      console.log(\`   Volume: $\${ticker.volume.toLocaleString()}\`);
    });

    return tickers.map((ticker: any) => ({
      exchange: ticker.market.name,
      pair: \`\${ticker.base}/\${ticker.target}\`,
      price: ticker.last,
      volume: ticker.volume,
      spread: ticker.bid_ask_spread_percentage,
      trustScore: ticker.trust_score,
    }));
  } catch (error) {
    console.error('Error fetching exchange market data:', error);
    throw error;
  }
}

/**
 * Get price at a specific date
 */
async function getPriceAtDate(date: string) {
  try {
    const response = await axios.get(
      \`\${COINGECKO_API.baseUrl}/coins/\${LITECOIN_ID}/history\`,
      {
        params: {
          date, // Format: dd-mm-yyyy (e.g., "30-12-2024")
          localization: false,
        },
      }
    );

    const data = response.data;

    console.log(\`LTC price on \${date}:\`);
    console.log(\`  USD: $\${data.market_data.current_price.usd}\`);
    console.log(\`  Market Cap: $\${data.market_data.market_cap.usd.toLocaleString()}\`);
    console.log(\`  Volume: $\${data.market_data.total_volume.usd.toLocaleString()}\`);

    return {
      date,
      price: data.market_data.current_price.usd,
      marketCap: data.market_data.market_cap.usd,
      volume: data.market_data.total_volume.usd,
    };
  } catch (error) {
    console.error('Error fetching price at date:', error);
    throw error;
  }
}

/**
 * Monitor LTC price changes
 */
async function monitorPrice(
  callback: (price: number, change24h: number) => void,
  intervalMs: number = 60000
) {
  console.log('Starting LTC price monitoring via CoinGecko...');

  setInterval(async () => {
    try {
      const data = await getLTCPrice(['usd']);
      const price = data.usd;
      const change24h = data.usd_24h_change;

      callback(price, change24h);
    } catch (error) {
      console.error('Monitoring error:', error);
    }
  }, intervalMs);
}

/**
 * Calculate price statistics from historical data
 */
async function calculatePriceStats(days: number = 30) {
  try {
    const historical = await getHistoricalData(days);
    const prices = historical.prices.map(p => p.price);

    const avgPrice = prices.reduce((a, b) => a + b, 0) / prices.length;
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

// Example usage
async function main() {
  console.log('Fetching LTC data from CoinGecko...\\n');

  const price = await getLTCPrice(['usd', 'eur', 'btc']);
  console.log('\\nLTC Price:', price);

  const detailed = await getDetailedMarketData();
  console.log('\\nDetailed Market Data:', detailed);

  const historical = await getHistoricalData(7);
  console.log(\`\\nHistorical data points: \${historical.prices.length}\`);

  const stats = await calculatePriceStats(30);
  console.log('\\nPrice Statistics:', stats);
}

export {
  getLTCPrice,
  getDetailedMarketData,
  getHistoricalData,
  getExchangeMarketData,
  getPriceAtDate,
  monitorPrice,
  calculatePriceStats,
};
    `.trim(),
  },

  notes: [
    'No API key required for free tier',
    'Comprehensive market data',
    'Real-time and historical prices',
    'Supports 50+ fiat currencies',
    'Exchange comparison data',
    'All-time high/low tracking',
    'Community and developer stats',
    'Free tier: 10-50 calls/minute',
  ],

  limitations: [
    'Rate limits on free tier',
    'API response may have slight delay',
    'No blockchain data (only market data)',
    'Some features require paid plans',
  ],

  alternatives: [
    'CoinMarketCap (similar market data)',
    'Blockchair (blockchain + market data)',
    'Pyth (faster price updates)',
    'DIA (transparent oracle)',
  ],
};

