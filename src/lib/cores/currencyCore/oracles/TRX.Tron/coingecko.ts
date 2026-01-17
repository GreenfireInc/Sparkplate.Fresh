// CoinGecko - Market Data API for TRX
// Comprehensive cryptocurrency pricing and market data

export const coinGeckoOracle = {
  name: 'CoinGecko',
  blockchain: 'Tron (TRX)',
  type: 'Market Data Aggregator',
  
  description: `CoinGecko provides comprehensive market data and pricing information for Tron (TRX) aggregated from major exchanges worldwide. As one of the largest cryptocurrency data platforms, CoinGecko tracks TRX prices, trading volumes, market capitalization, and detailed statistics across 700+ exchanges. With its free API and extensive historical data, CoinGecko serves as a reliable source for TRX market intelligence, price tracking, and portfolio management applications.`,

  features: [
    'Real-time TRX price data',
    'Multi-currency support',
    'Historical price data',
    'Market cap and volume',
    'Exchange data aggregation',
    '24h price changes',
    'Developer-friendly API',
    'Free tier available',
  ],

  api: {
    website: 'https://www.coingecko.com/',
    documentation: 'https://docs.coingecko.com/reference/introduction',
    apiBase: 'https://api.coingecko.com/api/v3',
    tronPage: 'https://www.coingecko.com/en/coins/tron',
    pricing: 'https://www.coingecko.com/en/api/pricing',
  },

  sdk: {
    primaryPackage: 'axios (REST API)',
    alternativePackage: 'coingecko-api (unofficial)',
    installCommand: 'npm install axios',
    supportedLanguages: ['Any (REST API)', 'JavaScript', 'TypeScript', 'Python'],
  },

  socialMedia: {
    website: 'https://www.coingecko.com/',
    twitter: 'https://twitter.com/coingecko',
    telegram: 'https://t.me/coingecko',
    discord: 'https://discord.com/invite/EhrkaCH',
    reddit: 'https://www.reddit.com/r/coingecko/',
  },

  freeTier: {
    rateLimit: '10-50 calls/minute',
    features: 'Full API access',
    authentication: 'No API key required (free tier)',
    premium: 'Available for higher limits',
  },

  useCases: [
    'Real-time TRX price tracking',
    'Historical price analysis',
    'Market cap monitoring',
    'Trading volume data',
    'Price change statistics',
    'Multi-currency conversion',
    'Portfolio valuation',
    'Market sentiment analysis',
  ],

  integration: {
    example: `
import axios from 'axios';

/**
 * CoinGecko API Integration for Tron (TRX)
 * Comprehensive market data and pricing
 */

const COINGECKO_API = 'https://api.coingecko.com/api/v3';
const TRX_ID = 'tron';

interface CoinGeckoPrice {
  usd: number;
  usd_market_cap: number;
  usd_24h_vol: number;
  usd_24h_change: number;
  last_updated_at: number;
}

interface MarketData {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  total_volume: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  ath: number;
  ath_date: string;
  atl: number;
  atl_date: string;
}

/**
 * Get TRX price from CoinGecko
 */
async function getCoinGeckoTRXPrice(currencies: string[] = ['usd']): Promise<CoinGeckoPrice> {
  try {
    const response = await axios.get(\`\${COINGECKO_API}/simple/price\`, {
      params: {
        ids: TRX_ID,
        vs_currencies: currencies.join(','),
        include_market_cap: true,
        include_24hr_vol: true,
        include_24hr_change: true,
        include_last_updated_at: true,
      },
    });

    const data = response.data[TRX_ID];

    console.log(\`CoinGecko TRX Price:\`);
    console.log(\`  Price: $\${data.usd.toFixed(6)}\`);
    console.log(\`  Market Cap: $\${(data.usd_market_cap / 1e9).toFixed(2)}B\`);
    console.log(\`  24h Volume: $\${(data.usd_24h_vol / 1e6).toFixed(2)}M\`);
    console.log(\`  24h Change: \${data.usd_24h_change.toFixed(2)}%\`);
    console.log(\`  Last Updated: \${new Date(data.last_updated_at * 1000).toISOString()}\`);

    return data;
  } catch (error) {
    console.error('Error fetching CoinGecko TRX price:', error);
    throw error;
  }
}

/**
 * Get detailed market data
 */
async function getTRXMarketData(): Promise<MarketData> {
  try {
    const response = await axios.get(\`\${COINGECKO_API}/coins/markets\`, {
      params: {
        vs_currency: 'usd',
        ids: TRX_ID,
        order: 'market_cap_desc',
        sparkline: false,
      },
    });

    const data = response.data[0];

    console.log(\`\\nTRX Market Data:\`);
    console.log(\`  Symbol: \${data.symbol.toUpperCase()}\`);
    console.log(\`  Rank: #\${data.market_cap_rank}\`);
    console.log(\`  Current Price: $\${data.current_price.toFixed(6)}\`);
    console.log(\`  Market Cap: $\${(data.market_cap / 1e9).toFixed(2)}B\`);
    console.log(\`  Total Volume: $\${(data.total_volume / 1e6).toFixed(2)}M\`);
    console.log(\`  Circulating Supply: \${(data.circulating_supply / 1e9).toFixed(2)}B TRX\`);
    console.log(\`  Total Supply: \${(data.total_supply / 1e9).toFixed(2)}B TRX\`);
    console.log(\`  All-Time High: $\${data.ath.toFixed(6)} (\${data.ath_date})\`);
    console.log(\`  All-Time Low: $\${data.atl.toFixed(6)} (\${data.atl_date})\`);

    return data;
  } catch (error) {
    console.error('Error fetching TRX market data:', error);
    throw error;
  }
}

/**
 * Get historical price data
 */
async function getTRXHistoricalData(days: number = 7): Promise<any[]> {
  try {
    const response = await axios.get(\`\${COINGECKO_API}/coins/\${TRX_ID}/market_chart\`, {
      params: {
        vs_currency: 'usd',
        days,
        interval: days > 90 ? 'daily' : 'hourly',
      },
    });

    const prices = response.data.prices;

    console.log(\`\\nTRX Historical Prices (last \${days} days):\`);
    console.log(\`  Data Points: \${prices.length}\`);

    if (prices.length > 0) {
      const first = prices[0];
      const last = prices[prices.length - 1];
      const change = ((last[1] - first[1]) / first[1]) * 100;

      console.log(\`  First: $\${first[1].toFixed(6)} (\${new Date(first[0]).toLocaleDateString()})\`);
      console.log(\`  Last: $\${last[1].toFixed(6)} (\${new Date(last[0]).toLocaleDateString()})\`);
      console.log(\`  Change: \${change.toFixed(2)}%\`);
    }

    return prices;
  } catch (error) {
    console.error('Error fetching historical data:', error);
    return [];
  }
}

/**
 * Get TRX price in multiple currencies
 */
async function getTRXMultiCurrency(currencies: string[]): Promise<{ [key: string]: number }> {
  try {
    const response = await axios.get(\`\${COINGECKO_API}/simple/price\`, {
      params: {
        ids: TRX_ID,
        vs_currencies: currencies.join(','),
      },
    });

    const prices = response.data[TRX_ID];

    console.log(\`\\nTRX Price in Multiple Currencies:\`);
    Object.entries(prices).forEach(([currency, price]) => {
      console.log(\`  \${currency.toUpperCase()}: \${(price as number).toFixed(6)}\`);
    });

    return prices;
  } catch (error) {
    console.error('Error fetching multi-currency prices:', error);
    return {};
  }
}

/**
 * Get OHLC (candlestick) data
 */
async function getTRXOHLCData(days: number = 7): Promise<any[]> {
  try {
    const response = await axios.get(\`\${COINGECKO_API}/coins/\${TRX_ID}/ohlc\`, {
      params: {
        vs_currency: 'usd',
        days,
      },
    });

    const ohlc = response.data;

    console.log(\`\\nTRX OHLC Data (\${days} days):\`);
    console.log(\`  Candles: \${ohlc.length}\`);

    if (ohlc.length > 0) {
      const latest = ohlc[ohlc.length - 1];
      console.log(\`  Latest Candle:\`);
      console.log(\`    Time: \${new Date(latest[0]).toLocaleString()}\`);
      console.log(\`    Open: $\${latest[1].toFixed(6)}\`);
      console.log(\`    High: $\${latest[2].toFixed(6)}\`);
      console.log(\`    Low: $\${latest[3].toFixed(6)}\`);
      console.log(\`    Close: $\${latest[4].toFixed(6)}\`);
    }

    return ohlc;
  } catch (error) {
    console.error('Error fetching OHLC data:', error);
    return [];
  }
}

/**
 * Monitor TRX price changes
 */
async function monitorCoinGeckoTRXPrice(
  callback: (price: number, change: number) => void,
  intervalMs: number = 60000
) {
  console.log('Starting CoinGecko TRX price monitoring...\\n');

  let lastPrice: number | null = null;

  setInterval(async () => {
    try {
      const data = await getCoinGeckoTRXPrice();
      
      if (lastPrice !== null) {
        const change = ((data.usd - lastPrice) / lastPrice) * 100;
        console.log(
          \`TRX: $\${data.usd.toFixed(6)} (\${change >= 0 ? '+' : ''}\${change.toFixed(2)}%)\`
        );
        callback(data.usd, change);
      } else {
        console.log(\`Initial TRX price: $\${data.usd.toFixed(6)}\`);
      }
      
      lastPrice = data.usd;
    } catch (error) {
      console.error('Monitoring error:', error);
    }
  }, intervalMs);
}

/**
 * Get trending coins
 */
async function getTrendingCoins(): Promise<any[]> {
  try {
    const response = await axios.get(\`\${COINGECKO_API}/search/trending\`);

    const trending = response.data.coins || [];

    console.log(\`\\nTrending Coins:\`);
    trending.slice(0, 5).forEach((item: any, index: number) => {
      const coin = item.item;
      console.log(\`\${index + 1}. \${coin.name} (\${coin.symbol}) - Rank #\${coin.market_cap_rank}\`);
    });

    return trending;
  } catch (error) {
    console.error('Error fetching trending coins:', error);
    return [];
  }
}

/**
 * Compare TRX with other cryptocurrencies
 */
async function compareCryptocurrencies(coins: string[]): Promise<any[]> {
  try {
    const response = await axios.get(\`\${COINGECKO_API}/coins/markets\`, {
      params: {
        vs_currency: 'usd',
        ids: coins.join(','),
        order: 'market_cap_desc',
      },
    });

    const data = response.data;

    console.log(\`\\nCryptocurrency Comparison:\`);
    data.forEach((coin: any) => {
      console.log(\`\${coin.name} (\${coin.symbol.toUpperCase()}):\`);
      console.log(\`  Price: $\${coin.current_price.toFixed(6)}\`);
      console.log(\`  Market Cap: $\${(coin.market_cap / 1e9).toFixed(2)}B\`);
      console.log(\`  24h Change: \${coin.price_change_percentage_24h.toFixed(2)}%\`);
      console.log('');
    });

    return data;
  } catch (error) {
    console.error('Error comparing cryptocurrencies:', error);
    return [];
  }
}

// Example usage
async function main() {
  console.log('Fetching TRX data from CoinGecko...\\n');

  // Get current price
  await getCoinGeckoTRXPrice();

  // Get detailed market data
  await getTRXMarketData();

  // Get historical data
  await getTRXHistoricalData(30);

  // Get multi-currency prices
  await getTRXMultiCurrency(['usd', 'eur', 'btc', 'eth']);

  // Get OHLC data
  await getTRXOHLCData(7);

  // Compare with other coins
  await compareCryptocurrencies(['tron', 'bitcoin', 'ethereum', 'binancecoin']);
}

export {
  getCoinGeckoTRXPrice,
  getTRXMarketData,
  getTRXHistoricalData,
  getTRXMultiCurrency,
  getTRXOHLCData,
  monitorCoinGeckoTRXPrice,
  getTrendingCoins,
  compareCryptocurrencies,
  COINGECKO_API,
  TRX_ID,
};
    `.trim(),
  },

  notes: [
    'Free API access (no key required)',
    'Comprehensive market data',
    'Multi-exchange aggregation',
    'Historical price data',
    'Multi-currency support',
    'OHLC candlestick data',
    'Developer-friendly',
    'Rate limits on free tier',
  ],

  limitations: [
    'Rate limits (10-50 calls/minute)',
    'Data aggregated from exchanges',
    'May have slight delays',
    'Premium tier for higher limits',
  ],

  alternatives: [
    'Chainlink (for on-chain oracle)',
    'DIA (for customizable feeds)',
    'SunSwap (for DEX-based pricing)',
    'CoinMarketCap (alternative aggregator)',
  ],
};

