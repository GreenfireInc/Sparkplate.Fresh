/**
 * Cosmos Keplr Wallet Integration
 * 
 * Handles Keplr browser extension wallet connection.
 * Keplr is the primary wallet extension for Cosmos ecosystem.
 */

// Keplr API types
interface KeplrWindow extends Window {
  keplr?: {
    enable(chainId: string): Promise<void>;
    getKey(chainId: string): Promise<{
      name: string;
      algo: string;
      pubKey: Uint8Array;
      address: string;
      bech32Address: string;
    }>;
    signAmino(chainId: string, signer: string, signDoc: any): Promise<any>;
    signDirect(chainId: string, signer: string, signDoc: any): Promise<any>;
    sendTx(chainId: string, tx: Uint8Array, mode: 'sync' | 'async' | 'block'): Promise<Uint8Array>;
    experimentalSuggestChain(chainInfo: any): Promise<void>;
    getOfflineSigner(chainId: string): any;
    getOfflineSignerOnlyAmino(chainId: string): any;
    getOfflineSignerAuto(chainId: string): any;
  };
}

declare const window: KeplrWindow;

// App metadata for Keplr
const appMetadata = {
  name: 'LoginStandard',
  logo: 'https://loginstandard.com/icon.png'
};

class KeplrConnect {
  private dispatch: any = null;
  private connectedChains: Set<string> = new Set();
  private accounts: Map<string, any> = new Map();

  constructor() {
    this.messageType = {
      CONNECT: 'connect',
      DISCONNECT: 'disconnect',
      SIGN_TRANSACTION: 'sign_transaction',
      SIGN_MESSAGE: 'sign_message'
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

    // Set up event handlers
    this.setHooks(modal, gtag, dispatch);

    return window.keplr;
  }

  /**
   * Check if Keplr is available
   */
  isAvailable(): boolean {
    return typeof window !== 'undefined' && !!window.keplr;
  }

  /**
   * Set up event handlers for Keplr
   */
  setHooks(modal: any, gtag: any, dispatch: any) {
    // Keplr doesn't have event listeners like WalletConnect
    // Events are handled through the API methods directly
  }

  /**
   * Connect to Keplr wallet for a specific chain
   * @param chainId - Cosmos chain ID (e.g., 'cosmoshub-4', 'osmosis-1')
   */
  async connect(chainId: string) {
    if (!this.isAvailable()) {
      throw new Error('Keplr extension not installed');
    }

    try {
      // Enable Keplr for the chain
      await window.keplr!.enable(chainId);
      
      // Get account information
      const key = await window.keplr!.getKey(chainId);
      
      this.connectedChains.add(chainId);
      this.accounts.set(chainId, key);
      
      return {
        chainId,
        address: key.bech32Address,
        pubKey: key.pubKey,
        name: key.name,
        algo: key.algo
      };
    } catch (error: any) {
      if (error.message?.includes('User rejected')) {
        return null;
      }
      throw error;
    }
  }

  /**
   * Disconnect from Keplr wallet for a specific chain
   */
  async disconnect(chainId: string) {
    // Keplr doesn't have a disconnect method
    // Just remove from our tracking
    this.connectedChains.delete(chainId);
    this.accounts.delete(chainId);
  }

  /**
   * Get account information for a chain
   */
  async getAccount(chainId: string) {
    if (!this.isAvailable()) {
      return null;
    }

    if (!this.connectedChains.has(chainId)) {
      return null;
    }

    try {
      const key = await window.keplr!.getKey(chainId);
      return {
        chainId,
        address: key.bech32Address,
        pubKey: key.pubKey,
        name: key.name,
        algo: key.algo
      };
    } catch (error) {
      return null;
    }
  }

  /**
   * Sign a transaction using Amino signing
   */
  async signAmino(chainId: string, signer: string, signDoc: any) {
    if (!this.isAvailable()) {
      throw new Error('Keplr extension not installed');
    }

    if (!this.connectedChains.has(chainId)) {
      throw new Error(`Chain ${chainId} not connected`);
    }

    try {
      const signed = await window.keplr!.signAmino(chainId, signer, signDoc);
      return signed;
    } catch (error: any) {
      if (error.message?.includes('User rejected')) {
        return null;
      }
      throw error;
    }
  }

  /**
   * Sign a transaction using Direct signing
   */
  async signDirect(chainId: string, signer: string, signDoc: any) {
    if (!this.isAvailable()) {
      throw new Error('Keplr extension not installed');
    }

    if (!this.connectedChains.has(chainId)) {
      throw new Error(`Chain ${chainId} not connected`);
    }

    try {
      const signed = await window.keplr!.signDirect(chainId, signer, signDoc);
      return signed;
    } catch (error: any) {
      if (error.message?.includes('User rejected')) {
        return null;
      }
      throw error;
    }
  }

  /**
   * Send a transaction
   */
  async sendTransaction(chainId: string, tx: Uint8Array, mode: 'sync' | 'async' | 'block' = 'sync') {
    if (!this.isAvailable()) {
      throw new Error('Keplr extension not installed');
    }

    if (!this.connectedChains.has(chainId)) {
      throw new Error(`Chain ${chainId} not connected`);
    }

    try {
      const result = await window.keplr!.sendTx(chainId, tx, mode);
      return result;
    } catch (error: any) {
      if (error.message?.includes('User rejected')) {
        return null;
      }
      throw error;
    }
  }

  /**
   * Suggest a chain to Keplr (for custom chains)
   */
  async suggestChain(chainInfo: any) {
    if (!this.isAvailable()) {
      throw new Error('Keplr extension not installed');
    }

    try {
      await window.keplr!.experimentalSuggestChain(chainInfo);
    } catch (error) {
      console.error('Error suggesting chain:', error);
      throw error;
    }
  }

  /**
   * Get offline signer for a chain
   */
  getOfflineSigner(chainId: string) {
    if (!this.isAvailable()) {
      throw new Error('Keplr extension not installed');
    }

    return window.keplr!.getOfflineSigner(chainId);
  }

  /**
   * Get offline signer (Amino only) for a chain
   */
  getOfflineSignerOnlyAmino(chainId: string) {
    if (!this.isAvailable()) {
      throw new Error('Keplr extension not installed');
    }

    return window.keplr!.getOfflineSignerOnlyAmino(chainId);
  }

  /**
   * Get offline signer (auto) for a chain
   */
  getOfflineSignerAuto(chainId: string) {
    if (!this.isAvailable()) {
      throw new Error('Keplr extension not installed');
    }

    return window.keplr!.getOfflineSignerAuto(chainId);
  }

  /**
   * Check if connected to a chain
   */
  isConnected(chainId: string): boolean {
    return this.connectedChains.has(chainId);
  }

  /**
   * Get all connected chains
   */
  getConnectedChains(): string[] {
    return Array.from(this.connectedChains);
  }
}

export default new KeplrConnect();

