// GetBlock API Implementation for Litecoin
// API Docs: https://getblock.io/docs/
// Website: https://getblock.io/nodes/ltc/
// Free tier: Free tier available
// Instant access to Litecoin RPC node

export interface GetBlockConfig {
  apiKey: string; // Required API key
}

export class GetBlockAPI {
  private baseUrl: string;
  private apiKey: string;
  private rpcId = 1;

  constructor(config: GetBlockConfig) {
    this.apiKey = config.apiKey;
    this.baseUrl = `https://ltc.getblock.io/api_key/${this.apiKey}/`;
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
          jsonrpc: '1.0',
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
      console.error(`[GetBlock-LTC] RPC call error (${method}):`, error);
      throw new Error(`Failed to execute RPC call: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get latest block hash
   */
  async getLatestBlockHash(): Promise<string> {
    try {
      console.log('🔍 [GetBlock-LTC] Fetching latest block hash...');
      
      const hash = await this.rpcCall<string>('getbestblockhash');
      
      console.log(`✅ [GetBlock-LTC] Latest block hash: ${hash}`);
      
      return hash;
    } catch (error) {
      console.error('[GetBlock-LTC] Latest block hash fetch error:', error);
      throw new Error(`Failed to fetch latest block hash: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get block count
   */
  async getBlockCount(): Promise<number> {
    try {
      console.log('🔍 [GetBlock-LTC] Fetching block count...');
      
      const count = await this.rpcCall<number>('getblockcount');
      
      console.log(`✅ [GetBlock-LTC] Block count: ${count}`);
      
      return count;
    } catch (error) {
      console.error('[GetBlock-LTC] Block count fetch error:', error);
      throw new Error(`Failed to fetch block count: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get block by hash
   */
  async getBlockByHash(blockHash: string, verbosity: number = 1): Promise<unknown> {
    try {
      console.log(`🔍 [GetBlock-LTC] Fetching block: ${blockHash}`);
      
      const block = await this.rpcCall('getblock', [blockHash, verbosity]);
      
      console.log(`✅ [GetBlock-LTC] Block retrieved`);
      
      return block;
    } catch (error) {
      console.error('[GetBlock-LTC] Block fetch error:', error);
      throw new Error(`Failed to fetch block: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get transaction
   */
  async getTransaction(txHash: string, verbose: boolean = true): Promise<unknown> {
    try {
      console.log(`🔍 [GetBlock-LTC] Fetching transaction: ${txHash}`);
      
      const tx = await this.rpcCall('getrawtransaction', [txHash, verbose]);
      
      console.log(`✅ [GetBlock-LTC] Transaction retrieved`);
      
      return tx;
    } catch (error) {
      console.error('[GetBlock-LTC] Transaction fetch error:', error);
      throw new Error(`Failed to fetch transaction: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Broadcast transaction
   */
  async broadcastTransaction(signedTx: string): Promise<string> {
    try {
      console.log('📡 [GetBlock-LTC] Broadcasting transaction...');
      
      const txHash = await this.rpcCall<string>('sendrawtransaction', [signedTx]);
      
      console.log(`✅ [GetBlock-LTC] Transaction broadcast: ${txHash}`);
      
      return txHash;
    } catch (error) {
      console.error('[GetBlock-LTC] Broadcast error:', error);
      throw new Error(`Failed to broadcast transaction: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Estimate smart fee
   */
  async estimateSmartFee(blocks: number = 6): Promise<{
    feerate: number;
    blocks: number;
  }> {
    try {
      console.log(`🔍 [GetBlock-LTC] Estimating fee for ${blocks} blocks...`);
      
      const result = await this.rpcCall<{ feerate?: number; blocks?: number }>('estimatesmartfee', [blocks]);
      
      console.log(`✅ [GetBlock-LTC] Fee estimate: ${result.feerate} LTC/kB`);
      
      return {
        feerate: result.feerate || 0,
        blocks: result.blocks || blocks
      };
    } catch (error) {
      console.error('[GetBlock-LTC] Fee estimation error:', error);
      throw new Error(`Failed to estimate fee: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get blockchain info
   */
  async getBlockchainInfo(): Promise<unknown> {
    try {
      console.log('🔍 [GetBlock-LTC] Fetching blockchain info...');
      
      const info = await this.rpcCall('getblockchaininfo');
      
      console.log(`✅ [GetBlock-LTC] Blockchain info retrieved`);
      
      return info;
    } catch (error) {
      console.error('[GetBlock-LTC] Blockchain info fetch error:', error);
      throw new Error(`Failed to fetch blockchain info: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

// Factory function
export const createGetBlockLTC = (apiKey: string) => new GetBlockAPI({ apiKey });

