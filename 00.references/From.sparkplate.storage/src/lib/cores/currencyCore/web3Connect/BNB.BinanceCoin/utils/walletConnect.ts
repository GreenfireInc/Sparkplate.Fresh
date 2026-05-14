/**
 * Binance Smart Chain WalletConnect Integration
 * 
 * Handles WalletConnect v2 protocol for BSC dApp connections.
 * BSC is EVM-compatible, so it uses EIP-155 namespace like Ethereum.
 */

import { Core } from '@walletconnect/core';
import { Web3Wallet } from '@walletconnect/web3wallet';
import { buildApprovedNamespaces, getSdkError } from '@walletconnect/utils';
import { bnbMethods } from './bnbRPCMethods';

// App metadata for WalletConnect
const appMetadata = {
  name: 'LoginStandard',
  description: 'LoginStandard - BNB Smart Chain Wallet',
  icons: ['https://loginstandard.com/icon.png'],
  url: 'https://loginstandard.com'
};

// WalletConnect Core instance
let walletConnectCore: Core | null = null;

class BNBWalletConnect {
  private web3wallet: Web3Wallet | null = null;
  private dispatch: any = null;
  private projectId: string = '';

  constructor() {
    this.requestTypes = {
      transactionRequests: ['bnb_sendTransaction', 'bnb_signTransaction'],
      typedRequests: ['bnb_signTypedData_v4'],
      signMessageRequests: ['bnb_sign', 'bnb_personal_sign'],
      sessionRequest: 'session_request',
      sessionProposal: 'session_proposal',
      otherRequests: ['bnb_sendRawTransaction', 'bnb_switchEthereumChain', 'bnb_addEthereumChain']
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

    // Build EIP-155 accounts for BSC
    const bscChains = [
      'eip155:56',  // BSC Mainnet
      'eip155:97'   // BSC Testnet
    ];

    const accounts: string[] = [];
    bscChains.forEach((chain) => {
      wallets.forEach((wallet) => {
        const eip155AccountString = `${chain}:${wallet.address}`;
        accounts.push(eip155AccountString);
      });
    });

    // Build approved namespaces
    const approvedNamespaces = buildApprovedNamespaces({
      proposal: params,
      supportedNamespaces: {
        eip155: {
          chains: bscChains,
          methods: Object.keys(bnbMethods),
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
      
      const network = parseInt(chainId) === 56 ? 'mainnet' : 'testnet';
      
      // Map WalletConnect methods to BNB methods
      const methodMap: Record<string, string> = {
        'eth_sendTransaction': 'bnb_sendTransaction',
        'eth_signTransaction': 'bnb_signTransaction',
        'eth_signTypedData_v4': 'bnb_signTypedData_v4',
        'eth_sign': 'bnb_sign',
        'personal_sign': 'bnb_personal_sign',
        'eth_sendRawTransaction': 'bnb_sendRawTransaction',
        'wallet_switchEthereumChain': 'bnb_switchEthereumChain',
        'wallet_addEthereumChain': 'bnb_addEthereumChain'
      };

      const bnbMethod = methodMap[method] || method;
      
      const result = await bnbMethods[bnbMethod as keyof typeof bnbMethods]({
        wallet,
        params,
        network,
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
      return params[0]?.from;
    } else if (requestTypes.typedRequests.includes(method)) {
      return params[0];
    } else if (requestTypes.signMessageRequests.includes(method)) {
      return method === 'bnb_personal_sign' ? params[1] : params[0];
    }
  }
}

export default new BNBWalletConnect();

