/**
 * Kukai Wallet Integration
 * 
 * Handles Kukai wallet connection for Tezos.
 * Kukai is a popular web-based Tezos wallet.
 */

// Kukai Wallet API types
interface KukaiWindow extends Window {
  kukai?: {
    request(payload: any): Promise<any>;
    connect(): Promise<{ address: string }>;
    disconnect(): Promise<void>;
    on(event: string, handler: (...args: any[]) => void): void;
    removeListener(event: string, handler: (...args: any[]) => void): void;
  };
}

declare const window: KukaiWindow;

class KukaiConnect {
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
   * Initialize Kukai client
   */
  async initClient(modal: any, gtag: any, dispatch: any) {
    if (!this.dispatch) this.dispatch = dispatch;
    
    // Check if Kukai is available
    if (!this.isAvailable()) {
      throw new Error('Kukai extension not installed');
    }

    // Set up event handlers
    this.setHooks(modal, gtag, dispatch);

    return window.kukai;
  }

  /**
   * Check if Kukai is available
   */
  isAvailable(): boolean {
    return typeof window !== 'undefined' && !!window.kukai;
  }

  /**
   * Set up event handlers for Kukai
   */
  setHooks(modal: any, gtag: any, dispatch: any) {
    if (!window.kukai) return;

    // Handle account changes
    window.kukai.on('accountsChanged', (accounts: string[]) => {
      if (accounts && accounts.length > 0) {
        this.connectedAddress = accounts[0];
      } else {
        this.connectedAddress = null;
      }
      dispatch('kukaiAccountsChanged', { accounts });
    });

    // Handle network changes
    window.kukai.on('networkChanged', (network: string) => {
      this.network = network;
      dispatch('kukaiNetworkChanged', { network });
    });
  }

  /**
   * Connect to Kukai wallet
   */
  async connect() {
    if (!this.isAvailable()) {
      throw new Error('Kukai extension not installed');
    }

    try {
      // Request connection
      const result = await window.kukai!.connect();
      
      if (result && result.address) {
        this.connectedAddress = result.address;
        this.network = 'mainnet'; // Default

        return {
          address: this.connectedAddress,
          account: this.connectedAddress
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
   * Disconnect from Kukai wallet
   */
  async disconnect() {
    if (this.isAvailable() && window.kukai!.disconnect) {
      await window.kukai!.disconnect();
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
      if (this.connectedAddress) {
        return this.connectedAddress;
      }
      return null;
    } catch (error) {
      return null;
    }
  }

  /**
   * Sign and submit a transaction
   */
  async signAndSubmit(transaction: any) {
    if (!this.isAvailable()) {
      throw new Error('Kukai extension not installed');
    }

    if (!this.connectedAddress) {
      throw new Error('Wallet not connected');
    }

    try {
      const result = await window.kukai!.request({
        method: 'tezos_sendTransaction',
        params: [transaction]
      });
      return result;
    } catch (error: any) {
      if (error.code === 4001 || error.message?.includes('User denied')) {
        // User rejected
        return null;
      }
      throw error;
    }
  }

  /**
   * Sign a transaction
   */
  async signTransaction(transaction: any) {
    if (!this.isAvailable()) {
      throw new Error('Kukai extension not installed');
    }

    if (!this.connectedAddress) {
      throw new Error('Wallet not connected');
    }

    try {
      const result = await window.kukai!.request({
        method: 'tezos_signTransaction',
        params: [transaction]
      });
      return result;
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
      throw new Error('Kukai extension not installed');
    }

    if (!this.connectedAddress) {
      throw new Error('Wallet not connected');
    }

    try {
      const result = await window.kukai!.request({
        method: 'tezos_signMessage',
        params: [message]
      });
      return result;
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
      const address = await this.getAddress();
      return address !== null;
    } catch (error) {
      return false;
    }
  }
}

export default new KukaiConnect();
