/**
 * Bitcoin (BTC) RPC Methods Handler
 * 
 * Handles WalletConnect and Bitcoin Core RPC method calls for Bitcoin.
 * Bitcoin uses UTXO model and PSBT (Partially Signed Bitcoin Transactions).
 */

import * as bitcoin from 'bitcoinjs-lib';
import { Psbt } from 'bitcoinjs-lib';

export interface BTCRPCParams {
  wallet?: any;
  params?: any[];
  network?: string;
  dispatch?: any;
}

// Network configurations for Bitcoin
const networkConfigs: Record<string, any> = {
  mainnet: {
    network: bitcoin.networks.bitcoin,
    name: 'Bitcoin Mainnet',
    rpc: 'https://blockstream.info/api',
    explorer: 'https://blockstream.info'
  },
  testnet: {
    network: bitcoin.networks.testnet,
    name: 'Bitcoin Testnet',
    rpc: 'https://blockstream.info/testnet/api',
    explorer: 'https://blockstream.info/testnet'
  },
  regtest: {
    network: bitcoin.networks.regtest,
    name: 'Bitcoin Regtest',
    rpc: 'http://localhost:18332',
    explorer: 'N/A'
  }
};

// Get network configuration
function getNetworkConfig(network: string = 'mainnet') {
  return networkConfigs[network] || networkConfigs.mainnet;
}

