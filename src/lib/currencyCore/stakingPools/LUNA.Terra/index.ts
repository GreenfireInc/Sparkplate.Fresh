// Terra (LUNA) Staking Pools
// Centralized export for all LUNA staking pool integrations

import { TerraStationValidators } from './terraStation';
import { BinanceStaking } from './binance';
import { KrakenStaking } from './kraken';
import { PrismProtocolStaking } from './prism';
import { StaderLabsStaking } from './stader';
import { ErisProtocolStaking } from './eris';
import { BackboneLabsStaking } from './backbone';
import { AllnodesStaking } from './allnodes';
import { StakelyValidator } from './stakely';
import { DAICCapitalValidator } from './daic';

export { 
  TerraStationValidators, 
  BinanceStaking, 
  KrakenStaking, 
  PrismProtocolStaking, 
  StaderLabsStaking, 
  ErisProtocolStaking, 
  BackboneLabsStaking, 
  AllnodesStaking, 
  StakelyValidator, 
  DAICCapitalValidator 
};

/**
 * Terra (LUNA) Staking Pools Overview
 * 
 * This module provides TypeScript integrations for major Terra staking pools and protocols.
 * Each pool file includes:
 * - Basic pool information
 * - API endpoints and documentation
 * - TypeScript functions for staking operations
 * - Social media links
 * - Integration examples
 * 
 * Available Staking Options:
 * 
 * 1. Terra Station Validators - Native staking through Terra Station with 130+ validators
 *    - 1 LUNA minimum stake
 *    - Variable APY based on validator performance
 *    - API: https://phoenix-lcd.terra.dev
 *    - SDK: @terra-money/terra.js
 * 
 * 2. Binance Staking - Exchange staking with flexible and locked options
 *    - 0.001 LUNA minimum stake
 *    - Variable APY based on network rewards
 *    - API: https://api.binance.com
 *    - SDK: binance
 * 
 * 3. Kraken Staking - Exchange staking with flexible options
 *    - No minimum stake requirement
 *    - Variable APY based on network rewards
 *    - API: https://api.kraken.com
 *    - SDK: kraken-api
 * 
 * 4. Prism Protocol - Refracted liquid staking splitting yield and principal (pLUNA/yLUNA)
 *    - 1 LUNA minimum stake
 *    - Variable APY based on network rewards
 *    - API: https://api.prismprotocol.app
 *    - SDK: @prism-protocol/sdk
 * 
 * 5. Stader Labs - Multi-chain liquid staking protocol with LunaX
 *    - 1 LUNA minimum stake
 *    - Variable APY based on network rewards
 *    - API: https://api.staderlabs.com
 *    - SDK: @stader-labs/sdk
 * 
 * 6. Eris Protocol - Amplified liquid staking with auto-compounding rewards (ampLUNA)
 *    - 1 LUNA minimum stake
 *    - Variable APY based on network rewards
 *    - API: https://api.erisprotocol.com
 *    - SDK: @eris-protocol/sdk
 * 
 * 7. Backbone Labs - Liquid staking solution with bLUNA tokens
 *    - 1 LUNA minimum stake
 *    - Variable APY based on network rewards
 *    - API: https://api.backbone.zone
 *    - SDK: @backbone-labs/sdk
 * 
 * 8. Allnodes - Non-custodial staking service
 *    - 1 LUNA minimum stake
 *    - 18.56% APY
 *    - API: https://api.allnodes.com
 *    - SDK: @allnodes/sdk
 * 
 * 9. Stakely - Validator delegation service
 *    - 1 LUNA minimum stake
 *    - Variable APY based on network rewards
 *    - API: https://api.stakely.io
 *    - SDK: @stakely/sdk
 * 
 * 10. DAIC Capital - Community validator with high APY
 *     - 1 LUNA minimum stake
 *     - Up to 28.29% APY
 *     - API: https://api.daic.capital
 *     - SDK: @daic-capital/sdk
 * 
 * Usage Example:
 * 
 * ```typescript
 * import { TerraStationValidators, PrismProtocolStaking, getLUNAPrice } from '@/lib/currencyCore/stakingPools/LUNA.Terra';
 * 
 * // Fetch LUNA price
 * const lunaPrice = await getLUNAPrice();
 * console.log('LUNA Price:', lunaPrice);
 * 
 * // Access pool information
 * console.log('Terra Station:', TerraStationValidators.website);
 * console.log('Prism Protocol SDK:', PrismProtocolStaking.sdk.npm);
 * ```
 * 
 * Pricing Data Integration:
 * 
 * For real-time LUNA pricing, use:
 * 1. CoinGecko API: https://api.coingecko.com/api/v3/simple/price?ids=terra-luna-2&vs_currencies=usd
 * 2. Terra Oracle: https://phoenix-lcd.terra.dev/terra/oracle/v1beta1/denoms/exchange_rates
 * 3. Binance API: https://api.binance.com/api/v3/ticker/price?symbol=LUNAUSDT
 * 4. Kraken API: https://api.kraken.com/0/public/Ticker?pair=LUNAUSD
 * 
 * RPC Endpoints:
 * - Terra MainNet: https://phoenix-lcd.terra.dev
 * - Terra RPC: https://phoenix-rpc.terra.dev
 * - Terra Archive: https://phoenix-archive.terra.dev
 * - Public RPC: https://terra-rpc.publicnode.com
 */

