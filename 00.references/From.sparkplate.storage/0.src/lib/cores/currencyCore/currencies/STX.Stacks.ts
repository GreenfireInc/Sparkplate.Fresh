// Stacks (STX) Currency Implementation
// Source: Cryptocurrency Data
// Research Data Compiled from Multiple Sources

import type { CurrencyData, DerivedInfo } from './currencyData';
import { toHex, fromHex } from './utils';
import { getExpectedStacksBitcoinAddress } from '@/lib/cores/currencyCore/currencies/ext';

// Test function to verify the implementation with known seed phrase
export async function testSeedPhraseDerivation(): Promise<void> {
  const testSeedPhrase = "island lecture powder business replace deputy boring jungle quote pelican pepper nut venue test radar tool shallow planet weather chef dumb budget affair match";
  const expectedSegwit = getExpectedStacksBitcoinAddress('NATIVE_SEGWIT');
  const expectedTaproot = getExpectedStacksBitcoinAddress('TAPROOT');

  console.log("Testing seed phrase derivation...");
  console.log("Seed phrase:", testSeedPhrase);

  try {
    const result = await stacksData.deriveFromPrivateKey(testSeedPhrase);
    console.log("Derived result:", result);

    const formatParts = result.format?.split('|') || [];
    const actualSegwit = formatParts[0];
    const actualTaproot = formatParts[1];

    console.log("Expected SegWit:", expectedSegwit);
    console.log("Actual SegWit:", actualSegwit);
    console.log("SegWit Match:", actualSegwit === expectedSegwit);

    console.log("Expected Taproot:", expectedTaproot);
    console.log("Actual Taproot:", actualTaproot);
    console.log("Taproot Match:", actualTaproot === expectedTaproot);

    if (actualSegwit !== expectedSegwit || actualTaproot !== expectedTaproot) {
      throw new Error("Address mismatch - implementation needs fixing");
    }

    console.log("✅ All addresses match expected values!");
  } catch (error) {
    console.error("❌ Test failed:", error);
    throw error;
  }
}

