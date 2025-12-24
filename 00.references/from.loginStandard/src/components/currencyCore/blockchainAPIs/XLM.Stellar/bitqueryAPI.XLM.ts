/**
 * Bitquery API for Stellar (XLM)
 * 
 * GraphQL API with real-time data streaming
 * 
 * Features:
 * - Historical and real-time blockchain data
 * - GraphQL queries
 * - Token transfers and payments
 * - Address and transaction details
 * - Real-time data streaming
 * - Requires API key
 * 
 * Documentation: https://bitquery.io/blockchains/stellar-blockchain-api
 * Website: https://bitquery.io/
 */

import axios, { AxiosInstance } from 'axios';

// API Configuration
export interface BitqueryStellarConfig {
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
export interface BitqueryStellarBalance {
  stellar: {
    address: Array<{
      address: string;
      balance: number;
      annotation?: string;
    }>;
  };
}

// Transaction
export interface BitqueryStellarTransaction {
  stellar: {
    transactions: Array<{
      hash: string;
      block: {
        height: number;
        timestamp: {
          time: string;
        };
      };
      sourceAccount: {
        address: string;
      };
      fee: number;
      operationCount: number;
      success: boolean;
    }>;
  };
}

// Transfer/Payment
export interface BitqueryStellarTransfer {
  stellar: {
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

export class BitqueryStellarAPI {
  private client: AxiosInstance;
  private config: Required<BitqueryStellarConfig>;

  constructor(config: BitqueryStellarConfig) {
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
        stellar {
          address(address: {is: $address}) {
            address
            balance
            annotation
          }
        }
      }
    `;

    const result = await this.query<BitqueryStellarBalance>(query, { address });
    return result.stellar.address[0]?.balance || 0;
  }

  /**
   * Get transaction history
   */
  async getTransactionHistory(
    address: string,
    limit: number = 50
  ): Promise<BitqueryStellarTransaction['stellar']['transactions']> {
    const query = `
      query ($address: String!, $limit: Int!) {
        stellar {
          transactions(
            options: {limit: $limit, desc: "block.timestamp.time"}
            sourceAccount: {is: $address}
          ) {
            hash
            block {
              height
              timestamp {
                time
              }
            }
            sourceAccount {
              address
            }
            fee
            operationCount
            success
          }
        }
      }
    `;

    const result = await this.query<BitqueryStellarTransaction>(query, { address, limit });
    return result.stellar.transactions;
  }

  /**
   * Get transfers/payments for an address
   */
  async getTransfers(
    address: string,
    limit: number = 50
  ): Promise<BitqueryStellarTransfer['stellar']['transfers']> {
    const query = `
      query ($address: String!, $limit: Int!) {
        stellar {
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

    const result = await this.query<BitqueryStellarTransfer>(query, { address, limit });
    return result.stellar.transfers;
  }

  /**
   * Get transaction by hash
   */
  async getTransaction(hash: string): Promise<BitqueryStellarTransaction['stellar']['transactions'][0]> {
    const query = `
      query ($hash: String!) {
        stellar {
          transactions(txHash: {is: $hash}) {
            hash
            block {
              height
              timestamp {
                time
              }
            }
            sourceAccount {
              address
            }
            fee
            operationCount
            success
          }
        }
      }
    `;

    const result = await this.query<BitqueryStellarTransaction>(query, { hash });
    return result.stellar.transactions[0];
  }
}

// Factory function (API key required)
export const createBitqueryStellarAPI = (apiKey: string) => {
  return new BitqueryStellarAPI({ apiKey });
};
