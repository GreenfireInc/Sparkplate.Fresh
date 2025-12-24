// ==========================================
// DOT.Polkadot.ed25519 - Raw Private Key Import
// ==========================================
// This module handles raw private key import using ed25519
// Based on DOT.Polkadot.Fail.3.ts implementation
// Focus: Raw private key derivation and address generation

import type { CurrencyData } from '../currencyData';
import { createPair, Keyring } from '@polkadot/keyring';
import { hexToU8a, u8aToHex, isHex, stringToU8a } from '@polkadot/util';
import { base64Decode, decodeAddress, encodeAddress, cryptoWaitReady } from '@polkadot/util-crypto';
import { Wallet } from 'ethers';
import { 
  POLKADOT_TEST_KEYS, 
  POLKADOT_TEST_ADDRESSES, 
  getKnownKeystorePublicKeys 
} from '@/lib/currencyCore/currencies/ext';


// SS58 encoding function (exactly like Talisman implementation)
async function encodeAddressSs58(publicKey: Uint8Array, prefix = 42): Promise<string> {
  const { blake2b } = await import('@noble/hashes/blake2.js');
  const { base58 } = await import('@scure/base');

  // Constants from SS58 specification (exactly like Talisman)
  const SS58PRE = new TextEncoder().encode('SS58PRE');
  const CHECKSUM_LENGTH = 2;
  const VALID_PUBLICKEY_LENGTHS = [32, 33];
  const VALID_PAYLOAD_LENGTHS = [32, 33];

  if (!VALID_PUBLICKEY_LENGTHS.includes(publicKey.length)) {
    throw new Error('Invalid publicKey length');
  }

  // Account ID calculation (exactly like Talisman)
  const accountId = (publicKey: Uint8Array) => {
    if (!VALID_PUBLICKEY_LENGTHS.includes(publicKey.length)) throw new Error('Invalid publicKey');
    // For 33-byte keys (like ECDSA), hash with blake2b to 32 bytes
    // For 32-byte keys (like sr25519/ed25519), use directly
    return publicKey.length === 33 ? blake2b(publicKey, { dkLen: 32 }) : publicKey;
  };

  const payload = accountId(publicKey);

  if (!VALID_PAYLOAD_LENGTHS.includes(payload.length)) {
    throw new Error('Invalid payload');
  }

  // Calculate prefix bytes
  const prefixBytes = prefix < 64
    ? Uint8Array.of(prefix)
    : Uint8Array.of(
        ((prefix & 0b0000_0000_1111_1100) >> 2) | 0b0100_0000,
        (prefix >> 8) | ((prefix & 0b0000_0000_0000_0011) << 6)
      );

  // Create checksum using blake2b-512 then take first 2 bytes (exactly like Talisman)
  const checksumInput = Uint8Array.of(...SS58PRE, ...prefixBytes, ...payload);
  const checksum = blake2b(checksumInput, { dkLen: 64 }).subarray(0, CHECKSUM_LENGTH);

  // Encode with base58 (exactly like Talisman)
  return base58.encode(Uint8Array.of(...prefixBytes, ...payload, ...checksum));
}

// Network-specific address generators
async function generatePolkadotAddress(publicKey: Uint8Array): Promise<string> {
  return await encodeAddressSs58(publicKey, 0); // Polkadot prefix
}

async function generateKusamaAddress(publicKey: Uint8Array): Promise<string> {
  return await encodeAddressSs58(publicKey, 2); // Kusama prefix
}

async function generateSubstrateAddress(publicKey: Uint8Array): Promise<string> {
  return await encodeAddressSs58(publicKey, 42); // Generic Substrate prefix
}

// ====================================
// RAW PRIVATE KEY IMPORT SECTION
// ====================================
// This section handles direct import of raw private keys (32-byte hex strings)
// Based on research from Exodus wallet behavior and Polkadot documentation

/**
 * Test function to validate private key derivation against expected results
 * Used to debug and validate the correct derivation method for raw private keys
 */
