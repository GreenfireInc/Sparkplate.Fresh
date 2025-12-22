// Ankr API Implementation for BNB Smart Chain
// API Docs: https://www.ankr.com/rpc/bsc
// Free tier: Public RPC with rate limits
// HTTPS & WebSocket endpoints available
// No API key required for basic usage

export interface AnkrConfig {
  apiKey?: string; // Optional for premium features
  network?: 'mainnet' | 'testnet';
}

export class AnkrAPI {
  private rpcUrl: string;
  private wsUrl: string;
  private apiKey?: string;
  private network: 'mainnet' | 'testnet';

  constructor(config?: AnkrConfig) {
    this.network = config?.network || 'mainnet';
    this.apiKey = config?.apiKey;
    
    // Ankr public endpoints
    if (this.network === 'mainnet') {
      this.rpcUrl = 'https://rpc.ankr.com/bsc';
      this.wsUrl = 'wss://rpc.ankr.com/bsc/ws';
    } else {
      this.rpcUrl = 'https://rpc.ankr.com/bsc_testnet_chapel';
      this.wsUrl = 'wss://rpc.ankr.com/bsc_testnet_chapel/ws';
    }
  }

  /**
   * Make a JSON-RPC call
   */
  private async rpcCall(method: string, params: unknown[] = []): Promise<unknown> {
    try {
      const headers: HeadersInit = {
        'Content-Type': 'application/json'
      };
      
      if (this.apiKey) {
        headers['Authorization'] = `Bearer ${this.apiKey}`;
      }
      
      const response = await fetch(this.rpcUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 1,
          method,
          params
        })
      });

      if (!response.ok) {
        throw new Error(`Ankr RPC error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(`Ankr RPC error: ${data.error.message}`);
      }

      return data.result;
    } catch (error) {
      console.error(`[Ankr] ${method} error:`, error);
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
      console.log(`🔍 [Ankr] Fetching balance for: ${address}`);
      console.log(`🔗 [Ankr] Using endpoint: ${this.rpcUrl}`);
      
      const result = await this.rpcCall('eth_getBalance', [address, blockNumber]) as string;
      
      const balance = BigInt(result).toString();
      const balanceBNB = parseFloat(balance) / 1e18;
      
      console.log(`✅ [Ankr] Balance: ${balance} Wei (${balanceBNB} BNB)`);
      
      return {
        balance,
        balanceBNB
      };
    } catch (error) {
      console.error('[Ankr] Balance fetch error:', error);
      throw new Error(`Failed to fetch balance: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get transaction count (nonce) for an address
   */
  async getTransactionCount(address: string, blockNumber: string = 'latest'): Promise<number> {
    try {
      console.log(`🔍 [Ankr] Fetching transaction count for: ${address}`);
      
      const result = await this.rpcCall('eth_getTransactionCount', [address, blockNumber]) as string;
      const count = parseInt(result, 16);
      
      console.log(`✅ [Ankr] Transaction count: ${count}`);
      
      return count;
    } catch (error) {
      console.error('[Ankr] Transaction count fetch error:', error);
      throw new Error(`Failed to fetch transaction count: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get transaction by hash
   */
  async getTransaction(txHash: string): Promise<unknown> {
    try {
      console.log(`🔍 [Ankr] Fetching transaction: ${txHash}`);
      
      const result = await this.rpcCall('eth_getTransactionByHash', [txHash]);
      
      if (result) {
        console.log(`✅ [Ankr] Transaction retrieved`);
      } else {
        console.log(`⚠️ [Ankr] Transaction not found`);
      }
      
      return result;
    } catch (error) {
      console.error('[Ankr] Transaction fetch error:', error);
      throw new Error(`Failed to fetch transaction: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get transaction receipt
   */
  async getTransactionReceipt(txHash: string): Promise<unknown> {
    try {
      console.log(`🔍 [Ankr] Fetching transaction receipt: ${txHash}`);
      
      const result = await this.rpcCall('eth_getTransactionReceipt', [txHash]);
      
      if (result) {
        console.log(`✅ [Ankr] Transaction receipt retrieved`);
      } else {
        console.log(`⚠️ [Ankr] Transaction receipt not found`);
      }
      
      return result;
    } catch (error) {
      console.error('[Ankr] Transaction receipt fetch error:', error);
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
      
      console.log(`🔍 [Ankr] Fetching block: ${blockParam}`);
      
      const result = await this.rpcCall('eth_getBlockByNumber', [blockParam, fullTransactions]);
      
      if (result) {
        console.log(`✅ [Ankr] Block retrieved`);
      } else {
        console.log(`⚠️ [Ankr] Block not found`);
      }
      
      return result;
    } catch (error) {
      console.error('[Ankr] Block fetch error:', error);
      throw new Error(`Failed to fetch block: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get latest block number
   */
  async getLatestBlockNumber(): Promise<number> {
    try {
      console.log('🔍 [Ankr] Fetching latest block number...');
      
      const result = await this.rpcCall('eth_blockNumber', []) as string;
      const blockNumber = parseInt(result, 16);
      
      console.log(`✅ [Ankr] Latest block number: ${blockNumber}`);
      
      return blockNumber;
    } catch (error) {
      console.error('[Ankr] Latest block number fetch error:', error);
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
      console.log('🔍 [Ankr] Fetching gas price...');
      
      const result = await this.rpcCall('eth_gasPrice', []) as string;
      const gasPrice = BigInt(result).toString();
      const gasPriceGwei = parseFloat(gasPrice) / 1e9;
      
      console.log(`✅ [Ankr] Gas price: ${gasPrice} Wei (${gasPriceGwei} Gwei)`);
      
      return {
        gasPrice,
        gasPriceGwei
      };
    } catch (error) {
      console.error('[Ankr] Gas price fetch error:', error);
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
      console.log('🔍 [Ankr] Estimating gas...');
      
      const result = await this.rpcCall('eth_estimateGas', [transaction]) as string;
      const gasEstimate = BigInt(result).toString();
      const gasEstimateNumber = parseInt(result, 16);
      
      console.log(`✅ [Ankr] Gas estimate: ${gasEstimateNumber}`);
      
      return {
        gasEstimate,
        gasEstimateNumber
      };
    } catch (error) {
      console.error('[Ankr] Gas estimate error:', error);
      throw new Error(`Failed to estimate gas: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Send raw transaction
   */
  async sendRawTransaction(signedTx: string): Promise<string> {
    try {
      console.log('📡 [Ankr] Broadcasting transaction...');
      
      const result = await this.rpcCall('eth_sendRawTransaction', [signedTx]) as string;
      
      console.log(`✅ [Ankr] Transaction broadcast successful: ${result}`);
      
      return result;
    } catch (error) {
      console.error('[Ankr] Broadcast error:', error);
      throw new Error(`Failed to broadcast transaction: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get smart contract code at an address
   */
  async getCode(address: string, blockNumber: string = 'latest'): Promise<string> {
    try {
      console.log(`🔍 [Ankr] Fetching code for: ${address}`);
      
      const result = await this.rpcCall('eth_getCode', [address, blockNumber]) as string;
      
      console.log(`✅ [Ankr] Code retrieved (${result.length} bytes)`);
      
      return result;
    } catch (error) {
      console.error('[Ankr] Code fetch error:', error);
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
      console.log('🔍 [Ankr] Calling contract function...');
      
      const result = await this.rpcCall('eth_call', [transaction, blockNumber]) as string;
      
      console.log(`✅ [Ankr] Contract call successful`);
      
      return result;
    } catch (error) {
      console.error('[Ankr] Contract call error:', error);
      throw new Error(`Failed to call contract: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get chain ID
   */
  async getChainId(): Promise<number> {
    try {
      console.log('🔍 [Ankr] Fetching chain ID...');
      
      const result = await this.rpcCall('eth_chainId', []) as string;
      const chainId = parseInt(result, 16);
      
      console.log(`✅ [Ankr] Chain ID: ${chainId}`);
      
      return chainId;
    } catch (error) {
      console.error('[Ankr] Chain ID fetch error:', error);
      throw new Error(`Failed to fetch chain ID: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get WebSocket URL for real-time subscriptions
   */
  getWebSocketUrl(): string {
    return this.wsUrl;
  }
}

// Singleton instances for convenience
export const ankrMainnet = new AnkrAPI({ network: 'mainnet' });
export const ankrTestnet = new AnkrAPI({ network: 'testnet' });

