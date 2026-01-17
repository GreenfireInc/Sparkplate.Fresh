// Drift Protocol DEX Information
// Decentralized perpetuals and spot exchange
// Source: Research compiled from Oct14.Research.Cryptocurrency.SOL.Solana

export const driftDEX = {
  name: "Drift Protocol",
  blockchain: "Solana (SOL)",
  type: "Perpetuals & Spot DEX",
  description: "A decentralized exchange on Solana offering both perpetual futures and spot trading. Drift features an on-chain orderbook, cross-margining, and up to 20x leverage on perpetuals with a focus on capital efficiency and low fees.",
  
  urls: {
    main: "https://www.drift.trade/",
    app: "https://app.drift.trade/",
    perps: "https://app.drift.trade/trade",
    spot: "https://app.drift.trade/spot",
    docs: "https://docs.drift.trade/",
  },
  
  api: {
    endpoints: {
      markets: "https://dlob.drift.trade/markets",
      trades: "https://dlob.drift.trade/trades",
      stats: "https://dlob.drift.trade/stats",
      orderbook: "https://dlob.drift.trade/orderbook",
    },
    documentation: "https://docs.drift.trade/",
    apiReference: "https://docs.drift.trade/api-documentation",
    rateLimit: "Public API available",
    requiresApiKey: false,
  },
  
  sdk: {
    typescript: {
      packages: [
        {
          name: "@drift-labs/sdk",
          package: "@drift-labs/sdk",
          description: "Drift Protocol SDK for TypeScript",
          installCommand: "npm install @drift-labs/sdk",
        },
        {
          name: "@solana/web3.js",
          package: "@solana/web3.js",
          description: "Solana Web3.js for blockchain interaction",
          installCommand: "npm install @solana/web3.js",
        },
      ],
      documentation: "https://docs.drift.trade/",
    },
  },
  
  integration: {
    apiExample: `
import axios from 'axios';

// Get Drift markets
async function getDriftMarkets() {
  const response = await axios.get('https://dlob.drift.trade/markets');
  
  console.log('Drift Markets:', response.data);
  
  return response.data;
}

// Get orderbook
async function getDriftOrderbook(marketIndex: number) {
  const response = await axios.get(
    \`https://dlob.drift.trade/orderbook?marketIndex=\${marketIndex}&marketType=perp\`
  );
  
  console.log('Orderbook:', response.data);
  console.log('Bids:', response.data.bids);
  console.log('Asks:', response.data.asks);
  
  return response.data;
}

getDriftMarkets();
getDriftOrderbook(0); // SOL-PERP
    `,
    
    sdkExample: `
import { DriftClient, User, initialize } from '@drift-labs/sdk';
import { Connection, PublicKey } from '@solana/web3.js';

// Initialize Drift client
const connection = new Connection('https://api.mainnet-beta.solana.com');
const wallet = // ... your wallet

const driftClient = new DriftClient({
  connection: connection,
  wallet: wallet,
  env: 'mainnet-beta',
});

await driftClient.subscribe();

// Get market info
async function getMarketInfo(marketIndex: number) {
  const market = driftClient.getPerpMarketAccount(marketIndex);
  
  console.log('Market:', market);
  console.log('Oracle Price:', market.amm.historicalOracleData.lastOraclePriceTwap);
  console.log('Funding Rate:', market.amm.lastFundingRate);
  
  return market;
}

getMarketInfo(0); // SOL-PERP
    `,
  },
  
  social: {
    twitter: "https://twitter.com/DriftProtocol",
    discord: "https://discord.gg/drift",
    telegram: "https://t.me/driftprotocol",
    github: "https://github.com/drift-labs",
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
    hasPerpetuals: true,
    hasSpotTrading: true,
    hasLeverage: true, // Up to 20x
    hasCrossMargin: true,
    hasOrderbook: true,
    tvl: "$100+ million",
    volume24h: "$200+ million",
  },
  
  notes: [
    "Drift offers both perpetuals and spot trading",
    "Up to 20x leverage on perpetual futures",
    "Cross-margining across all positions",
    "On-chain orderbook with off-chain matching",
    "Oracle-based pricing via Pyth Network",
    "DRIFT token for governance and staking",
    "One of the largest perps DEXs on Solana",
    "Low fees and high capital efficiency",
  ],
};
