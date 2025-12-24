// Vestige DEX Information
// Next-generation DEX focused on capital efficiency on Algorand
// Source: Research compiled from multiple sources

export const vestigeDEX = {
  name: "Vestige",
  blockchain: "Algorand",
  type: "AMM DEX / Swap Aggregator",
  description: "Next-generation DEX focused on capital efficiency. Vestige is an all-in-one trading platform and swap aggregator for Algorand assets that provides the best DEX rates across the ecosystem.",
  
  urls: {
    main: "https://vestige.fi/",
    app: "https://vestige.fi/swap",
    docs: "https://docs.vestige.fi/",
  },
  
  api: {
    endpoints: {
      mainnet: "Check Vestige documentation for API endpoints",
      aggregatorApi: "Vestige provides aggregation across multiple DEXs",
    },
    documentation: "https://docs.vestige.fi/",
    rateLimit: "Check documentation",
    requiresApiKey: false,
  },
  
  sdk: {
    typescript: {
      available: false,
      note: "Vestige is primarily a UI/aggregator. No public SDK available. Interact via web interface or use Algorand SDK for direct contract interaction.",
    },
  },
  
  integration: {
    exampleUsage: `
// Vestige is primarily a swap aggregator with UI
// For programmatic access, use Algorand SDK to interact with smart contracts
import algosdk from "algosdk";

const algodClient = new algosdk.Algodv2(token, server, port);

// Query Vestige's aggregator for best rates
// Implementation depends on Vestige's contract structure and API availability
async function getBestSwapRate(assetIn: number, assetOut: number, amount: bigint) {
  // Vestige aggregates prices from multiple DEXs
  // Check Vestige documentation for integration details
}
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/VestigeFi",
    discord: "https://discord.gg/vestige",
    telegram: "https://t.me/vestigefi",
    medium: "Check website for Medium link",
  },
  
  features: {
    swaps: true,
    swapAggregation: true,
    liquidityProvision: false,
    yieldFarming: false,
    limitOrders: false,
    governance: false,
    nftSupport: false,
    priceComparison: true,
    routeOptimization: true,
  },
  
  notes: [
    "Swap aggregator routing trades across multiple DEXs",
    "Finds best prices across Algorand DEX ecosystem",
    "No dedicated SDK - primarily UI-focused",
    "Optimizes for best execution prices",
    "Capital efficiency focused",
  ],
};

export default vestigeDEX;
