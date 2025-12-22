/**
 * Polkadot RPC Methods Handler
 * 
 * Handles WalletConnect and Polkadot.js Extension RPC method calls.
 * Maps dApp requests to Polkadot/Substrate SDK operations.
 */

import { ApiPromise, WsProvider } from '@polkadot/api';
import { Keyring } from '@polkadot/keyring';
import { cryptoWaitReady } from '@polkadot/util-crypto';
import type { KeyringPair } from '@polkadot/keyring/types';
import type { SubmittableExtrinsic } from '@polkadot/api/types';

export interface DotRPCParams {
  wallet?: any;
  params?: any[];
  network?: string;
  dispatch?: any;
}

export interface PolkadotTransactionParams {
  dest: string;
  value: string | number;
  call?: any;
  method?: string;
  section?: string;
  args?: any[];
}

// Network configurations
const networkConfigs: Record<string, any> = {
  mainnet: {
    chainId: 'polkadot',
    rpc: 'wss://rpc.polkadot.io',
    ss58Format: 0
  },
  testnet: {
    chainId: 'westend',
    rpc: 'wss://westend-rpc.polkadot.io',
    ss58Format: 42
  },
  kusama: {
    chainId: 'kusama',
    rpc: 'wss://kusama-rpc.polkadot.io',
    ss58Format: 2
  }
};

// API instance cache
const apiCache: Map<string, ApiPromise> = new Map();

// Get API instance for specified network
async function getApi(network: string = 'mainnet'): Promise<ApiPromise> {
  if (apiCache.has(network)) {
    return apiCache.get(network)!;
  }

  const config = networkConfigs[network] || networkConfigs.mainnet;
  const provider = new WsProvider(config.rpc);
  const api = await ApiPromise.create({ provider });
  apiCache.set(network, api);
  return api;
}

// Get keyring pair from wallet
async function getKeyringPair(wallet: any, network: string = 'mainnet'): Promise<KeyringPair> {
  await cryptoWaitReady();
  
  const config = networkConfigs[network] || networkConfigs.mainnet;
  const keyring = new Keyring({ type: 'sr25519', ss58Format: config.ss58Format });

  if (wallet.mnemonic) {
    return keyring.addFromMnemonic(wallet.mnemonic);
  } else if (wallet.privateKey) {
    const privateKey = wallet.privateKey.startsWith('0x') 
      ? wallet.privateKey.slice(2) 
      : wallet.privateKey;
    return keyring.addFromUri(`0x${privateKey}`);
  } else if (wallet.seed) {
    return keyring.addFromUri(wallet.seed);
  }

  throw new Error('Mnemonic, private key, or seed required for Polkadot transactions');
}

