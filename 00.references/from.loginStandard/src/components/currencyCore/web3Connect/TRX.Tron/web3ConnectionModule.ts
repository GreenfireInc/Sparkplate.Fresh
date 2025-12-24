/**
 * Tron Web3 Connection Module
 * 
 * Vuex/Pinia module for managing Tron web3 connections
 * (WalletConnect and TronLink)
 */

import walletConnect from './utils/walletConnect';
import tronLinkConnect from './utils/tronLinkConnect';

const initState = () => ({
  walletConnect: {
    web3wallet: null,
    sessions: {}
  },
  tronLinkConnect: {
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
    setTronLinkConnect(state: any, client: any) {
      state.tronLinkConnect.client = client;
    },
    setTronLinkAddress(state: any, address: string | null) {
      state.tronLinkConnect.address = address;
      state.tronLinkConnect.isConnected = address !== null;
    },
    setTronLinkNetwork(state: any, network: string | null) {
      state.tronLinkConnect.network = network;
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
          wallet = rootGetters['wallets/getWalletByAddress']('trx', address);
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

    // TronLink Actions
    async tronLinkConnectInit({ commit, state }: any, { modal, gtag, dispatch }: any) {
      if (state.tronLinkConnect.client) return;

      if (!tronLinkConnect.isAvailable()) {
        throw new Error('TronLink extension not installed');
      }

      const client = await tronLinkConnect.initClient(modal, gtag, dispatch);
      commit('setTronLinkConnect', client);

      // Try to get current address if already connected
      const address = await tronLinkConnect.getAddress();
      if (address) {
        commit('setTronLinkAddress', address);
      }

      return client;
    },
    async tronLinkConnect({ commit }: any) {
      const result = await tronLinkConnect.connect();
      if (result) {
        commit('setTronLinkAddress', result.address);
        commit('setTronLinkNetwork', 'mainnet');
      }
      return result;
    },
    async tronLinkDisconnect({ commit }: any) {
      await tronLinkConnect.disconnect();
      commit('setTronLinkAddress', null);
      commit('setTronLinkNetwork', null);
    },
    async tronLinkSignTransaction(_: any, { transaction }: { transaction: any }) {
      return await tronLinkConnect.signTransaction(transaction);
    },
    async tronLinkSignMessage(_: any, { message }: { message: string }) {
      return await tronLinkConnect.signMessage(message);
    },
    async tronLinkSendTrx(_: any, { to, amount }: { to: string; amount: number }) {
      return await tronLinkConnect.sendTrx(to, amount);
    },
    async tronLinkGetAddress(_: any) {
      return await tronLinkConnect.getAddress();
    },
    async tronLinkGetTronWeb(_: any) {
      return tronLinkConnect.getTronWeb();
    },
    async tronLinkIsConnected(_: any) {
      return tronLinkConnect.isConnected();
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

      // Disconnect TronLink
      if (state.tronLinkConnect.isConnected) {
        await dispatch('tronLinkDisconnect');
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
