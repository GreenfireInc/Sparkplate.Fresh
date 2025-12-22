/**
 * Arweave RPC Methods Handler
 * 
 * Handles ArConnect and Arweave wallet RPC method calls.
 * Maps dApp requests to Arweave SDK operations.
 */

import Arweave from 'arweave';
import type { Transaction } from 'arweave/node/lib/transaction';

export interface ArweaveRPCParams {
  wallet?: any;
  params?: any[];
  network?: string;
  dispatch?: any;
}

export interface ArweaveTransactionParams {
  target?: string;
  quantity?: string;
  data?: string | Uint8Array;
  tags?: Array<{ name: string; value: string }>;
  reward?: string;
}

// Initialize Arweave instance
function getArweaveInstance(network: string = 'mainnet'): Arweave {
  const config = network === 'mainnet' 
    ? {
        host: 'arweave.net',
        port: 443,
        protocol: 'https'
      }
    : {
        host: 'testnet.redstone.tools',
        port: 443,
        protocol: 'https'
      };

  return Arweave.init(config);
}

export const arweaveMethods = {
  /**
   * Send a signed transaction to the Arweave network
   */
  async arweave_sendTransaction({ params, network }: ArweaveRPCParams) {
    const arweave = getArweaveInstance(network || 'mainnet');
    const transaction = params?.[0];
    
    if (!transaction) {
      throw new Error('No transaction provided');
    }

    // If transaction is already signed, post it
    if (transaction instanceof Transaction) {
      const response = await arweave.transactions.post(transaction);
      return transaction.id;
    }

    // If it's a transaction ID, return it (already posted)
    if (typeof transaction === 'string') {
      return transaction;
    }

    throw new Error('Invalid transaction format');
  },

  /**
   * Create and sign a transaction
   */
  async arweave_createTransaction({ wallet, params, network }: ArweaveRPCParams) {
    if (!wallet) {
      throw new Error('Wallet required for transaction creation');
    }

    const arweave = getArweaveInstance(network || 'mainnet');
    const txParams = parseTransactionFromParams(params);

    // Create transaction
    const transaction = await arweave.createTransaction(txParams, wallet.jwk || wallet);

    // Add tags if provided
    if (txParams.tags) {
      txParams.tags.forEach(tag => {
        transaction.addTag(tag.name, tag.value);
      });
    }

    // Sign transaction
    await arweave.transactions.sign(transaction, wallet.jwk || wallet);

    return {
      id: transaction.id,
      transaction: transaction,
      signed: true
    };
  },

  /**
   * Sign a transaction without posting
   */
  async arweave_signTransaction({ wallet, params, network }: ArweaveRPCParams) {
    if (!wallet) {
      throw new Error('Wallet required for transaction signing');
    }

    const arweave = getArweaveInstance(network || 'mainnet');
    const transaction = params?.[0];

    if (!transaction || !(transaction instanceof Transaction)) {
      throw new Error('Invalid transaction object');
    }

    // Sign transaction
    await arweave.transactions.sign(transaction, wallet.jwk || wallet);

    return {
      id: transaction.id,
      transaction: transaction,
      signed: true
    };
  },

  /**
   * Get wallet address
   */
  async arweave_getAddress({ wallet }: ArweaveRPCParams) {
    if (!wallet) {
      throw new Error('Wallet required');
    }

    const arweave = getArweaveInstance();
    const address = await arweave.wallets.getAddress(wallet.jwk || wallet);
    return address;
  },

  /**
   * Get wallet balance
   */
  async arweave_getBalance({ wallet, params, network }: ArweaveRPCParams) {
    const arweave = getArweaveInstance(network || 'mainnet');
    
    let address: string;
    if (params && params[0]) {
      address = params[0];
    } else if (wallet) {
      address = await arweave.wallets.getAddress(wallet.jwk || wallet);
    } else {
      throw new Error('Address or wallet required');
    }

    const balance = await arweave.wallets.getBalance(address);
    const arBalance = arweave.ar.winstonToAr(balance);
    
    return {
      winston: balance,
      ar: arBalance
    };
  },

  /**
   * Get transaction data
   */
  async arweave_getTransaction({ params, network }: ArweaveRPCParams) {
    const arweave = getArweaveInstance(network || 'mainnet');
    const txId = params?.[0];

    if (!txId) {
      throw new Error('Transaction ID required');
    }

    const transaction = await arweave.transactions.get(txId);
    const status = await arweave.transactions.getStatus(txId);

    return {
      transaction,
      status
    };
  },

  /**
   * Get transaction data as string
   */
  async arweave_getTransactionData({ params, network }: ArweaveRPCParams) {
    const arweave = getArweaveInstance(network || 'mainnet');
    const txId = params?.[0];

    if (!txId) {
      throw new Error('Transaction ID required');
    }

    const data = await arweave.transactions.getData(txId, { decode: true, string: true });
    return data;
  },

  /**
   * Get block information
   */
  async arweave_getBlock({ params, network }: ArweaveRPCParams) {
    const arweave = getArweaveInstance(network || 'mainnet');
    const blockId = params?.[0];

    if (!blockId) {
      throw new Error('Block ID required');
    }

    const block = await arweave.blocks.get(blockId);
    return block;
  },

  /**
   * Get current block height
   */
  async arweave_getBlockHeight({ network }: ArweaveRPCParams) {
    const arweave = getArweaveInstance(network || 'mainnet');
    const height = await arweave.blocks.getCurrent();
    return height.height;
  },

  /**
   * Get network info
   */
  async arweave_getNetworkInfo({ network }: ArweaveRPCParams) {
    const arweave = getArweaveInstance(network || 'mainnet');
    const info = await arweave.network.getInfo();
    return info;
  }
};

/**
 * Parse transaction parameters from RPC request
 */
export function parseTransactionFromParams(params: any[]): ArweaveTransactionParams {
  if (!params || params.length === 0) {
    throw new Error('No transaction parameters provided');
  }

  const tx = params[0];
  
  return {
    target: tx.target,
    quantity: tx.quantity,
    data: tx.data,
    tags: tx.tags,
    reward: tx.reward
  };
}

export default {
  arweaveMethods,
  parseTransactionFromParams
};
