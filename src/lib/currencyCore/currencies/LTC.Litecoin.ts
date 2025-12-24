// Currency: Litecoin (LTC)
// Source: Cryptocurrency Data
// Research Data Compiled from Multiple Sources
// Multi-format address support: P2PKH (Legacy), P2SH (SegWit Compatible), P2WPKH (Native SegWit)

import type { CurrencyData, DerivedInfo } from './currencyData';
import { 
  litecoinP2PKHData, 
  litecoinP2SHData, 
  litecoinP2WPKHData,
  LitecoinAddressFormat 
} from './ext.LTC.Litecoin/router.LTC.Litecoin';

// Re-export Litecoin address format types
export type { LitecoinAddressFormat };

export const litecoinData: CurrencyData = {
  basicInfo: {
    name: "Litecoin",
    symbolTicker: "LTC",
    description: "A peer-to-peer cryptocurrency created by Charlie Lee as a fork of Bitcoin. Designed to provide faster transaction confirmation times and improved storage efficiency.",
    creator: "Charlie Lee",
    debutYear: 2011,
    website: "https://litecoin.org/",
    whitePaper: "https://litecoin.org/litecoin.pdf",
    primaryNFTMarketplace: "N/A",
    secondaryNFTMarketplace: "N/A",
  },

  technicalInfo: {
    proofingType: "Proof of Work",
    class: "Layer 1 Blockchain (Bitcoin Fork)",
    totalSupply: "84,000,000 LTC (4x Bitcoin's supply)",
    libraryHashing: "Scrypt (PoW) / SHA-256 (address hashing)",
    librarySigning: "ECDSA",
    mnemonicSeedPhraseLengths: "12, 24 words (BIP39)",
    privateKeyFormat: "64-character hexadecimal (32 bytes) or WIF (Wallet Import Format)",
    privateKeyToPublicKeyCurve: "secp256k1",
    publicKeyToPublicWalletAddressHashing: "SHA-256 + RIPEMD-160 + Base58Check / Bech32",
    NPMLibraryHashing: "@noble/hashes/sha2.js",
    NPMLibrarySigning: "@noble/secp256k1",
    keyStoreFormat: "Litecoin Core wallet.dat (Berkeley DB) / WIF",
    jsonFormat: "Bitcoin Core compatible JSON-RPC",
    smartContractLanguage: "N/A (Bitcoin Script - limited)",
    primaryNPMPackage: "bitcoinjs-lib",
    secondaryNPMPackage: "@noble/secp256k1",
    tertiaryNPMPackage: "wif",
    web3ConnectMechanism: "Litecoin Core RPC / Electrum-LTC",
    nativeWallet: "Litecoin Core / Electrum-LTC",
    humanReadableAddressingPlatform: "N/A (no native name service)",
    humanReadableAddressingNPMPackage: "N/A",
    SendingMechanism: "Litecoin transaction broadcasting via nodes/RPC",
    NFTMintingMechanism: "N/A (no native NFT support)",
    AssetTokenSupportAndMechanism: "N/A (no native token standard)",
    evmChainID: "N/A (UTXO-based chain)",
    typicalDerivationPath: "m/44'/2'/0'/0/0 (P2PKH), m/49'/2'/0'/0/0 (P2SH-SegWit), m/84'/2'/0'/0/0 (Native SegWit)",
    sendingFunctionality: "bitcoinjs-lib compatible transaction creation and broadcasting",
  },

  dex: [
    {
      name: "SideShift.ai",
      url: "https://sideshift.ai/",
      type: "Cross-Chain Exchange",
      description: "Instant cryptocurrency exchange supporting LTC",
    },
    {
      name: "ChangeNOW",
      url: "https://changenow.io/",
      type: "Instant Exchange",
      description: "Non-custodial instant cryptocurrency exchange",
    },
    {
      name: "SimpleSwap",
      url: "https://simpleswap.io/",
      type: "Instant Exchange",
      description: "Easy cryptocurrency exchange without registration",
    },
    {
      name: "StealthEX",
      url: "https://stealthex.io/",
      type: "Instant Exchange",
      description: "Limitless crypto exchange supporting LTC",
    },
    {
      name: "FixedFloat",
      url: "https://fixedfloat.com/",
      type: "Instant Exchange",
      description: "Lightning-fast cryptocurrency exchange",
    },
    {
      name: "Exolix",
      url: "https://exolix.com/",
      type: "Instant Exchange",
      description: "Non-custodial crypto exchange with no limits",
    },
    {
      name: "LetsExchange",
      url: "https://letsexchange.io/",
      type: "Instant Exchange",
      description: "Fast and secure cryptocurrency exchange",
    },
  ],

  stakingProviders: [
    {
      name: "N/A - Proof of Work",
      url: "https://litecoin.org/",
      type: "Mining",
      description: "Litecoin uses Scrypt Proof of Work consensus. See mining pools for participation.",
    },
  ],

  miningPools: [
    {
      name: "Litecoinpool.org",
      url: "https://www.litecoinpool.org/",
      type: "Merged Mining Pool",
      description: "Oldest and most trusted LTC pool with merged mining (LTC + DOGE)",
    },
    {
      name: "F2Pool",
      url: "https://www.f2pool.com/",
      type: "Mining Pool",
      description: "Large multi-currency mining pool with LTC support",
    },
    {
      name: "ViaBTC",
      url: "https://www.viabtc.com/",
      type: "Mining Pool",
      description: "Multi-currency mining pool including Litecoin",
    },
    {
      name: "Prohashing",
      url: "https://prohashing.com/",
      type: "Multi-Algo Pool",
      description: "Multi-algorithm mining pool supporting Scrypt (LTC)",
    },
    {
      name: "Poolin",
      url: "https://www.poolin.com/",
      type: "Mining Pool",
      description: "Multi-currency mining pool with Litecoin support",
    },
    {
      name: "AntPool",
      url: "https://www.antpool.com/",
      type: "Mining Pool",
      description: "Major mining pool operated by Bitmain with LTC support",
    },
    {
      name: "Multipool",
      url: "https://www.multipool.us/",
      type: "Multi-Coin Pool",
      description: "Mining pool supporting multiple Scrypt coins including LTC",
    },
  ],

  marketInfo: {
    allTimeHigh: {
      price: 410.26,
      currency: "USD",
      date: "2021-05-10",
    },
  },

  socialMedia: {
    discord: "https://discord.gg/litecoin",
    instagram: "https://www.instagram.com/litecoin/",
    linkedin: "https://www.linkedin.com/company/litecoin-foundation/",
    reddit: "https://www.reddit.com/r/litecoin/",
    slack: "N/A",
    telegram: "https://t.me/litecoin",
    twitterX: "https://twitter.com/LitecoinProject",
  },

  identifiers: {
    UCID: "2",
    identifierBraveNewCoin: "LTC",
    identifierCoinAPI: "LTC",
    identifierCoinCap: "litecoin",
    identifierCoinGecko: "litecoin",
    identifierCoinPaprika: "ltc-litecoin",
  },

  blockExplorer: {
    blockExplorerAPI: "https://api.blockcypher.com/v1/ltc/main",
    blockExplorerLink: "https://blockchair.com/litecoin/address/",
  },

  rpcEndpoints: [
    {
      name: "Blockchair - MainNet",
      url: "https://api.blockchair.com/litecoin",
      port: 443,
      protocol: "https",
      type: "REST API (Public, Optional API Key)",
      description: "Comprehensive blockchain analytics platform. Provides address information with UTXOs, transaction history, network statistics, transaction broadcasting, and USD value tracking. Free tier: 1,000 requests/day (no API key), higher limits with key.",
      npmPackage: "bitcoinjs-lib",
      documentation: "https://blockchair.com/api/docs",
      network: "mainnet",
      serviceType: "rest",
    },
    {
      name: "BlockCypher - MainNet",
      url: "https://api.blockcypher.com/v1/ltc/main",
      port: 443,
      protocol: "https",
      type: "REST API (Public, Optional API Key)",
      description: "Fast blockchain API with webhooks support. Provides address and UTXO queries, transaction details, fee estimates, chain statistics, and transaction broadcasting. Free tier: 3 requests/second, 200 requests/hour (no API key), higher limits with key.",
      npmPackage: "bitcoinjs-lib",
      documentation: "https://www.blockcypher.com/dev/litecoin/",
      network: "mainnet",
      serviceType: "rest",
    },
    {
      name: "SoChain - MainNet",
      url: "https://chain.so/api/v2",
      port: 443,
      protocol: "https",
      type: "REST API (Public)",
      description: "Fast and reliable blockchain API. Provides balance and address queries, UTXO fetching, transaction details, transaction broadcasting, address validation, and network information. Free API access, no API key required.",
      npmPackage: "bitcoinjs-lib",
      documentation: "https://chain.so/api",
      network: "mainnet",
      serviceType: "rest",
    },
    {
      name: "GetBlock - MainNet",
      url: "https://ltc.getblock.io",
      port: 443,
      protocol: "https",
      type: "Bitcoin Core RPC (API Key Required)",
      description: "Instant access to Litecoin RPC nodes. Provides standard Bitcoin RPC methods, block and transaction queries, fee estimation, transaction broadcasting, and blockchain information. Free tier available. Requires API key.",
      npmPackage: "bitcoinjs-lib",
      documentation: "https://getblock.io/docs/",
      network: "mainnet",
      serviceType: "rpc",
      requiresApiKey: true,
    },
  ],

  deriveFromPrivateKey: async (privateKey: string, format?: LitecoinAddressFormat): Promise<DerivedInfo> => {
    try {
      console.log('🔧 [LTC ROUTER] Routing Litecoin address derivation...');

      // If a specific format is requested, use single format mode
      if (format) {
        console.log(`📦 [LTC ROUTER] Using single format: ${format}`);

        switch (format) {
          case 'P2PKH':
            console.log('🔄 [LTC ROUTER] Routing to P2PKH (Legacy) module');
            return await litecoinP2PKHData.deriveFromPrivateKey(privateKey);

          case 'P2SH':
            console.log('🔄 [LTC ROUTER] Routing to P2SH (SegWit Compatible) module');
            return await litecoinP2SHData.deriveFromPrivateKey(privateKey);

          case 'P2WPKH':
            console.log('🔄 [LTC ROUTER] Routing to P2WPKH (Native SegWit) module');
            return await litecoinP2WPKHData.deriveFromPrivateKey(privateKey);

          default:
            throw new Error(`Unsupported Litecoin address format: ${format}`);
        }
      }

      // Multi-format mode: Generate all three address formats
      console.log('🔄 [LTC ROUTER] Generating all Litecoin address formats...');

      const [p2pkhResult, p2shResult, p2wpkhResult] = await Promise.all([
        litecoinP2PKHData.deriveFromPrivateKey(privateKey),
        litecoinP2SHData.deriveFromPrivateKey(privateKey),
        litecoinP2WPKHData.deriveFromPrivateKey(privateKey)
      ]);

      console.log('✅ [LTC ROUTER] All Litecoin address formats generated:');
      console.log(`📍 [LTC ROUTER] P2PKH: ${p2pkhResult.address}`);
      console.log(`📍 [LTC ROUTER] P2SH: ${p2shResult.address}`);
      console.log(`📍 [LTC ROUTER] P2WPKH: ${p2wpkhResult.address}`);

      // Create formatted multi-line display with protocol prefixes for UI
      const formattedDisplay = `P2PKH://${p2pkhResult.address}\nP2SH://${p2shResult.address}\nP2WPKH://${p2wpkhResult.address}`;

      // Return the P2PKH address as the primary address (most compatible)
      return {
        publicKey: p2pkhResult.publicKey, // Use P2PKH public key as primary
        address: p2pkhResult.address, // Primary address (P2PKH) without protocol prefix
        // Include all address formats for reference
        p2pkhAddress: p2pkhResult.address,
        p2shAddress: p2shResult.address,
        p2wpkhAddress: p2wpkhResult.address,
        // Formatted multi-line display for UI with protocol prefixes
        formattedDisplay: formattedDisplay,
        // Include raw addresses without protocol prefixes for backward compatibility
        rawP2PKHAddress: p2pkhResult.address,
        rawP2SHAddress: p2shResult.address,
        rawP2WPKHAddress: p2wpkhResult.address
      };

    } catch (error) {
      console.error('[LTC ROUTER] Litecoin derivation routing error:', error);
      throw new Error(`Litecoin derivation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  getBlockExplorerLink: (address: string, format?: string): string | null => {
    // Litecoin uses Blockchair for all address formats
    // Format parameter is ignored since Blockchair handles all Litecoin address types
    return `https://blockchair.com/litecoin/address/${address}`;
  }
};
