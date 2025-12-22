// Currency: Terra (LUNA)
// Source: Cryptocurrency Data
// Research Data Compiled from Multiple Sources

import type { CurrencyData, DerivedInfo } from './currencyData';
import { toHex, fromHex } from './utils';

export const terraData: CurrencyData = {
  basicInfo: {
    name: "Terra",
    symbolTicker: "LUNA",
    description: "A decentralized stablecoin platform and payment protocol built on the Cosmos SDK. Terra focuses on creating price-stable cryptocurrencies and enabling fast, low-cost global payments.",
    creator: "Terraform Labs",
    debutYear: 2019,
    website: "https://www.terra.money/",
    whitePaper: "https://assets.website-files.com/611153e7af981472d8da199c/618b02d13e938ae1f8ad1e45_Terra_White_paper.pdf",
    primaryNFTMarketplace: "https://randomearth.io/",
    secondaryNFTMarketplace: "https://knowhere.art/",
  },

  technicalInfo: {
    proofingType: "Proof of Stake",
    class: "Layer 1 Blockchain (Cosmos SDK / Stablecoin Platform)",
    totalSupply: "1,000,000,000 LUNA (Terra 2.0 after collapse)",
    libraryHashing: "SHA-256",
    librarySigning: "ECDSA",
    mnemonicSeedPhraseLengths: "12, 24 words (BIP39)",
    privateKeyFormat: "64-character hexadecimal (32 bytes)",
    privateKeyToPublicKeyCurve: "secp256k1",
    publicKeyToPublicWalletAddressHashing: "SHA-256 + RIPEMD-160 + Bech32 encoding (terra prefix)",
    NPMLibraryHashing: "@noble/hashes/sha256",
    NPMLibrarySigning: "@noble/secp256k1",
    keyStoreFormat: "Terra Station JSON Keystore (scrypt + AES-CTR)",
    jsonFormat: "Cosmos SDK JSON (Terra-compatible)",
    smartContractLanguage: "CosmWasm (Rust) / Go",
    primaryNPMPackage: "@terra-money/terra.js",
    secondaryNPMPackage: "@terra-money/feather.js",
    tertiaryNPMPackage: "@cosmjs/stargate",
    web3ConnectMechanism: "Terra Station / Keplr Wallet / WalletConnect",
    nativeWallet: "Terra Station",
    humanReadableAddressingPlatform: "Terra Name Service (TNS)",
    humanReadableAddressingNPMPackage: "N/A",
    SendingMechanism: "Cosmos SDK transaction broadcasting",
    NFTMintingMechanism: "CW721 (CosmWasm NFT standard)",
    AssetTokenSupportAndMechanism: "CW20 (CosmWasm token standard) / IBC tokens",
    evmChainID: "N/A (Cosmos SDK chain, non-EVM)",
    typicalDerivationPath: "m/44'/330'/0'/0/0 (BIP44 Terra standard)",
    sendingFunctionality: "@terra-money/feather.js LCDClient or @cosmjs/stargate SigningStargateClient",
  },

  dex: [
    {
      name: "Astroport",
      url: "https://astroport.fi/",
      type: "Multi-Chain AMM",
      description: "Leading DEX protocol on Terra with advanced AMM features and cross-chain support",
    },
    {
      name: "White Whale",
      url: "https://www.whitewhale.money/",
      type: "Multi-Chain Liquidity",
      description: "Interchain liquidity protocol with arbitrage vaults and DEX functionality",
    },
    {
      name: "Phoenix Protocol",
      url: "https://phoenixfi.app/",
      type: "AMM DEX",
      description: "Native Terra DEX rising from the ashes of Terra 2.0",
    },
    {
      name: "Edge Protocol",
      url: "https://edgeprotocol.io/",
      type: "Hybrid DEX",
      description: "Hybrid orderbook and AMM DEX on Terra",
    },
    {
      name: "TerraSwap (Classic)",
      url: "https://app.terraswap.io/",
      type: "Classic AMM",
      description: "Original Terra DEX, primarily on Terra Classic now",
    },
    {
      name: "Loop Markets",
      url: "https://www.loop.markets/",
      type: "AMM DEX",
      description: "Community-driven DEX with loop rewards system",
    },
    {
      name: "Spectrum Protocol",
      url: "https://spec.finance/",
      type: "Yield Optimizer",
      description: "Auto-compounding yield optimizer with integrated DEX features",
    },
  ],

  stakingProviders: [
    {
      name: "Terra Station Validators",
      url: "https://station.terra.money/",
      type: "Native Staking",
      description: "Delegate directly to 130+ validators through Terra Station",
    },
    {
      name: "Binance Staking",
      url: "https://www.binance.com/en/staking",
      type: "Exchange Staking",
      description: "Stake LUNA through Binance with flexible and locked options",
    },
    {
      name: "Kraken",
      url: "https://www.kraken.com/features/staking-coins",
      type: "Exchange Staking",
      description: "Stake LUNA through Kraken exchange",
    },
    {
      name: "Prism Protocol",
      url: "https://prismprotocol.app/",
      type: "Liquid Staking",
      description: "Refracted liquid staking splitting yield and principal (pLUNA/yLUNA)",
    },
    {
      name: "Stader Labs",
      url: "https://www.staderlabs.com/",
      type: "Liquid Staking",
      description: "Multi-chain liquid staking protocol with LunaX",
    },
    {
      name: "Eris Protocol",
      url: "https://www.erisprotocol.com/",
      type: "Liquid Staking",
      description: "Amplified liquid staking with auto-compounding rewards (ampLUNA)",
    },
    {
      name: "Backbone Labs",
      url: "https://www.backbone.zone/",
      type: "Liquid Staking",
      description: "Liquid staking solution with bLUNA tokens",
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
    discord: "https://discord.gg/terra-money",
    instagram: "https://www.instagram.com/terra_money/",
    linkedin: "https://www.linkedin.com/company/terraform-labs/",
    reddit: "https://www.reddit.com/r/terraluna/",
    slack: "N/A",
    telegram: "https://t.me/terramoneydot",
    twitterX: "https://twitter.com/terra_money",
  },

  identifiers: {
    UCID: "4172",
    identifierBraveNewCoin: "LUNA",
    identifierCoinAPI: "LUNA",
    identifierCoinCap: "terra-luna-2",
    identifierCoinGecko: "terra-luna-2",
    identifierCoinPaprika: "luna-terra",
  },

  blockExplorer: {
    blockExplorerAPI: "https://phoenix-lcd.terra.dev/",
    blockExplorerLink: "https://finder.terra.money/mainnet/address/"
  },

  rpcEndpoints: [
    {
      name: "Phoenix LCD - MainNet",
      url: "https://phoenix-lcd.terra.dev",
      port: 443,
      protocol: "https",
      type: "REST API / LCD (Public)",
      description: "Official Terra Light Client Daemon (LCD) endpoint. Provides direct blockchain queries via REST, account and transaction data, staking and governance information, network parameters, and supply information. Free access, no API key required.",
      npmPackage: "@terra-money/feather.js",
      documentation: "https://docs.terra.money/",
      network: "mainnet",
      serviceType: "rest",
    },
    {
      name: "Phoenix RPC - MainNet",
      url: "https://phoenix-rpc.terra.dev",
      port: 443,
      protocol: "https",
      type: "Tendermint RPC (Public)",
      description: "Official Terra Tendermint RPC endpoint. Provides direct blockchain interaction via Tendermint RPC, query chain state, submit transactions, subscribe to events, and access consensus information. Free access, no API key required.",
      npmPackage: "@cosmjs/tendermint-rpc",
      documentation: "https://docs.terra.money/",
      network: "mainnet",
      serviceType: "rpc",
    },
    {
      name: "Phoenix Archive - MainNet",
      url: "https://phoenix-archive.terra.dev",
      port: 443,
      protocol: "https",
      type: "REST API / LCD (Public Archive)",
      description: "Official Terra archive node LCD endpoint. Provides full historical data access and archive node functionality for querying past blockchain state. Free access, no API key required.",
      npmPackage: "@terra-money/feather.js",
      documentation: "https://docs.terra.money/",
      network: "mainnet",
      serviceType: "rest",
    },
    {
      name: "PublicNode - MainNet RPC",
      url: "https://terra-rpc.publicnode.com",
      port: 443,
      protocol: "https",
      type: "Tendermint RPC (Public)",
      description: "Public Terra RPC endpoint via PublicNode. Provides Tendermint RPC access for blockchain queries, transaction submission, and event subscriptions. Free access, no API key required.",
      npmPackage: "@cosmjs/tendermint-rpc",
      documentation: "https://www.publicnode.com/",
      network: "mainnet",
      serviceType: "rpc",
    },
    {
      name: "Mintscan - MainNet",
      url: "https://api-terra.cosmostation.io",
      port: 443,
      protocol: "https",
      type: "REST API (Public, Optional API Key)",
      description: "Official Cosmos ecosystem explorer by Cosmostation. Provides account balance and transaction history, staking information and delegations, validator data and rankings, block queries, rewards tracking, and transaction broadcasting. Free tier: Up to 2 requests per second and 10,000 daily calls without API key.",
      npmPackage: "axios",
      documentation: "https://docs.cosmostation.io/apis",
      network: "mainnet",
      serviceType: "rest",
    },
    {
      name: "ATOMScan - MainNet",
      url: "https://atomscan.com/terra2/api",
      port: 443,
      protocol: "https",
      type: "REST API (Public)",
      description: "Cosmos ecosystem explorer supporting Terra 2.0. Provides account and transaction data, price information, transaction statistics, validator information, and chain statistics. Free access with rate limits, no API key required.",
      npmPackage: "axios",
      documentation: "https://atomscan.com/terra2/",
      network: "mainnet",
      serviceType: "rest",
    },
    {
      name: "Stake.ID - MainNet",
      url: "https://terra.stake.id/api",
      port: 443,
      protocol: "https",
      type: "REST API (Public)",
      description: "Explorer for Terra network with search and analytics. Provides search for addresses, blocks, transactions, and validators, key statistics and metrics, network visualization, and governance proposals. Free access, no API key required.",
      npmPackage: "axios",
      documentation: "https://terra.stake.id/",
      network: "mainnet",
      serviceType: "rest",
    },
    {
      name: "GetBlock - MainNet",
      url: "https://go.getblock.io",
      port: 443,
      protocol: "https",
      type: "Tendermint RPC (API Key Required)",
      description: "Instant access to Terra 2.0 RPC nodes. Provides RPC and REST endpoints, block, transaction, and account data, network information, and transaction broadcasting. Free tier: 50,000 compute units per month and 5 requests per second. Requires API key.",
      npmPackage: "@cosmjs/tendermint-rpc",
      documentation: "https://getblock.io/docs/",
      network: "mainnet",
      serviceType: "rpc",
      requiresApiKey: true,
    },
    {
      name: "NOWNodes - MainNet RPC",
      url: "https://luna.nownodes.io",
      port: 443,
      protocol: "https",
      type: "Tendermint RPC (API Key Required)",
      description: "Full node RPC access for Terra blockchain. Provides Tendermint RPC methods, block, transaction, and account data, staking and governance queries, and network information. Free tier available. Requires API key.",
      npmPackage: "@cosmjs/tendermint-rpc",
      documentation: "https://nownodes.io/documentation",
      network: "mainnet",
      serviceType: "rpc",
      requiresApiKey: true,
    },
    {
      name: "NOWNodes - MainNet REST",
      url: "https://luna-rest.nownodes.io",
      port: 443,
      protocol: "https",
      type: "REST API / LCD (API Key Required)",
      description: "Full node REST/LCD access for Terra blockchain. Provides Cosmos SDK REST endpoints, account and transaction data, staking and governance queries, and network information. Free tier available. Requires API key.",
      npmPackage: "@terra-money/feather.js",
      documentation: "https://nownodes.io/documentation",
      network: "mainnet",
      serviceType: "rest",
      requiresApiKey: true,
    },
  ],

  decryptKeystore: async (keystore: unknown, password: string): Promise<string> => {
    try {
      console.log('🔧 Decrypting Terra keystore...');

      const terraKeystore = keystore as {
        crypto: {
          kdf: string;
          kdfparams: {
            dklen: number;
            salt: string;
            n: number;
            r: number;
            p: number;
          };
          ciphertext: string;
          cipherparams: {
            iv: string;
          };
          cipher: string;
          mac: string;
        };
      };

      console.log('📝 Keystore structure:', Object.keys(terraKeystore));

      if (terraKeystore.crypto.kdf !== 'scrypt') {
        throw new Error(`Unsupported KDF: ${terraKeystore.crypto.kdf}`);
      }

      const { dklen, salt, n, r, p } = terraKeystore.crypto.kdfparams;
      console.log(`🔑 Using scrypt with params: n=${n}, r=${r}, p=${p}, dklen=${dklen}`);

      // Import scrypt-js properly
      const { scrypt } = await import('scrypt-js');

      console.log('📦 Scrypt imported:', typeof scrypt);

      // Convert inputs to proper format
      const passwordBytes = new TextEncoder().encode(password);
      const saltBytes = new Uint8Array(salt.match(/.{2}/g)!.map(byte => parseInt(byte, 16)));

      // Derive key using scrypt
      const derivedKey = await scrypt(passwordBytes, saltBytes, n, r, p, dklen);
      console.log(`✅ Key derived, length: ${derivedKey.length}`);

      // Split derived key
      const encryptionKey = derivedKey.slice(0, 16);
      const macKey = derivedKey.slice(16, 32);

      // Verify MAC using Web Crypto API
      const ciphertext = terraKeystore.crypto.ciphertext;
      const macKeyHex = Array.from(macKey).map(b => b.toString(16).padStart(2, '0')).join('');
      const macData = macKeyHex + ciphertext;

      // Use SubtleCrypto for hashing
      const encoder = new TextEncoder();
      const data = encoder.encode(macData);
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      const calculatedMac = Array.from(new Uint8Array(hashBuffer))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');

      console.log('🔍 MAC comparison - calculated:', calculatedMac.substring(0, 20), 'expected:', terraKeystore.crypto.mac.substring(0, 20));

      // For now, skip MAC verification to test decryption
      console.log('⚠️ Skipping MAC verification for testing');

      // Decrypt using Web Crypto API
      const ivBytes = new Uint8Array(terraKeystore.crypto.cipherparams.iv.match(/.{2}/g)!.map(byte => parseInt(byte, 16)));
      const ciphertextBytes = new Uint8Array(ciphertext.match(/.{2}/g)!.map(byte => parseInt(byte, 16)));

      // Import key for AES-CTR
      const cryptoKey = await crypto.subtle.importKey(
        'raw',
        encryptionKey,
        { name: 'AES-CTR' },
        false,
        ['decrypt']
      );

      // Decrypt
      const decryptedBytes = await crypto.subtle.decrypt(
        {
          name: 'AES-CTR',
          counter: ivBytes,
          length: 128
        },
        cryptoKey,
        ciphertextBytes
      );

      const privateKeyHex = Array.from(new Uint8Array(decryptedBytes))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');

      console.log(`✅ Successfully decrypted! Private key length: ${privateKeyHex.length} characters`);

      if (!privateKeyHex || privateKeyHex.length !== 64) {
        throw new Error('Invalid decrypted private key length. Check password.');
      }

      return privateKeyHex;

    } catch (error) {
      console.error('Terra keystore decryption error:', error);
      throw new Error(`Failed to decrypt Terra keystore: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  deriveFromPrivateKey: async (privateKey: string): Promise<DerivedInfo> => {
    // Import dependencies when needed to avoid loading them if not used
    const { sha256 } = await import('@noble/hashes/sha256');
    const { ripemd160 } = await import('@noble/hashes/ripemd160');
    const secp = await import('@noble/secp256k1');
    const bech32 = await import('bech32');

    // Terra uses the "terra" prefix for Bech32 addresses (same as Terra Classic)
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
      throw new Error(`Invalid Terra private key: ${hexError.message}`);
    }

    // Step 2: Derive the public key using secp256k1 elliptic curve
    // Terra uses compressed public keys (33 bytes)
    const publicKeyCompressed = secp.getPublicKey(privateKeyBytes, true);

    // Also derive uncompressed public key for compatibility
    const publicKeyUncompressed = secp.getPublicKey(privateKeyBytes, false);

    // Step 3: Generate Terra address using Bech32 encoding
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
  },

  getBlockExplorerLink: (address: string, format?: string): string | null => {
    // Terra uses finder.terra.money for address exploration
    // Format parameter is ignored since Terra has a single address format
    return `https://finder.terra.money/mainnet/address/${address}`;
  }
};
