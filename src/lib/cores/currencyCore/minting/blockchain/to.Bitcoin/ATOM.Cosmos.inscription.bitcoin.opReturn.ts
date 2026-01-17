// Bitcoin OP_RETURN Inscription for Cosmos
// Inscribes Cosmos blockchain data/references to Bitcoin blockchain using OP_RETURN

/**
 * OVERVIEW:
 * 
 * This module inscribes Cosmos (ATOM) blockchain data to Bitcoin using OP_RETURN outputs.
 * - Embed up to 80 bytes (standard) of arbitrary data on-chain
 * - Anchor Cosmos transactions on Bitcoin blockchain
 * - Reference IBC tokens and cross-chain transfers
 * - Reference Cosmos validators and delegations
 * - Reference CosmWasm smart contracts
 * - Cross-chain proof of existence
 * 
 * BENEFITS:
 * - Dual-blockchain immutability (Cosmos + Bitcoin)
 * - Bitcoin's security for Cosmos data
 * - Timestamped by Bitcoin blockchain
 * - IBC transfer verification on Bitcoin
 * - Proof of Cosmos operations on Bitcoin
 * 
 * COSTS:
 * - Transaction fee: Variable based on network congestion (~500-5000 sats)
 * - No ongoing storage costs
 * - OP_RETURN output has 0 value
 * 
 * USE CASES:
 * - Anchor Cosmos NFT mints on Bitcoin
 * - Cross-chain proof of IBC transfers
 * - Timestamp CosmWasm contract deployments
 * - Verify validator operations
 * - Dual-chain verification for Cosmos Hub transactions
 * - Inter-blockchain communication (IBC) anchoring
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

export interface CosmosInscriptionData {
  message: string; // Data to inscribe (will be truncated to 80 bytes)
  cosmosTxHash?: string; // Cosmos transaction hash
  cosmosContractAddress?: string; // CosmWasm contract address
  cosmosValidatorAddress?: string; // Cosmos validator address
  cosmosAddress?: string; // Cosmos account address (cosmos1...)
  ibcDenom?: string; // IBC token denomination
  metadata?: Record<string, string>; // Additional metadata (encoded as JSON)
}

export interface InscriptionResult {
  txId: string; // Bitcoin transaction ID
  txHex: string; // Raw transaction hex
  inscribedData: string; // The actual data inscribed (may be truncated)
  dataSize: number; // Size of inscribed data in bytes
  explorerUrl: string; // Block explorer URL
  cosmosExplorerUrl?: string; // Cosmos explorer URL if applicable
  cost: {
    feeSats: number;
    feeRate: number; // sats/vB
    totalInputSats: number;
    changeSats: number;
  };
  confirmed: boolean;
}

export class CosmosBitcoinOpReturnInscriber {
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
   * Prepare inscription data with Cosmos references
   */
  private prepareInscriptionData(data: CosmosInscriptionData): Buffer {
    let finalMessage = data.message;

    // Add Cosmos references if provided
    if (data.cosmosTxHash) {
      finalMessage += `|COSMOS_TX:${data.cosmosTxHash}`;
    }
    if (data.cosmosContractAddress) {
      finalMessage += `|COSMOS_CONTRACT:${data.cosmosContractAddress}`;
    }
    if (data.cosmosValidatorAddress) {
      finalMessage += `|COSMOS_VAL:${data.cosmosValidatorAddress}`;
    }
    if (data.cosmosAddress) {
      finalMessage += `|COSMOS_ADDR:${data.cosmosAddress}`;
    }
    if (data.ibcDenom) {
      finalMessage += `|IBC:${data.ibcDenom}`;
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
   * Get Cosmos explorer URL
   */
  private getCosmosExplorerUrl(
    txHash?: string,
    contractAddress?: string,
    validatorAddress?: string,
    address?: string,
    network: 'mainnet' | 'testnet' = 'mainnet'
  ): string | undefined {
    // Using Mintscan as default explorer
    const explorerBase = network === 'mainnet' 
      ? 'https://www.mintscan.io/cosmos' 
      : 'https://testnet.mintscan.io/cosmoshub-testnet';

    if (txHash) {
      return `${explorerBase}/txs/${txHash}`;
    }
    if (contractAddress) {
      return `${explorerBase}/wasm/contract/${contractAddress}`;
    }
    if (validatorAddress) {
      return `${explorerBase}/validators/${validatorAddress}`;
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
   * Create and broadcast Bitcoin OP_RETURN inscription with Cosmos data
   */
  async inscribe(
    privateKeyWIF: string,
    data: CosmosInscriptionData,
    cosmosNetwork: 'mainnet' | 'testnet' = 'mainnet',
    utxos?: UTXO[]
  ): Promise<InscriptionResult> {
    console.log('Starting Cosmos → Bitcoin OP_RETURN inscription...');

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

    // Get Cosmos explorer URL
    const cosmosExplorerUrl = this.getCosmosExplorerUrl(
      data.cosmosTxHash,
      data.cosmosContractAddress,
      data.cosmosValidatorAddress,
      data.cosmosAddress,
      cosmosNetwork
    );

    return {
      txId,
      txHex,
      inscribedData: dataBuffer.toString('utf8'),
      dataSize: dataBuffer.length,
      explorerUrl: `${explorerBase}/${txId}`,
      cosmosExplorerUrl,
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
   * Inscribe Cosmos transaction reference
   */
  async inscribeCosmosTransaction(
    privateKeyWIF: string,
    cosmosTxHash: string,
    message: string = 'Cosmos TX',
    cosmosNetwork: 'mainnet' | 'testnet' = 'mainnet',
    metadata?: Record<string, string>
  ): Promise<InscriptionResult> {
    return this.inscribe(
      privateKeyWIF,
      {
        message,
        cosmosTxHash,
        metadata,
      },
      cosmosNetwork
    );
  }

  /**
   * Inscribe IBC transfer reference
   */
  async inscribeIBCTransfer(
    privateKeyWIF: string,
    cosmosTxHash: string,
    ibcDenom: string,
    message: string = 'IBC Transfer',
    cosmosNetwork: 'mainnet' | 'testnet' = 'mainnet',
    metadata?: Record<string, string>
  ): Promise<InscriptionResult> {
    return this.inscribe(
      privateKeyWIF,
      {
        message,
        cosmosTxHash,
        ibcDenom,
        metadata: {
          ...metadata,
          type: 'ibc_transfer',
        },
      },
      cosmosNetwork
    );
  }

  /**
   * Inscribe CosmWasm contract reference
   */
  async inscribeCosmWasmContract(
    privateKeyWIF: string,
    cosmosContractAddress: string,
    message: string = 'CosmWasm Contract',
    cosmosNetwork: 'mainnet' | 'testnet' = 'mainnet',
    metadata?: Record<string, string>
  ): Promise<InscriptionResult> {
    return this.inscribe(
      privateKeyWIF,
      {
        message,
        cosmosContractAddress,
        metadata,
      },
      cosmosNetwork
    );
  }

  /**
   * Inscribe Cosmos validator reference
   */
  async inscribeCosmosValidator(
    privateKeyWIF: string,
    cosmosValidatorAddress: string,
    message: string = 'Cosmos Validator',
    cosmosNetwork: 'mainnet' | 'testnet' = 'mainnet',
    metadata?: Record<string, string>
  ): Promise<InscriptionResult> {
    return this.inscribe(
      privateKeyWIF,
      {
        message,
        cosmosValidatorAddress,
        metadata,
      },
      cosmosNetwork
    );
  }

  /**
   * Inscribe Cosmos NFT reference (CW721)
   */
  async inscribeCosmosNFT(
    privateKeyWIF: string,
    cosmosContractAddress: string,
    cosmosTxHash: string,
    tokenId: string,
    message: string = 'Cosmos NFT',
    cosmosNetwork: 'mainnet' | 'testnet' = 'mainnet',
    metadata?: Record<string, string>
  ): Promise<InscriptionResult> {
    return this.inscribe(
      privateKeyWIF,
      {
        message,
        cosmosContractAddress,
        cosmosTxHash,
        metadata: {
          ...metadata,
          tokenId,
          standard: 'CW721',
          type: 'nft',
        },
      },
      cosmosNetwork
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
   * Parse Cosmos data from OP_RETURN
   */
  parseCosmosData(opReturnData: string): {
    message: string;
    cosmosTxHash?: string;
    cosmosContractAddress?: string;
    cosmosValidatorAddress?: string;
    cosmosAddress?: string;
    ibcDenom?: string;
    metadata?: Record<string, string>;
  } {
    const parts = opReturnData.split('|');
    const result: any = { message: parts[0] };

    for (let i = 1; i < parts.length; i++) {
      const part = parts[i];
      if (part.startsWith('COSMOS_TX:')) {
        result.cosmosTxHash = part.substring(10);
      } else if (part.startsWith('COSMOS_CONTRACT:')) {
        result.cosmosContractAddress = part.substring(16);
      } else if (part.startsWith('COSMOS_VAL:')) {
        result.cosmosValidatorAddress = part.substring(11);
      } else if (part.startsWith('COSMOS_ADDR:')) {
        result.cosmosAddress = part.substring(12);
      } else if (part.startsWith('IBC:')) {
        result.ibcDenom = part.substring(4);
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
 * import { CosmosBitcoinOpReturnInscriber } from './ATOM.Cosmos.inscription.bitcoin.opReturn';
 * 
 * const inscriber = new CosmosBitcoinOpReturnInscriber({
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
 * // 1. Inscribe Cosmos Transaction
 * const txResult = await inscriber.inscribeCosmosTransaction(
 *   privateKey,
 *   'COSMOS_TX_HASH_HERE',
 *   'ATOM Transfer',
 *   'mainnet',
 *   { amount: '100 ATOM', type: 'send' }
 * );
 * console.log('Cosmos TX anchored on Bitcoin:', txResult.txId);
 * console.log('View on Bitcoin:', txResult.explorerUrl);
 * console.log('View on Cosmos:', txResult.cosmosExplorerUrl);
 * 
 * // 2. Inscribe IBC Transfer
 * const ibcResult = await inscriber.inscribeIBCTransfer(
 *   privateKey,
 *   'IBC_TX_HASH',
 *   'ibc/27394FB092D2ECCD56123C74F36E4C1F926001CEADA9CA97EA622B25F41E5EB2',
 *   'IBC OSMO Transfer',
 *   'mainnet',
 *   { from: 'cosmoshub', to: 'osmosis', amount: '50' }
 * );
 * console.log('IBC transfer anchored:', ibcResult.txId);
 * 
 * // 3. Inscribe CosmWasm Smart Contract
 * const contractResult = await inscriber.inscribeCosmWasmContract(
 *   privateKey,
 *   'cosmos1contract...', // Contract address
 *   'NFT Marketplace',
 *   'mainnet',
 *   { version: '1.0', codeId: '123' }
 * );
 * console.log('CosmWasm contract anchored:', contractResult.txId);
 * 
 * // 4. Inscribe Cosmos Validator
 * const validatorResult = await inscriber.inscribeCosmosValidator(
 *   privateKey,
 *   'cosmosvaloper1...', // Validator address
 *   'Top Validator',
 *   'mainnet',
 *   { commission: '5%', votingPower: '1000000' }
 * );
 * console.log('Validator anchored:', validatorResult.txId);
 * 
 * // 5. Inscribe Cosmos NFT (CW721)
 * const nftResult = await inscriber.inscribeCosmosNFT(
 *   privateKey,
 *   'cosmos1nftcontract...', // CW721 contract
 *   'MINT_TX_HASH',
 *   'token-123', // Token ID
 *   'Cosmos NFT #1',
 *   'mainnet',
 *   { artist: 'Artist Name', collection: 'My Collection' }
 * );
 * console.log('Cosmos NFT anchored on Bitcoin!');
 * console.log('Bitcoin TX:', nftResult.txId);
 * 
 * // 6. Read and parse inscribed data
 * const opReturnData = await inscriber.getOpReturnData(txResult.txId);
 * console.log('Raw OP_RETURN data:', opReturnData);
 * 
 * if (opReturnData) {
 *   const parsed = inscriber.parseCosmosData(opReturnData);
 *   console.log('Parsed Cosmos data:', parsed);
 *   console.log('Cosmos TX Hash:', parsed.cosmosTxHash);
 *   console.log('Contract Address:', parsed.cosmosContractAddress);
 *   console.log('IBC Denom:', parsed.ibcDenom);
 * }
 * 
 * // 7. Cross-chain IBC workflow: Cosmos → Osmosis → Bitcoin
 * // Step 1: Transfer via IBC (using Cosmos SDK)
 * const ibcTxHash = 'IBC_TRANSFER_TX_HASH';
 * const ibcDenom = 'ibc/OSMO_DENOM';
 * 
 * // Step 2: Anchor on Bitcoin
 * const anchor = await inscriber.inscribeIBCTransfer(
 *   privateKey,
 *   ibcTxHash,
 *   ibcDenom,
 *   'Cross-chain OSMO',
 *   'mainnet',
 *   {
 *     sourceChain: 'cosmoshub-4',
 *     destChain: 'osmosis-1',
 *     channel: 'channel-141',
 *     timestamp: new Date().toISOString()
 *   }
 * );
 * 
 * console.log('🎉 IBC transfer anchored on Bitcoin!');
 * console.log('Cosmos TX:', anchor.cosmosExplorerUrl);
 * console.log('Bitcoin Anchor:', anchor.explorerUrl);
 * console.log('This IBC transfer is now verifiable on Bitcoin!');
 * 
 * // 8. Anchor CosmWasm NFT mint
 * const nftMintAnchor = await inscriber.inscribeCosmosNFT(
 *   privateKey,
 *   'cosmos1nftcontract123',
 *   'NFT_MINT_TX_HASH',
 *   'nft-42',
 *   'Stargaze NFT',
 *   'mainnet',
 *   {
 *     platform: 'Stargaze',
 *     collection: 'Bad Kids',
 *     rarity: 'legendary'
 *   }
 * );
 * 
 * console.log('Cosmos NFT now has Bitcoin proof!');
 * console.log('Dual-chain verification complete!');
 */

export default CosmosBitcoinOpReturnInscriber;

