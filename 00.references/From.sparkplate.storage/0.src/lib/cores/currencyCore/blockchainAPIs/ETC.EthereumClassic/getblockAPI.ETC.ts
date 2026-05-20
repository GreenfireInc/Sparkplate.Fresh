// GetBlock API Implementation for Ethereum Classic
// API Docs: https://getblock.io/docs/
// Website: https://getblock.io/nodes/etc/
// Free tier: Free tier available
// Instant access to Ethereum Classic RPC node

export interface GetBlockConfig {
  apiKey: string; // Required API key
}

export class GetBlockAPI {
  private baseUrl: string;
  private apiKey: string;
  private rpcId = 1;

  constructor(config: GetBlockConfig) {
    this.apiKey = config.apiKey;
    this.baseUrl = `https://etc.getblock.io/api_key/${this.apiKey}/`;
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
      console.error(`[GetBlock-ETC] RPC call error (${method}):`, error);
      throw new Error(`Failed to execute RPC call: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get balance for an address
   */
  async getBalance(address: string, block: string | number = 'latest'): Promise<{
    balance: bigint;
    balanceETC: number;
  }> {
    try {
      console.log(`🔍 [GetBlock-ETC] Fetching balance for: ${address}`);
      
      const blockParam = typeof block === 'number' ? `0x${block.toString(16)}` : block;
      const balanceHex = await this.rpcCall<string>('eth_getBalance', [address, blockParam]);
      
      const balance = BigInt(balanceHex);
      const balanceETC = Number(balance) / 1e18;
      
      console.log(`✅ [GetBlock-ETC] Balance: ${balance} wei (${balanceETC} ETC)`);
      
      return {
        balance,
        balanceETC
      };
    } catch (error) {
      console.error('[GetBlock-ETC] Balance fetch error:', error);
      throw new Error(`Failed to fetch balance: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Send raw transaction
   */
  async sendRawTransaction(signedTx: string): Promise<string> {
    try {
      console.log('📡 [GetBlock-ETC] Broadcasting transaction...');
      
      const txHash = await this.rpcCall<string>('eth_sendRawTransaction', [signedTx]);
      
      console.log(`✅ [GetBlock-ETC] Transaction broadcast successful: ${txHash}`);
      
      return txHash;
    } catch (error) {
      console.error('[GetBlock-ETC] Broadcast error:', error);
      throw new Error(`Failed to broadcast transaction: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get transaction by hash
   */
  async getTransaction(txHash: string): Promise<unknown | null> {
    try {
      console.log(`🔍 [GetBlock-ETC] Fetching transaction: ${txHash}`);
      
      const transaction = await this.rpcCall('eth_getTransactionByHash', [txHash]);
      
      console.log(`✅ [GetBlock-ETC] Transaction retrieved`);
      
      return transaction;
    } catch (error) {
      console.error('[GetBlock-ETC] Transaction fetch error:', error);
      throw new Error(`Failed to fetch transaction: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get latest block number
   */
  async getBlockNumber(): Promise<number> {
    try {
      console.log('🔍 [GetBlock-ETC] Fetching latest block number...');
      
      const blockNumberHex = await this.rpcCall<string>('eth_blockNumber');
      const blockNumber = parseInt(blockNumberHex, 16);
      
      console.log(`✅ [GetBlock-ETC] Latest block number: ${blockNumber}`);
      
      return blockNumber;
    } catch (error) {
      console.error('[GetBlock-ETC] Block number fetch error:', error);
      throw new Error(`Failed to fetch block number: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get gas price
   */
  async getGasPrice(): Promise<bigint> {
    try {
      console.log('🔍 [GetBlock-ETC] Fetching gas price...');
      
      const gasPriceHex = await this.rpcCall<string>('eth_gasPrice');
      const gasPrice = BigInt(gasPriceHex);
      
      console.log(`✅ [GetBlock-ETC] Gas price: ${gasPrice} wei (${Number(gasPrice) / 1e9} Gwei)`);
      
      return gasPrice;
    } catch (error) {
      console.error('[GetBlock-ETC] Gas price fetch error:', error);
      throw new Error(`Failed to fetch gas price: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Estimate gas
   */
  async estimateGas(transaction: {
    from?: string;
    to: string;
    gas?: string;
    gasPrice?: string;
    value?: string;
    data?: string;
  }): Promise<bigint> {
    try {
      console.log('🔍 [GetBlock-ETC] Estimating gas...');
      
      const gasHex = await this.rpcCall<string>('eth_estimateGas', [transaction]);
      const gas = BigInt(gasHex);
      
      console.log(`✅ [GetBlock-ETC] Estimated gas: ${gas}`);
      
      return gas;
    } catch (error) {
      console.error('[GetBlock-ETC] Gas estimation error:', error);
      throw new Error(`Failed to estimate gas: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Call contract (read-only)
   */
  async call(transaction: {
    from?: string;
    to: string;
    gas?: string;
    gasPrice?: string;
    value?: string;
    data?: string;
  }, block: string | number = 'latest'): Promise<string> {
    try {
      console.log('🔍 [GetBlock-ETC] Calling contract...');
      
      const blockParam = typeof block === 'number' ? `0x${block.toString(16)}` : block;
      const result = await this.rpcCall<string>('eth_call', [transaction, blockParam]);
      
      console.log(`✅ [GetBlock-ETC] Contract call successful`);
      
      return result;
    } catch (error) {
      console.error('[GetBlock-ETC] Contract call error:', error);
      throw new Error(`Failed to call contract: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

// Factory function
export const createGetBlockETC = (apiKey: string) => new GetBlockAPI({ apiKey });

