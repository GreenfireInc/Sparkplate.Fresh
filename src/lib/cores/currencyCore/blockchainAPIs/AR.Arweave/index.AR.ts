// Arweave (AR) Blockchain API Index
// Exports all available API implementations
// Note: Arweave is transaction-based permanent storage network

// Arweave Network API (Free, direct gateway access)
export { 
  ArweaveNetworkAPI,
  arweaveNetworkMainnet,
  arweaveNetworkTestnet,
  createArweaveNetworkAPI,
  type ArweaveTransaction,
  type ArweaveWalletInfo,
  type ArweaveTransactionStatus,
  type ArweaveBlock,
  type ArweaveNetwork
} from './arweaveNetworkAPI.AR';

// ViewBlock API (Free tier: 100 req/min, Premium with API key)
export {
  ViewBlockAPI,
  viewBlockMainnet,
  viewBlockTestnet,
  createViewBlockAPI,
  type ViewBlockTransaction,
  type ViewBlockAddress,
  type ViewBlockAddressTransactions,
  type ViewBlockConfig
} from './viewBlockAPI.AR';

// AR.IO Gateway API (Free gateway access, Premium with staking)
export {
  ArIOGatewayAPI,
  arIOGatewayMainnet,
  arIOGatewayTestnet,
  createArIOGatewayAPI,
  type ArIOGatewayInfo,
  type ArIOTransaction,
  type ArIOWalletBalance,
  type ArIOConfig
} from './arIOGatewayAPI.AR';

// Arweave Search API (ArQL and advanced search capabilities)
export {
  ArweaveSearchAPI,
  arweaveSearchMainnet,
  arweaveSearchTestnet,
  createArweaveSearchAPI,
  type ArweaveSearchQuery,
  type ArweaveSearchResult,
  type ArweaveSearchConfig
} from './arweaveSearchAPI.AR';

// Default export: ArweaveNetwork (most comprehensive for basic operations)
export { arweaveNetworkMainnet as default } from './arweaveNetworkAPI.AR';
