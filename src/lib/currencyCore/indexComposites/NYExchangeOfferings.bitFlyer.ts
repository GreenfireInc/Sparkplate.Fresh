/**
 * NY Exchange Offerings - bitFlyer Index - Cryptocurrencies available on bitFlyer NY Exchange
 * 
 * This list contains cryptocurrencies that are available for trading on bitFlyer's
 * New York State cryptocurrency exchange. These offerings represent a curated selection
 * of digital assets that have been approved for trading in New York State through
 * bitFlyer's platform.
 * 
 * This index is used for NY exchange-specific displays, bitFlyer integration features,
 * and regulatory-compliant currency selection interfaces.
 */

export interface NYExchangeOfferingsBitFlyerItem {
  id: string;
  symbol: string;
  name: string;
}

export const NY_EXCHANGE_OFFERINGS_BITFLYER: NYExchangeOfferingsBitFlyerItem[] = [
  { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin' },
  { id: 'ethereum', symbol: 'ETH', name: 'Ethereum' },
  { id: 'bitcoin-cash', symbol: 'BCH', name: 'Bitcoin Cash' },
  { id: 'ethereum-classic', symbol: 'ETC', name: 'Ethereum Classic' },
  { id: 'litecoin', symbol: 'LTC', name: 'Litecoin' }
];

export default NY_EXCHANGE_OFFERINGS_BITFLYER;

