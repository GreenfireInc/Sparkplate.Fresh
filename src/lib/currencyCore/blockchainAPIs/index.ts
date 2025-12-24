// Blockchain APIs Index
// Central export point for all blockchain API implementations

/**
 * Blockchain APIs Overview
 * 
 * This module provides comprehensive blockchain API integrations for various cryptocurrencies.
 * Each blockchain has its own directory with multiple API providers and implementations.
 * 
 * Supported Blockchains:
 * - Algorand (ALGO) - Account-based blockchain with smart contracts
 * - Arweave (AR) - Permanent storage blockchain with blockweave technology
 * - Bitcoin (BTC) - UTXO-based blockchain with multiple API providers
 * - Bitcoin Cash (BCH) - Fork of Bitcoin with enhanced features
 * - Binance Smart Chain (BNB) - Ethereum-compatible blockchain
 * - Cosmos (ATOM) - Inter-blockchain communication protocol
 * - Dogecoin (DOGE) - Litecoin-based cryptocurrency
 * - Ethereum (ETH) - Smart contract platform
 * - Ethereum Classic (ETC) - Original Ethereum blockchain
 * - Litecoin (LTC) - Bitcoin fork with faster block times
 * - Polkadot (DOT) - Multi-chain blockchain platform
 * - Ripple (XRP) - Payment protocol
 * - Solana (SOL) - High-performance blockchain
 * - Stacks (STX) - Bitcoin-secured smart contracts
 * - Stellar (XLM) - Payment network
 * - Terra 2.0 (LUNA) - Cosmos-based blockchain
 * - Terra Classic (LUNC) - Original Terra blockchain
 * - Tezos (XTZ) - Self-amending blockchain
 * - Tron (TRX) - High-throughput blockchain
 * - Waves (WAVES) - Custom blockchain platform
 * 
 * Usage Examples:
 * 
 * ```typescript
 * import { BlockchainAPIs } from '@/lib/currencyCore/blockchainAPIs';
 * 
 * // Access Arweave APIs
 * const arAPIs = await BlockchainAPIs.AR;
 * const arweaveNetwork = new arAPIs.ArweaveNetworkAPI();
 * 
 * // Access Bitcoin APIs
 * const btcAPIs = await BlockchainAPIs.BTC;
 * const blockstream = new btcAPIs.BlockstreamAPI();
 * 
 * // Access Ethereum APIs
 * const ethAPIs = await BlockchainAPIs.ETH;
 * const etherscan = new ethAPIs.EtherscanAPI({ apiKey: 'your_api_key' });
 * 
 * // Access Algorand APIs
 * const algoAPIs = await BlockchainAPIs.ALGO;
 * const algoExplorer = new algoAPIs.AlgoExplorerAPI();
 * ```
 */

// Consolidated exports for easy access
export const BlockchainAPIs = {
  // Algorand APIs
  ALGO: () => import('./ALGO.Algorand/index.ALGO'),
  
  // Arweave APIs
  AR: () => import('./AR.Arweave/index.AR'),
  
  // Cosmos (ATOM) APIs
  ATOM: () => import('./ATOM.Cosmos/index.ATOM'),
  
  // Bitcoin Cash APIs
  BCH: () => import('./BCH.BitcoinCash/index.BCH'),
  
  // BNB (Binance Smart Chain) APIs
  BNB: () => import('./BNB.BinanceCoin/index.BNB'),
  
  // Bitcoin APIs
  BTC: () => import('./BTC.Bitcoin/index.BTC'),
  
  // Dogecoin APIs
  DOGE: () => import('./DOGE.Dogecoin/index.DOGE'),
  
  // Polkadot APIs
  DOT: () => import('./DOT.Polkadot/index.DOT'),
  
  // Ethereum Classic APIs
  ETC: () => import('./ETC.EthereumClassic/index.ETC'),
  
  // Ethereum APIs
  ETH: () => import('./ETH.Ethereum/index.ETH'),
  
  // Litecoin APIs
  LTC: () => import('./LTC.Litecoin/index.LTC'),
  
  // Terra 2.0 (LUNA) APIs
  LUNA: () => import('./LUNA.Terra/index.LUNA'),
  
  // Terra Classic (LUNC) APIs
  LUNC: () => import('./LUNC.TerraClassic/index.LUNC'),
  
  // Solana (SOL) APIs
  SOL: () => import('./SOL.Solana/index.SOL'),
  
  // Stacks (STX) APIs
  STX: () => import('./STX.Stacks/index.STX'),
  
  // Tron (TRX) APIs
  TRX: () => import('./TRX.Tron/index.TRX'),
  
  // Waves (WAVES) APIs
  WAVES: () => import('./WAVES.Waves/index.WAVES'),
  
  // Stellar (XLM) APIs
  XLM: () => import('./XLM.Stellar/index.XLM'),
  
  // Ripple (XRP) APIs
  XRP: () => import('./XRP.Ripple/index.XRP'),
  
  // Tezos (XTZ) APIs
  XTZ: () => import('./XTZ.Tezos/index.XTZ'),
};

// Default export
export default BlockchainAPIs;