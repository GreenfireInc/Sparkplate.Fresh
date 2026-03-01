// Cryptocurrency Exchanges API Integrations
// Centralized export for all major exchange integrations

// Import all exchange modules
import BinanceExchange from './binance';
import BitfinexExchange from './bitfinex';
import BitflyerExchange from './bitflyer';
import BitgetExchange from './bitget';
import BitstampExchange from './bitstamp';
import BybitExchange from './bybit';
import CoinbaseExchange from './coinbase';
import GateioExchange from './gateio';
import GeminiExchange from './gemini';
import HuobiExchange from './huobi';
import KrakenExchange from './kraken';
import KucoinExchange from './kucoin';
import MEXCExchange from './mexc';
import OKXExchange from './okx';
import UpbitExchange from './upbit';

// Re-export the exchanges
export { BinanceExchange, BitfinexExchange, BitflyerExchange, BitgetExchange, BitstampExchange, BybitExchange, CoinbaseExchange, GateioExchange, GeminiExchange, HuobiExchange, KrakenExchange, KucoinExchange, MEXCExchange, OKXExchange, UpbitExchange };

/**
 * Cryptocurrency Exchanges Overview
 * 
 * This module provides TypeScript integrations for major cryptocurrency exchanges.
 * Each exchange file includes:
 * - API endpoints for pricing data and account management
 * - Authentication methods (API keys, signatures)
 * - Comprehensive documentation and examples
 * - Social media links and official resources
 * - Error handling and rate limiting
 * 
 * Supported Exchanges:
 * 
 * 1. Binance - Largest global exchange by volume
 *    - REST API and WebSocket support
 *    - Spot, Futures, and Options trading
 *    - API Documentation: https://binance-docs.github.io/apidocs/spot/en/
 * 
 * 2. Bitfinex - Professional trading platform
 *    - Advanced trading features and API
 *    - Margin trading and lending
 *    - API Documentation: https://docs.bitfinex.com/
 * 
 * 3. Bitflyer - Japanese cryptocurrency exchange
 *    - Lightning FX and Lightning Bitcoin
 *    - API Documentation: https://lightning.bitflyer.com/docs
 * 
 * 4. Bitget - Global derivatives exchange
 *    - Spot and derivatives trading
 *    - Copy trading features
 *    - API Documentation: https://bitgetlimited.github.io/apidoc/en/spot/
 * 
 * 5. Bitstamp - European cryptocurrency exchange
 *    - Fiat and crypto trading
 *    - API Documentation: https://www.bitstamp.net/api/
 * 
 * 6. Bybit - Derivatives-focused exchange
 *    - Perpetual contracts and options
 *    - Unified Trading Account (UTA)
 *    - API Documentation: https://bybit-exchange.github.io/docs/
 * 
 * 7. Coinbase - US-based cryptocurrency exchange
 *    - Spot trading and institutional services
 *    - API Documentation: https://docs.cloud.coinbase.com/
 * 
 * 8. Gate.io - Global digital asset exchange
 *    - Wide variety of altcoins
 *    - Spot and futures trading
 *    - API Documentation: https://www.gate.io/docs/developers/apiv4/
 * 
 * 9. Huobi - Major Asian exchange
 *    - Spot, futures, and options
 *    - API Documentation: https://huobiapi.github.io/docs/spot/v1/en/
 * 
 * 10. Kraken - US-based exchange
 *     - Spot and futures trading
 *     - Staking services
 *     - API Documentation: https://docs.kraken.com/rest/
 * 
 * 11. KuCoin - Global exchange
 *     - Spot and futures trading
 *     - Margin trading and lending
 *     - API Documentation: https://docs.kucoin.com/
 * 
 * 12. MEXC - Global exchange
 *     - Spot and futures trading
 *     - API Documentation: https://mexcdevelop.github.io/apidocs/spot_v3_en/
 * 
 * 13. OKX - Major derivatives exchange
 *     - Spot, futures, and options
 *     - API Documentation: https://www.okx.com/docs-v5/en/
 * 
 * 14. Upbit - Korean exchange
 *     - KRW and crypto trading
 *     - API Documentation: https://docs.upbit.com/
 * 
 * Usage Example:
 * 
 * ```typescript
 * import { BinanceExchange, KrakenExchange } from '@/lib/cores/currencyCore/exchanges';
 * 
 * // Get BTC price from multiple exchanges
 * const binancePrice = await BinanceExchange.getTickerPrice('BTCUSDT');
 * const krakenPrice = await KrakenExchange.getTickerPrice('XXBTZUSD');
 * 
 * console.log('Binance BTC Price:', binancePrice);
 * console.log('Kraken BTC Price:', krakenPrice);
 * ```
 * 
 * Authentication:
 * 
 * Most exchanges require API keys for account-related endpoints:
 * 
 * ```typescript
 * const binanceClient = new BinanceExchange({
 *   apiKey: 'your_api_key',
 *   apiSecret: 'your_api_secret'
 * });
 * 
 * const accountInfo = await binanceClient.getAccountInfo();
 * ```
 */

