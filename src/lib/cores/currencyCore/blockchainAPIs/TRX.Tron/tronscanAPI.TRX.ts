/**
 * TRONSCAN API for Tron (TRX)
 * 
 * Official blockchain explorer for the TRON network
 * 
 * Features:
 * - Free API access with registration
 * - Detailed block, transaction, and account information
 * - Token tracking (TRC10, TRC20)
 * - Smart contract data
 * - Voting and staking info
 * - Network statistics
 * - Real-time data
 * 
 * Documentation: https://docs.tronscan.org/
 * Website: https://tronscan.org/
 */

import axios, { AxiosInstance } from 'axios';

// API Configuration
export interface TronscanConfig {
  baseURL?: string;
  apiKey?: string;
  timeout?: number;
  retries?: number;
}

// Account Information
export interface TronscanAccount {
  address: string;
  balance: number;
  power: number;
  frozen: {
    total: number;
    balances: Array<{
      amount: number;
      expires: number;
    }>;
  };
  asset: Array<{
    key: string;
    value: number;
  }>;
  assetV2: Array<{
    key: string;
    value: number;
  }>;
  trc20: Array<{
    [key: string]: string;
  }>;
  account_resource?: unknown;
}

// Transaction
export interface TronscanTransaction {
  hash: string;
  block: number;
  timestamp: number;
  confirmed: boolean;
  contractType: number;
  contractData: {
    owner_address: string;
    to_address?: string;
    amount?: number;
    contract_address?: string;
    data?: string;
  };
  contractRet: string;
  cost: {
    net_fee: number;
    energy_fee: number;
    energy_usage: number;
    origin_energy_usage: number;
    net_usage: number;
  };
}

// Block Information
export interface TronscanBlock {
  number: number;
  hash: string;
  size: number;
  timestamp: number;
  parentHash: string;
  witnessAddress: string;
  witnessName: string;
  txTrieRoot: string;
  confirmed: boolean;
  revert: boolean;
  nrOfTrx: number;
}

// Token Information
export interface TronscanToken {
  tokenId: string;
  tokenName: string;
  tokenAbbr: string;
  tokenDecimal: number;
  tokenCanShow: number;
  tokenType: string;
  tokenLogo: string;
  tokenPriceInTrx: number;
  vip: boolean;
  holderCount: number;
  totalSupply: number;
  nrOfTokenHolders: number;
}

// Transfer
export interface TronscanTransfer {
  transaction_id: string;
  block: number;
  timestamp: number;
  from: string;
  to: string;
  amount: string;
  token_name: string;
  token_abbr: string;
  confirmed: boolean;
}

export class TronscanAPI {
  private client: AxiosInstance;
  private config: Required<Omit<TronscanConfig, 'apiKey'>> & { apiKey?: string };

  constructor(config: TronscanConfig = {}) {
    this.config = {
      baseURL: config.baseURL || 'https://apilist.tronscanapi.com/api',
      apiKey: config.apiKey,
      timeout: config.timeout || 30000,
      retries: config.retries || 3,
    };

    this.client = axios.create({
      baseURL: this.config.baseURL,
      timeout: this.config.timeout,
      headers: {
        'Content-Type': 'application/json',
        ...(this.config.apiKey && { 'TRON-PRO-API-KEY': this.config.apiKey }),
      },
    });
  }

  /**
   * Get account information
   */
  async getAccountInfo(address: string): Promise<TronscanAccount> {
    const response = await this.client.get('/account', {
      params: { address },
    });
    return response.data;
  }

  /**
   * Get account balance (in SUN, 1 TRX = 1,000,000 SUN)
   */
  async getBalance(address: string): Promise<number> {
    const accountInfo = await this.getAccountInfo(address);
    return accountInfo.balance;
  }

  /**
   * Get transaction by hash
   */
  async getTransaction(hash: string): Promise<TronscanTransaction> {
    const response = await this.client.get('/transaction-info', {
      params: { hash },
    });
    return response.data;
  }

  /**
   * Get transaction history for an address
   */
  async getTransactionHistory(
    address: string,
    limit: number = 50,
    start: number = 0
  ): Promise<{ data: TronscanTransaction[]; total: number }> {
    const response = await this.client.get('/transaction', {
      params: {
        address,
        limit,
        start,
        sort: '-timestamp',
      },
    });
    return response.data;
  }