// Centralized object for all LUNA staking pools
export const LUNAStakingPools = {
  TerraStation: TerraStationValidators,
  Binance: BinanceStaking,
  Kraken: KrakenStaking,
  Prism: PrismProtocolStaking,
  Stader: StaderLabsStaking,
  Eris: ErisProtocolStaking,
  Backbone: BackboneLabsStaking,
  Allnodes: AllnodesStaking,
  Stakely: StakelyValidator,
  DAIC: DAICCapitalValidator,
};

// Helper function to fetch LUNA price from multiple sources
export async function getLUNAPrice(): Promise<number> {
  try {
    // Try CoinGecko first
    const response = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=terra-luna-2&vs_currencies=usd'
    );
    if (response.ok) {
      const data = await response.json();
      return data['terra-luna-2']?.usd || 0;
    }
  } catch (error) {
    console.warn('CoinGecko LUNA price fetch failed:', error);
  }

  try {
    // Fallback to Terra Oracle
    const response = await fetch(
      'https://phoenix-lcd.terra.dev/terra/oracle/v1beta1/denoms/exchange_rates'
    );
    if (response.ok) {
      const data = await response.json();
      const lunaRate = data.exchange_rates.find((rate: any) => rate.denom === 'uluna');
      return lunaRate ? parseFloat(lunaRate.exchange_rate) : 0;
    }
  } catch (error) {
    console.warn('Terra Oracle LUNA price fetch failed:', error);
  }

  try {
    // Fallback to Binance
    const response = await fetch(
      'https://api.binance.com/api/v3/ticker/price?symbol=LUNAUSDT'
    );
    if (response.ok) {
      const data = await response.json();
      return parseFloat(data.price) || 0;
    }
  } catch (error) {
    console.warn('Binance LUNA price fetch failed:', error);
  }

  try {
    // Fallback to Kraken
    const response = await fetch(
      'https://api.kraken.com/0/public/Ticker?pair=LUNAUSD'
    );
    if (response.ok) {
      const data = await response.json();
      return parseFloat(data.result?.LUNAUSD?.c?.[0]) || 0;
    }
  } catch (error) {
    console.warn('Kraken LUNA price fetch failed:', error);
  }

  return 0;
}

// Helper function to calculate USD value from LUNA amount
export async function convertLUNAToUSD(lunaAmount: number): Promise<number> {
  const price = await getLUNAPrice();
  return lunaAmount * price;
}

// Helper function to calculate LUNA amount from USD value
export async function convertUSDToLUNA(usdAmount: number): Promise<number> {
  const price = await getLUNAPrice();
  return price > 0 ? usdAmount / price : 0;
}

// Helper function to convert uluna to LUNA (1 LUNA = 10^6 uluna)
export function ulunaToLUNA(uluna: number | string): number {
  const amount = typeof uluna === 'string' ? parseInt(uluna, 10) : uluna;
  return amount / 1_000_000;
}

// Helper function to convert LUNA to uluna
export function lunaToUluna(luna: number): number {
  return Math.floor(luna * 1_000_000);
}

// Helper function to get all pool names
export function getAllPoolNames(): string[] {
  return [
    'Terra Station Validators',
    'Binance Staking',
    'Kraken Staking',
    'Prism Protocol',
    'Stader Labs',
    'Eris Protocol',
    'Backbone Labs',
    'Allnodes',
    'Stakely',
    'DAIC Capital',
  ];
}

