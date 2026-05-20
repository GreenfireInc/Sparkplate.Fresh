// StellarTerm - Open-source Stellar DEX Client
// Type: Native DEX Client
// Blockchain: Stellar (XLM)

export const stellarTermDEX = {
  name: "StellarTerm",
  blockchain: "Stellar (XLM)",
  type: "Native DEX Client",
  description: "Open-source trading client for Stellar's built-in decentralized exchange with orderbook and advanced trading tools",
  
  url: "https://stellarterm.com/",
  app: "https://stellarterm.com/exchange",
  docs: "https://stellarterm.com/about",
  
  api: {
    horizonEndpoint: "https://horizon.stellar.org",
    rpcEndpoint: "https://rpc.stellar.org",
    tickerEndpoint: "https://ticker.stellar.org/",
    documentation: "https://developers.stellar.org/api/",
    rateLimit: "Public Horizon: 3600 requests/hour",
    authentication: "None required for public data",
  },
  
  sdk: {
    npm: "@stellar/stellar-sdk",
    installation: "npm install @stellar/stellar-sdk",
    documentation: "https://stellar.github.io/js-stellar-sdk/",
    features: [
      "Order book trading",
      "Limit and market orders",
      "Trade history",
      "Portfolio management",
      "Multi-signature support",
    ],
  },
  
  integration: {
    example: `
// StellarTerm Integration Example
import * as StellarSDK from '@stellar/stellar-sdk';

const server = new StellarSDK.Horizon.Server('https://horizon.stellar.org');

// Get ticker data
async function getTickerData() {
  const response = await fetch('https://ticker.stellar.org/');
  const ticker = await response.json();
  
  console.log('Ticker data:', ticker);
  return ticker;
}

// Get order book with depth
async function getOrderBookWithDepth(
  sellingAsset: StellarSDK.Asset,
  buyingAsset: StellarSDK.Asset,
  limit: number = 100
) {
  const orderBook = await server
    .orderbook(sellingAsset, buyingAsset)
    .limit(limit)
    .call();
  
  // Calculate order book depth
  const bidDepth = orderBook.bids.reduce((sum, bid) => {
    return sum + (Number(bid.amount) * Number(bid.price));
  }, 0);
  
  const askDepth = orderBook.asks.reduce((sum, ask) => {
    return sum + Number(ask.amount);
  }, 0);
  
  console.log(\`Bid depth: \${bidDepth}, Ask depth: \${askDepth}\`);
  
  return {
    bids: orderBook.bids,
    asks: orderBook.asks,
    bidDepth,
    askDepth
  };
}

// Get account offers (open orders)
async function getAccountOffers(accountId: string) {
  const offers = await server
    .offers()
    .forAccount(accountId)
    .call();
  
  console.log(\`Found \${offers.records.length} open offers\`);
  return offers.records;
}

// Cancel an offer
async function cancelOffer(
  keypair: StellarSDK.Keypair,
  offerId: string
) {
  const account = await server.loadAccount(keypair.publicKey());
  
  const transaction = new StellarSDK.TransactionBuilder(account, {
    fee: StellarSDK.BASE_FEE,
    networkPassphrase: StellarSDK.Networks.PUBLIC
  })
    .addOperation(
      StellarSDK.Operation.manageSellOffer({
        selling: StellarSDK.Asset.native(),
        buying: StellarSDK.Asset.native(),
        amount: '0',
        price: '1',
        offerId: offerId
      })
    )
    .setTimeout(StellarSDK.TimeoutInfinite)
    .build();
  
  transaction.sign(keypair);
  
  const result = await server.submitTransaction(transaction);
  console.log('Offer cancelled:', result.hash);
  return result;
}

// Get trading history for account
async function getTradingHistory(
  accountId: string,
  limit: number = 100
) {
  const trades = await server
    .trades()
    .forAccount(accountId)
    .order('desc')
    .limit(limit)
    .call();
  
  console.log(\`Found \${trades.records.length} trades\`);
  
  trades.records.forEach(trade => {
    console.log(\`Trade: \${trade.base_amount} \${trade.base_asset_code || 'XLM'} for \${trade.counter_amount} \${trade.counter_asset_code || 'XLM'} at \${trade.price}\`);
  });
  
  return trades.records;
}

// Get asset information
async function getAssetInfo(assetCode: string, issuer: string) {
  const assets = await server
    .assets()
    .forCode(assetCode)
    .forIssuer(issuer)
    .call();
  
  if (assets.records.length === 0) {
    throw new Error(\`Asset \${assetCode}:\${issuer} not found\`);
  }
  
  const assetInfo = assets.records[0];
  console.log('Asset info:', {
    code: assetInfo.asset_code,
    issuer: assetInfo.asset_issuer,
    holders: assetInfo.accounts
  });
  
  return assetInfo;
}

// Usage
const XLM = StellarSDK.Asset.native();
const USDC = new StellarSDK.Asset(
  'USDC',
  'GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN'
);

getOrderBookWithDepth(XLM, USDC, 50)
  .then(depth => console.log('Order book depth:', depth));
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/stellarterm",
    github: "https://github.com/stellarterm",
    reddit: "https://www.reddit.com/r/Stellar/",
  },
  
  features: {
    orderbook: true,
    amm: false,
    limit_orders: true,
    market_orders: true,
    open_source: true,
    portfolio_tracking: true,
    multi_signature: true,
    advanced_trading: true,
  },
  
  fees: {
    trading: "Network fee only: 0.00001 XLM per operation",
    withdrawal: "Network fee: 0.00001 XLM",
    deposit: "Free",
  },
  
  notes: [
    "Fully open-source Stellar DEX client",
    "Direct connection to Stellar network",
    "No registration or KYC required",
    "Advanced orderbook trading",
    "Multi-signature account support",
    "Portfolio tracking and management",
    "Supports all Stellar assets",
    "Community-driven development",
  ],
};

