// Currency: Terra Classic (LUNC)
// Source: Cryptocurrency Data
// Research Data Compiled from Multiple Sources

import type { CurrencyData, DerivedInfo } from './currencyData';
import { toHex, fromHex } from './utils';

export const terraClassicData: CurrencyData = {
  basicInfo: {
    name: "Terra Classic",
    symbolTicker: "LUNC",
    description: "The original Terra blockchain's native token, now operating as Terra Classic after the network's collapse and subsequent fork. Previously used for governance and staking on the Terra network.",
    creator: "Terraform Labs",
    debutYear: 2019,
    website: "https://www.terraclassic.community/",
    whitePaper: "https://assets.website-files.com/611153e7af981472d8da199c/618b02d13e938ae1f8ad1e45_Terra_White_paper.pdf",
    primaryNFTMarketplace: "https://randomearth.io/",
    secondaryNFTMarketplace: "https://knowhere.art/",
  },

  technicalInfo: {
    proofingType: "Proof of Stake",
    class: "Layer 1 Blockchain (Cosmos SDK / Legacy Stablecoin Platform)",
    totalSupply: "6,906,000,000,000 LUNC (massively inflated post-collapse)",
    libraryHashing: "SHA-256",
    librarySigning: "ECDSA",
    mnemonicSeedPhraseLengths: "12, 24 words (BIP39)",
    privateKeyFormat: "64-character hexadecimal (32 bytes)",
    privateKeyToPublicKeyCurve: "secp256k1",
    publicKeyToPublicWalletAddressHashing: "SHA-256 + RIPEMD-160 + Bech32 encoding (terra prefix)",
    NPMLibraryHashing: "@noble/hashes/sha2.js",
    NPMLibrarySigning: "@noble/secp256k1",
    keyStoreFormat: "Terra Station JSON Keystore (scrypt + AES-CTR)",
    jsonFormat: "Cosmos SDK JSON (Terra Classic compatible)",
    smartContractLanguage: "CosmWasm (Rust) / Go",
    primaryNPMPackage: "@terra-money/terra.js",
    secondaryNPMPackage: "@cosmjs/stargate",
    tertiaryNPMPackage: "@noble/secp256k1",
    web3ConnectMechanism: "Terra Station Classic / Keplr Wallet",
    nativeWallet: "Terra Station Classic",
    humanReadableAddressingPlatform: "Terra Name Service (TNS) - Legacy",
    humanReadableAddressingNPMPackage: "N/A",
    SendingMechanism: "Cosmos SDK transaction broadcasting",
    NFTMintingMechanism: "CW721 (CosmWasm NFT standard)",
    AssetTokenSupportAndMechanism: "CW20 (CosmWasm token) / USTC (failed stablecoin) / IBC tokens",
    evmChainID: "N/A (Cosmos SDK chain, non-EVM)",
    typicalDerivationPath: "m/44'/330'/0'/0/0 (BIP44 Terra standard)",
    sendingFunctionality: "@terra-money/terra.js LCDClient for Classic chain",
  },

  dex: [
    {
      name: "TerraSwap Classic",
      url: "https://app.terraswap.io/",
      type: "Classic AMM",
      description: "Original Terra DEX, primary exchange on Terra Classic",
    },
    {
      name: "Terraport",
      url: "https://terraport.finance/",
      type: "Cross-Chain Bridge",
      description: "Bridge and DEX connecting Terra Classic to other chains",
    },
    {
      name: "Loop Markets",
      url: "https://www.loop.markets/",
      type: "AMM DEX",
      description: "Community-driven DEX on Terra Classic",
    },
    {
      name: "Astroport Classic",
      url: "https://classic.astroport.fi/",
      type: "Classic AMM",
      description: "Astroport deployment on Terra Classic",
    },
    {
      name: "Phoenix",
      url: "https://terra.phoenix.money/",
      type: "AMM DEX",
      description: "DEX and DeFi protocol on Terra Classic",
    },
    {
      name: "ChangeNOW",
      url: "https://changenow.io/",
      type: "Instant Exchange",
      description: "Non-custodial instant exchange supporting LUNC",
    },
    {
      name: "SideShift.ai",
      url: "https://sideshift.ai/",
      type: "Cross-Chain Exchange",
      description: "Instant cryptocurrency exchange with LUNC support",
    },
  ],

  stakingProviders: [
    {
      name: "Terra Classic Validators",
      url: "https://station.terra.money/classic",
      type: "Native Staking",
      description: "Delegate to Terra Classic validators through Terra Station Classic",
    },
    {
      name: "Binance Staking",
      url: "https://www.binance.com/en/staking",
      type: "Exchange Staking",
      description: "Stake LUNC through Binance with flexible options",
    },
    {
      name: "KuCoin Staking",
      url: "https://www.kucoin.com/earn",
      type: "Exchange Staking",
      description: "Stake LUNC through KuCoin exchange",
    },
    {
      name: "Crypto.com",
      url: "https://crypto.com/earn",
      type: "Exchange Staking",
      description: "Earn rewards on LUNC through Crypto.com",
    },
    {
      name: "Orion.Money (Legacy)",
      url: "https://orion.money/",
      type: "DeFi Staking",
      description: "Legacy DeFi protocol with staking features",
    },
    {
      name: "Terra Classic Community Validators",
      url: "https://station.terrarebels.net/",
      type: "Community Validators",
      description: "Community-run validators supporting Terra Classic revival",
    },
    {
      name: "Lido Classic (Discontinued)",
      url: "https://lido.fi/",
      type: "Legacy Liquid Staking",
      description: "Former liquid staking protocol (bLUNA, now largely inactive)",
    },
  ],

  miningPools: "N/A (Delegated Proof of Stake - No Mining)",

  marketInfo: {
    allTimeHigh: {
      price: 119.18,
      currency: "USD",
      date: "2022-04-05",
    },
  },

  socialMedia: {
    discord: "https://discord.gg/terraclassic",
    instagram: "https://www.instagram.com/terraclassic/",
    linkedin: "https://www.linkedin.com/company/terraform-labs/",
    reddit: "https://www.reddit.com/r/terraluna/",
    slack: "N/A",
    telegram: "https://t.me/terraclassic",
    twitterX: "https://twitter.com/TerraClassic",
  },

  identifiers: {
    UCID: "4172",
    identifierBraveNewCoin: "LUNC",
    identifierCoinAPI: "LUNC",
    identifierCoinCap: "terra-luna",
    identifierCoinGecko: "terra-luna-classic",
    identifierCoinPaprika: "lunc-terra-classic",
  },

  blockExplorer: {
    blockExplorerAPI: "https://api.terrasco.pe/api",
    blockExplorerLink: "https://finder.terra.money/classic/address/"
  },

  rpcEndpoints: [
    {
      name: "PublicNode - MainNet RPC",
      url: "https://terra-classic-rpc.publicnode.com",
      port: 443,
      protocol: "https",
      type: "Tendermint RPC (Public)",
      description: "Public Terra Classic RPC endpoint via PublicNode. Provides Tendermint RPC access for blockchain queries, transaction submission, and event subscriptions. Free access, no API key required.",
      npmPackage: "@cosmjs/tendermint-rpc",
      documentation: "https://www.publicnode.com/",
      network: "mainnet",
      serviceType: "rpc",
    },
    {
      name: "PublicNode - MainNet LCD",
      url: "https://terra-classic-lcd.publicnode.com",
      port: 443,
      protocol: "https",
      type: "REST API / LCD (Public)",
      description: "Public Terra Classic Light Client Daemon (LCD) endpoint via PublicNode. Provides direct blockchain queries via REST, account and transaction data, staking and governance information, network parameters, and supply information. Free access, no API key required.",
      npmPackage: "@terra-money/terra.js",
      documentation: "https://terra-classic-lcd.publicnode.com/swagger/",
      network: "mainnet",
      serviceType: "lcd",
    },
    {
      name: "PublicNode - MainNet FCD",
      url: "https://terra-classic-fcd.publicnode.com",
      port: 443,
      protocol: "https",
      type: "REST API / FCD (Public)",
      description: "Public Terra Classic FCD (FCD) endpoint via PublicNode. Provides Terra Classic specific data including tax information, treasury parameters, and enhanced transaction queries. Free access, no API key required.",
      npmPackage: "@terra-money/terra.js",
      documentation: "https://www.publicnode.com/",
      network: "mainnet",
      serviceType: "fcd",
    },
    {
      name: "Autostake - MainNet RPC",
      url: "https://terraclassic-mainnet-rpc.autostake.com",
      port: 443,
      protocol: "https",
      type: "Tendermint RPC (Public)",
      description: "Free developer access Terra Classic RPC endpoint via Autostake. Provides Tendermint RPC access for blockchain queries, transaction submission, and event subscriptions. Free for development, no API key required.",
      npmPackage: "@cosmjs/tendermint-rpc",
      documentation: "https://docs.autostake.com/",
      network: "mainnet",
      serviceType: "rpc",
    },
    {
      name: "Autostake - MainNet LCD",
      url: "https://terraclassic-mainnet-lcd.autostake.com",
      port: 443,
      protocol: "https",
      type: "REST API / LCD (Public)",
      description: "Free developer access Terra Classic LCD endpoint via Autostake. Provides direct blockchain queries via REST, account and transaction data, staking and governance information, and Terra Classic tax data. Free for development, no API key required.",
      npmPackage: "@terra-money/terra.js",
      documentation: "https://docs.autostake.com/",
      network: "mainnet",
      serviceType: "lcd",
    },
    {
      name: "Autostake - MainNet gRPC",
      url: "terraclassic-mainnet-grpc.autostake.com",
      port: 443,
      protocol: "grpc",
      type: "gRPC (Public)",
      description: "Free developer access Terra Classic gRPC endpoint via Autostake. Provides high-performance gRPC access for blockchain queries and transaction submission. Free for development, no API key required.",
      npmPackage: "@cosmjs/stargate",
      documentation: "https://docs.autostake.com/",
      network: "mainnet",
      serviceType: "grpc",
    },
    {
      name: "NOWNodes - MainNet RPC",
      url: "https://terra-classic.nownodes.io",
      port: 443,
      protocol: "https",
      type: "Tendermint RPC (API Key Required)",
      description: "Full node RPC access for Terra Classic blockchain. Provides Tendermint RPC methods, block, transaction, and account data, staking and governance queries, Terra Classic tax data, and network information. Free tier available. Requires API key.",
      npmPackage: "@cosmjs/tendermint-rpc",
      documentation: "https://nownodes.io/documentation",
      network: "mainnet",
      serviceType: "rpc",
      requiresApiKey: true,
    },
    {
      name: "NOWNodes - MainNet REST",
      url: "https://terra-classic-rest.nownodes.io",
      port: 443,
      protocol: "https",
      type: "REST API / LCD (API Key Required)",
      description: "Full node REST/LCD access for Terra Classic blockchain. Provides Cosmos SDK REST endpoints, account and transaction data, staking and governance queries, Terra Classic tax data, and network information. Free tier available. Requires API key.",
      npmPackage: "@terra-money/terra.js",
      documentation: "https://nownodes.io/documentation",
      network: "mainnet",
      serviceType: "lcd",
      requiresApiKey: true,
    },
    {
      name: "LuncScan - MainNet",
      url: "https://luncscan.com/api",
      port: 443,
      protocol: "https",
      type: "REST API (Public)",
      description: "Dedicated Terra Classic blockchain tracker specifically designed for LUNC. Provides burn tracking and statistics, account and transaction monitoring, governance proposals, historical burn data, and price tracking. Free access with rate limits, no API key required.",
      npmPackage: "axios",
      documentation: "https://luncscan.com/",
      network: "mainnet",
      serviceType: "rest-api",
    },
    {
      name: "ATOMScan Terra Classic - MainNet",
      url: "https://atomscan.com/terra/api",
      port: 443,
      protocol: "https",
      type: "REST API (Public)",
      description: "Dedicated Terra Classic blockchain explorer. Provides Terra Classic (LUNC) specific tracking, account and transaction data, historical data for original Terra chain, validator information, LUNC price tracking, and chain statistics with burn amounts. Free access with rate limits, no API key required.",
      npmPackage: "axios",
      documentation: "https://atomscan.com/terra",
      network: "mainnet",
      serviceType: "rest-api",
    },
    {
      name: "Terra Classic Tools - MainNet",
      url: "https://api.terra-classic.money",
      port: 443,
      protocol: "https",
      type: "REST API (Public)",
      description: "Ecosystem hub for Terra Classic blockchain. Provides live LUNC and USTC price tracking, burn monitoring, USTC re-peg tracking, staking yields and DeFi information, bridges and wallets information, historical price and burn data, and community proposals. Free access, no API key required.",
      npmPackage: "axios",
      documentation: "https://www.terra-classic.money/",
      network: "mainnet",
      serviceType: "rest-api",
    },
    {
      name: "Terrasco.pe - MainNet",
      url: "https://terrasco.pe/api",
      port: 443,
      protocol: "https",
      type: "REST API (Public)",
      description: "Terra Classic focused blockchain explorer (Chainscope). Provides Terra Classic specific data, account, transaction, and block information, historical data and analytics, validator performance metrics with uptime, governance proposals and voting, vesting account information, and redelegations tracking. Free access with rate limits, no API key required.",
      npmPackage: "axios",
      documentation: "https://terrasco.pe/",
      network: "mainnet",
      serviceType: "rest-api",
    },
    {
      name: "Mintscan Classic - MainNet",
      url: "https://api-terra-classic.cosmostation.io",
      port: 443,
      protocol: "https",
      type: "REST API (Public, Optional API Key)",
      description: "Enterprise-grade blockchain data indexing for Terra Classic by Cosmostation. Provides account balance and transaction history, staking information and rewards, validator data, comprehensive Terra Classic support, and high performance and reliability. Free tier: Up to 2 requests/second and 10,000 daily calls without API key.",
      npmPackage: "axios",
      documentation: "https://docs.cosmostation.io/apis",
      network: "mainnet",
      serviceType: "rest-api",
    },
    {
      name: "Bitquery - MainNet",
      url: "https://graphql.bitquery.io",
      port: 443,
      protocol: "https",
      type: "GraphQL API (Public, Optional API Key)",
      description: "GraphQL-based blockchain data API for Terra Classic. Provides GraphQL queries for flexible data retrieval, transaction and address explorer functionality, balance and transaction fee analysis, charts and analytics, token transfers tracking, network statistics, and validator information. Free tier available, API key recommended for higher limits.",
      npmPackage: "graphql-request",
      documentation: "https://docs.bitquery.io/",
      network: "mainnet",
      serviceType: "graphql",
    },
    {
      name: "Legacy FCD - MainNet",
      url: "https://fcd.terra.money",
      port: 443,
      protocol: "https",
      type: "REST API / FCD (Public, Legacy)",
      description: "Legacy Terra Classic FCD (FCD) endpoint. Provides Terra Classic specific data including tax information, treasury parameters, and enhanced transaction queries. Note: This is a legacy endpoint that may be deprecated in favor of PublicNode or other services. Free access, no API key required.",
      npmPackage: "@terra-money/terra.js",
      documentation: "https://docs.terra.money/",
      network: "mainnet",
      serviceType: "fcd",
    },
  ],
  
  deriveFromPrivateKey: async (privateKey: string): Promise<DerivedInfo> => {
    // Import dependencies when needed to avoid loading them if not used
    const { sha256 } = await import('@noble/hashes/sha2.js');
    const { ripemd160 } = await import('@noble/hashes/legacy.js');
    const secp = await import('@noble/secp256k1');
    const bech32 = await import('bech32');

    // Terra Classic uses the "terra" prefix for Bech32 addresses
    const TERRA_BECH32_PREFIX = "terra";

    // Step 1: Parse the private key from hex format
    let privateKeyBytes: Uint8Array;

    try {
      // Handle hex format (with or without 0x prefix)
      privateKeyBytes = fromHex(privateKey);

      if (privateKeyBytes.length !== 32) {
        throw new Error(`Expected 32 bytes, got ${privateKeyBytes.length}`);
      }
    } catch (hexError) {
      throw new Error(`Invalid Terra Classic private key: ${hexError.message}`);
    }

    // Step 2: Derive the public key using secp256k1 elliptic curve
    // Terra Classic uses compressed public keys (33 bytes)
    const publicKeyCompressed = secp.getPublicKey(privateKeyBytes, true);

    // Also derive uncompressed public key for compatibility
    const publicKeyUncompressed = secp.getPublicKey(privateKeyBytes, false);

    // Step 3: Generate Terra Classic address using Bech32 encoding
    // 3.1: Apply SHA-256 hashing to the compressed public key
    const hash1 = sha256(publicKeyCompressed);

    // 3.2: Apply RIPEMD-160 hashing to the result
    const hash2 = ripemd160(hash1);

    // 3.3: Convert the 20-byte hash to 5-bit words for Bech32
    const words = bech32.bech32.toWords(hash2);

    // 3.4: Encode with Bech32 using "terra" prefix
    const address = bech32.bech32.encode(TERRA_BECH32_PREFIX, words);

    // Return both the compressed public key (hex) and the derived address
    return {
      publicKey: toHex(publicKeyCompressed),
      publicKeyUncompressed: toHex(publicKeyUncompressed),
      address
    };
  }
};
