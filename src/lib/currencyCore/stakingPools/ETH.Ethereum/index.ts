// Ethereum (ETH) Staking Pools
// Centralized export for all ETH staking pool integrations

import { LidoStaking } from './lido';
import { RocketPoolStaking } from './rocketPool';
import { CoinbaseStaking } from './coinbase';
import { KrakenStaking } from './kraken';
import { BinanceStaking } from './binance';
import { FraxEtherStaking } from './frax';
import { AnkrStaking } from './ankr';
import { StakeWiseStaking } from './stakeWise';
import { NativeEthereumStaking } from './native';

export { LidoStaking, RocketPoolStaking, CoinbaseStaking, KrakenStaking, BinanceStaking, FraxEtherStaking, AnkrStaking, StakeWiseStaking, NativeEthereumStaking };

/**
 * Ethereum Staking Pools Overview
 * 
 * This module provides TypeScript integrations for major Ethereum staking pools and protocols.
 * Each pool file includes:
 * - Basic pool information
 * - API endpoints and documentation
 * - TypeScript functions for staking operations
 * - Social media links
 * - Integration examples
 * 
 * Available Staking Options:
 * 
 * 1. Lido - Largest liquid staking protocol with stETH tokens
 *    - 0.001 ETH minimum stake
 *    - Variable APY (currently ~3-4%)
 *    - API: https://docs.lido.fi/
 *    - SDK: @lido-sdk/contracts
 * 
 * 2. Rocket Pool - Decentralized liquid staking with rETH tokens
 *    - 0.01 ETH minimum stake
 *    - Variable APY (currently ~3-4%)
 *    - API: https://docs.rocketpool.net/
 *    - SDK: @rocketpool/rocketpool
 * 
 * 3. Coinbase Staking - Exchange staking with cbETH tokens
 *    - No minimum stake requirement
 *    - Variable APY based on network rewards
 *    - API: https://docs.cloud.coinbase.com/
 *    - SDK: coinbase
 * 
 * 4. Kraken Staking - Exchange staking with flexible options
 *    - No minimum stake requirement
 *    - Variable APY based on network rewards
 *    - API: https://docs.kraken.com/rest/
 *    - SDK: kraken-api
 * 
 * 5. Binance Staking - Exchange staking with flexible and locked options
 *    - 0.001 ETH minimum stake
 *    - Variable APY based on network rewards
 *    - API: https://binance-docs.github.io/apidocs/spot/en/
 *    - SDK: binance
 * 
 * 6. Frax Ether - Dual-token liquid staking with frxETH and sfrxETH
 *    - 0.001 ETH minimum stake
 *    - Variable APY based on network rewards
 *    - API: https://docs.frax.finance/
 *    - SDK: @frax-finance/sdk
 * 
 * 7. Ankr - Liquid staking with aETH tokens
 *    - 0.001 ETH minimum stake
 *    - Variable APY based on network rewards
 *    - API: https://docs.ankr.com/
 *    - SDK: @ankr.com/sdk
 * 
 * 8. StakeWise - Liquid staking with sETH2 tokens
 *    - 0.001 ETH minimum stake
 *    - Variable APY based on network rewards
 *    - API: https://docs.stakewise.io/
 *    - SDK: @stakewise/v3-sdk
 * 
 * 9. Native Ethereum Staking - Solo staking through beacon chain
 *    - 32 ETH minimum stake
 *    - Variable APY based on network rewards
 *    - No third-party risk
 *    - SDK: @ethereumjs/client
 * 
 * Usage Example:
 * 
 * ```typescript
 * import { LidoStaking, RocketPoolStaking, getETHPrice } from '@/lib/currencyCore/stakingPools/ETH.Ethereum';
 * 
 * // Fetch ETH price
 * const ethPrice = await getETHPrice();
 * console.log('ETH Price:', ethPrice);
 * 
 * // Access pool information
 * console.log('Lido:', LidoStaking.website);
 * console.log('Rocket Pool SDK:', RocketPoolStaking.sdk.npm);
 * ```
 * 
 * Pricing Data Integration:
 * 
 * For real-time ETH pricing, use:
 * 1. CoinGecko API: https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd
 * 2. Binance API: https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT
 * 3. Kraken API: https://api.kraken.com/0/public/Ticker?pair=ETHUSD
 * 4. Beacon Chain API: https://beaconcha.in/api/v1/validator/stats
 * 
 * RPC Endpoints:
 * - Ethereum MainNet: https://eth-mainnet.g.alchemy.com/v2/YOUR_KEY
 * - Ethereum Archive: https://eth-mainnet.g.alchemy.com/v2/YOUR_KEY
 * - Infura: https://mainnet.infura.io/v3/YOUR_KEY
 * - Public RPC: https://ethereum.publicnode.com
 */

// Centralized object for all ETH staking pools
export const ETHStakingPools = {
  Lido: LidoStaking,
  RocketPool: RocketPoolStaking,
  Coinbase: CoinbaseStaking,
  Kraken: KrakenStaking,
  Binance: BinanceStaking,
  Frax: FraxEtherStaking,
  Ankr: AnkrStaking,
  StakeWise: StakeWiseStaking,
  Native: NativeEthereumStaking,
};

