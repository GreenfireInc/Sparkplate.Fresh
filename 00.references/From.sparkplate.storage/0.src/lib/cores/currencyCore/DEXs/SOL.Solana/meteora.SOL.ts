// Meteora DEX Information
// Advanced liquidity protocol with dynamic pools
// Source: Research compiled from Oct14.Research.Cryptocurrency.SOL.Solana

export const meteoraDEX = {
  name: "Meteora",
  blockchain: "Solana (SOL)",
  type: "Dynamic Liquidity Protocol",
  description: "Advanced liquidity protocol on Solana featuring dynamic pools, liquidity vaults, and innovative market-making strategies. Meteora provides capital-efficient liquidity solutions with dynamic fees and automated strategies.",
  
  urls: {
    main: "https://app.meteora.ag/",
    pools: "https://app.meteora.ag/pools",
    dlmm: "https://app.meteora.ag/dlmm",
    docs: "https://docs.meteora.ag/",
  },
  
  api: {
    endpoints: {
      pools: "https://app.meteora.ag/api/pools",
      dlmm: "Solana on-chain program queries",
      vaults: "https://app.meteora.ag/api/vaults",
    },
    documentation: "https://docs.meteora.ag/",
    apiReference: "https://docs.meteora.ag/developers/sdk",
    rateLimit: "Public API available",
    requiresApiKey: false,
  },
  
  sdk: {
    typescript: {
      packages: [
        {
          name: "@meteora-ag/dlmm",
          package: "@meteora-ag/dlmm",
          description: "Meteora Dynamic Liquidity Market Maker SDK",
          installCommand: "npm install @meteora-ag/dlmm",
        },
        {
          name: "@solana/web3.js",
          package: "@solana/web3.js",
          description: "Solana Web3.js for blockchain interaction",
          installCommand: "npm install @solana/web3.js",
        },
      ],
      documentation: "https://docs.meteora.ag/",
    },
  },
  
  integration: {
    poolExample: `
import axios from 'axios';

// Get Meteora pools
async function getMeteoraPool() {
  const response = await axios.get('https://app.meteora.ag/api/pools');
  
  console.log('Meteora Pools:', response.data);
  
  return response.data;
}

getMeteoraPool();
    `,
    
    dlmmExample: `
import { DLMM } from '@meteora-ag/dlmm';
import { Connection, PublicKey } from '@solana/web3.js';

// Initialize DLMM
const connection = new Connection('https://api.mainnet-beta.solana.com');

// Get DLMM pool info
async function getDLMMPool(poolAddress: PublicKey) {
  const dlmmPool = await DLMM.create(connection, poolAddress);
  
  const binArrays = await dlmmPool.getBinArrays();
  const activeBin = await dlmmPool.getActiveBin();
  
  console.log('DLMM Pool:', dlmmPool);
  console.log('Active Bin:', activeBin);
  console.log('Bin Arrays:', binArrays);
  
  return dlmmPool;
}
    `,
  },
  
  social: {
    twitter: "https://twitter.com/MeteoraAG",
    discord: "https://discord.gg/meteora",
    telegram: "https://t.me/meteoraag",
    github: "https://github.com/MeteoraAg",
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
    hasDynamicPools: true,
    hasDLMM: true, // Dynamic Liquidity Market Maker
    hasVaults: true,
    hasDynamicFees: true,
    tvl: "$150+ million",
    volume24h: "$100+ million",
  },
  
  notes: [
    "Meteora features dynamic liquidity market makers (DLMM)",
    "Advanced capital efficiency with dynamic bins",
    "Automated liquidity strategies via vaults",
    "Dynamic fee structures based on market conditions",
    "MET token for governance",
    "Innovative approach to concentrated liquidity",
    "High APYs through optimized strategies",
    "Growing rapidly on Solana",
  ],
};
