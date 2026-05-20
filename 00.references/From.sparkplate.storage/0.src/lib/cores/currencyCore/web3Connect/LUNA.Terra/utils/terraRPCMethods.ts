/**
 * Terra (LUNA) RPC Methods Handler
 * 
 * Handles WalletConnect, Terra Station, and Keplr RPC method calls for Terra.
 * Terra uses Cosmos SDK, so methods are similar to Cosmos but Terra-specific.
 */

import { SigningStargateClient, StargateClient } from '@cosmjs/stargate';
import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';
import { Coin } from '@cosmjs/amino';
import { EncodeObject } from '@cosmjs/proto-signing';

export interface TerraRPCParams {
  wallet?: any;
  params?: any[];
  network?: string;
  dispatch?: any;
  chainId?: string;
}

export interface TerraTransactionParams {
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

// Network configurations for Terra
const networkConfigs: Record<string, any> = {
  mainnet: {
    chainId: 'phoenix-1',
    rpc: 'https://terra-rpc.publicnode.com',
    prefix: 'terra',
    name: 'Terra Mainnet'
  },
  testnet: {
    chainId: 'pisco-1',
    rpc: 'https://terra-testnet-rpc.publicnode.com',
    prefix: 'terra',
    name: 'Terra Testnet'
  }
};

// Get client for specified network
function getNetworkConfig(network: string = 'mainnet') {
  return networkConfigs[network] || networkConfigs.mainnet;
}

export const terraMethods = {
  /**
   * Send a signed transaction to the Terra network
   */
  async terra_sendTransaction({ params, network, chainId }: TerraRPCParams) {
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
  async terra_signAndSendTransaction({ wallet, params, network }: TerraRPCParams) {
    if (!wallet) {
      throw new Error('Wallet required for transaction signing');
    }

    const config = getNetworkConfig(network || 'mainnet');
    const signingClient = await SigningStargateClient.connectWithSigner(
      config.rpc,
      wallet.signer,
      { prefix: config.prefix }
    );

    const txParams = parseTransactionFromParams(params);
    const { messages, fee, memo } = txParams;

    if (!messages || messages.length === 0) {
      throw new Error('No messages provided in transaction');
    }

    // Send transaction
    const result = await signingClient.signAndBroadcast(
      wallet.address,
      messages,
      fee || 'auto',
      memo || ''
    );

    return result.transactionHash;
  },

  /**
   * Sign a transaction without sending
   */
  async terra_signTransaction({ wallet, params, network }: TerraRPCParams) {
    if (!wallet) {
      throw new Error('Wallet required for transaction signing');
    }

    const config = getNetworkConfig(network || 'mainnet');
    const signingClient = await SigningStargateClient.connectWithSigner(
      config.rpc,
      wallet.signer,
      { prefix: config.prefix }
    );

    const txParams = parseTransactionFromParams(params);
    const { messages, fee, memo } = txParams;

    if (!messages || messages.length === 0) {
      throw new Error('No messages provided in transaction');
    }

    // Sign transaction
    const signedTx = await signingClient.sign(
      wallet.address,
      messages,
      fee || 'auto',
      memo || ''
    );

    return signedTx;
  },

  /**
   * Get account balance
   */
  async terra_getBalance({ params, network }: TerraRPCParams) {
    const config = getNetworkConfig(network || 'mainnet');
    const client = await StargateClient.connect(config.rpc);
    const address = params?.[0];
    const denom = params?.[1] || 'uluna';

    if (!address) {
      throw new Error('Address required');
    }

    const balance = await client.getBalance(address, denom);
    return balance ? balance.amount : '0';
  },

  /**
   * Get all account balances
   */
  async terra_getAllBalances({ params, network }: TerraRPCParams) {
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
   * Get account info
   */
  async terra_getAccount({ params, network }: TerraRPCParams) {
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
   * Get transaction by hash
   */
  async terra_getTransaction({ params, network }: TerraRPCParams) {
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
   * Get block by height
   */
  async terra_getBlock({ params, network }: TerraRPCParams) {
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
   * Get current block height
   */
  async terra_getBlockHeight({ network }: TerraRPCParams) {
    const config = getNetworkConfig(network || 'mainnet');
    const client = await StargateClient.connect(config.rpc);
    const height = await client.getHeight();
    return height;
  },

  /**
   * Query smart contract
   */
  async terra_queryContract({ params, network }: TerraRPCParams) {
    const config = getNetworkConfig(network || 'mainnet');
    const client = await StargateClient.connect(config.rpc);
    const contractAddress = params?.[0];
    const queryMsg = params?.[1];

    if (!contractAddress || !queryMsg) {
      throw new Error('Contract address and query message required');
    }

    // Query contract using CosmWasm query
    const result = await client.queryContractSmart(contractAddress, queryMsg);
    return result;
  },

  /**
   * Execute smart contract
   */
  async terra_executeContract({ wallet, params, network }: TerraRPCParams) {
    if (!wallet) {
      throw new Error('Wallet required for contract execution');
    }

    const config = getNetworkConfig(network || 'mainnet');
    const signingClient = await SigningStargateClient.connectWithSigner(
      config.rpc,
      wallet.signer,
      { prefix: config.prefix }
    );

    const contractAddress = params?.[0];
    const executeMsg = params?.[1];
    const funds = params?.[2] || [];

    if (!contractAddress || !executeMsg) {
      throw new Error('Contract address and execute message required');
    }

    // Execute contract
    const result = await signingClient.execute(
      wallet.address,
      contractAddress,
      executeMsg,
      'auto',
      '',
      funds
    );

    return result.transactionHash;
  },

  /**
   * Get chain ID
   */
  async terra_getChainId({ network }: TerraRPCParams) {
    const config = getNetworkConfig(network || 'mainnet');
    return config.chainId;
  }
};

/**
 * Parse transaction parameters from RPC request
 */
export function parseTransactionFromParams(params: any[]): TerraTransactionParams & { to?: string; amount?: Coin[] } {
  if (!params || params.length === 0) {
    throw new Error('No transaction parameters provided');
  }

  const tx = params[0];
  
  // Handle different transaction formats
  if (tx.messages) {
    return {
      messages: tx.messages,
      fee: tx.fee,
      memo: tx.memo,
      gas: tx.gas
    };
  } else if (tx.to && tx.amount) {
    // Simple transfer format
    return {
      to: tx.to,
      amount: tx.amount,
      fee: tx.fee,
      memo: tx.memo,
      gas: tx.gas
    };
  } else {
    // Default: treat as messages array
    return {
      messages: Array.isArray(tx) ? tx : [tx],
      fee: 'auto',
      memo: ''
    };
  }
}

export default {
  terraMethods,
  parseTransactionFromParams
};

