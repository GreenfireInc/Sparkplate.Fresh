// Litecoin DEX Exports
// Aggregates all Litecoin instant exchange platforms

import { sideShiftDEX } from './sideShift';
import { changeNOWDEX } from './changeNOW';
import { simpleSwapDEX } from './simpleSwap';
import { stealthEXDEX } from './stealthEX';
import { fixedFloatDEX } from './fixedFloat';
import { exolixDEX } from './exolix';
import { letsExchangeDEX } from './letsExchange';

// Export individual exchanges with LTC prefix to avoid naming conflicts
export { 
  sideShiftDEX as ltcSideShiftDEX, 
  changeNOWDEX as ltcChangeNOWDEX, 
  simpleSwapDEX as ltcSimpleSwapDEX, 
  stealthEXDEX as ltcStealthEXDEX, 
  fixedFloatDEX as ltcFixedFloatDEX, 
  exolixDEX as ltcExolixDEX, 
  letsExchangeDEX as ltcLetsExchangeDEX 
};

// Lazy-load object for dynamic imports
export const litecoinExchanges = {
  sideShift: () => import('./sideShift').then(m => m.sideShiftDEX),
  changeNOW: () => import('./changeNOW').then(m => m.changeNOWDEX),
  simpleSwap: () => import('./simpleSwap').then(m => m.simpleSwapDEX),
  stealthEX: () => import('./stealthEX').then(m => m.stealthEXDEX),
  fixedFloat: () => import('./fixedFloat').then(m => m.fixedFloatDEX),
  exolix: () => import('./exolix').then(m => m.exolixDEX),
  letsExchange: () => import('./letsExchange').then(m => m.letsExchangeDEX),
};

// Litecoin exchange metadata
export const ltcDexMetadata = {
  blockchain: 'Litecoin',
  totalExchanges: 7,
  note: 'Litecoin is a UTXO-based chain without native smart contracts. All listed platforms are instant cross-chain exchanges rather than traditional DEXs.',
  categories: {
    instantExchanges: [
      'SideShift.ai',
      'ChangeNOW',
      'SimpleSwap',
      'StealthEX',
      'FixedFloat',
      'Exolix',
      'LetsExchange',
    ],
  },
  features: {
    noRegistration: true,
    nonCustodial: true,
    crossChain: true,
    fixedRates: true,
    floatingRates: true,
    fastSettlement: true,
  },
  technicalDetails: {
    consensus: 'Proof of Work (Scrypt)',
    blockTime: '2.5 minutes',
    addressFormats: ['P2PKH (Legacy)', 'P2SH (SegWit Compatible)', 'P2WPKH (Native SegWit)', 'MWEB (Privacy)'],
    derivationPaths: {
      p2pkh: "m/44'/2'/0'/0/0",
      p2sh: "m/49'/2'/0'/0/0",
      p2wpkh: "m/84'/2'/0'/0/0",
    },
    mwebSupport: 'Optional privacy layer with MimbleWimble Extension Blocks',
  },
  stats: {
    totalSupply: '84,000,000 LTC',
    mergedMining: 'With Dogecoin',
    creator: 'Charlie Lee',
    launchYear: 2011,
  },
  resources: {
    litecoin: 'https://litecoin.org/',
    blockchairExplorer: 'https://blockchair.com/litecoin',
    litecoinSpace: 'https://litecoinspace.org/',
    mwebInfo: 'https://litecoin.org/en/mweb',
  },
  notes: [
    'Litecoin is a UTXO-based blockchain (Bitcoin fork)',
    'No native DEX support due to limited smart contract capabilities',
    'All exchanges listed are instant cross-chain exchange platforms',
    'MWEB (MimbleWimble Extension Blocks) provides optional privacy',
    'Merged mining with Dogecoin provides additional security',
    'Faster block times (2.5 min) than Bitcoin (10 min)',
  ],
};

