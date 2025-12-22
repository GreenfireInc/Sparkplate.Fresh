// 3xpl API Implementation for Polkadot
// Website: https://3xpl.com/polkadot
// API Docs: https://3xpl.com/api
// Free tier: Free tier available
// Multi-chain explorer with API access

export interface ThreeXplAccountInfo {
  address: string;
  balance: {
    confirmed: string;
    unconfirmed: string;
  };
  transaction_count: number;
}

export interface ThreeXplTransaction {
  hash: string;
  block: number;
  time: string;
  sender: string;
  recipient: string;
  value: string;
  fee: string;
  success: boolean;
}

export class ThreeXplAPI {
  private baseUrl = 'https://api.3xpl.com';
  private network: 'polkadot' | 'kusama';

  constructor(network: 'polkadot' | 'kusama' = 'polkadot') {
    this.network = network;
  }

  /**
   * Get chain identifier for API calls
   */
  private getChainId(): string {
    return this.network === 'polkadot' ? 'polkadot' : 'kusama';
  }

  /**
   * Make an API call
   */
  private async apiCall<T = unknown>(endpoint: string): Promise<T> {
    try {
      const chain = this.getChainId();
      const url = `${this.baseUrl}/${chain}${endpoint}`;
      
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`3xpl API error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();

      if (result.error) {
        throw new Error(`3xpl API error: ${result.error}`);
      }

      return result.data || result;
    } catch (error) {
      console.error(`[3xpl] API call error (${endpoint}):`, error);
      throw new Error(`Failed to execute API call: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get account information
   */
  async getAccountInfo(address: string): Promise<ThreeXplAccountInfo> {
    try {
      console.log(`🔍 [3xpl] Fetching account info for: ${address}`);
      
      const data = await this.apiCall<ThreeXplAccountInfo>(`/address/${address}`);
      
      console.log(`✅ [3xpl] Account info retrieved`);
      
      return data;
    } catch (error) {
      console.error('[3xpl] Account info fetch error:', error);
      throw new Error(`Failed to fetch account info: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get balance for an address
   */
  async getBalance(address: string): Promise<{
    balance: bigint;
    balanceDOT: number;
    unconfirmed: bigint;
  }> {
    try {
      console.log(`🔍 [3xpl] Fetching balance for: ${address}`);
      
      const info = await this.getAccountInfo(address);
      const balance = BigInt(info.balance.confirmed || '0');
      const unconfirmed = BigInt(info.balance.unconfirmed || '0');
      const balanceDOT = Number(balance) / 1e10;
      
      console.log(`✅ [3xpl] Balance: ${balance} Planck (${balanceDOT} DOT)`);
      
      return {
        balance,
        balanceDOT,
        unconfirmed
      };
    } catch (error) {
      console.error('[3xpl] Balance fetch error:', error);
      throw new Error(`Failed to fetch balance: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get transaction history
   */
  async getTransactionHistory(
    address: string,
    limit: number = 25,
    offset: number = 0
  ): Promise<{
    transactions: ThreeXplTransaction[];
    total: number;
  }> {
    try {
      console.log(`🔍 [3xpl] Fetching transaction history for: ${address}`);
      
      const data = await this.apiCall<{
        transactions: ThreeXplTransaction[];
        total: number;
      }>(`/address/${address}/transactions?limit=${limit}&offset=${offset}`);
      
      console.log(`✅ [3xpl] Found ${data.transactions?.length || 0} transactions`);
      
      return data;
    } catch (error) {
      console.error('[3xpl] Transaction history fetch error:', error);
      throw new Error(`Failed to fetch transaction history: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get transaction details
   */
  async getTransaction(txHash: string): Promise<ThreeXplTransaction> {
    try {
      console.log(`🔍 [3xpl] Fetching transaction: ${txHash}`);
      
      const data = await this.apiCall<ThreeXplTransaction>(`/transaction/${txHash}`);
      
      console.log(`✅ [3xpl] Transaction retrieved`);
      
      return data;
    } catch (error) {
      console.error('[3xpl] Transaction fetch error:', error);
      throw new Error(`Failed to fetch transaction: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get latest block
   */
  async getLatestBlock(): Promise<{
    blockNumber: number;
    blockHash: string;
    timestamp: string;
  }> {
    try {
      console.log('🔍 [3xpl] Fetching latest block...');
      
      const data = await this.apiCall<{
        number: number;
        hash: string;
        timestamp: string;
      }>('/block/latest');
      
      console.log(`✅ [3xpl] Latest block: #${data.number}`);
      
      return {
        blockNumber: data.number,
        blockHash: data.hash,
        timestamp: data.timestamp
      };
    } catch (error) {
      console.error('[3xpl] Latest block fetch error:', error);
      throw new Error(`Failed to fetch latest block: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

// Singleton instances
export const threexplPolkadot = new ThreeXplAPI('polkadot');
export const threexplKusama = new ThreeXplAPI('kusama');

