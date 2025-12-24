// Tezos (XTZ) Oracles Index - Export Module
// This module exports all Tezos-based oracles for price feeds and off-chain data

export { harbingerOracle as tezosHarbingerOracle } from './harbinger';
export { chainlinkOracle as tezosChainlinkOracle } from './chainlink';
export { wolframAlphaOracle as tezosWolframAlphaOracle } from './wolframalpha';
export { diaOracle as tezosDiaOracle } from './dia';
export { kaikoOracle as tezosKaikoOracle } from './kaiko';
export { ubineticOracle as tezosUbineticOracle } from './ubinetic';

// Lazy-load object for all Tezos oracles
export const tezosOraclesLazy = {
  harbinger: () => import('./harbinger').then(m => m.harbingerOracle),
  chainlink: () => import('./chainlink').then(m => m.chainlinkOracle),
  wolframAlpha: () => import('./wolframalpha').then(m => m.wolframAlphaOracle),
  dia: () => import('./dia').then(m => m.diaOracle),
  kaiko: () => import('./kaiko').then(m => m.kaikoOracle),
  ubinetic: () => import('./ubinetic').then(m => m.ubineticOracle),
};

// Metadata for Tezos Oracle ecosystem
export const tezosOraclesMetadata = {
  totalOracles: 6,
  blockchain: 'Tezos (XTZ)',
  categories: {
    decentralized: ['Harbinger', 'Chainlink', 'DIA'],
    computational: ['Wolfram Alpha'],
    marketData: ['Kaiko', 'DIA'],
    apiService: ['Ubinetic'],
  },
  features: {
    priceFeeds: ['Harbinger', 'Chainlink', 'DIA', 'Kaiko'],
    realWorldData: ['Wolfram Alpha', 'Kaiko', 'Ubinetic'],
    computationalData: ['Wolfram Alpha'],
    iotData: ['Ubinetic'],
    paymentData: ['Ubinetic'],
  },
  integration: {
    primarySDK: '@taquito/taquito',
    rpcEndpoint: 'https://mainnet.api.tez.ie',
    indexer: 'https://api.tzkt.io',
  },
  notes: [
    'Harbinger is the most widely adopted native Tezos oracle',
    'Chainlink provides cross-chain oracle capabilities',
    'DIA offers transparent multi-source price feeds',
    'Wolfram Alpha enables computational queries',
    'Kaiko provides institutional-grade market data',
    'Ubinetic focuses on secure API and IoT integration',
    'Most oracles require API keys or authentication',
    'Taquito SDK is the primary tool for on-chain oracle integration',
  ],
};

