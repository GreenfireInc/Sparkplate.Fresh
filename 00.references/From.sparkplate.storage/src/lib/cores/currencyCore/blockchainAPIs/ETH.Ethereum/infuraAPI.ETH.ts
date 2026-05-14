// Infura API Implementation for Ethereum
// API Docs: https://docs.infura.io/
// Free tier: 100,000 requests/day
// Ethereum node API service by Consensys

export interface InfuraConfig {
  apiKey: string; // Required Project ID
  apiSecret?: string; // Optional Project Secret
}

export interface InfuraTransaction {
  blockHash: string | null;
  blockNumber: string | null;
  from: string;
  gas: string;
  gasPrice: string;
  maxFeePerGas?: string;
  maxPriorityFeePerGas?: string;
  hash: string;
  input: string;
  nonce: string;
  to: string | null;
  transactionIndex: string | null;
  value: string;
  type: string;
  accessList?: unknown[];
  chainId?: string;
  v: string;
  r: string;
  s: string;
}

export interface InfuraTransactionReceipt {
  transactionHash: string;
  transactionIndex: string;
  blockHash: string;
  blockNumber: string;
  from: string;
  to: string | null;
  cumulativeGasUsed: string;
  effectiveGasPrice: string;
  gasUsed: string;
  contractAddress: string | null;
  logs: unknown[];
  logsBloom: string;
  type: string;
  status: string;
}

export interface InfuraBlock {
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
  transactions: string[] | InfuraTransaction[];
  uncles: string[];
  baseFeePerGas?: string;
}

export class InfuraAPI {
  private baseUrl: string;
  private apiKey: string;
  private apiSecret?: string;
  private network: 'mainnet' | 'goerli' | 'sepolia';
  private rpcId = 1;

  constructor(config: InfuraConfig, network: 'mainnet' | 'goerli' | 'sepolia' = 'mainnet') {
    this.apiKey = config.apiKey;
    this.apiSecret = config.apiSecret;
    this.network = network;
    this.baseUrl = `https://${network}.infura.io/v3/${this.apiKey}`;
  }

