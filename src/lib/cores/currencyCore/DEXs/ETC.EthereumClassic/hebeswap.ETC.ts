// HebeSwap DEX Information
// Community-driven DEX with NFT marketplace on Ethereum Classic
// Source: Research compiled from Oct14.Research.Cryptocurrency.ETC.EthereumClassic

export const hebeswapDEX = {
  name: "HebeSwap",
  blockchain: "Ethereum Classic",
  type: "AMM DEX",
  description: "The largest DEX dapp on the ETC DeFi ecosystem with community-driven development. HebeSwap is a Uniswap V2 fork launched on December 29, 2021, with integrated NFT marketplace and oracle services.",
  
  urls: {
    main: "https://hebeswap.com/",
    app: "https://hebeswap.com/swap",
    nftMarketplace: "https://nft.hebe.cc/",
    oracle: "https://oracle.hebeswap.com/",
    dexScreener: "https://dexscreener.com/ethereumclassic/hebeswap",
    defiLlama: "https://defillama.com/protocol/hebeswap",
  },
  
  api: {
    endpoints: {
      etcRpc: "https://etc.rivet.link",
      alternateRpc: "https://www.ethercluster.com/etc",
      dexScreenerApi: "https://api.dexscreener.com/latest/dex/pairs/ethereumclassic/hebeswap",
    },
    documentation: "Check HebeSwap website for API documentation",
    rateLimit: "Public RPC endpoints available",
    requiresApiKey: false,
    tvl: "~$350,000 USD (as of 2024)",
  },
  
  contracts: {
    mainnet: {
      chainId: 61,
      router: "Check HebeSwap docs for current router address",
      factory: "Check HebeSwap docs for current factory address",
    },
  },
  
  sdk: {
    typescript: {
      packages: [
        {
          name: "ethers.js",
          package: "ethers",
          description: "Ethereum library for smart contract interaction",
          installCommand: "npm install ethers",
        },
        {
          name: "Uniswap V2 SDK",
          package: "@uniswap/v2-sdk",
          description: "Compatible SDK for Uniswap V2 forks like HebeSwap",
          installCommand: "npm install @uniswap/v2-sdk",
        },
      ],
      documentation: "https://hebeswap.com/",
    },
  },
  
  integration: {
    directRpcExample: `
import { ethers } from 'ethers';

// HebeSwap Integration for Ethereum Classic
const ETC_CONFIG = {
  chainId: 61,
  name: 'Ethereum Classic',
  rpcUrl: 'https://www.ethercluster.com/etc',
  nativeCurrency: {
    name: 'Ethereum Classic',
    symbol: 'ETC',
    decimals: 18,
  },
};

// HebeSwap contract addresses (verify on official docs)
const HEBESWAP_ADDRESSES = {
  router: '0x...', // Replace with actual address
  factory: '0x...', // Replace with actual address
};

// Uniswap V2 Router ABI (minimal)
const ROUTER_ABI = [
  'function getAmountsOut(uint amountIn, address[] memory path) public view returns (uint[] memory amounts)',
  'function swapExactTokensForTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)',
];

const provider = new ethers.providers.JsonRpcProvider(ETC_CONFIG.rpcUrl);
const router = new ethers.Contract(HEBESWAP_ADDRESSES.router, ROUTER_ABI, provider);

async function getQuote(tokenIn: string, tokenOut: string, amountIn: string) {
  try {
    const path = [tokenIn, tokenOut];
    const amounts = await router.getAmountsOut(amountIn, path);
    
    const amountOut = amounts[1].toString();
    const price = parseFloat(ethers.utils.formatEther(amounts[1])) / 
                  parseFloat(ethers.utils.formatEther(amountIn));
    
    return { amountOut, price, path };
  } catch (error) {
    console.error('Error getting quote:', error);
    throw error;
  }
}
    `,
    
    pairInfoExample: `
import { ethers } from 'ethers';

const FACTORY_ABI = [
  'function getPair(address tokenA, address tokenB) external view returns (address pair)',
];

const PAIR_ABI = [
  'function getReserves() external view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast)',
  'function token0() external view returns (address)',
  'function token1() external view returns (address)',
];

async function getPairInfo(token0: string, token1: string) {
  const provider = new ethers.providers.JsonRpcProvider('https://www.ethercluster.com/etc');
  const factoryAddress = '0x...'; // HebeSwap factory
  
  const factory = new ethers.Contract(factoryAddress, FACTORY_ABI, provider);
  const pairAddress = await factory.getPair(token0, token1);
  
  if (pairAddress === ethers.constants.AddressZero) {
    throw new Error('Pair does not exist');
  }
  
  const pairContract = new ethers.Contract(pairAddress, PAIR_ABI, provider);
  const [reserve0, reserve1, blockTimestamp] = await pairContract.getReserves();
  
  return {
    pairAddress,
    reserve0: reserve0.toString(),
    reserve1: reserve1.toString(),
    blockTimestamp: blockTimestamp.toString(),
  };
}
    `,
    
    dexScreenerExample: `
import axios from 'axios';

// Get HebeSwap pairs from DEX Screener
async function getHebeSwapPairs() {
  try {
    const response = await axios.get(
      'https://api.dexscreener.com/latest/dex/pairs/ethereumclassic/hebeswap'
    );
    
    return response.data.pairs?.slice(0, 10) || [];
  } catch (error) {
    console.error('DexScreener API error:', error.message);
    throw error;
  }
}

// Get specific pair by address
async function getPairByAddress(pairAddress: string) {
  try {
    const response = await axios.get(
      \`https://api.dexscreener.com/latest/dex/pairs/ethereumclassic/\${pairAddress}\`
    );
    
    return response.data.pair;
  } catch (error) {
    console.error('Pair lookup error:', error.message);
    throw error;
  }
}
    `,
  },
  
  social: {
    twitter: "https://twitter.com/hebeswap",
    telegram: "https://t.me/hebeswap",
    discord: "https://discord.gg/hebeswap",
  },
  
  features: {
    hasApi: false, // No official API, use RPC
    hasSdk: false, // Use Uniswap V2 SDK
    hasSubgraph: false,
    isActive: true,
    supportsCrossChain: false,
    hasLiquidityMining: true,
    isEvmCompatible: true,
    hasNftMarketplace: true,
    hasOracle: true, // HebeSwap Oracle service
    isUniswapV2Fork: true,
  },
  
  notes: [
    "HebeSwap is the largest DEX on Ethereum Classic by TVL (~$350k)",
    "Launched December 29, 2021 as a community-driven project",
    "Includes integrated NFT marketplace at nft.hebe.cc",
    "Provides oracle services for off-chain data integration",
    "Uniswap V2 fork with standard AMM functionality",
  ],
};
