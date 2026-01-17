/**
 * Stellar Web3 Connection Module
 * 
 * Vuex/Pinia module for managing Stellar web3 connections
 * (WalletConnect, Freighter, and Albedo)
 */

import walletConnect from './utils/walletConnect';
import freighterConnect from './utils/freighterConnect';
import albedoConnect from './utils/albedoConnect';

const initState = () => ({
  walletConnect: {
    web3wallet: null,
    sessions: {}
  },
  freighterConnect: {
    client: null,
    address: null,
    network: null,
    isConnected: false
  },
  albedoConnect: {
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
    setFreighterConnect(state: any, client: any) {
      state.freighterConnect.client = client;
    },
    setFreighterAddress(state: any, address: string | null) {
      state.freighterConnect.address = address;
      state.freighterConnect.isConnected = address !== null;
    },
    setFreighterNetwork(state: any, network: string | null) {
      state.freighterConnect.network = network;
    },
    setAlbedoConnect(state: any, client: any) {
      state.albedoConnect.client = client;
    },
    setAlbedoAddress(state: any, address: string | null) {
      state.albedoConnect.address = address;
      state.albedoConnect.isConnected = address !== null;
    },
    setAlbedoNetwork(state: any, network: string | null) {
      state.albedoConnect.network = network;
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
          wallet = rootGetters['wallets/getWalletByAddress']('xlm', address);
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

    // Freighter Actions
    async freighterConnectInit({ commit, state }: any, { modal, gtag, dispatch }: any) {
      if (state.freighterConnect.client) return;

      if (!freighterConnect.isAvailable()) {
        throw new Error('Freighter extension not installed');
      }

      const client = await freighterConnect.initClient(modal, gtag, dispatch);
      commit('setFreighterConnect', client);

      // Try to get current address if already connected
      const address = await freighterConnect.getAddress();
      if (address) {
        commit('setFreighterAddress', address);
      }

      return client;
    },
    async freighterConnect({ commit }: any) {
      const result = await freighterConnect.connect();
      if (result) {
        commit('setFreighterAddress', result.address);
        commit('setFreighterNetwork', 'mainnet');
      }
      return result;
    },
    async freighterDisconnect({ commit }: any) {
      await freighterConnect.disconnect();
      commit('setFreighterAddress', null);
      commit('setFreighterNetwork', null);
    },
    async freighterSignTransaction(_: any, { xdr, network }: { xdr: string; network?: string }) {
      return await freighterConnect.signTransaction(xdr, network);
    },
    async freighterSignMessage(_: any, { message }: { message: string }) {
      return await freighterConnect.signMessage(message);
    },
    async freighterGetAddress(_: any) {
      return await freighterConnect.getAddress();
    },
    async freighterIsConnected(_: any) {
      return await freighterConnect.isConnected();
    },

    // Albedo Actions
    async albedoConnectInit({ commit, state }: any, { modal, gtag, dispatch }: any) {
      if (state.albedoConnect.client) return;

      if (!albedoConnect.isAvailable()) {
        throw new Error('Albedo not available');
      }

      const client = await albedoConnect.initClient(modal, gtag, dispatch);
      commit('setAlbedoConnect', client);

      // Try to get current address if already connected
      const address = await albedoConnect.getAddress();
      if (address) {
        commit('setAlbedoAddress', address);
      }

      return client;
    },
    async albedoConnect({ commit }: any) {
      const result = await albedoConnect.connect();
      if (result) {
        commit('setAlbedoAddress', result.address);
        commit('setAlbedoNetwork', 'mainnet');
      }
      return result;
    },
    async albedoDisconnect({ commit }: any) {
      await albedoConnect.disconnect();
      commit('setAlbedoAddress', null);
      commit('setAlbedoNetwork', null);
    },
    async albedoSignTransaction(_: any, { xdr, network }: { xdr: string; network?: string }) {
      return await albedoConnect.signTransaction(xdr, network);
    },
    async albedoSignMessage(_: any, { message }: { message: string }) {
      return await albedoConnect.signMessage(message);
    },
    async albedoGetAddress(_: any) {
      return await albedoConnect.getAddress();
    },
    async albedoIsConnected(_: any) {
      return albedoConnect.isConnected();
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

      // Disconnect Freighter
      if (state.freighterConnect.isConnected) {
        await dispatch('freighterDisconnect');
      }

      // Disconnect Albedo
      if (state.albedoConnect.isConnected) {
        await dispatch('albedoDisconnect');
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
