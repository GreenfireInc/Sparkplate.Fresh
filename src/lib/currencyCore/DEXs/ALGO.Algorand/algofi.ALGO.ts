// AlgoFi AMM DEX Information
// Part of the AlgoFi DeFi suite on Algorand
// Source: Research compiled from multiple sources

export const algofiDEX = {
  name: "AlgoFi AMM",
  blockchain: "Algorand",
  type: "AMM DEX",
  description: "Part of the AlgoFi DeFi suite with swap functionality, offering comprehensive DeFi services including lending, borrowing, and trading.",
  
  urls: {
    main: "https://www.algofi.org/",
    app: "https://app.algofi.org/swap",
    docs: "https://docs.algofi.org/",
  },
  
  api: {
    endpoints: {
      mainnet: "https://mainnet-api.algofi.org/",
      testnet: "https://testnet-api.algofi.org/",
    },
    documentation: "https://docs.algofi.org/developers/",
    rateLimit: "Check documentation for current limits",
    requiresApiKey: false,
  },
  
  sdk: {
    typescript: {
      package: "algofi-js-sdk",
      github: "https://github.com/Algofiorg/algofi-js-sdk",
      documentation: "https://docs.algofi.org/developers/algofi-js-sdk",
      installCommand: "npm install algofi-js-sdk",
      features: [
        "Swap operations",
        "Liquidity provision",
        "Lending/borrowing",
        "Staking",
        "Asset management",
      ],
    },
  },
  
  integration: {
    exampleUsage: `
import { AlgofiClient, Network } from "algofi-js-sdk";
import algosdk from "algosdk";

// Initialize AlgoFi client
const algodClient = new algosdk.Algodv2(token, server, port);
const indexerClient = new algosdk.Indexer(token, server, port);

const algofiClient = new AlgofiClient(
  Network.MAINNET,
  algodClient,
  indexerClient
);

// Get swap quote
async function getSwapQuote(assetIn: number, assetOut: number, amount: number) {
  const quote = await algofiClient.getSwapQuote(assetIn, assetOut, amount);
  return quote;
}

// Execute swap
async function executeSwap(account: algosdk.Account, assetIn: number, assetOut: number, amount: number) {
  const swapTxns = await algofiClient.prepareSwapTransactions(
    account.addr,
    assetIn,
    assetOut,
    amount
  );
  
  const signedTxns = swapTxns.map(txn => txn.signTxn(account.sk));
  const result = await algodClient.sendRawTransaction(signedTxns).do();
  
  return result;
}
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/algofiorg",
    discord: "https://discord.gg/algofi",
    telegram: "https://t.me/algofiorg",
    medium: "https://medium.com/@algofi",
    github: "https://github.com/Algofiorg",
  },
  
  contracts: {
    mainnet: {
      ammAppId: "Check AlgoFi documentation for current app IDs",
      lendingAppId: "Check AlgoFi documentation for current app IDs",
    },
    testnet: {
      ammAppId: "Check AlgoFi documentation for current app IDs",
    },
  },
  
  features: {
    swaps: true,
    liquidityProvision: true,
    yieldFarming: true,
    lending: true,
    borrowing: true,
    staking: true,
    limitOrders: false,
    governance: true,
    nftSupport: false,
  },
  
  notes: [
    "Comprehensive DeFi suite (lending, borrowing, swapping, staking)",
    "JavaScript SDK available (algofi-js-sdk)",
    "Part of larger AlgoFi ecosystem",
    "Liquid staking and lending protocol integration",
  ],
};

export default algofiDEX;
