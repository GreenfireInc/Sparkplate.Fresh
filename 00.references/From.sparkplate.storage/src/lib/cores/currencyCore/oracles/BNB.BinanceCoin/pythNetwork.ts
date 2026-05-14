// Pyth Network Oracle - High-Frequency Pull Oracle for BNB Chain
// Type: Pull-Based High-Frequency Oracle
// Blockchain: BNB Chain (BNB)

export const bnbPythNetworkOracle = {
  name: "Pyth Network",
  blockchain: "BNB Chain (BNB)",
  type: "Pull-Based High-Frequency Oracle",
  description: "Pyth Network provides high-frequency, low-latency price feeds for BNB Chain from 80+ first-party publishers including major trading firms. Uses pull oracle model with sub-second updates and cryptographic proofs, ideal for high-frequency trading and sophisticated DeFi.",
  
  url: "https://pyth.network/",
  docs: "https://docs.pyth.network/",
  
  api: {
    bnbChainDocs: "https://docs.pyth.network/documentation/pythnet-price-feeds/bnb",
    howItWorks: "https://docs.pyth.network/how-pyth-works",
    evmQuickstart: "https://docs.pyth.network/consume-data/quick-start/evm",
    priceFeedIds: "https://pyth.network/developers/price-feed-ids/",
  },
  
  sdk: {
    npm: "@pythnetwork/pyth-evm-js",
    hermesClient: "@pythnetwork/hermes-client",
    installation: "npm install @pythnetwork/pyth-evm-js @pythnetwork/hermes-client",
    documentation: "https://docs.pyth.network/",
    github: "https://github.com/pyth-network/pyth-crosschain",
  },
  
  socialMedia: {
    twitter: "https://twitter.com/PythNetwork",
    discord: "https://discord.com/invite/invite/PythNetwork",
    telegram: "https://t.me/Pyth_Network",
    github: "https://github.com/pyth-network",
  },
  
  features: {
    pullOracle: true,
    highFrequency: true,
    subSecondUpdates: true,
    confidenceIntervals: true,
    institutionalGrade: true,
    crossChain: true,
    cryptographicProofs: true,
    costEffective: true,
  },
  
  supportedData: [
    "90+ cryptocurrency pairs",
    "Equities data",
    "Forex rates",
    "Metals and commodities",
    "Confidence intervals for all feeds",
    "Sub-second update frequency",
  ],
  
  bnbChainIntegration: {
    status: "Fully deployed on BNB Chain",
    pythContract: "0x4D7E825f80bDf85e913E7DD4c93d2b6A4F2a6A63",
    method: "Pull model - off-chain aggregation, on-chain verification",
    hermesEndpoint: "https://hermes.pyth.network",
    benefits: [
      "Sub-second price updates from 80+ publishers",
      "Institutional-grade data from major trading firms",
      "Pull model reduces gas costs",
      "Confidence intervals for risk management",
      "Cross-chain price attestations",
      "High-frequency trading support",
      "Cryptographic proof of data authenticity",
      "Cost-effective for frequent updates",
    ],
    bestFor: [
      "High-frequency trading platforms",
      "Sophisticated DeFi derivatives",
      "Arbitrage bots",
      "Low-latency applications",
      "Institutional DeFi products",
      "Options and futures platforms",
    ],
  },
  
  notes: [
    "Pull oracle model: fetch updates when needed",
    "80+ first-party publishers including trading firms",
    "Sub-second update frequency",
    "Confidence intervals for all price feeds",
    "Deployed on BNB Chain mainnet",
    "Cost-effective for high-frequency needs",
    "Institutional-grade data quality",
    "Cross-chain price attestations",
    "Used by top DeFi protocols",
    "Pythnet blockchain for price aggregation",
  ],
  
  useCases: [
    "High-frequency DEX trading",
    "Derivatives and options pricing",
    "Arbitrage opportunities",
    "Liquidation systems",
    "Perpetual swaps",
    "Algorithmic trading",
    "Institutional DeFi",
    "Cross-chain arbitrage",
  ],
  
  technicalDetails: {
    updateFrequency: "Sub-second (400ms typical)",
    publishers: "80+ first-party data providers",
    aggregation: "Off-chain with on-chain verification",
    model: "Pull oracle (fetch on demand)",
    decimals: "Variable by feed",
    gasOptimization: "Pay only when you need data",
  },
  
  resources: {
    mainWebsite: "https://pyth.network/",
    documentation: "https://docs.pyth.network/",
    bnbChainDocs: "https://docs.pyth.network/documentation/pythnet-price-feeds/bnb",
    priceFeedIds: "https://pyth.network/developers/price-feed-ids/",
    github: "https://github.com/pyth-network/pyth-crosschain",
    blog: "https://pythnetwork.medium.com/",
  },
};
