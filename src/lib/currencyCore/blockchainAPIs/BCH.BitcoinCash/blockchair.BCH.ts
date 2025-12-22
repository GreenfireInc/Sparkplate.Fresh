// Blockchair API Implementation for Bitcoin Cash
// Based on: 00.References/blockchainApi/blockchair.js
// API Docs: https://blockchair.com/api/docs
// Free tier: 5,000 requests/day

export interface BlockchairUTXO {
  transaction_hash: string;
  index: number;
  value: number;
  script_hex: string;
  block_id: number;
}

export interface BlockchairTransaction {
  hash: string;
  block_id: number;
  time: string;
  balance_change: number;
}

export interface BlockchairAddressData {
  address: {
    balance: number;
    unconfirmed_balance: number;
    transaction_count: number;
  };
  utxo: BlockchairUTXO[];
  transactions: BlockchairTransaction[];
}

export interface BlockchairResponse {
  data: {
    [address: string]: BlockchairAddressData;
  };
  context: {
    state: number; // Current block height
    error?: string;
  };
}

export class BlockchairAPI {
  private baseUrl: string;
  private network: 'mainnet' | 'testnet';

  constructor(network: 'mainnet' | 'testnet' = 'mainnet') {
    this.network = network;
    this.baseUrl = network === 'mainnet' 
      ? 'https://api.blockchair.com/bitcoin-cash'
      : 'https://api.blockchair.com/bitcoin-cash/testnet';
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
      console.log(`🔍 [Blockchair] Fetching UTXOs for: ${address}`);
      
      const response = await fetch(`${this.baseUrl}/dashboards/address/${address}`);
      
      if (!response.ok) {
        throw new Error(`Blockchair API error: ${response.status} ${response.statusText}`);
      }
      
      const data: BlockchairResponse = await response.json();
      
      if (!data.data || !data.data[address]) {
        throw new Error('Address not found or invalid response');
      }
      
      const addressData = data.data[address];
      const utxos = addressData.utxo || [];
      
      console.log(`✅ [Blockchair] Found ${utxos.length} UTXOs`);
      
      // Transform Blockchair UTXO format to standard format
      return utxos.map((utxo) => ({
        txid: utxo.transaction_hash,
        vout: utxo.index,
        value: utxo.value,
        scriptPubKey: utxo.script_hex,
        confirmations: data.context.state ? data.context.state - utxo.block_id : 0
      }));
    } catch (error) {
      console.error('[Blockchair] UTXO fetch error:', error);
      throw new Error(`Failed to fetch UTXOs: ${error instanceof Error ? error.message : 'Unknown error'}`);
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
      console.log(`💰 [Blockchair] Fetching balance for: ${address}`);
      
      const response = await fetch(`${this.baseUrl}/dashboards/address/${address}`);
      
      if (!response.ok) {
        throw new Error(`Blockchair API error: ${response.status} ${response.statusText}`);
      }
      
      const data: BlockchairResponse = await response.json();
      
      if (!data.data || !data.data[address]) {
        throw new Error('Address not found or invalid response');
      }
      
      const addressData = data.data[address].address;
      
      const result = {
        balance: addressData.balance || 0,
        unconfirmedBalance: addressData.unconfirmed_balance || 0,
        txCount: addressData.transaction_count || 0
      };
      
      console.log(`✅ [Blockchair] Balance: ${result.balance} satoshis (${result.balance / 100000000} BCH)`);
      
      return result;
    } catch (error) {
      console.error('[Blockchair] Balance fetch error:', error);
      throw new Error(`Failed to fetch balance: ${error instanceof Error ? error.message : 'Unknown error'}`);
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
      console.log(`📡 [Blockchair] Broadcasting transaction...`);
      
      const response = await fetch(`${this.baseUrl}/push/transaction`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: txHex
        })
      });
      
      const data = await response.json();
      
      if (!response.ok || !data.data) {
        throw new Error(data.context?.error || `Broadcast failed: ${response.status}`);
      }
      
      const txid = data.data.transaction_hash;
      
      console.log(`✅ [Blockchair] Transaction broadcast successful!`);
      console.log(`🆔 [Blockchair] Transaction ID: ${txid}`);
      
      return {
        success: true,
        txid: txid,
        message: 'Transaction broadcast successfully'
      };
    } catch (error) {
      console.error('[Blockchair] Broadcast error:', error);
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
      console.log(`📜 [Blockchair] Fetching transaction history for: ${address}`);
      
      const response = await fetch(`${this.baseUrl}/dashboards/address/${address}?limit=${limit}`);
      
      if (!response.ok) {
        throw new Error(`Blockchair API error: ${response.status} ${response.statusText}`);
      }
      
      const data: BlockchairResponse = await response.json();
      
      if (!data.data || !data.data[address]) {
        throw new Error('Address not found or invalid response');
      }
      
      const transactions = data.data[address].transactions || [];
      const currentBlock = data.context.state || 0;
      
      console.log(`✅ [Blockchair] Found ${transactions.length} transactions`);
      
      return transactions.map((tx) => ({
        txid: tx.hash,
        blockHeight: tx.block_id,
        timestamp: tx.time,
        value: Math.abs(tx.balance_change),
        type: tx.balance_change > 0 ? 'received' as const : 'sent' as const,
        confirmations: currentBlock - tx.block_id
      }));
    } catch (error) {
      console.error('[Blockchair] Transaction history fetch error:', error);
      throw new Error(`Failed to fetch transaction history: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get network statistics
   */
  async getNetworkStats(): Promise<{
    suggestedFeePerByte: number;
    blockHeight: number;
    difficulty: number;
  }> {
    try {
      console.log(`📊 [Blockchair] Fetching network stats...`);
      
      const response = await fetch(`${this.baseUrl}/stats`);
      
      if (!response.ok) {
        throw new Error(`Blockchair API error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      return {
        suggestedFeePerByte: data.data.suggested_transaction_fee_per_byte_sat || 1,
        blockHeight: data.data.blocks || 0,
        difficulty: data.data.difficulty || 0
      };
    } catch (error) {
      console.error('[Blockchair] Network stats fetch error:', error);
      throw new Error(`Failed to fetch network stats: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get multiple addresses' balances at once
   */
  async getBalances(addresses: string[]): Promise<{ [address: string]: number }> {
    try {
      console.log(`💰 [Blockchair] Fetching balances for ${addresses.length} addresses`);
      
      const addressesString = addresses.join(',');
      const response = await fetch(`${this.baseUrl}/dashboards/addresses/${addressesString}`);
      
      if (!response.ok) {
        throw new Error(`Blockchair API error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      const balances: { [address: string]: number } = {};
      
      for (const address of addresses) {
        if (data.data.addresses && data.data.addresses[address]) {
          balances[address] = data.data.addresses[address].balance || 0;
        } else {
          balances[address] = 0;
        }
      }
      
      console.log(`✅ [Blockchair] Fetched ${Object.keys(balances).length} balances`);
      
      return balances;
    } catch (error) {
      console.error('[Blockchair] Balances fetch error:', error);
      throw new Error(`Failed to fetch balances: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

// Export singleton instances
export const blockchairMainnet = new BlockchairAPI('mainnet');
export const blockchairTestnet = new BlockchairAPI('testnet');

