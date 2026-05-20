// Bitcoin OP_RETURN Inscription
// Inscribes data directly to Bitcoin blockchain using OP_RETURN

/**
 * OVERVIEW:
 * 
 * This module inscribes data to Bitcoin blockchain using OP_RETURN outputs.
 * - Embed up to 80 bytes (standard) of arbitrary data on-chain
 * - Provably unspendable output (null data)
 * - Simple and widely supported across Bitcoin network
 * - Reference to larger off-chain data (like Arweave TX IDs)
 * 
 * BENEFITS:
 * - Direct on-chain proof of data existence
 * - Timestamped by Bitcoin blockchain
 * - Immutable once confirmed
 * - Can reference external storage (Arweave, IPFS, etc.)
 * - Works on mainnet and testnet
 * 
 * COSTS:
 * - Transaction fee: Variable based on network congestion (~500-5000 sats)
 * - No ongoing storage costs
 * - OP_RETURN output has 0 value
 * 
 * USE CASES:
 * - Proof of existence for NFT metadata
 * - Reference to Arweave transactions
 * - Timestamping documents
 * - Cross-chain anchoring
 */

import * as bitcoin from 'bitcoinjs-lib';
import axios from 'axios';

export interface BitcoinInscriptionConfig {
  network?: 'mainnet' | 'testnet'; // Bitcoin network
  rpcUrl?: string; // Custom RPC URL
  apiProvider?: 'blockstream' | 'mempool' | 'custom'; // Block explorer API
  customApiUrl?: string; // Custom API URL if provider is 'custom'
  feeRate?: number; // Satoshis per byte (optional, will fetch current rate if not provided)
}

export interface UTXO {
  txId: string; // Transaction ID
  vout: number; // Output index
  value: number; // Value in satoshis
  script?: string; // Output script (hex)
}

export interface InscriptionData {
  message: string; // Data to inscribe (will be truncated to 80 bytes)
  arweaveTxId?: string; // Optional Arweave TX ID reference
  ipfsCid?: string; // Optional IPFS CID reference
  metadata?: Record<string, string>; // Additional metadata (encoded as JSON)
}

export interface InscriptionResult {
  txId: string; // Bitcoin transaction ID
  txHex: string; // Raw transaction hex
  inscribedData: string; // The actual data inscribed (may be truncated)
  dataSize: number; // Size of inscribed data in bytes
  explorerUrl: string; // Block explorer URL
  cost: {
    feeSats: number;
    feeRate: number; // sats/vB
    totalInputSats: number;
    changeSats: number;
  };
  confirmed: boolean;
}

export class BitcoinOpReturnInscriber {
  private network: bitcoin.Network;
  private config: BitcoinInscriptionConfig;
  private apiBaseUrl: string;

  constructor(config: BitcoinInscriptionConfig = {}) {
    this.config = {
      network: config.network || 'testnet',
      apiProvider: config.apiProvider || 'blockstream',
      ...config,
    };

    this.network = this.config.network === 'mainnet' 
      ? bitcoin.networks.bitcoin 
      : bitcoin.networks.testnet;

    // Set API base URL based on provider
    if (this.config.apiProvider === 'custom' && this.config.customApiUrl) {
      this.apiBaseUrl = this.config.customApiUrl;
    } else if (this.config.apiProvider === 'mempool') {
      this.apiBaseUrl = this.config.network === 'mainnet'
        ? 'https://mempool.space/api'
        : 'https://mempool.space/testnet/api';
    } else {
      // Default to Blockstream
      this.apiBaseUrl = this.config.network === 'mainnet'
        ? 'https://blockstream.info/api'
        : 'https://blockstream.info/testnet/api';
    }
  }

  /**
   * Prepare inscription data with proper encoding
   */
  private prepareInscriptionData(data: InscriptionData): Buffer {
    let finalMessage = data.message;

    // Add references if provided
    if (data.arweaveTxId) {
      finalMessage += `|AR:${data.arweaveTxId}`;
    }
    if (data.ipfsCid) {
      finalMessage += `|IPFS:${data.ipfsCid}`;
    }
    if (data.metadata) {
      finalMessage += `|META:${JSON.stringify(data.metadata)}`;
    }

    const buffer = Buffer.from(finalMessage, 'utf8');
    
    // Bitcoin standard OP_RETURN limit is 80 bytes
    // Some nodes accept 83 bytes, but we'll stick to 80 for compatibility
    if (buffer.length > 80) {
      console.warn(`Data exceeds 80 bytes (${buffer.length} bytes). Truncating...`);
      return buffer.slice(0, 80);
    }

    return buffer;
  }

