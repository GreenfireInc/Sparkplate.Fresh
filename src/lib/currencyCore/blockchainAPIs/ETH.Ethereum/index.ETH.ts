// Ethereum (ETH) Blockchain API Index
// Exports all available API implementations
// Note: Ethereum is account-based (not UTXO-based like Bitcoin)

// Etherscan API (Recommended - Most Popular & Comprehensive)
// Free tier: 5 calls/second (requires API key)
export {
  EtherscanAPI,
  createEtherscanMainnet,
  createEtherscanGoerli,
  createEtherscanSepolia,
  type EtherscanConfig,
  type EtherscanAddressBalance,
  type EtherscanTransaction,
  type EtherscanTokenTransfer,
  type EtherscanGasOracle
} from './etherscanAPI.ETH';

// Infura API (Node Provider by Consensys)
// Free tier: 100,000 requests/day
export {
  InfuraAPI,
  createInfuraMainnet,
  createInfuraGoerli,
  createInfuraSepolia,
  type InfuraConfig,
  type InfuraTransaction,
  type InfuraTransactionReceipt,
  type InfuraBlock
} from './infuraAPI.ETH';

// Alchemy API (Enterprise-grade Node Infrastructure)
// Free tier: 300M compute units/month
export {
  AlchemyAPI,
  createAlchemyMainnet,
  createAlchemyGoerli,
  createAlchemySepolia,
  createAlchemyPolygon,
  createAlchemyArbitrum,
  createAlchemyOptimism,
  type AlchemyConfig,
  type AlchemyAssetTransfer,
  type AlchemyNFT
} from './alchemyAPI.ETH';

// Blockscout API (Open-source, Etherscan-compatible)
// Free tier: Unlimited (open-source)
export {
  BlockscoutAPI,
  blockscoutMainnet,
  blockscoutGoerli,
  blockscoutSepolia,
  type BlockscoutTransaction,
  type BlockscoutTokenTransfer
} from './blockscoutAPI.ETH';

// Ethplorer API (ERC20 Token Tracking Specialist)
// Free tier: Limited (freekey available)
export {
  EthplorerAPI,
  ethplorer,
  createEthplorer,
  type EthplorerConfig,
  type EthplorerAddressInfo,
  type EthplorerTokenInfo
} from './ethplorerAPI.ETH';

// QuickNode API (High-performance RPC)
// Free tier: Trial available
export {
  QuickNodeAPI,
  createQuickNode,
  type QuickNodeConfig
} from './quicknodeAPI.ETH';

// GetBlock API (Instant Node Access)
// Free tier: Available
export {
  GetBlockAPI,
  createGetBlockMainnet,
  createGetBlockGoerli,
  createGetBlockSepolia,
  type GetBlockConfig
} from './getblockAPI.ETH';

// Default export: Etherscan (most comprehensive for explorers)
// Note: Infura/Alchemy better for direct node access/RPC calls
export { createEtherscanMainnet as default } from './etherscanAPI.ETH';

// Note: Additional APIs from research can be implemented as needed:
// - Beaconcha.in - Ethereum 2.0 beacon chain explorer
// - Blockchain.com - Multi-chain explorer
// - Tokenview - Multi-chain support (similar to BTC/DOGE implementations)
// - BlockCypher - Unified blockchain API (similar to BTC implementation)
// - Blockchair - Analytics platform (similar to BTC/DOGE implementations)

