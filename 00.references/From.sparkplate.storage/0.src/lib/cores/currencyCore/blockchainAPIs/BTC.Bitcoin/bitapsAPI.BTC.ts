// Bitaps API Implementation for Bitcoin
// API Docs: https://developer.bitaps.com/
// Free tier: No API key required, rate limits apply
// Modern API with extensive features

export interface BitapsAddressInfo {
  data: {
    address: string;
    balance: number;
    received: number;
    sent: number;
    pending: number;
    tx_count: number;
    unconfirmed_tx_count: number;
  };
  time: number;
}

export interface BitapsTransaction {
  data: {
    txId: string;
    version: number;
    lockTime: number;
    blockIndex: number | null;
    timestamp: number;
    blockTime: number | null;
    confirmations: number;
    fee: number;
    size: number;
    vSize: number;
    weight: number;
    amount: number;
    vIn: Array<{
      txId: string;
      vOut: number;
      type: string;
      amount: number;
      address: string;
      scriptPubKey: string;
      sequence: number;
      scriptSig?: string;
      txInWitness?: string[];
    }>;
    vOut: Array<{
      value: number;
      n: number;
      scriptPubKey: string;
      type: string;
      address?: string;
      reqSigs?: number;
      spent?: {
        txId: string;
        vIn: number;
      };
    }>;
  };
  time: number;
}

export interface BitapsUTXO {
  txId: string;
  vOut: number;
  block: number;
  value: number;
}

export class BitapsAPI {
  private baseUrl: string;
  private network: 'bitcoin' | 'testnet';

  constructor(network: 'bitcoin' | 'testnet' = 'bitcoin') {
    this.network = network;
    this.baseUrl = `https://api.bitaps.com/${network}/v1`;
  }

