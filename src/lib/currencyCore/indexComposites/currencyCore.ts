/**
 * Currency Core Index - Core cryptocurrencies supported by the application
 * 
 * This list contains the primary cryptocurrencies that form the core
 * of the application's currency support. These are the main digital assets
 * for which full functionality and features are implemented.
 * 
 * This list is used for core wallet operations, price tracking, and
 * primary currency selection interfaces.
 */

export interface CurrencyCoreItem {
  id: string;
  symbol: string;
  name: string;
}

export const CURRENCY_CORE: CurrencyCoreItem[] = [
  { id: 'algorand', symbol: 'ALGO', name: 'Algorand' },
  { id: 'cosmos', symbol: 'ATOM', name: 'Cosmos' },
  { id: 'bitcoin-cash', symbol: 'BCH', name: 'Bitcoin Cash' },
  { id: 'binancecoin', symbol: 'BNB', name: 'Binance Coin' },
  { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin' },
  { id: 'dogecoin', symbol: 'DOGE', name: 'Dogecoin' },
  { id: 'polkadot', symbol: 'DOT', name: 'Polkadot' },
  { id: 'ethereum-classic', symbol: 'ETC', name: 'Ethereum Classic' },
  { id: 'ethereum', symbol: 'ETH', name: 'Ethereum' },
  { id: 'litecoin', symbol: 'LTC', name: 'Litecoin' },
  { id: 'terra-luna', symbol: 'LUNA', name: 'Terra' },
  { id: 'terra-luna-2', symbol: 'LUNC', name: 'Terra Classic' },
  { id: 'solana', symbol: 'SOL', name: 'Solana' },
  { id: 'blockstack', symbol: 'STX', name: 'Stacks' },
  { id: 'tron', symbol: 'TRX', name: 'Tron' },
  { id: 'waves', symbol: 'WAVES', name: 'Waves' },
  { id: 'stellar', symbol: 'XLM', name: 'Stellar' },
  { id: 'ripple', symbol: 'XRP', name: 'Ripple' },
  { id: 'tezos', symbol: 'XTZ', name: 'Tezos' }
];

export default CURRENCY_CORE;
