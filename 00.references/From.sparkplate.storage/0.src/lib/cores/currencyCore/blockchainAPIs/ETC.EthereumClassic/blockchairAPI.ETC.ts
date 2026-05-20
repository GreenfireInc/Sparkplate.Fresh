// Blockchair API Implementation for Ethereum Classic
// API Docs: https://blockchair.com/api/docs
// Website: https://blockchair.com/ethereum-classic
// Free tier: 1,000 free requests per day without API key
// Multi-chain analytics and search platform

export interface BlockchairConfig {
  apiKey?: string; // Optional, for higher limits
}

export interface BlockchairAddressData {
  address: {
    type: string;
    contract_code_hex: string | null;
    contract_created: boolean;
    contract_destroyed: boolean;
    balance: string;
    balance_usd: number;
    received_approximate: string;
    received_usd: number;
    spent_approximate: string;
    spent_usd: number;
    fees_approximate: string;
    fees_usd: number;
    receiving_call_count: number;
    spending_call_count: number;
    call_count: number;
    transaction_count: number;
    first_seen_receiving: string;
    last_seen_receiving: string;
    first_seen_spending: string;
    last_seen_spending: string;
  };
  calls: unknown[];
}

export interface BlockchairTransaction {
  block_id: number;
  id: number;
  index: number;
  hash: string;
  date: string;
  time: string;
  size: number;
  failed: boolean;
  type: string;
  sender: string;
  recipient: string;
  call_count: number;
  value: string;
  value_usd: number;
  internal_value: string;
  internal_value_usd: number;
  fee: string;
  fee_usd: number;
  gas_used: number;
  gas_limit: number;
  gas_price: number;
  input_hex: string;
  nonce: number;
  v: string;
  r: string;
  s: string;
}

export class BlockchairAPI {
  private baseUrl = 'https://api.blockchair.com/ethereum-classic';
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
   * Get address information
   */
  async getAddressInfo(address: string): Promise<BlockchairAddressData> {
    try {
      console.log(`🔍 [Blockchair-ETC] Fetching address info for: ${address}`);
      
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
      
      console.log(`✅ [Blockchair-ETC] Address info retrieved`);
      
      return data;
    } catch (error) {
      console.error('[Blockchair-ETC] Address info fetch error:', error);
      throw new Error(`Failed to fetch address info: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get balance for an address
   */
  async getBalance(address: string): Promise<{
    balance: bigint;
    balanceETC: number;
  }> {
    try {
      console.log(`🔍 [Blockchair-ETC] Fetching balance for: ${address}`);
      
      const info = await this.getAddressInfo(address);
      const balance = BigInt(info.address.balance);
      const balanceETC = Number(balance) / 1e18;
      
      console.log(`✅ [Blockchair-ETC] Balance: ${balance} wei (${balanceETC} ETC)`);
      
      return {
        balance,
        balanceETC
      };
    } catch (error) {
      console.error('[Blockchair-ETC] Balance fetch error:', error);
      throw new Error(`Failed to fetch balance: ${error instanceof Error ? error.message : 'Unknown error'}`);
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
    transactions: BlockchairTransaction[];
    total: number;
  }> {
    try {
      console.log(`🔍 [Blockchair-ETC] Fetching transaction history for: ${address}`);
      
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
      const transactions: BlockchairTransaction[] = data.calls || [];
      
      console.log(`✅ [Blockchair-ETC] Found ${transactions.length} transactions`);
      
      return {
        transactions,
        total: data.address.transaction_count || 0
      };
    } catch (error) {
      console.error('[Blockchair-ETC] Transaction history fetch error:', error);
      throw new Error(`Failed to fetch transaction history: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get network stats
   */
  async getNetworkStats(): Promise<{
    blocks: number;
    transactions: number;
    circulation: string;
    blockchain_size: number;
    difficulty: string;
    hashrate_24h: string;
    nodes: number;
    mempool_transactions: number;
    mempool_size: number;
  }> {
    try {
      console.log('🔍 [Blockchair-ETC] Fetching network stats...');
      
      const url = this.buildUrl('/stats');
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Blockchair API error: ${response.status} ${response.statusText}`);
      }
      
      const result = await response.json();
      
      if (result.context.code !== 200) {
        throw new Error(`Blockchair API error: ${result.context.error}`);
      }
      
      console.log(`✅ [Blockchair-ETC] Network stats retrieved`);
      
      return result.data;
    } catch (error) {
      console.error('[Blockchair-ETC] Network stats fetch error:', error);
      throw new Error(`Failed to fetch network stats: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Broadcast transaction
   */
  async broadcastTransaction(signedTx: string): Promise<{ txHash: string }> {
    try {
      console.log('📡 [Blockchair-ETC] Broadcasting transaction...');
      
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
      
      console.log(`✅ [Blockchair-ETC] Transaction broadcast: ${result.data.transaction_hash}`);
      
      return { txHash: result.data.transaction_hash };
    } catch (error) {
      console.error('[Blockchair-ETC] Broadcast error:', error);
      throw new Error(`Failed to broadcast transaction: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

// Singleton instances
export const blockchairETC = new BlockchairAPI();
export const createBlockchairETC = (apiKey: string) => new BlockchairAPI({ apiKey });

