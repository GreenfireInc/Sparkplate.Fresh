// LOBSTR - Stellar Wallet with Integrated DEX
// Type: Wallet & DEX
// Blockchain: Stellar (XLM)

export const lobstrDEX = {
  name: "LOBSTR",
  blockchain: "Stellar (XLM)",
  type: "Wallet & DEX",
  description: "Popular Stellar wallet with integrated DEX trading, simple swap interface, and mobile apps",
  
  url: "https://lobstr.co/",
  app: "https://lobstr.co/trade",
  docs: "https://lobstr.co/faq",
  
  api: {
    horizonEndpoint: "https://horizon.stellar.org",
    rpcEndpoint: "https://rpc.stellar.org",
    lobstrEndpoint: "https://api.lobstr.co/",
    documentation: "https://developers.stellar.org/api/",
    rateLimit: "Public Horizon: 3600 requests/hour",
    authentication: "None required for public data",
  },
  
  sdk: {
    npm: "@stellar/stellar-sdk",
    installation: "npm install @stellar/stellar-sdk",
    documentation: "https://stellar.github.io/js-stellar-sdk/",
    features: [
      "Wallet management",
      "Asset swaps",
      "Order book trading",
      "Price feeds",
      "Transaction history",
    ],
  },
  
  integration: {
    example: `
// LOBSTR Integration Example (Uses Stellar Native DEX)
import * as StellarSDK from '@stellar/stellar-sdk';

const server = new StellarSDK.Horizon.Server('https://horizon.stellar.org');

// Get swap quote (path payment)
async function getSwapQuote(
  sourceAccount: string,
  sourceAsset: StellarSDK.Asset,
  destinationAsset: StellarSDK.Asset,
  destinationAmount: string
) {
  const paths = await server
    .strictReceivePaths([sourceAsset], destinationAsset, destinationAmount)
    .call();
  
  if (paths.records.length === 0) {
    throw new Error('No path found for swap');
  }
  
  const bestPath = paths.records[0];
  console.log('Best swap path:', {
    sourceAmount: bestPath.source_amount,
    destinationAmount: bestPath.destination_amount,
    path: bestPath.path
  });
  
  return bestPath;
}

// Execute swap (path payment)
async function executeSwap(
  keypair: StellarSDK.Keypair,
  destinationAccount: string,
  sourceAsset: StellarSDK.Asset,
  destinationAsset: StellarSDK.Asset,
  destinationAmount: string,
  maxSourceAmount: string
) {
  const account = await server.loadAccount(keypair.publicKey());
  
  const transaction = new StellarSDK.TransactionBuilder(account, {
    fee: StellarSDK.BASE_FEE,
    networkPassphrase: StellarSDK.Networks.PUBLIC
  })
    .addOperation(
      StellarSDK.Operation.pathPaymentStrictReceive({
        sendAsset: sourceAsset,
        sendMax: maxSourceAmount,
        destination: destinationAccount,
        destAsset: destinationAsset,
        destAmount: destinationAmount,
        path: [] // Stellar will find the best path
      })
    )
    .setTimeout(StellarSDK.TimeoutInfinite)
    .build();
  
  transaction.sign(keypair);
  
  const result = await server.submitTransaction(transaction);
  console.log('Swap executed:', result.hash);
  return result;
}

// Get account balances
async function getAccountBalances(accountId: string) {
  const account = await server.accounts().accountId(accountId).call();
  
  console.log('Account balances:');
  account.balances.forEach((balance) => {
    if (balance.asset_type === 'native') {
      console.log(\`  XLM: \${balance.balance}\`);
    } else {
      console.log(\`  \${balance.asset_code}: \${balance.balance}\`);
    }
  });
  
  return account.balances;
}

// Get asset price
async function getAssetPrice(
  baseAsset: StellarSDK.Asset,
  counterAsset: StellarSDK.Asset
) {
  const orderBook = await server
    .orderbook(baseAsset, counterAsset)
    .limit(1)
    .call();
  
  const bids = orderBook.bids || [];
  const asks = orderBook.asks || [];
  
  if (bids.length === 0 || asks.length === 0) {
    throw new Error('No liquidity for this pair');
  }
  
  const bid = Number(bids[0].price);
  const ask = Number(asks[0].price);
  const mid = (bid + ask) / 2;
  
  console.log(\`Price: \${mid}\`);
  return mid;
}

// Add trustline (required before receiving non-XLM assets)
async function addTrustline(
  keypair: StellarSDK.Keypair,
  asset: StellarSDK.Asset
) {
  const account = await server.loadAccount(keypair.publicKey());
  
  const transaction = new StellarSDK.TransactionBuilder(account, {
    fee: StellarSDK.BASE_FEE,
    networkPassphrase: StellarSDK.Networks.PUBLIC
  })
    .addOperation(
      StellarSDK.Operation.changeTrust({
        asset: asset
      })
    )
    .setTimeout(StellarSDK.TimeoutInfinite)
    .build();
  
  transaction.sign(keypair);
  
  const result = await server.submitTransaction(transaction);
  console.log('Trustline added:', result.hash);
  return result;
}

// Usage
const XLM = StellarSDK.Asset.native();
const USDC = new StellarSDK.Asset(
  'USDC',
  'GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN'
);

getAssetPrice(XLM, USDC).then(price => console.log('XLM/USDC:', price));
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/lobstrco",
    telegram: "https://t.me/lobstrco",
    medium: "https://medium.com/lobstr",
    reddit: "https://www.reddit.com/r/Stellar/",
    github: "https://github.com/Lobstrco",
  },
  
  features: {
    wallet: true,
    orderbook: true,
    amm: false,
    swap: true,
    path_payments: true,
    multi_currency: true,
    mobile_app: true,
    browser_extension: true,
    savings: true,
  },
  
  fees: {
    trading: "Network fee only: 0.00001 XLM per operation",
    swap: "Network fee only: 0.00001 XLM",
    withdrawal: "Network fee: 0.00001 XLM",
    deposit: "Free",
  },
  
  notes: [
    "Most popular Stellar wallet with 500,000+ users",
    "Simple swap interface for easy trading",
    "Mobile apps for iOS and Android",
    "Browser extension available",
    "Built-in LOBSTR Vault for security",
    "Supports all Stellar assets",
    "Savings accounts with interest",
    "Non-custodial wallet",
  ],
};

