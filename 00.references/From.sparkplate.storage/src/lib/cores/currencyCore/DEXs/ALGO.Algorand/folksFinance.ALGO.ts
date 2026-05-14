// Folks Finance Swap Information
// Decentralized capital markets protocol with swap functionality on Algorand
// Source: Research compiled from multiple sources

export const folksFinanceDEX = {
  name: "Folks Finance Swap",
  blockchain: "Algorand",
  type: "Integrated DEX",
  description: "Swap functionality within Folks Finance platform - a decentralized capital markets protocol offering lending, borrowing, and trading services.",
  
  urls: {
    main: "https://folks.finance/",
    app: "https://app.folks.finance/",
    docs: "https://docs.folks.finance/",
  },
  
  api: {
    endpoints: {
      mainnet: "https://api.folks.finance/",
      testnet: "Check documentation for testnet endpoints",
    },
    documentation: "https://docs.folks.finance/developers/",
    rateLimit: "Check documentation for current limits",
    requiresApiKey: false,
  },
  
  sdk: {
    typescript: {
      package: "folks-finance-js-sdk",
      github: "https://github.com/Folks-Finance/folks-finance-js-sdk",
      documentation: "https://docs.folks.finance/developers/javascript-sdk",
      installCommand: "npm install folks-finance-js-sdk",
      features: [
        "Swap operations",
        "Liquidity provision",
        "Lending pools",
        "Borrowing",
        "Yield optimization",
      ],
    },
  },
  
  integration: {
    exampleUsage: `
import { FolksFinanceClient, Network } from "folks-finance-js-sdk";
import algosdk from "algosdk";

// Initialize Folks Finance client
const algodClient = new algosdk.Algodv2(token, server, port);

const folksClient = new FolksFinanceClient(
  Network.MAINNET,
  algodClient
);

// Get swap quote
async function getSwapQuote(tokenIn: number, tokenOut: number, amount: bigint) {
  const quote = await folksClient.getSwapQuote({
    tokenIn,
    tokenOut,
    amount,
  });
  return quote;
}

// Execute swap
async function executeSwap(account: algosdk.Account, tokenIn: number, tokenOut: number, amount: bigint) {
  const swapTxns = await folksClient.prepareSwapTransactions({
    sender: account.addr,
    tokenIn,
    tokenOut,
    amount,
  });
  
  const signedTxns = swapTxns.map(txn => txn.signTxn(account.sk));
  const result = await algodClient.sendRawTransaction(signedTxns).do();
  
  return result;
}
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/FolksFinance",
    discord: "https://discord.gg/folksfinance",
    telegram: "https://t.me/FolksFinanceOfficial",
    medium: "https://medium.com/@folksfinance",
    github: "https://github.com/Folks-Finance",
  },
  
  contracts: {
    mainnet: {
      lendingAppId: "Check Folks Finance documentation",
      swapAppId: "Check Folks Finance documentation",
    },
    testnet: {
      note: "Check documentation for testnet contract IDs",
    },
  },
  
  features: {
    swaps: true,
    liquidityProvision: true,
    yieldFarming: true,
    lending: true,
    borrowing: true,
    crossChainSupport: true,
    limitOrders: false,
    governance: true,
    nftSupport: false,
  },
  
  notes: [
    "Part of comprehensive DeFi capital markets protocol",
    "Integrated swap functionality within lending platform",
    "Cross-chain support (Algorand mainnet and other networks)",
    "JavaScript SDK available",
    "Focus on capital efficiency and yield optimization",
  ],
};

export default folksFinanceDEX;
