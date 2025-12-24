// Subscan - Blockchain Explorer API for Polkadot
// Type: Block Explorer API
// Blockchain: Polkadot (DOT) and Substrate chains

export const subscanOracle = {
  name: "Subscan",
  fullName: "Subscan Block Explorer",
  blockchain: "Polkadot (DOT) and Substrate ecosystem",
  type: "Block Explorer API",
  description: "Comprehensive blockchain explorer focused on the Substrate ecosystem. Provides detailed insights into blocks, transactions, addresses, and more for Polkadot and nearly 100 Substrate-based networks.",
  
  url: "https://polkadot.subscan.io/",
  mainSite: "https://subscan.io/",
  docs: "https://support.subscan.io/",
  
  api: {
    baseURL: "https://polkadot.api.subscan.io/api",
    documentation: "https://support.subscan.io/",
    postmanDocs: "https://documenter.getpostman.com/view/1618960/TVCe1oRU",
    rateLimit: "Free API key with quotas, higher quotas with paid plans",
    requiresAuth: true,
  },
  
  sdk: {
    npm: "axios",
    installation: "npm install axios",
    documentation: "https://support.subscan.io/",
    features: [
      "Block and transaction data",
      "Address balance and history",
      "Extrinsic details",
      "Event tracking",
      "Staking information",
      "Transfer history",
      "Network statistics",
    ],
  },
  
  integration: {
    example: `
// Subscan API Integration for Polkadot
import axios from 'axios';

const SUBSCAN_API_BASE = 'https://polkadot.api.subscan.io/api';
const SUBSCAN_API_KEY = 'YOUR_API_KEY'; // Get from subscan.io

// Create axios instance with auth header
const subscanApi = axios.create({
  baseURL: SUBSCAN_API_BASE,
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': SUBSCAN_API_KEY,
  },
});

// Get account balance
async function getAccountBalance(address: string) {
  try {
    const response = await subscanApi.post('/scan/account/balance', {
      address,
    });
    
    const data = response.data.data;
    console.log(\`Balance for \${address}:\`, {
      balance: data.balance,
      lock: data.lock,
      reserved: data.reserved,
      available: data.balance - data.lock - data.reserved,
    });
    
    return data;
  } catch (error) {
    console.error('Error fetching account balance:', error);
    throw error;
  }
}

// Get account transfers
async function getAccountTransfers(address: string, page: number = 0, row: number = 20) {
  try {
    const response = await subscanApi.post('/scan/transfers', {
      address,
      page,
      row,
    });
    
    const data = response.data.data;
    console.log(\`Transfers for \${address}:\`, {
      count: data.count,
      transfers: data.transfers.length,
    });
    
    return data.transfers;
  } catch (error) {
    console.error('Error fetching account transfers:', error);
    throw error;
  }
}

// Get block information
async function getBlock(blockNumber: number) {
  try {
    const response = await subscanApi.post('/scan/block', {
      block_num: blockNumber,
    });
    
    const block = response.data.data;
    console.log(\`Block \${blockNumber}:\`, {
      hash: block.hash,
      timestamp: new Date(block.block_timestamp * 1000).toISOString(),
      extrinsics_count: block.extrinsics_count,
      events_count: block.events_count,
      validator: block.validator,
    });
    
    return block;
  } catch (error) {
    console.error('Error fetching block:', error);
    throw error;
  }
}

// Get latest blocks
async function getLatestBlocks(row: number = 10) {
  try {
    const response = await subscanApi.post('/scan/blocks', {
      row,
    });
    
    const blocks = response.data.data.blocks;
    console.log('Latest Blocks:', blocks.slice(0, 3));
    
    return blocks;
  } catch (error) {
    console.error('Error fetching latest blocks:', error);
    throw error;
  }
}

// Get extrinsic details
async function getExtrinsic(extrinsicHash: string) {
  try {
    const response = await subscanApi.post('/scan/extrinsic', {
      hash: extrinsicHash,
    });
    
    const extrinsic = response.data.data;
    console.log('Extrinsic:', {
      hash: extrinsic.hash,
      blockNum: extrinsic.block_num,
      success: extrinsic.success,
      callModule: extrinsic.call_module,
      callModuleFunction: extrinsic.call_module_function,
    });
    
    return extrinsic;
  } catch (error) {
    console.error('Error fetching extrinsic:', error);
    throw error;
  }
}

// Get network metadata
async function getMetadata() {
  try {
    const response = await subscanApi.post('/scan/metadata');
    
    const metadata = response.data.data;
    console.log('Network Metadata:', {
      blockNum: metadata.blockNum,
      blockTime: metadata.blockTime,
      networkNode: metadata.networkNode,
      token: metadata.token,
      tokenDecimals: metadata.tokenDecimals,
      tokenSymbol: metadata.tokenSymbol,
    });
    
    return metadata;
  } catch (error) {
    console.error('Error fetching metadata:', error);
    throw error;
  }
}

// Get staking information
async function getStakingInfo(address: string) {
  try {
    const response = await subscanApi.post('/scan/staking/validator', {
      address,
    });
    
    const staking = response.data.data;
    console.log('Staking Info:', staking);
    
    return staking;
  } catch (error) {
    console.error('Error fetching staking info:', error);
    throw error;
  }
}

// Search for address, block, or extrinsic
async function search(query: string) {
  try {
    const response = await subscanApi.post('/scan/search', {
      key: query,
    });
    
    const result = response.data.data;
    console.log('Search Result:', result);
    
    return result;
  } catch (error) {
    console.error('Error searching:', error);
    throw error;
  }
}

// Get price data (if available)
async function getDOTPrice() {
  try {
    const response = await subscanApi.post('/scan/price/converter', {
      value: '1',
      from: 'DOT',
      to: 'USD',
    });
    
    const priceData = response.data.data;
    console.log('DOT Price:', priceData);
    
    return priceData;
  } catch (error) {
    console.error('Error fetching DOT price:', error);
    throw error;
  }
}

// Get daily statistics
async function getDailyStats(start: string, end: string) {
  try {
    const response = await subscanApi.post('/scan/daily', {
      start,
      end,
      format: 'day',
      category: 'transfer',
    });
    
    const stats = response.data.data.list;
    console.log('Daily Statistics:', stats.slice(0, 5));
    
    return stats;
  } catch (error) {
    console.error('Error fetching daily stats:', error);
    throw error;
  }
}

// Get account tokens (if supported)
async function getAccountTokens(address: string) {
  try {
    const response = await subscanApi.post('/scan/multiChain/account', {
      address,
    });
    
    const tokens = response.data.data;
    console.log('Account Tokens:', tokens);
    
    return tokens;
  } catch (error) {
    console.error('Error fetching account tokens:', error);
    throw error;
  }
}

// Usage example
async function main() {
  console.log('=== Subscan API Integration Examples ===\\n');
  
  const exampleAddress = '1FRMM8PEiWXYax7rpS6X4XZX1aAAxSWx1CrKTyrVYhV24fg';
  
  // Get account balance
  const balance = await getAccountBalance(exampleAddress);
  console.log('Balance:', balance);
  
  // Get account transfers
  const transfers = await getAccountTransfers(exampleAddress, 0, 10);
  console.log('Recent Transfers:', transfers.length);
  
  // Get latest blocks
  const blocks = await getLatestBlocks(5);
  console.log('Latest Blocks:', blocks.length);
  
  // Get network metadata
  const metadata = await getMetadata();
  console.log('Metadata:', metadata);
  
  // Get DOT price
  const price = await getDOTPrice();
  console.log('DOT Price:', price);
  
  // Search functionality
  const searchResult = await search(exampleAddress);
  console.log('Search Result:', searchResult);
}

main().catch(console.error);
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/subscan_io",
    telegram: "https://t.me/subscan_io",
    github: "https://github.com/itering/subscan",
  },
  
  features: {
    blockchainData: true,
    addressTracking: true,
    transactionHistory: true,
    stakingInfo: true,
    extrinsics: true,
    events: true,
    multiNetwork: true,
    priceData: true,
  },
  
  supportedData: [
    "Account balances and history",
    "Block information",
    "Transaction/transfer history",
    "Extrinsic details",
    "Event data",
    "Staking information",
    "Validator data",
    "Network statistics",
    "Price conversion data",
    "Daily statistics",
  ],
  
  supportedNetworks: [
    "Polkadot",
    "Kusama",
    "Nearly 100 Substrate-based chains",
    "Parachains",
    "Relay chains",
  ],
  
  notes: [
    "Most comprehensive Substrate ecosystem explorer",
    "Supports Polkadot and ~100 Substrate networks",
    "Free API key with rate limits",
    "Paid plans for higher quotas",
    "Well-documented REST API",
    "Postman collection available",
    "Block, transaction, and address insights",
    "Staking and validator tracking",
    "Multi-chain account viewing",
    "Price conversion data",
  ],
  
  useCases: [
    "Wallet balance checking",
    "Transaction monitoring",
    "Block exploration",
    "Address tracking",
    "Staking analytics",
    "Network statistics",
    "Multi-chain account management",
  ],
  
  apiEndpoints: {
    accountBalance: "/scan/account/balance",
    transfers: "/scan/transfers",
    block: "/scan/block",
    blocks: "/scan/blocks",
    extrinsic: "/scan/extrinsic",
    metadata: "/scan/metadata",
    search: "/scan/search",
    priceConverter: "/scan/price/converter",
    dailyStats: "/scan/daily",
    stakingValidator: "/scan/staking/validator",
  },
  
  pricing: {
    free: "Free tier with API key",
    pro: "https://pro.subscan.io/pricing",
    features: "Higher rate limits and additional features in paid plans",
  },
  
  tools: {
    addressConverter: "https://polkadot.subscan.io/tools/format_transform",
    website: "https://subscan.io/",
  },
};

