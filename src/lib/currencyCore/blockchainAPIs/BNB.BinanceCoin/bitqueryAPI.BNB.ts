// Bitquery API Implementation for BNB Smart Chain
// Website: https://bitquery.io/blockchains/bnb-blockchain-api
// API Docs: https://docs.bitquery.io/
// GraphQL-based blockchain data API
// Free tier available with limitations

export interface BitqueryConfig {
  apiKey?: string; // Optional for free tier, required for higher limits
}

export interface BitqueryBalance {
  currency: {
    symbol: string;
    address: string;
  };
  value: number;
}

export interface BitqueryTransaction {
  hash: string;
  block: {
    height: number;
    timestamp: {
      time: string;
    };
  };
  sender: {
    address: string;
  };
  to: {
    address: string;
  };
  amount: number;
  gasValue: number;
  gasPrice: number;
  gas: number;
}

export class BitqueryAPI {
  private graphqlUrl: string;
  private apiKey?: string;
  private network: 'mainnet' | 'testnet';

  constructor(config?: BitqueryConfig, network: 'mainnet' | 'testnet' = 'mainnet') {
    this.apiKey = config?.apiKey;
    this.network = network;
    
    // Bitquery GraphQL endpoint
    this.graphqlUrl = 'https://graphql.bitquery.io';
  }

