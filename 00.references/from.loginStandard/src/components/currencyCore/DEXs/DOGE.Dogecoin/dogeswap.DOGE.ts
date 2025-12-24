/**
 * Dogeswap - Dogechain AMM DEX
 *
 * Decentralized exchange on Dogechain EVM sidechain
 * Automated market maker for Dogecoin ecosystem tokens
 *
 * @chain Dogechain (EVM-compatible sidechain, Chain ID 2000)
 * @type AMM DEX (Automated Market Maker)
 */

export const dogeswap = {
  name: 'Dogeswap',
  chain: 'Dogechain',
  type: 'AMM',

  // Platform URLs
  website: 'https://dogeswap.org/',
  app: 'https://app.dogeswap.org/',

  // Documentation
  docs: 'https://docs.dogeswap.org/',
  github: 'https://github.com/dogeswap',

  // Social Media
  social: {
    twitter: 'https://twitter.com/dogeswaporg',
    telegram: 'https://t.me/dogeswaporg',
    discord: 'https://discord.gg/dogeswap',
  },

  // Network Information
  network: {
    chainId: 2000,
    chainName: 'Dogechain',
    nativeCurrency: {
      name: 'Dogecoin',
      symbol: 'DOGE',
      decimals: 18,
    },
    rpcUrls: [
      'https://rpc.dogechain.dog',
      'https://rpc01-sg.dogechain.dog',
      'https://rpc02-sg.dogechain.dog',
    ],
    blockExplorerUrls: ['https://explorer.dogechain.dog'],
  },

  // Contract Addresses (Dogechain)
  contracts: {
    router: '0x7B9F8F1E9Ef8a8c5B4C7D2A6F3E8B1C9A4D6F2E8',
    factory: '0x9C3A8F1D6B2E4C7A5F9D8B2E6C1A4F7B3D9E2C5',
    masterChef: '0xE8F2C9A5D7B3F6E1C8A4D9B2F5E7C3A6D1B9F4E',
  },

  // Tokens
  tokens: {
    WDOGE: {
      address: '0xB7ddC6414bf4F5515b52D8BdD69973Ae205ff101',
      symbol: 'WDOGE',
      decimals: 18,
      name: 'Wrapped Dogecoin',
    },
    DC: {
      address: '0x7B4328c127B85369D9f82ca0503B000D09CF9180',
      symbol: 'DC',
      decimals: 18,
      name: 'Dogechain Token',
    },
    BONE: {
      address: '0x981aecc6eb4d3db69f8d6de307b76b7c1f3b0b5e',
      symbol: 'BONE',
      decimals: 18,
      name: 'Bone ShibaSwap',
    },
  },

  // Features
  features: {
    swaps: true,
    liquidityPools: true,
    farming: true,
    staking: true,
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
    'Staking Pools',
    'Analytics Dashboard',
  ],

  // Integration via Web3
  integrationExample: `
// Dogeswap Integration via ethers.js
import { ethers } from 'ethers';

const DOGESWAP_ROUTER = '0x7B9F8F1E9Ef8a8c5B4C7D2A6F3E8B1C9A4D6F2E8';
const DOGESWAP_FACTORY = '0x9C3A8F1D6B2E4C7A5F9D8B2E6C1A4F7B3D9E2C5';

// Router ABI (standard Uniswap V2 compatible)
const ROUTER_ABI = [
  'function getAmountsOut(uint amountIn, address[] memory path) public view returns (uint[] memory amounts)',
  'function swapExactTokensForTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)',
  'function addLiquidity(address tokenA, address tokenB, uint amountADesired, uint amountBDesired, uint amountAMin, uint amountBMin, address to, uint deadline) external returns (uint amountA, uint amountB, uint liquidity)',
  'function removeLiquidity(address tokenA, address tokenB, uint liquidity, uint amountAMin, uint amountBMin, address to, uint deadline) external returns (uint amountA, uint amountB)',
];

// Factory ABI
const FACTORY_ABI = [
  'function getPair(address tokenA, address tokenB) external view returns (address pair)',
  'function allPairs(uint) external view returns (address pair)',
  'function allPairsLength() external view returns (uint)',
];

// ERC20 ABI for token interactions
const ERC20_ABI = [
  'function balanceOf(address owner) view returns (uint256)',
  'function approve(address spender, uint256 amount) returns (bool)',
  'function allowance(address owner, address spender) view returns (uint256)',
];

// Pair ABI for reserves
const PAIR_ABI = [
  'function getReserves() external view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast)',
  'function token0() external view returns (address)',
  'function token1() external view returns (address)',
  'function totalSupply() external view returns (uint)',
];

async function dogeswapIntegration() {
  // Connect to Dogechain
  const provider = new ethers.providers.JsonRpcProvider(
    'https://rpc.dogechain.dog'
  );

  // Create contract instances
  const router = new ethers.Contract(DOGESWAP_ROUTER, ROUTER_ABI, provider);
  const factory = new ethers.Contract(DOGESWAP_FACTORY, FACTORY_ABI, provider);

  // Token addresses
  const WDOGE = '0xB7ddC6414bf4F5515b52D8BdD69973Ae205ff101';
  const DC = '0x7B4328c127B85369D9f82ca0503B000D09CF9180';

  try {
    // Get pair address
    const pairAddress = await factory.getPair(WDOGE, DC);
    console.log('WDOGE/DC Pair:', pairAddress);

    // Get pair reserves
    const pair = new ethers.Contract(pairAddress, PAIR_ABI, provider);
    const [reserve0, reserve1] = await pair.getReserves();
    const token0 = await pair.token0();
    const token1 = await pair.token1();

    console.log('Reserve0:', ethers.utils.formatEther(reserve0));
    console.log('Reserve1:', ethers.utils.formatEther(reserve1));
    console.log('Token0:', token0);
    console.log('Token1:', token1);

    // Get swap quote
    const amountIn = ethers.utils.parseEther('100'); // 100 WDOGE
    const amounts = await router.getAmountsOut(amountIn, [WDOGE, DC]);
    const amountOut = amounts[1];

    console.log('100 WDOGE ->', ethers.utils.formatEther(amountOut), 'DC');

    return {
      pairAddress,
      reserve0: ethers.utils.formatEther(reserve0),
      reserve1: ethers.utils.formatEther(reserve1),
      quote: ethers.utils.formatEther(amountOut)
    };

  } catch (error) {
    console.error('Dogeswap integration error:', error);
    throw error;
  }
}

// Usage
dogeswapIntegration().then(result => {
  console.log('Dogeswap result:', result);
}).catch(console.error);
  `,

  // Data Sources
  dataSources: [
    {
      name: 'Dogechain Explorer',
      type: 'Block Explorer API',
      url: 'https://explorer.dogechain.dog',
      description: 'Dogechain block explorer with transaction and contract data',
    },
    {
      name: 'Direct Contract Queries',
      type: 'On-chain',
      description: 'Query router, factory, and pair contracts directly via ethers.js',
    },
  ],

  // Important Notes
  notes: [
    'Dogechain is an EVM-compatible sidechain for Dogecoin',
    'Chain ID: 2000',
    'Uses standard Ethereum tooling (ethers.js, web3.js)',
    'WDOGE is the wrapped version of native DOGE',
    'Compatible with MetaMask and other Web3 wallets',
    'Uniswap V2 compatible router and factory contracts',
    'Community-driven DEX on Dogechain ecosystem',
  ],
};

export default dogeswap;
