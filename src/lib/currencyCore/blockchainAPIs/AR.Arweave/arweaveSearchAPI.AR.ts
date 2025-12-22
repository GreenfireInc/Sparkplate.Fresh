// Arweave Search API Implementation
// Uses ArDB and ArQL for advanced transaction searching
// Free tier: Public access with rate limits

export interface ArweaveSearchQuery {
  op: 'and' | 'or' | 'equals';
  expr1: string | ArweaveSearchQuery;
  expr2?: string | ArweaveSearchQuery;
}

export interface ArweaveSearchResult {
  txId: string;
  owner: string;
  target: string;
  quantity: string;
  reward: string;
  tags: Array<{
    name: string;
    value: string;
  }>;
  data_size: string;
  block?: {
    height: number;
    timestamp: number;
  };
}

export interface ArweaveSearchConfig {
  gateway?: string;
  network?: 'mainnet' | 'testnet';
  timeout?: number;
}

export class ArweaveSearchAPI {
  private gateway: string;
  private network: 'mainnet' | 'testnet';
  private timeout: number;

  constructor(config: ArweaveSearchConfig = {}) {
    this.network = config.network || 'mainnet';
    this.timeout = config.timeout || 30000;
    this.gateway = config.gateway || 'https://arweave.net';
  }

  /**
   * Execute ArQL query
   */
  async executeArQL(query: ArweaveSearchQuery, limit: number = 10): Promise<string[]> {
    try {
      console.log(`🔍 [Arweave Search] Executing ArQL query...`);
      
      const response = await fetch(`${this.gateway}/arql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(query),
        signal: AbortSignal.timeout(this.timeout)
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const txIds = await response.json() as string[];
      const limitedResults = txIds.slice(0, limit);
      
      console.log(`✅ [Arweave Search] Found ${limitedResults.length} transactions`);
      
      return limitedResults;
    } catch (error) {
      console.error('[Arweave Search] ArQL query error:', error);
      throw new Error(`Failed to execute ArQL query: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Search transactions by tags
   */
  async searchByTags(tags: Array<{ name: string; value: string }>, limit: number = 10): Promise<string[]> {
    try {
      console.log(`🔍 [Arweave Search] Searching by tags:`, tags);
      
      // Build ArQL query for multiple tags
      let query: ArweaveSearchQuery;
      
      if (tags.length === 1) {
        query = {
          op: 'equals',
          expr1: tags[0].name,
          expr2: tags[0].value
        };
      } else {
        // Create nested AND query for multiple tags
        query = {
          op: 'and',
          expr1: {
            op: 'equals',
            expr1: tags[0].name,
            expr2: tags[0].value
          },
          expr2: tags.slice(1).reduce((acc, tag) => ({
            op: 'and',
            expr1: acc,
            expr2: {
              op: 'equals',
              expr1: tag.name,
              expr2: tag.value
            }
          }), {
            op: 'equals',
            expr1: tags[1].name,
            expr2: tags[1].value
          } as ArweaveSearchQuery)
        };
      }
      
      return await this.executeArQL(query, limit);
    } catch (error) {
      console.error('[Arweave Search] Tag search error:', error);
      throw new Error(`Failed to search by tags: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Search transactions by owner
   */
  async searchByOwner(ownerAddress: string, limit: number = 10): Promise<string[]> {
    try {
      console.log(`🔍 [Arweave Search] Searching transactions by owner: ${ownerAddress}`);
      
      const query: ArweaveSearchQuery = {
        op: 'equals',
        expr1: 'from',
        expr2: ownerAddress
      };
      
      return await this.executeArQL(query, limit);
    } catch (error) {
      console.error('[Arweave Search] Owner search error:', error);
      throw new Error(`Failed to search by owner: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Search transactions by target (recipient)
   */
  async searchByTarget(targetAddress: string, limit: number = 10): Promise<string[]> {
    try {
      console.log(`🔍 [Arweave Search] Searching transactions by target: ${targetAddress}`);
      
      const query: ArweaveSearchQuery = {
        op: 'equals',
        expr1: 'to',
        expr2: targetAddress
      };
      
      return await this.executeArQL(query, limit);
    } catch (error) {
      console.error('[Arweave Search] Target search error:', error);
      throw new Error(`Failed to search by target: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Search transactions by app name tag
   */
  async searchByAppName(appName: string, limit: number = 10): Promise<string[]> {
    try {
      console.log(`🔍 [Arweave Search] Searching transactions by app: ${appName}`);
      
      return await this.searchByTags([{ name: 'App-Name', value: appName }], limit);
    } catch (error) {
      console.error('[Arweave Search] App name search error:', error);
      throw new Error(`Failed to search by app name: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Search transactions by content type
   */
  async searchByContentType(contentType: string, limit: number = 10): Promise<string[]> {
    try {
      console.log(`🔍 [Arweave Search] Searching transactions by content type: ${contentType}`);
      
      return await this.searchByTags([{ name: 'Content-Type', value: contentType }], limit);
    } catch (error) {
      console.error('[Arweave Search] Content type search error:', error);
      throw new Error(`Failed to search by content type: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get detailed transaction information for multiple transaction IDs
   */
  async getTransactionDetails(txIds: string[]): Promise<ArweaveSearchResult[]> {
    try {
      console.log(`🔍 [Arweave Search] Fetching details for ${txIds.length} transactions...`);
      
      const results: ArweaveSearchResult[] = [];
      
      // Fetch transaction details in parallel (with concurrency limit)
      const batchSize = 5;
      for (let i = 0; i < txIds.length; i += batchSize) {
        const batch = txIds.slice(i, i + batchSize);
        const batchPromises = batch.map(async (txId) => {
          try {
            const response = await fetch(`${this.gateway}/tx/${txId}`);
            if (!response.ok) return null;
            
            const tx = await response.json();
            return {
              txId: tx.id,
              owner: tx.owner,
              target: tx.target,
              quantity: tx.quantity,
              reward: tx.reward,
              tags: tx.tags || [],
              data_size: tx.data_size
            } as ArweaveSearchResult;
          } catch {
            return null;
          }
        });
        
        const batchResults = await Promise.all(batchPromises);
        results.push(...batchResults.filter(result => result !== null));
        
        // Small delay between batches to avoid rate limits
        if (i + batchSize < txIds.length) {
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      }
      
      console.log(`✅ [Arweave Search] Retrieved details for ${results.length} transactions`);
      
      return results;
    } catch (error) {
      console.error('[Arweave Search] Transaction details fetch error:', error);
      throw new Error(`Failed to fetch transaction details: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get recent transactions from the network
   */
  async getRecentTransactions(limit: number = 10): Promise<string[]> {
    try {
      console.log(`🔍 [Arweave Search] Fetching recent transactions...`);
      
      // Get current network info to find recent blocks
      const info = await this.request<{ height: number }>('/info');
      const currentHeight = info.height;
      
      // Get recent blocks and extract transaction IDs
      const txIds: string[] = [];
      const blocksToCheck = Math.min(10, limit); // Check last 10 blocks
      
      for (let i = 0; i < blocksToCheck && txIds.length < limit; i++) {
        try {
          const blockHeight = currentHeight - i;
          const response = await fetch(`${this.gateway}/block/height/${blockHeight}`);
          
          if (response.ok) {
            const block = await response.json();
            if (block.txs && Array.isArray(block.txs)) {
              txIds.push(...block.txs.slice(0, limit - txIds.length));
            }
          }
        } catch {
          // Skip failed block requests
          continue;
        }
      }
      
      console.log(`✅ [Arweave Search] Found ${txIds.length} recent transactions`);
      
      return txIds.slice(0, limit);
    } catch (error) {
      console.error('[Arweave Search] Recent transactions fetch error:', error);
      throw new Error(`Failed to fetch recent transactions: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

// Singleton instances for convenience
export const arweaveSearchMainnet = new ArweaveSearchAPI({ network: 'mainnet' });
export const arweaveSearchTestnet = new ArweaveSearchAPI({ network: 'testnet' });

// Helper to create instance with custom gateway
export const createArweaveSearchAPI = (gateway: string, network: 'mainnet' | 'testnet' = 'mainnet') => {
  return new ArweaveSearchAPI({ gateway, network });
};
