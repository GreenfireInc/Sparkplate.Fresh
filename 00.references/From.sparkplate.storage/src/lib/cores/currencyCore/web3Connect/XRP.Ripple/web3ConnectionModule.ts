/**
 * Ripple Web3 Connection Module
 * 
 * Vuex/Pinia module for managing Ripple web3 connections
 * (WalletConnect, Xumm, and Crossmark)
 */

import walletConnect from './utils/walletConnect';
import xummConnect from './utils/xummConnect';
import crossmarkConnect from './utils/crossmarkConnect';

const initState = () => ({
  walletConnect: {
    web3wallet: null,
    sessions: {}
  },
  xummConnect: {
    client: null,
    address: null,
    network: null,
    isConnected: false
  },
  crossmarkConnect: {
    client: null,
    address: null,
    network: null,
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
    setXummConnect(state: any, client: any) {
      state.xummConnect.client = client;
    },
    setXummAddress(state: any, address: string | null) {
      state.xummConnect.address = address;
      state.xummConnect.isConnected = address !== null;
    },
    setXummNetwork(state: any, network: string | null) {
      state.xummConnect.network = network;
    },
    setCrossmarkConnect(state: any, client: any) {
      state.crossmarkConnect.client = client;
    },
    setCrossmarkAddress(state: any, address: string | null) {
      state.crossmarkConnect.address = address;
      state.crossmarkConnect.isConnected = address !== null;
    },
    setCrossmarkNetwork(state: any, network: string | null) {
      state.crossmarkConnect.network = network;
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
          wallet = rootGetters['wallets/getWalletByAddress']('xrp', address);
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

    // Xumm Actions
    async xummConnectInit({ commit, state }: any, { modal, gtag, dispatch }: any) {
      if (state.xummConnect.client) return;

      if (!xummConnect.isAvailable()) {
        throw new Error('Xumm extension not installed');
      }

      const client = await xummConnect.initClient(modal, gtag, dispatch);
      commit('setXummConnect', client);

      // Try to get current address if already connected
      const address = await xummConnect.getAddress();
      if (address) {
        commit('setXummAddress', address);
      }

      return client;
    },
    async xummConnect({ commit }: any) {
      const result = await xummConnect.connect();
      if (result) {
        commit('setXummAddress', result.address);
        commit('setXummNetwork', 'mainnet');
      }
      return result;
    },
    async xummDisconnect({ commit }: any) {
      await xummConnect.disconnect();
      commit('setXummAddress', null);
      commit('setXummNetwork', null);
    },
    async xummSignAndSubmit(_: any, { transaction }: { transaction: any }) {
      return await xummConnect.signAndSubmit(transaction);
    },
    async xummSignTransaction(_: any, { transaction }: { transaction: any }) {
      return await xummConnect.signTransaction(transaction);
    },
    async xummGetAddress(_: any) {
      return await xummConnect.getAddress();
    },
    async xummIsConnected(_: any) {
      return await xummConnect.isConnected();
    },

    // Crossmark Actions
    async crossmarkConnectInit({ commit, state }: any, { modal, gtag, dispatch }: any) {
      if (state.crossmarkConnect.client) return;

      if (!crossmarkConnect.isAvailable()) {
        throw new Error('Crossmark extension not installed');
      }

      const client = await crossmarkConnect.initClient(modal, gtag, dispatch);
      commit('setCrossmarkConnect', client);

      // Try to get current address if already connected
      const address = await crossmarkConnect.getAddress();
      if (address) {
        commit('setCrossmarkAddress', address);
      }

      return client;
    },
    async crossmarkConnect({ commit }: any) {
      const result = await crossmarkConnect.connect();
      if (result) {
        commit('setCrossmarkAddress', result.address);
        commit('setCrossmarkNetwork', 'mainnet');
      }
      return result;
    },
    async crossmarkDisconnect({ commit }: any) {
      await crossmarkConnect.disconnect();
      commit('setCrossmarkAddress', null);
      commit('setCrossmarkNetwork', null);
    },
    async crossmarkSignAndSubmit(_: any, { transaction }: { transaction: any }) {
      return await crossmarkConnect.signAndSubmit(transaction);
    },
    async crossmarkSignTransaction(_: any, { transaction }: { transaction: any }) {
      return await crossmarkConnect.signTransaction(transaction);
    },
    async crossmarkGetAddress(_: any) {
      return await crossmarkConnect.getAddress();
    },
    async crossmarkIsConnected(_: any) {
      return await crossmarkConnect.isConnected();
    },

    // Common Actions
    getWalletByAddress({ rootGetters }: any, { coinTicker, address }: any) {
      return rootGetters['wallets/getWalletByAddress'](coinTicker, address);
    },
    async endAllSessions({ state, dispatch, commit }: any) {
      // Disconnect WalletConnect sessions
      const sessions = state.walletConnect.sessions;
      for (const topic in sessions) {
        await dispatch('walletConnectSessionDisconnect', { topic });
      }

      // Disconnect Xumm
      if (state.xummConnect.isConnected) {
        await dispatch('xummDisconnect');
      }

      // Disconnect Crossmark
      if (state.crossmarkConnect.isConnected) {
        await dispatch('crossmarkDisconnect');
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
