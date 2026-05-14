// Algorand Blockchain API Index
// Exports all available API implementations
// Note: Algorand is account-based (no UTXOs like Bitcoin)

// AlgoExplorer API (Free, public access)
export { 
  AlgoExplorerAPI,
  algoExplorerMainnet,
  algoExplorerTestnet,
  type AlgoExplorerTransaction,
  type AlgoExplorerAccountInfo,
  type AlgoExplorerTransactionResponse
} from './algoExplorerAPI.ALGO';

// Algorand Node API / Algod (Free via Algonode.io)
export {
  AlgoNodeAPI,
  algoNodeMainnet,
  algoNodeTestnet,
  type AlgodAccountInfo,
  type AlgodTransaction,
  type AlgodConfig
} from './algoNodeAPI.ALGO';

// Algorand Indexer API (Free via Algonode.io)
export {
  AlgoIndexerAPI,
  algoIndexerMainnet,
  algoIndexerTestnet,
  type IndexerTransaction,
  type IndexerAccountInfo,
  type IndexerTransactionsResponse,
  type IndexerConfig
} from './algoIndexerAPI.ALGO';

// PureStake API (25k requests/day with free API key)
export {
  PureStakeAPI,
  type PureStakeConfig,
  type PureStakeAccountInfo,
  type PureStakeTransaction
} from './pureStakeAPI.ALGO';

// Dappflow API (Free with optional API key)
export {
  DappflowAPI,
  dappflowMainnet,
  dappflowTestnet,
  type DappflowAccountInfo,
  type DappflowTransaction,
  type DappflowConfig
} from './dappflowAPI.ALGO';

// Nodely API (Free, supports MainNet/TestNet/BetaNet/FNet)
export {
  NodelyAPI,
  nodelyMainnet,
  nodelyTestnet,
  nodelyBetanet,
  nodelyFnet,
  type NodelyAccountInfo,
  type NodelyTransaction,
  type NodelyNetwork
} from './nodelyAPI.ALGO';

// Default export: AlgoIndexer (most feature-complete for transaction history)
export { algoIndexerMainnet as default } from './algoIndexerAPI.ALGO';

