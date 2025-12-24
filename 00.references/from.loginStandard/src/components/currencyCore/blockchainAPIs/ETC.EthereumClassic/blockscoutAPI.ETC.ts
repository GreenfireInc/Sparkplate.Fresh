// Blockscout API Implementation for Ethereum Classic
// API Docs: https://etc.blockscout.com/api-docs
// Website: https://etc.blockscout.com/
// Free tier: Free and open-source
// Official ETC Explorer - Etherscan-compatible API

export interface BlockscoutTransaction {
  blockHash: string;
  blockNumber: string;
  confirmations: string;
  contractAddress: string | null;
  cumulativeGasUsed: string;
  from: string;
  gas: string;
  gasPrice: string;
  gasUsed: string;
  hash: string;
  input: string;
  isError: string;
  nonce: string;
  timeStamp: string;
  to: string;
  transactionIndex: string;
  value: string;
}

export interface BlockscoutTokenTransfer {
  blockHash: string;
  blockNumber: string;
  confirmations: string;
  contractAddress: string;
  from: string;
  gas: string;
  gasPrice: string;
  gasUsed: string;
  hash: string;
  input: string;
  nonce: string;
  timeStamp: string;
  to: string;
  tokenDecimal: string;
  tokenName: string;
  tokenSymbol: string;
  transactionIndex: string;
  value: string;
}

export interface BlockscoutBlock {
  number: string;
  hash: string;
  parentHash: string;
  nonce: string;
  sha3Uncles: string;
  miner: string;
  difficulty: string;
  totalDifficulty: string;
  size: string;
  gasLimit: string;
  gasUsed: string;
  timestamp: string;
  transactions: unknown[];
  uncles: string[];
}

export class BlockscoutAPI {
  private baseUrl = 'https://etc.blockscout.com';

