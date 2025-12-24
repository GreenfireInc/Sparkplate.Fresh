// Helius - Comprehensive Solana Blockchain API
// Enhanced RPC, DAS, webhooks, and data streaming for Solana

export const heliusOracle = {
  name: 'Helius',
  blockchain: 'Solana (SOL)',
  type: 'Comprehensive Blockchain API Provider',
  
  description: `Helius provides enterprise-grade Solana infrastructure with enhanced RPC endpoints, Digital Asset Standard (DAS) API, webhooks, and data streaming. Trusted by leading Solana wallets and DeFi applications, Helius offers comprehensive blockchain data including transactions, account information, token metadata, NFTs, and real-time price data. With generous free tiers and powerful APIs, Helius is ideal for applications requiring reliable Solana blockchain access.`,

  features: [
    'Enhanced RPC endpoints',
    'Digital Asset Standard (DAS) API',
    'Real-time webhooks',
    'Transaction parsing',
    'Token metadata',
    'NFT data and compression',
    'Priority fee recommendations',
    'Historical transaction data',
  ],

  api: {
    website: 'https://www.helius.dev/',
    documentation: 'https://docs.helius.dev/',
    apiReference: 'https://docs.helius.dev/solana-apis',
    dashboard: 'https://dev.helius.xyz/',
    pricing: 'https://www.helius.dev/pricing',
  },

  sdk: {
    primaryPackage: 'helius-sdk',
    solanaWeb3: '@solana/web3.js',
    installCommand: 'npm install helius-sdk @solana/web3.js',
    supportedLanguages: ['TypeScript', 'JavaScript', 'Python', 'Rust'],
  },

  socialMedia: {
    website: 'https://www.helius.dev/',
    twitter: 'https://twitter.com/heliuslabs',
    discord: 'https://discord.com/invite/helius',
    github: 'https://github.com/helius-labs',
    blog: 'https://www.helius.dev/blog',
  },

  freeTier: {
    requests: '100,000 requests/month',
    features: 'Enhanced RPC, DAS API, Webhooks',
    rateLimit: 'Variable based on method',
  },

  useCases: [
    'Enhanced Solana RPC access',
    'Token price and metadata queries',
    'NFT data and trading',
    'Transaction parsing',
    'Webhook notifications',
    'Account monitoring',
    'Priority fee optimization',
  ],

  integration: {
    example: `
import { Helius } from 'helius-sdk';
import { Connection, PublicKey } from '@solana/web3.js';

/**
 * Helius API Integration for Solana (SOL)
 * Comprehensive blockchain data and enhanced RPC access
 */

const HELIUS_API_KEY = 'your-api-key-here'; // Get from dev.helius.xyz
const helius = new Helius(HELIUS_API_KEY);

/**
 * Get SOL balance for an address
 */
async function getSOLBalance(address: string) {
  try {
    const pubkey = new PublicKey(address);
    const balance = await helius.rpc.getBalance(pubkey);
    
    const solBalance = balance / 1e9; // Convert lamports to SOL

    console.log(\`Address: \${address}\`);
    console.log(\`SOL Balance: \${solBalance.toFixed(4)} SOL\`);

    return {
      address,
      balance: solBalance,
      lamports: balance,
    };
  } catch (error) {
    console.error('Error fetching SOL balance:', error);
    throw error;
  }
}

/**
 * Get token balances for an address
 */
async function getTokenBalances(address: string) {
  try {
    const tokens = await helius.rpc.getTokenAccounts({
      owner: address,
    });

    console.log(\`\\nToken Balances for \${address}:\`);
    tokens.forEach((token: any) => {
      console.log(\`  \${token.mint}: \${token.amount}\`);
    });

    return tokens;
  } catch (error) {
    console.error('Error fetching token balances:', error);
    throw error;
  }
}

/**
 * Get transaction history
 */
async function getTransactionHistory(address: string, limit: number = 10) {
  try {
    const transactions = await helius.rpc.getSignaturesForAddress(
      new PublicKey(address),
      { limit }
    );

    console.log(\`\\nRecent Transactions for \${address}:\`);
    transactions.forEach((tx: any, index: number) => {
      console.log(\`\${index + 1}. \${tx.signature}\`);
      console.log(\`   Block: \${tx.slot}\`);
      console.log(\`   Status: \${tx.err ? '❌ Failed' : '✅ Success'}\`);
    });

    return transactions;
  } catch (error) {
    console.error('Error fetching transaction history:', error);
    throw error;
  }
}

/**
 * Parse transaction details
 */
async function parseTransaction(signature: string) {
  try {
    const parsedTx = await helius.rpc.getParsedTransaction(signature);

    console.log(\`\\nParsed Transaction \${signature}:\`);
    console.log(\`  Block Time: \${new Date((parsedTx?.blockTime || 0) * 1000).toISOString()}\`);
    console.log(\`  Fee: \${(parsedTx?.meta?.fee || 0) / 1e9} SOL\`);
    console.log(\`  Status: \${parsedTx?.meta?.err ? '❌ Failed' : '✅ Success'}\`);

    return parsedTx;
  } catch (error) {
    console.error('Error parsing transaction:', error);
    throw error;
  }
}

/**
 * Get priority fee recommendations
 */
async function getPriorityFeeEstimate() {
  try {
    const feeEstimate = await helius.rpc.getPriorityFeeEstimate({
      accountKeys: [],
      options: {
        recommended: true,
      },
    });

    console.log(\`\\nPriority Fee Recommendations:\`);
    console.log(\`  Min: \${feeEstimate.priorityFeeEstimate?.min || 0} microlamports\`);
    console.log(\`  Medium: \${feeEstimate.priorityFeeEstimate?.medium || 0} microlamports\`);
    console.log(\`  High: \${feeEstimate.priorityFeeEstimate?.high || 0} microlamports\`);

    return feeEstimate;
  } catch (error) {
    console.error('Error fetching priority fee estimate:', error);
    throw error;
  }
}

/**
 * Get asset information using DAS API
 */
async function getAssetInfo(assetId: string) {
  try {
    const asset = await helius.rpc.getAsset({
      id: assetId,
    });

    console.log(\`\\nAsset Info for \${assetId}:\`);
    console.log(\`  Name: \${asset.content?.metadata?.name || 'N/A'}\`);
    console.log(\`  Symbol: \${asset.content?.metadata?.symbol || 'N/A'}\`);
    console.log(\`  Owner: \${asset.ownership?.owner || 'N/A'}\`);

    return asset;
  } catch (error) {
    console.error('Error fetching asset info:', error);
    throw error;
  }
}

/**
 * Get NFTs owned by an address
 */
async function getNFTsByOwner(ownerAddress: string) {
  try {
    const nfts = await helius.rpc.getAssetsByOwner({
      ownerAddress,
      page: 1,
    });

    console.log(\`\\nNFTs owned by \${ownerAddress}: \${nfts.total}\`);
    nfts.items?.slice(0, 5).forEach((nft: any, index: number) => {
      console.log(\`\${index + 1}. \${nft.content?.metadata?.name || 'Unnamed'}\`);
    });

    return nfts;
  } catch (error) {
    console.error('Error fetching NFTs:', error);
    throw error;
  }
}

/**
 * Monitor address for changes (webhook alternative)
 */
async function monitorAddress(
  address: string,
  callback: (data: any) => void,
  intervalMs: number = 10000
) {
  console.log(\`Monitoring address \${address}...\\n\`);

  let lastSignature: string | null = null;

  setInterval(async () => {
    try {
      const transactions = await helius.rpc.getSignaturesForAddress(
        new PublicKey(address),
        { limit: 1 }
      );

      if (transactions.length > 0 && transactions[0].signature !== lastSignature) {
        console.log(\`New transaction detected: \${transactions[0].signature}\`);
        lastSignature = transactions[0].signature;
        callback(transactions[0]);
      }
    } catch (error) {
      console.error('Monitoring error:', error);
    }
  }, intervalMs);
}

// Example usage
async function main() {
  console.log('Querying Helius API for Solana data...\\n');

  const exampleAddress = 'So11111111111111111111111111111111111111112';

  // Get SOL balance
  await getSOLBalance(exampleAddress);

  // Get priority fee estimate
  await getPriorityFeeEstimate();

  // Note: Other methods require valid addresses with data
}

export {
  getSOLBalance,
  getTokenBalances,
  getTransactionHistory,
  parseTransaction,
  getPriorityFeeEstimate,
  getAssetInfo,
  getNFTsByOwner,
  monitorAddress,
};
    `.trim(),
  },

  notes: [
    'Enterprise-grade Solana infrastructure',
    'Enhanced RPC with better reliability',
    'Digital Asset Standard (DAS) API',
    'Real-time webhooks available',
    'Generous free tier (100k requests/month)',
    'Transaction parsing and enrichment',
    'Priority fee optimization',
    'Trusted by leading Solana applications',
  ],

  limitations: [
    'Requires API key',
    'Free tier has request limits',
    'Focus on blockchain data, not just prices',
    'Some features require paid plans',
  ],

  alternatives: [
    'QuickNode (alternative RPC provider)',
    'GetBlock (multi-chain RPC)',
    'Solscan (for explorer data)',
    'Pyth/Switchboard (for price oracles)',
  ],
};

