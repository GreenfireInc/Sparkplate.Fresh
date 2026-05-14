// Litecoin (LTC) Oracles Index - Export Module
// This module exports all Litecoin oracles for price feeds, blockchain data, and market analytics

export { pythOracle as litecoinPythOracle } from './pyth';
export { diaOracle as litecoinDiaOracle } from './dia';
export { redstoneOracle as litecoinRedstoneOracle } from './redstone';
export { chainlinkOracle as litecoinChainlinkOracle } from './chainlink';
export { blockchairOracle as litecoinBlockchairOracle } from './blockchair';
export { blockcypherOracle as litecoinBlockcypherOracle } from './blockcypher';
export { coingeckoOracle as litecoinCoingeckoOracle } from './coingecko';

// Lazy-load object for all Litecoin oracles
export const litecoinOraclesLazy = {
  pyth: () => import('./pyth').then(m => m.pythOracle),
  dia: () => import('./dia').then(m => m.diaOracle),
  redstone: () => import('./redstone').then(m => m.redstoneOracle),
  chainlink: () => import('./chainlink').then(m => m.chainlinkOracle),
  blockchair: () => import('./blockchair').then(m => m.blockchairOracle),
  blockcypher: () => import('./blockcypher').then(m => m.blockcypherOracle),
  coingecko: () => import('./coingecko').then(m => m.coingeckoOracle),
};

