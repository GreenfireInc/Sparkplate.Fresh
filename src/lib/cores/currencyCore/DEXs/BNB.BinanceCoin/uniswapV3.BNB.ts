// Uniswap V3 (BSC) DEX Information
// Concentrated liquidity AMM deployed on BNB Smart Chain
// Source: Research compiled from multiple sources

export const uniswapV3DEX = {
  name: "Uniswap V3 (BSC)",
  blockchain: "BNB Smart Chain",
  type: "Concentrated Liquidity AMM",
  description: "Uniswap V3 deployment on BNB Smart Chain. Leading concentrated liquidity AMM with capital-efficient market making and flexible fee tiers.",
  
  urls: {
    main: "https://uniswap.org/",
    app: "https://app.uniswap.org/",
    docs: "https://docs.uniswap.org/",
    analytics: "https://info.uniswap.org/",
  },
  
  api: {
    endpoints: {
      bscRpc: "https://bsc-dataseed.binance.org/",
      subgraph: "Check Uniswap documentation for BSC subgraph",
      v3Core: "https://docs.uniswap.org/contracts/v3/reference/core",
    },
    documentation: "https://docs.uniswap.org/sdk/v3/overview",
    rateLimit: "Varies by subgraph provider",
    requiresApiKey: false,
  },
  
  contracts: {
    bsc: {
      factory: "Check Uniswap documentation for BSC deployment addresses",
      router: "SwapRouter02",
      quoter: "QuoterV2",
      note: "Uniswap V3 contracts are immutable and deployed across chains",
    },
  },
  
  sdk: {
    typescript: {
      packages: [
        {
          name: "@uniswap/v3-sdk",
          version: "Latest",
          installCommand: "npm install @uniswap/v3-sdk @uniswap/sdk-core ethers",
          npm: "https://www.npmjs.com/package/@uniswap/v3-sdk",
          github: "https://github.com/Uniswap/v3-sdk",
          documentation: "https://docs.uniswap.org/sdk/v3/overview",
        },
        {
          name: "@uniswap/smart-order-router",
          description: "Routing library for optimal swap paths",
          installCommand: "npm install @uniswap/smart-order-router",
        },
      ],
      documentation: "https://docs.uniswap.org/sdk/v3/overview",
    },
  },
  
  integration: {
    exampleUsage: `
import { ethers } from 'ethers';
import { Pool, Route, Trade } from '@uniswap/v3-sdk';
import { Token, CurrencyAmount, TradeType, Percent } from '@uniswap/sdk-core';

// Setup provider for BSC
const provider = new ethers.providers.JsonRpcProvider('https://bsc-dataseed.binance.org/');

const BSC_CHAIN_ID = 56;

// Define tokens on BSC
const WBNB = new Token(
  BSC_CHAIN_ID,
  '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
  18,
  'WBNB',
  'Wrapped BNB'
);

const BUSD = new Token(
  BSC_CHAIN_ID,
  '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
  18,
  'BUSD',
  'BUSD Token'
);

// Query pool data
async function getUniswapV3Price(tokenA: Token, tokenB: Token, fee: number = 3000) {
  // Get pool address from factory
  const FACTORY_ADDRESS = '...'; // Get from Uniswap docs
  const FACTORY_ABI = [
    'function getPool(address tokenA, address tokenB, uint24 fee) external view returns (address pool)'
  ];
  
  const factory = new ethers.Contract(FACTORY_ADDRESS, FACTORY_ABI, provider);
  const poolAddress = await factory.getPool(tokenA.address, tokenB.address, fee);
  
  // Query pool state
  const POOL_ABI = [
    'function slot0() external view returns (uint160 sqrtPriceX96, int24 tick, uint16 observationIndex, uint16 observationCardinality, uint16 observationCardinalityNext, uint8 feeProtocol, bool unlocked)',
    'function liquidity() external view returns (uint128)'
  ];
  
  const poolContract = new ethers.Contract(poolAddress, POOL_ABI, provider);
  const [slot0, liquidity] = await Promise.all([
    poolContract.slot0(),
    poolContract.liquidity()
  ]);
  
  // Create Pool instance
  const pool = new Pool(
    tokenA,
    tokenB,
    fee,
    slot0.sqrtPriceX96.toString(),
    liquidity.toString(),
    slot0.tick
  );
  
  // Get price
  const route = new Route([pool], tokenA, tokenB);
  const price = route.midPrice;
  
  return {
    price: price.toSignificant(6),
    invertedPrice: price.invert().toSignificant(6),
    tick: slot0.tick,
    liquidity: liquidity.toString()
  };
}

// Direct quoter usage
const QUOTER_ABI = [
  'function quoteExactInputSingle(address tokenIn, address tokenOut, uint24 fee, uint256 amountIn, uint160 sqrtPriceLimitX96) external returns (uint256 amountOut)'
];

async function getQuote(tokenIn: string, tokenOut: string, amountIn: string, fee: number = 3000) {
  const QUOTER_ADDRESS = '...'; // Get from Uniswap docs
  const quoter = new ethers.Contract(QUOTER_ADDRESS, QUOTER_ABI, provider);
  
  const amountOut = await quoter.callStatic.quoteExactInputSingle(
    tokenIn,
    tokenOut,
    fee,
    ethers.utils.parseEther(amountIn),
    0 // sqrtPriceLimitX96 (0 = no limit)
  );
  
  return ethers.utils.formatEther(amountOut);
}
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/Uniswap",
    discord: "https://discord.gg/uniswap",
    github: "https://github.com/Uniswap",
    governance: "https://gov.uniswap.org/",
  },
  
  features: {
    swaps: true,
    liquidityProvision: true,
    concentratedLiquidity: true,
    multipleFees: true,
    limitOrders: false,
    governance: true,
    nftPositions: true,
    rangeOrders: true,
    multiChain: true,
  },
  
  feeTiers: [
    {
      tier: "0.01%",
      use: "Stable pairs (USDC/USDT, etc.)",
    },
    {
      tier: "0.05%",
      use: "Correlated pairs",
    },
    {
      tier: "0.3%",
      use: "Most pairs (standard)",
    },
    {
      tier: "1%",
      use: "Exotic pairs",
    },
  ],
  
  notes: [
    "Uniswap V3 concentrated liquidity model",
    "Capital efficient with custom price ranges",
    "Multiple fee tiers (0.01%, 0.05%, 0.3%, 1%)",
    "NFT-based liquidity positions (ERC-721)",
    "Comprehensive TypeScript SDK (@uniswap/v3-sdk)",
    "Smart order router for optimal routing",
    "Multi-chain deployment (Ethereum, BSC, Arbitrum, Polygon, more)",
    "UNI token governance (cross-chain)",
    "Immutable core contracts",
    "Active liquidity with custom ranges",
  ],
};

export default uniswapV3DEX;
