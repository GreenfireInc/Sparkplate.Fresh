// Subscan API Implementation for Polkadot
// API Docs: https://support.subscan.io/ or https://documenter.getpostman.com/view/1618960/TVCe1oRU
// Free tier: Free API key with quotas, higher quotas with paid plans
// Most comprehensive Substrate ecosystem explorer

export interface SubscanConfig {
  apiKey?: string; // Optional, recommended for higher limits
}

export interface SubscanAccountInfo {
  address: string;
  balance: string;
  balance_lock: string;
  bonded: string;
  democracy_lock: string;
  election_lock: string;
  unbonding: string;
  account_display?: {
    address: string;
    display: string;
    judgements: unknown[];
    account_index: string;
    identity: boolean;
    parent?: {
      address: string;
      display: string;
      sub_symbol: string;
      identity: boolean;
    };
  };
}

export interface SubscanTransaction {
  block_num: number;
  block_timestamp: number;
  extrinsic_index: string;
  call_module_function: string;
  call_module: string;
  params: unknown[];
  account_id: string;
  signature: string;
  nonce: number;
  extrinsic_hash: string;
  success: boolean;
  fee: string;
  from_hex: string;
  finalized: boolean;
  account_display?: {
    address: string;
    display: string;
  };
}

export interface SubscanTransfer {
  from: string;
  to: string;
  extrinsic_index: string;
  success: boolean;
  hash: string;
  block_num: number;
  block_timestamp: number;
  module: string;
  amount: string;
  fee: string;
  nonce: number;
  asset_symbol: string;
  from_account_display?: {
    address: string;
    display: string;
  };
  to_account_display?: {
    address: string;
    display: string;
  };
}

export interface SubscanBlock {
  block_num: number;
  block_timestamp: number;
  hash: string;
  parent_hash: string;
  state_root: string;
  extrinsics_root: string;
  extrinsics: unknown[];
  logs: unknown[];
  event_count: number;
  extrinsics_count: number;
  finalized: boolean;
  validator: string;
  validator_name?: string;
}

export class SubscanAPI {
  private baseUrl: string;
  private apiKey?: string;
  private network: 'polkadot' | 'kusama' | 'westend';

  constructor(config?: SubscanConfig, network: 'polkadot' | 'kusama' | 'westend' = 'polkadot') {
    this.apiKey = config?.apiKey;
    this.network = network;
    this.baseUrl = `https://${network}.api.subscan.io`;
  }

  /**
   * Make an API call with proper headers
   */
  private async apiCall<T = unknown>(
    endpoint: string,
    method: 'GET' | 'POST' = 'POST',
    body?: unknown
  ): Promise<T> {
    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json'
      };

      if (this.apiKey) {
        headers['X-API-Key'] = this.apiKey;
      }

      const options: RequestInit = {
        method,
        headers
      };

      if (body && method === 'POST') {
        options.body = JSON.stringify(body);
      }

      const response = await fetch(`${this.baseUrl}${endpoint}`, options);

