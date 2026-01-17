// NOWNodes API Implementation for Bitcoin
// API Docs: https://nownodes.io/
// Free tier: 5,000 requests/month (requires API key)
// Multi-chain blockchain API with full node access

export interface NOWNodesConfig {
  apiKey: string; // Required for NOWNodes
}

export interface NOWNodesAddressInfo {
  address: string;
  balance: number; // in satoshis
  totalReceived: number;
  totalSent: number;
  unconfirmedBalance: number;
  unconfirmedTxs: number;
  txs: number;
  txids?: string[];
}

export interface NOWNodesTransaction {
  txid: string;
  version: number;
  vin: Array<{
    txid: string;
    vout: number;
    sequence: number;
    n: number;
    addresses: string[];
    value: string;
    hex?: string;
  }>;
  vout: Array<{
    value: string;
    n: number;
    hex: string;
    addresses: string[];
    spent?: boolean;
  }>;
  blockHash?: string;
  blockHeight?: number;
  confirmations: number;
  blockTime?: number;
  size: number;
  vsize: number;
  value: string;
  valueIn: string;
  fees: string;
}

export interface NOWNodesUTXO {
  txid: string;
  vout: number;
  value: string;
  height: number;
  confirmations: number;
}

export class NOWNodesAPI {
  private baseUrl: string;
  private apiKey: string;
  private network: 'bitcoin' | 'bitcoin-testnet';

  constructor(config: NOWNodesConfig, network: 'bitcoin' | 'bitcoin-testnet' = 'bitcoin') {
    this.apiKey = config.apiKey;
    this.network = network;
    this.baseUrl = `https://${network}.nownodes.io`;
  }

  /**
   * Build headers with API key
   */
  private getHeaders(): HeadersInit {
    return {
      'api-key': this.apiKey,
      'Content-Type': 'application/json'
    };
  }

