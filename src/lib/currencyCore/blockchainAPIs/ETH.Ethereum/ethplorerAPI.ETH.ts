// Ethplorer API Implementation for Ethereum
// API Docs: https://github.com/EverexIO/Ethplorer/wiki/Ethplorer-API
// Free tier: Limited usage with API key
// Specialized in ERC20 token tracking and analytics

export interface EthplorerConfig {
  apiKey?: string; // Optional, 'freekey' for public access
}

export interface EthplorerAddressInfo {
  address: string;
  ETH: {
    balance: number;
    price?: {
      rate: number;
      diff: number;
      diff7d: number;
      ts: number;
      currency: string;
    };
  };
  countTxs: number;
  tokens?: Array<{
    tokenInfo: {
      address: string;
      name: string;
      decimals: string;
      symbol: string;
      totalSupply: string;
      owner: string;
      lastUpdated: number;
      price?: {
        rate: number;
        currency: string;
      };
    };
    balance: number;
    totalIn: number;
    totalOut: number;
  }>;
}

export interface EthplorerTokenInfo {
  address: string;
  name: string;
  decimals: string;
  symbol: string;
  totalSupply: string;
  owner: string;
  txsCount: number;
  transfersCount: number;
  lastUpdated: number;
  holdersCount: number;
  price?: {
    rate: number;
    currency: string;
    diff: number;
    diff7d: number;
    ts: number;
  };
}

export class EthplorerAPI {
  private baseUrl = 'https://api.ethplorer.io';
  private apiKey: string;

  constructor(config?: EthplorerConfig) {
    this.apiKey = config?.apiKey || 'freekey';
  }

  /**
   * Get address information including tokens
   */
  async getAddressInfo(address: string): Promise<EthplorerAddressInfo> {
    try {
      console.log(`🔍 [Ethplorer] Fetching address info for: ${address}`);
      
      const response = await fetch(`${this.baseUrl}/getAddressInfo/${address}?apiKey=${this.apiKey}`);
      
      if (!response.ok) {
        throw new Error(`Ethplorer API error: ${response.status} ${response.statusText}`);
      }
      
      const data: EthplorerAddressInfo = await response.json();
      
      console.log(`✅ [Ethplorer] Address info retrieved with ${data.tokens?.length || 0} tokens`);
      
      return data;
    } catch (error) {
      console.error('[Ethplorer] Address info fetch error:', error);
      throw new Error(`Failed to fetch address info: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get ETH balance
   */
  async getBalance(address: string): Promise<{
    balance: bigint;
    balanceETH: number;
  }> {
    try {
      console.log(`🔍 [Ethplorer] Fetching balance for: ${address}`);
      
      const info = await this.getAddressInfo(address);
      const balanceETH = info.ETH.balance;
      const balance = BigInt(Math.round(balanceETH * 1e18));
      
      console.log(`✅ [Ethplorer] Balance: ${balance} wei (${balanceETH} ETH)`);
      
      return {
        balance,
        balanceETH
      };
    } catch (error) {
      console.error('[Ethplorer] Balance fetch error:', error);
      throw new Error(`Failed to fetch balance: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get token information
   */
  async getTokenInfo(tokenAddress: string): Promise<EthplorerTokenInfo> {
    try {
      console.log(`🔍 [Ethplorer] Fetching token info for: ${tokenAddress}`);
      
      const response = await fetch(`${this.baseUrl}/getTokenInfo/${tokenAddress}?apiKey=${this.apiKey}`);
      
      if (!response.ok) {
        throw new Error(`Ethplorer API error: ${response.status} ${response.statusText}`);
      }
      
      const data: EthplorerTokenInfo = await response.json();
      
      console.log(`✅ [Ethplorer] Token info retrieved: ${data.name} (${data.symbol})`);
      
      return data;
    } catch (error) {
      console.error('[Ethplorer] Token info fetch error:', error);
      throw new Error(`Failed to fetch token info: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get token history for address
   */
  async getAddressHistory(address: string, type: 'transfer' | 'all' = 'all', limit: number = 10): Promise<{
    operations: unknown[];
  }> {
    try {
      console.log(`🔍 [Ethplorer] Fetching address history for: ${address}`);
      
      const response = await fetch(
        `${this.baseUrl}/getAddressHistory/${address}?apiKey=${this.apiKey}&type=${type}&limit=${limit}`
      );
      
      if (!response.ok) {
        throw new Error(`Ethplorer API error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      console.log(`✅ [Ethplorer] Found ${data.operations?.length || 0} operations`);
      
      return data;
    } catch (error) {
      console.error('[Ethplorer] Address history fetch error:', error);
      throw new Error(`Failed to fetch address history: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get top tokens
   */
  async getTopTokens(limit: number = 50): Promise<{
    tokens: Array<{
      address: string;
      name: string;
      symbol: string;
      decimals: number;
      price?: {
        rate: number;
        currency: string;
      };
    }>;
  }> {
    try {
      console.log('🔍 [Ethplorer] Fetching top tokens...');
      
      const response = await fetch(`${this.baseUrl}/getTopTokens?apiKey=${this.apiKey}&limit=${limit}`);
      
      if (!response.ok) {
        throw new Error(`Ethplorer API error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      console.log(`✅ [Ethplorer] Retrieved ${data.tokens?.length || 0} top tokens`);
      
      return data;
    } catch (error) {
      console.error('[Ethplorer] Top tokens fetch error:', error);
      throw new Error(`Failed to fetch top tokens: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

// Singleton instance
export const ethplorer = new EthplorerAPI();
export const createEthplorer = (apiKey: string) => new EthplorerAPI({ apiKey });

