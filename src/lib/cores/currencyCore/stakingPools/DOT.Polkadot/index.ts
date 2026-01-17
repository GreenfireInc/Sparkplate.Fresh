// Polkadot (DOT) Staking Pools
// Centralized export for all DOT staking pool integrations

import { KrakenStaking } from './kraken';
import { BinanceStaking } from './binance';
import { CoinbaseStaking } from './coinbase';
import { AcalaLiquidStaking } from './acala';
import { ParallelFinance } from './parallel';
import { BifrostFinance } from './bifrost';
import { NativePolkadotStaking } from './native';

export { KrakenStaking, BinanceStaking, CoinbaseStaking, AcalaLiquidStaking, ParallelFinance, BifrostFinance, NativePolkadotStaking };

/**
 * Polkadot Staking Pools Overview
 * 
 * This module provides TypeScript integrations for major Polkadot staking pools and protocols.
 * Each pool file includes:
 * - Basic pool information
 * - API endpoints and documentation
 * - TypeScript functions for staking operations
 * - Social media links
 * - Integration examples
 * 
 * Available Staking Options:
 * 
 * 1. Kraken - Exchange staking with up to 16.9% APY
 *    - No minimum stake requirement
 *    - Flexible unstaking
 *    - Daily rewards
 *    - API: https://docs.kraken.com/rest/
 * 
 * 2. Binance - Exchange staking with flexible and locked options
 *    - 0.1 DOT minimum stake
 *    - Up to 12% APY
 *    - API: https://binance-docs.github.io/apidocs/spot/en/
 * 
 * 3. Coinbase - User-friendly exchange staking
 *    - No minimum stake requirement
 *    - Variable APY based on network rewards
 *    - API: https://docs.cloud.coinbase.com/
 * 
 * 4. Acala Liquid Staking - Liquid staking with LDOT tokens
 *    - 1 DOT minimum stake
 *    - Instant liquidity with LDOT
 *    - DeFi integration
 *    - SDK: @acala-network/sdk
 * 
 * 5. Parallel Finance - Liquid staking and lending with sDOT
 *    - 1 DOT minimum stake
 *    - Lending and borrowing capabilities
 *    - Enhanced DeFi features
 *    - SDK: @parallel-finance/sdk
 * 
 * 6. Bifrost - Cross-chain liquid staking with vDOT
 *    - 1 DOT minimum stake
 *    - Multi-chain compatibility
 *    - Cross-chain transfers
 *    - SDK: @bifrost-finance/sdk
 * 
 * 7. Native Polkadot Staking - Direct staking on relay chain
 *    - 1 DOT (nomination pools) or 250 DOT (direct nomination)
 *    - Up to 16 validator nominations
 *    - 28-day unbonding period
 *    - SDK: @polkadot/api
 * 
 * Usage Example:
 * 
 * ```typescript
 * import { KrakenStaking, AcalaLiquidStaking, getDOTPrice } from '@/lib/cores/currencyCore/stakingPools/DOT.Polkadot';
 * 
 * // Fetch DOT price
 * const dotPrice = await getDOTPrice();
 * console.log('DOT Price:', dotPrice);
 * 
 * // Access pool information
 * console.log('Kraken:', KrakenStaking.website);
 * console.log('Acala SDK:', AcalaLiquidStaking.sdk.npm);
 * ```
 * 
 * Pricing Data Integration:
 * 
 * For real-time DOT pricing, use:
 * 1. CoinGecko API: https://api.coingecko.com/api/v3/simple/price?ids=polkadot&vs_currencies=usd
 * 2. Binance API: https://api.binance.com/api/v3/ticker/price?symbol=DOTUSDT
 * 3. Kraken API: https://api.kraken.com/0/public/Ticker?pair=DOTUSD
 * 4. Subscan API: https://polkadot.api.subscan.io/api/scan/token
 * 
 * RPC Endpoints:
 * - Polkadot MainNet: wss://rpc.polkadot.io
 * - Polkadot Archive: wss://polkadot.api.onfinality.io/public-ws
 * - Acala: wss://acala-rpc-0.aca-api.network
 * - Parallel: wss://parallel-rpc-0.parallel.fi
 * - Bifrost: wss://bifrost-rpc.liebi.com
 */

// Centralized object for all DOT staking pools
export const DOTStakingPools = {
  Kraken: KrakenStaking,
  Binance: BinanceStaking,
  Coinbase: CoinbaseStaking,
  Acala: AcalaLiquidStaking,
  Parallel: ParallelFinance,
  Bifrost: BifrostFinance,
  Native: NativePolkadotStaking,
};

// Helper function to fetch DOT price from multiple sources
export async function getDOTPrice(): Promise<number> {
  try {
    // Try CoinGecko first
    const response = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=polkadot&vs_currencies=usd'
    );
    if (response.ok) {
      const data = await response.json();
      return data.polkadot?.usd || 0;
    }
  } catch (error) {
    console.warn('CoinGecko DOT price fetch failed:', error);
  }

  try {
    // Fallback to Binance
    const response = await fetch(
      'https://api.binance.com/api/v3/ticker/price?symbol=DOTUSDT'
    );
    if (response.ok) {
      const data = await response.json();
      return parseFloat(data.price) || 0;
    }
  } catch (error) {
    console.warn('Binance DOT price fetch failed:', error);
  }

  try {
    // Fallback to Kraken
    const response = await fetch(
      'https://api.kraken.com/0/public/Ticker?pair=DOTUSD'
    );
    if (response.ok) {
      const data = await response.json();
      return parseFloat(data.result?.DOTUSD?.c?.[0]) || 0;
    }
  } catch (error) {
    console.warn('Kraken DOT price fetch failed:', error);
  }

  try {
    // Fallback to Subscan
    const response = await fetch(
      'https://polkadot.api.subscan.io/api/scan/token'
    );
    if (response.ok) {
      const data = await response.json();
      return data.data?.price || 0;
    }
  } catch (error) {
    console.warn('Subscan DOT price fetch failed:', error);
  }

  return 0;
}

