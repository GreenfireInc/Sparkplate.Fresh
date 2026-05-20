// Public RPC API for BNB Smart Chain
// Uses official Binance RPC nodes and community providers
// Free public access, no API key required
// Standard JSON-RPC interface (Geth/Go-Ethereum compatible)

export interface RPCTransaction {
  blockHash: string;
  blockNumber: string;
  from: string;
  gas: string;
  gasPrice: string;
  hash: string;
  input: string;
  nonce: string;
  to: string;
  transactionIndex: string;
  value: string;
  v: string;
  r: string;
  s: string;
}

export interface RPCTransactionReceipt {
  blockHash: string;
  blockNumber: string;
  contractAddress: string | null;
  cumulativeGasUsed: string;
  from: string;
  gasUsed: string;
  logs: unknown[];
  logsBloom: string;
  status: string;
  to: string;
  transactionHash: string;
  transactionIndex: string;
}

export interface RPCBlock {
  number: string;
  hash: string;
  parentHash: string;
  nonce: string;
  sha3Uncles: string;
  logsBloom: string;
  transactionsRoot: string;
  stateRoot: string;
  receiptsRoot: string;
  miner: string;
  difficulty: string;
  totalDifficulty: string;
  extraData: string;
  size: string;
  gasLimit: string;
  gasUsed: string;
  timestamp: string;
  transactions: string[] | RPCTransaction[];
  uncles: string[];
}

export type RPCNetwork = 'mainnet' | 'testnet';

export class PublicRPCAPI {
  private rpcUrl: string;
  private network: RPCNetwork;

  // Official Binance BSC RPC nodes (mainnet)
  private static readonly MAINNET_RPC_ENDPOINTS = [
    'https://bsc-dataseed1.binance.org',
    'https://bsc-dataseed2.binance.org',
    'https://bsc-dataseed3.binance.org',
    'https://bsc-dataseed4.binance.org',
    'https://bsc-dataseed1.defibit.io',
    'https://bsc-dataseed2.defibit.io',
    'https://bsc-dataseed3.defibit.io',
    'https://bsc-dataseed4.defibit.io',
    'https://bsc-dataseed1.ninicoin.io',
    'https://bsc-dataseed2.ninicoin.io',
    'https://bsc-dataseed3.ninicoin.io',
    'https://bsc-dataseed4.ninicoin.io',
    'https://bsc-rpc.publicnode.com'
  ];

  // Official Binance BSC RPC nodes (testnet)
  private static readonly TESTNET_RPC_ENDPOINTS = [
    'https://data-seed-prebsc-1-s1.binance.org:8545',
    'https://data-seed-prebsc-2-s1.binance.org:8545',
    'https://data-seed-prebsc-1-s3.binance.org:8545',
    'https://data-seed-prebsc-2-s3.binance.org:8545'
  ];

  constructor(network: RPCNetwork = 'mainnet', customRpcUrl?: string) {
    this.network = network;
    
    // Use custom RPC URL or default to first public endpoint
    if (customRpcUrl) {
      this.rpcUrl = customRpcUrl;
    } else {
      this.rpcUrl = network === 'mainnet'
        ? PublicRPCAPI.MAINNET_RPC_ENDPOINTS[0]
        : PublicRPCAPI.TESTNET_RPC_ENDPOINTS[0];
    }
  }

  /**
   * Get list of available public RPC endpoints
   */
  static getPublicEndpoints(network: RPCNetwork = 'mainnet'): string[] {
    return network === 'mainnet'
      ? [...PublicRPCAPI.MAINNET_RPC_ENDPOINTS]
      : [...PublicRPCAPI.TESTNET_RPC_ENDPOINTS];
  }

