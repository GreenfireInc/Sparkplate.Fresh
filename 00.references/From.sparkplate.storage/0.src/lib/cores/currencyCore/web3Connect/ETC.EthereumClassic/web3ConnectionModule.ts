/**
 * Ethereum Classic Web3 Connection Module
 * 
 * Vuex/Pinia module for managing ETC web3 connections
 * (WalletConnect and MetaMask)
 */

import walletConnect from './utils/walletConnect';
import metamaskConnect from './utils/metamaskConnect';

const initState = () => ({
  walletConnect: {
    web3wallet: null,
    sessions: {}
  },
  metamaskConnect: {
    client: null,
    address: null,
    chainId: null,
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
    setMetaMaskConnect(state: any, client: any) {
      state.metamaskConnect.client = client;
    },
    setMetaMaskAddress(state: any, address: string | null) {
      state.metamaskConnect.address = address;
      state.metamaskConnect.isConnected = address !== null;
    },
    setMetaMaskChainId(state: any, chainId: string | null) {
      state.metamaskConnect.chainId = chainId;
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
          wallet = rootGetters['wallets/getWalletByAddress']('etc', address);
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

    // MetaMask Actions
    async metamaskConnectInit({ commit, state }: any, { modal, gtag, dispatch }: any) {
      if (state.metamaskConnect.client) return;

      if (!metamaskConnect.isAvailable()) {
        throw new Error('MetaMask extension not installed');
      }

      const client = await metamaskConnect.initClient(modal, gtag, dispatch);
      commit('setMetaMaskConnect', client);

      // Try to get current address if already connected
      const address = await metamaskConnect.getAddress();
      if (address) {
        commit('setMetaMaskAddress', address);
        const chainId = await metamaskConnect.getChainId();
        commit('setMetaMaskChainId', chainId);
      }

      return client;
    },
    async metamaskConnect({ commit }: any) {
      const result = await metamaskConnect.connect();
      if (result) {
        commit('setMetaMaskAddress', result.address);
        commit('setMetaMaskChainId', result.chainId);
      }
      return result;
    },
    async metamaskDisconnect({ commit }: any) {
      await metamaskConnect.disconnect();
      commit('setMetaMaskAddress', null);
      commit('setMetaMaskChainId', null);
    },
    async metamaskSwitchToETC(_: any, { network }: { network: 'mainnet' | 'testnet' }) {
      return await metamaskConnect.switchToETC(network);
    },
    async metamaskSignTransaction(_: any, { transaction }: { transaction: any }) {
      return await metamaskConnect.signTransaction(transaction);
    },
    async metamaskSignMessage(_: any, { message }: { message: string }) {
      return await metamaskConnect.signMessage(message);
    },
    async metamaskSignTypedData(_: any, { typedData }: { typedData: any }) {
      return await metamaskConnect.signTypedData(typedData);
    },
    async metamaskGetAddress(_: any) {
      return await metamaskConnect.getAddress();
    },
    async metamaskGetChainId(_: any) {
      return await metamaskConnect.getChainId();
    },
    async metamaskIsOnETC(_: any) {
      return await metamaskConnect.isOnETC();
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

      // Disconnect MetaMask
      if (state.metamaskConnect.isConnected) {
        await dispatch('metamaskDisconnect');
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

