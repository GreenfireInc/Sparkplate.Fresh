// BlockCypher API Implementation for Bitcoin
// API Docs: https://www.blockcypher.com/dev/bitcoin/
// Free tier: 3 requests/second (non-registered), 200 requests/hour
// Unified blockchain API with webhooks support

export interface BlockCypherConfig {
  apiKey?: string; // Optional for higher limits
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
  txrefs?: Array<{
    tx_hash: string;
    block_height: number;
    tx_input_n: number;
    tx_output_n: number;
    value: number;
    ref_balance: number;
    spent: boolean;
    confirmations: number;
    confirmed: string;
    double_spend: boolean;
  }>;
  tx_url?: string;
}

export interface BlockCypherTX {
  block_hash?: string;
  block_height?: number;
  block_index?: number;
  hash: string;
  addresses: string[];
  total: number;
  fees: number;
  size: number;
  vsize: number;
  preference: string;
  relayed_by: string;
  confirmed?: string;
  received: string;
  ver: number;
  double_spend: boolean;
  vin_sz: number;
  vout_sz: number;
  confirmations: number;
  confidence?: number;
  inputs: Array<{
    prev_hash: string;
    output_index: number;
    output_value: number;
    sequence: number;
    addresses: string[];
    script_type: string;
    age: number;
    witness?: string[];
  }>;
  outputs: Array<{
    value: number;
    script: string;
    addresses: string[];
    script_type: string;
    spent_by?: string;
  }>;
}

export interface BlockCypherUTXO {
  tx_hash: string;
  block_height: number;
  tx_input_n: number;
  tx_output_n: number;
  value: number;
  ref_balance: number;
  spent: boolean;
  confirmations: number;
  confirmed: string;
  double_spend: boolean;
  script: string;
}

export class BlockCypherAPI {
  private baseUrl: string;
  private apiKey?: string;
  private network: 'main' | 'test3';

  constructor(config?: BlockCypherConfig, network: 'main' | 'test3' = 'main') {
    this.apiKey = config?.apiKey;
    this.network = network;
    this.baseUrl = `https://api.blockcypher.com/v1/btc/${network}`;
  }

  /**
   * Build URL with optional API key
   */
  private buildUrl(path: string, params?: Record<string, string>): string {
    const url = new URL(`${this.baseUrl}${path}`);
    
    if (this.apiKey) {
      url.searchParams.set('token', this.apiKey);
    }
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.set(key, value);
      });
    }
    
    return url.toString();
  }

  /**
   * Get address information
   */
  async getAddressInfo(address: string, limit: number = 50): Promise<BlockCypherAddress> {
    try {
      console.log(`🔍 [BlockCypher] Fetching address info for: ${address}`);
      
      const url = this.buildUrl(`/addrs/${address}`, { limit: limit.toString() });
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`BlockCypher API error: ${response.status} ${response.statusText}`);
      }
      
      const data: BlockCypherAddress = await response.json();
      
      console.log(`✅ [BlockCypher] Address info retrieved`);
      
      return data;
    } catch (error) {
      console.error('[BlockCypher] Address info fetch error:', error);
      throw new Error(`Failed to fetch address info: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get balance for an address
   */
  async getBalance(address: string): Promise<{
    balance: number; // in satoshis
    unconfirmed: number;
    total: number;
    balanceBTC: number; // in BTC
  }> {
    try {
      console.log(`🔍 [BlockCypher] Fetching balance for: ${address}`);
      
      const url = this.buildUrl(`/addrs/${address}/balance`);
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`BlockCypher API error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      const balance = data.balance || 0;
      const unconfirmed = data.unconfirmed_balance || 0;
      const total = balance + unconfirmed;
      const balanceBTC = total / 100000000;
      
      console.log(`✅ [BlockCypher] Balance: ${total} satoshis (${balanceBTC} BTC)`);
      
      return {
        balance,
        unconfirmed,
        total,
        balanceBTC
      };
    } catch (error) {
      console.error('[BlockCypher] Balance fetch error:', error);
      throw new Error(`Failed to fetch balance: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get transaction by hash
   */
  async getTransaction(txHash: string): Promise<BlockCypherTX> {
    try {
      console.log(`🔍 [BlockCypher] Fetching transaction: ${txHash}`);
      
      const url = this.buildUrl(`/txs/${txHash}`);
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`BlockCypher API error: ${response.status} ${response.statusText}`);
      }
      
      const transaction: BlockCypherTX = await response.json();
      
      console.log(`✅ [BlockCypher] Transaction retrieved`);
      
      return transaction;
    } catch (error) {
      console.error('[BlockCypher] Transaction fetch error:', error);
      throw new Error(`Failed to fetch transaction: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Broadcast a transaction
   */
  async broadcastTransaction(txHex: string): Promise<{
    tx: {
      hash: string;
    };
  }> {
    try {
      console.log('📡 [BlockCypher] Broadcasting transaction...');
      
      const url = this.buildUrl('/txs/push');
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ tx: txHex })
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`BlockCypher broadcast error: ${response.status} - ${errorText}`);
      }
      
      const result = await response.json();
      
      console.log(`✅ [BlockCypher] Transaction broadcast successful: ${result.tx.hash}`);
      
      return result;
    } catch (error) {
      console.error('[BlockCypher] Broadcast error:', error);
      throw new Error(`Failed to broadcast transaction: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get blockchain info
   */
  async getBlockchainInfo(): Promise<{
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
      console.log('🔍 [BlockCypher] Fetching blockchain info...');
      
      const url = this.buildUrl('');
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`BlockCypher API error: ${response.status} ${response.statusText}`);
      }
      
      const info = await response.json();
      
      console.log(`✅ [BlockCypher] Blockchain info retrieved, height: ${info.height}`);
      
      return info;
    } catch (error) {
      console.error('[BlockCypher] Blockchain info fetch error:', error);
      throw new Error(`Failed to fetch blockchain info: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Generate address (for testing/development)
   */
  async generateAddress(): Promise<{
    private: string;
    public: string;
    address: string;
    wif: string;
  }> {
    try {
      console.log('🔍 [BlockCypher] Generating new address...');
      
      const url = this.buildUrl('/addrs');
      const response = await fetch(url, {
        method: 'POST'
      });
      
      if (!response.ok) {
        throw new Error(`BlockCypher API error: ${response.status} ${response.statusText}`);
      }
      
      const address = await response.json();
      
      console.log(`✅ [BlockCypher] Address generated: ${address.address}`);
      
      return address;
    } catch (error) {
      console.error('[BlockCypher] Address generation error:', error);
      throw new Error(`Failed to generate address: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Decode raw transaction
   */
  async decodeTransaction(txHex: string): Promise<BlockCypherTX> {
    try {
      console.log('🔍 [BlockCypher] Decoding transaction...');
      
      const url = this.buildUrl('/txs/decode');
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ tx: txHex })
      });
      
      if (!response.ok) {
        throw new Error(`BlockCypher API error: ${response.status} ${response.statusText}`);
      }
      
      const decoded: BlockCypherTX = await response.json();
      
      console.log(`✅ [BlockCypher] Transaction decoded`);
      
      return decoded;
    } catch (error) {
      console.error('[BlockCypher] Transaction decode error:', error);
      throw new Error(`Failed to decode transaction: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

// Singleton instances for convenience
export const blockcypherMainnet = new BlockCypherAPI(undefined, 'main');
export const blockcypherTestnet = new BlockCypherAPI(undefined, 'test3');

