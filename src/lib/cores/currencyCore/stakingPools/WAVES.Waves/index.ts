// WAVES.Waves Staking Pools
// Centralized export for all Waves (WAVES) staking pool integrations.

import * as WavesExchange from './wavesexchange';
import * as WavesKeeper from './waveskeeper';
import * as Neutrino from './neutrino';
import * as WavesDAO from './wavesdao';
import * as CommunityNodes from './communitynodes';
import * as Binance from './binance';
import * as ViresFinance from './viresfinance';

// Re-export all individual staking pool modules for easy access.
export {
  WavesExchange,
  WavesKeeper,
  Neutrino,
  WavesDAO,
  CommunityNodes,
  Binance,
  ViresFinance,
};

// Define a common interface for staking pool information.
export interface StakingPoolInfo {
  name: string;
  type: 'native' | 'liquid' | 'exchange' | 'defi' | 'community' | 'validator_service' | 'governance' | 'wallet';
  website: string;
  apy?: string; // Annual Percentage Yield
  description: string;
  liquidStakingToken?: {
    symbol: string;
    mintAddress: string;
  };
  // Add other relevant fields like minimum stake, lockup period, etc.
}

// Helper function to get the current WAVES price from CoinGecko.
export async function getWAVESPrice(): Promise<number | null> {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=waves&vs_currencies=usd');
    const data = await response.json();
    return data['waves']?.usd || null;
  } catch (error) {
    console.error('Error fetching WAVES price from CoinGecko:', error);
    return null;
  }
}

// Helper function to convert WAVES to USD.
export async function convertWAVESToUSD(wavesAmount: number): Promise<number | null> {
  const price = await getWAVESPrice();
  if (price !== null) {
    return wavesAmount * price;
  }
  return null;
}

// Helper function to convert USD to WAVES.
export async function convertUSDtoWAVES(usdAmount: number): Promise<number | null> {
  const price = await getWAVESPrice();
  if (price !== null && price > 0) {
    return usdAmount / price;
  }
  return null;
}

// Function to get all pool names.
export function getAllPoolNames(): string[] {
  return [
    WavesExchange.WavesExchangeLeasing.name,
    WavesKeeper.WavesKeeperLeasing.name,
    Neutrino.NeutrinoStaking.name,
    WavesDAO.WavesDAOStaking.name,
    CommunityNodes.CommunityNodesLeasing.name,
    Binance.BinanceStaking.name,
    ViresFinance.ViresFinanceStaking.name,
  ];
}

// Function to get all pools with basic information.
export function getAllPools(): StakingPoolInfo[] {
  return [
    WavesExchange.WavesExchangeLeasing,
    WavesKeeper.WavesKeeperLeasing,
    Neutrino.NeutrinoStaking,
    WavesDAO.WavesDAOStaking,
    CommunityNodes.CommunityNodesLeasing,
    Binance.BinanceStaking,
    ViresFinance.ViresFinanceStaking,
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

// Function to get community nodes
export async function getCommunityNodes() {
  return await CommunityNodes.getCommunityNodes();
}

// Function to get leasing information
export async function getLeasingInfo(address: string) {
  return await WavesKeeper.getLeasingInfo(address);
}

// Function to get governance information
export async function getGovernanceInfo() {
  return await WavesDAO.getGovernanceInfo();
}