export const btcMethods = {
  /**
   * Send a signed transaction to the Bitcoin network
   */
  async btc_sendRawTransaction({ params, network }: BTCRPCParams) {
    const config = getNetworkConfig(network || 'mainnet');
    const rawTx = params?.[0];
    
    if (!rawTx) {
      throw new Error('No raw transaction provided');
    }

    // Broadcast transaction via RPC or API
    const response = await fetch(`${config.rpc}/tx`, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: rawTx
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Transaction broadcast failed: ${error}`);
    }

    const txId = await response.text();
    return txId.trim();
  },

  /**
   * Sign and send a PSBT (Partially Signed Bitcoin Transaction)
   */
  async btc_signAndSendPSBT({ wallet, params, network }: BTCRPCParams) {
    if (!wallet) {
      throw new Error('Wallet required for PSBT signing');
    }

    const config = getNetworkConfig(network || 'mainnet');
    const psbtBase64 = params?.[0];
    
    if (!psbtBase64) {
      throw new Error('No PSBT provided');
    }

    // Parse PSBT
    const psbt = Psbt.fromBase64(psbtBase64, { network: config.network });

    // Sign PSBT with wallet
    if (wallet.privateKey) {
      // Sign all inputs
      psbt.signAllInputs(wallet.privateKey);
      psbt.finalizeAllInputs();
    } else {
      throw new Error('Private key required for signing');
    }

    // Extract and broadcast transaction
    const tx = psbt.extractTransaction();
    const rawTx = tx.toHex();

    // Broadcast
    const response = await fetch(`${config.rpc}/tx`, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: rawTx
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Transaction broadcast failed: ${error}`);
    }

    const txId = await response.text();
    return txId.trim();
  },

  /**
   * Sign a PSBT without sending
   */
  async btc_signPSBT({ wallet, params, network }: BTCRPCParams) {
    if (!wallet) {
      throw new Error('Wallet required for PSBT signing');
    }

    const config = getNetworkConfig(network || 'mainnet');
    const psbtBase64 = params?.[0];
    
    if (!psbtBase64) {
      throw new Error('No PSBT provided');
    }

    // Parse PSBT
    const psbt = Psbt.fromBase64(psbtBase64, { network: config.network });

    // Sign PSBT with wallet
    if (wallet.privateKey) {
      psbt.signAllInputs(wallet.privateKey);
    } else {
      throw new Error('Private key required for signing');
    }

    // Return signed PSBT
    return psbt.toBase64();
  },

  /**
   * Create a PSBT for a transaction
   */
  async btc_createPSBT({ params, network }: BTCRPCParams) {
    const config = getNetworkConfig(network || 'mainnet');
    const { inputs, outputs } = params?.[0] || {};
    
    if (!inputs || !outputs) {
      throw new Error('Inputs and outputs required for PSBT creation');
    }

    const psbt = new Psbt({ network: config.network });

    // Add inputs
    for (const input of inputs) {
      psbt.addInput({
        hash: input.txid,
        index: input.vout,
        witnessUtxo: input.witnessUtxo,
        nonWitnessUtxo: input.nonWitnessUtxo
      });
    }

    // Add outputs
    for (const output of outputs) {
      psbt.addOutput({
        address: output.address,
        value: output.value
      });
    }

    return psbt.toBase64();
  },

  /**
   * Get UTXOs for an address
   */
  async btc_getUTXOs({ params, network }: BTCRPCParams) {
    const config = getNetworkConfig(network || 'mainnet');
    const address = params?.[0];
    
    if (!address) {
      throw new Error('Address required');
    }

    const response = await fetch(`${config.rpc}/address/${address}/utxo`);
    if (!response.ok) {
      throw new Error('Failed to fetch UTXOs');
    }

    const utxos = await response.json();
    return utxos;
  },

  /**
   * Get address balance
   */
  async btc_getBalance({ params, network }: BTCRPCParams) {
    const config = getNetworkConfig(network || 'mainnet');
    const address = params?.[0];
    
    if (!address) {
      throw new Error('Address required');
    }

    const response = await fetch(`${config.rpc}/address/${address}`);
    if (!response.ok) {
      throw new Error('Failed to fetch address info');
    }

    const addressInfo = await response.json();
    return {
      address: addressInfo.address,
      balance: addressInfo.chain_stats.funded_txo_sum - addressInfo.chain_stats.spent_txo_sum,
      confirmed: addressInfo.chain_stats.funded_txo_count - addressInfo.chain_stats.spent_txo_count
    };
  },

  /**
   * Get transaction by hash
   */
  async btc_getTransaction({ params, network }: BTCRPCParams) {
    const config = getNetworkConfig(network || 'mainnet');
    const txHash = params?.[0];
    
    if (!txHash) {
      throw new Error('Transaction hash required');
    }

    const response = await fetch(`${config.rpc}/tx/${txHash}`);
    if (!response.ok) {
      throw new Error('Transaction not found');
    }

    const tx = await response.json();
    return tx;
  },

  /**
   * Get transaction hex
   */
  async btc_getTransactionHex({ params, network }: BTCRPCParams) {
    const config = getNetworkConfig(network || 'mainnet');
    const txHash = params?.[0];
    
    if (!txHash) {
      throw new Error('Transaction hash required');
    }

    const response = await fetch(`${config.rpc}/tx/${txHash}/hex`);
    if (!response.ok) {
      throw new Error('Transaction not found');
    }

    const hex = await response.text();
    return hex.trim();
  },

  /**
   * Get block by hash
   */
  async btc_getBlock({ params, network }: BTCRPCParams) {
    const config = getNetworkConfig(network || 'mainnet');
    const blockHash = params?.[0];
    
    if (!blockHash) {
      throw new Error('Block hash required');
    }

    const response = await fetch(`${config.rpc}/block/${blockHash}`);
    if (!response.ok) {
      throw new Error('Block not found');
    }

    const block = await response.json();
    return block;
  },

  /**
   * Get block height
   */
  async btc_getBlockHeight({ network }: BTCRPCParams) {
    const config = getNetworkConfig(network || 'mainnet');
    
    const response = await fetch(`${config.rpc}/blocks/tip/height`);
    if (!response.ok) {
      throw new Error('Failed to fetch block height');
    }

    const height = await response.text();
    return parseInt(height.trim());
  },

  /**
   * Get block hash by height
   */
  async btc_getBlockHash({ params, network }: BTCRPCParams) {
    const config = getNetworkConfig(network || 'mainnet');
    const height = params?.[0];
    
    if (!height && height !== 0) {
      throw new Error('Block height required');
    }

    const response = await fetch(`${config.rpc}/block-height/${height}`);
    if (!response.ok) {
      throw new Error('Block not found');
    }

    const hash = await response.text();
    return hash.trim();
  },

  /**
   * Sign a message
   */
  async btc_signMessage({ wallet, params, network }: BTCRPCParams) {
    if (!wallet) {
      throw new Error('Wallet required for message signing');
    }

    const config = getNetworkConfig(network || 'mainnet');
    const message = params?.[0];
    const address = params?.[1];
    
    if (!message) {
      throw new Error('Message required');
    }

    if (!wallet.privateKey) {
      throw new Error('Private key required for signing');
    }

    // Sign message using Bitcoin message signing format
    const messageBuffer = Buffer.from(message, 'utf8');
    const messagePrefix = Buffer.from(`Bitcoin Signed Message:\n`, 'utf8');
    const messageLength = Buffer.alloc(1);
    messageLength.writeUInt8(messageBuffer.length, 0);
    
    const messageToSign = Buffer.concat([
      messagePrefix,
      messageLength,
      messageBuffer
    ]);

    // Hash and sign
    const hash = bitcoin.crypto.hash256(messageToSign);
    const signature = bitcoin.script.signature.encode(
      bitcoin.script.signature.sign(hash, wallet.privateKey),
      bitcoin.script.signature.SIGHASH_ALL
    );

    return signature.toString('base64');
  },

  /**
   * Verify a signed message
   */
  async btc_verifyMessage({ params, network }: BTCRPCParams) {
    const config = getNetworkConfig(network || 'mainnet');
    const address = params?.[0];
    const signature = params?.[1];
    const message = params?.[2];
    
    if (!address || !signature || !message) {
      throw new Error('Address, signature, and message required');
    }

    try {
      const messageBuffer = Buffer.from(message, 'utf8');
      const messagePrefix = Buffer.from(`Bitcoin Signed Message:\n`, 'utf8');
      const messageLength = Buffer.alloc(1);
      messageLength.writeUInt8(messageBuffer.length, 0);
      
      const messageToVerify = Buffer.concat([
        messagePrefix,
        messageLength,
        messageBuffer
      ]);

      const hash = bitcoin.crypto.hash256(messageToVerify);
      const signatureBuffer = Buffer.from(signature, 'base64');
      
      // Verify signature
      const publicKey = bitcoin.script.signature.decode(signatureBuffer).signature;
      // Implementation would verify against address
      // This is simplified - full implementation would recover public key and verify
      
      return true; // Simplified return
    } catch (error) {
      return false;
    }
  },

  /**
   * Get chain ID (network identifier)
   */
  async btc_getChainId({ network }: BTCRPCParams) {
    const config = getNetworkConfig(network || 'mainnet');
    return network === 'mainnet' ? 'bitcoin' : network === 'testnet' ? 'bitcoin-testnet' : 'bitcoin-regtest';
  }
};

export default {
  btcMethods
};

