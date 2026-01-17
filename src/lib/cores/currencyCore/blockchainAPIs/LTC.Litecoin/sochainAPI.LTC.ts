// SoChain API Implementation for Litecoin
// API Docs: https://chain.so/api
// Website: https://chain.so/
// Free tier: Free API access
// Fast API for Litecoin and other cryptocurrencies

export interface SoChainAddressInfo {
  network: string;
  address: string;
  balance: string;
  received_value: string;
  pending_value: string;
  total_txs: number;
}

export interface SoChainTransaction {
  txid: string;
  blockhash: string;
  confirmations: number;
  time: number;
  incoming: {
    output_no: number;
    value: string;
    address: string;
    type: string;
    script: string;
  }[];
  outgoing: {
    output_no: number;
    value: string;
    address: string;
    type: string;
    script: string;
  }[];
}

export interface SoChainUTXO {
  txid: string;
  output_no: number;
  script_asm: string;
  script_hex: string;
  value: string;
  confirmations: number;
  time: number;
}

export class SoChainAPI {
  private baseUrl = 'https://chain.so/api/v2';
  private network = 'LTC'; // Mainnet

  /**
   * Get address balance
   */
  async getBalance(address: string): Promise<{
    balance: bigint;
    balanceLTC: number;
    unconfirmed: bigint;
  }> {
    try {
      console.log(`🔍 [SoChain-LTC] Fetching balance for: ${address}`);
      
      const url = `${this.baseUrl}/get_address_balance/${this.network}/${address}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`SoChain API error: ${response.status} ${response.statusText}`);
      }
      
      const result = await response.json();
      
      if (result.status !== 'success') {
        throw new Error(`SoChain API error: ${result.data}`);
      }
      
      const balanceLTC = parseFloat(result.data.confirmed_balance);
      const balance = BigInt(Math.round(balanceLTC * 1e8));
      const unconfirmedLTC = parseFloat(result.data.unconfirmed_balance);
      const unconfirmed = BigInt(Math.round(unconfirmedLTC * 1e8));
      
      console.log(`✅ [SoChain-LTC] Balance: ${balance} satoshis (${balanceLTC} LTC)`);
      
      return {
        balance,
        balanceLTC,
        unconfirmed
      };
    } catch (error) {
      console.error('[SoChain-LTC] Balance fetch error:', error);
      throw new Error(`Failed to fetch balance: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get address information
   */
  async getAddressInfo(address: string): Promise<SoChainAddressInfo> {
    try {
      console.log(`🔍 [SoChain-LTC] Fetching address info for: ${address}`);
      
      const url = `${this.baseUrl}/address/${this.network}/${address}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`SoChain API error: ${response.status} ${response.statusText}`);
      }
      
      const result = await response.json();
      
      if (result.status !== 'success') {
        throw new Error(`SoChain API error: ${result.data}`);
      }
      
      console.log(`✅ [SoChain-LTC] Address info retrieved`);
      
      return result.data;
    } catch (error) {
      console.error('[SoChain-LTC] Address info fetch error:', error);
      throw new Error(`Failed to fetch address info: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Fetch UTXOs for an address
   */
  async fetchUTXOs(address: string): Promise<Array<{
    txid: string;
    vout: number;
    value: bigint;
    confirmations: number;
  }>> {
    try {
      console.log(`🔍 [SoChain-LTC] Fetching UTXOs for: ${address}`);
      
      const url = `${this.baseUrl}/get_tx_unspent/${this.network}/${address}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`SoChain API error: ${response.status} ${response.statusText}`);
      }
      
      const result = await response.json();
      
      if (result.status !== 'success') {
        throw new Error(`SoChain API error: ${result.data}`);
      }
      
      const utxos = result.data.txs.map((utxo: SoChainUTXO) => ({
        txid: utxo.txid,
        vout: utxo.output_no,
        value: BigInt(Math.round(parseFloat(utxo.value) * 1e8)),
        confirmations: utxo.confirmations
      }));
      
      console.log(`✅ [SoChain-LTC] Found ${utxos.length} UTXOs`);
      
      return utxos;
    } catch (error) {
      console.error('[SoChain-LTC] UTXO fetch error:', error);
      throw new Error(`Failed to fetch UTXOs: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get transaction details
   */
  async getTransaction(txHash: string): Promise<SoChainTransaction> {
    try {
      console.log(`🔍 [SoChain-LTC] Fetching transaction: ${txHash}`);
      
      const url = `${this.baseUrl}/get_tx/${this.network}/${txHash}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`SoChain API error: ${response.status} ${response.statusText}`);
      }
      
      const result = await response.json();
      
      if (result.status !== 'success') {
        throw new Error(`SoChain API error: ${result.data}`);
      }
      
      console.log(`✅ [SoChain-LTC] Transaction retrieved`);
      
      return result.data;
    } catch (error) {
      console.error('[SoChain-LTC] Transaction fetch error:', error);
      throw new Error(`Failed to fetch transaction: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Broadcast transaction
   */
  async broadcastTransaction(signedTx: string): Promise<{ txHash: string }> {
    try {
      console.log('📡 [SoChain-LTC] Broadcasting transaction...');
      
      const url = `${this.baseUrl}/send_tx/${this.network}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ tx_hex: signedTx })
      });
      
      if (!response.ok) {
        throw new Error(`SoChain API error: ${response.status} ${response.statusText}`);
      }
      
      const result = await response.json();
      
      if (result.status !== 'success') {
        throw new Error(`SoChain API error: ${result.data}`);
      }
      
      console.log(`✅ [SoChain-LTC] Transaction broadcast: ${result.data.txid}`);
      
      return { txHash: result.data.txid };
    } catch (error) {
      console.error('[SoChain-LTC] Broadcast error:', error);
      throw new Error(`Failed to broadcast transaction: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get network info
   */
  async getNetworkInfo(): Promise<{
    network: string;
    blockhash_last: string;
    block_no_last: number;
    price: string;
    price_base: string;
    hashrate: string;
  }> {
    try {
      console.log('🔍 [SoChain-LTC] Fetching network info...');
      
      const url = `${this.baseUrl}/get_info/${this.network}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`SoChain API error: ${response.status} ${response.statusText}`);
      }
      
      const result = await response.json();
      
      if (result.status !== 'success') {
        throw new Error(`SoChain API error: ${result.data}`);
      }
      
      console.log(`✅ [SoChain-LTC] Network info retrieved`);
      
      return result.data;
    } catch (error) {
      console.error('[SoChain-LTC] Network info fetch error:', error);
      throw new Error(`Failed to fetch network info: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Validate address
   */
  async isAddressValid(address: string): Promise<boolean> {
    try {
      console.log(`🔍 [SoChain-LTC] Validating address: ${address}`);
      
      const url = `${this.baseUrl}/is_address_valid/${this.network}/${address}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`SoChain API error: ${response.status} ${response.statusText}`);
      }
      
      const result = await response.json();
      
      if (result.status !== 'success') {
        throw new Error(`SoChain API error: ${result.data}`);
      }
      
      const isValid = result.data.is_valid;
      
      console.log(`✅ [SoChain-LTC] Address ${isValid ? 'valid' : 'invalid'}`);
      
      return isValid;
    } catch (error) {
      console.error('[SoChain-LTC] Address validation error:', error);
      throw new Error(`Failed to validate address: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get current LTC price from network info
   */
  async getLTCPrice(): Promise<{
    priceUSD: number;
    priceBase: string;
    blockHeight: number;
    hashrate: string;
  }> {
    try {
      console.log('🔍 [SoChain-LTC] Fetching LTC price...');
      
      const networkInfo = await this.getNetworkInfo();
      const priceUSD = parseFloat(networkInfo.price);
      
      console.log(`✅ [SoChain-LTC] LTC Price: $${priceUSD.toFixed(2)} USD`);
      
      return {
        priceUSD,
        priceBase: networkInfo.price_base,
        blockHeight: networkInfo.block_no_last,
        hashrate: networkInfo.hashrate,
      };
    } catch (error) {
      console.error('[SoChain-LTC] LTC price fetch error:', error);
      throw new Error(`Failed to fetch LTC price: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get LTC price with 24h change
   * Note: SoChain doesn't provide 24h change directly, so we return 0
   * For accurate 24h change, use CoinGecko as fallback
   */
  async getLTCPriceWithChange(): Promise<{
    price: number;
    priceChange: number;
    blockHeight: number;
  }> {
    try {
      const priceData = await this.getLTCPrice();
      
      return {
        price: priceData.priceUSD,
        priceChange: 0, // SoChain API doesn't provide 24h change
        blockHeight: priceData.blockHeight,
      };
    } catch (error) {
      console.error('[SoChain-LTC] LTC price with change fetch error:', error);
      throw new Error(`Failed to fetch LTC price with change: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

// Singleton instance
export const sochainLTC = new SoChainAPI();