  /**
   * Build URL with parameters
   */
  private buildUrl(params: Record<string, string>): string {
    const url = new URL(`${this.baseUrl}/api`);
    
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });
    
    return url.toString();
  }

  /**
   * Get ETC balance for an address
   */
  async getBalance(address: string): Promise<{
    balance: bigint;
    balanceETC: number;
  }> {
    try {
      console.log(`🔍 [Blockscout-ETC] Fetching balance for: ${address}`);
      
      const url = this.buildUrl({
        module: 'account',
        action: 'balance',
        address
      });
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Blockscout API error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      if (data.status !== '1') {
        throw new Error(`Blockscout API error: ${data.message}`);
      }
      
      const balance = BigInt(data.result);
      const balanceETC = Number(balance) / 1e18;
      
      console.log(`✅ [Blockscout-ETC] Balance: ${balance} wei (${balanceETC} ETC)`);
      
      return {
        balance,
        balanceETC
      };
    } catch (error) {
      console.error('[Blockscout-ETC] Balance fetch error:', error);
      throw new Error(`Failed to fetch balance: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get multiple balances at once
   */
  async getMultiBalance(addresses: string[]): Promise<{
    balances: Map<string, { balance: bigint; balanceETC: number }>;
  }> {
    try {
      console.log(`🔍 [Blockscout-ETC] Fetching balances for ${addresses.length} addresses`);
      
      const url = this.buildUrl({
        module: 'account',
        action: 'balancemulti',
        address: addresses.join(',')
      });
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Blockscout API error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      if (data.status !== '1') {
        throw new Error(`Blockscout API error: ${data.message}`);
      }
      
      const balances = new Map<string, { balance: bigint; balanceETC: number }>();
      
      for (const item of data.result) {
        const balance = BigInt(item.balance);
        balances.set(item.account, {
          balance,
          balanceETC: Number(balance) / 1e18
        });
      }
      
      console.log(`✅ [Blockscout-ETC] Retrieved ${balances.size} balances`);
      
      return { balances };
    } catch (error) {
      console.error('[Blockscout-ETC] Multi-balance fetch error:', error);
      throw new Error(`Failed to fetch balances: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get transaction history for an address
   */
  async getTransactionHistory(
    address: string,
    startBlock: number = 0,
    endBlock: number = 99999999,
    page: number = 1,
    offset: number = 100,
    sort: 'asc' | 'desc' = 'desc'
  ): Promise<{
    transactions: BlockscoutTransaction[];
    total: number;
  }> {
    try {
      console.log(`🔍 [Blockscout-ETC] Fetching transaction history for: ${address}`);
      
      const url = this.buildUrl({
        module: 'account',
        action: 'txlist',
        address,
        startblock: startBlock.toString(),
        endblock: endBlock.toString(),
        page: page.toString(),
        offset: offset.toString(),
        sort
      });
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Blockscout API error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      if (data.status !== '1' && data.message !== 'No transactions found') {
        throw new Error(`Blockscout API error: ${data.message}`);
      }
      
      const transactions: BlockscoutTransaction[] = data.result || [];
      
      console.log(`✅ [Blockscout-ETC] Found ${transactions.length} transactions`);
      
      return {
        transactions,
        total: transactions.length
      };
    } catch (error) {
      console.error('[Blockscout-ETC] Transaction history fetch error:', error);
      throw new Error(`Failed to fetch transaction history: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get ERC20 token transfer events
   */
  async getTokenTransfers(
    address: string,
    contractAddress?: string,
    startBlock: number = 0,
    endBlock: number = 99999999,
    page: number = 1,
    offset: number = 100,
    sort: 'asc' | 'desc' = 'desc'
  ): Promise<BlockscoutTokenTransfer[]> {
    try {
      console.log(`🔍 [Blockscout-ETC] Fetching token transfers for: ${address}`);
      
      const params: Record<string, string> = {
        module: 'account',
        action: 'tokentx',
        address,
        startblock: startBlock.toString(),
        endblock: endBlock.toString(),
        page: page.toString(),
        offset: offset.toString(),
        sort
      };
      
      if (contractAddress) {
        params.contractaddress = contractAddress;
      }
      
      const url = this.buildUrl(params);
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Blockscout API error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      if (data.status !== '1' && data.message !== 'No transactions found') {
        throw new Error(`Blockscout API error: ${data.message}`);
      }
      
      const transfers: BlockscoutTokenTransfer[] = data.result || [];
      
      console.log(`✅ [Blockscout-ETC] Found ${transfers.length} token transfers`);
      
      return transfers;
    } catch (error) {
      console.error('[Blockscout-ETC] Token transfers fetch error:', error);
      throw new Error(`Failed to fetch token transfers: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get internal transactions
   */
  async getInternalTransactions(
    address: string,
    startBlock: number = 0,
    endBlock: number = 99999999,
    page: number = 1,
    offset: number = 100,
    sort: 'asc' | 'desc' = 'desc'
  ): Promise<unknown[]> {
    try {
      console.log(`🔍 [Blockscout-ETC] Fetching internal transactions for: ${address}`);
      
      const url = this.buildUrl({
        module: 'account',
        action: 'txlistinternal',
        address,
        startblock: startBlock.toString(),
        endblock: endBlock.toString(),
        page: page.toString(),
        offset: offset.toString(),
        sort
      });
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Blockscout API error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      if (data.status !== '1' && data.message !== 'No transactions found') {
        throw new Error(`Blockscout API error: ${data.message}`);
      }
      
      const transactions: unknown[] = data.result || [];
      
      console.log(`✅ [Blockscout-ETC] Found ${transactions.length} internal transactions`);
      
      return transactions;
    } catch (error) {
      console.error('[Blockscout-ETC] Internal transactions fetch error:', error);
      throw new Error(`Failed to fetch internal transactions: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get contract ABI
   */
  async getContractABI(contractAddress: string): Promise<string> {
    try {
      console.log(`🔍 [Blockscout-ETC] Fetching contract ABI for: ${contractAddress}`);
      
      const url = this.buildUrl({
        module: 'contract',
        action: 'getabi',
        address: contractAddress
      });
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Blockscout API error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      if (data.status !== '1') {
        throw new Error(`Blockscout API error: ${data.message}`);
      }
      
      console.log(`✅ [Blockscout-ETC] Contract ABI retrieved`);
      
      return data.result;
    } catch (error) {
      console.error('[Blockscout-ETC] Contract ABI fetch error:', error);
      throw new Error(`Failed to fetch contract ABI: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get block information
   */
  async getBlockByNumber(blockNumber: number): Promise<BlockscoutBlock> {
    try {
      console.log(`🔍 [Blockscout-ETC] Fetching block: #${blockNumber}`);
      
      const url = this.buildUrl({
        module: 'block',
        action: 'getblockreward',
        blockno: blockNumber.toString()
      });
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Blockscout API error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      if (data.status !== '1') {
        throw new Error(`Blockscout API error: ${data.message}`);
      }
      
      console.log(`✅ [Blockscout-ETC] Block retrieved`);
      
      return data.result;
    } catch (error) {
      console.error('[Blockscout-ETC] Block fetch error:', error);
      throw new Error(`Failed to fetch block: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

// Singleton instance
export const blockscoutETC = new BlockscoutAPI();

