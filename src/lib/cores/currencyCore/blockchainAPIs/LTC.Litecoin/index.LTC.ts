// Litecoin (LTC) Blockchain API Index
// Exports all available API implementations
// Note: Litecoin is Bitcoin-based (UTXO model), uses SegWit and MWEB

// Blockchair API (Recommended - Best Free Tier)
// Free tier: 1,000 requests/day without API key
export {
  BlockchairAPI,
  blockchairLTC,
  createBlockchairLTC,
  type BlockchairConfig,
  type BlockchairAddressData,
  type BlockchairTransaction
} from './blockchairAPI.LTC';

// BlockCypher API (Comprehensive with Webhooks)
// Free tier: 3 requests/second, 200 requests/hour
export {
  BlockCypherAPI,
  blockcypherLTC,
  createBlockCypherLTC,
  type BlockCypherConfig,
  type BlockCypherAddress,
  type BlockCypherUTXO,
  type BlockCypherTX
} from './blockcypherAPI.LTC';

// SoChain API (Fast and Reliable)
// Free tier: Free API access
export {
  SoChainAPI,
  sochainLTC,
  type SoChainAddressInfo,
  type SoChainTransaction,
  type SoChainUTXO
} from './sochainAPI.LTC';

// GetBlock API (RPC Node Access)
// Free tier: Free tier available
export {
  GetBlockAPI,
  createGetBlockLTC,
  type GetBlockConfig
} from './getblockAPI.LTC';

// Default export: Blockchair (best free tier)
export { blockchairLTC as default } from './blockchairAPI.LTC';

// Note: Additional APIs from research available as future enhancements:
// - Litecoin Space (official Litecoin Foundation project)
// - Litecoin Block Explorer (litecoinblockexplorer.net)
// - CryptoID/Chainz (detailed blockchain statistics)
// - NOWNodes (full node access, similar to other chains)
// - Tokenview (multi-chain support, similar to other chains)
// - Blockexplorer.com (multi-chain block explorer)

