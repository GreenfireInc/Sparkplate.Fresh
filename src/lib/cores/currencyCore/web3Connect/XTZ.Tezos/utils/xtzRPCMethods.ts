/**
 * Tezos (XTZ) RPC Methods Handler
 * 
 * Handles WalletConnect and Tezos wallet RPC method calls.
 * Tezos uses Michelson smart contracts and Taquito SDK.
 */

import { TezosToolkit, MichelsonMap } from '@taquito/taquito';
import { InMemorySigner } from '@taquito/signer';

export interface XTZRPCParams {
  wallet?: any;
  params?: any[];
  network?: string;
  dispatch?: any;
}

// Network configurations for Tezos
const networkConfigs: Record<string, any> = {
  mainnet: {
    rpc: 'https://mainnet.api.tez.ie',
    name: 'Tezos Mainnet',
    chainId: 'NetXdQprcVkpaWU'
  },
  ghostnet: {
    rpc: 'https://ghostnet.ecadinfra.com',
    name: 'Tezos Ghostnet',
    chainId: 'NetXnHfVqm9iesp'
  },
  kathmandunet: {
    rpc: 'https://kathmandunet.ecadinfra.com',
    name: 'Tezos Kathmandunet',
    chainId: 'NetXi2ZagzEsXb'
  }
};

// Get toolkit for specified network
function getToolkit(network: string = 'mainnet'): TezosToolkit {
  const config = networkConfigs[network] || networkConfigs.mainnet;
  const toolkit = new TezosToolkit(config.rpc);
  return toolkit;
}