  /**
   * Get address information
   */
  async getAddressInfo(address: string, details: 'basic' | 'txs' | 'txids' = 'basic'): Promise<NOWNodesAddressInfo> {
    try {
      console.log(`🔍 [NOWNodes] Fetching address info for: ${address}`);
      
      const response = await fetch(`${this.baseUrl}/api/v2/address/${address}?details=${details}`, {
        headers: this.getHeaders()
      });
      
      if (!response.ok) {
        throw new Error(`NOWNodes API error: ${response.status} ${response.statusText}`);
      }
      
      const data: NOWNodesAddressInfo = await response.json();
      
      console.log(`✅ [NOWNodes] Address info retrieved`);
      
      return data;
    } catch (error) {
      console.error('[NOWNodes] Address info fetch error:', error);
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
    sent: number;
    balanceBTC: number; // in BTC
  }> {
    try {
      console.log(`🔍 [NOWNodes] Fetching balance for: ${address}`);
      
      const info = await this.getAddressInfo(address);
      
      const balance = info.balance;
      const unconfirmed = info.unconfirmedBalance;
      const received = info.totalReceived;
      const sent = info.totalSent;
      const balanceBTC = balance / 100000000;
      
      console.log(`✅ [NOWNodes] Balance: ${balance} satoshis (${balanceBTC} BTC)`);
      
      return {
        balance,
        unconfirmed,
        received,
        sent,
        balanceBTC
      };
    } catch (error) {
      console.error('[NOWNodes] Balance fetch error:', error);
      throw new Error(`Failed to fetch balance: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get UTXOs for an address
   */
  async getUTXOs(address: string): Promise<NOWNodesUTXO[]> {
    try {
      console.log(`🔍 [NOWNodes] Fetching UTXOs for: ${address}`);
      
      const response = await fetch(`${this.baseUrl}/api/v2/utxo/${address}`, {
        headers: this.getHeaders()
      });
      
      if (!response.ok) {
        throw new Error(`NOWNodes API error: ${response.status} ${response.statusText}`);
      }
      
      const utxos: NOWNodesUTXO[] = await response.json();
      
      console.log(`✅ [NOWNodes] Found ${utxos.length} UTXOs`);
      
      return utxos;
    } catch (error) {
      console.error('[NOWNodes] UTXO fetch error:', error);
      throw new Error(`Failed to fetch UTXOs: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get transaction by hash
   */
  async getTransaction(txHash: string): Promise<NOWNodesTransaction> {
    try {
      console.log(`🔍 [NOWNodes] Fetching transaction: ${txHash}`);
      
      const response = await fetch(`${this.baseUrl}/api/v2/tx/${txHash}`, {
        headers: this.getHeaders()
      });
      
      if (!response.ok) {
        throw new Error(`NOWNodes API error: ${response.status} ${response.statusText}`);
      }
      
      const transaction: NOWNodesTransaction = await response.json();
      
      console.log(`✅ [NOWNodes] Transaction retrieved`);
      
      return transaction;
    } catch (error) {
      console.error('[NOWNodes] Transaction fetch error:', error);
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
      console.log(`🔍 [NOWNodes] Fetching transaction history for: ${address}`);
      
      const response = await fetch(
        `${this.baseUrl}/api/v2/address/${address}?page=${page}&pageSize=${pageSize}&details=txs`,
        {
          headers: this.getHeaders()
        }
      );
      
      if (!response.ok) {
        throw new Error(`NOWNodes API error: ${response.status} ${response.statusText}`);
      }
      
      const result = await response.json();
      const transactions = result.transactions || [];
      const total = result.txs || 0;
      
      console.log(`✅ [NOWNodes] Found ${transactions.length} transactions (total: ${total})`);
      
      return {
        transactions,
        total,
        page
      };
    } catch (error) {
      console.error('[NOWNodes] Transaction history fetch error:', error);
      throw new Error(`Failed to fetch transaction history: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Broadcast a transaction
   */
  async broadcastTransaction(txHex: string): Promise<{
    result: string; // txid
  }> {
    try {
      console.log('📡 [NOWNodes] Broadcasting transaction...');
      
      const response = await fetch(`${this.baseUrl}/api/v2/sendtx/${txHex}`, {
        method: 'GET',
        headers: this.getHeaders()
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`NOWNodes broadcast error: ${response.status} - ${errorText}`);
      }
      
      const result = await response.json();
      
      console.log(`✅ [NOWNodes] Transaction broadcast successful: ${result.result}`);
      
      return result;
    } catch (error) {
      console.error('[NOWNodes] Broadcast error:', error);
      throw new Error(`Failed to broadcast transaction: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get blockchain info
   */
  async getBlockchainInfo(): Promise<{
    blockbook: {
      coin: string;
      host: string;
      version: string;
      gitCommit: string;
      buildTime: string;
      syncMode: boolean;
    };
    backend: {
      chain: string;
      blocks: number;
      headers: number;
      bestBlockHash: string;
      difficulty: string;
      sizeOnDisk: number;
      version: string;
      subversion: string;
      protocolVersion: string;
    };
  }> {
    try {
      console.log('🔍 [NOWNodes] Fetching blockchain info...');
      
      const response = await fetch(`${this.baseUrl}/api/v2`, {
        headers: this.getHeaders()
      });
      
      if (!response.ok) {
        throw new Error(`NOWNodes API error: ${response.status} ${response.statusText}`);
      }
      
      const info = await response.json();
      
      console.log(`✅ [NOWNodes] Blockchain info retrieved`);
      
      return info;
    } catch (error) {
      console.error('[NOWNodes] Blockchain info fetch error:', error);
      throw new Error(`Failed to fetch blockchain info: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get block by hash or height
   */
  async getBlock(blockHashOrHeight: string | number): Promise<{
    hash: string;
    height: number;
    time: number;
    txCount: number;
    size: number;
    version: number;
    merkleRoot: string;
    nonce: string;
    bits: string;
    difficulty: string;
    confirmations: number;
    previousblockhash?: string;
    nextblockhash?: string;
  }> {
    try {
      console.log(`🔍 [NOWNodes] Fetching block: ${blockHashOrHeight}`);
      
      const response = await fetch(`${this.baseUrl}/api/v2/block/${blockHashOrHeight}`, {
        headers: this.getHeaders()
      });
      
      if (!response.ok) {
        throw new Error(`NOWNodes API error: ${response.status} ${response.statusText}`);
      }
      
      const block = await response.json();
      
      console.log(`✅ [NOWNodes] Block retrieved`);
      
      return block;
    } catch (error) {
      console.error('[NOWNodes] Block fetch error:', error);
      throw new Error(`Failed to fetch block: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Estimate fee
   */
  async estimateFee(blocks: number = 2): Promise<{
    result: string; // BTC per KB
  }> {
    try {
      console.log(`🔍 [NOWNodes] Estimating fee for ${blocks} blocks...`);
      
      const response = await fetch(`${this.baseUrl}/api/v2/estimatefee/${blocks}`, {
        headers: this.getHeaders()
      });
      
      if (!response.ok) {
        throw new Error(`NOWNodes API error: ${response.status} ${response.statusText}`);
      }
      
      const fee = await response.json();
      
      console.log(`✅ [NOWNodes] Fee estimate: ${fee.result} BTC/KB`);
      
      return fee;
    } catch (error) {
      console.error('[NOWNodes] Fee estimation error:', error);
      throw new Error(`Failed to estimate fee: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

