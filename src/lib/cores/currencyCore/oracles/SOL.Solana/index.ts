// Solana (SOL) Oracle Integration Module
// Comprehensive oracle exports for Solana blockchain

/**
 * This module provides access to all available oracles for Solana (SOL).
 * 
 * Available Oracles:
 * - Pyth Network: High-frequency (400ms), low-latency price feeds
 * - Switchboard: Decentralized oracle with customizable feeds and TEE security
 * - Jupiter: Leading DEX aggregator for best prices across all Solana liquidity
 * - Raydium: Major AMM/DEX with OpenBook integration
 * - Helius: Comprehensive Solana blockchain API and enhanced RPC
 * - Solscan: Leading block explorer with transaction and market data
 * - CoinGecko: Global market data aggregator with historical pricing
 * 
 * Usage:
 * ```typescript
 * import {
 *   pythOracle,
 *   switchboardOracle,
 *   jupiterOracle,
 *   raydiumOracle,
 *   heliusOracle,
 *   solscanOracle,
 *   coinGeckoOracle,
 * } from './oracles/SOL.Solana';
 * ```
 */

// Oracle exports
export { pythOracle } from './pyth';
export { switchboardOracle } from './switchboard';
export { jupiterOracle } from './jupiter';
export { raydiumOracle } from './raydium';
export { heliusOracle } from './helius';
export { solscanOracle } from './solscan';
export { coinGeckoOracle } from './coingecko';

// Metadata
export const SOL_ORACLE_METADATA = {
  blockchain: 'Solana',
  symbol: 'SOL',
  name: 'Solana',
  
  oracles: [
    {
      name: 'Pyth Network',
      type: 'Decentralized Oracle',
      priority: 'high',
      latency: '400ms',
      reliability: 'very-high',
      costTier: 'free',
      features: ['high-frequency', 'confidence-intervals', 'pull-based'],
      bestFor: ['trading', 'defi', 'real-time-pricing'],
    },
    {
      name: 'Switchboard',
      type: 'Decentralized Oracle',
      priority: 'high',
      latency: 'sub-100ms',
      reliability: 'very-high',
      costTier: 'free',
      features: ['customizable-feeds', 'tee-security', 'vrf'],
      bestFor: ['custom-oracles', 'defi', 'gaming'],
    },
    {
      name: 'Jupiter',
      type: 'DEX Aggregator',
      priority: 'high',
      latency: 'near-instant',
      reliability: 'high',
      costTier: 'free',
      features: ['dex-aggregation', 'best-routing', 'slippage-optimization'],
      bestFor: ['dex-pricing', 'trading', 'price-impact-analysis'],
    },
    {
      name: 'Raydium',
      type: 'AMM/DEX',
      priority: 'medium',
      latency: 'near-instant',
      reliability: 'high',
      costTier: 'free',
      features: ['amm-pools', 'concentrated-liquidity', 'openbook-integration'],
      bestFor: ['pool-pricing', 'liquidity-analytics', 'dex-data'],
    },
    {
      name: 'Helius',
      type: 'Blockchain API',
      priority: 'medium',
      latency: 'low',
      reliability: 'very-high',
      costTier: 'free-tier',
      features: ['enhanced-rpc', 'das-api', 'webhooks', 'transaction-parsing'],
      bestFor: ['blockchain-data', 'transactions', 'wallet-integration'],
    },
    {
      name: 'Solscan',
      type: 'Block Explorer',
      priority: 'medium',
      latency: 'low',
      reliability: 'high',
      costTier: 'free',
      features: ['explorer-api', 'transaction-tracking', 'market-data'],
      bestFor: ['blockchain-exploration', 'transaction-history', 'market-overview'],
    },
    {
      name: 'CoinGecko',
      type: 'Market Data',
      priority: 'low',
      latency: 'medium',
      reliability: 'very-high',
      costTier: 'free-tier',
      features: ['600+-exchanges', 'historical-data', 'multi-currency'],
      bestFor: ['market-analytics', 'historical-pricing', 'portfolio-tracking'],
    },
  ],

  recommendations: {
    realTimePricing: ['Pyth Network', 'Switchboard', 'Jupiter'],
    dexPricing: ['Jupiter', 'Raydium'],
    historicalData: ['CoinGecko', 'Solscan'],
    blockchainData: ['Helius', 'Solscan'],
    customOracles: ['Switchboard'],
    highFrequency: ['Pyth Network', 'Switchboard'],
    portfolioTracking: ['CoinGecko', 'Jupiter'],
    defiIntegration: ['Pyth Network', 'Switchboard', 'Jupiter'],
  },

  chainInfo: {
    chainId: 'mainnet-beta',
    nativeToken: 'SOL',
    consensus: 'Proof of History (PoH) + Proof of Stake (PoS)',
    blockTime: '~400ms',
    tps: '65,000+',
    smartContracts: 'Native (Rust, C, C++)',
  },

  integrationPatterns: {
    primaryOracle: 'Pyth Network',
    fallbackOracle: 'Switchboard',
    dexPricing: 'Jupiter',
    blockchainData: 'Helius',
    marketData: 'CoinGecko',
  },

  notes: [
    'Solana is the fastest blockchain with sub-second finality',
    'Pyth Network offers the most reliable high-frequency price feeds',
    'Switchboard provides customizable oracle solutions with TEE security',
    'Jupiter aggregates all Solana DEX liquidity for best prices',
    'Raydium is the leading native AMM with OpenBook integration',
    'Helius provides enterprise-grade infrastructure and enhanced RPC',
    'Consider using multiple oracles for price validation',
    'Most oracles offer free tiers suitable for development and testing',
    'For production DeFi applications, use decentralized oracles (Pyth/Switchboard)',
  ],
};

// Helper function to get recommended oracles for a specific use case
export function getRecommendedOracles(useCase: keyof typeof SOL_ORACLE_METADATA.recommendations): string[] {
  return SOL_ORACLE_METADATA.recommendations[useCase] || [];
}

// Helper function to get oracle by name
export function getOracleInfo(oracleName: string) {
  return SOL_ORACLE_METADATA.oracles.find(
    oracle => oracle.name.toLowerCase() === oracleName.toLowerCase()
  );
}

// Export all oracle metadata in a structured format
export const SOLANA_ORACLES = {
  pyth: 'Pyth Network',
  switchboard: 'Switchboard',
  jupiter: 'Jupiter Aggregator',
  raydium: 'Raydium',
  helius: 'Helius',
  solscan: 'Solscan',
  coingecko: 'CoinGecko',
} as const;

export type SolanaOracleType = keyof typeof SOLANA_ORACLES;

