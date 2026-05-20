// Ethereum Classic (ETC) Oracles Index - Export Module
// This module exports all Ethereum Classic oracles for price feeds, blockchain data, and DEX analytics

export { hebeswapOracle as ethereumClassicHebeswapOracle } from './hebeswap';
export { chainlinkOracle as ethereumClassicChainlinkOracle } from './chainlink';
export { redstoneOracle as ethereumClassicRedstoneOracle } from './redstone';
export { blockscoutOracle as ethereumClassicBlockscoutOracle } from './blockscout';
export { blockcypherOracle as ethereumClassicBlockcypherOracle } from './blockcypher';
export { coingeckoOracle as ethereumClassicCoingeckoOracle } from './coingecko';
export { dexscreenerOracle as ethereumClassicDexscreenerOracle } from './dexscreener';

// Lazy-load object for all Ethereum Classic oracles
export const ethereumClassicOraclesLazy = {
  hebeswap: () => import('./hebeswap').then(m => m.hebeswapOracle),
  chainlink: () => import('./chainlink').then(m => m.chainlinkOracle),
  redstone: () => import('./redstone').then(m => m.redstoneOracle),
  blockscout: () => import('./blockscout').then(m => m.blockscoutOracle),
  blockcypher: () => import('./blockcypher').then(m => m.blockcypherOracle),
  coingecko: () => import('./coingecko').then(m => m.coingeckoOracle),
  dexscreener: () => import('./dexscreener').then(m => m.dexscreenerOracle),
};

// Metadata for Ethereum Classic Oracle ecosystem
export const ethereumClassicOraclesMetadata = {
  totalOracles: 7,
  blockchain: 'Ethereum Classic (ETC)',
  categories: {
    decentralized: ['HebeSwap Oracle', 'Chainlink (limited)', 'RedStone'],
    blockchainExplorers: ['Blockscout', 'BlockCypher'],
    marketData: ['CoinGecko'],
    dexAggregators: ['DEX Screener'],
  },
  features: {
    priceFeeds: ['HebeSwap Oracle', 'RedStone', 'CoinGecko', 'Chainlink (limited)'],
    blockchainData: ['Blockscout', 'BlockCypher'],
    historicalData: ['CoinGecko', 'Blockscout'],
    realTimeData: ['HebeSwap Oracle', 'RedStone', 'CoinGecko', 'BlockCypher'],
    dexData: ['DEX Screener', 'CoinGecko'],
    webhooks: ['BlockCypher'],
  },
  integration: {
    primaryPackages: ['ethers', 'axios', 'graphql-request'],
    evmCompatible: true,
    chainId: 61,
    rpcEndpoints: [
      'https://www.ethercluster.com/etc',
      'https://etc.rivet.link',
      'https://besu-at.etc-network.info',
    ],
    indexers: ['Blockscout', 'BlockCypher'],
  },
  notes: [
    'Ethereum Classic is EVM-compatible, enabling smart contract oracles',
    'HebeSwap Oracle is the primary native oracle for ETC',
    'Chainlink has limited native ETC support via ETC Labs collaboration',
    'RedStone is the only major oracle with direct ETC price feeds (no wrapped tokens)',
    'Blockscout is the official open-source ETC blockchain explorer',
    'BlockCypher provides robust API with webhook support',
    'CoinGecko offers the most reliable free API for ETC price data',
    'DEX Screener aggregates data from HebeSwap and ETCswap',
    'Most ETC DEX activity occurs on HebeSwap',
    'For cross-chain oracle data, wrapped ETC (wETC) can be used with Chainlink on other chains',
  ],
  dataSourcesByType: {
    price: {
      recommended: ['CoinGecko', 'RedStone', 'HebeSwap Oracle'],
      realTime: ['HebeSwap Oracle', 'RedStone', 'CoinGecko'],
      historical: ['CoinGecko'],
      decentralized: ['HebeSwap Oracle', 'RedStone', 'Chainlink (limited)'],
      dex: ['DEX Screener', 'CoinGecko'],
    },
    blockchain: {
      recommended: ['Blockscout', 'BlockCypher'],
      transactions: ['Blockscout', 'BlockCypher'],
      addresses: ['Blockscout', 'BlockCypher'],
      blocks: ['Blockscout', 'BlockCypher'],
      contracts: ['Blockscout'],
      webhooks: ['BlockCypher'],
    },
    dex: {
      recommended: ['DEX Screener'],
      pairs: ['DEX Screener'],
      liquidity: ['DEX Screener'],
      volume: ['DEX Screener', 'CoinGecko'],
    },
  },
  nativeSupport: {
    evmSmartContracts: true,
    chainId: 61,
    soliditySupport: true,
    web3Compatible: true,
    oracleContracts: true, // HebeSwap Oracle
  },
  recommendations: {
    forWallets: ['CoinGecko', 'Blockscout'],
    forDeFi: ['HebeSwap Oracle', 'RedStone', 'Chainlink (limited)'],
    forAnalytics: ['CoinGecko', 'DEX Screener', 'Blockscout'],
    forBlockchainData: ['Blockscout', 'BlockCypher'],
    forDEXIntegration: ['DEX Screener'],
    forTradingBots: ['CoinGecko', 'RedStone'],
    forRealTimeNotifications: ['BlockCypher (webhooks)'],
  },
  dexSupport: {
    hebeswap: ['DEX Screener', 'HebeSwap Oracle', 'CoinGecko'],
    etcswap: ['DEX Screener', 'CoinGecko'],
    classicdao: ['Limited support'],
  },
  comparisonToEthereum: {
    chainlinkSupport: 'Limited (via ETC Labs, primarily for wETC on other chains)',
    theGraphSupport: 'Not available (use Blockscout GraphQL instead)',
    dexMaturity: 'Smaller ecosystem (HebeSwap, ETCswap)',
    oracleMaturity: 'Growing (HebeSwap Oracle is native solution)',
    rpcAccess: 'Multiple free RPC providers available',
  },
};

