/**
 * Bitquery API for Terra Classic (LUNC)
 * 
 * GraphQL-based blockchain data API for Terra Classic
 * 
 * Features:
 * - Free tier available
 * - GraphQL queries for flexible data retrieval
 * - Transaction, address, and block explorer functionality
 * - Balance and transaction fee analysis
 * - Charts and analytics
 * 
 * Documentation: https://docs.bitquery.io/
 * Website: https://explorer.bitquery.io/terra
 */

import axios, { AxiosInstance } from 'axios';

// API Configuration
export interface BitqueryConfig {
  apiKey?: string;
  baseURL?: string;
  timeout?: number;
  retries?: number;
}

// GraphQL Response
export interface BitqueryResponse<T = unknown> {
  data?: T;
  errors?: Array<{
    message: string;
    locations?: Array<{
      line: number;
      column: number;
    }>;
    path?: string[];
  }>;
}

// Address Information
export interface BitqueryAddress {
  address: {
    address: string;
    balance: string;
    transactionCount: number;
    receivedAmount: string;
    sentAmount: string;
    firstTransactionAt: string;
    lastTransactionAt: string;
  };
}

// Transaction
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
  receiver: {
    address: string;
  };
  amount: string;
  currency: {
    symbol: string;
  };
  fee: string;
  success: boolean;
}

// Balance
export interface BitqueryBalance {
  currency: {
    symbol: string;
    name: string;
  };
  value: string;
}

export class BitqueryAPI {
  private client: AxiosInstance;
  private config: Required<Omit<BitqueryConfig, 'apiKey'>> & { apiKey?: string };

  constructor(config: BitqueryConfig = {}) {
    this.config = {
      apiKey: config.apiKey,
      baseURL: config.baseURL || 'https://graphql.bitquery.io',
      timeout: config.timeout || 30000,
      retries: config.retries || 3,
    };

    this.client = axios.create({
      baseURL: this.config.baseURL,
      timeout: this.config.timeout,
      headers: {
        'Content-Type': 'application/json',
        ...(this.config.apiKey && { 'X-API-KEY': this.config.apiKey }),
      },
    });
  }

  /**
   * Execute GraphQL query
   */
  private async query<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
    const response = await this.client.post<BitqueryResponse<T>>('', {
      query,
      variables,
    });

    if (response.data.errors) {
      throw new Error(`BitQuery Error: ${response.data.errors[0].message}`);
    }

