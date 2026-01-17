// Blast API Implementation for Bitcoin
// API Docs: https://blastapi.io/
// Free tier: 12M requests/month (requires API key)
// High-performance multi-chain infrastructure

export interface BlastAPIConfig {
  apiKey?: string; // Optional for public endpoints, required for private
  projectId?: string; // Optional project ID for private endpoints
}

export interface BlastRPCRequest {
  jsonrpc: '2.0';
  id: number;
  method: string;
  params: unknown[];
}

export interface BlastRPCResponse<T = unknown> {
  jsonrpc: '2.0';
  id: number;
  result: T;
  error?: {
    code: number;
    message: string;
  };
}

export interface BlastBlockInfo {
  hash: string;
  confirmations: number;
  strippedsize: number;
  size: number;
  weight: number;
  height: number;
  version: number;
  versionHex: string;
  merkleroot: string;
  tx: string[];
  time: number;
  mediantime: number;
  nonce: number;
  bits: string;
  difficulty: number;
  chainwork: string;
  nTx: number;
  previousblockhash?: string;
  nextblockhash?: string;
}

export interface BlastTransaction {
  txid: string;
  hash: string;
  version: number;
  size: number;
  vsize: number;
  weight: number;
  locktime: number;
  vin: Array<{
    txid: string;
    vout: number;
    scriptSig: {
      asm: string;
      hex: string;
    };
    sequence: number;
    txinwitness?: string[];
  }>;
  vout: Array<{
    value: number;
    n: number;
    scriptPubKey: {
      asm: string;
      hex: string;
      reqSigs?: number;
      type: string;
      addresses?: string[];
    };
  }>;
  blockhash?: string;
  confirmations?: number;
  time?: number;
  blocktime?: number;
  hex?: string;
}

export class BlastAPI {
  private baseUrl: string;
  private apiKey?: string;
  private network: 'mainnet' | 'testnet';
  private rpcId = 1;

  constructor(config?: BlastAPIConfig, network: 'mainnet' | 'testnet' = 'mainnet') {
    this.apiKey = config?.apiKey;
    this.network = network;
    
    if (config?.projectId && this.apiKey) {
      // Private endpoint with project ID
      this.baseUrl = `https://btc-${network}.blastapi.io/${config.projectId}`;
    } else {
      // Public endpoint
      this.baseUrl = `https://btc-${network}.public.blastapi.io`;
    }
  }

  /**
   * Make an RPC call
   */
  private async rpcCall<T = unknown>(method: string, params: unknown[] = []): Promise<T> {
    try {
      const request: BlastRPCRequest = {
        jsonrpc: '2.0',
        id: this.rpcId++,
        method,
        params
      };

      const headers: HeadersInit = {
        'Content-Type': 'application/json'
      };

      if (this.apiKey) {
        headers['Authorization'] = `Bearer ${this.apiKey}`;
      }

      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify(request)
      });

      if (!response.ok) {
        throw new Error(`Blast API error: ${response.status} ${response.statusText}`);
      }

      const result: BlastRPCResponse<T> = await response.json();

      if (result.error) {
        throw new Error(`RPC error: ${result.error.message} (code: ${result.error.code})`);
      }

