/**
 * Bitcoin Core RPC Integration
 * 
 * Handles direct Bitcoin Core JSON-RPC connection for Bitcoin operations.
 * This is for connecting to a local or remote Bitcoin Core node.
 */

export interface BitcoinCoreRPCConfig {
  url: string;
  username?: string;
  password?: string;
  network?: 'mainnet' | 'testnet' | 'regtest';
}

class BitcoinCoreRPC {
  private config: BitcoinCoreRPCConfig | null = null;
  private dispatch: any = null;

  constructor() {
    this.messageType = {
      CONNECT: 'connect',
      DISCONNECT: 'disconnect'
    };
  }

  /**
   * Initialize Bitcoin Core RPC client
   */
  async initClient(modal: any, gtag: any, dispatch: any, config: BitcoinCoreRPCConfig) {
    if (!this.dispatch) this.dispatch = dispatch;
    this.config = config;
    return this;
  }

  /**
   * Make an RPC call to Bitcoin Core
   */
  async rpcCall(method: string, params: any[] = []): Promise<any> {
    if (!this.config) {
      throw new Error('Bitcoin Core RPC not initialized');
    }

    const auth = this.config.username && this.config.password
      ? btoa(`${this.config.username}:${this.config.password}`)
      : null;

    const response = await fetch(this.config.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(auth && { 'Authorization': `Basic ${auth}` })
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: Date.now(),
        method,
        params
      })
    });

    if (!response.ok) {
      throw new Error(`RPC call failed: ${response.statusText}`);
    }

    const data = await response.json();
    
    if (data.error) {
      throw new Error(`RPC error: ${data.error.message}`);
    }

    return data.result;
  }

  /**
   * Get wallet info
   */
  async getWalletInfo() {
    return await this.rpcCall('getwalletinfo');
  }

  /**
   * Get new address
   */
  async getNewAddress(addressType: 'legacy' | 'p2sh-segwit' | 'bech32' = 'bech32') {
    return await this.rpcCall('getnewaddress', [addressType]);
  }

  /**
   * Get address balance
   */
  async getBalance(minconf: number = 0) {
    return await this.rpcCall('getbalance', [minconf]);
  }

  /**
   * List unspent outputs
   */
  async listUnspent(minconf: number = 1, maxconf: number = 9999999, addresses: string[] = []) {
    return await this.rpcCall('listunspent', [minconf, maxconf, addresses]);
  }

  /**
   * Send to address
   */
  async sendToAddress(address: string, amount: number, comment?: string) {
    return await this.rpcCall('sendtoaddress', [address, amount, comment || '']);
  }

  /**
   * Create raw transaction
   */
  async createRawTransaction(inputs: any[], outputs: any[]) {
    return await this.rpcCall('createrawtransaction', [inputs, outputs]);
  }

  /**
   * Sign raw transaction
   */
  async signRawTransactionWithWallet(hexstring: string) {
    return await this.rpcCall('signrawtransactionwithwallet', [hexstring]);
  }

  /**
   * Send raw transaction
   */
  async sendRawTransaction(hexstring: string) {
    return await this.rpcCall('sendrawtransaction', [hexstring]);
  }

  /**
   * Get transaction
   */
  async getTransaction(txid: string, includeWatchonly: boolean = false) {
    return await this.rpcCall('gettransaction', [txid, includeWatchonly]);
  }

  /**
   * Get block count
   */
  async getBlockCount() {
    return await this.rpcCall('getblockcount');
  }

  /**
   * Get block hash
   */
  async getBlockHash(height: number) {
    return await this.rpcCall('getblockhash', [height]);
  }

  /**
   * Get block
   */
  async getBlock(hash: string, verbosity: number = 1) {
    return await this.rpcCall('getblock', [hash, verbosity]);
  }

  /**
   * Estimate fee
   */
  async estimateFee(blocks: number = 6) {
    return await this.rpcCall('estimatesmartfee', [blocks]);
  }

  /**
   * Check if connected
   */
  isConnected(): boolean {
    return this.config !== null;
  }
}

export default new BitcoinCoreRPC();

