/**
 * Temple Wallet Integration
 * 
 * Handles Temple wallet connection for Tezos.
 * Temple is the most popular Tezos wallet.
 */

// Temple Wallet API types
interface TempleWindow extends Window {
  temple?: {
    request(payload: any): Promise<any>;
    connect(): Promise<{ address: string }>;
    disconnect(): Promise<void>;
    on(event: string, handler: (...args: any[]) => void): void;
    removeListener(event: string, handler: (...args: any[]) => void): void;
  };
}

declare const window: TempleWindow;

class TempleConnect {
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
   * Initialize Temple client
   */
  async initClient(modal: any, gtag: any, dispatch: any) {
    if (!this.dispatch) this.dispatch = dispatch;
    
    // Check if Temple is available
    if (!this.isAvailable()) {
      throw new Error('Temple extension not installed');
    }

    // Set up event handlers
    this.setHooks(modal, gtag, dispatch);

    return window.temple;
  }

  /**
   * Check if Temple is available
   */
  isAvailable(): boolean {
    return typeof window !== 'undefined' && !!window.temple;
  }

  /**
   * Set up event handlers for Temple
   */
  setHooks(modal: any, gtag: any, dispatch: any) {
    if (!window.temple) return;

    // Handle account changes
    window.temple.on('accountsChanged', (accounts: string[]) => {
      if (accounts && accounts.length > 0) {
        this.connectedAddress = accounts[0];
      } else {
        this.connectedAddress = null;
      }
      dispatch('templeAccountsChanged', { accounts });
    });

    // Handle network changes
    window.temple.on('networkChanged', (network: string) => {
      this.network = network;
      dispatch('templeNetworkChanged', { network });
    });
  }

  /**
   * Connect to Temple wallet
   */
  async connect() {
    if (!this.isAvailable()) {
      throw new Error('Temple extension not installed');
    }

    try {
      // Request connection
      const result = await window.temple!.connect();
      
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
   * Disconnect from Temple wallet
   */
  async disconnect() {
    if (this.isAvailable() && window.temple!.disconnect) {
      await window.temple!.disconnect();
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
      throw new Error('Temple extension not installed');
    }

    if (!this.connectedAddress) {
      throw new Error('Wallet not connected');
    }

    try {
      const result = await window.temple!.request({
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
      throw new Error('Temple extension not installed');
    }

    if (!this.connectedAddress) {
      throw new Error('Wallet not connected');
    }

    try {
      const result = await window.temple!.request({
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
      throw new Error('Temple extension not installed');
    }

    if (!this.connectedAddress) {
      throw new Error('Wallet not connected');
    }

    try {
      const result = await window.temple!.request({
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

export default new TempleConnect();