  /**
   * Get current recommended fee rate
   */
  private async getFeeRate(): Promise<number> {
    if (this.config.feeRate) {
      return this.config.feeRate;
    }

    try {
      const response = await axios.get(`${this.apiBaseUrl}/fee-estimates`);
      // Use the fee for confirmation in ~3 blocks (medium priority)
      return Math.ceil(response.data['3'] || response.data['6'] || 5);
    } catch (error) {
      console.warn('Failed to fetch fee rate, using default of 5 sat/vB');
      return 5; // Fallback fee rate
    }
  }

  /**
   * Fetch UTXOs for an address
   */
  async getUtxos(address: string): Promise<UTXO[]> {
    try {
      const response = await axios.get(`${this.apiBaseUrl}/address/${address}/utxo`);
      return response.data.map((utxo: any) => ({
        txId: utxo.txid,
        vout: utxo.vout,
        value: utxo.value,
        script: utxo.scriptpubkey,
      }));
    } catch (error: any) {
      throw new Error(`Failed to fetch UTXOs: ${error.message}`);
    }
  }

  /**
   * Estimate transaction size in virtual bytes
   */
  private estimateTxSize(inputCount: number, outputCount: number, hasOpReturn: boolean): number {
    // Base size + inputs + outputs
    // P2WPKH input: ~68 vB, Output: ~31 vB, OP_RETURN output: ~13 + data bytes
    const baseSize = 10.5; // Version, locktime, etc.
    const inputSize = inputCount * 68;
    const outputSize = outputCount * 31;
    const opReturnSize = hasOpReturn ? 13 : 0;
    
    return Math.ceil(baseSize + inputSize + outputSize + opReturnSize);
  }

  /**
   * Create and broadcast Bitcoin OP_RETURN inscription
   */
  async inscribe(
    privateKeyWIF: string,
    data: InscriptionData,
    utxos?: UTXO[]
  ): Promise<InscriptionResult> {
    console.log('Starting Bitcoin OP_RETURN inscription...');

    // Parse private key
    const keyPair = bitcoin.ECPair.fromWIF(privateKeyWIF, this.network);
    const payment = bitcoin.payments.p2wpkh({ 
      pubkey: keyPair.publicKey, 
      network: this.network 
    });

    if (!payment.address) {
      throw new Error('Failed to derive address from private key');
    }

    // Get UTXOs if not provided
    if (!utxos || utxos.length === 0) {
      console.log('Fetching UTXOs...');
      utxos = await this.getUtxos(payment.address);
      if (utxos.length === 0) {
        throw new Error('No UTXOs available for this address');
      }
    }

    // Get fee rate
    const feeRate = await this.getFeeRate();
    console.log(`Using fee rate: ${feeRate} sat/vB`);

    // Prepare inscription data
    const dataBuffer = this.prepareInscriptionData(data);
    console.log(`Inscription data size: ${dataBuffer.length} bytes`);

    // Create PSBT
    const psbt = new bitcoin.Psbt({ network: this.network });

    // Calculate total input value
    let totalInputValue = 0;
    for (const utxo of utxos) {
      psbt.addInput({
        hash: utxo.txId,
        index: utxo.vout,
        witnessUtxo: {
          script: payment.output!,
          value: utxo.value,
        },
      });
      totalInputValue += utxo.value;
    }

    // Add OP_RETURN output
    const embed = bitcoin.payments.embed({ data: [dataBuffer] });
    psbt.addOutput({
      script: embed.output!,
      value: 0,
    });

    // Estimate fee
    const estimatedSize = this.estimateTxSize(utxos.length, 2, true);
    const estimatedFee = Math.ceil(estimatedSize * feeRate);
    
    // Calculate change
    const changeValue = totalInputValue - estimatedFee;
    
    if (changeValue < 546) {
      // Dust limit - need more UTXOs or higher value UTXO
      throw new Error(`Insufficient funds. Total input: ${totalInputValue} sats, Fee: ${estimatedFee} sats. Need at least ${estimatedFee + 546} sats.`);
    }

    // Add change output
    psbt.addOutput({
      address: payment.address,
      value: changeValue,
    });

    console.log(`Fee: ${estimatedFee} sats, Change: ${changeValue} sats`);

    // Sign all inputs
    psbt.signAllInputs(keyPair);
    psbt.finalizeAllInputs();

    // Extract transaction
    const tx = psbt.extractTransaction();
    const txHex = tx.toHex();
    const txId = tx.getId();

    console.log(`Transaction created: ${txId}`);

    // Broadcast transaction
    console.log('Broadcasting transaction...');
    await this.broadcastTransaction(txHex);
    console.log('Transaction broadcast successfully!');

    const explorerBase = this.config.network === 'mainnet'
      ? 'https://mempool.space/tx'
      : 'https://mempool.space/testnet/tx';

    return {
      txId,
      txHex,
      inscribedData: dataBuffer.toString('utf8'),
      dataSize: dataBuffer.length,
      explorerUrl: `${explorerBase}/${txId}`,
      cost: {
        feeSats: estimatedFee,
        feeRate,
        totalInputSats: totalInputValue,
        changeSats: changeValue,
      },
      confirmed: false,
    };
  }

