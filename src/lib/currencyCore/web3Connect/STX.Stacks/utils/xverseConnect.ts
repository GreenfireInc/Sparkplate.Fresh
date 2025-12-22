/**
 * Xverse Wallet Integration
 * 
 * Handles Xverse browser extension wallet connection for Stacks.
 * Xverse is a popular Stacks and Bitcoin wallet.
 */

// Xverse API types
interface XverseWindow extends Window {
  XverseProviders?: {
    StacksProvider?: {
      getSelectedAddress(): Promise<string>;
      request(method: string, params?: any): Promise<any>;
      on(event: string, handler: (...args: any[]) => void): void;
      removeListener(event: string, handler: (...args: any[]) => void): void;
    };
  };
}

declare const window: XverseWindow;

class XverseConnect {
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
   * Initialize Xverse client
   */
  async initClient(modal: any, gtag: any, dispatch: any) {
    if (!this.dispatch) this.dispatch = dispatch;
    
    // Check if Xverse is available
    if (!this.isAvailable()) {
      throw new Error('Xverse extension not installed');
    }

    // Set up event handlers
    this.setHooks(modal, gtag, dispatch);

    return this.getProvider();
  }

  /**
   * Get Xverse provider
   */
  getProvider() {
    return window.XverseProviders?.StacksProvider;
  }

  /**
   * Check if Xverse is available
   */
  isAvailable(): boolean {
    return typeof window !== 'undefined' && !!window.XverseProviders?.StacksProvider;
  }

  /**
   * Set up event handlers for Xverse
   */
  setHooks(modal: any, gtag: any, dispatch: any) {
    const provider = this.getProvider();
    if (!provider) return;

    // Handle account changes
    provider.on('accountsChanged', (accounts: string[]) => {
      if (accounts.length === 0) {
        this.connectedAddress = null;
      } else {
        this.connectedAddress = accounts[0];
      }
      dispatch('xverseAccountsChanged', { accounts });
    });
  }

  /**
   * Connect to Xverse wallet
   */
  async connect() {
    if (!this.isAvailable()) {
      throw new Error('Xverse extension not installed');
    }

    try {
      const provider = this.getProvider();
      if (!provider) {
        throw new Error('Xverse provider not found');
      }

      const address = await provider.getSelectedAddress();

      if (address) {
        this.connectedAddress = address;
        this.network = 'mainnet'; // Default

        return {
          address: this.connectedAddress
        };
      }

      return null;
    } catch (error: any) {
      if (error.code === 4001) {
        // User rejected
        return null;
      }
      throw error;
    }
  }

  /**
   * Disconnect from Xverse wallet
   */
  async disconnect() {
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
      const provider = this.getProvider();
      if (!provider) return null;

      const address = await provider.getSelectedAddress();

      if (address) {
        this.connectedAddress = address;
        return this.connectedAddress;
      }

      return null;
    } catch (error) {
      return null;
    }
  }

  /**
   * Sign a transaction
   */
  async signTransaction(transaction: any) {
    if (!this.isAvailable()) {
      throw new Error('Xverse extension not installed');
    }

    if (!this.connectedAddress) {
      throw new Error('Wallet not connected');
    }

    try {
      const provider = this.getProvider();
      if (!provider) {
        throw new Error('Xverse provider not found');
      }

      const signed = await provider.request('signTransaction', { transaction });
      return signed;
    } catch (error: any) {
      if (error.code === 4001) {
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
      throw new Error('Xverse extension not installed');
    }

    if (!this.connectedAddress) {
      throw new Error('Wallet not connected');
    }

    try {
      const provider = this.getProvider();
      if (!provider) {
        throw new Error('Xverse provider not found');
      }

      const signed = await provider.request('signMessage', { message });
      return signed;
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
}

export default new XverseConnect();

