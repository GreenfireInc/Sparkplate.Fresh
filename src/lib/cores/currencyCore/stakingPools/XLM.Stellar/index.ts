// XLM.Stellar Earning Pools
// Centralized export for all Stellar (XLM) earning pool integrations.

import * as Nexo from './nexo';
import * as YouHodler from './youhodler';
import * as Binance from './binance';
import * as UltraStellar from './ultrastellar';
import * as Aqua from './aqua';
import * as Coinbase from './coinbase';
import * as Bitrue from './bitrue';

// Re-export all individual earning pool modules for easy access.
export {
  Nexo,
  YouHodler,
  Binance,
  UltraStellar,
  Aqua,
  Coinbase,
  Bitrue,
};

// Define a common interface for earning pool information.
export interface EarningPoolInfo {
  name: string;
  type: 'lending' | 'exchange' | 'defi' | 'liquidity' | 'governance';
  website: string;
  apy?: string; // Annual Percentage Yield
  description: string;
  liquidStakingToken?: {
    symbol: string;
    mintAddress: string;
  };
  // Add other relevant fields like minimum stake, lockup period, etc.
}

// Helper function to get the current XLM price from CoinGecko.
export async function getXLMPrice(): Promise<number | null> {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=stellar&vs_currencies=usd');
    const data = await response.json();
    return data['stellar']?.usd || null;
  } catch (error) {
    console.error('Error fetching XLM price from CoinGecko:', error);
    return null;
  }
}

// Helper function to convert XLM to USD.
export async function convertXLMToUSD(xlmAmount: number): Promise<number | null> {
  const price = await getXLMPrice();
  if (price !== null) {
    return xlmAmount * price;
  }
  return null;
}

// Helper function to convert USD to XLM.
export async function convertUSDtoXLM(usdAmount: number): Promise<number | null> {
  const price = await getXLMPrice();
  if (price !== null && price > 0) {
    return usdAmount / price;
  }
  return null;
}

// Function to get all pool names.
export function getAllPoolNames(): string[] {
  return [
    Nexo.NexoEarning.name,
    YouHodler.YouHodlerEarning.name,
    Binance.BinanceEarn.name,
    UltraStellar.UltraStellarEarning.name,
    Aqua.AquaRewards.name,
    Coinbase.CoinbaseEarn.name,
    Bitrue.BitrueEarning.name,
  ];
}

// Function to get all pools with basic information.
export function getAllPools(): EarningPoolInfo[] {
  return [
    Nexo.NexoEarning,
    YouHodler.YouHodlerEarning,
    Binance.BinanceEarn,
    UltraStellar.UltraStellarEarning,
    Aqua.AquaRewards,
    Coinbase.CoinbaseEarn,
    Bitrue.BitrueEarning,
  ];
}

// Function to get pools by type (e.g., 'lending', 'exchange', 'defi').
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
    .filter(pool => pool.type === 'defi' && pool.liquidStakingToken)
    .map(pool => ({
      symbol: pool.liquidStakingToken!.symbol,
      mintAddress: pool.liquidStakingToken!.mintAddress,
      name: pool.name,
    }));
}

// Function to get Stellar DEX information
export async function getStellarDEXInfo() {
  try {
    const response = await fetch('https://horizon.stellar.org/');
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Error fetching Stellar DEX info:', error);
  }
  return null;
}

// Function to get Stellar account information
export async function getStellarAccountInfo(address: string) {
  try {
    const response = await fetch(`https://horizon.stellar.org/accounts/${address}`);
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Error fetching Stellar account info:', error);
  }
  return null;
}

// Function to get Stellar order book for XLM/USDC
export async function getXLMUSDCOrderBook() {
  try {
    const response = await fetch('https://horizon.stellar.org/order_book?selling_asset_type=native&buying_asset_type=credit_alphanum4&buying_asset_code=USDC&buying_asset_issuer=GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN');
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Error fetching XLM/USDC order book:', error);
  }
  return null;
}
