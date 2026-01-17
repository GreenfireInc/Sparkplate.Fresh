// SoChain API Implementation for Bitcoin
// API Docs: https://sochain.com/api
// Free tier: 300 requests/minute (no API key required)
// Simple and reliable blockchain API

export interface SoChainAddressInfo {
  status: string;
  data: {
    network: string;
    address: string;
    balance: string;
    received_value: string;
    pending_value: string;
    total_txs: number;
  };
}

export interface SoChainTransaction {
  status: string;
  data: {
    network: string;
    txid: string;
    blockhash: string;
    confirmations: number;
    time: number;
    incoming?: {
      value: string;
      inputs: Array<{
        input_no: number;
        address: string;
        value: string;
        type: string;
        script?: string;
        witness?: string;
        from_output?: {
          txid: string;
          output_no: number;
        };
      }>;
    };
    outgoing?: {
      value: string;
      outputs: Array<{
        output_no: number;
        address: string;
        value: string;
        type: string;
        script: string;
        spent?: {
          txid: string;
          input_no: number;
        };
      }>;
    };
    fee?: string;
    size?: number;
  };
}

export interface SoChainUTXO {
  txid: string;
  output_no: number;
  value: string;
  confirmations: number;
  script_asm: string;
  script_hex: string;
}

export class SoChainAPI {
  private baseUrl = 'https://sochain.com/api/v2';
  private network: 'BTC' | 'BTCTEST';

  constructor(network: 'BTC' | 'BTCTEST' = 'BTC') {
    this.network = network;
  }

