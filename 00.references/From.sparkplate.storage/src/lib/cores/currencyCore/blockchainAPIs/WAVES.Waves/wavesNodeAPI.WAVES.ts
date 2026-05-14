/**
 * Waves Node REST API for Waves (WAVES)
 * 
 * Official node REST API - main interface for blockchain interaction
 * 
 * Features:
 * - Free public access with rate limits
 * - Complete blockchain data access
 * - Transaction broadcasting
 * - Smart contract (dApp) interaction
 * - Asset and NFT queries
 * - Staking and leasing information
 * - Node pools with public endpoints
 * 
 * Documentation: https://docs.waves.tech/en/waves-node/node-api/
 * Website: https://nodes.wavesnodes.com/
 */

import axios, { AxiosInstance } from 'axios';

// API Configuration
export interface WavesNodeConfig {
  baseURL?: string;
  timeout?: number;
  retries?: number;
  network?: 'mainnet' | 'testnet' | 'stagenet';
}

// Account Information
export interface WavesAccountInfo {
  address: string;
  regular: {
    available: number;
    effective: number;
    generating: number;
  };
  generating: {
    available: number;
    effective: number;
  };
  available: {
    available: number;
    effective: number;
  };
  effective: {
    available: number;
    effective: number;
  };
}

// Balance
export interface WavesBalance {
  address: string;
  balance: number;
}

// Transaction
export interface WavesTransaction {
  type: number;
  id: string;
  sender: string;
  senderPublicKey: string;
  fee: number;
  feeAssetId: string | null;
  timestamp: number;
  proofs: string[];
  version: number;
  recipient?: string;
  amount?: number;
  assetId?: string | null;
  attachment?: string;
  height: number;
  applicationStatus: string;
}

// Block Information
export interface WavesBlock {
  version: number;
  timestamp: number;
  reference: string;
  'nxt-consensus': {
    'base-target': number;
    'generation-signature': string;
  };
  features: number[];
  generator: string;
  signature: string;
  blocksize: number;
  transactionCount: number;
  transactions: WavesTransaction[];
  height: number;
  reward: number;
  desiredReward: number;
  VRF?: string;
  fee: number;
}

// Asset Information
export interface WavesAsset {
  assetId: string;
  issueHeight: number;
  issueTimestamp: number;
  issuer: string;
  issuerPublicKey: string;
  name: string;
  description: string;
  decimals: number;
  reissuable: boolean;
  quantity: number;
  scripted: boolean;
  minSponsoredAssetFee: number | null;
  originTransactionId: string;
}

// Asset Balance
export interface WavesAssetBalance {
  address: string;
  assetId: string;
  balance: number;
}

export class WavesNodeAPI {
  private client: AxiosInstance;
  private config: Required<WavesNodeConfig>;