// Metadata for Litecoin Oracle ecosystem
export const litecoinOraclesMetadata = {
  totalOracles: 7,
  blockchain: 'Litecoin (LTC)',
  blockchainType: 'UTXO-based (Bitcoin Fork)',
  categories: {
    priceOracles: ['Pyth', 'DIA', 'RedStone', 'CoinGecko'],
    blockchainExplorers: ['Blockchair', 'BlockCypher'],
    marketData: ['CoinGecko'],
    wrappedTokens: ['Chainlink (wLTC only)'],
  },
  features: {
    priceFeeds: ['Pyth', 'DIA', 'RedStone', 'CoinGecko'],
    blockchainData: ['Blockchair', 'BlockCypher'],
    historicalData: ['DIA', 'CoinGecko', 'Blockchair'],
    realTimeData: ['Pyth', 'BlockCypher', 'CoinGecko'],
    utxoTracking: ['Blockchair', 'BlockCypher'],
    transactionBroadcasting: ['BlockCypher'],
    webhooks: ['BlockCypher'],
  },
  integration: {
    primaryPackages: ['axios'],
    blockchainType: 'UTXO',
    consensusMechanism: 'Proof of Work (Scrypt)',
    addressFormats: ['P2PKH (L)', 'P2SH (M)', 'P2WPKH (ltc1)', 'MWEB (ltc1mweb)'],
    rpcCompatibility: 'Bitcoin Core RPC compatible',
    maxSupply: '84,000,000 LTC',
  },
  notes: [
    'Litecoin is a UTXO-based blockchain (Bitcoin fork)',
    'Pyth provides fastest price updates (400ms)',
    'DIA offers transparent, open-source oracle data',
    'RedStone provides modular price feeds',
    'Chainlink does NOT support native LTC (only wLTC on EVM chains)',
    'Blockchair offers 1,000 free requests/day',
    'BlockCypher supports webhooks for real-time notifications',
    'CoinGecko provides comprehensive market data',
    'Litecoin uses Scrypt for Proof of Work',
    'MWEB (MimbleWimble Extension Block) adds privacy features',
  ],
  dataSourcesByType: {
    price: {
      recommended: ['Pyth', 'DIA', 'CoinGecko'],
      realTime: ['Pyth', 'CoinGecko'],
      historical: ['DIA', 'CoinGecko'],
      openSource: ['DIA'],
      highFrequency: ['Pyth'],
      modular: ['RedStone'],
      wrappedLTC: ['Chainlink'],
    },
    blockchain: {
      recommended: ['Blockchair', 'BlockCypher'],
      utxoData: ['Blockchair', 'BlockCypher'],
      transactions: ['Blockchair', 'BlockCypher'],
      addresses: ['Blockchair', 'BlockCypher'],
      blocks: ['Blockchair', 'BlockCypher'],
      broadcasting: ['BlockCypher'],
      webhooks: ['BlockCypher'],
    },
    market: {
      recommended: ['CoinGecko'],
      priceData: ['CoinGecko', 'Pyth', 'DIA'],
      volume: ['CoinGecko', 'Blockchair'],
      marketCap: ['CoinGecko'],
      exchanges: ['CoinGecko'],
      athAtl: ['CoinGecko'],
    },
  },
  nativeSupport: {
    smartContracts: false,
    scriptLanguage: 'Bitcoin Script (limited)',
    utxoModel: true,
    segwitSupport: true,
    mwebSupport: true,
    atomicSwaps: true,
    lightningNetwork: true,
  },
  recommendations: {
    forWallets: ['Blockchair', 'BlockCypher', 'CoinGecko'],
    forTrading: ['Pyth', 'CoinGecko', 'DIA'],
    forAnalytics: ['CoinGecko', 'Blockchair', 'DIA'],
    forBlockchainData: ['Blockchair', 'BlockCypher'],
    forRealTime: ['Pyth', 'BlockCypher'],
    forTransactionMonitoring: ['BlockCypher (webhooks)', 'Blockchair'],
    forPaymentProcessing: ['BlockCypher', 'Blockchair'],
    forHistoricalAnalysis: ['CoinGecko', 'DIA'],
  },
  ltcSpecificFeatures: {
    segwit: {
      description: 'Segregated Witness support',
      addressPrefix: 'ltc1 (P2WPKH), M (P2SH-SegWit)',
      benefits: ['Lower fees', 'Higher throughput', 'Lightning Network compatibility'],
    },
    mweb: {
      description: 'MimbleWimble Extension Block',
      addressPrefix: 'ltc1mweb',
      features: ['Confidential transactions', 'CoinJoin mixing', 'Stealth addresses', 'Pruning'],
      adoption: '150,000+ LTC locked',
      wallets: ['Cake Wallet', 'Litecoin Core', 'Electrum LTC'],
    },
    mining: {
      algorithm: 'Scrypt',
      blockTime: '2.5 minutes',
      blockReward: 'Halves every 840,000 blocks',
      difficulty: 'Adjusts every 2016 blocks',
    },
  },
  chainlinkWarning: {
    nativeSupport: false,
    onlyWrappedLTC: true,
    note: 'Chainlink does not support native Litecoin. Use wLTC on EVM chains or alternative oracles (Pyth, DIA, RedStone) for native LTC.',
    alternatives: ['Pyth Network (recommended)', 'DIA', 'RedStone', 'CoinGecko'],
  },
  updateFrequency: {
    pyth: '400ms (continuous)',
    dia: 'Minutes (varies by asset)',
    redstone: 'Pull-based (on-demand)',
    chainlink: 'N/A for native LTC (wLTC only on EVM)',
    blockchair: 'Real-time blockchain data',
    blockcypher: 'Real-time blockchain data',
    coingecko: 'Minutes (market data)',
  },
  gasCosts: {
    pyth: 'N/A (off-chain API)',
    dia: 'N/A (off-chain API)',
    redstone: 'N/A (off-chain API)',
    chainlink: 'N/A for native LTC',
    blockchair: 'Free (REST API)',
    blockcypher: 'Free (REST API)',
    coingecko: 'Free (REST API)',
    note: 'LTC transaction fees apply when broadcasting transactions',
  },
  rateLimits: {
    pyth: 'No rate limit',
    dia: 'No rate limit',
    redstone: 'No rate limit',
    blockchair: '1,000 requests/day (free tier)',
    blockcypher: '3 req/sec, 200 req/hour (free tier)',
    coingecko: '10-50 calls/minute (free tier)',
  },
};

