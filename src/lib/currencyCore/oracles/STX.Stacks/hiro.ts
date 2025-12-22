// Hiro - Official Stacks Blockchain API and Explorer
// Comprehensive blockchain data, transactions, and smart contract interactions

export const hiroOracle = {
  name: 'Hiro',
  blockchain: 'Stacks (STX)',
  type: 'Blockchain API & Explorer Provider',
  
  description: `Hiro provides the official Stacks Blockchain API, offering comprehensive access to blockchain data through a high-performance REST interface. As the primary infrastructure provider for Stacks, Hiro enables developers to query transactions, account balances, smart contracts, and network statistics. With the Stacks Explorer and robust API documentation, Hiro serves as the foundational data layer for applications building on Bitcoin's Layer 2.`,

  features: [
    'Official Stacks Blockchain API',
    'Real-time transaction data',
    'Smart contract queries',
    'Account balance tracking',
    'Block and transaction search',
    'Microblock streaming',
    'Stacking data access',
    'NFT and token metadata',
  ],

  api: {
    website: 'https://www.hiro.so/',
    documentation: 'https://docs.hiro.so/get-started/stacks-blockchain-api',
    apiReference: 'https://docs.hiro.so/api',
    explorer: 'https://explorer.hiro.so/',
    mainnetAPI: 'https://api.mainnet.hiro.so',
    testnetAPI: 'https://api.testnet.hiro.so',
  },

  sdk: {
    primaryPackage: '@stacks/blockchain-api-client',
    stacksTransactions: '@stacks/transactions',
    stacksNetwork: '@stacks/network',
    installCommand: 'npm install @stacks/blockchain-api-client @stacks/transactions @stacks/network',
    supportedLanguages: ['TypeScript', 'JavaScript'],
  },

  socialMedia: {
    website: 'https://www.hiro.so/',
    twitter: 'https://twitter.com/hirosystems',
    discord: 'https://discord.com/invite/hiro',
    github: 'https://github.com/hirosystems',
    youtube: 'https://www.youtube.com/@hirosystems',
  },

  freeTier: {
    rateLimit: 'Rate limited (free tier)',
    features: 'Full API access',
    authentication: 'Optional (higher limits with API key)',
  },

  useCases: [
    'Account balance queries',
    'Transaction history',
    'Smart contract data',
    'Block exploration',
    'STX transfer tracking',
    'Stacking information',
    'Token metadata',
    'Network statistics',
  ],

  integration: {
    example: `
import axios from 'axios';
import { AccountsApi, BlocksApi, TransactionsApi, Configuration } from '@stacks/blockchain-api-client';

/**
 * Hiro API Integration for Stacks (STX)
 * Official Stacks Blockchain API provider
 */

const HIRO_API = 'https://api.mainnet.hiro.so';

// Initialize API clients
const config = new Configuration({
  basePath: HIRO_API,
});

const accountsApi = new AccountsApi(config);
const blocksApi = new BlocksApi(config);
const transactionsApi = new TransactionsApi(config);

/**
 * Get STX balance for an address
 */
async function getSTXBalance(address: string): Promise<{ balance: number; locked: number; total: number }> {
  try {
    const response = await axios.get(\`\${HIRO_API}/extended/v1/address/\${address}/balances\`);
    
    const data = response.data;
    const balance = parseInt(data.stx.balance) / 1e6; // Convert from microSTX
    const locked = parseInt(data.stx.locked) / 1e6;
    const total = balance + locked;

    console.log(\`STX Balance for \${address}:\`);
    console.log(\`  Available: \${balance.toFixed(6)} STX\`);
    console.log(\`  Locked (Stacking): \${locked.toFixed(6)} STX\`);
    console.log(\`  Total: \${total.toFixed(6)} STX\`);

    return {
      balance,
      locked,
      total,
    };
  } catch (error) {
    console.error('Error fetching STX balance:', error);
    throw error;
  }
}

/**
 * Get transaction history for an address
 */
async function getTransactionHistory(address: string, limit: number = 10): Promise<any[]> {
  try {
    const response = await axios.get(
      \`\${HIRO_API}/extended/v1/address/\${address}/transactions\`,
      {
        params: { limit },
      }
    );

    const transactions = response.data.results;

    console.log(\`\\nRecent Transactions for \${address} (limit \${limit}):\`);
    transactions.forEach((tx: any, index: number) => {
      console.log(\`\${index + 1}. \${tx.tx_id}\`);
      console.log(\`   Type: \${tx.tx_type}\`);
      console.log(\`   Status: \${tx.tx_status === 'success' ? '✅ Success' : '❌ Failed'}\`);
      console.log(\`   Block: \${tx.block_height}\`);
      console.log(\`   Time: \${new Date(tx.burn_block_time_iso).toLocaleString()}\`);
      if (tx.tx_type === 'token_transfer') {
        console.log(\`   Amount: \${parseInt(tx.token_transfer.amount) / 1e6} STX\`);
      }
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
    const response = await axios.get(\`\${HIRO_API}/v2/info\`);
    
    const info = response.data;

    console.log(\`\\nStacks Network Information:\`);
    console.log(\`  Current Block: \${info.stacks_tip_height}\`);
    console.log(\`  Bitcoin Block: \${info.burn_block_height}\`);
    console.log(\`  Network: \${info.network_id === 1 ? 'Mainnet' : 'Testnet'}\`);
    console.log(\`  Peer Version: \${info.peer_version}\`);

    return info;
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
    const response = await axios.get(\`\${HIRO_API}/extended/v1/tx/\${txId}\`);
    
    const tx = response.data;

    console.log(\`\\nTransaction Details:\`);
    console.log(\`  TX ID: \${tx.tx_id}\`);
    console.log(\`  Type: \${tx.tx_type}\`);
    console.log(\`  Status: \${tx.tx_status}\`);
    console.log(\`  Block: \${tx.block_height}\`);
    console.log(\`  Fee: \${tx.fee_rate / 1e6} STX\`);
    console.log(\`  Time: \${new Date(tx.burn_block_time_iso).toLocaleString()}\`);
    console.log(\`  Explorer: https://explorer.hiro.so/txid/\${txId}\`);

    return tx;
  } catch (error) {
    console.error('Error fetching transaction:', error);
    throw error;
  }
}

/**
 * Get Stacking info for an address
 */
async function getStackingInfo(address: string): Promise<any> {
  try {
    const response = await axios.get(\`\${HIRO_API}/v2/accounts/\${address}?proof=0\`);
    
    const account = response.data;

    console.log(\`\\nStacking Information for \${address}:\`);
    console.log(\`  Balance: \${parseInt(account.balance) / 1e6} STX\`);
    console.log(\`  Locked: \${parseInt(account.locked) / 1e6} STX\`);
    console.log(\`  Nonce: \${account.nonce}\`);

    return account;
  } catch (error) {
    console.error('Error fetching stacking info:', error);
    throw error;
  }
}

/**
 * Get mempool transactions
 */
async function getMempoolTransactions(limit: number = 10): Promise<any[]> {
  try {
    const response = await axios.get(
      \`\${HIRO_API}/extended/v1/tx/mempool\`,
      {
        params: { limit },
      }
    );

    const mempoolTxs = response.data.results;

    console.log(\`\\nMempool Transactions (limit \${limit}):\`);
    mempoolTxs.forEach((tx: any, index: number) => {
      console.log(\`\${index + 1}. \${tx.tx_id}\`);
      console.log(\`   Type: \${tx.tx_type}\`);
      console.log(\`   Fee: \${tx.fee_rate / 1e6} STX\`);
    });

    return mempoolTxs;
  } catch (error) {
    console.error('Error fetching mempool transactions:', error);
    return [];
  }
}

/**
 * Get smart contract info
 */
async function getContractInfo(contractId: string): Promise<any> {
  try {
    const response = await axios.get(\`\${HIRO_API}/v2/contracts/interface/\${contractId}\`);
    
    const contract = response.data;

    console.log(\`\\nSmart Contract Info:\`);
    console.log(\`  Contract ID: \${contractId}\`);
    console.log(\`  Functions: \${contract.functions.length}\`);
    console.log(\`  Variables: \${contract.variables.length}\`);
    console.log(\`  Maps: \${contract.maps.length}\`);

    return contract;
  } catch (error) {
    console.error('Error fetching contract info:', error);
    throw error;
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
      const response = await axios.get(
        \`\${HIRO_API}/extended/v1/address/\${address}/transactions\`,
        {
          params: { limit: 1 },
        }
      );

      const transactions = response.data.results;
      
      if (transactions.length > 0 && transactions[0].tx_id !== lastTxId) {
        console.log(\`New transaction detected: \${transactions[0].tx_id}\`);
        lastTxId = transactions[0].tx_id;
        callback(transactions[0]);
      }
    } catch (error) {
      console.error('Monitoring error:', error);
    }
  }, intervalMs);
}

// Example usage
async function main() {
  console.log('Querying Hiro API for Stacks blockchain data...\\n');

  // Get network info
  await getNetworkInfo();

  // Example address (use a valid address for testing)
  const exampleAddress = 'SP3K8BC0PPEVCV7NZ6QSRWPQ2JE9E5B6N3PA0KBR9';

  // Get balance
  await getSTXBalance(exampleAddress);

  // Get transaction history
  await getTransactionHistory(exampleAddress, 5);

  // Get mempool transactions
  await getMempoolTransactions(5);
}

export {
  getSTXBalance,
  getTransactionHistory,
  getNetworkInfo,
  getTransaction,
  getStackingInfo,
  getMempoolTransactions,
  getContractInfo,
  monitorAddress,
  HIRO_API,
};
    `.trim(),
  },

  notes: [
    'Official Stacks Blockchain API',
    'Comprehensive blockchain data',
    'Real-time transaction tracking',
    'Smart contract queries',
    'Free tier available',
    'Rate limited on free tier',
    'Well-documented API',
    'Primary infrastructure provider',
  ],

  limitations: [
    'Rate limits on free tier',
    'API key recommended for production',
    'Focus on blockchain data, not prices',
    'Some endpoints may have delays',
  ],

  alternatives: [
    'QuickNode (alternative RPC)',
    'NOWNodes (multi-chain RPC)',
    'Pyth/DIA (for price feeds)',
    'ALEX (for DEX data)',
  ],
};

