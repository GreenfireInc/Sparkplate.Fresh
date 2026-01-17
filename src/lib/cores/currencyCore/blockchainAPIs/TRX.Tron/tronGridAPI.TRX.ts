/**
 * TronGrid API for Tron (TRX)
 * 
 * Official TRON API with fast and reliable node access
 * 
 * Features:
 * - Free tier with rate limits
 * - Fast node access
 * - Full node HTTP APIs
 * - Smart contract deployment and interaction
 * - Transaction broadcasting
 * - Account and balance queries
 * - Block and transaction data
 * 
 * Documentation: https://developers.tron.network/docs/trongrid
 * Website: https://www.trongrid.io/
 */

import axios, { AxiosInstance } from 'axios';

// API Configuration
export interface TronGridConfig {
  baseURL?: string;
  apiKey?: string;
  timeout?: number;
  retries?: number;
  network?: 'mainnet' | 'shasta' | 'nile';
}

// Account Information
export interface TronGridAccount {
  address: string;
  balance: number;
  create_time: number;
  latest_opration_time?: number;
  latest_consume_free_time?: number;
  account_resource?: {
    frozen_balance_for_energy?: {
      frozen_balance: number;
      expire_time: number;
    };
  };
  owner_permission?: unknown;
  active_permission?: unknown[];
  frozenV2?: unknown[];
  asset_v2?: unknown[];
  free_asset_net_usageV2?: unknown[];
  assetV2?: unknown[];
}

// Transaction
export interface TronGridTransaction {
  ret: Array<{
    contractRet: string;
    fee?: number;
  }>;
  signature: string[];
  txID: string;
  raw_data: {
    contract: Array<{
      parameter: {
        value: {
          owner_address: string;
          to_address?: string;
          amount?: number;
          data?: string;
          contract_address?: string;
        };
        type_url: string;
      };
      type: string;
    }>;
    ref_block_bytes: string;
    ref_block_hash: string;
    expiration: number;
    timestamp: number;
    fee_limit?: number;
  };
  raw_data_hex: string;
}

// Block Information
export interface TronGridBlock {
  blockID: string;
  block_header: {
    raw_data: {
      number: number;
      txTrieRoot: string;
      witness_address: string;
      parentHash: string;
      version: number;
      timestamp: number;
    };
    witness_signature: string;
  };
  transactions?: TronGridTransaction[];
}

// Contract Result
export interface TronGridContractResult {
  result: {
    result: boolean;
  };
  energy_used: number;
  constant_result?: string[];
  transaction: TronGridTransaction;
}

export class TronGridAPI {
  private client: AxiosInstance;
  private config: Required<TronGridConfig>;

