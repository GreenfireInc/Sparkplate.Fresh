// Solscan - Leading Solana Block Explorer
// Real-time blockchain data, transaction tracking, and analytics

export const solscanOracle = {
  name: 'Solscan',
  blockchain: 'Solana (SOL)',
  type: 'Block Explorer & API Provider',
  
  description: `Solscan is the leading block explorer for Solana, providing real-time blockchain data, transaction tracking, token analytics, and comprehensive account information. With a user-friendly interface and powerful API, Solscan offers detailed insights into SOL transactions, token transfers, NFTs, and network statistics. The Solscan API provides free access with rate limits, making it ideal for applications requiring Solana blockchain data and SOL price tracking.`,

  features: [
    'Comprehensive blockchain explorer',
    'Real-time transaction tracking',
    'Token and NFT analytics',
    'Account balance queries',
    'Market data and prices',
    'Block and transaction search',
    'Validator information',
    'Network statistics',
  ],

  api: {
    website: 'https://solscan.io/',
    documentation: 'https://public-api.solscan.io/docs/',
    apiEndpoint: 'https://public-api.solscan.io',
    explorer: 'https://solscan.io/',
    proAPI: 'https://pro-api.solscan.io',
  },

  sdk: {
    primaryPackage: 'REST API (axios recommended)',
    installCommand: 'npm install axios',
    supportedLanguages: ['Any (REST API)', 'TypeScript', 'JavaScript', 'Python'],
  },

  socialMedia: {
    website: 'https://solscan.io/',
    twitter: 'https://twitter.com/solscanofficial',
    telegram: 'https://t.me/solscan',
    github: 'https://github.com/solscanofficial',
  },

  freeTier: {
    rateLimit: 'Rate limited',
    authentication: 'Optional (higher limits with API key)',
    features: 'Full API access',
  },

  useCases: [
    'SOL price tracking',
    'Transaction monitoring',
    'Account balance queries',
    'Token analytics',
    'NFT tracking',
    'Block exploration',
    'Network statistics',
  ],

  integration: {
    example: `
import axios from 'axios';

/**
 * Solscan API Integration for Solana (SOL)
 * Leading block explorer with comprehensive blockchain data
 */

const SOLSCAN_API = 'https://public-api.solscan.io';
const SOLSCAN_EXPLORER = 'https://solscan.io';

/**
 * Get SOL market data
 */
async function getSolscanSOLPrice() {
  try {
    const response = await axios.get(\`\${SOLSCAN_API}/market/token/So11111111111111111111111111111111111111112\`);

    const { priceUsdt, volumeUsdt, marketCapFD } = response.data;

    console.log(\`Solscan SOL Market Data:\`);
    console.log(\`  Price: $\${priceUsdt?.toFixed(4) || 'N/A'}\`);
    console.log(\`  Volume: $\${(volumeUsdt / 1e6)?.toFixed(2)}M\`);
    console.log(\`  Market Cap: $\${(marketCapFD / 1e9)?.toFixed(2)}B\`);

    return {
      price: priceUsdt,
      volume24h: volumeUsdt,
      marketCap: marketCapFD,
      source: 'Solscan',
    };
  } catch (error) {
    console.error('Error fetching Solscan SOL price:', error);
    throw error;
  }
}

/**
 * Get account balance
 */
async function getAccountBalance(address: string) {
  try {
    const response = await axios.get(\`\${SOLSCAN_API}/account/\${address}\`);

    const lamports = response.data.lamports || 0;
    const solBalance = lamports / 1e9;

    console.log(\`\\nAccount: \${address}\`);
    console.log(\`SOL Balance: \${solBalance.toFixed(4)} SOL\`);

    return {
      address,
      balance: solBalance,
      lamports,
    };
  } catch (error) {
    console.error('Error fetching account balance:', error);
    throw error;
  }
}

/**
 * Get transaction details
 */
async function getTransaction(signature: string) {
  try {
    const response = await axios.get(\`\${SOLSCAN_API}/transaction/\${signature}\`);

    const tx = response.data;

    console.log(\`\\nTransaction: \${signature}\`);
    console.log(\`  Block: \${tx.slot}\`);
    console.log(\`  Status: \${tx.status === 'Success' ? '✅' : '❌'}\`);
    console.log(\`  Fee: \${tx.fee / 1e9} SOL\`);
    console.log(\`  Time: \${new Date(tx.blockTime * 1000).toISOString()}\`);

    return {
      signature,
      slot: tx.slot,
      status: tx.status,
      fee: tx.fee / 1e9,
      blockTime: new Date(tx.blockTime * 1000),
      explorerLink: \`\${SOLSCAN_EXPLORER}/tx/\${signature}\`,
    };
  } catch (error) {
    console.error('Error fetching transaction:', error);
    throw error;
  }
}

/**
 * Get account transactions
 */
async function getAccountTransactions(address: string, limit: number = 10) {
  try {
    const response = await axios.get(\`\${SOLSCAN_API}/account/transactions\`, {
      params: {
        account: address,
        limit,
      },
    });

    const transactions = response.data;

    console.log(\`\\nRecent Transactions for \${address}:\`);
    transactions.slice(0, 5).forEach((tx: any, index: number) => {
      console.log(\`\${index + 1}. \${tx.txHash}\`);
      console.log(\`   Block: \${tx.slot}\`);
      console.log(\`   Time: \${new Date(tx.blockTime * 1000).toLocaleString()}\`);
    });

    return transactions;
  } catch (error) {
    console.error('Error fetching account transactions:', error);
    throw error;
  }
}

/**
 * Get token info
 */
async function getTokenInfo(mintAddress: string) {
  try {
    const response = await axios.get(\`\${SOLSCAN_API}/token/meta\`, {
      params: {
        token: mintAddress,
      },
    });

    const token = response.data;

    console.log(\`\\nToken Info:\`);
    console.log(\`  Name: \${token.name}\`);
    console.log(\`  Symbol: \${token.symbol}\`);
    console.log(\`  Decimals: \${token.decimals}\`);
    console.log(\`  Supply: \${token.supply}\`);

    return token;
  } catch (error) {
    console.error('Error fetching token info:', error);
    throw error;
  }
}

/**
 * Get network statistics
 */
async function getNetworkStats() {
  try {
    const response = await axios.get(\`\${SOLSCAN_API}/chaininfo\`);

    const stats = response.data;

    console.log(\`\\nSolana Network Statistics:\`);
    console.log(\`  Current Slot: \${stats.currentSlot}\`);
    console.log(\`  TPS: \${stats.tps}\`);
    console.log(\`  Epoch: \${stats.epoch}\`);

    return stats;
  } catch (error) {
    console.error('Error fetching network stats:', error);
    throw error;
  }
}

/**
 * Monitor SOL price changes
 */
async function monitorSOLPrice(
  callback: (price: number, change: number) => void,
  intervalMs: number = 30000
) {
  console.log('Starting Solscan SOL price monitoring...\\n');

  let lastPrice: number | null = null;

  setInterval(async () => {
    try {
      const data = await getSolscanSOLPrice();
      
      if (data.price && lastPrice !== null) {
        const change = ((data.price - lastPrice) / lastPrice) * 100;
        console.log(
          \`SOL: $\${data.price.toFixed(4)} (\${change >= 0 ? '+' : ''}\${change.toFixed(2)}%)\`
        );
        callback(data.price, change);
      } else if (data.price) {
        console.log(\`Initial SOL price: $\${data.price.toFixed(4)}\`);
      }
      
      lastPrice = data.price || lastPrice;
    } catch (error) {
      console.error('Monitoring error:', error);
    }
  }, intervalMs);
}

// Example usage
async function main() {
  console.log('Querying Solscan API for Solana data...\\n');

  // Get SOL price
  const price = await getSolscanSOLPrice();
  console.log(\`\\nSOL Price: $\${price.price?.toFixed(4)}\`);

  // Get network statistics
  await getNetworkStats();
}

export {
  getSolscanSOLPrice,
  getAccountBalance,
  getTransaction,
  getAccountTransactions,
  getTokenInfo,
  getNetworkStats,
  monitorSOLPrice,
  SOLSCAN_API,
  SOLSCAN_EXPLORER,
};
    `.trim(),
  },

  notes: [
    'Leading Solana block explorer',
    'Comprehensive blockchain data',
    'Real-time transaction tracking',
    'Token and NFT analytics',
    'Free API with rate limits',
    'User-friendly web interface',
    'No API key required for basic usage',
    'Market data and prices',
  ],

  limitations: [
    'Rate limited on free tier',
    'API key recommended for higher limits',
    'Focus on blockchain data',
    'Some endpoints may have delays',
  ],

  alternatives: [
    'Solana Explorer (official)',
    'SolanaFM (alternative explorer)',
    'Helius (for enhanced data)',
    'Pyth/Jupiter (for price feeds)',
  ],
};

