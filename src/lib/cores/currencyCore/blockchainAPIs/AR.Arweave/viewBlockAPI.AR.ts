// ViewBlock API Implementation for Arweave
// API Docs: https://viewblock.io/api
// Free tier: 100 requests per minute, 10,000 per day
// Premium tiers available with API key

export interface ViewBlockTransaction {
  id: string;
  block: {
    height: number;
    timestamp: number;
    id: string;
  };
  recipient: string;
  sender: {
    address: string;
  };
  fee: {
    winston: string;
    ar: string;
  };
  quantity: {
    winston: string;
    ar: string;
  };
  data: {
    size: string;
    type: string;
  };
  tags: Array<{
    name: string;
    value: string;
  }>;
  bundledIn?: {
    id: string;
  };
}

export interface ViewBlockAddress {
  address: string;
  balance: {
    winston: string;
    ar: string;
  };
  txs: {
    sent: number;
    received: number;
  };
  data: {
    size: string;
    txs: number;
  };
}

export interface ViewBlockAddressTransactions {
  txs: ViewBlockTransaction[];
  cursor?: string;
}

export interface ViewBlockConfig {
  apiKey?: string;
  network?: 'mainnet' | 'testnet';
  timeout?: number;
}

export class ViewBlockAPI {
  private baseUrl: string;
  private apiKey?: string;
  private network: 'mainnet' | 'testnet';

  constructor(config: ViewBlockConfig = {}) {
    this.network = config.network || 'mainnet';
    this.apiKey = config.apiKey;
    
    // ViewBlock uses different endpoints for different networks
    this.baseUrl = this.network === 'mainnet'
      ? 'https://api.viewblock.io/v1/arweave'
      : 'https://api.viewblock.io/v1/arweave-testnet';
  }

  /**
   * Make authenticated request to ViewBlock API
   */
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    try {
      const url = `${this.baseUrl}${endpoint}`;
      console.log(`🌐 [ViewBlock] Request: ${url}`);
      
      const headers: Record<string, string> = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      };
      
      // Add API key if provided
      if (this.apiKey) {
        headers['X-API-KEY'] = this.apiKey;
      }
      
