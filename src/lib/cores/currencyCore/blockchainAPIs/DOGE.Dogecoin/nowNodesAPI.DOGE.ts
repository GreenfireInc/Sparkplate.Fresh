// NOWNodes API Implementation for Dogecoin
// API Docs: https://nownodes.io/
// Free tier: 5,000 requests/month (requires API key)
// Multi-chain blockchain API with full node access

export interface NOWNodesDogeConfig {
  apiKey: string; // Required for NOWNodes
}

export interface NOWNodesDogeAddressInfo {
  address: string;
  balance: number; // in shibes
  totalReceived: number;
  totalSent: number;
  unconfirmedBalance: number;
  unconfirmedTxs: number;
  txs: number;
  txids?: string[];
}

export interface NOWNodesDogeTrans {
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

export interface NOWNodesDogeUTXO {
  txid: string;
  vout: number;
  value: string;
  height: number;
  confirmations: number;
}

export class NOWNodesDogeAPI {
  private baseUrl: string;
  private apiKey: string;
  private network: 'dogecoin' | 'dogecoin-testnet';

  constructor(config: NOWNodesDogeConfig, network: 'dogecoin' | 'dogecoin-testnet' = 'dogecoin') {
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
  async getAddressInfo(address: string, details: 'basic' | 'txs' | 'txids' = 'basic'): Promise<NOWNodesDogeAddressInfo> {
    try {
      console.log(`🔍 [NOWNodes-DOGE] Fetching address info for: ${address}`);
      
      const response = await fetch(`${this.baseUrl}/api/v2/address/${address}?details=${details}`, {
        headers: this.getHeaders()
      });
      
      if (!response.ok) {
        throw new Error(`NOWNodes API error: ${response.status} ${response.statusText}`);
      }
      
      const data: NOWNodesDogeAddressInfo = await response.json();
      
      console.log(`✅ [NOWNodes-DOGE] Address info retrieved`);
      
      return data;
    } catch (error) {
      console.error('[NOWNodes-DOGE] Address info fetch error:', error);
      throw new Error(`Failed to fetch address info: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get balance for an address
   */
  async getBalance(address: string): Promise<{
    balance: number; // in shibes
    unconfirmed: number;
    received: number;
    sent: number;
    balanceDOGE: number; // in DOGE
  }> {
    try {
      console.log(`🔍 [NOWNodes-DOGE] Fetching balance for: ${address}`);
      
      const info = await this.getAddressInfo(address);
      
      const balance = info.balance;
      const unconfirmed = info.unconfirmedBalance;
      const received = info.totalReceived;
      const sent = info.totalSent;
      const balanceDOGE = balance / 100000000;
      
      console.log(`✅ [NOWNodes-DOGE] Balance: ${balance} shibes (${balanceDOGE} DOGE)`);
      
      return {
        balance,
        unconfirmed,
        received,
        sent,
        balanceDOGE
      };
    } catch (error) {
      console.error('[NOWNodes-DOGE] Balance fetch error:', error);
      throw new Error(`Failed to fetch balance: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get UTXOs for an address
   */
  async getUTXOs(address: string): Promise<NOWNodesDogeUTXO[]> {
    try {
      console.log(`🔍 [NOWNodes-DOGE] Fetching UTXOs for: ${address}`);
      
      const response = await fetch(`${this.baseUrl}/api/v2/utxo/${address}`, {
        headers: this.getHeaders()
      });
      
      if (!response.ok) {
        throw new Error(`NOWNodes API error: ${response.status} ${response.statusText}`);
      }
      
      const utxos: NOWNodesDogeUTXO[] = await response.json();
      
      console.log(`✅ [NOWNodes-DOGE] Found ${utxos.length} UTXOs`);
      
      return utxos;
    } catch (error) {
      console.error('[NOWNodes-DOGE] UTXO fetch error:', error);
      throw new Error(`Failed to fetch UTXOs: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get transaction by hash
   */
  async getTransaction(txHash: string): Promise<NOWNodesDogeTrans> {
    try {
      console.log(`🔍 [NOWNodes-DOGE] Fetching transaction: ${txHash}`);
      
      const response = await fetch(`${this.baseUrl}/api/v2/tx/${txHash}`, {
        headers: this.getHeaders()
      });
      
      if (!response.ok) {
        throw new Error(`NOWNodes API error: ${response.status} ${response.statusText}`);
      }
      
      const transaction: NOWNodesDogeTrans = await response.json();
      
      console.log(`✅ [NOWNodes-DOGE] Transaction retrieved`);
      
      return transaction;
    } catch (error) {
      console.error('[NOWNodes-DOGE] Transaction fetch error:', error);
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
      console.log(`🔍 [NOWNodes-DOGE] Fetching transaction history for: ${address}`);
      
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
      
      console.log(`✅ [NOWNodes-DOGE] Found ${transactions.length} transactions (total: ${total})`);
      
      return {
        transactions,
        total,
        page
      };
    } catch (error) {
      console.error('[NOWNodes-DOGE] Transaction history fetch error:', error);
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
      console.log('📡 [NOWNodes-DOGE] Broadcasting transaction...');
      
      const response = await fetch(`${this.baseUrl}/api/v2/sendtx/${txHex}`, {
        method: 'GET',
        headers: this.getHeaders()
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`NOWNodes broadcast error: ${response.status} - ${errorText}`);
      }
      
      const result = await response.json();
      
      console.log(`✅ [NOWNodes-DOGE] Transaction broadcast successful: ${result.result}`);
      
      return result;
    } catch (error) {
      console.error('[NOWNodes-DOGE] Broadcast error:', error);
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
      console.log('🔍 [NOWNodes-DOGE] Fetching blockchain info...');
      
      const response = await fetch(`${this.baseUrl}/api/v2`, {
        headers: this.getHeaders()
      });
      
      if (!response.ok) {
        throw new Error(`NOWNodes API error: ${response.status} ${response.statusText}`);
      }
      
      const info = await response.json();
      
      console.log(`✅ [NOWNodes-DOGE] Blockchain info retrieved`);
      
      return info;
    } catch (error) {
      console.error('[NOWNodes-DOGE] Blockchain info fetch error:', error);
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
      console.log(`🔍 [NOWNodes-DOGE] Fetching block: ${blockHashOrHeight}`);
      
      const response = await fetch(`${this.baseUrl}/api/v2/block/${blockHashOrHeight}`, {
        headers: this.getHeaders()
      });
      
      if (!response.ok) {
        throw new Error(`NOWNodes API error: ${response.status} ${response.statusText}`);
      }
      
      const block = await response.json();
      
      console.log(`✅ [NOWNodes-DOGE] Block retrieved`);
      
      return block;
    } catch (error) {
      console.error('[NOWNodes-DOGE] Block fetch error:', error);
      throw new Error(`Failed to fetch block: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Estimate fee
   */
  async estimateFee(blocks: number = 2): Promise<{
    result: string; // DOGE per KB
  }> {
    try {
      console.log(`🔍 [NOWNodes-DOGE] Estimating fee for ${blocks} blocks...`);
      
      const response = await fetch(`${this.baseUrl}/api/v2/estimatefee/${blocks}`, {
        headers: this.getHeaders()
      });
      
      if (!response.ok) {
        throw new Error(`NOWNodes API error: ${response.status} ${response.statusText}`);
      }
      
      const fee = await response.json();
      
      console.log(`✅ [NOWNodes-DOGE] Fee estimate: ${fee.result} DOGE/KB`);
      
      return fee;
    } catch (error) {
      console.error('[NOWNodes-DOGE] Fee estimation error:', error);
      throw new Error(`Failed to estimate fee: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

