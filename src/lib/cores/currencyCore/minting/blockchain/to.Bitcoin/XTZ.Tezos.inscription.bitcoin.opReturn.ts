// Bitcoin OP_RETURN Inscription for Tezos
// Inscribes Tezos blockchain data/references to Bitcoin blockchain using OP_RETURN

/**
 * OVERVIEW:
 * 
 * This module inscribes Tezos (XTZ) data to Bitcoin using OP_RETURN outputs.
 * - Embed up to 80 bytes (standard) of arbitrary data on-chain
 * - Anchor Tezos operations on Bitcoin blockchain
 * - Reference FA1.2 tokens (fungible tokens)
 * - Reference FA2 tokens/NFTs (multi-asset standard)
 * - Reference Michelson smart contracts
 * - Reference bakers (validators)
 * - Reference governance proposals
 * - Cross-chain proof of existence
 * 
 * BENEFITS:
 * - Dual-blockchain immutability (Tezos + Bitcoin)
 * - Bitcoin's security for Tezos data
 * - Timestamped by Bitcoin blockchain
 * - Proof of FA token operations on Bitcoin
 * - Cross-chain verification for Tezos contracts
 * - Governance transparency
 * 
 * COSTS:
 * - Transaction fee: Variable based on network congestion (~500-5000 sats)
 * - No ongoing storage costs
 * - OP_RETURN output has 0 value
 * 
 * USE CASES:
 * - Anchor FA2 NFT mints on Bitcoin
 * - Cross-chain proof of FA1.2 token creation
 * - Timestamp Michelson contract deployments
 * - Verify token transfers on Bitcoin
 * - Dual-chain verification for Tezos operations
 * - Baker performance verification
 * - Governance proposal transparency
 * - On-chain voting proof
 * - Self-amending blockchain verification
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

export interface TezosInscriptionData {
  message: string; // Data to inscribe (will be truncated to 80 bytes)
  tezosOpHash?: string; // Tezos operation hash
  fa12TokenContract?: string; // FA1.2 token contract address
  fa2TokenContract?: string; // FA2 token contract address
  tokenId?: string; // Token ID for FA2
  contractAddress?: string; // Tezos smart contract address (KT1)
  tezosAddress?: string; // Tezos address (tz1/tz2/tz3)
  bakerAddress?: string; // Baker address
  proposalHash?: string; // Governance proposal hash
  blockLevel?: string; // Tezos block level
  metadata?: Record<string, string>; // Additional metadata (encoded as JSON)
}

export interface InscriptionResult {
  txId: string; // Bitcoin transaction ID
  txHex: string; // Raw transaction hex
  inscribedData: string; // The actual data inscribed (may be truncated)
  dataSize: number; // Size of inscribed data in bytes
  explorerUrl: string; // Block explorer URL
  tezosExplorerUrl?: string; // Tezos explorer URL if applicable
  cost: {
    feeSats: number;
    feeRate: number; // sats/vB
    totalInputSats: number;
    changeSats: number;
  };
  confirmed: boolean;
}

export class TezosBitcoinOpReturnInscriber {
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
   * Prepare inscription data with Tezos references
   */
  private prepareInscriptionData(data: TezosInscriptionData): Buffer {
    let finalMessage = data.message;

    // Add Tezos references if provided
    if (data.tezosOpHash) {
      finalMessage += `|XTZ_OP:${data.tezosOpHash}`;
    }
    if (data.fa12TokenContract) {
      finalMessage += `|FA12:${data.fa12TokenContract}`;
    }
    if (data.fa2TokenContract) {
      finalMessage += `|FA2:${data.fa2TokenContract}`;
    }
    if (data.tokenId) {
      finalMessage += `|TOKEN_ID:${data.tokenId}`;
    }
    if (data.contractAddress) {
      finalMessage += `|CONTRACT:${data.contractAddress}`;
    }
    if (data.tezosAddress) {
      finalMessage += `|XTZ_ADDR:${data.tezosAddress}`;
    }
    if (data.bakerAddress) {
      finalMessage += `|BAKER:${data.bakerAddress}`;
    }
    if (data.proposalHash) {
      finalMessage += `|PROPOSAL:${data.proposalHash}`;
    }
    if (data.blockLevel) {
      finalMessage += `|LEVEL:${data.blockLevel}`;
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
   * Get Tezos explorer URL
   */
  private getTezosExplorerUrl(
    opHash?: string,
    address?: string,
    contractAddress?: string,
    bakerAddress?: string,
    proposalHash?: string,
    blockLevel?: string,
    network: 'mainnet' | 'ghostnet' = 'mainnet'
  ): string | undefined {
    // Using TzKT as default explorer
    const explorerBase = network === 'mainnet' 
      ? 'https://tzkt.io' 
      : 'https://ghostnet.tzkt.io';

    if (opHash) {
      return `${explorerBase}/${opHash}`;
    }
    if (contractAddress) {
      return `${explorerBase}/${contractAddress}`;
    }
    if (bakerAddress) {
      return `${explorerBase}/${bakerAddress}`;
    }
    if (address) {
      return `${explorerBase}/${address}`;
    }
    if (proposalHash) {
      return `${explorerBase}/${proposalHash}`;
    }
    if (blockLevel) {
      return `${explorerBase}/${blockLevel}`;
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
   * Create and broadcast Bitcoin OP_RETURN inscription with Tezos data
   */
  async inscribe(
    privateKeyWIF: string,
    data: TezosInscriptionData,
    tezosNetwork: 'mainnet' | 'ghostnet' = 'mainnet',
    utxos?: UTXO[]
  ): Promise<InscriptionResult> {
    console.log('Starting Tezos → Bitcoin OP_RETURN inscription...');

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

    // Get Tezos explorer URL
    const tezosExplorerUrl = this.getTezosExplorerUrl(
      data.tezosOpHash,
      data.tezosAddress,
      data.contractAddress || data.fa12TokenContract || data.fa2TokenContract,
      data.bakerAddress,
      data.proposalHash,
      data.blockLevel,
      tezosNetwork
    );

    return {
      txId,
      txHex,
      inscribedData: dataBuffer.toString('utf8'),
      dataSize: dataBuffer.length,
      explorerUrl: `${explorerBase}/${txId}`,
      tezosExplorerUrl,
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
   * Inscribe Tezos operation reference
   */
  async inscribeTezosOperation(
    privateKeyWIF: string,
    tezosOpHash: string,
    message: string = 'XTZ OP',
    tezosNetwork: 'mainnet' | 'ghostnet' = 'mainnet',
    metadata?: Record<string, string>
  ): Promise<InscriptionResult> {
    return this.inscribe(
      privateKeyWIF,
      {
        message,
        tezosOpHash,
        metadata,
      },
      tezosNetwork
    );
  }

  /**
   * Inscribe FA1.2 token reference
   */
  async inscribeFA12Token(
    privateKeyWIF: string,
    fa12TokenContract: string,
    message: string = 'FA1.2 Token',
    tezosNetwork: 'mainnet' | 'ghostnet' = 'mainnet',
    metadata?: Record<string, string>
  ): Promise<InscriptionResult> {
    return this.inscribe(
      privateKeyWIF,
      {
        message,
        fa12TokenContract,
        metadata: {
          ...metadata,
          standard: 'FA1.2',
          type: 'fungible',
          chain: 'Tezos',
        },
      },
      tezosNetwork
    );
  }

  /**
   * Inscribe FA2 token/NFT reference
   */
  async inscribeFA2Token(
    privateKeyWIF: string,
    fa2TokenContract: string,
    tokenId: string,
    tezosOpHash: string,
    message: string = 'FA2 Token',
    tezosNetwork: 'mainnet' | 'ghostnet' = 'mainnet',
    metadata?: Record<string, string>
  ): Promise<InscriptionResult> {
    return this.inscribe(
      privateKeyWIF,
      {
        message,
        fa2TokenContract,
        tokenId,
        tezosOpHash,
        metadata: {
          ...metadata,
          standard: 'FA2',
          type: metadata?.type || 'multi-asset',
          chain: 'Tezos',
        },
      },
      tezosNetwork
    );
  }

  /**
   * Inscribe Michelson smart contract reference
   */
  async inscribeMichelsonContract(
    privateKeyWIF: string,
    contractAddress: string,
    message: string = 'Michelson Contract',
    tezosNetwork: 'mainnet' | 'ghostnet' = 'mainnet',
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
          language: 'Michelson',
          chain: 'Tezos',
        },
      },
      tezosNetwork
    );
  }

  /**
   * Inscribe Tezos baker reference
   */
  async inscribeBaker(
    privateKeyWIF: string,
    bakerAddress: string,
    message: string = 'Tezos Baker',
    tezosNetwork: 'mainnet' | 'ghostnet' = 'mainnet',
    metadata?: Record<string, string>
  ): Promise<InscriptionResult> {
    return this.inscribe(
      privateKeyWIF,
      {
        message,
        bakerAddress,
        metadata: {
          ...metadata,
          type: 'baker',
          role: 'validator',
          chain: 'Tezos',
        },
      },
      tezosNetwork
    );
  }

  /**
   * Inscribe governance proposal reference
   */
  async inscribeGovernanceProposal(
    privateKeyWIF: string,
    proposalHash: string,
    message: string = 'Tezos Proposal',
    tezosNetwork: 'mainnet' | 'ghostnet' = 'mainnet',
    metadata?: Record<string, string>
  ): Promise<InscriptionResult> {
    return this.inscribe(
      privateKeyWIF,
      {
        message,
        proposalHash,
        metadata: {
          ...metadata,
          type: 'governance',
          self_amending: 'true',
          chain: 'Tezos',
        },
      },
      tezosNetwork
    );
  }

  /**
   * Inscribe Tezos block level checkpoint
   */
  async inscribeTezosBlock(
    privateKeyWIF: string,
    blockLevel: string,
    message: string = 'Tezos Block',
    tezosNetwork: 'mainnet' | 'ghostnet' = 'mainnet',
    metadata?: Record<string, string>
  ): Promise<InscriptionResult> {
    return this.inscribe(
      privateKeyWIF,
      {
        message,
        blockLevel,
        metadata: {
          ...metadata,
          type: 'block_checkpoint',
          chain: 'Tezos',
        },
      },
      tezosNetwork
    );
  }

  /**
   * Inscribe delegation operation
   */
  async inscribeDelegation(
    privateKeyWIF: string,
    tezosOpHash: string,
    delegator: string,
    baker: string,
    amount: string,
    message: string = 'Tezos Delegation',
    tezosNetwork: 'mainnet' | 'ghostnet' = 'mainnet',
    metadata?: Record<string, string>
  ): Promise<InscriptionResult> {
    return this.inscribe(
      privateKeyWIF,
      {
        message,
        tezosOpHash,
        tezosAddress: delegator,
        bakerAddress: baker,
        metadata: {
          ...metadata,
          type: 'delegation',
          amount,
          mechanism: 'liquid_PoS',
          chain: 'Tezos',
        },
      },
      tezosNetwork
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
   * Parse Tezos data from OP_RETURN
   */
  parseTezosData(opReturnData: string): {
    message: string;
    tezosOpHash?: string;
    fa12TokenContract?: string;
    fa2TokenContract?: string;
    tokenId?: string;
    contractAddress?: string;
    tezosAddress?: string;
    bakerAddress?: string;
    proposalHash?: string;
    blockLevel?: string;
    metadata?: Record<string, string>;
  } {
    const parts = opReturnData.split('|');
    const result: any = { message: parts[0] };

    for (let i = 1; i < parts.length; i++) {
      const part = parts[i];
      if (part.startsWith('XTZ_OP:')) {
        result.tezosOpHash = part.substring(7);
      } else if (part.startsWith('FA12:')) {
        result.fa12TokenContract = part.substring(5);
      } else if (part.startsWith('FA2:')) {
        result.fa2TokenContract = part.substring(4);
      } else if (part.startsWith('TOKEN_ID:')) {
        result.tokenId = part.substring(9);
      } else if (part.startsWith('CONTRACT:')) {
        result.contractAddress = part.substring(9);
      } else if (part.startsWith('XTZ_ADDR:')) {
        result.tezosAddress = part.substring(9);
      } else if (part.startsWith('BAKER:')) {
        result.bakerAddress = part.substring(6);
      } else if (part.startsWith('PROPOSAL:')) {
        result.proposalHash = part.substring(9);
      } else if (part.startsWith('LEVEL:')) {
        result.blockLevel = part.substring(6);
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
 * // Initialize inscriber for Tezos
 * import { TezosBitcoinOpReturnInscriber } from './XTZ.Tezos.inscription.bitcoin.opReturn';
 * 
 * const inscriber = new TezosBitcoinOpReturnInscriber({
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
 * // 1. Inscribe Tezos Operation
 * const opResult = await inscriber.inscribeTezosOperation(
 *   privateKey,
 *   'OPERATION_HASH_HERE',
 *   'XTZ Transfer',
 *   'mainnet',
 *   { amount: '100 XTZ', type: 'transaction', from: 'tz1...', to: 'tz1...' }
 * );
 * console.log('Tezos operation anchored on Bitcoin:', opResult.txId);
 * console.log('View on Bitcoin:', opResult.explorerUrl);
 * console.log('View on TzKT:', opResult.tezosExplorerUrl);
 * 
 * // 2. Inscribe FA1.2 Token
 * const fa12Result = await inscriber.inscribeFA12Token(
 *   privateKey,
 *   'KT1FA12_CONTRACT',
 *   'FA1.2 Token',
 *   'mainnet',
 *   { 
 *     symbol: 'TZT',
 *     name: 'Tezos Token',
 *     decimals: '8',
 *     standard: 'FA1.2'
 *   }
 * );
 * console.log('FA1.2 token anchored:', fa12Result.txId);
 * 
 * // 3. Inscribe FA2 NFT
 * const fa2Result = await inscriber.inscribeFA2Token(
 *   privateKey,
 *   'KT1FA2_CONTRACT',
 *   '42',
 *   'MINT_OP_HASH',
 *   'Tezos NFT #42',
 *   'mainnet',
 *   { 
 *     collection: 'Tezos Domains',
 *     type: 'nft',
 *     rarity: 'rare',
 *     standard: 'FA2'
 *   }
 * );
 * console.log('FA2 NFT anchored on Bitcoin!');
 * console.log('Bitcoin TX:', fa2Result.txId);
 * console.log('View NFT on TzKT:', fa2Result.tezosExplorerUrl);
 * 
 * // 4. Inscribe Michelson Smart Contract
 * const contractResult = await inscriber.inscribeMichelsonContract(
 *   privateKey,
 *   'KT1CONTRACT_ADDRESS',
 *   'Plenty DeFi',
 *   'mainnet',
 *   { 
 *     type: 'DEX',
 *     protocol: 'Plenty',
 *     language: 'Michelson',
 *     formal_verification: 'true'
 *   }
 * );
 * console.log('Michelson contract anchored:', contractResult.txId);
 * 
 * // 5. Inscribe Baker
 * const bakerResult = await inscriber.inscribeBaker(
 *   privateKey,
 *   'tz1BAKER_ADDRESS',
 *   'Tezos Baker',
 *   'mainnet',
 *   { 
 *     name: 'MyBaker',
 *     fee: '5%',
 *     capacity: '90%',
 *     reliable: 'true'
 *   }
 * );
 * console.log('Baker anchored:', bakerResult.txId);
 * 
 * // 6. Inscribe Governance Proposal
 * const proposalResult = await inscriber.inscribeGovernanceProposal(
 *   privateKey,
 *   'PROPOSAL_HASH',
 *   'Protocol Upgrade',
 *   'mainnet',
 *   { 
 *     upgrade: 'Paris',
 *     type: 'protocol_amendment',
 *     status: 'adopted',
 *     self_amending: 'true'
 *   }
 * );
 * console.log('Governance proposal anchored:', proposalResult.txId);
 * 
 * // 7. Inscribe Delegation
 * const delegationResult = await inscriber.inscribeDelegation(
 *   privateKey,
 *   'DELEGATION_OP_HASH',
 *   'tz1DELEGATOR',
 *   'tz1BAKER',
 *   '10000 XTZ',
 *   'Liquid Staking',
 *   'mainnet',
 *   { 
 *     mechanism: 'liquid_PoS',
 *     rewards: 'automatic',
 *     lock: 'none'
 *   }
 * );
 * console.log('Delegation anchored:', delegationResult.txId);
 * 
 * // 8. Inscribe Block Level Checkpoint
 * const blockResult = await inscriber.inscribeTezosBlock(
 *   privateKey,
 *   '4000000',
 *   'Tezos Level 4M',
 *   'mainnet',
 *   { 
 *     milestone: '4M levels',
 *     timestamp: new Date().toISOString(),
 *     consensus: 'liquid_PoS'
 *   }
 * );
 * console.log('Block checkpoint anchored:', blockResult.txId);
 * 
 * // 9. Read and parse inscribed data
 * const opReturnData = await inscriber.getOpReturnData(fa2Result.txId);
 * console.log('Raw OP_RETURN data:', opReturnData);
 * 
 * if (opReturnData) {
 *   const parsed = inscriber.parseTezosData(opReturnData);
 *   console.log('Parsed Tezos data:', parsed);
 *   console.log('FA2 Contract:', parsed.fa2TokenContract);
 *   console.log('Token ID:', parsed.tokenId);
 *   console.log('Metadata:', parsed.metadata);
 * }
 * 
 * // 10. Cross-chain workflow: Tezos NFT → Bitcoin
 * // Step 1: Mint NFT on Tezos (using Taquito)
 * const fa2Contract = 'KT1FA2_NFT_CONTRACT';
 * const tokenId = '1337';
 * const mintOpHash = 'MINT_OP_HASH';
 * 
 * // Step 2: Anchor on Bitcoin
 * const anchor = await inscriber.inscribeFA2Token(
 *   privateKey,
 *   fa2Contract,
 *   tokenId,
 *   mintOpHash,
 *   'Tezos Domain: alice.tez',
 *   'mainnet',
 *   {
 *     domain: 'alice.tez',
 *     type: 'domain_nft',
 *     collection: 'Tezos Domains',
 *     verified: 'true',
 *     crosschain: 'true'
 *   }
 * );
 * 
 * console.log('🎉 NFT anchored on Bitcoin!');
 * console.log('Tezos:', anchor.tezosExplorerUrl);
 * console.log('Bitcoin:', anchor.explorerUrl);
 * console.log('Self-amending blockchain NFT on Bitcoin!');
 * 
 * // 11. DeFi Protocol Deployment on Tezos
 * const defiDeploy = await inscriber.inscribeMichelsonContract(
 *   privateKey,
 *   'KT1QUIPUSWAP',
 *   'QuipuSwap DEX',
 *   'mainnet',
 *   {
 *     type: 'DEX',
 *     protocol: 'QuipuSwap',
 *     version: 'V3',
 *     tvl: '$50M+',
 *     language: 'Michelson',
 *     formal_verification: 'true'
 *   }
 * );
 * 
 * console.log('Tezos DeFi protocol anchored!');
 * console.log('Formally verified contract on Bitcoin!');
 * 
 * // 12. Self-Amending Protocol Upgrade
 * const protocolUpgrade = await inscriber.inscribeGovernanceProposal(
 *   privateKey,
 *   'PARIS_PROPOSAL',
 *   'Paris Protocol Upgrade',
 *   'mainnet',
 *   {
 *     name: 'Paris',
 *     type: 'protocol_upgrade',
 *     features: 'tickets,smart_rollups',
 *     adopted: 'true',
 *     self_amending: 'true',
 *     on_chain_governance: 'true'
 *   }
 * );
 * 
 * console.log('Protocol upgrade anchored on Bitcoin!');
 * console.log('Self-amending blockchain governance preserved!');
 * 
 * // 13. Liquid Staking Proof
 * const liquidStaking = await inscriber.inscribeDelegation(
 *   privateKey,
 *   'DELEGATION_TX',
 *   'tz1USER',
 *   'tz1TOPBAKER',
 *   '50000 XTZ',
 *   'Liquid Staking',
 *   'mainnet',
 *   {
 *     amount: '50000 XTZ',
 *     mechanism: 'liquid_PoS',
 *     locked: 'false',
 *     rewards: 'compound',
 *     baker_fee: '5%'
 *   }
 * );
 * 
 * console.log('Liquid staking anchored!');
 * console.log('No lock-up period, immediate liquidity!');
 * 
 * // 14. Tezos Domains NFT Collection
 * const domainNFT = await inscriber.inscribeFA2Token(
 *   privateKey,
 *   'KT1TEZOS_DOMAINS',
 *   '999',
 *   'DOMAIN_MINT_OP',
 *   'Tezos Domain: satoshi.tez',
 *   'mainnet',
 *   {
 *     domain: 'satoshi.tez',
 *     type: 'domain_nft',
 *     collection: 'Tezos Domains',
 *     expiry: '2030-01-01',
 *     verified: 'true'
 *   }
 * );
 * 
 * console.log('Tezos Domain NFT anchored!');
 * console.log('Decentralized identity on Bitcoin!');
 */

export default TezosBitcoinOpReturnInscriber;

