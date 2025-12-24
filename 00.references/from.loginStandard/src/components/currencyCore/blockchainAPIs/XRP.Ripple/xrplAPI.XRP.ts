/**
 * XRP Ledger (XRPL) Public API for Ripple (XRP)
 * 
 * Official XRP Ledger public servers
 * 
 * Features:
 * - Free public access, no authentication
 * - Complete ledger data
 * - Transaction submission
 * - Account information
 * - Payment channels
 * - Escrows and checks
 * - Order books and DEX
 * - WebSocket support
 * 
 * Documentation: https://xrpl.org/docs/tutorials/public-servers
 * API Reference: https://xrpl.org/docs/references/http-websocket-apis/
 */

import axios, { AxiosInstance } from 'axios';

// API Configuration
export interface XRPLConfig {
  baseURL?: string;
  timeout?: number;
  retries?: number;
  network?: 'mainnet' | 'testnet' | 'devnet';
}

// Account Info Response
export interface XRPLAccountInfo {
  account_data: {
    Account: string;
    Balance: string;
    Flags: number;
    LedgerEntryType: string;
    OwnerCount: number;
    PreviousTxnID: string;
    PreviousTxnLgrSeq: number;
    Sequence: number;
    index: string;
  };
  ledger_current_index: number;
  validated: boolean;
}

// Transaction Response
export interface XRPLTransaction {
  Account: string;
  Amount: string | {
    currency: string;
    issuer: string;
    value: string;
  };
  Destination?: string;
  Fee: string;
  Flags: number;
  LastLedgerSequence?: number;
  Sequence: number;
  SigningPubKey: string;
  TransactionType: string;
  TxnSignature: string;
  hash: string;
  ledger_index: number;
  date?: number;
  meta?: unknown;
  validated?: boolean;
}

// Account Transactions Response
export interface XRPLAccountTxResponse {
  account: string;
  ledger_index_min: number;
  ledger_index_max: number;
  limit: number;
  transactions: Array<{
    meta: unknown;
    tx: XRPLTransaction;
    validated: boolean;
  }>;
}

// Balance
export interface XRPLBalance {
  currency: string;
  value: string;
  issuer?: string;
}

// Server Info
export interface XRPLServerInfo {
  info: {
    build_version: string;
    complete_ledgers: string;
    hostid: string;
    io_latency_ms: number;
    jq_trans_overflow: string;
    last_close: {
      converge_time_s: number;
      proposers: number;
    };
    load_factor: number;
    peer_disconnects: string;
    peer_disconnects_resources: string;
    peers: number;
    pubkey_node: string;
    server_state: string;
    server_state_duration_us: string;
    time: string;
    uptime: number;
    validated_ledger: {
      age: number;
      base_fee_xrp: number;
      hash: string;
      reserve_base_xrp: number;
      reserve_inc_xrp: number;
      seq: number;
    };
    validation_quorum: number;
  };
}

export class XRPLAPI {
  private client: AxiosInstance;
  private config: Required<XRPLConfig>;

