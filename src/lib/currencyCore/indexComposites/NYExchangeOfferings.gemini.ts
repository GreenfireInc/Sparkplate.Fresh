/**
 * NY Exchange Offerings - Gemini Index - Cryptocurrencies available on Gemini NY Exchange
 * 
 * This list contains cryptocurrencies that are available for trading on Gemini's
 * New York State cryptocurrency exchange. These offerings represent a curated selection
 * of digital assets that have been approved for trading in New York State through
 * Gemini's platform under BitLicense and Limited Purpose Trust Company charter.
 * 
 * This index excludes assets that are specifically restricted for NY residents,
 * such as USDT (Tether), BOME (Book of Meme), and certain Solana SPL tokens.
 * 
 * This index is used for NY exchange-specific displays, Gemini integration features,
 * and regulatory-compliant currency selection interfaces.
 * 
 * Last Updated: December 2025
 * Source: Gemini Support Documentation, NYDFS Greenlist, and Gemini regulatory filings
 */

export interface NYExchangeOfferingsGeminiItem {
  id: string;
  symbol: string;
  name: string;
}

export const NY_EXCHANGE_OFFERINGS_GEMINI: NYExchangeOfferingsGeminiItem[] = [
  { id: 'aave', symbol: 'AAVE', name: 'Aave' },
  { id: 'alethea-artificial-liquid-intelligence', symbol: 'ALI', name: 'Alethea Artificial Liquid Intelligence' },
  { id: 'amp', symbol: 'AMP', name: 'Amp' },
  { id: 'ankr', symbol: 'ANKR', name: 'Ankr' },
  { id: 'apecoin', symbol: 'APE', name: 'ApeCoin' },
  { id: 'api3', symbol: 'API3', name: 'API3' },
  { id: 'arbitrum', symbol: 'ARB', name: 'Arbitrum' },
  { id: 'fetch-ai', symbol: 'FET', name: 'Fetch AI' },
  { id: 'atom', symbol: 'ATOM', name: 'Cosmos' },
  { id: 'avalanche-2', symbol: 'AVAX', name: 'Avalanche' },
  { id: 'basic-attention-token', symbol: 'BAT', name: 'Basic Attention Token' },
  { id: 'bitcoin-cash', symbol: 'BCH', name: 'Bitcoin Cash' },
  { id: 'bonk', symbol: 'BONK', name: 'Bonk' },
  { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin' },
  { id: 'chainlink', symbol: 'LINK', name: 'Chainlink' },
  { id: 'chiliz', symbol: 'CHZ', name: 'Chiliz' },
  { id: 'compound-governance-token', symbol: 'COMP', name: 'Compound' },
  { id: 'cryptex-finance', symbol: 'CTX', name: 'Cryptex Finance' },
  { id: 'curve-dao-token', symbol: 'CRV', name: 'Curve DAO Token' },
  { id: 'dai', symbol: 'DAI', name: 'Dai' },
  { id: 'decentraland', symbol: 'MANA', name: 'Decentraland' },
  { id: 'dogecoin', symbol: 'DOGE', name: 'Dogecoin' }, 
  { id: 'dogwifhat', symbol: 'WIF', name: 'DogWifHat' },
  { id: 'dogelon-mars', symbol: 'ELON', name: 'Dogelon Mars' },
  { id: 'dot', symbol: 'DOT', name: 'Polkadot' },
  { id: 'drift', symbol: 'DRIFT', name: 'Drift' },
  { id: 'ethereum', symbol: 'ETH', name: 'Ethereum' },
  { id: 'ethereum-name-service', symbol: 'ENS', name: 'Ethereum Name Service' },
  { id: 'fantom', symbol: 'FTM', name: 'Fantom' },
  { id: 'filecoin', symbol: 'FIL', name: 'Filecoin' },
  { id: 'gala', symbol: 'GALA', name: 'Gala' },
  { id: 'gemini-dollar', symbol: 'GUSD', name: 'Gemini Dollar' },
  { id: 'gmt', symbol: 'GMT', name: 'STEPN' },
  { id: 'the-graph', symbol: 'GRT', name: 'The Graph' },
  { id: 'helium', symbol: 'HNT', name: 'Helium' },
  { id: 'immutable-x', symbol: 'IMX', name: 'Immutable X' },
  { id: 'injective', symbol: 'INJ', name: 'Injective' },
  { id: 'iotex', symbol: 'IOTX', name: 'IoTeX' },
  { id: 'jito', symbol: 'JTO', name: 'Jito' },
  { id: 'jito-staked-sol', symbol: 'JITOSOL', name: 'Jito Staked SOL' },
  { id: 'jupiter', symbol: 'JUP', name: 'Jupiter' },
  { id: 'kamino', symbol: 'KMNO', name: 'Kamino' },
  { id: 'lido-dao', symbol: 'LDO', name: 'Lido DAO' },
  { id: 'chainlink', symbol: 'LINK', name: 'Chainlink' },
  { id: 'livepeer', symbol: 'LPT', name: 'Livepeer' },
  { id: 'loopring', symbol: 'LRC', name: 'Loopring' },
  { id: 'litecoin', symbol: 'LTC', name: 'Litecoin' },
  { id: 'mask-network', symbol: 'MASK', name: 'Mask Network' },
  { id: 'optimism', symbol: 'OP', name: 'Optimism' },
  { id: 'pax-gold', symbol: 'PAXG', name: 'Pax Gold' },
  { id: 'pepe', symbol: 'PEPE', name: 'Pepe' },
  { id: 'polygon', symbol: 'POL', name: 'Polygon' },
  { id: 'pyth-network', symbol: 'PYTH', name: 'Pyth Network' },
  { id: 'quant', symbol: 'QNT', name: 'Quant' },
  { id: 'ripple-usd', symbol: 'RLUSD', name: 'Ripple USD' },
  { id: 'render-token', symbol: 'RNDR', name: 'Render Token' },
  { id: 'samoyedcoin', symbol: 'SAMO', name: 'Samoyedcoin' },
  { id: 'the-sandbox', symbol: 'SAND', name: 'The Sandbox' },
  { id: 'shiba-inu', symbol: 'SHIB', name: 'Shiba Inu' },
  { id: 'skale', symbol: 'SKL', name: 'SKALE' },
  { id: 'sky', symbol: 'SKY', name: 'Sky' },
  { id: 'solana', symbol: 'SOL', name: 'Solana' },
  { id: 'somnium-space-cube', symbol: 'CUBE', name: 'Somnium Space' },
  { id: 'storj', symbol: 'STORJ', name: 'Storj' },
  { id: 'sushiswap', symbol: 'SUSHI', name: 'SushiSwap' },
  { id: 'uma', symbol: 'UMA', name: 'UMA' },
  { id: 'uniswap', symbol: 'UNI', name: 'Uniswap' },
  { id: 'usd-coin', symbol: 'USDC', name: 'USD Coin' },
  { id: 'ripple', symbol: 'XRP', name: 'XRP' },
  { id: 'tezos', symbol: 'XTZ', name: 'Tezos' },
  { id: 'yearn-finance', symbol: 'YFI', name: 'yearn.finance' },
  { id: 'zcash', symbol: 'ZEC', name: 'Zcash' }
];

export default NY_EXCHANGE_OFFERINGS_GEMINI;