      if (!response.ok) {
        throw new Error(`Subscan API error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();

      if (result.code !== 0) {
        throw new Error(`Subscan API error: ${result.message} (code: ${result.code})`);
      }

      return result.data;
    } catch (error) {
      console.error(`[Subscan] API call error (${endpoint}):`, error);
      throw new Error(`Failed to execute API call: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get account information
   */
  async getAccountInfo(address: string): Promise<SubscanAccountInfo> {
    try {
      console.log(`🔍 [Subscan] Fetching account info for: ${address}`);
      
      const data = await this.apiCall<SubscanAccountInfo>('/api/scan/account', 'POST', {
        address
      });
      
      console.log(`✅ [Subscan] Account info retrieved`);
      
      return data;
    } catch (error) {
      console.error('[Subscan] Account info fetch error:', error);
      throw new Error(`Failed to fetch account info: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get balance for an address
   */
  async getBalance(address: string): Promise<{
    balance: bigint;
    balanceDOT: number;
    locked: bigint;
    reserved: bigint;
  }> {
    try {
      console.log(`🔍 [Subscan] Fetching balance for: ${address}`);
      
      const info = await this.getAccountInfo(address);
      const balance = BigInt(info.balance || '0');
      const locked = BigInt(info.balance_lock || '0');
      const reserved = BigInt(info.bonded || '0');
      const balanceDOT = Number(balance) / 1e10; // Polkadot has 10 decimals
      
      console.log(`✅ [Subscan] Balance: ${balance} Planck (${balanceDOT} DOT)`);
      
      return {
        balance,
        balanceDOT,
        locked,
        reserved
      };
    } catch (error) {
      console.error('[Subscan] Balance fetch error:', error);
      throw new Error(`Failed to fetch balance: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get transaction history (extrinsics)
   */
  async getTransactionHistory(
    address: string,
    page: number = 0,
    row: number = 25
  ): Promise<{
    count: number;
    extrinsics: SubscanTransaction[];
  }> {
    try {
      console.log(`🔍 [Subscan] Fetching transaction history for: ${address}`);
      
      const data = await this.apiCall<{
        count: number;
        extrinsics: SubscanTransaction[];
      }>('/api/scan/extrinsics', 'POST', {
        address,
        page,
        row
      });
      
      console.log(`✅ [Subscan] Found ${data.extrinsics?.length || 0} transactions`);
      
      return data;
    } catch (error) {
      console.error('[Subscan] Transaction history fetch error:', error);
      throw new Error(`Failed to fetch transaction history: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get transfer history
   */
  async getTransferHistory(
    address: string,
    page: number = 0,
    row: number = 25
  ): Promise<{
    count: number;
    transfers: SubscanTransfer[];
  }> {
    try {
      console.log(`🔍 [Subscan] Fetching transfer history for: ${address}`);
      
      const data = await this.apiCall<{
        count: number;
        transfers: SubscanTransfer[];
      }>('/api/scan/transfers', 'POST', {
        address,
        page,
        row
      });
      
      console.log(`✅ [Subscan] Found ${data.transfers?.length || 0} transfers`);
      
      return data;
    } catch (error) {
      console.error('[Subscan] Transfer history fetch error:', error);
      throw new Error(`Failed to fetch transfer history: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get block information
   */
  async getBlock(blockNumber?: number, blockHash?: string): Promise<SubscanBlock> {
    try {
      console.log(`🔍 [Subscan] Fetching block info...`);
      
      const body: Record<string, unknown> = {};
      if (blockNumber !== undefined) body.block_num = blockNumber;
      if (blockHash) body.block_hash = blockHash;
      
      const data = await this.apiCall<SubscanBlock>('/api/scan/block', 'POST', body);
      
      console.log(`✅ [Subscan] Block info retrieved: #${data.block_num}`);
      
      return data;
    } catch (error) {
      console.error('[Subscan] Block fetch error:', error);
      throw new Error(`Failed to fetch block: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get latest block number
   */
  async getLatestBlock(): Promise<{
    blockNumber: number;
    blockHash: string;
    timestamp: number;
  }> {
    try {
      console.log('🔍 [Subscan] Fetching latest block...');
      
      const data = await this.apiCall<{
        block_num: number;
        hash: string;
        block_timestamp: number;
      }>('/api/scan/metadata', 'POST', {});
      
      console.log(`✅ [Subscan] Latest block: #${data.block_num}`);
      
      return {
        blockNumber: data.block_num,
        blockHash: data.hash,
        timestamp: data.block_timestamp
      };
    } catch (error) {
      console.error('[Subscan] Latest block fetch error:', error);
      throw new Error(`Failed to fetch latest block: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get extrinsic details
   */
  async getExtrinsic(extrinsicHash: string): Promise<SubscanTransaction> {
    try {
      console.log(`🔍 [Subscan] Fetching extrinsic: ${extrinsicHash}`);
      
      const data = await this.apiCall<SubscanTransaction>('/api/scan/extrinsic', 'POST', {
        hash: extrinsicHash
      });
      
      console.log(`✅ [Subscan] Extrinsic retrieved`);
      
      return data;
    } catch (error) {
      console.error('[Subscan] Extrinsic fetch error:', error);
      throw new Error(`Failed to fetch extrinsic: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Search by address, block, extrinsic, or event
   */
  async search(query: string): Promise<{
    account?: SubscanAccountInfo;
    block?: SubscanBlock;
    extrinsic?: SubscanTransaction;
  }> {
    try {
      console.log(`🔍 [Subscan] Searching for: ${query}`);
      
      const data = await this.apiCall<{
        account?: SubscanAccountInfo;
        block?: SubscanBlock;
        extrinsic?: SubscanTransaction;
      }>('/api/scan/search', 'POST', {
        key: query
      });
      
      console.log(`✅ [Subscan] Search completed`);
      
      return data;
    } catch (error) {
      console.error('[Subscan] Search error:', error);
      throw new Error(`Failed to search: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get network statistics
   */
  async getNetworkStats(): Promise<{
    blockNum: number;
    blockTime: number;
    eventCount: number;
    extrinsicsCount: number;
    transfersCount: number;
    accountCount: number;
  }> {
    try {
      console.log('🔍 [Subscan] Fetching network statistics...');
      
      const data = await this.apiCall<{
        block_num: number;
        block_time: number;
        event_count: number;
        extrinsics_count: number;
        transfers_count: number;
        account_count: number;
      }>('/api/scan/metadata', 'POST', {});
      
      console.log(`✅ [Subscan] Network stats retrieved`);
      
      return {
        blockNum: data.block_num,
        blockTime: data.block_time,
        eventCount: data.event_count,
        extrinsicsCount: data.extrinsics_count,
        transfersCount: data.transfers_count,
        accountCount: data.account_count
      };
    } catch (error) {
      console.error('[Subscan] Network stats fetch error:', error);
      throw new Error(`Failed to fetch network stats: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

// Singleton instances
export const subscanPolkadot = new SubscanAPI(undefined, 'polkadot');
export const subscanKusama = new SubscanAPI(undefined, 'kusama');
export const subscanWestend = new SubscanAPI(undefined, 'westend');

// Factory function with API key
export const createSubscan = (apiKey: string, network: 'polkadot' | 'kusama' | 'westend' = 'polkadot') => 
  new SubscanAPI({ apiKey }, network);

