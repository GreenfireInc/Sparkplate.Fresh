// DODO DEX Information
// Proactive Market Maker with capital-efficient liquidity
// Source: Research compiled from multiple sources

export const dodoDEX = {
  name: "DODO",
  blockchain: "BNB Smart Chain (Multi-Chain)",
  type: "PMM DEX",
  description: "Proactive Market Maker DEX with capital-efficient liquidity. DODO uses a unique Proactive Market Maker (PMM) algorithm to provide better pricing and capital efficiency than traditional AMMs.",
  
  urls: {
    main: "https://dodoex.io/",
    app: "https://app.dodoex.io/",
    docs: "https://docs.dodoex.io/",
    analytics: "https://dashboard.dodoex.io/",
  },
  
  api: {
    endpoints: {
      bscRpc: "https://bsc-dataseed.binance.org/",
      subgraph: "https://api.thegraph.com/subgraphs/name/dodoex/dodoex-v2-bsc",
    },
    documentation: "https://docs.dodoex.io/english/developers/subgraph-data",
    rateLimit: "Varies by subgraph provider",
    requiresApiKey: false,
  },
  
  contracts: {
    bsc: {
      dodoV2Proxy: "Check DODO documentation for BSC deployment",
      dspFactory: "Check DODO documentation",
      dppFactory: "Check DODO documentation",
    },
  },
  
  tokens: {
    DODO: {
      symbol: "DODO",
      decimals: 18,
      note: "DODO governance token",
    },
    vDODO: {
      symbol: "vDODO",
      note: "Vote-escrowed DODO for governance",
    },
  },
  
  sdk: {
    typescript: {
      available: true,
      packages: [
        {
          name: "dodo-sdk",
          note: "Check DODO documentation for SDK availability",
          documentation: "https://docs.dodoex.io/",
        },
      ],
      documentation: "https://docs.dodoex.io/english/developers",
    },
  },
  
  integration: {
    exampleUsage: `
import { ethers } from 'ethers';
import { request, gql } from 'graphql-request';

// DODO Subgraph query
const DODO_SUBGRAPH = 'https://api.thegraph.com/subgraphs/name/dodoex/dodoex-v2-bsc';

const PAIR_QUERY = gql\`
  query getPair($pairAddress: String!) {
    pair(id: $pairAddress) {
      baseToken {
        symbol
        usdPrice
      }
      quoteToken {
        symbol
        usdPrice
      }
      baseReserve
      quoteReserve
      volumeUSD
      feeUSD
    }
  }
\`;

async function getDODOPairData(pairAddress: string) {
  const data = await request(DODO_SUBGRAPH, PAIR_QUERY, {
    pairAddress: pairAddress.toLowerCase()
  });
  
  return data.pair;
}

// Direct contract interaction
const provider = new ethers.providers.JsonRpcProvider('https://bsc-dataseed.binance.org/');

const DODO_PROXY_ABI = [
  'function dodoSwapV2TokenToToken(address fromToken, address toToken, uint256 fromTokenAmount, uint256 minReturnAmount, address[] memory dodoPairs, uint256 directions, bool isIncentive, uint256 deadLine) external returns (uint256 returnAmount)'
];

async function getDODOQuote(
  fromToken: string,
  toToken: string,
  amount: string,
  proxyAddress: string
) {
  // DODO uses a more complex routing system
  // You'll typically use their SDK or aggregator API for best results
  
  const proxy = new ethers.Contract(proxyAddress, DODO_PROXY_ABI, provider);
  
  // Note: This is simplified - actual implementation requires
  // querying available pairs and calculating optimal route
  
  console.log('Use DODO SDK or API for production-grade routing');
  
  return {
    fromToken,
    toToken,
    amount,
    note: 'Use DODO SDK for complex routing'
  };
}

// Using DODO API (if available)
async function getDODOPrice(baseToken: string, quoteToken: string) {
  // DODO may provide REST API endpoints
  // Check their documentation for current API endpoints
  
  const apiUrl = 'https://api.dodoex.io/'; // Check actual URL
  
  try {
    const response = await fetch(\`\${apiUrl}/route-service/...\`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching from DODO API:', error);
    throw error;
  }
}
    `,
  },
  
  subgraph: {
    provider: "The Graph",
    endpoints: {
      bsc: "https://api.thegraph.com/subgraphs/name/dodoex/dodoex-v2-bsc",
      ethereum: "https://api.thegraph.com/subgraphs/name/dodoex/dodoex-v2",
      polygon: "https://api.thegraph.com/subgraphs/name/dodoex/dodoex-v2-polygon",
    },
    documentation: "https://docs.dodoex.io/english/developers/subgraph-data",
  },
  
  socialMedia: {
    twitter: "https://twitter.com/BreederDodo",
    discord: "https://discord.gg/tyKReUK",
    telegram: "https://t.me/dodoex_official",
    medium: "https://medium.com/@DodoEx",
    github: "https://github.com/DODOEX",
  },
  
  chains: {
    bsc: {
      chainId: 56,
      primary: true,
    },
    ethereum: {
      chainId: 1,
    },
    polygon: {
      chainId: 137,
    },
    arbitrum: {
      chainId: 42161,
    },
    optimism: {
      chainId: 10,
    },
  },
  
  features: {
    swaps: true,
    liquidityProvision: true,
    pmmAlgorithm: true,
    crowdPooling: true,
    limitOrders: false,
    governance: true,
    nftSupport: false,
    multiChain: true,
    singleSidedLiquidity: true,
    capitalEfficient: true,
  },
  
  mechanism: {
    pmm: {
      name: "Proactive Market Maker",
      description: "Proprietary algorithm that actively adjusts prices and concentrates liquidity near market price",
      benefits: [
        "Better capital efficiency than traditional AMMs",
        "Lower slippage for traders",
        "Single-sided liquidity provision",
        "Reduced impermanent loss risk"
      ],
    },
    poolTypes: {
      dsp: "DODO Stable Pool (for pegged assets)",
      dpp: "DODO Private Pool (customizable parameters)",
      classical: "Classical pools with PMM algorithm",
    },
  },
  
  notes: [
    "Unique Proactive Market Maker (PMM) algorithm",
    "More capital efficient than constant product AMMs",
    "Single-sided liquidity provision available",
    "Multi-chain deployment (BSC, Ethereum, Polygon, Arbitrum, more)",
    "The Graph subgraphs available for data queries",
    "DODO token for governance and fee discounts",
    "Crowdpooling for fair token launches",
    "Custom liquidity pools with flexible parameters",
    "Better for professional market makers",
    "SDK available for complex integrations",
  ],
};

export default dodoDEX;