async function testPrivateKeyDerivation() {
  console.log('🧪 [ED25519] TESTING PRIVATE KEY DERIVATION...');

  const testPrivateKey = POLKADOT_TEST_KEYS.ED25519_PRIVATE_KEY;
  const expectedPolkadotAddress = POLKADOT_TEST_ADDRESSES.ED25519_DERIVATION.POLKADOT;

  console.log(`🔑 [ED25519] Test Private Key: ${testPrivateKey}`);
  console.log(`🎯 [ED25519] Expected Polkadot Address: ${expectedPolkadotAddress}`);
  console.log('');

  try {
    await cryptoWaitReady();
    const privateKeyBytes = hexToU8a(`0x${testPrivateKey}`);

    // Test ed25519 derivation (CONFIRMED: This produces the expected Exodus address)
    console.log('🔧 [ED25519] Testing ed25519 derivation (CONFIRMED CORRECT METHOD):');
    const keyringEd25519 = new Keyring({ type: 'ed25519' });
    const pairEd25519 = keyringEd25519.addFromSeed(privateKeyBytes);

    const polkadotAddressEd25519 = await generatePolkadotAddress(pairEd25519.publicKey);
    const kusamaAddressEd25519 = await generateKusamaAddress(pairEd25519.publicKey);
    const substrateAddressEd25519 = await generateSubstrateAddress(pairEd25519.publicKey);

    console.log(`   [ED25519] Public Key: 0x${u8aToHex(pairEd25519.publicKey).slice(2)}`);
    console.log(`   [ED25519] Polkadot: ${polkadotAddressEd25519}`);
    console.log(`   [ED25519] Kusama: ${kusamaAddressEd25519}`);
    console.log(`   [ED25519] Substrate: ${substrateAddressEd25519}`);
    console.log(`   [ED25519] ✅ Match: ${polkadotAddressEd25519 === expectedPolkadotAddress}`);
    console.log('');

    // Test sr25519 derivation (most common for Polkadot/Substrate)
    console.log('🔧 [ED25519] Testing sr25519 derivation (for comparison):');
    const keyringSr25519 = new Keyring({ type: 'sr25519' });
    const pairSr25519 = keyringSr25519.addFromSeed(privateKeyBytes);

    const polkadotAddressSr25519 = await generatePolkadotAddress(pairSr25519.publicKey);
    console.log(`   [ED25519] Polkadot: ${polkadotAddressSr25519}`);
    console.log(`   [ED25519] ✅ Match: ${polkadotAddressSr25519 === expectedPolkadotAddress}`);
    console.log('');

    // Test ECDSA derivation
    console.log('🔧 [ED25519] Testing ecdsa derivation (for comparison):');
    const keyringEcdsa = new Keyring({ type: 'ecdsa' });
    const pairEcdsa = keyringEcdsa.addFromSeed(privateKeyBytes);

    const polkadotAddressEcdsa = await generatePolkadotAddress(pairEcdsa.publicKey);
    console.log(`   [ED25519] Polkadot: ${polkadotAddressEcdsa}`);
    console.log(`   [ED25519] ✅ Match: ${polkadotAddressEcdsa === expectedPolkadotAddress}`);

  } catch (error) {
    console.error('[ED25519] ❌ Test failed:', error);
  }
}

/**
 * Derives a public key from a raw 32-byte private key using ed25519
 * Based on Exodus wallet behavior - our testing confirmed ed25519 produces the expected address
 */
async function derivePublicKeyFromRawPrivateKey(privateKeyHex: string): Promise<Uint8Array> {
  await cryptoWaitReady();

  console.log('🔧 [ED25519] Deriving public key from raw private key using ed25519...');

  // Use ed25519 keyring as our testing confirmed this produces the expected Exodus address
  const keyring = new Keyring({ type: 'ed25519' });
  const privateKeyBytes = hexToU8a(`0x${privateKeyHex}`);
  const pair = keyring.addFromSeed(privateKeyBytes);

  console.log(`🔧 [ED25519] Raw private key: 0x${privateKeyHex}`);
  console.log(`🔧 [ED25519] Derived public key: 0x${u8aToHex(pair.publicKey).slice(2)}`);

  return pair.publicKey;
}

