/**
 * Arweave ArConnect Integration
 * 
 * Handles ArConnect browser extension wallet connection.
 * ArConnect is the primary wallet extension for Arweave.
 */

// ArConnect API types
interface ArConnectWindow extends Window {
  arweaveWallet?: {
    connect(permissions: string[]): Promise<void>;
    disconnect(): Promise<void>;
    getActiveAddress(): Promise<string>;
    getAllAddresses(): Promise<string[]>;
    sign(transaction: any, options?: any): Promise<any>;
    getPermissions(): Promise<string[]>;
    addToken(id: string): Promise<void>;
    dispatch(transaction: any): Promise<string>;
  };
}

declare const window: ArConnectWindow;

// App metadata for ArConnect
const appMetadata = {
  name: 'LoginStandard',
  logo: 'https://loginstandard.com/icon.png'
};

class ArConnect {
  private dispatch: any = null;
  private connectedAddress: string | null = null;
  private permissions: string[] = [];

  constructor() {
    this.messageType = {
      CONNECT: 'connect',
      DISCONNECT: 'disconnect',
      SIGN_TRANSACTION: 'sign_transaction',
      DISPATCH_TRANSACTION: 'dispatch_transaction'
    };
  }

  /**
   * Initialize ArConnect client
   */
  async initClient(modal: any, gtag: any, dispatch: any) {
    if (!this.dispatch) this.dispatch = dispatch;
    
    // Check if ArConnect is available
    if (!this.isAvailable()) {
      throw new Error('ArConnect extension not installed');
    }

    // Set up event handlers
    this.setHooks(modal, gtag, dispatch);

    return window.arweaveWallet;
  }

  /**
   * Check if ArConnect is available
   */
  isAvailable(): boolean {
    return typeof window !== 'undefined' && !!window.arweaveWallet;
  }

  /**
   * Set up event handlers for ArConnect
   */
  setHooks(modal: any, gtag: any, dispatch: any) {
    // ArConnect doesn't have event listeners like WalletConnect
    // Events are handled through the API methods directly
  }

  /**
   * Connect to ArConnect wallet
   * @param permissions - Array of permission strings: 'ACCESS_ADDRESS', 'SIGN_TRANSACTION', 'DISPATCH_TRANSACTION', 'ACCESS_PUBLIC_KEY', 'SIGNATURE'
   */
  async connect(permissions: string[] = ['ACCESS_ADDRESS', 'SIGN_TRANSACTION']) {
    if (!this.isAvailable()) {
      throw new Error('ArConnect extension not installed');
    }

    try {
      await window.arweaveWallet!.connect(permissions);
      this.permissions = await window.arweaveWallet!.getPermissions();
      this.connectedAddress = await window.arweaveWallet!.getActiveAddress();
      
      return {
        address: this.connectedAddress,
        permissions: this.permissions
      };
    } catch (error: any) {
      if (error.message?.includes('User rejected')) {
        return null;
      }
      throw error;
    }
  }

  /**
   * Disconnect from ArConnect wallet
   */
  async disconnect() {
    if (!this.isAvailable()) {
      throw new Error('ArConnect extension not installed');
    }

    try {
      await window.arweaveWallet!.disconnect();
      this.connectedAddress = null;
      this.permissions = [];
    } catch (error) {
      console.error('Error disconnecting ArConnect:', error);
    }
  }

  /**
   * Get active address
   */
  async getActiveAddress(): Promise<string | null> {
    if (!this.isAvailable()) {
      return null;
    }

    try {
      this.connectedAddress = await window.arweaveWallet!.getActiveAddress();
      return this.connectedAddress;
    } catch (error) {
      return null;
    }
  }

  /**
   * Get all addresses
   */
  async getAllAddresses(): Promise<string[]> {
    if (!this.isAvailable()) {
      return [];
    }

    try {
      return await window.arweaveWallet!.getAllAddresses();
    } catch (error) {
      return [];
    }
  }

  /**
   * Sign a transaction
   */
  async signTransaction(transaction: any, options?: any) {
    if (!this.isAvailable()) {
      throw new Error('ArConnect extension not installed');
    }

    if (!this.hasPermission('SIGN_TRANSACTION')) {
      throw new Error('SIGN_TRANSACTION permission not granted');
    }

    try {
      const signedTx = await window.arweaveWallet!.sign(transaction, options);
      return signedTx;
    } catch (error: any) {
      if (error.message?.includes('User rejected')) {
        return null;
      }
      throw error;
    }
  }

  /**
   * Dispatch (sign and post) a transaction
   */
  async dispatchTransaction(transaction: any) {
    if (!this.isAvailable()) {
      throw new Error('ArConnect extension not installed');
    }

    if (!this.hasPermission('DISPATCH_TRANSACTION')) {
      throw new Error('DISPATCH_TRANSACTION permission not granted');
    }

    try {
      const txId = await window.arweaveWallet!.dispatch(transaction);
      return txId;
    } catch (error: any) {
      if (error.message?.includes('User rejected')) {
        return null;
      }
      throw error;
    }
  }

  /**
   * Get current permissions
   */
  async getPermissions(): Promise<string[]> {
    if (!this.isAvailable()) {
      return [];
    }

    try {
      this.permissions = await window.arweaveWallet!.getPermissions();
      return this.permissions;
    } catch (error) {
      return [];
    }
  }

  /**
   * Check if a specific permission is granted
   */
  hasPermission(permission: string): boolean {
    return this.permissions.includes(permission);
  }

  /**
   * Add a token to the wallet
   */
  async addToken(tokenId: string) {
    if (!this.isAvailable()) {
      throw new Error('ArConnect extension not installed');
    }

    try {
      await window.arweaveWallet!.addToken(tokenId);
    } catch (error) {
      console.error('Error adding token:', error);
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
   * Get connected address
   */
  getConnectedAddress(): string | null {
    return this.connectedAddress;
  }
}

export default new ArConnect();
