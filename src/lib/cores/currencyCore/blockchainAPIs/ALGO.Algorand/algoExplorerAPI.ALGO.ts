// AlgoExplorer API Implementation for Algorand
// API Docs: https://algoexplorer.io/api-dev/v2
// Free tier: Public API with rate limits
// Note: Algorand is account-based, not UTXO-based

export interface AlgoExplorerTransaction {
  id: string;
  'confirmed-round': number;
  'round-time': number;
  'sender': string;
  'fee': number;
  'payment-transaction'?: {
    'receiver': string;
    'amount': number;
  };
  'tx-type': string;
  'close-rewards'?: number;
  'closing-amount'?: number;
  'receiver-rewards'?: number;
  'sender-rewards'?: number;
}

export interface AlgoExplorerAccountInfo {
  address: string;
  amount: number; // Balance in microAlgos
  'amount-without-pending-rewards': number;
  'pending-rewards': number;
  'min-balance': number;
  'rewards': number;
  'round': number;
  'status': string;
  'total-apps-opted-in': number;
  'total-assets-opted-in': number;
  'total-created-apps': number;
  'total-created-assets': number;
}

export interface AlgoExplorerTransactionResponse {
  transactions: AlgoExplorerTransaction[];
  'next-token'?: string;
  'current-round': number;
}

export class AlgoExplorerAPI {
  private baseUrl: string;
  private network: 'mainnet' | 'testnet';

  constructor(network: 'mainnet' | 'testnet' = 'mainnet') {
    this.network = network;
    this.baseUrl = network === 'mainnet' 
      ? 'https://algoexplorerapi.io'
      : 'https://testnet.algoexplorerapi.io';
  }

  /**
   * Get account balance and information
   */
  async getBalance(address: string): Promise<{
    balance: number; // in microAlgos (1 ALGO = 1,000,000 microAlgos)
    balanceAlgo: number; // in ALGO
    pendingRewards: number;
    minBalance: number;
    round: number;
  }> {
    try {
      console.log(`🔍 [AlgoExplorer] Fetching balance for: ${address}`);
      
      const response = await fetch(`${this.baseUrl}/v2/accounts/${address}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          // Account doesn't exist yet (0 balance)
          return {
            balance: 0,
            balanceAlgo: 0,
            pendingRewards: 0,
            minBalance: 100000, // Default min balance
            round: 0
          };
        }
        throw new Error(`AlgoExplorer API error: ${response.status} ${response.statusText}`);
      }
      
      const data: AlgoExplorerAccountInfo = await response.json();
      
      console.log(`✅ [AlgoExplorer] Balance: ${data.amount} microAlgos (${data.amount / 1000000} ALGO)`);
      
      return {
        balance: data.amount,
        balanceAlgo: data.amount / 1000000,
        pendingRewards: data['pending-rewards'] || 0,
        minBalance: data['min-balance'] || 100000,
        round: data.round
      };
    } catch (error) {
      console.error('[AlgoExplorer] Balance fetch error:', error);
      throw new Error(`Failed to fetch balance: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get account information including asset holdings
   */
  async getAccountInfo(address: string): Promise<AlgoExplorerAccountInfo> {
    try {
      console.log(`🔍 [AlgoExplorer] Fetching account info for: ${address}`);
      
      const response = await fetch(`${this.baseUrl}/v2/accounts/${address}`);
      
      if (!response.ok) {
        throw new Error(`AlgoExplorer API error: ${response.status} ${response.statusText}`);
      }
      
      const data: AlgoExplorerAccountInfo = await response.json();
      
      console.log(`✅ [AlgoExplorer] Account info retrieved`);
      
      return data;
    } catch (error) {
      console.error('[AlgoExplorer] Account info fetch error:', error);
      throw new Error(`Failed to fetch account info: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Broadcast a signed transaction
   */
  async broadcastTransaction(signedTxn: string | Uint8Array): Promise<{
    txId: string;
    success: boolean;
  }> {
    try {
      console.log('📡 [AlgoExplorer] Broadcasting transaction...');
      
      // Convert Uint8Array to base64 if needed
      let txnData: string;
      if (typeof signedTxn === 'string') {
        txnData = signedTxn;
      } else {
        // Convert Uint8Array to base64
        txnData = btoa(String.fromCharCode(...signedTxn));
      }
      
      const response = await fetch(`${this.baseUrl}/v2/transactions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-binary'
        },
        body: atob(txnData) // Decode base64 to binary
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`AlgoExplorer broadcast error: ${response.status} - ${errorText}`);
      }
      
      const result = await response.json();
      
      console.log(`✅ [AlgoExplorer] Transaction broadcast successful: ${result.txId}`);
      
      return {
        txId: result.txId,
        success: true
      };
    } catch (error) {
      console.error('[AlgoExplorer] Broadcast error:', error);
      throw new Error(`Failed to broadcast transaction: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get transaction history for an address
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
      console.log(`🔍 [AlgoExplorer] Fetching transaction history for: ${address}`);
      
      let url = `${this.baseUrl}/v2/accounts/${address}/transactions?limit=${limit}`;
      if (nextToken) {
        url += `&next=${nextToken}`;
      }
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`AlgoExplorer API error: ${response.status} ${response.statusText}`);
      }
      
      const data: AlgoExplorerTransactionResponse = await response.json();
      
      console.log(`✅ [AlgoExplorer] Found ${data.transactions.length} transactions`);
      
      // Transform to standard format
      const transactions = data.transactions.map(tx => ({
        txid: tx.id,
        confirmedRound: tx['confirmed-round'],
        roundTime: tx['round-time'],
        sender: tx.sender,
        receiver: tx['payment-transaction']?.receiver,
        amount: tx['payment-transaction']?.amount,
        fee: tx.fee,
        type: tx['tx-type']
      }));
      
      return {
        transactions,
        nextToken: data['next-token'],
        currentRound: data['current-round']
      };
    } catch (error) {
      console.error('[AlgoExplorer] Transaction history fetch error:', error);
      throw new Error(`Failed to fetch transaction history: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get network statistics
   */
  async getNetworkStats(): Promise<{
    currentRound: number;
    lastRoundTime: number;
  }> {
    try {
      console.log('🔍 [AlgoExplorer] Fetching network stats...');
      
      const response = await fetch(`${this.baseUrl}/v2/status`);
      
      if (!response.ok) {
        throw new Error(`AlgoExplorer API error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      console.log(`✅ [AlgoExplorer] Current round: ${data['last-round']}`);
      
      return {
        currentRound: data['last-round'],
        lastRoundTime: data['last-round-time'] || Date.now() / 1000
      };
    } catch (error) {
      console.error('[AlgoExplorer] Network stats fetch error:', error);
      throw new Error(`Failed to fetch network stats: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get transaction by ID
   */
  async getTransaction(txid: string): Promise<AlgoExplorerTransaction | null> {
    try {
      console.log(`🔍 [AlgoExplorer] Fetching transaction: ${txid}`);
      
      const response = await fetch(`${this.baseUrl}/v2/transactions/${txid}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        throw new Error(`AlgoExplorer API error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      console.log(`✅ [AlgoExplorer] Transaction found`);
      
      return data.transaction;
    } catch (error) {
      console.error('[AlgoExplorer] Transaction fetch error:', error);
      throw new Error(`Failed to fetch transaction: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

// Singleton instances for convenience
export const algoExplorerMainnet = new AlgoExplorerAPI('mainnet');
export const algoExplorerTestnet = new AlgoExplorerAPI('testnet');

