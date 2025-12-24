/**
 * Polkadot Web3 Connection Module
 * 
 * Vuex/Pinia module for managing Polkadot web3 connections
 * (WalletConnect and Polkadot.js Extension)
 */

import walletConnect from './utils/walletConnect';
import polkadotjsExtension from './utils/polkadotjsExtension';

const initState = () => ({
  walletConnect: {
    web3wallet: null,
    sessions: {}
  },
  polkadotjsExtension: {
    client: null,
    accounts: [],
    extensionName: 'polkadot-js',
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
    setPolkadotJsExtension(state: any, client: any) {
      state.polkadotjsExtension.client = client;
    },
    setPolkadotJsAccounts(state: any, accounts: any[]) {
      state.polkadotjsExtension.accounts = accounts;
      state.polkadotjsExtension.isConnected = accounts.length > 0;
    },
    setPolkadotJsExtensionName(state: any, name: string) {
      state.polkadotjsExtension.extensionName = name;
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
          wallet = rootGetters['wallets/getWalletByAddress']('dot', address);
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

    // Polkadot.js Extension Actions
    async polkadotjsExtensionInit({ commit, state }: any, { modal, gtag, dispatch, extensionName }: any) {
      if (state.polkadotjsExtension.client) return;

      if (!polkadotjsExtension.isAvailable()) {
        throw new Error('Polkadot.js Extension not installed');
      }

      if (extensionName) {
        polkadotjsExtension.setExtensionName(extensionName);
        commit('setPolkadotJsExtensionName', extensionName);
      }

      const client = await polkadotjsExtension.initClient(modal, gtag, dispatch);
      commit('setPolkadotJsExtension', client);

      // Try to get accounts if already connected
      const accounts = await polkadotjsExtension.getAccounts();
      if (accounts.length > 0) {
        commit('setPolkadotJsAccounts', accounts);
      }

      return client;
    },
    async polkadotjsExtensionConnect({ commit }: any, { origin }: { origin?: string }) {
      const result = await polkadotjsExtension.connect(origin);
      if (result) {
        commit('setPolkadotJsAccounts', result.accounts);
      }
      return result;
    },
    async polkadotjsExtensionDisconnect({ commit }: any) {
      await polkadotjsExtension.disconnect();
      commit('setPolkadotJsAccounts', []);
    },
    async polkadotjsExtensionGetAccounts({ commit }: any) {
      const accounts = await polkadotjsExtension.getAccounts();
      commit('setPolkadotJsAccounts', accounts);
      return accounts;
    },
    async polkadotjsExtensionSignPayload(_: any, { payload }: { payload: any }) {
      return await polkadotjsExtension.signPayload(payload);
    },
    async polkadotjsExtensionSignRaw(_: any, { payload }: { payload: any }) {
      return await polkadotjsExtension.signRaw(payload);
    },
    async polkadotjsExtensionGetAvailableExtensions(_: any) {
      return polkadotjsExtension.getAvailableExtensions();
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

      // Disconnect Polkadot.js Extension
      if (state.polkadotjsExtension.isConnected) {
        await dispatch('polkadotjsExtensionDisconnect');
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

