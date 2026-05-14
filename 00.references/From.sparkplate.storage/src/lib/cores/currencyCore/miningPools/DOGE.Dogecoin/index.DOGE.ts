// Dogecoin (DOGE) Mining Pools
// Centralized export for all DOGE mining pool integrations

import { ProhashingPool } from './prohashing.DOGE';
import { F2Pool } from './f2Pool.DOGE';
import { ViaBTCPool } from './viaBTC.DOGE';
import { LitecoinPool } from './litecoinPool.DOGE';
import { AikaPool } from './aikaPool.DOGE';
import { Poolin } from './poolin.DOGE';
import { ZergPool } from './zergPool.DOGE';
import { TwoMinersPool } from './twoMiners.DOGE';
import { MiningPoolHub } from './miningPoolHub.DOGE';
import { MultipoolUs } from './multipool.DOGE';

export { ProhashingPool, F2Pool, ViaBTCPool, LitecoinPool, AikaPool, Poolin, ZergPool, TwoMinersPool, MiningPoolHub, MultipoolUs };

// Helper function to fetch DOGE price from multiple sources
export async function getDOGEPrice(): Promise<number> {
  try {
    // Try CoinGecko first
    const response = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=dogecoin&vs_currencies=usd'
    );
    if (response.ok) {
      const data = await response.json();
      return data.dogecoin?.usd || 0;
    }
  } catch (error) {
    console.warn('CoinGecko DOGE price fetch failed:', error);
  }

  try {
    // Fallback to Binance
    const response = await fetch('https://api.binance.com/api/v3/ticker/price?symbol=DOGEUSDT');
    if (response.ok) {
      const data = await response.json();
      return parseFloat(data.price) || 0;
    }
  } catch (error) {
    console.warn('Binance DOGE price fetch failed:', error);
  }

  try {
    // Fallback to Kraken
    const response = await fetch('https://api.kraken.com/0/public/Ticker?pair=DOGEUSD');
    if (response.ok) {
      const data = await response.json();
      const price = data.result?.DOGEUSD?.c?.[0];
      return parseFloat(price) || 0;
    }
  } catch (error) {
    console.warn('Kraken DOGE price fetch failed:', error);
  }

  return 0;
}

// Helper function to calculate USD value from DOGE amount
export async function calculateDogeValue(dogeAmount: number): Promise<number> {
  const priceUsd = await getDOGEPrice();
  return dogeAmount * priceUsd;
}

// Helper function to get all pool names
export function getAllPoolNames(): string[] {
  return [
    'Prohashing',
    'F2Pool',
    'ViaBTC',
    'LitecoinPool.org',
    'AikaPool',
    'Poolin',
    'ZergPool',
    '2Miners',
    'MiningPoolHub',
    'Multipool',
  ];
}

// Helper type for pool statistics
export interface PoolStats {
  poolName: string;
  hashrate?: string | number;
  miners?: number;
  workers?: number;
  blocks24h?: number;
  lastBlock?: string | number;
}

// Aggregate pool object for easy access
export const DOGEMiningPools = {
  Prohashing: ProhashingPool,
  F2Pool: F2Pool,
  ViaBTC: ViaBTCPool,
  LitecoinPool: LitecoinPool,
  AikaPool: AikaPool,
  Poolin: Poolin,
  ZergPool: ZergPool,
  TwoMiners: TwoMinersPool,
  MiningPoolHub: MiningPoolHub,
  Multipool: MultipoolUs,
};

