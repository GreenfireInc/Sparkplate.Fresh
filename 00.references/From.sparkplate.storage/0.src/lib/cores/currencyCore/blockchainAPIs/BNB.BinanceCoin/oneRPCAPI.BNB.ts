// 1RPC API Implementation for BNB Smart Chain
// Website: https://www.1rpc.io/ecosystem/bnb-chain
// Free public RPC endpoint
// No API key required
// Privacy-focused RPC service

export class OneRPCAPI {
  private rpcUrl: string;
  private network: 'mainnet' | 'testnet';

  constructor(network: 'mainnet' | 'testnet' = 'mainnet') {
    this.network = network;
    
    // 1RPC public endpoints
    this.rpcUrl = network === 'mainnet'
      ? 'https://1rpc.io/bnb'
      : 'https://1rpc.io/bnb-testnet';
  }

  /**
   * Make a JSON-RPC call
   */
  private async rpcCall(method: string, params: unknown[] = []): Promise<unknown> {
    try {
      const response = await fetch(this.rpcUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 1,
          method,
          params
        })
      });

      if (!response.ok) {
        throw new Error(`1RPC error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(`1RPC error: ${data.error.message}`);
      }

      return data.result;
    } catch (error) {
      console.error(`[1RPC] ${method} error:`, error);
      throw error;
    }
  }

  /**
   * Get BNB balance for an address
   */
  async getBalance(address: string, blockNumber: string = 'latest'): Promise<{
    balance: string; // in Wei
    balanceBNB: number; // in BNB
  }> {
    try {
      console.log(`🔍 [1RPC] Fetching balance for: ${address}`);
      console.log(`🔗 [1RPC] Using endpoint: ${this.rpcUrl}`);
      
      const result = await this.rpcCall('eth_getBalance', [address, blockNumber]) as string;
      
      const balance = BigInt(result).toString();
      const balanceBNB = parseFloat(balance) / 1e18;
      
      console.log(`✅ [1RPC] Balance: ${balance} Wei (${balanceBNB} BNB)`);
      
      return {
        balance,
        balanceBNB
      };
    } catch (error) {
      console.error('[1RPC] Balance fetch error:', error);
      throw new Error(`Failed to fetch balance: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get transaction count (nonce) for an address
   */
  async getTransactionCount(address: string, blockNumber: string = 'latest'): Promise<number> {
    try {
      console.log(`🔍 [1RPC] Fetching transaction count for: ${address}`);
      
      const result = await this.rpcCall('eth_getTransactionCount', [address, blockNumber]) as string;
      const count = parseInt(result, 16);
      
      console.log(`✅ [1RPC] Transaction count: ${count}`);
      
      return count;
    } catch (error) {
      console.error('[1RPC] Transaction count fetch error:', error);
      throw new Error(`Failed to fetch transaction count: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get transaction by hash
   */
  async getTransaction(txHash: string): Promise<unknown> {
    try {
      console.log(`🔍 [1RPC] Fetching transaction: ${txHash}`);
      
      const result = await this.rpcCall('eth_getTransactionByHash', [txHash]);
      
      if (result) {
        console.log(`✅ [1RPC] Transaction retrieved`);
      } else {
        console.log(`⚠️ [1RPC] Transaction not found`);
      }
      
      return result;
    } catch (error) {
      console.error('[1RPC] Transaction fetch error:', error);
      throw new Error(`Failed to fetch transaction: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get transaction receipt
   */
  async getTransactionReceipt(txHash: string): Promise<unknown> {
    try {
      console.log(`🔍 [1RPC] Fetching transaction receipt: ${txHash}`);
      
      const result = await this.rpcCall('eth_getTransactionReceipt', [txHash]);
      
      if (result) {
        console.log(`✅ [1RPC] Transaction receipt retrieved`);
      } else {
        console.log(`⚠️ [1RPC] Transaction receipt not found`);
      }
      
      return result;
    } catch (error) {
      console.error('[1RPC] Transaction receipt fetch error:', error);
      throw new Error(`Failed to fetch transaction receipt: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get block by number
   */
  async getBlockByNumber(blockNumber: string | number, fullTransactions: boolean = false): Promise<unknown> {
    try {
      const blockParam = typeof blockNumber === 'number' 
        ? `0x${blockNumber.toString(16)}` 
        : blockNumber;
      
      console.log(`🔍 [1RPC] Fetching block: ${blockParam}`);
      
      const result = await this.rpcCall('eth_getBlockByNumber', [blockParam, fullTransactions]);
      
      if (result) {
        console.log(`✅ [1RPC] Block retrieved`);
      } else {
        console.log(`⚠️ [1RPC] Block not found`);
      }
      
      return result;
    } catch (error) {
      console.error('[1RPC] Block fetch error:', error);
      throw new Error(`Failed to fetch block: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get latest block number
   */
  async getLatestBlockNumber(): Promise<number> {
    try {
      console.log('🔍 [1RPC] Fetching latest block number...');
      
      const result = await this.rpcCall('eth_blockNumber', []) as string;
      const blockNumber = parseInt(result, 16);
      
      console.log(`✅ [1RPC] Latest block number: ${blockNumber}`);
      
      return blockNumber;
    } catch (error) {
      console.error('[1RPC] Latest block number fetch error:', error);
      throw new Error(`Failed to fetch latest block number: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get current gas price
   */
  async getGasPrice(): Promise<{
    gasPrice: string; // in Wei
    gasPriceGwei: number; // in Gwei
  }> {
    try {
      console.log('🔍 [1RPC] Fetching gas price...');
      
      const result = await this.rpcCall('eth_gasPrice', []) as string;
      const gasPrice = BigInt(result).toString();
      const gasPriceGwei = parseFloat(gasPrice) / 1e9;
      
      console.log(`✅ [1RPC] Gas price: ${gasPrice} Wei (${gasPriceGwei} Gwei)`);
      
      return {
        gasPrice,
        gasPriceGwei
      };
    } catch (error) {
      console.error('[1RPC] Gas price fetch error:', error);
      throw new Error(`Failed to fetch gas price: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Estimate gas for a transaction
   */
  async estimateGas(transaction: {
    from?: string;
    to: string;
    value?: string;
    data?: string;
    gas?: string;
    gasPrice?: string;
  }): Promise<{
    gasEstimate: string;
    gasEstimateNumber: number;
  }> {
    try {
      console.log('🔍 [1RPC] Estimating gas...');
      
      const result = await this.rpcCall('eth_estimateGas', [transaction]) as string;
      const gasEstimate = BigInt(result).toString();
      const gasEstimateNumber = parseInt(result, 16);
      
      console.log(`✅ [1RPC] Gas estimate: ${gasEstimateNumber}`);
      
      return {
        gasEstimate,
        gasEstimateNumber
      };
    } catch (error) {
      console.error('[1RPC] Gas estimate error:', error);
      throw new Error(`Failed to estimate gas: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Send raw transaction
   */
  async sendRawTransaction(signedTx: string): Promise<string> {
    try {
      console.log('📡 [1RPC] Broadcasting transaction...');
      
      const result = await this.rpcCall('eth_sendRawTransaction', [signedTx]) as string;
      
      console.log(`✅ [1RPC] Transaction broadcast successful: ${result}`);
      
      return result;
    } catch (error) {
      console.error('[1RPC] Broadcast error:', error);
      throw new Error(`Failed to broadcast transaction: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get smart contract code at an address
   */
  async getCode(address: string, blockNumber: string = 'latest'): Promise<string> {
    try {
      console.log(`🔍 [1RPC] Fetching code for: ${address}`);
      
      const result = await this.rpcCall('eth_getCode', [address, blockNumber]) as string;
      
      console.log(`✅ [1RPC] Code retrieved (${result.length} bytes)`);
      
      return result;
    } catch (error) {
      console.error('[1RPC] Code fetch error:', error);
      throw new Error(`Failed to fetch code: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Call a smart contract function (read-only)
   */
  async call(transaction: {
    from?: string;
    to: string;
    data: string;
    gas?: string;
    gasPrice?: string;
    value?: string;
  }, blockNumber: string = 'latest'): Promise<string> {
    try {
      console.log('🔍 [1RPC] Calling contract function...');
      
      const result = await this.rpcCall('eth_call', [transaction, blockNumber]) as string;
      
      console.log(`✅ [1RPC] Contract call successful`);
      
      return result;
    } catch (error) {
      console.error('[1RPC] Contract call error:', error);
      throw new Error(`Failed to call contract: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get chain ID
   */
  async getChainId(): Promise<number> {
    try {
      console.log('🔍 [1RPC] Fetching chain ID...');
      
      const result = await this.rpcCall('eth_chainId', []) as string;
      const chainId = parseInt(result, 16);
      
      console.log(`✅ [1RPC] Chain ID: ${chainId}`);
      
      return chainId;
    } catch (error) {
      console.error('[1RPC] Chain ID fetch error:', error);
      throw new Error(`Failed to fetch chain ID: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

// Singleton instances for convenience
export const oneRPCMainnet = new OneRPCAPI('mainnet');
export const oneRPCTestnet = new OneRPCAPI('testnet');

