// AR.IO Gateway API Implementation for Arweave
// API Docs: https://docs.ar.io/gateways/
// Free tier: Gateway access with rate limits
// Premium: Stake AR tokens for enhanced gateway services

export interface ArIOGatewayInfo {
  address: string;
  url: string;
  status: 'online' | 'offline' | 'maintenance';
  performance: {
    uptime: number;
    latency: number;
    throughput: number;
  };
  stake: {
    amount: string;
    vault: string;
  };
  settings: {
    label: string;
    note: string;
    properties: string;
  };
}

export interface ArIOTransaction {
  id: string;
  owner: string;
  target: string;
  quantity: string;
  reward: string;
  last_tx: string;
  tags: Array<{
    name: string;
    value: string;
  }>;
  data_size: string;
  data_root: string;
  signature: string;
  format?: number;
}

export interface ArIOWalletBalance {
  address: string;
  balance: string; // Winston
  balanceAR: number; // AR tokens
}

export interface ArIOConfig {
  gatewayUrl?: string;
  network?: 'mainnet' | 'testnet';
  timeout?: number;
}

export class ArIOGatewayAPI {
  private gatewayUrl: string;
  private network: 'mainnet' | 'testnet';
  private timeout: number;

  // Popular AR.IO gateways
  private static readonly MAINNET_GATEWAYS = [
    'https://ar-io.net',
    'https://g8way.io',
    'https://arweave.net',
    'https://arweave.dev'
  ];

  private static readonly TESTNET_GATEWAYS = [
    'https://testnet.ar-io.net'
  ];

  constructor(config: ArIOConfig = {}) {
    this.network = config.network || 'mainnet';
    this.timeout = config.timeout || 30000;
    
    this.gatewayUrl = config.gatewayUrl || (
      this.network === 'mainnet'
        ? ArIOGatewayAPI.MAINNET_GATEWAYS[0]
        : ArIOGatewayAPI.TESTNET_GATEWAYS[0]
    );
  }

  /**
   * Get list of available AR.IO gateways
   */
  static getGateways(network: 'mainnet' | 'testnet' = 'mainnet'): string[] {
    return network === 'mainnet'
      ? [...ArIOGatewayAPI.MAINNET_GATEWAYS]
      : [...ArIOGatewayAPI.TESTNET_GATEWAYS];
  }

  /**
   * Make HTTP request to AR.IO gateway
   */
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    try {
      const url = `${this.gatewayUrl}${endpoint}`;
      console.log(`🌐 [AR.IO Gateway] Request: ${url}`);
      
      const response = await fetch(url, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        timeout: this.timeout,
        ...options
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return data as T;
    } catch (error) {
      console.error(`[AR.IO Gateway] Request failed for ${endpoint}:`, error);
      throw error;
    }
  }

