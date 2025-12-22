// Pact DEX Information
// Community-driven DEX with efficient liquidity pools on Algorand
// Source: Research compiled from multiple sources

export const pactDEX = {
  name: "Pact",
  blockchain: "Algorand",
  type: "AMM DEX",
  description: "Mobile-first designed trading experience offering deep liquidity and low transaction fees, with accessible smart contract functionality available to users of all levels.",
  
  urls: {
    main: "https://www.pact.fi/",
    app: "https://app.pact.fi/",
    docs: "https://pactfi.github.io/pact-py-sdk/latest/",
  },
  
  api: {
    endpoints: {
      mainnet: "Check Pact documentation for current API endpoints",
      testnet: "Check Pact documentation for current API endpoints",
    },
    documentation: "https://pactfi.github.io/pact-py-sdk/latest/",
    rateLimit: "Check documentation",
    requiresApiKey: false,
  },
  
  sdk: {
    python: {
      package: "pactsdk",
      github: "https://github.com/pactfi/pact-py-sdk",
      documentation: "https://pactfi.github.io/pact-py-sdk/latest/",
      features: [
        "Pool creation",
        "Managing liquidity",
        "Making swaps",
        "Farming",
      ],
    },
    typescript: {
      available: false,
      note: "Currently only Python SDK available. Use Algorand JS SDK to interact directly with smart contracts, or wait for official JS/TS SDK release.",
      workaround: "Interact directly with Pact smart contracts using algosdk",
    },
  },
  
  integration: {
    exampleUsage: `
// For TypeScript integration, interact directly with Pact smart contracts
import algosdk from "algosdk";

const algodClient = new algosdk.Algodv2(token, server, port);

// Fetch pools by assets
async function fetchPactPools(assetA: number, assetB: number) {
  // Query Pact's contract state using Algorand SDK
  // Refer to Pact's contract documentation for specific app IDs and methods
  const appId = 123456789; // Example Pact app ID
  const appInfo = await algodClient.getApplicationByID(appId).do();
  return appInfo;
}
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/pact_fi",
    discord: "https://discord.gg/pactfi",
    telegram: "https://t.me/pactfi",
    medium: "https://medium.com/@pactfi",
    github: "https://github.com/pactfi",
  },
  
  features: {
    swaps: true,
    liquidityProvision: true,
    yieldFarming: true,
    limitOrders: false,
    governance: true,
    nftSupport: false,
  },
  
  notes: [
    "Mobile-first design philosophy",
    "Python SDK available (pactsdk)",
    "TypeScript/JavaScript SDK not yet available",
    "Direct smart contract interaction required for JS/TS projects",
    "Community-driven with strong focus on user experience",
  ],
};

export default pactDEX;
