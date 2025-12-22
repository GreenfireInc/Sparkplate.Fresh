// CurrencyCore - Comprehensive Cryptocurrency Integration Hub
// Centralized export for all cryptocurrency-related integrations

// ============================================================================
// BLOCKCHAIN APIS
// ============================================================================
export * from './blockchainAPIs';

// ============================================================================
// CURRENCIES
// ============================================================================
export * from './currencies';

// ============================================================================
// DEXs (DECENTRALIZED EXCHANGES)
// ============================================================================
export * from './DEXs';

// ============================================================================
// EXCHANGES (CENTRALIZED EXCHANGES)
// ============================================================================
export * from './exchanges';

// ============================================================================
// P2P EXCHANGES (PEER-TO-PEER EXCHANGES)
// ============================================================================
export * from './p2pExchanges';

// ============================================================================
// QUICK EXCHANGES (INSTANT EXCHANGES)
// ============================================================================
export * from './quickExchanges';

// ============================================================================
// RAMPS (ON-RAMP/OFF-RAMP SERVICES)
// ============================================================================
export * from './ramps';

// ============================================================================
// MINING POOLS
// ============================================================================
export * from './miningPools';

// ============================================================================
// STAKING POOLS
// ============================================================================
export * from './stakingPools';

// ============================================================================
// ORACLES
// ============================================================================
export * from './oracles';

// ============================================================================
// AGGREGATORS
// ============================================================================
export * from './aggregators';

// ============================================================================
// DOMAINS
// ============================================================================
export * from './domains';

// ============================================================================
// DISTRIBUTION ENGINES (REWARDS & ESCROW)
// ============================================================================
export * from './distributionEngines';

// ============================================================================
// MINTING (TOKEN & NFT CREATION)
// ============================================================================
export * from './minting/token';

/**
 * CurrencyCore - Comprehensive Cryptocurrency Integration Hub
 * 
 * This module provides a centralized access point for all cryptocurrency-related
 * integrations and services. It includes:
 * 
 * ## Service Categories:
 * 
 * ### Trading & Exchange Services
 * - **Exchanges**: Centralized cryptocurrency exchanges (Binance, Coinbase, etc.)
 * - **P2P Exchanges**: Peer-to-peer trading platforms (Bisq, LocalBitcoins, etc.)
 * - **Quick Exchanges**: Instant cryptocurrency swaps (Changelly, Simpleswap, etc.)
 * - **DEXs**: Decentralized exchanges (Uniswap, SushiSwap, etc.)
 * 
 * ### Financial Services
 * - **Ramps**: Fiat on/off-ramp services (MoonPay, Ramp, etc.)
 * - **Mining Pools**: Cryptocurrency mining pools (Antpool, F2Pool, etc.)
 * - **Staking Pools**: Proof-of-stake validator services (Lido, Rocket Pool, etc.)
 * 
 * ### Data & Infrastructure
 * - **Blockchain APIs**: Direct blockchain access and explorers
 * - **Oracles**: External data providers (Chainlink, Band Protocol, etc.)
 * - **Aggregators**: Multi-service price and liquidity aggregation
 * - **Domains**: Blockchain domain name services (ENS, Unstoppable Domains, etc.)
 * 
 * ### Distribution & Smart Contracts
 * - **Distribution Engines**: Reward and escrow distribution mechanisms
 *   - Manual rewards and escrow (server-managed)
 *   - Smart contract rewards and escrow (trustless, on-chain)
 * 
 * ### Asset Creation
 * - **Minting**: Token and NFT creation mechanisms
 *   - Token minting (birthday tokens, custom tokens)
 *   - NFT minting (atomic assets, collections)
 * 
 * ### Currency Implementations
 * - **Currencies**: Individual cryptocurrency implementations and utilities
 * 
 * ## Usage Examples:
 * 
 * ### Import specific modules
 * ```typescript
 * import { Exchanges, QuickExchanges, P2PExchanges } from '@/components/currencyCore';
 * 
 * // Use centralized exchanges
 * const binance = new Exchanges.Binance({ apiKey: 'key', apiSecret: 'secret' });
 * const ticker = await binance.getTicker('BTC/USDT');
 * 
 * // Use quick exchanges
 * const changelly = await QuickExchanges.Changelly.getQuote('BTC', 'ETH', 1);
 * 
 * // Use P2P exchanges
 * const bisq = await P2PExchanges.Bisq.getOrderBook('BTC', 'USD');
 * ```
 * 
 * ### Import everything
 * ```typescript
 * import * as CurrencyCore from '@/components/currencyCore';
 * 
 * // Access all services
 * const exchanges = CurrencyCore.Exchanges;
 * const quickExchanges = CurrencyCore.QuickExchanges;
 * const p2pExchanges = CurrencyCore.P2PExchanges;
 * ```
 * 
 * ### Multi-service integration
 * ```typescript
 * import { 
 *   Exchanges, 
 *   QuickExchanges, 
 *   P2PExchanges, 
 *   Ramps,
 *   MiningPools,
 *   StakingPools,
 *   Oracles,
 *   Aggregators,
 *   Domains
 * } from '@/components/currencyCore';
 * 
 * // Compare rates across different types of exchanges
 * const centralizedRate = await Exchanges.Binance.getTicker('BTC/USDT');
 * const quickExchangeRate = await QuickExchanges.Changelly.getQuote('BTC', 'ETH', 1);
 * const p2pRate = await P2PExchanges.Bisq.getOrderBook('BTC', 'USD');
 * 
 * // Use multiple services together
 * const allRates = {
 *   centralized: centralizedRate,
 *   quick: quickExchangeRate,
 *   p2p: p2pRate
 * };
 * ```
 * 
 * ## Key Features:
 * 
 * - **Comprehensive Coverage**: Support for 100+ services across all categories
 * - **TypeScript Support**: Full type safety and IntelliSense support
 * - **Consistent API**: Standardized interfaces across all services
 * - **Error Handling**: Robust error handling and validation
 * - **Documentation**: Comprehensive documentation and examples
 * - **Rate Limiting**: Built-in rate limiting and retry logic
 * - **Authentication**: Support for API keys, OAuth, and other auth methods
 * - **Sandbox Support**: Development and testing environments
 * - **Multi-Exchange**: Cross-platform rate comparison and aggregation
 * 
 * ## Best Practices:
 * 
 * - Always handle errors gracefully
 * - Use rate limiting to avoid API limits
 * - Store API keys securely
 * - Use sandbox environments for testing
 * - Compare rates across multiple services
 * - Monitor transaction statuses
 * - Validate addresses before transactions
 * 
 * ## Support:
 * 
 * For questions, issues, or contributions, please refer to the individual
 * service documentation or contact the development team.
 */

