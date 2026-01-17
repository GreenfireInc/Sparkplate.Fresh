// XTZ.Tezos Staking Pools
// Centralized export for all Tezos (XTZ) staking pool integrations.

import * as Native from './native';
import * as Coinbase from './coinbase';
import * as Binance from './binance';
import * as Kraken from './kraken';
import * as Everstake from './everstake';
import * as Temple from './temple';
import * as Kukai from './kukai';
import * as Kiln from './kiln';
import * as P2P from './p2p';
import * as ChorusOne from './chorusone';
import * as StakeFish from './stakefish';
import * as Figment from './figment';
import * as BakingBad from './bakingbad';
import * as Ledger from './ledger';
import * as QuipuSwap from './quipuswap';
import * as Plenty from './plenty';
import * as SpicySwap from './spicyswap';
import * as Youves from './youves';
import * as Guarda from './guarda';
import * as StXTZ from './stxtz';

// Re-export all individual staking pool modules for easy access.
export {
  Native,
  Coinbase,
  Binance,
  Kraken,
  Everstake,
  Temple,
  Kukai,
  Kiln,
  P2P,
  ChorusOne,
  StakeFish,
  Figment,
  BakingBad,
  Ledger,
  QuipuSwap,
  Plenty,
  SpicySwap,
  Youves,
  Guarda,
  StXTZ,
};

// Define a common interface for staking pool information.
export interface StakingPoolInfo {
  name: string;
  type: 'native' | 'exchange' | 'professional' | 'wallet' | 'enterprise' | 'community' | 'defi' | 'liquid';
  website: string;
  apy?: string; // Annual Percentage Yield
  description: string;
  liquidStakingToken?: {
    symbol: string;
    mintAddress: string;
  };
  // Add other relevant fields like minimum stake, lockup period, etc.
}

// Helper function to get the current XTZ price from CoinGecko.
export async function getXTZPrice(): Promise<number | null> {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=tezos&vs_currencies=usd');
    const data = await response.json();
    return data['tezos']?.usd || null;
  } catch (error) {
    console.error('Error fetching XTZ price from CoinGecko:', error);
    return null;
  }
}

// Helper function to convert XTZ to USD.
export async function convertXTZToUSD(xtzAmount: number): Promise<number | null> {
  const price = await getXTZPrice();
  if (price !== null) {
    return xtzAmount * price;
  }
  return null;
}

// Helper function to convert USD to XTZ.
export async function convertUSDtoXTZ(usdAmount: number): Promise<number | null> {
  const price = await getXTZPrice();
  if (price !== null && price > 0) {
    return usdAmount / price;
  }
  return null;
}

// Function to get all pool names.
export function getAllPoolNames(): string[] {
  return [
    Native.NativeTezosBaking.name,
    Coinbase.CoinbaseStaking.name,
    Binance.BinanceStaking.name,
    Kraken.KrakenStaking.name,
    Everstake.EverstakeBaker.name,
    Temple.TempleWalletDelegation.name,
    Kukai.KukaiDelegation.name,
    Kiln.KilnStaking.name,
    P2P.P2PStaking.name,
    ChorusOne.ChorusOneStaking.name,
    StakeFish.StakeFishStaking.name,
    Figment.FigmentStaking.name,
    BakingBad.BakingBadStaking.name,
    Ledger.LedgerLiveStaking.name,
    QuipuSwap.QuipuSwapStaking.name,
    Plenty.PlentyDeFiStaking.name,
    SpicySwap.SpicySwapStaking.name,
    Youves.YouvesStaking.name,
    Guarda.GuardaWalletStaking.name,
    StXTZ.StXTZLiquidStaking.name,
  ];
}

// Function to get all pools with basic information.
export function getAllPools(): StakingPoolInfo[] {
  return [
    Native.NativeTezosBaking,
    Coinbase.CoinbaseStaking,
    Binance.BinanceStaking,
    Kraken.KrakenStaking,
    Everstake.EverstakeBaker,
    Temple.TempleWalletDelegation,
    Kukai.KukaiDelegation,
    Kiln.KilnStaking,
    P2P.P2PStaking,
    ChorusOne.ChorusOneStaking,
    StakeFish.StakeFishStaking,
    Figment.FigmentStaking,
    BakingBad.BakingBadStaking,
    Ledger.LedgerLiveStaking,
    QuipuSwap.QuipuSwapStaking,
    Plenty.PlentyDeFiStaking,
    SpicySwap.SpicySwapStaking,
    Youves.YouvesStaking,
    Guarda.GuardaWalletStaking,
    StXTZ.StXTZLiquidStaking,
  ];
}

// Function to get pools by type (e.g., 'native', 'exchange', 'professional', 'wallet').
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
    .filter(pool => pool.type === 'native' && pool.liquidStakingToken)
    .map(pool => ({
      symbol: pool.liquidStakingToken!.symbol,
      mintAddress: pool.liquidStakingToken!.mintAddress,
      name: pool.name,
    }));
}

// Function to get Tezos network information
export async function getTezosNetworkInfo() {
  try {
    const response = await fetch('https://api.tzkt.io/v1/head');
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Error fetching Tezos network info:', error);
  }
  return null;
}

// Function to get Tezos account information
export async function getTezosAccountInfo(address: string) {
  try {
    const response = await fetch(`https://api.tzkt.io/v1/accounts/${address}`);
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Error fetching Tezos account info:', error);
  }
  return null;
}

// Function to get Tezos bakers information
export async function getTezosBakers() {
  try {
    const response = await fetch('https://api.tzkt.io/v1/bakers?active=true&limit=50');
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Error fetching Tezos bakers:', error);
  }
  return null;
}

// Function to get Tezos cycle information
export async function getTezosCycleInfo(cycle?: number) {
  try {
    const url = cycle 
      ? `https://api.tzkt.io/v1/cycles/${cycle}`
      : 'https://api.tzkt.io/v1/cycles';
    const response = await fetch(url);
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Error fetching Tezos cycle info:', error);
  }
  return null;
}
