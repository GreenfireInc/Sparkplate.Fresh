/**
 * Terra Web3 Connection Module
 * 
 * Vuex/Pinia module for managing Terra web3 connections
 * (WalletConnect, Terra Station, and Keplr)
 */

import walletConnect from './utils/walletConnect';
import terraStationConnect from './utils/terraStationConnect';
import keplrConnect from './utils/keplrConnect';

const initState = () => ({
  walletConnect: {
    web3wallet: null,
    sessions: {}
  },
  terraStationConnect: {
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
    setTerraStationConnect(state: any, client: any) {
      state.terraStationConnect.client = client;
    },
    setTerraStationAddress(state: any, address: string | null) {
      state.terraStationConnect.address = address;
      state.terraStationConnect.isConnected = address !== null;
    },
    setTerraStationChainId(state: any, chainId: string | null) {
      state.terraStationConnect.chainId = chainId;
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
          wallet = rootGetters['wallets/getWalletByAddress']('luna', address);
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

    // Terra Station Actions
    async terraStationConnectInit({ commit, state }: any, { modal, gtag, dispatch }: any) {
      if (state.terraStationConnect.client) return;

      if (!terraStationConnect.isAvailable()) {
        throw new Error('Terra Station extension not installed');
      }

      const client = await terraStationConnect.initClient(modal, gtag, dispatch);
      commit('setTerraStationConnect', client);

      // Try to get current address if already connected
      const address = await terraStationConnect.getAddress();
      if (address) {
        commit('setTerraStationAddress', address);
        const chainId = await terraStationConnect.getChainId();
        commit('setTerraStationChainId', chainId);
      }

      return client;
    },
    async terraStationConnect({ commit }: any) {
      const result = await terraStationConnect.connect();
      if (result) {
        commit('setTerraStationAddress', result.address);
        commit('setTerraStationChainId', result.chainId);
      }
      return result;
    },
    async terraStationDisconnect({ commit }: any) {
      await terraStationConnect.disconnect();
      commit('setTerraStationAddress', null);
      commit('setTerraStationChainId', null);
    },
    async terraStationSignTransaction(_: any, { transaction }: { transaction: any }) {
      return await terraStationConnect.signTransaction(transaction);
    },
    async terraStationSignMessage(_: any, { message }: { message: string }) {
      return await terraStationConnect.signMessage(message);
    },
    async terraStationGetAddress(_: any) {
      return await terraStationConnect.getAddress();
    },
    async terraStationGetChainId(_: any) {
      return await terraStationConnect.getChainId();
    },
    async terraStationIsOnTerra(_: any) {
      return await terraStationConnect.isOnTerra();
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
    async keplrIsOnTerra(_: any) {
      return await keplrConnect.isOnTerra();
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

      // Disconnect Terra Station
      if (state.terraStationConnect.isConnected) {
        await dispatch('terraStationDisconnect');
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
