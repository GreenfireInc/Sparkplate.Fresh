/**
 * Tezos Web3 Connection Module
 * 
 * Vuex/Pinia module for managing Tezos web3 connections
 * (WalletConnect, Temple, and Kukai)
 */

import walletConnect from './utils/walletConnect';
import templeConnect from './utils/templeConnect';
import kukaiConnect from './utils/kukaiConnect';

const initState = () => ({
  walletConnect: {
    web3wallet: null,
    sessions: {}
  },
  templeConnect: {
    client: null,
    address: null,
    network: null,
    isConnected: false
  },
  kukaiConnect: {
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
    setTempleConnect(state: any, client: any) {
      state.templeConnect.client = client;
    },
    setTempleAddress(state: any, address: string | null) {
      state.templeConnect.address = address;
      state.templeConnect.isConnected = address !== null;
    },
    setTempleNetwork(state: any, network: string | null) {
      state.templeConnect.network = network;
    },
    setKukaiConnect(state: any, client: any) {
      state.kukaiConnect.client = client;
    },
    setKukaiAddress(state: any, address: string | null) {
      state.kukaiConnect.address = address;
      state.kukaiConnect.isConnected = address !== null;
    },
    setKukaiNetwork(state: any, network: string | null) {
      state.kukaiConnect.network = network;
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
          wallet = rootGetters['wallets/getWalletByAddress']('xtz', address);
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

    // Temple Actions
    async templeConnectInit({ commit, state }: any, { modal, gtag, dispatch }: any) {
      if (state.templeConnect.client) return;

      if (!templeConnect.isAvailable()) {
        throw new Error('Temple extension not installed');
      }

      const client = await templeConnect.initClient(modal, gtag, dispatch);
      commit('setTempleConnect', client);

      // Try to get current address if already connected
      const address = await templeConnect.getAddress();
      if (address) {
        commit('setTempleAddress', address);
      }

      return client;
    },
    async templeConnect({ commit }: any) {
      const result = await templeConnect.connect();
      if (result) {
        commit('setTempleAddress', result.address);
        commit('setTempleNetwork', 'mainnet');
      }
      return result;
    },
    async templeDisconnect({ commit }: any) {
      await templeConnect.disconnect();
      commit('setTempleAddress', null);
      commit('setTempleNetwork', null);
    },
    async templeSignAndSubmit(_: any, { transaction }: { transaction: any }) {
      return await templeConnect.signAndSubmit(transaction);
    },
    async templeSignTransaction(_: any, { transaction }: { transaction: any }) {
      return await templeConnect.signTransaction(transaction);
    },
    async templeSignMessage(_: any, { message }: { message: string }) {
      return await templeConnect.signMessage(message);
    },
    async templeGetAddress(_: any) {
      return await templeConnect.getAddress();
    },
    async templeIsConnected(_: any) {
      return await templeConnect.isConnected();
    },

    // Kukai Actions
    async kukaiConnectInit({ commit, state }: any, { modal, gtag, dispatch }: any) {
      if (state.kukaiConnect.client) return;

      if (!kukaiConnect.isAvailable()) {
        throw new Error('Kukai extension not installed');
      }

      const client = await kukaiConnect.initClient(modal, gtag, dispatch);
      commit('setKukaiConnect', client);

      // Try to get current address if already connected
      const address = await kukaiConnect.getAddress();
      if (address) {
        commit('setKukaiAddress', address);
      }

      return client;
    },
    async kukaiConnect({ commit }: any) {
      const result = await kukaiConnect.connect();
      if (result) {
        commit('setKukaiAddress', result.address);
        commit('setKukaiNetwork', 'mainnet');
      }
      return result;
    },
    async kukaiDisconnect({ commit }: any) {
      await kukaiConnect.disconnect();
      commit('setKukaiAddress', null);
      commit('setKukaiNetwork', null);
    },
    async kukaiSignAndSubmit(_: any, { transaction }: { transaction: any }) {
      return await kukaiConnect.signAndSubmit(transaction);
    },
    async kukaiSignTransaction(_: any, { transaction }: { transaction: any }) {
      return await kukaiConnect.signTransaction(transaction);
    },
    async kukaiSignMessage(_: any, { message }: { message: string }) {
      return await kukaiConnect.signMessage(message);
    },
    async kukaiGetAddress(_: any) {
      return await kukaiConnect.getAddress();
    },
    async kukaiIsConnected(_: any) {
      return await kukaiConnect.isConnected();
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

      // Disconnect Temple
      if (state.templeConnect.isConnected) {
        await dispatch('templeDisconnect');
      }

      // Disconnect Kukai
      if (state.kukaiConnect.isConnected) {
        await dispatch('kukaiDisconnect');
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
