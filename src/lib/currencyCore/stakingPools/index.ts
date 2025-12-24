// Staking Pools Integration
// Centralized export for all cryptocurrency staking pool integrations

import * as ALGO from './ALGO.Algorand';
import * as ATOM from './ATOM.Cosmos';
import * as BNB from './BNB.BinanceCoin';
import * as DOT from './DOT.Polkadot';
import * as ETH from './ETH.Ethereum';
import * as LUNA from './LUNA.Terra';
import * as LUNC from './LUNC.TerraClassic';
import * as SOL from './SOL.Solana';
import * as STX from './STX.Stacks';
import * as TRX from './TRX.Tron';
import * as WAVES from './WAVES.Waves';
import * as XLM from './XLM.Stellar';
import * as XRP from './XRP.Ripple';
import * as XTZ from './XTZ.Tezos';

// Export namespaced modules
export { ALGO, ATOM, BNB, DOT, ETH, LUNA, LUNC, SOL, STX, TRX, WAVES, XLM, XRP, XTZ };

/**
 * Staking Pools Module
 * 
 * This module provides TypeScript integrations for major cryptocurrency staking pools,
 * organized by blockchain/currency.
 * 
 * Currently Supported:
 * - Algorand (ALGO) - 7 major staking pools and protocols
 * - Cosmos (ATOM) - 7 major staking options (liquid, native, exchange)
 * - Binance Coin (BNB) - 7 major staking options (liquid, native, exchange, wallet)
 * - Polkadot (DOT) - 7 major staking options (exchange, liquid, native)
 * - Ethereum (ETH) - 9 major staking options (liquid, exchange, native)
 * - Terra (LUNA) - 10 major staking options (liquid, exchange, native, validator)
 * - Terra Classic (LUNC) - 9 major staking options (native, exchange, legacy DeFi, community)
 * - Solana (SOL) - 15 major staking options (liquid, native, enterprise, validator)
 * - Stacks (STX) - 8 major staking options (liquid, exchange, native, wallet)
 * - Tron (TRX) - 15 major staking options (native, exchange, DeFi, NFT platform, wallet, super_representative, platform, infrastructure)
 * - Waves (WAVES) - 7 major staking options (native, exchange, DeFi, governance, wallet)
 * - Stellar (XLM) - 7 major earning options (lending, exchange, DeFi, liquidity, governance)
 * - Ripple (XRP) - 7 major earning options (lending, exchange, liquid staking, DeFi, wrapped)
 * - Tezos (XTZ) - 20 major staking options (native, exchange, professional, wallet, enterprise, community, defi, liquid)
 * 
 * Total: 135 earning integrations across 14 blockchains
 * 
 * Future Support:
 * - Cardano (ADA)
 * - And more...
 * 
 * Usage:
 * 
 * ```typescript
 * import { ALGO, ATOM, BNB, DOT, ETH, LUNA, LUNC, SOL, STX, TRX, WAVES, XLM, XRP, XTZ } from '@/lib/currencyCore/stakingPools';
 * 
 * // Algorand
 * const algoPrice = await ALGO.getALGOPrice();
 * console.log('ALGO Price:', algoPrice);
 * console.log('Folks Finance:', ALGO.FolksFinancePool.website);
 * const algoUsdValue = await ALGO.convertALGOToUSD(100);
 * 
 * // Cosmos
 * const atomPrice = await ATOM.getATOMPrice();
 * console.log('ATOM Price:', atomPrice);
 * console.log('Stride:', ATOM.StridePool.website);
 * const atomUsdValue = await ATOM.convertATOMToUSD(100);
 * 
 * // Binance Coin
 * const bnbPrice = await BNB.getBNBPrice();
 * console.log('BNB Price:', bnbPrice);
 * console.log('Ankr:', BNB.AnkrPool.website);
 * const bnbUsdValue = await BNB.convertBNBToUSD(100);
 * 
 * // Polkadot
 * const dotPrice = await DOT.getDOTPrice();
 * console.log('DOT Price:', dotPrice);
 * console.log('Kraken:', DOT.KrakenStaking.website);
 * const dotUsdValue = await DOT.convertDOTToUSD(100);
 * 
 * // Ethereum
 * const ethPrice = await ETH.getETHPrice();
 * console.log('ETH Price:', ethPrice);
 * console.log('Lido:', ETH.LidoStaking.website);
 * const ethUsdValue = await ETH.convertETHToUSD(100);
 * 
 * // Terra
 * const lunaPrice = await LUNA.getLUNAPrice();
 * console.log('LUNA Price:', lunaPrice);
 * console.log('Terra Station:', LUNA.TerraStationValidators.website);
 * const lunaUsdValue = await LUNA.convertLUNAToUSD(100);
 * 
 * // Terra Classic
 * const luncPrice = await LUNC.getLUNCPrice();
 * console.log('LUNC Price:', luncPrice);
 * console.log('Terra Classic Validators:', LUNC.TerraClassicValidators.website);
 * const luncUsdValue = await LUNC.convertLUNCToUSD(100);
 * 
 * // Solana
 * const solPrice = await SOL.getSOLPrice();
 * console.log('SOL Price:', solPrice);
 * console.log('Marinade Finance:', SOL.Marinade.MarinadeStaking.website);
 * const solUsdValue = await SOL.convertSOLToUSD(100);
 * 
 * // Stacks
 * const stxPrice = await STX.getSTXPrice();
 * console.log('STX Price:', stxPrice);
 * console.log('PlanBetter Pool:', STX.PlanBetter.PlanBetterStaking.website);
 * const stxUsdValue = await STX.convertSTXToUSD(100);
 * 
 * // Tron
 * const trxPrice = await TRX.getTRXPrice();
 * console.log('TRX Price:', trxPrice);
 * console.log('Super Representatives:', TRX.SuperRepresentatives.SuperRepresentativesStaking.website);
 * const trxUsdValue = await TRX.convertTRXToUSD(100);
 * 
 * // Waves
 * const wavesPrice = await WAVES.getWAVESPrice();
 * console.log('WAVES Price:', wavesPrice);
 * console.log('Waves.Exchange Leasing:', WAVES.WavesExchange.WavesExchangeLeasing.website);
 * const wavesUsdValue = await WAVES.convertWAVESToUSD(100);
 * 
 * // Stellar
 * const xlmPrice = await XLM.getXLMPrice();
 * console.log('XLM Price:', xlmPrice);
 * console.log('Nexo Earning:', XLM.Nexo.NexoEarning.website);
 * const xlmUsdValue = await XLM.convertXLMToUSD(100);
 * 
 * // Ripple
 * const xrpPrice = await XRP.getXRPPrice();
 * console.log('XRP Price:', xrpPrice);
 * console.log('Nexo Earning:', XRP.Nexo.NexoEarning.website);
 * const xrpUsdValue = await XRP.convertXRPToUSD(100);
 * 
 * // Tezos
 * const xtzPrice = await XTZ.getXTZPrice();
 * console.log('XTZ Price:', xtzPrice);
 * console.log('Native Baking:', XTZ.Native.NativeTezosBaking.website);
 * const xtzUsdValue = await XTZ.convertXTZToUSD(100);
 * 
 * // Get pool names
 * const algoPools = ALGO.getAllPoolNames();
 * const atomPools = ATOM.getAllPoolNames();
 * const bnbPools = BNB.getAllPoolNames();
 * const dotPools = DOT.getAllPoolNames();
 * const ethPools = ETH.getAllPoolNames();
 * const lunaPools = LUNA.getAllPoolNames();
 * const luncPools = LUNC.getAllPoolNames();
 * const solPools = SOL.getAllPoolNames();
 * const stxPools = STX.getAllPoolNames();
 * const trxPools = TRX.getAllPoolNames();
 * const wavesPools = WAVES.getAllPoolNames();
 * const xlmPools = XLM.getAllPoolNames();
 * const xrpPools = XRP.getAllPoolNames();
 * const xtzPools = XTZ.getAllPoolNames();
 * ```
 */

