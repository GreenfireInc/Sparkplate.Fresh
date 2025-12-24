// Blockscout Explorer - Ethereum Classic Blockchain Explorer API
// Official open-source block explorer for Ethereum Classic with comprehensive API

export const blockscoutOracle = {
  name: 'Blockscout',
  blockchain: 'Ethereum Classic (ETC)',
  type: 'Blockchain Explorer & API',
  
  description: `Blockscout is the official open-source block explorer for Ethereum Classic, providing comprehensive blockchain data through REST and GraphQL APIs. It offers Etherscan-compatible API endpoints, making it easy for developers to transition and access transaction, address, contract, and network data.`,

  features: [
    'Official Ethereum Classic blockchain explorer',
    'Etherscan-compatible API endpoints',
    'REST and GraphQL API support',
    'Real-time blockchain data',
    'Transaction and address tracking',
    'Smart contract verification',
    'Token information and transfers',
    'Network statistics and analytics',
    'WebSocket support for real-time updates',
  ],

  api: {
    baseUrl: 'https://etc.blockscout.com',
    apiEndpoint: 'https://etc.blockscout.com/api',
    graphqlEndpoint: 'https://etc.blockscout.com/api/eth/v1/graphql',
    documentation: 'https://etc.blockscout.com/api-docs',
    explorerUrl: 'https://etc.blockscout.com/',
    rateLimit: 'Free with rate limits (upgrade available)',
  },

  sdk: {
    primaryPackage: 'axios (for REST) or graphql-request (for GraphQL)',
    installCommand: 'npm install axios graphql-request graphql',
    supportedLanguages: ['TypeScript', 'JavaScript'],
    compatibility: 'Etherscan API compatible',
  },

  socialMedia: {
    website: 'https://blockscout.com/',
    github: 'https://github.com/blockscout/blockscout',
    twitter: 'https://twitter.com/blockscoutcom',
    discord: 'N/A',
    telegram: 'N/A',
  },

  useCases: [
    'Blockchain data queries for wallets',
    'Transaction history tracking',
    'Address balance and token information',
    'Smart contract interaction and verification',
    'Network statistics and monitoring',
    'Token transfer tracking',
    'Block and transaction analysis',
  ],

  integration: {
    example: `
import axios from 'axios';
import { request, gql } from 'graphql-request';

/**
 * Blockscout Explorer API Integration for Ethereum Classic
 */

const BLOCKSCOUT_API = {
  baseUrl: 'https://etc.blockscout.com',
  restApi: 'https://etc.blockscout.com/api',
  graphqlApi: 'https://etc.blockscout.com/api/eth/v1/graphql',
};

/**
 * REST API Examples
 */

// Get account balance
async function getAccountBalance(address: string): Promise<string> {
  try {
    const response = await axios.get(BLOCKSCOUT_API.restApi, {
      params: {
        module: 'account',
        action: 'balance',
        address: address,
      },
    });
    
    const balanceWei = response.data.result;
    const balanceETC = parseFloat(balanceWei) / 1e18;
    
    console.log(\`Balance for \${address}: \${balanceETC} ETC\`);
    return balanceETC.toString();
  } catch (error) {
    console.error('Error fetching balance:', error);
    throw error;
  }
}

// Get transaction list for an address
async function getTransactionList(
  address: string,
  startBlock: number = 0,
  endBlock: number = 99999999,
  page: number = 1,
  offset: number = 10
) {
  try {
    const response = await axios.get(BLOCKSCOUT_API.restApi, {
      params: {
        module: 'account',
        action: 'txlist',
        address: address,
        startblock: startBlock,
        endblock: endBlock,
        page: page,
        offset: offset,
        sort: 'desc',
      },
    });
    
    console.log(\`Transactions for \${address}:\`, response.data.result.length);
    return response.data.result;
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error;
  }
}

// Get ERC-20 token transfers
async function getTokenTransfers(
  address: string,
  contractAddress?: string
) {
  try {
    const params: any = {
      module: 'account',
      action: 'tokentx',
      address: address,
    };
    
    if (contractAddress) {
      params.contractaddress = contractAddress;
    }
    
    const response = await axios.get(BLOCKSCOUT_API.restApi, { params });
    
    console.log('Token transfers:', response.data.result.length);
    return response.data.result;
  } catch (error) {
    console.error('Error fetching token transfers:', error);
    throw error;
  }
}

// Get transaction status
async function getTransactionStatus(txHash: string) {
  try {
    const response = await axios.get(BLOCKSCOUT_API.restApi, {
      params: {
        module: 'transaction',
        action: 'gettxreceiptstatus',
        txhash: txHash,
      },
    });
    
    return {
      status: response.data.result.status,
      isSuccessful: response.data.result.status === '1',
    };
  } catch (error) {
    console.error('Error checking transaction status:', error);
    throw error;
  }
}

/**
 * GraphQL API Examples
 */

// Get latest blocks using GraphQL
async function getLatestBlocks(limit: number = 10) {
  const query = gql\`
    query GetLatestBlocks($limit: Int!) {
      blocks(options: { limit: $limit, desc: "number" }) {
        number
        hash
        timestamp {
          time
        }
        miner {
          hash
        }
        transactionCount
      }
    }
  \`;
  
  try {
    const data = await request(BLOCKSCOUT_API.graphqlApi, query, { limit });
    console.log('Latest blocks:', data.blocks);
    return data.blocks;
  } catch (error) {
    console.error('Error fetching latest blocks:', error);
    throw error;
  }
}

// Get address information with GraphQL
async function getAddressInfo(address: string) {
  const query = gql\`
    query GetAddress($hash: AddressHash!) {
      address(hash: $hash) {
        hash
        fetchedCoinBalance
        transactionCount
        contractCode
      }
    }
  \`;
  
  try {
    const data = await request(BLOCKSCOUT_API.graphqlApi, query, {
      hash: address,
    });
    console.log('Address info:', data.address);
    return data.address;
  } catch (error) {
    console.error('Error fetching address info:', error);
    throw error;
  }
}

// Example usage
async function main() {
  const testAddress = '0x742d35Cc6634C0532925a3b844Bc454e4438f44e';
  
  console.log('Fetching ETC blockchain data from Blockscout...');
  
  const balance = await getAccountBalance(testAddress);
  console.log(\`Balance: \${balance} ETC\`);
  
  const transactions = await getTransactionList(testAddress, 0, 99999999, 1, 5);
  console.log(\`Transaction count: \${transactions.length}\`);
  
  const blocks = await getLatestBlocks(5);
  console.log(\`Latest blocks retrieved: \${blocks.length}\`);
}

export {
  getAccountBalance,
  getTransactionList,
  getTokenTransfers,
  getTransactionStatus,
  getLatestBlocks,
  getAddressInfo,
};
    `.trim(),
  },

  notes: [
    'Official Ethereum Classic blockchain explorer',
    'Open-source and community-maintained',
    'Etherscan-compatible API for easy migration',
    'Both REST and GraphQL APIs available',
    'Free access with rate limits',
    'Comprehensive blockchain data coverage',
    'Smart contract verification supported',
    'Real-time data updates',
  ],

  limitations: [
    'Rate limits on free tier',
    'No price feed data (blockchain data only)',
    'API keys may be required for higher rate limits',
  ],

  alternatives: [
    'BlockCypher (ETC support)',
    'Tokenview',
    'OKLink Explorer',
  ],
};

