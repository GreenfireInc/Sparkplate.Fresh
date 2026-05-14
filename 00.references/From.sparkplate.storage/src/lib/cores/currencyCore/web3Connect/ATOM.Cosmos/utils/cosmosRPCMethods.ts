/**
 * Cosmos RPC Methods Handler
 * 
 * Handles WalletConnect and Keplr RPC method calls for Cosmos.
 * Maps dApp requests to Cosmos SDK operations.
 */

import { SigningStargateClient, StargateClient } from '@cosmjs/stargate';
import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';
import { Coin } from '@cosmjs/amino';
import { EncodeObject } from '@cosmjs/proto-signing';

export interface CosmosRPCParams {
  wallet?: any;
  params?: any[];
  network?: string;
  dispatch?: any;
  chainId?: string;
}

export interface CosmosTransactionParams {
  messages?: EncodeObject[];
  to?: string;
  amount?: Coin[];
  fee?: {
    amount: Coin[];
    gas: string;
  } | string;
  memo?: string;
  gas?: string;
}

// Network configurations
const networkConfigs: Record<string, any> = {
  mainnet: {
    chainId: 'cosmoshub-4',
    rpc: 'https://rpc.cosmos.network',
    prefix: 'cosmos'
  },
  testnet: {
    chainId: 'theta-testnet-001',
    rpc: 'https://rpc.sentry-01.theta-testnet.polypore.xyz',
    prefix: 'cosmos'
  },
  osmosis: {
    chainId: 'osmosis-1',
    rpc: 'https://rpc.osmosis.zone',
    prefix: 'osmo'
  },
  juno: {
    chainId: 'juno-1',
    rpc: 'https://rpc-juno.itastakers.com',
    prefix: 'juno'
  }
};

// Get client for specified network
function getNetworkConfig(network: string = 'mainnet') {
  return networkConfigs[network] || networkConfigs.mainnet;
}

export const cosmosMethods = {
  /**
   * Send a signed transaction to the Cosmos network
   */
  async cosmos_sendTransaction({ params, network, chainId }: CosmosRPCParams) {
    const config = getNetworkConfig(network || 'mainnet');
    const client = await StargateClient.connect(config.rpc);
    
    const signedTx = params?.[0];
    if (!signedTx) {
      throw new Error('No signed transaction provided');
    }

    // Broadcast transaction
    const result = await client.broadcastTx(signedTx);
    return result.transactionHash;
  },

  /**
   * Sign and send a transaction
   */
  async cosmos_sendTokens({ wallet, params, network }: CosmosRPCParams) {
    if (!wallet) {
      throw new Error('Wallet required for transaction signing');
    }

    const config = getNetworkConfig(network || 'mainnet');
    const txParams = parseTransactionFromParams(params);

    // Create wallet from mnemonic or private key
    let signingWallet;
    if (wallet.mnemonic) {
      signingWallet = await DirectSecp256k1HdWallet.fromMnemonic(wallet.mnemonic, {
        prefix: config.prefix
      });
    } else {
      throw new Error('Mnemonic required for Cosmos transactions');
    }

    // Create signing client
    const signingClient = await SigningStargateClient.connectWithSigner(
      config.rpc,
      signingWallet
    );

    // Get sender address
    const accounts = await signingWallet.getAccounts();
    const sender = accounts[0].address;

    // Send tokens
    const result = await signingClient.sendTokens(
      sender,
      txParams.to,
      txParams.amount,
      txParams.fee || 'auto',
      txParams.memo
    );

    return result.transactionHash;
  },

  /**
   * Sign a transaction without sending
   */
  async cosmos_signTransaction({ wallet, params, network }: CosmosRPCParams) {
    if (!wallet) {
      throw new Error('Wallet required for transaction signing');
    }

    const config = getNetworkConfig(network || 'mainnet');
    const txParams = parseTransactionFromParams(params);

    // Create wallet from mnemonic
    let signingWallet;
    if (wallet.mnemonic) {
      signingWallet = await DirectSecp256k1HdWallet.fromMnemonic(wallet.mnemonic, {
        prefix: config.prefix
      });
    } else {
      throw new Error('Mnemonic required for Cosmos transactions');
    }

    // Create signing client
    const signingClient = await SigningStargateClient.connectWithSigner(
      config.rpc,
      signingWallet
    );

    // Get sender address
    const accounts = await signingWallet.getAccounts();
    const sender = accounts[0].address;

    // Sign transaction
    const signedTx = await signingClient.sign(
      sender,
      txParams.messages,
      txParams.fee || 'auto',
      txParams.memo || ''
    );

    return {
      signed: signedTx,
      transactionHash: signedTx.transactionHash
    };
  },

  /**
   * Get account information
   */
  async cosmos_getAccount({ params, network }: CosmosRPCParams) {
    const config = getNetworkConfig(network || 'mainnet');
    const client = await StargateClient.connect(config.rpc);
    const address = params?.[0];

    if (!address) {
      throw new Error('Address required');
    }

    const account = await client.getAccount(address);
    return account;
  },

  /**
   * Get account balance
   */
  async cosmos_getBalance({ params, network }: CosmosRPCParams) {
    const config = getNetworkConfig(network || 'mainnet');
    const client = await StargateClient.connect(config.rpc);
    const address = params?.[0];
    const denom = params?.[1] || 'uatom';

    if (!address) {
      throw new Error('Address required');
    }

    const balance = await client.getBalance(address, denom);
    return balance;
  },

  /**
   * Get all balances for an account
   */
  async cosmos_getAllBalances({ params, network }: CosmosRPCParams) {
    const config = getNetworkConfig(network || 'mainnet');
    const client = await StargateClient.connect(config.rpc);
    const address = params?.[0];

    if (!address) {
      throw new Error('Address required');
    }

    const balances = await client.getAllBalances(address);
    return balances;
  },

  /**
   * Get transaction by hash
   */
  async cosmos_getTransaction({ params, network }: CosmosRPCParams) {
    const config = getNetworkConfig(network || 'mainnet');
    const client = await StargateClient.connect(config.rpc);
    const txHash = params?.[0];

    if (!txHash) {
      throw new Error('Transaction hash required');
    }

    const tx = await client.getTx(txHash);
    return tx;
  },

  /**
   * Get block information
   */
  async cosmos_getBlock({ params, network }: CosmosRPCParams) {
    const config = getNetworkConfig(network || 'mainnet');
    const client = await StargateClient.connect(config.rpc);
    const height = params?.[0];

    if (height) {
      const block = await client.getBlock(Number(height));
      return block;
    } else {
      const block = await client.getBlock();
      return block;
    }
  },

  /**
   * Get chain ID
   */
  async cosmos_getChainId({ network }: CosmosRPCParams) {
    const config = getNetworkConfig(network || 'mainnet');
    return config.chainId;
  }
};

/**
 * Parse transaction parameters from RPC request
 */
export function parseTransactionFromParams(params: any[]): CosmosTransactionParams & { to?: string; amount?: Coin[] } {
  if (!params || params.length === 0) {
    throw new Error('No transaction parameters provided');
  }

  const tx = params[0];
  
  return {
    messages: tx.messages || [],
    fee: tx.fee,
    memo: tx.memo,
    to: tx.to,
    amount: tx.amount || [],
    gas: tx.gas
  };
}

export default {
  cosmosMethods,
  parseTransactionFromParams
};

