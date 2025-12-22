// BscScan API Implementation for BNB Smart Chain
// API Docs: https://docs.bscscan.com
// Free tier: ~5 calls/sec, ~100,000 calls/day
// Requires free API key (registration at bscscan.com)
// Official block explorer for BNB Smart Chain

export interface BscScanAccountBalance {
  status: string;
  message: string;
  result: string; // Balance in Wei (1 BNB = 10^18 Wei)
}

export interface BscScanTransaction {
  blockNumber: string;
  timeStamp: string;
  hash: string;
  nonce: string;
  blockHash: string;
  transactionIndex: string;
  from: string;
  to: string;
  value: string; // in Wei
  gas: string;
  gasPrice: string;
  isError: string;
  txreceipt_status: string;
  input: string;
  contractAddress: string;
  cumulativeGasUsed: string;
  gasUsed: string;
  confirmations: string;
}

export interface BscScanTokenTransfer {
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

export interface BscScanConfig {
  apiKey: string; // Required
  network?: 'mainnet' | 'testnet';
}

export class BscScanAPI {
  private baseUrl: string;
  private apiKey: string;
  private network: 'mainnet' | 'testnet';

  constructor(config: BscScanConfig) {
    if (!config.apiKey) {
      throw new Error('BscScan API key is required. Get one at https://bscscan.com/myapikey');
    }
    
    this.apiKey = config.apiKey;
    this.network = config.network || 'mainnet';
    
    // BscScan API endpoints
    this.baseUrl = this.network === 'mainnet'
      ? 'https://api.bscscan.com/api'
      : 'https://api-testnet.bscscan.com/api';
  }

