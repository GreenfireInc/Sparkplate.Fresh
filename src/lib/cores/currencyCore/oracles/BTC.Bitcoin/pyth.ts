// Pyth Network Oracle for Bitcoin (BTC)
// Pull-Based Real-Time Oracle Network

export const pythOracle = {
  name: "Pyth Network",
  blockchain: "Bitcoin (BTC) via Layer 2",
  type: "Pull-Based Oracle Network",
  description: "Pyth Network provides real-time BTC data from first-party publishers (exchanges and market makers). Integrated on BTC L2s like Merlin Chain and Stacks for low-latency DeFi applications. Uses a pull-based model where consumers fetch data on-demand.",
  url: "https://pyth.network/",
  docs: "https://docs.pyth.network/",
  priceApp: "https://pyth.network/price-feeds",
  api: {
    developerDocs: "https://docs.pyth.network/",
    quickStart: "https://docs.pyth.network/consume-data/quick-start",
    hermesClient: "https://www.npmjs.com/package/@pythnetwork/hermes-client",
    pythClient: "https://www.npmjs.com/package/@pythnetwork/client",
    documentation: "https://docs.pyth.network/",
  },
  features: [
    "Real-time BTC price data",
    "First-party data publishers (exchanges, market makers)",
    "Pull-based oracle model",
    "Sub-second price updates",
    "Support for Bitcoin L2s (Merlin Chain, Stacks)",
    "Low-latency data delivery",
    "500+ price feeds",
    "High-frequency trading support",
    "Confidence intervals for price data",
    "TypeScript SDK available",
  ],
  useCases: [
    "Bitcoin L2 DeFi protocols",
    "High-frequency trading applications",
    "Options and derivatives platforms",
    "Perpetual swaps",
    "Lending protocols",
    "Cross-chain bridges",
    "Gaming and prediction markets",
    "Algorithmic trading bots",
  ],
  integrationMethod: "TypeScript SDK / Smart Contract (L2) / Hermes API",
  dataFrequency: "Sub-second updates with pull-based model",
  pricing: "Free for read access",
  coverage: "500+ price feeds including BTC pairs, equities, FX",
  layer2Support: {
    merlinChain: "Native integration (2024)",
    stacks: "Available via Clarity contracts (2025)",
    soroban: "Stellar integration available",
  },
  socialMedia: {
    twitter: "https://twitter.com/PythNetwork",
    telegram: "https://t.me/Pyth_Network",
    discord: "https://discord.gg/pythnetwork",
    github: "https://github.com/pyth-network",
    linkedin: "https://www.linkedin.com/company/pyth-network/",
  },
  integrationNotes: "Use @pythnetwork/hermes-client for off-chain TypeScript integration. For Bitcoin L2s, use Pyth smart contracts on Stacks or Merlin Chain. Pull-based model requires consumer to fetch data actively.",
  npmPackages: [
    "@pythnetwork/hermes-client",
    "@pythnetwork/client",
    "@pythnetwork/pyth-evm-js",
  ],
  sampleEndpoints: [
    "Hermes API: GET /v2/updates/price/latest",
    "Hermes API: GET /v2/updates/price/{feed_id}",
  ],
};

