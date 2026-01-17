// Curve Finance DEX Information
// Leading stablecoin-optimized DEX on Ethereum
// Source: Research compiled from Oct14.Research.Cryptocurrency.ETH.Ethereum

export const curveDEX = {
  name: "Curve Finance",
  blockchain: "Ethereum",
  type: "Stablecoin AMM",
  description: "Leading DEX optimized for stablecoin and similar asset swaps with extremely low slippage. Curve specializes in trading between similar assets (USDC, USDT, DAI) using specialized bonding curves.",
  
  urls: {
    main: "https://curve.fi/",
    app: "https://curve.fi/#/ethereum/swap",
    docs: "https://docs.curve.fi/",
    contracts: "https://github.com/curvefi/curve-contracts",
  },
  
  api: {
    endpoints: {
      subgraph: "https://api.thegraph.com/subgraphs/name/convex-community/curve-stablecoin",
      ethRpc: "https://eth-mainnet.alchemyapi.io/v2/YOUR_KEY",
    },
    documentation: "https://docs.curve.fi/",
    rateLimit: "Public RPC and subgraph available",
    requiresApiKey: false,
  },
  
  contracts: {
    mainnet: {
      chainId: 1,
      threepool: "0xbEbc44782C7dB0a1A60Cb6fe97d0b483032FF1C7", // 3CRV (USDC/USDT/DAI)
      registry: "0x90E00ACe148ca3b23Ac1bC8C240C2a7Dd9c2d7f5",
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
      documentation: "https://docs.curve.fi/",
    },
  },
  
  integration: {
    directPoolExample: `
import { ethers } from 'ethers';

const provider = new ethers.providers.JsonRpcProvider('https://eth-mainnet.alchemyapi.io/v2/YOUR_KEY');

// 3CRV pool (USDC, USDT, DAI)
const curvePoolAddress = '0xbEbc44782C7dB0a1A60Cb6fe97d0b483032FF1C7';
const curveABI = [
  'function get_dy(int128 i, int128 j, uint256 dx) view returns (uint256)',
  'function coins(uint256 i) view returns (address)'
];

const curvePool = new ethers.Contract(curvePoolAddress, curveABI, provider);

// Get output for 1 USDC -> USDT
const amountIn = ethers.utils.parseUnits('1', 6);
const amountOut = await curvePool.get_dy(0, 1, amountIn);

console.log('Curve USDC->USDT:', ethers.utils.formatUnits(amountOut, 6));
    `,
    
    subgraphExample: `
import { request, gql } from 'graphql-request';

const query = gql\`
  query GetPools {
    pools(first: 5, orderBy: virtualPrice, orderDirection: desc) {
      id
      name
      coins
      balances
      virtualPrice
    }
  }
\`;

const data = await request('https://api.thegraph.com/subgraphs/name/convex-community/curve-stablecoin', query);
console.log('Top Curve Pools:', data);
    `,
  },
  
  social: {
    twitter: "https://twitter.com/CurveFinance",
    telegram: "https://t.me/curvefi",
    discord: "https://discord.gg/rgrfS7W",
    github: "https://github.com/curvefi",
  },
  
  features: {
    hasApi: true,
    hasSdk: false,
    hasSubgraph: true,
    isActive: true,
    supportsCrossChain: true,
    hasLiquidityMining: true,
    isEvmCompatible: true,
    specializedForStablecoins: true,
    lowSlippage: true,
  },
  
  notes: [
    "Curve specializes in stablecoin trading with minimal slippage",
    "Best for USD-pegged token pairs (USDC, USDT, DAI, USDE)",
    "Highly capital efficient for similar assets",
    "Extensive multi-chain deployment",
  ],
};
