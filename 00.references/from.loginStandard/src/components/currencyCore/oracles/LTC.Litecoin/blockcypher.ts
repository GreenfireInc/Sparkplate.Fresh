// BlockCypher - Multi-Blockchain API for Litecoin
// Fast blockchain API with webhook support

export const blockcypherOracle = {
  name: 'BlockCypher',
  blockchain: 'Litecoin (LTC)',
  type: 'Block Explorer & API',
  
  description: `BlockCypher provides a fast and reliable blockchain API for Litecoin with webhook support, transaction broadcasting, and comprehensive blockchain data access. With 3 requests/second and 200 requests/hour on the free tier, BlockCypher offers real-time blockchain data, UTXO queries, and payment forwarding capabilities.`,

  features: [
    '3 requests/second free (no API key)',
    '200 requests/hour limit',
    'Webhook support for notifications',
    'Transaction broadcasting',
    'UTXO queries',
    'Address monitoring',
    'Payment forwarding',
    'Confidence factor for unconfirmed TXs',
  ],

  api: {
    website: 'https://www.blockcypher.com/',
    documentation: 'https://www.blockcypher.com/dev/litecoin/',
    apiEndpoint: 'https://api.blockcypher.com/v1/ltc/main',
    explorer: 'https://live.blockcypher.com/ltc/',
  },

  sdk: {
    primaryPackage: 'axios (REST API)',
    alternativePackage: 'blockcypher',
    installCommand: 'npm install axios',
    supportedLanguages: ['TypeScript', 'JavaScript', 'Python', 'Ruby', 'PHP'],
  },

  socialMedia: {
    website: 'https://www.blockcypher.com/',
    twitter: 'https://twitter.com/BlockCypher',
    github: 'https://github.com/blockcypher',
  },

  useCases: [
    'Real-time transaction monitoring',
    'Payment processing',
    'Wallet integrations',
    'UTXO management',
    'Transaction broadcasting',
    'Address balance tracking',
    'Webhook notifications',
  ],

  integration: {
    example: `
import axios from 'axios';

/**
 * BlockCypher Integration for Litecoin
 * Fast blockchain API with webhook support
 */

const BLOCKCYPHER_API = {
  baseUrl: 'https://api.blockcypher.com/v1/ltc/main',
  chain: '/ltc/main',
};

/**
 * Get blockchain information
 */
async function getBlockchainInfo() {
  try {
    const response = await axios.get(BLOCKCYPHER_API.baseUrl);

    const data = response.data;

    console.log('Litecoin Blockchain Info:');
    console.log(\`  Height: \${data.height}\`);
    console.log(\`  Latest Block: \${data.latest_url}\`);
    console.log(\`  Unconfirmed TXs: \${data.unconfirmed_count}\`);
    console.log(\`  Last Fork Height: \${data.last_fork_height}\`);

    return {
      name: data.name,
      height: data.height,
      hash: data.hash,
      time: new Date(data.time),
      latestUrl: data.latest_url,
      unconfirmedCount: data.unconfirmed_count,
    };
  } catch (error) {
    console.error('Error fetching blockchain info:', error);
    throw error;
  }
}

/**
 * Get address information
 */
async function getAddressInfo(address: string) {
  try {
    const response = await axios.get(\`\${BLOCKCYPHER_API.baseUrl}/addrs/\${address}\`);

    const data = response.data;

    console.log(\`Address: \${address}\`);
    console.log(\`  Balance: \${data.balance / 100000000} LTC\`);
    console.log(\`  Total Received: \${data.total_received / 100000000} LTC\`);
    console.log(\`  Total Sent: \${data.total_sent / 100000000} LTC\`);
    console.log(\`  TX Count: \${data.n_tx}\`);

    return {
      address,
      balance: data.balance / 100000000,
      totalReceived: data.total_received / 100000000,
      totalSent: data.total_sent / 100000000,
      unconfirmedBalance: data.unconfirmed_balance / 100000000,
      transactionCount: data.n_tx,
      unconfirmedTxCount: data.unconfirmed_n_tx,
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
    const response = await axios.get(\`\${BLOCKCYPHER_API.baseUrl}/txs/\${txHash}\`);

    const data = response.data;

    console.log(\`Transaction: \${txHash}\`);
    console.log(\`  Block Height: \${data.block_height}\`);
    console.log(\`  Confirmations: \${data.confirmations}\`);
    console.log(\`  Total: \${data.total / 100000000} LTC\`);
    console.log(\`  Fees: \${data.fees / 100000000} LTC\`);
    console.log(\`  Confidence: \${data.confidence || 'N/A'}\`);

    return {
      hash: txHash,
      blockHeight: data.block_height,
      confirmations: data.confirmations,
      total: data.total / 100000000,
      fees: data.fees / 100000000,
      received: new Date(data.received),
      confidence: data.confidence,
      inputs: data.inputs,
      outputs: data.outputs,
    };
  } catch (error) {
    console.error('Error fetching transaction info:', error);
    throw error;
  }
}

/**
 * Get unconfirmed transactions
 */
async function getUnconfirmedTransactions() {
  try {
    const response = await axios.get(\`\${BLOCKCYPHER_API.baseUrl}/txs\`);

    const transactions = response.data;

    console.log(\`Unconfirmed transactions: \${transactions.length}\`);

    return transactions.map((tx: any) => ({
      hash: tx.hash,
      total: tx.total / 100000000,
      fees: tx.fees / 100000000,
      received: new Date(tx.received),
      confidence: tx.confidence,
    }));
  } catch (error) {
    console.error('Error fetching unconfirmed transactions:', error);
    throw error;
  }
}

/**
 * Broadcast a transaction
 */
async function broadcastTransaction(signedTxHex: string) {
  try {
    const response = await axios.post(\`\${BLOCKCYPHER_API.baseUrl}/txs/push\`, {
      tx: signedTxHex,
    });

    const data = response.data;

    console.log(\`Transaction broadcast successful!\`);
    console.log(\`  TX Hash: \${data.tx.hash}\`);
    console.log(\`  Received: \${data.tx.received}\`);

    return {
      hash: data.tx.hash,
      received: new Date(data.tx.received),
    };
  } catch (error) {
    console.error('Error broadcasting transaction:', error);
    throw error;
  }
}

/**
 * Create webhook for address monitoring
 */
async function createAddressWebhook(
  address: string,
  webhookUrl: string,
  apiToken?: string
) {
  try {
    const response = await axios.post(
      \`\${BLOCKCYPHER_API.baseUrl}/hooks\`,
      {
        event: 'unconfirmed-tx',
        address,
        url: webhookUrl,
      },
      {
        params: apiToken ? { token: apiToken } : {},
      }
    );

    console.log(\`Webhook created for \${address}\`);
    console.log(\`  Webhook ID: \${response.data.id}\`);
    console.log(\`  Event: \${response.data.event}\`);

    return {
      id: response.data.id,
      event: response.data.event,
      address,
      url: webhookUrl,
    };
  } catch (error) {
    console.error('Error creating webhook:', error);
    throw error;
  }
}

/**
 * Get block information
 */
async function getBlockInfo(blockHeightOrHash: string | number) {
  try {
    const response = await axios.get(
      \`\${BLOCKCYPHER_API.baseUrl}/blocks/\${blockHeightOrHash}\`
    );

    const data = response.data;

    console.log(\`Block: \${blockHeightOrHash}\`);
    console.log(\`  Hash: \${data.hash}\`);
    console.log(\`  Height: \${data.height}\`);
    console.log(\`  Time: \${new Date(data.time)}\`);
    console.log(\`  Transactions: \${data.n_tx}\`);

    return {
      hash: data.hash,
      height: data.height,
      time: new Date(data.time),
      transactionCount: data.n_tx,
      prevBlock: data.prev_block,
      merkleRoot: data.mrkl_root,
    };
  } catch (error) {
    console.error('Error fetching block info:', error);
    throw error;
  }
}

/**
 * Generate a new address (for testing/development)
 */
async function generateNewAddress(apiToken?: string) {
  try {
    const response = await axios.post(
      \`\${BLOCKCYPHER_API.baseUrl}/addrs\`,
      {},
      {
        params: apiToken ? { token: apiToken } : {},
      }
    );

    const data = response.data;

    console.log('Generated new address:');
    console.log(\`  Public Address: \${data.address}\`);
    console.log(\`  Private Key: \${data.private}\`);
    console.log(\`  ⚠️ Warning: Store private key securely!\`);

    return {
      address: data.address,
      publicKey: data.public,
      privateKey: data.private,
      wif: data.wif,
    };
  } catch (error) {
    console.error('Error generating address:', error);
    throw error;
  }
}

/**
 * Get address UTXOs
 */
async function getAddressUTXOs(address: string) {
  try {
    const response = await axios.get(
      \`\${BLOCKCYPHER_API.baseUrl}/addrs/\${address}\`,
      {
        params: {
          unspentOnly: true,
        },
      }
    );

    const data = response.data;
    const txRefs = data.txrefs || [];

    console.log(\`UTXOs for \${address}: \${txRefs.length}\`);

    return txRefs.map((utxo: any) => ({
      txHash: utxo.tx_hash,
      outputIndex: utxo.tx_output_n,
      value: utxo.value / 100000000,
      confirmations: utxo.confirmations,
      spent: utxo.spent,
    }));
  } catch (error) {
    console.error('Error fetching UTXOs:', error);
    throw error;
  }
}

// Example usage
async function main() {
  console.log('Fetching Litecoin data from BlockCypher...\\n');

  const chainInfo = await getBlockchainInfo();
  console.log('\\nBlockchain Info:', chainInfo);

  const unconfirmed = await getUnconfirmedTransactions();
  console.log(\`\\nUnconfirmed TXs: \${unconfirmed.length}\`);

  // Example address (replace with actual address)
  const exampleAddress = 'LTC_ADDRESS_HERE';
  // const addressInfo = await getAddressInfo(exampleAddress);
  // console.log('\\nAddress Info:', addressInfo);
}

export {
  getBlockchainInfo,
  getAddressInfo,
  getTransactionInfo,
  getUnconfirmedTransactions,
  broadcastTransaction,
  createAddressWebhook,
  getBlockInfo,
  generateNewAddress,
  getAddressUTXOs,
};
    `.trim(),
  },

  notes: [
    '3 requests/second free (no API key)',
    '200 requests/hour limit',
    'Webhook support for real-time notifications',
    'Transaction broadcasting capability',
    'Confidence factor for unconfirmed transactions',
    'Payment forwarding service',
    'Address generation for testing',
    'Fast and reliable API',
  ],

  limitations: [
    'Rate limits on free tier',
    'Higher limits require API token',
    'Webhook creation requires API token',
    'Some features require paid plans',
  ],

  alternatives: [
    'Blockchair (higher free tier limits)',
    'Litecoin Space (official explorer)',
    'SoChain (fast API)',
    'NOWNodes (node access)',
  ],
};

