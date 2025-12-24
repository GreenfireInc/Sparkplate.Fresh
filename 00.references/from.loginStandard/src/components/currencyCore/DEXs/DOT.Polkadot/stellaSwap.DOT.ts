// StellaSwap DEX Information
// Leading DEX on Moonbeam parachain
// Source: Research compiled from Oct14.Research.Cryptocurrency.DOT.Polkadot

export const stellaSwapDEX = {
  name: "StellaSwap",
  blockchain: "Moonbeam (Polkadot)",
  type: "AMM DEX",
  description: "Leading DEX on Moonbeam parachain with deep liquidity. StellaSwap is the leading DEX on Moonbeam (Polkadot's EVM parachain) offering swaps, liquidity provision, and yield farming with native cross-chain support.",
  
  urls: {
    main: "https://stellaswap.com/",
    app: "https://stellaswap.com/exchange/swap",
    docs: "https://docs.stellaswap.com/",
    developerDocs: "https://docs.stellaswap.com/developers/swap-sdk",
    apiReference: "https://docs.stellaswap.com/developers/api-reference",
  },
  
  api: {
    endpoints: {
      subgraph: "https://api.subquery.network/sq/stellaswap/stellaswap-squid",
      moonbeamRpc: "https://rpc.api.moonbeam.network",
      baseUrl: "https://api.stellaswap.com",
    },
    documentation: "https://docs.stellaswap.com/developers/api-reference",
    sdkDocs: "https://docs.stellaswap.com/developers/swap-sdk",
    rateLimit: "Public endpoints available",
    requiresApiKey: false,
  },
  
  contracts: {
    moonbeam: {
      router: "Check StellaSwap docs for current addresses",
      factory: "Check StellaSwap docs for current addresses",
      permit2: "Check StellaSwap docs for current addresses",
    },
  },
  
  tokens: {
    GLMR: {
      symbol: "GLMR",
      name: "Moonbeam",
      isNative: true,
      decimals: 18,
    },
    xcDOT: {
      address: "0xFfFFfFff1FcaCBd218EDc0EbA20Fc2308C778080",
      symbol: "xcDOT",
      name: "Cross-chain DOT",
      decimals: 10,
    },
    USDC: {
      address: "0x931715FEE2d06333043d11F658C8CE934aC61D0c",
      symbol: "USDC",
      decimals: 6,
    },
    xcUSDT: {
      address: "0xFFFFFFfFea09FB06d082fd1275CD48b191cbCD1d",
      symbol: "xcUSDT",
      decimals: 6,
    },
  },
  
  sdk: {
    typescript: {
      packages: [
        {
          name: "@stellaswap/swap-sdk",
          package: "@stellaswap/swap-sdk",
          description: "Official StellaSwap SDK for EVM integration",
          installCommand: "npm install @stellaswap/swap-sdk ethers @uniswap/permit2-sdk",
          github: "https://github.com/stellaswap",
        },
        {
          name: "ethers.js",
          package: "ethers",
          description: "Ethereum library for smart contract interaction",
          installCommand: "npm install ethers",
        },
      ],
      documentation: "https://docs.stellaswap.com/developers/swap-sdk",
    },
  },
  
  integration: {
    sdkExample: `
import stellaSwap from '@stellaswap/swap-sdk';
import { ethers } from 'ethers';

// Setup provider for Moonbeam
const MOONBEAM_RPC = 'https://rpc.api.moonbeam.network';
const provider = new ethers.providers.JsonRpcProvider(MOONBEAM_RPC);

// Get price quote
async function getQuote() {
  const quote = await stellaSwap.getQuote(
    '0xFfFFfFff1FcaCBd218EDc0EbA20Fc2308C778080', // xcDOT
    '0x931715FEE2d06333043d11F658C8CE934aC61D0c', // USDC
    '1000000000000', // 1 DOT (18 decimals)
    null,          // account (null for quote only)
    0.5            // slippage 0.5%
  );

  return {
    amountOut: quote.result.amountOut,
    path: quote.result.path,
    priceImpact: quote.result.priceImpact
  };
}
    `,
    
    subgraphExample: `
import { request, gql } from 'graphql-request';

const query = gql\`
  query GetStellaSwapData {
    swaps(orderBy: TIMESTAMP_DESC, first: 10) {
      amount0In
      amount1Out
      pair {
        token0 { symbol }
        token1 { symbol }
      }
      timestamp
    }
  }
\`;

const data = await request('https://api.subquery.network/sq/stellaswap/stellaswap-squid', query);
console.log('Recent Swaps:', data);
    `,
  },
  
  social: {
    twitter: "https://twitter.com/StellaSwap",
    telegram: "https://t.me/StellaSwap",
    discord: "https://discord.gg/stellaswap",
    github: "https://github.com/stellaswap",
  },
  
  features: {
    hasApi: true,
    hasSdk: true,
    hasSubgraph: true,
    isActive: true,
    supportsCrossChain: true,
    hasLiquidityMining: true,
    isEvmCompatible: true,
  },
  
  notes: [
    "StellaSwap runs on Moonbeam, an EVM-compatible Polkadot parachain",
    "Supports cross-chain assets via XCM (xcDOT, xcUSDT, etc.)",
    "Full EVM compatibility allows using standard Ethereum tools",
    "Deep liquidity for DOT and other Polkadot ecosystem assets",
  ],
};
