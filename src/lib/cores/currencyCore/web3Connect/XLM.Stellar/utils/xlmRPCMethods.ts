/**
 * Stellar (XLM) RPC Methods Handler
 * 
 * Handles WalletConnect and Stellar wallet RPC method calls for Stellar.
 * Stellar uses Horizon API and Stellar Consensus Protocol.
 */

import { 
  Server, 
  TransactionBuilder, 
  Keypair, 
  Asset, 
  Operation,
  Networks,
  Memo,
  BASE_FEE
} from '@stellar/stellar-sdk';

export interface XLMRPCParams {
  wallet?: any;
  params?: any[];
  network?: string;
  dispatch?: any;
}

// Network configurations for Stellar
const networkConfigs: Record<string, any> = {
  mainnet: {
    horizonUrl: 'https://horizon.stellar.org',
    networkPassphrase: Networks.PUBLIC,
    name: 'Stellar Mainnet'
  },
  testnet: {
    horizonUrl: 'https://horizon-testnet.stellar.org',
    networkPassphrase: Networks.TESTNET,
    name: 'Stellar Testnet'
  }
};

// Get server for specified network
function getServer(network: string = 'mainnet'): Server {
  const config = networkConfigs[network] || networkConfigs.mainnet;
  return new Server(config.horizonUrl);
}

// Get network passphrase
function getNetworkPassphrase(network: string = 'mainnet'): string {
  const config = networkConfigs[network] || networkConfigs.mainnet;
  return config.networkPassphrase;
}

