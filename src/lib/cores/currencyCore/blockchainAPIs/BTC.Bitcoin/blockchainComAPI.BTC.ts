// Blockchain.com API Implementation for Bitcoin
// API Docs: https://www.blockchain.com/api
// Free tier: Available with rate limits
// One of the oldest and most trusted Bitcoin APIs

export interface BlockchainComAddress {
  hash160: string;
  address: string;
  n_tx: number;
  n_unredeemed: number;
  total_received: number;
  total_sent: number;
  final_balance: number;
  txs: Array<{
    hash: string;
    ver: number;
    vin_sz: number;
    vout_sz: number;
    size: number;
    weight: number;
    fee: number;
    relayed_by: string;
    lock_time: number;
    tx_index: number;
    double_spend: boolean;
    time: number;
    block_index?: number;
    block_height?: number;
    inputs: unknown[];
    out: unknown[];
  }>;
}

export interface BlockchainComBalance {
  [address: string]: {
    final_balance: number;
    n_tx: number;
    total_received: number;
  };
}

export interface BlockchainComUTXO {
  tx_hash: string;
  tx_hash_big_endian: string;
  tx_index: number;
  tx_output_n: number;
  script: string;
  value: number;
  value_hex: string;
  confirmations: number;
}

export class BlockchainComAPI {
  private baseUrl: string;

  constructor() {
    this.baseUrl = 'https://blockchain.info';
  }

