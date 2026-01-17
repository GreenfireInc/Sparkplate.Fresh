/**
 * Xumm Wallet Integration
 * 
 * Handles Xumm wallet connection for Ripple.
 * Xumm is the most popular XRP Ledger wallet.
 */

// Xumm API types
interface XummWindow extends Window {
  xumm?: {
    request(payload: any): Promise<any>;
    ping(): Promise<boolean>;
    on(event: string, handler: (...args: any[]) => void): void;
    removeListener(event: string, handler: (...args: any[]) => void): void;
  };
}

declare const window: XummWindow;

class XummConnect {
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
   * Initialize Xumm client
   */
  async initClient(modal: any, gtag: any, dispatch: any) {
    if (!this.dispatch) this.dispatch = dispatch;
    
    // Check if Xumm is available
    if (!this.isAvailable()) {
      throw new Error('Xumm extension not installed');
    }

    // Set up event handlers
    this.setHooks(modal, gtag, dispatch);

    return window.xumm;
  }

  /**
   * Check if Xumm is available
   */
  isAvailable(): boolean {
    return typeof window !== 'undefined' && !!window.xumm;
  }

  /**
   * Set up event handlers for Xumm
   */
  setHooks(modal: any, gtag: any, dispatch: any) {
    if (!window.xumm) return;

    // Handle payload events
    window.xumm.on('payload', (payload: any) => {
      if (payload.account) {
        this.connectedAddress = payload.account;
      }
      dispatch('xummPayload', { payload });
    });
  }

  /**
   * Connect to Xumm wallet
   */
  async connect() {
    if (!this.isAvailable()) {
      throw new Error('Xumm extension not installed');
    }

    try {
      // Ping to check connection
      const isConnected = await window.xumm!.ping();
      
      if (isConnected) {
        // Request account access
        const payload = await window.xumm!.request({
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
   * Disconnect from Xumm wallet
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
      const isConnected = await window.xumm!.ping();
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
      throw new Error('Xumm extension not installed');
    }

    if (!this.connectedAddress) {
      throw new Error('Wallet not connected');
    }

    try {
      const payload = await window.xumm!.request(transaction);
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
      throw new Error('Xumm extension not installed');
    }

    if (!this.connectedAddress) {
      throw new Error('Wallet not connected');
    }

    try {
      const payload = await window.xumm!.request({
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
      return await window.xumm!.ping();
    } catch (error) {
      return false;
    }
  }
}

export default new XummConnect();
