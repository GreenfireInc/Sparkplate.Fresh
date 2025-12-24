// Currency: Polkadot (DOT)
import type { CurrencyData } from './currencyData';
import { createPair, Keyring } from '@polkadot/keyring';
import { hexToU8a, u8aToHex, isHex, stringToU8a } from '@polkadot/util';
import { base64Decode, decodeAddress, encodeAddress, cryptoWaitReady } from '@polkadot/util-crypto';
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
      
      // Get the full PKCS#8 encoded private key
      const unlockedJson = pair.toJson();
      const encodedPkcs8 = unlockedJson.encoded;
      
      console.log(`✅ Extracted full PKCS#8 encoded private key, length: ${encodedPkcs8.length}`);
      
      // Return both the PKCS#8 data and the original address for reference
      return JSON.stringify({
        pkcs8: encodedPkcs8,
        originalAddress: keystoreObj.address,
        cryptoType: cryptoType
      });
      
    } catch (error) {
      console.error('Polkadot keystore decryption error:', error);
      throw new Error(`Failed to decrypt Polkadot keystore: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  deriveFromPrivateKey: async (privateKey: string) => {
    try {
      console.log('🔧 DOT deriving address from private key...');
      
      // Wait for crypto to be ready
      await cryptoWaitReady();
      
      // Parse the stored data (contains PKCS#8 and original address)
      let pkcs8Data;
      let originalAddress;
      let cryptoType;
      
      try {
        const parsedData = JSON.parse(privateKey);
        pkcs8Data = parsedData.pkcs8;
        originalAddress = parsedData.originalAddress;
        cryptoType = parsedData.cryptoType || 'sr25519';
      } catch (e) {
        // If it's not JSON, assume it's raw PKCS#8 data (for backward compatibility)
        pkcs8Data = privateKey;
        originalAddress = '';
        cryptoType = 'sr25519';
      }
      
      const keyring = new Keyring({ type: cryptoType as KeypairType, ss58Format: 0 });
      
      // Method 1: Try to create from the original address if available
      if (originalAddress) {
        try {
          const publicKey = decodeAddress(originalAddress, true);
          const pair = keyring.addFromAddress(originalAddress, {});
          
          // Import the PKCS#8 data
          pair.decodePkcs8('', base64Decode(pkcs8Data));
          
          const derivedPublicKey = u8aToHex(pair.publicKey).slice(2);
          const address = await encodePolkadotAddress(pair.publicKey);
          
          console.log('✅ DOT derivation successful (Method 1)');
          console.log('📍 Final address:', address);
          console.log(`🔧 Expected address: 5CcEfDpDkMfmx4TtKH2XFBUWcSsF6Ej3KyQs85MWPB9gfR6g`);
          console.log(`🔧 Address match: ${address === '5CcEfDpDkMfmx4TtKH2XFBUWcSsF6Ej3KyQs85MWPB9gfR6g'}`);
          
          return { publicKey: derivedPublicKey, address };
        } catch (error) {
          console.log('Method 1 failed, trying Method 2:', error);
        }
      }
      
      // Method 2: Create a new pair from seed (extract seed from PKCS#8)
      try {
        // For sr25519, the seed is typically the last 32 bytes of the PKCS#8 data
        const pkcs8Bytes = base64Decode(pkcs8Data);
        const seed = pkcs8Bytes.slice(-32);
        
        const pair = keyring.addFromSeed(seed);
        const publicKey = u8aToHex(pair.publicKey).slice(2);
        const address = await encodePolkadotAddress(pair.publicKey);
        
        console.log('✅ DOT derivation successful (Method 2)');
        console.log('📍 Final address:', address);
        console.log(`🔧 Expected address: 5CcEfDpDkMfmx4TtKH2XFBUWcSsF6Ej3KyQs85MWPB9gfR6g`);
        console.log(`🔧 Address match: ${address === '5CcEfDpDkMfmx4TtKH2XFBUWcSsF6Ej3KyQs85MWPB9gfR6g'}`);
        
        return { publicKey, address };
      } catch (error) {
        console.log('Method 2 failed, trying Method 3:', error);
      }
      
      // Method 3: Use createPair directly with the PKCS#8 data
      try {
        const pair = createPair(
          { toSS58: encodeAddress, type: cryptoType as KeypairType },
          { publicKey: new Uint8Array(32) }, // Dummy public key
          {},
          base64Decode(pkcs8Data),
          ['scrypt', 'xsalsa20-poly1305']
        );
        
        pair.decodePkcs8('');
        
        const publicKey = u8aToHex(pair.publicKey).slice(2);
        const address = await encodePolkadotAddress(pair.publicKey);
        
        console.log('✅ DOT derivation successful (Method 3)');
        console.log('📍 Final address:', address);
        console.log(`🔧 Expected address: 5CcEfDpDkMfmx4TtKH2XFBUWcSsF6Ej3KyQs85MWPB9gfR6g`);
        console.log(`🔧 Address match: ${address === '5CcEfDpDkMfmx4TtKH2XFBUWcSsF6Ej3KyQs85MWPB9gfR6g'}`);
        
        return { publicKey, address };
      } catch (error) {
        console.log('Method 3 failed:', error);
        throw new Error('All derivation methods failed');
      }
      
    } catch (error) {
      console.error('DOT derivation error:', error);
      throw new Error(`Polkadot derivation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },
  
  derivePublicKey: (privateKey: string): string => {
    // For simplicity, use the same approach as deriveFromPrivateKey but just return public key
    const keyring = new Keyring({ type: 'sr25519' });
    
    try {
      const parsedData = JSON.parse(privateKey);
      const pkcs8Data = parsedData.pkcs8;
      const originalAddress = parsedData.originalAddress;
      
      if (originalAddress) {
        const pair = keyring.addFromAddress(originalAddress, {});
        pair.decodePkcs8('', base64Decode(pkcs8Data));
        return u8aToHex(pair.publicKey);
      }
    } catch (e) {
      // Fallback to seed extraction
      const pkcs8Bytes = base64Decode(privateKey);
      const seed = pkcs8Bytes.slice(-32);
      const pair = keyring.addFromSeed(seed);
      return u8aToHex(pair.publicKey);
    }
    
    return '';
  },

  deriveAddress: async (publicKey: string): Promise<string> => {
    // Use our custom SS58 encoding for consistent results
    const publicKeyBytes = hexToU8a(`0x${publicKey}`);
    return await encodePolkadotAddress(publicKeyBytes);
  },
};