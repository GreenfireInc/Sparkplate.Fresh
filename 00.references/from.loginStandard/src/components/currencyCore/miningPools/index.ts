// Mining Pools Integration
// Centralized export for all cryptocurrency mining pool integrations

// Namespaced imports to avoid naming conflicts
import * as BCH from './BCH.BitcoinCash';
import * as BTC from './BTC.Bitcoin';
import * as DOGE from './DOGE.Dogecoin';
import * as ETC from './ETC.EthereumClassic';
import * as LTC from './LTC.Litecoin';

// Export namespaced modules
export { BCH, BTC, DOGE, ETC, LTC };

/**
 * Mining Pools Module
 * 
 * This module provides TypeScript integrations for major cryptocurrency mining pools,
 * organized by blockchain/currency.
 * 
 * Currently Supported:
 * - Bitcoin Cash (BCH) - 8 major mining pools
 * - Bitcoin (BTC) - 7 major mining pools
 * - Dogecoin (DOGE) - 10 major mining pools
 * - Ethereum Classic (ETC) - 8 major mining pools
 * - Litecoin (LTC) - 7 major mining pools
 * 
 * Total: 40 mining pool integrations across 5 blockchains
 * 
 * Usage:
 * 
 * ```typescript
 * // Option 1: Import namespaced modules
 * import { BCH, BTC, DOGE, ETC, LTC } from '@/components/currencyCore/miningPools';
 * 
 * // Bitcoin Cash
 * const bchStats = await BCH.ViaBTCPool.fetchPoolStats();
 * const bchPrice = await BCH.getBCHPrice();
 * 
 * // Bitcoin
 * const btcStats = await BTC.FoundryUSAPool.fetchPoolStats();
 * const btcPrice = await BTC.getBTCPrice();
 * 
 * // Dogecoin
 * const dogePrice = await DOGE.getDOGEPrice();
 * 
 * // Ethereum Classic
 * const etcPrice = await ETC.getETCPrice();
 * 
 * // Litecoin
 * const ltcPrice = await LTC.getLTCPrice();
 * 
 * // Option 2: Import from specific module directly
 * import { ViaBTCPool, getBCHPrice } from '@/components/currencyCore/miningPools/BCH.BitcoinCash';
 * import { FoundryUSAPool, getBTCPrice } from '@/components/currencyCore/miningPools/BTC.Bitcoin';
 * ```
 */

export const MiningPoolsByChain = {
  BCH: async () => await import('./BCH.BitcoinCash'),
  BTC: async () => await import('./BTC.Bitcoin'),
  DOGE: async () => await import('./DOGE.Dogecoin'),
  ETC: async () => await import('./ETC.EthereumClassic'),
  LTC: async () => await import('./LTC.Litecoin'),
};

export default {
  BCH: () => import('./BCH.BitcoinCash'),
  BTC: () => import('./BTC.Bitcoin'),
  DOGE: () => import('./DOGE.Dogecoin'),
  ETC: () => import('./ETC.EthereumClassic'),
  LTC: () => import('./LTC.Litecoin'),
};