  constructor(config: XRPLConfig = {}) {
    const network = config.network || 'mainnet';
    let baseURL = config.baseURL;
    
    if (!baseURL) {
      switch (network) {
        case 'testnet':
          baseURL = 'https://s.altnet.rippletest.net:51234';
          break;
        case 'devnet':
          baseURL = 'https://s.devnet.rippletest.net:51234';
          break;
        default:
          baseURL = 'https://s1.ripple.com:51234';
      }
    }

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
   * Execute JSON-RPC method
   */
  private async rpc<T>(method: string, params: Record<string, unknown> = {}): Promise<T> {
    const response = await this.client.post('', {
      method,
      params: [params],
    });

    if (response.data.result?.error) {
      throw new Error(`XRPL Error: ${response.data.result.error_message || response.data.result.error}`);
    }

    return response.data.result;
  }

  /**
   * Get account information
   */
  async getAccountInfo(account: string): Promise<XRPLAccountInfo> {
    return this.rpc<XRPLAccountInfo>('account_info', {
      account,
      ledger_index: 'validated',
    });
  }

  /**
   * Get account balance in XRP
   */
  async getBalance(account: string): Promise<string> {
    const info = await this.getAccountInfo(account);
    // Convert drops to XRP (1 XRP = 1,000,000 drops)
    const drops = parseInt(info.account_data.Balance);
    return (drops / 1000000).toString();
  }

  /**
   * Get all balances (XRP + issued currencies)
   */
  async getAllBalances(account: string): Promise<XRPLBalance[]> {
    const balances: XRPLBalance[] = [];
    
    // Get XRP balance
    const info = await this.getAccountInfo(account);
    const xrpDrops = parseInt(info.account_data.Balance);
    balances.push({
      currency: 'XRP',
      value: (xrpDrops / 1000000).toString(),
    });

    // Get trust lines (issued currencies)
    const lines = await this.rpc<{ lines: Array<{
      account: string;
      balance: string;
      currency: string;
      limit: string;
    }> }>('account_lines', {
      account,
      ledger_index: 'validated',
    });

    for (const line of lines.lines) {
      balances.push({
        currency: line.currency,
        value: line.balance,
        issuer: line.account,
      });
    }

    return balances;
  }

  /**
   * Get account transactions
   */
  async getTransactions(
    account: string,
    limit: number = 50,
    marker?: unknown
  ): Promise<XRPLAccountTxResponse> {
    const params: Record<string, unknown> = {
      account,
      ledger_index_min: -1,
      ledger_index_max: -1,
      limit,
    };

    if (marker) {
      params.marker = marker;
    }

    return this.rpc<XRPLAccountTxResponse>('account_tx', params);
  }

  /**
   * Get transaction by hash
   */
  async getTransaction(hash: string): Promise<XRPLTransaction> {
    const result = await this.rpc<{ meta: unknown; tx: XRPLTransaction; validated: boolean }>('tx', {
      transaction: hash,
    });
    return result.tx;
  }

  /**
   * Submit signed transaction
   */
  async submitTransaction(txBlob: string): Promise<{
    engine_result: string;
    engine_result_code: number;
    engine_result_message: string;
    tx_blob: string;
    tx_json: XRPLTransaction;
  }> {
    return this.rpc('submit', {
      tx_blob: txBlob,
    });
  }

  /**
   * Get ledger (block) info
   */
  async getLedger(ledgerIndex: number | 'validated' | 'current' = 'validated'): Promise<{
    ledger: {
      accepted: boolean;
      account_hash: string;
      close_flags: number;
      close_time: number;
      close_time_human: string;
      close_time_resolution: number;
      closed: boolean;
      hash: string;
      ledger_hash: string;
      ledger_index: string;
      parent_close_time: number;
      parent_hash: string;
      seqNum: string;
      totalCoins: string;
      total_coins: string;
      transaction_hash: string;
    };
    ledger_hash: string;
    ledger_index: number;
    validated: boolean;
  }> {
    return this.rpc('ledger', {
      ledger_index: ledgerIndex,
      transactions: false,
      expand: false,
    });
  }

  /**
   * Get server info
   */
  async getServerInfo(): Promise<XRPLServerInfo> {
    return this.rpc<XRPLServerInfo>('server_info');
  }

  /**
   * Get fee statistics
   */
  async getFee(): Promise<{
    current_ledger_size: string;
    current_queue_size: string;
    drops: {
      base_fee: string;
      median_fee: string;
      minimum_fee: string;
      open_ledger_fee: string;
    };
    expected_ledger_size: string;
    ledger_current_index: number;
    levels: {
      median_level: string;
      minimum_level: string;
      open_ledger_level: string;
      reference_level: string;
    };
    max_queue_size: string;
  }> {
    return this.rpc('fee');
  }

  /**
   * Get order book
   */
  async getOrderBook(
    takerPays: { currency: string; issuer?: string },
    takerGets: { currency: string; issuer?: string },
    limit: number = 20
  ): Promise<{
    ledger_current_index: number;
    offers: Array<{
      Account: string;
      BookDirectory: string;
      BookNode: string;
      Flags: number;
      LedgerEntryType: string;
      OwnerNode: string;
      PreviousTxnID: string;
      PreviousTxnLgrSeq: number;
      Sequence: number;
      TakerGets: string | { currency: string; issuer: string; value: string };
      TakerPays: string | { currency: string; issuer: string; value: string };
      index: string;
      owner_funds: string;
      quality: string;
    }>;
    validated: boolean;
  }> {
    return this.rpc('book_offers', {
      taker_pays: takerPays,
      taker_gets: takerGets,
      limit,
    });
  }

  /**
   * Get account channels (payment channels)
   */
  async getAccountChannels(account: string): Promise<{
    account: string;
    channels: Array<{
      account: string;
      amount: string;
      balance: string;
      channel_id: string;
      destination_account: string;
      destination_tag?: number;
      expiration?: number;
      public_key: string;
      public_key_hex: string;
      settle_delay: number;
    }>;
    ledger_hash: string;
    ledger_index: number;
    validated: boolean;
  }> {
    return this.rpc('account_channels', {
      account,
      ledger_index: 'validated',
    });
  }

  /**
   * Get account objects (escrows, checks, offers, etc.)
   */
  async getAccountObjects(account: string, type?: string): Promise<{
    account: string;
    account_objects: unknown[];
    ledger_hash: string;
    ledger_index: number;
    validated: boolean;
  }> {
    const params: Record<string, unknown> = {
      account,
      ledger_index: 'validated',
    };

    if (type) {
      params.type = type;
    }

    return this.rpc('account_objects', params);
  }

  /**
   * Get account offers (open orders)
   */
  async getAccountOffers(account: string): Promise<{
    account: string;
    offers: Array<{
      flags: number;
      seq: number;
      taker_gets: string | { currency: string; issuer: string; value: string };
      taker_pays: string | { currency: string; issuer: string; value: string };
    }>;
    ledger_current_index: number;
    validated: boolean;
  }> {
    return this.rpc('account_offers', {
      account,
      ledger_index: 'validated',
    });
  }
}

// Singleton instance for mainnet
export const xrplAPI = new XRPLAPI();

// Factory function for custom configuration
export const createXRPLAPI = (config: XRPLConfig) => {
  return new XRPLAPI(config);
};