export const xtzMethods = {
  /**
   * Send a signed transaction to the Tezos network
   */
  async xtz_sendTransaction({ params, network }: XTZRPCParams) {
    const toolkit = getToolkit(network || 'mainnet');
    const signedTx = params?.[0];
    
    if (!signedTx) {
      throw new Error('No signed transaction provided');
    }

    try {
      // Submit transaction
      const op = await toolkit.contract.transfer(signedTx);
      await op.confirmation();
      return op.hash;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Sign and send a transaction
   */
  async xtz_signAndSendTransaction({ wallet, params, network }: XTZRPCParams) {
    if (!wallet) {
      throw new Error('Wallet required for transaction signing');
    }

    const toolkit = getToolkit(network || 'mainnet');
    const txParams = parseTransactionFromParams(params);

    try {
      // Set signer if private key is available
      if (wallet.privateKey) {
        toolkit.setSignerProvider(new InMemorySigner(wallet.privateKey));
      } else if (wallet.signer) {
        toolkit.setSignerProvider(wallet.signer);
      }

      // Build operation
      let op: any;

      if (txParams.type === 'transfer') {
        op = await toolkit.contract.transfer({
          to: txParams.to,
          amount: txParams.amount || 0,
          mutez: txParams.mutez || false
        });
      } else if (txParams.type === 'contractCall') {
        const contract = await toolkit.contract.at(txParams.contractAddress);
        op = await contract.methods[txParams.method](...txParams.parameters || []).send();
      } else {
        throw new Error('Unsupported transaction type');
      }

      // Wait for confirmation
      await op.confirmation();
      return op.hash;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Sign a transaction without sending
   */
  async xtz_signTransaction({ wallet, params, network }: XTZRPCParams) {
    if (!wallet) {
      throw new Error('Wallet required for transaction signing');
    }

    const toolkit = getToolkit(network || 'mainnet');
    const txParams = parseTransactionFromParams(params);

    try {
      // Set signer if private key is available
      if (wallet.privateKey) {
        toolkit.setSignerProvider(new InMemorySigner(wallet.privateKey));
      } else if (wallet.signer) {
        toolkit.setSignerProvider(wallet.signer);
      }

      // Build operation
      let op: any;

      if (txParams.type === 'transfer') {
        op = await toolkit.contract.transfer({
          to: txParams.to,
          amount: txParams.amount || 0,
          mutez: txParams.mutez || false
        });
      } else if (txParams.type === 'contractCall') {
        const contract = await toolkit.contract.at(txParams.contractAddress);
        op = await contract.methods[txParams.method](...txParams.parameters || []).send();
      } else {
        throw new Error('Unsupported transaction type');
      }

      // Prepare but don't send
      const prepared = await op.prepare();
      return prepared;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Sign a message
   */
  async xtz_signMessage({ wallet, params, network }: XTZRPCParams) {
    if (!wallet) {
      throw new Error('Wallet required for message signing');
    }

    const message = params?.[0];
    
    if (!message) {
      throw new Error('Message required');
    }

    // Tezos message signing
    if (wallet.signMessage) {
      return await wallet.signMessage(message);
    } else {
      throw new Error('No signing method available');
    }
  },

  /**
   * Get account balance
   */
  async xtz_getBalance({ params, network }: XTZRPCParams) {
    const toolkit = getToolkit(network || 'mainnet');
    const address = params?.[0];
    
    if (!address) {
      throw new Error('Address required');
    }

    try {
      const balance = await toolkit.tz.getBalance(address);
      // Convert from mutez to tez (1 tez = 1,000,000 mutez)
      const balanceTez = balance.toNumber() / 1000000;
      return balanceTez.toString();
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get account info
   */
  async xtz_getAccountInfo({ params, network }: XTZRPCParams) {
    const toolkit = getToolkit(network || 'mainnet');
    const address = params?.[0];
    
    if (!address) {
      throw new Error('Address required');
    }

    try {
      const account = await toolkit.rpc.getAccount(address);
      return account;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get contract storage
   */
  async xtz_getContractStorage({ params, network }: XTZRPCParams) {
    const toolkit = getToolkit(network || 'mainnet');
    const contractAddress = params?.[0];
    
    if (!contractAddress) {
      throw new Error('Contract address required');
    }

    try {
      const contract = await toolkit.contract.at(contractAddress);
      const storage = await contract.storage();
      return storage;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Call a contract method (read-only)
   */
  async xtz_callContract({ params, network }: XTZRPCParams) {
    const toolkit = getToolkit(network || 'mainnet');
    const contractAddress = params?.[0];
    const method = params?.[1];
    const parameters = params?.[2] || [];
    
    if (!contractAddress || !method) {
      throw new Error('Contract address and method required');
    }

    try {
      const contract = await toolkit.contract.at(contractAddress);
      const result = await contract.methods[method](...parameters).read();
      return result;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get transaction by hash
   */
  async xtz_getTransaction({ params, network }: XTZRPCParams) {
    const toolkit = getToolkit(network || 'mainnet');
    const txHash = params?.[0];
    
    if (!txHash) {
      throw new Error('Transaction hash required');
    }

    try {
      const op = await toolkit.rpc.getOperation(txHash);
      return op;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get block by level
   */
  async xtz_getBlock({ params, network }: XTZRPCParams) {
    const toolkit = getToolkit(network || 'mainnet');
    const level = params?.[0];
    
    try {
      const block = await toolkit.rpc.getBlock({ block: level || 'head' });
      return block;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get current block level
   */
  async xtz_getBlockLevel({ network }: XTZRPCParams) {
    const toolkit = getToolkit(network || 'mainnet');
    
    try {
      const block = await toolkit.rpc.getBlock();
      return block.header.level;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get chain ID
   */
  async xtz_getChainId({ network }: XTZRPCParams) {
    const config = networkConfigs[network || 'mainnet'] || networkConfigs.mainnet;
    return config.chainId;
  },

  /**
   * Get FA1.2 token balance
   */
  async xtz_getFA12Balance({ params, network }: XTZRPCParams) {
    const toolkit = getToolkit(network || 'mainnet');
    const contractAddress = params?.[0];
    const owner = params?.[1];
    
    if (!contractAddress || !owner) {
      throw new Error('Contract address and owner required');
    }

    try {
      const contract = await toolkit.contract.at(contractAddress);
      const storage: any = await contract.storage();
      
      // FA1.2 balance is typically in ledger map
      const balance = await storage.ledger.get(owner);
      return balance ? balance.toString() : '0';
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get FA2 token balance
   */
  async xtz_getFA2Balance({ params, network }: XTZRPCParams) {
    const toolkit = getToolkit(network || 'mainnet');
    const contractAddress = params?.[0];
    const owner = params?.[1];
    const tokenId = params?.[2] || 0;
    
    if (!contractAddress || !owner) {
      throw new Error('Contract address and owner required');
    }

    try {
      const contract = await toolkit.contract.at(contractAddress);
      const storage: any = await contract.storage();
      
      // FA2 balance is typically in ledger map with token_id
      const ledger = storage.ledger;
      const balance = await ledger.get({ owner, token_id: tokenId });
      return balance ? balance.toString() : '0';
    } catch (error) {
      throw error;
    }
  }
};

/**
 * Parse transaction parameters from RPC request
 */
export function parseTransactionFromParams(params: any[]): { 
  type?: 'transfer' | 'contractCall';
  to?: string;
  amount?: number;
  mutez?: boolean;
  contractAddress?: string;
  method?: string;
  parameters?: any[];
} {
  if (!params || params.length === 0) {
    throw new Error('No transaction parameters provided');
  }

  const tx = params[0];
  
  return {
    type: tx.type || (tx.contractAddress ? 'contractCall' : 'transfer'),
    to: tx.to,
    amount: tx.amount,
    mutez: tx.mutez,
    contractAddress: tx.contractAddress,
    method: tx.method,
    parameters: tx.parameters
  };
}

export default {
  xtzMethods,
  parseTransactionFromParams
};
