// Algodex DEX Information
// Fully decentralized exchange with on-chain order book on Algorand
// Source: Research compiled from multiple sources

export const algodexDEX = {
  name: "Algodex",
  blockchain: "Algorand",
  type: "Order-book DEX",
  description: "Algodex is a highly decentralized exchange with the order book completely on the Algorand blockchain itself, supporting limit orders and all Algorand Standard Assets by default.",
  
  urls: {
    main: "https://app.algodex.com/",
    about: "https://app.algodex.com/en/about",
    docs: "https://docs.algodex.com/",
  },
  
  status: {
    operational: false,
    note: "Currently under maintenance as of research date",
  },
  
  api: {
    endpoints: {
      algod: "Standard Algorand node endpoints",
      indexer: "Standard Algorand indexer endpoints",
      dexd: {
        apiVersion: 2,
        uri: "https://api.algodex.com",
        note: "Backend API for off-chain orderbook coordination",
      },
    },
    documentation: "https://docs.algodex.com/developer-tools/",
    rateLimit: "Check documentation when service resumes",
    requiresApiKey: false,
  },
  
  sdk: {
    typescript: {
      package: "@algodex/algodex-sdk",
      github: "https://github.com/algodex/algodex-sdk",
      documentation: "https://docs-sdk.algodex.com/",
      installCommand: "npm install @algodex/algodex-sdk",
      note: "Check availability status before use",
    },
    version: "v2",
    documentationLink: "https://docs.algodex.com/developer-tools/algodex-sdk-v2",
  },
  
  integration: {
    exampleUsage: `
import { AlgodexAPI } from "@algodex/algodex-sdk";

const config = {
  algod: { uri: "https://mainnet-api.algonode.cloud", token: "" },
  indexer: { uri: "https://mainnet-idx.algonode.cloud", token: "" },
  explorer: { uri: "https://algoexplorer.io", token: "" },
  dexd: { 
    apiVersion: 2, 
    uri: "https://api.algodex.com", 
    token: "" 
  }
};

const api = new AlgodexAPI(config);

// Example: place a limit order
const orderParams = {
  assetIn: 0,  // ALGO or ASA ID
  assetOut: 31566704, // some ASA
  quantity: 1_000_000,  // in microunits
  price: 1.5,  // price ratio
  side: "buy"
};

const order = await api.placeLimitOrder(orderParams);
console.log("Order result:", order);
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/Algodex",
    discord: "https://discord.gg/algodex",
    telegram: "https://t.me/algodex",
    medium: "https://medium.com/@algodex",
    github: "https://github.com/algodex",
  },
  
  features: {
    swaps: true,
    liquidityProvision: false,
    limitOrders: true,
    marketOrders: true,
    orderBook: true,
    yieldFarming: false,
    governance: false,
    nftSupport: false,
    hybridModel: true,
  },
  
  notes: [
    "Fully on-chain order book (highly decentralized)",
    "Hybrid model: on-chain settlement, backend coordination",
    "Supports all Algorand Standard Assets (ASAs) by default",
    "Currently under maintenance - check status before integration",
    "Limit and market order support",
    "No traditional liquidity pools (order book model)",
  ],
};

export default algodexDEX;
