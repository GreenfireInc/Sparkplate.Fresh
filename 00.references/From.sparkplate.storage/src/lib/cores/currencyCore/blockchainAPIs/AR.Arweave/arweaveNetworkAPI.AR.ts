// Arweave Network API Implementation
// API Docs: https://docs.arweave.org/developers/server/http-api
// Free tier: Public gateway access with rate limits
// Note: Arweave is transaction-based permanent storage network

export interface ArweaveTransaction {
  id: string;
  last_tx: string;
  owner: string;
  target: string;
  quantity: string;
  data: string;
  data_size: string;
  data_root: string;
  reward: string;
  signature: string;
  tags: Array<{
    name: string;
    value: string;
  }>;
  block?: {
    height: number;
    indep_hash: string;
    timestamp: number;
  };
}

export interface ArweaveWalletInfo {
  address: string;
  balance: string; // in Winston (smallest AR unit)
  balanceAR: number; // in AR tokens
  lastTx: string;
}

export interface ArweaveTransactionStatus {
  block_indep_hash?: string;
  block_height?: number;
  number_of_confirmations?: number;
  confirmed?: {
    block_indep_hash: string;
    block_height: number;
    number_of_confirmations: number;
  };
}

export interface ArweaveBlock {
  indep_hash: string;
  height: number;
  timestamp: number;
  previous_block: string;
  txs: string[];
  tx_root: string;
  wallet_list: string;
  reward_addr: string;
  tags: Array<{
    name: string;
    value: string;
  }>;
  reward_pool: string;
  weave_size: string;
  block_size: string;
  cumulative_diff: string;
  hash_list_merkle: string;
  poa: {
    option: string;
    tx_path: string;
    data_path: string;
    chunk: string;
  };
}

export type ArweaveNetwork = 'mainnet' | 'testnet';

export class ArweaveNetworkAPI {
  private baseUrl: string;
  private network: ArweaveNetwork;

  // Official Arweave gateway endpoints
  private static readonly MAINNET_GATEWAYS = [
    'https://arweave.net',
    'https://arweave.dev',
    'https://ar-io.net',
    'https://g8way.io'
  ];

  private static readonly TESTNET_GATEWAYS = [
    'https://testnet.arweave.net'
  ];

  constructor(network: ArweaveNetwork = 'mainnet', customGateway?: string) {
    this.network = network;
    
    if (customGateway) {
      this.baseUrl = customGateway;
    } else {
      this.baseUrl = network === 'mainnet'
        ? ArweaveNetworkAPI.MAINNET_GATEWAYS[0]
        : ArweaveNetworkAPI.TESTNET_GATEWAYS[0];
    }
  }

  /**
   * Get list of available public gateways
   */
  static getPublicGateways(network: ArweaveNetwork = 'mainnet'): string[] {
    return network === 'mainnet'
      ? [...ArweaveNetworkAPI.MAINNET_GATEWAYS]
      : [...ArweaveNetworkAPI.TESTNET_GATEWAYS];
  }

  /**
   * Switch to a different gateway
   */
  switchGateway(index: number): void {
    const gateways = this.network === 'mainnet'
      ? ArweaveNetworkAPI.MAINNET_GATEWAYS
      : ArweaveNetworkAPI.TESTNET_GATEWAYS;
    
    if (index >= 0 && index < gateways.length) {
      this.baseUrl = gateways[index];
      console.log(`🔄 [Arweave Network] Switched to gateway: ${this.baseUrl}`);
    }
  }

