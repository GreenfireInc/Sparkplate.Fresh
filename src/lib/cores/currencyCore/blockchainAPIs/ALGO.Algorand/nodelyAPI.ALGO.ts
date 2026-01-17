// Nodely API Implementation for Algorand
// API Docs: https://nodely.io/docs/free/start
// Free tier: Public API, no API key required
// Supports MainNet, TestNet, BetaNet, and FNet
// Provides both Algod and Indexer endpoints

export interface NodelyAccountInfo {
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

export interface NodelyTransaction {
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

export type NodelyNetwork = 'mainnet' | 'testnet' | 'betanet' | 'fnet';

export class NodelyAPI {
  private algodUrl: string;
  private indexerUrl: string;
  private network: NodelyNetwork;

  constructor(network: NodelyNetwork = 'mainnet') {
    this.network = network;
    
    // Nodely endpoints (free public access)
    switch (network) {
      case 'mainnet':
        this.algodUrl = 'https://mainnet-api.4160.nodely.dev';
        this.indexerUrl = 'https://mainnet-idx.4160.nodely.dev';
        break;
      case 'testnet':
        this.algodUrl = 'https://testnet-api.4160.nodely.dev';
        this.indexerUrl = 'https://testnet-idx.4160.nodely.dev';
        break;
      case 'betanet':
        this.algodUrl = 'https://betanet-api.4160.nodely.dev';
        this.indexerUrl = 'https://betanet-idx.4160.nodely.dev';
        break;
      case 'fnet':
        this.algodUrl = 'https://fnet-api.4160.nodely.dev';
        this.indexerUrl = 'https://fnet-idx.4160.nodely.dev';
        break;
      default:
        this.algodUrl = 'https://mainnet-api.4160.nodely.dev';
        this.indexerUrl = 'https://mainnet-idx.4160.nodely.dev';
    }
  }

  /**
   * Get headers for API requests
   */
  private getHeaders(): HeadersInit {
    return {
      'Content-Type': 'application/json'
    };
  }

