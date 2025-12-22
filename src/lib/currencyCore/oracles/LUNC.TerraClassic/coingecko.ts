// CoinGecko - Comprehensive Cryptocurrency Market Data API
// Reliable market data, historical prices, and analytics for LUNC

export const coinGeckoOracle = {
  name: 'CoinGecko',
  blockchain: 'Terra Classic (LUNC)',
  type: 'Market Data Aggregator',
  
  description: `CoinGecko provides comprehensive market data for Terra Classic (LUNC) including real-time prices, historical charts, trading volumes, market capitalization, and exchange listings. As the world's largest independent cryptocurrency data aggregator, CoinGecko tracked LUNC through the May 2022 collapse and continues to provide reliable data for the community revival effort. With data from 600+ exchanges, it's ideal for market analysis, portfolio tracking, and historical research.`,

  features: [
    '600+ exchange aggregation',
    'Real-time LUNC price data',
    'Historical price charts (including collapse)',
    'Market cap and volume tracking',
    'Exchange listings',
    'Community data',
    'Developer statistics',
    'Trending coins tracking',
  ],

  api: {
    website: 'https://www.coingecko.com/',
    documentation: 'https://www.coingecko.com/en/api/documentation',
    coinPage: 'https://www.coingecko.com/en/coins/terra-luna-classic',
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

  coinId: 'terra-luna-classic', // CoinGecko ID for Terra Classic (LUNC)

  useCases: [
    'Real-time LUNC price tracking',
    'Historical collapse analysis',
    'Market cap monitoring',
    'Exchange listing tracking',
    'Portfolio valuation',
    'Price alerts',
    'Community sentiment tracking',
    'Trading volume analysis',
  ],

  integration: {
    example: `
import axios from 'axios';

/**
 * CoinGecko API Integration for Terra Classic (LUNC)
 * Comprehensive market data and price tracking including collapse history
 */

const COINGECKO_API = 'https://api.coingecko.com/api/v3';
const LUNC_COIN_ID = 'terra-luna-classic';

/**
 * Get current LUNC price from CoinGecko
 */
async function getCoinGeckoLUNCPrice(vsCurrency: string = 'usd') {
  try {
    const response = await axios.get(
      \`\${COINGECKO_API}/simple/price\`,
      {
        params: {
          ids: LUNC_COIN_ID,
          vs_currencies: vsCurrency,
          include_market_cap: true,
          include_24hr_vol: true,
          include_24hr_change: true,
          include_last_updated_at: true,
        },
      }
    );

    const data = response.data[LUNC_COIN_ID];
    const price = data[vsCurrency];
    const marketCap = data[\`\${vsCurrency}_market_cap\`];
    const volume24h = data[\`\${vsCurrency}_24h_vol\`];
    const change24h = data[\`\${vsCurrency}_24h_change\`];
    const lastUpdated = new Date(data.last_updated_at * 1000);

    console.log(\`CoinGecko LUNC Price: $\${price.toFixed(8)}\`);
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
    console.error('Error fetching CoinGecko LUNC price:', error);
    throw error;
  }
}

/**
 * Get comprehensive LUNC market data
 */
async function getLUNCMarketData() {
  try {
    const response = await axios.get(
      \`\${COINGECKO_API}/coins/\${LUNC_COIN_ID}\`,
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

    console.log('\\n=== LUNC Market Data ===');
    console.log(\`Current Price: $\${market_data.current_price.usd.toFixed(8)}\`);
    console.log(\`Market Cap Rank: #\${market_data.market_cap_rank}\`);
    console.log(\`Market Cap: $\${(market_data.market_cap.usd / 1e9).toFixed(2)}B\`);
    console.log(\`Total Volume: $\${(market_data.total_volume.usd / 1e6).toFixed(2)}M\`);
    console.log(\`Circulating Supply: \${(market_data.circulating_supply / 1e12).toFixed(2)}T LUNC\`);
    console.log(\`Total Supply: \${(market_data.total_supply / 1e12).toFixed(2)}T LUNC\`);
    console.log(\`ATH: $\${market_data.ath.usd.toFixed(2)} (\${market_data.ath_date.usd.split('T')[0]})\`);
    console.log(\`ATL: $\${market_data.atl.usd.toFixed(10)} (\${market_data.atl_date.usd.split('T')[0]})\`);

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
    console.error('Error fetching LUNC market data:', error);
    throw error;
  }
}

/**
 * Get LUNC historical price data
 */
async function getLUNCHistoricalPrices(days: number = 30, interval: string = 'daily') {
  try {
    const response = await axios.get(
      \`\${COINGECKO_API}/coins/\${LUNC_COIN_ID}/market_chart\`,
      {
        params: {
          vs_currency: 'usd',
          days,
          interval,
        },
      }
    );

    const { prices, market_caps, total_volumes } = response.data;

    console.log(\`\\nRetrieved \${prices.length} historical price points for LUNC\`);
    
    if (prices.length > 0) {
      const latest = prices[prices.length - 1];
      const earliest = prices[0];
      console.log(\`Period: \${new Date(earliest[0]).toLocaleDateString()} to \${new Date(latest[0]).toLocaleDateString()}\`);
      console.log(\`Latest Price: $\${latest[1].toFixed(8)}\`);
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
    console.error('Error fetching LUNC historical prices:', error);
    throw error;
  }
}

/**
 * Analyze May 2022 collapse using CoinGecko data
 */
async function analyzeCollapsePeriod() {
  try {
    // Get data from before collapse to present
    const response = await axios.get(
      \`\${COINGECKO_API}/coins/\${LUNC_COIN_ID}/market_chart/range\`,
      {
        params: {
          vs_currency: 'usd',
          from: Math.floor(new Date('2022-05-01').getTime() / 1000),
          to: Math.floor(new Date('2022-05-20').getTime() / 1000),
        },
      }
    );

    const prices = response.data.prices;

    if (prices.length === 0) {
      console.log('No collapse period data available');
      return null;
    }

    const priceValues = prices.map(([_, price]: [number, number]) => price);
    const preCollapsePrice = priceValues[0];
    const postCollapsePrice = priceValues[priceValues.length - 1];
    const lowestPrice = Math.min(...priceValues);
    const dropPercent = ((preCollapsePrice - postCollapsePrice) / preCollapsePrice) * 100;

    console.log(\`\\nMay 2022 Collapse Analysis:\`);
    console.log(\`  Pre-collapse: $\${preCollapsePrice.toFixed(4)}\`);
    console.log(\`  Post-collapse: $\${postCollapsePrice.toFixed(8)}\`);
    console.log(\`  Lowest: $\${lowestPrice.toFixed(10)}\`);
    console.log(\`  Drop: \${dropPercent.toFixed(4)}%\`);

    return {
      preCollapsePrice,
      postCollapsePrice,
      lowestPrice,
      dropPercent,
      dataPoints: prices.length,
    };
  } catch (error) {
    console.error('Error analyzing collapse period:', error);
    throw error;
  }
}

/**
 * Get LUNC exchange volumes
 */
async function getLUNCExchangeVolumes() {
  try {
    const response = await axios.get(
      \`\${COINGECKO_API}/coins/\${LUNC_COIN_ID}/tickers\`,
      {
        params: {
          order: 'volume_desc',
        },
      }
    );

    const tickers = response.data.tickers;

    console.log(\`\\nTop LUNC Trading Pairs by Volume:\`);
    
    tickers.slice(0, 10).forEach((ticker: any, index: number) => {
      console.log(\`\${index + 1}. \${ticker.base}/\${ticker.target} on \${ticker.market.name}\`);
      console.log(\`   Volume: $\${ticker.converted_volume.usd.toLocaleString()}\`);
      console.log(\`   Price: $\${ticker.converted_last.usd.toFixed(8)}\`);
    });

    return tickers.map((ticker: any) => ({
      exchange: ticker.market.name,
      pair: \`\${ticker.base}/\${ticker.target}\`,
      volume: ticker.converted_volume.usd,
      price: ticker.converted_last.usd,
      trustScore: ticker.trust_score,
    }));
  } catch (error) {
    console.error('Error fetching LUNC exchange volumes:', error);
    throw error;
  }
}

/**
 * Monitor LUNC price changes
 */
async function monitorLUNCPrice(
  callback: (price: number, change: number) => void,
  intervalMs: number = 60000
) {
  console.log('Starting CoinGecko LUNC price monitoring...\\n');

  let lastPrice: number | null = null;

  setInterval(async () => {
    try {
      const data = await getCoinGeckoLUNCPrice();
      
      if (lastPrice !== null) {
        const change = ((data.price - lastPrice) / lastPrice) * 100;
        console.log(
          \`Price: $\${data.price.toFixed(8)} (\${change >= 0 ? '+' : ''}\${change.toFixed(2)}%)\`
        );
        callback(data.price, change);
      } else {
        console.log(\`Initial price: $\${data.price.toFixed(8)}\`);
      }
      
      lastPrice = data.price;
    } catch (error) {
      console.error('Monitoring error:', error);
    }
  }, intervalMs);
}

// Example usage
async function main() {
  console.log('Fetching LUNC data from CoinGecko...\\n');

  // Current price
  const price = await getCoinGeckoLUNCPrice();
  console.log(\`\\nCurrent Price: $\${price.price.toFixed(8)}\`);

  // Market data
  const marketData = await getLUNCMarketData();
  console.log(\`\\nMarket Cap Rank: #\${marketData.marketCapRank}\`);

  // Historical collapse analysis
  await analyzeCollapsePeriod();

  // Exchange volumes
  const volumes = await getLUNCExchangeVolumes();
  console.log(\`\\nTrading on \${volumes.length} exchanges\`);
}

export {
  getCoinGeckoLUNCPrice,
  getLUNCMarketData,
  getLUNCHistoricalPrices,
  analyzeCollapsePeriod,
  getLUNCExchangeVolumes,
  monitorLUNCPrice,
  COINGECKO_API,
  LUNC_COIN_ID,
};
    `.trim(),
  },

  notes: [
    'World\'s largest independent crypto data aggregator',
    'Data from 600+ exchanges',
    'Free tier with reasonable rate limits',
    'Comprehensive historical data including collapse',
    'Multi-currency support',
    'Exchange listing tracking',
    'Community sentiment data',
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

  historicalSignificance: `
    CoinGecko tracked Terra Classic through the entire May 2022 collapse, providing
    comprehensive data showing LUNC's drop from $119 ATH to fractions of a cent. The
    platform continues to track the community revival effort and the massive supply
    inflation that occurred post-collapse (from ~350M to 6.9T tokens).
  `,
};

