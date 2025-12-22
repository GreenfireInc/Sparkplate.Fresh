// Mintscan API Implementation for Cosmos (ATOM)
// API Docs: https://docs.cosmostation.io/apis
// Free tier: Up to 2 requests/second, 10,000 calls/day without API key
// Enterprise-grade indexed API with comprehensive features
// Note: API key may be required for higher limits (approval flow)

export interface MintscanAccountInfo {
  account: {
    address: string;
    pub_key?: {
      type: string;
      value: string;
    };
    account_number: string;
    sequence: string;
  };
  balances: Array<{
    denom: string;
    amount: string;
  }>;
  delegations?: Array<{
    delegator_address: string;
    validator_address: string;
    shares: string;
  }>;
  unbonding_delegations?: unknown[];
  rewards?: unknown[];
}

export interface MintscanTransaction {
  txhash: string;
  height: string;
  timestamp: string;
  code?: number;
  raw_log?: string;
  gas_wanted: string;
  gas_used: string;
  tx: {
    body: {
      messages: unknown[];
      memo: string;
    };
    auth_info: {
      fee: {
        amount: Array<{
          denom: string;
          amount: string;
        }>;
        gas_limit: string;
      };
    };
  };
}

export interface MintscanBlock {
  block_id: {
    hash: string;
  };
  block: {
    header: {
      height: string;
      time: string;
      proposer_address: string;
    };
    data: {
      txs: string[];
    };
  };
}

export interface MintscanConfig {
  apiKey?: string; // Optional for higher limits
  network?: 'mainnet' | 'testnet';
}

export class MintscanAPI {
  private baseUrl: string;
  private apiKey?: string;
  private network: 'mainnet' | 'testnet';

  constructor(network: 'mainnet' | 'testnet' = 'mainnet', config?: MintscanConfig) {
    this.network = network;
    this.apiKey = config?.apiKey;
    
    // Mintscan API endpoints
    this.baseUrl = 'https://apis.mintscan.io/v1';
  }

  /**
   * Get headers for API requests
   */
  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
    
    if (this.apiKey) {
      headers['Authorization'] = `Bearer ${this.apiKey}`;
    }
    
