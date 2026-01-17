// Tezos (XTZ) DEXs - Export Module
// This module exports all Tezos-based decentralized exchanges and liquidity protocols

export { quipuswapDEX as xtzQuipuSwapDEX } from './quipuswap.XTZ';
export { plentyDEX as xtzPlentyDEX } from './plenty.XTZ';
export { spicySwapDEX as xtzSpicySwapDEX } from './spicyswap.XTZ';
export { vortexDEX as xtzVortexDEX } from './vortex.XTZ';
export { youvesDEX as xtzYouvesDEX } from './youves.XTZ';
export { ctezDEX as xtzCtezDEX } from './ctez.XTZ';
export { threeRouteDEX as xtzThreeRouteDEX } from './3route.XTZ';

// Lazy-load object for all Tezos DEXs
export const tezosDexLazy = {
  quipuSwap: () => import('./quipuswap.XTZ').then(m => m.quipuswapDEX),
  plenty: () => import('./plenty.XTZ').then(m => m.plentyDEX),
  spicySwap: () => import('./spicyswap.XTZ').then(m => m.spicySwapDEX),
  vortex: () => import('./vortex.XTZ').then(m => m.vortexDEX),
  youves: () => import('./youves.XTZ').then(m => m.youvesDEX),
  ctez: () => import('./ctez.XTZ').then(m => m.ctezDEX),
  threeRoute: () => import('./3route.XTZ').then(m => m.threeRouteDEX),
};

// Metadata for Tezos DEX ecosystem
export const tezosDexMetadata = {
  blockchain: 'Tezos (XTZ)',
  symbol: 'XTZ',
  totalDexes: 7,
  categories: {
    amm: ['QuipuSwap', 'Plenty DeFi', 'SpicySwap'],
    concentratedLiquidity: ['Vortex'],
    syntheticAssets: ['Youves'],
    liquidStaking: ['Ctez'],
    aggregator: ['3Route'],
  },
  features: {
    smartContracts: 'Michelson / SmartPy / LIGO / Archetype',
    consensus: 'Liquid Proof of Stake (LPoS)',
    finality: '~30-60 seconds (2 block confirmations)',
    nativeToken: 'XTZ',
    tokenStandards: ['FA1.2', 'FA2'],
    rpcEndpoint: 'https://mainnet.api.tez.ie',
    indexer: 'https://api.tzkt.io',
  },
  tvl: {
    total: '~$20-30M across all DEXs',
    topDex: 'QuipuSwap (~$8-10M)',
  },
  integration: {
    primarySDK: '@taquito/taquito',
    wallets: ['Temple Wallet', 'Kukai', 'Umami'],
    graphql: 'Various DEX-specific endpoints',
    priceOracles: ['Harbinger', 'Acurast', 'Chainlink (limited)'],
  },
  uniqueFeatures: [
    'Self-amending governance (on-chain voting for protocol upgrades)',
    'Formal verification support',
    'Low transaction fees (~$0.01-0.10)',
    'Energy-efficient consensus',
    'FA2 multi-asset token standard',
    'Michelson smart contract language',
    'Baking (staking) with ~6% APY',
  ],
  ecosystem: {
    layer2: ['Etherlink (EVM-compatible rollup)'],
    bridges: ['Wrap Protocol', 'Plenty Bridge'],
    wallets: ['Temple', 'Kukai', 'Umami', 'AirGap'],
    explorers: ['TzKT', 'TzStats', 'Better Call Dev'],
  },
  notes: [
    'Tezos uses a self-amending blockchain with on-chain governance',
    'QuipuSwap is the leading DEX with highest liquidity',
    '3Route aggregates liquidity across all major DEXs',
    'Vortex brings Uniswap V3-style concentrated liquidity to Tezos',
    'Ctez and Youves provide synthetic asset and liquid staking options',
    'FA2 is a more advanced token standard than FA1.2, similar to ERC-1155',
    'Tezos has a strong focus on security and formal verification',
    'Lower TVL compared to major EVM chains, but active development',
  ],
};