export const stacksData: CurrencyData = {
  basicInfo: {
    name: "Stacks",
    symbolTicker: "STX",
    description: "A blockchain platform that brings smart contracts and decentralized applications to Bitcoin. Stacks uses Proof of Transfer consensus to inherit Bitcoin's security while enabling smart contracts.",
    creator: "Muneeb Ali and Ryan Shea",
    debutYear: 2021,
    website: "https://stacks.org/",
    whitePaper: "https://gaia.blockstack.org/hub/1AxyPunHHAHiEffXWESKfbvmBpGQv138Fp/stacks.pdf",
    primaryNFTMarketplace: "https://gamma.io/",
    secondaryNFTMarketplace: "https://tradeport.xyz/stacks",
  },

  technicalInfo: {
    proofingType: "Other",
    class: "Layer 2 Blockchain (Bitcoin Layer / Proof of Transfer)",
    totalSupply: "1,818,000,000 STX (fixed supply)",
    libraryHashing: "SHA-256, SHA-512",
    librarySigning: "ECDSA-secp256k1",
    mnemonicSeedPhraseLengths: "24 words (BIP39)",
    privateKeyFormat: "64-character hexadecimal (32 bytes) or WIF or 24-word seed phrase",
    privateKeyToPublicKeyCurve: "secp256k1",
    publicKeyToPublicWalletAddressHashing: "SHA-256 + RIPEMD-160 + C32Check encoding",
    NPMLibraryHashing: "@noble/hashes",
    NPMLibrarySigning: "@noble/secp256k1",
    keyStoreFormat: "Stacks JSON Keystore (AES encrypted)",
    jsonFormat: "Stacks SIP-010 / Clarity JSON",
    smartContractLanguage: "Clarity (decidable smart contract language)",
    primaryNPMPackage: "@stacks/transactions",
    secondaryNPMPackage: "@stacks/network",
    tertiaryNPMPackage: "@noble/secp256k1",
    web3ConnectMechanism: "Stacks Connect / Leather Wallet / Xverse",
    nativeWallet: "Leather Wallet (formerly Hiro) / Xverse",
    humanReadableAddressingPlatform: "BNS (Bitcoin Name System) / .btc domains",
    humanReadableAddressingNPMPackage: "@stacks/bns",
    SendingMechanism: "Stacks transaction broadcasting (anchored to Bitcoin)",
    NFTMintingMechanism: "SIP-009 (Stacks NFT standard)",
    AssetTokenSupportAndMechanism: "SIP-010 (Stacks fungible token standard)",
    evmChainID: "N/A (Stacks VM with Clarity, non-EVM Bitcoin Layer 2)",
    typicalDerivationPath: "m/44'/5757'/0'/0/0 (BIP44 Stacks standard)",
    sendingFunctionality: "@stacks/transactions makeSTXTokenTransfer() and broadcastTransaction()",
  },

  dex: [
    {
      name: "Velar",
      url: "https://www.velar.co/",
      type: "Liquidity Protocol",
      description: "Leading liquidity protocol on Stacks with concentrated liquidity and yield farming",
    },
    {
      name: "ALEX",
      url: "https://alexgo.io/",
      type: "DeFi Platform",
      description: "Comprehensive DeFi hub with AMM, orderbook, lending, and launchpad on Bitcoin via Stacks",
    },
    {
      name: "StackSwap",
      url: "https://www.stackswap.org/",
      type: "AMM DEX",
      description: "First AMM DEX on Stacks, bringing DeFi to Bitcoin",
    },
    {
      name: "Arkadiko Swap",
      url: "https://arkadiko.finance/",
      type: "DeFi Protocol",
      description: "DeFi protocol with decentralized stablecoin and AMM swap functionality",
    },
    {
      name: "LNSwap",
      url: "https://lnswap.org/",
      type: "Lightning Swap",
      description: "Trustless atomic swaps between Bitcoin Lightning and on-chain BTC/STX",
    },
    {
      name: "Bitflow",
      url: "https://www.bitflow.finance/",
      type: "Bitcoin DeFi",
      description: "Native Bitcoin DEX using UTXO-based swaps on Stacks",
    },
    {
      name: "Charisma",
      url: "https://charisma.rocks/",
      type: "Gaming DEX",
      description: "Gamified DeFi platform with token swaps and yield opportunities",
    },
  ],

  stakingProviders: [
    {
      name: "Native Stacking (PoX)",
      url: "https://stacks.org/stacking",
      type: "Proof of Transfer Stacking",
      description: "Lock STX to earn Bitcoin rewards through native Stacking consensus mechanism",
    },
    {
      name: "Xverse Wallet Stacking",
      url: "https://www.xverse.app/",
      type: "Wallet Stacking",
      description: "Stack STX directly from Xverse wallet and earn BTC rewards",
    },
    {
      name: "Leather Wallet Stacking",
      url: "https://leather.io/",
      type: "Wallet Stacking",
      description: "Stack STX through Leather (formerly Hiro) wallet",
    },
    {
      name: "Friedger Pool",
      url: "https://pool.friedger.de/",
      type: "Stacking Pool",
      description: "Community-run Stacking pool for smaller STX holders",
    },
    {
      name: "Planbetter Pool",
      url: "https://planbetter.org/",
      type: "Stacking Pool",
      description: "Decentralized Stacking pool with open participation",
    },
    {
      name: "OKX Stacking",
      url: "https://www.okx.com/earn",
      type: "Exchange Stacking",
      description: "Stack STX through OKX exchange",
    },
    {
      name: "Staked.us",
      url: "https://staked.us/",
      type: "Institutional Stacking",
      description: "Enterprise-grade Stacking infrastructure",
    },
  ],

  miningPools: "N/A (Proof of Transfer - STX miners participate in Bitcoin mining, rewards paid in STX)",

  marketInfo: {
    allTimeHigh: {
      price: 3.61,
      currency: "USD",
      date: "2021-11-16",
    },
  },

  socialMedia: {
    discord: "https://discord.gg/stacks",
    instagram: "https://www.instagram.com/stacks/",
    linkedin: "https://www.linkedin.com/company/stacks-blockchain/",
    reddit: "https://www.reddit.com/r/stacks/",
    slack: "N/A",
    telegram: "https://t.me/StacksChat",
    twitterX: "https://twitter.com/Stacks",
  },

  identifiers: {
    UCID: "4847",
    identifierBraveNewCoin: "STX",
    identifierCoinAPI: "STX",
    identifierCoinCap: "stacks",
    identifierCoinGecko: "stacks",
    identifierCoinPaprika: "stx-stacks",
  },

  blockExplorer: {
    blockExplorerAPI: "https://api.mainnet.stacks.co/",
    blockExplorerLink: "https://explorer.stacks.co/address/",
  },

  rpcEndpoints: [
    {
      name: "Hiro Stacks API - MainNet",
      url: "https://api.hiro.so",
      port: 443,
      protocol: "https",
      type: "REST API (Public, Optional API Key)",
      description: "Official comprehensive REST API for Stacks blockchain. Provides high-performance REST interface, transaction queries and filtering, smart contract interaction and read-only calls, block and microblock data, account balance and nonce tracking, token metadata (FT and NFT), mempool tracking, search functionality, and fee estimation. Free access with rate limits. API key recommended for higher limits.",
      npmPackage: "@stacks/transactions",
      documentation: "https://docs.hiro.so/stacks-blockchain-api",
      network: "mainnet",
      serviceType: "rest-api",
    },
    {
      name: "Hiro Stacks API - TestNet",
      url: "https://api.testnet.hiro.so",
      port: 443,
      protocol: "https",
      type: "REST API (Public, Optional API Key)",
      description: "Official comprehensive REST API for Stacks testnet. Provides high-performance REST interface for development and testing, transaction queries and filtering, smart contract interaction and read-only calls, block and microblock data, account balance and nonce tracking, token metadata (FT and NFT), mempool tracking, search functionality, and fee estimation. Free access with rate limits. API key recommended for higher limits.",
      npmPackage: "@stacks/transactions",
      documentation: "https://docs.hiro.so/stacks-blockchain-api",
      network: "testnet",
      serviceType: "rest-api",
    },
    {
      name: "Stacks Foundation - MainNet",
      url: "https://api.mainnet.stacks.co",
      port: 443,
      protocol: "https",
      type: "REST API (Public)",
      description: "Official Stacks Foundation mainnet API endpoint. Provides blockchain data access, transaction queries, block information, account data, and network statistics. Free access with rate limits, no API key required.",
      npmPackage: "@stacks/transactions",
      documentation: "https://docs.stacks.co/",
      network: "mainnet",
      serviceType: "rest-api",
    },
    {
      name: "QuickNode - MainNet",
      url: "https://YOUR-ENDPOINT.stacks-mainnet.quiknode.pro",
      port: 443,
      protocol: "https",
      type: "RPC / REST API (API Key Required)",
      description: "Fast RPC nodes and comprehensive Web3 APIs for Stacks. Provides fast RPC node access, high-performance infrastructure, custom endpoints, WebSocket support, archive data access, multi-network support, and REST and RPC methods. Free tier available with registration. Requires API key.",
      npmPackage: "@stacks/transactions",
      documentation: "https://www.quicknode.com/docs/stacks",
      network: "mainnet",
      serviceType: "rpc",
      requiresApiKey: true,
    },
    {
      name: "NOWNodes - MainNet",
      url: "https://stx.nownodes.io",
      port: 443,
      protocol: "https",
      type: "REST API (API Key Required)",
      description: "Full node access and block explorers via API key. Provides full node access, multiple network support, high availability, REST endpoints, real-time data, transaction broadcasting, and contract interaction. Free tier: 5000 requests/month. Requires API key.",
      npmPackage: "axios",
      documentation: "https://nownodes.io/documentation",
      network: "mainnet",
      serviceType: "rest-api",
      requiresApiKey: true,
    },
  ],

  decryptKeystore: async (keystore: unknown, password: string): Promise<string> => {
    try {
      const stacksKeystore = keystore as {
        encrypted?: boolean;
        ciphertext?: string;
        salt?: string;
        kdf?: string;
        version?: string;
      };

      console.log('🔧 Decrypting Stacks keystore...');

      if (!stacksKeystore.ciphertext || !stacksKeystore.encrypted) {
        throw new Error('Invalid keystore format');
      }

      // Use CryptoJS for AES decryption (common for Stacks keystores)
      const cryptoJs = await import('crypto-js');

      // Extract parameters
      const { ciphertext, salt } = stacksKeystore;

      // Decrypt using AES
      const decrypted = cryptoJs.AES.decrypt(ciphertext, password);

      const decryptedText = decrypted.toString(cryptoJs.enc.Utf8);

      if (!decryptedText) {
        throw new Error('Invalid password or corrupted keystore');
      }

      console.log(`✅ Stacks keystore decrypted successfully`);
      return decryptedText;
    } catch (error) {
      throw new Error(`Failed to decrypt Stacks keystore: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  deriveFromPrivateKey: async (privateKey: string): Promise<DerivedInfo> => {
    try {
      console.log('🔧 [STX ROUTER] Routing Stacks address derivation...');

      // Multi-format mode: Generate all address formats
      console.log('🔄 [STX ROUTER] Generating all Stacks address formats...');

      const trimmedPriv = privateKey.trim();

      // Import required Stacks libraries
      const { createStacksPublicKey, publicKeyToAddressSingleSig } = await import('@stacks/transactions');
      const { STACKS_MAINNET, STACKS_TESTNET } = await import('@stacks/network');

      // Import Bitcoin libraries for multi-format addresses
      const secp = await import('@noble/secp256k1');
      const { decode: wifDecode } = await import('wif');

      // Import BIP39 and HD key libraries for seed phrase support
      const bip39 = await import('bip39');
      const { HDKey } = await import('@scure/bip32');

      // Step 1: Parse the input - could be private key, WIF, or seed phrase
      let stacksPrivateKeyBytes: Uint8Array;
      let rootKeychain: InstanceType<typeof HDKey> | null = null;

      try {
        // Check if input is a 24-word seed phrase
        const words = trimmedPriv.split(/\s+/).filter(word => word.length > 0);
        if (words.length === 24) {
          console.log("Detected 24-word seed phrase, deriving keys...");

          // Validate that all words are valid BIP39 words
          const invalidWords = words.filter(word => !bip39.wordlists.english.includes(word));
          if (invalidWords.length > 0) {
            throw new Error(`Invalid BIP39 words: ${invalidWords.join(', ')}`);
          }

          // Convert seed phrase to seed bytes
          const seedPhrase = words.join(' ');
          const seed = await bip39.mnemonicToSeed(seedPhrase);

          // Create HD key from seed
          rootKeychain = HDKey.fromMasterSeed(seed);

          // Derive Stacks private key using proper derivation path: m/44'/5757'/0'/0/0
          const stacksPath = "m/44'/5757'/0'/0/0";
          const stacksDerivedKey = rootKeychain.derive(stacksPath);

          if (!stacksDerivedKey.privateKey) {
            throw new Error('Failed to derive Stacks private key from seed phrase');
          }

          stacksPrivateKeyBytes = new Uint8Array(stacksDerivedKey.privateKey);
          console.log("Successfully derived Stacks private key from seed phrase");
        }
        // First try to parse as WIF (Wallet Import Format)
        else if (trimmedPriv.length >= 50 && trimmedPriv.length <= 52) { // Typical WIF length
          try {
            const decoded = wifDecode(trimmedPriv);
            stacksPrivateKeyBytes = new Uint8Array(decoded.privateKey);
          } catch (wifError) {
            throw new Error(`Invalid WIF key: ${wifError.message}`);
          }
        }
        // Handle hex format (with or without 0x prefix)
        else {
          try {
            stacksPrivateKeyBytes = fromHex(trimmedPriv);

            if (stacksPrivateKeyBytes.length !== 32) {
              throw new Error(`Expected 32 bytes, got ${stacksPrivateKeyBytes.length}`);
            }
          } catch (hexError) {
            throw new Error(`Invalid private key format. Expected hex (64 chars), WIF, or 24-word seed phrase: ${hexError.message}`);
          }
        }
      } catch (error) {
        throw new Error(`Failed to parse input: ${error.message}`);
      }

      // Step 2: Generate Stacks addresses from Stacks private key
      const stacksPublicKeyCompressed = secp.getPublicKey(stacksPrivateKeyBytes, true);
      const stacksPublicKey = createStacksPublicKey(stacksPublicKeyCompressed);

      // Generate mainnet address (default)
      const mainnetAddress = publicKeyToAddressSingleSig(stacksPublicKey.data, STACKS_MAINNET);

      // Generate testnet address for completeness
      const testnetAddress = publicKeyToAddressSingleSig(stacksPublicKey.data, STACKS_TESTNET);

      console.log('✅ [STX ROUTER] Stacks addresses generated:');
      console.log(`📍 [STX ROUTER] Mainnet: ${mainnetAddress}`);
      console.log(`📍 [STX ROUTER] Testnet: ${testnetAddress}`);

      // Step 3: Generate Bitcoin addresses using proper derivation paths
      let btcNativeSegwitAddress: string;
      let btcTaprootAddress: string;

      if (rootKeychain) {
        // For seed phrases, derive separate keys for BTC using correct paths
        console.log("Deriving BTC addresses from seed phrase using proper paths...");

        // BTC Native SegWit: m/84'/0'/0'/0/0 (mainnet)
        const segwitPath = "m/84'/0'/0'/0/0";
        const segwitDerivedKey = rootKeychain.derive(segwitPath);
        if (!segwitDerivedKey.privateKey) {
          throw new Error('Failed to derive BTC SegWit private key');
        }
        const segwitPrivateKeyBytes = new Uint8Array(segwitDerivedKey.privateKey);
        btcNativeSegwitAddress = await generateBitcoinNativeSegwitAddress(segwitPrivateKeyBytes);

        // BTC Taproot: m/86'/0'/0'/0/0 (mainnet)
        const taprootPath = "m/86'/0'/0'/0/0";
        const taprootDerivedKey = rootKeychain.derive(taprootPath);
        if (!taprootDerivedKey.privateKey) {
          throw new Error('Failed to derive BTC Taproot private key');
        }
        const taprootPrivateKeyBytes = new Uint8Array(taprootDerivedKey.privateKey);
        btcTaprootAddress = await generateBitcoinTaprootAddress(taprootPrivateKeyBytes);

      } else {
        // For direct private keys, use the same key for all addresses (legacy behavior)
        console.log("Using direct private key for BTC addresses (legacy mode)...");
        btcNativeSegwitAddress = await generateBitcoinNativeSegwitAddress(stacksPrivateKeyBytes);
        btcTaprootAddress = await generateBitcoinTaprootAddress(stacksPrivateKeyBytes);
      }

      console.log('✅ [STX ROUTER] Bitcoin addresses generated:');
      console.log(`📍 [STX ROUTER] Native SegWit: ${btcNativeSegwitAddress}`);
      console.log(`📍 [STX ROUTER] Taproot: ${btcTaprootAddress}`);

      // Create formatted multi-line display with protocol prefixes for UI
      const formattedDisplay = `Mainnet://${mainnetAddress}\nTestnet://${testnetAddress}\nNativeSegwit://${btcNativeSegwitAddress}\nTaproot://${btcTaprootAddress}`;

      // Return the mainnet address as the primary address (most compatible)
      return {
        publicKey: toHex(stacksPublicKeyCompressed),
        address: mainnetAddress, // Primary address (Stacks mainnet) without protocol prefix
        // Include all address formats for reference
        mainnetAddress: mainnetAddress,
        testnetAddress: testnetAddress,
        nativeSegwitAddress: btcNativeSegwitAddress,
        taprootAddress: btcTaprootAddress,
        // Formatted multi-line display for UI with protocol prefixes
        formattedDisplay: formattedDisplay,
        // Include raw addresses without protocol prefixes for backward compatibility
        rawMainnetAddress: mainnetAddress,
        rawTestnetAddress: testnetAddress,
        rawNativeSegwitAddress: btcNativeSegwitAddress,
        rawTaprootAddress: btcTaprootAddress,
        // Include the actual derived private key for display
        derivedPrivateKey: toHex(stacksPrivateKeyBytes)
      };

    } catch (error) {
      console.error('[STX ROUTER] Stacks derivation routing error:', error);
      throw new Error(`Stacks derivation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  getBlockExplorerLink: (address: string, format?: string): string | null => {
    // Stacks uses explorer.stacks.co for address exploration
    // For multi-format addresses, different explorers could be used based on format:
    if (format === 'NativeSegwit' || format === 'Taproot') {
      // Bitcoin addresses should use Bitcoin explorer
      return `https://mempool.space/address/${address}`;
    }
    // Default to Stacks explorer for Mainnet/Testnet addresses
    return `https://explorer.stacks.co/address/${address}`;
  }
};

// Helper function to generate Bitcoin Native SegWit (P2WPKH) address
async function generateBitcoinNativeSegwitAddress(privateKeyBytes: Uint8Array): Promise<string> {
  const secp = await import('@noble/secp256k1');
  const btc = await import('@scure/btc-signer');

  // Generate compressed public key from private key
  const publicKeyCompressed = secp.getPublicKey(privateKeyBytes, true);

  // Create Native SegWit payment using @scure/btc-signer
  const payment = btc.p2wpkh(publicKeyCompressed, btc.NETWORK);

  if (!payment.address) {
    throw new Error('Failed to generate Native SegWit address');
  }

  // Validate that the address starts with "bc1q" (P2WPKH Bech32 format)
  if (!payment.address.startsWith('bc1q')) {
    throw new Error(`Generated Bitcoin Native SegWit address does not start with 'bc1q': ${payment.address}`);
  }

  return payment.address;
}

// Helper function to generate Bitcoin Taproot (P2TR) address
async function generateBitcoinTaprootAddress(privateKeyBytes: Uint8Array): Promise<string> {
  const secp = await import('@noble/secp256k1');
  const btc = await import('@scure/btc-signer');

  // Generate compressed public key from private key
  const internalPubKey = secp.getPublicKey(privateKeyBytes, true);

  // Convert ECDSA public key to Schnorr format (remove parity byte)
  // This matches the Stacks wallet implementation approach
  const schnorrPubKey = internalPubKey.slice(1);

  // Create Taproot payment using @scure/btc-signer
  // Use the simplified approach matching Stacks wallet implementation
  const payment = btc.p2tr(schnorrPubKey, undefined, btc.NETWORK, true);

  if (!payment.address) {
    throw new Error('Failed to generate Taproot address');
  }

  // Validate that the address starts with "bc1p" (P2TR Bech32m format)
  if (!payment.address.startsWith('bc1p')) {
    throw new Error(`Generated Bitcoin Taproot address does not start with 'bc1p': ${payment.address}`);
  }

  return payment.address;
}
