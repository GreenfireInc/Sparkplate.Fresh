// Bitcoin OP_RETURN Inscription for Ethereum Classic
// Inscribes Ethereum Classic blockchain data/references to Bitcoin blockchain using OP_RETURN

/**
 * OVERVIEW:
 * 
 * This module inscribes Ethereum Classic (ETC) data to Bitcoin using OP_RETURN outputs.
 * - Embed up to 80 bytes (standard) of arbitrary data on-chain
 * - Anchor ETC transactions on Bitcoin blockchain
 * - Reference ERC-20 tokens (fungible tokens on ETC)
 * - Reference ERC-721 NFTs (non-fungible tokens on ETC)
 * - Reference ERC-1155 multi-tokens
 * - Reference ETC smart contracts
 * - Cross-chain proof of existence
 * 
 * BENEFITS:
 * - Dual-blockchain immutability (Ethereum Classic + Bitcoin)
 * - Bitcoin's security for ETC data
 * - Timestamped by Bitcoin blockchain
 * - Proof of ERC token operations on Bitcoin
 * - Cross-chain verification for ETC contracts
 * 
 * COSTS:
 * - Transaction fee: Variable based on network congestion (~500-5000 sats)
 * - No ongoing storage costs
 * - OP_RETURN output has 0 value
 * 
 * USE CASES:
 * - Anchor ERC-721 NFT mints on Bitcoin
 * - Cross-chain proof of ERC-20 token creation
 * - Timestamp ETC smart contract deployments
 * - Verify token transfers on Bitcoin
 * - Dual-chain verification for ETC transactions
 * - Bridge anchoring between Ethereum Classic and Bitcoin
 * - Immutable proof for ETC DApp operations
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

export interface ETCInscriptionData {
  message: string; // Data to inscribe (will be truncated to 80 bytes)
  etcTxHash?: string; // ETC transaction hash
  erc20TokenAddress?: string; // ERC-20 token contract address
  erc721TokenAddress?: string; // ERC-721 NFT contract address
  erc1155TokenAddress?: string; // ERC-1155 multi-token contract address
  contractAddress?: string; // ETC smart contract address
  etcAddress?: string; // ETC wallet address (0x...)
  tokenId?: string; // Token ID for NFTs
  blockNumber?: string; // ETC block number
  metadata?: Record<string, string>; // Additional metadata (encoded as JSON)
}

export interface InscriptionResult {
  txId: string; // Bitcoin transaction ID
  txHex: string; // Raw transaction hex
  inscribedData: string; // The actual data inscribed (may be truncated)
  dataSize: number; // Size of inscribed data in bytes
  explorerUrl: string; // Block explorer URL
  etcExplorerUrl?: string; // ETC explorer URL if applicable
  cost: {
    feeSats: number;
    feeRate: number; // sats/vB
    totalInputSats: number;
    changeSats: number;
  };
  confirmed: boolean;
}

export class ETCBitcoinOpReturnInscriber {
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
   * Prepare inscription data with ETC references
   */
  private prepareInscriptionData(data: ETCInscriptionData): Buffer {
    let finalMessage = data.message;

    // Add ETC references if provided
    if (data.etcTxHash) {
      finalMessage += `|ETC_TX:${data.etcTxHash}`;
    }
    if (data.erc20TokenAddress) {
      finalMessage += `|ERC20:${data.erc20TokenAddress}`;
    }
    if (data.erc721TokenAddress) {
      finalMessage += `|ERC721:${data.erc721TokenAddress}`;
    }
    if (data.erc1155TokenAddress) {
      finalMessage += `|ERC1155:${data.erc1155TokenAddress}`;
    }
    if (data.contractAddress) {
      finalMessage += `|ETC_CONTRACT:${data.contractAddress}`;
    }
    if (data.etcAddress) {
      finalMessage += `|ETC_ADDR:${data.etcAddress}`;
    }
    if (data.tokenId) {
      finalMessage += `|TOKEN_ID:${data.tokenId}`;
    }
    if (data.blockNumber) {
      finalMessage += `|BLOCK:${data.blockNumber}`;
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
   * Get ETC explorer URL
   */
  private getETCExplorerUrl(
    txHash?: string,
    contractAddress?: string,
    address?: string,
    tokenId?: string,
    blockNumber?: string,
    network: 'mainnet' | 'testnet' = 'mainnet'
  ): string | undefined {
    // Using BlockScout as default explorer for Ethereum Classic
    const explorerBase = network === 'mainnet' 
      ? 'https://blockscout.com/etc/mainnet' 
      : 'https://blockscout.com/etc/mordor'; // Mordor is ETC testnet

    if (txHash) {
      return `${explorerBase}/tx/${txHash}`;
    }
    if (contractAddress && tokenId) {
      return `${explorerBase}/token/${contractAddress}/instance/${tokenId}`;
    }
    if (contractAddress) {
      return `${explorerBase}/address/${contractAddress}`;
    }
    if (address) {
      return `${explorerBase}/address/${address}`;
    }
    if (blockNumber) {
      return `${explorerBase}/block/${blockNumber}`;
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
   * Create and broadcast Bitcoin OP_RETURN inscription with ETC data
   */
  async inscribe(
    privateKeyWIF: string,
    data: ETCInscriptionData,
    etcNetwork: 'mainnet' | 'testnet' = 'mainnet',
    utxos?: UTXO[]
  ): Promise<InscriptionResult> {
    console.log('Starting Ethereum Classic → Bitcoin OP_RETURN inscription...');

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

    // Get ETC explorer URL
    const etcExplorerUrl = this.getETCExplorerUrl(
      data.etcTxHash,
      data.erc721TokenAddress || data.erc20TokenAddress || data.erc1155TokenAddress || data.contractAddress,
      data.etcAddress,
      data.tokenId,
      data.blockNumber,
      etcNetwork
    );

    return {
      txId,
      txHex,
      inscribedData: dataBuffer.toString('utf8'),
      dataSize: dataBuffer.length,
      explorerUrl: `${explorerBase}/${txId}`,
      etcExplorerUrl,
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
   * Inscribe ETC transaction reference
   */
  async inscribeETCTransaction(
    privateKeyWIF: string,
    etcTxHash: string,
    message: string = 'ETC TX',
    etcNetwork: 'mainnet' | 'testnet' = 'mainnet',
    metadata?: Record<string, string>
  ): Promise<InscriptionResult> {
    return this.inscribe(
      privateKeyWIF,
      {
        message,
        etcTxHash,
        metadata,
      },
      etcNetwork
    );
  }

  /**
   * Inscribe ERC-20 token reference on ETC
   */
  async inscribeERC20Token(
    privateKeyWIF: string,
    erc20TokenAddress: string,
    message: string = 'ERC-20 on ETC',
    etcNetwork: 'mainnet' | 'testnet' = 'mainnet',
    metadata?: Record<string, string>
  ): Promise<InscriptionResult> {
    return this.inscribe(
      privateKeyWIF,
      {
        message,
        erc20TokenAddress,
        metadata: {
          ...metadata,
          standard: 'ERC-20',
          type: 'fungible',
          chain: 'ETC',
        },
      },
      etcNetwork
    );
  }

  /**
   * Inscribe ERC-721 NFT reference on ETC
   */
  async inscribeERC721NFT(
    privateKeyWIF: string,
    erc721TokenAddress: string,
    tokenId: string,
    etcTxHash: string,
    message: string = 'ERC-721 NFT on ETC',
    etcNetwork: 'mainnet' | 'testnet' = 'mainnet',
    metadata?: Record<string, string>
  ): Promise<InscriptionResult> {
    return this.inscribe(
      privateKeyWIF,
      {
        message,
        erc721TokenAddress,
        tokenId,
        etcTxHash,
        metadata: {
          ...metadata,
          standard: 'ERC-721',
          type: 'nft',
          chain: 'ETC',
        },
      },
      etcNetwork
    );
  }

  /**
   * Inscribe ERC-1155 multi-token reference on ETC
   */
  async inscribeERC1155Token(
    privateKeyWIF: string,
    erc1155TokenAddress: string,
    tokenId: string,
    message: string = 'ERC-1155 on ETC',
    etcNetwork: 'mainnet' | 'testnet' = 'mainnet',
    metadata?: Record<string, string>
  ): Promise<InscriptionResult> {
    return this.inscribe(
      privateKeyWIF,
      {
        message,
        erc1155TokenAddress,
        tokenId,
        metadata: {
          ...metadata,
          standard: 'ERC-1155',
          type: 'multi-token',
          chain: 'ETC',
        },
      },
      etcNetwork
    );
  }

  /**
   * Inscribe ETC smart contract reference
   */
  async inscribeETCContract(
    privateKeyWIF: string,
    contractAddress: string,
    message: string = 'ETC Contract',
    etcNetwork: 'mainnet' | 'testnet' = 'mainnet',
    metadata?: Record<string, string>
  ): Promise<InscriptionResult> {
    return this.inscribe(
      privateKeyWIF,
      {
        message,
        contractAddress,
        metadata: {
          ...metadata,
          chain: 'ETC',
        },
      },
      etcNetwork
    );
  }

  /**
   * Inscribe ETC block reference
   */
  async inscribeETCBlock(
    privateKeyWIF: string,
    blockNumber: string,
    message: string = 'ETC Block',
    etcNetwork: 'mainnet' | 'testnet' = 'mainnet',
    metadata?: Record<string, string>
  ): Promise<InscriptionResult> {
    return this.inscribe(
      privateKeyWIF,
      {
        message,
        blockNumber,
        metadata: {
          ...metadata,
          type: 'block',
          chain: 'ETC',
        },
      },
      etcNetwork
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
   * Parse ETC data from OP_RETURN
   */
  parseETCData(opReturnData: string): {
    message: string;
    etcTxHash?: string;
    erc20TokenAddress?: string;
    erc721TokenAddress?: string;
    erc1155TokenAddress?: string;
    contractAddress?: string;
    etcAddress?: string;
    tokenId?: string;
    blockNumber?: string;
    metadata?: Record<string, string>;
  } {
    const parts = opReturnData.split('|');
    const result: any = { message: parts[0] };

    for (let i = 1; i < parts.length; i++) {
      const part = parts[i];
      if (part.startsWith('ETC_TX:')) {
        result.etcTxHash = part.substring(7);
      } else if (part.startsWith('ERC20:')) {
        result.erc20TokenAddress = part.substring(6);
      } else if (part.startsWith('ERC721:')) {
        result.erc721TokenAddress = part.substring(7);
      } else if (part.startsWith('ERC1155:')) {
        result.erc1155TokenAddress = part.substring(8);
      } else if (part.startsWith('ETC_CONTRACT:')) {
        result.contractAddress = part.substring(13);
      } else if (part.startsWith('ETC_ADDR:')) {
        result.etcAddress = part.substring(9);
      } else if (part.startsWith('TOKEN_ID:')) {
        result.tokenId = part.substring(9);
      } else if (part.startsWith('BLOCK:')) {
        result.blockNumber = part.substring(6);
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
 * import { ETCBitcoinOpReturnInscriber } from './ETC.EthereumClassic.inscription.bitcoin.opReturn';
 * 
 * const inscriber = new ETCBitcoinOpReturnInscriber({
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
 * // 1. Inscribe ETC Transaction
 * const txResult = await inscriber.inscribeETCTransaction(
 *   privateKey,
 *   '0xETC_TX_HASH_HERE',
 *   'ETC Transfer',
 *   'mainnet',
 *   { amount: '10 ETC', type: 'transfer', from: '0x...', to: '0x...' }
 * );
 * console.log('ETC TX anchored on Bitcoin:', txResult.txId);
 * console.log('View on Bitcoin:', txResult.explorerUrl);
 * console.log('View on BlockScout:', txResult.etcExplorerUrl);
 * 
 * // 2. Inscribe ERC-20 Token on ETC
 * const tokenResult = await inscriber.inscribeERC20Token(
 *   privateKey,
 *   '0xTOKEN_CONTRACT_ADDRESS', // ERC-20 token address on ETC
 *   'ETC Token',
 *   'mainnet',
 *   { symbol: 'ETCT', supply: '1000000', decimals: '18', name: 'ETC Token' }
 * );
 * console.log('ERC-20 token on ETC anchored:', tokenResult.txId);
 * 
 * // 3. Inscribe ERC-721 NFT on ETC
 * const nftResult = await inscriber.inscribeERC721NFT(
 *   privateKey,
 *   '0xNFT_CONTRACT_ADDRESS',
 *   '42', // Token ID
 *   '0xMINT_TX_HASH',
 *   'ETC NFT #42',
 *   'mainnet',
 *   { 
 *     collection: 'Classic Art Collection',
 *     artist: 'Digital Artist',
 *     rarity: 'legendary',
 *     platform: 'ETC'
 *   }
 * );
 * console.log('ERC-721 NFT on ETC anchored on Bitcoin!');
 * console.log('Bitcoin TX:', nftResult.txId);
 * console.log('View NFT on BlockScout:', nftResult.etcExplorerUrl);
 * 
 * // 4. Inscribe ERC-1155 Multi-Token on ETC
 * const multiTokenResult = await inscriber.inscribeERC1155Token(
 *   privateKey,
 *   '0xMULTI_TOKEN_ADDRESS',
 *   '123', // Token ID
 *   'Gaming Asset on ETC',
 *   'mainnet',
 *   { type: 'weapon', level: '5', supply: '100', game: 'ETC Game' }
 * );
 * console.log('ERC-1155 token on ETC anchored:', multiTokenResult.txId);
 * 
 * // 5. Inscribe ETC Smart Contract
 * const contractResult = await inscriber.inscribeETCContract(
 *   privateKey,
 *   '0xCONTRACT_ADDRESS',
 *   'DeFi Protocol on ETC',
 *   'mainnet',
 *   { type: 'DEX', version: '2.0', deployed: new Date().toISOString(), chain: 'ETC' }
 * );
 * console.log('ETC contract anchored:', contractResult.txId);
 * 
 * // 6. Inscribe ETC Block (for checkpointing)
 * const blockResult = await inscriber.inscribeETCBlock(
 *   privateKey,
 *   '15000000', // Block number
 *   'ETC Block Checkpoint',
 *   'mainnet',
 *   { timestamp: new Date().toISOString(), milestone: 'true' }
 * );
 * console.log('ETC block anchored:', blockResult.txId);
 * 
 * // 7. Read and parse inscribed data
 * const opReturnData = await inscriber.getOpReturnData(nftResult.txId);
 * console.log('Raw OP_RETURN data:', opReturnData);
 * 
 * if (opReturnData) {
 *   const parsed = inscriber.parseETCData(opReturnData);
 *   console.log('Parsed ETC data:', parsed);
 *   console.log('ERC-721 Address:', parsed.erc721TokenAddress);
 *   console.log('Token ID:', parsed.tokenId);
 *   console.log('Metadata:', parsed.metadata);
 * }
 * 
 * // 8. Cross-chain workflow: ETC NFT → Bitcoin
 * // Step 1: Mint NFT on Ethereum Classic (using web3.js or ethers.js)
 * const nftContract = '0xETC_NFT_CONTRACT';
 * const mintTxHash = '0xMINT_TX';
 * const tokenId = '1337';
 * 
 * // Step 2: Anchor on Bitcoin
 * const anchor = await inscriber.inscribeERC721NFT(
 *   privateKey,
 *   nftContract,
 *   tokenId,
 *   mintTxHash,
 *   'Classic NFT #1337',
 *   'mainnet',
 *   {
 *     platform: 'Ethereum Classic',
 *     collection: 'Classic Art',
 *     rarity: 'epic',
 *     crosschain: 'true',
 *     original: 'true' // Original Ethereum chain
 *   }
 * );
 * 
 * console.log('🎉 NFT anchored on Bitcoin!');
 * console.log('Ethereum Classic:', anchor.etcExplorerUrl);
 * console.log('Bitcoin:', anchor.explorerUrl);
 * console.log('This NFT is now provably anchored on both blockchains!');
 * 
 * // 9. DeFi Protocol Deployment Proof on ETC
 * const defiDeploy = await inscriber.inscribeETCContract(
 *   privateKey,
 *   '0xDEFI_PROTOCOL',
 *   'ClassicSwap DEX',
 *   'mainnet',
 *   {
 *     type: 'AMM',
 *     chain: 'Ethereum Classic',
 *     tvl: '$5M',
 *     deployed: new Date().toISOString(),
 *     audit: 'Audited'
 *   }
 * );
 * 
 * console.log('DeFi protocol on ETC deployment anchored on Bitcoin!');
 * console.log('Immutable proof of deployment time and parameters!');
 * 
 * // 10. ETC Hard Fork Checkpoint
 * // Anchor critical block numbers during network upgrades
 * const forkCheckpoint = await inscriber.inscribeETCBlock(
 *   privateKey,
 *   '15000000',
 *   'Magneto Fork',
 *   'mainnet',
 *   {
 *     fork: 'Magneto',
 *     date: '2022-07-21',
 *     type: 'hard_fork',
 *     description: 'EIP-1559 implementation'
 *   }
 * );
 * 
 * console.log('Fork checkpoint anchored on Bitcoin!');
 * console.log('Historical network upgrade permanently recorded!');
 * 
 * // 11. Cross-chain bridge verification
 * // Anchor ETC → ETH bridge transactions
 * const bridgeTx = await inscriber.inscribeETCTransaction(
 *   privateKey,
 *   '0xBRIDGE_TX_HASH',
 *   'ETC → ETH Bridge',
 *   'mainnet',
 *   {
 *     type: 'bridge',
 *     source: 'ETC',
 *     destination: 'ETH',
 *     amount: '100 ETC',
 *     bridge: 'MultiChain'
 *   }
 * );
 * 
 * console.log('Bridge transaction verified on Bitcoin!');
 * console.log('Three-chain verification: ETC → ETH → Bitcoin!');
 */

export default ETCBitcoinOpReturnInscriber;

