// Arweave (AR) DEXs Index - Export Module
// This module exports all Arweave-based DEXs and swap protocols

export { permaswapDEX as arPermaswapDEX } from './permaswap.AR';
export { vertoDEX as arVertoDEX } from './verto.AR';
export { arswapDEX as arArswapDEX } from './arswap.AR';
export { everpayDEX as arEverpayDEX } from './everpay.AR';

// Lazy-load object for all Arweave DEXs
export const arDEXsLazy = {
  permaswap: () => import('./permaswap.AR').then(m => m.permaswapDEX),
  verto: () => import('./verto.AR').then(m => m.vertoDEX),
  arswap: () => import('./arswap.AR').then(m => m.arswapDEX),
  everpay: () => import('./everpay.AR').then(m => m.everpayDEX),
};

// Metadata for Arweave DEX ecosystem
export const arDEXsMetadata = {
  totalDEXs: 4,
  blockchain: 'Arweave (AR)',
  categories: {
    amm: ['Permaswap', 'Verto'],
    infrastructure: ['EverPay'],
    swapProtocol: ['ArSwap'],
    crossChain: ['Permaswap', 'EverPay'],
  },
  features: {
    zeroGas: ['Permaswap', 'EverPay'],
    instantSettlement: ['Permaswap', 'EverPay'],
    scpBased: ['Permaswap', 'EverPay'], // Storage-based Consensus Paradigm
    smartWeave: ['Verto'],
  },
  integration: {
    primarySDK: 'permaswap-sdk',
    settlementSDK: 'everpay',
    pricingSource: 'Permaswap',
  },
  notes: [
    'Permaswap is the primary live DEX, offering 0 gas fees and instant settlement via everPay',
    'EverPay serves as the underlying financial protocol for instant transactions',
    'Verto is a legacy/historical AMM built on SmartWeave',
    'ArSwap is an early-stage project',
    'Arweave DEXs typically rely on off-chain computation (SCP) or SmartWeave',
  ],
};
