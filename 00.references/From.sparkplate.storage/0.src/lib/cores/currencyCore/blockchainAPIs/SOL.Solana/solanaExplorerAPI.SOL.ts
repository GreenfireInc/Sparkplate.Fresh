/**
 * Official Solana Explorer API (via RPC)
 * 
 * Official Solana blockchain explorer using JSON-RPC
 * 
 * Features:
 * - Free access via public RPC endpoints
 * - Transaction inspection
 * - Account data
 * - Block information
 * - Token data
 * - Program accounts
 * - Native Solana RPC methods
 * 
 * Documentation: https://docs.solana.com/api/http
 * Website: https://explorer.solana.com/
 */

import axios, { AxiosInstance } from 'axios';

// API Configuration
export interface SolanaExplorerConfig {
  rpcURL?: string;
  timeout?: number;
  retries?: number;
  commitment?: 'processed' | 'confirmed' | 'finalized';
}

// RPC Request
export interface SolanaRPCRequest {
  jsonrpc: string;
  id: number;
  method: string;
  params: unknown[];
}

// RPC Response
export interface SolanaRPCResponse<T = unknown> {
  jsonrpc: string;
  id: number;
  result?: T;
  error?: {
    code: number;
    message: string;
    data?: unknown;
  };
}

// Account Information
export interface SolanaAccountInfo {
  lamports: number;
  owner: string;
  executable: boolean;
  rentEpoch: number;
  data: string[] | {
    parsed?: unknown;
    program?: string;
    space?: number;
  };
}

// Transaction
export interface SolanaTransaction {
  slot: number;
  transaction: {
    message: {
      accountKeys: string[];
      header: {
        numRequiredSignatures: number;
        numReadonlySignedAccounts: number;
        numReadonlyUnsignedAccounts: number;
      };
      instructions: Array<{
        programIdIndex: number;
        accounts: number[];
        data: string;
      }>;
      recentBlockhash: string;
    };
    signatures: string[];
  };
  meta?: {
    err: unknown;
    fee: number;
    preBalances: number[];
    postBalances: number[];
    innerInstructions?: unknown[];
    logMessages?: string[];
    preTokenBalances?: unknown[];
    postTokenBalances?: unknown[];
    rewards?: unknown[];
  };
  blockTime?: number;
}

// Block Information
export interface SolanaBlock {
  blockhash: string;
  previousBlockhash: string;
  parentSlot: number;
  transactions: SolanaTransaction[];
  rewards?: Array<{
    pubkey: string;
    lamports: number;
    postBalance: number;
    rewardType: string;
    commission?: number;
  }>;
  blockTime?: number;
  blockHeight?: number;
}

// Token Account
export interface SolanaTokenAccount {
  pubkey: string;
  account: {
    data: {
      parsed: {
        info: {
          isNative: boolean;
          mint: string;
          owner: string;
          state: string;
          tokenAmount: {
            amount: string;
            decimals: number;
            uiAmount: number;
            uiAmountString: string;
          };
        };
        type: string;
      };
      program: string;
      space: number;
    };
    executable: boolean;
    lamports: number;
    owner: string;
    rentEpoch: number;
  };
}

export class SolanaExplorerAPI {
  private client: AxiosInstance;
  private config: Required<SolanaExplorerConfig>;
  private requestId: number = 1;