  constructor(config: TronGridConfig = {}) {
    const network = config.network || 'mainnet';
    let baseURL = config.baseURL;
    
    if (!baseURL) {
      switch (network) {
        case 'shasta':
          baseURL = 'https://api.shasta.trongrid.io';
          break;
        case 'nile':
          baseURL = 'https://api.nile.trongrid.io';
          break;
        default:
          baseURL = 'https://api.trongrid.io';
      }
    }

    this.config = {
      baseURL,
      apiKey: config.apiKey,
      timeout: config.timeout || 30000,
      retries: config.retries || 3,
      network,
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
  async getAccount(address: string): Promise<TronGridAccount> {
    const response = await this.client.post('/wallet/getaccount', {
      address,
      visible: true,
    });
    return response.data;
  }

  /**
   * Get account balance (in SUN)
   */
  async getBalance(address: string): Promise<number> {
    const account = await this.getAccount(address);
    return account.balance || 0;
  }

  /**
   * Get account resource (bandwidth and energy)
   */
  async getAccountResource(address: string): Promise<{
    freeNetLimit: number;
    NetLimit: number;
    EnergyLimit: number;
    freeNetUsed: number;
    NetUsed: number;
    EnergyUsed: number;
  }> {
    const response = await this.client.post('/wallet/getaccountresource', {
      address,
      visible: true,
    });
    return response.data;
  }

  /**
   * Get transaction by ID
   */
  async getTransactionById(txId: string): Promise<TronGridTransaction> {
    const response = await this.client.post('/wallet/gettransactionbyid', {
      value: txId,
    });
    return response.data;
  }

  /**
   * Get transaction info by ID
   */
  async getTransactionInfoById(txId: string): Promise<{
    id: string;
    fee: number;
    blockNumber: number;
    blockTimeStamp: number;
    contractResult: string[];
    contract_address?: string;
    receipt: {
      energy_usage: number;
      energy_usage_total: number;
      net_usage: number;
      result: string;
    };
    log?: unknown[];
  }> {
    const response = await this.client.post('/wallet/gettransactioninfobyid', {
      value: txId,
    });
    return response.data;
  }

  /**
   * Get block by number
   */
  async getBlockByNum(blockNum: number): Promise<TronGridBlock> {
    const response = await this.client.post('/wallet/getblockbynum', {
      num: blockNum,
    });
    return response.data;
  }

  /**
   * Get latest block
   */
  async getNowBlock(): Promise<TronGridBlock> {
    const response = await this.client.post('/wallet/getnowblock');
    return response.data;
  }

  /**
   * Get current block number
   */
  async getBlockHeight(): Promise<number> {
    const block = await this.getNowBlock();
    return block.block_header.raw_data.number;
  }

  /**
   * Get block by ID
   */
  async getBlockById(blockId: string): Promise<TronGridBlock> {
    const response = await this.client.post('/wallet/getblockbyid', {
      value: blockId,
    });
    return response.data;
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
    const response = await this.client.post('/wallet/broadcasttransaction', transaction);
    return response.data;
  }

  /**
   * Trigger smart contract (read-only)
   */
  async triggerConstantContract(
    contractAddress: string,
    functionSelector: string,
    parameter: string,
    ownerAddress: string
  ): Promise<TronGridContractResult> {
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
   * Trigger smart contract (state-changing)
   */
  async triggerSmartContract(
    contractAddress: string,
    functionSelector: string,
    parameter: string,
    feeLimit: number,
    ownerAddress: string,
    callValue?: number
  ): Promise<TronGridContractResult> {
    const response = await this.client.post('/wallet/triggersmartcontract', {
      contract_address: contractAddress,
      function_selector: functionSelector,
      parameter,
      fee_limit: feeLimit,
      call_value: callValue || 0,
      owner_address: ownerAddress,
      visible: true,
    });
    return response.data;
  }

  /**
   * Get contract information
   */
  async getContract(contractAddress: string): Promise<{
    bytecode: string;
    name: string;
    origin_address: string;
    abi: { entrys: unknown[] };
    origin_energy_limit: number;
    contract_address: string;
  }> {
    const response = await this.client.post('/wallet/getcontract', {
      value: contractAddress,
      visible: true,
    });
    return response.data;
  }

  /**
   * Get TRC20 token balance
   */
  async getTRC20Balance(
    contractAddress: string,
    ownerAddress: string
  ): Promise<{ balance: string; decimals: number }> {
    const result = await this.triggerConstantContract(
      contractAddress,
      'balanceOf(address)',
      ownerAddress,
      ownerAddress
    );
    
    const balance = result.constant_result?.[0] || '0';
    return {
      balance,
      decimals: 18, // Most TRC20 tokens use 18 decimals
    };
  }

  /**
   * Get list of witnesses (super representatives)
   */
  async listWitnesses(): Promise<{ witnesses: unknown[] }> {
    const response = await this.client.post('/wallet/listwitnesses');
    return response.data;
  }

  /**
   * Get chain parameters
   */
  async getChainParameters(): Promise<{ chainParameter: unknown[] }> {
    const response = await this.client.post('/wallet/getchainparameters');
    return response.data;
  }

  /**
   * Get node info
   */
  async getNodeInfo(): Promise<{
    activeConnectCount: number;
    beginSyncNum: number;
    block: string;
    cheatWitnessInfoMap: Record<string, string>;
    configNodeInfo: {
      activeNodeSize: number;
      allowAdaptiveEnergy: number;
      codeVersion: string;
    };
    currentConnectCount: number;
    machineInfo: {
      cpuCount: number;
      cpuRate: number;
      deadLockThreadCount: number;
      freeMemory: number;
      javaVersion: string;
      jvmFreeMemory: number;
      jvmTotalMemory: number;
      memoryDescInfoList: unknown[];
      osName: string;
      processCpuRate: number;
      threadCount: number;
      totalMemory: number;
    };
    passiveConnectCount: number;
    peerList: unknown[];
    solidityBlock: string;
  }> {
    const response = await this.client.post('/wallet/getnodeinfo');
    return response.data;
  }

  /**
   * Create transaction (transfer TRX)
   */
  async createTransaction(toAddress: string, amount: number, ownerAddress: string): Promise<TronGridTransaction> {
    const response = await this.client.post('/wallet/createtransaction', {
      to_address: toAddress,
      owner_address: ownerAddress,
      amount,
      visible: true,
    });
    return response.data;
  }
}

// Singleton instance for mainnet
export const tronGridAPI = new TronGridAPI();

// Factory function for custom configuration
export const createTronGridAPI = (config: TronGridConfig) => {
  return new TronGridAPI(config);
};
