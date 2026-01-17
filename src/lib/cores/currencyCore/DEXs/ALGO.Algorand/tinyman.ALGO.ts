// Tinyman DEX Information
// Leading decentralized exchange on Algorand
// Source: Research compiled from multiple sources

export const tinymanDEX = {
  name: "Tinyman",
  blockchain: "Algorand",
  type: "AMM DEX",
  description: "Leading decentralized exchange on Algorand with automated market making. Tinyman V2 is live on MainNet with constant-product swap pools.",
  
  urls: {
    main: "https://tinyman.org/",
    app: "https://app.tinyman.org/",
    docs: "https://docs.tinyman.org/",
  },
  
  api: {
    endpoints: {
      mainnet: "https://mainnet.analytics.tinyman.org/api/v1/",
      testnet: "https://testnet.analytics.tinyman.org/api/v1/",
    },
    documentation: "https://docs.tinyman.org/integration/api",
    rateLimit: "Generous (check docs for current limits)",
    requiresApiKey: false,
  },
  
  sdk: {
    npm: {
      package: "@tinymanorg/tinyman-js-sdk",
      version: "5.1.1+",
      installCommand: "npm install @tinymanorg/tinyman-js-sdk",
      github: "https://github.com/tinymanorg/tinyman-js-sdk",
      npmLink: "https://www.npmjs.com/package/@tinymanorg/tinyman-js-sdk",
    },
    documentation: "https://docs.tinyman.org/v2-integration/official-sdks",
    typescriptSupport: true,
    features: [
      "Pool creation (Bootstrap)",
      "Add liquidity (initial, flexible, single asset)",
      "Remove liquidity",
      "Swap operations",
      "Quote generation",
      "Transaction building and signing",
    ],
  },
  
  integration: {
    exampleUsage: `
import { Tinyman } from "@tinymanorg/tinyman-js-sdk";
import algosdk from "algosdk";

const algodClient = new algosdk.Algodv2(algodToken, algodServer, algodPort);
const indexerClient = new algosdk.Indexer(indexerToken, indexerServer, indexerPort);

async function doSwap(account: algosdk.Account, fromAssetId: number, toAssetId: number, amount: bigint) {
  const tinyman = await Tinyman.forMainnet(algodClient, indexerClient);
  const assetIn = await tinyman.fetchAsset(fromAssetId);
  const assetOut = await tinyman.fetchAsset(toAssetId);
  const pool = await tinyman.fetchPool(assetIn, assetOut);
  
  // Get quote
  const quote = await pool.fetchSwapQuote(amount);
  
  // Build transaction group for the swap
  const txnGroup = await pool.prepareSwapTransactions(account.addr, quote);
  const signedTxns = txnGroup.map((txn) => txn.signTxn(account.sk));
  
  // Send transaction
  const { txId } = await algodClient.sendRawTransaction(signedTxns).do();
  const confirmation = await algosdk.waitForConfirmation(algodClient, txId, 4);
  
  return confirmation;
}
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/tinymanorg",
    discord: "https://discord.gg/tinyman",
    telegram: "https://t.me/tinymanofficial",
    medium: "https://tinymanorg.medium.com/",
    github: "https://github.com/tinymanorg",
  },
  
  contracts: {
    v2: {
      mainnet: {
        validatorAppId: 1002541853,
        poolTemplateAppId: 1002542169,
      },
      testnet: {
        validatorAppId: 148607000,
        poolTemplateAppId: 148607322,
      },
    },
    v1: {
      note: "V1.1 contracts are deprecated, use V2",
    },
  },
  
  features: {
    swaps: true,
    liquidityProvision: true,
    yieldFarming: true,
    limitOrders: true,
    governance: false,
    nftSupport: false,
  },
  
  notes: [
    "Tinyman V2 is the recommended version",
    "Supports both V1.1 and V2 contracts",
    "No subgraph available - use Algorand Indexer for historical data",
    "Can use Conduit for custom indexing pipelines",
  ],
};

export default tinymanDEX;
