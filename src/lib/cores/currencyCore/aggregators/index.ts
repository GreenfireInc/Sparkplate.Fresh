/**
 * Cryptocurrency Price Aggregators
 * 
 * This module exports all available cryptocurrency price aggregator API configurations.
 * All sources listed here provide free API access (with varying limitations).
 * 
 * @module aggregators
 */

// Import all price aggregator APIs
import { binanceAPI } from './binanceAPI';
import { bitqueryAPI } from './bitqueryAPI';
import { blockmarketsAPI } from './blockmarketsAPI';
import { coinAPI } from './coinAPI';
import { coinbaseAPI } from './coinbaseAPI';
import { coinCapAPI } from './coinCapAPI';
import { coinCodexAPI } from './coinCodexAPI';
import { coindarAPI } from './coindarAPI';
import { coinGeckoAPI } from './coinGeckoAPI';
import { coinlayerAPI } from './coinlayerAPI';
import { coinlibAPI } from './coinlibAPI';
import { coinLoreAPI } from './coinLoreAPI';
import { coinMarketCapAPI } from './coinMarketCapAPI';
import { coinpaprikaAPI } from './coinpaprikaAPI';
import { coinStatsAPI } from './coinStatsAPI';
import { cryptoCompareAPI } from './cryptoCompareAPI';
import { cryptonatorAPI } from './cryptonatorAPI';
import { krakenAPI } from './krakenAPI';
import { lunarCrushAPI } from './lunarCrushAPI';
import { messariAPI } from './messariAPI';

// Export individual APIs
export {
  binanceAPI,
  bitqueryAPI,
  blockmarketsAPI,
  coinAPI,
  coinbaseAPI,
  coinCapAPI,
  coinCodexAPI,
  coindarAPI,
  coinGeckoAPI,
  coinlayerAPI,
  coinlibAPI,
  coinLoreAPI,
  coinMarketCapAPI,
  coinpaprikaAPI,
  coinStatsAPI,
  cryptoCompareAPI,
  cryptonatorAPI,
  krakenAPI,
  lunarCrushAPI,
  messariAPI,
};

// Export as a collection
export const aggregators = {
  binance: binanceAPI,
  bitquery: bitqueryAPI,
  blockmarkets: blockmarketsAPI,
  coinAPI: coinAPI,
  coinbase: coinbaseAPI,
  coinCap: coinCapAPI,
  coinCodex: coinCodexAPI,
  coindar: coindarAPI,
  coinGecko: coinGeckoAPI,
  coinlayer: coinlayerAPI,
  coinlib: coinlibAPI,
  coinLore: coinLoreAPI,
  coinMarketCap: coinMarketCapAPI,
  coinpaprika: coinpaprikaAPI,
  coinStats: coinStatsAPI,
  cryptoCompare: cryptoCompareAPI,
  cryptonator: cryptonatorAPI,
  kraken: krakenAPI,
  lunarCrush: lunarCrushAPI,
  messari: messariAPI,
};

// Export price aggregator categories
export const aggregatorCategories = {
  // No API Key Required
  noAuthRequired: [
    coinGeckoAPI,
    coinpaprikaAPI,
    coinCapAPI,
    coinCodexAPI,
    cryptonatorAPI,
    binanceAPI,
    coinLoreAPI,
    messariAPI,
  ],
  
  // Free Tier with API Key
  freeWithApiKey: [
    coinMarketCapAPI,
    cryptoCompareAPI,
    coinlayerAPI,
    coinAPI,
    coinbaseAPI,
    krakenAPI,
    bitqueryAPI,
    coinStatsAPI,
    lunarCrushAPI,
    blockmarketsAPI,
    coindarAPI,
    coinlibAPI,
  ],
  
  // Exchange APIs
  exchanges: [
    binanceAPI,
    coinbaseAPI,
    krakenAPI,
  ],
  
  // Data Aggregators
  aggregators: [
    coinGeckoAPI,
    coinMarketCapAPI,
    coinpaprikaAPI,
    cryptoCompareAPI,
    coinCapAPI,
    coinCodexAPI,
    coinLoreAPI,
    coinStatsAPI,
    coinlibAPI,
  ],
  
  // Social Analytics
  socialAnalytics: [
    lunarCrushAPI,
  ],
  
  // Blockchain Data
  blockchainData: [
    bitqueryAPI,
    messariAPI,
  ],
  
  // Events & Calendar
  eventsCalendar: [
    coindarAPI,
  ],
  
  // Institutional Grade
  institutional: [
    coinAPI,
    blockmarketsAPI,
    messariAPI,
  ],
  
  // WebSocket Support
  websocketSupport: [
    binanceAPI,
    coinbaseAPI,
    krakenAPI,
    cryptoCompareAPI,
    coinCapAPI,
    coinCodexAPI,
  ],
  
  // Subgraph Support
  subgraphSupport: [
    messariAPI,
  ],
};

