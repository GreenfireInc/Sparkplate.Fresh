// XRP Ledger (XRPL) Oracles Index - Export Module
// This module exports all XRP Ledger-based oracles for price feeds and off-chain data

export { xrplNativeOracle } from './xrplNative';
export { diaOracle as xrpDiaOracle } from './dia';
export { bandProtocolOracle as xrpBandProtocolOracle } from './bandProtocol';
export { chainlinkOracle as xrpChainlinkOracle } from './chainlink';
export { pythNetworkOracle as xrpPythNetworkOracle } from './pythNetwork';

// Lazy-load object for all XRP oracles
export const xrpOraclesLazy = {
  xrplNative: () => import('./xrplNative').then(m => m.xrplNativeOracle),
  dia: () => import('./dia').then(m => m.diaOracle),
  bandProtocol: () => import('./bandProtocol').then(m => m.bandProtocolOracle),
  chainlink: () => import('./chainlink').then(m => m.chainlinkOracle),
  pythNetwork: () => import('./pythNetwork').then(m => m.pythNetworkOracle),
};

// Metadata for XRP Oracle ecosystem
export const xrpOraclesMetadata = {
  totalOracles: 5,
  blockchain: 'XRP Ledger (XRPL)',
  categories: {
    native: ['XRPL Native Price Oracle'],
    crossChain: ['DIA Oracle', 'Band Protocol', 'Chainlink', 'Pyth Network'],
    decentralized: ['XRPL Native Price Oracle', 'DIA Oracle', 'Band Protocol', 'Chainlink'],
    highFrequency: ['Pyth Network'],
    institutionalGrade: ['DIA Oracle', 'Chainlink', 'Pyth Network'],
  },
  features: {
    priceFeeds: ['XRPL Native Price Oracle', 'DIA Oracle', 'Band Protocol', 'Chainlink', 'Pyth Network'],
    onChainStorage: ['XRPL Native Price Oracle', 'DIA Oracle'],
    realTimeData: ['XRPL Native Price Oracle', 'DIA Oracle', 'Band Protocol', 'Chainlink', 'Pyth Network'],
    confidenceIntervals: ['Pyth Network'],
    customData: ['Band Protocol', 'Chainlink'],
    vrf: ['Chainlink'],
  },
  integration: {
    primarySDK: 'xrpl',
    rpcEndpoint: 'wss://xrplcluster.com',
    testnetEndpoint: 'wss://s.altnet.rippletest.net:51233',
    explorer: 'https://xrpscan.com',
    evmSidechain: 'https://rpc.xrplevm.org',
  },
  dataTypes: {
    assetPrices: {
      supported: ['XRP/USD', 'XRP/EUR', 'XRP/BTC', 'XRP/ETH'],
      providers: ['XRPL Native', 'DIA', 'Band Protocol', 'Chainlink', 'Pyth Network'],
    },
    marketData: {
      supported: ['Volume', 'Market Cap', 'Supply Data'],
      providers: ['DIA', 'Band Protocol', 'Chainlink'],
    },
    customData: {
      supported: ['External APIs', 'IoT Data', 'Sports Data', 'Weather Data'],
      providers: ['Band Protocol', 'Chainlink'],
    },
  },
  updateFrequencies: {
    'XRPL Native': 'Real-time (as published by oracles)',
    'DIA': 'Real-time',
    'Band Protocol': 'Real-time to minutes (configurable)',
    'Chainlink': 'Deviation-based or heartbeat triggers',
    'Pyth Network': 'Sub-second (400ms typical)',
  },
  notes: [
    'XRPL Native oracles provide the most direct integration with XRPL',
    'DIA offers transparent multi-source price feeds with XRPL integration',
    'Band Protocol provides cross-chain oracle capabilities via XRPL EVM',
    'Chainlink brings industry-leading security and proven track record',
    'Pyth Network offers ultra-low latency for high-frequency applications',
    'Most oracles support both mainnet and testnet environments',
    'Native oracles require authorized accounts for data publishing',
    'Cross-chain oracles may require bridge mechanisms or sidechains',
  ],
  useCases: {
    defi: ['AMMs', 'Lending protocols', 'Derivatives', 'Stablecoins'],
    payments: ['Cross-currency routing', 'Dynamic exchange rates'],
    trading: ['Algorithmic trading', 'Arbitrage', 'Market making'],
    enterprise: ['Risk management', 'Portfolio valuation', 'Compliance'],
    gaming: ['NFT pricing', 'In-game economies', 'Randomness (VRF)'],
  },
  bestPractices: [
    'Use multiple oracles for critical applications',
    'Always check data freshness and timestamps',
    'Implement robust error handling and fallbacks',
    'Consider data scaling factors and decimal precision',
    'Test thoroughly on testnet before mainnet deployment',
    'Monitor oracle health and uptime',
    'Validate data sources and reputation',
  ],
};
