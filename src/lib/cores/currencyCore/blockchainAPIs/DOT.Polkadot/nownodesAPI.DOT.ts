// NOWNodes API Implementation for Polkadot
// API Docs: https://nownodes.io/documentation
// Website: https://nownodes.io/nodes/polkadot-dot
// Free tier: Free API key available
// Full node access and block explorer connectivity

export interface NOWNodesConfig {
  apiKey: string; // Required API key
}

export class NOWNodesAPI {
  private baseUrl: string;
  private apiKey: string;
  private network: 'polkadot' | 'kusama';
  private rpcId = 1;

  constructor(config: NOWNodesConfig, network: 'polkadot' | 'kusama' = 'polkadot') {
    this.apiKey = config.apiKey;
    this.network = network;
    
    const networkMap: Record<string, string> = {
      polkadot: 'dot',
      kusama: 'ksm'
    };
    
    this.baseUrl = `https://${networkMap[network]}.nownodes.io/${this.apiKey}`;
  }

  /**
   * Make an RPC call
   */
  private async rpcCall<T = unknown>(method: string, params: unknown[] = []): Promise<T> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': this.apiKey
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: this.rpcId++,
          method,
          params
        })
      });

      if (!response.ok) {
        throw new Error(`NOWNodes API error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();

      if (result.error) {
        throw new Error(`RPC error: ${result.error.message} (code: ${result.error.code})`);
      }

      return result.result;
    } catch (error) {
      console.error(`[NOWNodes] RPC call error (${method}):`, error);
      throw new Error(`Failed to execute RPC call: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get account information
   */
  async getAccountInfo(address: string): Promise<{
    nonce: number;
    consumers: number;
    providers: number;
    sufficients: number;
    data: {
      free: string;
      reserved: string;
      miscFrozen: string;
      feeFrozen: string;
    };
  }> {
    try {
      console.log(`🔍 [NOWNodes] Fetching account info for: ${address}`);
      
      const data = await this.rpcCall<{
        nonce: number;
        consumers: number;
        providers: number;
        sufficients: number;
        data: {
          free: string;
          reserved: string;
          miscFrozen: string;
          feeFrozen: string;
        };
      }>('system_account', [address]);
      
      console.log(`✅ [NOWNodes] Account info retrieved`);
      
      return data;
    } catch (error) {
      console.error('[NOWNodes] Account info fetch error:', error);
      throw new Error(`Failed to fetch account info: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get balance for an address
   */
  async getBalance(address: string): Promise<{
    balance: bigint;
    balanceDOT: number;
    reserved: bigint;
    frozen: bigint;
  }> {
    try {
      console.log(`🔍 [NOWNodes] Fetching balance for: ${address}`);
      
      const info = await this.getAccountInfo(address);
      const balance = BigInt(info.data.free);
      const reserved = BigInt(info.data.reserved);
      const miscFrozen = BigInt(info.data.miscFrozen);
      const feeFrozen = BigInt(info.data.feeFrozen);
      const frozen = miscFrozen > feeFrozen ? miscFrozen : feeFrozen;
      const balanceDOT = Number(balance) / 1e10;
      
      console.log(`✅ [NOWNodes] Balance: ${balance} Planck (${balanceDOT} DOT)`);
      
      return {
        balance,
        balanceDOT,
        reserved,
        frozen
      };
    } catch (error) {
      console.error('[NOWNodes] Balance fetch error:', error);
      throw new Error(`Failed to fetch balance: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get latest block hash
   */
  async getLatestBlockHash(): Promise<string> {
    try {
      console.log('🔍 [NOWNodes] Fetching latest block hash...');
      
      const blockHash = await this.rpcCall<string>('chain_getBlockHash', []);
      
      console.log(`✅ [NOWNodes] Latest block hash: ${blockHash}`);
      
      return blockHash;
    } catch (error) {
      console.error('[NOWNodes] Latest block hash fetch error:', error);
      throw new Error(`Failed to fetch latest block hash: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get block by hash
   */
  async getBlockByHash(blockHash: string): Promise<unknown> {
    try {
      console.log(`🔍 [NOWNodes] Fetching block: ${blockHash}`);
      
      const block = await this.rpcCall('chain_getBlock', [blockHash]);
      
      console.log(`✅ [NOWNodes] Block retrieved`);
      
      return block;
    } catch (error) {
      console.error('[NOWNodes] Block fetch error:', error);
      throw new Error(`Failed to fetch block: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get latest block
   */
  async getLatestBlock(): Promise<unknown> {
    try {
      console.log('🔍 [NOWNodes] Fetching latest block...');
      
      const blockHash = await this.getLatestBlockHash();
      const block = await this.getBlockByHash(blockHash);
      
      console.log(`✅ [NOWNodes] Latest block retrieved`);
      
      return block;
    } catch (error) {
      console.error('[NOWNodes] Latest block fetch error:', error);
      throw new Error(`Failed to fetch latest block: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get chain properties
   */
  async getChainProperties(): Promise<unknown> {
    try {
      console.log('🔍 [NOWNodes] Fetching chain properties...');
      
      const props = await this.rpcCall('system_properties', []);
      
      console.log(`✅ [NOWNodes] Chain properties retrieved`);
      
      return props;
    } catch (error) {
      console.error('[NOWNodes] Chain properties fetch error:', error);
      throw new Error(`Failed to fetch chain properties: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get runtime version
   */
  async getRuntimeVersion(): Promise<unknown> {
    try {
      console.log('🔍 [NOWNodes] Fetching runtime version...');
      
      const version = await this.rpcCall('state_getRuntimeVersion', []);
      
      console.log(`✅ [NOWNodes] Runtime version retrieved`);
      
      return version;
    } catch (error) {
      console.error('[NOWNodes] Runtime version fetch error:', error);
      throw new Error(`Failed to fetch runtime version: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Submit extrinsic
   */
  async submitExtrinsic(signedExtrinsic: string): Promise<string> {
    try {
      console.log('📡 [NOWNodes] Submitting extrinsic...');
      
      const hash = await this.rpcCall<string>('author_submitExtrinsic', [signedExtrinsic]);
      
      console.log(`✅ [NOWNodes] Extrinsic submitted: ${hash}`);
      
      return hash;
    } catch (error) {
      console.error('[NOWNodes] Extrinsic submission error:', error);
      throw new Error(`Failed to submit extrinsic: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

// Factory functions
export const createNOWNodesPolkadot = (apiKey: string) => new NOWNodesAPI({ apiKey }, 'polkadot');
export const createNOWNodesKusama = (apiKey: string) => new NOWNodesAPI({ apiKey }, 'kusama');

