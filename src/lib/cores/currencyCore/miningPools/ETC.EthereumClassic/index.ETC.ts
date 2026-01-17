// Ethereum Classic (ETC) Mining Pools
// Centralized export for all ETC mining pool integrations

import { TwoMinersPool } from './twoMiners.ETC';
import { EtherminePool } from './ethermine.ETC';
import { NanopoolEtc } from './nanopool.ETC';
import { F2PoolEtc } from './f2Pool.ETC';
import { FlexpoolEtc } from './flexpool.ETC';
import { ViaBtcEtc } from './viaBtc.ETC';
import { HiveonEtc } from './hiveon.ETC';
import { MiningPoolHubEtc } from './miningPoolHub.ETC';

export { TwoMinersPool, EtherminePool, NanopoolEtc, F2PoolEtc, FlexpoolEtc, ViaBtcEtc, HiveonEtc, MiningPoolHubEtc };

// Helper function to fetch ETC price from multiple sources
export async function getETCPrice(): Promise<number> {
  try {
    // Try CoinGecko first
    const response = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=ethereum-classic&vs_currencies=usd'
    );
    if (response.ok) {
      const data = await response.json();
      return data['ethereum-classic']?.usd || 0;
    }
  } catch (error) {
    console.warn('CoinGecko ETC price fetch failed:', error);
  }

  try {
    // Fallback to Binance
    const response = await fetch('https://api.binance.com/api/v3/ticker/price?symbol=ETCUSDT');
    if (response.ok) {
      const data = await response.json();
      return parseFloat(data.price) || 0;
    }
  } catch (error) {
    console.warn('Binance ETC price fetch failed:', error);
  }

  try {
    // Fallback to Kraken
    const response = await fetch('https://api.kraken.com/0/public/Ticker?pair=ETCUSD');
    if (response.ok) {
      const data = await response.json();
      const price = data.result?.ETCUSD?.c?.[0];
      return parseFloat(price) || 0;
    }
  } catch (error) {
    console.warn('Kraken ETC price fetch failed:', error);
  }

  return 0;
}

// Helper function to calculate USD value
export async function calculateETCtoUSD(etcAmount: number): Promise<number> {
  const price = await getETCPrice();
  return etcAmount * price;
}

// Helper function to format ETC amounts (ETC uses 18 decimals like Ethereum)
export function formatETCAmount(wei: string | number): number {
  const weiValue = typeof wei === 'string' ? BigInt(wei) : BigInt(Math.floor(wei));
  const etcValue = Number(weiValue) / 1e18;
  return etcValue;
}

// Helper function to convert ETC to Wei
export function etcToWei(etc: number): bigint {
  return BigInt(Math.floor(etc * 1e18));
}

// Aggregate object for easy access to all pools
export const ETCMiningPools = {
  TwoMiners: TwoMinersPool,
  Ethermine: EtherminePool,
  Nanopool: NanopoolEtc,
  F2Pool: F2PoolEtc,
  Flexpool: FlexpoolEtc,
  ViaBTC: ViaBtcEtc,
  Hiveon: HiveonEtc,
  MiningPoolHub: MiningPoolHubEtc,
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
    TwoMiners: ETCMiningPools.TwoMiners,
    Ethermine: ETCMiningPools.Ethermine,
    Nanopool: ETCMiningPools.Nanopool,
    F2Pool: ETCMiningPools.F2Pool,
    Flexpool: ETCMiningPools.Flexpool,
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
    TwoMiners: ETCMiningPools.TwoMiners,
    Ethermine: ETCMiningPools.Ethermine,
    Nanopool: ETCMiningPools.Nanopool,
    Flexpool: ETCMiningPools.Flexpool,
  };

  const results: Record<string, MinerStats> = {};

  for (const [name, pool] of Object.entries(pools)) {
    try {
      if (typeof pool.fetchAddressStats === 'function') {
        results[name] = await pool.fetchAddressStats(address) as MinerStats;
      } else if (typeof pool.fetchMinerStats === 'function') {
        results[name] = await pool.fetchMinerStats(address) as MinerStats;
      } else if (typeof pool.fetchUserStats === 'function') {
        results[name] = await pool.fetchUserStats(address) as MinerStats;
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
  pools: ETCMiningPools,
  getETCPrice,
  calculateETCtoUSD,
  formatETCAmount,
  etcToWei,
  getAllPoolStats,
  getMinerStatsAllPools,
};
