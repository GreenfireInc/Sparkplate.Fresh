/**
 * GetBlock API for Waves (WAVES)
 * 
 * RPC node provider for Waves blockchain
 * 
 * Features:
 * - Free tier with API key
 * - Instant access to Waves RPC nodes
 * - Blocks and transactions retrieval
 * - High availability
 * - Reliable infrastructure
 * 
 * Documentation: https://getblock.io/docs/waves/
 * Website: https://getblock.io/nodes/waves/
 */

import axios, { AxiosInstance } from 'axios';

// API Configuration
export interface GetBlockWavesConfig {
  apiKey: string;
  baseURL?: string;
  timeout?: number;
  retries?: number;
  network?: 'mainnet' | 'testnet';
}

// Account Balance
export interface GetBlockBalance {
  address: string;
  balance: number;
}

// Transaction
export interface GetBlockTransaction {
  type: number;
  id: string;
  sender: string;
  senderPublicKey: string;
  fee: number;
  timestamp: number;
  proofs: string[];
  version: number;
  height: number;
}

// Block
export interface GetBlockBlock {
  version: number;
  timestamp: number;
  reference: string;
  generator: string;
  signature: string;
  blocksize: number;
  transactionCount: number;
  height: number;
  fee: number;
}

export class GetBlockWavesAPI {
  private client: AxiosInstance;
  private config: Required<GetBlockWavesConfig>;

  constructor(config: GetBlockWavesConfig) {
    if (!config.apiKey) {
      throw new Error('GetBlock API key is required');
    }

    const network = config.network || 'mainnet';
    const baseURL = config.baseURL || 
      (network === 'mainnet' 
        ? `https://go.getblock.io/${config.apiKey}/`
        : `https://go.getblock.io/${config.apiKey}/testnet/`);

    this.config = {
      apiKey: config.apiKey,
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
   * Get address balance
   */
  async getBalance(address: string): Promise<number> {
    const response = await this.client.get<GetBlockBalance>(`addresses/balance/${address}`);
    return response.data.balance;
  }

  /**
   * Get transaction by ID
   */
  async getTransaction(txId: string): Promise<GetBlockTransaction> {
    const response = await this.client.get(`transactions/info/${txId}`);
    return response.data;
  }

  /**
   * Get transaction history
   */
  async getTransactionHistory(address: string, limit: number = 100): Promise<GetBlockTransaction[][]> {
    const response = await this.client.get(`transactions/address/${address}/limit/${limit}`);
    return response.data;
  }

  /**
   * Get block by height
   */
  async getBlockByHeight(height: number): Promise<GetBlockBlock> {
    const response = await this.client.get(`blocks/at/${height}`);
    return response.data;
  }

  /**
   * Get current blockchain height
   */
  async getHeight(): Promise<number> {
    const response = await this.client.get<{ height: number }>('blocks/height');
    return response.data.height;
  }

  /**
   * Get last block
   */
  async getLastBlock(): Promise<GetBlockBlock> {
    const response = await this.client.get('blocks/last');
    return response.data;
  }

  /**
   * Broadcast transaction
   */
  async broadcastTransaction(signedTx: unknown): Promise<GetBlockTransaction> {
    const response = await this.client.post('transactions/broadcast', signedTx);
    return response.data;
  }

  /**
   * Get asset balance
   */
  async getAssetBalance(address: string, assetId: string): Promise<number> {
    const response = await this.client.get<{ balance: number }>(
      `assets/balance/${address}/${assetId}`
    );
    return response.data.balance;
  }

  /**
   * Get asset info
   */
  async getAssetInfo(assetId: string): Promise<unknown> {
    const response = await this.client.get(`assets/details/${assetId}`);
    return response.data;
  }

  /**
   * Validate address
   */
  async validateAddress(address: string): Promise<{ address: string; valid: boolean }> {
    const response = await this.client.get(`addresses/validate/${address}`);
    return response.data;
  }
}

// Factory function (API key required)
export const createGetBlockWavesAPI = (apiKey: string, network?: 'mainnet' | 'testnet') => {
  return new GetBlockWavesAPI({ apiKey, network });
};
