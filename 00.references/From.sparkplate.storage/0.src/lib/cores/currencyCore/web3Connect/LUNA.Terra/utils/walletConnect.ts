/**
 * Terra WalletConnect Integration
 * 
 * Handles WalletConnect v2 protocol for Terra dApp connections.
 * Terra uses Cosmos SDK, so it uses Cosmos namespace.
 */

import { Core } from '@walletconnect/core';
import { Web3Wallet } from '@walletconnect/web3wallet';
import { buildApprovedNamespaces, getSdkError } from '@walletconnect/utils';
import { terraMethods } from './terraRPCMethods';

// App metadata for WalletConnect
const appMetadata = {
  name: 'LoginStandard',
  description: 'LoginStandard - Terra Wallet',
  icons: ['https://loginstandard.com/icon.png'],
  url: 'https://loginstandard.com'
};

// WalletConnect Core instance
let walletConnectCore: Core | null = null;

class TerraWalletConnect {
  private web3wallet: Web3Wallet | null = null;
  private dispatch: any = null;
  private projectId: string = '';

  constructor() {
    this.requestTypes = {
      transactionRequests: ['terra_sendTransaction', 'terra_signAndSendTransaction', 'terra_signTransaction'],
      queryRequests: ['terra_queryContract', 'terra_getBalance', 'terra_getAccount'],
      sessionRequest: 'session_request',
      sessionProposal: 'session_proposal',
      otherRequests: ['terra_executeContract', 'terra_getBlock']
    };
  }

  /**
   * Initialize Web3Wallet for WalletConnect
   */
  async initWeb3Wallet(modal: any, gtag: any, dispatch: any, projectId: string) {
    if (!this.dispatch) this.dispatch = dispatch;
    if (this.web3wallet) return this.web3wallet;
    
    this.projectId = projectId;

    // Initialize Core
    walletConnectCore = new Core({
      projectId: this.projectId
    });

    // Initialize Web3Wallet
    this.web3wallet = await Web3Wallet.init({
      core: walletConnectCore,
      metadata: { ...appMetadata }
    });

    // Set up event handlers
    this.setHooks(modal, gtag, dispatch);

    return this.web3wallet;
  }

  /**
   * Start pairing with a dApp
   */
  initPairing({ uri }: { uri: string }) {
    const version = this.getVersion(uri);
    if (version === '1') {
      throw new Error(
        'WalletConnect v1 has been shutdown. Only WalletConnect v2 connections are supported.'
      );
    } else if (version === '2') {
      this.pairWeb3Wallet(uri);
    } else {
      throw new Error('Unsupported WalletConnect version');
    }
  }

  /**
   * Get WalletConnect version from URI
   */
  getVersion(uri: string): string {
    const versionIndex = uri.indexOf('@') + 1;
    const version = uri[versionIndex];
    console.log('WalletConnect Version:', version);
    return version;
  }

  /**
   * Pair Web3Wallet with dApp
   */
  pairWeb3Wallet(uri: string) {
    if (!this.web3wallet) {
      throw new Error('Web3Wallet not initialized');
    }
    this.web3wallet.core.pairing.pair({ uri });
  }

  /**
   * Set up event handlers for WalletConnect
   */
  async setHooks(modal: any, gtag: any, dispatch: any) {
    if (!this.web3wallet) return;

    // Session proposal handler
    this.web3wallet.on('session_proposal', async (proposal) => {
      gtag?.event('web3-connect-wallet-connect-session-request');

      // Log session request
      const payload = {
        method: 'wallet_connect',
        params: JSON.stringify({
          id: proposal.id,
          peerMeta: proposal.params.proposer.metadata
        })
      };
      dispatch('logRequest', payload);

      // Display modal for user approval
      const modalName = proposal.id.toString();
      // modal.show(DappCallRequest, {
      //   request: { ...proposal, method: 'session_proposal', version: 'wc-2' },
      //   connector: this.web3wallet,
      //   modalName
      // });
    });

    // Session request handler
    this.web3wallet.on('session_request', async (request) => {
      console.log('Session request:', request);
      const modalName = request.id.toString();
      // modal.show(DappCallRequest, {
      //   request: { ...request, method: 'session_request', version: 'wc-2' },
      //   connector: this.web3wallet,
      //   modalName
      // });
    });

    // Session delete handler
    this.web3wallet.on('session_delete', async (payload) => {
      const topic = payload.topic;
      await dispatch('walletConnectSessionDisconnect', { topic });
    });
  }