  /**
   * Get transfers for an address
   */
  async getTransfers(
    address: string,
    limit: number = 50,
    start: number = 0
  ): Promise<{ data: TronscanTransfer[]; total: number }> {
    const response = await this.client.get('/transfer', {
      params: {
        address,
        limit,
        start,
        sort: '-timestamp',
      },
    });
    return response.data;
  }

  /**
   * Get TRC20 transfers for an address
   */
  async getTRC20Transfers(
    address: string,
    limit: number = 50,
    start: number = 0
  ): Promise<{ data: unknown[]; total: number }> {
    const response = await this.client.get('/token_trc20/transfers', {
      params: {
        relatedAddress: address,
        limit,
        start,
        sort: '-timestamp',
      },
    });
    return response.data;
  }

  /**
   * Get block by number
   */
  async getBlock(number: number): Promise<TronscanBlock> {
    const response = await this.client.get('/block', {
      params: { number },
    });
    return response.data.data[0];
  }

  /**
   * Get latest blocks
   */
  async getLatestBlocks(limit: number = 20): Promise<{ data: TronscanBlock[]; total: number }> {
    const response = await this.client.get('/block', {
      params: {
        limit,
        sort: '-number',
      },
    });
    return response.data;
  }

  /**
   * Get token information
   */
  async getTokenInfo(address: string): Promise<TronscanToken> {
    const response = await this.client.get('/token', {
      params: { id: address },
    });
    return response.data.data[0];
  }

  /**
   * Get TRC20 token list
   */
  async getTRC20Tokens(
    limit: number = 50,
    start: number = 0
  ): Promise<{ tokens: unknown[]; total: number }> {
    const response = await this.client.get('/token_trc20', {
      params: {
        limit,
        start,
        sort: '-holders',
      },
    });
    return response.data;
  }

  /**
   * Get token holders
   */
  async getTokenHolders(
    tokenAddress: string,
    limit: number = 50,
    start: number = 0
  ): Promise<{ data: unknown[]; total: number }> {
    const response = await this.client.get('/token_trc20/holders', {
      params: {
        contract_address: tokenAddress,
        limit,
        start,
      },
    });
    return response.data;
  }

  /**
   * Get contract information
   */
  async getContract(address: string): Promise<unknown> {
    const response = await this.client.get('/contract', {
      params: { contract: address },
    });
    return response.data;
  }

  /**
   * Get network statistics
   */
  async getNetworkStats(): Promise<{
    totalTransaction: number;
    totalAddress: number;
    totalBlockNum: number;
    avgBlockTime: number;
    avgBlockSize: number;
    totalCirculatingSupply: number;
  }> {
    const response = await this.client.get('/system/status');
    return response.data;
  }

  /**
   * Get current block number
   */
  async getCurrentBlock(): Promise<number> {
    const stats = await this.getNetworkStats();
    return stats.totalBlockNum;
  }

  /**
   * Get witness list (super representatives)
   */
  async getWitnesses(limit: number = 50): Promise<{ data: unknown[] }> {
    const response = await this.client.get('/witness', {
      params: { limit },
    });
    return response.data;
  }

  /**
   * Get votes for a witness
   */
  async getWitnessVotes(address: string): Promise<unknown> {
    const response = await this.client.get('/vote', {
      params: { candidate: address },
    });
    return response.data;
  }

  /**
   * Search blockchain (address, transaction, block, token)
   */
  async search(query: string): Promise<unknown> {
    const response = await this.client.get('/search', {
      params: { keyword: query },
    });
    return response.data;
  }

  /**
   * Get account resources (bandwidth and energy)
   */
  async getAccountResources(address: string): Promise<unknown> {
    const response = await this.client.get('/account/resource', {
      params: { address },
    });
    return response.data;
  }
}

// Singleton instance
export const tronscanAPI = new TronscanAPI();

// Factory function for custom configuration
export const createTronscanAPI = (apiKey?: string) => {
  return new TronscanAPI({ apiKey });
};
