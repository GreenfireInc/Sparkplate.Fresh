// Bitcoin OP_RETURN Inscription for Ethereum
// Inscribes Ethereum blockchain data/references to Bitcoin blockchain using OP_RETURN

/**
 * OVERVIEW:
 * 
 * This module inscribes Ethereum (ETH) data to Bitcoin using OP_RETURN outputs.
 * - Embed up to 80 bytes (standard) of arbitrary data on-chain
 * - Anchor ETH transactions on Bitcoin blockchain
 * - Reference ERC-20 tokens (fungible tokens)
 * - Reference ERC-721 NFTs (non-fungible tokens)
 * - Reference ERC-1155 multi-tokens
 * - Reference ETH smart contracts
 * - Reference ENS (Ethereum Name Service) domains
 * - Cross-chain proof of existence
 * 
 * BENEFITS:
 * - Dual-blockchain immutability (Ethereum + Bitcoin)
 * - Bitcoin's security for ETH data
 * - Timestamped by Bitcoin blockchain
 * - Proof of ERC token operations on Bitcoin
 * - Cross-chain verification for ETH contracts
 * - ENS domain ownership proof
 * 
 * COSTS:
 * - Transaction fee: Variable based on network congestion (~500-5000 sats)
 * - No ongoing storage costs
 * - OP_RETURN output has 0 value
 * 
 * USE CASES:
 * - Anchor ERC-721 NFT mints on Bitcoin
 * - Cross-chain proof of ERC-20 token creation
 * - Timestamp ETH smart contract deployments
 * - Verify token transfers on Bitcoin
 * - Dual-chain verification for ETH transactions
 * - Bridge anchoring between Ethereum and Bitcoin
 * - ENS domain registration proof
 * - DeFi protocol deployment verification
 * - Layer 2 rollup settlement proofs
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

export interface ETHInscriptionData {
  message: string; // Data to inscribe (will be truncated to 80 bytes)
  ethTxHash?: string; // ETH transaction hash
  erc20TokenAddress?: string; // ERC-20 token contract address
  erc721TokenAddress?: string; // ERC-721 NFT contract address
  erc1155TokenAddress?: string; // ERC-1155 multi-token contract address
  contractAddress?: string; // ETH smart contract address
  ethAddress?: string; // ETH wallet address (0x...)
  tokenId?: string; // Token ID for NFTs
  blockNumber?: string; // ETH block number
  ensDomain?: string; // ENS domain name
  layer2?: string; // Layer 2 network (optimism, arbitrum, etc.)
  metadata?: Record<string, string>; // Additional metadata (encoded as JSON)
}

export interface InscriptionResult {
  txId: string; // Bitcoin transaction ID
  txHex: string; // Raw transaction hex
  inscribedData: string; // The actual data inscribed (may be truncated)
  dataSize: number; // Size of inscribed data in bytes
  explorerUrl: string; // Block explorer URL
  ethExplorerUrl?: string; // ETH explorer URL if applicable
  cost: {
    feeSats: number;
    feeRate: number; // sats/vB
    totalInputSats: number;
    changeSats: number;
  };
  confirmed: boolean;
}

export class ETHBitcoinOpReturnInscriber {
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
   * Prepare inscription data with ETH references
   */
  private prepareInscriptionData(data: ETHInscriptionData): Buffer {
    let finalMessage = data.message;

    // Add ETH references if provided
    if (data.ethTxHash) {
      finalMessage += `|ETH_TX:${data.ethTxHash}`;
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
      finalMessage += `|ETH_CONTRACT:${data.contractAddress}`;
    }
    if (data.ethAddress) {
      finalMessage += `|ETH_ADDR:${data.ethAddress}`;
    }
    if (data.tokenId) {
      finalMessage += `|TOKEN_ID:${data.tokenId}`;
    }
    if (data.blockNumber) {
      finalMessage += `|BLOCK:${data.blockNumber}`;
    }
    if (data.ensDomain) {
      finalMessage += `|ENS:${data.ensDomain}`;
    }
    if (data.layer2) {
      finalMessage += `|L2:${data.layer2}`;
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
   * Get ETH explorer URL
   */
  private getETHExplorerUrl(
    txHash?: string,
    contractAddress?: string,
    address?: string,
    tokenId?: string,
    blockNumber?: string,
    ensDomain?: string,
    network: 'mainnet' | 'sepolia' | 'holesky' = 'mainnet'
  ): string | undefined {
    // Using Etherscan as default explorer for Ethereum
    const explorerBase = network === 'mainnet' 
      ? 'https://etherscan.io' 
      : network === 'sepolia'
      ? 'https://sepolia.etherscan.io'
      : 'https://holesky.etherscan.io';

    if (txHash) {
      return `${explorerBase}/tx/${txHash}`;
    }
    if (contractAddress && tokenId) {
      return `${explorerBase}/token/${contractAddress}?a=${tokenId}`;
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
    if (ensDomain) {
      return `https://app.ens.domains/${ensDomain}`;
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
   * Create and broadcast Bitcoin OP_RETURN inscription with ETH data
   */
  async inscribe(
    privateKeyWIF: string,
    data: ETHInscriptionData,
    ethNetwork: 'mainnet' | 'sepolia' | 'holesky' = 'mainnet',
    utxos?: UTXO[]
  ): Promise<InscriptionResult> {
    console.log('Starting Ethereum → Bitcoin OP_RETURN inscription...');

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

    // Get ETH explorer URL
    const ethExplorerUrl = this.getETHExplorerUrl(
      data.ethTxHash,
      data.erc721TokenAddress || data.erc20TokenAddress || data.erc1155TokenAddress || data.contractAddress,
      data.ethAddress,
      data.tokenId,
      data.blockNumber,
      data.ensDomain,
      ethNetwork
    );

    return {
      txId,
      txHex,
      inscribedData: dataBuffer.toString('utf8'),
      dataSize: dataBuffer.length,
      explorerUrl: `${explorerBase}/${txId}`,
      ethExplorerUrl,
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
   * Inscribe ETH transaction reference
   */
  async inscribeETHTransaction(
    privateKeyWIF: string,
    ethTxHash: string,
    message: string = 'ETH TX',
    ethNetwork: 'mainnet' | 'sepolia' | 'holesky' = 'mainnet',
    metadata?: Record<string, string>
  ): Promise<InscriptionResult> {
    return this.inscribe(
      privateKeyWIF,
      {
        message,
        ethTxHash,
        metadata,
      },
      ethNetwork
    );
  }

  /**
   * Inscribe ERC-20 token reference
   */
  async inscribeERC20Token(
    privateKeyWIF: string,
    erc20TokenAddress: string,
    message: string = 'ERC-20 Token',
    ethNetwork: 'mainnet' | 'sepolia' | 'holesky' = 'mainnet',
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
          chain: 'ETH',
        },
      },
      ethNetwork
    );
  }

  /**
   * Inscribe ERC-721 NFT reference
   */
  async inscribeERC721NFT(
    privateKeyWIF: string,
    erc721TokenAddress: string,
    tokenId: string,
    ethTxHash: string,
    message: string = 'ERC-721 NFT',
    ethNetwork: 'mainnet' | 'sepolia' | 'holesky' = 'mainnet',
    metadata?: Record<string, string>
  ): Promise<InscriptionResult> {
    return this.inscribe(
      privateKeyWIF,
      {
        message,
        erc721TokenAddress,
        tokenId,
        ethTxHash,
        metadata: {
          ...metadata,
          standard: 'ERC-721',
          type: 'nft',
          chain: 'ETH',
        },
      },
      ethNetwork
    );
  }

  /**
   * Inscribe ERC-1155 multi-token reference
   */
  async inscribeERC1155Token(
    privateKeyWIF: string,
    erc1155TokenAddress: string,
    tokenId: string,
    message: string = 'ERC-1155 Token',
    ethNetwork: 'mainnet' | 'sepolia' | 'holesky' = 'mainnet',
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
          chain: 'ETH',
        },
      },
      ethNetwork
    );
  }

  /**
   * Inscribe ETH smart contract reference
   */
  async inscribeETHContract(
    privateKeyWIF: string,
    contractAddress: string,
    message: string = 'ETH Contract',
    ethNetwork: 'mainnet' | 'sepolia' | 'holesky' = 'mainnet',
    metadata?: Record<string, string>
  ): Promise<InscriptionResult> {
    return this.inscribe(
      privateKeyWIF,
      {
        message,
        contractAddress,
        metadata: {
          ...metadata,
          chain: 'ETH',
        },
      },
      ethNetwork
    );
  }

  /**
   * Inscribe ENS domain reference
   */
  async inscribeENSDomain(
    privateKeyWIF: string,
    ensDomain: string,
    ethAddress: string,
    message: string = 'ENS Domain',
    ethNetwork: 'mainnet' | 'sepolia' | 'holesky' = 'mainnet',
    metadata?: Record<string, string>
  ): Promise<InscriptionResult> {
    return this.inscribe(
      privateKeyWIF,
      {
        message,
        ensDomain,
        ethAddress,
        metadata: {
          ...metadata,
          type: 'ens',
          service: 'ENS',
        },
      },
      ethNetwork
    );
  }

  /**
   * Inscribe ETH block reference
   */
  async inscribeETHBlock(
    privateKeyWIF: string,
    blockNumber: string,
    message: string = 'ETH Block',
    ethNetwork: 'mainnet' | 'sepolia' | 'holesky' = 'mainnet',
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
          chain: 'ETH',
        },
      },
      ethNetwork
    );
  }

  /**
   * Inscribe Layer 2 transaction reference
   */
  async inscribeLayer2Transaction(
    privateKeyWIF: string,
    l2TxHash: string,
    layer2Network: string,
    message: string = 'L2 TX',
    ethNetwork: 'mainnet' | 'sepolia' | 'holesky' = 'mainnet',
    metadata?: Record<string, string>
  ): Promise<InscriptionResult> {
    return this.inscribe(
      privateKeyWIF,
      {
        message,
        ethTxHash: l2TxHash,
        layer2: layer2Network,
        metadata: {
          ...metadata,
          type: 'layer2',
          network: layer2Network,
        },
      },
      ethNetwork
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
   * Parse ETH data from OP_RETURN
   */
  parseETHData(opReturnData: string): {
    message: string;
    ethTxHash?: string;
    erc20TokenAddress?: string;
    erc721TokenAddress?: string;
    erc1155TokenAddress?: string;
    contractAddress?: string;
    ethAddress?: string;
    tokenId?: string;
    blockNumber?: string;
    ensDomain?: string;
    layer2?: string;
    metadata?: Record<string, string>;
  } {
    const parts = opReturnData.split('|');
    const result: any = { message: parts[0] };

    for (let i = 1; i < parts.length; i++) {
      const part = parts[i];
      if (part.startsWith('ETH_TX:')) {
        result.ethTxHash = part.substring(7);
      } else if (part.startsWith('ERC20:')) {
        result.erc20TokenAddress = part.substring(6);
      } else if (part.startsWith('ERC721:')) {
        result.erc721TokenAddress = part.substring(7);
      } else if (part.startsWith('ERC1155:')) {
        result.erc1155TokenAddress = part.substring(8);
      } else if (part.startsWith('ETH_CONTRACT:')) {
        result.contractAddress = part.substring(13);
      } else if (part.startsWith('ETH_ADDR:')) {
        result.ethAddress = part.substring(9);
      } else if (part.startsWith('TOKEN_ID:')) {
        result.tokenId = part.substring(9);
      } else if (part.startsWith('BLOCK:')) {
        result.blockNumber = part.substring(6);
      } else if (part.startsWith('ENS:')) {
        result.ensDomain = part.substring(4);
      } else if (part.startsWith('L2:')) {
        result.layer2 = part.substring(3);
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
 * import { ETHBitcoinOpReturnInscriber } from './ETH.Ethereum.inscription.bitcoin.opReturn';
 * 
 * const inscriber = new ETHBitcoinOpReturnInscriber({
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
 * // 1. Inscribe ETH Transaction
 * const txResult = await inscriber.inscribeETHTransaction(
 *   privateKey,
 *   '0xETH_TX_HASH_HERE',
 *   'ETH Transfer',
 *   'mainnet',
 *   { amount: '1.5 ETH', type: 'transfer', from: '0x...', to: '0x...' }
 * );
 * console.log('ETH TX anchored on Bitcoin:', txResult.txId);
 * console.log('View on Bitcoin:', txResult.explorerUrl);
 * console.log('View on Etherscan:', txResult.ethExplorerUrl);
 * 
 * // 2. Inscribe ERC-20 Token (e.g., USDT, USDC, DAI)
 * const tokenResult = await inscriber.inscribeERC20Token(
 *   privateKey,
 *   '0xdAC17F958D2ee523a2206206994597C13D831ec7', // USDT contract
 *   'USDT Token',
 *   'mainnet',
 *   { symbol: 'USDT', name: 'Tether USD', decimals: '6', supply: '100B+' }
 * );
 * console.log('ERC-20 token anchored:', tokenResult.txId);
 * 
 * // 3. Inscribe ERC-721 NFT (e.g., Bored Ape, CryptoPunk)
 * const nftResult = await inscriber.inscribeERC721NFT(
 *   privateKey,
 *   '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D', // BAYC contract
 *   '1337', // Token ID
 *   '0xMINT_TX_HASH',
 *   'Bored Ape #1337',
 *   'mainnet',
 *   { 
 *     collection: 'Bored Ape Yacht Club',
 *     rarity: 'legendary',
 *     traits: 'gold_fur,laser_eyes'
 *   }
 * );
 * console.log('ERC-721 NFT anchored on Bitcoin!');
 * console.log('Bitcoin TX:', nftResult.txId);
 * console.log('View NFT on Etherscan:', nftResult.ethExplorerUrl);
 * 
 * // 4. Inscribe ERC-1155 Multi-Token
 * const multiTokenResult = await inscriber.inscribeERC1155Token(
 *   privateKey,
 *   '0xMULTI_TOKEN_ADDRESS',
 *   '42', // Token ID
 *   'Gaming Asset',
 *   'mainnet',
 *   { type: 'weapon', level: '100', rarity: 'mythic' }
 * );
 * console.log('ERC-1155 token anchored:', multiTokenResult.txId);
 * 
 * // 5. Inscribe ETH Smart Contract (e.g., Uniswap, Aave)
 * const contractResult = await inscriber.inscribeETHContract(
 *   privateKey,
 *   '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D', // Uniswap V2 Router
 *   'Uniswap V2 Router',
 *   'mainnet',
 *   { type: 'DEX', protocol: 'Uniswap', version: 'V2', deployed: '2020-05-05' }
 * );
 * console.log('ETH contract anchored:', contractResult.txId);
 * 
 * // 6. Inscribe ENS Domain
 * const ensResult = await inscriber.inscribeENSDomain(
 *   privateKey,
 *   'vitalik.eth',
 *   '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045', // Vitalik's address
 *   'ENS: vitalik.eth',
 *   'mainnet',
 *   { registered: '2017-05-04', expires: '2030+', type: 'primary' }
 * );
 * console.log('ENS domain anchored:', ensResult.txId);
 * 
 * // 7. Inscribe ETH Block (for checkpointing)
 * const blockResult = await inscriber.inscribeETHBlock(
 *   privateKey,
 *   '15537393', // The Merge block
 *   'The Merge',
 *   'mainnet',
 *   { 
 *     milestone: 'The Merge',
 *     date: '2022-09-15',
 *     type: 'pos_transition',
 *     description: 'Ethereum transitions to Proof-of-Stake'
 *   }
 * );
 * console.log('Historic ETH block anchored:', blockResult.txId);
 * 
 * // 8. Inscribe Layer 2 Transaction (Optimism, Arbitrum, etc.)
 * const l2Result = await inscriber.inscribeLayer2Transaction(
 *   privateKey,
 *   '0xL2_TX_HASH',
 *   'optimism',
 *   'Optimism TX',
 *   'mainnet',
 *   { amount: '100 OP', type: 'swap', protocol: 'Velodrome' }
 * );
 * console.log('L2 transaction anchored:', l2Result.txId);
 * 
 * // 9. Read and parse inscribed data
 * const opReturnData = await inscriber.getOpReturnData(nftResult.txId);
 * console.log('Raw OP_RETURN data:', opReturnData);
 * 
 * if (opReturnData) {
 *   const parsed = inscriber.parseETHData(opReturnData);
 *   console.log('Parsed ETH data:', parsed);
 *   console.log('ERC-721 Address:', parsed.erc721TokenAddress);
 *   console.log('Token ID:', parsed.tokenId);
 *   console.log('Metadata:', parsed.metadata);
 * }
 * 
 * // 10. Cross-chain workflow: ETH NFT → Bitcoin
 * // Step 1: Mint NFT on Ethereum (using ethers.js or web3.js)
 * const nftContract = '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D'; // BAYC
 * const mintTxHash = '0xMINT_TX';
 * const tokenId = '9999';
 * 
 * // Step 2: Anchor on Bitcoin
 * const anchor = await inscriber.inscribeERC721NFT(
 *   privateKey,
 *   nftContract,
 *   tokenId,
 *   mintTxHash,
 *   'BAYC #9999',
 *   'mainnet',
 *   {
 *     collection: 'Bored Ape Yacht Club',
 *     floor_price: '30 ETH',
 *     rarity: 'top_1%',
 *     crosschain: 'true'
 *   }
 * );
 * 
 * console.log('🎉 NFT anchored on Bitcoin!');
 * console.log('Ethereum:', anchor.ethExplorerUrl);
 * console.log('Bitcoin:', anchor.explorerUrl);
 * console.log('This NFT is now provably anchored on both blockchains!');
 * 
 * // 11. DeFi Protocol Deployment Proof
 * const defiDeploy = await inscriber.inscribeETHContract(
 *   privateKey,
 *   '0xDEFI_PROTOCOL',
 *   'Aave V3',
 *   'mainnet',
 *   {
 *     type: 'lending',
 *     protocol: 'Aave',
 *     version: 'V3',
 *     tvl: '$5B+',
 *     deployed: new Date().toISOString(),
 *     audit: 'Trail of Bits'
 *   }
 * );
 * 
 * console.log('DeFi protocol deployment anchored on Bitcoin!');
 * console.log('Immutable proof of deployment time and parameters!');
 * 
 * // 12. Blue-Chip NFT Collection Proof (CryptoPunks)
 * const cryptoPunkAnchor = await inscriber.inscribeERC721NFT(
 *   privateKey,
 *   '0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB', // CryptoPunks
 *   '1234',
 *   '0xTRANSFER_TX',
 *   'CryptoPunk #1234',
 *   'mainnet',
 *   {
 *     collection: 'CryptoPunks',
 *     type: 'Alien',
 *     attributes: '7',
 *     last_sale: '500 ETH',
 *     historic: 'true'
 *   }
 * );
 * 
 * console.log('CryptoPunk anchored on Bitcoin!');
 * console.log('Historic NFT secured on the most secure blockchain!');
 * 
 * // 13. Multi-chain workflow: ETH → L2 → Bitcoin
 * const multiChainAnchor = await inscriber.inscribeLayer2Transaction(
 *   privateKey,
 *   '0xOPTIMISM_TX',
 *   'optimism',
 *   'Bridge Settlement',
 *   'mainnet',
 *   {
 *     type: 'bridge',
 *     amount: '10 ETH',
 *     from: 'ETH L1',
 *     to: 'Optimism',
 *     finalized: 'true'
 *   }
 * );
 * 
 * console.log('Multi-chain proof created!');
 * console.log('ETH L1 → Optimism L2 → Bitcoin anchor!');
 */

export default ETHBitcoinOpReturnInscriber;

