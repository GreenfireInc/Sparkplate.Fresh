// ==========================================
// LTC.Litecoin.P2SH - SegWit Compatible Address Generation
// ==========================================
// This module handles Litecoin P2SH-P2WPKH (Pay-to-Script-Hash wrapping Pay-to-Witness-Public-Key-Hash)
// P2SH-P2WPKH provides SegWit benefits while maintaining compatibility with older wallets
// Address format: Starts with 'M' (Litecoin mainnet)
// Based on key-generator-key-generator-vue3 reference implementation

import type { CurrencyData, DerivedInfo } from '../currencyData';
import { toHex, fromHex } from '../utils';

// Import bitcoinjs-lib with initialized ECC from router
import { bitcoin, LTC_NETWORK_CONFIG } from './router.LTC.Litecoin';

export const litecoinP2SHData = {
  deriveFromPrivateKey: async (privateKey: string): Promise<DerivedInfo> => {
    try {
      // Dynamic imports for performance (wif only, bitcoin is imported from router)
      const { decode: wifDecode } = await import('wif');

      console.log('🔧 [LTC P2SH] Deriving Litecoin P2SH-P2WPKH (SegWit Compatible) address...');

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
            console.warn("[LTC P2SH] Warning: WIF key may not be for Litecoin network");
          }

          // Use ECPair to create key pair from private key bytes
          const ECPair = await import('ecpair');
          const tinysecp256k1 = await import('tiny-secp256k1');
          const ECPairFactory = ECPair.ECPairFactory(tinysecp256k1);
          keyPair = ECPairFactory.fromWIF(privateKey, LTC_NETWORK);

          console.log('[LTC P2SH] Successfully parsed WIF private key');
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

          console.log('[LTC P2SH] Successfully parsed hex private key');
        } catch (hexError) {
          throw new Error(`Invalid Litecoin private key: ${hexError.message}`);
        }
      }

      console.log(`[LTC P2SH] Public key: ${Buffer.from(keyPair.publicKey).toString('hex')}`);

      // Step 2: Create P2SH-P2WPKH address (exactly like reference implementation)
      // This creates a P2SH address that wraps a P2WPKH script
      const p2wpkh = bitcoin.payments.p2wpkh({
        pubkey: Buffer.from(keyPair.publicKey),
        network: LTC_NETWORK
      });
      
      const p2shP2wpkh = bitcoin.payments.p2sh({
        redeem: p2wpkh,
        network: LTC_NETWORK
      });

      const address = p2shP2wpkh.address;

      if (!address) {
        throw new Error('Failed to generate P2SH-P2WPKH address');
      }

      // Validate that the address starts with 'M' for Litecoin P2SH
      if (!address.startsWith('M')) {
        throw new Error(`Generated address does not start with 'M': ${address}`);
      }

      console.log(`✅ [LTC P2SH] Successfully generated P2SH-P2WPKH address: ${address}`);

      // Extract public keys (convert Uint8Array to Buffer)
      const publicKeyCompressed = Buffer.from(keyPair.publicKey);
      const publicKeyUncompressed = Buffer.from(keyPair.publicKey); // ECPair typically provides compressed by default

      // Return the results
      return {
        publicKey: toHex(publicKeyCompressed),
        publicKeyUncompressed: toHex(publicKeyUncompressed), 
        address,
        formatDescription: "P2SH (SegWit Compatible) - starts with 'M'"
      };

    } catch (error) {
      console.error('[LTC P2SH] Error deriving Litecoin P2SH-P2WPKH address:', error);
      throw new Error(`Litecoin P2SH derivation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
};