  /**
   * Get BNB balance for an address
   */
  async getBalance(address: string): Promise<{
    balance: string; // in Wei
    balanceBNB: number; // in BNB
  }> {
    try {
      console.log(`🔍 [BscScan] Fetching balance for: ${address}`);
      
      const params = new URLSearchParams({
        module: 'account',
        action: 'balance',
        address: address,
        tag: 'latest',
        apikey: this.apiKey
      });
      
      const response = await fetch(`${this.baseUrl}?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error(`BscScan API error: ${response.status} ${response.statusText}`);
      }
      
      const data: BscScanAccountBalance = await response.json();
      
      if (data.status !== '1') {
        throw new Error(`BscScan API error: ${data.message}`);
      }
      
      const balance = data.result;
      const balanceBNB = parseFloat(balance) / 1e18;
      
      console.log(`✅ [BscScan] Balance: ${balance} Wei (${balanceBNB} BNB)`);
      
      return {
        balance,
        balanceBNB
      };
    } catch (error) {
      console.error('[BscScan] Balance fetch error:', error);
      throw new Error(`Failed to fetch balance: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get multiple BNB balances at once (up to 20 addresses)
   */
  async getBalanceMulti(addresses: string[]): Promise<Array<{
    account: string;
    balance: string;
    balanceBNB: number;
  }>> {
    try {
      if (addresses.length > 20) {
        throw new Error('Maximum 20 addresses allowed per request');
      }
      
      console.log(`🔍 [BscScan] Fetching balances for ${addresses.length} addresses`);
      
      const params = new URLSearchParams({
        module: 'account',
        action: 'balancemulti',
        address: addresses.join(','),
        tag: 'latest',
        apikey: this.apiKey
      });
      
      const response = await fetch(`${this.baseUrl}?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error(`BscScan API error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      if (data.status !== '1') {
        throw new Error(`BscScan API error: ${data.message}`);
      }
      
      const results = data.result.map((item: { account: string; balance: string }) => ({
        account: item.account,
        balance: item.balance,
        balanceBNB: parseFloat(item.balance) / 1e18
      }));
      
      console.log(`✅ [BscScan] Retrieved ${results.length} balances`);
      
      return results;
    } catch (error) {
      console.error('[BscScan] Multi-balance fetch error:', error);
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
    transactions: BscScanTransaction[];
    total: number;
  }> {
    try {
      console.log(`🔍 [BscScan] Fetching transaction history for: ${address}`);
      
      const params = new URLSearchParams({
        module: 'account',
        action: 'txlist',
        address: address,
        startblock: startBlock.toString(),
        endblock: endBlock.toString(),
        page: page.toString(),
        offset: offset.toString(),
        sort: sort,
        apikey: this.apiKey
      });
      
      const response = await fetch(`${this.baseUrl}?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error(`BscScan API error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      if (data.status !== '1' && data.message !== 'No transactions found') {
        throw new Error(`BscScan API error: ${data.message}`);
      }
      
      const transactions = data.result || [];
      
      console.log(`✅ [BscScan] Found ${transactions.length} transactions`);
      
      return {
        transactions,
        total: transactions.length
      };
    } catch (error) {
      console.error('[BscScan] Transaction history fetch error:', error);
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
  ): Promise<{
    transactions: unknown[];
    total: number;
  }> {
    try {
      console.log(`🔍 [BscScan] Fetching internal transactions for: ${address}`);
      
      const params = new URLSearchParams({
        module: 'account',
        action: 'txlistinternal',
        address: address,
        startblock: startBlock.toString(),
        endblock: endBlock.toString(),
        page: page.toString(),
        offset: offset.toString(),
        sort: sort,
        apikey: this.apiKey
      });
      
      const response = await fetch(`${this.baseUrl}?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error(`BscScan API error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      if (data.status !== '1' && data.message !== 'No transactions found') {
        throw new Error(`BscScan API error: ${data.message}`);
      }
      
      const transactions = data.result || [];
      
      console.log(`✅ [BscScan] Found ${transactions.length} internal transactions`);
      
      return {
        transactions,
        total: transactions.length
      };
    } catch (error) {
      console.error('[BscScan] Internal transactions fetch error:', error);
      throw new Error(`Failed to fetch internal transactions: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get BEP-20 token transfer events for an address
   */
  async getTokenTransfers(
    address: string,
    contractAddress?: string,
    startBlock: number = 0,
    endBlock: number = 99999999,
    page: number = 1,
    offset: number = 100,
    sort: 'asc' | 'desc' = 'desc'
  ): Promise<{
    transfers: BscScanTokenTransfer[];
    total: number;
  }> {
    try {
      console.log(`🔍 [BscScan] Fetching token transfers for: ${address}`);
      
      const params: Record<string, string> = {
        module: 'account',
        action: 'tokentx',
        address: address,
        startblock: startBlock.toString(),
        endblock: endBlock.toString(),
        page: page.toString(),
        offset: offset.toString(),
        sort: sort,
        apikey: this.apiKey
      };
      
      if (contractAddress) {
        params.contractaddress = contractAddress;
      }
      
      const queryParams = new URLSearchParams(params);
      const response = await fetch(`${this.baseUrl}?${queryParams.toString()}`);
      
      if (!response.ok) {
        throw new Error(`BscScan API error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      if (data.status !== '1' && data.message !== 'No transactions found') {
        throw new Error(`BscScan API error: ${data.message}`);
      }
      
      const transfers = data.result || [];
      
      console.log(`✅ [BscScan] Found ${transfers.length} token transfers`);
      
      return {
        transfers,
        total: transfers.length
      };
    } catch (error) {
      console.error('[BscScan] Token transfers fetch error:', error);
      throw new Error(`Failed to fetch token transfers: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get transaction by hash
   */
  async getTransactionByHash(txHash: string): Promise<{
    transaction: unknown;
  }> {
    try {
      console.log(`🔍 [BscScan] Fetching transaction: ${txHash}`);
      
      const params = new URLSearchParams({
        module: 'proxy',
        action: 'eth_getTransactionByHash',
        txhash: txHash,
        apikey: this.apiKey
      });
      
      const response = await fetch(`${this.baseUrl}?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error(`BscScan API error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      if (data.error) {
        throw new Error(`BscScan API error: ${data.error.message}`);
      }
      
      console.log(`✅ [BscScan] Transaction retrieved`);
      
      return {
        transaction: data.result
      };
    } catch (error) {
      console.error('[BscScan] Transaction fetch error:', error);
      throw new Error(`Failed to fetch transaction: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get transaction receipt
   */
  async getTransactionReceipt(txHash: string): Promise<{
    receipt: unknown;
  }> {
    try {
      console.log(`🔍 [BscScan] Fetching transaction receipt: ${txHash}`);
      
      const params = new URLSearchParams({
        module: 'proxy',
        action: 'eth_getTransactionReceipt',
        txhash: txHash,
        apikey: this.apiKey
      });
      
      const response = await fetch(`${this.baseUrl}?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error(`BscScan API error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      if (data.error) {
        throw new Error(`BscScan API error: ${data.error.message}`);
      }
      
      console.log(`✅ [BscScan] Transaction receipt retrieved`);
      
      return {
        receipt: data.result
      };
    } catch (error) {
      console.error('[BscScan] Transaction receipt fetch error:', error);
      throw new Error(`Failed to fetch transaction receipt: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get current gas price
   */
  async getGasPrice(): Promise<{
    gasPrice: string; // in Wei
    gasPriceGwei: number; // in Gwei
  }> {
    try {
      console.log('🔍 [BscScan] Fetching gas price...');
      
      const params = new URLSearchParams({
        module: 'proxy',
        action: 'eth_gasPrice',
        apikey: this.apiKey
      });
      
      const response = await fetch(`${this.baseUrl}?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error(`BscScan API error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      if (data.error) {
        throw new Error(`BscScan API error: ${data.error.message}`);
      }
      
      const gasPrice = parseInt(data.result, 16).toString();
      const gasPriceGwei = parseFloat(gasPrice) / 1e9;
      
      console.log(`✅ [BscScan] Gas price: ${gasPrice} Wei (${gasPriceGwei} Gwei)`);
      
      return {
        gasPrice,
        gasPriceGwei
      };
    } catch (error) {
      console.error('[BscScan] Gas price fetch error:', error);
      throw new Error(`Failed to fetch gas price: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get latest block number
   */
  async getLatestBlockNumber(): Promise<number> {
    try {
      console.log('🔍 [BscScan] Fetching latest block number...');
      
      const params = new URLSearchParams({
        module: 'proxy',
        action: 'eth_blockNumber',
        apikey: this.apiKey
      });
      
      const response = await fetch(`${this.baseUrl}?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error(`BscScan API error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      if (data.error) {
        throw new Error(`BscScan API error: ${data.error.message}`);
      }
      
      const blockNumber = parseInt(data.result, 16);
      
      console.log(`✅ [BscScan] Latest block number: ${blockNumber}`);
      
      return blockNumber;
    } catch (error) {
      console.error('[BscScan] Latest block number fetch error:', error);
      throw new Error(`Failed to fetch latest block number: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

// Note: Singleton instances require API key, so users must create their own instances
// Example: const bscscan = new BscScanAPI({ apiKey: 'YOUR_API_KEY' });

