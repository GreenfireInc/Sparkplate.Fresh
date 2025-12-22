/**
 * Ripple (XRP) RPC Methods Handler
 * 
 * Handles WalletConnect and XRP wallet RPC method calls for Ripple.
 * Ripple uses XRP Ledger Consensus Protocol and rippled API.
 */

import { Client, Wallet, Payment, TrustSet, Transaction } from 'xrpl';

export interface XRPRPCParams {
  wallet?: any;
  params?: any[];
  network?: string;
  dispatch?: any;
}

// Network configurations for Ripple
const networkConfigs: Record<string, any> = {
  mainnet: {
    server: 'wss://xrplcluster.com',
    name: 'XRP Ledger Mainnet',
    chainId: 0
  },
  testnet: {
    server: 'wss://s.altnet.rippletest.net:51233',
    name: 'XRP Ledger Testnet',
    chainId: 1
  },
  devnet: {
    server: 'wss://s.devnet.rippletest.net:51233',
    name: 'XRP Ledger Devnet',
    chainId: 2
  }
};

// Get client for specified network
async function getClient(network: string = 'mainnet'): Promise<Client> {
  const config = networkConfigs[network] || networkConfigs.mainnet;
  const client = new Client(config.server);
  await client.connect();
  return client;
}

export const xrpMethods = {
  /**
   * Send a signed transaction to the XRP Ledger
   */
  async xrp_sendTransaction({ params, network }: XRPRPCParams) {
    const client = await getClient(network || 'mainnet');
    const signedTx = params?.[0];
    
    if (!signedTx) {
      throw new Error('No signed transaction provided');
    }

    try {
      // Submit transaction
      const result = await client.submit(signedTx);
      await client.disconnect();
      return result.result.hash;
    } catch (error) {
      await client.disconnect();
      throw error;
    }
  },

  /**
   * Sign and send a transaction
   */
  async xrp_signAndSendTransaction({ wallet, params, network }: XRPRPCParams) {
    if (!wallet) {
      throw new Error('Wallet required for transaction signing');
    }

    const client = await getClient(network || 'mainnet');
    const txParams = parseTransactionFromParams(params);

    try {
      // Get account info
      const accountInfo = await client.request({
        command: 'account_info',
        account: wallet.address || wallet.classicAddress
      });

      // Build transaction
      let transaction: Transaction;
      
      if (txParams.type === 'payment') {
        transaction = {
          TransactionType: 'Payment',
          Account: wallet.address || wallet.classicAddress,
          Destination: txParams.destination,
          Amount: txParams.amount,
          Sequence: accountInfo.result.account_data.Sequence,
          Fee: txParams.fee || '12'
        } as Payment;
      } else if (txParams.type === 'trustSet') {
        transaction = {
          TransactionType: 'TrustSet',
          Account: wallet.address || wallet.classicAddress,
          LimitAmount: txParams.limitAmount,
          Sequence: accountInfo.result.account_data.Sequence,
          Fee: txParams.fee || '12'
        } as TrustSet;
      } else {
        throw new Error('Unsupported transaction type');
      }

      // Autofill transaction
      const autofilled = await client.autofill(transaction);

      // Sign transaction
      let signed: any;
      if (wallet.secret) {
        const xrpWallet = Wallet.fromSeed(wallet.secret);
        signed = xrpWallet.sign(autofilled);
      } else if (wallet.signTransaction) {
        signed = await wallet.signTransaction(autofilled);
      } else {
        throw new Error('No signing method available');
      }

      // Submit transaction
      const result = await client.submitAndWait(signed.tx_blob);
      await client.disconnect();
      return result.result.hash;
    } catch (error) {
      await client.disconnect();
      throw error;
    }
  },

  /**
   * Sign a transaction without sending
   */
  async xrp_signTransaction({ wallet, params, network }: XRPRPCParams) {
    if (!wallet) {
      throw new Error('Wallet required for transaction signing');
    }

    const client = await getClient(network || 'mainnet');
    const txParams = parseTransactionFromParams(params);

    try {
      // Get account info
      const accountInfo = await client.request({
        command: 'account_info',
        account: wallet.address || wallet.classicAddress
      });

      // Build transaction
      let transaction: Transaction;
      
      if (txParams.type === 'payment') {
        transaction = {
          TransactionType: 'Payment',
          Account: wallet.address || wallet.classicAddress,
          Destination: txParams.destination,
          Amount: txParams.amount,
          Sequence: accountInfo.result.account_data.Sequence,
          Fee: txParams.fee || '12'
        } as Payment;
      } else if (txParams.type === 'trustSet') {
        transaction = {
          TransactionType: 'TrustSet',
          Account: wallet.address || wallet.classicAddress,
          LimitAmount: txParams.limitAmount,
          Sequence: accountInfo.result.account_data.Sequence,
          Fee: txParams.fee || '12'
        } as TrustSet;
      } else {
        throw new Error('Unsupported transaction type');
      }

      // Autofill transaction
      const autofilled = await client.autofill(transaction);

      // Sign transaction
      let signed: any;
      if (wallet.secret) {
        const xrpWallet = Wallet.fromSeed(wallet.secret);
        signed = xrpWallet.sign(autofilled);
      } else if (wallet.signTransaction) {
        signed = await wallet.signTransaction(autofilled);
      } else {
        throw new Error('No signing method available');
      }

      await client.disconnect();
      return signed.tx_blob;
    } catch (error) {
      await client.disconnect();
      throw error;
    }
  },

  /**
   * Sign a message
   */
  async xrp_signMessage({ wallet, params, network }: XRPRPCParams) {
    if (!wallet) {
      throw new Error('Wallet required for message signing');
    }

    const message = params?.[0];
    
    if (!message) {
      throw new Error('Message required');
    }

    // XRP message signing
    if (wallet.secret && wallet.signMessage) {
      return await wallet.signMessage(message);
    } else {
      throw new Error('No signing method available');
    }
  },

  /**
   * Get account balance
   */
  async xrp_getBalance({ params, network }: XRPRPCParams) {
    const client = await getClient(network || 'mainnet');
    const address = params?.[0];
    
    if (!address) {
      throw new Error('Address required');
    }

    try {
      const accountInfo = await client.request({
        command: 'account_info',
        account: address
      });
      await client.disconnect();
      
      // Convert drops to XRP (1 XRP = 1,000,000 drops)
      const balanceDrops = accountInfo.result.account_data.Balance;
      const balanceXRP = parseFloat(balanceDrops) / 1000000;
      return balanceXRP.toString();
    } catch (error) {
      await client.disconnect();
      throw error;
    }
  },

  /**
   * Get account info
   */
  async xrp_getAccountInfo({ params, network }: XRPRPCParams) {
    const client = await getClient(network || 'mainnet');
    const address = params?.[0];
    
    if (!address) {
      throw new Error('Address required');
    }

    try {
      const accountInfo = await client.request({
        command: 'account_info',
        account: address
      });
      await client.disconnect();
      return accountInfo.result.account_data;
    } catch (error) {
      await client.disconnect();
      throw error;
    }
  },

  /**
   * Get account balances (XRP + issued currencies)
   */
  async xrp_getBalances({ params, network }: XRPRPCParams) {
    const client = await getClient(network || 'mainnet');
    const address = params?.[0];
    
    if (!address) {
      throw new Error('Address required');
    }

    try {
      const balances = await client.request({
        command: 'account_lines',
        account: address
      });
      await client.disconnect();
      return balances.result.lines;
    } catch (error) {
      await client.disconnect();
      throw error;
    }
  },

  /**
   * Get transaction by hash
   */
  async xrp_getTransaction({ params, network }: XRPRPCParams) {
    const client = await getClient(network || 'mainnet');
    const txHash = params?.[0];
    
    if (!txHash) {
      throw new Error('Transaction hash required');
    }

    try {
      const tx = await client.request({
        command: 'tx',
        transaction: txHash
      });
      await client.disconnect();
      return tx.result;
    } catch (error) {
      await client.disconnect();
      throw error;
    }
  },

  /**
   * Get ledger by index
   */
  async xrp_getLedger({ params, network }: XRPRPCParams) {
    const client = await getClient(network || 'mainnet');
    const ledgerIndex = params?.[0];
    
    try {
      const ledger = await client.request({
        command: 'ledger',
        ledger_index: ledgerIndex || 'validated'
      });
      await client.disconnect();
      return ledger.result.ledger;
    } catch (error) {
      await client.disconnect();
      throw error;
    }
  },

  /**
   * Get current ledger index
   */
  async xrp_getLedgerIndex({ network }: XRPRPCParams) {
    const client = await getClient(network || 'mainnet');
    
    try {
      const ledger = await client.request({
        command: 'ledger',
        ledger_index: 'validated'
      });
      await client.disconnect();
      return ledger.result.ledger_index;
    } catch (error) {
      await client.disconnect();
      throw error;
    }
  },

  /**
   * Get trust lines
   */
  async xrp_getTrustLines({ params, network }: XRPRPCParams) {
    const client = await getClient(network || 'mainnet');
    const address = params?.[0];
    
    if (!address) {
      throw new Error('Address required');
    }

    try {
      const trustLines = await client.request({
        command: 'account_lines',
        account: address
      });
      await client.disconnect();
      return trustLines.result.lines;
    } catch (error) {
      await client.disconnect();
      throw error;
    }
  },

  /**
   * Get chain ID (network identifier)
   */
  async xrp_getChainId({ network }: XRPRPCParams) {
    const config = networkConfigs[network || 'mainnet'] || networkConfigs.mainnet;
    return config.chainId;
  }
};

/**
 * Parse transaction parameters from RPC request
 */
export function parseTransactionFromParams(params: any[]): { 
  type?: 'payment' | 'trustSet';
  destination?: string;
  amount?: string;
  limitAmount?: any;
  fee?: string;
} {
  if (!params || params.length === 0) {
    throw new Error('No transaction parameters provided');
  }

  const tx = params[0];
  
  return {
    type: tx.type || tx.TransactionType?.toLowerCase(),
    destination: tx.destination || tx.Destination,
    amount: tx.amount || tx.Amount,
    limitAmount: tx.limitAmount || tx.LimitAmount,
    fee: tx.fee || tx.Fee
  };
}

export default {
  xrpMethods,
  parseTransactionFromParams
};
