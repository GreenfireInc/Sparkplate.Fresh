// PureStake API Implementation for Algorand
// API Docs: https://developer.purestake.io/home
// Free tier: 25,000 requests/day with API key
// Provides both Algod and Indexer endpoints

export interface PureStakeConfig {
  apiKey: string; // Required for PureStake
}

export interface PureStakeAccountInfo {
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

export interface PureStakeTransaction {
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

export class PureStakeAPI {
  private algodUrl: string;
  private indexerUrl: string;
  private network: 'mainnet' | 'testnet';
  private apiKey: string;

  constructor(network: 'mainnet' | 'testnet' = 'mainnet', config: PureStakeConfig) {
    if (!config.apiKey) {
      throw new Error('PureStake API requires an API key. Get one at https://developer.purestake.io/');
    }
    
    this.network = network;
    this.apiKey = config.apiKey;
    
    // PureStake endpoints
    const networkPrefix = network === 'mainnet' ? 'mainnet' : 'testnet';
    this.algodUrl = `https://${networkPrefix}-algorand.api.purestake.io/ps2`;
    this.indexerUrl = `https://${networkPrefix}-algorand.api.purestake.io/idx2`;
  }

  /**
   * Get headers for API requests
   */
  private getHeaders(): HeadersInit {
    return {
      'Content-Type': 'application/json',
      'x-api-key': this.apiKey
    };
  }

  /**
   * Get account balance (using Algod)
   */
  async getBalance(address: string): Promise<{
    balance: number; // in microAlgos
    balanceAlgo: number; // in ALGO
    pendingRewards: number;
    minBalance: number;
    round: number;
  }> {
    try {
      console.log(`🔍 [PureStake] Fetching balance for: ${address}`);
      
      const response = await fetch(
        `${this.algodUrl}/v2/accounts/${address}`,
        { headers: this.getHeaders() }
      );
      
      if (!response.ok) {
        if (response.status === 404) {
          return {
            balance: 0,
            balanceAlgo: 0,
            pendingRewards: 0,
            minBalance: 100000,
            round: 0
          };
        }
        throw new Error(`PureStake API error: ${response.status} ${response.statusText}`);
      }
      
      const data: PureStakeAccountInfo = await response.json();
      
      console.log(`✅ [PureStake] Balance: ${data.amount} microAlgos (${data.amount / 1000000} ALGO)`);
      
      return {
        balance: data.amount,
        balanceAlgo: data.amount / 1000000,
        pendingRewards: data['pending-rewards'] || 0,
        minBalance: data['min-balance'] || 100000,
        round: data.round
      };
    } catch (error) {
      console.error('[PureStake] Balance fetch error:', error);
      throw new Error(`Failed to fetch balance: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get account information
   */
  async getAccountInfo(address: string): Promise<PureStakeAccountInfo> {
    try {
      console.log(`🔍 [PureStake] Fetching account info for: ${address}`);
      
      const response = await fetch(
        `${this.algodUrl}/v2/accounts/${address}`,
        { headers: this.getHeaders() }
      );
      
      if (!response.ok) {
        throw new Error(`PureStake API error: ${response.status} ${response.statusText}`);
      }
      
      const data: PureStakeAccountInfo = await response.json();
      
      console.log(`✅ [PureStake] Account info retrieved`);
      
      return data;
    } catch (error) {
      console.error('[PureStake] Account info fetch error:', error);
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
      console.log('📡 [PureStake] Broadcasting transaction...');
      
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
          'Content-Type': 'application/x-binary',
          'x-api-key': this.apiKey
        },
        body: txnBytes
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`PureStake broadcast error: ${response.status} - ${errorText}`);
      }
      
      const result = await response.json();
      
      console.log(`✅ [PureStake] Transaction broadcast successful: ${result.txId}`);
      
      return {
        txId: result.txId,
        success: true
      };
    } catch (error) {
      console.error('[PureStake] Broadcast error:', error);
      throw new Error(`Failed to broadcast transaction: ${error instanceof Error ? error.message : 'Unknown error'}`);
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
      console.log(`🔍 [PureStake] Fetching transaction history for: ${address}`);
      
      let url = `${this.indexerUrl}/v2/accounts/${address}/transactions?limit=${limit}`;
      if (nextToken) {
        url += `&next=${nextToken}`;
      }
      
      const response = await fetch(url, { headers: this.getHeaders() });
      
      if (!response.ok) {
        throw new Error(`PureStake API error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      console.log(`✅ [PureStake] Found ${data.transactions.length} transactions`);
      
      // Transform to standard format
      const transactions = (data.transactions || []).map((tx: PureStakeTransaction) => ({
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
        currentRound: data['current-round']
      };
    } catch (error) {
      console.error('[PureStake] Transaction history fetch error:', error);
      throw new Error(`Failed to fetch transaction history: ${error instanceof Error ? error.message : 'Unknown error'}`);
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
      console.log('🔍 [PureStake] Fetching suggested params...');
      
      const response = await fetch(
        `${this.algodUrl}/v2/transactions/params`,
        { headers: this.getHeaders() }
      );
      
      if (!response.ok) {
        throw new Error(`PureStake API error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      console.log(`✅ [PureStake] Suggested params retrieved`);
      
      return {
        fee: data.fee || data['min-fee'],
        firstRound: data['last-round'] + 1,
        lastRound: data['last-round'] + 1000,
        genesisID: data['genesis-id'],
        genesisHash: data['genesis-hash'],
        minFee: data['min-fee']
      };
    } catch (error) {
      console.error('[PureStake] Suggested params fetch error:', error);
      throw new Error(`Failed to fetch suggested params: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get network status
   */
  async getNodeStatus(): Promise<{
    lastRound: number;
    timeSinceLastRound: number;
  }> {
    try {
      console.log('🔍 [PureStake] Fetching node status...');
      
      const response = await fetch(
        `${this.algodUrl}/v2/status`,
        { headers: this.getHeaders() }
      );
      
      if (!response.ok) {
        throw new Error(`PureStake API error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      console.log(`✅ [PureStake] Node status retrieved, last round: ${data['last-round']}`);
      
      return {
        lastRound: data['last-round'],
        timeSinceLastRound: data['time-since-last-round']
      };
    } catch (error) {
      console.error('[PureStake] Node status fetch error:', error);
      throw new Error(`Failed to fetch node status: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Search for assets (using Indexer)
   */
  async searchAssets(params: {
    assetId?: number;
    creator?: string;
    name?: string;
    limit?: number;
  }): Promise<{
    assets: unknown[];
    currentRound: number;
  }> {
    try {
      console.log('🔍 [PureStake] Searching assets...');
      
      const urlParams = new URLSearchParams();
      if (params.assetId) urlParams.set('asset-id', params.assetId.toString());
      if (params.creator) urlParams.set('creator', params.creator);
      if (params.name) urlParams.set('name', params.name);
      if (params.limit) urlParams.set('limit', params.limit.toString());
      
      const response = await fetch(
        `${this.indexerUrl}/v2/assets?${urlParams.toString()}`,
        { headers: this.getHeaders() }
      );
      
      if (!response.ok) {
        throw new Error(`PureStake API error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      console.log(`✅ [PureStake] Found ${data.assets?.length || 0} assets`);
      
      return {
        assets: data.assets || [],
        currentRound: data['current-round']
      };
    } catch (error) {
      console.error('[PureStake] Asset search error:', error);
      throw new Error(`Failed to search assets: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

// Note: PureStake requires API key, so no default singleton instances
// Users must create instances with their own API key:
// const api = new PureStakeAPI('mainnet', { apiKey: 'your-key' });

