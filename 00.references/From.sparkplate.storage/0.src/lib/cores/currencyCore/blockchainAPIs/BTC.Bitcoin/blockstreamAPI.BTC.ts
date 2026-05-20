// Blockstream API Implementation for Bitcoin
// API Docs: https://blockstream.info/explorer-api
// Free tier: Open source, no API key required
// Tracking-free API access
// Supports mainnet, testnet, and Liquid network

export interface BlockstreamTransaction {
  txid: string;
  version: number;
  locktime: number;
  vin: Array<{
    txid: string;
    vout: number;
    prevout: {
      scriptpubkey: string;
      scriptpubkey_asm: string;
      scriptpubkey_type: string;
      scriptpubkey_address?: string;
      value: number;
    };
    scriptsig: string;
    scriptsig_asm: string;
    witness?: string[];
    is_coinbase: boolean;
    sequence: number;
  }>;
  vout: Array<{
    scriptpubkey: string;
    scriptpubkey_asm: string;
    scriptpubkey_type: string;
    scriptpubkey_address?: string;
    value: number;
  }>;
  size: number;
  weight: number;
  fee: number;
  status: {
    confirmed: boolean;
    block_height?: number;
    block_hash?: string;
    block_time?: number;
  };
}

export interface BlockstreamUTXO {
  txid: string;
  vout: number;
  status: {
    confirmed: boolean;
    block_height?: number;
    block_hash?: string;
    block_time?: number;
  };
  value: number;
}

export interface BlockstreamAddressInfo {
  address: string;
  chain_stats: {
    funded_txo_count: number;
    funded_txo_sum: number;
    spent_txo_count: number;
    spent_txo_sum: number;
    tx_count: number;
  };
  mempool_stats: {
    funded_txo_count: number;
    funded_txo_sum: number;
    spent_txo_count: number;
    spent_txo_sum: number;
    tx_count: number;
  };
}

export type BlockstreamNetwork = 'mainnet' | 'testnet' | 'liquid';

export class BlockstreamAPI {
  private baseUrl: string;
  private network: BlockstreamNetwork;

  constructor(network: BlockstreamNetwork = 'mainnet') {
    this.network = network;
    
    // Blockstream API endpoints
    switch (network) {
      case 'mainnet':
        this.baseUrl = 'https://blockstream.info/api';
        break;
      case 'testnet':
        this.baseUrl = 'https://blockstream.info/testnet/api';
        break;
      case 'liquid':
        this.baseUrl = 'https://blockstream.info/liquid/api';
        break;
      default:
        this.baseUrl = 'https://blockstream.info/api';
    }
  }

