/**
 * Bitcoin Web3 Connection Module
 * 
 * Vuex/Pinia module for managing BTC web3 connections
 * (WalletConnect and Bitcoin Core RPC)
 */

import walletConnect from './utils/walletConnect';
import bitcoinCoreRPC from './utils/bitcoinCoreRPC';

const initState = () => ({
  walletConnect: {
    web3wallet: null,
    sessions: {}
  },
  bitcoinCoreRPC: {
    client: null,
    config: null,
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
    setBitcoinCoreRPC(state: any, client: any) {
      state.bitcoinCoreRPC.client = client;
      state.bitcoinCoreRPC.isConnected = client !== null;
    },
    setBitcoinCoreRPCConfig(state: any, config: any) {
      state.bitcoinCoreRPC.config = config;
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
          wallet = rootGetters['wallets/getWalletByAddress']('btc', address);
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

    // Bitcoin Core RPC Actions
    async bitcoinCoreRPCInit({ commit }: any, { modal, gtag, dispatch, config }: any) {
      const client = await bitcoinCoreRPC.initClient(modal, gtag, dispatch, config);
      commit('setBitcoinCoreRPC', client);
      commit('setBitcoinCoreRPCConfig', config);
      return client;
    },
    async bitcoinCoreRPCCall(_: any, { method, params }: { method: string; params: any[] }) {
      return await bitcoinCoreRPC.rpcCall(method, params);
    },
    async bitcoinCoreGetWalletInfo(_: any) {
      return await bitcoinCoreRPC.getWalletInfo();
    },
    async bitcoinCoreGetNewAddress(_: any, { addressType }: { addressType: 'legacy' | 'p2sh-segwit' | 'bech32' }) {
      return await bitcoinCoreRPC.getNewAddress(addressType);
    },
    async bitcoinCoreGetBalance(_: any, { minconf }: { minconf?: number }) {
      return await bitcoinCoreRPC.getBalance(minconf);
    },
    async bitcoinCoreListUnspent(_: any, { minconf, maxconf, addresses }: { minconf?: number; maxconf?: number; addresses?: string[] }) {
      return await bitcoinCoreRPC.listUnspent(minconf, maxconf, addresses);
    },
    async bitcoinCoreSendToAddress(_: any, { address, amount, comment }: { address: string; amount: number; comment?: string }) {
      return await bitcoinCoreRPC.sendToAddress(address, amount, comment);
    },
    async bitcoinCoreCreateRawTransaction(_: any, { inputs, outputs }: { inputs: any[]; outputs: any[] }) {
      return await bitcoinCoreRPC.createRawTransaction(inputs, outputs);
    },
    async bitcoinCoreSignRawTransaction(_: any, { hexstring }: { hexstring: string }) {
      return await bitcoinCoreRPC.signRawTransactionWithWallet(hexstring);
    },
    async bitcoinCoreSendRawTransaction(_: any, { hexstring }: { hexstring: string }) {
      return await bitcoinCoreRPC.sendRawTransaction(hexstring);
    },
    async bitcoinCoreGetTransaction(_: any, { txid, includeWatchonly }: { txid: string; includeWatchonly?: boolean }) {
      return await bitcoinCoreRPC.getTransaction(txid, includeWatchonly);
    },
    async bitcoinCoreGetBlockCount(_: any) {
      return await bitcoinCoreRPC.getBlockCount();
    },
    async bitcoinCoreGetBlockHash(_: any, { height }: { height: number }) {
      return await bitcoinCoreRPC.getBlockHash(height);
    },
    async bitcoinCoreGetBlock(_: any, { hash, verbosity }: { hash: string; verbosity?: number }) {
      return await bitcoinCoreRPC.getBlock(hash, verbosity);
    },
    async bitcoinCoreEstimateFee(_: any, { blocks }: { blocks?: number }) {
      return await bitcoinCoreRPC.estimateFee(blocks);
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

      // Disconnect Bitcoin Core RPC
      if (state.bitcoinCoreRPC.isConnected) {
        commit('setBitcoinCoreRPC', null);
        commit('setBitcoinCoreRPCConfig', null);
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