// ============================================================================
// CONSOLIDATED EXPORTS
// ============================================================================

// Re-export all main service categories for easy access
export {
  // Blockchain APIs
  BlockchainAPIs,
  
  // Currencies
  Currencies,
  
  // DEXs
  DEXs,
  
  // Exchanges
  Exchanges,
  
  // P2P Exchanges
  P2PExchanges,
  
  // Quick Exchanges
  QuickExchanges,
  
  // Ramps
  Ramps,
  
  // Mining Pools
  MiningPools,
  
  // Staking Pools
  StakingPools,
  
  // Oracles
  Oracles,
  
  // Aggregators
  Aggregators,
  
  // Domains
  Domains,
} from './exports';

// ============================================================================
// DISTRIBUTION ENGINES
// ============================================================================
// Note: All distribution engines are already exported via the wildcard export
// on line 67: export * from './distributionEngines';
// Individual classes are available directly from the distributionEngines module.

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get all available services across all categories
 */
export async function getAllServices(): Promise<Record<string, any>> {
  const [
    exchanges,
    p2pExchanges,
    quickExchanges,
    ramps,
    miningPools,
    stakingPools,
    oracles,
    aggregators,
    domains,
    blockchainAPIs,
    currencies,
    DEXs,
    distributionEngines,
  ] = await Promise.all([
    import('./exchanges'),
    import('./p2pExchanges'),
    import('./quickExchanges'),
    import('./ramps'),
    import('./miningPools'),
    import('./stakingPools'),
    import('./oracles'),
    import('./aggregators'),
    import('./domains'),
    import('./blockchainAPIs'),
    import('./currencies'),
    import('./DEXs'),
    import('./distributionEngines'),
  ]);

  return {
    exchanges: exchanges.default || exchanges,
    p2pExchanges: p2pExchanges.default || p2pExchanges,
    quickExchanges: quickExchanges.default || quickExchanges,
    ramps: ramps.default || ramps,
    miningPools: miningPools.default || miningPools,
    stakingPools: stakingPools.default || stakingPools,
    oracles: oracles.default || oracles,
    aggregators: aggregators.default || aggregators,
    domains: domains.default || domains,
    blockchainAPIs: blockchainAPIs.default || blockchainAPIs,
    currencies: currencies.default || currencies,
    DEXs: DEXs.default || DEXs,
    distributionEngines: distributionEngines.default || distributionEngines,
  };
}

