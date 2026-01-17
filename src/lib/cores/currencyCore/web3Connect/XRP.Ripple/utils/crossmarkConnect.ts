/**
 * Crossmark Wallet Integration
 * 
 * Handles Crossmark browser extension wallet connection for Ripple.
 * Crossmark is a popular XRP Ledger wallet.
 */

// Crossmark API types
interface CrossmarkWindow extends Window {
  crossmark?: {
    request(payload: any): Promise<any>;
    ping(): Promise<boolean>;
    on(event: string, handler: (...args: any[]) => void): void;
    removeListener(event: string, handler: (...args: any[]) => void): void;
  };
}

declare const window: CrossmarkWindow;

class CrossmarkConnect {
  private dispatch: any = null;
  private connectedAddress: string | null = null;
  private network: string | null = null;

  constructor() {
    this.messageType = {
      CONNECT: 'connect',
      DISCONNECT: 'disconnect',
      ACCOUNTS_CHANGED: 'payload',
      NETWORK_CHANGED: 'networkChanged'
    };
  }

  /**
   * Initialize Crossmark client
   */
  async initClient(modal: any, gtag: any, dispatch: any) {
    if (!this.dispatch) this.dispatch = dispatch;
    
    // Check if Crossmark is available
    if (!this.isAvailable()) {
      throw new Error('Crossmark extension not installed');
    }

    // Set up event handlers
    this.setHooks(modal, gtag, dispatch);

    return window.crossmark;
  }

  /**
   * Check if Crossmark is available
   */
  isAvailable(): boolean {
    return typeof window !== 'undefined' && !!window.crossmark;
  }

  /**
   * Set up event handlers for Crossmark
   */
  setHooks(modal: any, gtag: any, dispatch: any) {
    if (!window.crossmark) return;

    // Handle payload events
    window.crossmark.on('payload', (payload: any) => {
      if (payload.account) {
        this.connectedAddress = payload.account;
      }
      dispatch('crossmarkPayload', { payload });
    });
  }

  /**
   * Connect to Crossmark wallet
   */
  async connect() {
    if (!this.isAvailable()) {
      throw new Error('Crossmark extension not installed');
    }

    try {
      // Ping to check connection
      const isConnected = await window.crossmark!.ping();
      
      if (isConnected) {
        // Request account access
        const payload = await window.crossmark!.request({
          TransactionType: 'SignIn'
        });

        if (payload && payload.account) {
          this.connectedAddress = payload.account;
          this.network = 'mainnet'; // Default

          return {
            address: this.connectedAddress,
            account: payload.account
          };
        }
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
   * Disconnect from Crossmark wallet
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
      const isConnected = await window.crossmark!.ping();
      if (isConnected && this.connectedAddress) {
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
      throw new Error('Crossmark extension not installed');
    }

    if (!this.connectedAddress) {
      throw new Error('Wallet not connected');
    }

    try {
      const payload = await window.crossmark!.request(transaction);
      return payload;
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
      throw new Error('Crossmark extension not installed');
    }

    if (!this.connectedAddress) {
      throw new Error('Wallet not connected');
    }

    try {
      const payload = await window.crossmark!.request({
        ...transaction,
        submit: false
      });
      return payload;
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
      return await window.crossmark!.ping();
    } catch (error) {
      return false;
    }
  }
}

export default new CrossmarkConnect();