  /**
   * Inscribe with reference to Arweave transaction
   */
  async inscribeArweaveReference(
    privateKeyWIF: string,
    arweaveTxId: string,
    message: string = 'Arweave NFT',
    metadata?: Record<string, string>
  ): Promise<InscriptionResult> {
    return this.inscribe(privateKeyWIF, {
      message,
      arweaveTxId,
      metadata,
    });
  }

  /**
   * Inscribe with reference to IPFS content
   */
  async inscribeIpfsReference(
    privateKeyWIF: string,
    ipfsCid: string,
    message: string = 'IPFS NFT',
    metadata?: Record<string, string>
  ): Promise<InscriptionResult> {
    return this.inscribe(privateKeyWIF, {
      message,
      ipfsCid,
      metadata,
    });
  }

  /**
   * Broadcast raw transaction
   */
  private async broadcastTransaction(txHex: string): Promise<string> {
    try {
      const response = await axios.post(`${this.apiBaseUrl}/tx`, txHex, {
        headers: { 'Content-Type': 'text/plain' },
      });
      return response.data;
    } catch (error: any) {
      const errorMsg = error.response?.data || error.message;
      throw new Error(`Failed to broadcast transaction: ${errorMsg}`);
    }
  }

  /**
   * Check transaction confirmation status
   */
  async checkTransactionStatus(txId: string): Promise<{
    confirmed: boolean;
    confirmations: number;
    blockHeight?: number;
    blockTime?: number;
  }> {
    try {
      const response = await axios.get(`${this.apiBaseUrl}/tx/${txId}/status`);
      return {
        confirmed: response.data.confirmed,
        confirmations: response.data.confirmations || 0,
        blockHeight: response.data.block_height,
        blockTime: response.data.block_time,
      };
    } catch (error: any) {
      throw new Error(`Failed to get transaction status: ${error.message}`);
    }
  }

  /**
   * Get transaction details
   */
  async getTransaction(txId: string): Promise<any> {
    try {
      const response = await axios.get(`${this.apiBaseUrl}/tx/${txId}`);
      return response.data;
    } catch (error: any) {
      throw new Error(`Failed to get transaction: ${error.message}`);
    }
  }

  /**
   * Extract OP_RETURN data from transaction
   */
  async getOpReturnData(txId: string): Promise<string | null> {
    try {
      const tx = await this.getTransaction(txId);
      
      // Look for OP_RETURN output
      for (const vout of tx.vout) {
        if (vout.scriptpubkey_type === 'op_return' && vout.scriptpubkey_asm) {
          // Extract data after OP_RETURN opcode
          const asmParts = vout.scriptpubkey_asm.split(' ');
          if (asmParts.length > 1 && asmParts[0] === 'OP_RETURN') {
            const dataHex = asmParts[1];
            return Buffer.from(dataHex, 'hex').toString('utf8');
          }
        }
      }
      return null;
    } catch (error: any) {
      throw new Error(`Failed to extract OP_RETURN data: ${error.message}`);
    }
  }

  /**
   * Check address balance
   */
  async checkBalance(address: string): Promise<{
    address: string;
    balanceSats: number;
    balanceBTC: string;
    utxoCount: number;
  }> {
    try {
      const utxos = await this.getUtxos(address);
      const balanceSats = utxos.reduce((sum, utxo) => sum + utxo.value, 0);
      const balanceBTC = (balanceSats / 100000000).toFixed(8);

      return {
        address,
        balanceSats,
        balanceBTC,
        utxoCount: utxos.length,
      };
    } catch (error: any) {
      throw new Error(`Failed to check balance: ${error.message}`);
    }
  }

