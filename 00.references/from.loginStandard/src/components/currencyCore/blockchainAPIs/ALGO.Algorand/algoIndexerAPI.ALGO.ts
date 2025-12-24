// Algorand Indexer API Implementation
// API Docs: https://developer.algorand.org/docs/rest-apis/indexer/
// Free tier: Self-hosted or use public indexer nodes
// Public indexers available from Algonode.io, PureStake, etc.

export interface IndexerTransaction {
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
    'close-remainder-to'?: string;
  };
  'asset-transfer-transaction'?: {
    amount: number;
    'asset-id': number;
    receiver: string;
    sender?: string;
  };
  'asset-config-transaction'?: {
    'asset-id': number;
  };
  'asset-freeze-transaction'?: {
    'asset-id': number;
    address: string;
    'new-freeze-status': boolean;
  };
  'application-transaction'?: {
    'application-id': number;
  };
  'tx-type': string;
  'intra-round-offset': number;
}

export interface IndexerAccountInfo {
  address: string;
  amount: number;
  'amount-without-pending-rewards': number;
  'apps-local-state'?: unknown[];
  'apps-total-schema'?: unknown;
  assets?: unknown[];
  'auth-addr'?: string;
  'created-apps'?: unknown[];
  'created-assets'?: unknown[];
  'deleted': boolean;
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

export interface IndexerTransactionsResponse {
  'current-round': number;
  'next-token'?: string;
  transactions: IndexerTransaction[];
}

export interface IndexerConfig {
  apiKey?: string;
  token?: string;
}

export class AlgoIndexerAPI {
  private baseUrl: string;
  private network: 'mainnet' | 'testnet';
  private apiKey?: string;

  constructor(network: 'mainnet' | 'testnet' = 'mainnet', config?: IndexerConfig) {
    this.network = network;
    this.apiKey = config?.apiKey || config?.token;
    
    // Using Algonode.io free public indexer
    this.baseUrl = network === 'mainnet' 
      ? 'https://mainnet-idx.algonode.cloud'
      : 'https://testnet-idx.algonode.cloud';
  }

  /**
   * Get headers for API requests
   */
  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json'
    };
    
