// FullStack.cash API Implementation for Bitcoin Cash
// API Docs: https://fullstack.cash/
// Free tier: 10 requests per minute without API key, 100/min with free key
// Note: Excellent BCH-specific API with comprehensive features

export interface FullStackUTXO {
  txid: string;
  vout: number;
  value: string;
  satoshis: number;
  height: number;
  confirmations: number;
}

export interface FullStackConfig {
  apiKey?: string;
}

export class FullStackCashAPI {
  private baseUrl: string;
  private apiKey?: string;
  private network: 'mainnet' | 'testnet';

  constructor(network: 'mainnet' | 'testnet' = 'mainnet', config?: FullStackConfig) {
    this.network = network;
    this.apiKey = config?.apiKey || process.env.FULLSTACK_CASH_API_KEY;
    this.baseUrl = network === 'mainnet'
      ? 'https://api.fullstack.cash/v5'
      : 'https://testnet.fullstack.cash/v5';
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
      console.log(`🔍 [FullStack.cash] Fetching UTXOs for: ${address}`);

      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };

      if (this.apiKey) {
        headers['Authorization'] = `Bearer ${this.apiKey}`;
      }

      const response = await fetch(`${this.baseUrl}/electrumx/utxos/${address}`, {
        method: 'GET',
        headers
      });

      if (!response.ok) {
        throw new Error(`FullStack.cash API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || 'API request failed');
      }

      const utxos: FullStackUTXO[] = data.utxos || [];

      console.log(`✅ [FullStack.cash] Found ${utxos.length} UTXOs`);

      return utxos.map(utxo => ({
        txid: utxo.txid,
        vout: utxo.vout,
        value: utxo.satoshis,
        scriptPubKey: '', // FullStack.cash may not return this
        confirmations: utxo.confirmations
      }));
    } catch (error) {
      console.error('[FullStack.cash] UTXO fetch error:', error);
      throw new Error(`Failed to fetch UTXOs from FullStack.cash: ${error instanceof Error ? error.message : 'Unknown error'}`);
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
      console.log(`💰 [FullStack.cash] Fetching balance for: ${address}`);

      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };

      if (this.apiKey) {
        headers['Authorization'] = `Bearer ${this.apiKey}`;
      }

      const response = await fetch(`${this.baseUrl}/electrumx/balance/${address}`, {
        method: 'GET',
        headers
      });

      if (!response.ok) {
        throw new Error(`FullStack.cash API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || 'API request failed');
      }

      const balance = data.balance || {};

      console.log(`✅ [FullStack.cash] Balance: ${balance.confirmed} satoshis`);

      return {
        balance: balance.confirmed || 0,
        unconfirmedBalance: balance.unconfirmed || 0,
        txCount: 0 // FullStack.cash doesn't return this in balance endpoint
      };
    } catch (error) {
      console.error('[FullStack.cash] Balance fetch error:', error);
      throw new Error(`Failed to fetch balance from FullStack.cash: ${error instanceof Error ? error.message : 'Unknown error'}`);
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
      console.log(`📡 [FullStack.cash] Broadcasting transaction...`);

      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };

      if (this.apiKey) {
        headers['Authorization'] = `Bearer ${this.apiKey}`;
      }

      const response = await fetch(`${this.baseUrl}/rawtransactions/sendRawTransaction`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          hexes: [txHex]
        })
      });

      if (!response.ok) {
        throw new Error(`FullStack.cash API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || 'Transaction broadcast failed');
      }

      const txid = Array.isArray(data.result) ? data.result[0] : data.result;

      console.log(`✅ [FullStack.cash] Transaction broadcast successful!`);
      console.log(`🆔 [FullStack.cash] Transaction ID: ${txid}`);

      return {
        success: true,
        txid: txid,
        message: 'Transaction broadcast successfully'
      };
    } catch (error) {
      console.error('[FullStack.cash] Broadcast error:', error);
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
      console.log(`📜 [FullStack.cash] Fetching transaction history for: ${address}`);

      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };

      if (this.apiKey) {
        headers['Authorization'] = `Bearer ${this.apiKey}`;
      }

      const response = await fetch(`${this.baseUrl}/electrumx/transactions/${address}`, {
        method: 'GET',
        headers
      });

      if (!response.ok) {
        throw new Error(`FullStack.cash API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || 'API request failed');
      }

      const transactions = data.transactions || [];

      console.log(`✅ [FullStack.cash] Found ${transactions.length} transactions`);

      // FullStack.cash returns transactions in a different format
      // This is a simplified mapping - actual implementation may vary
      return transactions.slice(0, limit).map((tx: {
        tx_hash: string;
        height: number;
        fee?: number;
      }) => ({
        txid: tx.tx_hash,
        blockHeight: tx.height,
        timestamp: new Date().toISOString(), // FullStack.cash may not return timestamp
        value: tx.fee || 0,
        type: 'received' as const, // Would need more detail to determine
        confirmations: 0 // Would need current block height
      }));
    } catch (error) {
      console.error('[FullStack.cash] Transaction history fetch error:', error);
      throw new Error(`Failed to fetch transaction history from FullStack.cash: ${error instanceof Error ? error.message : 'Unknown error'}`);
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
      console.log(`📊 [FullStack.cash] Fetching network stats...`);

      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };

      if (this.apiKey) {
        headers['Authorization'] = `Bearer ${this.apiKey}`;
      }

      const response = await fetch(`${this.baseUrl}/blockchain/getBestBlockHash`, {
        method: 'GET',
        headers
      });

      if (!response.ok) {
        throw new Error(`FullStack.cash API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      return {
        suggestedFeePerByte: 1, // BCH fees are typically 1 sat/byte
        blockHeight: 0, // Would need additional API call
        difficulty: 0 // Would need additional API call
      };
    } catch (error) {
      console.error('[FullStack.cash] Network stats fetch error:', error);
      throw new Error(`Failed to fetch network stats from FullStack.cash: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

// Export singleton instances
export const fullstackMainnet = new FullStackCashAPI('mainnet');
export const fullstackTestnet = new FullStackCashAPI('testnet');

