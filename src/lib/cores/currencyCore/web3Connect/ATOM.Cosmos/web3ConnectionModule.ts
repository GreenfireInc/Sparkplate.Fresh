/**
 * Cosmos Web3 Connection Module
 * 
 * Vuex/Pinia module for managing Cosmos web3 connections
 * (WalletConnect and Keplr)
 */

import walletConnect from './utils/walletConnect';
import keplrConnect from './utils/keplrConnect';

const initState = () => ({
  walletConnect: {
    web3wallet: null,
    sessions: {}
  },
  keplrConnect: {
    client: null,
    connectedChains: [],
    accounts: {},
    isConnected: false
  },
  history: []
});

export default {
  namespaced: true,
  state: initState,
  mutations: {
    setWalletConnect(state: any, web3wallet: any) {
      state.walletConnect.web3wallet = web3wallet;
    },
    setWalletConnectSession(state: any, session: any) {
      const topic = session.topic || session.handshakeTopic;
      state.walletConnect.sessions[topic] = session;
    },
    removeWalletConnectSession(state: any, topic: string) {
      delete state.walletConnect.sessions[topic];
    },
    setKeplrConnect(state: any, client: any) {
      state.keplrConnect.client = client;
    },
    setKeplrConnectedChains(state: any, chains: string[]) {
      state.keplrConnect.connectedChains = chains;
      state.keplrConnect.isConnected = chains.length > 0;
    },
    setKeplrAccount(state: any, { chainId, account }: { chainId: string; account: any }) {
      state.keplrConnect.accounts[chainId] = account;
    },
    removeKeplrAccount(state: any, chainId: string) {
      delete state.keplrConnect.accounts[chainId];
    },
    setHistory(state: any, history: any[]) {
      state.history = history;
    },
    addToHistory(state: any, instance: any) {
      state.history = [instance, ...state.history];
    }
  },
  actions: {
    // WalletConnect Actions
    async walletConnectInit({ commit, state }: any, { modal, gtag, dispatch, projectId }: any) {
      if (state.walletConnect.web3wallet) return;

      const web3wallet = await walletConnect.initWeb3Wallet(modal, gtag, dispatch, projectId);
      commit('setWalletConnect', web3wallet);

      const sessions = web3wallet.getActiveSessions();
      for (const session in sessions) {
        commit('setWalletConnectSession', sessions[session]);
      }

      return web3wallet;
    },
    async walletConnectPair(_: any, { uri }: { uri: string }) {
      await walletConnect.initPairing({ uri });
    },
    async handleWCSessionProposal({ commit }: any, { approved, proposal, wallets }: any) {
      const session = await walletConnect.handleSessionProposal({
        approved,
        proposal,
        wallets
      });
      if (session) commit('setWalletConnectSession', session);
    },
    async handleWCSessionRequest({ rootGetters, dispatch }: any, { approved, request }: any) {
      let wallet;

      if (approved) {
        const method = request.params.request.method;
        const params = request.params.request.params;
        const address = walletConnect.getAddressFromRequestParams(method, params);
        
        if (address) {
          wallet = rootGetters['wallets/getWalletByAddress']('atom', address);
        }
      }

      await walletConnect.handleSessionRequest({
        approved,
        request,
        wallet
      });
    },
    async walletConnectSessionDisconnect({ commit }: any, { topic }: { topic: string }) {
      try {
        await walletConnect.sessionDisconnect(topic);
      } catch (err) {
        console.error(err);
      } finally {
        commit('removeWalletConnectSession', topic);
      }
    },

    // Keplr Connect Actions
    async keplrConnectInit({ commit, state }: any, { modal, gtag, dispatch }: any) {
      if (state.keplrConnect.client) return;

      if (!keplrConnect.isAvailable()) {
        throw new Error('Keplr extension not installed');
      }

      const client = await keplrConnect.initClient(modal, gtag, dispatch);
      commit('setKeplrConnect', client);

      // Get already connected chains if any
      const connectedChains = keplrConnect.getConnectedChains();
      commit('setKeplrConnectedChains', connectedChains);

      return client;
    },
    async keplrConnect({ commit }: any, { chainId }: { chainId: string }) {
      const result = await keplrConnect.connect(chainId);
      if (result) {
        commit('setKeplrAccount', { chainId, account: result });
        const connectedChains = keplrConnect.getConnectedChains();
        commit('setKeplrConnectedChains', connectedChains);
      }
      return result;
    },
    async keplrDisconnect({ commit }: any, { chainId }: { chainId: string }) {
      await keplrConnect.disconnect(chainId);
      commit('removeKeplrAccount', chainId);
      const connectedChains = keplrConnect.getConnectedChains();
      commit('setKeplrConnectedChains', connectedChains);
    },
    async keplrGetAccount(_: any, { chainId }: { chainId: string }) {
      return await keplrConnect.getAccount(chainId);
    },
    async keplrSignAmino(_: any, { chainId, signer, signDoc }: { chainId: string; signer: string; signDoc: any }) {
      return await keplrConnect.signAmino(chainId, signer, signDoc);
    },
    async keplrSignDirect(_: any, { chainId, signer, signDoc }: { chainId: string; signer: string; signDoc: any }) {
      return await keplrConnect.signDirect(chainId, signer, signDoc);
    },
    async keplrSendTransaction(_: any, { chainId, tx, mode }: { chainId: string; tx: Uint8Array; mode?: 'sync' | 'async' | 'block' }) {
      return await keplrConnect.sendTransaction(chainId, tx, mode);
    },
    async keplrSuggestChain(_: any, { chainInfo }: { chainInfo: any }) {
      return await keplrConnect.suggestChain(chainInfo);
    },

    // Common Actions
    getWalletByAddress({ rootGetters }: any, { coinTicker, address }: any) {
      return rootGetters['wallets/getWalletByAddress'](coinTicker, address);
    },
    async endAllSessions({ state, dispatch }: any) {
      // Disconnect WalletConnect sessions
      const sessions = state.walletConnect.sessions;
      for (const topic in sessions) {
        await dispatch('walletConnectSessionDisconnect', { topic });
      }

      // Disconnect Keplr connections
      const chains = state.keplrConnect.connectedChains;
      for (const chainId of chains) {
        await dispatch('keplrDisconnect', { chainId });
      }

      // Reset state
      Object.assign(state, initState());
    },
    async loadRequestHistory({ rootState, commit }: any) {
      // Load from database if available
      // const userId = rootState.accounts.active.id;
      // const history = await dbConnection.getUserHistory(userId);
      // commit('setHistory', history);
    },
    async logRequest({ rootState, commit }: any, request: any) {
      const data = {
        ...request,
        date: new Date()
      };
      // await dbConnection.addRequest(data, userId);
      commit('addToHistory', data);
    },
    async performLogout({ dispatch, commit }: any) {
      await dispatch('endAllSessions');
      commit('setHistory', []);
    }
  }
};

