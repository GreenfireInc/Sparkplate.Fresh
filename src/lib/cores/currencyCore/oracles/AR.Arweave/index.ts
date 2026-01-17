// Arweave (AR) Oracles Index - Export Module
// This module exports all Arweave-based oracles for price feeds and off-chain data

export { redstoneOracleAR as arRedstoneOracle } from './redstone';
export { orbitOracleAR as arOrbitOracle } from './orbit';
export { diaOracleAR as arDiaOracle } from './dia';
export { kyveOracleAR as arKyveOracle } from './kyve';
export { weavedbOracleAR as arWeaveDBOracle } from './weavedb';
export { everpayOracleAR as arEverpayOracle } from './everpay';
export { ansOracleAR as arAnsOracle } from './ans';

// Lazy-load object for all Arweave oracles
export const arOraclesLazy = {
  redstone: () => import('./redstone').then(m => m.redstoneOracleAR),
  orbit: () => import('./orbit').then(m => m.orbitOracleAR),
  dia: () => import('./dia').then(m => m.diaOracleAR),
  kyve: () => import('./kyve').then(m => m.kyveOracleAR),
  weavedb: () => import('./weavedb').then(m => m.weavedbOracleAR),
  everpay: () => import('./everpay').then(m => m.everpayOracleAR),
  ans: () => import('./ans').then(m => m.ansOracleAR),
};

// Metadata for Arweave Oracle ecosystem
export const arOraclesMetadata = {
  totalOracles: 7,
  blockchain: 'Arweave (AR)',
  categories: {
    priceFeeds: ['RedStone', 'DIA Oracle', 'EverPay'],
    arbitraryData: ['0rbit'],
    permanentStorage: ['RedStone', 'Kyve Network', 'WeaveDB', 'ANS & ArDrive'],
    aoBased: ['0rbit'],
    multiSource: ['DIA Oracle'],
    crossChain: ['RedStone', 'DIA Oracle', 'Kyve Network', 'EverPay'],
    database: ['WeaveDB'],
    metadata: ['ANS & ArDrive'],
  },
  features: {
    priceOracles: ['RedStone', 'DIA Oracle', 'EverPay'],
    permanentStorage: ['RedStone', 'Kyve Network', 'WeaveDB'],
    arbitraryDataFetching: ['0rbit'],
    aoIntegration: ['0rbit'],
    historicalData: ['RedStone', 'DIA Oracle', 'Kyve Network'],
    signatureVerification: ['RedStone', 'Kyve Network'],
    multiSourceAggregation: ['DIA Oracle'],
    smartweaveIntegration: ['RedStone', 'WeaveDB'],
    warpContracts: ['RedStone'],
    dataValidation: ['Kyve Network'],
    noSqlDatabase: ['WeaveDB'],
    paymentSettlement: ['EverPay'],
    nameResolution: ['ANS & ArDrive'],
  },
  integration: {
    primarySDK: 'arweave',
    redstoneSDK: 'redstone-api',
    orbitSDK: '@permaweb/aoconnect',
    diaSDK: 'axios',
    kyveSDK: '@kyvejs/sdk',
    weavedbSDK: 'weavedb-sdk-node',
    everpaySDK: 'everpay',
    ansSDK: '@ar-io/sdk',
    arweaveGateway: 'https://arweave.net',
    redstoneStorage: 'https://redstone.arweave.dev',
    orbitDocs: 'https://docs.0rbit.co/',
  },
  notes: [
    'RedStone stores all data permanently on Arweave for verifiability',
    'RedStone provides 1000+ asset price feeds with high-frequency updates',
    '0rbit enables AO processes to fetch arbitrary data from any URL',
    '0rbit is the first oracle built specifically for AO/Arweave ecosystem',
    'DIA Oracle aggregates from 85+ exchanges for 20,000+ assets',
    'DIA provides transparent multi-source aggregation methodology',
    'Kyve Network ensures data reliability through decentralized validation',
    'WeaveDB offers a decentralized NoSQL database solution on Arweave',
    'EverPay provides real-time payment settlement and price discovery',
    'ANS maps human-readable names to Arweave transaction IDs',
    'RedStone supports SmartWeave and Warp Contracts integration',
    '0rbit uses AO message-passing model for decentralized data fetching',
    'All oracles leverage Arweave\'s permanent storage capabilities',
    'RedStone data can be verified by checking permawebTx in responses',
    '0rbit requires understanding of AO process semantics',
    'DIA provides both REST and GraphQL APIs for flexible integration',
  ],
};