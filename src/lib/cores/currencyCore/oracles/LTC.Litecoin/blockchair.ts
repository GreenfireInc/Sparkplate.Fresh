// Blockchair - Multi-Chain Block Explorer for Litecoin
// Comprehensive blockchain data with free API access

export const blockchairOracle = {
  name: 'Blockchair',
  blockchain: 'Litecoin (LTC)',
  type: 'Block Explorer & API',
  
  description: `Blockchair is a multi-chain blockchain explorer providing comprehensive Litecoin blockchain data through REST APIs. With 1,000 free requests per day without an API key, Blockchair offers access to blocks, transactions, addresses, UTXO data, mempool information, and network statistics for Litecoin.`,

  features: [
    '1,000 free requests per day (no API key)',
    'Comprehensive blockchain data',
    'UTXO tracking',
    'Address balance queries',
    'Transaction history',
    'Block information',
    'Mempool data',
    'Network statistics',
  ],

  api: {
    website: 'https://blockchair.com/litecoin',
    documentation: 'https://blockchair.com/api/docs',
    apiEndpoint: 'https://api.blockchair.com/litecoin/',
    dashboard: 'https://blockchair.com/litecoin/charts',
  },

  sdk: {
    primaryPackage: 'axios (REST API)',
    installCommand: 'npm install axios',
    supportedLanguages: ['TypeScript', 'JavaScript', 'Python', 'PHP', 'Go'],
  },

  socialMedia: {
    website: 'https://blockchair.com/',
    twitter: 'https://twitter.com/Blockchair',
    telegram: 'https://t.me/Blockchair',
    github: 'https://github.com/Blockchair',
  },

  useCases: [
    'Address balance tracking',
    'Transaction history queries',
    'UTXO management',
    'Block explorer integrations',
    'Wallet applications',
    'Payment processors',
    'Analytics dashboards',
  ],

  integration: {
    example: `
import axios from 'axios';

/**
 * Blockchair Integration for Litecoin
 * Comprehensive blockchain data access
 */

const BLOCKCHAIR_API = {
  baseUrl: 'https://api.blockchair.com/litecoin',
  dashboards: '/dashboards',
  stats: '/stats',
  raw: '/raw',
};

/**
 * Get address information
 */
async function getAddressInfo(address: string) {
  try {
    const response = await axios.get(
      \`\${BLOCKCHAIR_API.baseUrl}\${BLOCKCHAIR_API.dashboards}/address/\${address}\`
    );

    const data = response.data.data[address];

    console.log(\`Address: \${address}\`);
    console.log(\`  Balance: \${data.address.balance / 100000000} LTC\`);
    console.log(\`  Received: \${data.address.received / 100000000} LTC\`);
    console.log(\`  Sent: \${data.address.spent / 100000000} LTC\`);
    console.log(\`  Transaction Count: \${data.address.transaction_count}\`);

    return {
      address,
      balance: data.address.balance / 100000000,
      received: data.address.received / 100000000,
      sent: data.address.spent / 100000000,
      transactionCount: data.address.transaction_count,
      utxoCount: data.address.unspent_output_count,
    };
  } catch (error) {
    console.error('Error fetching address info:', error);
    throw error;
  }
}

/**
 * Get transaction details
 */
async function getTransactionInfo(txHash: string) {
  try {
    const response = await axios.get(
      \`\${BLOCKCHAIR_API.baseUrl}\${BLOCKCHAIR_API.dashboards}/transaction/\${txHash}\`
    );

    const data = response.data.data[txHash];

    console.log(\`Transaction: \${txHash}\`);
    console.log(\`  Block: \${data.transaction.block_id}\`);
    console.log(\`  Time: \${new Date(data.transaction.time)}\`);
    console.log(\`  Value: \${data.transaction.output_total / 100000000} LTC\`);
    console.log(\`  Fee: \${data.transaction.fee / 100000000} LTC\`);

    return {
      hash: txHash,
      blockId: data.transaction.block_id,
      time: new Date(data.transaction.time),
      value: data.transaction.output_total / 100000000,
      fee: data.transaction.fee / 100000000,
      inputs: data.inputs,
      outputs: data.outputs,
    };
  } catch (error) {
    console.error('Error fetching transaction info:', error);
    throw error;
  }
}

/**
 * Get block information
 */
async function getBlockInfo(blockHeight: number) {
  try {
    const response = await axios.get(
      \`\${BLOCKCHAIR_API.baseUrl}\${BLOCKCHAIR_API.dashboards}/block/\${blockHeight}\`
    );

    const data = response.data.data[blockHeight];

    console.log(\`Block: \${blockHeight}\`);
    console.log(\`  Hash: \${data.block.hash}\`);
    console.log(\`  Time: \${new Date(data.block.time)}\`);
    console.log(\`  Transactions: \${data.block.transaction_count}\`);
    console.log(\`  Size: \${data.block.size} bytes\`);

    return {
      height: blockHeight,
      hash: data.block.hash,
      time: new Date(data.block.time),
      transactionCount: data.block.transaction_count,
      size: data.block.size,
      difficulty: data.block.difficulty,
    };
  } catch (error) {
    console.error('Error fetching block info:', error);
    throw error;
  }
}

/**
 * Get Litecoin network statistics
 */
async function getNetworkStats() {
  try {
    const response = await axios.get(\`\${BLOCKCHAIR_API.baseUrl}\${BLOCKCHAIR_API.stats}\`);

    const data = response.data.data;

    console.log('Litecoin Network Statistics:');
    console.log(\`  Blocks: \${data.blocks}\`);
    console.log(\`  Transactions: \${data.transactions}\`);
    console.log(\`  Circulation: \${data.circulation / 100000000} LTC\`);
    console.log(\`  Market Price: $\${data.market_price_usd}\`);
    console.log(\`  Market Cap: $\${data.market_cap_usd.toLocaleString()}\`);
    console.log(\`  Hashrate: \${data.hashrate_24h}\`);

    return {
      blocks: data.blocks,
      transactions: data.transactions,
      circulation: data.circulation / 100000000,
      marketPrice: data.market_price_usd,
      marketCap: data.market_cap_usd,
      hashrate: data.hashrate_24h,
      difficulty: data.difficulty,
    };
  } catch (error) {
    console.error('Error fetching network stats:', error);
    throw error;
  }
}

/**
 * Get mempool information
 */
async function getMempoolInfo() {
  try {
    const response = await axios.get(\`\${BLOCKCHAIR_API.baseUrl}\${BLOCKCHAIR_API.stats}\`);

    const data = response.data.data;

    console.log('Litecoin Mempool:');
    console.log(\`  Transactions: \${data.mempool_transactions}\`);
    console.log(\`  Size: \${data.mempool_size} bytes\`);
    console.log(\`  Total Fees: \${data.mempool_total_fee_usd} USD\`);

    return {
      transactions: data.mempool_transactions,
      size: data.mempool_size,
      totalFeeUSD: data.mempool_total_fee_usd,
    };
  } catch (error) {
    console.error('Error fetching mempool info:', error);
    throw error;
  }
}

/**
 * Get UTXO set for an address
 */
async function getAddressUTXOs(address: string) {
  try {
    const response = await axios.get(
      \`\${BLOCKCHAIR_API.baseUrl}\${BLOCKCHAIR_API.dashboards}/address/\${address}\`
    );

    const data = response.data.data[address];
    const utxos = data.utxo || [];

    console.log(\`UTXOs for \${address}: \${utxos.length}\`);

    return utxos.map((utxo: any) => ({
      transactionHash: utxo.transaction_hash,
      index: utxo.index,
      value: utxo.value / 100000000,
      blockId: utxo.block_id,
    }));
  } catch (error) {
    console.error('Error fetching UTXOs:', error);
    throw error;
  }
}

/**
 * Search for transactions by address
 */
async function getAddressTransactions(address: string, limit: number = 10) {
  try {
    const response = await axios.get(
      \`\${BLOCKCHAIR_API.baseUrl}\${BLOCKCHAIR_API.dashboards}/address/\${address}\`,
      {
        params: {
          limit,
          offset: 0,
        },
      }
    );

    const data = response.data.data[address];
    const transactions = data.transactions || [];

    console.log(\`Recent transactions for \${address}: \${transactions.length}\`);

    return transactions.map((tx: any) => ({
      hash: tx.hash,
      time: new Date(tx.time),
      value: tx.balance_change / 100000000,
    }));
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error;
  }
}

/**
 * Get richest addresses
 */
async function getRichList(limit: number = 100) {
  try {
    const response = await axios.get(
      \`\${BLOCKCHAIR_API.baseUrl}/addresses\`,
      {
        params: {
          s: 'balance(desc)',
          limit,
        },
      }
    );

    const addresses = response.data.data;

    console.log(\`Top \${limit} richest LTC addresses:\`);
    addresses.slice(0, 10).forEach((addr: any, index: number) => {
      console.log(\`\${index + 1}. \${addr.address}: \${addr.balance / 100000000} LTC\`);
    });

    return addresses;
  } catch (error) {
    console.error('Error fetching rich list:', error);
    throw error;
  }
}

// Example usage
async function main() {
  console.log('Fetching Litecoin data from Blockchair...\\n');

  const stats = await getNetworkStats();
  console.log('\\nNetwork Stats:', stats);

  const mempool = await getMempoolInfo();
  console.log('\\nMempool Info:', mempool);

  // Example address (replace with actual address)
  const exampleAddress = 'LTC_ADDRESS_HERE';
  // const addressInfo = await getAddressInfo(exampleAddress);
  // console.log('\\nAddress Info:', addressInfo);
}

export {
  getAddressInfo,
  getTransactionInfo,
  getBlockInfo,
  getNetworkStats,
  getMempoolInfo,
  getAddressUTXOs,
  getAddressTransactions,
  getRichList,
};
    `.trim(),
  },

  notes: [
    '1,000 free requests per day (no API key required)',
    'Comprehensive UTXO blockchain data',
    'Multi-chain support',
    'REST API with JSON responses',
    'Real-time mempool tracking',
    'Address balance queries',
    'Transaction history',
    'Network statistics and charts',
  ],

  limitations: [
    'Rate limits on free tier (1,000 req/day)',
    'Paid plans required for higher limits',
    'No WebSocket streaming',
    'API response may have slight delay',
  ],

  alternatives: [
    'BlockCypher (webhooks available)',
    'Litecoin Space (official explorer)',
    'SoChain (fast API)',
    'CryptoAPIs (unified API)',
  ],
};

