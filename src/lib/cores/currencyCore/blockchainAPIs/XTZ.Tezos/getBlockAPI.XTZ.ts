/**
 * GetBlock API for Tezos (XTZ)
 * 
 * RPC node provider for Tezos blockchain
 * 
 * Features:
 * - Free tier with API key
 * - Instant Tezos RPC node access
 * - Block and transaction data
 * - High availability
 * - Reliable infrastructure
 * 
 * Documentation: https://getblock.io/docs/tezos/
 * Website: https://getblock.io/nodes/xtz/
 */

import axios, { AxiosInstance } from 'axios';

// API Configuration
export interface GetBlockTezosConfig {
  apiKey: string;
  baseURL?: string;
  timeout?: number;
  retries?: number;
  network?: 'mainnet' | 'testnet';
}

export class GetBlockTezosAPI {
  private client: AxiosInstance;
  private config: Required<GetBlockTezosConfig>;

  constructor(config: GetBlockTezosConfig) {
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
   * Get account balance
   */
  async getBalance(address: string): Promise<string> {
    const response = await this.client.get(`chains/main/blocks/head/context/contracts/${address}/balance`);
    // Convert mutez to XTZ
    const mutez = parseInt(response.data);
    return (mutez / 1000000).toString();
  }

  /**
   * Get account info
   */
  async getAccount(address: string): Promise<unknown> {
    const response = await this.client.get(`chains/main/blocks/head/context/contracts/${address}`);
    return response.data;
  }

  /**
   * Get block
   */
  async getBlock(level: number | 'head' = 'head'): Promise<unknown> {
    const response = await this.client.get(`chains/main/blocks/${level}`);
    return response.data;
  }

  /**
   * Get block operations
   */
  async getBlockOperations(level: number | 'head' = 'head'): Promise<unknown[]> {
    const response = await this.client.get(`chains/main/blocks/${level}/operations`);
    return response.data;
  }

  /**
   * Inject operation
   */
  async injectOperation(signedOperation: string): Promise<string> {
    const response = await this.client.post('injection/operation', JSON.stringify(signedOperation), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  }

  /**
   * Get contract storage
   */
  async getContractStorage(address: string): Promise<unknown> {
    const response = await this.client.get(`chains/main/blocks/head/context/contracts/${address}/storage`);
    return response.data;
  }

  /**
   * Get contract script
   */
  async getContractScript(address: string): Promise<unknown> {
    const response = await this.client.get(`chains/main/blocks/head/context/contracts/${address}/script`);
    return response.data;
  }

  /**
   * Get constants
   */
  async getConstants(): Promise<unknown> {
    const response = await this.client.get('chains/main/blocks/head/context/constants');
    return response.data;
  }

  /**
   * Preapply operations
   */
  async preapplyOperations(operations: unknown[]): Promise<unknown[]> {
    const response = await this.client.post('chains/main/blocks/head/helpers/preapply/operations', operations);
    return response.data;
  }

  /**
   * Forge operations
   */
  async forgeOperations(operations: unknown): Promise<string> {
    const response = await this.client.post('chains/main/blocks/head/helpers/forge/operations', operations);
    return response.data;
  }
}

// Factory function (API key required)
export const createGetBlockTezosAPI = (apiKey: string, network?: 'mainnet' | 'testnet') => {
  return new GetBlockTezosAPI({ apiKey, network });
};
