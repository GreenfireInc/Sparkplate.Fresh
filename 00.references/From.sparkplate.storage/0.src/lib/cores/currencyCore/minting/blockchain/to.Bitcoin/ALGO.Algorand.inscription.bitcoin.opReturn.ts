// Bitcoin OP_RETURN Inscription for Algorand
// Inscribes Algorand data/references to Bitcoin blockchain using OP_RETURN

/**
 * OVERVIEW:
 * 
 * This module inscribes Algorand blockchain data to Bitcoin using OP_RETURN outputs.
 * - Embed up to 80 bytes (standard) of arbitrary data on-chain
 * - Anchor Algorand transactions on Bitcoin blockchain
 * - Reference Algorand assets (ASAs) on Bitcoin
 * - Reference Algorand applications (smart contracts) on Bitcoin
 * - Cross-chain proof of existence
 * 
 * BENEFITS:
 * - Dual-blockchain immutability (Algorand + Bitcoin)
 * - Bitcoin's security for Algorand data
 * - Timestamped by Bitcoin blockchain
 * - Immutable cross-chain references
 * - Proof of Algorand asset/transaction existence on Bitcoin
 * 
 * COSTS:
 * - Transaction fee: Variable based on network congestion (~500-5000 sats)
 * - No ongoing storage costs
 * - OP_RETURN output has 0 value
 * 
 * USE CASES:
 * - Anchor Algorand NFT mints on Bitcoin
 * - Cross-chain proof of Algorand ASA creation
 * - Timestamp Algorand smart contract deployments
 * - Dual-chain verification for Algorand transactions
 * - Algorand → Bitcoin bridging references
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

export interface AlgorandInscriptionData {
  message: string; // Data to inscribe (will be truncated to 80 bytes)
  algorandTxId?: string; // Algorand transaction ID
  algorandAssetId?: number; // Algorand Standard Asset (ASA) ID
  algorandAppId?: number; // Algorand Application (smart contract) ID
  algorandAddress?: string; // Algorand address
  metadata?: Record<string, string>; // Additional metadata (encoded as JSON)
}

export interface InscriptionResult {
  txId: string; // Bitcoin transaction ID
  txHex: string; // Raw transaction hex
  inscribedData: string; // The actual data inscribed (may be truncated)
  dataSize: number; // Size of inscribed data in bytes
  explorerUrl: string; // Block explorer URL
  algorandExplorerUrl?: string; // Algorand explorer URL if applicable
  cost: {
    feeSats: number;
    feeRate: number; // sats/vB
    totalInputSats: number;
    changeSats: number;
  };
  confirmed: boolean;
}

export class AlgorandBitcoinOpReturnInscriber {
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
   * Prepare inscription data with Algorand references
   */
  private prepareInscriptionData(data: AlgorandInscriptionData): Buffer {
    let finalMessage = data.message;

    // Add Algorand references if provided
    if (data.algorandTxId) {
      finalMessage += `|ALGO_TX:${data.algorandTxId}`;
    }
    if (data.algorandAssetId !== undefined) {
      finalMessage += `|ALGO_ASA:${data.algorandAssetId}`;
    }
    if (data.algorandAppId !== undefined) {
      finalMessage += `|ALGO_APP:${data.algorandAppId}`;
    }
    if (data.algorandAddress) {
      finalMessage += `|ALGO_ADDR:${data.algorandAddress}`;
    }
    if (data.metadata) {
      finalMessage += `|META:${JSON.stringify(data.metadata)}`;
    }

    const buffer = Buffer.from(finalMessage, 'utf8');
    
    // Bitcoin standard OP_RETURN limit is 80 bytes
    if (buffer.length > 80) {
      console.warn(`Data exceeds 80 bytes (${buffer.length} bytes). Truncating...`);
      return buffer.slice(0, 80);
    }

    return buffer;
  }

  /**
   * Get Algorand explorer URL
   */
  private getAlgorandExplorerUrl(txId?: string, assetId?: number, appId?: number, address?: string, network: 'mainnet' | 'testnet' = 'mainnet'): string | undefined {
    const explorerBase = network === 'mainnet' 
      ? 'https://algoexplorer.io' 
      : 'https://testnet.algoexplorer.io';

    if (txId) {
      return `${explorerBase}/tx/${txId}`;
    }
    if (assetId !== undefined) {
      return `${explorerBase}/asset/${assetId}`;
    }
    if (appId !== undefined) {
      return `${explorerBase}/application/${appId}`;
    }
    if (address) {
      return `${explorerBase}/address/${address}`;
    }
    return undefined;
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
      return Math.ceil(response.data['3'] || response.data['6'] || 5);
    } catch (error) {
      console.warn('Failed to fetch fee rate, using default of 5 sat/vB');
      return 5;
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
    const baseSize = 10.5;
    const inputSize = inputCount * 68;
    const outputSize = outputCount * 31;
    const opReturnSize = hasOpReturn ? 13 : 0;
    
    return Math.ceil(baseSize + inputSize + outputSize + opReturnSize);
  }

  /**
   * Create and broadcast Bitcoin OP_RETURN inscription with Algorand data
   */
  async inscribe(
    privateKeyWIF: string,
    data: AlgorandInscriptionData,
    algorandNetwork: 'mainnet' | 'testnet' = 'mainnet',
    utxos?: UTXO[]
  ): Promise<InscriptionResult> {
    console.log('Starting Algorand → Bitcoin OP_RETURN inscription...');

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

    // Get Algorand explorer URL
    const algorandExplorerUrl = this.getAlgorandExplorerUrl(
      data.algorandTxId,
      data.algorandAssetId,
      data.algorandAppId,
      data.algorandAddress,
      algorandNetwork
    );

    return {
      txId,
      txHex,
      inscribedData: dataBuffer.toString('utf8'),
      dataSize: dataBuffer.length,
      explorerUrl: `${explorerBase}/${txId}`,
      algorandExplorerUrl,
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
   * Inscribe Algorand transaction reference
   */
  async inscribeAlgorandTransaction(
    privateKeyWIF: string,
    algorandTxId: string,
    message: string = 'Algorand TX',
    algorandNetwork: 'mainnet' | 'testnet' = 'mainnet',
    metadata?: Record<string, string>
  ): Promise<InscriptionResult> {
    return this.inscribe(
      privateKeyWIF,
      {
        message,
        algorandTxId,
        metadata,
      },
      algorandNetwork
    );
  }

  /**
   * Inscribe Algorand ASA (Asset) reference
   */
  async inscribeAlgorandAsset(
    privateKeyWIF: string,
    algorandAssetId: number,
    message: string = 'Algorand ASA',
    algorandNetwork: 'mainnet' | 'testnet' = 'mainnet',
    metadata?: Record<string, string>
  ): Promise<InscriptionResult> {
    return this.inscribe(
      privateKeyWIF,
      {
        message,
        algorandAssetId,
        metadata,
      },
      algorandNetwork
    );
  }

  /**
   * Inscribe Algorand Application (Smart Contract) reference
   */
  async inscribeAlgorandApplication(
    privateKeyWIF: string,
    algorandAppId: number,
    message: string = 'Algorand App',
    algorandNetwork: 'mainnet' | 'testnet' = 'mainnet',
    metadata?: Record<string, string>
  ): Promise<InscriptionResult> {
    return this.inscribe(
      privateKeyWIF,
      {
        message,
        algorandAppId,
        metadata,
      },
      algorandNetwork
    );
  }

  /**
   * Inscribe Algorand NFT reference (combines transaction and asset)
   */
  async inscribeAlgorandNFT(
    privateKeyWIF: string,
    algorandAssetId: number,
    algorandTxId: string,
    message: string = 'Algorand NFT',
    algorandNetwork: 'mainnet' | 'testnet' = 'mainnet',
    metadata?: Record<string, string>
  ): Promise<InscriptionResult> {
    return this.inscribe(
      privateKeyWIF,
      {
        message,
        algorandAssetId,
        algorandTxId,
        metadata: {
          ...metadata,
          type: 'nft',
          chain: 'algorand',
        },
      },
      algorandNetwork
    );
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
      
      for (const vout of tx.vout) {
        if (vout.scriptpubkey_type === 'op_return' && vout.scriptpubkey_asm) {
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
   * Parse Algorand data from OP_RETURN
   */
  parseAlgorandData(opReturnData: string): {
    message: string;
    algorandTxId?: string;
    algorandAssetId?: number;
    algorandAppId?: number;
    algorandAddress?: string;
    metadata?: Record<string, string>;
  } {
    const parts = opReturnData.split('|');
    const result: any = { message: parts[0] };

    for (let i = 1; i < parts.length; i++) {
      const part = parts[i];
      if (part.startsWith('ALGO_TX:')) {
        result.algorandTxId = part.substring(8);
      } else if (part.startsWith('ALGO_ASA:')) {
        result.algorandAssetId = parseInt(part.substring(9));
      } else if (part.startsWith('ALGO_APP:')) {
        result.algorandAppId = parseInt(part.substring(9));
      } else if (part.startsWith('ALGO_ADDR:')) {
        result.algorandAddress = part.substring(10);
      } else if (part.startsWith('META:')) {
        try {
          result.metadata = JSON.parse(part.substring(5));
        } catch (e) {
          // Ignore parse errors
        }
      }
    }

    return result;
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
 * // Initialize inscriber
 * import { AlgorandBitcoinOpReturnInscriber } from './ALGO.Algorand.inscription.bitcoin.opReturn';
 * 
 * const inscriber = new AlgorandBitcoinOpReturnInscriber({
 *   network: 'testnet',
 *   apiProvider: 'blockstream',
 * });
 * 
 * const privateKey = 'your-WIF-private-key';
 * 
 * // Check balance
 * const address = inscriber.getAddressFromWIF(privateKey);
 * const balance = await inscriber.checkBalance(address);
 * console.log(`Balance: ${balance.balanceBTC} BTC`);
 * 
 * // 1. Inscribe Algorand Transaction
 * const txResult = await inscriber.inscribeAlgorandTransaction(
 *   privateKey,
 *   'ALGORAND_TX_ID_HERE',
 *   'Payment TX',
 *   'mainnet',
 *   { amount: '100', sender: 'ADDR123...' }
 * );
 * console.log('Algorand TX anchored on Bitcoin:', txResult.txId);
 * console.log('View on Bitcoin:', txResult.explorerUrl);
 * console.log('View on Algorand:', txResult.algorandExplorerUrl);
 * 
 * // 2. Inscribe Algorand ASA (Asset)
 * const asaResult = await inscriber.inscribeAlgorandAsset(
 *   privateKey,
 *   123456789, // ASA ID
 *   'My Token',
 *   'mainnet',
 *   { type: 'fungible', supply: '1000000' }
 * );
 * console.log('Algorand ASA anchored:', asaResult.txId);
 * 
 * // 3. Inscribe Algorand NFT
 * const nftResult = await inscriber.inscribeAlgorandNFT(
 *   privateKey,
 *   987654321, // NFT Asset ID
 *   'CREATION_TX_ID', // Mint transaction
 *   'Algorand NFT #1',
 *   'mainnet',
 *   { artist: 'Artist Name', rarity: 'rare' }
 * );
 * console.log('Algorand NFT anchored on Bitcoin!');
 * console.log('Bitcoin TX:', nftResult.txId);
 * console.log('This NFT now has dual-chain proof!');
 * 
 * // 4. Inscribe Algorand Smart Contract
 * const appResult = await inscriber.inscribeAlgorandApplication(
 *   privateKey,
 *   111222333, // App ID
 *   'DeFi Protocol',
 *   'mainnet',
 *   { version: '1.0', deployed: new Date().toISOString() }
 * );
 * console.log('Smart contract deployment anchored:', appResult.txId);
 * 
 * // 5. Read and parse inscribed data
 * const opReturnData = await inscriber.getOpReturnData(txResult.txId);
 * console.log('Raw OP_RETURN data:', opReturnData);
 * 
 * if (opReturnData) {
 *   const parsed = inscriber.parseAlgorandData(opReturnData);
 *   console.log('Parsed Algorand data:', parsed);
 *   console.log('Algorand TX ID:', parsed.algorandTxId);
 *   console.log('Algorand Asset ID:', parsed.algorandAssetId);
 * }
 * 
 * // 6. Cross-chain workflow: Algorand → Bitcoin
 * // Step 1: Create ASA on Algorand
 * const algorandAssetId = 123456789; // From Algorand SDK
 * const algorandTxId = 'ALGO_TX_ID'; // From Algorand SDK
 * 
 * // Step 2: Anchor on Bitcoin
 * const anchor = await inscriber.inscribeAlgorandNFT(
 *   privateKey,
 *   algorandAssetId,
 *   algorandTxId,
 *   'Cross-chain NFT',
 *   'mainnet',
 *   { 
 *     crosschain: 'true',
 *     timestamp: new Date().toISOString(),
 *     storage: 'algorand+bitcoin'
 *   }
 * );
 * 
 * console.log('🎉 Cross-chain anchor created!');
 * console.log('Algorand Asset:', algorandAssetId);
 * console.log('Algorand TX:', txResult.algorandExplorerUrl);
 * console.log('Bitcoin Anchor:', anchor.explorerUrl);
 * console.log('This asset is now provably anchored on both blockchains!');
 */

export default AlgorandBitcoinOpReturnInscriber;

