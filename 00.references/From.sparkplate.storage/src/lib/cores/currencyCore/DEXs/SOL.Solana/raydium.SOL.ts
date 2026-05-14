// Raydium DEX Information
// First AMM on Solana with OpenBook integration
// Source: Research compiled from Oct14.Research.Cryptocurrency.SOL.Solana

export const raydiumDEX = {
  name: "Raydium",
  blockchain: "Solana (SOL)",
  type: "AMM DEX",
  description: "The first and one of the largest automated market makers on Solana, providing liquidity to OpenBook's central limit order book. Raydium offers fast swaps, yield farming, and concentrated liquidity pools.",
  
  urls: {
    main: "https://raydium.io/",
    app: "https://raydium.io/swap/",
    docs: "https://docs.raydium.io/",
    v3Docs: "https://docs.raydium.io/raydium/concentrated-liquidity/",
    analytics: "https://raydium.io/pools/",
  },
  
  api: {
    endpoints: {
      info: "https://api.raydium.io/v2/main/info",
      pairs: "https://api.raydium.io/v2/main/pairs",
      pools: "https://api.raydium.io/v2/ammV3/ammPools",
      bitquery: "https://graphql.bitquery.io/ (Solana DEX API)",
    },
    documentation: "https://docs.raydium.io/",
    apiReference: "https://docs.bitquery.io/docs/blockchain/Solana/",
    rateLimit: "Public API available",
    requiresApiKey: false,
  },
  
  sdk: {
    typescript: {
      packages: [
        {
          name: "@raydium-io/raydium-sdk",
          package: "@raydium-io/raydium-sdk",
          description: "Official Raydium SDK for TypeScript",
          installCommand: "npm install @raydium-io/raydium-sdk",
        },
        {
          name: "@solana/web3.js",
          package: "@solana/web3.js",
          description: "Solana Web3.js for blockchain interaction",
          installCommand: "npm install @solana/web3.js",
        },
        {
          name: "axios",
          package: "axios",
          description: "HTTP client for API requests",
          installCommand: "npm install axios",
        },
      ],
      documentation: "https://docs.raydium.io/",
    },
  },
  
  integration: {
    apiExample: `
import axios from 'axios';

// Get Raydium pool info
async function getRaydiumPools() {
  const response = await axios.get('https://api.raydium.io/v2/main/pairs');
  
  console.log('Raydium Pools:', response.data);
  
  // Find SOL/USDC pool
  const solUsdcPool = response.data.find((pool: any) => 
    pool.name === 'SOL-USDC'
  );
  
  console.log('SOL/USDC Pool:', solUsdcPool);
  console.log('Price:', solUsdcPool.price);
  console.log('TVL:', solUsdcPool.liquidity);
  
  return response.data;
}

getRaydiumPools();
    `,
    
    sdkExample: `
import { Connection, PublicKey } from '@solana/web3.js';
import { Liquidity } from '@raydium-io/raydium-sdk';

// Initialize Solana connection
const connection = new Connection('https://api.mainnet-beta.solana.com');

// Get pool info using Raydium SDK
async function getPoolInfo(poolId: PublicKey) {
  const poolInfo = await Liquidity.fetchInfo({
    connection: connection,
    poolKeys: {
      id: poolId,
      // ... other pool keys
    }
  });
  
  console.log('Pool Info:', poolInfo);
  console.log('Token A Amount:', poolInfo.baseReserve.toString());
  console.log('Token B Amount:', poolInfo.quoteReserve.toString());
  
  return poolInfo;
}
    `,
    
    bitqueryExample: `
import axios from 'axios';

// Query Raydium trades via Bitquery
const query = \`
  query {
    Solana {
      DEXTrades(
        where: {
          Trade: {
            Dex: { ProtocolName: { is: "raydium" } }
            Currency: { MintAddress: { is: "So11111111111111111111111111111111111111112" } }
          }
        }
        limit: { count: 10 }
        orderBy: { descending: Block_Time }
      ) {
        Trade {
          Price
          Amount
          Currency {
            Symbol
          }
        }
        Block {
          Time
        }
      }
    }
  }
\`;

async function getRaydiumTrades() {
  const response = await axios.post(
    'https://graphql.bitquery.io/',
    { query },
    {
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': 'YOUR_API_KEY'
      }
    }
  );
  
  console.log('Raydium Trades:', response.data.data.Solana.DEXTrades);
  
  return response.data.data.Solana.DEXTrades;
}

getRaydiumTrades();
    `,
  },
  
  social: {
    twitter: "https://twitter.com/RaydiumProtocol",
    discord: "https://discord.gg/raydium",
    telegram: "https://t.me/raydiumio",
    github: "https://github.com/raydium-io",
    medium: "https://raydium.medium.com/",
  },
  
  features: {
    hasApi: true,
    hasSdk: true,
    hasSubgraph: false,
    hasGraphQL: true, // via Bitquery
    isActive: true,
    supportsCrossChain: false,
    hasLiquidityMining: true,
    isEvmCompatible: false,
    isSolanaVM: true,
    hasConcentratedLiquidity: true, // V3
    hasYieldFarming: true,
    integratesWithOpenBook: true,
    tvl: "$200+ million",
    volume24h: "$300+ million",
  },
  
  notes: [
    "Raydium is the first AMM on Solana",
    "Provides liquidity to OpenBook's central limit order book",
    "V3 features concentrated liquidity (like Uniswap V3)",
    "Offers yield farming and staking rewards",
    "RAY token for governance and fee discounts",
    "High-speed trades with low fees",
    "Integrated into most Solana wallets",
    "One of the highest TVL DEXs on Solana",
  ],
};
