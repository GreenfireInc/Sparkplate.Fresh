// Etherscan - Premier Ethereum Block Explorer and API
// Comprehensive blockchain data access with industry-leading APIs

export const etherscanOracle = {
  name: 'Etherscan',
  blockchain: 'Ethereum (ETH)',
  type: 'Block Explorer & API',
  
  description: `Etherscan is the premier Ethereum block explorer providing comprehensive blockchain data through REST APIs. With free and pro tiers, Etherscan offers access to transactions, addresses, contracts, tokens, gas prices, and extensive blockchain analytics. The API is transitioning to V2 by May 31, 2025.`,

  features: [
    'Most comprehensive Ethereum blockchain data',
    'Transaction and address tracking',
    'Smart contract verification and interaction',
    'ERC-20 and NFT token data',
    'Gas price tracking and recommendations',
    'Historical data and analytics',
    'ENS (Ethereum Name Service) resolution',
    'Etherscan V2 API launching',
  ],

  api: {
    website: 'https://etherscan.io/',
    documentation: 'https://docs.etherscan.io/',
    v1Endpoint: 'https://api.etherscan.io/api',
    v2Endpoint: 'https://api.etherscan.io/v2/api',
    getAPIKey: 'https://etherscan.io/apis',
    rateLimit: '5 calls/second (free tier)',
  },

  sdk: {
    primaryPackage: 'axios (REST API)',
    installCommand: 'npm install axios',
    supportedLanguages: ['TypeScript', 'JavaScript', 'Python', 'Go', 'PHP'],
  },

  socialMedia: {
    website: 'https://etherscan.io/',
    twitter: 'https://twitter.com/etherscan',
    telegram: 'https://t.me/etherscan',
    facebook: 'https://www.facebook.com/etherscan/',
    reddit: 'https://www.reddit.com/r/etherscan/',
    medium: 'https://medium.com/etherscan-blog',
  },

  useCases: [
    'Wallet transaction history',
    'Address balance tracking',
    'Smart contract interaction',
    'Token transfer monitoring',
    'Gas price estimation',
    'Block and transaction lookup',
    'Contract verification status',
    'ENS domain resolution',
  ],

  integration: {
    example: `
import axios from 'axios';

/**
 * Etherscan API Integration for Ethereum
 * Comprehensive blockchain data access
 */

const ETHERSCAN_API = {
  baseUrl: 'https://api.etherscan.io/api',
  apiKey: 'YOUR_API_KEY', // Get from https://etherscan.io/apis
};

/**
 * Get account balance
 */
async function getAccountBalance(address: string): Promise<string> {
  try {
    const response = await axios.get(ETHERSCAN_API.baseUrl, {
      params: {
        module: 'account',
        action: 'balance',
        address,
        tag: 'latest',
        apikey: ETHERSCAN_API.apiKey,
      },
    });

    if (response.data.status !== '1') {
      throw new Error(response.data.message);
    }

    const balanceWei = response.data.result;
    const balanceETH = parseFloat(balanceWei) / 1e18;

    console.log(\`Balance for \${address}: \${balanceETH} ETH\`);
    return balanceETH.toString();
  } catch (error) {
    console.error('Error fetching balance:', error);
    throw error;
  }
}

/**
 * Get transaction list for an address
 */
async function getTransactionList(
  address: string,
  startBlock: number = 0,
  endBlock: number = 99999999,
  page: number = 1,
  offset: number = 10
) {
  try {
    const response = await axios.get(ETHERSCAN_API.baseUrl, {
      params: {
        module: 'account',
        action: 'txlist',
        address,
        startblock: startBlock,
        endblock: endBlock,
        page,
        offset,
        sort: 'desc',
        apikey: ETHERSCAN_API.apiKey,
      },
    });

    if (response.data.status !== '1') {
      throw new Error(response.data.message);
    }

    console.log(\`Transactions for \${address}:\`, response.data.result.length);
    return response.data.result;
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error;
  }
}

/**
 * Get ERC-20 token transfers
 */
async function getTokenTransfers(
  address: string,
  contractAddress?: string,
  startBlock: number = 0
) {
  try {
    const params: any = {
      module: 'account',
      action: 'tokentx',
      address,
      startblock: startBlock,
      endblock: 99999999,
      sort: 'desc',
      apikey: ETHERSCAN_API.apiKey,
    };

    if (contractAddress) {
      params.contractaddress = contractAddress;
    }

    const response = await axios.get(ETHERSCAN_API.baseUrl, { params });

    if (response.data.status !== '1') {
      throw new Error(response.data.message);
    }

    console.log('Token transfers:', response.data.result.length);
    return response.data.result;
  } catch (error) {
    console.error('Error fetching token transfers:', error);
    throw error;
  }
}

/**
 * Get current gas price
 */
async function getGasPrice() {
  try {
    const response = await axios.get(ETHERSCAN_API.baseUrl, {
      params: {
        module: 'gastracker',
        action: 'gasoracle',
        apikey: ETHERSCAN_API.apiKey,
      },
    });

    if (response.data.status !== '1') {
      throw new Error(response.data.message);
    }

    const gasData = response.data.result;

    console.log('Gas Prices (Gwei):');
    console.log(\`  Low: \${gasData.SafeGasPrice}\`);
    console.log(\`  Average: \${gasData.ProposeGasPrice}\`);
    console.log(\`  Fast: \${gasData.FastGasPrice}\`);

    return {
      low: parseInt(gasData.SafeGasPrice),
      average: parseInt(gasData.ProposeGasPrice),
      fast: parseInt(gasData.FastGasPrice),
      suggestBaseFee: parseFloat(gasData.suggestBaseFee),
    };
  } catch (error) {
    console.error('Error fetching gas price:', error);
    throw error;
  }
}

/**
 * Get transaction receipt status
 */
async function getTransactionStatus(txHash: string) {
  try {
    const response = await axios.get(ETHERSCAN_API.baseUrl, {
      params: {
        module: 'transaction',
        action: 'gettxreceiptstatus',
        txhash: txHash,
        apikey: ETHERSCAN_API.apiKey,
      },
    });

    if (response.data.status !== '1') {
      throw new Error(response.data.message);
    }

    const status = response.data.result.status;
    return {
      status,
      isSuccessful: status === '1',
    };
  } catch (error) {
    console.error('Error checking transaction status:', error);
    throw error;
  }
}

/**
 * Get contract ABI
 */
async function getContractABI(contractAddress: string) {
  try {
    const response = await axios.get(ETHERSCAN_API.baseUrl, {
      params: {
        module: 'contract',
        action: 'getabi',
        address: contractAddress,
        apikey: ETHERSCAN_API.apiKey,
      },
    });

    if (response.data.status !== '1') {
      throw new Error(response.data.message);
    }

    const abi = JSON.parse(response.data.result);
    console.log(\`ABI retrieved for contract \${contractAddress}\`);
    return abi;
  } catch (error) {
    console.error('Error fetching contract ABI:', error);
    throw error;
  }
}

/**
 * Get ERC-20 token info
 */
async function getTokenInfo(contractAddress: string) {
  try {
    const response = await axios.get(ETHERSCAN_API.baseUrl, {
      params: {
        module: 'token',
        action: 'tokeninfo',
        contractaddress: contractAddress,
        apikey: ETHERSCAN_API.apiKey,
      },
    });

    if (response.data.status !== '1') {
      throw new Error(response.data.message);
    }

    const tokenInfo = response.data.result[0];

    console.log('Token Info:');
    console.log(\`  Name: \${tokenInfo.tokenName}\`);
    console.log(\`  Symbol: \${tokenInfo.symbol}\`);
    console.log(\`  Decimals: \${tokenInfo.divisor}\`);
    console.log(\`  Total Supply: \${tokenInfo.totalSupply}\`);

    return tokenInfo;
  } catch (error) {
    console.error('Error fetching token info:', error);
    throw error;
  }
}

/**
 * Get NFT transfers
 */
async function getNFTTransfers(
  address: string,
  contractAddress?: string
) {
  try {
    const params: any = {
      module: 'account',
      action: 'tokennfttx',
      address,
      startblock: 0,
      endblock: 99999999,
      sort: 'desc',
      apikey: ETHERSCAN_API.apiKey,
    };

    if (contractAddress) {
      params.contractaddress = contractAddress;
    }

    const response = await axios.get(ETHERSCAN_API.baseUrl, { params });

    if (response.data.status !== '1') {
      throw new Error(response.data.message);
    }

    console.log('NFT transfers:', response.data.result.length);
    return response.data.result;
  } catch (error) {
    console.error('Error fetching NFT transfers:', error);
    throw error;
  }
}

/**
 * Resolve ENS name to address
 */
async function resolveENS(ensName: string) {
  try {
    const response = await axios.get(ETHERSCAN_API.baseUrl, {
      params: {
        module: 'ens',
        action: 'resolve',
        name: ensName,
        apikey: ETHERSCAN_API.apiKey,
      },
    });

    if (response.data.status !== '1') {
      throw new Error(response.data.message);
    }

    const address = response.data.result;
    console.log(\`\${ensName} resolves to \${address}\`);
    return address;
  } catch (error) {
    console.error('Error resolving ENS:', error);
    throw error;
  }
}

// Example usage
async function main() {
  const testAddress = '0x742d35Cc6634C0532925a3b844Bc454e4438f44e';

  console.log('Fetching Ethereum data from Etherscan...');

  const balance = await getAccountBalance(testAddress);
  console.log(\`Balance: \${balance} ETH\`);

  const transactions = await getTransactionList(testAddress, 0, 99999999, 1, 5);
  console.log(\`Transaction count: \${transactions.length}\`);

  const gasPrice = await getGasPrice();
  console.log(\`Average gas price: \${gasPrice.average} Gwei\`);
}

export {
  getAccountBalance,
  getTransactionList,
  getTokenTransfers,
  getGasPrice,
  getTransactionStatus,
  getContractABI,
  getTokenInfo,
  getNFTTransfers,
  resolveENS,
};
    `.trim(),
  },

  notes: [
    'Premier Ethereum block explorer',
    'Most comprehensive blockchain data',
    'Free tier: 5 calls/second',
    'Pro tiers available for higher rate limits',
    'Transitioning to V2 API by May 31, 2025',
    'ENS domain resolution support',
    'Smart contract verification',
    'Gas price tracking and recommendations',
  ],

  limitations: [
    'Rate limits on free tier (5 calls/second)',
    'API key required',
    'V1 API sunset on May 31, 2025',
    'Some endpoints require paid plans',
  ],

  alternatives: [
    'Blockscout',
    'Alchemy Enhanced APIs',
    'Moralis API',
    'Covalent API',
  ],
};