// Helper function to calculate USD value from DOT amount
export async function convertDOTToUSD(dotAmount: number): Promise<number> {
  const price = await getDOTPrice();
  return dotAmount * price;
}

// Helper function to calculate DOT amount from USD value
export async function convertUSDToDOT(usdAmount: number): Promise<number> {
  const price = await getDOTPrice();
  return price > 0 ? usdAmount / price : 0;
}

// Helper function to convert Planck to DOT (1 DOT = 10^10 Planck)
export function planckToDOT(planck: number | string): number {
  const amount = typeof planck === 'string' ? parseInt(planck, 10) : planck;
  return amount / 1_000_000_000_000;
}

// Helper function to convert DOT to Planck
export function dotToPlanck(dot: number): number {
  return Math.floor(dot * 1_000_000_000_000);
}

// Helper function to get all pool names
export function getAllPoolNames(): string[] {
  return [
    'Kraken',
    'Binance',
    'Coinbase',
    'Acala Liquid Staking',
    'Parallel Finance',
    'Bifrost',
    'Native Polkadot Staking',
  ];
}

// Helper function to get exchange staking providers
export function getExchangeStakingProviders(): string[] {
  return ['Kraken', 'Binance', 'Coinbase'];
}

// Helper function to get liquid staking providers
export function getLiquidStakingProviders(): string[] {
  return ['Acala Liquid Staking', 'Parallel Finance', 'Bifrost'];
}

// Helper function to get native staking providers
export function getNativeStakingProviders(): string[] {
  return ['Native Polkadot Staking'];
}

// Helper function to get staking APY range
export function getStakingAPYRange(): { min: number; max: number; average: number } {
  return {
    min: 4,
    max: 16.9,
    average: 10,
  };
}

// Helper function to get staking requirements by type
export function getStakingRequirements(type: 'exchange' | 'liquid' | 'native') {
  const requirements = {
    exchange: {
      minimumStake: '0-0.1 DOT',
      kyc: true,
      unbondingPeriod: '0-28 days',
      fees: 'No fees',
    },
    liquid: {
      minimumStake: '1 DOT',
      kyc: false,
      unbondingPeriod: 'Instant liquidity',
      fees: 'No fees',
    },
    native: {
      minimumStake: '1-250 DOT',
      kyc: false,
      unbondingPeriod: '28 days',
      fees: 'Validator commission',
    },
  };
  
  return requirements[type];
}

// Helper function to get risk factors by type
export function getRiskFactors(type: 'exchange' | 'liquid' | 'native') {
  const risks = {
    exchange: [
      'Centralized custody',
      'Exchange risk',
      'Regulatory risk',
      'Counterparty risk',
    ],
    liquid: [
      'Smart contract risk',
      'Liquidity risk',
      'Slashing risk',
      'Technology risk',
    ],
    native: [
      'Slashing risk',
      'Validator downtime',
      'Commission changes',
      'Unbonding period',
    ],
  };
  
  return risks[type];
}

// Helper function to get staking statistics
export async function getStakingStats() {
  try {
    const response = await fetch('https://polkadot.api.subscan.io/api/scan/staking/overview');
    if (response.ok) {
      const data = await response.json();
      return {
        totalStaked: data.data?.totalStaked || 0,
        totalValidators: data.data?.totalValidators || 0,
        totalNominators: data.data?.totalNominators || 0,
        stakingRatio: data.data?.stakingRatio || 0,
      };
    }
  } catch (error) {
    console.error('Error fetching staking stats:', error);
  }
  
  return null;
}

// Helper function to get nomination pools
export async function getNominationPools() {
  try {
    const response = await fetch('https://polkadot.api.subscan.io/api/scan/nomination_pool/list');
    if (response.ok) {
      const data = await response.json();
      return data.data?.list || [];
    }
  } catch (error) {
    console.error('Error fetching nomination pools:', error);
  }
  
  return [];
}

// Helper function to get validator performance
export async function getValidatorPerformance(validatorAddress: string) {
  try {
    const response = await fetch(`https://polkadot.api.subscan.io/api/scan/staking/validator/${validatorAddress}`);
    if (response.ok) {
      const data = await response.json();
      return data.data;
    }
  } catch (error) {
    console.error('Error fetching validator performance:', error);
  }
  
  return null;
}

// Export default
export default {
  pools: DOTStakingPools,
  getDOTPrice,
  convertDOTToUSD,
  convertUSDToDOT,
  planckToDOT,
  dotToPlanck,
  getAllPoolNames,
  getExchangeStakingProviders,
  getLiquidStakingProviders,
  getNativeStakingProviders,
  getStakingAPYRange,
  getStakingRequirements,
  getRiskFactors,
  getStakingStats,
  getNominationPools,
  getValidatorPerformance,
};

