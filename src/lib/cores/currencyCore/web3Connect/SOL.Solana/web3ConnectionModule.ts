/**
 * Solana Web3 Connection Module
 * 
 * Vuex/Pinia module for managing Solana web3 connections
 * (WalletConnect, Phantom, and Solflare)
 */

import walletConnect from './utils/walletConnect';
import phantomConnect from './utils/phantomConnect';
import solflareConnect from './utils/solflareConnect';

const initState = () => ({
  walletConnect: {
    web3wallet: null,
    sessions: {}
  },
  phantomConnect: {
    client: null,
    address: null,
    network: null,
    isConnected: false
  },
  solflareConnect: {
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
    setPhantomConnect(state: any, client: any) {
      state.phantomConnect.client = client;
    },
    setPhantomAddress(state: any, address: string | null) {
      state.phantomConnect.address = address;
      state.phantomConnect.isConnected = address !== null;
    },
    setPhantomNetwork(state: any, network: string | null) {
      state.phantomConnect.network = network;
    },
    setSolflareConnect(state: any, client: any) {
      state.solflareConnect.client = client;
    },
    setSolflareAddress(state: any, address: string | null) {
      state.solflareConnect.address = address;
      state.solflareConnect.isConnected = address !== null;
    },
    setSolflareNetwork(state: any, network: string | null) {
      state.solflareConnect.network = network;
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
          wallet = rootGetters['wallets/getWalletByAddress']('sol', address);
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

    // Phantom Actions
    async phantomConnectInit({ commit, state }: any, { modal, gtag, dispatch }: any) {
      if (state.phantomConnect.client) return;

      if (!phantomConnect.isAvailable()) {
        throw new Error('Phantom extension not installed');
      }

      const client = await phantomConnect.initClient(modal, gtag, dispatch);
      commit('setPhantomConnect', client);

      // Try to get current address if already connected
      const address = await phantomConnect.getAddress();
      if (address) {
        commit('setPhantomAddress', address);
      }

      return client;
    },
    async phantomConnect({ commit }: any) {
      const result = await phantomConnect.connect();
      if (result) {
        commit('setPhantomAddress', result.address);
        commit('setPhantomNetwork', 'mainnet-beta');
      }
      return result;
    },
    async phantomDisconnect({ commit }: any) {
      await phantomConnect.disconnect();
      commit('setPhantomAddress', null);
      commit('setPhantomNetwork', null);
    },
    async phantomSignTransaction(_: any, { transaction }: { transaction: any }) {
      return await phantomConnect.signTransaction(transaction);
    },
    async phantomSignAllTransactions(_: any, { transactions }: { transactions: any[] }) {
      return await phantomConnect.signAllTransactions(transactions);
    },
    async phantomSignMessage(_: any, { message, display }: { message: Uint8Array; display?: string }) {
      return await phantomConnect.signMessage(message, display);
    },
    async phantomGetAddress(_: any) {
      return await phantomConnect.getAddress();
    },
    async phantomIsConnected(_: any) {
      return phantomConnect.isConnected();
    },

    // Solflare Actions
    async solflareConnectInit({ commit, state }: any, { modal, gtag, dispatch }: any) {
      if (state.solflareConnect.client) return;

      if (!solflareConnect.isAvailable()) {
        throw new Error('Solflare extension not installed');
      }

      const client = await solflareConnect.initClient(modal, gtag, dispatch);
      commit('setSolflareConnect', client);

      // Try to get current address if already connected
      const address = await solflareConnect.getAddress();
      if (address) {
        commit('setSolflareAddress', address);
      }

      return client;
    },
    async solflareConnect({ commit }: any) {
      const result = await solflareConnect.connect();
      if (result) {
        commit('setSolflareAddress', result.address);
        commit('setSolflareNetwork', 'mainnet-beta');
      }
      return result;
    },
    async solflareDisconnect({ commit }: any) {
      await solflareConnect.disconnect();
      commit('setSolflareAddress', null);
      commit('setSolflareNetwork', null);
    },
    async solflareSignTransaction(_: any, { transaction }: { transaction: any }) {
      return await solflareConnect.signTransaction(transaction);
    },
    async solflareSignAllTransactions(_: any, { transactions }: { transactions: any[] }) {
      return await solflareConnect.signAllTransactions(transactions);
    },
    async solflareSignMessage(_: any, { message, display }: { message: Uint8Array; display?: string }) {
      return await solflareConnect.signMessage(message, display);
    },
    async solflareGetAddress(_: any) {
      return await solflareConnect.getAddress();
    },
    async solflareIsConnected(_: any) {
      return solflareConnect.isConnected();
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

      // Disconnect Phantom
      if (state.phantomConnect.isConnected) {
        await dispatch('phantomDisconnect');
      }

      // Disconnect Solflare
      if (state.solflareConnect.isConnected) {
        await dispatch('solflareDisconnect');
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

