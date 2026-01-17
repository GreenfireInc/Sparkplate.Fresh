// BabySwap DEX Information
// Community-driven DEX with NFT marketplace on BNB Chain
// Source: Research compiled from multiple sources

export const babySwapDEX = {
  name: "BabySwap",
  blockchain: "BNB Smart Chain",
  type: "AMM DEX",
  description: "Community-driven DEX with NFT marketplace integration. BabySwap combines traditional AMM functionality with NFT trading, yield farming, and community-focused features.",
  
  urls: {
    main: "https://babyswap.finance/",
    app: "https://exchange.babyswap.finance/",
    docs: "https://docs.babyswap.finance/",
    nft: "https://nft.babyswap.finance/",
  },
  
  api: {
    endpoints: {
      bscRpc: "https://bsc-dataseed.binance.org/",
    },
    documentation: "https://docs.babyswap.finance/",
    rateLimit: "Check documentation for limits",
    requiresApiKey: false,
    note: "No public subgraph, use direct contract queries",
  },
  
  contracts: {
    mainnet: {
      router: "Check BabySwap documentation for router address",
      factory: "Check BabySwap documentation",
      masterChef: "Check BabySwap documentation",
    },
  },
  
  tokens: {
    BABY: {
      symbol: "BABY",
      decimals: 18,
      note: "BabySwap native governance and reward token",
    },
  },
  
  sdk: {
    typescript: {
      available: false,
      note: "No official SDK. Use ethers.js/web3.js for contract interaction",
      alternative: "Standard EVM libraries work with BabySwap contracts",
    },
  },
  
  integration: {
    exampleUsage: `
import { ethers } from 'ethers';

// BabySwap Router setup
const provider = new ethers.providers.JsonRpcProvider('https://bsc-dataseed.binance.org/');

// Note: Get actual router address from BabySwap documentation
const BABYSWAP_ROUTER = '0x...'; // Replace with actual address

const ROUTER_ABI = [
  'function getAmountsOut(uint amountIn, address[] memory path) public view returns (uint[] memory amounts)',
  'function swapExactTokensForTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)',
  'function factory() external pure returns (address)'
];

const router = new ethers.Contract(BABYSWAP_ROUTER, ROUTER_ABI, provider);

// Get swap price
async function getBabySwapPrice(tokenIn: string, tokenOut: string, amountIn: string) {
  try {
    const amounts = await router.getAmountsOut(
      ethers.utils.parseEther(amountIn),
      [tokenIn, tokenOut]
    );
    
    const outputAmount = ethers.utils.formatEther(amounts[1]);
    
    return {
      inputAmount: amountIn,
      outputAmount,
      price: parseFloat(outputAmount) / parseFloat(amountIn),
      dex: 'BabySwap'
    };
  } catch (error) {
    console.error('Error getting BabySwap price:', error);
    throw error;
  }
}

// Multi-hop routing example
async function getMultiHopPrice(path: string[], amountIn: string) {
  const amounts = await router.getAmountsOut(
    ethers.utils.parseEther(amountIn),
    path
  );
  
  return amounts.map((amount, index) => ({
    step: index,
    amount: ethers.utils.formatEther(amount)
  }));
}

// Example usage
const WBNB = '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c';
const BUSD = '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56';
const BABY = '0x...'; // BABY token address

getBabySwapPrice(WBNB, BUSD, '1').then(console.log);

// Get BABY price through WBNB
getMultiHopPrice([BABY, WBNB, BUSD], '1').then(console.log);
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/BabySwap_bsc",
    telegram: "https://t.me/babyswap_eng",
    medium: "https://medium.com/@babyswap",
    github: "https://github.com/babyswap",
  },
  
  features: {
    swaps: true,
    liquidityProvision: true,
    yieldFarming: true,
    limitOrders: false,
    governance: true,
    nftSupport: true,
    nftMarketplace: true,
    lottery: false,
    communityDriven: true,
  },
  
  products: {
    swap: "Standard AMM token swaps",
    farms: "Yield farming with BABY rewards",
    pools: "Liquidity mining pools",
    nft: "NFT marketplace and trading",
    nftFarms: "NFT staking for additional rewards",
  },
  
  notes: [
    "Community-driven DEX on BNB Smart Chain",
    "BABY token for governance and farming rewards",
    "Integrated NFT marketplace for trading and staking",
    "NFT staking for boosted farming rewards",
    "Standard AMM model (Uniswap V2 fork)",
    "Use ethers.js/web3.js for integration",
    "No official SDK or subgraph",
    "Direct contract interaction required",
    "Check official documentation for latest contract addresses",
  ],
};

export default babySwapDEX;
