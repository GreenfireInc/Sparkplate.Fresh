// Bitcoin P2TR (Pay-to-Taproot) - Taproot Addresses
// Address format: Starts with "bc1p"
// Uses: Schnorr signatures and Taproot protocol

import type { DerivedInfo } from '../currencyData';
import { toHex, fromHex } from '../utils';

// Import bitcoinjs-lib with pre-initialized ECC from router
import { bitcoin } from './router.BTC.Bitcoin';

export const bitcoinP2TRData = {
  deriveFromPrivateKey: async (privateKey: string): Promise<DerivedInfo> => {
    // Import ECPair for proper bitcoinjs-lib integration 
    const ECPair = await import('ecpair');
    const { eccLib } = await import('./router.BTC.Bitcoin');

    // Create ECPair factory with our ECC library
    const ECPairFactory = ECPair.ECPairFactory(eccLib);
    
    let keyPair: { publicKey: Uint8Array; privateKey?: Uint8Array };

    try {
      // First try to parse as WIF (Wallet Import Format)
      if (privateKey.length >= 50 && privateKey.length <= 52) { // Typical WIF length
        try {
          // Create ECPair from WIF - exactly like reference implementation
          keyPair = ECPairFactory.fromWIF(privateKey, bitcoin.networks.bitcoin);
        } catch (wifError) {
          throw new Error(`Invalid Bitcoin WIF key: ${wifError.message}`);
        }
      }
      // Handle hex format (with or without 0x prefix)
      else {
        try {
          const privateKeyBytes = fromHex(privateKey);

          if (privateKeyBytes.length !== 32) {
            throw new Error(`Expected 32 bytes, got ${privateKeyBytes.length}`);
          }

          // Create ECPair from private key bytes
          keyPair = ECPairFactory.fromPrivateKey(Buffer.from(privateKeyBytes));
        } catch (hexError) {
          throw new Error(`Invalid Bitcoin private key: ${hexError.message}`);
        }
      }
    } catch (error) {
      throw new Error(`Failed to parse Bitcoin private key: ${error.message}`);
    }

    // Step 2: Get compressed public key from ECPair (33 bytes with prefix)
    const publicKeyCompressed = Buffer.from(keyPair.publicKey);

    // Step 3: Extract the x-only public key (internal pubkey for Taproot)
    // Remove the first byte (0x02 or 0x03) to get the 32-byte x-coordinate
    const xOnlyPubkey = publicKeyCompressed.slice(1, 33);

    // Step 4: Create the Taproot address using bitcoinjs-lib p2tr (exactly like reference)
    const p2trPayment = bitcoin.payments.p2tr({
      internalPubkey: xOnlyPubkey,
      // Note: Reference doesn't specify network, defaults to mainnet
    });

    // Get the address from the payment object
    const address = p2trPayment.address;

    // Validate that the address exists and starts with "bc1p" (P2TR format)
    if (!address || !address.startsWith('bc1p')) {
      throw new Error(`Failed to generate valid P2TR address: ${address}`);
    }

    // For uncompressed public key, we'd need to derive it differently
    // But for P2TR we only need the compressed version
    const publicKeyUncompressed = publicKeyCompressed; // Keep compressed for consistency

    // Return the results
    return {
      publicKey: toHex(xOnlyPubkey),
      publicKeyUncompressed: toHex(publicKeyUncompressed),
      address
    };
  }
};
