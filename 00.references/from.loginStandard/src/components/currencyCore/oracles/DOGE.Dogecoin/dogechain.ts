// Dogechain API - Dogecoin Blockchain Explorer
// Type: Blockchain Explorer API
// Blockchain: Dogecoin (DOGE)

export const dogechainOracle = {
  name: "Dogechain",
  fullName: "Dogechain.info",
  blockchain: "Dogecoin (DOGE)",
  type: "Blockchain Explorer API",
  description: "Traditional block explorer for Dogecoin with free developer API. One of the oldest and most established Dogecoin explorers providing blockchain data access.",
  
  url: "https://dogechain.info/",
  docs: "https://dogechain.info/api",
  
  api: {
    baseURL: "https://dogechain.info/api/v1",
    documentation: "https://dogechain.info/api",
    rateLimit: "Free tier with developer API",
  },
  
  sdk: {
    npm: "axios",
    installation: "npm install axios",
    documentation: "https://dogechain.info/api",
    features: [
      "Address balance queries",
      "Transaction history",
      "Block information",
      "Network statistics",
      "Transaction broadcasting",
    ],
  },
  
  integration: {
    example: `
// Dogechain API Integration Example
import axios from 'axios';

const DOGECHAIN_BASE = 'https://dogechain.info/api/v1';

// Get address balance
async function getAddressBalance(address: string) {
  try {
    const response = await axios.get(\`\${DOGECHAIN_BASE}/address/balance/\${address}\`);
    
    const balance = parseFloat(response.data.balance);
    console.log(\`Address \${address} balance: \${balance} DOGE\`);
    
    return balance;
  } catch (error) {
    console.error('Error fetching address balance:', error);
    throw error;
  }
}

// Get address information with transactions
async function getAddressInfo(address: string) {
  try {
    const response = await axios.get(\`\${DOGECHAIN_BASE}/address/\${address}\`);
    
    const data = response.data;
    console.log('Address Info:', {
      address: data.address,
      balance: data.balance,
      received: data.received,
      sent: data.sent,
      transactions: data.transactions.length,
    });
    
    return data;
  } catch (error) {
    console.error('Error fetching address info:', error);
    throw error;
  }
}

// Get transaction details
async function getTransaction(txHash: string) {
  try {
    const response = await axios.get(\`\${DOGECHAIN_BASE}/transaction/\${txHash}\`);
    
    const tx = response.data.transaction;
    console.log('Transaction:', {
      hash: tx.txid,
      blockHeight: tx.block_no,
      time: new Date(tx.time * 1000).toISOString(),
      confirmations: tx.confirmations,
      totalInput: tx.total_input,
      totalOutput: tx.total_output,
      fee: tx.fee,
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
    const response = await axios.get(\`\${DOGECHAIN_BASE}/block/\${blockHash}\`);
    
    const block = response.data.block;
    console.log('Block:', {
      hash: block.hash,
      height: block.height,
      time: new Date(block.time * 1000).toISOString(),
      difficulty: block.difficulty,
      nonce: block.nonce,
      transactionCount: block.tx_count,
    });
    
    return block;
  } catch (error) {
    console.error('Error fetching block:', error);
    throw error;
  }
}

// Get best (latest) block
async function getBestBlock() {
  try {
    const response = await axios.get(\`\${DOGECHAIN_BASE}/block/best\`);
    
    const block = response.data.block;
    console.log('Best Block:', {
      hash: block.hash,
      height: block.height,
      time: new Date(block.time * 1000).toISOString(),
      difficulty: block.difficulty,
    });
    
    return block;
  } catch (error) {
    console.error('Error fetching best block:', error);
    throw error;
  }
}

// Get blockchain statistics
async function getBlockchainStats() {
  try {
    const response = await axios.get(\`\${DOGECHAIN_BASE}/blockchain/statistics\`);
    
    const stats = response.data;
    console.log('Blockchain Statistics:', {
      blockHeight: stats.block_count,
      difficulty: stats.difficulty,
      hashRate: stats.hash_rate,
      marketPriceUSD: stats.market_price_usd,
      totalCoins: stats.total_coins,
    });
    
    return stats;
  } catch (error) {
    console.error('Error fetching blockchain stats:', error);
    throw error;
  }
}

// Get unspent outputs for address
async function getUnspentOutputs(address: string) {
  try {
    const response = await axios.get(\`\${DOGECHAIN_BASE}/unspent/\${address}\`);
    
    const unspent = response.data.unspent_outputs;
    console.log(\`Unspent outputs for \${address}:\`, unspent.length);
    
    return unspent;
  } catch (error) {
    console.error('Error fetching unspent outputs:', error);
    throw error;
  }
}

// Get current DOGE price
async function getDOGEPrice() {
  try {
    const response = await axios.get(\`\${DOGECHAIN_BASE}/blockchain/statistics\`);
    
    const price = parseFloat(response.data.market_price_usd);
    console.log(\`DOGE Price: $\${price}\`);
    
    return {
      price,
      source: 'Dogechain',
      timestamp: new Date(),
    };
  } catch (error) {
    console.error('Error fetching DOGE price:', error);
    throw error;
  }
}

// Send raw transaction (broadcast)
async function sendRawTransaction(rawTxHex: string) {
  try {
    const response = await axios.post(
      \`\${DOGECHAIN_BASE}/pushtx\`,
      { tx: rawTxHex },
      { headers: { 'Content-Type': 'application/json' } }
    );
    
    console.log('Transaction broadcast:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error broadcasting transaction:', error);
    throw error;
  }
}

// Usage
getAddressBalance('YOUR_DOGE_ADDRESS').then(balance => console.log('Balance:', balance));
getAddressInfo('YOUR_DOGE_ADDRESS').then(info => console.log('Address Info:', info));
getTransaction('TX_HASH').then(tx => console.log('Transaction:', tx));
getBestBlock().then(block => console.log('Latest Block:', block));
getBlockchainStats().then(stats => console.log('Blockchain Stats:', stats));
getDOGEPrice().then(price => console.log('DOGE Price:', price));
    `,
  },
  
  socialMedia: {
    twitter: "N/A",
    github: "N/A",
  },
  
  features: {
    blockchainData: true,
    addressTracking: true,
    transactionHistory: true,
    blockExploration: true,
    priceData: true,
    networkStats: true,
    transactionBroadcast: true,
  },
  
  supportedData: [
    "Address balances",
    "Transaction history",
    "Block information",
    "Blockchain statistics (height, difficulty, hashrate)",
    "Market price (USD)",
    "Unspent outputs (UTXOs)",
    "Total coin supply",
  ],
  
  notes: [
    "One of the oldest and most established Dogecoin explorers",
    "Free developer API",
    "Simple REST API endpoints",
    "Address balance and transaction queries",
    "Block exploration",
    "Network statistics",
    "Transaction broadcasting",
    "Market price data included",
    "No API key required",
    "Rate limits may apply",
  ],
  
  useCases: [
    "Wallet balance checking",
    "Transaction verification",
    "Block exploration",
    "Address monitoring",
    "Transaction broadcasting",
    "Network statistics tracking",
    "Price monitoring",
  ],
  
  apiEndpoints: {
    addressBalance: "/address/balance/{address}",
    addressInfo: "/address/{address}",
    transaction: "/transaction/{txHash}",
    block: "/block/{blockHash}",
    bestBlock: "/block/best",
    blockchainStats: "/blockchain/statistics",
    unspentOutputs: "/unspent/{address}",
    pushTx: "/pushtx",
  },
};

