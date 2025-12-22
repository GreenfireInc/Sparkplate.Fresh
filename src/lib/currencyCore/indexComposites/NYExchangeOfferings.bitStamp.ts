/**
 * NY Exchange Offerings - bitStamp Index - Cryptocurrencies available on bitStamp NY Exchange
 * 
 * This list contains cryptocurrencies that are available for trading on bitStamp's
 * New York State cryptocurrency exchange. These offerings represent a curated selection
 * of digital assets that have been approved for trading in New York State through
 * bitStamp's platform.
 * 
 * This index is used for NY exchange-specific displays, bitStamp integration features,
 * and regulatory-compliant currency selection interfaces.
 */

export interface NYExchangeOfferingsBitStampItem {
  id: string;
  symbol: string;
  name: string;
}

export const NY_EXCHANGE_OFFERINGS_BITSTAMP: NYExchangeOfferingsBitStampItem[] = [
  { id: '0x', symbol: 'ZRX', name: '0x Protocol' },
  { id: 'aave', symbol: 'AAVE', name: 'AAVE' },
  { id: 'algorand', symbol: 'ALGO', name: 'Algorand' },
  { id: 'apecoin', symbol: 'APE', name: 'ApeCoin' },
  { id: 'arbitrum', symbol: 'ARB', name: 'Arbitrum' },
  { id: 'avalanche-2', symbol: 'AVAX', name: 'Avalanche' },
  { id: 'basic-attention-token', symbol: 'BAT', name: 'Basic Attention Token' },
  { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin' },
  { id: 'bitcoin-cash', symbol: 'BCH', name: 'Bitcoin Cash' },
  { id: 'bonk', symbol: 'BONK', name: 'Bonk' },
  { id: 'cardano', symbol: 'ADA', name: 'Cardano' },
  { id: 'chainlink', symbol: 'LINK', name: 'Chainlink' },
  { id: 'compound-governance-token', symbol: 'COMP', name: 'Compound' },
  { id: 'curve-dao-token', symbol: 'CRV', name: 'Curve' },
  { id: 'dai', symbol: 'DAI', name: 'DAI' },
  { id: 'dogwifcoin', symbol: 'WIF', name: 'dogwifhat' },
  { id: 'dogecoin', symbol: 'DOGE', name: 'Dogecoin' },
  { id: 'enjincoin', symbol: 'ENJ', name: 'Enjin Coin' },
  { id: 'ethena', symbol: 'ENA', name: 'Ethena' },
  { id: 'ethereum', symbol: 'ETH', name: 'Ethereum' },
  { id: 'fantom', symbol: 'FTM', name: 'Fantom' },
  { id: 'the-graph', symbol: 'GRT', name: 'Graph, The' },
  { id: 'gyen', symbol: 'GYEN', name: 'GYEN' },
  { id: 'hedera-hashgraph', symbol: 'HBAR', name: 'Hedera' },
  { id: 'litecoin', symbol: 'LTC', name: 'Litecoin' },
  { id: 'maker', symbol: 'MKR', name: 'Maker' },
  { id: 'maple-finance', symbol: 'SYRUP', name: 'Maple Finance' },
  { id: 'near', symbol: 'NEAR', name: 'NEAR Protocol' },
  { id: 'chain', symbol: 'XCN', name: 'Onyxcoin' },
  { id: 'optimism', symbol: 'OP', name: 'Optimism' },
  { id: 'pepe', symbol: 'PEPE', name: 'Pepe' },
  { id: 'polkadot', symbol: 'DOT', name: 'Polkadot' },
  { id: 'polygon-ecosystem-token', symbol: 'POL', name: 'Polygon Ecosystem Token' },
  { id: 'ripple-usd', symbol: 'RLUSD', name: 'Ripple USD' },
  { id: 'sei-network', symbol: 'SEI', name: 'SEI' },
  { id: 'shiba-inu', symbol: 'SHIB', name: 'Shiba Inu' },
  { id: 'solana', symbol: 'SOL', name: 'Solana' },
  { id: 'stellar', symbol: 'XLM', name: 'Stellar Lumens' },
  { id: 'sui', symbol: 'SUI', name: 'Sui' },
  { id: 'uniswap', symbol: 'UNI', name: 'Uniswap' },
  { id: 'usd-coin', symbol: 'USDC', name: 'USDC' },
  { id: 'ripple', symbol: 'XRP', name: 'XRP' },
  { id: 'yearn-finance', symbol: 'YFI', name: 'Yearn Finance' },
  { id: 'zusd', symbol: 'ZUSD', name: 'ZUSD' }
];

export default NY_EXCHANGE_OFFERINGS_BITSTAMP;

