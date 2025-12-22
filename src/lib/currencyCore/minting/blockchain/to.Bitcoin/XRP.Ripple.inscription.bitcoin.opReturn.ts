// Bitcoin OP_RETURN Inscription for XRP Ledger
// Inscribes XRP Ledger blockchain data/references to Bitcoin blockchain using OP_RETURN

/**
 * OVERVIEW:
 * 
 * This module inscribes XRP Ledger data to Bitcoin using OP_RETURN outputs.
 * - Embed up to 80 bytes (standard) of arbitrary data on-chain
 * - Anchor XRP transactions on Bitcoin blockchain
 * - Reference issued currencies (IOUs/tokens)
 * - Reference XLS-20 NFTs (native NFTs)
 * - Reference XRP accounts
 * - Reference escrows and payment channels
 * - Reference AMM pools
 * - Cross-chain proof of existence
 * 
 * BENEFITS:
 * - Dual-blockchain immutability (XRP Ledger + Bitcoin)
 * - Bitcoin's security for XRP data
 * - Timestamped by Bitcoin blockchain
 * - Proof of issued currency operations on Bitcoin
 * - Cross-chain verification for XRP operations
 * - Payment channel transparency
 * 
 * COSTS:
 * - Transaction fee: Variable based on network congestion (~500-5000 sats)
 * - No ongoing storage costs
 * - OP_RETURN output has 0 value
 * 
 * USE CASES:
 * - Anchor XLS-20 NFT mints on Bitcoin
 * - Cross-chain proof of issued currency creation
 * - Verify escrow operations on Bitcoin
 * - Dual-chain verification for XRP transactions
 * - Payment channel proof
 * - AMM pool operation verification
 * - Cross-border payment verification
 * - On-Demand Liquidity (ODL) proof
 * - Institutional payment verification
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

export interface XRPInscriptionData {
  message: string; // Data to inscribe (will be truncated to 80 bytes)
  xrpTxHash?: string; // XRP transaction hash (hex)
  issuedCurrency?: string; // Issued currency code (3-char or hex)
  currencyIssuer?: string; // Currency issuer account
  nftTokenId?: string; // XLS-20 NFT token ID
  xrpAccount?: string; // XRP account address (r...)
  escrowSequence?: string; // Escrow sequence number
  paymentChannelId?: string; // Payment channel ID
  ammPoolId?: string; // AMM pool ID
  ledgerIndex?: string; // XRP Ledger index
  metadata?: Record<string, string>; // Additional metadata (encoded as JSON)
}

export interface InscriptionResult {
  txId: string; // Bitcoin transaction ID
  txHex: string; // Raw transaction hex
  inscribedData: string; // The actual data inscribed (may be truncated)
  dataSize: number; // Size of inscribed data in bytes
  explorerUrl: string; // Block explorer URL
  xrpExplorerUrl?: string; // XRP explorer URL if applicable
  cost: {
    feeSats: number;
    feeRate: number; // sats/vB
    totalInputSats: number;
    changeSats: number;
  };
  confirmed: boolean;
}

export class XRPBitcoinOpReturnInscriber {
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
   * Prepare inscription data with XRP references
   */
  private prepareInscriptionData(data: XRPInscriptionData): Buffer {
    let finalMessage = data.message;

    // Add XRP references if provided
    if (data.xrpTxHash) {
      finalMessage += `|XRP_TX:${data.xrpTxHash}`;
    }
    if (data.issuedCurrency && data.currencyIssuer) {
      finalMessage += `|IOU:${data.issuedCurrency}:${data.currencyIssuer}`;
    } else if (data.issuedCurrency) {
      finalMessage += `|IOU:${data.issuedCurrency}`;
    }
    if (data.nftTokenId) {
      finalMessage += `|NFT:${data.nftTokenId}`;
    }
    if (data.xrpAccount) {
      finalMessage += `|ACCOUNT:${data.xrpAccount}`;
    }
    if (data.escrowSequence) {
      finalMessage += `|ESCROW:${data.escrowSequence}`;
    }
    if (data.paymentChannelId) {
      finalMessage += `|CHANNEL:${data.paymentChannelId}`;
    }
    if (data.ammPoolId) {
      finalMessage += `|AMM:${data.ammPoolId}`;
    }
    if (data.ledgerIndex) {
      finalMessage += `|LEDGER:${data.ledgerIndex}`;
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
   * Get XRP explorer URL
   */
  private getXRPExplorerUrl(
    txHash?: string,
    account?: string,
    nftTokenId?: string,
    ledgerIndex?: string,
    network: 'mainnet' | 'testnet' | 'devnet' = 'mainnet'
  ): string | undefined {
    // Using XRPScan as default explorer
    const explorerBase = network === 'mainnet' 
      ? 'https://xrpscan.com' 
      : network === 'testnet'
      ? 'https://testnet.xrpscan.com'
      : 'https://devnet.xrpscan.com';

    if (txHash) {
      return `${explorerBase}/tx/${txHash}`;
    }
    if (nftTokenId) {
      return `${explorerBase}/nft/${nftTokenId}`;
    }
    if (account) {
      return `${explorerBase}/account/${account}`;
    }
    if (ledgerIndex) {
      return `${explorerBase}/ledger/${ledgerIndex}`;
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
   * Create and broadcast Bitcoin OP_RETURN inscription with XRP data
   */
  async inscribe(
    privateKeyWIF: string,
    data: XRPInscriptionData,
    xrpNetwork: 'mainnet' | 'testnet' | 'devnet' = 'mainnet',
    utxos?: UTXO[]
  ): Promise<InscriptionResult> {
    console.log('Starting XRP Ledger → Bitcoin OP_RETURN inscription...');

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

    // Get XRP explorer URL
    const xrpExplorerUrl = this.getXRPExplorerUrl(
      data.xrpTxHash,
      data.xrpAccount,
      data.nftTokenId,
      data.ledgerIndex,
      xrpNetwork
    );

    return {
      txId,
      txHex,
      inscribedData: dataBuffer.toString('utf8'),
      dataSize: dataBuffer.length,
      explorerUrl: `${explorerBase}/${txId}`,
      xrpExplorerUrl,
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
   * Inscribe XRP transaction reference
   */
  async inscribeXRPTransaction(
    privateKeyWIF: string,
    xrpTxHash: string,
    message: string = 'XRP TX',
    xrpNetwork: 'mainnet' | 'testnet' | 'devnet' = 'mainnet',
    metadata?: Record<string, string>
  ): Promise<InscriptionResult> {
    return this.inscribe(
      privateKeyWIF,
      {
        message,
        xrpTxHash,
        metadata,
      },
      xrpNetwork
    );
  }

  /**
   * Inscribe issued currency (IOU) reference
   */
  async inscribeIssuedCurrency(
    privateKeyWIF: string,
    issuedCurrency: string,
    currencyIssuer: string,
    message: string = 'XRP IOU',
    xrpNetwork: 'mainnet' | 'testnet' | 'devnet' = 'mainnet',
    metadata?: Record<string, string>
  ): Promise<InscriptionResult> {
    return this.inscribe(
      privateKeyWIF,
      {
        message,
        issuedCurrency,
        currencyIssuer,
        metadata: {
          ...metadata,
          type: 'issued_currency',
          chain: 'XRP Ledger',
        },
      },
      xrpNetwork
    );
  }

  /**
   * Inscribe XLS-20 NFT reference
   */
  async inscribeXLS20NFT(
    privateKeyWIF: string,
    nftTokenId: string,
    xrpTxHash: string,
    message: string = 'XLS-20 NFT',
    xrpNetwork: 'mainnet' | 'testnet' | 'devnet' = 'mainnet',
    metadata?: Record<string, string>
  ): Promise<InscriptionResult> {
    return this.inscribe(
      privateKeyWIF,
      {
        message,
        nftTokenId,
        xrpTxHash,
        metadata: {
          ...metadata,
          standard: 'XLS-20',
          type: 'nft',
          chain: 'XRP Ledger',
        },
      },
      xrpNetwork
    );
  }

  /**
   * Inscribe XRP account reference
   */
  async inscribeXRPAccount(
    privateKeyWIF: string,
    xrpAccount: string,
    message: string = 'XRP Account',
    xrpNetwork: 'mainnet' | 'testnet' | 'devnet' = 'mainnet',
    metadata?: Record<string, string>
  ): Promise<InscriptionResult> {
    return this.inscribe(
      privateKeyWIF,
      {
        message,
        xrpAccount,
        metadata: {
          ...metadata,
          type: 'account',
          chain: 'XRP Ledger',
        },
      },
      xrpNetwork
    );
  }

  /**
   * Inscribe escrow operation
   */
  async inscribeEscrow(
    privateKeyWIF: string,
    escrowSequence: string,
    amount: string,
    xrpTxHash: string,
    message: string = 'XRP Escrow',
    xrpNetwork: 'mainnet' | 'testnet' | 'devnet' = 'mainnet',
    metadata?: Record<string, string>
  ): Promise<InscriptionResult> {
    return this.inscribe(
      privateKeyWIF,
      {
        message,
        escrowSequence,
        xrpTxHash,
        metadata: {
          ...metadata,
          type: 'escrow',
          amount,
          chain: 'XRP Ledger',
        },
      },
      xrpNetwork
    );
  }

  /**
   * Inscribe payment channel operation
   */
  async inscribePaymentChannel(
    privateKeyWIF: string,
    paymentChannelId: string,
    message: string = 'Payment Channel',
    xrpNetwork: 'mainnet' | 'testnet' | 'devnet' = 'mainnet',
    metadata?: Record<string, string>
  ): Promise<InscriptionResult> {
    return this.inscribe(
      privateKeyWIF,
      {
        message,
        paymentChannelId,
        metadata: {
          ...metadata,
          type: 'payment_channel',
          chain: 'XRP Ledger',
        },
      },
      xrpNetwork
    );
  }

  /**
   * Inscribe AMM pool operation
   */
  async inscribeAMMPool(
    privateKeyWIF: string,
    ammPoolId: string,
    asset1: string,
    asset2: string,
    message: string = 'XRP AMM Pool',
    xrpNetwork: 'mainnet' | 'testnet' | 'devnet' = 'mainnet',
    metadata?: Record<string, string>
  ): Promise<InscriptionResult> {
    return this.inscribe(
      privateKeyWIF,
      {
        message,
        ammPoolId,
        metadata: {
          ...metadata,
          type: 'amm',
          asset1,
          asset2,
          chain: 'XRP Ledger',
        },
      },
      xrpNetwork
    );
  }

  /**
   * Inscribe On-Demand Liquidity (ODL) payment
   */
  async inscribeODLPayment(
    privateKeyWIF: string,
    xrpTxHash: string,
    corridor: string,
    amount: string,
    message: string = 'ODL Payment',
    xrpNetwork: 'mainnet' | 'testnet' | 'devnet' = 'mainnet',
    metadata?: Record<string, string>
  ): Promise<InscriptionResult> {
    return this.inscribe(
      privateKeyWIF,
      {
        message,
        xrpTxHash,
        metadata: {
          ...metadata,
          type: 'odl',
          corridor,
          amount,
          service: 'RippleNet',
          chain: 'XRP Ledger',
        },
      },
      xrpNetwork
    );
  }

  /**
   * Inscribe XRP Ledger checkpoint
   */
  async inscribeXRPLedger(
    privateKeyWIF: string,
    ledgerIndex: string,
    message: string = 'XRP Ledger',
    xrpNetwork: 'mainnet' | 'testnet' | 'devnet' = 'mainnet',
    metadata?: Record<string, string>
  ): Promise<InscriptionResult> {
    return this.inscribe(
      privateKeyWIF,
      {
        message,
        ledgerIndex,
        metadata: {
          ...metadata,
          type: 'ledger_checkpoint',
          chain: 'XRP Ledger',
        },
      },
      xrpNetwork
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
   * Parse XRP data from OP_RETURN
   */
  parseXRPData(opReturnData: string): {
    message: string;
    xrpTxHash?: string;
    issuedCurrency?: string;
    currencyIssuer?: string;
    nftTokenId?: string;
    xrpAccount?: string;
    escrowSequence?: string;
    paymentChannelId?: string;
    ammPoolId?: string;
    ledgerIndex?: string;
    metadata?: Record<string, string>;
  } {
    const parts = opReturnData.split('|');
    const result: any = { message: parts[0] };

    for (let i = 1; i < parts.length; i++) {
      const part = parts[i];
      if (part.startsWith('XRP_TX:')) {
        result.xrpTxHash = part.substring(7);
      } else if (part.startsWith('IOU:')) {
        const iouParts = part.substring(4).split(':');
        result.issuedCurrency = iouParts[0];
        if (iouParts.length > 1) {
          result.currencyIssuer = iouParts[1];
        }
      } else if (part.startsWith('NFT:')) {
        result.nftTokenId = part.substring(4);
      } else if (part.startsWith('ACCOUNT:')) {
        result.xrpAccount = part.substring(8);
      } else if (part.startsWith('ESCROW:')) {
        result.escrowSequence = part.substring(7);
      } else if (part.startsWith('CHANNEL:')) {
        result.paymentChannelId = part.substring(8);
      } else if (part.startsWith('AMM:')) {
        result.ammPoolId = part.substring(4);
      } else if (part.startsWith('LEDGER:')) {
        result.ledgerIndex = part.substring(7);
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
 * // Initialize inscriber for XRP Ledger
 * import { XRPBitcoinOpReturnInscriber } from './XRP.Ripple.inscription.bitcoin.opReturn';
 * 
 * const inscriber = new XRPBitcoinOpReturnInscriber({
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
 * // 1. Inscribe XRP Transaction
 * const txResult = await inscriber.inscribeXRPTransaction(
 *   privateKey,
 *   'XRP_TX_HASH_HERE',
 *   'XRP Payment',
 *   'mainnet',
 *   { amount: '1000 XRP', type: 'payment', from: 'rAccount1', to: 'rAccount2' }
 * );
 * console.log('XRP TX anchored on Bitcoin:', txResult.txId);
 * console.log('View on Bitcoin:', txResult.explorerUrl);
 * console.log('View on XRPScan:', txResult.xrpExplorerUrl);
 * 
 * // 2. Inscribe Issued Currency (IOU)
 * const iouResult = await inscriber.inscribeIssuedCurrency(
 *   privateKey,
 *   'USD',
 *   'rISSUER_ADDRESS',
 *   'USD IOU',
 *   'mainnet',
 *   { 
 *     currency: 'USD',
 *     issuer: 'Bitstamp',
 *     type: 'fiat_backed'
 *   }
 * );
 * console.log('Issued currency anchored:', iouResult.txId);
 * 
 * // 3. Inscribe XLS-20 NFT
 * const nftResult = await inscriber.inscribeXLS20NFT(
 *   privateKey,
 *   'NFT_TOKEN_ID',
 *   'MINT_TX_HASH',
 *   'XRP NFT #42',
 *   'mainnet',
 *   { 
 *     collection: 'XRP Punks',
 *     rarity: 'legendary',
 *     native: 'true'
 *   }
 * );
 * console.log('XLS-20 NFT anchored on Bitcoin!');
 * console.log('Bitcoin TX:', nftResult.txId);
 * console.log('View NFT on XRPScan:', nftResult.xrpExplorerUrl);
 * 
 * // 4. Inscribe XRP Account
 * const accountResult = await inscriber.inscribeXRPAccount(
 *   privateKey,
 *   'rACCOUNT_ADDRESS',
 *   'Exchange Account',
 *   'mainnet',
 *   { 
 *     type: 'institutional',
 *     exchange: 'Bitstamp',
 *     verified: 'true'
 *   }
 * );
 * console.log('XRP account anchored:', accountResult.txId);
 * 
 * // 5. Inscribe Escrow Operation
 * const escrowResult = await inscriber.inscribeEscrow(
 *   privateKey,
 *   '12345',
 *   '10000 XRP',
 *   'ESCROW_TX_HASH',
 *   'Escrow Payment',
 *   'mainnet',
 *   { 
 *     purpose: 'conditional_payment',
 *     unlock_time: '2025-01-01',
 *     condition: 'time_locked'
 *   }
 * );
 * console.log('Escrow anchored:', escrowResult.txId);
 * 
 * // 6. Inscribe Payment Channel
 * const channelResult = await inscriber.inscribePaymentChannel(
 *   privateKey,
 *   'CHANNEL_ID',
 *   'Micropayment Channel',
 *   'mainnet',
 *   { 
 *     type: 'payment_channel',
 *     capacity: '1000 XRP',
 *     participants: '2'
 *   }
 * );
 * console.log('Payment channel anchored:', channelResult.txId);
 * 
 * // 7. Inscribe AMM Pool
 * const ammResult = await inscriber.inscribeAMMPool(
 *   privateKey,
 *   'AMM_POOL_ID',
 *   'XRP',
 *   'USD',
 *   'XRP/USD AMM',
 *   'mainnet',
 *   { 
 *     asset1: 'XRP',
 *     asset2: 'USD',
 *     tvl: '$1M',
 *     native_amm: 'true'
 *   }
 * );
 * console.log('AMM pool anchored:', ammResult.txId);
 * 
 * // 8. Inscribe On-Demand Liquidity (ODL) Payment
 * const odlResult = await inscriber.inscribeODLPayment(
 *   privateKey,
 *   'ODL_TX_HASH',
 *   'US-MX',
 *   '50000 USD',
 *   'ODL: US → Mexico',
 *   'mainnet',
 *   { 
 *     corridor: 'USD-MXN',
 *     service: 'RippleNet',
 *     settlement_time: '3 seconds',
 *     provider: 'Bitso'
 *   }
 * );
 * console.log('ODL payment anchored:', odlResult.txId);
 * 
 * // 9. Inscribe Ledger Checkpoint
 * const ledgerResult = await inscriber.inscribeXRPLedger(
 *   privateKey,
 *   '80000000',
 *   'XRP Ledger 80M',
 *   'mainnet',
 *   { 
 *     milestone: '80M ledgers',
 *     timestamp: new Date().toISOString(),
 *     consensus: 'RPCA'
 *   }
 * );
 * console.log('Ledger checkpoint anchored:', ledgerResult.txId);
 * 
 * // 10. Read and parse inscribed data
 * const opReturnData = await inscriber.getOpReturnData(nftResult.txId);
 * console.log('Raw OP_RETURN data:', opReturnData);
 * 
 * if (opReturnData) {
 *   const parsed = inscriber.parseXRPData(opReturnData);
 *   console.log('Parsed XRP data:', parsed);
 *   console.log('NFT Token ID:', parsed.nftTokenId);
 *   console.log('Metadata:', parsed.metadata);
 * }
 * 
 * // 11. Cross-chain workflow: XRP NFT → Bitcoin
 * // Step 1: Mint NFT on XRP Ledger (using xrpl.js)
 * const nftTokenId = 'NFT_TOKEN_ID';
 * const mintTxHash = 'MINT_TX_HASH';
 * 
 * // Step 2: Anchor on Bitcoin
 * const anchor = await inscriber.inscribeXLS20NFT(
 *   privateKey,
 *   nftTokenId,
 *   mintTxHash,
 *   'XRP Punk #1337',
 *   'mainnet',
 *   {
 *     collection: 'XRP Punks',
 *     rarity: 'legendary',
 *     native_xrpl: 'true',
 *     crosschain: 'true'
 *   }
 * );
 * 
 * console.log('🎉 NFT anchored on Bitcoin!');
 * console.log('XRP Ledger:', anchor.xrpExplorerUrl);
 * console.log('Bitcoin:', anchor.explorerUrl);
 * console.log('Native XRPL NFT secured on Bitcoin!');
 * 
 * // 12. RippleNet ODL Corridor Proof
 * const rippleNetODL = await inscriber.inscribeODLPayment(
 *   privateKey,
 *   'ODL_CORRIDOR_TX',
 *   'US-PH',
 *   '100000 USD',
 *   'RippleNet ODL',
 *   'mainnet',
 *   {
 *     corridor: 'USD-PHP',
 *     provider: 'Coins.ph',
 *     volume: '$100K',
 *     settlement: '3 seconds',
 *     cost_savings: '60%'
 *   }
 * );
 * 
 * console.log('RippleNet ODL payment anchored!');
 * console.log('Instant cross-border settlement verified!');
 * 
 * // 13. Institutional Payment Proof
 * const institutionalPayment = await inscriber.inscribeXRPTransaction(
 *   privateKey,
 *   'INSTITUTION_TX',
 *   'Bank Payment',
 *   'mainnet',
 *   {
 *     type: 'institutional',
 *     bank: 'Santander',
 *     amount: '1M USD',
 *     service: 'One Pay FX',
 *     instant: 'true'
 *   }
 * );
 * 
 * console.log('Institutional payment anchored!');
 * console.log('Bank-grade payment on Bitcoin!');
 * 
 * // 14. Native AMM Liquidity Pool
 * const liquidityPool = await inscriber.inscribeAMMPool(
 *   privateKey,
 *   'AMM_XRP_USD',
 *   'XRP',
 *   'USD',
 *   'Native AMM Pool',
 *   'mainnet',
 *   {
 *     tvl: '$5M',
 *     volume_24h: '$500K',
 *     native_dex: 'true',
 *     fees: '0.6%'
 *   }
 * );
 * 
 * console.log('Native AMM pool anchored!');
 * console.log('Built-in DEX on XRPL!');
 */

export default XRPBitcoinOpReturnInscriber;

