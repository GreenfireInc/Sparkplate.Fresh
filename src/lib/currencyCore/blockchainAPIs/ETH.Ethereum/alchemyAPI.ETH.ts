// Alchemy API Implementation for Ethereum
// API Docs: https://docs.alchemy.com/
// Free tier: 300M compute units/month
// Enterprise-grade Ethereum node infrastructure and enhanced APIs

export interface AlchemyConfig {
  apiKey: string; // Required API Key
}

export interface AlchemyAssetTransfer {
  blockNum: string;
  hash: string;
  from: string;
  to: string | null;
  value: number | null;
  erc721TokenId: string | null;
  erc1155Metadata: unknown[] | null;
  tokenId: string | null;
  asset: string | null;
  category: string;
  rawContract: {
    value: string | null;
    address: string | null;
    decimal: string | null;
  };
}

export interface AlchemyNFT {
  contract: {
    address: string;
  };
  id: {
    tokenId: string;
    tokenMetadata: {
      tokenType: string;
    };
  };
  title: string;
  description: string;
  tokenUri: {
    raw: string;
    gateway: string;
  };
  media: Array<{
    raw: string;
    gateway: string;
  }>;
  metadata: unknown;
  timeLastUpdated: string;
}

export class AlchemyAPI {
  private baseUrl: string;
  private apiKey: string;
  private network: 'mainnet' | 'goerli' | 'sepolia' | 'polygon' | 'arbitrum' | 'optimism';
  private rpcId = 1;

  constructor(config: AlchemyConfig, network: 'mainnet' | 'goerli' | 'sepolia' | 'polygon' | 'arbitrum' | 'optimism' = 'mainnet') {
    this.apiKey = config.apiKey;
    this.network = network;
    
    // Map network to Alchemy network identifier
    const networkMap: Record<string, string> = {
      mainnet: 'eth-mainnet',
      goerli: 'eth-goerli',
      sepolia: 'eth-sepolia',
      polygon: 'polygon-mainnet',
      arbitrum: 'arb-mainnet',
      optimism: 'opt-mainnet'
    };
    
    this.baseUrl = `https://${networkMap[network]}.g.alchemy.com/v2/${this.apiKey}`;
  }

