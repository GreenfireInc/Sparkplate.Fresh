// Bitcoin OP_RETURN Inscription for Stellar
// Inscribes Stellar blockchain data/references to Bitcoin blockchain using OP_RETURN

/**
 * OVERVIEW:
 * 
 * This module inscribes Stellar (XLM) data to Bitcoin using OP_RETURN outputs.
 * - Embed up to 80 bytes (standard) of arbitrary data on-chain
 * - Anchor Stellar transactions on Bitcoin blockchain
 * - Reference Stellar assets (custom tokens)
 * - Reference Stellar accounts
 * - Reference claimable balances
 * - Reference anchors (fiat on/off ramps)
 * - Cross-chain proof of existence
 * 
 * BENEFITS:
 * - Dual-blockchain immutability (Stellar + Bitcoin)
 * - Bitcoin's security for Stellar data
 * - Timestamped by Bitcoin blockchain
 * - Proof of asset operations on Bitcoin
 * - Cross-chain verification for anchors
 * - Payment transparency
 * 
 * COSTS:
 * - Transaction fee: Variable based on network congestion (~500-5000 sats)
 * - No ongoing storage costs
 * - OP_RETURN output has 0 value
 * 
 * USE CASES:
 * - Anchor Stellar asset issuance on Bitcoin
 * - Cross-chain proof of asset transfers
 * - Verify anchor operations on Bitcoin
 * - Dual-chain verification for Stellar transactions
 * - Claimable balance proof
 * - Payment channel verification
 * - Stablecoin issuance proof (USDC on Stellar)
 * - Remittance transaction verification
 * - Multi-signature account operations
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

export interface StellarInscriptionData {
  message: string; // Data to inscribe (will be truncated to 80 bytes)
  stellarTxHash?: string; // Stellar transaction hash (hex)
  assetCode?: string; // Stellar asset code (e.g., USDC, BTC)
  assetIssuer?: string; // Stellar asset issuer account
  stellarAccount?: string; // Stellar account ID (G...)
  claimableBalanceId?: string; // Claimable balance ID
  anchorDomain?: string; // Anchor domain (e.g., apay.io)
  operationType?: string; // Stellar operation type
  ledger?: string; // Stellar ledger number
  metadata?: Record<string, string>; // Additional metadata (encoded as JSON)
}

export interface InscriptionResult {
  txId: string; // Bitcoin transaction ID
  txHex: string; // Raw transaction hex
  inscribedData: string; // The actual data inscribed (may be truncated)
  dataSize: number; // Size of inscribed data in bytes
  explorerUrl: string; // Block explorer URL
  stellarExplorerUrl?: string; // Stellar explorer URL if applicable
  cost: {
    feeSats: number;
    feeRate: number; // sats/vB
    totalInputSats: number;
    changeSats: number;
  };
  confirmed: boolean;
}

export class StellarBitcoinOpReturnInscriber {
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
   * Prepare inscription data with Stellar references
   */
  private prepareInscriptionData(data: StellarInscriptionData): Buffer {
    let finalMessage = data.message;

    // Add Stellar references if provided
    if (data.stellarTxHash) {
      finalMessage += `|XLM_TX:${data.stellarTxHash}`;
    }
    if (data.assetCode && data.assetIssuer) {
      finalMessage += `|ASSET:${data.assetCode}:${data.assetIssuer}`;
    } else if (data.assetCode) {
      finalMessage += `|ASSET:${data.assetCode}`;
    }
    if (data.stellarAccount) {
      finalMessage += `|ACCOUNT:${data.stellarAccount}`;
    }
    if (data.claimableBalanceId) {
      finalMessage += `|CLAIMABLE:${data.claimableBalanceId}`;
    }
    if (data.anchorDomain) {
      finalMessage += `|ANCHOR:${data.anchorDomain}`;
    }
    if (data.operationType) {
      finalMessage += `|OP:${data.operationType}`;
    }
    if (data.ledger) {
      finalMessage += `|LEDGER:${data.ledger}`;
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
   * Get Stellar explorer URL
   */
  private getStellarExplorerUrl(
    txHash?: string,
    account?: string,
    assetCode?: string,
    assetIssuer?: string,
    claimableBalanceId?: string,
    ledger?: string,
    network: 'public' | 'testnet' = 'public'
  ): string | undefined {
    // Using Stellar.expert as default explorer
    const networkPath = network === 'public' ? 'public' : 'testnet';
    const explorerBase = `https://stellar.expert/explorer/${networkPath}`;

    if (txHash) {
      return `${explorerBase}/tx/${txHash}`;
    }
    if (assetCode && assetIssuer) {
      return `${explorerBase}/asset/${assetCode}-${assetIssuer}`;
    }
    if (account) {
      return `${explorerBase}/account/${account}`;
    }
    if (claimableBalanceId) {
      return `${explorerBase}/claimable-balance/${claimableBalanceId}`;
    }
    if (ledger) {
      return `${explorerBase}/ledger/${ledger}`;
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
   * Create and broadcast Bitcoin OP_RETURN inscription with Stellar data
   */
  async inscribe(
    privateKeyWIF: string,
    data: StellarInscriptionData,
    stellarNetwork: 'public' | 'testnet' = 'public',
    utxos?: UTXO[]
  ): Promise<InscriptionResult> {
    console.log('Starting Stellar → Bitcoin OP_RETURN inscription...');

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

    // Get Stellar explorer URL
    const stellarExplorerUrl = this.getStellarExplorerUrl(
      data.stellarTxHash,
      data.stellarAccount,
      data.assetCode,
      data.assetIssuer,
      data.claimableBalanceId,
      data.ledger,
      stellarNetwork
    );

    return {
      txId,
      txHex,
      inscribedData: dataBuffer.toString('utf8'),
      dataSize: dataBuffer.length,
      explorerUrl: `${explorerBase}/${txId}`,
      stellarExplorerUrl,
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
   * Inscribe Stellar transaction reference
   */
  async inscribeStellarTransaction(
    privateKeyWIF: string,
    stellarTxHash: string,
    message: string = 'XLM TX',
    stellarNetwork: 'public' | 'testnet' = 'public',
    metadata?: Record<string, string>
  ): Promise<InscriptionResult> {
    return this.inscribe(
      privateKeyWIF,
      {
        message,
        stellarTxHash,
        metadata,
      },
      stellarNetwork
    );
  }

  /**
   * Inscribe Stellar asset reference
   */
  async inscribeStellarAsset(
    privateKeyWIF: string,
    assetCode: string,
    assetIssuer: string,
    message: string = 'Stellar Asset',
    stellarNetwork: 'public' | 'testnet' = 'public',
    metadata?: Record<string, string>
  ): Promise<InscriptionResult> {
    return this.inscribe(
      privateKeyWIF,
      {
        message,
        assetCode,
        assetIssuer,
        metadata: {
          ...metadata,
          type: 'asset',
          chain: 'Stellar',
        },
      },
      stellarNetwork
    );
  }

  /**
   * Inscribe Stellar account reference
   */
  async inscribeStellarAccount(
    privateKeyWIF: string,
    stellarAccount: string,
    message: string = 'Stellar Account',
    stellarNetwork: 'public' | 'testnet' = 'public',
    metadata?: Record<string, string>
  ): Promise<InscriptionResult> {
    return this.inscribe(
      privateKeyWIF,
      {
        message,
        stellarAccount,
        metadata: {
          ...metadata,
          type: 'account',
          chain: 'Stellar',
        },
      },
      stellarNetwork
    );
  }

  /**
   * Inscribe claimable balance reference
   */
  async inscribeClaimableBalance(
    privateKeyWIF: string,
    claimableBalanceId: string,
    amount: string,
    assetCode: string,
    message: string = 'Claimable Balance',
    stellarNetwork: 'public' | 'testnet' = 'public',
    metadata?: Record<string, string>
  ): Promise<InscriptionResult> {
    return this.inscribe(
      privateKeyWIF,
      {
        message,
        claimableBalanceId,
        assetCode,
        metadata: {
          ...metadata,
          type: 'claimable_balance',
          amount,
          chain: 'Stellar',
        },
      },
      stellarNetwork
    );
  }

  /**
   * Inscribe Stellar anchor reference
   */
  async inscribeStellarAnchor(
    privateKeyWIF: string,
    anchorDomain: string,
    assetCode: string,
    assetIssuer: string,
    message: string = 'Stellar Anchor',
    stellarNetwork: 'public' | 'testnet' = 'public',
    metadata?: Record<string, string>
  ): Promise<InscriptionResult> {
    return this.inscribe(
      privateKeyWIF,
      {
        message,
        anchorDomain,
        assetCode,
        assetIssuer,
        metadata: {
          ...metadata,
          type: 'anchor',
          service: 'fiat_gateway',
          chain: 'Stellar',
        },
      },
      stellarNetwork
    );
  }

  /**
   * Inscribe USDC on Stellar transaction
   */
  async inscribeUSDCStellar(
    privateKeyWIF: string,
    stellarTxHash: string,
    amount: string,
    message: string = 'USDC on Stellar',
    stellarNetwork: 'public' | 'testnet' = 'public',
    metadata?: Record<string, string>
  ): Promise<InscriptionResult> {
    return this.inscribe(
      privateKeyWIF,
      {
        message,
        stellarTxHash,
        assetCode: 'USDC',
        assetIssuer: 'GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN',
        metadata: {
          ...metadata,
          token: 'USDC',
          amount,
          stablecoin: 'true',
          issuer: 'Circle',
        },
      },
      stellarNetwork
    );
  }

  /**
   * Inscribe payment operation
   */
  async inscribePaymentOperation(
    privateKeyWIF: string,
    stellarTxHash: string,
    amount: string,
    assetCode: string,
    operationType: string = 'payment',
    message: string = 'Stellar Payment',
    stellarNetwork: 'public' | 'testnet' = 'public',
    metadata?: Record<string, string>
  ): Promise<InscriptionResult> {
    return this.inscribe(
      privateKeyWIF,
      {
        message,
        stellarTxHash,
        assetCode,
        operationType,
        metadata: {
          ...metadata,
          type: 'payment',
          amount,
          chain: 'Stellar',
        },
      },
      stellarNetwork
    );
  }

  /**
   * Inscribe Stellar ledger checkpoint
   */
  async inscribeStellarLedger(
    privateKeyWIF: string,
    ledger: string,
    message: string = 'Stellar Ledger',
    stellarNetwork: 'public' | 'testnet' = 'public',
    metadata?: Record<string, string>
  ): Promise<InscriptionResult> {
    return this.inscribe(
      privateKeyWIF,
      {
        message,
        ledger,
        metadata: {
          ...metadata,
          type: 'ledger_checkpoint',
          chain: 'Stellar',
        },
      },
      stellarNetwork
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
   * Parse Stellar data from OP_RETURN
   */
  parseStellarData(opReturnData: string): {
    message: string;
    stellarTxHash?: string;
    assetCode?: string;
    assetIssuer?: string;
    stellarAccount?: string;
    claimableBalanceId?: string;
    anchorDomain?: string;
    operationType?: string;
    ledger?: string;
    metadata?: Record<string, string>;
  } {
    const parts = opReturnData.split('|');
    const result: any = { message: parts[0] };

    for (let i = 1; i < parts.length; i++) {
      const part = parts[i];
      if (part.startsWith('XLM_TX:')) {
        result.stellarTxHash = part.substring(7);
      } else if (part.startsWith('ASSET:')) {
        const assetParts = part.substring(6).split(':');
        result.assetCode = assetParts[0];
        if (assetParts.length > 1) {
          result.assetIssuer = assetParts[1];
        }
      } else if (part.startsWith('ACCOUNT:')) {
        result.stellarAccount = part.substring(8);
      } else if (part.startsWith('CLAIMABLE:')) {
        result.claimableBalanceId = part.substring(10);
      } else if (part.startsWith('ANCHOR:')) {
        result.anchorDomain = part.substring(7);
      } else if (part.startsWith('OP:')) {
        result.operationType = part.substring(3);
      } else if (part.startsWith('LEDGER:')) {
        result.ledger = part.substring(7);
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
 * // Initialize inscriber for Stellar
 * import { StellarBitcoinOpReturnInscriber } from './XLM.Stellar.inscription.bitcoin.opReturn';
 * 
 * const inscriber = new StellarBitcoinOpReturnInscriber({
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
 * // 1. Inscribe Stellar Transaction
 * const txResult = await inscriber.inscribeStellarTransaction(
 *   privateKey,
 *   'STELLAR_TX_HASH_HERE',
 *   'XLM Payment',
 *   'public',
 *   { amount: '100 XLM', type: 'payment', from: 'G...', to: 'G...' }
 * );
 * console.log('Stellar TX anchored on Bitcoin:', txResult.txId);
 * console.log('View on Bitcoin:', txResult.explorerUrl);
 * console.log('View on Stellar.expert:', txResult.stellarExplorerUrl);
 * 
 * // 2. Inscribe Stellar Asset
 * const assetResult = await inscriber.inscribeStellarAsset(
 *   privateKey,
 *   'MYTOKEN',
 *   'GISSUER_ADDRESS_HERE',
 *   'Custom Asset',
 *   'public',
 *   { 
 *     name: 'MyToken',
 *     symbol: 'MYTOKEN',
 *     domain: 'mytoken.com',
 *     type: 'custom_asset'
 *   }
 * );
 * console.log('Stellar asset anchored:', assetResult.txId);
 * 
 * // 3. Inscribe USDC on Stellar
 * const usdcResult = await inscriber.inscribeUSDCStellar(
 *   privateKey,
 *   'USDC_TX_HASH',
 *   '10000 USDC',
 *   'USDC Transfer',
 *   'public',
 *   { from: 'GACCOUNT1', to: 'GACCOUNT2', memo: 'payment' }
 * );
 * console.log('USDC on Stellar anchored:', usdcResult.txId);
 * console.log('Circle USDC verified on Bitcoin!');
 * 
 * // 4. Inscribe Stellar Account
 * const accountResult = await inscriber.inscribeStellarAccount(
 *   privateKey,
 *   'GACCOUNT_ADDRESS',
 *   'Stellar Account',
 *   'public',
 *   { 
 *     type: 'institutional',
 *     kyc: 'verified',
 *     multisig: 'true'
 *   }
 * );
 * console.log('Stellar account anchored:', accountResult.txId);
 * 
 * // 5. Inscribe Claimable Balance
 * const claimableResult = await inscriber.inscribeClaimableBalance(
 *   privateKey,
 *   'CLAIMABLE_BALANCE_ID',
 *   '1000 USDC',
 *   'USDC',
 *   'Escrow Payment',
 *   'public',
 *   { 
 *     purpose: 'escrow',
 *     unlock_time: '2025-01-01',
 *     claimants: '2'
 *   }
 * );
 * console.log('Claimable balance anchored:', claimableResult.txId);
 * 
 * // 6. Inscribe Anchor Operation
 * const anchorResult = await inscriber.inscribeStellarAnchor(
 *   privateKey,
 *   'apay.io',
 *   'PHP',
 *   'GANCHOR_ISSUER',
 *   'AnchorUSD PHP',
 *   'public',
 *   { 
 *     anchor: 'AnchorUSD',
 *     fiat: 'PHP',
 *     service: 'remittance',
 *     kyc: 'required'
 *   }
 * );
 * console.log('Anchor operation anchored:', anchorResult.txId);
 * 
 * // 7. Inscribe Payment Operation
 * const paymentResult = await inscriber.inscribePaymentOperation(
 *   privateKey,
 *   'PAYMENT_TX_HASH',
 *   '500 XLM',
 *   'XLM',
 *   'payment',
 *   'Cross-border Payment',
 *   'public',
 *   { 
 *     type: 'remittance',
 *     from_country: 'US',
 *     to_country: 'PH',
 *     memo: 'family_support'
 *   }
 * );
 * console.log('Payment operation anchored:', paymentResult.txId);
 * 
 * // 8. Inscribe Ledger Checkpoint
 * const ledgerResult = await inscriber.inscribeStellarLedger(
 *   privateKey,
 *   '50000000',
 *   'Stellar Ledger 50M',
 *   'public',
 *   { 
 *     milestone: '50M ledgers',
 *     timestamp: new Date().toISOString(),
 *     consensus: 'SCP'
 *   }
 * );
 * console.log('Ledger checkpoint anchored:', ledgerResult.txId);
 * 
 * // 9. Read and parse inscribed data
 * const opReturnData = await inscriber.getOpReturnData(usdcResult.txId);
 * console.log('Raw OP_RETURN data:', opReturnData);
 * 
 * if (opReturnData) {
 *   const parsed = inscriber.parseStellarData(opReturnData);
 *   console.log('Parsed Stellar data:', parsed);
 *   console.log('Asset Code:', parsed.assetCode);
 *   console.log('Asset Issuer:', parsed.assetIssuer);
 *   console.log('Metadata:', parsed.metadata);
 * }
 * 
 * // 10. Cross-chain workflow: Stellar → Bitcoin
 * // Step 1: Create payment on Stellar (using Stellar SDK)
 * const stellarTxHash = 'PAYMENT_TX_HASH';
 * 
 * // Step 2: Anchor on Bitcoin
 * const anchor = await inscriber.inscribeUSDCStellar(
 *   privateKey,
 *   stellarTxHash,
 *   '50000 USDC',
 *   'USDC Payment',
 *   'public',
 *   {
 *     from: 'US_ACCOUNT',
 *     to: 'EU_ACCOUNT',
 *     purpose: 'invoice_payment',
 *     crosschain: 'true'
 *   }
 * );
 * 
 * console.log('🎉 Payment anchored on Bitcoin!');
 * console.log('Stellar:', anchor.stellarExplorerUrl);
 * console.log('Bitcoin:', anchor.explorerUrl);
 * console.log('Fast Stellar, secure Bitcoin proof!');
 * 
 * // 11. Remittance Corridor Proof
 * const remittance = await inscriber.inscribePaymentOperation(
 *   privateKey,
 *   'REMITTANCE_TX',
 *   '1000 USD',
 *   'USDC',
 *   'payment',
 *   'US → PH Remittance',
 *   'public',
 *   {
 *     corridor: 'US-PH',
 *     anchor_send: 'USD',
 *     anchor_receive: 'PHP',
 *     settlement_time: '3-5 seconds',
 *     fee: '0.01 USDC'
 *   }
 * );
 * 
 * console.log('Remittance corridor anchored!');
 * console.log('Fast, cheap, transparent!');
 * 
 * // 12. Multi-signature Account Operation
 * const multisig = await inscriber.inscribeStellarAccount(
 *   privateKey,
 *   'GMULTISIG_ACCOUNT',
 *   'Corporate Treasury',
 *   'public',
 *   {
 *     type: 'multisig',
 *     signers: '5',
 *     threshold: '3_of_5',
 *     purpose: 'corporate_treasury'
 *   }
 * );
 * 
 * console.log('Multi-sig account anchored!');
 * console.log('Corporate governance on Bitcoin!');
 * 
 * // 13. Anchor Service Verification
 * const anchorService = await inscriber.inscribeStellarAnchor(
 *   privateKey,
 *   'vibrantapp.com',
 *   'NGNT',
 *   'GISSUER',
 *   'Vibrant NGN',
 *   'public',
 *   {
 *     anchor: 'Vibrant',
 *     asset: 'Nigerian Naira',
 *     fiat: 'NGN',
 *     sep24: 'true',
 *     region: 'Africa'
 *   }
 * );
 * 
 * console.log('Anchor service verified on Bitcoin!');
 * console.log('Fiat gateway transparency!');
 */

export default StellarBitcoinOpReturnInscriber;

