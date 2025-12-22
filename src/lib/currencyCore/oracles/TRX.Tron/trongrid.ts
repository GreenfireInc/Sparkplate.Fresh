// TronGrid - Official Tron Blockchain API
// Fast and reliable access to Tron nodes and blockchain data

export const trongridOracle = {
  name: 'TronGrid',
  blockchain: 'Tron (TRX)',
  type: 'Blockchain API & RPC Provider',
  
  description: `TronGrid is the official API service for the Tron blockchain, providing fast and reliable access to Tron nodes and comprehensive blockchain data. As Tron's primary infrastructure provider, TronGrid enables developers to query transactions, account balances, smart contracts, and network statistics through high-performance REST and WebSocket endpoints. With optional API keys for higher rate limits, TronGrid serves as the foundational data layer for applications building on the Tron network.`,

  features: [
    'Official Tron API service',
    'Fast RPC endpoints',
    'Comprehensive blockchain data',
    'Transaction tracking',
    'Account balance queries',
    'Smart contract interactions',
    'Block and event data',
    'WebSocket support',
  ],

  api: {
    website: 'https://www.trongrid.io/',
    documentation: 'https://developers.tron.network/reference/trongrid-api',
    mainnetAPI: 'https://api.trongrid.io',
    nileTestnet: 'https://nile.trongrid.io',
    eventServer: 'https://api.trongrid.io/event',
  },

  sdk: {
    primaryPackage: 'tronweb',
    installCommand: 'npm install tronweb',
    supportedLanguages: ['JavaScript', 'TypeScript'],
  },

  socialMedia: {
    website: 'https://www.trongrid.io/',
    twitter: 'https://twitter.com/trondao',
    telegram: 'https://t.me/tronnetworkEN',
    github: 'https://github.com/tronprotocol',
  },

  freeTier: {
    rateLimit: 'Rate limited (free tier)',
    features: 'Full API access',
    authentication: 'Optional (higher limits with API key)',
    getAPIKey: 'https://www.trongrid.io/',
  },

  useCases: [
    'Account balance queries',
    'Transaction history',
    'Smart contract data',
    'Block exploration',
    'TRX transfer tracking',
    'Resource management',
    'Energy and bandwidth',
    'Network statistics',
  ],

  integration: {
    example: `
import axios from 'axios';
import TronWeb from 'tronweb';

/**
 * TronGrid API Integration for Tron (TRX)
 * Official blockchain API provider
 */

const TRONGRID_API = 'https://api.trongrid.io';
const API_KEY = process.env.TRONGRID_API_KEY || ''; // Optional

// Initialize TronWeb with TronGrid
const tronWeb = new TronWeb({
  fullHost: TRONGRID_API,
  headers: API_KEY ? { 'TRON-PRO-API-KEY': API_KEY } : {},
});

/**
 * Get TRX balance for an address
 */
async function getTRXBalance(address: string): Promise<{ balance: number; bandwidth: number; energy: number }> {
  try {
    const headers: any = { 'Content-Type': 'application/json' };
    if (API_KEY) {
      headers['TRON-PRO-API-KEY'] = API_KEY;
    }

    const response = await axios.post(
      \`\${TRONGRID_API}/wallet/getaccount\`,
      { address, visible: true },
      { headers }
    );

    const data = response.data;
    const balance = (data.balance || 0) / 1e6; // Convert from sun to TRX

    console.log(\`TRX Balance for \${address}:\`);
    console.log(\`  Available: \${balance.toFixed(6)} TRX\`);
    console.log(\`  Bandwidth: \${data.net_usage || 0}\`);
    console.log(\`  Energy: \${data.energy_usage || 0}\`);

    return {
      balance,
      bandwidth: data.net_usage || 0,
      energy: data.energy_usage || 0,
    };
  } catch (error) {
    console.error('Error fetching TRX balance:', error);
    throw error;
  }
}

/**
 * Get transaction history for an address
 */
async function getTransactionHistory(address: string, limit: number = 20): Promise<any[]> {
  try {
    const headers: any = {};
    if (API_KEY) {
      headers['TRON-PRO-API-KEY'] = API_KEY;
    }

    const response = await axios.get(
      \`\${TRONGRID_API}/v1/accounts/\${address}/transactions\`,
      {
        params: { limit },
        headers,
      }
    );

    const transactions = response.data.data || [];

    console.log(\`\\nRecent Transactions for \${address} (limit \${limit}):\`);
    transactions.forEach((tx: any, index: number) => {
      console.log(\`\${index + 1}. \${tx.txID}\`);
      console.log(\`   Type: \${tx.raw_data.contract[0].type}\`);
      console.log(\`   Block: \${tx.blockNumber}\`);
      console.log(\`   Time: \${new Date(tx.block_timestamp).toLocaleString()}\`);
    });

    return transactions;
  } catch (error) {
    console.error('Error fetching transaction history:', error);
    return [];
  }
}

/**
 * Get current block height and network info
 */
async function getNetworkInfo(): Promise<any> {
  try {
    const headers: any = {};
    if (API_KEY) {
      headers['TRON-PRO-API-KEY'] = API_KEY;
    }

    const response = await axios.get(\`\${TRONGRID_API}/wallet/getnowblock\`, { headers });

    const block = response.data;

    console.log(\`\\nTron Network Information:\`);
    console.log(\`  Current Block: \${block.block_header.raw_data.number}\`);
    console.log(\`  Block Hash: \${block.blockID}\`);
    console.log(\`  Timestamp: \${new Date(block.block_header.raw_data.timestamp).toISOString()}\`);
    console.log(\`  Witness: \${block.block_header.raw_data.witness_address}\`);

    return block;
  } catch (error) {
    console.error('Error fetching network info:', error);
    throw error;
  }
}

/**
 * Get transaction details
 */
async function getTransaction(txId: string): Promise<any> {
  try {
    const headers: any = { 'Content-Type': 'application/json' };
    if (API_KEY) {
      headers['TRON-PRO-API-KEY'] = API_KEY;
    }

    const response = await axios.post(
      \`\${TRONGRID_API}/wallet/gettransactionbyid\`,
      { value: txId },
      { headers }
    );

    const tx = response.data;

    console.log(\`\\nTransaction Details:\`);
    console.log(\`  TX ID: \${txId}\`);
    console.log(\`  Type: \${tx.raw_data?.contract?.[0]?.type || 'N/A'}\`);
    console.log(\`  Block: \${tx.blockNumber || 'Pending'}\`);
    console.log(\`  Time: \${tx.block_timestamp ? new Date(tx.block_timestamp).toLocaleString() : 'Pending'}\`);
    console.log(\`  Explorer: https://tronscan.org/#/transaction/\${txId}\`);

    return tx;
  } catch (error) {
    console.error('Error fetching transaction:', error);
    throw error;
  }
}

/**
 * Get account resources (bandwidth, energy)
 */
async function getAccountResources(address: string): Promise<any> {
  try {
    const headers: any = { 'Content-Type': 'application/json' };
    if (API_KEY) {
      headers['TRON-PRO-API-KEY'] = API_KEY;
    }

    const response = await axios.post(
      \`\${TRONGRID_API}/wallet/getaccountresource\`,
      { address, visible: true },
      { headers }
    );

    const resources = response.data;

    console.log(\`\\nAccount Resources for \${address}:\`);
    console.log(\`  Free Bandwidth: \${resources.freeNetLimit || 0}\`);
    console.log(\`  Bandwidth Used: \${resources.freeNetUsed || 0}\`);
    console.log(\`  Energy Limit: \${resources.EnergyLimit || 0}\`);
    console.log(\`  Energy Used: \${resources.EnergyUsed || 0}\`);

    return resources;
  } catch (error) {
    console.error('Error fetching account resources:', error);
    throw error;
  }
}

/**
 * Get TRC-20 token balance
 */
async function getTRC20Balance(address: string, contractAddress: string): Promise<number> {
  try {
    const headers: any = {};
    if (API_KEY) {
      headers['TRON-PRO-API-KEY'] = API_KEY;
    }

    const response = await axios.get(
      \`\${TRONGRID_API}/v1/accounts/\${address}/transactions/trc20\`,
      {
        params: { contract_address: contractAddress, limit: 1 },
        headers,
      }
    );

    // This is a simplified example
    // In production, you'd query the contract directly
    console.log(\`TRC-20 Balance query for \${address}\`);

    return 0; // Placeholder
  } catch (error) {
    console.error('Error fetching TRC-20 balance:', error);
    return 0;
  }
}

/**
 * Get chain parameters
 */
async function getChainParameters(): Promise<any> {
  try {
    const headers: any = {};
    if (API_KEY) {
      headers['TRON-PRO-API-KEY'] = API_KEY;
    }

    const response = await axios.get(\`\${TRONGRID_API}/wallet/getchainparameters\`, { headers });

    const params = response.data.chainParameter || [];

    console.log(\`\\nTron Chain Parameters:\`);
    params.slice(0, 10).forEach((param: any) => {
      console.log(\`  \${param.key}: \${param.value}\`);
    });

    return params;
  } catch (error) {
    console.error('Error fetching chain parameters:', error);
    return [];
  }
}

/**
 * Monitor address for new transactions
 */
async function monitorAddress(
  address: string,
  callback: (tx: any) => void,
  intervalMs: number = 15000
) {
  console.log(\`Monitoring address \${address}...\\n\`);

  let lastTxId: string | null = null;

  setInterval(async () => {
    try {
      const transactions = await getTransactionHistory(address, 1);

      if (transactions.length > 0 && transactions[0].txID !== lastTxId) {
        console.log(\`New transaction detected: \${transactions[0].txID}\`);
        lastTxId = transactions[0].txID;
        callback(transactions[0]);
      }
    } catch (error) {
      console.error('Monitoring error:', error);
    }
  }, intervalMs);
}

/**
 * Get node list
 */
async function getNodes(): Promise<any[]> {
  try {
    const headers: any = {};
    if (API_KEY) {
      headers['TRON-PRO-API-KEY'] = API_KEY;
    }

    const response = await axios.get(\`\${TRONGRID_API}/wallet/listnodes\`, { headers });

    const nodes = response.data.nodes || [];

    console.log(\`\\nTron Nodes (\${nodes.length} total):\`);
    nodes.slice(0, 5).forEach((node: any, index: number) => {
      console.log(\`\${index + 1}. \${node.address?.host}:\${node.address?.port}\`);
    });

    return nodes;
  } catch (error) {
    console.error('Error fetching nodes:', error);
    return [];
  }
}

// Example usage
async function main() {
  console.log('Querying TronGrid API for Tron blockchain data...\\n');

  // Get network info
  await getNetworkInfo();

  // Example address (use a valid address for testing)
  const exampleAddress = 'TXYZopYRdj2D9XRtbG4uXxXyWcRzWqZ2EH';

  // Get balance
  await getTRXBalance(exampleAddress);

  // Get transaction history
  await getTransactionHistory(exampleAddress, 5);

  // Get account resources
  await getAccountResources(exampleAddress);

  // Get chain parameters
  await getChainParameters();
}

export {
  getTRXBalance,
  getTransactionHistory,
  getNetworkInfo,
  getTransaction,
  getAccountResources,
  getTRC20Balance,
  getChainParameters,
  monitorAddress,
  getNodes,
  TRONGRID_API,
};
    `.trim(),
  },

  notes: [
    'Official Tron blockchain API',
    'Fast and reliable RPC endpoints',
    'Comprehensive blockchain data',
    'Free tier available',
    'API key for higher limits',
    'WebSocket support',
    'Well-documented',
    'Primary infrastructure provider',
  ],

  limitations: [
    'Rate limits on free tier',
    'API key recommended for production',
    'Focus on blockchain data, not prices',
    'Some endpoints may have delays',
  ],

  alternatives: [
    'NOWNodes (alternative RPC)',
    'GetBlock (multi-chain RPC)',
    'Chainlink/DIA (for price feeds)',
    'SunSwap (for DEX data)',
  ],
};