  /**
   * Make an RPC call
   */
  private async rpcCall<T = unknown>(method: string, params: unknown[] = []): Promise<T> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: this.rpcId++,
          method,
          params
        })
      });

      if (!response.ok) {
        throw new Error(`Alchemy API error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();

      if (result.error) {
        throw new Error(`RPC error: ${result.error.message} (code: ${result.error.code})`);
      }

      return result.result;
    } catch (error) {
      console.error(`[Alchemy] RPC call error (${method}):`, error);
      throw new Error(`Failed to execute RPC call: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get balance for an address
   */
  async getBalance(address: string, block: string | number = 'latest'): Promise<{
    balance: bigint;
    balanceETH: number;
  }> {
    try {
      console.log(`🔍 [Alchemy] Fetching balance for: ${address}`);
      
      const blockParam = typeof block === 'number' ? `0x${block.toString(16)}` : block;
      const balanceHex = await this.rpcCall<string>('eth_getBalance', [address, blockParam]);
      
      const balance = BigInt(balanceHex);
      const balanceETH = Number(balance) / 1e18;
      
      console.log(`✅ [Alchemy] Balance: ${balance} wei (${balanceETH} ETH)`);
      
      return {
        balance,
        balanceETH
      };
    } catch (error) {
      console.error('[Alchemy] Balance fetch error:', error);
      throw new Error(`Failed to fetch balance: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get asset transfers (Enhanced API)
   */
  async getAssetTransfers(params: {
    fromBlock?: string;
    toBlock?: string;
    fromAddress?: string;
    toAddress?: string;
    contractAddresses?: string[];
    category?: string[];
    maxCount?: string;
    pageKey?: string;
  }): Promise<{
    transfers: AlchemyAssetTransfer[];
    pageKey?: string;
  }> {
    try {
      console.log('🔍 [Alchemy] Fetching asset transfers...');
      
      const result = await this.rpcCall<{
        transfers: AlchemyAssetTransfer[];
        pageKey?: string;
      }>('alchemy_getAssetTransfers', [params]);
      
      console.log(`✅ [Alchemy] Found ${result.transfers.length} asset transfers`);
      
      return result;
    } catch (error) {
      console.error('[Alchemy] Asset transfers fetch error:', error);
      throw new Error(`Failed to fetch asset transfers: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get token balances for an address (Enhanced API)
   */
  async getTokenBalances(address: string, contractAddresses?: string[]): Promise<{
    address: string;
    tokenBalances: Array<{
      contractAddress: string;
      tokenBalance: string | null;
      error: string | null;
    }>;
  }> {
    try {
      console.log(`🔍 [Alchemy] Fetching token balances for: ${address}`);
      
      const params = contractAddresses 
        ? [address, contractAddresses]
        : [address, 'DEFAULT_TOKENS'];
      
      const result = await this.rpcCall<{
        address: string;
        tokenBalances: Array<{
          contractAddress: string;
          tokenBalance: string | null;
          error: string | null;
        }>;
      }>('alchemy_getTokenBalances', params);
      
      console.log(`✅ [Alchemy] Found ${result.tokenBalances.length} token balances`);
      
      return result;
    } catch (error) {
      console.error('[Alchemy] Token balances fetch error:', error);
      throw new Error(`Failed to fetch token balances: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get token metadata (Enhanced API)
   */
  async getTokenMetadata(contractAddress: string): Promise<{
    name: string | null;
    symbol: string | null;
    decimals: number | null;
    logo: string | null;
  }> {
    try {
      console.log(`🔍 [Alchemy] Fetching token metadata for: ${contractAddress}`);
      
      const result = await this.rpcCall<{
        name: string | null;
        symbol: string | null;
        decimals: number | null;
        logo: string | null;
      }>('alchemy_getTokenMetadata', [contractAddress]);
      
      console.log(`✅ [Alchemy] Token metadata retrieved: ${result.name} (${result.symbol})`);
      
      return result;
    } catch (error) {
      console.error('[Alchemy] Token metadata fetch error:', error);
      throw new Error(`Failed to fetch token metadata: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get NFTs for owner (Enhanced API)
   */
  async getNFTsForOwner(owner: string, options?: {
    contractAddresses?: string[];
    pageKey?: string;
    pageSize?: number;
  }): Promise<{
    ownedNfts: AlchemyNFT[];
    totalCount: number;
    pageKey?: string;
  }> {
    try {
      console.log(`🔍 [Alchemy] Fetching NFTs for owner: ${owner}`);
      
      const params: Record<string, unknown> = { owner };
      if (options?.contractAddresses) params.contractAddresses = options.contractAddresses;
      if (options?.pageKey) params.pageKey = options.pageKey;
      if (options?.pageSize) params.pageSize = options.pageSize;
      
      const result = await this.rpcCall<{
        ownedNfts: AlchemyNFT[];
        totalCount: number;
        pageKey?: string;
      }>('alchemy_getNFTs', [params]);
      
      console.log(`✅ [Alchemy] Found ${result.ownedNfts.length} NFTs`);
      
      return result;
    } catch (error) {
      console.error('[Alchemy] NFTs fetch error:', error);
      throw new Error(`Failed to fetch NFTs: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Send raw transaction
   */
  async sendRawTransaction(signedTx: string): Promise<string> {
    try {
      console.log('📡 [Alchemy] Broadcasting transaction...');
      
      const txHash = await this.rpcCall<string>('eth_sendRawTransaction', [signedTx]);
      
      console.log(`✅ [Alchemy] Transaction broadcast successful: ${txHash}`);
      
      return txHash;
    } catch (error) {
      console.error('[Alchemy] Broadcast error:', error);
      throw new Error(`Failed to broadcast transaction: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get transaction receipts (Batch) - Enhanced API
   */
  async getTransactionReceipts(params: {
    blockNumber?: string;
    blockHash?: string;
  }): Promise<{
    receipts: unknown[];
  }> {
    try {
      console.log('🔍 [Alchemy] Fetching transaction receipts...');
      
      const result = await this.rpcCall<{
        receipts: unknown[];
      }>('alchemy_getTransactionReceipts', [params]);
      
      console.log(`✅ [Alchemy] Found ${result.receipts.length} receipts`);
      
      return result;
    } catch (error) {
      console.error('[Alchemy] Transaction receipts fetch error:', error);
      throw new Error(`Failed to fetch transaction receipts: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get latest block number
   */
  async getBlockNumber(): Promise<number> {
    try {
      console.log('🔍 [Alchemy] Fetching latest block number...');
      
      const blockNumberHex = await this.rpcCall<string>('eth_blockNumber');
      const blockNumber = parseInt(blockNumberHex, 16);
      
      console.log(`✅ [Alchemy] Latest block number: ${blockNumber}`);
      
      return blockNumber;
    } catch (error) {
      console.error('[Alchemy] Block number fetch error:', error);
      throw new Error(`Failed to fetch block number: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get gas price
   */
  async getGasPrice(): Promise<bigint> {
    try {
      console.log('🔍 [Alchemy] Fetching gas price...');
      
      const gasPriceHex = await this.rpcCall<string>('eth_gasPrice');
      const gasPrice = BigInt(gasPriceHex);
      
      console.log(`✅ [Alchemy] Gas price: ${gasPrice} wei (${Number(gasPrice) / 1e9} Gwei)`);
      
      return gasPrice;
    } catch (error) {
      console.error('[Alchemy] Gas price fetch error:', error);
      throw new Error(`Failed to fetch gas price: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Estimate gas for a transaction
   */
  async estimateGas(transaction: {
    from?: string;
    to: string;
    gas?: string;
    gasPrice?: string;
    value?: string;
    data?: string;
  }): Promise<bigint> {
    try {
      console.log('🔍 [Alchemy] Estimating gas...');
      
      const gasHex = await this.rpcCall<string>('eth_estimateGas', [transaction]);
      const gas = BigInt(gasHex);
      
      console.log(`✅ [Alchemy] Estimated gas: ${gas}`);
      
      return gas;
    } catch (error) {
      console.error('[Alchemy] Gas estimation error:', error);
      throw new Error(`Failed to estimate gas: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Call contract (read-only)
   */
  async call(transaction: {
    from?: string;
    to: string;
    gas?: string;
    gasPrice?: string;
    value?: string;
    data?: string;
  }, block: string | number = 'latest'): Promise<string> {
    try {
      console.log('🔍 [Alchemy] Calling contract...');
      
      const blockParam = typeof block === 'number' ? `0x${block.toString(16)}` : block;
      const result = await this.rpcCall<string>('eth_call', [transaction, blockParam]);
      
      console.log(`✅ [Alchemy] Contract call successful`);
      
      return result;
    } catch (error) {
      console.error('[Alchemy] Contract call error:', error);
      throw new Error(`Failed to call contract: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

// Singleton factory functions (require API key configuration)
export const createAlchemyMainnet = (apiKey: string) => new AlchemyAPI({ apiKey }, 'mainnet');
export const createAlchemyGoerli = (apiKey: string) => new AlchemyAPI({ apiKey }, 'goerli');
export const createAlchemySepolia = (apiKey: string) => new AlchemyAPI({ apiKey }, 'sepolia');
export const createAlchemyPolygon = (apiKey: string) => new AlchemyAPI({ apiKey }, 'polygon');
export const createAlchemyArbitrum = (apiKey: string) => new AlchemyAPI({ apiKey }, 'arbitrum');
export const createAlchemyOptimism = (apiKey: string) => new AlchemyAPI({ apiKey }, 'optimism');

