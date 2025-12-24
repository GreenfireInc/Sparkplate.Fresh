// Algorand (ALGO) Staking Pools
// Centralized export for all ALGO staking pool integrations

import { FolksFinancePool } from './folksFinance';
import { TinymanPool } from './tinyman';
import { AlgorandFoundationGovernance } from './algorandFoundation';
import { PactPool } from './pact';
import { AlgoFiPool } from './algofi';
import { MessinaOnePool } from './messinaOne';
import { RetiPool } from './reti';

export { FolksFinancePool, TinymanPool, AlgorandFoundationGovernance, PactPool, AlgoFiPool, MessinaOnePool, RetiPool };

/**
 * Algorand Staking Pools Overview
 * 
 * This module provides TypeScript integrations for major Algorand staking pools and protocols.
 * Each pool file includes:
 * - Basic pool information
 * - API endpoints and documentation
 * - TypeScript functions for interacting with pools
 * - Social media links
 * - Integration examples
 * 
 * Available Staking Pools:
 * 
 * 1. Folks Finance - Liquid staking with xALGO
 *    - DeFi lending/borrowing platform
 *    - Instant liquidity with liquid staking tokens
 *    - API Documentation: https://docs.folks.finance/
 * 
 * 2. Tinyman - Liquid staking with tALGO
 *    - Leading AMM DEX on Algorand
 *    - Liquidity pools and trading
 *    - SDK: @tinymanorg/tinyman-js-sdk
 * 
 * 3. Algorand Foundation Governance - Native governance staking
 *    - Quarterly governance periods
 *    - On-chain voting
 *    - Direct ALGO commitment
 * 
 * 4. Pact - Consensus staking and AMM
 *    - 30,000 ALGO minimum for consensus
 *    - Liquidity pool participation
 *    - Python SDK available
 * 
 * 5. AlgoFi - DeFi staking and lending
 *    - Comprehensive DeFi suite
 *    - Collateralized lending
 *    - Yield optimization
 * 
 * 6. Messina One - Liquid staking with mALGO
 *    - Liquid staking tokens
 *    - Instant liquidity
 *    - Governance rewards
 * 
 * 7. Réti (Open Pooling) - Validator pooling
 *    - Permissionless pool creation
 *    - Multiple validators per pool
 *    - Transparent on-chain governance
 * 
 * Usage Example:
 * 
 * ```typescript
 * import { FolksFinancePool, TinymanPool, getALGOPrice } from '@/components/currencyCore/stakingPools/ALGO.Algorand';
 * 
 * // Fetch ALGO price
 * const algoPrice = await getALGOPrice();
 * console.log('ALGO Price:', algoPrice);
 * 
 * // Access pool information
 * console.log('Folks Finance:', FolksFinancePool.website);
 * console.log('Tinyman SDK:', TinymanPool.sdk.npm);
 * ```
 * 
 * Pricing Data Integration:
 * 
 * For real-time ALGO pricing, use:
 * 1. CoinGecko API: https://api.coingecko.com/api/v3/simple/price?ids=algorand&vs_currencies=usd
 * 2. Binance API: https://api.binance.com/api/v3/ticker/price?symbol=ALGOUSDT
 * 3. Tinyman Analytics: https://mainnet.analytics.tinyman.org/api/v1/current-asset-prices/
 * 4. DIA Oracle: On-chain price feeds
 * 
 * RPC Endpoints:
 * - Algonode MainNet: https://mainnet-api.algonode.cloud:443
 * - Algonode TestNet: https://testnet-api.algonode.cloud:443
 * - Nodely MainNet: https://mainnet-api.4160.nodely.dev
 * - Nodely TestNet: https://testnet-api.4160.nodely.dev
 */

// Centralized object for all ALGO staking pools
export const ALGOStakingPools = {
  FolksFinance: FolksFinancePool,
  Tinyman: TinymanPool,
  AlgorandFoundation: AlgorandFoundationGovernance,
  Pact: PactPool,
  AlgoFi: AlgoFiPool,
  MessinaOne: MessinaOnePool,
  Reti: RetiPool,
};

// Helper function to fetch ALGO price from multiple sources
export async function getALGOPrice(): Promise<number> {
  try {
    // Try CoinGecko first
    const response = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=algorand&vs_currencies=usd'
    );
    if (response.ok) {
      const data = await response.json();
      return data.algorand?.usd || 0;
    }
  } catch (error) {
    console.warn('CoinGecko ALGO price fetch failed:', error);
  }

  try {
    // Fallback to Binance
    const response = await fetch(
      'https://api.binance.com/api/v3/ticker/price?symbol=ALGOUSDT'
    );
    if (response.ok) {
      const data = await response.json();
      return parseFloat(data.price) || 0;
    }
  } catch (error) {
    console.warn('Binance ALGO price fetch failed:', error);
  }

  try {
    // Fallback to Kraken
    const response = await fetch(
      'https://api.kraken.com/0/public/Ticker?pair=ALGOUSD'
    );
    if (response.ok) {
      const data = await response.json();
      return parseFloat(data.result?.ALGOUSD?.c?.[0]) || 0;
    }
  } catch (error) {
    console.warn('Kraken ALGO price fetch failed:', error);
  }

  return 0;
}

// Helper function to calculate USD value from ALGO amount
export async function convertALGOToUSD(algoAmount: number): Promise<number> {
  const price = await getALGOPrice();
  return algoAmount * price;
}

// Helper function to calculate ALGO amount from USD value
export async function convertUSDToALGO(usdAmount: number): Promise<number> {
  const price = await getALGOPrice();
  return price > 0 ? usdAmount / price : 0;
}

// Helper function to convert microAlgos to ALGO (1 ALGO = 1,000,000 microAlgos)
export function microAlgosToAlgo(microAlgos: number | string): number {
  const amount = typeof microAlgos === 'string' ? parseInt(microAlgos, 10) : microAlgos;
  return amount / 1_000_000;
}

// Helper function to convert ALGO to microAlgos
export function algoToMicroAlgos(algo: number): number {
  return Math.floor(algo * 1_000_000);
}

// Helper function to get all pool names
export function getAllPoolNames(): string[] {
  return [
    'Folks Finance',
    'Tinyman',
    'Algorand Foundation Governance',
    'Pact',
    'AlgoFi',
    'Messina One',
    'Réti (Open Pooling)',
  ];
}

// Export default
export default {
  pools: ALGOStakingPools,
  getALGOPrice,
  convertALGOToUSD,
  convertUSDToALGO,
  microAlgosToAlgo,
  algoToMicroAlgos,
  getAllPoolNames,
};

