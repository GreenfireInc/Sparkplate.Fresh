/**
 * Arweave Web3 Connection Module
 * 
 * Vuex/Pinia module for managing Arweave web3 connections
 * (WalletConnect and ArConnect)
 */

import walletConnect from './utils/walletConnect';
import arConnect from './utils/arConnect';

const initState = () => ({
  walletConnect: {
    web3wallet: null,
    sessions: {}
  },
  arConnect: {
    client: null,
    address: null,
    permissions: [],
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
    setArConnect(state: any, client: any) {
      state.arConnect.client = client;
    },
    setArConnectAddress(state: any, address: string | null) {
      state.arConnect.address = address;
      state.arConnect.isConnected = address !== null;
    },
    setArConnectPermissions(state: any, permissions: string[]) {
      state.arConnect.permissions = permissions;
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
          wallet = rootGetters['wallets/getWalletByAddress']('ar', address);
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

    // ArConnect Actions
    async arConnectInit({ commit, state }: any, { modal, gtag, dispatch }: any) {
      if (state.arConnect.client) return;

      if (!arConnect.isAvailable()) {
        throw new Error('ArConnect extension not installed');
      }

      const client = await arConnect.initClient(modal, gtag, dispatch);
      commit('setArConnect', client);

      // Try to get active address if already connected
      const address = await arConnect.getActiveAddress();
      if (address) {
        commit('setArConnectAddress', address);
        const permissions = await arConnect.getPermissions();
        commit('setArConnectPermissions', permissions);
      }

      return client;
    },
    async arConnectConnect({ commit }: any, { permissions }: { permissions?: string[] }) {
      const result = await arConnect.connect(permissions);
      if (result) {
        commit('setArConnectAddress', result.address);
        commit('setArConnectPermissions', result.permissions);
      }
      return result;
    },
    async arConnectDisconnect({ commit }: any) {
      await arConnect.disconnect();
      commit('setArConnectAddress', null);
      commit('setArConnectPermissions', []);
    },
    async arConnectSignTransaction(_: any, { transaction, options }: { transaction: any; options?: any }) {
      return await arConnect.signTransaction(transaction, options);
    },
    async arConnectDispatchTransaction(_: any, { transaction }: { transaction: any }) {
      return await arConnect.dispatchTransaction(transaction);
    },
    async arConnectGetAddress(_: any) {
      return await arConnect.getActiveAddress();
    },
    async arConnectGetAllAddresses(_: any) {
      return await arConnect.getAllAddresses();
    },
    async arConnectAddToken(_: any, { tokenId }: { tokenId: string }) {
      return await arConnect.addToken(tokenId);
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

      // Disconnect ArConnect
      if (state.arConnect.isConnected) {
        await dispatch('arConnectDisconnect');
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