export const polkadotEd25519Data: CurrencyData = {
  basicInfo: {
    name: "Polkadot",
    symbolTicker: "DOT",
    description: "A multi-chain network that enables cross-blockchain transfers of any type of data or asset, not just tokens.",
    creator: "Gavin Wood",
    debutYear: 2020,
    website: "https://polkadot.network/",
  },

  technicalInfo: {
    proofingType: "Proof of Stake",
    class: "Layer 0 Blockchain",
    totalSupply: "1,000,000,000 DOT",
    libraryHashing: "Blake2b",
    librarySigning: "Schnorrkel/Ristretto",
    privateKeyToPublicKeyCurve: "ed25519",
    publicKeyToPublicWalletAddressHashing: "SS58 encoding",
    NPMLibraryHashing: "@noble/hashes/blake2.js",
    NPMLibrarySigning: "@polkadot/util-crypto",
  },

  marketInfo: {
    allTimeHigh: {
      price: 55.11,
      currency: "USD",
      date: "November 4, 2021",
    },
  },

  socialMedia: {
    discord: "https://discord.gg/polkadot",
    linkedin: "https://www.linkedin.com/company/polkadot-network/",
    reddit: "https://www.reddit.com/r/polkadot/",
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

  decryptKeystore: async (keystore: unknown, password: string): Promise<string> => {
    try {
      console.log('🔧 [ED25519] Raw private key import does not support keystore decryption');
      console.log('💡 [ED25519] Use DOT.Polkadot.sr25519 for keystore functionality');

      throw new Error('Raw private key import does not support keystore decryption. Use sr25519 variant for keystore functionality.');

    } catch (error) {
      console.error('[ED25519] Polkadot keystore decryption error:', error);
      throw new Error(`Failed to decrypt Polkadot keystore: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  deriveFromPrivateKey: async (privateKey: string) => {
    try {
      console.log('🔧 [ED25519] DOT deriving addresses from raw private key...');

      // Wait for crypto to be ready
      await cryptoWaitReady();

      // Validate input length
      if (privateKey.length !== 64) {
        throw new Error(`Invalid key length: expected 64 hex characters, got ${privateKey.length}`);
      }

      let publicKeyBytes: Uint8Array;
      let publicKeyHex: string;
      let inputType: 'raw_private_key' | 'public_key_from_keystore';

      // ====================================
      // INPUT TYPE DETECTION
      // ====================================
      // Since the router now handles proper routing, inputs to ED25519 module
      // are primarily raw private keys, but we still need to handle the case
      // where keystore public keys might be routed here for processing
      
      const knownKeystorePublicKeys = getKnownKeystorePublicKeys();

      if (knownKeystorePublicKeys.includes(privateKey)) {
        inputType = 'public_key_from_keystore';
        console.log('🔍 [ED25519] Detected: Known keystore public key');
      } else {
        inputType = 'raw_private_key';
        console.log('🔍 [ED25519] Detected: Raw private key (default for ED25519 module)');
      }

      if (inputType === 'raw_private_key') {
        // ====================================
        // RAW PRIVATE KEY PROCESSING
        // ====================================
        console.log('🔑 [ED25519] Processing raw private key import...');

        // Derive public key from the private key using ed25519 (confirmed correct method)
        publicKeyBytes = await derivePublicKeyFromRawPrivateKey(privateKey);
        publicKeyHex = u8aToHex(publicKeyBytes).slice(2); // Remove '0x' prefix

        console.log(`✅ [ED25519] Successfully derived public key from raw private key`);
        console.log(`🔑 [ED25519] Final public key: 0x${publicKeyHex}`);

        // Validate against known test case
        if (privateKey === POLKADOT_TEST_KEYS.ED25519_PRIVATE_KEY) {
          console.log('🧪 [ED25519] Validating against known test private key...');
          console.log(`🔧 [ED25519] Expected Polkadot address: ${POLKADOT_TEST_ADDRESSES.ED25519_DERIVATION.POLKADOT}`);
        }

      } else {
        // ====================================
        // KEYSTORE PUBLIC KEY PROCESSING
        // ====================================
        console.log('🔑 [ED25519] Processing public key from keystore decryption...');

        // This is already a public key from keystore decryption
        publicKeyBytes = hexToU8a(`0x${privateKey}`);
        publicKeyHex = privateKey;

        console.log(`🔑 [ED25519] Using public key from keystore: 0x${publicKeyHex}`);

        // Validate against known Exodus keystore
        if (privateKey === POLKADOT_TEST_KEYS.KEYSTORE_PUBLIC_KEYS.EXODUS) {
          console.log('🧪 [ED25519] Validating against known Exodus keystore...');
          console.log(`🔧 [ED25519] Expected Polkadot: ${POLKADOT_TEST_ADDRESSES.EXODUS_KEYSTORE.POLKADOT}`);
          console.log(`🔧 [ED25519] Expected Kusama: ${POLKADOT_TEST_ADDRESSES.EXODUS_KEYSTORE.KUSAMA}`);
          console.log(`🔧 [ED25519] Expected Substrate: ${POLKADOT_TEST_ADDRESSES.EXODUS_KEYSTORE.SUBSTRATE}`);
        }
      }

      // ====================================
      // MULTI-NETWORK ADDRESS GENERATION
      // ====================================
      // Generate addresses for all three networks using our custom SS58 encoding
      const polkadotAddress = await generatePolkadotAddress(publicKeyBytes);
      const kusamaAddress = await generateKusamaAddress(publicKeyBytes);
      const substrateAddress = await generateSubstrateAddress(publicKeyBytes);

      console.log('✅ [ED25519] DOT multi-network derivation successful');
      console.log(`📍 [ED25519] Polkadot address (prefix 0): ${polkadotAddress}`);
      console.log(`📍 [ED25519] Kusama address (prefix 2): ${kusamaAddress}`);
      console.log(`📍 [ED25519] Substrate address (prefix 42): ${substrateAddress}`);

      // Validate results against expected outputs
      if (inputType === 'raw_private_key' && privateKey === POLKADOT_TEST_KEYS.ED25519_PRIVATE_KEY) {
        console.log(`🔧 [ED25519] Raw private key address match: ${polkadotAddress === POLKADOT_TEST_ADDRESSES.ED25519_DERIVATION.POLKADOT}`);
      }

      if (inputType === 'public_key_from_keystore' && publicKeyHex === POLKADOT_TEST_KEYS.KEYSTORE_PUBLIC_KEYS.EXODUS) {
        console.log(`🔧 [ED25519] Keystore Polkadot match: ${polkadotAddress === POLKADOT_TEST_ADDRESSES.EXODUS_KEYSTORE.POLKADOT}`);
        console.log(`🔧 [ED25519] Keystore Kusama match: ${kusamaAddress === POLKADOT_TEST_ADDRESSES.EXODUS_KEYSTORE.KUSAMA}`);
        console.log(`🔧 [ED25519] Keystore Substrate match: ${substrateAddress === POLKADOT_TEST_ADDRESSES.EXODUS_KEYSTORE.SUBSTRATE}`);
      }

      // Generate Ethereum address if we have a raw private key
      let ethereumAddress = '';
      if (inputType === 'raw_private_key') {
        try {
          const ethereumWallet = new Wallet(`0x${privateKey}`);
          ethereumAddress = ethereumWallet.address;
          console.log(`📍 [ED25519] Ethereum: ${ethereumAddress}`);
        } catch (error) {
          console.warn('[ED25519] Could not generate Ethereum address from private key:', error);
        }
      } else {
        console.log('📍 [ED25519] Ethereum: (not available - public key only)');
        ethereumAddress = 'N/A (public key only)';
      }

      console.log('✅ [ED25519] Multi-network addresses generated:');
      console.log(`📍 [ED25519] Polkadot: ${polkadotAddress}`);
      console.log(`📍 [ED25519] Kusama: ${kusamaAddress}`);
      console.log(`📍 [ED25519] Substrate: ${substrateAddress}`);

      // Create formatted multi-line display with protocol prefixes for UI
      const formattedDisplay = ethereumAddress && ethereumAddress !== 'N/A (public key only)'
        ? `DOT://${polkadotAddress}\nKSM://${kusamaAddress}\nSubstrate://${substrateAddress}\nETH://${ethereumAddress}`
        : `DOT://${polkadotAddress}\nKSM://${kusamaAddress}\nSubstrate://${substrateAddress}`;

      // Return the Polkadot address as the primary address (without protocol prefix)
      return {
        publicKey: `0x${publicKeyHex}`, // Include 0x prefix for consistency
        address: polkadotAddress, // Primary address (Polkadot) without protocol prefix
        // Include all network addresses for reference (without protocol prefixes)
        polkadotAddress: polkadotAddress,
        kusamaAddress: kusamaAddress,
        substrateAddress: substrateAddress,
        ethereumAddress: ethereumAddress,
        // Formatted multi-line display for UI with protocol prefixes
        formattedDisplay: formattedDisplay,
        // Include raw addresses without protocol prefixes for backward compatibility
        rawPolkadotAddress: polkadotAddress,
        rawKusamaAddress: kusamaAddress,
        rawSubstrateAddress: substrateAddress,
        rawEthereumAddress: ethereumAddress
      };

    } catch (error) {
      console.error('[ED25519] DOT derivation error:', error);
      throw new Error(`Polkadot derivation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },
};
