// XRP Ledger (XRPL) DEX Exports
// Exports all XRP Ledger-based decentralized exchanges

export { xrplNativeDEX as xrpNativeDEX } from './nativeDEX.XRP';
export { sologenicDEX as xrpSologenicDEX } from './sologenic.XRP';
export { xpmarketDEX as xrpXPMarketDEX } from './xpmarket.XRP';
export { magneticXDEX as xrpMagneticXDEX } from './magneticX.XRP';
export { orchestraDEX as xrpOrchestraDEX } from './orchestra.XRP';
export { xrptoolkitDEX as xrpToolkitDEX } from './xrptoolkit.XRP';
export { dexrpDEX as xrpDeXRPDEX } from './dexrp.XRP';

// Lazy-load object for dynamic imports
export const xrplDexLazy = {
  nativeDEX: () => import('./nativeDEX.XRP').then(m => m.xrplNativeDEX),
  sologenic: () => import('./sologenic.XRP').then(m => m.sologenicDEX),
  xpmarket: () => import('./xpmarket.XRP').then(m => m.xpmarketDEX),
  magneticX: () => import('./magneticX.XRP').then(m => m.magneticXDEX),
  orchestra: () => import('./orchestra.XRP').then(m => m.orchestraDEX),
  xrptoolkit: () => import('./xrptoolkit.XRP').then(m => m.xrptoolkitDEX),
  dexrp: () => import('./dexrp.XRP').then(m => m.dexrpDEX),
};

// Metadata for XRP Ledger DEXs
export const xrplDexMetadata = {
  blockchain: 'XRP Ledger (XRPL)',
  chainId: 'N/A',
  consensus: 'XRP Ledger Consensus Protocol (XRPLCP)',
  totalDexes: 7,
  categories: {
    nativeProtocol: ['nativeDEX'],
    tokenization: ['sologenic'],
    multiFeature: ['xpmarket', 'magneticX'],
    ammFrontend: ['orchestra'],
    professional: ['xrptoolkit'],
    crossChain: ['dexrp'],
  },
  features: {
    nativeProtocolDEX: true,
    orderbook: true,
    amm: true,
    pathPayments: true,
    tokenizedAssets: true,
    realWorldAssets: true,
    crossChain: true,
    lowFees: true,
    fastFinality: true,
  },
  documentation: {
    xrpl: 'https://xrpl.org/',
    dex: 'https://xrpl.org/decentralized-exchange.html',
    api: 'https://xrpl.org/docs/references/http-websocket-apis',
    sdk: 'https://js.xrpl.org/',
  },
  notes: [
    'XRPL has a native DEX built directly into the protocol (no smart contracts)',
    'Supports both orderbook (CLOB) and AMM (liquidity pools) trading',
    'Extremely low transaction fees: ~0.00001 XRP (~$0.00001)',
    '3-5 second transaction finality via XRPL Consensus',
    'Path payments enable automatic multi-hop currency conversion',
    'Trustlines required before receiving non-XRP assets',
    'AMM pools added via XLS-30 amendment in 2023',
    'Native Price Oracles for external data feeds (XLS-47)',
    'All XRP addresses start with "r" and are 25-35 characters long',
    'Supports IOUs, stablecoins, tokenized stocks, and NFTs',
  ],
};

