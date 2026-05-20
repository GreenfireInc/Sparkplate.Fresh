// BlockCypher API Implementation for Bitcoin Cash
// API Docs: https://www.blockcypher.com/dev/bitcoin/
// Free tier: 200 requests/hour, 3 requests/second
// Note: BlockCypher has excellent documentation and reliability

export interface BlockCypherUTXO {
  tx_hash: string;
  tx_output_n: number;
  value: number;
  confirmations: number;
  script: string;
}

export interface BlockCypherConfig {
  apiKey?: string;
}

export class BlockCypherAPI {
  private baseUrl: string;
  private apiKey?: string;
  private network: 'mainnet' | 'testnet';

  constructor(network: 'mainnet' | 'testnet' = 'mainnet', config?: BlockCypherConfig) {
    this.network = network;
    this.apiKey = config?.apiKey || process.env.BLOCKCYPHER_API_KEY;
    // BlockCypher uses 'bcy/test' for testnet
    const networkPath = network === 'mainnet' ? 'bch/main' : 'bch/test';
    this.baseUrl = `https://api.blockcypher.com/v1/${networkPath}`;
  }

  private getUrlWithToken(url: string): string {
    if (this.apiKey) {
      const separator = url.includes('?') ? '&' : '?';
      return `${url}${separator}token=${this.apiKey}`;
    }
    return url;
  }

  /**
   * Fetch UTXOs for a given address
   */
  async fetchUTXOs(address: string): Promise<Array<{
    txid: string;
    vout: number;
    value: number;
    scriptPubKey: string;
    confirmations: number;
  }>> {
    try {
      console.log(`🔍 [BlockCypher] Fetching UTXOs for: ${address}`);

      const url = this.getUrlWithToken(`${this.baseUrl}/addrs/${address}?unspentOnly=true&includeScript=true`);

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`BlockCypher API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      const utxos: BlockCypherUTXO[] = data.txrefs || [];

      console.log(`✅ [BlockCypher] Found ${utxos.length} UTXOs`);

      return utxos.map(utxo => ({
        txid: utxo.tx_hash,
        vout: utxo.tx_output_n,
        value: utxo.value,
        scriptPubKey: utxo.script || '',
        confirmations: utxo.confirmations
      }));
    } catch (error) {
      console.error('[BlockCypher] UTXO fetch error:', error);
      throw new Error(`Failed to fetch UTXOs from BlockCypher: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get balance for a given address
   */
  async getBalance(address: string): Promise<{
    balance: number; // in satoshis
    unconfirmedBalance: number;
    txCount: number;
  }> {
    try {
      console.log(`💰 [BlockCypher] Fetching balance for: ${address}`);

      const url = this.getUrlWithToken(`${this.baseUrl}/addrs/${address}/balance`);

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`BlockCypher API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      const result = {
        balance: data.balance || 0,
        unconfirmedBalance: data.unconfirmed_balance || 0,
        txCount: data.n_tx || 0
      };

      console.log(`✅ [BlockCypher] Balance: ${result.balance} satoshis (${result.balance / 100000000} BCH)`);

      return result;
    } catch (error) {
      console.error('[BlockCypher] Balance fetch error:', error);
      throw new Error(`Failed to fetch balance from BlockCypher: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Broadcast a transaction to the network
   */
  async broadcastTransaction(txHex: string): Promise<{
    success: boolean;
    txid: string;
    message?: string;
  }> {
    try {
      console.log(`📡 [BlockCypher] Broadcasting transaction...`);

      const url = this.getUrlWithToken(`${this.baseUrl}/txs/push`);

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          tx: txHex
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.error || `BlockCypher API error: ${response.status}`);
      }

      const data = await response.json();

      const txid = data.tx?.hash || data.hash;

      console.log(`✅ [BlockCypher] Transaction broadcast successful!`);
      console.log(`🆔 [BlockCypher] Transaction ID: ${txid}`);

      return {
        success: true,
        txid: txid,
        message: 'Transaction broadcast successfully'
      };
    } catch (error) {
      console.error('[BlockCypher] Broadcast error:', error);
      return {
        success: false,
        txid: '',
        message: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Get transaction history for an address
   */
  async getTransactionHistory(address: string, limit: number = 50): Promise<Array<{
    txid: string;
    blockHeight: number;
    timestamp: string;
    value: number;
    type: 'sent' | 'received';
    confirmations: number;
  }>> {
    try {
      console.log(`📜 [BlockCypher] Fetching transaction history for: ${address}`);

      const url = this.getUrlWithToken(`${this.baseUrl}/addrs/${address}/full?limit=${limit}`);

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`BlockCypher API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      const transactions = data.txs || [];

      console.log(`✅ [BlockCypher] Found ${transactions.length} transactions`);

      return transactions.map((tx: {
        hash: string;
        block_height: number;
        confirmed: string;
        total: number;
        fees: number;
        confirmations: number;
        inputs: Array<{ addresses: string[] }>;
        outputs: Array<{ addresses: string[]; value: number }>;
      }) => {
        // Determine if transaction is sent or received
        const isSent = tx.inputs.some(input => input.addresses?.includes(address));
        const receivedOutputs = tx.outputs.filter(output => 
          output.addresses?.includes(address)
        );
        const value = receivedOutputs.reduce((sum, output) => sum + output.value, 0);

        return {
          txid: tx.hash,
          blockHeight: tx.block_height,
          timestamp: tx.confirmed,
          value: isSent && receivedOutputs.length === 0 ? tx.total : value,
          type: isSent && receivedOutputs.length === 0 ? 'sent' as const : 'received' as const,
          confirmations: tx.confirmations
        };
      });
    } catch (error) {
      console.error('[BlockCypher] Transaction history fetch error:', error);
      throw new Error(`Failed to fetch transaction history from BlockCypher: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get network statistics
   */
  async getNetworkStats(): Promise<{
    suggestedFeePerByte: number;
    blockHeight: number;
    difficulty: number;
  }> {
    try {
      console.log(`📊 [BlockCypher] Fetching network stats...`);

      const url = this.getUrlWithToken(this.baseUrl);

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`BlockCypher API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      return {
        suggestedFeePerByte: data.medium_fee_per_kb ? Math.ceil(data.medium_fee_per_kb / 1024) : 1,
        blockHeight: data.height || 0,
        difficulty: data.difficulty || 0
      };
    } catch (error) {
      console.error('[BlockCypher] Network stats fetch error:', error);
      throw new Error(`Failed to fetch network stats from BlockCypher: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Create a new transaction (skeleton)
   * Note: BlockCypher provides transaction building services
   */
  async createTransactionSkeleton(params: {
    inputs: Array<{ addresses: string[] }>;
    outputs: Array<{ addresses: string[]; value: number }>;
  }): Promise<{
    tx: unknown;
    tosign: string[];
  }> {
    try {
      console.log(`🔧 [BlockCypher] Creating transaction skeleton...`);

      const url = this.getUrlWithToken(`${this.baseUrl}/txs/new`);

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.error || `BlockCypher API error: ${response.status}`);
      }

      const data = await response.json();

      return {
        tx: data.tx,
        tosign: data.tosign || []
      };
    } catch (error) {
      console.error('[BlockCypher] Create transaction skeleton error:', error);
      throw new Error(`Failed to create transaction skeleton: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

// Export singleton instances
export const blockcypherMainnet = new BlockCypherAPI('mainnet');
export const blockcypherTestnet = new BlockCypherAPI('testnet');

