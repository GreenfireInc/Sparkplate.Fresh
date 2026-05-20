// Stacks (STX) DEX Exports
// Aggregates all Stacks DEX platforms

import { velarDEX } from './velar.STX';
import { alexDEX } from './alex.STX';
import { stackswapDEX } from './stackswap.STX';
import { arkadikoSwapDEX } from './arkadiko.STX';
import { lnswapDEX } from './lnswap.STX';
import { bitflowDEX } from './bitflow.STX';
import { charismaDEX } from './charisma.STX';

// Export individual DEXs
export { 
  velarDEX,
  alexDEX,
  stackswapDEX,
  arkadikoSwapDEX,
  lnswapDEX,
  bitflowDEX,
  charismaDEX
};

// Lazy-load object for dynamic imports
export const stacksDexes = {
  velar: () => import('./velar.STX').then(m => m.velarDEX),
  alex: () => import('./alex.STX').then(m => m.alexDEX),
  stackswap: () => import('./stackswap.STX').then(m => m.stackswapDEX),
  arkadiko: () => import('./arkadiko.STX').then(m => m.arkadikoSwapDEX),
  lnswap: () => import('./lnswap.STX').then(m => m.lnswapDEX),
  bitflow: () => import('./bitflow.STX').then(m => m.bitflowDEX),
  charisma: () => import('./charisma.STX').then(m => m.charismaDEX),
};

// Stacks DEX metadata
export const stxDexMetadata = {
  blockchain: 'Stacks (STX)',
  totalDexes: 7,
  note: 'Stacks is a Bitcoin Layer 2 using Proof of Transfer consensus. DEXs inherit Bitcoin security while enabling smart contracts via Clarity language. STX stackers earn BTC rewards.',
  categories: {
    liquidityProtocols: ['Velar'],
    defiPlatforms: ['ALEX', 'Arkadiko Swap'],
    amm: ['StackSwap'],
    lightningSwaps: ['LNSwap'],
    bitcoinNative: ['Bitflow'],
    gamified: ['Charisma'],
  },
  features: {
    hasClarityContracts: true,
    hasProofOfTransfer: true,
    earnsBitcoinRewards: true, // Via Stacking
    inheritsFromBitcoin: true,
    hasNativeBitcoinDeFi: true,
    hasLightningIntegration: true,
    hasStablecoin: true, // USDA on Arkadiko
    hasAtomicSwaps: true, // LNSwap
    hasGamification: true, // Charisma
  },
  technicalDetails: {
    consensus: 'Proof of Transfer (PoX)',
    smartContractLanguage: 'Clarity (decidable, non-Turing complete)',
    layer: 'Bitcoin Layer 2',
    bitcoinAnchoring: 'All Stacks blocks anchored to Bitcoin',
    signatures: 'secp256k1 (same as Bitcoin)',
    derivationPath: "m/44'/5757'/0'/0/0",
    addressEncoding: 'C32Check (based on Bitcoin\'s Base58Check)',
    blockTime: '~10 minutes (follows Bitcoin)',
    apiEndpoint: 'https://api.mainnet.stacks.co/',
    explorerApi: 'https://explorer.stacks.co/',
  },
  stats: {
    totalTvl: '$250+ million',
    totalVolume24h: '$45+ million',
    largestDex: 'ALEX ($100M+ TVL)',
    oldestDex: 'StackSwap',
  },
  resources: {
    stacks: 'https://stacks.org/',
    docs: 'https://docs.stacks.co/',
    explorer: 'https://explorer.stacks.co/',
    hiroApi: 'https://www.hiro.so/stacks-api',
    clarity: 'https://docs.stacks.co/clarity/',
    bns: 'https://docs.stacks.co/build-apps/references/bns',
  },
  notes: [
    'Stacks is the leading Bitcoin Layer 2 for smart contracts',
    'Uses Proof of Transfer (PoX) to anchor to Bitcoin',
    'STX stackers earn BTC rewards (not just STX)',
    'Clarity smart contract language is decidable and secure',
    'All Stacks transactions inherit Bitcoin finality',
    'Native Bitcoin DeFi without wrapping (Bitflow)',
    'Lightning Network integration (LNSwap)',
    'First decentralized stablecoin on Bitcoin (USDA)',
    'secp256k1 signatures (same as Bitcoin)',
    'C32Check address encoding based on Bitcoin',
    'Non-EVM architecture optimized for Bitcoin',
    'Pyth and DIA oracles for price feeds',
  ],
};
