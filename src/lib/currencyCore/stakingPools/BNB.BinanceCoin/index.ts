// Binance Coin (BNB) Staking Pools
// Centralized export for all BNB staking pool integrations

import { AnkrPool } from './ankr';
import { PStakeBNBPool } from './pstake';
import { StaderPool } from './stader';
import { BinanceValidators } from './binanceValidators';
import { BinanceExchangeStaking } from './binanceExchange';
import { TrustWalletStaking } from './trustWallet';
import { KrakenBNBStaking } from './kraken';

export { AnkrPool, PStakeBNBPool, StaderPool, BinanceValidators, BinanceExchangeStaking, TrustWalletStaking, KrakenBNBStaking };

/**
 * Binance Coin (BNB) Staking Pools Overview
 * 
 * This module provides TypeScript integrations for major BNB staking pools and validators.
 * Each pool file includes:
 * - Basic pool/validator information
 * - API endpoints and documentation
 * - TypeScript functions for staking operations
 * - Social media links
 * - Integration examples
 * 
 * Available Staking Options:
 * 
 * 1. Ankr - Liquid staking with ankrBNB
 *    - Multi-chain liquid staking protocol
 *    - Instant liquidity with liquid staking tokens
 *    - SDK: ethers, web3
 * 
 * 2. pSTAKE Finance - Liquid staking with stkBNB
 *    - Cross-chain compatibility
 *    - Auto-compounding rewards
 *    - SDK: ethers, web3
 * 
 * 3. Stader Labs - Liquid staking with BNBx
 *    - Multi-chain support
 *    - DeFi composability
 *    - SDK: ethers, web3
 * 
 * 4. BNB Chain Validators - Native staking
 *    - 21 active validators
 *    - Direct delegation to validators
 *    - 7-day unbonding period
 * 
 * 5. Binance Exchange - Official exchange staking
 *    - Flexible and locked staking options
 *    - Custodial staking through Binance
 *    - API access available
 * 
 * 6. Trust Wallet - Mobile wallet staking
 *    - Native mobile staking interface
 *    - User controls private keys
 *    - Simple validator selection
 * 
 * 7. Kraken - Exchange staking
 *    - Flexible staking (unstake anytime)
 *    - Trade staked BNB on exchange
 *    - Twice-weekly rewards
 * 
 * Usage Example:
 * 
 * ```typescript
 * import { AnkrPool, BinanceValidators, getBNBPrice } from '@/lib/currencyCore/stakingPools/BNB.BinanceCoin';
 * 
 * // Fetch BNB price
 * const bnbPrice = await getBNBPrice();
 * console.log('BNB Price:', bnbPrice);
 * 
 * // Access pool information
 * console.log('Ankr:', AnkrPool.website);
 * console.log('Validators:', BinanceValidators.validators);
 * ```
 * 
 * Pricing Data Integration:
 * 
 * For real-time BNB pricing, use:
 * 1. CoinGecko API: https://api.coingecko.com/api/v3/simple/price?ids=binancecoin&vs_currencies=usd
 * 2. Binance API: https://api.binance.com/api/v3/ticker/price?symbol=BNBUSDT
 * 3. Kraken API: https://api.kraken.com/0/public/Ticker?pair=BNBUSD
 * 4. BSC DEXs: PancakeSwap, Biswap, ApeSwap
 * 
 * RPC Endpoints:
 * - BSC MainNet: https://bsc-dataseed.binance.org
 * - Alternative RPCs: https://bsc-dataseed1.defibit.io, https://rpc.ankr.com/bsc
 * - Chain ID: 56
 */

// Centralized object for all BNB staking pools
export const BNBStakingPools = {
  Ankr: AnkrPool,
  pSTAKE: PStakeBNBPool,
  Stader: StaderPool,
  BinanceValidators: BinanceValidators,
  BinanceExchange: BinanceExchangeStaking,
  TrustWallet: TrustWalletStaking,
  Kraken: KrakenBNBStaking,
};

