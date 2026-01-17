// Band Protocol Oracle for Bitcoin (BTC)
// Cosmos-Based Cross-Chain Oracle

export const bandOracle = {
  name: "Band Protocol",
  blockchain: "Bitcoin (BTC) via IBC and Layer 2",
  type: "Cross-Chain Oracle Network",
  description: "Band Protocol is a Cosmos-based oracle with Inter-Blockchain Communication (IBC) support. Supplies BTC prices to Bitcoin L2 dApps, focusing on reusable data scripts. Provides decentralized data feeds across multiple blockchain ecosystems.",
  url: "https://bandprotocol.com/",
  docs: "https://docs.bandchain.org/",
  api: {
    documentation: "https://docs.bandchain.org/",
    evmIntegration: "https://docs.bandchain.org/standard-dataset/using-band-standard-dataset/evm-smart-contract",
    bandchainJs: "https://github.com/bandprotocol/bandchain.js",
    restApi: "https://laozi1.bandchain.org/api/oracle/v1/request_prices",
    graphql: "https://graphql.bandchain.org/",
  },
  features: [
    "BTC price feeds via BandChain",
    "IBC connectivity for cross-chain data",
    "Reusable data scripts",
    "175+ supported symbols",
    "Decentralized validator network",
    "Customizable oracle scripts",
    "Fast finality via Cosmos SDK",
    "Multi-chain deployment",
    "TypeScript SDK (bandchain.js)",
    "GraphQL and REST APIs",
  ],
  useCases: [
    "Bitcoin L2 DeFi applications",
    "Cross-chain bridges",
    "Derivatives protocols",
    "Lending and borrowing platforms",
    "Synthetic asset protocols",
    "Insurance platforms",
    "Gaming and NFT pricing",
    "Decentralized exchanges",
  ],
  integrationMethod: "bandchain.js SDK / IBC / REST API / GraphQL",
  dataFrequency: "Real-time with configurable update intervals",
  pricing: "Free for read access, paid for custom oracle scripts",
  coverage: "175+ symbols including BTC and major cryptocurrencies",
  layer2Support: {
    stacks: "Via IBC bridge (in development)",
    rootstock: "EVM-compatible integration available",
    cosmos: "Native support via IBC",
  },
  socialMedia: {
    twitter: "https://twitter.com/BandProtocol",
    telegram: "https://t.me/bandprotocol",
    discord: "https://discord.gg/bandprotocol",
    github: "https://github.com/bandprotocol",
    linkedin: "https://www.linkedin.com/company/bandprotocol/",
    reddit: "https://www.reddit.com/r/bandprotocol/",
  },
  integrationNotes: "Use bandchain.js for TypeScript integration. For Bitcoin L2s, leverage IBC connectivity or EVM-compatible smart contracts on RSK. Band Protocol emphasizes reusable oracle scripts for efficiency.",
  npmPackages: [
    "@bandprotocol/bandchain.js",
  ],
  sampleEndpoints: [
    "REST: GET https://laozi1.bandchain.org/api/oracle/v1/request_prices?symbols=BTC&min_count=10&ask_count=16",
    "GraphQL: query { get_price(symbol: \"BTC\") { price timestamp } }",
  ],
};

