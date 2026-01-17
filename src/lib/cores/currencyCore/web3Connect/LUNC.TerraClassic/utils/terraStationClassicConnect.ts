/**
 * Terra Station Classic Wallet Integration
 * 
 * Handles Terra Station Classic browser extension wallet connection for Terra Classic.
 * Terra Station Classic is the native wallet for Terra Classic blockchain.
 */

// Terra Station Classic API types
interface TerraStationClassicWindow extends Window {
  terra?: {
    request(args: { method: string; params?: any[] }): Promise<any>;
    isTerraStation?: boolean;
    on(event: string, handler: (...args: any[]) => void): void;
    removeListener(event: string, handler: (...args: any[]) => void): void;
    connect(): Promise<{ address: string }>;
    disconnect(): Promise<void>;
    getAccounts(): Promise<Array<{ address: string }>>;
  };
}

declare const window: TerraStationClassicWindow;

// Terra Classic Network configurations
const terraClassicNetworks = {
  mainnet: {
    chainId: 'columbus-5',
    name: 'Terra Classic Mainnet',
    lcd: 'https://terra-classic-lcd.publicnode.com'
  },
  testnet: {
    chainId: 'bombay-12',
    name: 'Terra Classic Testnet',
    lcd: 'https://terra-classic-testnet-lcd.publicnode.com'
  }
};

class TerraStationClassicConnect {
  private dispatch: any = null;
  private connectedAddress: string | null = null;
  private chainId: string | null = null;

  constructor() {
    this.messageType = {
      CONNECT: 'connect',
      DISCONNECT: 'disconnect',
      ACCOUNTS_CHANGED: 'accountsChanged',
      CHAIN_CHANGED: 'chainChanged'
    };
  }

  /**
   * Initialize Terra Station Classic client
   */
  async initClient(modal: any, gtag: any, dispatch: any) {
    if (!this.dispatch) this.dispatch = dispatch;
    
    // Check if Terra Station Classic is available
    if (!this.isAvailable()) {
      throw new Error('Terra Station Classic extension not installed');
    }

    // Set up event handlers
    this.setHooks(modal, gtag, dispatch);

    return window.terra;
  }

  /**
   * Check if Terra Station Classic is available
   */
  isAvailable(): boolean {
    return typeof window !== 'undefined' && !!window.terra && !!window.terra.isTerraStation;
  }

  /**
   * Set up event handlers for Terra Station Classic
   */
  setHooks(modal: any, gtag: any, dispatch: any) {
    if (!window.terra) return;

    // Handle account changes
    window.terra.on('accountsChanged', (accounts: Array<{ address: string }>) => {
      if (accounts.length === 0) {
        this.connectedAddress = null;
      } else {
        this.connectedAddress = accounts[0].address;
      }
      dispatch('terraStationClassicAccountsChanged', { accounts });
    });

    // Handle chain changes
    window.terra.on('chainChanged', (chainId: string) => {
      this.chainId = chainId;
      dispatch('terraStationClassicChainChanged', { chainId });
    });
  }

  /**
   * Connect to Terra Station Classic wallet
   */
  async connect() {
    if (!this.isAvailable()) {
      throw new Error('Terra Station Classic extension not installed');
    }

    try {
      // Request connection
      const result = await window.terra!.connect();

      if (result && result.address) {
        this.connectedAddress = result.address;
        this.chainId = 'columbus-5'; // Default to mainnet

        return {
          address: this.connectedAddress,
          chainId: this.chainId
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
   * Disconnect from Terra Station Classic wallet
   */
  async disconnect() {
    if (this.isAvailable() && this.connectedAddress) {
      try {
        await window.terra!.disconnect();
      } catch (error) {
        console.error('Error disconnecting Terra Station Classic:', error);
      }
    }
    this.connectedAddress = null;
    this.chainId = null;
  }

  /**
   * Get connected address
   */
  async getAddress(): Promise<string | null> {
    if (!this.isAvailable()) {
      return null;
    }

    try {
      const accounts = await window.terra!.getAccounts();

      if (accounts && accounts.length > 0) {
        this.connectedAddress = accounts[0].address;
        return this.connectedAddress;
      }

      return null;
    } catch (error) {
      return null;
    }
  }

  /**
   * Get current chain ID
   */
  async getChainId(): Promise<string | null> {
    if (!this.isAvailable()) {
      return null;
    }

    try {
      // Terra Station Classic doesn't have a direct chainId method
      // We'll use the connected address to infer mainnet
      if (this.connectedAddress) {
        return this.chainId || 'columbus-5';
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
      throw new Error('Terra Station Classic extension not installed');
    }

    if (!this.connectedAddress) {
      throw new Error('Wallet not connected');
    }

    try {
      const result = await window.terra!.request({
        method: 'lunc_signTransaction',
        params: [transaction]
      });
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
   * Sign a message
   */
  async signMessage(message: string) {
    if (!this.isAvailable()) {
      throw new Error('Terra Station Classic extension not installed');
    }

    if (!this.connectedAddress) {
      throw new Error('Wallet not connected');
    }

    try {
      const result = await window.terra!.request({
        method: 'lunc_signMessage',
        params: [message, this.connectedAddress]
      });
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

  /**
   * Check if on Terra Classic network
   */
  async isOnTerraClassic(): Promise<boolean> {
    const chainId = await this.getChainId();
    if (!chainId) return false;
    
    return chainId === 'columbus-5' || chainId === 'bombay-12';
  }
}

export default new TerraStationClassicConnect();

