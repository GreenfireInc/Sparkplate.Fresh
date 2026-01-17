/**
 * Terra Keplr Integration
 * 
 * Handles Keplr browser extension wallet connection for Terra.
 * Keplr supports Terra as a Cosmos SDK chain.
 */

// Keplr API types
interface KeplrWindow extends Window {
  keplr?: {
    request(args: { method: string; params?: any[] }): Promise<any>;
    enable(chainId: string): Promise<void>;
    getKey(chainId: string): Promise<{
      name: string;
      algo: string;
      pubKey: Uint8Array;
      address: Uint8Array;
      bech32Address: string;
    }>;
    signAmino(chainId: string, signer: string, signDoc: any): Promise<any>;
    signDirect(chainId: string, signer: string, signDoc: any): Promise<any>;
    sendTx(chainId: string, tx: Uint8Array, mode: 'sync' | 'async' | 'block'): Promise<Uint8Array>;
  };
}

declare const window: KeplrWindow;

// Terra Network configurations for Keplr
const terraNetworks = {
  mainnet: {
    chainId: 'phoenix-1',
    chainName: 'Terra',
    rpc: 'https://terra-rpc.publicnode.com',
    rest: 'https://terra-lcd.publicnode.com',
    bip44: {
      coinType: 330
    },
    bech32Config: {
      bech32PrefixAccAddr: 'terra',
      bech32PrefixAccPub: 'terrapub',
      bech32PrefixValAddr: 'terravaloper',
      bech32PrefixValPub: 'terravaloperpub',
      bech32PrefixConsAddr: 'terravalcons',
      bech32PrefixConsPub: 'terravalconspub'
    },
    currencies: [{
      coinDenom: 'LUNA',
      coinMinimalDenom: 'uluna',
      coinDecimals: 6
    }],
    feeCurrencies: [{
      coinDenom: 'LUNA',
      coinMinimalDenom: 'uluna',
      coinDecimals: 6
    }],
    stakeCurrency: {
      coinDenom: 'LUNA',
      coinMinimalDenom: 'uluna',
      coinDecimals: 6
    }
  },
  testnet: {
    chainId: 'pisco-1',
    chainName: 'Terra Testnet',
    rpc: 'https://terra-testnet-rpc.publicnode.com',
    rest: 'https://terra-testnet-lcd.publicnode.com',
    bip44: {
      coinType: 330
    },
    bech32Config: {
      bech32PrefixAccAddr: 'terra',
      bech32PrefixAccPub: 'terrapub',
      bech32PrefixValAddr: 'terravaloper',
      bech32PrefixValPub: 'terravaloperpub',
      bech32PrefixConsAddr: 'terravalcons',
      bech32PrefixConsPub: 'terravalconspub'
    },
    currencies: [{
      coinDenom: 'LUNA',
      coinMinimalDenom: 'uluna',
      coinDecimals: 6
    }],
    feeCurrencies: [{
      coinDenom: 'LUNA',
      coinMinimalDenom: 'uluna',
      coinDecimals: 6
    }],
    stakeCurrency: {
      coinDenom: 'LUNA',
      coinMinimalDenom: 'uluna',
      coinDecimals: 6
    }
  }
};

class KeplrConnect {
  private dispatch: any = null;
  private connectedAddress: string | null = null;
  private chainId: string | null = null;

  constructor() {
    this.messageType = {
      CONNECT: 'connect',
      DISCONNECT: 'disconnect',
      ACCOUNTS_CHANGED: 'accountsChanged',
      CHAIN_CHANGED: 'chainChanged'
    };
  }

  /**
   * Initialize Keplr client
   */
  async initClient(modal: any, gtag: any, dispatch: any) {
    if (!this.dispatch) this.dispatch = dispatch;
    
    // Check if Keplr is available
    if (!this.isAvailable()) {
      throw new Error('Keplr extension not installed');
    }

    return window.keplr;
  }

  /**
   * Check if Keplr is available
   */
  isAvailable(): boolean {
    return typeof window !== 'undefined' && !!window.keplr;
  }

  /**
   * Enable Keplr for Terra network
   */
  async enable(network: 'mainnet' | 'testnet' = 'mainnet') {
    if (!this.isAvailable()) {
      throw new Error('Keplr extension not installed');
    }

    const networkConfig = terraNetworks[network];
    
    try {
      // Suggest chain to Keplr if not already added
      await window.keplr!.experimentalSuggestChain(networkConfig);
    } catch (error) {
      // Chain might already be added, continue
    }

    // Enable Keplr for this chain
    await window.keplr!.enable(networkConfig.chainId);
    this.chainId = networkConfig.chainId;

    // Get account info
    const key = await window.keplr!.getKey(networkConfig.chainId);
    this.connectedAddress = key.bech32Address;

    return {
      address: this.connectedAddress,
      chainId: this.chainId
    };
  }

  /**
   * Connect to Keplr wallet
   */
  async connect(network: 'mainnet' | 'testnet' = 'mainnet') {
    return await this.enable(network);
  }

  /**
   * Disconnect from Keplr wallet
   */
  async disconnect() {
    this.connectedAddress = null;
    this.chainId = null;
  }

  /**
   * Get connected address
   */
  async getAddress(network: 'mainnet' | 'testnet' = 'mainnet'): Promise<string | null> {
    if (!this.isAvailable()) {
      return null;
    }

    try {
      const networkConfig = terraNetworks[network];
      const key = await window.keplr!.getKey(networkConfig.chainId);
      this.connectedAddress = key.bech32Address;
      return this.connectedAddress;
    } catch (error) {
      return null;
    }
  }

  /**
   * Get current chain ID
   */
  async getChainId(): Promise<string | null> {
    return this.chainId;
  }

  /**
   * Sign transaction (Amino)
   */
  async signAmino(chainId: string, signer: string, signDoc: any) {
    if (!this.isAvailable()) {
      throw new Error('Keplr extension not installed');
    }

    try {
      const result = await window.keplr!.signAmino(chainId, signer, signDoc);
      return result;
    } catch (error: any) {
      if (error.code === 4001) {
        // User rejected
        return null;
      }
      throw error;
    }
  }

  /**
   * Sign transaction (Direct)
   */
  async signDirect(chainId: string, signer: string, signDoc: any) {
    if (!this.isAvailable()) {
      throw new Error('Keplr extension not installed');
    }

    try {
      const result = await window.keplr!.signDirect(chainId, signer, signDoc);
      return result;
    } catch (error: any) {
      if (error.code === 4001) {
        // User rejected
        return null;
      }
      throw error;
    }
  }

  /**
   * Send transaction
   */
  async sendTx(chainId: string, tx: Uint8Array, mode: 'sync' | 'async' | 'block' = 'sync') {
    if (!this.isAvailable()) {
      throw new Error('Keplr extension not installed');
    }

    try {
      const result = await window.keplr!.sendTx(chainId, tx, mode);
      return result;
    } catch (error: any) {
      if (error.code === 4001) {
        // User rejected
        return null;
      }
      throw error;
    }
  }

  /**
   * Check if connected
   */
  isConnected(): boolean {
    return this.connectedAddress !== null;
  }

  /**
   * Check if on Terra network
   */
  async isOnTerra(): Promise<boolean> {
    const chainId = await this.getChainId();
    if (!chainId) return false;
    
    return chainId === 'phoenix-1' || chainId === 'pisco-1';
  }
}

export default new KeplrConnect();

