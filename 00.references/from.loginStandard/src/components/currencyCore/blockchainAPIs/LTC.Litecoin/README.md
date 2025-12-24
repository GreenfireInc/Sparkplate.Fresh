# Litecoin (LTC) Blockchain APIs

This directory contains 4 blockchain API implementations for interacting with the Litecoin network, with 6 additional APIs documented for future implementation.

## Overview

Litecoin is a peer-to-peer cryptocurrency created as a "lite" version of Bitcoin, often referred to as the "silver to Bitcoin's gold." Key characteristics:

- **Bitcoin-based**: Uses UTXO model (Unspent Transaction Output)
- **Faster Block Time**: 2.5 minutes (vs Bitcoin's 10 minutes)
- **Address Formats**: 
  - Legacy P2PKH: Starts with `L` or `M`
  - P2SH: Starts with `M` or `3`
  - SegWit (Bech32): Starts with `ltc1`
  - MWEB: Starts with `ltc1mweb` (privacy extension)
- **Smallest Unit**: Litoshi (1 LTC = 10^8 Litoshi/satoshis)
- **SegWit & MWEB**: Supports Segregated Witness and MimbleWimble Extension Block for privacy

## 🚀 Implemented APIs (4 of 10)

### 1. **Blockchair API** (Recommended - Best Free Tier)
**Status:** ✅ **IMPLEMENTED**  
**Rate Limits:** 1,000 requests/day without API key  
**Website:** https://blockchair.com/litecoin

**Features:**
- Comprehensive blockchain analytics
- Address information with UTXOs
- Transaction history
- Network statistics
- Transaction broadcasting
- No API key required for basic use

**Usage:**
```typescript
import { blockchairLTC } from '@/components/currencyCore/blockchainAPIs/LTC.Litecoin';

// Get balance
const balance = await blockchairLTC.getBalance('LMfFTdS67NzKxfUqMTf5JWCJXt5dgu1Eom');

// Get UTXOs
const utxos = await blockchairLTC.fetchUTXOs('LMfFTdS67...');

// Get transaction history
const history = await blockchairLTC.getTransactionHistory('LMfFTdS67...', 100, 0);

// Broadcast transaction
const result = await blockchairLTC.broadcastTransaction('0x...');
```

---

### 2. **BlockCypher API** (Comprehensive with Webhooks)
**Status:** ✅ **IMPLEMENTED**  
**Rate Limits:** 3 requests/second, 200 requests/hour (no key)  
**Website:** https://live.blockcypher.com/ltc/

**Features:**
- Fast blockchain API
- Address and UTXO queries
- Transaction details
- Fee estimates
- Webhook support (with API key)
- Chain statistics

**Usage:**
```typescript
import { blockcypherLTC, createBlockCypherLTC } from '@/components/currencyCore/blockchainAPIs/LTC.Litecoin';

// No API key (200 req/hour)
const balance = await blockcypherLTC.getBalance('LMfFTdS67...');
const utxos = await blockcypherLTC.fetchUTXOs('LMfFTdS67...');

// With API key (higher limits)
const blockcypher = createBlockCypherLTC('YOUR_API_KEY');
const feeEstimates = await blockcypher.getFeeEstimates();
const chainInfo = await blockcypher.getChainInfo();
```

---

### 3. **SoChain API** (Fast and Reliable)
**Status:** ✅ **IMPLEMENTED**  
**Rate Limits:** Free API access  
**Website:** https://chain.so/

**Features:**
- Fast and reliable API
- Balance and address queries
- UTXO fetching
- Transaction details
- Transaction broadcasting
- Address validation
- Network information

**Usage:**
```typescript
import { sochainLTC } from '@/components/currencyCore/blockchainAPIs/LTC.Litecoin';

// Get balance
const balance = await sochainLTC.getBalance('LMfFTdS67...');

// Get UTXOs
const utxos = await sochainLTC.fetchUTXOs('LMfFTdS67...');

// Validate address
const isValid = await sochainLTC.isAddressValid('LMfFTdS67...');

// Get network info
const networkInfo = await sochainLTC.getNetworkInfo();
```

---

### 4. **GetBlock API** (RPC Node Access)
**Status:** ✅ **IMPLEMENTED**  
**Rate Limits:** Free tier available (requires API key)  
**Website:** https://getblock.io/nodes/ltc/

**Features:**
- Direct RPC node access
- Standard Bitcoin RPC methods
- Block and transaction queries
- Fee estimation
- Transaction broadcasting
- Blockchain information

**Usage:**
```typescript
import { createGetBlockLTC } from '@/components/currencyCore/blockchainAPIs/LTC.Litecoin';

const getblock = createGetBlockLTC('YOUR_API_KEY');

// Get block count
const blockCount = await getblock.getBlockCount();

// Get transaction
const tx = await getblock.getTransaction('txhash...', true);

// Estimate fees
const feeEstimate = await getblock.estimateSmartFee(6);

// Broadcast transaction
const txHash = await getblock.broadcastTransaction('0x...');
```

---

## 📊 API Comparison

| API | Status | Free Tier | API Key | Best For | Special Features |
|-----|--------|-----------|---------|----------|------------------|
| **Blockchair** | ✅ | 1K/day | 🟡 Optional | General purpose | Analytics, no key required |
| **BlockCypher** | ✅ | 3 req/sec | 🟡 Optional | Comprehensive | Webhooks, fee estimates |
| **SoChain** | ✅ | Free | ❌ No | Quick queries | Address validation |
| **GetBlock** | ✅ | Free tier | ✅ Yes | RPC access | Direct node access |

**Legend:**
- ✅ Yes: API key required
- 🟡 Optional: Works without key, better with key
- ❌ No: No key needed

**Future Enhancements (Noted but not implemented):**
- **Litecoin Space** - Official Litecoin Foundation project (https://litecoinspace.org/)
- **Litecoin Block Explorer** - Detailed blockchain data (https://litecoinblockexplorer.net/)
- **CryptoID (Chainz)** - Blockchain statistics (https://chainz.cryptoid.info/ltc/)
- **NOWNodes** - Full node access (https://nownodes.io/nodes/litecoin-ltc)
- **Tokenview** - Multi-chain explorer (https://ltc.tokenview.io/)
- **Blockexplorer.com** - Multi-chain support (https://www.blockexplorer.com/litecoin/)

---

## 🎯 Recommended Usage Strategy

### For General Queries (No API Key):
```typescript
import { blockchairLTC, sochainLTC, blockcypherLTC } from '@/components/currencyCore/blockchainAPIs/LTC.Litecoin';

// Blockchair for most queries (1k/day)
const balance = await blockchairLTC.getBalance('LMfFTdS67...');
const utxos = await blockchairLTC.fetchUTXOs('LMfFTdS67...');

// SoChain for quick lookups (unlimited)
const networkInfo = await sochainLTC.getNetworkInfo();
const isValid = await sochainLTC.isAddressValid('LMfFTdS67...');

// BlockCypher for fee estimates (3 req/sec)
const fees = await blockcypherLTC.getFeeEstimates();
```

### For Production (With API Keys):
```typescript
import { createBlockchairLTC, createBlockCypherLTC, createGetBlockLTC } from '@/components/currencyCore/blockchainAPIs/LTC.Litecoin';

// Blockchair with API key (higher limits)
const blockchair = createBlockchairLTC(process.env.BLOCKCHAIR_KEY!);
const history = await blockchair.getTransactionHistory('LMfFTdS67...', 1000, 0);

// BlockCypher with API key (webhooks, higher limits)
const blockcypher = createBlockCypherLTC(process.env.BLOCKCYPHER_KEY!);
const chainInfo = await blockcypher.getChainInfo();

// GetBlock for RPC access
const getblock = createGetBlockLTC(process.env.GETBLOCK_KEY!);
const blockchainInfo = await getblock.getBlockchainInfo();
```

### Fallback Strategy:
```typescript
async function getBalanceWithFallback(address: string) {
  // Try Blockchair first (best free tier)
  try {
    return await blockchairLTC.getBalance(address);
  } catch (error) {
    console.warn('Blockchair failed, trying SoChain...', error);
    
    try {
      return await sochainLTC.getBalance(address);
    } catch (error2) {
      console.warn('SoChain failed, trying BlockCypher...', error2);
      
      // Final fallback
      return await blockcypherLTC.getBalance(address);
    }
  }
}
```

---

## 💡 Key Concepts

### Litecoin Address Formats:
```typescript
// Legacy P2PKH (Pay to Public Key Hash) - starts with L or M
const legacyAddress = 'LMfFTdS67NzKxfUqMTf5JWCJXt5dgu1Eom';

// P2SH (Pay to Script Hash) - starts with M or 3
const p2shAddress = 'MTjvWxcYh9Uq4JnspfzN7ZKMqGtHFiFsn7';

// SegWit (Bech32) - starts with ltc1
const segwitAddress = 'ltc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh';

// MWEB (MimbleWimble) - starts with ltc1mweb
const mwebAddress = 'ltc1mweb...'; // Privacy-enhanced addresses
```

### Satoshi Conversion:
```typescript
// 1 LTC = 100,000,000 satoshis (litoshis)
const LTC_DECIMALS = 8;

// Convert satoshis to LTC
const balanceLTC = Number(balanceSatoshis) / 1e8;

// Convert LTC to satoshis
const balanceSatoshis = BigInt(Math.round(balanceLTC * 1e8));
```

### MWEB (MimbleWimble Extension Block):
- Optional privacy layer introduced in 2022
- Conceals transaction amounts
- Uses CoinJoin mixing
- Stealth addresses
- Reduces blockchain bloat through pruning
- Over 150,000 LTC locked in MWEB

---

## 🚀 Quick Start

```typescript
// 1. Import the API you want to use
import { blockchairLTC } from '@/components/currencyCore/blockchainAPIs/LTC.Litecoin';

// 2. Get balance (no API key needed)
const balance = await blockchairLTC.getBalance('LMfFTdS67NzKxfUqMTf5JWCJXt5dgu1Eom');
console.log(`Balance: ${balance.balanceLTC} LTC`);

// 3. Get UTXOs for transaction building
const utxos = await blockchairLTC.fetchUTXOs('LMfFTdS67...');
console.log(`Found ${utxos.length} UTXOs`);

// 4. Get transaction history
const history = await blockchairLTC.getTransactionHistory('LMfFTdS67...', 100, 0);
console.log(`Total transactions: ${history.total}`);

// 5. Get network stats
const stats = await blockchairLTC.getNetworkStats();
console.log(`Latest block: ${stats.blocks}`);
```

---

## 📚 Additional Resources

- [Litecoin Official Site](https://litecoin.org/)
- [Litecoin GitHub](https://github.com/litecoin-project/litecoin)
- [Litecoin Foundation](https://litecoin-foundation.org/)
- [MWEB Information](https://litecoin.info/docs/key-concepts/mweb)
- [Address Formats](https://litecoin.info/docs/key-concepts/addresses-prefixes)

---

**Note:** Litecoin uses the same UTXO model as Bitcoin but with faster block times (2.5 minutes vs 10 minutes) and different address prefixes. All Bitcoin-compatible tooling works with Litecoin.

