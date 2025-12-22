// Bitcoin Cash Blockchain API Index
// Exports all available API implementations

// Blockchair API (Primary - 5,000 requests/day free)
export { 
  BlockchairAPI,
  blockchairMainnet,
  blockchairTestnet,
  type BlockchairUTXO,
  type BlockchairTransaction,
  type BlockchairAddressData,
  type BlockchairResponse
} from './blockchair.BCH';

// FullStack.cash API (10 req/min free, 100/min with free key)
export {
  FullStackCashAPI,
  fullstackMainnet,
  fullstackTestnet,
  type FullStackUTXO,
  type FullStackConfig
} from './fullstackCashAPI.BCH';

// Bitcoin.com REST API (Free with rate limits)
export {
  BitcoinComAPI,
  bitcoinComMainnet,
  bitcoinComTestnet,
  type BitcoinComUTXO
} from './bitcoinComAPI.BCH';

// BlockCypher API (200 req/hour free, 3 req/sec)
export {
  BlockCypherAPI,
  blockcypherMainnet,
  blockcypherTestnet,
  type BlockCypherUTXO,
  type BlockCypherConfig
} from './blockcypherAPI.BCH';

// Bitquery GraphQL API (Free tier available with key)
export {
  BitqueryAPI,
  bitqueryMainnet,
  bitqueryTestnet,
  type BitqueryUTXO,
  type BitqueryConfig
} from './bitqueryAPI.BCH';

// Default export: Blockchair (most feature-complete free API)
export { blockchairMainnet as default } from './blockchair.BCH';

