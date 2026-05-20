/**
 * Waves (WAVES) RPC Methods Handler
 * 
 * Handles WalletConnect and Waves Keeper RPC method calls for Waves.
 * Waves uses Ride smart contracts and unique transaction model.
 */

import { transfer, invokeScript, broadcast, signTx } from '@waves/waves-transactions';
import { nodeInteraction } from '@waves/waves-transactions';
import { publicKey, address } from '@waves/ts-lib-crypto';

export interface WavesRPCParams {
  wallet?: any;
  params?: any[];
  network?: string;
  dispatch?: any;
}

// Network configurations for Waves
const networkConfigs: Record<string, any> = {
  mainnet: {
    nodeUrl: 'https://nodes.wavesnodes.com',
    chainId: 'W',
    name: 'Waves Mainnet'
  },
  testnet: {
    nodeUrl: 'https://nodes-testnet.wavesnodes.com',
    chainId: 'T',
    name: 'Waves Testnet'
  },
  stagenet: {
    nodeUrl: 'https://nodes-stagenet.wavesnodes.com',
    chainId: 'S',
    name: 'Waves Stagenet'
  }
};

// Get network configuration
function getNetworkConfig(network: string = 'mainnet') {
  return networkConfigs[network] || networkConfigs.mainnet;
}

