// Blockchair API Implementation for Litecoin
// API Docs: https://blockchair.com/api/docs
// Website: https://blockchair.com/litecoin
// Free tier: 1,000 free requests per day without API key
// Multi-chain analytics and search platform

export interface BlockchairConfig {
  apiKey?: string; // Optional, for higher limits
}

export interface BlockchairAddressData {
  address: {
    type: string;
    script_hex: string;
    balance: number;
    balance_usd: number;
    received: number;
    received_usd: number;
    spent: number;
    spent_usd: number;
    output_count: number;
    unspent_output_count: number;
    first_seen_receiving: string;
    last_seen_receiving: string;
    first_seen_spending: string;
    last_seen_spending: string;
    transaction_count: number;
  };
  transactions: string[];
  utxo: Array<{
    block_id: number;
    transaction_hash: string;
    index: number;
    value: number;
  }>;
}

export interface BlockchairTransaction {
  block_id: number;
  id: number;
  hash: string;
  date: string;
  time: string;
  size: number;
  weight: number;
  version: number;
  lock_time: number;
  is_coinbase: boolean;
  has_witness: boolean;
  input_count: number;
  output_count: number;
  input_total: number;
  input_total_usd: number;
  output_total: number;
  output_total_usd: number;
  fee: number;
  fee_usd: number;
  fee_per_kb: number;
  fee_per_kb_usd: number;
  fee_per_kwu: number;
  fee_per_kwu_usd: number;
  cdd_total: number;
}

export class BlockchairAPI {
  private baseUrl = 'https://api.blockchair.com/litecoin';
  private apiKey?: string;

  constructor(config?: BlockchairConfig) {
    this.apiKey = config?.apiKey;
  }

