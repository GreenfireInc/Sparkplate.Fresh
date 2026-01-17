// Bitcoin OP_RETURN Inscription for Waves
// Inscribes Waves blockchain data/references to Bitcoin blockchain using OP_RETURN

/**
 * OVERVIEW:
 * 
 * This module inscribes Waves data to Bitcoin using OP_RETURN outputs.
 * - Embed up to 80 bytes (standard) of arbitrary data on-chain
 * - Anchor Waves transactions on Bitcoin blockchain
 * - Reference Waves native assets (tokens)
 * - Reference Waves NFTs (assets with quantity 1)
 * - Reference Ride smart contracts (dApps)
 * - Reference leasing transactions
 * - Cross-chain proof of existence
 * 
 * BENEFITS:
 * - Dual-blockchain immutability (Waves + Bitcoin)
 * - Bitcoin's security for Waves data
 * - Timestamped by Bitcoin blockchain
 * - Proof of native asset operations on Bitcoin
 * - Cross-chain verification for Ride contracts
 * - Leasing transparency
 * 
 * COSTS:
 * - Transaction fee: Variable based on network congestion (~500-5000 sats)
 * - No ongoing storage costs
 * - OP_RETURN output has 0 value
 * 
 * USE CASES:
 * - Anchor Waves NFT mints on Bitcoin
 * - Cross-chain proof of native asset creation
 * - Timestamp Ride contract deployments
 * - Verify asset transfers on Bitcoin
 * - Dual-chain verification for Waves transactions
 * - Leasing proof for governance
 * - Native asset issuance verification
 * - dApp operation transparency
 * - Community token launch verification
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

export interface WavesInscriptionData {
  message: string; // Data to inscribe (will be truncated to 80 bytes)
  wavesTxId?: string; // Waves transaction ID (base58)
  assetId?: string; // Waves asset ID (base58)
  nftAssetId?: string; // Waves NFT asset ID (quantity 1)
  contractAddress?: string; // Ride dApp contract address
  wavesAddress?: string; // Waves wallet address (base58)
  leaseId?: string; // Lease transaction ID
  blockHeight?: string; // Waves block height
  metadata?: Record<string, string>; // Additional metadata (encoded as JSON)
}

export interface InscriptionResult {
  txId: string; // Bitcoin transaction ID
  txHex: string; // Raw transaction hex
  inscribedData: string; // The actual data inscribed (may be truncated)
  dataSize: number; // Size of inscribed data in bytes
  explorerUrl: string; // Block explorer URL
  wavesExplorerUrl?: string; // Waves explorer URL if applicable
  cost: {
    feeSats: number;
    feeRate: number; // sats/vB
    totalInputSats: number;
    changeSats: number;
  };
  confirmed: boolean;
}

export class WavesBitcoinOpReturnInscriber {
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
   * Prepare inscription data with Waves references
   */
  private prepareInscriptionData(data: WavesInscriptionData): Buffer {
    let finalMessage = data.message;

    // Add Waves references if provided
    if (data.wavesTxId) {
      finalMessage += `|WAVES_TX:${data.wavesTxId}`;
    }
    if (data.assetId) {
      finalMessage += `|ASSET:${data.assetId}`;
    }
    if (data.nftAssetId) {
      finalMessage += `|NFT:${data.nftAssetId}`;
    }
    if (data.contractAddress) {
      finalMessage += `|CONTRACT:${data.contractAddress}`;
    }
    if (data.wavesAddress) {
      finalMessage += `|WAVES_ADDR:${data.wavesAddress}`;
    }
    if (data.leaseId) {
      finalMessage += `|LEASE:${data.leaseId}`;
    }
    if (data.blockHeight) {
      finalMessage += `|BLOCK:${data.blockHeight}`;
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
   * Get Waves explorer URL
   */
  private getWavesExplorerUrl(
    txId?: string,
    assetId?: string,
    address?: string,
    contractAddress?: string,
    blockHeight?: string,
    network: 'mainnet' | 'testnet' | 'stagenet' = 'mainnet'
  ): string | undefined {
    // Using WavesExplorer as default
    const explorerBase = network === 'mainnet' 
      ? 'https://wavesexplorer.com' 
      : network === 'testnet'
      ? 'https://testnet.wavesexplorer.com'
      : 'https://stagenet.wavesexplorer.com';

    if (txId) {
      return `${explorerBase}/tx/${txId}`;
    }
    if (assetId) {
      return `${explorerBase}/assets/${assetId}`;
    }
    if (contractAddress) {
      return `${explorerBase}/address/${contractAddress}`;
    }
    if (address) {
      return `${explorerBase}/address/${address}`;
    }
    if (blockHeight) {
      return `${explorerBase}/blocks/${blockHeight}`;
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
   * Create and broadcast Bitcoin OP_RETURN inscription with Waves data
   */
  async inscribe(
    privateKeyWIF: string,
    data: WavesInscriptionData,
    wavesNetwork: 'mainnet' | 'testnet' | 'stagenet' = 'mainnet',
    utxos?: UTXO[]
  ): Promise<InscriptionResult> {
    console.log('Starting Waves → Bitcoin OP_RETURN inscription...');

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

    // Get Waves explorer URL
    const wavesExplorerUrl = this.getWavesExplorerUrl(
      data.wavesTxId,
      data.assetId || data.nftAssetId,
      data.wavesAddress,
      data.contractAddress,
      data.blockHeight,
      wavesNetwork
    );

    return {
      txId,
      txHex,
      inscribedData: dataBuffer.toString('utf8'),
      dataSize: dataBuffer.length,
      explorerUrl: `${explorerBase}/${txId}`,
      wavesExplorerUrl,
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
   * Inscribe Waves transaction reference
   */
  async inscribeWavesTransaction(
    privateKeyWIF: string,
    wavesTxId: string,
    message: string = 'WAVES TX',
    wavesNetwork: 'mainnet' | 'testnet' | 'stagenet' = 'mainnet',
    metadata?: Record<string, string>
  ): Promise<InscriptionResult> {
    return this.inscribe(
      privateKeyWIF,
      {
        message,
        wavesTxId,
        metadata,
      },
      wavesNetwork
    );
  }

  /**
   * Inscribe Waves native asset reference
   */
  async inscribeWavesAsset(
    privateKeyWIF: string,
    assetId: string,
    message: string = 'Waves Asset',
    wavesNetwork: 'mainnet' | 'testnet' | 'stagenet' = 'mainnet',
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
          standard: 'native',
          chain: 'Waves',
        },
      },
      wavesNetwork
    );
  }

  /**
   * Inscribe Waves NFT reference (asset with quantity 1)
   */
  async inscribeWavesNFT(
    privateKeyWIF: string,
    nftAssetId: string,
    wavesTxId: string,
    message: string = 'Waves NFT',
    wavesNetwork: 'mainnet' | 'testnet' | 'stagenet' = 'mainnet',
    metadata?: Record<string, string>
  ): Promise<InscriptionResult> {
    return this.inscribe(
      privateKeyWIF,
      {
        message,
        nftAssetId,
        wavesTxId,
        metadata: {
          ...metadata,
          type: 'nft',
          quantity: '1',
          standard: 'native',
          chain: 'Waves',
        },
      },
      wavesNetwork
    );
  }

  /**
   * Inscribe Ride smart contract reference (dApp)
   */
  async inscribeRideContract(
    privateKeyWIF: string,
    contractAddress: string,
    message: string = 'Ride dApp',
    wavesNetwork: 'mainnet' | 'testnet' | 'stagenet' = 'mainnet',
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
          language: 'Ride',
          chain: 'Waves',
        },
      },
      wavesNetwork
    );
  }

  /**
   * Inscribe Waves leasing transaction
   */
  async inscribeWavesLease(
    privateKeyWIF: string,
    leaseId: string,
    amount: string,
    message: string = 'Waves Lease',
    wavesNetwork: 'mainnet' | 'testnet' | 'stagenet' = 'mainnet',
    metadata?: Record<string, string>
  ): Promise<InscriptionResult> {
    return this.inscribe(
      privateKeyWIF,
      {
        message,
        leaseId,
        metadata: {
          ...metadata,
          type: 'lease',
          amount,
          mechanism: 'LPoS',
          chain: 'Waves',
        },
      },
      wavesNetwork
    );
  }

  /**
   * Inscribe Waves block checkpoint
   */
  async inscribeWavesBlock(
    privateKeyWIF: string,
    blockHeight: string,
    message: string = 'Waves Block',
    wavesNetwork: 'mainnet' | 'testnet' | 'stagenet' = 'mainnet',
    metadata?: Record<string, string>
  ): Promise<InscriptionResult> {
    return this.inscribe(
      privateKeyWIF,
      {
        message,
        blockHeight,
        metadata: {
          ...metadata,
          type: 'block_checkpoint',
          chain: 'Waves',
        },
      },
      wavesNetwork
    );
  }

  /**
   * Inscribe community token launch
   */
  async inscribeCommunityToken(
    privateKeyWIF: string,
    assetId: string,
    wavesTxId: string,
    tokenName: string,
    message: string = 'Community Token',
    wavesNetwork: 'mainnet' | 'testnet' | 'stagenet' = 'mainnet',
    metadata?: Record<string, string>
  ): Promise<InscriptionResult> {
    return this.inscribe(
      privateKeyWIF,
      {
        message,
        assetId,
        wavesTxId,
        metadata: {
          ...metadata,
          name: tokenName,
          type: 'community_token',
          issuance: 'native',
          chain: 'Waves',
        },
      },
      wavesNetwork
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
   * Parse Waves data from OP_RETURN
   */
  parseWavesData(opReturnData: string): {
    message: string;
    wavesTxId?: string;
    assetId?: string;
    nftAssetId?: string;
    contractAddress?: string;
    wavesAddress?: string;
    leaseId?: string;
    blockHeight?: string;
    metadata?: Record<string, string>;
  } {
    const parts = opReturnData.split('|');
    const result: any = { message: parts[0] };

    for (let i = 1; i < parts.length; i++) {
      const part = parts[i];
      if (part.startsWith('WAVES_TX:')) {
        result.wavesTxId = part.substring(9);
      } else if (part.startsWith('ASSET:')) {
        result.assetId = part.substring(6);
      } else if (part.startsWith('NFT:')) {
        result.nftAssetId = part.substring(4);
      } else if (part.startsWith('CONTRACT:')) {
        result.contractAddress = part.substring(9);
      } else if (part.startsWith('WAVES_ADDR:')) {
        result.wavesAddress = part.substring(11);
      } else if (part.startsWith('LEASE:')) {
        result.leaseId = part.substring(6);
      } else if (part.startsWith('BLOCK:')) {
        result.blockHeight = part.substring(6);
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
 * // Initialize inscriber for Waves
 * import { WavesBitcoinOpReturnInscriber } from './WAVES.Waves.inscription.bitcoin.opReturn';
 * 
 * const inscriber = new WavesBitcoinOpReturnInscriber({
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
 * // 1. Inscribe Waves Transaction
 * const txResult = await inscriber.inscribeWavesTransaction(
 *   privateKey,
 *   'WAVES_TX_ID_HERE',
 *   'WAVES Transfer',
 *   'mainnet',
 *   { amount: '100 WAVES', type: 'transfer', from: '3P...', to: '3P...' }
 * );
 * console.log('Waves TX anchored on Bitcoin:', txResult.txId);
 * console.log('View on Bitcoin:', txResult.explorerUrl);
 * console.log('View on WavesExplorer:', txResult.wavesExplorerUrl);
 * 
 * // 2. Inscribe Waves Native Asset
 * const assetResult = await inscriber.inscribeWavesAsset(
 *   privateKey,
 *   'ASSET_ID_BASE58',
 *   'MyToken',
 *   'mainnet',
 *   { 
 *     name: 'MyToken',
 *     symbol: 'MTK',
 *     decimals: '8',
 *     supply: '1000000',
 *     issuance: 'native'
 *   }
 * );
 * console.log('Waves asset anchored:', assetResult.txId);
 * 
 * // 3. Inscribe Waves NFT
 * const nftResult = await inscriber.inscribeWavesNFT(
 *   privateKey,
 *   'NFT_ASSET_ID',
 *   'MINT_TX_ID',
 *   'Waves NFT #42',
 *   'mainnet',
 *   { 
 *     name: 'Digital Art #42',
 *     quantity: '1',
 *     reissuable: 'false',
 *     collection: 'Waves Art'
 *   }
 * );
 * console.log('Waves NFT anchored on Bitcoin!');
 * console.log('Bitcoin TX:', nftResult.txId);
 * console.log('View NFT on WavesExplorer:', nftResult.wavesExplorerUrl);
 * 
 * // 4. Inscribe Ride Smart Contract (dApp)
 * const contractResult = await inscriber.inscribeRideContract(
 *   privateKey,
 *   'DAPP_ADDRESS',
 *   'Waves DEX dApp',
 *   'mainnet',
 *   { 
 *     type: 'DEX',
 *     protocol: 'WavesDEX',
 *     language: 'Ride',
 *     version: '5'
 *   }
 * );
 * console.log('Ride contract anchored:', contractResult.txId);
 * 
 * // 5. Inscribe Waves Leasing Transaction
 * const leaseResult = await inscriber.inscribeWavesLease(
 *   privateKey,
 *   'LEASE_TX_ID',
 *   '10000 WAVES',
 *   'LPoS Lease',
 *   'mainnet',
 *   { 
 *     node: 'WavesGo',
 *     duration: 'unlimited',
 *     reward: 'variable',
 *     consensus: 'LPoS'
 *   }
 * );
 * console.log('Lease transaction anchored:', leaseResult.txId);
 * 
 * // 6. Inscribe Community Token Launch
 * const communityResult = await inscriber.inscribeCommunityToken(
 *   privateKey,
 *   'TOKEN_ASSET_ID',
 *   'ISSUANCE_TX_ID',
 *   'CommunityToken',
 *   'Community Launch',
 *   'mainnet',
 *   {
 *     symbol: 'CMT',
 *     purpose: 'governance',
 *     community: 'WavesCommunity',
 *     distribution: 'fair_launch'
 *   }
 * );
 * console.log('Community token anchored:', communityResult.txId);
 * 
 * // 7. Inscribe Waves Block Checkpoint
 * const blockResult = await inscriber.inscribeWavesBlock(
 *   privateKey,
 *   '4000000',
 *   'Waves Block 4M',
 *   'mainnet',
 *   { 
 *     milestone: '4M blocks',
 *     timestamp: new Date().toISOString(),
 *     consensus: 'LPoS'
 *   }
 * );
 * console.log('Block checkpoint anchored:', blockResult.txId);
 * 
 * // 8. Read and parse inscribed data
 * const opReturnData = await inscriber.getOpReturnData(nftResult.txId);
 * console.log('Raw OP_RETURN data:', opReturnData);
 * 
 * if (opReturnData) {
 *   const parsed = inscriber.parseWavesData(opReturnData);
 *   console.log('Parsed Waves data:', parsed);
 *   console.log('NFT Asset ID:', parsed.nftAssetId);
 *   console.log('Metadata:', parsed.metadata);
 * }
 * 
 * // 9. Cross-chain workflow: Waves NFT → Bitcoin
 * // Step 1: Issue NFT on Waves (using Waves SDK)
 * const nftAssetId = 'ISSUED_NFT_ASSET_ID';
 * const issueTxId = 'ISSUE_TX_ID';
 * 
 * // Step 2: Anchor on Bitcoin
 * const anchor = await inscriber.inscribeWavesNFT(
 *   privateKey,
 *   nftAssetId,
 *   issueTxId,
 *   'Waves Art Collection #1337',
 *   'mainnet',
 *   {
 *     artist: 'CryptoArtist',
 *     collection: 'Waves Native NFTs',
 *     rarity: 'unique',
 *     quantity: '1',
 *     crosschain: 'true'
 *   }
 * );
 * 
 * console.log('🎉 NFT anchored on Bitcoin!');
 * console.log('Waves:', anchor.wavesExplorerUrl);
 * console.log('Bitcoin:', anchor.explorerUrl);
 * console.log('This NFT is now provably anchored on both blockchains!');
 * 
 * // 10. Native Asset Issuance on Waves
 * const nativeAsset = await inscriber.inscribeWavesAsset(
 *   privateKey,
 *   'NEW_ASSET_ID',
 *   'WavesUSD Stablecoin',
 *   'mainnet',
 *   {
 *     name: 'WavesUSD',
 *     symbol: 'WUSD',
 *     type: 'stablecoin',
 *     decimals: '8',
 *     supply: '10000000',
 *     native_issuance: 'true'
 *   }
 * );
 * 
 * console.log('Native asset anchored on Bitcoin!');
 * console.log('No smart contract needed - native to Waves!');
 * 
 * // 11. Ride dApp Deployment Proof
 * const dappDeploy = await inscriber.inscribeRideContract(
 *   privateKey,
 *   'DAPP_ADDRESS',
 *   'Neutrino Protocol',
 *   'mainnet',
 *   {
 *     protocol: 'Neutrino',
 *     type: 'algorithmic_stablecoin',
 *     language: 'Ride',
 *     assets: 'USDN,WAVES,NSBT',
 *     deployed: new Date().toISOString()
 *   }
 * );
 * 
 * console.log('Ride dApp deployment anchored!');
 * console.log('Decidable smart contracts on Bitcoin ledger!');
 * 
 * // 12. LPoS Leasing Governance Proof
 * const governanceLease = await inscriber.inscribeWavesLease(
 *   privateKey,
 *   'LEASE_ID',
 *   '50000 WAVES',
 *   'Governance Lease',
 *   'mainnet',
 *   {
 *     purpose: 'governance',
 *     node: 'CommunityNode',
 *     power: 'high',
 *     consensus: 'LPoS',
 *     cancelable: 'true'
 *   }
 * );
 * 
 * console.log('Governance lease anchored!');
 * console.log('Liquid staking proof on Bitcoin!');
 * 
 * // 13. Multi-Asset Portfolio Proof
 * const portfolio = await inscriber.inscribeWavesTransaction(
 *   privateKey,
 *   'PORTFOLIO_TX',
 *   'Waves Portfolio',
 *   'mainnet',
 *   {
 *     assets: ['WAVES', 'USDN', 'VIRES', 'SIGN'],
 *     total_value: '$10000',
 *     diversified: 'true',
 *     native_assets: 'true'
 *   }
 * );
 * 
 * console.log('Multi-asset portfolio anchored!');
 * console.log('Native asset diversity preserved!');
 */

export default WavesBitcoinOpReturnInscriber;

