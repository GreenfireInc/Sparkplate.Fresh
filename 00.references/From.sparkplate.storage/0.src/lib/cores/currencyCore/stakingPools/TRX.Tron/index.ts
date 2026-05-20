// TRX.Tron Staking Pools
// Centralized export for all Tron (TRX) staking pool integrations.

import * as SuperRepresentatives from './superrepresentatives';
import * as Binance from './binance';
import * as Poloniex from './poloniex';
import * as JustLend from './justlend';
import * as SUNIO from './sunio';
import * as APENFT from './apenft';
import * as TronLink from './tronlink';
import * as BitTorrent from './bittorrent';
import * as TronScan from './tronscan';
import * as Sesameseed from './sesameseed';
import * as SocialSwap from './socialswap';
import * as StakingTron from './stakingtron';
import * as Allnodes from './allnodes';
import * as KuCoin from './kucoin';
import * as GateIO from './gateio';

// Re-export all individual staking pool modules for easy access.
export {
  SuperRepresentatives,
  Binance,
  Poloniex,
  JustLend,
  SUNIO,
  APENFT,
  TronLink,
  BitTorrent,
  TronScan,
  Sesameseed,
  SocialSwap,
  StakingTron,
  Allnodes,
  KuCoin,
  GateIO,
};

// Define a common interface for staking pool information.
export interface StakingPoolInfo {
  name: string;
  type: 'native' | 'liquid' | 'exchange' | 'defi' | 'community' | 'validator_service' | 'nft_platform' | 'wallet' | 'super_representative' | 'platform' | 'infrastructure';
  website: string;
  apy?: string; // Annual Percentage Yield
  description: string;
  liquidStakingToken?: {
    symbol: string;
    mintAddress: string;
  };
  // Add other relevant fields like minimum stake, lockup period, etc.
}

// Helper function to get the current TRX price from CoinGecko.
export async function getTRXPrice(): Promise<number | null> {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=tron&vs_currencies=usd');
    const data = await response.json();
    return data['tron']?.usd || null;
  } catch (error) {
    console.error('Error fetching TRX price from CoinGecko:', error);
    return null;
  }
}

// Helper function to convert TRX to USD.
export async function convertTRXToUSD(trxAmount: number): Promise<number | null> {
  const price = await getTRXPrice();
  if (price !== null) {
    return trxAmount * price;
  }
  return null;
}

// Helper function to convert USD to TRX.
export async function convertUSDtoTRX(usdAmount: number): Promise<number | null> {
  const price = await getTRXPrice();
  if (price !== null && price > 0) {
    return usdAmount / price;
  }
  return null;
}

// Function to get all pool names.
export function getAllPoolNames(): string[] {
  return [
    SuperRepresentatives.SuperRepresentativesStaking.name,
    Binance.BinanceStaking.name,
    Poloniex.PoloniexStaking.name,
    JustLend.JustLendDAOStaking.name,
    SUNIO.SUNIOStaking.name,
    APENFT.APENFTStaking.name,
    TronLink.TronLinkStaking.name,
    BitTorrent.BitTorrentSR.name,
    TronScan.TronScanSR.name,
    Sesameseed.SesameseedSR.name,
    SocialSwap.SocialSwapStaking.name,
    StakingTron.StakingTronStaking.name,
    Allnodes.AllnodesStaking.name,
    KuCoin.KuCoinStaking.name,
    GateIO.GateIOStaking.name,
  ];
}

// Function to get all pools with basic information.
export function getAllPools(): StakingPoolInfo[] {
  return [
    SuperRepresentatives.SuperRepresentativesStaking,
    Binance.BinanceStaking,
    Poloniex.PoloniexStaking,
    JustLend.JustLendDAOStaking,
    SUNIO.SUNIOStaking,
    APENFT.APENFTStaking,
    TronLink.TronLinkStaking,
    BitTorrent.BitTorrentSR,
    TronScan.TronScanSR,
    Sesameseed.SesameseedSR,
    SocialSwap.SocialSwapStaking,
    StakingTron.StakingTronStaking,
    Allnodes.AllnodesStaking,
    KuCoin.KuCoinStaking,
    GateIO.GateIOStaking,
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

// Function to get Super Representatives list
export async function getSuperRepresentatives() {
  return await SuperRepresentatives.getSRList();
}

// Function to get account voting information
export async function getAccountVotes(address: string) {
  return await SuperRepresentatives.getAccountVotes(address);
}

// Function to get SR performance data
export async function getSRPerformance() {
  return await SuperRepresentatives.getSRPerformance();
}
