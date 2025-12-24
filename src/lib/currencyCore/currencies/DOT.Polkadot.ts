// ==========================================
// DOT.Polkadot - Main Router Module
// ==========================================
// This module routes Polkadot operations to specialized sub-modules
// based on cryptographic scheme and use case requirements.
//
// Routing Logic:
// - Keystore decryption → sr25519 module (standard Polkadot approach)
// - Raw private key import → ed25519 module (Exodus wallet compatibility)
// - Public key processing → Appropriate module based on context

import type { CurrencyData } from './currencyData';
import {
  polkadotSr25519Data,
  polkadotEd25519Data,
  routeKeystoreDecryption,
  routePrivateKeyDerivation,
  type PolkadotCryptoScheme
} from './ext.DOT.Polkadot/router.DOT.Polkadot';
import { exportPolkadotKeystore } from './ext.DOT.Polkadot/DOT.Polkadot.Export';
import { importPolkadot } from './ext.DOT.Polkadot/DOT.Polkadot.Import';
import type { PolkadotImportInput, PolkadotImportResult } from './ext.DOT.Polkadot/DOT.Polkadot.Import.Types';

// Re-export Polkadot crypto scheme types
export type { PolkadotCryptoScheme };

export const polkadotData: CurrencyData = {
  basicInfo: {
    name: "Polkadot",
    symbolTicker: "DOT",
    description: "A multi-chain network that enables cross-blockchain transfers of any type of data or asset, not just tokens.",
    creator: "Gavin Wood",
    debutYear: 2020,
    website: "https://polkadot.network/",
    whitePaper: "https://polkadot.network/PolkaDotPaper.pdf",
    primaryNFTMarketplace: "https://singular.app/",
    secondaryNFTMarketplace: "https://kodadot.xyz/",
  },

  technicalInfo: {
    proofingType: "Proof of Stake",
    class: "Layer 0 Blockchain (Multi-chain Relay Chain)",
    totalSupply: "1,000,000,000 DOT (initially 10,000,000,000, redenominated 100:1)",
    libraryHashing: "Blake2b",
    librarySigning: "Schnorrkel/Ristretto (sr25519)",
    mnemonicSeedPhraseLengths: "12, 24 words (BIP39)",
    privateKeyFormat: "64-character hexadecimal (32 bytes) or sr25519 seed",
    privateKeyToPublicKeyCurve: "sr25519 (Schnorrkel) / ed25519 (alternative)",
    publicKeyToPublicWalletAddressHashing: "Blake2b + SS58 encoding (network-specific prefix)",
    NPMLibraryHashing: "@noble/hashes/blake2.js",
    NPMLibrarySigning: "@polkadot/util-crypto",
    keyStoreFormat: "Polkadot.js JSON Keystore (scrypt + xsalsa20-poly1305)",
    jsonFormat: "Substrate JSON (Polkadot.js compatible)",
    smartContractLanguage: "Ink! (Rust-based) for parachains / WASM",
    primaryNPMPackage: "@polkadot/api",
    secondaryNPMPackage: "@polkadot/util-crypto",
    tertiaryNPMPackage: "@polkadot/keyring",
    web3ConnectMechanism: "Polkadot.js Extension / SubWallet / Talisman",
    nativeWallet: "Polkadot.js / Parity Signer",
    humanReadableAddressingPlatform: "Polkadot Name Service (PNS)",
    humanReadableAddressingNPMPackage: "N/A",
    SendingMechanism: "Substrate transaction signing and broadcasting",
    NFTMintingMechanism: "RMRK / Unique Network / Efinity (NFT 2.0 standards)",
    AssetTokenSupportAndMechanism: "XCM (Cross-Consensus Messaging) for cross-chain assets",
    evmChainID: "N/A (Substrate-based, though EVM-compatible parachains exist like Moonbeam ChainID 1284, Astar ChainID 592)",
    typicalDerivationPath: "//polkadot//0 (Substrate hard/soft derivation, not BIP44)",
    sendingFunctionality: "@polkadot/api signAndSend() with Keyring for transaction signing",
  },

  dex: [
    {
      name: "HydraDX",
      url: "https://hydradx.io/",
      type: "Omnipool AMM",
      description: "Next-gen AMM with single-sided liquidity provision on Polkadot",
    },
    {
      name: "Acala Swap",
      url: "https://apps.acala.network/",
      type: "DeFi Hub DEX",
      description: "All-in-one DeFi platform with DEX on Polkadot",
    },
    {
      name: "Polkaswap",
      url: "https://polkaswap.io/",
      type: "Multi-Algorithm DEX",
      description: "Cross-chain liquidity aggregator on SORA network",
    },
    {
      name: "Zenlink",
      url: "https://dex.zenlink.pro/",
      type: "Cross-Parachain DEX",
      description: "DEX protocol aggregating liquidity across parachains",
    },
    {
      name: "Stellaswap (Moonbeam)",
      url: "https://stellaswap.com/",
      type: "AMM DEX",
      description: "Leading DEX on Moonbeam parachain",
    },
    {
      name: "Beamswap (Moonbeam)",
      url: "https://beamswap.io/",
      type: "AMM DEX",
      description: "Decentralized exchange on Moonbeam",
    },
    {
      name: "ArthSwap (Astar)",
      url: "https://app.arthswap.org/",
      type: "AMM DEX",
      description: "One-stop DeFi protocol on Astar Network",
    },
  ],

  stakingProviders: [
    {
      name: "Polkadot Validators",
      url: "https://polkadot.js.org/apps/#/staking",
      type: "Native Staking",
      description: "Nominate up to 16 validators directly on Polkadot relay chain",
    },
    {
      name: "Kraken",
      url: "https://www.kraken.com/features/staking-coins",
      type: "Exchange Staking",
      description: "Stake DOT through Kraken exchange with 12% APY",
    },
    {
      name: "Coinbase",
      url: "https://www.coinbase.com/earn/staking/polkadot",
      type: "Exchange Staking",
      description: "Stake DOT through Coinbase",
    },
    {
      name: "Binance",
      url: "https://www.binance.com/en/staking",
      type: "Exchange Staking",
      description: "Flexible and locked DOT staking on Binance",
    },
    {
      name: "Acala Liquid Staking",
      url: "https://apps.acala.network/",
      type: "Liquid Staking",
      description: "Liquid staking on Acala with LDOT tokens",
    },
    {
      name: "Parallel Finance",
      url: "https://parallel.fi/",
      type: "Liquid Staking",
      description: "Liquid staking and lending protocol with sDOT",
    },
    {
      name: "Bifrost",
      url: "https://bifrost.finance/",
      type: "Liquid Staking",
      description: "Cross-chain liquid staking protocol with vDOT",
    },
  ],

  miningPools: "N/A (Nominated Proof of Stake - No Mining)",

  marketInfo: {
    allTimeHigh: {
      price: 54.98,
      currency: "USD",
      date: "2021-11-04",
    },
  },

  socialMedia: {
    discord: "https://discord.gg/polkadot",
    instagram: "https://www.instagram.com/polkadot_network/",
    linkedin: "https://www.linkedin.com/company/polkadot-network/",
    reddit: "https://www.reddit.com/r/polkadot/",
    slack: "N/A",
    telegram: "https://t.me/polkadot",
    twitterX: "https://twitter.com/Polkadot",
  },

  identifiers: {
    UCID: "6636",
    identifierBraveNewCoin: "DOT",
    identifierCoinAPI: "DOT",
    identifierCoinCap: "polkadot",
    identifierCoinGecko: "polkadot",
    identifierCoinPaprika: "dot-polkadot",
  },

  blockExplorer: {
    blockExplorerAPI: "https://polkascan.io/api",
    blockExplorerLink: "https://polkadot.subscan.io/account/",
  },

  rpcEndpoints: [
    {
      name: "Polkadot Official - MainNet",
      url: "wss://rpc.polkadot.io",
      port: 443,
      protocol: "wss",
      type: "WebSocket RPC (Public)",
      description: "Official Polkadot mainnet RPC endpoint. Provides direct blockchain interaction via Substrate RPC, query chain state, submit transactions, subscribe to events, and access runtime metadata. No API key required.",
      npmPackage: "@polkadot/api",
      documentation: "https://polkadot.js.org/docs/",
      network: "mainnet",
      serviceType: "websocket-rpc",
    },
    {
      name: "Polkadot Official - Kusama",
      url: "wss://kusama-rpc.polkadot.io",
      port: 443,
      protocol: "wss",
      type: "WebSocket RPC (Public)",
      description: "Official Kusama canary network RPC endpoint. Provides direct blockchain interaction via Substrate RPC for the experimental Kusama network. No API key required.",
      npmPackage: "@polkadot/api",
      documentation: "https://polkadot.js.org/docs/",
      network: "kusama",
      serviceType: "websocket-rpc",
    },
    {
      name: "Polkadot Official - Westend",
      url: "wss://westend-rpc.polkadot.io",
      port: 443,
      protocol: "wss",
      type: "WebSocket RPC (Public)",
      description: "Official Westend testnet RPC endpoint. Provides direct blockchain interaction via Substrate RPC for testing and development. No API key required.",
      npmPackage: "@polkadot/api",
      documentation: "https://polkadot.js.org/docs/",
      network: "testnet",
      serviceType: "websocket-rpc",
    },
    {
      name: "OnFinality - Polkadot Archive",
      url: "wss://polkadot.api.onfinality.io/public-ws",
      port: 443,
      protocol: "wss",
      type: "WebSocket RPC (Public Archive)",
      description: "OnFinality public archive node for Polkadot. Provides full historical data access and archive node functionality. No API key required.",
      npmPackage: "@polkadot/api",
      documentation: "https://onfinality.io/",
      network: "mainnet",
      serviceType: "websocket-rpc",
    },
    {
      name: "Subscan - Polkadot",
      url: "https://polkadot.api.subscan.io",
      port: 443,
      protocol: "https",
      type: "REST API (Public, Optional API Key)",
      description: "Most comprehensive Substrate ecosystem explorer. Provides account balances with staking/bonding info, transaction and transfer history, block information, network statistics, identity lookups, and EVM support on compatible chains. Free tier with quotas, optional API key for higher limits.",
      npmPackage: "axios",
      documentation: "https://support.subscan.io/",
      network: "mainnet",
      serviceType: "rest",
    },
    {
      name: "Subscan - Kusama",
      url: "https://kusama.api.subscan.io",
      port: 443,
      protocol: "https",
      type: "REST API (Public, Optional API Key)",
      description: "Subscan API for Kusama canary network. Provides comprehensive explorer functionality for Kusama including account balances, transaction history, and network statistics. Free tier with quotas, optional API key for higher limits.",
      npmPackage: "axios",
      documentation: "https://support.subscan.io/",
      network: "kusama",
      serviceType: "rest",
    },
    {
      name: "Subscan - Westend",
      url: "https://westend.api.subscan.io",
      port: 443,
      protocol: "https",
      type: "REST API (Public, Optional API Key)",
      description: "Subscan API for Westend testnet. Provides comprehensive explorer functionality for testing and development. Free tier with quotas, optional API key for higher limits.",
      npmPackage: "axios",
      documentation: "https://support.subscan.io/",
      network: "testnet",
      serviceType: "rest",
    },
    {
      name: "Statescan - Polkadot",
      url: "https://polkadot.statescan.io",
      port: 443,
      protocol: "https",
      type: "REST API (Public)",
      description: "Explorer for Substrate-based chains. Provides account information with detailed balances (free, reserved, locked), transfer history, extrinsic history, and block exploration. No API key required.",
      npmPackage: "axios",
      documentation: "https://polkadot.statescan.io/",
      network: "mainnet",
      serviceType: "rest",
    },
    {
      name: "Statescan - Kusama",
      url: "https://kusama.statescan.io",
      port: 443,
      protocol: "https",
      type: "REST API (Public)",
      description: "Statescan explorer for Kusama canary network. Provides account information, transfer history, and extrinsic history. No API key required.",
      npmPackage: "axios",
      documentation: "https://kusama.statescan.io/",
      network: "kusama",
      serviceType: "rest",
    },
    {
      name: "Statescan - Westend",
      url: "https://westend.statescan.io",
      port: 443,
      protocol: "https",
      type: "REST API (Public)",
      description: "Statescan explorer for Westend testnet. Provides account information, transfer history, and extrinsic history for testing. No API key required.",
      npmPackage: "axios",
      documentation: "https://westend.statescan.io/",
      network: "testnet",
      serviceType: "rest",
    },
    {
      name: "Polkascan - Polkadot",
      url: "https://api.polkascan.io/api/v1/polkadot",
      port: 443,
      protocol: "https",
      type: "REST API (Public)",
      description: "Substrate-based chain explorer. Provides account information with free/reserved balances, extrinsic history, block information, and latest blocks query. No API key required.",
      npmPackage: "axios",
      documentation: "https://polkascan.io/",
      network: "mainnet",
      serviceType: "rest",
    },
    {
      name: "Polkascan - Kusama",
      url: "https://api.polkascan.io/api/v1/kusama",
      port: 443,
      protocol: "https",
      type: "REST API (Public)",
      description: "Polkascan explorer for Kusama canary network. Provides account information, extrinsic history, and block exploration. No API key required.",
      npmPackage: "axios",
      documentation: "https://polkascan.io/",
      network: "kusama",
      serviceType: "rest",
    },
    {
      name: "3xpl - Polkadot",
      url: "https://api.3xpl.com",
      port: 443,
      protocol: "https",
      type: "REST API (Public)",
      description: "Multi-chain explorer supporting Polkadot. Provides account balances (confirmed and unconfirmed), transaction history, transaction details, and latest block information. No API key required.",
      npmPackage: "axios",
      documentation: "https://3xpl.com/api",
      network: "mainnet",
      serviceType: "rest",
    },
    {
      name: "Tokenview - Polkadot",
      url: "https://services.tokenview.io/vipapi",
      port: 443,
      protocol: "https",
      type: "REST API (API Key Required)",
      description: "Multi-chain blockchain API supporting 70+ blockchains including Polkadot. Provides account balances, transaction history, latest block info, and transaction details. Free tier: 100 requests/day. Requires API key.",
      npmPackage: "axios",
      documentation: "https://services.tokenview.io/docs",
      network: "mainnet",
      serviceType: "rest",
      requiresApiKey: true,
    },
    {
      name: "GetBlock - Polkadot",
      url: "https://dot.getblock.io",
      port: 443,
      protocol: "https",
      type: "Substrate RPC (API Key Required)",
      description: "Instant access to Polkadot RPC nodes. Provides direct blockchain queries via RPC, block and chain information, and extrinsic submission. Free tier available. Requires API key.",
      npmPackage: "@polkadot/api",
      documentation: "https://getblock.io/docs/",
      network: "mainnet",
      serviceType: "rpc",
      requiresApiKey: true,
    },
    {
      name: "GetBlock - Kusama",
      url: "https://ksm.getblock.io",
      port: 443,
      protocol: "https",
      type: "Substrate RPC (API Key Required)",
      description: "Instant access to Kusama RPC nodes. Provides direct blockchain queries via RPC for the Kusama canary network. Free tier available. Requires API key.",
      npmPackage: "@polkadot/api",
      documentation: "https://getblock.io/docs/",
      network: "kusama",
      serviceType: "rpc",
      requiresApiKey: true,
    },
    {
      name: "NOWNodes - Polkadot",
      url: "https://dot.nownodes.io",
      port: 443,
      protocol: "https",
      type: "Substrate RPC (API Key Required)",
      description: "Full node access and block explorer. Provides RPC method support, account information, block queries, chain properties, and runtime version info. Free tier: 5,000 requests/month. Requires API key.",
      npmPackage: "@polkadot/api",
      documentation: "https://nownodes.io/documentation",
      network: "mainnet",
      serviceType: "rpc",
      requiresApiKey: true,
    },
    {
      name: "NOWNodes - Kusama",
      url: "https://ksm.nownodes.io",
      port: 443,
      protocol: "https",
      type: "Substrate RPC (API Key Required)",
      description: "Full node access for Kusama canary network. Provides RPC method support, account information, and block queries. Free tier: 5,000 requests/month. Requires API key.",
      npmPackage: "@polkadot/api",
      documentation: "https://nownodes.io/documentation",
      network: "kusama",
      serviceType: "rpc",
      requiresApiKey: true,
    },
    {
      name: "Acala Parachain",
      url: "wss://acala-rpc-0.aca-api.network",
      port: 443,
      protocol: "wss",
      type: "WebSocket RPC (Public)",
      description: "Acala parachain RPC endpoint. Acala is a DeFi hub parachain on Polkadot providing liquid staking, DEX, and stablecoin functionality. No API key required.",
      npmPackage: "@polkadot/api",
      documentation: "https://acala.network/",
      network: "mainnet",
      serviceType: "websocket-rpc",
    },
    {
      name: "Parallel Finance Parachain",
      url: "wss://parallel-rpc-0.parallel.fi",
      port: 443,
      protocol: "wss",
      type: "WebSocket RPC (Public)",
      description: "Parallel Finance parachain RPC endpoint. Parallel Finance provides liquid staking and lending protocol with sDOT tokens. No API key required.",
      npmPackage: "@polkadot/api",
      documentation: "https://parallel.fi/",
      network: "mainnet",
      serviceType: "websocket-rpc",
    },
    {
      name: "Bifrost Parachain",
      url: "wss://bifrost-rpc.liebi.com",
      port: 443,
      protocol: "wss",
      type: "WebSocket RPC (Public)",
      description: "Bifrost parachain RPC endpoint. Bifrost provides cross-chain liquid staking protocol with vDOT tokens. No API key required.",
      npmPackage: "@polkadot/api",
      documentation: "https://bifrost.finance/",
      network: "mainnet",
      serviceType: "websocket-rpc",
    },
    {
      name: "Moonbeam Parachain (EVM)",
      url: "https://rpc.api.moonbeam.network",
      port: 443,
      protocol: "https",
      type: "EVM RPC Node (Public)",
      description: "Moonbeam parachain EVM-compatible RPC endpoint. Moonbeam is a full Ethereum-compatible smart contract platform on Polkadot. Provides Ethereum JSON-RPC for smart contracts and DeFi applications. No API key required.",
      npmPackage: "web3",
      documentation: "https://docs.moonbeam.network/",
      network: "mainnet",
      serviceType: "evm-rpc",
    },
    {
      name: "Astar Parachain (EVM)",
      url: "https://evm.astar.network",
      port: 443,
      protocol: "https",
      type: "EVM RPC Node (Public)",
      description: "Astar parachain EVM-compatible RPC endpoint. Astar is a multi-chain smart contract platform supporting both EVM and WASM. Provides Ethereum JSON-RPC for EVM smart contracts. No API key required.",
      npmPackage: "web3",
      documentation: "https://docs.astar.network/",
      network: "mainnet",
      serviceType: "evm-rpc",
    },
    {
      name: "HydraDX Parachain",
      url: "wss://rpc.hydradx.cloud",
      port: 443,
      protocol: "wss",
      type: "WebSocket RPC (Public)",
      description: "HydraDX parachain RPC endpoint. HydraDX is an Omnipool AMM DEX on Polkadot providing next-gen liquidity provision. No API key required.",
      npmPackage: "@polkadot/api",
      documentation: "https://hydradx.io/",
      network: "mainnet",
      serviceType: "websocket-rpc",
    },
  ],

  decryptKeystore: async (keystore: unknown, password: string): Promise<string> => {
    return await routeKeystoreDecryption(keystore, password);
  },

  deriveFromPrivateKey: async (privateKey: string, method?: 'auto' | 'polkadotjs' | 'exodus') => {
    return await routePrivateKeyDerivation(privateKey, method || 'auto');
  },

  exportKeystore: async (privateKey: string, password: string, metadata?: { name?: string; address?: string }) => {
    return await exportPolkadotKeystore(privateKey, password, metadata);
  },

  importWallet: async (input: PolkadotImportInput): Promise<PolkadotImportResult> => {
    return await importPolkadot(input);
  },

  getBlockExplorerLink: (address: string, format?: string): string | null => {
    // Polkadot uses network-specific explorers based on the format/network
    if (format === "Kusama") {
      return `https://kusama.subscan.io/account/${address}`;
    } else if (format === "Polkadot") {
      return `https://polkadot.subscan.io/account/${address}`;
    } else {
      // Default to Polkadot mainnet explorer
      return `https://polkadot.subscan.io/account/${address}`;
    }
  }
};