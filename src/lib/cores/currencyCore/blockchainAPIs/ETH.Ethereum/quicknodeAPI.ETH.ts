// QuickNode API Implementation for Ethereum
// API Docs: https://www.quicknode.com/docs/ethereum
// Free tier: Trial available
// High-performance Ethereum RPC endpoints

export interface QuickNodeConfig {
  endpoint: string; // Custom RPC endpoint from QuickNode dashboard
}

export class QuickNodeAPI {
  private endpoint: string;
  private rpcId = 1;

  constructor(config: QuickNodeConfig) {
    this.endpoint = config.endpoint;
  }

  /**
   * Make an RPC call
   */
  private async rpcCall<T = unknown>(method: string, params: unknown[] = []): Promise<T> {
    try {
      const response = await fetch(this.endpoint, {
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
        throw new Error(`QuickNode API error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();

      if (result.error) {
        throw new Error(`RPC error: ${result.error.message} (code: ${result.error.code})`);
      }

      return result.result;
    } catch (error) {
      console.error(`[QuickNode] RPC call error (${method}):`, error);
      throw new Error(`Failed to execute RPC call: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get balance for an address
   */
  async getBalance(address: string, block: string | number = 'latest'): Promise<{
    balance: bigint;
    balanceETH: number;
  }> {
    try {
      console.log(`🔍 [QuickNode] Fetching balance for: ${address}`);
      
      const blockParam = typeof block === 'number' ? `0x${block.toString(16)}` : block;
      const balanceHex = await this.rpcCall<string>('eth_getBalance', [address, blockParam]);
      
      const balance = BigInt(balanceHex);
      const balanceETH = Number(balance) / 1e18;
      
      console.log(`✅ [QuickNode] Balance: ${balance} wei (${balanceETH} ETH)`);
      
      return {
        balance,
        balanceETH
      };
    } catch (error) {
      console.error('[QuickNode] Balance fetch error:', error);
      throw new Error(`Failed to fetch balance: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Send raw transaction
   */
  async sendRawTransaction(signedTx: string): Promise<string> {
    try {
      console.log('📡 [QuickNode] Broadcasting transaction...');
      
      const txHash = await this.rpcCall<string>('eth_sendRawTransaction', [signedTx]);
      
      console.log(`✅ [QuickNode] Transaction broadcast successful: ${txHash}`);
      
      return txHash;
    } catch (error) {
      console.error('[QuickNode] Broadcast error:', error);
      throw new Error(`Failed to broadcast transaction: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get transaction by hash
   */
  async getTransaction(txHash: string): Promise<unknown | null> {
    try {
      console.log(`🔍 [QuickNode] Fetching transaction: ${txHash}`);
      
      const transaction = await this.rpcCall('eth_getTransactionByHash', [txHash]);
      
      console.log(`✅ [QuickNode] Transaction retrieved`);
      
      return transaction;
    } catch (error) {
      console.error('[QuickNode] Transaction fetch error:', error);
      throw new Error(`Failed to fetch transaction: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get latest block number
   */
  async getBlockNumber(): Promise<number> {
    try {
      console.log('🔍 [QuickNode] Fetching latest block number...');
      
      const blockNumberHex = await this.rpcCall<string>('eth_blockNumber');
      const blockNumber = parseInt(blockNumberHex, 16);
      
      console.log(`✅ [QuickNode] Latest block number: ${blockNumber}`);
      
      return blockNumber;
    } catch (error) {
      console.error('[QuickNode] Block number fetch error:', error);
      throw new Error(`Failed to fetch block number: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get gas price
   */
  async getGasPrice(): Promise<bigint> {
    try {
      console.log('🔍 [QuickNode] Fetching gas price...');
      
      const gasPriceHex = await this.rpcCall<string>('eth_gasPrice');
      const gasPrice = BigInt(gasPriceHex);
      
      console.log(`✅ [QuickNode] Gas price: ${gasPrice} wei (${Number(gasPrice) / 1e9} Gwei)`);
      
      return gasPrice;
    } catch (error) {
      console.error('[QuickNode] Gas price fetch error:', error);
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
      console.log('🔍 [QuickNode] Estimating gas...');
      
      const gasHex = await this.rpcCall<string>('eth_estimateGas', [transaction]);
      const gas = BigInt(gasHex);
      
      console.log(`✅ [QuickNode] Estimated gas: ${gas}`);
      
      return gas;
    } catch (error) {
      console.error('[QuickNode] Gas estimation error:', error);
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
      console.log('🔍 [QuickNode] Calling contract...');
      
      const blockParam = typeof block === 'number' ? `0x${block.toString(16)}` : block;
      const result = await this.rpcCall<string>('eth_call', [transaction, blockParam]);
      
      console.log(`✅ [QuickNode] Contract call successful`);
      
      return result;
    } catch (error) {
      console.error('[QuickNode] Contract call error:', error);
      throw new Error(`Failed to call contract: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

// Factory function (requires custom endpoint)
export const createQuickNode = (endpoint: string) => new QuickNodeAPI({ endpoint });

