// LUNC.TerraClassic Staking Pools Module
// Terra Classic (LUNC) staking integrations

import * as TerraClassicValidators from './terraClassicValidators';
import * as Binance from './binance';
import * as KuCoin from './kucoin';
import * as CryptoCom from './cryptoCom';
import * as OrionMoney from './orionMoney';
import * as CommunityValidators from './communityValidators';
import * as Allnodes from './allnodes';
import * as Stakely from './stakely';
import * as DAIC from './daic';

// Re-export all staking pools
export {
  TerraClassicValidators,
  Binance,
  KuCoin,
  CryptoCom,
  OrionMoney,
  CommunityValidators,
  Allnodes,
  Stakely,
  DAIC,
};

// Helper function to get LUNC price
export async function getLUNCPrice(): Promise<number> {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=terra-luna-classic&vs_currencies=usd');
    if (response.ok) {
      const data = await response.json();
      return data['terra-luna-classic']?.usd || 0;
    }
  } catch (error) {
    console.error('Error fetching LUNC price:', error);
  }
  return 0;
}

// Helper function to convert LUNC to USD
export async function convertLUNCToUSD(luncAmount: number): Promise<number> {
  const price = await getLUNCPrice();
  return luncAmount * price;
}

// Helper function to convert USD to LUNC
export async function convertUSDtoLUNC(usdAmount: number): Promise<number> {
  const price = await getLUNCPrice();
  return price > 0 ? usdAmount / price : 0;
}

// Helper function to get all pool names
export function getAllPoolNames(): string[] {
  return [
    'Terra Classic Validators',
    'Binance',
    'KuCoin',
    'Crypto.com',
    'Orion Money',
    'Community Validators',
    'Allnodes',
    'Stakely',
    'DAIC Capital',
  ];
}

// Helper function to get all pools with their basic info
export function getAllPools() {
  return {
    TerraClassicValidators: {
      name: TerraClassicValidators.TerraClassicValidators.name,
      type: TerraClassicValidators.TerraClassicValidators.type,
      website: TerraClassicValidators.TerraClassicValidators.website,
      apy: TerraClassicValidators.TerraClassicValidators.apy,
    },
    Binance: {
      name: Binance.BinanceStaking.name,
      type: Binance.BinanceStaking.type,
      website: Binance.BinanceStaking.website,
      apy: Binance.BinanceStaking.apy,
    },
    KuCoin: {
      name: KuCoin.KuCoinStaking.name,
      type: KuCoin.KuCoinStaking.type,
      website: KuCoin.KuCoinStaking.website,
      apy: KuCoin.KuCoinStaking.apy,
    },
    CryptoCom: {
      name: CryptoCom.CryptoComStaking.name,
      type: CryptoCom.CryptoComStaking.type,
      website: CryptoCom.CryptoComStaking.website,
      apy: CryptoCom.CryptoComStaking.apy,
    },
    OrionMoney: {
      name: OrionMoney.OrionMoneyStaking.name,
      type: OrionMoney.OrionMoneyStaking.type,
      website: OrionMoney.OrionMoneyStaking.website,
      apy: OrionMoney.OrionMoneyStaking.apy,
    },
    CommunityValidators: {
      name: CommunityValidators.CommunityValidators.name,
      type: CommunityValidators.CommunityValidators.type,
      website: CommunityValidators.CommunityValidators.website,
      apy: CommunityValidators.CommunityValidators.apy,
    },
    Allnodes: {
      name: Allnodes.AllnodesStaking.name,
      type: Allnodes.AllnodesStaking.type,
      website: Allnodes.AllnodesStaking.website,
      apy: Allnodes.AllnodesStaking.apy,
    },
    Stakely: {
      name: Stakely.StakelyStaking.name,
      type: Stakely.StakelyStaking.type,
      website: Stakely.StakelyStaking.website,
      apy: Stakely.StakelyStaking.apy,
    },
    DAIC: {
      name: DAIC.DAICCapitalValidator.name,
      type: DAIC.DAICCapitalValidator.type,
      website: DAIC.DAICCapitalValidator.website,
      apy: DAIC.DAICCapitalValidator.apy,
    },
  };
}

// Helper function to get pools by type
export function getPoolsByType(type: 'Validator' | 'Exchange' | 'DeFi' | 'Community') {
  const allPools = getAllPools();
  return Object.entries(allPools)
    .filter(([_, pool]) => pool.type === type)
    .reduce((acc, [key, pool]) => ({ ...acc, [key]: pool }), {});
}

// Helper function to get pools with highest APY
export function getPoolsByAPY() {
  const allPools = getAllPools();
  return Object.entries(allPools)
    .sort(([, a], [, b]) => {
      const aAPY = parseFloat(a.apy.replace(/[^\d.-]/g, '')) || 0;
      const bAPY = parseFloat(b.apy.replace(/[^\d.-]/g, '')) || 0;
      return bAPY - aAPY;
    })
    .reduce((acc, [key, pool]) => ({ ...acc, [key]: pool }), {});
}

// Helper function to check if a pool is available
export async function isPoolAvailable(poolName: string): Promise<boolean> {
  const pools = getAllPools();
  const pool = Object.values(pools).find(p => p.name === poolName);
  
  if (!pool) return false;
  
  try {
    // Check if the pool's website is accessible
    const response = await fetch(pool.website, { method: 'HEAD' });
    return response.ok;
  } catch (error) {
    return false;
  }
}

// Helper function to get total staking options count
export function getTotalStakingOptions(): number {
  return getAllPoolNames().length;
}

// Helper function to get supported staking types
export function getSupportedStakingTypes(): string[] {
  const allPools = getAllPools();
  const types = new Set(Object.values(allPools).map(pool => pool.type));
  return Array.from(types);
}

// Default export with all pools
export default {
  TerraClassicValidators,
  Binance,
  KuCoin,
  CryptoCom,
  OrionMoney,
  CommunityValidators,
  Allnodes,
  Stakely,
  DAIC,
  getLUNCPrice,
  convertLUNCToUSD,
  convertUSDtoLUNC,
  getAllPoolNames,
  getAllPools,
  getPoolsByType,
  getPoolsByAPY,
  isPoolAvailable,
  getTotalStakingOptions,
  getSupportedStakingTypes,
};
