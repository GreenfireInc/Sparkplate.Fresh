// ATOMScan API Implementation for Cosmos (ATOM)
// Website: https://atomscan.com/
// Provides LCD/REST API gateway endpoints
// Free public access with standard rate limits

export interface ATOMScanAccountInfo {
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

export interface ATOMScanBalance {
  balances: Array<{
    denom: string;
    amount: string;
  }>;
  pagination?: {
    next_key: string | null;
    total: string;
  };
}

export interface ATOMScanTransaction {
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
      signer_infos: unknown[];
    };
    signatures: string[];
  };
  tx_response: {
    height: string;
    txhash: string;
    codespace: string;
    code: number;
    data: string;
    raw_log: string;
    logs: unknown[];
    info: string;
    gas_wanted: string;
    gas_used: string;
    tx: unknown;
    timestamp: string;
  };
}

export interface ATOMScanBlock {
  block_id: {
    hash: string;
    parts: {
      total: number;
      hash: string;
    };
  };
  block: {
    header: {
      version: {
        block: string;
        app: string;
      };
      chain_id: string;
      height: string;
      time: string;
      last_block_id: {
        hash: string;
        parts: {
          total: number;
          hash: string;
        };
      };
      last_commit_hash: string;
      data_hash: string;
      validators_hash: string;
      next_validators_hash: string;
      consensus_hash: string;
      app_hash: string;
      last_results_hash: string;
      evidence_hash: string;
      proposer_address: string;
    };
    data: {
      txs: string[];
    };
    evidence: {
      evidence: unknown[];
    };
    last_commit: unknown;
  };
}

export class ATOMScanAPI {
  private lcdUrl: string;
  private rpcUrl: string;
  private network: 'mainnet' | 'testnet';

