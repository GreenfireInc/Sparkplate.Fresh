/**
 * Ethereum Classic (ETC) RPC Methods Handler
 * 
 * Handles WalletConnect and MetaMask RPC method calls for ETC.
 * ETC is EVM-compatible, so methods are similar to Ethereum.
 */

import { getBytes, isHexString } from 'ethers';
import { ethers } from 'ethers';

export interface ETCRPCParams {
  wallet?: any;
  params?: any[];
  network?: string;
  dispatch?: any;
}

// Network configurations for ETC
const networkConfigs: Record<string, any> = {
  mainnet: {
    chainId: 61,
    name: 'Ethereum Classic Mainnet',
    rpc: 'https://etc.rivet.cloud',
    blockExplorer: 'https://blockscout.com/etc/mainnet'
  },
  testnet: {
    chainId: 63,
    name: 'Mordor Testnet',
    rpc: 'https://www.ethercluster.com/mordor',
    blockExplorer: 'https://blockscout.com/etc/mordor'
  }
};

// Get provider for specified network
function getProvider(network: string = 'mainnet') {
  const config = networkConfigs[network] || networkConfigs.mainnet;
  return new ethers.JsonRpcProvider(config.rpc);
}

// Get signer from wallet
function getSigner(wallet: any, network: string = 'mainnet') {
  const provider = getProvider(network);
  if (wallet.privateKey) {
    return new ethers.Wallet(wallet.privateKey, provider);
  }
  throw new Error('Private key required for signing');
}

