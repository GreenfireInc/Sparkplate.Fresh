/**
 * Bitquery API
 * 
 * Blockchain Data API and Explorer
 * Free tier with GraphQL API for blockchain data
 * 
 * @see https://bitquery.io/
 */

export const bitqueryAPI = {
  name: 'Bitquery',
  description: 'Blockchain data platform with GraphQL API',
  
  // API Configuration
  baseURL: 'https://graphql.bitquery.io/',
  v2BaseURL: 'https://streaming.bitquery.io/graphql',
  apiVersion: 'v1',
  
  // Endpoints
  endpoints: {
    // GraphQL Endpoint
    graphql: 'https://graphql.bitquery.io/',
    
    // V2 Streaming
    v2Graphql: 'https://streaming.bitquery.io/graphql',
    v2Eap: 'https://streaming.bitquery.io/eap',
  },
  
  // Authentication
  authentication: {
    required: true,
    type: 'API Key (OAuth)',
    headerName: 'X-API-KEY',
    note: 'Free tier available with API key',
    getApiKey: 'https://graphql.bitquery.io/ide',
    oauth: 'https://oauth2.bitquery.io/',
  },
  
  // Rate Limits
  rateLimits: {
    free: {
      pointsPerMonth: 100000,
      queriesPerDay: 1000,
      cost: 'Free',
      note: 'Points consumed per query vary based on complexity',
    },
    developer: {
      pointsPerMonth: 1000000,
      cost: '$49/month',
    },
    startup: {
      pointsPerMonth: 5000000,
      cost: '$299/month',
    },
  },
  
  // NPM SDK
  npmPackages: {
    official: null,
    community: [
      {
        name: '@bitquery/graphql',
        url: 'https://www.npmjs.com/package/@bitquery/graphql',
        install: 'npm install @bitquery/graphql',
      },
      {
        name: 'bitquery-sdk',
        url: 'https://www.npmjs.com/package/bitquery-sdk',
        install: 'npm install bitquery-sdk',
      },
    ],
  },
  
  // Subgraph
  subgraph: {
    available: false,
    note: 'Bitquery uses its own GraphQL API, not The Graph protocol subgraphs',
  },
  
  // Documentation
  documentation: {
    main: 'https://docs.bitquery.io/',
    v1Docs: 'https://docs.bitquery.io/v1/',
    v2Docs: 'https://docs.bitquery.io/',
    quickstart: 'https://docs.bitquery.io/docs/start/first-query/',
    ide: 'https://graphql.bitquery.io/ide',
    examples: 'https://docs.bitquery.io/docs/examples/overview/',
    pricing: 'https://bitquery.io/pricing',
  },
  
  // Social Media
  socialMedia: {
    website: 'https://bitquery.io/',
    twitter: 'https://twitter.com/Bitquery_io',
    telegram: 'https://t.me/Bloxy_info',
    discord: 'https://discord.com/invite/EHcqDsA',
    youtube: 'https://www.youtube.com/channel/UCUClvUeUUP7D5cnLt8zEp4Q',
    linkedin: 'https://www.linkedin.com/company/bitquery/',
    github: 'https://github.com/bitquery',
    medium: 'https://bitquery.io/blog',
  },
  
  // Features
  features: {
    realTimePrices: true,
    historicalData: true,
    blockchainExplorer: true,
    dexTrades: true,
    tokenTransfers: true,
    smartContractCalls: true,
    nftData: true,
    defiData: true,
    mempool: true,
    graphqlAPI: true,
    streaming: true,
    multiChain: true,
  },
  
  // Supported Blockchains
  supportedBlockchains: [
    'Ethereum',
    'Binance Smart Chain',
    'Polygon',
    'Arbitrum',
    'Optimism',
    'Avalanche',
    'Fantom',
    'Tron',
    'Bitcoin',
    'Litecoin',
    'Dogecoin',
    'Solana',
    'Algorand',
    'EOS',
    'Cosmos',
    'Filecoin',
    'Near',
    'Conflux',
    'Celo',
    'Moonbeam',
    'Klaytn',
  ],
  
  // CORS Support
  cors: {
    enabled: true,
    note: 'CORS enabled for browser requests',
  },
  
  // GraphQL IDE
  ide: {
    available: true,
    url: 'https://graphql.bitquery.io/ide',
    note: 'Interactive GraphQL IDE for testing queries',
  },
  
  // Example Queries
  exampleQueries: {
    ethereumTransfers: `
query {
  ethereum(network: ethereum) {
    transfers(
      options: {limit: 10, desc: "block.height"}
    ) {
      block {
        height
        timestamp {
          time
        }
      }
      sender {
        address
      }
      receiver {
        address
      }
      amount
      currency {
        symbol
      }
    }
  }
}`,
    dexTrades: `
query {
  ethereum(network: ethereum) {
    dexTrades(
      options: {limit: 10, desc: "block.height"}
      exchangeName: {is: "Uniswap"}
    ) {
      block {
        height
      }
      buyAmount
      buyCurrency {
        symbol
      }
      sellAmount
      sellCurrency {
        symbol
      }
      transaction {
        hash
      }
    }
  }
}`,
  },
  
  // Example Usage
  examples: {
    graphqlEndpoint: 'https://graphql.bitquery.io/',
    v2Endpoint: 'https://streaming.bitquery.io/graphql',
    ide: 'https://graphql.bitquery.io/ide',
  },
  
  // Notes
  notes: [
    'Powerful GraphQL API for blockchain data',
    'Free tier with 100,000 points per month',
    'Supports 40+ blockchains',
    'Real-time and historical data',
    'DEX trades and DeFi analytics',
    'NFT data and tracking',
    'Interactive GraphQL IDE',
    'Streaming API for real-time data',
    'Multi-chain support',
  ],
};

export default bitqueryAPI;

