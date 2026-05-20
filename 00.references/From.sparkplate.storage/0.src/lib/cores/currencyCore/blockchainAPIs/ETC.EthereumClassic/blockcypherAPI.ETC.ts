// BlockCypher API Implementation for Ethereum Classic
// API Docs: https://www.blockcypher.com/dev/
// Website: https://live.blockcypher.com/etc/
// Free tier: 3 requests/second without API key
// Comprehensive blockchain API with webhook support

export interface BlockCypherConfig {
  apiKey?: string; // Optional, recommended for higher limits
}

export interface BlockCypherAddress {
  address: string;
  total_received: number;
  total_sent: number;
  balance: number;
  unconfirmed_balance: number;
  final_balance: number;
  n_tx: number;
  unconfirmed_n_tx: number;
  final_n_tx: number;
}

export interface BlockCypherTX {
  block_hash: string;
  block_height: number;
  block_index: number;
  hash: string;
  addresses: string[];
  total: number;
  fees: number;
  size: number;
  gas_limit: number;
  gas_used: number;
  gas_price: number;
  confirmed: string;
  received: string;
  ver: number;
  double_spend: boolean;
  vin_sz: number;
  vout_sz: number;
  confirmations: number;
  confidence: number;
  inputs: unknown[];
  outputs: unknown[];
}

export class BlockCypherAPI {
  private baseUrl = 'https://api.blockcypher.com/v1/etc/main';
  private apiKey?: string;

  constructor(config?: BlockCypherConfig) {
    this.apiKey = config?.apiKey;
  }

  /**
   * Build URL with optional API key
   */
  private buildUrl(endpoint: string): string {
    const url = new URL(`${this.baseUrl}${endpoint}`);
    if (this.apiKey) {
      url.searchParams.set('token', this.apiKey);
    }
    return url.toString();
  }

  /**
   * Get address information
   */
  async getAddressInfo(address: string): Promise<BlockCypherAddress> {
    try {
      console.log(`🔍 [BlockCypher-ETC] Fetching address info for: ${address}`);
      
      const url = this.buildUrl(`/addrs/${address}`);
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`BlockCypher API error: ${response.status} ${response.statusText}`);
      }
      
      const data: BlockCypherAddress = await response.json();
      
      console.log(`✅ [BlockCypher-ETC] Address info retrieved`);
      
      return data;
    } catch (error) {
      console.error('[BlockCypher-ETC] Address info fetch error:', error);
      throw new Error(`Failed to fetch address info: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get balance for an address
   */
  async getBalance(address: string): Promise<{
    balance: bigint;
    balanceETC: number;
    unconfirmed: bigint;
  }> {
    try {
      console.log(`🔍 [BlockCypher-ETC] Fetching balance for: ${address}`);
      
      const info = await this.getAddressInfo(address);
      const balance = BigInt(Math.round(info.final_balance * 1e18));
      const unconfirmed = BigInt(Math.round(info.unconfirmed_balance * 1e18));
      const balanceETC = info.final_balance;
      
      console.log(`✅ [BlockCypher-ETC] Balance: ${balance} wei (${balanceETC} ETC)`);
      
      return {
        balance,
        balanceETC,
        unconfirmed
      };
    } catch (error) {
      console.error('[BlockCypher-ETC] Balance fetch error:', error);
      throw new Error(`Failed to fetch balance: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get transaction details
   */
  async getTransaction(txHash: string): Promise<BlockCypherTX> {
    try {
      console.log(`🔍 [BlockCypher-ETC] Fetching transaction: ${txHash}`);
      
      const url = this.buildUrl(`/txs/${txHash}`);
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`BlockCypher API error: ${response.status} ${response.statusText}`);
      }
      
      const data: BlockCypherTX = await response.json();
      
      console.log(`✅ [BlockCypher-ETC] Transaction retrieved`);
      
      return data;
    } catch (error) {
      console.error('[BlockCypher-ETC] Transaction fetch error:', error);
      throw new Error(`Failed to fetch transaction: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Broadcast transaction
   */
  async broadcastTransaction(signedTx: string): Promise<{ txHash: string }> {
    try {
      console.log('📡 [BlockCypher-ETC] Broadcasting transaction...');
      
      const url = this.buildUrl('/txs/push');
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ tx: signedTx })
      });
      
      if (!response.ok) {
        throw new Error(`BlockCypher API error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      console.log(`✅ [BlockCypher-ETC] Transaction broadcast: ${data.tx.hash}`);
      
      return { txHash: data.tx.hash };
    } catch (error) {
      console.error('[BlockCypher-ETC] Broadcast error:', error);
      throw new Error(`Failed to broadcast transaction: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get chain info
   */
  async getChainInfo(): Promise<{
    name: string;
    height: number;
    hash: string;
    time: string;
    latest_url: string;
    previous_hash: string;
    previous_url: string;
    peer_count: number;
    unconfirmed_count: number;
    high_fee_per_kb: number;
    medium_fee_per_kb: number;
    low_fee_per_kb: number;
  }> {
    try {
      console.log('🔍 [BlockCypher-ETC] Fetching chain info...');
      
      const url = this.buildUrl('');
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`BlockCypher API error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      console.log(`✅ [BlockCypher-ETC] Chain info retrieved: height ${data.height}`);
      
      return data;
    } catch (error) {
      console.error('[BlockCypher-ETC] Chain info fetch error:', error);
      throw new Error(`Failed to fetch chain info: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

// Singleton instances
export const blockcypherETC = new BlockCypherAPI();
export const createBlockCypherETC = (apiKey: string) => new BlockCypherAPI({ apiKey });

