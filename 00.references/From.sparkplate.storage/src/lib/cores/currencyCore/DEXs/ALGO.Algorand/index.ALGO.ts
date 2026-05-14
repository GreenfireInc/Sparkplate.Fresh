// DEX Information Index
// Centralized export for all DEX information files
// Organized by blockchain

// Algorand DEXs
export { tinymanDEX } from './tinyman.ALGO';
export { pactDEX } from './pact.ALGO';
export { humbleSwapDEX } from './humbleSwap.ALGO';
export { algofiDEX } from './algofi.ALGO';
export { folksFinanceDEX } from './folksFinance.ALGO';
export { vestigeDEX } from './vestige.ALGO';
export { wagmiSwapDEX } from './wagmiSwap.ALGO';
export { algodexDEX } from './algodex.ALGO';

// Group Algorand DEXs
export const algorandDEXs = {
  tinyman: () => import('./tinyman.ALGO'),
  pact: () => import('./pact.ALGO'),
  humbleSwap: () => import('./humbleSwap.ALGO'),
  algofi: () => import('./algofi.ALGO'),
  folksFinance: () => import('./folksFinance.ALGO'),
  vestige: () => import('./vestige.ALGO'),
  wagmiSwap: () => import('./wagmiSwap.ALGO'),
  algodex: () => import('./algodex.ALGO'),
};

// DEX metadata for filtering and searching
export const algorandDexMetadata = {
  byBlockchain: {
    algorand: [
      'tinyman',
      'pact',
      'humbleSwap',
      'algofi',
      'folksFinance',
      'vestige',
      'wagmiSwap',
      'algodex',
    ],
    // Future: other blockchains
  },
  byType: {
    amm: ['tinyman', 'pact', 'humbleSwap', 'algofi', 'wagmiSwap'],
    orderbook: ['algodex'],
    aggregator: ['vestige'],
    integrated: ['folksFinance', 'algofi'],
  },
  withSDK: {
    typescript: ['tinyman', 'algofi', 'folksFinance'],
    python: ['pact'],
  },
};

export default {
  algorandDEXs,
  algorandDexMetadata,
};