export const dotMethods = {
  /**
   * Send a signed transaction to the Polkadot network
   */
  async dot_sendTransaction({ params, network }: DotRPCParams) {
    const api = await getApi(network || 'mainnet');
    const signedTx = params?.[0];
    
    if (!signedTx) {
      throw new Error('No signed transaction provided');
    }

    // Submit signed transaction
    const hash = await api.rpc.author.submitExtrinsic(signedTx);
    return hash.toString();
  },

  /**
   * Sign and send a transaction
   */
  async dot_signAndSend({ wallet, params, network }: DotRPCParams) {
    if (!wallet) {
      throw new Error('Wallet required for transaction signing');
    }

    const api = await getApi(network || 'mainnet');
    const keyPair = await getKeyringPair(wallet, network || 'mainnet');
    const txParams = parseTransactionFromParams(params);

    // Create transaction
    let tx: SubmittableExtrinsic<'promise'>;
    
    if (txParams.method && txParams.section) {
      // Use method and section
      tx = api.tx[txParams.section][txParams.method](...(txParams.args || []));
    } else if (txParams.call) {
      // Use call object
      tx = api.tx(txParams.call);
    } else {
      // Default to balance transfer
      tx = api.tx.balances.transfer(txParams.dest, txParams.value);
    }

    // Sign and send
    return new Promise((resolve, reject) => {
      tx.signAndSend(keyPair, ({ status, txHash }) => {
        if (status.isInBlock || status.isFinalized) {
          resolve({
            txHash: txHash.toString(),
            blockHash: status.asInBlock?.toString() || status.asFinalized?.toString()
          });
        }
      }).catch(reject);
    });
  },

  /**
   * Sign a transaction without sending
   */
  async dot_signTransaction({ wallet, params, network }: DotRPCParams) {
    if (!wallet) {
      throw new Error('Wallet required for transaction signing');
    }

    const api = await getApi(network || 'mainnet');
    const keyPair = await getKeyringPair(wallet, network || 'mainnet');
    const txParams = parseTransactionFromParams(params);

    // Create transaction
    let tx: SubmittableExtrinsic<'promise'>;
    
    if (txParams.method && txParams.section) {
      tx = api.tx[txParams.section][txParams.method](...(txParams.args || []));
    } else if (txParams.call) {
      tx = api.tx(txParams.call);
    } else {
      tx = api.tx.balances.transfer(txParams.dest, txParams.value);
    }

    // Sign transaction
    const signedTx = tx.sign(keyPair, { nonce: -1 });
    return signedTx.toHex();
  },

  /**
   * Get account information
   */
  async dot_getAccountInfo({ params, network }: DotRPCParams) {
    const api = await getApi(network || 'mainnet');
    const address = params?.[0];

    if (!address) {
      throw new Error('Address required');
    }

    const accountInfo = await api.query.system.account(address);
    return accountInfo.toJSON();
  },

  /**
   * Get account balance
   */
  async dot_getBalance({ params, network }: DotRPCParams) {
    const api = await getApi(network || 'mainnet');
    const address = params?.[0];

    if (!address) {
      throw new Error('Address required');
    }

    const accountInfo = await api.query.system.account(address);
    const balance = accountInfo.data.free;
    return balance.toString();
  },

  /**
   * Get transaction by hash
   */
  async dot_getTransaction({ params, network }: DotRPCParams) {
    const api = await getApi(network || 'mainnet');
    const txHash = params?.[0];

    if (!txHash) {
      throw new Error('Transaction hash required');
    }

    const tx = await api.rpc.chain.getBlock(txHash);
    return tx.toJSON();
  },

  /**
   * Get block by number
   */
  async dot_getBlock({ params, network }: DotRPCParams) {
    const api = await getApi(network || 'mainnet');
    const blockNumber = params?.[0];

    if (blockNumber) {
      const blockHash = await api.rpc.chain.getBlockHash(blockNumber);
      const block = await api.rpc.chain.getBlock(blockHash);
      return block.toJSON();
    } else {
      const block = await api.rpc.chain.getBlock();
      return block.toJSON();
    }
  },

  /**
   * Get chain metadata
   */
  async dot_getMetadata({ network }: DotRPCParams) {
    const api = await getApi(network || 'mainnet');
    const metadata = api.runtimeMetadata;
    return metadata.toJSON();
  },

  /**
   * Get chain properties
   */
  async dot_getChainProperties({ network }: DotRPCParams) {
    const api = await getApi(network || 'mainnet');
    const properties = await api.rpc.system.properties();
    return properties.toJSON();
  }
};

/**
 * Parse transaction parameters from RPC request
 */
export function parseTransactionFromParams(params: any[]): PolkadotTransactionParams {
  if (!params || params.length === 0) {
    throw new Error('No transaction parameters provided');
  }

  const tx = params[0];
  
  return {
    dest: tx.dest || tx.to,
    value: tx.value || 0,
    call: tx.call,
    method: tx.method,
    section: tx.section,
    args: tx.args
  };
}

export default {
  dotMethods,
  parseTransactionFromParams
};

