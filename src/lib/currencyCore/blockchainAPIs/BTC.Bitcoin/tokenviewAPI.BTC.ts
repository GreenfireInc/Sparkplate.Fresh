// Tokenview API Implementation for Bitcoin
// API Docs: https://services.tokenview.io/docs
// Free tier: 100 requests/day, requires API key
// Multi-chain blockchain API

export interface TokenviewConfig {
  apiKey: string; // Required for Tokenview
}

export interface TokenviewAddressInfo {
  code: number;
  msg: string;
  data: {
    balance: string; // in BTC
    balance_sat: number; // in satoshis
    unconfirmed_balance: string;
    unconfirmed_balance_sat: number;
    received: string;
    received_sat: number;
    pending: string;
    pending_sat: number;
    txcount: number;
  };
}

export interface TokenviewTransaction {
  code: number;
  msg: string;
  data: {
    txid: string;
    blockhash: string;
    blocktime: number;
    height: number;
    confirmations: number;
    size: number;
    fee: string;
    from: Array<{
      address: string;
      amount: string;
      index: number;
    }>;
    to: Array<{
      address: string;
      amount: string;
      index: number;
      type?: string;
    }>;
  };
}

export interface TokenviewUTXO {
  txid: string;
  index: number;
  value: string;
  value_sat: number;
  height: number;
  confirmations: number;
}

export class TokenviewAPI {
  private baseUrl = 'https://services.tokenview.io';
  private apiKey: string;
  private network: 'btc' | 'btctest';

  constructor(config: TokenviewConfig, network: 'btc' | 'btctest' = 'btc') {
    this.apiKey = config.apiKey;
    this.network = network;
  }

  /**
   * Build URL with API key
   */
  private buildUrl(endpoint: string): string {
    return `${this.baseUrl}/coin/${this.network}/${endpoint}/${this.apiKey}`;
  }

