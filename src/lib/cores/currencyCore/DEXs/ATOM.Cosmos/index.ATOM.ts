// DEX Information Index - Cosmos (ATOM)
// Centralized export for all Cosmos DEX information files

// Cosmos DEXs
export { osmosisDEX } from './osmosis.ATOM';
export { astroportDEX } from './astroport.ATOM';
export { crescentDEX } from './crescent.ATOM';
export { kujiraDEX } from './kujira.ATOM';
export { shadeProtocolDEX } from './shadeProtocol.ATOM';
export { umeeDEX } from './umee.ATOM';
export { gravityDEX } from './gravityDEX.ATOM';

// Group Cosmos DEXs for lazy loading
export const cosmosDEXs = {
  osmosis: () => import('./osmosis.ATOM'),
  astroport: () => import('./astroport.ATOM'),
  crescent: () => import('./crescent.ATOM'),
  kujira: () => import('./kujira.ATOM'),
  shadeProtocol: () => import('./shadeProtocol.ATOM'),
  umee: () => import('./umee.ATOM'),
  gravityDEX: () => import('./gravityDEX.ATOM'),
};

// DEX metadata for filtering and searching
export const cosmosDexMetadata = {
  byType: {
    amm: ['osmosis', 'astroport', 'crescent', 'gravityDEX'],
    orderbook: ['kujira', 'crescent'],
    hybrid: ['crescent'],
    multichain: ['astroport', 'umee'],
    privacy: ['shadeProtocol'],
    defiHub: ['kujira', 'umee'],
  },
  byChain: {
    cosmosHub: ['osmosis', 'gravityDEX'],
    neutron: ['astroport'],
    crescentNetwork: ['crescent'],
    kujira: ['kujira'],
    secretNetwork: ['shadeProtocol'],
    umee: ['umee'],
  },
  withSDK: {
    typescript: ['osmosis', 'kujira', 'shadeProtocol'],
    official: ['osmosis', 'kujira'],
  },
  byFeature: {
    crossChain: ['osmosis', 'astroport', 'umee'],
    lending: ['kujira', 'umee', 'crescent'],
    orderbook: ['kujira', 'crescent'],
    privacy: ['shadeProtocol'],
    liquidations: ['kujira'],
    limitOrders: ['kujira', 'crescent'],
  },
};

export default {
  cosmosDEXs,
  cosmosDexMetadata,
};
