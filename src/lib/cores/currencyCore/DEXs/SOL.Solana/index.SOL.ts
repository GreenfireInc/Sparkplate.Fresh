// Solana (SOL) DEX Exports
// Aggregates all Solana DEX platforms

import { jupiterDEX } from './jupiter.SOL';
import { raydiumDEX } from './raydium.SOL';
import { orcaDEX } from './orca.SOL';
import { phoenixDEX } from './phoenix.SOL';
import { meteoraDEX } from './meteora.SOL';
import { lifinityDEX } from './lifinity.SOL';
import { driftDEX } from './drift.SOL';

// Export individual DEXs
export { 
  jupiterDEX,
  raydiumDEX,
  orcaDEX,
  phoenixDEX,
  meteoraDEX,
  lifinityDEX,
  driftDEX
};

// Export Jupiter API for price fetching
export { jupiterAPI, createJupiterAPI } from './jupiterAPI.SOL';

// Lazy-load object for dynamic imports
export const solanaDexes = {
  jupiter: () => import('./jupiter.SOL').then(m => m.jupiterDEX),
  raydium: () => import('./raydium.SOL').then(m => m.raydiumDEX),
  orca: () => import('./orca.SOL').then(m => m.orcaDEX),
  phoenix: () => import('./phoenix.SOL').then(m => m.phoenixDEX),
  meteora: () => import('./meteora.SOL').then(m => m.meteoraDEX),
  lifinity: () => import('./lifinity.SOL').then(m => m.lifinityDEX),
  drift: () => import('./drift.SOL').then(m => m.driftDEX),
};

// Solana DEX metadata
export const solDexMetadata = {
  blockchain: 'Solana (SOL)',
  totalDexes: 7,
  note: 'Solana is a high-performance blockchain with Proof of History consensus. DEXs leverage fast transactions (<400ms) and low fees (~$0.00025) for efficient trading.',
  categories: {
    aggregators: ['Jupiter'],
    amm: ['Raydium', 'Orca', 'Meteora'],
    orderbook: ['Phoenix'],
    pmm: ['Lifinity'],
    perpetuals: ['Drift Protocol'],
  },
  features: {
    hasSolanaVM: true,
    hasGraphQL: true, // via Bitquery
    hasOracles: true, // Pyth, Switchboard
    hasConcentratedLiquidity: true,
    hasPerpetuals: true,
    hasLimitOrders: true,
    hasDCA: true, // Dollar Cost Averaging
    hasHighSpeed: true, // <400ms transactions
    hasLowFees: true, // ~$0.00025 per tx
  },
  technicalDetails: {
    consensus: 'Proof of Stake + Proof of History',
    vmType: 'Solana VM (BPF bytecode)',
    smartContractLanguage: 'Rust / C / C++',
    transactionSpeed: '<400ms',
    avgTxCost: '$0.00025',
    tps: '65,000+ theoretical, 2,000-4,000 practical',
    rpcEndpoint: 'https://api.mainnet-beta.solana.com',
    explorerApi: 'https://api.solscan.io/',
  },
  stats: {
    totalTvl: '$1+ billion',
    totalVolume24h: '$2+ billion',
    largestDex: 'Jupiter (aggregator) / Raydium (native AMM)',
    oldestDex: 'Raydium',
  },
  resources: {
    solana: 'https://solana.com/',
    docs: 'https://docs.solana.com/',
    explorer: 'https://solscan.io/',
    pythOracle: 'https://pyth.network/',
    switchboardOracle: 'https://switchboard.xyz/',
    bitquery: 'https://docs.bitquery.io/docs/blockchain/Solana/',
  },
  notes: [
    'Solana is the fastest blockchain for DEX trading',
    'Ultra-low fees (~$0.00025) make high-frequency trading viable',
    'Jupiter aggregates liquidity across all major DEXs',
    'Raydium integrates with OpenBook (formerly Serum)',
    'Orca offers best UX with Whirlpools',
    'Phoenix provides on-chain CLOB trading',
    'Meteora features dynamic liquidity market makers',
    'Lifinity uses proactive market making',
    'Drift offers perpetuals with up to 20x leverage',
    'All DEXs benefit from Solana\'s high throughput',
    'Pyth and Switchboard provide oracle price feeds',
    'Ed25519 signatures for fast transaction validation',
  ],
};
