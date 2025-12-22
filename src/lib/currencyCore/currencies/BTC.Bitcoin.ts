// Currency: Bitcoin (BTC)
// Source: Cryptocurrency Data
// Research Data Compiled from Multiple Sources
//
// This file serves as a router for different Bitcoin address formats.
// Use the format parameter in deriveFromPrivateKey to specify the address type:
//
// - 'P2PKH': Legacy addresses (starts with "1")
// - 'P2SH': SegWit compatibility (starts with "3")
// - 'P2WPKH': Native SegWit (starts with "bc1q")
// - 'P2TR': Taproot (starts with "bc1p")
//
// Example: deriveFromPrivateKey(privateKey, 'P2WPKH')

import type { CurrencyData, DerivedInfo } from './currencyData';
import { 
  bitcoinP2PKHData, 
  bitcoinP2SHData, 
  bitcoinP2WPKHData, 
  bitcoinP2TRData,
  BitcoinAddressFormat 
} from './ext.BTC.Bitcoin/router.BTC.Bitcoin';

// Re-export Bitcoin address format types
export type { BitcoinAddressFormat };

export const bitcoinData: CurrencyData = {
  basicInfo: {
    name: "Bitcoin",
    symbolTicker: "BTC",
    description: "The first and most well-known cryptocurrency, created by Satoshi Nakamoto. Often referred to as digital gold, it serves as a decentralized digital currency and store of value.",
    creator: "Satoshi Nakamoto",
    debutYear: 2009,
    website: "https://bitcoin.org/",
    whitePaper: "https://bitcoin.org/bitcoin.pdf",
    primaryNFTMarketplace: "https://magiceden.io/ordinals",
    secondaryNFTMarketplace: "https://ordinals.com/",
  },

  technicalInfo: {
    proofingType: "Proof of Work",
    class: "Layer 1 Blockchain (Original Cryptocurrency)",
    totalSupply: "21,000,000 BTC",
    libraryHashing: "SHA-256 (double)",
    librarySigning: "ECDSA",
    mnemonicSeedPhraseLengths: "12, 24 words (BIP39)",
    privateKeyFormat: "64-character hexadecimal (32 bytes) or WIF (Wallet Import Format)",
    privateKeyToPublicKeyCurve: "secp256k1",
    publicKeyToPublicWalletAddressHashing: "SHA-256 + RIPEMD-160 + Base58Check / Bech32",
    NPMLibraryHashing: "@noble/hashes/sha256",
    NPMLibrarySigning: "@noble/secp256k1",
    keyStoreFormat: "Bitcoin Core wallet.dat (Berkeley DB) / WIF",
    jsonFormat: "Bitcoin Core JSON-RPC",
    smartContractLanguage: "Bitcoin Script (limited scripting)",
    primaryNPMPackage: "bitcoinjs-lib",
    secondaryNPMPackage: "@noble/secp256k1",
    tertiaryNPMPackage: "bip39",
    web3ConnectMechanism: "WalletConnect / Bitcoin Core RPC",
    nativeWallet: "Bitcoin Core / Electrum",
    humanReadableAddressingPlatform: "N/A (no native name service)",
    humanReadableAddressingNPMPackage: "N/A",
    SendingMechanism: "Bitcoin transaction broadcasting via nodes/RPC",
    NFTMintingMechanism: "Ordinals (inscription-based NFTs on satoshis)",
    AssetTokenSupportAndMechanism: "N/A (no native token standard, but Ordinals BRC-20)",
    evmChainID: "N/A (UTXO-based chain)",
    typicalDerivationPath: "m/44'/0'/0'/0/0 (P2PKH), m/49'/0'/0'/0/0 (P2SH-SegWit), m/84'/0'/0'/0/0 (Native SegWit), m/86'/0'/0'/0/0 (Taproot)",
    sendingFunctionality: "bitcoinjs-lib PSBT (Partially Signed Bitcoin Transaction) creation and broadcasting",
  },

  dex: [
    {
      name: "Bisq",
      url: "https://bisq.network/",
      type: "P2P Decentralized Exchange",
      description: "Peer-to-peer decentralized exchange for trading BTC without intermediaries",
    },
    {
      name: "HODL HODL",
      url: "https://hodlhodl.com/",
      type: "P2P Trading Platform",
      description: "Non-custodial P2P Bitcoin exchange with multisig escrow",
    },
    {
      name: "Robosats",
      url: "https://learn.robosats.com/",
      type: "Lightning Network P2P",
      description: "Private P2P exchange over Tor using Lightning Network",
    },
    {
      name: "Boltz",
      url: "https://boltz.exchange/",
      type: "Atomic Swap Exchange",
      description: "Non-custodial exchange with submarine swaps on Lightning",
    },
    {
      name: "SideShift.ai",
      url: "https://sideshift.ai/",
      type: "Cross-Chain Exchange",
      description: "Instant cryptocurrency exchange supporting BTC",
    },
    {
      name: "FixedFloat",
      url: "https://fixedfloat.com/",
      type: "Instant Exchange",
      description: "Lightning-fast cryptocurrency exchange",
    },
    {
      name: "Thorchain (Native BTC)",
      url: "https://thorchain.org/",
      type: "Cross-Chain AMM",
      description: "Decentralized liquidity network supporting native BTC",
    },
  ],

  stakingProviders: [
    {
      name: "N/A - Proof of Work",
      url: "https://bitcoin.org/",
      type: "Mining",
      description: "Bitcoin uses Proof of Work consensus. See mining pools for participation. Wrapped BTC can be staked on other chains.",
    },
  ],

  miningPools: [
    {
      name: "Foundry USA",
      url: "https://foundrydigital.com/",
      type: "Mining Pool",
      description: "Largest Bitcoin mining pool by hashrate",
    },
    {
      name: "AntPool",
      url: "https://www.antpool.com/",
      type: "Mining Pool",
      description: "Major mining pool operated by Bitmain",
    },
    {
      name: "F2Pool",
      url: "https://www.f2pool.com/",
      type: "Mining Pool",
      description: "One of the oldest and largest Bitcoin mining pools",
    },
    {
      name: "ViaBTC",
      url: "https://www.viabtc.com/",
      type: "Mining Pool",
      description: "Multi-currency mining pool with significant BTC hashrate",
    },
    {
      name: "Binance Pool",
      url: "https://pool.binance.com/",
      type: "Mining Pool",
      description: "Mining pool operated by Binance exchange",
    },
    {
      name: "Slush Pool",
      url: "https://slushpool.com/",
      type: "Mining Pool",
      description: "The first Bitcoin mining pool, established in 2010",
    },
    {
      name: "Luxor",
      url: "https://luxor.tech/",
      type: "Mining Pool",
      description: "North American mining pool with advanced features",
    },
  ],

  marketInfo: {
    allTimeHigh: {
      price: 126080.00,
      currency: "USD",
      date: "2025-10-06",
    },
  },

  socialMedia: {
    discord: "https://discord.gg/bitcoin",
    instagram: "https://www.instagram.com/bitcoin/",
    linkedin: "https://www.linkedin.com/company/bitcoin/",
    reddit: "https://www.reddit.com/r/Bitcoin/",
    slack: "N/A",
    telegram: "https://t.me/BitcoinCore",
    twitterX: "https://twitter.com/bitcoin",
  },

  identifiers: {
    UCID: "1",
    identifierBraveNewCoin: "BTC",
    identifierCoinAPI: "BTC",
    identifierCoinCap: "bitcoin",
    identifierCoinGecko: "bitcoin",
    identifierCoinPaprika: "btc-bitcoin",
  },

  blockExplorer: {
    blockExplorerAPI: "https://api.blockcypher.com/v1/btc/main",
    blockExplorerLink: "https://blockchair.com/bitcoin/address/",
  },

  rpcEndpoints: [
    {
      name: "Blockstream - MainNet",
      url: "https://blockstream.info/api",
      port: 443,
      protocol: "https",
      type: "REST API (Public)",
      description: "Privacy-focused, open-source API with no tracking. Provides UTXO queries, transaction history, balance checks, and transaction broadcasting. Supports SegWit and Taproot. Generous rate limits, no API key required.",
      npmPackage: "bitcoinjs-lib",
      documentation: "https://blockstream.info/explorer-api",
      network: "mainnet",
      serviceType: "rest",
    },
    {
      name: "Blockstream - TestNet",
      url: "https://blockstream.info/testnet/api",
      port: 443,
      protocol: "https",
      type: "REST API (Public)",
      description: "Privacy-focused, open-source API for Bitcoin TestNet. Provides UTXO queries, transaction history, balance checks, and transaction broadcasting. Supports SegWit and Taproot. Generous rate limits, no API key required.",
      npmPackage: "bitcoinjs-lib",
      documentation: "https://blockstream.info/explorer-api",
      network: "testnet",
      serviceType: "rest",
    },
    {
      name: "Blockstream - Liquid",
      url: "https://blockstream.info/liquid/api",
      port: 443,
      protocol: "https",
      type: "REST API (Public)",
      description: "Privacy-focused, open-source API for Liquid Network (Bitcoin sidechain). Provides UTXO queries, transaction history, balance checks, and transaction broadcasting. Generous rate limits, no API key required.",
      npmPackage: "bitcoinjs-lib",
      documentation: "https://blockstream.info/explorer-api",
      network: "liquid",
      serviceType: "rest",
    },
    {
      name: "Blockchain.com - MainNet",
      url: "https://blockchain.info/api",
      port: 443,
      protocol: "https",
      type: "REST API (Public)",
      description: "One of the oldest and most trusted Bitcoin APIs. Provides UTXO queries, multi-address balance queries, transaction history, and transaction broadcasting. Moderate rate limits, no API key required for basic endpoints.",
      npmPackage: "bitcoinjs-lib",
      documentation: "https://www.blockchain.com/api",
      network: "mainnet",
      serviceType: "rest",
    },
    {
      name: "Blockchain.com - TestNet",
      url: "https://testnet.blockchain.info/api",
      port: 443,
      protocol: "https",
      type: "REST API (Public)",
      description: "Blockchain.com API for Bitcoin TestNet. Provides UTXO queries, multi-address balance queries, transaction history, and transaction broadcasting. Moderate rate limits, no API key required for basic endpoints.",
      npmPackage: "bitcoinjs-lib",
      documentation: "https://www.blockchain.com/api",
      network: "testnet",
      serviceType: "rest",
    },
    {
      name: "BlockCypher - MainNet",
      url: "https://api.blockcypher.com/v1/btc/main",
      port: 443,
      protocol: "https",
      type: "REST API (Public, Optional API Key)",
      description: "Unified blockchain API with webhooks support. Provides UTXO queries, transaction history, confidence scores, and transaction broadcasting. Free tier: 3 req/sec (non-registered), 200 req/hour. Optional API key for higher limits.",
      npmPackage: "bitcoinjs-lib",
      documentation: "https://www.blockcypher.com/dev/bitcoin/",
      network: "mainnet",
      serviceType: "rest",
    },
    {
      name: "BlockCypher - TestNet",
      url: "https://api.blockcypher.com/v1/btc/test3",
      port: 443,
      protocol: "https",
      type: "REST API (Public, Optional API Key)",
      description: "Unified blockchain API for Bitcoin TestNet with webhooks support. Provides UTXO queries, transaction history, confidence scores, and transaction broadcasting. Free tier: 3 req/sec (non-registered), 200 req/hour. Optional API key for higher limits.",
      npmPackage: "bitcoinjs-lib",
      documentation: "https://www.blockcypher.com/dev/bitcoin/",
      network: "testnet",
      serviceType: "rest",
    },
    {
      name: "Bitaps - MainNet",
      url: "https://bitaps.com/api",
      port: 443,
      protocol: "https",
      type: "REST API (Public)",
      description: "Modern RESTful API with clean JSON responses. Provides UTXO queries, transaction decoding, fee recommendations, balance checks, and transaction broadcasting. No API key required, reasonable rate limits apply.",
      npmPackage: "bitcoinjs-lib",
      documentation: "https://developer.bitaps.com/",
      network: "mainnet",
      serviceType: "rest",
    },
    {
      name: "Bitaps - TestNet",
      url: "https://testnet.bitaps.com/api",
      port: 443,
      protocol: "https",
      type: "REST API (Public)",
      description: "Modern RESTful API for Bitcoin TestNet with clean JSON responses. Provides UTXO queries, transaction decoding, fee recommendations, balance checks, and transaction broadcasting. No API key required, reasonable rate limits apply.",
      npmPackage: "bitcoinjs-lib",
      documentation: "https://developer.bitaps.com/",
      network: "testnet",
      serviceType: "rest",
    },
    {
      name: "SoChain - MainNet",
      url: "https://sochain.com/api/v3",
      port: 443,
      protocol: "https",
      type: "REST API (Public)",
      description: "Simple and reliable blockchain API. Provides UTXO queries, balance checks, transaction history, address validation, and network statistics. High rate limits: 300 requests/minute. No API key required.",
      npmPackage: "bitcoinjs-lib",
      documentation: "https://sochain.com/api",
      network: "mainnet",
      serviceType: "rest",
    },
    {
      name: "SoChain - TestNet",
      url: "https://sochain.com/api/v3",
      port: 443,
      protocol: "https",
      type: "REST API (Public)",
      description: "Simple and reliable blockchain API for Bitcoin TestNet. Provides UTXO queries, balance checks, transaction history, address validation, and network statistics. High rate limits: 300 requests/minute. No API key required.",
      npmPackage: "bitcoinjs-lib",
      documentation: "https://sochain.com/api",
      network: "testnet",
      serviceType: "rest",
    },
    {
      name: "Tokenview - MainNet",
      url: "https://services.tokenview.com/vipapi/btc",
      port: 443,
      protocol: "https",
      type: "REST API (API Key Required)",
      description: "Multi-chain blockchain API supporting 70+ blockchains. Provides comprehensive API coverage, transaction history with pagination, and block explorer functionality. Free tier: 100 requests/day. Requires API key.",
      npmPackage: "bitcoinjs-lib",
      documentation: "https://tokenview.com/en/api",
      network: "mainnet",
      serviceType: "rest",
      requiresApiKey: true,
    },
    {
      name: "Tokenview - TestNet",
      url: "https://services.tokenview.com/vipapi/btctest",
      port: 443,
      protocol: "https",
      type: "REST API (API Key Required)",
      description: "Multi-chain blockchain API for Bitcoin TestNet. Provides comprehensive API coverage, transaction history with pagination, and block explorer functionality. Free tier: 100 requests/day. Requires API key.",
      npmPackage: "bitcoinjs-lib",
      documentation: "https://tokenview.com/en/api",
      network: "testnet",
      serviceType: "rest",
      requiresApiKey: true,
    },
    {
      name: "NOWNodes - MainNet",
      url: "https://btc.nownodes.io",
      port: 443,
      protocol: "https",
      type: "REST API (API Key Required)",
      description: "Full node access via Blockbook. Provides real blockchain node data, comprehensive block explorer features, and multi-chain support (60+ blockchains). Free tier: 5,000 requests/month. Requires API key.",
      npmPackage: "bitcoinjs-lib",
      documentation: "https://nownodes.io/",
      network: "mainnet",
      serviceType: "rest",
      requiresApiKey: true,
    },
    {
      name: "NOWNodes - TestNet",
      url: "https://btc-testnet.nownodes.io",
      port: 443,
      protocol: "https",
      type: "REST API (API Key Required)",
      description: "Full node access via Blockbook for Bitcoin TestNet. Provides real blockchain node data, comprehensive block explorer features, and multi-chain support. Free tier: 5,000 requests/month. Requires API key.",
      npmPackage: "bitcoinjs-lib",
      documentation: "https://nownodes.io/",
      network: "testnet",
      serviceType: "rest",
      requiresApiKey: true,
    },
    {
      name: "Blast - MainNet",
      url: "https://bitcoin-mainnet.blastapi.io",
      port: 443,
      protocol: "https",
      type: "Bitcoin Core RPC (API Key Required)",
      description: "High-performance infrastructure with full Bitcoin Core RPC access. Provides enterprise-grade reliability, WebSocket support, and project-based organization. Very generous free tier: 12M requests/month. Requires API key and project ID.",
      npmPackage: "bitcoinjs-lib",
      documentation: "https://blastapi.io/",
      network: "mainnet",
      serviceType: "rpc",
      requiresApiKey: true,
    },
    {
      name: "Blast - TestNet",
      url: "https://bitcoin-testnet.blastapi.io",
      port: 443,
      protocol: "https",
      type: "Bitcoin Core RPC (API Key Required)",
      description: "High-performance infrastructure for Bitcoin TestNet with full Bitcoin Core RPC access. Provides enterprise-grade reliability, WebSocket support, and project-based organization. Very generous free tier: 12M requests/month. Requires API key and project ID.",
      npmPackage: "bitcoinjs-lib",
      documentation: "https://blastapi.io/",
      network: "testnet",
      serviceType: "rpc",
      requiresApiKey: true,
    },
  ],

  deriveFromPrivateKey: async (privateKey: string, format?: BitcoinAddressFormat): Promise<DerivedInfo> => {
    try {
      console.log('🔧 [BTC ROUTER] Routing Bitcoin address derivation...');

      // If a specific format is requested, use single format mode
      if (format) {
        console.log(`📦 [BTC ROUTER] Using single format: ${format}`);

        let result: DerivedInfo;
        let formatDescription: string;

        switch (format) {
          case 'P2PKH':
            result = await bitcoinP2PKHData.deriveFromPrivateKey!(privateKey);
            formatDescription = 'Legacy (P2PKH) - starts with "1"';
            break;

          case 'P2SH':
            result = await bitcoinP2SHData.deriveFromPrivateKey!(privateKey);
            formatDescription = 'SegWit Compatibility (P2SH) - starts with "3"';
            break;

          case 'P2WPKH':
            result = await bitcoinP2WPKHData.deriveFromPrivateKey!(privateKey);
            formatDescription = 'Native SegWit (P2WPKH) - starts with "bc1q"';
            break;

          case 'P2TR':
            result = await bitcoinP2TRData.deriveFromPrivateKey!(privateKey);
            formatDescription = 'Taproot (P2TR) - starts with "bc1p"';
            break;

          default:
            throw new Error(`Unsupported Bitcoin address format: ${format}`);
        }

        // Return extended result with format information
        return {
          ...result,
          format: format,
          formatDescription
        };
      }

      // Multi-format mode: Generate all four address formats
      console.log('🔄 [BTC ROUTER] Generating all Bitcoin address formats...');

      const [p2pkhResult, p2shResult, p2wpkhResult, p2trResult] = await Promise.all([
        bitcoinP2PKHData.deriveFromPrivateKey!(privateKey),
        bitcoinP2SHData.deriveFromPrivateKey!(privateKey),
        bitcoinP2WPKHData.deriveFromPrivateKey!(privateKey),
        bitcoinP2TRData.deriveFromPrivateKey!(privateKey)
      ]);

      console.log('✅ [BTC ROUTER] All Bitcoin address formats generated:');
      console.log(`📍 [BTC ROUTER] P2PKH: ${p2pkhResult.address}`);
      console.log(`📍 [BTC ROUTER] P2SH: ${p2shResult.address}`);
      console.log(`📍 [BTC ROUTER] P2WPKH: ${p2wpkhResult.address}`);
      console.log(`📍 [BTC ROUTER] P2TR: ${p2trResult.address}`);

      // Create formatted multi-line display with protocol prefixes for UI
      const formattedDisplay = `P2PKH://${p2pkhResult.address}\nP2SH://${p2shResult.address}\nP2WPKH://${p2wpkhResult.address}\nP2TR://${p2trResult.address}`;

      // Return the P2PKH address as the primary address (most compatible)
      return {
        publicKey: p2pkhResult.publicKey, // Use P2PKH public key as primary
        address: p2pkhResult.address, // Primary address (P2PKH) without protocol prefix
        // Include all address formats for reference
        p2pkhAddress: p2pkhResult.address,
        p2shAddress: p2shResult.address,
        p2wpkhAddress: p2wpkhResult.address,
        p2trAddress: p2trResult.address,
        // Formatted multi-line display for UI with protocol prefixes
        formattedDisplay: formattedDisplay,
        // Include raw addresses without protocol prefixes for backward compatibility
        rawP2PKHAddress: p2pkhResult.address,
        rawP2SHAddress: p2shResult.address,
        rawP2WPKHAddress: p2wpkhResult.address,
        rawP2TRAddress: p2trResult.address
      };

    } catch (error) {
      console.error('[BTC ROUTER] Bitcoin derivation routing error:', error);
      throw new Error(`Bitcoin derivation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  getBlockExplorerLink: (address: string, format?: string): string | null => {
    // Bitcoin uses mempool.space for all address formats
    // Format parameter is ignored since mempool.space handles all Bitcoin address types
    return `https://mempool.space/address/${address}`;
  }
};