    return headers;
  }

  /**
   * Get account balance and information
   */
  async getBalance(address: string): Promise<{
    balance: string; // in uatom (microatom)
    balanceAtom: number; // in ATOM
    denom: string;
    allBalances: Array<{ denom: string; amount: string }>;
  }> {
    try {
      console.log(`🔍 [Mintscan] Fetching balance for: ${address}`);
      
      const response = await fetch(
        `${this.baseUrl}/cosmos/accounts/${address}`,
        { headers: this.getHeaders() }
      );
      
      if (!response.ok) {
        if (response.status === 404) {
          return {
            balance: '0',
            balanceAtom: 0,
            denom: 'uatom',
            allBalances: []
          };
        }
        throw new Error(`Mintscan API error: ${response.status} ${response.statusText}`);
      }
      
      const data: MintscanAccountInfo = await response.json();
      
      // Find ATOM balance (denom: uatom)
      const atomBalance = data.balances.find(b => b.denom === 'uatom');
      const balance = atomBalance?.amount || '0';
      const balanceAtom = parseInt(balance) / 1000000;
      
      console.log(`✅ [Mintscan] Balance: ${balance} uatom (${balanceAtom} ATOM)`);
      
      return {
        balance,
        balanceAtom,
        denom: 'uatom',
        allBalances: data.balances
      };
    } catch (error) {
      console.error('[Mintscan] Balance fetch error:', error);
      throw new Error(`Failed to fetch balance: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get account information including delegations
   */
  async getAccountInfo(address: string): Promise<MintscanAccountInfo> {
    try {
      console.log(`🔍 [Mintscan] Fetching account info for: ${address}`);
      
      const response = await fetch(
        `${this.baseUrl}/cosmos/accounts/${address}`,
        { headers: this.getHeaders() }
      );
      
      if (!response.ok) {
        throw new Error(`Mintscan API error: ${response.status} ${response.statusText}`);
      }
      
      const data: MintscanAccountInfo = await response.json();
      
      console.log(`✅ [Mintscan] Account info retrieved`);
      
      return data;
    } catch (error) {
      console.error('[Mintscan] Account info fetch error:', error);
      throw new Error(`Failed to fetch account info: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get transaction by hash
   */
  async getTransaction(txHash: string): Promise<MintscanTransaction> {
    try {
      console.log(`🔍 [Mintscan] Fetching transaction: ${txHash}`);
      
      const response = await fetch(
        `${this.baseUrl}/cosmos/tx/${txHash}`,
        { headers: this.getHeaders() }
      );
      
      if (!response.ok) {
        throw new Error(`Mintscan API error: ${response.status} ${response.statusText}`);
      }
      
      const data: MintscanTransaction = await response.json();
      
      console.log(`✅ [Mintscan] Transaction retrieved`);
      
      return data;
    } catch (error) {
      console.error('[Mintscan] Transaction fetch error:', error);
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
    transactions: MintscanTransaction[];
    total: number;
  }> {
    try {
      console.log(`🔍 [Mintscan] Fetching transaction history for: ${address}`);
      
      const response = await fetch(
        `${this.baseUrl}/cosmos/accounts/${address}/txs?limit=${limit}&offset=${offset}`,
        { headers: this.getHeaders() }
      );
      
      if (!response.ok) {
        throw new Error(`Mintscan API error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      console.log(`✅ [Mintscan] Found ${data.txs?.length || 0} transactions`);
      
      return {
        transactions: data.txs || [],
        total: data.total || 0
      };
    } catch (error) {
      console.error('[Mintscan] Transaction history fetch error:', error);
      throw new Error(`Failed to fetch transaction history: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get block by height
   */
  async getBlock(height: number): Promise<MintscanBlock> {
    try {
      console.log(`🔍 [Mintscan] Fetching block: ${height}`);
      
      const response = await fetch(
        `${this.baseUrl}/cosmos/blocks/${height}`,
        { headers: this.getHeaders() }
      );
      
      if (!response.ok) {
        throw new Error(`Mintscan API error: ${response.status} ${response.statusText}`);
      }
      
      const data: MintscanBlock = await response.json();
      
      console.log(`✅ [Mintscan] Block retrieved`);
      
      return data;
    } catch (error) {
      console.error('[Mintscan] Block fetch error:', error);
      throw new Error(`Failed to fetch block: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get latest block height
   */
  async getLatestBlockHeight(): Promise<number> {
    try {
      console.log('🔍 [Mintscan] Fetching latest block height...');
      
      const response = await fetch(
        `${this.baseUrl}/cosmos/blocks/latest`,
        { headers: this.getHeaders() }
      );
      
      if (!response.ok) {
        throw new Error(`Mintscan API error: ${response.status} ${response.statusText}`);
      }
      
      const data: MintscanBlock = await response.json();
      const height = parseInt(data.block.header.height);
      
      console.log(`✅ [Mintscan] Latest block height: ${height}`);
      
      return height;
    } catch (error) {
      console.error('[Mintscan] Latest block height fetch error:', error);
      throw new Error(`Failed to fetch latest block height: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Broadcast a signed transaction
   */
  async broadcastTransaction(signedTx: string): Promise<{
    txhash: string;
    code?: number;
    raw_log?: string;
  }> {
    try {
      console.log('📡 [Mintscan] Broadcasting transaction...');
      
      const response = await fetch(`${this.baseUrl}/cosmos/txs`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({
          tx: signedTx,
          mode: 'BROADCAST_MODE_SYNC'
        })
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Mintscan broadcast error: ${response.status} - ${errorText}`);
      }
      
      const result = await response.json();
      
      console.log(`✅ [Mintscan] Transaction broadcast successful: ${result.txhash}`);
      
      return result;
    } catch (error) {
      console.error('[Mintscan] Broadcast error:', error);
      throw new Error(`Failed to broadcast transaction: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get validator information
   */
  async getValidators(limit: number = 100): Promise<unknown[]> {
    try {
      console.log('🔍 [Mintscan] Fetching validators...');
      
      const response = await fetch(
        `${this.baseUrl}/cosmos/validators?limit=${limit}`,
        { headers: this.getHeaders() }
      );
      
      if (!response.ok) {
        throw new Error(`Mintscan API error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      console.log(`✅ [Mintscan] Found ${data.validators?.length || 0} validators`);
      
      return data.validators || [];
    } catch (error) {
      console.error('[Mintscan] Validators fetch error:', error);
      throw new Error(`Failed to fetch validators: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

// Singleton instances for convenience
export const mintscanMainnet = new MintscanAPI('mainnet');
export const mintscanTestnet = new MintscanAPI('testnet');

