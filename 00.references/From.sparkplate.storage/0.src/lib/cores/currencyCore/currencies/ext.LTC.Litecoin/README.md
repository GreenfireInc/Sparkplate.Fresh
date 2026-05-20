# Litecoin Address Generation Module

This module provides comprehensive Litecoin address generation supporting all major address formats.

## Architecture

Following the Bitcoin router pattern, this module provides:

### Address Formats Supported

1. **P2PKH (Legacy)** - `LTC.Litecoin.P2PKH.ts`
   - Address format: Starts with 'L'
   - Description: Original Litecoin address format
   - Example: `LhrkQGH81ibL6dzuKp7A11wrGynkfc7yA`

2. **P2SH (SegWit Compatible)** - `LTC.Litecoin.P2SH.ts`
   - Address format: Starts with 'M'
   - Description: P2SH-wrapped SegWit addresses
   - Example: `MJNbVM7SEbSenWduRNdd7EYC8Z1avePnU`

3. **P2WPKH (Native SegWit)** - `LTC.Litecoin.P2WPKH.ts`
   - Address format: Starts with 'ltc1q'
   - Description: Bech32 encoded native SegWit addresses
   - Example: `ltc1qmqjguha7nad8atgm2s7h5c3q4wpytyl78avlp7`

### Router System - `router.LTC.Litecoin.ts`

Centralizes all address format implementations and provides:
- Clean imports and exports
- Type definitions for `LitecoinAddressFormat`
- Network configuration constants
- Consistent architecture following Bitcoin pattern

### Network Configuration

Based on key-generator-key-generator-vue3 reference:

```typescript
const LTC_NETWORK_CONFIG = {
  messagePrefix: '\x19Litecoin Signed Message:\n',
  bech32: 'ltc',
  bip32: {
    public: 0x019da462,
    private: 0x019d9cfe,
  },
  pubKeyHash: 0x30,  // P2PKH prefix (produces 'L' addresses)
  scriptHash: 0x32,  // P2SH prefix (produces 'M' addresses)  
  wif: 0xb0,         // WIF private key prefix
}
```

## Usage

### Import Types
```typescript
import { LitecoinAddressFormat } from './LTC.Litecoin';
```

### Generate Addresses
```typescript
// Legacy P2PKH (default)
const p2pkhResult = await litecoinData.deriveFromPrivateKey(privateKey, 'P2PKH');

// SegWit Compatible P2SH
const p2shResult = await litecoinData.deriveFromPrivateKey(privateKey, 'P2SH');

// Native SegWit P2WPKH
const p2wpkhResult = await litecoinData.deriveFromPrivateKey(privateKey, 'P2WPKH');
```

## Dependencies

- `bitcoinjs-lib` - Core Bitcoin/Litecoin functionality
- `tiny-secp256k1` - ECC operations
- `ecpair` - Key pair management
- `@noble/hashes` - Cryptographic hashing
- `bs58` - Base58 encoding (P2PKH only)
- `wif` - Wallet Import Format

## Implementation Notes

1. **P2PKH**: Uses manual implementation with noble libraries for maximum compatibility
2. **P2SH & P2WPKH**: Use bitcoinjs-lib with Litecoin network parameters
3. **WIF Support**: All formats support both WIF and hex private key inputs
4. **Validation**: Address prefix validation for each format
5. **Error Handling**: Comprehensive error messages for debugging

## Reference Implementation

Based on `key-generator-key-generator-vue3` patterns, ensuring compatibility with established Litecoin address generation practices.

## Testing

Each address format includes:
- Private key format validation (WIF and hex)
- Network parameter validation
- Address prefix validation
- Comprehensive error handling

## Future Extensions

Potential additions following Litecoin protocol development:
- P2TR (Taproot) when/if implemented in Litecoin
- Multi-signature addresses
- Hardware wallet integration
- HD wallet derivation paths
