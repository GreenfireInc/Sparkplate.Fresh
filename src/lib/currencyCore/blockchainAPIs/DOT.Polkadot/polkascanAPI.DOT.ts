// Polkascan API Implementation for Polkadot
// Website: https://polkascan.io/polkadot
// Free tier: Free access
// Substrate-based chain explorer

export interface PolkascanAccountInfo {
  attributes: {
    address: string;
    balance: string;
    balance_free: string;
    balance_reserved: string;
    nonce: number;
    count_extrinsic: number;
  };
}

export interface PolkascanExtrinsic {
  type: string;
  id: string;
  attributes: {
    extrinsic_index: string;
    block_id: number;
    block_datetime: string;
    signed: boolean;
    module_id: string;
    call_id: string;
    params: unknown[];
    success: boolean;
    error: string | null;
    fee: string;
  };
}

export interface PolkascanBlock {
  type: string;
  id: string;
  attributes: {
    block_number: number;
    parent_hash: string;
    hash: string;
    state_root: string;
    extrinsics_root: string;
    datetime: string;
    count_extrinsics: number;
    count_events: number;
    spec_version: number;
  };
}

export class PolkascanAPI {
  private baseUrl: string;
  private network: 'polkadot' | 'kusama';

  constructor(network: 'polkadot' | 'kusama' = 'polkadot') {
    this.network = network;
    
    const networkMap: Record<string, string> = {
      polkadot: 'https://api.polkascan.io/api/v1/polkadot',
      kusama: 'https://api.polkascan.io/api/v1/kusama'
    };
    
    this.baseUrl = networkMap[network];
  }

  /**
   * Make an API call
   */
  private async apiCall<T = unknown>(endpoint: string): Promise<T> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`);

      if (!response.ok) {
        throw new Error(`Polkascan API error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();

      if (result.error) {
        throw new Error(`Polkascan API error: ${result.error}`);
      }

      return result.data || result;
    } catch (error) {
      console.error(`[Polkascan] API call error (${endpoint}):`, error);
      throw new Error(`Failed to execute API call: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get account information
   */
  async getAccountInfo(address: string): Promise<PolkascanAccountInfo> {
    try {
      console.log(`🔍 [Polkascan] Fetching account info for: ${address}`);
      
      const data = await this.apiCall<PolkascanAccountInfo>(`/account/${address}`);
      
      console.log(`✅ [Polkascan] Account info retrieved`);
      
      return data;
    } catch (error) {
      console.error('[Polkascan] Account info fetch error:', error);
      throw new Error(`Failed to fetch account info: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get balance for an address
   */
  async getBalance(address: string): Promise<{
    balance: bigint;
    balanceDOT: number;
    free: bigint;
    reserved: bigint;
  }> {
    try {
      console.log(`🔍 [Polkascan] Fetching balance for: ${address}`);
      
      const info = await this.getAccountInfo(address);
      const balance = BigInt(info.attributes.balance || '0');
      const free = BigInt(info.attributes.balance_free || '0');
      const reserved = BigInt(info.attributes.balance_reserved || '0');
      const balanceDOT = Number(balance) / 1e10;
      
      console.log(`✅ [Polkascan] Balance: ${balance} Planck (${balanceDOT} DOT)`);
      
      return {
        balance,
        balanceDOT,
        free,
        reserved
      };
    } catch (error) {
      console.error('[Polkascan] Balance fetch error:', error);
      throw new Error(`Failed to fetch balance: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get extrinsic history
   */
  async getExtrinsicHistory(
    address: string,
    page: number = 1,
    pageSize: number = 25
  ): Promise<{
    data: PolkascanExtrinsic[];
    meta: {
      pagination: {
        page: number;
        pageSize: number;
        total: number;
      };
    };
  }> {
    try {
      console.log(`🔍 [Polkascan] Fetching extrinsic history for: ${address}`);
      
      const data = await this.apiCall<{
        data: PolkascanExtrinsic[];
        meta: {
          pagination: {
            page: number;
            pageSize: number;
            total: number;
          };
        };
      }>(`/account/${address}/extrinsics?page=${page}&page_size=${pageSize}`);
      
      console.log(`✅ [Polkascan] Found ${data.data?.length || 0} extrinsics`);
      
      return data;
    } catch (error) {
      console.error('[Polkascan] Extrinsic history fetch error:', error);
      throw new Error(`Failed to fetch extrinsic history: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get block information
   */
  async getBlock(blockNumber: number): Promise<PolkascanBlock> {
    try {
      console.log(`🔍 [Polkascan] Fetching block: #${blockNumber}`);
      
      const data = await this.apiCall<PolkascanBlock>(`/block/${blockNumber}`);
      
      console.log(`✅ [Polkascan] Block retrieved`);
      
      return data;
    } catch (error) {
      console.error('[Polkascan] Block fetch error:', error);
      throw new Error(`Failed to fetch block: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get extrinsic details
   */
  async getExtrinsic(extrinsicId: string): Promise<PolkascanExtrinsic> {
    try {
      console.log(`🔍 [Polkascan] Fetching extrinsic: ${extrinsicId}`);
      
      const data = await this.apiCall<PolkascanExtrinsic>(`/extrinsic/${extrinsicId}`);
      
      console.log(`✅ [Polkascan] Extrinsic retrieved`);
      
      return data;
    } catch (error) {
      console.error('[Polkascan] Extrinsic fetch error:', error);
      throw new Error(`Failed to fetch extrinsic: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get latest blocks
   */
  async getLatestBlocks(count: number = 10): Promise<PolkascanBlock[]> {
    try {
      console.log(`🔍 [Polkascan] Fetching latest ${count} blocks...`);
      
      const data = await this.apiCall<PolkascanBlock[]>(`/blocks?page_size=${count}&order=desc`);
      
      console.log(`✅ [Polkascan] Latest blocks retrieved`);
      
      return data;
    } catch (error) {
      console.error('[Polkascan] Latest blocks fetch error:', error);
      throw new Error(`Failed to fetch latest blocks: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

// Singleton instances
export const polkascanPolkadot = new PolkascanAPI('polkadot');
export const polkascanKusama = new PolkascanAPI('kusama');

