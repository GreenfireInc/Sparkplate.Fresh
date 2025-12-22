// Cosmos (ATOM) Staking Pools
// Centralized export for all ATOM staking pool integrations

import { StridePool } from './stride';
import { PStakePool } from './pstake';
import { CosmosValidators } from './cosmosValidators';
import { ChorusOneValidator } from './chorusOne';
import { FigmentValidator } from './figment';
import { CoinbaseStaking } from './coinbase';
import { KrakenStaking } from './kraken';

export { StridePool, PStakePool, CosmosValidators, ChorusOneValidator, FigmentValidator, CoinbaseStaking, KrakenStaking };

/**
 * Cosmos (ATOM) Staking Pools Overview
 * 
 * This module provides TypeScript integrations for major Cosmos staking pools and validators.
 * Each pool file includes:
 * - Basic pool/validator information
 * - API endpoints and documentation
 * - TypeScript functions for staking operations
 * - Social media links
 * - Integration examples
 * 
 * Available Staking Options:
 * 
 * 1. Stride - Liquid staking with stATOM
 *    - Multi-chain liquid staking protocol
 *    - Instant liquidity with liquid staking tokens
 *    - SDK: @cosmjs/stargate
 * 
 * 2. pStake Finance - Liquid staking with pATOM
 *    - Cross-chain compatibility (Cosmos & Ethereum)
 *    - Auto-compounding rewards
 *    - SDK: @cosmjs/stargate
 * 
 * 3. Cosmos Hub Validators - Native staking
 *    - 175+ active validators
 *    - Direct delegation to validators
 *    - Governance participation
 * 
 * 4. Chorus One - Institutional validator
 *    - Enterprise-grade infrastructure
 *    - 99.9% uptime SLA
 *    - 5% commission
 * 
 * 5. Figment - Enterprise validator
 *    - Institutional custody support
 *    - DataHub API access
 *    - 10% commission
 * 
 * 6. Coinbase - Exchange staking
 *    - Custodial staking through Coinbase
 *    - No minimum stake
 *    - Daily rewards
 * 
 * 7. Kraken - Exchange staking
 *    - Flexible staking (unstake anytime)
 *    - Trade staked ATOM on exchange
 *    - Twice-weekly rewards
 * 
 * Usage Example:
 * 
 * ```typescript
 * import { StridePool, CosmosValidators, getATOMPrice } from '@/components/currencyCore/stakingPools/ATOM.Cosmos';
 * 
 * // Fetch ATOM price
 * const atomPrice = await getATOMPrice();
 * console.log('ATOM Price:', atomPrice);
 * 
 * // Access pool information
 * console.log('Stride:', StridePool.website);
 * console.log('Validators:', CosmosValidators.validators);
 * ```
 * 
 * Pricing Data Integration:
 * 
 * For real-time ATOM pricing, use:
 * 1. CoinGecko API: https://api.coingecko.com/api/v3/simple/price?ids=cosmos&vs_currencies=usd
 * 2. Binance API: https://api.binance.com/api/v3/ticker/price?symbol=ATOMUSDT
 * 3. Kraken API: https://api.kraken.com/0/public/Ticker?pair=ATOMUSD
 * 4. Osmosis DEX: https://lcd.osmosis.zone/ (via IBC)
 * 
 * RPC Endpoints:
 * - Cosmos Hub MainNet: https://rpc.cosmos.network
 * - Cosmos Hub REST: https://api.cosmos.network
 * - Stride MainNet: https://stride-rpc.polkachu.com
 * - Persistence (pStake): https://rpc.persistence.one
 */

// Centralized object for all ATOM staking pools
export const ATOMStakingPools = {
  Stride: StridePool,
  pStake: PStakePool,
  CosmosValidators: CosmosValidators,
  ChorusOne: ChorusOneValidator,
  Figment: FigmentValidator,
  Coinbase: CoinbaseStaking,
  Kraken: KrakenStaking,
};