export const etcMethods = {
  /**
   * Send a signed transaction to the ETC network
   */
  async etc_sendRawTransaction({ params, network }: ETCRPCParams) {
    const provider = getProvider(network || 'mainnet');
    const signedTx = params?.[0];
    
    if (!signedTx) {
      throw new Error('No signed transaction provided');
    }

    const txResponse = await provider.broadcastTransaction(signedTx);
    return txResponse.hash;
  },

  /**
   * Sign and send a transaction
   */
  async etc_sendTransaction({ wallet, params, network }: ETCRPCParams) {
    if (!wallet) {
      throw new Error('Wallet required for transaction signing');
    }

    const signer = getSigner(wallet, network || 'mainnet');
    const tx = parseTxFromParams(params);

    // Send transaction
    const receipt = await signer.sendTransaction(tx);
    return receipt.hash;
  },

  /**
   * Sign a transaction without sending
   */
  async etc_signTransaction({ wallet, params, network }: ETCRPCParams) {
    if (!wallet) {
      throw new Error('Wallet required for transaction signing');
    }

    const signer = getSigner(wallet, network || 'mainnet');
    const tx = parseTxFromParams(params);
    
    const populatedTx = await signer.populateTransaction(tx);
    const signedTransaction = await signer.signTransaction(populatedTx);
    return signedTransaction;
  },

  /**
   * Sign typed data (EIP-712)
   */
  async etc_signTypedData_v4({ wallet, params, network }: ETCRPCParams) {
    if (!wallet) {
      throw new Error('Wallet required for typed data signing');
    }

    const signer = getSigner(wallet, network || 'mainnet');
    const typedData = JSON.parse(params?.[1] || '{}');
    const { types, domain, message } = typedData;
    
    if (types.EIP712Domain) delete types.EIP712Domain;

    // Sign typed data
    const signed = await signer.signTypedData(domain, types, message);
    return signed;
  },

  /**
   * Sign a message
   */
  async etc_sign({ wallet, params, network }: ETCRPCParams) {
    if (!wallet) {
      throw new Error('Wallet required for message signing');
    }

    const signer = getSigner(wallet, network || 'mainnet');
    let message = params?.[1];
    
    if (isHexString(message)) {
      message = getBytes(message);
    }

    const signed = await signer.signMessage(message);
    return signed;
  },

  /**
   * Personal sign (Ethereum standard)
   */
  async etc_personal_sign({ wallet, params, network }: ETCRPCParams) {
    if (!wallet) {
      throw new Error('Wallet required for message signing');
    }

    const signer = getSigner(wallet, network || 'mainnet');
    let message = params?.[0];
    
    if (isHexString(message)) {
      message = getBytes(message);
    }

    const signed = await signer.signMessage(message);
    return signed;
  },

  /**
   * Get account balance
   */
  async etc_getBalance({ params, network }: ETCRPCParams) {
    const provider = getProvider(network || 'mainnet');
    const address = params?.[0];

    if (!address) {
      throw new Error('Address required');
    }

    const balance = await provider.getBalance(address);
    return balance.toString();
  },

  /**
   * Get transaction count (nonce)
   */
  async etc_getTransactionCount({ params, network }: ETCRPCParams) {
    const provider = getProvider(network || 'mainnet');
    const address = params?.[0];
    const blockTag = params?.[1] || 'latest';

    if (!address) {
      throw new Error('Address required');
    }

    const count = await provider.getTransactionCount(address, blockTag);
    return count;
  },

  /**
   * Get transaction by hash
   */
  async etc_getTransaction({ params, network }: ETCRPCParams) {
    const provider = getProvider(network || 'mainnet');
    const txHash = params?.[0];

    if (!txHash) {
      throw new Error('Transaction hash required');
    }

    const tx = await provider.getTransaction(txHash);
    return tx;
  },

  /**
   * Get transaction receipt
   */
  async etc_getTransactionReceipt({ params, network }: ETCRPCParams) {
    const provider = getProvider(network || 'mainnet');
    const txHash = params?.[0];

    if (!txHash) {
      throw new Error('Transaction hash required');
    }

    const receipt = await provider.getTransactionReceipt(txHash);
    return receipt;
  },

  /**
   * Get block by number
   */
  async etc_getBlock({ params, network }: ETCRPCParams) {
    const provider = getProvider(network || 'mainnet');
    const blockNumber = params?.[0];

    if (blockNumber) {
      const block = await provider.getBlock(Number(blockNumber));
      return block;
    } else {
      const block = await provider.getBlock('latest');
      return block;
    }
  },

  /**
   * Switch ETC network
   */
  async etc_switchEthereumChain({ dispatch, params }: ETCRPCParams) {
    const chainId = parseInt(params?.[0]?.chainId || '61');
    const network = chainId === 61 ? 'mainnet' : 'testnet';
    
    await dispatch(
      'userSettings/updateNetworkSelection',
      { coinTicker: 'etc', network },
      { root: true }
    );
    return null;
  },

  /**
   * Add ETC network to wallet
   */
  async etc_addEthereumChain({ params }: ETCRPCParams) {
    // This would typically be handled by the wallet extension
    // Return the network configuration
    const chainId = parseInt(params?.[0]?.chainId || '61');
    const config = chainId === 61 ? networkConfigs.mainnet : networkConfigs.testnet;
    
    return {
      chainId: `0x${config.chainId.toString(16)}`,
      chainName: config.name,
      nativeCurrency: {
        name: 'ETC',
        symbol: 'ETC',
        decimals: 18
      },
      rpcUrls: [config.rpc],
      blockExplorerUrls: [config.blockExplorer]
    };
  }
};

/**
 * Parse transaction parameters from RPC request
 */
export function parseTxFromParams(params: any[]) {
  if (!params || params.length === 0) {
    throw new Error('No transaction parameters provided');
  }

  const tx = JSON.parse(JSON.stringify(params[0]));
  
  if (tx.nonce) tx.nonce = parseInt(tx.nonce);
  if (tx.gas) {
    tx.gasLimit = BigInt(tx.gas);
    delete tx.gas;
  }
  if (tx.gasPrice) tx.gasPrice = BigInt(tx.gasPrice);
  if (tx.value) tx.value = BigInt(tx.value);
  if (tx.maxFeePerGas) tx.maxFeePerGas = BigInt(tx.maxFeePerGas);
  if (tx.maxPriorityFeePerGas) tx.maxPriorityFeePerGas = BigInt(tx.maxPriorityFeePerGas);

  return tx;
}

export default {
  etcMethods,
  parseTxFromParams
};

