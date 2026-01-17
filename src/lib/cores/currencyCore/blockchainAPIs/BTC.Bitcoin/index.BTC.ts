// Bitcoin (BTC) Blockchain API Index
// Exports all available API implementations
// Note: Bitcoin is UTXO-based (not account-based like Ethereum)

// Blockstream API (Recommended - Free, open source, tracking-free)
// Supports mainnet, testnet, and Liquid network
export {
  BlockstreamAPI,
  blockstreamMainnet,
  blockstreamTestnet,
  blockstreamLiquid,
  type BlockstreamTransaction,
  type BlockstreamUTXO,
  type BlockstreamAddressInfo,
  type BlockstreamNetwork
} from './blockstreamAPI.BTC';

// Blockchain.com API (Trusted, oldest Bitcoin API)
// Free tier with rate limits
export {
  BlockchainComAPI,
  blockchainCom,
  type BlockchainComAddress,
  type BlockchainComBalance,
  type BlockchainComUTXO
} from './blockchainComAPI.BTC';

// BlockCypher API (Unified blockchain API with webhooks support)
// Free tier: 3 requests/second (non-registered), 200 requests/hour
export {
  BlockCypherAPI,
  blockcypherMainnet,
  blockcypherTestnet,
  type BlockCypherAddress,
  type BlockCypherTX,
  type BlockCypherUTXO,
  type BlockCypherConfig
} from './blockcypherAPI.BTC';

// Bitaps API (Modern API with extensive features)
// Free tier: No API key required, rate limits apply
export {
  BitapsAPI,
  bitapsMainnet,
  bitapsTestnet,
  type BitapsAddressInfo,
  type BitapsTransaction,
  type BitapsUTXO
} from './bitapsAPI.BTC';

// Tokenview API (Multi-chain blockchain API)
// Free tier: 100 requests/day, requires API key
export {
  TokenviewAPI,
  type TokenviewConfig,
  type TokenviewAddressInfo,
  type TokenviewTransaction,
  type TokenviewUTXO
} from './tokenviewAPI.BTC';

// NOWNodes API (Multi-chain blockchain API with full node access)
// Free tier: 5,000 requests/month (requires API key)
export {
  NOWNodesAPI,
  type NOWNodesConfig,
  type NOWNodesAddressInfo,
  type NOWNodesTransaction,
  type NOWNodesUTXO
} from './nowNodesAPI.BTC';

// Blast API (High-performance multi-chain infrastructure)
// Free tier: 12M requests/month (requires API key)
export {
  BlastAPI,
  blastMainnet,
  blastTestnet,
  type BlastAPIConfig,
  type BlastBlockInfo,
  type BlastTransaction,
  type BlastRPCRequest,
  type BlastRPCResponse
} from './blastAPI.BTC';

// SoChain API (Simple and reliable blockchain API)
// Free tier: 300 requests/minute (no API key required)
export {
  SoChainAPI,
  sochainMainnet,
  sochainTestnet,
  type SoChainAddressInfo,
  type SoChainTransaction,
  type SoChainUTXO
} from './sochainAPI.BTC';

// Default export: Blockstream (most reliable, tracking-free)
export { blockstreamMainnet as default } from './blockstreamAPI.BTC';

