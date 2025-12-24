/**
 * XRPSCAN API for Ripple (XRP)
 * 
 * Comprehensive XRP Ledger Explorer
 * 
 * Features:
 * - Free public API access
 * - Account information and balances
 * - Transaction histories
 * - Token (IOU) tracking
 * - MPT (Multi-Purpose Tokens)
 * - NFT tracking
 * - DID and credentials
 * - Oracles and validators
 * - AMM (Automated Market Makers)
 * - Rich list and metrics
 * 
 * Documentation: https://xrpscan.com/
 * Website: https://xrpscan.com/
 */

import axios, { AxiosInstance } from 'axios';

// API Configuration
export interface XRPSCANConfig {
  baseURL?: string;
  timeout?: number;
  retries?: number;
  network?: 'mainnet' | 'testnet';
}

// Account Data
export interface XRPSCANAccount {
  account: string;
  parent?: string;
  initial_balance: string;
  balance: string;
  domain?: string;
  email_hash?: string;
  flags: number;
  inception: string;
  owner_count: number;
  previous_txn: string;
  previous_ledger: number;
  sequence: number;
  transfer_rate?: number;
  tick_size?: number;
}

// Transaction
export interface XRPSCANTransaction {
  hash: string;
  ledger_index: number;
  date: string;
  tx: {
    Account: string;
    Amount: string | {
      currency: string;
      issuer: string;
      value: string;
    };
    Destination?: string;
    DestinationTag?: number;
    Fee: string;
    Flags: number;
    Sequence: number;
    SigningPubKey: string;
    TransactionType: string;
    TxnSignature: string;
  };
  meta: unknown;
}

// Token (IOU)
export interface XRPSCANToken {
  currency: string;
  issuer: string;
  amount: string;
  trustlines: number;
  holders: number;
  domain?: string;
  name?: string;
}

// NFT
export interface XRPSCANNFT {
  nft_id: string;
  ledger_index: number;
  owner: string;
  is_burned: boolean;
  uri?: string;
  flags: number;
  transfer_fee?: number;
  issuer: string;
  nft_serial: number;
  nft_taxon: number;
}

export class XRPSCANAPI {
  private client: AxiosInstance;
  private config: Required<XRPSCANConfig>;

