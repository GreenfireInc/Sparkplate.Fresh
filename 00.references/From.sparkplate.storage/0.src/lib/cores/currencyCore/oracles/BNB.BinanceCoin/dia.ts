// DIA Oracle - Community-Driven Multi-Source Oracle for BNB Chain
// Type: Community-Driven Transparent Oracle
// Blockchain: BNB Chain (BNB)

export const bnbDiaOracle = {
  name: "DIA (Decentralized Information Asset)",
  blockchain: "BNB Chain (BNB)",
  type: "Community-Driven Multi-Source Oracle",
  description: "DIA provides real-time, customizable price feeds for BNB Chain, aggregating data from 85+ on-chain and off-chain exchanges. Uses transparent sourcing and MAIR methodology, suitable for DeFi protocols requiring auditable and customizable data feeds.",
  
  url: "https://www.diadata.org/",
  docs: "https://docs.diadata.org/",
  
  api: {
    apiDocumentation: "https://docs.diadata.org/products/api",
    bnbIntegration: "https://docs.diadata.org/products/oracle/bnb-chain",
    baseURL: "https://api.diadata.org/v1",
    bnbPriceEndpoint: "https://api.diadata.org/v1/assetQuotation/BinanceSmartChain/0x0000000000000000000000000000000000000000",
  },
  
  sdk: {
    npm: "axios",
    installation: "npm install axios",
    documentation: "https://docs.diadata.org/",
    github: "https://github.com/diadata-org",
  },
  
  socialMedia: {
    twitter: "https://twitter.com/DIAdata_org",
    telegram: "https://t.me/DIAdata_org",
    discord: "https://discord.com/invite/dia-data",
    github: "https://github.com/diadata-org",
  },
  
  features: {
    communityDriven: true,
    transparentSourcing: true,
    customizableFeeds: true,
    multiSourceAggregation: true,
    maiMethodology: true,
    realTimeData: true,
    auditableData: true,
  },
  
  supportedData: [
    "Cryptocurrency prices from 85+ exchanges",
    "Customizable price feeds",
    "Real-time and historical data",
    "Transparent data sourcing",
    "MAIR aggregation methodology",
    "Custom asset feeds on request",
  ],
  
  bnbChainIntegration: {
    status: "Active on BNB Chain",
    method: "REST API + on-chain oracles",
    benefits: [
      "85+ exchange aggregation",
      "MAIR methodology for transparent pricing",
      "Customizable feeds for specific needs",
      "Community-driven and open-source",
      "Auditable data sourcing",
      "Real-time and historical data",
      "Free API access for public data",
      "Custom feeds for production use",
    ],
    bestFor: [
      "DeFi protocols requiring transparency",
      "Custom data feed requirements",
      "Applications needing auditable pricing",
      "Community-driven projects",
      "Research and analytics",
    ],
  },
  
  notes: [
    "Aggregates from 85+ exchanges",
    "MAIR (Market Aggregated Index Rate) methodology",
    "Community-driven with open data",
    "Customizable feeds available",
    "Free API for public data",
    "On-chain oracles for smart contracts",
    "Transparent sourcing and calculation",
    "Active BNB Chain support",
  ],
  
  useCases: [
    "DeFi price feeds with transparency",
    "Custom asset pricing",
    "Research and analytics platforms",
    "Auditable price data",
    "Community-driven protocols",
    "Exotic pair pricing",
  ],
  
  technicalDetails: {
    methodology: "MAIR (Market Aggregated Index Rate)",
    exchanges: "85+ on-chain and off-chain sources",
    updateFrequency: "Real-time updates",
    apiAccess: "Free public API, premium for custom feeds",
    transparency: "Fully auditable sourcing",
  },
  
  resources: {
    mainWebsite: "https://www.diadata.org/",
    documentation: "https://docs.diadata.org/",
    bnbPriceExplorer: "https://www.diadata.org/app/price/asset/BinanceSmartChain/0x0000000000000000000000000000000000000000/",
    apiDocs: "https://docs.diadata.org/products/api",
    github: "https://github.com/diadata-org",
  },
};
