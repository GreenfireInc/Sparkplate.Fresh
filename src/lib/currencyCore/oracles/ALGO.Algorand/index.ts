// Algorand (ALGO) Oracles Index - Export Module
// This module exports all Algorand-based oracles for price feeds, randomness, and off-chain data

export { pythNetworkOracleALGO as algoPythNetworkOracle } from './pythNetwork';
export { chainlinkOracleALGO as algoChainlinkOracle } from './chainlink';
export { algorandFoundationOracle as algoFoundationOracle } from './algorandFoundation';
export { goracleOracle as algoGoracleOracle } from './goracle';
export { folksFeedOracle as algoFolksFeedOracle } from './folksFeedOracle';
export { diaOracleALGO as algoDiaOracle } from './dia';
export { randomnessBeaconOracle as algoRandomnessBeacon } from './randomnessBeacon';

// Lazy-load object for all Algorand oracles
export const algoOraclesLazy = {
  pythNetwork: () => import('./pythNetwork').then(m => m.pythNetworkOracleALGO),
  chainlink: () => import('./chainlink').then(m => m.chainlinkOracleALGO),
  foundation: () => import('./algorandFoundation').then(m => m.algorandFoundationOracle),
  goracle: () => import('./goracle').then(m => m.goracleOracle),
  folksFeed: () => import('./folksFeedOracle').then(m => m.folksFeedOracle),
  dia: () => import('./dia').then(m => m.diaOracleALGO),
  randomnessBeacon: () => import('./randomnessBeacon').then(m => m.randomnessBeaconOracle),
};

// Metadata for Algorand Oracle ecosystem
export const algoOraclesMetadata = {
  totalOracles: 7,
  blockchain: 'Algorand (ALGO)',
  categories: {
    priceFeeds: ['Pyth Network', 'Chainlink', 'Algorand Foundation Oracles', 'Goracle', 'Folks Feed Oracle', 'DIA Oracle'],
    randomness: ['Algorand Randomness Beacon'],
    customData: ['Goracle', 'Chainlink'],
    multiPurpose: ['Goracle'],
  },
  features: {
    priceOracles: ['Pyth Network', 'Chainlink', 'Algorand Foundation Oracles', 'Folks Feed Oracle', 'DIA Oracle', 'Goracle'],
    vrfRandomness: ['Algorand Randomness Beacon'],
    pullModel: ['Pyth Network'],
    pushModel: ['Chainlink', 'Algorand Foundation Oracles'],
    appSpecificOracles: ['Goracle'],
    lendingProtocol: ['Folks Feed Oracle'],
    officialFoundation: ['Algorand Foundation Oracles', 'Algorand Randomness Beacon'],
    communityDriven: ['DIA Oracle'],
    crossChain: ['Pyth Network', 'Chainlink', 'DIA Oracle'],
  },
  integration: {
    primarySDK: 'algosdk',
    mainnetEndpoint: 'https://mainnet-api.algonode.cloud',
    testnetEndpoint: 'https://testnet-api.algonode.cloud',
    indexerMainnet: 'https://mainnet-idx.algonode.cloud',
    indexerTestnet: 'https://testnet-idx.algonode.cloud',
  },
  notes: [
    'Pyth Network uses cost-effective pull-model ideal for Algorand low fees',
    'Chainlink provides industry-leading decentralized price feeds and VRF',
    'Algorand Foundation Oracles are official reference oracles for core assets',
    'Goracle (Gora Network) offers app-specific oracles and custom data feeds',
    'Folks Feed Oracle specializes in lending protocol price feeds',
    'DIA Oracle provides transparent multi-source aggregation for 20,000+ assets',
    'Algorand Randomness Beacon is the official VRF-based randomness service',
    'All oracles integrate via algosdk and smart contract interactions',
    'AVM version 7+ required for randomness beacon (vrf_verify opcode)',
    'Multiple oracle options enable diverse use cases on Algorand',
  ],
};

