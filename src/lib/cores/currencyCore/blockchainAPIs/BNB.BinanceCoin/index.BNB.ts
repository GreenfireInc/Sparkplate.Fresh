// BNB (Binance Smart Chain) Blockchain API Index
// Exports all available API implementations
// Note: BNB Smart Chain is EVM-compatible (account-based, not UTXO)

// BscScan API (Official BSC Explorer)
// Free tier: ~5 calls/sec, ~100,000 calls/day (requires free API key)
export {
  BscScanAPI,
  type BscScanAccountBalance,
  type BscScanTransaction,
  type BscScanTokenTransfer,
  type BscScanConfig
} from './bscscanAPI.BNB';

// Public RPC API (Official Binance nodes + community providers)
// Free public access with multiple endpoints
export {
  PublicRPCAPI,
  publicRPCMainnet,
  publicRPCTestnet,
  createPublicRPCAPI,
  type RPCTransaction,
  type RPCTransactionReceipt,
  type RPCBlock,
  type RPCNetwork
} from './publicRPCAPI.BNB';

// Ankr API (Free RPC provider)
// Free tier with rate limits
export {
  AnkrAPI,
  ankrMainnet,
  ankrTestnet,
  type AnkrConfig
} from './ankrAPI.BNB';

// 1RPC API (Privacy-focused free RPC)
// Free public access, no API key required
export {
  OneRPCAPI,
  oneRPCMainnet,
  oneRPCTestnet
} from './oneRPCAPI.BNB';

// NOWNodes API (Full-node access)
// Free tier available with API key
export {
  NOWNodesAPI,
  type NOWNodesConfig
} from './nowNodesAPI.BNB';

// Bitquery API (GraphQL-based blockchain data)
// Free tier available with optional API key
export {
  BitqueryAPI,
  bitqueryMainnet,
  bitqueryTestnet,
  type BitqueryConfig,
  type BitqueryBalance,
  type BitqueryTransaction
} from './bitqueryAPI.BNB';

// Default export: Public RPC (most accessible, no API key needed)
export { publicRPCMainnet as default } from './publicRPCAPI.BNB';

