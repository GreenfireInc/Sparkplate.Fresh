/**
 * Bitquery API for Tezos (XTZ)
 * 
 * GraphQL API with real-time and historical data
 * 
 * Features:
 * - Historical and real-time blockchain data
 * - GraphQL queries
 * - Token transfers and operations
 * - Free tier available
 * - Complex filtering
 * 
 * Documentation: https://bitquery.io/blockchains/tezos-blockchain-api
 * Website: https://bitquery.io/
 */

import axios, { AxiosInstance } from 'axios';

// API Configuration
export interface BitqueryTezosConfig {
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
export interface BitqueryTezosBalance {
  tezos: {
    address: Array<{
      address: string;
      balance: number;
    }>;
  };
}

// Operations
export interface BitqueryTezosOperations {
  tezos: {
    operations: Array<{
      block: {
        height: number;
        timestamp: {
          time: string;
        };
      };
      hash: string;
      kind: string;
      sender: {
        address: string;
      };
      receiver?: {
        address: string;
      };
      amount?: number;
      fee: number;
      gasLimit: number;
      gasUsed: number;
      success: boolean;
    }>;
  };
}

// Transfers
export interface BitqueryTezosTransfers {
  tezos: {
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
        tokenId?: string;
      };
    }>;
  };
}

export class BitqueryTezosAPI {
  private client: AxiosInstance;
  private config: Required<BitqueryTezosConfig>;

  constructor(config: BitqueryTezosConfig) {
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
   * Application/json
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
        tezos {
          address(address: {is: $address}) {
            address
            balance
          }
        }
      }
    `;

    const result = await this.query<BitqueryTezosBalance>(query, { address });
    return result.tezos.address[0]?.balance || 0;
  }

  /**
   * Get operations for an address
   */
  async getOperations(
    address: string,
    limit: number = 50
  ): Promise<BitqueryTezosOperations['tezos']['operations']> {
    const query = `
      query ($address: String!, $limit: Int!) {
        tezos {
          operations(
            options: {limit: $limit, desc: "block.timestamp.time"}
            any: [{sender: {is: $address}}, {receiver: {is: $address}}]
          ) {
            block {
              height
              timestamp {
                time
              }
            }
            hash
            kind
            sender {
              address
            }
            receiver {
              address
            }
            amount
            fee
            gasLimit
            gasUsed
            success
          }
        }
      }
    `;

    const result = await this.query<BitqueryTezosOperations>(query, { address, limit });
    return result.tezos.operations;
  }

  /**
   * Get transfers for an address
   */
  async getTransfers(
    address: string,
    limit: number = 50
  ): Promise<BitqueryTezosTransfers['tezos']['transfers']> {
    const query = `
      query ($address: String!, $limit: Int!) {
        tezos {
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
              tokenId
            }
          }
        }
      }
    `;

    const result = await this.query<BitqueryTezosTransfers>(query, { address, limit });
    return result.tezos.transfers;
  }

  /**
   * Get operation by hash
   */
  async getOperation(hash: string): Promise<BitqueryTezosOperations['tezos']['operations'][0]> {
    const query = `
      query ($hash: String!) {
        tezos {
          operations(txHash: {is: $hash}) {
            block {
              height
              timestamp {
                time
              }
            }
            hash
            kind
            sender {
              address
            }
            receiver {
              address
            }
            amount
            fee
            gasLimit
            gasUsed
            success
          }
        }
      }
    `;

    const result = await this.query<BitqueryTezosOperations>(query, { hash });
    return result.tezos.operations[0];
  }

  /**
   * Get token transfers
   */
  async getTokenTransfers(
    address: string,
    tokenAddress?: string,
    limit: number = 50
  ): Promise<BitqueryTezosTransfers['tezos']['transfers']> {
    const query = `
      query ($address: String!, $tokenAddress: String, $limit: Int!) {
        tezos {
          transfers(
            options: {limit: $limit, desc: "block.timestamp.time"}
            any: [{sender: {is: $address}}, {receiver: {is: $address}}]
            ${tokenAddress ? 'currency: {is: $tokenAddress}' : ''}
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
              tokenId
            }
          }
        }
      }
    `;

    const variables: Record<string, unknown> = { address, limit };
    if (tokenAddress) variables.tokenAddress = tokenAddress;

    const result = await this.query<BitqueryTezosTransfers>(query, variables);
    return result.tezos.transfers;
  }
}

// Factory function (API key required)
export const createBitqueryTezosAPI = (apiKey: string) => {
  return new BitqueryTezosAPI({ apiKey });
};
