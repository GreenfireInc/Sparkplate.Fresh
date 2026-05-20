# Bitcoin Address Format Extensions

This folder contains specialized Bitcoin address derivation implementations for different address formats supported by the Bitcoin network.

## Files

### BTC.Bitcoin.P2PKH.ts
**Legacy Addresses (P2PKH - Pay-to-Public-Key-Hash)**
- **Address Format**: Starts with `1`
- **Example**: `1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2`
- **Description**: Original Bitcoin address format from 2009
- **Use Case**: Legacy compatibility, widely supported by all wallets and exchanges

### BTC.Bitcoin.P2SH.ts
**SegWit Compatibility Addresses (P2SH - Pay-to-Script-Hash)**
- **Address Format**: Starts with `3`
- **Example**: `3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy`
- **Description**: SegWit transactions wrapped in P2SH for backwards compatibility
- **Use Case**: SegWit benefits with legacy wallet compatibility

### BTC.Bitcoin.P2WPKH.ts
**Native SegWit Addresses (P2WPKH - Pay-to-Witness-Public-Key-Hash)**
- **Address Format**: Starts with `bc1q`
- **Example**: `bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq`
- **Description**: Native SegWit using Bech32 encoding
- **Use Case**: Lower transaction fees, modern Bitcoin addresses

### BTC.Bitcoin.P2TR.ts
**Taproot Addresses (P2TR - Pay-to-Taproot)**
- **Address Format**: Starts with `bc1p`
- **Example**: `bc1p5cyxnuxmeuwuvkwfem96lqzszd02n6xdcjrs20cac6yqjjwudpxqkedrcr`
- **Description**: Latest Bitcoin address format using Schnorr signatures
- **Use Case**: Enhanced privacy, smart contract capabilities, lower fees

## Technical Details

### Address Generation Process

1. **Private Key Parsing**: Supports both WIF and hex formats
2. **Public Key Derivation**: Uses secp256k1 elliptic curve
3. **Format-Specific Processing**:
   - P2PKH: SHA-256 → RIPEMD-160 → Base58
   - P2SH: Script hash → SHA-256 → RIPEMD-160 → Base58
   - P2WPKH: SHA-256 → RIPEMD-160 → Bech32
   - P2TR: X-only public key → Bech32m

### Dependencies
- `@noble/hashes/sha256` - SHA-256 hashing
- `@noble/hashes/ripemd160` - RIPEMD-160 hashing
- `@noble/secp256k1` - Elliptic curve operations
- `wif` - Wallet Import Format decoding
- `bs58` - Base58 encoding (P2PKH, P2SH)
- `bech32` - Bech32 encoding (P2WPKH, P2TR)

## Usage

### Option 1: Use the Router (Recommended)
The main `BTC.Bitcoin.ts` file serves as a router for all address formats:

```typescript
import { bitcoinData, BitcoinAddressFormat } from '../BTC.Bitcoin';

// Generate different address formats from same private key
const p2pkhAddress = await bitcoinData.deriveFromPrivateKey!(privateKey, 'P2PKH');
const p2wpkhAddress = await bitcoinData.deriveFromPrivateKey!(privateKey, 'P2WPKH');
const p2shAddress = await bitcoinData.deriveFromPrivateKey!(privateKey, 'P2SH');
const p2trAddress = await bitcoinData.deriveFromPrivateKey!(privateKey, 'P2TR');

// Default is P2PKH if no format specified
const defaultAddress = await bitcoinData.deriveFromPrivateKey!(privateKey);

// Access format information
console.log(p2wpkhAddress.format); // 'P2WPKH'
console.log(p2wpkhAddress.formatDescription); // 'Native SegWit (P2WPKH) - starts with "bc1q"'
```

### Option 2: Direct Import
Each file can be imported independently:

```typescript
import { bitcoinP2PKHData } from './BTC.Bitcoin.P2PKH';
import { bitcoinP2WPKHData } from './BTC.Bitcoin.P2WPKH';

// Derive addresses from private keys
const p2pkhAddress = await bitcoinP2PKHData.deriveFromPrivateKey!(privateKey);
const p2wpkhAddress = await bitcoinP2WPKHData.deriveFromPrivateKey!(privateKey);
```

## Address Validation

Each implementation includes validation to ensure the generated address matches the expected format:
- P2PKH addresses must start with `1`
- P2SH addresses must start with `3`
- P2WPKH addresses must start with `bc1q`
- P2TR addresses must start with `bc1p`
