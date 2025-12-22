// Bitcoin.com REST API Implementation for Bitcoin Cash
// API Docs: https://rest.bitcoin.com/
// Free tier: Available, rate limits apply
// Note: Bitcoin.com provides BCH-specific REST APIs

export interface BitcoinComUTXO {
  txid: string;
  vout: number;
  amount: number;
  satoshis: number;
  height: number;
  confirmations: number;
}

export class BitcoinComAPI {
  private baseUrl: string;
  private network: 'mainnet' | 'testnet';

  constructor(network: 'mainnet' | 'testnet' = 'mainnet') {
    this.network = network;
    // Note: Bitcoin.com REST API was deprecated. Using alternative endpoint structure
    this.baseUrl = network === 'mainnet'
      ? 'https://rest.bitcoin.com/v2'
      : 'https://trest.bitcoin.com/v2';
  }

  /**
   * Fetch UTXOs for a given address
   */
  async fetchUTXOs(address: string): Promise<Array<{
    txid: string;
    vout: number;
    value: number;
    scriptPubKey: string;
    confirmations: number;
  }>> {
    try {
      console.log(`🔍 [Bitcoin.com] Fetching UTXOs for: ${address}`);

      // Convert address to array format if needed
      const addresses = Array.isArray(address) ? address : [address];

      const response = await fetch(`${this.baseUrl}/address/utxo/${addresses.join(',')}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Bitcoin.com API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      // Handle both single address and array response
      const utxos: BitcoinComUTXO[] = Array.isArray(data) 
        ? (Array.isArray(data[0]) ? data[0] : data)
        : [];

      console.log(`✅ [Bitcoin.com] Found ${utxos.length} UTXOs`);

      return utxos.map(utxo => ({
        txid: utxo.txid,
        vout: utxo.vout,
        value: utxo.satoshis,
        scriptPubKey: '', // Bitcoin.com API may not return this
        confirmations: utxo.confirmations
      }));
    } catch (error) {
      console.error('[Bitcoin.com] UTXO fetch error:', error);
      throw new Error(`Failed to fetch UTXOs from Bitcoin.com: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get balance for a given address
   */
  async getBalance(address: string): Promise<{
    balance: number; // in satoshis
    unconfirmedBalance: number;
    txCount: number;
  }> {
    try {
      console.log(`💰 [Bitcoin.com] Fetching balance for: ${address}`);

      const addresses = Array.isArray(address) ? address : [address];

      const response = await fetch(`${this.baseUrl}/address/details/${addresses.join(',')}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Bitcoin.com API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      // Handle both single address and array response
      const addressData = Array.isArray(data) ? data[0] : data;

      const balance = addressData.balanceSat || 0;
      const unconfirmedBalance = addressData.unconfirmedBalanceSat || 0;
      const txCount = addressData.txApperances || addressData.transactions?.length || 0;

      console.log(`✅ [Bitcoin.com] Balance: ${balance} satoshis (${balance / 100000000} BCH)`);

      return {
        balance,
        unconfirmedBalance,
        txCount
      };
    } catch (error) {
      console.error('[Bitcoin.com] Balance fetch error:', error);
      throw new Error(`Failed to fetch balance from Bitcoin.com: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Broadcast a transaction to the network
   */
  async broadcastTransaction(txHex: string): Promise<{
    success: boolean;
    txid: string;
    message?: string;
  }> {
    try {
      console.log(`📡 [Bitcoin.com] Broadcasting transaction...`);

      const response = await fetch(`${this.baseUrl}/rawtransactions/sendRawTransaction`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          hexes: [txHex]
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Bitcoin.com API error: ${response.status} ${response.statusText} - ${errorText}`);
      }

      const data = await response.json();

      // Bitcoin.com returns an array of txids
      const txid = Array.isArray(data) ? data[0] : data;

      console.log(`✅ [Bitcoin.com] Transaction broadcast successful!`);
      console.log(`🆔 [Bitcoin.com] Transaction ID: ${txid}`);

      return {
        success: true,
        txid: txid,
        message: 'Transaction broadcast successfully'
      };
    } catch (error) {
      console.error('[Bitcoin.com] Broadcast error:', error);
      return {
        success: false,
        txid: '',
        message: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Get transaction history for an address
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
      console.log(`📜 [Bitcoin.com] Fetching transaction history for: ${address}`);

      const addresses = Array.isArray(address) ? address : [address];

      const response = await fetch(`${this.baseUrl}/address/transactions/${addresses.join(',')}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Bitcoin.com API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      // Handle both single address and array response
      const transactionData = Array.isArray(data) ? data[0] : data;
      const transactions = transactionData.txs || [];

      console.log(`✅ [Bitcoin.com] Found ${transactions.length} transactions`);

      return transactions.slice(0, limit).map((tx: {
        txid: string;
        blockheight: number;
        blocktime: number;
        vin: Array<{ addr?: string }>;
        vout: Array<{ scriptPubKey?: { addresses?: string[] }; value: number }>;
        confirmations: number;
      }) => {
        // Determine if transaction is sent or received
        const isSent = tx.vin.some(input => input.addr === address);
        const isReceived = tx.vout.some(output => 
          output.scriptPubKey?.addresses?.includes(address)
        );

        // Calculate value
        let value = 0;
        if (isReceived) {
          value = tx.vout
            .filter(output => output.scriptPubKey?.addresses?.includes(address))
            .reduce((sum, output) => sum + output.value, 0);
        }

        return {
          txid: tx.txid,
          blockHeight: tx.blockheight,
          timestamp: new Date(tx.blocktime * 1000).toISOString(),
          value: Math.floor(value * 100000000), // Convert to satoshis
          type: isSent && !isReceived ? 'sent' as const : 'received' as const,
          confirmations: tx.confirmations
        };
      });
    } catch (error) {
      console.error('[Bitcoin.com] Transaction history fetch error:', error);
      throw new Error(`Failed to fetch transaction history from Bitcoin.com: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get transaction details
   */
  async getTransactionDetails(txid: string): Promise<{
    txid: string;
    blockHeight: number;
    confirmations: number;
    inputs: Array<{ address: string; value: number }>;
    outputs: Array<{ address: string; value: number }>;
  }> {
    try {
      console.log(`🔍 [Bitcoin.com] Fetching transaction details for: ${txid}`);

      const response = await fetch(`${this.baseUrl}/transaction/details/${txid}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Bitcoin.com API error: ${response.status} ${response.statusText}`);
      }

      const tx = await response.json();

      return {
        txid: tx.txid,
        blockHeight: tx.blockheight,
        confirmations: tx.confirmations,
        inputs: tx.vin.map((input: { addr: string; value: number }) => ({
          address: input.addr,
          value: Math.floor(input.value * 100000000)
        })),
        outputs: tx.vout.map((output: { scriptPubKey: { addresses: string[] }; value: number }) => ({
          address: output.scriptPubKey.addresses?.[0] || '',
          value: Math.floor(output.value * 100000000)
        }))
      };
    } catch (error) {
      console.error('[Bitcoin.com] Transaction details fetch error:', error);
      throw new Error(`Failed to fetch transaction details from Bitcoin.com: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

// Export singleton instances
export const bitcoinComMainnet = new BitcoinComAPI('mainnet');
export const bitcoinComTestnet = new BitcoinComAPI('testnet');

