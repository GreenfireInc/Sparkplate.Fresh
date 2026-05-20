/**
 * Solana (SOL) RPC Methods Handler
 * 
 * Handles WalletConnect and Solana wallet RPC method calls for Solana.
 * Solana uses a unique transaction model with Ed25519 signatures.
 */

import { Connection, PublicKey, Transaction, VersionedTransaction, Keypair } from '@solana/web3.js';
import bs58 from 'bs58';

export interface SOLRPCParams {
  wallet?: any;
  params?: any[];
  network?: string;
  dispatch?: any;
}

// Network configurations for Solana
const networkConfigs: Record<string, any> = {
  mainnet: {
    rpc: 'https://api.mainnet-beta.solana.com',
    name: 'Solana Mainnet',
    cluster: 'mainnet-beta'
  },
  devnet: {
    rpc: 'https://api.devnet.solana.com',
    name: 'Solana Devnet',
    cluster: 'devnet'
  },
  testnet: {
    rpc: 'https://api.testnet.solana.com',
    name: 'Solana Testnet',
    cluster: 'testnet'
  }
};

// Get connection for specified network
function getConnection(network: string = 'mainnet') {
  const config = networkConfigs[network] || networkConfigs.mainnet;
  return new Connection(config.rpc, 'confirmed');
}

