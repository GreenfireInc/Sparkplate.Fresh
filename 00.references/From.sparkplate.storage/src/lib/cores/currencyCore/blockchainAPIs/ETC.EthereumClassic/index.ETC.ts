// Ethereum Classic (ETC) Blockchain API Index
// Exports all available API implementations
// Note: ETC is EVM-compatible, uses same address format as Ethereum

// Blockscout API (Recommended - Official ETC Explorer)
// Free tier: Free and open-source
export {
  BlockscoutAPI,
  blockscoutETC,
  type BlockscoutTransaction,
  type BlockscoutTokenTransfer,
  type BlockscoutBlock
} from './blockscoutAPI.ETC';

// BlockCypher API (Comprehensive with Webhooks)
// Free tier: 3 requests/second without API key
export {
  BlockCypherAPI,
  blockcypherETC,
  createBlockCypherETC,
  type BlockCypherConfig,
  type BlockCypherAddress,
  type BlockCypherTX
} from './blockcypherAPI.ETC';

// Blockchair API (Analytics Platform)
// Free tier: 1,000 requests/day without API key
export {
  BlockchairAPI,
  blockchairETC,
  createBlockchairETC,
  type BlockchairConfig,
  type BlockchairAddressData,
  type BlockchairTransaction
} from './blockchairAPI.ETC';

// GetBlock API (RPC Node Access)
// Free tier: Free tier available
export {
  GetBlockAPI,
  createGetBlockETC,
  type GetBlockConfig
} from './getblockAPI.ETC';

// NOWNodes API (Full Node Access)
// Free tier: Free API key available
export {
  NOWNodesAPI,
  createNOWNodesETC,
  type NOWNodesConfig
} from './nownodesAPI.ETC';

// Tokenview API (Multi-chain Explorer)
// Free tier: Free tier available
export {
  TokenviewAPI,
  createTokenviewETC,
  type TokenviewConfig,
  type TokenviewAccountInfo,
  type TokenviewTransaction
} from './tokenviewAPI.ETC';

// Default export: Blockscout (official ETC explorer)
export { blockscoutETC as default } from './blockscoutAPI.ETC';

// Note: Additional APIs from research available as future enhancements:
// - Expedition Explorer (self-hostable, open-source)
// - BlockExplorer.one (multi-chain support)
// - CryptoAPIs (unified blockchain API)
// - Trezor ETC Explorer (wallet-focused, Blockbook-based)