  constructor(config: SolanaExplorerConfig = {}) {
    this.config = {
      rpcURL: config.rpcURL || 'https://api.mainnet-beta.solana.com',
      timeout: config.timeout || 30000,
      retries: config.retries || 3,
      commitment: config.commitment || 'confirmed',
    };

    this.client = axios.create({
      baseURL: this.config.rpcURL,
      timeout: this.config.timeout,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  /**
   * Make RPC call
   */
  private async rpcCall<T>(method: string, params: unknown[] = []): Promise<T> {
    const request: SolanaRPCRequest = {
      jsonrpc: '2.0',
      id: this.requestId++,
      method,
      params,
    };

    const response = await this.client.post<SolanaRPCResponse<T>>('', request);

    if (response.data.error) {
      throw new Error(`RPC Error: ${response.data.error.message}`);
    }

    return response.data.result as T;
  }

  /**
   * Get account information
   */
  async getAccountInfo(address: string): Promise<{ context: { slot: number }; value: SolanaAccountInfo | null }> {
    return this.rpcCall('getAccountInfo', [
      address,
      { encoding: 'jsonParsed', commitment: this.config.commitment },
    ]);
  }

  /**
   * Get account balance
   */
  async getBalance(address: string): Promise<number> {
    const result = await this.rpcCall<{ context: { slot: number }; value: number }>('getBalance', [
      address,
      { commitment: this.config.commitment },
    ]);
    return result.value;
  }

  /**
   * Get transaction
   */
  async getTransaction(signature: string): Promise<SolanaTransaction | null> {
    return this.rpcCall('getTransaction', [
      signature,
      { encoding: 'jsonParsed', commitment: this.config.commitment, maxSupportedTransactionVersion: 0 },
    ]);
  }

  /**
   * Get signatures for address (transaction history)
   */
  async getSignaturesForAddress(
    address: string,
    limit: number = 50,
    before?: string
  ): Promise<Array<{
    signature: string;
    slot: number;
    err: unknown;
    memo: string | null;
    blockTime: number | null;
    confirmationStatus: string | null;
  }>> {
    return this.rpcCall('getSignaturesForAddress', [
      address,
      {
        limit,
        ...(before && { before }),
        commitment: this.config.commitment,
      },
    ]);
  }

  /**
   * Get transaction history for an address
   */
  async getTransactionHistory(address: string, limit: number = 50): Promise<SolanaTransaction[]> {
    const signatures = await this.getSignaturesForAddress(address, limit);
    const transactions: SolanaTransaction[] = [];

    for (const sig of signatures) {
      const tx = await this.getTransaction(sig.signature);
      if (tx) {
        transactions.push(tx);
      }
    }

    return transactions;
  }

  /**
   * Get block
   */
  async getBlock(slot: number): Promise<SolanaBlock | null> {
    return this.rpcCall('getBlock', [
      slot,
      { encoding: 'jsonParsed', transactionDetails: 'full', rewards: true, maxSupportedTransactionVersion: 0 },
    ]);
  }

  /**
   * Get current slot
   */
  async getSlot(): Promise<number> {
    return this.rpcCall('getSlot', [{ commitment: this.config.commitment }]);
  }

  /**
   * Get block height
   */
  async getBlockHeight(): Promise<number> {
    return this.rpcCall('getBlockHeight', [{ commitment: this.config.commitment }]);
  }

  /**
   * Get token accounts by owner
   */
  async getTokenAccountsByOwner(owner: string, mint?: string): Promise<{ value: SolanaTokenAccount[] }> {
    const filter = mint
      ? { mint }
      : { programId: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA' };

    return this.rpcCall('getTokenAccountsByOwner', [
      owner,
      filter,
      { encoding: 'jsonParsed', commitment: this.config.commitment },
    ]);
  }

  /**
   * Get token supply
   */
  async getTokenSupply(mint: string): Promise<{
    context: { slot: number };
    value: {
      amount: string;
      decimals: number;
      uiAmount: number;
      uiAmountString: string;
    };
  }> {
    return this.rpcCall('getTokenSupply', [mint, { commitment: this.config.commitment }]);
  }

  /**
   * Get token largest accounts
   */
  async getTokenLargestAccounts(mint: string): Promise<{
    value: Array<{
      address: string;
      amount: string;
      decimals: number;
      uiAmount: number;
      uiAmountString: string;
    }>;
  }> {
    return this.rpcCall('getTokenLargestAccounts', [mint, { commitment: this.config.commitment }]);
  }

  /**
   * Get program accounts
   */
  async getProgramAccounts(programId: string): Promise<Array<{
    pubkey: string;
    account: SolanaAccountInfo;
  }>> {
    return this.rpcCall('getProgramAccounts', [
      programId,
      { encoding: 'jsonParsed', commitment: this.config.commitment },
    ]);
  }

  /**
   * Get recent performance samples
   */
  async getRecentPerformanceSamples(limit: number = 720): Promise<Array<{
    slot: number;
    numTransactions: number;
    numSlots: number;
    samplePeriodSecs: number;
  }>> {
    return this.rpcCall('getRecentPerformanceSamples', [limit]);
  }

  /**
   * Get epoch info
   */
  async getEpochInfo(): Promise<{
    absoluteSlot: number;
    blockHeight: number;
    epoch: number;
    slotIndex: number;
    slotsInEpoch: number;
    transactionCount: number;
  }> {
    return this.rpcCall('getEpochInfo', [{ commitment: this.config.commitment }]);
  }

  /**
   * Get version
   */
  async getVersion(): Promise<{ 'solana-core': string; 'feature-set': number }> {
    return this.rpcCall('getVersion', []);
  }

  /**
   * Get minimum balance for rent exemption
   */
  async getMinimumBalanceForRentExemption(dataLength: number): Promise<number> {
    return this.rpcCall('getMinimumBalanceForRentExemption', [dataLength, { commitment: this.config.commitment }]);
  }
}

// Singleton instance for mainnet
export const solanaExplorerAPI = new SolanaExplorerAPI();

// Factory function for custom configuration
export const createSolanaExplorerAPI = (config: SolanaExplorerConfig) => {
  return new SolanaExplorerAPI(config);
};

