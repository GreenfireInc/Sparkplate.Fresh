/**
 * Ethereum Classic Web3 Connection
 * 
 * Main export for ETC web3 connection mechanisms
 */

export { default as web3ConnectionModule } from './web3ConnectionModule';
export { default as walletConnect } from './utils/walletConnect';
export { default as metamaskConnect } from './utils/metamaskConnect';
export { etcMethods, parseTxFromParams } from './utils/etcRPCMethods';

