// Etherscan API Implementation for Ethereum
// API Docs: https://docs.etherscan.io/
// Free tier: 5 calls per second (requires API key)
// Most popular and comprehensive Ethereum block explorer
// Note: Transitioning to V2 API by May 31, 2025

export interface EtherscanConfig {
  apiKey: string; // Required for Etherscan
  useV2?: boolean; // Use V2 API (default: false)
}

export interface EtherscanAddressBalance {
  status: string;
  message: string;
  result: string; // Balance in wei
}

export interface EtherscanTransaction {
  blockNumber: string;
  timeStamp: string;
  hash: string;
  nonce: string;
  blockHash: string;
  transactionIndex: string;
  from: string;
  to: string;
  value: string; // in wei
  gas: string;
  gasPrice: string;
  isError: string;
  txreceipt_status: string;
  input: string;
  contractAddress: string;
  cumulativeGasUsed: string;
  gasUsed: string;
  confirmations: string;
  methodId: string;
  functionName: string;
}

export interface EtherscanTokenTransfer {
  blockNumber: string;
  timeStamp: string;
  hash: string;
  nonce: string;
  blockHash: string;
  from: string;
  contractAddress: string;
  to: string;
  value: string;
  tokenName: string;
  tokenSymbol: string;
  tokenDecimal: string;
  transactionIndex: string;
  gas: string;
  gasPrice: string;
  gasUsed: string;
  cumulativeGasUsed: string;
  input: string;
  confirmations: string;
}

export interface EtherscanGasOracle {
  status: string;
  message: string;
  result: {
    LastBlock: string;
    SafeGasPrice: string;
    ProposeGasPrice: string;
    FastGasPrice: string;
    suggestBaseFee: string;
    gasUsedRatio: string;
  };
}

export class EtherscanAPI {
  private baseUrl: string;
  private apiKey: string;
  private network: 'mainnet' | 'goerli' | 'sepolia';

  constructor(config: EtherscanConfig, network: 'mainnet' | 'goerli' | 'sepolia' = 'mainnet') {
    this.apiKey = config.apiKey;
    this.network = network;
    
    // Determine base URL based on API version and network
    if (config.useV2) {
      this.baseUrl = network === 'mainnet' 
        ? 'https://api.etherscan.io/v2/api'
        : `https://api-${network}.etherscan.io/v2/api`;
    } else {
      this.baseUrl = network === 'mainnet'
        ? 'https://api.etherscan.io/api'
        : `https://api-${network}.etherscan.io/api`;
    }
  }