  /**
   * Switch to a different public endpoint
   */
  switchEndpoint(index: number): void {
    const endpoints = this.network === 'mainnet'
      ? PublicRPCAPI.MAINNET_RPC_ENDPOINTS
      : PublicRPCAPI.TESTNET_RPC_ENDPOINTS;
    
    if (index >= 0 && index < endpoints.length) {
      this.rpcUrl = endpoints[index];
      console.log(`🔄 [Public RPC] Switched to endpoint: ${this.rpcUrl}`);
    }
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
        throw new Error(`RPC error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(`RPC error: ${data.error.message}`);
      }

      return data.result;
    } catch (error) {
      console.error(`[Public RPC] ${method} error:`, error);
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
      console.log(`🔍 [Public RPC] Fetching balance for: ${address}`);
      console.log(`🔗 [Public RPC] Using endpoint: ${this.rpcUrl}`);
      
      const result = await this.rpcCall('eth_getBalance', [address, blockNumber]) as string;
      
      const balance = BigInt(result).toString();
      const balanceBNB = parseFloat(balance) / 1e18;
      
      console.log(`✅ [Public RPC] Balance: ${balance} Wei (${balanceBNB} BNB)`);
      
      return {
        balance,
        balanceBNB
      };
    } catch (error) {
      console.error('[Public RPC] Balance fetch error:', error);
      throw new Error(`Failed to fetch balance: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get transaction count (nonce) for an address
   */
  async getTransactionCount(address: string, blockNumber: string = 'latest'): Promise<number> {
    try {
      console.log(`🔍 [Public RPC] Fetching transaction count for: ${address}`);
      
      const result = await this.rpcCall('eth_getTransactionCount', [address, blockNumber]) as string;
      const count = parseInt(result, 16);
      
      console.log(`✅ [Public RPC] Transaction count: ${count}`);
      
      return count;
    } catch (error) {
      console.error('[Public RPC] Transaction count fetch error:', error);
      throw new Error(`Failed to fetch transaction count: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get transaction by hash
   */
  async getTransaction(txHash: string): Promise<RPCTransaction | null> {
    try {
      console.log(`🔍 [Public RPC] Fetching transaction: ${txHash}`);
      
      const result = await this.rpcCall('eth_getTransactionByHash', [txHash]) as RPCTransaction | null;
      
      if (result) {
        console.log(`✅ [Public RPC] Transaction retrieved`);
      } else {
        console.log(`⚠️ [Public RPC] Transaction not found`);
      }
      
      return result;
    } catch (error) {
      console.error('[Public RPC] Transaction fetch error:', error);
      throw new Error(`Failed to fetch transaction: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get transaction receipt
   */
  async getTransactionReceipt(txHash: string): Promise<RPCTransactionReceipt | null> {
    try {
      console.log(`🔍 [Public RPC] Fetching transaction receipt: ${txHash}`);
      
      const result = await this.rpcCall('eth_getTransactionReceipt', [txHash]) as RPCTransactionReceipt | null;
      
      if (result) {
        console.log(`✅ [Public RPC] Transaction receipt retrieved`);
      } else {
        console.log(`⚠️ [Public RPC] Transaction receipt not found`);
      }
      
      return result;
    } catch (error) {
      console.error('[Public RPC] Transaction receipt fetch error:', error);
      throw new Error(`Failed to fetch transaction receipt: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get block by number
   */
  async getBlockByNumber(blockNumber: string | number, fullTransactions: boolean = false): Promise<RPCBlock | null> {
    try {
      const blockParam = typeof blockNumber === 'number' 
        ? `0x${blockNumber.toString(16)}` 
        : blockNumber;
      
      console.log(`🔍 [Public RPC] Fetching block: ${blockParam}`);
      
      const result = await this.rpcCall('eth_getBlockByNumber', [blockParam, fullTransactions]) as RPCBlock | null;
      
      if (result) {
        console.log(`✅ [Public RPC] Block retrieved: ${result.number}`);
      } else {
        console.log(`⚠️ [Public RPC] Block not found`);
      }
      
      return result;
    } catch (error) {
      console.error('[Public RPC] Block fetch error:', error);
      throw new Error(`Failed to fetch block: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get latest block number
   */
  async getLatestBlockNumber(): Promise<number> {
    try {
      console.log('🔍 [Public RPC] Fetching latest block number...');
      
      const result = await this.rpcCall('eth_blockNumber', []) as string;
      const blockNumber = parseInt(result, 16);
      
      console.log(`✅ [Public RPC] Latest block number: ${blockNumber}`);
      
      return blockNumber;
    } catch (error) {
      console.error('[Public RPC] Latest block number fetch error:', error);
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
      console.log('🔍 [Public RPC] Fetching gas price...');
      
      const result = await this.rpcCall('eth_gasPrice', []) as string;
      const gasPrice = BigInt(result).toString();
      const gasPriceGwei = parseFloat(gasPrice) / 1e9;
      
      console.log(`✅ [Public RPC] Gas price: ${gasPrice} Wei (${gasPriceGwei} Gwei)`);
      
      return {
        gasPrice,
        gasPriceGwei
      };
    } catch (error) {
      console.error('[Public RPC] Gas price fetch error:', error);
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
      console.log('🔍 [Public RPC] Estimating gas...');
      
      const result = await this.rpcCall('eth_estimateGas', [transaction]) as string;
      const gasEstimate = BigInt(result).toString();
      const gasEstimateNumber = parseInt(result, 16);
      
      console.log(`✅ [Public RPC] Gas estimate: ${gasEstimateNumber}`);
      
      return {
        gasEstimate,
        gasEstimateNumber
      };
    } catch (error) {
      console.error('[Public RPC] Gas estimate error:', error);
      throw new Error(`Failed to estimate gas: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Send raw transaction
   */
  async sendRawTransaction(signedTx: string): Promise<string> {
    try {
      console.log('📡 [Public RPC] Broadcasting transaction...');
      
      const result = await this.rpcCall('eth_sendRawTransaction', [signedTx]) as string;
      
      console.log(`✅ [Public RPC] Transaction broadcast successful: ${result}`);
      
      return result;
    } catch (error) {
      console.error('[Public RPC] Broadcast error:', error);
      throw new Error(`Failed to broadcast transaction: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get smart contract code at an address
   */
  async getCode(address: string, blockNumber: string = 'latest'): Promise<string> {
    try {
      console.log(`🔍 [Public RPC] Fetching code for: ${address}`);
      
      const result = await this.rpcCall('eth_getCode', [address, blockNumber]) as string;
      
      console.log(`✅ [Public RPC] Code retrieved (${result.length} bytes)`);
      
      return result;
    } catch (error) {
      console.error('[Public RPC] Code fetch error:', error);
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
      console.log('🔍 [Public RPC] Calling contract function...');
      
      const result = await this.rpcCall('eth_call', [transaction, blockNumber]) as string;
      
      console.log(`✅ [Public RPC] Contract call successful`);
      
      return result;
    } catch (error) {
      console.error('[Public RPC] Contract call error:', error);
      throw new Error(`Failed to call contract: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get chain ID
   */
  async getChainId(): Promise<number> {
    try {
      console.log('🔍 [Public RPC] Fetching chain ID...');
      
      const result = await this.rpcCall('eth_chainId', []) as string;
      const chainId = parseInt(result, 16);
      
      console.log(`✅ [Public RPC] Chain ID: ${chainId}`);
      
      return chainId;
    } catch (error) {
      console.error('[Public RPC] Chain ID fetch error:', error);
      throw new Error(`Failed to fetch chain ID: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

// Singleton instances for convenience
export const publicRPCMainnet = new PublicRPCAPI('mainnet');
export const publicRPCTestnet = new PublicRPCAPI('testnet');

// Helper to create instance with custom endpoint
export const createPublicRPCAPI = (rpcUrl: string, network: RPCNetwork = 'mainnet') => {
  return new PublicRPCAPI(network, rpcUrl);
};

