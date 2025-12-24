// Dappflow API Implementation for Algorand
// API Docs: https://docs.dappflow.org
// Free tier: Public API with optional API key for higher limits
// Provides both Algod and Indexer functionality

export interface DappflowAccountInfo {
  address: string;
  amount: number;
  'amount-without-pending-rewards': number;
  'apps-local-state'?: unknown[];
  'apps-total-schema'?: unknown;
  assets?: unknown[];
  'auth-addr'?: string;
  'created-apps'?: unknown[];
  'created-assets'?: unknown[];
  'min-balance': number;
  'pending-rewards': number;
  'reward-base'?: number;
  rewards: number;
  round: number;
  status: string;
  'total-apps-opted-in': number;
  'total-assets-opted-in': number;
  'total-created-apps': number;
  'total-created-assets': number;
}

export interface DappflowTransaction {
  id: string;
  'confirmed-round': number;
  'round-time': number;
  sender: string;
  fee: number;
  'first-valid': number;
  'last-valid': number;
  'payment-transaction'?: {
    amount: number;
    receiver: string;
    'close-amount'?: number;
  };
  'asset-transfer-transaction'?: {
    amount: number;
    'asset-id': number;
    receiver: string;
  };
  'tx-type': string;
}

export interface DappflowConfig {
  apiKey?: string; // Optional API key for higher limits
}

export class DappflowAPI {
  private baseUrl: string;
  private network: 'mainnet' | 'testnet';
  private apiKey?: string;

  constructor(network: 'mainnet' | 'testnet' = 'mainnet', config?: DappflowConfig) {
    this.network = network;
    this.apiKey = config?.apiKey;
    
    // Dappflow endpoints
    this.baseUrl = network === 'mainnet' 
      ? 'https://mainnet-api.dappflow.org'
      : 'https://testnet-api.dappflow.org';
  }

