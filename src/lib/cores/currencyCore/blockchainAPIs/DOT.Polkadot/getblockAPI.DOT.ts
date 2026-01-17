// GetBlock API Implementation for Polkadot
// API Docs: https://getblock.io/docs/
// Free tier: Free tier available
// Run Polkadot RPC node and use GetBlock API

export interface GetBlockConfig {
  apiKey: string; // Required API key
}

export class GetBlockAPI {
  private baseUrl: string;
  private apiKey: string;
  private network: 'polkadot' | 'kusama';
  private rpcId = 1;

  constructor(config: GetBlockConfig, network: 'polkadot' | 'kusama' = 'polkadot') {
    this.apiKey = config.apiKey;
    this.network = network;
    
    const networkMap: Record<string, string> = {
      polkadot: 'dot',
      kusama: 'ksm'
    };
    
    this.baseUrl = `https://${networkMap[network]}.getblock.io/api_key/${this.apiKey}/`;
  }

  /**
   * Make an RPC call
   */
  private async rpcCall<T = unknown>(method: string, params: unknown[] = []): Promise<T> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: this.rpcId++,
          method,
          params
        })
      });

      if (!response.ok) {
        throw new Error(`GetBlock API error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();

      if (result.error) {
        throw new Error(`RPC error: ${result.error.message} (code: ${result.error.code})`);
      }

      return result.result;
    } catch (error) {
      console.error(`[GetBlock] RPC call error (${method}):`, error);
      throw new Error(`Failed to execute RPC call: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get account information
   */
  async getAccountInfo(address: string): Promise<unknown> {
    try {
      console.log(`🔍 [GetBlock] Fetching account info for: ${address}`);
      
      const data = await this.rpcCall('system_account', [address]);
      
      console.log(`✅ [GetBlock] Account info retrieved`);
      
      return data;
    } catch (error) {
      console.error('[GetBlock] Account info fetch error:', error);
      throw new Error(`Failed to fetch account info: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get latest block
   */
  async getLatestBlock(): Promise<unknown> {
    try {
      console.log('🔍 [GetBlock] Fetching latest block...');
      
      const blockHash = await this.rpcCall<string>('chain_getBlockHash', []);
      const block = await this.rpcCall('chain_getBlock', [blockHash]);
      
      console.log(`✅ [GetBlock] Latest block retrieved`);
      
      return block;
    } catch (error) {
      console.error('[GetBlock] Latest block fetch error:', error);
      throw new Error(`Failed to fetch latest block: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get block by hash
   */
  async getBlockByHash(blockHash: string): Promise<unknown> {
    try {
      console.log(`🔍 [GetBlock] Fetching block: ${blockHash}`);
      
      const block = await this.rpcCall('chain_getBlock', [blockHash]);
      
      console.log(`✅ [GetBlock] Block retrieved`);
      
      return block;
    } catch (error) {
      console.error('[GetBlock] Block fetch error:', error);
      throw new Error(`Failed to fetch block: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get chain name
   */
  async getChainName(): Promise<string> {
    try {
      console.log('🔍 [GetBlock] Fetching chain name...');
      
      const chain = await this.rpcCall<string>('system_chain', []);
      
      console.log(`✅ [GetBlock] Chain name: ${chain}`);
      
      return chain;
    } catch (error) {
      console.error('[GetBlock] Chain name fetch error:', error);
      throw new Error(`Failed to fetch chain name: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Submit extrinsic
   */
  async submitExtrinsic(signedExtrinsic: string): Promise<string> {
    try {
      console.log('📡 [GetBlock] Submitting extrinsic...');
      
      const hash = await this.rpcCall<string>('author_submitExtrinsic', [signedExtrinsic]);
      
      console.log(`✅ [GetBlock] Extrinsic submitted: ${hash}`);
      
      return hash;
    } catch (error) {
      console.error('[GetBlock] Extrinsic submission error:', error);
      throw new Error(`Failed to submit extrinsic: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

// Factory functions
export const createGetBlockPolkadot = (apiKey: string) => new GetBlockAPI({ apiKey }, 'polkadot');
export const createGetBlockKusama = (apiKey: string) => new GetBlockAPI({ apiKey }, 'kusama');