export const StakingPoolsByChain = {
  ALGO: async () => await import('./ALGO.Algorand'),
  ATOM: async () => await import('./ATOM.Cosmos'),
  BNB: async () => await import('./BNB.BinanceCoin'),
  DOT: async () => await import('./DOT.Polkadot'),
  ETH: async () => await import('./ETH.Ethereum'),
  LUNA: async () => await import('./LUNA.Terra'),
  LUNC: async () => await import('./LUNC.TerraClassic'),
  SOL: async () => await import('./SOL.Solana'),
  STX: async () => await import('./STX.Stacks'),
  TRX: async () => await import('./TRX.Tron'),
  WAVES: async () => await import('./WAVES.Waves'),
  XLM: async () => await import('./XLM.Stellar'),
  XRP: async () => await import('./XRP.Ripple'),
  XTZ: async () => await import('./XTZ.Tezos'),
};

export default {
  ALGO: () => import('./ALGO.Algorand'),
  ATOM: () => import('./ATOM.Cosmos'),
  BNB: () => import('./BNB.BinanceCoin'),
  DOT: () => import('./DOT.Polkadot'),
  ETH: () => import('./ETH.Ethereum'),
  LUNA: () => import('./LUNA.Terra'),
  LUNC: () => import('./LUNC.TerraClassic'),
  SOL: () => import('./SOL.Solana'),
  STX: () => import('./STX.Stacks'),
  TRX: () => import('./TRX.Tron'),
  WAVES: () => import('./WAVES.Waves'),
  XLM: () => import('./XLM.Stellar'),
  XRP: () => import('./XRP.Ripple'),
  XTZ: () => import('./XTZ.Tezos'),
};

