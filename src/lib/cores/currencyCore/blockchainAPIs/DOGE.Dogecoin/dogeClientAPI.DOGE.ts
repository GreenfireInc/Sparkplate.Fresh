// DogeClient API Implementation for Dogecoin
// API Docs: https://dogeclient.com/api-docs
// Free tier: ~1000 requests/hour
// Professional Dogecoin Infrastructure

export interface DogeClientAddressInfo {
  address: string;
  balance: number; // in DOGE
  received: number;
  sent: number;
  transactions: number;
}

export interface DogeClientTransaction {
  txid: string;
  hash: string;
  version: number;
  size: number;
  vsize: number;
  weight: number;
  locktime: number;
  vin: Array<{
    txid: string;
    vout: number;
    scriptSig: {
      asm: string;
      hex: string;
    };
    sequence: number;
    addresses?: string[];
    value?: number;
  }>;
  vout: Array<{
    value: number;
    n: number;
    scriptPubKey: {
      asm: string;
      hex: string;
      type: string;
      addresses?: string[];
    };
  }>;
  blockhash?: string;
  height?: number;
  confirmations: number;
  time?: number;
  blocktime?: number;
}

export interface DogeClientBlock {
  hash: string;
  confirmations: number;
  strippedsize: number;
  size: number;
  weight: number;
  height: number;
  version: number;
  versionHex: string;
  merkleroot: string;
  tx: string[];
  time: number;
  mediantime: number;
  nonce: number;
  bits: string;
  difficulty: number;
  chainwork: string;
  nTx: number;
  previousblockhash?: string;
  nextblockhash?: string;
}

export interface DogeClientNetworkStats {
  blocks: number;
  difficulty: number;
  hashrate: string;
  connections: number;
  supply: number;
  mempool_size: number;
  mempool_bytes: number;
}

export class DogeClientAPI {
  private baseUrl = 'https://api.dogeclient.com/v1';
  private apiKey?: string;

  constructor(apiKey?: string) {
    this.apiKey = apiKey;
  }

