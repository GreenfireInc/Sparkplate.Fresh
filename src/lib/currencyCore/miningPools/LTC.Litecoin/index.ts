// Litecoin (LTC) Mining Pools
// Centralized export for all LTC mining pool integrations

import { LitecoinpoolOrg } from './litecoinpool';
import { F2PoolLtc } from './f2Pool';
import { ViaBtcLtc } from './viaBtc';
import { ProhashingLtc } from './prohashing';
import { PoolinLtc } from './poolin';
import { AntPoolLtc } from './antPool';
import { TwoMinersLtc } from './twoMiners';

export { LitecoinpoolOrg, F2PoolLtc, ViaBtcLtc, ProhashingLtc, PoolinLtc, AntPoolLtc, TwoMinersLtc };

// Helper function to fetch LTC price from multiple sources
export async function getLTCPrice(): Promise<number> {
  try {
    // Try CoinGecko first
    const response = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=litecoin&vs_currencies=usd'
    );
    if (response.ok) {
      const data = await response.json();
      return data.litecoin?.usd || 0;
    }
  } catch (error) {
    console.warn('CoinGecko LTC price fetch failed:', error);
  }

  try {
    // Fallback to Binance
    const response = await fetch('https://api.binance.com/api/v3/ticker/price?symbol=LTCUSDT');
    if (response.ok) {
      const data = await response.json();
      return parseFloat(data.price) || 0;
    }
  } catch (error) {
    console.warn('Binance LTC price fetch failed:', error);
  }

  try {
    // Fallback to Kraken
    const response = await fetch('https://api.kraken.com/0/public/Ticker?pair=LTCUSD');
    if (response.ok) {
      const data = await response.json();
      const price = data.result?.XLTCZUSD?.c?.[0];
      return parseFloat(price) || 0;
    }
  } catch (error) {
    console.warn('Kraken LTC price fetch failed:', error);
  }

  return 0;
}

// Helper function to calculate USD value
export async function calculateLTCtoUSD(ltcAmount: number): Promise<number> {
  const price = await getLTCPrice();
  return ltcAmount * price;
}

// Helper function to format LTC amounts (LTC uses 8 decimals like Bitcoin)
export function formatLTCAmount(satoshis: string | number): number {
  const satoshiValue = typeof satoshis === 'string' ? BigInt(satoshis) : BigInt(Math.floor(satoshis));
  const ltcValue = Number(satoshiValue) / 1e8;
  return ltcValue;
}

// Helper function to convert LTC to satoshis
export function ltcToSatoshis(ltc: number): bigint {
  return BigInt(Math.floor(ltc * 1e8));
}

// Aggregate object for easy access to all pools
export const LTCMiningPools = {
  LitecoinpoolOrg: LitecoinpoolOrg,
  F2Pool: F2PoolLtc,
  ViaBTC: ViaBtcLtc,
  Prohashing: ProhashingLtc,
  Poolin: PoolinLtc,
  AntPool: AntPoolLtc,
  TwoMiners: TwoMinersLtc,
};

// Type definitions for pool data
export interface PoolStats {
  hashrate?: number;
  miners?: number;
  workers?: number;
  blocks?: number;
  [key: string]: unknown;
}

export interface MinerStats {
  address?: string;
  hashrate?: number;
  balance?: number;
  workers?: number;
  [key: string]: unknown;
}

// Helper function to get all pool statistics
export async function getAllPoolStats(): Promise<Record<string, PoolStats>> {
  const pools = {
    TwoMiners: LTCMiningPools.TwoMiners,
    F2Pool: LTCMiningPools.F2Pool,
    ViaBTC: LTCMiningPools.ViaBTC,
  };

  const results: Record<string, PoolStats> = {};

  for (const [name, pool] of Object.entries(pools)) {
    try {
      if (typeof pool.fetchPoolStats === 'function') {
        results[name] = await pool.fetchPoolStats() as PoolStats;
      }
    } catch (error) {
      console.error(`Failed to fetch stats for ${name}:`, error);
      results[name] = {};
    }
  }

  return results;
}

// Helper function to get miner stats across all pools
export async function getMinerStatsAllPools(address: string): Promise<Record<string, MinerStats>> {
  const pools = {
    TwoMiners: LTCMiningPools.TwoMiners,
  };

  const results: Record<string, MinerStats> = {};

  for (const [name, pool] of Object.entries(pools)) {
    try {
      if (typeof pool.fetchMinerStats === 'function') {
        results[name] = await pool.fetchMinerStats(address) as MinerStats;
      }
    } catch (error) {
      console.error(`Failed to fetch miner stats for ${name}:`, error);
      results[name] = {};
    }
  }

  return results;
}

// Export default object
export default {
  pools: LTCMiningPools,
  getLTCPrice,
  calculateLTCtoUSD,
  formatLTCAmount,
  ltcToSatoshis,
  getAllPoolStats,
  getMinerStatsAllPools,
};

