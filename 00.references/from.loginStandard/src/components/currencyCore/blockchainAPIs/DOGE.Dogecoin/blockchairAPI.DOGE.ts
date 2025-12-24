// Blockchair API Implementation for Dogecoin
// API Docs: https://blockchair.com/api/docs
// Free tier: 14,400 requests/day (no API key required)
// Fast and reliable blockchain explorer

export interface BlockchairDogeAddress {
  address: string;
  balance: number; // in shibes
  received: number;
  spent: number;
  output_count: number;
  unspent_output_count: number;
  first_seen_receiving: string;
  last_seen_receiving: string;
  first_seen_spending: string;
  last_seen_spending: string;
  transaction_count: number;
}

export interface BlockchairDogeUTXO {
  block_id: number;
  transaction_hash: string;
  index: number;
  value: number; // in shibes
  address: string;
  script_hex: string;
  is_spent: boolean;
  spending_block_id?: number;
  spending_transaction_hash?: string;
  spending_index?: number;
  spending_sequence?: number;
  spending_signature_hex?: string;
  spending_witness?: string;
  lifespan?: number;
  cdd?: number;
}

export interface BlockchairDogeTransaction {
  transaction: {
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
  };
  inputs: Array<{
    block_id: number;
    transaction_id: number;
    index: number;
    transaction_hash: string;
    date: string;
    time: string;
    value: number;
    value_usd: number;
    recipient: string;
    type: string;
    script_hex: string;
    is_from_coinbase: boolean;
    is_spendable: boolean;
    is_spent: boolean;
    spending_block_id: number;
    spending_transaction_id: number;
    spending_index: number;
    spending_transaction_hash: string;
    spending_date: string;
    spending_time: string;
    spending_value_usd: number;
    spending_sequence: number;
    spending_signature_hex: string;
    lifespan: number;
    cdd: number;
  }>;
  outputs: Array<{
    block_id: number;
    transaction_id: number;
    index: number;
    transaction_hash: string;
    date: string;
    time: string;
    value: number;
    value_usd: number;
    recipient: string;
    type: string;
    script_hex: string;
    is_from_coinbase: boolean;
    is_spendable: boolean;
  }>;
}

export class BlockchairDogeAPI {
  private baseUrl = 'https://api.blockchair.com/dogecoin';
  private apiKey?: string;

  constructor(apiKey?: string) {
    this.apiKey = apiKey;
  }

