// CoinGecko - Comprehensive Cryptocurrency Market Data API
// Reliable market data, historical prices, and analytics for LUNA

export const coinGeckoOracle = {
  name: 'CoinGecko',
  blockchain: 'Terra (LUNA)',
  type: 'Market Data Aggregator',
  
  description: `CoinGecko is the world's largest independent cryptocurrency data aggregator, providing comprehensive market data for Terra (LUNA) including real-time prices, historical charts, trading volumes, market capitalization, and exchange listings. With data from 600+ exchanges and 10,000+ tokens, CoinGecko offers both free and premium API tiers, making it ideal for market analysis, portfolio tracking, and price alerts for LUNA.`,

  features: [
    '600+ exchange aggregation',
    'Real-time LUNA price data',
    'Historical price charts',
    'Market cap and volume tracking',
    'Exchange listings',
    'Developer statistics',
    'Community data',
    'Trending coins tracking',
  ],

  api: {
    website: 'https://www.coingecko.com/',
    documentation: 'https://www.coingecko.com/en/api/documentation',
    coinPage: 'https://www.coingecko.com/en/coins/terra-luna-2',
    apiEndpoint: 'https://api.coingecko.com/api/v3',
    proApiEndpoint: 'https://pro-api.coingecko.com/api/v3',
  },

  sdk: {
    primaryPackage: 'coingecko-api',
    alternativePackage: 'axios (REST API)',
    installCommand: 'npm install coingecko-api',
    supportedLanguages: ['JavaScript', 'TypeScript', 'Python', 'Ruby', 'PHP'],
  },

  socialMedia: {
    website: 'https://www.coingecko.com/',
    twitter: 'https://twitter.com/coingecko',
    telegram: 'https://t.me/coingecko',
    discord: 'https://discord.gg/EhrkaCH',
    reddit: 'https://www.reddit.com/r/coingecko/',
    linkedin: 'https://www.linkedin.com/company/coingecko/',
  },

  freeTier: {
    rateLimit: '10-50 calls/minute (demo plan)',
    features: 'Full API access with rate limits',
    apiKey: 'Optional (demo) or required (higher tiers)',
  },

  coinId: 'terra-luna-2', // CoinGecko ID for Terra 2.0 (LUNA)

  useCases: [
    'Real-time LUNA price tracking',
    'Historical price analysis',
    'Market cap monitoring',
    'Exchange listing tracking',
    'Portfolio valuation',
    'Price alerts',
    'Market trend analysis',
    'Trading volume tracking',
  ],

  integration: {
    example: `
import axios from 'axios';

/**
 * CoinGecko API Integration for Terra (LUNA)
 * Comprehensive market data and price tracking
 */

const COINGECKO_API = 'https://api.coingecko.com/api/v3';
const LUNA_COIN_ID = 'terra-luna-2';

/**
 * Get current LUNA price from CoinGecko
 */
async function getCoinGeckoLUNAPrice(vsCurrency: string = 'usd') {
  try {
    const response = await axios.get(
      \`\${COINGECKO_API}/simple/price\`,
      {
        params: {
          ids: LUNA_COIN_ID,
          vs_currencies: vsCurrency,
          include_market_cap: true,
          include_24hr_vol: true,
          include_24hr_change: true,
          include_last_updated_at: true,
        },
      }
    );

    const data = response.data[LUNA_COIN_ID];
    const price = data[vsCurrency];
    const marketCap = data[\`\${vsCurrency}_market_cap\`];
    const volume24h = data[\`\${vsCurrency}_24h_vol\`];
    const change24h = data[\`\${vsCurrency}_24h_change\`];
    const lastUpdated = new Date(data.last_updated_at * 1000);

    console.log(\`CoinGecko LUNA Price: $\${price.toFixed(4)}\`);
    console.log(\`Market Cap: $\${(marketCap / 1e9).toFixed(2)}B\`);
    console.log(\`24h Volume: $\${(volume24h / 1e6).toFixed(2)}M\`);
    console.log(\`24h Change: \${change24h >= 0 ? '+' : ''}\${change24h.toFixed(2)}%\`);
    console.log(\`Last Updated: \${lastUpdated.toISOString()}\`);

    return {
      price,
      marketCap,
      volume24h,
      change24h,
      lastUpdated,
      currency: vsCurrency.toUpperCase(),
    };
  } catch (error) {
    console.error('Error fetching CoinGecko LUNA price:', error);
    throw error;
  }
}

/**
 * Get comprehensive LUNA market data
 */
async function getLUNAMarketData() {
  try {
    const response = await axios.get(
      \`\${COINGECKO_API}/coins/\${LUNA_COIN_ID}\`,
      {
        params: {
          localization: false,
          tickers: false,
          market_data: true,
          community_data: true,
          developer_data: false,
        },
      }
    );

    const { market_data, community_data } = response.data;

    console.log('\\n=== LUNA Market Data ===');
    console.log(\`Current Price: $\${market_data.current_price.usd.toFixed(4)}\`);
    console.log(\`Market Cap Rank: #\${market_data.market_cap_rank}\`);
    console.log(\`Market Cap: $\${(market_data.market_cap.usd / 1e9).toFixed(2)}B\`);
    console.log(\`Total Volume: $\${(market_data.total_volume.usd / 1e6).toFixed(2)}M\`);
    console.log(\`Circulating Supply: \${(market_data.circulating_supply / 1e6).toFixed(2)}M LUNA\`);
    console.log(\`Total Supply: \${(market_data.total_supply / 1e6).toFixed(2)}M LUNA\`);
    console.log(\`ATH: $\${market_data.ath.usd.toFixed(2)} (\${market_data.ath_date.usd.split('T')[0]})\`);
    console.log(\`ATL: $\${market_data.atl.usd.toFixed(4)} (\${market_data.atl_date.usd.split('T')[0]})\`);

    return {
      currentPrice: market_data.current_price.usd,
      marketCapRank: market_data.market_cap_rank,
      marketCap: market_data.market_cap.usd,
      totalVolume: market_data.total_volume.usd,
      circulatingSupply: market_data.circulating_supply,
      totalSupply: market_data.total_supply,
      ath: market_data.ath.usd,
      athDate: new Date(market_data.ath_date.usd),
      atl: market_data.atl.usd,
      atlDate: new Date(market_data.atl_date.usd),
      communityData: community_data,
    };
  } catch (error) {
    console.error('Error fetching LUNA market data:', error);
    throw error;
  }
}

/**
 * Get LUNA historical price data
 */
async function getLUNAHistoricalPrices(days: number = 30, interval: string = 'daily') {
  try {
    const response = await axios.get(
      \`\${COINGECKO_API}/coins/\${LUNA_COIN_ID}/market_chart\`,
      {
        params: {
          vs_currency: 'usd',
          days,
          interval,
        },
      }
    );

    const { prices, market_caps, total_volumes } = response.data;

    console.log(\`\\nRetrieved \${prices.length} historical price points for LUNA\`);
    
    if (prices.length > 0) {
      const latest = prices[prices.length - 1];
      const earliest = prices[0];
      console.log(\`Period: \${new Date(earliest[0]).toLocaleDateString()} to \${new Date(latest[0]).toLocaleDateString()}\`);
      console.log(\`Latest Price: $\${latest[1].toFixed(4)}\`);
    }

    return {
      prices: prices.map(([timestamp, price]: [number, number]) => ({
        timestamp: new Date(timestamp),
        price,
      })),
      marketCaps: market_caps.map(([timestamp, cap]: [number, number]) => ({
        timestamp: new Date(timestamp),
        marketCap: cap,
      })),
      volumes: total_volumes.map(([timestamp, volume]: [number, number]) => ({
        timestamp: new Date(timestamp),
        volume,
      })),
    };
  } catch (error) {
    console.error('Error fetching LUNA historical prices:', error);
    throw error;
  }
}

/**
 * Get LUNA price in multiple currencies
 */
async function getLUNAMultiCurrencyPrice(currencies: string[] = ['usd', 'eur', 'btc', 'eth']) {
  try {
    const response = await axios.get(
      \`\${COINGECKO_API}/simple/price\`,
      {
        params: {
          ids: LUNA_COIN_ID,
          vs_currencies: currencies.join(','),
        },
      }
    );

    const prices = response.data[LUNA_COIN_ID];

    console.log('\\nLUNA Price in Multiple Currencies:');
    currencies.forEach(currency => {
      if (prices[currency]) {
        console.log(\`  \${currency.toUpperCase()}: \${prices[currency].toFixed(currency === 'btc' || currency === 'eth' ? 8 : 4)}\`);
      }
    });

    return prices;
  } catch (error) {
    console.error('Error fetching multi-currency prices:', error);
    throw error;
  }
}

/**
 * Get LUNA OHLC (candlestick) data
 */
async function getLUNAOHLC(days: number = 7) {
  try {
    const response = await axios.get(
      \`\${COINGECKO_API}/coins/\${LUNA_COIN_ID}/ohlc\`,
      {
        params: {
          vs_currency: 'usd',
          days,
        },
      }
    );

    const ohlcData = response.data;

    console.log(\`\\nLUNA OHLC Data (\${days} days, \${ohlcData.length} candles):\`);
    
    if (ohlcData.length > 0) {
      const latest = ohlcData[ohlcData.length - 1];
      console.log(\`Latest Candle:\`);
      console.log(\`  Time: \${new Date(latest[0]).toLocaleString()}\`);
      console.log(\`  Open: $\${latest[1].toFixed(4)}\`);
      console.log(\`  High: $\${latest[2].toFixed(4)}\`);
      console.log(\`  Low: $\${latest[3].toFixed(4)}\`);
      console.log(\`  Close: $\${latest[4].toFixed(4)}\`);
    }

    return ohlcData.map(([timestamp, open, high, low, close]: number[]) => ({
      timestamp: new Date(timestamp),
      open,
      high,
      low,
      close,
    }));
  } catch (error) {
    console.error('Error fetching LUNA OHLC data:', error);
    throw error;
  }
}

/**
 * Get LUNA trading volume on exchanges
 */
async function getLUNAExchangeVolumes() {
  try {
    const response = await axios.get(
      \`\${COINGECKO_API}/coins/\${LUNA_COIN_ID}/tickers\`,
      {
        params: {
          order: 'volume_desc',
        },
      }
    );

    const tickers = response.data.tickers;

    console.log(\`\\nTop LUNA Trading Pairs by Volume:\`);
    
    tickers.slice(0, 10).forEach((ticker: any, index: number) => {
      console.log(\`\${index + 1}. \${ticker.base}/\${ticker.target} on \${ticker.market.name}\`);
      console.log(\`   Volume: $\${ticker.converted_volume.usd.toLocaleString()}\`);
      console.log(\`   Price: $\${ticker.converted_last.usd.toFixed(4)}\`);
    });

    return tickers.map((ticker: any) => ({
      exchange: ticker.market.name,
      pair: \`\${ticker.base}/\${ticker.target}\`,
      volume: ticker.converted_volume.usd,
      price: ticker.converted_last.usd,
      trustScore: ticker.trust_score,
    }));
  } catch (error) {
    console.error('Error fetching LUNA exchange volumes:', error);
    throw error;
  }
}

/**
 * Calculate price statistics
 */
async function getLUNAPriceStats(days: number = 30) {
  try {
    const historicalData = await getLUNAHistoricalPrices(days);
    const prices = historicalData.prices.map(p => p.price);

    const avgPrice = prices.reduce((a, b) => a + b, 0) / prices.length;
    const maxPrice = Math.max(...prices);
    const minPrice = Math.min(...prices);
    const volatility = ((maxPrice - minPrice) / avgPrice) * 100;
    
    const firstPrice = prices[0];
    const lastPrice = prices[prices.length - 1];
    const priceChange = lastPrice - firstPrice;
    const priceChangePercent = (priceChange / firstPrice) * 100;

    console.log(\`\\nLUNA \${days}-Day Statistics:\`);
    console.log(\`  Average: $\${avgPrice.toFixed(4)}\`);
    console.log(\`  High: $\${maxPrice.toFixed(4)}\`);
    console.log(\`  Low: $\${minPrice.toFixed(4)}\`);
    console.log(\`  Volatility: \${volatility.toFixed(2)}%\`);
    console.log(\`  Change: \${priceChange >= 0 ? '+' : ''}\${priceChange.toFixed(4)} (\${priceChangePercent.toFixed(2)}%)\`);

    return {
      days,
      avgPrice,
      maxPrice,
      minPrice,
      volatility,
      priceChange,
      priceChangePercent,
    };
  } catch (error) {
    console.error('Error calculating price stats:', error);
    throw error;
  }
}

/**
 * Monitor LUNA price changes
 */
async function monitorLUNAPrice(
  callback: (price: number, change: number) => void,
  intervalMs: number = 60000
) {
  console.log('Starting CoinGecko LUNA price monitoring...\\n');

  let lastPrice: number | null = null;

  setInterval(async () => {
    try {
      const data = await getCoinGeckoLUNAPrice();
      
      if (lastPrice !== null) {
        const change = ((data.price - lastPrice) / lastPrice) * 100;
        console.log(
          \`Price: $\${data.price.toFixed(4)} (\${change >= 0 ? '+' : ''}\${change.toFixed(2)}%)\`
        );
        callback(data.price, change);
      } else {
        console.log(\`Initial price: $\${data.price.toFixed(4)}\`);
      }
      
      lastPrice = data.price;
    } catch (error) {
      console.error('Monitoring error:', error);
    }
  }, intervalMs);
}

// Example usage
async function main() {
  console.log('Fetching LUNA data from CoinGecko...\\n');

  // Current price
  const price = await getCoinGeckoLUNAPrice();
  console.log(\`\\nCurrent Price: $\${price.price.toFixed(4)}\`);

  // Market data
  const marketData = await getLUNAMarketData();
  console.log(\`\\nMarket Cap Rank: #\${marketData.marketCapRank}\`);

  // Multi-currency prices
  await getLUNAMultiCurrencyPrice(['usd', 'eur', 'btc']);

  // Historical data
  const historical = await getLUNAHistoricalPrices(30);
  console.log(\`\\nHistorical data points: \${historical.prices.length}\`);

  // Price statistics
  await getLUNAPriceStats(30);

  // Exchange volumes
  const volumes = await getLUNAExchangeVolumes();
  console.log(\`\\nTrading on \${volumes.length} exchanges\`);
}

export {
  getCoinGeckoLUNAPrice,
  getLUNAMarketData,
  getLUNAHistoricalPrices,
  getLUNAMultiCurrencyPrice,
  getLUNAOHLC,
  getLUNAExchangeVolumes,
  getLUNAPriceStats,
  monitorLUNAPrice,
  COINGECKO_API,
  LUNA_COIN_ID,
};
    `.trim(),
  },

  notes: [
    'World\'s largest independent crypto data aggregator',
    'Data from 600+ exchanges',
    'Free tier with reasonable rate limits',
    'Comprehensive market data',
    'Historical price charts available',
    'Multi-currency support',
    'Exchange listing tracking',
    'No API key required for basic usage',
  ],

  limitations: [
    'Rate limited on free tier (10-50 calls/min)',
    'Delayed data (1-2 minute lag)',
    'API key required for higher tiers',
    'Limited real-time streaming',
  ],

  alternatives: [
    'CoinMarketCap (alternative aggregator)',
    'Pyth Network (for real-time feeds)',
    'Band Protocol (for on-chain oracles)',
    'DIA (for transparent feeds)',
  ],
};

