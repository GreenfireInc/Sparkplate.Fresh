/**
 * Waves Keeper Wallet Integration
 * 
 * Handles Waves Keeper browser extension wallet connection for Waves.
 * Waves Keeper is the official Waves wallet.
 */

// Waves Keeper API types
interface WavesKeeperWindow extends Window {
  WavesKeeper?: {
    publicState(): Promise<{
      account: {
        address: string;
        publicKey: string;
      };
      network: {
        code: string;
        server: string;
      };
    }>;
    signAndPublishTransaction(transaction: any): Promise<string>;
    signTransaction(transaction: any): Promise<any>;
    signMessage(message: string): Promise<string>;
    signRequest(request: any): Promise<any>;
    on(event: string, handler: (...args: any[]) => void): void;
    removeListener(event: string, handler: (...args: any[]) => void): void;
  };
}

declare const window: WavesKeeperWindow;

class WavesKeeperConnect {
  private dispatch: any = null;
  private connectedAddress: string | null = null;
  private network: string | null = null;

  constructor() {
    this.messageType = {
      CONNECT: 'connect',
      DISCONNECT: 'disconnect',
      ACCOUNTS_CHANGED: 'update',
      NETWORK_CHANGED: 'update'
    };
  }

  /**
   * Initialize Waves Keeper client
   */
  async initClient(modal: any, gtag: any, dispatch: any) {
    if (!this.dispatch) this.dispatch = dispatch;
    
    // Check if Waves Keeper is available
    if (!this.isAvailable()) {
      throw new Error('Waves Keeper extension not installed');
    }

    // Set up event handlers
    this.setHooks(modal, gtag, dispatch);

    return window.WavesKeeper;
  }

  /**
   * Check if Waves Keeper is available
   */
  isAvailable(): boolean {
    return typeof window !== 'undefined' && !!window.WavesKeeper;
  }

  /**
   * Set up event handlers for Waves Keeper
   */
  setHooks(modal: any, gtag: any, dispatch: any) {
    if (!window.WavesKeeper) return;

    // Handle account/network updates
    window.WavesKeeper.on('update', () => {
      // Refresh connection state
      this.getPublicState().then(state => {
        if (state && state.account) {
          this.connectedAddress = state.account.address;
          this.network = state.network.code;
        } else {
          this.connectedAddress = null;
          this.network = null;
        }
        dispatch('wavesKeeperUpdate', { state });
      });
    });
  }

  /**
   * Get public state from Waves Keeper
   */
  async getPublicState() {
    if (!this.isAvailable()) {
      throw new Error('Waves Keeper extension not installed');
    }

    try {
      const state = await window.WavesKeeper!.publicState();
      return state;
    } catch (error) {
      throw new Error('Failed to get Waves Keeper state');
    }
  }

  /**
   * Connect to Waves Keeper wallet
   */
  async connect() {
    if (!this.isAvailable()) {
      throw new Error('Waves Keeper extension not installed');
    }

    try {
      const state = await this.getPublicState();
      
      if (state && state.account) {
        this.connectedAddress = state.account.address;
        this.network = state.network.code;

        return {
          address: this.connectedAddress,
          publicKey: state.account.publicKey,
          network: this.network
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
   * Disconnect from Waves Keeper wallet
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
      const state = await this.getPublicState();
      if (state && state.account) {
        this.connectedAddress = state.account.address;
        return this.connectedAddress;
      }
      return null;
    } catch (error) {
      return null;
    }
  }

  /**
   * Sign and publish a transaction
   */
  async signAndPublishTransaction(transaction: any) {
    if (!this.isAvailable()) {
      throw new Error('Waves Keeper extension not installed');
    }

    if (!this.connectedAddress) {
      throw new Error('Wallet not connected');
    }

    try {
      const txId = await window.WavesKeeper!.signAndPublishTransaction(transaction);
      return txId;
    } catch (error: any) {
      if (error.code === 4001 || error.message?.includes('User denied')) {
        // User rejected
        return null;
      }
      throw error;
    }
  }

  /**
   * Sign a transaction without publishing
   */
  async signTransaction(transaction: any) {
    if (!this.isAvailable()) {
      throw new Error('Waves Keeper extension not installed');
    }

    if (!this.connectedAddress) {
      throw new Error('Wallet not connected');
    }

    try {
      const signed = await window.WavesKeeper!.signTransaction(transaction);
      return signed;
    } catch (error: any) {
      if (error.code === 4001 || error.message?.includes('User denied')) {
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
      throw new Error('Waves Keeper extension not installed');
    }

    if (!this.connectedAddress) {
      throw new Error('Wallet not connected');
    }

    try {
      const signature = await window.WavesKeeper!.signMessage(message);
      return signature;
    } catch (error: any) {
      if (error.code === 4001 || error.message?.includes('User denied')) {
        // User rejected
        return null;
      }
      throw error;
    }
  }

  /**
   * Sign a request
   */
  async signRequest(request: any) {
    if (!this.isAvailable()) {
      throw new Error('Waves Keeper extension not installed');
    }

    if (!this.connectedAddress) {
      throw new Error('Wallet not connected');
    }

    try {
      const signed = await window.WavesKeeper!.signRequest(request);
      return signed;
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
  isConnected(): boolean {
    return this.connectedAddress !== null;
  }
}

export default new WavesKeeperConnect();
