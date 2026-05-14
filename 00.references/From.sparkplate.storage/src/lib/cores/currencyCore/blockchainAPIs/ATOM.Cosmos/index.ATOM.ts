// Cosmos (ATOM) Blockchain API Index
// Exports all available API implementations
// Note: Cosmos is account-based (no UTXOs like Bitcoin)

// Mintscan API (by Cosmostation) - Enterprise-grade indexed API
// Free tier: 2 req/sec, 10k calls/day without API key
export {
  MintscanAPI,
  mintscanMainnet,
  mintscanTestnet,
  type MintscanAccountInfo,
  type MintscanTransaction,
  type MintscanBlock,
  type MintscanConfig
} from './mintscanAPI.ATOM';

// ATOMScan API - Public LCD/REST gateway
// Free public access with standard rate limits
export {
  ATOMScanAPI,
  atomscanMainnet,
  atomscanTestnet,
  type ATOMScanAccountInfo,
  type ATOMScanBalance,
  type ATOMScanTransaction,
  type ATOMScanBlock
} from './atomscanAPI.ATOM';

// Public LCD API - Direct access to public Cosmos SDK nodes
// Free public endpoints from chain-registry and community providers
export {
  PublicLCDAPI,
  publicLCD,
  createPublicLCDAPI,
  type CosmosAccountInfo,
  type CosmosBalance,
  type CosmosTransaction,
  type PublicLCDConfig
} from './publicLCDAPI.ATOM';

// Default export: ATOMScan (good balance of features and reliability)
export { atomscanMainnet as default } from './atomscanAPI.ATOM';

