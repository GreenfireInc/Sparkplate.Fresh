// Currency: Tezos (XTZ)
// Source: Cryptocurrency Data
// Research Data Compiled from Multiple Sources

import type { CurrencyData, DerivedInfo } from './currencyData';
import { toHex, concatBytes, TEZOS_PREFIX } from './utils';

export const tezosData: CurrencyData = {
  basicInfo: {
    name: "Tezos",
    symbolTicker: "XTZ",
    description: "A self-amending blockchain platform that can upgrade itself without hard forks. Tezos uses a liquid proof-of-stake consensus mechanism and supports smart contracts written in Michelson.",
    creator: "Arthur Breitman and Kathleen Breitman",
    debutYear: 2018,
    website: "https://tezos.com/",
    whitePaper: "https://tezos.com/whitepaper.pdf",
    primaryNFTMarketplace: "https://objkt.com/",
    secondaryNFTMarketplace: "https://fxhash.xyz/",
  },

  technicalInfo: {
    proofingType: "Proof of Stake",
    class: "Layer 1 Blockchain (Self-Amending / Liquid Proof of Stake)",
    totalSupply: "Unlimited (Inflationary, ~5.5% annual)",
    libraryHashing: "Blake2b",
    librarySigning: "Ed25519",
    mnemonicSeedPhraseLengths: "12, 15, 18, 21, 24 words (BIP39)",
    privateKeyFormat: "Tezos edsk format (Base58) or 64-character hex",
    privateKeyToPublicKeyCurve: "Ed25519",
    publicKeyToPublicWalletAddressHashing: "Blake2b-160 + Base58Check (starts with 'tz1')",
    NPMLibraryHashing: "@noble/hashes/blake2.js",
    NPMLibrarySigning: "@noble/ed25519",
    keyStoreFormat: "Tezos JSON Keystore (Argon2i + libsodium)",
    jsonFormat: "Tezos JSON format / Michelson compatible",
    smartContractLanguage: "Michelson / SmartPy / LIGO / Archetype",
    primaryNPMPackage: "@taquito/taquito",
    secondaryNPMPackage: "@taquito/signer",
    tertiaryNPMPackage: "@noble/ed25519",
    web3ConnectMechanism: "Temple Wallet / Kukai / Beacon SDK",
    nativeWallet: "Temple Wallet / Kukai",
    humanReadableAddressingPlatform: "Tezos Domains (.tez)",
    humanReadableAddressingNPMPackage: "@tezos-domains/client",
    SendingMechanism: "Tezos RPC transaction injection",
    NFTMintingMechanism: "FA2 (TZIP-12 multi-asset standard)",
    AssetTokenSupportAndMechanism: "FA1.2 (fungible) / FA2 (multi-asset) token standards",
    evmChainID: "N/A (Tezos Protocol, non-EVM with Michelson)",
    typicalDerivationPath: "m/44'/1729'/0'/0' (BIP44 Tezos standard, coin type 1729)",
    sendingFunctionality: "@taquito/taquito Tezos.contract.transfer() and toolkit.sendOperations()",
  },

  dex: [
    {
      name: "QuipuSwap",
      url: "https://quipuswap.com/",
      type: "AMM DEX",
      description: "Leading decentralized exchange on Tezos with multiple pool types and farming",
    },
    {
      name: "Plenty DeFi",
      url: "https://www.plentydefi.com/",
      type: "Multi-Feature DeFi",
      description: "Comprehensive DeFi platform with DEX, lending, and yield optimization",
    },
    {
      name: "SpicySwap",
      url: "https://spicyswap.xyz/",
      type: "AMM DEX",
      description: "Community-driven DEX with innovative tokenomics and NFT features",
    },
    {
      name: "Vortex",
      url: "https://vortex.network/",
      type: "AMM DEX",
      description: "Next-generation DEX with concentrated liquidity and advanced trading",
    },
    {
      name: "Youves",
      url: "https://youves.com/",
      type: "Synthetic Assets DEX",
      description: "Decentralized platform for synthetic assets and stablecoins with DEX",
    },
    {
      name: "Ctez",
      url: "https://ctez.app/",
      type: "Collateralized Tez",
      description: "Ovens protocol with collateralized ctez token and swap functionality",
    },
    {
      name: "Mavryk DEX",
      url: "https://mavryk.io/",
      type: "Liquidity Protocol",
      description: "Decentralized liquidity protocol with efficient swaps",
    },
  ],

  stakingProviders: [
    {
      name: "Native Baking (Delegation)",
      url: "https://tezos.com/learn/bake",
      type: "Native Delegation",
      description: "Delegate XTZ to public bakers and earn ~6% APY rewards (baking delegation)",
    },
    {
      name: "Temple Wallet Delegation",
      url: "https://templewallet.com/",
      type: "Wallet Delegation",
      description: "Delegate directly from Temple wallet to any baker",
    },
    {
      name: "Kukai Delegation",
      url: "https://kukai.app/",
      type: "Wallet Delegation",
      description: "Web wallet with built-in baker delegation",
    },
    {
      name: "Coinbase Staking",
      url: "https://www.coinbase.com/earn/staking/tezos",
      type: "Exchange Staking",
      description: "Stake XTZ through Coinbase with automatic delegation",
    },
    {
      name: "Binance Staking",
      url: "https://www.binance.com/en/staking",
      type: "Exchange Staking",
      description: "Flexible and locked staking for XTZ on Binance",
    },
    {
      name: "Kraken Staking",
      url: "https://www.kraken.com/features/staking-coins",
      type: "Exchange Staking",
      description: "On-chain staking with up to 6% rewards through Kraken",
    },
    {
      name: "Everstake",
      url: "https://everstake.one/tezos",
      type: "Professional Baker",
      description: "Enterprise-grade baking service with high uptime and rewards",
    },
  ],

  miningPools: "N/A (Liquid Proof of Stake - Baking and delegation, no mining)",

  marketInfo: {
    allTimeHigh: {
      price: 9.12,
      currency: "USD",
      date: "2021-10-04",
    },
  },

  socialMedia: {
    discord: "https://discord.gg/tezos",
    instagram: "https://www.instagram.com/tezos/",
    linkedin: "https://www.linkedin.com/company/tezos-foundation/",
    reddit: "https://www.reddit.com/r/tezos/",
    slack: "N/A",
    telegram: "https://t.me/tezos",
    twitterX: "https://twitter.com/tezos",
  },

  identifiers: {
    UCID: "2011",
    identifierBraveNewCoin: "XTZ",
    identifierCoinAPI: "XTZ",
    identifierCoinCap: "tezos",
    identifierCoinGecko: "tezos",
    identifierCoinPaprika: "xtz-tezos",
  },

  blockExplorer: {
    blockExplorerAPI: "https://api.tzkt.io/",
    blockExplorerLink: "https://tzkt.io/",
  },

  rpcEndpoints: [
    {
      name: "TzKT API - MainNet",
      url: "https://api.tzkt.io",
      port: 443,
      protocol: "https",
      type: "REST API (Public)",
      description: "Comprehensive Tezos Explorer and API. Provides most comprehensive blockchain data, REST and WebSocket APIs, account balances and operations, smart contract storage and BigMap support, mempool monitoring, token balances and transfers (FA1.2, FA2), delegates (bakers) information, voting and governance data, and network statistics. Free access, no authentication, open-source.",
      npmPackage: "axios",
      documentation: "https://tzkt.io/api",
      network: "mainnet",
      serviceType: "rest-api",
    },
    {
      name: "TzKT API - GhostNet",
      url: "https://api.ghostnet.tzkt.io",
      port: 443,
      protocol: "https",
      type: "REST API (Public)",
      description: "Comprehensive Tezos Explorer and API for Ghostnet testnet. Provides most comprehensive blockchain data for testing, REST and WebSocket APIs, account balances and operations, smart contract storage and BigMap support, mempool monitoring, token balances and transfers (FA1.2, FA2), delegates (bakers) information, voting and governance data, and network statistics. Free access, no authentication, open-source.",
      npmPackage: "axios",
      documentation: "https://tzkt.io/api",
      network: "ghostnet",
      serviceType: "rest-api",
    },
    {
      name: "TzStats API - MainNet",
      url: "https://api.tzstats.com",
      port: 443,
      protocol: "https",
      type: "REST API (Public)",
      description: "Analytics-focused Tezos Explorer by Blockwatch. Provides in-depth blockchain statistics, Michelson decoding, full BigMap support, time-series and table APIs, advanced analytics, market data, and supply information. Free API access, no authentication required.",
      npmPackage: "axios",
      documentation: "https://tzstats.com/docs/api",
      network: "mainnet",
      serviceType: "rest-api",
    },
    {
      name: "SmartPy RPC - MainNet",
      url: "https://mainnet.smartpy.io",
      port: 443,
      protocol: "https",
      type: "RPC API (Public)",
      description: "Public Tezos RPC endpoint provided by SmartPy. Provides Tezos RPC access for blockchain queries, transaction submission, contract interaction, and account information. Free access, no authentication required. CORS-enabled for browser use.",
      npmPackage: "@taquito/taquito",
      documentation: "https://smartpy.io/",
      network: "mainnet",
      serviceType: "rpc",
    },
    {
      name: "TzBeta RPC - MainNet",
      url: "https://rpc.tzbeta.net",
      port: 443,
      protocol: "https",
      type: "RPC API (Public)",
      description: "Public Tezos RPC endpoint. Provides Tezos RPC access for blockchain queries, transaction submission, contract interaction, and account information. Free access, no authentication required.",
      npmPackage: "@taquito/taquito",
      documentation: "https://tezos.com/",
      network: "mainnet",
      serviceType: "rpc",
    },
    {
      name: "Tez.ie RPC - MainNet",
      url: "https://mainnet.api.tez.ie",
      port: 443,
      protocol: "https",
      type: "RPC API (Public)",
      description: "Public Tezos RPC endpoint provided by Tez.ie. Provides Tezos RPC access for blockchain queries, transaction submission, contract interaction, and account information. Free access, no authentication required.",
      npmPackage: "@taquito/taquito",
      documentation: "https://tez.ie/",
      network: "mainnet",
      serviceType: "rpc",
    },
    {
      name: "ECAD Infra RPC - GhostNet",
      url: "https://ghostnet.ecadinfra.com",
      port: 443,
      protocol: "https",
      type: "RPC API (Public)",
      description: "Public Tezos RPC endpoint for Ghostnet testnet provided by ECAD Infra. Provides Tezos RPC access for testing, blockchain queries, transaction submission, contract interaction, and account information. Free access, no authentication required.",
      npmPackage: "@taquito/taquito",
      documentation: "https://ecadinfra.com/",
      network: "ghostnet",
      serviceType: "rpc",
    },
    {
      name: "NOWNodes - MainNet",
      url: "https://xtz.nownodes.io",
      port: 443,
      protocol: "https",
      type: "REST API (API Key Required)",
      description: "Full node access with free tier. Provides full Tezos RPC node access, block explorer data, transaction broadcasting, and contract interaction. Free tier: 20,000 requests/day. Requires API key.",
      npmPackage: "axios",
      documentation: "https://nownodes.io/nodes/tezos-xtz",
      network: "mainnet",
      serviceType: "rest-api",
      requiresApiKey: true,
    },
    {
      name: "NOWNodes - TestNet",
      url: "https://xtz-testnet.nownodes.io",
      port: 443,
      protocol: "https",
      type: "REST API (API Key Required)",
      description: "Full node access for testnet with free tier. Provides full Tezos RPC node access for testing, block explorer data, transaction broadcasting, and contract interaction. Free tier: 20,000 requests/day. Requires API key.",
      npmPackage: "axios",
      documentation: "https://nownodes.io/nodes/tezos-xtz",
      network: "testnet",
      serviceType: "rest-api",
      requiresApiKey: true,
    },
    {
      name: "GetBlock - MainNet",
      url: "https://go.getblock.io",
      port: 443,
      protocol: "https",
      type: "RPC API (API Key Required)",
      description: "RPC node provider for Tezos blockchain. Provides instant Tezos RPC node access, reliable infrastructure, high availability, transaction broadcasting, and contract queries. Free tier available with API key. Requires API key.",
      npmPackage: "@taquito/taquito",
      documentation: "https://getblock.io/docs/tezos/",
      network: "mainnet",
      serviceType: "rpc",
      requiresApiKey: true,
    },
    {
      name: "GetBlock - TestNet",
      url: "https://go.getblock.io",
      port: 443,
      protocol: "https",
      type: "RPC API (API Key Required)",
      description: "RPC node provider for Tezos testnet. Provides instant Tezos RPC node access for testing, reliable infrastructure, high availability, transaction broadcasting, and contract queries. Free tier available with API key. Requires API key.",
      npmPackage: "@taquito/taquito",
      documentation: "https://getblock.io/docs/tezos/",
      network: "testnet",
      serviceType: "rpc",
      requiresApiKey: true,
    },
    {
      name: "Bitquery - MainNet",
      url: "https://graphql.bitquery.io",
      port: 443,
      protocol: "https",
      type: "GraphQL API (API Key Required)",
      description: "GraphQL API with real-time and historical data. Provides historical and real-time blockchain data, flexible GraphQL queries, token transfers and operations, complex filtering, and real-time data streaming. Free tier available. Requires API key.",
      npmPackage: "graphql-request",
      documentation: "https://bitquery.io/blockchains/tezos-blockchain-api",
      network: "mainnet",
      serviceType: "graphql",
      requiresApiKey: true,
    },
  ],
  
  decryptKeystore: async (keystore: unknown, password: string): Promise<string> => {
    try {
      const tezosKeystore = keystore as { 
        kdf: string; 
        ciphertext: string; 
        salt: string;
        version: string;
      };
      
      if (tezosKeystore.kdf === 'Argon2') {
        // Import libsodium-wrappers-sumo (same as Galleon)
        const sodium = await import('libsodium-wrappers-sumo');
        await sodium.ready;
        
        // Import bs58check for proper base58 decoding (same as Galleon)
        const bs58check = await import('bs58check');
        
        console.log('🔧 Using Galleon\'s exact decryption method with libsodium');
        
        // Decode base58-encoded salt and ciphertext (Galleon's approach)
        const encryptedKeys = bs58check.default.decode(tezosKeystore.ciphertext);
        const saltBytes = bs58check.default.decode(tezosKeystore.salt);
        
        console.log(`📏 Decoded lengths - salt: ${saltBytes.length}, ciphertext: ${encryptedKeys.length}`);
        
        // Use Galleon's exact Argon2i parameters
        console.log('🔑 Deriving key with Galleon\'s Argon2i parameters...');
        const derivedKey = sodium.crypto_pwhash(
          sodium.crypto_box_SEEDBYTES, // 32 bytes
          password,
          saltBytes,
          4, // OpSLimit (iterations) - Galleon's exact value
          33554432, // MemLimit (32MB) - Galleon's exact value  
          sodium.crypto_pwhash_ALG_ARGON2I13 // Argon2i algorithm
        );
        
        console.log(`✅ Key derived with Galleon method, key length: ${derivedKey.length}`);
        
        // Use Galleon's decryption method (libsodium secretbox)
        console.log('🔓 Decrypting with libsodium secretbox...');
        const nonce = encryptedKeys.slice(0, sodium.crypto_secretbox_NONCEBYTES);
        const ciphertext = encryptedKeys.slice(sodium.crypto_secretbox_NONCEBYTES);
        
        console.log(`📏 Nonce: ${nonce.length} bytes, Ciphertext: ${ciphertext.length} bytes`);
        
        const decryptedBytes = sodium.crypto_secretbox_open_easy(ciphertext, nonce, derivedKey);
        
        if (!decryptedBytes) {
          throw new Error('Invalid password - failed to decrypt');
        }
        
        console.log(`✅ Decryption successful, ${decryptedBytes.length} bytes decrypted`);
        
        // Convert decrypted bytes to string
        const decryptedText = new TextDecoder().decode(decryptedBytes);
        console.log(`📝 Decrypted string length: ${decryptedText.length}`);
        
        return decryptedText;
      }
      
      // Handle simpler encryption methods if present
      const cryptoJs = await import('crypto-js');
      const decrypted = cryptoJs.AES.decrypt(tezosKeystore.ciphertext, password);
      const decryptedText = decrypted.toString(cryptoJs.enc.Utf8);
      
      if (!decryptedText) {
        throw new Error('Invalid password or corrupted keystore');
      }
      
      return decryptedText;
    } catch (error) {
      throw new Error(`Failed to decrypt Tezos keystore: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  deriveFromPrivateKey: async (privateKey: string): Promise<DerivedInfo> => {
    // Import dependencies when needed to avoid loading them if not used
    const bs58 = await import('bs58');
    const { sha256 } = await import('@noble/hashes/sha2.js');
    const { sha512 } = await import('@noble/hashes/sha2.js');
    const { blake2b } = await import('@noble/hashes/blake2.js');
    
    console.log("XTZ case entered with priv:", privateKey);
    try {
      const trimmedPriv = privateKey.trim();
      let sk: Uint8Array;
      
      if (trimmedPriv.startsWith("edsk")) {
        // Handle Tezos edsk format
        console.log("Processing edsk format private key");
        
        // Decode the base58 encoded private key
        const decoded = bs58.default.decode(trimmedPriv);
        console.log("Decoded length:", decoded.length);
        
        // Tezos edsk keys can have different lengths depending on the format
        // Standard format: 4-byte prefix + 32-byte key + 4-byte checksum = 40 bytes
        // Extended format: 4-byte prefix + 32-byte key + 32-byte extension + 4-byte checksum = 72 bytes
        
        let keyBytes: Uint8Array;
        
        if (decoded.length === 40) {
          // Standard format: 4-byte prefix + 32-byte key + 4-byte checksum
          keyBytes = decoded.slice(4, 36);
        } else if (decoded.length === 72) {
          // Extended format: 4-byte prefix + 32-byte key + 32-byte extension + 4-byte checksum  
          keyBytes = decoded.slice(4, 36);
        } else if (decoded.length === 68) {
          // Another possible format
          keyBytes = decoded.slice(4, 36);
        } else if (decoded.length >= 36) {
          // Flexible approach - take bytes 4-36 regardless of total length
          keyBytes = decoded.slice(4, 36);
        } else {
          throw new Error(`Invalid edsk private key length: ${decoded.length}. Expected at least 36 bytes.`);
        }
        
        sk = keyBytes;
        console.log("Extracted private key length:", sk.length);
      } else {
        // Handle hex format
        const hex = (trimmedPriv.startsWith("0x") ? trimmedPriv.slice(2) : trimmedPriv);
        console.log("Processing hex format, length:", hex.length);
        
        if (!hex || hex.length === 0) {
          throw new Error("Private key cannot be empty");
        }
        
        if (!/^[0-9a-fA-F]+$/i.test(hex)) {
          throw new Error("Invalid hex format. Use either edsk format or hex (64 characters).");
        }
        
        if (hex.length !== 64) {
          throw new Error(`Invalid hex length: ${hex.length}. Expected 64 characters (32 bytes).`);
        }
        
        sk = Uint8Array.from(hex.match(/.{1,2}/g)!.map((b) => parseInt(b, 16)));
      }
      
      if (sk.length !== 32) {
        throw new Error("Private key must be 32 bytes");
      }
      
      console.log("Private key processed successfully, deriving public key...");
      
      // Use ed25519 for proper Tezos key derivation
      const ed25519 = await import("@noble/ed25519");
      
      // Configure the required hash function for ed25519
      if (!ed25519.etc.sha512Sync) {
        ed25519.etc.sha512Sync = (...m) => sha512(ed25519.etc.concatBytes(...m));
      }
      
      const edPub = await ed25519.getPublicKey(sk);
      const pubHex = toHex(new Uint8Array(edPub));
      console.log("Ed25519 public key derived:", pubHex);
      
      // Create proper Tezos tz1 address using blake2b
      const pubKeyHash = blake2b(new Uint8Array(edPub), { dkLen: 20 });
      console.log("Public key hash:", toHex(pubKeyHash));
      
      // Construct tz1 address with proper Tezos encoding
      const addressPayload = concatBytes(TEZOS_PREFIX.tz1, pubKeyHash);
      const addressChecksum = sha256(sha256(addressPayload)).slice(0, 4);
      const address = bs58.default.encode(concatBytes(addressPayload, addressChecksum));
      console.log("Address generated:", address);
      
      return { 
        publicKey: pubHex, 
        address: address 
      };
    } catch (error) {
      console.error("XTZ derivation error:", error);
      throw new Error(`Tezos derivation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
};
