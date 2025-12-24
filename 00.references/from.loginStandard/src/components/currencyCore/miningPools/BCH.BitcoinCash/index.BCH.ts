// Bitcoin Cash (BCH) Mining Pools
// Centralized export for all BCH mining pool integrations

import { ViaBTCPool } from './viaBtc.BCH';
import { AntPool } from './antPool.BCH';
import { F2Pool } from './f2Pool.BCH';
import { BTCcom } from './btcCom.BCH';
import { Poolin } from './poolin.BCH';
import { MiningDutch } from './miningDutch.BCH';
import { HuobiPool } from './huobiPool.BCH';
import { FoundryUSA } from './foundryUsa.BCH';

export { ViaBTCPool, AntPool, F2Pool, BTCcom, Poolin, MiningDutch, HuobiPool, FoundryUSA };

/**
 * Bitcoin Cash Mining Pools Overview
 * 
 * This module provides TypeScript integrations for major Bitcoin Cash (BCH) mining pools.
 * Each pool file includes:
 * - Basic pool information
 * - API endpoints and documentation
 * - TypeScript functions for fetching pool/miner statistics
 * - Social media links
 * - Integration examples
 * 
 * Available Mining Pools:
 * 
 * 1. ViaBTC - One of the largest BCH mining pools
 *    - Public API with WebSocket support
 *    - Multiple payment methods (PPS+, PPLNS, SOLO)
 *    - API Documentation: https://viabtc.com/api/
 * 
 * 2. AntPool - Major pool operated by Bitmain
 *    - Account API with signature authentication
 *    - Multi-coin support
 *    - API Documentation: https://www.antpool.com/userApiGuide
 * 
 * 3. F2Pool - One of the oldest multi-coin pools
 *    - Public and account APIs
 *    - Established in 2013
 *    - API Documentation: https://www.f2pool.com/api_doc
 * 
 * 4. BTC.com - Large pool with detailed statistics
 *    - Public stats API
 *    - Historical data support
 *    - API Documentation: https://bch.btc.com/stats/api
 * 
 * 5. Poolin - Multi-currency mining pool
 *    - Account API with authentication
 *    - Smart pool features
 *    - API Documentation: https://poolin.com/en/help/api
 * 
 * 6. Mining-Dutch - European mining pool
 *    - Public API without authentication
 *    - Multi-algorithm support
 *    - API Documentation: https://www.mining-dutch.nl/api
 * 
 * 7. Huobi Pool - Pool by Huobi exchange
 *    - Enterprise API with HMAC authentication
 *    - Exchange integration
 *    - API Documentation: https://www.huobipool.com/en-us/api
 * 
 * 8. Foundry USA - Largest North American pool
 *    - Enterprise-grade services
 *    - Custom pricing and payouts
 *    - API Documentation: https://api.foundryusapool.com/docs
 * 
 * Usage Example:
 * 
 * ```typescript
 * import { ViaBTCPool, F2Pool, BTCcom } from '@/components/currencyCore/miningPools/BCH.BitcoinCash';
 * 
 * // Fetch pool statistics from multiple pools
 * const viaBtcStats = await ViaBTCPool.fetchPoolStats();
 * const f2poolStats = await F2Pool.fetchCoinStats();
 * const btccomStats = await BTCcom.fetchPoolStats();
 * 
 * console.log('ViaBTC Hashrate:', viaBtcStats?.hashRate);
 * console.log('F2Pool Hashrate:', f2poolStats?.hashrate);
 * console.log('BTC.com Hashrate:', btccomStats?.poolHashrate);
 * ```
 * 
 * Pricing Data Integration:
 * 
 * Mining pools provide hashrate and mining statistics, but do not directly provide
 * BCH price data. For pricing information, use:
 * 
 * 1. CoinGecko API: https://api.coingecko.com/api/v3/simple/price?ids=bitcoin-cash&vs_currencies=usd
 * 2. Binance API: https://api.binance.com/api/v3/ticker/price?symbol=BCHUSDT
 * 3. Kraken API: https://api.kraken.com/0/public/Ticker?pair=BCHUSD
 * 4. DIA Oracle: https://api.diadata.org/v1/quote/BCH
 * 
 * To calculate mining profitability:
 * - Fetch pool statistics (hashrate, earnings)
 * - Fetch current BCH price from exchange API
 * - Calculate: earnings_bch * bch_price_usd = earnings_usd
 */

export const BCHMiningPools = {
  ViaBTC: ViaBTCPool,
  AntPool: AntPool,
  F2Pool: F2Pool,
  BTCcom: BTCcom,
  Poolin: Poolin,
  MiningDutch: MiningDutch,
  HuobiPool: HuobiPool,
  FoundryUSA: FoundryUSA,
};

/**
 * Helper function to fetch BCH price from CoinGecko
 * @returns BCH price in USD
 */
export async function fetchBCHPrice(): Promise<number> {
  try {
    const response = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin-cash&vs_currencies=usd'
    );
    const data = await response.json();
    return data['bitcoin-cash']?.usd || 0;
  } catch (error) {
    console.error('Error fetching BCH price:', error);
    return 0;
  }
}

/**
 * Helper function to calculate USD value from BCH amount
 * @param bchAmount - Amount in BCH
 * @returns USD value
 */
export async function calculateUSDValue(bchAmount: number): Promise<number> {
  const bchPrice = await fetchBCHPrice();
  return bchAmount * bchPrice;
}

/**
 * Aggregate statistics from multiple pools
 * @returns Combined statistics from all pools
 */
export async function aggregatePoolStats() {
  const results = {
    pools: [] as Array<{ name: string; stats: unknown }>,
    totalHashrate: 0,
    totalMiners: 0,
    timestamp: new Date().toISOString(),
  };

  try {
    // Fetch from pools with public APIs
    const [viaBtc, f2pool, btccom, miningDutch] = await Promise.allSettled([
      ViaBTCPool.fetchPoolStats(),
      F2Pool.fetchCoinStats(),
      BTCcom.fetchPoolStats(),
      MiningDutch.fetchPoolStats(),
    ]);

    if (viaBtc.status === 'fulfilled' && viaBtc.value) {
      results.pools.push({ name: 'ViaBTC', stats: viaBtc.value });
      results.totalMiners += viaBtc.value.miners || 0;
    }

    if (f2pool.status === 'fulfilled' && f2pool.value) {
      results.pools.push({ name: 'F2Pool', stats: f2pool.value });
      results.totalHashrate += f2pool.value.hashrate || 0;
    }

    if (btccom.status === 'fulfilled' && btccom.value) {
      results.pools.push({ name: 'BTC.com', stats: btccom.value });
      results.totalHashrate += btccom.value.poolHashrate || 0;
      results.totalMiners += btccom.value.miners || 0;
    }

    if (miningDutch.status === 'fulfilled' && miningDutch.value) {
      results.pools.push({ name: 'Mining-Dutch', stats: miningDutch.value });
      results.totalHashrate += miningDutch.value.poolHashrate || 0;
      results.totalMiners += miningDutch.value.miners || 0;
    }
  } catch (error) {
    console.error('Error aggregating pool stats:', error);
  }

  return results;
}

export default {
  ViaBTCPool,
  AntPool,
  F2Pool,
  BTCcom,
  Poolin,
  MiningDutch,
  HuobiPool,
  FoundryUSA,
  fetchBCHPrice,
  calculateUSDValue,
  aggregatePoolStats,
};
