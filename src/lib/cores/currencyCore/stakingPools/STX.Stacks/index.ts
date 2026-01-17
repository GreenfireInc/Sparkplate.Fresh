// STX.Stacks Staking Pools
// Centralized export for all Stacks (STX) staking pool integrations.

import * as PlanBetter from './planbetter';
import * as Xverse from './xverse';
import * as Hiro from './hiro';
import * as StackingDAO from './stackingdao';
import * as OKCoin from './okcoin';
import * as GateIO from './gateio';
import * as KuCoin from './kucoin';
import * as Native from './native';

// Re-export all individual staking pool modules for easy access.
export {
  PlanBetter,
  Xverse,
  Hiro,
  StackingDAO,
  OKCoin,
  GateIO,
  KuCoin,
  Native,
};

// Define a common interface for staking pool information.
export interface StakingPoolInfo {
  name: string;
  type: 'native' | 'liquid' | 'exchange' | 'defi' | 'community' | 'validator_service';
  website: string;
  apy?: string; // Annual Percentage Yield
  description: string;
  liquidStakingToken?: {
    symbol: string;
    mintAddress: string;
  };
  // Add other relevant fields like minimum stake, lockup period, etc.
}

// Helper function to get the current STX price from CoinGecko.
export async function getSTXPrice(): Promise<number | null> {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=blockstack&vs_currencies=usd');
    const data = await response.json();
    return data['blockstack']?.usd || null;
  } catch (error) {
    console.error('Error fetching STX price from CoinGecko:', error);
    return null;
  }
}

// Helper function to convert STX to USD.
export async function convertSTXToUSD(stxAmount: number): Promise<number | null> {
  const price = await getSTXPrice();
  if (price !== null) {
    return stxAmount * price;
  }
  return null;
}

// Helper function to convert USD to STX.
export async function convertUSDtoSTX(usdAmount: number): Promise<number | null> {
  const price = await getSTXPrice();
  if (price !== null && price > 0) {
    return usdAmount / price;
  }
  return null;
}

// Function to get all pool names.
export function getAllPoolNames(): string[] {
  return [
    PlanBetter.PlanBetterStaking.name,
    Xverse.XverseStaking.name,
    Hiro.HiroStaking.name,
    StackingDAO.StackingDAOStaking.name,
    OKCoin.OKCoinStaking.name,
    GateIO.GateIOStaking.name,
    KuCoin.KuCoinStaking.name,
    Native.NativeStaking.name,
  ];
}

// Function to get all pools with basic information.
export function getAllPools(): StakingPoolInfo[] {
  return [
    PlanBetter.PlanBetterStaking,
    Xverse.XverseStaking,
    Hiro.HiroStaking,
    StackingDAO.StackingDAOStaking,
    OKCoin.OKCoinStaking,
    GateIO.GateIOStaking,
    KuCoin.KuCoinStaking,
    Native.NativeStaking,
  ];
}

// Function to get pools by type (e.g., 'native', 'liquid', 'exchange').
export function getPoolsByType(type: StakingPoolInfo['type']): StakingPoolInfo[] {
  return getAllPools().filter(pool => pool.type === type);
}

// Function to get pools sorted by APY (descending).
export function getPoolsByAPY(): StakingPoolInfo[] {
  return getAllPools().filter(pool => pool.apy).sort((a, b) => {
    const apyA = parseFloat(a.apy || '0');
    const apyB = parseFloat(b.apy || '0');
    return apyB - apyA;
  });
}

// Function to check if a specific pool is available.
export function isPoolAvailable(poolName: string): boolean {
  return getAllPoolNames().includes(poolName);
}

// Function to get the total number of staking options.
export function getTotalStakingOptions(): number {
  return getAllPools().length;
}

// Function to get all supported staking types.
export function getSupportedStakingTypes(): StakingPoolInfo['type'][] {
  const types = new Set<StakingPoolInfo['type']>();
  getAllPools().forEach(pool => types.add(pool.type));
  return Array.from(types);
}

// Function to get all liquid staking tokens with their mint addresses.
export function getLiquidStakingTokens(): { symbol: string; mintAddress: string; name: string }[] {
  return getAllPools()
    .filter(pool => pool.type === 'liquid' && pool.liquidStakingToken)
    .map(pool => ({
      symbol: pool.liquidStakingToken!.symbol,
      mintAddress: pool.liquidStakingToken!.mintAddress,
      name: pool.name,
    }));
}
