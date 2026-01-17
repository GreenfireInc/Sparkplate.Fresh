/**
 * Ethereum (ETH) RPC Methods Handler
 * 
 * Handles WalletConnect and MetaMask RPC method calls for Ethereum.
 * Standard EVM RPC methods for the Ethereum mainnet and testnets.
 */

import { getBytes, isHexString } from 'ethers';
import { ethers } from 'ethers';

export interface ETHRPCParams {
  wallet?: any;
  params?: any[];
  network?: string;
  dispatch?: any;
}

// Network configurations for Ethereum
const networkConfigs: Record<string, any> = {
  mainnet: {
    chainId: 1,
    name: 'Ethereum Mainnet',
    rpc: 'https://eth.llamarpc.com',
    blockExplorer: 'https://etherscan.io'
  },
  sepolia: {
    chainId: 11155111,
    name: 'Sepolia Testnet',
    rpc: 'https://rpc.sepolia.org',
    blockExplorer: 'https://sepolia.etherscan.io'
  },
  goerli: {
    chainId: 5,
    name: 'Goerli Testnet',
    rpc: 'https://rpc.ankr.com/eth_goerli',
    blockExplorer: 'https://goerli.etherscan.io'
  },
  holesky: {
    chainId: 17000,
    name: 'Holesky Testnet',
    rpc: 'https://rpc.holesky.ethpandaops.io',
    blockExplorer: 'https://holesky.etherscan.io'
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

export const ethMethods = {
  /**
   * Send a signed transaction to the Ethereum network
   */
  async eth_sendRawTransaction({ params, network }: ETHRPCParams) {
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
  async eth_sendTransaction({ wallet, params, network }: ETHRPCParams) {
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
  async eth_signTransaction({ wallet, params, network }: ETHRPCParams) {
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
  async eth_signTypedData_v4({ wallet, params, network }: ETHRPCParams) {
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
   * Sign typed data v1 (legacy)
   */
  async eth_signTypedData({ wallet, params, network }: ETHRPCParams) {
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
  async eth_sign({ wallet, params, network }: ETHRPCParams) {
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
  async personal_sign({ wallet, params, network }: ETHRPCParams) {
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
  async eth_getBalance({ params, network }: ETHRPCParams) {
    const provider = getProvider(network || 'mainnet');
    const address = params?.[0];
    const blockTag = params?.[1] || 'latest';

    if (!address) {
      throw new Error('Address required');
    }

    const balance = await provider.getBalance(address, blockTag);
    return balance.toString();
  },

  /**
   * Get transaction count (nonce)
   */
  async eth_getTransactionCount({ params, network }: ETHRPCParams) {
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
  async eth_getTransactionByHash({ params, network }: ETHRPCParams) {
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
  async eth_getTransactionReceipt({ params, network }: ETHRPCParams) {
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
  async eth_getBlockByNumber({ params, network }: ETHRPCParams) {
    const provider = getProvider(network || 'mainnet');
    const blockNumber = params?.[0];
    const fullTx = params?.[1] || false;

    if (blockNumber) {
      const block = await provider.getBlock(Number(blockNumber), fullTx);
      return block;
    } else {
      const block = await provider.getBlock('latest', fullTx);
      return block;
    }
  },

  /**
   * Get code at address (contract code)
   */
  async eth_getCode({ params, network }: ETHRPCParams) {
    const provider = getProvider(network || 'mainnet');
    const address = params?.[0];
    const blockTag = params?.[1] || 'latest';

    if (!address) {
      throw new Error('Address required');
    }

    const code = await provider.getCode(address, blockTag);
    return code;
  },

  /**
   * Call contract method
   */
  async eth_call({ params, network }: ETHRPCParams) {
    const provider = getProvider(network || 'mainnet');
    const tx = params?.[0];
    const blockTag = params?.[1] || 'latest';

    if (!tx) {
      throw new Error('Transaction object required');
    }

    const result = await provider.call(tx, blockTag);
    return result;
  },

  /**
   * Estimate gas for transaction
   */
  async eth_estimateGas({ params, network }: ETHRPCParams) {
    const provider = getProvider(network || 'mainnet');
    const tx = params?.[0];

    if (!tx) {
      throw new Error('Transaction object required');
    }

    const gasEstimate = await provider.estimateGas(tx);
    return gasEstimate.toString();
  },

  /**
   * Get gas price
   */
  async eth_gasPrice({ network }: ETHRPCParams) {
    const provider = getProvider(network || 'mainnet');
    const feeData = await provider.getFeeData();
    return feeData.gasPrice?.toString() || '0';
  },

  /**
   * Get current block number
   */
  async eth_blockNumber({ network }: ETHRPCParams) {
    const provider = getProvider(network || 'mainnet');
    const blockNumber = await provider.getBlockNumber();
    return `0x${blockNumber.toString(16)}`;
  },

  /**
   * Get chain ID
   */
  async eth_chainId({ network }: ETHRPCParams) {
    const config = networkConfigs[network || 'mainnet'] || networkConfigs.mainnet;
    return `0x${config.chainId.toString(16)}`;
  },

  /**
   * Switch Ethereum network
   */
  async wallet_switchEthereumChain({ dispatch, params }: ETHRPCParams) {
    const chainId = parseInt(params?.[0]?.chainId || '1');
    let network = 'mainnet';
    
    if (chainId === 1) network = 'mainnet';
    else if (chainId === 11155111) network = 'sepolia';
    else if (chainId === 5) network = 'goerli';
    else if (chainId === 17000) network = 'holesky';
    
    await dispatch(
      'userSettings/updateNetworkSelection',
      { coinTicker: 'eth', network },
      { root: true }
    );
    return null;
  },

  /**
   * Add Ethereum network to wallet
   */
  async wallet_addEthereumChain({ params }: ETHRPCParams) {
    // This would typically be handled by the wallet extension
    // Return the network configuration
    const chainId = parseInt(params?.[0]?.chainId || '1');
    let config = networkConfigs.mainnet;
    
    if (chainId === 1) config = networkConfigs.mainnet;
    else if (chainId === 11155111) config = networkConfigs.sepolia;
    else if (chainId === 5) config = networkConfigs.goerli;
    else if (chainId === 17000) config = networkConfigs.holesky;
    
    return {
      chainId: `0x${config.chainId.toString(16)}`,
      chainName: config.name,
      nativeCurrency: {
        name: 'ETH',
        symbol: 'ETH',
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
  ethMethods,
  parseTxFromParams
};