  /**
   * Build URL with optional API key
   */
  private buildUrl(endpoint: string, params?: Record<string, string>): string {
    const url = new URL(`${this.baseUrl}${endpoint}`);
    
    if (this.apiKey) {
      url.searchParams.set('key', this.apiKey);
    }
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.set(key, value);
      });
    }
    
    return url.toString();
  }

  /**
   * Get address information including UTXOs
   */
  async getAddressInfo(address: string): Promise<BlockchairAddressData> {
    try {
      console.log(`🔍 [Blockchair-LTC] Fetching address info for: ${address}`);
      
      const url = this.buildUrl(`/dashboards/address/${address}`);
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Blockchair API error: ${response.status} ${response.statusText}`);
      }
      
      const result = await response.json();
      
      if (result.context.code !== 200) {
        throw new Error(`Blockchair API error: ${result.context.error}`);
      }
      
      const data: BlockchairAddressData = result.data[address];
      
      console.log(`✅ [Blockchair-LTC] Address info retrieved`);
      
      return data;
    } catch (error) {
      console.error('[Blockchair-LTC] Address info fetch error:', error);
      throw new Error(`Failed to fetch address info: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get balance for an address
   */
  async getBalance(address: string): Promise<{
    balance: bigint;
    balanceLTC: number;
  }> {
    try {
      console.log(`🔍 [Blockchair-LTC] Fetching balance for: ${address}`);
      
      const info = await this.getAddressInfo(address);
      const balanceLTC = info.address.balance / 1e8; // Convert satoshis to LTC
      const balance = BigInt(info.address.balance);
      
      console.log(`✅ [Blockchair-LTC] Balance: ${balance} satoshis (${balanceLTC} LTC)`);
      
      return {
        balance,
        balanceLTC
      };
    } catch (error) {
      console.error('[Blockchair-LTC] Balance fetch error:', error);
      throw new Error(`Failed to fetch balance: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Fetch UTXOs for an address
   */
  async fetchUTXOs(address: string): Promise<Array<{
    txid: string;
    vout: number;
    value: bigint;
    height: number;
  }>> {
    try {
      console.log(`🔍 [Blockchair-LTC] Fetching UTXOs for: ${address}`);
      
      const info = await this.getAddressInfo(address);
      const utxos = info.utxo.map(utxo => ({
        txid: utxo.transaction_hash,
        vout: utxo.index,
        value: BigInt(utxo.value),
        height: utxo.block_id
      }));
      
      console.log(`✅ [Blockchair-LTC] Found ${utxos.length} UTXOs`);
      
      return utxos;
    } catch (error) {
      console.error('[Blockchair-LTC] UTXO fetch error:', error);
      throw new Error(`Failed to fetch UTXOs: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get transaction history
   */
  async getTransactionHistory(
    address: string,
    limit: number = 100,
    offset: number = 0
  ): Promise<{
    transactions: string[];
    total: number;
  }> {
    try {
      console.log(`🔍 [Blockchair-LTC] Fetching transaction history for: ${address}`);
      
      const url = this.buildUrl(`/dashboards/address/${address}`, {
        limit: limit.toString(),
        offset: offset.toString()
      });
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Blockchair API error: ${response.status} ${response.statusText}`);
      }
      
      const result = await response.json();
      
      if (result.context.code !== 200) {
        throw new Error(`Blockchair API error: ${result.context.error}`);
      }
      
      const data = result.data[address];
      const transactions: string[] = data.transactions || [];
      
      console.log(`✅ [Blockchair-LTC] Found ${transactions.length} transactions`);
      
      return {
        transactions,
        total: data.address.transaction_count || 0
      };
    } catch (error) {
      console.error('[Blockchair-LTC] Transaction history fetch error:', error);
      throw new Error(`Failed to fetch transaction history: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get transaction details
   */
  async getTransaction(txHash: string): Promise<BlockchairTransaction> {
    try {
      console.log(`🔍 [Blockchair-LTC] Fetching transaction: ${txHash}`);
      
      const url = this.buildUrl(`/dashboards/transaction/${txHash}`);
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Blockchair API error: ${response.status} ${response.statusText}`);
      }
      
      const result = await response.json();
      
      if (result.context.code !== 200) {
        throw new Error(`Blockchair API error: ${result.context.error}`);
      }
      
      const data: BlockchairTransaction = result.data[txHash].transaction;
      
      console.log(`✅ [Blockchair-LTC] Transaction retrieved`);
      
      return data;
    } catch (error) {
      console.error('[Blockchair-LTC] Transaction fetch error:', error);
      throw new Error(`Failed to fetch transaction: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get network stats
   */
  async getNetworkStats(): Promise<{
    blocks: number;
    transactions: number;
    circulation: number;
    blockchain_size: number;
    difficulty: number;
    hashrate_24h: string;
    nodes: number;
    mempool_transactions: number;
    mempool_size: number;
  }> {
    try {
      console.log('🔍 [Blockchair-LTC] Fetching network stats...');
      
      const url = this.buildUrl('/stats');
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Blockchair API error: ${response.status} ${response.statusText}`);
      }
      
      const result = await response.json();
      
      if (result.context.code !== 200) {
        throw new Error(`Blockchair API error: ${result.context.error}`);
      }
      
      console.log(`✅ [Blockchair-LTC] Network stats retrieved`);
      
      return result.data;
    } catch (error) {
      console.error('[Blockchair-LTC] Network stats fetch error:', error);
      throw new Error(`Failed to fetch network stats: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Broadcast transaction
   */
  async broadcastTransaction(signedTx: string): Promise<{ txHash: string }> {
    try {
      console.log('📡 [Blockchair-LTC] Broadcasting transaction...');
      
      const url = this.buildUrl('/push/transaction');
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data: signedTx })
      });
      
      if (!response.ok) {
        throw new Error(`Blockchair API error: ${response.status} ${response.statusText}`);
      }
      
      const result = await response.json();
      
      if (result.context.code !== 200) {
        throw new Error(`Blockchair API error: ${result.context.error}`);
      }
      
      console.log(`✅ [Blockchair-LTC] Transaction broadcast: ${result.data.transaction_hash}`);
      
      return { txHash: result.data.transaction_hash };
    } catch (error) {
      console.error('[Blockchair-LTC] Broadcast error:', error);
      throw new Error(`Failed to broadcast transaction: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

// Singleton instances
export const blockchairLTC = new BlockchairAPI();
export const createBlockchairLTC = (apiKey: string) => new BlockchairAPI({ apiKey });