  /**
   * Build headers with optional API key
   */
  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json'
    };
    
    if (this.apiKey) {
      headers['Authorization'] = `Bearer ${this.apiKey}`;
    }
    
    return headers;
  }

  /**
   * Get address information
   */
  async getAddressInfo(address: string): Promise<DogeClientAddressInfo> {
    try {
      console.log(`🔍 [DogeClient] Fetching address info for: ${address}`);
      
      const response = await fetch(`${this.baseUrl}/address/${address}`, {
        headers: this.getHeaders()
      });
      
      if (!response.ok) {
        throw new Error(`DogeClient API error: ${response.status} ${response.statusText}`);
      }
      
      const data: DogeClientAddressInfo = await response.json();
      
      console.log(`✅ [DogeClient] Address info retrieved`);
      
      return data;
    } catch (error) {
      console.error('[DogeClient] Address info fetch error:', error);
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
      console.log(`🔍 [DogeClient] Fetching balance for: ${address}`);
      
      const info = await this.getAddressInfo(address);
      
      const balanceDOGE = info.balance;
      const balance = Math.round(balanceDOGE * 100000000); // Convert to shibes
      const receivedDOGE = info.received;
      const received = Math.round(receivedDOGE * 100000000);
      const sentDOGE = info.sent;
      const sent = Math.round(sentDOGE * 100000000);
      
      console.log(`✅ [DogeClient] Balance: ${balance} shibes (${balanceDOGE} DOGE)`);
      
      return {
        balance,
        received,
        sent,
        balanceDOGE
      };
    } catch (error) {
      console.error('[DogeClient] Balance fetch error:', error);
      throw new Error(`Failed to fetch balance: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get transaction by hash
   */
  async getTransaction(txHash: string): Promise<DogeClientTransaction> {
    try {
      console.log(`🔍 [DogeClient] Fetching transaction: ${txHash}`);
      
      const response = await fetch(`${this.baseUrl}/blockchain/transactions/${txHash}`, {
        headers: this.getHeaders()
      });
      
      if (!response.ok) {
        throw new Error(`DogeClient API error: ${response.status} ${response.statusText}`);
      }
      
      const transaction: DogeClientTransaction = await response.json();
      
      console.log(`✅ [DogeClient] Transaction retrieved`);
      
      return transaction;
    } catch (error) {
      console.error('[DogeClient] Transaction fetch error:', error);
      throw new Error(`Failed to fetch transaction: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get transaction history for an address
   */
  async getTransactionHistory(address: string, limit: number = 50, offset: number = 0): Promise<{
    transactions: string[];
    total: number;
  }> {
    try {
      console.log(`🔍 [DogeClient] Fetching transaction history for: ${address}`);
      
      const response = await fetch(
        `${this.baseUrl}/address/${address}/transactions?limit=${limit}&offset=${offset}`,
        {
          headers: this.getHeaders()
        }
      );
      
      if (!response.ok) {
        throw new Error(`DogeClient API error: ${response.status} ${response.statusText}`);
      }
      
      const result = await response.json();
      const transactions: string[] = result.transactions || [];
      const total = result.total || 0;
      
      console.log(`✅ [DogeClient] Found ${transactions.length} transactions (total: ${total})`);
      
      return {
        transactions,
        total
      };
    } catch (error) {
      console.error('[DogeClient] Transaction history fetch error:', error);
      throw new Error(`Failed to fetch transaction history: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Broadcast a transaction
   */
  async broadcastTransaction(txHex: string): Promise<{
    txid: string;
  }> {
    try {
      console.log('📡 [DogeClient] Broadcasting transaction...');
      
      const response = await fetch(`${this.baseUrl}/blockchain/transactions/send`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({ hex: txHex })
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`DogeClient broadcast error: ${response.status} - ${errorText}`);
      }
      
      const result = await response.json();
      
      console.log(`✅ [DogeClient] Transaction broadcast successful: ${result.txid}`);
      
      return { txid: result.txid };
    } catch (error) {
      console.error('[DogeClient] Broadcast error:', error);
      throw new Error(`Failed to broadcast transaction: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get block by hash or height
   */
  async getBlock(blockHashOrHeight: string | number): Promise<DogeClientBlock> {
    try {
      console.log(`🔍 [DogeClient] Fetching block: ${blockHashOrHeight}`);
      
      const response = await fetch(`${this.baseUrl}/blockchain/blocks/${blockHashOrHeight}`, {
        headers: this.getHeaders()
      });
      
      if (!response.ok) {
        throw new Error(`DogeClient API error: ${response.status} ${response.statusText}`);
      }
      
      const block: DogeClientBlock = await response.json();
      
      console.log(`✅ [DogeClient] Block retrieved`);
      
      return block;
    } catch (error) {
      console.error('[DogeClient] Block fetch error:', error);
      throw new Error(`Failed to fetch block: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get latest block height
   */
  async getLatestBlockHeight(): Promise<number> {
    try {
      console.log('🔍 [DogeClient] Fetching latest block height...');
      
      const stats = await this.getNetworkStats();
      
      console.log(`✅ [DogeClient] Latest block height: ${stats.blocks}`);
      
      return stats.blocks;
    } catch (error) {
      console.error('[DogeClient] Block height fetch error:', error);
      throw new Error(`Failed to fetch block height: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get network statistics
   */
  async getNetworkStats(): Promise<DogeClientNetworkStats> {
    try {
      console.log('🔍 [DogeClient] Fetching network stats...');
      
      const response = await fetch(`${this.baseUrl}/blockchain/stats`, {
        headers: this.getHeaders()
      });
      
      if (!response.ok) {
        throw new Error(`DogeClient API error: ${response.status} ${response.statusText}`);
      }
      
      const stats: DogeClientNetworkStats = await response.json();
      
      console.log(`✅ [DogeClient] Network stats retrieved`);
      
      return stats;
    } catch (error) {
      console.error('[DogeClient] Network stats fetch error:', error);
      throw new Error(`Failed to fetch network stats: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get mempool info
   */
  async getMempoolInfo(): Promise<{
    size: number;
    bytes: number;
    usage: number;
  }> {
    try {
      console.log('🔍 [DogeClient] Fetching mempool info...');
      
      const stats = await this.getNetworkStats();
      
      const mempoolInfo = {
        size: stats.mempool_size,
        bytes: stats.mempool_bytes,
        usage: stats.mempool_bytes
      };
      
      console.log(`✅ [DogeClient] Mempool size: ${mempoolInfo.size} transactions`);
      
      return mempoolInfo;
    } catch (error) {
      console.error('[DogeClient] Mempool info fetch error:', error);
      throw new Error(`Failed to fetch mempool info: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get recommended fees
   */
  async getRecommendedFees(): Promise<{
    fast: number; // shibes per byte
    medium: number;
    slow: number;
  }> {
    try {
      console.log('🔍 [DogeClient] Fetching recommended fees...');
      
      const response = await fetch(`${this.baseUrl}/blockchain/fees`, {
        headers: this.getHeaders()
      });
      
      if (!response.ok) {
        throw new Error(`DogeClient API error: ${response.status} ${response.statusText}`);
      }
      
      const result = await response.json();
      
      const fees = {
        fast: result.fast || 1000,
        medium: result.medium || 500,
        slow: result.slow || 100
      };
      
      console.log(`✅ [DogeClient] Recommended fees: Fast ${fees.fast}, Medium ${fees.medium}, Slow ${fees.slow} shibes/byte`);
      
      return fees;
    } catch (error) {
      console.error('[DogeClient] Fee recommendation fetch error:', error);
      // Return default Dogecoin fees if fetch fails
      return {
        fast: 1000,
        medium: 500,
        slow: 100
      };
    }
  }
}

// Singleton instance for convenience
export const dogeClient = new DogeClientAPI();

