// Bitcoin OP_RETURN Inscription for Terra (LUNA/LUNC)
// Inscribes Terra blockchain data/references to Bitcoin blockchain using OP_RETURN

/**
 * OVERVIEW:
 * 
 * This module inscribes Terra (LUNA 2.0) and Terra Classic (LUNC) data to Bitcoin using OP_RETURN outputs.
 * - Embed up to 80 bytes (standard) of arbitrary data on-chain
 * - Anchor Terra transactions on Bitcoin blockchain
 * - Reference CosmWasm smart contracts
 * - Reference CW20 tokens (fungible tokens on Terra)
 * - Reference CW721 NFTs (non-fungible tokens on Terra)
 * - Reference IBC (Inter-Blockchain Communication) transfers
 * - Reference validators
 * - Cross-chain proof of existence
 * 
 * BENEFITS:
 * - Dual-blockchain immutability (Terra + Bitcoin)
 * - Bitcoin's security for Terra data
 * - Timestamped by Bitcoin blockchain
 * - Proof of CW token operations on Bitcoin
 * - Cross-chain verification for CosmWasm contracts
 * - Historical record preservation for Terra Classic
 * 
 * COSTS:
 * - Transaction fee: Variable based on network congestion (~500-5000 sats)
 * - No ongoing storage costs
 * - OP_RETURN output has 0 value
 * 
 * USE CASES:
 * - Anchor CW721 NFT mints on Bitcoin
 * - Cross-chain proof of CW20 token creation
 * - Timestamp CosmWasm contract deployments
 * - Verify IBC transfers on Bitcoin
 * - Dual-chain verification for Terra transactions
 * - Bridge anchoring between Terra and Bitcoin
 * - Historical preservation of Terra Classic operations
 * - Terra 2.0 protocol governance proofs
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

export interface TerraInscriptionData {
  message: string; // Data to inscribe (will be truncated to 80 bytes)
  terraTxHash?: string; // Terra transaction hash
  contractAddress?: string; // CosmWasm contract address
  cw20TokenAddress?: string; // CW20 token contract address
  cw721TokenAddress?: string; // CW721 NFT contract address
  tokenId?: string; // Token ID for NFTs
  validatorAddress?: string; // Validator address
  terraAddress?: string; // Terra wallet address (terra...)
  ibcDenom?: string; // IBC denomination
  proposalId?: string; // Governance proposal ID
  metadata?: Record<string, string>; // Additional metadata (encoded as JSON)
}

export interface InscriptionResult {
  txId: string; // Bitcoin transaction ID
  txHex: string; // Raw transaction hex
  inscribedData: string; // The actual data inscribed (may be truncated)
  dataSize: number; // Size of inscribed data in bytes
  explorerUrl: string; // Block explorer URL
  terraExplorerUrl?: string; // Terra explorer URL if applicable
  cost: {
    feeSats: number;
    feeRate: number; // sats/vB
    totalInputSats: number;
    changeSats: number;
  };
  confirmed: boolean;
}

export class TerraBitcoinOpReturnInscriber {
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
   * Prepare inscription data with Terra references
   */
  private prepareInscriptionData(data: TerraInscriptionData): Buffer {
    let finalMessage = data.message;

    // Add Terra references if provided
    if (data.terraTxHash) {
      finalMessage += `|TERRA_TX:${data.terraTxHash}`;
    }
    if (data.contractAddress) {
      finalMessage += `|TERRA_CONTRACT:${data.contractAddress}`;
    }
    if (data.cw20TokenAddress) {
      finalMessage += `|CW20:${data.cw20TokenAddress}`;
    }
    if (data.cw721TokenAddress) {
      finalMessage += `|CW721:${data.cw721TokenAddress}`;
    }
    if (data.tokenId) {
      finalMessage += `|TOKEN_ID:${data.tokenId}`;
    }
    if (data.validatorAddress) {
      finalMessage += `|TERRA_VAL:${data.validatorAddress}`;
    }
    if (data.terraAddress) {
      finalMessage += `|TERRA_ADDR:${data.terraAddress}`;
    }
    if (data.ibcDenom) {
      finalMessage += `|IBC:${data.ibcDenom}`;
    }
    if (data.proposalId) {
      finalMessage += `|PROPOSAL:${data.proposalId}`;
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
   * Get Terra explorer URL
   */
  private getTerraExplorerUrl(
    txHash?: string,
    contractAddress?: string,
    address?: string,
    validatorAddress?: string,
    proposalId?: string,
    network: 'terra2' | 'classic' | 'testnet' = 'terra2'
  ): string | undefined {
    // Using Terra Finder as default explorer
    const explorerBase = network === 'terra2' 
      ? 'https://finder.terra.money/mainnet' 
      : network === 'classic'
      ? 'https://finder.terra.money/classic'
      : 'https://finder.terra.money/testnet';

    if (txHash) {
      return `${explorerBase}/tx/${txHash}`;
    }
    if (contractAddress) {
      return `${explorerBase}/address/${contractAddress}`;
    }
    if (validatorAddress) {
      return `${explorerBase}/validator/${validatorAddress}`;
    }
    if (address) {
      return `${explorerBase}/address/${address}`;
    }
    if (proposalId) {
      return `${explorerBase}/proposal/${proposalId}`;
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
   * Create and broadcast Bitcoin OP_RETURN inscription with Terra data
   */
  async inscribe(
    privateKeyWIF: string,
    data: TerraInscriptionData,
    terraNetwork: 'terra2' | 'classic' | 'testnet' = 'terra2',
    utxos?: UTXO[]
  ): Promise<InscriptionResult> {
    console.log('Starting Terra → Bitcoin OP_RETURN inscription...');

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

    // Get Terra explorer URL
    const terraExplorerUrl = this.getTerraExplorerUrl(
      data.terraTxHash,
      data.contractAddress || data.cw20TokenAddress || data.cw721TokenAddress,
      data.terraAddress,
      data.validatorAddress,
      data.proposalId,
      terraNetwork
    );

    return {
      txId,
      txHex,
      inscribedData: dataBuffer.toString('utf8'),
      dataSize: dataBuffer.length,
      explorerUrl: `${explorerBase}/${txId}`,
      terraExplorerUrl,
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
   * Inscribe Terra transaction reference
   */
  async inscribeTerraTransaction(
    privateKeyWIF: string,
    terraTxHash: string,
    message: string = 'TERRA TX',
    terraNetwork: 'terra2' | 'classic' | 'testnet' = 'terra2',
    metadata?: Record<string, string>
  ): Promise<InscriptionResult> {
    return this.inscribe(
      privateKeyWIF,
      {
        message,
        terraTxHash,
        metadata,
      },
      terraNetwork
    );
  }

  /**
   * Inscribe CosmWasm contract reference
   */
  async inscribeTerraContract(
    privateKeyWIF: string,
    contractAddress: string,
    message: string = 'CosmWasm Contract',
    terraNetwork: 'terra2' | 'classic' | 'testnet' = 'terra2',
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
          platform: 'CosmWasm',
        },
      },
      terraNetwork
    );
  }

  /**
   * Inscribe CW20 token reference
   */
  async inscribeCW20Token(
    privateKeyWIF: string,
    cw20TokenAddress: string,
    message: string = 'CW20 Token',
    terraNetwork: 'terra2' | 'classic' | 'testnet' = 'terra2',
    metadata?: Record<string, string>
  ): Promise<InscriptionResult> {
    return this.inscribe(
      privateKeyWIF,
      {
        message,
        cw20TokenAddress,
        metadata: {
          ...metadata,
          standard: 'CW20',
          type: 'fungible',
          chain: terraNetwork === 'classic' ? 'Terra Classic' : 'Terra 2.0',
        },
      },
      terraNetwork
    );
  }

  /**
   * Inscribe CW721 NFT reference
   */
  async inscribeCW721NFT(
    privateKeyWIF: string,
    cw721TokenAddress: string,
    tokenId: string,
    terraTxHash: string,
    message: string = 'CW721 NFT',
    terraNetwork: 'terra2' | 'classic' | 'testnet' = 'terra2',
    metadata?: Record<string, string>
  ): Promise<InscriptionResult> {
    return this.inscribe(
      privateKeyWIF,
      {
        message,
        cw721TokenAddress,
        tokenId,
        terraTxHash,
        metadata: {
          ...metadata,
          standard: 'CW721',
          type: 'nft',
          chain: terraNetwork === 'classic' ? 'Terra Classic' : 'Terra 2.0',
        },
      },
      terraNetwork
    );
  }

  /**
   * Inscribe Terra validator reference
   */
  async inscribeTerraValidator(
    privateKeyWIF: string,
    validatorAddress: string,
    message: string = 'Terra Validator',
    terraNetwork: 'terra2' | 'classic' | 'testnet' = 'terra2',
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
          chain: terraNetwork === 'classic' ? 'Terra Classic' : 'Terra 2.0',
        },
      },
      terraNetwork
    );
  }

  /**
   * Inscribe IBC transfer reference
   */
  async inscribeIBCTransfer(
    privateKeyWIF: string,
    terraTxHash: string,
    ibcDenom: string,
    sourceChain: string,
    destChain: string,
    message: string = 'IBC Transfer',
    terraNetwork: 'terra2' | 'classic' | 'testnet' = 'terra2',
    metadata?: Record<string, string>
  ): Promise<InscriptionResult> {
    return this.inscribe(
      privateKeyWIF,
      {
        message,
        terraTxHash,
        ibcDenom,
        metadata: {
          ...metadata,
          type: 'ibc',
          source: sourceChain,
          destination: destChain,
        },
      },
      terraNetwork
    );
  }

  /**
   * Inscribe Terra governance proposal reference
   */
  async inscribeTerraProposal(
    privateKeyWIF: string,
    proposalId: string,
    message: string = 'Terra Proposal',
    terraNetwork: 'terra2' | 'classic' | 'testnet' = 'terra2',
    metadata?: Record<string, string>
  ): Promise<InscriptionResult> {
    return this.inscribe(
      privateKeyWIF,
      {
        message,
        proposalId,
        metadata: {
          ...metadata,
          type: 'governance',
          chain: terraNetwork === 'classic' ? 'Terra Classic' : 'Terra 2.0',
        },
      },
      terraNetwork
    );
  }

  /**
   * Inscribe Terra Classic (LUNC) historical event
   */
  async inscribeTerraClassicEvent(
    privateKeyWIF: string,
    terraTxHash: string,
    eventType: string,
    message: string = 'Terra Classic Event',
    metadata?: Record<string, string>
  ): Promise<InscriptionResult> {
    return this.inscribe(
      privateKeyWIF,
      {
        message,
        terraTxHash,
        metadata: {
          ...metadata,
          type: 'historical_event',
          event: eventType,
          chain: 'Terra Classic',
          preservation: 'true',
        },
      },
      'classic'
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
   * Parse Terra data from OP_RETURN
   */
  parseTerraData(opReturnData: string): {
    message: string;
    terraTxHash?: string;
    contractAddress?: string;
    cw20TokenAddress?: string;
    cw721TokenAddress?: string;
    tokenId?: string;
    validatorAddress?: string;
    terraAddress?: string;
    ibcDenom?: string;
    proposalId?: string;
    metadata?: Record<string, string>;
  } {
    const parts = opReturnData.split('|');
    const result: any = { message: parts[0] };

    for (let i = 1; i < parts.length; i++) {
      const part = parts[i];
      if (part.startsWith('TERRA_TX:')) {
        result.terraTxHash = part.substring(9);
      } else if (part.startsWith('TERRA_CONTRACT:')) {
        result.contractAddress = part.substring(15);
      } else if (part.startsWith('CW20:')) {
        result.cw20TokenAddress = part.substring(5);
      } else if (part.startsWith('CW721:')) {
        result.cw721TokenAddress = part.substring(6);
      } else if (part.startsWith('TOKEN_ID:')) {
        result.tokenId = part.substring(9);
      } else if (part.startsWith('TERRA_VAL:')) {
        result.validatorAddress = part.substring(10);
      } else if (part.startsWith('TERRA_ADDR:')) {
        result.terraAddress = part.substring(11);
      } else if (part.startsWith('IBC:')) {
        result.ibcDenom = part.substring(4);
      } else if (part.startsWith('PROPOSAL:')) {
        result.proposalId = part.substring(9);
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
 * import { TerraBitcoinOpReturnInscriber } from './LUNA.Terra.inscription.bitcoin.opReturn';
 * 
 * const inscriber = new TerraBitcoinOpReturnInscriber({
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
 * // 1. Inscribe Terra 2.0 Transaction
 * const txResult = await inscriber.inscribeTerraTransaction(
 *   privateKey,
 *   'TERRA_TX_HASH_HERE',
 *   'LUNA Transfer',
 *   'terra2',
 *   { amount: '100 LUNA', type: 'transfer', module: 'bank' }
 * );
 * console.log('Terra TX anchored on Bitcoin:', txResult.txId);
 * console.log('View on Bitcoin:', txResult.explorerUrl);
 * console.log('View on Terra Finder:', txResult.terraExplorerUrl);
 * 
 * // 2. Inscribe Terra Classic Transaction (LUNC)
 * const classicTxResult = await inscriber.inscribeTerraTransaction(
 *   privateKey,
 *   'LUNC_TX_HASH_HERE',
 *   'LUNC Transfer',
 *   'classic',
 *   { amount: '1000000 LUNC', type: 'transfer', chain: 'Terra Classic' }
 * );
 * console.log('Terra Classic TX anchored:', classicTxResult.txId);
 * 
 * // 3. Inscribe CW20 Token
 * const cw20Result = await inscriber.inscribeCW20Token(
 *   privateKey,
 *   'terra1cw20contractaddress',
 *   'Terra Token',
 *   'terra2',
 *   { symbol: 'TTK', name: 'Terra Token', decimals: '6', supply: '1000000' }
 * );
 * console.log('CW20 token anchored:', cw20Result.txId);
 * 
 * // 4. Inscribe CW721 NFT
 * const nftResult = await inscriber.inscribeCW721NFT(
 *   privateKey,
 *   'terra1nftcontractaddress',
 *   '42', // Token ID
 *   'MINT_TX_HASH',
 *   'Terra NFT #42',
 *   'terra2',
 *   { 
 *     collection: 'Terra Art Collection',
 *     artist: 'Digital Artist',
 *     rarity: 'rare'
 *   }
 * );
 * console.log('CW721 NFT anchored on Bitcoin!');
 * console.log('Bitcoin TX:', nftResult.txId);
 * console.log('View NFT on Terra Finder:', nftResult.terraExplorerUrl);
 * 
 * // 5. Inscribe CosmWasm Contract
 * const contractResult = await inscriber.inscribeTerraContract(
 *   privateKey,
 *   'terra1contractaddress',
 *   'DeFi Protocol',
 *   'terra2',
 *   { type: 'AMM', protocol: 'TerraSwap', deployed: new Date().toISOString() }
 * );
 * console.log('CosmWasm contract anchored:', contractResult.txId);
 * 
 * // 6. Inscribe Terra Validator
 * const validatorResult = await inscriber.inscribeTerraValidator(
 *   privateKey,
 *   'terravaloper1validatoraddress',
 *   'Validator: MyNode',
 *   'terra2',
 *   { commission: '5%', moniker: 'MyNode', status: 'active' }
 * );
 * console.log('Validator anchored:', validatorResult.txId);
 * 
 * // 7. Inscribe IBC Transfer
 * const ibcResult = await inscriber.inscribeIBCTransfer(
 *   privateKey,
 *   'IBC_TX_HASH',
 *   'ibc/27394FB092D2ECCD56123C74F36E4C1F926001CEADA9CA97EA622B25F41E5EB2',
 *   'Terra',
 *   'Osmosis',
 *   'IBC: Terra → Osmosis',
 *   'terra2',
 *   { amount: '100 LUNA', protocol: 'IBC', channel: 'channel-1' }
 * );
 * console.log('IBC transfer anchored:', ibcResult.txId);
 * 
 * // 8. Inscribe Terra Governance Proposal
 * const proposalResult = await inscriber.inscribeTerraProposal(
 *   privateKey,
 *   '123',
 *   'Proposal #123',
 *   'terra2',
 *   { 
 *     title: 'Community Pool Spend',
 *     status: 'passed',
 *     voting_end: '2024-01-15'
 *   }
 * );
 * console.log('Governance proposal anchored:', proposalResult.txId);
 * 
 * // 9. Inscribe Terra Classic Historical Event
 * const historicEvent = await inscriber.inscribeTerraClassicEvent(
 *   privateKey,
 *   'UST_DEPEG_TX_HASH',
 *   'ust_depeg',
 *   'Terra Classic: UST Depeg',
 *   {
 *     date: '2022-05-09',
 *     event: 'UST Depegging Event',
 *     significance: 'historical',
 *     preservation: 'community_record'
 *   }
 * );
 * console.log('Historic event preserved on Bitcoin:', historicEvent.txId);
 * 
 * // 10. Read and parse inscribed data
 * const opReturnData = await inscriber.getOpReturnData(nftResult.txId);
 * console.log('Raw OP_RETURN data:', opReturnData);
 * 
 * if (opReturnData) {
 *   const parsed = inscriber.parseTerraData(opReturnData);
 *   console.log('Parsed Terra data:', parsed);
 *   console.log('CW721 Address:', parsed.cw721TokenAddress);
 *   console.log('Token ID:', parsed.tokenId);
 *   console.log('Metadata:', parsed.metadata);
 * }
 * 
 * // 11. Cross-chain workflow: Terra NFT → Bitcoin
 * // Step 1: Mint NFT on Terra (using Terra.js or CosmJS)
 * const nftContract = 'terra1nftcontract';
 * const tokenId = '1337';
 * const mintTxHash = 'MINT_TX_HASH';
 * 
 * // Step 2: Anchor on Bitcoin
 * const anchor = await inscriber.inscribeCW721NFT(
 *   privateKey,
 *   nftContract,
 *   tokenId,
 *   mintTxHash,
 *   'Terra NFT #1337',
 *   'terra2',
 *   {
 *     collection: 'Galactic Punks',
 *     rarity: 'legendary',
 *     edition: '1/1',
 *     crosschain: 'true'
 *   }
 * );
 * 
 * console.log('🎉 NFT anchored on Bitcoin!');
 * console.log('Terra:', anchor.terraExplorerUrl);
 * console.log('Bitcoin:', anchor.explorerUrl);
 * console.log('This NFT is now provably anchored on both blockchains!');
 * 
 * // 12. Terra Revival Proof (Post-Collapse)
 * const revivalProof = await inscriber.inscribeTerraProposal(
 *   privateKey,
 *   '1623',
 *   'Terra 2.0 Genesis',
 *   'terra2',
 *   {
 *     title: 'Terra Ecosystem Revival Plan',
 *     type: 'genesis',
 *     date: '2022-05-28',
 *     significance: 'chain_rebirth'
 *   }
 * );
 * 
 * console.log('Terra revival proposal anchored on Bitcoin!');
 * console.log('Immutable record of ecosystem rebirth!');
 * 
 * // 13. Multi-chain IBC workflow: Terra → Cosmos → Bitcoin
 * const ibcMultiChain = await inscriber.inscribeIBCTransfer(
 *   privateKey,
 *   'IBC_TX_HASH',
 *   'ibc/denom',
 *   'Terra',
 *   'Cosmos Hub',
 *   'Terra → Cosmos IBC',
 *   'terra2',
 *   {
 *     amount: '1000 LUNA',
 *     protocol: 'IBC',
 *     route: 'Terra->CosmosHub',
 *     proof: 'triple_chain'
 *   }
 * );
 * 
 * console.log('IBC transfer anchored on Bitcoin!');
 * console.log('Three-chain proof: Terra → Cosmos → Bitcoin!');
 * 
 * // 14. Terra Classic Burn Event (Tax2Gas)
 * const burnEvent = await inscriber.inscribeTerraClassicEvent(
 *   privateKey,
 *   'BURN_TX_HASH',
 *   'lunc_burn',
 *   'LUNC Burn via Tax2Gas',
 *   {
 *     amount: '1000000000 LUNC',
 *     mechanism: 'Tax2Gas',
 *     date: new Date().toISOString(),
 *     community_initiative: 'true'
 *   }
 * );
 * 
 * console.log('LUNC burn event preserved on Bitcoin!');
 * console.log('Community effort permanently recorded!');
 */

export default TerraBitcoinOpReturnInscriber;