// Recommended aggregators based on use case
export const recommendedAggregators = {
  // Best for general price data
  generalPricing: [
    coinGeckoAPI,
    coinMarketCapAPI,
    coinpaprikaAPI,
  ],
  
  // Best for trading
  trading: [
    binanceAPI,
    coinbaseAPI,
    krakenAPI,
  ],
  
  // Best for social metrics
  socialMetrics: [
    lunarCrushAPI,
  ],
  
  // Best for on-chain data
  onChainData: [
    bitqueryAPI,
    messariAPI,
  ],
  
  // Best for free unlimited access
  freeUnlimited: [
    coinGeckoAPI,
    coinpaprikaAPI,
    coinCodexAPI,
    coinLoreAPI,
    cryptonatorAPI,
  ],
  
  // Best for events and calendar
  events: [
    coindarAPI,
  ],
  
  // Best for comprehensive data
  comprehensive: [
    coinGeckoAPI,
    coinMarketCapAPI,
    cryptoCompareAPI,
    messariAPI,
  ],
};

// Utility function to get API by name
export const getAggregator = (name: string) => {
  return aggregators[name as keyof typeof aggregators];
};

// Utility function to get all free sources
export const getFreeAggregators = () => {
  return [
    ...aggregatorCategories.noAuthRequired,
    ...aggregatorCategories.freeWithApiKey,
  ];
};

// Centralized API Fallback System
export interface CoinData {
  id: string;
  symbol: string;
  name: string;
  price: number;
  priceChange: number;
  marketCap: number;
}

export interface FetchCoinDataOptions {
  coinIds?: string[];
  timeout?: number;
  vs_currency?: string;
  per_page?: number;
  page?: number;
}

/**
 * Centralized cryptocurrency data fetching with automatic fallback
 * 
 * Implements a three-tier fallback system:
 * 1. Primary: CoinGecko API (most comprehensive data)
 * 2. Fallback: CoinCap API (reliable alternative)
 * 3. Last Resort: Mock data (prevents complete failure)
 * 
 * @param localCoins - Array of local coin definitions to merge with API data
 * @param options - Fetch options for API calls
 * @returns Promise<CoinData[]> - Standardized coin data array
 */
export const fetchCoinDataWithFallback = async (
  localCoins: Array<{ id: string; symbol: string; name: string }>,
  options: FetchCoinDataOptions = {}
): Promise<{
  data: CoinData[];
  source: 'coingecko' | 'coincap' | 'mock';
  error?: string;
}> => {
  const {
    coinIds = localCoins.map(coin => coin.id),
    timeout = 5000,
    vs_currency = 'usd',
    per_page = 50,
    page = 1
  } = options;

  try {
    // Primary: CoinGecko API
    console.log('📡 [Aggregator] Attempting CoinGecko API...');
    
    const geckoData = await coinGeckoAPI.utils.fetchMarketData({
      ids: coinIds,
      vs_currency,
      per_page,
      page,
      sparkline: false,
      price_change_percentage: '24h',
      timeout
    });

    const standardizedGeckoData = coinGeckoAPI.utils.mapToStandardFormat(geckoData);
    const coinData = localCoins.map((coin) => {
      const matchedData = standardizedGeckoData.find((item) => item.id === coin.id);
      return {
        ...coin,
        price: matchedData?.price || 0,
        priceChange: matchedData?.priceChange || 0,
        marketCap: matchedData?.marketCap || 0
      };
    });

    console.log('✅ [Aggregator] CoinGecko data loaded successfully');
    return {
      data: coinData,
      source: 'coingecko'
    };

  } catch (geckoError) {
    console.warn('🔄 [Aggregator] CoinGecko failed, trying CoinCap fallback:', geckoError);
    
    try {
      // Fallback: CoinCap API
      console.log('📡 [Aggregator] Attempting CoinCap API...');
      
      const coinCapSymbols = coinCapAPI.utils.mapCoinGeckoIdsToCoinCapSymbols(coinIds);
      
      const capData = await coinCapAPI.utils.fetchAssetsData({
        ids: coinCapSymbols.join(','),
        limit: per_page,
        timeout
      });

      const standardizedCapData = coinCapAPI.utils.mapToStandardFormat(capData.data);
      
      const coinData = localCoins.map((coin) => {
        const matchedData = standardizedCapData.find((item) => 
          item.symbol.toLowerCase() === coin.symbol.toLowerCase() ||
          item.id.toLowerCase() === coin.id.toLowerCase()
        );
        return {
          ...coin,
          price: matchedData?.price || 0,
          priceChange: matchedData?.priceChange || 0,
          marketCap: matchedData?.marketCap || 0
        };
      });

      console.log('✅ [Aggregator] CoinCap fallback data loaded successfully');
      return {
        data: coinData,
        source: 'coincap'
      };

    } catch (capError) {
      console.warn('⚠️ [Aggregator] Both APIs failed, using mock data:', capError);
      
      // Last resort: Mock data
      const mockData = localCoins.map(coin => ({
        ...coin,
        price: Math.random() * (coin.symbol === 'BTC' ? 50000 : 5000),
        priceChange: (Math.random() * 10) - 5, // -5% to +5%
        marketCap: Math.random() * 1000000000
      }));

      return {
        data: mockData,
        source: 'mock',
        error: 'Unable to fetch live prices. Showing demo data.'
      };
    }
  }
};

/**
 * Shuffle array using Fisher-Yates algorithm
 * Utility function for randomizing coin display order
 */
export const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Default export
export default aggregators;