  /**
   * Handle session proposal approval/rejection
   */
  async handleSessionProposal({ 
    approved, 
    proposal, 
    wallets 
  }: { 
    approved: boolean; 
    proposal: any; 
    wallets: any[] 
  }) {
    if (!this.web3wallet) {
      throw new Error('Web3Wallet not initialized');
    }

    const { id, params } = proposal;

    // Reject session
    if (!approved) {
      await this.web3wallet.rejectSession({
        id,
        reason: getSdkError('USER_REJECTED')
      });
      return null;
    }

    // Build Cosmos accounts for Terra
    const terraChains = [
      'cosmos:phoenix-1',  // Terra Mainnet
      'cosmos:pisco-1'     // Terra Testnet
    ];

    const accounts: string[] = [];
    terraChains.forEach((chain) => {
      wallets.forEach((wallet) => {
        const cosmosAccountString = `${chain}:${wallet.address}`;
        accounts.push(cosmosAccountString);
      });
    });

    // Build approved namespaces
    const approvedNamespaces = buildApprovedNamespaces({
      proposal: params,
      supportedNamespaces: {
        cosmos: {
          chains: terraChains,
          methods: Object.keys(terraMethods),
          events: ['accountsChanged', 'chainChanged'],
          accounts
        }
      }
    });

    // Approve session
    const session = await this.web3wallet.approveSession({
      id,
      namespaces: approvedNamespaces
    });

    return session;
  }

  /**
   * Handle session request
   */
  async handleSessionRequest({ 
    approved, 
    request, 
    wallet 
  }: { 
    approved: boolean; 
    request: any; 
    wallet?: any 
  }) {
    if (!this.web3wallet) {
      throw new Error('Web3Wallet not initialized');
    }

    let response: any;

    if (!approved) {
      response = {
        id: request.id,
        jsonrpc: '2.0',
        error: {
          code: 5000,
          message: 'User rejected.'
        }
      };
    } else {
      // Process request
      const method = request.params.request.method;
      const params = request.params.request.params;
      const [, chainId] = request.params.chainId.split(':');
      
      let network = 'mainnet';
      if (chainId === 'phoenix-1') network = 'mainnet';
      else if (chainId === 'pisco-1') network = 'testnet';
      
      const result = await terraMethods[method as keyof typeof terraMethods]({
        wallet,
        params,
        network,
        chainId,
        dispatch: this.dispatch
      });

      response = {
        id: request.id,
        jsonrpc: '2.0',
        result
      };
    }

    const topic = request.topic;
    return this.web3wallet.respondSessionRequest({ topic, response });
  }

  /**
   * Disconnect session
   */
  async sessionDisconnect(topic: string) {
    if (!this.web3wallet) {
      throw new Error('Web3Wallet not initialized');
    }

    await this.web3wallet.disconnectSession({
      topic,
      reason: getSdkError('USER_DISCONNECTED')
    });
  }

  /**
   * Get address from request parameters
   */
  getAddressFromRequestParams(method: string, params: any[]): string | undefined {
    const requestTypes = this.requestTypes;

    if (requestTypes.transactionRequests.includes(method)) {
      return params[0]?.from || params[0]?.signer;
    } else if (requestTypes.queryRequests.includes(method)) {
      return params[0];
    }
  }
}

export default new TerraWalletConnect();

