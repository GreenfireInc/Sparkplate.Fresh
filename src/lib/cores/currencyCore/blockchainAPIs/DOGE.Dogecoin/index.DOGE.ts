// Dogecoin (DOGE) Blockchain API Index
// Exports all available API implementations
// Note: Dogecoin is UTXO-based (similar to Bitcoin)

// Dogechain.info API (Recommended - Oldest and most established)
// One of the original Dogecoin explorers with free developer API
export {
  DogechainAPI,
  dogechainMainnet,
  dogechainTestnet,
  type DogechainAddressInfo,
  type DogechainTransaction,
  type DogechainUTXO
} from './dogechainAPI.DOGE';

// BlockCypher API (Advanced features with webhooks)
// Free tier: 3 requests/second, 200 requests/hour
export {
  BlockCypherDogeAPI,
  blockcypherDogeMainnet,
  blockcypherDogeTestnet,
  type BlockCypherConfig,
  type BlockCypherDogeAddress,
  type BlockCypherDogeTX
} from './blockcypherAPI.DOGE';

// Blockchair API (Fast and reliable)
// Free tier: 14,400 requests/day
export {
  BlockchairDogeAPI,
  blockchairDoge,
  type BlockchairDogeAddress,
  type BlockchairDogeUTXO,
  type BlockchairDogeTransaction
} from './blockchairAPI.DOGE';

// Tokenview API (Multi-chain support)
// Free tier: 100 requests/day (requires API key)
export {
  TokenviewDogeAPI,
  type TokenviewDogeConfig,
  type TokenviewDogeAddressInfo,
  type TokenviewDogeTransaction,
  type TokenviewDogeUTXO
} from './tokenviewAPI.DOGE';

// NOWNodes API (Full node access)
// Free tier: 5,000 requests/month (requires API key)
export {
  NOWNodesDogeAPI,
  type NOWNodesDogeConfig,
  type NOWNodesDogeAddressInfo,
  type NOWNodesDogeTrans,
  type NOWNodesDogeUTXO
} from './nowNodesAPI.DOGE';

// DogeClient API (Professional infrastructure)
// Free tier: ~1000 requests/hour
export {
  DogeClientAPI,
  dogeClient,
  type DogeClientAddressInfo,
  type DogeClientTransaction,
  type DogeClientBlock,
  type DogeClientNetworkStats
} from './dogeClientAPI.DOGE';

// Electrs-Dogecoin API (Modern, open-source explorer)
// Public demo available, no API key required
export {
  ElectrsDogeAPI,
  electrsDoge,
  type ElectrsDogeAddressInfo,
  type ElectrsDogeTransaction,
  type ElectrsDogeUTXO,
  type ElectrsDogeFeeEstimate
} from './electrsDogeAPI.DOGE';

// Default export: Dogechain (most established, reliable)
export { dogechainMainnet as default } from './dogechainAPI.DOGE';

