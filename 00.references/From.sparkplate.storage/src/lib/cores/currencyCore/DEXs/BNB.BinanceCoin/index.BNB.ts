// DEX Information Index - BNB Smart Chain (BNB)
// Centralized export for all BNB Chain DEX information files

// BNB Chain DEXs
export { pancakeSwapDEX } from './pancakeSwap.BNB';
export { biswapDEX } from './biswap.BNB';
export { apeSwapDEX } from './apeSwap.BNB';
export { thenaDEX } from './thena.BNB';
export { uniswapV3DEX } from './uniswapV3.BNB';
export { babySwapDEX } from './babySwap.BNB';
export { dodoDEX } from './dodo.BNB';

// Group BNB Chain DEXs for lazy loading
export const bnbDEXs = {
  pancakeSwap: () => import('./pancakeSwap.BNB'),
  biswap: () => import('./biswap.BNB'),
  apeSwap: () => import('./apeSwap.BNB'),
  thena: () => import('./thena.BNB'),
  uniswapV3: () => import('./uniswapV3.BNB'),
  babySwap: () => import('./babySwap.BNB'),
  dodo: () => import('./dodo.BNB'),
};

// DEX metadata for filtering and searching
export const bnbDexMetadata = {
  byType: {
    amm: ['pancakeSwap', 'biswap', 'apeSwap', 'babySwap'],
    concentratedLiquidity: ['uniswapV3'],
    pmm: ['dodo'],
    veModel: ['thena'],
    multiChain: ['apeSwap', 'uniswapV3', 'dodo'],
  },
  byFeature: {
    subgraph: ['pancakeSwap', 'dodo'],
    officialSDK: ['pancakeSwap', 'uniswapV3', 'dodo'],
    nftSupport: ['pancakeSwap', 'apeSwap', 'babySwap', 'thena'],
    yieldFarming: ['pancakeSwap', 'biswap', 'apeSwap', 'babySwap'],
    multiChain: ['apeSwap', 'uniswapV3', 'dodo'],
    governance: ['pancakeSwap', 'biswap', 'apeSwap', 'thena', 'uniswapV3', 'babySwap', 'dodo'],
  },
  withSDK: {
    typescript: ['pancakeSwap', 'uniswapV3', 'dodo'],
    community: ['pancakeSwap'],
  },
  byVolume: {
    top: ['pancakeSwap'],
    major: ['biswap', 'apeSwap', 'thena', 'uniswapV3'],
    emerging: ['babySwap', 'dodo'],
  },
};

export default {
  bnbDEXs,
  bnbDexMetadata,
};
