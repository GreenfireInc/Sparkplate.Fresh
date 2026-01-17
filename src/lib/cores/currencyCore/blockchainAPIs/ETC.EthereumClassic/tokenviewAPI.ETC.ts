// Tokenview API Implementation for Ethereum Classic
// API Docs: https://services.tokenview.io/docs
// Website: https://etc.tokenview.io/
// Free tier: Free tier available
// Multi-chain explorer with ETC support

export interface TokenviewConfig {
  apiKey: string; // Required API key
}

export interface TokenviewAccountInfo {
  address: string;
  balance: string;
  txCount: number;
}

export interface TokenviewTransaction {
  txid: string;
  from: string;
  to: string;
  value: string;
  fee: string;
  blockno: number;
  time: number;
  status: string;
}

export class TokenviewAPI {
  private baseUrl = 'https://services.tokenview.io/vipapi';
  private apiKey: string;

  constructor(config: TokenviewConfig) {
    this.apiKey = config.apiKey;
  }

  /**
   * Make an API call
   */
  private async apiCall<T = unknown>(endpoint: string): Promise<T> {
    try {
      const url = `${this.baseUrl}/${endpoint}?apikey=${this.apiKey}`;
      
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Tokenview API error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();

      if (result.code !== 1) {
        throw new Error(`Tokenview API error: ${result.msg} (code: ${result.code})`);
      }

      return result.data;
    } catch (error) {
      console.error(`[Tokenview-ETC] API call error (${endpoint}):`, error);
      throw new Error(`Failed to execute API call: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get account information
   */
  async getAccountInfo(address: string): Promise<TokenviewAccountInfo> {
    try {
      console.log(`🔍 [Tokenview-ETC] Fetching account info for: ${address}`);
      
      const data = await this.apiCall<TokenviewAccountInfo>(`etc/address/balance/${address}`);
      
      console.log(`✅ [Tokenview-ETC] Account info retrieved`);
      
      return data;
    } catch (error) {
      console.error('[Tokenview-ETC] Account info fetch error:', error);
      throw new Error(`Failed to fetch account info: ${error instanceof Error ? error.message : 'Unknown error'}`);
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
      console.log(`🔍 [Tokenview-ETC] Fetching balance for: ${address}`);
      
      const info = await this.getAccountInfo(address);
      const balance = BigInt(Math.round(parseFloat(info.balance) * 1e18));
      const balanceETC = parseFloat(info.balance);
      
      console.log(`✅ [Tokenview-ETC] Balance: ${balance} wei (${balanceETC} ETC)`);
      
      return {
        balance,
        balanceETC
      };
    } catch (error) {
      console.error('[Tokenview-ETC] Balance fetch error:', error);
      throw new Error(`Failed to fetch balance: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get transaction history
   */
  async getTransactionHistory(
    address: string,
    page: number = 1
  ): Promise<{
    transactions: TokenviewTransaction[];
    page: number;
    total: number;
  }> {
    try {
      console.log(`🔍 [Tokenview-ETC] Fetching transaction history for: ${address}`);
      
      const data = await this.apiCall<{
        transactions: TokenviewTransaction[];
        page: number;
        total: number;
      }>(`etc/address/tx/${address}/${page}`);
      
      console.log(`✅ [Tokenview-ETC] Found ${data.transactions?.length || 0} transactions`);
      
      return data;
    } catch (error) {
      console.error('[Tokenview-ETC] Transaction history fetch error:', error);
      throw new Error(`Failed to fetch transaction history: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get latest block
   */
  async getLatestBlock(): Promise<{
    blockNumber: number;
    blockHash: string;
    timestamp: number;
  }> {
    try {
      console.log('🔍 [Tokenview-ETC] Fetching latest block...');
      
      const data = await this.apiCall<{
        height: number;
        hash: string;
        time: number;
      }>('etc/block/latest');
      
      console.log(`✅ [Tokenview-ETC] Latest block: #${data.height}`);
      
      return {
        blockNumber: data.height,
        blockHash: data.hash,
        timestamp: data.time
      };
    } catch (error) {
      console.error('[Tokenview-ETC] Latest block fetch error:', error);
      throw new Error(`Failed to fetch latest block: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get transaction details
   */
  async getTransaction(txHash: string): Promise<TokenviewTransaction> {
    try {
      console.log(`🔍 [Tokenview-ETC] Fetching transaction: ${txHash}`);
      
      const data = await this.apiCall<TokenviewTransaction>(`etc/tx/${txHash}`);
      
      console.log(`✅ [Tokenview-ETC] Transaction retrieved`);
      
      return data;
    } catch (error) {
      console.error('[Tokenview-ETC] Transaction fetch error:', error);
      throw new Error(`Failed to fetch transaction: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

// Factory function
export const createTokenviewETC = (apiKey: string) => new TokenviewAPI({ apiKey });