      const response = await fetch(url, {
        headers,
        ...options
      });

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error('Rate limit exceeded. Consider upgrading to premium tier.');
        }
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return data as T;
    } catch (error) {
      console.error(`[ViewBlock] Request failed for ${endpoint}:`, error);
      throw error;
    }
  }

  /**
   * Get address information
   */
  async getAddress(address: string): Promise<ViewBlockAddress> {
    try {
      console.log(`🔍 [ViewBlock] Fetching address info for: ${address}`);
      
      const addressInfo = await this.request<ViewBlockAddress>(`/addresses/${address}`);
      
      console.log(`✅ [ViewBlock] Address info retrieved - Balance: ${addressInfo.balance.ar} AR`);
      
      return addressInfo;
    } catch (error) {
      console.error('[ViewBlock] Address fetch error:', error);
      throw new Error(`Failed to fetch address info: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get address transactions
   */
  async getAddressTransactions(
    address: string, 
    options: {
      cursor?: string;
      limit?: number;
      sort?: 'desc' | 'asc';
    } = {}
  ): Promise<ViewBlockAddressTransactions> {
    try {
      console.log(`🔍 [ViewBlock] Fetching transactions for address: ${address}`);
      
      const params = new URLSearchParams();
      if (options.cursor) params.append('cursor', options.cursor);
      if (options.limit) params.append('limit', options.limit.toString());
      if (options.sort) params.append('sort', options.sort);
      
      const endpoint = `/addresses/${address}/txs${params.toString() ? '?' + params.toString() : ''}`;
      const result = await this.request<ViewBlockAddressTransactions>(endpoint);
      
      console.log(`✅ [ViewBlock] Found ${result.txs.length} transactions`);
      
      return result;
    } catch (error) {
      console.error('[ViewBlock] Address transactions fetch error:', error);
      throw new Error(`Failed to fetch address transactions: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get transaction details
   */
  async getTransaction(txId: string): Promise<ViewBlockTransaction> {
    try {
      console.log(`🔍 [ViewBlock] Fetching transaction: ${txId}`);
      
      const transaction = await this.request<ViewBlockTransaction>(`/txs/${txId}`);
      
      console.log(`✅ [ViewBlock] Transaction retrieved - Block: ${transaction.block.height}`);
      
      return transaction;
    } catch (error) {
      console.error('[ViewBlock] Transaction fetch error:', error);
      throw new Error(`Failed to fetch transaction: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get block information
   */
  async getBlock(identifier: string | number): Promise<{
    height: number;
    id: string;
    timestamp: number;
    txs: number;
    miner: string;
    reward: string;
    size: string;
  }> {
    try {
      const endpoint = typeof identifier === 'number' 
        ? `/blocks/${identifier}`
        : `/blocks/${identifier}`;
      
      console.log(`🔍 [ViewBlock] Fetching block: ${identifier}`);
      
      const block = await this.request<{
        height: number;
        id: string;
        timestamp: number;
        txs: number;
        miner: string;
        reward: string;
        size: string;
      }>(endpoint);
      
      console.log(`✅ [ViewBlock] Block retrieved: height ${block.height}`);
      
      return block;
    } catch (error) {
      console.error('[ViewBlock] Block fetch error:', error);
      throw new Error(`Failed to fetch block: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Search transactions
   */
  async searchTransactions(query: {
    tags?: Array<{ name: string; value: string }>;
    from?: string;
    to?: string;
    limit?: number;
    sort?: 'desc' | 'asc';
  } = {}): Promise<{
    txs: ViewBlockTransaction[];
    cursor?: string;
  }> {
    try {
      console.log(`🔍 [ViewBlock] Searching transactions...`);
      
      const params = new URLSearchParams();
      if (query.from) params.append('from', query.from);
      if (query.to) params.append('to', query.to);
      if (query.limit) params.append('limit', query.limit.toString());
      if (query.sort) params.append('sort', query.sort);
      
      // Add tag filters
      if (query.tags) {
        query.tags.forEach((tag, index) => {
          params.append(`tag[${index}][name]`, tag.name);
          params.append(`tag[${index}][value]`, tag.value);
        });
      }
      
      const endpoint = `/txs/search${params.toString() ? '?' + params.toString() : ''}`;
      const result = await this.request<{
        txs: ViewBlockTransaction[];
        cursor?: string;
      }>(endpoint);
      
      console.log(`✅ [ViewBlock] Found ${result.txs.length} transactions`);
      
      return result;
    } catch (error) {
      console.error('[ViewBlock] Transaction search error:', error);
      throw new Error(`Failed to search transactions: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get network statistics
   */
  async getNetworkStats(): Promise<{
    height: number;
    hashrate: string;
    difficulty: string;
    weaveSize: string;
    blockTime: number;
    networkTxs: number;
  }> {
    try {
      console.log('🔍 [ViewBlock] Fetching network statistics...');
      
      const stats = await this.request<{
        height: number;
        hashrate: string;
        difficulty: string;
        weaveSize: string;
        blockTime: number;
        networkTxs: number;
      }>('/stats');
      
      console.log(`✅ [ViewBlock] Network stats retrieved - Height: ${stats.height}`);
      
      return stats;
    } catch (error) {
      console.error('[ViewBlock] Network stats fetch error:', error);
      throw new Error(`Failed to fetch network stats: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

// Singleton instances for convenience
export const viewBlockMainnet = new ViewBlockAPI({ network: 'mainnet' });
export const viewBlockTestnet = new ViewBlockAPI({ network: 'testnet' });

// Helper to create instance with API key
export const createViewBlockAPI = (apiKey: string, network: 'mainnet' | 'testnet' = 'mainnet') => {
  return new ViewBlockAPI({ apiKey, network });
};
