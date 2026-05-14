/**
 * TangoSwap - SmartBCH AMM DEX
 * 
 * Automated market maker on SmartBCH sidechain
 * Part of the growing DeFi ecosystem on Bitcoin Cash
 * 
 * @chain smartBCH (EVM-compatible sidechain, Chain ID 10000)
 * @type AMM DEX (Automated Market Maker)
 */

export const tangoSwap = {
  name: 'TangoSwap',
  chain: 'smartBCH',
  type: 'AMM',
  
  // Platform URLs
  website: 'https://tangoswap.cash/',
  app: 'https://app.tangoswap.cash/',
  
  // Documentation
  docs: 'https://docs.tangoswap.cash/',
  
  // Social Media
  social: {
    twitter: 'https://twitter.com/TangoSwap',
    telegram: 'https://t.me/tangoswap',
  },
  
  // Network Information
  network: {
    chainId: 10000,
    chainName: 'Smart Bitcoin Cash',
    nativeCurrency: {
      name: 'Bitcoin Cash',
      symbol: 'BCH',
      decimals: 18,
    },
    rpcUrls: [
      'https://smartbch.greyh.at',
      'https://smartbch.fountainhead.cash/mainnet',
    ],
    blockExplorerUrls: ['https://www.smartscan.cash/'],
  },
  
  // Tokens
  tokens: {
    TANGO: {
      symbol: 'TANGO',
      decimals: 18,
      name: 'TangoSwap Token',
    },
    WBCH: {
      address: '0x3743eC0673453E5009310C727Ba4eaF7b3a1cc04',
      symbol: 'WBCH',
      decimals: 18,
      name: 'Wrapped BCH',
    },
  },
  
  // Features
  features: {
    swaps: true,
    liquidityPools: true,
    farming: true,
    crossChain: false,
    subgraph: false,
    officialSDK: false,
    restAPI: false,
  },
  
  // Products
  products: [
    'Token Swaps',
    'Liquidity Pools',
    'Yield Farming',
    'Analytics',
  ],
  
  // Integration via Web3
  integrationExample: `
// TangoSwap Integration via ethers.js
import { ethers } from 'ethers';

// Connect to smartBCH
const provider = new ethers.providers.JsonRpcProvider(
  'https://smartbch.greyh.at'
);

// Router ABI (standard Uniswap V2 compatible)
const ROUTER_ABI = [
  'function getAmountsOut(uint amountIn, address[] memory path) public view returns (uint[] memory amounts)',
  'function swapExactTokensForTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)',
];

// Factory ABI
const FACTORY_ABI = [
  'function getPair(address tokenA, address tokenB) external view returns (address pair)',
];

// Pair ABI (for reserves)
const PAIR_ABI = [
  'function getReserves() external view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast)',
  'function token0() external view returns (address)',
  'function token1() external view returns (address)',
];

async function getPrice(
  routerAddress: string,
  tokenIn: string,
  tokenOut: string,
  amountIn: string
) {
  const router = new ethers.Contract(routerAddress, ROUTER_ABI, provider);
  
  const amounts = await router.getAmountsOut(
    ethers.utils.parseEther(amountIn),
    [tokenIn, tokenOut]
  );
  
  const priceOut = ethers.utils.formatEther(amounts[1]);
  console.log(\`\${amountIn} tokens in = \${priceOut} tokens out\`);
  return priceOut;
}

// Get pair reserves for price calculation
async function getPairPrice(pairAddress: string) {
  const pair = new ethers.Contract(pairAddress, PAIR_ABI, provider);
  
  const [reserve0, reserve1] = await pair.getReserves();
  const token0 = await pair.token0();
  const token1 = await pair.token1();
  
  const price = ethers.utils.formatEther(reserve1) / ethers.utils.formatEther(reserve0);
  
  console.log('Token0:', token0);
  console.log('Token1:', token1);
  console.log('Price:', price);
  
  return { token0, token1, reserve0, reserve1, price };
}
  `,
  
  // Data Sources
  dataSources: [
    {
      name: 'Direct Contract Queries',
      type: 'On-chain',
      description: 'Query router and pair contracts directly via ethers.js/web3.js',
    },
    {
      name: 'SmartScan Explorer',
      type: 'Block Explorer API',
      url: 'https://www.smartscan.cash/',
      description: 'Block explorer for smartBCH with transaction and contract data',
    },
  ],
  
  // Important Notes
  notes: [
    'smartBCH is an EVM-compatible sidechain of Bitcoin Cash',
    'Uses Uniswap V2 compatible contracts',
    'Chain ID: 10000 (mainnet)',
    'Standard Ethereum tooling works (ethers.js, web3.js)',
    'SEP-20 tokens follow ERC-20 standard',
    'No official subgraph - use direct contract queries or SmartScan API',
  ],
};

export default tangoSwap;