  /**
   * Estimate cost for inscription
   */
  async estimateCost(dataSize: number, utxoCount: number = 1): Promise<{
    feeSats: number;
    feeRate: number;
    estimatedSize: number;
  }> {
    const feeRate = await this.getFeeRate();
    const estimatedSize = this.estimateTxSize(utxoCount, 2, true);
    const feeSats = Math.ceil(estimatedSize * feeRate);

    return {
      feeSats,
      feeRate,
      estimatedSize,
    };
  }

  /**
   * Get address from WIF private key
   */
  getAddressFromWIF(privateKeyWIF: string): string {
    const keyPair = bitcoin.ECPair.fromWIF(privateKeyWIF, this.network);
    const payment = bitcoin.payments.p2wpkh({ 
      pubkey: keyPair.publicKey, 
      network: this.network 
    });
    
    if (!payment.address) {
      throw new Error('Failed to derive address from private key');
    }
    
    return payment.address;
  }
}

/**
 * USAGE EXAMPLES:
 * 
 * // Basic OP_RETURN inscription
 * import { BitcoinOpReturnInscriber } from './AR.Arweave.inscription.bitcoin.opReturn';
 * 
 * const inscriber = new BitcoinOpReturnInscriber({
 *   network: 'testnet',
 *   apiProvider: 'blockstream',
 * });
 * 
 * const privateKey = 'your-WIF-private-key';
 * 
 * // Check balance first
 * const address = inscriber.getAddressFromWIF(privateKey);
 * const balance = await inscriber.checkBalance(address);
 * console.log(`Balance: ${balance.balanceBTC} BTC (${balance.balanceSats} sats)`);
 * 
 * // Estimate cost
 * const cost = await inscriber.estimateCost(50, 1);
 * console.log(`Estimated fee: ${cost.feeSats} sats at ${cost.feeRate} sat/vB`);
 * 
 * // Inscribe data
 * const result = await inscriber.inscribe(
 *   privateKey,
 *   {
 *     message: 'My first Bitcoin inscription',
 *     metadata: {
 *       type: 'nft',
 *       collection: 'Test Collection',
 *     },
 *   }
 * );
 * 
 * console.log('Inscription successful!');
 * console.log('TX ID:', result.txId);
 * console.log('Explorer:', result.explorerUrl);
 * console.log('Inscribed data:', result.inscribedData);
 * console.log('Fee paid:', result.cost.feeSats, 'sats');
 * 
 * // Wait for confirmation
 * await new Promise(resolve => setTimeout(resolve, 60000)); // Wait 1 minute
 * const status = await inscriber.checkTransactionStatus(result.txId);
 * console.log('Confirmed:', status.confirmed);
 * console.log('Confirmations:', status.confirmations);
 * 
 * // Inscribe reference to Arweave NFT
 * const arweaveResult = await inscriber.inscribeArweaveReference(
 *   privateKey,
 *   'arweave-tx-id-here',
 *   'NFT Collection #1',
 *   { artist: 'Artist Name', rarity: 'Legendary' }
 * );
 * 
 * console.log('Arweave reference inscribed:', arweaveResult.txId);
 * 
 * // Inscribe IPFS reference
 * const ipfsResult = await inscriber.inscribeIpfsReference(
 *   privateKey,
 *   'QmXxxx...', // IPFS CID
 *   'IPFS NFT',
 *   { format: 'image/png' }
 * );
 * 
 * // Read OP_RETURN data from transaction
 * const opReturnData = await inscriber.getOpReturnData(result.txId);
 * console.log('OP_RETURN data:', opReturnData);
 * 
 * // Cross-chain anchoring: Arweave -> Bitcoin
 * // 1. Upload to Arweave
 * const arweaveTxId = 'uploaded-arweave-tx-id';
 * 
 * // 2. Anchor on Bitcoin
 * const anchor = await inscriber.inscribeArweaveReference(
 *   privateKey,
 *   arweaveTxId,
 *   'Permanent NFT',
 *   { storage: 'arweave', timestamp: new Date().toISOString() }
 * );
 * 
 * console.log('Cross-chain anchor created!');
 * console.log('Arweave TX:', arweaveTxId);
 * console.log('Bitcoin TX:', anchor.txId);
 * console.log('This NFT is now anchored on both blockchains!');
 */

export default BitcoinOpReturnInscriber;

