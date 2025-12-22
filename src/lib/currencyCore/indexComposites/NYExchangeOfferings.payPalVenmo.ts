/**
 * NY Exchange Offerings - PayPal/Venmo Index - Cryptocurrencies available on PayPal/Venmo NY Exchange
 * 
 * This list contains cryptocurrencies that are available for trading on PayPal's and Venmo's
 * New York State cryptocurrency exchange. These offerings represent a curated selection
 * of digital assets that have been approved for trading in New York State through
 * PayPal's and Venmo's platforms.
 * 
 * This index is used for NY exchange-specific displays, PayPal/Venmo integration features,
 * and regulatory-compliant currency selection interfaces.
 */

export interface NYExchangeOfferingsPayPalVenmoItem {
  id: string;
  symbol: string;
  name: string;
}

export const NY_EXCHANGE_OFFERINGS_PAYPAL_VENMO: NYExchangeOfferingsPayPalVenmoItem[] = [
  { id: 'paypal-usd', symbol: 'PYUSD', name: 'PayPal USD' },
  { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin' },
  { id: 'ethereum', symbol: 'ETH', name: 'Ethereum' },
  { id: 'solana', symbol: 'SOL', name: 'Solana' },
  { id: 'chainlink', symbol: 'LINK', name: 'Chainlink' },
  { id: 'litecoin', symbol: 'LTC', name: 'Litecoin' },
  { id: 'bitcoin-cash', symbol: 'BCH', name: 'Bitcoin Cash' }
];

export default NY_EXCHANGE_OFFERINGS_PAYPAL_VENMO;
