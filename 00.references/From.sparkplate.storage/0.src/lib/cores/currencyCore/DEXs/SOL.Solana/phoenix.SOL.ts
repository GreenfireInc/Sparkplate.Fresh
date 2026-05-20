// Phoenix DEX Information
// Central limit order book DEX on Solana
// Source: Research compiled from Oct14.Research.Cryptocurrency.SOL.Solana

export const phoenixDEX = {
  name: "Phoenix",
  blockchain: "Solana (SOL)",
  type: "CLOB DEX (Central Limit Order Book)",
  description: "A fully on-chain central limit order book (CLOB) DEX built on Solana. Phoenix provides traditional orderbook trading with the speed and efficiency of Solana, offering limit orders and advanced trading features.",
  
  urls: {
    main: "https://phoenix.trade/",
    app: "https://app.phoenix.trade/",
    docs: "https://docs.phoenix.trade/",
    analytics: "https://app.phoenix.trade/markets",
  },
  
  api: {
    endpoints: {
      markets: "Solana on-chain program queries",
      orderbook: "Phoenix program account queries",
      trades: "Phoenix transaction parsing",
    },
    documentation: "https://docs.phoenix.trade/",
    apiReference: "https://docs.phoenix.trade/developers/sdk",
    rateLimit: "On-chain queries via Solana RPC",
    requiresApiKey: false,
  },
  
  sdk: {
    typescript: {
      packages: [
        {
          name: "@ellipsis-labs/phoenix-sdk",
          package: "@ellipsis-labs/phoenix-sdk",
          description: "Phoenix SDK for TypeScript",
          installCommand: "npm install @ellipsis-labs/phoenix-sdk",
        },
        {
          name: "@solana/web3.js",
          package: "@solana/web3.js",
          description: "Solana Web3.js for blockchain interaction",
          installCommand: "npm install @solana/web3.js",
        },
      ],
      documentation: "https://docs.phoenix.trade/",
    },
  },
  
  integration: {
    sdkExample: `
import { PhoenixClient } from '@ellipsis-labs/phoenix-sdk';
import { Connection, PublicKey } from '@solana/web3.js';

// Initialize Phoenix client
const connection = new Connection('https://api.mainnet-beta.solana.com');
const client = await PhoenixClient.create(connection);

// Get market info
async function getPhoenixMarket(marketAddress: PublicKey) {
  const market = client.markets.get(marketAddress);
  
  console.log('Market:', market);
  console.log('Base Token:', market.baseToken);
  console.log('Quote Token:', market.quoteToken);
  
  return market;
}

// Get orderbook
async function getOrderbook(marketAddress: PublicKey) {
  const orderbook = await client.getOrderbook(marketAddress);
  
  console.log('Bids:', orderbook.bids);
  console.log('Asks:', orderbook.asks);
  
  return orderbook;
}
    `,
    
    placeOrderExample: `
import { PhoenixClient } from '@ellipsis-labs/phoenix-sdk';

// Place limit order on Phoenix
async function placeLimitOrder(
  client: PhoenixClient,
  marketAddress: PublicKey,
  side: 'Buy' | 'Sell',
  price: number,
  size: number
) {
  const order = await client.placeLimitOrder({
    market: marketAddress,
    side: side,
    price: price,
    size: size,
  });
  
  console.log('Order placed:', order);
  
  return order;
}
    `,
  },
  
  social: {
    twitter: "https://twitter.com/PhoenixTrade",
    discord: "https://discord.gg/phoenix",
    github: "https://github.com/Ellipsis-Labs/phoenix-v1",
  },
  
  features: {
    hasApi: true,
    hasSdk: true,
    hasSubgraph: false,
    hasGraphQL: false,
    isActive: true,
    supportsCrossChain: false,
    hasLiquidityMining: false,
    isEvmCompatible: false,
    isSolanaVM: true,
    isOrderbook: true,
    hasLimitOrders: true,
    hasMarketOrders: true,
    isFullyOnChain: true,
    tvl: "$10+ million",
    volume24h: "$50+ million",
  },
  
  notes: [
    "Phoenix is a fully on-chain central limit order book",
    "Built by Ellipsis Labs",
    "Provides traditional orderbook trading on Solana",
    "Limit and market orders supported",
    "High-speed matching engine",
    "No AMM slippage - orderbook pricing",
    "Ideal for advanced traders",
    "Open-source and audited",
  ],
};
