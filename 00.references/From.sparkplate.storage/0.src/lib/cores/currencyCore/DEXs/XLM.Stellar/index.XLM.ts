// Stellar (XLM) DEX Exports
// Exports all Stellar-based decentralized exchanges

export { stellarXDEX as xlmStellarXDEX } from './stellarX.XLM';
export { lobstrDEX as xlmLOBSTRDEX } from './lobstr.XLM';
export { stellarTermDEX as xlmStellarTermDEX } from './stellarTerm.XLM';
export { lumenswapDEX as xlmLumenswapDEX } from './lumenswap.XLM';
export { stellarportDEX as xlmStellarportDEX } from './stellarport.XLM';
export { scopulyDEX as xlmScopulyDEX } from './scopuly.XLM';
export { aquaDEX as xlmAquaDEX } from './aqua.XLM';

// Lazy-load object for dynamic imports
export const stellarDexLazy = {
  stellarX: () => import('./stellarX.XLM').then(m => m.stellarXDEX),
  lobstr: () => import('./lobstr.XLM').then(m => m.lobstrDEX),
  stellarTerm: () => import('./stellarTerm.XLM').then(m => m.stellarTermDEX),
  lumenswap: () => import('./lumenswap.XLM').then(m => m.lumenswapDEX),
  stellarport: () => import('./stellarport.XLM').then(m => m.stellarportDEX),
  scopuly: () => import('./scopuly.XLM').then(m => m.scopulyDEX),
  aqua: () => import('./aqua.XLM').then(m => m.aquaDEX),
};

// Metadata for Stellar DEXs
export const stellarDexMetadata = {
  blockchain: 'Stellar (XLM)',
  chainId: 'N/A',
  consensus: 'Federated Byzantine Agreement (FBA)',
  totalDexes: 7,
  categories: {
    nativeDex: ['stellarX', 'lobstr', 'stellarTerm', 'stellarport'],
    amm: ['lumenswap', 'aqua'],
    multiChain: ['scopuly'],
    wallet: ['lobstr'],
    governance: ['aqua'],
  },
  features: {
    nativeOrderbook: true,
    ammPools: true,
    crossChain: true,
    liquidityRewards: true,
    governance: true,
    pathPayments: true,
    lowFees: true,
  },
  documentation: {
    stellar: 'https://developers.stellar.org/',
    horizon: 'https://developers.stellar.org/api/',
    soroban: 'https://soroban.stellar.org/',
  },
  notes: [
    'Stellar has a native decentralized exchange built into the protocol',
    'Path payments allow automatic currency conversion with best rates',
    'Extremely low transaction fees: 0.00001 XLM per operation',
    'Federated Byzantine Agreement (FBA) consensus for fast finality',
    'Supports both orderbook and AMM (liquidity pool) trading',
    'Soroban smart contracts enable advanced DeFi applications',
    'Trustlines required before receiving non-XLM assets',
    'All Stellar addresses start with G and are 56 characters long',
  ],
};

