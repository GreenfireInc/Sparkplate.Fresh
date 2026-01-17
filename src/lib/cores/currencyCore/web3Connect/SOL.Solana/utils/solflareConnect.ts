/**
 * Solflare Wallet Integration
 * 
 * Handles Solflare browser extension wallet connection for Solana.
 * Solflare is a popular alternative Solana wallet.
 */

// Solflare API types
interface SolflareWindow extends Window {
  solflare?: {
    isSolflare?: boolean;
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

declare const window: SolflareWindow;

class SolflareConnect {
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
   * Initialize Solflare client
   */
  async initClient(modal: any, gtag: any, dispatch: any) {
    if (!this.dispatch) this.dispatch = dispatch;
    
    // Check if Solflare is available
    if (!this.isAvailable()) {
      throw new Error('Solflare extension not installed');
    }

    // Set up event handlers
    this.setHooks(modal, gtag, dispatch);

    return window.solflare;
  }

  /**
   * Check if Solflare is available
   */
  isAvailable(): boolean {
    return typeof window !== 'undefined' && !!window.solflare && !!window.solflare.isSolflare;
  }

  /**
   * Set up event handlers for Solflare
   */
  setHooks(modal: any, gtag: any, dispatch: any) {
    if (!window.solflare) return;

    // Handle account changes
    window.solflare.on('accountChanged', (publicKey: any) => {
      if (publicKey) {
        this.connectedAddress = publicKey.toString();
      } else {
        this.connectedAddress = null;
      }
      dispatch('solflareAccountChanged', { publicKey });
    });

    // Handle disconnect
    window.solflare.on('disconnect', () => {
      this.connectedAddress = null;
      dispatch('solflareDisconnected');
    });
  }

  /**
   * Connect to Solflare wallet
   */
  async connect() {
    if (!this.isAvailable()) {
      throw new Error('Solflare extension not installed');
    }

    try {
      // Request connection
      const response = await window.solflare!.connect();
      
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
   * Disconnect from Solflare wallet
   */
  async disconnect() {
    if (this.isAvailable() && this.connectedAddress) {
      try {
        await window.solflare!.disconnect();
      } catch (error) {
        console.error('Error disconnecting Solflare:', error);
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

    if (window.solflare!.publicKey) {
      this.connectedAddress = window.solflare!.publicKey.toString();
      return this.connectedAddress;
    }

    return null;
  }

  /**
   * Sign a transaction
   */
  async signTransaction(transaction: any) {
    if (!this.isAvailable()) {
      throw new Error('Solflare extension not installed');
    }

    if (!this.connectedAddress) {
      throw new Error('Wallet not connected');
    }

    try {
      const signed = await window.solflare!.signTransaction(transaction);
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
      throw new Error('Solflare extension not installed');
    }

    if (!this.connectedAddress) {
      throw new Error('Wallet not connected');
    }

    try {
      const signed = await window.solflare!.signAllTransactions(transactions);
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
      throw new Error('Solflare extension not installed');
    }

    if (!this.connectedAddress) {
      throw new Error('Wallet not connected');
    }

    try {
      const result = await window.solflare!.signMessage(message, display);
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

export default new SolflareConnect();

