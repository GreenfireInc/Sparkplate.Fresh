// NOWNodes API Implementation for BNB Smart Chain
// Website: https://nownodes.io/nodes/bsc
// Free tier: Enter email to get free API key
// Provides full-node access + block explorer endpoints

export interface NOWNodesConfig {
  apiKey: string; // Required - get free at https://nownodes.io
}

export class NOWNodesAPI {
  private rpcUrl: string;
  private apiKey: string;
  private network: 'mainnet' | 'testnet';

  constructor(config: NOWNodesConfig, network: 'mainnet' | 'testnet' = 'mainnet') {
    if (!config.apiKey) {
      throw new Error('NOWNodes API key is required. Get one free at https://nownodes.io');
    }
    
    this.apiKey = config.apiKey;
    this.network = network;
    
    // NOWNodes endpoints
    this.rpcUrl = network === 'mainnet'
      ? 'https://bsc.nownodes.io'
      : 'https://bsc-testnet.nownodes.io';
  }

  /**
   * Make a JSON-RPC call
   */
  private async rpcCall(method: string, params: unknown[] = []): Promise<unknown> {
    try {
      const response = await fetch(this.rpcUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': this.apiKey
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 1,
          method,
          params
        })
      });

      if (!response.ok) {
        throw new Error(`NOWNodes RPC error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(`NOWNodes RPC error: ${data.error.message}`);
      }

      return data.result;
    } catch (error) {
      console.error(`[NOWNodes] ${method} error:`, error);
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
      console.log(`🔍 [NOWNodes] Fetching balance for: ${address}`);
      console.log(`🔗 [NOWNodes] Using endpoint: ${this.rpcUrl}`);
      
      const result = await this.rpcCall('eth_getBalance', [address, blockNumber]) as string;
      
      const balance = BigInt(result).toString();
      const balanceBNB = parseFloat(balance) / 1e18;
      
      console.log(`✅ [NOWNodes] Balance: ${balance} Wei (${balanceBNB} BNB)`);
      
      return {
        balance,
        balanceBNB
      };
    } catch (error) {
      console.error('[NOWNodes] Balance fetch error:', error);
      throw new Error(`Failed to fetch balance: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get transaction count (nonce) for an address
   */
  async getTransactionCount(address: string, blockNumber: string = 'latest'): Promise<number> {
    try {
      console.log(`🔍 [NOWNodes] Fetching transaction count for: ${address}`);
      
      const result = await this.rpcCall('eth_getTransactionCount', [address, blockNumber]) as string;
      const count = parseInt(result, 16);
      
      console.log(`✅ [NOWNodes] Transaction count: ${count}`);
      
      return count;
    } catch (error) {
      console.error('[NOWNodes] Transaction count fetch error:', error);
      throw new Error(`Failed to fetch transaction count: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get transaction by hash
   */
  async getTransaction(txHash: string): Promise<unknown> {
    try {
      console.log(`🔍 [NOWNodes] Fetching transaction: ${txHash}`);
      
      const result = await this.rpcCall('eth_getTransactionByHash', [txHash]);
      
      if (result) {
        console.log(`✅ [NOWNodes] Transaction retrieved`);
      } else {
        console.log(`⚠️ [NOWNodes] Transaction not found`);
      }
      
      return result;
    } catch (error) {
      console.error('[NOWNodes] Transaction fetch error:', error);
      throw new Error(`Failed to fetch transaction: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get transaction receipt
   */
  async getTransactionReceipt(txHash: string): Promise<unknown> {
    try {
      console.log(`🔍 [NOWNodes] Fetching transaction receipt: ${txHash}`);
      
      const result = await this.rpcCall('eth_getTransactionReceipt', [txHash]);
      
      if (result) {
        console.log(`✅ [NOWNodes] Transaction receipt retrieved`);
      } else {
        console.log(`⚠️ [NOWNodes] Transaction receipt not found`);
      }
      
      return result;
    } catch (error) {
      console.error('[NOWNodes] Transaction receipt fetch error:', error);
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
      
      console.log(`🔍 [NOWNodes] Fetching block: ${blockParam}`);
      
      const result = await this.rpcCall('eth_getBlockByNumber', [blockParam, fullTransactions]);
      
      if (result) {
        console.log(`✅ [NOWNodes] Block retrieved`);
      } else {
        console.log(`⚠️ [NOWNodes] Block not found`);
      }
      
      return result;
    } catch (error) {
      console.error('[NOWNodes] Block fetch error:', error);
      throw new Error(`Failed to fetch block: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get latest block number
   */
  async getLatestBlockNumber(): Promise<number> {
    try {
      console.log('🔍 [NOWNodes] Fetching latest block number...');
      
      const result = await this.rpcCall('eth_blockNumber', []) as string;
      const blockNumber = parseInt(result, 16);
      
      console.log(`✅ [NOWNodes] Latest block number: ${blockNumber}`);
      
      return blockNumber;
    } catch (error) {
      console.error('[NOWNodes] Latest block number fetch error:', error);
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
      console.log('🔍 [NOWNodes] Fetching gas price...');
      
      const result = await this.rpcCall('eth_gasPrice', []) as string;
      const gasPrice = BigInt(result).toString();
      const gasPriceGwei = parseFloat(gasPrice) / 1e9;
      
      console.log(`✅ [NOWNodes] Gas price: ${gasPrice} Wei (${gasPriceGwei} Gwei)`);
      
      return {
        gasPrice,
        gasPriceGwei
      };
    } catch (error) {
      console.error('[NOWNodes] Gas price fetch error:', error);
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
      console.log('🔍 [NOWNodes] Estimating gas...');
      
      const result = await this.rpcCall('eth_estimateGas', [transaction]) as string;
      const gasEstimate = BigInt(result).toString();
      const gasEstimateNumber = parseInt(result, 16);
      
      console.log(`✅ [NOWNodes] Gas estimate: ${gasEstimateNumber}`);
      
      return {
        gasEstimate,
        gasEstimateNumber
      };
    } catch (error) {
      console.error('[NOWNodes] Gas estimate error:', error);
      throw new Error(`Failed to estimate gas: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Send raw transaction
   */
  async sendRawTransaction(signedTx: string): Promise<string> {
    try {
      console.log('📡 [NOWNodes] Broadcasting transaction...');
      
      const result = await this.rpcCall('eth_sendRawTransaction', [signedTx]) as string;
      
      console.log(`✅ [NOWNodes] Transaction broadcast successful: ${result}`);
      
      return result;
    } catch (error) {
      console.error('[NOWNodes] Broadcast error:', error);
      throw new Error(`Failed to broadcast transaction: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get smart contract code at an address
   */
  async getCode(address: string, blockNumber: string = 'latest'): Promise<string> {
    try {
      console.log(`🔍 [NOWNodes] Fetching code for: ${address}`);
      
      const result = await this.rpcCall('eth_getCode', [address, blockNumber]) as string;
      
      console.log(`✅ [NOWNodes] Code retrieved (${result.length} bytes)`);
      
      return result;
    } catch (error) {
      console.error('[NOWNodes] Code fetch error:', error);
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
      console.log('🔍 [NOWNodes] Calling contract function...');
      
      const result = await this.rpcCall('eth_call', [transaction, blockNumber]) as string;
      
      console.log(`✅ [NOWNodes] Contract call successful`);
      
      return result;
    } catch (error) {
      console.error('[NOWNodes] Contract call error:', error);
      throw new Error(`Failed to call contract: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get chain ID
   */
  async getChainId(): Promise<number> {
    try {
      console.log('🔍 [NOWNodes] Fetching chain ID...');
      
      const result = await this.rpcCall('eth_chainId', []) as string;
      const chainId = parseInt(result, 16);
      
      console.log(`✅ [NOWNodes] Chain ID: ${chainId}`);
      
      return chainId;
    } catch (error) {
      console.error('[NOWNodes] Chain ID fetch error:', error);
      throw new Error(`Failed to fetch chain ID: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

// Note: Requires API key, users must create their own instances
// Example: const nownodes = new NOWNodesAPI({ apiKey: 'YOUR_API_KEY' });

