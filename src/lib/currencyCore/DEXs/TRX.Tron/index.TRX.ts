// Tron (TRX) DEX Exports
// Aggregates all Tron DEX platforms

import { sunswapDEX } from './sunswap.TRX';
import { justmoneyDEX } from './justmoney.TRX';
import { justlendDEX } from './justlend.TRX';
import { poloniexDEX } from './poloniex.TRX';
import { sunswapV2DEX } from './sunswapV2.TRX';
import { trontradeDEX } from './trontrade.TRX';
import { zapperfiDEX } from './zapperfi.TRX';

// Export individual DEXs
export { 
  sunswapDEX,
  justmoneyDEX,
  justlendDEX,
  poloniexDEX,
  sunswapV2DEX,
  trontradeDEX,
  zapperfiDEX
};

// Lazy-load object for dynamic imports
export const tronDexes = {
  sunswap: () => import('./sunswap.TRX').then(m => m.sunswapDEX),
  justmoney: () => import('./justmoney.TRX').then(m => m.justmoneyDEX),
  justlend: () => import('./justlend.TRX').then(m => m.justlendDEX),
  poloniex: () => import('./poloniex.TRX').then(m => m.poloniexDEX),
  sunswapV2: () => import('./sunswapV2.TRX').then(m => m.sunswapV2DEX),
  trontrade: () => import('./trontrade.TRX').then(m => m.trontradeDEX),
  zapperfi: () => import('./zapperfi.TRX').then(m => m.zapperfiDEX),
};

// Tron DEX metadata
export const trxDexMetadata = {
  blockchain: 'Tron (TRX)',
  totalDexes: 7,
  note: 'Tron is a high-throughput Layer 1 blockchain using Delegated Proof of Stake (DPoS). Features low transaction fees, TVM (Tron Virtual Machine) for Solidity smart contracts, and the largest USDT supply. Chainlink is the official oracle provider.',
  categories: {
    ammDex: ['SunSwap', 'SunSwap V2'],
    stablecoinDex: ['JustMoney'],
    defiProtocols: ['JustLend DAO Swap'],
    hybridExchanges: ['Poloniex DEX'],
    multiFeature: ['TronTrade'],
    dashboards: ['ZapperFi'],
  },
  features: {
    hasTVM: true,
    isSolidityCompatible: true,
    hasChainlinkOracles: true,
    hasDelegatedPoS: true,
    hasLowFees: true,
    hasHighThroughput: true,
    hasLargestUSDT: true,
    hasTRC20: true,
    hasTRC10: true,
    hasTRC721: true,
  },
  technicalDetails: {
    consensus: 'Delegated Proof of Stake (DPoS)',
    virtualMachine: 'TVM (Tron Virtual Machine)',
    smartContractLanguage: 'Solidity',
    blockTime: '~3 seconds',
    throughput: '~2,000 TPS',
    signatures: 'ECDSA (secp256k1)',
    derivationPath: "m/44'/195'/0'/0/0",
    addressFormat: "Base58 (starts with 'T') or Hex (starts with '41')",
    apiEndpoint: 'https://api.trongrid.io',
    explorerApi: 'https://tronscan.org/',
    officialOracle: 'Chainlink Data Feeds',
  },
  stats: {
    totalTvl: '$7+ billion',
    totalVolume24h: '$800+ million',
    largestDex: 'SunSwap ($500M+ TVL)',
    largestProtocol: 'JustLend DAO ($1B+ TVL)',
    usdtSupply: '$60+ billion (largest chain by USDT supply)',
  },
  resources: {
    tron: 'https://tron.network/',
    docs: 'https://developers.tron.network/',
    explorer: 'https://tronscan.org/',
    tronGrid: 'https://www.trongrid.io/',
    tronWeb: 'https://developers.tron.network/docs/tronweb',
    chainlink: 'https://docs.chain.link/data-feeds/tron',
    sunSwap: 'https://sunswap.com/',
    justLend: 'https://justlend.org/',
  },
  notes: [
    'Tron has the largest USDT supply of any blockchain ($60B+)',
    'SunSwap is the official and largest DEX on Tron',
    'JustLend DAO is the largest lending protocol with $1B+ TVL',
    'Chainlink replaced WINkLink as official oracle in 2024',
    'TVM is Solidity-compatible (similar to EVM)',
    'Extremely low transaction fees (~$0.000005)',
    'High throughput of ~2,000 TPS',
    'Delegated Proof of Stake with 27 Super Representatives',
    'Owned by Tron Foundation (Justin Sun)',
    'TRC-20 tokens are ERC-20 compatible',
    'Strong focus on stablecoins and payments',
    'Popular in Asia for remittances and transfers',
  ],
};
