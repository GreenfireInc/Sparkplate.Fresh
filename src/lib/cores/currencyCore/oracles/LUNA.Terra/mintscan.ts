// Mintscan - Premier Cosmos Ecosystem Block Explorer
// Comprehensive blockchain data and analytics for Terra

export const mintscanOracle = {
  name: 'Mintscan (by Cosmostation)',
  blockchain: 'Terra (LUNA)',
  type: 'Block Explorer & API Provider',
  
  description: `Mintscan is the leading block explorer for the Cosmos ecosystem, including Terra (LUNA). Developed by Cosmostation, it provides comprehensive blockchain data, transaction tracking, validator information, and analytics. Mintscan offers both a user-friendly web interface and a robust API for developers, with generous free tier limits (2 requests/second, 10,000 daily calls) making it ideal for LUNA price tracking, transaction monitoring, and blockchain analysis.`,

  features: [
    'Comprehensive blockchain explorer',
    'Real-time transaction tracking',
    'Validator information and stats',
    'Token price and market data',
    'Block and transaction search',
    'Account balance queries',
    'Staking and delegation data',
    'IBC transfer tracking',
  ],

  api: {
    website: 'https://www.mintscan.io/terra',
    documentation: 'https://docs.cosmostation.io/apis',
    apiEndpoint: 'https://api-terra.cosmostation.io',
    mainnetExplorer: 'https://www.mintscan.io/terra',
    testnetExplorer: 'https://www.mintscan.io/terra-testnet',
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
    'LUNA price tracking',
    'Transaction monitoring',
    'Wallet balance queries',
    'Validator statistics',
    'Staking data retrieval',
    'Block exploration',
    'IBC transfer tracking',
    'Analytics and reporting',
  ],

  integration: {
    example: `
import axios from 'axios';

/**
 * Mintscan API Integration for Terra (LUNA)
 * Comprehensive blockchain explorer and data provider
 */

const MINTSCAN_API = 'https://api-terra.cosmostation.io';
const MINTSCAN_EXPLORER = 'https://www.mintscan.io/terra';

/**
 * Get LUNA price from Mintscan
 */
async function getMintscanLUNAPrice() {
  try {
    const response = await axios.get(\`\${MINTSCAN_API}/v1/market/price\`, {
      params: {
        denom: 'uluna',
      },
    });

    const { price, denom, symbol } = response.data;
    const priceUSD = parseFloat(price);

    console.log(\`Mintscan LUNA Price: $\${priceUSD.toFixed(4)}\`);
    console.log(\`Symbol: \${symbol}\`);
    console.log(\`Denom: \${denom}\`);

    return {
      price: priceUSD,
      symbol,
      denom,
      source: 'Mintscan',
    };
  } catch (error) {
    console.error('Error fetching Mintscan LUNA price:', error);
    throw error;
  }
}

/**
 * Get account balance for a Terra address
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
      const amount = parseFloat(balance.amount) / 1e6; // Convert from uluna to LUNA
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

    console.log(\`\\nTerra Validators (\${status}): \${validators.length}\`);
    
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

    console.log(\`\\nLatest \${blocks.length} Terra Blocks:\`);
    
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

    console.log('\\n=== Terra Chain Status ===');
    console.log(\`Chain ID: \${chain_id}\`);
    console.log(\`Latest Block: \${latest_block_height}\`);
    console.log(\`Block Time: \${new Date(latest_block_time).toISOString()}\`);
    console.log(\`Bonded Tokens: \${(parseFloat(bonded_tokens) / 1e6).toLocaleString()} LUNA\`);
    console.log(\`Total Supply: \${(parseFloat(total_supply) / 1e6).toLocaleString()} LUNA\`);

    return {
      chainId: chain_id,
      latestBlockHeight: latest_block_height,
      latestBlockTime: new Date(latest_block_time),
      bondedTokens: parseFloat(bonded_tokens) / 1e6,
      totalSupply: parseFloat(total_supply) / 1e6,
    };
  } catch (error) {
    console.error('Error fetching chain status:', error);
    throw error;
  }
}

/**
 * Monitor LUNA price changes
 */
async function monitorLUNAPrice(
  callback: (price: number, change: number) => void,
  intervalMs: number = 30000
) {
  console.log('Starting Mintscan LUNA price monitoring...\\n');

  let lastPrice: number | null = null;

  setInterval(async () => {
    try {
      const data = await getMintscanLUNAPrice();
      
      if (lastPrice !== null) {
        const change = ((data.price - lastPrice) / lastPrice) * 100;
        console.log(
          \`Price: $\${data.price.toFixed(4)} (\${change >= 0 ? '+' : ''}\${change.toFixed(2)}%)\`
        );
        callback(data.price, change);
      } else {
        console.log(\`Initial price: $\${data.price.toFixed(4)}\`);
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

/**
 * Calculate staking statistics
 */
async function getStakingStats() {
  try {
    const [validators, chainStatus] = await Promise.all([
      getValidators('active'),
      getChainStatus(),
    ]);

    const totalBonded = chainStatus.bondedTokens;
    const totalSupply = chainStatus.totalSupply;
    const stakingRatio = (totalBonded / totalSupply) * 100;

    console.log('\\n=== Terra Staking Statistics ===');
    console.log(\`Active Validators: \${validators.length}\`);
    console.log(\`Total Bonded: \${totalBonded.toLocaleString()} LUNA\`);
    console.log(\`Total Supply: \${totalSupply.toLocaleString()} LUNA\`);
    console.log(\`Staking Ratio: \${stakingRatio.toFixed(2)}%\`);

    return {
      activeValidators: validators.length,
      totalBonded,
      totalSupply,
      stakingRatio,
    };
  } catch (error) {
    console.error('Error calculating staking stats:', error);
    throw error;
  }
}

// Example usage
async function main() {
  console.log('Querying Mintscan API for Terra data...\\n');

  // Get LUNA price
  const price = await getMintscanLUNAPrice();
  console.log(\`\\nCurrent LUNA Price: $\${price.price.toFixed(4)}\`);

  // Get chain status
  const status = await getChainStatus();
  console.log(\`\\nLatest Block: \${status.latestBlockHeight}\`);

  // Get validators
  const validators = await getValidators('active');
  console.log(\`\\nActive Validators: \${validators.length}\`);

  // Get staking stats
  await getStakingStats();

  // Get latest blocks
  await getLatestBlocks(5);
}

export {
  getMintscanLUNAPrice,
  getAccountBalance,
  getAccountTransactions,
  getValidators,
  getLatestBlocks,
  getChainStatus,
  monitorLUNAPrice,
  getAccountInfo,
  getStakingStats,
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
    'Supports all Cosmos SDK chains',
  ],

  limitations: [
    'Rate limited on free tier',
    'Focus on blockchain data, not just prices',
    'Requires address-specific queries',
    'API documentation could be more detailed',
  ],

  alternatives: [
    'Terra Finder (official Terra explorer)',
    'ATOMScan (alternative Cosmos explorer)',
    'GetBlock (RPC node provider)',
    'NOWNodes (multi-chain node service)',
  ],
};

