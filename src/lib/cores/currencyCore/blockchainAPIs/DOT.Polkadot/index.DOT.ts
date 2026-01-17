// Polkadot (DOT) Blockchain API Index
// Exports all available API implementations
// Note: Polkadot is account-based using Substrate framework

// Subscan API (Recommended - Most Comprehensive)
// Free tier: Free with API key, quotas apply
export {
  SubscanAPI,
  subscanPolkadot,
  subscanKusama,
  subscanWestend,
  createSubscan,
  type SubscanConfig,
  type SubscanAccountInfo,
  type SubscanTransaction,
  type SubscanTransfer,
  type SubscanBlock
} from './subscanAPI.DOT';

// Polkadot.js API (Official Library)
// Free tier: Completely free and open-source
export {
  PolkadotjsAPI,
  createPolkadotjs,
  createKusamajs,
  createWestendjs,
  type PolkadotjsConfig,
  type PolkadotjsAccountInfo,
  type PolkadotjsBlock
} from './polkadotjsAPI.DOT';

// Statescan API (Substrate Explorer)
// Free tier: Free access
export {
  StatescanAPI,
  statescanPolkadot,
  statescanKusama,
  statescanWestend,
  type StatescanAccountInfo,
  type StatescanTransfer,
  type StatescanExtrinsic
} from './statescanAPI.DOT';

// GetBlock API (Node Access)
// Free tier: Free tier available
export {
  GetBlockAPI,
  createGetBlockPolkadot,
  createGetBlockKusama,
  type GetBlockConfig
} from './getblockAPI.DOT';

// NOWNodes API (Full Node Access)
// Free tier: Free API key available
export {
  NOWNodesAPI,
  createNOWNodesPolkadot,
  createNOWNodesKusama,
  type NOWNodesConfig
} from './nownodesAPI.DOT';

// Tokenview API (Multi-chain Explorer)
// Free tier: Free tier available
export {
  TokenviewAPI,
  createTokenviewPolkadot,
  createTokenviewKusama,
  type TokenviewConfig,
  type TokenviewAccountInfo,
  type TokenviewTransaction
} from './tokenviewAPI.DOT';

// 3xpl API (Multi-chain Explorer)
// Free tier: Free tier available
export {
  ThreeXplAPI,
  threexplPolkadot,
  threexplKusama,
  type ThreeXplAccountInfo,
  type ThreeXplTransaction
} from './3xplAPI.DOT';

// Polkascan API (Substrate Chain Explorer)
// Free tier: Free access
export {
  PolkascanAPI,
  polkascanPolkadot,
  polkascanKusama,
  type PolkascanAccountInfo,
  type PolkascanExtrinsic,
  type PolkascanBlock
} from './polkascanAPI.DOT';

// Default export: Subscan (most comprehensive)
// Note: Polkadot.js is the official library for full blockchain interaction
export { subscanPolkadot as default } from './subscanAPI.DOT';