export const xlmMethods = {
  /**
   * Send a signed transaction to the Stellar network
   */
  async xlm_sendTransaction({ params, network }: XLMRPCParams) {
    const server = getServer(network || 'mainnet');
    const signedTx = params?.[0];
    
    if (!signedTx) {
      throw new Error('No signed transaction provided');
    }

    // Submit transaction
    const result = await server.submitTransaction(signedTx);
    return result.hash;
  },

  /**
   * Sign and send a transaction
   */
  async xlm_signAndSendTransaction({ wallet, params, network }: XLMRPCParams) {
    if (!wallet) {
      throw new Error('Wallet required for transaction signing');
    }

    const server = getServer(network || 'mainnet');
    const networkPassphrase = getNetworkPassphrase(network || 'mainnet');
    const txParams = parseTransactionFromParams(params);

    // Get account info
    const sourceAccount = await server.loadAccount(wallet.publicKey || wallet.address);

    // Build transaction
    const transaction = new TransactionBuilder(sourceAccount, {
      fee: BASE_FEE,
      networkPassphrase
    });

    // Add operations
    if (txParams.type === 'payment') {
      transaction.addOperation(
        Operation.payment({
          destination: txParams.destination,
          asset: Asset.native(),
          amount: txParams.amount
        })
      );
    } else if (txParams.type === 'createAccount') {
      transaction.addOperation(
        Operation.createAccount({
          destination: txParams.destination,
          startingBalance: txParams.startingBalance
        })
      );
    } else if (txParams.operations) {
      txParams.operations.forEach((op: any) => {
        transaction.addOperation(op);
      });
    }

    // Add memo if provided
    if (txParams.memo) {
      transaction.addMemo(Memo.text(txParams.memo));
    }

    // Build and sign transaction
    const tx = transaction.setTimeout(30).build();
    
    if (wallet.secretKey) {
      const keypair = Keypair.fromSecret(wallet.secretKey);
      tx.sign(keypair);
    } else if (wallet.signTransaction) {
      await wallet.signTransaction(tx);
    } else {
      throw new Error('No signing method available');
    }

    // Submit transaction
    const result = await server.submitTransaction(tx);
    return result.hash;
  },

  /**
   * Sign a transaction without sending
   */
  async xlm_signTransaction({ wallet, params, network }: XLMRPCParams) {
    if (!wallet) {
      throw new Error('Wallet required for transaction signing');
    }

    const server = getServer(network || 'mainnet');
    const networkPassphrase = getNetworkPassphrase(network || 'mainnet');
    const txParams = parseTransactionFromParams(params);

    // Get account info
    const sourceAccount = await server.loadAccount(wallet.publicKey || wallet.address);

    // Build transaction
    const transaction = new TransactionBuilder(sourceAccount, {
      fee: BASE_FEE,
      networkPassphrase
    });

    // Add operations
    if (txParams.type === 'payment') {
      transaction.addOperation(
        Operation.payment({
          destination: txParams.destination,
          asset: Asset.native(),
          amount: txParams.amount
        })
      );
    } else if (txParams.operations) {
      txParams.operations.forEach((op: any) => {
        transaction.addOperation(op);
      });
    }

    // Add memo if provided
    if (txParams.memo) {
      transaction.addMemo(Memo.text(txParams.memo));
    }

    // Build and sign transaction
    const tx = transaction.setTimeout(30).build();
    
    if (wallet.secretKey) {
      const keypair = Keypair.fromSecret(wallet.secretKey);
      tx.sign(keypair);
    } else if (wallet.signTransaction) {
      await wallet.signTransaction(tx);
    } else {
      throw new Error('No signing method available');
    }

    return tx.toXDR();
  },

  /**
   * Sign a message
   */
  async xlm_signMessage({ wallet, params, network }: XLMRPCParams) {
    if (!wallet) {
      throw new Error('Wallet required for message signing');
    }

    const message = params?.[0];
    
    if (!message) {
      throw new Error('Message required');
    }

    // Stellar message signing
    if (wallet.secretKey) {
      const keypair = Keypair.fromSecret(wallet.secretKey);
      const messageBytes = typeof message === 'string' 
        ? new TextEncoder().encode(message)
        : new Uint8Array(message);
      
      const signature = keypair.sign(messageBytes);
      return signature.toString('base64');
    } else if (wallet.signMessage) {
      return await wallet.signMessage(message);
    } else {
      throw new Error('No signing method available');
    }
  },

  /**
   * Get account balance
   */
  async xlm_getBalance({ params, network }: XLMRPCParams) {
    const server = getServer(network || 'mainnet');
    const address = params?.[0];
    
    if (!address) {
      throw new Error('Address required');
    }

    const account = await server.loadAccount(address);
    const nativeBalance = account.balances.find((b: any) => b.asset_type === 'native');
    return nativeBalance ? nativeBalance.balance : '0';
  },

  /**
   * Get account info
   */
  async xlm_getAccountInfo({ params, network }: XLMRPCParams) {
    const server = getServer(network || 'mainnet');
    const address = params?.[0];
    
    if (!address) {
      throw new Error('Address required');
    }

    const account = await server.loadAccount(address);
    return {
      accountId: account.accountId(),
      balances: account.balances,
      sequenceNumber: account.sequenceNumber(),
      subentryCount: account.subentryCount
    };
  },

  /**
   * Get transaction by hash
   */
  async xlm_getTransaction({ params, network }: XLMRPCParams) {
    const server = getServer(network || 'mainnet');
    const txHash = params?.[0];
    
    if (!txHash) {
      throw new Error('Transaction hash required');
    }

    const tx = await server.transactions().transaction(txHash).call();
    return tx;
  },

  /**
   * Get ledger by sequence
   */
  async xlm_getLedger({ params, network }: XLMRPCParams) {
    const server = getServer(network || 'mainnet');
    const sequence = params?.[0];
    
    if (sequence) {
      const ledger = await server.ledgers().ledger(sequence).call();
      return ledger;
    } else {
      const ledger = await server.ledgers().order('desc').limit(1).call();
      return ledger.records[0];
    }
  },

  /**
   * Get current ledger sequence
   */
  async xlm_getLedgerSequence({ network }: XLMRPCParams) {
    const server = getServer(network || 'mainnet');
    const ledger = await server.ledgers().order('desc').limit(1).call();
    return ledger.records[0].sequence;
  },

  /**
   * Get asset balance
   */
  async xlm_getAssetBalance({ params, network }: XLMRPCParams) {
    const server = getServer(network || 'mainnet');
    const address = params?.[0];
    const assetCode = params?.[1];
    const assetIssuer = params?.[2];
    
    if (!address) {
      throw new Error('Address required');
    }

    const account = await server.loadAccount(address);
    
    if (assetCode && assetIssuer) {
      const assetBalance = account.balances.find(
        (b: any) => b.asset_code === assetCode && b.asset_issuer === assetIssuer
      );
      return assetBalance ? assetBalance.balance : '0';
    } else {
      return account.balances;
    }
  },

  /**
   * Get chain ID (network identifier)
   */
  async xlm_getChainId({ network }: XLMRPCParams) {
    const networkPassphrase = getNetworkPassphrase(network || 'mainnet');
    return networkPassphrase;
  }
};

/**
 * Parse transaction parameters from RPC request
 */
export function parseTransactionFromParams(params: any[]): { 
  type?: 'payment' | 'createAccount';
  destination?: string;
  amount?: string;
  startingBalance?: string;
  operations?: any[];
  memo?: string;
} {
  if (!params || params.length === 0) {
    throw new Error('No transaction parameters provided');
  }

  const tx = params[0];
  
  return {
    type: tx.type,
    destination: tx.destination,
    amount: tx.amount,
    startingBalance: tx.startingBalance,
    operations: tx.operations,
    memo: tx.memo
  };
}

export default {
  xlmMethods,
  parseTransactionFromParams
};