  constructor(config: WavesNodeConfig = {}) {
    const network = config.network || 'mainnet';
    let baseURL = config.baseURL;
    
    if (!baseURL) {
      switch (network) {
        case 'testnet':
          baseURL = 'https://nodes-testnet.wavesnodes.com';
          break;
        case 'stagenet':
          baseURL = 'https://nodes-stagenet.wavesnodes.com';
          break;
        default:
          baseURL = 'https://nodes.wavesnodes.com';
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
   * Get address balance
   */
  async getBalance(address: string): Promise<number> {
    const response = await this.client.get<WavesBalance>(`/addresses/balance/${address}`);
    return response.data.balance;
  }

  /**
   * Get address details with all balances
   */
  async getAddressDetails(address: string): Promise<WavesAccountInfo> {
    const response = await this.client.get(`/addresses/balance/details/${address}`);
    return response.data;
  }

  /**
   * Get transaction by ID
   */
  async getTransaction(txId: string): Promise<WavesTransaction> {
    const response = await this.client.get(`/transactions/info/${txId}`);
    return response.data;
  }

  /**
   * Get transaction history for an address
   */
  async getTransactionHistory(
    address: string,
    limit: number = 100,
    after?: string
  ): Promise<WavesTransaction[][]> {
    const response = await this.client.get(`/transactions/address/${address}/limit/${limit}`, {
      params: after ? { after } : {},
    });
    return response.data;
  }

  /**
   * Get unconfirmed transactions for an address
   */
  async getUnconfirmedTransactions(address?: string): Promise<WavesTransaction[]> {
    const url = address 
      ? `/transactions/unconfirmed/info/${address}`
      : '/transactions/unconfirmed';
    const response = await this.client.get(url);
    return response.data;
  }

  /**
   * Broadcast transaction
   */
  async broadcastTransaction(signedTx: unknown): Promise<WavesTransaction> {
    const response = await this.client.post('/transactions/broadcast', signedTx);
    return response.data;
  }

  /**
   * Get block by height
   */
  async getBlockByHeight(height: number): Promise<WavesBlock> {
    const response = await this.client.get(`/blocks/at/${height}`);
    return response.data;
  }

  /**
   * Get block by signature/ID
   */
  async getBlockById(id: string): Promise<WavesBlock> {
    const response = await this.client.get(`/blocks/${id}`);
    return response.data;
  }

  /**
   * Get current blockchain height
   */
  async getHeight(): Promise<number> {
    const response = await this.client.get<{ height: number }>('/blocks/height');
    return response.data.height;
  }

  /**
   * Get last block
   */
  async getLastBlock(): Promise<WavesBlock> {
    const response = await this.client.get('/blocks/last');
    return response.data;
  }

  /**
   * Get blocks in range
   */
  async getBlocksRange(from: number, to: number): Promise<WavesBlock[]> {
    const response = await this.client.get(`/blocks/seq/${from}/${to}`);
    return response.data;
  }

  /**
   * Get asset information
   */
  async getAssetInfo(assetId: string): Promise<WavesAsset> {
    const response = await this.client.get(`/assets/details/${assetId}`);
    return response.data;
  }

  /**
   * Get asset balance for address
   */
  async getAssetBalance(address: string, assetId: string): Promise<number> {
    const response = await this.client.get<WavesAssetBalance>(
      `/assets/balance/${address}/${assetId}`
    );
    return response.data.balance;
  }

  /**
   * Get all asset balances for address
   */
  async getAllAssetBalances(address: string): Promise<{ balances: WavesAssetBalance[] }> {
    const response = await this.client.get(`/assets/balance/${address}`);
    return response.data;
  }

  /**
   * Get NFT balances for address
   */
  async getNFTBalances(address: string, limit: number = 100): Promise<WavesAssetBalance[]> {
    const response = await this.client.get(`/assets/nft/${address}/limit/${limit}`);
    return response.data;
  }

  /**
   * Get asset distribution (holders)
   */
  async getAssetDistribution(assetId: string, height?: number): Promise<Record<string, number>> {
    const url = height 
      ? `/assets/${assetId}/distribution/${height}/limit/1000`
      : `/assets/${assetId}/distribution/1000`;
    const response = await this.client.get(url);
    return response.data;
  }

  /**
   * Get leasing information for address
   */
  async getActiveLeases(address: string): Promise<unknown[]> {
    const response = await this.client.get(`/leasing/active/${address}`);
    return response.data;
  }

  /**
   * Evaluate script on address
   */
  async evaluateScript(address: string, expr: string): Promise<{
    result: {
      type: string;
      value: unknown;
    };
    complexity: number;
    expr: string;
    address: string;
  }> {
    const response = await this.client.post('/utils/script/evaluate', {
      address,
      expr,
    });
    return response.data;
  }

  /**
   * Get data entries for address
   */
  async getDataEntries(address: string, key?: string): Promise<unknown[]> {
    const url = key 
      ? `/addresses/data/${address}/${key}`
      : `/addresses/data/${address}`;
    const response = await this.client.get(url);
    return response.data;
  }

  /**
   * Get script info for address
   */
  async getScriptInfo(address: string): Promise<{
    address: string;
    script: string;
    scriptText: string;
    complexity: number;
    extraFee: number;
  } | { address: string }> {
    const response = await this.client.get(`/addresses/scriptInfo/${address}`);
    return response.data;
  }

  /**
   * Get node status
   */
  async getNodeStatus(): Promise<{
    blockchainHeight: number;
    stateHeight: number;
    updatedTimestamp: number;
    updatedDate: string;
  }> {
    const response = await this.client.get('/node/status');
    return response.data;
  }

  /**
   * Get node version
   */
  async getNodeVersion(): Promise<{ version: string }> {
    const response = await this.client.get('/node/version');
    return response.data;
  }

  /**
   * Validate address
   */
  async validateAddress(address: string): Promise<{ address: string; valid: boolean }> {
    const response = await this.client.get(`/addresses/validate/${address}`);
    return response.data;
  }

  /**
   * Get alias by address
   */
  async getAliasesByAddress(address: string): Promise<string[]> {
    const response = await this.client.get(`/alias/by-address/${address}`);
    return response.data;
  }

  /**
   * Get address by alias
   */
  async getAddressByAlias(alias: string): Promise<{ address: string }> {
    const response = await this.client.get(`/alias/by-alias/${alias}`);
    return response.data;
  }
}

// Singleton instance for mainnet
export const wavesNodeAPI = new WavesNodeAPI();

// Factory function for custom configuration
export const createWavesNodeAPI = (config: WavesNodeConfig) => {
  return new WavesNodeAPI(config);
};