// Helper function to get liquid staking providers
export function getLiquidStakingProviders(): string[] {
  return ['Prism Protocol', 'Stader Labs', 'Eris Protocol', 'Backbone Labs'];
}

// Helper function to get exchange staking providers
export function getExchangeStakingProviders(): string[] {
  return ['Binance Staking', 'Kraken Staking'];
}

// Helper function to get native staking providers
export function getNativeStakingProviders(): string[] {
  return ['Terra Station Validators', 'Allnodes', 'Stakely', 'DAIC Capital'];
}

// Helper function to get staking APY range
export function getStakingAPYRange(): { min: number; max: number; average: number } {
  return {
    min: 3,
    max: 28.29,
    average: 8,
  };
}

// Helper function to get staking requirements by type
export function getStakingRequirements(type: 'liquid' | 'exchange' | 'native') {
  const requirements = {
    liquid: {
      minimumStake: '1 LUNA',
      kyc: false,
      unbondingPeriod: 'Instant liquidity',
      fees: 'No fees',
    },
    exchange: {
      minimumStake: '0-0.001 LUNA',
      kyc: true,
      unbondingPeriod: 'Flexible',
      fees: 'No fees',
    },
    native: {
      minimumStake: '1 LUNA',
      kyc: false,
      unbondingPeriod: '21-day unbonding period',
      fees: 'Validator commission (5-20%)',
    },
  };
  
  return requirements[type];
}

// Helper function to get risk factors by type
export function getRiskFactors(type: 'liquid' | 'exchange' | 'native') {
  const risks = {
    liquid: [
      'Smart contract risk',
      'Liquidity risk',
      'Slashing risk',
      'Technology risk',
    ],
    exchange: [
      'Centralized custody',
      'Exchange risk',
      'Regulatory risk',
      'Counterparty risk',
    ],
    native: [
      'Slashing risk',
      'Validator downtime',
      '21-day unbonding period',
      'Commission changes',
    ],
  };
  
  return risks[type];
}

// Helper function to get staking statistics
export async function getStakingStats() {
  try {
    const response = await fetch('https://phoenix-lcd.terra.dev/cosmos/staking/v1beta1/pool');
    if (response.ok) {
      const data = await response.json();
      return {
        bondedTokens: data.pool.bonded_tokens,
        notBondedTokens: data.pool.not_bonded_tokens,
        totalSupply: parseFloat(data.pool.bonded_tokens) + parseFloat(data.pool.not_bonded_tokens),
      };
    }
  } catch (error) {
    console.error('Error fetching staking stats:', error);
  }
  
  return null;
}

// Helper function to get validator count
export async function getValidatorCount() {
  try {
    const response = await fetch('https://phoenix-lcd.terra.dev/cosmos/staking/v1beta1/validators');
    if (response.ok) {
      const data = await response.json();
      return data.validators.length;
    }
  } catch (error) {
    console.error('Error fetching validator count:', error);
  }
  
  return 0;
}

// Helper function to get current epoch
export async function getCurrentEpoch() {
  try {
    const response = await fetch('https://phoenix-lcd.terra.dev/cosmos/staking/v1beta1/pool');
    if (response.ok) {
      const data = await response.json();
      return data.pool;
    }
  } catch (error) {
    console.error('Error fetching current epoch:', error);
  }
  
  return null;
}

// Helper function to get validator performance
export async function getValidatorPerformance(validatorAddress: string) {
  try {
    const response = await fetch(`https://phoenix-lcd.terra.dev/cosmos/staking/v1beta1/validators/${validatorAddress}`);
    if (response.ok) {
      const data = await response.json();
      return data.validator;
    }
  } catch (error) {
    console.error('Error fetching validator performance:', error);
  }
  
  return null;
}

// Export default
export default {
  pools: LUNAStakingPools,
  getLUNAPrice,
  convertLUNAToUSD,
  convertUSDToLUNA,
  ulunaToLUNA,
  lunaToUluna,
  getAllPoolNames,
  getLiquidStakingProviders,
  getExchangeStakingProviders,
  getNativeStakingProviders,
  getStakingAPYRange,
  getStakingRequirements,
  getRiskFactors,
  getStakingStats,
  getValidatorCount,
  getCurrentEpoch,
  getValidatorPerformance,
};

