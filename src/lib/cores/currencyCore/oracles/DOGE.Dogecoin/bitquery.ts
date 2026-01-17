// Bitquery - Blockchain Data API for Dogecoin
// Type: GraphQL Blockchain API
// Blockchain: Dogecoin (DOGE)

export const bitqueryOracle = {
  name: "Bitquery",
  blockchain: "Dogecoin (DOGE)",
  type: "GraphQL Blockchain API",
  description: "Provides extensive GraphQL API access to Dogecoin blockchain data, including transfers, DEX trades, balances, and more. Supports querying Dogecoin DEX trades and pricing data.",
  
  url: "https://bitquery.io/",
  dogecoinAPI: "https://bitquery.io/blockchains/dogecoin-blockchain-api",
  docs: "https://docs.bitquery.io/",
  
  api: {
    baseURL: "https://graphql.bitquery.io/",
    endpoint: "https://graphql.bitquery.io/",
    documentation: "https://docs.bitquery.io/",
    explorer: "https://explorer.bitquery.io/dogecoin/mainnet",
    rateLimit: "API key required, free tier available",
    requiresAuth: true,
  },
  
  sdk: {
    npm: "graphql-request",
    installation: "npm install graphql-request graphql",
    documentation: "https://docs.bitquery.io/",
    features: [
      "GraphQL blockchain queries",
      "Real-time transaction data",
      "Address balance tracking",
      "DEX trade data (wrapped DOGE)",
      "Transfer history",
      "Network statistics",
    ],
  },
  
  integration: {
    example: `
// Bitquery GraphQL API Integration Example for Dogecoin
import { request, gql } from 'graphql-request';

const BITQUERY_ENDPOINT = 'https://graphql.bitquery.io/';
const BITQUERY_API_KEY = 'YOUR_API_KEY'; // Get from bitquery.io

// Query recent DOGE transfers
async function getRecentTransfers(limit: number = 10) {
  const query = gql\`
    query dogeTransfers {
      dogecoin {
        transfers(
          options: { limit: \${limit}, desc: "block.timestamp.time" }
        ) {
          amount
          currency {
            symbol
            name
          }
          receiver {
            address
          }
          sender {
            address
          }
          transaction {
            hash
            index
          }
          block {
            timestamp {
              time
            }
            height
          }
        }
      }
    }
  \`;

  try {
    const headers = { 'X-API-KEY': BITQUERY_API_KEY };
    const data = await request(BITQUERY_ENDPOINT, query, undefined, headers);
    
    console.log('Latest Dogecoin Transfers:', data.dogecoin.transfers);
    return data.dogecoin.transfers;
  } catch (error) {
    console.error('Error fetching DOGE transfers:', error);
    throw error;
  }
}

// Query address balance
async function getAddressBalance(address: string) {
  const query = gql\`
    query dogeAddress {
      dogecoin {
        address(address: { is: "\${address}" }) {
          address
          balances {
            currency {
              symbol
            }
            value
          }
        }
      }
    }
  \`;

  try {
    const headers = { 'X-API-KEY': BITQUERY_API_KEY };
    const data = await request(BITQUERY_ENDPOINT, query, undefined, headers);
    
    console.log(\`Balance for \${address}:\`, data.dogecoin.address);
    return data.dogecoin.address;
  } catch (error) {
    console.error('Error fetching address balance:', error);
    throw error;
  }
}

// Query address transfers
async function getAddressTransfers(address: string, limit: number = 10) {
  const query = gql\`
    query addressTransfers {
      dogecoin {
        transfers(
          sender: { is: "\${address}" }
          options: { limit: \${limit}, desc: "block.timestamp.time" }
        ) {
          amount
          receiver {
            address
          }
          transaction {
            hash
          }
          block {
            timestamp {
              time
            }
          }
        }
      }
    }
  \`;

  try {
    const headers = { 'X-API-KEY': BITQUERY_API_KEY };
    const data = await request(BITQUERY_ENDPOINT, query, undefined, headers);
    
    console.log(\`Transfers from \${address}:\`, data.dogecoin.transfers);
    return data.dogecoin.transfers;
  } catch (error) {
    console.error('Error fetching address transfers:', error);
    throw error;
  }
}

// Query network statistics
async function getNetworkStats() {
  const query = gql\`
    query dogeStats {
      dogecoin {
        blocks(options: { limit: 1, desc: "height" }) {
          height
          timestamp {
            time
          }
          transactionCount
        }
        transactions(options: { limit: 1, desc: "block.timestamp.time" }) {
          count
        }
      }
    }
  \`;

  try {
    const headers = { 'X-API-KEY': BITQUERY_API_KEY };
    const data = await request(BITQUERY_ENDPOINT, query, undefined, headers);
    
    console.log('Dogecoin Network Stats:', data.dogecoin);
    return data.dogecoin;
  } catch (error) {
    console.error('Error fetching network stats:', error);
    throw error;
  }
}

// Query transaction details
async function getTransaction(txHash: string) {
  const query = gql\`
    query transaction {
      dogecoin {
        transactions(txHash: { is: "\${txHash}" }) {
          hash
          block {
            height
            timestamp {
              time
            }
          }
          inputValue
          outputValue
          fee
          feeValue
          inputs {
            address {
              address
            }
            value
          }
          outputs {
            address {
              address
            }
            value
          }
        }
      }
    }
  \`;

  try {
    const headers = { 'X-API-KEY': BITQUERY_API_KEY };
    const data = await request(BITQUERY_ENDPOINT, query, undefined, headers);
    
    console.log('Transaction Details:', data.dogecoin.transactions[0]);
    return data.dogecoin.transactions[0];
  } catch (error) {
    console.error('Error fetching transaction:', error);
    throw error;
  }
}

// Query DEX trades (for wrapped DOGE on DEXs)
async function getDEXTrades(limit: number = 10) {
  const query = gql\`
    query dexTrades {
      ethereum {
        dexTrades(
          baseCurrency: { is: "WRAPPED_DOGE_ADDRESS" }
          options: { limit: \${limit}, desc: "block.timestamp.time" }
        ) {
          block {
            timestamp {
              time
            }
          }
          buyCurrency {
            symbol
            address
          }
          sellCurrency {
            symbol
            address
          }
          buyAmount
          sellAmount
          price
          transaction {
            hash
          }
          exchange {
            fullName
          }
        }
      }
    }
  \`;

  try {
    const headers = { 'X-API-KEY': BITQUERY_API_KEY };
    const data = await request(BITQUERY_ENDPOINT, query, undefined, headers);
    
    console.log('DEX Trades:', data.ethereum.dexTrades);
    return data.ethereum.dexTrades;
  } catch (error) {
    console.error('Error fetching DEX trades:', error);
    throw error;
  }
}

// Usage
getRecentTransfers(10).then(transfers => console.log('Recent Transfers:', transfers));
getAddressBalance('YOUR_DOGE_ADDRESS').then(balance => console.log('Balance:', balance));
getNetworkStats().then(stats => console.log('Network Stats:', stats));
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/Bitquery_io",
    telegram: "https://t.me/Bloxy_info",
    discord: "https://discord.gg/bitquery",
    linkedin: "https://www.linkedin.com/company/bitquery/",
    github: "https://github.com/bitquery",
  },
  
  features: {
    graphQL: true,
    blockchainData: true,
    realTime: true,
    historicalData: true,
    dexData: true,
    addressTracking: true,
    transactionData: true,
  },
  
  supportedData: [
    "Dogecoin transfers and transactions",
    "Address balances",
    "Transaction history",
    "Block data",
    "Network statistics",
    "DEX trades (for wrapped DOGE)",
    "Input/output data",
    "Fee information",
  ],
  
  dataAggregation: {
    source: "Dogecoin blockchain",
    updateFrequency: "Real-time blockchain indexing",
    methodology: "Direct blockchain data extraction",
  },
  
  notes: [
    "Requires API key (free tier available)",
    "GraphQL-based queries for flexible data retrieval",
    "Real-time and historical blockchain data",
    "Address balance and transaction tracking",
    "DEX trade data for wrapped DOGE on other chains",
    "Comprehensive blockchain explorer",
    "Supports complex queries and filters",
    "Used for blockchain analytics and monitoring",
    "Rate limits based on subscription tier",
    "Explorer available at explorer.bitquery.io",
  ],
  
  useCases: [
    "Blockchain analytics",
    "Address monitoring",
    "Transaction tracking",
    "DEX trade analysis (wrapped DOGE)",
    "Network statistics",
    "Wallet integration",
    "Compliance and AML",
  ],
  
  queryExamples: {
    transfers: "Query recent transfers with amount, sender, receiver",
    addressBalance: "Get balance for specific Dogecoin address",
    addressTransfers: "Get transfer history for an address",
    networkStats: "Get latest block height and transaction count",
    transaction: "Get detailed transaction information by hash",
    dexTrades: "Query DEX trades for wrapped DOGE tokens",
  },
};

