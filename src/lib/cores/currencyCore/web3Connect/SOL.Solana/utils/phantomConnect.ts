/**
 * Phantom Wallet Integration
 * 
 * Handles Phantom browser extension wallet connection for Solana.
 * Phantom is the most popular Solana wallet.
 */

// Phantom API types
interface PhantomWindow extends Window {
  solana?: {
    isPhantom?: boolean;
    publicKey?: { toString(): string };
    connect(): Promise<{ publicKey: { toString(): string } }>;
    disconnect(): Promise<void>;
    signTransaction(transaction: any): Promise<any>;
    signAllTransactions(transactions: any[]): Promise<any[]>;
    signMessage(message: Uint8Array, display?: string): Promise<{ signature: Uint8Array; publicKey: any }>;
    on(event: string, handler: (...args: any[]) => void): void;
    removeListener(event: string, handler: (...args: any[]) => void): void;
  };
}

declare const window: PhantomWindow;

class PhantomConnect {
  private dispatch: any = null;
  private connectedAddress: string | null = null;
  private network: string | null = null;

  constructor() {
    this.messageType = {
      CONNECT: 'connect',
      DISCONNECT: 'disconnect',
      ACCOUNTS_CHANGED: 'accountChanged',
      NETWORK_CHANGED: 'networkChanged'
    };
  }

  /**
   * Initialize Phantom client
   */
  async initClient(modal: any, gtag: any, dispatch: any) {
    if (!this.dispatch) this.dispatch = dispatch;
    
    // Check if Phantom is available
    if (!this.isAvailable()) {
      throw new Error('Phantom extension not installed');
    }

    // Set up event handlers
    this.setHooks(modal, gtag, dispatch);

    return window.solana;
  }

  /**
   * Check if Phantom is available
   */
  isAvailable(): boolean {
    return typeof window !== 'undefined' && !!window.solana && !!window.solana.isPhantom;
  }

  /**
   * Set up event handlers for Phantom
   */
  setHooks(modal: any, gtag: any, dispatch: any) {
    if (!window.solana) return;

    // Handle account changes
    window.solana.on('accountChanged', (publicKey: any) => {
      if (publicKey) {
        this.connectedAddress = publicKey.toString();
      } else {
        this.connectedAddress = null;
      }
      dispatch('phantomAccountChanged', { publicKey });
    });

    // Handle disconnect
    window.solana.on('disconnect', () => {
      this.connectedAddress = null;
      dispatch('phantomDisconnected');
    });
  }

  /**
   * Connect to Phantom wallet
   */
  async connect() {
    if (!this.isAvailable()) {
      throw new Error('Phantom extension not installed');
    }

    try {
      // Request connection
      const response = await window.solana!.connect();
      
      if (response && response.publicKey) {
        this.connectedAddress = response.publicKey.toString();
        this.network = 'mainnet-beta'; // Default

        return {
          address: this.connectedAddress,
          publicKey: response.publicKey
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
   * Disconnect from Phantom wallet
   */
  async disconnect() {
    if (this.isAvailable() && this.connectedAddress) {
      try {
        await window.solana!.disconnect();
      } catch (error) {
        console.error('Error disconnecting Phantom:', error);
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

    if (window.solana!.publicKey) {
      this.connectedAddress = window.solana!.publicKey.toString();
      return this.connectedAddress;
    }

    return null;
  }

  /**
   * Sign a transaction
   */
  async signTransaction(transaction: any) {
    if (!this.isAvailable()) {
      throw new Error('Phantom extension not installed');
    }

    if (!this.connectedAddress) {
      throw new Error('Wallet not connected');
    }

    try {
      const signed = await window.solana!.signTransaction(transaction);
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
   * Sign multiple transactions
   */
  async signAllTransactions(transactions: any[]) {
    if (!this.isAvailable()) {
      throw new Error('Phantom extension not installed');
    }

    if (!this.connectedAddress) {
      throw new Error('Wallet not connected');
    }

    try {
      const signed = await window.solana!.signAllTransactions(transactions);
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
  async signMessage(message: Uint8Array, display: string = 'utf8') {
    if (!this.isAvailable()) {
      throw new Error('Phantom extension not installed');
    }

    if (!this.connectedAddress) {
      throw new Error('Wallet not connected');
    }

    try {
      const result = await window.solana!.signMessage(message, display);
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
}

export default new PhantomConnect();

