/**
 * Web3 Connect Index - Blockchain wallet connection modules
 * 
 * This module exports web3 connection mechanisms for all supported blockchains.
 * Each blockchain has its own connection module with wallet-specific integrations,
 * RPC methods, and WalletConnect support.
 * 
 * Usage:
 *   import { AlgorandWeb3, EthereumWeb3, SolanaWeb3 } from '@web3Connect';
 * 
 * Each module provides:
 *   - web3ConnectionModule: Main connection handler
 *   - walletConnect: WalletConnect integration
 *   - Wallet-specific connectors (MetaMask, Phantom, Pera, etc.)
 *   - RPC methods for blockchain interactions
 * 
 * Last Updated: December 2025
 * Source: Blockchain-specific connection implementations
 */

export * as AlgorandWeb3 from './ALGO.Algorand/index.ALGO';
export * as ArweaveWeb3 from './AR.Arweave/index.AR';
export * as CosmosWeb3 from './ATOM.Cosmos/index.ATOM';
export * as BinanceWeb3 from './BNB.BinanceCoin/index.BNB';
export * as BitcoinWeb3 from './BTC.Bitcoin/index.BTC';
export * as PolkadotWeb3 from './DOT.Polkadot/index.DOT';
export * as EthereumClassicWeb3 from './ETC.EthereumClassic/index.ETC';
export * as EthereumWeb3 from './ETH.Ethereum/index.ETH';
export * as TerraWeb3 from './LUNA.Terra/index.LUNA';
export * as TerraClassicWeb3 from './LUNC.TerraClassic/index.LUNC';
export * as SolanaWeb3 from './SOL.Solana/index.SOL';
export * as StacksWeb3 from './STX.Stacks/index.STX';
export * as TronWeb3 from './TRX.Tron/index.TRX';
export * as WavesWeb3 from './WAVES.Waves/index.WAVES';
export * as StellarWeb3 from './XLM.Stellar/index.XLM';
export * as RippleWeb3 from './XRP.Ripple/index.XRP';
export * as TezosWeb3 from './XTZ.Tezos/index.XTZ';