// Helper function to fetch ETH price from multiple sources
export async function getETHPrice(): Promise<number> {
  try {
    // Try CoinGecko first
    const response = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd'
    );
    if (response.ok) {
      const data = await response.json();
      return data.ethereum?.usd || 0;
    }
  } catch (error) {
    console.warn('CoinGecko ETH price fetch failed:', error);
  }

  try {
    // Fallback to Binance
    const response = await fetch(
      'https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT'
    );
    if (response.ok) {
      const data = await response.json();
      return parseFloat(data.price) || 0;
    }
  } catch (error) {
    console.warn('Binance ETH price fetch failed:', error);
  }

  try {
    // Fallback to Kraken
    const response = await fetch(
      'https://api.kraken.com/0/public/Ticker?pair=ETHUSD'
    );
    if (response.ok) {
      const data = await response.json();
      return parseFloat(data.result?.ETHUSD?.c?.[0]) || 0;
    }
  } catch (error) {
    console.warn('Kraken ETH price fetch failed:', error);
  }

  try {
    // Fallback to Coinbase
    const response = await fetch(
      'https://api.coinbase.com/v2/exchange-rates?currency=ETH'
    );
    if (response.ok) {
      const data = await response.json();
      return parseFloat(data.data.rates.USD);
    }
  } catch (error) {
    console.warn('Coinbase ETH price fetch failed:', error);
  }

  return 0;
}

// Helper function to calculate USD value from ETH amount
export async function convertETHToUSD(ethAmount: number): Promise<number> {
  const price = await getETHPrice();
  return ethAmount * price;
}

// Helper function to calculate ETH amount from USD value
export async function convertUSDToETH(usdAmount: number): Promise<number> {
  const price = await getETHPrice();
  return price > 0 ? usdAmount / price : 0;
}

// Helper function to convert Wei to ETH (1 ETH = 10^18 Wei)
export function weiToETH(wei: number | string): number {
  const amount = typeof wei === 'string' ? parseInt(wei, 10) : wei;
  return amount / 1_000_000_000_000_000_000;
}

// Helper function to convert ETH to Wei
export function ethToWei(eth: number): number {
  return Math.floor(eth * 1_000_000_000_000_000_000);
}

// Helper function to get all pool names
export function getAllPoolNames(): string[] {
  return [
    'Lido',
    'Rocket Pool',
    'Coinbase Staking',
    'Kraken Staking',
    'Binance Staking',
    'Frax Ether',
    'Ankr',
    'StakeWise',
    'Native Ethereum Staking',
  ];
}

// Helper function to get liquid staking providers
export function getLiquidStakingProviders(): string[] {
  return ['Lido', 'Rocket Pool', 'Frax Ether', 'Ankr', 'StakeWise'];
}

// Helper function to get exchange staking providers
export function getExchangeStakingProviders(): string[] {
  return ['Coinbase Staking', 'Kraken Staking', 'Binance Staking'];
}

// Helper function to get native staking providers
export function getNativeStakingProviders(): string[] {
  return ['Native Ethereum Staking'];
}

// Helper function to get staking APY range
export function getStakingAPYRange(): { min: number; max: number; average: number } {
  return {
    min: 3,
    max: 6,
    average: 4,
  };
}

// Helper function to get staking requirements by type
export function getStakingRequirements(type: 'liquid' | 'exchange' | 'native') {
  const requirements = {
    liquid: {
      minimumStake: '0.001-0.01 ETH',
      kyc: false,
      unbondingPeriod: 'Instant liquidity',
      fees: 'No fees',
    },
    exchange: {
      minimumStake: '0-0.001 ETH',
      kyc: true,
      unbondingPeriod: 'Flexible',
      fees: 'No fees',
    },
    native: {
      minimumStake: '32 ETH',
      kyc: false,
      unbondingPeriod: 'Until withdrawal credentials set',
      fees: 'No fees (except validator costs)',
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
      'Technical complexity',
      'Hardware failure',
    ],
  };
  
  return risks[type];
}

// Helper function to get staking statistics
export async function getStakingStats() {
  try {
    const response = await fetch('https://beaconcha.in/api/v1/validator/stats');
    if (response.ok) {
      const data = await response.json();
      return {
        totalValidators: data.data.total_validators,
        activeValidators: data.data.active_validators,
        pendingValidators: data.data.pending_validators,
        totalStaked: data.data.total_staked,
      };
    }
  } catch (error) {
    console.error('Error fetching staking stats:', error);
  }
  
  return null;
}

// Helper function to get network health
export async function getNetworkHealth() {
  try {
    const response = await fetch('https://beaconcha.in/api/v1/validator/stats');
    if (response.ok) {
      const data = await response.json();
      const activeValidators = data.data.active_validators;
      const totalValidators = data.data.total_validators;
      const health = (activeValidators / totalValidators) * 100;
      return {
        health: health,
        activeValidators: activeValidators,
        totalValidators: totalValidators,
      };
    }
  } catch (error) {
    console.error('Error fetching network health:', error);
  }
  
  return null;
}

// Helper function to get current epoch
export async function getCurrentEpoch() {
  try {
    const response = await fetch('https://beaconcha.in/api/v1/epoch/latest');
    if (response.ok) {
      const data = await response.json();
      return data.data.epoch;
    }
  } catch (error) {
    console.error('Error fetching current epoch:', error);
  }
  
  return 0;
}

// Helper function to get validator performance
export async function getValidatorPerformance(validatorIndex: string) {
  try {
    const response = await fetch(`https://beaconcha.in/api/v1/validator/${validatorIndex}/performance`);
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
  pools: ETHStakingPools,
  getETHPrice,
  convertETHToUSD,
  convertUSDToETH,
  weiToETH,
  ethToWei,
  getAllPoolNames,
  getLiquidStakingProviders,
  getExchangeStakingProviders,
  getNativeStakingProviders,
  getStakingAPYRange,
  getStakingRequirements,
  getRiskFactors,
  getStakingStats,
  getNetworkHealth,
  getCurrentEpoch,
  getValidatorPerformance,
};

