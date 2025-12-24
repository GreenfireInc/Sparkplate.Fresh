// DIA Oracle for Bitcoin (BTC)
// Decentralized Information Asset - Multi-chain Oracle Network

export const diaOracle = {
  name: "DIA Oracle",
  blockchain: "Bitcoin (BTC)",
  type: "Decentralized Multi-Chain Oracle",
  description: "DIA provides real-time, customizable price feeds for Bitcoin and other assets. It aggregates data from over 85 on-chain and off-chain exchanges, making it suitable for DeFi, trading, and smart contract applications. DIA's oracles are integrated with Bitcoin Layer 2 solutions like Stacks, enabling DeFi builders to access reliable price data.",
  url: "https://www.diadata.org/",
  docs: "https://docs.diadata.org/",
  priceAppUrl: "https://www.diadata.org/app/price/asset/Bitcoin/0x0000000000000000000000000000000000000000/",
  api: {
    restEndpoint: "https://api.diadata.org/v1/assetQuotation/Bitcoin/0x0000000000000000000000000000000000000000",
    priceEndpoint: "https://api.diadata.org/v1/assetPrice?symbol=BTC&address=0x0000000000000000000000000000000000000000",
    documentation: "https://docs.diadata.org/",
    accessGuide: "https://docs.diadata.org/products/token-price-feeds/access-the-oracle",
  },
  features: [
    "Real-time BTC price aggregation from 85+ exchanges",
    "Customizable oracle deployments",
    "Support for Bitcoin Layer 2 (Stacks, Liquid Network)",
    "REST and GraphQL API access",
    "Historical price data",
    "Volume and liquidity metrics",
    "Free demo tier available",
    "Decentralized data validation",
    "Transparent data sourcing",
    "Custom feed creation",
  ],
  useCases: [
    "DeFi protocols on Bitcoin L2s",
    "Lending and borrowing platforms",
    "Derivatives and perpetual swaps",
    "Trading bots and algorithms",
    "Portfolio tracking applications",
    "Cross-chain bridges",
    "Insurance protocols",
    "Prediction markets",
  ],
  integrationMethod: "REST API / GraphQL / Smart Contract (L2)",
  dataFrequency: "Real-time with configurable update intervals",
  pricing: "Free tier for testing, paid plans for production",
  coverage: "3,000+ assets including Bitcoin and BTC pairs",
  socialMedia: {
    twitter: "https://twitter.com/DIAdata_org",
    telegram: "https://t.me/DIAdata_org",
    discord: "https://discord.gg/zFcXxXqT",
    github: "https://github.com/diadata-org",
    linkedin: "https://www.linkedin.com/company/diadata-org/",
  },
  integrationNotes: "Use axios or fetch for off-chain integration. For Layer 2 smart contracts, deploy DIA oracle contracts on Stacks or RSK. Free for testing with rate limits, paid tier for production use.",
  sampleEndpoints: [
    "GET https://api.diadata.org/v1/assetQuotation/Bitcoin/0x0000000000000000000000000000000000000000",
    "GET https://api.diadata.org/v1/assetPrice?symbol=BTC&address=0x0000000000000000000000000000000000000000",
  ],
};

