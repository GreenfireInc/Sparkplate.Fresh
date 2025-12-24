// Orca DEX Information
// User-friendly DEX with concentrated liquidity (Whirlpools)
// Source: Research compiled from Oct14.Research.Cryptocurrency.SOL.Solana

export const orcaDEX = {
  name: "Orca",
  blockchain: "Solana (SOL)",
  type: "AMM DEX",
  description: "User-friendly decentralized exchange on Solana with concentrated liquidity pools (Whirlpools). Orca focuses on providing the best UX in DeFi with fair launch principles and community-first approach.",
  
  urls: {
    main: "https://www.orca.so/",
    app: "https://www.orca.so/",
    docs: "https://docs.orca.so/",
    whirlpools: "https://www.orca.so/pools",
    analytics: "https://www.orca.so/",
  },
  
  api: {
    endpoints: {
      pools: "https://api.mainnet.orca.so/v1/pool",
      whirlpool: "https://api.mainnet.orca.so/v1/whirlpool",
      token: "https://api.mainnet.orca.so/v1/token",
    },
    documentation: "https://docs.orca.so/",
    apiReference: "https://docs.orca.so/developer/api",
    rateLimit: "Public API available",
    requiresApiKey: false,
  },
  
  sdk: {
    typescript: {
      packages: [
        {
          name: "@orca-so/whirlpools-sdk",
          package: "@orca-so/whirlpools-sdk",
          description: "Orca Whirlpools SDK for concentrated liquidity",
          installCommand: "npm install @orca-so/whirlpools-sdk",
        },
        {
          name: "@orca-so/sdk",
          package: "@orca-so/sdk",
          description: "Orca SDK for TypeScript",
          installCommand: "npm install @orca-so/sdk",
        },
        {
          name: "@solana/web3.js",
          package: "@solana/web3.js",
          description: "Solana Web3.js for blockchain interaction",
          installCommand: "npm install @solana/web3.js",
        },
      ],
      documentation: "https://docs.orca.so/",
    },
  },
  
  integration: {
    poolExample: `
import axios from 'axios';

// Get Orca pool info
async function getOrcaPool(tokenA: string, tokenB: string) {
  const response = await axios.get(
    'https://api.mainnet.orca.so/v1/pool',
    {
      params: {
        tokenA: tokenA,
        tokenB: tokenB
      }
    }
  );
  
  console.log('Orca Pool:', response.data);
  console.log('Liquidity:', response.data.liquidity);
  console.log('Volume 24h:', response.data.volume24h);
  
  return response.data;
}

const SOL = 'So11111111111111111111111111111111111111112';
const USDC = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v';
getOrcaPool(SOL, USDC);
    `,
    
    whirlpoolExample: `
import { WhirlpoolContext, buildWhirlpoolClient } from '@orca-so/whirlpools-sdk';
import { Connection } from '@solana/web3.js';

// Initialize Whirlpool client
const connection = new Connection('https://api.mainnet-beta.solana.com');
const ctx = WhirlpoolContext.from(connection, wallet, programId);
const client = buildWhirlpoolClient(ctx);

// Get whirlpool info
async function getWhirlpoolInfo(whirlpoolAddress: PublicKey) {
  const whirlpool = await client.getPool(whirlpoolAddress);
  const data = whirlpool.getData();
  
  console.log('Whirlpool Data:', data);
  console.log('Token A:', data.tokenMintA.toString());
  console.log('Token B:', data.tokenMintB.toString());
  console.log('Liquidity:', data.liquidity.toString());
  
  return data;
}
    `,
  },
  
  social: {
    twitter: "https://twitter.com/orca_so",
    discord: "https://discord.gg/orca",
    github: "https://github.com/orca-so",
    medium: "https://orca-so.medium.com/",
  },
  
  features: {
    hasApi: true,
    hasSdk: true,
    hasSubgraph: false,
    hasGraphQL: false,
    isActive: true,
    supportsCrossChain: false,
    hasLiquidityMining: true,
    isEvmCompatible: false,
    isSolanaVM: true,
    hasConcentratedLiquidity: true, // Whirlpools
    hasUserFriendlyUI: true,
    hasFairLaunch: true,
    tvl: "$100+ million",
    volume24h: "$150+ million",
  },
  
  notes: [
    "Orca is known for best-in-class UX on Solana",
    "Whirlpools feature concentrated liquidity",
    "Fair launch model with community focus",
    "ORCA token for governance",
    "Climate-friendly (carbon neutral)",
    "High capital efficiency with Whirlpools",
    "Integrated into major Solana wallets",
    "Strong community and developer support",
  ],
};
