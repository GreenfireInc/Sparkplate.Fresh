// Uniswap DEX Information
// Largest and most popular DEX on Ethereum
// Source: Research compiled from Oct14.Research.Cryptocurrency.ETH.Ethereum

export const uniswapDEX = {
  name: "Uniswap",
  blockchain: "Ethereum",
  type: "Concentrated Liquidity AMM",
  description: "The largest and most popular decentralized exchange on Ethereum with V3 concentrated liquidity. Uniswap pioneered the AMM model and has over $4 billion in TVL with the highest trading volume of all Ethereum DEXs.",
  
  urls: {
    main: "https://uniswap.org/",
    app: "https://app.uniswap.org/",
    docs: "https://docs.uniswap.org/",
    v3Sdk: "https://docs.uniswap.org/sdk/v3/overview",
    apiDocs: "https://docs.uniswap.org/api/subgraph/overview",
  },
  
  api: {
    endpoints: {
      v2Subgraph: "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2",
      v3Subgraph: "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3",
      ethRpc: "https://eth-mainnet.alchemyapi.io/v2/YOUR_KEY",
    },
    documentation: "https://docs.uniswap.org/",
    apiReference: "https://docs.uniswap.org/api/subgraph/overview",
    rateLimit: "Public subgraph available",
    requiresApiKey: false,
  },
  
  contracts: {
    mainnet: {
      chainId: 1,
      v2Router: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
      v2Factory: "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f",
      v3Factory: "0x1F98431c8aD98523631AE4a59f267346ea31F984",
      quoterV2: "0x61fFE014bA17989E743c5F6cB21bF9697530B21e",
      swapRouter02: "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45",
    },
  },
  
  tokens: {
    WETH: {
      address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
      symbol: "WETH",
      decimals: 18,
    },
    USDC: {
      address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
      symbol: "USDC",
      decimals: 6,
    },
    USDT: {
      address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
      symbol: "USDT",
      decimals: 6,
    },
    DAI: {
      address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
      symbol: "DAI",
      decimals: 18,
    },
  },
  
  sdk: {
    typescript: {
      packages: [
        {
          name: "@uniswap/sdk-core",
          package: "@uniswap/sdk-core",
          description: "Core SDK for Uniswap integration",
          installCommand: "npm install @uniswap/sdk-core",
        },
        {
          name: "@uniswap/v3-sdk",
          package: "@uniswap/v3-sdk",
          description: "Uniswap V3 SDK for concentrated liquidity",
          installCommand: "npm install @uniswap/v3-sdk",
        },
        {
          name: "@uniswap/smart-order-router",
          package: "@uniswap/smart-order-router",
          description: "Smart order router for best execution",
          installCommand: "npm install @uniswap/smart-order-router",
        },
        {
          name: "ethers.js",
          package: "ethers",
          description: "Ethereum library for smart contract interaction",
          installCommand: "npm install ethers",
        },
      ],
      documentation: "https://docs.uniswap.org/sdk/v3/overview",
    },
  },
  
  integration: {
    v3SdkExample: `
import { Token, CurrencyAmount, TradeType } from '@uniswap/sdk-core';
import { Pool, Route, Trade } from '@uniswap/v3-sdk';
import { ethers } from 'ethers';

const provider = new ethers.providers.JsonRpcProvider('https://eth-mainnet.alchemyapi.io/v2/YOUR_KEY');

// Define tokens
const USDC = new Token(1, '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', 6, 'USDC');
const DAI = new Token(1, '0x6B175474E89094C44Da98b954EedeAC495271d0F', 18, 'DAI');

// Get pool data
const poolAddress = '0x8ad599c3A0ff1De082011EFDDc58f1908761f7e6'; // USDC/DAI 0.05%
const poolContract = new ethers.Contract(
  poolAddress,
  ['function slot0() view returns (uint160, int24, uint16, uint16, uint16, uint8, bool)'],
  provider
);

const [sqrtPriceX96, tick] = await poolContract.slot0();

const pool = new Pool(
  USDC,
  DAI,
  3000, // fee tier
  sqrtPriceX96.toString(),
  '1000000000000000000',
  tick
);

const midPrice = pool.priceOf(USDC);
console.log('Uniswap V3 USDC/DAI Price:', midPrice.toSignificant(6));
    `,
    
    subgraphExample: `
import { request, gql } from 'graphql-request';

const UNISWAP_V3_SUBGRAPH = 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3';

const query = gql\`
  query GetTokenPrice($tokenId: String!) {
    token(id: $tokenId) {
      id
      name
      symbol
      derivedETH
      dayData(orderBy: date, orderDirection: desc, first: 1) {
        priceUSD
      }
    }
  }
\`;

const variables = {
  tokenId: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48' // USDC
};

const data = await request(UNISWAP_V3_SUBGRAPH, query, variables);
const priceUSD = data.token.dayData[0]?.priceUSD;
console.log('Uniswap V3 USDC Price:', priceUSD);
    `,
    
    smartOrderRouterExample: `
import { AlphaRouter } from '@uniswap/smart-order-router';
import { Token, CurrencyAmount, TradeType, Percent } from '@uniswap/sdk-core';
import { ethers } from 'ethers';

const provider = new ethers.providers.JsonRpcProvider('YOUR_RPC_URL');

const router = new AlphaRouter({
  chainId: 1,
  provider: provider,
});

const WETH = new Token(1, '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', 18, 'WETH');
const DAI = new Token(1, '0x6B175474E89094C44Da98b954EedeAC495271d0F', 18, 'DAI');

const route = await router.route(
  CurrencyAmount.fromRawAmount(
    WETH,
    '1000000000000000000' // 1 WETH
  ),
  DAI,
  TradeType.EXACT_INPUT,
  {
    recipient: 'YOUR_ADDRESS',
    slippageTolerance: new Percent(5, 100), // 0.5%
    deadline: Math.floor(Date.now() / 1000 + 1800),
  }
);

console.log(\`Best route output: \${route?.trade.outputAmount.toFixed()}\`);
    `,
  },
  
  social: {
    twitter: "https://twitter.com/Uniswap",
    discord: "https://discord.gg/uniswap",
    github: "https://github.com/Uniswap",
  },
  
  features: {
    hasApi: true,
    hasSdk: true,
    hasSubgraph: true,
    isActive: true,
    supportsCrossChain: false,
    hasLiquidityMining: true,
    isEvmCompatible: true,
    hasConcentratedLiquidity: true, // V3 feature
    hasMultipleVersions: true, // V2, V3
    hasSmartOrderRouter: true,
    tvl: "$4+ billion",
    volume24h: "$8.6+ billion",
  },
  
  notes: [
    "Uniswap is the largest DEX on Ethereum by TVL and volume",
    "V3 introduces concentrated liquidity for capital efficiency",
    "V2 is still widely used and supported",
    "Smart Order Router finds best execution across V2/V3",
    "Comprehensive SDK and subgraph support",
  ],
};
