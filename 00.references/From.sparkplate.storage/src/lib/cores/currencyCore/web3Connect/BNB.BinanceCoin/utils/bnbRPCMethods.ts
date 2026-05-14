/**
 * Binance Smart Chain (BNB) RPC Methods Handler
 * 
 * Handles WalletConnect and MetaMask RPC method calls for BSC.
 * BSC is EVM-compatible, so methods are similar to Ethereum.
 */

import { getBytes, isHexString, Network } from 'ethers';
import { ethers } from 'ethers';

export interface BNBRPCParams {
  wallet?: any;
  params?: any[];
  network?: string;
  dispatch?: any;
}

// Network configurations for BSC
const networkConfigs: Record<string, any> = {
  mainnet: {
    chainId: 56,
    name: 'BSC Mainnet',
    rpc: 'https://bsc-dataseed1.binance.org',
    blockExplorer: 'https://bscscan.com'
  },
  testnet: {
    chainId: 97,
    name: 'BSC Testnet',
    rpc: 'https://data-seed-prebsc-1-s1.binance.org:8545',
    blockExplorer: 'https://testnet.bscscan.com'
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

export const bnbMethods = {
  /**
   * Send a signed transaction to the BSC network
   */
  async bnb_sendRawTransaction({ params, network }: BNBRPCParams) {
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
  async bnb_sendTransaction({ wallet, params, network }: BNBRPCParams) {
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
  async bnb_signTransaction({ wallet, params, network }: BNBRPCParams) {
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
  async bnb_signTypedData_v4({ wallet, params, network }: BNBRPCParams) {
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
  async bnb_sign({ wallet, params, network }: BNBRPCParams) {
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
  async bnb_personal_sign({ wallet, params, network }: BNBRPCParams) {
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
  async bnb_getBalance({ params, network }: BNBRPCParams) {
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
  async bnb_getTransactionCount({ params, network }: BNBRPCParams) {
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
  async bnb_getTransaction({ params, network }: BNBRPCParams) {
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
  async bnb_getTransactionReceipt({ params, network }: BNBRPCParams) {
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
  async bnb_getBlock({ params, network }: BNBRPCParams) {
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
   * Switch BSC network
   */
  async bnb_switchEthereumChain({ dispatch, params }: BNBRPCParams) {
    const chainId = parseInt(params?.[0]?.chainId || '56');
    const network = chainId === 56 ? 'mainnet' : 'testnet';
    
    await dispatch(
      'userSettings/updateNetworkSelection',
      { coinTicker: 'bnb', network },
      { root: true }
    );
    return null;
  },

  /**
   * Add BSC network to wallet
   */
  async bnb_addEthereumChain({ params }: BNBRPCParams) {
    // This would typically be handled by the wallet extension
    // Return the network configuration
    const chainId = parseInt(params?.[0]?.chainId || '56');
    const config = chainId === 56 ? networkConfigs.mainnet : networkConfigs.testnet;
    
    return {
      chainId: `0x${config.chainId.toString(16)}`,
      chainName: config.name,
      nativeCurrency: {
        name: 'BNB',
        symbol: 'BNB',
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
  bnbMethods,
  parseTxFromParams
};

