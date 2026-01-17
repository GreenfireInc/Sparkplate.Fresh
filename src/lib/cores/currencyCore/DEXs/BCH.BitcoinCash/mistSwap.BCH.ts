/**
 * MistSwap - SmartBCH AMM DEX
 * 
 * Decentralized exchange on SmartBCH sidechain
 * Provides automated market maker functionality for BCH ecosystem
 * 
 * @chain smartBCH (EVM-compatible sidechain, Chain ID 10000)
 * @type AMM DEX (Automated Market Maker)
 */

export const mistSwap = {
  name: 'MistSwap',
  chain: 'smartBCH',
  type: 'AMM',
  
  // Platform URLs
  website: 'https://mistswap.fi/',
  app: 'https://app.mistswap.fi/',
  
  // Documentation
  docs: 'https://docs.mistswap.fi/',
  github: 'https://github.com/mistswap',
  
  // Social Media
  social: {
    twitter: 'https://twitter.com/MistSwap',
    telegram: 'https://t.me/mistswap',
    discord: 'https://discord.gg/mistswap',
    medium: 'https://medium.com/@mistswap',
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
  
  // Contract Addresses (smartBCH)
  contracts: {
    router: '0x5d0bF8D8c8b054080E2131ebf8854F19f2dD8B5',
    factory: '0x8c2A90D36Ec9F745C9B28B588Cba5e2A978A1656',
  },
  
  // Tokens
  tokens: {
    MIST: {
      address: '0x5fA664f69c2A4A3ec94FaC3cBf7049BD9CA73129',
      symbol: 'MIST',
      decimals: 18,
      name: 'MistSwap Token',
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
    'Staking',
    'Analytics Dashboard',
  ],
  
  // Integration via Web3
  integrationExample: `
// MistSwap Integration via ethers.js
import { ethers } from 'ethers';

const MISTSWAP_ROUTER = '0x5d0bF8D8c8b054080E2131ebf8854F19f2dD8B5';
const MISTSWAP_FACTORY = '0x8c2A90D36Ec9F745C9B28B588Cba5e2A978A1656';

// Router ABI (simplified)
const ROUTER_ABI = [
  'function getAmountsOut(uint amountIn, address[] memory path) public view returns (uint[] memory amounts)',
  'function swapExactTokensForTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)',
];

// Factory ABI (simplified)
const FACTORY_ABI = [
  'function getPair(address tokenA, address tokenB) external view returns (address pair)',
];

// Connect to smartBCH
const provider = new ethers.providers.JsonRpcProvider(
  'https://smartbch.greyh.at'
);

const router = new ethers.Contract(MISTSWAP_ROUTER, ROUTER_ABI, provider);
const factory = new ethers.Contract(MISTSWAP_FACTORY, FACTORY_ABI, provider);

// Get price quote
async function getPrice(tokenIn: string, tokenOut: string, amountIn: string) {
  const amounts = await router.getAmountsOut(
    ethers.utils.parseEther(amountIn),
    [tokenIn, tokenOut]
  );
  
  const priceOut = ethers.utils.formatEther(amounts[1]);
  console.log(\`Price: \${amountIn} tokens = \${priceOut} tokens\`);
  return priceOut;
}

// Get pair address
async function getPairAddress(tokenA: string, tokenB: string) {
  const pairAddress = await factory.getPair(tokenA, tokenB);
  console.log('Pair address:', pairAddress);
  return pairAddress;
}

// Usage
const WBCH = '0x3743eC0673453E5009310C727Ba4eaF7b3a1cc04';
const MIST = '0x5fA664f69c2A4A3ec94FaC3cBf7049BD9CA73129';

await getPrice(WBCH, MIST, '1');
await getPairAddress(WBCH, MIST);
  `,
  
  // Data Sources
  dataSources: [
    {
      name: 'Direct Contract Queries',
      type: 'On-chain',
      description: 'Query router and factory contracts directly via ethers.js/web3.js',
    },
    {
      name: 'SmartScan Explorer',
      type: 'Block Explorer API',
      url: 'https://www.smartscan.cash/',
      description: 'Block explorer for smartBCH with API access',
    },
  ],
  
  // Important Notes
  notes: [
    'smartBCH is an EVM-compatible sidechain of Bitcoin Cash',
    'Uses standard Ethereum tooling (ethers.js, web3.js)',
    'Chain ID: 10000 (mainnet)',
    'Compatible with MetaMask and other Web3 wallets',
    'SEP-20 tokens are ERC-20 compatible',
    'No official subgraph available - use direct contract queries',
  ],
};

export default mistSwap;
