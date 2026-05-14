// Stacks (STX) Oracle Integration Module
// Comprehensive oracle exports for Stacks blockchain (Bitcoin Layer 2)

/**
 * This module provides access to all available oracles for Stacks (STX).
 * 
 * Available Oracles:
 * - Pyth Network: High-frequency (400ms), low-latency price feeds via Wormhole bridge
 * - DIA: Customizable, transparent price feeds from 90+ markets
 * - ALEX: Leading DEX with AMM + orderbook hybrid for DEX-based pricing
 * - Hiro: Official Stacks Blockchain API for comprehensive blockchain data
 * - CoinGecko: Global market data aggregator with historical pricing
 * 
 * Usage:
 * ```typescript
 * import {
 *   pythOracle,
 *   diaOracle,
 *   alexOracle,
 *   hiroOracle,
 *   coinGeckoOracle,
 * } from './oracles/STX.Stacks';
 * ```
 */

// Oracle exports
export { pythOracle } from './pyth';
export { diaOracle as stacksDiaOracle } from './dia';
export { alexOracle } from './alex';
export { hiroOracle } from './hiro';
export { coinGeckoOracle } from './coingecko';

// Metadata
export const STX_ORACLE_METADATA = {
  blockchain: 'Stacks',
  symbol: 'STX',
  name: 'Stacks',
  layer: 'Bitcoin Layer 2',
  
  oracles: [
    {
      name: 'Pyth Network',
      type: 'Decentralized Oracle',
      priority: 'high',
      latency: '400ms',
      reliability: 'very-high',
      costTier: 'free',
      features: ['high-frequency', 'confidence-intervals', 'wormhole-bridge', 'clarity-contracts'],
      bestFor: ['trading', 'defi', 'real-time-pricing', 'bitcoin-defi'],
    },
    {
      name: 'DIA',
      type: 'Decentralized Oracle',
      priority: 'high',
      latency: 'medium',
      reliability: 'high',
      costTier: 'free',
      features: ['customizable-feeds', 'transparent-methodology', 'rest-graphql', 'historical-data'],
      bestFor: ['custom-oracles', 'analytics', 'historical-analysis'],
    },
    {
      name: 'ALEX',
      type: 'DEX & DeFi Platform',
      priority: 'high',
      latency: 'near-instant',
      reliability: 'high',
      costTier: 'free',
      features: ['amm-orderbook', 'deep-liquidity', 'lending-borrowing', 'launchpad'],
      bestFor: ['dex-pricing', 'liquidity-analytics', 'defi-data'],
    },
    {
      name: 'Hiro',
      type: 'Blockchain API',
      priority: 'medium',
      latency: 'low',
      reliability: 'very-high',
      costTier: 'free-tier',
      features: ['official-api', 'blockchain-data', 'smart-contracts', 'explorer'],
      bestFor: ['blockchain-data', 'transactions', 'account-balances', 'stacking-info'],
    },
    {
      name: 'CoinGecko',
      type: 'Market Data',
      priority: 'low',
      latency: 'medium',
      reliability: 'very-high',
      costTier: 'free-tier',
      features: ['600+-exchanges', 'historical-data', 'multi-currency', 'market-analytics'],
      bestFor: ['market-analytics', 'historical-pricing', 'portfolio-tracking'],
    },
  ],

  recommendations: {
    realTimePricing: ['Pyth Network', 'ALEX'],
    dexPricing: ['ALEX'],
    historicalData: ['CoinGecko', 'DIA'],
    blockchainData: ['Hiro'],
    customOracles: ['DIA', 'Pyth Network'],
    highFrequency: ['Pyth Network'],
    portfolioTracking: ['CoinGecko'],
    defiIntegration: ['Pyth Network', 'ALEX', 'DIA'],
    bitcoinDefi: ['Pyth Network', 'ALEX'],
  },

  chainInfo: {
    layer: 'Bitcoin Layer 2',
    nativeToken: 'STX',
    consensus: 'Proof of Transfer (PoX)',
    blockTime: '~10 minutes (anchored to Bitcoin)',
    smartContracts: 'Clarity (decidable language)',
    bitcoinFinality: 'Inherits Bitcoin security',
  },

  integrationPatterns: {
    primaryOracle: 'Pyth Network',
    fallbackOracle: 'DIA',
    dexPricing: 'ALEX',
    blockchainData: 'Hiro',
    marketData: 'CoinGecko',
  },

  notes: [
    'Stacks is Bitcoin\'s largest Layer 2 with smart contract capabilities',
    'Pyth Network offers the most reliable high-frequency price feeds via Wormhole',
    'DIA provides customizable oracle solutions with transparent methodologies',
    'ALEX is the largest DEX on Stacks with AMM + orderbook hybrid model',
    'Hiro provides the official Stacks Blockchain API',
    'Consider using multiple oracles for price validation',
    'Most oracles offer free tiers suitable for development and testing',
    'For production DeFi applications, use decentralized oracles (Pyth/DIA)',
    'Stacks inherits Bitcoin\'s security through Proof of Transfer consensus',
  ],
};

// Helper function to get recommended oracles for a specific use case
export function getRecommendedOracles(useCase: keyof typeof STX_ORACLE_METADATA.recommendations): string[] {
  return STX_ORACLE_METADATA.recommendations[useCase] || [];
}

// Helper function to get oracle by name
export function getOracleInfo(oracleName: string) {
  return STX_ORACLE_METADATA.oracles.find(
    oracle => oracle.name.toLowerCase() === oracleName.toLowerCase()
  );
}

// Export all oracle metadata in a structured format
export const STACKS_ORACLES = {
  pyth: 'Pyth Network',
  dia: 'DIA',
  alex: 'ALEX',
  hiro: 'Hiro',
  coingecko: 'CoinGecko',
} as const;

export type StacksOracleType = keyof typeof STACKS_ORACLES;

