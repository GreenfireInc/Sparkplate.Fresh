// Dogecoin (DOGE) Oracles Index - Export Module
// This module exports all Dogecoin-based oracles for price feeds and blockchain data

export { diaOracle as dogecoinDiaOracle } from './dia';
export { coingeckoOracle as dogecoinCoingeckoOracle } from './coingecko';
export { binanceOracle as dogecoinBinanceOracle } from './binance';
export { cryptocompareOracle as dogecoinCryptocompareOracle } from './cryptocompare';
export { bitqueryOracle as dogecoinBitqueryOracle } from './bitquery';
export { blockcypherOracle as dogecoinBlockcypherOracle } from './blockcypher';
export { chainlinkOracle as dogecoinChainlinkOracle } from './chainlink';
export { dogechainOracle as dogecoinDogechainOracle } from './dogechain';

// Lazy-load object for all Dogecoin oracles
export const dogecoinOraclesLazy = {
  dia: () => import('./dia').then(m => m.diaOracle),
  coingecko: () => import('./coingecko').then(m => m.coingeckoOracle),
  binance: () => import('./binance').then(m => m.binanceOracle),
  cryptocompare: () => import('./cryptocompare').then(m => m.cryptocompareOracle),
  bitquery: () => import('./bitquery').then(m => m.bitqueryOracle),
  blockcypher: () => import('./blockcypher').then(m => m.blockcypherOracle),
  chainlink: () => import('./chainlink').then(m => m.chainlinkOracle),
  dogechain: () => import('./dogechain').then(m => m.dogechainOracle),
};

// Metadata for Dogecoin Oracle ecosystem
export const dogecoinOraclesMetadata = {
  totalOracles: 8,
  blockchain: 'Dogecoin (DOGE)',
  categories: {
    decentralized: ['DIA', 'Chainlink (limited)'],
    exchangeAPIs: ['Binance', 'CoinGecko', 'CryptoCompare'],
    blockchainExplorers: ['Dogechain', 'BlockCypher', 'Bitquery'],
    marketData: ['CoinGecko', 'CryptoCompare', 'Binance'],
  },
  features: {
    priceFeeds: ['DIA', 'CoinGecko', 'CryptoCompare', 'Binance', 'Dogechain'],
    blockchainData: ['Dogechain', 'BlockCypher', 'Bitquery'],
    historicalData: ['CoinGecko', 'CryptoCompare', 'Binance'],
    realTimeData: ['Binance', 'CoinGecko', 'DIA', 'BlockCypher'],
    dexData: ['CoinGecko', 'Bitquery'],
  },
  integration: {
    primaryPackages: ['axios', 'graphql-request', 'ethers'],
    rpcEndpoint: 'N/A (UTXO-based, use explorers)',
    indexers: ['Dogechain', 'BlockCypher', 'Bitquery'],
  },
  notes: [
    'Dogecoin is UTXO-based, so no smart contract oracles natively',
    'DIA provides decentralized oracle with multi-source aggregation',
    'CoinGecko is the most reliable free API for price data',
    'Binance offers high-frequency real-time trading data',
    'Dogechain is the oldest established Dogecoin explorer',
    'BlockCypher offers webhooks for transaction monitoring',
    'Bitquery provides GraphQL API for blockchain queries',
    'Chainlink has limited support (mainly on EVM chains for DOGE/USD)',
    'Most oracles are off-chain APIs or cross-chain solutions',
    'For DEX data, use wrapped DOGE on EVM chains',
  ],
  dataSourcesByType: {
    price: {
      recommended: ['CoinGecko', 'DIA', 'CryptoCompare'],
      realTime: ['Binance', 'CoinGecko'],
      historical: ['CoinGecko', 'CryptoCompare'],
      decentralized: ['DIA'],
    },
    blockchain: {
      recommended: ['Dogechain', 'BlockCypher'],
      transactions: ['Dogechain', 'BlockCypher', 'Bitquery'],
      addresses: ['Dogechain', 'BlockCypher', 'Bitquery'],
      blocks: ['Dogechain', 'BlockCypher'],
      webhooks: ['BlockCypher'],
    },
  },
  nativeSupport: {
    dogecoinBlockchain: false, // No native on-chain oracles
    dogechainEVM: true, // Dogechain (EVM sidechain) supports oracles like DIA
    wrappedDOGE: true, // Wrapped DOGE on other chains can use standard DEX oracles
  },
  recommendations: {
    forWallets: ['CoinGecko', 'Dogechain'],
    forTradingBots: ['Binance', 'CoinGecko', 'CryptoCompare'],
    forDeFi: ['DIA', 'Chainlink (on EVM)'],
    forAnalytics: ['Bitquery', 'CoinGecko', 'BlockCypher'],
    forBlockchainData: ['Dogechain', 'BlockCypher', 'Bitquery'],
  },
};

