// Dogechain.info API Implementation for Dogecoin
// API Docs: https://dogechain.info/
// Free tier: Developer API available
// One of the oldest and most established Dogecoin explorers

export interface DogechainAddressInfo {
  success: number;
  address: string;
  balance: string; // in DOGE
  received: string; // total received in DOGE
  sent: string; // total sent in DOGE
  first_tx: string;
  last_tx: string;
  tx_count: number;
}

export interface DogechainTransaction {
  hash: string;
  block_height: number;
  confirmations: number;
  time: number;
  total: string;
  fee: string;
  inputs: Array<{
    address: string;
    amount: string;
    received_from: {
      tx: string;
      n: number;
    };
  }>;
  outputs: Array<{
    address: string;
    amount: string;
    spent?: {
      tx: string;
      n: number;
    };
  }>;
}

export interface DogechainUTXO {
  tx_hash: string;
  tx_output_n: number;
  value: string; // in DOGE
  confirmations: number;
  script: string;
}

export class DogechainAPI {
  private baseUrl = 'https://dogechain.info/api/v1';
  private network: 'mainnet' | 'testnet';

  constructor(network: 'mainnet' | 'testnet' = 'mainnet') {
    this.network = network;
  }

  /**
   * Get address information
   */
  async getAddressInfo(address: string): Promise<DogechainAddressInfo> {
    try {
      console.log(`🔍 [Dogechain] Fetching address info for: ${address}`);
      
      const response = await fetch(`${this.baseUrl}/address/balance/${address}`);
      
      if (!response.ok) {
        throw new Error(`Dogechain API error: ${response.status} ${response.statusText}`);
      }
      
      const data: DogechainAddressInfo = await response.json();
      
      if (data.success !== 1) {
        throw new Error('Dogechain API returned non-success status');
      }
      
      console.log(`✅ [Dogechain] Address info retrieved`);
      
      return data;
    } catch (error) {
      console.error('[Dogechain] Address info fetch error:', error);
      throw new Error(`Failed to fetch address info: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get balance for an address
   */
  async getBalance(address: string): Promise<{
    balance: number; // in shibes (satoshis)
    received: number;
    sent: number;
    balanceDOGE: number; // in DOGE
  }> {
    try {
      console.log(`🔍 [Dogechain] Fetching balance for: ${address}`);
      
      const info = await this.getAddressInfo(address);
      
      const balanceDOGE = parseFloat(info.balance);
      const balance = Math.round(balanceDOGE * 100000000); // Convert to shibes
      const receivedDOGE = parseFloat(info.received);
      const received = Math.round(receivedDOGE * 100000000);
      const sentDOGE = parseFloat(info.sent);
      const sent = Math.round(sentDOGE * 100000000);
      
      console.log(`✅ [Dogechain] Balance: ${balance} shibes (${balanceDOGE} DOGE)`);
      
      return {
        balance,
        received,
        sent,
        balanceDOGE
      };
    } catch (error) {
      console.error('[Dogechain] Balance fetch error:', error);
      throw new Error(`Failed to fetch balance: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get unspent outputs (UTXOs) for an address
   */
  async getUTXOs(address: string): Promise<DogechainUTXO[]> {
    try {
      console.log(`🔍 [Dogechain] Fetching UTXOs for: ${address}`);
      
      const response = await fetch(`${this.baseUrl}/unspent/${address}`);
      
      if (!response.ok) {
        throw new Error(`Dogechain API error: ${response.status} ${response.statusText}`);
      }
      
      const result = await response.json();
      
      if (result.success !== 1) {
        throw new Error('Dogechain API returned non-success status');
      }
      
      const utxos: DogechainUTXO[] = result.unspent_outputs || [];
      
      console.log(`✅ [Dogechain] Found ${utxos.length} UTXOs`);
      
      return utxos;
    } catch (error) {
      console.error('[Dogechain] UTXO fetch error:', error);
      throw new Error(`Failed to fetch UTXOs: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get transaction by hash
   */
  async getTransaction(txHash: string): Promise<DogechainTransaction> {
    try {
      console.log(`🔍 [Dogechain] Fetching transaction: ${txHash}`);
      
      const response = await fetch(`${this.baseUrl}/transaction/${txHash}`);
      
      if (!response.ok) {
        throw new Error(`Dogechain API error: ${response.status} ${response.statusText}`);
      }
      
      const result = await response.json();
      
      if (result.success !== 1) {
        throw new Error('Dogechain API returned non-success status');
      }
      
      const transaction: DogechainTransaction = result.transaction;
      
      console.log(`✅ [Dogechain] Transaction retrieved`);
      
      return transaction;
    } catch (error) {
      console.error('[Dogechain] Transaction fetch error:', error);
      throw new Error(`Failed to fetch transaction: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get transaction history for an address
   */
  async getTransactionHistory(address: string): Promise<{
    transactions: string[];
    total: number;
  }> {
    try {
      console.log(`🔍 [Dogechain] Fetching transaction history for: ${address}`);
      
      const response = await fetch(`${this.baseUrl}/address/transactions/${address}`);
      
      if (!response.ok) {
        throw new Error(`Dogechain API error: ${response.status} ${response.statusText}`);
      }
      
      const result = await response.json();
      
      if (result.success !== 1) {
        throw new Error('Dogechain API returned non-success status');
      }
      
      const transactions: string[] = result.transactions || [];
      
      console.log(`✅ [Dogechain] Found ${transactions.length} transactions`);
      
      return {
        transactions,
        total: transactions.length
      };
    } catch (error) {
      console.error('[Dogechain] Transaction history fetch error:', error);
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
      console.log('📡 [Dogechain] Broadcasting transaction...');
      
      const response = await fetch(`${this.baseUrl}/pushtx`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `tx=${encodeURIComponent(txHex)}`
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Dogechain broadcast error: ${response.status} - ${errorText}`);
      }
      
      const result = await response.json();
      
      if (result.success !== 1) {
        throw new Error(`Dogechain API error: ${result.message || 'Unknown error'}`);
      }
      
      console.log(`✅ [Dogechain] Transaction broadcast successful: ${result.txid}`);
      
      return { txid: result.txid };
    } catch (error) {
      console.error('[Dogechain] Broadcast error:', error);
      throw new Error(`Failed to broadcast transaction: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get network statistics
   */
  async getNetworkStats(): Promise<{
    difficulty: string;
    hashrate: string;
    block_count: number;
  }> {
    try {
      console.log('🔍 [Dogechain] Fetching network stats...');
      
      const response = await fetch(`${this.baseUrl}/network/stats`);
      
      if (!response.ok) {
        throw new Error(`Dogechain API error: ${response.status} ${response.statusText}`);
      }
      
      const result = await response.json();
      
      if (result.success !== 1) {
        throw new Error('Dogechain API returned non-success status');
      }
      
      console.log(`✅ [Dogechain] Network stats retrieved`);
      
      return result.stats;
    } catch (error) {
      console.error('[Dogechain] Network stats fetch error:', error);
      throw new Error(`Failed to fetch network stats: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get block information
   */
  async getBlock(blockHashOrHeight: string | number): Promise<{
    hash: string;
    height: number;
    time: number;
    tx_count: number;
    size: number;
    transactions: string[];
  }> {
    try {
      console.log(`🔍 [Dogechain] Fetching block: ${blockHashOrHeight}`);
      
      const response = await fetch(`${this.baseUrl}/block/${blockHashOrHeight}`);
      
      if (!response.ok) {
        throw new Error(`Dogechain API error: ${response.status} ${response.statusText}`);
      }
      
      const result = await response.json();
      
      if (result.success !== 1) {
        throw new Error('Dogechain API returned non-success status');
      }
      
      console.log(`✅ [Dogechain] Block retrieved`);
      
      return result.block;
    } catch (error) {
      console.error('[Dogechain] Block fetch error:', error);
      throw new Error(`Failed to fetch block: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

// Singleton instances for convenience
export const dogechainMainnet = new DogechainAPI('mainnet');
export const dogechainTestnet = new DogechainAPI('testnet');

