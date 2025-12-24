// Blockscout API Implementation for Ethereum
// API Docs: https://docs.blockscout.com/devs/apis
// Free tier: Open-source, Etherscan-compatible
// Self-hostable blockchain explorer

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
  cumulativeGasUsed: string;
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

export class BlockscoutAPI {
  private baseUrl: string;
  private network: 'mainnet' | 'goerli' | 'sepolia';

  constructor(network: 'mainnet' | 'goerli' | 'sepolia' = 'mainnet', customUrl?: string) {
    this.network = network;
    
    if (customUrl) {
      this.baseUrl = customUrl;
    } else {
      // Default Blockscout instances
      const networkMap: Record<string, string> = {
        mainnet: 'https://eth.blockscout.com',
        goerli: 'https://eth-goerli.blockscout.com',
        sepolia: 'https://eth-sepolia.blockscout.com'
      };
      this.baseUrl = networkMap[network];
    }
  }

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
   * Get ETH balance for an address
   */
  async getBalance(address: string): Promise<{
    balance: bigint;
    balanceETH: number;
  }> {
    try {
      console.log(`🔍 [Blockscout] Fetching balance for: ${address}`);
      
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
      const balanceETH = Number(balance) / 1e18;
      
      console.log(`✅ [Blockscout] Balance: ${balance} wei (${balanceETH} ETH)`);
      
      return {
        balance,
        balanceETH
      };
    } catch (error) {
      console.error('[Blockscout] Balance fetch error:', error);
      throw new Error(`Failed to fetch balance: ${error instanceof Error ? error.message : 'Unknown error'}`);
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
      console.log(`🔍 [Blockscout] Fetching transaction history for: ${address}`);
      
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
      
      console.log(`✅ [Blockscout] Found ${transactions.length} transactions`);
      
      return {
        transactions,
        total: transactions.length
      };
    } catch (error) {
      console.error('[Blockscout] Transaction history fetch error:', error);
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
      console.log(`🔍 [Blockscout] Fetching token transfers for: ${address}`);
      
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
      
      console.log(`✅ [Blockscout] Found ${transfers.length} token transfers`);
      
      return transfers;
    } catch (error) {
      console.error('[Blockscout] Token transfers fetch error:', error);
      throw new Error(`Failed to fetch token transfers: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get contract ABI
   */
  async getContractABI(contractAddress: string): Promise<string> {
    try {
      console.log(`🔍 [Blockscout] Fetching contract ABI for: ${contractAddress}`);
      
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
      
      console.log(`✅ [Blockscout] Contract ABI retrieved`);
      
      return data.result;
    } catch (error) {
      console.error('[Blockscout] Contract ABI fetch error:', error);
      throw new Error(`Failed to fetch contract ABI: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

// Singleton instances
export const blockscoutMainnet = new BlockscoutAPI('mainnet');
export const blockscoutGoerli = new BlockscoutAPI('goerli');
export const blockscoutSepolia = new BlockscoutAPI('sepolia');

