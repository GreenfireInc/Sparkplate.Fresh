/**
 * LuncScan API for Terra Classic (LUNC)
 * 
 * Terra Classic blockchain tracker specifically designed for LUNC
 * 
 * Features:
 * - Free access with rate limits
 * - Track LUNC (native coin of original Terra blockchain)
 * - Burn tracking and statistics
 * - Account and transaction monitoring
 * 
 * Website: https://luncscan.com/
 */

// API Configuration
export interface LuncScanConfig {
  baseURL?: string;
  timeout?: number;
  retries?: number;
}

// Account Information
export interface LuncScanAccountInfo {
  address: string;
  account_number: string;
  sequence: string;
  balances: Array<{
    denom: string;
    amount: string;
    available: string;
    delegated: string;
    unbonding: string;
  }>;
  total_value_usd: number;
}

// Transaction
export interface LuncScanTransaction {
  txhash: string;
  height: number;
  timestamp: string;
  code: number;
  gas_wanted: string;
  gas_used: string;
  fee: Array<{
    denom: string;
    amount: string;
  }>;
  memo: string;
  messages: Array<{
    type: string;
    sender?: string;
    receiver?: string;
    amount?: Array<{
      denom: string;
      amount: string;
    }>;
  }>;
  events: unknown[];
}

// Block
export interface LuncScanBlock {
  height: number;
  hash: string;
  time: string;
  chain_id: string;
  proposer: {
    address: string;
    moniker: string;
  };
  tx_count: number;
  total_gas: string;
}

// Burn Information
export interface LuncScanBurnInfo {
  total_burned: string;
  burn_24h: string;
  burn_7d: string;
  burn_30d: string;
  tax_burned: string;
  oracle_burned: string;
  ibc_burned: string;
  burn_transactions: number;
}

// Validator
export interface LuncScanValidator {
  operator_address: string;
  consensus_address: string;
  jailed: boolean;
  status: string;
  tokens: string;
  delegator_shares: string;
  description: {
    moniker: string;
    identity: string;
    website: string;
    details: string;
  };
  commission: {
    rate: string;
    max_rate: string;
    max_change_rate: string;
  };
  voting_power: string;
  rank: number;
  uptime: number;
}

// Statistics
export interface LuncScanStats {
  price: number;
  market_cap: number;
  volume_24h: number;
  change_24h: number;
  total_supply: string;
  circulating_supply: string;
  bonded_tokens: string;
  bonded_ratio: number;
  inflation: string;
  staking_apr: number;
  total_burned: string;
}

export class LuncScanAPI {
  private config: Required<LuncScanConfig>;

  constructor(config: LuncScanConfig = {}) {
    this.config = {
      baseURL: config.baseURL || 'https://luncscan.com/api',
      timeout: config.timeout || 20000, // Increased from 10s to 20s due to slow API response times
      retries: config.retries || 3,
    };
  }

