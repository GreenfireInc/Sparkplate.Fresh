// ==========================================
// LTC.Litecoin.P2WPKH - Native SegWit Address Generation  
// ==========================================
// This module handles Litecoin P2WPKH (Pay-to-Witness-Public-Key-Hash) address generation
// P2WPKH is the native SegWit format providing maximum efficiency and lowest fees
// Address format: Starts with 'ltc1q' (Litecoin mainnet, Bech32 encoding)
// Based on key-generator-key-generator-vue3 reference implementation

import type { CurrencyData, DerivedInfo } from '../currencyData';
import { toHex, fromHex } from '../utils';

// Import bitcoinjs-lib with initialized ECC from router
import { bitcoin, LTC_NETWORK_CONFIG } from './router.LTC.Litecoin';

export const litecoinP2WPKHData = {
  deriveFromPrivateKey: async (privateKey: string): Promise<DerivedInfo> => {
    try {
      // Dynamic imports for performance (wif only, bitcoin is imported from router)
      const { decode: wifDecode } = await import('wif');

      console.log('🔧 [LTC P2WPKH] Deriving Litecoin P2WPKH (Native SegWit) address...');

      // Use network configuration from router
      const LTC_NETWORK = LTC_NETWORK_CONFIG;

      // Step 1: Parse the private key
      let keyPair: { publicKey: Uint8Array; toWIF(): string };

      if (privateKey.length >= 50 && privateKey.length <= 52) {
        // WIF format
        try {
          const decoded = wifDecode(privateKey);
          
          // Validate for Litecoin network
          if (decoded.version !== 0xb0 && decoded.version !== 0x80) {
            console.warn("[LTC P2WPKH] Warning: WIF key may not be for Litecoin network");
          }

          // Use ECPair to create key pair from WIF
          const ECPair = await import('ecpair');
          const tinysecp256k1 = await import('tiny-secp256k1');
          const ECPairFactory = ECPair.ECPairFactory(tinysecp256k1);
          keyPair = ECPairFactory.fromWIF(privateKey, LTC_NETWORK);

          console.log('[LTC P2WPKH] Successfully parsed WIF private key');
        } catch (wifError) {
          throw new Error(`Invalid Litecoin WIF key: ${wifError.message}`);
        }
      } else {
        // Hex format
        try {
          const privateKeyBytes = fromHex(privateKey);
          if (privateKeyBytes.length !== 32) {
            throw new Error(`Expected 32 bytes, got ${privateKeyBytes.length}`);
          }

          // Use ECPair to create key pair from raw bytes
          const ECPair = await import('ecpair');
          const tinysecp256k1 = await import('tiny-secp256k1');
          const ECPairFactory = ECPair.ECPairFactory(tinysecp256k1);
          keyPair = ECPairFactory.fromPrivateKey(Buffer.from(privateKeyBytes));

          console.log('[LTC P2WPKH] Successfully parsed hex private key');
        } catch (hexError) {
          throw new Error(`Invalid Litecoin private key: ${hexError.message}`);
        }
      }

      console.log(`[LTC P2WPKH] Public key: ${Buffer.from(keyPair.publicKey).toString('hex')}`);

      // Step 2: Create P2WPKH address (exactly like reference implementation)
      // This creates a native SegWit address using Bech32 encoding
      const p2wpkhPayment = bitcoin.payments.p2wpkh({
        pubkey: Buffer.from(keyPair.publicKey),
        network: LTC_NETWORK
      });

      const address = p2wpkhPayment.address;

      if (!address) {
        throw new Error('Failed to generate P2WPKH address');
      }

      // Validate that the address starts with 'ltc1q' for Litecoin native SegWit
      if (!address.startsWith('ltc1q')) {
        throw new Error(`Generated address does not start with 'ltc1q': ${address}`);
      }

      console.log(`✅ [LTC P2WPKH] Successfully generated P2WPKH address: ${address}`);

      // Extract public keys (convert Uint8Array to Buffer)
      const publicKeyCompressed = Buffer.from(keyPair.publicKey);
      const publicKeyUncompressed = Buffer.from(keyPair.publicKey); // ECPair typically provides compressed by default

      // Return the results
      return {
        publicKey: toHex(publicKeyCompressed),
        publicKeyUncompressed: toHex(publicKeyUncompressed), 
        address,
        formatDescription: "P2WPKH (Native SegWit) - starts with 'ltc1q'"
      };

    } catch (error) {
      console.error('[LTC P2WPKH] Error deriving Litecoin P2WPKH address:', error);
      throw new Error(`Litecoin P2WPKH derivation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
};