  /**
   * Get address information
   */
  async getAddressInfo(address: string): Promise<BitapsAddressInfo> {
    try {
      console.log(`🔍 [Bitaps] Fetching address info for: ${address}`);
      
      const response = await fetch(`${this.baseUrl}/blockchain/address/state/${address}`);
      
      if (!response.ok) {
        throw new Error(`Bitaps API error: ${response.status} ${response.statusText}`);
      }
      
      const data: BitapsAddressInfo = await response.json();
      
      console.log(`✅ [Bitaps] Address info retrieved`);
      
      return data;
    } catch (error) {
      console.error('[Bitaps] Address info fetch error:', error);
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
    sent: number;
    balanceBTC: number; // in BTC
  }> {
    try {
      console.log(`🔍 [Bitaps] Fetching balance for: ${address}`);
      
      const info = await this.getAddressInfo(address);
      
      const balance = info.data.balance;
      const pending = info.data.pending;
      const received = info.data.received;
      const sent = info.data.sent;
      const balanceBTC = balance / 100000000;
      
      console.log(`✅ [Bitaps] Balance: ${balance} satoshis (${balanceBTC} BTC)`);
      
      return {
        balance,
        pending,
        received,
        sent,
        balanceBTC
      };
    } catch (error) {
      console.error('[Bitaps] Balance fetch error:', error);
      throw new Error(`Failed to fetch balance: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get UTXOs for an address
   */
  async getUTXOs(address: string): Promise<BitapsUTXO[]> {
    try {
      console.log(`🔍 [Bitaps] Fetching UTXOs for: ${address}`);
      
      const response = await fetch(`${this.baseUrl}/blockchain/address/utxo/${address}`);
      
      if (!response.ok) {
        throw new Error(`Bitaps API error: ${response.status} ${response.statusText}`);
      }
      
      const result = await response.json();
      const utxos: BitapsUTXO[] = result.data?.list || [];
      
      console.log(`✅ [Bitaps] Found ${utxos.length} UTXOs`);
      
      return utxos;
    } catch (error) {
      console.error('[Bitaps] UTXO fetch error:', error);
      throw new Error(`Failed to fetch UTXOs: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get transaction by hash
   */
  async getTransaction(txHash: string): Promise<BitapsTransaction> {
    try {
      console.log(`🔍 [Bitaps] Fetching transaction: ${txHash}`);
      
      const response = await fetch(`${this.baseUrl}/blockchain/transaction/${txHash}`);
      
      if (!response.ok) {
        throw new Error(`Bitaps API error: ${response.status} ${response.statusText}`);
      }
      
      const transaction: BitapsTransaction = await response.json();
      
      console.log(`✅ [Bitaps] Transaction retrieved`);
      
      return transaction;
    } catch (error) {
      console.error('[Bitaps] Transaction fetch error:', error);
      throw new Error(`Failed to fetch transaction: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get transaction history for an address
   */
  async getTransactionHistory(
    address: string,
    limit: number = 50,
    offset: number = 0
  ): Promise<{
    transactions: string[];
    total: number;
  }> {
    try {
      console.log(`🔍 [Bitaps] Fetching transaction history for: ${address}`);
      
      const response = await fetch(
        `${this.baseUrl}/blockchain/address/transactions/${address}?limit=${limit}&offset=${offset}`
      );
      
      if (!response.ok) {
        throw new Error(`Bitaps API error: ${response.status} ${response.statusText}`);
      }
      
      const result = await response.json();
      const transactions: string[] = result.data?.list || [];
      const total = result.data?.total || 0;
      
      console.log(`✅ [Bitaps] Found ${transactions.length} transactions (total: ${total})`);
      
      return {
        transactions,
        total
      };
    } catch (error) {
      console.error('[Bitaps] Transaction history fetch error:', error);
      throw new Error(`Failed to fetch transaction history: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Broadcast a transaction
   */
  async broadcastTransaction(txHex: string): Promise<{
    txId: string;
  }> {
    try {
      console.log('📡 [Bitaps] Broadcasting transaction...');
      
      const response = await fetch(`${this.baseUrl}/blockchain/transaction/send/raw`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data: txHex })
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Bitaps broadcast error: ${response.status} - ${errorText}`);
      }
      
      const result = await response.json();
      
      console.log(`✅ [Bitaps] Transaction broadcast successful: ${result.data}`);
      
      return { txId: result.data };
    } catch (error) {
      console.error('[Bitaps] Broadcast error:', error);
      throw new Error(`Failed to broadcast transaction: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Decode raw transaction
   */
  async decodeTransaction(txHex: string): Promise<BitapsTransaction> {
    try {
      console.log('🔍 [Bitaps] Decoding transaction...');
      
      const response = await fetch(`${this.baseUrl}/blockchain/transaction/decode/raw`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data: txHex })
      });
      
      if (!response.ok) {
        throw new Error(`Bitaps API error: ${response.status} ${response.statusText}`);
      }
      
      const decoded: BitapsTransaction = await response.json();
      
      console.log(`✅ [Bitaps] Transaction decoded`);
      
      return decoded;
    } catch (error) {
      console.error('[Bitaps] Transaction decode error:', error);
      throw new Error(`Failed to decode transaction: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get blockchain info
   */
  async getBlockchainInfo(): Promise<{
    height: number;
    lastBlock: string;
    difficulty: number;
    hashRate: number;
  }> {
    try {
      console.log('🔍 [Bitaps] Fetching blockchain info...');
      
      const response = await fetch(`${this.baseUrl}/blockchain/state`);
      
      if (!response.ok) {
        throw new Error(`Bitaps API error: ${response.status} ${response.statusText}`);
      }
      
      const result = await response.json();
      const info = {
        height: result.data.height,
        lastBlock: result.data.lastBlock,
        difficulty: result.data.difficulty,
        hashRate: result.data.hashRate
      };
      
      console.log(`✅ [Bitaps] Blockchain info retrieved, height: ${info.height}`);
      
      return info;
    } catch (error) {
      console.error('[Bitaps] Blockchain info fetch error:', error);
      throw new Error(`Failed to fetch blockchain info: ${error instanceof Error ? error.message : 'Unknown error'}`);
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
      console.log('🔍 [Bitaps] Fetching recommended fees...');
      
      const response = await fetch(`${this.baseUrl}/blockchain/recommended/fee`);
      
      if (!response.ok) {
        throw new Error(`Bitaps API error: ${response.status} ${response.statusText}`);
      }
      
      const result = await response.json();
      const fees = {
        fast: result.data.fast || 10,
        medium: result.data.medium || 5,
        slow: result.data.slow || 2
      };
      
      console.log(`✅ [Bitaps] Recommended fees: Fast ${fees.fast}, Medium ${fees.medium}, Slow ${fees.slow} sat/byte`);
      
      return fees;
    } catch (error) {
      console.error('[Bitaps] Fee recommendation fetch error:', error);
      throw new Error(`Failed to fetch fee recommendations: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

// Singleton instances for convenience
export const bitapsMainnet = new BitapsAPI('bitcoin');
export const bitapsTestnet = new BitapsAPI('testnet');

