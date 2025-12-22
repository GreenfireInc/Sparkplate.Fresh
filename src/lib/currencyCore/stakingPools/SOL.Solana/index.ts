// SOL.Solana Staking Pools Module
// Solana (SOL) staking integrations

import * as Marinade from './marinade';
import * as Jito from './jito';
import * as Lido from './lido';
import * as BlazeStake from './blazestake';
import * as JPool from './jpool';
import * as Socean from './socean';
import * as Native from './native';
import * as Cogent from './cogent';
import * as DAOPool from './daopool';
import * as Solayer from './solayer';
import * as Edgevana from './edgevana';
import * as AeroPool from './aeropool';
import * as Sanctum from './sanctum';
import * as Stakewiz from './stakewiz';
import * as ValidatorsApp from './validatorsapp';

// Re-export all staking pools
export {
  Marinade,
  Jito,
  Lido,
  BlazeStake,
  JPool,
  Socean,
  Native,
  Cogent,
  DAOPool,
  Solayer,
  Edgevana,
  AeroPool,
  Sanctum,
  Stakewiz,
  ValidatorsApp,
};

// Helper function to get SOL price
export async function getSOLPrice(): Promise<number> {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd');
    if (response.ok) {
      const data = await response.json();
      return data.solana?.usd || 0;
    }
  } catch (error) {
    console.error('Error fetching SOL price:', error);
  }
  return 0;
}

// Helper function to convert SOL to USD
export async function convertSOLToUSD(solAmount: number): Promise<number> {
  const price = await getSOLPrice();
  return solAmount * price;
}

// Helper function to convert USD to SOL
export async function convertUSDtoSOL(usdAmount: number): Promise<number> {
  const price = await getSOLPrice();
  return price > 0 ? usdAmount / price : 0;
}

// Helper function to get all pool names
export function getAllPoolNames(): string[] {
  return [
    'Marinade Finance',
    'Jito Network',
    'Lido Finance',
    'BlazeStake',
    'JPool',
    'Socean',
    'Native Solana Staking',
    'Cogent Finance',
    'DAOPool',
    'Solayer',
    'Edgevana Liquid Staking',
    'AeroPool',
    'Sanctum',
    'Stakewiz',
    'Validators.app',
  ];
}

// Helper function to get all pools with their basic info
export function getAllPools() {
  return {
    Marinade: {
      name: Marinade.MarinadeStaking.name,
      type: Marinade.MarinadeStaking.type,
      website: Marinade.MarinadeStaking.website,
      apy: Marinade.MarinadeStaking.apy,
    },
    Jito: {
      name: Jito.JitoStaking.name,
      type: Jito.JitoStaking.type,
      website: Jito.JitoStaking.website,
      apy: Jito.JitoStaking.apy,
    },
    Lido: {
      name: Lido.LidoStaking.name,
      type: Lido.LidoStaking.type,
      website: Lido.LidoStaking.website,
      apy: Lido.LidoStaking.apy,
    },
    BlazeStake: {
      name: BlazeStake.BlazeStakeStaking.name,
      type: BlazeStake.BlazeStakeStaking.type,
      website: BlazeStake.BlazeStakeStaking.website,
      apy: BlazeStake.BlazeStakeStaking.apy,
    },
    JPool: {
      name: JPool.JPoolStaking.name,
      type: JPool.JPoolStaking.type,
      website: JPool.JPoolStaking.website,
      apy: JPool.JPoolStaking.apy,
    },
    Socean: {
      name: Socean.SoceanStaking.name,
      type: Socean.SoceanStaking.type,
      website: Socean.SoceanStaking.website,
      apy: Socean.SoceanStaking.apy,
    },
    Native: {
      name: Native.NativeSolanaStaking.name,
      type: Native.NativeSolanaStaking.type,
      website: Native.NativeSolanaStaking.website,
      apy: Native.NativeSolanaStaking.apy,
    },
    Cogent: {
      name: Cogent.CogentStaking.name,
      type: Cogent.CogentStaking.type,
      website: Cogent.CogentStaking.website,
      apy: Cogent.CogentStaking.apy,
    },
    DAOPool: {
      name: DAOPool.DAOPoolStaking.name,
      type: DAOPool.DAOPoolStaking.type,
      website: DAOPool.DAOPoolStaking.website,
      apy: DAOPool.DAOPoolStaking.apy,
    },
    Solayer: {
      name: Solayer.SolayerStaking.name,
      type: Solayer.SolayerStaking.type,
      website: Solayer.SolayerStaking.website,
      apy: Solayer.SolayerStaking.apy,
    },
    Edgevana: {
      name: Edgevana.EdgevanaStaking.name,
      type: Edgevana.EdgevanaStaking.type,
      website: Edgevana.EdgevanaStaking.website,
      apy: Edgevana.EdgevanaStaking.apy,
    },
    AeroPool: {
      name: AeroPool.AeroPoolStaking.name,
      type: AeroPool.AeroPoolStaking.type,
      website: AeroPool.AeroPoolStaking.website,
      apy: AeroPool.AeroPoolStaking.apy,
    },
    Sanctum: {
      name: Sanctum.SanctumStaking.name,
      type: Sanctum.SanctumStaking.type,
      website: Sanctum.SanctumStaking.website,
      apy: Sanctum.SanctumStaking.apy,
    },
    Stakewiz: {
      name: Stakewiz.StakewizStaking.name,
      type: Stakewiz.StakewizStaking.type,
      website: Stakewiz.StakewizStaking.website,
      apy: Stakewiz.StakewizStaking.apy,
    },
    ValidatorsApp: {
      name: ValidatorsApp.ValidatorsAppStaking.name,
      type: ValidatorsApp.ValidatorsAppStaking.type,
      website: ValidatorsApp.ValidatorsAppStaking.website,
      apy: ValidatorsApp.ValidatorsAppStaking.apy,
    },
  };
}

