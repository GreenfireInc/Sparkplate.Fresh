/**
 * Terra Classic Web3 Connection Module
 * 
 * Vuex/Pinia module for managing Terra Classic web3 connections
 * (WalletConnect, Terra Station Classic, and Keplr)
 */

import walletConnect from './utils/walletConnect';
import terraStationClassicConnect from './utils/terraStationClassicConnect';
import keplrConnect from './utils/keplrConnect';

const initState = () => ({
  walletConnect: {
    web3wallet: null,
    sessions: {}
  },
  terraStationClassicConnect: {
    client: null,
    address: null,
    chainId: null,
    isConnected: false
  },
  keplrConnect: {
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
    setTerraStationClassicConnect(state: any, client: any) {
      state.terraStationClassicConnect.client = client;
    },
    setTerraStationClassicAddress(state: any, address: string | null) {
      state.terraStationClassicConnect.address = address;
      state.terraStationClassicConnect.isConnected = address !== null;
    },
    setTerraStationClassicChainId(state: any, chainId: string | null) {
      state.terraStationClassicConnect.chainId = chainId;
    },
    setKeplrConnect(state: any, client: any) {
      state.keplrConnect.client = client;
    },
    setKeplrAddress(state: any, address: string | null) {
      state.keplrConnect.address = address;
      state.keplrConnect.isConnected = address !== null;
    },
    setKeplrChainId(state: any, chainId: string | null) {
      state.keplrConnect.chainId = chainId;
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
          wallet = rootGetters['wallets/getWalletByAddress']('lunc', address);
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

    // Terra Station Classic Actions
    async terraStationClassicConnectInit({ commit, state }: any, { modal, gtag, dispatch }: any) {
      if (state.terraStationClassicConnect.client) return;

      if (!terraStationClassicConnect.isAvailable()) {
        throw new Error('Terra Station Classic extension not installed');
      }

      const client = await terraStationClassicConnect.initClient(modal, gtag, dispatch);
      commit('setTerraStationClassicConnect', client);

      // Try to get current address if already connected
      const address = await terraStationClassicConnect.getAddress();
      if (address) {
        commit('setTerraStationClassicAddress', address);
        const chainId = await terraStationClassicConnect.getChainId();
        commit('setTerraStationClassicChainId', chainId);
      }

      return client;
    },
    async terraStationClassicConnect({ commit }: any) {
      const result = await terraStationClassicConnect.connect();
      if (result) {
        commit('setTerraStationClassicAddress', result.address);
        commit('setTerraStationClassicChainId', result.chainId);
      }
      return result;
    },
    async terraStationClassicDisconnect({ commit }: any) {
      await terraStationClassicConnect.disconnect();
      commit('setTerraStationClassicAddress', null);
      commit('setTerraStationClassicChainId', null);
    },
    async terraStationClassicSignTransaction(_: any, { transaction }: { transaction: any }) {
      return await terraStationClassicConnect.signTransaction(transaction);
    },
    async terraStationClassicSignMessage(_: any, { message }: { message: string }) {
      return await terraStationClassicConnect.signMessage(message);
    },
    async terraStationClassicGetAddress(_: any) {
      return await terraStationClassicConnect.getAddress();
    },
    async terraStationClassicGetChainId(_: any) {
      return await terraStationClassicConnect.getChainId();
    },
    async terraStationClassicIsOnTerraClassic(_: any) {
      return await terraStationClassicConnect.isOnTerraClassic();
    },

    // Keplr Actions
    async keplrConnectInit({ commit, state }: any, { modal, gtag, dispatch }: any) {
      if (state.keplrConnect.client) return;

      if (!keplrConnect.isAvailable()) {
        throw new Error('Keplr extension not installed');
      }

      const client = await keplrConnect.initClient(modal, gtag, dispatch);
      commit('setKeplrConnect', client);

      // Try to get current address if already connected
      const address = await keplrConnect.getAddress();
      if (address) {
        commit('setKeplrAddress', address);
        const chainId = await keplrConnect.getChainId();
        commit('setKeplrChainId', chainId);
      }

      return client;
    },
    async keplrConnect({ commit }: any, { network }: { network: 'mainnet' | 'testnet' }) {
      const result = await keplrConnect.connect(network);
      if (result) {
        commit('setKeplrAddress', result.address);
        commit('setKeplrChainId', result.chainId);
      }
      return result;
    },
    async keplrDisconnect({ commit }: any) {
      await keplrConnect.disconnect();
      commit('setKeplrAddress', null);
      commit('setKeplrChainId', null);
    },
    async keplrSignAmino(_: any, { chainId, signer, signDoc }: any) {
      return await keplrConnect.signAmino(chainId, signer, signDoc);
    },
    async keplrSignDirect(_: any, { chainId, signer, signDoc }: any) {
      return await keplrConnect.signDirect(chainId, signer, signDoc);
    },
    async keplrSendTx(_: any, { chainId, tx, mode }: any) {
      return await keplrConnect.sendTx(chainId, tx, mode);
    },
    async keplrGetAddress(_: any, { network }: { network: 'mainnet' | 'testnet' }) {
      return await keplrConnect.getAddress(network);
    },
    async keplrGetChainId(_: any) {
      return await keplrConnect.getChainId();
    },
    async keplrIsOnTerraClassic(_: any) {
      return await keplrConnect.isOnTerraClassic();
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

      // Disconnect Terra Station Classic
      if (state.terraStationClassicConnect.isConnected) {
        await dispatch('terraStationClassicDisconnect');
      }

      // Disconnect Keplr
      if (state.keplrConnect.isConnected) {
        await dispatch('keplrDisconnect');
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

