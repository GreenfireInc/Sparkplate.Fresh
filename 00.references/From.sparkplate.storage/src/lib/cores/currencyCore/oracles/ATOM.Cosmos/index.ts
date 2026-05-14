// Cosmos (ATOM) Oracles Index - Export Module
// This module exports all Cosmos-based oracles for price feeds and off-chain data

export { bandProtocolOracleATOM as atomBandProtocolOracle } from './bandProtocol';
export { pythNetworkOracleATOM as atomPythNetworkOracle } from './pythNetwork';
export { chainlinkOracleATOM as atomChainlinkOracle } from './chainlink';
export { diaOracleATOM as atomDiaOracle } from './dia';
export { umbrellaNetworkOracle as atomUmbrellaOracle } from './umbrellaNetwork';
export { cosmosSdkOracleModule as atomCosmosSDKOracle } from './cosmosSdkOracle';

// Lazy-load object for all Cosmos oracles
export const atomOraclesLazy = {
  bandProtocol: () => import('./bandProtocol').then(m => m.bandProtocolOracleATOM),
  pythNetwork: () => import('./pythNetwork').then(m => m.pythNetworkOracleATOM),
  chainlink: () => import('./chainlink').then(m => m.chainlinkOracleATOM),
  dia: () => import('./dia').then(m => m.diaOracleATOM),
  umbrellaNetwork: () => import('./umbrellaNetwork').then(m => m.umbrellaNetworkOracle),
  cosmosSdkOracle: () => import('./cosmosSdkOracle').then(m => m.cosmosSdkOracleModule),
};

// Metadata for Cosmos Oracle ecosystem
export const atomOraclesMetadata = {
  totalOracles: 6,
  blockchain: 'Cosmos (ATOM)',
  categories: {
    nativeCosmos: ['Band Protocol', 'Cosmos SDK Oracle Module'],
    crossChain: ['Pyth Network', 'Chainlink', 'DIA Oracle', 'Umbrella Network'],
    pullModel: ['Pyth Network'],
    pushModel: ['Band Protocol', 'Chainlink', 'DIA Oracle'],
    layer2: ['Umbrella Network'],
    protocolLevel: ['Cosmos SDK Oracle Module'],
  },
  features: {
    priceFeeds: ['Band Protocol', 'Pyth Network', 'Chainlink', 'DIA Oracle', 'Umbrella Network', 'Cosmos SDK Oracle Module'],
    ibcIntegrated: ['Band Protocol', 'Pyth Network', 'Cosmos SDK Oracle Module'],
    vrf: ['Chainlink'],
    customData: ['Band Protocol', 'Chainlink'],
    highFrequency: ['Pyth Network', 'Umbrella Network'],
    transparentSourcing: ['DIA Oracle', 'Band Protocol'],
    validatorDriven: ['Cosmos SDK Oracle Module', 'Band Protocol'],
  },
  integration: {
    primarySDK: '@cosmjs/stargate',
    cosmwasmSDK: '@cosmjs/cosmwasm-stargate',
    bandSDK: '@bandprotocol/bandchain.js',
    pythSDK: '@pythnetwork/hermes-client',
    cosmosHubRpc: 'https://rpc.cosmos.network',
    osmosisRpc: 'https://rpc.osmosis.zone',
  },
  notes: [
    'Band Protocol is the native Cosmos SDK oracle solution',
    'Pyth Network provides sub-second updates via pull model',
    'Chainlink offers enterprise-grade security with 1000+ nodes',
    'DIA Oracle provides transparent multi-source aggregation',
    'Umbrella Network optimized for high-throughput applications',
    'Cosmos SDK Oracle Module embeds oracles at protocol level',
    'IBC enables cross-chain oracle data flow',
    'CosmWasm support for smart contract oracle integration',
    'Multiple oracle options for diverse use cases',
    'Integration via CosmJS and blockchain-specific SDKs',
  ],
};

