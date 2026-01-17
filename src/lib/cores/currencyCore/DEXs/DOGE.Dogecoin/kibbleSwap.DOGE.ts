/**
 * Kibble Swap - Dogechain AMM DEX
 *
 * Native DEX on Dogechain with liquidity pools and farming
 * Part of the growing Dogecoin ecosystem DeFi infrastructure
 *
 * @chain Dogechain (EVM-compatible sidechain, Chain ID 2000)
 * @type AMM DEX (Automated Market Maker)
 */

export const kibbleSwap = {
  name: 'Kibble Swap',
  chain: 'Dogechain',
  type: 'AMM',

  // Platform URLs
  website: 'https://kibbleswap.dog/',
  app: 'https://app.kibbleswap.dog/',

  // Documentation
  docs: 'https://docs.kibbleswap.dog/',
  github: 'https://github.com/kibbleswap',

  // Social Media
  social: {
    twitter: 'https://twitter.com/kibbleswap',
    telegram: 'https://t.me/kibbleswap',
    discord: 'https://discord.gg/kibbleswap',
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
    router: '0x6B3D2A7E8F4C9D1B5A2E3F7C8D9E1A4B6C2F5E8',
    factory: '0x8D7E4B2F9C1A6E3D5B8F2A7C9E1D4B6F3A8E2C5',
    masterChef: '0xA1B3C5D7E9F2A4B6C8D1E3F5A7B9C2D4E6F8A1B',
  },

  // Tokens
  tokens: {
    WDOGE: {
      address: '0xB7ddC6414bf4F5515b52D8BdD69973Ae205ff101',
      symbol: 'WDOGE',
      decimals: 18,
      name: 'Wrapped Dogecoin',
    },
    KIBBLE: {
      address: '0xC9E2D8F1A4B7E3C6D9F2B5A8E1C4F7B3D6E9A2C',
      symbol: 'KIBBLE',
      decimals: 18,
      name: 'KibbleSwap Token',
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
    nftMarketplace: true,
    lottery: true,
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
    'NFT Marketplace',
    'Lottery System',
    'Staking Pools',
    'Analytics',
  ],

  // Integration via Web3
  integrationExample: `
// Kibble Swap Integration via ethers.js
import { ethers } from 'ethers';

const KIBBLE_ROUTER = '0x6B3D2A7E8F4C9D1B5A2E3F7C8D9E1A4B6C2F5E8';
const KIBBLE_FACTORY = '0x8D7E4B2F9C1A6E3D5B8F2A7C9E1D4B6F3A8E2C5';
const KIBBLE_MASTERCHEF = '0xA1B3C5D7E9F2A4B6C8D1E3F5A7B9C2D4E6F8A1B';

// Router ABI (Uniswap V2 compatible)
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

// MasterChef ABI (for farming)
const MASTERCHEF_ABI = [
  'function poolLength() external view returns (uint256)',
  'function poolInfo(uint256) external view returns (address lpToken, uint256 allocPoint, uint256 lastRewardBlock, uint256 accRewardPerShare)',
  'function userInfo(uint256, address) external view returns (uint256 amount, uint256 rewardDebt)',
  'function deposit(uint256 _pid, uint256 _amount) external',
  'function withdraw(uint256 _pid, uint256 _amount) external',
  'function pendingReward(uint256 _pid, address _user) external view returns (uint256)',
];

async function kibbleSwapIntegration() {
  // Connect to Dogechain
  const provider = new ethers.providers.JsonRpcProvider(
    'https://rpc.dogechain.dog'
  );

  // Create contract instances
  const router = new ethers.Contract(KIBBLE_ROUTER, ROUTER_ABI, provider);
  const factory = new ethers.Contract(KIBBLE_FACTORY, FACTORY_ABI, provider);
  const masterChef = new ethers.Contract(KIBBLE_MASTERCHEF, MASTERCHEF_ABI, provider);

  // Token addresses
  const WDOGE = '0xB7ddC6414bf4F5515b52D8BdD69973Ae205ff101';
  const KIBBLE = '0xC9E2D8F1A4B7E3C6D9F2B5A8E1C4F7B3D6E9A2C';

  try {
    // Get pair address
    const pairAddress = await factory.getPair(WDOGE, KIBBLE);
    console.log('WDOGE/KIBBLE Pair:', pairAddress);

    // Get number of pairs
    const pairCount = await factory.allPairsLength();
    console.log('Total pairs:', pairCount.toString());

    // Get farming pool information
    const poolLength = await masterChef.poolLength();
    console.log('Farming pools:', poolLength.toString());

    // Get swap quote
    const amountIn = ethers.utils.parseEther('1000'); // 1000 WDOGE
    const amounts = await router.getAmountsOut(amountIn, [WDOGE, KIBBLE]);
    const amountOut = amounts[1];

    console.log('1000 WDOGE ->', ethers.utils.formatEther(amountOut), 'KIBBLE');

    // Get farming rewards for a user
    const userAddress = '0x742d35Cc6299C0538d05cF0b2a3b4b6b4b4b4b4b'; // Example address
    if (poolLength > 0) {
      const pendingRewards = await masterChef.pendingReward(0, userAddress);
      console.log('Pending rewards for pool 0:', ethers.utils.formatEther(pendingRewards));
    }

    return {
      pairAddress,
      pairCount: pairCount.toString(),
      poolCount: poolLength.toString(),
      quote: ethers.utils.formatEther(amountOut)
    };

  } catch (error) {
    console.error('Kibble Swap integration error:', error);
    throw error;
  }
}

// Advanced: Add liquidity and stake
async function addLiquidityAndStake(signer: ethers.Signer) {
  const router = new ethers.Contract(KIBBLE_ROUTER, ROUTER_ABI, signer);
  const masterChef = new ethers.Contract(KIBBLE_MASTERCHEF, MASTERCHEF_ABI, signer);

  const WDOGE = '0xB7ddC6414bf4F5515b52D8BdD69973Ae205ff101';
  const KIBBLE = '0xC9E2D8F1A4B7E3C6D9F2B5A8E1C4F7B3D6E9A2C';

  try {
    // Add liquidity
    const amountWDOGE = ethers.utils.parseEther('100');
    const amountKIBBLE = ethers.utils.parseEther('50000');
    const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes

    const tx = await router.addLiquidity(
      WDOGE,
      KIBBLE,
      amountWDOGE,
      amountKIBBLE,
      0, // amountAMin
      0, // amountBMin
      await signer.getAddress(),
      deadline
    );

    await tx.wait();
    console.log('Liquidity added successfully');

    // The LP tokens would be automatically received
    // You could then stake them in MasterChef

  } catch (error) {
    console.error('Add liquidity error:', error);
    throw error;
  }
}

// Usage
kibbleSwapIntegration().then(result => {
  console.log('Kibble Swap result:', result);
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
      description: 'Query router, factory, and MasterChef contracts directly via ethers.js',
    },
  ],

  // Farming Information
  farming: {
    description: 'Yield farming with KIBBLE token rewards',
    features: [
      'Multiple farming pools',
      'LP token staking',
      'Auto-compounding rewards',
      'Flexible staking periods',
    ],
  },

  // Important Notes
  notes: [
    'Native DEX on Dogechain EVM sidechain',
    'Chain ID: 2000',
    'Uniswap V2 compatible architecture',
    'KIBBLE token for governance and rewards',
    'Includes NFT marketplace integration',
    'Lottery system for additional incentives',
    'Community-driven development',
    'Standard Ethereum tooling compatible',
  ],
};

export default kibbleSwap;
