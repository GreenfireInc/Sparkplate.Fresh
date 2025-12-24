// EverPay - Real-time Financial Protocol
// Type: Settlement Layer / DEX Infrastructure
// Blockchain: Arweave (AR) - SCP based

export const everpayDEX = {
  name: "EverPay",
  blockchain: "Arweave (AR)",
  type: "Financial Protocol / DEX Infrastructure",
  description: "While primarily a real-time payment protocol, EverPay serves as the underlying infrastructure for DEXs like Permaswap. It provides instant transaction finality using Storage-based Consensus Paradigm (SCP) and supports cross-chain assets.",
  
  url: "https://everpay.io/",
  docs: "https://docs.everpay.io/",
  
  api: {
    baseUrl: "https://api.everpay.io",
    endpoints: {
      info: "/info",
      txs: "/txs",
    },
    documentation: "https://docs.everpay.io/docs/en/sdk/js-sdk-intro",
  },
  
  sdk: {
    npm: "everpay",
    installation: "npm install everpay",
    github: "https://github.com/everFinance/everpay-js",
  },
  
  integration: {
    example: `
// EverPay Integration for Swap/Transfer Data
import Everpay from 'everpay';

async function getEverPayInfo() {
  const everpay = new Everpay();
  
  // Get token list and info
  const info = await everpay.info();
  console.log("Supported Tokens:", info.tokenList.map(t => t.symbol));
  
  return info;
}

// Usage
// getEverPayInfo().then(console.log);
`
  },
  
  features: {
    instantFinality: true,
    zeroGas: true,
    crossChain: true,
    scp: true, // Storage-based Consensus Paradigm
  },
  
  useCases: [
    "Instant payments",
    "Underlying layer for DEXs (Permaswap)",
    "Cross-chain asset bridging",
  ],
  
  notes: [
    "Bundles transactions to Arweave",
    "Provides real-time performance",
    "Critical infrastructure for Arweave DeFi",
  ],
};