  /**
   * Make a GraphQL query
   */
  private async graphqlQuery(query: string, variables?: Record<string, unknown>): Promise<unknown> {
    try {
      const headers: HeadersInit = {
        'Content-Type': 'application/json'
      };
      
      if (this.apiKey) {
        headers['X-API-KEY'] = this.apiKey;
      }
      
      const response = await fetch(this.graphqlUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          query,
          variables
        })
      });

      if (!response.ok) {
        throw new Error(`Bitquery API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      if (data.errors) {
        throw new Error(`Bitquery GraphQL error: ${JSON.stringify(data.errors)}`);
      }

      return data.data;
    } catch (error) {
      console.error('[Bitquery] GraphQL query error:', error);
      throw error;
    }
  }

  /**
   * Get BNB balance for an address
   */
  async getBalance(address: string): Promise<{
    balance: string;
    balanceBNB: number;
    balances: BitqueryBalance[];
  }> {
    try {
      console.log(`🔍 [Bitquery] Fetching balance for: ${address}`);
      
      const query = `
        query ($network: EthereumNetwork!, $address: String!) {
          ethereum(network: $network) {
            address(address: {is: $address}) {
              balances {
                currency {
                  symbol
                  address
                }
                value
              }
            }
          }
        }
      `;
      
      const variables = {
        network: this.network === 'mainnet' ? 'bsc' : 'bsc_testnet',
        address: address
      };
      
      const result: any = await this.graphqlQuery(query, variables);
      
      // Find BNB balance (native token)
      const balances = result.ethereum?.address?.[0]?.balances || [];
      const bnbBalance = balances.find((b: BitqueryBalance) => 
        b.currency.symbol === 'BNB' && b.currency.address === '-'
      );
      
      const balance = bnbBalance ? (bnbBalance.value * 1e18).toString() : '0';
      const balanceBNB = bnbBalance ? bnbBalance.value : 0;
      
      console.log(`✅ [Bitquery] Balance: ${balance} Wei (${balanceBNB} BNB)`);
      
      return {
        balance,
        balanceBNB,
        balances
      };
    } catch (error) {
      console.error('[Bitquery] Balance fetch error:', error);
      throw new Error(`Failed to fetch balance: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get transaction history for an address
   */
  async getTransactionHistory(
    address: string,
    limit: number = 50,
    offset: number = 0
  ): Promise<{
    transactions: BitqueryTransaction[];
    count: number;
  }> {
    try {
      console.log(`🔍 [Bitquery] Fetching transaction history for: ${address}`);
      
      const query = `
        query ($network: EthereumNetwork!, $address: String!, $limit: Int!, $offset: Int!) {
          ethereum(network: $network) {
            transactions(
              options: {limit: $limit, offset: $offset, desc: "block.height"}
              txSender: {is: $address}
            ) {
              hash
              block {
                height
                timestamp {
                  time(format: "%Y-%m-%d %H:%M:%S")
                }
              }
              sender {
                address
              }
              to {
                address
              }
              amount
              gasValue
              gasPrice
              gas
            }
          }
        }
      `;
      
      const variables = {
        network: this.network === 'mainnet' ? 'bsc' : 'bsc_testnet',
        address: address,
        limit,
        offset
      };
      
      const result: any = await this.graphqlQuery(query, variables);
      const transactions = result.ethereum?.transactions || [];
      
      console.log(`✅ [Bitquery] Found ${transactions.length} transactions`);
      
      return {
        transactions,
        count: transactions.length
      };
    } catch (error) {
      console.error('[Bitquery] Transaction history fetch error:', error);
      throw new Error(`Failed to fetch transaction history: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get transaction by hash
   */
  async getTransaction(txHash: string): Promise<BitqueryTransaction | null> {
    try {
      console.log(`🔍 [Bitquery] Fetching transaction: ${txHash}`);
      
      const query = `
        query ($network: EthereumNetwork!, $hash: String!) {
          ethereum(network: $network) {
            transactions(txHash: {is: $hash}) {
              hash
              block {
                height
                timestamp {
                  time(format: "%Y-%m-%d %H:%M:%S")
                }
              }
              sender {
                address
              }
              to {
                address
              }
              amount
              gasValue
              gasPrice
              gas
            }
          }
        }
      `;
      
      const variables = {
        network: this.network === 'mainnet' ? 'bsc' : 'bsc_testnet',
        hash: txHash
      };
      
      const result: any = await this.graphqlQuery(query, variables);
      const transaction = result.ethereum?.transactions?.[0] || null;
      
      if (transaction) {
        console.log(`✅ [Bitquery] Transaction retrieved`);
      } else {
        console.log(`⚠️ [Bitquery] Transaction not found`);
      }
      
      return transaction;
    } catch (error) {
      console.error('[Bitquery] Transaction fetch error:', error);
      throw new Error(`Failed to fetch transaction: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get BEP-20 token transfers for an address
   */
  async getTokenTransfers(
    address: string,
    limit: number = 50,
    offset: number = 0
  ): Promise<{
    transfers: unknown[];
    count: number;
  }> {
    try {
      console.log(`🔍 [Bitquery] Fetching token transfers for: ${address}`);
      
      const query = `
        query ($network: EthereumNetwork!, $address: String!, $limit: Int!, $offset: Int!) {
          ethereum(network: $network) {
            transfers(
              options: {limit: $limit, offset: $offset, desc: "block.height"}
              sender: {is: $address}
            ) {
              block {
                height
                timestamp {
                  time(format: "%Y-%m-%d %H:%M:%S")
                }
              }
              sender {
                address
              }
              receiver {
                address
              }
              currency {
                symbol
                address
                decimals
              }
              amount
              transaction {
                hash
              }
            }
          }
        }
      `;
      
      const variables = {
        network: this.network === 'mainnet' ? 'bsc' : 'bsc_testnet',
        address: address,
        limit,
        offset
      };
      
      const result: any = await this.graphqlQuery(query, variables);
      const transfers = result.ethereum?.transfers || [];
      
      console.log(`✅ [Bitquery] Found ${transfers.length} token transfers`);
      
      return {
        transfers,
        count: transfers.length
      };
    } catch (error) {
      console.error('[Bitquery] Token transfers fetch error:', error);
      throw new Error(`Failed to fetch token transfers: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get latest block information
   */
  async getLatestBlock(): Promise<{
    height: number;
    timestamp: string;
    hash: string;
  }> {
    try {
      console.log('🔍 [Bitquery] Fetching latest block...');
      
      const query = `
        query ($network: EthereumNetwork!) {
          ethereum(network: $network) {
            blocks(options: {limit: 1, desc: "height"}) {
              height
              timestamp {
                time(format: "%Y-%m-%d %H:%M:%S")
              }
              hash
            }
          }
        }
      `;
      
      const variables = {
        network: this.network === 'mainnet' ? 'bsc' : 'bsc_testnet'
      };
      
      const result: any = await this.graphqlQuery(query, variables);
      const block = result.ethereum?.blocks?.[0];
      
      if (block) {
        console.log(`✅ [Bitquery] Latest block: ${block.height}`);
        return {
          height: block.height,
          timestamp: block.timestamp.time,
          hash: block.hash
        };
      }
      
      throw new Error('No block data returned');
    } catch (error) {
      console.error('[Bitquery] Latest block fetch error:', error);
      throw new Error(`Failed to fetch latest block: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get smart contract information
   */
  async getSmartContract(address: string): Promise<unknown> {
    try {
      console.log(`🔍 [Bitquery] Fetching smart contract info for: ${address}`);
      
      const query = `
        query ($network: EthereumNetwork!, $address: String!) {
          ethereum(network: $network) {
            smartContractCalls(
              options: {limit: 1}
              smartContractAddress: {is: $address}
            ) {
              smartContract {
                address {
                  address
                }
                contractType
                currency {
                  symbol
                  name
                  decimals
                  tokenType
                }
              }
            }
          }
        }
      `;
      
      const variables = {
        network: this.network === 'mainnet' ? 'bsc' : 'bsc_testnet',
        address: address
      };
      
      const result: any = await this.graphqlQuery(query, variables);
      const contractInfo = result.ethereum?.smartContractCalls?.[0]?.smartContract;
      
      if (contractInfo) {
        console.log(`✅ [Bitquery] Smart contract info retrieved`);
      } else {
        console.log(`⚠️ [Bitquery] Smart contract not found or no calls made`);
      }
      
      return contractInfo;
    } catch (error) {
      console.error('[Bitquery] Smart contract fetch error:', error);
      throw new Error(`Failed to fetch smart contract: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

// Note: Can be used without API key (free tier with limits)
// For higher limits, get API key at https://bitquery.io
export const bitqueryMainnet = new BitqueryAPI(undefined, 'mainnet');
export const bitqueryTestnet = new BitqueryAPI(undefined, 'testnet');

