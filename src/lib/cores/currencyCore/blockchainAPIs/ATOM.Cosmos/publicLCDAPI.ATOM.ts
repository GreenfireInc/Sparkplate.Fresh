// Public LCD/RPC API for Cosmos (ATOM)
// Uses standard Cosmos SDK gRPC-gateway (REST/LCD) endpoints
// Free public endpoints from chain-registry and community providers
// No API key required - uses public full nodes

export interface CosmosAccountInfo {
  account: {
    '@type': string;
    address: string;
    pub_key?: {
      '@type': string;
      key: string;
    };
    account_number: string;
    sequence: string;
  };
}

export interface CosmosBalance {
  balances: Array<{
    denom: string;
    amount: string;
  }>;
  pagination?: {
    next_key: string | null;
    total: string;
  };
}

export interface CosmosTransaction {
  tx: {
    body: {
      messages: unknown[];
      memo: string;
      timeout_height: string;
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
    signatures: string[];
  };
  tx_response: {
    height: string;
    txhash: string;
    code: number;
    raw_log: string;
    timestamp: string;
    gas_wanted: string;
    gas_used: string;
  };
}

export interface PublicLCDConfig {
  lcdUrl?: string; // Custom LCD endpoint
  rpcUrl?: string; // Custom RPC endpoint
}

export class PublicLCDAPI {
  private lcdUrl: string;
  private rpcUrl: string;

  // List of known public LCD endpoints for fallback
  private static readonly PUBLIC_LCD_ENDPOINTS = [
    'https://cosmos-lcd.quickapi.com',
    'https://lcd-cosmoshub.keplr.app',
    'https://rest-cosmoshub-ia.cosmosia.notional.ventures',
    'https://cosmos-rest.staketab.org',
    'https://rest.cosmos.directory/cosmoshub',
    'https://lcd-cosmos.whispernode.com'
  ];

  private static readonly PUBLIC_RPC_ENDPOINTS = [
    'https://cosmos-rpc.quickapi.com',
    'https://rpc-cosmoshub.keplr.app',
    'https://rpc-cosmoshub-ia.cosmosia.notional.ventures',
    'https://cosmos-rpc.staketab.org',
    'https://rpc.cosmos.directory/cosmoshub'
  ];

  constructor(config?: PublicLCDConfig) {
    // Use custom endpoints or default to first public endpoint
    this.lcdUrl = config?.lcdUrl || PublicLCDAPI.PUBLIC_LCD_ENDPOINTS[0];
    this.rpcUrl = config?.rpcUrl || PublicLCDAPI.PUBLIC_RPC_ENDPOINTS[0];
  }

  /**
   * Get list of available public LCD endpoints
   */
  static getPublicEndpoints(): { lcd: string[]; rpc: string[] } {
    return {
      lcd: [...PublicLCDAPI.PUBLIC_LCD_ENDPOINTS],
      rpc: [...PublicLCDAPI.PUBLIC_RPC_ENDPOINTS]
    };
  }

  /**
   * Switch to a different public endpoint
   */
  switchEndpoint(lcdIndex: number, rpcIndex?: number): void {
    if (lcdIndex >= 0 && lcdIndex < PublicLCDAPI.PUBLIC_LCD_ENDPOINTS.length) {
      this.lcdUrl = PublicLCDAPI.PUBLIC_LCD_ENDPOINTS[lcdIndex];
    }
    if (rpcIndex !== undefined && rpcIndex >= 0 && rpcIndex < PublicLCDAPI.PUBLIC_RPC_ENDPOINTS.length) {
      this.rpcUrl = PublicLCDAPI.PUBLIC_RPC_ENDPOINTS[rpcIndex];
    }
  }

