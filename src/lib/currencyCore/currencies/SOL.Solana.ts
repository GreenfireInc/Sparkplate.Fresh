// Currency: Solana (SOL)
// Source: Cryptocurrency Data
// Research Data Compiled from Multiple Sources

import type { CurrencyData, DerivedInfo } from './currencyData';
import { toHex, fromHex } from './utils';

export const solanaData: CurrencyData = {
  basicInfo: {
    name: "Solana",
    symbolTicker: "SOL",
    description: "A high-performance blockchain platform designed to host decentralized, scalable applications. Solana achieves high throughput through a unique proof-of-history consensus mechanism.",
    creator: "Anatoly Yakovenko",
    debutYear: 2020,
    website: "https://solana.com/",
    whitePaper: "https://solana.com/solana-whitepaper.pdf",
    primaryNFTMarketplace: "https://magiceden.io/",
    secondaryNFTMarketplace: "https://tensor.trade/",
  },

  technicalInfo: {
    proofingType: "Proof of Stake",
    class: "Layer 1 Blockchain (High-Performance / Proof of History)",
    totalSupply: "533,000,000 SOL (inflationary with decreasing rate)",
    libraryHashing: "SHA-256",
    librarySigning: "Ed25519",
    mnemonicSeedPhraseLengths: "12, 24 words (BIP39)",
    privateKeyFormat: "32-byte Ed25519 seed (Base58, hex, or JSON array)",
    privateKeyToPublicKeyCurve: "Ed25519",
    publicKeyToPublicWalletAddressHashing: "Base58 encoding (public key is the address)",
    NPMLibraryHashing: "@noble/hashes/sha256",
    NPMLibrarySigning: "@noble/ed25519",
    keyStoreFormat: "Solana JSON array format (64-byte keypair)",
    jsonFormat: "Solana Program Library (SPL) JSON",
    smartContractLanguage: "Rust / C / C++ (compiled to BPF bytecode)",
    primaryNPMPackage: "@solana/web3.js",
    secondaryNPMPackage: "@noble/ed25519",
    tertiaryNPMPackage: "bs58",
    web3ConnectMechanism: "Wallet Adapter (Phantom / Solflare / Backpack)",
    nativeWallet: "Phantom / Solflare",
    humanReadableAddressingPlatform: "SNS (Solana Name Service) / .sol domains",
    humanReadableAddressingNPMPackage: "@bonfida/spl-name-service",
    SendingMechanism: "Solana RPC transaction broadcasting",
    NFTMintingMechanism: "Metaplex / Candy Machine / SPL Token standard",
    AssetTokenSupportAndMechanism: "SPL Tokens (Solana Program Library)",
    evmChainID: "N/A (Solana VM, non-EVM)",
    typicalDerivationPath: "m/44'/501'/0'/0' (BIP44 Solana standard)",
    sendingFunctionality: "@solana/web3.js Transaction with sendAndConfirmTransaction() or sendTransaction()",
  },

  dex: [
    {
      name: "Jupiter",
      url: "https://jup.ag/",
      type: "DEX Aggregator",
      description: "Leading DEX aggregator on Solana with best price routing across all liquidity sources",
    },
    {
      name: "Raydium",
      url: "https://raydium.io/",
      type: "AMM DEX",
      description: "First AMM on Solana providing liquidity to OpenBook's central limit order book",
    },
    {
      name: "Orca",
      url: "https://www.orca.so/",
      type: "AMM DEX",
      description: "User-friendly DEX with concentrated liquidity (Whirlpools)",
    },
    {
      name: "Phoenix",
      url: "https://phoenix.trade/",
      type: "CLOB DEX",
      description: "Central limit order book DEX built on Solana",
    },
    {
      name: "Meteora",
      url: "https://app.meteora.ag/",
      type: "Dynamic Liquidity",
      description: "Advanced liquidity protocol with dynamic pools and vaults",
    },
    {
      name: "Lifinity",
      url: "https://lifinity.io/",
      type: "Proactive Market Maker",
      description: "DEX with concentrated liquidity and oracle-based pricing",
    },
    {
      name: "Drift Protocol",
      url: "https://www.drift.trade/",
      type: "Perpetuals & Spot DEX",
      description: "Decentralized exchange with perpetual futures and spot trading",
    },
  ],

  stakingProviders: [
    {
      name: "Native Solana Staking",
      url: "https://solana.com/staking",
      type: "Native Staking",
      description: "Stake directly to 3,000+ validators through Solana wallets (Phantom, Solflare)",
    },
    {
      name: "Jito",
      url: "https://www.jito.network/",
      type: "Liquid Staking",
      description: "Liquid staking with MEV rewards (JitoSOL)",
    },
    {
      name: "Marinade Finance",
      url: "https://marinade.finance/",
      type: "Liquid Staking",
      description: "Largest liquid staking protocol on Solana (mSOL)",
    },
    {
      name: "Lido",
      url: "https://lido.fi/",
      type: "Liquid Staking",
      description: "Multi-chain liquid staking including Solana (stSOL)",
    },
    {
      name: "BlazeStake",
      url: "https://stake.solblaze.org/",
      type: "Liquid Staking",
      description: "Performance-focused liquid staking (bSOL)",
    },
    {
      name: "Binance Staking",
      url: "https://www.binance.com/en/staking",
      type: "Exchange Staking",
      description: "Stake SOL through Binance with flexible and locked options",
    },
    {
      name: "Coinbase Staking",
      url: "https://www.coinbase.com/earn/staking/solana",
      type: "Exchange Staking",
      description: "Stake SOL through Coinbase",
    },
  ],

  miningPools: "N/A (Proof of Stake + Proof of History - No Mining)",

  marketInfo: {
    allTimeHigh: {
      price: 293.31,
      currency: "USD",
      date: "2025-01-19",
    },
  },

  socialMedia: {
    discord: "https://discord.gg/solana",
    instagram: "https://www.instagram.com/solana/",
    linkedin: "https://www.linkedin.com/company/solana-labs/",
    reddit: "https://www.reddit.com/r/solana/",
    slack: "N/A",
    telegram: "https://t.me/solana",
    twitterX: "https://twitter.com/solana",
  },

  identifiers: {
    UCID: "5426",
    identifierBraveNewCoin: "SOL",
    identifierCoinAPI: "SOL",
    identifierCoinCap: "solana",
    identifierCoinGecko: "solana",
    identifierCoinPaprika: "sol-solana",
  },

  blockExplorer: {
    blockExplorerAPI: "https://api.solscan.io/",
    blockExplorerLink: "https://solscan.io/account/",
  },

  rpcEndpoints: [
    {
      name: "Solana Foundation - MainNet Beta",
      url: "https://api.mainnet-beta.solana.com",
      port: 443,
      protocol: "https",
      type: "JSON-RPC (Public)",
      description: "Official Solana Foundation mainnet RPC endpoint. Provides native Solana JSON-RPC methods for account queries, transaction submission, block data, token operations, and program interactions. Free access with rate limits, no API key required.",
      npmPackage: "@solana/web3.js",
      documentation: "https://docs.solana.com/api/http",
      network: "mainnet-beta",
      serviceType: "rpc",
    },
    {
      name: "Solana Foundation - DevNet",
      url: "https://api.devnet.solana.com",
      port: 443,
      protocol: "https",
      type: "JSON-RPC (Public)",
      description: "Official Solana Foundation devnet RPC endpoint for development and testing. Provides native Solana JSON-RPC methods with free SOL airdrops via CLI. Free access, no API key required.",
      npmPackage: "@solana/web3.js",
      documentation: "https://docs.solana.com/api/http",
      network: "devnet",
      serviceType: "rpc",
    },
    {
      name: "Solana Foundation - TestNet",
      url: "https://api.testnet.solana.com",
      port: 443,
      protocol: "https",
      type: "JSON-RPC (Public)",
      description: "Official Solana Foundation testnet RPC endpoint for public testing. Provides native Solana JSON-RPC methods for testing applications. Free access, no API key required.",
      npmPackage: "@solana/web3.js",
      documentation: "https://docs.solana.com/api/http",
      network: "testnet",
      serviceType: "rpc",
    },
    {
      name: "Helius - MainNet (Public)",
      url: "https://mainnet.helius-rpc.com",
      port: 443,
      protocol: "https",
      type: "JSON-RPC (Public)",
      description: "Public Helius RPC endpoint with better rate limits than official endpoints. Provides enhanced Solana RPC methods, transaction parsing, and improved reliability. Free access with public API key, no registration required.",
      npmPackage: "@solana/web3.js",
      documentation: "https://docs.helius.dev/",
      network: "mainnet-beta",
      serviceType: "rpc",
    },
    {
      name: "Helius - MainNet (Enterprise)",
      url: "https://mainnet-beta.helius-rpc.com",
      port: 443,
      protocol: "https",
      type: "JSON-RPC (API Key Required)",
      description: "Enterprise-grade Helius RPC endpoint with enhanced features. Provides enhanced RPC methods, transaction parsing and enrichment, NFT APIs, DAS (Digital Asset Standard) API, compressed NFT support, WebSocket support, and webhook notifications. Generous free tier available. Requires API key.",
      npmPackage: "@solana/web3.js",
      documentation: "https://docs.helius.dev/",
      network: "mainnet-beta",
      serviceType: "rpc",
      requiresApiKey: true,
    },
    {
      name: "Helius - API",
      url: "https://api.helius.xyz/v0",
      port: 443,
      protocol: "https",
      type: "REST API (API Key Required)",
      description: "Helius REST API for enhanced Solana data. Provides token metadata and balances, comprehensive NFT APIs, transaction parsing and enrichment, DAS API, compressed NFT support, and webhook notifications. Generous free tier available. Requires API key.",
      npmPackage: "axios",
      documentation: "https://docs.helius.dev/",
      network: "mainnet-beta",
      serviceType: "rest-api",
      requiresApiKey: true,
    },
    {
      name: "Ankr - MainNet",
      url: "https://rpc.ankr.com/solana",
      port: 443,
      protocol: "https",
      type: "JSON-RPC (Public)",
      description: "Public Ankr RPC endpoint for Solana. Provides standard Solana JSON-RPC methods with improved reliability and performance. Free access, no API key required.",
      npmPackage: "@solana/web3.js",
      documentation: "https://www.ankr.com/rpc/",
      network: "mainnet-beta",
      serviceType: "rpc",
    },
    {
      name: "Extrnode - MainNet",
      url: "https://solana-mainnet.rpc.extrnode.com",
      port: 443,
      protocol: "https",
      type: "JSON-RPC (Public)",
      description: "Public Extrnode RPC endpoint for Solana. Provides standard Solana JSON-RPC methods with CORS support and better rate limits. Free access, no API key required.",
      npmPackage: "@solana/web3.js",
      documentation: "https://extrnode.com/",
      network: "mainnet-beta",
      serviceType: "rpc",
    },
    {
      name: "Public RPC Aggregator - MainNet",
      url: "https://solana.public-rpc.com",
      port: 443,
      protocol: "https",
      type: "JSON-RPC (Public)",
      description: "Public RPC aggregator for Solana. Provides standard Solana JSON-RPC methods with load balancing across multiple nodes. Free access, no API key required.",
      npmPackage: "@solana/web3.js",
      documentation: "https://public-rpc.com/",
      network: "mainnet-beta",
      serviceType: "rpc",
    },
    {
      name: "SolanaFM - MainNet",
      url: "https://api.solana.fm/v1",
      port: 443,
      protocol: "https",
      type: "REST API (Public, Optional API Key)",
      description: "Next-generation block explorer with real-time insights. Provides real-time transaction insights, network statistics, wallet tracking, token analytics with price data, NFT metadata, and program data. Free tier: 10 RPS, 1 GB bandwidth, endpoint-specific rate caps. API key recommended for higher limits.",
      npmPackage: "axios",
      documentation: "https://docs.solana.fm/",
      network: "mainnet-beta",
      serviceType: "rest-api",
    },
    {
      name: "Solscan - MainNet",
      url: "https://public-api.solscan.io",
      port: 443,
      protocol: "https",
      type: "REST API (Public, Optional API Key)",
      description: "Comprehensive block explorer with real-time data tracking. Provides transaction monitoring, SOL and SPL token tracking, account analytics, block explorer, market data integration, DeFi analytics, and NFT collections and activities. Free access with rate limits. API key recommended for higher limits.",
      npmPackage: "axios",
      documentation: "https://solscan.io/apis",
      network: "mainnet-beta",
      serviceType: "rest-api",
    },
    {
      name: "Solana Beach - MainNet",
      url: "https://api.solanabeach.io/v1",
      port: 443,
      protocol: "https",
      type: "REST API (Public, Optional API Key)",
      description: "User-friendly explorer with staking and validator information. Provides block explorer, comprehensive staking information, validator statistics and rankings, epoch data and history, network analytics, stake account tracking, and TPS history. Free access with rate limits. API key recommended for higher limits.",
      npmPackage: "axios",
      documentation: "https://solanabeach.io/api",
      network: "mainnet-beta",
      serviceType: "rest-api",
    },
  ],
  
  deriveFromPrivateKey: async (privateKey: string): Promise<DerivedInfo> => {
    // Import dependencies when needed to avoid loading them if not used
    const bs58 = await import('bs58');
    const solanaWeb3 = await import('@solana/web3.js');
    const { sha512 } = await import('@noble/hashes/sha512');
    
    // Import and configure noble/ed25519 with required hash function
    const ed25519Module = await import('@noble/ed25519');
    
    // Set the required SHA-512 implementation for noble/ed25519
    ed25519Module.etc.sha512Sync = (...m) => sha512(ed25519Module.etc.concatBytes(...m));

    // Solana uses Ed25519 keys - private key should be 32 bytes
    const SOLANA_PRIVATE_KEY_LENGTH = 32;

    let secretKey: Uint8Array;
    const trimmed = privateKey.trim();

    try {
      // Step 1: Parse the private key from various formats

      // Try JSON array format first (Solana often exports as array of numbers)
      if (trimmed.startsWith("[")) {
        try {
          const arr = JSON.parse(trimmed) as number[];
          if (arr.length === SOLANA_PRIVATE_KEY_LENGTH) {
            secretKey = new Uint8Array(arr);
          } else if (arr.length === 64) {
            // Full keypair array - take first 32 bytes (private key)
            secretKey = new Uint8Array(arr.slice(0, SOLANA_PRIVATE_KEY_LENGTH));
          } else {
            throw new Error(`Invalid JSON array length: ${arr.length}. Expected 32 or 64.`);
          }
        } catch (jsonError) {
          throw new Error(`Invalid JSON format: ${jsonError.message}`);
        }
      }
      // Try base58 format (most common for Solana addresses/keys)
      else {
        try {
          secretKey = bs58.default.decode(trimmed);

          // If we got a full keypair (64 bytes), take just the private key (first 32 bytes)
          if (secretKey.length === 64) {
            secretKey = secretKey.slice(0, SOLANA_PRIVATE_KEY_LENGTH);
          } else if (secretKey.length !== SOLANA_PRIVATE_KEY_LENGTH) {
            throw new Error(`Invalid base58 key length: ${secretKey.length}. Expected 32 or 64.`);
          }
        } catch (base58Error) {
          // If base58 fails, try hex format
          try {
            secretKey = fromHex(trimmed);

            if (secretKey.length === 64) {
              // Full keypair - take first 32 bytes (private key)
              secretKey = secretKey.slice(0, SOLANA_PRIVATE_KEY_LENGTH);
            } else if (secretKey.length !== SOLANA_PRIVATE_KEY_LENGTH) {
              throw new Error(`Invalid hex key length: ${secretKey.length}. Expected 32 or 64.`);
            }
          } catch (hexError) {
            throw new Error(`Unable to parse private key. Tried JSON, base58, and hex formats.`);
          }
        }
      }

      // Step 2: Validate the secret key size
      if (secretKey.length !== SOLANA_PRIVATE_KEY_LENGTH) {
        throw new Error(`Invalid secret key size: ${secretKey.length} bytes. Solana requires 32 bytes.`);
      }

      // Step 3: Derive public key using noble/ed25519 (more reliable than Solana Web3.js)
      const publicKeyUint8 = await ed25519Module.getPublicKey(secretKey);

      // Step 4: Create Solana PublicKey object and encode to Base58
      const publicKey = new solanaWeb3.PublicKey(publicKeyUint8);
      const publicKeyBase58 = publicKey.toBase58();

      return {
        publicKey: publicKeyBase58,
        publicKeyUncompressed: publicKeyBase58, // Same as compressed in Solana
        address: publicKeyBase58
      };

    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to derive Solana address: ${error.message}`);
      }
      throw new Error('Failed to derive Solana address: Unknown error');
    }
  }
};
