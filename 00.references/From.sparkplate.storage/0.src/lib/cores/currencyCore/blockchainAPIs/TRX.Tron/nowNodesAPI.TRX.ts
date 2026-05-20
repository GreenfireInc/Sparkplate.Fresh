/**
 * NOWNodes API for Tron (TRX)
 * 
 * Full node access with free tier
 * 
 * Features:
 * - Free tier (5000 requests/month)
 * - Full node access
 * - 24/7 customer support
 * - High availability
 * - Multiple endpoints
 * 
 * Documentation: https://nownodes.io/docs/
 * Website: https://nownodes.io/nodes/tron-trx
 */

import axios, { AxiosInstance } from 'axios';

// API Configuration
export interface NOWNodesTronConfig {
  apiKey: string;
  baseURL?: string;
  timeout?: number;
  retries?: number;
}

export class NOWNodesTronAPI {
  private client: AxiosInstance;
  private config: Required<NOWNodesTronConfig>;

  constructor(config: NOWNodesTronConfig) {
    if (!config.apiKey) {
      throw new Error('NOWNodes API key is required');
    }

    this.config = {
      apiKey: config.apiKey,
      baseURL: config.baseURL || 'https://trx.nownodes.io',
      timeout: config.timeout || 30000,
      retries: config.retries || 3,
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
   * Get account information
   */
  async getAccount(address: string): Promise<unknown> {
    const response = await this.client.post('/wallet/getaccount', {
      address,
      visible: true,
    });
    return response.data;
  }

  /**
   * Get account balance
   */
  async getBalance(address: string): Promise<number> {
    const account: any = await this.getAccount(address);
    return account.balance || 0;
  }

  /**
   * Get transaction by ID
   */
  async getTransactionById(txId: string): Promise<unknown> {
    const response = await this.client.post('/wallet/gettransactionbyid', {
      value: txId,
    });
    return response.data;
  }

  /**
   * Get block by number
   */
  async getBlockByNum(blockNum: number): Promise<unknown> {
    const response = await this.client.post('/wallet/getblockbynum', {
      num: blockNum,
    });
    return response.data;
  }

  /**
   * Get latest block
   */
  async getNowBlock(): Promise<unknown> {
    const response = await this.client.post('/wallet/getnowblock');
    return response.data;
  }

  /**
   * Broadcast transaction
   */
  async broadcastTransaction(transaction: unknown): Promise<unknown> {
    const response = await this.client.post('/wallet/broadcasttransaction', transaction);
    return response.data;
  }

  /**
   * Trigger constant contract
   */
  async triggerConstantContract(
    contractAddress: string,
    functionSelector: string,
    parameter: string,
    ownerAddress: string
  ): Promise<unknown> {
    const response = await this.client.post('/wallet/triggerconstantcontract', {
      contract_address: contractAddress,
      function_selector: functionSelector,
      parameter,
      owner_address: ownerAddress,
      visible: true,
    });
    return response.data;
  }

  /**
   * Get contract
   */
  async getContract(contractAddress: string): Promise<unknown> {
    const response = await this.client.post('/wallet/getcontract', {
      value: contractAddress,
      visible: true,
    });
    return response.data;
  }

  /**
   * Get account resource
   */
  async getAccountResource(address: string): Promise<unknown> {
    const response = await this.client.post('/wallet/getaccountresource', {
      address,
      visible: true,
    });
    return response.data;
  }

  /**
   * Get node info
   */
  async getNodeInfo(): Promise<unknown> {
    const response = await this.client.post('/wallet/getnodeinfo');
    return response.data;
  }
}

// Factory function (API key required)
export const createNOWNodesTronAPI = (apiKey: string) => {
  return new NOWNodesTronAPI({ apiKey });
};
