/**
 * TronLink Wallet Integration
 * 
 * Handles TronLink browser extension wallet connection for Tron.
 * TronLink is the official Tron wallet.
 */

// TronLink API types
interface TronLinkWindow extends Window {
  tronWeb?: {
    ready: boolean;
    defaultAddress: {
      base58: string;
      hex: string;
    };
    trx: {
      getBalance(address: string): Promise<number>;
      sendTransaction(to: string, amount: number): Promise<any>;
      sign(transaction: any): Promise<any>;
      signMessage(message: string): Promise<string>;
    };
    transactionBuilder: {
      sendTrx(to: string, amount: number, from: string): Promise<any>;
      triggerSmartContract(contractAddress: string, functionName: string, options: any, parameters: any[], from: string): Promise<any>;
    };
    contract(): {
      at(address: string): Promise<any>;
    };
    on(event: string, handler: (...args: any[]) => void): void;
    removeListener(event: string, handler: (...args: any[]) => void): void;
  };
}

declare const window: TronLinkWindow;

class TronLinkConnect {
  private dispatch: any = null;
  private connectedAddress: string | null = null;
  private network: string | null = null;

  constructor() {
    this.messageType = {
      CONNECT: 'connect',
      DISCONNECT: 'disconnect',
      ACCOUNTS_CHANGED: 'addressChanged',
      NETWORK_CHANGED: 'networkChanged'
    };
  }

  /**
   * Initialize TronLink client
   */
  async initClient(modal: any, gtag: any, dispatch: any) {
    if (!this.dispatch) this.dispatch = dispatch;
    
    // Check if TronLink is available
    if (!this.isAvailable()) {
      throw new Error('TronLink extension not installed');
    }

    // Wait for TronLink to be ready
    await this.waitForTronLink();

    // Set up event handlers
    this.setHooks(modal, gtag, dispatch);

    return window.tronWeb;
  }

  /**
   * Wait for TronLink to be ready
   */
  async waitForTronLink(timeout: number = 5000): Promise<void> {
    const startTime = Date.now();
    
    while (!window.tronWeb?.ready) {
      if (Date.now() - startTime > timeout) {
        throw new Error('TronLink not ready. Please unlock your wallet.');
      }
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }

  /**
   * Check if TronLink is available
   */
  isAvailable(): boolean {
    return typeof window !== 'undefined' && !!window.tronWeb;
  }

  /**
   * Set up event handlers for TronLink
   */
  setHooks(modal: any, gtag: any, dispatch: any) {
    if (!window.tronWeb) return;

    // Handle address changes
    window.tronWeb.on('addressChanged', (address: string) => {
      if (address) {
        this.connectedAddress = address;
      } else {
        this.connectedAddress = null;
      }
      dispatch('tronLinkAddressChanged', { address });
    });
  }

  /**
   * Connect to TronLink wallet
   */
  async connect() {
    if (!this.isAvailable()) {
      throw new Error('TronLink extension not installed');
    }

    try {
      // Wait for TronLink to be ready
      await this.waitForTronLink();

      if (window.tronWeb!.ready && window.tronWeb!.defaultAddress) {
        this.connectedAddress = window.tronWeb!.defaultAddress.base58;
        this.network = 'mainnet'; // Default

        return {
          address: this.connectedAddress
        };
      }

      throw new Error('TronLink not ready. Please unlock your wallet.');
    } catch (error: any) {
      if (error.code === 4001) {
        // User rejected
        return null;
      }
      throw error;
    }
  }

  /**
   * Disconnect from TronLink wallet
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
      await this.waitForTronLink(2000);
      
      if (window.tronWeb!.ready && window.tronWeb!.defaultAddress) {
        this.connectedAddress = window.tronWeb!.defaultAddress.base58;
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
      throw new Error('TronLink extension not installed');
    }

    if (!this.connectedAddress) {
      throw new Error('Wallet not connected');
    }

    try {
      await this.waitForTronLink();
      const signed = await window.tronWeb!.trx.sign(transaction);
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
      throw new Error('TronLink extension not installed');
    }

    if (!this.connectedAddress) {
      throw new Error('Wallet not connected');
    }

    try {
      await this.waitForTronLink();
      const signed = await window.tronWeb!.trx.signMessage(message);
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
   * Send TRX
   */
  async sendTrx(to: string, amount: number) {
    if (!this.isAvailable()) {
      throw new Error('TronLink extension not installed');
    }

    if (!this.connectedAddress) {
      throw new Error('Wallet not connected');
    }

    try {
      await this.waitForTronLink();
      const result = await window.tronWeb!.trx.sendTransaction(to, amount);
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
   * Get TronWeb instance
   */
  getTronWeb() {
    if (!this.isAvailable() || !window.tronWeb?.ready) {
      throw new Error('TronLink not ready');
    }
    return window.tronWeb;
  }

  /**
   * Check if connected
   */
  isConnected(): boolean {
    return this.connectedAddress !== null;
  }
}

export default new TronLinkConnect();
