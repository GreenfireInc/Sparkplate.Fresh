// Electrs-Dogecoin API Implementation
// GitHub: https://github.com/DogeDevs/electrs-dogecoin
// Demo: https://doge-electrs-demo.qed.me/
// Modern, open-source Dogecoin block explorer with full history API

export interface ElectrsDogeAddressInfo {
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

export interface ElectrsDogeTransaction {
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

export interface ElectrsDogeUTXO {
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

export interface ElectrsDogeFeeEstimate {
  [blocks: string]: number; // Fee rate in shibes per vbyte
}

export class ElectrsDogeAPI {
  private baseUrl: string;

  constructor(baseUrl: string = 'https://doge-electrs-demo.qed.me') {
    this.baseUrl = baseUrl;
  }

  /**
   * Get address information
   */
  async getAddressInfo(address: string): Promise<ElectrsDogeAddressInfo> {
    try {
      console.log(`🔍 [Electrs-DOGE] Fetching address info for: ${address}`);
      
      const response = await fetch(`${this.baseUrl}/address/${address}`);
      
      if (!response.ok) {
        throw new Error(`Electrs API error: ${response.status} ${response.statusText}`);
      }
      
      const data: ElectrsDogeAddressInfo = await response.json();
      
      console.log(`✅ [Electrs-DOGE] Address info retrieved`);
      
      return data;
    } catch (error) {
      console.error('[Electrs-DOGE] Address info fetch error:', error);
      throw new Error(`Failed to fetch address info: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get balance for an address
   */
  async getBalance(address: string): Promise<{
    balance: number; // in shibes
    received: number;
    sent: number;
    balanceDOGE: number; // in DOGE
  }> {
    try {
      console.log(`🔍 [Electrs-DOGE] Fetching balance for: ${address}`);
      
      const info = await this.getAddressInfo(address);
      
      const funded = info.chain_stats.funded_txo_sum + info.mempool_stats.funded_txo_sum;
      const spent = info.chain_stats.spent_txo_sum + info.mempool_stats.spent_txo_sum;
      const balance = funded - spent;
      const received = funded;
      const sent = spent;
      const balanceDOGE = balance / 100000000;
      
      console.log(`✅ [Electrs-DOGE] Balance: ${balance} shibes (${balanceDOGE} DOGE)`);
      
      return {
        balance,
        received,
        sent,
        balanceDOGE
      };
    } catch (error) {
      console.error('[Electrs-DOGE] Balance fetch error:', error);
      throw new Error(`Failed to fetch balance: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get UTXOs for an address
   */
  async getUTXOs(address: string): Promise<ElectrsDogeUTXO[]> {
    try {
      console.log(`🔍 [Electrs-DOGE] Fetching UTXOs for: ${address}`);
      
      const response = await fetch(`${this.baseUrl}/address/${address}/utxo`);
      
      if (!response.ok) {
        throw new Error(`Electrs API error: ${response.status} ${response.statusText}`);
      }
      
      const utxos: ElectrsDogeUTXO[] = await response.json();
      
      console.log(`✅ [Electrs-DOGE] Found ${utxos.length} UTXOs`);
      
      return utxos;
    } catch (error) {
      console.error('[Electrs-DOGE] UTXO fetch error:', error);
      throw new Error(`Failed to fetch UTXOs: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get transaction by hash
   */
  async getTransaction(txHash: string): Promise<ElectrsDogeTransaction> {
    try {
      console.log(`🔍 [Electrs-DOGE] Fetching transaction: ${txHash}`);
      
      const response = await fetch(`${this.baseUrl}/tx/${txHash}`);
      
      if (!response.ok) {
        throw new Error(`Electrs API error: ${response.status} ${response.statusText}`);
      }
      
      const transaction: ElectrsDogeTransaction = await response.json();
      
      console.log(`✅ [Electrs-DOGE] Transaction retrieved`);
      
      return transaction;
    } catch (error) {
      console.error('[Electrs-DOGE] Transaction fetch error:', error);
      throw new Error(`Failed to fetch transaction: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get transaction history for an address
   */
  async getTransactionHistory(address: string, lastSeenTxid?: string): Promise<ElectrsDogeTransaction[]> {
    try {
      console.log(`🔍 [Electrs-DOGE] Fetching transaction history for: ${address}`);
      
      let url = `${this.baseUrl}/address/${address}/txs`;
      if (lastSeenTxid) {
        url += `/chain/${lastSeenTxid}`;
      }
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Electrs API error: ${response.status} ${response.statusText}`);
      }
      
      const transactions: ElectrsDogeTransaction[] = await response.json();
      
      console.log(`✅ [Electrs-DOGE] Found ${transactions.length} transactions`);
      
      return transactions;
    } catch (error) {
      console.error('[Electrs-DOGE] Transaction history fetch error:', error);
      throw new Error(`Failed to fetch transaction history: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Broadcast a transaction
   */
  async broadcastTransaction(txHex: string): Promise<string> {
    try {
      console.log('📡 [Electrs-DOGE] Broadcasting transaction...');
      
      const response = await fetch(`${this.baseUrl}/tx`, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain'
        },
        body: txHex
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Electrs broadcast error: ${response.status} - ${errorText}`);
      }
      
      const txid = await response.text();
      
      console.log(`✅ [Electrs-DOGE] Transaction broadcast successful: ${txid}`);
      
      return txid;
    } catch (error) {
      console.error('[Electrs-DOGE] Broadcast error:', error);
      throw new Error(`Failed to broadcast transaction: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get fee estimates
   */
  async getFeeEstimates(): Promise<ElectrsDogeFeeEstimate> {
    try {
      console.log('🔍 [Electrs-DOGE] Fetching fee estimates...');
      
      const response = await fetch(`${this.baseUrl}/fee-estimates`);
      
      if (!response.ok) {
        throw new Error(`Electrs API error: ${response.status} ${response.statusText}`);
      }
      
      const estimates: ElectrsDogeFeeEstimate = await response.json();
      
      console.log(`✅ [Electrs-DOGE] Fee estimates retrieved`);
      
      return estimates;
    } catch (error) {
      console.error('[Electrs-DOGE] Fee estimates fetch error:', error);
      throw new Error(`Failed to fetch fee estimates: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get recommended fees (simplified)
   */
  async getRecommendedFees(): Promise<{
    fast: number; // shibes per vbyte
    medium: number;
    slow: number;
  }> {
    try {
      console.log('🔍 [Electrs-DOGE] Fetching recommended fees...');
      
      const estimates = await this.getFeeEstimates();
      
      // Extract fee rates for different confirmation targets
      const fast = estimates['1'] || estimates['2'] || 1000;
      const medium = estimates['3'] || estimates['4'] || 500;
      const slow = estimates['6'] || estimates['10'] || 100;
      
      console.log(`✅ [Electrs-DOGE] Recommended fees: Fast ${fast}, Medium ${medium}, Slow ${slow} shibes/vbyte`);
      
      return {
        fast,
        medium,
        slow
      };
    } catch (error) {
      console.error('[Electrs-DOGE] Fee recommendation fetch error:', error);
      // Return default Dogecoin fees if fetch fails
      return {
        fast: 1000,
        medium: 500,
        slow: 100
      };
    }
  }

  /**
   * Get block by hash
   */
  async getBlock(blockHash: string): Promise<{
    id: string;
    height: number;
    version: number;
    timestamp: number;
    tx_count: number;
    size: number;
    weight: number;
    merkle_root: string;
    previousblockhash?: string;
    mediantime: number;
    nonce: number;
    bits: number;
    difficulty: number;
  }> {
    try {
      console.log(`🔍 [Electrs-DOGE] Fetching block: ${blockHash}`);
      
      const response = await fetch(`${this.baseUrl}/block/${blockHash}`);
      
      if (!response.ok) {
        throw new Error(`Electrs API error: ${response.status} ${response.statusText}`);
      }
      
      const block = await response.json();
      
      console.log(`✅ [Electrs-DOGE] Block retrieved`);
      
      return block;
    } catch (error) {
      console.error('[Electrs-DOGE] Block fetch error:', error);
      throw new Error(`Failed to fetch block: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get block at height
   */
  async getBlockAtHeight(height: number): Promise<string> {
    try {
      console.log(`🔍 [Electrs-DOGE] Fetching block hash at height: ${height}`);
      
      const response = await fetch(`${this.baseUrl}/block-height/${height}`);
      
      if (!response.ok) {
        throw new Error(`Electrs API error: ${response.status} ${response.statusText}`);
      }
      
      const blockHash = await response.text();
      
      console.log(`✅ [Electrs-DOGE] Block hash: ${blockHash}`);
      
      return blockHash;
    } catch (error) {
      console.error('[Electrs-DOGE] Block hash fetch error:', error);
      throw new Error(`Failed to fetch block hash: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get latest block height
   */
  async getLatestBlockHeight(): Promise<number> {
    try {
      console.log('🔍 [Electrs-DOGE] Fetching latest block height...');
      
      const response = await fetch(`${this.baseUrl}/blocks/tip/height`);
      
      if (!response.ok) {
        throw new Error(`Electrs API error: ${response.status} ${response.statusText}`);
      }
      
      const height = parseInt(await response.text(), 10);
      
      console.log(`✅ [Electrs-DOGE] Latest block height: ${height}`);
      
      return height;
    } catch (error) {
      console.error('[Electrs-DOGE] Block height fetch error:', error);
      throw new Error(`Failed to fetch block height: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get mempool recent transactions
   */
  async getMempoolRecent(): Promise<ElectrsDogeTransaction[]> {
    try {
      console.log('🔍 [Electrs-DOGE] Fetching recent mempool transactions...');
      
      const response = await fetch(`${this.baseUrl}/mempool/recent`);
      
      if (!response.ok) {
        throw new Error(`Electrs API error: ${response.status} ${response.statusText}`);
      }
      
      const transactions: ElectrsDogeTransaction[] = await response.json();
      
      console.log(`✅ [Electrs-DOGE] Found ${transactions.length} mempool transactions`);
      
      return transactions;
    } catch (error) {
      console.error('[Electrs-DOGE] Mempool fetch error:', error);
      throw new Error(`Failed to fetch mempool transactions: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

// Singleton instance for convenience
export const electrsDoge = new ElectrsDogeAPI();