// Helper function to fetch ATOM price from multiple sources
export async function getATOMPrice(): Promise<number> {
  try {
    // Try CoinGecko first
    const response = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=cosmos&vs_currencies=usd'
    );
    if (response.ok) {
      const data = await response.json();
      return data.cosmos?.usd || 0;
    }
  } catch (error) {
    console.warn('CoinGecko ATOM price fetch failed:', error);
  }

  try {
    // Fallback to Binance
    const response = await fetch(
      'https://api.binance.com/api/v3/ticker/price?symbol=ATOMUSDT'
    );
    if (response.ok) {
      const data = await response.json();
      return parseFloat(data.price) || 0;
    }
  } catch (error) {
    console.warn('Binance ATOM price fetch failed:', error);
  }

  try {
    // Fallback to Kraken
    const response = await fetch(
      'https://api.kraken.com/0/public/Ticker?pair=ATOMUSD'
    );
    if (response.ok) {
      const data = await response.json();
      const atomUsd = data.result?.ATOMUSD;
      return atomUsd ? parseFloat(atomUsd.c[0]) : 0;
    }
  } catch (error) {
    console.warn('Kraken ATOM price fetch failed:', error);
  }

  return 0;
}

// Helper function to calculate USD value from ATOM amount
export async function convertATOMToUSD(atomAmount: number): Promise<number> {
  const price = await getATOMPrice();
  return atomAmount * price;
}

// Helper function to calculate ATOM amount from USD value
export async function convertUSDToATOM(usdAmount: number): Promise<number> {
  const price = await getATOMPrice();
  return price > 0 ? usdAmount / price : 0;
}

// Helper function to convert microATOM to ATOM (1 ATOM = 1,000,000 microATOM)
export function microAtomToAtom(microAtom: number | string): number {
  const amount = typeof microAtom === 'string' ? parseInt(microAtom, 10) : microAtom;
  return amount / 1_000_000;
}

// Helper function to convert ATOM to microATOM
export function atomToMicroAtom(atom: number): number {
  return Math.floor(atom * 1_000_000);
}

// Helper function to get all pool/validator names
export function getAllPoolNames(): string[] {
  return [
    'Stride',
    'pStake Finance',
    'Cosmos Hub Validators',
    'Chorus One',
    'Figment',
    'Coinbase',
    'Kraken',
  ];
}

// Helper function to get liquid staking providers
export function getLiquidStakingProviders(): string[] {
  return ['Stride', 'pStake Finance'];
}

// Helper function to get institutional validators
export function getInstitutionalValidators(): string[] {
  return ['Chorus One', 'Figment'];
}

// Helper function to get exchange staking providers
export function getExchangeStakingProviders(): string[] {
  return ['Coinbase', 'Kraken'];
}

// Helper function to get staking APY range
export function getStakingAPYRange(): { min: number; max: number; average: number } {
  return {
    min: 4,
    max: 20,
    average: 16,
  };
}

// Helper function to fetch staking pool stats from Cosmos Hub
export async function getCosmosStakingStats() {
  try {
    const response = await fetch(
      'https://api.cosmos.network/cosmos/staking/v1beta1/pool'
    );
    if (response.ok) {
      const data = await response.json();
      const bondedTokens = parseInt(data.pool.bonded_tokens) / 1_000_000;
      const notBondedTokens = parseInt(data.pool.not_bonded_tokens) / 1_000_000;
      
      return {
        totalBonded: bondedTokens,
        totalUnbonded: notBondedTokens,
        totalSupply: bondedTokens + notBondedTokens,
        stakingRatio: bondedTokens / (bondedTokens + notBondedTokens),
      };
    }
  } catch (error) {
    console.error('Error fetching Cosmos staking stats:', error);
  }
  
  return null;
}

// Helper function to get validator count
export async function getValidatorCount() {
  try {
    const response = await fetch(
      'https://api.cosmos.network/cosmos/staking/v1beta1/validators?status=BOND_STATUS_BONDED&pagination.limit=1'
    );
    if (response.ok) {
      const data = await response.json();
      return parseInt(data.pagination?.total || '0');
    }
  } catch (error) {
    console.error('Error fetching validator count:', error);
  }
  
  return 0;
}

// Export default
export default {
  pools: ATOMStakingPools,
  getATOMPrice,
  convertATOMToUSD,
  convertUSDToATOM,
  microAtomToAtom,
  atomToMicroAtom,
  getAllPoolNames,
  getLiquidStakingProviders,
  getInstitutionalValidators,
  getExchangeStakingProviders,
  getStakingAPYRange,
  getCosmosStakingStats,
  getValidatorCount,
};

