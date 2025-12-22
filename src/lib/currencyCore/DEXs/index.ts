// DEX Information Index
// Centralized export for all DEX information files
// Organized by blockchain

/**
 * DEXs Overview
 * 
 * This module provides comprehensive decentralized exchange (DEX) integrations for various blockchains.
 * Each blockchain has its own directory with multiple DEX implementations and protocols.
 * 
 * Supported Blockchains:
 * - Algorand (ALGO) - Tinyman, Pact, HumbleSwap, AlgoFi, Folks Finance, etc.
 * - Cosmos (ATOM) - Osmosis, Astroport, Crescent, Gravity DEX, etc.
 * - Binance Smart Chain (BNB) - PancakeSwap, Biswap, ApeSwap, DODO, etc.
 * - Bitcoin Cash (BCH) - BenSwap, CashDEX, MistSwap, TangoSwap, etc.
 * - Bitcoin (BTC) - Bisq, Boltz, FixedFloat, HodlHodl, RoboSats, etc.
 * - Dogecoin (DOGE) - DogeSwap, KibbleSwap, YodeSwap, etc.
 * - Polkadot (DOT) - AcalaSwap, HydraDX, KaruraSwap, StellaSwap, etc.
 * - Ethereum Classic (ETC) - ClassicDAO, ETCDEX, HebeSwap, etc.
 * - Ethereum (ETH) - Uniswap, Curve, SushiSwap, Balancer, 1inch, etc.
 * - Litecoin (LTC) - ChangeNOW, Exolix, FixedFloat, SideShift, etc.
 * - Terra 2.0 (LUNA) - Astroport, Edge Protocol, Phoenix Protocol, etc.
 * - Terra Classic (LUNC) - Astroport Classic, Terraport, Terraswap Classic, etc.
 * - Solana (SOL) - Jupiter, Orca, Raydium, Drift, Lifinity, etc.
 * - Stacks (STX) - ALEX, Arkadiko, Bitflow, Charisma, LNswap, etc.
 * - Tron (TRX) - JustLend, JustMoney, SunSwap, TronTrade, etc.
 * - Waves (WAVES) - Waves DEX protocols
 * - Stellar (XLM) - Stellar DEX protocols
 * - Ripple (XRP) - XRP Ledger DEX protocols
 * - Tezos (XTZ) - QuipuSwap, SpicySwap, Plenty, Vortex, etc.
 * 
 * Usage Examples:
 * 
 * ```typescript
 * import { DEXs } from '@/components/currencyCore/DEXs';
 * 
 * // Access Algorand DEXs
 * const algoDEXs = await DEXs.ALGO();
 * const tinyman = algoDEXs.tinymanDEX;
 * 
 * // Access Ethereum DEXs
 * const ethDEXs = await DEXs.ETH();
 * const uniswap = ethDEXs.uniswapDEX;
 * 
 * // Access Solana DEXs
 * const solDEXs = await DEXs.SOL();
 * const jupiter = solDEXs.jupiterDEX;
 * ```
 */

// Consolidated exports for easy access
export const DEXs = {
  // Algorand DEXs
  ALGO: () => import('./ALGO.Algorand/index.ALGO'),
  
  // Arweave DEXs
  AR: () => import('./AR.Arweave/index.AR'),
  
  // Cosmos DEXs  
  ATOM: () => import('./ATOM.Cosmos/index.ATOM'),
  
  // BNB Chain DEXs
  BNB: () => import('./BNB.BinanceCoin/index.BNB'),
  
  // Bitcoin Cash DEXs
  BCH: () => import('./BCH.BitcoinCash/index.BCH'),
  
  // Bitcoin DEXs
  BTC: () => import('./BTC.Bitcoin/index.BTC'),
  
  // Dogecoin DEXs
  DOGE: () => import('./DOGE.Dogecoin/index.DOGE'),
  
  // Polkadot DEXs
  DOT: () => import('./DOT.Polkadot/index.DOT'),
  
  // Ethereum Classic DEXs
  ETC: () => import('./ETC.EthereumClassic/index.ETC'),
  
  // Ethereum DEXs
  ETH: () => import('./ETH.Ethereum/index.ETH'),
  
  // Litecoin DEXs
  LTC: () => import('./LTC.Litecoin/index.LTC'),
  
  // Terra (LUNA) DEXs
  LUNA: () => import('./LUNA.Terra/index.LUNA'),
  
  // Terra Classic (LUNC) DEXs
  LUNC: () => import('./LUNC.TerraClassic/index.LUNC'),
  
  // Solana (SOL) DEXs
  SOL: () => import('./SOL.Solana/index.SOL'),
  
  // Stacks (STX) DEXs
  STX: () => import('./STX.Stacks/index.STX'),
  
  // Tron (TRX) DEXs
  TRX: () => import('./TRX.Tron/index.TRX'),
  
  // Waves (WAVES) DEXs
  WAVES: () => import('./WAVES.Waves/index.WAVES'),
  
  // Stellar (XLM) DEXs
  XLM: () => import('./XLM.Stellar/index.XLM'),
  
  // Ripple (XRP) DEXs
  XRP: () => import('./XRP.Ripple/index.XRP'),
  
  // Tezos (XTZ) DEXs
  XTZ: () => import('./XTZ.Tezos/index.XTZ'),
};

// Default export
export default DEXs;