export const solMethods = {
  /**
   * Send a signed transaction to the Solana network
   */
  async solana_sendTransaction({ params, network }: SOLRPCParams) {
    const connection = getConnection(network || 'mainnet');
    const signedTx = params?.[0];
    
    if (!signedTx) {
      throw new Error('No signed transaction provided');
    }

    // Decode transaction
    const txBuffer = Buffer.from(signedTx, 'base64');
    let transaction: Transaction | VersionedTransaction;
    
    try {
      transaction = VersionedTransaction.deserialize(txBuffer);
    } catch {
      transaction = Transaction.from(txBuffer);
    }

    // Send transaction
    const signature = await connection.sendRawTransaction(
      transaction.serialize(),
      { skipPreflight: false, maxRetries: 3 }
    );

    // Wait for confirmation
    await connection.confirmTransaction(signature, 'confirmed');
    
    return signature;
  },

  /**
   * Sign and send a transaction
   */
  async solana_signAndSendTransaction({ wallet, params, network }: SOLRPCParams) {
    if (!wallet) {
      throw new Error('Wallet required for transaction signing');
    }

    const connection = getConnection(network || 'mainnet');
    const transaction = parseTransactionFromParams(params);

    // Sign transaction
    if (wallet.privateKey) {
      const keypair = Keypair.fromSecretKey(
        typeof wallet.privateKey === 'string' 
          ? bs58.decode(wallet.privateKey)
          : wallet.privateKey
      );
      transaction.sign(keypair);
    } else if (wallet.signTransaction) {
      // Wallet adapter
      await wallet.signTransaction(transaction);
    } else {
      throw new Error('No signing method available');
    }

    // Send transaction
    const signature = await connection.sendRawTransaction(
      transaction.serialize(),
      { skipPreflight: false, maxRetries: 3 }
    );

    // Wait for confirmation
    await connection.confirmTransaction(signature, 'confirmed');
    
    return signature;
  },

  /**
   * Sign a transaction without sending
   */
  async solana_signTransaction({ wallet, params, network }: SOLRPCParams) {
    if (!wallet) {
      throw new Error('Wallet required for transaction signing');
    }

    const transaction = parseTransactionFromParams(params);

    // Sign transaction
    if (wallet.privateKey) {
      const keypair = Keypair.fromSecretKey(
        typeof wallet.privateKey === 'string' 
          ? bs58.decode(wallet.privateKey)
          : wallet.privateKey
      );
      transaction.sign(keypair);
    } else if (wallet.signTransaction) {
      await wallet.signTransaction(transaction);
    } else {
      throw new Error('No signing method available');
    }

    // Return signed transaction as base64
    return transaction.serialize().toString('base64');
  },

  /**
   * Sign a message
   */
  async solana_signMessage({ wallet, params, network }: SOLRPCParams) {
    if (!wallet) {
      throw new Error('Wallet required for message signing');
    }

    const message = params?.[0];
    const display = params?.[1] || 'utf8';
    
    if (!message) {
      throw new Error('Message required');
    }

    // Convert message to Uint8Array
    const messageBytes = typeof message === 'string' 
      ? new TextEncoder().encode(message)
      : new Uint8Array(message);

    // Sign message
    if (wallet.privateKey) {
      const keypair = Keypair.fromSecretKey(
        typeof wallet.privateKey === 'string' 
          ? bs58.decode(wallet.privateKey)
          : wallet.privateKey
      );
      const signature = keypair.sign(messageBytes);
      return bs58.encode(signature.signature);
    } else if (wallet.signMessage) {
      const result = await wallet.signMessage(messageBytes, display);
      return result.signature.toString('base64');
    } else {
      throw new Error('No signing method available');
    }
  },

  /**
   * Get account balance
   */
  async solana_getBalance({ params, network }: SOLRPCParams) {
    const connection = getConnection(network || 'mainnet');
    const address = params?.[0];
    
    if (!address) {
      throw new Error('Address required');
    }

    const publicKey = new PublicKey(address);
    const balance = await connection.getBalance(publicKey);
    return balance;
  },

  /**
   * Get account info
   */
  async solana_getAccountInfo({ params, network }: SOLRPCParams) {
    const connection = getConnection(network || 'mainnet');
    const address = params?.[0];
    
    if (!address) {
      throw new Error('Address required');
    }

    const publicKey = new PublicKey(address);
    const accountInfo = await connection.getAccountInfo(publicKey);
    return accountInfo;
  },

  /**
   * Get transaction by signature
   */
  async solana_getTransaction({ params, network }: SOLRPCParams) {
    const connection = getConnection(network || 'mainnet');
    const signature = params?.[0];
    
    if (!signature) {
      throw new Error('Transaction signature required');
    }

    const tx = await connection.getTransaction(signature, {
      commitment: 'confirmed',
      maxSupportedTransactionVersion: 0
    });
    return tx;
  },

  /**
   * Get recent blockhash
   */
  async solana_getRecentBlockhash({ network }: SOLRPCParams) {
    const connection = getConnection(network || 'mainnet');
    const { blockhash } = await connection.getLatestBlockhash('confirmed');
    return blockhash;
  },

  /**
   * Get slot
   */
  async solana_getSlot({ network }: SOLRPCParams) {
    const connection = getConnection(network || 'mainnet');
    const slot = await connection.getSlot('confirmed');
    return slot;
  },

  /**
   * Get block height
   */
  async solana_getBlockHeight({ network }: SOLRPCParams) {
    const connection = getConnection(network || 'mainnet');
    const height = await connection.getBlockHeight('confirmed');
    return height;
  },

  /**
   * Get block by slot
   */
  async solana_getBlock({ params, network }: SOLRPCParams) {
    const connection = getConnection(network || 'mainnet');
    const slot = params?.[0];
    
    if (slot) {
      const block = await connection.getBlock(Number(slot), {
        commitment: 'confirmed',
        maxSupportedTransactionVersion: 0
      });
      return block;
    } else {
      const latestSlot = await connection.getSlot('confirmed');
      const block = await connection.getBlock(latestSlot, {
        commitment: 'confirmed',
        maxSupportedTransactionVersion: 0
      });
      return block;
    }
  },

  /**
   * Get token account balance
   */
  async solana_getTokenAccountBalance({ params, network }: SOLRPCParams) {
    const connection = getConnection(network || 'mainnet');
    const address = params?.[0];
    
    if (!address) {
      throw new Error('Token account address required');
    }

    const publicKey = new PublicKey(address);
    const balance = await connection.getTokenAccountBalance(publicKey);
    return balance.value;
  },

  /**
   * Get program account info
   */
  async solana_getProgramAccounts({ params, network }: SOLRPCParams) {
    const connection = getConnection(network || 'mainnet');
    const programId = params?.[0];
    const filters = params?.[1] || [];
    
    if (!programId) {
      throw new Error('Program ID required');
    }

    const publicKey = new PublicKey(programId);
    const accounts = await connection.getProgramAccounts(publicKey, {
      filters
    });
    return accounts;
  },

  /**
   * Get chain ID (network identifier)
   */
  async solana_getChainId({ network }: SOLRPCParams) {
    const config = networkConfigs[network || 'mainnet'] || networkConfigs.mainnet;
    return config.cluster;
  }
};

/**
 * Parse transaction parameters from RPC request
 */
export function parseTransactionFromParams(params: any[]): Transaction {
  if (!params || params.length === 0) {
    throw new Error('No transaction parameters provided');
  }

  const txData = params[0];
  
  // If it's already a Transaction object
  if (txData instanceof Transaction) {
    return txData;
  }

  // If it's base64 encoded
  if (typeof txData === 'string') {
    const buffer = Buffer.from(txData, 'base64');
    try {
      return VersionedTransaction.deserialize(buffer) as any;
    } catch {
      return Transaction.from(buffer);
    }
  }

  // If it's an object with instructions
  if (txData.instructions) {
    const transaction = new Transaction();
    transaction.add(...txData.instructions);
    if (txData.recentBlockhash) {
      transaction.recentBlockhash = txData.recentBlockhash;
    }
    if (txData.feePayer) {
      transaction.feePayer = new PublicKey(txData.feePayer);
    }
    return transaction;
  }

  throw new Error('Invalid transaction format');
}

export default {
  solMethods,
  parseTransactionFromParams
};

