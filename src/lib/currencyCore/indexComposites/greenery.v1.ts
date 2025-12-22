/**
 * Greenery V1 Index - Core cryptocurrencies from Greenery reference implementation
 * 
 * This list contains 9 cryptocurrencies that form a core subset from the
 * Greenery reference implementation. These currencies have full wallet
 * functionality implemented and are commonly used for core operations.
 * 
 * Based on reference files: bnb.js, btc.js, doge.js, eth.js, ltc.js,
 * lunc.js, sol.js, xrp.js, xtz.js
 */

export interface GreeneryV1Item {
  id: string;
  symbol: string;
  name: string;
}

export const GREENERY_V1: GreeneryV1Item[] = [
  { id: 'binancecoin', symbol: 'BNB', name: 'Binance Coin' },
  { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin' },
  { id: 'dogecoin', symbol: 'DOGE', name: 'Dogecoin' },
  { id: 'ethereum', symbol: 'ETH', name: 'Ethereum' },
  { id: 'litecoin', symbol: 'LTC', name: 'Litecoin' },
  { id: 'terra-luna-2', symbol: 'LUNC', name: 'Terra Classic' },
  { id: 'solana', symbol: 'SOL', name: 'Solana' },
  { id: 'ripple', symbol: 'XRP', name: 'Ripple' },
  { id: 'tezos', symbol: 'XTZ', name: 'Tezos' }
];

export default GREENERY_V1;

