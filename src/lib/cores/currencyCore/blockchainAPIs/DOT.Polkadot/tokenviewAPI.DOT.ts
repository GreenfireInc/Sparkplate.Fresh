// Tokenview API Implementation for Polkadot
// API Docs: https://services.tokenview.io/docs
// Website: https://dot.tokenview.io/
// Free tier: Free tier available
// Multi-chain explorer with Polkadot support

export interface TokenviewConfig {
  apiKey: string; // Required API key
}

export interface TokenviewAccountInfo {
  address: string;
  balance: string;
  nonce: number;
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
  private network: 'polkadot' | 'kusama';

  constructor(config: TokenviewConfig, network: 'polkadot' | 'kusama' = 'polkadot') {
    this.apiKey = config.apiKey;
    this.network = network;
  }

  /**
   * Get coin code for API calls
   */
  private getCoinCode(): string {
    return this.network === 'polkadot' ? 'dot' : 'ksm';
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
      console.error(`[Tokenview] API call error (${endpoint}):`, error);
      throw new Error(`Failed to execute API call: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get account information
   */
  async getAccountInfo(address: string): Promise<TokenviewAccountInfo> {
    try {
      console.log(`🔍 [Tokenview] Fetching account info for: ${address}`);
      
      const coin = this.getCoinCode();
      const data = await this.apiCall<TokenviewAccountInfo>(`${coin}/address/balance/${address}`);
      
      console.log(`✅ [Tokenview] Account info retrieved`);
      
      return data;
    } catch (error) {
      console.error('[Tokenview] Account info fetch error:', error);
      throw new Error(`Failed to fetch account info: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get balance for an address
   */
  async getBalance(address: string): Promise<{
    balance: bigint;
    balanceDOT: number;
  }> {
    try {
      console.log(`🔍 [Tokenview] Fetching balance for: ${address}`);
      
      const info = await this.getAccountInfo(address);
      const balance = BigInt(Math.round(parseFloat(info.balance) * 1e10)); // Convert DOT to Planck
      const balanceDOT = parseFloat(info.balance);
      
      console.log(`✅ [Tokenview] Balance: ${balance} Planck (${balanceDOT} DOT)`);
      
      return {
        balance,
        balanceDOT
      };
    } catch (error) {
      console.error('[Tokenview] Balance fetch error:', error);
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
      console.log(`🔍 [Tokenview] Fetching transaction history for: ${address}`);
      
      const coin = this.getCoinCode();
      const data = await this.apiCall<{
        transactions: TokenviewTransaction[];
        page: number;
        total: number;
      }>(`${coin}/address/tx/${address}/${page}`);
      
      console.log(`✅ [Tokenview] Found ${data.transactions?.length || 0} transactions`);
      
      return data;
    } catch (error) {
      console.error('[Tokenview] Transaction history fetch error:', error);
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
      console.log('🔍 [Tokenview] Fetching latest block...');
      
      const coin = this.getCoinCode();
      const data = await this.apiCall<{
        height: number;
        hash: string;
        time: number;
      }>(`${coin}/block/latest`);
      
      console.log(`✅ [Tokenview] Latest block: #${data.height}`);
      
      return {
        blockNumber: data.height,
        blockHash: data.hash,
        timestamp: data.time
      };
    } catch (error) {
      console.error('[Tokenview] Latest block fetch error:', error);
      throw new Error(`Failed to fetch latest block: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get transaction details
   */
  async getTransaction(txHash: string): Promise<TokenviewTransaction> {
    try {
      console.log(`🔍 [Tokenview] Fetching transaction: ${txHash}`);
      
      const coin = this.getCoinCode();
      const data = await this.apiCall<TokenviewTransaction>(`${coin}/tx/${txHash}`);
      
      console.log(`✅ [Tokenview] Transaction retrieved`);
      
      return data;
    } catch (error) {
      console.error('[Tokenview] Transaction fetch error:', error);
      throw new Error(`Failed to fetch transaction: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

// Factory functions
export const createTokenviewPolkadot = (apiKey: string) => new TokenviewAPI({ apiKey }, 'polkadot');
export const createTokenviewKusama = (apiKey: string) => new TokenviewAPI({ apiKey }, 'kusama');

