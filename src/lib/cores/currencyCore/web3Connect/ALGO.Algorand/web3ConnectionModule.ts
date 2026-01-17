/**
 * Algorand Web3 Connection Module
 * 
 * Vuex/Pinia module for managing Algorand web3 connections
 * (WalletConnect and Pera Connect)
 */

import walletConnect from './utils/walletConnect';
import peraConnect from './utils/peraConnect';

const initState = () => ({
  walletConnect: {
    web3wallet: null,
    sessions: {}
  },
  peraConnect: {
    client: null,
    accounts: [],
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
    setPeraConnect(state: any, client: any) {
      state.peraConnect.client = client;
    },
    setPeraConnectAccounts(state: any, accounts: string[]) {
      state.peraConnect.accounts = accounts;
      state.peraConnect.isConnected = accounts.length > 0;
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
          wallet = rootGetters['wallets/getWalletByAddress']('algo', address);
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

    // Pera Connect Actions
    async peraConnectInit({ commit, state }: any, { modal, gtag, dispatch }: any) {
      if (state.peraConnect.client) return;

      const client = await peraConnect.initClient(modal, gtag, dispatch);
      commit('setPeraConnect', client);

      // Try to reconnect to existing session
      const accounts = await peraConnect.reconnect();
      if (accounts) {
        commit('setPeraConnectAccounts', accounts);
      }

      return client;
    },
    async peraConnectConnect({ commit }: any) {
      const accounts = await peraConnect.connect();
      if (accounts) {
        commit('setPeraConnectAccounts', accounts);
      }
      return accounts;
    },
    async peraConnectDisconnect({ commit }: any) {
      await peraConnect.disconnect();
      commit('setPeraConnectAccounts', []);
    },
    async peraConnectSignTransaction(_: any, { transactions }: { transactions: any[] }) {
      return await peraConnect.signTransaction(transactions);
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

      // Disconnect Pera Connect
      if (state.peraConnect.isConnected) {
        await dispatch('peraConnectDisconnect');
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
