// Bitquery GraphQL API Implementation for Bitcoin Cash
// API Docs: https://bitquery.io/blockchains/bitcoin-cash-api
// Free tier: Available with API key registration
// Note: Primarily a data API, broadcasting support may be limited

export interface BitqueryUTXO {
  value: number;
  transaction: {
    hash: string;
  };
  outputIndex: number;
  block?: {
    height: number;
  };
}

export interface BitqueryConfig {
  apiKey?: string;
}

export class BitqueryAPI {
  private baseUrl = 'https://graphql.bitquery.io';
  private apiKey?: string;
  private network: 'mainnet' | 'testnet';

  constructor(network: 'mainnet' | 'testnet' = 'mainnet', config?: BitqueryConfig) {
    this.network = network;
    this.apiKey = config?.apiKey || process.env.BITQUERY_API_KEY;
  }

  /**
   * Fetch UTXOs for a given address using GraphQL
   */
  async fetchUTXOs(address: string): Promise<Array<{
    txid: string;
    vout: number;
    value: number;
    scriptPubKey: string;
    confirmations: number;
  }>> {
    try {
      console.log(`🔍 [Bitquery] Fetching UTXOs for: ${address}`);
      
      const query = `
        query ($address: String!) {
          bitcoin(network: bitcoincash) {
            outputs(
              outputAddress: {is: $address}
              spent: {is: false}
            ) {
              value
              transaction {
                hash
              }
              outputIndex
              block {
                height
              }
            }
          }
        }
      `;

      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };

      if (this.apiKey) {
        headers['X-API-KEY'] = this.apiKey;
      }

      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          query,
          variables: { address }
        })
      });

      if (!response.ok) {
        throw new Error(`Bitquery API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      if (data.errors) {
        throw new Error(`GraphQL errors: ${JSON.stringify(data.errors)}`);
      }

      const outputs: BitqueryUTXO[] = data.data?.bitcoin?.outputs || [];
      
      console.log(`✅ [Bitquery] Found ${outputs.length} UTXOs`);

      // Get current block height for confirmations (simplified, may need separate query)
      const currentBlockHeight = 800000; // Placeholder - should fetch actual height

      return outputs.map(output => ({
        txid: output.transaction.hash,
        vout: output.outputIndex,
        value: output.value,
        scriptPubKey: '', // Bitquery may not return this directly
        confirmations: output.block?.height ? currentBlockHeight - output.block.height : 0
      }));
    } catch (error) {
      console.error('[Bitquery] UTXO fetch error:', error);
      throw new Error(`Failed to fetch UTXOs from Bitquery: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get balance for a given address
   */
  async getBalance(address: string): Promise<{
    balance: number;
    unconfirmedBalance: number;
    txCount: number;
  }> {
    try {
      console.log(`💰 [Bitquery] Fetching balance for: ${address}`);

      const query = `
        query ($address: String!) {
          bitcoin(network: bitcoincash) {
            address(address: {is: $address}) {
              balance
              received
              spent
            }
          }
        }
      `;

      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };

      if (this.apiKey) {
        headers['X-API-KEY'] = this.apiKey;
      }

      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          query,
          variables: { address }
        })
      });

      if (!response.ok) {
        throw new Error(`Bitquery API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      if (data.errors) {
        throw new Error(`GraphQL errors: ${JSON.stringify(data.errors)}`);
      }

      const addressData = data.data?.bitcoin?.address?.[0];
      const balance = (addressData?.received || 0) - (addressData?.spent || 0);

      console.log(`✅ [Bitquery] Balance: ${balance} satoshis`);

      return {
        balance: Math.floor(balance * 100000000), // Convert to satoshis
        unconfirmedBalance: 0, // Bitquery doesn't provide this easily
        txCount: 0 // Would need separate query
      };
    } catch (error) {
      console.error('[Bitquery] Balance fetch error:', error);
      throw new Error(`Failed to fetch balance from Bitquery: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Broadcast transaction
   * Note: Bitquery is primarily a data API, broadcasting may not be supported
   */
  async broadcastTransaction(txHex: string): Promise<{
    success: boolean;
    txid: string;
    message?: string;
  }> {
    console.warn('[Bitquery] Transaction broadcasting is not directly supported by Bitquery API');
    return {
      success: false,
      txid: '',
      message: 'Bitquery is a data API and does not support transaction broadcasting. Use Blockchair, Bitcoin.com, or FullStack.cash instead.'
    };
  }

  /**
   * Get transaction history
   */
  async getTransactionHistory(address: string, limit: number = 50): Promise<Array<{
    txid: string;
    blockHeight: number;
    timestamp: string;
    value: number;
    type: 'sent' | 'received';
    confirmations: number;
  }>> {
    try {
      console.log(`📜 [Bitquery] Fetching transaction history for: ${address}`);

      const query = `
        query ($address: String!, $limit: Int!) {
          bitcoin(network: bitcoincash) {
            transactions(
              any: [{outputAddress: {is: $address}}, {inputAddress: {is: $address}}]
              options: {limit: $limit, desc: "block.height"}
            ) {
              hash
              block {
                height
                timestamp {
                  iso8601
                }
              }
              inputValue
              outputValue
            }
          }
        }
      `;

      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };

      if (this.apiKey) {
        headers['X-API-KEY'] = this.apiKey;
      }

      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          query,
          variables: { address, limit }
        })
      });

      if (!response.ok) {
        throw new Error(`Bitquery API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      if (data.errors) {
        throw new Error(`GraphQL errors: ${JSON.stringify(data.errors)}`);
      }

      const transactions = data.data?.bitcoin?.transactions || [];
      const currentBlockHeight = 800000; // Placeholder

      console.log(`✅ [Bitquery] Found ${transactions.length} transactions`);

      return transactions.map((tx: {
        hash: string;
        block: { height: number; timestamp: { iso8601: string } };
        inputValue: number;
        outputValue: number;
      }) => ({
        txid: tx.hash,
        blockHeight: tx.block.height,
        timestamp: tx.block.timestamp.iso8601,
        value: Math.abs(tx.outputValue - tx.inputValue) * 100000000, // Convert to satoshis
        type: tx.outputValue > tx.inputValue ? 'received' as const : 'sent' as const,
        confirmations: currentBlockHeight - tx.block.height
      }));
    } catch (error) {
      console.error('[Bitquery] Transaction history fetch error:', error);
      throw new Error(`Failed to fetch transaction history from Bitquery: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

// Export singleton instances
export const bitqueryMainnet = new BitqueryAPI('mainnet');
export const bitqueryTestnet = new BitqueryAPI('testnet');