// Export a consolidated object with all exchanges
export const CryptoExchanges = {
  Binance: BinanceExchange,
  Bitfinex: BitfinexExchange,
  Bitflyer: BitflyerExchange,
  Bitget: BitgetExchange,
  Bitstamp: BitstampExchange,
  Bybit: BybitExchange,
  Coinbase: CoinbaseExchange,
  Gateio: GateioExchange,
  Gemini: GeminiExchange,
  Huobi: HuobiExchange,
  Kraken: KrakenExchange,
  Kucoin: KucoinExchange,
  MEXC: MEXCExchange,
  OKX: OKXExchange,
  Upbit: UpbitExchange,
};

// Also export as Exchanges for consistency with other modules
export const Exchanges = CryptoExchanges;

// Type definitions for exchange data
export interface TickerData {
  symbol: string;
  price: number;
  volume?: number;
  change24h?: number;
  high24h?: number;
  low24h?: number;
  timestamp?: number;
}

export interface OrderBookData {
  symbol: string;
  bids: Array<[number, number]>; // [price, quantity]
  asks: Array<[number, number]>; // [price, quantity]
  timestamp?: number;
}

export interface TradeData {
  symbol: string;
  price: number;
  quantity: number;
  side: 'buy' | 'sell';
  timestamp: number;
  tradeId?: string;
}

export interface AccountInfo {
  balances: Array<{
    asset: string;
    free: number;
    locked: number;
  }>;
  totalAssetValue?: number;
  timestamp?: number;
}

export interface ExchangeConfig {
  apiKey?: string;
  apiSecret?: string;
  passphrase?: string;
  sandbox?: boolean;
  baseUrl?: string;
}

// Helper function to get price from multiple exchanges
export async function getMultiExchangePrice(symbol: string, exchanges: string[] = ['Binance', 'Kraken']): Promise<Record<string, TickerData>> {
  const results: Record<string, TickerData> = {};
  
  for (const exchangeName of exchanges) {
    try {
      const exchange = CryptoExchanges[exchangeName as keyof typeof CryptoExchanges];
      if (exchange && typeof exchange.getTickerPrice === 'function') {
        const ticker = await exchange.getTickerPrice(symbol);
        results[exchangeName] = ticker;
      }
    } catch (error) {
      console.error(`Error fetching price from ${exchangeName}:`, error);
    }
  }
  
  return results;
}

// Helper function to get average price across exchanges
export async function getAveragePrice(symbol: string, exchanges: string[] = ['Binance', 'Kraken', 'Coinbase']): Promise<number> {
  const prices = await getMultiExchangePrice(symbol, exchanges);
  const priceValues = Object.values(prices).map(ticker => ticker.price).filter(price => price > 0);
  
  if (priceValues.length === 0) return 0;
  
  return priceValues.reduce((sum, price) => sum + price, 0) / priceValues.length;
}

export default {
  exchanges: CryptoExchanges,
  getMultiExchangePrice,
  getAveragePrice,
};
