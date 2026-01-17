// Ethereum DEX Exports
// Aggregates all Ethereum-based DEXs

import { uniswapDEX } from './uniswap.ETH';
import { curveDEX } from './curve.ETH';
import { sushiswapDEX } from './sushiswap.ETH';
import { balancerDEX } from './balancer.ETH';
import { oneinchDEX } from './oneinch.ETH';
import { bancorDEX } from './bancor.ETH';
import { kyberswapDEX } from './kyberswap.ETH';

// Export individual DEXs
export { uniswapDEX, curveDEX, sushiswapDEX, balancerDEX, oneinchDEX, bancorDEX, kyberswapDEX };

// Export Uniswap API for price fetching
export { uniswapAPI, createUniswapAPI } from './uniswapAPI.ETH';

// Lazy-load object for dynamic imports
export const ethereumDexes = {
  uniswap: () => import('./uniswap.ETH').then(m => m.uniswapDEX),
  curve: () => import('./curve.ETH').then(m => m.curveDEX),
  sushiswap: () => import('./sushiswap.ETH').then(m => m.sushiswapDEX),
  balancer: () => import('./balancer.ETH').then(m => m.balancerDEX),
  oneinch: () => import('./oneinch.ETH').then(m => m.oneinchDEX),
  bancor: () => import('./bancor.ETH').then(m => m.bancorDEX),
  kyberswap: () => import('./kyberswap.ETH').then(m => m.kyberswapDEX),
};

// Ethereum DEX metadata
export const ethDexMetadata = {
  blockchain: 'Ethereum',
  totalDexes: 7,
  categories: {
    amm: ['Uniswap', 'Curve Finance', 'SushiSwap', 'Balancer', 'Bancor'],
    aggregator: ['1inch', 'KyberSwap'],
  },
  features: {
    concentratedLiquidity: ['Uniswap V3'],
    stablecoinOptimized: ['Curve Finance'],
    multiToken: ['Balancer'],
    impermanentLossProtection: ['Bancor'],
    crossChainSupport: ['SushiSwap', '1inch', 'KyberSwap'],
  },
  stats: {
    tvl: '$10+ billion combined',
    volume24h: '$12+ billion combined',
    largestDex: 'Uniswap',
  },
  resources: {
    theGraph: 'https://thegraph.com/explorer',
    ethereum: 'https://ethereum.org/',
    defillama: 'https://defillama.com/',
  },
  notes: [
    'Ethereum has the largest and most mature DEX ecosystem',
    'Uniswap V3 pioneered concentrated liquidity',
    'Multiple specialized DEXs for different use cases',
    'Strong subgraph support via The Graph',
    'High gas costs require consideration for small trades',
  ],
};