  /**
   * Get headers for API requests
   */
  private getHeaders(): HeadersInit {
    return {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
  }

  /**
   * Get account balance
   */
  async getBalance(address: string): Promise<{
    balance: string; // in uatom
    balanceAtom: number; // in ATOM
    denom: string;
    allBalances: Array<{ denom: string; amount: string }>;
  }> {
    try {
      console.log(`🔍 [Public LCD] Fetching balance for: ${address}`);
      console.log(`🔗 [Public LCD] Using endpoint: ${this.lcdUrl}`);
      
      const response = await fetch(
        `${this.lcdUrl}/cosmos/bank/v1beta1/balances/${address}`,
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
        throw new Error(`Public LCD API error: ${response.status} ${response.statusText}`);
      }
      
      const data: CosmosBalance = await response.json();
      
      // Find ATOM balance (denom: uatom)
      const atomBalance = data.balances.find(b => b.denom === 'uatom');
      const balance = atomBalance?.amount || '0';
      const balanceAtom = parseInt(balance) / 1000000;
      
      console.log(`✅ [Public LCD] Balance: ${balance} uatom (${balanceAtom} ATOM)`);
      
      return {
        balance,
        balanceAtom,
        denom: 'uatom',
        allBalances: data.balances
      };
    } catch (error) {
      console.error('[Public LCD] Balance fetch error:', error);
      throw new Error(`Failed to fetch balance: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get account information
   */
  async getAccountInfo(address: string): Promise<CosmosAccountInfo> {
    try {
      console.log(`🔍 [Public LCD] Fetching account info for: ${address}`);
      
      const response = await fetch(
        `${this.lcdUrl}/cosmos/auth/v1beta1/accounts/${address}`,
        { headers: this.getHeaders() }
      );
      
      if (!response.ok) {
        throw new Error(`Public LCD API error: ${response.status} ${response.statusText}`);
      }
      
      const data: CosmosAccountInfo = await response.json();
      
      console.log(`✅ [Public LCD] Account info retrieved`);
      
      return data;
    } catch (error) {
      console.error('[Public LCD] Account info fetch error:', error);
      throw new Error(`Failed to fetch account info: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get transaction by hash
   */
  async getTransaction(txHash: string): Promise<CosmosTransaction> {
    try {
      console.log(`🔍 [Public LCD] Fetching transaction: ${txHash}`);
      
      const response = await fetch(
        `${this.lcdUrl}/cosmos/tx/v1beta1/txs/${txHash}`,
        { headers: this.getHeaders() }
      );
      
      if (!response.ok) {
        throw new Error(`Public LCD API error: ${response.status} ${response.statusText}`);
      }
      
      const data: CosmosTransaction = await response.json();
      
      console.log(`✅ [Public LCD] Transaction retrieved`);
      
      return data;
    } catch (error) {
      console.error('[Public LCD] Transaction fetch error:', error);
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
    transactions: CosmosTransaction[];
    pagination: {
      next_key: string | null;
      total: string;
    };
  }> {
    try {
      console.log(`🔍 [Public LCD] Fetching transaction history for: ${address}`);
      
      const response = await fetch(
        `${this.lcdUrl}/cosmos/tx/v1beta1/txs?events=message.sender='${address}'&pagination.limit=${limit}&pagination.offset=${offset}`,
        { headers: this.getHeaders() }
      );
      
      if (!response.ok) {
        throw new Error(`Public LCD API error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      console.log(`✅ [Public LCD] Found ${data.txs?.length || 0} transactions`);
      
      return {
        transactions: data.txs || [],
        pagination: data.pagination || { next_key: null, total: '0' }
      };
    } catch (error) {
      console.error('[Public LCD] Transaction history fetch error:', error);
      throw new Error(`Failed to fetch transaction history: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Broadcast a transaction
   */
  async broadcastTransaction(
    txBytes: string,
    mode: 'BROADCAST_MODE_SYNC' | 'BROADCAST_MODE_ASYNC' | 'BROADCAST_MODE_BLOCK' = 'BROADCAST_MODE_SYNC'
  ): Promise<{
    tx_response: {
      height: string;
      txhash: string;
      code: number;
      raw_log: string;
    };
  }> {
    try {
      console.log('📡 [Public LCD] Broadcasting transaction...');
      
      const response = await fetch(`${this.lcdUrl}/cosmos/tx/v1beta1/txs`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({
          tx_bytes: txBytes,
          mode: mode
        })
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Public LCD broadcast error: ${response.status} - ${errorText}`);
      }
      
      const result = await response.json();
      
      console.log(`✅ [Public LCD] Transaction broadcast successful: ${result.tx_response.txhash}`);
      
      return result;
    } catch (error) {
      console.error('[Public LCD] Broadcast error:', error);
      throw new Error(`Failed to broadcast transaction: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get delegations for an address
   */
  async getDelegations(address: string): Promise<{
    delegation_responses: Array<{
      delegation: {
        delegator_address: string;
        validator_address: string;
        shares: string;
      };
      balance: {
        denom: string;
        amount: string;
      };
    }>;
  }> {
    try {
      console.log(`🔍 [Public LCD] Fetching delegations for: ${address}`);
      
      const response = await fetch(
        `${this.lcdUrl}/cosmos/staking/v1beta1/delegations/${address}`,
        { headers: this.getHeaders() }
      );
      
      if (!response.ok) {
        throw new Error(`Public LCD API error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      console.log(`✅ [Public LCD] Found ${data.delegation_responses?.length || 0} delegations`);
      
      return data;
    } catch (error) {
      console.error('[Public LCD] Delegations fetch error:', error);
      throw new Error(`Failed to fetch delegations: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get latest block height
   */
  async getLatestBlockHeight(): Promise<number> {
    try {
      console.log('🔍 [Public LCD] Fetching latest block...');
      
      const response = await fetch(
        `${this.lcdUrl}/cosmos/base/tendermint/v1beta1/blocks/latest`,
        { headers: this.getHeaders() }
      );
      
      if (!response.ok) {
        throw new Error(`Public LCD API error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      const height = parseInt(data.block.header.height);
      
      console.log(`✅ [Public LCD] Latest block height: ${height}`);
      
      return height;
    } catch (error) {
      console.error('[Public LCD] Latest block fetch error:', error);
      throw new Error(`Failed to fetch latest block: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get staking pool information
   */
  async getStakingPool(): Promise<{
    pool: {
      not_bonded_tokens: string;
      bonded_tokens: string;
    };
  }> {
    try {
      console.log('🔍 [Public LCD] Fetching staking pool...');
      
      const response = await fetch(
        `${this.lcdUrl}/cosmos/staking/v1beta1/pool`,
        { headers: this.getHeaders() }
      );
      
      if (!response.ok) {
        throw new Error(`Public LCD API error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      console.log(`✅ [Public LCD] Staking pool retrieved`);
      
      return data;
    } catch (error) {
      console.error('[Public LCD] Staking pool fetch error:', error);
      throw new Error(`Failed to fetch staking pool: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

// Singleton instance with default public endpoint
export const publicLCD = new PublicLCDAPI();

// Export helper to create instance with custom endpoint
export const createPublicLCDAPI = (lcdUrl: string, rpcUrl?: string) => {
  return new PublicLCDAPI({ lcdUrl, rpcUrl });
};

