/**
 * Index Composites - Curated lists of cryptocurrencies
 * 
 * This module exports various cryptocurrency index composites
 * used throughout the application for consistent data display.
 */

export { COINBASE50, type CoinbaseIndexItem } from './coinbase50';
export { SEC_SECURITIES_LIST, type SecSecurityItem } from './secSecuritiesList';
export { CURRENCY_CORE, type CurrencyCoreItem } from './currencyCore';
export { GREENERY36_SET0, type Greenery36Set0Item } from './greenery36.set.0';
export { GREENERY_V1, type GreeneryV1Item } from './greenery.v1';
export { PROOF_OF_STAKE, type ProofOfStakeItem } from './proofOf.stake';
export { PROOF_OF_WORK, type ProofOfWorkItem } from './proofOf.work';
export { RANDOM_LIST_VIA_UCID, type RandomListViaUCIDItem } from './randomListVia.UCID';
export { RANDOM_LIST_VIA_MEDIA_PRESS_KIT, type RandomListViaMediaPressKitItem } from './randomListVia.mediaPressKit';
export { NY_EXCHANGE_OFFERINGS_ROBINHOOD, type NYExchangeOfferingsRobinhoodItem } from './NYExchangeOfferings.robinhood';
export { NY_EXCHANGE_OFFERINGS_BITFLYER, type NYExchangeOfferingsBitFlyerItem } from './NYExchangeOfferings.bitFlyer';
export { NY_EXCHANGE_OFFERINGS_BITSTAMP, type NYExchangeOfferingsBitStampItem } from './NYExchangeOfferings.bitStamp';
export { NY_EXCHANGE_OFFERINGS_PAYPAL_VENMO, type NYExchangeOfferingsPayPalVenmoItem } from './NYExchangeOfferings.payPalVenmo';
export { NY_EXCHANGE_OFFERINGS_GEMINI, type NYExchangeOfferingsGeminiItem } from './NYExchangeOfferings.gemini';
export { NY_EXCHANGE_OFFERINGS_COINBASE, type NYExchangeOfferingsCoinbaseItem } from './NYExchangeOfferings.coinbase';
export { STABLECOINS, type StablecoinItem } from './stablecoins';
export { EXCHANGE_CURRENCIES, type ExchangeCurrencyItem } from './exchangeCurrencies';
export { NFT_MARKETPLACE_CURRENCIES, type NFTMarketplaceCurrencyItem } from './nftMarketplaceCurrencies';
export { STORAGE_CURRENCIES, type StorageCurrencyItem } from './class.storage';
export { CLASS_ORACLES, type OracleClassItem } from './class.oracles';

/**
 * Price fetching utilities for index composites
 * These functions help fetch and format prices for currencies in the index composites
 */

import { fetchCoinDataWithFallback, type FetchCoinDataOptions } from '../aggregators';

/**
 * Map currency symbols to CoinGecko IDs
 * Common cryptocurrency symbol mappings
 */
export const coinGeckoIdMap: Record<string, string> = {
  'btc': 'bitcoin',
  'eth': 'ethereum',
  'xrp': 'ripple',
  'bch': 'bitcoin-cash',
  'ltc': 'litecoin',
  'ada': 'cardano',
  'dot': 'polkadot',
  'doge': 'dogecoin',
  'sol': 'solana',
  'avax': 'avalanche-2',
  'link': 'chainlink',
  'xlm': 'stellar',
  'xtz': 'tezos',
  'atom': 'cosmos',
  'algo': 'algorand',
  'uni': 'uniswap',
  'aave': 'aave',
  'mkr': 'maker',
  'matic': 'matic-network',
  'etc': 'ethereum-classic',
  'shib': 'shiba-inu',
  'near': 'near',
  'icp': 'internet-computer',
  'grt': 'the-graph',
  'zec': 'zcash',
  'eos': 'eos'
};

/**
 * Map currency items to format expected by fetchCoinDataWithFallback
 * Converts currency objects with symbol/tickerSymbol/ticker to CoinGecko format
 */
export const mapCurrenciesToCoinGeckoFormat = (
  currencies: Array<{
    symbol?: string;
    tickerSymbol?: string;
    ticker?: string;
    name?: string;
  }>
): Array<{
  id: string;
  symbol: string;
  name: string;
}> => {
  return currencies.map((currency) => {
    const symbol = currency.symbol || currency.tickerSymbol || currency.ticker || ''
    const id = coinGeckoIdMap[symbol.toLowerCase()] || symbol.toLowerCase()
    
    return {
      id,
      symbol: symbol.toLowerCase(),
      name: currency.name || symbol
    }
  })
}

/**
 * Fetch prices for currencies with automatic fallback
 * Uses CoinGecko as primary source, falls back to CoinCap, then Coinpaprika
 * 
 * @param currencies - Array of currency objects with symbol/tickerSymbol/ticker and name
 * @param options - Fetch options (timeout, vs_currency, etc.)
 * @returns Promise with price data mapped by symbol
 */
export const fetchCurrencyPrices = async (
  currencies: Array<{
    symbol?: string;
    tickerSymbol?: string;
    ticker?: string;
    name?: string;
  }>,
  options: FetchCoinDataOptions = {}
): Promise<Record<string, { price: number; priceChange: number; marketCap: number }>> => {
  if (currencies.length === 0) return {}

  try {
    // Map currencies to format expected by fetchCoinDataWithFallback
    const localCoins = mapCurrenciesToCoinGeckoFormat(currencies)

    const result = await fetchCoinDataWithFallback(localCoins, {
      timeout: options.timeout || 10000,
      vs_currency: options.vs_currency || 'usd',
      per_page: options.per_page || currencies.length,
      page: options.page || 1
    })

    // Map results by symbol
    const prices: Record<string, { price: number; priceChange: number; marketCap: number }> = {}
    
    result.data.forEach((coin) => {
      const symbol = coin.symbol.toLowerCase()
      prices[symbol] = {
        price: coin.price,
        priceChange: coin.priceChange,
        marketCap: coin.marketCap
      }
    })

    return prices
  } catch (error) {
    console.error('[IndexComposites] Failed to fetch currency prices:', error)
    return {}
  }
}

/**
 * Format price for display
 * Handles various price ranges with appropriate formatting
 */
export const formatPrice = (price: number): string => {
  if (price === 0) return '0.00'
  if (price < 0.01) return price.toFixed(6)
  if (price < 1) return price.toFixed(4)
  if (price < 1000) return price.toFixed(2)
  if (price < 1000000) return (price / 1000).toFixed(2) + 'K'
  if (price < 1000000000) return (price / 1000000).toFixed(2) + 'M'
  return (price / 1000000000).toFixed(2) + 'B'
}
