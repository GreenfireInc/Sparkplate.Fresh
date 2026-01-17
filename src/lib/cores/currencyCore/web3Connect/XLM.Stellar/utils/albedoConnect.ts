/**
 * Albedo Wallet Integration
 * 
 * Handles Albedo web wallet connection for Stellar.
 * Albedo is a web-based Stellar wallet.
 */

// Albedo API types
interface AlbedoWindow extends Window {
  albedo?: {
    connect(options?: { pubkey?: string }): Promise<{ pubkey: string }>;
    tx(options: { xdr: string; network?: string }): Promise<{ signed_envelope_xdr: string }>;
    signMessage(options: { message: string; pubkey?: string }): Promise<{ signature: string; pubkey: string }>;
  };
}

declare const window: AlbedoWindow;

class AlbedoConnect {
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
   * Initialize Albedo client
   */
  async initClient(modal: any, gtag: any, dispatch: any) {
    if (!this.dispatch) this.dispatch = dispatch;
    
    // Check if Albedo is available
    if (!this.isAvailable()) {
      throw new Error('Albedo not available');
    }

    return window.albedo;
  }

  /**
   * Check if Albedo is available
   */
  isAvailable(): boolean {
    return typeof window !== 'undefined' && !!window.albedo;
  }

  /**
   * Connect to Albedo wallet
   */
  async connect() {
    if (!this.isAvailable()) {
      throw new Error('Albedo not available');
    }

    try {
      // Request connection
      const result = await window.albedo!.connect();
      
      if (result && result.pubkey) {
        this.connectedAddress = result.pubkey;
        this.network = 'mainnet'; // Default

        return {
          address: this.connectedAddress,
          publicKey: result.pubkey
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
   * Disconnect from Albedo wallet
   */
  async disconnect() {
    this.connectedAddress = null;
    this.network = null;
  }

  /**
   * Get connected address
   */
  async getAddress(): Promise<string | null> {
    return this.connectedAddress;
  }

  /**
   * Sign a transaction (XDR)
   */
  async signTransaction(xdr: string, network: string = 'mainnet') {
    if (!this.isAvailable()) {
      throw new Error('Albedo not available');
    }

    if (!this.connectedAddress) {
      throw new Error('Wallet not connected');
    }

    try {
      const result = await window.albedo!.tx({ xdr, network });
      return result.signed_envelope_xdr;
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
      throw new Error('Albedo not available');
    }

    if (!this.connectedAddress) {
      throw new Error('Wallet not connected');
    }

    try {
      const result = await window.albedo!.signMessage({ 
        message, 
        pubkey: this.connectedAddress 
      });
      return result.signature;
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
  isConnected(): boolean {
    return this.connectedAddress !== null;
  }
}

export default new AlbedoConnect();
