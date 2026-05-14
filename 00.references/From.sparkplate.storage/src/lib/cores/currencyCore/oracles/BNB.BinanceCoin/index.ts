// BNB Chain (BNB) Oracles Index - Export Module
// This module exports all BNB Chain oracles for price feeds, randomness, and off-chain data

export { bnbChainlinkOracle } from './chainlink';
export { bnbBinanceOracle } from './binanceOracle';
export { bnbBandProtocolOracle } from './bandProtocol';
export { bnbPythNetworkOracle } from './pythNetwork';
export { bnbTellorOracle } from './tellor';
export { bnbUmbrellaNetworkOracle } from './umbrellaNetwork';
export { bnbDiaOracle } from './dia';
export { bnbApi3Oracle } from './api3';
export { bnbRedstoneOracle } from './redstone';

// Lazy-load object for all BNB Chain oracles
export const bnbOraclesLazy = {
  chainlink: () => import('./chainlink').then(m => m.bnbChainlinkOracle),
  binanceOracle: () => import('./binanceOracle').then(m => m.bnbBinanceOracle),
  bandProtocol: () => import('./bandProtocol').then(m => m.bnbBandProtocolOracle),
  pythNetwork: () => import('./pythNetwork').then(m => m.bnbPythNetworkOracle),
  tellor: () => import('./tellor').then(m => m.bnbTellorOracle),
  umbrellaNetwork: () => import('./umbrellaNetwork').then(m => m.bnbUmbrellaNetworkOracle),
  dia: () => import('./dia').then(m => m.bnbDiaOracle),
  api3: () => import('./api3').then(m => m.bnbApi3Oracle),
  redstone: () => import('./redstone').then(m => m.bnbRedstoneOracle),
};

// Metadata for BNB Chain Oracle ecosystem
export const bnbOraclesMetadata = {
  totalOracles: 9,
  blockchain: 'BNB Chain (BNB)',
  categories: {
    industryLeading: ['Chainlink'],
    nativeBNB: ['Binance Oracle'],
    crossChain: ['Band Protocol', 'API3'],
    highFrequency: ['Pyth Network', 'Binance Oracle'],
    permissionless: ['Tellor'],
    layer2: ['Umbrella Network'],
    communityDriven: ['DIA'],
    firstParty: ['API3'],
    modular: ['RedStone'],
    priceFeeds: ['All'],
    vrf: ['Chainlink', 'Band Protocol'],
  },
  features: {
    evmCompatible: true,
    multipleOracleOptions: true,
    lowTransactionFees: true,
    highThroughput: true,
    threeSecondBlockTime: true,
    matureEcosystem: true,
    defiIntegration: ['Chainlink', 'Pyth Network', 'Band Protocol'],
    institutionalGrade: ['Chainlink', 'Pyth Network'],
    customizableFeeds: ['DIA', 'RedStone', 'API3'],
  },
  integration: {
    primarySDK: 'ethers.js / web3.js (EVM-compatible)',
    rpcEndpoint: 'https://bsc-dataseed.binance.org/',
    chainId: 56,
    evmSupport: true,
    gasToken: 'BNB',
    averageBlockTime: '3 seconds',
  },
  notes: [
    'BNB Chain is EVM-compatible, supporting standard Ethereum oracle integration patterns',
    'Chainlink is the industry-standard oracle with 200+ price feeds on BNB Chain',
    'Binance Oracle is native to BNB Chain, optimized for 3-second block time',
    'Pyth Network provides sub-second updates ideal for high-frequency trading',
    'Band Protocol offers cross-chain oracle capability via IBC',
    'Multiple oracle options provide redundancy and diverse use case coverage',
    'Low transaction fees (~$0.10-0.50) make frequent oracle calls economical',
    'Strong DeFi ecosystem (PancakeSwap, Venus) relies on these oracles',
    'VRF randomness available via Chainlink and Band Protocol',
    'All oracles accessible via standard EVM tooling (ethers.js, web3.js)',
  ],
  recommendations: {
    productionDeFi: 'Chainlink (proven, widely adopted)',
    highFrequencyTrading: 'Pyth Network (sub-second updates)',
    nativeBNBOptimization: 'Binance Oracle (3-second latency)',
    crossChain: 'Band Protocol (IBC integration)',
    customData: 'API3 (first-party APIs) or DIA (customizable feeds)',
    censorshipResistance: 'Tellor (permissionless)',
    costEffective: 'Umbrella Network (Layer-2)',
    rwaTokenization: 'RedStone (RWA focus)',
    generalPurpose: 'Chainlink + Pyth Network (dual oracle)',
  },
  challenges: [
    'Oracle front-running risk on 3-second blocks (mitigate with Pyth pull model)',
    'Multiple oracle options require integration strategy',
    'Gas optimization important for frequent updates',
    'Price feed staleness monitoring needed',
  ],
  solutions: [
    'Use Pyth Network pull model for MEV-resistant updates',
    'Implement multi-oracle aggregation for critical data',
    'Cache oracle data when sub-second updates not needed',
    'Monitor feed timestamps and implement fallback mechanisms',
    'Use Chainlink for maximum reliability, Pyth for speed',
  ],
};
