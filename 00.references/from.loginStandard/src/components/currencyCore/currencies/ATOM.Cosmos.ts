// Currency: Cosmos (ATOM)
// Source: Cryptocurrency Data
// Research Data Compiled from Multiple Sources

import type { CurrencyData, DerivedInfo } from './currencyData';
import { toHex, concatBytes, COSMOS_PREFIX } from './utils';

export const cosmosData: CurrencyData = {
  basicInfo: {
    name: "Cosmos",
    symbolTicker: "ATOM",
    description: "The internet of blockchains. Cosmos is an ecosystem of interconnected blockchains that can scale and interoperate with each other.",
    creator: "Cosmos Foundation",
    debutYear: 2019,
    website: "https://cosmos.network/",
    whitePaper: "https://v1.cosmos.network/resources/whitepaper",
    primaryNFTMarketplace: "https://www.stargaze.zone/",
    secondaryNFTMarketplace: "https://www.omniflix.market/",
  },

  technicalInfo: {
    proofingType: "Proof of Stake",
    class: "Layer 1 Blockchain",
    totalSupply: "390,930,671 ATOM (inflationary)",
    libraryHashing: "SHA-256",
    librarySigning: "ECDSA",
    mnemonicSeedPhraseLengths: "12, 24 words (BIP39)",
    privateKeyFormat: "64-character hexadecimal (32 bytes) or cosmospriv base58",
    privateKeyToPublicKeyCurve: "secp256k1",
    publicKeyToPublicWalletAddressHashing: "RIPEMD160(SHA-256(public key)) + Bech32 encoding",
    NPMLibraryHashing: "@noble/hashes/sha256",
    NPMLibrarySigning: "@noble/secp256k1",
    keyStoreFormat: "Cosmos JSON Keystore (AES-128-CTR/AES-256-CTR)",
    jsonFormat: "Cosmos SDK JSON",
    smartContractLanguage: "CosmWasm (Rust) / Go",
    primaryNPMPackage: "@cosmjs/stargate",
    secondaryNPMPackage: "@cosmjs/proto-signing",
    tertiaryNPMPackage: "@noble/secp256k1",
    web3ConnectMechanism: "Keplr Wallet / Cosmostation / Leap Wallet",
    nativeWallet: "Keplr / Cosmostation",
    humanReadableAddressingPlatform: "Starname (IOV)",
    humanReadableAddressingNPMPackage: "@iov/starname",
    SendingMechanism: "Cosmos SDK transaction broadcasting",
    NFTMintingMechanism: "CosmWasm NFT standards (CW721)",
    AssetTokenSupportAndMechanism: "IBC (Inter-Blockchain Communication) tokens",
    evmChainID: "N/A (Non-EVM Chain, but Cosmos ecosystem includes EVM chains like Evmos)",
    typicalDerivationPath: "m/44'/118'/0'/0/0 (BIP44 Cosmos standard)",
    sendingFunctionality: "@cosmjs/stargate SigningStargateClient.sendTokens() and broadcastTx()",
  },

  dex: [
    {
      name: "Osmosis",
      url: "https://osmosis.zone/",
      type: "AMM DEX",
      description: "The largest decentralized exchange in the Cosmos ecosystem with advanced AMM features",
    },
    {
      name: "Astroport",
      url: "https://astroport.fi/",
      type: "Multi-Chain AMM",
      description: "Advanced AMM DEX protocol across Cosmos chains",
    },
    {
      name: "Crescent",
      url: "https://crescent.network/",
      type: "Hybrid DEX",
      description: "DeFi hub with orderbook and AMM functionality",
    },
    {
      name: "Kujira",
      url: "https://kujira.app/",
      type: "DeFi Platform",
      description: "Comprehensive DeFi platform with DEX and liquidation features",
    },
    {
      name: "Shade Protocol",
      url: "https://shadeprotocol.io/",
      type: "Private DeFi",
      description: "Privacy-focused DEX on Secret Network",
    },
    {
      name: "Umee",
      url: "https://www.umee.cc/",
      type: "Cross-Chain DEX",
      description: "Cross-chain DeFi hub with lending and trading",
    },
    {
      name: "Gravity DEX",
      url: "https://app.gravitychain.io/",
      type: "Native DEX",
      description: "Built on Cosmos Hub with deep liquidity pools",
    },
  ],

  stakingProviders: [
    {
      name: "Cosmos Hub Validators",
      url: "https://www.mintscan.io/cosmos/validators",
      type: "Native Staking",
      description: "Stake directly with any of 175+ active validators on Cosmos Hub",
    },
    {
      name: "Chorus One",
      url: "https://chorus.one/",
      type: "Institutional Validator",
      description: "Professional staking infrastructure provider",
    },
    {
      name: "Coinbase Cloud",
      url: "https://www.coinbase.com/cloud/products/staking",
      type: "Exchange Staking",
      description: "Stake ATOM through Coinbase",
    },
    {
      name: "Figment",
      url: "https://figment.io/",
      type: "Institutional Validator",
      description: "Enterprise-grade staking services",
    },
    {
      name: "Kraken",
      url: "https://www.kraken.com/features/staking-coins",
      type: "Exchange Staking",
      description: "Stake ATOM through Kraken exchange",
    },
    {
      name: "Stride",
      url: "https://stride.zone/",
      type: "Liquid Staking",
      description: "Liquid staking protocol for Cosmos (stATOM)",
    },
    {
      name: "pStake",
      url: "https://pstake.finance/",
      type: "Liquid Staking",
      description: "Liquid staking for ATOM with pATOM",
    },
  ],

  miningPools: "N/A (Proof of Stake - No Mining)",

  marketInfo: {
    allTimeHigh: {
      price: 44.45,
      currency: "USD",
      date: "2022-01-17",
    },
  },

  socialMedia: {
    discord: "https://discord.gg/cosmosnetwork",
    instagram: "https://www.instagram.com/cosmos/",
    linkedin: "https://www.linkedin.com/company/cosmos/",
    reddit: "https://www.reddit.com/r/cosmosnetwork/",
    slack: "https://cosmos-network.slack.com/",
    telegram: "https://t.me/cosmosproject",
    twitterX: "https://twitter.com/cosmos",
  },

  identifiers: {
    UCID: "3794",
    identifierBraveNewCoin: "ATOM",
    identifierCoinAPI: "ATOM",
    identifierCoinCap: "cosmos",
    identifierCoinGecko: "cosmos",
    identifierCoinPaprika: "atom-cosmos",
  },

  blockExplorer: {
    blockExplorerAPI: "https://api.cosmos.network/",
    blockExplorerLink: "https://www.mintscan.io/cosmos/account/",
  },

  rpcEndpoints: [
    {
      name: "Cosmos Hub - MainNet RPC",
      url: "https://rpc.cosmos.network",
      port: 443,
      protocol: "https",
      type: "RPC Node (Public)",
      description: "Official Cosmos Hub RPC endpoint for MainNet. Provides direct access to Tendermint RPC for querying blockchain state and broadcasting transactions.",
      npmPackage: "@cosmjs/stargate",
      documentation: "https://cosmos.network/",
      network: "mainnet",
      serviceType: "rpc",
    },
    {
      name: "Cosmos Hub - MainNet REST/LCD",
      url: "https://api.cosmos.network",
      port: 443,
      protocol: "https",
      type: "REST/LCD API (Public)",
      description: "Official Cosmos Hub REST/LCD endpoint for MainNet. Provides gRPC-gateway REST API for Cosmos SDK queries, account balances, and transaction broadcasting.",
      npmPackage: "@cosmjs/stargate",
      documentation: "https://cosmos.network/",
      network: "mainnet",
      serviceType: "rest",
    },
    {
      name: "Cosmos Hub - MainNet gRPC",
      url: "grpc.cosmos.network",
      port: 443,
      protocol: "grpc",
      type: "gRPC Node (Public)",
      description: "Official Cosmos Hub gRPC endpoint for MainNet. Provides high-performance gRPC access for Cosmos SDK queries and operations.",
      npmPackage: "@cosmjs/stargate",
      documentation: "https://cosmos.network/",
      network: "mainnet",
      serviceType: "grpc",
    },
    {
      name: "Mintscan API (Cosmostation)",
      url: "https://apis.mintscan.io/v1",
      port: 443,
      protocol: "https",
      type: "Indexed API (Public, Optional API Key)",
      description: "Enterprise-grade indexed API by Cosmostation. Provides account balance, transaction history with pagination, validator information, and historical statistics. Free tier: 2 req/sec, 10,000 calls/day. Optional API key for higher limits.",
      npmPackage: "@cosmjs/stargate",
      documentation: "https://docs.cosmostation.io/apis",
      network: "mainnet",
      serviceType: "api",
    },
    {
      name: "ATOMScan - MainNet LCD",
      url: "https://cosmos.lcd.atomscan.com",
      port: 443,
      protocol: "https",
      type: "LCD/REST Gateway (Public)",
      description: "Public LCD/REST gateway for MainNet. Provides account balance, transaction history, delegations, validators, and transaction broadcasting. No API key required.",
      npmPackage: "@cosmjs/stargate",
      documentation: "https://atomscan.com/",
      network: "mainnet",
      serviceType: "lcd",
    },
    {
      name: "ATOMScan - MainNet RPC",
      url: "https://cosmos.rpc.atomscan.com",
      port: 443,
      protocol: "https",
      type: "RPC Gateway (Public)",
      description: "Public RPC gateway for MainNet. Provides direct Tendermint RPC access for querying blockchain state and broadcasting transactions. No API key required.",
      npmPackage: "@cosmjs/stargate",
      documentation: "https://atomscan.com/",
      network: "mainnet",
      serviceType: "rpc",
    },
    {
      name: "QuickAPI - LCD",
      url: "https://cosmos-lcd.quickapi.com",
      port: 443,
      protocol: "https",
      type: "LCD/REST Node (Public)",
      description: "Public LCD/REST endpoint via QuickAPI. Provides standard Cosmos SDK gRPC-gateway REST API for account queries, transaction broadcasting, and staking operations.",
      npmPackage: "@cosmjs/stargate",
      documentation: "https://quickapi.com/",
      network: "mainnet",
      serviceType: "lcd",
    },
    {
      name: "QuickAPI - RPC",
      url: "https://cosmos-rpc.quickapi.com",
      port: 443,
      protocol: "https",
      type: "RPC Node (Public)",
      description: "Public RPC endpoint via QuickAPI. Provides Tendermint RPC access for blockchain queries and transaction broadcasting.",
      npmPackage: "@cosmjs/stargate",
      documentation: "https://quickapi.com/",
      network: "mainnet",
      serviceType: "rpc",
    },
    {
      name: "Keplr - LCD",
      url: "https://lcd-cosmoshub.keplr.app",
      port: 443,
      protocol: "https",
      type: "LCD/REST Node (Public)",
      description: "Public LCD/REST endpoint provided by Keplr wallet. Provides standard Cosmos SDK gRPC-gateway REST API for account queries and transaction operations.",
      npmPackage: "@cosmjs/stargate",
      documentation: "https://www.keplr.app/",
      network: "mainnet",
      serviceType: "lcd",
    },
    {
      name: "Keplr - RPC",
      url: "https://rpc-cosmoshub.keplr.app",
      port: 443,
      protocol: "https",
      type: "RPC Node (Public)",
      description: "Public RPC endpoint provided by Keplr wallet. Provides Tendermint RPC access for blockchain queries and transaction broadcasting.",
      npmPackage: "@cosmjs/stargate",
      documentation: "https://www.keplr.app/",
      network: "mainnet",
      serviceType: "rpc",
    },
    {
      name: "Notional Ventures - LCD",
      url: "https://rest-cosmoshub-ia.cosmosia.notional.ventures",
      port: 443,
      protocol: "https",
      type: "LCD/REST Node (Public)",
      description: "Public LCD/REST endpoint via Notional Ventures. Provides standard Cosmos SDK gRPC-gateway REST API for account queries, transaction broadcasting, and staking operations.",
      npmPackage: "@cosmjs/stargate",
      documentation: "https://notional.ventures/",
      network: "mainnet",
      serviceType: "lcd",
    },
    {
      name: "Notional Ventures - RPC",
      url: "https://rpc-cosmoshub-ia.cosmosia.notional.ventures",
      port: 443,
      protocol: "https",
      type: "RPC Node (Public)",
      description: "Public RPC endpoint via Notional Ventures. Provides Tendermint RPC access for blockchain queries and transaction broadcasting.",
      npmPackage: "@cosmjs/stargate",
      documentation: "https://notional.ventures/",
      network: "mainnet",
      serviceType: "rpc",
    },
    {
      name: "StakeTab - LCD",
      url: "https://cosmos-rest.staketab.org",
      port: 443,
      protocol: "https",
      type: "LCD/REST Node (Public)",
      description: "Public LCD/REST endpoint via StakeTab. Provides standard Cosmos SDK gRPC-gateway REST API for account queries, transaction broadcasting, and staking operations.",
      npmPackage: "@cosmjs/stargate",
      documentation: "https://staketab.com/",
      network: "mainnet",
      serviceType: "lcd",
    },
    {
      name: "StakeTab - RPC",
      url: "https://cosmos-rpc.staketab.org",
      port: 443,
      protocol: "https",
      type: "RPC Node (Public)",
      description: "Public RPC endpoint via StakeTab. Provides Tendermint RPC access for blockchain queries and transaction broadcasting.",
      npmPackage: "@cosmjs/stargate",
      documentation: "https://staketab.com/",
      network: "mainnet",
      serviceType: "rpc",
    },
    {
      name: "Cosmos Directory - LCD",
      url: "https://rest.cosmos.directory/cosmoshub",
      port: 443,
      protocol: "https",
      type: "LCD/REST Node (Public)",
      description: "Public LCD/REST endpoint via Cosmos Directory. Provides standard Cosmos SDK gRPC-gateway REST API for account queries, transaction broadcasting, and staking operations.",
      npmPackage: "@cosmjs/stargate",
      documentation: "https://cosmos.directory/",
      network: "mainnet",
      serviceType: "lcd",
    },
    {
      name: "Cosmos Directory - RPC",
      url: "https://rpc.cosmos.directory/cosmoshub",
      port: 443,
      protocol: "https",
      type: "RPC Node (Public)",
      description: "Public RPC endpoint via Cosmos Directory. Provides Tendermint RPC access for blockchain queries and transaction broadcasting.",
      npmPackage: "@cosmjs/stargate",
      documentation: "https://cosmos.directory/",
      network: "mainnet",
      serviceType: "rpc",
    },
    {
      name: "WhisperNode - LCD",
      url: "https://lcd-cosmos.whispernode.com",
      port: 443,
      protocol: "https",
      type: "LCD/REST Node (Public)",
      description: "Public LCD/REST endpoint via WhisperNode. Provides standard Cosmos SDK gRPC-gateway REST API for account queries, transaction broadcasting, and staking operations.",
      npmPackage: "@cosmjs/stargate",
      documentation: "https://whispernode.com/",
      network: "mainnet",
      serviceType: "lcd",
    },
    {
      name: "Stride - MainNet RPC",
      url: "https://stride-rpc.polkachu.com",
      port: 443,
      protocol: "https",
      type: "RPC Node (Public)",
      description: "Public RPC endpoint for Stride chain (used for liquid staking). Provides Tendermint RPC access for blockchain queries and transaction broadcasting.",
      npmPackage: "@cosmjs/stargate",
      documentation: "https://stride.zone/",
      network: "mainnet",
      serviceType: "rpc",
    },
    {
      name: "Stride - MainNet REST",
      url: "https://stride-api.polkachu.com",
      port: 443,
      protocol: "https",
      type: "REST/LCD API (Public)",
      description: "Public REST/LCD endpoint for Stride chain (used for liquid staking). Provides gRPC-gateway REST API for Cosmos SDK queries and operations.",
      npmPackage: "@cosmjs/stargate",
      documentation: "https://stride.zone/",
      network: "mainnet",
      serviceType: "rest",
    },
    {
      name: "Stride - MainNet gRPC",
      url: "stride-grpc.polkachu.com",
      port: 12290,
      protocol: "grpc",
      type: "gRPC Node (Public)",
      description: "Public gRPC endpoint for Stride chain (used for liquid staking). Provides high-performance gRPC access for Cosmos SDK queries and operations.",
      npmPackage: "@cosmjs/stargate",
      documentation: "https://stride.zone/",
      network: "mainnet",
      serviceType: "grpc",
    },
    {
      name: "Persistence - MainNet RPC",
      url: "https://rpc.persistence.one",
      port: 443,
      protocol: "https",
      type: "RPC Node (Public)",
      description: "Public RPC endpoint for Persistence chain (used for pStake liquid staking). Provides Tendermint RPC access for blockchain queries and transaction broadcasting.",
      npmPackage: "@cosmjs/stargate",
      documentation: "https://persistence.one/",
      network: "mainnet",
      serviceType: "rpc",
    },
    {
      name: "Persistence - MainNet REST",
      url: "https://rest.persistence.one",
      port: 443,
      protocol: "https",
      type: "REST/LCD API (Public)",
      description: "Public REST/LCD endpoint for Persistence chain (used for pStake liquid staking). Provides gRPC-gateway REST API for Cosmos SDK queries and operations.",
      npmPackage: "@cosmjs/stargate",
      documentation: "https://persistence.one/",
      network: "mainnet",
      serviceType: "rest",
    },
    {
      name: "Persistence - MainNet gRPC",
      url: "grpc.persistence.one",
      port: 443,
      protocol: "grpc",
      type: "gRPC Node (Public)",
      description: "Public gRPC endpoint for Persistence chain (used for pStake liquid staking). Provides high-performance gRPC access for Cosmos SDK queries and operations.",
      npmPackage: "@cosmjs/stargate",
      documentation: "https://persistence.one/",
      network: "mainnet",
      serviceType: "grpc",
    },
  ],

  decryptKeystore: async (keystore: unknown, password: string): Promise<string> => {
    try {
      const cosmosKeystore = keystore as {
        kdf?: string;
        kdfparams?: { salt: string; n: number; r: number; p: number };
        ciphertext: string;
        cipher: string;
        cipherparams?: { iv: string };
        mac?: string;
      };

      console.log('🔧 Decrypting Cosmos keystore...');

      // Handle different keystore formats (similar to Ethereum but adapted for Cosmos)
      if (cosmosKeystore.cipher === 'aes-128-ctr' || cosmosKeystore.cipher === 'aes-256-ctr') {
        const cryptoJs = await import('crypto-js');

        console.log('📝 Using AES-CTR decryption for Cosmos keystore');

        // Decode the ciphertext and other parameters
        const ciphertext = cryptoJs.enc.Hex.parse(cosmosKeystore.ciphertext);
        const iv = cosmosKeystore.cipherparams?.iv ?
          cryptoJs.enc.Hex.parse(cosmosKeystore.cipherparams.iv) :
          cryptoJs.lib.WordArray.random(16);

        // Use PBKDF2 for key derivation (common in Cosmos keystores)
        const salt = cosmosKeystore.kdfparams?.salt ?
          cryptoJs.enc.Hex.parse(cosmosKeystore.kdfparams.salt) :
          cryptoJs.lib.WordArray.random(32);

        const derivedKey = cryptoJs.PBKDF2(password, salt, {
          keySize: 256 / 32,
          iterations: cosmosKeystore.kdfparams?.n || 262144,
          hasher: cryptoJs.algo.SHA256
        });

        // Decrypt using AES-CTR
        const cipherParams = cryptoJs.lib.CipherParams.create({
          ciphertext: ciphertext
        });
        const decrypted = cryptoJs.AES.decrypt(
          cipherParams,
          derivedKey,
          {
            iv: iv,
            mode: cryptoJs.mode.CTR,
            padding: cryptoJs.pad.NoPadding
          }
        );

        const decryptedText = decrypted.toString(cryptoJs.enc.Utf8);

        if (!decryptedText) {
          throw new Error('Invalid password - failed to decrypt');
        }

        console.log(`✅ Cosmos keystore decrypted successfully, ${decryptedText.length} characters`);
        return decryptedText;
      }

      // Handle simpler encryption methods
      const cryptoJs = await import('crypto-js');
      const decrypted = cryptoJs.AES.decrypt(cosmosKeystore.ciphertext, password);
      const decryptedText = decrypted.toString(cryptoJs.enc.Utf8);

      if (!decryptedText) {
        throw new Error('Invalid password or corrupted keystore');
      }

      return decryptedText;
    } catch (error) {
      throw new Error(`Failed to decrypt Cosmos keystore: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  deriveFromPrivateKey: async (privateKey: string): Promise<DerivedInfo> => {
    // Import dependencies when needed to avoid loading them if not used
    const secp = await import('@noble/secp256k1');
    const { sha256 } = await import('@noble/hashes/sha256');
    const { ripemd160 } = await import('@noble/hashes/ripemd160');
    const bech32 = await import('bech32');
    const bs58 = await import('bs58');

    // Helper function to convert hex string to Uint8Array
    const hexToBytes = (hex: string): Uint8Array => {
      if (hex.length % 2 !== 0) {
        throw new Error('Invalid hex string length');
      }
      const bytes = new Uint8Array(hex.length / 2);
      for (let i = 0; i < hex.length; i += 2) {
        bytes[i / 2] = parseInt(hex.substring(i, i + 2), 16);
      }
      return bytes;
    };

    console.log("ATOM case entered with priv:", privateKey);
    try {
      const trimmedPriv = privateKey.trim();
      let sk: Uint8Array;

      // Handle different Cosmos private key formats
      if (trimmedPriv.startsWith("cosmos1")) {
        throw new Error("Cannot derive from address. Please provide a private key, not an address.");
      } else if (trimmedPriv.startsWith("cosmospub")) {
        throw new Error("Cannot derive from public key. Please provide a private key.");
      } else if (trimmedPriv.startsWith("cosmospriv")) {
        // Handle base58 encoded Cosmos private key
        console.log("Processing cosmospriv format private key");

        const decoded = bs58.default.decode(trimmedPriv);
        console.log("Decoded length:", decoded.length);

        // Cosmos private key format: prefix + key + checksum
        if (decoded.length === 41) {
          // Standard format: 4-byte prefix + 32-byte key + 4-byte checksum
          sk = decoded.slice(4, 36);
        } else if (decoded.length === 37) {
          // Alternative format
          sk = decoded.slice(4, 36);
        } else {
          throw new Error(`Invalid cosmospriv private key length: ${decoded.length}. Expected around 41 bytes.`);
        }
      } else if (trimmedPriv.startsWith("0x")) {
        // Handle hex format with 0x prefix
        console.log("Processing 0x hex format private key");
        const hex = trimmedPriv.slice(2);

        if (!hex || hex.length === 0) {
          throw new Error("Private key cannot be empty");
        }

        if (!/^[0-9a-fA-F]+$/i.test(hex)) {
          throw new Error("Invalid hex format. Only hexadecimal characters allowed.");
        }

        if (hex.length !== 64) {
          throw new Error(`Invalid hex length: ${hex.length}. Expected 64 characters (32 bytes).`);
        }

        sk = hexToBytes(hex);
      } else if (trimmedPriv.length === 64 && /^[0-9a-fA-F]+$/.test(trimmedPriv)) {
        // Handle hex format without 0x prefix
        console.log("Processing hex format (64 chars) private key");
        sk = hexToBytes(trimmedPriv);
      } else if (trimmedPriv.length === 128 && /^[0-9a-fA-F]+$/.test(trimmedPriv)) {
        // Handle extended hex format (64 bytes, take first 32)
        console.log("Processing extended hex format (128 chars) private key");
        sk = hexToBytes(trimmedPriv.slice(0, 64));
      } else {
        // Try base58 decoding as fallback
        try {
          console.log("Attempting base58 decoding as fallback");
          const decoded = bs58.default.decode(trimmedPriv);

          if (decoded.length === 32) {
            sk = decoded;
          } else if (decoded.length > 32) {
            sk = decoded.slice(0, 32);
          } else {
            throw new Error(`Decoded key too short: ${decoded.length} bytes`);
          }
        } catch (base58Error) {
          throw new Error("Invalid private key format. Supported formats: hex (64 chars), cosmospriv (base58), or 0x prefixed hex.");
        }
      }

      if (sk.length !== 32) {
        throw new Error(`Invalid private key length: ${sk.length} bytes. Cosmos requires 32 bytes.`);
      }

      console.log("Private key processed successfully, deriving public key...");

      // Derive public key using secp256k1
      const pubKeyCompressed = secp.getPublicKey(sk, true);
      const pubKeyUncompressed = secp.getPublicKey(sk, false);

      console.log("secp256k1 public keys derived:", toHex(pubKeyCompressed).slice(0, 10) + "...");

      // Create Cosmos address: RIPEMD160(SHA-256(public key compressed))
      const sha256Hash = sha256(pubKeyCompressed);
      const addressBytes = ripemd160(sha256Hash);
      console.log("Address hash computed:", toHex(addressBytes));

      // Encode as Bech32 with 'cosmos' prefix
      const words = bech32.bech32.toWords(addressBytes);
      const address = bech32.bech32.encode(COSMOS_PREFIX.cosmos, words);
      console.log("Cosmos address generated:", address);

      return {
        publicKey: toHex(pubKeyCompressed),
        publicKeyUncompressed: toHex(pubKeyUncompressed),
        address: address
      };

    } catch (error) {
      console.error("ATOM derivation error:", error);
      throw new Error(`Cosmos derivation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  getBlockExplorerLink: (address: string, format?: string): string | null => {
    // Cosmos uses mintscan.io for address exploration
    // Format parameter is ignored since Cosmos has a single Bech32 address format
    return `https://www.mintscan.io/cosmos/account/${address}`;
  }
};
