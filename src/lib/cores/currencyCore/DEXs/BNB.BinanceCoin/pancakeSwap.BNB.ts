// PancakeSwap DEX Information
// Leading decentralized exchange on BNB Smart Chain
// Source: Research compiled from Oct13.Research.Cryptocurrency.BNB.Binance

export const pancakeSwapDEX = {
  name: "PancakeSwap",
  blockchain: "BNB Smart Chain",
  type: "AMM DEX",
  description: "The largest decentralized exchange on BNB Smart Chain with deep liquidity. PancakeSwap is the leading DEX on BSC offering swaps, liquidity pools, yield farming, lottery, NFTs, and more.",
  
  urls: {
    main: "https://pancakeswap.finance/",
    app: "https://pancakeswap.finance/swap",
    docs: "https://docs.pancakeswap.finance/",
    developer: "https://developer.pancakeswap.finance/",
    analytics: "https://pancakeswap.finance/info",
  },
  
  api: {
    endpoints: {
      v2Subgraph: "https://api.thegraph.com/subgraphs/name/pancakeswap/exchange-v2",
      v3Subgraph: "https://api.thegraph.com/subgraphs/name/pancakeswap/exchange-v3",
      v3BnbSubgraph: "https://thegraph.com/explorer/subgraphs/A1fvJWQLBeUAggX2WQTMm3FKjXTekNXo77ZySun4YN2m",
      bscRpc: "https://bsc-dataseed.binance.org/",
    },
    documentation: "https://developer.pancakeswap.finance/apis/subgraph",
    rateLimit: "Free tier available, check documentation for limits",
    requiresApiKey: false,
  },
  
  contracts: {
    mainnet: {
      routerV2: "0x10ED43C718714eb63d5aA57B78B54704E256024E",
      factoryV2: "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73",
      routerV3: "Check PancakeSwap documentation for V3 addresses",
      masterChef: "Check PancakeSwap documentation",
    },
  },
  
  tokens: {
    CAKE: {
      address: "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82",
      decimals: 18,
      symbol: "CAKE",
    },
    WBNB: {
      address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
      decimals: 18,
      symbol: "WBNB",
    },
    BUSD: {
      address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
      decimals: 18,
      symbol: "BUSD",
    },
  },
  
  sdk: {
    typescript: {
      packages: [
        {
          name: "@pancakeswap/sdk",
          version: "5.8.17+",
          installCommand: "npm install @pancakeswap/sdk ethers",
          npm: "https://www.npmjs.com/package/@pancakeswap/sdk",
          github: "https://github.com/pancakeswap/pancake-frontend/tree/develop/packages/swap-sdk",
          documentation: "https://docs.uniswap.org/sdk/2.0.0/",
          note: "Forked from Uniswap SDK, refer to Uniswap V2 docs",
        },
        {
          name: "pancakeswap-sdk-v2",
          github: "https://github.com/ibhagwan/pancakeswap-sdk-v2",
          note: "Community fork with TypeScript support",
        },
      ],
      documentation: "https://developer.pancakeswap.finance/",
    },
  },
  
  integration: {
    exampleUsage: `
import { ChainId, Token, WETH, Fetcher, Trade, Route } from '@pancakeswap/sdk';
import { ethers } from 'ethers';

// Setup provider for BSC
const provider = new ethers.providers.JsonRpcProvider(
  'https://bsc-dataseed.binance.org/'
);

const BSC_MAINNET = ChainId.BSC;

// Define tokens
const BUSD = new Token(
  BSC_MAINNET,
  '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
  18,
  'BUSD',
  'Binance-Peg BUSD Token'
);

const CAKE = new Token(
  BSC_MAINNET,
  '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82',
  18,
  'CAKE',
  'PancakeSwap Token'
);

// Get token price
async function getTokenPrice(tokenA: Token, tokenB: Token) {
  // Fetch pair data from blockchain
  const pair = await Fetcher.fetchPairData(tokenA, tokenB, provider);
  
  // Create route
  const route = new Route([pair], tokenA);
  
  // Get mid price
  const midPrice = route.midPrice;
  
  console.log(\`\${tokenA.symbol} price: \${midPrice.toSignificant(6)} \${tokenB.symbol}\`);
  
  return {
    price: midPrice.toSignificant(6),
    invertedPrice: midPrice.invert().toSignificant(6)
  };
}

// Usage
getTokenPrice(CAKE, BUSD).then(console.log);


// Direct Router Query Example
const ROUTER_ABI = [
  'function getAmountsOut(uint amountIn, address[] memory path) public view returns (uint[] memory amounts)'
];

const router = new ethers.Contract(
  '0x10ED43C718714eb63d5aA57B78B54704E256024E',
  ROUTER_ABI,
  provider
);

async function getSwapPrice(tokenIn: string, tokenOut: string, amountIn: string) {
  const amounts = await router.getAmountsOut(
    ethers.utils.parseEther(amountIn),
    [tokenIn, tokenOut]
  );
  
  return ethers.utils.formatEther(amounts[1]);
}
    `,
  },
  
  subgraph: {
    provider: "The Graph",
    v2Documentation: "https://developer.pancakeswap.finance/apis/subgraph",
    v3Documentation: "https://developer.pancakeswap.finance/apis/subgraph",
    subqueryIntegration: {
      available: true,
      documentation: "https://subquery.network/doc/indexer/quickstart/quickstart_chains/bsc-pancakeswap-v3.html",
      description: "SubQuery starter project for indexing PancakeSwap V3 on BSC",
    },
    exampleQuery: `
import { request, gql } from 'graphql-request';

const SUBGRAPH_URL = 'https://api.thegraph.com/subgraphs/name/pancakeswap/exchange-v2';

const PAIR_QUERY = gql\`
  query getPair($pairAddress: String!) {
    pair(id: $pairAddress) {
      token0 { symbol }
      token1 { symbol }
      reserve0
      reserve1
      token0Price
      token1Price
      reserveUSD
      volumeUSD
    }
  }
\`;

async function getPairData(pairAddress: string) {
  const data = await request(SUBGRAPH_URL, PAIR_QUERY, {
    pairAddress: pairAddress.toLowerCase()
  });
  return data.pair;
}
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/pancakeswap",
    discord: "https://discord.gg/pancakeswap",
    telegram: "https://t.me/pancakeswap",
    reddit: "https://reddit.com/r/pancakeswap",
    medium: "https://pancakeswap.medium.com/",
    github: "https://github.com/pancakeswap",
  },
  
  features: {
    swaps: true,
    liquidityProvision: true,
    yieldFarming: true,
    limitOrders: false,
    governance: true,
    nftSupport: true,
    lottery: true,
    perpetuals: true,
    stableSwap: true,
    v3ConcentratedLiquidity: true,
    crossChain: true,
  },
  
  analytics: {
    volume24h: "Check https://pancakeswap.finance/info",
    tvl: "Check https://defillama.com/protocol/pancakeswap",
    marketDominance: "Leading DEX on BSC with 35.1% chain dominance",
  },
  
  notes: [
    "Largest DEX on BNB Smart Chain by volume and TVL",
    "V2 and V3 versions available (constant product and concentrated liquidity)",
    "Comprehensive TypeScript SDK based on Uniswap V2",
    "The Graph subgraphs available for V2 and V3",
    "SubQuery indexing available for custom data needs",
    "Multi-chain deployment (BSC, Ethereum, Arbitrum, more)",
    "CAKE token for governance and fee discounts",
    "Extensive DeFi features: farms, pools, lottery, NFTs, perpetuals",
    "EVM-compatible, use ethers.js or web3.js",
    "Free public RPC endpoints available from Binance and others",
  ],
};

export default pancakeSwapDEX;
