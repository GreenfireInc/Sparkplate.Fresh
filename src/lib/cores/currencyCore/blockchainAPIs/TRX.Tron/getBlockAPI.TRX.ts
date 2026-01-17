/**
 * GetBlock API for Tron (TRX)
 * 
 * RPC node access for Tron blockchain
 * 
 * Features:
 * - Free tier with API key
 * - RPC node access
 * - Fast and reliable
 * - Transaction broadcasting
 * - Smart contract interaction
 * - Multiple network support
 * 
 * Documentation: https://getblock.io/docs/tron/
 * Website: https://getblock.io/nodes/tron-trx/
 */

import axios, { AxiosInstance } from 'axios';

// API Configuration
export interface GetBlockTronConfig {
  apiKey: string;
  baseURL?: string;
  timeout?: number;
  retries?: number;
  network?: 'mainnet' | 'testnet';
}

// Account Information
export interface GetBlockAccount {
  address: string;
  balance: number;
  create_time: number;
  account_resource?: unknown;
  frozenV2?: unknown[];
}

// Transaction
export interface GetBlockTransaction {
  txID: string;
  raw_data: {
    contract: unknown[];
    ref_block_bytes: string;
    ref_block_hash: string;
    expiration: number;
    timestamp: number;
  };
  ret: Array<{
    contractRet: string;
  }>;
  signature: string[];
}

// Block Information
export interface GetBlockBlock {
  blockID: string;
  block_header: {
    raw_data: {
      number: number;
      txTrieRoot: string;
      witness_address: string;
      parentHash: string;
      timestamp: number;
    };
    witness_signature: string;
  };
  transactions?: GetBlockTransaction[];
}

export class GetBlockTronAPI {
  private client: AxiosInstance;
  private config: Required<GetBlockTronConfig>;

  constructor(config: GetBlockTronConfig) {
    if (!config.apiKey) {
      throw new Error('GetBlock API key is required');
    }

    const network = config.network || 'mainnet';
    const baseURL = config.baseURL || 
      (network === 'mainnet' 
        ? `https://trx.getblock.io/${config.apiKey}/mainnet/`
        : `https://trx.getblock.io/${config.apiKey}/testnet/`);

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
   * Get account information
   */
  async getAccount(address: string): Promise<GetBlockAccount> {
    const response = await this.client.post('', {
      jsonrpc: '2.0',
      method: 'getaccount',
      params: [{ address, visible: true }],
      id: 1,
    });
    return response.data.result;
  }

  /**
   * Get account balance
   */
  async getBalance(address: string): Promise<number> {
    const account = await this.getAccount(address);
    return account.balance || 0;
  }

  /**
   * Get transaction by ID
   */
  async getTransactionById(txId: string): Promise<GetBlockTransaction> {
    const response = await this.client.post('', {
      jsonrpc: '2.0',
      method: 'gettransactionbyid',
      params: [{ value: txId }],
      id: 1,
    });
    return response.data.result;
  }

  /**
   * Get block by number
   */
  async getBlockByNum(blockNum: number): Promise<GetBlockBlock> {
    const response = await this.client.post('', {
      jsonrpc: '2.0',
      method: 'getblockbynum',
      params: [{ num: blockNum }],
      id: 1,
    });
    return response.data.result;
  }

  /**
   * Get latest block
   */
  async getNowBlock(): Promise<GetBlockBlock> {
    const response = await this.client.post('', {
      jsonrpc: '2.0',
      method: 'getnowblock',
      params: [],
      id: 1,
    });
    return response.data.result;
  }

  /**
   * Get current block height
   */
  async getBlockHeight(): Promise<number> {
    const block = await this.getNowBlock();
    return block.block_header.raw_data.number;
  }

  /**
   * Broadcast transaction
   */
  async broadcastTransaction(transaction: unknown): Promise<{
    result: boolean;
    txid: string;
    code?: string;
    message?: string;
  }> {
    const response = await this.client.post('', {
      jsonrpc: '2.0',
      method: 'broadcasttransaction',
      params: [transaction],
      id: 1,
    });
    return response.data.result;
  }

  /**
   * Trigger constant contract (read-only)
   */
  async triggerConstantContract(
    contractAddress: string,
    functionSelector: string,
    parameter: string,
    ownerAddress: string
  ): Promise<unknown> {
    const response = await this.client.post('', {
      jsonrpc: '2.0',
      method: 'triggerconstantcontract',
      params: [{
        contract_address: contractAddress,
        function_selector: functionSelector,
        parameter,
        owner_address: ownerAddress,
        visible: true,
      }],
      id: 1,
    });
    return response.data.result;
  }

  /**
   * Get contract information
   */
  async getContract(contractAddress: string): Promise<unknown> {
    const response = await this.client.post('', {
      jsonrpc: '2.0',
      method: 'getcontract',
      params: [{ value: contractAddress, visible: true }],
      id: 1,
    });
    return response.data.result;
  }

  /**
   * Get account resource
   */
  async getAccountResource(address: string): Promise<unknown> {
    const response = await this.client.post('', {
      jsonrpc: '2.0',
      method: 'getaccountresource',
      params: [{ address, visible: true }],
      id: 1,
    });
    return response.data.result;
  }

  /**
   * Get chain parameters
   */
  async getChainParameters(): Promise<{ chainParameter: unknown[] }> {
    const response = await this.client.post('', {
      jsonrpc: '2.0',
      method: 'getchainparameters',
      params: [],
      id: 1,
    });
    return response.data.result;
  }

  /**
   * Get node info
   */
  async getNodeInfo(): Promise<unknown> {
    const response = await this.client.post('', {
      jsonrpc: '2.0',
      method: 'getnodeinfo',
      params: [],
      id: 1,
    });
    return response.data.result;
  }
}

// Factory function (API key required)
export const createGetBlockTronAPI = (apiKey: string, network?: 'mainnet' | 'testnet') => {
  return new GetBlockTronAPI({ apiKey, network });
};
