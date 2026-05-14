// Currency: Dogecoin (DOGE)
// Source: Cryptocurrency Data
// Research Data Compiled from Multiple Sources

import type { CurrencyData, DerivedInfo } from './currencyData';
import { toHex, fromHex } from './utils';

export const dogecoinData: CurrencyData = {
  basicInfo: {
    name: "Dogecoin",
    symbolTicker: "DOGE",
    description: "A peer-to-peer digital currency that enables you to easily send money online. Based on the popular 'Doge' internet meme featuring a Shiba Inu dog.",
    creator: "Billy Markus and Jackson Palmer",
    debutYear: 2013,
    website: "https://dogecoin.com/",
    whitePaper: "N/A (Bitcoin fork, no separate whitepaper)",
    primaryNFTMarketplace: "https://dogeparty.net/",
    secondaryNFTMarketplace: "N/A",
  },

  technicalInfo: {
    proofingType: "Proof of Work",
    class: "Layer 1 Blockchain (Meme Coin / Payment Coin)",
    totalSupply: "Unlimited (Inflationary) - 5 billion DOGE added per year",
    libraryHashing: "Scrypt (PoW) / SHA-256 (address hashing)",
    librarySigning: "ECDSA",
    mnemonicSeedPhraseLengths: "12, 24 words (BIP39)",
    privateKeyFormat: "64-character hexadecimal (32 bytes) or WIF (Wallet Import Format)",
    privateKeyToPublicKeyCurve: "secp256k1",
    publicKeyToPublicWalletAddressHashing: "SHA-256 + RIPEMD-160 + Base58Check",
    NPMLibraryHashing: "@noble/hashes/sha2.js",
    NPMLibrarySigning: "@noble/secp256k1",
    keyStoreFormat: "Dogecoin Core wallet.dat (Berkeley DB) / WIF / AES-256-CBC",
    jsonFormat: "Dogecoin Core JSON-RPC (Bitcoin-compatible)",
    smartContractLanguage: "N/A (Bitcoin Script - limited)",
    primaryNPMPackage: "bitcoinjs-lib",
    secondaryNPMPackage: "@noble/secp256k1",
    tertiaryNPMPackage: "wif",
    web3ConnectMechanism: "Dogecoin Core RPC / MultiDoge",
    nativeWallet: "Dogecoin Core / MultiDoge",
    humanReadableAddressingPlatform: "N/A (no native name service)",
    humanReadableAddressingNPMPackage: "N/A",
    SendingMechanism: "Dogecoin transaction broadcasting via nodes/RPC",
    NFTMintingMechanism: "Dogeparty (counterparty fork for DOGE)",
    AssetTokenSupportAndMechanism: "Dogeparty tokens (XDP protocol)",
    evmChainID: "N/A (UTXO-based chain, though Dogechain is an EVM sidechain with ChainID 2000)",
    typicalDerivationPath: "m/44'/3'/0'/0/0 (BIP44 Dogecoin standard)",
    sendingFunctionality: "bitcoinjs-lib compatible transaction creation and broadcasting",
  },

  dex: [
    {
      name: "SideShift.ai",
      url: "https://sideshift.ai/",
      type: "Cross-Chain Exchange",
      description: "Instant cryptocurrency exchange supporting DOGE",
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
      description: "Limitless crypto exchange supporting DOGE",
    },
    {
      name: "Dogeswap (Dogechain)",
      url: "https://dogeswap.org/",
      type: "AMM DEX",
      description: "Decentralized exchange on Dogechain EVM sidechain",
    },
    {
      name: "Kibble Swap (Dogechain)",
      url: "https://kibbleswap.dog/",
      type: "AMM DEX",
      description: "Native DEX on Dogechain with liquidity pools",
    },
    {
      name: "Yodeswap (Dogechain)",
      url: "https://yodeswap.dog/",
      type: "AMM DEX",
      description: "Community-driven DEX on Dogechain",
    },
  ],

  stakingProviders: [
    {
      name: "N/A - Proof of Work",
      url: "https://dogecoin.com/",
      type: "Mining",
      description: "Dogecoin uses Scrypt Proof of Work consensus. See mining pools for participation.",
    },
  ],

  miningPools: [
    {
      name: "Prohashing",
      url: "https://prohashing.com/",
      type: "Multi-Algo Pool",
      description: "Multi-algorithm mining pool supporting Dogecoin (Scrypt)",
    },
    {
      name: "F2Pool",
      url: "https://www.f2pool.com/",
      type: "Mining Pool",
      description: "Large mining pool with Dogecoin support",
    },
    {
      name: "ViaBTC",
      url: "https://www.viabtc.com/",
      type: "Mining Pool",
      description: "Multi-currency mining pool including Dogecoin",
    },
    {
      name: "Litecoinpool.org",
      url: "https://www.litecoinpool.org/",
      type: "Merged Mining Pool",
      description: "Mine Litecoin and Dogecoin simultaneously through merged mining",
    },
    {
      name: "AikaPool",
      url: "https://aikapool.com/doge/",
      type: "Mining Pool",
      description: "Dedicated Dogecoin mining pool",
    },
    {
      name: "Poolin",
      url: "https://www.poolin.com/",
      type: "Mining Pool",
      description: "Multi-currency mining pool with Dogecoin support",
    },
    {
      name: "Multipool",
      url: "https://www.multipool.us/",
      type: "Multi-Coin Pool",
      description: "Mining pool supporting multiple Scrypt coins including DOGE",
    },
  ],

  marketInfo: {
    allTimeHigh: {
      price: 0.73,
      currency: "USD",
      date: "2021-05-08",
    },
  },

  socialMedia: {
    discord: "https://discord.gg/dogecoin",
    instagram: "https://www.instagram.com/dogecoin/",
    linkedin: "https://www.linkedin.com/company/dogecoin/",
    reddit: "https://www.reddit.com/r/dogecoin/",
    slack: "N/A",
    telegram: "https://t.me/dogecoin",
    twitterX: "https://twitter.com/dogecoin",
  },

  identifiers: {
    UCID: "74",
    identifierBraveNewCoin: "DOGE",
    identifierCoinAPI: "DOGE",
    identifierCoinCap: "dogecoin",
    identifierCoinGecko: "dogecoin",
    identifierCoinPaprika: "doge-dogecoin",
  },

  blockExplorer: {
    blockExplorerAPI: "https://dogechain.info/api",
    blockExplorerLink: "https://blockchair.com/dogecoin/address/",
  },

  rpcEndpoints: [
    {
      name: "Dogechain.info - MainNet",
      url: "https://dogechain.info/api/v1",
      port: 443,
      protocol: "https",
      type: "REST API (Public)",
      description: "One of the oldest and most established Dogecoin explorers. Provides address balance, transaction history, UTXO queries, block information, network statistics, and transaction broadcasting. Free developer API, moderate rate limits, no API key required.",
      npmPackage: "bitcoinjs-lib",
      documentation: "https://dogechain.info/api",
      network: "mainnet",
      serviceType: "rest",
    },
    {
      name: "Blockchair - MainNet",
      url: "https://api.blockchair.com/dogecoin",
      port: 443,
      protocol: "https",
      type: "REST API (Public)",
      description: "Fast and reliable blockchain explorer API. Provides UTXO queries, balance checks, transaction history, bulk balance queries (multiple addresses), network statistics, and fee recommendations. Free tier: 14,400 requests/day. No API key required for basic usage.",
      npmPackage: "bitcoinjs-lib",
      documentation: "https://blockchair.com/api/docs",
      network: "mainnet",
      serviceType: "rest",
    },
    {
      name: "BlockCypher - MainNet",
      url: "https://api.blockcypher.com/v1/doge",
      port: 443,
      protocol: "https",
      type: "REST API (Public, Optional API Key)",
      description: "Unified blockchain API with webhooks support. Provides UTXO queries, transaction history, confidence scores, comprehensive address information, transaction decoding, and blockchain statistics. Free tier: 3 req/sec (non-registered), 200 req/hour, 2,000/day with token. Optional API key for higher limits.",
      npmPackage: "bitcoinjs-lib",
      documentation: "https://www.blockcypher.com/dev/",
      network: "mainnet",
      serviceType: "rest",
    },
    {
      name: "BlockCypher - TestNet",
      url: "https://api.blockcypher.com/v1/doge/testnet",
      port: 443,
      protocol: "https",
      type: "REST API (Public, Optional API Key)",
      description: "Unified blockchain API for Dogecoin TestNet with webhooks support. Provides UTXO queries, transaction history, confidence scores, comprehensive address information, transaction decoding, and blockchain statistics. Free tier: 3 req/sec (non-registered), 200 req/hour, 2,000/day with token. Optional API key for higher limits.",
      npmPackage: "bitcoinjs-lib",
      documentation: "https://www.blockcypher.com/dev/",
      network: "testnet",
      serviceType: "rest",
    },
    {
      name: "DogeClient - MainNet",
      url: "https://api.dogeclient.com/v1",
      port: 443,
      protocol: "https",
      type: "REST API (Public, Optional API Key)",
      description: "Professional Dogecoin infrastructure. Provides address balance, transaction history, block information, network statistics, mempool information, and fee recommendations. Free tier: ~1,000 requests/hour. Optional API key for higher limits.",
      npmPackage: "bitcoinjs-lib",
      documentation: "https://dogeclient.com/api-docs",
      network: "mainnet",
      serviceType: "rest",
    },
    {
      name: "Electrs-Dogecoin - MainNet",
      url: "https://doge-electrs-demo.qed.me",
      port: 443,
      protocol: "https",
      type: "REST API (Public)",
      description: "Modern, open-source Dogecoin block explorer with full history API. Provides UTXO queries, balance checks, transaction history, real-time fee estimates, transaction broadcasting, mempool monitoring, and block information. No API key required for public demo. Moderate rate limits.",
      npmPackage: "bitcoinjs-lib",
      documentation: "https://github.com/DogeDevs/electrs-dogecoin",
      network: "mainnet",
      serviceType: "rest",
    },
    {
      name: "Tokenview - MainNet",
      url: "https://services.tokenview.io",
      port: 443,
      protocol: "https",
      type: "REST API (API Key Required)",
      description: "Multi-chain blockchain API supporting 70+ blockchains. Provides comprehensive API coverage, transaction history with pagination, block explorer functionality, and fee recommendations. Free tier: 100 requests/day. Requires API key.",
      npmPackage: "bitcoinjs-lib",
      documentation: "https://services.tokenview.io/docs",
      network: "mainnet",
      serviceType: "rest",
      requiresApiKey: true,
    },
    {
      name: "Tokenview - TestNet",
      url: "https://services.tokenview.io",
      port: 443,
      protocol: "https",
      type: "REST API (API Key Required)",
      description: "Multi-chain blockchain API for Dogecoin TestNet supporting 70+ blockchains. Provides comprehensive API coverage, transaction history with pagination, block explorer functionality, and fee recommendations. Free tier: 100 requests/day. Requires API key.",
      npmPackage: "bitcoinjs-lib",
      documentation: "https://services.tokenview.io/docs",
      network: "testnet",
      serviceType: "rest",
      requiresApiKey: true,
    },
    {
      name: "NOWNodes - MainNet",
      url: "https://doge.nownodes.io",
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
      url: "https://doge-testnet.nownodes.io",
      port: 443,
      protocol: "https",
      type: "REST API (API Key Required)",
      description: "Full node access via Blockbook for Dogecoin TestNet. Provides real blockchain node data, comprehensive block explorer features, and multi-chain support. Free tier: 5,000 requests/month. Requires API key.",
      npmPackage: "bitcoinjs-lib",
      documentation: "https://nownodes.io/",
      network: "testnet",
      serviceType: "rest",
      requiresApiKey: true,
    },
    {
      name: "Dogechain - MainNet RPC",
      url: "https://rpc.dogechain.dog",
      port: 443,
      protocol: "https",
      type: "EVM RPC Node (Public)",
      description: "Public RPC endpoint for Dogechain (EVM-compatible sidechain, Chain ID 2000). Provides Ethereum-compatible JSON-RPC for smart contracts and DeFi applications on Dogechain. No API key required.",
      npmPackage: "web3",
      documentation: "https://dogechain.dog/",
      network: "mainnet",
      serviceType: "evm-rpc",
    },
    {
      name: "Dogechain - MainNet RPC (Singapore 1)",
      url: "https://rpc01-sg.dogechain.dog",
      port: 443,
      protocol: "https",
      type: "EVM RPC Node (Public)",
      description: "Public RPC endpoint for Dogechain (EVM-compatible sidechain, Chain ID 2000) via Singapore region. Provides Ethereum-compatible JSON-RPC for smart contracts and DeFi applications on Dogechain. No API key required.",
      npmPackage: "web3",
      documentation: "https://dogechain.dog/",
      network: "mainnet",
      serviceType: "evm-rpc",
    },
    {
      name: "Dogechain - MainNet RPC (Singapore 2)",
      url: "https://rpc02-sg.dogechain.dog",
      port: 443,
      protocol: "https",
      type: "EVM RPC Node (Public)",
      description: "Public RPC endpoint for Dogechain (EVM-compatible sidechain, Chain ID 2000) via Singapore region. Provides Ethereum-compatible JSON-RPC for smart contracts and DeFi applications on Dogechain. No API key required.",
      npmPackage: "web3",
      documentation: "https://dogechain.dog/",
      network: "mainnet",
      serviceType: "evm-rpc",
    },
  ],

  decryptKeystore: async (keystore: unknown, password: string): Promise<string> => {
    // Handle encrypted Dogecoin wallet files
    const cryptoJS = await import('crypto-js');

    try {
      // Convert keystore to string if it's not already
      const encryptedData = typeof keystore === 'string' ? keystore : keystore.toString();

      // The encrypted file appears to be OpenSSL AES-256-CBC format
      // Remove any whitespace and decode from base64
      const cleanEncryptedData = encryptedData.replace(/\s/g, '');

      // Decrypt using AES with the provided password
      const decrypted = cryptoJS.AES.decrypt(cleanEncryptedData, password);

      // Convert decrypted bytes to UTF-8 string
      const decryptedString = decrypted.toString(cryptoJS.enc.Utf8);

      if (!decryptedString) {
        throw new Error('Decryption failed - invalid password or corrupted file');
      }

      // Parse the decrypted content to extract the private key
      // The decrypted content may contain JSON or plain text with the private key
      try {
        const parsed = JSON.parse(decryptedString);
        // Look for common private key fields
        if (parsed.privateKey) {
          return parsed.privateKey;
        } else if (parsed.key) {
          return parsed.key;
        } else if (parsed.doge_private_key) {
          return parsed.doge_private_key;
        } else {
          // If it's a JSON object but doesn't have expected fields,
          // return the entire decrypted content
          return decryptedString;
        }
      } catch {
        // If it's not JSON, treat it as plain text containing the private key
        return decryptedString.trim();
      }

    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to decrypt Dogecoin keystore: ${error.message}`);
      }
      throw new Error('Failed to decrypt Dogecoin keystore: Unknown error');
    }
  },



  deriveFromPrivateKey: async (privateKey: string): Promise<DerivedInfo> => {
    // Import dependencies when needed to avoid loading them if not used
    const { sha256 } = await import('@noble/hashes/sha2.js');
    const { ripemd160 } = await import('@noble/hashes/legacy.js');
    const secp = await import('@noble/secp256k1');
    const { decode: wifDecode } = await import('wif');
    const bs58 = await import('bs58');
    
    // Dogecoin uses the same mechanism as Litecoin (Bitcoin fork)
    const DOGE_PUBKEY_HASH = 0x1e; // base58 prefix for Dogecoin P2PKH
    const DOGE_WIF_PREFIX = 0x9e; // Dogecoin WIF private key prefix (mainnet)
    
    // Step 1: Parse the private key from various formats
    let privateKeyBytes: Uint8Array;
    
    try {
      // First try to parse as WIF (Wallet Import Format)
      if (privateKey.length >= 50 && privateKey.length <= 52) { // Typical WIF length
        try {
          const decoded = wifDecode(privateKey);
          privateKeyBytes = new Uint8Array(decoded.privateKey);
          
          // Validate the WIF is for Dogecoin network
          if (decoded.version !== DOGE_WIF_PREFIX && decoded.version !== 0x80) {
            console.warn("Warning: WIF key may not be for Dogecoin network");
          }
        } catch (wifError) {
          throw new Error(`Invalid Dogecoin WIF key: ${wifError.message}`);
        }
      } 
      // Handle hex format (with or without 0x prefix)
      else {
        try {
          privateKeyBytes = fromHex(privateKey);
          
          if (privateKeyBytes.length !== 32) {
            throw new Error(`Expected 32 bytes, got ${privateKeyBytes.length}`);
          }
        } catch (hexError) {
          throw new Error(`Invalid Dogecoin private key: ${hexError.message}`);
        }
      }
    } catch (error) {
      throw new Error(`Failed to parse Dogecoin private key: ${error.message}`);
    }
    
    // Step 2: Derive the public key using secp256k1 elliptic curve
    // In Dogecoin, compressed public keys are commonly used (33 bytes starting with 0x02 or 0x03)
    const publicKeyCompressed = secp.getPublicKey(privateKeyBytes, true);
    
    // We can also derive the uncompressed public key (65 bytes starting with 0x04)
    const publicKeyUncompressed = secp.getPublicKey(privateKeyBytes, false);
    
    // Step 3: Generate Dogecoin address from the public key
    // 3.1: Apply SHA-256 hashing to the compressed public key
    const hash1 = sha256(publicKeyCompressed);
    
    // 3.2: Apply RIPEMD-160 hashing to the result
    const hash2 = ripemd160(hash1);
    
    // 3.3: Add network prefix byte (0x1e for Dogecoin) to create payload
    const payload = new Uint8Array(1 + hash2.length);
    payload[0] = DOGE_PUBKEY_HASH;
    payload.set(hash2, 1);
    
    // 3.4: Compute the checksum (first 4 bytes of double SHA-256 of payload)
    const checksum = sha256(sha256(payload)).slice(0, 4);
    
    // 3.5: Combine payload and checksum, then encode with Base58
    const addressBytes = new Uint8Array(payload.length + checksum.length);
    addressBytes.set(payload);
    addressBytes.set(checksum, payload.length);
    const address = bs58.default.encode(addressBytes);
    
    // Return both the compressed public key (hex) and the derived address
    return { 
      publicKey: toHex(publicKeyCompressed),
      publicKeyUncompressed: toHex(publicKeyUncompressed),
      address 
    };
  }
};
