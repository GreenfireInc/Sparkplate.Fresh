/**
 * Algorand Pera Connect Integration
 * 
 * Handles Pera Connect (formerly Algorand Wallet Connect) protocol.
 * Pera Connect is Algorand's native wallet connection protocol.
 */

import { PeraWalletConnect } from '@perawallet/connect';

// App metadata for Pera Connect
const appMetadata = {
  name: 'LoginStandard',
  description: 'LoginStandard - Algorand Wallet',
  icon: 'https://loginstandard.com/icon.png'
};

class PeraConnect {
  private peraWallet: PeraWalletConnect | null = null;
  private dispatch: any = null;

  constructor() {
    this.messageType = {
      CONNECT: 'connect',
      DISCONNECT: 'disconnect',
      SIGN_TRANSACTION: 'sign_transaction',
      SIGN_MESSAGE: 'sign_message'
    };
  }

  /**
   * Initialize Pera Wallet Connect client
   */
  async initClient(modal: any, gtag: any, dispatch: any) {
    if (!this.dispatch) this.dispatch = dispatch;
    
    if (this.peraWallet) return this.peraWallet;

    this.peraWallet = new PeraWalletConnect({
      chainId: 416001, // Mainnet (416002 for testnet)
      ...appMetadata
    });

    // Set up event handlers
    this.setHooks(modal, gtag, dispatch);

    return this.peraWallet;
  }

  /**
   * Set up event handlers for Pera Connect
   */
  setHooks(modal: any, gtag: any, dispatch: any) {
    if (!this.peraWallet) return;

    // Handle connection request
    this.peraWallet.on('connect', (connectSettings) => {
      gtag?.event('web3-connect-pera-connect');
      
      const payload = {
        method: 'pera_connect',
        params: JSON.stringify({
          accounts: connectSettings.accounts,
          chainId: connectSettings.chainId
        })
      };
      dispatch('logRequest', payload);
    });

    // Handle disconnection
    this.peraWallet.on('disconnect', () => {
      gtag?.event('web3-connect-pera-disconnect');
      dispatch('peraConnectDisconnect');
    });

    // Handle transaction signing request
    this.peraWallet.on('sign_transaction', async (signRequest) => {
      gtag?.event('web3-connect-pera-sign-transaction');
      
      const payload = {
        method: 'pera_sign_transaction',
        params: JSON.stringify({
          transactions: signRequest.transactions
        })
      };
      dispatch('logRequest', payload);

      // Display modal for user approval
      // modal.show(DappCallRequest, {
      //   request: signRequest,
      //   connector: this.peraWallet,
      //   modalName: signRequest.id?.toString()
      // });
    });
  }

  /**
   * Connect to Pera Wallet
   */
  async connect() {
    if (!this.peraWallet) {
      throw new Error('Pera Wallet not initialized');
    }

    try {
      const accounts = await this.peraWallet.connect();
      return accounts;
    } catch (error: any) {
      if (error?.data?.type !== 'CONNECT_MODAL_CLOSED') {
        throw error;
      }
      return null;
    }
  }

  /**
   * Disconnect from Pera Wallet
   */
  async disconnect() {
    if (!this.peraWallet) {
      throw new Error('Pera Wallet not initialized');
    }

    await this.peraWallet.disconnect();
  }

  /**
   * Sign transactions
   */
  async signTransaction(transactions: any[]) {
    if (!this.peraWallet) {
      throw new Error('Pera Wallet not initialized');
    }

    try {
      const signedTransactions = await this.peraWallet.signTransaction([transactions]);
      return signedTransactions;
    } catch (error: any) {
      if (error?.data?.type !== 'SIGN_MODAL_CLOSED') {
        throw error;
      }
      return null;
    }
  }

  /**
   * Get connected accounts
   */
  getConnectedAccounts(): string[] {
    if (!this.peraWallet) {
      return [];
    }
    return this.peraWallet.connector?.accounts || [];
  }

  /**
   * Check if connected
   */
  isConnected(): boolean {
    return this.peraWallet?.isConnected || false;
  }

  /**
   * Reconnect to existing session
   */
  async reconnect() {
    if (!this.peraWallet) {
      throw new Error('Pera Wallet not initialized');
    }

    try {
      const accounts = await this.peraWallet.reconnectSession();
      return accounts;
    } catch (error) {
      return null;
    }
  }
}

export default new PeraConnect();