  constructor(config: XRPSCANConfig = {}) {
    const network = config.network || 'mainnet';
    const baseURL = config.baseURL || 
      (network === 'mainnet'
        ? 'https://api.xrpscan.com/api/v1'
        : 'https://api-testnet.xrpscan.com/api/v1');

    this.config = {
      baseURL,
      timeout: config.timeout || 30000,
      retries: config.retries || 3,
      network,
    };

    this.client = axios.create({
      baseURL: this.config.baseURL,
      timeout: this.config.timeout,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  /**
   * Get account information
   */
  async getAccount(account: string): Promise<XRPSCANAccount> {
    const response = await this.client.get(`/account/${account}`);
    return response.data;
  }

  /**
   * Get account balance
   */
  async getBalance(account: string): Promise<string> {
    const accountInfo = await this.getAccount(account);
    // Convert drops to XRP
    const drops = parseInt(accountInfo.balance);
    return (drops / 1000000).toString();
  }

  /**
   * Get account transactions
   */
  async getTransactions(
    account: string,
    limit: number = 50,
    marker?: string
  ): Promise<{
    account: string;
    ledger_index_min: number;
    ledger_index_max: number;
    limit: number;
    marker?: string;
    transactions: XRPSCANTransaction[];
  }> {
    const params: Record<string, string | number> = { limit };
    if (marker) params.marker = marker;

    const response = await this.client.get(`/account/${account}/transactions`, { params });
    return response.data;
  }

  /**
   * Get transaction by hash
   */
  async getTransaction(hash: string): Promise<XRPSCANTransaction> {
    const response = await this.client.get(`/tx/${hash}`);
    return response.data;
  }

  /**
   * Get account tokens (IOUs)
   */
  async getAccountTokens(account: string): Promise<XRPSCANToken[]> {
    const response = await this.client.get(`/account/${account}/tokens`);
    return response.data;
  }

  /**
   * Get account NFTs
   */
  async getAccountNFTs(account: string): Promise<XRPSCANNFT[]> {
    const response = await this.client.get(`/account/${account}/nfts`);
    return response.data;
  }

  /**
   * Get NFT by ID
   */
  async getNFT(nftId: string): Promise<XRPSCANNFT> {
    const response = await this.client.get(`/nft/${nftId}`);
    return response.data;
  }

  /**
   * Get account payment history
   */
  async getPayments(account: string, limit: number = 50): Promise<{
    payments: Array<{
      hash: string;
      date: string;
      from: string;
      to: string;
      amount: string | {
        currency: string;
        issuer: string;
        value: string;
      };
      destination_tag?: number;
    }>;
  }> {
    const response = await this.client.get(`/account/${account}/payments`, {
      params: { limit },
    });
    return response.data;
  }

  /**
   * Get token info
   */
  async getToken(currency: string, issuer: string): Promise<XRPSCANToken> {
    const response = await this.client.get(`/token/${currency}/${issuer}`);
    return response.data;
  }

  /**
   * Get ledger (block) info
   */
  async getLedger(ledgerIndex: number): Promise<{
    ledger_index: number;
    ledger_hash: string;
    parent_hash: string;
    close_time: string;
    close_time_human: string;
    total_coins: string;
    transaction_count: number;
  }> {
    const response = await this.client.get(`/ledger/${ledgerIndex}`);
    return response.data;
  }

  /**
   * Get latest ledgers
   */
  async getLatestLedgers(limit: number = 20): Promise<Array<{
    ledger_index: number;
    ledger_hash: string;
    close_time: string;
    transaction_count: number;
  }>> {
    const response = await this.client.get('/ledgers', {
      params: { limit },
    });
    return response.data;
  }

  /**
   * Get validators
   */
  async getValidators(): Promise<Array<{
    validation_public_key: string;
    domain?: string;
    manifest?: string;
  }>> {
    const response = await this.client.get('/validators');
    return response.data;
  }

  /**
   * Get network metrics
   */
  async getMetrics(): Promise<{
    ledger_index: number;
    total_coins: string;
    accounts: number;
    txs_total: number;
    txs_24h: number;
    payment_volume_24h: string;
  }> {
    const response = await this.client.get('/metrics');
    return response.data;
  }

  /**
   * Get XRP rich list
   */
  async getRichList(limit: number = 100): Promise<Array<{
    account: string;
    balance: string;
    domain?: string;
  }>> {
    const response = await this.client.get('/richlist', {
      params: { limit },
    });
    return response.data;
  }

  /**
   * Search accounts, transactions, or tokens
   */
  async search(query: string): Promise<{
    accounts?: string[];
    transactions?: string[];
    tokens?: Array<{
      currency: string;
      issuer: string;
    }>;
  }> {
    const response = await this.client.get('/search', {
      params: { q: query },
    });
    return response.data;
  }

  /**
   * Get AMM (Automated Market Maker) pools
   */
  async getAMMs(): Promise<Array<{
    account: string;
    asset: { currency: string; issuer?: string };
    asset2: { currency: string; issuer?: string };
    amount: string;
    amount2: string;
    trading_fee: number;
  }>> {
    const response = await this.client.get('/amms');
    return response.data;
  }

  /**
   * Get AMM pool by account
   */
  async getAMM(account: string): Promise<{
    account: string;
    asset: { currency: string; issuer?: string };
    asset2: { currency: string; issuer?: string };
    amount: string;
    amount2: string;
    trading_fee: number;
    lp_token: {
      currency: string;
      value: string;
    };
  }> {
    const response = await this.client.get(`/amm/${account}`);
    return response.data;
  }
}

// Singleton instance for mainnet
export const xrpscanAPI = new XRPSCANAPI();

// Factory function for custom configuration
export const createXRPSCANAPI = (config: XRPSCANConfig) => {
  return new XRPSCANAPI(config);
};
