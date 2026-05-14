// Algorand Node API (Algod) Implementation
// API Docs: https://developer.algorand.org/docs/rest-apis/algod/
// Free tier: Self-hosted or use public nodes
// Public nodes available from Algonode.io, PureStake, etc.

export interface AlgodAccountInfo {
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

export interface AlgodTransaction {
  id: string;
  'confirmed-round'?: number;
  'round-time'?: number;
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
  'tx-type': string;
}

export interface AlgodConfig {
  apiKey?: string; // Optional API key for authenticated access
  token?: string; // Alternative name for API key
}

export class AlgoNodeAPI {
  private baseUrl: string;
  private network: 'mainnet' | 'testnet';
  private apiKey?: string;

  constructor(network: 'mainnet' | 'testnet' = 'mainnet', config?: AlgodConfig) {
    this.network = network;
    this.apiKey = config?.apiKey || config?.token;
    
    // Using Algonode.io free public nodes
    this.baseUrl = network === 'mainnet' 
      ? 'https://mainnet-api.algonode.cloud'
      : 'https://testnet-api.algonode.cloud';
  }

  /**
   * Get headers for API requests
   */
  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json'
    };
    
    if (this.apiKey) {
      headers['X-Algo-API-Token'] = this.apiKey;
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
      console.log(`🔍 [AlgoNode] Fetching balance for: ${address}`);
      
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
        throw new Error(`AlgoNode API error: ${response.status} ${response.statusText}`);
      }
      
      const data: AlgodAccountInfo = await response.json();
      
      console.log(`✅ [AlgoNode] Balance: ${data.amount} microAlgos (${data.amount / 1000000} ALGO)`);
      
      return {
        balance: data.amount,
        balanceAlgo: data.amount / 1000000,
        pendingRewards: data['pending-rewards'] || 0,
        minBalance: data['min-balance'] || 100000,
        round: data.round
      };
    } catch (error) {
      console.error('[AlgoNode] Balance fetch error:', error);
      throw new Error(`Failed to fetch balance: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get full account information
   */
  async getAccountInfo(address: string): Promise<AlgodAccountInfo> {
    try {
      console.log(`🔍 [AlgoNode] Fetching account info for: ${address}`);
      
      const response = await fetch(
        `${this.baseUrl}/v2/accounts/${address}`,
        { headers: this.getHeaders() }
      );
      
      if (!response.ok) {
        throw new Error(`AlgoNode API error: ${response.status} ${response.statusText}`);
      }
      
      const data: AlgodAccountInfo = await response.json();
      
      console.log(`✅ [AlgoNode] Account info retrieved`);
      
      return data;
    } catch (error) {
      console.error('[AlgoNode] Account info fetch error:', error);
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
      console.log('📡 [AlgoNode] Broadcasting transaction...');
      
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
          ...(this.apiKey && { 'X-Algo-API-Token': this.apiKey })
        },
        body: txnBytes
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`AlgoNode broadcast error: ${response.status} - ${errorText}`);
      }
      
      const result = await response.json();
      
      console.log(`✅ [AlgoNode] Transaction broadcast successful: ${result.txId}`);
      
      return {
        txId: result.txId,
        success: true
      };
    } catch (error) {
      console.error('[AlgoNode] Broadcast error:', error);
      throw new Error(`Failed to broadcast transaction: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get suggested transaction parameters (needed for creating transactions)
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
      console.log('🔍 [AlgoNode] Fetching suggested params...');
      
      const response = await fetch(
        `${this.baseUrl}/v2/transactions/params`,
        { headers: this.getHeaders() }
      );
      
      if (!response.ok) {
        throw new Error(`AlgoNode API error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      console.log(`✅ [AlgoNode] Suggested params retrieved`);
      
      return {
        fee: data.fee || data['min-fee'],
        firstRound: data['last-round'] + 1,
        lastRound: data['last-round'] + 1000,
        genesisID: data['genesis-id'],
        genesisHash: data['genesis-hash'],
        minFee: data['min-fee']
      };
    } catch (error) {
      console.error('[AlgoNode] Suggested params fetch error:', error);
      throw new Error(`Failed to fetch suggested params: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get current node status
   */
  async getNodeStatus(): Promise<{
    lastRound: number;
    lastVersion: string;
    nextVersion: string;
    nextVersionRound: number;
    nextVersionSupported: boolean;
    stoppedAtUnsupportedRound: boolean;
    timeSinceLastRound: number;
  }> {
    try {
      console.log('🔍 [AlgoNode] Fetching node status...');
      
      const response = await fetch(
        `${this.baseUrl}/v2/status`,
        { headers: this.getHeaders() }
      );
      
      if (!response.ok) {
        throw new Error(`AlgoNode API error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      console.log(`✅ [AlgoNode] Node status retrieved, last round: ${data['last-round']}`);
      
      return {
        lastRound: data['last-round'],
        lastVersion: data['last-version'],
        nextVersion: data['next-version'],
        nextVersionRound: data['next-version-round'],
        nextVersionSupported: data['next-version-supported'],
        stoppedAtUnsupportedRound: data['stopped-at-unsupported-round'],
        timeSinceLastRound: data['time-since-last-round']
      };
    } catch (error) {
      console.error('[AlgoNode] Node status fetch error:', error);
      throw new Error(`Failed to fetch node status: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Wait for a transaction to be confirmed
   */
  async waitForConfirmation(txId: string, timeout: number = 30000): Promise<{
    confirmedRound: number;
    poolError: string;
  }> {
    try {
      console.log(`⏳ [AlgoNode] Waiting for confirmation: ${txId}`);
      
      const startTime = Date.now();
      let lastRound = (await this.getNodeStatus()).lastRound;
      
      while (Date.now() - startTime < timeout) {
        const response = await fetch(
          `${this.baseUrl}/v2/transactions/pending/${txId}`,
          { headers: this.getHeaders() }
        );
        
        if (response.ok) {
          const data = await response.json();
          
          if (data['confirmed-round']) {
            console.log(`✅ [AlgoNode] Transaction confirmed in round: ${data['confirmed-round']}`);
            return {
              confirmedRound: data['confirmed-round'],
              poolError: data['pool-error'] || ''
            };
          }
          
          if (data['pool-error']) {
            throw new Error(`Transaction pool error: ${data['pool-error']}`);
          }
        }
        
        // Wait for next round
        await new Promise(resolve => setTimeout(resolve, 1000));
        lastRound++;
        
        // Check if transaction might have been confirmed
        const statusResponse = await fetch(
          `${this.baseUrl}/v2/status/wait-for-block-after/${lastRound}`,
          { headers: this.getHeaders() }
        );
        
        if (!statusResponse.ok) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }
      
      throw new Error('Transaction confirmation timeout');
    } catch (error) {
      console.error('[AlgoNode] Confirmation wait error:', error);
      throw new Error(`Failed to confirm transaction: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

// Singleton instances for convenience
export const algoNodeMainnet = new AlgoNodeAPI('mainnet');
export const algoNodeTestnet = new AlgoNodeAPI('testnet');