// Helper function to get pools by type
export function getPoolsByType(type: 'Liquid Staking' | 'Native Staking' | 'Enterprise' | 'Validator') {
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

// Helper function to get liquid staking tokens
export function getLiquidStakingTokens() {
  return {
    mSOL: {
      name: 'Marinade SOL',
      symbol: 'mSOL',
      protocol: 'Marinade Finance',
      mintAddress: 'mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So',
    },
    JitoSOL: {
      name: 'Jito SOL',
      symbol: 'JitoSOL',
      protocol: 'Jito Network',
      mintAddress: 'J1toso1uCk3RLmjorhTtrVwY9HJ7X8V9yYac6Y7kGCPn',
    },
    stSOL: {
      name: 'Lido Staked SOL',
      symbol: 'stSOL',
      protocol: 'Lido Finance',
      mintAddress: '7dHbWXmci3dT8UFYWYZweBLXgycu7Y3iL6trKn1Y7ARj',
    },
    bSOL: {
      name: 'BlazeStake SOL',
      symbol: 'bSOL',
      protocol: 'BlazeStake',
      mintAddress: 'bSo13r4TkiE4KumL71LsHTPpL2euBYLFx6h9HP3piy1',
    },
    JSOL: {
      name: 'JPool SOL',
      symbol: 'JSOL',
      protocol: 'JPool',
      mintAddress: 'jSo1zZ4aUuV7LRYh37WwJgHk6zHPSn3bL5VpUfW9LdF',
    },
    scnSOL: {
      name: 'Socean SOL',
      symbol: 'scnSOL',
      protocol: 'Socean',
      mintAddress: '5oVNBeEEQvYi1cX3ir8Dx5n1P7pdxydbGF2X4TxVusJm',
    },
    cogentSOL: {
      name: 'Cogent SOL',
      symbol: 'cogentSOL',
      protocol: 'Cogent Finance',
      mintAddress: 'cogentSOL_MINT_ADDRESS',
    },
    daoSOL: {
      name: 'DAOPool SOL',
      symbol: 'daoSOL',
      protocol: 'DAOPool',
      mintAddress: 'daoSOL_MINT_ADDRESS',
    },
    sSOL: {
      name: 'Solayer SOL',
      symbol: 'sSOL',
      protocol: 'Solayer',
      mintAddress: 'sSOL_MINT_ADDRESS',
    },
  };
}

// Default export with all pools
export default {
  Marinade,
  Jito,
  Lido,
  BlazeStake,
  JPool,
  Socean,
  Native,
  Cogent,
  DAOPool,
  Solayer,
  Edgevana,
  AeroPool,
  Sanctum,
  Stakewiz,
  ValidatorsApp,
  getSOLPrice,
  convertSOLToUSD,
  convertUSDtoSOL,
  getAllPoolNames,
  getAllPools,
  getPoolsByType,
  getPoolsByAPY,
  isPoolAvailable,
  getTotalStakingOptions,
  getSupportedStakingTypes,
  getLiquidStakingTokens,
};