  /**
   * Get wallet balance through AR.IO gateway
   */
  async getWalletBalance(address: string): Promise<ArIOWalletBalance> {
    try {
      console.log(`🔍 [AR.IO Gateway] Fetching balance for: ${address}`);
      
      const response = await fetch(`${this.gatewayUrl}/wallet/${address}/balance`);
      const balanceWinston = await response.text();
      
      if (!response.ok) {
        throw new Error(`Failed to fetch balance: ${response.statusText}`);
      }
      
      const balance = balanceWinston;
      const balanceAR = parseFloat(balance) / 1000000000000; // Convert Winston to AR
      
      console.log(`✅ [AR.IO Gateway] Balance: ${balance} Winston (${balanceAR} AR)`);
      
      return {
        address,
        balance,
        balanceAR
      };
    } catch (error) {
      console.error('[AR.IO Gateway] Balance fetch error:', error);
      throw new Error(`Failed to fetch wallet balance: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get transaction by ID
   */
  async getTransaction(txId: string): Promise<ArIOTransaction> {
    try {
      console.log(`🔍 [AR.IO Gateway] Fetching transaction: ${txId}`);
      
      const transaction = await this.request<ArIOTransaction>(`/tx/${txId}`);
      
      console.log(`✅ [AR.IO Gateway] Transaction retrieved`);
      
      return transaction;
    } catch (error) {
      console.error('[AR.IO Gateway] Transaction fetch error:', error);
      throw new Error(`Failed to fetch transaction: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get transaction status
   */
  async getTransactionStatus(txId: string): Promise<{
    confirmed: boolean;
    block_height?: number;
    block_indep_hash?: string;
    number_of_confirmations?: number;
  }> {
    try {
      console.log(`🔍 [AR.IO Gateway] Fetching transaction status: ${txId}`);
      
      const response = await fetch(`${this.gatewayUrl}/tx/${txId}/status`);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const status = await response.json();
      
      const result = {
        confirmed: status.confirmed !== null,
        block_height: status.confirmed?.block_height,
        block_indep_hash: status.confirmed?.block_indep_hash,
        number_of_confirmations: status.confirmed?.number_of_confirmations
      };
      
      console.log(`✅ [AR.IO Gateway] Transaction status: ${result.confirmed ? 'confirmed' : 'pending'}`);
      
      return result;
    } catch (error) {
      console.error('[AR.IO Gateway] Transaction status fetch error:', error);
      throw new Error(`Failed to fetch transaction status: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get data from transaction ID
   */
  async getData(txId: string): Promise<{
    data: string | Uint8Array;
    contentType?: string;
    size: number;
  }> {
    try {
      console.log(`🔍 [AR.IO Gateway] Fetching data for transaction: ${txId}`);
      
      const response = await fetch(`${this.gatewayUrl}/${txId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const contentType = response.headers.get('content-type') || undefined;
      const size = parseInt(response.headers.get('content-length') || '0');
      
      // Determine if data is text or binary
      let data: string | Uint8Array;
      if (contentType?.includes('text/') || contentType?.includes('application/json')) {
        data = await response.text();
      } else {
        const arrayBuffer = await response.arrayBuffer();
        data = new Uint8Array(arrayBuffer);
      }
      
      console.log(`✅ [AR.IO Gateway] Data retrieved (${size} bytes)`);
      
      return {
        data,
        contentType,
        size
      };
    } catch (error) {
      console.error('[AR.IO Gateway] Data fetch error:', error);
      throw new Error(`Failed to fetch data: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get gateway information
   */
  async getGatewayInfo(): Promise<{
    host: string;
    port: number;
    protocol: string;
    network: string;
    version: string;
    release: number;
    height: number;
    current: string;
    blocks: number;
    peers: number;
    queue_length: number;
    node_state_latency: number;
  }> {
    try {
      console.log('🔍 [AR.IO Gateway] Fetching gateway info...');
      
      const info = await this.request<{
        host: string;
        port: number;
        protocol: string;
        network: string;
        version: string;
        release: number;
        height: number;
        current: string;
        blocks: number;
        peers: number;
        queue_length: number;
        node_state_latency: number;
      }>('/info');
      
      console.log(`✅ [AR.IO Gateway] Gateway info retrieved - Height: ${info.height}`);
      
      return info;
    } catch (error) {
      console.error('[AR.IO Gateway] Gateway info fetch error:', error);
      throw new Error(`Failed to fetch gateway info: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get network price information
   */
  async getPriceInfo(): Promise<{
    winston: string;
    ar: string;
    usd?: number;
  }> {
    try {
      console.log('🔍 [AR.IO Gateway] Fetching price info...');
      
      const response = await fetch(`${this.gatewayUrl}/price/0`); // Price for 0 bytes to get base price
      const winston = await response.text();
      
      if (!response.ok) {
        throw new Error(`Failed to fetch price: ${response.statusText}`);
      }
      
      const ar = (parseFloat(winston) / 1000000000000).toString();
      
      console.log(`✅ [AR.IO Gateway] Price info retrieved: ${winston} Winston (${ar} AR)`);
      
      return {
        winston,
        ar
      };
    } catch (error) {
      console.error('[AR.IO Gateway] Price info fetch error:', error);
      throw new Error(`Failed to fetch price info: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get storage price for data size
   */
  async getStoragePrice(dataSize: number): Promise<{
    winston: string;
    ar: string;
    dataSize: number;
  }> {
    try {
      console.log(`🔍 [AR.IO Gateway] Fetching storage price for ${dataSize} bytes...`);
      
      const response = await fetch(`${this.gatewayUrl}/price/${dataSize}`);
      const winston = await response.text();
      
      if (!response.ok) {
        throw new Error(`Failed to fetch storage price: ${response.statusText}`);
      }
      
      const ar = (parseFloat(winston) / 1000000000000).toString();
      
      console.log(`✅ [AR.IO Gateway] Storage price: ${winston} Winston (${ar} AR) for ${dataSize} bytes`);
      
      return {
        winston,
        ar,
        dataSize
      };
    } catch (error) {
      console.error('[AR.IO Gateway] Storage price fetch error:', error);
      throw new Error(`Failed to fetch storage price: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

// Singleton instances for convenience
export const arIOGatewayMainnet = new ArIOGatewayAPI({ network: 'mainnet' });
export const arIOGatewayTestnet = new ArIOGatewayAPI({ network: 'testnet' });

// Helper to create instance with custom gateway
export const createArIOGatewayAPI = (gatewayUrl: string, network: 'mainnet' | 'testnet' = 'mainnet') => {
  return new ArIOGatewayAPI({ gatewayUrl, network });
};