  /**
   * Get headers for API requests
   */
  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json'
    };
    
    if (this.apiKey) {
      headers['X-API-Key'] = this.apiKey;
    }
    
    return headers;
  }

  /**
   * Get account balance and information
   */
  async getBalance(address: string): Promise<{
    balance: number; // in microAlgos
    balanceAlgo: number; // in ALGO
    pendingRewards: number;
    minBalance: number;
    round: number;
  }> {
    try {
      console.log(`🔍 [Dappflow] Fetching balance for: ${address}`);
      
      const response = await fetch(
        `${this.baseUrl}/v2/accounts/${address}`,
        { headers: this.getHeaders() }
      );
      
      if (!response.ok) {
        if (response.status === 404) {
          // Account doesn't exist yet (0 balance)
          return {
            balance: 0,
            balanceAlgo: 0,
            pendingRewards: 0,
            minBalance: 100000,
            round: 0
          };
        }
        throw new Error(`Dappflow API error: ${response.status} ${response.statusText}`);
      }
      
      const data: DappflowAccountInfo = await response.json();
      
      console.log(`✅ [Dappflow] Balance: ${data.amount} microAlgos (${data.amount / 1000000} ALGO)`);
      
      return {
        balance: data.amount,
        balanceAlgo: data.amount / 1000000,
        pendingRewards: data['pending-rewards'] || 0,
        minBalance: data['min-balance'] || 100000,
        round: data.round
      };
    } catch (error) {
      console.error('[Dappflow] Balance fetch error:', error);
      throw new Error(`Failed to fetch balance: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get account information
   */
  async getAccountInfo(address: string): Promise<DappflowAccountInfo> {
    try {
      console.log(`🔍 [Dappflow] Fetching account info for: ${address}`);
      
      const response = await fetch(
        `${this.baseUrl}/v2/accounts/${address}`,
        { headers: this.getHeaders() }
      );
      
      if (!response.ok) {
        throw new Error(`Dappflow API error: ${response.status} ${response.statusText}`);
      }
      
      const data: DappflowAccountInfo = await response.json();
      
      console.log(`✅ [Dappflow] Account info retrieved`);
      
      return data;
    } catch (error) {
      console.error('[Dappflow] Account info fetch error:', error);
      throw new Error(`Failed to fetch account info: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Broadcast a signed transaction
   */
  async broadcastTransaction(signedTxn: Uint8Array | string): Promise<{
    txId: string;
    success: boolean;
  }> {
    try {
      console.log('📡 [Dappflow] Broadcasting transaction...');
      
      // Ensure we have Uint8Array
      let txnBytes: Uint8Array;
      if (typeof signedTxn === 'string') {
        // Assume base64 encoded
        const binaryString = atob(signedTxn);
        txnBytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          txnBytes[i] = binaryString.charCodeAt(i);
        }
      } else {
        txnBytes = signedTxn;
      }
      
      const response = await fetch(`${this.baseUrl}/v2/transactions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-binary',
          ...(this.apiKey && { 'X-API-Key': this.apiKey })
        },
        body: txnBytes
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Dappflow broadcast error: ${response.status} - ${errorText}`);
      }
      
      const result = await response.json();
      
      console.log(`✅ [Dappflow] Transaction broadcast successful: ${result.txId}`);
      
      return {
        txId: result.txId,
        success: true
      };
    } catch (error) {
      console.error('[Dappflow] Broadcast error:', error);
      throw new Error(`Failed to broadcast transaction: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get suggested transaction parameters
   */
  async getSuggestedParams(): Promise<{
    fee: number;
    firstRound: number;
    lastRound: number;
    genesisID: string;
    genesisHash: string;
    minFee: number;
  }> {
    try {
      console.log('🔍 [Dappflow] Fetching suggested params...');
      
      const response = await fetch(
        `${this.baseUrl}/v2/transactions/params`,
        { headers: this.getHeaders() }
      );
      
      if (!response.ok) {
        throw new Error(`Dappflow API error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      console.log(`✅ [Dappflow] Suggested params retrieved`);
      
      return {
        fee: data.fee || data['min-fee'],
        firstRound: data['last-round'] + 1,
        lastRound: data['last-round'] + 1000,
        genesisID: data['genesis-id'],
        genesisHash: data['genesis-hash'],
        minFee: data['min-fee']
      };
    } catch (error) {
      console.error('[Dappflow] Suggested params fetch error:', error);
      throw new Error(`Failed to fetch suggested params: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get node status
   */
  async getNodeStatus(): Promise<{
    lastRound: number;
    timeSinceLastRound: number;
  }> {
    try {
      console.log('🔍 [Dappflow] Fetching node status...');
      
      const response = await fetch(
        `${this.baseUrl}/v2/status`,
        { headers: this.getHeaders() }
      );
      
      if (!response.ok) {
        throw new Error(`Dappflow API error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      console.log(`✅ [Dappflow] Node status retrieved, last round: ${data['last-round']}`);
      
      return {
        lastRound: data['last-round'],
        timeSinceLastRound: data['time-since-last-round']
      };
    } catch (error) {
      console.error('[Dappflow] Node status fetch error:', error);
      throw new Error(`Failed to fetch node status: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get transaction history (basic - for advanced queries use indexer)
   */
  async getTransactionHistory(
    address: string, 
    limit: number = 50
  ): Promise<{
    transactions: Array<{
      txid: string;
      confirmedRound: number;
      roundTime: number;
      sender: string;
      receiver?: string;
      amount?: number;
      fee: number;
      type: string;
    }>;
    currentRound: number;
  }> {
    try {
      console.log(`🔍 [Dappflow] Fetching transaction history for: ${address}`);
      
      const response = await fetch(
        `${this.baseUrl}/v2/accounts/${address}/transactions?limit=${limit}`,
        { headers: this.getHeaders() }
      );
      
      if (!response.ok) {
        throw new Error(`Dappflow API error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      console.log(`✅ [Dappflow] Found ${data.transactions?.length || 0} transactions`);
      
      // Transform to standard format
      const transactions = (data.transactions || []).map((tx: DappflowTransaction) => ({
        txid: tx.id,
        confirmedRound: tx['confirmed-round'],
        roundTime: tx['round-time'],
        sender: tx.sender,
        receiver: tx['payment-transaction']?.receiver || tx['asset-transfer-transaction']?.receiver,
        amount: tx['payment-transaction']?.amount || tx['asset-transfer-transaction']?.amount,
        fee: tx.fee,
        type: tx['tx-type']
      }));
      
      return {
        transactions,
        currentRound: data['current-round'] || 0
      };
    } catch (error) {
      console.error('[Dappflow] Transaction history fetch error:', error);
      throw new Error(`Failed to fetch transaction history: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

// Singleton instances for convenience
export const dappflowMainnet = new DappflowAPI('mainnet');
export const dappflowTestnet = new DappflowAPI('testnet');

