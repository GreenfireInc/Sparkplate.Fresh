/**
 * Leather Wallet Integration (formerly Hiro Wallet)
 * 
 * Handles Leather browser extension wallet connection for Stacks.
 * Leather (formerly Hiro) is the official Stacks wallet.
 */

// Leather API types
interface LeatherWindow extends Window {
  Leather?: {
    request(method: string, params?: any): Promise<any>;
    isLeather?: boolean;
    on(event: string, handler: (...args: any[]) => void): void;
    removeListener(event: string, handler: (...args: any[]) => void): void;
  };
  // Legacy Hiro support
  StacksProvider?: {
    getSelectedAddress(): Promise<string>;
    request(method: string, params?: any): Promise<any>;
  };
}

declare const window: LeatherWindow;

class LeatherConnect {
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
   * Initialize Leather client
   */
  async initClient(modal: any, gtag: any, dispatch: any) {
    if (!this.dispatch) this.dispatch = dispatch;
    
    // Check if Leather is available
    if (!this.isAvailable()) {
      throw new Error('Leather extension not installed');
    }

    // Set up event handlers
    this.setHooks(modal, gtag, dispatch);

    return window.Leather || window.StacksProvider;
  }

  /**
   * Check if Leather is available
   */
  isAvailable(): boolean {
    return typeof window !== 'undefined' && (!!window.Leather || !!window.StacksProvider);
  }

  /**
   * Set up event handlers for Leather
   */
  setHooks(modal: any, gtag: any, dispatch: any) {
    if (window.Leather) {
      window.Leather.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length === 0) {
          this.connectedAddress = null;
        } else {
          this.connectedAddress = accounts[0];
        }
        dispatch('leatherAccountsChanged', { accounts });
      });
    }
  }

  /**
   * Connect to Leather wallet
   */
  async connect() {
    if (!this.isAvailable()) {
      throw new Error('Leather extension not installed');
    }

    try {
      let address: string;
      
      if (window.Leather) {
        // New Leather API
        const response = await window.Leather.request('getSelectedAddress');
        address = response;
      } else if (window.StacksProvider) {
        // Legacy Hiro API
        address = await window.StacksProvider.getSelectedAddress();
      } else {
        throw new Error('No wallet provider found');
      }

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
   * Disconnect from Leather wallet
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
      let address: string;
      
      if (window.Leather) {
        address = await window.Leather.request('getSelectedAddress');
      } else if (window.StacksProvider) {
        address = await window.StacksProvider.getSelectedAddress();
      } else {
        return null;
      }

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
      throw new Error('Leather extension not installed');
    }

    if (!this.connectedAddress) {
      throw new Error('Wallet not connected');
    }

    try {
      let signed: any;
      
      if (window.Leather) {
        signed = await window.Leather.request('signTransaction', { transaction });
      } else if (window.StacksProvider) {
        signed = await window.StacksProvider.request('signTransaction', { transaction });
      } else {
        throw new Error('No wallet provider found');
      }

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
      throw new Error('Leather extension not installed');
    }

    if (!this.connectedAddress) {
      throw new Error('Wallet not connected');
    }

    try {
      let signed: any;
      
      if (window.Leather) {
        signed = await window.Leather.request('signMessage', { message });
      } else if (window.StacksProvider) {
        signed = await window.StacksProvider.request('signMessage', { message });
      } else {
        throw new Error('No wallet provider found');
      }

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

export default new LeatherConnect();