  /**
   * Build URL with optional API key
   */
  private buildUrl(path: string, params?: Record<string, string>): string {
    const url = new URL(`${this.baseUrl}${path}`);
    
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
   * Get address information
   */
  async getAddressInfo(address: string): Promise<BlockchairDogeAddress> {
    try {
      console.log(`🔍 [Blockchair-DOGE] Fetching address info for: ${address}`);
      
      const url = this.buildUrl(`/dashboards/address/${address}`);
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Blockchair API error: ${response.status} ${response.statusText}`);
      }
      
      const result = await response.json();
      
      if (result.context?.error) {
        throw new Error(`Blockchair API error: ${result.context.error}`);
      }
      
      const data: BlockchairDogeAddress = result.data[address].address;
      
      console.log(`✅ [Blockchair-DOGE] Address info retrieved`);
      
      return data;
    } catch (error) {
      console.error('[Blockchair-DOGE] Address info fetch error:', error);
      throw new Error(`Failed to fetch address info: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get balance for an address
   */
  async getBalance(address: string): Promise<{
    balance: number; // in shibes
    received: number;
    spent: number;
    balanceDOGE: number; // in DOGE
  }> {
    try {
      console.log(`🔍 [Blockchair-DOGE] Fetching balance for: ${address}`);
      
      const info = await this.getAddressInfo(address);
      
      const balance = info.balance;
      const received = info.received;
      const spent = info.spent;
      const balanceDOGE = balance / 100000000;
      
      console.log(`✅ [Blockchair-DOGE] Balance: ${balance} shibes (${balanceDOGE} DOGE)`);
      
      return {
        balance,
        received,
        spent,
        balanceDOGE
      };
    } catch (error) {
      console.error('[Blockchair-DOGE] Balance fetch error:', error);
      throw new Error(`Failed to fetch balance: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get UTXOs for an address
   */
  async getUTXOs(address: string, limit: number = 100): Promise<BlockchairDogeUTXO[]> {
    try {
      console.log(`🔍 [Blockchair-DOGE] Fetching UTXOs for: ${address}`);
      
      const url = this.buildUrl(`/dashboards/address/${address}`, {
        limit: limit.toString(),
        state: 'latest'
      });
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Blockchair API error: ${response.status} ${response.statusText}`);
      }
      
      const result = await response.json();
      
      if (result.context?.error) {
        throw new Error(`Blockchair API error: ${result.context.error}`);
      }
      
      const utxos: BlockchairDogeUTXO[] = result.data[address].utxo || [];
      
      console.log(`✅ [Blockchair-DOGE] Found ${utxos.length} UTXOs`);
      
      return utxos;
    } catch (error) {
      console.error('[Blockchair-DOGE] UTXO fetch error:', error);
      throw new Error(`Failed to fetch UTXOs: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get transaction by hash
   */
  async getTransaction(txHash: string): Promise<BlockchairDogeTransaction> {
    try {
      console.log(`🔍 [Blockchair-DOGE] Fetching transaction: ${txHash}`);
      
      const url = this.buildUrl(`/dashboards/transaction/${txHash}`);
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Blockchair API error: ${response.status} ${response.statusText}`);
      }
      
      const result = await response.json();
      
      if (result.context?.error) {
        throw new Error(`Blockchair API error: ${result.context.error}`);
      }
      
      const transaction: BlockchairDogeTransaction = result.data[txHash];
      
      console.log(`✅ [Blockchair-DOGE] Transaction retrieved`);
      
      return transaction;
    } catch (error) {
      console.error('[Blockchair-DOGE] Transaction fetch error:', error);
      throw new Error(`Failed to fetch transaction: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get transaction history for an address
   */
  async getTransactionHistory(
    address: string,
    limit: number = 100,
    offset: number = 0
  ): Promise<{
    transactions: unknown[];
    total: number;
  }> {
    try {
      console.log(`🔍 [Blockchair-DOGE] Fetching transaction history for: ${address}`);
      
      const url = this.buildUrl(`/dashboards/address/${address}`, {
        limit: limit.toString(),
        offset: offset.toString()
      });
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Blockchair API error: ${response.status} ${response.statusText}`);
      }
      
      const result = await response.json();
      
      if (result.context?.error) {
        throw new Error(`Blockchair API error: ${result.context.error}`);
      }
      
      const transactions = result.data[address].transactions || [];
      const total = result.data[address].address.transaction_count || 0;
      
      console.log(`✅ [Blockchair-DOGE] Found ${transactions.length} transactions (total: ${total})`);
      
      return {
        transactions,
        total
      };
    } catch (error) {
      console.error('[Blockchair-DOGE] Transaction history fetch error:', error);
      throw new Error(`Failed to fetch transaction history: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Broadcast a transaction
   */
  async broadcastTransaction(txHex: string): Promise<{
    data: {
      transaction_hash: string;
    };
  }> {
    try {
      console.log('📡 [Blockchair-DOGE] Broadcasting transaction...');
      
      const url = this.buildUrl('/push/transaction');
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data: txHex })
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Blockchair broadcast error: ${response.status} - ${errorText}`);
      }
      
      const result = await response.json();
      
      if (result.context?.error) {
        throw new Error(`Blockchair API error: ${result.context.error}`);
      }
      
      console.log(`✅ [Blockchair-DOGE] Transaction broadcast successful: ${result.data.transaction_hash}`);
      
      return result;
    } catch (error) {
      console.error('[Blockchair-DOGE] Broadcast error:', error);
      throw new Error(`Failed to broadcast transaction: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get network statistics
   */
  async getNetworkStats(): Promise<{
    blocks: number;
    transactions: number;
    outputs: number;
    circulation: number;
    difficulty: number;
    hashrate_24h: string;
    mempool_transactions: number;
    mempool_size: number;
    suggested_transaction_fee_per_byte_sat: number;
  }> {
    try {
      console.log('🔍 [Blockchair-DOGE] Fetching network stats...');
      
      const url = this.buildUrl('/stats');
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Blockchair API error: ${response.status} ${response.statusText}`);
      }
      
      const result = await response.json();
      
      if (result.context?.error) {
        throw new Error(`Blockchair API error: ${result.context.error}`);
      }
      
      console.log(`✅ [Blockchair-DOGE] Network stats retrieved`);
      
      return result.data;
    } catch (error) {
      console.error('[Blockchair-DOGE] Network stats fetch error:', error);
      throw new Error(`Failed to fetch network stats: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get multiple addresses balances (bulk query)
   */
  async getBalances(addresses: string[]): Promise<Record<string, {
    balance: number;
    received: number;
    spent: number;
  }>> {
    try {
      console.log(`🔍 [Blockchair-DOGE] Fetching balances for ${addresses.length} addresses...`);
      
      const addressList = addresses.join(',');
      const url = this.buildUrl(`/dashboards/addresses/${addressList}`);
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Blockchair API error: ${response.status} ${response.statusText}`);
      }
      
      const result = await response.json();
      
      if (result.context?.error) {
        throw new Error(`Blockchair API error: ${result.context.error}`);
      }
      
      const balances: Record<string, { balance: number; received: number; spent: number; }> = {};
      
      for (const address of addresses) {
        const addrData = result.data[address].address;
        balances[address] = {
          balance: addrData.balance,
          received: addrData.received,
          spent: addrData.spent
        };
      }
      
      console.log(`✅ [Blockchair-DOGE] Balances retrieved for ${addresses.length} addresses`);
      
      return balances;
    } catch (error) {
      console.error('[Blockchair-DOGE] Balances fetch error:', error);
      throw new Error(`Failed to fetch balances: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

// Singleton instance for convenience
export const blockchairDoge = new BlockchairDogeAPI();

