/**
 * Bitquery API for Ripple (XRP)
 * 
 * GraphQL API with real-time and historical data
 * 
 * Features:
 * - Historical and real-time blockchain data
 * - GraphQL queries
 * - Transfers, offers, checks, escrows
 * - Payment tracking
 * - Free tier available
 * 
 * Documentation: https://bitquery.io/blockchains/ripple-blockchain-api
 * Website: https://bitquery.io/
 */

import axios, { AxiosInstance } from 'axios';

// API Configuration
export interface BitqueryXRPConfig {
  apiKey: string;
  baseURL?: string;
  timeout?: number;
  retries?: number;
}

// GraphQL Response
export interface BitqueryGraphQLResponse<T> {
  data: T;
  errors?: Array<{
    message: string;
    locations: Array<{ line: number; column: number }>;
  }>;
}

// Account Balance
export interface BitqueryXRPBalance {
  ripple: {
    address: Array<{
      address: string;
      balance: number;
    }>;
  };
}

// Transfers
export interface BitqueryXRPTransfers {
  ripple: {
    transfers: Array<{
      block: {
        height: number;
        timestamp: {
          time: string;
        };
      };
      transaction: {
        hash: string;
      };
      sender: {
        address: string;
      };
      receiver: {
        address: string;
      };
      amount: number;
      currency: {
        symbol: string;
        address?: string;
      };
    }>;
  };
}

// Transactions
export interface BitqueryXRPTransactions {
  ripple: {
    transactions: Array<{
      hash: string;
      block: {
        height: number;
        timestamp: {
          time: string;
        };
      };
      account: {
        address: string;
      };
      fee: number;
      txType: string;
      success: boolean;
    }>;
  };
}

export class BitqueryXRPAPI {
  private client: AxiosInstance;
  private config: Required<BitqueryXRPConfig>;

  constructor(config: BitqueryXRPConfig) {
    if (!config.apiKey) {
      throw new Error('Bitquery API key is required');
    }

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
        'X-API-KEY': this.config.apiKey,
      },
    });
  }

  /**
   * Execute GraphQL query
   */
  private async query<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
    const response = await this.client.post<BitqueryGraphQLResponse<T>>('', {
      query,
      variables,
    });

    if (response.data.errors) {
      throw new Error(`GraphQL Error: ${response.data.errors[0].message}`);
    }

    return response.data.data;
  }

  /**
   * Get account balance
   */
  async getBalance(address: string): Promise<number> {
    const query = `
      query ($address: String!) {
        ripple {
          address(address: {is: $address}) {
            address
            balance
          }
        }
      }
    `;

    const result = await this.query<BitqueryXRPBalance>(query, { address });
    return result.ripple.address[0]?.balance || 0;
  }

  /**
   * Get transfers for an address
   */
  async getTransfers(address: string, limit: number = 50): Promise<BitqueryXRPTransfers['ripple']['transfers']> {
    const query = `
      query ($address: String!, $limit: Int!) {
        ripple {
          transfers(
            options: {limit: $limit, desc: "block.timestamp.time"}
            any: [{sender: {is: $address}}, {receiver: {is: $address}}]
          ) {
            block {
              height
              timestamp {
                time
              }
            }
            transaction {
              hash
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

    const result = await this.query<BitqueryXRPTransfers>(query, { address, limit });
    return result.ripple.transfers;
  }

  /**
   * Get transactions for an address
   */
  async getTransactions(address: string, limit: number = 50): Promise<BitqueryXRPTransactions['ripple']['transactions']> {
    const query = `
      query ($address: String!, $limit: Int!) {
        ripple {
          transactions(
            options: {limit: $limit, desc: "block.timestamp.time"}
            account: {is: $address}
          ) {
            hash
            block {
              height
              timestamp {
                time
              }
            }
            account {
              address
            }
            fee
            txType
            success
          }
        }
      }
    `;

    const result = await this.query<BitqueryXRPTransactions>(query, { address, limit });
    return result.ripple.transactions;
  }

  /**
   * Get transaction by hash
   */
  async getTransaction(hash: string): Promise<BitqueryXRPTransactions['ripple']['transactions'][0]> {
    const query = `
      query ($hash: String!) {
        ripple {
          transactions(txHash: {is: $hash}) {
            hash
            block {
              height
              timestamp {
                time
              }
            }
            account {
              address
            }
            fee
            txType
            success
          }
        }
      }
    `;

    const result = await this.query<BitqueryXRPTransactions>(query, { hash });
    return result.ripple.transactions[0];
  }

  /**
   * Get payment transfers only
   */
  async getPayments(address: string, limit: number = 50): Promise<BitqueryXRPTransfers['ripple']['transfers']> {
    const query = `
      query ($address: String!, $limit: Int!) {
        ripple {
          transfers(
            options: {limit: $limit, desc: "block.timestamp.time"}
            any: [{sender: {is: $address}}, {receiver: {is: $address}}]
            currency: {is: "XRP"}
          ) {
            block {
              height
              timestamp {
                time
              }
            }
            transaction {
              hash
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
          }
        }
      }
    `;

    const result = await this.query<BitqueryXRPTransfers>(query, { address, limit });
    return result.ripple.transfers;
  }
}

// Factory function (API key required)
export const createBitqueryXRPAPI = (apiKey: string) => {
  return new BitqueryXRPAPI({ apiKey });
};