  /**
   * Make HTTP request to Arweave gateway
   */
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    try {
      const url = `${this.baseUrl}${endpoint}`;
      console.log(`🌐 [Arweave Network] Request: ${url}`);
      
      const response = await fetch(url, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          ...options.headers
        },
        ...options
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return data as T;
    } catch (error) {
      console.error(`[Arweave Network] Request failed for ${endpoint}:`, error);
      throw error;
    }
  }

  /**
   * Get wallet balance and info
   */
  async getWalletInfo(address: string): Promise<ArweaveWalletInfo> {
    try {
      console.log(`🔍 [Arweave Network] Fetching wallet info for: ${address}`);
      
      // Get balance
      const balanceResponse = await fetch(`${this.baseUrl}/wallet/${address}/balance`);
      const balanceWinston = await balanceResponse.text();
      
      // Get last transaction
      const lastTxResponse = await fetch(`${this.baseUrl}/wallet/${address}/last_tx`);
      const lastTx = await lastTxResponse.text();
      
      const balance = balanceWinston;
      const balanceAR = parseFloat(balance) / 1000000000000; // Convert Winston to AR
      
      console.log(`✅ [Arweave Network] Balance: ${balance} Winston (${balanceAR} AR)`);
      
      return {
        address,
        balance,
        balanceAR,
        lastTx
      };
    } catch (error) {
      console.error('[Arweave Network] Wallet info fetch error:', error);
      throw new Error(`Failed to fetch wallet info: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get transaction by ID
   */
  async getTransaction(txId: string): Promise<ArweaveTransaction> {
    try {
      console.log(`🔍 [Arweave Network] Fetching transaction: ${txId}`);
      
      const transaction = await this.request<ArweaveTransaction>(`/tx/${txId}`);
      
      console.log(`✅ [Arweave Network] Transaction retrieved`);
      
      return transaction;
    } catch (error) {
      console.error('[Arweave Network] Transaction fetch error:', error);
      throw new Error(`Failed to fetch transaction: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get transaction status
   */
  async getTransactionStatus(txId: string): Promise<ArweaveTransactionStatus> {
    try {
      console.log(`🔍 [Arweave Network] Fetching transaction status: ${txId}`);
      
      const status = await this.request<ArweaveTransactionStatus>(`/tx/${txId}/status`);
      
      console.log(`✅ [Arweave Network] Transaction status retrieved`);
      
      return status;
    } catch (error) {
      console.error('[Arweave Network] Transaction status fetch error:', error);
      throw new Error(`Failed to fetch transaction status: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get transaction data
   */
  async getTransactionData(txId: string): Promise<string | Uint8Array> {
    try {
      console.log(`🔍 [Arweave Network] Fetching transaction data: ${txId}`);
      
      const response = await fetch(`${this.baseUrl}/${txId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      // Check content type to determine if it's text or binary
      const contentType = response.headers.get('content-type') || '';
      
      if (contentType.includes('text/') || contentType.includes('application/json')) {
        const data = await response.text();
        console.log(`✅ [Arweave Network] Text data retrieved (${data.length} chars)`);
        return data;
      } else {
        const data = await response.arrayBuffer();
        console.log(`✅ [Arweave Network] Binary data retrieved (${data.byteLength} bytes)`);
        return new Uint8Array(data);
      }
    } catch (error) {
      console.error('[Arweave Network] Transaction data fetch error:', error);
      throw new Error(`Failed to fetch transaction data: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get block by height or hash
   */
  async getBlock(identifier: string | number): Promise<ArweaveBlock> {
    try {
      const endpoint = typeof identifier === 'number' 
        ? `/block/height/${identifier}`
        : `/block/hash/${identifier}`;
      
      console.log(`🔍 [Arweave Network] Fetching block: ${identifier}`);
      
      const block = await this.request<ArweaveBlock>(endpoint);
      
      console.log(`✅ [Arweave Network] Block retrieved: height ${block.height}`);
      
      return block;
    } catch (error) {
      console.error('[Arweave Network] Block fetch error:', error);
      throw new Error(`Failed to fetch block: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get current network info
   */
  async getNetworkInfo(): Promise<{
    network: string;
    version: number;
    release: number;
    height: number;
    current: string;
    blocks: number;
    peers: number;
    queue_length: number;
    node_state_latency: number;
  }> {
    try {
      console.log('🔍 [Arweave Network] Fetching network info...');
      
      const info = await this.request<{
        network: string;
        version: number;
        release: number;
        height: number;
        current: string;
        blocks: number;
        peers: number;
        queue_length: number;
        node_state_latency: number;
      }>('/info');
      
      console.log(`✅ [Arweave Network] Network info retrieved: height ${info.height}`);
      
      return info;
    } catch (error) {
      console.error('[Arweave Network] Network info fetch error:', error);
      throw new Error(`Failed to fetch network info: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Search transactions by tags
   */
  async searchTransactions(tags: Array<{ name: string; value: string }>, limit: number = 10): Promise<string[]> {
    try {
      console.log(`🔍 [Arweave Network] Searching transactions by tags...`);
      
      // Build GraphQL query for ArQL
      const query = {
        op: 'and',
        expr1: tags.map(tag => ({
          op: 'equals',
          expr1: tag.name,
          expr2: tag.value
        }))
      };
      
      const response = await fetch(`${this.baseUrl}/arql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(query)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const txIds = await response.json() as string[];
      
      console.log(`✅ [Arweave Network] Found ${txIds.length} transactions`);
      
      return txIds.slice(0, limit);
    } catch (error) {
      console.error('[Arweave Network] Transaction search error:', error);
      throw new Error(`Failed to search transactions: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

// Singleton instances for convenience
export const arweaveNetworkMainnet = new ArweaveNetworkAPI('mainnet');
export const arweaveNetworkTestnet = new ArweaveNetworkAPI('testnet');

// Helper to create instance with custom gateway
export const createArweaveNetworkAPI = (gateway: string, network: ArweaveNetwork = 'mainnet') => {
  return new ArweaveNetworkAPI(network, gateway);
};
