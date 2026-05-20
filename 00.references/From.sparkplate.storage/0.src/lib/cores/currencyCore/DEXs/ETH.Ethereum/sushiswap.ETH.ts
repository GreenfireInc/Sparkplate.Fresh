// SushiSwap DEX Information
// Community-driven multi-chain DEX
// Source: Research compiled from Oct14.Research.Cryptocurrency.ETH.Ethereum

export const sushiswapDEX = {
  name: "SushiSwap",
  blockchain: "Multi-Chain (including Ethereum)",
  type: "Multi-Chain AMM",
  description: "Community-driven DEX with extensive DeFi ecosystem. SushiSwap is a fork of Uniswap with additional features like yield farming, lending, and cross-chain support.",
  
  urls: {
    main: "https://www.sushi.com/",
    app: "https://www.sushi.com/swap",
    docs: "https://docs.sushi.com/",
    github: "https://github.com/sushiswap",
  },
  
  api: {
    endpoints: {
      subgraph: "https://api.thegraph.com/subgraphs/name/sushiswap/exchange",
      ethRpc: "https://eth-mainnet.alchemyapi.io/v2/YOUR_KEY",
    },
    documentation: "https://docs.sushi.com/",
    rateLimit: "Public subgraph available",
    requiresApiKey: false,
  },
  
  contracts: {
    mainnet: {
      chainId: 1,
      router: "0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F",
      factory: "0xC0AEe478e3658e2610c5F7A4A2E1777cE9e4f2Ac",
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
      ],
      documentation: "https://docs.sushi.com/",
    },
  },
  
  integration: {
    subgraphExample: `
import { request, gql } from 'graphql-request';

const query = gql\`
  query GetPair {
    pairs(
      first: 1
      orderBy: trackedReserveETH
      orderDirection: desc
      where: {
        token0: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
        token1: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
      }
    ) {
      id
      token0Price
      token1Price
      reserve0
      reserve1
    }
  }
\`;

const data = await request('https://api.thegraph.com/subgraphs/name/sushiswap/exchange', query);
const pair = data.pairs[0];
console.log('SushiSwap USDC/WETH Price:', pair.token0Price);
    `,
  },
  
  social: {
    twitter: "https://twitter.com/sushiswap",
    discord: "https://discord.gg/sushiswap",
    github: "https://github.com/sushiswap",
  },
  
  features: {
    hasApi: true,
    hasSdk: false,
    hasSubgraph: true,
    isActive: true,
    supportsCrossChain: true,
    hasLiquidityMining: true,
    isEvmCompatible: true,
    hasYieldFarming: true,
    hasLending: true,
  },
  
  notes: [
    "SushiSwap is a community-driven Uniswap fork",
    "Offers additional DeFi features beyond swapping",
    "Multi-chain deployment across 20+ networks",
    "Active governance and SUSHI token rewards",
  ],
};
