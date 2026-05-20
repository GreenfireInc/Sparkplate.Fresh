// CoinGecko - Comprehensive Cryptocurrency Market Data API
// Reliable market data, historical prices, and analytics for SOL

export const coinGeckoOracle = {
  name: 'CoinGecko',
  blockchain: 'Solana (SOL)',
  type: 'Market Data Aggregator',
  
  description: `CoinGecko is the world's largest independent cryptocurrency data aggregator, providing comprehensive market data for Solana (SOL) including real-time prices, historical charts, trading volumes, market capitalization, and exchange listings. With data from 600+ exchanges and 10,000+ tokens, CoinGecko offers both free and premium API tiers, making it ideal for market analysis, portfolio tracking, and price alerts for SOL and SPL tokens.`,

  features: [
    '600+ exchange aggregation',
    'Real-time SOL price data',
    'Historical price charts',
    'Market cap and volume tracking',
    'Exchange listings',
    'Developer statistics',
    'Community data',
    'DeFi analytics',
  ],

  api: {
    website: 'https://www.coingecko.com/',
    documentation: 'https://www.coingecko.com/en/api/documentation',
    coinPage: 'https://www.coingecko.com/en/coins/solana',
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

  coinId: 'solana', // CoinGecko ID for Solana

  useCases: [
    'Real-time SOL price tracking',
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
 * CoinGecko API Integration for Solana (SOL)
 * Comprehensive market data and price tracking
 */

const COINGECKO_API = 'https://api.coingecko.com/api/v3';
const SOL_COIN_ID = 'solana';

/**
 * Get current SOL price from CoinGecko
 */
async function getCoinGeckoSOLPrice(vsCurrency: string = 'usd') {
  try {
    const response = await axios.get(
      \`\${COINGECKO_API}/simple/price\`,
      {
        params: {
          ids: SOL_COIN_ID,
          vs_currencies: vsCurrency,
          include_market_cap: true,
          include_24hr_vol: true,
          include_24hr_change: true,
          include_last_updated_at: true,
        },
      }
    );

    const data = response.data[SOL_COIN_ID];
    const price = data[vsCurrency];
    const marketCap = data[\`\${vsCurrency}_market_cap\`];
    const volume24h = data[\`\${vsCurrency}_24h_vol\`];
    const change24h = data[\`\${vsCurrency}_24h_change\`];
    const lastUpdated = new Date(data.last_updated_at * 1000);

    console.log(\`CoinGecko SOL Price: $\${price.toFixed(4)}\`);
    console.log(\`Market Cap: $\${(marketCap / 1e9).toFixed(2)}B\`);
    console.log(\`24h Volume: $\${(volume24h / 1e9).toFixed(2)}B\`);
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
    console.error('Error fetching CoinGecko SOL price:', error);
    throw error;
  }
}

/**
 * Get comprehensive SOL market data
 */
async function getSOLMarketData() {
  try {
    const response = await axios.get(
      \`\${COINGECKO_API}/coins/\${SOL_COIN_ID}\`,
      {
        params: {
          localization: false,
          tickers: false,
          market_data: true,
          community_data: true,
          developer_data: true,
        },
      }
    );

    const { market_data, community_data, developer_data } = response.data;

    console.log('\\n=== SOL Market Data ===');
    console.log(\`Current Price: $\${market_data.current_price.usd.toFixed(4)}\`);
    console.log(\`Market Cap Rank: #\${market_data.market_cap_rank}\`);
    console.log(\`Market Cap: $\${(market_data.market_cap.usd / 1e9).toFixed(2)}B\`);
    console.log(\`Total Volume: $\${(market_data.total_volume.usd / 1e9).toFixed(2)}B\`);
    console.log(\`Circulating Supply: \${(market_data.circulating_supply / 1e6).toFixed(2)}M SOL\`);
    console.log(\`Total Supply: \${(market_data.total_supply / 1e6).toFixed(2)}M SOL\`);
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
      developerData: developer_data,
    };
  } catch (error) {
    console.error('Error fetching SOL market data:', error);
    throw error;
  }
}

/**
 * Get SOL historical price data
 */
async function getSOLHistoricalPrices(days: number = 30, interval: string = 'daily') {
  try {
    const response = await axios.get(
      \`\${COINGECKO_API}/coins/\${SOL_COIN_ID}/market_chart\`,
      {
        params: {
          vs_currency: 'usd',
          days,
          interval,
        },
      }
    );

    const { prices, market_caps, total_volumes } = response.data;

    console.log(\`\\nRetrieved \${prices.length} historical price points for SOL\`);
    
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
    console.error('Error fetching SOL historical prices:', error);
    throw error;
  }
}

/**
 * Get SOL price in multiple currencies
 */
async function getSOLMultiCurrencyPrice(currencies: string[] = ['usd', 'eur', 'btc', 'eth']) {
  try {
    const response = await axios.get(
      \`\${COINGECKO_API}/simple/price\`,
      {
        params: {
          ids: SOL_COIN_ID,
          vs_currencies: currencies.join(','),
        },
      }
    );

    const prices = response.data[SOL_COIN_ID];

    console.log('\\nSOL Price in Multiple Currencies:');
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
 * Get SOL OHLC (candlestick) data
 */
async function getSOLOHLC(days: number = 7) {
  try {
    const response = await axios.get(
      \`\${COINGECKO_API}/coins/\${SOL_COIN_ID}/ohlc\`,
      {
        params: {
          vs_currency: 'usd',
          days,
        },
      }
    );

    const ohlcData = response.data;

    console.log(\`\\nSOL OHLC Data (\${days} days, \${ohlcData.length} candles):\`);
    
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
    console.error('Error fetching SOL OHLC data:', error);
    throw error;
  }
}

/**
 * Get SOL trading volume on exchanges
 */
async function getSOLExchangeVolumes() {
  try {
    const response = await axios.get(
      \`\${COINGECKO_API}/coins/\${SOL_COIN_ID}/tickers\`,
      {
        params: {
          order: 'volume_desc',
        },
      }
    );

    const tickers = response.data.tickers;

    console.log(\`\\nTop SOL Trading Pairs by Volume:\`);
    
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
    console.error('Error fetching SOL exchange volumes:', error);
    throw error;
  }
}

/**
 * Monitor SOL price changes
 */
async function monitorSOLPrice(
  callback: (price: number, change: number) => void,
  intervalMs: number = 60000
) {
  console.log('Starting CoinGecko SOL price monitoring...\\n');

  let lastPrice: number | null = null;

  setInterval(async () => {
    try {
      const data = await getCoinGeckoSOLPrice();
      
      if (lastPrice !== null) {
        const change = ((data.price - lastPrice) / lastPrice) * 100;
        console.log(
          \`SOL: $\${data.price.toFixed(4)} (\${change >= 0 ? '+' : ''}\${change.toFixed(2)}%)\`
        );
        callback(data.price, change);
      } else {
        console.log(\`Initial SOL price: $\${data.price.toFixed(4)}\`);
      }
      
      lastPrice = data.price;
    } catch (error) {
      console.error('Monitoring error:', error);
    }
  }, intervalMs);
}

// Example usage
async function main() {
  console.log('Fetching SOL data from CoinGecko...\\n');

  // Current price
  const price = await getCoinGeckoSOLPrice();
  console.log(\`\\nCurrent Price: $\${price.price.toFixed(4)}\`);

  // Market data
  const marketData = await getSOLMarketData();
  console.log(\`\\nMarket Cap Rank: #\${marketData.marketCapRank}\`);

  // Multi-currency prices
  await getSOLMultiCurrencyPrice(['usd', 'eur', 'btc']);

  // Historical data
  const historical = await getSOLHistoricalPrices(7);
  console.log(\`\\nHistorical data points: \${historical.prices.length}\`);
}

export {
  getCoinGeckoSOLPrice,
  getSOLMarketData,
  getSOLHistoricalPrices,
  getSOLMultiCurrencyPrice,
  getSOLOHLC,
  getSOLExchangeVolumes,
  monitorSOLPrice,
  COINGECKO_API,
  SOL_COIN_ID,
};
    `.trim(),
  },

  notes: [
    'World\'s largest independent crypto data aggregator',
    'Data from 600+ exchanges',
    'Free tier with reasonable rate limits',
    'Comprehensive historical data',
    'Multi-currency support',
    'Exchange listing tracking',
    'Developer and community stats',
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
    'Jupiter (for DEX-based pricing)',
    'Helius (for Solana-specific data)',
  ],
};

