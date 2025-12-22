/**
 * NY Exchange Offerings - Robinhood Index - Cryptocurrencies available on Robinhood NY Exchange
 * 
 * This list contains cryptocurrencies that are available for trading on Robinhood's
 * New York State cryptocurrency exchange. These offerings represent a curated selection
 * of digital assets that have been approved for trading in New York State through
 * Robinhood's platform.
 * 
 * This index is used for NY exchange-specific displays, Robinhood integration features,
 * and regulatory-compliant currency selection interfaces.
 */

export interface NYExchangeOfferingsRobinhoodItem {
  id: string;
  symbol: string;
  name: string;
}

export const NY_EXCHANGE_OFFERINGS_ROBINHOOD: NYExchangeOfferingsRobinhoodItem[] = [
  { id: 'aave', symbol: 'AAVE', name: 'Aave' },
  { id: 'aerodrome-finance', symbol: 'AERO', name: 'Aerodrome' },
  { id: 'arbitrum', symbol: 'ARB', name: 'Arbitrum' },
  { id: 'avalanche-2', symbol: 'AVAX', name: 'Avalanche' },
  { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin' },
  { id: 'bitcoin-cash', symbol: 'BCH', name: 'Bitcoin Cash' },
  { id: 'bonk', symbol: 'BONK', name: 'BONK' },
  { id: 'cardano', symbol: 'ADA', name: 'Cardano' },
  { id: 'chainlink', symbol: 'LINK', name: 'Chainlink' },
  { id: 'compound-governance-token', symbol: 'COMP', name: 'Compound' },
  { id: 'curve-dao-token', symbol: 'CRV', name: 'Curve DAO' },
  { id: 'dogecoin', symbol: 'DOGE', name: 'Dogecoin' },
  { id: 'dogwifcoin', symbol: 'WIF', name: 'Dogwifhat' },
  { id: 'ethena', symbol: 'ENA', name: 'Ethena' },
  { id: 'ethereum', symbol: 'ETH', name: 'Ethereum' },
  { id: 'ethereum-classic', symbol: 'ETC', name: 'Ethereum Classic' },
  { id: 'hedera-hashgraph', symbol: 'HBAR', name: 'Hedera' },
  { id: 'litecoin', symbol: 'LTC', name: 'Litecoin' },
  { id: 'pepe', symbol: 'PEPE', name: 'Pepe' },
  { id: 'optimism', symbol: 'OP', name: 'Optimism' },
  { id: 'sei-network', symbol: 'SEI', name: 'SEI' },
  { id: 'shiba-inu', symbol: 'SHIB', name: 'Shiba Inu' },
  { id: 'solana', symbol: 'SOL', name: 'Solana' },
  { id: 'stellar', symbol: 'XLM', name: 'Stellar' },
  { id: 'sui', symbol: 'SUI', name: 'SUI' },
  { id: 'tezos', symbol: 'XTZ', name: 'Tezos' },
  { id: 'uniswap', symbol: 'UNI', name: 'Uniswap' },
  { id: 'virtual-protocol', symbol: 'VIRTUAL', name: 'Virtuals Protocol' },
  { id: 'ripple', symbol: 'XRP', name: 'XRP' }
];

export default NY_EXCHANGE_OFFERINGS_ROBINHOOD;

