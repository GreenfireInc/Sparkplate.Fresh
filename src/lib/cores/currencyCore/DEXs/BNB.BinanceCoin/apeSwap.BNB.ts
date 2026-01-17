// ApeSwap DEX Information
// Multi-chain DeFi hub on BNB Smart Chain
// Source: Research compiled from multiple sources

export const apeSwapDEX = {
  name: "ApeSwap",
  blockchain: "BNB Smart Chain (Multi-Chain)",
  type: "Multi-Chain AMM",
  description: "DeFi hub with AMM, lending, and farming on multiple chains. ApeSwap is a community-driven DEX offering swaps, liquidity pools, yield farming, lending, and NFTs across multiple blockchains.",
  
  urls: {
    main: "https://apeswap.finance/",
    app: "https://apeswap.finance/swap",
    docs: "https://apeswap.gitbook.io/apeswap-finance/",
    farms: "https://apeswap.finance/farms",
    pools: "https://apeswap.finance/pools",
  },
  
  api: {
    endpoints: {
      bscRpc: "https://bsc-dataseed.binance.org/",
      subgraph: "Check ApeSwap documentation for subgraph endpoints",
    },
    documentation: "https://apeswap.gitbook.io/apeswap-finance/developers",
    rateLimit: "Check documentation for limits",
    requiresApiKey: false,
  },
  
  contracts: {
    bsc: {
      router: "0xcF0feBd3f17CEf5b47b0cD257aCf6025c5BFf3b7",
      factory: "0x0841BD0B734E4F5853f0dD8d7Ea041c241fb0Da6",
      masterApe: "Check ApeSwap documentation",
    },
  },
  
  tokens: {
    BANANA: {
      address: "0x603c7f932ED1fc6575303D8Fb018fDCBb0f39a95",
      decimals: 18,
      symbol: "BANANA",
      note: "ApeSwap native governance and reward token",
    },
  },
  
  sdk: {
    typescript: {
      available: false,
      note: "No official SDK, use standard EVM libraries",
      documentation: "https://apeswap.gitbook.io/apeswap-finance/developers",
    },
  },
  
  integration: {
    exampleUsage: `
import { ethers } from 'ethers';

// ApeSwap Router setup
const provider = new ethers.providers.JsonRpcProvider('https://bsc-dataseed.binance.org/');

const APESWAP_ROUTER = '0xcF0feBd3f17CEf5b47b0cD257aCf6025c5BFf3b7';
const ROUTER_ABI = [
  'function getAmountsOut(uint amountIn, address[] memory path) public view returns (uint[] memory amounts)',
  'function factory() external pure returns (address)',
  'function WETH() external pure returns (address)'
];

const router = new ethers.Contract(APESWAP_ROUTER, ROUTER_ABI, provider);

// Get swap quote
async function getApeSwapPrice(tokenIn: string, tokenOut: string, amountIn: string) {
  try {
    const amounts = await router.getAmountsOut(
      ethers.utils.parseEther(amountIn),
      [tokenIn, tokenOut]
    );
    
    return {
      inputAmount: amountIn,
      outputAmount: ethers.utils.formatEther(amounts[1]),
      price: parseFloat(ethers.utils.formatEther(amounts[1])) / parseFloat(amountIn)
    };
  } catch (error) {
    console.error('Error getting ApeSwap price:', error);
    throw error;
  }
}

// Get BANANA price in BUSD
const BANANA = '0x603c7f932ED1fc6575303D8Fb018fDCBb0f39a95';
const BUSD = '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56';
const WBNB = '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c';

// Multi-hop swap through WBNB
async function getBananaPrice() {
  const amounts = await router.getAmountsOut(
    ethers.utils.parseEther('1'),
    [BANANA, WBNB, BUSD] // Route through WBNB
  );
  
  return {
    bananaInBusd: ethers.utils.formatEther(amounts[2]),
    path: 'BANANA -> WBNB -> BUSD'
  };
}

getBananaPrice().then(console.log);
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/ape_swap",
    discord: "https://discord.gg/apeswap",
    telegram: "https://t.me/ape_swap",
    medium: "https://ape-swap.medium.com/",
    github: "https://github.com/ApeSwapFinance",
  },
  
  chains: {
    bsc: {
      chainId: 56,
      rpc: "https://bsc-dataseed.binance.org/",
      primary: true,
    },
    polygon: {
      chainId: 137,
      note: "Also deployed on Polygon",
    },
    ethereum: {
      chainId: 1,
      note: "Also deployed on Ethereum mainnet",
    },
  },
  
  features: {
    swaps: true,
    liquidityProvision: true,
    yieldFarming: true,
    limitOrders: false,
    governance: true,
    nftSupport: true,
    lending: true,
    bills: true,
    multiChain: true,
    stakes: true,
  },
  
  products: {
    swap: "AMM token swaps",
    farms: "Yield farming with BANANA rewards",
    pools: "Liquidity pools with rewards",
    lending: "Lending market integration",
    iao: "Initial Ape Offerings (launchpad)",
    nft: "NFT marketplace and collections",
    bills: "Treasury bills for bonding",
  },
  
  notes: [
    "Multi-chain DeFi hub (BSC, Polygon, Ethereum, Arbitrum, Telos)",
    "BANANA token for governance and farming rewards",
    "Comprehensive DeFi suite: swaps, farms, pools, lending, NFTs",
    "Community-driven with DAO governance",
    "Treasury bills (bonds) for protocol-owned liquidity",
    "Initial Ape Offerings (IAO) launchpad",
    "Use standard EVM libraries for integration",
    "No official SDK, interact via ethers.js/web3.js",
  ],
};

export default apeSwapDEX;
