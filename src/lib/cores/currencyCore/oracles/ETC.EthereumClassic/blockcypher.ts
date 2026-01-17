// BlockCypher - Ethereum Classic Blockchain API
// Multi-chain blockchain API with comprehensive ETC support

export const blockcypherOracle = {
  name: 'BlockCypher',
  blockchain: 'Ethereum Classic (ETC)',
  type: 'Blockchain API & Explorer',
  
  description: `BlockCypher provides a comprehensive blockchain API with robust Ethereum Classic support. It offers transaction broadcasting, address queries, webhook support, and UTXO queries. The API is designed for developers building wallets, exchanges, and blockchain applications with real-time data needs.`,

  features: [
    'Multi-chain blockchain API (including ETC)',
    'Transaction broadcasting and monitoring',
    'Address balance and transaction history',
    'Webhook support for real-time notifications',
    'Block and transaction queries',
    'UTXO management',
    'Confidence scores for transactions',
    'Free tier with 200 requests/hour',
  ],

  api: {
    baseUrl: 'https://api.blockcypher.com/v1/etc/main',
    explorerUrl: 'https://live.blockcypher.com/etc/',
    documentation: 'https://www.blockcypher.com/dev/',
    rateLimit: '3 requests/second without API key, 200 requests/hour',
    rateLimitWithKey: 'Higher limits with API token',
  },

  sdk: {
    primaryPackage: 'axios (REST API)',
    installCommand: 'npm install axios',
    supportedLanguages: ['TypeScript', 'JavaScript', 'Python', 'Ruby', 'PHP', 'Go'],
  },

  socialMedia: {
    website: 'https://www.blockcypher.com/',
    github: 'https://github.com/blockcypher',
    twitter: 'https://twitter.com/blockcypher',
    blog: 'https://blog.blockcypher.com/',
    discord: 'N/A',
  },

  useCases: [
    'Wallet application blockchain queries',
    'Transaction broadcasting and monitoring',
    'Address balance tracking',
    'Real-time blockchain event notifications via webhooks',
    'Block explorer functionality',
    'UTXO management for exchanges',
    'Confidence scoring for unconfirmed transactions',
  ],

  integration: {
    example: `
import axios from 'axios';

/**
 * BlockCypher API Integration for Ethereum Classic
 */

const BLOCKCYPHER_API = {
  baseUrl: 'https://api.blockcypher.com/v1/etc/main',
  token: '', // Optional: Add your API token for higher rate limits
};

/**
 * Get chain information
 */
async function getChainInfo() {
  try {
    const response = await axios.get(BLOCKCYPHER_API.baseUrl);
    
    console.log('ETC Chain Info:', {
      name: response.data.name,
      height: response.data.height,
      hash: response.data.hash,
      time: response.data.time,
      latestUrl: response.data.latest_url,
      previousHash: response.data.previous_hash,
      unconfirmedCount: response.data.unconfirmed_count,
    });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching chain info:', error);
    throw error;
  }
}

/**
 * Get address balance and information
 */
async function getAddressInfo(address: string) {
  try {
    const url = \`\${BLOCKCYPHER_API.baseUrl}/addrs/\${address}\`;
    const params = BLOCKCYPHER_API.token ? { token: BLOCKCYPHER_API.token } : {};
    
    const response = await axios.get(url, { params });
    
    const data = response.data;
    const balanceETC = data.balance / 1e18;
    const unconfirmedBalanceETC = data.unconfirmed_balance / 1e18;
    
    console.log(\`Address: \${address}\`);
    console.log(\`Balance: \${balanceETC} ETC\`);
    console.log(\`Unconfirmed: \${unconfirmedBalanceETC} ETC\`);
    console.log(\`Total Received: \${data.total_received / 1e18} ETC\`);
    console.log(\`Total Sent: \${data.total_sent / 1e18} ETC\`);
    console.log(\`Transaction Count: \${data.n_tx}\`);
    
    return {
      address: data.address,
      balance: balanceETC,
      unconfirmedBalance: unconfirmedBalanceETC,
      totalReceived: data.total_received / 1e18,
      totalSent: data.total_sent / 1e18,
      transactionCount: data.n_tx,
      transactions: data.txrefs || [],
    };
  } catch (error) {
    console.error('Error fetching address info:', error);
    throw error;
  }
}

/**
 * Get transaction details
 */
async function getTransaction(txHash: string) {
  try {
    const url = \`\${BLOCKCYPHER_API.baseUrl}/txs/\${txHash}\`;
    const params = BLOCKCYPHER_API.token ? { token: BLOCKCYPHER_API.token } : {};
    
    const response = await axios.get(url, { params });
    
    console.log('Transaction Details:', {
      hash: response.data.hash,
      blockHeight: response.data.block_height,
      confirmations: response.data.confirmations,
      received: response.data.received,
      total: response.data.total / 1e18,
      fees: response.data.fees / 1e18,
      inputs: response.data.inputs.length,
      outputs: response.data.outputs.length,
    });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching transaction:', error);
    throw error;
  }
}

/**
 * Get block information
 */
async function getBlock(blockHashOrHeight: string | number) {
  try {
    const url = \`\${BLOCKCYPHER_API.baseUrl}/blocks/\${blockHashOrHeight}\`;
    const params = BLOCKCYPHER_API.token ? { token: BLOCKCYPHER_API.token } : {};
    
    const response = await axios.get(url, { params });
    
    console.log('Block Info:', {
      hash: response.data.hash,
      height: response.data.height,
      time: response.data.time,
      transactionCount: response.data.n_tx,
      miner: response.data.miner_preference,
    });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching block:', error);
    throw error;
  }
}

/**
 * Broadcast a transaction
 */
async function broadcastTransaction(signedTxHex: string) {
  try {
    const url = \`\${BLOCKCYPHER_API.baseUrl}/txs/push\`;
    const params = BLOCKCYPHER_API.token ? { token: BLOCKCYPHER_API.token } : {};
    
    const response = await axios.post(
      url,
      { tx: signedTxHex },
      { params }
    );
    
    console.log('Transaction broadcast successful:', response.data.tx.hash);
    return response.data.tx;
  } catch (error) {
    console.error('Error broadcasting transaction:', error);
    throw error;
  }
}

/**
 * Create a webhook for address monitoring
 */
async function createWebhook(
  webhookUrl: string,
  address: string,
  event: 'tx-confirmation' | 'unconfirmed-tx' = 'tx-confirmation'
) {
  try {
    if (!BLOCKCYPHER_API.token) {
      throw new Error('API token required for webhook creation');
    }
    
    const url = \`\${BLOCKCYPHER_API.baseUrl}/hooks\`;
    
    const response = await axios.post(url, {
      event,
      address,
      url: webhookUrl,
      token: BLOCKCYPHER_API.token,
    });
    
    console.log('Webhook created:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating webhook:', error);
    throw error;
  }
}

// Example usage
async function main() {
  console.log('Fetching ETC blockchain data from BlockCypher...');
  
  const chainInfo = await getChainInfo();
  console.log(\`Current block height: \${chainInfo.height}\`);
  
  const testAddress = '0x742d35Cc6634C0532925a3b844Bc454e4438f44e';
  const addressInfo = await getAddressInfo(testAddress);
  console.log(\`Balance: \${addressInfo.balance} ETC\`);
}

export {
  getChainInfo,
  getAddressInfo,
  getTransaction,
  getBlock,
  broadcastTransaction,
  createWebhook,
};
    `.trim(),
  },

  notes: [
    'Multi-chain blockchain API with excellent ETC support',
    'Free tier: 200 requests/hour, 3 requests/second',
    'Webhook support for real-time event notifications',
    'Transaction confidence scoring for unconfirmed transactions',
    'Transaction broadcasting capabilities',
    'Simple REST API with comprehensive documentation',
    'No API key required for basic usage',
    'Higher rate limits available with API token',
  ],

  limitations: [
    'Rate limits on free tier (200 requests/hour)',
    'API token required for webhooks',
    'No price feed data (blockchain data only)',
  ],

  alternatives: [
    'Blockscout (official ETC explorer)',
    'Tokenview',
    'GetBlock',
  ],
};

