/**
 * Stacks (STX) RPC Methods Handler
 * 
 * Handles WalletConnect and Stacks wallet RPC method calls for Stacks.
 * Stacks uses Clarity smart contracts and is anchored to Bitcoin.
 */

import { 
  makeSTXTokenTransfer, 
  broadcastTransaction, 
  AnchorMode,
  PostConditionMode,
  StacksNetwork,
  StacksMainnet,
  StacksTestnet,
  getAddressFromPrivateKey,
  TransactionVersion
} from '@stacks/transactions';
import { StacksNetwork as Network } from '@stacks/network';
import { privateKeyToStxAddress } from '@stacks/encryption';

export interface STXRPCParams {
  wallet?: any;
  params?: any[];
  network?: string;
  dispatch?: any;
}

// Network configurations for Stacks
const networkConfigs: Record<string, any> = {
  mainnet: {
    network: new StacksMainnet(),
    name: 'Stacks Mainnet',
    apiUrl: 'https://api.hiro.so'
  },
  testnet: {
    network: new StacksTestnet(),
    name: 'Stacks Testnet',
    apiUrl: 'https://api.testnet.hiro.so'
  }
};

// Get network for specified network
function getNetwork(network: string = 'mainnet'): Network {
  const config = networkConfigs[network] || networkConfigs.mainnet;
  return config.network;
}

