// Bitcoin (BTC) Mining Pools
// Centralized export for all BTC mining pool integrations

import { FoundryUSAPool } from './foundryUsa.BTC';
import { AntPool } from './antPool.BTC';
import { F2Pool } from './f2Pool.BTC';
import { ViaBTCPool } from './viaBtc.BTC';
import { BinancePool } from './binancePool.BTC';
import { BraiinsPool } from './braiinsPool.BTC';
import { LuxorPool } from './luxor.BTC';

export { FoundryUSAPool, AntPool, F2Pool, ViaBTCPool, BinancePool, BraiinsPool, LuxorPool };

// Helper function to fetch BTC price from multiple sources
export async function getBTCPrice(): Promise<number> {
  try {
    // Try CoinGecko first
    const response = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd'
    );
    if (response.ok) {
      const data = await response.json();
      return data.bitcoin?.usd || 0;
    }
  } catch (error) {
    console.warn('CoinGecko BTC price fetch failed:', error);
  }

  try {
    // Fallback to Binance
    const response = await fetch(
      'https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT'
    );
    if (response.ok) {
      const data = await response.json();
      return parseFloat(data.price) || 0;
    }
  } catch (error) {
    console.warn('Binance BTC price fetch failed:', error);
  }

  return 0;
}

// Helper function to calculate USD value from BTC amount
export async function calculateBTCtoUSD(btcAmount: number): Promise<number> {
  const btcPrice = await getBTCPrice();
  return btcAmount * btcPrice;
}

// Helper function to get all pool names
export function getAllPoolNames(): string[] {
  return [
    'Foundry USA',
    'AntPool',
    'F2Pool',
    'ViaBTC',
    'Binance Pool',
    'Braiins Pool',
    'Luxor'
  ];
}

// Export a consolidated object with all pools
export const BTCMiningPools = {
  FoundryUSA: FoundryUSAPool,
  AntPool: AntPool,
  F2Pool: F2Pool,
  ViaBTC: ViaBTCPool,
  BinancePool: BinancePool,
  BraiinsPool: BraiinsPool,
  Luxor: LuxorPool,
  
  // Helper functions
  getBTCPrice,
  calculateBTCtoUSD,
  getAllPoolNames
};

// Type definitions for mining pool data
export interface PoolStats {
  hashrate?: string | number;
  miners?: number;
  workers?: number;
  blocks?: number;
  luck?: number;
  [key: string]: unknown;
}

export interface MinerStats {
  address?: string;
  hashrate?: string | number;
  workers?: number;
  earnings?: number;
  unpaid?: number;
  [key: string]: unknown;
}

export interface BlockData {
  height?: number;
  hash?: string;
  timestamp?: number | string;
  reward?: number;
  [key: string]: unknown;
}
