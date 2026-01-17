/**
 * Waves Web3 Connection Module
 * 
 * Vuex/Pinia module for managing Waves web3 connections
 * (WalletConnect and Waves Keeper)
 */

import walletConnect from './utils/walletConnect';
import wavesKeeperConnect from './utils/wavesKeeperConnect';

const initState = () => ({
  walletConnect: {
    web3wallet: null,
    sessions: {}
  },
  wavesKeeperConnect: {
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
    setWavesKeeperConnect(state: any, client: any) {
      state.wavesKeeperConnect.client = client;
    },
    setWavesKeeperAddress(state: any, address: string | null) {
      state.wavesKeeperConnect.address = address;
      state.wavesKeeperConnect.isConnected = address !== null;
    },
    setWavesKeeperNetwork(state: any, network: string | null) {
      state.wavesKeeperConnect.network = network;
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
          wallet = rootGetters['wallets/getWalletByAddress']('waves', address);
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

    // Waves Keeper Actions
    async wavesKeeperConnectInit({ commit, state }: any, { modal, gtag, dispatch }: any) {
      if (state.wavesKeeperConnect.client) return;

      if (!wavesKeeperConnect.isAvailable()) {
        throw new Error('Waves Keeper extension not installed');
      }

      const client = await wavesKeeperConnect.initClient(modal, gtag, dispatch);
      commit('setWavesKeeperConnect', client);

      // Try to get current address if already connected
      const address = await wavesKeeperConnect.getAddress();
      if (address) {
        commit('setWavesKeeperAddress', address);
      }

      return client;
    },
    async wavesKeeperConnect({ commit }: any) {
      const result = await wavesKeeperConnect.connect();
      if (result) {
        commit('setWavesKeeperAddress', result.address);
        commit('setWavesKeeperNetwork', result.network);
      }
      return result;
    },
    async wavesKeeperDisconnect({ commit }: any) {
      await wavesKeeperConnect.disconnect();
      commit('setWavesKeeperAddress', null);
      commit('setWavesKeeperNetwork', null);
    },
    async wavesKeeperSignAndPublishTransaction(_: any, { transaction }: { transaction: any }) {
      return await wavesKeeperConnect.signAndPublishTransaction(transaction);
    },
    async wavesKeeperSignTransaction(_: any, { transaction }: { transaction: any }) {
      return await wavesKeeperConnect.signTransaction(transaction);
    },
    async wavesKeeperSignMessage(_: any, { message }: { message: string }) {
      return await wavesKeeperConnect.signMessage(message);
    },
    async wavesKeeperSignRequest(_: any, { request }: { request: any }) {
      return await wavesKeeperConnect.signRequest(request);
    },
    async wavesKeeperGetAddress(_: any) {
      return await wavesKeeperConnect.getAddress();
    },
    async wavesKeeperGetPublicState(_: any) {
      return await wavesKeeperConnect.getPublicState();
    },
    async wavesKeeperIsConnected(_: any) {
      return wavesKeeperConnect.isConnected();
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

      // Disconnect Waves Keeper
      if (state.wavesKeeperConnect.isConnected) {
        await dispatch('wavesKeeperDisconnect');
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
