// StellarX - Native DEX UI for Stellar
// Type: Native DEX Interface
// Blockchain: Stellar (XLM)

export const stellarXDEX = {
  name: "StellarX",
  blockchain: "Stellar (XLM)",
  type: "Native DEX Interface",
  description: "Advanced trading interface built on Stellar's native decentralized exchange with orderbook, AMM, and cross-asset trading",
  
  url: "https://www.stellarx.com/",
  app: "https://www.stellarx.com/markets",
  docs: "https://support.stellarx.com/",
  
  api: {
    horizonEndpoint: "https://horizon.stellar.org",
    rpcEndpoint: "https://rpc.stellar.org",
    websocket: "wss://horizon.stellar.org",
    documentation: "https://developers.stellar.org/api/",
    rateLimit: "Public Horizon: 3600 requests/hour",
    authentication: "None required for public data",
  },
  
  sdk: {
    npm: "@stellar/stellar-sdk",
    installation: "npm install @stellar/stellar-sdk",
    documentation: "https://stellar.github.io/js-stellar-sdk/",
    features: [
      "Order book queries",
      "Trade history",
      "Path payments",
      "Limit orders",
      "Market orders",
    ],
  },
  
  integration: {
    example: `
// StellarX Integration Example (Uses Stellar Native DEX)
import * as StellarSDK from '@stellar/stellar-sdk';

const server = new StellarSDK.Horizon.Server('https://horizon.stellar.org');

// Get order book for a trading pair
async function getOrderBook(
  sellingAsset: StellarSDK.Asset,
  buyingAsset: StellarSDK.Asset,
  limit: number = 20
) {
  const orderBook = await server
    .orderbook(sellingAsset, buyingAsset)
    .limit(limit)
    .call();
  
  console.log('Order Book:', orderBook);
  return orderBook;
}

// Get current price from order book
async function getCurrentPrice(
  sellingAsset: StellarSDK.Asset,
  buyingAsset: StellarSDK.Asset
) {
  const orderBook = await getOrderBook(sellingAsset, buyingAsset, 1);
  
  const bids = orderBook.bids || [];
  const asks = orderBook.asks || [];
  
  const bid = bids.length > 0 ? Number(bids[0].price) : 0;
  const ask = asks.length > 0 ? Number(asks[0].price) : 0;
  const mid = bid && ask ? (bid + ask) / 2 : bid || ask || 0;
  
  console.log(\`Bid: \${bid}, Ask: \${ask}, Mid: \${mid}\`);
  return { bid, ask, mid };
}

// Get recent trades
async function getRecentTrades(
  sellingAsset: StellarSDK.Asset,
  buyingAsset: StellarSDK.Asset,
  limit: number = 100
) {
  const trades = await server
    .trades()
    .forAssetPair(sellingAsset, buyingAsset)
    .order('desc')
    .limit(limit)
    .call();
  
  console.log(\`Found \${trades.records.length} recent trades\`);
  return trades.records;
}

// Place a limit order (requires signing)
async function placeLimitOrder(
  keypair: StellarSDK.Keypair,
  sellingAsset: StellarSDK.Asset,
  buyingAsset: StellarSDK.Asset,
  amount: string,
  price: string
) {
  const account = await server.loadAccount(keypair.publicKey());
  
  const transaction = new StellarSDK.TransactionBuilder(account, {
    fee: StellarSDK.BASE_FEE,
    networkPassphrase: StellarSDK.Networks.PUBLIC
  })
    .addOperation(
      StellarSDK.Operation.manageSellOffer({
        selling: sellingAsset,
        buying: buyingAsset,
        amount,
        price
      })
    )
    .setTimeout(StellarSDK.TimeoutInfinite)
    .build();
  
  transaction.sign(keypair);
  
  const result = await server.submitTransaction(transaction);
  console.log('Order placed:', result.hash);
  return result.hash;
}

// Calculate average price from recent trades
async function getAveragePrice(
  sellingAsset: StellarSDK.Asset,
  buyingAsset: StellarSDK.Asset,
  limit: number = 50
) {
  const trades = await getRecentTrades(sellingAsset, buyingAsset, limit);
  
  if (trades.length === 0) {
    throw new Error('No trades available');
  }
  
  const avgPrice = trades.reduce((sum, trade) => sum + Number(trade.price), 0) / trades.length;
  console.log(\`Average price: \${avgPrice}\`);
  return avgPrice;
}

// Usage example
const XLM = StellarSDK.Asset.native();
const USDC = new StellarSDK.Asset(
  'USDC',
  'GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN'
);

getCurrentPrice(XLM, USDC)
  .then(price => console.log('XLM/USDC Price:', price));
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/stellarxhq",
    telegram: "https://t.me/stellarx",
    medium: "https://medium.com/stellarx",
    reddit: "https://www.reddit.com/r/Stellar/",
  },
  
  features: {
    orderbook: true,
    amm: false, // Uses native Stellar orderbook
    limit_orders: true,
    market_orders: true,
    path_payments: true,
    multi_currency: true,
    fiat_onramp: true,
    mobile_app: false,
    advanced_charts: true,
  },
  
  fees: {
    trading: "Network fee only: 0.00001 XLM per operation",
    withdrawal: "Network fee: 0.00001 XLM",
    deposit: "Free",
  },
  
  notes: [
    "Built on Stellar's native DEX (no external smart contracts)",
    "Orderbook-based trading (not AMM)",
    "Extremely low fees: 0.00001 XLM per operation",
    "Path payments for automatic currency conversion",
    "Supports all Stellar assets",
    "No custody - trades directly from wallet",
    "Advanced trading features and charting",
    "Fiat on/ramp integrations",
  ],
};

