// Statescan API Implementation for Polkadot
// Website: https://polkadot.statescan.io/
// Free tier: Free access
// Explorer for Substrate-based chains

export interface StatescanAccountInfo {
  address: string;
  balance: {
    total: string;
    transferable: string;
    locked: string;
    reserved: string;
  };
  nonce: number;
}

export interface StatescanTransfer {
  indexer: {
    blockHeight: number;
    blockTime: number;
    extrinsicIndex: number;
  };
  from: string;
  to: string;
  balance: string;
  success: boolean;
}

export interface StatescanExtrinsic {
  indexer: {
    blockHeight: number;
    blockTime: number;
    extrinsicIndex: number;
  };
  hash: string;
  call: {
    section: string;
    method: string;
  };
  signer: string;
  nonce: number;
  signature: string;
  tip: string;
  isSigned: boolean;
  isSuccess: boolean;
}

export class StatescanAPI {
  private baseUrl: string;
  private network: 'polkadot' | 'kusama' | 'westend';

  constructor(network: 'polkadot' | 'kusama' | 'westend' = 'polkadot') {
    this.network = network;
    
    const networkMap: Record<string, string> = {
      polkadot: 'https://polkadot.statescan.io',
      kusama: 'https://kusama.statescan.io',
      westend: 'https://westend.statescan.io'
    };
    
    this.baseUrl = networkMap[network];
  }

  /**
   * Make an API call
   */
  private async apiCall<T = unknown>(endpoint: string): Promise<T> {
    try {
      const response = await fetch(`${this.baseUrl}/api${endpoint}`);

      if (!response.ok) {
        throw new Error(`Statescan API error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();

      if (result.error) {
        throw new Error(`Statescan API error: ${result.error}`);
      }

      return result.data || result;
    } catch (error) {
      console.error(`[Statescan] API call error (${endpoint}):`, error);
      throw new Error(`Failed to execute API call: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get account information
   */
  async getAccountInfo(address: string): Promise<StatescanAccountInfo> {
    try {
      console.log(`🔍 [Statescan] Fetching account info for: ${address}`);
      
      const data = await this.apiCall<StatescanAccountInfo>(`/accounts/${address}`);
      
      console.log(`✅ [Statescan] Account info retrieved`);
      
      return data;
    } catch (error) {
      console.error('[Statescan] Account info fetch error:', error);
      throw new Error(`Failed to fetch account info: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get balance for an address
   */
  async getBalance(address: string): Promise<{
    balance: bigint;
    balanceDOT: number;
    transferable: bigint;
    locked: bigint;
    reserved: bigint;
  }> {
    try {
      console.log(`🔍 [Statescan] Fetching balance for: ${address}`);
      
      const info = await this.getAccountInfo(address);
      const balance = BigInt(info.balance.total || '0');
      const transferable = BigInt(info.balance.transferable || '0');
      const locked = BigInt(info.balance.locked || '0');
      const reserved = BigInt(info.balance.reserved || '0');
      const balanceDOT = Number(balance) / 1e10;
      
      console.log(`✅ [Statescan] Balance: ${balance} Planck (${balanceDOT} DOT)`);
      
      return {
        balance,
        balanceDOT,
        transferable,
        locked,
        reserved
      };
    } catch (error) {
      console.error('[Statescan] Balance fetch error:', error);
      throw new Error(`Failed to fetch balance: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get transfer history
   */
  async getTransferHistory(
    address: string,
    page: number = 1,
    pageSize: number = 25
  ): Promise<{
    items: StatescanTransfer[];
    page: number;
    pageSize: number;
    total: number;
  }> {
    try {
      console.log(`🔍 [Statescan] Fetching transfer history for: ${address}`);
      
      const data = await this.apiCall<{
        items: StatescanTransfer[];
        page: number;
        pageSize: number;
        total: number;
      }>(`/accounts/${address}/transfers?page=${page}&page_size=${pageSize}`);
      
      console.log(`✅ [Statescan] Found ${data.items?.length || 0} transfers`);
      
      return data;
    } catch (error) {
      console.error('[Statescan] Transfer history fetch error:', error);
      throw new Error(`Failed to fetch transfer history: ${error instanceof Error ? error.message : 'Unknown error'}`);
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
    items: StatescanExtrinsic[];
    page: number;
    pageSize: number;
    total: number;
  }> {
    try {
      console.log(`🔍 [Statescan] Fetching extrinsic history for: ${address}`);
      
      const data = await this.apiCall<{
        items: StatescanExtrinsic[];
        page: number;
        pageSize: number;
        total: number;
      }>(`/accounts/${address}/extrinsics?page=${page}&page_size=${pageSize}`);
      
      console.log(`✅ [Statescan] Found ${data.items?.length || 0} extrinsics`);
      
      return data;
    } catch (error) {
      console.error('[Statescan] Extrinsic history fetch error:', error);
      throw new Error(`Failed to fetch extrinsic history: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get extrinsic details
   */
  async getExtrinsic(blockHeight: number, extrinsicIndex: number): Promise<StatescanExtrinsic> {
    try {
      console.log(`🔍 [Statescan] Fetching extrinsic: ${blockHeight}-${extrinsicIndex}`);
      
      const data = await this.apiCall<StatescanExtrinsic>(
        `/blocks/${blockHeight}/extrinsics/${extrinsicIndex}`
      );
      
      console.log(`✅ [Statescan] Extrinsic retrieved`);
      
      return data;
    } catch (error) {
      console.error('[Statescan] Extrinsic fetch error:', error);
      throw new Error(`Failed to fetch extrinsic: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

// Singleton instances
export const statescanPolkadot = new StatescanAPI('polkadot');
export const statescanKusama = new StatescanAPI('kusama');
export const statescanWestend = new StatescanAPI('westend');

