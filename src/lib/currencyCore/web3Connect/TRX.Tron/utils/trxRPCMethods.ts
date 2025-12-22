/**
 * Tron (TRX) RPC Methods Handler
 * 
 * Handles WalletConnect and TronLink RPC method calls for Tron.
 * Tron uses TVM (Tron Virtual Machine) which is EVM-compatible.
 */

import TronWeb from 'tronweb';

export interface TRXRPCParams {
  wallet?: any;
  params?: any[];
  network?: string;
  dispatch?: any;
}

// Network configurations for Tron
const networkConfigs: Record<string, any> = {
  mainnet: {
    fullHost: 'https://api.trongrid.io',
    name: 'Tron Mainnet',
    chainId: 728126428
  },
  shasta: {
    fullHost: 'https://api.shasta.trongrid.io',
    name: 'Shasta Testnet',
    chainId: 2494104990
  },
  nile: {
    fullHost: 'https://api.nileex.io',
    name: 'Nile Testnet',
    chainId: 201910292
  }
};

// Get TronWeb instance for specified network
function getTronWeb(network: string = 'mainnet', privateKey?: string): TronWeb {
  const config = networkConfigs[network] || networkConfigs.mainnet;
  
  if (privateKey) {
    return new TronWeb({
      fullHost: config.fullHost,
      privateKey: privateKey
    });
  }
  
  return new TronWeb({
    fullHost: config.fullHost
  });
}