  /**
   * Get address information
   */
  async getAddressInfo(address: string): Promise<SoChainAddressInfo> {
    try {
      console.log(`🔍 [SoChain] Fetching address info for: ${address}`);
      
      const response = await fetch(`${this.baseUrl}/get_address_balance/${this.network}/${address}`);
      
      if (!response.ok) {
        throw new Error(`SoChain API error: ${response.status} ${response.statusText}`);
      }
      
      const data: SoChainAddressInfo = await response.json();
      
      if (data.status !== 'success') {
        throw new Error('SoChain API returned non-success status');
      }
      
      console.log(`✅ [SoChain] Address info retrieved`);
      
      return data;
    } catch (error) {
      console.error('[SoChain] Address info fetch error:', error);
      throw new Error(`Failed to fetch address info: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get balance for an address
   */
  async getBalance(address: string): Promise<{
    balance: number; // in satoshis
    pending: number;
    received: number;
    balanceBTC: number; // in BTC
  }> {
    try {
      console.log(`🔍 [SoChain] Fetching balance for: ${address}`);
      
      const info = await this.getAddressInfo(address);
      
      const balanceBTC = parseFloat(info.data.balance);
      const balance = Math.round(balanceBTC * 100000000);
      const pendingBTC = parseFloat(info.data.pending_value);
      const pending = Math.round(pendingBTC * 100000000);
      const receivedBTC = parseFloat(info.data.received_value);
      const received = Math.round(receivedBTC * 100000000);
      
      console.log(`✅ [SoChain] Balance: ${balance} satoshis (${balanceBTC} BTC)`);
      
      return {
        balance,
        pending,
        received,
        balanceBTC
      };
    } catch (error) {
      console.error('[SoChain] Balance fetch error:', error);
      throw new Error(`Failed to fetch balance: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get UTXOs for an address
   */
  async getUTXOs(address: string): Promise<SoChainUTXO[]> {
    try {
      console.log(`🔍 [SoChain] Fetching UTXOs for: ${address}`);
      
      const response = await fetch(`${this.baseUrl}/get_tx_unspent/${this.network}/${address}`);
      
      if (!response.ok) {
        throw new Error(`SoChain API error: ${response.status} ${response.statusText}`);
      }
      
      const result = await response.json();
      
      if (result.status !== 'success') {
        throw new Error('SoChain API returned non-success status');
      }
      
      const utxos: SoChainUTXO[] = result.data?.txs || [];
      
      console.log(`✅ [SoChain] Found ${utxos.length} UTXOs`);
      
      return utxos;
    } catch (error) {
      console.error('[SoChain] UTXO fetch error:', error);
      throw new Error(`Failed to fetch UTXOs: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get transaction by hash
   */
  async getTransaction(txHash: string): Promise<SoChainTransaction> {
    try {
      console.log(`🔍 [SoChain] Fetching transaction: ${txHash}`);
      
      const response = await fetch(`${this.baseUrl}/get_tx/${this.network}/${txHash}`);
      
      if (!response.ok) {
        throw new Error(`SoChain API error: ${response.status} ${response.statusText}`);
      }
      
      const transaction: SoChainTransaction = await response.json();
      
      if (transaction.status !== 'success') {
        throw new Error('SoChain API returned non-success status');
      }
      
      console.log(`✅ [SoChain] Transaction retrieved`);
      
      return transaction;
    } catch (error) {
      console.error('[SoChain] Transaction fetch error:', error);
      throw new Error(`Failed to fetch transaction: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get transaction history for an address
   */
  async getTransactionHistory(address: string): Promise<{
    transactions: Array<{
      txid: string;
      confirmations: number;
      time: number;
      value?: string;
    }>;
    total: number;
  }> {
    try {
      console.log(`🔍 [SoChain] Fetching transaction history for: ${address}`);
      
      const response = await fetch(`${this.baseUrl}/get_tx_received/${this.network}/${address}`);
      
      if (!response.ok) {
        throw new Error(`SoChain API error: ${response.status} ${response.statusText}`);
      }
      
      const result = await response.json();
      
      if (result.status !== 'success') {
        throw new Error('SoChain API returned non-success status');
      }
      
      const transactions = result.data?.txs || [];
      
      console.log(`✅ [SoChain] Found ${transactions.length} transactions`);
      
      return {
        transactions,
        total: transactions.length
      };
    } catch (error) {
      console.error('[SoChain] Transaction history fetch error:', error);
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
      console.log('📡 [SoChain] Broadcasting transaction...');
      
      const response = await fetch(`${this.baseUrl}/send_tx/${this.network}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ tx_hex: txHex })
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`SoChain broadcast error: ${response.status} - ${errorText}`);
      }
      
      const result = await response.json();
      
      if (result.status !== 'success') {
        throw new Error(`SoChain API error: ${result.data || 'Unknown error'}`);
      }
      
      console.log(`✅ [SoChain] Transaction broadcast successful: ${result.data.txid}`);
      
      return { txid: result.data.txid };
    } catch (error) {
      console.error('[SoChain] Broadcast error:', error);
      throw new Error(`Failed to broadcast transaction: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get network info
   */
  async getNetworkInfo(): Promise<{
    name: string;
    symbol: string;
    blocks: number;
    difficulty: string;
    hashrate: string;
  }> {
    try {
      console.log('🔍 [SoChain] Fetching network info...');
      
      const response = await fetch(`${this.baseUrl}/get_info/${this.network}`);
      
      if (!response.ok) {
        throw new Error(`SoChain API error: ${response.status} ${response.statusText}`);
      }
      
      const result = await response.json();
      
      if (result.status !== 'success') {
        throw new Error('SoChain API returned non-success status');
      }
      
      const info = {
        name: result.data.name,
        symbol: result.data.symbol,
        blocks: result.data.blocks,
        difficulty: result.data.difficulty,
        hashrate: result.data.hashrate
      };
      
      console.log(`✅ [SoChain] Network info retrieved, blocks: ${info.blocks}`);
      
      return info;
    } catch (error) {
      console.error('[SoChain] Network info fetch error:', error);
      throw new Error(`Failed to fetch network info: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get block by height or hash
   */
  async getBlock(blockHashOrHeight: string | number): Promise<{
    blockhash: string;
    block_no: number;
    confirmations: number;
    time: number;
    previous_blockhash?: string;
    next_blockhash?: string;
    mining_difficulty: string;
    merkleroot: string;
    size: number;
    txs: string[];
  }> {
    try {
      console.log(`🔍 [SoChain] Fetching block: ${blockHashOrHeight}`);
      
      const response = await fetch(`${this.baseUrl}/get_block/${this.network}/${blockHashOrHeight}`);
      
      if (!response.ok) {
        throw new Error(`SoChain API error: ${response.status} ${response.statusText}`);
      }
      
      const result = await response.json();
      
      if (result.status !== 'success') {
        throw new Error('SoChain API returned non-success status');
      }
      
      console.log(`✅ [SoChain] Block retrieved`);
      
      return result.data;
    } catch (error) {
      console.error('[SoChain] Block fetch error:', error);
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
      console.log('🔍 [SoChain] Fetching recommended fees...');
      
      const response = await fetch(`${this.baseUrl}/get_price/${this.network}/USD`);
      
      if (!response.ok) {
        throw new Error(`SoChain API error: ${response.status} ${response.statusText}`);
      }
      
      const result = await response.json();
      
      if (result.status !== 'success') {
        throw new Error('SoChain API returned non-success status');
      }
      
      // SoChain doesn't provide fee recommendations directly,
      // so we return reasonable defaults
      const fees = {
        fast: 10,
        medium: 5,
        slow: 2
      };
      
      console.log(`✅ [SoChain] Using default fee recommendations`);
      
      return fees;
    } catch (error) {
      console.error('[SoChain] Fee recommendation fetch error:', error);
      // Return default fees if fetch fails
      return {
        fast: 10,
        medium: 5,
        slow: 2
      };
    }
  }

  /**
   * Check if address is valid
   */
  async isAddressValid(address: string): Promise<boolean> {
    try {
      console.log(`🔍 [SoChain] Validating address: ${address}`);
      
      const response = await fetch(`${this.baseUrl}/is_address_valid/${this.network}/${address}`);
      
      if (!response.ok) {
        throw new Error(`SoChain API error: ${response.status} ${response.statusText}`);
      }
      
      const result = await response.json();
      
      const isValid = result.status === 'success' && result.data.is_valid;
      
      console.log(`✅ [SoChain] Address validation: ${isValid}`);
      
      return isValid;
    } catch (error) {
      console.error('[SoChain] Address validation error:', error);
      return false;
    }
  }
}

// Singleton instances for convenience
export const sochainMainnet = new SoChainAPI('BTC');
export const sochainTestnet = new SoChainAPI('BTCTEST');

