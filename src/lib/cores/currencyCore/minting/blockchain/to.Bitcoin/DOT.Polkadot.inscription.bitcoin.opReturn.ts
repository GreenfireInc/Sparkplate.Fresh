// Bitcoin OP_RETURN Inscription for Polkadot
// Inscribes Polkadot blockchain data/references to Bitcoin blockchain using OP_RETURN

/**
 * OVERVIEW:
 * 
 * This module inscribes Polkadot data to Bitcoin using OP_RETURN outputs.
 * - Embed up to 80 bytes (standard) of arbitrary data on-chain
 * - Anchor Polkadot extrinsics on Bitcoin blockchain
 * - Reference Polkadot parachains
 * - Reference Polkadot assets (from asset pallets)
 * - Reference NFT collections and items
 * - Reference ink! smart contracts
 * - Reference validators (stash addresses)
 * - Cross-chain proof of existence
 * 
 * BENEFITS:
 * - Dual-blockchain immutability (Polkadot + Bitcoin)
 * - Bitcoin's security for Polkadot data
 * - Timestamped by Bitcoin blockchain
 * - Proof of parachain operations on Bitcoin
 * - Cross-chain verification for DOT assets
 * 
 * COSTS:
 * - Transaction fee: Variable based on network congestion (~500-5000 sats)
 * - No ongoing storage costs
 * - OP_RETURN output has 0 value
 * 
 * USE CASES:
 * - Anchor Polkadot NFT mints on Bitcoin
 * - Cross-chain proof of parachain registration
 * - Timestamp ink! contract deployments
 * - Verify asset transfers on Bitcoin
 * - Dual-chain verification for Polkadot transactions
 * - Bridge anchoring between Polkadot and Bitcoin
 * - XCM (Cross-Consensus Message) proof on Bitcoin
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

export interface PolkadotInscriptionData {
  message: string; // Data to inscribe (will be truncated to 80 bytes)
  dotTxHash?: string; // Polkadot extrinsic hash
  parachainId?: string; // Parachain ID (e.g., "1000" for Statemint)
  assetId?: string; // Asset ID from asset pallet
  collectionId?: string; // NFT collection ID
  itemId?: string; // NFT item ID within collection
  contractAddress?: string; // ink! or EVM contract address
  validatorAddress?: string; // Validator stash address
  dotAddress?: string; // Polkadot SS58 address
  xcmData?: string; // XCM (Cross-Consensus Message) reference
  metadata?: Record<string, string>; // Additional metadata (encoded as JSON)
}

export interface InscriptionResult {
  txId: string; // Bitcoin transaction ID
  txHex: string; // Raw transaction hex
  inscribedData: string; // The actual data inscribed (may be truncated)
  dataSize: number; // Size of inscribed data in bytes
  explorerUrl: string; // Block explorer URL
  dotExplorerUrl?: string; // Polkadot explorer URL if applicable
  cost: {
    feeSats: number;
    feeRate: number; // sats/vB
    totalInputSats: number;
    changeSats: number;
  };
  confirmed: boolean;
}

export class PolkadotBitcoinOpReturnInscriber {
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
   * Prepare inscription data with Polkadot references
   */
  private prepareInscriptionData(data: PolkadotInscriptionData): Buffer {
    let finalMessage = data.message;

    // Add Polkadot references if provided
    if (data.dotTxHash) {
      finalMessage += `|DOT_TX:${data.dotTxHash}`;
    }
    if (data.parachainId) {
      finalMessage += `|DOT_PARA:${data.parachainId}`;
    }
    if (data.assetId) {
      finalMessage += `|DOT_ASSET:${data.assetId}`;
    }
    if (data.collectionId) {
      finalMessage += `|DOT_NFT_COL:${data.collectionId}`;
    }
    if (data.itemId) {
      finalMessage += `|DOT_NFT_ITEM:${data.itemId}`;
    }
    if (data.contractAddress) {
      finalMessage += `|DOT_CONTRACT:${data.contractAddress}`;
    }
    if (data.validatorAddress) {
      finalMessage += `|DOT_VAL:${data.validatorAddress}`;
    }
    if (data.dotAddress) {
      finalMessage += `|DOT_ADDR:${data.dotAddress}`;
    }
    if (data.xcmData) {
      finalMessage += `|XCM:${data.xcmData}`;
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
   * Get Polkadot explorer URL
   */
  private getPolkadotExplorerUrl(
    txHash?: string,
    parachainId?: string,
    assetId?: string,
    collectionId?: string,
    itemId?: string,
    address?: string,
    validatorAddress?: string,
    contractAddress?: string,
    network: 'polkadot' | 'kusama' | 'westend' = 'polkadot'
  ): string | undefined {
    // Using Subscan as default explorer
    const explorerBase = network === 'polkadot' 
      ? 'https://polkadot.subscan.io' 
      : network === 'kusama'
      ? 'https://kusama.subscan.io'
      : 'https://westend.subscan.io';

    if (txHash) {
      return `${explorerBase}/extrinsic/${txHash}`;
    }
    if (parachainId) {
      return `${explorerBase}/parachain/${parachainId}`;
    }
    if (assetId) {
      return `${explorerBase}/asset/${assetId}`;
    }
    if (collectionId && itemId) {
      return `${explorerBase}/nft/${collectionId}/${itemId}`;
    }
    if (collectionId) {
      return `${explorerBase}/nft_collection/${collectionId}`;
    }
    if (validatorAddress) {
      return `${explorerBase}/validator/${validatorAddress}`;
    }
    if (contractAddress) {
      return `${explorerBase}/account/${contractAddress}`;
    }
    if (address) {
      return `${explorerBase}/account/${address}`;
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
   * Create and broadcast Bitcoin OP_RETURN inscription with Polkadot data
   */
  async inscribe(
    privateKeyWIF: string,
    data: PolkadotInscriptionData,
    dotNetwork: 'polkadot' | 'kusama' | 'westend' = 'polkadot',
    utxos?: UTXO[]
  ): Promise<InscriptionResult> {
    console.log('Starting Polkadot → Bitcoin OP_RETURN inscription...');

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

    // Get Polkadot explorer URL
    const dotExplorerUrl = this.getPolkadotExplorerUrl(
      data.dotTxHash,
      data.parachainId,
      data.assetId,
      data.collectionId,
      data.itemId,
      data.dotAddress,
      data.validatorAddress,
      data.contractAddress,
      dotNetwork
    );

    return {
      txId,
      txHex,
      inscribedData: dataBuffer.toString('utf8'),
      dataSize: dataBuffer.length,
      explorerUrl: `${explorerBase}/${txId}`,
      dotExplorerUrl,
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
   * Inscribe Polkadot transaction reference (extrinsic)
   */
  async inscribePolkadotTransaction(
    privateKeyWIF: string,
    dotTxHash: string,
    message: string = 'DOT TX',
    dotNetwork: 'polkadot' | 'kusama' | 'westend' = 'polkadot',
    metadata?: Record<string, string>
  ): Promise<InscriptionResult> {
    return this.inscribe(
      privateKeyWIF,
      {
        message,
        dotTxHash,
        metadata,
      },
      dotNetwork
    );
  }

  /**
   * Inscribe Polkadot parachain reference
   */
  async inscribePolkadotParachain(
    privateKeyWIF: string,
    parachainId: string,
    parachainName: string,
    message: string = 'DOT Parachain',
    dotNetwork: 'polkadot' | 'kusama' | 'westend' = 'polkadot',
    metadata?: Record<string, string>
  ): Promise<InscriptionResult> {
    return this.inscribe(
      privateKeyWIF,
      {
        message,
        parachainId,
        metadata: {
          ...metadata,
          name: parachainName,
          type: 'parachain',
        },
      },
      dotNetwork
    );
  }

  /**
   * Inscribe Polkadot asset reference
   */
  async inscribePolkadotAsset(
    privateKeyWIF: string,
    assetId: string,
    message: string = 'DOT Asset',
    dotNetwork: 'polkadot' | 'kusama' | 'westend' = 'polkadot',
    metadata?: Record<string, string>
  ): Promise<InscriptionResult> {
    return this.inscribe(
      privateKeyWIF,
      {
        message,
        assetId,
        metadata: {
          ...metadata,
          type: 'asset',
        },
      },
      dotNetwork
    );
  }

  /**
   * Inscribe Polkadot NFT reference
   */
  async inscribePolkadotNFT(
    privateKeyWIF: string,
    collectionId: string,
    itemId: string,
    dotTxHash: string,
    message: string = 'DOT NFT',
    dotNetwork: 'polkadot' | 'kusama' | 'westend' = 'polkadot',
    metadata?: Record<string, string>
  ): Promise<InscriptionResult> {
    return this.inscribe(
      privateKeyWIF,
      {
        message,
        collectionId,
        itemId,
        dotTxHash,
        metadata: {
          ...metadata,
          type: 'nft',
          standard: 'Polkadot NFT Pallet',
        },
      },
      dotNetwork
    );
  }

  /**
   * Inscribe RMRK NFT reference (advanced NFT standard on Kusama/Polkadot)
   */
  async inscribeRMRKNFT(
    privateKeyWIF: string,
    collectionId: string,
    itemId: string,
    message: string = 'RMRK NFT',
    dotNetwork: 'polkadot' | 'kusama' | 'westend' = 'kusama',
    metadata?: Record<string, string>
  ): Promise<InscriptionResult> {
    return this.inscribe(
      privateKeyWIF,
      {
        message,
        collectionId,
        itemId,
        metadata: {
          ...metadata,
          type: 'nft',
          standard: 'RMRK',
        },
      },
      dotNetwork
    );
  }

  /**
   * Inscribe ink! smart contract reference
   */
  async inscribePolkadotContract(
    privateKeyWIF: string,
    contractAddress: string,
    message: string = 'ink! Contract',
    dotNetwork: 'polkadot' | 'kusama' | 'westend' = 'polkadot',
    metadata?: Record<string, string>
  ): Promise<InscriptionResult> {
    return this.inscribe(
      privateKeyWIF,
      {
        message,
        contractAddress,
        metadata: {
          ...metadata,
          type: 'contract',
          language: 'ink!',
        },
      },
      dotNetwork
    );
  }

  /**
   * Inscribe Polkadot validator reference
   */
  async inscribePolkadotValidator(
    privateKeyWIF: string,
    validatorAddress: string,
    message: string = 'DOT Validator',
    dotNetwork: 'polkadot' | 'kusama' | 'westend' = 'polkadot',
    metadata?: Record<string, string>
  ): Promise<InscriptionResult> {
    return this.inscribe(
      privateKeyWIF,
      {
        message,
        validatorAddress,
        metadata: {
          ...metadata,
          type: 'validator',
        },
      },
      dotNetwork
    );
  }

  /**
   * Inscribe XCM (Cross-Consensus Message) reference
   */
  async inscribeXCMMessage(
    privateKeyWIF: string,
    xcmData: string,
    sourceParachainId: string,
    destParachainId: string,
    message: string = 'XCM Transfer',
    dotNetwork: 'polkadot' | 'kusama' | 'westend' = 'polkadot',
    metadata?: Record<string, string>
  ): Promise<InscriptionResult> {
    return this.inscribe(
      privateKeyWIF,
      {
        message,
        xcmData,
        metadata: {
          ...metadata,
          type: 'xcm',
          source: sourceParachainId,
          dest: destParachainId,
        },
      },
      dotNetwork
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
   * Parse Polkadot data from OP_RETURN
   */
  parsePolkadotData(opReturnData: string): {
    message: string;
    dotTxHash?: string;
    parachainId?: string;
    assetId?: string;
    collectionId?: string;
    itemId?: string;
    contractAddress?: string;
    validatorAddress?: string;
    dotAddress?: string;
    xcmData?: string;
    metadata?: Record<string, string>;
  } {
    const parts = opReturnData.split('|');
    const result: any = { message: parts[0] };

    for (let i = 1; i < parts.length; i++) {
      const part = parts[i];
      if (part.startsWith('DOT_TX:')) {
        result.dotTxHash = part.substring(7);
      } else if (part.startsWith('DOT_PARA:')) {
        result.parachainId = part.substring(9);
      } else if (part.startsWith('DOT_ASSET:')) {
        result.assetId = part.substring(10);
      } else if (part.startsWith('DOT_NFT_COL:')) {
        result.collectionId = part.substring(12);
      } else if (part.startsWith('DOT_NFT_ITEM:')) {
        result.itemId = part.substring(13);
      } else if (part.startsWith('DOT_CONTRACT:')) {
        result.contractAddress = part.substring(13);
      } else if (part.startsWith('DOT_VAL:')) {
        result.validatorAddress = part.substring(8);
      } else if (part.startsWith('DOT_ADDR:')) {
        result.dotAddress = part.substring(9);
      } else if (part.startsWith('XCM:')) {
        result.xcmData = part.substring(4);
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
 * import { PolkadotBitcoinOpReturnInscriber } from './DOT.Polkadot.inscription.bitcoin.opReturn';
 * 
 * const inscriber = new PolkadotBitcoinOpReturnInscriber({
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
 * // 1. Inscribe Polkadot Transaction (Extrinsic)
 * const txResult = await inscriber.inscribePolkadotTransaction(
 *   privateKey,
 *   '0xEXTRINSIC_HASH_HERE',
 *   'DOT Transfer',
 *   'polkadot',
 *   { amount: '10 DOT', type: 'transfer', module: 'balances' }
 * );
 * console.log('Polkadot TX anchored on Bitcoin:', txResult.txId);
 * console.log('View on Bitcoin:', txResult.explorerUrl);
 * console.log('View on Subscan:', txResult.dotExplorerUrl);
 * 
 * // 2. Inscribe Parachain Registration
 * const parachainResult = await inscriber.inscribePolkadotParachain(
 *   privateKey,
 *   '2000', // Acala parachain ID
 *   'Acala',
 *   'Parachain: Acala',
 *   'polkadot',
 *   { type: 'DeFi', category: 'parachain', launch: '2021-12-18' }
 * );
 * console.log('Parachain anchored:', parachainResult.txId);
 * 
 * // 3. Inscribe Polkadot Asset
 * const assetResult = await inscriber.inscribePolkadotAsset(
 *   privateKey,
 *   '1337', // Asset ID
 *   'DOT Asset #1337',
 *   'polkadot',
 *   { name: 'MyToken', symbol: 'MTK', decimals: '10' }
 * );
 * console.log('Asset anchored:', assetResult.txId);
 * 
 * // 4. Inscribe Polkadot NFT
 * const nftResult = await inscriber.inscribePolkadotNFT(
 *   privateKey,
 *   '100', // Collection ID
 *   '42', // Item ID
 *   '0xMINT_TX_HASH',
 *   'Polkadot NFT #42',
 *   'polkadot',
 *   { 
 *     collection: 'Art Collection',
 *     artist: 'Digital Artist',
 *     rarity: 'rare'
 *   }
 * );
 * console.log('Polkadot NFT anchored on Bitcoin!');
 * console.log('Bitcoin TX:', nftResult.txId);
 * console.log('View NFT on Subscan:', nftResult.dotExplorerUrl);
 * 
 * // 5. Inscribe RMRK NFT (Kusama advanced NFT standard)
 * const rmrkResult = await inscriber.inscribeRMRKNFT(
 *   privateKey,
 *   'COLLECTION_ID',
 *   'NFT_ID',
 *   'RMRK 2.0 NFT',
 *   'kusama',
 *   { version: '2.0.0', type: 'composable', nested: 'true' }
 * );
 * console.log('RMRK NFT anchored:', rmrkResult.txId);
 * 
 * // 6. Inscribe ink! Smart Contract
 * const contractResult = await inscriber.inscribePolkadotContract(
 *   privateKey,
 *   '5CONTRACT_ADDRESS_HERE',
 *   'DeFi Contract',
 *   'polkadot',
 *   { type: 'DEX', language: 'ink!', version: '4.0', deployed: new Date().toISOString() }
 * );
 * console.log('Contract anchored:', contractResult.txId);
 * 
 * // 7. Inscribe Validator
 * const validatorResult = await inscriber.inscribePolkadotValidator(
 *   privateKey,
 *   '5VALIDATOR_STASH_ADDRESS',
 *   'Validator: MyNode',
 *   'polkadot',
 *   { commission: '5%', identity: 'MyNode', verified: 'true' }
 * );
 * console.log('Validator anchored:', validatorResult.txId);
 * 
 * // 8. Inscribe XCM Cross-Chain Message
 * const xcmResult = await inscriber.inscribeXCMMessage(
 *   privateKey,
 *   '0xXCM_MESSAGE_HASH',
 *   '0', // Relay chain
 *   '2000', // Acala parachain
 *   'XCM: DOT → Acala',
 *   'polkadot',
 *   { amount: '100 DOT', asset: 'DOT', type: 'teleport' }
 * );
 * console.log('XCM message anchored:', xcmResult.txId);
 * 
 * // 9. Read and parse inscribed data
 * const opReturnData = await inscriber.getOpReturnData(nftResult.txId);
 * console.log('Raw OP_RETURN data:', opReturnData);
 * 
 * if (opReturnData) {
 *   const parsed = inscriber.parsePolkadotData(opReturnData);
 *   console.log('Parsed Polkadot data:', parsed);
 *   console.log('Collection ID:', parsed.collectionId);
 *   console.log('Item ID:', parsed.itemId);
 *   console.log('Metadata:', parsed.metadata);
 * }
 * 
 * // 10. Cross-chain workflow: Polkadot NFT → Bitcoin
 * // Step 1: Mint NFT on Polkadot (using Polkadot.js API)
 * const collectionId = '100';
 * const itemId = '42';
 * const mintTxHash = '0xMINT_EXTRINSIC_HASH';
 * 
 * // Step 2: Anchor on Bitcoin
 * const anchor = await inscriber.inscribePolkadotNFT(
 *   privateKey,
 *   collectionId,
 *   itemId,
 *   mintTxHash,
 *   'Polkadot Generative Art #42',
 *   'polkadot',
 *   {
 *     artist: 'CryptoArtist',
 *     collection: 'Generative Series',
 *     rarity: 'legendary',
 *     edition: '1/1',
 *     crosschain: 'true'
 *   }
 * );
 * 
 * console.log('🎉 NFT anchored on Bitcoin!');
 * console.log('Polkadot:', anchor.dotExplorerUrl);
 * console.log('Bitcoin:', anchor.explorerUrl);
 * console.log('This NFT is now provably anchored on both blockchains!');
 * 
 * // 11. Parachain Crowdloan Proof
 * const crowdloanProof = await inscriber.inscribePolkadotParachain(
 *   privateKey,
 *   '2030', // Bifrost parachain
 *   'Bifrost',
 *   'Crowdloan: Bifrost',
 *   'polkadot',
 *   {
 *     raised: '15000000 DOT',
 *     contributors: '50000',
 *     start: '2021-11-01',
 *     end: '2021-12-17',
 *     won: 'true'
 *   }
 * );
 * 
 * console.log('Crowdloan anchored on Bitcoin!');
 * console.log('Immutable proof of crowdloan success!');
 * 
 * // 12. Multi-chain Bridge Proof (Polkadot → Moonbeam → Bitcoin)
 * const bridgeProof = await inscriber.inscribeXCMMessage(
 *   privateKey,
 *   '0xXCM_HASH',
 *   '0', // Polkadot Relay
 *   '2004', // Moonbeam
 *   'Bridge: DOT → GLMR',
 *   'polkadot',
 *   {
 *     amount: '500 DOT',
 *     destination: 'Moonbeam',
 *     evm_address: '0xEVM_ADDRESS',
 *     type: 'reserve_transfer'
 *   }
 * );
 * 
 * console.log('Bridge transaction anchored on Bitcoin!');
 * console.log('Three-chain proof: Polkadot → Moonbeam → Bitcoin!');
 */

export default PolkadotBitcoinOpReturnInscriber;