// Helper function to fetch BNB price from multiple sources
export async function getBNBPrice(): Promise<number> {
  try {
    // Try CoinGecko first
    const response = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=binancecoin&vs_currencies=usd'
    );
    if (response.ok) {
      const data = await response.json();
      return data.binancecoin?.usd || 0;
    }
  } catch (error) {
    console.warn('CoinGecko BNB price fetch failed:', error);
  }

  try {
    // Fallback to Binance
    const response = await fetch(
      'https://api.binance.com/api/v3/ticker/price?symbol=BNBUSDT'
    );
    if (response.ok) {
      const data = await response.json();
      return parseFloat(data.price) || 0;
    }
  } catch (error) {
    console.warn('Binance BNB price fetch failed:', error);
  }

  try {
    // Fallback to Kraken
    const response = await fetch(
      'https://api.kraken.com/0/public/Ticker?pair=BNBUSD'
    );
    if (response.ok) {
      const data = await response.json();
      const bnbUsd = data.result?.BNBUSD;
      return bnbUsd ? parseFloat(bnbUsd.c[0]) : 0;
    }
  } catch (error) {
    console.warn('Kraken BNB price fetch failed:', error);
  }

  return 0;
}

// Helper function to calculate USD value from BNB amount
export async function convertBNBToUSD(bnbAmount: number): Promise<number> {
  const price = await getBNBPrice();
  return bnbAmount * price;
}

// Helper function to calculate BNB amount from USD value
export async function convertUSDToBNB(usdAmount: number): Promise<number> {
  const price = await getBNBPrice();
  return price > 0 ? usdAmount / price : 0;
}

// Helper function to convert Wei to BNB (1 BNB = 10^18 Wei)
export function weiToBnb(wei: bigint | string): number {
  const weiBigInt = typeof wei === 'string' ? BigInt(wei) : wei;
  return Number(weiBigInt) / 1e18;
}

// Helper function to convert BNB to Wei
export function bnbToWei(bnb: number): bigint {
  return BigInt(Math.floor(bnb * 1e18));
}

// Helper function to get all pool/validator names
export function getAllPoolNames(): string[] {
  return [
    'Ankr',
    'pSTAKE Finance',
    'Stader Labs',
    'BNB Chain Validators',
    'Binance Exchange',
    'Trust Wallet',
    'Kraken',
  ];
}

// Helper function to get liquid staking providers
export function getLiquidStakingProviders(): string[] {
  return ['Ankr', 'pSTAKE Finance', 'Stader Labs'];
}

// Helper function to get exchange staking providers
export function getExchangeStakingProviders(): string[] {
  return ['Binance Exchange', 'Kraken'];
}

// Helper function to get native staking providers
export function getNativeStakingProviders(): string[] {
  return ['BNB Chain Validators', 'Trust Wallet'];
}

// Helper function to get staking APY range
export function getStakingAPYRange(): { min: number; max: number; average: number } {
  return {
    min: 3,
    max: 8,
    average: 5.5,
  };
}

// Helper function to fetch BSC network stats
export async function getBSCNetworkStats() {
  try {
    const provider = new (await import('ethers')).JsonRpcProvider('https://bsc-dataseed.binance.org/');
    
    const [blockNumber, gasPrice] = await Promise.all([
      provider.getBlockNumber(),
      provider.getFeeData()
    ]);
    
    return {
      blockNumber,
      gasPrice: gasPrice.gasPrice ? Number(gasPrice.gasPrice) : 0,
      networkId: 56,
      chainName: 'BNB Smart Chain'
    };
  } catch (error) {
    console.error('Error fetching BSC network stats:', error);
    return null;
  }
}

// Helper function to get validator count
export function getValidatorCount(): number {
  return 21; // BNB Chain has 21 active validators
}

// Helper function to get BSC RPC endpoints
export function getBSCRPCEndpoints(): string[] {
  return [
    'https://bsc-dataseed.binance.org/',
    'https://bsc-dataseed1.defibit.io/',
    'https://bsc-dataseed1.ninicoin.io/',
    'https://rpc.ankr.com/bsc',
    'https://bsc-dataseed.binance.org/',
    'https://bsc-dataseed2.binance.org/',
    'https://bsc-dataseed3.binance.org/',
    'https://bsc-dataseed4.binance.org/',
  ];
}

// Helper function to get liquid staking token contracts
export function getLiquidStakingContracts(): { [key: string]: string } {
  return {
    ankrBNB: '0x52F24a5e03aee338Da5fd9Df68D2b6FAe1178827',
    stkBNB: '0x...', // pSTAKE stkBNB contract
    BNBx: '0x...', // Stader BNBx contract
  };
}

// Export default
export default {
  pools: BNBStakingPools,
  getBNBPrice,
  convertBNBToUSD,
  convertUSDToBNB,
  weiToBnb,
  bnbToWei,
  getAllPoolNames,
  getLiquidStakingProviders,
  getExchangeStakingProviders,
  getNativeStakingProviders,
  getStakingAPYRange,
  getBSCNetworkStats,
  getValidatorCount,
  getBSCRPCEndpoints,
  getLiquidStakingContracts,
};
