// GetBlock API Implementation for Ethereum
// API Docs: https://getblock.io/docs/
// Free tier: Available
// Instant access to Ethereum nodes

export interface GetBlockConfig {
  apiKey: string; // Required API key
}

export class GetBlockAPI {
  private baseUrl: string;
  private apiKey: string;
  private network: 'mainnet' | 'goerli' | 'sepolia';
  private rpcId = 1;

  constructor(config: GetBlockConfig, network: 'mainnet' | 'goerli' | 'sepolia' = 'mainnet') {
    this.apiKey = config.apiKey;
    this.network = network;
    
    const networkMap: Record<string, string> = {
      mainnet: 'eth',
      goerli: 'goerli',
      sepolia: 'sepolia'
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
   * Get balance for an address
   */
  async getBalance(address: string, block: string | number = 'latest'): Promise<{
    balance: bigint;
    balanceETH: number;
  }> {
    try {
      console.log(`🔍 [GetBlock] Fetching balance for: ${address}`);
      
      const blockParam = typeof block === 'number' ? `0x${block.toString(16)}` : block;
      const balanceHex = await this.rpcCall<string>('eth_getBalance', [address, blockParam]);
      
      const balance = BigInt(balanceHex);
      const balanceETH = Number(balance) / 1e18;
      
      console.log(`✅ [GetBlock] Balance: ${balance} wei (${balanceETH} ETH)`);
      
      return {
        balance,
        balanceETH
      };
    } catch (error) {
      console.error('[GetBlock] Balance fetch error:', error);
      throw new Error(`Failed to fetch balance: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Send raw transaction
   */
  async sendRawTransaction(signedTx: string): Promise<string> {
    try {
      console.log('📡 [GetBlock] Broadcasting transaction...');
      
      const txHash = await this.rpcCall<string>('eth_sendRawTransaction', [signedTx]);
      
      console.log(`✅ [GetBlock] Transaction broadcast successful: ${txHash}`);
      
      return txHash;
    } catch (error) {
      console.error('[GetBlock] Broadcast error:', error);
      throw new Error(`Failed to broadcast transaction: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get transaction by hash
   */
  async getTransaction(txHash: string): Promise<unknown | null> {
    try {
      console.log(`🔍 [GetBlock] Fetching transaction: ${txHash}`);
      
      const transaction = await this.rpcCall('eth_getTransactionByHash', [txHash]);
      
      console.log(`✅ [GetBlock] Transaction retrieved`);
      
      return transaction;
    } catch (error) {
      console.error('[GetBlock] Transaction fetch error:', error);
      throw new Error(`Failed to fetch transaction: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get latest block number
   */
  async getBlockNumber(): Promise<number> {
    try {
      console.log('🔍 [GetBlock] Fetching latest block number...');
      
      const blockNumberHex = await this.rpcCall<string>('eth_blockNumber');
      const blockNumber = parseInt(blockNumberHex, 16);
      
      console.log(`✅ [GetBlock] Latest block number: ${blockNumber}`);
      
      return blockNumber;
    } catch (error) {
      console.error('[GetBlock] Block number fetch error:', error);
      throw new Error(`Failed to fetch block number: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get gas price
   */
  async getGasPrice(): Promise<bigint> {
    try {
      console.log('🔍 [GetBlock] Fetching gas price...');
      
      const gasPriceHex = await this.rpcCall<string>('eth_gasPrice');
      const gasPrice = BigInt(gasPriceHex);
      
      console.log(`✅ [GetBlock] Gas price: ${gasPrice} wei (${Number(gasPrice) / 1e9} Gwei)`);
      
      return gasPrice;
    } catch (error) {
      console.error('[GetBlock] Gas price fetch error:', error);
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
      console.log('🔍 [GetBlock] Estimating gas...');
      
      const gasHex = await this.rpcCall<string>('eth_estimateGas', [transaction]);
      const gas = BigInt(gasHex);
      
      console.log(`✅ [GetBlock] Estimated gas: ${gas}`);
      
      return gas;
    } catch (error) {
      console.error('[GetBlock] Gas estimation error:', error);
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
      console.log('🔍 [GetBlock] Calling contract...');
      
      const blockParam = typeof block === 'number' ? `0x${block.toString(16)}` : block;
      const result = await this.rpcCall<string>('eth_call', [transaction, blockParam]);
      
      console.log(`✅ [GetBlock] Contract call successful`);
      
      return result;
    } catch (error) {
      console.error('[GetBlock] Contract call error:', error);
      throw new Error(`Failed to call contract: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

// Factory functions (require API key)
export const createGetBlockMainnet = (apiKey: string) => new GetBlockAPI({ apiKey }, 'mainnet');
export const createGetBlockGoerli = (apiKey: string) => new GetBlockAPI({ apiKey }, 'goerli');
export const createGetBlockSepolia = (apiKey: string) => new GetBlockAPI({ apiKey }, 'sepolia');