  /**
   * Make an RPC call
   */
  private async rpcCall<T = unknown>(method: string, params: unknown[] = []): Promise<T> {
    try {
      const headers: HeadersInit = {
        'Content-Type': 'application/json'
      };

      if (this.apiSecret) {
        const auth = Buffer.from(`${this.apiKey}:${this.apiSecret}`).toString('base64');
        headers['Authorization'] = `Basic ${auth}`;
      }

      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: this.rpcId++,
          method,
          params
        })
      });

      if (!response.ok) {
        throw new Error(`Infura API error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();

      if (result.error) {
        throw new Error(`RPC error: ${result.error.message} (code: ${result.error.code})`);
      }

      return result.result;
    } catch (error) {
      console.error(`[Infura] RPC call error (${method}):`, error);
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
      console.log(`🔍 [Infura] Fetching balance for: ${address}`);
      
      const blockParam = typeof block === 'number' ? `0x${block.toString(16)}` : block;
      const balanceHex = await this.rpcCall<string>('eth_getBalance', [address, blockParam]);
      
      const balance = BigInt(balanceHex);
      const balanceETH = Number(balance) / 1e18;
      
      console.log(`✅ [Infura] Balance: ${balance} wei (${balanceETH} ETH)`);
      
      return {
        balance,
        balanceETH
      };
    } catch (error) {
      console.error('[Infura] Balance fetch error:', error);
      throw new Error(`Failed to fetch balance: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get transaction count (nonce) for an address
   */
  async getTransactionCount(address: string, block: string | number = 'latest'): Promise<number> {
    try {
      console.log(`🔍 [Infura] Fetching transaction count for: ${address}`);
      
      const blockParam = typeof block === 'number' ? `0x${block.toString(16)}` : block;
      const countHex = await this.rpcCall<string>('eth_getTransactionCount', [address, blockParam]);
      
      const count = parseInt(countHex, 16);
      
      console.log(`✅ [Infura] Transaction count: ${count}`);
      
      return count;
    } catch (error) {
      console.error('[Infura] Transaction count fetch error:', error);
      throw new Error(`Failed to fetch transaction count: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get transaction by hash
   */
  async getTransaction(txHash: string): Promise<InfuraTransaction | null> {
    try {
      console.log(`🔍 [Infura] Fetching transaction: ${txHash}`);
      
      const transaction = await this.rpcCall<InfuraTransaction | null>('eth_getTransactionByHash', [txHash]);
      
      if (transaction) {
        console.log(`✅ [Infura] Transaction retrieved`);
      } else {
        console.log(`ℹ️ [Infura] Transaction not found`);
      }
      
      return transaction;
    } catch (error) {
      console.error('[Infura] Transaction fetch error:', error);
      throw new Error(`Failed to fetch transaction: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get transaction receipt
   */
  async getTransactionReceipt(txHash: string): Promise<InfuraTransactionReceipt | null> {
    try {
      console.log(`🔍 [Infura] Fetching transaction receipt: ${txHash}`);
      
      const receipt = await this.rpcCall<InfuraTransactionReceipt | null>('eth_getTransactionReceipt', [txHash]);
      
      if (receipt) {
        console.log(`✅ [Infura] Transaction receipt retrieved`);
      } else {
        console.log(`ℹ️ [Infura] Transaction receipt not found`);
      }
      
      return receipt;
    } catch (error) {
      console.error('[Infura] Transaction receipt fetch error:', error);
      throw new Error(`Failed to fetch transaction receipt: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Send raw transaction
   */
  async sendRawTransaction(signedTx: string): Promise<string> {
    try {
      console.log('📡 [Infura] Broadcasting transaction...');
      
      const txHash = await this.rpcCall<string>('eth_sendRawTransaction', [signedTx]);
      
      console.log(`✅ [Infura] Transaction broadcast successful: ${txHash}`);
      
      return txHash;
    } catch (error) {
      console.error('[Infura] Broadcast error:', error);
      throw new Error(`Failed to broadcast transaction: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get latest block number
   */
  async getBlockNumber(): Promise<number> {
    try {
      console.log('🔍 [Infura] Fetching latest block number...');
      
      const blockNumberHex = await this.rpcCall<string>('eth_blockNumber');
      const blockNumber = parseInt(blockNumberHex, 16);
      
      console.log(`✅ [Infura] Latest block number: ${blockNumber}`);
      
      return blockNumber;
    } catch (error) {
      console.error('[Infura] Block number fetch error:', error);
      throw new Error(`Failed to fetch block number: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get block by number
   */
  async getBlockByNumber(blockNumber: number | string, fullTransactions: boolean = false): Promise<InfuraBlock | null> {
    try {
      console.log(`🔍 [Infura] Fetching block: ${blockNumber}`);
      
      const blockParam = typeof blockNumber === 'number' ? `0x${blockNumber.toString(16)}` : blockNumber;
      const block = await this.rpcCall<InfuraBlock | null>('eth_getBlockByNumber', [blockParam, fullTransactions]);
      
      if (block) {
        console.log(`✅ [Infura] Block retrieved`);
      } else {
        console.log(`ℹ️ [Infura] Block not found`);
      }
      
      return block;
    } catch (error) {
      console.error('[Infura] Block fetch error:', error);
      throw new Error(`Failed to fetch block: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get block by hash
   */
  async getBlockByHash(blockHash: string, fullTransactions: boolean = false): Promise<InfuraBlock | null> {
    try {
      console.log(`🔍 [Infura] Fetching block by hash: ${blockHash}`);
      
      const block = await this.rpcCall<InfuraBlock | null>('eth_getBlockByHash', [blockHash, fullTransactions]);
      
      if (block) {
        console.log(`✅ [Infura] Block retrieved`);
      } else {
        console.log(`ℹ️ [Infura] Block not found`);
      }
      
      return block;
    } catch (error) {
      console.error('[Infura] Block fetch error:', error);
      throw new Error(`Failed to fetch block: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get gas price
   */
  async getGasPrice(): Promise<bigint> {
    try {
      console.log('🔍 [Infura] Fetching gas price...');
      
      const gasPriceHex = await this.rpcCall<string>('eth_gasPrice');
      const gasPrice = BigInt(gasPriceHex);
      
      console.log(`✅ [Infura] Gas price: ${gasPrice} wei (${Number(gasPrice) / 1e9} Gwei)`);
      
      return gasPrice;
    } catch (error) {
      console.error('[Infura] Gas price fetch error:', error);
      throw new Error(`Failed to fetch gas price: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Estimate gas for a transaction
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
      console.log('🔍 [Infura] Estimating gas...');
      
      const gasHex = await this.rpcCall<string>('eth_estimateGas', [transaction]);
      const gas = BigInt(gasHex);
      
      console.log(`✅ [Infura] Estimated gas: ${gas}`);
      
      return gas;
    } catch (error) {
      console.error('[Infura] Gas estimation error:', error);
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
      console.log('🔍 [Infura] Calling contract...');
      
      const blockParam = typeof block === 'number' ? `0x${block.toString(16)}` : block;
      const result = await this.rpcCall<string>('eth_call', [transaction, blockParam]);
      
      console.log(`✅ [Infura] Contract call successful`);
      
      return result;
    } catch (error) {
      console.error('[Infura] Contract call error:', error);
      throw new Error(`Failed to call contract: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get chain ID
   */
  async getChainId(): Promise<number> {
    try {
      console.log('🔍 [Infura] Fetching chain ID...');
      
      const chainIdHex = await this.rpcCall<string>('eth_chainId');
      const chainId = parseInt(chainIdHex, 16);
      
      console.log(`✅ [Infura] Chain ID: ${chainId}`);
      
      return chainId;
    } catch (error) {
      console.error('[Infura] Chain ID fetch error:', error);
      throw new Error(`Failed to fetch chain ID: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get code at address (for contracts)
   */
  async getCode(address: string, block: string | number = 'latest'): Promise<string> {
    try {
      console.log(`🔍 [Infura] Fetching code for: ${address}`);
      
      const blockParam = typeof block === 'number' ? `0x${block.toString(16)}` : block;
      const code = await this.rpcCall<string>('eth_getCode', [address, blockParam]);
      
      console.log(`✅ [Infura] Code retrieved`);
      
      return code;
    } catch (error) {
      console.error('[Infura] Code fetch error:', error);
      throw new Error(`Failed to fetch code: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

// Singleton factory functions (require API key configuration)
export const createInfuraMainnet = (apiKey: string, apiSecret?: string) => 
  new InfuraAPI({ apiKey, apiSecret }, 'mainnet');
export const createInfuraGoerli = (apiKey: string, apiSecret?: string) => 
  new InfuraAPI({ apiKey, apiSecret }, 'goerli');
export const createInfuraSepolia = (apiKey: string, apiSecret?: string) => 
  new InfuraAPI({ apiKey, apiSecret }, 'sepolia');

