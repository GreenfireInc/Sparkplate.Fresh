/**
 * Freighter Wallet Integration
 * 
 * Handles Freighter browser extension wallet connection for Stellar.
 * Freighter is a popular Stellar wallet.
 */

// Freighter API types
interface FreighterWindow extends Window {
  freighterApi?: {
    isConnected(): Promise<boolean>;
    connect(): Promise<{ publicKey: string }>;
    disconnect(): Promise<void>;
    getPublicKey(): Promise<string>;
    signTransaction(xdr: string, network?: string): Promise<string>;
    signMessage(message: string): Promise<string>;
    setAllowed(allow: boolean): Promise<void>;
  };
}

declare const window: FreighterWindow;

class FreighterConnect {
  private dispatch: any = null;
  private connectedAddress: string | null = null;
  private network: string | null = null;

  constructor() {
    this.messageType = {
      CONNECT: 'connect',
      DISCONNECT: 'disconnect',
      ACCOUNTS_CHANGED: 'accountsChanged',
      NETWORK_CHANGED: 'networkChanged'
    };
  }

  /**
   * Initialize Freighter client
   */
  async initClient(modal: any, gtag: any, dispatch: any) {
    if (!this.dispatch) this.dispatch = dispatch;
    
    // Check if Freighter is available
    if (!this.isAvailable()) {
      throw new Error('Freighter extension not installed');
    }

    return window.freighterApi;
  }

  /**
   * Check if Freighter is available
   */
  isAvailable(): boolean {
    return typeof window !== 'undefined' && !!window.freighterApi;
  }

  /**
   * Connect to Freighter wallet
   */
  async connect() {
    if (!this.isAvailable()) {
      throw new Error('Freighter extension not installed');
    }

    try {
      // Request connection
      const result = await window.freighterApi!.connect();
      
      if (result && result.publicKey) {
        this.connectedAddress = result.publicKey;
        this.network = 'mainnet'; // Default

        return {
          address: this.connectedAddress,
          publicKey: result.publicKey
        };
      }

      return null;
    } catch (error: any) {
      if (error.code === 4001 || error.message?.includes('User denied')) {
        // User rejected
        return null;
      }
      throw error;
    }
  }

  /**
   * Disconnect from Freighter wallet
   */
  async disconnect() {
    if (this.isAvailable() && this.connectedAddress) {
      try {
        await window.freighterApi!.disconnect();
      } catch (error) {
        console.error('Error disconnecting Freighter:', error);
      }
    }
    this.connectedAddress = null;
    this.network = null;
  }

  /**
   * Get connected address
   */
  async getAddress(): Promise<string | null> {
    if (!this.isAvailable()) {
      return null;
    }

    try {
      const isConnected = await window.freighterApi!.isConnected();
      if (isConnected) {
        const publicKey = await window.freighterApi!.getPublicKey();
        this.connectedAddress = publicKey;
        return this.connectedAddress;
      }
      return null;
    } catch (error) {
      return null;
    }
  }

  /**
   * Sign a transaction (XDR)
   */
  async signTransaction(xdr: string, network: string = 'mainnet') {
    if (!this.isAvailable()) {
      throw new Error('Freighter extension not installed');
    }

    if (!this.connectedAddress) {
      throw new Error('Wallet not connected');
    }

    try {
      const signedXdr = await window.freighterApi!.signTransaction(xdr, network);
      return signedXdr;
    } catch (error: any) {
      if (error.code === 4001 || error.message?.includes('User denied')) {
        // User rejected
        return null;
      }
      throw error;
    }
  }

  /**
   * Sign a message
   */
  async signMessage(message: string) {
    if (!this.isAvailable()) {
      throw new Error('Freighter extension not installed');
    }

    if (!this.connectedAddress) {
      throw new Error('Wallet not connected');
    }

    try {
      const signature = await window.freighterApi!.signMessage(message);
      return signature;
    } catch (error: any) {
      if (error.code === 4001 || error.message?.includes('User denied')) {
        // User rejected
        return null;
      }
      throw error;
    }
  }

  /**
   * Check if connected
   */
  async isConnected(): Promise<boolean> {
    if (!this.isAvailable()) {
      return false;
    }

    try {
      return await window.freighterApi!.isConnected();
    } catch (error) {
      return false;
    }
  }
}

export default new FreighterConnect();
