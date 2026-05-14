/**
 * Algorand RPC Methods Handler
 * 
 * Handles WalletConnect and Pera Connect RPC method calls for Algorand.
 * Maps dApp requests to Algorand SDK operations.
 */

import { Algodv2, Transaction, SignedTransaction } from 'algosdk';

export interface AlgoRPCParams {
  wallet?: any;
  params?: any[];
  network?: string;
  dispatch?: any;
}

export interface AlgoTransactionParams {
  from: string;
  to: string;
  amount: number;
  note?: Uint8Array;
  fee?: number;
}

export const algoMethods = {
  /**
   * Send a signed transaction to the Algorand network
   */
  async algo_sendRawTransaction({ params, network }: AlgoRPCParams) {
    const algodClient = getAlgodClient(network || 'mainnet');
    const signedTx = params?.[0];
    
    if (!signedTx) {
      throw new Error('No signed transaction provided');
    }

    const txResponse = await algodClient.sendRawTransaction(signedTx).do();
    return txResponse.txId;
  },

  /**
   * Sign and send a transaction
   */
  async algo_sendTransaction({ wallet, params, network }: AlgoRPCParams) {
    if (!wallet) {
      throw new Error('Wallet required for transaction signing');
    }

    const algodClient = getAlgodClient(network || 'mainnet');
    const txParams = parseTransactionFromParams(params);

    // Get suggested parameters
    const suggestedParams = await algodClient.getTransactionParams().do();

    // Create transaction
    const transaction = new Transaction({
      from: txParams.from,
      to: txParams.to,
      amount: txParams.amount,
      note: txParams.note,
      fee: txParams.fee || suggestedParams.fee,
      firstRound: suggestedParams.firstRound,
      lastRound: suggestedParams.lastRound,
      genesisHash: suggestedParams.genesisHash,
      genesisID: suggestedParams.genesisID,
    });

    // Sign transaction
    const privateKey = Uint8Array.from(Buffer.from(wallet.privateKey, 'hex'));
    const signedTxn = transaction.signTxn(privateKey);

    // Send transaction
    const txResponse = await algodClient.sendRawTransaction(signedTxn).do();
    return txResponse.txId;
  },

  /**
   * Sign a transaction without sending
   */
  async algo_signTransaction({ wallet, params, network }: AlgoRPCParams) {
    if (!wallet) {
      throw new Error('Wallet required for transaction signing');
    }

    const algodClient = getAlgodClient(network || 'mainnet');
    const txParams = parseTransactionFromParams(params);

    // Get suggested parameters
    const suggestedParams = await algodClient.getTransactionParams().do();

    // Create transaction
    const transaction = new Transaction({
      from: txParams.from,
      to: txParams.to,
      amount: txParams.amount,
      note: txParams.note,
      fee: txParams.fee || suggestedParams.fee,
      firstRound: suggestedParams.firstRound,
      lastRound: suggestedParams.lastRound,
      genesisHash: suggestedParams.genesisHash,
      genesisID: suggestedParams.genesisID,
    });

    // Sign transaction
    const privateKey = Uint8Array.from(Buffer.from(wallet.privateKey, 'hex'));
    const signedTxn = transaction.signTxn(privateKey);

    return Buffer.from(signedTxn).toString('base64');
  },

  /**
   * Sign a message (for authentication/verification)
   */
  async algo_signMessage({ wallet, params }: AlgoRPCParams) {
    if (!wallet) {
      throw new Error('Wallet required for message signing');
    }

    const message = params?.[0];
    if (!message) {
      throw new Error('No message provided');
    }

    // Convert message to Uint8Array
    const messageBytes = typeof message === 'string' 
      ? new TextEncoder().encode(message)
      : message;

    // Sign message with private key
    const privateKey = Uint8Array.from(Buffer.from(wallet.privateKey, 'hex'));
    const { sign } = await import('@noble/ed25519');
    const signature = await sign(messageBytes, privateKey);

    return Buffer.from(signature).toString('base64');
  },

  /**
   * Get account information
   */
  async algo_getAccountInfo({ params, network }: AlgoRPCParams) {
    const algodClient = getAlgodClient(network || 'mainnet');
    const address = params?.[0];

    if (!address) {
      throw new Error('No address provided');
    }

    const accountInfo = await algodClient.accountInformation(address).do();
    return accountInfo;
  },

  /**
   * Get suggested transaction parameters
   */
  async algo_getTransactionParams({ network }: AlgoRPCParams) {
    const algodClient = getAlgodClient(network || 'mainnet');
    const params = await algodClient.getTransactionParams().do();
    return params;
  }
};

/**
 * Parse transaction parameters from RPC request
 */
export function parseTransactionFromParams(params: any[]): AlgoTransactionParams {
  if (!params || params.length === 0) {
    throw new Error('No transaction parameters provided');
  }

  const tx = params[0];
  
  return {
    from: tx.from,
    to: tx.to,
    amount: tx.amount || 0,
    note: tx.note ? new TextEncoder().encode(tx.note) : undefined,
    fee: tx.fee
  };
}

/**
 * Get Algod client for specified network
 */
function getAlgodClient(network: string): Algodv2 {
  const networkConfig = {
    mainnet: {
      server: 'https://mainnet-api.algonode.cloud',
      port: '',
      token: ''
    },
    testnet: {
      server: 'https://testnet-api.algonode.cloud',
      port: '',
      token: ''
    }
  };

  const config = networkConfig[network as keyof typeof networkConfig] || networkConfig.mainnet;
  
  return new Algodv2(config.token, config.server, config.port);
}

export default {
  algoMethods,
  parseTransactionFromParams
};
