// Stellar (XLM) Oracles Index - Export Module
// This module exports all Stellar-based oracles for price feeds and off-chain data

export { reflectorOracle as stellarReflectorOracle } from './reflector';
export { diaOracle as stellarDiaOracle } from './dia';
export { bandOracle as stellarBandOracle } from './band';
export { lightechoOracle as stellarLightechoOracle } from './lightecho';
export { stellarNativeDexOracle } from './nativeDex';

// Lazy-load object for all Stellar oracles
export const stellarOraclesLazy = {
  reflector: () => import('./reflector').then(m => m.reflectorOracle),
  dia: () => import('./dia').then(m => m.diaOracle),
  band: () => import('./band').then(m => m.bandOracle),
  lightecho: () => import('./lightecho').then(m => m.lightechoOracle),
  nativeDex: () => import('./nativeDex').then(m => m.stellarNativeDexOracle),
};

// Metadata for Stellar Oracle ecosystem
export const stellarOraclesMetadata = {
  totalOracles: 5,
  blockchain: 'Stellar (XLM)',
  categories: {
    native: ['Reflector', 'LightEcho', 'Stellar Native DEX'],
    crossChain: ['DIA', 'Band Protocol'],
    soroban: ['Reflector', 'DIA', 'Band Protocol', 'LightEcho'],
    protocolLevel: ['Stellar Native DEX'],
  },
  features: {
    priceFeeds: ['Reflector', 'DIA', 'Band Protocol', 'LightEcho', 'Stellar Native DEX'],
    realTimeData: ['Stellar Native DEX', 'Reflector', 'DIA', 'Band Protocol'],
    sorobanIntegration: ['Reflector', 'DIA', 'Band Protocol', 'LightEcho'],
    crossChain: ['DIA', 'Band Protocol'],
    protocolNative: ['Stellar Native DEX'],
    sep40Compliant: ['Reflector'],
  },
  integration: {
    primarySDK: '@stellar/stellar-sdk',
    secondarySDK: '@stellar/stellar-base',
    horizonAPI: 'https://horizon.stellar.org',
    rpcEndpoint: 'https://rpc.stellar.org',
    testnetHorizon: 'https://horizon-testnet.stellar.org',
    testnetRPC: 'https://rpc-testnet.stellar.org',
  },
  smartContracts: {
    platform: 'Soroban',
    language: 'Rust',
    documentation: 'https://soroban.stellar.org/',
  },
  notes: [
    'Stellar Native DEX provides implicit oracle functionality',
    'Reflector is the primary Soroban oracle (SEP-40 compliant)',
    'All Soroban oracles use Rust-based smart contracts',
    'No API keys required for any Stellar oracles',
    'Native DEX has no external dependencies (protocol-level)',
    'DIA and Band Protocol offer cross-chain data capabilities',
    'LightEcho is Soroban-native with developer-friendly API',
    'Low transaction fees (~0.00001 XLM per operation)',
    'Fast settlement (5-6 seconds)',
    'Test on testnet before mainnet deployment',
  ],
};

