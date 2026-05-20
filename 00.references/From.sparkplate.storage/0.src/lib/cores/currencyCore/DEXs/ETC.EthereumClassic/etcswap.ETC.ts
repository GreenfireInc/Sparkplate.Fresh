// ETCswap DEX Information
// Native decentralized exchange on Ethereum Classic
// Source: Research compiled from Oct14.Research.Cryptocurrency.ETC.EthereumClassic

export const etcswapDEX = {
  name: "ETCswap",
  blockchain: "Ethereum Classic",
  type: "AMM DEX",
  description: "Native decentralized exchange protocol on Ethereum Classic offering capital efficient markets with concentrated liquidity (V3), multiple fee tiers, and TWAP oracles.",
  
  urls: {
    main: "https://etcswap.org/",
    app: "https://etcswap.org/swap",
    docs: "https://docs.etcswap.org/",
    apiDocs: "https://docs.etcswap.org/contracts/launchpad/reference/API/overview",
    interfaceIntegration: "https://docs.etcswap.org/contracts/launchpad/guides/interface-integration/using-the-api",
  },
  
  api: {
    endpoints: {
      v2Subgraph: "https://api.etcswap.org/subgraphs/name/etcswap/exchange-v2",
      v3Subgraph: "https://api.etcswap.org/subgraphs/name/etcswap/exchange-v3",
      etcRpc: "https://etc.rivet.link",
      alternateRpc: "https://www.ethercluster.com/etc",
    },
    documentation: "https://docs.etcswap.org/contracts/launchpad/reference/API/overview",
    apiReference: "https://docs.etcswap.org/contracts/launchpad/guides/interface-integration/using-the-api",
    rateLimit: "Public endpoints available",
    requiresApiKey: false,
  },
  
  contracts: {
    mainnet: {
      chainId: 61,
      routerV2: "Check ETCswap documentation for current addresses",
      factoryV2: "Check ETCswap documentation for current addresses",
      routerV3: "Check ETCswap documentation for V3 addresses",
      factoryV3: "Check ETCswap documentation for V3 addresses",
    },
  },
  
  sdk: {
    typescript: {
      packages: [
        {
          name: "@_etcswap/v2-sdk",
          package: "@_etcswap/v2-sdk",
          description: "Official ETCswap V2 SDK for programmatic integration",
          installCommand: "npm install @_etcswap/v2-sdk",
          npmUrl: "https://www.npmjs.com/package/@_etcswap/v2-sdk",
        },
        {
          name: "@_etcswap/universal-router-sdk",
          package: "@_etcswap/universal-router-sdk",
          description: "SDK for interacting with ETCswap universal router contracts",
          installCommand: "npm install @_etcswap/universal-router-sdk",
          npmUrl: "https://www.npmjs.com/package/@_etcswap/universal-router-sdk",
        },
        {
          name: "ethers.js",
          package: "ethers",
          description: "Ethereum library for smart contract interaction",
          installCommand: "npm install ethers",
        },
      ],
      documentation: "https://docs.etcswap.org/",
    },
  },
  
  integration: {
    subgraphExample: `
import { request, gql } from 'graphql-request';

const ETC_GRAPH_URL = 'https://api.etcswap.org/subgraphs/name/etcswap/exchange-v2';

const poolQuery = gql\`
  query GetPool($poolId: ID!) {
    pair(id: $poolId) {
      token0 {
        id
        symbol
        decimals
      }
      token1 {
        id
        symbol
        decimals
      }
      reserve0
      reserve1
      totalSupply
      volumeUSD
    }
  }
\`;

async function getPoolPrice(pairId: string): Promise<number> {
  const client = new GraphQLClient(ETC_GRAPH_URL);
  const resp = await client.request(poolQuery, { poolId: pairId });
  const pair = resp.pair;
  
  if (!pair) throw new Error('Pair not found in subgraph');
  
  const dec0 = parseInt(pair.token0.decimals, 10);
  const dec1 = parseInt(pair.token1.decimals, 10);
  const r0 = parseFloat(pair.reserve0) / 10 ** dec0;
  const r1 = parseFloat(pair.reserve1) / 10 ** dec1;
  
  // Price of token0 in token1 units
  return r1 / r0;
}
    `,
    
    sdkExample: `
import { ethers } from 'ethers';
import { Token, Pool, pairAddress } from '@_etcswap/v2-sdk';

const provider = new ethers.providers.JsonRpcProvider('https://etc.rivet.link');

async function getPriceWithSdk(
  token0Address: string,
  token1Address: string
): Promise<number> {
  const chainId = 61; // Ethereum Classic
  
  // Create Token objects
  const token0 = new Token(chainId, token0Address, 18, 'TOKEN0');
  const token1 = new Token(chainId, token1Address, 18, 'TOKEN1');
  
  // Get pair address
  const poolAddr = pairAddress(token0, token1);
  
  // Fetch pool data
  const pool = await Pool.fromContract(poolAddr, provider);
  
  const [r0, r1] = [pool.reserve0, pool.reserve1];
  const price = parseFloat(r1.toString()) / parseFloat(r0.toString());
  
  return price;
}
    `,
    
    twapOracleExample: `
import { ethers } from 'ethers';

// ETCswap supports TWAP oracles for price feeds
const provider = new ethers.providers.JsonRpcProvider('https://etc.rivet.link');

const oracleAbi = [
  'function getPrice(address token) view returns (uint256)',
  'function getTwapPrice(address token, uint32 period) view returns (uint256)'
];

async function getTwapPrice(
  oracleAddress: string,
  tokenAddress: string,
  period: number = 3600 // 1 hour
): Promise<number> {
  const oracle = new ethers.Contract(oracleAddress, oracleAbi, provider);
  
  // Get TWAP price over specified period
  const twapPrice = await oracle.getTwapPrice(tokenAddress, period);
  
  console.log(\`TWAP Price (\${period}s): \${ethers.utils.formatUnits(twapPrice, 18)}\`);
  
  return parseFloat(ethers.utils.formatUnits(twapPrice, 18));
}
    `,
  },
  
  social: {
    twitter: "https://twitter.com/etcswap",
    telegram: "https://t.me/etcswap",
    github: "https://github.com/etcswap",
  },
  
  features: {
    hasApi: true,
    hasSdk: true,
    hasSubgraph: true,
    isActive: true,
    supportsCrossChain: false,
    hasLiquidityMining: true,
    isEvmCompatible: true,
    hasTwapOracles: true,
    hasConcentratedLiquidity: true, // V3 feature
    hasMultipleVersions: true, // V2 and V3
  },
  
  notes: [
    "ETCswap is the primary native DEX on Ethereum Classic",
    "Supports both V2 (traditional AMM) and V3 (concentrated liquidity)",
    "Provides TWAP oracles for reliable price feeds over time",
    "Full EVM compatibility with Uniswap-style architecture",
    "Limited DeFi ecosystem compared to Ethereum, but active development",
  ],
};