export const trxMethods = {
  /**
   * Send a signed transaction to the Tron network
   */
  async trx_sendRawTransaction({ params, network }: TRXRPCParams) {
    const tronWeb = getTronWeb(network || 'mainnet');
    const signedTx = params?.[0];
    
    if (!signedTx) {
      throw new Error('No signed transaction provided');
    }

    // Send transaction
    const result = await tronWeb.trx.sendRawTransaction(signedTx);
    return result.txid || result;
  },

  /**
   * Sign and send a transaction
   */
  async trx_signAndSendTransaction({ wallet, params, network }: TRXRPCParams) {
    if (!wallet) {
      throw new Error('Wallet required for transaction signing');
    }

    const tronWeb = getTronWeb(network || 'mainnet', wallet.privateKey);
    const txParams = parseTransactionFromParams(params);

    // Build transaction
    let transaction: any;
    
    if (txParams.type === 'transfer') {
      // TRX transfer
      transaction = await tronWeb.transactionBuilder.sendTrx(
        txParams.to,
        txParams.amount,
        txParams.from
      );
    } else if (txParams.type === 'trc20') {
      // TRC-20 token transfer
      transaction = await tronWeb.transactionBuilder.triggerSmartContract(
        txParams.contractAddress,
        'transfer',
        {},
        [
          { type: 'address', value: txParams.to },
          { type: 'uint256', value: txParams.amount }
        ],
        txParams.from
      );
    } else {
      throw new Error('Unsupported transaction type');
    }

    // Sign transaction
    const signedTx = await tronWeb.trx.sign(transaction);
    
    // Broadcast transaction
    const result = await tronWeb.trx.sendRawTransaction(signedTx);
    return result.txid || result;
  },

  /**
   * Sign a transaction without sending
   */
  async trx_signTransaction({ wallet, params, network }: TRXRPCParams) {
    if (!wallet) {
      throw new Error('Wallet required for transaction signing');
    }

    const tronWeb = getTronWeb(network || 'mainnet', wallet.privateKey);
    const txParams = parseTransactionFromParams(params);

    // Build transaction
    let transaction: any;
    
    if (txParams.type === 'transfer') {
      transaction = await tronWeb.transactionBuilder.sendTrx(
        txParams.to,
        txParams.amount,
        txParams.from
      );
    } else if (txParams.type === 'trc20') {
      transaction = await tronWeb.transactionBuilder.triggerSmartContract(
        txParams.contractAddress,
        'transfer',
        {},
        [
          { type: 'address', value: txParams.to },
          { type: 'uint256', value: txParams.amount }
        ],
        txParams.from
      );
    } else {
      throw new Error('Unsupported transaction type');
    }

    // Sign transaction
    const signedTx = await tronWeb.trx.sign(transaction);
    return signedTx;
  },

  /**
   * Sign a message
   */
  async trx_signMessage({ wallet, params, network }: TRXRPCParams) {
    if (!wallet) {
      throw new Error('Wallet required for message signing');
    }

    const tronWeb = getTronWeb(network || 'mainnet', wallet.privateKey);
    const message = params?.[0];
    
    if (!message) {
      throw new Error('Message required');
    }

    // Sign message
    const messageBytes = typeof message === 'string' 
      ? TronWeb.utils.stringToHex(message)
      : message;

    const signature = await tronWeb.trx.signMessage(messageBytes);
    return signature;
  },

  /**
   * Get account balance
   */
  async trx_getBalance({ params, network }: TRXRPCParams) {
    const tronWeb = getTronWeb(network || 'mainnet');
    const address = params?.[0];
    
    if (!address) {
      throw new Error('Address required');
    }

    const balance = await tronWeb.trx.getBalance(address);
    return balance;
  },

  /**
   * Get account info
   */
  async trx_getAccount({ params, network }: TRXRPCParams) {
    const tronWeb = getTronWeb(network || 'mainnet');
    const address = params?.[0];
    
    if (!address) {
      throw new Error('Address required');
    }

    const account = await tronWeb.trx.getAccount(address);
    return account;
  },

  /**
   * Get transaction by ID
   */
  async trx_getTransaction({ params, network }: TRXRPCParams) {
    const tronWeb = getTronWeb(network || 'mainnet');
    const txId = params?.[0];
    
    if (!txId) {
      throw new Error('Transaction ID required');
    }

    const tx = await tronWeb.trx.getTransaction(txId);
    return tx;
  },

  /**
   * Get transaction info
   */
  async trx_getTransactionInfo({ params, network }: TRXRPCParams) {
    const tronWeb = getTronWeb(network || 'mainnet');
    const txId = params?.[0];
    
    if (!txId) {
      throw new Error('Transaction ID required');
    }

    const txInfo = await tronWeb.trx.getTransactionInfo(txId);
    return txInfo;
  },

  /**
   * Get block by number
   */
  async trx_getBlock({ params, network }: TRXRPCParams) {
    const tronWeb = getTronWeb(network || 'mainnet');
    const blockNumber = params?.[0];
    
    if (blockNumber) {
      const block = await tronWeb.trx.getBlockByNumber(blockNumber);
      return block;
    } else {
      const block = await tronWeb.trx.getCurrentBlock();
      return block;
    }
  },

  /**
   * Get current block number
   */
  async trx_getBlockNumber({ network }: TRXRPCParams) {
    const tronWeb = getTronWeb(network || 'mainnet');
    const block = await tronWeb.trx.getCurrentBlock();
    return block.block_header.raw_data.number;
  },

  /**
   * Get TRC-20 token balance
   */
  async trx_getTokenBalance({ params, network }: TRXRPCParams) {
    const tronWeb = getTronWeb(network || 'mainnet');
    const address = params?.[0];
    const contractAddress = params?.[1];
    
    if (!address || !contractAddress) {
      throw new Error('Address and contract address required');
    }

    const contract = await tronWeb.contract().at(contractAddress);
    const balance = await contract.balanceOf(address).call();
    return balance.toString();
  },

  /**
   * Call smart contract method
   */
  async trx_callContract({ params, network }: TRXRPCParams) {
    const tronWeb = getTronWeb(network || 'mainnet');
    const contractAddress = params?.[0];
    const functionName = params?.[1];
    const functionParams = params?.[2] || [];
    
    if (!contractAddress || !functionName) {
      throw new Error('Contract address and function name required');
    }

    const contract = await tronWeb.contract().at(contractAddress);
    const result = await contract[functionName](...functionParams).call();
    return result;
  },

  /**
   * Get chain ID
   */
  async trx_getChainId({ network }: TRXRPCParams) {
    const config = networkConfigs[network || 'mainnet'] || networkConfigs.mainnet;
    return config.chainId;
  }
};

/**
 * Parse transaction parameters from RPC request
 */
export function parseTransactionFromParams(params: any[]): { 
  type: 'transfer' | 'trc20';
  from: string;
  to: string;
  amount: number | string;
  contractAddress?: string;
} {
  if (!params || params.length === 0) {
    throw new Error('No transaction parameters provided');
  }

  const tx = params[0];
  
  if (!tx.from || !tx.to || tx.amount === undefined) {
    throw new Error('From, to, and amount required');
  }

  if (tx.contractAddress) {
    return {
      type: 'trc20',
      from: tx.from,
      to: tx.to,
      amount: tx.amount,
      contractAddress: tx.contractAddress
    };
  } else {
    return {
      type: 'transfer',
      from: tx.from,
      to: tx.to,
      amount: tx.amount
    };
  }
}

export default {
  trxMethods,
  parseTransactionFromParams
};