  constructor(network: 'mainnet' | 'testnet' = 'mainnet') {
    this.network = network;
    
    // ATOMScan public endpoints
    if (network === 'mainnet') {
      this.lcdUrl = 'https://cosmos.lcd.atomscan.com';
      this.rpcUrl = 'https://cosmos.rpc.atomscan.com';
    } else {
      // Testnet endpoints (if available)
      this.lcdUrl = 'https://testnet.lcd.atomscan.com';
      this.rpcUrl = 'https://testnet.rpc.atomscan.com';
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
      console.log(`🔍 [ATOMScan] Fetching balance for: ${address}`);
      
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
        throw new Error(`ATOMScan API error: ${response.status} ${response.statusText}`);
      }
      
      const data: ATOMScanBalance = await response.json();
      
      // Find ATOM balance (denom: uatom)
      const atomBalance = data.balances.find(b => b.denom === 'uatom');
      const balance = atomBalance?.amount || '0';
      const balanceAtom = parseInt(balance) / 1000000;
      
      console.log(`✅ [ATOMScan] Balance: ${balance} uatom (${balanceAtom} ATOM)`);
      
      return {
        balance,
        balanceAtom,
        denom: 'uatom',
        allBalances: data.balances
      };
    } catch (error) {
      console.error('[ATOMScan] Balance fetch error:', error);
      throw new Error(`Failed to fetch balance: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get account information
   */
  async getAccountInfo(address: string): Promise<ATOMScanAccountInfo> {
    try {
      console.log(`🔍 [ATOMScan] Fetching account info for: ${address}`);
      
      const response = await fetch(
        `${this.lcdUrl}/cosmos/auth/v1beta1/accounts/${address}`,
        { headers: this.getHeaders() }
      );
      
      if (!response.ok) {
        throw new Error(`ATOMScan API error: ${response.status} ${response.statusText}`);
      }
      
      const data: ATOMScanAccountInfo = await response.json();
      
      console.log(`✅ [ATOMScan] Account info retrieved`);
      
      return data;
    } catch (error) {
      console.error('[ATOMScan] Account info fetch error:', error);
      throw new Error(`Failed to fetch account info: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get transaction by hash
   */
  async getTransaction(txHash: string): Promise<ATOMScanTransaction> {
    try {
      console.log(`🔍 [ATOMScan] Fetching transaction: ${txHash}`);
      
      const response = await fetch(
        `${this.lcdUrl}/cosmos/tx/v1beta1/txs/${txHash}`,
        { headers: this.getHeaders() }
      );
      
      if (!response.ok) {
        throw new Error(`ATOMScan API error: ${response.status} ${response.statusText}`);
      }
      
      const data: ATOMScanTransaction = await response.json();
      
      console.log(`✅ [ATOMScan] Transaction retrieved`);
      
      return data;
    } catch (error) {
      console.error('[ATOMScan] Transaction fetch error:', error);
      throw new Error(`Failed to fetch transaction: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get transactions by sender address
   */
  async getTransactionHistory(
    address: string,
    limit: number = 50,
    offset: number = 0
  ): Promise<{
    transactions: ATOMScanTransaction[];
    pagination: {
      next_key: string | null;
      total: string;
    };
  }> {
    try {
      console.log(`🔍 [ATOMScan] Fetching transaction history for: ${address}`);
      
      // Search for transactions where address is sender
      const response = await fetch(
        `${this.lcdUrl}/cosmos/tx/v1beta1/txs?events=message.sender='${address}'&pagination.limit=${limit}&pagination.offset=${offset}`,
        { headers: this.getHeaders() }
      );
      
      if (!response.ok) {
        throw new Error(`ATOMScan API error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      console.log(`✅ [ATOMScan] Found ${data.txs?.length || 0} transactions`);
      
      return {
        transactions: data.txs || [],
        pagination: data.pagination || { next_key: null, total: '0' }
      };
    } catch (error) {
      console.error('[ATOMScan] Transaction history fetch error:', error);
      throw new Error(`Failed to fetch transaction history: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get block by height
   */
  async getBlock(height: number): Promise<ATOMScanBlock> {
    try {
      console.log(`🔍 [ATOMScan] Fetching block: ${height}`);
      
      const response = await fetch(
        `${this.lcdUrl}/cosmos/base/tendermint/v1beta1/blocks/${height}`,
        { headers: this.getHeaders() }
      );
      
      if (!response.ok) {
        throw new Error(`ATOMScan API error: ${response.status} ${response.statusText}`);
      }
      
      const data: ATOMScanBlock = await response.json();
      
      console.log(`✅ [ATOMScan] Block retrieved`);
      
      return data;
    } catch (error) {
      console.error('[ATOMScan] Block fetch error:', error);
      throw new Error(`Failed to fetch block: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get latest block
   */
  async getLatestBlock(): Promise<ATOMScanBlock> {
    try {
      console.log('🔍 [ATOMScan] Fetching latest block...');
      
      const response = await fetch(
        `${this.lcdUrl}/cosmos/base/tendermint/v1beta1/blocks/latest`,
        { headers: this.getHeaders() }
      );
      
      if (!response.ok) {
        throw new Error(`ATOMScan API error: ${response.status} ${response.statusText}`);
      }
      
      const data: ATOMScanBlock = await response.json();
      
      console.log(`✅ [ATOMScan] Latest block: ${data.block.header.height}`);
      
      return data;
    } catch (error) {
      console.error('[ATOMScan] Latest block fetch error:', error);
      throw new Error(`Failed to fetch latest block: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Broadcast a transaction
   */
  async broadcastTransaction(txBytes: string, mode: 'BROADCAST_MODE_SYNC' | 'BROADCAST_MODE_ASYNC' | 'BROADCAST_MODE_BLOCK' = 'BROADCAST_MODE_SYNC'): Promise<{
    tx_response: {
      height: string;
      txhash: string;
      code: number;
      raw_log: string;
    };
  }> {
    try {
      console.log('📡 [ATOMScan] Broadcasting transaction...');
      
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
        throw new Error(`ATOMScan broadcast error: ${response.status} - ${errorText}`);
      }
      
      const result = await response.json();
      
      console.log(`✅ [ATOMScan] Transaction broadcast successful: ${result.tx_response.txhash}`);
      
      return result;
    } catch (error) {
      console.error('[ATOMScan] Broadcast error:', error);
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
    pagination: {
      next_key: string | null;
      total: string;
    };
  }> {
    try {
      console.log(`🔍 [ATOMScan] Fetching delegations for: ${address}`);
      
      const response = await fetch(
        `${this.lcdUrl}/cosmos/staking/v1beta1/delegations/${address}`,
        { headers: this.getHeaders() }
      );
      
      if (!response.ok) {
        throw new Error(`ATOMScan API error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      console.log(`✅ [ATOMScan] Found ${data.delegation_responses?.length || 0} delegations`);
      
      return data;
    } catch (error) {
      console.error('[ATOMScan] Delegations fetch error:', error);
      throw new Error(`Failed to fetch delegations: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get all validators
   */
  async getValidators(status: 'BOND_STATUS_BONDED' | 'BOND_STATUS_UNBONDED' | 'BOND_STATUS_UNBONDING' = 'BOND_STATUS_BONDED'): Promise<{
    validators: unknown[];
    pagination: {
      next_key: string | null;
      total: string;
    };
  }> {
    try {
      console.log('🔍 [ATOMScan] Fetching validators...');
      
      const response = await fetch(
        `${this.lcdUrl}/cosmos/staking/v1beta1/validators?status=${status}`,
        { headers: this.getHeaders() }
      );
      
      if (!response.ok) {
        throw new Error(`ATOMScan API error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      console.log(`✅ [ATOMScan] Found ${data.validators?.length || 0} validators`);
      
      return data;
    } catch (error) {
      console.error('[ATOMScan] Validators fetch error:', error);
      throw new Error(`Failed to fetch validators: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

// Singleton instances for convenience
export const atomscanMainnet = new ATOMScanAPI('mainnet');
export const atomscanTestnet = new ATOMScanAPI('testnet');