/**
 * Get service count by category
 */
export async function getServiceCounts(): Promise<Record<string, number>> {
  const services = await getAllServices();
  
  return {
    exchanges: Object.keys(services.exchanges?.Exchanges || {}).length,
    p2pExchanges: Object.keys(services.p2pExchanges?.P2PExchanges || {}).length,
    quickExchanges: Object.keys(services.quickExchanges?.QuickExchanges || {}).length,
    ramps: Object.keys(services.ramps?.Ramps || {}).length,
    miningPools: Object.keys(services.miningPools?.MiningPools || {}).length,
    stakingPools: Object.keys(services.stakingPools?.StakingPools || {}).length,
    oracles: Object.keys(services.oracles?.Oracles || {}).length,
    aggregators: Object.keys(services.aggregators?.Aggregators || {}).length,
    domains: Object.keys(services.domains?.Domains || {}).length,
    blockchainAPIs: Object.keys(services.blockchainAPIs?.BlockchainAPIs || {}).length,
    currencies: Object.keys(services.currencies?.Currencies || {}).length,
    DEXs: Object.keys(services.DEXs?.DEXs || {}).length,
    distributionEngines: (
      (services.distributionEngines?.algoDistributionEnginesMetadata?.totalEngines || 0) +
      (services.distributionEngines?.atomDistributionEnginesMetadata?.totalEngines || 0) +
      (services.distributionEngines?.bchDistributionEnginesMetadata?.totalEngines || 0) +
      (services.distributionEngines?.bnbDistributionEnginesMetadata?.totalEngines || 0) +
      (services.distributionEngines?.btcDistributionEnginesMetadata?.totalEngines || 0) +
      (services.distributionEngines?.dogeDistributionEnginesMetadata?.totalEngines || 0) +
      (services.distributionEngines?.dotDistributionEnginesMetadata?.totalEngines || 0) +
      (services.distributionEngines?.etcDistributionEnginesMetadata?.totalEngines || 0) +
      (services.distributionEngines?.ethDistributionEnginesMetadata?.totalEngines || 0) +
      (services.distributionEngines?.ltcDistributionEnginesMetadata?.totalEngines || 0) +
      (services.distributionEngines?.lunaDistributionEnginesMetadata?.totalEngines || 0) +
      (services.distributionEngines?.luncDistributionEnginesMetadata?.totalEngines || 0) +
      (services.distributionEngines?.solDistributionEnginesMetadata?.totalEngines || 0) +
      (services.distributionEngines?.trxDistributionEnginesMetadata?.totalEngines || 0) +
      (services.distributionEngines?.wavesDistributionEnginesMetadata?.totalEngines || 0) +
      (services.distributionEngines?.xlmDistributionEnginesMetadata?.totalEngines || 0) +
      (services.distributionEngines?.xrpDistributionEnginesMetadata?.totalEngines || 0) +
      (services.distributionEngines?.xtzDistributionEnginesMetadata?.totalEngines || 0)
    ),
  };
}

/**
 * Search for services by name across all categories
 */
export async function searchServices(query: string): Promise<Array<{ category: string; service: string; name: string }>> {
  const results: Array<{ category: string; service: string; name: string }> = [];
  const services = await getAllServices();
  
  for (const [category, categoryServices] of Object.entries(services)) {
    if (categoryServices && typeof categoryServices === 'object') {
      for (const [serviceName, service] of Object.entries(categoryServices)) {
        if (serviceName.toLowerCase().includes(query.toLowerCase())) {
          results.push({
            category,
            service: serviceName,
            name: service.info?.name || serviceName
          });
        }
      }
    }
  }
  
  return results;
}

/**
 * Get service information by name
 */
export async function getServiceInfo(category: string, serviceName: string): Promise<any> {
  try {
    const services = await getAllServices();
    const categoryServices = services[category];
    
    if (categoryServices && categoryServices[serviceName]) {
      return categoryServices[serviceName].info || {};
    }
    
    return null;
  } catch (error) {
    console.error(`Error getting service info for ${category}.${serviceName}:`, error);
    return null;
  }
}

// ============================================================================
// DEFAULT EXPORT
// ============================================================================

export default {
  // Utility functions
  getAllServices,
  getServiceCounts,
  searchServices,
  getServiceInfo,
};