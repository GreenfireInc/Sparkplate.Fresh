/**
 * Coinbase 50 Index - Top 50 cryptocurrencies by market cap
 * Based on Coinbase's curated list of popular cryptocurrencies
 * 
 * This list is filtered to only include currencies for which we have icons
 * and is commonly used for price tickers and market displays.
 */

export interface CoinbaseIndexItem {
  id: string;
  symbol: string;
  name: string;
}

export const COINBASE50: CoinbaseIndexItem[] = [
  { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin' },
  { id: 'ethereum', symbol: 'ETH', name: 'Ethereum' },
  { id: 'ripple', symbol: 'XRP', name: 'XRP' },
  { id: 'solana', symbol: 'SOL', name: 'Solana' },
  { id: 'dogecoin', symbol: 'DOGE', name: 'Dogecoin' },
  { id: 'cardano', symbol: 'ADA', name: 'Cardano' },
  { id: 'avalanche-2', symbol: 'AVAX', name: 'Avalanche' },
  { id: 'chainlink', symbol: 'LINK', name: 'Chainlink' },
  { id: 'stellar', symbol: 'XLM', name: 'Stellar' },
  { id: 'tezos', symbol: 'XTZ', name: 'Tezos' },
  { id: 'near', symbol: 'NEAR', name: 'Near' },
  { id: 'render-token', symbol: 'RENDER', name: 'Render' },
  { id: 'blockstack', symbol: 'STX', name: 'Stacks' },
  { id: 'zcash', symbol: 'ZEC', name: 'ZCash' },
  { id: 'shiba-inu', symbol: 'SHIB', name: 'Shiba Inu' },
  { id: 'mina-protocol', symbol: 'MINA', name: 'Mina Protocol' },
  { id: 'apecoin', symbol: 'APE', name: 'ApeCoin' },
  { id: 'immutable-x', symbol: 'IMX', name: 'Immutable X' },
  { id: 'oasis-network', symbol: 'ROSE', name: 'Oasis Network' },
  { id: 'lido-dao', symbol: 'LDO', name: 'Lido DAO' },
  { id: 'bonk', symbol: 'BONK', name: 'BONK' },
  { id: 'elrond-erd-2', symbol: 'EGLD', name: 'MultiversX' },
  { id: 'helium', symbol: 'HNT', name: 'Helium' },
  { id: 'jasmycoin', symbol: 'JASMY', name: 'JasmyCoin' },
  { id: 'blur', symbol: 'BLUR', name: 'Blur' },
  { id: 'polkadot', symbol: 'DOT', name: 'Polkadot' },
  { id: 'bitcoin-cash', symbol: 'BCH', name: 'Bitcoin Cash' },
  { id: 'uniswap', symbol: 'UNI', name: 'Uniswap' },
  { id: 'litecoin', symbol: 'LTC', name: 'Litecoin' },
  { id: 'aave', symbol: 'AAVE', name: 'Aave' },
  { id: 'internet-computer', symbol: 'ICP', name: 'Internet Computer' },
  { id: 'ethereum-classic', symbol: 'ETC', name: 'Ethereum Classic' },
  { id: 'matic-network', symbol: 'MATIC', name: 'Polygon' },
  { id: 'fetch-ai', symbol: 'FET', name: 'Fetch.ai' },
  { id: 'algorand', symbol: 'ALGO', name: 'Algorand' },
  { id: 'cosmos', symbol: 'ATOM', name: 'Cosmos' },
  { id: 'injective-protocol', symbol: 'INJ', name: 'Injective' },
  { id: 'the-graph', symbol: 'GRT', name: 'The Graph' },
  { id: 'quant-network', symbol: 'QNT', name: 'Quant Network' },
  { id: 'maker', symbol: 'MKR', name: 'Maker' },
  { id: 'the-sandbox', symbol: 'SAND', name: 'Sand' },
  { id: 'curve-dao-token', symbol: 'CRV', name: 'Curve DAO Token' },
  { id: 'eos', symbol: 'EOS', name: 'EOS' },
  { id: 'axie-infinity', symbol: 'AXS', name: 'Axie Infinity' },
  { id: 'decentraland', symbol: 'MANA', name: 'Decentraland' },
  { id: 'chiliz', symbol: 'CHZ', name: 'Chiliz' },
  { id: 'havven', symbol: 'SNX', name: 'Synthetix' },
  { id: 'livepeer', symbol: 'LPT', name: 'Livepeer' },
  { id: 'kusama', symbol: 'KSM', name: 'Kusama' },
  { id: '1inch', symbol: '1INCH', name: '1inch' }
];

export default COINBASE50;

