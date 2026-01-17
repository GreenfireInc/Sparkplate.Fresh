// XRP.Ripple Earning Pools
// Centralized export for all Ripple (XRP) earning pool integrations.

import * as Nexo from './nexo';
import * as Binance from './binance';
import * as Bitrue from './bitrue';
import * as MXRP from './mxrp';
import * as Flare from './flare';
import * as Uphold from './uphold';
import * as Kraken from './kraken';

// Re-export all individual earning pool modules for easy access.
export {
  Nexo,
  Binance,
  Bitrue,
  MXRP,
  Flare,
  Uphold,
  Kraken,
};

// Define a common interface for earning pool information.
export interface EarningPoolInfo {
  name: string;
  type: 'lending' | 'exchange' | 'liquid' | 'defi' | 'wrapped';
  website: string;
  apy?: string; // Annual Percentage Yield
  description: string;
  liquidStakingToken?: {
    symbol: string;
    mintAddress: string;
  };
  // Add other relevant fields like minimum stake, lockup period, etc.
}

// Helper function to get the current XRP price from CoinGecko.
export async function getXRPPrice(): Promise<number | null> {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ripple&vs_currencies=usd');
    const data = await response.json();
    return data['ripple']?.usd || null;
  } catch (error) {
    console.error('Error fetching XRP price from CoinGecko:', error);
    return null;
  }
}

// Helper function to convert XRP to USD.
export async function convertXRPToUSD(xrpAmount: number): Promise<number | null> {
  const price = await getXRPPrice();
  if (price !== null) {
    return xrpAmount * price;
  }
  return null;
}

// Helper function to convert USD to XRP.
export async function convertUSDtoXRP(usdAmount: number): Promise<number | null> {
  const price = await getXRPPrice();
  if (price !== null && price > 0) {
    return usdAmount / price;
  }
  return null;
}

// Function to get all pool names.
export function getAllPoolNames(): string[] {
  return [
    Nexo.NexoEarning.name,
    Binance.BinanceEarn.name,
    Bitrue.BitruePowerPiggy.name,
    MXRP.MXRPLiquidStaking.name,
    Flare.FlareNetworkEarning.name,
    Uphold.UpholdEarn.name,
    Kraken.KrakenLending.name,
  ];
}

// Function to get all pools with basic information.
export function getAllPools(): EarningPoolInfo[] {
  return [
    Nexo.NexoEarning,
    Binance.BinanceEarn,
    Bitrue.BitruePowerPiggy,
    MXRP.MXRPLiquidStaking,
    Flare.FlareNetworkEarning,
    Uphold.UpholdEarn,
    Kraken.KrakenLending,
  ];
}

// Function to get pools by type (e.g., 'lending', 'exchange', 'liquid').
export function getPoolsByType(type: EarningPoolInfo['type']): EarningPoolInfo[] {
  return getAllPools().filter(pool => pool.type === type);
}

// Function to get pools sorted by APY (descending).
export function getPoolsByAPY(): EarningPoolInfo[] {
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

// Function to get the total number of earning options.
export function getTotalEarningOptions(): number {
  return getAllPools().length;
}

// Function to get all supported earning types.
export function getSupportedEarningTypes(): EarningPoolInfo['type'][] {
  const types = new Set<EarningPoolInfo['type']>();
  getAllPools().forEach(pool => types.add(pool.type));
  return Array.from(types);
}

// Function to get all liquid earning tokens with their mint addresses.
export function getLiquidEarningTokens(): { symbol: string; mintAddress: string; name: string }[] {
  return getAllPools()
    .filter(pool => pool.type === 'liquid' && pool.liquidStakingToken)
    .map(pool => ({
      symbol: pool.liquidStakingToken!.symbol,
      mintAddress: pool.liquidStakingToken!.mintAddress,
      name: pool.name,
    }));
}

// Function to get XRP Ledger DEX information
export async function getXRPLDEXInfo() {
  try {
    const response = await fetch('https://api.xrpscan.com/api/v1/ledger/current');
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Error fetching XRPL DEX info:', error);
  }
  return null;
}

// Function to get XRP account information
export async function getXRPAccountInfo(address: string) {
  try {
    const response = await fetch(`https://api.xrpscan.com/api/v1/account/${address}`);
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Error fetching XRP account info:', error);
  }
  return null;
}

// Function to get XRP order book for XRP/USD
export async function getXRPUSDOrderBook() {
  try {
    const response = await fetch('https://api.xrpscan.com/api/v1/account/rN7n7otQDd6FczFgLdSqtcsAUxDkw6fzRH');
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Error fetching XRP/USD order book:', error);
  }
  return null;
}