  /**
   * Internal fetch helper with timeout
   */
  private async fetchWithTimeout(url: string, options: RequestInit = {}): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }

  /**
   * Helper method to build query string from params
   */
  private buildQueryString(params: Record<string, string | number | undefined>): string {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, String(value));
      }
    });
    return queryParams.toString();
  }

  /**
   * Helper method for GET requests
   */
  private async get<T>(endpoint: string, params?: Record<string, string | number | undefined>): Promise<T> {
    let url = `${this.config.baseURL}${endpoint}`;
    if (params) {
      const queryString = this.buildQueryString(params);
      if (queryString) {
        url += `?${queryString}`;
      }
    }
    
    const response = await this.fetchWithTimeout(url);
    if (!response.ok) {
      throw new Error(`LuncScan API error: ${response.status} ${response.statusText}`);
    }
    return response.json();
  }

  /**
   * Get account information
   */
  async getAccountInfo(address: string): Promise<LuncScanAccountInfo> {
    return this.get<LuncScanAccountInfo>(`/account/${address}`);
  }

  /**
   * Get account balance
   */
  async getBalance(address: string): Promise<Array<{ denom: string; amount: string }>> {
    const data = await this.get<{ balances?: Array<{ denom: string; amount: string }> }>(`/account/${address}/balance`);
    return data.balances || [];
  }

  /**
   * Get transaction by hash
   */
  async getTransaction(txHash: string): Promise<LuncScanTransaction> {
    return this.get<LuncScanTransaction>(`/tx/${txHash}`);
  }

  /**
   * Get transaction history for an address
   */
  async getTransactionHistory(
    address: string,
    limit: number = 50,
    offset: number = 0
  ): Promise<LuncScanTransaction[]> {
    const data = await this.get<{ txs?: LuncScanTransaction[] }>(`/account/${address}/txs`, { limit, offset });
    return data.txs || [];
  }

  /**
   * Get block by height
   */
  async getBlock(height: number): Promise<LuncScanBlock> {
    return this.get<LuncScanBlock>(`/block/${height}`);
  }

  /**
   * Get latest block
   */
  async getLatestBlock(): Promise<LuncScanBlock> {
    return this.get<LuncScanBlock>('/block/latest');
  }

  /**
   * Get current block height
   */
  async getCurrentHeight(): Promise<number> {
    const block = await this.getLatestBlock();
    return block.height;
  }

  /**
   * Get recent blocks
   */
  async getRecentBlocks(limit: number = 20): Promise<LuncScanBlock[]> {
    const data = await this.get<{ blocks?: LuncScanBlock[] }>('/blocks', { limit });
    return data.blocks || [];
  }

  /**
   * Get burn information
   */
  async getBurnInfo(): Promise<LuncScanBurnInfo> {
    return this.get<LuncScanBurnInfo>('/burn');
  }

  /**
   * Get burn transactions
   */
  async getBurnTransactions(limit: number = 50, offset: number = 0): Promise<LuncScanTransaction[]> {
    const data = await this.get<{ transactions?: LuncScanTransaction[] }>('/burn/transactions', { limit, offset });
    return data.transactions || [];
  }

  /**
   * Get validators
   */
  async getValidators(status?: string): Promise<LuncScanValidator[]> {
    const data = await this.get<{ validators?: LuncScanValidator[] }>('/validators', status ? { status } : undefined);
    return data.validators || [];
  }

  /**
   * Get validator by address
   */
  async getValidator(validatorAddress: string): Promise<LuncScanValidator> {
    return this.get<LuncScanValidator>(`/validator/${validatorAddress}`);
  }

  /**
   * Get delegations for an address
   */
  async getDelegations(address: string): Promise<unknown[]> {
    const data = await this.get<{ delegations?: unknown[] }>(`/account/${address}/delegations`);
    return data.delegations || [];
  }

  /**
   * Get unbonding delegations for an address
   */
  async getUnbondingDelegations(address: string): Promise<unknown[]> {
    const data = await this.get<{ unbonding?: unknown[] }>(`/account/${address}/unbonding`);
    return data.unbonding || [];
  }

  /**
   * Get staking rewards for an address
   */
  async getRewards(address: string): Promise<unknown[]> {
    const data = await this.get<{ rewards?: unknown[] }>(`/account/${address}/rewards`);
    return data.rewards || [];
  }

  /**
   * Get chain statistics
   */
  async getChainStats(): Promise<LuncScanStats> {
    return this.get<LuncScanStats>('/stats');
  }

  /**
   * Get price information
   */
  async getPrice(): Promise<{
    price: number;
    market_cap: number;
    volume_24h: number;
    change_24h: number;
    change_7d: number;
    change_30d: number;
  }> {
    return this.get<{
      price: number;
      market_cap: number;
      volume_24h: number;
      change_24h: number;
      change_7d: number;
      change_30d: number;
    }>('/price');
  }

  /**
   * Get LUNC price with 24h change
   * LuncScan provides 24h change directly in the API response
   */
  async getLUNCPriceWithChange(): Promise<{
    price: number;
    priceChange: number;
    volumeUSD: number;
    marketCapUSD: number;
  }> {
    try {
      console.log('🔍 [LuncScan] Fetching LUNC price...');
      
      const priceData = await this.getPrice();
      
      console.log(`✅ [LuncScan] LUNC Price: $${priceData.price.toFixed(6)} USD (24h: ${priceData.change_24h.toFixed(2)}%)`);
      
      return {
        price: priceData.price,
        priceChange: priceData.change_24h,
        volumeUSD: priceData.volume_24h,
        marketCapUSD: priceData.market_cap,
      };
    } catch (error) {
      console.error('[LuncScan] LUNC price fetch error:', error);
      throw new Error(`Failed to fetch LUNC price: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Search across the blockchain
   */
  async search(query: string): Promise<{
    type: 'account' | 'transaction' | 'block' | 'validator';
    result: unknown;
  }> {
    return this.get<{
      type: 'account' | 'transaction' | 'block' | 'validator';
      result: unknown;
    }>('/search', { q: query });
  }

  /**
   * Get proposals (governance)
   */
  async getProposals(status?: string): Promise<unknown[]> {
    const data = await this.get<{ proposals?: unknown[] }>('/proposals', status ? { status } : undefined);
    return data.proposals || [];
  }

  /**
   * Get proposal by ID
   */
  async getProposal(proposalId: number): Promise<unknown> {
    return this.get<unknown>(`/proposal/${proposalId}`);
  }
}

// Singleton instance
export const luncScanAPI = new LuncScanAPI();