      return result.result;
    } catch (error) {
      console.error(`[Blast] RPC call error (${method}):`, error);
      throw new Error(`Failed to execute RPC call: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get blockchain info
   */
  async getBlockchainInfo(): Promise<{
    chain: string;
    blocks: number;
    headers: number;
    bestblockhash: string;
    difficulty: number;
    mediantime: number;
    verificationprogress: number;
    chainwork: string;
    size_on_disk: number;
    pruned: boolean;
  }> {
    console.log('🔍 [Blast] Fetching blockchain info...');
    const info = await this.rpcCall<{
      chain: string;
      blocks: number;
      headers: number;
      bestblockhash: string;
      difficulty: number;
      mediantime: number;
      verificationprogress: number;
      chainwork: string;
      size_on_disk: number;
      pruned: boolean;
    }>('getblockchaininfo');
    console.log(`✅ [Blast] Blockchain info retrieved, height: ${info.blocks}`);
    return info;
  }

  /**
   * Get block by hash
   */
  async getBlockByHash(blockHash: string, verbosity: 0 | 1 | 2 = 2): Promise<BlastBlockInfo | string> {
    console.log(`🔍 [Blast] Fetching block by hash: ${blockHash}`);
    const block = await this.rpcCall<BlastBlockInfo | string>('getblock', [blockHash, verbosity]);
    console.log(`✅ [Blast] Block retrieved`);
    return block;
  }

  /**
   * Get block hash by height
   */
  async getBlockHash(height: number): Promise<string> {
    console.log(`🔍 [Blast] Fetching block hash at height: ${height}`);
    const hash = await this.rpcCall<string>('getblockhash', [height]);
    console.log(`✅ [Blast] Block hash: ${hash}`);
    return hash;
  }

  /**
   * Get block by height
   */
  async getBlockByHeight(height: number, verbosity: 0 | 1 | 2 = 2): Promise<BlastBlockInfo | string> {
    const hash = await this.getBlockHash(height);
    return this.getBlockByHash(hash, verbosity);
  }

  /**
   * Get transaction
   */
  async getTransaction(txHash: string, verbose: boolean = true): Promise<BlastTransaction | string> {
    console.log(`🔍 [Blast] Fetching transaction: ${txHash}`);
    const tx = await this.rpcCall<BlastTransaction | string>('getrawtransaction', [txHash, verbose]);
    console.log(`✅ [Blast] Transaction retrieved`);
    return tx;
  }

  /**
   * Get raw transaction (hex)
   */
  async getRawTransaction(txHash: string): Promise<string> {
    console.log(`🔍 [Blast] Fetching raw transaction: ${txHash}`);
    const hex = await this.rpcCall<string>('getrawtransaction', [txHash, false]);
    console.log(`✅ [Blast] Raw transaction retrieved`);
    return hex;
  }

  /**
   * Broadcast transaction
   */
  async broadcastTransaction(txHex: string): Promise<string> {
    console.log('📡 [Blast] Broadcasting transaction...');
    const txid = await this.rpcCall<string>('sendrawtransaction', [txHex]);
    console.log(`✅ [Blast] Transaction broadcast successful: ${txid}`);
    return txid;
  }

  /**
   * Decode raw transaction
   */
  async decodeRawTransaction(txHex: string): Promise<BlastTransaction> {
    console.log('🔍 [Blast] Decoding transaction...');
    const decoded = await this.rpcCall<BlastTransaction>('decoderawtransaction', [txHex]);
    console.log(`✅ [Blast] Transaction decoded`);
    return decoded;
  }

  /**
   * Get transaction output (UTXO info)
   */
  async getTxOut(txid: string, vout: number, includeMempool: boolean = true): Promise<{
    bestblock: string;
    confirmations: number;
    value: number;
    scriptPubKey: {
      asm: string;
      hex: string;
      reqSigs?: number;
      type: string;
      addresses?: string[];
    };
    coinbase: boolean;
  } | null> {
    console.log(`🔍 [Blast] Fetching UTXO info for ${txid}:${vout}`);
    const utxo = await this.rpcCall<{
      bestblock: string;
      confirmations: number;
      value: number;
      scriptPubKey: {
        asm: string;
        hex: string;
        reqSigs?: number;
        type: string;
        addresses?: string[];
      };
      coinbase: boolean;
    } | null>('gettxout', [txid, vout, includeMempool]);
    
    if (utxo) {
      console.log(`✅ [Blast] UTXO info retrieved`);
    } else {
      console.log(`ℹ️ [Blast] UTXO not found (spent or invalid)`);
    }
    
    return utxo;
  }

  /**
   * Estimate smart fee
   */
  async estimateSmartFee(confTarget: number = 6): Promise<{
    feerate?: number; // BTC per KB
    errors?: string[];
    blocks: number;
  }> {
    console.log(`🔍 [Blast] Estimating fee for ${confTarget} blocks...`);
    const fee = await this.rpcCall<{
      feerate?: number;
      errors?: string[];
      blocks: number;
    }>('estimatesmartfee', [confTarget]);
    
    if (fee.feerate) {
      console.log(`✅ [Blast] Fee estimate: ${fee.feerate} BTC/KB`);
    } else {
      console.log(`⚠️ [Blast] Fee estimation unavailable:`, fee.errors);
    }
    
    return fee;
  }

  /**
   * Get mempool info
   */
  async getMempoolInfo(): Promise<{
    loaded: boolean;
    size: number;
    bytes: number;
    usage: number;
    maxmempool: number;
    mempoolminfee: number;
    minrelaytxfee: number;
  }> {
    console.log('🔍 [Blast] Fetching mempool info...');
    const info = await this.rpcCall<{
      loaded: boolean;
      size: number;
      bytes: number;
      usage: number;
      maxmempool: number;
      mempoolminfee: number;
      minrelaytxfee: number;
    }>('getmempoolinfo');
    console.log(`✅ [Blast] Mempool size: ${info.size} transactions`);
    return info;
  }

  /**
   * Test mempool accept (validate transaction without broadcasting)
   */
  async testMempoolAccept(txHex: string): Promise<Array<{
    txid: string;
    allowed: boolean;
    'reject-reason'?: string;
  }>> {
    console.log('🔍 [Blast] Testing transaction validity...');
    const result = await this.rpcCall<Array<{
      txid: string;
      allowed: boolean;
      'reject-reason'?: string;
    }>>('testmempoolaccept', [[txHex]]);
    
    if (result[0]?.allowed) {
      console.log(`✅ [Blast] Transaction is valid`);
    } else {
      console.log(`❌ [Blast] Transaction rejected:`, result[0]?.['reject-reason']);
    }
    
    return result;
  }
}

// Singleton instances for convenience
export const blastMainnet = new BlastAPI(undefined, 'mainnet');
export const blastTestnet = new BlastAPI(undefined, 'testnet');

