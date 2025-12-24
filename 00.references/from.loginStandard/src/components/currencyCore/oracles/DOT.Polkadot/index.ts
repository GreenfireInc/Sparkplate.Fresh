// Polkadot (DOT) Oracles Index - Export Module
// This module exports all Polkadot-based oracles for price feeds, blockchain data, and off-chain computation

export { acurastOracle as polkadotAcurastOracle } from './acurast';
export { chainlinkOracle as polkadotChainlinkOracle } from './chainlink';
export { diaOracle as polkadotDiaOracle } from './dia';
export { kylinOracle as polkadotKylinOracle } from './kylin';
export { subscanOracle as polkadotSubscanOracle } from './subscan';
export { subqueryOracle as polkadotSubqueryOracle } from './subquery';
export { polkadotjsOracle as polkadotPolkadotjsOracle } from './polkadotjs';

// Lazy-load object for all Polkadot oracles
export const polkadotOraclesLazy = {
  acurast: () => import('./acurast').then(m => m.acurastOracle),
  chainlink: () => import('./chainlink').then(m => m.chainlinkOracle),
  dia: () => import('./dia').then(m => m.diaOracle),
  kylin: () => import('./kylin').then(m => m.kylinOracle),
  subscan: () => import('./subscan').then(m => m.subscanOracle),
  subquery: () => import('./subquery').then(m => m.subqueryOracle),
  polkadotjs: () => import('./polkadotjs').then(m => m.polkadotjsOracle),
};

// Metadata for Polkadot Oracle ecosystem
export const polkadotOraclesMetadata = {
  totalOracles: 7,
  blockchain: 'Polkadot (DOT)',
  categories: {
    decentralized: ['Acurast', 'Chainlink', 'DIA', 'Kylin Network'],
    blockchainExplorers: ['Subscan'],
    indexers: ['SubQuery'],
    directAccess: ['Polkadot.js API'],
    offChainCompute: ['Acurast'],
  },
  features: {
    priceFeeds: ['DIA', 'Chainlink', 'Kylin Network', 'Acurast'],
    blockchainData: ['Subscan', 'Polkadot.js API', 'SubQuery'],
    historicalData: ['SubQuery', 'Subscan', 'DIA'],
    realTimeData: ['Polkadot.js API', 'SubQuery', 'Kylin Network'],
    dexData: ['SubQuery', 'DIA'],
    customCompute: ['Acurast'],
  },
  integration: {
    primarySDK: '@polkadot/api',
    utilityPackages: ['@polkadot/util-crypto', '@polkadot/keyring'],
    graphQL: ['SubQuery'],
    restAPIs: ['Subscan', 'DIA', 'Kylin Network'],
    rpcEndpoint: 'wss://rpc.polkadot.io',
    mainnetRPC: 'wss://rpc.polkadot.io',
    kusamaRPC: 'wss://kusama-rpc.polkadot.io',
  },
  notes: [
    'Polkadot oracles often integrate via runtime pallets',
    'Acurast provides flexible off-chain computation with TEE',
    'Chainlink offers Substrate pallet and Moonbeam EVM integration',
    'DIA has Polkadot Medianizer algorithm for price calculation',
    'Subscan is most comprehensive Substrate ecosystem explorer',
    'SubQuery is Polkadot\'s equivalent to The Graph',
    'Polkadot.js API provides direct blockchain access',
    'Kylin Network focuses on cross-chain oracle capabilities',
    'Most oracles support Substrate-based chains and parachains',
    'Runtime pallets preferred over smart contracts for oracles',
  ],
  dataSourcesByType: {
    price: {
      recommended: ['DIA', 'Chainlink', 'Kylin Network'],
      realTime: ['Kylin Network', 'DIA', 'Polkadot.js API'],
      historical: ['DIA', 'SubQuery'],
      decentralized: ['DIA', 'Chainlink', 'Acurast'],
    },
    blockchain: {
      recommended: ['Polkadot.js API', 'Subscan'],
      transactions: ['Subscan', 'Polkadot.js API', 'SubQuery'],
      addresses: ['Subscan', 'Polkadot.js API'],
      blocks: ['Polkadot.js API', 'Subscan'],
      events: ['Polkadot.js API', 'SubQuery'],
    },
    dex: {
      recommended: ['SubQuery'],
      trades: ['SubQuery'],
      liquidity: ['SubQuery'],
      prices: ['SubQuery', 'DIA'],
    },
  },
  nativeSupport: {
    substratePallets: true,
    runtimeIntegration: true,
    evmParachains: true, // Moonbeam, Astar, etc.
    offChainWorkers: true,
  },
  recommendations: {
    forWallets: ['Polkadot.js API', 'Subscan'],
    forDeFi: ['DIA', 'Chainlink', 'Acurast', 'SubQuery'],
    forAnalytics: ['SubQuery', 'Subscan', 'DIA'],
    forBlockchainData: ['Polkadot.js API', 'Subscan', 'SubQuery'],
    forDEXIntegration: ['SubQuery', 'DIA'],
    forCustomCompute: ['Acurast'],
  },
  parachainSupport: {
    moonbeam: ['Chainlink (EVM)', 'SubQuery', 'DIA'],
    acala: ['SubQuery', 'DIA'],
    astar: ['SubQuery', 'DIA'],
    hydradx: ['SubQuery', 'DIA'],
    kusama: ['All oracles support Kusama'],
  },
};

