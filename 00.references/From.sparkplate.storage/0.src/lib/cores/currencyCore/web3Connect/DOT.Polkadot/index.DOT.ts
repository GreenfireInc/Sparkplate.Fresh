/**
 * Polkadot Web3 Connection
 * 
 * Main export for Polkadot web3 connection mechanisms
 */

export { default as web3ConnectionModule } from './web3ConnectionModule';
export { default as walletConnect } from './utils/walletConnect';
export { default as polkadotjsExtension } from './utils/polkadotjsExtension';
export { dotMethods, parseTransactionFromParams } from './utils/dotRPCMethods';

