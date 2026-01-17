// BlockCypher - Blockchain API for Dogecoin
// Type: Blockchain Explorer API
// Blockchain: Dogecoin (DOGE)

export const blockcypherOracle = {
  name: "BlockCypher",
  blockchain: "Dogecoin (DOGE)",
  type: "Blockchain Explorer API",
  description: "Blockchain API compatible with Dogecoin mainnet through unified API. Provides access to blockchain data, transactions, addresses, and blocks with webhooks support.",
  
  url: "https://www.blockcypher.com/",
  dogecoinExplorer: "https://live.blockcypher.com/doge/",
  docs: "https://www.blockcypher.com/dev/",
  
  api: {
    baseURL: "https://api.blockcypher.com/v1/doge/main",
    documentation: "https://www.blockcypher.com/dev/dogecoin/",
    rateLimit: "3 requests/second, 100 requests/hour (classic), 2000 requests/day (free tier)",
    webhooks: "200 webhooks/hour",
  },
  
  sdk: {
    npm: "axios",
    installation: "npm install axios",
    documentation: "https://www.blockcypher.com/dev/",
    features: [
      "Blockchain data access",
      "Address balance and transactions",
      "Transaction broadcasting",
      "Block information",
      "Webhook notifications",
      "UTXO queries",
    ],
  },
  
  integration: {
    example: `
// BlockCypher API Integration Example for Dogecoin
import axios from 'axios';

const BLOCKCYPHER_BASE = 'https://api.blockcypher.com/v1/doge/main';

// Get blockchain info
async function getBlockchainInfo() {
  try {
    const response = await axios.get(BLOCKCYPHER_BASE);
    
    console.log('Dogecoin Blockchain Info:', {
      name: response.data.name,
      height: response.data.height,
      hash: response.data.hash,
      time: new Date(response.data.time).toISOString(),
      latest_url: response.data.latest_url,
      previous_hash: response.data.previous_hash,
      peer_count: response.data.peer_count,
      unconfirmed_count: response.data.unconfirmed_count,
      high_fee_per_kb: response.data.high_fee_per_kb,
      medium_fee_per_kb: response.data.medium_fee_per_kb,
      low_fee_per_kb: response.data.low_fee_per_kb,
    });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching blockchain info:', error);
    throw error;
  }
}

// Get address balance and transactions
async function getAddress(address: string) {
  try {
    const response = await axios.get(\`\${BLOCKCYPHER_BASE}/addrs/\${address}/balance\`);
    
    console.log(\`Address \${address}:\`, {
      address: response.data.address,
      balance: response.data.balance / 100000000, // Convert from satoshis to DOGE
      unconfirmed_balance: response.data.unconfirmed_balance / 100000000,
      final_balance: response.data.final_balance / 100000000,
      n_tx: response.data.n_tx,
      unconfirmed_n_tx: response.data.unconfirmed_n_tx,
      final_n_tx: response.data.final_n_tx,
    });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching address:', error);
    throw error;
  }
}

// Get full address details with transactions
async function getAddressFull(address: string, limit: number = 50) {
  try {
    const response = await axios.get(
      \`\${BLOCKCYPHER_BASE}/addrs/\${address}/full?limit=\${limit}\`
    );
    
    const data = response.data;
    console.log(\`Full Address Data for \${address}:\`, {
      balance: data.balance / 100000000,
      total_received: data.total_received / 100000000,
      total_sent: data.total_sent / 100000000,
      n_tx: data.n_tx,
      transactions: data.txs.length,
    });
    
    return data;
  } catch (error) {
    console.error('Error fetching full address data:', error);
    throw error;
  }
}

// Get transaction details
async function getTransaction(txHash: string) {
  try {
    const response = await axios.get(\`\${BLOCKCYPHER_BASE}/txs/\${txHash}\`);
    
    const tx = response.data;
    console.log('Transaction:', {
      hash: tx.hash,
      block_height: tx.block_height,
      confirmed: new Date(tx.confirmed).toISOString(),
      received: new Date(tx.received).toISOString(),
      total: tx.total / 100000000,
      fees: tx.fees / 100000000,
      inputs: tx.inputs.length,
      outputs: tx.outputs.length,
      confirmations: tx.confirmations,
    });
    
    return tx;
  } catch (error) {
    console.error('Error fetching transaction:', error);
    throw error;
  }
}

// Get block information
async function getBlock(blockHash: string) {
  try {
    const response = await axios.get(\`\${BLOCKCYPHER_BASE}/blocks/\${blockHash}\`);
    
    const block = response.data;
    console.log('Block:', {
      hash: block.hash,
      height: block.height,
      chain: block.chain,
      total: block.total / 100000000,
      fees: block.fees / 100000000,
      time: new Date(block.time).toISOString(),
      n_tx: block.n_tx,
      prev_block: block.prev_block,
      next_txids: block.next_txids,
    });
    
    return block;
  } catch (error) {
    console.error('Error fetching block:', error);
    throw error;
  }
}

// Get block by height
async function getBlockByHeight(height: number) {
  try {
    const response = await axios.get(\`\${BLOCKCYPHER_BASE}/blocks/\${height}\`);
    
    console.log(\`Block at height \${height}:\`, response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching block by height:', error);
    throw error;
  }
}

// Get unconfirmed transactions
async function getUnconfirmedTransactions() {
  try {
    const response = await axios.get(\`\${BLOCKCYPHER_BASE}/txs\`);
    
    console.log('Unconfirmed Transactions:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching unconfirmed transactions:', error);
    throw error;
  }
}

// Broadcast transaction (raw hex)
async function broadcastTransaction(rawTxHex: string) {
  try {
    const response = await axios.post(\`\${BLOCKCYPHER_BASE}/txs/push\`, {
      tx: rawTxHex
    });
    
    console.log('Transaction broadcast:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error broadcasting transaction:', error);
    throw error;
  }
}

// Create webhook for address monitoring
async function createWebhook(address: string, webhookUrl: string, event: string = 'tx-confirmation') {
  try {
    const response = await axios.post(\`\${BLOCKCYPHER_BASE}/hooks\`, {
      event,
      address,
      url: webhookUrl
    });
    
    console.log('Webhook created:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating webhook:', error);
    throw error;
  }
}

// Usage
getBlockchainInfo().then(info => console.log('Blockchain:', info));
getAddress('YOUR_DOGE_ADDRESS').then(addr => console.log('Address:', addr));
getTransaction('TX_HASH').then(tx => console.log('Transaction:', tx));
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/blockcypher",
    github: "https://github.com/blockcypher",
    blog: "https://blog.blockcypher.com/",
  },
  
  features: {
    blockchainData: true,
    addressTracking: true,
    transactionBroadcast: true,
    webhooks: true,
    utxoQueries: true,
    feeEstimates: true,
    realTime: true,
  },
  
  supportedData: [
    "Blockchain statistics (height, hash, peers)",
    "Address balances and transaction history",
    "Transaction details and confirmations",
    "Block information",
    "Unconfirmed transactions (mempool)",
    "Fee estimates (high, medium, low)",
    "UTXO data",
  ],
  
  rateLimits: {
    classic: {
      requestsPerSecond: 3,
      requestsPerHour: 100,
      webhooksPerHour: 200,
    },
    free: {
      requestsPerDay: 2000,
      webhooksPerHour: 200,
    },
  },
  
  notes: [
    "Compatible with Dogecoin mainnet",
    "Free tier: 2000 requests/day",
    "Classic tier: 3 req/sec, 100 req/hour",
    "Webhook support for real-time notifications",
    "Transaction broadcasting capability",
    "Fee estimation for optimal transaction fees",
    "UTXO queries for wallet applications",
    "Block and transaction exploration",
    "Address monitoring and tracking",
    "API tokens available for higher limits",
  ],
  
  useCases: [
    "Wallet balance checking",
    "Transaction monitoring",
    "Transaction broadcasting",
    "Address tracking with webhooks",
    "Block explorer integration",
    "Fee estimation for transactions",
    "UTXO management",
  ],
  
  apiEndpoints: {
    blockchain: "/",
    addressBalance: "/addrs/{address}/balance",
    addressFull: "/addrs/{address}/full",
    transaction: "/txs/{txHash}",
    block: "/blocks/{blockHash}",
    blockByHeight: "/blocks/{height}",
    unconfirmedTxs: "/txs",
    broadcastTx: "/txs/push",
    createWebhook: "/hooks",
  },
  
  webhookEvents: [
    "unconfirmed-tx",
    "new-block",
    "confirmed-tx",
    "tx-confirmation",
    "double-spend-tx",
  ],
};

