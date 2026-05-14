// BlockCypher API Implementation for Litecoin
// API Docs: https://www.blockcypher.com/dev/litecoin/
// Website: https://live.blockcypher.com/ltc/
// Free tier: 3 requests/second, up to 200 requests/hour without API key
// Fast blockchain API with fee estimates

export interface BlockCypherConfig {
  apiKey?: string; // Optional, for higher limits
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
  tx_url: string;
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
  preference: string;
  relayed_by: string;
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
  private baseUrl = 'https://api.blockcypher.com/v1/ltc/main';
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
      console.log(`🔍 [BlockCypher-LTC] Fetching address info for: ${address}`);
      
      const url = this.buildUrl(`/addrs/${address}`);
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`BlockCypher API error: ${response.status} ${response.statusText}`);
      }
      
      const data: BlockCypherAddress = await response.json();
      
      console.log(`✅ [BlockCypher-LTC] Address info retrieved`);
      
      return data;
    } catch (error) {
      console.error('[BlockCypher-LTC] Address info fetch error:', error);
      throw new Error(`Failed to fetch address info: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get balance for an address
   */
  async getBalance(address: string): Promise<{
    balance: bigint;
    balanceLTC: number;
    unconfirmed: bigint;
  }> {
    try {
      console.log(`🔍 [BlockCypher-LTC] Fetching balance for: ${address}`);
      
      const info = await this.getAddressInfo(address);
      const balance = BigInt(info.final_balance);
      const unconfirmed = BigInt(info.unconfirmed_balance);
      const balanceLTC = info.final_balance / 1e8;
      
      console.log(`✅ [BlockCypher-LTC] Balance: ${balance} satoshis (${balanceLTC} LTC)`);
      
      return {
        balance,
        balanceLTC,
        unconfirmed
      };
    } catch (error) {
      console.error('[BlockCypher-LTC] Balance fetch error:', error);
      throw new Error(`Failed to fetch balance: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Fetch UTXOs for an address
   */
  async fetchUTXOs(address: string): Promise<Array<{
    txid: string;
    vout: number;
    value: bigint;
    height: number;
    confirmations: number;
  }>> {
    try {
      console.log(`🔍 [BlockCypher-LTC] Fetching UTXOs for: ${address}`);
      
      const url = this.buildUrl(`/addrs/${address}?unspentOnly=true`);
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`BlockCypher API error: ${response.status} ${response.statusText}`);
      }
      
      const data: BlockCypherAddress = await response.json();
      
      const utxos = (data.txrefs || [])
        .filter(ref => !ref.spent)
        .map(ref => ({
          txid: ref.tx_hash,
          vout: ref.tx_output_n,
          value: BigInt(ref.value),
          height: ref.block_height,
          confirmations: ref.confirmations
        }));
      
      console.log(`✅ [BlockCypher-LTC] Found ${utxos.length} UTXOs`);
      
      return utxos;
    } catch (error) {
      console.error('[BlockCypher-LTC] UTXO fetch error:', error);
      throw new Error(`Failed to fetch UTXOs: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get transaction details
   */
  async getTransaction(txHash: string): Promise<BlockCypherTX> {
    try {
      console.log(`🔍 [BlockCypher-LTC] Fetching transaction: ${txHash}`);
      
      const url = this.buildUrl(`/txs/${txHash}`);
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`BlockCypher API error: ${response.status} ${response.statusText}`);
      }
      
      const data: BlockCypherTX = await response.json();
      
      console.log(`✅ [BlockCypher-LTC] Transaction retrieved`);
      
      return data;
    } catch (error) {
      console.error('[BlockCypher-LTC] Transaction fetch error:', error);
      throw new Error(`Failed to fetch transaction: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Broadcast transaction
   */
  async broadcastTransaction(signedTx: string): Promise<{ txHash: string }> {
    try {
      console.log('📡 [BlockCypher-LTC] Broadcasting transaction...');
      
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
      
      console.log(`✅ [BlockCypher-LTC] Transaction broadcast: ${data.tx.hash}`);
      
      return { txHash: data.tx.hash };
    } catch (error) {
      console.error('[BlockCypher-LTC] Broadcast error:', error);
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
      console.log('🔍 [BlockCypher-LTC] Fetching chain info...');
      
      const url = this.buildUrl('');
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`BlockCypher API error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      console.log(`✅ [BlockCypher-LTC] Chain info retrieved: height ${data.height}`);
      
      return data;
    } catch (error) {
      console.error('[BlockCypher-LTC] Chain info fetch error:', error);
      throw new Error(`Failed to fetch chain info: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get fee estimates
   */
  async getFeeEstimates(): Promise<{
    high_fee_per_kb: number;
    medium_fee_per_kb: number;
    low_fee_per_kb: number;
  }> {
    try {
      console.log('🔍 [BlockCypher-LTC] Fetching fee estimates...');
      
      const chainInfo = await this.getChainInfo();
      
      console.log(`✅ [BlockCypher-LTC] Fee estimates retrieved`);
      
      return {
        high_fee_per_kb: chainInfo.high_fee_per_kb,
        medium_fee_per_kb: chainInfo.medium_fee_per_kb,
        low_fee_per_kb: chainInfo.low_fee_per_kb
      };
    } catch (error) {
      console.error('[BlockCypher-LTC] Fee estimates fetch error:', error);
      throw new Error(`Failed to fetch fee estimates: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

// Singleton instances
export const blockcypherLTC = new BlockCypherAPI();
export const createBlockCypherLTC = (apiKey: string) => new BlockCypherAPI({ apiKey });

