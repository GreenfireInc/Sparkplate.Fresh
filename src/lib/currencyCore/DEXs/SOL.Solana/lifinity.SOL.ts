// Lifinity DEX Information
// Proactive market maker with oracle-based pricing
// Source: Research compiled from Oct14.Research.Cryptocurrency.SOL.Solana

export const lifinityDEX = {
  name: "Lifinity",
  blockchain: "Solana (SOL)",
  type: "Proactive Market Maker (PMM)",
  description: "A proactive market maker DEX on Solana with concentrated liquidity and oracle-based pricing. Lifinity uses a unique PMM model that actively rebalances liquidity to reduce impermanent loss and improve capital efficiency.",
  
  urls: {
    main: "https://lifinity.io/",
    app: "https://lifinity.io/swap",
    pools: "https://lifinity.io/pools",
    docs: "https://docs.lifinity.io/",
  },
  
  api: {
    endpoints: {
      solanaRpc: "Solana RPC for on-chain queries",
      oracleFeeds: "Pyth/Switchboard oracle integration",
    },
    documentation: "https://docs.lifinity.io/",
    apiReference: "https://docs.lifinity.io/developers",
    rateLimit: "On-chain queries via Solana RPC",
    requiresApiKey: false,
  },
  
  sdk: {
    typescript: {
      packages: [
        {
          name: "@solana/web3.js",
          package: "@solana/web3.js",
          description: "Solana Web3.js for blockchain interaction",
          installCommand: "npm install @solana/web3.js",
        },
        {
          name: "@pythnetwork/client",
          package: "@pythnetwork/client",
          description: "Pyth oracle client for price feeds",
          installCommand: "npm install @pythnetwork/client",
        },
      ],
      documentation: "https://docs.lifinity.io/",
    },
  },
  
  integration: {
    example: `
import { Connection, PublicKey } from '@solana/web3.js';

// Initialize Solana connection
const connection = new Connection('https://api.mainnet-beta.solana.com');

// Query Lifinity pool (requires program account parsing)
async function getLifinityPool(poolAddress: PublicKey) {
  const accountInfo = await connection.getAccountInfo(poolAddress);
  
  // Parse pool data (specific to Lifinity program layout)
  console.log('Pool Account:', accountInfo);
  
  return accountInfo;
}
    `,
  },
  
  social: {
    twitter: "https://twitter.com/Lifinity_io",
    discord: "https://discord.gg/lifinity",
    telegram: "https://t.me/lifinity",
    medium: "https://lifinity.medium.com/",
  },
  
  features: {
    hasApi: false,
    hasSdk: false,
    hasSubgraph: false,
    hasGraphQL: false,
    isActive: true,
    supportsCrossChain: false,
    hasLiquidityMining: false,
    isEvmCompatible: false,
    isSolanaVM: true,
    isPMM: true, // Proactive Market Maker
    hasOraclePricing: true,
    hasConcentratedLiquidity: true,
    reducesImpermanentLoss: true,
    tvl: "$30+ million",
    volume24h: "$20+ million",
  },
  
  notes: [
    "Lifinity uses a proactive market maker model",
    "Oracle-based pricing reduces impermanent loss",
    "Concentrated liquidity for capital efficiency",
    "Protocol-owned liquidity (POL) model",
    "LFNTY token with revenue sharing",
    "Automated rebalancing strategies",
    "Lower slippage through oracle pricing",
    "Unique approach compared to traditional AMMs",
  ],
};
