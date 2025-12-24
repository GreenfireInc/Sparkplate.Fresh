// Currency: Polkadot (DOT)
import type { CurrencyData } from './currencyData';
import { createPair, Keyring } from '@polkadot/keyring';
import { hexToU8a, u8aToHex, isHex } from '@polkadot/util';
import { base64Decode, decodeAddress, encodeAddress } from '@polkadot/util-crypto';
import { KeypairType } from '@polkadot/util-crypto/types';

// SS58 encoding function for Polkadot (exactly like Talisman)
async function encodePolkadotAddress(publicKey: Uint8Array): Promise<string> {
  const { blake2b } = await import('@noble/hashes/blake2b');
  const { base58 } = await import('@scure/base');

  // Constants from SS58 specification (exactly like Talisman)
  const SS58PRE = new TextEncoder().encode('SS58PRE');
  const CHECKSUM_LENGTH = 2;
  const VALID_PUBLICKEY_LENGTHS = [32, 33];

  if (!VALID_PUBLICKEY_LENGTHS.includes(publicKey.length)) {
    throw new Error('Invalid publicKey length');
  }

  // Account ID calculation (exactly like Talisman)
  const accountId = (publicKey: Uint8Array) => {
    if (!VALID_PUBLICKEY_LENGTHS.includes(publicKey.length)) throw new Error('Invalid publicKey');
    // For 33-byte keys (like ECDSA), hash with blake2b
    // For 32-byte keys (like sr25519/ed25519), use directly
    return publicKey.length === 33 ? blake2b(publicKey, { dkLen: 32 }) : publicKey;
  };

  // Use Polkadot prefix (0) - this is the key difference from Substrate (42)
  const prefix = 0;

  let prefixBytes: Uint8Array;
  if (prefix < 64) {
    prefixBytes = Uint8Array.of(prefix);
  } else {
    prefixBytes = Uint8Array.of(
      ((prefix & 0b0000_0000_1111_1100) >> 2) | 0b0100_0000,
      (prefix >> 8) | ((prefix & 0b0000_0000_0000_0011) << 6)
    );
  }

  // Create checksum using accountId (exactly like Talisman)
  const payload = accountId(publicKey);
  const checksumInput = Uint8Array.of(...SS58PRE, ...prefixBytes, ...payload);
  const checksum = blake2b(checksumInput, { dkLen: 32 }).subarray(0, CHECKSUM_LENGTH);

  // Encode with base58 (exactly like Talisman)
  return base58.encode(Uint8Array.of(...prefixBytes, ...payload, ...checksum));
}

export const polkadotData: CurrencyData = {
  // ... (other properties remain the same)

  decryptKeystore: async (keystore: unknown, password: string): Promise<string> => {
    try {
      console.log('🔧 Decrypting Polkadot/Substrate keystore using SubWallet approach...');
      
      const keystoreObj = keystore as {
        encoded: string;
        encoding: {
          content: string[];
          type: string[];
          version: string;
        };
        address: string;
        meta?: {
          name?: string;
        };
      };
      
      // Follow SubWallet's exact approach: create pair, decrypt, then get seed from toJson
      const cryptoType = Array.isArray(keystoreObj.encoding.content) ? keystoreObj.encoding.content[1] : "ed25519";
      const encType = Array.isArray(keystoreObj.encoding.type) ? keystoreObj.encoding.type : [keystoreObj.encoding.type];
      
      console.log(`🔧 Detected crypto type: ${cryptoType}`);
      console.log(`📍 Original keystore address: ${keystoreObj.address}`);
      
      // Create the pair exactly like SubWallet does
      const pair = createPair(
        { toSS58: encodeAddress, type: cryptoType as KeypairType },
        { publicKey: decodeAddress(keystoreObj.address, true) },
        keystoreObj.meta || {},
        isHex(keystoreObj.encoded) ? hexToU8a(keystoreObj.encoded) : base64Decode(keystoreObj.encoded),
        encType,
      );
      
      console.log('✅ Created pair from JSON');
      console.log(`📍 Pair address from keystore: ${pair.address}`);
      
      // Decrypt like SubWallet
      pair.decodePkcs8(password);
      
      if (pair.isLocked) {
        throw new Error('Pair is still locked after decryption');
      }
      
      console.log('✅ Keystore decrypted successfully');
      
      // Get the full PKCS#8 encoded private key instead of extracting just the last 32 bytes
      const unlockedJson = pair.toJson();
      const encodedPkcs8 = unlockedJson.encoded;
      
      console.log(`✅ Extracted full PKCS#8 encoded private key, length: ${encodedPkcs8.length}`);
      
      // Return the full PKCS#8 encoded data instead of trying to extract just the private key
      // This ensures we have all the necessary information for proper derivation
      return encodedPkcs8;
      
    } catch (error) {
      console.error('Polkadot keystore decryption error:', error);
      throw new Error(`Failed to decrypt Polkadot keystore: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  deriveFromPrivateKey: async (privateKey: string) => {
    try {
      console.log('🔧 DOT deriving address from private key...');

      // The privateKey here is actually the PKCS#8 encoded data from the keystore
      // We need to create a pair from this encoded data
      const keyring = new Keyring({ type: 'sr25519', ss58Format: 0 });
      
      // Import the PKCS#8 encoded key
      const pair = keyring.addFromJson({
        encoded: privateKey,
        encoding: {
          content: ['pkcs8', 'sr25519'],
          type: ['scrypt', 'xsalsa20-poly1305'],
          version: '3'
        },
        address: '', // This will be generated
        meta: {}
      });
      
      // Unlock the pair (no password needed since it's already decrypted)
      pair.decodePkcs8('');
      
      const publicKey = u8aToHex(pair.publicKey).slice(2);
      
      // Use our custom encoding to ensure correct Polkadot format
      const address = await encodePolkadotAddress(pair.publicKey);

      console.log('✅ DOT derivation successful');
      console.log('📍 Final address:', address);
      console.log(`🔧 Address starts with: ${address.substring(0, 2)} (should be '5C' for Polkadot)`);
      console.log(`🔧 Expected address: 5CcEfDpDkMfmx4TtKH2XFBUWcSsF6Ej3KyQs85MWPB9gfR6g`);
      console.log(`🔧 Address match: ${address === '5CcEfDpDkMfmx4TtKH2XFBUWcSsF6Ej3KyQs85MWPB9gfR6g'}`);

      return { publicKey, address };
    } catch (error) {
      console.error('DOT derivation error:', error);
      throw new Error(`Polkadot derivation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },
  
  derivePublicKey: (privateKey: string): string => {
    // For PKCS#8 encoded keys, we need to use the keyring to extract the public key
    const keyring = new Keyring({ type: 'sr25519' });
    const pair = keyring.addFromJson({
      encoded: privateKey,
      encoding: {
        content: ['pkcs8', 'sr25519'],
        type: ['scrypt', 'xsalsa20-poly1305'],
        version: '3'
      },
      address: '',
      meta: {}
    });
    pair.decodePkcs8('');
    return u8aToHex(pair.publicKey);
  },

  deriveAddress: async (publicKey: string): Promise<string> => {
    // Use our custom SS58 encoding for consistent results
    const publicKeyBytes = hexToU8a(`0x${publicKey}`);
    return await encodePolkadotAddress(publicKeyBytes);
  },
};