  /**
   * Get address information with transactions
   */
  async getAddressInfo(address: string, limit: number = 50, offset: number = 0): Promise<BlockchainComAddress> {
    try {
      console.log(`🔍 [Blockchain.com] Fetching address info for: ${address}`);
      
      const response = await fetch(
        `${this.baseUrl}/rawaddr/${address}?limit=${limit}&offset=${offset}`
      );
      
      if (!response.ok) {
        throw new Error(`Blockchain.com API error: ${response.status} ${response.statusText}`);
      }
      
      const data: BlockchainComAddress = await response.json();
      
      console.log(`✅ [Blockchain.com] Address info retrieved`);
      
      return data;
    } catch (error) {
      console.error('[Blockchain.com] Address info fetch error:', error);
      throw new Error(`Failed to fetch address info: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get balance for one or multiple addresses
   */
  async getBalance(addresses: string | string[]): Promise<{
    balance: number; // in satoshis
    balanceBTC: number; // in BTC
    transactions: number;
    received: number;
    details?: BlockchainComBalance;
  }> {
    try {
      const addressList = Array.isArray(addresses) ? addresses.join('|') : addresses;
      console.log(`🔍 [Blockchain.com] Fetching balance for: ${addressList}`);
      
      const response = await fetch(
        `${this.baseUrl}/balance?active=${addressList}`
      );
      
      if (!response.ok) {
        throw new Error(`Blockchain.com API error: ${response.status} ${response.statusText}`);
      }
      
      const data: BlockchainComBalance = await response.json();
      
      // Calculate total balance across all addresses
      let totalBalance = 0;
      let totalTx = 0;
      let totalReceived = 0;
      
      for (const addr in data) {
        totalBalance += data[addr].final_balance;
        totalTx += data[addr].n_tx;
        totalReceived += data[addr].total_received;
      }
      
      const balanceBTC = totalBalance / 100000000;
      
      console.log(`✅ [Blockchain.com] Balance: ${totalBalance} satoshis (${balanceBTC} BTC)`);
      
      return {
        balance: totalBalance,
        balanceBTC,
        transactions: totalTx,
        received: totalReceived,
        details: data
      };
    } catch (error) {
      console.error('[Blockchain.com] Balance fetch error:', error);
      throw new Error(`Failed to fetch balance: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get unspent outputs (UTXOs) for addresses
   */
  async getUTXOs(addresses: string | string[], limit: number = 1000): Promise<{
    unspent_outputs: BlockchainComUTXO[];
  }> {
    try {
      const addressList = Array.isArray(addresses) ? addresses.join('|') : addresses;
      console.log(`🔍 [Blockchain.com] Fetching UTXOs for: ${addressList}`);
      
      const response = await fetch(
        `${this.baseUrl}/unspent?active=${addressList}&limit=${limit}`
      );
      
      if (!response.ok) {
        if (response.status === 500) {
          // No unspent outputs
          return { unspent_outputs: [] };
        }
        throw new Error(`Blockchain.com API error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      console.log(`✅ [Blockchain.com] Found ${data.unspent_outputs?.length || 0} UTXOs`);
      
      return data;
    } catch (error) {
      console.error('[Blockchain.com] UTXOs fetch error:', error);
      throw new Error(`Failed to fetch UTXOs: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get transaction by hash
   */
  async getTransaction(txHash: string): Promise<unknown> {
    try {
      console.log(`🔍 [Blockchain.com] Fetching transaction: ${txHash}`);
      
      const response = await fetch(`${this.baseUrl}/rawtx/${txHash}`);
      
      if (!response.ok) {
        throw new Error(`Blockchain.com API error: ${response.status} ${response.statusText}`);
      }
      
      const transaction = await response.json();
      
      console.log(`✅ [Blockchain.com] Transaction retrieved`);
      
      return transaction;
    } catch (error) {
      console.error('[Blockchain.com] Transaction fetch error:', error);
      throw new Error(`Failed to fetch transaction: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Broadcast a transaction
   */
  async broadcastTransaction(txHex: string): Promise<string> {
    try {
      console.log('📡 [Blockchain.com] Broadcasting transaction...');
      
      const response = await fetch(`${this.baseUrl}/pushtx`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `tx=${txHex}`
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Blockchain.com broadcast error: ${response.status} - ${errorText}`);
      }
      
      const result = await response.text();
      
      console.log(`✅ [Blockchain.com] Transaction broadcast successful`);
      
      return result;
    } catch (error) {
      console.error('[Blockchain.com] Broadcast error:', error);
      throw new Error(`Failed to broadcast transaction: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get latest block
   */
  async getLatestBlock(): Promise<unknown> {
    try {
      console.log('🔍 [Blockchain.com] Fetching latest block...');
      
      const response = await fetch(`${this.baseUrl}/latestblock`);
      
      if (!response.ok) {
        throw new Error(`Blockchain.com API error: ${response.status} ${response.statusText}`);
      }
      
      const block = await response.json();
      
      console.log(`✅ [Blockchain.com] Latest block: ${block.height}`);
      
      return block;
    } catch (error) {
      console.error('[Blockchain.com] Latest block fetch error:', error);
      throw new Error(`Failed to fetch latest block: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get block by hash or height
   */
  async getBlock(hashOrHeight: string | number): Promise<unknown> {
    try {
      console.log(`🔍 [Blockchain.com] Fetching block: ${hashOrHeight}`);
      
      const response = await fetch(`${this.baseUrl}/rawblock/${hashOrHeight}`);
      
      if (!response.ok) {
        throw new Error(`Blockchain.com API error: ${response.status} ${response.statusText}`);
      }
      
      const block = await response.json();
      
      console.log(`✅ [Blockchain.com] Block retrieved`);
      
      return block;
    } catch (error) {
      console.error('[Blockchain.com] Block fetch error:', error);
      throw new Error(`Failed to fetch block: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get charts data
   */
  async getChartData(chartName: string, timespan: string = '1year'): Promise<unknown> {
    try {
      console.log(`🔍 [Blockchain.com] Fetching chart data: ${chartName}`);
      
      const response = await fetch(
        `${this.baseUrl}/charts/${chartName}?timespan=${timespan}&format=json`
      );
      
      if (!response.ok) {
        throw new Error(`Blockchain.com API error: ${response.status} ${response.statusText}`);
      }
      
      const chartData = await response.json();
      
      console.log(`✅ [Blockchain.com] Chart data retrieved`);
      
      return chartData;
    } catch (error) {
      console.error('[Blockchain.com] Chart data fetch error:', error);
      throw new Error(`Failed to fetch chart data: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

// Singleton instance for convenience
export const blockchainCom = new BlockchainComAPI();

