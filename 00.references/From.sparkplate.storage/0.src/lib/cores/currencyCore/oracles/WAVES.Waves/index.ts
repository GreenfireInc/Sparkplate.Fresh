// Waves (WAVES) Oracles Index - Export Module
// This module exports all Waves-based oracles for price feeds and off-chain data

export { wavesDataOracle } from './wavesData';
export { bandOracle as wavesBandOracle } from './band';
export { swopfiOracle as wavesSwopfiOracle } from './swopfi';
export { neutrinoOracle as wavesNeutrinoOracle } from './neutrino';
export { matcherOracle as wavesMatcherOracle } from './matcher';
export { enterpriseOracle as wavesEnterpriseOracle } from './enterprise';

// Lazy-load object for all Waves oracles
export const wavesOraclesLazy = {
  wavesData: () => import('./wavesData').then(m => m.wavesDataOracle),
  band: () => import('./band').then(m => m.bandOracle),
  swopfi: () => import('./swopfi').then(m => m.swopfiOracle),
  neutrino: () => import('./neutrino').then(m => m.neutrinoOracle),
  matcher: () => import('./matcher').then(m => m.matcherOracle),
  enterprise: () => import('./enterprise').then(m => m.enterpriseOracle),
};

// Metadata for Waves Oracle ecosystem
export const wavesOraclesMetadata = {
  totalOracles: 6,
  blockchain: 'Waves (WAVES)',
  categories: {
    native: ['Waves Data Oracle', 'Swop.fi', 'Neutrino', 'Matcher'],
    crossChain: ['Band Protocol'],
    enterprise: ['Waves Enterprise'],
    dex: ['Swop.fi', 'Matcher'],
    defi: ['Neutrino', 'Swop.fi'],
  },
  features: {
    priceFeeds: ['Waves Data Oracle', 'Band Protocol', 'Swop.fi', 'Neutrino', 'Matcher'],
    realTimeData: ['Matcher', 'Swop.fi'],
    customData: ['Waves Data Oracle'],
    enterpriseGrade: ['Waves Enterprise'],
    accountBased: ['Waves Data Oracle', 'Swop.fi', 'Neutrino'],
    orderBook: ['Matcher'],
  },
  integration: {
    primarySDK: '@waves/waves-transactions',
    secondarySDK: '@waves/ts-lib-crypto',
    tertiarySDK: '@waves/signer',
    nodeEndpoint: 'https://nodes.wavesnodes.com',
    matcherEndpoint: 'https://matcher.waves.exchange/api/v1',
    testnetNode: 'https://nodes-testnet.wavesnodes.com',
  },
  notes: [
    'Waves uses account-based oracle model - any account can be an oracle',
    'Most decentralized oracle approach compared to Ethereum',
    'Data stored in account data storage on-chain',
    'Free to read oracle data, 0.1 WAVES per KB to publish',
    'Swop.fi and Neutrino are most widely used for DeFi',
    'Matcher provides most real-time trading data',
    'Band Protocol offers multi-source cross-chain data',
    'Waves Enterprise for private/permissioned networks',
    'No API keys required for public oracles',
    'Simple key-value storage model',
  ],
};