  /**
   * Get address information
   */
  async getAddressInfo(address: string): Promise<TokenviewAddressInfo> {
    try {
      console.log(`🔍 [Tokenview] Fetching address info for: ${address}`);
      
      const response = await fetch(this.buildUrl(`address/${address}`));
      
      if (!response.ok) {
        throw new Error(`Tokenview API error: ${response.status} ${response.statusText}`);
      }
      
      const data: TokenviewAddressInfo = await response.json();
      
      if (data.code !== 1) {
        throw new Error(`Tokenview API error: ${data.msg}`);
      }
      
      console.log(`✅ [Tokenview] Address info retrieved`);
      
      return data;
    } catch (error) {
      console.error('[Tokenview] Address info fetch error:', error);
      throw new Error(`Failed to fetch address info: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get balance for an address
   */
  async getBalance(address: string): Promise<{
    balance: number; // in satoshis
    unconfirmed: number;
    received: number;
    balanceBTC: number; // in BTC
  }> {
    try {
      console.log(`🔍 [Tokenview] Fetching balance for: ${address}`);
      
      const info = await this.getAddressInfo(address);
      
      const balance = info.data.balance_sat;
      const unconfirmed = info.data.unconfirmed_balance_sat;
      const received = info.data.received_sat;
      const balanceBTC = parseFloat(info.data.balance);
      
      console.log(`✅ [Tokenview] Balance: ${balance} satoshis (${balanceBTC} BTC)`);
      
      return {
        balance,
        unconfirmed,
        received,
        balanceBTC
      };
    } catch (error) {
      console.error('[Tokenview] Balance fetch error:', error);
      throw new Error(`Failed to fetch balance: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get UTXOs for an address
   */
  async getUTXOs(address: string): Promise<TokenviewUTXO[]> {
    try {
      console.log(`🔍 [Tokenview] Fetching UTXOs for: ${address}`);
      
      const response = await fetch(this.buildUrl(`address/utxo/${address}`));
      
      if (!response.ok) {
        throw new Error(`Tokenview API error: ${response.status} ${response.statusText}`);
      }
      
      const result = await response.json();
      
      if (result.code !== 1) {
        throw new Error(`Tokenview API error: ${result.msg}`);
      }
      
      const utxos: TokenviewUTXO[] = result.data || [];
      
      console.log(`✅ [Tokenview] Found ${utxos.length} UTXOs`);
      
      return utxos;
    } catch (error) {
      console.error('[Tokenview] UTXO fetch error:', error);
      throw new Error(`Failed to fetch UTXOs: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get transaction by hash
   */
  async getTransaction(txHash: string): Promise<TokenviewTransaction> {
    try {
      console.log(`🔍 [Tokenview] Fetching transaction: ${txHash}`);
      
      const response = await fetch(this.buildUrl(`tx/${txHash}`));
      
      if (!response.ok) {
        throw new Error(`Tokenview API error: ${response.status} ${response.statusText}`);
      }
      
      const transaction: TokenviewTransaction = await response.json();
      
      if (transaction.code !== 1) {
        throw new Error(`Tokenview API error: ${transaction.msg}`);
      }
      
      console.log(`✅ [Tokenview] Transaction retrieved`);
      
      return transaction;
    } catch (error) {
      console.error('[Tokenview] Transaction fetch error:', error);
      throw new Error(`Failed to fetch transaction: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get transaction history for an address
   */
  async getTransactionHistory(
    address: string,
    page: number = 1,
    pageSize: number = 20
  ): Promise<{
    transactions: unknown[];
    total: number;
    page: number;
  }> {
    try {
      console.log(`🔍 [Tokenview] Fetching transaction history for: ${address}`);
      
      const response = await fetch(
        this.buildUrl(`address/txs/${address}/${page}`)
      );
      
      if (!response.ok) {
        throw new Error(`Tokenview API error: ${response.status} ${response.statusText}`);
      }
      
      const result = await response.json();
      
      if (result.code !== 1) {
        throw new Error(`Tokenview API error: ${result.msg}`);
      }
      
      const transactions = result.data || [];
      const total = result.total || 0;
      
      console.log(`✅ [Tokenview] Found ${transactions.length} transactions (total: ${total})`);
      
      return {
        transactions,
        total,
        page
      };
    } catch (error) {
      console.error('[Tokenview] Transaction history fetch error:', error);
      throw new Error(`Failed to fetch transaction history: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Broadcast a transaction
   */
  async broadcastTransaction(txHex: string): Promise<{
    txid: string;
  }> {
    try {
      console.log('📡 [Tokenview] Broadcasting transaction...');
      
      const response = await fetch(this.buildUrl('tx/send'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ hex: txHex })
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Tokenview broadcast error: ${response.status} - ${errorText}`);
      }
      
      const result = await response.json();
      
      if (result.code !== 1) {
        throw new Error(`Tokenview API error: ${result.msg}`);
      }
      
      console.log(`✅ [Tokenview] Transaction broadcast successful: ${result.data}`);
      
      return { txid: result.data };
    } catch (error) {
      console.error('[Tokenview] Broadcast error:', error);
      throw new Error(`Failed to broadcast transaction: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get latest block height
   */
  async getLatestBlockHeight(): Promise<number> {
    try {
      console.log('🔍 [Tokenview] Fetching latest block height...');
      
      const response = await fetch(this.buildUrl('block/latest'));
      
      if (!response.ok) {
        throw new Error(`Tokenview API error: ${response.status} ${response.statusText}`);
      }
      
      const result = await response.json();
      
      if (result.code !== 1) {
        throw new Error(`Tokenview API error: ${result.msg}`);
      }
      
      const height = result.data.height;
      
      console.log(`✅ [Tokenview] Latest block height: ${height}`);
      
      return height;
    } catch (error) {
      console.error('[Tokenview] Block height fetch error:', error);
      throw new Error(`Failed to fetch block height: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get block by height
   */
  async getBlockByHeight(height: number): Promise<{
    hash: string;
    height: number;
    time: number;
    txcount: number;
    size: number;
  }> {
    try {
      console.log(`🔍 [Tokenview] Fetching block at height: ${height}`);
      
      const response = await fetch(this.buildUrl(`block/${height}`));
      
      if (!response.ok) {
        throw new Error(`Tokenview API error: ${response.status} ${response.statusText}`);
      }
      
      const result = await response.json();
      
      if (result.code !== 1) {
        throw new Error(`Tokenview API error: ${result.msg}`);
      }
      
      console.log(`✅ [Tokenview] Block retrieved`);
      
      return result.data;
    } catch (error) {
      console.error('[Tokenview] Block fetch error:', error);
      throw new Error(`Failed to fetch block: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get recommended fees
   */
  async getRecommendedFees(): Promise<{
    fast: number; // sat/byte
    medium: number;
    slow: number;
  }> {
    try {
      console.log('🔍 [Tokenview] Fetching recommended fees...');
      
      const response = await fetch(this.buildUrl('fee/recommend'));
      
      if (!response.ok) {
        throw new Error(`Tokenview API error: ${response.status} ${response.statusText}`);
      }
      
      const result = await response.json();
      
      if (result.code !== 1) {
        throw new Error(`Tokenview API error: ${result.msg}`);
      }
      
      const fees = {
        fast: result.data.high || 10,
        medium: result.data.average || 5,
        slow: result.data.low || 2
      };
      
      console.log(`✅ [Tokenview] Recommended fees: Fast ${fees.fast}, Medium ${fees.medium}, Slow ${fees.slow} sat/byte`);
      
      return fees;
    } catch (error) {
      console.error('[Tokenview] Fee recommendation fetch error:', error);
      // Return default fees if fetch fails
      return {
        fast: 10,
        medium: 5,
        slow: 2
      };
    }
  }
}