export const stxMethods = {
  /**
   * Send a signed transaction to the Stacks network
   */
  async stx_sendTransaction({ params, network }: STXRPCParams) {
    const stacksNetwork = getNetwork(network || 'mainnet');
    const signedTx = params?.[0];
    
    if (!signedTx) {
      throw new Error('No signed transaction provided');
    }

    // Broadcast transaction
    const result = await broadcastTransaction(signedTx, stacksNetwork);
    return result.txid;
  },

  /**
   * Sign and send a transaction
   */
  async stx_signAndSendTransaction({ wallet, params, network }: STXRPCParams) {
    if (!wallet) {
      throw new Error('Wallet required for transaction signing');
    }

    const stacksNetwork = getNetwork(network || 'mainnet');
    const txParams = parseTransactionFromParams(params);

    // Create transaction
    const transaction = await makeSTXTokenTransfer({
      recipient: txParams.recipient,
      amount: txParams.amount,
      senderKey: wallet.privateKey,
      network: stacksNetwork,
      anchorMode: AnchorMode.Any,
      postConditionMode: PostConditionMode.Deny,
      memo: txParams.memo
    });

    // Broadcast transaction
    const result = await broadcastTransaction(transaction, stacksNetwork);
    return result.txid;
  },

  /**
   * Sign a transaction without sending
   */
  async stx_signTransaction({ wallet, params, network }: STXRPCParams) {
    if (!wallet) {
      throw new Error('Wallet required for transaction signing');
    }

    const stacksNetwork = getNetwork(network || 'mainnet');
    const txParams = parseTransactionFromParams(params);

    // Create transaction
    const transaction = await makeSTXTokenTransfer({
      recipient: txParams.recipient,
      amount: txParams.amount,
      senderKey: wallet.privateKey,
      network: stacksNetwork,
      anchorMode: AnchorMode.Any,
      postConditionMode: PostConditionMode.Deny,
      memo: txParams.memo
    });

    // Return serialized transaction
    return transaction.serialize();
  },

  /**
   * Sign a message
   */
  async stx_signMessage({ wallet, params, network }: STXRPCParams) {
    if (!wallet) {
      throw new Error('Wallet required for message signing');
    }

    const message = params?.[0];
    
    if (!message) {
      throw new Error('Message required');
    }

    // Stacks message signing
    const messageBytes = typeof message === 'string' 
      ? new TextEncoder().encode(message)
      : new Uint8Array(message);

    // Sign message using Stacks signing
    if (wallet.privateKey && wallet.signMessage) {
      return await wallet.signMessage(messageBytes);
    } else {
      throw new Error('No signing method available');
    }
  },

  /**
   * Get account balance
   */
  async stx_getBalance({ params, network }: STXRPCParams) {
    const config = networkConfigs[network || 'mainnet'];
    const address = params?.[0];
    
    if (!address) {
      throw new Error('Address required');
    }

    const response = await fetch(`${config.apiUrl}/extended/v1/address/${address}/stx`);
    if (!response.ok) {
      throw new Error('Failed to fetch balance');
    }

    const data = await response.json();
    return data.balance || '0';
  },

  /**
   * Get account info
   */
  async stx_getAccountInfo({ params, network }: STXRPCParams) {
    const config = networkConfigs[network || 'mainnet'];
    const address = params?.[0];
    
    if (!address) {
      throw new Error('Address required');
    }

    const response = await fetch(`${config.apiUrl}/extended/v1/address/${address}`);
    if (!response.ok) {
      throw new Error('Failed to fetch account info');
    }

    const data = await response.json();
    return data;
  },

  /**
   * Get transaction by ID
   */
  async stx_getTransaction({ params, network }: STXRPCParams) {
    const config = networkConfigs[network || 'mainnet'];
    const txId = params?.[0];
    
    if (!txId) {
      throw new Error('Transaction ID required');
    }

    const response = await fetch(`${config.apiUrl}/extended/v1/tx/${txId}`);
    if (!response.ok) {
      throw new Error('Transaction not found');
    }

    const tx = await response.json();
    return tx;
  },

  /**
   * Get block by height
   */
  async stx_getBlock({ params, network }: STXRPCParams) {
    const config = networkConfigs[network || 'mainnet'];
    const height = params?.[0];
    
    if (height) {
      const response = await fetch(`${config.apiUrl}/extended/v1/block/by_height/${height}`);
      if (!response.ok) {
        throw new Error('Block not found');
      }
      const block = await response.json();
      return block;
    } else {
      const response = await fetch(`${config.apiUrl}/extended/v1/block`);
      if (!response.ok) {
        throw new Error('Failed to fetch latest block');
      }
      const block = await response.json();
      return block;
    }
  },

  /**
   * Get current block height
   */
  async stx_getBlockHeight({ network }: STXRPCParams) {
    const config = networkConfigs[network || 'mainnet'];
    
    const response = await fetch(`${config.apiUrl}/v2/info`);
    if (!response.ok) {
      throw new Error('Failed to fetch block height');
    }

    const data = await response.json();
    return data.stacks_tip_height;
  },

  /**
   * Call read-only function
   */
  async stx_callReadOnlyFunction({ params, network }: STXRPCParams) {
    const config = networkConfigs[network || 'mainnet'];
    const contractAddress = params?.[0];
    const contractName = params?.[1];
    const functionName = params?.[2];
    const functionArgs = params?.[3] || [];
    
    if (!contractAddress || !contractName || !functionName) {
      throw new Error('Contract address, name, and function name required');
    }

    const response = await fetch(`${config.apiUrl}/v2/contracts/call-read/${contractAddress}/${contractName}/${functionName}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sender: params?.[4] || contractAddress,
        arguments: functionArgs
      })
    });

    if (!response.ok) {
      throw new Error('Failed to call function');
    }

    const result = await response.json();
    return result;
  },

  /**
   * Get contract source
   */
  async stx_getContractSource({ params, network }: STXRPCParams) {
    const config = networkConfigs[network || 'mainnet'];
    const contractAddress = params?.[0];
    const contractName = params?.[1];
    
    if (!contractAddress || !contractName) {
      throw new Error('Contract address and name required');
    }

    const response = await fetch(`${config.apiUrl}/v2/contracts/source/${contractAddress}/${contractName}`);
    if (!response.ok) {
      throw new Error('Contract not found');
    }

    const contract = await response.json();
    return contract;
  },

  /**
   * Get chain ID (network identifier)
   */
  async stx_getChainId({ network }: STXRPCParams) {
    const config = networkConfigs[network || 'mainnet'];
    return network === 'mainnet' ? '0x00000001' : '0x80000000';
  }
};

/**
 * Parse transaction parameters from RPC request
 */
export function parseTransactionFromParams(params: any[]): { recipient: string; amount: bigint; memo?: string } {
  if (!params || params.length === 0) {
    throw new Error('No transaction parameters provided');
  }

  const tx = params[0];
  
  if (!tx.recipient || !tx.amount) {
    throw new Error('Recipient and amount required');
  }

  return {
    recipient: tx.recipient,
    amount: BigInt(tx.amount),
    memo: tx.memo
  };
}

export default {
  stxMethods,
  parseTransactionFromParams
};