    if (this.apiKey) {
      headers['X-Indexer-API-Token'] = this.apiKey;
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
      console.log(`🔍 [AlgoIndexer] Fetching balance for: ${address}`);
      
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
        throw new Error(`AlgoIndexer API error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      const account: IndexerAccountInfo = data.account;
      
      console.log(`✅ [AlgoIndexer] Balance: ${account.amount} microAlgos (${account.amount / 1000000} ALGO)`);
      
      return {
        balance: account.amount,
        balanceAlgo: account.amount / 1000000,
        pendingRewards: account['pending-rewards'] || 0,
        minBalance: account['min-balance'] || 100000,
        round: account.round
      };
    } catch (error) {
      console.error('[AlgoIndexer] Balance fetch error:', error);
      throw new Error(`Failed to fetch balance: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get account information
   */
  async getAccountInfo(address: string): Promise<IndexerAccountInfo> {
    try {
      console.log(`🔍 [AlgoIndexer] Fetching account info for: ${address}`);
      
      const response = await fetch(
        `${this.baseUrl}/v2/accounts/${address}`,
        { headers: this.getHeaders() }
      );
      
      if (!response.ok) {
        throw new Error(`AlgoIndexer API error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      console.log(`✅ [AlgoIndexer] Account info retrieved`);
      
      return data.account;
    } catch (error) {
      console.error('[AlgoIndexer] Account info fetch error:', error);
      throw new Error(`Failed to fetch account info: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get transaction history for an address
   * Indexer provides much better transaction history than algod
   */
  async getTransactionHistory(
    address: string, 
    limit: number = 50,
    nextToken?: string,
    minRound?: number,
    maxRound?: number
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
      assetId?: number;
      closeAmount?: number;
    }>;
    nextToken?: string;
    currentRound: number;
  }> {
    try {
      console.log(`🔍 [AlgoIndexer] Fetching transaction history for: ${address}`);
      
      let url = `${this.baseUrl}/v2/accounts/${address}/transactions?limit=${limit}`;
      if (nextToken) {
        url += `&next=${nextToken}`;
      }
      if (minRound) {
        url += `&min-round=${minRound}`;
      }
      if (maxRound) {
        url += `&max-round=${maxRound}`;
      }
      
      const response = await fetch(url, { headers: this.getHeaders() });
      
      if (!response.ok) {
        throw new Error(`AlgoIndexer API error: ${response.status} ${response.statusText}`);
      }
      
      const data: IndexerTransactionsResponse = await response.json();
      
      console.log(`✅ [AlgoIndexer] Found ${data.transactions.length} transactions`);
      
      // Transform to standard format
      const transactions = data.transactions.map(tx => ({
        txid: tx.id,
        confirmedRound: tx['confirmed-round'],
        roundTime: tx['round-time'],
        sender: tx.sender,
        receiver: tx['payment-transaction']?.receiver || tx['asset-transfer-transaction']?.receiver,
        amount: tx['payment-transaction']?.amount || tx['asset-transfer-transaction']?.amount,
        fee: tx.fee,
        type: tx['tx-type'],
        assetId: tx['asset-transfer-transaction']?.['asset-id'] || 
                 tx['asset-config-transaction']?.['asset-id'] ||
                 tx['asset-freeze-transaction']?.['asset-id'],
        closeAmount: tx['payment-transaction']?.['close-amount']
      }));
      
      return {
        transactions,
        nextToken: data['next-token'],
        currentRound: data['current-round']
      };
    } catch (error) {
      console.error('[AlgoIndexer] Transaction history fetch error:', error);
      throw new Error(`Failed to fetch transaction history: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Search for transactions with various filters
   */
  async searchTransactions(params: {
    address?: string;
    addressRole?: 'sender' | 'receiver' | 'freeze-target';
    assetId?: number;
    minRound?: number;
    maxRound?: number;
    txType?: string;
    limit?: number;
    nextToken?: string;
  }): Promise<IndexerTransactionsResponse> {
    try {
      console.log('🔍 [AlgoIndexer] Searching transactions...');
      
      const urlParams = new URLSearchParams();
      
      if (params.address) urlParams.set('address', params.address);
      if (params.addressRole) urlParams.set('address-role', params.addressRole);
      if (params.assetId) urlParams.set('asset-id', params.assetId.toString());
      if (params.minRound) urlParams.set('min-round', params.minRound.toString());
      if (params.maxRound) urlParams.set('max-round', params.maxRound.toString());
      if (params.txType) urlParams.set('tx-type', params.txType);
      if (params.limit) urlParams.set('limit', params.limit.toString());
      if (params.nextToken) urlParams.set('next', params.nextToken);
      
      const response = await fetch(
        `${this.baseUrl}/v2/transactions?${urlParams.toString()}`,
        { headers: this.getHeaders() }
      );
      
      if (!response.ok) {
        throw new Error(`AlgoIndexer API error: ${response.status} ${response.statusText}`);
      }
      
      const data: IndexerTransactionsResponse = await response.json();
      
      console.log(`✅ [AlgoIndexer] Found ${data.transactions.length} transactions`);
      
      return data;
    } catch (error) {
      console.error('[AlgoIndexer] Transaction search error:', error);
      throw new Error(`Failed to search transactions: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get transaction by ID
   */
  async getTransaction(txid: string): Promise<IndexerTransaction | null> {
    try {
      console.log(`🔍 [AlgoIndexer] Fetching transaction: ${txid}`);
      
      const response = await fetch(
        `${this.baseUrl}/v2/transactions/${txid}`,
        { headers: this.getHeaders() }
      );
      
      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        throw new Error(`AlgoIndexer API error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      console.log(`✅ [AlgoIndexer] Transaction found`);
      
      return data.transaction;
    } catch (error) {
      console.error('[AlgoIndexer] Transaction fetch error:', error);
      throw new Error(`Failed to fetch transaction: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get network health/status
   */
  async getHealth(): Promise<{
    round: number;
    isMigrating: boolean;
    dbAvailable: boolean;
    message: string;
  }> {
    try {
      console.log('🔍 [AlgoIndexer] Checking health...');
      
      const response = await fetch(
        `${this.baseUrl}/health`,
        { headers: this.getHeaders() }
      );
      
      const data = await response.json();
      
      console.log(`✅ [AlgoIndexer] Health check complete`);
      
      return {
        round: data.round || 0,
        isMigrating: data['is-migrating'] || false,
        dbAvailable: data['db-available'] !== false,
        message: data.message || 'OK'
      };
    } catch (error) {
      console.error('[AlgoIndexer] Health check error:', error);
      throw new Error(`Failed to check health: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Search for assets
   */
  async searchAssets(params: {
    assetId?: number;
    creator?: string;
    name?: string;
    unit?: string;
    limit?: number;
    nextToken?: string;
  }): Promise<{
    assets: unknown[];
    currentRound: number;
    nextToken?: string;
  }> {
    try {
      console.log('🔍 [AlgoIndexer] Searching assets...');
      
      const urlParams = new URLSearchParams();
      
      if (params.assetId) urlParams.set('asset-id', params.assetId.toString());
      if (params.creator) urlParams.set('creator', params.creator);
      if (params.name) urlParams.set('name', params.name);
      if (params.unit) urlParams.set('unit', params.unit);
      if (params.limit) urlParams.set('limit', params.limit.toString());
      if (params.nextToken) urlParams.set('next', params.nextToken);
      
      const response = await fetch(
        `${this.baseUrl}/v2/assets?${urlParams.toString()}`,
        { headers: this.getHeaders() }
      );
      
      if (!response.ok) {
        throw new Error(`AlgoIndexer API error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      console.log(`✅ [AlgoIndexer] Found ${data.assets?.length || 0} assets`);
      
      return {
        assets: data.assets || [],
        currentRound: data['current-round'],
        nextToken: data['next-token']
      };
    } catch (error) {
      console.error('[AlgoIndexer] Asset search error:', error);
      throw new Error(`Failed to search assets: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

// Singleton instances for convenience
export const algoIndexerMainnet = new AlgoIndexerAPI('mainnet');
export const algoIndexerTestnet = new AlgoIndexerAPI('testnet');

