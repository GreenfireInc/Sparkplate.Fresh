/**
 * GPG Key Generation from BIP32 Root Extended Private Key
 * 
 * This module generates a deterministic GPG keypair from the BIP32 root extended private key (xprv).
 * The root extended private key represents the master key derived from the mnemonic seed phrase.
 * 
 * Unlike individual cryptocurrency private keys which are derived at specific paths (e.g., m/44'/0'/0'/0/0),
 * the root extended private key exists at the root level (m/) and can derive all other keys in the hierarchy.
 * 
 * ============================================================================
 * PURPOSE
 * ============================================================================
 * 
 * Generating a GPG keypair from the root extended private key provides:
 * 
 * 1. MASTER IDENTITY: A single GPG identity that represents the entire wallet hierarchy
 * 2. HIERARCHICAL VERIFICATION: Can be used to verify/sign messages about the entire wallet
 * 3. DETERMINISTIC: Same seed phrase always produces the same GPG keys
 * 4. CRYPTOGRAPHIC BINDING: Links the GPG identity to the cryptographic root of the wallet
 * 
 * ============================================================================
 * USAGE
 * ============================================================================
 * 
 * This GPG keypair can be used for:
 * - Signing wallet backups
 * - Verifying wallet restoration
 * - Creating a cryptographic identity for the entire wallet
 * - Proving ownership of the master seed without revealing it
 * 
 * ============================================================================
 * TECHNICAL DETAILS
 * ============================================================================
 * 
 * The root extended private key is a base58-encoded string that contains:
 * - Version bytes (4 bytes): Network identifier (mainnet/testnet)
 * - Depth (1 byte): Level in the derivation hierarchy (0 for root)
 * - Parent fingerprint (4 bytes): Fingerprint of parent key (0x00000000 for root)
 * - Child number (4 bytes): Index of this key (0x00000000 for root)
 * - Chain code (32 bytes): Entropy for child key derivation
 * - Private key (33 bytes): The actual private key with 0x00 prefix
 * - Checksum (4 bytes): Double-SHA256 checksum
 * 
 * We use this entire encoded string as the seed for GPG key generation to ensure:
 * - Maximum entropy (all 78 bytes contribute to the GPG key)
 * - Uniqueness (different networks produce different GPG keys)
 * - Determinism (same xprv always produces same GPG keys)
 * 
 * ============================================================================
 * SECURITY NOTES
 * ============================================================================
 * 
 * ⚠️ CRITICAL: The root extended private key is extremely sensitive!
 * - It can derive ALL private keys in the wallet hierarchy
 * - Anyone with the xprv can recreate the entire wallet
 * - Never share or expose the root extended private key or its GPG keys
 * - The GPG private key should be stored with the same security as the seed phrase
 */

import * as bip39 from "bip39";
import * as bip32 from "bip32";
import * as ecc from "tiny-secp256k1";

/**
 * Generate a deterministic GPG keypair from the BIP32 root extended private key.
 * 
 * This function:
 * 1. Converts the mnemonic to a seed
 * 2. Derives the BIP32 root extended private key (xprv)
 * 3. Uses the xprv as seed material for deterministic GPG key generation
 * 4. Returns the GPG keypair and fingerprint
 * 
 * @param mnemonic - The BIP39 mnemonic seed phrase
 * @returns Object containing GPG public key, private key, fingerprint, and the xprv used
 */
export async function generateGPGFromRootExtendedPrivateKey(
  mnemonic: string
): Promise<{
  gpgPublicKey: string;
  gpgPrivateKey: string;
  gpgFingerprint: string;
  rootExtendedPrivateKey: string;
  rootExtendedPublicKey: string;
}> {
  // Convert mnemonic to seed
  const seed = await bip39.mnemonicToSeed(mnemonic);
  
  // Create root key from seed
  const root = bip32.BIP32Factory(ecc).fromSeed(seed);
  
  // Get BIP32 Root Extended Private Key (xprv)
  const rootExtendedPrivateKey = root.toBase58();
  
  // Get BIP32 Root Extended Public Key (xpub)
  const rootExtendedPublicKey = root.neutered().toBase58();
  
  console.log(`[ROOT-GPG] Generating GPG keypair from root extended private key`);
  console.log(`[ROOT-GPG] xprv: ${rootExtendedPrivateKey.substring(0, 20)}...${rootExtendedPrivateKey.substring(rootExtendedPrivateKey.length - 10)}`);
  
  // Import the existing deterministic GPG generation function
  const { generateDeterministicGPGKey } = await import('@/lib/cryptographyCore/deterministicGPG/deterministicGPG.individual');
  
  // Use the entire xprv as the "private key" for GPG generation
  // This ensures maximum entropy and uniqueness
  // We use "ROOT" as the currency identifier to distinguish from individual coin GPG keys
  const { publicKey, privateKey, fingerprint } = await generateDeterministicGPGKey(
    rootExtendedPrivateKey,
    'ROOT'
  );
  
  console.log(`[ROOT-GPG] GPG Fingerprint: ${fingerprint}`);
  
  return {
    gpgPublicKey: publicKey,
    gpgPrivateKey: privateKey,
    gpgFingerprint: fingerprint,
    rootExtendedPrivateKey,
    rootExtendedPublicKey,
  };
}

/**
 * Extract only the BIP32 root extended keys without generating GPG keys.
 * Useful when you only need the xprv/xpub without the overhead of GPG generation.
 * 
 * @param mnemonic - The BIP39 mnemonic seed phrase
 * @returns Object containing the root extended private and public keys
 */
export async function extractRootExtendedKeys(
  mnemonic: string
): Promise<{
  rootExtendedPrivateKey: string;
  rootExtendedPublicKey: string;
}> {
  // Convert mnemonic to seed
  const seed = await bip39.mnemonicToSeed(mnemonic);
  
  // Create root key from seed
  const root = bip32.BIP32Factory(ecc).fromSeed(seed);
  
  return {
    rootExtendedPrivateKey: root.toBase58(),
    rootExtendedPublicKey: root.neutered().toBase58(),
  };
}

