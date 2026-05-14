/**
 * Stacks Web3 Connection Module
 * 
 * Vuex/Pinia module for managing Stacks web3 connections
 * (WalletConnect, Leather, and Xverse)
 */

import walletConnect from './utils/walletConnect';
import leatherConnect from './utils/leatherConnect';
import xverseConnect from './utils/xverseConnect';

const initState = () => ({
  walletConnect: {
    web3wallet: null,
    sessions: {}
  },
  leatherConnect: {
    client: null,
    address: null,
    network: null,
    isConnected: false
  },
  xverseConnect: {
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
    setLeatherConnect(state: any, client: any) {
      state.leatherConnect.client = client;
    },
    setLeatherAddress(state: any, address: string | null) {
      state.leatherConnect.address = address;
      state.leatherConnect.isConnected = address !== null;
    },
    setLeatherNetwork(state: any, network: string | null) {
      state.leatherConnect.network = network;
    },
    setXverseConnect(state: any, client: any) {
      state.xverseConnect.client = client;
    },
    setXverseAddress(state: any, address: string | null) {
      state.xverseConnect.address = address;
      state.xverseConnect.isConnected = address !== null;
    },
    setXverseNetwork(state: any, network: string | null) {
      state.xverseConnect.network = network;
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
          wallet = rootGetters['wallets/getWalletByAddress']('stx', address);
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

    // Leather Actions
    async leatherConnectInit({ commit, state }: any, { modal, gtag, dispatch }: any) {
      if (state.leatherConnect.client) return;

      if (!leatherConnect.isAvailable()) {
        throw new Error('Leather extension not installed');
      }

      const client = await leatherConnect.initClient(modal, gtag, dispatch);
      commit('setLeatherConnect', client);

      // Try to get current address if already connected
      const address = await leatherConnect.getAddress();
      if (address) {
        commit('setLeatherAddress', address);
      }

      return client;
    },
    async leatherConnect({ commit }: any) {
      const result = await leatherConnect.connect();
      if (result) {
        commit('setLeatherAddress', result.address);
        commit('setLeatherNetwork', 'mainnet');
      }
      return result;
    },
    async leatherDisconnect({ commit }: any) {
      await leatherConnect.disconnect();
      commit('setLeatherAddress', null);
      commit('setLeatherNetwork', null);
    },
    async leatherSignTransaction(_: any, { transaction }: { transaction: any }) {
      return await leatherConnect.signTransaction(transaction);
    },
    async leatherSignMessage(_: any, { message }: { message: string }) {
      return await leatherConnect.signMessage(message);
    },
    async leatherGetAddress(_: any) {
      return await leatherConnect.getAddress();
    },
    async leatherIsConnected(_: any) {
      return leatherConnect.isConnected();
    },

    // Xverse Actions
    async xverseConnectInit({ commit, state }: any, { modal, gtag, dispatch }: any) {
      if (state.xverseConnect.client) return;

      if (!xverseConnect.isAvailable()) {
        throw new Error('Xverse extension not installed');
      }

      const client = await xverseConnect.initClient(modal, gtag, dispatch);
      commit('setXverseConnect', client);

      // Try to get current address if already connected
      const address = await xverseConnect.getAddress();
      if (address) {
        commit('setXverseAddress', address);
      }

      return client;
    },
    async xverseConnect({ commit }: any) {
      const result = await xverseConnect.connect();
      if (result) {
        commit('setXverseAddress', result.address);
        commit('setXverseNetwork', 'mainnet');
      }
      return result;
    },
    async xverseDisconnect({ commit }: any) {
      await xverseConnect.disconnect();
      commit('setXverseAddress', null);
      commit('setXverseNetwork', null);
    },
    async xverseSignTransaction(_: any, { transaction }: { transaction: any }) {
      return await xverseConnect.signTransaction(transaction);
    },
    async xverseSignMessage(_: any, { message }: { message: string }) {
      return await xverseConnect.signMessage(message);
    },
    async xverseGetAddress(_: any) {
      return await xverseConnect.getAddress();
    },
    async xverseIsConnected(_: any) {
      return xverseConnect.isConnected();
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

      // Disconnect Leather
      if (state.leatherConnect.isConnected) {
        await dispatch('leatherDisconnect');
      }

      // Disconnect Xverse
      if (state.xverseConnect.isConnected) {
        await dispatch('xverseDisconnect');
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

