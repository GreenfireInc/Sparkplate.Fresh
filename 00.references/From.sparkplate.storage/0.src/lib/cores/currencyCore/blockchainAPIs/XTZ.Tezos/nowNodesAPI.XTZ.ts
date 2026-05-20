/**
 * NOWNodes API for Tezos (XTZ)
 * 
 * Full node access with free tier
 * 
 * Features:
 * - Free tier: 20,000 requests/day
 * - Full node access
 * - Block explorer data
 * - Testnet support
 * - RPC endpoints
 * 
 * Documentation: https://nownodes.io/nodes/tezos-xtz
 * Website: https://nownodes.io/
 */

import axios, { AxiosInstance } from 'axios';

// API Configuration
export interface NOWNodesTezosConfig {
  apiKey: string;
  baseURL?: string;
  timeout?: number;
  retries?: number;
  network?: 'mainnet' | 'testnet';
}

export class NOWNodesTezosAPI {
  private client: AxiosInstance;
  private config: Required<NOWNodesTezosConfig>;

  constructor(config: NOWNodesTezosConfig) {
    if (!config.apiKey) {
      throw new Error('NOWNodes API key is required');
    }

    const network = config.network || 'mainnet';
    const baseURL = config.baseURL || 
      (network === 'mainnet'
        ? 'https://xtz.nownodes.io'
        : 'https://xtz-testnet.nownodes.io');

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
        'api-key': this.config.apiKey,
      },
    });
  }

  /**
   * Get account balance
   */
  async getBalance(address: string): Promise<string> {
    const response = await this.client.get(`/chains/main/blocks/head/context/contracts/${address}/balance`);
    // Convert mutez to XTZ
    const mutez = parseInt(response.data);
    return (mutez / 1000000).toString();
  }

  /**
   * Get account info
   */
  async getAccount(address: string): Promise<{
    balance: string;
    counter: string;
  }> {
    const response = await this.client.get(`/chains/main/blocks/head/context/contracts/${address}`);
    return response.data;
  }

  /**
   * Get account counter
   */
  async getCounter(address: string): Promise<number> {
    const response = await this.client.get(`/chains/main/blocks/head/context/contracts/${address}/counter`);
    return parseInt(response.data);
  }

  /**
   * Get block by level
   */
  async getBlock(level: number | 'head' = 'head'): Promise<unknown> {
    const response = await this.client.get(`/chains/main/blocks/${level}`);
    return response.data;
  }

  /**
   * Get block header
   */
  async getBlockHeader(level: number | 'head' = 'head'): Promise<unknown> {
    const response = await this.client.get(`/chains/main/blocks/${level}/header`);
    return response.data;
  }

  /**
   * Get operations in block
   */
  async getBlockOperations(level: number | 'head' = 'head'): Promise<unknown[]> {
    const response = await this.client.get(`/chains/main/blocks/${level}/operations`);
    return response.data;
  }

  /**
   * Inject operation (broadcast transaction)
   */
  async injectOperation(signedOperation: string): Promise<string> {
    const response = await this.client.post('/injection/operation', JSON.stringify(signedOperation), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  }

  /**
   * Preapply operations
   */
  async preapplyOperations(operations: unknown[]): Promise<unknown[]> {
    const response = await this.client.post('/chains/main/blocks/head/helpers/preapply/operations', operations);
    return response.data;
  }

  /**
   * Forge operations
   */
  async forgeOperations(operations: unknown): Promise<string> {
    const response = await this.client.post('/chains/main/blocks/head/helpers/forge/operations', operations);
    return response.data;
  }

  /**
   * Run operation
   */
  async runOperation(operation: unknown): Promise<unknown> {
    const response = await this.client.post('/chains/main/blocks/head/helpers/scripts/run_operation', operation);
    return response.data;
  }

  /**
   * Get contract storage
   */
  async getContractStorage(address: string): Promise<unknown> {
    const response = await this.client.get(`/chains/main/blocks/head/context/contracts/${address}/storage`);
    return response.data;
  }

  /**
   * Get contract script
   */
  async getContractScript(address: string): Promise<unknown> {
    const response = await this.client.get(`/chains/main/blocks/head/context/contracts/${address}/script`);
    return response.data;
  }

  /**
   * Get constants
   */
  async getConstants(): Promise<unknown> {
    const response = await this.client.get('/chains/main/blocks/head/context/constants');
    return response.data;
  }
}

// Factory function (API key required)
export const createNOWNodesTezosAPI = (apiKey: string, network?: 'mainnet' | 'testnet') => {
  return new NOWNodesTezosAPI({ apiKey, network });
};