  /**
   * Get address information
   */
  async getAddressInfo(address: string): Promise<BlockstreamAddressInfo> {
    try {
      console.log(`🔍 [Blockstream] Fetching address info for: ${address}`);
      
      const response = await fetch(`${this.baseUrl}/address/${address}`);
      
      if (!response.ok) {
        throw new Error(`Blockstream API error: ${response.status} ${response.statusText}`);
      }
      
      const data: BlockstreamAddressInfo = await response.json();
      
      console.log(`✅ [Blockstream] Address info retrieved`);
      
      return data;
    } catch (error) {
      console.error('[Blockstream] Address info fetch error:', error);
      throw new Error(`Failed to fetch address info: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get balance for an address
   */
  async getBalance(address: string): Promise<{
    confirmed: number; // in satoshis
    unconfirmed: number; // in satoshis
    total: number; // in satoshis
    balanceBTC: number; // in BTC
  }> {
    try {
      console.log(`🔍 [Blockstream] Fetching balance for: ${address}`);
      
      const addressInfo = await this.getAddressInfo(address);
      
      const confirmed = addressInfo.chain_stats.funded_txo_sum - addressInfo.chain_stats.spent_txo_sum;
      const unconfirmed = addressInfo.mempool_stats.funded_txo_sum - addressInfo.mempool_stats.spent_txo_sum;
      const total = confirmed + unconfirmed;
      const balanceBTC = total / 100000000;
      
      console.log(`✅ [Blockstream] Balance: ${total} satoshis (${balanceBTC} BTC)`);
      
      return {
        confirmed,
        unconfirmed,
        total,
        balanceBTC
      };
    } catch (error) {
      console.error('[Blockstream] Balance fetch error:', error);
      throw new Error(`Failed to fetch balance: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get UTXOs for an address
   */
  async getUTXOs(address: string): Promise<BlockstreamUTXO[]> {
    try {
      console.log(`🔍 [Blockstream] Fetching UTXOs for: ${address}`);
      
      const response = await fetch(`${this.baseUrl}/address/${address}/utxo`);
      
      if (!response.ok) {
        throw new Error(`Blockstream API error: ${response.status} ${response.statusText}`);
      }
      
      const utxos: BlockstreamUTXO[] = await response.json();
      
      console.log(`✅ [Blockstream] Found ${utxos.length} UTXOs`);
      
      return utxos;
    } catch (error) {
      console.error('[Blockstream] UTXOs fetch error:', error);
      throw new Error(`Failed to fetch UTXOs: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get transaction history for an address
   */
  async getTransactionHistory(address: string): Promise<BlockstreamTransaction[]> {
    try {
      console.log(`🔍 [Blockstream] Fetching transaction history for: ${address}`);
      
      const response = await fetch(`${this.baseUrl}/address/${address}/txs`);
      
      if (!response.ok) {
        throw new Error(`Blockstream API error: ${response.status} ${response.statusText}`);
      }
      
      const transactions: BlockstreamTransaction[] = await response.json();
      
      console.log(`✅ [Blockstream] Found ${transactions.length} transactions`);
      
      return transactions;
    } catch (error) {
      console.error('[Blockstream] Transaction history fetch error:', error);
      throw new Error(`Failed to fetch transaction history: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get transaction by hash
   */
  async getTransaction(txid: string): Promise<BlockstreamTransaction> {
    try {
      console.log(`🔍 [Blockstream] Fetching transaction: ${txid}`);
      
      const response = await fetch(`${this.baseUrl}/tx/${txid}`);
      
      if (!response.ok) {
        throw new Error(`Blockstream API error: ${response.status} ${response.statusText}`);
      }
      
      const transaction: BlockstreamTransaction = await response.json();
      
      console.log(`✅ [Blockstream] Transaction retrieved`);
      
      return transaction;
    } catch (error) {
      console.error('[Blockstream] Transaction fetch error:', error);
      throw new Error(`Failed to fetch transaction: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Broadcast a transaction
   */
  async broadcastTransaction(txHex: string): Promise<string> {
    try {
      console.log('📡 [Blockstream] Broadcasting transaction...');
      
      const response = await fetch(`${this.baseUrl}/tx`, {
        method: 'POST',
        body: txHex,
        headers: {
          'Content-Type': 'text/plain'
        }
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Blockstream broadcast error: ${response.status} - ${errorText}`);
      }
      
      const txid = await response.text();
      
      console.log(`✅ [Blockstream] Transaction broadcast successful: ${txid}`);
      
      return txid;
    } catch (error) {
      console.error('[Blockstream] Broadcast error:', error);
      throw new Error(`Failed to broadcast transaction: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get fee estimates
   */
  async getFeeEstimates(): Promise<Record<string, number>> {
    try {
      console.log('🔍 [Blockstream] Fetching fee estimates...');
      
      const response = await fetch(`${this.baseUrl}/fee-estimates`);
      
      if (!response.ok) {
        throw new Error(`Blockstream API error: ${response.status} ${response.statusText}`);
      }
      
      const estimates: Record<string, number> = await response.json();
      
      console.log(`✅ [Blockstream] Fee estimates retrieved`);
      
      return estimates;
    } catch (error) {
      console.error('[Blockstream] Fee estimates fetch error:', error);
      throw new Error(`Failed to fetch fee estimates: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get latest block height
   */
  async getLatestBlockHeight(): Promise<number> {
    try {
      console.log('🔍 [Blockstream] Fetching latest block height...');
      
      const response = await fetch(`${this.baseUrl}/blocks/tip/height`);
      
      if (!response.ok) {
        throw new Error(`Blockstream API error: ${response.status} ${response.statusText}`);
      }
      
      const height = await response.text();
      
      console.log(`✅ [Blockstream] Latest block height: ${height}`);
      
      return parseInt(height);
    } catch (error) {
      console.error('[Blockstream] Latest block height fetch error:', error);
      throw new Error(`Failed to fetch latest block height: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get mempool info
   */
  async getMempoolInfo(): Promise<{
    count: number;
    vsize: number;
    total_fee: number;
    fee_histogram: number[][];
  }> {
    try {
      console.log('🔍 [Blockstream] Fetching mempool info...');
      
      const response = await fetch(`${this.baseUrl}/mempool`);
      
      if (!response.ok) {
        throw new Error(`Blockstream API error: ${response.status} ${response.statusText}`);
      }
      
      const mempoolInfo = await response.json();
      
      console.log(`✅ [Blockstream] Mempool info retrieved`);
      
      return mempoolInfo;
    } catch (error) {
      console.error('[Blockstream] Mempool info fetch error:', error);
      throw new Error(`Failed to fetch mempool info: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

// Singleton instances for convenience
export const blockstreamMainnet = new BlockstreamAPI('mainnet');
export const blockstreamTestnet = new BlockstreamAPI('testnet');
export const blockstreamLiquid = new BlockstreamAPI('liquid');

