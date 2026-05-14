/**
 * Polkadot.js Extension Integration
 * 
 * Handles Polkadot.js browser extension wallet connection.
 * Polkadot.js Extension is the primary wallet extension for Polkadot ecosystem.
 */

// Polkadot.js Extension API types
interface PolkadotJsWindow extends Window {
  injectedWeb3?: {
    [key: string]: {
      enable(origin: string): Promise<InjectedAccount[]>;
      accounts: {
        get(): Promise<InjectedAccount[]>;
        subscribe(cb: (accounts: InjectedAccount[]) => void): () => void;
      };
      signer: {
        signPayload(payload: SignerPayloadJSON): Promise<SignerResult>;
        signRaw(payload: SignerPayloadRaw): Promise<SignerResult>;
      };
    };
  };
}

interface InjectedAccount {
  address: string;
  genesisHash?: string | null;
  name?: string;
  type?: 'ed25519' | 'sr25519' | 'ecdsa';
}

interface SignerPayloadJSON {
  address: string;
  blockHash: string;
  blockNumber: string;
  era?: string;
  genesisHash: string;
  method: string;
  nonce: string;
  signedExtensions: string[];
  specVersion: string;
  tip?: string;
  transactionVersion: string;
  version: number;
}

interface SignerPayloadRaw {
  address: string;
  data: string;
  type?: 'bytes' | 'payload';
}

interface SignerResult {
  id: number;
  signature: string;
}

declare const window: PolkadotJsWindow;

// App metadata for Polkadot.js Extension
const appMetadata = {
  name: 'LoginStandard',
  version: '1.0.0'
};

class PolkadotJsExtension {
  private dispatch: any = null;
  private connectedAccounts: Map<string, InjectedAccount[]> = new Map();
  private extensionName: string = 'polkadot-js';

  constructor() {
    this.messageType = {
      CONNECT: 'connect',
      DISCONNECT: 'disconnect',
      SIGN_TRANSACTION: 'sign_transaction',
      SIGN_MESSAGE: 'sign_message'
    };
  }

  /**
   * Initialize Polkadot.js Extension client
   */
  async initClient(modal: any, gtag: any, dispatch: any) {
    if (!this.dispatch) this.dispatch = dispatch;
    
    // Check if Polkadot.js Extension is available
    if (!this.isAvailable()) {
      throw new Error('Polkadot.js Extension not installed');
    }

    // Set up event handlers
    this.setHooks(modal, gtag, dispatch);

    return window.injectedWeb3?.[this.extensionName];
  }

  /**
   * Check if Polkadot.js Extension is available
   */
  isAvailable(): boolean {
    return typeof window !== 'undefined' && 
           !!window.injectedWeb3 && 
           !!window.injectedWeb3[this.extensionName];
  }

  /**
   * Get available extension names
   */
  getAvailableExtensions(): string[] {
    if (!window.injectedWeb3) return [];
    return Object.keys(window.injectedWeb3);
  }

  /**
   * Set extension name (polkadot-js, talisman, subwallet, etc.)
   */
  setExtensionName(name: string) {
    this.extensionName = name;
  }

  /**
   * Set up event handlers for Polkadot.js Extension
   */
  setHooks(modal: any, gtag: any, dispatch: any) {
    // Polkadot.js Extension doesn't have event listeners like WalletConnect
    // Events are handled through the API methods directly
  }

  /**
   * Connect to Polkadot.js Extension wallet
   * @param origin - Origin string for the dApp
   */
  async connect(origin: string = window.location.origin) {
    if (!this.isAvailable()) {
      throw new Error('Polkadot.js Extension not installed');
    }

    const extension = window.injectedWeb3![this.extensionName];

    try {
      // Enable extension
      const accounts = await extension.enable(origin);
      
      this.connectedAccounts.set(this.extensionName, accounts);
      
      return {
        accounts,
        extension: this.extensionName
      };
    } catch (error: any) {
      if (error.message?.includes('User rejected')) {
        return null;
      }
      throw error;
    }
  }

  /**
   * Get accounts from extension
   */
  async getAccounts(): Promise<InjectedAccount[]> {
    if (!this.isAvailable()) {
      return [];
    }

    const extension = window.injectedWeb3![this.extensionName];

    try {
      const accounts = await extension.accounts.get();
      this.connectedAccounts.set(this.extensionName, accounts);
      return accounts;
    } catch (error) {
      return [];
    }
  }

  /**
   * Subscribe to account changes
   */
  subscribeAccounts(callback: (accounts: InjectedAccount[]) => void): (() => void) | null {
    if (!this.isAvailable()) {
      return null;
    }

    const extension = window.injectedWeb3![this.extensionName];
    return extension.accounts.subscribe(callback);
  }

  /**
   * Sign a transaction payload (JSON format)
   */
  async signPayload(payload: SignerPayloadJSON) {
    if (!this.isAvailable()) {
      throw new Error('Polkadot.js Extension not installed');
    }

    const extension = window.injectedWeb3![this.extensionName];

    try {
      const result = await extension.signer.signPayload(payload);
      return result;
    } catch (error: any) {
      if (error.message?.includes('User rejected')) {
        return null;
      }
      throw error;
    }
  }

  /**
   * Sign raw data
   */
  async signRaw(payload: SignerPayloadRaw) {
    if (!this.isAvailable()) {
      throw new Error('Polkadot.js Extension not installed');
    }

    const extension = window.injectedWeb3![this.extensionName];

    try {
      const result = await extension.signer.signRaw(payload);
      return result;
    } catch (error: any) {
      if (error.message?.includes('User rejected')) {
        return null;
      }
      throw error;
    }
  }

  /**
   * Check if connected
   */
  isConnected(): boolean {
    return this.connectedAccounts.has(this.extensionName) && 
           this.connectedAccounts.get(this.extensionName)!.length > 0;
  }

  /**
   * Get connected accounts
   */
  getConnectedAccounts(): InjectedAccount[] {
    return this.connectedAccounts.get(this.extensionName) || [];
  }

  /**
   * Disconnect from extension
   */
  async disconnect() {
    // Polkadot.js Extension doesn't have a disconnect method
    // Just clear our tracking
    this.connectedAccounts.delete(this.extensionName);
  }
}

export default new PolkadotJsExtension();