  /**
   * Build URL with API key and parameters
   */
  private buildUrl(params: Record<string, string>): string {
    const url = new URL(this.baseUrl);
    url.searchParams.set('apikey', this.apiKey);
    
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });
    
    return url.toString();
  }

  /**
   * Get ETH balance for an address
   */
  async getBalance(address: string): Promise<{
    balance: bigint; // in wei
    balanceETH: number; // in ETH
  }> {
    try {
      console.log(`🔍 [Etherscan] Fetching balance for: ${address}`);
      
      const url = this.buildUrl({
        module: 'account',
        action: 'balance',
        address,
        tag: 'latest'
      });
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Etherscan API error: ${response.status} ${response.statusText}`);
      }
      
      const data: EtherscanAddressBalance = await response.json();
      
      if (data.status !== '1') {
        throw new Error(`Etherscan API error: ${data.message}`);
      }
      
      const balance = BigInt(data.result);
      const balanceETH = Number(balance) / 1e18;
      
      console.log(`✅ [Etherscan] Balance: ${balance} wei (${balanceETH} ETH)`);
      
      return {
        balance,
        balanceETH
      };
    } catch (error) {
      console.error('[Etherscan] Balance fetch error:', error);
      throw new Error(`Failed to fetch balance: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get multiple addresses balances in a single call
   */
  async getBalances(addresses: string[]): Promise<Record<string, {
    balance: bigint;
    balanceETH: number;
  }>> {
    try {
      console.log(`🔍 [Etherscan] Fetching balances for ${addresses.length} addresses...`);
      
      const url = this.buildUrl({
        module: 'account',
        action: 'balancemulti',
        address: addresses.join(','),
        tag: 'latest'
      });
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Etherscan API error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      if (data.status !== '1') {
        throw new Error(`Etherscan API error: ${data.message}`);
      }
      
      const balances: Record<string, { balance: bigint; balanceETH: number; }> = {};
      
      for (const item of data.result) {
        const balance = BigInt(item.balance);
        balances[item.account] = {
          balance,
          balanceETH: Number(balance) / 1e18
        };
      }
      
      console.log(`✅ [Etherscan] Balances retrieved for ${addresses.length} addresses`);
      
      return balances;
    } catch (error) {
      console.error('[Etherscan] Balances fetch error:', error);
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
    transactions: EtherscanTransaction[];
    total: number;
  }> {
    try {
      console.log(`🔍 [Etherscan] Fetching transaction history for: ${address}`);
      
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
        throw new Error(`Etherscan API error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      if (data.status !== '1' && data.message !== 'No transactions found') {
        throw new Error(`Etherscan API error: ${data.message}`);
      }
      
      const transactions: EtherscanTransaction[] = data.result || [];
      
      console.log(`✅ [Etherscan] Found ${transactions.length} transactions`);
      
      return {
        transactions,
        total: transactions.length
      };
    } catch (error) {
      console.error('[Etherscan] Transaction history fetch error:', error);
      throw new Error(`Failed to fetch transaction history: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get internal transactions for an address
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
      console.log(`🔍 [Etherscan] Fetching internal transactions for: ${address}`);
      
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
        throw new Error(`Etherscan API error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      if (data.status !== '1' && data.message !== 'No transactions found') {
        throw new Error(`Etherscan API error: ${data.message}`);
      }
      
      const transactions = data.result || [];
      
      console.log(`✅ [Etherscan] Found ${transactions.length} internal transactions`);
      
      return transactions;
    } catch (error) {
      console.error('[Etherscan] Internal transactions fetch error:', error);
      throw new Error(`Failed to fetch internal transactions: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get ERC20 token transfer events for an address
   */
  async getTokenTransfers(
    address: string,
    contractAddress?: string,
    startBlock: number = 0,
    endBlock: number = 99999999,
    page: number = 1,
    offset: number = 100,
    sort: 'asc' | 'desc' = 'desc'
  ): Promise<EtherscanTokenTransfer[]> {
    try {
      console.log(`🔍 [Etherscan] Fetching token transfers for: ${address}`);
      
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
        throw new Error(`Etherscan API error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      if (data.status !== '1' && data.message !== 'No transactions found') {
        throw new Error(`Etherscan API error: ${data.message}`);
      }
      
      const transfers: EtherscanTokenTransfer[] = data.result || [];
      
      console.log(`✅ [Etherscan] Found ${transfers.length} token transfers`);
      
      return transfers;
    } catch (error) {
      console.error('[Etherscan] Token transfers fetch error:', error);
      throw new Error(`Failed to fetch token transfers: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get transaction receipt status
   */
  async getTransactionReceipt(txHash: string): Promise<{
    status: string;
  }> {
    try {
      console.log(`🔍 [Etherscan] Fetching transaction receipt for: ${txHash}`);
      
      const url = this.buildUrl({
        module: 'transaction',
        action: 'gettxreceiptstatus',
        txhash: txHash
      });
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Etherscan API error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      if (data.status !== '1') {
        throw new Error(`Etherscan API error: ${data.message}`);
      }
      
      console.log(`✅ [Etherscan] Transaction receipt retrieved`);
      
      return data.result;
    } catch (error) {
      console.error('[Etherscan] Transaction receipt fetch error:', error);
      throw new Error(`Failed to fetch transaction receipt: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get gas oracle (recommended gas prices)
   */
  async getGasOracle(): Promise<EtherscanGasOracle['result']> {
    try {
      console.log('🔍 [Etherscan] Fetching gas oracle...');
      
      const url = this.buildUrl({
        module: 'gastracker',
        action: 'gasoracle'
      });
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Etherscan API error: ${response.status} ${response.statusText}`);
      }
      
      const data: EtherscanGasOracle = await response.json();
      
      if (data.status !== '1') {
        throw new Error(`Etherscan API error: ${data.message}`);
      }
      
      console.log(`✅ [Etherscan] Gas oracle: Safe ${data.result.SafeGasPrice}, Propose ${data.result.ProposeGasPrice}, Fast ${data.result.FastGasPrice} Gwei`);
      
      return data.result;
    } catch (error) {
      console.error('[Etherscan] Gas oracle fetch error:', error);
      throw new Error(`Failed to fetch gas oracle: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get contract ABI
   */
  async getContractABI(contractAddress: string): Promise<string> {
    try {
      console.log(`🔍 [Etherscan] Fetching contract ABI for: ${contractAddress}`);
      
      const url = this.buildUrl({
        module: 'contract',
        action: 'getabi',
        address: contractAddress
      });
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Etherscan API error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      if (data.status !== '1') {
        throw new Error(`Etherscan API error: ${data.message}`);
      }
      
      console.log(`✅ [Etherscan] Contract ABI retrieved`);
      
      return data.result;
    } catch (error) {
      console.error('[Etherscan] Contract ABI fetch error:', error);
      throw new Error(`Failed to fetch contract ABI: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get ERC20 token supply
   */
  async getTokenSupply(contractAddress: string): Promise<bigint> {
    try {
      console.log(`🔍 [Etherscan] Fetching token supply for: ${contractAddress}`);
      
      const url = this.buildUrl({
        module: 'stats',
        action: 'tokensupply',
        contractaddress: contractAddress
      });
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Etherscan API error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      if (data.status !== '1') {
        throw new Error(`Etherscan API error: ${data.message}`);
      }
      
      const supply = BigInt(data.result);
      
      console.log(`✅ [Etherscan] Token supply: ${supply}`);
      
      return supply;
    } catch (error) {
      console.error('[Etherscan] Token supply fetch error:', error);
      throw new Error(`Failed to fetch token supply: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get latest block number
   */
  async getLatestBlockNumber(): Promise<number> {
    try {
      console.log('🔍 [Etherscan] Fetching latest block number...');
      
      const url = this.buildUrl({
        module: 'proxy',
        action: 'eth_blockNumber'
      });
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Etherscan API error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      const blockNumber = parseInt(data.result, 16);
      
      console.log(`✅ [Etherscan] Latest block number: ${blockNumber}`);
      
      return blockNumber;
    } catch (error) {
      console.error('[Etherscan] Latest block number fetch error:', error);
      throw new Error(`Failed to fetch latest block number: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

// Singleton instances for convenience (require API key configuration)
export const createEtherscanMainnet = (apiKey: string) => new EtherscanAPI({ apiKey }, 'mainnet');
export const createEtherscanGoerli = (apiKey: string) => new EtherscanAPI({ apiKey }, 'goerli');
export const createEtherscanSepolia = (apiKey: string) => new EtherscanAPI({ apiKey }, 'sepolia');