export const wavesMethods = {
  /**
   * Send a signed transaction to the Waves network
   */
  async waves_sendTransaction({ params, network }: WavesRPCParams) {
    const config = getNetworkConfig(network || 'mainnet');
    const signedTx = params?.[0];
    
    if (!signedTx) {
      throw new Error('No signed transaction provided');
    }

    // Broadcast transaction
    const result = await broadcast(signedTx, config.nodeUrl);
    return result.id;
  },

  /**
   * Sign and send a transaction
   */
  async waves_signAndSendTransaction({ wallet, params, network }: WavesRPCParams) {
    if (!wallet) {
      throw new Error('Wallet required for transaction signing');
    }

    const config = getNetworkConfig(network || 'mainnet');
    const txParams = parseTransactionFromParams(params);

    // Build transaction
    let transaction: any;
    
    if (txParams.type === 'transfer') {
      // WAVES transfer
      transaction = transfer({
        amount: txParams.amount,
        recipient: txParams.recipient,
        chainId: config.chainId
      }, txParams.senderPublicKey || wallet.publicKey);
    } else if (txParams.type === 'invokeScript') {
      // Invoke script (dApp call)
      transaction = invokeScript({
        dApp: txParams.dApp,
        call: txParams.call,
        payment: txParams.payment || [],
        chainId: config.chainId
      }, txParams.senderPublicKey || wallet.publicKey);
    } else {
      throw new Error('Unsupported transaction type');
    }

    // Sign transaction
    const signedTx = signTx(transaction, wallet.privateKey || wallet.seed);
    
    // Broadcast transaction
    const result = await broadcast(signedTx, config.nodeUrl);
    return result.id;
  },

  /**
   * Sign a transaction without sending
   */
  async waves_signTransaction({ wallet, params, network }: WavesRPCParams) {
    if (!wallet) {
      throw new Error('Wallet required for transaction signing');
    }

    const config = getNetworkConfig(network || 'mainnet');
    const txParams = parseTransactionFromParams(params);

    // Build transaction
    let transaction: any;
    
    if (txParams.type === 'transfer') {
      transaction = transfer({
        amount: txParams.amount,
        recipient: txParams.recipient,
        chainId: config.chainId
      }, txParams.senderPublicKey || wallet.publicKey);
    } else if (txParams.type === 'invokeScript') {
      transaction = invokeScript({
        dApp: txParams.dApp,
        call: txParams.call,
        payment: txParams.payment || [],
        chainId: config.chainId
      }, txParams.senderPublicKey || wallet.publicKey);
    } else {
      throw new Error('Unsupported transaction type');
    }

    // Sign transaction
    const signedTx = signTx(transaction, wallet.privateKey || wallet.seed);
    return signedTx;
  },

  /**
   * Sign a message
   */
  async waves_signMessage({ wallet, params, network }: WavesRPCParams) {
    if (!wallet) {
      throw new Error('Wallet required for message signing');
    }

    const message = params?.[0];
    
    if (!message) {
      throw new Error('Message required');
    }

    // Waves message signing
    const messageBytes = typeof message === 'string' 
      ? new TextEncoder().encode(message)
      : new Uint8Array(message);

    // Sign message using Waves signing
    if (wallet.privateKey && wallet.signMessage) {
      return await wallet.signMessage(messageBytes);
    } else {
      throw new Error('No signing method available');
    }
  },

  /**
   * Get account balance
   */
  async waves_getBalance({ params, network }: WavesRPCParams) {
    const config = getNetworkConfig(network || 'mainnet');
    const address = params?.[0];
    
    if (!address) {
      throw new Error('Address required');
    }

    const balance = await nodeInteraction.balance(address, config.nodeUrl);
    return balance;
  },

  /**
   * Get account info
   */
  async waves_getAccountInfo({ params, network }: WavesRPCParams) {
    const config = getNetworkConfig(network || 'mainnet');
    const address = params?.[0];
    
    if (!address) {
      throw new Error('Address required');
    }

    const accountInfo = await nodeInteraction.accountData(address, config.nodeUrl);
    return accountInfo;
  },

  /**
   * Get transaction by ID
   */
  async waves_getTransaction({ params, network }: WavesRPCParams) {
    const config = getNetworkConfig(network || 'mainnet');
    const txId = params?.[0];
    
    if (!txId) {
      throw new Error('Transaction ID required');
    }

    const response = await fetch(`${config.nodeUrl}/transactions/info/${txId}`);
    if (!response.ok) {
      throw new Error('Transaction not found');
    }

    const tx = await response.json();
    return tx;
  },

  /**
   * Get block by height
   */
  async waves_getBlock({ params, network }: WavesRPCParams) {
    const config = getNetworkConfig(network || 'mainnet');
    const height = params?.[0];
    
    if (height) {
      const response = await fetch(`${config.nodeUrl}/blocks/at/${height}`);
      if (!response.ok) {
        throw new Error('Block not found');
      }
      const block = await response.json();
      return block;
    } else {
      const response = await fetch(`${config.nodeUrl}/blocks/height`);
      if (!response.ok) {
        throw new Error('Failed to fetch block height');
      }
      const heightData = await response.json();
      const response2 = await fetch(`${config.nodeUrl}/blocks/at/${heightData.height}`);
      const block = await response2.json();
      return block;
    }
  },

  /**
   * Get current block height
   */
  async waves_getBlockHeight({ network }: WavesRPCParams) {
    const config = getNetworkConfig(network || 'mainnet');
    
    const response = await fetch(`${config.nodeUrl}/blocks/height`);
    if (!response.ok) {
      throw new Error('Failed to fetch block height');
    }

    const data = await response.json();
    return data.height;
  },

  /**
   * Get asset balance
   */
  async waves_getAssetBalance({ params, network }: WavesRPCParams) {
    const config = getNetworkConfig(network || 'mainnet');
    const address = params?.[0];
    const assetId = params?.[1];
    
    if (!address || !assetId) {
      throw new Error('Address and asset ID required');
    }

    const balance = await nodeInteraction.assetBalance(assetId, address, config.nodeUrl);
    return balance;
  },

  /**
   * Call dApp function
   */
  async waves_callDApp({ params, network }: WavesRPCParams) {
    const config = getNetworkConfig(network || 'mainnet');
    const dAppAddress = params?.[0];
    const functionName = params?.[1];
    const args = params?.[2] || [];
    
    if (!dAppAddress || !functionName) {
      throw new Error('dApp address and function name required');
    }

    const result = await nodeInteraction.invokeScript(
      dAppAddress,
      functionName,
      args,
      config.nodeUrl
    );
    return result;
  },

  /**
   * Get chain ID
   */
  async waves_getChainId({ network }: WavesRPCParams) {
    const config = getNetworkConfig(network || 'mainnet');
    return config.chainId;
  }
};

/**
 * Parse transaction parameters from RPC request
 */
export function parseTransactionFromParams(params: any[]): { 
  type: 'transfer' | 'invokeScript';
  recipient?: string;
  dApp?: string;
  amount?: number;
  call?: any;
  payment?: any[];
  senderPublicKey?: string;
} {
  if (!params || params.length === 0) {
    throw new Error('No transaction parameters provided');
  }

  const tx = params[0];
  
  if (tx.type === 'transfer' || tx.recipient) {
    if (!tx.recipient || tx.amount === undefined) {
      throw new Error('Recipient and amount required for transfer');
    }
    return {
      type: 'transfer',
      recipient: tx.recipient,
      amount: tx.amount,
      senderPublicKey: tx.senderPublicKey
    };
  } else if (tx.type === 'invokeScript' || tx.dApp) {
    if (!tx.dApp || !tx.call) {
      throw new Error('dApp address and call required for invokeScript');
    }
    return {
      type: 'invokeScript',
      dApp: tx.dApp,
      call: tx.call,
      payment: tx.payment,
      senderPublicKey: tx.senderPublicKey
    };
  } else {
    throw new Error('Invalid transaction type');
  }
}

export default {
  wavesMethods,
  parseTransactionFromParams
};
