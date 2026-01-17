// Balancer DEX Information
// Automated portfolio manager and trading platform
// Source: Research compiled from Oct14.Research.Cryptocurrency.ETH.Ethereum

export const balancerDEX = {
  name: "Balancer",
  blockchain: "Ethereum",
  type: "Weighted Pool AMM",
  description: "Multi-token automated portfolio manager and trading platform. Balancer allows pools with up to 8 tokens and custom weight ratios, functioning as both a DEX and portfolio manager.",
  
  urls: {
    main: "https://balancer.fi/",
    app: "https://app.balancer.fi/",
    docs: "https://docs.balancer.fi/",
    sdkDocs: "https://docs.balancer.fi/reference/sdk",
  },
  
  api: {
    endpoints: {
      subgraph: "https://api.thegraph.com/subgraphs/name/balancer-labs/balancer-v2",
      ethRpc: "https://eth-mainnet.alchemyapi.io/v2/YOUR_KEY",
    },
    documentation: "https://docs.balancer.fi/",
    rateLimit: "Public subgraph available",
    requiresApiKey: false,
  },
  
  contracts: {
    mainnet: {
      chainId: 1,
      vault: "0xBA12222222228d8Ba445958a75a0704d566BF2C8",
    },
  },
  
  sdk: {
    typescript: {
      packages: [
        {
          name: "@balancer-labs/sdk",
          package: "@balancer-labs/sdk",
          description: "Official Balancer SDK",
          installCommand: "npm install @balancer-labs/sdk",
          github: "https://github.com/balancer-labs",
        },
        {
          name: "ethers.js",
          package: "ethers",
          description: "Ethereum library for smart contract interaction",
          installCommand: "npm install ethers",
        },
      ],
      documentation: "https://docs.balancer.fi/reference/sdk",
    },
  },
  
  integration: {
    subgraphExample: `
import { request, gql } from 'graphql-request';

const query = gql\`
  query GetTokenPrice {
    tokens(where: { id: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48" }) {
      id
      symbol
      latestUSDPrice
      pools(first: 5) {
        id
        name
        totalShares
        tokens {
          address
          balance
          decimals
        }
      }
    }
  }
\`;

const data = await request('https://api.thegraph.com/subgraphs/name/balancer-labs/balancer-v2', query);
const token = data.tokens[0];
console.log('Balancer USDC Price (USD):', token.latestUSDPrice);
    `,
  },
  
  social: {
    twitter: "https://twitter.com/Balancer",
    discord: "https://discord.gg/balancer",
    github: "https://github.com/balancer-labs",
  },
  
  features: {
    hasApi: true,
    hasSdk: true,
    hasSubgraph: true,
    isActive: true,
    supportsCrossChain: true,
    hasLiquidityMining: true,
    isEvmCompatible: true,
    hasWeightedPools: true,
    multiTokenPools: true,
    portfolioManagement: true,
  },
  
  notes: [
    "Balancer supports pools with 2-8 tokens",
    "Custom weight ratios for each token in pool",
    "Functions as automated portfolio manager",
    "Boosted pools for enhanced capital efficiency",
  ],
};
