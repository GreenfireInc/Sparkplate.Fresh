// Mintscan - Premier Cosmos Ecosystem Block Explorer
// Comprehensive blockchain data and analytics for Terra Classic

export const mintscanOracle = {
  name: 'Mintscan (by Cosmostation)',
  blockchain: 'Terra Classic (LUNC)',
  type: 'Block Explorer & API Provider',
  
  description: `Mintscan is the leading block explorer for the Cosmos ecosystem, including Terra Classic (LUNC). Developed by Cosmostation, it provides comprehensive blockchain data, transaction tracking, validator information, and analytics for the columbus-5 chain. Mintscan continues to support Terra Classic post-collapse, offering both a user-friendly web interface and a robust API with generous free tier limits (2 requests/second, 10,000 daily calls).`,

  features: [
    'Comprehensive blockchain explorer',
    'Real-time transaction tracking',
    'Validator information and stats',
    'Token price and market data',
    'Block and transaction search',
    'Account balance queries',
    'Staking and delegation data',
    'Historical data access',
  ],

  api: {
    website: 'https://www.mintscan.io/terra-classic',
    documentation: 'https://docs.cosmostation.io/apis',
    apiEndpoint: 'https://api-terra-classic.cosmostation.io',
    mainnetExplorer: 'https://www.mintscan.io/terra-classic',
    testnetExplorer: 'https://www.mintscan.io/terra-classic-testnet',
  },

  sdk: {
    primaryPackage: 'REST API (axios recommended)',
    installCommand: 'npm install axios',
    supportedLanguages: ['Any (REST API)', 'TypeScript', 'JavaScript', 'Python'],
  },

  socialMedia: {
    website: 'https://www.cosmostation.io/',
    twitter: 'https://twitter.com/CosmostationVD',
    telegram: 'https://t.me/cosmostation',
    medium: 'https://medium.com/cosmostation',
    github: 'https://github.com/cosmostation',
  },

  freeTier: {
    rateLimit: '2 requests per second',
    dailyLimit: '10,000 calls per day',
    authentication: 'Optional (higher limits with API key)',
  },

  endpoints: {
    accountBalance: '/v1/account/balance/{address}',
    tokenPrice: '/v1/market/price',
    transactions: '/v1/account/txs/{address}',
    validators: '/v1/staking/validators',
    blocks: '/v1/blocks/latest',
    chainStats: '/v1/status',
  },

  useCases: [
    'LUNC price tracking',
    'Transaction monitoring',
    'Wallet balance queries',
    'Validator statistics',
    'Staking data retrieval',
    'Block exploration',
    'Historical data analysis',
    'Analytics and reporting',
  ],

  integration: {
    example: `
import axios from 'axios';

/**
 * Mintscan API Integration for Terra Classic (LUNC)
 * Comprehensive blockchain explorer and data provider for columbus-5
 */

const MINTSCAN_API = 'https://api-terra-classic.cosmostation.io';
const MINTSCAN_EXPLORER = 'https://www.mintscan.io/terra-classic';

/**
 * Get LUNC price from Mintscan
 */
async function getMintscanLUNCPrice() {
  try {
    const response = await axios.get(\`\${MINTSCAN_API}/v1/market/price\`, {
      params: {
        denom: 'uluna', // LUNC micro denomination
      },
    });

    const { price, denom, symbol } = response.data;
    const priceUSD = parseFloat(price);

    console.log(\`Mintscan LUNC Price: $\${priceUSD.toFixed(8)}\`);
    console.log(\`Symbol: \${symbol}\`);
    console.log(\`Denom: \${denom}\`);

    return {
      price: priceUSD,
      symbol,
      denom,
      source: 'Mintscan',
    };
  } catch (error) {
    console.error('Error fetching Mintscan LUNC price:', error);
    throw error;
  }
}

/**
 * Get account balance for a Terra Classic address
 */
async function getAccountBalance(address: string) {
  try {
    const response = await axios.get(
      \`\${MINTSCAN_API}/v1/account/balance/\${address}\`
    );

    const balances = response.data.balance;

    console.log(\`\\nAccount: \${address}\`);
    console.log('Balances:');
    
    balances.forEach((balance: any) => {
      const amount = parseFloat(balance.amount) / 1e6; // Convert from uluna to LUNC
      console.log(\`  \${balance.denom}: \${amount.toFixed(6)}\`);
    });

    return balances.map((balance: any) => ({
      denom: balance.denom,
      amount: parseFloat(balance.amount),
      amountFormatted: parseFloat(balance.amount) / 1e6,
    }));
  } catch (error) {
    console.error('Error fetching account balance:', error);
    throw error;
  }
}

/**
 * Get latest transactions for an address
 */
async function getAccountTransactions(
  address: string,
  limit: number = 10,
  offset: number = 0
) {
  try {
    const response = await axios.get(
      \`\${MINTSCAN_API}/v1/account/txs/\${address}\`,
      {
        params: {
          limit,
          offset,
        },
      }
    );

    const transactions = response.data.txs;

    console.log(\`\\nTransactions for \${address} (Showing \${transactions.length}):\`);
    
    transactions.forEach((tx: any, index: number) => {
      console.log(\`\\n\${index + 1}. Hash: \${tx.txhash}\`);
      console.log(\`   Height: \${tx.height}\`);
      console.log(\`   Status: \${tx.code === 0 ? '✅ Success' : '❌ Failed'}\`);
      console.log(\`   Time: \${new Date(tx.timestamp).toISOString()}\`);
    });

    return transactions.map((tx: any) => ({
      hash: tx.txhash,
      height: tx.height,
      status: tx.code === 0 ? 'success' : 'failed',
      timestamp: new Date(tx.timestamp),
      explorerLink: \`\${MINTSCAN_EXPLORER}/txs/\${tx.txhash}\`,
    }));
  } catch (error) {
    console.error('Error fetching account transactions:', error);
    throw error;
  }
}

/**
 * Get validator list
 */
async function getValidators(status: 'active' | 'inactive' = 'active') {
  try {
    const response = await axios.get(\`\${MINTSCAN_API}/v1/staking/validators\`, {
      params: {
        status,
      },
    });

    const validators = response.data.validators;

    console.log(\`\\nTerra Classic Validators (\${status}): \${validators.length}\`);
    
    validators.slice(0, 5).forEach((validator: any, index: number) => {
      console.log(\`\\n\${index + 1}. \${validator.moniker}\`);
      console.log(\`   Commission: \${(parseFloat(validator.commission) * 100).toFixed(2)}%\`);
      console.log(\`   Voting Power: \${parseFloat(validator.voting_power).toFixed(2)}\`);
    });

    return validators.map((validator: any) => ({
      moniker: validator.moniker,
      operatorAddress: validator.operator_address,
      commission: parseFloat(validator.commission),
      votingPower: parseFloat(validator.voting_power),
      jailed: validator.jailed,
    }));
  } catch (error) {
    console.error('Error fetching validators:', error);
    throw error;
  }
}

/**
 * Get latest blocks
 */
async function getLatestBlocks(limit: number = 10) {
  try {
    const response = await axios.get(\`\${MINTSCAN_API}/v1/blocks/latest\`, {
      params: {
        limit,
      },
    });

    const blocks = response.data.blocks;

    console.log(\`\\nLatest \${blocks.length} Terra Classic Blocks:\`);
    
    blocks.forEach((block: any, index: number) => {
      console.log(\`\${index + 1}. Height: \${block.height}\`);
      console.log(\`   Txs: \${block.num_txs}\`);
      console.log(\`   Time: \${new Date(block.timestamp).toISOString()}\`);
    });

    return blocks.map((block: any) => ({
      height: block.height,
      numTxs: block.num_txs,
      proposer: block.proposer,
      timestamp: new Date(block.timestamp),
      explorerLink: \`\${MINTSCAN_EXPLORER}/blocks/\${block.height}\`,
    }));
  } catch (error) {
    console.error('Error fetching latest blocks:', error);
    throw error;
  }
}

/**
 * Get chain status and statistics
 */
async function getChainStatus() {
  try {
    const response = await axios.get(\`\${MINTSCAN_API}/v1/status\`);

    const {
      chain_id,
      latest_block_height,
      latest_block_time,
      bonded_tokens,
      total_supply,
    } = response.data;

    console.log('\\n=== Terra Classic Chain Status ===');
    console.log(\`Chain ID: \${chain_id}\`);
    console.log(\`Latest Block: \${latest_block_height}\`);
    console.log(\`Block Time: \${new Date(latest_block_time).toISOString()}\`);
    console.log(\`Bonded Tokens: \${(parseFloat(bonded_tokens) / 1e6).toLocaleString()} LUNC\`);
    console.log(\`Total Supply: \${(parseFloat(total_supply) / 1e12).toFixed(2)}T LUNC\`);

    return {
      chainId: chain_id,
      latestBlockHeight: latest_block_height,
      latestBlockTime: new Date(latest_block_time),
      bondedTokens: parseFloat(bonded_tokens) / 1e6,
      totalSupply: parseFloat(total_supply) / 1e6,
      totalSupplyTrillions: parseFloat(total_supply) / 1e12,
    };
  } catch (error) {
    console.error('Error fetching chain status:', error);
    throw error;
  }
}

/**
 * Monitor LUNC price changes
 */
async function monitorLUNCPrice(
  callback: (price: number, change: number) => void,
  intervalMs: number = 30000
) {
  console.log('Starting Mintscan LUNC price monitoring...\\n');

  let lastPrice: number | null = null;

  setInterval(async () => {
    try {
      const data = await getMintscanLUNCPrice();
      
      if (lastPrice !== null) {
        const change = ((data.price - lastPrice) / lastPrice) * 100;
        console.log(
          \`Price: $\${data.price.toFixed(8)} (\${change >= 0 ? '+' : ''}\${change.toFixed(2)}%)\`
        );
        callback(data.price, change);
      } else {
        console.log(\`Initial price: $\${data.price.toFixed(8)}\`);
      }
      
      lastPrice = data.price;
    } catch (error) {
      console.error('Monitoring error:', error);
    }
  }, intervalMs);
}

/**
 * Get comprehensive account information
 */
async function getAccountInfo(address: string) {
  try {
    const [balance, transactions] = await Promise.all([
      getAccountBalance(address),
      getAccountTransactions(address, 5),
    ]);

    console.log(\`\\n=== Account Summary: \${address} ===\`);
    console.log(\`Balances: \${balance.length} tokens\`);
    console.log(\`Recent Transactions: \${transactions.length}\`);

    return {
      address,
      balances: balance,
      recentTransactions: transactions,
      explorerLink: \`\${MINTSCAN_EXPLORER}/account/\${address}\`,
    };
  } catch (error) {
    console.error('Error fetching account info:', error);
    throw error;
  }
}

// Example usage
async function main() {
  console.log('Querying Mintscan API for Terra Classic data...\\n');

  // Get LUNC price
  const price = await getMintscanLUNCPrice();
  console.log(\`\\nCurrent LUNC Price: $\${price.price.toFixed(8)}\`);

  // Get chain status
  const status = await getChainStatus();
  console.log(\`\\nLatest Block: \${status.latestBlockHeight}\`);
  console.log(\`Total Supply: \${status.totalSupplyTrillions.toFixed(2)}T LUNC\`);

  // Get validators
  const validators = await getValidators('active');
  console.log(\`\\nActive Validators: \${validators.length}\`);

  // Get latest blocks
  await getLatestBlocks(5);
}

export {
  getMintscanLUNCPrice,
  getAccountBalance,
  getAccountTransactions,
  getValidators,
  getLatestBlocks,
  getChainStatus,
  monitorLUNCPrice,
  getAccountInfo,
  MINTSCAN_API,
  MINTSCAN_EXPLORER,
};
    `.trim(),
  },

  notes: [
    'Leading Cosmos ecosystem block explorer',
    'Generous free tier (2 req/s, 10k daily)',
    'Comprehensive blockchain data',
    'Real-time transaction tracking',
    'Validator and staking information',
    'User-friendly web interface',
    'No API key required for basic usage',
    'Continues supporting Terra Classic post-collapse',
  ],

  limitations: [
    'Rate limited on free tier',
    'Focus on blockchain data, not just prices',
    'Requires address-specific queries',
    'API documentation could be more detailed',
  ],

  alternatives: [
    'Terra Classic Finder (official explorer)',
    'LuncScan (Terra Classic specific)',
    'ATOMScan (alternative Cosmos explorer)',
    'Terra Classic Tools (community hub)',
  ],
};