  /**
   * Get account balance and information (using Algod)
   */
  async getBalance(address: string): Promise<{
    balance: number; // in microAlgos
    balanceAlgo: number; // in ALGO
    pendingRewards: number;
    minBalance: number;
    round: number;
  }> {
    try {
      console.log(`🔍 [Nodely] Fetching balance for: ${address}`);
      
      const response = await fetch(
        `${this.algodUrl}/v2/accounts/${address}`,
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
        throw new Error(`Nodely API error: ${response.status} ${response.statusText}`);
      }
      
      const data: NodelyAccountInfo = await response.json();
      
      console.log(`✅ [Nodely] Balance: ${data.amount} microAlgos (${data.amount / 1000000} ALGO)`);
      
      return {
        balance: data.amount,
        balanceAlgo: data.amount / 1000000,
        pendingRewards: data['pending-rewards'] || 0,
        minBalance: data['min-balance'] || 100000,
        round: data.round
      };
    } catch (error) {
      console.error('[Nodely] Balance fetch error:', error);
      throw new Error(`Failed to fetch balance: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get account information (using Algod)
   */
  async getAccountInfo(address: string): Promise<NodelyAccountInfo> {
    try {
      console.log(`🔍 [Nodely] Fetching account info for: ${address}`);
      
      const response = await fetch(
        `${this.algodUrl}/v2/accounts/${address}`,
        { headers: this.getHeaders() }
      );
      
      if (!response.ok) {
        throw new Error(`Nodely API error: ${response.status} ${response.statusText}`);
      }
      
      const data: NodelyAccountInfo = await response.json();
      
      console.log(`✅ [Nodely] Account info retrieved`);
      
      return data;
    } catch (error) {
      console.error('[Nodely] Account info fetch error:', error);
      throw new Error(`Failed to fetch account info: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Broadcast a signed transaction (using Algod)
   */
  async broadcastTransaction(signedTxn: Uint8Array | string): Promise<{
    txId: string;
    success: boolean;
  }> {
    try {
      console.log('📡 [Nodely] Broadcasting transaction...');
      
      // Ensure we have Uint8Array
      let txnBytes: Uint8Array;
      if (typeof signedTxn === 'string') {
        const binaryString = atob(signedTxn);
        txnBytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          txnBytes[i] = binaryString.charCodeAt(i);
        }
      } else {
        txnBytes = signedTxn;
      }
      
      const response = await fetch(`${this.algodUrl}/v2/transactions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-binary'
        },
        body: txnBytes
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Nodely broadcast error: ${response.status} - ${errorText}`);
      }
      
      const result = await response.json();
      
      console.log(`✅ [Nodely] Transaction broadcast successful: ${result.txId}`);
      
      return {
        txId: result.txId,
        success: true
      };
    } catch (error) {
      console.error('[Nodely] Broadcast error:', error);
      throw new Error(`Failed to broadcast transaction: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get suggested transaction parameters (using Algod)
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
      console.log('🔍 [Nodely] Fetching suggested params...');
      
      const response = await fetch(
        `${this.algodUrl}/v2/transactions/params`,
        { headers: this.getHeaders() }
      );
      
      if (!response.ok) {
        throw new Error(`Nodely API error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      console.log(`✅ [Nodely] Suggested params retrieved`);
      
      return {
        fee: data.fee || data['min-fee'],
        firstRound: data['last-round'] + 1,
        lastRound: data['last-round'] + 1000,
        genesisID: data['genesis-id'],
        genesisHash: data['genesis-hash'],
        minFee: data['min-fee']
      };
    } catch (error) {
      console.error('[Nodely] Suggested params fetch error:', error);
      throw new Error(`Failed to fetch suggested params: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get node status (using Algod)
   */
  async getNodeStatus(): Promise<{
    lastRound: number;
    timeSinceLastRound: number;
  }> {
    try {
      console.log('🔍 [Nodely] Fetching node status...');
      
      const response = await fetch(
        `${this.algodUrl}/v2/status`,
        { headers: this.getHeaders() }
      );
      
      if (!response.ok) {
        throw new Error(`Nodely API error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      console.log(`✅ [Nodely] Node status retrieved, last round: ${data['last-round']}`);
      
      return {
        lastRound: data['last-round'],
        timeSinceLastRound: data['time-since-last-round']
      };
    } catch (error) {
      console.error('[Nodely] Node status fetch error:', error);
      throw new Error(`Failed to fetch node status: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get transaction history (using Indexer)
   */
  async getTransactionHistory(
    address: string, 
    limit: number = 50,
    nextToken?: string
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
    nextToken?: string;
    currentRound: number;
  }> {
    try {
      console.log(`🔍 [Nodely] Fetching transaction history for: ${address}`);
      
      let url = `${this.indexerUrl}/v2/accounts/${address}/transactions?limit=${limit}`;
      if (nextToken) {
        url += `&next=${nextToken}`;
      }
      
      const response = await fetch(url, { headers: this.getHeaders() });
      
      if (!response.ok) {
        throw new Error(`Nodely API error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      console.log(`✅ [Nodely] Found ${data.transactions?.length || 0} transactions`);
      
      // Transform to standard format
      const transactions = (data.transactions || []).map((tx: NodelyTransaction) => ({
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
        nextToken: data['next-token'],
        currentRound: data['current-round'] || 0
      };
    } catch (error) {
      console.error('[Nodely] Transaction history fetch error:', error);
      throw new Error(`Failed to fetch transaction history: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Search for transactions (using Indexer)
   */
  async searchTransactions(params: {
    address?: string;
    assetId?: number;
    minRound?: number;
    maxRound?: number;
    limit?: number;
    nextToken?: string;
  }): Promise<{
    transactions: NodelyTransaction[];
    nextToken?: string;
    currentRound: number;
  }> {
    try {
      console.log('🔍 [Nodely] Searching transactions...');
      
      const urlParams = new URLSearchParams();
      if (params.address) urlParams.set('address', params.address);
      if (params.assetId) urlParams.set('asset-id', params.assetId.toString());
      if (params.minRound) urlParams.set('min-round', params.minRound.toString());
      if (params.maxRound) urlParams.set('max-round', params.maxRound.toString());
      if (params.limit) urlParams.set('limit', params.limit.toString());
      if (params.nextToken) urlParams.set('next', params.nextToken);
      
      const response = await fetch(
        `${this.indexerUrl}/v2/transactions?${urlParams.toString()}`,
        { headers: this.getHeaders() }
      );
      
      if (!response.ok) {
        throw new Error(`Nodely API error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      console.log(`✅ [Nodely] Found ${data.transactions?.length || 0} transactions`);
      
      return {
        transactions: data.transactions || [],
        nextToken: data['next-token'],
        currentRound: data['current-round'] || 0
      };
    } catch (error) {
      console.error('[Nodely] Transaction search error:', error);
      throw new Error(`Failed to search transactions: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

// Singleton instances for convenience
export const nodelyMainnet = new NodelyAPI('mainnet');
export const nodelyTestnet = new NodelyAPI('testnet');
export const nodelyBetanet = new NodelyAPI('betanet');
export const nodelyFnet = new NodelyAPI('fnet');