    return response.data.data as T;
  }

  /**
   * Get address information
   */
  async getAddressInfo(address: string): Promise<BitqueryAddress> {
    const query = `
      query ($address: String!) {
        terra(network: columbus_5) {
          address(address: {is: $address}) {
            address
            balance
            transactionCount
            receivedAmount
            sentAmount
            firstTransactionAt {
              time
            }
            lastTransactionAt {
              time
            }
          }
        }
      }
    `;

    const result = await this.query<{ terra: BitqueryAddress }>(query, { address });
    return result.terra;
  }

  /**
   * Get address balance
   */
  async getBalance(address: string): Promise<BitqueryBalance[]> {
    const query = `
      query ($address: String!) {
        terra(network: columbus_5) {
          address(address: {is: $address}) {
            balances {
              currency {
                symbol
                name
              }
              value
            }
          }
        }
      }
    `;

    const result = await this.query<{ terra: { address: { balances: BitqueryBalance[] } } }>(query, { address });
    return result.terra.address.balances || [];
  }

  /**
   * Get transaction history for an address
   */
  async getTransactionHistory(
    address: string,
    limit: number = 50,
    offset: number = 0
  ): Promise<BitqueryTransaction[]> {
    const query = `
      query ($address: String!, $limit: Int!, $offset: Int!) {
        terra(network: columbus_5) {
          transfers(
            options: {limit: $limit, offset: $offset}
            any: [{sender: {is: $address}}, {receiver: {is: $address}}]
          ) {
            hash: transaction {
              hash
            }
            block {
              height
              timestamp {
                time
              }
            }
            sender {
              address
            }
            receiver {
              address
            }
            amount
            currency {
              symbol
            }
            fee: transaction {
              fee
            }
            success
          }
        }
      }
    `;

    const result = await this.query<{ terra: { transfers: BitqueryTransaction[] } }>(query, {
      address,
      limit,
      offset,
    });
    return result.terra.transfers || [];
  }

  /**
   * Get transaction by hash
   */
  async getTransaction(txHash: string): Promise<BitqueryTransaction> {
    const query = `
      query ($hash: String!) {
        terra(network: columbus_5) {
          transactions(txHash: {is: $hash}) {
            hash
            block {
              height
              timestamp {
                time
              }
            }
            sender {
              address
            }
            receiver {
              address
            }
            amount
            currency {
              symbol
            }
            fee
            success
          }
        }
      }
    `;

    const result = await this.query<{ terra: { transactions: BitqueryTransaction[] } }>(query, { hash: txHash });
    return result.terra.transactions[0];
  }

  /**
   * Get blocks
   */
  async getBlocks(limit: number = 10): Promise<unknown[]> {
    const query = `
      query ($limit: Int!) {
        terra(network: columbus_5) {
          blocks(options: {limit: $limit, desc: "height"}) {
            height
            timestamp {
              time
            }
            transactionCount
            proposer {
              address
            }
          }
        }
      }
    `;

    const result = await this.query<{ terra: { blocks: unknown[] } }>(query, { limit });
    return result.terra.blocks || [];
  }

  /**
   * Get block by height
   */
  async getBlock(height: number): Promise<unknown> {
    const query = `
      query ($height: Int!) {
        terra(network: columbus_5) {
          blocks(height: {is: $height}) {
            height
            timestamp {
              time
            }
            transactionCount
            proposer {
              address
            }
            hash
          }
        }
      }
    `;

    const result = await this.query<{ terra: { blocks: unknown[] } }>(query, { height });
    return result.terra.blocks[0];
  }

  /**
   * Get validators
   */
  async getValidators(limit: number = 100): Promise<unknown[]> {
    const query = `
      query ($limit: Int!) {
        terra(network: columbus_5) {
          validators(options: {limit: $limit}) {
            address
            moniker
            votingPower
            commission
            status
          }
        }
      }
    `;

    const result = await this.query<{ terra: { validators: unknown[] } }>(query, { limit });
    return result.terra.validators || [];
  }

  /**
   * Get network statistics
   */
  async getNetworkStats(): Promise<unknown> {
    const query = `
      query {
        terra(network: columbus_5) {
          statistics {
            totalSupply
            circulatingSupply
            blockHeight
            transactionCount
            averageBlockTime
            activeValidators
          }
        }
      }
    `;

    const result = await this.query<{ terra: { statistics: unknown } }>(query);
    return result.terra.statistics;
  }

  /**
   * Get token transfers
   */
  async getTokenTransfers(
    tokenAddress: string,
    limit: number = 50,
    offset: number = 0
  ): Promise<unknown[]> {
    const query = `
      query ($tokenAddress: String!, $limit: Int!, $offset: Int!) {
        terra(network: columbus_5) {
          transfers(
            options: {limit: $limit, offset: $offset}
            currency: {is: $tokenAddress}
          ) {
            hash: transaction {
              hash
            }
            block {
              height
              timestamp {
                time
              }
            }
            sender {
              address
            }
            receiver {
              address
            }
            amount
            currency {
              symbol
              address
            }
          }
        }
      }
    `;

    const result = await this.query<{ terra: { transfers: unknown[] } }>(query, {
      tokenAddress,
      limit,
      offset,
    });
    return result.terra.transfers || [];
  }
}

// Note: Requires API key for production use, so no default singleton instance
export const createBitqueryAPI = (apiKey?: string) => {
  return new BitqueryAPI({ apiKey });
};

// Singleton instance for free tier (limited functionality without API key)
export const bitqueryAPI = new BitqueryAPI();

